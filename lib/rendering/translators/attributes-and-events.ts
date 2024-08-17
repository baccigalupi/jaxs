import type {
  TagProps,
  TagAttributes,
  TagAttributesAndEvents,
  TagEventAttributes,
} from '../../types'

export const separateAttrsAndEvents = (
  props: TagProps,
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
      attributes[key] = normalizeValueForKey(props, key, defaultValue)
    }
  }

  return {
    attributes,
    events,
  }
}

const normalizeValueForKey = (
  props: TagProps,
  key: string,
  defaultValue = '',
) => {
  if (props[key] === undefined || props[key] === null) return defaultValue

  const value = props[key]
  return value.toString()
}
