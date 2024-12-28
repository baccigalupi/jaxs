/** @jsx jsx */
/** @jsxFrag jsx.fragment */

import { createApp, jsx } from '../../../lib/jaxs'

import { describe, expect, it, vi } from 'vitest'
import { createTestDom, domToString } from '../../support/test-dom'
import { createRenderKitWithBus } from '../../support/render-kit'

import { bind } from '../../../lib/rendering/templates/bound'
import { RouteState, Template } from '../../../lib/types'

describe('Bound templates', () => {
  it('renders correctly the first time', () => {
    const renderKit = createRenderKitWithBus()
    const { state } = renderKit
    state.create('currentUser', {
      name: 'Janet',
      email: 'dammit-janet@example.com',
      loggedIn: true,
    })

    state.create('route', {
      host: 'example.com',
      path: '/behind-the-wall',
    })

    type GreetingProps = {
      greeting: string
      name: string
    }
    const Greetings: Template<GreetingProps> = ({ greeting, name }) => (
      <h1>
        {greeting} {name}
      </h1>
    )

    const subscriptions = ['currentUser']
    const viewModel = ({ currentUser }) => ({ name: currentUser.name })
    const BoundTemplate = bind({
      subscriptions,
      Template: Greetings,
      viewModel,
    })

    const template = <BoundTemplate greeting="Hello" />
    const [node] = template.render(renderKit)

    expect(domToString(node)).toEqual('<h1>Hello Janet</h1>')
  })

  it('does not re-render if another store was changed', () => {
    const renderKit = createRenderKitWithBus()
    const { state } = renderKit

    state.create('currentUser', {
      name: 'Janet',
      email: 'dammit-janet@example.com',
      loggedIn: true,
    })
    state.create('route', {
      host: 'example.com',
      path: '/behind-the-wall',
    })

    const Renderable = ({ greeting, name }) => (
      <h1>
        {greeting} {name}
      </h1>
    )

    type CurrentUser = {
      name: string
      email: string
      loggedIn: boolean
    }
    const viewModel = (stateValues: { currentUser: CurrentUser }) => {
      return { name: stateValues.currentUser.name }
    }
    const BoundTemplate = bind({
      subscriptions: ['currentUser'],
      Template: Renderable,
      viewModel,
    })
    const template = <BoundTemplate greeting="Hello" />
    template.render(renderKit)

    vi.spyOn(template, 'rerender')

    const currentRoute: RouteState = state.get('route')
    state
      .store('route')
      .update({ ...currentRoute, path: '/important-content-here' })

    expect(template.rerender).not.toHaveBeenCalled()
  })

  it('re-renders on subscribed store change', () => {
    const renderKit = createRenderKitWithBus()
    const { state } = renderKit

    state.create('currentUser', {
      name: 'Janet',
      email: 'dammit-janet@example.com',
      loggedIn: true,
    })
    state.create('route', {
      host: 'example.com',
      path: '/behind-the-wall',
    })

    const Renderable = ({ greeting, name, headingClass }) => (
      <h1 class={headingClass}>
        {greeting} {name}
      </h1>
    )

    type CurrentUser = {
      name: string
      email: string
      loggedIn: boolean
    }
    const viewModel = (stateValues: { currentUser: CurrentUser }) => {
      return {
        name: stateValues.currentUser.name,
        headingClass: stateValues.currentUser.loggedIn ? 'active' : 'inactive',
      }
    }
    const BoundTemplate = bind({
      subscriptions: ['currentUser'],
      Template: Renderable,
      viewModel,
    })
    const template = <BoundTemplate greeting="Hello" />
    template.render(renderKit)

    state.store('currentUser').update({
      name: 'Guest',
      loggedIn: false,
      email: '',
    })

    expect(domToString(template.dom)).toContain(
      '<h1 class="inactive">Hello Guest</h1>',
    )
  })

  it('allows not rendering when returning something undefined', () => {
    const renderKit = createRenderKitWithBus()
    const { state } = renderKit

    state.create('visible', false)

    const Renderable = ({ visible }) => {
      if (!visible) return
      return <h1>Hi, I'm visible!</h1>
    }

    const BoundTemplate = bind({
      Template: Renderable,
      subscriptions: ['visible'],
    })
    const template = <BoundTemplate />

    const dom = template.render(renderKit)

    expect(dom.length).toEqual(0)
  })

  it('re-renders correctly when going back and forth betten different numbers of children', () => {
    const document = createTestDom()
    const app = createApp({ document })
    const state = app.state
    const store = state.create<string[]>('texts', ['one'])

    const Template = ({ texts }: { texts: string[] }) => {
      return (
        <>
          {texts.map((text) => (
            <p>{text}</p>
          ))}
        </>
      )
    }
    const BoundTemplate = bind({
      subscriptions: ['texts'],
      Template,
    })

    app.render(<BoundTemplate />, '#app')
    const appDom = document.querySelector('#app')
    expect(domToString(appDom)).toEqual('<div id="app"><p>one</p></div>')

    store.update(['one', 'two'])
    expect(domToString(appDom)).toEqual(
      '<div id="app"><p>one</p><p>two</p></div>',
    )

    store.update([])
    expect(domToString(appDom)).toEqual('<div id="app"></div>')

    store.update(['one', 'two'])
    expect(domToString(appDom)).toEqual(
      '<div id="app"><p>one</p><p>two</p></div>',
    )
  })

  it('re-renders correctly when there is div/parent confusions', () => {
    const document = createTestDom()
    const app = createApp({ document })
    const state = app.state
    const store = state.create<string[]>('alerts', [])

    const AlertsTemplate = ({ alerts }: { alerts: string[] }) => {
      return (
        <div class="alerts">
          {alerts.map((alert) => (
            <p>{alert}</p>
          ))}
        </div>
      )
    }
    const Alerts = bind({ Template: AlertsTemplate, subscriptions: ['alerts'] })

    const Page = () => {
      return (
        <div class="page">
          <Alerts />
          <p>Page content</p>
        </div>
      )
    }

    app.render(<Page />, '#app')
    const dom = document.querySelector('.page')
    expect(domToString(dom)).toEqual(
      '<div class="page"><div class="alerts"></div><p>Page content</p></div>',
    )

    store.update(['Something went wrong'])
    expect(domToString(dom)).toEqual(
      '<div class="page"><div class="alerts"><p>Something went wrong</p></div><p>Page content</p></div>',
    )

    store.update([])
    expect(domToString(dom)).toEqual(
      '<div class="page"><div class="alerts"></div><p>Page content</p></div>',
    )
  })
})
