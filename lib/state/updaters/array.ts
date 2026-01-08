export const remove = <T>(originalCollection: T[], itemToRemove: T) => {
  for (let i = originalCollection.length - 1; i >= 0; i--) {
    if (originalCollection[i] === itemToRemove) {
      originalCollection.splice(i, 1)
    }
  }
  return originalCollection
}

export const removeBy = <T>(
  originalCollection: T[],
  matcherFunction: (value: T) => boolean,
) => {
  for (let i = originalCollection.length - 1; i >= 0; i--) {
    if (matcherFunction(originalCollection[i])) {
      originalCollection.splice(i, 1)
    }
  }
  return originalCollection
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
  push: <T>(array: T[], item: T) => array.push(item), // mutates
  pop: <T>(array: T[]) => array.pop(), // mutates
  unshift: <T>(array: T[], item: T) => array.unshift(item), // mutates
  shift: <T>(array: T[]) => array.shift(), // mutates
  sortBy: <T>(array: T[], sorter: (a: T, b: T) => number) => array.sort(sorter), // mutates
  includes: <T>(array: T[], item: T) => array.includes(item), // reader
}
