;(function (l, b) {
  typeof exports == 'object' && typeof module < 'u'
    ? b(exports)
    : typeof define == 'function' && define.amd
      ? define(['exports'], b)
      : ((l = typeof globalThis < 'u' ? globalThis : l || self),
        b((l.jaxs = {})))
})(this, function (l) {
  'use strict'
  const b = (e, t) => {
      for (let s = e.length - 1; s >= 0; s--) e[s] === t && e.splice(s, 1)
      return e
    },
    O = (e, t) => {
      for (let s = e.length - 1; s >= 0; s--) t(e[s]) && e.splice(s, 1)
      return e
    },
    M = (e, t, s) => (e.splice(t, 0, s), e),
    k = (e, t) => (e.includes(t) || e.push(t), e),
    pt = {
      remove: b,
      removeBy: O,
      insertAt: M,
      appendIfUnique: k,
      push: (e, t) => e.push(t),
      pop: (e) => e.pop(),
      unshift: (e, t) => e.unshift(t),
      shift: (e) => e.shift(),
      sortBy: (e, t) => e.sort(t),
      includes: (e, t) => e.includes(t),
    }
  class ft {
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
  const v = (e) => new ft(e),
    mt = {
      toggle: (e) => v(e).toggle(),
      setTrue: (e) => v(e).setTrue(),
      setFalse: (e) => v(e).setFalse(),
      reset: (e) => v(e).reset(),
      isTrue: (e) => v(e).isTrue(),
      isFalse: (e) => v(e).isFalse(),
    }
  class bt {
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
      M(r, t, s), this.update(r)
    }
    remove(t) {
      const s = b(this.value, t)
      this.update(s)
    }
    removeBy(t) {
      const s = O(this.value, t)
      this.update(s)
    }
    includes(t) {
      return this.value.includes(t)
    }
    appendIfUnique(t) {
      const s = this.value
      k(s, t), this.update(s)
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
  const m = (e) => new bt(e),
    vt = {
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
  class yt {
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
  const y = (e) => new yt(e),
    gt = {
      reset: (e) => y(e).reset(),
      resetAttribute: (e, t) => y(e).resetAttribute(t),
      updateAttribute: (e, t, s) => y(e).updateAttribute(t, s),
      updateAttributes: (e, t) => y(e).updateAttributes(t),
      attributeTruthy: (e, t) => y(e).attributeTruthy(t),
    },
    Et = (e) => typeof e == 'boolean',
    At = (e) => typeof e == 'number',
    $ = (e) => typeof e == 'string',
    g = (e) => Array.isArray(e),
    A = (e) => e !== null && !g(e) && typeof e == 'object',
    wt = { boolean: Et, number: At, string: $, array: g, object: A },
    Nt = (e, t) => t.createElement(e),
    St = (e, t) => {
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
    _t = (e, t, s) => {
      const r = {}
      for (const n in t) {
        const i = t[n],
          o = (c) => s(i, c)
        e.addEventListener(n, o),
          (r[n] = { domEvent: n, busEvent: i, listener: o })
      }
      e.eventMaps = r
    },
    xt = (e, t, s, r) => {
      const n = Nt(e, r.document)
      return St(n, t), _t(n, s, r.publish), n
    },
    N = 'http://www.w3.org/2000/svg',
    Tt = {
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
    jt = (e, t) => !!(Tt[e] || (e === 'a' && t === N)),
    Ot = (e, t, s) => {
      const r = s.createElementNS(N, e)
      for (const n in t)
        n === '__self' ||
          n === 'xmlns' ||
          r.setAttributeNS(null, n, t[n].toString())
      return r
    },
    Mt = (e) => e.namespaceURI === N,
    kt = (e, t) => t.createTextNode(e)
  class $t {
    constructor(t) {
      this.value = t.toString()
    }
    render(t) {
      const s = kt(this.value, t.document)
      return (s.__jsx = 'TextNode'), [s]
    }
  }
  const Bt = (e) => typeof e == 'string' || typeof e == 'number',
    Dt = (e) => new $t(e),
    Pt = (e) => (Bt(e) ? Dt(e) : e),
    B = (e) => Ft(e).map(Pt).flat(),
    Ft = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
    D = (e, t = {}) => B(e || t.children || []),
    Vt = (e, t = '') => {
      const s = {},
        r = {}
      for (const n in e) {
        const i = e[n]
        if (n.match(/^on.+/i)) {
          const o = n.slice(2).toLowerCase()
          r[o] = i ? i.toString() : ''
        } else {
          if (i === !1) continue
          n === '__source' ? (s.__source = e.__source) : (s[n] = Lt(n, i, t))
        }
      }
      return { attributes: s, events: r }
    },
    Lt = (e, t, s = '') => (t == null ? s : t.toString()),
    zt = (e, t) => {
      const s = e || {},
        r = D(t, s)
      return (s.children = s.children || r), s
    },
    P = (e, t, s, r = []) => e.reduce(Kt(t, s), r).flat(),
    Kt = (e, t) => (s, r) =>
      r
        ? Array.isArray(r)
          ? P(r, e, t, s)
          : (r.render(e, t).forEach((n) => s.push(n)), s)
        : s
  class F {
    constructor(t) {
      this.collection = B(t)
    }
    render(t, s) {
      this.parentElement = s
      const r = this.generateDom(t)
      return this.attachToParent(r), r
    }
    generateDom(t) {
      return P(this.collection, t, this.parentElement)
    }
    attachToParent(t) {
      if (this.parentElement === void 0) return
      const s = this.parentElement
      t.forEach((r) => s.appendChild(r))
    }
  }
  class Rt {
    constructor(t, s) {
      ;(this.type = t), (this.attributes = s)
    }
    generate() {
      return (
        this.attributes.key ||
        this.sourceKey() ||
        this.createKeyFromAttributes()
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
  class Ut {
    constructor(t, s, r = []) {
      this.type = t
      const { events: n, attributes: i } = Vt(s)
      ;(this.events = n),
        (this.attributes = i),
        (this.isSvg = jt(this.type, this.attributes.xmlns)),
        (this.children = new F(r))
    }
    render(t) {
      const s = this.generateDom(t)
      return s ? (this.children.render(t, s), [s]) : []
    }
    generateDom(t) {
      return this.isSvg ? this.generateSvgDom(t) : this.generateHtmlDom(t)
    }
    generateHtmlDom(t) {
      const s = xt(this.type, this.attributes, this.events, t)
      return (s.__jsx = this.jsxKey()), s
    }
    generateSvgDom(t) {
      const s = Ot(this.type, this.attributes, t.document)
      return (s.__jsx = this.jsxKey()), s
    }
    jsxKey() {
      return new Rt(this.type, this.attributes).generate()
    }
  }
  const V = (e, t, ...s) =>
    typeof e == 'string' ? new Ut(e, t, s) : e(zt(t, s))
  V.fragment = (e, t) => {
    const s = D(t, e)
    return new F(s)
  }
  class qt {
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
  const It = (e, t, s) => {
      const r = new qt(e, t, s)
      return r.renderAndAttach(s), r
    },
    L = 'go-to-href',
    z = 'go-to',
    E = 'navigation:location-change',
    K = 'navigation:route-change',
    Jt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          linkNavigationEvent: L,
          locationChangeEvent: E,
          navigationEvent: z,
          routeChangeEvent: K,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    R = (e) => {
      e.create('route', { host: '', path: '', query: {} })
    },
    U = (e) => {
      const t = e.closest('[href]')
      return (t && t.getAttribute('href')) || ''
    },
    S = ({ payload: e, publish: t, window: s }) => {
      s.history.pushState(null, '', e), t(E, null)
    },
    q = (e) => {
      const t = e.payload
      if (!t || !t.target) return
      t.preventDefault()
      const s = U(t.target)
      S({ ...e, payload: s })
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
        { host: n, pathname: i, search: o } = r.location,
        c = i,
        u = I(o),
        d = { host: n, path: c, query: u }
      t.store('route').update(d), s(K, d)
    },
    H = (e) => {
      const { subscribe: t } = e
      t(L, q),
        t(z, (s) => {
          S(s)
        })
    },
    G = (e) => {
      const { publish: t, subscribe: s, state: r, window: n } = e
      R(r), n.addEventListener('popstate', () => t(E, null)), s(E, J)
    },
    W = (e) => {
      setTimeout(() => e.publish(E, null), 0)
    },
    C = (e) => {
      G(e), H(e), W(e)
    },
    Ht = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          publishLocation: W,
          startNavigation: C,
          subscribeToHistoryChange: G,
          subscribeToNavigation: H,
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
      bus: i,
      state: o,
      renderKit: c,
    }) {
      ;(this.window = t),
        (this.document = s),
        (this.publish = r),
        (this.subscribe = n),
        (this.bus = i),
        (this.state = o),
        (this.renderKit = c),
        (this.roots = [])
    }
    render(t, s) {
      const r = It(t, s, this.renderKit)
      return this.roots.push(r), r
    }
    startNavigation() {
      C(this)
    }
  }
  const Gt = Object.freeze(
    Object.defineProperty({ __proto__: null, App: Q }, Symbol.toStringTag, {
      value: 'Module',
    }),
  )
  class X {
    constructor() {
      this.lookup = {}
    }
    add(t, s, r) {
      this.ensureArrayFor(t)
      const n = { listener: s, index: r, matcher: t }
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
      const n = { listener: s, index: r, matcher: t }
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
        (this.startedAt = new Date().getTime()),
        (this.callCount = 0)
    }
    start() {
      this.setNewTimeout()
    }
    diff() {
      return new Date().getTime() - this.startedAt
    }
    stopTimeout() {
      ;(this.stopped = !0), this.timeoutId && clearTimeout(this.timeoutId)
    }
    publishEvent() {
      this.stopped ||
        ((this.callCount += 1), this.publish(this.event, this.payload))
    }
  }
  const Wt = (e) => (t, s) => {
      const { offset: r, period: n, payload: i } = s,
        o = ({ callCount: u }) => (r && u == 0 ? r : n),
        c = new _({ payload: i, event: t, publish: e, timer: o })
      return c.start(), c.stop
    },
    Ct =
      (e) =>
      (t, { timeout: s, payload: r }) => {
        const n = ({ callCount: o, stop: c }) => (o > 1 && c(), s),
          i = new _({ publish: e, event: t, payload: r, timer: n })
        return i.start(), i.stop
      },
    Qt = (e) => (t, s) => {
      const r = { ...s, event: t, publish: e },
        n = new _(r)
      return n.start(), n.stop
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
      const e = new Z(),
        t = (r, n) => e.publish(r, n)
      return (
        (t.withTimeout = Ct(t)),
        (t.periodically = Wt(t)),
        (t.periodicallyWithCustomTimer = Qt(t)),
        { bus: e, publish: t, subscribe: (r, n) => e.subscribe(r, n) }
      )
    },
    Xt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          ExactSubscriptions: X,
          FuzzySubscriptions: Y,
          JaxsBus: Z,
          createBus: tt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Yt = (e, t) => e === t,
    Zt = (e, t) => Object.keys(e).length === Object.keys(t).length,
    et = (e, t) =>
      !(A(e) && A(t)) || !Zt(e, t)
        ? !1
        : Object.keys(e).every((s) => {
            const r = e[s],
              n = t[s]
            return w(r, n)
          }),
    st = (e, t) =>
      !(g(e) && g(t)) || e.length !== t.length
        ? !1
        : e.every((s, r) => {
            const n = t[r]
            return w(s, n)
          }),
    w = (e, t) => (A(e) ? et(e, t) : g(e) ? st(e, t) : Yt(e, t)),
    te = { objects: et, arrays: st, equal: w }
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
      w(this._value, t) || ((this._value = t), this.parent.notify(this.name))
    }
    getUpdatedValue(t) {
      return t(this.value)
    }
  }
  const T = 'state'
  class rt {
    constructor(t) {
      ;(this.publisher = t),
        (this.stores = {}),
        (this.eventNamePrefix = T),
        (this.notifications = new Set()),
        (this.inTransaction = !1)
    }
    create(t, s) {
      const r = new x({ name: t, parent: this, value: s })
      return (this.stores[t] = r), r
    }
    store(t) {
      return this.stores[t] || new x({ name: t, parent: this, value: void 0 })
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
      this.publisher(this.event(t), { state: this, store: this.store(t) })
    }
    event(t) {
      return `${this.eventNamePrefix}:${t}`
    }
  }
  const nt = (e) => new rt(e),
    ee = Object.freeze(
      Object.defineProperty(
        { __proto__: null, State: rt, Store: x, createState: nt, eventName: T },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  class se {
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
          ? ((this.window = t.document.defaultView),
            (this.document = t.document))
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
  const re = (e = {}) => {
    const s = new se(e).setup()
    return s.startNavigation(), s
  }
  var a = ((e) => (
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
  ))(a || {})
  const ne = Object.freeze(
      Object.defineProperty(
        { __proto__: null, ChangeInstructionTypes: a },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    ie = (e, t) => ({ source: e, target: t, type: a.changeText, data: {} }),
    oe = (e, t) => ({ source: e, target: t, type: a.replaceNode, data: {} }),
    ue = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: a.removeAttribute,
    }),
    ae = (e, t, s) => ({ source: e, target: t, data: s, type: a.addAttribute }),
    ce = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: a.updateAttribute,
    }),
    le = (e, t, s) => ({ source: e, target: t, data: s, type: a.removeEvent }),
    he = (e, t, s) => ({ source: e, target: t, data: s, type: a.addEvent }),
    de = (e, t, s) => ({ source: e, target: t, data: s, type: a.updateEvent }),
    it = (e) => ({ source: e, target: e, type: a.removeNode, data: {} }),
    j = (e, t) => ({ target: e, source: e, type: a.insertNode, data: t }),
    pe = (e, t, s) => ({ source: e, target: t, type: a.changeValue, data: s }),
    fe = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
    ot = { index: -1 }
  class me {
    constructor() {
      this.map = {}
    }
    populate(t) {
      t.forEach((s, r) => {
        const n = s.__jsx
        n &&
          ((this.map[n] = this.map[n] || []),
          this.map[n].push({ element: s, index: r }))
      })
    }
    pullMatch(t) {
      const s = t && t.__jsx
      return !s || !(this.map[s] && this.map[s].length)
        ? ot
        : this.map[s].shift()
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
  const ut = (e) => {
      const t = new me()
      return t.populate(e), t
    },
    at = (e, t, s = !1) => {
      const r = [],
        n = e.attributes,
        i = n.length,
        o = t.attributes,
        c = o.length
      let u, d, p
      for (u = 0; u < i; u++) {
        p = null
        const h = n.item(u)
        if (h) {
          for (d = 0; d < c; d++) {
            const f = o.item(d)
            if (f && h.name == f.name) {
              p = f
              break
            }
          }
          p
            ? h.value !== p.value &&
              r.push(ce(e, t, { name: h.name, value: p.value, isSvg: s }))
            : r.push(ue(e, t, { name: h.name, isSvg: s }))
        }
      }
      for (u = 0; u < c; u++) {
        p = null
        const h = o.item(u)
        if (h) {
          for (d = 0; d < i; d++) {
            const f = n.item(d)
            if (f && f.name == h.name) {
              p = f
              break
            }
          }
          p || r.push(ae(e, t, { name: h.name, value: h.value, isSvg: s }))
        }
      }
      return r
    },
    be = (e, t) => {
      const s = [],
        r = e.eventMaps,
        n = t.eventMaps,
        i = Object.keys(r),
        o = Object.keys(n)
      return (
        i.forEach((c) => {
          const u = r[c],
            d = n[c]
          d
            ? d.busEvent !== u.busEvent &&
              s.push(
                de(e, t, {
                  name: c,
                  targetValue: d.listener,
                  sourceValue: u.listener,
                }),
              )
            : s.push(le(e, t, { name: u.domEvent, value: u.listener }))
        }),
        o.forEach((c) => {
          const u = r[c],
            d = n[c]
          u || s.push(he(e, t, { name: d.domEvent, value: d.listener }))
        }),
        s
      )
    },
    ve = (e) => e.tagName !== 'INPUT',
    ye = (e, t) => e.value === t.value,
    ge = (e, t) => {
      if (ve(e) || ye(e, t)) return []
      const s = e,
        r = t
      return [pe(s, r, { name: 'value', value: r.value })]
    },
    Ee = (e, t) => {
      const s = at(e, t),
        r = be(e, t),
        n = ge(e, t)
      return s.concat(r).concat(n)
    },
    Ae = (e, t) => at(e, t, !0),
    we = (e, t) => (e.textContent !== t.textContent ? [ie(e, t)] : []),
    Ne = (e, t, s) => {
      let r = []
      if (e.nodeType === 1 && Mt(e)) {
        const n = e,
          i = t,
          o = Ae(n, i),
          c = s(n.childNodes, i.childNodes, n)
        r = o.concat(c)
      } else if (e.nodeType === 1) {
        const n = e,
          i = t,
          o = Ee(n, i),
          c = s(n.childNodes, i.childNodes, n)
        r = o.concat(c)
      } else e.nodeType === 3 && (r = we(e, t))
      return r
    },
    ct = (e, t, s) => {
      const r = [],
        n = Se(e, t),
        i = ut(e),
        o = ut(t),
        c = []
      let u = 0
      for (; u < n; u++) {
        const p = e[u],
          h = t[u]
        if (h && o.check(h)) {
          const f = i.pullMatch(h)
          o.clear(h),
            f.element
              ? (f.index !== u && r.push(j(f.element, { parent: s, index: u })),
                c.push({ source: f.element, target: h }))
              : p
                ? o.check(p)
                  ? r.push(j(h, { parent: s, index: u }))
                  : (i.clear(p), r.push(oe(p, h)))
                : r.push(j(h, { parent: s, index: u }))
        } else p && i.pullMatch(p).element && r.push(it(p))
      }
      i.remaining().forEach(({ element: p }) => {
        r.push(it(p))
      })
      const d = c.reduce(
        (p, { source: h, target: f }) => p.concat(Ne(h, f, ct)),
        [],
      )
      return r.concat(d).sort(fe)
    },
    Se = (e, t) => {
      const s = e.length,
        r = t.length
      return s > r ? s : r
    },
    _e = (e, t, s) => {
      const r = ct(e, t, s)
      return (
        r.forEach((n) => {
          xe(n)
        }),
        r
      )
    },
    xe = (e) => {
      ;(Le[e.type] || Te)(e)
    },
    Te = (e) => {},
    je = (e) => {
      const { source: t, target: s } = e
      t.nodeValue = s.textContent
    },
    Oe = (e) => {
      const { source: t } = e
      t.remove()
    },
    Me = (e) => {
      const { target: t, data: s } = e,
        { parent: r, index: n } = s,
        i = r.childNodes[n]
      i ? i && i !== t && r.insertBefore(t, i) : r.appendChild(t)
    },
    ke = (e) => {
      const { source: t, target: s } = e
      t.replaceWith(s)
    },
    $e = (e) => {
      const { source: t, data: s } = e,
        { name: r, isSvg: n } = s
      n ? t.removeAttributeNS(null, r) : t.removeAttribute(r)
    },
    lt = (e) => {
      const { source: t, data: s } = e,
        { name: r, value: n, isSvg: i } = s
      i ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
    },
    Be = (e) => {
      lt(e)
    },
    De = (e) => {
      const t = e.data,
        s = e.source,
        { name: r, value: n } = t
      s.removeEventListener(r, n)
    },
    Pe = (e) => {
      const t = e.data,
        s = e.source,
        { name: r, value: n } = t
      s.addEventListener(r, n)
    },
    Fe = (e) => {
      const t = e.data,
        s = e.source,
        { name: r, sourceValue: n, targetValue: i } = t
      s.removeEventListener(r, n), s.addEventListener(r, i)
    },
    Ve = (e) => {
      const t = e.data,
        s = e.source,
        { value: r } = t
      s.value = r
    },
    Le = {
      [a.changeText]: je,
      [a.removeNode]: Oe,
      [a.insertNode]: Me,
      [a.replaceNode]: ke,
      [a.removeAttribute]: $e,
      [a.addAttribute]: lt,
      [a.updateAttribute]: Be,
      [a.removeEvent]: De,
      [a.addEvent]: Pe,
      [a.updateEvent]: Fe,
      [a.changeValue]: Ve,
    },
    ze = (e, t, s) => {
      const r = [...t]
      return (
        e.forEach((n) => {
          Ke(n, r, s)
        }),
        r
      )
    },
    Ke = (e, t, s) => {
      const r = Ie[e.type]
      r && r(e, t, s)
    },
    Re = (e, t) => {
      const { source: s } = e,
        r = t.indexOf(s)
      r >= 0 && t.splice(r, 1)
    },
    Ue = (e, t, s) => {
      const { target: r } = e,
        n = e.data,
        { index: i, parent: o } = n
      s === o && t.splice(i, 0, r)
    },
    qe = (e, t) => {
      const { target: s, source: r } = e,
        n = t.indexOf(r)
      n >= 0 && (t[n] = s)
    },
    Ie = { [a.removeNode]: Re, [a.insertNode]: Ue, [a.replaceNode]: qe }
  class Je {
    constructor({
      Template: t,
      subscriptions: s,
      attributes: r,
      viewModel: n,
    }) {
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
        s = _e(this.dom, t, this.parentElement)
      this.dom = ze(s, this.dom, this.parentElement)
    }
    subscribeForRerender() {
      const { subscribe: t } = this.renderKit
      this.subscriptions.forEach((s) => {
        t(this.eventName(s), () => this.rerender())
      })
    }
    eventName(t) {
      return `${T}:${t}`
    }
  }
  const He = (e) => e,
    ht = ({ Template: e, viewModel: t, subscriptions: s }) => (
      (s = s || []),
      (t = t || He),
      (r) =>
        new Je({ Template: e, viewModel: t, subscriptions: s, attributes: r })
    ),
    Ge =
      (e) =>
      ({ path: t }) =>
        t === e,
    We = () => !0,
    dt =
      (e) =>
      ({ route: t }) => {
        const s = e.find((r) => r.match(t))
        return s && s.Partial
      },
    Ce = Object.freeze(
      Object.defineProperty(
        { __proto__: null, buildRouter: dt, catchAll: We, exactPathMatch: Ge },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Qe = () => ({ render: (e, t) => [] }),
    Xe = (e) => {
      const t = dt(e)
      return ht({
        Template: ({ route: r }) => (t({ route: r }) || Qe)(),
        subscriptions: ['route'],
      })
    },
    Ye = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          createRouteState: R,
          events: Jt,
          extractQueryParams: I,
          findHref: U,
          navigate: S,
          onLinkClick: q,
          onLocationChange: J,
          start: Ht,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  ;(l.ArrayModifiers = pt),
    (l.BooleanStore = mt),
    (l.Equality = te),
    (l.Is = wt),
    (l.JaxsTypes = ne),
    (l.ListStore = vt),
    (l.RecordStore = gt),
    (l.appBuilding = Gt),
    (l.bind = ht),
    (l.createApp = re),
    (l.jsx = V),
    (l.messageBus = Xt),
    (l.navigation = Ye),
    (l.routedView = Xe),
    (l.routing = Ce),
    (l.state = ee),
    Object.defineProperty(l, Symbol.toStringTag, { value: 'Module' })
})
