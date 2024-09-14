import { StoreUpdaterFunction } from '../../types'
import { StoreUpdaterBase } from '../store-updater'

export class StoreUpdaterObject<T> extends StoreUpdaterBase<T> {
  addUpdaterFunction(name: string, updater: StoreUpdaterFunction<T>) {
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
