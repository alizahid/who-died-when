import { FunctionComponent } from 'react'
import Imgix, { SharedImigixAndSourceProps } from 'react-imgix'

import { IMGIX_DOMAIN } from '~/lib/config'

type Props = Pick<
  SharedImigixAndSourceProps,
  'className' | 'height' | 'src' | 'width'
> & {
  alt?: string
}

export const Image: FunctionComponent<Props> = ({
  alt,
  className,
  height,
  src,
  width
}) => (
  <Imgix
    className={className}
    disableLibraryParam
    disableQualityByDPR
    disableSrcSet
    domain={IMGIX_DOMAIN}
    height={height}
    htmlAttributes={{
      alt
    }}
    src={src}
    width={width}
  />
)
