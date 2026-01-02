import type { State } from './state'
import type { Store } from './state/store'
import type { StoreUpdaterBoolean } from './state/updaters/boolean'
import type { StoreUpdaterList } from './state/updaters/list'
import type { StoreUpdaterObject } from './state/updaters/object'
export type { App } from './app/index'
export {
  State,
  Store,
  StoreUpdaterBoolean,
  StoreUpdaterList,
  StoreUpdaterObject,
}

export * from './types/jsx'
export * from './types/rendering'
export * from './types/rerendering'
export * from './types/message-bus'
export * from './types/routing'

export type StoreUpdater<T> =
  | StoreUpdaterObject<T extends object ? T : never>
  | StoreUpdaterBoolean
  | StoreUpdaterList<T>

export type CreateAppBuilderArguments = {
  window?: Window
  document?: Document
}
