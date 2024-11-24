const tt = (e, t) => t.createElement(e),
  et = (e, t) => {
    for (const s in t) {
      if (s === '__self') continue
      const r = t[s].toString()
      if (s === 'value') {
        const n = e
        n.value !== r && (n.value = r)
      } else e.setAttribute(s, r)
    }
  },
  st = (e, t, s) => {
    const r = {}
    for (const n in t) {
      const o = t[n],
        a = (h) => s(o, h)
      e.addEventListener(n, a),
        (r[n] = {
          domEvent: n,
          busEvent: o,
          listener: a,
        })
    }
    e.eventMaps = r
  },
  rt = (e, t, s, r) => {
    const n = tt(e, r.document)
    return et(n, t), st(n, s, r.publish), n
  },
  E = 'http://www.w3.org/2000/svg',
  nt = {
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
  ot = (e, t) => !!(nt[e] || (e === 'a' && t === E)),
  it = (e, t, s) => {
    const r = s.createElementNS(E, e)
    for (const n in t)
      n === '__self' ||
        n === 'xmlns' ||
        r.setAttributeNS(null, n, t[n].toString())
    return r
  },
  ut = (e) => e.namespaceURI === E,
  at = (e, t) => t.createTextNode(e)
class ct {
  constructor(t) {
    this.value = t.toString()
  }
  render(t) {
    const s = at(this.value, t.document)
    return (s.__jsx = 'TextNode'), [s]
  }
}
const ht = (e) => typeof e == 'string' || typeof e == 'number',
  lt = (e) => new ct(e),
  dt = (e) => (ht(e) ? lt(e) : e),
  pt = (e) => mt(e).map(dt).flat(),
  mt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
  j = (e, t = {}) => e || t.children || [],
  ft = (e, t = '') => {
    const s = {},
      r = {}
    for (const n in e) {
      const o = e[n]
      if (n.match(/^on.+/i)) {
        const a = n.slice(2).toLowerCase()
        r[a] = o ? o.toString() : ''
      } else {
        if (o === !1) continue
        n === '__source' ? (s.__source = e.__source) : (s[n] = bt(n, o, t))
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
  k = (e, t, s, r = []) => e.reduce(gt(t, s), r).flat(),
  gt = (e, t) => (s, r) =>
    r
      ? Array.isArray(r)
        ? k(r, e, t, s)
        : (r.render(e, t).forEach((n) => s.push(n)), s)
      : s
class O {
  constructor(t) {
    this.collection = pt(t)
  }
  render(t, s) {
    this.parentElement = s
    const r = this.generateDom(t)
    return this.attachToParent(r), r
  }
  generateDom(t) {
    return k(this.collection, t, this.parentElement)
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
    const { events: n, attributes: o } = ft(s)
    ;(this.events = n),
      (this.attributes = o),
      (this.isSvg = ot(this.type, this.attributes.xmlns)),
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
    const s = rt(this.type, this.attributes, this.events, t)
    return (s.__jsx = this.jsxKey()), s
  }
  generateSvgDom(t) {
    const s = it(this.type, this.attributes, t.document)
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
  return new O(s)
}
class wt {
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
    const r = new wt(e, t, s)
    return r.renderAndAttach(s), r
  },
  M = 'go-to-href',
  m = 'navigation:location-change',
  $ = 'navigation:route-change',
  St = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        linkNavigationEvent: M,
        locationChangeEvent: m,
        routeChangeEvent: $,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  F = (e) => {
    e.createRecord('route', {
      host: '',
      path: '',
      query: {},
    })
  },
  T = (e) => {
    const t = e.closest('[href]')
    return (t && t.getAttribute('href')) || ''
  },
  D = (e, { publish: t, window: s }) => {
    s.history.pushState(null, '', e), t(m, null)
  },
  L = (e, t) => {
    if (!e || !e.target) return
    e.preventDefault()
    const s = T(e.target)
    D(s, t)
  },
  B = (e) =>
    e
      .replace(/^\?/, '')
      .split('&')
      .reduce((t, s) => {
        if (!s) return t
        const r = s.split('=')
        return (t[r[0]] = r[1]), t
      }, {}),
  P = (e, t) => {
    const { state: s, publish: r, window: n } = t,
      { host: o, pathname: a, search: h } = n.location,
      u = a,
      d = B(h),
      c = {
        host: o,
        path: u,
        query: d,
      }
    s.store('route').update(c), r($, c)
  },
  U = (e) => {
    const { subscribe: t } = e
    t(M, L)
  },
  z = (e) => {
    const { publish: t, subscribe: s, state: r, window: n } = e
    F(r), n.addEventListener('popstate', () => t(m, null)), s(m, P)
  },
  V = (e) => {
    setTimeout(() => e.publish(m, null), 0)
  },
  K = (e) => {
    z(e), U(e), V(e)
  },
  _t = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        publishLocation: V,
        startNavigation: K,
        subscribeToHistoryChange: z,
        subscribeToNavigation: U,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class R {
  constructor({
    window: t,
    document: s,
    publish: r,
    subscribe: n,
    bus: o,
    state: a,
    renderKit: h,
  }) {
    ;(this.window = t),
      (this.document = s),
      (this.publish = r),
      (this.subscribe = n),
      (this.bus = o),
      (this.state = a),
      (this.renderKit = h),
      (this.roots = [])
  }
  render(t, s) {
    const r = At(t, s, this.renderKit)
    return this.roots.push(r), r
  }
  startNavigation() {
    K(this)
  }
}
const ye = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      App: R,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
class q {
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
class J {
  constructor() {
    ;(this.exactSubscriptions = new q()),
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
      .sort((n, o) => n.index - o.index)
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
const H = () => {
    const e = new J()
    return {
      bus: e,
      publish: (r, n) => e.publish(r, n),
      subscribe: (r, n) => e.subscribe(r, n),
    }
  },
  Ee = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ExactSubscriptions: q,
        FuzzySubscriptions: I,
        JaxsBus: J,
        createBus: H,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  f = (e) => Array.isArray(e),
  g = (e) => e !== null && !f(e) && typeof e == 'object',
  Nt = (e, t) => e === t,
  jt = (e, t) => Object.keys(e).length === Object.keys(t).length,
  kt = (e, t) =>
    !(g(e) && g(t)) || !jt(e, t)
      ? !1
      : Object.keys(e).every((s) => {
          const r = e[s],
            n = t[s]
          return x(r, n)
        }),
  Ot = (e, t) =>
    !(f(e) && f(t)) || e.length !== t.length
      ? !1
      : e.every((s, r) => {
          const n = t[r]
          return x(s, n)
        }),
  x = (e, t) => (g(e) ? kt(e, t) : f(e) ? Ot(e, t) : Nt(e, t))
class b {
  constructor(t) {
    this.store = t
  }
  update(t) {
    this.store.update(t)
  }
  reset() {
    this.store.update(this.store.initialState)
  }
  get value() {
    return this.store.value
  }
  addUpdaterFunction(t, s) {
    this.constructor.prototype[t] = (...r) => {
      const n = s(this.value, ...r)
      this.update(n)
    }
  }
  addUpdaterFunctions(t) {
    for (const s in t) this.addUpdaterFunction(s, t[s])
  }
}
class w extends b {
  addUpdaterFunction(t, s) {
    this.constructor.prototype[t] = (...r) => {
      const n = s(this.value, ...r)
      this.update(n)
    }
  }
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
}
class y {
  constructor(t) {
    ;(this.name = t.name),
      (this.parent = t.parent),
      (this._value = t.value),
      (this.initialState = structuredClone(t.value)),
      (this.updater = new b(this))
  }
  get value() {
    return this._value
  }
  set value(t) {
    throw new Error('Cannot set value directly. Use an updater!')
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
    return t(this.value)
  }
  addUpdaters(t) {
    this.updater.addUpdaterFunctions(t)
  }
  addUpdater(t, s) {
    this.updater.addUpdaterFunction(t, s)
  }
  addSorter(t, s) {
    this.updater instanceof w && this.updater.addSorter(t, s)
  }
}
class G extends b {
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
  addUpdaterFunction(t, s) {
    this.constructor.prototype[t] = (...r) => {
      const n = s(this.value, ...r)
      this.update(n)
    }
  }
}
class C extends b {
  addUpdaterFunction(t, s) {
    this.constructor.prototype[t] = (...r) => {
      const n = s(this.value, ...r)
      this.update(n)
    }
  }
  updateAttribute(t, s) {
    const r = { ...this.value }
    ;(r[t] = s), this.update(r)
  }
}
const A = 'state'
class Q {
  constructor(t) {
    ;(this.publisher = t),
      (this.stores = {}),
      (this.eventNamePrefix = A),
      (this.notifications = /* @__PURE__ */ new Set()),
      (this.inTransaction = !1)
  }
  create(t, s) {
    const r = new y({
      name: t,
      parent: this,
      value: s,
    })
    return (this.stores[t] = r), r
  }
  createBoolean(t, s) {
    const r = this.create(t, s)
    return (r.updater = new G(r)), r
  }
  createRecord(t, s) {
    const r = this.create(t, s)
    return (r.updater = new C(r)), r
  }
  createList(t, s) {
    const r = this.create(t, s)
    return (r.updater = new w(r)), r
  }
  store(t) {
    return (
      this.stores[t] ||
      new y({
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
const W = (e) => new Q(e),
  xe = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        State: Q,
        Store: y,
        StoreUpdaterBoolean: G,
        StoreUpdaterList: w,
        StoreUpdaterObject: C,
        createState: W,
        eventName: A,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class Mt {
  constructor(t) {
    this.setupDomEnvironment(t)
  }
  setup() {
    return (
      this.setupBus(),
      this.setupState(),
      this.addBusOptions(),
      this.setRenderKit(),
      new R({
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
    const { publish: t, subscribe: s, bus: r } = H()
    ;(this.publish = t), (this.subscribe = s), (this.bus = r)
  }
  setupState() {
    this.state = W(this.publish)
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
const we = (e = {}) => {
  const s = new Mt(e).setup()
  return s.startNavigation(), s
}
var i = /* @__PURE__ */ ((e) => (
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
))(i || {})
const Ae = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ChangeInstructionTypes: i,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  $t = (e, t) => ({
    source: e,
    target: t,
    type: i.changeText,
    data: {},
  }),
  Ft = (e, t) => ({
    source: e,
    target: t,
    type: i.replaceNode,
    data: {},
  }),
  Tt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.removeAttribute,
  }),
  Dt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.addAttribute,
  }),
  Lt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.updateAttribute,
  }),
  Bt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.removeEvent,
  }),
  Pt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.addEvent,
  }),
  Ut = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.updateEvent,
  }),
  S = (e) => ({
    source: e,
    target: e,
    // for type crap only
    type: i.removeNode,
    data: {},
  }),
  v = (e, t) => ({
    target: e,
    source: e,
    // for type crap only
    type: i.insertNode,
    data: t,
  }),
  zt = (e, t, s) => ({
    source: e,
    target: t,
    type: i.changeValue,
    data: s,
  }),
  Vt = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
  _ = { index: -1 }
class Kt {
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
    this.map[s] = r.reduce((n, o) => (o.element !== t && n.push(o), n), [])
  }
  check(t) {
    const s = t && t.__jsx
    return s && this.map[s] ? this.map[s].length > 0 : !1
  }
  remaining() {
    return Object.values(this.map).flat()
  }
}
const N = (e) => {
    const t = new Kt()
    return t.populate(e), t
  },
  X = (e, t, s = !1) => {
    const r = [],
      n = e.attributes,
      o = n.length,
      a = t.attributes,
      h = a.length
    let u, d, c
    for (u = 0; u < o; u++) {
      c = null
      const l = n.item(u)
      if (l) {
        for (d = 0; d < h; d++) {
          const p = a.item(d)
          if (p && l.name == p.name) {
            c = p
            break
          }
        }
        c
          ? l.value !== c.value &&
            r.push(
              Lt(e, t, {
                name: l.name,
                value: c.value,
                isSvg: s,
              }),
            )
          : r.push(Tt(e, t, { name: l.name, isSvg: s }))
      }
    }
    for (u = 0; u < h; u++) {
      c = null
      const l = a.item(u)
      if (l) {
        for (d = 0; d < o; d++) {
          const p = n.item(d)
          if (p && p.name == l.name) {
            c = p
            break
          }
        }
        c ||
          r.push(
            Dt(e, t, {
              name: l.name,
              value: l.value,
              isSvg: s,
            }),
          )
      }
    }
    return r
  },
  Rt = (e, t) => {
    const s = [],
      r = e.eventMaps,
      n = t.eventMaps,
      o = Object.keys(r),
      a = Object.keys(n)
    return (
      o.forEach((h) => {
        const u = r[h],
          d = n[h]
        d
          ? d.busEvent !== u.busEvent &&
            s.push(
              Ut(e, t, {
                name: h,
                targetValue: d.listener,
                sourceValue: u.listener,
              }),
            )
          : s.push(
              Bt(e, t, {
                name: u.domEvent,
                value: u.listener,
              }),
            )
      }),
      a.forEach((h) => {
        const u = r[h],
          d = n[h]
        u ||
          s.push(
            Pt(e, t, {
              name: d.domEvent,
              value: d.listener,
            }),
          )
      }),
      s
    )
  },
  qt = (e) => e.tagName !== 'INPUT',
  It = (e, t) => e.value === t.value,
  Jt = (e, t) => {
    if (qt(e) || It(e, t)) return []
    const s = e,
      r = t
    return [zt(s, r, { name: 'value', value: r.value })]
  },
  Ht = (e, t) => {
    const s = X(e, t),
      r = Rt(e, t),
      n = Jt(e, t)
    return s.concat(r).concat(n)
  },
  Gt = (e, t) => X(e, t, !0),
  Ct = (e, t) => (e.textContent !== t.textContent ? [$t(e, t)] : []),
  Qt = (e, t, s) => {
    let r = []
    if (e.nodeType === 1 && ut(e)) {
      const n = e,
        o = t,
        a = Gt(n, o),
        h = s(n.childNodes, o.childNodes, n)
      r = a.concat(h)
    } else if (e.nodeType === 1) {
      const n = e,
        o = t,
        a = Ht(n, o),
        h = s(n.childNodes, o.childNodes, n)
      r = a.concat(h)
    } else e.nodeType === 3 && (r = Ct(e, t))
    return r
  },
  Y = (e, t, s) => {
    const r = [],
      n = Wt(e, t),
      o = N(e),
      a = N(t),
      h = []
    let u = 0
    for (; u < n; u++) {
      const c = e[u],
        l = t[u]
      if (l && a.check(l)) {
        const p = o.pullMatch(l)
        a.clear(l),
          p.element
            ? (p.index !== u &&
                r.push(
                  v(p.element, {
                    parent: s,
                    index: u,
                  }),
                ),
              h.push({
                source: p.element,
                target: l,
              }))
            : c
              ? a.check(c)
                ? r.push(v(l, { parent: s, index: u }))
                : (o.clear(c), r.push(Ft(c, l)))
              : r.push(v(l, { parent: s, index: u }))
      } else c && o.pullMatch(c).element && r.push(S(c))
    }
    o.remaining().forEach(({ element: c }) => {
      r.push(S(c))
    })
    const d = h.reduce(
      (c, { source: l, target: p }) => c.concat(Qt(l, p, Y)),
      [],
    )
    return r.concat(d).sort(Vt)
  },
  Wt = (e, t) => {
    const s = e.length,
      r = t.length
    return s > r ? s : r
  },
  Xt = (e, t, s) => {
    const r = Y(e, t, s)
    return (
      r.forEach((n) => {
        Yt(n)
      }),
      r
    )
  },
  Yt = (e) => {
    ;(he[e.type] || Zt)(e)
  },
  Zt = (e) => {},
  te = (e) => {
    const { source: t, target: s } = e
    t.nodeValue = s.textContent
  },
  ee = (e) => {
    const { source: t } = e
    t.remove()
  },
  se = (e) => {
    const { target: t, data: s } = e,
      { parent: r, index: n } = s,
      o = r.childNodes[n]
    o ? o && o !== t && r.insertBefore(t, o) : r.appendChild(t)
  },
  re = (e) => {
    const { source: t, target: s } = e
    t.replaceWith(s)
  },
  ne = (e) => {
    const { source: t, data: s } = e,
      { name: r, isSvg: n } = s
    n ? t.removeAttributeNS(null, r) : t.removeAttribute(r)
  },
  Z = (e) => {
    const { source: t, data: s } = e,
      { name: r, value: n, isSvg: o } = s
    o ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
  },
  oe = (e) => {
    Z(e)
  },
  ie = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.removeEventListener(r, n)
  },
  ue = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.addEventListener(r, n)
  },
  ae = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, sourceValue: n, targetValue: o } = t
    s.removeEventListener(r, n), s.addEventListener(r, o)
  },
  ce = (e) => {
    const t = e.data,
      s = e.source,
      { value: r } = t
    s.value = r
  },
  he = {
    [i.changeText]: te,
    [i.removeNode]: ee,
    [i.insertNode]: se,
    [i.replaceNode]: re,
    [i.removeAttribute]: ne,
    [i.addAttribute]: Z,
    [i.updateAttribute]: oe,
    [i.removeEvent]: ie,
    [i.addEvent]: ue,
    [i.updateEvent]: ae,
    [i.changeValue]: ce,
  },
  le = (e, t, s) => {
    const r = [...t]
    return (
      e.forEach((n) => {
        de(n, r, s)
      }),
      r
    )
  },
  de = (e, t, s) => {
    const r = be[e.type]
    r && r(e, t, s)
  },
  pe = (e, t) => {
    const { source: s } = e,
      r = t.indexOf(s)
    r >= 0 && t.splice(r, 1)
  },
  me = (e, t, s) => {
    const { target: r } = e,
      n = e.data,
      { index: o, parent: a } = n
    s === a && t.splice(o, 0, r)
  },
  fe = (e, t) => {
    const { target: s, source: r } = e,
      n = t.indexOf(r)
    n >= 0 && (t[n] = s)
  },
  be = {
    [i.removeNode]: pe,
    [i.insertNode]: me,
    [i.replaceNode]: fe,
  }
class ve {
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
      s = Xt(this.dom, t, this.parentElement)
    this.dom = le(s, this.dom, this.parentElement)
  }
  subscribeForRerender() {
    const { subscribe: t } = this.renderKit
    this.subscriptions.forEach((s) => {
      t(this.eventName(s), () => this.rerender())
    })
  }
  eventName(t) {
    return `${A}:${t}`
  }
}
const ge = (e) => e,
  Se = ({ Template: e, viewModel: t, subscriptions: s }) => (
    (s = s || []),
    (t = t || ge),
    (r) =>
      new ve({ Template: e, viewModel: t, subscriptions: s, attributes: r })
  ),
  _e = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        createRouteState: F,
        events: St,
        extractQueryParams: B,
        findHref: T,
        navigate: D,
        onLinkClick: L,
        onLocationChange: P,
        start: _t,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
export {
  Ae as JaxsTypes,
  ye as appBuilding,
  Se as bind,
  we as createApp,
  xt as jsx,
  Ee as messageBus,
  _e as navigation,
  xe as state,
}
