import { ensureImmutable } from '../deps.ts';
import { State, StateSetter } from './types.ts';

export class StateManager {
  state: State;

  constructor(defaultState?: State | undefined) {
    this.state = defaultState !== undefined ? defaultState : {};
  }

  getState() {
    return this.state;
  }

  setState(setter: StateSetter) {
    this.state = ensureImmutable(this.state, setter);
  }
}
