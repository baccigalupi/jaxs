var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/rendering/dom/create.ts
var setAttributesOnElement = (element, attributes) => {
  for (const key in attributes) {
    if (key === "__self")
      continue;
    if (key === "value") {
      element.value = attributes[key];
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
};
var setEventsOnElement = (element, events, publish) => {
  const eventMaps = {};
  for (const domEvent in events) {
    const eventName = events[domEvent];
    const listener = (event) => publish(eventName, event);
    element.addEventListener(domEvent, listener);
    eventMaps[domEvent] = {
      domEvent,
      busEvent: eventName,
      listener
    };
  }
  element.eventMaps = eventMaps;
};
var createNode = (type, document) => {
  return document.createElement(type);
};
var createTextNode = (value, document) => {
  return document.createTextNode(value);
};
var createDecoratedNode = (type, attributes, events, renderKit) => {
  const dom = createNode(type, renderKit.document);
  setAttributesOnElement(dom, attributes);
  setEventsOnElement(dom, events, renderKit.publish);
  return dom;
};

// src/rendering/dom/attributesAndEvents.ts
var separateAttrsAndEvents = (combined, defaultValue = "") => {
  const attributes = {};
  const events = {};
  for (const key in combined) {
    const value = combined[key];
    if (key.match(/^on.+/i)) {
      const eventKey = key.slice(2).toLowerCase();
      events[eventKey] = value;
    } else {
      attributes[key] = normalizeValueForKey(combined, key, defaultValue);
    }
  }
  return {
    attributes,
    events
  };
};
var normalizeValueForKey = (object, key, defaultValue = "") => {
  if (object[key] === undefined)
    return defaultValue;
  return object[key];
};

// src/rendering/dom/svg.ts
var namespace = "http://www.w3.org/2000/svg";
var isSvgTag = (tagType) => tagType === "svg";
var isSvg = (element) => element.namespaceURI === namespace;
var createSvgNode = (type, attributes, renderKit) => {
  const { document } = renderKit;
  const node = document.createElementNS(namespace, type);
  for (const key in attributes) {
    if (key === "__self" || key === "xmlns")
      continue;
    node.setAttributeNS(null, key, attributes[key]);
  }
  return node;
};

// src/rendering/templates/text.ts
class TextTemplate {
  value;
  constructor(content) {
    this.value = content.toString();
  }
  render(renderKit) {
    const textNode = createTextNode(this.value, renderKit.document);
    if (!textNode)
      return [];
    textNode.__jsx = "TextNode";
    return [textNode];
  }
}

// src/rendering/templates/children.ts
var ensureArray = (children) => {
  if (Array.isArray(children)) {
    return children.flat();
  }
  if (!children) {
    return [];
  }
  return [children];
};
var recursiveRender = (children, renderKit, rendered = []) => children.reduce(renderReducer(renderKit), rendered).flat();
var renderReducer = (renderKit) => (aggregate, view) => {
  if (!view)
    return aggregate;
  if (Array.isArray(view)) {
    const dom = recursiveRender(view, renderKit, aggregate);
    return dom;
  }
  view.render(renderKit).forEach((template) => aggregate.push(template));
  return aggregate;
};
var replaceTextNodes = (child) => {
  if (isTextNode(child)) {
    return textNode(child);
  }
  return child;
};
var isTextNode = (child) => {
  return typeof child === "string" || typeof child === "number";
};
var textNode = (content) => {
  return new TextTemplate(content);
};
var withSvgFlag = (isSvg2) => (template) => {
  template && (template.isSvg = template.isSvg || isSvg2);
  return template;
};

class Children {
  collection;
  parentElement;
  isSvg;
  constructor(jsxChildren, isSvg2 = false) {
    this.collection = ensureArray(jsxChildren);
    this.collection = this.collection.map(replaceTextNodes);
    this.collection = this.collection.flat();
    this.collection = this.collection.map(withSvgFlag(isSvg2));
    this.isSvg = isSvg2;
  }
  render(renderKit, parentElement) {
    this.parentElement = parentElement;
    const dom = this.generateDom(renderKit);
    this.attachToParent(dom);
    return dom;
  }
  generateDom(renderKit) {
    return recursiveRender(this.collection, renderKit);
  }
  attachToParent(dom) {
    if (this.parentElement === undefined)
      return;
    const parent = this.parentElement;
    dom.forEach((node) => parent.appendChild(node));
  }
}

// src/rendering/templates/tag.ts
class Tag {
  type;
  events;
  attributes;
  children;
  isSvg;
  constructor(tagType, combinedAttributes, children2, isSvg2 = false) {
    this.type = tagType;
    const { events, attributes } = separateAttrsAndEvents(combinedAttributes);
    this.events = events;
    this.attributes = attributes;
    this.isSvg = isSvg2 || isSvgTag(this.type);
    this.children = new Children(children2, this.isSvg);
  }
  render(renderKit) {
    const dom = this.generateDom(renderKit);
    if (!dom)
      return [];
    this.children.render(renderKit, dom);
    return [dom];
  }
  generateDom(renderKit) {
    if (this.isSvg) {
      return this.generateSvnDom(renderKit);
    } else {
      return this.generateHtmlDom(renderKit);
    }
  }
  generateHtmlDom(renderKit) {
    const node = createDecoratedNode(this.type, this.attributes, this.events, renderKit);
    node.__jsx = this.key();
    return node;
  }
  generateSvnDom(renderKit) {
    const node = createSvgNode(this.type, this.attributes, renderKit);
    node.__jsx = this.key();
    return node;
  }
  key() {
    return this.attributes.key || this.source() || this.createKey();
  }
  source() {
    if (this.attributes.__source) {
      const { fileName, lineNumber, columnNumber } = this.attributes.__source;
      return `${fileName}:${lineNumber}:${columnNumber}`;
    }
  }
  createKey() {
    const id = this.attributes.id ? `#${this.attributes.id}` : "";
    const type = this.attributes.type ? `[type=${this.attributes.type}]` : "";
    const name = this.attributes.name ? `[name=${this.attributes.name}]` : "";
    return `${this.type}${id}${type}${name}`;
  }
}

// src/jsx.js
var ensureChildrenArray = (maybeChildren, attributes) => maybeChildren || attributes.children || [];
var packageAttributes = (maybeAttributes, maybeChildren) => {
  const attributes = maybeAttributes || {};
  const children3 = ensureChildrenArray(maybeChildren, attributes);
  attributes.children = attributes.children || children3;
  return attributes;
};
var jsx = (type, attributes, ...children3) => {
  if (typeof type === "string") {
    return new Tag(type, attributes, children3);
  }
  return type(packageAttributes(attributes, children3));
};
jsx.fragment = (attributes, maybeChildren) => {
  const children3 = ensureChildrenArray(maybeChildren, attributes);
  return new Children(children3);
};
var jsx_default = jsx;
// src/rendering/templates/root.ts
class Root {
  template;
  selector;
  renderKit;
  dom;
  parentElement;
  constructor(template, selector, renderKit) {
    this.template = template;
    this.selector = selector;
    this.renderKit = renderKit;
    this.dom = [];
    this.parentElement = null;
  }
  renderAndAttach(renderKit) {
    this.parentElement = this.getParentElement();
    this.dom = this.render({ ...renderKit, parent: this.parentElement });
    if (this.parentElement) {
      this.attach();
    }
  }
  render(renderKit) {
    return this.template.render(renderKit);
  }
  attach() {
    this.parentElement && (this.parentElement.innerHTML = "");
    this.dom.forEach((element) => {
      this.parentElement && this.parentElement.appendChild(element);
    });
  }
  getParentElement() {
    return this.renderKit.document.querySelector(this.selector);
  }
}
var render = (template, selector, renderKit) => {
  const root = new Root(template, selector, renderKit);
  root.renderAndAttach(renderKit);
  return root;
};
// src/state/testingTypes.js
var isBoolean = (value) => typeof value === "boolean";
var isNumber = (value) => typeof value === "number";
var isString = (value) => typeof value === "string";
var isArray = (value) => Array.isArray(value);
var isObject = (value) => value !== null && !isArray(value) && typeof value === "object";

// src/state/equality.js
var areElementEqual = (oldValue, newValue) => oldValue === newValue;
var keyLengthSame = (oldValue, newValue) => Object.keys(oldValue).length === Object.keys(newValue).length;
var areObjectsEqual = (oldValue, newValue) => {
  if (!(isObject(oldValue) && isObject(newValue)))
    return false;
  if (!keyLengthSame(oldValue, newValue))
    return false;
  Object.keys(oldValue).every((key) => {
    const oldInnerValue = oldValue[key];
    const newInnerValue = newValue[key];
    return areEqual(oldInnerValue, newInnerValue);
  });
};
var areArraysEqual = (oldValue, newValue) => {
  if (!(isArray(oldValue) && isArray(newValue)))
    return false;
  if (oldValue.length !== newValue.length)
    return false;
  oldValue.every((oldInnerValue, index) => {
    const newInnerValue = newValue[index];
    return areEqual(oldInnerValue, newInnerValue);
  });
};
var areEqual = (oldValue, newValue) => {
  if (isObject(oldValue))
    return areObjectsEqual(oldValue, newValue);
  if (isArray(oldValue))
    return areArraysEqual(oldValue, newValue);
  return areElementEqual(oldValue, newValue);
};

// src/state/stores.js
class GeneralStore {
  nullEvent = {};
  constructor({ name, value, parent }) {
    this.name = name;
    this.value = value;
    this.parent = parent;
    this.initialState = value;
  }
  update(newValue) {
    if (this.isEqual(newValue))
      return;
    this.value = newValue;
    return this.parent.publish(this.event());
  }
  reset() {
    this.update(this.initialState);
  }
  isEqual(newValue) {
    return areElementEqual(this.value, newValue);
  }
  event() {
    return {
      name: this.name,
      value: this.value
    };
  }
}

class BooleanStore extends GeneralStore {
  toggle() {
    this.update(!this.value);
  }
}

class NumericStore extends GeneralStore {
}

class StringStore extends GeneralStore {
}

class ListStore extends GeneralStore {
  isEqual(newValue) {
    return areArraysEqual(this.value, newValue);
  }
  push(newValue) {
    const value = [...this.value, newValue];
    this.update(value);
  }
}

class RecordStore extends GeneralStore {
  isEqual(newValue) {
    return areObjectsEqual(this.value, newValue);
  }
}

// src/state.js
var eventPrefix = "state-change";
var eventName = (name) => `${eventPrefix}:${name}`;

class State {
  constructor(publish) {
    this.publisher = publish;
    this.stores = {};
    this.events = [];
    this.transacting = false;
  }
  create(name, value) {
    const StoreClass = this.storeTypeFor(value);
    const store = new StoreClass({ name, value, parent: this });
    this.addStore(name, store);
  }
  add(store) {
    const name = store.name;
    this.addStore(name, store);
  }
  getStore(name) {
    return this.stores[name];
  }
  addStore(name, store) {
    this.stores[name] = store;
    this[name] = store;
  }
  storeTypeFor(value) {
    if (isArray(value))
      return ListStore;
    if (isObject(value))
      return RecordStore;
    if (isNumber(value))
      return NumericStore;
    if (isBoolean(value))
      return BooleanStore;
    if (isString(value))
      return StringStore;
    return GeneralStore;
  }
  publish(event) {
    this.events.push(event);
    if (!this.transacting)
      this.publishAll();
  }
  publishAll() {
    const publishedStores = [];
    this.events.reverse().forEach((event) => {
      const { name, value } = event;
      if (!publishedStores.includes(name)) {
        publishedStores.push(name);
        this.publisher(`${eventPrefix}:${name}`, value);
      }
    });
    this.events = [];
  }
  transaction(setter) {
    this.transacting = true;
    setter(this);
    this.transacting = false;
    this.publishAll();
  }
  value() {
    return Object.keys(this.stores).reduce((valueObject, key) => {
      valueObject[key] = this.stores[key].value;
      return valueObject;
    }, {});
  }
}

// src/types.ts
var ChangeInstructions;
(function(ChangeInstructions2) {
  ChangeInstructions2[ChangeInstructions2["removeNode"] = 0] = "removeNode";
  ChangeInstructions2[ChangeInstructions2["insertNode"] = 1] = "insertNode";
  ChangeInstructions2[ChangeInstructions2["replaceNode"] = 2] = "replaceNode";
  ChangeInstructions2[ChangeInstructions2["removeAttribute"] = 3] = "removeAttribute";
  ChangeInstructions2[ChangeInstructions2["addAttribute"] = 4] = "addAttribute";
  ChangeInstructions2[ChangeInstructions2["updateAttribute"] = 5] = "updateAttribute";
  ChangeInstructions2[ChangeInstructions2["removeEvent"] = 6] = "removeEvent";
  ChangeInstructions2[ChangeInstructions2["addEvent"] = 7] = "addEvent";
  ChangeInstructions2[ChangeInstructions2["updateEvent"] = 8] = "updateEvent";
  ChangeInstructions2[ChangeInstructions2["changeValue"] = 9] = "changeValue";
  ChangeInstructions2[ChangeInstructions2["changeText"] = 10] = "changeText";
})(ChangeInstructions || (ChangeInstructions = {}));

// src/rendering/change/instructions/generate.ts
var changeText = (source, target) => ({
  source,
  target,
  type: ChangeInstructions.changeText,
  data: {}
});
var replaceNode = (source, target) => ({
  source,
  target,
  type: ChangeInstructions.replaceNode,
  data: {}
});
var removeAttribute = (source, target, data) => ({
  source,
  target,
  data,
  type: ChangeInstructions.removeAttribute
});
var addAttribute = (source, target, data) => ({
  source,
  target,
  data,
  type: ChangeInstructions.addAttribute
});
var updateAttribute = (source, target, data) => ({
  source,
  target,
  data,
  type: ChangeInstructions.updateAttribute
});
var removeEvent = (source, target, data) => ({
  source,
  target,
  data,
  type: ChangeInstructions.removeEvent
});
var addEvent = (source, target, data) => ({
  source,
  target,
  data,
  type: ChangeInstructions.addEvent
});
var updateEvent = (source, target, data) => ({
  source,
  target,
  data,
  type: ChangeInstructions.updateEvent
});
var removeNode = (source) => ({
  source,
  target: source,
  type: ChangeInstructions.removeNode,
  data: {}
});
var insertNode = (target, data) => ({
  target,
  source: target,
  type: ChangeInstructions.insertNode,
  data
});
var changeValue = (source, target, data) => ({
  source,
  target,
  type: ChangeInstructions.changeValue,
  data
});

// src/rendering/change/instructions/idMap.js
var nullMatch = { index: -1 };

class IdMap {
  constructor() {
    this.map = {};
  }
  populate(list) {
    list.forEach((element, i) => {
      const id = element.__jsx;
      if (id) {
        this.map[id] = this.map[id] || [];
        this.map[id].push({
          element,
          index: i
        });
      }
    });
  }
  pullMatch(element) {
    const id = element && element.__jsx;
    if (!id)
      return nullMatch;
    if (!(this.map[id] && this.map[id].length))
      return nullMatch;
    return this.map[id].shift();
  }
  clear(element) {
    const id = element && element.__jsx;
    if (!(id && this.map[id] && this.map[id].length))
      return;
    const matches = this.map[id];
    this.map[id] = matches.reduce((collection, possibleMatch) => {
      if (possibleMatch.element !== element)
        collection.push(possibleMatch);
      return collection;
    }, []);
  }
  check(element) {
    const id = element && element.__jsx;
    if (!(id && this.map[id]))
      return false;
    return this.map[id].length > 0;
  }
  remaining() {
    return Object.values(this.map).flat();
  }
}
var createIdMap = (list) => {
  const map = new IdMap;
  map.populate(list);
  return map;
};

// src/rendering/change/instructions/attributes.ts
var compileForAttributes = (source, target, isSvg2 = false) => {
  const instructions = [];
  const sourceAttributes = source.attributes;
  const sourceLength = sourceAttributes.length;
  const targetAttributes = target.attributes;
  const targetLength = targetAttributes.length;
  let index;
  let innerIndex;
  let matchingAttribute;
  for (index = 0;index < sourceLength; index++) {
    matchingAttribute = null;
    const sourceAttribute = sourceAttributes.item(index);
    if (!sourceAttribute)
      continue;
    for (innerIndex = 0;innerIndex < targetLength; innerIndex++) {
      const targetAttribute = targetAttributes.item(innerIndex);
      if (!targetAttribute)
        continue;
      if (sourceAttribute.name == targetAttribute.name) {
        matchingAttribute = targetAttribute;
        break;
      }
    }
    if (!matchingAttribute) {
      instructions.push(removeAttribute(source, target, { name: sourceAttribute.name, isSvg: isSvg2 }));
    } else if (sourceAttribute.value !== matchingAttribute.value) {
      instructions.push(updateAttribute(source, target, {
        name: sourceAttribute.name,
        value: matchingAttribute.value,
        isSvg: isSvg2
      }));
    }
  }
  for (index = 0;index < targetLength; index++) {
    matchingAttribute = null;
    const targetAttribute = targetAttributes.item(index);
    if (!targetAttribute)
      continue;
    for (innerIndex = 0;innerIndex < sourceLength; innerIndex++) {
      const sourceAttribute = sourceAttributes.item(innerIndex);
      if (!sourceAttribute)
        continue;
      if (sourceAttribute.name == targetAttribute.name) {
        matchingAttribute = sourceAttribute;
        break;
      }
    }
    if (!matchingAttribute) {
      instructions.push(addAttribute(source, target, {
        name: targetAttribute.name,
        value: targetAttribute.value,
        isSvg: isSvg2
      }));
    }
  }
  return instructions;
};

// src/rendering/change/instructions/events.ts
var compileForEvents = (source, target) => {
  const instructions = [];
  const sourceEventMaps = source.eventMaps;
  const targetEventMaps = target.eventMaps;
  const sourceDomEvents = Object.keys(sourceEventMaps);
  const targetDomEvents = Object.keys(targetEventMaps);
  sourceDomEvents.forEach((domEvent) => {
    const sourceEventMap = sourceEventMaps[domEvent];
    const targetEventMap = targetEventMaps[domEvent];
    if (!targetEventMap) {
      instructions.push(removeEvent(source, target, {
        name: sourceEventMap.domEvent,
        value: sourceEventMap.listener
      }));
    } else if (targetEventMap.busEvent !== sourceEventMap.busEvent) {
      instructions.push(updateEvent(source, target, {
        name: domEvent,
        targetValue: targetEventMap.listener,
        sourceValue: sourceEventMap.listener
      }));
    }
  });
  targetDomEvents.forEach((domEvent) => {
    const sourceEventMap = sourceEventMaps[domEvent];
    const targetEventMap = targetEventMaps[domEvent];
    if (!sourceEventMap) {
      instructions.push(addEvent(source, target, {
        name: targetEventMap.domEvent,
        value: targetEventMap.listener
      }));
    }
  });
  return instructions;
};

// src/rendering/change/instructions/element.ts
var compileForElement = (source, target) => {
  const attributeInstructions = compileForAttributes(source, target);
  const eventInstructions = compileForEvents(source, target);
  const valueInstructions = compileForInputValue(source, target);
  return attributeInstructions.concat(eventInstructions).concat(valueInstructions);
};
var compileForSvg = (source, target) => {
  return compileForAttributes(source, target, true);
};
var compileForInputValue = (sourceElement, targetElement) => {
  const instructions = [];
  if (sourceElement.tagName !== "INPUT") {
    return instructions;
  }
  const source = sourceElement;
  const target = targetElement;
  if (source.value !== target.value) {
    instructions.push(changeValue(source, target, { name: "value", value: target.value }));
  }
  return instructions;
};

// src/rendering/change/instructions/text.ts
var compileForText = (source, target) => {
  if (source.textContent !== target.textContent) {
    return [changeText(source, target)];
  }
  return [];
};

// src/rendering/change/instructions/node.ts
var NodeTypes;
(function(NodeTypes2) {
  NodeTypes2[NodeTypes2["ElementNode"] = 1] = "ElementNode";
  NodeTypes2[NodeTypes2["TextNode"] = 3] = "TextNode";
})(NodeTypes || (NodeTypes = {}));
var compileForNodeGenerator = (compileForCollection) => (source, target) => {
  let instructions = [];
  if (source.nodeType === NodeTypes.ElementNode && isSvg(source)) {
    const sourceElement = source;
    const targetElement = target;
    const baseInstructions = compileForSvg(sourceElement, targetElement);
    const childrenInstructions = compileForCollection(sourceElement.childNodes, targetElement.childNodes, sourceElement);
    instructions = baseInstructions.concat(childrenInstructions);
  } else if (source.nodeType === NodeTypes.ElementNode) {
    const sourceElement = source;
    const targetElement = target;
    const baseInstructions = compileForElement(sourceElement, targetElement);
    const childrenInstructions = compileForCollection(sourceElement.childNodes, targetElement.childNodes, sourceElement);
    instructions = baseInstructions.concat(childrenInstructions);
  } else if (source.nodeType === NodeTypes.TextNode) {
    instructions = compileForText(source, target);
  }
  return instructions;
};

// src/rendering/change/instructions/children.ts
var compileChildren = (sourceList, targetList, parent) => {
  const baseInstructions = [];
  const length = largerLength(sourceList, targetList);
  const sourceMap = createIdMap(sourceList);
  const targetMap = createIdMap(targetList);
  const nodesPairsToDiff = [];
  let index = 0;
  for (;index < length; index++) {
    const source = sourceList[index];
    const target = targetList[index];
    if (target && targetMap.check(target)) {
      const matchingSource = sourceMap.pullMatch(target);
      targetMap.clear(target);
      if (matchingSource.element) {
        if (matchingSource.index !== index) {
          baseInstructions.push(insertNode(matchingSource.element, { parent, index }));
        }
        nodesPairsToDiff.push({
          source: matchingSource.element,
          target
        });
      } else if (source) {
        if (targetMap.check(source)) {
          baseInstructions.push(insertNode(target, { parent, index }));
        } else {
          sourceMap.clear(source);
          baseInstructions.push(replaceNode(source, target));
        }
      } else {
        baseInstructions.push(insertNode(target, { parent, index }));
      }
    } else if (source) {
      const matchingSource = sourceMap.pullMatch(source);
      if (matchingSource.element) {
        baseInstructions.push(removeNode(source));
      }
    }
  }
  sourceMap.remaining().forEach(({ element: element2 }) => {
    baseInstructions.push(removeNode(element2));
  });
  const nodeInstructions = nodesPairsToDiff.reduce((collection, { source, target }) => {
    return collection.concat(compileForNode(source, target));
  }, []);
  return baseInstructions.concat(nodeInstructions).sort(instructionsSorter);
};
var instructionsSorter = (left, right) => {
  if (left.type > right.type)
    return 1;
  if (left.type < right.type)
    return -1;
  return 0;
};
var largerLength = (sourceList, targetList) => {
  const sourceLength = Array.from(sourceList).length;
  const targetLength = Array.from(targetList).length;
  return sourceLength > targetLength ? sourceLength : targetLength;
};
var compileForNode = compileForNodeGenerator(compileChildren);
// src/rendering/change.ts
var change = (source, target, parent) => {
  const instructions = compileChildren(source, target, parent);
  instructions.forEach((instruction) => {
    performInstruction(instruction);
  });
};
var performInstruction = (instruction) => {
  const performer = performers[instruction.type] || noop;
  performer(instruction);
};
var noop = (_instruction) => {
};
var changeText2 = (instruction) => {
  const { source, target } = instruction;
  source.nodeValue = target.textContent;
};
var removeNode2 = (instruction) => {
  const { source } = instruction;
  source.remove();
};
var insertNode2 = (instruction) => {
  const { target, data } = instruction;
  const { parent, index } = data;
  const sibling = parent.childNodes[index];
  if (!sibling) {
    parent.appendChild(target);
  } else if (sibling && sibling !== target) {
    parent.insertBefore(target, sibling);
  }
};
var replaceNode2 = (instruction) => {
  const { source, target } = instruction;
  source.replaceWith(target);
};
var removeAttribute2 = (instruction) => {
  const { source, data } = instruction;
  const { name, isSvg: isSvg2 } = data;
  if (isSvg2) {
    source.removeAttributeNS(null, name);
  } else {
    source.removeAttribute(name);
  }
};
var addAttribute2 = (instruction) => {
  const { source, data } = instruction;
  const { name, value, isSvg: isSvg2 } = data;
  if (isSvg2) {
    source.setAttributeNS(null, name, value);
  } else {
    source.setAttribute(name, value);
  }
};
var updateAttribute2 = (instruction) => {
  addAttribute2(instruction);
};
var removeEvent2 = (instruction) => {
  const data = instruction.data;
  const source = instruction.source;
  const { name, value } = data;
  source.removeEventListener(name, value);
};
var addEvent2 = (instruction) => {
  const data = instruction.data;
  const source = instruction.source;
  const { name, value } = data;
  source.addEventListener(name, value);
};
var updateEvent2 = (instruction) => {
  const data = instruction.data;
  const source = instruction.source;
  const { name, sourceValue, targetValue } = data;
  source.removeEventListener(name, sourceValue);
  source.addEventListener(name, targetValue);
};
var changeValue2 = (instruction) => {
  const data = instruction.data;
  const source = instruction.source;
  const { value } = data;
  source.value = value;
};
var performers = {
  [ChangeInstructions.changeText]: changeText2,
  [ChangeInstructions.removeNode]: removeNode2,
  [ChangeInstructions.insertNode]: insertNode2,
  [ChangeInstructions.replaceNode]: replaceNode2,
  [ChangeInstructions.removeAttribute]: removeAttribute2,
  [ChangeInstructions.addAttribute]: addAttribute2,
  [ChangeInstructions.updateAttribute]: updateAttribute2,
  [ChangeInstructions.removeEvent]: removeEvent2,
  [ChangeInstructions.addEvent]: addEvent2,
  [ChangeInstructions.updateEvent]: updateEvent2,
  [ChangeInstructions.changeValue]: changeValue2
};

// src/rendering/templates/bound.js
var passThroughViewModel = (state2) => state2;

class Bound {
  constructor(TemplateClass, viewModel, subscriptions, attributes2) {
    this.TemplateClass = TemplateClass;
    this.viewModel = viewModel || passThroughViewModel;
    this.attributes = attributes2 || {};
    this.subscriptions = subscriptions;
    this.dom = [];
  }
  render(renderKit) {
    this.parentElement = renderKit.parent;
    this.renderKit = renderKit;
    this.subscribeForRerender();
    this.dom = this._render(renderKit);
    return this.dom;
  }
  _render(renderKit) {
    const props = {
      ...this.attributes,
      ...this.viewModel(renderKit.state.value())
    };
    const template = this.TemplateClass(props);
    const dom = !template ? [] : template.render(renderKit);
    return dom;
  }
  rerender() {
    if (!this.parentElement) {
      this.parentElement = this.dom[0] && this.dom[0].parentElement;
    }
    const newDom = this._render(this.renderKit);
    change(this.dom, newDom, this.parentElement);
    if (this.parentElement) {
      this.dom = Array.from(this.parentElement.childNodes);
    }
  }
  subscribeForRerender() {
    this.subscriptions.forEach((storeName) => {
      this.renderKit.subscribe(eventName(storeName), () => this.rerender());
    });
  }
}
var bind = ({ Template, viewModel, subscriptions }) => {
  subscriptions = subscriptions || [];
  return (attributes2) => new Bound(Template, viewModel, subscriptions, attributes2);
};
// src/messageBus.ts
class MessageBus {
  listeners;
  options;
  constructor() {
    this.options = {};
    this.listeners = {};
  }
  subscribe(eventName2, listener) {
    this.ensureListenerCollection(eventName2);
    this.listeners[eventName2].push(listener);
  }
  publish(eventName2, payload) {
    const listeners = this.listeners[eventName2];
    if (!listeners)
      return false;
    listeners.forEach((listener) => {
      listener(payload, this.buildListenerKit(eventName2));
    });
    return true;
  }
  ensureListenerCollection(eventName2) {
    if (this.listeners[eventName2])
      return;
    this.listeners[eventName2] = [];
  }
  buildListenerKit(eventName2) {
    return {
      eventName: eventName2,
      publish: this.publish.bind(this),
      ...this.options
    };
  }
  addListenerOptions(options) {
    this.options = {
      ...this.options,
      ...options
    };
  }
}
var createBus = () => {
  const bus = new MessageBus;
  const publish = bus.publish.bind(bus);
  const subscribe = bus.subscribe.bind(bus);
  return {
    bus,
    publish,
    subscribe
  };
};
// src/navigation/routeState.js
var createRouteState = (state2) => {
  const store = new RecordStore({
    name: "route",
    value: {
      host: "",
      path: "",
      query: ""
    },
    parent: state2
  });
  state2.add(store);
};

// src/navigation/setupHistory.js
var locationChangeEvent = "locationChange";
var routeChangeEvent = "routeChange";
var extractQueryParams = (queryString) => {
  return queryString.replace(/^\?/, "").split("&").reduce((aggregate, pairString) => {
    if (!pairString)
      return aggregate;
    const pair = pairString.split("=");
    aggregate[pair[0]] = pair[1];
    return aggregate;
  }, {});
};
var onLocationChange = (_payload, { publish, state: state2, window }) => {
  const { host, pathname, search } = window.location;
  const path = pathname;
  const query = extractQueryParams(search);
  state2.route.update({
    host,
    path,
    query
  });
  publish(routeChangeEvent, { host, path, query });
};
var setupHistory = (app) => {
  const { publish, subscribe, state: state2, window } = app;
  createRouteState(state2);
  window.addEventListener("popstate", () => publish(locationChangeEvent));
  subscribe(locationChangeEvent, onLocationChange);
};

// src/navigation/findHref.js
var findHref = (node2) => {
  if (!node2 || !node2.getAttribute)
    return "";
  while (!node2.getAttribute("href")) {
    node2 = node2.parentNode;
    if (!node2 || !node2.getAttribute)
      return "";
  }
  return node2.getAttribute("href");
};

// src/navigation/setupNavigation.js
var linkNavigationEvent = "goToHref";
var programmaticNavigationEvent = "navigate";
var navigate = (path, { publish, window }) => {
  window.history.pushState(null, "", path);
  publish(locationChangeEvent);
};
var onLinkClick = (domEvent, { publish, window }) => {
  if (!domEvent || !domEvent.target)
    return;
  domEvent.preventDefault();
  const href = findHref(domEvent.target);
  navigate(href, { publish, window });
};
var setupNavigation = (app) => {
  const { subscribe } = app;
  subscribe(linkNavigationEvent, onLinkClick);
  subscribe(programmaticNavigationEvent, navigate);
};

// src/app.ts
var setupBus = (app) => {
  const { publish, subscribe, bus } = createBus();
  app.publish = publish;
  app.subscribe = subscribe;
  app.bus = bus;
};
var setupState = (app) => {
  const state3 = new State(app.publish);
  app.state = state3;
};
var connectBusToState = (app) => {
  const { bus } = app;
  bus.addListenerOptions({
    state: app.state,
    document: app.document,
    window: app.window
  });
};
var setupRenderKit = (app) => {
  app.renderKit = {
    publish: app.publish,
    subscribe: app.subscribe,
    state: app.state,
    document: app.document,
    window: app.window
  };
};
var triggerRoute = (app) => {
  const publish = app.publish;
  setTimeout(() => {
    publish(locationChangeEvent, null);
  }, 0);
};
var addRender = (app) => {
  app.render = (template, selector) => {
    return render(template, selector, app.renderKit);
  };
};
var setupDomEnvironment = (app, domEnvironment) => {
  const { window, document } = domEnvironment;
  if (window) {
    app.window = window;
    app.document = window.document;
  } else if (document) {
    app.window = document.defaultView;
    app.document = document;
  } else {
    app.window = window;
    app.document = window?.document;
  }
};
var createApp = (domEnvironment) => {
  const app = {};
  setupDomEnvironment(app, domEnvironment || {});
  setupBus(app);
  setupState(app);
  connectBusToState(app);
  setupRenderKit(app);
  setupHistory(app);
  setupNavigation(app);
  triggerRoute(app);
  addRender(app);
  return app;
};
// src/navigation.ts
var exports_navigation = {};
__export(exports_navigation, {
  setupNavigation: () => {
    {
      return setupNavigation;
    }
  },
  setupHistory: () => {
    {
      return setupHistory;
    }
  }
});
export {
  render,
  exports_navigation as navigation,
  jsx_default as jsx,
  createBus,
  createApp,
  bind,
  State
};
