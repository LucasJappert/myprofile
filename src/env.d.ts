/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD_ID?: string
  readonly VITE_ANALYTICS_URL?: string
  readonly VITE_ANALYTICS_ALLOW_DEV?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
