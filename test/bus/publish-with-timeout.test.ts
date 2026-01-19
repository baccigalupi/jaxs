import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { createBus } from '@lib/bus'

describe('publish.withTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('publishes an event with with timeout once, in a way that islike setTimeout', () => {
    const now = new Date()
    vi.setSystemTime(now)

    const { publish, subscribe } = createBus()
    let periodicEventCount = 0
    subscribe('periodic-event', () => (periodicEventCount += 1))
    publish.withTimeout('periodic-event', { timeout: 30 * 1000 })

    vi.advanceTimersByTime(29 * 1000)
    expect(periodicEventCount).toEqual(0)

    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(1)

    vi.advanceTimersByTime(1.1 * 1000)
    expect(periodicEventCount).toEqual(1)
  })
})
