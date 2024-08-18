import type { JsxIded, JsxChangeId } from '../../types'

const nullMatch = { index: -1 } as JsxChangeId

export class IdMap {
  map: Record<string, JsxChangeId[]>

  constructor() {
    this.map = {}
  }

  populate(list: JsxIded[]) {
    list.forEach((element, i) => {
      const id = element.__jsx
      if (id) {
        this.map[id] = this.map[id] || []
        this.map[id].push({
          element,
          index: i,
        })
      }
    })
  }

  pullMatch(element: JsxIded): JsxChangeId {
    const id = element && element.__jsx
    if (!id) return nullMatch
    if (!(this.map[id] && this.map[id].length)) return nullMatch

    return this.map[id].shift() as JsxChangeId
  }

  clear(element: JsxIded) {
    const id = element && element.__jsx
    if (!(id && this.map[id] && this.map[id].length)) return

    const matches = this.map[id]
    this.map[id] = matches.reduce((collection, possibleMatch: JsxChangeId) => {
      if (possibleMatch.element !== element) collection.push(possibleMatch)
      return collection
    }, [] as JsxChangeId[])
  }

  check(element: JsxIded) {
    const id = element && element.__jsx
    if (!(id && this.map[id])) return false
    return this.map[id].length > 0
  }

  remaining() {
    return Object.values(this.map).flat()
  }
}

export const createIdMap = (list: JsxIded[]) => {
  const map = new IdMap()
  map.populate(list)
  return map
}
