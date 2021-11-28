import { FunctionComponent, ImgHTMLAttributes } from 'react'

import { TMDB_IMAGE_URL } from '~/lib/config'

type Props = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'alt' | 'loading' | 'src'
> & {
  thumb?: boolean
}

export const Photo: FunctionComponent<Props> = ({
  alt,
  className,
  loading = 'lazy',
  src,
  thumb
}) => (
  <img
    alt={alt}
    className={className}
    loading={loading}
    src={[TMDB_IMAGE_URL, thumb ? 'w185' : 'h632', src].join('')}
  />
)
