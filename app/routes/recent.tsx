import { PrismaClient } from '@prisma/client'
import { FunctionComponent } from 'react'
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'

import { ShowCard } from '~/components/show'
import { Layout } from '~/layouts/main'
import { DeathWithCharacterAndShow } from '~/types'

type RecentData = {
  deaths: Array<DeathWithCharacterAndShow>
}

export const loader: LoaderFunction = async () => {
  const prisma = new PrismaClient()

  const deaths = await prisma.death.findMany({
    include: {
      character: {
        include: {
          show: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  await prisma.$disconnect()

  const data: RecentData = {
    deaths
  }

  return json(data)
}

export const meta: MetaFunction = () => ({
  description:
    'Find out if characters are dead or alive on your favorite TV shows. Warning: may contain spoilers!',
  title: 'Recent deaths / Who Died When?'
})

const RecentPage: FunctionComponent = () => {
  const { deaths } = useLoaderData<RecentData>()

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Recent deaths</h1>

      <section className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {deaths.map(({ character: { show } }, index) => (
          <ShowCard index={index} key={show.id} show={show} />
        ))}
      </section>
    </Layout>
  )
}

export default RecentPage
