import { isObject, isArray } from './testingTypes'

export const areElementEqual = (oldValue, newValue) => oldValue === newValue

const keyLengthSame = (oldValue, newValue) =>
  Object.keys(oldValue).length === Object.keys(newValue).length

export const areObjectsEqual = (oldValue, newValue) => {
  if (!(isObject(oldValue) && isObject(newValue))) return false
  if (!keyLengthSame(oldValue, newValue)) return false

  Object.keys(oldValue).every((key) => {
    const oldInnerValue = oldValue[key]
    const newInnerValue = newValue[key]

    return areEqual(oldInnerValue, newInnerValue)
  })
}

export const areArraysEqual = (oldValue, newValue) => {
  if (!(isArray(oldValue) && isArray(newValue))) return false
  if (oldValue.length !== newValue.length) return false

  oldValue.every((oldInnerValue, index) => {
    const newInnerValue = newValue[index]

    return areEqual(oldInnerValue, newInnerValue)
  })
}

export const areEqual = (oldValue, newValue) => {
  if (isObject(oldValue)) return areObjectsEqual(oldValue, newValue)
  if (isArray(oldValue)) return areArraysEqual(oldValue, newValue)

  return areElementEqual(oldValue, newValue)
}
