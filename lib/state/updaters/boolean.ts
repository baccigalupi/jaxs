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
}
