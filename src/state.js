import {
  isArray,
  isObject,
  isBoolean,
  isNumber,
  isString
} from './state/testingTypes'

import {
  GeneralStore,
  ListStore,
  NumericStore,
  BooleanStore,
  StringStore,
  RecordStore
} from './state/stores'

const eventPrefix = 'state-change'
export const eventName = (name) => `${eventPrefix}:${name}`

export class State {
  constructor (publish) {
    this.publisher = publish
    this.stores = {}
    this.events = []
    this.transacting = false
  }

  create (name, value) {
    const StoreClass = this.storeTypeFor(value)
    const store = new StoreClass({ name, value, parent: this })
    this.addStore(name, store)
  }

  add (store) {
    const name = store.name
    this.addStore(name, store)
  }

  getStore (name) {
    return this.stores[name]
  }

  addStore (name, store) {
    this.stores[name] = store
    this[name] = store
  }

  storeTypeFor (value) {
    if (isArray(value)) return ListStore
    if (isObject(value)) return RecordStore
    if (isNumber(value)) return NumericStore
    if (isBoolean(value)) return BooleanStore
    if (isString(value)) return StringStore

    return GeneralStore
  }

  publish (event) {
    this.events.push(event)
    if (!this.transacting) this.publishAll()
  }

  publishAll () {
    const publishedStores = []
    this.events.reverse().forEach((event) => {
      const { name, value } = event
      if (!publishedStores.includes(name)) {
        publishedStores.push(name)
        this.publisher(`${eventPrefix}:${name}`, value)
      }
    })
    this.events = []
  }

  transaction (setter) {
    this.transacting = true
    setter(this)
    this.transacting = false
    this.publishAll()
  }

  value () {
    return Object.keys(this.stores).reduce((valueObject, key) => {
      valueObject[key] = this.stores[key].value
      return valueObject
    }, {})
  }
}
