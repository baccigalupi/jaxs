import { bundle } from 'https://deno.land/x/emit/mod.ts';

const result = await bundle(`${Deno.cwd()}/lib/jaxs.ts`, {
  compilerOptions: {
    jsx: 'react',
    jsxFactory: 'jsx',
    jsxFragmentFactory: 'jsx.fragment',
  },
});
const { code } = result;

Deno.writeTextFile(`${Deno.cwd()}/lib/jaxs-dist.js`, code);
