import type { State } from './state'
import type { Store } from './state/store'
import type { StoreUpdaterBase } from './state/store-updater'
import type { StoreUpdaterBoolean } from './state/updaters/boolean'
import type { StoreUpdaterList } from './state/updaters/list'
import type { StoreUpdaterObject } from './state/updaters/object'
export {
  State,
  Store,
  StoreUpdaterBase,
  StoreUpdaterBoolean,
  StoreUpdaterList,
  StoreUpdaterObject,
}
export type StoreUpdater<T> =
  | StoreUpdaterBase<T>
  | StoreUpdaterObject<T>
  | StoreUpdaterBoolean
  | StoreUpdaterList<T>
// DOM & Jax & Jsx
export type TextValue = string | number
export interface JsxIded {
  __jsx?: string
}
export type JsxChangeId = {
  element: JaxsNode
  index: number
}
export type EventMap = {
  domEvent: string
  busEvent: string
  listener: EventListener
}
export type TagEventMaps = Record<string, EventMap>
interface JsxEventMapped {
  eventMaps: TagEventMaps
}
export type JaxsElement = Element & JsxIded & JsxEventMapped
export type JaxsText = Text & JsxIded
export type JaxsSvgElement = SVGElement & JsxIded
export type JaxsNode = JaxsElement | JaxsText | JaxsSvgElement
export type JaxsNodes = JaxsNode[] | NodeListOf<JaxsNode>
export type JaxsInput = HTMLInputElement & JsxIded & JsxEventMapped

type NullValues = null | undefined
export type ReactSourceObject = {
  fileName: string
  lineNumber: string
  columnNumber: string
}
interface SourceMap {
  __source?: ReactSourceObject
}
export type Props<T> = Partial<{
  __source: ReactSourceObject
  children: JsxCollection
}> &
  T
export type PropValue =
  | TextValue
  | NullValues
  | boolean
  | ReactSourceObject
  | JsxCollection
export type TagAttributes = SourceMap & Record<string, string>
export type TagEventAttributes = Record<string, string>
export type TagAttributesAndEvents = {
  attributes: TagAttributes
  events: TagEventAttributes
}

// Message bus types
export type DomPublish = (eventName: string, domEvent: Event) => void
export type Subscribe = (
  matcher: JaxsBusEventMatcher,
  listener: JaxsBusListener<any>,
) => void

// jsx and rendering
export type RenderKit = {
  document: Document
  window: Window
  publish: DomPublish
  subscribe: Subscribe
  state: State
  parent?: JaxsNode | null
}

export interface Renderable {
  render: (renderKit: RenderKit, parentElement?: JaxsElement) => JaxsNode[]
  isSvg: boolean
}
export type StaticTemplate = () => Renderable
export type TypedTemplate<T> = (props: Props<T>) => Renderable
export type JaxsTemplate<T> = StaticTemplate | TypedTemplate<T>
export type JsxCollection = (Renderable | TextValue)[]

// Change instructions and change compilation
export enum ChangeInstructionTypes {
  removeNode,
  insertNode, // can be to move an existing element in the dom, or to add one
  replaceNode,
  removeAttribute,
  addAttribute,
  updateAttribute,
  removeEvent,
  addEvent,
  updateEvent,
  changeValue,
  changeText,
}

export type RemoveInstructionData = {
  name: string
  isSvg?: boolean
}

export type AttributeInstructionData = {
  name: string
  value: string
  isSvg?: boolean
}

export type EventInstructionData = {
  name: string
  value: EventListener
}

export type UpdateEventInstructionData = {
  name: string
  sourceValue: EventListener
  targetValue: EventListener
}

export type InsertNodeData = {
  parent: JaxsElement
  index: number
}

type NullData = Record<string, never>

export type InstructionData =
  | RemoveInstructionData
  | AttributeInstructionData
  | EventInstructionData
  | UpdateEventInstructionData
  | InsertNodeData
  | NullData

export type ChangeInstruction = {
  source: JaxsNode
  target: JaxsNode
  type: ChangeInstructionTypes
  data: InstructionData
}

export type ChangeInstructions = Array<ChangeInstruction>

export type InstructionsUpdater = (instruction: ChangeInstruction) => void

// --- BIND
export type StoreValue =
  | string
  | number
  | boolean
  | null
  | StoreValue[]
  | { [key: string]: StoreValue }

// TODO: figure out how to tie the
// subscriptions to the store keys, and the view model to the store keys

// type StoreMap<SUBSCRIPTIONS> = {
//   [key in keyof SUBSCRIPTIONS]: StoreValue
// }
export type StoreMap = {
  [key: string]: StoreValue
}

export type JaxsViewModel<ATTRIBUTES, STORE_MAP> = (
  storeMap: STORE_MAP,
) => Partial<ATTRIBUTES>
export type BindSubscriptionList = string[]

export type BindParams<T, U> = {
  Template: JaxsTemplate<T>
  viewModel?: JaxsViewModel<T, U>
  subscriptions?: BindSubscriptionList
}

// BUS
export type AppAdditionListenerOptions = {
  state: State
  document: Document
  window: Window
}
export type DefaultBusListenerOptions<T> = {
  publish: JaxsPublishFunction<T>
  eventName: string
}
export type JaxsBusOptions = AppAdditionListenerOptions &
  DefaultBusListenerOptions<any>

export type JaxsPublishFunction<T> = (event: string, payload: T) => void
export type JaxsBusListener<T> = (
  payload: T,
  listenerKit: JaxsBusOptions,
) => void
export type JaxsBusEventMatcher = string | RegExp

export type ExactSubscriptionData<T> = {
  listener: JaxsBusListener<T>
  index: number
  matcher: string
}

export type FuzzySubscriptionData<T> = {
  listener: JaxsBusListener<T>
  index: number
  matcher: RegExp
}

export type Unsubscribe = () => void

export type CreateAppBuilderArguments = {
  window?: Window
  document?: Document
}

export type RouteState = {
  host: string
  path: string
  query: Record<string, string>
}

export type AttributesWithChildren<T> = Props<T> & { children?: JsxCollection }

export type DiffPair = {
  source: JaxsNode
  target: JaxsNode
}

export type CompileChildren = (
  sourceList: JaxsNodes,
  targetList: JaxsNodes,
  parent: JaxsElement,
) => ChangeInstructions

export type JaxsStatePublisher = (event: string, payload: any) => void
export type JaxsStateTransactionUpdater = (
  collection: JaxsStoresCollection,
) => void
export type JaxsStoreName = string

export type JaxsStoresCollection = Record<string, Store<any>>

export type JaxsStoreInitializationOptions<T> = {
  name: JaxsStoreName
  parent: State
  value: T
}

export type JaxsStoreDataUpdater<T> = (originalValue: T) => T
export type UpdaterValue<T> = boolean | T | T[]
export type JaxsStoreUpdateValue<T> = UpdaterValue<T> | JaxsStoreDataUpdater<T>
export type JaxsStoreUpdaterFunction<T> = (
  value: UpdaterValue<T>,
  ...args: any[]
) => T
export type JaxStoreUpdatersCollection<T> = Record<
  string,
  JaxsStoreUpdaterFunction<T>
>
export type JaxsStoreListSorter<T> = (left: T, right: T) => number
