import type { RenderKit, Attributes, ExpandedElement } from "../../types"

export const isSvgTag = (tagType: string) => tagType === 'svg'

export const createSvgNode = (type: string, attributes: Attributes, renderKit: RenderKit) => {
  console.log('creating svg tag', type)
  const document = renderKit && renderKit.document || window.document;
  const xmlns = 'http://www.w3.org/2000/svg'
  const node = document.createElementNS(xmlns, type, xmlns)

  for (const key in attributes) {
    if (key === '__self' || key === 'xmlns') continue;
    node.setAttributeNS('http://www.w3.org/2000/svg', key, attributes[key]);
  }

  return node as ExpandedElement
}
