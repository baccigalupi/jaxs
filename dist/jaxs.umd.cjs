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
    nt = (e, t) => {
      for (const s in t) {
        if (s === '__self') continue
        const n = t[s].toString()
        if (s === 'value') {
          const r = e
          r.value !== n && (r.value = n)
        } else e.setAttribute(s, n)
      }
    },
    rt = (e, t, s) => {
      const n = {}
      for (const r in t) {
        const o = t[r],
          a = (l) => s(o, l)
        e.addEventListener(r, a),
          (n[r] = { domEvent: r, busEvent: o, listener: a })
      }
      e.eventMaps = n
    },
    ot = (e, t, s, n) => {
      const r = f(e, n.document)
      return nt(r, t), rt(r, s, n.publish), r
    },
    g = 'http://www.w3.org/2000/svg',
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
    ut = (e, t) => !!(it[e] || (e === 'a' && t === g)),
    at = (e, t, s) => {
      const n = s.createElementNS(g, e)
      for (const r in t)
        r === '__self' ||
          r === 'xmlns' ||
          n.setAttributeNS(null, r, t[r].toString())
      return n
    },
    ct = (e) => e.namespaceURI === g,
    lt = (e, t) => t.createTextNode(e)
  class ht {
    constructor(t) {
      this.value = t.toString()
    }
    render(t) {
      const s = lt(this.value, t.document)
      return (s.__jsx = 'TextNode'), [s]
    }
  }
  const dt = (e) => typeof e == 'string' || typeof e == 'number',
    pt = (e) => new ht(e),
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
          const a = r.slice(2).toLowerCase()
          n[a] = o ? o.toString() : ''
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
    j = (e, t, s, n = []) => e.reduce(Et(t, s), n).flat(),
    Et = (e, t) => (s, n) =>
      n
        ? Array.isArray(n)
          ? j(n, e, t, s)
          : (n.render(e, t).forEach((r) => s.push(r)), s)
        : s
  class O {
    constructor(t) {
      this.collection = ft(t)
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
  class At {
    constructor(t, s, n = []) {
      this.type = t
      const { events: r, attributes: o } = vt(s)
      ;(this.events = r),
        (this.attributes = o),
        (this.isSvg = ut(this.type, this.attributes.xmlns)),
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
      const s = ot(this.type, this.attributes, this.events, t)
      return (s.__jsx = this.jsxKey()), s
    }
    generateSvgDom(t) {
      const s = at(this.type, this.attributes, t.document)
      return (s.__jsx = this.jsxKey()), s
    }
    jsxKey() {
      return new xt(this.type, this.attributes).generate()
    }
  }
  const M = (e, t, ...s) =>
    typeof e == 'string' ? new At(e, t, s) : e(yt(t, s))
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
  const wt = (e, t, s) => {
      const n = new _t(e, t, s)
      return n.renderAndAttach(s), n
    },
    T = 'go-to-href',
    k = 'go-to',
    b = 'navigation:location-change',
    $ = 'navigation:route-change',
    St = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          linkNavigationEvent: T,
          locationChangeEvent: b,
          navigationEvent: k,
          routeChangeEvent: $,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    P = (e) => {
      e.create('route', { host: '', path: '', query: {} })
    },
    D = (e) => {
      const t = e.closest('[href]')
      return (t && t.getAttribute('href')) || ''
    },
    y = (e, { publish: t, window: s }) => {
      s.history.pushState(null, '', e), t(b, null)
    },
    F = (e, t) => {
      if (!e || !e.target) return
      e.preventDefault()
      const s = D(e.target)
      y(s, t)
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
        { host: o, pathname: a, search: l } = r.location,
        u = a,
        d = L(l),
        c = { host: o, path: u, query: d }
      s.store('route').update(c), n($, c)
    },
    B = (e) => {
      const { subscribe: t } = e
      t(T, F),
        t(k, (s, n) => {
          y(s, n)
        })
    },
    V = (e) => {
      const { publish: t, subscribe: s, state: n, window: r } = e
      P(n), r.addEventListener('popstate', () => t(b, null)), s(b, z)
    },
    K = (e) => {
      setTimeout(() => e.publish(b, null), 0)
    },
    R = (e) => {
      V(e), B(e), K(e)
    },
    Nt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          publishLocation: K,
          startNavigation: R,
          subscribeToHistoryChange: V,
          subscribeToNavigation: B,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  class U {
    constructor({
      window: t,
      document: s,
      publish: n,
      subscribe: r,
      bus: o,
      state: a,
      renderKit: l,
    }) {
      ;(this.window = t),
        (this.document = s),
        (this.publish = n),
        (this.subscribe = r),
        (this.bus = o),
        (this.state = a),
        (this.renderKit = l),
        (this.roots = [])
    }
    render(t, s) {
      const n = wt(t, s, this.renderKit)
      return this.roots.push(n), n
    }
    startNavigation() {
      R(this)
    }
  }
  const jt = Object.freeze(
    Object.defineProperty({ __proto__: null, App: U }, Symbol.toStringTag, {
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
    Ot = Object.freeze(
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
    Mt = (e, t) => e === t,
    Tt = (e, t) => Object.keys(e).length === Object.keys(t).length,
    kt = (e, t) =>
      !(E(e) && E(t)) || !Tt(e, t)
        ? !1
        : Object.keys(e).every((s) => {
            const n = e[s],
              r = t[s]
            return x(n, r)
          }),
    $t = (e, t) =>
      !(v(e) && v(t)) || e.length !== t.length
        ? !1
        : e.every((s, n) => {
            const r = t[n]
            return x(s, r)
          }),
    x = (e, t) => (E(e) ? kt(e, t) : v(e) ? $t(e, t) : Mt(e, t))
  class A {
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
      x(this._value, t) || ((this._value = t), this.parent.notify(this.name))
    }
    getUpdatedValue(t) {
      return t(this.value)
    }
  }
  class _ {
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
  class Pt extends _ {
    updateAttribute(t, s) {
      const n = { ...this.value }
      ;(n[t] = s), this.update(n)
    }
    resetAttribute(t) {
      const s = { ...this.value },
        n = this.store.initialValue[t]
      ;(s[t] = n), this.update(s)
    }
  }
  const Dt = (e) => new Pt(e)
  class Ft extends _ {
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
  const Lt = (e) => new Ft(e)
  class zt extends _ {
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
  const Bt = { object: Dt, list: Lt, boolean: (e) => new zt(e) },
    w = 'state'
  class G {
    constructor(t) {
      ;(this.publisher = t),
        (this.stores = {}),
        (this.eventNamePrefix = w),
        (this.notifications = new Set()),
        (this.inTransaction = !1)
    }
    create(t, s) {
      const n = new A({ name: t, parent: this, value: s })
      return (this.stores[t] = n), n
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
  const C = (e) => new G(e),
    Vt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          State: G,
          Store: A,
          createState: C,
          eventName: w,
          updaters: Bt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  class Kt {
    constructor(t) {
      this.setupDomEnvironment(t)
    }
    setup() {
      return (
        this.setupBus(),
        this.setupState(),
        this.addBusOptions(),
        this.setRenderKit(),
        new U({
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
      this.state = C(this.publish)
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
  const Rt = (e = {}) => {
    const s = new Kt(e).setup()
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
  const Ut = Object.freeze(
      Object.defineProperty(
        { __proto__: null, ChangeInstructionTypes: i },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    qt = (e, t) => ({ source: e, target: t, type: i.changeText, data: {} }),
    It = (e, t) => ({ source: e, target: t, type: i.replaceNode, data: {} }),
    Jt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: i.removeAttribute,
    }),
    Ht = (e, t, s) => ({ source: e, target: t, data: s, type: i.addAttribute }),
    Gt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: i.updateAttribute,
    }),
    Ct = (e, t, s) => ({ source: e, target: t, data: s, type: i.removeEvent }),
    Qt = (e, t, s) => ({ source: e, target: t, data: s, type: i.addEvent }),
    Wt = (e, t, s) => ({ source: e, target: t, data: s, type: i.updateEvent }),
    Q = (e) => ({ source: e, target: e, type: i.removeNode, data: {} }),
    S = (e, t) => ({ target: e, source: e, type: i.insertNode, data: t }),
    Xt = (e, t, s) => ({ source: e, target: t, type: i.changeValue, data: s }),
    Yt = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
    W = { index: -1 }
  class Zt {
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
        ? W
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
  const X = (e) => {
      const t = new Zt()
      return t.populate(e), t
    },
    Y = (e, t, s = !1) => {
      const n = [],
        r = e.attributes,
        o = r.length,
        a = t.attributes,
        l = a.length
      let u, d, c
      for (u = 0; u < o; u++) {
        c = null
        const h = r.item(u)
        if (h) {
          for (d = 0; d < l; d++) {
            const m = a.item(d)
            if (m && h.name == m.name) {
              c = m
              break
            }
          }
          c
            ? h.value !== c.value &&
              n.push(Gt(e, t, { name: h.name, value: c.value, isSvg: s }))
            : n.push(Jt(e, t, { name: h.name, isSvg: s }))
        }
      }
      for (u = 0; u < l; u++) {
        c = null
        const h = a.item(u)
        if (h) {
          for (d = 0; d < o; d++) {
            const m = r.item(d)
            if (m && m.name == h.name) {
              c = m
              break
            }
          }
          c || n.push(Ht(e, t, { name: h.name, value: h.value, isSvg: s }))
        }
      }
      return n
    },
    te = (e, t) => {
      const s = [],
        n = e.eventMaps,
        r = t.eventMaps,
        o = Object.keys(n),
        a = Object.keys(r)
      return (
        o.forEach((l) => {
          const u = n[l],
            d = r[l]
          d
            ? d.busEvent !== u.busEvent &&
              s.push(
                Wt(e, t, {
                  name: l,
                  targetValue: d.listener,
                  sourceValue: u.listener,
                }),
              )
            : s.push(Ct(e, t, { name: u.domEvent, value: u.listener }))
        }),
        a.forEach((l) => {
          const u = n[l],
            d = r[l]
          u || s.push(Qt(e, t, { name: d.domEvent, value: d.listener }))
        }),
        s
      )
    },
    ee = (e) => e.tagName !== 'INPUT',
    se = (e, t) => e.value === t.value,
    ne = (e, t) => {
      if (ee(e) || se(e, t)) return []
      const s = e,
        n = t
      return [Xt(s, n, { name: 'value', value: n.value })]
    },
    re = (e, t) => {
      const s = Y(e, t),
        n = te(e, t),
        r = ne(e, t)
      return s.concat(n).concat(r)
    },
    oe = (e, t) => Y(e, t, !0),
    ie = (e, t) => (e.textContent !== t.textContent ? [qt(e, t)] : []),
    ue = (e, t, s) => {
      let n = []
      if (e.nodeType === 1 && ct(e)) {
        const r = e,
          o = t,
          a = oe(r, o),
          l = s(r.childNodes, o.childNodes, r)
        n = a.concat(l)
      } else if (e.nodeType === 1) {
        const r = e,
          o = t,
          a = re(r, o),
          l = s(r.childNodes, o.childNodes, r)
        n = a.concat(l)
      } else e.nodeType === 3 && (n = ie(e, t))
      return n
    },
    Z = (e, t, s) => {
      const n = [],
        r = ae(e, t),
        o = X(e),
        a = X(t),
        l = []
      let u = 0
      for (; u < r; u++) {
        const c = e[u],
          h = t[u]
        if (h && a.check(h)) {
          const m = o.pullMatch(h)
          a.clear(h),
            m.element
              ? (m.index !== u && n.push(S(m.element, { parent: s, index: u })),
                l.push({ source: m.element, target: h }))
              : c
                ? a.check(c)
                  ? n.push(S(h, { parent: s, index: u }))
                  : (o.clear(c), n.push(It(c, h)))
                : n.push(S(h, { parent: s, index: u }))
        } else c && o.pullMatch(c).element && n.push(Q(c))
      }
      o.remaining().forEach(({ element: c }) => {
        n.push(Q(c))
      })
      const d = l.reduce(
        (c, { source: h, target: m }) => c.concat(ue(h, m, Z)),
        [],
      )
      return n.concat(d).sort(Yt)
    },
    ae = (e, t) => {
      const s = e.length,
        n = t.length
      return s > n ? s : n
    },
    ce = (e, t, s) => {
      const n = Z(e, t, s)
      return (
        n.forEach((r) => {
          le(r)
        }),
        n
      )
    },
    le = (e) => {
      ;(Ae[e.type] || he)(e)
    },
    he = (e) => {},
    de = (e) => {
      const { source: t, target: s } = e
      t.nodeValue = s.textContent
    },
    pe = (e) => {
      const { source: t } = e
      t.remove()
    },
    me = (e) => {
      const { target: t, data: s } = e,
        { parent: n, index: r } = s,
        o = n.childNodes[r]
      o ? o && o !== t && n.insertBefore(t, o) : n.appendChild(t)
    },
    fe = (e) => {
      const { source: t, target: s } = e
      t.replaceWith(s)
    },
    be = (e) => {
      const { source: t, data: s } = e,
        { name: n, isSvg: r } = s
      r ? t.removeAttributeNS(null, n) : t.removeAttribute(n)
    },
    tt = (e) => {
      const { source: t, data: s } = e,
        { name: n, value: r, isSvg: o } = s
      o ? t.setAttributeNS(null, n, r) : t.setAttribute(n, r)
    },
    ve = (e) => {
      tt(e)
    },
    ge = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, value: r } = t
      s.removeEventListener(n, r)
    },
    ye = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, value: r } = t
      s.addEventListener(n, r)
    },
    Ee = (e) => {
      const t = e.data,
        s = e.source,
        { name: n, sourceValue: r, targetValue: o } = t
      s.removeEventListener(n, r), s.addEventListener(n, o)
    },
    xe = (e) => {
      const t = e.data,
        s = e.source,
        { value: n } = t
      s.value = n
    },
    Ae = {
      [i.changeText]: de,
      [i.removeNode]: pe,
      [i.insertNode]: me,
      [i.replaceNode]: fe,
      [i.removeAttribute]: be,
      [i.addAttribute]: tt,
      [i.updateAttribute]: ve,
      [i.removeEvent]: ge,
      [i.addEvent]: ye,
      [i.updateEvent]: Ee,
      [i.changeValue]: xe,
    },
    _e = (e, t, s) => {
      const n = [...t]
      return (
        e.forEach((r) => {
          we(r, n, s)
        }),
        n
      )
    },
    we = (e, t, s) => {
      const n = Oe[e.type]
      n && n(e, t, s)
    },
    Se = (e, t) => {
      const { source: s } = e,
        n = t.indexOf(s)
      n >= 0 && t.splice(n, 1)
    },
    Ne = (e, t, s) => {
      const { target: n } = e,
        r = e.data,
        { index: o, parent: a } = r
      s === a && t.splice(o, 0, n)
    },
    je = (e, t) => {
      const { target: s, source: n } = e,
        r = t.indexOf(n)
      r >= 0 && (t[r] = s)
    },
    Oe = { [i.removeNode]: Se, [i.insertNode]: Ne, [i.replaceNode]: je }
  class Me {
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
        s = ce(this.dom, t, this.parentElement)
      this.dom = _e(s, this.dom, this.parentElement)
    }
    subscribeForRerender() {
      const { subscribe: t } = this.renderKit
      this.subscriptions.forEach((s) => {
        t(this.eventName(s), () => this.rerender())
      })
    }
    eventName(t) {
      return `${w}:${t}`
    }
  }
  const Te = (e) => e,
    et = ({ Template: e, viewModel: t, subscriptions: s }) => (
      (s = s || []),
      (t = t || Te),
      (n) =>
        new Me({ Template: e, viewModel: t, subscriptions: s, attributes: n })
    ),
    ke = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          createRouteState: P,
          events: St,
          extractQueryParams: L,
          findHref: D,
          navigate: y,
          onLinkClick: F,
          onLocationChange: z,
          start: Nt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    $e =
      (e) =>
      ({ path: t }) =>
        t === e,
    Pe = () => !0,
    st =
      (e) =>
      ({ route: t }) => {
        const s = e.find((n) => n.match(t))
        return s && s.Partial
      },
    De = Object.freeze(
      Object.defineProperty(
        { __proto__: null, buildRouter: st, catchAll: Pe, exactPathMatch: $e },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Fe = () => ({ render: (e, t) => [] }),
    Le = (e) => {
      const t = st(e)
      return et({
        Template: ({ route: n }) => (t({ route: n }) || Fe)(),
        subscriptions: ['route'],
      })
    }
  ;(p.JaxsTypes = Ut),
    (p.appBuilding = jt),
    (p.bind = et),
    (p.createApp = Rt),
    (p.jsx = M),
    (p.messageBus = Ot),
    (p.navigation = ke),
    (p.routedView = Le),
    (p.routing = De),
    (p.state = Vt),
    Object.defineProperty(p, Symbol.toStringTag, { value: 'Module' })
})
