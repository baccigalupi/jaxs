import { JaxsStoreUpdaterFunction } from '../../types'
import { JaxsStoreUpdater } from '../store-updater'

export class BooleanUpdater extends JaxsStoreUpdater<boolean> {
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

  addUpdaterFunction(name: string, updater: JaxsStoreUpdaterFunction<boolean>) {
    this.constructor.prototype[name] = (...args: any[]) => {
      const newValue = updater(this.value, ...args)
      this.update(newValue)
    }
  }
}
