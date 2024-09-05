import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/jaxs.ts'),
      name: 'jaxs',
      fileName: 'jaxs',
    },
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'jsx',
    jsxFragment: 'jsx.fragment',
  },
})
