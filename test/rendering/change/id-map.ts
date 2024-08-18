import { describe, expect, it } from 'vitest'
import { createIdMap } from '../../../lib/rendering/change/id-map'
import { JsxIded } from '../../../lib/types'

describe('createIdMap', () => {
  it('populates the map helper and allows you to pull via matching jsx ids', () => {
    const list = [
      { __jsx: 'h1' },
      { __jsx: 'input#email[type=text][name=email]' },
      { __jsx: 'input[type=submit]' },
    ]
    const map = createIdMap(list)

    const match = map.pullMatch({
      __jsx: 'input#email[type=text][name=email]',
    })

    expect(match.index).toEqual(1)
    expect(match.element).toEqual({
      __jsx: 'input#email[type=text][name=email]',
    })
    expect(map.remaining()).toEqual([
      { index: 0, element: { __jsx: 'h1' } },
      { index: 2, element: { __jsx: 'input[type=submit]' } },
    ])
  })

  it('is first in first out when multiple matches', () => {
    type TextElement = { textContent: string } & JsxIded
    const list = [
      { __jsx: 'TextNode', textContent: 'one' },
      { __jsx: 'input#email[type=text][name=email]' },
      { __jsx: 'TextNode', textContent: 'two' },
    ]
    const map = createIdMap(list)

    const match = map.pullMatch({
      __jsx: 'TextNode',
      textContent: 'two',
    } as TextElement)
    expect(match.index).toEqual(0)
    expect(match.element).toEqual({
      __jsx: 'TextNode',
      textContent: 'one',
    } as TextElement)
  })

  it('returns a null object when no match is found', () => {
    const list = [
      { __jsx: 'TextNode', textContent: 'one' },
      { __jsx: 'input#email[type=text][name=email]' },
    ]
    const map = createIdMap(list)

    const match = map.pullMatch({ __jsx: 'input[type=submit]' })
    expect(match.element).toBeFalsy()
    expect(match.index).toEqual(-1)
  })

  it('clear will remove element that is identical', () => {
    const list = [
      { __jsx: 'p' },
      { __jsx: 'input#email[type=text][name=email]' },
    ]
    const map = createIdMap(list)

    map.clear({ __jsx: 'p' })
    expect(map.remaining().length).toEqual(2)

    map.clear(list[0])
    expect(map.remaining().length).toEqual(1)
  })

  it('clear will just remove one of the matches not all of them', () => {
    const list = [
      { __jsx: 'p' },
      { __jsx: 'input#email[type=text][name=email]' },
      { __jsx: 'p' },
    ]
    const map = createIdMap(list)

    map.clear({ __jsx: 'p' })
    expect(map.remaining().length).toEqual(3)

    map.clear(list[0])
    expect(map.remaining().length).toEqual(2)
  })

  it('check will see if there in at least one entry for the __jsx without shifting it off', () => {
    const list = [
      { __jsx: 'p' },
      { __jsx: 'input#email[type=text][name=email]' },
      { __jsx: 'p' },
    ]

    const map = createIdMap(list)

    expect(map.check({ __jsx: 'p' })).toEqual(true)

    map.clear(list[0])
    expect(map.check({ __jsx: 'p' })).toEqual(true)

    map.clear(list[2])
    expect(map.check({ __jsx: 'p' })).toEqual(false)
  })
})
