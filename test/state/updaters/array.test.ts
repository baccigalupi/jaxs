import { expect, it, describe } from 'vitest'
import { remove, removeBy, insertAt } from '@lib/state/updaters/array'

describe('array updaters', () => {
  describe('remove', () => {
    it('removes a single matching item from an array', () => {
      const original = ['a', 'b', 'c']
      const result = remove(original, 'b')

      expect(result).toEqual(['a', 'c'])
    })

    it('returns a new array (does not mutate original)', () => {
      const original = ['a', 'b', 'c']
      const result = remove(original, 'b')

      expect(result).not.toBe(original)
      expect(original).toEqual(['a', 'b', 'c'])
    })
  })

  describe('removeBy', () => {
    it('removes items using the matcher function passed in', () => {
      const original = ['apple', 'banana', 'apricot', 'cherry']
      const result = removeBy(original, (item) => item.startsWith('a'))

      expect(result).toEqual(['banana', 'cherry'])
    })

    it('returns a new array (does not mutate original)', () => {
      const original = ['a', 'b', 'c', 'ab']
      const result = removeBy(original, (item) => item.includes('a'))

      expect(result).not.toBe(original)
      expect(original).toEqual(['a', 'b', 'c', 'ab'])
    })
  })

  describe('insertAt', () => {
    it('inserts an item at the specified index', () => {
      const original = ['a', 'b', 'd']
      const result = insertAt(original, 2, 'c')

      expect(result).toEqual(['a', 'b', 'c', 'd'])
    })
    it('mutates and returns the original array', () => {
      const original = ['a', 'b', 'c']
      const result = insertAt(original, 1, 'x')

      expect(result).toBe(original)
      expect(original).toEqual(['a', 'x', 'b', 'c'])
    })
  })
})
