import { expect, it, describe, vi } from 'vitest'
import { State } from '@lib/state'
import { Store } from '@lib/state/store'
import { mockPublish } from '@support/render-kit'

describe('Store', () => {
  it("'value' attribute will return it's underlying value", () => {
    const parent = new State(mockPublish())
    const store = new Store({
      name: 'myToggle',
      parent,
      value: false,
    })

    expect(store.value).toEqual(false)
  })

  it("can be updated via the 'update' method", () => {
    const parent = new State(mockPublish())
    const store = new Store({
      name: 'myToggle',
      parent,
      value: false,
    })
    store.update(true)

    expect(store.value).toEqual(true)
  })

  it('notifies the parent about a change if the value actually changes', () => {
    const parent = new State(mockPublish())
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
    const parent = new State(mockPublish())
    const store = new Store({
      name: 'myToggle',
      parent,
      value: false,
    })

    expect(() => (store.value = true)).toThrowError()
    expect(store.value).toEqual(false)
  })

  it('all stores have a `reset` method to set to original state', () => {
    const parent = new State(mockPublish())
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

  it('reset notifies the parent when restoring from a changed value', () => {
    const parent = new State(mockPublish())
    vi.spyOn(parent, 'notify')
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

    expect(parent.notify).toHaveBeenCalledWith('currentUser')
    expect(parent.notify).toHaveBeenCalledTimes(2)
  })

  it('reset does not notify when already at the initial value', () => {
    const parent = new State(mockPublish())
    vi.spyOn(parent, 'notify')
    const store = new Store({
      name: 'currentUser',
      parent,
      value: {
        name: 'Guest',
        loggedIn: false,
      },
    })

    store.reset()

    expect(parent.notify).not.toHaveBeenCalled()
  })

  it('does not allow modification of the initial value', () => {
    const parent = new State(mockPublish())
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

  it('does not allow modification of the current value, when get is used', () => {
    const parent = new State(mockPublish())
    const store = new Store({
      name: 'currentUser',
      parent,
      value: {
        name: 'Guest',
        loggedIn: false,
      },
    })

    const currentValue = store.value
    currentValue.loggedIn = true
    currentValue.name = 'Fred'

    expect(store.value).toEqual({ name: 'Guest', loggedIn: false })
  })

  it('update notifies when nested structures are pass by references identical', () => {
    const parent = new State(mockPublish())
    vi.spyOn(parent, 'notify')
    const store = new Store({
      name: 'shape',
      parent,
      value: { points: [] },
    })

    const points = [{ x: 0, y: 0 }]
    store.update({ points })
    points[0].x = 12
    store.update({ points })

    expect(parent.notify).toHaveBeenCalledTimes(2)
  })
})
