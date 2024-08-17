import { expect, describe, it, vi } from 'vitest'
import { createTestDom } from '../../support/test-dom'
import {
  setAttributesOnElement,
  setEventsOnElement,
  createNode,
  createDecoratedNode,
} from '../../../lib/rendering/dom/tag'
import { createRenderKit } from '../../support/render-kit'

describe('element dom management', () => {
  describe('setAttributesOnElement', () => {
    it('ignores __self attributes, because what?', () => {
      const document = createTestDom()
      const element = document.createElement('P')
      const attributes = {
        min: 1,
        __self: 'foo',
      }

      setAttributesOnElement(element, attributes)

      expect(element.getAttribute('min')).toEqual('1')
      expect(element.getAttribute('__self')).toEqual(null)
    })

    it('when adding a value to an input, it sets it correctly', () => {
      const document = createTestDom()
      const element = document.createElement('INPUT')
      const attributes = {
        type: 'text',
        name: 'username',
        value: 'Jasmine',
      }

      setAttributesOnElement(element, attributes)

      expect(element.getAttribute('type')).toEqual('text')
      expect(element.getAttribute('name')).toEqual('username')
      expect(element.value).toEqual('Jasmine')
    })
  })

  describe('setEventsOnElement', () => {
    it('adds event listeners to the element that publish the data correctly', () => {
      const events = {
        click: 'save-thingy',
      }
      const document = createTestDom()
      const element = document.createElement('BUTTON')
      const publish = vi.fn()

      setEventsOnElement(element, events, publish)

      const event = new document.defaultView.MouseEvent('click')
      element.dispatchEvent(event)

      expect(publish).toHaveBeenCalledWith('save-thingy', event)
    })

    it('caches event data on the element to make modification easier', () => {
      const events = {
        click: 'save-thingy',
      }
      const document = createTestDom()
      const element = document.createElement('BUTTON')
      const publish = vi.fn()

      setEventsOnElement(element, events, publish)

      const clickMap = element.eventMaps.click
      expect(clickMap.busEvent).toEqual('save-thingy')
      expect(clickMap.domEvent).toEqual('click')

      const event = new document.defaultView.MouseEvent('click')
      clickMap.listener(event)
      expect(publish).toHaveBeenCalledWith('save-thingy', event)
    })
  })

  describe('createNode', () => {
    it('creates a node of the right type', () => {
      const document = createTestDom()

      const input = createNode('INPUT', document)

      expect(input instanceof document.defaultView.HTMLInputElement).toEqual(
        true,
      )
    })
  })

  describe('createDecoratedNode', () => {
    it('creates a node with attributes and events', () => {
      const renderKit = createRenderKit()

      const element = createDecoratedNode(
        'INPUT',
        { name: 'username', id: 'user-name', value: 'Georgio' },
        { change: 'update-store' },
        renderKit,
      )

      expect(element.id).toEqual('user-name')
      expect(element.getAttribute('name')).toEqual('username')
      expect((element as unknown as HTMLInputElement).value).toEqual('Georgio')

      const event = new renderKit.window.MouseEvent('change')
      element.dispatchEvent(event)
      expect(renderKit.publish).toHaveBeenCalledWith('update-store', event)
    })
  })
})
