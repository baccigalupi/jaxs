declare class App {
  window: Window
  document: Document
  publish: PublishFunction
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
  state: State
  document: Document
  window: Window
}

export declare namespace appBuilding {
  export { App }
}

declare type AttributeInstructionData = {
  name: string
  value: string
  isSvg?: boolean
}

declare type AttributesWithChildren<T> = Props<T> & {
  children?: JsxCollection
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

declare type BusListener<T> = (payload: T, listenerKit: ListenerKit) => void

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
  constructor(jsxChildren: JsxCollection)
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
  publish: (event: string, payload: any) => void
  subscribe: (
    matcher: BusEventMatcher,
    listener: BusListener<any>,
  ) => Unsubscribe
}

declare const createRouteState: (state: State) => void

declare const createState: (publisher: StatePublisher) => State

declare type CustomPeriodicOptions = {
  timer: PeriodicTimerFunction
}

declare type CustomPeriodicPublisherOptions = RequiredPeriodicPublisherOptions &
  CustomPeriodicOptions

declare type DefaultBusListenerOptions = {
  publish: PublishFunction
  eventName: string
}

declare type DiffPair = {
  source: JaxsNode
  target: JaxsNode
}

declare type DomPublish = (eventName: string, domEvent: Event) => void

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

declare type GeneralPeriodicOptions = {
  period: number
  offset?: number
}

declare type GeneralPeriodicPublisherOptions =
  RequiredPeriodicPublisherOptions & GeneralPeriodicOptions

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

declare class JaxsBus {
  options?: AppAdditionListenerOptions
  exactSubscriptions: ExactSubscriptions
  fuzzySubscriptions: FuzzySubscriptions
  currentIndex: number
  constructor()
  subscribe<T>(matcher: BusEventMatcher, listener: BusListener<T>): Unsubscribe
  publish<T>(event: string, payload: T): void
  addListenerOptions(options: AppAdditionListenerOptions): void
  listenerOptions(event: string): ListenerKit
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
    StoreUpdaterBase,
    StoreUpdaterBoolean,
    StoreUpdaterList,
    StoreUpdaterObject,
    StoreUpdater,
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
    DomPublish,
    Subscribe,
    RenderKit,
    Renderable,
    StaticTemplate,
    TypedTemplate,
    Template,
    JsxCollection,
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
    StoreMap,
    ViewModel,
    BindSubscriptionList,
    BindParams,
    AppAdditionListenerOptions,
    DefaultBusListenerOptions,
    ListenerKit,
    PublishFunction,
    BusListener,
    BusEventMatcher,
    ExactSubscriptionData,
    FuzzySubscriptionData,
    Unsubscribe,
    CreateAppBuilderArguments,
    RouteState,
    AttributesWithChildren,
    DiffPair,
    CompileChildren,
    StatePublisher,
    StateTransactionUpdater,
    StoresCollection,
    StoreInitializationOptions,
    StoreDataUpdater,
    UpdaterValue,
    StoreUpdaterOrValue,
    StoreListSorterFunction,
    RouteMatcher,
    RenderedRoute,
    PeriodicPublisher,
    RequiredPeriodicPublisherOptions,
    GeneralPeriodicOptions,
    CustomPeriodicOptions,
    GeneralPeriodicPublisherOptions,
    CustomPeriodicPublisherOptions,
    PublishPeriodicallyOptions,
    PeriodicTimerFunctionOptions,
    PeriodicTimerFunction,
  }
}

export declare const jsx: {
  <T>(
    type: string | Template<T>,
    attributes: Props<T>,
    ...children: JsxCollection
  ): Renderable
  fragment<T>(attributes: Props<T>, maybeChildren: JsxCollection): Children
}

declare type JsxChangeId = {
  element: JaxsNode
  index: number
}

declare type JsxCollection = (Renderable | TextValue)[]

declare interface JsxEventMapped {
  eventMaps: EventMaps
}

declare interface JsxIded {
  __jsx?: string
}

declare const linkNavigationEvent = 'go-to-href'

declare type ListenerKit = AppAdditionListenerOptions &
  DefaultBusListenerOptions

declare const locationChangeEvent = 'navigation:location-change'

export declare namespace messageBus {
  export {
    createBus,
    JaxsBus,
    ExactSubscriptions,
    FuzzySubscriptions,
    publishPeriodically,
  }
}

declare const navigate: (path: string, { publish, window }: ListenerKit) => void

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

declare const onLinkClick: (domEvent: MouseEvent, options: ListenerKit) => void

declare const onLocationChange: (_: null, listenerOptions: ListenerKit) => void

declare interface PeriodicPublisher {
  event: string
  publish: PublishFunction
  payload?: any
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

declare type Props<T> = Partial<{
  __source: ReactSourceObject
  children: JsxCollection
}> &
  T

declare type PropValue =
  | TextValue
  | NullValues
  | boolean
  | ReactSourceObject
  | JsxCollection

declare type PublishFunction = (event: string, payload: any) => void

declare const publishLocation: (app: App) => void

declare const publishPeriodically: (
  options: PublishPeriodicallyOptions,
) => () => void

declare type PublishPeriodicallyOptions =
  | GeneralPeriodicPublisherOptions
  | CustomPeriodicPublisherOptions

declare type ReactSourceObject = {
  fileName: string
  lineNumber: string
  columnNumber: string
}

declare type RemoveInstructionData = {
  name: string
  isSvg?: boolean
}

declare interface Renderable {
  render: (renderKit: RenderKit, parentElement?: JaxsElement) => JaxsNode[]
}

declare type RenderedRoute = {
  Partial: StaticTemplate
  match: RouteMatcher
}

declare type RenderKit = {
  document: Document
  window: Window
  publish: DomPublish
  subscribe: Subscribe
  state: State
  parent?: JaxsNode | null
}

declare type RequiredPeriodicPublisherOptions = {
  event: string
  publish: PublishFunction
  payload?: any
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

declare type RouteMatcher = (routeState: RouteState) => boolean

declare type RouteState = {
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

declare class State {
  publisher: StatePublisher
  stores: StoresCollection
  eventNamePrefix: string
  notifications: Set<string>
  inTransaction: boolean
  constructor(publisher: StatePublisher)
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
  export { eventName, State, createState, Store, updaters }
}

declare type StatePublisher = (event: string, payload: any) => void

declare type StateTransactionUpdater = (collection: StoresCollection) => void

declare type StaticTemplate = () => Renderable

declare class Store<T> {
  parent: State
  name: string
  updater: StoreUpdater<T>
  _value: T
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
  parent: State
  value: T
}

declare type StoreListSorterFunction<T> = (left: T, right: T) => number

declare type StoreMap = {
  [key: string]: any
}

declare type StoresCollection = Record<string, Store<any>>

declare type StoreUpdater<T> =
  | StoreUpdaterBase<T>
  | StoreUpdaterObject<T extends object ? T : never>
  | StoreUpdaterBoolean
  | StoreUpdaterList<T>

declare class StoreUpdaterBase<T> {
  store: Store<T>
  constructor(store: Store<T>)
  update(updater: StoreUpdaterOrValue<T>): void
  reset(): void
  get value(): T
}

declare class StoreUpdaterBoolean extends StoreUpdaterBase<boolean> {
  toggle(): void
  setTrue(): void
  setFalse(): void
}

declare class StoreUpdaterList<T> extends StoreUpdaterBase<T[]> {
  push(element: T): void
  pop(): T
  unshift(element: T): void
  shift(): T
  addSorter(name: string, sorter: StoreListSorterFunction<T>): void
  sortBy(sorter: StoreListSorterFunction<T>): void
  insertAt(index: number, item: T): void
  remove(value: T): void
  removeBy(matcherFunction: (value: T) => boolean): void
}

declare class StoreUpdaterObject<T extends object> extends StoreUpdaterBase<T> {
  updateAttribute(name: keyof T, value: T[keyof T]): void
  updateDynamicAttribute(name: string, value: any): void
  isKey(key: string): boolean
  isValueType(key: keyof T, value: any): boolean
  resetAttribute(name: keyof T): void
}

declare type StoreUpdaterOrValue<T> = UpdaterValue<T> | StoreDataUpdater<T>

declare type Subscribe = (
  matcher: BusEventMatcher,
  listener: BusListener<any>,
) => void

declare const subscribeToHistoryChange: (app: App) => void

declare const subscribeToNavigation: (app: App) => void

declare type TagAttributes = SourceMap & Record<string, string>

declare type TagAttributesAndEvents = {
  attributes: TagAttributes
  events: TagEventAttributes
}

declare type TagEventAttributes = Record<string, string>

declare type Template<T> = StaticTemplate | TypedTemplate<T>

declare type TextValue = string | number

declare type TypedTemplate<T> = (props: Props<T>) => Renderable

declare type Unsubscribe = () => void

declare type UpdateEventInstructionData = {
  name: string
  sourceValue: EventListener
  targetValue: EventListener
}

declare const updaters: {
  object: <T extends Object>(store: Store<T>) => StoreUpdaterObject<T>
  list: <T>(store: Store<T[]>) => StoreUpdaterList<T>
  boolean: (store: Store<boolean>) => StoreUpdaterBoolean
}

declare type UpdaterValue<T> = boolean | T | T[]

declare type ViewModel<ATTRIBUTES, STORE_MAP> = (
  storeMap: STORE_MAP,
) => Partial<ATTRIBUTES>

export {}
