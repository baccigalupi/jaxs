import type { Attributes, AttributesAndEvents } from '../../types';

export const separateAttrsAndEvents = (
  combined: Attributes,
  defaultValue = '',
): AttributesAndEvents => {
  const attributes: Attributes = {};
  const events: Attributes = {};

  for (const key in combined) {
    const value = combined[key];
    if (key.match(/^on.+/i)) {
      const eventKey = key.slice(2).toLowerCase();
      events[eventKey] = value;
    } else {
      attributes[key] = normalizeValueForKey(combined, key, defaultValue);
    }
  }

  return {
    attributes,
    events,
  };
};

const normalizeValueForKey = (
  object: Attributes,
  key: string,
  defaultValue = '',
) => {
  if (object[key] === undefined) return defaultValue;
  return object[key];
};
