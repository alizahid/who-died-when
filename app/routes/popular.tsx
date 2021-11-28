import { PrismaClient, Show } from '@prisma/client'
import { FunctionComponent } from 'react'
import type { LoaderFunction, MetaFunction } from 'remix'
import { json, useLoaderData } from 'remix'

import { ShowCard } from '~/components/show'
import { Layout } from '~/layouts/main'

type PopularData = {
  shows: Array<Show>
}

export const loader: LoaderFunction = async () => {
  const prisma = new PrismaClient()

  const shows = await prisma.show.findMany({
    orderBy: {
      popularity: 'desc'
    }
  })

  await prisma.$disconnect()

  const data: PopularData = {
    shows
  }

  return json(data)
}

export const meta: MetaFunction = () => ({
  description:
    'Find out if characters are dead or alive on your favorite TV shows. Warning: may contain spoilers!',
  title: 'Popular shows / Who Died When?'
})

const PopularPage: FunctionComponent = () => {
  const { shows } = useLoaderData<PopularData>()

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Popular shows</h1>

      <section className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </section>
    </Layout>
  )
}

export default PopularPage
