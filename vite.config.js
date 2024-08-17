import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/jaxs-state.ts'),
      name: 'jaxs-state',
      fileName: 'jaxs-state',
    },
  },
})
