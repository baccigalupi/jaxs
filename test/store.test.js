import { expect, test, describe, mock } from 'bun:test'
const spy = () => mock(() => {})

import { Store } from '../src/store'

describe('Store', () => {
  test('starts with the initial state provided', () => {
    const publish = spy()
    const initialState = {
      greeting: 'Hello',
      name: 'Guest'
    }

    const store = new Store({
      initialState,
      publish
    })

    expect(store.getState()).toEqual(initialState)
  })

  test('sets an empty object as the state without any initial state', () => {
    const publish = spy()
    const store = new Store({
      publish
    })
    expect(store.getState()).toEqual({})
  })

  test('sets state in a non-mutating way', () => {
    const publish = spy()
    const initialState = {
      greeting: 'Hello',
      name: 'Guest'
    }

    const store = new Store({
      initialState,
      publish
    })
    store.setState((state) => {
      state.name = 'Fred'
    })

    expect(store.getState()).not.toEqual(initialState)
    expect(store.getState()).not.toBe(initialState)
    expect(store.getState().name).toEqual('Fred')
  })

  test('has exactly the same state object when no change is made by the setter', () => {
    const publish = spy()
    const initialState = {
      greeting: 'Hello',
      name: 'Guest'
    }

    const store = new Store({
      initialState,
      publish
    })
    store.setState((state) => {
      state.name = 'Guest'
    })

    expect(store.getState()).toBe(initialState)
    expect(store.getState().name).toEqual('Guest')
  })

  test('publishes a state changed event when the state changes', () => {
    const publish = spy()
    const initialState = {
      greeting: 'Hello',
      name: 'Guest'
    }

    const store = new Store({
      initialState,
      publish
    })
    store.setState((state) => {
      state.name = 'Fred'
    })

    expect(publish).toHaveBeenCalledTimes(1)
    expect(publish.mock.calls[0][0]).toEqual('stateChange')
    expect(publish.mock.calls[0][1]).toEqual(store.getState())
  })

  test('does not publish a state changed event if the state stays the same', () => {
    const publish = spy()
    const initialState = {
      greeting: 'Hello',
      name: 'Guest'
    }

    const store = new Store({
      initialState,
      publish
    })
    store.setState((state) => {
      state.name = 'Guest'
    })

    expect(publish).not.toHaveBeenCalled()
  })
})
