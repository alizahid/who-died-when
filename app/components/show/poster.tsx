import { FunctionComponent, ImgHTMLAttributes } from 'react'

import { TMDB_IMAGE_URL } from '~/lib/config'

type Props = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'alt' | 'loading' | 'src'
> & {
  thumb?: boolean
}

export const Poster: FunctionComponent<Props> = ({
  alt,
  className,
  loading = 'lazy',
  src,
  thumb
}) => (
  <img
    alt={alt}
    className={className}
    height={1169 / (thumb ? 4 : 1)}
    loading={loading}
    src={[TMDB_IMAGE_URL, thumb ? 'w185' : 'w780', src].join('')}
    width={780 / (thumb ? 4 : 1)}
  />
)
