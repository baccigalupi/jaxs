import { describe, expect, it, spy, xit } from '../devDeps.ts';
import { StateManager } from '../lib/stateManager.ts';

describe('StateManager', () => {
  it('starts with the default state provided', () => {
    const initialState = {
      greeting: 'Hello',
      name: 'Guest',
    };

    const stateManager = new StateManager(initialState);

    expect(stateManager.getState()).toEqual(initialState);
  });

  it('sets state in a non-mutating way', () => {
    const initialState = {
      greeting: 'Hello',
      name: 'Guest',
    };

    const stateManager = new StateManager(initialState);
    stateManager.setState((state) => {
      state.name = 'Fred';
    });

    expect(stateManager.getState()).not.toEqual(initialState);
    expect(stateManager.getState()).not.toBe(initialState);
    expect(stateManager.getState().name).toEqual('Fred');
  });

  it('has exactly the same state object when no change is made by the setter', () => {
    const initialState = {
      greeting: 'Hello',
      name: 'Guest',
    };

    const stateManager = new StateManager(initialState);
    stateManager.setState((state) => {
      state.name = 'Guest';
    });

    expect(stateManager.getState()).toBe(initialState);
    expect(stateManager.getState().name).toEqual('Guest');
  });
});
