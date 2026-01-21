const M = (e, t) => {
    for (let s = e.length - 1; s >= 0; s--) e[s] === t && e.splice(s, 1)
    return e
  },
  k = (e, t) => {
    for (let s = e.length - 1; s >= 0; s--) t(e[s]) && e.splice(s, 1)
    return e
  },
  $ = (e, t, s) => (e.splice(t, 0, s), e),
  B = (e, t) => (e.includes(t) || e.push(t), e),
  ze = {
    remove: M,
    removeBy: k,
    insertAt: $,
    appendIfUnique: B,
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
const f = (e) => new ht(e),
  Ke = {
    toggle: (e) => f(e).toggle(),
    setTrue: (e) => f(e).setTrue(),
    setFalse: (e) => f(e).setFalse(),
    reset: (e) => f(e).reset(),
    isTrue: (e) => f(e).isTrue(),
    isFalse: (e) => f(e).isFalse(),
  }
class dt {
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
    $(r, t, s), this.update(r)
  }
  remove(t) {
    const s = M(this.value, t)
    this.update(s)
  }
  removeBy(t) {
    const s = k(this.value, t)
    this.update(s)
  }
  includes(t) {
    return this.value.includes(t)
  }
  appendIfUnique(t) {
    const s = this.value
    B(s, t), this.update(s)
  }
  findBy(t) {
    return this.value.find(t)
  }
  replace(t, s) {
    const r = this.value,
      n = r.indexOf(t)
    n !== -1 && ((r[n] = s), this.update(r))
  }
}
const m = (e) => new dt(e),
  Re = {
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
    findBy: (e, t) => m(e).findBy(t),
    replace: (e, t, s) => m(e).replace(t, s),
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
  attributeTruthy(t) {
    return !!this.value[t]
  }
}
const b = (e) => new pt(e),
  Ue = {
    reset: (e) => b(e).reset(),
    resetAttribute: (e, t) => b(e).resetAttribute(t),
    updateAttribute: (e, t, s) => b(e).updateAttribute(t, s),
    updateAttributes: (e, t) => b(e).updateAttributes(t),
    attributeTruthy: (e, t) => b(e).attributeTruthy(t),
  },
  mt = (e) => typeof e == 'boolean',
  ft = (e) => typeof e == 'number',
  D = (e) => typeof e == 'string',
  v = (e) => Array.isArray(e),
  g = (e) => e !== null && !v(e) && typeof e == 'object',
  qe = {
    boolean: mt,
    number: ft,
    string: D,
    array: v,
    object: g,
  },
  bt = (e, t) => t.createElement(e),
  vt = (e, t) => {
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
  yt = (e, t, s) => {
    const r = {}
    for (const n in t) {
      const i = t[n],
        o = (a) => s(i, a)
      e.addEventListener(n, o),
        (r[n] = {
          domEvent: n,
          busEvent: i,
          listener: o,
        })
    }
    e.eventMaps = r
  },
  gt = (e, t, s, r) => {
    const n = bt(e, r.document)
    return vt(n, t), yt(n, s, r.publish), n
  },
  w = 'http://www.w3.org/2000/svg',
  Et = {
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
  At = (e, t) => !!(Et[e] || (e === 'a' && t === w)),
  xt = (e, t, s) => {
    const r = s.createElementNS(w, e)
    for (const n in t)
      n === '__self' ||
        n === 'xmlns' ||
        r.setAttributeNS(null, n, t[n].toString())
    return r
  },
  wt = (e) => e.namespaceURI === w,
  Nt = (e, t) => t.createTextNode(e)
class _t {
  constructor(t) {
    this.value = t.toString()
  }
  render(t) {
    const s = Nt(this.value, t.document)
    return (s.__jsx = 'TextNode'), [s]
  }
}
const St = (e) => typeof e == 'string' || typeof e == 'number',
  Tt = (e) => new _t(e),
  jt = (e) => (St(e) ? Tt(e) : e),
  P = (e) => Ot(e).map(jt).flat(),
  Ot = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
  F = (e, t = {}) => P(e || t.children || []),
  Mt = (e, t = '') => {
    const s = {},
      r = {}
    for (const n in e) {
      const i = e[n]
      if (n.match(/^on.+/i)) {
        const o = n.slice(2).toLowerCase()
        r[o] = i ? i.toString() : ''
      } else {
        if (i === !1) continue
        n === '__source' ? (s.__source = e.__source) : (s[n] = kt(n, i, t))
      }
    }
    return {
      attributes: s,
      events: r,
    }
  },
  kt = (e, t, s = '') => (t == null ? s : t.toString()),
  $t = (e, t) => {
    const s = e || {},
      r = F(t, s)
    return (s.children = s.children || r), s
  },
  V = (e, t, s, r = []) => e.reduce(Bt(t, s), r).flat(),
  Bt = (e, t) => (s, r) =>
    r
      ? Array.isArray(r)
        ? V(r, e, t, s)
        : (r.render(e, t).forEach((n) => s.push(n)), s)
      : s
class L {
  constructor(t) {
    this.collection = P(t)
  }
  render(t, s) {
    this.parentElement = s
    const r = this.generateDom(t)
    return this.attachToParent(r), r
  }
  generateDom(t) {
    return V(this.collection, t, this.parentElement)
  }
  attachToParent(t) {
    if (this.parentElement === void 0) return
    const s = this.parentElement
    t.forEach((r) => s.appendChild(r))
  }
}
class Dt {
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
class Pt {
  constructor(t, s, r = []) {
    this.type = t
    const { events: n, attributes: i } = Mt(s)
    ;(this.events = n),
      (this.attributes = i),
      (this.isSvg = At(this.type, this.attributes.xmlns)),
      (this.children = new L(r))
  }
  render(t) {
    const s = this.generateDom(t)
    return s ? (this.children.render(t, s), [s]) : []
  }
  generateDom(t) {
    return this.isSvg ? this.generateSvgDom(t) : this.generateHtmlDom(t)
  }
  generateHtmlDom(t) {
    const s = gt(this.type, this.attributes, this.events, t)
    return (s.__jsx = this.jsxKey()), s
  }
  generateSvgDom(t) {
    const s = xt(this.type, this.attributes, t.document)
    return (s.__jsx = this.jsxKey()), s
  }
  jsxKey() {
    return new Dt(this.type, this.attributes).generate()
  }
}
const Ft = (e, t, ...s) =>
  typeof e == 'string' ? new Pt(e, t, s) : e($t(t, s))
Ft.fragment = (e, t) => {
  const s = F(t, e)
  return new L(s)
}
class Vt {
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
const Lt = (e, t, s) => {
    const r = new Vt(e, t, s)
    return r.renderAndAttach(s), r
  },
  z = 'go-to-href',
  K = 'go-to',
  y = 'navigation:location-change',
  R = 'navigation:route-change',
  zt = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        linkNavigationEvent: z,
        locationChangeEvent: y,
        navigationEvent: K,
        routeChangeEvent: R,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  U = (e) => {
    e.create('route', {
      host: '',
      path: '',
      query: {},
    })
  },
  q = (e) => {
    const t = e.closest('[href]')
    return (t && t.getAttribute('href')) || ''
  },
  N = ({ payload: e, publish: t, window: s }) => {
    s.history.pushState(null, '', e), t(y, null)
  },
  I = (e) => {
    const t = e.payload
    if (!t || !t.target) return
    t.preventDefault()
    const s = q(t.target)
    N({ ...e, payload: s })
  },
  J = (e) =>
    e
      .replace(/^\?/, '')
      .split('&')
      .reduce((t, s) => {
        if (!s) return t
        const r = s.split('=')
        return (t[r[0]] = r[1]), t
      }, {}),
  H = (e) => {
    const { state: t, publish: s, window: r } = e,
      { host: n, pathname: i, search: o } = r.location,
      a = i,
      u = J(o),
      h = {
        host: n,
        path: a,
        query: u,
      }
    t.store('route').update(h), s(R, h)
  },
  G = (e) => {
    const { subscribe: t } = e
    t(z, I),
      t(K, (s) => {
        N(s)
      })
  },
  W = (e) => {
    const { publish: t, subscribe: s, state: r, window: n } = e
    U(r), n.addEventListener('popstate', () => t(y, null)), s(y, H)
  },
  C = (e) => {
    setTimeout(() => e.publish(y, null), 0)
  },
  Q = (e) => {
    W(e), G(e), C(e)
  },
  Kt = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        publishLocation: C,
        startNavigation: Q,
        subscribeToHistoryChange: W,
        subscribeToNavigation: G,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
class X {
  constructor({
    window: t,
    document: s,
    publish: r,
    subscribe: n,
    bus: i,
    state: o,
    renderKit: a,
  }) {
    ;(this.window = t),
      (this.document = s),
      (this.publish = r),
      (this.subscribe = n),
      (this.bus = i),
      (this.state = o),
      (this.renderKit = a),
      (this.roots = [])
  }
  render(t, s) {
    const r = Lt(t, s, this.renderKit)
    return this.roots.push(r), r
  }
  startNavigation() {
    Q(this)
  }
}
const Ie = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      App: X,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
class Y {
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
class Z {
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
class _ {
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
const Rt = (e) => (t, s) => {
    const { offset: r, period: n, payload: i } = s,
      o = ({ callCount: u }) => (r && u == 0 ? r : n),
      a = new _({
        payload: i,
        event: t,
        publish: e,
        timer: o,
      })
    return a.start(), a.stop
  },
  Ut =
    (e) =>
    (t, { timeout: s, payload: r }) => {
      const n = ({ callCount: o, stop: a }) => (o > 1 && a(), s),
        i = new _({
          publish: e,
          event: t,
          payload: r,
          timer: n,
        })
      return i.start(), i.stop
    },
  qt = (e) => (t, s) => {
    const r = {
        ...s,
        event: t,
        publish: e,
      },
      n = new _(r)
    return n.start(), n.stop
  }
class tt {
  constructor() {
    ;(this.exactSubscriptions = new Y()),
      (this.fuzzySubscriptions = new Z()),
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
      publish: et(this.publish.bind(this)),
      payload: s,
    }
  }
}
const et = (e) => {
    const t = e
    return (
      (t.withTimeout = Ut(e)),
      (t.periodically = Rt(e)),
      (t.periodicallyWithCustomTimer = qt(e)),
      t
    )
  },
  st = () => {
    const e = new tt(),
      t = (r, n) => e.publish(r, n),
      s = (r, n) => e.subscribe(r, n)
    return {
      bus: e,
      publish: et(t),
      subscribe: s,
    }
  },
  Je = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ExactSubscriptions: Y,
        FuzzySubscriptions: Z,
        JaxsBus: tt,
        createBus: st,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  It = (e, t) => e === t,
  Jt = (e, t) => Object.keys(e).length === Object.keys(t).length,
  rt = (e, t) =>
    !(g(e) && g(t)) || !Jt(e, t)
      ? !1
      : Object.keys(e).every((s) => {
          const r = e[s],
            n = t[s]
          return E(r, n)
        }),
  nt = (e, t) =>
    !(v(e) && v(t)) || e.length !== t.length
      ? !1
      : e.every((s, r) => {
          const n = t[r]
          return E(s, n)
        }),
  E = (e, t) => (g(e) ? rt(e, t) : v(e) ? nt(e, t) : It(e, t)),
  He = {
    objects: rt,
    arrays: nt,
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
const S = 'state'
class it {
  constructor(t) {
    ;(this.publisher = t),
      (this.stores = {}),
      (this.eventNamePrefix = S),
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
const ot = (e) => new it(e),
  Ge = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        State: it,
        Store: x,
        createState: ot,
        eventName: S,
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
      new X({
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
    const { publish: t, subscribe: s, bus: r } = st()
    ;(this.publish = t), (this.subscribe = s), (this.bus = r)
  }
  setupState() {
    this.state = ot(this.publish)
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
const We = (e = {}) => {
  const s = new Ht(e).setup()
  return s.startNavigation(), s
}
var c = /* @__PURE__ */ ((e) => (
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
))(c || {})
const Ce = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ChangeInstructionTypes: c,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Gt = (e, t) => ({
    source: e,
    target: t,
    type: c.changeText,
    data: {},
  }),
  Wt = (e, t) => ({
    source: e,
    target: t,
    type: c.replaceNode,
    data: {},
  }),
  Ct = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: c.removeAttribute,
  }),
  Qt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: c.addAttribute,
  }),
  Xt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: c.updateAttribute,
  }),
  Yt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: c.removeEvent,
  }),
  Zt = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: c.addEvent,
  }),
  te = (e, t, s) => ({
    source: e,
    target: t,
    data: s,
    type: c.updateEvent,
  }),
  T = (e) => ({
    source: e,
    target: e,
    // for type crap only
    type: c.removeNode,
    data: {},
  }),
  A = (e, t) => ({
    target: e,
    source: e,
    // for type crap only
    type: c.insertNode,
    data: t,
  }),
  ee = (e, t, s) => ({
    source: e,
    target: t,
    type: c.changeValue,
    data: s,
  }),
  se = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
  j = { index: -1 }
class re {
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
    return !s || !(this.map[s] && this.map[s].length) ? j : this.map[s].shift()
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
const O = (e) => {
    const t = new re()
    return t.populate(e), t
  },
  ut = (e, t, s = !1) => {
    const r = [],
      n = e.attributes,
      i = n.length,
      o = t.attributes,
      a = o.length
    let u, h, d
    for (u = 0; u < i; u++) {
      d = null
      const l = n.item(u)
      if (l) {
        for (h = 0; h < a; h++) {
          const p = o.item(h)
          if (p && l.name == p.name) {
            d = p
            break
          }
        }
        d
          ? l.value !== d.value &&
            r.push(
              Xt(e, t, {
                name: l.name,
                value: d.value,
                isSvg: s,
              }),
            )
          : r.push(Ct(e, t, { name: l.name, isSvg: s }))
      }
    }
    for (u = 0; u < a; u++) {
      d = null
      const l = o.item(u)
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
            Qt(e, t, {
              name: l.name,
              value: l.value,
              isSvg: s,
            }),
          )
      }
    }
    return r
  },
  ne = (e, t) => {
    const s = [],
      r = e.eventMaps,
      n = t.eventMaps,
      i = Object.keys(r),
      o = Object.keys(n)
    return (
      i.forEach((a) => {
        const u = r[a],
          h = n[a]
        h
          ? h.busEvent !== u.busEvent &&
            s.push(
              te(e, t, {
                name: a,
                targetValue: h.listener,
                sourceValue: u.listener,
              }),
            )
          : s.push(
              Yt(e, t, {
                name: u.domEvent,
                value: u.listener,
              }),
            )
      }),
      o.forEach((a) => {
        const u = r[a],
          h = n[a]
        u ||
          s.push(
            Zt(e, t, {
              name: h.domEvent,
              value: h.listener,
            }),
          )
      }),
      s
    )
  },
  ie = (e) => e.tagName !== 'INPUT',
  oe = (e, t) => e.value === t.value,
  ue = (e, t) => {
    if (ie(e) || oe(e, t)) return []
    const s = e,
      r = t
    return [ee(s, r, { name: 'value', value: r.value })]
  },
  ae = (e, t) => {
    const s = ut(e, t),
      r = ne(e, t),
      n = ue(e, t)
    return s.concat(r).concat(n)
  },
  ce = (e, t) => ut(e, t, !0),
  le = (e, t) => (e.textContent !== t.textContent ? [Gt(e, t)] : []),
  he = (e, t, s) => {
    let r = []
    if (e.nodeType === 1 && wt(e)) {
      const n = e,
        i = t,
        o = ce(n, i),
        a = s(n.childNodes, i.childNodes, n)
      r = o.concat(a)
    } else if (e.nodeType === 1) {
      const n = e,
        i = t,
        o = ae(n, i),
        a = s(n.childNodes, i.childNodes, n)
      r = o.concat(a)
    } else e.nodeType === 3 && (r = le(e, t))
    return r
  },
  at = (e, t, s) => {
    const r = [],
      n = de(e, t),
      i = O(e),
      o = O(t),
      a = []
    let u = 0
    for (; u < n; u++) {
      const d = e[u],
        l = t[u]
      if (l && o.check(l)) {
        const p = i.pullMatch(l)
        o.clear(l),
          p.element
            ? (p.index !== u &&
                r.push(
                  A(p.element, {
                    parent: s,
                    index: u,
                  }),
                ),
              a.push({
                source: p.element,
                target: l,
              }))
            : d
              ? o.check(d)
                ? r.push(A(l, { parent: s, index: u }))
                : (i.clear(d), r.push(Wt(d, l)))
              : r.push(A(l, { parent: s, index: u }))
      } else d && i.pullMatch(d).element && r.push(T(d))
    }
    i.remaining().forEach(({ element: d }) => {
      r.push(T(d))
    })
    const h = a.reduce(
      (d, { source: l, target: p }) => d.concat(he(l, p, at)),
      [],
    )
    return r.concat(h).sort(se)
  },
  de = (e, t) => {
    const s = e.length,
      r = t.length
    return s > r ? s : r
  },
  pe = (e, t, s) => {
    const r = at(e, t, s)
    return (
      r.forEach((n) => {
        me(n)
      }),
      r
    )
  },
  me = (e) => {
    ;(Se[e.type] || fe)(e)
  },
  fe = (e) => {},
  be = (e) => {
    const { source: t, target: s } = e
    t.nodeValue = s.textContent
  },
  ve = (e) => {
    const { source: t } = e
    t.remove()
  },
  ye = (e) => {
    const { target: t, data: s } = e,
      { parent: r, index: n } = s,
      i = r.childNodes[n]
    i ? i && i !== t && r.insertBefore(t, i) : r.appendChild(t)
  },
  ge = (e) => {
    const { source: t, target: s } = e
    t.replaceWith(s)
  },
  Ee = (e) => {
    const { source: t, data: s } = e,
      { name: r, isSvg: n } = s
    n ? t.removeAttributeNS(null, r) : t.removeAttribute(r)
  },
  ct = (e) => {
    const { source: t, data: s } = e,
      { name: r, value: n, isSvg: i } = s
    i ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
  },
  Ae = (e) => {
    ct(e)
  },
  xe = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.removeEventListener(r, n)
  },
  we = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, value: n } = t
    s.addEventListener(r, n)
  },
  Ne = (e) => {
    const t = e.data,
      s = e.source,
      { name: r, sourceValue: n, targetValue: i } = t
    s.removeEventListener(r, n), s.addEventListener(r, i)
  },
  _e = (e) => {
    const t = e.data,
      s = e.source,
      { value: r } = t
    s.value = r
  },
  Se = {
    [c.changeText]: be,
    [c.removeNode]: ve,
    [c.insertNode]: ye,
    [c.replaceNode]: ge,
    [c.removeAttribute]: Ee,
    [c.addAttribute]: ct,
    [c.updateAttribute]: Ae,
    [c.removeEvent]: xe,
    [c.addEvent]: we,
    [c.updateEvent]: Ne,
    [c.changeValue]: _e,
  },
  Te = (e, t, s) => {
    const r = [...t]
    return (
      e.forEach((n) => {
        je(n, r, s)
      }),
      r
    )
  },
  je = (e, t, s) => {
    const r = $e[e.type]
    r && r(e, t, s)
  },
  Oe = (e, t) => {
    const { source: s } = e,
      r = t.indexOf(s)
    r >= 0 && t.splice(r, 1)
  },
  Me = (e, t, s) => {
    const { target: r } = e,
      n = e.data,
      { index: i, parent: o } = n
    s === o && t.splice(i, 0, r)
  },
  ke = (e, t) => {
    const { target: s, source: r } = e,
      n = t.indexOf(r)
    n >= 0 && (t[n] = s)
  },
  $e = {
    [c.removeNode]: Oe,
    [c.insertNode]: Me,
    [c.replaceNode]: ke,
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
      s = pe(this.dom, t, this.parentElement)
    this.dom = Te(s, this.dom, this.parentElement)
  }
  subscribeForRerender() {
    const { subscribe: t } = this.renderKit
    this.subscriptions.forEach((s) => {
      t(this.eventName(s), () => this.rerender())
    })
  }
  eventName(t) {
    return `${S}:${t}`
  }
}
const De = (e) => e,
  Pe = ({ Template: e, viewModel: t, subscriptions: s }) => (
    (s = s || []),
    (t = t || De),
    (r) =>
      new Be({ Template: e, viewModel: t, subscriptions: s, attributes: r })
  ),
  Fe =
    (e) =>
    ({ path: t }) =>
      t === e,
  Ve = () => !0,
  lt =
    (e) =>
    ({ route: t }) => {
      const s = e.find((r) => r.match(t))
      return s && s.Partial
    },
  Qe = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        buildRouter: lt,
        catchAll: Ve,
        exactPathMatch: Fe,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Le = () => ({
    render: (e, t) => [],
  }),
  Xe = (e) => {
    const t = lt(e)
    return Pe({
      Template: ({ route: r }) => (t({ route: r }) || Le)(),
      subscriptions: ['route'],
    })
  },
  Ye = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        createRouteState: U,
        events: zt,
        extractQueryParams: J,
        findHref: q,
        navigate: N,
        onLinkClick: I,
        onLocationChange: H,
        start: Kt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
export {
  ze as ArrayModifiers,
  Ke as BooleanStore,
  He as Equality,
  qe as Is,
  Ce as JaxsTypes,
  Re as ListStore,
  Ue as RecordStore,
  Ie as appBuilding,
  Pe as bind,
  We as createApp,
  Ft as jsx,
  Je as messageBus,
  Ye as navigation,
  Xe as routedView,
  Qe as routing,
  Ge as state,
}
