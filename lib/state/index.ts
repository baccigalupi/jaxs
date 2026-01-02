import { Store } from './store'
import type {
  Publish,
  StateTransactionUpdater,
  StoresCollection,
} from '../types'

export const eventName = 'state'

export class State {
  publisher: Publish<any>
  stores: StoresCollection
  eventNamePrefix: string
  notifications: Set<string>
  inTransaction: boolean

  constructor(publisher: Publish<any>) {
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

export const createState = (publisher: Publish<any>) => {
  return new State(publisher)
}

export { Store }
