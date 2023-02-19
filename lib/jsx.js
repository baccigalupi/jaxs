import { Tag } from './rendering/templates/tag.ts';
import { Children } from './rendering/templates/children.ts';

// TODO: move into utils somewhere
const ensureChildrenArray = (maybeChildren, attributes) =>
  maybeChildren || attributes.children || [];

const packageAttributes = (maybeAttributes, maybeChildren) => {
  const attributes = maybeAttributes || {};
  const children = ensureChildrenArray(maybeChildren, attributes);
  attributes.children = attributes.children || children;
  return attributes;
};

const jsx = (type, attributes, ...children) => {
  if (typeof type === 'string') {
    return new Tag(type, attributes, children);
  }

  return type(packageAttributes(attributes, children));
};

jsx.fragment = (attributes, maybeChildren) => {
  const children = ensureChildrenArray(maybeChildren, attributes);
  return new Children(children);
};

export default jsx;
