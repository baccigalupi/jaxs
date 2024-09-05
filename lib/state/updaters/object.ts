import { JaxsStoreUpdater } from '../store-updater'

export class ObjectUpdater<T> extends JaxsStoreUpdater<T> {
  updateAttribute(name: keyof T, value: T[keyof T]) {
    const newRecord = { ...this.value }
    newRecord[name] = value
    this.update(newRecord)
  }
}
