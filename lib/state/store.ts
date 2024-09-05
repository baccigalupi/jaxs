import type { JaxsState, JaxsStoreName } from '.'
import { areEqual } from './equality'
import { JaxsStoreUpdater } from './store-updater'
import { ListUpdater, JaxsStoreListSorter } from './updaters/list'

type JaxsStoreInitializationOptions<T> = {
  name: JaxsStoreName
  parent: JaxsState
  value: T
}

type JaxsStoreDataUpdater<T> = (originalValue: T) => T
export type JaxsStoreUpdateValue<T> = T | JaxsStoreDataUpdater<T>
export type JaxsStoreUpdaterFunction<T> = (value: T, ...args: any[]) => T
export type JaxStoreUpdatersCollection<T> = Record<
  string,
  JaxsStoreUpdaterFunction<T>
>

export class JaxsStore<T> {
  parent: JaxsState
  name: JaxsStoreName
  updater: JaxsStoreUpdater<T>
  _value: T
  initialState: T

  constructor(options: JaxsStoreInitializationOptions<T>) {
    this.name = options.name
    this.parent = options.parent
    this._value = options.value
    this.initialState = structuredClone(options.value)
    this.updater = new JaxsStoreUpdater<typeof options.value>(this)
  }

  get ['value']() {
    return this._value
  }

  set ['value'](value: T) {
    throw new Error('Cannot set value directly. Use an updater!')
  }

  update(updater: JaxsStoreUpdateValue<T>) {
    if (typeof updater === 'function') {
      const newValue = this.getUpdatedValue(updater as JaxsStoreDataUpdater<T>)
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

  getUpdatedValue(updater: JaxsStoreDataUpdater<T>) {
    return updater(this.value)
  }

  addUpdaters(updaters: JaxStoreUpdatersCollection<T>) {
    this.updater.addUpdaterFunctions(updaters)
  }

  addUpdater(name: string, updater: JaxsStoreUpdaterFunction<T>) {
    this.updater.addUpdaterFunction(name, updater)
  }

  addSorter(name: string, sorter: JaxsStoreListSorter<T>) {
    if (!(this.updater instanceof ListUpdater)) return

    this.updater.addSorter(name, sorter)
  }
}
