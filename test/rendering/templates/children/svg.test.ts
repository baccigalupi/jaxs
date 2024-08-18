import { expect, describe, it } from 'vitest'
import { Tag } from '../../../../lib/rendering/templates/tag'
import { withSvgFlag } from '../../../../lib/rendering/templates/children/svg'

describe('withSvgFlag', () => {
  it('adds a true svg flag, when creating the setter with true', () => {
    const template = new Tag('p', {})

    const setter = withSvgFlag(true)
    setter(template)

    expect(template.isSvg).toEqual(true)
  })

  it('keeps the true svg flag even if the setter has it set to false', () => {
    const template = new Tag('p', {})
    template.isSvg = true

    const setter = withSvgFlag(false)
    setter(template)

    expect(template.isSvg).toEqual(true)
  })

  it('keeps the false svg flag when the setter is also false', () => {
    const template = new Tag('p', {})
    template.isSvg = false

    const setter = withSvgFlag(false)
    setter(template)

    expect(template.isSvg).toEqual(false)
  })
})
