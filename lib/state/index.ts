import { JaxsStore } from './store'
import { BooleanUpdater } from './updaters/boolean'
import { ListUpdater } from './updaters/list'
import { ObjectUpdater } from './updaters/object'
import type {
  JaxsStatePublisher,
  JaxsStateTransactionUpdater,
  JaxsStoreName,
  JaxsStoresCollection,
  StoreValue,
} from '../types'

export const eventName = 'state'

export class JaxsState {
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
    const store = new JaxsStore<T>({
      name,
      parent: this,
      value: initialState,
    })

    this.stores[name] = store

    return store
  }

  createBoolean(name: JaxsStoreName, initialState: boolean) {
    const store = this.create(name, initialState)
    store.updater = new BooleanUpdater(store)
    return store
  }

  createRecord<T>(name: JaxsStoreName, initialState: T) {
    const store = this.create(name, initialState)
    store.updater = new ObjectUpdater<T>(store)
    return store
  }

  createList<T>(name: JaxsStoreName, initialState: T[]) {
    const store = this.create(name, initialState)
    store.updater = new ListUpdater<T>(store)
    return store
  }

  store(name: JaxsStoreName): JaxsStore<any> {
    return (
      this.stores[name] ||
      new JaxsStore({
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
  return new JaxsState(publisher)
}

export { JaxsStore, BooleanUpdater, ListUpdater, ObjectUpdater }
