import { describe, expect, it } from 'vitest'
import { compileForText } from '../../../../lib/rendering/change/nodes/text'
import { createTestDom } from '../../../support/test-dom'
import { ChangeInstructionTypes } from '../../../../lib/types'

describe('compileForText instructions', () => {
  it('returns an empty instruction set if the value is the same', () => {
    const document = createTestDom()
    const source = document.createTextNode('static')
    const target = document.createTextNode('static')

    expect(compileForText(source, target)).toEqual([])
  })

  it('returns a text change instruction when the text content is different', () => {
    const document = createTestDom()
    const source = document.createTextNode('static')
    const target = document.createTextNode('nope dynamic really')

    expect(compileForText(source, target)).toEqual([
      {
        source: source,
        target: target,
        data: {},
        type: ChangeInstructionTypes.changeText,
      },
    ])
  })
})
