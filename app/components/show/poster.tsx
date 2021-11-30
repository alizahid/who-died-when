import { FunctionComponent, ImgHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import { Image } from '../common/image'

type Props = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'alt' | 'src'
> & {
  thumb?: boolean
}

export const Poster: FunctionComponent<Props> = ({
  alt,
  className,
  src,
  thumb
}) => (
  <Image
    alt={alt}
    className={twMerge('bg-primary-200', className)}
    height={1169 / (thumb ? 4 : 1)}
    src={'w780' + src}
    width={780 / (thumb ? 4 : 1)}
  />
)
