import { GeneralPeriodicPublisher } from './general-periodic-publisher'
import { CustomPeriodicPublisher } from './custom-periodic-publisher'
import type {
  PublishPeriodicallyOptions,
  PeriodicPublisher,
  GeneralPeriodicPublisherOptions,
  CustomPeriodicPublisherOptions,
} from '../types'

export const publishPeriodically = (options: PublishPeriodicallyOptions) => {
  let publisher: PeriodicPublisher

  if ('timer' in options) {
    publisher = new CustomPeriodicPublisher(
      options as CustomPeriodicPublisherOptions,
    )
  } else {
    publisher = new GeneralPeriodicPublisher(
      options as GeneralPeriodicPublisherOptions,
    )
  }

  publisher.start()
  return publisher.stop
}
