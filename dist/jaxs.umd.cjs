;(function (m, f) {
  typeof exports == 'object' && typeof module < 'u'
    ? f(exports)
    : typeof define == 'function' && define.amd
      ? define(['exports'], f)
      : ((m = typeof globalThis < 'u' ? globalThis : m || self),
        f((m.jaxs = {})))
})(this, function (m) {
  'use strict'
  const f = (e, t) => t.createElement(e),
    nt = (e, t) => {
      for (const s in t) {
        if (s === '__self') continue
        const n = t[s].toString()
        s === 'value' ? (e.value = n) : e.setAttribute(s, n)
      }
    },
    rt = (e, t, s) => {
      const n = {}
      for (const r in t) {
        const o = t[r],
          c = (h) => s(o, h)
        e.addEventListener(r, c),
          (n[r] = { domEvent: r, busEvent: o, listener: c })
      }
      e.eventMaps = n
    },
    ot = (e, t, s, n) => {
      const r = f(e, n.document)
      return nt(r, t), rt(r, s, n.publish), r
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
    ut = (e, t) => !!(it[e] || (e === 'a' && t === y)),
    at = (e, t, s) => {
      const n = s.createElementNS(y, e)
      for (const r in t)
        r === '__self' ||
          r === 'xmlns' ||
          n.setAttributeNS(null, r, t[r].toString())
      return n
    },
    ct = (e) => e.namespaceURI === y,
    ht = (e, t) => t.createTextNode(e)
  class lt {
    constructor(t) {
      this.value = t.toString()
    }
    render(t) {
      const s = ht(this.value, t.document)
      return (s.__jsx = 'TextNode'), [s]
    }
  }
  const dt = (e) => typeof e == 'string' || typeof e == 'number',
    pt = (e) => new lt(e),
    mt = (e) => (dt(e) ? pt(e) : e),
    ft = (e) => bt(e).map(mt).flat(),
    bt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
    N = (e, t = {}) => e || t.children || [],
    vt = (e, t = '') => {
      const s = {},
        n = {}
      for (const r in e) {
        const o = e[r]
        if (r.match(/^on.+/i)) {
          const c = r.slice(2).toLowerCase()
          n[c] = o ? o.toString() : ''
        } else {
          if (o === !1) continue
          r === '__source' ? (s.__source = e.__source) : (s[r] = gt(r, o, t))
        }
      }
      return { attributes: s, events: n }
    },
    gt = (e, t, s = '') => (t == null ? s : t.toString()),
    yt = (e, t) => {
      const s = e || {},
        n = N(t, s)
      return (s.children = s.children || n), s
    },
    j = (e, t, s = []) => e.reduce(Et(t), s).flat(),
    Et = (e) => (t, s) =>
      s
        ? Array.isArray(s)
          ? j(s, e, t)
          : (s.render(e).forEach((n) => t.push(n)), t)
        : t
  class k {
    constructor(t) {
      this.collection = ft(t)
    }
    render(t, s) {
      this.parentElement = s
      const n = this.generateDom(t)
      return this.attachToParent(n), n
    }
    generateDom(t) {
      return j(this.collection, t)
    }
    attachToParent(t) {
      if (this.parentElement === void 0) return
      const s = this.parentElement
      t.forEach((n) => s.appendChild(n))
    }
  }
  class At {
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
      const { events: r, attributes: o } = vt(s)
      ;(this.events = r),
        (this.attributes = o),
        (this.isSvg = ut(this.type, this.attributes.xmlns)),
        (this.children = new k(n))
    }
    render(t) {
      const s = this.generateDom(t)
      return s ? (this.children.render(t, s), [s]) : []
    }
    generateDom(t) {
      return this.isSvg ? this.generateSvgDom(t) : this.generateHtmlDom(t)
    }
    generateHtmlDom(t) {
      const s = ot(this.type, this.attributes, this.events, t)
      return (s.__jsx = this.jsxKey()), s
    }
    generateSvgDom(t) {
      const s = at(this.type, this.attributes, t.document)
      return (s.__jsx = this.jsxKey()), s
    }
    jsxKey() {
      return new At(this.type, this.attributes).generate()
    }
  }
  const M = (e, t, ...s) =>
    typeof e == 'string' ? new wt(e, t, s) : e(yt(t, s))
  M.fragment = (e, t) => {
    const s = N(t, e)
    return new k(s)
  }
  class xt {
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
  const St = (e, t, s) => {
      const n = new xt(e, t, s)
      return n.renderAndAttach(s), n
    },
    O = 'go-to-href',
    b = 'navigation:location-change',
    T = 'navigation:route-change',
    _t = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          linkNavigationEvent: O,
          locationChangeEvent: b,
          routeChangeEvent: T,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    F = (e) => {
      e.createRecord('route', { host: '', path: '', query: {} })
    },
    $ = (e) => {
      const t = e.closest('[href]')
      return (t && t.getAttribute('href')) || ''
    },
    D = (e, { publish: t, window: s }) => {
      s.history.pushState(null, '', e), t(b, null)
    },
    L = (e, t) => {
      if (!e || !e.target) return
      e.preventDefault()
      const s = $(e.target)
      D(s, t)
    },
    P = (e) =>
      e
        .replace(/^\?/, '')
        .split('&')
        .reduce((t, s) => {
          if (!s) return t
          const n = s.split('=')
          return (t[n[0]] = n[1]), t
        }, {}),
    B = (e, t) => {
      const { state: s, publish: n, window: r } = t,
        { host: o, pathname: c, search: h } = r.location,
        i = c,
        d = P(h),
        a = { host: o, path: i, query: d }
      s.store('route').update(a), n(T, a)
    },
    U = (e) => {
      const { subscribe: t } = e
      t(O, L)
    },
    z = (e) => {
      const { publish: t, subscribe: s, state: n, window: r } = e
      F(n), r.addEventListener('popstate', () => t(b, null)), s(b, B)
    },
    V = (e) => {
      setTimeout(() => e.publish(b, null), 0)
    },
    K = (e) => {
      z(e), U(e), V(e)
    },
    Nt = Object.freeze(
      Object.defineProperty(
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
      publish: n,
      subscribe: r,
      bus: o,
      state: c,
      renderKit: h,
    }) {
      ;(this.window = t),
        (this.document = s),
        (this.publish = n),
        (this.subscribe = r),
        (this.bus = o),
        (this.state = c),
        (this.renderKit = h),
        (this.roots = [])
    }
    render(t, s) {
      const n = St(t, s, this.renderKit)
      return this.roots.push(n), n
    }
    startNavigation() {
      K(this)
    }
  }
  const jt = Object.freeze(
    Object.defineProperty({ __proto__: null, App: R }, Symbol.toStringTag, {
      value: 'Module',
    }),
  )
  class q {
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
  class J {
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
  class H {
    constructor() {
      ;(this.exactSubscriptions = new q()),
        (this.fuzzySubscriptions = new J()),
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
        .sort((r, o) => r.index - o.index)
        .forEach((r) => {
          r.listener(s, this.listenerOptions(t))
        })
    }
    addListenerOptions(t) {
      this.options = t
    }
    listenerOptions(t) {
      return { eventName: t, ...this.options, publish: this.publish.bind(this) }
    }
  }
  const I = () => {
      const e = new H()
      return {
        bus: e,
        publish: (n, r) => e.publish(n, r),
        subscribe: (n, r) => e.subscribe(n, r),
      }
    },
    kt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          ExactSubscriptions: q,
          FuzzySubscriptions: J,
          JaxsBus: H,
          createBus: I,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    v = (e) => Array.isArray(e),
    E = (e) => e !== null && !v(e) && typeof e == 'object',
    Mt = (e, t) => e === t,
    Ot = (e, t) => Object.keys(e).length === Object.keys(t).length,
    Tt = (e, t) =>
      !(E(e) && E(t)) || !Ot(e, t)
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
    A = (e, t) => (E(e) ? Tt(e, t) : v(e) ? Ft(e, t) : Mt(e, t))
  class g {
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
      this.constructor.prototype[t] = (...n) => {
        const r = s(this.value, ...n)
        this.update(r)
      }
    }
    addUpdaterFunctions(t) {
      for (const s in t) this.addUpdaterFunction(s, t[s])
    }
  }
  class w extends g {
    addUpdaterFunction(t, s) {
      this.constructor.prototype[t] = (...n) => {
        const r = s(this.value, ...n)
        this.update(r)
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
      const n = [...this.value]
      n.splice(t, 0, s), this.update(n)
    }
  }
  class x {
    constructor(t) {
      ;(this.name = t.name),
        (this.parent = t.parent),
        (this._value = t.value),
        (this.initialState = structuredClone(t.value)),
        (this.updater = new g(this))
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
      A(this._value, t) || ((this._value = t), this.parent.notify(this.name))
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
  class G extends g {
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
      this.constructor.prototype[t] = (...n) => {
        const r = s(this.value, ...n)
        this.update(r)
      }
    }
  }
  class C extends g {
    addUpdaterFunction(t, s) {
      this.constructor.prototype[t] = (...n) => {
        const r = s(this.value, ...n)
        this.update(r)
      }
    }
    updateAttribute(t, s) {
      const n = { ...this.value }
      ;(n[t] = s), this.update(n)
    }
  }
  const S = 'state'
  class Q {
    constructor(t) {
      ;(this.publisher = t),
        (this.stores = {}),
        (this.eventNamePrefix = S),
        (this.notifications = new Set()),
        (this.inTransaction = !1)
    }
    create(t, s) {
      const n = new x({ name: t, parent: this, value: s })
      return (this.stores[t] = n), n
    }
    createBoolean(t, s) {
      const n = this.create(t, s)
      return (n.updater = new G(n)), n
    }
    createRecord(t, s) {
      const n = this.create(t, s)
      return (n.updater = new C(n)), n
    }
    createList(t, s) {
      const n = this.create(t, s)
      return (n.updater = new w(n)), n
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
  const W = (e) => new Q(e),
    $t = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          State: Q,
          Store: x,
          StoreUpdaterBoolean: G,
          StoreUpdaterList: w,
          StoreUpdaterObject: C,
          createState: W,
          eventName: S,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  class Dt {
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
          ? ((this.window = t.document.defaultView),
            (this.document = t.document))
          : ((this.window = window), (this.document = document))
    }
    setupBus() {
      const { publish: t, subscribe: s, bus: n } = I()
      ;(this.publish = t), (this.subscribe = s), (this.bus = n)
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
  const Lt = (e = {}) => {
    const s = new Dt(e).setup()
    return s.startNavigation(), s
  }
  var u = ((e) => (
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
  ))(u || {})
  const Pt = Object.freeze(
      Object.defineProperty(
        { __proto__: null, ChangeInstructionTypes: u },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Bt = (e, t) => ({ source: e, target: t, type: u.changeText, data: {} }),
    Ut = (e, t) => ({ source: e, target: t, type: u.replaceNode, data: {} }),
    zt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: u.removeAttribute,
    }),
    Vt = (e, t, s) => ({ source: e, target: t, data: s, type: u.addAttribute }),
    Kt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: u.updateAttribute,
    }),
    Rt = (e, t, s) => ({ source: e, target: t, data: s, type: u.removeEvent }),
    qt = (e, t, s) => ({ source: e, target: t, data: s, type: u.addEvent }),
    Jt = (e, t, s) => ({ source: e, target: t, data: s, type: u.updateEvent }),
    X = (e) => ({ source: e, target: e, type: u.removeNode, data: {} }),
    _ = (e, t) => ({ target: e, source: e, type: u.insertNode, data: t }),
    Ht = (e, t, s) => ({ source: e, target: t, type: u.changeValue, data: s }),
    It = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
    Y = { index: -1 }
  class Gt {
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
        ? Y
        : this.map[s].shift()
    }
    clear(t) {
      const s = t && t.__jsx
      if (!(s && this.map[s] && this.map[s].length)) return
      const n = this.map[s]
      this.map[s] = n.reduce((r, o) => (o.element !== t && r.push(o), r), [])
    }
    check(t) {
      const s = t && t.__jsx
      return s && this.map[s] ? this.map[s].length > 0 : !1
    }
    remaining() {
      return Object.values(this.map).flat()
    }
  }
  const Z = (e) => {
      const t = new Gt()
      return t.populate(e), t
    },
    tt = (e, t, s = !1) => {
      const n = [],
        r = e.attributes,
        o = r.length,
        c = t.attributes,
        h = c.length
      let i, d, a
      for (i = 0; i < o; i++) {
        a = null
        const l = r.item(i)
        if (l) {
          for (d = 0; d < h; d++) {
            const p = c.item(d)
            if (p && l.name == p.name) {
              a = p
              break
            }
          }
          a
            ? l.value !== a.value &&
              n.push(Kt(e, t, { name: l.name, value: a.value, isSvg: s }))
            : n.push(zt(e, t, { name: l.name, isSvg: s }))
        }
      }
      for (i = 0; i < h; i++) {
        a = null
        const l = c.item(i)
        if (l) {
          for (d = 0; d < o; d++) {
            const p = r.item(d)
            if (p && p.name == l.name) {
              a = p
              break
            }
          }
          a || n.push(Vt(e, t, { name: l.name, value: l.value, isSvg: s }))
        }
      }
      return n
    },
    Ct = (e, t) => {
      const s = [],
        n = e.eventMaps,
        r = t.eventMaps,
        o = Object.keys(n),
        c = Object.keys(r)
      return (
        o.forEach((h) => {
          const i = n[h],
            d = r[h]
          d
            ? d.busEvent !== i.busEvent &&
              s.push(
                Jt(e, t, {
                  name: h,
                  targetValue: d.listener,
                  sourceValue: i.listener,
                }),
              )
            : s.push(Rt(e, t, { name: i.domEvent, value: i.listener }))
        }),
        c.forEach((h) => {
          const i = n[h],
            d = r[h]
          i || s.push(qt(e, t, { name: d.domEvent, value: d.listener }))
        }),
        s
      )
    },
    Qt = (e) => e.tagName !== 'INPUT',
    Wt = (e, t) => e.value === t.value,
    Xt = (e, t) => {
      if (Qt(e) || Wt(e, t)) return []
      const s = e,
        n = t
      return [Ht(s, n, { name: 'value', value: n.value })]
    },
    Yt = (e, t) => {
      const s = tt(e, t),
        n = Ct(e, t),
        r = Xt(e, t)
      return s.concat(n).concat(r)
    },
    Zt = (e, t) => tt(e, t, !0),
    te = (e, t) => (e.textContent !== t.textContent ? [Bt(e, t)] : []),
    ee = (e, t, s) => {
      let n = []
      if (e.nodeType === 1 && ct(e)) {
        const r = e,
          o = t,
          c = Zt(r, o),
          h = s(r.childNodes, o.childNodes, r)
        n = c.concat(h)
      } else if (e.nodeType === 1) {
        const r = e,
          o = t,
          c = Yt(r, o),
          h = s(r.childNodes, o.childNodes, r)
        n = c.concat(h)
      } else e.nodeType === 3 && (n = te(e, t))
      return n
    },
    et = (e, t, s) => {
      const n = [],
        r = se(e, t),
        o = Z(e),
        c = Z(t),
        h = []
      let i = 0
      for (; i < r; i++) {
        const a = e[i],
          l = t[i]
        if (l && c.check(l)) {
          const p = o.pullMatch(l)
          c.clear(l),
            p.element
              ? (p.index !== i && n.push(_(p.element, { parent: s, index: i })),
                h.push({ source: p.element, target: l }))
              : a
                ? c.check(a)
                  ? n.push(_(l, { parent: s, index: i }))
                  : (o.clear(a), n.push(Ut(a, l)))
                : n.push(_(l, { parent: s, index: i }))
        } else a && o.pullMatch(a).element && n.push(X(a))
      }
      o.remaining().forEach(({ element: a }) => {
        n.push(X(a))
      })
      const d = h.reduce(
        (a, { source: l, target: p }) => a.concat(ee(l, p, et)),
        [],
      )
      return n.concat(d).sort(It)
    },
    se = (e, t) => {
      const s = e.length,
        n = t.length
      return s > n ? s : n
    },
    ne = (e, t, s) => {
      et(e, t, s).forEach((r) => {
        re(r)
      })
    },
    re = (e) => {
      ;(be[e.type] || oe)(e)
    },
    oe = (e) => {},
    ie = (e) => {
      const { source: t, target: s } = e
      t.nodeValue = s.textContent
    },
    ue = (e) => {
      const { source: t } = e
      t.remove()
    },
    ae = (e) => {
      const { target: t, data: s } = e,
        { parent: n, index: r } = s,
        o = n.childNodes[r]
      o ? o && o !== t && n.insertBefore(t, o) : n.appendChild(t)
    },
    ce = (e) => {
      const { source: t, target: s } = e
      t.replaceWith(s)
    },
    he = (e) => {
      const { source: t, data: s } = e,
        { name: n, isSvg: r } = s
      r ? t.removeAttributeNS(null, n) : t.removeAttribute(n)
    },
    st = (e) => {
      const { source: t, data: s } = e,
        { name: n, value: r, isSvg: o } = s
      o ? t.setAttributeNS(null, n, r) : t.setAttribute(n, r)
    },
    le = (e) => {
      st(e)
    },
    de = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, value: r } = t
      s.removeEventListener(n, r)
    },
    pe = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, value: r } = t
      s.addEventListener(n, r)
    },
    me = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, sourceValue: r, targetValue: o } = t
      s.removeEventListener(n, r), s.addEventListener(n, o)
    },
    fe = (e) => {
      const t = e.data,
        s = e.source,
        { value: n } = t
      s.value = n
    },
    be = {
      [u.changeText]: ie,
      [u.removeNode]: ue,
      [u.insertNode]: ae,
      [u.replaceNode]: ce,
      [u.removeAttribute]: he,
      [u.addAttribute]: st,
      [u.updateAttribute]: le,
      [u.removeEvent]: de,
      [u.addEvent]: pe,
      [u.updateEvent]: me,
      [u.changeValue]: fe,
    }
  class ve {
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
        const s = this.dom[0].parentElement
        this.parentElement = s
      }
      const t = this.generateDom(this.renderKit)
      ne(this.dom, t, this.parentElement),
        this.parentElement &&
          (this.dom = Array.from(this.parentElement.childNodes))
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
  const ge = (e) => e,
    ye = ({ Template: e, viewModel: t, subscriptions: s }) => (
      (s = s || []),
      (t = t || ge),
      (n) =>
        new ve({ Template: e, viewModel: t, subscriptions: s, attributes: n })
    ),
    Ee = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          createRouteState: F,
          events: _t,
          extractQueryParams: P,
          findHref: $,
          navigate: D,
          onLinkClick: L,
          onLocationChange: B,
          start: Nt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  ;(m.JaxsTypes = Pt),
    (m.appBuilding = jt),
    (m.bind = ye),
    (m.createApp = Lt),
    (m.jsx = M),
    (m.messageBus = kt),
    (m.navigation = Ee),
    (m.state = $t),
    Object.defineProperty(m, Symbol.toStringTag, { value: 'Module' })
})
