import { StoreListSorterFunction, Store } from '../../types'
import { StoreUpdaterBase } from '../store-updater'

export class StoreUpdaterList<T> extends StoreUpdaterBase<T[]> {
  push(element: T) {
    const value = [...this.value, element]
    this.update(value)
  }

  pop() {
    const list = [...this.value]
    const poppedValue = list.pop()
    this.update(list)
    return poppedValue
  }

  unshift(element: T) {
    const value = [element, ...this.value]
    this.update(value)
  }

  shift() {
    const list = [...this.value]
    const shiftedValue = list.shift()
    this.update(list)
    return shiftedValue
  }

  addSorter(name: string, sorter: StoreListSorterFunction<T>) {
    this[name] = () => {
      this.sortBy(sorter)
    }
  }

  sortBy(sorter: StoreListSorterFunction<T>) {
    const list = [...this.value]
    list.sort(sorter)
    this.update(list)
  }

  insertAt(index: number, item: T) {
    const list = [...this.value]
    list.splice(index, 0, item)
    this.update(list)
  }

  remove(value: T) {
    const list = this.value.reduce((collection: T[], item: T) => {
      if (item !== value) collection.push(item)
      return collection
    }, [])
    this.update(list)
  }

  removeBy(matcherFunction: (value: T) => boolean) {
    const list = this.value.reduce((collection: T[], item: T) => {
      if (!matcherFunction(item)) collection.push(item)
      return collection
    }, [])
    this.update(list)
  }
}

export const listUpdater = <T>(store: Store<T[]>) =>
  new StoreUpdaterList<T>(store)
