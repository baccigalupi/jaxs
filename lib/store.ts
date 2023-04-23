import { ensureImmutable } from '../deps.ts';
import { BusPublish, State, StateSetter } from './types.ts';

type StoreInitialization = {
  initialState?: State;
  publish: BusPublish;
};

export const stateChangeEvent = 'stateChange';

export class Store {
  state: State;
  publish: BusPublish;

  constructor({ initialState, publish }: StoreInitialization) {
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

export const createStore = (storeSetup: StoreInitialization) => {
  const store = new Store(storeSetup);
  const getState = store.getState.bind(store);
  const setState = store.getState.bind(store);

  return {
    store,
    getState,
    setState,
  };
};
