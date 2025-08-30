import { expect, it, describe, vi } from 'vitest'
import { State } from '../../lib/state'
import { Store } from '../../lib/state/store'

describe('Store', () => {
  it("'value' attribute will return it's underlying value", () => {
    const parent = new State(vi.fn())
    const store = new Store({
      name: 'myToggle',
      parent,
      value: false,
    })

    expect(store.value).toEqual(false)
  })

  it("can be updated via the 'update' method", () => {
    const parent = new State(vi.fn())
    const store = new Store({
      name: 'myToggle',
      parent,
      value: false,
    })
    store.update(true)

    expect(store.value).toEqual(true)
  })

  it('notifies the parent about a change if the value actually changes', () => {
    const parent = new State(vi.fn())
    vi.spyOn(parent, 'notify')
    const store = new Store({
      name: 'myToggle',
      parent,
      value: false,
    })
    store.update(true)

    expect(parent.notify).toHaveBeenCalledWith('myToggle')
  })

  it("direct attempts to change the value don't work", () => {
    const parent = new State(vi.fn())
    const store = new Store({
      name: 'myToggle',
      parent,
      value: false,
    })

    expect(() => (store.value = true)).toThrowError()
    expect(store.value).toEqual(false)
  })

  it('all stores have a `reset` method to set to original state', () => {
    const parent = new State(vi.fn())
    const store = new Store({
      name: 'currentUser',
      parent,
      value: {
        name: 'Guest',
        loggedIn: false,
      },
    })

    store.update({ name: 'Fred', loggedIn: true })
    store.reset()

    expect(store.value).toEqual({ name: 'Guest', loggedIn: false })
  })

  it('does not allow modification of the initial value', () => {
    const parent = new State(vi.fn())
    const value = {
      name: 'Guest',
      loggedIn: false,
    }
    const store = new Store({
      name: 'currentUser',
      parent,
      value,
    })

    store.update((state) => {
      state.loggedIn = true
      state.name = 'Fred'
      return state
    })

    expect(store.value).toEqual({ name: 'Fred', loggedIn: true })
    expect(value).toEqual({ name: 'Guest', loggedIn: false })
  })
})
