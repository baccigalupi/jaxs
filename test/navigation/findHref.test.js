import { describe, expect, test } from 'bun:test'
import { createTestDom } from '../support/testDom'
import { findHref } from '../../src/navigation/findHref'

describe('navigation findHref', () => {
  test('finds the href when test is the direct target node', () => {
    const document = createTestDom('<a id="find-me" href="/foo"></a>')
    const node = document.getElementById('find-me')
    expect(findHref(node)).toEqual('/foo')
  })

  test('finds the href at the nearest parent when not available on target node', () => {
    const document = createTestDom(
      '<a id="find-me" href="/foo"><ul><li id="click-me">Click me</li></ul></a>'
    )
    const node = document.getElementById('click-me')
    expect(findHref(node)).toEqual('/foo')
  })
})
