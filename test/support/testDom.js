import { JSDOM } from 'jsdom'
import { spyOn } from 'bun:test'

export const setupWindow = () => {
  const dom = new JSDOM('<!DOCTYPE html>', {
    url: 'http://www.example.com/foo/bar?zardoz=weird'
  })
  spyOn(dom.window._virtualConsole, 'emit').mockImplementation(() => {})
  return dom
}

const defaultContent = '<div id=\'app\'></div>'

export const domToString = (element) => {
  if (element.outerHTML) return element.outerHTML
  if (Array.isArray(element)) return wrapElements(element).outerHTML

  return element.body.outerHTML
}

const wrapElements = (elements) => {
  const document = createTestDom()
  const wrapper = document.createElement('div')
  elements.forEach((element) => {
    wrapper.appendChild(element)
  })
  return wrapper
}

export const stripWhiteSpace = (string) => string.replace(/\s{2,}/g, '').trim()

export const createTestDom = (content = defaultContent) => {
  const dom = setupWindow()
  const document = dom.window.document
  document.body.innerHTML = `<!DOCTYPE html><body>${content}<body>`
  return document
}
