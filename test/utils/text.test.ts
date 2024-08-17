import { expect, describe, it } from 'vitest'
import { isText } from '../../lib/utils/text'

describe('text', () => {
  describe('isText', () => {
    it('is true when a string', () => {
      expect(isText('foo')).toEqual(true)
    })

    it('is true when a number', () => {
      expect(isText(23)).toEqual(true)
    })

    it('is false when anything else', () => {
      expect(isText({})).toEqual(false)
    })
  })
})
