import { describe, expect, test } from 'bun:test'
import { createTestDom, domToString } from '../support/testDom'

import { If, IfElse, Unless } from '../../src/views/conditionals.jsx'
import jsx from '../../src/jsx'

describe('conditional rendering views', () => {
  describe('If', () => {
    test('does not render anything if the condition is false', () => {
      expect(
        <If condition={false}>
          <p>Hello</p>
        </If>
      ).toEqual(undefined)
    })

    test('renders children if the condition is true', () => {
      const template = (
        <If condition>
          <p>Hello</p>
        </If>
      )
      expect(template).not.toEqual(undefined)

      const document = createTestDom()
      const node = template.render({ document })
      expect(domToString(node)).toContain('<p>Hello</p>')
    })
  })

  describe('Unless', () => {
    test('does not render anything if the condition is true', () => {
      expect(
        <Unless condition>
          <p>Hello</p>
        </Unless>
      ).toEqual(undefined)
    })

    test('renders children if the condition is false', () => {
      const template = (
        <Unless condition={false}>
          <p>Hello</p>
        </Unless>
      )
      expect(template).not.toEqual(undefined)

      const document = createTestDom()
      const node = template.render({ document })
      expect(domToString(node)).toContain('<p>Hello</p>')
    })
  })

  describe('IfElse', () => {
    test('renders the first child if true, but not the remainder', () => {
      const template = (
        <IfElse condition>
          <p>Hello truth</p>
          <p>This is conditionally false</p>
          <p>Along with the rest of test</p>
        </IfElse>
      )
      const document = createTestDom()
      const dom = template.render({ document })

      const printedDom = domToString(dom)
      expect(printedDom).toContain('Hello truth')
      expect(printedDom).not.toContain('This is conditionally false')
      expect(printedDom).not.toContain('Along with the rest of test')
    })

    test('omits the first child and render the rest if the condition is false', () => {
      const template = (
        <IfElse condition={false}>
          <p>Hello truth</p>
          <p>This is conditionally false</p>
          <p>Along with the rest of test</p>
        </IfElse>
      )
      const document = createTestDom()
      const dom = template.render({ document })

      const printedDom = domToString(dom)
      expect(printedDom).not.toContain('Hello truth')
      expect(printedDom).toContain('This is conditionally false')
      expect(printedDom).toContain('Along with the rest of test')
    })
  })
})
