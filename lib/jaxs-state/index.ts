import { JaxsStore } from './jaxs-store'
import { BooleanUpdater } from './updaters/boolean'
import { ListUpdater } from './updaters/list'
import { ObjectUpdater } from './updaters/object'
export { JaxsStoreUpdater } from './jaxs-store-updater'

export type JaxsStatePublisher = (event: string, payload: any) => void
export type JaxsStateTransactionUpdater = (
  collection: JaxsStoresCollection,
) => void
export type JaxsStoreName = string

type JaxsStoresCollection = Record<string, JaxsStore<any>>

export const eventName = 'jaxs-state'

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

  create(name: JaxsStoreName, initialState: any) {
    const store = new JaxsStore({
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

  createRecord(name: JaxsStoreName, initialState: Record<string, any>) {
    const store = this.create(name, initialState)
    store.updater = new ObjectUpdater(store)
    return store
  }

  createList(name: JaxsStoreName, initialState: Record<string, any>) {
    const store = this.create(name, initialState)
    store.updater = new ListUpdater(store)
    return store
  }

  store(name: JaxsStoreName) {
    return (
      this.stores[name] ||
      new JaxsStore({
        name,
        parent: this,
        value: undefined,
      })
    )
  }

  get(name: JaxsStoreName) {
    return this.store(name).value
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

export { JaxsStore, BooleanUpdater, ListUpdater, ObjectUpdater }
