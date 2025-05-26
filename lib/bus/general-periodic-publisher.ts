import type {
  PublishFunction,
  PeriodicPublisher,
  GeneralPeriodicPublisherOptions,
} from '../types'

export class GeneralPeriodicPublisher implements PeriodicPublisher {
  publish: PublishFunction
  period: number
  event: string
  payload: any
  intervalId: any
  stop: () => void
  offset: number | undefined
  stopped: boolean

  constructor({
    publish,
    period,
    event,
    payload,
    offset,
  }: GeneralPeriodicPublisherOptions) {
    this.publish = publish
    this.period = period
    this.event = event
    this.payload = payload || null
    this.stop = this.stopInterval.bind(this)
    this.offset = offset
    this.stopped = false
  }

  start() {
    if (!this.offset) {
      this.startInterval()
    } else if (this.offset) {
      this.offsetAndStartInterval()
    }
  }

  startInterval() {
    if (this.stopped) return

    this.intervalId = setInterval(() => this.publishEvent(), this.period)
  }

  offsetAndStartInterval() {
    if (this.stopped) return

    setTimeout(() => {
      this.publishEvent()
      this.startInterval()
    }, this.offset)
  }

  stopInterval() {
    this.stopped = true
    this.intervalId && clearInterval(this.intervalId)
  }

  publishEvent() {
    if (this.stopped) return

    this.publish(this.event, this.payload)
  }
}
