import { describe, expect, it } from 'vitest'
import { extractQueryParams } from '@lib/navigation/extract-query-params'

describe('extractQueryParams', () => {
  it('returns an empty object when the string is empty', () => {
    const searchString = ''
    const queryParams = extractQueryParams(searchString)

    expect(queryParams).toEqual({})
  })

  it('correctly extracts out query params from the url', () => {
    const searchString = '?foo=bar&zardoz=weird'
    const queryParams = extractQueryParams(searchString)

    expect(queryParams).toEqual({
      foo: 'bar',
      zardoz: 'weird',
    })
  })
})
