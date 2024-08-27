/** @jsx jsx */
/** @jsxFrag jsx.fragment */
import { jsx } from '../../../lib/jaxs'

import { describe, expect, it } from 'vitest'
import {
  addAppContainerToDocument,
  createTestDom,
  domToString,
} from '../../support/test-dom'
import { createRenderKit } from '../../support/render-kit'

import { bind } from '../../../lib/rendering/templates/bound'
import { render } from '../../../lib/rendering/templates/root'
import { createState } from '../../../lib/jaxs-state'
import { createBus } from 'jaxs-bus'

describe('root templates', () => {
  it('renders a bound template into the document, in the right place', () => {
    const messageBus = createBus()
    const renderKit = createRenderKit(messageBus)
    const { state, document } = renderKit
    addAppContainerToDocument(document)

    state.create('currentUser', { name: 'Fred', age: 83 })

    const Template = ({ greeting, userName }) => (
      <h1>
        {greeting} {userName}!
      </h1>
    )
    const viewModel = ({ currentUser }) => ({ userName: currentUser.name })
    const BoundTemplate = bind({
      Template,
      viewModel,
      subscriptions: ['currentUser'],
    })

    render(<BoundTemplate greeting="Hello" />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hello Fred!</h1>',
    )
  })

  it("updates the dom when a bound template's data changes", () => {
    const messageBus = createBus()
    const renderKit = createRenderKit(messageBus)
    const { state, document } = renderKit
    addAppContainerToDocument(document)

    state.create('currentUser', { name: 'Fred', age: 83 })

    const Template = ({ greeting, userName }) => (
      <h1>
        {greeting} {userName}!
      </h1>
    )
    const viewModel = (state) => ({ userName: state.currentUser.name })
    const BoundTemplate = bind({
      Template,
      viewModel,
      subscriptions: ['currentUser'],
    })

    render(<BoundTemplate greeting="Hello" />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hello Fred!</h1>',
    )

    state.store('currentUser').update({
      name: 'Janet',
      age: 53,
    })

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hello Janet!</h1>',
    )
  })

  it('clears the view on re-rerender when there is a no-op', () => {
    const messageBus = createBus()
    const renderKit = createRenderKit(messageBus)
    const { state, document } = renderKit
    addAppContainerToDocument(document)

    state.create('visible', true)

    const Template = ({ visible }) => {
      if (!visible) return
      return <h1>Hi! I'm visible.</h1>
    }
    const BoundTemplate = bind({
      Template,
      subscriptions: ['visible'],
    })

    render(<BoundTemplate />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual(
      "<h1>Hi! I'm visible.</h1>",
    )

    state.store('visible').update(false)

    expect(document.getElementById('app').innerHTML).toEqual('')
  })

  it('re-renders appropirately when the previous render is a no-op', () => {
    const messageBus = createBus()
    const renderKit = createRenderKit(messageBus)
    const { state, document } = renderKit
    addAppContainerToDocument(document)

    state.create('visible', false)

    const Template = ({ visible }) => {
      if (!visible) return
      return <h1>Hi! I'm visible.</h1>
    }
    const BoundTemplate = bind({
      Template,
      subscriptions: ['visible'],
    })

    render(<BoundTemplate />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual('')

    state.store('visible').update(true)

    expect(document.getElementById('app').innerHTML).toEqual(
      "<h1>Hi! I'm visible.</h1>",
    )
  })

  it('handles symmetrical changes that change all the children', () => {
    const messageBus = createBus()
    const renderKit = createRenderKit(messageBus)
    const { state, document } = renderKit
    addAppContainerToDocument(document)

    state.create('membersOnly', false)

    const MembersArea = () => (
      <>
        <h1 class="member-content">Hello member!</h1>
        <p>Having a good day?</p>
      </>
    )
    const GuestArea = () => (
      <p class="guest-content">Oh nothing to see! Move along ...</p>
    )
    const ContentTemplate = ({ membersOnly }) => {
      if (membersOnly) return <MembersArea />
      return <GuestArea />
    }
    const viewModel = (state) => state
    const Content = bind({
      Template: ContentTemplate,
      viewModel,
      subscriptions: ['membersOnly'],
    })

    const root = render(<Content />, '#app', renderKit)
    const parent = document.getElementById('app')

    expect(domToString(parent)).toContain(
      '<p class="guest-content">Oh nothing to see! Move along ...</p>',
    )
    expect(root.dom.length).toEqual(1)

    state.store('membersOnly').update(true)

    expect(domToString(parent)).toContain(
      '<h1 class="member-content">Hello member!</h1><p>Having a good day?</p>',
    )

    state.store('membersOnly').update(false)

    expect(domToString(parent)).toContain(
      '<p class="guest-content">Oh nothing to see! Move along ...</p>',
    )
    expect(root.dom.length).toEqual(1)
  })
})
