import { Store, StoreUpdaterOrValue } from '../../types'

export class StoreUpdaterBoolean {
  store: Store<boolean>

  constructor(store: Store<boolean>) {
    this.store = store
  }

  private update(updater: StoreUpdaterOrValue<boolean>) {
    this.store.update(updater)
  }

  private get value() {
    return this.store.value
  }

  reset() {
    this.store.update(this.store.initialValue)
  }

  toggle() {
    const newValue = !this.value
    this.update(newValue)
  }

  setTrue() {
    this.update(true)
  }

  setFalse() {
    this.update(false)
  }

  isTrue(): boolean {
    return this.value === true
  }

  isFalse(): boolean {
    return this.value === false
  }
}

export const booleanUpdater = (store: Store<boolean>) =>
  new StoreUpdaterBoolean(store)

export const BooleanStore = {
  toggle: (store: Store<boolean>) => booleanUpdater(store).toggle(),
  setTrue: (store: Store<boolean>) => booleanUpdater(store).setTrue(),
  setFalse: (store: Store<boolean>) => booleanUpdater(store).setFalse(),
  reset: (store: Store<boolean>) => booleanUpdater(store).reset(),
  isTrue: (store: Store<boolean>): boolean => booleanUpdater(store).isTrue(),
  isFalse: (store: Store<boolean>): boolean => booleanUpdater(store).isFalse(),
}
