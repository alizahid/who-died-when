/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { CharacterStatus, PrismaClient } from '@prisma/client'
import algoliasearch from 'algoliasearch'
import axios from 'axios'
import { kebabCase } from 'lodash'

const prisma = new PrismaClient()

const main = async () => {
  const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  })

  const {
    data: { results }
  } = await api.get<{
    results: Array<{
      id: number
      name: string
      overview: string
      popularity: number
      poster_path: string
    }>
  }>('/trending/tv/week')

  await Promise.all(
    results.map(async (data) => {
      if (!data.poster_path) {
        return
      }

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
      } = await api.get<{
        cast: Array<{
          character: string
          credit_id: string
          id: number
          name: string
          profile_path: string
        }>
      }>(`/tv/${data.id}/credits`)

      return Promise.all(
        cast.map(async (data) => {
          if (!data.profile_path) {
            return
          }

          const actor = await prisma.actor.upsert({
            create: {
              image: data.profile_path,
              name: data.name,
              tmdbId: data.id
            },
            update: {},
            where: {
              tmdbId: data.id
            }
          })

          return prisma.character.upsert({
            create: {
              actor: {
                connect: {
                  id: actor.id
                }
              },
              name: data.character,
              show: {
                connect: {
                  id: show.id
                }
              },
              status: CharacterStatus.alive,
              tmdbId: data.credit_id
            },
            update: {},
            where: {
              tmdbId: data.credit_id
            }
          })
        })
      )
    })
  )

  const shows = await prisma.show.findMany()

  const algolia = algoliasearch(
    process.env.ALGOLIA_APP_ID!,
    process.env.ALGOLIA_ADMIN_KEY!
  )

  const index = algolia.initIndex(process.env.ALGOLIA_INDEX_SHOWS!)

  await index.clearObjects()

  await index
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
}

main()
  .catch((error) => {
    console.error(error)

    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
