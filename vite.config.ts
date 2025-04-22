import { fileURLToPath, URL } from 'url'
import { preact } from '@preact/preset-vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'

const LED_EXPRESS_URL = 'https://ledexpress.ru'

// https://vitejs.dev/config/
function getViteConfig(env: { ANALYZER?: boolean } & typeof process.env): UserConfig {
  const analyzer = env.ANALYZER ?? false

  const plugins: UserConfig['plugins'] = [
    preact(),
    viteExternalsPlugin({
      jquery: 'jQuery',
    }),
  ]

  if (analyzer) {
    plugins.push(
      visualizer({
        open: true,
      })
    )
  }

  return {
    plugins,
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
    build: {
      target: 'es6',
      cssCodeSplit: true,
      emptyOutDir: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: './src/index.tsx',
        name: 'calc',
        // the proper extensions will be added
        fileName: 'form-calculation',
      },
    },
  }
}

export default defineConfig(getViteConfig(process.env))
