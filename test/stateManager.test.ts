import { describe, expect, it, spy, xit } from '../devDeps.ts';
import { StateManager } from '../lib/stateManager.ts';

describe('StateManager', () => {
  it('starts with the initial state provided', () => {
    const publish = spy();
    const initialState = {
      greeting: 'Hello',
      name: 'Guest',
    };

    const stateManager = new StateManager({
      initialState,
      publish,
    });

    expect(stateManager.getState()).toEqual(initialState);
  });

  it('sets an empty object as the state without any initial state', () => {
    const publish = spy();
    const stateManager = new StateManager({
      publish,
    });
    expect(stateManager.getState()).toEqual({});
  });

  it('sets state in a non-mutating way', () => {
    const publish = spy();
    const initialState = {
      greeting: 'Hello',
      name: 'Guest',
    };

    const stateManager = new StateManager({
      initialState,
      publish,
    });
    stateManager.setState((state) => {
      state.name = 'Fred';
    });

    expect(stateManager.getState()).not.toEqual(initialState);
    expect(stateManager.getState()).not.toBe(initialState);
    expect(stateManager.getState().name).toEqual('Fred');
  });

  it('has exactly the same state object when no change is made by the setter', () => {
    const publish = spy();
    const initialState = {
      greeting: 'Hello',
      name: 'Guest',
    };

    const stateManager = new StateManager({
      initialState,
      publish,
    });
    stateManager.setState((state) => {
      state.name = 'Guest';
    });

    expect(stateManager.getState()).toBe(initialState);
    expect(stateManager.getState().name).toEqual('Guest');
  });

  it('publishes a state changed event when the state changes', () => {
    const publish = spy();
    const initialState = {
      greeting: 'Hello',
      name: 'Guest',
    };

    const stateManager = new StateManager({
      initialState,
      publish,
    });
    stateManager.setState((state) => {
      state.name = 'Fred';
    });

    expect(publish.calls.length).toEqual(1);
    expect(publish.calls[0].args[0]).toEqual('stateChange');
    expect(publish.calls[0].args[1]).toEqual(stateManager.getState());
  });

  it('does not publish a state changed event if the state stays the same', () => {
    const publish = spy();
    const initialState = {
      greeting: 'Hello',
      name: 'Guest',
    };

    const stateManager = new StateManager({
      initialState,
      publish,
    });
    stateManager.setState((state) => {
      state.name = 'Guest';
    });

    expect(publish.calls.length).toEqual(0);
  });
});
