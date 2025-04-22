import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { viteExternalsPlugin } from 'vite-plugin-externals'

const LED_EXPRESS_URL = 'https://ledexpress.ru'
const isBuild = !!(process.env.NODE_ENV === 'production' && process.env.lib)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    viteExternalsPlugin({
      jquery: 'jQuery',
    }),
  ],
  server: {
    cors: false,
    proxy: {
      // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      '/upage': {
        secure: false,
        target: LED_EXPRESS_URL,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/variables.scss" as *;
          @use "@/assets/scss/mixins" as *;
        `,
      },
    },
  },
  build: isBuild
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
