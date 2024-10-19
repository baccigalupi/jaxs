/** @jsx jsx */
/** @jsxFrag jsx.fragment */
import { jsx } from '../../../lib/jaxs'

import { describe, expect, test } from 'vitest'
import { createTestDom, domToString } from '../../support/test-dom'
import { createRenderKit } from '../../support/render-kit'

import { performChange } from '../../../lib/rendering/update/perform-change'

describe('rendering change', () => {
  test('replace top level text element with a tag', () => {
    const sourceTemplate = <>Hello</>
    const targetTemplate = (
      <>
        <h1>Hello</h1>
      </>
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    parent.appendChild(source[0])

    performChange(source, target, parent)

    expect(parent.childNodes.length).toEqual(1)
    expect(parent.childNodes[0].nodeName).toEqual('H1')
  })

  test('replace node of different tag types', () => {
    const sourceTemplate = <h1>Hello</h1>
    const targetTemplate = <div>Hello</div>

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)

    parent.appendChild(source[0])

    performChange(source, target, parent)

    expect(parent.childNodes.length).toEqual(1)
    expect(parent.childNodes[0].nodeName).toEqual('DIV')
  })

  test('does nothing for identical tags', () => {
    const sourceTemplate = <h1>Hello</h1>
    const targetTemplate = <h1>Hello</h1>

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])

    performChange(source, target, parent)

    expect(parent.childNodes.length).toEqual(1)
    expect(parent.childNodes[0]).toEqual(source[0])
  })

  test('changes the text content of the text node in place', () => {
    const sourceTemplate = <>hello</>
    const targetTemplate = <>herro?</>

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])

    performChange(source, target, parent)

    expect(parent.childNodes.length).toEqual(1)
    expect(parent.childNodes[0]).toEqual(source[0])
    expect(parent.childNodes[0].textContent).toEqual('herro?')
  })

  test('changes the value of an input', () => {
    const sourceTemplate = <input />
    const targetTemplate = <input />

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    source[0].value = 'hello'
    const target = targetTemplate.render(renderKit)
    target[0].value = 'hola'
    parent.appendChild(source[0])

    performChange(source, target, parent)

    expect(parent.childNodes.length).toEqual(1)
    expect(parent.childNodes[0]).toEqual(source[0])
    expect(source[0].value).toEqual('hola')
  })

  test('changes attributes in place when the same tag type', () => {
    const sourceTemplate = (
      <div toBeRemoved="remove-me" toBeUpdated="updateMe" dontUpdate="nope" />
    )
    const targetTemplate = (
      <div toBeUpdated="updated" dontUpdate="nope" toBeAdded="add-me" />
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])

    performChange(source, target, parent)

    const sourceRoot = source[0]
    expect(sourceRoot.attributes.getNamedItem('toberemoved')).toEqual(null)
    expect(sourceRoot.attributes.getNamedItem('tobeupdated').value).toEqual(
      'updated',
    )
    expect(sourceRoot.attributes.getNamedItem('dontupdate').value).toEqual(
      'nope',
    )
    expect(sourceRoot.attributes.getNamedItem('tobeadded').value).toEqual(
      'add-me',
    )
  })

  test('adds as event when an event exists only on the target', () => {
    const sourceTemplate = <a>Go</a>
    const targetTemplate = <a onClick="go-somewhere">Go</a>

    const renderKit = createRenderKit()
    const window = renderKit.document.defaultView
    const document = createTestDom()
    renderKit.document = document

    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])

    performChange(source, target, parent)

    const clickEvent = new window.MouseEvent('click')
    source[0].dispatchEvent(clickEvent)

    expect(renderKit.publish.mock.calls[0]).toEqual([
      'go-somewhere',
      clickEvent,
    ])
  })

  test('updates an event when a new bus event value is provided', () => {
    const sourceTemplate = <a onClick="go-somewhere">Go</a>
    const targetTemplate = <a onClick="go-somewhere-else">Go</a>

    const renderKit = createRenderKit()
    const document = createTestDom()
    const window = document.defaultView
    renderKit.document = document

    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])

    performChange(source, target, parent)

    const clickEvent = new window.MouseEvent('click')
    source[0].dispatchEvent(clickEvent)

    expect(renderKit.publish).toHaveBeenCalledTimes(1)
    expect(renderKit.publish.mock.calls[0]).toEqual([
      'go-somewhere-else',
      clickEvent,
    ])
  })

  test('removes an event handler when the target removes the event', () => {
    const sourceTemplate = <a onClick="go-somewhere">Go</a>
    const targetTemplate = <a>Go</a>

    const renderKit = createRenderKit()
    const document = createTestDom()
    const window = document.defaultView

    renderKit.document = document

    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])

    performChange(source, target, parent)

    const clickEvent = new window.MouseEvent('click')
    source[0].dispatchEvent(clickEvent)

    expect(renderKit.publish).not.toHaveBeenCalled()
  })

  test('changes dom in parent and child', () => {
    const sourceTemplate = <p class="invisible">I am invisible</p>
    const targetTemplate = <p class="visible">I am visible</p>

    const renderKit = createRenderKit()

    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])

    performChange(source, target, parent)

    expect(domToString(parent)).toContain('<p class="visible">I am visible</p>')
  })

  test('updates the dom in deeply nested recursiion', () => {
    const sourceTemplate = (
      <div class="page">
        <a onClick="open">Open</a>
        <div class="modal closed">
          <p>I am invisible</p>
        </div>
      </div>
    )
    const targetTemplate = (
      <div class="page">
        <a onClick="close">Close</a>
        <div class="modal open">
          <p>I am open!</p>
        </div>
      </div>
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])

    performChange(source, target, parent)

    expect(domToString(parent)).toContain(
      '<div class="page"><a>Close</a><div class="modal open"><p>I am open!</p></div></div>',
    )
  })

  test('adds a element in the right place', () => {
    const sourceTemplate = (
      <ol>
        <li>one</li>
        <li>... more</li>
      </ol>
    )
    const targetTemplate = (
      <ol>
        <li>one</li>
        <li>two</li>
        <li>... more</li>
      </ol>
    )

    const renderKit = createRenderKit()
    const parent = renderKit.document.getElementById('app')
    const source = sourceTemplate.render(renderKit)
    const target = targetTemplate.render(renderKit)
    parent.appendChild(source[0])

    performChange(source, target, parent)

    expect(domToString(source[0])).toContain(
      '<li>one</li><li>two</li><li>... more</li>',
    )
  })
})
