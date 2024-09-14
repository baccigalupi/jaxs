import { Store } from './store'
import { StoreUpdaterBoolean } from './updaters/boolean'
import { StoreUpdaterList } from './updaters/list'
import { StoreUpdaterObject } from './updaters/object'
import type {
  JaxsStatePublisher,
  JaxsStateTransactionUpdater,
  JaxsStoreName,
  JaxsStoresCollection,
  StoreValue,
} from '../types'

export const eventName = 'state'

export class State {
  publisher: JaxsStatePublisher
  stores: JaxsStoresCollection
  eventNamePrefix: string
  notifications: Set<JaxsStoreName>
  inTransaction: boolean

  constructor(publisher: JaxsStatePublisher) {
    this.publisher = publisher
    this.stores = {}
    this.eventNamePrefix = eventName
    this.notifications = new Set()
    this.inTransaction = false
  }

  create<T>(name: JaxsStoreName, initialState: T) {
    const store = new Store<T>({
      name,
      parent: this,
      value: initialState,
    })

    this.stores[name] = store

    return store
  }

  createBoolean(name: JaxsStoreName, initialState: boolean) {
    const store = this.create(name, initialState)
    store.updater = new StoreUpdaterBoolean(store)
    return store
  }

  createRecord<T>(name: JaxsStoreName, initialState: T) {
    const store = this.create(name, initialState)
    store.updater = new StoreUpdaterObject<T>(store)
    return store
  }

  createList<T>(name: JaxsStoreName, initialState: T[]) {
    const store = this.create(name, initialState)
    store.updater = new StoreUpdaterList<T>(store)
    return store
  }

  store(name: JaxsStoreName): Store<any> {
    return (
      this.stores[name] ||
      new Store({
        name,
        parent: this,
        value: undefined,
      })
    )
  }

  get(name: JaxsStoreName): StoreValue {
    return this.store(name).value
  }

  getAll(names: JaxsStoreName[]) {
    return names.reduce((collection, name) => {
      collection[name] = this.get(name)
      return collection
    }, {})
  }

  notify(name: JaxsStoreName) {
    if (this.inTransaction) {
      this.notifications.add(name)
    } else {
      this.publish(name)
    }
  }

  update(name: JaxsStoreName, newValue: any) {
    this.store(name).update(newValue)
  }

  transaction(updater: JaxsStateTransactionUpdater) {
    this.inTransaction = true
    updater(this.stores)
    this.inTransaction = false
    this.publishAll()
  }

  publishAll() {
    this.notifications.forEach((name: JaxsStoreName) => {
      this.publish(name)
    })
    this.notifications.clear()
  }

  publish(name: JaxsStoreName) {
    this.publisher(this.event(name), {
      state: this,
      store: this.store(name),
    })
  }

  event(name: JaxsStoreName) {
    return `${this.eventNamePrefix}:${name}`
  }
}

export const createState = (publisher: JaxsStatePublisher) => {
  return new State(publisher)
}

export { Store, StoreUpdaterBoolean, StoreUpdaterList, StoreUpdaterObject }
