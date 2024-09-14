import type {
  State,
  StoreDataUpdater,
  StoreInitializationOptions,
  StoreListSorterFunction,
  string,
  StoreUpdaterFunction,
  StoreUpdaterOrValue,
  StoreUpdatersCollection,
  StoreUpdater,
} from '../types'
import { areEqual } from './equality'
import { StoreUpdaterBase } from './store-updater'
import { StoreUpdaterList } from './updaters/list'

export class Store<T> {
  parent: State
  name: string
  updater: StoreUpdater<T>
  _value: T
  initialState: T

  constructor(options: StoreInitializationOptions<T>) {
    this.name = options.name
    this.parent = options.parent
    this._value = options.value
    this.initialState = structuredClone(options.value)
    this.updater = new StoreUpdaterBase<typeof options.value>(this)
  }

  get ['value']() {
    return this._value
  }

  set ['value'](value: T) {
    throw new Error('Cannot set value directly. Use an updater!')
  }

  update(updater: StoreUpdaterOrValue<T>) {
    if (typeof updater === 'function') {
      const newValue = this.getUpdatedValue(updater as StoreDataUpdater<T>)
      this.updateValue(newValue)
    } else {
      this.updateValue(updater as T)
    }
  }

  updateValue(newValue: T) {
    if (areEqual(this._value, newValue)) return

    this._value = newValue
    this.parent.notify(this.name)
  }

  getUpdatedValue(updater: StoreDataUpdater<T>) {
    return updater(this.value)
  }

  addUpdaters(updaters: StoreUpdatersCollection<any>) {
    this.updater.addUpdaterFunctions(updaters)
  }

  addUpdater(name: string, updater: StoreUpdaterFunction<any>) {
    this.updater.addUpdaterFunction(name, updater)
  }

  addSorter(name: string, sorter: StoreListSorterFunction<T>) {
    if (!(this.updater instanceof StoreUpdaterList)) return

    this.updater.addSorter(name, sorter)
  }
}
