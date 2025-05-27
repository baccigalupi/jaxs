import { CustomPeriodicPublisher } from './custom-periodic-publisher'
import type {
  PublishPeriodicallyOptions,
  PeriodicPublisher,
  GeneralPeriodicPublisherOptions,
  CustomPeriodicPublisherOptions,
  PeriodicTimerFunctionOptions,
} from '../types'

const convertGeneralOptionsToCustom = (
  options: GeneralPeriodicPublisherOptions,
): CustomPeriodicPublisherOptions => {
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

export const publishPeriodically = (options: PublishPeriodicallyOptions) => {
  let normalizedOptions: CustomPeriodicPublisherOptions

  if ('timer' in options) {
    normalizedOptions = options as CustomPeriodicPublisherOptions
  } else {
    normalizedOptions = convertGeneralOptionsToCustom(
      options as GeneralPeriodicPublisherOptions,
    )
  }

  const publisher = new CustomPeriodicPublisher(normalizedOptions)
  publisher.start()
  return publisher.stop
}
