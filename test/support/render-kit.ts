import { vi, Mocked } from 'vitest'
import { createTestDom } from './test-dom'
import { createState } from '../../lib/state'
import { createBus, type JaxsBus } from '../../lib/bus'
import { PublishFunction, BusEventMatcher, BusListener } from '../../lib/types'

type Subscribe<T> = (matcher: BusEventMatcher, listener: BusListener<T>) => void

export const createRenderKit = <T>(messageBus = {} as Partial<JaxsBus>) => {
  const document = createTestDom()

  const busOptions = {
    publish: messageBus.publish || (vi.fn() as Mocked<PublishFunction>),
    subscribe: messageBus.subscribe || (vi.fn() as Subscribe<T>),
  }
  const state = createState(busOptions.publish)

  return {
    document,
    window: document.defaultView,
    state,
    ...busOptions,
  }
}

export const createRenderKitWithBus = () => {
  const messageBus = createBus()
  return createRenderKit(messageBus)
}
