import { describe, expect, it, vi } from 'vitest'
import { createTestDom } from '../../../../../support/test-dom'
import {
  ChangeInstructionTypes,
  JaxsElement,
} from '../../../../../../lib/types'
import { compileForEvents } from '../../../../../../lib/rendering/change/instructions/nodes/element/events'

describe('compileForEvents instructions', () => {
  it('is empty when neither source nor target have an event map', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    source.eventMaps = {}
    const target = dom.createElement('button') as JaxsElement
    target.eventMaps = {}

    const instructions = compileForEvents(source, target)

    expect(instructions).toEqual([])
  })

  it('is empty when all the events are the same', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    source.eventMaps = {
      click: {
        domEvent: 'click',
        busEvent: 'save-to-somewhere',
        listener: vi.fn(),
      },
    }
    const target = dom.createElement('button') as JaxsElement
    target.eventMaps = {
      click: {
        domEvent: 'click',
        busEvent: 'save-to-somewhere',
        listener: vi.fn(),
      },
    }

    const instructions = compileForEvents(source, target)

    expect(instructions).toEqual([])
  })

  it('creates remove instructions when an event is no longer in the target', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    source.eventMaps = {
      click: {
        domEvent: 'click',
        busEvent: 'save-to-server',
        listener: vi.fn(),
      },
    }
    const target = dom.createElement('button') as JaxsElement
    target.eventMaps = {}

    const instructions = compileForEvents(source, target)

    expect(instructions).toEqual([
      {
        source,
        target,
        type: ChangeInstructionTypes.removeEvent,
        data: {
          name: 'click',
          value: source.eventMaps.click.listener,
        },
      },
    ])
  })

  it('creates an add instruction when a different event has been added to the target', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    source.eventMaps = {}
    const target = dom.createElement('button') as JaxsElement
    target.eventMaps = {
      click: {
        domEvent: 'click',
        busEvent: 'save-to-server',
        listener: vi.fn(),
      },
    }

    const instructions = compileForEvents(source, target)

    expect(instructions).toEqual([
      {
        source,
        target,
        type: ChangeInstructionTypes.addEvent,
        data: {
          name: 'click',
          value: target.eventMaps.click.listener,
        },
      },
    ])
  })

  it('creates an update instruction when an event of a certain name has changed', () => {
    const dom = createTestDom()
    const source = dom.createElement('button') as JaxsElement
    source.eventMaps = {
      click: {
        domEvent: 'click',
        busEvent: 'save-to-server',
        listener: vi.fn(),
      },
    }
    const target = dom.createElement('button') as JaxsElement
    target.eventMaps = {
      click: {
        domEvent: 'click',
        busEvent: 'save-locally',
        listener: vi.fn(),
      },
    }

    const instructions = compileForEvents(source, target)

    expect(instructions).toEqual([
      {
        source,
        target,
        type: ChangeInstructionTypes.updateEvent,
        data: {
          name: 'click',
          targetValue: target.eventMaps.click.listener,
          sourceValue: source.eventMaps.click.listener,
        },
      },
    ])
  })
})
