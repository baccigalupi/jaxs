import type { TagAttributes, JaxsElement } from '../../types'

export const namespace = 'http://www.w3.org/2000/svg'

const svgTags = {
  animate: true,
  animateMotion: true,
  animateTransform: true,
  circle: true,
  clipPath: true,
  defs: true,
  desc: true,
  ellipse: true,
  feBlend: true,
  feColorMatrix: true,
  feComponentTransfer: true,
  feComposite: true,
  feConvolveMatrix: true,
  feDiffuseLighting: true,
  feDisplacementMap: true,
  feDistantLight: true,
  feDropShadow: true,
  feFlood: true,
  feFuncA: true,
  feFuncB: true,
  feFuncG: true,
  feFuncR: true,
  feGaussianBlur: true,
  feImage: true,
  feMerge: true,
  feMergeNode: true,
  feMorphology: true,
  feOffset: true,
  fePointLight: true,
  feSpecularLighting: true,
  feSpotLight: true,
  feTile: true,
  feTurbulence: true,
  filter: true,
  foreignObject: true,
  g: true,
  image: true,
  line: true,
  linearGradient: true,
  marker: true,
  mask: true,
  metadata: true,
  mpath: true,
  path: true,
  pattern: true,
  polygon: true,
  polyline: true,
  radialGradient: true,
  rect: true,
  script: true,
  set: true,
  stop: true,
  style: true,
  svg: true,
  switch: true,
  symbol: true,
  text: true,
  textPath: true,
  title: true,
  tspan: true,
  use: true,
  view: true,
}

export const isSvgTag = (tagType: string, attributeNamespace?: string) => {
  if (svgTags[tagType]) return true
  if (tagType === 'a' && attributeNamespace === namespace) return true

  return false
}

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

export const elementIsSvg = (element: JaxsElement) =>
  element.namespaceURI === namespace
