import { PrismaClient } from '@prisma/client'
import { FunctionComponent } from 'react'
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'

import { ShowCard } from '~/components/show'
import { Layout } from '~/layouts/main'
import { CharacterWithShow } from '~/types'

type HomeData = {
  characters: Array<CharacterWithShow>
}

export const loader: LoaderFunction = async () => {
  const prisma = new PrismaClient()

  const characters = await prisma.character.findMany({
    distinct: 'showId',
    include: {
      show: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  await prisma.$disconnect()

  const data: HomeData = {
    characters
  }

  return json(data)
}

export const meta: MetaFunction = () => ({
  description:
    'Find out if characters are dead or alive on your favorite TV shows. Warning: may contain spoilers!',
  title: 'Who Died When?'
})

const HomePage: FunctionComponent = () => {
  const { characters } = useLoaderData<HomeData>()

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Recently updated</h1>

      <section className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {characters.map(({ show }, index) => (
          <ShowCard index={index} key={show.id} show={show} />
        ))}
      </section>
    </Layout>
  )
}

export default HomePage
