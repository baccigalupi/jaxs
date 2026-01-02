;(function (p, b) {
  typeof exports == 'object' && typeof module < 'u'
    ? b(exports)
    : typeof define == 'function' && define.amd
      ? define(['exports'], b)
      : ((p = typeof globalThis < 'u' ? globalThis : p || self),
        b((p.jaxs = {})))
})(this, function (p) {
  'use strict'
  const b = (e, t) => e.reduce((s, r) => (r !== t && s.push(r), s), []),
    j = (e, t) => e.reduce((s, r) => (t(r) || s.push(r), s), []),
    O = (e, t, s) => (e.splice(t, 0, s), e),
    ht = { remove: b, removeBy: j, insertAt: O }
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
  const v = (e) => new dt(e),
    pt = {
      toggle: (e) => v(e).toggle(),
      setTrue: (e) => v(e).setTrue(),
      setFalse: (e) => v(e).setFalse(),
      reset: (e) => v(e).reset(),
    }
  class mt {
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
      O(r, t, s), this.update(r)
    }
    remove(t) {
      const s = b(this.value, t)
      this.update(s)
    }
    removeBy(t) {
      const s = j(this.value, t)
      this.update(s)
    }
  }
  const f = (e) => new mt(e),
    ft = {
      push: (e, t) => f(e).push(t),
      pop: (e) => f(e).pop(),
      unshift: (e, t) => f(e).unshift(t),
      shift: (e) => f(e).shift(),
      sortBy: (e, t) => f(e).sortBy(t),
      insertAt: (e, t, s) => f(e).insertAt(t, s),
      remove: (e, t) => f(e).remove(t),
      removeBy: (e, t) => f(e).removeBy(t),
      reset: (e) => f(e).reset(),
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
  const g = (e) => new bt(e),
    vt = {
      reset: (e) => g(e).reset(),
      resetAttribute: (e, t) => g(e).resetAttribute(t),
      updateAttribute: (e, t, s) => g(e).updateAttribute(t, s),
      updateAttributes: (e, t) => g(e).updateAttributes(t),
    },
    gt = (e) => typeof e == 'boolean',
    yt = (e) => typeof e == 'number',
    M = (e) => typeof e == 'string',
    y = (e) => Array.isArray(e),
    A = (e) => e !== null && !y(e) && typeof e == 'object',
    Et = { boolean: gt, number: yt, string: M, array: y, object: A },
    At = (e, t) => t.createElement(e),
    wt = (e, t) => {
      for (const s in t) {
        if (s === '__self') continue
        const r = t[s].toString()
        if (s === 'value') {
          const n = e
          n.value !== r && (n.value = r)
        } else
          M(r) && r.trim() === '' ? e.removeAttribute(s) : e.setAttribute(s, r)
      }
    },
    Nt = (e, t, s) => {
      const r = {}
      for (const n in t) {
        const i = t[n],
          a = (c) => s(i, c)
        e.addEventListener(n, a),
          (r[n] = { domEvent: n, busEvent: i, listener: a })
      }
      e.eventMaps = r
    },
    _t = (e, t, s, r) => {
      const n = At(e, r.document)
      return wt(n, t), Nt(n, s, r.publish), n
    },
    N = 'http://www.w3.org/2000/svg',
    xt = {
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
    St = (e, t) => !!(xt[e] || (e === 'a' && t === N)),
    Tt = (e, t, s) => {
      const r = s.createElementNS(N, e)
      for (const n in t)
        n === '__self' ||
          n === 'xmlns' ||
          r.setAttributeNS(null, n, t[n].toString())
      return r
    },
    jt = (e) => e.namespaceURI === N,
    Ot = (e, t) => t.createTextNode(e)
  class Mt {
    constructor(t) {
      this.value = t.toString()
    }
    render(t) {
      const s = Ot(this.value, t.document)
      return (s.__jsx = 'TextNode'), [s]
    }
  }
  const kt = (e) => typeof e == 'string' || typeof e == 'number',
    $t = (e) => new Mt(e),
    Dt = (e) => (kt(e) ? $t(e) : e),
    k = (e) => Pt(e).map(Dt).flat(),
    Pt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
    $ = (e, t = {}) => k(e || t.children || []),
    Bt = (e, t = '') => {
      const s = {},
        r = {}
      for (const n in e) {
        const i = e[n]
        if (n.match(/^on.+/i)) {
          const a = n.slice(2).toLowerCase()
          r[a] = i ? i.toString() : ''
        } else {
          if (i === !1) continue
          n === '__source' ? (s.__source = e.__source) : (s[n] = Vt(n, i, t))
        }
      }
      return { attributes: s, events: r }
    },
    Vt = (e, t, s = '') => (t == null ? s : t.toString()),
    Ft = (e, t) => {
      const s = e || {},
        r = $(t, s)
      return (s.children = s.children || r), s
    },
    D = (e, t, s, r = []) => e.reduce(Lt(t, s), r).flat(),
    Lt = (e, t) => (s, r) =>
      r
        ? Array.isArray(r)
          ? D(r, e, t, s)
          : (r.render(e, t).forEach((n) => s.push(n)), s)
        : s
  class P {
    constructor(t) {
      this.collection = k(t)
    }
    render(t, s) {
      this.parentElement = s
      const r = this.generateDom(t)
      return this.attachToParent(r), r
    }
    generateDom(t) {
      return D(this.collection, t, this.parentElement)
    }
    attachToParent(t) {
      if (this.parentElement === void 0) return
      const s = this.parentElement
      t.forEach((r) => s.appendChild(r))
    }
  }
  class zt {
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
  class Kt {
    constructor(t, s, r = []) {
      this.type = t
      const { events: n, attributes: i } = Bt(s)
      ;(this.events = n),
        (this.attributes = i),
        (this.isSvg = St(this.type, this.attributes.xmlns)),
        (this.children = new P(r))
    }
    render(t) {
      const s = this.generateDom(t)
      return s ? (this.children.render(t, s), [s]) : []
    }
    generateDom(t) {
      return this.isSvg ? this.generateSvgDom(t) : this.generateHtmlDom(t)
    }
    generateHtmlDom(t) {
      const s = _t(this.type, this.attributes, this.events, t)
      return (s.__jsx = this.jsxKey()), s
    }
    generateSvgDom(t) {
      const s = Tt(this.type, this.attributes, t.document)
      return (s.__jsx = this.jsxKey()), s
    }
    jsxKey() {
      return new zt(this.type, this.attributes).generate()
    }
  }
  const B = (e, t, ...s) =>
    typeof e == 'string' ? new Kt(e, t, s) : e(Ft(t, s))
  B.fragment = (e, t) => {
    const s = $(t, e)
    return new P(s)
  }
  class Rt {
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
  const Ut = (e, t, s) => {
      const r = new Rt(e, t, s)
      return r.renderAndAttach(s), r
    },
    V = 'go-to-href',
    F = 'go-to',
    E = 'navigation:location-change',
    L = 'navigation:route-change',
    qt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          linkNavigationEvent: V,
          locationChangeEvent: E,
          navigationEvent: F,
          routeChangeEvent: L,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    z = (e) => {
      e.create('route', { host: '', path: '', query: {} })
    },
    K = (e) => {
      const t = e.closest('[href]')
      return (t && t.getAttribute('href')) || ''
    },
    _ = ({ payload: e, publish: t, window: s }) => {
      s.history.pushState(null, '', e), t(E, null)
    },
    R = (e) => {
      const t = e.payload
      if (!t || !t.target) return
      t.preventDefault()
      const s = K(t.target)
      _({ ...e, payload: s })
    },
    U = (e) =>
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
        { host: n, pathname: i, search: a } = r.location,
        c = i,
        u = U(a),
        h = { host: n, path: c, query: u }
      t.store('route').update(h), s(L, h)
    },
    C = (e) => {
      const { subscribe: t } = e
      t(V, R),
        t(F, (s) => {
          _(s)
        })
    },
    I = (e) => {
      const { publish: t, subscribe: s, state: r, window: n } = e
      z(r), n.addEventListener('popstate', () => t(E, null)), s(E, q)
    },
    J = (e) => {
      setTimeout(() => e.publish(E, null), 0)
    },
    G = (e) => {
      I(e), C(e), J(e)
    },
    Ct = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          publishLocation: J,
          startNavigation: G,
          subscribeToHistoryChange: I,
          subscribeToNavigation: C,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  class H {
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
      const r = Ut(t, s, this.renderKit)
      return this.roots.push(r), r
    }
    startNavigation() {
      G(this)
    }
  }
  const It = Object.freeze(
    Object.defineProperty({ __proto__: null, App: H }, Symbol.toStringTag, {
      value: 'Module',
    }),
  )
  class Q {
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
  class W {
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
  class Jt {
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
  const Gt = (e) => {
      const { offset: t, period: s } = e,
        r = ({ callCount: n }) => (t && n == 0 ? t : s)
      return {
        event: e.event,
        publish: e.publish,
        payload: e.payload,
        timer: r,
      }
    },
    Ht = (e) => {
      let t
      'timer' in e ? (t = e) : (t = Gt(e))
      const s = new Jt(t)
      return s.start(), s.stop
    }
  class X {
    constructor() {
      ;(this.exactSubscriptions = new Q()),
        (this.fuzzySubscriptions = new W()),
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
  const Y = () => {
      const e = new X()
      return {
        bus: e,
        publish: (r, n) => e.publish(r, n),
        subscribe: (r, n) => e.subscribe(r, n),
      }
    },
    Qt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          ExactSubscriptions: Q,
          FuzzySubscriptions: W,
          JaxsBus: X,
          createBus: Y,
          publishPeriodically: Ht,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Wt = (e, t) => e === t,
    Xt = (e, t) => Object.keys(e).length === Object.keys(t).length,
    Z = (e, t) =>
      !(A(e) && A(t)) || !Xt(e, t)
        ? !1
        : Object.keys(e).every((s) => {
            const r = e[s],
              n = t[s]
            return w(r, n)
          }),
    tt = (e, t) =>
      !(y(e) && y(t)) || e.length !== t.length
        ? !1
        : e.every((s, r) => {
            const n = t[r]
            return w(s, n)
          }),
    w = (e, t) => (A(e) ? Z(e, t) : y(e) ? tt(e, t) : Wt(e, t)),
    Yt = { objects: Z, arrays: tt, equal: w }
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
  const Zt = { object: g, list: f, boolean: v },
    S = 'state'
  class et {
    constructor(t) {
      ;(this.publisher = t),
        (this.stores = {}),
        (this.eventNamePrefix = S),
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
  const st = (e) => new et(e),
    te = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          State: et,
          Store: x,
          createState: st,
          eventName: S,
          updaters: Zt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  class ee {
    constructor(t) {
      this.setupDomEnvironment(t)
    }
    setup() {
      return (
        this.setupBus(),
        this.setupState(),
        this.addBusOptions(),
        this.setRenderKit(),
        new H({
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
      const { publish: t, subscribe: s, bus: r } = Y()
      ;(this.publish = t), (this.subscribe = s), (this.bus = r)
    }
    setupState() {
      this.state = st(this.publish)
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
  const se = (e = {}) => {
    const s = new ee(e).setup()
    return s.startNavigation(), s
  }
  var o = ((e) => (
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
  const re = Object.freeze(
      Object.defineProperty(
        { __proto__: null, ChangeInstructionTypes: o },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    ne = (e, t) => ({ source: e, target: t, type: o.changeText, data: {} }),
    ie = (e, t) => ({ source: e, target: t, type: o.replaceNode, data: {} }),
    oe = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: o.removeAttribute,
    }),
    ue = (e, t, s) => ({ source: e, target: t, data: s, type: o.addAttribute }),
    ae = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: o.updateAttribute,
    }),
    ce = (e, t, s) => ({ source: e, target: t, data: s, type: o.removeEvent }),
    le = (e, t, s) => ({ source: e, target: t, data: s, type: o.addEvent }),
    he = (e, t, s) => ({ source: e, target: t, data: s, type: o.updateEvent }),
    rt = (e) => ({ source: e, target: e, type: o.removeNode, data: {} }),
    T = (e, t) => ({ target: e, source: e, type: o.insertNode, data: t }),
    de = (e, t, s) => ({ source: e, target: t, type: o.changeValue, data: s }),
    pe = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
    nt = { index: -1 }
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
        ? nt
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
  const it = (e) => {
      const t = new me()
      return t.populate(e), t
    },
    ot = (e, t, s = !1) => {
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
            const m = a.item(h)
            if (m && l.name == m.name) {
              d = m
              break
            }
          }
          d
            ? l.value !== d.value &&
              r.push(ae(e, t, { name: l.name, value: d.value, isSvg: s }))
            : r.push(oe(e, t, { name: l.name, isSvg: s }))
        }
      }
      for (u = 0; u < c; u++) {
        d = null
        const l = a.item(u)
        if (l) {
          for (h = 0; h < i; h++) {
            const m = n.item(h)
            if (m && m.name == l.name) {
              d = m
              break
            }
          }
          d || r.push(ue(e, t, { name: l.name, value: l.value, isSvg: s }))
        }
      }
      return r
    },
    fe = (e, t) => {
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
                he(e, t, {
                  name: c,
                  targetValue: h.listener,
                  sourceValue: u.listener,
                }),
              )
            : s.push(ce(e, t, { name: u.domEvent, value: u.listener }))
        }),
        a.forEach((c) => {
          const u = r[c],
            h = n[c]
          u || s.push(le(e, t, { name: h.domEvent, value: h.listener }))
        }),
        s
      )
    },
    be = (e) => e.tagName !== 'INPUT',
    ve = (e, t) => e.value === t.value,
    ge = (e, t) => {
      if (be(e) || ve(e, t)) return []
      const s = e,
        r = t
      return [de(s, r, { name: 'value', value: r.value })]
    },
    ye = (e, t) => {
      const s = ot(e, t),
        r = fe(e, t),
        n = ge(e, t)
      return s.concat(r).concat(n)
    },
    Ee = (e, t) => ot(e, t, !0),
    Ae = (e, t) => (e.textContent !== t.textContent ? [ne(e, t)] : []),
    we = (e, t, s) => {
      let r = []
      if (e.nodeType === 1 && jt(e)) {
        const n = e,
          i = t,
          a = Ee(n, i),
          c = s(n.childNodes, i.childNodes, n)
        r = a.concat(c)
      } else if (e.nodeType === 1) {
        const n = e,
          i = t,
          a = ye(n, i),
          c = s(n.childNodes, i.childNodes, n)
        r = a.concat(c)
      } else e.nodeType === 3 && (r = Ae(e, t))
      return r
    },
    ut = (e, t, s) => {
      const r = [],
        n = Ne(e, t),
        i = it(e),
        a = it(t),
        c = []
      let u = 0
      for (; u < n; u++) {
        const d = e[u],
          l = t[u]
        if (l && a.check(l)) {
          const m = i.pullMatch(l)
          a.clear(l),
            m.element
              ? (m.index !== u && r.push(T(m.element, { parent: s, index: u })),
                c.push({ source: m.element, target: l }))
              : d
                ? a.check(d)
                  ? r.push(T(l, { parent: s, index: u }))
                  : (i.clear(d), r.push(ie(d, l)))
                : r.push(T(l, { parent: s, index: u }))
        } else d && i.pullMatch(d).element && r.push(rt(d))
      }
      i.remaining().forEach(({ element: d }) => {
        r.push(rt(d))
      })
      const h = c.reduce(
        (d, { source: l, target: m }) => d.concat(we(l, m, ut)),
        [],
      )
      return r.concat(h).sort(pe)
    },
    Ne = (e, t) => {
      const s = e.length,
        r = t.length
      return s > r ? s : r
    },
    _e = (e, t, s) => {
      const r = ut(e, t, s)
      return (
        r.forEach((n) => {
          xe(n)
        }),
        r
      )
    },
    xe = (e) => {
      ;(Fe[e.type] || Se)(e)
    },
    Se = (e) => {},
    Te = (e) => {
      const { source: t, target: s } = e
      t.nodeValue = s.textContent
    },
    je = (e) => {
      const { source: t } = e
      t.remove()
    },
    Oe = (e) => {
      const { target: t, data: s } = e,
        { parent: r, index: n } = s,
        i = r.childNodes[n]
      i ? i && i !== t && r.insertBefore(t, i) : r.appendChild(t)
    },
    Me = (e) => {
      const { source: t, target: s } = e
      t.replaceWith(s)
    },
    ke = (e) => {
      const { source: t, data: s } = e,
        { name: r, isSvg: n } = s
      n ? t.removeAttributeNS(null, r) : t.removeAttribute(r)
    },
    at = (e) => {
      const { source: t, data: s } = e,
        { name: r, value: n, isSvg: i } = s
      i ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
    },
    $e = (e) => {
      at(e)
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
    Be = (e) => {
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
    Fe = {
      [o.changeText]: Te,
      [o.removeNode]: je,
      [o.insertNode]: Oe,
      [o.replaceNode]: Me,
      [o.removeAttribute]: ke,
      [o.addAttribute]: at,
      [o.updateAttribute]: $e,
      [o.removeEvent]: De,
      [o.addEvent]: Pe,
      [o.updateEvent]: Be,
      [o.changeValue]: Ve,
    },
    Le = (e, t, s) => {
      const r = [...t]
      return (
        e.forEach((n) => {
          ze(n, r, s)
        }),
        r
      )
    },
    ze = (e, t, s) => {
      const r = qe[e.type]
      r && r(e, t, s)
    },
    Ke = (e, t) => {
      const { source: s } = e,
        r = t.indexOf(s)
      r >= 0 && t.splice(r, 1)
    },
    Re = (e, t, s) => {
      const { target: r } = e,
        n = e.data,
        { index: i, parent: a } = n
      s === a && t.splice(i, 0, r)
    },
    Ue = (e, t) => {
      const { target: s, source: r } = e,
        n = t.indexOf(r)
      n >= 0 && (t[n] = s)
    },
    qe = { [o.removeNode]: Ke, [o.insertNode]: Re, [o.replaceNode]: Ue }
  class Ce {
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
      this.dom = Le(s, this.dom, this.parentElement)
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
  const Ie = (e) => e,
    ct = ({ Template: e, viewModel: t, subscriptions: s }) => (
      (s = s || []),
      (t = t || Ie),
      (r) =>
        new Ce({ Template: e, viewModel: t, subscriptions: s, attributes: r })
    ),
    Je =
      (e) =>
      ({ path: t }) =>
        t === e,
    Ge = () => !0,
    lt =
      (e) =>
      ({ route: t }) => {
        const s = e.find((r) => r.match(t))
        return s && s.Partial
      },
    He = Object.freeze(
      Object.defineProperty(
        { __proto__: null, buildRouter: lt, catchAll: Ge, exactPathMatch: Je },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Qe = () => ({ render: (e, t) => [] }),
    We = (e) => {
      const t = lt(e)
      return ct({
        Template: ({ route: r }) => (t({ route: r }) || Qe)(),
        subscriptions: ['route'],
      })
    },
    Xe = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          createRouteState: z,
          events: qt,
          extractQueryParams: U,
          findHref: K,
          navigate: _,
          onLinkClick: R,
          onLocationChange: q,
          start: Ct,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Ye = {
      RecordStore: vt,
      BooleanStore: pt,
      ListStore: ft,
      ArrayModifiers: ht,
    }
  ;(p.Equality = Yt),
    (p.Is = Et),
    (p.JaxsTypes = re),
    (p.Update = Ye),
    (p.appBuilding = It),
    (p.bind = ct),
    (p.createApp = se),
    (p.jsx = B),
    (p.messageBus = Qt),
    (p.navigation = Xe),
    (p.routedView = We),
    (p.routing = He),
    (p.state = te),
    Object.defineProperty(p, Symbol.toStringTag, { value: 'Module' })
})
