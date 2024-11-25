import { describe, it, expect } from 'vitest'
import { RenderedRoute } from '../../lib/types'
import { exactPathMatch, catchAll, buildRouter } from '../../lib/app/routing'

describe('Routing', () => {
  it('exactPathMatch takes a full RouteState object and returns true if the path is an exact match', () => {
    const extraRouteDetails = { host: 'http:localhost:4000', query: {} }

    const matcher = exactPathMatch('/foo')

    expect(matcher({ path: '/foo', ...extraRouteDetails })).toEqual(true)
    expect(matcher({ path: '/bar', ...extraRouteDetails })).toEqual(false)
  })

  it('findPage will use the catchAll route if no matches are found', () => {
    const route = { host: 'http:localhost:4000', query: {}, path: '/' }

    const Partial = () => <h1>Hello World</h1>
    const pages: RenderedRoute[] = [{ Partial, match: catchAll }]

    const foundPage = buildRouter(pages)({ route })

    expect(foundPage).toEqual(Partial)
  })

  it('findPage will use the catchAll route if no matches are found', () => {
    const route = { host: 'http:localhost:4000', query: {}, path: '/bar' }
    const NotFound = () => <h1>Not found</h1>
    const Foo = () => <p>Foo</p>
    const Bar = () => <p>Bar</p>
    const pages: RenderedRoute[] = [
      { Partial: Foo, match: exactPathMatch('/foo') },
      { Partial: Bar, match: exactPathMatch('/bar') },
      { Partial: NotFound, match: catchAll },
    ]

    const foundPage = buildRouter(pages)({ route })

    expect(foundPage).toEqual(Bar)
  })
})
