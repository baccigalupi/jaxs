import type { Store, StoreUpdaterOrValue } from '../types'

export class StoreUpdaterBase<T> {
  store: Store<T>

  constructor(store: Store<T>) {
    this.store = store
  }

  update(updater: StoreUpdaterOrValue<T>) {
    this.store.update(updater)
  }

  reset() {
    this.store.update(this.store.initialValue)
  }

  get value() {
    return this.store.value
  }
}
