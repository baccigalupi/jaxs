import { describe, expect, test } from 'bun:test'

import {
  createTestDom,
  domToString
} from '../../support/testDom'

import jsx from '../../../src/jsx'
import { bind } from '../../../src/rendering/templates/bound'
import { render } from '../../../src/rendering/templates/root'
import { createBus } from '../../../src/messageBus'
import { State } from '../../../src/state'

describe('root templates', () => {
  test('renders a bound template into the document, in the right place', () => {
    const document = createTestDom()
    const busApi = createBus()
    const state = new State(busApi.publish)
    const renderKit = { document, state, ...busApi }
    state.create('currentUser', { name: 'Fred', age: 83 })

    const Template = ({ greeting, userName }) => <h1>{greeting} {userName}!</h1>
    const viewModel = ({ currentUser }) => ({ userName: currentUser.name })
    const BoundTemplate = bind({ Template, viewModel, subscriptions: ['currentUser'] })

    render(<BoundTemplate greeting='Hello' />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hello Fred!</h1>'
    )
  })

  test('updates the dom when a bound template\'s data changes', () => {
    const document = createTestDom()
    const busApi = createBus()
    const state = new State(busApi.publish)
    const renderKit = { document, state, ...busApi }
    state.create('currentUser', { name: 'Fred', age: 83 })

    const Template = ({ greeting, userName }) => (
      <h1>{greeting} {userName}!</h1>
    )
    const viewModel = (state) => ({ userName: state.currentUser.name })
    const BoundTemplate = bind({ Template, viewModel, subscriptions: ['currentUser'] })

    render(<BoundTemplate greeting='Hello' />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hello Fred!</h1>'
    )

    state.currentUser.update({
      name: 'Janet',
      age: 53
    })

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hello Janet!</h1>'
    )
  })

  test('clears the view on re-rerender when there is a no-op', () => {
    const document = createTestDom()
    const busApi = createBus()
    const state = new State(busApi.publish)
    const renderKit = { document, state, ...busApi }

    state.create('visible', true)

    const Template = ({ visible }) => {
      if (!visible) return
      return <h1>Hi! I'm visible.</h1>
    }
    const viewModel = (state) => state
    const BoundTemplate = bind({ Template, viewModel, subscriptions: ['visible'] })

    render(<BoundTemplate />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hi! I\'m visible.</h1>'
    )

    state.visible.toggle()

    expect(document.getElementById('app').innerHTML).toEqual(
      ''
    )
  })

  test.only('re-renders appropirately when the previous render is a no-op', () => {
    const document = createTestDom()
    const busApi = createBus()
    const state = new State(busApi.publish)
    const renderKit = { document, state, ...busApi }

    state.create('visible', false)

    const Template = ({ visible }) => {
      if (!visible) return
      return <h1>Hi! I'm visible.</h1>
    }
    const viewModel = (state) => state
    const BoundTemplate = bind({ Template, viewModel, subscriptions: ['visible'] })

    render(<BoundTemplate />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual('')

    state.visible.toggle()

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hi! I\'m visible.</h1>'
    )
  })

  test('handles symmetrical changes that change all the children', () => {
    const document = createTestDom()
    const busApi = createBus()
    const state = new State(busApi.publish)
    const renderKit = { document, state, ...busApi }
    state.create('membersOnly', false)

    const MembersArea = () => (
      <>
        <h1 class='member-content'>Hello member!</h1>
        <p>Having a good day?</p>
      </>
    )
    const GuestArea = () => (
      <p class='guest-content'>Oh nothing to see! Move along ...</p>
    )
    const ContentTemplate = ({ membersOnly }) => {
      if (membersOnly) return <MembersArea />
      return <GuestArea />
    }
    const viewModel = (state) => state
    const Content = bind({
      Template: ContentTemplate,
      viewModel,
      subscriptions: ['membersOnly']
    })

    const root = render(<Content />, '#app', renderKit)
    const parent = document.getElementById('app')

    expect(domToString(parent)).toContain(
      '<p class="guest-content">Oh nothing to see! Move along ...</p>'
    )
    expect(root.dom.length).toEqual(1)

    state.membersOnly.toggle()

    expect(domToString(parent)).toContain(
      '<h1 class="member-content">Hello member!</h1><p>Having a good day?</p>'
    )

    state.membersOnly.toggle()

    expect(domToString(parent)).toContain(
      '<p class="guest-content">Oh nothing to see! Move along ...</p>'
    )
    expect(root.dom.length).toEqual(1)
  })
})
