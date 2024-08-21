import { describe, expect, it } from 'vitest'
import { createTestDom } from '../../../../support/test-dom'
import { ChangeInstructionTypes } from '../../../../../lib/types'
import { compileForInputValue } from '../../../../../lib/rendering/change/instructions/nodes/input'

describe('compileForInputValue instructions', () => {
  it('returns an empty instruction set if the value is not an input', () => {
    const document = createTestDom()
    const source = document.createElement('div')
    source.value = 'not-an-input'
    const target = document.createTextNode('div')
    source.value = 'still-not-an-input'

    expect(compileForInputValue(source, target)).toEqual([])
  })

  it('returns an empty instruction set if the input value has not changed', () => {
    const document = createTestDom()
    const source = document.createElement('input')
    source.value = 'abc'
    const target = document.createElement('input')
    target.value = 'abc'

    expect(compileForInputValue(source, target)).toEqual([])
  })

  it('returns the right instructions for a change of input value', () => {
    const document = createTestDom()
    const source = document.createElement('input')
    source.value = 'abc'
    const target = document.createElement('input')
    target.value = 'def'

    expect(compileForInputValue(source, target)).toEqual([
      {
        source,
        target,
        type: ChangeInstructionTypes.changeValue,
        data: {
          name: 'value',
          value: 'def',
        },
      },
    ])
  })
})
