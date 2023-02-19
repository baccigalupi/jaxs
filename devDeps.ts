export {
  afterEach,
  beforeEach,
  describe,
  it,
} from 'https://deno.land/std@0.174.0/testing/bdd.ts';

export const xit = (name: string, fn: () => void) => {
  Deno.test({ ignore: true, name, fn });
};

export { expect } from 'https://deno.land/x/expect/mod.ts';

export { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
