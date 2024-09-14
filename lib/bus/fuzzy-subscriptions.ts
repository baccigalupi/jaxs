import { FuzzySubscriptionData, BusListener, Unsubscribe } from '../types'

export class FuzzySubscriptions {
  lookup: FuzzySubscriptionData<any>[]

  constructor() {
    this.lookup = []
  }

  add<T>(
    matcher: RegExp,
    listener: BusListener<T>,
    index: number,
  ): Unsubscribe {
    const subscription = {
      listener,
      index,
      matcher,
    }

    this.lookup.push(subscription)

    return () => this.remove(subscription)
  }

  remove<T>(subscription: FuzzySubscriptionData<T>) {
    this.lookup = this.lookup.reduce((aggregate, currentSubscription) => {
      if (currentSubscription !== subscription) {
        aggregate.push(currentSubscription)
      }
      return aggregate
    }, [] as FuzzySubscriptionData<any>[])
  }

  matches(event: string) {
    return this.lookup.filter((subscription) =>
      subscription.matcher.test(event),
    )
  }
}
