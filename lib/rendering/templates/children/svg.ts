import { Template } from '../../../types'

export const withSvgFlag = (isSvg: boolean) => (template: Template) => {
  template && (template.isSvg = template.isSvg || isSvg)
  return template
}
