import { expect, describe, it } from 'vitest'
import { createRenderKit } from '@support/render-kit'

import { TextTemplate } from '@lib/rendering/templates/text'

describe('TextTemplate', () => {
  it('renders a Text element into an array', () => {
    const text = new TextTemplate('hello')
    const renderKit = createRenderKit()

    const nodes = text.render(renderKit)
    const node = nodes[0]

    expect(nodes.length).toEqual(1)
    expect(node.wholeText).toEqual('hello')
  })

  it('handles number values well', () => {
    const text = new TextTemplate(23)
    const renderKit = createRenderKit()

    const [node] = text.render(renderKit)

    expect(node.wholeText).toEqual('23')
  })
})
