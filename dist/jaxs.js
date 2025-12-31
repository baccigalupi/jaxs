const tt = (e) => typeof e == 'string',
  f = (e) => Array.isArray(e),
  v = (e) => e !== null && !f(e) && typeof e == 'object',
  et = (e, t) => t.createElement(e),
  st = (e, t) => {
    for (const s in t) {
      if (s === '__self') continue
      const r = t[s].toString()
      if (s === 'value') {
        const n = e
        n.value !== r && (n.value = r)
      } else
        tt(r) && r.trim() === '' ? e.removeAttribute(s) : e.setAttribute(s, r)
    }
  },
  rt = (e, t, s) => {
    const r = {}
    for (const n in t) {
      const i = t[n],
        a = (c) => s(i, c)
      e.addEventListener(n, a),
        (r[n] = {
          domEvent: n,
          busEvent: i,
          listener: a,
        })
    }
    e.eventMaps = r
  },
  nt = (e, t, s, r) => {
    const n = et(e, r.document)
    return st(n, t), rt(n, s, r.publish), n
  },
  y = 'http://www.w3.org/2000/svg',
  it = {
    animate: !0,
    animateMotion: !0,
    animateTransform: !0,
    circle: !0,
    clipPath: !0,
    defs: !0,
    desc: !0,
    ellipse: !0,
    feBlend: !0,
    feColorMatrix: !0,
    feComponentTransfer: !0,
    feComposite: !0,
    feConvolveMatrix: !0,
    feDiffuseLighting: !0,
    feDisplacementMap: !0,
    feDistantLight: !0,
    feDropShadow: !0,
    feFlood: !0,
    feFuncA: !0,
    feFuncB: !0,
    feFuncG: !0,
    feFuncR: !0,
    feGaussianBlur: !0,
    feImage: !0,
    feMerge: !0,
    feMergeNode: !0,
    feMorphology: !0,
    feOffset: !0,
    fePointLight: !0,
    feSpecularLighting: !0,
    feSpotLight: !0,
    feTile: !0,
    feTurbulence: !0,
    filter: !0,
    foreignObject: !0,
    g: !0,
    image: !0,
    line: !0,
    linearGradient: !0,
    marker: !0,
    mask: !0,
    metadata: !0,
    mpath: !0,
    path: !0,
    pattern: !0,
    polygon: !0,
    polyline: !0,
    radialGradient: !0,
    rect: !0,
    script: !0,
    set: !0,
    stop: !0,
    style: !0,
    svg: !0,
    switch: !0,
    symbol: !0,
    text: !0,
    textPath: !0,
    title: !0,
    tspan: !0,
    use: !0,
    view: !0,
  },
  ot = (e, t) => !!(it[e] || (e === 'a' && t === y)),
  ut = (e, t, s) => {
    const r = s.createElementNS(y, e)
    for (const n in t)
      n === '__self' ||
        n === 'xmlns' ||
        r.setAttributeNS(null, n, t[n].toString())
    return r
  },
  at = (e) => e.namespaceURI === y,
  ct = (e, t) => t.createTextNode(e)
class lt {
  constructor(t) {
    this.value = t.toString()
  }
  render(t) {
    const s = ct(this.value, t.document)
    return (s.__jsx = 'TextNode'), [s]
  }
}
const ht = (e) => typeof e == 'string' || typeof e == 'number',
  dt = (e) => new lt(e),
  pt = (e) => (ht(e) ? dt(e) : e),
  T = (e) => mt(e).map(pt).flat(),
  mt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
  j = (e, t = {}) => T(e || t.children || []),
  ft = (e, t = '') => {
    const s = {},
      r = {}
    for (const n in e) {
      const i = e[n]
      if (n.match(/^on.+/i)) {
        const a = n.slice(2).toLowerCase()
        r[a] = i ? i.toString() : ''
      } else {
        if (i === !1) continue
        n === '__source' ? (s.__source = e.__source) : (s[n] = bt(n, i, t))
      }
    }
    return {
      attributes: s,
      events: r,
    }
  },
  bt = (e, t, s = '') => (t == null ? s : t.toString()),
  vt = (e, t) => {
    const s = e || {},
      r = j(t, s)
    return (s.children = s.children || r), s
  },
  O = (e, t, s, r = []) => e.reduce(gt(t, s), r).flat(),
  gt = (e, t) => (s, r) =>
    r
      ? Array.isArray(r)
        ? O(r, e, t, s)
        : (r.render(e, t).forEach((n) => s.push(n)), s)
      : s
class M {
  constructor(t) {
    this.collection = T(t)
  }
  render(t, s) {
    this.parentElement = s
    const r = this.generateDom(t)
    return this.attachToParent(r), r
  }
  generateDom(t) {
    return O(this.collection, t, this.parentElement)
  }
  attachToParent(t) {
    if (this.parentElement === void 0) return
    const s = this.parentElement
    t.forEach((r) => s.appendChild(r))
  }
}
class yt {
  constructor(t, s) {
    ;(this.type = t), (this.attributes = s)
  }
  generate() {
    return (
      this.attributes.key || this.sourceKey() || this.createKeyFromAttributes()
    )
  }
  sourceKey() {
    if (this.attributes.__source) {
      const {
        fileName: t,
        lineNumber: s,
        columnNumber: r,
      } = this.attributes.__source
      return `${t}:${s}:${r}`
    }
  }
  createKeyFromAttributes() {
    const t = this.attributes.id ? `#${this.attributes.id}` : '',
      s = this.attributes.type ? `[type=${this.attributes.type}]` : '',
      r = this.attributes.name ? `[name=${this.attributes.name}]` : ''
    return `${this.type}${t}${s}${r}`
  }
}
class Et {
  constructor(t, s, r = []) {
    this.type = t
    const { events: n, attributes: i } = ft(s)
    ;(this.events = n),
      (this.attributes = i),
      (this.isSvg = ot(this.type, this.attributes.xmlns)),
      (this.children = new M(r))
  }
  render(t) {
    const s = this.generateDom(t)
    return s ? (this.children.render(t, s), [s]) : []
  }
  generateDom(t) {
    return this.isSvg ? this.generateSvgDom(t) : this.generateHtmlDom(t)
  }
  generateHtmlDom(t) {
    const s = nt(this.type, this.attributes, this.events, t)
    return (s.__jsx = this.jsxKey()), s
  }
  generateSvgDom(t) {
    const s = ut(this.type, this.attributes, t.document)
    return (s.__jsx = this.jsxKey()), s
  }
  jsxKey() {
    return new yt(this.type, this.attributes).generate()
  }
}
const xt = (e, t, ...s) =>
  typeof e == 'string' ? new Et(e, t, s) : e(vt(t, s))
xt.fragment = (e, t) => {
  const s = j(t, e)
  return new M(s)
}
class At {
  constructor(t, s, r) {
    ;(this.template = t),
      (this.selector = s),
      (this.renderKit = r),
      (this.dom = [])
  }
  renderAndAttach(t) {
    ;(this.parentElement = this.getParentElement()),
      (this.dom = this.render({ ...t, parent: this.parentElement })),
      this.parentElement && this.attach()
  }
  render(t) {
    return this.template.render(t)
  }
  attach() {
    this.parentElement && (this.parentElement.innerHTML = ''),
      this.dom.forEach((t) => {
        this.parentElement && this.parentElement.appendChild(t)
      })
  }
  getParentElement() {
    return this.renderKit.document.querySelector(this.selector)
  }
}
const wt = (e, t, s) => {
    const r = new At(e, t, s)
    return r.renderAndAttach(s), r
  },
  k = 'go-to-href',
  $ = 'go-to',
  m = 'navigation:location-change',
  D = 'navigation:route-change',
  Nt = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        linkNavigationEvent: k,
        locationChangeEvent: m,
        navigationEvent: $,
        routeChangeEvent: D,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  P = (e) => {
    e.create('route', {
      host: '',
      path: '',
      query: {},
    })
  },
  V = (e) => {
    const t = e.closest('[href]')
    return (t && t.getAttribute('href')) || ''
  },
  E = ({ payload: e, publish: t, window: s }) => {
    s.history.pushState(null, '', e), t(m, null)
  },
  F = (e) => {
    const t = e.payload
    if (!t || !t.target) return
    t.preventDefault()
    const s = V(t.target)
    E({ ...e, payload: s })
  },
  L = (e) =>
    e
      .replace(/^\?/, '')
      .split('&')
      .reduce((t, s) => {
        if (!s) return t
        const r = s.split('=')
        return (t[r[0]] = r[1]), t
      }, {}),
  z = (e) => {
    const { state: t, publish: s, window: r } = e,
      { host: n, pathname: i, search: a } = r.location,
      c = i,
      u = L(a),
      h = {
        host: n,
        path: c,
        query: u,
      }
    t.store('route').update(h), s(D, h)
  },
  B = (e) => {
    const { subscribe: t } = e
    t(k, F),
      t($, (s) => {
        E(s)
      })
  },
  K = (e) => {
    const { publish: t, subscribe: s, state: r, window: n } = e
    P(r), n.addEventListener('popstate', () => t(m, null)), s(m, z)
  },
  R = (e) => {
    setTimeout(() => e.publish(m, null), 0)
  },
  U = (e) => {
    K(e), B(e), R(e)
  },
  _t = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        publishLocation: R,
        startNavigation: U,
        subscribeToHistoryChange: K,
        subscribeToNavigation: B,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class C {
  constructor({
    window: t,
    document: s,
    publish: r,
    subscribe: n,
    bus: i,
    state: a,
    renderKit: c,
  }) {
    ;(this.window = t),
      (this.document = s),
      (this.publish = r),
      (this.subscribe = n),
      (this.bus = i),
      (this.state = a),
      (this.renderKit = c),
      (this.roots = [])
  }
  render(t, s) {
    const r = wt(t, s, this.renderKit)
    return this.roots.push(r), r
  }
  startNavigation() {
    U(this)
  }
}
const De = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      App: C,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
class I {
  constructor() {
    this.lookup = {}
  }
  add(t, s, r) {
    this.ensureArrayFor(t)
    const n = {
      listener: s,
      index: r,
      matcher: t,
    }
    return this.lookup[t].push(n), () => this.remove(n)
  }
  remove(t) {
    this.lookup[t.matcher] &&
      (this.lookup[t.matcher] = this.lookup[t.matcher].reduce(
        (s, r) => (r !== t && s.push(r), s),
        [],
      ))
  }
  matches(t) {
    return this.lookup[t] || []
  }
  ensureArrayFor(t) {
    this.lookup[t] || (this.lookup[t] = [])
  }
}
class q {
  constructor() {
    this.lookup = []
  }
  add(t, s, r) {
    const n = {
      listener: s,
      index: r,
      matcher: t,
    }
    return this.lookup.push(n), () => this.remove(n)
  }
  remove(t) {
    this.lookup = this.lookup.reduce((s, r) => (r !== t && s.push(r), s), [])
  }
  matches(t) {
    return this.lookup.filter((s) => s.matcher.test(t))
  }
}
class St {
  constructor({ publish: t, event: s, payload: r, timer: n }) {
    ;(this.setNewTimeout = () => {
      this.stopped ||
        setTimeout(() => {
          this.publishEvent(), this.setNewTimeout()
        }, this.calculateNextTime())
    }),
      (this.calculateNextTime = () =>
        this.timer({
          timeDiff: this.diff(),
          callCount: this.callCount,
          stop: this.stop,
        })),
      (this.publish = t),
      (this.event = s),
      (this.payload = r || null),
      (this.stop = this.stopTimeout.bind(this)),
      (this.stopped = !1),
      (this.timer = n),
      (this.startedAt = /* @__PURE__ */ new Date().getTime()),
      (this.callCount = 0)
  }
  start() {
    this.setNewTimeout()
  }
  diff() {
    return /* @__PURE__ */ new Date().getTime() - this.startedAt
  }
  stopTimeout() {
    ;(this.stopped = !0), this.timeoutId && clearTimeout(this.timeoutId)
  }
  publishEvent() {
    this.stopped ||
      ((this.callCount += 1), this.publish(this.event, this.payload))
  }
}
const Tt = (e) => {
    const { offset: t, period: s } = e,
      r = ({ callCount: n }) => (t && n == 0 ? t : s)
    return {
      event: e.event,
      publish: e.publish,
      payload: e.payload,
      timer: r,
    }
  },
  jt = (e) => {
    let t
    'timer' in e ? (t = e) : (t = Tt(e))
    const s = new St(t)
    return s.start(), s.stop
  }
class J {
  constructor() {
    ;(this.exactSubscriptions = new I()),
      (this.fuzzySubscriptions = new q()),
      (this.currentIndex = 0)
  }
  subscribe(t, s) {
    let r
    return (
      typeof t == 'string'
        ? (r = this.exactSubscriptions.add(t, s, this.currentIndex))
        : (r = this.fuzzySubscriptions.add(t, s, this.currentIndex)),
      (this.currentIndex += 1),
      r
    )
  }
  publish(t, s) {
    ;[
      ...this.exactSubscriptions.matches(t),
      ...this.fuzzySubscriptions.matches(t),
    ]
      .sort((n, i) => n.index - i.index)
      .forEach((n) => {
        n.listener(this.listenerOptions(t, s))
      })
  }
  addListenerOptions(t) {
    this.options = t
  }
  listenerOptions(t, s) {
    return {
      eventName: t,
      ...this.options,
      publish: this.publish.bind(this),
      payload: s,
    }
  }
}
const G = () => {
    const e = new J()
    return {
      bus: e,
      publish: (r, n) => e.publish(r, n),
      subscribe: (r, n) => e.subscribe(r, n),
    }
  },
  Pe = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ExactSubscriptions: I,
        FuzzySubscriptions: q,
        JaxsBus: J,
        createBus: G,
        publishPeriodically: jt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Ot = (e, t) => e === t,
  Mt = (e, t) => Object.keys(e).length === Object.keys(t).length,
  kt = (e, t) =>
    !(v(e) && v(t)) || !Mt(e, t)
      ? !1
      : Object.keys(e).every((s) => {
          const r = e[s],
            n = t[s]
          return x(r, n)
        }),
  $t = (e, t) =>
    !(f(e) && f(t)) || e.length !== t.length
      ? !1
      : e.every((s, r) => {
          const n = t[r]
          return x(s, n)
        }),
  x = (e, t) => (v(e) ? kt(e, t) : f(e) ? $t(e, t) : Ot(e, t))
class g {
  constructor(t) {
    ;(this.name = t.name),
      (this.parent = t.parent),
      (this._value = structuredClone(t.value)),
      (this.initialValue = structuredClone(t.value))
  }
  get value() {
    return this._value
  }
  set value(t) {
    throw new Error('Cannot set value directly. Use an updater!')
  }
  reset() {
    this._value = structuredClone(this.initialValue)
  }
  update(t) {
    if (typeof t == 'function') {
      const s = this.getUpdatedValue(t)
      this.updateValue(s)
    } else this.updateValue(t)
  }
  updateValue(t) {
    x(this._value, t) || ((this._value = t), this.parent.notify(this.name))
  }
  getUpdatedValue(t) {
    return t(structuredClone(this.value))
  }
}
class A {
  constructor(t) {
    this.store = t
  }
  update(t) {
    this.store.update(t)
  }
  reset() {
    this.store.update(this.store.initialValue)
  }
  get value() {
    return this.store.value
  }
}
class Dt extends A {
  updateAttribute(t, s) {
    const r = { ...this.value }
    ;(r[t] = s), this.update(r)
  }
  updateDynamicAttribute(t, s) {
    this.isKey(t) && this.isValueType(t, s) && this.updateAttribute(t, s)
  }
  isKey(t) {
    return t in this.store.initialValue
  }
  isValueType(t, s) {
    return typeof this.store.initialValue[t] == typeof s
  }
  resetAttribute(t) {
    const s = { ...this.value },
      r = this.store.initialValue[t]
    ;(s[t] = r), this.update(s)
  }
}
const Pt = (e) => new Dt(e)
class Vt extends A {
  push(t) {
    const s = [...this.value, t]
    this.update(s)
  }
  pop() {
    const t = [...this.value],
      s = t.pop()
    return this.update(t), s
  }
  unshift(t) {
    const s = [t, ...this.value]
    this.update(s)
  }
  shift() {
    const t = [...this.value],
      s = t.shift()
    return this.update(t), s
  }
  addSorter(t, s) {
    this[t] = () => {
      this.sortBy(s)
    }
  }
  sortBy(t) {
    const s = [...this.value]
    s.sort(t), this.update(s)
  }
  insertAt(t, s) {
    const r = [...this.value]
    r.splice(t, 0, s), this.update(r)
  }
  remove(t) {
    const s = this.value.reduce((r, n) => (n !== t && r.push(n), r), [])
    this.update(s)
  }
  removeBy(t) {
    const s = this.value.reduce((r, n) => (t(n) || r.push(n), r), [])
    this.update(s)
  }
}
const Ft = (e) => new Vt(e)
class Lt extends A {
  toggle() {
    const t = !this.value
    this.update(t)
  }
  setTrue() {
    this.update(!0)
  }
  setFalse() {
    this.update(!1)
  }
}
const zt = (e) => new Lt(e),
  Bt = {
    object: Pt,
    list: Ft,
    boolean: zt,
  },
  w = 'state'
class H {
  constructor(t) {
    ;(this.publisher = t),
      (this.stores = {}),
      (this.eventNamePrefix = w),
      (this.notifications = /* @__PURE__ */ new Set()),
      (this.inTransaction = !1)
  }
  create(t, s) {
    const r = new g({
      name: t,
      parent: this,
      value: s,
    })
    return (this.stores[t] = r), r
  }
  store(t) {
    return (
      this.stores[t] ||
      new g({
        name: t,
        parent: this,
        value: void 0,
      })
    )
  }
  get(t) {
    return this.store(t).value
  }
  getAll(t) {
    return t.reduce((s, r) => ((s[r] = this.get(r)), s), {})
  }
  notify(t) {
    this.inTransaction ? this.notifications.add(t) : this.publish(t)
  }
  update(t, s) {
    this.store(t).update(s)
  }
  transaction(t) {
    ;(this.inTransaction = !0),
      t(this.stores),
      (this.inTransaction = !1),
      this.publishAll()
  }
  publishAll() {
    this.notifications.forEach((t) => {
      this.publish(t)
    }),
      this.notifications.clear()
  }
  publish(t) {
    this.publisher(this.event(t), {
      state: this,
      store: this.store(t),
    })
  }
  event(t) {
    return `${this.eventNamePrefix}:${t}`
  }
}
const Q = (e) => new H(e),
  Ve = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        State: H,
        Store: g,
        createState: Q,
        eventName: w,
        updaters: Bt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class Kt {
  constructor(t) {
    this.setupDomEnvironment(t)
  }
  setup() {
    return (
      this.setupBus(),
      this.setupState(),
      this.addBusOptions(),
      this.setRenderKit(),
      new C({
        window: this.window,
        document: this.document,
        publish: this.publish,
        subscribe: this.subscribe,
        bus: this.bus,
        state: this.state,
        renderKit: this.renderKit,
      })
    )
  }
  setupDomEnvironment(t) {
    t.window
      ? ((this.window = t.window), (this.document = this.window.document))
      : t.document
        ? ((this.window = t.document.defaultView), (this.document = t.document))
        : ((this.window = window), (this.document = document))
  }
  setupBus() {
    const { publish: t, subscribe: s, bus: r } = G()
    ;(this.publish = t), (this.subscribe = s), (this.bus = r)
  }
  setupState() {
    this.state = Q(this.publish)
  }
  addBusOptions() {
    this.bus.addListenerOptions({
      state: this.state,
      document: this.document,
      window: this.window,
    })
  }
  setRenderKit() {
    this.renderKit = {
      publish: this.publish,
      subscribe: this.subscribe,
      state: this.state,
      document: this.document,
      window: this.window,
    }
  }
}
const Fe = (e = {}) => {
  const s = new Kt(e).setup()
  return s.startNavigation(), s
}
var o = /* @__PURE__ */ ((e) => (
  (e[(e.removeNode = 0)] = 'removeNode'),
  (e[(e.insertNode = 1)] = 'insertNode'),
  (e[(e.replaceNode = 2)] = 'replaceNode'),
  (e[(e.removeAttribute = 3)] = 'removeAttribute'),
  (e[(e.addAttribute = 4)] = 'addAttribute'),
  (e[(e.updateAttribute = 5)] = 'updateAttribute'),
  (e[(e.removeEvent = 6)] = 'removeEvent'),
  (e[(e.addEvent = 7)] = 'addEvent'),
  (e[(e.updateEvent = 8)] = 'updateEvent'),
  (e[(e.changeValue = 9)] = 'changeValue'),
  (e[(e.changeText = 10)] = 'changeText'),
  e
))(o || {})
const Le = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ChangeInstructionTypes: o,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Rt = (e, t) => ({
    source: e,
    target: t,
    type: o.changeText,
    data: {},
  }),
  Ut = (e, t) => ({
    source: e,
    target: t,
    type: o.replaceNode,
    data: {},
  }),
  Ct = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.removeAttribute,
  }),
  It = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.addAttribute,
  }),
  qt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.updateAttribute,
  }),
  Jt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.removeEvent,
  }),
  Gt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.addEvent,
  }),
  Ht = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.updateEvent,
  }),
  N = (e) => ({
    source: e,
    target: e,
    // for type crap only
    type: o.removeNode,
    data: {},
  }),
  b = (e, t) => ({
    target: e,
    source: e,
    // for type crap only
    type: o.insertNode,
    data: t,
  }),
  Qt = (e, t, s) => ({
    source: e,
    target: t,
    type: o.changeValue,
    data: s,
  }),
  Wt = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
  _ = { index: -1 }
class Xt {
  constructor() {
    this.map = {}
  }
  populate(t) {
    t.forEach((s, r) => {
      const n = s.__jsx
      n &&
        ((this.map[n] = this.map[n] || []),
        this.map[n].push({
          element: s,
          index: r,
        }))
    })
  }
  pullMatch(t) {
    const s = t && t.__jsx
    return !s || !(this.map[s] && this.map[s].length) ? _ : this.map[s].shift()
  }
  clear(t) {
    const s = t && t.__jsx
    if (!(s && this.map[s] && this.map[s].length)) return
    const r = this.map[s]
    this.map[s] = r.reduce((n, i) => (i.element !== t && n.push(i), n), [])
  }
  check(t) {
    const s = t && t.__jsx
    return s && this.map[s] ? this.map[s].length > 0 : !1
  }
  remaining() {
    return Object.values(this.map).flat()
  }
}
const S = (e) => {
    const t = new Xt()
    return t.populate(e), t
  },
  W = (e, t, s = !1) => {
    const r = [],
      n = e.attributes,
      i = n.length,
      a = t.attributes,
      c = a.length
    let u, h, d
    for (u = 0; u < i; u++) {
      d = null
      const l = n.item(u)
      if (l) {
        for (h = 0; h < c; h++) {
          const p = a.item(h)
          if (p && l.name == p.name) {
            d = p
            break
          }
        }
        d
          ? l.value !== d.value &&
            r.push(
              qt(e, t, {
                name: l.name,
                value: d.value,
                isSvg: s,
              }),
            )
          : r.push(Ct(e, t, { name: l.name, isSvg: s }))
      }
    }
    for (u = 0; u < c; u++) {
      d = null
      const l = a.item(u)
      if (l) {
        for (h = 0; h < i; h++) {
          const p = n.item(h)
          if (p && p.name == l.name) {
            d = p
            break
          }
        }
        d ||
          r.push(
            It(e, t, {
              name: l.name,
              value: l.value,
              isSvg: s,
            }),
          )
      }
    }
    return r
  },
  Yt = (e, t) => {
    const s = [],
      r = e.eventMaps,
      n = t.eventMaps,
      i = Object.keys(r),
      a = Object.keys(n)
    return (
      i.forEach((c) => {
        const u = r[c],
          h = n[c]
        h
          ? h.busEvent !== u.busEvent &&
            s.push(
              Ht(e, t, {
                name: c,
                targetValue: h.listener,
                sourceValue: u.listener,
              }),
            )
          : s.push(
              Jt(e, t, {
                name: u.domEvent,
                value: u.listener,
              }),
            )
      }),
      a.forEach((c) => {
        const u = r[c],
          h = n[c]
        u ||
          s.push(
            Gt(e, t, {
              name: h.domEvent,
              value: h.listener,
            }),
          )
      }),
      s
    )
  },
  Zt = (e) => e.tagName !== 'INPUT',
  te = (e, t) => e.value === t.value,
  ee = (e, t) => {
    if (Zt(e) || te(e, t)) return []
    const s = e,
      r = t
    return [Qt(s, r, { name: 'value', value: r.value })]
  },
  se = (e, t) => {
    const s = W(e, t),
      r = Yt(e, t),
      n = ee(e, t)
    return s.concat(r).concat(n)
  },
  re = (e, t) => W(e, t, !0),
  ne = (e, t) => (e.textContent !== t.textContent ? [Rt(e, t)] : []),
  ie = (e, t, s) => {
    let r = []
    if (e.nodeType === 1 && at(e)) {
      const n = e,
        i = t,
        a = re(n, i),
        c = s(n.childNodes, i.childNodes, n)
      r = a.concat(c)
    } else if (e.nodeType === 1) {
      const n = e,
        i = t,
        a = se(n, i),
        c = s(n.childNodes, i.childNodes, n)
      r = a.concat(c)
    } else e.nodeType === 3 && (r = ne(e, t))
    return r
  },
  X = (e, t, s) => {
    const r = [],
      n = oe(e, t),
      i = S(e),
      a = S(t),
      c = []
    let u = 0
    for (; u < n; u++) {
      const d = e[u],
        l = t[u]
      if (l && a.check(l)) {
        const p = i.pullMatch(l)
        a.clear(l),
          p.element
            ? (p.index !== u &&
                r.push(
                  b(p.element, {
                    parent: s,
                    index: u,
                  }),
                ),
              c.push({
                source: p.element,
                target: l,
              }))
            : d
              ? a.check(d)
                ? r.push(b(l, { parent: s, index: u }))
                : (i.clear(d), r.push(Ut(d, l)))
              : r.push(b(l, { parent: s, index: u }))
      } else d && i.pullMatch(d).element && r.push(N(d))
    }
    i.remaining().forEach(({ element: d }) => {
      r.push(N(d))
    })
    const h = c.reduce(
      (d, { source: l, target: p }) => d.concat(ie(l, p, X)),
      [],
    )
    return r.concat(h).sort(Wt)
  },
  oe = (e, t) => {
    const s = e.length,
      r = t.length
    return s > r ? s : r
  },
  ue = (e, t, s) => {
    const r = X(e, t, s)
    return (
      r.forEach((n) => {
        ae(n)
      }),
      r
    )
  },
  ae = (e) => {
    ;(Ee[e.type] || ce)(e)
  },
  ce = (e) => {},
  le = (e) => {
    const { source: t, target: s } = e
    t.nodeValue = s.textContent
  },
  he = (e) => {
    const { source: t } = e
    t.remove()
  },
  de = (e) => {
    const { target: t, data: s } = e,
      { parent: r, index: n } = s,
      i = r.childNodes[n]
    i ? i && i !== t && r.insertBefore(t, i) : r.appendChild(t)
  },
  pe = (e) => {
    const { source: t, target: s } = e
    t.replaceWith(s)
  },
  me = (e) => {
    const { source: t, data: s } = e,
      { name: r, isSvg: n } = s
    n ? t.removeAttributeNS(null, r) : t.removeAttribute(r)
  },
  Y = (e) => {
    const { source: t, data: s } = e,
      { name: r, value: n, isSvg: i } = s
    i ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
  },
  fe = (e) => {
    Y(e)
  },
  be = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.removeEventListener(r, n)
  },
  ve = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.addEventListener(r, n)
  },
  ge = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, sourceValue: n, targetValue: i } = t
    s.removeEventListener(r, n), s.addEventListener(r, i)
  },
  ye = (e) => {
    const t = e.data,
      s = e.source,
      { value: r } = t
    s.value = r
  },
  Ee = {
    [o.changeText]: le,
    [o.removeNode]: he,
    [o.insertNode]: de,
    [o.replaceNode]: pe,
    [o.removeAttribute]: me,
    [o.addAttribute]: Y,
    [o.updateAttribute]: fe,
    [o.removeEvent]: be,
    [o.addEvent]: ve,
    [o.updateEvent]: ge,
    [o.changeValue]: ye,
  },
  xe = (e, t, s) => {
    const r = [...t]
    return (
      e.forEach((n) => {
        Ae(n, r, s)
      }),
      r
    )
  },
  Ae = (e, t, s) => {
    const r = Se[e.type]
    r && r(e, t, s)
  },
  we = (e, t) => {
    const { source: s } = e,
      r = t.indexOf(s)
    r >= 0 && t.splice(r, 1)
  },
  Ne = (e, t, s) => {
    const { target: r } = e,
      n = e.data,
      { index: i, parent: a } = n
    s === a && t.splice(i, 0, r)
  },
  _e = (e, t) => {
    const { target: s, source: r } = e,
      n = t.indexOf(r)
    n >= 0 && (t[n] = s)
  },
  Se = {
    [o.removeNode]: we,
    [o.insertNode]: Ne,
    [o.replaceNode]: _e,
  }
class Te {
  constructor({ Template: t, subscriptions: s, attributes: r, viewModel: n }) {
    ;(this.Template = t),
      (this.viewModel = n),
      (this.attributes = r),
      (this.subscriptions = s),
      (this.dom = []),
      (this.parentElement = null)
  }
  render(t) {
    return (
      (this.parentElement = t.parent),
      (this.renderKit = t),
      this.subscribeForRerender(),
      (this.dom = this.generateDom(t)),
      this.dom
    )
  }
  generateDom(t) {
    const s = {
        ...this.attributes,
        ...this.viewModel(t.state.getAll(this.subscriptions)),
      },
      r = this.Template(s)
    return r ? r.render(t) : []
  }
  rerender() {
    if (!this.parentElement && this.dom[0]) {
      const r = this.dom[0].parentElement
      this.parentElement = r
    }
    const t = this.generateDom(this.renderKit),
      s = ue(this.dom, t, this.parentElement)
    this.dom = xe(s, this.dom, this.parentElement)
  }
  subscribeForRerender() {
    const { subscribe: t } = this.renderKit
    this.subscriptions.forEach((s) => {
      t(this.eventName(s), () => this.rerender())
    })
  }
  eventName(t) {
    return `${w}:${t}`
  }
}
const je = (e) => e,
  Oe = ({ Template: e, viewModel: t, subscriptions: s }) => (
    (s = s || []),
    (t = t || je),
    (r) =>
      new Te({ Template: e, viewModel: t, subscriptions: s, attributes: r })
  ),
  Me =
    (e) =>
    ({ path: t }) =>
      t === e,
  ke = () => !0,
  Z =
    (e) =>
    ({ route: t }) => {
      const s = e.find((r) => r.match(t))
      return s && s.Partial
    },
  ze = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        buildRouter: Z,
        catchAll: ke,
        exactPathMatch: Me,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  $e = () => ({
    render: (e, t) => [],
  }),
  Be = (e) => {
    const t = Z(e)
    return Oe({
      Template: ({ route: r }) => (t({ route: r }) || $e)(),
      subscriptions: ['route'],
    })
  },
  Ke = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        createRouteState: P,
        events: Nt,
        extractQueryParams: L,
        findHref: V,
        navigate: E,
        onLinkClick: F,
        onLocationChange: z,
        start: _t,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
export {
  Le as JaxsTypes,
  De as appBuilding,
  Oe as bind,
  Fe as createApp,
  xt as jsx,
  Pe as messageBus,
  Ke as navigation,
  Be as routedView,
  ze as routing,
  Ve as state,
}
