import { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
}

export const Spinner: FunctionComponent<Props> = ({ className }) => (
  <div
    className={twMerge(
      'border-2 animate-spin rounded-full border-primary-600 h-6 w-6',
      className
    )}
    style={{
      borderTopColor: 'transparent'
    }}
  />
)
