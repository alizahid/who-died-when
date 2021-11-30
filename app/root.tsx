import { FunctionComponent } from 'react'
import { LinksFunction } from 'remix'
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

const App: FunctionComponent = () => (
  <Document>
    <Outlet />
  </Document>
)

export default App
