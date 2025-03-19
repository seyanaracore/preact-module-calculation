/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROD_BUILD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
