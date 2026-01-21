import { describe, expect, it, vi } from 'vitest'
import { createState } from '@lib/state'
import { createRouteState } from '@lib/navigation/route-state'
import { mockPublish } from '@support/render-kit'

describe('createRouteState', () => {
  it('adds the route store to state with empty values', () => {
    const state = createState(mockPublish())

    createRouteState(state)

    expect(state.get('route')).toEqual({ host: '', path: '', query: {} })
  })
})
