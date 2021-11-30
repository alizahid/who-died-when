import { FunctionComponent } from 'react'
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from 'remix'

type Props = {
  title?: string
}

export const Document: FunctionComponent<Props> = ({ children, title }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width,initial-scale=1" name="viewport" />
      {title ? <title>{title}</title> : null}
      <Meta />
      <Links />
    </head>

    <body>
      {children}

      <ScrollRestoration />
      <Scripts />

      {process.env.NODE_ENV === 'development' && <LiveReload />}
    </body>
  </html>
)
