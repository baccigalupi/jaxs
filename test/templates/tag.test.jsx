import { describe, expect, test } from 'bun:test'
import { jsx } from '../../src/jaxs'

describe('Tag templates', () => {
  describe('key', () => {
    test('when key is provided test uses that', () => {
      const template = <a href='/foo' key='foo-link' id='something-foo'>Foo</a>
      expect(template.key()).toEqual('foo-link')
    })

    test('uses the __source when provided', () => {
      const template = <a href='/foo' id='something-foo'>Foo</a>
      template.attributes.__source = {
        fileName: '/this-test.jsx',
        lineNumber: 12,
        columnNumber: 24
      }
      expect(template.key()).toEqual('/this-test.jsx:12:24')
    })

    test('uses the id if the key and type is no provided', () => {
      const template = <a href='/foo' id='something-foo'>Foo</a>
      expect(template.key()).toEqual('a#something-foo')
    })

    test('uses the type/name when those are available', () => {
      const template = <input type='text' name='email' />
      expect(template.key()).toEqual('input[type=text][name=email]')
    })
  })

  describe('svg', () => {
    test('passes svg flag to children', () => {
      const Circle = () => {
        return (
          <svg height='100' width='100' xmlns='http://www.w3.org/2000/svg'>
            <circle r='45' cx='50' cy='50' stroke='green' stroke-width='3' fill='red' />
          </svg>
        )
      }
      const template = <Circle />

      expect(template.isSvg).toEqual(true)
      expect(template.children.isSvg).toEqual(true)
      expect(template.children.collection[0].isSvg).toEqual(true)
    })
  })
})
