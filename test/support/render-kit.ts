import { vi, Mocked } from 'vitest'
import { setupDom } from './test-dom'
import { createState } from '../../lib/state'
import { createBus, type JaxsBus } from '../../lib/bus'
import { PublishFunction, BusEventMatcher, BusListener } from '../../lib/types'

type Subscribe<T> = (matcher: BusEventMatcher, listener: BusListener<T>) => void

export const createRenderKit = <T>(messageBus = {} as Partial<JaxsBus>) => {
  const dom = setupDom()

  const busOptions = {
    publish: messageBus.publish || (vi.fn() as Mocked<PublishFunction<T>>),
    subscribe: messageBus.subscribe || (vi.fn() as Subscribe<T>),
  }
  const state = createState(busOptions.publish)

  return {
    document: dom.window._document,
    window: dom.window,
    state,
    ...busOptions,
  }
}

export const createRenderKitWithBus = () => {
  const messageBus = createBus()
  return createRenderKit(messageBus)
}
