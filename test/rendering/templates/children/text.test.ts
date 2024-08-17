import { expect, describe, it } from 'vitest'
import { isTextValue } from '../../../../lib/rendering/templates/children/text'

describe('text', () => {
  describe('isTextValue', () => {
    it('is true when a string', () => {
      expect(isTextValue('foo')).toEqual(true)
    })

    it('is true when a number', () => {
      expect(isTextValue(23)).toEqual(true)
    })

    it('is false when anything else', () => {
      expect(isTextValue({})).toEqual(false)
    })
  })
})
