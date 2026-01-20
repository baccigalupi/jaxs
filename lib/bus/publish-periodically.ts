import { CustomPeriodicPublisher } from './custom-periodic-publisher'
import type {
  CustomPeriodicPublisherOptions,
  PeriodicTimerFunctionOptions,
  WithTimeoutOptions,
  PeriodicallyOptions,
  PeriodicallyWithCustomTimerOptions,
  Publish,
} from '../types'

export const periodically = <T>(publish: Publish<T>) => {
  return (event: string, options: PeriodicallyOptions<T>) => {
    const { offset, period, payload } = options

    const timer = ({ callCount }: PeriodicTimerFunctionOptions) => {
      if (offset && callCount == 0) return offset

      return period
    }

    const publisher = new CustomPeriodicPublisher({
      payload,
      event,
      publish,
      timer,
    })
    publisher.start()
    return publisher.stop
  }
}

export const onceWithTimeout = <T>(publish: Publish<T>) => {
  return (event: string, { timeout, payload }: WithTimeoutOptions<T>) => {
    const timer = ({ callCount, stop }: PeriodicTimerFunctionOptions) => {
      if (callCount > 1) stop()

      return timeout
    }
    const publisher = new CustomPeriodicPublisher({
      publish,
      event,
      payload,
      timer,
    })
    publisher.start()
    return publisher.stop
  }
}

export const periodicallyWithCustomTimer = <T>(publish: Publish<T>) => {
  return (event: string, options: PeriodicallyWithCustomTimerOptions<T>) => {
    const normalizedOptions: CustomPeriodicPublisherOptions<T> = {
      ...options,
      event,
      publish,
    }
    const publisher = new CustomPeriodicPublisher(normalizedOptions)
    publisher.start()
    return publisher.stop
  }
}
