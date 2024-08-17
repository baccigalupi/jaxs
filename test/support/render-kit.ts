import { vi } from 'vitest'
import { setupWindow } from './test-dom'
import { JaxsState } from 'jaxs-state'

export const createRenderKit = () => {
  const dom = setupWindow()
  const state = new JaxsState(vi.fn())

  return {
    document: dom.window.document,
    window: dom.window,
    publish: vi.fn(),
    subscribe: vi.fn(),
    state,
  }
}
