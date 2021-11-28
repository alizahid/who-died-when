/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { CharacterStatus, PrismaClient } from '@prisma/client'
import algoliasearch from 'algoliasearch'
import axios from 'axios'
import Listr from 'listr'
import { kebabCase } from 'lodash'

const main = async () => {
  const prisma = new PrismaClient()

  const algolia = algoliasearch(
    process.env.ALGOLIA_APP_ID!,
    process.env.ALGOLIA_ADMIN_KEY!
  )

  const index = algolia.initIndex(process.env.ALGOLIA_INDEX!)

  const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  })

  const tasks = new Listr([
    {
      task: async () => {
        const {
          data: { results }
        } = await tmdb.get<{
          results: Array<{
            id: number
            name: string
            overview: string
            popularity: number
            poster_path: string
          }>
        }>('/trending/tv/week')

        const trending = results.filter(({ poster_path }) => poster_path)

        return new Listr(
          trending.map((data) => ({
            task: async () => {
              const show = await prisma.show.upsert({
                create: {
                  image: data.poster_path,
                  name: data.name,
                  overview: data.overview,
                  popularity: data.popularity,
                  slug: kebabCase(data.name),
                  tmdbId: data.id
                },
                update: {
                  popularity: data.popularity
                },
                where: {
                  tmdbId: data.id
                }
              })

              const {
                data: { cast }
              } = await tmdb.get<{
                cast: Array<{
                  character: string
                  credit_id: string
                  id: number
                  name: string
                  profile_path: string
                }>
              }>(`/tv/${data.id}/credits`)

              const people = cast.filter(({ profile_path }) => profile_path)

              return Promise.all(
                people.map(async (person) => {
                  const actor = await prisma.actor.upsert({
                    create: {
                      image: person.profile_path,
                      name: person.name,
                      tmdbId: person.id
                    },
                    update: {},
                    where: {
                      tmdbId: person.id
                    }
                  })

                  return prisma.character.upsert({
                    create: {
                      actor: {
                        connect: {
                          id: actor.id
                        }
                      },
                      name: person.character,
                      show: {
                        connect: {
                          id: show.id
                        }
                      },
                      status: CharacterStatus.alive,
                      tmdbId: person.credit_id
                    },
                    update: {},
                    where: {
                      tmdbId: person.credit_id
                    }
                  })
                })
              )
            },
            title: data.name
          })),
          {
            concurrent: true
          }
        )
      },
      title: 'Fetching trending shows'
    },
    {
      task: async () =>
        new Listr([
          {
            task: () => index.clearObjects(),
            title: 'Clear index'
          },
          {
            task: async () => {
              const shows = await prisma.show.findMany()

              return index
                .saveObjects(
                  shows.map((show) => ({
                    image: show.image,
                    name: show.name,
                    objectID: show.tmdbId,
                    popularity: show.popularity,
                    slug: show.slug
                  }))
                )
                .wait()
            },
            title: 'Rebuild index'
          }
        ]),
      title: 'Updating Algolia index'
    }
  ])

  await tasks.run()

  await prisma.$disconnect()
}

main()
