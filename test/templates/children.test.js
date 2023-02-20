import { describe, expect, it } from '../../devDeps.ts';

import { ensureArray } from '../../lib/rendering/templates/children.ts';

describe('templates, children, ensureArray', () => {
  it('returns an empty array if nothing was passed in', () => {
    expect(ensureArray()).toEqual([]);
  });

  it('returns an array if passed an  array', () => {
    expect(ensureArray(['foo'])).toEqual(['foo']);
  });

  it('returns a flat array if passed a nested array', () => {
    expect(ensureArray([['bar']])).toEqual(['bar']);
    expect(ensureArray(['foo', ['bar']])).toEqual(['foo', 'bar']);
  });
});
