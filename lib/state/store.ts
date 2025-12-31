import type {
  State,
  StoreDataUpdater,
  StoreInitializationOptions,
  StoreUpdaterOrValue,
  StoreUpdater,
} from '../types'
import { areEqual } from './equality'

export class Store<T> {
  parent: State
  name: string
  updater: StoreUpdater<T>
  private _value: T
  initialValue: T

  constructor(options: StoreInitializationOptions<T>) {
    this.name = options.name
    this.parent = options.parent
    this._value = structuredClone(options.value)
    this.initialValue = structuredClone(options.value)
  }

  get ['value']() {
    return structuredClone(this._value)
  }

  set ['value'](value: T) {
    throw new Error('Cannot set value directly. Use an updater!')
  }

  reset() {
    this._value = structuredClone(this.initialValue)
  }

  update(updater: StoreUpdaterOrValue<T>) {
    if (typeof updater === 'function') {
      const newValue = this.getUpdatedValue(updater as StoreDataUpdater<T>)
      this.updateValue(newValue)
    } else {
      this.updateValue(updater as T)
    }
  }

  private updateValue(newValue: T) {
    if (areEqual(this._value, newValue)) return

    this._value = newValue
    this.parent.notify(this.name)
  }

  private getUpdatedValue(updater: StoreDataUpdater<T>) {
    return updater(this.value)
  }
}
