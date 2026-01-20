import type { State, Store } from '@lib/types'

export type PublishFromDom = Publish<Event>
export type Subscribe = (
  matcher: BusEventMatcher,
  listener: BusListener<any>,
) => void

export type AppAdditionListenerOptions = {
  state: State
  document: Document
  window: Window
}
export type ListenerKit<T> = {
  state: State
  document: Document
  window: Window
  publish: Publish<any>
  eventName: string
  payload: T
}
export interface Publish<T> {
  (event: string, payload: T): void
}

export type BusListener<T> = (listenerKit: ListenerKit<T>) => void
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

export interface PeriodicPublisher<T> {
  event: string
  publish: Publish<T>
  payload?: T
  start: () => void
  stop: () => void
}

export type RequiredPeriodicPublisherOptions<T> = {
  event: string
  publish: Publish<T>
  payload?: T
}
export type CustomPeriodicOptions = {
  timer: PeriodicTimerFunction
}
export type CustomPeriodicPublisherOptions<T> =
  RequiredPeriodicPublisherOptions<T> & CustomPeriodicOptions

export type PeriodicTimerFunctionOptions = {
  timeDiff: number
  callCount: number
  stop: () => void
}
export type PeriodicTimerFunction = (
  options: PeriodicTimerFunctionOptions,
) => number

export type WithTimeoutOptions<T> = {
  timeout: number
  payload?: T
}
export type PeriodicallyOptions<T> = {
  period: number
  payload?: T
  offset?: number
}
export type PeriodicallyWithCustomTimerOptions<T> = {
  timer: PeriodicTimerFunction
  payload?: T
}
export interface PublishExtended<T> extends Publish<T> {
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
