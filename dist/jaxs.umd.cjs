;(function (p, f) {
  typeof exports == 'object' && typeof module < 'u'
    ? f(exports)
    : typeof define == 'function' && define.amd
      ? define(['exports'], f)
      : ((p = typeof globalThis < 'u' ? globalThis : p || self),
        f((p.jaxs = {})))
})(this, function (p) {
  'use strict'
  const f = (e) => typeof e == 'string',
    v = (e) => Array.isArray(e),
    g = (e) => e !== null && !v(e) && typeof e == 'object',
    rt = (e, t) => t.createElement(e),
    it = (e, t) => {
      for (const s in t) {
        if (s === '__self') continue
        const n = t[s].toString()
        if (s === 'value') {
          const r = e
          r.value !== n && (r.value = n)
        } else
          f(n) && n.trim() === '' ? e.removeAttribute(s) : e.setAttribute(s, n)
      }
    },
    ot = (e, t, s) => {
      const n = {}
      for (const r in t) {
        const i = t[r],
          a = (c) => s(i, c)
        e.addEventListener(r, a),
          (n[r] = { domEvent: r, busEvent: i, listener: a })
      }
      e.eventMaps = n
    },
    ut = (e, t, s, n) => {
      const r = rt(e, n.document)
      return it(r, t), ot(r, s, n.publish), r
    },
    y = 'http://www.w3.org/2000/svg',
    at = {
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
    ct = (e, t) => !!(at[e] || (e === 'a' && t === y)),
    lt = (e, t, s) => {
      const n = s.createElementNS(y, e)
      for (const r in t)
        r === '__self' ||
          r === 'xmlns' ||
          n.setAttributeNS(null, r, t[r].toString())
      return n
    },
    ht = (e) => e.namespaceURI === y,
    dt = (e, t) => t.createTextNode(e)
  class pt {
    constructor(t) {
      this.value = t.toString()
    }
    render(t) {
      const s = dt(this.value, t.document)
      return (s.__jsx = 'TextNode'), [s]
    }
  }
  const mt = (e) => typeof e == 'string' || typeof e == 'number',
    ft = (e) => new pt(e),
    bt = (e) => (mt(e) ? ft(e) : e),
    S = (e) => vt(e).map(bt).flat(),
    vt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
    T = (e, t = {}) => S(e || t.children || []),
    gt = (e, t = '') => {
      const s = {},
        n = {}
      for (const r in e) {
        const i = e[r]
        if (r.match(/^on.+/i)) {
          const a = r.slice(2).toLowerCase()
          n[a] = i ? i.toString() : ''
        } else {
          if (i === !1) continue
          r === '__source' ? (s.__source = e.__source) : (s[r] = yt(r, i, t))
        }
      }
      return { attributes: s, events: n }
    },
    yt = (e, t, s = '') => (t == null ? s : t.toString()),
    Et = (e, t) => {
      const s = e || {},
        n = T(t, s)
      return (s.children = s.children || n), s
    },
    j = (e, t, s, n = []) => e.reduce(At(t, s), n).flat(),
    At = (e, t) => (s, n) =>
      n
        ? Array.isArray(n)
          ? j(n, e, t, s)
          : (n.render(e, t).forEach((r) => s.push(r)), s)
        : s
  class O {
    constructor(t) {
      this.collection = S(t)
    }
    render(t, s) {
      this.parentElement = s
      const n = this.generateDom(t)
      return this.attachToParent(n), n
    }
    generateDom(t) {
      return j(this.collection, t, this.parentElement)
    }
    attachToParent(t) {
      if (this.parentElement === void 0) return
      const s = this.parentElement
      t.forEach((n) => s.appendChild(n))
    }
  }
  class xt {
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
          columnNumber: n,
        } = this.attributes.__source
        return `${t}:${s}:${n}`
      }
    }
    createKeyFromAttributes() {
      const t = this.attributes.id ? `#${this.attributes.id}` : '',
        s = this.attributes.type ? `[type=${this.attributes.type}]` : '',
        n = this.attributes.name ? `[name=${this.attributes.name}]` : ''
      return `${this.type}${t}${s}${n}`
    }
  }
  class wt {
    constructor(t, s, n = []) {
      this.type = t
      const { events: r, attributes: i } = gt(s)
      ;(this.events = r),
        (this.attributes = i),
        (this.isSvg = ct(this.type, this.attributes.xmlns)),
        (this.children = new O(n))
    }
    render(t) {
      const s = this.generateDom(t)
      return s ? (this.children.render(t, s), [s]) : []
    }
    generateDom(t) {
      return this.isSvg ? this.generateSvgDom(t) : this.generateHtmlDom(t)
    }
    generateHtmlDom(t) {
      const s = ut(this.type, this.attributes, this.events, t)
      return (s.__jsx = this.jsxKey()), s
    }
    generateSvgDom(t) {
      const s = lt(this.type, this.attributes, t.document)
      return (s.__jsx = this.jsxKey()), s
    }
    jsxKey() {
      return new xt(this.type, this.attributes).generate()
    }
  }
  const M = (e, t, ...s) =>
    typeof e == 'string' ? new wt(e, t, s) : e(Et(t, s))
  M.fragment = (e, t) => {
    const s = T(t, e)
    return new O(s)
  }
  class Nt {
    constructor(t, s, n) {
      ;(this.template = t),
        (this.selector = s),
        (this.renderKit = n),
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
  const _t = (e, t, s) => {
      const n = new Nt(e, t, s)
      return n.renderAndAttach(s), n
    },
    k = 'go-to-href',
    $ = 'go-to',
    b = 'navigation:location-change',
    D = 'navigation:route-change',
    St = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          linkNavigationEvent: k,
          locationChangeEvent: b,
          navigationEvent: $,
          routeChangeEvent: D,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    P = (e) => {
      e.create('route', { host: '', path: '', query: {} })
    },
    V = (e) => {
      const t = e.closest('[href]')
      return (t && t.getAttribute('href')) || ''
    },
    E = ({ payload: e, publish: t, window: s }) => {
      s.history.pushState(null, '', e), t(b, null)
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
          const n = s.split('=')
          return (t[n[0]] = n[1]), t
        }, {}),
    z = (e) => {
      const { state: t, publish: s, window: n } = e,
        { host: r, pathname: i, search: a } = n.location,
        c = i,
        u = L(a),
        h = { host: r, path: c, query: u }
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
      const { publish: t, subscribe: s, state: n, window: r } = e
      P(n), r.addEventListener('popstate', () => t(b, null)), s(b, z)
    },
    R = (e) => {
      setTimeout(() => e.publish(b, null), 0)
    },
    U = (e) => {
      K(e), B(e), R(e)
    },
    Tt = Object.freeze(
      Object.defineProperty(
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
      publish: n,
      subscribe: r,
      bus: i,
      state: a,
      renderKit: c,
    }) {
      ;(this.window = t),
        (this.document = s),
        (this.publish = n),
        (this.subscribe = r),
        (this.bus = i),
        (this.state = a),
        (this.renderKit = c),
        (this.roots = [])
    }
    render(t, s) {
      const n = _t(t, s, this.renderKit)
      return this.roots.push(n), n
    }
    startNavigation() {
      U(this)
    }
  }
  const jt = Object.freeze(
    Object.defineProperty({ __proto__: null, App: C }, Symbol.toStringTag, {
      value: 'Module',
    }),
  )
  class I {
    constructor() {
      this.lookup = {}
    }
    add(t, s, n) {
      this.ensureArrayFor(t)
      const r = { listener: s, index: n, matcher: t }
      return this.lookup[t].push(r), () => this.remove(r)
    }
    remove(t) {
      this.lookup[t.matcher] &&
        (this.lookup[t.matcher] = this.lookup[t.matcher].reduce(
          (s, n) => (n !== t && s.push(n), s),
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
    add(t, s, n) {
      const r = { listener: s, index: n, matcher: t }
      return this.lookup.push(r), () => this.remove(r)
    }
    remove(t) {
      this.lookup = this.lookup.reduce((s, n) => (n !== t && s.push(n), s), [])
    }
    matches(t) {
      return this.lookup.filter((s) => s.matcher.test(t))
    }
  }
  class Ot {
    constructor({ publish: t, event: s, payload: n, timer: r }) {
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
        (this.payload = n || null),
        (this.stop = this.stopTimeout.bind(this)),
        (this.stopped = !1),
        (this.timer = r),
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
  const Mt = (e) => {
      const { offset: t, period: s } = e,
        n = ({ callCount: r }) => (t && r == 0 ? t : s)
      return {
        event: e.event,
        publish: e.publish,
        payload: e.payload,
        timer: n,
      }
    },
    kt = (e) => {
      let t
      'timer' in e ? (t = e) : (t = Mt(e))
      const s = new Ot(t)
      return s.start(), s.stop
    }
  class J {
    constructor() {
      ;(this.exactSubscriptions = new I()),
        (this.fuzzySubscriptions = new q()),
        (this.currentIndex = 0)
    }
    subscribe(t, s) {
      let n
      return (
        typeof t == 'string'
          ? (n = this.exactSubscriptions.add(t, s, this.currentIndex))
          : (n = this.fuzzySubscriptions.add(t, s, this.currentIndex)),
        (this.currentIndex += 1),
        n
      )
    }
    publish(t, s) {
      ;[
        ...this.exactSubscriptions.matches(t),
        ...this.fuzzySubscriptions.matches(t),
      ]
        .sort((r, i) => r.index - i.index)
        .forEach((r) => {
          r.listener(this.listenerOptions(t, s))
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
        publish: (n, r) => e.publish(n, r),
        subscribe: (n, r) => e.subscribe(n, r),
      }
    },
    $t = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          ExactSubscriptions: I,
          FuzzySubscriptions: q,
          JaxsBus: J,
          createBus: G,
          publishPeriodically: kt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Dt = (e, t) => e === t,
    Pt = (e, t) => Object.keys(e).length === Object.keys(t).length,
    Vt = (e, t) =>
      !(g(e) && g(t)) || !Pt(e, t)
        ? !1
        : Object.keys(e).every((s) => {
            const n = e[s],
              r = t[s]
            return A(n, r)
          }),
    Ft = (e, t) =>
      !(v(e) && v(t)) || e.length !== t.length
        ? !1
        : e.every((s, n) => {
            const r = t[n]
            return A(s, r)
          }),
    A = (e, t) => (g(e) ? Vt(e, t) : v(e) ? Ft(e, t) : Dt(e, t))
  class x {
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
      A(this._value, t) || ((this._value = t), this.parent.notify(this.name))
    }
    getUpdatedValue(t) {
      return t(structuredClone(this.value))
    }
  }
  class w {
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
  class Lt extends w {
    updateAttribute(t, s) {
      const n = { ...this.value }
      ;(n[t] = s), this.update(n)
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
        n = this.store.initialValue[t]
      ;(s[t] = n), this.update(s)
    }
  }
  const zt = (e) => new Lt(e)
  class Bt extends w {
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
      const n = [...this.value]
      n.splice(t, 0, s), this.update(n)
    }
    remove(t) {
      const s = this.value.reduce((n, r) => (r !== t && n.push(r), n), [])
      this.update(s)
    }
    removeBy(t) {
      const s = this.value.reduce((n, r) => (t(r) || n.push(r), n), [])
      this.update(s)
    }
  }
  const Kt = (e) => new Bt(e)
  class Rt extends w {
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
  const Ut = { object: zt, list: Kt, boolean: (e) => new Rt(e) },
    N = 'state'
  class H {
    constructor(t) {
      ;(this.publisher = t),
        (this.stores = {}),
        (this.eventNamePrefix = N),
        (this.notifications = new Set()),
        (this.inTransaction = !1)
    }
    create(t, s) {
      const n = new x({ name: t, parent: this, value: s })
      return (this.stores[t] = n), n
    }
    store(t) {
      return this.stores[t] || new x({ name: t, parent: this, value: void 0 })
    }
    get(t) {
      return this.store(t).value
    }
    getAll(t) {
      return t.reduce((s, n) => ((s[n] = this.get(n)), s), {})
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
  const Q = (e) => new H(e),
    Ct = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          State: H,
          Store: x,
          createState: Q,
          eventName: N,
          updaters: Ut,
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
          ? ((this.window = t.document.defaultView),
            (this.document = t.document))
          : ((this.window = window), (this.document = document))
    }
    setupBus() {
      const { publish: t, subscribe: s, bus: n } = G()
      ;(this.publish = t), (this.subscribe = s), (this.bus = n)
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
  const qt = (e = {}) => {
    const s = new It(e).setup()
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
  const Jt = Object.freeze(
      Object.defineProperty(
        { __proto__: null, ChangeInstructionTypes: o },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Gt = (e, t) => ({ source: e, target: t, type: o.changeText, data: {} }),
    Ht = (e, t) => ({ source: e, target: t, type: o.replaceNode, data: {} }),
    Qt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: o.removeAttribute,
    }),
    Wt = (e, t, s) => ({ source: e, target: t, data: s, type: o.addAttribute }),
    Xt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: o.updateAttribute,
    }),
    Yt = (e, t, s) => ({ source: e, target: t, data: s, type: o.removeEvent }),
    Zt = (e, t, s) => ({ source: e, target: t, data: s, type: o.addEvent }),
    te = (e, t, s) => ({ source: e, target: t, data: s, type: o.updateEvent }),
    W = (e) => ({ source: e, target: e, type: o.removeNode, data: {} }),
    _ = (e, t) => ({ target: e, source: e, type: o.insertNode, data: t }),
    ee = (e, t, s) => ({ source: e, target: t, type: o.changeValue, data: s }),
    se = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
    X = { index: -1 }
  class ne {
    constructor() {
      this.map = {}
    }
    populate(t) {
      t.forEach((s, n) => {
        const r = s.__jsx
        r &&
          ((this.map[r] = this.map[r] || []),
          this.map[r].push({ element: s, index: n }))
      })
    }
    pullMatch(t) {
      const s = t && t.__jsx
      return !s || !(this.map[s] && this.map[s].length)
        ? X
        : this.map[s].shift()
    }
    clear(t) {
      const s = t && t.__jsx
      if (!(s && this.map[s] && this.map[s].length)) return
      const n = this.map[s]
      this.map[s] = n.reduce((r, i) => (i.element !== t && r.push(i), r), [])
    }
    check(t) {
      const s = t && t.__jsx
      return s && this.map[s] ? this.map[s].length > 0 : !1
    }
    remaining() {
      return Object.values(this.map).flat()
    }
  }
  const Y = (e) => {
      const t = new ne()
      return t.populate(e), t
    },
    Z = (e, t, s = !1) => {
      const n = [],
        r = e.attributes,
        i = r.length,
        a = t.attributes,
        c = a.length
      let u, h, d
      for (u = 0; u < i; u++) {
        d = null
        const l = r.item(u)
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
              n.push(Xt(e, t, { name: l.name, value: d.value, isSvg: s }))
            : n.push(Qt(e, t, { name: l.name, isSvg: s }))
        }
      }
      for (u = 0; u < c; u++) {
        d = null
        const l = a.item(u)
        if (l) {
          for (h = 0; h < i; h++) {
            const m = r.item(h)
            if (m && m.name == l.name) {
              d = m
              break
            }
          }
          d || n.push(Wt(e, t, { name: l.name, value: l.value, isSvg: s }))
        }
      }
      return n
    },
    re = (e, t) => {
      const s = [],
        n = e.eventMaps,
        r = t.eventMaps,
        i = Object.keys(n),
        a = Object.keys(r)
      return (
        i.forEach((c) => {
          const u = n[c],
            h = r[c]
          h
            ? h.busEvent !== u.busEvent &&
              s.push(
                te(e, t, {
                  name: c,
                  targetValue: h.listener,
                  sourceValue: u.listener,
                }),
              )
            : s.push(Yt(e, t, { name: u.domEvent, value: u.listener }))
        }),
        a.forEach((c) => {
          const u = n[c],
            h = r[c]
          u || s.push(Zt(e, t, { name: h.domEvent, value: h.listener }))
        }),
        s
      )
    },
    ie = (e) => e.tagName !== 'INPUT',
    oe = (e, t) => e.value === t.value,
    ue = (e, t) => {
      if (ie(e) || oe(e, t)) return []
      const s = e,
        n = t
      return [ee(s, n, { name: 'value', value: n.value })]
    },
    ae = (e, t) => {
      const s = Z(e, t),
        n = re(e, t),
        r = ue(e, t)
      return s.concat(n).concat(r)
    },
    ce = (e, t) => Z(e, t, !0),
    le = (e, t) => (e.textContent !== t.textContent ? [Gt(e, t)] : []),
    he = (e, t, s) => {
      let n = []
      if (e.nodeType === 1 && ht(e)) {
        const r = e,
          i = t,
          a = ce(r, i),
          c = s(r.childNodes, i.childNodes, r)
        n = a.concat(c)
      } else if (e.nodeType === 1) {
        const r = e,
          i = t,
          a = ae(r, i),
          c = s(r.childNodes, i.childNodes, r)
        n = a.concat(c)
      } else e.nodeType === 3 && (n = le(e, t))
      return n
    },
    tt = (e, t, s) => {
      const n = [],
        r = de(e, t),
        i = Y(e),
        a = Y(t),
        c = []
      let u = 0
      for (; u < r; u++) {
        const d = e[u],
          l = t[u]
        if (l && a.check(l)) {
          const m = i.pullMatch(l)
          a.clear(l),
            m.element
              ? (m.index !== u && n.push(_(m.element, { parent: s, index: u })),
                c.push({ source: m.element, target: l }))
              : d
                ? a.check(d)
                  ? n.push(_(l, { parent: s, index: u }))
                  : (i.clear(d), n.push(Ht(d, l)))
                : n.push(_(l, { parent: s, index: u }))
        } else d && i.pullMatch(d).element && n.push(W(d))
      }
      i.remaining().forEach(({ element: d }) => {
        n.push(W(d))
      })
      const h = c.reduce(
        (d, { source: l, target: m }) => d.concat(he(l, m, tt)),
        [],
      )
      return n.concat(h).sort(se)
    },
    de = (e, t) => {
      const s = e.length,
        n = t.length
      return s > n ? s : n
    },
    pe = (e, t, s) => {
      const n = tt(e, t, s)
      return (
        n.forEach((r) => {
          me(r)
        }),
        n
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
    ge = (e) => {
      const { target: t, data: s } = e,
        { parent: n, index: r } = s,
        i = n.childNodes[r]
      i ? i && i !== t && n.insertBefore(t, i) : n.appendChild(t)
    },
    ye = (e) => {
      const { source: t, target: s } = e
      t.replaceWith(s)
    },
    Ee = (e) => {
      const { source: t, data: s } = e,
        { name: n, isSvg: r } = s
      r ? t.removeAttributeNS(null, n) : t.removeAttribute(n)
    },
    et = (e) => {
      const { source: t, data: s } = e,
        { name: n, value: r, isSvg: i } = s
      i ? t.setAttributeNS(null, n, r) : t.setAttribute(n, r)
    },
    Ae = (e) => {
      et(e)
    },
    xe = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, value: r } = t
      s.removeEventListener(n, r)
    },
    we = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, value: r } = t
      s.addEventListener(n, r)
    },
    Ne = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, sourceValue: r, targetValue: i } = t
      s.removeEventListener(n, r), s.addEventListener(n, i)
    },
    _e = (e) => {
      const t = e.data,
        s = e.source,
        { value: n } = t
      s.value = n
    },
    Se = {
      [o.changeText]: be,
      [o.removeNode]: ve,
      [o.insertNode]: ge,
      [o.replaceNode]: ye,
      [o.removeAttribute]: Ee,
      [o.addAttribute]: et,
      [o.updateAttribute]: Ae,
      [o.removeEvent]: xe,
      [o.addEvent]: we,
      [o.updateEvent]: Ne,
      [o.changeValue]: _e,
    },
    Te = (e, t, s) => {
      const n = [...t]
      return (
        e.forEach((r) => {
          je(r, n, s)
        }),
        n
      )
    },
    je = (e, t, s) => {
      const n = $e[e.type]
      n && n(e, t, s)
    },
    Oe = (e, t) => {
      const { source: s } = e,
        n = t.indexOf(s)
      n >= 0 && t.splice(n, 1)
    },
    Me = (e, t, s) => {
      const { target: n } = e,
        r = e.data,
        { index: i, parent: a } = r
      s === a && t.splice(i, 0, n)
    },
    ke = (e, t) => {
      const { target: s, source: n } = e,
        r = t.indexOf(n)
      r >= 0 && (t[r] = s)
    },
    $e = { [o.removeNode]: Oe, [o.insertNode]: Me, [o.replaceNode]: ke }
  class De {
    constructor({
      Template: t,
      subscriptions: s,
      attributes: n,
      viewModel: r,
    }) {
      ;(this.Template = t),
        (this.viewModel = r),
        (this.attributes = n),
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
        n = this.Template(s)
      return n ? n.render(t) : []
    }
    rerender() {
      if (!this.parentElement && this.dom[0]) {
        const n = this.dom[0].parentElement
        this.parentElement = n
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
      return `${N}:${t}`
    }
  }
  const Pe = (e) => e,
    st = ({ Template: e, viewModel: t, subscriptions: s }) => (
      (s = s || []),
      (t = t || Pe),
      (n) =>
        new De({ Template: e, viewModel: t, subscriptions: s, attributes: n })
    ),
    Ve =
      (e) =>
      ({ path: t }) =>
        t === e,
    Fe = () => !0,
    nt =
      (e) =>
      ({ route: t }) => {
        const s = e.find((n) => n.match(t))
        return s && s.Partial
      },
    Le = Object.freeze(
      Object.defineProperty(
        { __proto__: null, buildRouter: nt, catchAll: Fe, exactPathMatch: Ve },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    ze = () => ({ render: (e, t) => [] }),
    Be = (e) => {
      const t = nt(e)
      return st({
        Template: ({ route: n }) => (t({ route: n }) || ze)(),
        subscriptions: ['route'],
      })
    },
    Ke = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          createRouteState: P,
          events: St,
          extractQueryParams: L,
          findHref: V,
          navigate: E,
          onLinkClick: F,
          onLocationChange: z,
          start: Tt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  ;(p.JaxsTypes = Jt),
    (p.appBuilding = jt),
    (p.bind = st),
    (p.createApp = qt),
    (p.jsx = M),
    (p.messageBus = $t),
    (p.navigation = Ke),
    (p.routedView = Be),
    (p.routing = Le),
    (p.state = Ct),
    Object.defineProperty(p, Symbol.toStringTag, { value: 'Module' })
})
