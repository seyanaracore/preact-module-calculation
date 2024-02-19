import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: process.env.lib
    ? {
        target: 'es6',
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: './src/index.tsx',
          name: 'calc',
          // the proper extensions will be added
          fileName: 'form-calculation',
        },
      }
    : undefined,
})
