;(function (m, b) {
  typeof exports == 'object' && typeof module < 'u'
    ? b(exports)
    : typeof define == 'function' && define.amd
      ? define(['exports'], b)
      : ((m = typeof globalThis < 'u' ? globalThis : m || self),
        b((m.jaxs = {})))
})(this, function (m) {
  'use strict'
  const b = (e, t) => t.createElement(e),
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
      const r = b(e, n.document)
      return nt(r, t), rt(r, s, n.publish), r
    },
    _ = 'http://www.w3.org/2000/svg',
    it = (e) => e === 'svg',
    at = (e, t, s) => {
      const n = s.createElementNS(_, e)
      for (const r in t)
        r === '__self' ||
          r === 'xmlns' ||
          n.setAttributeNS(null, r, t[r].toString())
      return n
    },
    ct = (e) => e.namespaceURI === _,
    ut = (e, t) => t.createTextNode(e)
  class ht {
    constructor(t) {
      ;(this.value = t.toString()), (this.isSvg = !1)
    }
    render(t) {
      const s = ut(this.value, t.document)
      return (s.__jsx = 'TextNode'), [s]
    }
  }
  const lt = (e) => typeof e == 'string' || typeof e == 'number',
    dt = (e) => new ht(e),
    pt = (e) => (lt(e) ? dt(e) : e),
    mt = (e) => (t) => (t && (t.isSvg = t.isSvg || e), t),
    bt = (e, t) => ft(e).map(pt).flat().map(mt(t)),
    ft = (e) => (Array.isArray(e) ? e.flat() : e ? [e] : []),
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
    constructor(t, s = !1) {
      ;(this.collection = bt(t, s)), (this.isSvg = s)
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
  class St {
    constructor(t, s, n = [], r = !1) {
      this.type = t
      const { events: o, attributes: c } = vt(s)
      ;(this.events = o),
        (this.attributes = c),
        (this.isSvg = r || it(this.type)),
        (this.children = new k(n, this.isSvg))
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
  const O = (e, t, ...s) =>
    typeof e == 'string' ? new St(e, t, s) : e(yt(t, s))
  O.fragment = (e, t) => {
    const s = N(t, e)
    return new k(s)
  }
  class wt {
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
  const xt = (e, t, s) => {
      const n = new wt(e, t, s)
      return n.renderAndAttach(s), n
    },
    $ = 'go-to-href',
    f = 'navigation:location-change',
    M = 'navigation:route-change',
    _t = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          linkNavigationEvent: $,
          locationChangeEvent: f,
          routeChangeEvent: M,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    F = (e) => {
      e.createRecord('route', { host: '', path: '', query: {} })
    },
    T = (e) => {
      const t = e.closest('[href]')
      return (t && t.getAttribute('href')) || ''
    },
    D = (e, { publish: t, window: s }) => {
      s.history.pushState(null, '', e), t(f, null)
    },
    U = (e, t) => {
      if (!e || !e.target) return
      e.preventDefault()
      const s = T(e.target)
      D(s, t)
    },
    z = (e) =>
      e
        .replace(/^\?/, '')
        .split('&')
        .reduce((t, s) => {
          if (!s) return t
          const n = s.split('=')
          return (t[n[0]] = n[1]), t
        }, {}),
    L = (e, t) => {
      const { state: s, publish: n, window: r } = t,
        { host: o, pathname: c, search: h } = r.location,
        i = c,
        d = z(h),
        u = { host: o, path: i, query: d }
      s.store('route').update(u), n(M, u)
    },
    P = (e) => {
      const { subscribe: t } = e
      t($, U)
    },
    V = (e) => {
      const { publish: t, subscribe: s, state: n, window: r } = e
      F(n), r.addEventListener('popstate', () => t(f, null)), s(f, L)
    },
    B = (e) => {
      setTimeout(() => e.publish(f, null), 0)
    },
    K = (e) => {
      V(e), P(e), B(e)
    },
    Nt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          publishLocation: B,
          startNavigation: K,
          subscribeToHistoryChange: V,
          subscribeToNavigation: P,
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
      const n = xt(t, s, this.renderKit)
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
  class J {
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
  class H {
    constructor() {
      ;(this.exactSubscriptions = new J()),
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
          ExactSubscriptions: J,
          FuzzySubscriptions: q,
          JaxsBus: H,
          createBus: I,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    v = (e) => Array.isArray(e),
    y = (e) => e !== null && !v(e) && typeof e == 'object',
    Ot = (e, t) => e === t,
    $t = (e, t) => Object.keys(e).length === Object.keys(t).length,
    Mt = (e, t) =>
      !(y(e) && y(t)) || !$t(e, t)
        ? !1
        : Object.keys(e).every((s) => {
            const n = e[s],
              r = t[s]
            return E(n, r)
          }),
    Ft = (e, t) =>
      !(v(e) && v(t)) || e.length !== t.length
        ? !1
        : e.every((s, n) => {
            const r = t[n]
            return E(s, r)
          }),
    E = (e, t) => (y(e) ? Mt(e, t) : v(e) ? Ft(e, t) : Ot(e, t))
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
  class A extends g {
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
  class S {
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
      E(this._value, t) || ((this._value = t), this.parent.notify(this.name))
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
      this.updater instanceof A && this.updater.addSorter(t, s)
    }
  }
  class Q extends g {
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
  class W extends g {
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
  const w = 'state'
  class G {
    constructor(t) {
      ;(this.publisher = t),
        (this.stores = {}),
        (this.eventNamePrefix = w),
        (this.notifications = new Set()),
        (this.inTransaction = !1)
    }
    create(t, s) {
      const n = new S({ name: t, parent: this, value: s })
      return (this.stores[t] = n), n
    }
    createBoolean(t, s) {
      const n = this.create(t, s)
      return (n.updater = new Q(n)), n
    }
    createRecord(t, s) {
      const n = this.create(t, s)
      return (n.updater = new W(n)), n
    }
    createList(t, s) {
      const n = this.create(t, s)
      return (n.updater = new A(n)), n
    }
    store(t) {
      return this.stores[t] || new S({ name: t, parent: this, value: void 0 })
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
  const X = (e) => new G(e),
    Tt = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          BooleanUpdater: Q,
          State: G,
          Store: S,
          ListUpdater: A,
          ObjectUpdater: W,
          createState: X,
          eventName: w,
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
      this.state = X(this.publish)
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
  const Ut = (e = {}) => {
    const s = new Dt(e).setup()
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
  const zt = Object.freeze(
      Object.defineProperty(
        { __proto__: null, ChangeInstructionTypes: a },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    Lt = (e, t) => ({ source: e, target: t, type: a.changeText, data: {} }),
    Pt = (e, t) => ({ source: e, target: t, type: a.replaceNode, data: {} }),
    Vt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: a.removeAttribute,
    }),
    Bt = (e, t, s) => ({ source: e, target: t, data: s, type: a.addAttribute }),
    Kt = (e, t, s) => ({
      source: e,
      target: t,
      data: s,
      type: a.updateAttribute,
    }),
    Rt = (e, t, s) => ({ source: e, target: t, data: s, type: a.removeEvent }),
    Jt = (e, t, s) => ({ source: e, target: t, data: s, type: a.addEvent }),
    qt = (e, t, s) => ({ source: e, target: t, data: s, type: a.updateEvent }),
    Y = (e) => ({ source: e, target: e, type: a.removeNode, data: {} }),
    x = (e, t) => ({ target: e, source: e, type: a.insertNode, data: t }),
    Ht = (e, t, s) => ({ source: e, target: t, type: a.changeValue, data: s }),
    It = (e, t) => (e.type > t.type ? 1 : e.type < t.type ? -1 : 0),
    Z = { index: -1 }
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
        ? Z
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
  const C = (e) => {
      const t = new Qt()
      return t.populate(e), t
    },
    tt = (e, t, s = !1) => {
      const n = [],
        r = e.attributes,
        o = r.length,
        c = t.attributes,
        h = c.length
      let i, d, u
      for (i = 0; i < o; i++) {
        u = null
        const l = r.item(i)
        if (l) {
          for (d = 0; d < h; d++) {
            const p = c.item(d)
            if (p && l.name == p.name) {
              u = p
              break
            }
          }
          u
            ? l.value !== u.value &&
              n.push(Kt(e, t, { name: l.name, value: u.value, isSvg: s }))
            : n.push(Vt(e, t, { name: l.name, isSvg: s }))
        }
      }
      for (i = 0; i < h; i++) {
        u = null
        const l = c.item(i)
        if (l) {
          for (d = 0; d < o; d++) {
            const p = r.item(d)
            if (p && p.name == l.name) {
              u = p
              break
            }
          }
          u || n.push(Bt(e, t, { name: l.name, value: l.value, isSvg: s }))
        }
      }
      return n
    },
    Wt = (e, t) => {
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
                qt(e, t, {
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
          i || s.push(Jt(e, t, { name: d.domEvent, value: d.listener }))
        }),
        s
      )
    },
    Gt = (e) => e.tagName !== 'INPUT',
    Xt = (e, t) => e.value === t.value,
    Yt = (e, t) => {
      if (Gt(e) || Xt(e, t)) return []
      const s = e,
        n = t
      return [Ht(s, n, { name: 'value', value: n.value })]
    },
    Zt = (e, t) => {
      const s = tt(e, t),
        n = Wt(e, t),
        r = Yt(e, t)
      return s.concat(n).concat(r)
    },
    Ct = (e, t) => tt(e, t, !0),
    te = (e, t) => (e.textContent !== t.textContent ? [Lt(e, t)] : []),
    ee = (e, t, s) => {
      let n = []
      if (e.nodeType === 1 && ct(e)) {
        const r = e,
          o = t,
          c = Ct(r, o),
          h = s(r.childNodes, o.childNodes, r)
        n = c.concat(h)
      } else if (e.nodeType === 1) {
        const r = e,
          o = t,
          c = Zt(r, o),
          h = s(r.childNodes, o.childNodes, r)
        n = c.concat(h)
      } else e.nodeType === 3 && (n = te(e, t))
      return n
    },
    et = (e, t, s) => {
      const n = [],
        r = se(e, t),
        o = C(e),
        c = C(t),
        h = []
      let i = 0
      for (; i < r; i++) {
        const u = e[i],
          l = t[i]
        if (l && c.check(l)) {
          const p = o.pullMatch(l)
          c.clear(l),
            p.element
              ? (p.index !== i && n.push(x(p.element, { parent: s, index: i })),
                h.push({ source: p.element, target: l }))
              : u
                ? c.check(u)
                  ? n.push(x(l, { parent: s, index: i }))
                  : (o.clear(u), n.push(Pt(u, l)))
                : n.push(x(l, { parent: s, index: i }))
        } else u && o.pullMatch(u).element && n.push(Y(u))
      }
      o.remaining().forEach(({ element: u }) => {
        n.push(Y(u))
      })
      const d = h.reduce(
        (u, { source: l, target: p }) => u.concat(ee(l, p, et)),
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
      ;(fe[e.type] || oe)(e)
    },
    oe = (e) => {},
    ie = (e) => {
      const { source: t, target: s } = e
      t.nodeValue = s.textContent
    },
    ae = (e) => {
      const { source: t } = e
      t.remove()
    },
    ce = (e) => {
      const { target: t, data: s } = e,
        { parent: n, index: r } = s,
        o = n.childNodes[r]
      o ? o && o !== t && n.insertBefore(t, o) : n.appendChild(t)
    },
    ue = (e) => {
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
    be = (e) => {
      const t = e.data,
        s = e.source,
        { value: n } = t
      s.value = n
    },
    fe = {
      [a.changeText]: ie,
      [a.removeNode]: ae,
      [a.insertNode]: ce,
      [a.replaceNode]: ue,
      [a.removeAttribute]: he,
      [a.addAttribute]: st,
      [a.updateAttribute]: le,
      [a.removeEvent]: de,
      [a.addEvent]: pe,
      [a.updateEvent]: me,
      [a.changeValue]: be,
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
      return `${w}:${t}`
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
          extractQueryParams: z,
          findHref: T,
          navigate: D,
          onLinkClick: U,
          onLocationChange: L,
          start: Nt,
        },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    )
  ;(m.JaxsTypes = zt),
    (m.appBuilding = jt),
    (m.bind = ye),
    (m.createApp = Ut),
    (m.jsx = O),
    (m.messageBus = kt),
    (m.navigation = Ee),
    (m.state = Tt),
    Object.defineProperty(m, Symbol.toStringTag, { value: 'Module' })
})