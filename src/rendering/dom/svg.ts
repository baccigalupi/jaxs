import type { RenderKit, Attributes, ExpandedElement } from "../../types"

export const namespace = 'http://www.w3.org/2000/svg'
export const isSvgTag = (tagType: string) => tagType === 'svg'
export const isSvg = (element: SVGElement) => element.namespaceURI === namespace

export const createSvgNode = (type: string, attributes: Attributes, renderKit: RenderKit) => {
  const document = renderKit && renderKit.document || window.document;
  const node = document.createElementNS(namespace, type)

  for (const key in attributes) {
    if (key === '__self' || key === 'xmlns') continue;
    // adding namespace in as first argument makes it not really render!
    node.setAttributeNS(null, key, attributes[key]);
  }

  return node as unknown as ExpandedElement
}
