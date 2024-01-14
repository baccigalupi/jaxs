import { describe, expect, test } from 'bun:test'

import { ensureArray } from '../../src/rendering/templates/children'

describe('templates, children, ensureArray', () => {
  test('returns an empty array if nothing was passed in', () => {
    expect(ensureArray()).toEqual([])
  })

  test('returns an array if passed an  array', () => {
    expect(ensureArray(['foo'])).toEqual(['foo'])
  })

  test('returns a flat array if passed a nested array', () => {
    expect(ensureArray([['bar']])).toEqual(['bar'])
    expect(ensureArray(['foo', ['bar']])).toEqual(['foo', 'bar'])
  })
})
