import { describe, it, expect, vi, Mocked } from 'vitest'
import { createApp } from '../../lib/app/builder'
import { onLocationChange } from '../../lib/navigation/on-location-change'
import { BusOptions } from '../../lib/types'

describe('onLocationChange', () => {
  it('gathers the route information from location and updates the store', () => {
    const window = {
      location: {
        host: 'http://localhost:3456',
        pathname: '/hello',
        search: '?its=magic&u=know',
      },
      addEventListener: vi.fn(),
      document: {} as unknown as Mocked<Document>,
    } as unknown as Mocked<Window>

    const app = createApp({ window })

    onLocationChange(null, {
      state: app.state,
      publish: app.publish,
      window,
    } as unknown as BusOptions)

    expect(app.state.get('route')).toEqual({
      host: 'http://localhost:3456',
      path: '/hello',
      query: { its: 'magic', u: 'know' },
    })
  })

  it('triggers a route change event (and state change)', () => {
    const window = {
      location: {
        host: 'http://localhost:3456',
        pathname: '/hello',
        search: '?its=magic&u=know',
      },
      addEventListener: vi.fn(),
      document: {} as unknown as Mocked<Document>,
    } as unknown as Mocked<Window>

    const app = createApp({ window })
    const navigationSubscriptionSpy = vi.fn()
    app.subscribe('navigation:route-change', navigationSubscriptionSpy)
    const routeStateSpy = vi.fn()
    app.subscribe('state:route', routeStateSpy)

    onLocationChange(null, {
      state: app.state,
      publish: app.publish,
      window,
    } as unknown as BusOptions)

    expect(navigationSubscriptionSpy).toHaveBeenCalledOnce()
    expect(navigationSubscriptionSpy.mock.calls[0][0]).toEqual({
      host: 'http://localhost:3456',
      path: '/hello',
      query: { its: 'magic', u: 'know' },
    })

    expect(routeStateSpy).toHaveBeenCalledOnce()
    expect(Object.keys(routeStateSpy.mock.calls[0][0])).toEqual([
      'state',
      'store',
    ])
    expect(routeStateSpy.mock.calls[0][0].store.name).toEqual('route')
  })
})
