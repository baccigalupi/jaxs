;(function (p, f) {
  typeof exports == 'object' && typeof module < 'u'
    ? f(exports)
    : typeof define == 'function' && define.amd
      ? define(['exports'], f)
      : ((p = typeof globalThis < 'u' ? globalThis : p || self),
        f((p.jaxs = {})))
})(this, function (p) {
  'use strict'
  const f = (e, t) => t.createElement(e),
    ot = (e, t) => {
      for (const s in t) {
        if (s === '__self') continue
        const n = t[s].toString()
        if (s === 'value') {
          const r = e
          r.value !== n && (r.value = n)
        } else e.setAttribute(s, n)
      }
    },
    it = (e, t, s) => {
      const n = {}
      for (const r in t) {
        const o = t[r],
          a = (h) => s(o, h)
        e.addEventListener(r, a),
          (n[r] = { domEvent: r, busEvent: o, listener: a })
      }
      e.eventMaps = n
    },
    ut = (e, t, s, n) => {
      const r = f(e, n.document)
      return ot(r, t), it(r, s, n.publish), r
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
    ht = (e, t, s) => {
      const n = s.createElementNS(y, e)
      for (const r in t)
        r === '__self' ||
          r === 'xmlns' ||
          n.setAttributeNS(null, r, t[r].toString())
      return n
    },
    lt = (e) => e.namespaceURI === y,
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
    vt = (e) => gt(e).map(bt).flat(),
    gt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
    N = (e, t = {}) => e || t.children || [],
    yt = (e, t = '') => {
      const s = {},
        n = {}
      for (const r in e) {
        const o = e[r]
        if (r.match(/^on.+/i)) {
          const a = r.slice(2).toLowerCase()
          n[a] = o ? o.toString() : ''
        } else {
          if (o === !1) continue
          r === '__source' ? (s.__source = e.__source) : (s[r] = Et(r, o, t))
        }
      }
      return { attributes: s, events: n }
    },
    Et = (e, t, s = '') => (t == null ? s : t.toString()),
    xt = (e, t) => {
      const s = e || {},
        n = N(t, s)
      return (s.children = s.children || n), s
    },
    j = (e, t, s, n = []) => e.reduce(wt(t, s), n).flat(),
    wt = (e, t) => (s, n) =>
      n
        ? Array.isArray(n)
          ? j(n, e, t, s)
          : (n.render(e, t).forEach((r) => s.push(r)), s)
        : s
  class O {
    constructor(t) {
      this.collection = vt(t)
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
  class St {
    constructor(t, s, n = []) {
      this.type = t
      const { events: r, attributes: o } = yt(s)
      ;(this.events = r),
        (this.attributes = o),
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
      const s = ht(this.type, this.attributes, t.document)
      return (s.__jsx = this.jsxKey()), s
    }
    jsxKey() {
      return new At(this.type, this.attributes).generate()
    }
  }
  const M = (e, t, ...s) =>
    typeof e == 'string' ? new St(e, t, s) : e(xt(t, s))
  M.fragment = (e, t) => {
    const s = N(t, e)
    return new O(s)
  }
  class _t {
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
  const Nt = (e, t, s) => {
      const n = new _t(e, t, s)
      return n.renderAndAttach(s), n
    },
    T = 'go-to-href',
    b = 'navigation:location-change',
    k = 'navigation:route-change',
    jt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          linkNavigationEvent: T,
          locationChangeEvent: b,
          routeChangeEvent: k,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    $ = (e) => {
      e.createRecord('route', { host: '', path: '', query: {} })
    },
    F = (e) => {
      const t = e.closest('[href]')
      return (t && t.getAttribute('href')) || ''
    },
    P = (e, { publish: t, window: s }) => {
      s.history.pushState(null, '', e), t(b, null)
    },
    D = (e, t) => {
      if (!e || !e.target) return
      e.preventDefault()
      const s = F(e.target)
      P(s, t)
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
    z = (e, t) => {
      const { state: s, publish: n, window: r } = t,
        { host: o, pathname: a, search: h } = r.location,
        u = a,
        d = L(h),
        c = { host: o, path: u, query: d }
      s.store('route').update(c), n(k, c)
    },
    B = (e) => {
      const { subscribe: t } = e
      t(T, D)
    },
    U = (e) => {
      const { publish: t, subscribe: s, state: n, window: r } = e
      $(n), r.addEventListener('popstate', () => t(b, null)), s(b, z)
    },
    V = (e) => {
      setTimeout(() => e.publish(b, null), 0)
    },
    K = (e) => {
      U(e), B(e), V(e)
    },
    Ot = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          publishLocation: V,
          startNavigation: K,
          subscribeToHistoryChange: U,
          subscribeToNavigation: B,
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
      state: a,
      renderKit: h,
    }) {
      ;(this.window = t),
        (this.document = s),
        (this.publish = n),
        (this.subscribe = r),
        (this.bus = o),
        (this.state = a),
        (this.renderKit = h),
        (this.roots = [])
    }
    render(t, s) {
      const n = Nt(t, s, this.renderKit)
      return this.roots.push(n), n
    }
    startNavigation() {
      K(this)
    }
  }
  const Mt = Object.freeze(
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
  class I {
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
  class J {
    constructor() {
      ;(this.exactSubscriptions = new q()),
        (this.fuzzySubscriptions = new I()),
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
  const H = () => {
      const e = new J()
      return {
        bus: e,
        publish: (n, r) => e.publish(n, r),
        subscribe: (n, r) => e.subscribe(n, r),
      }
    },
    Tt = Object.freeze(
      Object.defineProperty(
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
    v = (e) => Array.isArray(e),
    E = (e) => e !== null && !v(e) && typeof e == 'object',
    kt = (e, t) => e === t,
    $t = (e, t) => Object.keys(e).length === Object.keys(t).length,
    Ft = (e, t) =>
      !(E(e) && E(t)) || !$t(e, t)
        ? !1
        : Object.keys(e).every((s) => {
            const n = e[s],
              r = t[s]
            return x(n, r)
          }),
    Pt = (e, t) =>
      !(v(e) && v(t)) || e.length !== t.length
        ? !1
        : e.every((s, n) => {
            const r = t[n]
            return x(s, r)
          }),
    x = (e, t) => (E(e) ? Ft(e, t) : v(e) ? Pt(e, t) : kt(e, t))
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
  class A {
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
      const n = new A({ name: t, parent: this, value: s })
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
      return this.stores[t] || new A({ name: t, parent: this, value: void 0 })
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
    Dt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          State: Q,
          Store: A,
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
  class Lt {
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
      const { publish: t, subscribe: s, bus: n } = H()
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
  const zt = (e = {}) => {
    const s = new Lt(e).setup()
    return s.startNavigation(), s
  }
  var i = ((e) => (
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
  const Bt = Object.freeze(
      Object.defineProperty(
        { __proto__: null, ChangeInstructionTypes: i },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Ut = (e, t) => ({ source: e, target: t, type: i.changeText, data: {} }),
    Vt = (e, t) => ({ source: e, target: t, type: i.replaceNode, data: {} }),
    Kt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: i.removeAttribute,
    }),
    Rt = (e, t, s) => ({ source: e, target: t, data: s, type: i.addAttribute }),
    qt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: i.updateAttribute,
    }),
    It = (e, t, s) => ({ source: e, target: t, data: s, type: i.removeEvent }),
    Jt = (e, t, s) => ({ source: e, target: t, data: s, type: i.addEvent }),
    Ht = (e, t, s) => ({ source: e, target: t, data: s, type: i.updateEvent }),
    X = (e) => ({ source: e, target: e, type: i.removeNode, data: {} }),
    _ = (e, t) => ({ target: e, source: e, type: i.insertNode, data: t }),
    Gt = (e, t, s) => ({ source: e, target: t, type: i.changeValue, data: s }),
    Ct = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
    Y = { index: -1 }
  class Qt {
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
      const t = new Qt()
      return t.populate(e), t
    },
    tt = (e, t, s = !1) => {
      const n = [],
        r = e.attributes,
        o = r.length,
        a = t.attributes,
        h = a.length
      let u, d, c
      for (u = 0; u < o; u++) {
        c = null
        const l = r.item(u)
        if (l) {
          for (d = 0; d < h; d++) {
            const m = a.item(d)
            if (m && l.name == m.name) {
              c = m
              break
            }
          }
          c
            ? l.value !== c.value &&
              n.push(qt(e, t, { name: l.name, value: c.value, isSvg: s }))
            : n.push(Kt(e, t, { name: l.name, isSvg: s }))
        }
      }
      for (u = 0; u < h; u++) {
        c = null
        const l = a.item(u)
        if (l) {
          for (d = 0; d < o; d++) {
            const m = r.item(d)
            if (m && m.name == l.name) {
              c = m
              break
            }
          }
          c || n.push(Rt(e, t, { name: l.name, value: l.value, isSvg: s }))
        }
      }
      return n
    },
    Wt = (e, t) => {
      const s = [],
        n = e.eventMaps,
        r = t.eventMaps,
        o = Object.keys(n),
        a = Object.keys(r)
      return (
        o.forEach((h) => {
          const u = n[h],
            d = r[h]
          d
            ? d.busEvent !== u.busEvent &&
              s.push(
                Ht(e, t, {
                  name: h,
                  targetValue: d.listener,
                  sourceValue: u.listener,
                }),
              )
            : s.push(It(e, t, { name: u.domEvent, value: u.listener }))
        }),
        a.forEach((h) => {
          const u = n[h],
            d = r[h]
          u || s.push(Jt(e, t, { name: d.domEvent, value: d.listener }))
        }),
        s
      )
    },
    Xt = (e) => e.tagName !== 'INPUT',
    Yt = (e, t) => e.value === t.value,
    Zt = (e, t) => {
      if (Xt(e) || Yt(e, t)) return []
      const s = e,
        n = t
      return [Gt(s, n, { name: 'value', value: n.value })]
    },
    te = (e, t) => {
      const s = tt(e, t),
        n = Wt(e, t),
        r = Zt(e, t)
      return s.concat(n).concat(r)
    },
    ee = (e, t) => tt(e, t, !0),
    se = (e, t) => (e.textContent !== t.textContent ? [Ut(e, t)] : []),
    ne = (e, t, s) => {
      let n = []
      if (e.nodeType === 1 && lt(e)) {
        const r = e,
          o = t,
          a = ee(r, o),
          h = s(r.childNodes, o.childNodes, r)
        n = a.concat(h)
      } else if (e.nodeType === 1) {
        const r = e,
          o = t,
          a = te(r, o),
          h = s(r.childNodes, o.childNodes, r)
        n = a.concat(h)
      } else e.nodeType === 3 && (n = se(e, t))
      return n
    },
    et = (e, t, s) => {
      const n = [],
        r = re(e, t),
        o = Z(e),
        a = Z(t),
        h = []
      let u = 0
      for (; u < r; u++) {
        const c = e[u],
          l = t[u]
        if (l && a.check(l)) {
          const m = o.pullMatch(l)
          a.clear(l),
            m.element
              ? (m.index !== u && n.push(_(m.element, { parent: s, index: u })),
                h.push({ source: m.element, target: l }))
              : c
                ? a.check(c)
                  ? n.push(_(l, { parent: s, index: u }))
                  : (o.clear(c), n.push(Vt(c, l)))
                : n.push(_(l, { parent: s, index: u }))
        } else c && o.pullMatch(c).element && n.push(X(c))
      }
      o.remaining().forEach(({ element: c }) => {
        n.push(X(c))
      })
      const d = h.reduce(
        (c, { source: l, target: m }) => c.concat(ne(l, m, et)),
        [],
      )
      return n.concat(d).sort(Ct)
    },
    re = (e, t) => {
      const s = e.length,
        n = t.length
      return s > n ? s : n
    },
    oe = (e, t, s) => {
      const n = et(e, t, s)
      return (
        n.forEach((r) => {
          ie(r)
        }),
        n
      )
    },
    ie = (e) => {
      ;(ge[e.type] || ue)(e)
    },
    ue = (e) => {},
    ae = (e) => {
      const { source: t, target: s } = e
      t.nodeValue = s.textContent
    },
    ce = (e) => {
      const { source: t } = e
      t.remove()
    },
    he = (e) => {
      const { target: t, data: s } = e,
        { parent: n, index: r } = s,
        o = n.childNodes[r]
      o ? o && o !== t && n.insertBefore(t, o) : n.appendChild(t)
    },
    le = (e) => {
      const { source: t, target: s } = e
      t.replaceWith(s)
    },
    de = (e) => {
      const { source: t, data: s } = e,
        { name: n, isSvg: r } = s
      r ? t.removeAttributeNS(null, n) : t.removeAttribute(n)
    },
    st = (e) => {
      const { source: t, data: s } = e,
        { name: n, value: r, isSvg: o } = s
      o ? t.setAttributeNS(null, n, r) : t.setAttribute(n, r)
    },
    pe = (e) => {
      st(e)
    },
    me = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, value: r } = t
      s.removeEventListener(n, r)
    },
    fe = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, value: r } = t
      s.addEventListener(n, r)
    },
    be = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, sourceValue: r, targetValue: o } = t
      s.removeEventListener(n, r), s.addEventListener(n, o)
    },
    ve = (e) => {
      const t = e.data,
        s = e.source,
        { value: n } = t
      s.value = n
    },
    ge = {
      [i.changeText]: ae,
      [i.removeNode]: ce,
      [i.insertNode]: he,
      [i.replaceNode]: le,
      [i.removeAttribute]: de,
      [i.addAttribute]: st,
      [i.updateAttribute]: pe,
      [i.removeEvent]: me,
      [i.addEvent]: fe,
      [i.updateEvent]: be,
      [i.changeValue]: ve,
    },
    ye = (e, t, s) => {
      const n = [...t]
      return (
        e.forEach((r) => {
          Ee(r, n, s)
        }),
        n
      )
    },
    Ee = (e, t, s) => {
      const n = Se[e.type]
      n && n(e, t, s)
    },
    xe = (e, t) => {
      const { source: s } = e,
        n = t.indexOf(s)
      n >= 0 && t.splice(n, 1)
    },
    we = (e, t, s) => {
      const { target: n } = e,
        r = e.data,
        { index: o, parent: a } = r
      s === a && t.splice(o, 0, n)
    },
    Ae = (e, t) => {
      const { target: s, source: n } = e,
        r = t.indexOf(n)
      r >= 0 && (t[r] = s)
    },
    Se = { [i.removeNode]: xe, [i.insertNode]: we, [i.replaceNode]: Ae }
  class _e {
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
        s = oe(this.dom, t, this.parentElement)
      this.dom = ye(s, this.dom, this.parentElement)
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
  const Ne = (e) => e,
    nt = ({ Template: e, viewModel: t, subscriptions: s }) => (
      (s = s || []),
      (t = t || Ne),
      (n) =>
        new _e({ Template: e, viewModel: t, subscriptions: s, attributes: n })
    ),
    je = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          createRouteState: $,
          events: jt,
          extractQueryParams: L,
          findHref: F,
          navigate: P,
          onLinkClick: D,
          onLocationChange: z,
          start: Ot,
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
    rt =
      (e) =>
      ({ route: t }) => {
        const s = e.find((n) => n.match(t))
        return s && s.Partial
      },
    Te = Object.freeze(
      Object.defineProperty(
        { __proto__: null, buildRouter: rt, catchAll: Me, exactPathMatch: Oe },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    ke = () => ({ render: (e, t) => [] }),
    $e = (e) => {
      const t = rt(e)
      return nt({
        Template: ({ route: n }) => (t({ route: n }) || ke)(),
        subscriptions: ['route'],
      })
    }
  ;(p.JaxsTypes = Bt),
    (p.appBuilding = Mt),
    (p.bind = nt),
    (p.createApp = zt),
    (p.jsx = M),
    (p.messageBus = Tt),
    (p.navigation = je),
    (p.routedView = $e),
    (p.routing = Te),
    (p.state = Dt),
    Object.defineProperty(p, Symbol.toStringTag, { value: 'Module' })
})
