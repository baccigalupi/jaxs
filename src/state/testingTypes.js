export const isBoolean = (value) => typeof (value) === 'boolean'
export const isNumber = (value) => typeof (value) === 'number'
export const isString = (value) => typeof (value) === 'string'
export const isArray = (value) => Array.isArray(value)
export const isObject = (value) =>
  value !== null && !isArray(value) && typeof (value) === 'object'
