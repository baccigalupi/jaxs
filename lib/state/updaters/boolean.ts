import { StoreUpdaterFunction } from '../../types'
import { StoreUpdaterBase } from '../store-updater'

export class StoreUpdaterBoolean extends StoreUpdaterBase<boolean> {
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

  addUpdaterFunction(name: string, updater: StoreUpdaterFunction<boolean>) {
    this.constructor.prototype[name] = (...args: any[]) => {
      const newValue = updater(this.value, ...args)
      this.update(newValue)
    }
  }
}
