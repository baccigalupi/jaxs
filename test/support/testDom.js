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
  const document = window.document;
  document.body.innerHTML = `<!DOCTYPE html><body>${content}<body>`
  return document
}
