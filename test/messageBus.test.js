import { describe, it, expect, } from '../devDeps.ts';
import { createBus } from '../lib/messageBus.ts';

describe('MessageBus', () => {
  it('adds a listener and calls it when event is triggered', () => {
    const listenerCalls = [];
    const bus = createBus();

    bus.subscribe('click', (payload) => {
      listenerCalls.push(payload);
    });

    bus.publish('click', 'first click');
    bus.publish('click', 'second click');

    expect(listenerCalls[0]).toEqual('first click');
    expect(listenerCalls[1]).toEqual('second click');
  });

  it('calls multiple listeners for the same event name', () => {
    const listenerCalls = [];
    const bus = createBus();

    bus.subscribe('click', (payload) => {
      listenerCalls.push({ message: 'first callback', payload });
    });

    bus.subscribe('click', (payload) => {
      listenerCalls.push({ message: 'second callback', payload });
    });

    bus.publish('click', 'click bate');

    expect(listenerCalls[0]).toEqual({
      message: 'first callback',
      payload: 'click bate',
    });
    expect(listenerCalls[1]).toEqual({
      message: 'second callback',
      payload: 'click bate',
    });
  });
});