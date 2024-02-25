import { describe, expect, test, mock, spyOn } from 'bun:test'
import { createTestDom } from '../support/testDom'
import { createApp } from '../../src/app'
const spy = () => mock(() => {})

describe('navigation related events', () => {
  test('the app sets up everything for link navigation from the dom', () => {
    const document = createTestDom()
    const window = document.defaultView
    spyOn(window.history, 'pushState')
    const pushSpy = window.history.pushState

    const app = createApp({ document })
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
    expect(app.state.route.value).toEqual({
      host: 'www.example.com',
      path: '/foo/bar',
      query: {}
      // query: { // JSDOM implementation won't set the query
      //   zardoz: 'weird'
      // }
    })
  })

  test('provides a way to programmatically navigate via publishing an event', () => {
    const document = createTestDom()
    const window = document.defaultView
    spyOn(window.history, 'pushState')
    const pushSpy = window.history.pushState

    const app = createApp({ document })
    const locationChangeListener = spy()
    app.subscribe('locationChange', locationChangeListener)

    app.publish('navigate', '/my/path')

    expect(locationChangeListener).toHaveBeenCalledTimes(1)
    expect(pushSpy).toHaveBeenCalledTimes(1)
    expect(pushSpy.mock.calls[0][2]).toEqual('/my/path')
  })
})
