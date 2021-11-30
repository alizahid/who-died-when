import { FunctionComponent, ImgHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

import { Image } from '../common/image'

type Props = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'className' | 'alt' | 'src'
> & {
  thumb?: boolean
}

export const Photo: FunctionComponent<Props> = ({
  alt,
  className,
  src,
  thumb
}) => (
  <Image
    alt={alt}
    className={twMerge('bg-primary-200', className)}
    height={632 / (thumb ? 4 : 1)}
    src={'h632' + src}
    width={421 / (thumb ? 4 : 1)}
  />
)
