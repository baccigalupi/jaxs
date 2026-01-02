import { isObject, isArray } from './is'

type Object = Record<string, any>

export const areElementsEqual = (oldValue: any, newValue: any) =>
  oldValue === newValue

const keyLengthSame = (oldValue: Object, newValue: Object) =>
  Object.keys(oldValue).length === Object.keys(newValue).length

export const areObjectsEqual = (oldValue: Object, newValue: Object) => {
  if (!(isObject(oldValue) && isObject(newValue))) return false
  if (!keyLengthSame(oldValue, newValue)) return false

  return Object.keys(oldValue).every((key) => {
    const oldInnerValue = oldValue[key]
    const newInnerValue = newValue[key]

    return areEqual(oldInnerValue, newInnerValue)
  })
}

export const areArraysEqual = (oldValue: any[], newValue: any[]) => {
  if (!(isArray(oldValue) && isArray(newValue))) return false
  if (oldValue.length !== newValue.length) return false

  return oldValue.every((oldInnerValue, index) => {
    const newInnerValue = newValue[index]

    return areEqual(oldInnerValue, newInnerValue)
  })
}

export const areEqual = (oldValue: any, newValue: any) => {
  if (isObject(oldValue)) return areObjectsEqual(oldValue, newValue)
  if (isArray(oldValue)) return areArraysEqual(oldValue, newValue)

  return areElementsEqual(oldValue, newValue)
}

export const Equality = {
  objects: areObjectsEqual,
  arrays: areArraysEqual,
  equal: areEqual,
}
