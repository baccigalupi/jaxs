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
    j = (e, t) => {
      for (let s = e.length - 1; s >= 0; s--) t(e[s]) && e.splice(s, 1)
      return e
    },
    O = (e, t, s) => (e.splice(t, 0, s), e),
    M = (e, t) => (e.includes(t) || e.push(t), e),
    dt = {
      remove: b,
      removeBy: j,
      insertAt: O,
      appendIfUnique: M,
      push: (e, t) => e.push(t),
      pop: (e) => e.pop(),
      unshift: (e, t) => e.unshift(t),
      shift: (e) => e.shift(),
      sortBy: (e, t) => e.sort(t),
      includes: (e, t) => e.includes(t),
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
  const v = (e) => new pt(e),
    ft = {
      toggle: (e) => v(e).toggle(),
      setTrue: (e) => v(e).setTrue(),
      setFalse: (e) => v(e).setFalse(),
      reset: (e) => v(e).reset(),
      isTrue: (e) => v(e).isTrue(),
      isFalse: (e) => v(e).isFalse(),
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
    includes(t) {
      return this.value.includes(t)
    }
    appendIfUnique(t) {
      const s = this.value
      M(s, t), this.update(s)
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
  const m = (e) => new mt(e),
    bt = {
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
  class vt {
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
  const y = (e) => new vt(e),
    yt = {
      reset: (e) => y(e).reset(),
      resetAttribute: (e, t) => y(e).resetAttribute(t),
      updateAttribute: (e, t, s) => y(e).updateAttribute(t, s),
      updateAttributes: (e, t) => y(e).updateAttributes(t),
      attributeTruthy: (e, t) => y(e).attributeTruthy(t),
    },
    gt = (e) => typeof e == 'boolean',
    Et = (e) => typeof e == 'number',
    k = (e) => typeof e == 'string',
    g = (e) => Array.isArray(e),
    A = (e) => e !== null && !g(e) && typeof e == 'object',
    At = { boolean: gt, number: Et, string: k, array: g, object: A },
    wt = (e, t) => t.createElement(e),
    Nt = (e, t) => {
      for (const s in t) {
        if (s === '__self') continue
        const r = t[s].toString()
        if (s === 'value') {
          const n = e
          n.value !== r && (n.value = r)
        } else
          k(r) && r.trim() === '' ? e.removeAttribute(s) : e.setAttribute(s, r)
      }
    },
    St = (e, t, s) => {
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
      const n = wt(e, r.document)
      return Nt(n, t), St(n, s, r.publish), n
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
    Tt = (e, t) => !!(xt[e] || (e === 'a' && t === N)),
    jt = (e, t, s) => {
      const r = s.createElementNS(N, e)
      for (const n in t)
        n === '__self' ||
          n === 'xmlns' ||
          r.setAttributeNS(null, n, t[n].toString())
      return r
    },
    Ot = (e) => e.namespaceURI === N,
    Mt = (e, t) => t.createTextNode(e)
  class kt {
    constructor(t) {
      this.value = t.toString()
    }
    render(t) {
      const s = Mt(this.value, t.document)
      return (s.__jsx = 'TextNode'), [s]
    }
  }
  const $t = (e) => typeof e == 'string' || typeof e == 'number',
    Bt = (e) => new kt(e),
    Dt = (e) => ($t(e) ? Bt(e) : e),
    $ = (e) => Pt(e).map(Dt).flat(),
    Pt = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
    B = (e, t = {}) => $(e || t.children || []),
    Ft = (e, t = '') => {
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
    Lt = (e, t) => {
      const s = e || {},
        r = B(t, s)
      return (s.children = s.children || r), s
    },
    D = (e, t, s, r = []) => e.reduce(zt(t, s), r).flat(),
    zt = (e, t) => (s, r) =>
      r
        ? Array.isArray(r)
          ? D(r, e, t, s)
          : (r.render(e, t).forEach((n) => s.push(n)), s)
        : s
  class P {
    constructor(t) {
      this.collection = $(t)
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
  class Kt {
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
  class Rt {
    constructor(t, s, r = []) {
      this.type = t
      const { events: n, attributes: i } = Ft(s)
      ;(this.events = n),
        (this.attributes = i),
        (this.isSvg = Tt(this.type, this.attributes.xmlns)),
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
      const s = jt(this.type, this.attributes, t.document)
      return (s.__jsx = this.jsxKey()), s
    }
    jsxKey() {
      return new Kt(this.type, this.attributes).generate()
    }
  }
  const F = (e, t, ...s) =>
    typeof e == 'string' ? new Rt(e, t, s) : e(Lt(t, s))
  F.fragment = (e, t) => {
    const s = B(t, e)
    return new P(s)
  }
  class Ut {
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
  const qt = (e, t, s) => {
      const r = new Ut(e, t, s)
      return r.renderAndAttach(s), r
    },
    V = 'go-to-href',
    L = 'go-to',
    E = 'navigation:location-change',
    z = 'navigation:route-change',
    It = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          linkNavigationEvent: V,
          locationChangeEvent: E,
          navigationEvent: L,
          routeChangeEvent: z,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    K = (e) => {
      e.create('route', { host: '', path: '', query: {} })
    },
    R = (e) => {
      const t = e.closest('[href]')
      return (t && t.getAttribute('href')) || ''
    },
    S = ({ payload: e, publish: t, window: s }) => {
      s.history.pushState(null, '', e), t(E, null)
    },
    U = (e) => {
      const t = e.payload
      if (!t || !t.target) return
      t.preventDefault()
      const s = R(t.target)
      S({ ...e, payload: s })
    },
    q = (e) =>
      e
        .replace(/^\?/, '')
        .split('&')
        .reduce((t, s) => {
          if (!s) return t
          const r = s.split('=')
          return (t[r[0]] = r[1]), t
        }, {}),
    I = (e) => {
      const { state: t, publish: s, window: r } = e,
        { host: n, pathname: i, search: a } = r.location,
        c = i,
        u = q(a),
        d = { host: n, path: c, query: u }
      t.store('route').update(d), s(z, d)
    },
    J = (e) => {
      const { subscribe: t } = e
      t(V, U),
        t(L, (s) => {
          S(s)
        })
    },
    G = (e) => {
      const { publish: t, subscribe: s, state: r, window: n } = e
      K(r), n.addEventListener('popstate', () => t(E, null)), s(E, I)
    },
    H = (e) => {
      setTimeout(() => e.publish(E, null), 0)
    },
    C = (e) => {
      G(e), J(e), H(e)
    },
    Jt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          publishLocation: H,
          startNavigation: C,
          subscribeToHistoryChange: G,
          subscribeToNavigation: J,
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
      const r = qt(t, s, this.renderKit)
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
  class W {
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
  class X {
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
  class Ht {
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
    Qt = (e) => {
      let t
      'timer' in e ? (t = e) : (t = Ct(e))
      const s = new Ht(t)
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
  const Z = () => {
      const e = new Y()
      return {
        bus: e,
        publish: (r, n) => e.publish(r, n),
        subscribe: (r, n) => e.subscribe(r, n),
      }
    },
    Wt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          ExactSubscriptions: W,
          FuzzySubscriptions: X,
          JaxsBus: Y,
          createBus: Z,
          publishPeriodically: Qt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Xt = (e, t) => e === t,
    Yt = (e, t) => Object.keys(e).length === Object.keys(t).length,
    tt = (e, t) =>
      !(A(e) && A(t)) || !Yt(e, t)
        ? !1
        : Object.keys(e).every((s) => {
            const r = e[s],
              n = t[s]
            return w(r, n)
          }),
    et = (e, t) =>
      !(g(e) && g(t)) || e.length !== t.length
        ? !1
        : e.every((s, r) => {
            const n = t[r]
            return w(s, n)
          }),
    w = (e, t) => (A(e) ? tt(e, t) : g(e) ? et(e, t) : Xt(e, t)),
    Zt = { objects: tt, arrays: et, equal: w }
  class _ {
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
  const x = 'state'
  class st {
    constructor(t) {
      ;(this.publisher = t),
        (this.stores = {}),
        (this.eventNamePrefix = x),
        (this.notifications = new Set()),
        (this.inTransaction = !1)
    }
    create(t, s) {
      const r = new _({ name: t, parent: this, value: s })
      return (this.stores[t] = r), r
    }
    store(t) {
      return this.stores[t] || new _({ name: t, parent: this, value: void 0 })
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
  const rt = (e) => new st(e),
    te = Object.freeze(
      Object.defineProperty(
        { __proto__: null, State: st, Store: _, createState: rt, eventName: x },
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
    nt = (e) => ({ source: e, target: e, type: o.removeNode, data: {} }),
    T = (e, t) => ({ target: e, source: e, type: o.insertNode, data: t }),
    de = (e, t, s) => ({ source: e, target: t, type: o.changeValue, data: s }),
    pe = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
    it = { index: -1 }
  class fe {
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
        ? it
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
  const ot = (e) => {
      const t = new fe()
      return t.populate(e), t
    },
    ut = (e, t, s = !1) => {
      const r = [],
        n = e.attributes,
        i = n.length,
        a = t.attributes,
        c = a.length
      let u, d, p
      for (u = 0; u < i; u++) {
        p = null
        const h = n.item(u)
        if (h) {
          for (d = 0; d < c; d++) {
            const f = a.item(d)
            if (f && h.name == f.name) {
              p = f
              break
            }
          }
          p
            ? h.value !== p.value &&
              r.push(ae(e, t, { name: h.name, value: p.value, isSvg: s }))
            : r.push(oe(e, t, { name: h.name, isSvg: s }))
        }
      }
      for (u = 0; u < c; u++) {
        p = null
        const h = a.item(u)
        if (h) {
          for (d = 0; d < i; d++) {
            const f = n.item(d)
            if (f && f.name == h.name) {
              p = f
              break
            }
          }
          p || r.push(ue(e, t, { name: h.name, value: h.value, isSvg: s }))
        }
      }
      return r
    },
    me = (e, t) => {
      const s = [],
        r = e.eventMaps,
        n = t.eventMaps,
        i = Object.keys(r),
        a = Object.keys(n)
      return (
        i.forEach((c) => {
          const u = r[c],
            d = n[c]
          d
            ? d.busEvent !== u.busEvent &&
              s.push(
                he(e, t, {
                  name: c,
                  targetValue: d.listener,
                  sourceValue: u.listener,
                }),
              )
            : s.push(ce(e, t, { name: u.domEvent, value: u.listener }))
        }),
        a.forEach((c) => {
          const u = r[c],
            d = n[c]
          u || s.push(le(e, t, { name: d.domEvent, value: d.listener }))
        }),
        s
      )
    },
    be = (e) => e.tagName !== 'INPUT',
    ve = (e, t) => e.value === t.value,
    ye = (e, t) => {
      if (be(e) || ve(e, t)) return []
      const s = e,
        r = t
      return [de(s, r, { name: 'value', value: r.value })]
    },
    ge = (e, t) => {
      const s = ut(e, t),
        r = me(e, t),
        n = ye(e, t)
      return s.concat(r).concat(n)
    },
    Ee = (e, t) => ut(e, t, !0),
    Ae = (e, t) => (e.textContent !== t.textContent ? [ne(e, t)] : []),
    we = (e, t, s) => {
      let r = []
      if (e.nodeType === 1 && Ot(e)) {
        const n = e,
          i = t,
          a = Ee(n, i),
          c = s(n.childNodes, i.childNodes, n)
        r = a.concat(c)
      } else if (e.nodeType === 1) {
        const n = e,
          i = t,
          a = ge(n, i),
          c = s(n.childNodes, i.childNodes, n)
        r = a.concat(c)
      } else e.nodeType === 3 && (r = Ae(e, t))
      return r
    },
    at = (e, t, s) => {
      const r = [],
        n = Ne(e, t),
        i = ot(e),
        a = ot(t),
        c = []
      let u = 0
      for (; u < n; u++) {
        const p = e[u],
          h = t[u]
        if (h && a.check(h)) {
          const f = i.pullMatch(h)
          a.clear(h),
            f.element
              ? (f.index !== u && r.push(T(f.element, { parent: s, index: u })),
                c.push({ source: f.element, target: h }))
              : p
                ? a.check(p)
                  ? r.push(T(h, { parent: s, index: u }))
                  : (i.clear(p), r.push(ie(p, h)))
                : r.push(T(h, { parent: s, index: u }))
        } else p && i.pullMatch(p).element && r.push(nt(p))
      }
      i.remaining().forEach(({ element: p }) => {
        r.push(nt(p))
      })
      const d = c.reduce(
        (p, { source: h, target: f }) => p.concat(we(h, f, at)),
        [],
      )
      return r.concat(d).sort(pe)
    },
    Ne = (e, t) => {
      const s = e.length,
        r = t.length
      return s > r ? s : r
    },
    Se = (e, t, s) => {
      const r = at(e, t, s)
      return (
        r.forEach((n) => {
          _e(n)
        }),
        r
      )
    },
    _e = (e) => {
      ;(Ve[e.type] || xe)(e)
    },
    xe = (e) => {},
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
    ct = (e) => {
      const { source: t, data: s } = e,
        { name: r, value: n, isSvg: i } = s
      i ? t.setAttributeNS(null, r, n) : t.setAttribute(r, n)
    },
    $e = (e) => {
      ct(e)
    },
    Be = (e) => {
      const t = e.data,
        s = e.source,
        { name: r, value: n } = t
      s.removeEventListener(r, n)
    },
    De = (e) => {
      const t = e.data,
        s = e.source,
        { name: r, value: n } = t
      s.addEventListener(r, n)
    },
    Pe = (e) => {
      const t = e.data,
        s = e.source,
        { name: r, sourceValue: n, targetValue: i } = t
      s.removeEventListener(r, n), s.addEventListener(r, i)
    },
    Fe = (e) => {
      const t = e.data,
        s = e.source,
        { value: r } = t
      s.value = r
    },
    Ve = {
      [o.changeText]: Te,
      [o.removeNode]: je,
      [o.insertNode]: Oe,
      [o.replaceNode]: Me,
      [o.removeAttribute]: ke,
      [o.addAttribute]: ct,
      [o.updateAttribute]: $e,
      [o.removeEvent]: Be,
      [o.addEvent]: De,
      [o.updateEvent]: Pe,
      [o.changeValue]: Fe,
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
  class Ie {
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
        s = Se(this.dom, t, this.parentElement)
      this.dom = Le(s, this.dom, this.parentElement)
    }
    subscribeForRerender() {
      const { subscribe: t } = this.renderKit
      this.subscriptions.forEach((s) => {
        t(this.eventName(s), () => this.rerender())
      })
    }
    eventName(t) {
      return `${x}:${t}`
    }
  }
  const Je = (e) => e,
    lt = ({ Template: e, viewModel: t, subscriptions: s }) => (
      (s = s || []),
      (t = t || Je),
      (r) =>
        new Ie({ Template: e, viewModel: t, subscriptions: s, attributes: r })
    ),
    Ge =
      (e) =>
      ({ path: t }) =>
        t === e,
    He = () => !0,
    ht =
      (e) =>
      ({ route: t }) => {
        const s = e.find((r) => r.match(t))
        return s && s.Partial
      },
    Ce = Object.freeze(
      Object.defineProperty(
        { __proto__: null, buildRouter: ht, catchAll: He, exactPathMatch: Ge },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Qe = () => ({ render: (e, t) => [] }),
    We = (e) => {
      const t = ht(e)
      return lt({
        Template: ({ route: r }) => (t({ route: r }) || Qe)(),
        subscriptions: ['route'],
      })
    },
    Xe = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          createRouteState: K,
          events: It,
          extractQueryParams: q,
          findHref: R,
          navigate: S,
          onLinkClick: U,
          onLocationChange: I,
          start: Jt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  ;(l.ArrayModifiers = dt),
    (l.BooleanStore = ft),
    (l.Equality = Zt),
    (l.Is = At),
    (l.JaxsTypes = re),
    (l.ListStore = bt),
    (l.RecordStore = yt),
    (l.appBuilding = Gt),
    (l.bind = lt),
    (l.createApp = se),
    (l.jsx = F),
    (l.messageBus = Wt),
    (l.navigation = Xe),
    (l.routedView = We),
    (l.routing = Ce),
    (l.state = te),
    Object.defineProperty(l, Symbol.toStringTag, { value: 'Module' })
})
