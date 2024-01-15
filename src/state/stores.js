import { areElementEqual, areArraysEqual, areObjectsEqual } from './equality'

export class GeneralStore {
  nullEvent = {}

  constructor ({ name, value, parent }) {
    this.name = name
    this.value = value
    this.parent = parent
    this.initialState = value
  }

  update (newValue) {
    if (this.isEqual(newValue)) return

    this.value = newValue
    return this.parent.publish(this.event())
  }

  reset () {
    this.update(this.initialState)
  }

  isEqual (newValue) {
    return areElementEqual(this.value, newValue)
  }

  event () {
    return {
      name: this.name,
      value: this.value
    }
  }
}

export class BooleanStore extends GeneralStore {
  toggle () {
    this.update(!this.value)
  }
}

export class NumericStore extends GeneralStore {
}

export class StringStore extends GeneralStore {
}

export class ListStore extends GeneralStore {
  isEqual (newValue) {
    return areArraysEqual(this.value, newValue)
  }

  push (newValue) {
    const value = [...this.value, newValue]
    this.update(value)
  }
}

export class RecordStore extends GeneralStore {
  isEqual (newValue) {
    return areObjectsEqual(this.value, newValue)
  }
}
