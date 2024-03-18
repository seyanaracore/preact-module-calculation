import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import ledExpressUrl from './src/consts/ledExrpessUrl'

// https://vitejs.dev/config/

const isBuild = !!(process.env.NODE_ENV === 'production' && process.env.lib)

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
        target: ledExpressUrl,
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
          @use "@/assets/scss/_variables.scss" as *;
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
