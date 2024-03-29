import { describe, expect, test, mock } from 'bun:test'
import { createTestDom } from '../../support/testDom'

import jsx from '../../../src/jsx'
import { ChangeInstructions } from '../../../src/types'
import { compileChildren } from '../../../src/rendering/change/instructions/children'
const spy = () => mock(() => {})

describe('compileChildren: add, remove, replace and move operations', () => {
  const buildRenderKit = () => {
    return {
      document: createTestDom(),
      subscribe: spy(),
      publish: spy(),
      state: {}
    }
  }

  test('leaves identical text as is', () => {
    const sourceTemplate = <p>Hello</p>
    const targetTemplate = <p>Hello</p>

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChildren(source, target, parent)

    expect(instructions.length).toEqual(0)
  })

  test('replaces text with an element', () => {
    const sourceTemplate = (
      <>
        <p>Hello</p>
        Here is some content!
      </>
    )
    const targetTemplate = (
      <>
        <p>Hello</p>
        <p>Here is some content!</p>
      </>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChildren(source, target, parent)

    expect(instructions.length).toEqual(1)
    const [instruction] = instructions
    expect(instruction.type).toEqual(ChangeInstructions.replaceNode)
  })

  test('replaces an element with text', () => {
    const sourceTemplate = (
      <>
        <p>Hello</p>
        <p>Here is some content!</p>
      </>
    )
    const targetTemplate = (
      <>
        <p>Hello</p>
        Here is some content!
      </>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChildren(source, target, parent)
    expect(instructions.length).toEqual(1)
    const [instruction] = instructions
    expect(instruction.type).toEqual(ChangeInstructions.replaceNode)
  })

  test('reduces the source when the target removes an item', () => {
    const sourceTemplate = (
      <>
        <p>Hello</p>
        <p>Here is some content!</p>
      </>
    )
    const targetTemplate = (
      <>
        <p>Hello</p>
      </>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChildren(source, target, parent)
    expect(instructions.length).toEqual(1)
    const [instruction] = instructions
    expect(instruction.type).toEqual(ChangeInstructions.removeNode)
    expect(instruction.source).toEqual(source[1])
  })

  test('adds to the end of the source when the target has added an item there', () => {
    const sourceTemplate = (
      <>
        <p>Hello</p>
      </>
    )
    const targetTemplate = (
      <>
        <p>Hello</p>
        <p>Here is some content!</p>
      </>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChildren(source, target, parent)
    expect(instructions.length).toEqual(1)
    const [instruction] = instructions
    expect(instruction.type).toEqual(ChangeInstructions.insertNode)
    expect(instruction.source).toEqual(target[1])
    expect(instruction.data.index).toEqual(1)
  })

  test('creates insert instructions when the same element gets reordeded', () => {
    const sourceTemplate = (
      <>
        <h1>Email</h1>
        <p>Identifiers are important!</p>
      </>
    )

    const targetTemplate = (
      <>
        <p>Identifiers are important!</p>
        <h1>Email</h1>
      </>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChildren(source, target, parent)
    expect(instructions.length).toEqual(2)

    const [moveH1, moveP] = instructions

    expect(moveH1.type).toEqual(ChangeInstructions.insertNode)
    expect(moveH1.source).toEqual(source[1])
    expect(moveH1.data.index).toEqual(0)

    expect(moveP.type).toEqual(ChangeInstructions.insertNode)
    expect(moveP.source).toEqual(source[0])
    expect(moveP.data.index).toEqual(1)
  })

  test('adds an element in the middle and shifts the remainder down', () => {
    const sourceTemplate = (
      <>
        <h1>Email</h1>
        <input type='text' name='email' />
        <input type='submit' value='save' />
      </>
    )

    const targetTemplate = (
      <>
        <h1>Email</h1>
        <p>That doesn't look like a real email! Try again?</p>
        <input type='text' name='email' />
        <input type='submit' value='save' />
      </>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChildren(source, target, parent)
    const [insertP, moveInput, moveSubmit] = instructions

    expect(insertP.type).toEqual(ChangeInstructions.insertNode)
    expect(insertP.source).toEqual(target[1])
    expect(insertP.data.index).toEqual(1)

    expect(moveInput.type).toEqual(ChangeInstructions.insertNode)
    expect(moveInput.source).toEqual(source[1])
    expect(moveInput.data.index).toEqual(2)

    expect(moveSubmit.type).toEqual(ChangeInstructions.insertNode)
    expect(moveSubmit.source).toEqual(source[2])
    expect(moveSubmit.data.index).toEqual(3)
  })

  test('does the right recursion stuff when updating a child', () => {
    const sourceTemplate = (
      <div class='foo'>
        Foo is happening
      </div>
    )

    const targetTemplate = (
      <div class='bar'>
        <h1>Bar instead, forever!</h1>
      </div>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChildren(source, target, parent)
    const [replaceChild, changeClass] = instructions

    expect(replaceChild.type).toEqual(ChangeInstructions.replaceNode)
    expect(replaceChild.source).toEqual(source[0].childNodes[0])
    expect(replaceChild.target).toEqual(target[0].childNodes[0])

    expect(changeClass.type).toEqual(ChangeInstructions.updateAttribute)
    expect(changeClass.source).toEqual(source[0])
    expect(changeClass.data).toEqual({
      name: 'class',
      value: 'bar',
      isSvg: false
    })
  })

  test('completely swaps out content', () => {
    const sourceTemplate = (
      <>
        <h1 class='member-content'>Hello member!</h1>
        <p>Having a good day?</p>
      </>
    )
    const targetTemplate = (
      <p class='guest-content'>Oh nothing to see! Move along ...</p>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChildren(source, target, parent)
    const [removeH1, moveP, addAttribute, changeText] = instructions

    expect(removeH1.type).toEqual(ChangeInstructions.removeNode)
    expect(removeH1.source).toEqual(source[0])

    expect(moveP.type).toEqual(ChangeInstructions.insertNode)
    expect(moveP.source).toEqual(source[1])
    expect(moveP.data.index).toEqual(0)

    expect(addAttribute.type).toEqual(ChangeInstructions.addAttribute)
    expect(addAttribute.source).toEqual(source[1])
    expect(addAttribute.data.name).toEqual('class')

    expect(changeText.type).toEqual(ChangeInstructions.changeText)
    expect(changeText.source).toEqual(source[1].childNodes[0])
  })
})
