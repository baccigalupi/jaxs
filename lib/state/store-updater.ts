import type {
  JaxsStore,
  JaxsStoreUpdateValue,
  JaxsStoreUpdaterFunction,
  JaxStoreUpdatersCollection,
} from './store'
export class JaxsStoreUpdater<T> {
  store: JaxsStore<T>

  constructor(store: JaxsStore<T>) {
    this.store = store
  }

  update(updater: JaxsStoreUpdateValue<T>) {
    this.store.update(updater)
  }

  reset() {
    this.store.update(this.store.initialState)
  }

  get value() {
    return this.store.value
  }

  addUpdaterFunction(name: string, updater: JaxsStoreUpdaterFunction<T>) {
    this.constructor.prototype[name] = (...args: any[]) => {
      const newValue = updater(this.value, ...args)
      this.update(newValue)
    }
  }

  addUpdaterFunctions(updaters: JaxStoreUpdatersCollection<T>) {
    for (const key in updaters) {
      this.addUpdaterFunction(key, updaters[key])
    }
  }
}