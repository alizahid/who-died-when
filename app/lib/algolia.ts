import algoliasearch, { SearchClient } from 'algoliasearch/lite'

import { CharacterHit, Hits, ShowHit } from '~/types/algolia'

import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY } from './config'

class Algolia {
  client?: SearchClient

  init(): SearchClient {
    if (this.client) {
      return this.client
    }

    this.client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)

    return this.client
  }

  async search(query: string): Promise<Hits> {
    const client = this.init()

    const { results } = await client.search([
      {
        indexName: 'characters',
        params: {
          hitsPerPage: 5
        },
        query
      },
      {
        indexName: 'shows',
        params: {
          hitsPerPage: 5
        },
        query
      }
    ])

    const [characters, shows] = results

    return {
      characters: characters.hits as Array<CharacterHit>,
      shows: shows.hits as Array<ShowHit>
    }
  }
}

export const algolia = new Algolia()
