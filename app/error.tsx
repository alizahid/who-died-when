import { FunctionComponent } from 'react'
import { useCatch } from 'remix'

import { Document } from './document'
import { Layout } from './layouts/main'

export const CatchBoundary: FunctionComponent = () => {
  const caught = useCatch()

  const message =
    caught.status === 404
      ? "We can't find what you're looking for"
      : 'Something went wrong'

  return (
    <Document title={caught.statusText}>
      <Layout className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">{caught.statusText}</h1>
        <p className="mt-2 text-lg">{message}</p>
      </Layout>
    </Document>
  )
}

type ErrorBoundaryProps = {
  error: Error
}

export const ErrorBoundary: FunctionComponent<ErrorBoundaryProps> = () => (
  <Document title="Error">
    <Layout className="flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-lg">
        We&#39;re working on fixing it. Try again later.
      </p>
    </Layout>
  </Document>
)
