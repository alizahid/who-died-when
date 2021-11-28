import algoliasearch, { SearchIndex } from 'algoliasearch/lite'

import { ShowHit } from '~/types/algolia'

class Algolia {
  index?: SearchIndex

  init(): SearchIndex {
    return algoliasearch(
      window.env.ALGOLIA_APP_ID,
      window.env.ALGOLIA_SEARCH_KEY
    ).initIndex(window.env.ALGOLIA_INDEX)
  }

  async search(query: string): Promise<Array<ShowHit>> {
    if (!this.index) {
      this.index = this.init()
    }

    const { hits } = await this.index.search<ShowHit>(query, {
      cacheable: true,
      hitsPerPage: 5
    })

    return hits
  }
}

export const algolia = new Algolia()
