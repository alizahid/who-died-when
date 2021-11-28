declare namespace NodeJS {
  export interface ProcessEnv {
    FAUNA_SECRET: string
    FAUNA_DOMAIN: string

    TMDB_API_KEY: string

    ALGOLIA_APP_ID: string
    ALGOLIA_ADMIN_KEY: string
    ALGOLIA_INDEX: string
  }
}
