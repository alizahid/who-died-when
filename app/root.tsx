import { FunctionComponent } from 'react'
import { LinksFunction, LoaderFunction, useLoaderData } from 'remix'
import { Outlet } from 'remix'

import stylesheet from '~/styles/global.css'

import { Document } from './document'

export { CatchBoundary, ErrorBoundary } from './error'

export const links: LinksFunction = () => [
  {
    href: stylesheet,
    rel: 'stylesheet'
  }
]

export const loader: LoaderFunction = () => ({
  env: {
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_KEY: process.env.ALGOLIA_SEARCH_KEY
  }
})

const App: FunctionComponent = () => {
  const data = useLoaderData()

  return (
    <Document data={data}>
      <Outlet />
    </Document>
  )
}

export default App
