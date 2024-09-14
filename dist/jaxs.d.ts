declare module "state/is" {
    export const isBoolean: (value: any) => value is boolean;
    export const isNumber: (value: any) => value is number;
    export const isString: (value: any) => value is string;
    export const isArray: (value: any) => value is any[];
    export const isObject: (value: any) => boolean;
}
declare module "state/equality" {
    type Object = Record<string, any>;
    export const areElementsEqual: (oldValue: any, newValue: any) => boolean;
    export const areObjectsEqual: (oldValue: Object, newValue: Object) => any;
    export const areArraysEqual: (oldValue: any[], newValue: any[]) => any;
    export const areEqual: (oldValue: any, newValue: any) => any;
}
declare module "state/store-updater" {
    import type { JaxsStore, JaxsStoreUpdateValue, JaxsStoreUpdaterFunction, JaxStoreUpdatersCollection } from "types";
    export class JaxsStoreUpdater<T> {
        store: JaxsStore<T>;
        constructor(store: JaxsStore<T>);
        update(updater: JaxsStoreUpdateValue<T>): void;
        reset(): void;
        get value(): T;
        addUpdaterFunction(name: string, updater: JaxsStoreUpdaterFunction<T>): void;
        addUpdaterFunctions(updaters: JaxStoreUpdatersCollection<T>): void;
    }
}
declare module "state/updaters/list" {
    import { JaxsStoreListSorter, JaxsStoreUpdaterFunction } from "types";
    import { JaxsStoreUpdater } from "state/store-updater";
    export class ListUpdater<T> extends JaxsStoreUpdater<T[]> {
        addUpdaterFunction(name: string, updater: JaxsStoreUpdaterFunction<T[]>): void;
        push(element: T): void;
        pop(): T;
        unshift(element: T): void;
        shift(): T;
        addSorter(name: string, sorter: JaxsStoreListSorter<T>): void;
        sortBy(sorter: JaxsStoreListSorter<T>): void;
        insertAt(index: number, item: T): void;
    }
}
declare module "state/store" {
    import type { JaxsState, JaxsStoreDataUpdater, JaxsStoreInitializationOptions, JaxsStoreListSorter, JaxsStoreName, JaxsStoreUpdaterFunction, JaxsStoreUpdateValue, JaxStoreUpdatersCollection, StoreUpdater } from "types";
    export class JaxsStore<T> {
        parent: JaxsState;
        name: JaxsStoreName;
        updater: StoreUpdater<T>;
        _value: T;
        initialState: T;
        constructor(options: JaxsStoreInitializationOptions<T>);
        get ['value'](): T;
        set ['value'](value: T);
        update(updater: JaxsStoreUpdateValue<T>): void;
        updateValue(newValue: T): void;
        getUpdatedValue(updater: JaxsStoreDataUpdater<T>): T;
        addUpdaters(updaters: JaxStoreUpdatersCollection<any>): void;
        addUpdater(name: string, updater: JaxsStoreUpdaterFunction<any>): void;
        addSorter(name: string, sorter: JaxsStoreListSorter<T>): void;
    }
}
declare module "state/updaters/boolean" {
    import { JaxsStoreUpdaterFunction } from "types";
    import { JaxsStoreUpdater } from "state/store-updater";
    export class BooleanUpdater extends JaxsStoreUpdater<boolean> {
        toggle(): void;
        setTrue(): void;
        setFalse(): void;
        addUpdaterFunction(name: string, updater: JaxsStoreUpdaterFunction<boolean>): void;
    }
}
declare module "state/updaters/object" {
    import { JaxsStoreUpdaterFunction } from "types";
    import { JaxsStoreUpdater } from "state/store-updater";
    export class ObjectUpdater<T> extends JaxsStoreUpdater<T> {
        addUpdaterFunction(name: string, updater: JaxsStoreUpdaterFunction<T>): void;
        updateAttribute(name: keyof T, value: T[keyof T]): void;
    }
}
declare module "state/index" {
    import { JaxsStore } from "state/store";
    import { BooleanUpdater } from "state/updaters/boolean";
    import { ListUpdater } from "state/updaters/list";
    import { ObjectUpdater } from "state/updaters/object";
    import type { JaxsStatePublisher, JaxsStateTransactionUpdater, JaxsStoreName, JaxsStoresCollection, StoreValue } from "types";
    export const eventName = "state";
    export class JaxsState {
        publisher: JaxsStatePublisher;
        stores: JaxsStoresCollection;
        eventNamePrefix: string;
        notifications: Set<JaxsStoreName>;
        inTransaction: boolean;
        constructor(publisher: JaxsStatePublisher);
        create<T>(name: JaxsStoreName, initialState: T): JaxsStore<T>;
        createBoolean(name: JaxsStoreName, initialState: boolean): JaxsStore<boolean>;
        createRecord<T>(name: JaxsStoreName, initialState: T): JaxsStore<T>;
        createList<T>(name: JaxsStoreName, initialState: T[]): JaxsStore<T[]>;
        store(name: JaxsStoreName): JaxsStore<any>;
        get(name: JaxsStoreName): StoreValue;
        getAll(names: JaxsStoreName[]): {};
        notify(name: JaxsStoreName): void;
        update(name: JaxsStoreName, newValue: any): void;
        transaction(updater: JaxsStateTransactionUpdater): void;
        publishAll(): void;
        publish(name: JaxsStoreName): void;
        event(name: JaxsStoreName): string;
    }
    export const createState: (publisher: JaxsStatePublisher) => JaxsState;
    export { JaxsStore, BooleanUpdater, ListUpdater, ObjectUpdater };
}
declare module "types" {
    import type { JaxsState } from "state/index";
    import type { JaxsStore } from "state/store";
    import type { JaxsStoreUpdater } from "state/store-updater";
    import type { BooleanUpdater } from "state/updaters/boolean";
    import type { ListUpdater } from "state/updaters/list";
    import type { ObjectUpdater } from "state/updaters/object";
    export { JaxsState, JaxsStore, JaxsStoreUpdater, BooleanUpdater, ListUpdater, ObjectUpdater, };
    export type StoreUpdater<T> = JaxsStoreUpdater<T> | ObjectUpdater<T> | BooleanUpdater | ListUpdater<T>;
    export type TextValue = string | number;
    export interface JsxIded {
        __jsx?: string;
    }
    export type JsxChangeId = {
        element: JaxsNode;
        index: number;
    };
    export type EventMap = {
        domEvent: string;
        busEvent: string;
        listener: EventListener;
    };
    export type TagEventMaps = Record<string, EventMap>;
    interface JsxEventMapped {
        eventMaps: TagEventMaps;
    }
    export type JaxsElement = Element & JsxIded & JsxEventMapped;
    export type JaxsText = Text & JsxIded;
    export type JaxsSvgElement = SVGElement & JsxIded;
    export type JaxsNode = JaxsElement | JaxsText | JaxsSvgElement;
    export type JaxsNodes = JaxsNode[] | NodeListOf<JaxsNode>;
    export type JaxsInput = HTMLInputElement & JsxIded & JsxEventMapped;
    type NullValues = null | undefined;
    export type ReactSourceObject = {
        fileName: string;
        lineNumber: string;
        columnNumber: string;
    };
    interface SourceMap {
        __source?: ReactSourceObject;
    }
    export type Props<T> = Partial<{
        __source: ReactSourceObject;
        children: JsxCollection;
    }> & T;
    export type PropValue = TextValue | NullValues | boolean | ReactSourceObject | JsxCollection;
    export type TagAttributes = SourceMap & Record<string, string>;
    export type TagEventAttributes = Record<string, string>;
    export type TagAttributesAndEvents = {
        attributes: TagAttributes;
        events: TagEventAttributes;
    };
    export type DomPublish = (eventName: string, domEvent: Event) => void;
    export type Subscribe = (matcher: JaxsBusEventMatcher, listener: JaxsBusListener<any>) => void;
    export type RenderKit = {
        document: Document;
        window: Window;
        publish: DomPublish;
        subscribe: Subscribe;
        state: JaxsState;
        parent?: JaxsNode | null;
    };
    export interface Renderable {
        render: (renderKit: RenderKit, parentElement?: JaxsElement) => JaxsNode[];
        isSvg: boolean;
    }
    export type StaticTemplate = () => Renderable;
    export type TypedTemplate<T> = (props: Props<T>) => Renderable;
    export type JaxsTemplate<T> = StaticTemplate | TypedTemplate<T>;
    export type JsxCollection = (Renderable | TextValue)[];
    export enum ChangeInstructionTypes {
        removeNode = 0,
        insertNode = 1,// can be to move an existing element in the dom, or to add one
        replaceNode = 2,
        removeAttribute = 3,
        addAttribute = 4,
        updateAttribute = 5,
        removeEvent = 6,
        addEvent = 7,
        updateEvent = 8,
        changeValue = 9,
        changeText = 10
    }
    export type RemoveInstructionData = {
        name: string;
        isSvg?: boolean;
    };
    export type AttributeInstructionData = {
        name: string;
        value: string;
        isSvg?: boolean;
    };
    export type EventInstructionData = {
        name: string;
        value: EventListener;
    };
    export type UpdateEventInstructionData = {
        name: string;
        sourceValue: EventListener;
        targetValue: EventListener;
    };
    export type InsertNodeData = {
        parent: JaxsElement;
        index: number;
    };
    type NullData = Record<string, never>;
    export type InstructionData = RemoveInstructionData | AttributeInstructionData | EventInstructionData | UpdateEventInstructionData | InsertNodeData | NullData;
    export type ChangeInstruction = {
        source: JaxsNode;
        target: JaxsNode;
        type: ChangeInstructionTypes;
        data: InstructionData;
    };
    export type ChangeInstructions = Array<ChangeInstruction>;
    export type Updater = (instruction: ChangeInstruction) => void;
    export type StoreValue = string | number | boolean | null | StoreValue[] | {
        [key: string]: StoreValue;
    };
    export type StoreMap = {
        [key: string]: StoreValue;
    };
    export type JaxsViewModel<ATTRIBUTES, STORE_MAP> = (storeMap: STORE_MAP) => Partial<ATTRIBUTES>;
    export type BindSubscriptionList = string[];
    export type BindParams<T, U> = {
        Template: JaxsTemplate<T>;
        viewModel?: JaxsViewModel<T, U>;
        subscriptions?: BindSubscriptionList;
    };
    export type AppAdditionListenerOptions = {
        state: JaxsState;
        document: Document;
        window: Window;
    };
    export type DefaultBusListenerOptions<T> = {
        publish: JaxsPublishFunction<T>;
        eventName: string;
    };
    export type JaxsBusOptions = AppAdditionListenerOptions & DefaultBusListenerOptions<any>;
    export type JaxsPublishFunction<T> = (event: string, payload: T) => void;
    export type JaxsBusListener<T> = (payload: T, listenerKit: JaxsBusOptions) => void;
    export type JaxsBusEventMatcher = string | RegExp;
    export type ExactSubscriptionData<T> = {
        listener: JaxsBusListener<T>;
        index: number;
        matcher: string;
    };
    export type FuzzySubscriptionData<T> = {
        listener: JaxsBusListener<T>;
        index: number;
        matcher: RegExp;
    };
    export type Unsubscribe = () => void;
    export type CreateAppBuilderArguments = {
        window?: Window;
        document?: Document;
    };
    export type RouteState = {
        host: string;
        path: string;
        query: Record<string, string>;
    };
    export type AttributesWithChildren<T> = Props<T> & {
        children?: JsxCollection;
    };
    export type DiffPair = {
        source: JaxsNode;
        target: JaxsNode;
    };
    export type CompileChildren = (sourceList: JaxsNodes, targetList: JaxsNodes, parent: JaxsElement) => ChangeInstructions;
    export type JaxsStatePublisher = (event: string, payload: any) => void;
    export type JaxsStateTransactionUpdater = (collection: JaxsStoresCollection) => void;
    export type JaxsStoreName = string;
    export type JaxsStoresCollection = Record<string, JaxsStore<any>>;
    export type JaxsStoreInitializationOptions<T> = {
        name: JaxsStoreName;
        parent: JaxsState;
        value: T;
    };
    export type JaxsStoreDataUpdater<T> = (originalValue: T) => T;
    export type UpdaterValue<T> = boolean | T | T[];
    export type JaxsStoreUpdateValue<T> = UpdaterValue<T> | JaxsStoreDataUpdater<T>;
    export type JaxsStoreUpdaterFunction<T> = (value: UpdaterValue<T>, ...args: any[]) => T;
    export type JaxStoreUpdatersCollection<T> = Record<string, JaxsStoreUpdaterFunction<T>>;
    export type JaxsStoreListSorter<T> = (left: T, right: T) => number;
}
declare module "rendering/dom/tag" {
    import type { JaxsElement, TagAttributes, TagEventAttributes, DomPublish, RenderKit } from "types";
    export const createNode: (type: string, document: Document) => HTMLElement;
    export const setAttributesOnElement: (element: Element, attributes: TagAttributes) => void;
    export const setEventsOnElement: (element: JaxsElement, events: TagEventAttributes, publish: DomPublish) => void;
    export const createDecoratedNode: (type: string, attributes: TagAttributes, events: TagEventAttributes, renderKit: RenderKit) => JaxsElement;
}
declare module "rendering/dom/svg" {
    import type { TagAttributes, JaxsElement } from "types";
    export const namespace = "http://www.w3.org/2000/svg";
    export const isSvgTag: (tagType: string) => tagType is "svg";
    export const createSvgNode: (type: string, attributes: TagAttributes, document: Document) => JaxsElement;
    export const elementIsSvg: (element: JaxsElement) => boolean;
}
declare module "rendering/dom/text" {
    export const createTextNode: (value: string, document: Document) => Text;
}
declare module "rendering/templates/text" {
    import { Renderable, TextValue, RenderKit } from "types";
    export class TextTemplate implements Renderable {
        value: string;
        isSvg: boolean;
        constructor(content: TextValue);
        render(renderKit: RenderKit): Text[];
    }
}
declare module "rendering/templates/children/text" {
    import { TextValue, Renderable } from "types";
    import { TextTemplate } from "rendering/templates/text";
    export const isTextValue: <T>(child: TextValue | T) => child is string | number | (T & string) | (T & number);
    export const textNode: (content: TextValue) => TextTemplate;
    export const replaceTextNodes: (child: TextValue | Renderable) => Renderable | TextTemplate;
}
declare module "rendering/templates/children/svg" {
    import { Renderable } from "types";
    export const withSvgFlag: (isSvg: boolean) => (template: Renderable) => Renderable;
}
declare module "rendering/templates/children/normalize" {
    import { JsxCollection, Renderable, AttributesWithChildren } from "types";
    export const normalizeJsxChildren: (jsxChildren: JsxCollection, isSvg: boolean) => Renderable[];
    export const normalizeToArray: <T>(children: T | T[]) => T[];
    export const ensureJsxChildrenArray: <T>(maybeChildren?: JsxCollection, attributes?: AttributesWithChildren<T>) => JsxCollection;
}
declare module "rendering/templates/tag/attributes-and-events" {
    import type { Props, TagAttributesAndEvents, JsxCollection } from "types";
    export const separateAttrsAndEvents: <T>(props: Props<T>, defaultValue?: string) => TagAttributesAndEvents;
    export const packageJsxAttributes: <T>(maybeAttributes?: Props<T>, maybeChildren?: JsxCollection) => Props<T>;
}
declare module "rendering/templates/children/render" {
    import { Renderable, RenderKit, JaxsNode } from "types";
    export const recursiveRender: (children: Renderable[], renderKit: RenderKit, rendered?: JaxsNode[]) => JaxsNode[];
}
declare module "rendering/templates/children" {
    import { JaxsElement, Renderable, JsxCollection, RenderKit, JaxsNodes, JaxsNode } from "types";
    export class Children implements Renderable {
        collection: Renderable[];
        parentElement?: JaxsElement;
        isSvg: boolean;
        constructor(jsxChildren: JsxCollection, isSvg?: boolean);
        render(renderKit: RenderKit, parentElement: JaxsElement | undefined): JaxsNode[];
        generateDom(renderKit: RenderKit): JaxsNode[];
        attachToParent(dom: JaxsNodes): void;
    }
}
declare module "rendering/templates/tag/jsx-key" {
    import { TagAttributes } from "types";
    export class JsxKey {
        attributes: TagAttributes;
        type: string;
        constructor(type: string, attributes: TagAttributes);
        generate(): string;
        sourceKey(): string;
        createKeyFromAttributes(): string;
    }
}
declare module "rendering/templates/tag" {
    import type { Props, JaxsNode, TagEventAttributes, Renderable, RenderKit, TagAttributes, JsxCollection } from "types";
    import { Children } from "rendering/templates/children";
    export class Tag<T> implements Renderable {
        type: string;
        events: TagEventAttributes;
        attributes: TagAttributes;
        props: Props<T>;
        children: Children;
        isSvg: boolean;
        constructor(tagType: string, props: Props<T>, children?: JsxCollection, isSvg?: boolean);
        render(renderKit: RenderKit): JaxsNode[];
        generateDom(renderKit: RenderKit): import("types").JaxsElement;
        generateHtmlDom(renderKit: RenderKit): import("types").JaxsElement;
        generateSvgDom(renderKit: RenderKit): import("types").JaxsElement;
        jsxKey(): string;
    }
}
declare module "rendering/jsx" {
    import type { JsxCollection, Props, JaxsTemplate, Renderable } from "types";
    import { Children } from "rendering/templates/children";
    const jsx: {
        <T>(type: string | JaxsTemplate<T>, attributes: Props<T>, ...children: JsxCollection): Renderable;
        fragment<T>(attributes: Props<T>, maybeChildren: JsxCollection): Children;
    };
    export { jsx };
}
declare module "bus/exact-subscriptions" {
    import { ExactSubscriptionData, JaxsBusListener, Unsubscribe } from "types";
    export class ExactSubscriptions {
        lookup: Record<string, ExactSubscriptionData<any>[]>;
        constructor();
        add<T>(matcher: string, listener: JaxsBusListener<T>, index: number): Unsubscribe;
        remove<T>(subscription: ExactSubscriptionData<T>): void;
        matches(event: string): ExactSubscriptionData<any>[];
        ensureArrayFor(matcher: string): void;
    }
}
declare module "bus/fuzzy-subscriptions" {
    import { FuzzySubscriptionData, JaxsBusListener, Unsubscribe } from "types";
    export class FuzzySubscriptions {
        lookup: FuzzySubscriptionData<any>[];
        constructor();
        add<T>(matcher: RegExp, listener: JaxsBusListener<T>, index: number): Unsubscribe;
        remove<T>(subscription: FuzzySubscriptionData<T>): void;
        matches(event: string): FuzzySubscriptionData<any>[];
    }
}
declare module "bus/index" {
    import { JaxsBusEventMatcher, JaxsBusListener, Unsubscribe, AppAdditionListenerOptions, JaxsBusOptions } from "types";
    import { ExactSubscriptions } from "bus/exact-subscriptions";
    import { FuzzySubscriptions } from "bus/fuzzy-subscriptions";
    class JaxsBus {
        options?: AppAdditionListenerOptions;
        exactSubscriptions: ExactSubscriptions;
        fuzzySubscriptions: FuzzySubscriptions;
        currentIndex: number;
        constructor();
        subscribe<T>(matcher: JaxsBusEventMatcher, listener: JaxsBusListener<T>): Unsubscribe;
        publish<T>(event: string, payload: T): void;
        addListenerOptions(options: AppAdditionListenerOptions): void;
        listenerOptions(event: string): JaxsBusOptions;
    }
    const createBus: () => {
        bus: JaxsBus;
        publish: (event: string, payload: any) => void;
        subscribe: (matcher: JaxsBusEventMatcher, listener: JaxsBusListener<any>) => Unsubscribe;
    };
    export { createBus, JaxsBus, ExactSubscriptions, FuzzySubscriptions };
}
declare module "rendering/templates/root" {
    import type { JaxsElement, JaxsNodes, RenderKit, Renderable, JaxsNode } from "types";
    export class Root {
        template: Renderable;
        selector: string;
        renderKit: RenderKit;
        dom: JaxsNodes;
        parentElement?: JaxsElement | null;
        constructor(template: Renderable, selector: string, renderKit: RenderKit);
        renderAndAttach(renderKit: RenderKit): void;
        render(renderKit: RenderKit): JaxsNode[];
        attach(): void;
        getParentElement(): Element;
    }
    export const render: (template: Renderable, selector: string, renderKit: RenderKit) => Root;
}
declare module "navigation/events" {
    export const linkNavigationEvent = "go-to-href";
    export const locationChangeEvent = "navigation:location-change";
    export const routeChangeEvent = "navigation:route-change";
}
declare module "navigation/route-state" {
    import { JaxsState } from "state/index";
    export const createRouteState: (state: JaxsState) => void;
}
declare module "navigation/find-href" {
    export const findHref: (node: HTMLElement) => string;
}
declare module "navigation/navigate" {
    import { JaxsBusOptions } from "types";
    export const navigate: (path: string, { publish, window }: JaxsBusOptions) => void;
}
declare module "navigation/on-link-click" {
    import { JaxsBusOptions } from "types";
    export const onLinkClick: (domEvent: MouseEvent, options: JaxsBusOptions) => void;
}
declare module "navigation/extract-query-params" {
    export const extractQueryParams: (queryString: string) => {};
}
declare module "navigation/on-location-change" {
    import { JaxsBusOptions } from "types";
    export const onLocationChange: (_: null, listenerOptions: JaxsBusOptions) => void;
}
declare module "navigation/start" {
    import type { App } from "app/index";
    export const subscribeToNavigation: (app: App) => void;
    export const subscribeToHistoryChange: (app: App) => void;
    export const publishLocation: (app: App) => void;
    export const startNavigation: (app: App) => void;
}
declare module "app/index" {
    import type { Renderable, RenderKit, Subscribe, JaxsPublishFunction } from "types";
    import type { JaxsState } from "state/index";
    import type { JaxsBus } from "bus/index";
    import { Root } from "rendering/templates/root";
    export class App {
        window: Window;
        document: Document;
        publish: JaxsPublishFunction<any>;
        subscribe: Subscribe;
        bus: JaxsBus;
        state: JaxsState;
        renderKit: RenderKit;
        roots: Root[];
        constructor({ window, document, publish, subscribe, bus, state, renderKit }: {
            window: any;
            document: any;
            publish: any;
            subscribe: any;
            bus: any;
            state: any;
            renderKit: any;
        });
        render(template: Renderable, selector: string): Root;
        startNavigation(): void;
    }
}
declare module "app/builder" {
    import { App } from "app/index";
    import { JaxsBus } from "bus/index";
    import { JaxsState } from "state/index";
    import { JaxsPublishFunction, Subscribe, RenderKit, CreateAppBuilderArguments } from "types";
    class AppBuilder {
        window: Window;
        document: Document;
        publish: JaxsPublishFunction<any>;
        subscribe: Subscribe;
        bus: JaxsBus;
        state: JaxsState;
        renderKit: RenderKit;
        constructor(domEnvironment: CreateAppBuilderArguments);
        setup(): App;
        setupDomEnvironment(domEnvironment: CreateAppBuilderArguments): void;
        setupBus(): void;
        setupState(): void;
        addBusOptions(): void;
        setRenderKit(): void;
    }
    const createApp: (domEnvironment?: CreateAppBuilderArguments) => App;
    export { App, AppBuilder, createApp };
}
declare module "rendering/update/instructions/instructions" {
    import { JaxsInput, ChangeInstruction, JaxsElement, RemoveInstructionData, AttributeInstructionData, EventInstructionData, UpdateEventInstructionData, InsertNodeData } from "types";
    export const changeText: (source: Text, target: Text) => ChangeInstruction;
    export const replaceNode: (source: JaxsElement, target: JaxsElement) => ChangeInstruction;
    export const removeAttribute: (source: JaxsElement, target: JaxsElement, data: RemoveInstructionData) => ChangeInstruction;
    export const addAttribute: (source: JaxsElement, target: JaxsElement, data: AttributeInstructionData) => ChangeInstruction;
    export const updateAttribute: (source: JaxsElement, target: JaxsElement, data: AttributeInstructionData) => ChangeInstruction;
    export const removeEvent: (source: JaxsElement, target: JaxsElement, data: EventInstructionData) => ChangeInstruction;
    export const addEvent: (source: JaxsElement, target: JaxsElement, data: EventInstructionData) => ChangeInstruction;
    export const updateEvent: (source: JaxsElement, target: JaxsElement, data: UpdateEventInstructionData) => ChangeInstruction;
    export const removeNode: (source: JaxsElement) => ChangeInstruction;
    export const insertNode: (target: JaxsElement, data: InsertNodeData) => ChangeInstruction;
    export const changeValue: (source: JaxsInput, target: JaxsInput, data: AttributeInstructionData) => ChangeInstruction;
    export const instructionsSorter: (left: ChangeInstruction, right: ChangeInstruction) => 0 | 1 | -1;
}
declare module "rendering/update/instructions/id-map" {
    import type { JaxsNode, JaxsNodes, JsxChangeId } from "types";
    export class IdMap {
        map: Record<string, JsxChangeId[]>;
        constructor();
        populate(list: JaxsNodes): void;
        pullMatch(element: JaxsNode): JsxChangeId;
        clear(element: JaxsNode): void;
        check(element: JaxsNode): boolean;
        remaining(): JsxChangeId[];
    }
    export const createIdMap: (list: JaxsNodes) => IdMap;
}
declare module "rendering/update/instructions/nodes/element/attributes" {
    import type { JaxsElement, ChangeInstructions } from "types";
    export const compileForAttributes: (source: JaxsElement, target: JaxsElement, isSvg?: boolean) => ChangeInstructions;
}
declare module "rendering/update/instructions/nodes/element/events" {
    import type { JaxsElement, ChangeInstructions } from "types";
    export const compileForEvents: (source: JaxsElement, target: JaxsElement) => ChangeInstructions;
}
declare module "rendering/update/instructions/nodes/input" {
    import { ChangeInstructions, JaxsElement } from "types";
    export const compileForInputValue: (sourceElement: JaxsElement, targetElement: JaxsElement) => ChangeInstructions;
}
declare module "rendering/update/instructions/nodes/element" {
    import type { JaxsElement } from "types";
    export const compileForElement: (source: JaxsElement, target: JaxsElement) => import("types").ChangeInstruction[];
}
declare module "rendering/update/instructions/nodes/svg" {
    import { JaxsElement } from "types";
    export const compileForSvg: (source: JaxsElement, target: JaxsElement) => import("types").ChangeInstructions;
}
declare module "rendering/update/instructions/nodes/text" {
    import type { ChangeInstructions } from "types";
    export const compileForText: (source: Text, target: Text) => ChangeInstructions;
}
declare module "rendering/update/instructions/node" {
    import type { JaxsNode, ChangeInstructions, CompileChildren } from "types";
    export const compileForNode: (source: JaxsNode, target: JaxsNode, compileChildren: CompileChildren) => ChangeInstructions;
}
declare module "rendering/update/instructions/collection" {
    import type { JaxsElement, JaxsNodes } from "types";
    export const compileCollection: (sourceList: JaxsNodes, targetList: JaxsNodes, parent: JaxsElement) => import("types").ChangeInstruction[];
}
declare module "rendering/update/perform-change" {
    import type { JaxsElement, JaxsNodes } from "types";
    export const performChange: (source: JaxsNodes, target: JaxsNodes, parent: JaxsElement) => void;
}
declare module "rendering/templates/bound" {
    import { JaxsElement, JaxsNodes, Props, JaxsTemplate, RenderKit, JaxsViewModel, BindParams, BindSubscriptionList } from "types";
    export class Bound<ATTRIBUTES, STATE_MAP> {
        Template: JaxsTemplate<ATTRIBUTES>;
        viewModel: JaxsViewModel<ATTRIBUTES, STATE_MAP>;
        attributes: Partial<Props<ATTRIBUTES>>;
        subscriptions: BindSubscriptionList;
        dom: JaxsNodes;
        parentElement: JaxsElement | null;
        renderKit?: RenderKit;
        constructor({ Template, subscriptions, attributes, viewModel }: {
            Template: any;
            subscriptions: any;
            attributes: any;
            viewModel: any;
        });
        render(renderKit: RenderKit): import("types").JaxsNode[];
        generateDom(renderKit: RenderKit): import("types").JaxsNode[];
        rerender(): void;
        subscribeForRerender(): void;
        eventName(storeName: string): string;
    }
    export const bind: <ATTRIBUTES, STATE_MAP>({ Template, viewModel, subscriptions, }: BindParams<ATTRIBUTES, STATE_MAP>) => (attributes: Partial<Props<ATTRIBUTES>>) => Bound<unknown, unknown>;
}
declare module "navigation/index" {
    import * as events from "navigation/events";
    import { extractQueryParams } from "navigation/extract-query-params";
    import { findHref } from "navigation/find-href";
    import { navigate } from "navigation/navigate";
    import { onLinkClick } from "navigation/on-link-click";
    import { onLocationChange } from "navigation/on-location-change";
    import { createRouteState } from "navigation/route-state";
    import * as start from "navigation/start";
    export { events, extractQueryParams, findHref, navigate, onLinkClick, onLocationChange, createRouteState, start, };
}
declare module "jaxs" {
    export { jsx } from "rendering/jsx";
    export { createApp } from "app/builder";
    export { bind } from "rendering/templates/bound";
    export * as JaxsTypes from "types";
    export * as navigation from "navigation/index";
    export * as appBuilding from "app/index";
    export * as messageBus from "bus/index";
    export * as state from "state/index";
}
