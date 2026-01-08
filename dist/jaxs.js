const O = (e, t) => {
    for (let s = e.length - 1; s >= 0; s--) e[s] === t && e.splice(s, 1)
    return e
  },
  M = (e, t) => {
    for (let s = e.length - 1; s >= 0; s--) t(e[s]) && e.splice(s, 1)
    return e
  },
  k = (e, t, s) => (e.splice(t, 0, s), e),
  $ = (e, t) => (e.includes(t) || e.push(t), e),
  Ve = {
    remove: O,
    removeBy: M,
    insertAt: k,
    appendIfUnique: $,
    push: (e, t) => e.push(t),
    // mutates
    pop: (e) => e.pop(),
    // mutates
    unshift: (e, t) => e.unshift(t),
    // mutates
    shift: (e) => e.shift(),
    // mutates
    sortBy: (e, t) => e.sort(t),
    // mutates
    includes: (e, t) => e.includes(t),
    // reader
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
  isTrue() {
    return this.value === !0
  }
  isFalse() {
    return this.value === !1
  }
}
const f = (e) => new ct(e),
  Le = {
    toggle: (e) => f(e).toggle(),
    setTrue: (e) => f(e).setTrue(),
    setFalse: (e) => f(e).setFalse(),
    reset: (e) => f(e).reset(),
    isTrue: (e) => f(e).isTrue(),
    isFalse: (e) => f(e).isFalse(),
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
  includes(t) {
    return this.value.includes(t)
  }
  appendIfUnique(t) {
    const s = this.value
    $(s, t), this.update(s)
  }
}
const m = (e) => new ht(e),
  ze = {
    push: (e, t) => m(e).push(t),
    pop: (e) => m(e).pop(),
    unshift: (e, t) => m(e).unshift(t),
    shift: (e) => m(e).shift(),
    sortBy: (e, t) => m(e).sortBy(t),
    insertAt: (e, t, s) => m(e).insertAt(t, s),
    remove: (e, t) => m(e).remove(t),
    removeBy: (e, t) => m(e).removeBy(t),
    reset: (e) => m(e).reset(),
    includes: (e, t) => m(e).includes(t),
    appendIfUnique: (e, t) => m(e).appendIfUnique(t),
  }
class lt {
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
  attributeTruthy(t) {
    return !!this.value[t]
  }
}
const b = (e) => new lt(e),
  Ke = {
    reset: (e) => b(e).reset(),
    resetAttribute: (e, t) => b(e).resetAttribute(t),
    updateAttribute: (e, t, s) => b(e).updateAttribute(t, s),
    updateAttributes: (e, t) => b(e).updateAttributes(t),
    attributeTruthy: (e, t) => b(e).attributeTruthy(t),
  },
  dt = (e) => typeof e == 'boolean',
  pt = (e) => typeof e == 'number',
  D = (e) => typeof e == 'string',
  v = (e) => Array.isArray(e),
  g = (e) => e !== null && !v(e) && typeof e == 'object',
  Re = {
    boolean: dt,
    number: pt,
    string: D,
    array: v,
    object: g,
  },
  mt = (e, t) => t.createElement(e),
  ft = (e, t) => {
    for (const s in t) {
      if (s === '__self') continue
      const r = t[s].toString()
      if (s === 'value') {
        const n = e
        n.value !== r && (n.value = r)
      } else
        D(r) && r.trim() === '' ? e.removeAttribute(s) : e.setAttribute(s, r)
    }
  },
  bt = (e, t, s) => {
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
  vt = (e, t, s, r) => {
    const n = mt(e, r.document)
    return ft(n, t), bt(n, s, r.publish), n
  },
  w = 'http://www.w3.org/2000/svg',
  yt = {
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
  gt = (e, t) => !!(yt[e] || (e === 'a' && t === w)),
  Et = (e, t, s) => {
    const r = s.createElementNS(w, e)
    for (const n in t)
      n === '__self' ||
        n === 'xmlns' ||
        r.setAttributeNS(null, n, t[n].toString())
    return r
  },
  At = (e) => e.namespaceURI === w,
  xt = (e, t) => t.createTextNode(e)
class wt {
  constructor(t) {
    this.value = t.toString()
  }
  render(t) {
    const s = xt(this.value, t.document)
    return (s.__jsx = 'TextNode'), [s]
  }
}
const Nt = (e) => typeof e == 'string' || typeof e == 'number',
  _t = (e) => new wt(e),
  St = (e) => (Nt(e) ? _t(e) : e),
  P = (e) => Tt(e).map(St).flat(),
  Tt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
  B = (e, t = {}) => P(e || t.children || []),
  jt = (e, t = '') => {
    const s = {},
      r = {}
    for (const n in e) {
      const i = e[n]
      if (n.match(/^on.+/i)) {
        const a = n.slice(2).toLowerCase()
        r[a] = i ? i.toString() : ''
      } else {
        if (i === !1) continue
        n === '__source' ? (s.__source = e.__source) : (s[n] = Ot(n, i, t))
      }
    }
    return {
      attributes: s,
      events: r,
    }
  },
  Ot = (e, t, s = '') => (t == null ? s : t.toString()),
  Mt = (e, t) => {
    const s = e || {},
      r = B(t, s)
    return (s.children = s.children || r), s
  },
  F = (e, t, s, r = []) => e.reduce(kt(t, s), r).flat(),
  kt = (e, t) => (s, r) =>
    r
      ? Array.isArray(r)
        ? F(r, e, t, s)
        : (r.render(e, t).forEach((n) => s.push(n)), s)
      : s
class V {
  constructor(t) {
    this.collection = P(t)
  }
  render(t, s) {
    this.parentElement = s
    const r = this.generateDom(t)
    return this.attachToParent(r), r
  }
  generateDom(t) {
    return F(this.collection, t, this.parentElement)
  }
  attachToParent(t) {
    if (this.parentElement === void 0) return
    const s = this.parentElement
    t.forEach((r) => s.appendChild(r))
  }
}
class $t {
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
class Dt {
  constructor(t, s, r = []) {
    this.type = t
    const { events: n, attributes: i } = jt(s)
    ;(this.events = n),
      (this.attributes = i),
      (this.isSvg = gt(this.type, this.attributes.xmlns)),
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
    const s = vt(this.type, this.attributes, this.events, t)
    return (s.__jsx = this.jsxKey()), s
  }
  generateSvgDom(t) {
    const s = Et(this.type, this.attributes, t.document)
    return (s.__jsx = this.jsxKey()), s
  }
  jsxKey() {
    return new $t(this.type, this.attributes).generate()
  }
}
const Pt = (e, t, ...s) =>
  typeof e == 'string' ? new Dt(e, t, s) : e(Mt(t, s))
Pt.fragment = (e, t) => {
  const s = B(t, e)
  return new V(s)
}
class Bt {
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
const Ft = (e, t, s) => {
    const r = new Bt(e, t, s)
    return r.renderAndAttach(s), r
  },
  L = 'go-to-href',
  z = 'go-to',
  y = 'navigation:location-change',
  K = 'navigation:route-change',
  Vt = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        linkNavigationEvent: L,
        locationChangeEvent: y,
        navigationEvent: z,
        routeChangeEvent: K,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  R = (e) => {
    e.create('route', {
      host: '',
      path: '',
      query: {},
    })
  },
  U = (e) => {
    const t = e.closest('[href]')
    return (t && t.getAttribute('href')) || ''
  },
  N = ({ payload: e, publish: t, window: s }) => {
    s.history.pushState(null, '', e), t(y, null)
  },
  q = (e) => {
    const t = e.payload
    if (!t || !t.target) return
    t.preventDefault()
    const s = U(t.target)
    N({ ...e, payload: s })
  },
  I = (e) =>
    e
      .replace(/^\?/, '')
      .split('&')
      .reduce((t, s) => {
        if (!s) return t
        const r = s.split('=')
        return (t[r[0]] = r[1]), t
      }, {}),
  J = (e) => {
    const { state: t, publish: s, window: r } = e,
      { host: n, pathname: i, search: a } = r.location,
      c = i,
      u = I(a),
      l = {
        host: n,
        path: c,
        query: u,
      }
    t.store('route').update(l), s(K, l)
  },
  G = (e) => {
    const { subscribe: t } = e
    t(L, q),
      t(z, (s) => {
        N(s)
      })
  },
  H = (e) => {
    const { publish: t, subscribe: s, state: r, window: n } = e
    R(r), n.addEventListener('popstate', () => t(y, null)), s(y, J)
  },
  C = (e) => {
    setTimeout(() => e.publish(y, null), 0)
  },
  Q = (e) => {
    H(e), G(e), C(e)
  },
  Lt = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        publishLocation: C,
        startNavigation: Q,
        subscribeToHistoryChange: H,
        subscribeToNavigation: G,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class W {
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
    const r = Ft(t, s, this.renderKit)
    return this.roots.push(r), r
  }
  startNavigation() {
    Q(this)
  }
}
const Ue = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      App: W,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
class X {
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
class Y {
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
class zt {
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
const Kt = (e) => {
    const { offset: t, period: s } = e,
      r = ({ callCount: n }) => (t && n == 0 ? t : s)
    return {
      event: e.event,
      publish: e.publish,
      payload: e.payload,
      timer: r,
    }
  },
  Rt = (e) => {
    let t
    'timer' in e ? (t = e) : (t = Kt(e))
    const s = new zt(t)
    return s.start(), s.stop
  }
class Z {
  constructor() {
    ;(this.exactSubscriptions = new X()),
      (this.fuzzySubscriptions = new Y()),
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
const tt = () => {
    const e = new Z()
    return {
      bus: e,
      publish: (r, n) => e.publish(r, n),
      subscribe: (r, n) => e.subscribe(r, n),
    }
  },
  qe = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ExactSubscriptions: X,
        FuzzySubscriptions: Y,
        JaxsBus: Z,
        createBus: tt,
        publishPeriodically: Rt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Ut = (e, t) => e === t,
  qt = (e, t) => Object.keys(e).length === Object.keys(t).length,
  et = (e, t) =>
    !(g(e) && g(t)) || !qt(e, t)
      ? !1
      : Object.keys(e).every((s) => {
          const r = e[s],
            n = t[s]
          return E(r, n)
        }),
  st = (e, t) =>
    !(v(e) && v(t)) || e.length !== t.length
      ? !1
      : e.every((s, r) => {
          const n = t[r]
          return E(s, n)
        }),
  E = (e, t) => (g(e) ? et(e, t) : v(e) ? st(e, t) : Ut(e, t)),
  Ie = {
    objects: et,
    arrays: st,
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
const _ = 'state'
class rt {
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
const nt = (e) => new rt(e),
  Je = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        State: rt,
        Store: x,
        createState: nt,
        eventName: _,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class It {
  constructor(t) {
    this.setupDomEnvironment(t)
  }
  setup() {
    return (
      this.setupBus(),
      this.setupState(),
      this.addBusOptions(),
      this.setRenderKit(),
      new W({
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
    const { publish: t, subscribe: s, bus: r } = tt()
    ;(this.publish = t), (this.subscribe = s), (this.bus = r)
  }
  setupState() {
    this.state = nt(this.publish)
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
const Ge = (e = {}) => {
  const s = new It(e).setup()
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
const He = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ChangeInstructionTypes: o,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Jt = (e, t) => ({
    source: e,
    target: t,
    type: o.changeText,
    data: {},
  }),
  Gt = (e, t) => ({
    source: e,
    target: t,
    type: o.replaceNode,
    data: {},
  }),
  Ht = (e, t, s) => ({
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
  Qt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.updateAttribute,
  }),
  Wt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.removeEvent,
  }),
  Xt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.addEvent,
  }),
  Yt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: o.updateEvent,
  }),
  S = (e) => ({
    source: e,
    target: e,
    // for type crap only
    type: o.removeNode,
    data: {},
  }),
  A = (e, t) => ({
    target: e,
    source: e,
    // for type crap only
    type: o.insertNode,
    data: t,
  }),
  Zt = (e, t, s) => ({
    source: e,
    target: t,
    type: o.changeValue,
    data: s,
  }),
  te = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
  T = { index: -1 }
class ee {
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
const j = (e) => {
    const t = new ee()
    return t.populate(e), t
  },
  it = (e, t, s = !1) => {
    const r = [],
      n = e.attributes,
      i = n.length,
      a = t.attributes,
      c = a.length
    let u, l, d
    for (u = 0; u < i; u++) {
      d = null
      const h = n.item(u)
      if (h) {
        for (l = 0; l < c; l++) {
          const p = a.item(l)
          if (p && h.name == p.name) {
            d = p
            break
          }
        }
        d
          ? h.value !== d.value &&
            r.push(
              Qt(e, t, {
                name: h.name,
                value: d.value,
                isSvg: s,
              }),
            )
          : r.push(Ht(e, t, { name: h.name, isSvg: s }))
      }
    }
    for (u = 0; u < c; u++) {
      d = null
      const h = a.item(u)
      if (h) {
        for (l = 0; l < i; l++) {
          const p = n.item(l)
          if (p && p.name == h.name) {
            d = p
            break
          }
        }
        d ||
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
  se = (e, t) => {
    const s = [],
      r = e.eventMaps,
      n = t.eventMaps,
      i = Object.keys(r),
      a = Object.keys(n)
    return (
      i.forEach((c) => {
        const u = r[c],
          l = n[c]
        l
          ? l.busEvent !== u.busEvent &&
            s.push(
              Yt(e, t, {
                name: c,
                targetValue: l.listener,
                sourceValue: u.listener,
              }),
            )
          : s.push(
              Wt(e, t, {
                name: u.domEvent,
                value: u.listener,
              }),
            )
      }),
      a.forEach((c) => {
        const u = r[c],
          l = n[c]
        u ||
          s.push(
            Xt(e, t, {
              name: l.domEvent,
              value: l.listener,
            }),
          )
      }),
      s
    )
  },
  re = (e) => e.tagName !== 'INPUT',
  ne = (e, t) => e.value === t.value,
  ie = (e, t) => {
    if (re(e) || ne(e, t)) return []
    const s = e,
      r = t
    return [Zt(s, r, { name: 'value', value: r.value })]
  },
  oe = (e, t) => {
    const s = it(e, t),
      r = se(e, t),
      n = ie(e, t)
    return s.concat(r).concat(n)
  },
  ue = (e, t) => it(e, t, !0),
  ae = (e, t) => (e.textContent !== t.textContent ? [Jt(e, t)] : []),
  ce = (e, t, s) => {
    let r = []
    if (e.nodeType === 1 && At(e)) {
      const n = e,
        i = t,
        a = ue(n, i),
        c = s(n.childNodes, i.childNodes, n)
      r = a.concat(c)
    } else if (e.nodeType === 1) {
      const n = e,
        i = t,
        a = oe(n, i),
        c = s(n.childNodes, i.childNodes, n)
      r = a.concat(c)
    } else e.nodeType === 3 && (r = ae(e, t))
    return r
  },
  ot = (e, t, s) => {
    const r = [],
      n = he(e, t),
      i = j(e),
      a = j(t),
      c = []
    let u = 0
    for (; u < n; u++) {
      const d = e[u],
        h = t[u]
      if (h && a.check(h)) {
        const p = i.pullMatch(h)
        a.clear(h),
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
                target: h,
              }))
            : d
              ? a.check(d)
                ? r.push(A(h, { parent: s, index: u }))
                : (i.clear(d), r.push(Gt(d, h)))
              : r.push(A(h, { parent: s, index: u }))
      } else d && i.pullMatch(d).element && r.push(S(d))
    }
    i.remaining().forEach(({ element: d }) => {
      r.push(S(d))
    })
    const l = c.reduce(
      (d, { source: h, target: p }) => d.concat(ce(h, p, ot)),
      [],
    )
    return r.concat(l).sort(te)
  },
  he = (e, t) => {
    const s = e.length,
      r = t.length
    return s > r ? s : r
  },
  le = (e, t, s) => {
    const r = ot(e, t, s)
    return (
      r.forEach((n) => {
        de(n)
      }),
      r
    )
  },
  de = (e) => {
    ;(Ne[e.type] || pe)(e)
  },
  pe = (e) => {},
  me = (e) => {
    const { source: t, target: s } = e
    t.nodeValue = s.textContent
  },
  fe = (e) => {
    const { source: t } = e
    t.remove()
  },
  be = (e) => {
    const { target: t, data: s } = e,
      { parent: r, index: n } = s,
      i = r.childNodes[n]
    i ? i && i !== t && r.insertBefore(t, i) : r.appendChild(t)
  },
  ve = (e) => {
    const { source: t, target: s } = e
    t.replaceWith(s)
  },
  ye = (e) => {
    const { source: t, data: s } = e,
      { name: r, isSvg: n } = s
    n ? t.removeAttributeNS(null, r) : t.removeAttribute(r)
  },
  ut = (e) => {
    const { source: t, data: s } = e,
      { name: r, value: n, isSvg: i } = s
    i ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
  },
  ge = (e) => {
    ut(e)
  },
  Ee = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.removeEventListener(r, n)
  },
  Ae = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.addEventListener(r, n)
  },
  xe = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, sourceValue: n, targetValue: i } = t
    s.removeEventListener(r, n), s.addEventListener(r, i)
  },
  we = (e) => {
    const t = e.data,
      s = e.source,
      { value: r } = t
    s.value = r
  },
  Ne = {
    [o.changeText]: me,
    [o.removeNode]: fe,
    [o.insertNode]: be,
    [o.replaceNode]: ve,
    [o.removeAttribute]: ye,
    [o.addAttribute]: ut,
    [o.updateAttribute]: ge,
    [o.removeEvent]: Ee,
    [o.addEvent]: Ae,
    [o.updateEvent]: xe,
    [o.changeValue]: we,
  },
  _e = (e, t, s) => {
    const r = [...t]
    return (
      e.forEach((n) => {
        Se(n, r, s)
      }),
      r
    )
  },
  Se = (e, t, s) => {
    const r = Me[e.type]
    r && r(e, t, s)
  },
  Te = (e, t) => {
    const { source: s } = e,
      r = t.indexOf(s)
    r >= 0 && t.splice(r, 1)
  },
  je = (e, t, s) => {
    const { target: r } = e,
      n = e.data,
      { index: i, parent: a } = n
    s === a && t.splice(i, 0, r)
  },
  Oe = (e, t) => {
    const { target: s, source: r } = e,
      n = t.indexOf(r)
    n >= 0 && (t[n] = s)
  },
  Me = {
    [o.removeNode]: Te,
    [o.insertNode]: je,
    [o.replaceNode]: Oe,
  }
class ke {
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
      s = le(this.dom, t, this.parentElement)
    this.dom = _e(s, this.dom, this.parentElement)
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
const $e = (e) => e,
  De = ({ Template: e, viewModel: t, subscriptions: s }) => (
    (s = s || []),
    (t = t || $e),
    (r) =>
      new ke({ Template: e, viewModel: t, subscriptions: s, attributes: r })
  ),
  Pe =
    (e) =>
    ({ path: t }) =>
      t === e,
  Be = () => !0,
  at =
    (e) =>
    ({ route: t }) => {
      const s = e.find((r) => r.match(t))
      return s && s.Partial
    },
  Ce = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        buildRouter: at,
        catchAll: Be,
        exactPathMatch: Pe,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Fe = () => ({
    render: (e, t) => [],
  }),
  Qe = (e) => {
    const t = at(e)
    return De({
      Template: ({ route: r }) => (t({ route: r }) || Fe)(),
      subscriptions: ['route'],
    })
  },
  We = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        createRouteState: R,
        events: Vt,
        extractQueryParams: I,
        findHref: U,
        navigate: N,
        onLinkClick: q,
        onLocationChange: J,
        start: Lt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
export {
  Ve as ArrayModifiers,
  Le as BooleanStore,
  Ie as Equality,
  Re as Is,
  He as JaxsTypes,
  ze as ListStore,
  Ke as RecordStore,
  Ue as appBuilding,
  De as bind,
  Ge as createApp,
  Pt as jsx,
  qe as messageBus,
  We as navigation,
  Qe as routedView,
  Ce as routing,
  Je as state,
}
