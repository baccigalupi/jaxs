import { bundle } from 'https://deno.land/x/emit/mod.ts';
import { version } from './version.js';

const result = await bundle(`${Deno.cwd()}/lib/jaxs.js`);
const { code } = result;

Deno.writeTextFile(`${Deno.cwd()}/lib/jaxs-${version}.js`, code);
