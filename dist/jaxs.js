const O = (e, t) => e.reduce((s, r) => (r !== t && s.push(r), s), []),
  M = (e, t) => e.reduce((s, r) => (t(r) || s.push(r), s), []),
  k = (e, t, s) => (e.splice(t, 0, s), e),
  at = {
    remove: O,
    removeBy: M,
    insertAt: k,
  }
class ct {
  constructor(t) {
    this.store = t
  }
  update(t) {
    this.store.update(t)
  }
  get value() {
    return this.store.value
  }
  reset() {
    this.store.update(this.store.initialValue)
  }
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
const f = (e) => new ct(e),
  lt = {
    toggle: (e) => f(e).toggle(),
    setTrue: (e) => f(e).setTrue(),
    setFalse: (e) => f(e).setFalse(),
    reset: (e) => f(e).reset(),
  }
class ht {
  constructor(t) {
    this.store = t
  }
  update(t) {
    this.store.update(t)
  }
  get value() {
    return this.store.value
  }
  reset() {
    this.store.update(this.store.initialValue)
  }
  push(t) {
    const s = this.value
    s.push(t), this.update(s)
  }
  pop() {
    const t = this.value,
      s = t.pop()
    return this.update(t), s
  }
  unshift(t) {
    const s = this.value
    s.unshift(t), this.update(s)
  }
  shift() {
    const t = this.value,
      s = t.shift()
    return this.update(t), s
  }
  sortBy(t) {
    const s = this.value
    s.sort(t), this.update(s)
  }
  insertAt(t, s) {
    const r = this.value
    k(r, t, s), this.update(r)
  }
  remove(t) {
    const s = O(this.value, t)
    this.update(s)
  }
  removeBy(t) {
    const s = M(this.value, t)
    this.update(s)
  }
}
const m = (e) => new ht(e),
  dt = {
    push: (e, t) => m(e).push(t),
    pop: (e) => m(e).pop(),
    unshift: (e, t) => m(e).unshift(t),
    shift: (e) => m(e).shift(),
    sortBy: (e, t) => m(e).sortBy(t),
    insertAt: (e, t, s) => m(e).insertAt(t, s),
    remove: (e, t) => m(e).remove(t),
    removeBy: (e, t) => m(e).removeBy(t),
    reset: (e) => m(e).reset(),
  }
class pt {
  constructor(t) {
    this.store = t
  }
  update(t) {
    this.store.update(t)
  }
  get value() {
    return this.store.value
  }
  reset() {
    this.store.update(this.store.initialValue)
  }
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
  updateAttributes(t) {
    const s = { ...this.value, ...t }
    this.update(s)
  }
}
const b = (e) => new pt(e),
  mt = {
    reset: (e) => b(e).reset(),
    resetAttribute: (e, t) => b(e).resetAttribute(t),
    updateAttribute: (e, t, s) => b(e).updateAttribute(t, s),
    updateAttributes: (e, t) => b(e).updateAttributes(t),
  },
  ft = (e) => typeof e == 'boolean',
  bt = (e) => typeof e == 'number',
  $ = (e) => typeof e == 'string',
  v = (e) => Array.isArray(e),
  y = (e) => e !== null && !v(e) && typeof e == 'object',
  Re = {
    boolean: ft,
    number: bt,
    string: $,
    array: v,
    object: y,
  },
  vt = (e, t) => t.createElement(e),
  gt = (e, t) => {
    for (const s in t) {
      if (s === '__self') continue
      const r = t[s].toString()
      if (s === 'value') {
        const n = e
        n.value !== r && (n.value = r)
      } else
        $(r) && r.trim() === '' ? e.removeAttribute(s) : e.setAttribute(s, r)
    }
  },
  yt = (e, t, s) => {
    const r = {}
    for (const n in t) {
      const o = t[n],
        a = (c) => s(o, c)
      e.addEventListener(n, a),
        (r[n] = {
          domEvent: n,
          busEvent: o,
          listener: a,
        })
    }
    e.eventMaps = r
  },
  Et = (e, t, s, r) => {
    const n = vt(e, r.document)
    return gt(n, t), yt(n, s, r.publish), n
  },
  w = 'http://www.w3.org/2000/svg',
  At = {
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
  xt = (e, t) => !!(At[e] || (e === 'a' && t === w)),
  wt = (e, t, s) => {
    const r = s.createElementNS(w, e)
    for (const n in t)
      n === '__self' ||
        n === 'xmlns' ||
        r.setAttributeNS(null, n, t[n].toString())
    return r
  },
  Nt = (e) => e.namespaceURI === w,
  _t = (e, t) => t.createTextNode(e)
class St {
  constructor(t) {
    this.value = t.toString()
  }
  render(t) {
    const s = _t(this.value, t.document)
    return (s.__jsx = 'TextNode'), [s]
  }
}
const Tt = (e) => typeof e == 'string' || typeof e == 'number',
  jt = (e) => new St(e),
  Ot = (e) => (Tt(e) ? jt(e) : e),
  D = (e) => Mt(e).map(Ot).flat(),
  Mt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
  P = (e, t = {}) => D(e || t.children || []),
  kt = (e, t = '') => {
    const s = {},
      r = {}
    for (const n in e) {
      const o = e[n]
      if (n.match(/^on.+/i)) {
        const a = n.slice(2).toLowerCase()
        r[a] = o ? o.toString() : ''
      } else {
        if (o === !1) continue
        n === '__source' ? (s.__source = e.__source) : (s[n] = $t(n, o, t))
      }
    }
    return {
      attributes: s,
      events: r,
    }
  },
  $t = (e, t, s = '') => (t == null ? s : t.toString()),
  Dt = (e, t) => {
    const s = e || {},
      r = P(t, s)
    return (s.children = s.children || r), s
  },
  B = (e, t, s, r = []) => e.reduce(Pt(t, s), r).flat(),
  Pt = (e, t) => (s, r) =>
    r
      ? Array.isArray(r)
        ? B(r, e, t, s)
        : (r.render(e, t).forEach((n) => s.push(n)), s)
      : s
class V {
  constructor(t) {
    this.collection = D(t)
  }
  render(t, s) {
    this.parentElement = s
    const r = this.generateDom(t)
    return this.attachToParent(r), r
  }
  generateDom(t) {
    return B(this.collection, t, this.parentElement)
  }
  attachToParent(t) {
    if (this.parentElement === void 0) return
    const s = this.parentElement
    t.forEach((r) => s.appendChild(r))
  }
}
class Bt {
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
class Vt {
  constructor(t, s, r = []) {
    this.type = t
    const { events: n, attributes: o } = kt(s)
    ;(this.events = n),
      (this.attributes = o),
      (this.isSvg = xt(this.type, this.attributes.xmlns)),
      (this.children = new V(r))
  }
  render(t) {
    const s = this.generateDom(t)
    return s ? (this.children.render(t, s), [s]) : []
  }
  generateDom(t) {
    return this.isSvg ? this.generateSvgDom(t) : this.generateHtmlDom(t)
  }
  generateHtmlDom(t) {
    const s = Et(this.type, this.attributes, this.events, t)
    return (s.__jsx = this.jsxKey()), s
  }
  generateSvgDom(t) {
    const s = wt(this.type, this.attributes, t.document)
    return (s.__jsx = this.jsxKey()), s
  }
  jsxKey() {
    return new Bt(this.type, this.attributes).generate()
  }
}
const Ft = (e, t, ...s) =>
  typeof e == 'string' ? new Vt(e, t, s) : e(Dt(t, s))
Ft.fragment = (e, t) => {
  const s = P(t, e)
  return new V(s)
}
class Lt {
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
const zt = (e, t, s) => {
    const r = new Lt(e, t, s)
    return r.renderAndAttach(s), r
  },
  F = 'go-to-href',
  L = 'go-to',
  g = 'navigation:location-change',
  z = 'navigation:route-change',
  Kt = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        linkNavigationEvent: F,
        locationChangeEvent: g,
        navigationEvent: L,
        routeChangeEvent: z,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  K = (e) => {
    e.create('route', {
      host: '',
      path: '',
      query: {},
    })
  },
  R = (e) => {
    const t = e.closest('[href]')
    return (t && t.getAttribute('href')) || ''
  },
  N = ({ payload: e, publish: t, window: s }) => {
    s.history.pushState(null, '', e), t(g, null)
  },
  U = (e) => {
    const t = e.payload
    if (!t || !t.target) return
    t.preventDefault()
    const s = R(t.target)
    N({ ...e, payload: s })
  },
  C = (e) =>
    e
      .replace(/^\?/, '')
      .split('&')
      .reduce((t, s) => {
        if (!s) return t
        const r = s.split('=')
        return (t[r[0]] = r[1]), t
      }, {}),
  q = (e) => {
    const { state: t, publish: s, window: r } = e,
      { host: n, pathname: o, search: a } = r.location,
      c = o,
      u = C(a),
      h = {
        host: n,
        path: c,
        query: u,
      }
    t.store('route').update(h), s(z, h)
  },
  I = (e) => {
    const { subscribe: t } = e
    t(F, U),
      t(L, (s) => {
        N(s)
      })
  },
  J = (e) => {
    const { publish: t, subscribe: s, state: r, window: n } = e
    K(r), n.addEventListener('popstate', () => t(g, null)), s(g, q)
  },
  G = (e) => {
    setTimeout(() => e.publish(g, null), 0)
  },
  H = (e) => {
    J(e), I(e), G(e)
  },
  Rt = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        publishLocation: G,
        startNavigation: H,
        subscribeToHistoryChange: J,
        subscribeToNavigation: I,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class Q {
  constructor({
    window: t,
    document: s,
    publish: r,
    subscribe: n,
    bus: o,
    state: a,
    renderKit: c,
  }) {
    ;(this.window = t),
      (this.document = s),
      (this.publish = r),
      (this.subscribe = n),
      (this.bus = o),
      (this.state = a),
      (this.renderKit = c),
      (this.roots = [])
  }
  render(t, s) {
    const r = zt(t, s, this.renderKit)
    return this.roots.push(r), r
  }
  startNavigation() {
    H(this)
  }
}
const Ue = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      App: Q,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
class W {
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
class X {
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
class Ut {
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
const Ct = (e) => {
    const { offset: t, period: s } = e,
      r = ({ callCount: n }) => (t && n == 0 ? t : s)
    return {
      event: e.event,
      publish: e.publish,
      payload: e.payload,
      timer: r,
    }
  },
  qt = (e) => {
    let t
    'timer' in e ? (t = e) : (t = Ct(e))
    const s = new Ut(t)
    return s.start(), s.stop
  }
class Y {
  constructor() {
    ;(this.exactSubscriptions = new W()),
      (this.fuzzySubscriptions = new X()),
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
const Z = () => {
    const e = new Y()
    return {
      bus: e,
      publish: (r, n) => e.publish(r, n),
      subscribe: (r, n) => e.subscribe(r, n),
    }
  },
  Ce = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ExactSubscriptions: W,
        FuzzySubscriptions: X,
        JaxsBus: Y,
        createBus: Z,
        publishPeriodically: qt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  It = (e, t) => e === t,
  Jt = (e, t) => Object.keys(e).length === Object.keys(t).length,
  tt = (e, t) =>
    !(y(e) && y(t)) || !Jt(e, t)
      ? !1
      : Object.keys(e).every((s) => {
          const r = e[s],
            n = t[s]
          return E(r, n)
        }),
  et = (e, t) =>
    !(v(e) && v(t)) || e.length !== t.length
      ? !1
      : e.every((s, r) => {
          const n = t[r]
          return E(s, n)
        }),
  E = (e, t) => (y(e) ? tt(e, t) : v(e) ? et(e, t) : It(e, t)),
  qe = {
    objects: tt,
    arrays: et,
    equal: E,
  }
class x {
  constructor(t) {
    ;(this.name = t.name),
      (this.parent = t.parent),
      (this._value = structuredClone(t.value)),
      (this.initialValue = structuredClone(t.value))
  }
  get value() {
    return structuredClone(this._value)
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
    E(this._value, t) || ((this._value = t), this.parent.notify(this.name))
  }
  getUpdatedValue(t) {
    return t(this.value)
  }
}
const Gt = {
    object: b,
    list: m,
    boolean: f,
  },
  _ = 'state'
class st {
  constructor(t) {
    ;(this.publisher = t),
      (this.stores = {}),
      (this.eventNamePrefix = _),
      (this.notifications = /* @__PURE__ */ new Set()),
      (this.inTransaction = !1)
  }
  create(t, s) {
    const r = new x({
      name: t,
      parent: this,
      value: s,
    })
    return (this.stores[t] = r), r
  }
  store(t) {
    return (
      this.stores[t] ||
      new x({
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
const rt = (e) => new st(e),
  Ie = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        State: st,
        Store: x,
        createState: rt,
        eventName: _,
        updaters: Gt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class Ht {
  constructor(t) {
    this.setupDomEnvironment(t)
  }
  setup() {
    return (
      this.setupBus(),
      this.setupState(),
      this.addBusOptions(),
      this.setRenderKit(),
      new Q({
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
    const { publish: t, subscribe: s, bus: r } = Z()
    ;(this.publish = t), (this.subscribe = s), (this.bus = r)
  }
  setupState() {
    this.state = rt(this.publish)
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
const Je = (e = {}) => {
  const s = new Ht(e).setup()
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
const Ge = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ChangeInstructionTypes: i,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Qt = (e, t) => ({
    source: e,
    target: t,
    type: i.changeText,
    data: {},
  }),
  Wt = (e, t) => ({
    source: e,
    target: t,
    type: i.replaceNode,
    data: {},
  }),
  Xt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.removeAttribute,
  }),
  Yt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.addAttribute,
  }),
  Zt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.updateAttribute,
  }),
  te = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.removeEvent,
  }),
  ee = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.addEvent,
  }),
  se = (e, t, s) => ({
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
  A = (e, t) => ({
    target: e,
    source: e,
    // for type crap only
    type: i.insertNode,
    data: t,
  }),
  re = (e, t, s) => ({
    source: e,
    target: t,
    type: i.changeValue,
    data: s,
  }),
  ne = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
  T = { index: -1 }
class oe {
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
    return !s || !(this.map[s] && this.map[s].length) ? T : this.map[s].shift()
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
const j = (e) => {
    const t = new oe()
    return t.populate(e), t
  },
  nt = (e, t, s = !1) => {
    const r = [],
      n = e.attributes,
      o = n.length,
      a = t.attributes,
      c = a.length
    let u, h, d
    for (u = 0; u < o; u++) {
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
              Zt(e, t, {
                name: l.name,
                value: d.value,
                isSvg: s,
              }),
            )
          : r.push(Xt(e, t, { name: l.name, isSvg: s }))
      }
    }
    for (u = 0; u < c; u++) {
      d = null
      const l = a.item(u)
      if (l) {
        for (h = 0; h < o; h++) {
          const p = n.item(h)
          if (p && p.name == l.name) {
            d = p
            break
          }
        }
        d ||
          r.push(
            Yt(e, t, {
              name: l.name,
              value: l.value,
              isSvg: s,
            }),
          )
      }
    }
    return r
  },
  ie = (e, t) => {
    const s = [],
      r = e.eventMaps,
      n = t.eventMaps,
      o = Object.keys(r),
      a = Object.keys(n)
    return (
      o.forEach((c) => {
        const u = r[c],
          h = n[c]
        h
          ? h.busEvent !== u.busEvent &&
            s.push(
              se(e, t, {
                name: c,
                targetValue: h.listener,
                sourceValue: u.listener,
              }),
            )
          : s.push(
              te(e, t, {
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
            ee(e, t, {
              name: h.domEvent,
              value: h.listener,
            }),
          )
      }),
      s
    )
  },
  ue = (e) => e.tagName !== 'INPUT',
  ae = (e, t) => e.value === t.value,
  ce = (e, t) => {
    if (ue(e) || ae(e, t)) return []
    const s = e,
      r = t
    return [re(s, r, { name: 'value', value: r.value })]
  },
  le = (e, t) => {
    const s = nt(e, t),
      r = ie(e, t),
      n = ce(e, t)
    return s.concat(r).concat(n)
  },
  he = (e, t) => nt(e, t, !0),
  de = (e, t) => (e.textContent !== t.textContent ? [Qt(e, t)] : []),
  pe = (e, t, s) => {
    let r = []
    if (e.nodeType === 1 && Nt(e)) {
      const n = e,
        o = t,
        a = he(n, o),
        c = s(n.childNodes, o.childNodes, n)
      r = a.concat(c)
    } else if (e.nodeType === 1) {
      const n = e,
        o = t,
        a = le(n, o),
        c = s(n.childNodes, o.childNodes, n)
      r = a.concat(c)
    } else e.nodeType === 3 && (r = de(e, t))
    return r
  },
  ot = (e, t, s) => {
    const r = [],
      n = me(e, t),
      o = j(e),
      a = j(t),
      c = []
    let u = 0
    for (; u < n; u++) {
      const d = e[u],
        l = t[u]
      if (l && a.check(l)) {
        const p = o.pullMatch(l)
        a.clear(l),
          p.element
            ? (p.index !== u &&
                r.push(
                  A(p.element, {
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
                ? r.push(A(l, { parent: s, index: u }))
                : (o.clear(d), r.push(Wt(d, l)))
              : r.push(A(l, { parent: s, index: u }))
      } else d && o.pullMatch(d).element && r.push(S(d))
    }
    o.remaining().forEach(({ element: d }) => {
      r.push(S(d))
    })
    const h = c.reduce(
      (d, { source: l, target: p }) => d.concat(pe(l, p, ot)),
      [],
    )
    return r.concat(h).sort(ne)
  },
  me = (e, t) => {
    const s = e.length,
      r = t.length
    return s > r ? s : r
  },
  fe = (e, t, s) => {
    const r = ot(e, t, s)
    return (
      r.forEach((n) => {
        be(n)
      }),
      r
    )
  },
  be = (e) => {
    ;(je[e.type] || ve)(e)
  },
  ve = (e) => {},
  ge = (e) => {
    const { source: t, target: s } = e
    t.nodeValue = s.textContent
  },
  ye = (e) => {
    const { source: t } = e
    t.remove()
  },
  Ee = (e) => {
    const { target: t, data: s } = e,
      { parent: r, index: n } = s,
      o = r.childNodes[n]
    o ? o && o !== t && r.insertBefore(t, o) : r.appendChild(t)
  },
  Ae = (e) => {
    const { source: t, target: s } = e
    t.replaceWith(s)
  },
  xe = (e) => {
    const { source: t, data: s } = e,
      { name: r, isSvg: n } = s
    n ? t.removeAttributeNS(null, r) : t.removeAttribute(r)
  },
  it = (e) => {
    const { source: t, data: s } = e,
      { name: r, value: n, isSvg: o } = s
    o ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
  },
  we = (e) => {
    it(e)
  },
  Ne = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.removeEventListener(r, n)
  },
  _e = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.addEventListener(r, n)
  },
  Se = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, sourceValue: n, targetValue: o } = t
    s.removeEventListener(r, n), s.addEventListener(r, o)
  },
  Te = (e) => {
    const t = e.data,
      s = e.source,
      { value: r } = t
    s.value = r
  },
  je = {
    [i.changeText]: ge,
    [i.removeNode]: ye,
    [i.insertNode]: Ee,
    [i.replaceNode]: Ae,
    [i.removeAttribute]: xe,
    [i.addAttribute]: it,
    [i.updateAttribute]: we,
    [i.removeEvent]: Ne,
    [i.addEvent]: _e,
    [i.updateEvent]: Se,
    [i.changeValue]: Te,
  },
  Oe = (e, t, s) => {
    const r = [...t]
    return (
      e.forEach((n) => {
        Me(n, r, s)
      }),
      r
    )
  },
  Me = (e, t, s) => {
    const r = Pe[e.type]
    r && r(e, t, s)
  },
  ke = (e, t) => {
    const { source: s } = e,
      r = t.indexOf(s)
    r >= 0 && t.splice(r, 1)
  },
  $e = (e, t, s) => {
    const { target: r } = e,
      n = e.data,
      { index: o, parent: a } = n
    s === a && t.splice(o, 0, r)
  },
  De = (e, t) => {
    const { target: s, source: r } = e,
      n = t.indexOf(r)
    n >= 0 && (t[n] = s)
  },
  Pe = {
    [i.removeNode]: ke,
    [i.insertNode]: $e,
    [i.replaceNode]: De,
  }
class Be {
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
      s = fe(this.dom, t, this.parentElement)
    this.dom = Oe(s, this.dom, this.parentElement)
  }
  subscribeForRerender() {
    const { subscribe: t } = this.renderKit
    this.subscriptions.forEach((s) => {
      t(this.eventName(s), () => this.rerender())
    })
  }
  eventName(t) {
    return `${_}:${t}`
  }
}
const Ve = (e) => e,
  Fe = ({ Template: e, viewModel: t, subscriptions: s }) => (
    (s = s || []),
    (t = t || Ve),
    (r) =>
      new Be({ Template: e, viewModel: t, subscriptions: s, attributes: r })
  ),
  Le =
    (e) =>
    ({ path: t }) =>
      t === e,
  ze = () => !0,
  ut =
    (e) =>
    ({ route: t }) => {
      const s = e.find((r) => r.match(t))
      return s && s.Partial
    },
  He = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        buildRouter: ut,
        catchAll: ze,
        exactPathMatch: Le,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Ke = () => ({
    render: (e, t) => [],
  }),
  Qe = (e) => {
    const t = ut(e)
    return Fe({
      Template: ({ route: r }) => (t({ route: r }) || Ke)(),
      subscriptions: ['route'],
    })
  },
  We = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        createRouteState: K,
        events: Kt,
        extractQueryParams: C,
        findHref: R,
        navigate: N,
        onLinkClick: U,
        onLocationChange: q,
        start: Rt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Xe = {
    RecordStore: mt,
    BooleanStore: lt,
    ListStore: dt,
    ArrayModifiers: at,
  }
export {
  qe as Equality,
  Re as Is,
  Ge as JaxsTypes,
  Xe as Update,
  Ue as appBuilding,
  Fe as bind,
  Je as createApp,
  Ft as jsx,
  Ce as messageBus,
  We as navigation,
  Qe as routedView,
  He as routing,
  Ie as state,
}
