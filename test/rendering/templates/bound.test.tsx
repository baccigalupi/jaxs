/** @jsx jsx */
/** @jsxFrag jsx.fragment */

import { jsx } from '../../../lib/jaxs'

import { describe, expect, it, vi } from 'vitest'
import { domToString } from '../../support/test-dom'
import { createRenderKitWithBus } from '../../support/render-kit'

import { bind } from '../../../lib/rendering/templates/bound'
import { Template, ViewModel } from '../../../lib/types'
import { State } from '../../../lib/state'

describe('Bound templates', () => {
  const setupState = (state: State) => {}

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

    const currentRoute = state.get('route')
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
})
