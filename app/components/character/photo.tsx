import { FunctionComponent } from 'react'

import { TMDB_IMAGE_URL } from '~/lib/config'

type Props = {
  className?: string
  url: string
}

export const Photo: FunctionComponent<Props> = ({ className, url }) => (
  <img className={className} src={[TMDB_IMAGE_URL, 'h632', url].join('')} />
)
