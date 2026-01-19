import { expect, it, describe, vi } from 'vitest'
import { State } from '@lib/state'
import { BooleanStore } from '@lib/jaxs'

describe('adding typed stores with updaters', () => {
  it('boolean stores come with `toggle`, `setFalse` and `setTrue`', () => {
    const state = new State(vi.fn())
    const store = state.create('loggedIn', false)

    BooleanStore.toggle(store)
    expect(store.value).toEqual(true)

    BooleanStore.setFalse(store)
    expect(store.value).toEqual(false)

    BooleanStore.setTrue(store)
    expect(store.value).toEqual(true)

    BooleanStore.reset(store)
    expect(store.value).toEqual(false)
  })
})
