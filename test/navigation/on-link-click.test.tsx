/** @jsx jsx */
/** @jsxFrag jsx.fragment */
import { jsx } from '../../lib/jaxs'

import { describe, it, expect, vi, Mock } from 'vitest'
import { createApp } from '../../lib/app/builder'
import { createTestDom } from '../support/test-dom'

describe('onLinkClick', () => {
  /*
    NOTE: This is proving hard to test with spyOn because the publish attached
    to the app is not the same one injected into the event listener. Fix this
    if possible to make testing a bit easier.
  */
  it('navigates to the right href when clicking directly on the element', () => {
    const document = createTestDom()
    const app = createApp({ document })

    const Template = () => {
      return (
        <a id="find-me" href="/foo" onClick="go-to-href">
          <ul>
            <li id="click-me">Click me</li>
          </ul>
        </a>
      )
    }
    app.render(<Template />, '#app')

    const element = document.getElementById('find-me') as HTMLElement

    const subscriptionEvents = []
    app.subscribe('navigation:route-change', ({ payload }) => {
      subscriptionEvents.push(payload)
    })

    const event = new document.defaultView.MouseEvent('click')
    element.dispatchEvent(event)

    expect(subscriptionEvents.length).toEqual(1)
    expect(subscriptionEvents[0].path).toEqual('/foo')
  })
})
