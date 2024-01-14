import { describe, expect, test, mock } from 'bun:test'
const spy = () => mock(() => {})

import { createApp } from '../../src/app'

describe('navigation related events', () => {
  const setupWindow = (pushSpy) => {
    window.history = {
      pushState: pushSpy
    }

    window.location = {
      host: 'www.example.com',
      pathname: '/foo/bar',
      search: '?zardoz=weird'
    }
  }

  test('the app sets up everything for link navigation from the dom', () => {
    const pushSpy = spy()
    setupWindow(pushSpy)

    const app = createApp()
    const locationChangeListener = spy()
    app.subscribe('locationChange', locationChangeListener)

    const event = {
      target: { getAttribute: () => '/foo/bar' },
      preventDefault: () => {}
    }
    app.publish('goToHref', event)

    expect(locationChangeListener).toHaveBeenCalledTimes(1)
    expect(pushSpy).toHaveBeenCalledTimes(1)
    expect(pushSpy.mock.calls[0][2]).toEqual('/foo/bar')
    expect(app.getState()).toEqual({
      route: {
        host: 'www.example.com',
        path: '/foo/bar',
        query: {
          zardoz: 'weird'
        }
      }
    })
  })

  test('provides a way to programmatically navigate via publishing an event', () => {
    const pushSpy = spy()
    setupWindow(pushSpy)

    const app = createApp()
    const locationChangeListener = spy()
    app.subscribe('locationChange', locationChangeListener)

    app.publish('navigate', '/my/path')

    expect(locationChangeListener).toHaveBeenCalledTimes(1)
    expect(pushSpy).toHaveBeenCalledTimes(1)
    expect(pushSpy.mock.calls[0][2]).toEqual('/my/path')
  })
})
