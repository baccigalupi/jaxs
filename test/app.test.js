import { JSDOM } from 'jsdom'
import { describe, expect, test, mock } from 'bun:test'
import { createApp } from '../src/app'

describe('App', () => {
  test('resolves the window, when passed a document', () => {
    const dom = new JSDOM('<!DOCTYPE html>', {
      url: 'http://www.example.com'
    })
    const document = dom.window.document
    const app = createApp({ document })

    expect(app.document).toEqual(document)
    expect(app.window).toEqual(dom.window)
  })

  test('resolves the document, when passed a window', () => {
    const dom = new JSDOM('<!DOCTYPE html>', {
      url: 'http://www.example.com'
    })
    const window = dom.window
    const app = createApp({ window })

    expect(app.document).toEqual(window.document)
    expect(app.window).toEqual(window)
  })

  // Bun sucks and even though the window is available as a global here, it randomly disapears.
  test.skip('looks for the window in the global space when it isn\'t passed a window/document', () => {
    const dom = new JSDOM('<!DOCTYPE html>', {
      url: 'http://www.example.com'
    })
    const window = dom.window

    global.window = window
    console.log(window)

    const app = createApp()
    
    expect(app.document).toEqual(window.document)
    expect(app.window).toEqual(window)
  })
})
