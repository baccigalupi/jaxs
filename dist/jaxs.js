const tt = (e, t) => t.createElement(e), et = (e, t) => {
  for (const s in t) {
    if (s === "__self") continue;
    const n = t[s].toString();
    s === "value" ? e.value = n : e.setAttribute(s, n);
  }
}, st = (e, t, s) => {
  const n = {};
  for (const r in t) {
    const o = t[r], a = (h) => s(o, h);
    e.addEventListener(r, a), n[r] = {
      domEvent: r,
      busEvent: o,
      listener: a
    };
  }
  e.eventMaps = n;
}, nt = (e, t, s, n) => {
  const r = tt(e, n.document);
  return et(r, t), st(r, s, n.publish), r;
}, N = "http://www.w3.org/2000/svg", rt = (e) => e === "svg", ot = (e, t, s) => {
  const n = s.createElementNS(N, e);
  for (const r in t)
    r === "__self" || r === "xmlns" || n.setAttributeNS(null, r, t[r].toString());
  return n;
}, it = (e) => e.namespaceURI === N, at = (e, t) => t.createTextNode(e);
class ct {
  constructor(t) {
    this.value = t.toString(), this.isSvg = !1;
  }
  render(t) {
    const s = at(this.value, t.document);
    return s.__jsx = "TextNode", [s];
  }
}
const ut = (e) => typeof e == "string" || typeof e == "number", ht = (e) => new ct(e), lt = (e) => ut(e) ? ht(e) : e, dt = (e) => (t) => (t && (t.isSvg = t.isSvg || e), t), pt = (e, t) => mt(e).map(lt).flat().map(dt(t)), mt = (e) => Array.isArray(e) ? e.flat() : e ? [e] : [], j = (e, t = {}) => e || t.children || [], bt = (e, t = "") => {
  const s = {}, n = {};
  for (const r in e) {
    const o = e[r];
    if (r.match(/^on.+/i)) {
      const a = r.slice(2).toLowerCase();
      n[a] = o ? o.toString() : "";
    } else {
      if (o === !1) continue;
      r === "__source" ? s.__source = e.__source : s[r] = ft(r, o, t);
    }
  }
  return {
    attributes: s,
    events: n
  };
}, ft = (e, t, s = "") => t == null ? s : t.toString(), vt = (e, t) => {
  const s = e || {}, n = j(t, s);
  return s.children = s.children || n, s;
}, k = (e, t, s = []) => e.reduce(gt(t), s).flat(), gt = (e) => (t, s) => s ? Array.isArray(s) ? k(s, e, t) : (s.render(e).forEach((n) => t.push(n)), t) : t;
class O {
  constructor(t, s = !1) {
    this.collection = pt(t, s), this.isSvg = s;
  }
  render(t, s) {
    this.parentElement = s;
    const n = this.generateDom(t);
    return this.attachToParent(n), n;
  }
  generateDom(t) {
    return k(this.collection, t);
  }
  attachToParent(t) {
    if (this.parentElement === void 0) return;
    const s = this.parentElement;
    t.forEach((n) => s.appendChild(n));
  }
}
class yt {
  constructor(t, s) {
    this.type = t, this.attributes = s;
  }
  generate() {
    return this.attributes.key || this.sourceKey() || this.createKeyFromAttributes();
  }
  sourceKey() {
    if (this.attributes.__source) {
      const { fileName: t, lineNumber: s, columnNumber: n } = this.attributes.__source;
      return `${t}:${s}:${n}`;
    }
  }
  createKeyFromAttributes() {
    const t = this.attributes.id ? `#${this.attributes.id}` : "", s = this.attributes.type ? `[type=${this.attributes.type}]` : "", n = this.attributes.name ? `[name=${this.attributes.name}]` : "";
    return `${this.type}${t}${s}${n}`;
  }
}
class Et {
  constructor(t, s, n = [], r = !1) {
    this.type = t;
    const { events: o, attributes: a } = bt(s);
    this.events = o, this.attributes = a, this.isSvg = r || rt(this.type), this.children = new O(n, this.isSvg);
  }
  render(t) {
    const s = this.generateDom(t);
    return s ? (this.children.render(t, s), [s]) : [];
  }
  generateDom(t) {
    return this.isSvg ? this.generateSvgDom(t) : this.generateHtmlDom(t);
  }
  generateHtmlDom(t) {
    const s = nt(
      this.type,
      this.attributes,
      this.events,
      t
    );
    return s.__jsx = this.jsxKey(), s;
  }
  generateSvgDom(t) {
    const s = ot(this.type, this.attributes, t.document);
    return s.__jsx = this.jsxKey(), s;
  }
  jsxKey() {
    return new yt(this.type, this.attributes).generate();
  }
}
const xt = (e, t, ...s) => typeof e == "string" ? new Et(e, t, s) : e(vt(t, s));
xt.fragment = (e, t) => {
  const s = j(t, e);
  return new O(s);
};
class At {
  constructor(t, s, n) {
    this.template = t, this.selector = s, this.renderKit = n, this.dom = [];
  }
  renderAndAttach(t) {
    this.parentElement = this.getParentElement(), this.dom = this.render({ ...t, parent: this.parentElement }), this.parentElement && this.attach();
  }
  render(t) {
    return this.template.render(t);
  }
  attach() {
    this.parentElement && (this.parentElement.innerHTML = ""), this.dom.forEach((t) => {
      this.parentElement && this.parentElement.appendChild(t);
    });
  }
  getParentElement() {
    return this.renderKit.document.querySelector(this.selector);
  }
}
const wt = (e, t, s) => {
  const n = new At(e, t, s);
  return n.renderAndAttach(s), n;
}, $ = "go-to-href", m = "navigation:location-change", M = "navigation:route-change", St = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  linkNavigationEvent: $,
  locationChangeEvent: m,
  routeChangeEvent: M
}, Symbol.toStringTag, { value: "Module" })), F = (e) => {
  e.createRecord("route", {
    host: "",
    path: "",
    query: {}
  });
}, T = (e) => {
  const t = e.closest("[href]");
  return t && t.getAttribute("href") || "";
}, D = (e, { publish: t, window: s }) => {
  s.history.pushState(null, "", e), t(m, null);
}, U = (e, t) => {
  if (!e || !e.target) return;
  e.preventDefault();
  const s = T(e.target);
  D(s, t);
}, z = (e) => e.replace(/^\?/, "").split("&").reduce((t, s) => {
  if (!s) return t;
  const n = s.split("=");
  return t[n[0]] = n[1], t;
}, {}), L = (e, t) => {
  const { state: s, publish: n, window: r } = t, { host: o, pathname: a, search: h } = r.location, i = a, d = z(h), u = {
    host: o,
    path: i,
    query: d
  };
  s.store("route").update(u), n(M, u);
}, P = (e) => {
  const { subscribe: t } = e;
  t($, U);
}, V = (e) => {
  const { publish: t, subscribe: s, state: n, window: r } = e;
  F(n), r.addEventListener("popstate", () => t(m, null)), s(m, L);
}, B = (e) => {
  setTimeout(() => e.publish(m, null), 0);
}, K = (e) => {
  V(e), P(e), B(e);
}, _t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  publishLocation: B,
  startNavigation: K,
  subscribeToHistoryChange: V,
  subscribeToNavigation: P
}, Symbol.toStringTag, { value: "Module" }));
class R {
  constructor({ window: t, document: s, publish: n, subscribe: r, bus: o, state: a, renderKit: h }) {
    this.window = t, this.document = s, this.publish = n, this.subscribe = r, this.bus = o, this.state = a, this.renderKit = h, this.roots = [];
  }
  render(t, s) {
    const n = wt(t, s, this.renderKit);
    return this.roots.push(n), n;
  }
  startNavigation() {
    K(this);
  }
}
const pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  App: R
}, Symbol.toStringTag, { value: "Module" }));
class J {
  constructor() {
    this.lookup = {};
  }
  add(t, s, n) {
    this.ensureArrayFor(t);
    const r = {
      listener: s,
      index: n,
      matcher: t
    };
    return this.lookup[t].push(r), () => this.remove(r);
  }
  remove(t) {
    this.lookup[t.matcher] && (this.lookup[t.matcher] = this.lookup[t.matcher].reduce((s, n) => (n !== t && s.push(n), s), []));
  }
  matches(t) {
    return this.lookup[t] || [];
  }
  ensureArrayFor(t) {
    this.lookup[t] || (this.lookup[t] = []);
  }
}
class q {
  constructor() {
    this.lookup = [];
  }
  add(t, s, n) {
    const r = {
      listener: s,
      index: n,
      matcher: t
    };
    return this.lookup.push(r), () => this.remove(r);
  }
  remove(t) {
    this.lookup = this.lookup.reduce((s, n) => (n !== t && s.push(n), s), []);
  }
  matches(t) {
    return this.lookup.filter(
      (s) => s.matcher.test(t)
    );
  }
}
class H {
  constructor() {
    this.exactSubscriptions = new J(), this.fuzzySubscriptions = new q(), this.currentIndex = 0;
  }
  subscribe(t, s) {
    let n;
    return typeof t == "string" ? n = this.exactSubscriptions.add(
      t,
      s,
      this.currentIndex
    ) : n = this.fuzzySubscriptions.add(
      t,
      s,
      this.currentIndex
    ), this.currentIndex += 1, n;
  }
  publish(t, s) {
    [
      ...this.exactSubscriptions.matches(t),
      ...this.fuzzySubscriptions.matches(t)
    ].sort((r, o) => r.index - o.index).forEach((r) => {
      r.listener(s, this.listenerOptions(t));
    });
  }
  addListenerOptions(t) {
    this.options = t;
  }
  listenerOptions(t) {
    return {
      eventName: t,
      ...this.options,
      publish: this.publish.bind(this)
    };
  }
}
const I = () => {
  const e = new H();
  return {
    bus: e,
    publish: (n, r) => e.publish(n, r),
    subscribe: (n, r) => e.subscribe(n, r)
  };
}, me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ExactSubscriptions: J,
  FuzzySubscriptions: q,
  JaxsBus: H,
  createBus: I
}, Symbol.toStringTag, { value: "Module" })), b = (e) => Array.isArray(e), g = (e) => e !== null && !b(e) && typeof e == "object", Nt = (e, t) => e === t, jt = (e, t) => Object.keys(e).length === Object.keys(t).length, kt = (e, t) => !(g(e) && g(t)) || !jt(e, t) ? !1 : Object.keys(e).every((s) => {
  const n = e[s], r = t[s];
  return E(n, r);
}), Ot = (e, t) => !(b(e) && b(t)) || e.length !== t.length ? !1 : e.every((s, n) => {
  const r = t[n];
  return E(s, r);
}), E = (e, t) => g(e) ? kt(e, t) : b(e) ? Ot(e, t) : Nt(e, t);
class f {
  constructor(t) {
    this.store = t;
  }
  update(t) {
    this.store.update(t);
  }
  reset() {
    this.store.update(this.store.initialState);
  }
  get value() {
    return this.store.value;
  }
  addUpdaterFunction(t, s) {
    this.constructor.prototype[t] = (...n) => {
      const r = s(this.value, ...n);
      this.update(r);
    };
  }
  addUpdaterFunctions(t) {
    for (const s in t)
      this.addUpdaterFunction(s, t[s]);
  }
}
class x extends f {
  addUpdaterFunction(t, s) {
    this.constructor.prototype[t] = (...n) => {
      const r = s(this.value, ...n);
      this.update(r);
    };
  }
  push(t) {
    const s = [...this.value, t];
    this.update(s);
  }
  pop() {
    const t = [...this.value], s = t.pop();
    return this.update(t), s;
  }
  unshift(t) {
    const s = [t, ...this.value];
    this.update(s);
  }
  shift() {
    const t = [...this.value], s = t.shift();
    return this.update(t), s;
  }
  addSorter(t, s) {
    this[t] = () => {
      this.sortBy(s);
    };
  }
  sortBy(t) {
    const s = [...this.value];
    s.sort(t), this.update(s);
  }
  insertAt(t, s) {
    const n = [...this.value];
    n.splice(t, 0, s), this.update(n);
  }
}
class y {
  constructor(t) {
    this.name = t.name, this.parent = t.parent, this._value = t.value, this.initialState = structuredClone(t.value), this.updater = new f(this);
  }
  get value() {
    return this._value;
  }
  set value(t) {
    throw new Error("Cannot set value directly. Use an updater!");
  }
  update(t) {
    if (typeof t == "function") {
      const s = this.getUpdatedValue(t);
      this.updateValue(s);
    } else
      this.updateValue(t);
  }
  updateValue(t) {
    E(this._value, t) || (this._value = t, this.parent.notify(this.name));
  }
  getUpdatedValue(t) {
    return t(this.value);
  }
  addUpdaters(t) {
    this.updater.addUpdaterFunctions(t);
  }
  addUpdater(t, s) {
    this.updater.addUpdaterFunction(t, s);
  }
  addSorter(t, s) {
    this.updater instanceof x && this.updater.addSorter(t, s);
  }
}
class Q extends f {
  toggle() {
    const t = !this.value;
    this.update(t);
  }
  setTrue() {
    this.update(!0);
  }
  setFalse() {
    this.update(!1);
  }
  addUpdaterFunction(t, s) {
    this.constructor.prototype[t] = (...n) => {
      const r = s(this.value, ...n);
      this.update(r);
    };
  }
}
class W extends f {
  addUpdaterFunction(t, s) {
    this.constructor.prototype[t] = (...n) => {
      const r = s(this.value, ...n);
      this.update(r);
    };
  }
  updateAttribute(t, s) {
    const n = { ...this.value };
    n[t] = s, this.update(n);
  }
}
const A = "state";
class G {
  constructor(t) {
    this.publisher = t, this.stores = {}, this.eventNamePrefix = A, this.notifications = /* @__PURE__ */ new Set(), this.inTransaction = !1;
  }
  create(t, s) {
    const n = new y({
      name: t,
      parent: this,
      value: s
    });
    return this.stores[t] = n, n;
  }
  createBoolean(t, s) {
    const n = this.create(t, s);
    return n.updater = new Q(n), n;
  }
  createRecord(t, s) {
    const n = this.create(t, s);
    return n.updater = new W(n), n;
  }
  createList(t, s) {
    const n = this.create(t, s);
    return n.updater = new x(n), n;
  }
  store(t) {
    return this.stores[t] || new y({
      name: t,
      parent: this,
      value: void 0
    });
  }
  get(t) {
    return this.store(t).value;
  }
  getAll(t) {
    return t.reduce((s, n) => (s[n] = this.get(n), s), {});
  }
  notify(t) {
    this.inTransaction ? this.notifications.add(t) : this.publish(t);
  }
  update(t, s) {
    this.store(t).update(s);
  }
  transaction(t) {
    this.inTransaction = !0, t(this.stores), this.inTransaction = !1, this.publishAll();
  }
  publishAll() {
    this.notifications.forEach((t) => {
      this.publish(t);
    }), this.notifications.clear();
  }
  publish(t) {
    this.publisher(this.event(t), {
      state: this,
      store: this.store(t)
    });
  }
  event(t) {
    return `${this.eventNamePrefix}:${t}`;
  }
}
const X = (e) => new G(e), be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BooleanUpdater: Q,
  JaxsState: G,
  JaxsStore: y,
  ListUpdater: x,
  ObjectUpdater: W,
  createState: X,
  eventName: A
}, Symbol.toStringTag, { value: "Module" }));
class $t {
  constructor(t) {
    this.setupDomEnvironment(t);
  }
  setup() {
    return this.setupBus(), this.setupState(), this.addBusOptions(), this.setRenderKit(), new R({
      window: this.window,
      document: this.document,
      publish: this.publish,
      subscribe: this.subscribe,
      bus: this.bus,
      state: this.state,
      renderKit: this.renderKit
    });
  }
  setupDomEnvironment(t) {
    t.window ? (this.window = t.window, this.document = this.window.document) : t.document ? (this.window = t.document.defaultView, this.document = t.document) : (this.window = window, this.document = document);
  }
  setupBus() {
    const { publish: t, subscribe: s, bus: n } = I();
    this.publish = t, this.subscribe = s, this.bus = n;
  }
  setupState() {
    this.state = X(this.publish);
  }
  addBusOptions() {
    this.bus.addListenerOptions({
      state: this.state,
      document: this.document,
      window: this.window
    });
  }
  setRenderKit() {
    this.renderKit = {
      publish: this.publish,
      subscribe: this.subscribe,
      state: this.state,
      document: this.document,
      window: this.window
    };
  }
}
const fe = (e = {}) => {
  const s = new $t(e).setup();
  return s.startNavigation(), s;
};
var c = /* @__PURE__ */ ((e) => (e[e.removeNode = 0] = "removeNode", e[e.insertNode = 1] = "insertNode", e[e.replaceNode = 2] = "replaceNode", e[e.removeAttribute = 3] = "removeAttribute", e[e.addAttribute = 4] = "addAttribute", e[e.updateAttribute = 5] = "updateAttribute", e[e.removeEvent = 6] = "removeEvent", e[e.addEvent = 7] = "addEvent", e[e.updateEvent = 8] = "updateEvent", e[e.changeValue = 9] = "changeValue", e[e.changeText = 10] = "changeText", e))(c || {});
const ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ChangeInstructionTypes: c
}, Symbol.toStringTag, { value: "Module" })), Mt = (e, t) => ({
  source: e,
  target: t,
  type: c.changeText,
  data: {}
}), Ft = (e, t) => ({
  source: e,
  target: t,
  type: c.replaceNode,
  data: {}
}), Tt = (e, t, s) => ({
  source: e,
  target: t,
  data: s,
  type: c.removeAttribute
}), Dt = (e, t, s) => ({
  source: e,
  target: t,
  data: s,
  type: c.addAttribute
}), Ut = (e, t, s) => ({
  source: e,
  target: t,
  data: s,
  type: c.updateAttribute
}), zt = (e, t, s) => ({
  source: e,
  target: t,
  data: s,
  type: c.removeEvent
}), Lt = (e, t, s) => ({
  source: e,
  target: t,
  data: s,
  type: c.addEvent
}), Pt = (e, t, s) => ({
  source: e,
  target: t,
  data: s,
  type: c.updateEvent
}), w = (e) => ({
  source: e,
  target: e,
  // for type crap only
  type: c.removeNode,
  data: {}
}), v = (e, t) => ({
  target: e,
  source: e,
  // for type crap only
  type: c.insertNode,
  data: t
}), Vt = (e, t, s) => ({
  source: e,
  target: t,
  type: c.changeValue,
  data: s
}), Bt = (e, t) => e.type > t.type ? 1 : e.type < t.type ? -1 : 0, S = { index: -1 };
class Kt {
  constructor() {
    this.map = {};
  }
  populate(t) {
    t.forEach((s, n) => {
      const r = s.__jsx;
      r && (this.map[r] = this.map[r] || [], this.map[r].push({
        element: s,
        index: n
      }));
    });
  }
  pullMatch(t) {
    const s = t && t.__jsx;
    return !s || !(this.map[s] && this.map[s].length) ? S : this.map[s].shift();
  }
  clear(t) {
    const s = t && t.__jsx;
    if (!(s && this.map[s] && this.map[s].length)) return;
    const n = this.map[s];
    this.map[s] = n.reduce((r, o) => (o.element !== t && r.push(o), r), []);
  }
  check(t) {
    const s = t && t.__jsx;
    return s && this.map[s] ? this.map[s].length > 0 : !1;
  }
  remaining() {
    return Object.values(this.map).flat();
  }
}
const _ = (e) => {
  const t = new Kt();
  return t.populate(e), t;
}, Y = (e, t, s = !1) => {
  const n = [], r = e.attributes, o = r.length, a = t.attributes, h = a.length;
  let i, d, u;
  for (i = 0; i < o; i++) {
    u = null;
    const l = r.item(i);
    if (l) {
      for (d = 0; d < h; d++) {
        const p = a.item(d);
        if (p && l.name == p.name) {
          u = p;
          break;
        }
      }
      u ? l.value !== u.value && n.push(
        Ut(e, t, {
          name: l.name,
          value: u.value,
          isSvg: s
        })
      ) : n.push(
        Tt(e, t, { name: l.name, isSvg: s })
      );
    }
  }
  for (i = 0; i < h; i++) {
    u = null;
    const l = a.item(i);
    if (l) {
      for (d = 0; d < o; d++) {
        const p = r.item(d);
        if (p && p.name == l.name) {
          u = p;
          break;
        }
      }
      u || n.push(
        Dt(e, t, {
          name: l.name,
          value: l.value,
          isSvg: s
        })
      );
    }
  }
  return n;
}, Rt = (e, t) => {
  const s = [], n = e.eventMaps, r = t.eventMaps, o = Object.keys(n), a = Object.keys(r);
  return o.forEach((h) => {
    const i = n[h], d = r[h];
    d ? d.busEvent !== i.busEvent && s.push(
      Pt(e, t, {
        name: h,
        targetValue: d.listener,
        sourceValue: i.listener
      })
    ) : s.push(
      zt(e, t, {
        name: i.domEvent,
        value: i.listener
      })
    );
  }), a.forEach((h) => {
    const i = n[h], d = r[h];
    i || s.push(
      Lt(e, t, {
        name: d.domEvent,
        value: d.listener
      })
    );
  }), s;
}, Jt = (e) => e.tagName !== "INPUT", qt = (e, t) => e.value === t.value, Ht = (e, t) => {
  if (Jt(e) || qt(e, t))
    return [];
  const s = e, n = t;
  return [Vt(s, n, { name: "value", value: n.value })];
}, It = (e, t) => {
  const s = Y(e, t), n = Rt(e, t), r = Ht(e, t);
  return s.concat(n).concat(r);
}, Qt = (e, t) => Y(e, t, !0), Wt = (e, t) => e.textContent !== t.textContent ? [Mt(e, t)] : [], Gt = (e, t, s) => {
  let n = [];
  if (e.nodeType === 1 && it(e)) {
    const r = e, o = t, a = Qt(r, o), h = s(
      r.childNodes,
      o.childNodes,
      r
    );
    n = a.concat(h);
  } else if (e.nodeType === 1) {
    const r = e, o = t, a = It(r, o), h = s(
      r.childNodes,
      o.childNodes,
      r
    );
    n = a.concat(h);
  } else e.nodeType === 3 && (n = Wt(e, t));
  return n;
}, Z = (e, t, s) => {
  const n = [], r = Xt(e, t), o = _(e), a = _(t), h = [];
  let i = 0;
  for (; i < r; i++) {
    const u = e[i], l = t[i];
    if (l && a.check(l)) {
      const p = o.pullMatch(l);
      a.clear(l), p.element ? (p.index !== i && n.push(
        v(p.element, {
          parent: s,
          index: i
        })
      ), h.push({
        source: p.element,
        target: l
      })) : u ? a.check(u) ? n.push(
        v(l, { parent: s, index: i })
      ) : (o.clear(u), n.push(
        Ft(u, l)
      )) : n.push(
        v(l, { parent: s, index: i })
      );
    } else u && o.pullMatch(u).element && n.push(w(u));
  }
  o.remaining().forEach(({ element: u }) => {
    n.push(w(u));
  });
  const d = h.reduce(
    (u, { source: l, target: p }) => u.concat(
      Gt(l, p, Z)
    ),
    []
  );
  return n.concat(d).sort(Bt);
}, Xt = (e, t) => {
  const s = e.length, n = t.length;
  return s > n ? s : n;
}, Yt = (e, t, s) => {
  Z(e, t, s).forEach((r) => {
    Zt(r);
  });
}, Zt = (e) => {
  (he[e.type] || Ct)(e);
}, Ct = (e) => {
}, te = (e) => {
  const { source: t, target: s } = e;
  t.nodeValue = s.textContent;
}, ee = (e) => {
  const { source: t } = e;
  t.remove();
}, se = (e) => {
  const { target: t, data: s } = e, { parent: n, index: r } = s, o = n.childNodes[r];
  o ? o && o !== t && n.insertBefore(t, o) : n.appendChild(t);
}, ne = (e) => {
  const { source: t, target: s } = e;
  t.replaceWith(s);
}, re = (e) => {
  const { source: t, data: s } = e, { name: n, isSvg: r } = s;
  r ? t.removeAttributeNS(null, n) : t.removeAttribute(n);
}, C = (e) => {
  const { source: t, data: s } = e, { name: n, value: r, isSvg: o } = s;
  o ? t.setAttributeNS(null, n, r) : t.setAttribute(n, r);
}, oe = (e) => {
  C(e);
}, ie = (e) => {
  const t = e.data, s = e.source, { name: n, value: r } = t;
  s.removeEventListener(n, r);
}, ae = (e) => {
  const t = e.data, s = e.source, { name: n, value: r } = t;
  s.addEventListener(n, r);
}, ce = (e) => {
  const t = e.data, s = e.source, { name: n, sourceValue: r, targetValue: o } = t;
  s.removeEventListener(n, r), s.addEventListener(n, o);
}, ue = (e) => {
  const t = e.data, s = e.source, { value: n } = t;
  s.value = n;
}, he = {
  [c.changeText]: te,
  [c.removeNode]: ee,
  [c.insertNode]: se,
  [c.replaceNode]: ne,
  [c.removeAttribute]: re,
  [c.addAttribute]: C,
  [c.updateAttribute]: oe,
  [c.removeEvent]: ie,
  [c.addEvent]: ae,
  [c.updateEvent]: ce,
  [c.changeValue]: ue
};
class le {
  constructor({ Template: t, subscriptions: s, attributes: n, viewModel: r }) {
    this.Template = t, this.viewModel = r, this.attributes = n, this.subscriptions = s, this.dom = [], this.parentElement = null;
  }
  render(t) {
    return this.parentElement = t.parent, this.renderKit = t, this.subscribeForRerender(), this.dom = this.generateDom(t), this.dom;
  }
  generateDom(t) {
    const s = {
      ...this.attributes,
      ...this.viewModel(
        t.state.getAll(this.subscriptions)
      )
    }, n = this.Template(s);
    return n ? n.render(t) : [];
  }
  rerender() {
    if (!this.parentElement && this.dom[0]) {
      const s = this.dom[0].parentElement;
      this.parentElement = s;
    }
    const t = this.generateDom(this.renderKit);
    Yt(this.dom, t, this.parentElement), this.parentElement && (this.dom = Array.from(this.parentElement.childNodes));
  }
  subscribeForRerender() {
    const { subscribe: t } = this.renderKit;
    this.subscriptions.forEach((s) => {
      t(this.eventName(s), () => this.rerender());
    });
  }
  eventName(t) {
    return `${A}:${t}`;
  }
}
const de = (e) => e, ge = ({
  Template: e,
  viewModel: t,
  subscriptions: s
}) => (s = s || [], t = t || de, (n) => new le({ Template: e, viewModel: t, subscriptions: s, attributes: n })), ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRouteState: F,
  events: St,
  extractQueryParams: z,
  findHref: T,
  navigate: D,
  onLinkClick: U,
  onLocationChange: L,
  start: _t
}, Symbol.toStringTag, { value: "Module" }));
export {
  ve as JaxsTypes,
  pe as appBuilding,
  ge as bind,
  fe as createApp,
  xt as jsx,
  me as messageBus,
  ye as navigation,
  be as state
};
