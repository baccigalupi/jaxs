import { expect, it, describe, vi } from 'vitest'
import { State } from '@lib/state'
import { RecordStore } from '@lib/jaxs'
import { mockPublish } from '@support/render-kit'

describe('RecordStore', () => {
  it('`updateAttribute` method updates typed attributes', () => {
    const state = new State(mockPublish())
    const store = state.create('currentUser', {
      name: 'Guest',
      loggedIn: false,
    })

    RecordStore.updateAttribute(store, 'loggedIn', true)

    expect(store.value.loggedIn).toEqual(true)
  })

  it('`updateAttributes` updates all the key/values pairs', () => {
    const state = new State(mockPublish())
    const store = state.create('currentUser', {
      name: 'Guest',
      loggedIn: false,
      nickname: 'SilentBob',
    })
    RecordStore.updateAttributes(store, { name: 'Jed', loggedIn: true })

    expect(store.value.name).toEqual('Jed')
    expect(store.value.loggedIn).toEqual(true)
    expect(store.value.nickname).toEqual('SilentBob')
  })

  it('`resetAttribute` method resets only that attribute', () => {
    const state = new State(mockPublish())
    const store = state.create('currentUser', {
      name: 'Guest',
      loggedIn: false,
    })

    RecordStore.updateAttribute(store, 'name', 'Adrian')
    RecordStore.updateAttribute(store, 'loggedIn', true)
    RecordStore.resetAttribute(store, 'loggedIn')

    expect(store.value.loggedIn).toEqual(false)
    expect(store.value.name).toEqual('Adrian')
  })

  it('attributeTruthy returns a boolean', () => {
    const state = new State(mockPublish())
    const store = state.create('currentUser', {
      name: 'Guest',
      loggedIn: false,
    })

    expect(RecordStore.attributeTruthy(store, 'name')).toBe(true)
    expect(RecordStore.attributeTruthy(store, 'loggedIn')).toBe(false)
  })
})
