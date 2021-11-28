import { FunctionComponent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { CharacterWithActorAndDeaths } from '~/types'

import { Icon } from '../common/icon'
import { Photo } from './photo'

type Props = {
  className?: string
  character: CharacterWithActorAndDeaths
  visible: boolean
}

export const CharacterCard: FunctionComponent<Props> = ({
  character,
  className,
  visible
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={twMerge(
        'bg-white rounded-lg overflow-hidden relative shadow-sm',
        className
      )}
      onClick={() => setOpen(!open)}>
      {character.actor && <Photo url={character.actor.image} />}

      <div className="m-3">
        <h3 className="text-lg font-semibold">{character.name}</h3>
        <h4 className="font-medium text-gray-600">{character.actor?.name}</h4>
      </div>

      {(visible || open) && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center p-4 text-center bg-white bg-opacity-80">
          <Icon
            className={
              character.status === 'alive'
                ? 'text-emerald-600'
                : 'text-rose-600'
            }
            name={character.status}
            size={64}
          />

          {character.deaths.map((death) => (
            <div className="mt-4" key={death.id}>
              <div className="text-lg font-semibold">{death.when}</div>
              <div className="font-medium">{death.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
