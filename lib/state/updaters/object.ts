import { Store } from '../../types'
import { StoreUpdaterBase } from '../store-updater'

export class StoreUpdaterObject<T> extends StoreUpdaterBase<T> {
  updateAttribute(name: keyof T, value: T[keyof T]) {
    const newRecord = { ...this.value }
    newRecord[name] = value
    this.update(newRecord)
  }

  resetAttribute(name: keyof T) {
    const newRecord = { ...this.value }
    const value = this.store.initialValue[name]
    newRecord[name] = value
    this.update(newRecord)
  }
}

export const objectUpdater = <T>(store: Store<T>) =>
  new StoreUpdaterObject<T>(store)
