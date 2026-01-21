import { PublishFromDom } from '.'
import { State as State_2 } from '.'
import { Store as Store_2 } from '.'
import { Subscribe as Subscribe_2 } from '.'

export declare class App {
  window: Window
  document: Document
  publish: PublishExtended<any>
  subscribe: Subscribe
  bus: JaxsBus
  state: State
  renderKit: RenderKit
  roots: Root[]
  constructor({
    window,
    document,
    publish,
    subscribe,
    bus,
    state,
    renderKit,
  }: {
    window: any
    document: any
    publish: any
    subscribe: any
    bus: any
    state: any
    renderKit: any
  })
  render(template: Renderable, selector: string): Root
  startNavigation(): void
}

declare type AppAdditionListenerOptions = {
  state: State_2
  document: Document
  window: Window
}

export declare namespace appBuilding {
  export { App }
}

export declare const ArrayModifiers: {
  remove: <T>(originalCollection: T[], itemToRemove: T) => T[]
  removeBy: <T>(
    originalCollection: T[],
    matcherFunction: (value: T) => boolean,
  ) => T[]
  insertAt: <T>(originalCollection: T[], index: number, item: T) => T[]
  appendIfUnique: <T>(originalCollection: T[], item: T) => T[]
  push: <T>(array: T[], item: T) => number
  pop: <T>(array: T[]) => T
  unshift: <T>(array: T[], item: T) => number
  shift: <T>(array: T[]) => T
  sortBy: <T>(array: T[], sorter: (a: T, b: T) => number) => T[]
  includes: <T>(array: T[], item: T) => boolean
}

declare type AttributeInstructionData = {
  name: string
  value: string
  isSvg?: boolean
}

export declare const bind: <ATTRIBUTES, STATE_MAP>({
  Template,
  viewModel,
  subscriptions,
}: BindParams<ATTRIBUTES, STATE_MAP>) => (
  attributes: Partial<Props<ATTRIBUTES>>,
) => Bound<unknown, unknown>

declare type BindParams<T, U> = {
  Template: Template<T>
  viewModel?: ViewModel<T, U>
  subscriptions?: BindSubscriptionList
}

declare type BindSubscriptionList = string[]

export declare const BooleanStore: {
  toggle: (store: Store<boolean>) => void
  setTrue: (store: Store<boolean>) => void
  setFalse: (store: Store<boolean>) => void
  reset: (store: Store<boolean>) => void
  isTrue: (store: Store<boolean>) => boolean
  isFalse: (store: Store<boolean>) => boolean
}

declare class Bound<ATTRIBUTES, STATE_MAP> {
  Template: Template<ATTRIBUTES>
  viewModel: ViewModel<ATTRIBUTES, STATE_MAP>
  attributes: Partial<Props<ATTRIBUTES>>
  subscriptions: BindSubscriptionList
  dom: JaxsNode[]
  parentElement: JaxsElement | null
  renderKit?: RenderKit
  constructor({
    Template,
    subscriptions,
    attributes,
    viewModel,
  }: {
    Template: any
    subscriptions: any
    attributes: any
    viewModel: any
  })
  render(renderKit: RenderKit): JaxsNode[]
  generateDom(renderKit: RenderKit): JaxsNode[]
  rerender(): void
  subscribeForRerender(): void
  eventName(storeName: string): string
}

declare const buildRouter: (
  pages: RenderedRoute[],
) => ({ route }: { route: any }) => StaticTemplate

declare type BusEventMatcher = string | RegExp

export declare type BusListener<T> = (listenerKit: ListenerKit<T>) => void

declare const catchAll: RouteMatcher

declare type ChangeInstruction = {
  source: JaxsNode
  target: JaxsNode
  type: ChangeInstructionTypes
  data: InstructionData
}

declare type ChangeInstructions = Array<ChangeInstruction>

declare enum ChangeInstructionTypes {
  removeNode = 0,
  insertNode = 1, // can be to move an existing element in the dom, or to add one
  replaceNode = 2,
  removeAttribute = 3,
  addAttribute = 4,
  updateAttribute = 5,
  removeEvent = 6,
  addEvent = 7,
  updateEvent = 8,
  changeValue = 9,
  changeText = 10,
}

declare class Children implements Renderable {
  collection: Renderable[]
  parentElement?: JaxsElement
  constructor(jsxChildren: RenderableCollection)
  render(renderKit: RenderKit, parentElement?: JaxsElement): JaxsNode[]
  generateDom(renderKit: RenderKit): JaxsNode[]
  attachToParent(dom: JaxsNodes): void
}

declare type CompileChildren = (
  sourceList: JaxsNodes,
  targetList: JaxsNodes,
  parent: JaxsElement,
) => ChangeInstructions

export declare const createApp: (
  domEnvironment?: CreateAppBuilderArguments,
) => App

declare type CreateAppBuilderArguments = {
  window?: Window
  document?: Document
}

declare const createBus: () => {
  bus: JaxsBus
  publish: PublishExtended<any>
  subscribe: (
    matcher: BusEventMatcher,
    listener: BusListener<any>,
  ) => Unsubscribe
}

declare const createRouteState: (state: State) => void

declare const createState: (publisher: PublishExtended<any>) => State

declare type CustomPeriodicOptions = {
  timer: PeriodicTimerFunction
}

declare type CustomPeriodicPublisherOptions<T> =
  RequiredPeriodicPublisherOptions<T> & CustomPeriodicOptions

declare type DiffPair = {
  source: JaxsNode
  target: JaxsNode
}

export declare const Equality: {
  objects: (oldValue: Object_2, newValue: Object_2) => any
  arrays: (oldValue: any[], newValue: any[]) => any
  equal: (oldValue: any, newValue: any) => any
}

declare type EventInstructionData = {
  name: string
  value: EventListener
}

declare type EventMap = {
  domEvent: string
  busEvent: string
  listener: EventListener
}

declare type EventMaps = Record<string, EventMap>

declare const eventName = 'state'

declare namespace events {
  export {
    linkNavigationEvent,
    navigationEvent,
    locationChangeEvent,
    routeChangeEvent,
  }
}

declare const exactPathMatch: (exactPath: string) => RouteMatcher

declare type ExactSubscriptionData<T> = {
  listener: BusListener<T>
  index: number
  matcher: string
}

declare class ExactSubscriptions {
  lookup: Record<string, ExactSubscriptionData<any>[]>
  constructor()
  add<T>(matcher: string, listener: BusListener<T>, index: number): Unsubscribe
  remove<T>(subscription: ExactSubscriptionData<T>): void
  matches(event: string): ExactSubscriptionData<any>[]
  ensureArrayFor(matcher: string): void
}

declare const extractQueryParams: (queryString: string) => {}

declare const findHref: (node: HTMLElement) => string

declare type FuzzySubscriptionData<T> = {
  listener: BusListener<T>
  index: number
  matcher: RegExp
}

declare class FuzzySubscriptions {
  lookup: FuzzySubscriptionData<any>[]
  constructor()
  add<T>(matcher: RegExp, listener: BusListener<T>, index: number): Unsubscribe
  remove<T>(subscription: FuzzySubscriptionData<T>): void
  matches(event: string): FuzzySubscriptionData<any>[]
}

declare type InsertNodeData = {
  parent: JaxsElement
  index: number
}

declare type InstructionData =
  | RemoveInstructionData
  | AttributeInstructionData
  | EventInstructionData
  | UpdateEventInstructionData
  | InsertNodeData
  | NullInstructionData

declare type InstructionsUpdater = (instruction: ChangeInstruction) => void

export declare const Is: {
  boolean: (value: any) => value is boolean
  number: (value: any) => value is number
  string: (value: any) => value is string
  array: (value: any) => value is any[]
  object: (value: any) => boolean
}

declare class JaxsBus {
  options?: AppAdditionListenerOptions
  exactSubscriptions: ExactSubscriptions
  fuzzySubscriptions: FuzzySubscriptions
  currentIndex: number
  constructor()
  subscribe<T>(matcher: BusEventMatcher, listener: BusListener<T>): Unsubscribe
  publish<T>(event: string, payload: T): void
  addListenerOptions(options: AppAdditionListenerOptions): void
  listenerOptions<T>(
    event: string,
    payload: T,
  ): {
    publish: any
    payload: T
    state: State
    document: Document
    window: Window
    eventName: string
  }
}

declare type JaxsElement = Element & JsxIded & JsxEventMapped

declare type JaxsInput = HTMLInputElement & JsxIded & JsxEventMapped

declare type JaxsNode = JaxsElement | JaxsText | JaxsSvgElement

declare type JaxsNodes = JaxsNode[] | NodeListOf<JaxsNode>

declare type JaxsSvgElement = SVGElement & JsxIded

declare type JaxsText = Text & JsxIded

export declare namespace JaxsTypes {
  export {
    App,
    State,
    Store,
    StoreUpdaterBoolean,
    StoreUpdaterList,
    StoreUpdaterObject,
    StoreUpdater,
    CreateAppBuilderArguments,
    TextValue,
    JsxIded,
    JsxChangeId,
    EventMap,
    EventMaps,
    JaxsElement,
    JaxsText,
    JaxsSvgElement,
    JaxsNode,
    JaxsNodes,
    JaxsInput,
    ReactSourceObject,
    Props,
    PropValue,
    TagAttributes,
    TagEventAttributes,
    TagAttributesAndEvents,
    RenderKit,
    Renderable,
    StaticTemplate,
    TypedTemplate,
    Template,
    RenderableCollection,
    StoreMap,
    ViewModel,
    BindSubscriptionList,
    BindParams,
    ChangeInstructionTypes,
    RemoveInstructionData,
    AttributeInstructionData,
    EventInstructionData,
    UpdateEventInstructionData,
    InsertNodeData,
    InstructionData,
    ChangeInstruction,
    ChangeInstructions,
    InstructionsUpdater,
    DiffPair,
    CompileChildren,
    PublishFromDom_2 as PublishFromDom,
    Subscribe,
    AppAdditionListenerOptions,
    ListenerKit,
    Publish,
    BusListener,
    BusEventMatcher,
    ExactSubscriptionData,
    FuzzySubscriptionData,
    Unsubscribe,
    StateTransactionUpdater,
    StoresCollection,
    StoreInitializationOptions,
    StoreDataUpdater,
    UpdaterValue,
    StoreUpdaterOrValue,
    StoreListSorterFunction,
    PeriodicPublisher,
    RequiredPeriodicPublisherOptions,
    CustomPeriodicOptions,
    CustomPeriodicPublisherOptions,
    PeriodicTimerFunctionOptions,
    PeriodicTimerFunction,
    WithTimeoutOptions,
    PeriodicallyOptions,
    PeriodicallyWithCustomTimerOptions,
    PublishExtended,
    RouteState,
    RouteMatcher,
    RenderedRoute,
  }
}

export declare const jsx: {
  <T>(
    type: string | Template<T>,
    attributes: Props<T>,
    ...children: RenderableCollection
  ): Renderable
  fragment<T>(
    attributes: Props<T>,
    maybeChildren: RenderableCollection,
  ): Children
}

declare type JsxChangeId = {
  element: JaxsNode
  index: number
}

declare interface JsxEventMapped {
  eventMaps: EventMaps
}

declare interface JsxIded {
  __jsx?: string
}

declare const linkNavigationEvent = 'go-to-href'

declare type ListenerKit<T> = {
  state: State_2
  document: Document
  window: Window
  publish: PublishExtended<any>
  eventName: string
  payload: T
}

export declare const ListStore: {
  push: <T>(store: Store<T[]>, element: T) => void
  pop: <T>(store: Store<T[]>) => T
  unshift: <T>(store: Store<T[]>, element: T) => void
  shift: <T>(store: Store<T[]>) => T
  sortBy: <T>(store: Store<T[]>, sorter: StoreListSorterFunction<T>) => void
  insertAt: <T>(store: Store<T[]>, index: number, item: T) => void
  remove: <T>(store: Store<T[]>, value: T) => void
  removeBy: <T>(
    store: Store<T[]>,
    matcherFunction: (value: T) => boolean,
  ) => void
  reset: <T>(store: Store<T[]>) => void
  includes: <T>(store: Store<T[]>, value: T) => boolean
  appendIfUnique: <T>(store: Store<T[]>, item: T) => void
  findBy: <T>(store: Store<T[]>, matcherFunction: (value: T) => boolean) => T
  replace: <T>(store: Store<T[]>, original: T, replacement: T) => void
}

declare const locationChangeEvent = 'navigation:location-change'

export declare namespace messageBus {
  export { createBus, JaxsBus, ExactSubscriptions, FuzzySubscriptions }
}

declare const navigate: ({
  payload: path,
  publish,
  window,
}: ListenerKit<string>) => void

export declare namespace navigation {
  export {
    events,
    extractQueryParams,
    findHref,
    navigate,
    onLinkClick,
    onLocationChange,
    createRouteState,
    start,
  }
}

declare const navigationEvent = 'go-to'

declare type NullInstructionData = Record<string, never>

declare type NullValues = null | undefined

declare type Object_2 = Record<string, any>

declare const onLinkClick: (listenerKit: ListenerKit<MouseEvent>) => void

declare const onLocationChange: (listenerKit: ListenerKit<null>) => void

declare type PeriodicallyOptions<T> = {
  period: number
  payload?: T
  offset?: number
}

declare type PeriodicallyWithCustomTimerOptions<T> = {
  timer: PeriodicTimerFunction
  payload?: T
}

declare interface PeriodicPublisher<T> {
  event: string
  publish: Publish<T>
  payload?: T
  start: () => void
  stop: () => void
}

declare type PeriodicTimerFunction = (
  options: PeriodicTimerFunctionOptions,
) => number

declare type PeriodicTimerFunctionOptions = {
  timeDiff: number
  callCount: number
  stop: () => void
}

export declare type Props<T> = Partial<{
  __source?: ReactSourceObject
  children: RenderableCollection
}> &
  T

declare type PropValue =
  | TextValue
  | NullValues
  | boolean
  | ReactSourceObject
  | RenderableCollection

export declare interface Publish<T> {
  (event: string, payload: T): void
}

declare interface PublishExtended<T> extends Publish<T> {
  withTimeout: <T>(event: string, options: WithTimeoutOptions<T>) => Unsubscribe
  periodically: <T>(
    event: string,
    options: PeriodicallyOptions<T>,
  ) => Unsubscribe
  periodicallyWithCustomTimer: <T>(
    event: string,
    options: PeriodicallyWithCustomTimerOptions<T>,
  ) => Unsubscribe
}

declare type PublishFromDom_2 = PublishExtended<Event>

declare const publishLocation: (app: App) => void

declare type ReactSourceObject = {
  fileName: string
  lineNumber: string
  columnNumber: string
}

export declare const RecordStore: {
  reset: <T>(store: Store<T>) => void
  resetAttribute: <T>(store: Store<T>, name: keyof T) => void
  updateAttribute: <T>(
    store: Store<T>,
    name: keyof T,
    value: T[keyof T],
  ) => void
  updateAttributes: <T>(store: Store<T>, values: Partial<T>) => void
  attributeTruthy: <T>(store: Store<T>, name: keyof T) => boolean
}

declare type RemoveInstructionData = {
  name: string
  isSvg?: boolean
}

export declare interface Renderable {
  render: (renderKit: RenderKit, parentElement?: JaxsElement) => JaxsNode[]
}

declare type RenderableCollection = Renderable[]

export declare type RenderedRoute = {
  Partial: StaticTemplate
  match: RouteMatcher
}

declare type RenderKit = {
  document: Document
  window: Window
  publish: PublishFromDom
  subscribe: Subscribe_2
  state: State_2
  parent?: JaxsNode | null
}

declare type RequiredPeriodicPublisherOptions<T> = {
  event: string
  publish: Publish<T>
  payload?: T
}

declare class Root {
  template: Renderable
  selector: string
  renderKit: RenderKit
  dom: JaxsNodes
  parentElement?: JaxsElement | null
  constructor(template: Renderable, selector: string, renderKit: RenderKit)
  renderAndAttach(renderKit: RenderKit): void
  render(renderKit: RenderKit): JaxsNode[]
  attach(): void
  getParentElement(): Element
}

declare const routeChangeEvent = 'navigation:route-change'

export declare const routedView: (routes: RenderedRoute[]) => (
  attributes: Partial<
    Props<{
      route: RouteState
    }>
  >,
) => Bound<unknown, unknown>

export declare type RouteMatcher = (routeState: RouteState) => boolean

export declare type RouteState = {
  host: string
  path: string
  query: Record<string, string>
}

export declare namespace routing {
  export { exactPathMatch, catchAll, buildRouter }
}

declare interface SourceMap {
  __source?: ReactSourceObject
}

declare namespace start {
  export {
    subscribeToNavigation,
    subscribeToHistoryChange,
    publishLocation,
    startNavigation,
  }
}

declare const startNavigation: (app: App) => void

export declare class State {
  publisher: PublishExtended<any>
  stores: StoresCollection
  eventNamePrefix: string
  notifications: Set<string>
  inTransaction: boolean
  constructor(publisher: PublishExtended<any>)
  create<T>(name: string, initialState: T): Store<T>
  store<T>(name: string): Store<T>
  get<T>(name: string): T
  getAll(names: string[]): {}
  notify(name: string): void
  update(name: string, newValue: any): void
  transaction(updater: StateTransactionUpdater): void
  publishAll(): void
  publish(name: string): void
  event(name: string): string
}

export declare namespace state {
  export { eventName, State, createState, Store }
}

declare type StateTransactionUpdater = (collection: StoresCollection) => void

export declare type StaticTemplate = () => Renderable

export declare class Store<T> {
  parent: State
  name: string
  updater: StoreUpdater<T>
  private _value
  initialValue: T
  constructor(options: StoreInitializationOptions<T>)
  get ['value'](): T
  set ['value'](value: T)
  reset(): void
  update(updater: StoreUpdaterOrValue<T>): void
  private updateValue
  private getUpdatedValue
}

declare type StoreDataUpdater<T> = (originalValue: T) => T

declare type StoreInitializationOptions<T> = {
  name: string
  parent: State_2
  value: T
}

declare type StoreListSorterFunction<T> = (left: T, right: T) => number

declare type StoreMap = {
  [key: string]: any
}

declare type StoresCollection = Record<string, Store_2<any>>

declare type StoreUpdater<T> =
  | StoreUpdaterObject<T extends object ? T : never>
  | StoreUpdaterBoolean
  | StoreUpdaterList<T>

declare class StoreUpdaterBoolean {
  store: Store<boolean>
  constructor(store: Store<boolean>)
  private update
  private get value()
  reset(): void
  toggle(): void
  setTrue(): void
  setFalse(): void
  isTrue(): boolean
  isFalse(): boolean
}

declare class StoreUpdaterList<T> {
  store: Store<T[]>
  constructor(store: Store<T[]>)
  private update
  private get value()
  reset(): void
  push(element: T): void
  pop(): T
  unshift(element: T): void
  shift(): T
  sortBy(sorter: StoreListSorterFunction<T>): void
  insertAt(index: number, item: T): void
  remove(value: T): void
  removeBy(matcherFunction: (value: T) => boolean): void
  includes(value: T): boolean
  appendIfUnique(item: T): void
  findBy(matcherFunction: (value: T) => boolean): T
  replace(original: T, replacement: T): void
}

declare class StoreUpdaterObject<T extends object> {
  store: Store<T>
  constructor(store: Store<T>)
  private update
  private get value()
  reset(): void
  updateAttribute(name: keyof T, value: T[keyof T]): void
  updateDynamicAttribute(name: string, value: any): void
  isKey(key: string): boolean
  isValueType(key: keyof T, value: any): boolean
  resetAttribute(name: keyof T): void
  updateAttributes(values: Partial<T>): void
  attributeTruthy(name: keyof T): boolean
}

declare type StoreUpdaterOrValue<T> = UpdaterValue<T> | StoreDataUpdater<T>

export declare type Subscribe = (
  matcher: BusEventMatcher,
  listener: BusListener<any>,
) => void

declare const subscribeToHistoryChange: (app: App) => void

declare const subscribeToNavigation: (app: App) => void

declare type TagAttributes = SourceMap &
  Record<string, string> & {
    __source?: ReactSourceObject
  }

declare type TagAttributesAndEvents = {
  attributes: TagAttributes
  events: TagEventAttributes
}

declare type TagEventAttributes = Record<string, string>

export declare type Template<T> = StaticTemplate | TypedTemplate<T>

declare type TextValue = string | number

export declare type TypedTemplate<T> = (props: Props<T>) => Renderable

declare type Unsubscribe = () => void

declare type UpdateEventInstructionData = {
  name: string
  sourceValue: EventListener
  targetValue: EventListener
}

declare type UpdaterValue<T> = boolean | T | T[]

declare type ViewModel<ATTRIBUTES, STORE_MAP> = (
  storeMap: STORE_MAP,
) => Partial<ATTRIBUTES>

declare type WithTimeoutOptions<T> = {
  timeout: number
  payload?: T
}

export {}
