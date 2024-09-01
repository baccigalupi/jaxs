import { Renderable } from '../../../types'

export const withSvgFlag = (isSvg: boolean) => (template: Renderable) => {
  template && (template.isSvg = template.isSvg || isSvg)
  return template
}
