import { Store } from '../../types'
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
}

export const booleanUpdater = (store: Store<boolean>) =>
  new StoreUpdaterBoolean(store)
