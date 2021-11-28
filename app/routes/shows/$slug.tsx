import { PrismaClient } from '@prisma/client'
import { FunctionComponent, useState } from 'react'
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'

import { CharacterCard } from '~/components/character'
import { Poster } from '~/components/show/poster'
import { Layout } from '~/layouts/main'
import { ShowWithCharactersAndDeaths } from '~/types'

type ShowData = {
  show: ShowWithCharactersAndDeaths
}

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug

  if (!slug) {
    throw new Response('Not Found', {
      status: 404
    })
  }

  const prisma = new PrismaClient()

  const show = await prisma.show.findUnique({
    include: {
      characters: {
        include: {
          actor: true,
          deaths: true
        }
      }
    },
    where: {
      slug
    }
  })

  await prisma.$disconnect()

  if (!show) {
    throw new Response('Not Found', {
      status: 404
    })
  }

  const data: ShowData = {
    show
  }

  return json(data)
}

export const meta: MetaFunction = ({ data }) => ({
  description: `Find out if your favorites characters are dead or alive on ${data?.show.name}. Warning: may contain spoilers!`,
  title: `${data?.show.name} / Who Died When?`
})

const ShowPage: FunctionComponent = () => {
  const { show } = useLoaderData<ShowData>()

  const [visible, setVisible] = useState(false)

  return (
    <Layout className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-auto">
        <Poster
          alt={show.name}
          className="rounded-lg shadow-sm lg:max-h-96"
          loading="eager"
          src={show.image}
        />
      </div>

      <div className="flex-1 mt-4 lg:mt-0 lg:ml-8">
        <h1 className="text-4xl font-bold">{show.name}</h1>
        <p className="mt-4 text-gray-600">{show.overview}</p>

        <div className="flex items-center justify-between mt-8">
          <h2 className="text-2xl font-semibold">Cast</h2>

          <button
            className="p-2 text-sm font-medium leading-none text-white rounded-lg bg-primary-600"
            onClick={() => setVisible(!visible)}>
            {visible ? 'Hide' : 'Reveal'}
          </button>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {show.characters.map((character) => (
            <CharacterCard
              character={character}
              key={character.id}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ShowPage
