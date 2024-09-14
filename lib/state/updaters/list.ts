import { JaxsStoreListSorter, JaxsStoreUpdaterFunction } from '../../types'
import { JaxsStoreUpdater } from '../store-updater'

export class ListUpdater<T> extends JaxsStoreUpdater<T[]> {
  addUpdaterFunction(name: string, updater: JaxsStoreUpdaterFunction<T[]>) {
    this.constructor.prototype[name] = (...args: any[]) => {
      const newValue = updater(this.value, ...args)
      this.update(newValue)
    }
  }

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

  addSorter(name: string, sorter: JaxsStoreListSorter<T>) {
    this[name] = () => {
      this.sortBy(sorter)
    }
  }

  sortBy(sorter: JaxsStoreListSorter<T>) {
    const list = [...this.value]
    list.sort(sorter)
    this.update(list)
  }

  insertAt(index: number, item: T) {
    const list = [...this.value]
    list.splice(index, 0, item)
    this.update(list)
  }
}
