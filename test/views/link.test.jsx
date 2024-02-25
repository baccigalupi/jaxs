import { describe, expect, test, mock } from 'bun:test'

import { createTestDom, domToString } from '../support/testDom'

import { Link } from '../../src/views/link.jsx'
import jsx from '../../src/jsx'
const spy = () => mock(() => {})

describe('Link', () => {
  test('renders an archor tag passing along all the attributes', () => {
    const document = createTestDom()
    const publish = spy()

    const template = (
      <Link href='/foo' class='foo-class'>
        <p>Go to foo now!</p>
      </Link>
    )
    const dom = template.render({ document, publish })

    expect(domToString(dom)).toContain(
      '<a href="/foo" class="foo-class"><p>Go to foo now!</p></a>'
    )
  })

  test('adds onClick handling to navigate to the href', () => {
    const document = createTestDom()
    const window = document.defaultView
    const publish = spy()

    const template = (
      <Link href='/foo' class='foo-class'>
        <p>Go to foo now!</p>
      </Link>
    )
    const [link] = template.render({ document, publish })

    const clickEvent = new window.MouseEvent('click')
    link.dispatchEvent(clickEvent)

    expect(publish.mock.calls[0][0]).toEqual('goToHref')
    expect(publish.mock.calls[0][1]).toEqual(clickEvent)
  })
})
