import { expect, it, describe, vi } from 'vitest'
import { State } from '@lib/state'
import { updaters } from '@lib/state/updaters'

describe('object updater', () => {
  it('`updateAttribute` method updates typed attributes', () => {
    type CurrentUser = {
      name: string
      loggedIn: boolean
    }
    const state = new State(vi.fn())
    const store = state.create('currentUser', {
      name: 'Guest',
      loggedIn: false,
    })
    const updater = updaters.object<CurrentUser>(store)

    updater.updateAttribute('loggedIn', true)

    expect(store.value.loggedIn).toEqual(true)
  })

  describe('updateDynamicAttribute', () => {
    it('only updates when the key exists in the type, and the value is correct for the key', () => {
      type CurrentUser = {
        name: string
        loggedIn: boolean
      }
      const state = new State(vi.fn())
      const store = state.create('currentUser', {
        name: 'Guest',
        loggedIn: false,
      })
      const updater = updaters.object<CurrentUser>(store)

      const key = 'name'
      const value = 'Jed' as unknown

      updater.updateDynamicAttribute(key, value)

      expect(store.value.name).toEqual(value)
    })

    it("doesn't update when the key is not part of the type", () => {
      type CurrentUser = {
        name: string
        loggedIn: boolean
      }
      const state = new State(vi.fn())
      const store = state.create('currentUser', {
        name: 'Guest',
        loggedIn: false,
      })
      const updater = updaters.object<CurrentUser>(store)

      const key = 'something'
      const value = 'Jed' as unknown

      updater.updateDynamicAttribute(key, value)

      expect(store.value).toEqual({
        name: 'Guest',
        loggedIn: false,
      })
    })

    it("doesn't update when the value is not correct for the key not part of the type", () => {
      type CurrentUser = {
        name: string
        loggedIn: boolean
      }
      const state = new State(vi.fn())
      const store = state.create('currentUser', {
        name: 'Guest',
        loggedIn: false,
      })
      const updater = updaters.object<CurrentUser>(store)

      const key = 'name'
      const value = 3 as unknown

      updater.updateDynamicAttribute(key, value)

      expect(store.value).toEqual({
        name: 'Guest',
        loggedIn: false,
      })
    })
  })

  it('`resetAttribute` method resets only that attribute', () => {
    type CurrentUser = {
      name: string
      loggedIn: boolean
    }
    const state = new State(vi.fn())
    const store = state.create('currentUser', {
      name: 'Guest',
      loggedIn: false,
    })
    const updater = updaters.object<CurrentUser>(store)

    updater.updateAttribute('loggedIn', true)
    updater.resetAttribute('loggedIn')

    expect(store.value.loggedIn).toEqual(false)
    expect(store.value.name).toEqual('Guest')
  })
})
