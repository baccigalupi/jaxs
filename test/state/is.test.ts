import { expect, it, describe } from 'vitest'
import {
  isBoolean,
  isNumber,
  isString,
  isArray,
  isObject,
} from '../../lib/state/is'

describe('Utilities for testing types', () => {
  it('correctly determines whether a thing is a boolean or not', () => {
    expect(isBoolean(true)).toEqual(true)
    expect(isBoolean(false)).toEqual(true)

    expect(isBoolean(undefined)).toEqual(false)
    expect(isBoolean(null)).toEqual(false)
    expect(isBoolean({})).toEqual(false)
    expect(isBoolean([false])).toEqual(false)
    expect(isBoolean('false')).toEqual(false)
    expect(isBoolean(0)).toEqual(false)
  })

  it('correctly determines whether a thing is a number or not', () => {
    expect(isNumber(0)).toEqual(true)
    expect(isNumber(0.45)).toEqual(true)

    expect(isNumber(true)).toEqual(false)
    expect(isNumber(false)).toEqual(false)
    expect(isNumber(undefined)).toEqual(false)
    expect(isNumber(null)).toEqual(false)
    expect(isNumber({})).toEqual(false)
    expect(isNumber([false])).toEqual(false)
    expect(isNumber('false')).toEqual(false)
  })

  it('correctly determines whether a thing is a string or not', () => {
    expect(isString('false')).toEqual(true)
    expect(isString(`foo ${'bar'}`)).toEqual(true)

    expect(isString(0)).toEqual(false)
    expect(isString(0.45)).toEqual(false)
    expect(isString(true)).toEqual(false)
    expect(isString(false)).toEqual(false)
    expect(isString(undefined)).toEqual(false)
    expect(isString(null)).toEqual(false)
    expect(isString({})).toEqual(false)
    expect(isString([false])).toEqual(false)
  })

  it('correctly determines whether a thing is an array or not', () => {
    expect(isArray([false])).toEqual(true)

    expect(isArray('false')).toEqual(false)
    expect(isArray(`foo ${'bar'}`)).toEqual(false)
    expect(isArray(0)).toEqual(false)
    expect(isArray(0.45)).toEqual(false)
    expect(isArray(true)).toEqual(false)
    expect(isArray(false)).toEqual(false)
    expect(isArray(undefined)).toEqual(false)
    expect(isArray(null)).toEqual(false)
    expect(isArray({})).toEqual(false)
  })

  it('correctly determines whether a thing is an object or not', () => {
    expect(isObject({})).toEqual(true)

    expect(isObject([false])).toEqual(false)
    expect(isObject('false')).toEqual(false)
    expect(isObject(`foo ${'bar'}`)).toEqual(false)
    expect(isObject(0)).toEqual(false)
    expect(isObject(0.45)).toEqual(false)
    expect(isObject(true)).toEqual(false)
    expect(isObject(false)).toEqual(false)
    expect(isObject(undefined)).toEqual(false)
    expect(isObject(null)).toEqual(false)
  })
})
