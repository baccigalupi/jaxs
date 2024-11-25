import { RenderKit, JaxsElement, JaxsNode } from '../types'

export const NullTemplate = () => ({
  render: (renderKit: RenderKit, parentElement?: JaxsElement): JaxsNode[] => [],
})
