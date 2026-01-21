import { vi, Mock } from 'vitest'
import { createTestDom } from './test-dom'
import { createState } from '../../lib/state'
import { createBus, type JaxsBus } from '../../lib/bus'
import { BusEventMatcher, BusListener, PublishExtended } from '../../lib/types'

type Subscribe<T> = (matcher: BusEventMatcher, listener: BusListener<T>) => void

export const mockPublish = () => {
  const mock = vi.fn() as Mock & PublishExtended<any>
  mock.withTimeout = vi.fn()
  mock.periodically = vi.fn()
  mock.periodicallyWithCustomTimer = vi.fn()
  return mock
}

export const createRenderKit = <T>(messageBus = {} as Partial<JaxsBus>) => {
  const document = createTestDom()

  const busOptions = {
    publish: (messageBus.publish as PublishExtended<any>) || mockPublish(),
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
