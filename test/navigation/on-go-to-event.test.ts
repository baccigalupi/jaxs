import { describe, it, expect, vi } from 'vitest'
import { createApp } from '../../lib/app/builder'
import { createTestDom } from '../support/test-dom'

describe('go-to events', () => {
  it('triggers navigation to the right url', () => {
    const document = createTestDom()
    const app = createApp({ document })
    const history = app.window.history
    const bus = app.bus
    vi.spyOn(bus, 'publish')
    vi.spyOn(history, 'pushState')

    app.publish('go-to', '/foo/bar')

    expect(history.pushState).toHaveBeenCalledWith(null, '', '/foo/bar')
    expect(bus.publish).toHaveBeenCalledWith('navigation:location-change', null)
  })
})
