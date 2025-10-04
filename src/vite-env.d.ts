/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string
  readonly VITE_NASA_API_KEY: string
  // add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
