declare global {
  interface Window {
    env: {
      ALGOLIA_APP_ID: string
      ALGOLIA_SEARCH_KEY: string
      ALGOLIA_INDEX: string
    }
  }
}

export {}
