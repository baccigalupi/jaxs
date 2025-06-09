import { Store } from '../../types'
import { StoreUpdaterBase } from '../store-updater'

function isKey<T extends object>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj
}

export class StoreUpdaterObject<T extends object> extends StoreUpdaterBase<T> {
  updateAttribute(name: keyof T, value: T[keyof T]) {
    const newRecord = { ...this.value }
    newRecord[name] = value
    this.update(newRecord)
  }

  updateDynamicAttribute(name: string, value: any) {
    if (!this.isKey(name)) return
    if (!this.isValueType(name as keyof T, value)) return

    this.updateAttribute(name as keyof T, value as T[keyof T])
  }

  isKey(key: string) {
    return key in this.store.initialValue
  }

  isValueType(key: keyof T, value: any) {
    return typeof this.store.initialValue[key] == typeof value
  }

  resetAttribute(name: keyof T) {
    const newRecord = { ...this.value }
    const value = this.store.initialValue[name]
    newRecord[name] = value
    this.update(newRecord)
  }
}

export const objectUpdater = <T extends Object>(store: Store<T>) =>
  new StoreUpdaterObject<T>(store)
