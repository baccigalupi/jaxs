export const findHref = (node: HTMLElement) => {
  const found = node.closest('[href]')
  if (!found) {
    return ''
  } else {
    return found.getAttribute('href') || ''
  }
}
