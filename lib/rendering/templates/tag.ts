// import type {
//   Attributes,
//   DomCollection,
//   TagEventAttributes,
//   RenderKit,
//   Template,
// } from '../../types';

// import { createDecoratedNode } from '../dom/create';
// import { separateAttrsAndEvents } from '../dom/attributesAndEvents';
// import { isSvgTag, createSvgNode } from '../dom/svg'
// import { Children } from './children';

// export class Tag implements Template {
//   type: string;
//   events: TagEventAttributes;
//   attributes: Attributes;
//   children: Children;
//   isSvg: boolean;

//   constructor(
//     tagType: string,
//     combinedAttributes: Attributes,
//     children: Template[],
//     isSvg = false
//   ) {
//     this.type = tagType;

//     const { events, attributes } = separateAttrsAndEvents(combinedAttributes);
//     this.events = events;
//     this.attributes = attributes;

//     this.isSvg = isSvg || isSvgTag(this.type);
//     this.children = new Children(children, this.isSvg);
//   }

//   render(renderKit: RenderKit): DomCollection {
//     const dom = this.generateDom(renderKit);
//     if (!dom) return [];

//     this.children.render(renderKit, dom);
//     return [dom];
//   }

//   generateDom(renderKit: RenderKit) {
//     if (this.isSvg) {
//       return this.generateSvnDom(renderKit)
//     } else {
//       return this.generateHtmlDom(renderKit)
//     }
//   }

//   generateHtmlDom(renderKit: RenderKit) {
//     const node = createDecoratedNode(
//       this.type,
//       this.attributes,
//       this.events,
//       renderKit,
//     );
//     node.__jsx = this.key();
//     return node;
//   }

//   generateSvnDom(renderKit: RenderKit) {
//     const node = createSvgNode(
//       this.type,
//       this.attributes,
//       renderKit,
//     );
//     node.__jsx = this.key();
//     return node;
//   }

//   key() {
//     return this.attributes.key || this.source() || this.createKey();
//   }

//   source() {
//     if (this.attributes.__source) {
//       const { fileName, lineNumber, columnNumber } = this.attributes.__source;
//       return `${fileName}:${lineNumber}:${columnNumber}`;
//     }
//   }

//   createKey() {
//     const id = this.attributes.id ? `#${this.attributes.id}` : '';
//     const type = this.attributes.type ? `[type=${this.attributes.type}]` : '';
//     const name = this.attributes.name ? `[name=${this.attributes.name}]` : '';

//     return `${this.type}${id}${type}${name}`;
//   }
// }
