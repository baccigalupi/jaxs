import { describe, expect, test, mock } from 'bun:test'
const spy = () => mock(() => {})

import {
  createTestDom,
  domToString
} from '../../support/testDom'

import jsx from '../../../src/jsx'
import { bind } from '../../../src/rendering/templates/bound'
import { render } from '../../../src/rendering/templates/root'
import { createBus } from '../../../src/messageBus'

describe('root templates', () => {
  test('renders a bound template into the document, in the right place', () => {
    const Template = ({ greeting, userName }) => <h1>{greeting} {userName}!
    </h1>
    const viewModel = (state) => ({ userName: state.currentUser.name })
    const BoundTemplate = bind(Template, viewModel)

    const document = createTestDom()
    const state = { currentUser: { name: 'Fred', age: 83 } }
    const publish = () => {}
    const subscribe = spy()
    const renderKit = { document, state, publish, subscribe }

    render(<BoundTemplate greeting='Hello' />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hello Fred!</h1>'
    )
  })

  test(
    'updates the dom for the root when a state change event is published',
    () => {
      const Template = ({ greeting, userName }) => (
        <h1>{greeting} {userName}!</h1>
      )
      const viewModel = (state) => ({ userName: state.currentUser.name })
      const BoundTemplate = bind(Template, viewModel)

      const document = createTestDom()
      const state = { currentUser: { name: 'Fred', age: 83 } }
      const { publish, subscribe } = createBus()
      const renderKit = { document, state, publish, subscribe }

      render(<BoundTemplate greeting='Hello' />, '#app', renderKit)

      const newState = { currentUser: { name: 'Janet', age: 53 } }
      publish('stateChange', newState)

      expect(document.getElementById('app').innerHTML).toEqual(
        '<h1>Hello Janet!</h1>'
      )
    }
  )

  test('clears the view on re-rerender when there is a no-op', () => {
    const Template = ({ visible }) => {
      if (!visible) return
      return <h1>Hi! I'm visible.</h1>
    }
    const viewModel = (state) => state
    const BoundTemplate = bind(Template, viewModel)

    const document = createTestDom()
    const state = { visible: true }
    const { publish, subscribe } = createBus()
    const renderKit = { document, state, publish, subscribe }

    render(<BoundTemplate />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hi! I\'m visible.</h1>'
    )

    const newState = { visible: false }
    publish('stateChange', newState)

    expect(document.getElementById('app').innerHTML).toEqual(
      ''
    )
  })

  test('re-renders appropirately when the previous render is a no-op', () => {
    const Template = ({ visible }) => {
      if (!visible) return
      return <h1>Hi! I'm visible.</h1>
    }
    const viewModel = (state) => state
    const BoundTemplate = bind(Template, viewModel)

    const document = createTestDom()
    const state = { visible: false }
    const { publish, subscribe } = createBus()
    const renderKit = { document, state, publish, subscribe }

    render(<BoundTemplate />, '#app', renderKit)

    expect(document.getElementById('app').innerHTML).toEqual(
      ''
    )

    const newState = { visible: true }
    publish('stateChange', newState)

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hi! I\'m visible.</h1>'
    )
  })

  test('handles symmetrical changes that change all the children', () => {
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
    const Content = bind(ContentTemplate, viewModel)

    let state = { membersOnly: false }

    const document = createTestDom()
    const { publish, subscribe } = createBus()
    const renderKit = { document, state, publish, subscribe }

    const root = render(<Content />, '#app', renderKit)
    const parent = document.getElementById('app')
    expect(domToString(parent)).toContain(
      '<p class="guest-content">Oh nothing to see! Move along ...</p>'
    )
    expect(root.dom.length).toEqual(1)
    expect(root.dom[0].nodeName).toEqual('P')

    state = { membersOnly: true }
    publish('stateChange', state)

    expect(domToString(parent)).toContain(
      '<h1 class="member-content">Hello member!</h1><p>Having a good day?</p>'
    )
    expect(root.dom.length).toEqual(2)
    expect(root.dom[0].nodeName).toEqual('H1')
    expect(root.dom[1].nodeName).toEqual('P')

    state = { membersOnly: false }
    publish('stateChange', state)

    expect(domToString(parent)).toContain(
      '<p class="guest-content">Oh nothing to see! Move along ...</p>'
    )
    expect(root.dom.length).toEqual(1)
    expect(root.dom[0].nodeName).toEqual('P')
  })
})
