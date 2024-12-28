const Y = (e, t) => t.createElement(e),
  Z = (e, t) => {
    for (const s in t) {
      if (s === '__self') continue
      const r = t[s].toString()
      if (s === 'value') {
        const n = e
        n.value !== r && (n.value = r)
      } else e.setAttribute(s, r)
    }
  },
  tt = (e, t, s) => {
    const r = {}
    for (const n in t) {
      const o = t[n],
        a = (l) => s(o, l)
      e.addEventListener(n, a),
        (r[n] = {
          domEvent: n,
          busEvent: o,
          listener: a,
        })
    }
    e.eventMaps = r
  },
  et = (e, t, s, r) => {
    const n = Y(e, r.document)
    return Z(n, t), tt(n, s, r.publish), n
  },
  y = 'http://www.w3.org/2000/svg',
  st = {
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
  rt = (e, t) => !!(st[e] || (e === 'a' && t === y)),
  nt = (e, t, s) => {
    const r = s.createElementNS(y, e)
    for (const n in t)
      n === '__self' ||
        n === 'xmlns' ||
        r.setAttributeNS(null, n, t[n].toString())
    return r
  },
  ot = (e) => e.namespaceURI === y,
  it = (e, t) => t.createTextNode(e)
class ut {
  constructor(t) {
    this.value = t.toString()
  }
  render(t) {
    const s = it(this.value, t.document)
    return (s.__jsx = 'TextNode'), [s]
  }
}
const at = (e) => typeof e == 'string' || typeof e == 'number',
  ct = (e) => new ut(e),
  lt = (e) => (at(e) ? ct(e) : e),
  ht = (e) => dt(e).map(lt).flat(),
  dt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
  S = (e, t = {}) => e || t.children || [],
  pt = (e, t = '') => {
    const s = {},
      r = {}
    for (const n in e) {
      const o = e[n]
      if (n.match(/^on.+/i)) {
        const a = n.slice(2).toLowerCase()
        r[a] = o ? o.toString() : ''
      } else {
        if (o === !1) continue
        n === '__source' ? (s.__source = e.__source) : (s[n] = mt(n, o, t))
      }
    }
    return {
      attributes: s,
      events: r,
    }
  },
  mt = (e, t, s = '') => (t == null ? s : t.toString()),
  ft = (e, t) => {
    const s = e || {},
      r = S(t, s)
    return (s.children = s.children || r), s
  },
  j = (e, t, s, r = []) => e.reduce(bt(t, s), r).flat(),
  bt = (e, t) => (s, r) =>
    r
      ? Array.isArray(r)
        ? j(r, e, t, s)
        : (r.render(e, t).forEach((n) => s.push(n)), s)
      : s
class O {
  constructor(t) {
    this.collection = ht(t)
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
class vt {
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
class gt {
  constructor(t, s, r = []) {
    this.type = t
    const { events: n, attributes: o } = pt(s)
    ;(this.events = n),
      (this.attributes = o),
      (this.isSvg = rt(this.type, this.attributes.xmlns)),
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
    const s = et(this.type, this.attributes, this.events, t)
    return (s.__jsx = this.jsxKey()), s
  }
  generateSvgDom(t) {
    const s = nt(this.type, this.attributes, t.document)
    return (s.__jsx = this.jsxKey()), s
  }
  jsxKey() {
    return new vt(this.type, this.attributes).generate()
  }
}
const yt = (e, t, ...s) =>
  typeof e == 'string' ? new gt(e, t, s) : e(ft(t, s))
yt.fragment = (e, t) => {
  const s = S(t, e)
  return new O(s)
}
class Et {
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
const xt = (e, t, s) => {
    const r = new Et(e, t, s)
    return r.renderAndAttach(s), r
  },
  M = 'go-to-href',
  m = 'navigation:location-change',
  k = 'navigation:route-change',
  At = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        linkNavigationEvent: M,
        locationChangeEvent: m,
        routeChangeEvent: k,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  T = (e) => {
    e.create('route', {
      host: '',
      path: '',
      query: {},
    })
  },
  $ = (e) => {
    const t = e.closest('[href]')
    return (t && t.getAttribute('href')) || ''
  },
  D = (e, { publish: t, window: s }) => {
    s.history.pushState(null, '', e), t(m, null)
  },
  P = (e, t) => {
    if (!e || !e.target) return
    e.preventDefault()
    const s = $(e.target)
    D(s, t)
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
      { host: o, pathname: a, search: l } = n.location,
      u = a,
      d = F(l),
      c = {
        host: o,
        path: u,
        query: d,
      }
    s.store('route').update(c), r(k, c)
  },
  z = (e) => {
    const { subscribe: t } = e
    t(M, P)
  },
  B = (e) => {
    const { publish: t, subscribe: s, state: r, window: n } = e
    T(r), n.addEventListener('popstate', () => t(m, null)), s(m, L)
  },
  V = (e) => {
    setTimeout(() => e.publish(m, null), 0)
  },
  K = (e) => {
    B(e), z(e), V(e)
  },
  _t = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        publishLocation: V,
        startNavigation: K,
        subscribeToHistoryChange: B,
        subscribeToNavigation: z,
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
    renderKit: l,
  }) {
    ;(this.window = t),
      (this.document = s),
      (this.publish = r),
      (this.subscribe = n),
      (this.bus = o),
      (this.state = a),
      (this.renderKit = l),
      (this.roots = [])
  }
  render(t, s) {
    const r = xt(t, s, this.renderKit)
    return this.roots.push(r), r
  }
  startNavigation() {
    K(this)
  }
}
const Oe = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      App: R,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
class U {
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
class I {
  constructor() {
    ;(this.exactSubscriptions = new U()),
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
const J = () => {
    const e = new I()
    return {
      bus: e,
      publish: (r, n) => e.publish(r, n),
      subscribe: (r, n) => e.subscribe(r, n),
    }
  },
  Me = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ExactSubscriptions: U,
        FuzzySubscriptions: q,
        JaxsBus: I,
        createBus: J,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  f = (e) => Array.isArray(e),
  v = (e) => e !== null && !f(e) && typeof e == 'object',
  wt = (e, t) => e === t,
  Nt = (e, t) => Object.keys(e).length === Object.keys(t).length,
  St = (e, t) =>
    !(v(e) && v(t)) || !Nt(e, t)
      ? !1
      : Object.keys(e).every((s) => {
          const r = e[s],
            n = t[s]
          return E(r, n)
        }),
  jt = (e, t) =>
    !(f(e) && f(t)) || e.length !== t.length
      ? !1
      : e.every((s, r) => {
          const n = t[r]
          return E(s, n)
        }),
  E = (e, t) => (v(e) ? St(e, t) : f(e) ? jt(e, t) : wt(e, t))
class g {
  constructor(t) {
    ;(this.name = t.name),
      (this.parent = t.parent),
      (this._value = t.value),
      (this.initialValue = structuredClone(t.value))
  }
  get value() {
    return this._value
  }
  set value(t) {
    throw new Error('Cannot set value directly. Use an updater!')
  }
  reset() {
    this._value = this.initialValue
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
class x {
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
class Ot extends x {
  updateAttribute(t, s) {
    const r = { ...this.value }
    ;(r[t] = s), this.update(r)
  }
  resetAttribute(t) {
    const s = { ...this.value },
      r = this.store.initialValue[t]
    ;(s[t] = r), this.update(s)
  }
}
const Mt = (e) => new Ot(e)
class kt extends x {
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
const Tt = (e) => new kt(e)
class $t extends x {
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
const Dt = (e) => new $t(e),
  Pt = {
    object: Mt,
    list: Tt,
    boolean: Dt,
  },
  A = 'state'
class H {
  constructor(t) {
    ;(this.publisher = t),
      (this.stores = {}),
      (this.eventNamePrefix = A),
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
const G = (e) => new H(e),
  ke = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        State: H,
        Store: g,
        createState: G,
        eventName: A,
        updaters: Pt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class Ft {
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
    const { publish: t, subscribe: s, bus: r } = J()
    ;(this.publish = t), (this.subscribe = s), (this.bus = r)
  }
  setupState() {
    this.state = G(this.publish)
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
const Te = (e = {}) => {
  const s = new Ft(e).setup()
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
const $e = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ChangeInstructionTypes: i,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Lt = (e, t) => ({
    source: e,
    target: t,
    type: i.changeText,
    data: {},
  }),
  zt = (e, t) => ({
    source: e,
    target: t,
    type: i.replaceNode,
    data: {},
  }),
  Bt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.removeAttribute,
  }),
  Vt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.addAttribute,
  }),
  Kt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.updateAttribute,
  }),
  Rt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.removeEvent,
  }),
  Ut = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.addEvent,
  }),
  qt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: i.updateEvent,
  }),
  _ = (e) => ({
    source: e,
    target: e,
    // for type crap only
    type: i.removeNode,
    data: {},
  }),
  b = (e, t) => ({
    target: e,
    source: e,
    // for type crap only
    type: i.insertNode,
    data: t,
  }),
  It = (e, t, s) => ({
    source: e,
    target: t,
    type: i.changeValue,
    data: s,
  }),
  Jt = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
  w = { index: -1 }
class Ht {
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
    return !s || !(this.map[s] && this.map[s].length) ? w : this.map[s].shift()
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
    const t = new Ht()
    return t.populate(e), t
  },
  C = (e, t, s = !1) => {
    const r = [],
      n = e.attributes,
      o = n.length,
      a = t.attributes,
      l = a.length
    let u, d, c
    for (u = 0; u < o; u++) {
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
              Kt(e, t, {
                name: h.name,
                value: c.value,
                isSvg: s,
              }),
            )
          : r.push(Bt(e, t, { name: h.name, isSvg: s }))
      }
    }
    for (u = 0; u < l; u++) {
      c = null
      const h = a.item(u)
      if (h) {
        for (d = 0; d < o; d++) {
          const p = n.item(d)
          if (p && p.name == h.name) {
            c = p
            break
          }
        }
        c ||
          r.push(
            Vt(e, t, {
              name: h.name,
              value: h.value,
              isSvg: s,
            }),
          )
      }
    }
    return r
  },
  Gt = (e, t) => {
    const s = [],
      r = e.eventMaps,
      n = t.eventMaps,
      o = Object.keys(r),
      a = Object.keys(n)
    return (
      o.forEach((l) => {
        const u = r[l],
          d = n[l]
        d
          ? d.busEvent !== u.busEvent &&
            s.push(
              qt(e, t, {
                name: l,
                targetValue: d.listener,
                sourceValue: u.listener,
              }),
            )
          : s.push(
              Rt(e, t, {
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
            Ut(e, t, {
              name: d.domEvent,
              value: d.listener,
            }),
          )
      }),
      s
    )
  },
  Ct = (e) => e.tagName !== 'INPUT',
  Qt = (e, t) => e.value === t.value,
  Wt = (e, t) => {
    if (Ct(e) || Qt(e, t)) return []
    const s = e,
      r = t
    return [It(s, r, { name: 'value', value: r.value })]
  },
  Xt = (e, t) => {
    const s = C(e, t),
      r = Gt(e, t),
      n = Wt(e, t)
    return s.concat(r).concat(n)
  },
  Yt = (e, t) => C(e, t, !0),
  Zt = (e, t) => (e.textContent !== t.textContent ? [Lt(e, t)] : []),
  te = (e, t, s) => {
    let r = []
    if (e.nodeType === 1 && ot(e)) {
      const n = e,
        o = t,
        a = Yt(n, o),
        l = s(n.childNodes, o.childNodes, n)
      r = a.concat(l)
    } else if (e.nodeType === 1) {
      const n = e,
        o = t,
        a = Xt(n, o),
        l = s(n.childNodes, o.childNodes, n)
      r = a.concat(l)
    } else e.nodeType === 3 && (r = Zt(e, t))
    return r
  },
  Q = (e, t, s) => {
    const r = [],
      n = ee(e, t),
      o = N(e),
      a = N(t),
      l = []
    let u = 0
    for (; u < n; u++) {
      const c = e[u],
        h = t[u]
      if (h && a.check(h)) {
        const p = o.pullMatch(h)
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
                : (o.clear(c), r.push(zt(c, h)))
              : r.push(b(h, { parent: s, index: u }))
      } else c && o.pullMatch(c).element && r.push(_(c))
    }
    o.remaining().forEach(({ element: c }) => {
      r.push(_(c))
    })
    const d = l.reduce(
      (c, { source: h, target: p }) => c.concat(te(h, p, Q)),
      [],
    )
    return r.concat(d).sort(Jt)
  },
  ee = (e, t) => {
    const s = e.length,
      r = t.length
    return s > r ? s : r
  },
  se = (e, t, s) => {
    const r = Q(e, t, s)
    return (
      r.forEach((n) => {
        re(n)
      }),
      r
    )
  },
  re = (e) => {
    ;(fe[e.type] || ne)(e)
  },
  ne = (e) => {},
  oe = (e) => {
    const { source: t, target: s } = e
    t.nodeValue = s.textContent
  },
  ie = (e) => {
    const { source: t } = e
    t.remove()
  },
  ue = (e) => {
    const { target: t, data: s } = e,
      { parent: r, index: n } = s,
      o = r.childNodes[n]
    o ? o && o !== t && r.insertBefore(t, o) : r.appendChild(t)
  },
  ae = (e) => {
    const { source: t, target: s } = e
    t.replaceWith(s)
  },
  ce = (e) => {
    const { source: t, data: s } = e,
      { name: r, isSvg: n } = s
    n ? t.removeAttributeNS(null, r) : t.removeAttribute(r)
  },
  W = (e) => {
    const { source: t, data: s } = e,
      { name: r, value: n, isSvg: o } = s
    o ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
  },
  le = (e) => {
    W(e)
  },
  he = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.removeEventListener(r, n)
  },
  de = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.addEventListener(r, n)
  },
  pe = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, sourceValue: n, targetValue: o } = t
    s.removeEventListener(r, n), s.addEventListener(r, o)
  },
  me = (e) => {
    const t = e.data,
      s = e.source,
      { value: r } = t
    s.value = r
  },
  fe = {
    [i.changeText]: oe,
    [i.removeNode]: ie,
    [i.insertNode]: ue,
    [i.replaceNode]: ae,
    [i.removeAttribute]: ce,
    [i.addAttribute]: W,
    [i.updateAttribute]: le,
    [i.removeEvent]: he,
    [i.addEvent]: de,
    [i.updateEvent]: pe,
    [i.changeValue]: me,
  },
  be = (e, t, s) => {
    const r = [...t]
    return (
      e.forEach((n) => {
        ve(n, r, s)
      }),
      r
    )
  },
  ve = (e, t, s) => {
    const r = xe[e.type]
    r && r(e, t, s)
  },
  ge = (e, t) => {
    const { source: s } = e,
      r = t.indexOf(s)
    r >= 0 && t.splice(r, 1)
  },
  ye = (e, t, s) => {
    const { target: r } = e,
      n = e.data,
      { index: o, parent: a } = n
    s === a && t.splice(o, 0, r)
  },
  Ee = (e, t) => {
    const { target: s, source: r } = e,
      n = t.indexOf(r)
    n >= 0 && (t[n] = s)
  },
  xe = {
    [i.removeNode]: ge,
    [i.insertNode]: ye,
    [i.replaceNode]: Ee,
  }
class Ae {
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
      s = se(this.dom, t, this.parentElement)
    this.dom = be(s, this.dom, this.parentElement)
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
const _e = (e) => e,
  we = ({ Template: e, viewModel: t, subscriptions: s }) => (
    (s = s || []),
    (t = t || _e),
    (r) =>
      new Ae({ Template: e, viewModel: t, subscriptions: s, attributes: r })
  ),
  De = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        createRouteState: T,
        events: At,
        extractQueryParams: F,
        findHref: $,
        navigate: D,
        onLinkClick: P,
        onLocationChange: L,
        start: _t,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Ne =
    (e) =>
    ({ path: t }) =>
      t === e,
  Se = () => !0,
  X =
    (e) =>
    ({ route: t }) => {
      const s = e.find((r) => r.match(t))
      return s && s.Partial
    },
  Pe = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        buildRouter: X,
        catchAll: Se,
        exactPathMatch: Ne,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  je = () => ({
    render: (e, t) => [],
  }),
  Fe = (e) => {
    const t = X(e)
    return we({
      Template: ({ route: r }) => (t({ route: r }) || je)(),
      subscriptions: ['route'],
    })
  }
export {
  $e as JaxsTypes,
  Oe as appBuilding,
  we as bind,
  Te as createApp,
  yt as jsx,
  Me as messageBus,
  De as navigation,
  Fe as routedView,
  Pe as routing,
  ke as state,
}
