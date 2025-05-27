import {
  PeriodicPublisher,
  PublishFunction,
  PeriodicTimerFunction,
  CustomPeriodicPublisherOptions,
} from '../types'

export class CustomPeriodicPublisher implements PeriodicPublisher {
  publish: PublishFunction
  event: string
  payload: any
  stopped: boolean
  timer: PeriodicTimerFunction
  timeoutId: any
  stop: () => void
  callCount: number
  startedAt: number

  constructor({
    publish,
    event,
    payload,
    timer,
  }: CustomPeriodicPublisherOptions) {
    this.publish = publish
    this.event = event
    this.payload = payload || null
    this.stop = this.stopTimeout.bind(this)
    this.stopped = false
    this.timer = timer
    this.startedAt = new Date().getTime()
    this.callCount = 0 // first time it is called, the count will be 0
  }

  start() {
    this.setNewTimeout()
  }

  setNewTimeout = () => {
    if (this.stopped) return

    setTimeout(() => {
      this.publishEvent()
      this.setNewTimeout()
    }, this.calculateNextTime())
  }

  calculateNextTime = () => {
    return this.timer({
      timeDiff: this.diff(),
      callCount: this.callCount,
      stop: this.stop,
    })
  }

  diff() {
    return new Date().getTime() - this.startedAt
  }

  stopTimeout() {
    this.stopped = true
    this.timeoutId && clearTimeout(this.timeoutId)
  }

  publishEvent() {
    if (this.stopped) return

    this.callCount += 1
    this.publish(this.event, this.payload)
  }
}
