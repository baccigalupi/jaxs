import { describe, expect, it, spy } from '../devDeps.ts';
import { createBus } from '../lib/messageBus.ts';

describe('MessageBus', () => {
  it('calls an added listener with the right arguments in the right order', () => {
    const listener = spy();
    const { publish, subscribe } = createBus();

    subscribe('click', listener);

    publish('click', 'payload here!');

    expect(listener.calls[0].args[0]).toEqual('payload here!');
    expect(typeof listener.calls[0].args[1]).toEqual('function');
    expect(listener.calls[0].args[2]).toEqual('click');
  });

  it('adds a listener and calls it when events are triggered', () => {
    const listener = spy();
    const { publish, subscribe } = createBus();

    subscribe('click', listener);

    publish('click', 'first click');
    publish('click', 'second click');

    expect(listener.calls[0].args[0]).toEqual('first click');
    expect(listener.calls[1].args[0]).toEqual('second click');
  });

  it('calls multiple listeners for the same event name', () => {
    const listener1 = spy();
    const listener2 = spy();
    const { publish, subscribe } = createBus();

    subscribe('click', listener1);
    subscribe('click', listener2);

    publish('click', 'click bate');

    expect(listener1.calls[0].args[0]).toEqual('click bate');
    expect(listener2.calls[0].args[0]).toEqual('click bate');
  });
});
