import {
  StoreListSorterFunction,
  Store,
  StoreUpdaterOrValue,
} from '../../types'
import { remove, removeBy, insertAt, appendIfUnique } from './array'
export class StoreUpdaterList<T> {
  store: Store<T[]>

  constructor(store: Store<T[]>) {
    this.store = store
  }

  private update(updater: StoreUpdaterOrValue<T[]>) {
    this.store.update(updater)
  }

  private get value() {
    return this.store.value
  }

  reset() {
    this.store.update(this.store.initialValue)
  }

  push(element: T) {
    const value = this.value
    value.push(element)
    this.update(value)
  }

  pop() {
    const list = this.value
    const poppedValue = list.pop()
    this.update(list)
    return poppedValue
  }

  unshift(element: T) {
    const value = this.value
    value.unshift(element)
    this.update(value)
  }

  shift() {
    const list = this.value
    const shiftedValue = list.shift()
    this.update(list)
    return shiftedValue
  }

  sortBy(sorter: StoreListSorterFunction<T>) {
    const list = this.value
    list.sort(sorter)
    this.update(list)
  }

  insertAt(index: number, item: T) {
    const list = this.value
    insertAt(list, index, item)
    this.update(list)
  }

  remove(value: T) {
    const list = remove(this.value, value)
    this.update(list)
  }

  removeBy(matcherFunction: (value: T) => boolean) {
    const list = removeBy(this.value, matcherFunction)
    this.update(list)
  }

  includes(value: T) {
    return this.value.includes(value)
  }

  appendIfUnique(item: T) {
    const list = this.value
    appendIfUnique(list, item)
    this.update(list)
  }
}

export const listUpdater = <T>(store: Store<T[]>) =>
  new StoreUpdaterList<T>(store)

export const ListStore = {
  push: <T>(store: Store<T[]>, element: T) => listUpdater(store).push(element),
  pop: <T>(store: Store<T[]>) => listUpdater(store).pop(),
  unshift: <T>(store: Store<T[]>, element: T) =>
    listUpdater(store).unshift(element),
  shift: <T>(store: Store<T[]>) => listUpdater(store).shift(),
  sortBy: <T>(store: Store<T[]>, sorter: StoreListSorterFunction<T>) =>
    listUpdater(store).sortBy(sorter),
  insertAt: <T>(store: Store<T[]>, index: number, item: T) =>
    listUpdater(store).insertAt(index, item),
  remove: <T>(store: Store<T[]>, value: T) => listUpdater(store).remove(value),
  removeBy: <T>(store: Store<T[]>, matcherFunction: (value: T) => boolean) =>
    listUpdater(store).removeBy(matcherFunction),
  reset: <T>(store: Store<T[]>) => listUpdater(store).reset(),
  includes: <T>(store: Store<T[]>, value: T) =>
    listUpdater(store).includes(value),
  appendIfUnique: <T>(store: Store<T[]>, item: T) =>
    listUpdater(store).appendIfUnique(item),
}
