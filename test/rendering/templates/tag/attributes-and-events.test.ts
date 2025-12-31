import { expect, describe, it } from 'vitest'
import { separateAttrsAndEvents } from '@lib/rendering/templates/tag/attributes-and-events'

describe('separateAttrsAndEvents', () => {
  it('builds a map for any key prefaced by `on`', () => {
    const props = {
      onmouseover: 'highlight',
      onChange: 'store-data',
      class: 'border bg-gold',
    }

    const { events } = separateAttrsAndEvents(props)

    expect(events).toEqual({
      mouseover: 'highlight',
      change: 'store-data',
    })
  })

  it('adds values to attributes with defauls', () => {
    const props = {
      onmouseover: 'highlight',
      onChange: 'store-data',
      class: 'border bg-gold',
      value: 'Submit',
    }

    const { attributes } = separateAttrsAndEvents(props)

    expect(attributes).toEqual({
      class: 'border bg-gold',
      value: 'Submit',
    })
  })

  it('when an attribute is undefined, it backfills it with an empty string', () => {
    const props = {
      class: 'border bg-gold',
      value: undefined,
    }

    const { attributes } = separateAttrsAndEvents(props)

    expect(attributes).toEqual({
      class: 'border bg-gold',
      value: '',
    })
  })

  it('removes false values from the attributes, for checked and other presence attributes', () => {
    const props = {
      class: 'border bg-gold',
      value: undefined,
      checked: false,
    }

    const { attributes } = separateAttrsAndEvents(props)

    expect(attributes).toEqual({
      class: 'border bg-gold',
      value: '',
    })
  })

  it('adds true values as a string, for checked and other presence attributes', () => {
    const props = {
      class: 'border bg-gold',
      value: undefined,
      checked: true,
    }

    const { attributes } = separateAttrsAndEvents(props)

    expect(attributes).toEqual({
      class: 'border bg-gold',
      value: '',
      checked: 'true',
    })
  })

  it('leaves the __source object attribute as is', () => {
    const props = {
      class: 'border bg-gold',
      value: undefined,
      checked: true,
      __source: {
        fileName: 'my-file.tsx',
        lineNumber: '23',
        columnNumber: '7',
      },
    }

    const { attributes } = separateAttrsAndEvents(props)

    expect(attributes.__source).toEqual({
      fileName: 'my-file.tsx',
      lineNumber: '23',
      columnNumber: '7',
    })
  })
})
