import { CustomPeriodicPublisher } from './custom-periodic-publisher'
import type {
  PublishPeriodicallyOptions,
  GeneralPeriodicPublisherOptions,
  CustomPeriodicPublisherOptions,
  PeriodicTimerFunctionOptions,
  PublishOnceWithTimeoutOptions,
  Publish,
} from '../types'
import { eventName } from '@lib/state'

const convertGeneralOptionsToCustom = <T>(
  options: GeneralPeriodicPublisherOptions<T>,
): CustomPeriodicPublisherOptions<T> => {
  const { offset, period } = options
  const timer = ({ callCount }: PeriodicTimerFunctionOptions) => {
    if (offset && callCount == 0) return offset

    return period
  }
  return {
    event: options.event,
    publish: options.publish,
    payload: options.payload,
    timer,
  }
}

export const publishPeriodically = <T>(
  options: PublishPeriodicallyOptions<T>,
) => {
  let normalizedOptions: CustomPeriodicPublisherOptions<T>

  if ('timer' in options) {
    normalizedOptions = options as CustomPeriodicPublisherOptions<T>
  } else {
    normalizedOptions = convertGeneralOptionsToCustom(
      options as GeneralPeriodicPublisherOptions<T>,
    )
  }

  const publisher = new CustomPeriodicPublisher(normalizedOptions)
  publisher.start()
  return publisher.stop
}

export const onceWithTimeout =
  <T>(publish: Publish<T>) =>
  (event: string, { timeout, payload }: PublishOnceWithTimeoutOptions<T>) => {
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
