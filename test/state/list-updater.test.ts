import { expect, it, describe, vi } from 'vitest'
import { State } from '@lib/state'
import { ListStore } from '@lib/jaxs'
import { mockPublish } from '@support/render-kit'

describe('adding typed stores with updaters', () => {
  it('list stores come with `shift`, `unshift`, `push` and `pop`', () => {
    const state = new State(mockPublish())
    const store = state.create<string[]>('actions', [])

    ListStore.push(store, 'pushed first')
    ListStore.push(store, 'pushed second')
    expect(store.value).toEqual(['pushed first', 'pushed second'])

    const poppedValue = ListStore.pop(store)
    expect(poppedValue).toEqual('pushed second')
    expect(store.value).toEqual(['pushed first'])

    ListStore.unshift(store, 'unshifted first')
    ListStore.unshift(store, 'unshifted second')
    expect(store.value).toEqual([
      'unshifted second',
      'unshifted first',
      'pushed first',
    ])

    const shiftedValue = ListStore.shift(store)
    expect(shiftedValue).toEqual('unshifted second')
    expect(store.value).toEqual(['unshifted first', 'pushed first'])

    ListStore.insertAt(store, 1, 'stuck in the middle with you')

    expect(store.value).toEqual([
      'unshifted first',
      'stuck in the middle with you',
      'pushed first',
    ])
  })

  it('list updaters can remove an item', () => {
    const state = new State(mockPublish())
    const store = state.create<string[]>('actions', ['foo', 'bar'])

    ListStore.remove(store, 'bar')

    expect(store.value).toEqual(['foo'])
  })

  it('list updaters can remove an item via a function matcher', () => {
    const state = new State(mockPublish())
    const store = state.create<string[]>('actions', ['foo', 'bar', 'good'])

    ListStore.removeBy(store, (item: string) => item.includes('oo'))

    expect(store.value).toEqual(['bar'])
  })

  it('list updaters can append if unique', () => {
    const state = new State(mockPublish())
    const store = state.create<string[]>('items', ['apple', 'banana'])

    ListStore.appendIfUnique(store, 'cherry')
    expect(store.value).toEqual(['apple', 'banana', 'cherry'])

    ListStore.appendIfUnique(store, 'banana')
    expect(store.value).toEqual(['apple', 'banana', 'cherry'])

    ListStore.appendIfUnique(store, 'date')
    expect(store.value).toEqual(['apple', 'banana', 'cherry', 'date'])
  })

  it('list updaters can find an item via a matcher function', () => {
    const state = new State(mockPublish())
    const store = state.create<string[]>('fruit', [
      'apple',
      'banana',
      'apricot',
    ])

    const found = ListStore.find(store, (item: string) => item.startsWith('a'))
    expect(found).toEqual('apple')
  })

  it('list updaters can replace a string item', () => {
    const state = new State(mockPublish())
    const store = state.create<string[]>('items', ['a', 'b', 'c'])

    ListStore.replace(store, 'b', 'x')
    expect(store.value).toEqual(['a', 'x', 'c'])
  })

  it('list updaters can replace an object item in the list', () => {
    const state = new State(mockPublish())
    type Item = { id: number }
    const store = state.create<Item[]>('items', [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ])
    const found = ListStore.find(store, (item: Item) => item.id === 2)

    ListStore.replace(store, found, { id: 4 })
    expect(store.value).toEqual([{ id: 1 }, { id: 4 }, { id: 3 }])
  })

  it('list updaters can replace a nested object item when equivalent', () => {
    const state = new State(mockPublish())
    type Item = { id: number; data: { value: string } }
    const store = state.create<Item[]>('items', [
      { id: 1, data: { value: 'a' } },
      { id: 2, data: { value: 'b' } },
      { id: 3, data: { value: 'c' } },
    ])

    ListStore.replace(
      store,
      { id: 2, data: { value: 'b' } },
      { id: 4, data: { value: 'd' } },
    )

    expect(store.value[1]).toEqual({ id: 4, data: { value: 'd' } })
  })
})
