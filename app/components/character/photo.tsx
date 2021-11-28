import { FunctionComponent } from 'react'

import { TMDB_IMAGE_URL } from '~/lib/config'

type Props = {
  className?: string
  thumb?: boolean
  title?: string
  url: string
}

export const Photo: FunctionComponent<Props> = ({
  className,
  thumb,
  title,
  url
}) => (
  <img
    alt={title}
    className={className}
    src={[TMDB_IMAGE_URL, thumb ? 'w185' : 'h632', url].join('')}
  />
)
