import { describe, expect, test } from 'bun:test'
import { createTestDom, domToString } from '../../support/testDom'

import jsx from '../../../src/jsx'
import { bind } from '../../../src/rendering/templates/bound'

describe('bound template', () => {
  test('renders with state and attributes', () => {
    const viewModel = (state) => ({ ...state.partial })
    const Template = ({ greeting, name }) => <h1>{greeting} {name}!</h1>

    const state = { partial: { greeting: 'Hello' } }
    const publish = () => {}

    const BoundTemplate = bind(Template, viewModel)
    const template = <BoundTemplate name='Fred' />

    const document = createTestDom()
    const [node] = template.render({ document, state, publish })

    expect(domToString(node)).toEqual('<h1>Hello Fred!</h1>')
  })

  test('allows not rendering when returning something undefined', () => {
    const viewModel = (state) => state
    const Template = ({ visible }) => {
      if (!visible) return
      return <h1>Hi, I'm visible!</h1>
    }

    const state = { visible: false }
    const publish = () => {}

    const BoundTemplate = bind(Template, viewModel)
    const template = <BoundTemplate />

    const document = createTestDom()
    template.render({ document, state, publish })

    expect(document.getElementById('app').childNodes.length).toEqual(0)
  })

  test('is able to handle complex conditional logic with fragments and render correctly', () => {
    const document = createTestDom()
    const publish = () => {}
    const viewModel = (state) => state
    const state = { inMembers: true }
    const renderKit = { document, publish, state }

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
    const BoundTemplate = bind(Template, viewModel)

    const template = <BoundTemplate />
    let nodes = template.render(renderKit)
    expect(domToString(nodes)).toContain(
      '<h1>Oh great crickets!</h1><p>Sing me a tale of private content.</p>'
    )

    state.inMembers = false
    nodes = template.render(renderKit)
    expect(domToString(nodes)).toContain(
      '<form><p class="guest-content">You are a guest, and I guess that is fine.</p><input type="submit"'
    )
  })
})
