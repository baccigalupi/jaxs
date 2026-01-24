/** @jsx jsx */
/** @jsxFrag jsx.fragment */
import { jsx, State } from '@lib/jaxs'

import { describe, expect, it } from 'vitest'
import { addAppContainerToDocument, domToString } from '@support/test-dom'
import { createRenderKitWithBus } from '@support/render-kit'

import { bind } from '@lib/rendering/templates/bound'
import { render } from '@lib/rendering/templates/root'

describe('root templates', () => {
  it('renders a bound template into the document, in the right place', () => {
    const renderKit = createRenderKitWithBus()
    const { state, document } = renderKit
    addAppContainerToDocument(document)

    state.create('currentUser', { name: 'Fred', age: 83 })

    type TemplateProps = {
      greeting: string
      userName: string
    }
    const Template = ({ greeting, userName }: TemplateProps) => (
      <h1>
        {greeting} {userName}!
      </h1>
    )
    type StateMap = { currentUser: { name: string; age: number } }
    const viewModel = ({ currentUser }: StateMap) => ({
      userName: currentUser.name,
    })
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
    const renderKit = createRenderKitWithBus()
    const { state, document } = renderKit
    addAppContainerToDocument(document)

    state.create('currentUser', { name: 'Fred', age: 83 })

    type TemplateProps = {
      greeting: string
      userName: string
    }
    const Template = ({ greeting, userName }: TemplateProps) => (
      <h1>
        {greeting} {userName}!
      </h1>
    )
    type StateMap = { currentUser: { name: string; age: number } }
    const viewModel = (state: StateMap) => ({
      userName: state.currentUser.name,
    })
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
    const renderKit = createRenderKitWithBus()
    const { state, document } = renderKit
    addAppContainerToDocument(document)

    state.create('visible', true)

    type TemplateProps = { visible: boolean }
    const Template = ({ visible }: TemplateProps) => {
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
    const renderKit = createRenderKitWithBus()
    const { state, document } = renderKit
    addAppContainerToDocument(document)

    state.create('visible', false)

    type TemplateProps = { visible: boolean }
    const Template = ({ visible }: TemplateProps) => {
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
    const renderKit = createRenderKitWithBus()
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
    type ContentTemplateProps = { membersOnly: boolean }
    const ContentTemplate = ({ membersOnly }: ContentTemplateProps) => {
      if (membersOnly) return <MembersArea />
      return <GuestArea />
    }
    const Content = bind({
      Template: ContentTemplate,
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
