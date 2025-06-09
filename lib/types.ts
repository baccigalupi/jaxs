import type { State } from './state'
import type { Store } from './state/store'
import type { StoreUpdaterBase } from './state/store-updater'
import type { StoreUpdaterBoolean } from './state/updaters/boolean'
import type { StoreUpdaterList } from './state/updaters/list'
import type { StoreUpdaterObject } from './state/updaters/object'
export type { App } from './app/index'
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
  | StoreUpdaterObject<T extends object ? T : never>
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
export type EventMaps = Record<string, EventMap>
interface JsxEventMapped {
  eventMaps: EventMaps
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
  matcher: BusEventMatcher,
  listener: BusListener<any>,
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
}
export type StaticTemplate = () => Renderable
export type TypedTemplate<T> = (props: Props<T>) => Renderable
export type Template<T> = StaticTemplate | TypedTemplate<T>
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

type NullInstructionData = Record<string, never>

export type InstructionData =
  | RemoveInstructionData
  | AttributeInstructionData
  | EventInstructionData
  | UpdateEventInstructionData
  | InsertNodeData
  | NullInstructionData

export type ChangeInstruction = {
  source: JaxsNode
  target: JaxsNode
  type: ChangeInstructionTypes
  data: InstructionData
}

export type ChangeInstructions = Array<ChangeInstruction>

export type InstructionsUpdater = (instruction: ChangeInstruction) => void

export type StoreMap = {
  [key: string]: any
}

export type ViewModel<ATTRIBUTES, STORE_MAP> = (
  storeMap: STORE_MAP,
) => Partial<ATTRIBUTES>
export type BindSubscriptionList = string[]

export type BindParams<T, U> = {
  Template: Template<T>
  viewModel?: ViewModel<T, U>
  subscriptions?: BindSubscriptionList
}

// BUS
export type AppAdditionListenerOptions = {
  state: State
  document: Document
  window: Window
}
export type DefaultBusListenerOptions = {
  publish: PublishFunction
  eventName: string
}
export type ListenerKit = AppAdditionListenerOptions & DefaultBusListenerOptions
// this type name, but progressively.

export type PublishFunction = (event: string, payload: any) => void
export type BusListener<T> = (payload: T, listenerKit: ListenerKit) => void
export type BusEventMatcher = string | RegExp

export type ExactSubscriptionData<T> = {
  listener: BusListener<T>
  index: number
  matcher: string
}

export type FuzzySubscriptionData<T> = {
  listener: BusListener<T>
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

export type StatePublisher = (event: string, payload: any) => void
export type StateTransactionUpdater = (collection: StoresCollection) => void

export type StoresCollection = Record<string, Store<any>>

export type StoreInitializationOptions<T> = {
  name: string
  parent: State
  value: T
}

export type StoreDataUpdater<T> = (originalValue: T) => T
export type UpdaterValue<T> = boolean | T | T[]
export type StoreUpdaterOrValue<T> = UpdaterValue<T> | StoreDataUpdater<T>
export type StoreListSorterFunction<T> = (left: T, right: T) => number

export type RouteMatcher = (routeState: RouteState) => boolean
export type RenderedRoute = {
  Partial: StaticTemplate
  match: RouteMatcher
}

export interface PeriodicPublisher {
  event: string
  publish: PublishFunction
  payload?: any
  start: () => void
  stop: () => void
}

export type RequiredPeriodicPublisherOptions = {
  event: string
  publish: PublishFunction
  payload?: any
}
export type GeneralPeriodicOptions = {
  period: number
  offset?: number
}
export type CustomPeriodicOptions = {
  timer: PeriodicTimerFunction
}
export type GeneralPeriodicPublisherOptions = RequiredPeriodicPublisherOptions &
  GeneralPeriodicOptions
export type CustomPeriodicPublisherOptions = RequiredPeriodicPublisherOptions &
  CustomPeriodicOptions

export type PublishPeriodicallyOptions =
  | GeneralPeriodicPublisherOptions
  | CustomPeriodicPublisherOptions

export type PeriodicTimerFunctionOptions = {
  timeDiff: number
  callCount: number
  stop: () => void
}
export type PeriodicTimerFunction = (
  options: PeriodicTimerFunctionOptions,
) => number
