const setAttributesOnElement = (element, attributes)=>{
    for(const key in attributes){
        if (key === "__source" || key === "__self") continue;
        if (key === 'value') {
            element.value = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
};
const setEventsOnElement = (element, events, publish)=>{
    const eventMaps = {};
    for(const domEvent in events){
        const eventName = events[domEvent];
        const listener = (event)=>publish(eventName, event);
        element.addEventListener(domEvent, listener);
        eventMaps[domEvent] = {
            domEvent: domEvent,
            busEvent: eventName,
            listener: listener
        };
    }
    element.eventMaps = eventMaps;
};
const createNode = (type, document1)=>{
    document1 = document1 || window.document;
    return document1.createElement(type);
};
const createTextNode = (value, document1)=>{
    document1 = document1 || window.document;
    return document1.createTextNode(value);
};
const createDecoratedNode = (type, attributes, events, renderKit)=>{
    const dom = createNode(type, renderKit.document);
    setAttributesOnElement(dom, attributes);
    setEventsOnElement(dom, events, renderKit.publish);
    return dom;
};
const separateAttrsAndEvents = (combined, defaultValue = '')=>{
    const attributes = {};
    const events = {};
    for(const key in combined){
        const value = combined[key];
        if (key.match(/on.+/i)) {
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
const normalizeValueForKey = (object, key, defaultValue = '')=>{
    if (object[key] === undefined) return defaultValue;
    return object[key];
};
class TextTemplate {
    value;
    constructor(content){
        this.value = content.toString();
    }
    render(renderKit) {
        const textNode = createTextNode(this.value, renderKit.document);
        if (!textNode) return [];
        return [
            textNode
        ];
    }
}
const ensureArray = (children)=>{
    if (Array.isArray(children)) {
        return children.flat();
    }
    if (!children) {
        return [];
    }
    return [
        children
    ];
};
const recursiveRender = (children, renderKit, rendered = [])=>children.reduce(renderReducer(renderKit), rendered).flat();
const renderReducer = (renderKit)=>(aggregate, view)=>{
        if (!view) return aggregate;
        if (Array.isArray(view)) {
            const dom = recursiveRender(view, renderKit, aggregate);
            return dom;
        }
        view.render(renderKit).forEach((template)=>aggregate.push(template));
        return aggregate;
    };
const replaceTextNodes = (child)=>{
    if (isTextNode(child)) {
        return textNode(child);
    }
    return child;
};
const isTextNode = (child)=>{
    return typeof child === 'string' || typeof child === 'number';
};
const textNode = (content)=>{
    return new TextTemplate(content);
};
class Children {
    collection;
    dom;
    parentElement;
    constructor(jsxChildren){
        this.collection = ensureArray(jsxChildren);
        this.collection = this.collection.map(replaceTextNodes);
        this.collection = this.collection.flat();
        this.dom = [];
    }
    render(renderKit, parentElement) {
        this.parentElement = parentElement;
        this.dom = this.generateDom(renderKit);
        this.attachToParent();
        return this.dom;
    }
    generateDom(renderKit) {
        return recursiveRender(this.collection, renderKit);
    }
    attachToParent() {
        if (this.parentElement === undefined) return;
        const parent = this.parentElement;
        this.dom.forEach((dom)=>parent.appendChild(dom));
    }
}
class Tag {
    type;
    events;
    attributes;
    children;
    constructor(tagType, combinedAttributes, children){
        this.type = tagType;
        const { events , attributes  } = separateAttrsAndEvents(combinedAttributes);
        this.events = events;
        this.attributes = attributes;
        this.children = new Children(children);
    }
    render(renderKit) {
        const dom = this.generateDom(renderKit);
        if (!dom) return [];
        this.children.render(renderKit, dom);
        return [
            dom
        ];
    }
    generateDom(renderKit) {
        return createDecoratedNode(this.type, this.attributes, this.events, renderKit);
    }
}
const ensureChildrenArray = (maybeChildren, attributes)=>maybeChildren || attributes.children || [];
const packageAttributes = (maybeAttributes, maybeChildren)=>{
    const attributes = maybeAttributes || {};
    const children = ensureChildrenArray(maybeChildren, attributes);
    attributes.children = attributes.children || children;
    return attributes;
};
const jsx = (type, attributes, ...children)=>{
    if (typeof type === 'string') {
        return new Tag(type, attributes, children);
    }
    return type(packageAttributes(attributes, children));
};
jsx.fragment = (attributes, maybeChildren)=>{
    const children = ensureChildrenArray(maybeChildren, attributes);
    return new Children(children);
};
var ChangeInstructions;
(function(ChangeInstructions) {
    ChangeInstructions[ChangeInstructions["changeText"] = 0] = "changeText";
    ChangeInstructions[ChangeInstructions["removeNode"] = 1] = "removeNode";
    ChangeInstructions[ChangeInstructions["addNode"] = 2] = "addNode";
    ChangeInstructions[ChangeInstructions["replaceNode"] = 3] = "replaceNode";
    ChangeInstructions[ChangeInstructions["removeAttribute"] = 4] = "removeAttribute";
    ChangeInstructions[ChangeInstructions["addAttribute"] = 5] = "addAttribute";
    ChangeInstructions[ChangeInstructions["updateAttribute"] = 6] = "updateAttribute";
    ChangeInstructions[ChangeInstructions["removeEvent"] = 7] = "removeEvent";
    ChangeInstructions[ChangeInstructions["addEvent"] = 8] = "addEvent";
    ChangeInstructions[ChangeInstructions["updateEvent"] = 9] = "updateEvent";
    ChangeInstructions[ChangeInstructions["changeValue"] = 10] = "changeValue";
})(ChangeInstructions || (ChangeInstructions = {}));
const changeText = (source, target)=>({
        source,
        target,
        type: ChangeInstructions.changeText,
        data: {}
    });
const replaceNode = (source, target)=>({
        source,
        target,
        type: ChangeInstructions.replaceNode,
        data: {}
    });
const removeAttribute = (source, target, data)=>({
        source,
        target,
        data,
        type: ChangeInstructions.removeAttribute
    });
const addAttribute = (source, target, data)=>({
        source,
        target,
        data,
        type: ChangeInstructions.addAttribute
    });
const updateAttribute = (source, target, data)=>({
        source,
        target,
        data,
        type: ChangeInstructions.updateAttribute
    });
const removeEvent = (source, target, data)=>({
        source,
        target,
        data,
        type: ChangeInstructions.removeEvent
    });
const addEvent = (source, target, data)=>({
        source,
        target,
        data,
        type: ChangeInstructions.addEvent
    });
const updateEvent = (source, target, data)=>({
        source,
        target,
        data,
        type: ChangeInstructions.updateEvent
    });
const removeNode = (source)=>({
        source,
        target: source,
        type: ChangeInstructions.removeNode,
        data: {}
    });
const addNode = (target, data)=>({
        target,
        source: target,
        type: ChangeInstructions.addNode,
        data
    });
const changeValue = (source, target, data)=>({
        source,
        target,
        type: ChangeInstructions.changeValue,
        data
    });
const compileForAttributes = (source, target)=>{
    const instructions = [];
    const sourceAttributes = source.attributes;
    const sourceLength = sourceAttributes.length;
    const targetAttributes = target.attributes;
    const targetLength = targetAttributes.length;
    let index;
    let innerIndex;
    let matchingAttribute;
    for(index = 0; index < sourceLength; index++){
        matchingAttribute = null;
        const sourceAttribute = sourceAttributes.item(index);
        if (!sourceAttribute) continue;
        for(innerIndex = 0; innerIndex < targetLength; innerIndex++){
            const targetAttribute = targetAttributes.item(innerIndex);
            if (!targetAttribute) continue;
            if (sourceAttribute.name == targetAttribute.name) {
                matchingAttribute = targetAttribute;
                break;
            }
        }
        if (!matchingAttribute) {
            instructions.push(removeAttribute(source, target, {
                name: sourceAttribute.name
            }));
        } else if (sourceAttribute.value !== matchingAttribute.value) {
            instructions.push(updateAttribute(source, target, {
                name: sourceAttribute.name,
                value: matchingAttribute.value
            }));
        }
    }
    for(index = 0; index < sourceLength; index++){
        matchingAttribute = null;
        const targetAttribute = targetAttributes.item(index);
        if (!targetAttribute) continue;
        for(innerIndex = 0; innerIndex < targetLength; innerIndex++){
            const sourceAttribute = sourceAttributes.item(innerIndex);
            if (!sourceAttribute) continue;
            if (sourceAttribute.name == targetAttribute.name) {
                matchingAttribute = sourceAttribute;
                break;
            }
        }
        if (!matchingAttribute) {
            instructions.push(addAttribute(source, target, {
                name: targetAttribute.name,
                value: targetAttribute.value
            }));
        }
    }
    return instructions;
};
const compileForEvents = (source, target)=>{
    const instructions = [];
    const sourceEventMaps = source.eventMaps;
    const targetEventMaps = target.eventMaps;
    const sourceDomEvents = Object.keys(sourceEventMaps);
    const targetDomEvents = Object.keys(targetEventMaps);
    sourceDomEvents.forEach((domEvent)=>{
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
    targetDomEvents.forEach((domEvent)=>{
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
const compileForElement = (source, target)=>{
    if (source.tagName !== target.tagName) {
        return [
            replaceNode(source, target)
        ];
    } else {
        const attributeInstructions = compileForAttributes(source, target);
        const eventInstructions = compileForEvents(source, target);
        const valueInstructions = compileForInputValue(source, target);
        return attributeInstructions.concat(eventInstructions).concat(valueInstructions);
    }
};
const compileForInputValue = (sourceElement, targetElement)=>{
    const instructions = [];
    if (sourceElement.tagName !== 'INPUT') {
        return instructions;
    }
    const source = sourceElement;
    const target = targetElement;
    if (source.value !== target.value) {
        instructions.push(changeValue(source, target, {
            name: 'value',
            value: target.value
        }));
    }
    return instructions;
};
const compileForText = (source, target)=>{
    if (source.textContent !== target.textContent) {
        return [
            changeText(source, target)
        ];
    }
    return [];
};
var NodeTypes;
(function(NodeTypes) {
    NodeTypes[NodeTypes["ElementNode"] = 1] = "ElementNode";
    NodeTypes[NodeTypes["TextNode"] = 3] = "TextNode";
})(NodeTypes || (NodeTypes = {}));
const compileForDom = (source, target)=>{
    if (source.nodeType !== target.nodeType) {
        return [
            replaceNode(source, target)
        ];
    } else if (source.nodeType === NodeTypes.ElementNode) {
        const sourceElement = source;
        const targetElement = target;
        const baseInstructions = compileForElement(sourceElement, targetElement);
        const childrenInstructions = compileForCollection(sourceElement.childNodes, targetElement.childNodes, sourceElement);
        return baseInstructions.concat(childrenInstructions);
    } else if (source.nodeType === NodeTypes.TextNode) {
        return compileForText(source, target);
    }
    return [];
};
const compileForCollection = (sourceList, targetList, parent)=>{
    const largerLength = calculateLargerLength(sourceList, targetList);
    let instructions = [];
    let index;
    for(index = 0; index < largerLength; index++){
        const sourceChild = sourceList[index];
        const targetChild = targetList[index];
        if (!sourceChild) {
            instructions.push(addNode(targetChild, {
                parent
            }));
        } else if (!targetChild) {
            instructions.push(removeNode(sourceChild));
        } else {
            instructions = instructions.concat(compileForDom(sourceChild, targetChild));
        }
    }
    return instructions;
};
const calculateLargerLength = (source, target)=>{
    if (source.length >= target.length) return source.length;
    return target.length;
};
const change = (source, target, parent)=>{
    const instructions = compileForCollection(source, target, parent);
    instructions.forEach((instruction)=>{
        performInstruction(instruction);
    });
};
const performInstruction = (instruction)=>{
    const performer = performers[instruction.type] || noop;
    performer(instruction);
};
const noop = (_instruction)=>{};
const changeText1 = (instruction)=>{
    const { source , target  } = instruction;
    source.nodeValue = target.textContent;
};
const removeNode1 = (instruction)=>{
    const { source  } = instruction;
    source.remove();
};
const addNode1 = (instruction)=>{
    const { target , data  } = instruction;
    const { parent  } = data;
    parent.appendChild(target);
};
const replaceNode1 = (instruction)=>{
    const { source , target  } = instruction;
    source.replaceWith(target);
};
const removeAttribute1 = (instruction)=>{
    const { source , data  } = instruction;
    const { name  } = data;
    source.removeAttribute(name);
};
const addAttribute1 = (instruction)=>{
    const { source , data  } = instruction;
    const { name , value  } = data;
    source.setAttribute(name, value);
};
const updateAttribute1 = (instruction)=>{
    addAttribute1(instruction);
};
const removeEvent1 = (instruction)=>{
    const data = instruction.data;
    const source = instruction.source;
    const { name , value  } = data;
    source.removeEventListener(name, value);
};
const addEvent1 = (instruction)=>{
    const data = instruction.data;
    const source = instruction.source;
    const { name , value  } = data;
    source.addEventListener(name, value);
};
const updateEvent1 = (instruction)=>{
    const data = instruction.data;
    const source = instruction.source;
    const { name , sourceValue , targetValue  } = data;
    source.removeEventListener(name, sourceValue);
    source.addEventListener(name, targetValue);
};
const changeValue1 = (instruction)=>{
    const data = instruction.data;
    const source = instruction.source;
    const { value  } = data;
    source.value = value;
};
const performers = {
    [ChangeInstructions.changeText]: changeText1,
    [ChangeInstructions.removeNode]: removeNode1,
    [ChangeInstructions.addNode]: addNode1,
    [ChangeInstructions.replaceNode]: replaceNode1,
    [ChangeInstructions.removeAttribute]: removeAttribute1,
    [ChangeInstructions.addAttribute]: addAttribute1,
    [ChangeInstructions.updateAttribute]: updateAttribute1,
    [ChangeInstructions.removeEvent]: removeEvent1,
    [ChangeInstructions.addEvent]: addEvent1,
    [ChangeInstructions.updateEvent]: updateEvent1,
    [ChangeInstructions.changeValue]: changeValue1
};
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
    throw new Error(`[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`);
}
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
    return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
    var _a;
    if (!value) return false;
    return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!((_a = value.constructor) == null ? void 0 : _a[DRAFTABLE]) || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject(value) {
    if (!value || typeof value !== "object") return false;
    const proto = getPrototypeOf(value);
    if (proto === null) {
        return true;
    }
    const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    if (Ctor === Object) return true;
    return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function each(obj, iter) {
    if (getArchtype(obj) === 0) {
        Object.entries(obj).forEach(([key, value])=>{
            iter(key, value, obj);
        });
    } else {
        obj.forEach((entry, index)=>iter(index, entry, obj));
    }
}
function getArchtype(thing) {
    const state = thing[DRAFT_STATE];
    return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has(thing, prop) {
    return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function set(thing, propOrOldValue, value) {
    const t = getArchtype(thing);
    if (t === 2) thing.set(propOrOldValue, value);
    else if (t === 3) {
        thing.add(value);
    } else thing[propOrOldValue] = value;
}
function is(x, y) {
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
}
function isMap(target) {
    return target instanceof Map;
}
function isSet(target) {
    return target instanceof Set;
}
function latest(state) {
    return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
    if (isMap(base)) {
        return new Map(base);
    }
    if (isSet(base)) {
        return new Set(base);
    }
    if (Array.isArray(base)) return Array.prototype.slice.call(base);
    if (!strict && isPlainObject(base)) {
        if (!getPrototypeOf(base)) {
            const obj = Object.create(null);
            return Object.assign(obj, base);
        }
        return {
            ...base
        };
    }
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for(let i = 0; i < keys.length; i++){
        const key = keys[i];
        const desc = descriptors[key];
        if (desc.writable === false) {
            desc.writable = true;
            desc.configurable = true;
        }
        if (desc.get || desc.set) descriptors[key] = {
            configurable: true,
            writable: true,
            enumerable: desc.enumerable,
            value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
}
function freeze(obj, deep = false) {
    if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj)) return obj;
    if (getArchtype(obj) > 1) {
        obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
    }
    Object.freeze(obj);
    if (deep) each(obj, (_key, value)=>freeze(value, true));
    return obj;
}
function dontMutateFrozenCollections() {
    die(2);
}
function isFrozen(obj) {
    return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
    const plugin = plugins[pluginKey];
    if (!plugin) {
        die(0, pluginKey);
    }
    return plugin;
}
var currentScope;
function getCurrentScope() {
    return currentScope;
}
function createScope(parent_, immer_) {
    return {
        drafts_: [],
        parent_,
        immer_,
        canAutoFreeze_: true,
        unfinalizedDrafts_: 0
    };
}
function usePatchesInScope(scope, patchListener) {
    if (patchListener) {
        getPlugin("Patches");
        scope.patches_ = [];
        scope.inversePatches_ = [];
        scope.patchListener_ = patchListener;
    }
}
function revokeScope(scope) {
    leaveScope(scope);
    scope.drafts_.forEach(revokeDraft);
    scope.drafts_ = null;
}
function leaveScope(scope) {
    if (scope === currentScope) {
        currentScope = scope.parent_;
    }
}
function enterScope(immer2) {
    return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
    const state = draft[DRAFT_STATE];
    if (state.type_ === 0 || state.type_ === 1) state.revoke_();
    else state.revoked_ = true;
}
function processResult(result, scope) {
    scope.unfinalizedDrafts_ = scope.drafts_.length;
    const baseDraft = scope.drafts_[0];
    const isReplaced = result !== void 0 && result !== baseDraft;
    if (isReplaced) {
        if (baseDraft[DRAFT_STATE].modified_) {
            revokeScope(scope);
            die(4);
        }
        if (isDraftable(result)) {
            result = finalize(scope, result);
            if (!scope.parent_) maybeFreeze(scope, result);
        }
        if (scope.patches_) {
            getPlugin("Patches").generateReplacementPatches_(baseDraft[DRAFT_STATE].base_, result, scope.patches_, scope.inversePatches_);
        }
    } else {
        result = finalize(scope, baseDraft, []);
    }
    revokeScope(scope);
    if (scope.patches_) {
        scope.patchListener_(scope.patches_, scope.inversePatches_);
    }
    return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
    if (isFrozen(value)) return value;
    const state = value[DRAFT_STATE];
    if (!state) {
        each(value, (key, childValue)=>finalizeProperty(rootScope, state, value, key, childValue, path));
        return value;
    }
    if (state.scope_ !== rootScope) return value;
    if (!state.modified_) {
        maybeFreeze(rootScope, state.base_, true);
        return state.base_;
    }
    if (!state.finalized_) {
        state.finalized_ = true;
        state.scope_.unfinalizedDrafts_--;
        const result = state.copy_;
        let resultEach = result;
        let isSet2 = false;
        if (state.type_ === 3) {
            resultEach = new Set(result);
            result.clear();
            isSet2 = true;
        }
        each(resultEach, (key, childValue)=>finalizeProperty(rootScope, state, result, key, childValue, path, isSet2));
        maybeFreeze(rootScope, result, false);
        if (path && rootScope.patches_) {
            getPlugin("Patches").generatePatches_(state, path, rootScope.patches_, rootScope.inversePatches_);
        }
    }
    return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
    if (isDraft(childValue)) {
        const path = rootPath && parentState && parentState.type_ !== 3 && !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
        const res = finalize(rootScope, childValue, path);
        set(targetObject, prop, res);
        if (isDraft(res)) {
            rootScope.canAutoFreeze_ = false;
        } else return;
    } else if (targetIsSet) {
        targetObject.add(childValue);
    }
    if (isDraftable(childValue) && !isFrozen(childValue)) {
        if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
            return;
        }
        finalize(rootScope, childValue);
        if (!parentState || !parentState.scope_.parent_) maybeFreeze(rootScope, childValue);
    }
}
function maybeFreeze(scope, value, deep = false) {
    if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
        freeze(value, deep);
    }
}
function createProxyProxy(base, parent) {
    const isArray = Array.isArray(base);
    const state = {
        type_: isArray ? 1 : 0,
        scope_: parent ? parent.scope_ : getCurrentScope(),
        modified_: false,
        finalized_: false,
        assigned_: {},
        parent_: parent,
        base_: base,
        draft_: null,
        copy_: null,
        revoke_: null,
        isManual_: false
    };
    let target = state;
    let traps = objectTraps;
    if (isArray) {
        target = [
            state
        ];
        traps = arrayTraps;
    }
    const { revoke , proxy  } = Proxy.revocable(target, traps);
    state.draft_ = proxy;
    state.revoke_ = revoke;
    return proxy;
}
var objectTraps = {
    get (state, prop) {
        if (prop === DRAFT_STATE) return state;
        const source = latest(state);
        if (!has(source, prop)) {
            return readPropFromProto(state, source, prop);
        }
        const value = source[prop];
        if (state.finalized_ || !isDraftable(value)) {
            return value;
        }
        if (value === peek(state.base_, prop)) {
            prepareCopy(state);
            return state.copy_[prop] = createProxy(value, state);
        }
        return value;
    },
    has (state, prop) {
        return prop in latest(state);
    },
    ownKeys (state) {
        return Reflect.ownKeys(latest(state));
    },
    set (state, prop, value) {
        const desc = getDescriptorFromProto(latest(state), prop);
        if (desc == null ? void 0 : desc.set) {
            desc.set.call(state.draft_, value);
            return true;
        }
        if (!state.modified_) {
            const current2 = peek(latest(state), prop);
            const currentState = current2 == null ? void 0 : current2[DRAFT_STATE];
            if (currentState && currentState.base_ === value) {
                state.copy_[prop] = value;
                state.assigned_[prop] = false;
                return true;
            }
            if (is(value, current2) && (value !== void 0 || has(state.base_, prop))) return true;
            prepareCopy(state);
            markChanged(state);
        }
        if (state.copy_[prop] === value && (value !== void 0 || prop in state.copy_) || Number.isNaN(value) && Number.isNaN(state.copy_[prop])) return true;
        state.copy_[prop] = value;
        state.assigned_[prop] = true;
        return true;
    },
    deleteProperty (state, prop) {
        if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
            state.assigned_[prop] = false;
            prepareCopy(state);
            markChanged(state);
        } else {
            delete state.assigned_[prop];
        }
        if (state.copy_) {
            delete state.copy_[prop];
        }
        return true;
    },
    getOwnPropertyDescriptor (state, prop) {
        const owner = latest(state);
        const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
        if (!desc) return desc;
        return {
            writable: true,
            configurable: state.type_ !== 1 || prop !== "length",
            enumerable: desc.enumerable,
            value: owner[prop]
        };
    },
    defineProperty () {
        die(11);
    },
    getPrototypeOf (state) {
        return getPrototypeOf(state.base_);
    },
    setPrototypeOf () {
        die(12);
    }
};
var arrayTraps = {};
each(objectTraps, (key, fn)=>{
    arrayTraps[key] = function() {
        arguments[0] = arguments[0][0];
        return fn.apply(this, arguments);
    };
});
arrayTraps.deleteProperty = function(state, prop) {
    return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
    return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
    const state = draft[DRAFT_STATE];
    const source = state ? latest(state) : draft;
    return source[prop];
}
function readPropFromProto(state, source, prop) {
    var _a;
    const desc = getDescriptorFromProto(source, prop);
    return desc ? `value` in desc ? desc.value : (_a = desc.get) == null ? void 0 : _a.call(state.draft_) : void 0;
}
function getDescriptorFromProto(source, prop) {
    if (!(prop in source)) return void 0;
    let proto = getPrototypeOf(source);
    while(proto){
        const desc = Object.getOwnPropertyDescriptor(proto, prop);
        if (desc) return desc;
        proto = getPrototypeOf(proto);
    }
    return void 0;
}
function markChanged(state) {
    if (!state.modified_) {
        state.modified_ = true;
        if (state.parent_) {
            markChanged(state.parent_);
        }
    }
}
function prepareCopy(state) {
    if (!state.copy_) {
        state.copy_ = shallowCopy(state.base_, state.scope_.immer_.useStrictShallowCopy_);
    }
}
var Immer2 = class {
    constructor(config){
        this.autoFreeze_ = true;
        this.useStrictShallowCopy_ = false;
        this.produce = (base, recipe, patchListener)=>{
            if (typeof base === "function" && typeof recipe !== "function") {
                const defaultBase = recipe;
                recipe = base;
                const self = this;
                return function curriedProduce(base2 = defaultBase, ...args) {
                    return self.produce(base2, (draft)=>recipe.call(this, draft, ...args));
                };
            }
            if (typeof recipe !== "function") die(6);
            if (patchListener !== void 0 && typeof patchListener !== "function") die(7);
            let result;
            if (isDraftable(base)) {
                const scope = enterScope(this);
                const proxy = createProxy(base, void 0);
                let hasError = true;
                try {
                    result = recipe(proxy);
                    hasError = false;
                } finally{
                    if (hasError) revokeScope(scope);
                    else leaveScope(scope);
                }
                usePatchesInScope(scope, patchListener);
                return processResult(result, scope);
            } else if (!base || typeof base !== "object") {
                result = recipe(base);
                if (result === void 0) result = base;
                if (result === NOTHING) result = void 0;
                if (this.autoFreeze_) freeze(result, true);
                if (patchListener) {
                    const p = [];
                    const ip = [];
                    getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
                    patchListener(p, ip);
                }
                return result;
            } else die(1, base);
        };
        this.produceWithPatches = (base, recipe)=>{
            if (typeof base === "function") {
                return (state, ...args)=>this.produceWithPatches(state, (draft)=>base(draft, ...args));
            }
            let patches, inversePatches;
            const result = this.produce(base, recipe, (p, ip)=>{
                patches = p;
                inversePatches = ip;
            });
            return [
                result,
                patches,
                inversePatches
            ];
        };
        if (typeof (config == null ? void 0 : config.autoFreeze) === "boolean") this.setAutoFreeze(config.autoFreeze);
        if (typeof (config == null ? void 0 : config.useStrictShallowCopy) === "boolean") this.setUseStrictShallowCopy(config.useStrictShallowCopy);
    }
    createDraft(base) {
        if (!isDraftable(base)) die(8);
        if (isDraft(base)) base = current(base);
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        proxy[DRAFT_STATE].isManual_ = true;
        leaveScope(scope);
        return proxy;
    }
    finishDraft(draft, patchListener) {
        const state = draft && draft[DRAFT_STATE];
        if (!state || !state.isManual_) die(9);
        const { scope_: scope  } = state;
        usePatchesInScope(scope, patchListener);
        return processResult(void 0, scope);
    }
    setAutoFreeze(value) {
        this.autoFreeze_ = value;
    }
    setUseStrictShallowCopy(value) {
        this.useStrictShallowCopy_ = value;
    }
    applyPatches(base, patches) {
        let i;
        for(i = patches.length - 1; i >= 0; i--){
            const patch = patches[i];
            if (patch.path.length === 0 && patch.op === "replace") {
                base = patch.value;
                break;
            }
        }
        if (i > -1) {
            patches = patches.slice(i + 1);
        }
        const applyPatchesImpl = getPlugin("Patches").applyPatches_;
        if (isDraft(base)) {
            return applyPatchesImpl(base, patches);
        }
        return this.produce(base, (draft)=>applyPatchesImpl(draft, patches));
    }
};
function createProxy(value, parent) {
    const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
    const scope = parent ? parent.scope_ : getCurrentScope();
    scope.drafts_.push(draft);
    return draft;
}
function current(value) {
    if (!isDraft(value)) die(10, value);
    return currentImpl(value);
}
function currentImpl(value) {
    if (!isDraftable(value) || isFrozen(value)) return value;
    const state = value[DRAFT_STATE];
    let copy;
    if (state) {
        if (!state.modified_) return state.base_;
        state.finalized_ = true;
        copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    } else {
        copy = shallowCopy(value, true);
    }
    each(copy, (key, childValue)=>{
        set(copy, key, currentImpl(childValue));
    });
    if (state) {
        state.finalized_ = false;
    }
    return copy;
}
var immer = new Immer2();
var produce = immer.produce;
immer.produceWithPatches.bind(immer);
immer.setAutoFreeze.bind(immer);
immer.setUseStrictShallowCopy.bind(immer);
immer.applyPatches.bind(immer);
immer.createDraft.bind(immer);
immer.finishDraft.bind(immer);
const stateChangeEvent = 'stateChange';
class Store {
    state;
    publish;
    constructor({ initialState , publish  }){
        this.state = initialState !== undefined ? initialState : {};
        this.publish = publish;
    }
    getState() {
        return this.state;
    }
    setState(setter) {
        const state = this.state;
        this.state = produce(this.state, setter);
        if (state !== this.state) {
            this.publish(stateChangeEvent, this.state);
        }
    }
}
const createStore = (storeSetup)=>{
    const store = new Store(storeSetup);
    const getState = store.getState.bind(store);
    const setState = store.setState.bind(store);
    return {
        store,
        getState,
        setState
    };
};
class Root {
    template;
    selector;
    renderKit;
    dom;
    parentElement;
    constructor(template, selector, renderKit){
        this.template = template;
        this.selector = selector;
        this.renderKit = renderKit;
        this.dom = [];
        this.parentElement = null;
    }
    renderAndAttach(renderKit) {
        this.parentElement = this.getParentElement();
        this.dom = this.render(renderKit);
        if (this.parentElement) {
            this.attach();
            this.subscribeForRerender(renderKit);
        }
        return this.parentElement;
    }
    render(renderKit) {
        return this.template.render(renderKit);
    }
    attach() {
        this.parentElement && (this.parentElement.innerHTML = '');
        this.dom.forEach((element)=>{
            this.parentElement && this.parentElement.appendChild(element);
        });
    }
    subscribeForRerender({ subscribe  }) {
        subscribe(stateChangeEvent, (state)=>this.rerender(state));
    }
    rerender(state) {
        const renderKit = {
            ...this.renderKit,
            state: state
        };
        const newDom = this.render(renderKit);
        change(this.dom, newDom, this.parentElement);
        if (this.dom.length === 0 && newDom.length !== 0) {
            this.dom = newDom;
        }
    }
    getParentElement() {
        return this.renderKit.document.querySelector(this.selector);
    }
}
const render = (template, selector, renderKit)=>{
    const root = new Root(template, selector, renderKit);
    root.renderAndAttach(renderKit);
    return root;
};
class Bound {
    TemplateClass;
    viewModel;
    attributes;
    constructor(TemplateClass, viewModel, attributes){
        this.TemplateClass = TemplateClass;
        this.viewModel = viewModel;
        this.attributes = attributes || {};
    }
    render(renderKit) {
        const props = {
            ...this.attributes,
            ...this.viewModel(renderKit.state)
        };
        const template = this.TemplateClass(props);
        if (!template) {
            return [];
        } else {
            return template.render(renderKit);
        }
    }
}
const bind = (TemplateClass, viewModel)=>{
    return (attributes)=>new Bound(TemplateClass, viewModel, attributes);
};
class MessageBus {
    listeners;
    options;
    constructor(){
        this.options = {};
        this.listeners = {};
    }
    subscribe(eventName, listener) {
        this.ensureListenerCollection(eventName);
        this.listeners[eventName].push(listener);
    }
    publish(eventName, payload) {
        const listeners = this.listeners[eventName];
        if (!listeners) return false;
        listeners.forEach((listener)=>{
            listener(payload, this.buildListenerKit(eventName));
        });
        return true;
    }
    ensureListenerCollection(eventName) {
        if (this.listeners[eventName]) return;
        this.listeners[eventName] = [];
    }
    buildListenerKit(eventName) {
        return {
            eventName,
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
const createBus = ()=>{
    const bus = new MessageBus();
    const publish = bus.publish.bind(bus);
    const subscribe = bus.subscribe.bind(bus);
    return {
        bus,
        publish,
        subscribe
    };
};
const setupBus = (app)=>{
    const { publish , subscribe , bus  } = createBus();
    app.publish = publish;
    app.subscribe = subscribe;
    app.bus = bus;
};
const setupState = (app)=>{
    const { getState , setState , store  } = createStore({
        publish: app.publish
    });
    app.getState = getState;
    app.setState = setState;
    app.store = store;
};
const connectBusToState = (app)=>{
    const { bus , getState , setState  } = app;
    bus.addListenerOptions({
        getState,
        setState
    });
};
const setupRenderKit = (app)=>{
    app.renderKit = {
        publish: app.publish,
        subscribe: app.subscribe,
        state: app.getState(),
        document
    };
};
const createApp = ()=>{
    const app = {};
    setupBus(app);
    setupState(app);
    connectBusToState(app);
    setupRenderKit(app);
    setupNavigation(app);
    return app;
};
export { jsx as jsx };
export { render as render };
export { bind as bind };
export { createBus as createBus };
export { createStore as createStore };
export { createApp as createApp };
