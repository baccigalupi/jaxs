import type { JaxsNode, JaxsNodes, JsxChangeId } from '../../../types'

const nullMatch = { index: -1 } as JsxChangeId

export class IdMap {
  map: Record<string, JsxChangeId[]>

  constructor() {
    this.map = {}
  }

  populate(list: JaxsNodes) {
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

  pullMatch(element: JaxsNode): JsxChangeId {
    const id = element && element.__jsx
    if (!id) return nullMatch
    if (!(this.map[id] && this.map[id].length)) return nullMatch

    return this.map[id].shift() as JsxChangeId
  }

  clear(element: JaxsNode) {
    const id = element && element.__jsx
    if (!(id && this.map[id] && this.map[id].length)) return

    const matches = this.map[id]
    this.map[id] = matches.reduce((collection, possibleMatch: JsxChangeId) => {
      if (possibleMatch.element !== element) collection.push(possibleMatch)
      return collection
    }, [] as JsxChangeId[])
  }

  check(element: JaxsNode) {
    const id = element && element.__jsx
    if (!(id && this.map[id])) return false
    return this.map[id].length > 0
  }

  remaining() {
    return Object.values(this.map).flat()
  }
}

export const createIdMap = (list: JaxsNodes) => {
  const map = new IdMap()
  map.populate(list)
  return map
}
