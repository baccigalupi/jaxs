export { ArrayModifiers } from './state/updaters/array'
export { BooleanStore } from './state/updaters/boolean'
export { ListStore } from './state/updaters/list'
export { RecordStore } from './state/updaters/object'

export { jsx } from './rendering/jsx'
export { createApp } from './app/builder'
export { bind } from './rendering/templates/bound'
export { routedView } from './app/routed-view'

// Commonly used types exported directly
export type {
  App,
  Props,
  Store,
  State,
  Renderable,
  Template,
  StaticTemplate,
  TypedTemplate,
  RouteState,
  RenderedRoute,
  RouteMatcher,
  BusListener,
  Publish,
  Subscribe,
} from './types'

// All types available via namespace
export * as JaxsTypes from './types'

// Module namespaces
export * as navigation from './navigation'
export * as appBuilding from './app'
export * as messageBus from './bus'
export * as state from './state'
export * as routing from './app/routing'

// Different export attempt to make these more intuitive

export { Is } from './state/is'
export { Equality } from './state/equality'
