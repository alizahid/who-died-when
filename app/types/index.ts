import { Actor, Character, Death, Show } from '@prisma/client'

export type ShowWithCharactersAndDeaths = Show & {
  characters: Array<CharacterWithActorAndDeaths>
}

export type CharacterWithActorAndDeaths = Character & {
  actor: Actor
  deaths: Array<Death>
}

export type DeathWithCharacterAndShow = Death & {
  character: CharacterWithShow
}

export type CharacterWithShow = Character & {
  show: Show
}
