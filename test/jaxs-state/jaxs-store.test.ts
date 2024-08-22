import { expect, it, describe, vi } from 'vitest'
import { JaxsState } from '../../lib/jaxs-state'
import { JaxsStore } from '../../lib/jaxs-state/jaxs-store'
import { JaxsStoreUpdater } from '../../lib/jaxs-state/jaxs-store-updater'

describe('JaxsStore', () => {
  it("'value' attribute will return it's underlying value", () => {
    const parent = new JaxsState(vi.fn())
    const store = new JaxsStore({
      name: 'myToggle',
      parent,
      value: false,
    })

    expect(store.value).toEqual(false)
  })

  it("can be updated via the 'update' method", () => {
    const parent = new JaxsState(vi.fn())
    const store = new JaxsStore({
      name: 'myToggle',
      parent,
      value: false,
    })
    store.update(true)

    expect(store.value).toEqual(true)
  })

  it('notifies the parent about a change if the value actually changes', () => {
    const parent = new JaxsState(vi.fn())
    vi.spyOn(parent, 'notify')
    const store = new JaxsStore({
      name: 'myToggle',
      parent,
      value: false,
    })
    store.update(true)

    expect(parent.notify).toHaveBeenCalledWith('myToggle')
  })

  it("direct attempts to change the value don't work", () => {
    const parent = new JaxsState(vi.fn())
    const store = new JaxsStore({
      name: 'myToggle',
      parent,
      value: false,
    })

    expect(() => (store.value = true)).toThrowError()
    expect(store.value).toEqual(false)
  })

  it('has an empty updater by default', () => {
    const parent = new JaxsState(vi.fn())
    const store = new JaxsStore({
      name: 'myToggle',
      parent,
      value: false,
    })

    expect(store.updater).toBeInstanceOf(JaxsStoreUpdater)
  })

  it('can add an updater function to the updater', () => {
    const parent = new JaxsState(vi.fn())
    const store = new JaxsStore({
      name: 'myToggle',
      parent,
      value: false,
    })

    store.addUpdater('toggle', (value) => !value)
    store.updater.toggle()

    expect(store.value).toEqual(true)
  })

  it('can add a collection of updaters', () => {
    type CurrentUserRecord = {
      name: string
      loggedIn: boolean
    }
    const currentUser = {
      name: 'Guest',
      loggedIn: false,
    }

    const parent = new JaxsState(vi.fn())
    const store = new JaxsStore({
      name: 'currentUser',
      parent,
      value: currentUser,
    })

    const updateUsername = (value: CurrentUserRecord, username: string) => {
      return { ...value, name: username }
    }

    const toggleLoggedIn = (value: CurrentUserRecord) => {
      return { ...value, loggedIn: !value.loggedIn }
    }

    store.addUpdaters({
      updateUsername,
      toggleLoggedIn,
    })

    store.updater.updateUsername('Fred')
    expect(store.value.name).toEqual('Fred')

    store.updater.toggleLoggedIn()
    expect(store.value.loggedIn).toEqual(true)
  })

  it('all stores updaters have a `reset` method to set to original state', () => {
    const parent = new JaxsState(vi.fn())
    const store = new JaxsStore({
      name: 'currentUser',
      parent,
      value: {
        name: 'Guest',
        loggedIn: false,
      },
    })

    store.update({ name: 'Fred', loggedIn: true })
    store.updater.reset()

    expect(store.value).toEqual({ name: 'Guest', loggedIn: false })
  })
})
