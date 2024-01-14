const nullMatch = { index: -1 }

export class IdMap {
  constructor () {
    this.map = {}
  }

  populate (list) {
    list.forEach((element, i) => {
      const id = element.__jsx
      if (id) {
        this.map[id] = this.map[id] || []
        this.map[id].push({
          element,
          index: i
        })
      }
    })
  }

  pullMatch (element) {
    const id = element && element.__jsx
    if (!id) return nullMatch
    if (!(this.map[id] && this.map[id].length)) return nullMatch

    return this.map[id].shift()
  }

  clear (element) {
    const id = element && element.__jsx
    if (!(id && this.map[id] && this.map[id].length)) return

    const matches = this.map[id]
    this.map[id] = matches.reduce((collection, possibleMatch) => {
      if (possibleMatch.element !== element) collection.push(possibleMatch)
      return collection
    }, [])
  }

  check (element) {
    const id = element && element.__jsx
    if (!(id && this.map[id])) return false
    return this.map[id].length > 0
  }

  remaining () {
    return Object.values(this.map).flat()
  }
}

export const createIdMap = (list) => {
  const map = new IdMap()
  map.populate(list)
  return map
}
