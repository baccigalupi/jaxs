import { expect, describe, it } from 'vitest'
import { createTestDom } from '@support/test-dom'
import { createSvgNode, isSvgTag } from '@lib/rendering/dom/svg'

describe('svg dom management', () => {
  it('createSvgNode ignores __self and xmlns attributes', () => {
    const document = createTestDom()
    const attributes = {
      fill: '#000',
      __self: 'foo',
      xmlns: 'xmlns',
    }

    const element = createSvgNode('path', attributes, document)

    expect(element.getAttribute('fill')).toEqual('#000')
    expect(element.getAttribute('__self')).toEqual(null)
    expect(element.getAttribute('xmlns')).toEqual(null)
  })

  it('isSvgTag is true if the tag name is in a list of svg element', () => {
    expect(isSvgTag('svg')).toEqual(true)
    expect(isSvgTag('path')).toEqual(true)
    expect(isSvgTag('p')).toEqual(false)
  })

  it('isSvgTag is true if the tag name is `a` (shared by html and svg) and it has the right namespace', () => {
    expect(isSvgTag('a', 'http://www.w3.org/2000/svg')).toEqual(true)
    expect(isSvgTag('a', 'something-else')).toEqual(false)
  })
})
