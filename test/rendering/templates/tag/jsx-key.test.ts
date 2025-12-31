import { expect, describe, it } from 'vitest'
import { JsxKey } from '@lib/rendering/templates/tag/jsx-key'
import type { TagAttributes } from '@lib/types'

describe('JsxKey generate', () => {
  it('when the attributes include a key, it uses that', () => {
    const type = 'p'
    const attributes = { key: 'my-key', id: 'foo', name: 'bar' }

    const jsxKey = new JsxKey(type, attributes).generate()

    expect(jsxKey).toEqual('my-key')
  })

  it('when there is no key, but there is a source it uses that', () => {
    const type = 'p'
    const attributes: TagAttributes = {
      id: 'foo',
      name: 'bar',
    }
    attributes.__source = {
      fileName: 'my-file.tsx',
      lineNumber: '23',
      columnNumber: '7',
    }

    const jsxKey = new JsxKey(type, attributes).generate()

    expect(jsxKey).toEqual('my-file.tsx:23:7')
  })

  it('when there is no key or source, it uses attributes to construct one', () => {
    const type = 'input'
    const attributes = {
      id: 'user',
      name: 'username',
      type: 'text',
    }

    const jsxKey = new JsxKey(type, attributes).generate()

    expect(jsxKey).toEqual('input#user[type=text][name=username]')
  })
})
