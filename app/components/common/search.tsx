import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Link } from 'remix'
import { twMerge } from 'tailwind-merge'
import useOnClickOutside from 'use-onclickoutside'

import { algolia } from '~/lib/algolia'
import { Hits } from '~/types/algolia'

import { Photo } from '../character/photo'
import { Poster } from '../show/poster'
import { Spinner } from './spinner'

type Props = {
  className?: string
}

export const Search: FunctionComponent<Props> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [focused, setFocused] = useState(false)
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<Hits>()

  useOnClickOutside(ref, () => setFocused(false))

  const search = useCallback(async (query: string) => {
    const hits = await algolia.search(query)

    setHits(hits)
  }, [])

  useEffect(() => {
    if (query) {
      search(query)
    }
  }, [query, search])

  const show = focused && query.length > 0

  return (
    <div className={twMerge('relative shadow-sm', className)} ref={ref}>
      <input
        className={twMerge(
          'w-full px-3 py-2 bg-white rounded-lg focus:ring-2 ring-primary-400',
          show && 'rounded-b-none ring-2'
        )}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocused(true)}
        placeholder="Search"
        type="text"
        value={query}
      />

      {show && (
        <div className="absolute right-0 z-10 flex flex-col w-full overflow-hidden bg-white rounded-b-lg max-h-96 ring-2 ring-primary-400 top-full">
          {hits ? (
            <div className="overflow-auto">
              <h3 className="m-3 text-lg font-semibold leading-none">Shows</h3>
              {hits.shows.length > 0 ? (
                hits.shows.map((show) => (
                  <Link
                    className="flex items-center p-3 hover:bg-primary-50"
                    key={show.objectID}
                    onClick={() => setFocused(false)}
                    to={`/shows/${show.slug}`}>
                    <Poster
                      alt={show.name}
                      className="max-w-[4rem]"
                      loading="eager"
                      src={show.image}
                      thumb
                    />
                    <div className="ml-2 font-medium">{show.name}</div>
                  </Link>
                ))
              ) : (
                <div className="m-3 text-sm font-medium text-gray-600">
                  Nothing found
                </div>
              )}

              <h3 className="m-3 text-lg font-semibold leading-none">
                Characters
              </h3>
              {hits.characters.length > 0 ? (
                hits.characters.map((character) => (
                  <Link
                    className="flex items-center p-3 hover:bg-primary-50"
                    key={character.objectID}
                    onClick={() => setFocused(false)}
                    to={`/shows/${character.show.slug}`}>
                    <Photo
                      alt={character.name}
                      className="max-w-[4rem]"
                      loading="eager"
                      src={character.image}
                      thumb
                    />
                    <div className="ml-2 font-medium">{character.name}</div>
                  </Link>
                ))
              ) : (
                <div className="m-3 text-sm font-medium text-gray-600">
                  Nothing found
                </div>
              )}
            </div>
          ) : (
            <Spinner className="m-3" />
          )}
        </div>
      )}
    </div>
  )
}
