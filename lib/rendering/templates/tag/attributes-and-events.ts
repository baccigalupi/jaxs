import type {
  Props,
  TagAttributes,
  TagAttributesAndEvents,
  TagEventAttributes,
  JsxCollection,
  PropValue,
} from '../../../types'
import { ensureJsxChildrenArray } from '../children/normalize'

export const separateAttrsAndEvents = (
  props: Props,
  defaultValue = '',
): TagAttributesAndEvents => {
  const attributes: TagAttributes = {}
  const events: TagEventAttributes = {}

  for (const key in props) {
    const value = props[key]
    if (key.match(/^on.+/i)) {
      const eventKey = key.slice(2).toLowerCase()
      events[eventKey] = value ? value.toString() : ''
    } else {
      if (value === false) continue
      if (key === '__source') {
        attributes.__source = props.__source
      } else {
        attributes[key] = normalizeValueForKey(key, value, defaultValue)
      }
    }
  }

  return {
    attributes,
    events,
  }
}

const normalizeValueForKey = (
  key: string,
  value: PropValue,
  defaultValue = '',
) => {
  if (value === undefined || value === null) return defaultValue

  return value.toString()
}

export const packageJsxAttributes = (
  maybeAttributes?: Props,
  maybeChildren?: JsxCollection,
) => {
  const attributes = maybeAttributes || ({} as Props)
  const children = ensureJsxChildrenArray(maybeChildren, attributes)
  attributes.children = attributes.children || children
  return attributes
}
