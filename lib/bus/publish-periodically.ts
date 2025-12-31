import { CustomPeriodicPublisher } from './custom-periodic-publisher'
import type {
  PublishPeriodicallyOptions,
  GeneralPeriodicPublisherOptions,
  CustomPeriodicPublisherOptions,
  PeriodicTimerFunctionOptions,
} from '../types'

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
