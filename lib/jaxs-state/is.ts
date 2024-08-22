export const isBoolean = (value: any) => typeof value === 'boolean'
export const isNumber = (value: any) => typeof value === 'number'
export const isString = (value: any) => typeof value === 'string'
export const isArray = (value: any) => Array.isArray(value)
export const isObject = (value: any) =>
  value !== null && !isArray(value) && typeof value === 'object'
