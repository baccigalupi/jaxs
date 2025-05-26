import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { publishPeriodically } from '../../lib/bus/publish-periodically'
import { createBus } from '../../lib/bus'

describe('publishPeriodically, when using the general form', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('publishes an event with null payload on a periodic basis', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe('periodic-event', () => (periodicEventCount += 1))

    publishPeriodically({
      publish,
      period: 30 * 1000,
      event: 'periodic-event',
    })

    vi.advanceTimersByTime(29 * 1000)
    expect(periodicEventCount).toEqual(0)

    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(1)

    vi.advanceTimersByTime(29 * 1000)
    expect(periodicEventCount).toEqual(1)

    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(2)
  })

  it('publishes an event with a payload when initialized that way', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const { publish, subscribe } = createBus()
    const payloads: string[] = []
    subscribe('periodic-event', (payload: string) => payloads.push(payload))

    publishPeriodically({
      publish,
      period: 30 * 1000,
      event: 'periodic-event',
      payload: 'yo payload!',
    })

    vi.advanceTimersByTime(30.1 * 1000)

    expect(payloads).toEqual(['yo payload!'])
  })

  it('stops publishing when the returned callback function is called', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe('periodic-event', () => (periodicEventCount += 1))

    const stopPublishing = publishPeriodically({
      publish,
      period: 30 * 1000,
      event: 'periodic-event',
    })

    vi.advanceTimersByTime(60.1 * 1000)
    expect(periodicEventCount).toEqual(2)

    stopPublishing()

    vi.advanceTimersByTime(60.1 * 1000)
    expect(periodicEventCount).toEqual(2)
  })

  it('when a offset option is passed and it is before the period', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe('periodic-event', () => (periodicEventCount += 1))

    publishPeriodically({
      publish,
      period: 30 * 1000,
      event: 'periodic-event',
      offset: 10 * 1000,
    })

    // initial offset
    vi.advanceTimersByTime(9 * 1000)
    expect(periodicEventCount).toEqual(0)
    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(1)

    // periodic events
    vi.advanceTimersByTime(30 * 1000)
    expect(periodicEventCount).toEqual(2)

    vi.advanceTimersByTime(30 * 1000)
    expect(periodicEventCount).toEqual(3)
  })

  it('when the delay is greater that the period, it does that correctly', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe('periodic-event', () => (periodicEventCount += 1))

    publishPeriodically({
      publish,
      period: 30 * 1000,
      event: 'periodic-event',
      offset: 60 * 1000,
    })

    // initial offset
    vi.advanceTimersByTime(59 * 1000)
    expect(periodicEventCount).toEqual(0)
    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(1)

    // periodic events
    vi.advanceTimersByTime(30 * 1000)
    expect(periodicEventCount).toEqual(2)

    vi.advanceTimersByTime(30 * 1000)
    expect(periodicEventCount).toEqual(3)
  })

  it('when the canceled before the periodic event starts, it does not do continue to periodic', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe('periodic-event', () => (periodicEventCount += 1))

    const stopPublishing = publishPeriodically({
      publish,
      period: 30 * 1000,
      event: 'periodic-event',
      offset: 60 * 1000,
    })

    // during initial offset
    vi.advanceTimersByTime(59 * 1000)
    expect(periodicEventCount).toEqual(0)
    stopPublishing()
    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(0)

    // would be periodic events
    vi.advanceTimersByTime(30 * 1000)
    expect(periodicEventCount).toEqual(0)
  })
})
