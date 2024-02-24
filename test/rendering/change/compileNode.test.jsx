import { describe, expect, test, mock } from 'bun:test'
import { createTestDom } from '../../support/testDom'

import jsx from '../../../src/jsx'
import { ChangeInstructions } from '../../../src/types'
import { compileChange } from '../../../src/rendering/change/compile'
import { compileForElement } from '../../../src/rendering/change/instructions/element'
const spy = () => mock(() => {})

const buildRenderKit = () => {
  return {
    document: createTestDom(),
    subscribe: spy(),
    publish: spy(),
    state: {}
  }
}

// add/replace/insert/move handled by children tests
describe('compileChange for a elements', () => {
  test('returns an empty instruction set if elements are both text and have the same value', () => {
    const sourceTemplate = (
      <>
        Hello
      </>
    )
    const targetTemplate = (
      <>
        Hello
      </>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChange(source, target, parent)

    expect(instructions).toEqual([])
  })

  test('return a change text instruction if the elements are both text and have different values', () => {
    const sourceTemplate = (
      <>
        hello
      </>
    )
    const targetTemplate = (
      <>
        herro?
      </>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChange(source, target, parent)

    expect(instructions).toEqual([{
      source: source[0],
      target: target[0],
      type: ChangeInstructions.changeText,
      data: {}
    }])
  })

  test(
    'returns attribute change instructions for different elements of the same tag type',
    () => {
      const sourceTemplate = (
        <div
          toBeRemoved='remove-me'
          toBeUpdated='update-me'
          dontUpdate='nope'
        />
      )

      const targetTemplate = (
        <div toBeUpdated='updated' dontUpdate='nope' toBeAdded='add-me' />
      )

      const renderKit = buildRenderKit()
      const parent = renderKit.document.getElementById('app')
      const source = sourceTemplate.render(renderKit)
      const target = targetTemplate.render(renderKit)

      const instructions = compileChange(source, target, parent)
      const [removeAttribute, addAttribute, updateAttribute] = instructions

      expect(removeAttribute.data).toEqual({
        isSvg: false,
        name: 'toberemoved'
      })
      expect(addAttribute.data).toEqual({
        name: 'tobeadded',
        value: 'add-me',
        isSvg: false
      })
      expect(updateAttribute.data).toEqual({
        name: 'tobeupdated',
        value: 'updated',
        isSvg: false
      })
    }
  )

  test('returns change instructions for attributes when the target has more than the source', () => {
    const sourceTemplate = <p>Having a good day?</p>
    const targetTemplate = (
      <p class='guest-content'>Oh nothing to see! Move along ...</p>
    )

    const renderKit = buildRenderKit()
    const [source] = sourceTemplate.render(renderKit)
    const [target] = targetTemplate.render(renderKit)

    const instructions = compileForElement(source, target)
    expect(instructions.length).toEqual(1)
    const [instruction] = instructions
    expect(instruction.type).toEqual(ChangeInstructions.addAttribute)
    expect(instruction.data).toEqual({
      name: 'class',
      value: 'guest-content',
      isSvg: false
    })
  })

  test('returns change instructions for attributes when the source has more than the target', () => {
    const sourceTemplate = (
      <p class='guest-content'>Oh nothing to see! Move along ...</p>
    )
    const targetTemplate = <p>Having a good day?</p>

    const renderKit = buildRenderKit()
    const [source] = sourceTemplate.render(renderKit)
    const [target] = targetTemplate.render(renderKit)

    const instructions = compileForElement(source, target)
    expect(instructions.length).toEqual(1)
    const [instruction] = instructions
    expect(instruction.type).toEqual(ChangeInstructions.removeAttribute)
    expect(instruction.data).toEqual({
      isSvg: false,
      name: 'class'
    })
  })

  test('identifies value changes for inputs even without an attribute', () => {
    const sourceTemplate = <input />
    const targetTemplate = <input />

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    source[0].value = 'hello'
    const target = targetTemplate.render(renderKit)
    target[0].value = 'hola'

    const instructions = compileChange(source, target, parent)

    expect(instructions.length).toEqual(1)
    const [instruction] = instructions
    expect(instruction.data.value).toEqual('hola')
    expect(instruction.type).toEqual(ChangeInstructions.changeValue)
  })

  test(
    'returns an add event instruction when an event exists only on the target',
    () => {
      const sourceTemplate = <a>Go</a>
      const targetTemplate = <a onClick='go-somewhere'>Go</a>

      const renderKit = buildRenderKit()
      const parent = renderKit.document.getElementById('app')
      const source = sourceTemplate.render(renderKit)
      const target = targetTemplate.render(renderKit)

      const [instruction] = compileChange(source, target, parent)
      expect(instruction.type).toEqual(ChangeInstructions.addEvent)
      expect(instruction.data).toEqual({
        name: 'click',
        value: target[0].eventMaps.click.listener
      })
    }
  )

  test(
    'returns an update event instruction when an event value changes',
    () => {
      const sourceTemplate = <a onClick='go-somewhere'>Go</a>
      const targetTemplate = <a onClick='go-somewhere-else'>Go</a>

      const renderKit = buildRenderKit()
      const parent = renderKit.document.getElementById('app')
      const source = sourceTemplate.render(renderKit)
      const target = targetTemplate.render(renderKit)

      const instructions = compileChange(source, target, parent)

      expect(instructions.length).toEqual(1)
      const [instruction] = instructions
      expect(instruction.type).toEqual(ChangeInstructions.updateEvent)
      expect(instruction.data).toEqual({
        name: 'click',
        targetValue: target[0].eventMaps.click.listener,
        sourceValue: source[0].eventMaps.click.listener
      })
    }
  )

  test(
    'returns an remove event instruction when the target doesn\'t have test',
    () => {
      const sourceTemplate = <a onClick='go-somewhere'>Go</a>
      const targetTemplate = <a>Go</a>

      const renderKit = buildRenderKit()
      const parent = renderKit.document.getElementById('app')
      const source = sourceTemplate.render(renderKit)
      const target = targetTemplate.render(renderKit)

      const [instruction] = compileChange(source, target, parent)
      expect(instruction.type).toEqual(ChangeInstructions.removeEvent)
      expect(instruction.data).toEqual({
        name: 'click',
        value: source[0].eventMaps.click.listener
      })
    }
  )

  test('returns changes instruction for both children and parent', () => {
    const sourceTemplate = <p class='invisible'>I am invisible</p>
    const targetTemplate = <p class='visible'>I am visible</p>

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChange(source, target, parent)

    expect(instructions.length).toEqual(2)
    const types = instructions.map((instruction) => instruction.type)
    expect(types).toEqual([
      ChangeInstructions.updateAttribute,
      ChangeInstructions.changeText
    ])
  })
})
