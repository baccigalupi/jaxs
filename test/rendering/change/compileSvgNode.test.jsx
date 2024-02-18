import { describe, expect, test, mock } from 'bun:test'
import { createTestDom } from '../../support/testDom'

import jsx from '../../../src/jsx'
import { ChangeInstructions } from '../../../src/types'
import { compileChange } from '../../../src/rendering/change/compile'
const spy = () => mock(() => {})

const buildRenderKit = () => {
  return {
    document: createTestDom(),
    subscribe: spy(),
    publish: spy()  
  }
}

// add/replace/insert/move handled by children tests
describe('compileChange for a elements', () => {
  test('returns change instructions for a diff in the children of the svg', () => {
    const sourceTemplate = (
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path id="svg-path-1" d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path id="svg-path-2" d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
      </svg>
    )
    const targetTemplate = (
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path id="svg-path-2" d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
      </svg>
    )

    const renderKit = buildRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    const instructions = compileChange(source, target, parent)
    const instructionTypes = instructions.map((instruction) => instruction.type)

    expect(instructionTypes).toEqual([
      ChangeInstructions.removeNode,
      ChangeInstructions.insertNode
    ])
  })
})
