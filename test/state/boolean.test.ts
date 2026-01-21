import { expect, it, describe, vi } from 'vitest'
import { State } from '@lib/state'
import { BooleanStore } from '@lib/jaxs'
import { PublishExtended } from '@lib/types'
import { mockPublish } from '@support/render-kit'

describe('adding typed stores with updaters', () => {
  it('boolean stores come with `toggle`, `setFalse` and `setTrue`', () => {
    const publish = mockPublish()
    const state = new State(publish)
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
