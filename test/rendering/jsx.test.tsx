/** @jsx jsx */
/** @jsxFrag jsx.fragment */
import { jsx } from '../../lib/jaxs'

import { describe, expect, it, vi } from 'vitest'

import { createTestDom, domToString } from '../support/test-dom'
import { createRenderKit } from '../support/render-kit'

describe('Rendering static jsx', () => {
  it('can render a self-closing tag and no attribute', () => {
    const template = <img />
    const renderKit = createRenderKit()

    const [node] = template.render(renderKit)

    expect(domToString(node)).toEqual('<img>')
  })

  it('can render a self closing tag with an attribute', () => {
    const template = <img src="/foo.jpg" />
    const renderKit = createRenderKit()

    const [node] = template.render(renderKit)

    expect(domToString(node)).toEqual('<img src="/foo.jpg">')
  })

  it('can render a tag with a single child text element', () => {
    const template = <h1>Hello</h1>
    const renderKit = createRenderKit()

    const [node] = template.render(renderKit)

    expect(domToString(node)).toEqual('<h1>Hello</h1>')
  })

  it('can render a tag with more complex children', () => {
    const renderKit = createRenderKit()
    const greeting = 'kind'
    const template = (
      <h1>
        Hello <span class="bold">{greeting}</span> world
      </h1>
    )

    const [node] = template.render(renderKit)

    expect(domToString(node)).toEqual(
      '<h1>Hello <span class="bold">kind</span> world</h1>',
    )
  })

  it('publishes the dom even via name to the provided publish function', () => {
    const template = <button onClick="saveSomething">Save</button>

    const renderKit = createRenderKit()
    const publish = renderKit.publish
    const [node] = template.render(renderKit)

    const clickEvent = new renderKit.window.MouseEvent('click')
    node.dispatchEvent(clickEvent)

    expect(publish.mock.calls[0]).toEqual(['saveSomething', clickEvent])
  })

  it('renders custom types', () => {
    const Link = (props) => {
      const { children, ...rest } = props
      return (
        <a {...rest} onClick="goToHref">
          {children}
        </a>
      )
    }
    const template = <Link href="/foo/bar">Go get your foo!</Link>

    const renderKit = createRenderKit()
    const publish = renderKit.publish
    const [node] = template.render(renderKit)

    expect(domToString(node)).toEqual('<a href="/foo/bar">Go get your foo!</a>')

    const clickEvent = new renderKit.window.MouseEvent('click')
    node.dispatchEvent(clickEvent)

    expect(publish.mock.calls[0]).toEqual(['goToHref', clickEvent])
  })

  it('renders deeply nested stuff', () => {
    const Link = (props) => {
      const { children, ...rest } = props
      return (
        <a {...rest} onClick="goToHref">
          {children}
        </a>
      )
    }

    const Page = ({ buttonText, children }) => {
      return (
        <>
          <Link href="/save-the-world">
            <button>{buttonText}</button> Click here!
          </Link>
          <Link href="/home">
            Home <img src="/my-image.jpg" />
          </Link>
          {children}
        </>
      )
    }

    const template = (
      <Page buttonText="Save!">
        <p>Here is some stuff</p>
      </Page>
    )

    const renderKit = createRenderKit()
    const nodes = template.render(renderKit)

    expect(domToString(nodes)).toEqual(
      '<div><a href="/save-the-world"><button>Save!</button> Click here!</a><a href="/home">Home <img src="/my-image.jpg"></a><p>Here is some stuff</p></div>',
    )
  })

  it('renders without issue when a compent returns without rendering dom', () => {
    const Child = ({ visible }) => {
      if (!visible) return
      return <h1>Hi! I'm visible.</h1>
    }
    const Template = () => {
      return (
        <div id="wrapper">
          <Child visible={false} />
        </div>
      )
    }

    const template = <Template />

    const renderKit = createRenderKit()
    const nodes = template.render(renderKit)

    expect(domToString(nodes)).toContain('<div id="wrapper"></div>')
  })

  it('is able to handle complex conditional logic with fragments and render correctly', () => {
    const renderKit = createRenderKit()

    const RenderIf = ({ isVisible, children }) => {
      if (!isVisible) return
      return <>{children}</>
    }

    const Template = ({ inMembers }) => {
      return (
        <>
          <RenderIf isVisible={!inMembers}>
            <form>
              <p class="guest-content">
                You are a guest, and I guess that is fine.
              </p>
              <input type="submit" value="Agree! or something" />
            </form>
          </RenderIf>
          <RenderIf isVisible={inMembers}>
            <h1>Oh great crickets!</h1>
            <p>Sing me a tale of private content.</p>
          </RenderIf>
        </>
      )
    }

    let template = <Template inMembers />
    let nodes = template.render(renderKit)
    expect(domToString(nodes)).toContain(
      '<h1>Oh great crickets!</h1><p>Sing me a tale of private content.</p>',
    )

    template = <Template inMembers={false} />
    nodes = template.render(renderKit)
    expect(domToString(nodes)).toContain(
      '<form><p class="guest-content">You are a guest, and I guess that is fine.</p><input type="submit"',
    )
  })

  it('adds jsx attributes to the element', () => {
    const renderKit = createRenderKit()

    const Form = () => (
      <form id="my-form">
        <input type="submit" value="Agree! or something" />
      </form>
    )

    const template = <Form />
    const [node] = template.render(renderKit)
    expect(node.__jsx).toEqual('form#my-form')
  })

  it('svg creates tags and attributes via the right mechanisms', () => {
    const renderKit = createRenderKit()
    vi.spyOn(renderKit.document, 'createElementNS')

    const Circle = () => {
      return (
        <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
          <circle
            r="45"
            cx="50"
            cy="50"
            stroke="green"
            stroke-width="3"
            fill="red"
          />
        </svg>
      )
    }

    const template = <Circle />
    const [node] = template.render(renderKit)

    expect(renderKit.document.createElementNS).toHaveBeenCalledTimes(2)
    expect(domToString(node)).toContain(
      '<circle r="45" cx="50" cy="50" stroke="green" stroke-width="3" fill="red">',
    )
  })
})
