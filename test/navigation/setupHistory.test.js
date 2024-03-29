import { describe, expect, test, mock, beforeEach, spyOn } from 'bun:test'
import { createTestDom } from '../support/testDom'

import { createApp } from '../../src/app'
import {
  extractQueryParams,
  onLocationChange
} from '../../src/navigation/setupHistory'
const spy = () => mock(() => {})

describe('navigation history related stuff', () => {
  test('correctly extracts out query params from the url', () => {
    const searchString = '?foo=bar&zardoz=weird'
    const queryParams = extractQueryParams(searchString)
    expect(queryParams).toEqual({
      foo: 'bar',
      zardoz: 'weird'
    })
  })

  test('gets location from the window and updates the store', () => {
    const document = createTestDom()
    const window = document.defaultView
    const app = createApp({ document })
    window.location = {
      host: 'www.example.com',
      pathname: '/foo/bar',
      search: '?zardoz=weird'
    }

    onLocationChange(null, app)

    expect(app.state.route.value).toEqual({
      host: 'www.example.com',
      path: '/foo/bar',
      query: {
        zardoz: 'weird'
      }
    })
  })

  test('gets location from the window and updates the store', () => {
    const document = createTestDom()
    const window = document.defaultView
    const app = createApp({ document })

    app.publish = spy()
    window.location = {
      host: 'www.example.com',
      pathname: '/foo/bar',
      search: '?zardoz=weird'
    }

    onLocationChange(null, app)

    expect(app.publish.mock.calls[0][0]).toEqual('routeChange')
    expect(app.publish.mock.calls[0][1]).toEqual({
      host: 'www.example.com',
      path: '/foo/bar',
      query: { zardoz: 'weird' }
    })
  })
})
