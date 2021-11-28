import { FunctionComponent } from 'react'

import { TMDB_IMAGE_URL } from '~/lib/config'

type Props = {
  className?: string
  thumb?: boolean
  url: string
}

export const Poster: FunctionComponent<Props> = ({ className, thumb, url }) => (
  <img
    className={className}
    src={[TMDB_IMAGE_URL, thumb ? 'w92' : 'w780', url].join('')}
  />
)
