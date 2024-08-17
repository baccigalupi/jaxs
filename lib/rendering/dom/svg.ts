import type { TagAttributes, JaxsElement } from '../../types'

export const namespace = 'http://www.w3.org/2000/svg'

export const isSvgTag = (tagType: string) => tagType === 'svg'

export const createSvgNode = (
  type: string,
  attributes: TagAttributes,
  document: Document,
) => {
  const node = document.createElementNS(namespace, type)

  for (const key in attributes) {
    if (key === '__self' || key === 'xmlns') continue
    node.setAttributeNS(null, key, attributes[key].toString())
  }

  return node as unknown as JaxsElement
}
