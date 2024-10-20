/** @jsx jsx */
/** @jsxFrag jsx.fragment */

import { describe, expect, it, vi } from 'vitest'
import { jsx } from '../../../../lib/jaxs'
import { createRenderKit } from '../../../support/render-kit'
import { performChange } from '../../../../lib/rendering/update/perform-change'
import { JaxsElement } from '../../../../lib/types'
import { modifyDomCache } from '../../../../lib/rendering/templates/bound/modify-dom-cache'
import { debugElement, debugInstruction } from '../../../support/debugging'

describe('modifyDomCache', () => {
  it('when replacing a top level node, it returns the correct top level dom', () => {
    const sourceTemplate = <>Hello</>
    const targetTemplate = (
      <>
        <h1>Hello</h1>
      </>
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById(
      'app',
    ) as unknown as JaxsElement
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])
    const dom = source

    const instructions = performChange(source, target, parent)
    const newDom = modifyDomCache(instructions, dom, parent)

    expect(newDom.length).toEqual(1)
    expect(newDom[0].nodeName).toEqual('H1')
  })

  it('ignores replacements not at the root dom level', () => {
    const sourceTemplate = (
      <div id="foo">
        <p>Hello</p>
      </div>
    )
    const targetTemplate = (
      <div id="foo">
        <span>Hello</span>
      </div>
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById(
      'app',
    ) as unknown as JaxsElement
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])
    const dom = source

    const instructions = performChange(source, target, parent)
    const newDom = modifyDomCache(instructions, dom, parent)

    expect(newDom).toEqual(dom)
  })

  it('adds an element to the dom too', () => {
    const sourceTemplate = (
      <>
        <li>one</li>
        <li>... more</li>
      </>
    )
    const targetTemplate = (
      <>
        <li>one</li>
        <li>two</li>
        <li>... more</li>
      </>
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById(
      'app',
    ) as unknown as JaxsElement
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])
    const dom = source

    const instructions = performChange(source, target, parent)
    const newDom = modifyDomCache(instructions, dom, parent)

    expect(newDom.length).toEqual(3)
    expect(newDom[1].textContent).toEqual('two')
  })

  it('ignores nested insertions', () => {
    const sourceTemplate = (
      <li>
        <li>one</li>
        <li>... more</li>
      </li>
    )
    const targetTemplate = (
      <li>
        <li>one</li>
        <li>two</li>
        <li>... more</li>
      </li>
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById(
      'app',
    ) as unknown as JaxsElement
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])
    const dom = source

    const instructions = performChange(source, target, parent)
    const newDom = modifyDomCache(instructions, dom, parent)

    expect(newDom.length).toEqual(1)
  })

  it('deletes elements from the dom cache', () => {
    const sourceTemplate = (
      <>
        <li>one</li>
        <li>two</li>
        <li>... more</li>
      </>
    )
    const targetTemplate = (
      <>
        <li>one</li>
        <li>... more</li>
      </>
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById(
      'app',
    ) as unknown as JaxsElement
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])
    const dom = source

    const instructions = performChange(source, target, parent)
    const newDom = modifyDomCache(instructions, dom, parent)

    expect(newDom.length).toEqual(2)
    expect(newDom[1].textContent).toEqual('... more')
  })

  it('ignores nested elements being deleted', () => {
    const sourceTemplate = (
      <li>
        <li>one</li>
        <li>two</li>
        <li>... more</li>
      </li>
    )
    const targetTemplate = (
      <li>
        <li>one</li>
        <li>... more</li>
      </li>
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById(
      'app',
    ) as unknown as JaxsElement
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])
    const dom = source

    const instructions = performChange(source, target, parent)
    const newDom = modifyDomCache(instructions, dom, parent)

    expect(newDom.length).toEqual(1)
  })
})
