import { resolve } from 'path'
import { defineConfig } from 'vite'

const thisDir = `${process.cwd()}/cypress/apps`

export default defineConfig({
  root: `${thisDir}/src`,
  build: {
    rollupOptions: {
      input: {
        index: `${thisDir}/src/index.html`,
        nested_children: `${thisDir}/src/nested-children.html`,
        root: `${thisDir}/src/root.html`,
        svg: `${thisDir}/src/svg.html`,
      },
      output: {
        dir: `${thisDir}/dist`,
      },
    },
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'jsx',
    jsxFragment: 'jsx.fragment',
  },
  server: {
    port: 1234,
  },
})
