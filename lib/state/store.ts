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
  _value: T
  initialValue: T

  constructor(options: StoreInitializationOptions<T>) {
    this.name = options.name
    this.parent = options.parent
    this._value = options.value
    this.initialValue = structuredClone(options.value)
  }

  get ['value']() {
    return this._value as T
  }

  set ['value'](value: T) {
    throw new Error('Cannot set value directly. Use an updater!')
  }

  reset() {
    this._value = this.initialValue
  }

  update(updater: StoreUpdaterOrValue<T>) {
    if (typeof updater === 'function') {
      const newValue = this.#getUpdatedValue(updater as StoreDataUpdater<T>)
      this.#updateValue(newValue)
    } else {
      this.#updateValue(updater as T)
    }
  }

  #updateValue(newValue: T) {
    if (areEqual(this._value, newValue)) return

    this._value = newValue
    this.parent.notify(this.name)
  }

  #getUpdatedValue(updater: StoreDataUpdater<T>) {
    return updater(this.value)
  }
}
