import {
  BusEventMatcher,
  BusListener,
  Unsubscribe,
  AppAdditionListenerOptions,
  PublishExtended,
} from '../types'

import { ExactSubscriptions } from './exact-subscriptions'
import { FuzzySubscriptions } from './fuzzy-subscriptions'
import { onceWithTimeout, publishPeriodically } from './publish-periodically'

class JaxsBus {
  options?: AppAdditionListenerOptions
  exactSubscriptions: ExactSubscriptions
  fuzzySubscriptions: FuzzySubscriptions
  currentIndex: number

  constructor() {
    this.exactSubscriptions = new ExactSubscriptions()
    this.fuzzySubscriptions = new FuzzySubscriptions()
    this.currentIndex = 0
  }

  subscribe<T>(matcher: BusEventMatcher, listener: BusListener<T>) {
    let unsubscribe: Unsubscribe
    if (typeof matcher === 'string') {
      unsubscribe = this.exactSubscriptions.add(
        matcher,
        listener,
        this.currentIndex,
      )
    } else {
      unsubscribe = this.fuzzySubscriptions.add(
        matcher as RegExp,
        listener,
        this.currentIndex,
      )
    }
    this.currentIndex += 1
    return unsubscribe
  }

  publish<T>(event: string, payload: T) {
    const subscriptions = [
      ...this.exactSubscriptions.matches(event),
      ...this.fuzzySubscriptions.matches(event),
    ].sort((left, right) => left.index - right.index)

    subscriptions.forEach((subscription) => {
      subscription.listener(this.listenerOptions<T>(event, payload))
    })
  }

  addListenerOptions(options: AppAdditionListenerOptions) {
    this.options = options
  }

  listenerOptions<T>(event: string, payload: T) {
    return {
      eventName: event,
      ...this.options,
      publish: this.publish.bind(this),
      payload,
    }
  }
}

const createBus = () => {
  const bus = new JaxsBus()

  const publish = (event: string, payload: any) => bus.publish(event, payload)
  publish.withTimeout = onceWithTimeout(publish)

  const subscribe = (matcher: BusEventMatcher, listener: BusListener<any>) =>
    bus.subscribe(matcher, listener)

  return {
    bus,
    publish: publish as PublishExtended<any>,
    subscribe,
  }
}

export {
  createBus,
  JaxsBus,
  ExactSubscriptions,
  FuzzySubscriptions,
  publishPeriodically,
}
