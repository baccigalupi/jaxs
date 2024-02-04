import type { RenderKit, Attributes, ExpandedElement } from "../../types"

export const isSvgTag = (tagType: string) => tagType === 'svg'

export const createSvgNode = (type: string, attributes: Attributes, renderKit: RenderKit) => {
  const document = renderKit && renderKit.document || window.document;
  const xmlns = attributes.xmlns || 'http://www.w3.org/2000/svg'
  const node = document.createElementNS(type, xmlns)

  for (const key in attributes) {
    if (key === '__self' || key === 'xmlns') continue;
    node.setAttributeNS(null, key, attributes[key]);
  }

  return node as ExpandedElement
}
