export type Hits = {
  characters: Array<CharacterHit>
  shows: Array<ShowHit>
}

export type CharacterHit = {
  objectID: string
  image: string
  name: string
  show: {
    name: string
    slug: string
  }
}

export type ShowHit = {
  objectID: string
  image: string
  name: string
  popularity: number
  slug: string
}
