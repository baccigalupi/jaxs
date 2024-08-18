import { ReactSourceObject, TagAttributes } from '../../../types'

export class JsxKey {
  attributes: TagAttributes
  type: string

  constructor(type: string, attributes: TagAttributes) {
    this.type = type
    this.attributes = attributes
  }

  generate() {
    return (
      this.attributes.key || this.sourceKey() || this.createKeyFromAttributes()
    )
  }

  sourceKey() {
    if (this.attributes.__source) {
      const { fileName, lineNumber, columnNumber } = this.attributes
        .__source as unknown as ReactSourceObject
      return `${fileName}:${lineNumber}:${columnNumber}`
    }
  }

  createKeyFromAttributes() {
    const id = this.attributes.id ? `#${this.attributes.id}` : ''
    const type = this.attributes.type ? `[type=${this.attributes.type}]` : ''
    const name = this.attributes.name ? `[name=${this.attributes.name}]` : ''

    return `${this.type}${id}${type}${name}`
  }
}
