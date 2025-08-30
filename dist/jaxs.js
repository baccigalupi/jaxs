const Z = (e, t) => t.createElement(e),
  tt = (e, t) => {
    for (const s in t) {
      if (s === '__self') continue
      const r = t[s].toString()
      if (s === 'value') {
        const n = e
        n.value !== r && (n.value = r)
      } else e.setAttribute(s, r)
    }
  },
  et = (e, t, s) => {
    const r = {}
    for (const n in t) {
      const i = t[n],
        a = (l) => s(i, l)
      e.addEventListener(n, a),
        (r[n] = {
          domEvent: n,
          busEvent: i,
          listener: a,
        })
    }
    e.eventMaps = r
  },
  st = (e, t, s, r) => {
    const n = Z(e, r.document)
    return tt(n, t), et(n, s, r.publish), n
  },
  y = 'http://www.w3.org/2000/svg',
  rt = {
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
  nt = (e, t) => !!(rt[e] || (e === 'a' && t === y)),
  it = (e, t, s) => {
    const r = s.createElementNS(y, e)
    for (const n in t)
      n === '__self' ||
        n === 'xmlns' ||
        r.setAttributeNS(null, n, t[n].toString())
    return r
  },
  ot = (e) => e.namespaceURI === y,
  ut = (e, t) => t.createTextNode(e)
class at {
  constructor(t) {
    this.value = t.toString()
  }
  render(t) {
    const s = ut(this.value, t.document)
    return (s.__jsx = 'TextNode'), [s]
  }
}
const ct = (e) => typeof e == 'string' || typeof e == 'number',
  lt = (e) => new at(e),
  ht = (e) => (ct(e) ? lt(e) : e),
  dt = (e) => pt(e).map(ht).flat(),
  pt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
  T = (e, t = {}) => e || t.children || [],
  mt = (e, t = '') => {
    const s = {},
      r = {}
    for (const n in e) {
      const i = e[n]
      if (n.match(/^on.+/i)) {
        const a = n.slice(2).toLowerCase()
        r[a] = i ? i.toString() : ''
      } else {
        if (i === !1) continue
        n === '__source' ? (s.__source = e.__source) : (s[n] = ft(n, i, t))
      }
    }
    return {
      attributes: s,
      events: r,
    }
  },
  ft = (e, t, s = '') => (t == null ? s : t.toString()),
  bt = (e, t) => {
    const s = e || {},
      r = T(t, s)
    return (s.children = s.children || r), s
  },
  j = (e, t, s, r = []) => e.reduce(vt(t, s), r).flat(),
  vt = (e, t) => (s, r) =>
    r
      ? Array.isArray(r)
        ? j(r, e, t, s)
        : (r.render(e, t).forEach((n) => s.push(n)), s)
      : s
class O {
  constructor(t) {
    this.collection = dt(t)
  }
  render(t, s) {
    this.parentElement = s
    const r = this.generateDom(t)
    return this.attachToParent(r), r
  }
  generateDom(t) {
    return j(this.collection, t, this.parentElement)
  }
  attachToParent(t) {
    if (this.parentElement === void 0) return
    const s = this.parentElement
    t.forEach((r) => s.appendChild(r))
  }
}
class gt {
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
class yt {
  constructor(t, s, r = []) {
    this.type = t
    const { events: n, attributes: i } = mt(s)
    ;(this.events = n),
      (this.attributes = i),
      (this.isSvg = nt(this.type, this.attributes.xmlns)),
      (this.children = new O(r))
  }
  render(t) {
    const s = this.generateDom(t)
    return s ? (this.children.render(t, s), [s]) : []
  }
  generateDom(t) {
    return this.isSvg ? this.generateSvgDom(t) : this.generateHtmlDom(t)
  }
  generateHtmlDom(t) {
    const s = st(this.type, this.attributes, this.events, t)
    return (s.__jsx = this.jsxKey()), s
  }
  generateSvgDom(t) {
    const s = it(this.type, this.attributes, t.document)
    return (s.__jsx = this.jsxKey()), s
  }
  jsxKey() {
    return new gt(this.type, this.attributes).generate()
  }
}
const Et = (e, t, ...s) =>
  typeof e == 'string' ? new yt(e, t, s) : e(bt(t, s))
Et.fragment = (e, t) => {
  const s = T(t, e)
  return new O(s)
}
class xt {
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
const At = (e, t, s) => {
    const r = new xt(e, t, s)
    return r.renderAndAttach(s), r
  },
  M = 'go-to-href',
  k = 'go-to',
  m = 'navigation:location-change',
  $ = 'navigation:route-change',
  wt = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        linkNavigationEvent: M,
        locationChangeEvent: m,
        navigationEvent: k,
        routeChangeEvent: $,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  D = (e) => {
    e.create('route', {
      host: '',
      path: '',
      query: {},
    })
  },
  P = (e) => {
    const t = e.closest('[href]')
    return (t && t.getAttribute('href')) || ''
  },
  E = (e, { publish: t, window: s }) => {
    s.history.pushState(null, '', e), t(m, null)
  },
  V = (e, t) => {
    if (!e || !e.target) return
    e.preventDefault()
    const s = P(e.target)
    E(s, t)
  },
  F = (e) =>
    e
      .replace(/^\?/, '')
      .split('&')
      .reduce((t, s) => {
        if (!s) return t
        const r = s.split('=')
        return (t[r[0]] = r[1]), t
      }, {}),
  L = (e, t) => {
    const { state: s, publish: r, window: n } = t,
      { host: i, pathname: a, search: l } = n.location,
      u = a,
      d = F(l),
      c = {
        host: i,
        path: u,
        query: d,
      }
    s.store('route').update(c), r($, c)
  },
  z = (e) => {
    const { subscribe: t } = e
    t(M, V),
      t(k, (s, r) => {
        E(s, r)
      })
  },
  B = (e) => {
    const { publish: t, subscribe: s, state: r, window: n } = e
    D(r), n.addEventListener('popstate', () => t(m, null)), s(m, L)
  },
  K = (e) => {
    setTimeout(() => e.publish(m, null), 0)
  },
  R = (e) => {
    B(e), z(e), K(e)
  },
  Nt = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        publishLocation: K,
        startNavigation: R,
        subscribeToHistoryChange: B,
        subscribeToNavigation: z,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class U {
  constructor({
    window: t,
    document: s,
    publish: r,
    subscribe: n,
    bus: i,
    state: a,
    renderKit: l,
  }) {
    ;(this.window = t),
      (this.document = s),
      (this.publish = r),
      (this.subscribe = n),
      (this.bus = i),
      (this.state = a),
      (this.renderKit = l),
      (this.roots = [])
  }
  render(t, s) {
    const r = At(t, s, this.renderKit)
    return this.roots.push(r), r
  }
  startNavigation() {
    R(this)
  }
}
const $e = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      App: U,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
class C {
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
class I {
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
class _t {
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
const St = (e) => {
    const { offset: t, period: s } = e,
      r = ({ callCount: n }) => (t && n == 0 ? t : s)
    return {
      event: e.event,
      publish: e.publish,
      payload: e.payload,
      timer: r,
    }
  },
  Tt = (e) => {
    let t
    'timer' in e ? (t = e) : (t = St(e))
    const s = new _t(t)
    return s.start(), s.stop
  }
class q {
  constructor() {
    ;(this.exactSubscriptions = new C()),
      (this.fuzzySubscriptions = new I()),
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
        n.listener(s, this.listenerOptions(t))
      })
  }
  addListenerOptions(t) {
    this.options = t
  }
  listenerOptions(t) {
    return {
      eventName: t,
      ...this.options,
      publish: this.publish.bind(this),
    }
  }
}
const J = () => {
    const e = new q()
    return {
      bus: e,
      publish: (r, n) => e.publish(r, n),
      subscribe: (r, n) => e.subscribe(r, n),
    }
  },
  De = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ExactSubscriptions: C,
        FuzzySubscriptions: I,
        JaxsBus: q,
        createBus: J,
        publishPeriodically: Tt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  f = (e) => Array.isArray(e),
  v = (e) => e !== null && !f(e) && typeof e == 'object',
  jt = (e, t) => e === t,
  Ot = (e, t) => Object.keys(e).length === Object.keys(t).length,
  Mt = (e, t) =>
    !(v(e) && v(t)) || !Ot(e, t)
      ? !1
      : Object.keys(e).every((s) => {
          const r = e[s],
            n = t[s]
          return x(r, n)
        }),
  kt = (e, t) =>
    !(f(e) && f(t)) || e.length !== t.length
      ? !1
      : e.every((s, r) => {
          const n = t[r]
          return x(s, n)
        }),
  x = (e, t) => (v(e) ? Mt(e, t) : f(e) ? kt(e, t) : jt(e, t))
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
class $t extends A {
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
const Dt = (e) => new $t(e)
class Pt extends A {
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
const Vt = (e) => new Pt(e)
class Ft extends A {
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
const Lt = (e) => new Ft(e),
  zt = {
    object: Dt,
    list: Vt,
    boolean: Lt,
  },
  w = 'state'
class G {
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
const H = (e) => new G(e),
  Pe = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        State: G,
        Store: g,
        createState: H,
        eventName: w,
        updaters: zt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class Bt {
  constructor(t) {
    this.setupDomEnvironment(t)
  }
  setup() {
    return (
      this.setupBus(),
      this.setupState(),
      this.addBusOptions(),
      this.setRenderKit(),
      new U({
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
    const { publish: t, subscribe: s, bus: r } = J()
    ;(this.publish = t), (this.subscribe = s), (this.bus = r)
  }
  setupState() {
    this.state = H(this.publish)
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
const Ve = (e = {}) => {
  const s = new Bt(e).setup()
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
const Fe = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ChangeInstructionTypes: o,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Kt = (e, t) => ({
    source: e,
    target: t,
    type: o.changeText,
    data: {},
  }),
  Rt = (e, t) => ({
    source: e,
    target: t,
    type: o.replaceNode,
    data: {},
  }),
  Ut = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.removeAttribute,
  }),
  Ct = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.addAttribute,
  }),
  It = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.updateAttribute,
  }),
  qt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.removeEvent,
  }),
  Jt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.addEvent,
  }),
  Gt = (e, t, s) => ({
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
  Ht = (e, t, s) => ({
    source: e,
    target: t,
    type: o.changeValue,
    data: s,
  }),
  Qt = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
  _ = { index: -1 }
class Wt {
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
    const t = new Wt()
    return t.populate(e), t
  },
  Q = (e, t, s = !1) => {
    const r = [],
      n = e.attributes,
      i = n.length,
      a = t.attributes,
      l = a.length
    let u, d, c
    for (u = 0; u < i; u++) {
      c = null
      const h = n.item(u)
      if (h) {
        for (d = 0; d < l; d++) {
          const p = a.item(d)
          if (p && h.name == p.name) {
            c = p
            break
          }
        }
        c
          ? h.value !== c.value &&
            r.push(
              It(e, t, {
                name: h.name,
                value: c.value,
                isSvg: s,
              }),
            )
          : r.push(Ut(e, t, { name: h.name, isSvg: s }))
      }
    }
    for (u = 0; u < l; u++) {
      c = null
      const h = a.item(u)
      if (h) {
        for (d = 0; d < i; d++) {
          const p = n.item(d)
          if (p && p.name == h.name) {
            c = p
            break
          }
        }
        c ||
          r.push(
            Ct(e, t, {
              name: h.name,
              value: h.value,
              isSvg: s,
            }),
          )
      }
    }
    return r
  },
  Xt = (e, t) => {
    const s = [],
      r = e.eventMaps,
      n = t.eventMaps,
      i = Object.keys(r),
      a = Object.keys(n)
    return (
      i.forEach((l) => {
        const u = r[l],
          d = n[l]
        d
          ? d.busEvent !== u.busEvent &&
            s.push(
              Gt(e, t, {
                name: l,
                targetValue: d.listener,
                sourceValue: u.listener,
              }),
            )
          : s.push(
              qt(e, t, {
                name: u.domEvent,
                value: u.listener,
              }),
            )
      }),
      a.forEach((l) => {
        const u = r[l],
          d = n[l]
        u ||
          s.push(
            Jt(e, t, {
              name: d.domEvent,
              value: d.listener,
            }),
          )
      }),
      s
    )
  },
  Yt = (e) => e.tagName !== 'INPUT',
  Zt = (e, t) => e.value === t.value,
  te = (e, t) => {
    if (Yt(e) || Zt(e, t)) return []
    const s = e,
      r = t
    return [Ht(s, r, { name: 'value', value: r.value })]
  },
  ee = (e, t) => {
    const s = Q(e, t),
      r = Xt(e, t),
      n = te(e, t)
    return s.concat(r).concat(n)
  },
  se = (e, t) => Q(e, t, !0),
  re = (e, t) => (e.textContent !== t.textContent ? [Kt(e, t)] : []),
  ne = (e, t, s) => {
    let r = []
    if (e.nodeType === 1 && ot(e)) {
      const n = e,
        i = t,
        a = se(n, i),
        l = s(n.childNodes, i.childNodes, n)
      r = a.concat(l)
    } else if (e.nodeType === 1) {
      const n = e,
        i = t,
        a = ee(n, i),
        l = s(n.childNodes, i.childNodes, n)
      r = a.concat(l)
    } else e.nodeType === 3 && (r = re(e, t))
    return r
  },
  W = (e, t, s) => {
    const r = [],
      n = ie(e, t),
      i = S(e),
      a = S(t),
      l = []
    let u = 0
    for (; u < n; u++) {
      const c = e[u],
        h = t[u]
      if (h && a.check(h)) {
        const p = i.pullMatch(h)
        a.clear(h),
          p.element
            ? (p.index !== u &&
                r.push(
                  b(p.element, {
                    parent: s,
                    index: u,
                  }),
                ),
              l.push({
                source: p.element,
                target: h,
              }))
            : c
              ? a.check(c)
                ? r.push(b(h, { parent: s, index: u }))
                : (i.clear(c), r.push(Rt(c, h)))
              : r.push(b(h, { parent: s, index: u }))
      } else c && i.pullMatch(c).element && r.push(N(c))
    }
    i.remaining().forEach(({ element: c }) => {
      r.push(N(c))
    })
    const d = l.reduce(
      (c, { source: h, target: p }) => c.concat(ne(h, p, W)),
      [],
    )
    return r.concat(d).sort(Qt)
  },
  ie = (e, t) => {
    const s = e.length,
      r = t.length
    return s > r ? s : r
  },
  oe = (e, t, s) => {
    const r = W(e, t, s)
    return (
      r.forEach((n) => {
        ue(n)
      }),
      r
    )
  },
  ue = (e) => {
    ;(ye[e.type] || ae)(e)
  },
  ae = (e) => {},
  ce = (e) => {
    const { source: t, target: s } = e
    t.nodeValue = s.textContent
  },
  le = (e) => {
    const { source: t } = e
    t.remove()
  },
  he = (e) => {
    const { target: t, data: s } = e,
      { parent: r, index: n } = s,
      i = r.childNodes[n]
    i ? i && i !== t && r.insertBefore(t, i) : r.appendChild(t)
  },
  de = (e) => {
    const { source: t, target: s } = e
    t.replaceWith(s)
  },
  pe = (e) => {
    const { source: t, data: s } = e,
      { name: r, isSvg: n } = s
    n ? t.removeAttributeNS(null, r) : t.removeAttribute(r)
  },
  X = (e) => {
    const { source: t, data: s } = e,
      { name: r, value: n, isSvg: i } = s
    i ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
  },
  me = (e) => {
    X(e)
  },
  fe = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.removeEventListener(r, n)
  },
  be = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.addEventListener(r, n)
  },
  ve = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, sourceValue: n, targetValue: i } = t
    s.removeEventListener(r, n), s.addEventListener(r, i)
  },
  ge = (e) => {
    const t = e.data,
      s = e.source,
      { value: r } = t
    s.value = r
  },
  ye = {
    [o.changeText]: ce,
    [o.removeNode]: le,
    [o.insertNode]: he,
    [o.replaceNode]: de,
    [o.removeAttribute]: pe,
    [o.addAttribute]: X,
    [o.updateAttribute]: me,
    [o.removeEvent]: fe,
    [o.addEvent]: be,
    [o.updateEvent]: ve,
    [o.changeValue]: ge,
  },
  Ee = (e, t, s) => {
    const r = [...t]
    return (
      e.forEach((n) => {
        xe(n, r, s)
      }),
      r
    )
  },
  xe = (e, t, s) => {
    const r = _e[e.type]
    r && r(e, t, s)
  },
  Ae = (e, t) => {
    const { source: s } = e,
      r = t.indexOf(s)
    r >= 0 && t.splice(r, 1)
  },
  we = (e, t, s) => {
    const { target: r } = e,
      n = e.data,
      { index: i, parent: a } = n
    s === a && t.splice(i, 0, r)
  },
  Ne = (e, t) => {
    const { target: s, source: r } = e,
      n = t.indexOf(r)
    n >= 0 && (t[n] = s)
  },
  _e = {
    [o.removeNode]: Ae,
    [o.insertNode]: we,
    [o.replaceNode]: Ne,
  }
class Se {
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
      s = oe(this.dom, t, this.parentElement)
    this.dom = Ee(s, this.dom, this.parentElement)
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
const Te = (e) => e,
  je = ({ Template: e, viewModel: t, subscriptions: s }) => (
    (s = s || []),
    (t = t || Te),
    (r) =>
      new Se({ Template: e, viewModel: t, subscriptions: s, attributes: r })
  ),
  Le = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        createRouteState: D,
        events: wt,
        extractQueryParams: F,
        findHref: P,
        navigate: E,
        onLinkClick: V,
        onLocationChange: L,
        start: Nt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Oe =
    (e) =>
    ({ path: t }) =>
      t === e,
  Me = () => !0,
  Y =
    (e) =>
    ({ route: t }) => {
      const s = e.find((r) => r.match(t))
      return s && s.Partial
    },
  ze = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        buildRouter: Y,
        catchAll: Me,
        exactPathMatch: Oe,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  ke = () => ({
    render: (e, t) => [],
  }),
  Be = (e) => {
    const t = Y(e)
    return je({
      Template: ({ route: r }) => (t({ route: r }) || ke)(),
      subscriptions: ['route'],
    })
  }
export {
  Fe as JaxsTypes,
  $e as appBuilding,
  je as bind,
  Ve as createApp,
  Et as jsx,
  De as messageBus,
  Le as navigation,
  Be as routedView,
  ze as routing,
  Pe as state,
}
