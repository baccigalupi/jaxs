import { expect, it, describe, vi } from 'vitest'
import { Store } from '../../lib/state/store'
import { State } from '../../lib/state'
import { StoreUpdaterBoolean } from '../../lib/state/updaters/boolean'
import { StoreUpdaterObject } from '../../lib/state/updaters/object'
import { StoreUpdaterList } from '../../lib/state/updaters/list'

describe('State', () => {
  it('allows the creation and reading of stores', () => {
    const publish = vi.fn()
    const state = new State(publish)

    state.create('loggedIn', false)
    state.create('users', [
      { id: 1, name: 'Jasper' },
      { id: 42, name: 'Jesus' },
    ])
    state.create('signinForm', { username: 'Ahmed', password: 'secret' })
    state.create('loginAttempts', 0)

    expect(state.store('loggedIn')).toBeInstanceOf(Store)
    expect(state.store('users')).toBeInstanceOf(Store)
    expect(state.store('signinForm')).toBeInstanceOf(Store)
    expect(state.store('loginAttempts')).toBeInstanceOf(Store)
  })

  it('makes available via `get` the underlying object state of each store', () => {
    const publish = vi.fn()
    const state = new State(publish)

    state.create('loggedIn', true)
    state.create('users', [
      { id: 1, name: 'Jasper' },
      { id: 42, name: 'Jesus' },
    ])
    state.create('signinForm', { username: 'Ahmed', password: 'secret' })
    state.create('loginAttempts', 0)

    expect(state.get('loggedIn')).toEqual(true)
    expect(state.get('users')).toEqual([
      { id: 1, name: 'Jasper' },
      { id: 42, name: 'Jesus' },
    ])
    expect(state.get('signinForm')).toEqual({
      username: 'Ahmed',
      password: 'secret',
    })
    expect(state.get('loginAttempts')).toEqual(0)
  })

  it("getting a store that doesn't yet exist returns an empty store", () => {
    const publish = vi.fn()
    const state = new State(publish)

    expect(state.store('foo')).toBeInstanceOf(Store)
    expect(state.get('foo')).toEqual(undefined)
  })

  it("updating with a storename and value, will change it's value", () => {
    const publish = vi.fn()
    const state = new State(publish)

    state.create('loggedIn', true)
    state.update('loggedIn', false)

    expect(state.get('loggedIn')).toEqual(false)
  })

  it('updating with a store name and function will change the store', () => {
    const publish = vi.fn()
    const state = new State(publish)

    state.create('users', [
      { id: 1, name: 'Jasper', loggedIn: false },
      { id: 42, name: 'Jesus', loggedIn: false },
    ])

    state.update('users', (originalValue) => {
      const lastUser = originalValue[1]
      lastUser.loggedIn = true
      lastUser.name = 'Jesus M.'

      return [originalValue[0], lastUser]
    })

    expect(state.get('users')[1]).toEqual({
      id: 42,
      name: 'Jesus M.',
      loggedIn: true,
    })
  })

  it('when updating a store, it publishes the right event', () => {
    const publish = vi.fn()
    const state = new State(publish)

    state.create('loggedIn', false)
    state.update('loggedIn', true)

    const store = state.store('loggedIn')
    expect(publish).toHaveBeenCalledWith('state:loggedIn', {
      state,
      store,
    })
  })

  it('when changing multiple stores or attributes, you can delay publishing with a transaction', () => {
    const publish = vi.fn()
    const state = new State(publish)

    state.create('currentUser', { username: 'Ahmed', password: 'secret' })

    state.transaction(({ currentUser }) => {
      currentUser.update({ ...currentUser.value, username: 'Guest' })
      currentUser.update({ ...currentUser.value, password: 'nope' })

      expect(publish).not.toHaveBeenCalled()
    })

    expect(publish).toHaveBeenCalledTimes(1)
    expect(publish.mock.calls[0][0]).toEqual('state:currentUser')
  })

  describe('adding typed stores with updaters', () => {
    it('boolean stores come with `toggle`, `setFalse` and `setTrue`', () => {
      const state = new State(vi.fn())
      const store = state.createBoolean('loggedIn', false)
      const updater = store.updater as StoreUpdaterBoolean

      updater.toggle()
      expect(store.value).toEqual(true)

      updater.setFalse()
      expect(store.value).toEqual(false)

      updater.setTrue()
      expect(store.value).toEqual(true)

      updater.reset()
      expect(store.value).toEqual(false)
    })

    it('record stores come with an `updateAttribute` method', () => {
      type CurrentUser = {
        name: string
        loggedIn: boolean
      }
      const state = new State(vi.fn())
      const store = state.createRecord('currentUser', {
        name: 'Guest',
        loggedIn: false,
      })
      const updater = store.updater as StoreUpdaterObject<CurrentUser>

      updater.updateAttribute('loggedIn', true)
      expect(store.value.loggedIn).toEqual(true)
    })

    it('list stores come with `shift`, `unshift`, `push` and `pop`', () => {
      const state = new State(vi.fn())
      const store = state.createList('actions', [])
      const updater = store.updater as StoreUpdaterList<string>

      updater.push('pushed first')
      updater.push('pushed second')
      expect(store.value).toEqual(['pushed first', 'pushed second'])

      const poppedValue = updater.pop()
      expect(poppedValue).toEqual('pushed second')
      expect(store.value).toEqual(['pushed first'])

      updater.unshift('unshifted first')
      updater.unshift('unshifted second')
      expect(store.value).toEqual([
        'unshifted second',
        'unshifted first',
        'pushed first',
      ])

      const shiftedValue = updater.shift()
      expect(shiftedValue).toEqual('unshifted second')
      expect(store.value).toEqual(['unshifted first', 'pushed first'])

      updater.insertAt(1, 'stuck in the middle with you')

      expect(store.value).toEqual([
        'unshifted first',
        'stuck in the middle with you',
        'pushed first',
      ])
    })

    it('lists updater have methods for adding sorters', () => {
      type User = {
        id: number
      }
      const state = new State(vi.fn())
      const store = state.createList('users', [])
      store.addSorter('sortById', (left: User, right: User) => {
        if (left.id === right.id) return 0
        return left.id < right.id ? -1 : 1
      })
      const updater = store.updater as StoreUpdaterList<User>

      updater.push({ id: 23 })
      updater.push({ id: 1 })
      updater.push({ id: 100 })

      updater.sortById()

      expect(store.value).toEqual([{ id: 1 }, { id: 23 }, { id: 100 }])
    })
  })
})
