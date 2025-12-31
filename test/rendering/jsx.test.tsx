/** @jsx jsx */
/** @jsxFrag jsx.fragment */
import { jsx, Props, Publish } from '@lib/jaxs'

import { describe, expect, it, Mock, vi } from 'vitest'

import { domToString } from '@support/test-dom'
import { createRenderKit } from '@support/render-kit'
import { PublishFromDom } from '@lib/types'

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
    const publish = renderKit.publish as Mock<PublishFromDom>
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
    const publish = renderKit.publish as Mock<PublishFromDom>
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

    const Page = ({ buttonText, children }: Props<{ buttonText: string }>) => {
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
      '<a href="/save-the-world"><button>Save!</button> Click here!</a><a href="/home">Home <img src="/my-image.jpg"></a><p>Here is some stuff</p>',
    )
  })

  it('renders without issue when a compent returns without rendering dom', () => {
    const Child = ({ visible }) => {
      if (!visible) return
      return <h1>Hi! I'm visible.</h1>
    }
    const Renderable = () => {
      return (
        <div id="wrapper">
          <Child visible={false} />
        </div>
      )
    }

    const template = <Renderable />

    const renderKit = createRenderKit()
    const nodes = template.render(renderKit)

    expect(domToString(nodes)).toContain('<div id="wrapper"></div>')
  })

  it('is able to handle complex conditional logic with fragments and render correctly', () => {
    const renderKit = createRenderKit()

    const RenderIf = ({
      isVisible,
      children,
    }: Props<{ isVisible: boolean }>) => {
      if (!isVisible) return
      return <>{children}</>
    }

    const Renderable = ({ inMembers }) => {
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

    let template = <Renderable inMembers />
    let nodes = template.render(renderKit)
    expect(domToString(nodes)).toContain(
      '<h1>Oh great crickets!</h1><p>Sing me a tale of private content.</p>',
    )

    template = <Renderable inMembers={false} />
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
          <g stroke="green" stroke-width="3">
            <circle r="45" cx="50" cy="50" fill="red" />
            <circle r="20" cx="30" cy="30" fill="blue" />
          </g>
        </svg>
      )
    }

    const template = <Circle />
    const [node] = template.render(renderKit)

    expect(renderKit.document.createElementNS).toHaveBeenCalledTimes(4)
    expect(domToString(node)).toContain(
      '<circle r="45" cx="50" cy="50" fill="red">',
    )
  })
})
