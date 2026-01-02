import { Store, StoreUpdaterOrValue } from '../../types'

export class StoreUpdaterObject<T extends object> {
  store: Store<T>
  
  constructor(store: Store<T>) {
    this.store = store
  }

  private update(updater: StoreUpdaterOrValue<T>) {
    this.store.update(updater)
  }

  private get value() {
    return this.store.value
  }

  reset() {
    this.store.update(this.store.initialValue)
  }
  
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

  updateAttributes(values: Partial<T>) {
    const newRecord = { ...this.value, ...values }
    this.update(newRecord)
  }
}

export const objectUpdater = <T extends Object>(store: Store<T>) =>
  new StoreUpdaterObject<T>(store)

export const UpdateRecord = {
  reset: <T>(store: Store<T>) => objectUpdater(store).reset(),
  resetAttribute: <T>(store: Store<T>, name: keyof T) =>
    objectUpdater(store).resetAttribute(name),
  updateAttribute: <T>(store: Store<T>, name: keyof T, value: T[keyof T]) =>
    objectUpdater(store).updateAttribute(name, value),
  updateAttributes: <T>(store: Store<T>, values: Partial<T>) =>
    objectUpdater(store).updateAttributes(values)
}