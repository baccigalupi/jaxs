import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'lib'),
      '@support': path.resolve(__dirname, 'test/support'),
    },
  },
  plugins: [
    dts({
      include: ['lib/**/*'],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
      rollupTypes: true,
    }),
  ],
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
