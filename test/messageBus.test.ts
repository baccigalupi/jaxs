import { describe, expect, it, spy, xit } from '../devDeps.ts';
import { createBus } from '../lib/messageBus.ts';

describe('MessageBus', () => {
  it('calls an added listener with the payload', () => {
    const listener = spy();
    const { publish, subscribe } = createBus();

    subscribe('click', listener);
    publish('click', 'payload here!');

    expect(listener.calls.length).toEqual(1);
    expect(listener.calls[0].args[0]).toEqual('payload here!');
  });

  it('allows adding additional options to the listener kit', () => {
    const listener = spy();
    const stateAccessFunction = spy();
    const { publish, subscribe, bus } = createBus();

    bus.addListenerOptions({ getState: stateAccessFunction });
    subscribe('click', listener);
    publish('click', 'payload here!');

    const listenerKit = listener.calls[0].args[1];
    expect(Object.keys(listenerKit).sort()).toEqual([
      'eventName',
      'getState',
      'publish',
    ]);

    expect(listenerKit.eventName).toEqual('click');
    expect(listenerKit.getState).toEqual(stateAccessFunction);
  });

  it('calls an added listener with publisher that correctly publishes back to the bus', () => {
    const clickListener = spy();
    const changeListener = spy();
    const { publish, subscribe } = createBus();

    subscribe('click', clickListener);
    subscribe('change', changeListener);
    publish('click', 'payload here!');

    expect(changeListener.calls.length).toEqual(0);

    const publish2 = clickListener.calls[0].args[1].publish;
    publish2('change', 'change payload');

    expect(changeListener.calls.length).toEqual(1);
    expect(changeListener.calls[0].args[0]).toEqual('change payload');
  });

  it('calls a listeners multiple times when new events are triggered', () => {
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
