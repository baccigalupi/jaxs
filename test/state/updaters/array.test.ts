import { expect, it, describe } from 'vitest'
import {
  remove,
  removeBy,
  insertAt,
  appendIfUnique,
} from '@lib/state/updaters/array'

describe('array updaters', () => {
  describe('remove', () => {
    it('removes a single matching item from an array', () => {
      const original = ['a', 'b', 'c']
      const result = remove(original, 'b')

      expect(result).toEqual(['a', 'c'])
    })

    it('mutates and returns the original array', () => {
      const original = ['a', 'b', 'c']
      const result = remove(original, 'b')

      expect(result).toBe(original)
      expect(original).toEqual(['a', 'c'])
    })
  })

  describe('removeBy', () => {
    it('removes items using the matcher function passed in', () => {
      const original = ['apple', 'banana', 'apricot', 'cherry']
      const result = removeBy(original, (item) => item.startsWith('a'))

      expect(result).toEqual(['banana', 'cherry'])
    })

    it('mutates and returns the original array', () => {
      const original = ['a', 'b', 'c', 'ab']
      const result = removeBy(original, (item) => item.includes('a'))

      expect(result).toBe(original)
      expect(original).toEqual(['b', 'c'])
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

  describe('appendIfUnique', () => {
    it('appends when item is not present', () => {
      const original = ['apple', 'banana']
      const result = appendIfUnique(original, 'cherry')

      expect(result).toBe(original)
      expect(original).toEqual(['apple', 'banana', 'cherry'])
    })

    it('does not append duplicates', () => {
      const original = [1, 2, 3]
      const result = appendIfUnique(original, 2)

      expect(result).toBe(original)
      expect(original).toEqual([1, 2, 3])
    })
  })
})
