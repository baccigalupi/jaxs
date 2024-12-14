import { expect, it, describe, vi } from 'vitest'
import { State } from '../../lib/state'
import { updaters } from '../../lib/state/updaters'

describe('adding typed stores with updaters', () => {
  it('boolean stores come with `toggle`, `setFalse` and `setTrue`', () => {
    const state = new State(vi.fn())
    const store = state.create('loggedIn', false)
    const updater = updaters.boolean(store)

    updater.toggle()
    expect(store.value).toEqual(true)

    updater.setFalse()
    expect(store.value).toEqual(false)

    updater.setTrue()
    expect(store.value).toEqual(true)

    updater.reset()
    expect(store.value).toEqual(false)
  })

  it('object stores come with an `updateAttribute` method', () => {
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

  it('object stores come with a `resetAttribute` method', () => {
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
  })

  it('list stores come with `shift`, `unshift`, `push` and `pop`', () => {
    const state = new State(vi.fn())
    const store = state.create<string[]>('actions', [])
    const updater = updaters.list<string>(store)

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

  it('list updaters can remove an item', () => {
    const state = new State(vi.fn())
    const store = state.create<string[]>('actions', ['foo', 'bar'])
    const updater = updaters.list(store)

    updater.remove('bar')

    expect(store.value).toEqual(['foo'])
  })

  it('list updaters can remove an item via a function matcher', () => {
    const state = new State(vi.fn())
    const store = state.create<string[]>('actions', ['foo', 'bar', 'good'])
    const updater = updaters.list(store)

    updater.removeBy((item: string) => item.includes('oo'))

    expect(store.value).toEqual(['bar'])
  })
})
