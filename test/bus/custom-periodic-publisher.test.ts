import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { PeriodicTimerFunctionOptions } from '../../lib/types'
import { publishPeriodically } from '../../lib/bus/publish-periodically'
import { createBus } from '../../lib/bus'

describe('publishPeriodically, when using the custom function instead', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('for a timer function that always returns a constant, it works close to the way the default does', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe('custom-periodic-event', () => (periodicEventCount += 1))
    const timer = () => 30 * 1000

    publishPeriodically({
      publish,
      event: 'custom-periodic-event',
      timer,
    })

    vi.advanceTimersByTime(29 * 1000)
    expect(periodicEventCount).toEqual(0)

    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(1)
  })

  it('returns a stop function to stop the periodic publishing', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe('custom-periodic-event', () => (periodicEventCount += 1))
    const timer = () => 30 * 1000

    const stop = publishPeriodically({
      publish,
      event: 'custom-periodic-event',
      timer,
    })

    vi.advanceTimersByTime(29 * 1000)
    expect(periodicEventCount).toEqual(0)

    stop()

    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(0)
  })

  it('works as a decay timer function that uses the call count and stop arguments', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const event = 'custom-periodic-callcount-event'
    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe(event, () => (periodicEventCount += 1))

    const timer = ({ callCount, stop }: PeriodicTimerFunctionOptions) => {
      if (callCount > 1) stop()

      return 30 * 1000
    }

    publishPeriodically({ publish, event, timer })

    vi.advanceTimersByTime(29 * 1000)
    expect(periodicEventCount).toEqual(0)

    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(1)

    vi.advanceTimersByTime(30 * 1000)
    expect(periodicEventCount).toEqual(2)

    vi.advanceTimersByTime(30 * 1000)
    expect(periodicEventCount).toEqual(2)
  })

  it('can use the total time elapsed to change the timer characteristics', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const event = 'custom-periodic-callcount-event'
    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe(event, () => (periodicEventCount += 1))

    const timer = ({ timeDiff, stop }: PeriodicTimerFunctionOptions) => {
      if (timeDiff >= 30 * 1000) stop()

      return 30 * 1000
    }

    publishPeriodically({ publish, event, timer })

    vi.advanceTimersByTime(29 * 1000)
    expect(periodicEventCount).toEqual(0)

    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(1)

    vi.advanceTimersByTime(30 * 1000)
    expect(periodicEventCount).toEqual(1)
  })
})
