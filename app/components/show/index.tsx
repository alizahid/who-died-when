import { Show } from '@prisma/client'
import { FunctionComponent } from 'react'
import { Link } from 'remix'
import { twMerge } from 'tailwind-merge'

import { Poster } from './poster'

type Props = {
  className?: string
  show: Show
}

export const ShowCard: FunctionComponent<Props> = ({ className, show }) => (
  <Link
    className={twMerge(
      'bg-white rounded-lg overflow-hidden hover:brightness-110 transition-all shadow-sm',
      className
    )}
    to={`/shows/${show.slug}`}>
    <Poster title={show.name} url={show.image} />

    <h3 className="m-3 text-xl font-semibold">{show.name}</h3>
  </Link>
)
