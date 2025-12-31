/** @jsx jsx */
/** @jsxFrag jsx.fragment */
import { jsx } from '@lib/rendering/jsx'
import { describe, it, expect } from 'vitest'

import { routedView } from '@lib/app/routed-view'
import type { RenderedRoute } from '@lib/types'
import { exactPathMatch, catchAll } from '@lib/app/routing'
import { createApp } from '@lib/app/builder'
import { createTestDom, domToString } from '@support/test-dom'

describe('routedView', () => {
  it('returns a bound template that renders the right initial view', () => {
    const document = createTestDom()
    const app = createApp({ document })
    const store = app.state.store('route')
    store.update({ host: 'http:localhost:4000', query: {}, path: '/bar' })

    const NotFound = () => <h1>Not found</h1>
    const Foo = () => <p>Foo</p>
    const Bar = () => <p>Bar</p>

    const pages: RenderedRoute[] = [
      { Partial: Foo, match: exactPathMatch('/foo') },
      { Partial: Bar, match: exactPathMatch('/bar') },
      { Partial: NotFound, match: catchAll },
    ]

    const Page = routedView(pages)
    app.render(<Page />, '#app')

    expect(domToString(document)).toContain('<p>Bar</p>')
    expect(domToString(document)).not.toContain('<p>Foo</p>')
    expect(domToString(document)).not.toContain('<p>Not found</p>')
  })

  it('returns a bound template that re-renders the correct view when routes change', () => {
    const document = createTestDom()
    const app = createApp({ document })
    const store = app.state.store('route')
    store.update({ host: 'http:localhost:4000', query: {}, path: '/bar' })

    const NotFound = () => <h1>Not found</h1>
    const Foo = () => <p>Foo</p>
    const Bar = () => <p>Bar</p>

    const pages: RenderedRoute[] = [
      { Partial: Foo, match: exactPathMatch('/foo') },
      { Partial: Bar, match: exactPathMatch('/bar') },
      { Partial: NotFound, match: catchAll },
    ]

    const Page = routedView(pages)
    app.render(<Page />, '#app')
    store.update({ host: 'http:localhost:4000', query: {}, path: '/foo' })

    expect(domToString(document)).toContain('<p>Foo</p>')
    expect(domToString(document)).not.toContain('<p>Bar</p>')
    expect(domToString(document)).not.toContain('<p>Not found</p>')
  })

  it('renders nothing when no routes match', () => {
    const document = createTestDom()
    const app = createApp({ document })
    const store = app.state.store('route')
    store.update({ host: 'http:localhost:4000', query: {}, path: '/zardoz' })

    const NotFound = () => <h1>Not found</h1>
    const Foo = () => <p>Foo</p>
    const Bar = () => <p>Bar</p>

    const pages: RenderedRoute[] = [
      { Partial: Foo, match: exactPathMatch('/foo') },
      { Partial: Bar, match: exactPathMatch('/bar') },
    ]

    const Page = routedView(pages)
    app.render(<Page />, '#app')

    expect(domToString(document)).not.toContain('<p>Foo</p>')
    expect(domToString(document)).not.toContain('<p>Bar</p>')
  })
})
