import { ensureImmutable } from '../deps.ts';
import { BusPublish, State, StateSetter } from './types.ts';

type StateManagerInitialiion = {
  initialState?: State;
  publish: BusPublish;
};

export const stateChangeEvent = 'stateChange';

export class StateManager {
  state: State;
  publish: BusPublish;

  constructor({ initialState, publish }: StateManagerInitialiion) {
    this.state = initialState !== undefined ? initialState : {};
    this.publish = publish;
  }

  getState() {
    return this.state;
  }

  setState(setter: StateSetter) {
    const state = this.state;
    this.state = ensureImmutable(this.state, setter);
    if (state !== this.state) {
      this.publish(stateChangeEvent, this.state);
    }
  }
}
