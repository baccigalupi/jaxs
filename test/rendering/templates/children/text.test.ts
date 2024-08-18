import { expect, describe, it } from 'vitest'
import {
  isTextValue,
  textNode,
  replaceTextNodes,
} from '../../../../lib/rendering/templates/children/text'
import { Tag } from '../../../../lib/rendering/templates/tag'
import { TextTemplate } from '../../../../lib/rendering/templates/text'

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

  it('textNode return a text template with the right value', () => {
    const template = textNode(7)

    expect(template.value).toEqual('7')
  })

  describe('replaceTextNodes', () => {
    it('return the element, if it is not a text value', () => {
      const tag = new Tag('p', {})
      const replacement = replaceTextNodes(tag)

      expect(replacement).toEqual(tag)
    })

    it('return the element, if it is not a text value', () => {
      const replacement = replaceTextNodes(88)

      expect(replacement instanceof TextTemplate).toEqual(true)
      expect((replacement as TextTemplate).value).toEqual('88')
    })
  })
})
