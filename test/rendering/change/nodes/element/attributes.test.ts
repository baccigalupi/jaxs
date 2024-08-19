import { describe, expect, it, vi } from 'vitest'
import { createTestDom } from '../../../../support/test-dom'
import { ChangeInstructionTypes, JaxsElement } from '../../../../../lib/types'
import { compileForAttributes } from '../../../../../lib/rendering/change/nodes/element/attributes'

describe('compileForEvents instructions', () => {
  it('is empty when neither source nor target have an attributes', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    const target = dom.createElement('button') as JaxsElement

    const instructions = compileForAttributes(source, target)

    expect(instructions).toEqual([])
  })

  it('is empty when all the attributes are the same', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    source.setAttribute('value', 'Submit')
    const target = dom.createElement('button') as JaxsElement
    target.setAttribute('value', 'Submit')

    const instructions = compileForAttributes(source, target)

    expect(instructions).toEqual([])
  })

  it('creates remove instructions when an event is no longer in the target', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    source.setAttribute('value', 'Submit')
    const target = dom.createElement('button') as JaxsElement

    const instructions = compileForAttributes(source, target)

    expect(instructions).toEqual([
      {
        source,
        target,
        type: ChangeInstructionTypes.removeAttribute,
        data: {
          isSvg: false,
          name: 'value',
        },
      },
    ])
  })

  it('creates an add instruction when a different event has been added to the target', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    const target = dom.createElement('button') as JaxsElement
    target.setAttribute('value', 'Submit')

    const instructions = compileForAttributes(source, target)

    expect(instructions).toEqual([
      {
        source,
        target,
        type: ChangeInstructionTypes.addAttribute,
        data: {
          isSvg: false,
          name: 'value',
          value: 'Submit',
        },
      },
    ])
  })

  it('creates an update instruction when an event of a certain name has changed', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    source.setAttribute('value', 'Submit')
    const target = dom.createElement('button') as JaxsElement
    target.setAttribute('value', 'Save')

    const instructions = compileForAttributes(source, target)

    expect(instructions).toEqual([
      {
        source,
        target,
        type: ChangeInstructionTypes.updateAttribute,
        data: {
          isSvg: false,
          name: 'value',
          value: 'Save',
        },
      },
    ])
  })

  it('passes along the isSvg flag to the instructions', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    source.setAttribute('value', 'Submit')
    const target = dom.createElement('button') as JaxsElement
    target.setAttribute('value', 'Save')

    const instructions = compileForAttributes(source, target, true)

    expect(instructions).toEqual([
      {
        source,
        target,
        type: ChangeInstructionTypes.updateAttribute,
        data: {
          isSvg: true,
          name: 'value',
          value: 'Save',
        },
      },
    ])
  })
})
