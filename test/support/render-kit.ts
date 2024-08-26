import { vi, Mocked } from 'vitest'
import { setupWindow } from './test-dom'
import { createState } from '../../lib/jaxs-state'
import {
  JaxsBus,
  JaxsPublishFunction,
  JaxsBusEventMatcher,
  JaxsBusListener,
} from 'jaxs-bus'
type Subscribe<T> = (
  matcher: JaxsBusEventMatcher,
  listener: JaxsBusListener<T>,
) => void

export const createRenderKit = <T>(messageBus = {} as Partial<JaxsBus<T>>) => {
  const dom = setupWindow()

  const busOptions = {
    publish: messageBus.publish || (vi.fn() as Mocked<JaxsPublishFunction<T>>),
    subscribe: messageBus.subscribe || (vi.fn() as Subscribe<T>),
  }
  const state = createState(busOptions.publish)

  return {
    document: dom.window.document,
    window: dom.window,
    state,
    ...busOptions,
  }
}
