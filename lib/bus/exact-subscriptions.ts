import {
  ExactSubscriptionData,
  BusEventMatcher,
  BusListener,
  Unsubscribe,
} from '../types'

export class ExactSubscriptions {
  lookup: Record<string, ExactSubscriptionData<any>[]>

  constructor() {
    this.lookup = {}
  }

  add<T>(
    matcher: string,
    listener: BusListener<T>,
    index: number,
  ): Unsubscribe {
    this.ensureArrayFor(matcher as string)
    const subscription = {
      listener,
      index,
      matcher,
    }

    this.lookup[matcher].push(subscription)

    return () => this.remove(subscription)
  }

  remove<T>(subscription: ExactSubscriptionData<T>) {
    if (!this.lookup[subscription.matcher]) return

    this.lookup[subscription.matcher] = this.lookup[
      subscription.matcher
    ].reduce((aggregate, currentSubscription) => {
      if (currentSubscription !== subscription) {
        aggregate.push(currentSubscription)
      }
      return aggregate
    }, [] as ExactSubscriptionData<any>[])
  }

  matches(event: string) {
    return this.lookup[event] || []
  }

  ensureArrayFor(matcher: string) {
    if (!this.lookup[matcher]) {
      this.lookup[matcher] = []
    }
  }
}
