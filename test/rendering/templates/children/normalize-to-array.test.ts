import { expect, describe, it } from 'vitest'
import { normalizeToArray } from '../../../../lib/rendering/templates/children/normalize'

describe('normalizeToArray', () => {
  it('returns a wrapped value, when not an array', () => {
    const value = 'foo'

    const normalized = normalizeToArray(value)

    expect(normalized).toEqual(['foo'])
  })

  it('returns an empty array when falsey', () => {
    const value = undefined

    const normalized = normalizeToArray(value)

    expect(normalized).toEqual([])
  })

  it('flattens the array, when it receives one', () => {
    const value = ['foo', ['bar'], ['baz']]

    const normalized = normalizeToArray(value)

    expect(normalized).toEqual(['foo', 'bar', 'baz'])
  })
})
