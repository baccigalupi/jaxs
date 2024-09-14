import { JaxsStoreUpdaterFunction } from '../../types'
import { JaxsStoreUpdater } from '../store-updater'

export class ObjectUpdater<T> extends JaxsStoreUpdater<T> {
  addUpdaterFunction(name: string, updater: JaxsStoreUpdaterFunction<T>) {
    this.constructor.prototype[name] = (...args: any[]) => {
      const newValue = updater(this.value, ...args)
      this.update(newValue)
    }
  }

  updateAttribute(name: keyof T, value: T[keyof T]) {
    const newRecord = { ...this.value }
    newRecord[name] = value
    this.update(newRecord)
  }
}
