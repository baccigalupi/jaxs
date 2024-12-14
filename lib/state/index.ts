import { Store } from './store'
import { StoreUpdaterBoolean } from './updaters/boolean'
import { StoreUpdaterList } from './updaters/list'
import { StoreUpdaterObject } from './updaters/object'
import type {
  StatePublisher,
  StateTransactionUpdater,
  StoresCollection,
} from '../types'
import { updaters } from './updaters'

export const eventName = 'state'

export class State {
  publisher: StatePublisher
  stores: StoresCollection
  eventNamePrefix: string
  notifications: Set<string>
  inTransaction: boolean

  constructor(publisher: StatePublisher) {
    this.publisher = publisher
    this.stores = {}
    this.eventNamePrefix = eventName
    this.notifications = new Set()
    this.inTransaction = false
  }

  create<T>(name: string, initialState: T) {
    const store = new Store<T>({
      name,
      parent: this,
      value: initialState,
    })

    this.stores[name] = store

    return store
  }

  createBoolean(name: string, initialState: boolean) {
    const store = this.create(name, initialState)
    store.updater = new StoreUpdaterBoolean(store)
    return store
  }

  createRecord<T>(name: string, initialState: T) {
    const store = this.create(name, initialState)
    store.updater = new StoreUpdaterObject<T>(store)
    return store
  }

  createList<T>(name: string, initialState: T[]) {
    const store = this.create(name, initialState)
    store.updater = new StoreUpdaterList<T>(store)
    return store
  }

  store<T>(name: string): Store<T> {
    return (
      this.stores[name] ||
      new Store({
        name,
        parent: this,
        value: undefined,
      })
    )
  }

  get<T>(name: string): T {
    return this.store(name).value as T
  }

  getAll(names: string[]) {
    return names.reduce((collection, name) => {
      collection[name] = this.get(name)
      return collection
    }, {})
  }

  notify(name: string) {
    if (this.inTransaction) {
      this.notifications.add(name)
    } else {
      this.publish(name)
    }
  }

  update(name: string, newValue: any) {
    this.store(name).update(newValue)
  }

  transaction(updater: StateTransactionUpdater) {
    this.inTransaction = true
    updater(this.stores)
    this.inTransaction = false
    this.publishAll()
  }

  publishAll() {
    this.notifications.forEach((name: string) => {
      this.publish(name)
    })
    this.notifications.clear()
  }

  publish(name: string) {
    this.publisher(this.event(name), {
      state: this,
      store: this.store(name),
    })
  }

  event(name: string) {
    return `${this.eventNamePrefix}:${name}`
  }
}

export const createState = (publisher: StatePublisher) => {
  return new State(publisher)
}

export { Store, updaters }
