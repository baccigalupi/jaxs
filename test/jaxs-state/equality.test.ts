import { expect, it, describe } from 'vitest'
import {
  areElementsEqual,
  areObjectsEqual,
  areArraysEqual,
  areEqual,
} from '../../lib/jaxs-state/equality'

describe('Equality tester functions', () => {
  describe('areElementsEqual', () => {
    it('correctly figures out that two different types are different', () => {
      expect(areElementsEqual(0, '0')).toEqual(false)
      expect(areElementsEqual(undefined, false)).toEqual(false)
      expect(areElementsEqual(null, false)).toEqual(false)
      expect(areElementsEqual(undefined, null)).toEqual(false)
    })

    it('correctly determines whether low level primatives of the same type are identical', () => {
      expect(areElementsEqual(0, 0)).toEqual(true)
      expect(areElementsEqual(0, 10)).toEqual(false)

      expect(areElementsEqual('0', '0')).toEqual(true)
      expect(areElementsEqual('0', 'stump')).toEqual(false)

      expect(areElementsEqual(undefined, undefined)).toEqual(true)
      expect(areElementsEqual(null, null)).toEqual(true)

      expect(areElementsEqual(false, false)).toEqual(true)
      expect(areElementsEqual(true, true)).toEqual(true)
      expect(areElementsEqual(true, false)).toEqual(false)
    })

    it('correctly determines whether objects are the same actual object', () => {
      expect(areElementsEqual({}, {})).toEqual(false)
      const emptyObject = {}
      expect(areElementsEqual(emptyObject, emptyObject)).toEqual(true)
    })

    it('correctly determines whether two arrays are the same actual object', () => {
      expect(areElementsEqual([], [])).toEqual(false)
      const emptyObject = []
      expect(areElementsEqual(emptyObject, emptyObject)).toEqual(true)
    })
  })

  it('areObjectsEqual tests against values instead of identity', () => {
    expect(areObjectsEqual({ a: 'a', b: true }, { a: 'a', b: true })).toEqual(
      true,
    )
    expect(areObjectsEqual({ a: 'a', b: true }, { a: 'a', b: false })).toEqual(
      false,
    )

    expect(areObjectsEqual({ list: [1, 2, 3] }, { list: [1, 3] })).toEqual(
      false,
    )
  })

  it('areArraysEqual tests against values instead of identity', () => {
    expect(areArraysEqual([1, 2, undefined], [1, 2, undefined])).toEqual(true)
    expect(areArraysEqual([1, 2, undefined], [1, undefined, 2])).toEqual(false)

    expect(areArraysEqual([1, 2, { a: 'a' }], [1, 2, { a: 'a' }])).toEqual(true)
    expect(areArraysEqual([1, 2, { a: 'a' }], [1, 2, { a: 'b' }])).toEqual(
      false,
    )
  })

  it('areEqual tests any type of object correctly', () => {
    expect(areObjectsEqual({ a: 'a', b: true }, { a: 'a', b: true })).toEqual(
      true,
    )
    expect(areObjectsEqual({ a: 'a', b: true }, [1, 2, undefined])).toEqual(
      false,
    )

    expect(areEqual([1, 2, undefined], [1, 2, undefined])).toEqual(true)
    expect(areEqual(undefined, [1, 2, undefined])).toEqual(false)

    expect(areEqual(0, 0)).toEqual(true)
    expect(areEqual(0, '0')).toEqual(false)

    expect(areEqual(undefined, undefined)).toEqual(true)
    expect(areEqual(undefined, null)).toEqual(false)
    expect(areEqual(undefined, false)).toEqual(false)

    expect(areEqual(false, false)).toEqual(true)
    expect(areEqual(true, false)).toEqual(false)
  })
})
