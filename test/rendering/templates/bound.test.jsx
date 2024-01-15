import { describe, expect, test, spyOn } from 'bun:test'
import {
  createTestDom,
  domToString
} from '../../support/testDom'

import jsx from '../../../src/jsx'
import { bind } from '../../../src/rendering/templates/bound'
import { createBus } from '../../../src/messageBus'
import { State } from '../../../src/state'
import { render } from '../../../src/rendering/templates/root'

describe('Bound/subscribing templates', () => {
  test('renders correctly the first time', () => {
    const document = createTestDom()
    const busApi = createBus()

    const state = new State(busApi.publish)
    state.create('currentUser', {
      name: 'Janet',
      email: 'dammit-janet@example.com',
      loggedIn: true
    })
    state.create('route', {
      host: 'example.com',
      path: '/behind-the-wall'
    })

    const renderKit = {
      ...busApi,
      document,
      state
    }

    const Template = ({ greeting, name }) => <h1>{greeting} {name}</h1>
    const viewModel = ({ currentUser }) => {
      return { name: currentUser.name }
    }
    const BoundTemplate = bind({
      subscriptions: ['currentUser'],
      Template,
      viewModel
    })
    const template = <BoundTemplate greeting='Hello' />
    const [node] = template.render(renderKit)
    expect(domToString(node)).toEqual('<h1>Hello Janet</h1>')
  })

  test('does not re-render if another store was changed', () => {
    const document = createTestDom()
    const busApi = createBus()

    const state = new State(busApi.publish)
    state.create('currentUser', {
      name: 'Janet',
      email: 'dammit-janet@example.com',
      loggedIn: true
    })
    state.create('route', {
      host: 'example.com',
      path: '/behind-the-wall'
    })

    const renderKit = {
      ...busApi,
      document,
      state
    }

    const Template = ({ greeting, name }) => <h1>{greeting} {name}</h1>
    const viewModel = (state) => {
      return { name: state.currentUser.name }
    }
    const BoundTemplate = bind({
      subscriptions: ['currentUser'],
      Template,
      viewModel
    })
    const template = <BoundTemplate greeting='Hello' />
    template.render(renderKit)

    spyOn(template, 'rerender')

    state.route.update({ ...state.route.value, path: '/important-content-here' })

    expect(template.rerender).not.toHaveBeenCalled()
  })

  test('re-renders on subscribed store change', () => {
    const document = createTestDom()
    const busApi = createBus()

    const state = new State(busApi.publish)
    state.create('currentUser', {
      name: 'Janet',
      email: 'dammit-janet@example.com',
      loggedIn: true
    })
    state.create('route', {
      host: 'example.com',
      path: '/behind-the-wall'
    })

    const renderKit = {
      ...busApi,
      document,
      state
    }

    const Template = ({ greeting, name, headingClass }) =>
      <h1 class={headingClass}>{greeting} {name}</h1>

    const viewModel = (state) => {
      return {
        name: state.currentUser.name,
        headingClass: state.currentUser.loggedIn ? 'active' : 'inactive'
      }
    }
    const BoundTemplate = bind({
      subscriptions: ['currentUser'],
      Template,
      viewModel
    })
    const template = <BoundTemplate greeting='Hello' />
    template.render(renderKit)

    state.currentUser.update({
      name: 'Guest',
      loggedIn: false,
      email: ''
    })

    expect(domToString(template.dom)).toContain('<h1 class="inactive">Hello Guest</h1>')
  })

  test('allows not rendering when returning something undefined', () => {
    const document = createTestDom()
    const busApi = createBus()

    const state = new State(busApi.publish)
    state.create('visible', false)

    const renderKit = {
      ...busApi,
      document,
      state
    }

    const viewModel = (state) => { visible: state.visible }
    const Template = ({ visible }) => {
      if (!visible) return
      return <h1>Hi, I'm visible!</h1>
    }

    const BoundTemplate = bind({ Template, viewModel, subscriptions: ['visible'] })
    const template = <BoundTemplate />

    const dom = template.render(renderKit)

    expect(dom.length).toEqual(0)
  })

  test('is able to handle complex conditional logic with fragments and render correctly', () => {
    /*
      NOTE: I had to render into the fake dom with appending in order to get the
      rerender to show up correctly. It looked to me like the dom attached to
      the template wasn't correct. This may be a real bug???
    */
    const document = createTestDom()
    const busApi = createBus()

    const state = new State(busApi.publish)
    state.create('inMembers', true)

    const renderKit = {
      ...busApi,
      document,
      state,
      parent: document.getElementById('app')
    }

    const viewModel = (state) => state

    const RenderIf = ({ isVisible, children }) => {
      if (!isVisible) return
      return <>{children}</>
    }

    const Template = ({ inMembers }) => {
      return (
        <>
          <RenderIf isVisible={!inMembers}>
            <form>
              <p class='guest-content'>
                You are a guest, and I guess that is fine.
              </p>
              <input type='submit' value='Agree! or something' />
            </form>
          </RenderIf>
          <RenderIf isVisible={inMembers}>
            <h1>Oh great crickets!</h1>
            <p>Sing me a tale of private content.</p>
          </RenderIf>
        </>
      )
    }
    const BoundTemplate = bind({ Template, viewModel, subscriptions: ['inMembers'] })

    render(<BoundTemplate />, '#app', renderKit)
    const appDom = document.getElementById('app')

    expect(domToString(appDom)).toContain(
      '<h1>Oh great crickets!</h1><p>Sing me a tale of private content.</p>'
    )

    state.inMembers.toggle()

    expect(domToString(appDom)).toContain(
      '<form><p class="guest-content">You are a guest, and I guess that is fine.</p><input type="submit"'
    )

    state.inMembers.toggle()

    expect(domToString(appDom)).toContain(
      '<h1>Oh great crickets!</h1><p>Sing me a tale of private content.</p>'
    )
  })
})
