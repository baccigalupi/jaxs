/** @jsx jsx */
/** @jsxFrag jsx.fragment */
import { jsx } from '../lib/jaxs'

import { describe, expect, it, vi, beforeEach, Mocked } from 'vitest'
import { createApp } from '../lib/app/builder'
import { createTestDom, setupDom, domToString } from './support/test-dom'
import type { StaticTemplate, ListenerKit } from '../lib/types'

describe('App', () => {
  const globalWindow = {
    location: { host: 'http://localhost', pathname: '', search: '' },
    addEventListener: vi.fn(),
  } as unknown as Mocked<Window>
  const globalDocument = {} as unknown as Mocked<Document>

  beforeEach(() => {
    vi.stubGlobal('window', globalWindow)
    vi.stubGlobal('document', globalDocument)
  })

  describe('dom setup (because dependency injection)', () => {
    it('when initialized with a window, it uses that to set the document', () => {
      const localWindow = setupDom().window

      const app = createApp({ window: localWindow })

      expect(app.window).toEqual(localWindow)
      expect(app.document).toEqual(localWindow.document)
    })

    it('when initialized with a document, infers the window', () => {
      const localWindow = setupDom().window

      const app = createApp({ document: localWindow.document })

      expect(app.window).toEqual(localWindow)
      expect(app.document).toEqual(localWindow.document)
    })

    it('when neither window nor document is passed in, it uses the globals', () => {
      const app = createApp()

      expect(app.window).toEqual(globalWindow)
      expect(app.document).toEqual(globalDocument)
    })
  })

  describe('state and bus setup', () => {
    it('connects the bus to the state and adds listener options', () => {
      const app = createApp()

      const listenerOptions = app.bus.options as unknown as ListenerKit

      expect(listenerOptions.state).toEqual(app.state)
      expect(listenerOptions.document).toEqual(globalDocument)
      expect(listenerOptions.window).toEqual(globalWindow)
    })
  })

  it('render from the app works', () => {
    const document = createTestDom()
    const app = createApp({ document })
    const Template: StaticTemplate = () => <h1>Hello Jaxs App</h1>

    app.render(<Template />, '#app')

    expect(domToString(document)).toContain('<h1>Hello Jaxs App</h1>')
  })

  it('render stores the root on the app', () => {
    const document = createTestDom()
    const app = createApp({ document })
    const Template: StaticTemplate = () => <h1>Hello Jaxs App</h1>

    const templateRoot = app.render(<Template />, '#app')

    expect(app.roots).toContain(templateRoot)
  })
})
