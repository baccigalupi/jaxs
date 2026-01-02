export const remove = <T>(originalCollection: T[], itemToRemove: T) => {
  return originalCollection.reduce((collection: T[], item: T) => {
    if (item !== itemToRemove) collection.push(item)
    return collection
  }, [])
}

export const removeBy = <T>(
  originalCollection: T[],
  matcherFunction: (value: T) => boolean,
) => {
  return originalCollection.reduce((collection: T[], item: T) => {
    if (!matcherFunction(item)) collection.push(item)
    return collection
  }, [])
}

export const insertAt = <T>(
  originalCollection: T[],
  index: number,
  item: T,
) => {
  originalCollection.splice(index, 0, item)
  return originalCollection
}

export const appendIfUnique = <T>(originalCollection: T[], item: T) => {
  if (!originalCollection.includes(item)) {
    originalCollection.push(item)
  }
  return originalCollection
}

export const ArrayModifiers = {
  remove,
  removeBy,
  insertAt,
  appendIfUnique,
}
