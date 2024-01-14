import { describe, expect, test, mock } from 'bun:test'
const spy = () => mock(() => {})
import { createBus } from '../src/messageBus'

describe('MessageBus', () => {
  test('calls an added listener with the payload', () => {
    const listener = spy()
    const { publish, subscribe } = createBus()

    subscribe('click', listener)
    publish('click', 'payload here!')

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener.mock.calls[0][0]).toEqual('payload here!')
  })

  test('allows adding additional options to the listener kit', () => {
    const listener = spy()
    const stateAccessFunction = spy()
    const { publish, subscribe, bus } = createBus()

    bus.addListenerOptions({ getState: stateAccessFunction })
    subscribe('click', listener)
    publish('click', 'payload here!')

    const listenerKit = listener.mock.calls[0][1]
    expect(Object.keys(listenerKit).sort()).toEqual([
      'eventName',
      'getState',
      'publish'
    ])

    expect(listenerKit.eventName).toEqual('click')
    expect(listenerKit.getState).toEqual(stateAccessFunction)
  })

  test('calls an added listener with publisher that correctly publishes back to the bus', () => {
    const clickListener = spy()
    const changeListener = spy()
    const { publish, subscribe } = createBus()

    subscribe('click', clickListener)
    subscribe('change', changeListener)
    publish('click', 'payload here!')

    expect(changeListener).not.toHaveBeenCalled()

    const publish2 = clickListener.mock.calls[0][1].publish
    publish2('change', 'change payload')

    expect(changeListener).toHaveBeenCalledTimes(1)
    expect(changeListener.mock.calls[0][0]).toEqual('change payload')
  })

  test('calls a listeners multiple times when new events are triggered', () => {
    const listener = spy()
    const { publish, subscribe } = createBus()

    subscribe('click', listener)

    publish('click', 'first click')
    publish('click', 'second click')

    expect(listener.mock.calls[0][0]).toEqual('first click')
    expect(listener.mock.calls[1][0]).toEqual('second click')
  })

  test('calls multiple listeners for the same event name', () => {
    const listener1 = spy()
    const listener2 = spy()
    const { publish, subscribe } = createBus()

    subscribe('click', listener1)
    subscribe('click', listener2)

    publish('click', 'click bate')

    expect(listener1.mock.calls[0][0]).toEqual('click bate')
    expect(listener2.mock.calls[0][0]).toEqual('click bate')
  })
})
