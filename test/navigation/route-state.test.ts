import { describe, expect, it, vi } from 'vitest'
import { createState } from '../../lib/state'
import { createRouteState } from '../../lib/navigation/route-state'

describe('createRouteState', () => {
  it('adds the route store to state with empty values', () => {
    const state = createState(vi.fn())

    createRouteState(state)

    expect(state.get('route')).toEqual({ host: '', path: '', query: {} })
  })
})
