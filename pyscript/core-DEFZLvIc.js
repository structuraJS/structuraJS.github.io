const e = (e, t, n = globalThis) => {
  const r = Symbol.for(e),
    s = r in n;
  return [s ? n[r] : Object.defineProperty(n, r, { value: t })[r], s];
};
Promise.withResolvers ||
  (Promise.withResolvers = function () {
    var e,
      t,
      n = new this(function (n, r) {
        (e = n), (t = r);
      });
    return { resolve: e, reject: t, promise: n };
  });
const t = (e, t = document) => [...t.querySelectorAll(e)],
  n = (e, t = document) => {
    const n = new XPathEvaluator()
        .createExpression(e)
        .evaluate(t, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE),
      r = [];
    for (let e = 0, { snapshotLength: t } = n; e < t; e++)
      r.push(n.snapshotItem(e));
    return r;
  },
  r = Object.getOwnPropertyDescriptors(Response.prototype),
  s = (e) => "function" == typeof e,
  o = {
    get: (e, t) =>
      r.hasOwnProperty(t)
        ? ((e, t, { get: n, value: r }) =>
            n || !s(r)
              ? e.then((e) => e[t])
              : (...n) => e.then((e) => e[t](...n)))(e, t, r[t])
        : ((e, t) => (s(t) ? t.bind(e) : t))(e, e[t]),
  };
var a = (e, ...t) => new Proxy(fetch(e, ...t), o);
const i = "object" == typeof self ? self : globalThis,
  l = (e) =>
    ((e, t) => {
      const n = (t, n) => (e.set(n, t), t),
        r = (s) => {
          if (e.has(s)) return e.get(s);
          const [o, a] = t[s];
          switch (o) {
            case 0:
            case -1:
              return n(a, s);
            case 1: {
              const e = n([], s);
              for (const t of a) e.push(r(t));
              return e;
            }
            case 2: {
              const e = n({}, s);
              for (const [t, n] of a) e[r(t)] = r(n);
              return e;
            }
            case 3:
              return n(new Date(a), s);
            case 4: {
              const { source: e, flags: t } = a;
              return n(new RegExp(e, t), s);
            }
            case 5: {
              const e = n(new Map(), s);
              for (const [t, n] of a) e.set(r(t), r(n));
              return e;
            }
            case 6: {
              const e = n(new Set(), s);
              for (const t of a) e.add(r(t));
              return e;
            }
            case 7: {
              const { name: e, message: t } = a;
              return n(new i[e](t), s);
            }
            case 8:
              return n(BigInt(a), s);
            case "BigInt":
              return n(Object(BigInt(a)), s);
          }
          return n(new i[o](a), s);
        };
      return r;
    })(
      new Map(),
      e
    )(0),
  c = "",
  { toString: p } = {},
  { keys: f } = Object,
  u = (e) => {
    const t = typeof e;
    if ("object" !== t || !e) return [0, t];
    const n = p.call(e).slice(8, -1);
    switch (n) {
      case "Array":
        return [1, c];
      case "Object":
        return [2, c];
      case "Date":
        return [3, c];
      case "RegExp":
        return [4, c];
      case "Map":
        return [5, c];
      case "Set":
        return [6, c];
    }
    return n.includes("Array") ? [1, n] : n.includes("Error") ? [7, n] : [2, n];
  },
  d = ([e, t]) => 0 === e && ("function" === t || "symbol" === t),
  h = (e, { json: t, lossy: n } = {}) => {
    const r = [];
    return (
      ((e, t, n, r) => {
        const s = (e, t) => {
            const s = r.push(e) - 1;
            return n.set(t, s), s;
          },
          o = (r) => {
            if (n.has(r)) return n.get(r);
            let [a, i] = u(r);
            switch (a) {
              case 0: {
                let t = r;
                switch (i) {
                  case "bigint":
                    (a = 8), (t = r.toString());
                    break;
                  case "function":
                  case "symbol":
                    if (e) throw new TypeError("unable to serialize " + i);
                    t = null;
                    break;
                  case "undefined":
                    return s([-1], r);
                }
                return s([a, t], r);
              }
              case 1: {
                if (i) return s([i, [...r]], r);
                const e = [],
                  t = s([a, e], r);
                for (const t of r) e.push(o(t));
                return t;
              }
              case 2: {
                if (i)
                  switch (i) {
                    case "BigInt":
                      return s([i, r.toString()], r);
                    case "Boolean":
                    case "Number":
                    case "String":
                      return s([i, r.valueOf()], r);
                  }
                if (t && "toJSON" in r) return o(r.toJSON());
                const n = [],
                  l = s([a, n], r);
                for (const t of f(r))
                  (!e && d(u(r[t]))) || n.push([o(t), o(r[t])]);
                return l;
              }
              case 3:
                return s([a, r.toISOString()], r);
              case 4: {
                const { source: e, flags: t } = r;
                return s([a, { source: e, flags: t }], r);
              }
              case 5: {
                const t = [],
                  n = s([a, t], r);
                for (const [n, s] of r)
                  (e || (!d(u(n)) && !d(u(s)))) && t.push([o(n), o(s)]);
                return n;
              }
              case 6: {
                const t = [],
                  n = s([a, t], r);
                for (const n of r) (!e && d(u(n))) || t.push(o(n));
                return n;
              }
            }
            const { message: l } = r;
            return s([a, { name: i, message: l }], r);
          };
        return o;
      })(
        !(t || n),
        !!t,
        new Map(),
        r
      )(e),
      r
    );
  },
  { parse: m, stringify: y } = JSON,
  g = { json: !0, lossy: !0 };
var _ = Object.freeze({
  __proto__: null,
  parse: (e) => l(m(e)),
  stringify: (e) => y(h(e, g)),
});
const w = "64e10b34-2bf7-4616-9668-f99de5aa046e",
  b = "M" + w,
  v = "T" + w,
  E = "array",
  k = "function",
  j = "null",
  x = "number",
  R = "object",
  A = "string",
  T = "symbol",
  S = "undefined",
  N = "apply",
  O = "construct",
  P = "defineProperty",
  I = "deleteProperty",
  $ = "get",
  M = "getOwnPropertyDescriptor",
  F = "getPrototypeOf",
  C = "has",
  W = "isExtensible",
  D = "ownKeys",
  L = "preventExtensions",
  H = "set",
  B = "setPrototypeOf",
  U = "delete",
  { isArray: J } = Array;
let { SharedArrayBuffer: q, window: G } = globalThis,
  { notify: z, wait: Y, waitAsync: V } = Atomics,
  K = null;
V ||
  (V = (e) => ({
    value: new Promise((t) => {
      let n = new Worker(
        "data:application/javascript,onmessage%3D(%7Bdata%3Ab%7D)%3D%3E(Atomics.wait(b%2C0)%2CpostMessage(0))"
      );
      (n.onmessage = t), n.postMessage(e);
    }),
  }));
try {
  new q(4);
} catch (e) {
  q = ArrayBuffer;
  const t = new WeakMap();
  if (G) {
    const e = new Map(),
      {
        prototype: { postMessage: n },
      } = Worker,
      r = (t) => {
        const n = t.data?.[w];
        if (!J(n)) {
          t.stopImmediatePropagation();
          const { id: r, sb: s } = n;
          e.get(r)(s);
        }
      };
    (K = function (e, ...s) {
      const o = e?.[w];
      if (J(o)) {
        const [e, n] = o;
        t.set(n, e), this.addEventListener("message", r);
      }
      return n.call(this, e, ...s);
    }),
      (V = (n) => ({
        value: new Promise((r) => {
          e.set(t.get(n), r);
        }).then((r) => {
          e.delete(t.get(n)), t.delete(n);
          for (let e = 0; e < r.length; e++) n[e] = r[e];
          return "ok";
        }),
      }));
  } else {
    const e = (e, t) => ({ [w]: { id: e, sb: t } });
    (z = (n) => {
      postMessage(e(t.get(n), n));
    }),
      addEventListener("message", (e) => {
        const n = e.data?.[w];
        if (J(n)) {
          const [e, r] = n;
          t.set(r, e);
        }
      });
  }
}
/*! (c) Andrea Giammarchi - ISC */ const {
    Int32Array: X,
    Map: Z,
    Uint16Array: Q,
  } = globalThis,
  { BYTES_PER_ELEMENT: ee } = X,
  { BYTES_PER_ELEMENT: te } = Q,
  ne = new WeakSet(),
  re = new WeakMap(),
  se = { value: { then: (e) => e() } };
let oe = 0;
const ae = (
  e,
  {
    parse: t = JSON.parse,
    stringify: n = JSON.stringify,
    transform: r,
    interrupt: s,
  } = JSON
) => {
  if (!re.has(e)) {
    const o = K || e.postMessage,
      a = (t, ...n) => o.call(e, { [w]: n }, { transfer: t }),
      i = typeof s === k ? s : s?.handler,
      l = s?.delay || 42,
      c = new TextDecoder("utf-16"),
      p = (e, t) =>
        e
          ? V(t, 0)
          : (i
              ? ((e, t, n) => {
                  for (; "timed-out" === Y(e, 0, 0, t); ) n();
                })(t, l, i)
              : Y(t, 0),
            se);
    let f = !1;
    re.set(
      e,
      new Proxy(new Z(), {
        [C]: (e, t) => "string" == typeof t && !t.startsWith("_"),
        [$]: (n, s) =>
          "then" === s
            ? null
            : (...n) => {
                const o = oe++;
                let i = new X(new q(2 * ee)),
                  l = [];
                ne.has(n.at(-1) || l) && ne.delete((l = n.pop())),
                  a(l, o, i, s, r ? n.map(r) : n);
                const u = e !== globalThis;
                let d = 0;
                return (
                  f &&
                    u &&
                    (d = setTimeout(
                      console.warn,
                      1e3,
                      `💀🔒 - Possible deadlock if proxy.${s}(...args) is awaited`
                    )),
                  p(u, i).value.then(() => {
                    clearTimeout(d);
                    const e = i[1];
                    if (!e) return;
                    const n = te * e;
                    return (
                      (i = new X(new q(n + (n % ee)))),
                      a([], o, i),
                      p(u, i).value.then(() =>
                        t(c.decode(new Q(i.buffer).slice(0, e)))
                      )
                    );
                  })
                );
              },
        [H](t, s, o) {
          const a = typeof o;
          if (a !== k) throw new Error(`Unable to assign ${s} as ${a}`);
          if (!t.size) {
            const s = new Z();
            e.addEventListener("message", async (e) => {
              const o = e.data?.[w];
              if (J(o)) {
                e.stopImmediatePropagation();
                const [a, i, ...l] = o;
                let c;
                if (l.length) {
                  const [e, o] = l;
                  if (t.has(e)) {
                    f = !0;
                    try {
                      const l = await t.get(e)(...o);
                      if (void 0 !== l) {
                        const e = n(r ? r(l) : l);
                        s.set(a, e), (i[1] = e.length);
                      }
                    } catch (e) {
                      c = e;
                    } finally {
                      f = !1;
                    }
                  } else c = new Error(`Unsupported action: ${e}`);
                  i[0] = 1;
                } else {
                  const e = s.get(a);
                  s.delete(a);
                  for (let t = new Q(i.buffer), n = 0; n < e.length; n++)
                    t[n] = e.charCodeAt(n);
                }
                if ((z(i, 0), c)) throw c;
              }
            });
          }
          return !!t.set(s, o);
        },
      })
    );
  }
  return re.get(e);
};
ae.transfer = (...e) => (ne.add(e), e);
const { isArray: ie } = Array,
  le = (e, t) => t,
  ce = (e) => (typeof e === k ? ((e) => e())(e) : e);
function pe() {
  return this;
}
const fe = (e, t) => (e === E ? [t] : { t: e, v: t }),
  ue = (e, t = le) => {
    let n = typeof e,
      r = e;
    return (
      n === R && (ie(e) ? ((n = E), (r = e.at(0))) : ({ t: n, v: r } = e)),
      t(n, r)
    );
  },
  de = (e, t) => (e === k ? t : fe(e, t)),
  he = (e, t = de) => {
    const n = null === e ? j : typeof e;
    return t(n === R && ie(e) ? E : n, e);
  },
  me = new FinalizationRegistry(([e, t, n]) => {
    n && console.debug(`Held value ${String(t)} not relevant anymore`), e(t);
  }),
  ye = Object.create(null),
  ge = (e, t, { debug: n, handler: r, return: s, token: o = e } = ye) => {
    const a = s || new Proxy(e, r || ye),
      i = [a, [t, e, !!n]];
    return !1 !== o && i.push(o), me.register(...i), a;
  },
  {
    defineProperty: _e,
    deleteProperty: we,
    getOwnPropertyDescriptor: be,
    getPrototypeOf: ve,
    isExtensible: Ee,
    ownKeys: ke,
    preventExtensions: je,
    set: xe,
    setPrototypeOf: Re,
  } = Reflect,
  { assign: Ae, create: Te } = Object,
  Se = ve(Int8Array),
  Ne = (e, t) => {
    const { get: n, set: r, value: s } = e;
    return n && (e.get = t(n)), r && (e.set = t(r)), s && (e.value = t(s)), e;
  },
  Oe = (e) => (t) =>
    he(t, (t, n) => {
      switch (t) {
        case j:
          return fe(j, n);
        case R:
          if (n === globalThis) return fe(t, null);
        case E:
        case k:
          return e(t, n);
        case "boolean":
        case x:
        case A:
        case S:
        case "bigint":
          return fe(t, n);
        case T: {
          if (Pe.has(n)) return fe(t, Pe.get(n));
          let e = Symbol.keyFor(n);
          if (e) return fe(t, `.${e}`);
        }
      }
      throw new TypeError(`Unable to handle this ${t}: ${String(n)}`);
    }),
  Pe = new Map(
    ke(Symbol)
      .filter((e) => typeof Symbol[e] === T)
      .map((e) => [Symbol[e], e])
  ),
  Ie = (e) => {
    if (e.startsWith(".")) return Symbol.for(e.slice(1));
    for (const [t, n] of Pe) if (n === e) return t;
  },
  $e = (e) => e;
var Me = ((e, t) => {
    const n = new WeakMap();
    {
      const { addEventListener: e } = EventTarget.prototype;
      _e(EventTarget.prototype, "addEventListener", {
        value(t, r, ...s) {
          return (
            s.at(0)?.invoke &&
              (n.has(this) || n.set(this, new Map()),
              n.get(this).set(t, [].concat(s[0].invoke)),
              delete s[0].invoke),
            e.call(this, t, r, ...s)
          );
        },
      });
    }
    return function (t, r, s, ...o) {
      let a = 0,
        i = this?.transform || $e;
      const l = new Map(),
        c = new Map(),
        { [s]: p } = t,
        f = o.length ? Ae(Te(globalThis), ...o) : globalThis,
        u = Oe((e, t) => {
          if (!l.has(t)) {
            let n;
            for (; c.has((n = a++)); );
            l.set(t, n), c.set(n, e === k ? t : i(t));
          }
          return fe(e, l.get(t));
        }),
        d = (e) => {
          p(U, fe(A, e));
        },
        h = (e, t) => {
          switch (e) {
            case R:
              if (null == t) return f;
            case E:
              if (typeof t === x) return c.get(t);
              if (!(t instanceof Se)) for (const e in t) t[e] = m(t[e]);
              return t;
            case k:
              if (typeof t === A) {
                const e = c.get(t)?.deref();
                if (e) return e;
                const r = function (...e) {
                  return (
                    e.at(0) instanceof Event &&
                      ((e) => {
                        const { currentTarget: t, target: r, type: s } = e;
                        for (const o of n.get(t || r)?.get(s) || []) e[o]();
                      })(...e),
                    p(N, fe(k, t), u(this), e.map(u))
                  );
                };
                return (
                  c.set(t, new WeakRef(r)), ge(t, d, { return: r, token: !1 })
                );
              }
              return c.get(t);
            case T:
              return Ie(t);
          }
          return t;
        },
        m = (e) => ue(e, h),
        y = {
          [N]: (e, t, n) => u(e.apply(t, n)),
          [O]: (e, t) => u(new e(...t)),
          [P]: (e, t, n) => u(_e(e, t, n)),
          [I]: (e, t) => u(we(e, t)),
          [F]: (e) => u(ve(e)),
          [$]: (e, t) => u(e[t]),
          [M]: (e, t) => {
            const n = be(e, t);
            return n ? fe(R, Ne(n, u)) : fe(S, n);
          },
          [C]: (e, t) => u(t in e),
          [W]: (e) => u(Ee(e)),
          [D]: (e) => fe(E, ke(e).map(u)),
          [L]: (e) => u(je(e)),
          [H]: (e, t, n) => u(xe(e, t, n)),
          [B]: (e, t) => u(Re(e, t)),
          [U](e) {
            l.delete(c.get(e)), c.delete(e);
          },
        };
      return (
        (t[r] = (e, t, ...n) => {
          switch (e) {
            case N:
              (n[0] = m(n[0])), (n[1] = n[1].map(m));
              break;
            case O:
              n[0] = n[0].map(m);
              break;
            case P: {
              const [e, t] = n;
              n[0] = m(e);
              const { get: r, set: s, value: o } = t;
              r && (t.get = m(r)), s && (t.set = m(s)), o && (t.value = m(o));
              break;
            }
            default:
              n = n.map(m);
          }
          return y[e](m(t), ...n);
        }),
        { proxy: t, [e.toLowerCase()]: f, [`is${e}Proxy`]: () => !1 }
      );
    };
  })("Window"),
  Fe = ((e) => {
    let t = 0;
    const n = new Map(),
      r = new Map(),
      s = Symbol();
    return function (o, a, i) {
      const l = this?.transform || $e,
        { [a]: c } = o,
        p = new Map(),
        f = (e) => {
          p.delete(e), c(U, u(e));
        },
        u = Oe((e, o) => {
          if (s in o) return ce(o[s]);
          if (e === k) {
            if (((o = l(o)), !r.has(o))) {
              let e;
              for (; r.has((e = String(t++))); );
              n.set(o, e), r.set(e, o);
            }
            return fe(e, n.get(o));
          }
          if (!(o instanceof Se)) {
            o = l(o);
            for (const e in o) o[e] = u(o[e]);
          }
          return fe(e, o);
        }),
        d = (e, t, n) => {
          const r = p.get(n)?.deref();
          if (r) return r;
          const s = t === k ? ((e) => pe.bind(e))(e) : e,
            o = new Proxy(s, y);
          return p.set(n, new WeakRef(o)), ge(n, f, { return: o, token: !1 });
        },
        h = (e) =>
          ue(e, (t, n) => {
            switch (t) {
              case R:
                if (null === n) return globalThis;
              case E:
                return typeof n === x ? d(e, t, n) : n;
              case k:
                return typeof n === A ? r.get(n) : d(e, t, n);
              case T:
                return Ie(n);
            }
            return n;
          }),
        m = (e, t, ...n) => h(c(e, ce(t), ...n)),
        y = {
          [N]: (e, t, n) => m(N, e, u(t), n.map(u)),
          [O]: (e, t) => m(O, e, t.map(u)),
          [P]: (e, t, n) => {
            const { get: r, set: s, value: o } = n;
            return (
              typeof r === k && (n.get = u(r)),
              typeof s === k && (n.set = u(s)),
              typeof o === k && (n.value = u(o)),
              m(P, e, u(t), n)
            );
          },
          [I]: (e, t) => m(I, e, u(t)),
          [F]: (e) => m(F, e),
          [$]: (e, t) => (t === s ? e : m($, e, u(t))),
          [M]: (e, t) => {
            const n = m(M, e, u(t));
            return n && Ne(n, h);
          },
          [C]: (e, t) => t === s || m(C, e, u(t)),
          [W]: (e) => m(W, e),
          [D]: (e) => m(D, e).map(h),
          [L]: (e) => m(L, e),
          [H]: (e, t, n) => m(H, e, u(t), u(n)),
          [B]: (e, t) => m(B, e, u(t)),
        };
      o[i] = (e, t, s, o) => {
        switch (e) {
          case N:
            return h(t).apply(h(s), o.map(h));
          case U: {
            const e = h(t);
            n.delete(r.get(e)), r.delete(e);
          }
        }
      };
      const g = new Proxy(fe(R, null), y);
      return {
        [e.toLowerCase()]: g,
        [`is${e}Proxy`]: (e) => typeof e === R && !!e && s in e,
        proxy: o,
      };
    };
  })("Window"),
  Ce = typeof Worker === k ? Worker : class {};
const We = new WeakMap(),
  De = (e, ...t) => {
    const n = ae(e, ...t);
    if (!We.has(n)) {
      const r = e instanceof Ce ? Me : Fe;
      We.set(n, r.call(t.at(0), n, b, v));
    }
    return We.get(n);
  };
De.transfer = ae.transfer;
const { url: Le } = import.meta,
  He = /import\((['"])([^)]+?\.js)\1\)/g,
  Be = (e, t, n) => `import(${t}${new URL(n, Le).href}${t})`;
const Ue = {
    object(...e) {
      return this.string(
        (function (e) {
          for (var t = e[0], n = 1, r = arguments.length; n < r; n++)
            t += arguments[n] + e[n];
          return t;
        })(...e)
      );
    },
    string(e) {
      for (const t of e.split(/[\r\n]+/))
        if (t.trim().length) {
          /^(\s+)/.test(t) &&
            (e = e.replace(new RegExp("^" + RegExp.$1, "gm"), ""));
          break;
        }
      return e;
    },
  },
  { replace: Je } = "",
  qe = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,
  Ge = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
  },
  ze = (e) => Ge[e],
  Ye = new WeakMap(),
  Ve = (e) => {
    const t = e || console,
      n = {
        buffered: Xe,
        stderr: (t.stderr || console.error).bind(t),
        stdout: (t.stdout || console.log).bind(t),
      };
    return {
      stderr: (...e) => n.stderr(...e),
      stdout: (...e) => n.stdout(...e),
      async get(e) {
        const t = await e;
        return Ye.set(t, n), t;
      },
    };
  },
  Ke = new TextDecoder(),
  Xe = (e, t = 10) => {
    const n = [];
    return (r) => {
      if (r instanceof Uint8Array)
        for (const s of r)
          s === t ? e(Ke.decode(new Uint8Array(n.splice(0)))) : n.push(s);
      else e(r);
    };
  },
  Ze = (e, ...t) => Ue[typeof e](e, ...t),
  Qe = (e) => Je.call(e, qe, ze),
  { isArray: et } = Array,
  {
    assign: tt,
    create: nt,
    defineProperties: rt,
    defineProperty: st,
    entries: ot,
  } = Object,
  { all: at, resolve: it } = new Proxy(Promise, {
    get: (e, t) => e[t].bind(e),
  }),
  lt = (e, t = location.href) => new URL(e, t.replace(/^blob:/, "")).href;
let ct = 0;
const pt = (e, t) => ({ id: e.id || (e.id = `${t}-w${ct++}`), tag: e.tagName }),
  ft = (e, t, n, r = !1, s = CustomEvent) => {
    e.dispatchEvent(new s(`${t}:${n}`, { bubbles: !0, detail: { worker: r } }));
  },
  ut = (e, t, n, r) => ({
    type: t,
    config: n,
    interpreter: r,
    io: Ye.get(r),
    run: (t, ...n) => e.run(r, t, ...n),
    runAsync: (t, ...n) => e.runAsync(r, t, ...n),
    runEvent: (...t) => e.runEvent(r, ...t),
  }),
  dt = (e) => e.replace(/^(?:\n|\r\n)/, ""),
  ht = (e, t, n, r) => {
    const s = e[t].bind(e);
    e[t] =
      "run" === t
        ? (e, t, ...o) => {
            n && s(e, n, ...o);
            const a = s(e, dt(t), ...o);
            return r && s(e, r, ...o), a;
          }
        : async (e, t, ...o) => {
            n && (await s(e, n, ...o));
            const a = await s(e, dt(t), ...o);
            return r && (await s(e, r, ...o)), a;
          };
  },
  mt = Symbol.for("polyscript.js_modules"),
  yt = new Map();
st(globalThis, mt, { value: yt });
const gt = new Proxy(yt, {
    get: (e, t) => e.get(t),
    has: (e, t) => e.has(t),
    ownKeys: (e) => [...e.keys()],
  }),
  _t = (e, t) => !t.startsWith("_"),
  wt = (e, t) => new Proxy(e, { has: _t, get: (e, n) => e[t][n] }),
  bt = (e, t, n, r) => {
    if ("pyodide" === e) return;
    const s = "polyscript.js_modules";
    for (const e of Reflect.ownKeys(r))
      t.registerJSModule(n, `${s}.${e}`, wt(r, e));
    t.registerJSModule(n, s, r);
  },
  vt = (e, t) =>
    import(e).then((e) => {
      yt.set(t, { ...e });
    }),
  Et = (e) =>
    new Promise((t, n) => {
      document.querySelector(`link[href="${e}"]`) && t(),
        document.head.append(
          tt(document.createElement("link"), {
            rel: "stylesheet",
            href: e,
            onload: t,
            onerror: n,
          })
        );
    }),
  kt = (e) => /\.css/i.test(new URL(e).pathname),
  jt = !globalThis.window,
  xt = ({ FS: e, PATH: t, PATH_FS: n }, r, s) => {
    const o = n.resolve(r),
      a = t.dirname(o);
    return (
      e.mkdirTree ? e.mkdirTree(a) : At(e, a),
      e.writeFile(o, new Uint8Array(s), { canOwn: !0 })
    );
  },
  Rt = (e) => {
    const t = e.split("/");
    return t.pop(), t.join("/");
  },
  At = (e, t) => {
    const n = [];
    for (const r of t.split("/"))
      "." !== r && ".." !== r && (n.push(r), r && e.mkdir(n.join("/")));
  },
  Tt = (e, t) => {
    const n = [];
    for (const e of t.split("/"))
      switch (e) {
        case "":
        case ".":
          break;
        case "..":
          n.pop();
          break;
        default:
          n.push(e);
      }
    return [e.cwd()].concat(n).join("/").replace(/^\/+/, "/");
  },
  St = (e) => {
    const t = e
      .map((e) => e.trim().replace(/(^[/]*|[/]*$)/g, ""))
      .filter((e) => "" !== e && "." !== e)
      .join("/");
    return e[0].startsWith("/") ? `/${t}` : t;
  },
  Nt = (e, t) => a(lt(t, Ot.get(e))).arrayBuffer(),
  Ot = new WeakMap(),
  Pt = (e, t, n) =>
    at(
      ((e) => {
        for (const { files: t, to_file: n, from: r = "" } of e) {
          if (void 0 !== t && void 0 !== n)
            throw new Error(
              "Cannot use 'to_file' and 'files' parameters together!"
            );
          if (void 0 === t && void 0 === n && r.endsWith("/"))
            throw new Error(
              `Couldn't determine the filename from the path ${r}, please supply 'to_file' parameter.`
            );
        }
        return e.flatMap(
          ({ from: e = "", to_folder: t = ".", to_file: n, files: r }) => {
            if (et(r))
              return r.map((n) => ({ url: St([e, n]), path: St([t, n]) }));
            const s = n || e.slice(1 + e.lastIndexOf("/"));
            return [{ url: e, path: St([t, s]) }];
          }
        );
      })(n).map(({ url: r, path: s }) =>
        Nt(n, r).then((n) => e.writeFile(t, s, n))
      )
    ),
  It = (e, t) => (t.endsWith("/") ? `${t}${e.split("/").pop()}` : t),
  $t = (e, t) =>
    e.replace(/\{.+?\}/g, (e) => {
      if (!t.has(e)) throw new SyntaxError(`Invalid template: ${e}`);
      return t.get(e);
    }),
  Mt = (e, t, n) =>
    at(
      ((e) => {
        const t = new Map(),
          n = new Set(),
          r = [];
        for (const [s, o] of ot(e))
          if (/^\{.+\}$/.test(s)) {
            if (t.has(s)) throw new SyntaxError(`Duplicated template: ${s}`);
            t.set(s, $t(o, t));
          } else {
            const e = $t(s, t),
              a = It(e, $t(o || "./", t));
            if (n.has(a)) throw new SyntaxError(`Duplicated destination: ${a}`);
            n.add(a), r.push({ url: e, path: a });
          }
        return r;
      })(n).map(({ url: r, path: s }) =>
        Nt(n, r).then((n) => e.writeFile(t, s, n, r))
      )
    ),
  Ft = ({ main: e, worker: t }) => {
    const n = [];
    if (t && jt)
      for (let [e, r] of ot(t)) (e = lt(e, Ot.get(t))), n.push(vt(e, r));
    if (e && !jt)
      for (let [t, r] of ot(e))
        (t = lt(t, Ot.get(e))), kt(t) ? Et(t) : n.push(vt(t, r));
    return at(n);
  },
  Ct = new WeakMap(),
  Wt = (e, t, n) => {
    "polyscript" === t &&
      (n.lazy_py_modules = async (...t) => (
        await Ct.get(e)(t), t.map((t) => e.pyimport(t))
      )),
      e.registerJsModule(t, n);
  },
  Dt = (e, t) => {
    if (e.endsWith("/*")) {
      if (/\.(zip|tar(?:\.gz)?)$/.test(t)) return RegExp.$1;
      throw new Error(`Unsupported archive ${t}`);
    }
    return "";
  },
  Lt = (e, t, ...n) => {
    try {
      return e.runPython(Ze(t), ...n);
    } catch (t) {
      Ye.get(e).stderr(t);
    }
  },
  Ht = async (e, t, ...n) => {
    try {
      return await e.runPythonAsync(Ze(t), ...n);
    } catch (t) {
      Ye.get(e).stderr(t);
    }
  },
  Bt = async (e, t, n) => {
    const [r, ...s] = t.split(".");
    let o,
      a = e.globals.get(r);
    for (const e of s) [o, a] = [a, a[e]];
    try {
      await a.call(o, n);
    } catch (t) {
      Ye.get(e).stderr(t);
    }
  };
var Ut = new TextEncoder().encode(
  'from uio import StringIO\nimport sys\n\nclass Response:\n    def __init__(self, f):\n        self.raw = f\n        self.encoding = "utf-8"\n        self._cached = None\n\n    def close(self):\n        if self.raw:\n            self.raw.close()\n            self.raw = None\n        self._cached = None\n\n    @property\n    def content(self):\n        if self._cached is None:\n            try:\n                self._cached = self.raw.read()\n            finally:\n                self.raw.close()\n                self.raw = None\n        return self._cached\n\n    @property\n    def text(self):\n        return str(self.content, self.encoding)\n\n    def json(self):\n        import ujson\n\n        return ujson.loads(self.content)\n\n\n# TODO try to support streaming xhr requests, a-la pyodide-http\nHEADERS_TO_IGNORE = ("user-agent",)\n\n\ntry:\n    import js\nexcept Exception as err:\n    raise OSError("This version of urequests can only be used in the browser")\n\n# TODO try to support streaming xhr requests, a-la pyodide-http\n\nHEADERS_TO_IGNORE = ("user-agent",)\n\n\ndef request(\n    method,\n    url,\n    data=None,\n    json=None,\n    headers={},\n    stream=None,\n    auth=None,\n    timeout=None,\n    parse_headers=True,\n):\n    from js import XMLHttpRequest\n\n    xhr = XMLHttpRequest.new()\n    xhr.withCredentials = False\n\n    if auth is not None:\n        import ubinascii\n\n        username, password = auth\n        xhr.open(method, url, False, username, password)\n    else:\n        xhr.open(method, url, False)\n\n    for name, value in headers.items():\n        if name.lower() not in HEADERS_TO_IGNORE:\n            xhr.setRequestHeader(name, value)\n\n    if timeout:\n        xhr.timeout = int(timeout * 1000)\n\n    if json is not None:\n        assert data is None\n        import ujson\n\n        data = ujson.dumps(json)\n        # s.write(b"Content-Type: application/json\\r\\n")\n        xhr.setRequestHeader("Content-Type", "application/json")\n\n    xhr.send(data)\n\n    # Emulates the construction process in the original urequests\n    resp = Response(StringIO(xhr.responseText))\n    resp.status_code = xhr.status\n    resp.reason = xhr.statusText\n    resp.headers = xhr.getAllResponseHeaders()\n\n    return resp\n\n\n# Other methods - head, post, put, patch, delete - are not used by\n# mip and therefore not included\n\n\ndef get(url, **kw):\n    return request("GET", url, **kw)\n\n\n# Content below this line is from the Micropython MIP package and is covered\n# by the applicable MIT license:\n# \n# THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, \n# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \n# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING \n# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER \n# DEALINGS IN THE SOFTWARE.\n\n# MicroPython package installer\n# MIT license; Copyright (c) 2022 Jim Mussared\n\n\n_PACKAGE_INDEX = const("https://micropython.org/pi/v2")\n_CHUNK_SIZE = 128\n\n\n# This implements os.makedirs(os.dirname(path))\ndef _ensure_path_exists(path):\n    import os\n\n    split = path.split("/")\n\n    # Handle paths starting with "/".\n    if not split[0]:\n        split.pop(0)\n        split[0] = "/" + split[0]\n\n    prefix = ""\n    for i in range(len(split) - 1):\n        prefix += split[i]\n        try:\n            os.stat(prefix)\n        except:\n            os.mkdir(prefix)\n        prefix += "/"\n\n\n# Copy from src (stream) to dest (function-taking-bytes)\ndef _chunk(src, dest):\n    buf = memoryview(bytearray(_CHUNK_SIZE))\n    while True:\n        n = src.readinto(buf)\n        if n == 0:\n            break\n        dest(buf if n == _CHUNK_SIZE else buf[:n])\n\n\n# Check if the specified path exists and matches the hash.\ndef _check_exists(path, short_hash):\n    import os\n\n    try:\n        import binascii\n        import hashlib\n\n        with open(path, "rb") as f:\n            hs256 = hashlib.sha256()\n            _chunk(f, hs256.update)\n            existing_hash = str(binascii.hexlify(hs256.digest())[: len(short_hash)], "utf-8")\n            return existing_hash == short_hash\n    except:\n        return False\n\n\ndef _rewrite_url(url, branch=None):\n    if not branch:\n        branch = "HEAD"\n    if url.startswith("github:"):\n        url = url[7:].split("/")\n        url = (\n            "https://raw.githubusercontent.com/"\n            + url[0]\n            + "/"\n            + url[1]\n            + "/"\n            + branch\n            + "/"\n            + "/".join(url[2:])\n        )\n    return url\n\n\ndef _download_file(url, dest):\n    response = get(url)\n    try:\n        if response.status_code != 200:\n            print("Error", response.status_code, "requesting", url)\n            return False\n\n        print("Copying:", dest)\n        _ensure_path_exists(dest)\n        with open(dest, "wb") as f:\n            _chunk(response.raw, f.write)\n\n        return True\n    finally:\n        response.close()\n\n\ndef _install_json(package_json_url, index, target, version, mpy):\n    response = get(_rewrite_url(package_json_url, version))\n    try:\n        if response.status_code != 200:\n            print("Package not found:", package_json_url)\n            return False\n\n        package_json = response.json()\n    finally:\n        response.close()\n    for target_path, short_hash in package_json.get("hashes", ()):\n        fs_target_path = target + "/" + target_path\n        if _check_exists(fs_target_path, short_hash):\n            print("Exists:", fs_target_path)\n        else:\n            file_url = "{}/file/{}/{}".format(index, short_hash[:2], short_hash)\n            if not _download_file(file_url, fs_target_path):\n                print("File not found: {} {}".format(target_path, short_hash))\n                return False\n    for target_path, url in package_json.get("urls", ()):\n        fs_target_path = target + "/" + target_path\n        if not _download_file(_rewrite_url(url, version), fs_target_path):\n            print("File not found: {} {}".format(target_path, url))\n            return False\n    for dep, dep_version in package_json.get("deps", ()):\n        if not _install_package(dep, index, target, dep_version, mpy):\n            return False\n    return True\n\n\ndef _install_package(package, index, target, version, mpy):\n    if (\n        package.startswith("http://")\n        or package.startswith("https://")\n        or package.startswith("github:")\n    ):\n        if package.endswith(".py") or package.endswith(".mpy"):\n            print("Downloading {} to {}".format(package, target))\n            return _download_file(\n                _rewrite_url(package, version), target + "/" + package.rsplit("/")[-1]\n            )\n        else:\n            if not package.endswith(".json"):\n                if not package.endswith("/"):\n                    package += "/"\n                package += "package.json"\n            print("Installing {} to {}".format(package, target))\n    else:\n        if not version:\n            version = "latest"\n        print("Installing {} ({}) from {} to {}".format(package, version, index, target))\n\n        mpy_version = (\n            sys.implementation._mpy & 0xFF if mpy and hasattr(sys.implementation, "_mpy") else "py"\n        )\n\n        package = "{}/package/{}/{}/{}.json".format(index, mpy_version, package, version)\n\n    return _install_json(package, index, target, version, mpy)\n\n\ndef install(package, index=None, target=None, version=None, mpy=True):\n    if not target:\n        for p in sys.path:\n            if p.endswith("/lib"):\n                target = p\n                break\n        else:\n            print("Unable to find lib dir in sys.path")\n            return\n\n    if not index:\n        index = _PACKAGE_INDEX\n\n    if _install_package(package, index.rstrip("/"), target, version, mpy):\n        print("Done")\n    else:\n        print("Package may be partially installed")\n'
);
const Jt = (e, t) => {
  try {
    e.mkdir(t);
  } catch (e) {}
};
var qt = {
  type: "micropython",
  module: (e = "1.22.0-335") =>
    `https://cdn.jsdelivr.net/npm/@micropython/micropython-webassembly-pyscript@${e}/micropython.mjs`,
  async engine({ loadMicroPython: e }, t, n) {
    const {
      stderr: r,
      stdout: s,
      get: o,
    } = Ve({ stderr: Xe(console.error), stdout: Xe(console.log) });
    n = n.replace(/\.m?js$/, ".wasm");
    const a = await o(e({ linebuffer: !1, stderr: r, stdout: s, url: n })),
      i = Gt.bind(a);
    return (
      Ct.set(a, i),
      t.files && (await Mt(this, a, t.files)),
      t.fetch && (await Pt(this, a, t.fetch)),
      t.js_modules && (await Ft(t.js_modules)),
      this.writeFile(a, "./mip.py", Ut),
      t.packages && (await i(t.packages)),
      a
    );
  },
  registerJSModule: Wt,
  run: Lt,
  runAsync: Ht,
  runEvent: Bt,
  transform: (e, t) => e.PyProxy.toJs(t),
  writeFile: (e, t, n, r) => {
    const {
        FS: s,
        _module: { PATH: o, PATH_FS: a },
      } = e,
      i = { FS: s, PATH: o, PATH_FS: a },
      l = Dt(t, r);
    if (l) {
      const r = t.slice(0, -1);
      switch (("./" !== r && s.mkdir(r), l)) {
        case "zip": {
          const e = new Blob([n], { type: "application/zip" });
          return import("./zip-D2yvzXKD.js").then(
            async ({ BlobReader: t, Uint8ArrayWriter: n, ZipReader: a }) => {
              const i = new a(new t(e));
              for (const e of await i.getEntries()) {
                const { directory: t, filename: a } = e,
                  i = r + a;
                if (t) Jt(s, i);
                else {
                  Jt(s, o.dirname(i));
                  const t = await e.getData(new n());
                  s.writeFile(i, t, { canOwn: !0 });
                }
              }
              i.close();
            }
          );
        }
        case "tar.gz": {
          const t = "./_.tar.gz";
          return (
            xt(i, t, n),
            void e.runPython(
              `\n                        import os, gzip, tarfile\n                        tar = tarfile.TarFile(fileobj=gzip.GzipFile(fileobj=open("${t}", "rb")))\n                        for f in tar:\n                            name = f"${r}{f.name}"\n                            if f.type == tarfile.DIRTYPE:\n                                if f.name != "./":\n                                    os.mkdir(name.strip("/"))\n                            else:\n                                dir = os.path.dirname(name)\n                                if not os.path.exists(dir):\n                                    os.mkdir(dir)\n                                source = tar.extractfile(f)\n                                with open(name, "wb") as dest:\n                                    dest.write(source.read())\n                                    dest.close()\n                        tar.close()\n                        os.remove("${t}")\n                    `
            )
          );
        }
      }
    }
    return xt(i, t, n);
  },
};
async function Gt(e) {
  const t = this.pyimport("mip");
  for (const n of e) t.install(n);
}
const zt = { dict_converter: Object.fromEntries };
let Yt = !1;
const Vt =
  (e) =>
  (...t) => {
    try {
      return (Yt = !0), e(...t);
    } finally {
      Yt = !1;
    }
  };
let Kt = !1;
const Xt = () => {
  if (Kt) return;
  Kt = !0;
  const e = new WeakMap(),
    t = (e) => e.destroy(),
    n = (n) => {
      for (let r = 0; r < n.length; r++) {
        const s = n[r];
        if ("function" == typeof s && "copy" in s) {
          Yt = !1;
          let o = e.get(s)?.deref();
          if (!o)
            try {
              (o = ge(s.copy(), t)), e.set(s, new WeakRef(o));
            } catch (e) {
              console.error(e);
            }
          o && (n[r] = o), (Yt = !0);
        }
      }
    },
    { call: r } = Function,
    s = r.bind(r, r.apply);
  Object.defineProperties(Function.prototype, {
    apply: {
      value(e, t) {
        return Yt && n(t), s(this, e, t);
      },
    },
    call: {
      value(e, ...t) {
        return Yt && n(t), s(this, e, t);
      },
    },
  });
};
var Zt = {
  type: "pyodide",
  module: (e = "0.25.1") =>
    `/pyscript/pyodide-0.25.1.mjs`,
  async engine({ loadPyodide: e }, t, n) {
    jt || "auto" !== t.experimental_create_proxy || Xt();
    const { stderr: r, stdout: s, get: o } = Ve(),
      a = n.slice(0, n.lastIndexOf("/")),
      i = await o(e({ stderr: r, stdout: s, indexURL: a })),
      l = Qt.bind(i);
    return (
      Ct.set(i, l),
      t.files && (await Mt(this, i, t.files)),
      t.fetch && (await Pt(this, i, t.fetch)),
      t.js_modules && (await Ft(t.js_modules)),
      t.packages && (await l(t.packages)),
      i
    );
  },
  registerJSModule: Wt,
  run: Vt(Lt),
  runAsync: Vt(Ht),
  runEvent: Vt(Bt),
  transform: ({ ffi: { PyProxy: e } }, t) => (t instanceof e ? t.toJs(zt) : t),
  writeFile: (e, t, n, r) => {
    const s = Dt(t, r);
    if (s) return e.unpackArchive(n, s, { extractDir: t.slice(0, -1) });
    const {
      FS: o,
      PATH: a,
      _module: { PATH_FS: i },
    } = e;
    return xt({ FS: o, PATH: a, PATH_FS: i }, t, n);
  },
};
async function Qt(e) {
  await this.loadPackage("micropip");
  const t = this.pyimport("micropip");
  await t.install(e, { keep_going: !0 }), t.destroy();
}
const en = "ruby-wasm-wasi",
  tn = en.replace(/\W+/g, "_");
var nn = {
  type: en,
  experimental: !0,
  module: (e = "2.5.1") =>
    `https://cdn.jsdelivr.net/npm/@ruby/3.2-wasm-wasi@${e}/dist/browser/+esm`,
  async engine({ DefaultRubyVM: e }, t, n) {
    n = n.replace(/\/browser\/\+esm$/, "/ruby.wasm");
    const r = await a(n).arrayBuffer(),
      s = await WebAssembly.compile(r),
      { vm: o } = await e(s);
    return (
      t.files && (await Mt(this, o, t.files)),
      t.fetch && (await Pt(this, o, t.fetch)),
      t.js_modules && (await Ft(t.js_modules)),
      o
    );
  },
  registerJSModule(e, t, n) {
    t = t.replace(/\W+/g, "__");
    const r = `__module_${tn}_${t}`;
    (globalThis[r] = n),
      this.run(e, `require "js";$${t}=JS.global[:${r}]`),
      delete globalThis[r];
  },
  run: (e, t, ...n) => e.eval(Ze(t), ...n),
  runAsync: (e, t, ...n) => e.evalAsync(Ze(t), ...n),
  async runEvent(e, t, n) {
    if (/^xworker\.(on\w+)$/.test(t)) {
      const { $1: t } = RegExp,
        r = `__module_${tn}_event`;
      (globalThis[r] = n),
        this.run(e, `require "js";$xworker.call("${t}",JS.global[:${r}])`),
        delete globalThis[r];
    } else {
      const r = this.run(e, `method(:${t})`);
      await r.call(t, e.wrap(n));
    }
  },
  transform: (e, t) => t,
  writeFile: () => {
    throw new Error(`writeFile is not supported in ${en}`);
  },
};
var rn = {
  type: "wasmoon",
  module: (e = "1.16.0") => `https://cdn.jsdelivr.net/npm/wasmoon@${e}/+esm`,
  async engine({ LuaFactory: e, LuaLibraries: t }, n) {
    const { stderr: r, stdout: s, get: o } = Ve(),
      a = await o(new e().createEngine());
    return (
      a.global.getTable(t.Base, (e) => {
        a.global.setField(e, "print", s), a.global.setField(e, "printErr", r);
      }),
      n.files && (await Mt(this, a, n.files)),
      n.fetch && (await Pt(this, a, n.fetch)),
      n.js_modules && (await Ft(n.js_modules)),
      a
    );
  },
  registerJSModule: (e, t, n) => {
    e.global.set(t, n);
  },
  run: (e, t, ...n) => {
    try {
      return e.doStringSync(Ze(t), ...n);
    } catch (t) {
      Ye.get(e).stderr(t);
    }
  },
  runAsync: async (e, t, ...n) => {
    try {
      return await e.doString(Ze(t), ...n);
    } catch (t) {
      Ye.get(e).stderr(t);
    }
  },
  runEvent: async (e, t, n) => {
    const [r, ...s] = t.split(".");
    let o,
      a = e.global.get(r);
    for (const e of s) [o, a] = [a, a[e]];
    try {
      await a.call(o, n);
    } catch (t) {
      Ye.get(e).stderr(t);
    }
  },
  transform: (e, t) => t,
  writeFile: (
    {
      cmodule: {
        module: { FS: e },
      },
    },
    t,
    n
  ) =>
    ((e, t, n) => (
      At(e, Rt(t)),
      (t = Tt(e, t)),
      e.writeFile(t, new Uint8Array(n), { canOwn: !0 })
    ))(e, t, n),
};
const sn = new WeakMap(),
  on = async (e, t) => {
    const { shelter: n, destroy: r, io: s } = sn.get(e),
      { output: o, result: a } = await n.captureR(Ze(t));
    for (const { type: e, data: t } of o) s[e](t);
    return ge(a, r, { token: !1 });
  };
var an = {
  type: "webr",
  experimental: !0,
  module: (e = "0.3.3") =>
    `https://cdn.jsdelivr.net/npm/webr@${e}/dist/webr.mjs`,
  async engine(e, t) {
    const { get: n } = Ve(),
      r = new e.WebR();
    await n(r.init().then(() => r));
    const s = await new r.Shelter();
    return (
      sn.set(r, {
        module: e,
        shelter: s,
        destroy: s.destroy.bind(s),
        io: Ye.get(r),
      }),
      t.files && (await Mt(this, r, t.files)),
      t.fetch && (await Pt(this, r, t.fetch)),
      t.js_modules && (await Ft(t.js_modules)),
      r
    );
  },
  registerJSModule(e, t) {
    console.warn(
      `Experimental interpreter: module ${t} is not supported (yet)`
    );
  },
  run: on,
  runAsync: on,
  async runEvent(e, t, n) {
    await e.evalRVoid(`${t}(event)`, { env: { event: { type: [n.type] } } });
  },
  transform: (e, t) => (console.log("transforming", t), t),
  writeFile: () => {},
};
const ln = new Map(),
  cn = new Map(),
  pn = [],
  fn = [],
  un = new Proxy(new Map(), {
    get(e, t) {
      if (!e.has(t)) {
        const [n, ...r] = t.split("@"),
          s = ln.get(n),
          o = /^(?:\.?\.?\/|https?:\/\/)/i.test(r)
            ? r.join("@")
            : s.module(...r);
        e.set(t, { url: o, module: import(o), engine: s.engine.bind(s) });
      }
      const { url: n, module: r, engine: s } = e.get(t);
      return (e, o) =>
        r.then((r) => {
          cn.set(t, e);
          for (const t of ["files", "fetch"]) {
            const n = e?.[t];
            n && Ot.set(n, o);
          }
          for (const t of ["main", "worker"]) {
            const n = e?.js_modules?.[t];
            n && Ot.set(n, o);
          }
          return s(r, e, n);
        });
    },
  }),
  dn = (e) => {
    for (const t of [].concat(e.type))
      ln.set(t, e), pn.push(`script[type="${t}"]`), fn.push(`${t}-`);
  };
for (const e of [qt, Zt, nn, rn, an]) dn(e);
const hn = async (e) => (await import("./toml-DiUM0_qs.js")).parse(e),
  mn = (e, t = "./config.txt") => {
    let n = typeof e;
    return (
      "string" === n && /\.(json|toml|txt)$/.test(e)
        ? (n = RegExp.$1)
        : (e = t),
      [lt(e), n]
    );
  },
  yn = (e) => {
    try {
      return JSON.parse(e);
    } catch (t) {
      return hn(e);
    }
  },
  gn = (e, t, n, r = {}) => {
    if (t) {
      const [e, s] = mn(t, n);
      "json" === s
        ? (r = a(e).json())
        : "toml" === s
        ? (r = a(e).text().then(hn))
        : "string" === s
        ? (r = yn(t))
        : "object" === s && t
        ? (r = t)
        : "txt" === s && "string" == typeof r && (r = yn(r)),
        (t = e);
    }
    return it(r).then((n) => un[e](n, t));
  },
  _n = (e, t = "") => `${e}@${t}`.replace(/@$/, "");
function wn(e = this) {
  return String(e).replace(/^(async\s*)?(\bfunction\b)?(.*?)\(/, (e, t, n, r) =>
    r && !n ? `${t || ""}function ${r}(` : e
  );
}
const bn = "BeforeRun",
  vn = "AfterRun",
  En = [`code${bn}`, `code${bn}Async`, `code${vn}`, `code${vn}Async`],
  kn = [
    "onWorker",
    "onReady",
    `on${bn}`,
    `on${bn}Async`,
    `on${vn}`,
    `on${vn}Async`,
  ];
function jn(e, t) {
  const { run: n, runAsync: r } = ln.get(this.type);
  return { ...e, run: n.bind(this, t), runAsync: r.bind(this, t) };
}
const xn = (e, t, n, r, s, o) => {
  if (s || o) {
    const a = jn.bind(e, t),
      i = r ? "runAsync" : "run",
      l = e[i];
    e[i] = r
      ? async function (e, t, ...r) {
          s && (await s.call(this, a(e), n));
          const i = await l.call(this, e, t, ...r);
          return o && (await o.call(this, a(e), n)), i;
        }
      : function (e, t, ...r) {
          s && s.call(this, a(e), n);
          const i = l.call(this, e, t, ...r);
          return o && o.call(this, a(e), n), i;
        };
  }
};
let Rn = class {
  constructor(e, t = {}) {
    const { main: n, worker: r } = t;
    (this.interpreter = e), (this.onWorker = n?.onWorker);
    for (const e of kn.slice(1)) this[e] = r?.[e];
    for (const e of En) this[e] = r?.[e];
  }
  toJSON() {
    const e = {};
    for (const t of kn.slice(1)) this[t] && (e[t] = wn(this[t]));
    for (const t of En) this[t] && (e[t] = Ze(this[t]()));
    return e;
  }
};
var An = (...e) =>
  function (t, n) {
    const r = new Worker(
        URL.createObjectURL(
          new Blob(
            [
              'const e="object"==typeof self?self:globalThis,t=t=>((t,n)=>{const r=(e,n)=>(t.set(n,e),e),s=o=>{if(t.has(o))return t.get(o);const[a,i]=n[o];switch(a){case 0:case-1:return r(i,o);case 1:{const e=r([],o);for(const t of i)e.push(s(t));return e}case 2:{const e=r({},o);for(const[t,n]of i)e[s(t)]=s(n);return e}case 3:return r(new Date(i),o);case 4:{const{source:e,flags:t}=i;return r(new RegExp(e,t),o)}case 5:{const e=r(new Map,o);for(const[t,n]of i)e.set(s(t),s(n));return e}case 6:{const e=r(new Set,o);for(const t of i)e.add(s(t));return e}case 7:{const{name:t,message:n}=i;return r(new e[t](n),o)}case 8:return r(BigInt(i),o);case"BigInt":return r(Object(BigInt(i)),o)}return r(new e[a](i),o)};return s})(new Map,t)(0),n="",{toString:r}={},{keys:s}=Object,o=e=>{const t=typeof e;if("object"!==t||!e)return[0,t];const s=r.call(e).slice(8,-1);switch(s){case"Array":return[1,n];case"Object":return[2,n];case"Date":return[3,n];case"RegExp":return[4,n];case"Map":return[5,n];case"Set":return[6,n]}return s.includes("Array")?[1,s]:s.includes("Error")?[7,s]:[2,s]},a=([e,t])=>0===e&&("function"===t||"symbol"===t),i=(e,{json:t,lossy:n}={})=>{const r=[];return((e,t,n,r)=>{const i=(e,t)=>{const s=r.push(e)-1;return n.set(t,s),s},c=r=>{if(n.has(r))return n.get(r);let[l,p]=o(r);switch(l){case 0:{let t=r;switch(p){case"bigint":l=8,t=r.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+p);t=null;break;case"undefined":return i([-1],r)}return i([l,t],r)}case 1:{if(p)return i([p,[...r]],r);const e=[],t=i([l,e],r);for(const t of r)e.push(c(t));return t}case 2:{if(p)switch(p){case"BigInt":return i([p,r.toString()],r);case"Boolean":case"Number":case"String":return i([p,r.valueOf()],r)}if(t&&"toJSON"in r)return c(r.toJSON());const n=[],u=i([l,n],r);for(const t of s(r))!e&&a(o(r[t]))||n.push([c(t),c(r[t])]);return u}case 3:return i([l,r.toISOString()],r);case 4:{const{source:e,flags:t}=r;return i([l,{source:e,flags:t}],r)}case 5:{const t=[],n=i([l,t],r);for(const[n,s]of r)(e||!a(o(n))&&!a(o(s)))&&t.push([c(n),c(s)]);return n}case 6:{const t=[],n=i([l,t],r);for(const n of r)!e&&a(o(n))||t.push(c(n));return n}}const{message:u}=r;return i([l,{name:p,message:u}],r)};return c})(!(t||n),!!t,new Map,r)(e),r},{parse:c,stringify:l}=JSON,p={json:!0,lossy:!0};var u=Object.freeze({__proto__:null,parse:e=>t(c(e)),stringify:e=>l(i(e,p))});const f="64e10b34-2bf7-4616-9668-f99de5aa046e",d="M"+f,h="T"+f,g="array",y="function",w="null",m="number",_="object",b="string",E="symbol",v="undefined",k="apply",x="construct",T="defineProperty",S="deleteProperty",A="get",j="getOwnPropertyDescriptor",O="getPrototypeOf",R="has",P="isExtensible",$="ownKeys",M="preventExtensions",N="set",I="setPrototypeOf",F="delete",{isArray:W}=Array;let{SharedArrayBuffer:H,window:D}=globalThis,{notify:C,wait:L,waitAsync:U}=Atomics,B=null;U||(U=e=>({value:new Promise((t=>{let n=new Worker("data:application/javascript,onmessage%3D(%7Bdata%3Ab%7D)%3D%3E(Atomics.wait(b%2C0)%2CpostMessage(0))");n.onmessage=t,n.postMessage(e)}))}));try{new H(4)}catch(e){H=ArrayBuffer;const t=new WeakMap;if(D){const e=new Map,{prototype:{postMessage:n}}=Worker,r=t=>{const n=t.data?.[f];if(!W(n)){t.stopImmediatePropagation();const{id:r,sb:s}=n;e.get(r)(s)}};B=function(e,...s){const o=e?.[f];if(W(o)){const[e,n]=o;t.set(n,e),this.addEventListener("message",r)}return n.call(this,e,...s)},U=n=>({value:new Promise((r=>{e.set(t.get(n),r)})).then((r=>{e.delete(t.get(n)),t.delete(n);for(let e=0;e<r.length;e++)n[e]=r[e];return"ok"}))})}else{const e=(e,t)=>({[f]:{id:e,sb:t}});C=n=>{postMessage(e(t.get(n),n))},addEventListener("message",(e=>{const n=e.data?.[f];if(W(n)){const[e,r]=n;t.set(r,e)}}))}}\n/*! (c) Andrea Giammarchi - ISC */const{Int32Array:J,Map:q,Uint16Array:z}=globalThis,{BYTES_PER_ELEMENT:G}=J,{BYTES_PER_ELEMENT:K}=z,Y=new WeakSet,X=new WeakMap,V={value:{then:e=>e()}};let Z=0;const Q=(e,{parse:t=JSON.parse,stringify:n=JSON.stringify,transform:r,interrupt:s}=JSON)=>{if(!X.has(e)){const o=B||e.postMessage,a=(t,...n)=>o.call(e,{[f]:n},{transfer:t}),i=typeof s===y?s:s?.handler,c=s?.delay||42,l=new TextDecoder("utf-16"),p=(e,t)=>e?U(t,0):(i?((e,t,n)=>{for(;"timed-out"===L(e,0,0,t);)n()})(t,c,i):L(t,0),V);let u=!1;X.set(e,new Proxy(new q,{[R]:(e,t)=>"string"==typeof t&&!t.startsWith("_"),[A]:(n,s)=>"then"===s?null:(...n)=>{const o=Z++;let i=new J(new H(2*G)),c=[];Y.has(n.at(-1)||c)&&Y.delete(c=n.pop()),a(c,o,i,s,r?n.map(r):n);const f=e!==globalThis;let d=0;return u&&f&&(d=setTimeout(console.warn,1e3,`💀🔒 - Possible deadlock if proxy.${s}(...args) is awaited`)),p(f,i).value.then((()=>{clearTimeout(d);const e=i[1];if(!e)return;const n=K*e;return i=new J(new H(n+n%G)),a([],o,i),p(f,i).value.then((()=>t(l.decode(new z(i.buffer).slice(0,e)))))}))},[N](t,s,o){const a=typeof o;if(a!==y)throw new Error(`Unable to assign ${s} as ${a}`);if(!t.size){const s=new q;e.addEventListener("message",(async e=>{const o=e.data?.[f];if(W(o)){e.stopImmediatePropagation();const[a,i,...c]=o;let l;if(c.length){const[e,o]=c;if(t.has(e)){u=!0;try{const c=await t.get(e)(...o);if(void 0!==c){const e=n(r?r(c):c);s.set(a,e),i[1]=e.length}}catch(e){l=e}finally{u=!1}}else l=new Error(`Unsupported action: ${e}`);i[0]=1}else{const e=s.get(a);s.delete(a);for(let t=new z(i.buffer),n=0;n<e.length;n++)t[n]=e.charCodeAt(n)}if(C(i,0),l)throw l}}))}return!!t.set(s,o)}}))}return X.get(e)};Q.transfer=(...e)=>(Y.add(e),e);const{isArray:ee}=Array,te=(e,t)=>t,ne=e=>typeof e===y?(e=>e())(e):e;function re(){return this}const se=(e,t)=>e===g?[t]:{t:e,v:t},oe=(e,t=te)=>{let n=typeof e,r=e;return n===_&&(ee(e)?(n=g,r=e.at(0)):({t:n,v:r}=e)),t(n,r)},ae=(e,t)=>e===y?t:se(e,t),ie=(e,t=ae)=>{const n=null===e?w:typeof e;return t(n===_&&ee(e)?g:n,e)},ce=new FinalizationRegistry((([e,t,n])=>{n&&console.debug(`Held value ${String(t)} not relevant anymore`),e(t)})),le=Object.create(null),pe=(e,t,{debug:n,handler:r,return:s,token:o=e}=le)=>{const a=s||new Proxy(e,r||le),i=[a,[t,e,!!n]];return!1!==o&&i.push(o),ce.register(...i),a},{defineProperty:ue,deleteProperty:fe,getOwnPropertyDescriptor:de,getPrototypeOf:he,isExtensible:ge,ownKeys:ye,preventExtensions:we,set:me,setPrototypeOf:_e}=Reflect,{assign:be,create:Ee}=Object,ve=he(Int8Array),ke=(e,t)=>{const{get:n,set:r,value:s}=e;return n&&(e.get=t(n)),r&&(e.set=t(r)),s&&(e.value=t(s)),e},xe=e=>t=>ie(t,((t,n)=>{switch(t){case w:return se(w,n);case _:if(n===globalThis)return se(t,null);case g:case y:return e(t,n);case"boolean":case m:case b:case v:case"bigint":return se(t,n);case E:{if(Te.has(n))return se(t,Te.get(n));let e=Symbol.keyFor(n);if(e)return se(t,`.${e}`)}}throw new TypeError(`Unable to handle this ${t}: ${String(n)}`)})),Te=new Map(ye(Symbol).filter((e=>typeof Symbol[e]===E)).map((e=>[Symbol[e],e]))),Se=e=>{if(e.startsWith("."))return Symbol.for(e.slice(1));for(const[t,n]of Te)if(n===e)return t},Ae=e=>e;var je=((e,t)=>{const n=new WeakMap;{const{addEventListener:e}=EventTarget.prototype;ue(EventTarget.prototype,"addEventListener",{value(t,r,...s){return s.at(0)?.invoke&&(n.has(this)||n.set(this,new Map),n.get(this).set(t,[].concat(s[0].invoke)),delete s[0].invoke),e.call(this,t,r,...s)}})}return function(t,r,s,...o){let a=0,i=this?.transform||Ae;const c=new Map,l=new Map,{[s]:p}=t,u=o.length?be(Ee(globalThis),...o):globalThis,f=xe(((e,t)=>{if(!c.has(t)){let n;for(;l.has(n=a++););c.set(t,n),l.set(n,e===y?t:i(t))}return se(e,c.get(t))})),d=e=>{p(F,se(b,e))},h=(e,t)=>{switch(e){case _:if(null==t)return u;case g:if(typeof t===m)return l.get(t);if(!(t instanceof ve))for(const e in t)t[e]=w(t[e]);return t;case y:if(typeof t===b){const e=l.get(t)?.deref();if(e)return e;const r=function(...e){return e.at(0)instanceof Event&&(e=>{const{currentTarget:t,target:r,type:s}=e;for(const o of n.get(t||r)?.get(s)||[])e[o]()})(...e),p(k,se(y,t),f(this),e.map(f))};return l.set(t,new WeakRef(r)),pe(t,d,{return:r,token:!1})}return l.get(t);case E:return Se(t)}return t},w=e=>oe(e,h),W={[k]:(e,t,n)=>f(e.apply(t,n)),[x]:(e,t)=>f(new e(...t)),[T]:(e,t,n)=>f(ue(e,t,n)),[S]:(e,t)=>f(fe(e,t)),[O]:e=>f(he(e)),[A]:(e,t)=>f(e[t]),[j]:(e,t)=>{const n=de(e,t);return n?se(_,ke(n,f)):se(v,n)},[R]:(e,t)=>f(t in e),[P]:e=>f(ge(e)),[$]:e=>se(g,ye(e).map(f)),[M]:e=>f(we(e)),[N]:(e,t,n)=>f(me(e,t,n)),[I]:(e,t)=>f(_e(e,t)),[F](e){c.delete(l.get(e)),l.delete(e)}};return t[r]=(e,t,...n)=>{switch(e){case k:n[0]=w(n[0]),n[1]=n[1].map(w);break;case x:n[0]=n[0].map(w);break;case T:{const[e,t]=n;n[0]=w(e);const{get:r,set:s,value:o}=t;r&&(t.get=w(r)),s&&(t.set=w(s)),o&&(t.value=w(o));break}default:n=n.map(w)}return W[e](w(t),...n)},{proxy:t,[e.toLowerCase()]:u,[`is${e}Proxy`]:()=>!1}}})("Window"),Oe=(e=>{let t=0;const n=new Map,r=new Map,s=Symbol();return function(o,a,i){const c=this?.transform||Ae,{[a]:l}=o,p=new Map,u=e=>{p.delete(e),l(F,f(e))},f=xe(((e,o)=>{if(s in o)return ne(o[s]);if(e===y){if(o=c(o),!r.has(o)){let e;for(;r.has(e=String(t++)););n.set(o,e),r.set(e,o)}return se(e,n.get(o))}if(!(o instanceof ve)){o=c(o);for(const e in o)o[e]=f(o[e])}return se(e,o)})),d=(e,t,n)=>{const r=p.get(n)?.deref();if(r)return r;const s=t===y?(e=>re.bind(e))(e):e,o=new Proxy(s,v);return p.set(n,new WeakRef(o)),pe(n,u,{return:o,token:!1})},h=e=>oe(e,((t,n)=>{switch(t){case _:if(null===n)return globalThis;case g:return typeof n===m?d(e,t,n):n;case y:return typeof n===b?r.get(n):d(e,t,n);case E:return Se(n)}return n})),w=(e,t,...n)=>h(l(e,ne(t),...n)),v={[k]:(e,t,n)=>w(k,e,f(t),n.map(f)),[x]:(e,t)=>w(x,e,t.map(f)),[T]:(e,t,n)=>{const{get:r,set:s,value:o}=n;return typeof r===y&&(n.get=f(r)),typeof s===y&&(n.set=f(s)),typeof o===y&&(n.value=f(o)),w(T,e,f(t),n)},[S]:(e,t)=>w(S,e,f(t)),[O]:e=>w(O,e),[A]:(e,t)=>t===s?e:w(A,e,f(t)),[j]:(e,t)=>{const n=w(j,e,f(t));return n&&ke(n,h)},[R]:(e,t)=>t===s||w(R,e,f(t)),[P]:e=>w(P,e),[$]:e=>w($,e).map(h),[M]:e=>w(M,e),[N]:(e,t,n)=>w(N,e,f(t),f(n)),[I]:(e,t)=>w(I,e,f(t))};o[i]=(e,t,s,o)=>{switch(e){case k:return h(t).apply(h(s),o.map(h));case F:{const e=h(t);n.delete(r.get(e)),r.delete(e)}}};const W=new Proxy(se(_,null),v);return{[e.toLowerCase()]:W,[`is${e}Proxy`]:e=>typeof e===_&&!!e&&s in e,proxy:o}}})("Window"),Re=typeof Worker===y?Worker:class{};const Pe=new WeakMap,$e=(e,...t)=>{const n=Q(e,...t);if(!Pe.has(n)){const r=e instanceof Re?je:Oe;Pe.set(n,r.call(t.at(0),n,d,h))}return Pe.get(n)};$e.transfer=Q.transfer;const Me={object(...e){return this.string(function(e){for(var t=e[0],n=1,r=arguments.length;n<r;n++)t+=arguments[n]+e[n];return t}(...e))},string(e){for(const t of e.split(/[\\r\\n]+/))if(t.trim().length){/^(\\s+)/.test(t)&&(e=e.replace(new RegExp("^"+RegExp.$1,"gm"),""));break}return e}},Ne=new WeakMap,Ie=e=>{const t=e||console,n={buffered:We,stderr:(t.stderr||console.error).bind(t),stdout:(t.stdout||console.log).bind(t)};return{stderr:(...e)=>n.stderr(...e),stdout:(...e)=>n.stdout(...e),async get(e){const t=await e;return Ne.set(t,n),t}}},Fe=new TextDecoder,We=(e,t=10)=>{const n=[];return r=>{if(r instanceof Uint8Array)for(const s of r)s===t?e(Fe.decode(new Uint8Array(n.splice(0)))):n.push(s);else e(r)}},He=(e,...t)=>Me[typeof e](e,...t),{isArray:De}=Array,{assign:Ce,create:Le,defineProperties:Ue,defineProperty:Be,entries:Je}=Object,{all:qe,resolve:ze}=new Proxy(Promise,{get:(e,t)=>e[t].bind(e)}),Ge=(e,t=location.href)=>new URL(e,t.replace(/^blob:/,"")).href,Ke=(e,t,n,r=!1,s=CustomEvent)=>{e.dispatchEvent(new s(`${t}:${n}`,{bubbles:!0,detail:{worker:r}}))},Ye=e=>Function(`\'use strict\';return (${e})`)(),Xe=e=>e.replace(/^(?:\\n|\\r\\n)/,""),Ve=Symbol.for("polyscript.js_modules"),Ze=new Map;Be(globalThis,Ve,{value:Ze}),new Proxy(Ze,{get:(e,t)=>e.get(t),has:(e,t)=>e.has(t),ownKeys:e=>[...e.keys()]});const Qe=(e,t)=>!t.startsWith("_"),et=(e,t)=>new Proxy(e,{has:Qe,get:(e,n)=>e[t][n]}),tt=(e,t)=>import(e).then((e=>{Ze.set(t,{...e})})),nt=e=>new Promise(((t,n)=>{document.querySelector(`link[href="${e}"]`)&&t(),document.head.append(Ce(document.createElement("link"),{rel:"stylesheet",href:e,onload:t,onerror:n}))})),rt=e=>/\\.css/i.test(new URL(e).pathname);Promise.withResolvers||(Promise.withResolvers=function(){var e,t,n=new this((function(n,r){e=n,t=r}));return{resolve:e,reject:t,promise:n}});const st=Object.getOwnPropertyDescriptors(Response.prototype),ot=e=>"function"==typeof e,at={get:(e,t)=>st.hasOwnProperty(t)?((e,t,{get:n,value:r})=>n||!ot(r)?e.then((e=>e[t])):(...n)=>e.then((e=>e[t](...n))))(e,t,st[t]):((e,t)=>ot(t)?t.bind(e):t)(e,e[t])};var it=(e,...t)=>new Proxy(fetch(e,...t),at);const ct=!globalThis.window,lt=({FS:e,PATH:t,PATH_FS:n},r,s)=>{const o=n.resolve(r),a=t.dirname(o);return e.mkdirTree?e.mkdirTree(a):ut(e,a),e.writeFile(o,new Uint8Array(s),{canOwn:!0})},pt=e=>{const t=e.split("/");return t.pop(),t.join("/")},ut=(e,t)=>{const n=[];for(const r of t.split("/"))"."!==r&&".."!==r&&(n.push(r),r&&e.mkdir(n.join("/")))},ft=(e,t)=>{const n=[];for(const e of t.split("/"))switch(e){case"":case".":break;case"..":n.pop();break;default:n.push(e)}return[e.cwd()].concat(n).join("/").replace(/^\\/+/,"/")},dt=e=>{const t=e.map((e=>e.trim().replace(/(^[/]*|[/]*$)/g,""))).filter((e=>""!==e&&"."!==e)).join("/");return e[0].startsWith("/")?`/${t}`:t},ht=(e,t)=>it(Ge(t,gt.get(e))).arrayBuffer(),gt=new WeakMap,yt=(e,t,n)=>qe((e=>{for(const{files:t,to_file:n,from:r=""}of e){if(void 0!==t&&void 0!==n)throw new Error("Cannot use \'to_file\' and \'files\' parameters together!");if(void 0===t&&void 0===n&&r.endsWith("/"))throw new Error(`Couldn\'t determine the filename from the path ${r}, please supply \'to_file\' parameter.`)}return e.flatMap((({from:e="",to_folder:t=".",to_file:n,files:r})=>{if(De(r))return r.map((n=>({url:dt([e,n]),path:dt([t,n])})));const s=n||e.slice(1+e.lastIndexOf("/"));return[{url:e,path:dt([t,s])}]}))})(n).map((({url:r,path:s})=>ht(n,r).then((n=>e.writeFile(t,s,n)))))),wt=(e,t)=>t.endsWith("/")?`${t}${e.split("/").pop()}`:t,mt=(e,t)=>e.replace(/\\{.+?\\}/g,(e=>{if(!t.has(e))throw new SyntaxError(`Invalid template: ${e}`);return t.get(e)})),_t=(e,t,n)=>qe((e=>{const t=new Map,n=new Set,r=[];for(const[s,o]of Je(e))if(/^\\{.+\\}$/.test(s)){if(t.has(s))throw new SyntaxError(`Duplicated template: ${s}`);t.set(s,mt(o,t))}else{const e=mt(s,t),a=wt(e,mt(o||"./",t));if(n.has(a))throw new SyntaxError(`Duplicated destination: ${a}`);n.add(a),r.push({url:e,path:a})}return r})(n).map((({url:r,path:s})=>ht(n,r).then((n=>e.writeFile(t,s,n,r)))))),bt=({main:e,worker:t})=>{const n=[];if(t&&ct)for(let[e,r]of Je(t))e=Ge(e,gt.get(t)),n.push(tt(e,r));if(e&&!ct)for(let[t,r]of Je(e))t=Ge(t,gt.get(e)),rt(t)?nt(t):n.push(tt(t,r));return qe(n)},Et=(e,t)=>e.has(t),vt=e=>[...e.keys()];var kt=(e,t,n)=>{let r=globalThis[Ve],s="";if(n){s=gt.get(n);for(let[e,t]of Je(n)){let n=r.get(t);n&&!De(n)||(r.set(t,n||(n=[])),n.push(e))}}return((e,t,n,r)=>new Proxy(e,{has:Et,ownKeys:vt,get:(e,s)=>{let o=e.get(s);if(De(o)){let a=o;o=null;for(let e of a)e=Ge(e,r),rt(e)?n.importCSS(e):(n.importJS(e,s),o=t[Ve].get(s));e.set(s,o)}return o}}))(r,e,t,s)};const xt=new WeakMap,Tt=(e,t,n)=>{"polyscript"===t&&(n.lazy_py_modules=async(...t)=>(await xt.get(e)(t),t.map((t=>e.pyimport(t))))),e.registerJsModule(t,n)},St=(e,t)=>{if(e.endsWith("/*")){if(/\\.(zip|tar(?:\\.gz)?)$/.test(t))return RegExp.$1;throw new Error(`Unsupported archive ${t}`)}return""},At=(e,t,...n)=>{try{return e.runPython(He(t),...n)}catch(t){Ne.get(e).stderr(t)}},jt=async(e,t,...n)=>{try{return await e.runPythonAsync(He(t),...n)}catch(t){Ne.get(e).stderr(t)}},Ot=async(e,t,n)=>{const[r,...s]=t.split(".");let o,a=e.globals.get(r);for(const e of s)[o,a]=[a,a[e]];try{await a.call(o,n)}catch(t){Ne.get(e).stderr(t)}};var Rt=(new TextEncoder).encode(\'from uio import StringIO\\nimport sys\\n\\nclass Response:\\n    def __init__(self, f):\\n        self.raw = f\\n        self.encoding = "utf-8"\\n        self._cached = None\\n\\n    def close(self):\\n        if self.raw:\\n            self.raw.close()\\n            self.raw = None\\n        self._cached = None\\n\\n    @property\\n    def content(self):\\n        if self._cached is None:\\n            try:\\n                self._cached = self.raw.read()\\n            finally:\\n                self.raw.close()\\n                self.raw = None\\n        return self._cached\\n\\n    @property\\n    def text(self):\\n        return str(self.content, self.encoding)\\n\\n    def json(self):\\n        import ujson\\n\\n        return ujson.loads(self.content)\\n\\n\\n# TODO try to support streaming xhr requests, a-la pyodide-http\\nHEADERS_TO_IGNORE = ("user-agent",)\\n\\n\\ntry:\\n    import js\\nexcept Exception as err:\\n    raise OSError("This version of urequests can only be used in the browser")\\n\\n# TODO try to support streaming xhr requests, a-la pyodide-http\\n\\nHEADERS_TO_IGNORE = ("user-agent",)\\n\\n\\ndef request(\\n    method,\\n    url,\\n    data=None,\\n    json=None,\\n    headers={},\\n    stream=None,\\n    auth=None,\\n    timeout=None,\\n    parse_headers=True,\\n):\\n    from js import XMLHttpRequest\\n\\n    xhr = XMLHttpRequest.new()\\n    xhr.withCredentials = False\\n\\n    if auth is not None:\\n        import ubinascii\\n\\n        username, password = auth\\n        xhr.open(method, url, False, username, password)\\n    else:\\n        xhr.open(method, url, False)\\n\\n    for name, value in headers.items():\\n        if name.lower() not in HEADERS_TO_IGNORE:\\n            xhr.setRequestHeader(name, value)\\n\\n    if timeout:\\n        xhr.timeout = int(timeout * 1000)\\n\\n    if json is not None:\\n        assert data is None\\n        import ujson\\n\\n        data = ujson.dumps(json)\\n        # s.write(b"Content-Type: application/json\\\\r\\\\n")\\n        xhr.setRequestHeader("Content-Type", "application/json")\\n\\n    xhr.send(data)\\n\\n    # Emulates the construction process in the original urequests\\n    resp = Response(StringIO(xhr.responseText))\\n    resp.status_code = xhr.status\\n    resp.reason = xhr.statusText\\n    resp.headers = xhr.getAllResponseHeaders()\\n\\n    return resp\\n\\n\\n# Other methods - head, post, put, patch, delete - are not used by\\n# mip and therefore not included\\n\\n\\ndef get(url, **kw):\\n    return request("GET", url, **kw)\\n\\n\\n# Content below this line is from the Micropython MIP package and is covered\\n# by the applicable MIT license:\\n# \\n# THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\\n# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, \\n# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\\n# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \\n# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING \\n# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER \\n# DEALINGS IN THE SOFTWARE.\\n\\n# MicroPython package installer\\n# MIT license; Copyright (c) 2022 Jim Mussared\\n\\n\\n_PACKAGE_INDEX = const("https://micropython.org/pi/v2")\\n_CHUNK_SIZE = 128\\n\\n\\n# This implements os.makedirs(os.dirname(path))\\ndef _ensure_path_exists(path):\\n    import os\\n\\n    split = path.split("/")\\n\\n    # Handle paths starting with "/".\\n    if not split[0]:\\n        split.pop(0)\\n        split[0] = "/" + split[0]\\n\\n    prefix = ""\\n    for i in range(len(split) - 1):\\n        prefix += split[i]\\n        try:\\n            os.stat(prefix)\\n        except:\\n            os.mkdir(prefix)\\n        prefix += "/"\\n\\n\\n# Copy from src (stream) to dest (function-taking-bytes)\\ndef _chunk(src, dest):\\n    buf = memoryview(bytearray(_CHUNK_SIZE))\\n    while True:\\n        n = src.readinto(buf)\\n        if n == 0:\\n            break\\n        dest(buf if n == _CHUNK_SIZE else buf[:n])\\n\\n\\n# Check if the specified path exists and matches the hash.\\ndef _check_exists(path, short_hash):\\n    import os\\n\\n    try:\\n        import binascii\\n        import hashlib\\n\\n        with open(path, "rb") as f:\\n            hs256 = hashlib.sha256()\\n            _chunk(f, hs256.update)\\n            existing_hash = str(binascii.hexlify(hs256.digest())[: len(short_hash)], "utf-8")\\n            return existing_hash == short_hash\\n    except:\\n        return False\\n\\n\\ndef _rewrite_url(url, branch=None):\\n    if not branch:\\n        branch = "HEAD"\\n    if url.startswith("github:"):\\n        url = url[7:].split("/")\\n        url = (\\n            "https://raw.githubusercontent.com/"\\n            + url[0]\\n            + "/"\\n            + url[1]\\n            + "/"\\n            + branch\\n            + "/"\\n            + "/".join(url[2:])\\n        )\\n    return url\\n\\n\\ndef _download_file(url, dest):\\n    response = get(url)\\n    try:\\n        if response.status_code != 200:\\n            print("Error", response.status_code, "requesting", url)\\n            return False\\n\\n        print("Copying:", dest)\\n        _ensure_path_exists(dest)\\n        with open(dest, "wb") as f:\\n            _chunk(response.raw, f.write)\\n\\n        return True\\n    finally:\\n        response.close()\\n\\n\\ndef _install_json(package_json_url, index, target, version, mpy):\\n    response = get(_rewrite_url(package_json_url, version))\\n    try:\\n        if response.status_code != 200:\\n            print("Package not found:", package_json_url)\\n            return False\\n\\n        package_json = response.json()\\n    finally:\\n        response.close()\\n    for target_path, short_hash in package_json.get("hashes", ()):\\n        fs_target_path = target + "/" + target_path\\n        if _check_exists(fs_target_path, short_hash):\\n            print("Exists:", fs_target_path)\\n        else:\\n            file_url = "{}/file/{}/{}".format(index, short_hash[:2], short_hash)\\n            if not _download_file(file_url, fs_target_path):\\n                print("File not found: {} {}".format(target_path, short_hash))\\n                return False\\n    for target_path, url in package_json.get("urls", ()):\\n        fs_target_path = target + "/" + target_path\\n        if not _download_file(_rewrite_url(url, version), fs_target_path):\\n            print("File not found: {} {}".format(target_path, url))\\n            return False\\n    for dep, dep_version in package_json.get("deps", ()):\\n        if not _install_package(dep, index, target, dep_version, mpy):\\n            return False\\n    return True\\n\\n\\ndef _install_package(package, index, target, version, mpy):\\n    if (\\n        package.startswith("http://")\\n        or package.startswith("https://")\\n        or package.startswith("github:")\\n    ):\\n        if package.endswith(".py") or package.endswith(".mpy"):\\n            print("Downloading {} to {}".format(package, target))\\n            return _download_file(\\n                _rewrite_url(package, version), target + "/" + package.rsplit("/")[-1]\\n            )\\n        else:\\n            if not package.endswith(".json"):\\n                if not package.endswith("/"):\\n                    package += "/"\\n                package += "package.json"\\n            print("Installing {} to {}".format(package, target))\\n    else:\\n        if not version:\\n            version = "latest"\\n        print("Installing {} ({}) from {} to {}".format(package, version, index, target))\\n\\n        mpy_version = (\\n            sys.implementation._mpy & 0xFF if mpy and hasattr(sys.implementation, "_mpy") else "py"\\n        )\\n\\n        package = "{}/package/{}/{}/{}.json".format(index, mpy_version, package, version)\\n\\n    return _install_json(package, index, target, version, mpy)\\n\\n\\ndef install(package, index=None, target=None, version=None, mpy=True):\\n    if not target:\\n        for p in sys.path:\\n            if p.endswith("/lib"):\\n                target = p\\n                break\\n        else:\\n            print("Unable to find lib dir in sys.path")\\n            return\\n\\n    if not index:\\n        index = _PACKAGE_INDEX\\n\\n    if _install_package(package, index.rstrip("/"), target, version, mpy):\\n        print("Done")\\n    else:\\n        print("Package may be partially installed")\\n\');const Pt=(e,t)=>{try{e.mkdir(t)}catch(e){}};var $t={type:"micropython",module:(e="1.22.0-335")=>`https://cdn.jsdelivr.net/npm/@micropython/micropython-webassembly-pyscript@${e}/micropython.mjs`,async engine({loadMicroPython:e},t,n){const{stderr:r,stdout:s,get:o}=Ie({stderr:We(console.error),stdout:We(console.log)});n=n.replace(/\\.m?js$/,".wasm");const a=await o(e({linebuffer:!1,stderr:r,stdout:s,url:n})),i=Mt.bind(a);return xt.set(a,i),t.files&&await _t(this,a,t.files),t.fetch&&await yt(this,a,t.fetch),t.js_modules&&await bt(t.js_modules),this.writeFile(a,"./mip.py",Rt),t.packages&&await i(t.packages),a},registerJSModule:Tt,run:At,runAsync:jt,runEvent:Ot,transform:(e,t)=>e.PyProxy.toJs(t),writeFile:(e,t,n,r)=>{const{FS:s,_module:{PATH:o,PATH_FS:a}}=e,i={FS:s,PATH:o,PATH_FS:a},c=St(t,r);if(c){const r=t.slice(0,-1);switch("./"!==r&&s.mkdir(r),c){case"zip":{const e=new Blob([n],{type:"application/zip"});return import("./zip-D2yvzXKD.js").then((async({BlobReader:t,Uint8ArrayWriter:n,ZipReader:a})=>{const i=new a(new t(e));for(const e of await i.getEntries()){const{directory:t,filename:a}=e,i=r+a;if(t)Pt(s,i);else{Pt(s,o.dirname(i));const t=await e.getData(new n);s.writeFile(i,t,{canOwn:!0})}}i.close()}))}case"tar.gz":{const t="./_.tar.gz";return lt(i,t,n),void e.runPython(`\\n                        import os, gzip, tarfile\\n                        tar = tarfile.TarFile(fileobj=gzip.GzipFile(fileobj=open("${t}", "rb")))\\n                        for f in tar:\\n                            name = f"${r}{f.name}"\\n                            if f.type == tarfile.DIRTYPE:\\n                                if f.name != "./":\\n                                    os.mkdir(name.strip("/"))\\n                            else:\\n                                dir = os.path.dirname(name)\\n                                if not os.path.exists(dir):\\n                                    os.mkdir(dir)\\n                                source = tar.extractfile(f)\\n                                with open(name, "wb") as dest:\\n                                    dest.write(source.read())\\n                                    dest.close()\\n                        tar.close()\\n                        os.remove("${t}")\\n                    `)}}}return lt(i,t,n)}};async function Mt(e){const t=this.pyimport("mip");for(const n of e)t.install(n)}const Nt={dict_converter:Object.fromEntries};let It=!1;const Ft=e=>(...t)=>{try{return It=!0,e(...t)}finally{It=!1}};let Wt=!1;const Ht=()=>{if(Wt)return;Wt=!0;const e=new WeakMap,t=e=>e.destroy(),n=n=>{for(let r=0;r<n.length;r++){const s=n[r];if("function"==typeof s&&"copy"in s){It=!1;let o=e.get(s)?.deref();if(!o)try{o=pe(s.copy(),t),e.set(s,new WeakRef(o))}catch(e){console.error(e)}o&&(n[r]=o),It=!0}}},{call:r}=Function,s=r.bind(r,r.apply);Object.defineProperties(Function.prototype,{apply:{value(e,t){return It&&n(t),s(this,e,t)}},call:{value(e,...t){return It&&n(t),s(this,e,t)}}})};var Dt={type:"pyodide",module:(e="0.25.1")=>`/pyscript/pyodide-0.25.1.mjs`,async engine({loadPyodide:e},t,n){ct||"auto"!==t.experimental_create_proxy||Ht();const{stderr:r,stdout:s,get:o}=Ie(),a=n.slice(0,n.lastIndexOf("/")),i=await o(e({stderr:r,stdout:s,indexURL:a})),c=Ct.bind(i);return xt.set(i,c),t.files&&await _t(this,i,t.files),t.fetch&&await yt(this,i,t.fetch),t.js_modules&&await bt(t.js_modules),t.packages&&await c(t.packages),i},registerJSModule:Tt,run:Ft(At),runAsync:Ft(jt),runEvent:Ft(Ot),transform:({ffi:{PyProxy:e}},t)=>t instanceof e?t.toJs(Nt):t,writeFile:(e,t,n,r)=>{const s=St(t,r);if(s)return e.unpackArchive(n,s,{extractDir:t.slice(0,-1)});const{FS:o,PATH:a,_module:{PATH_FS:i}}=e;return lt({FS:o,PATH:a,PATH_FS:i},t,n)}};async function Ct(e){await this.loadPackage("micropip");const t=this.pyimport("micropip");await t.install(e,{keep_going:!0}),t.destroy()}const Lt="ruby-wasm-wasi",Ut=Lt.replace(/\\W+/g,"_");var Bt={type:Lt,experimental:!0,module:(e="2.5.1")=>`https://cdn.jsdelivr.net/npm/@ruby/3.2-wasm-wasi@${e}/dist/browser/+esm`,async engine({DefaultRubyVM:e},t,n){n=n.replace(/\\/browser\\/\\+esm$/,"/ruby.wasm");const r=await it(n).arrayBuffer(),s=await WebAssembly.compile(r),{vm:o}=await e(s);return t.files&&await _t(this,o,t.files),t.fetch&&await yt(this,o,t.fetch),t.js_modules&&await bt(t.js_modules),o},registerJSModule(e,t,n){t=t.replace(/\\W+/g,"__");const r=`__module_${Ut}_${t}`;globalThis[r]=n,this.run(e,`require "js";$${t}=JS.global[:${r}]`),delete globalThis[r]},run:(e,t,...n)=>e.eval(He(t),...n),runAsync:(e,t,...n)=>e.evalAsync(He(t),...n),async runEvent(e,t,n){if(/^xworker\\.(on\\w+)$/.test(t)){const{$1:t}=RegExp,r=`__module_${Ut}_event`;globalThis[r]=n,this.run(e,`require "js";$xworker.call("${t}",JS.global[:${r}])`),delete globalThis[r]}else{const r=this.run(e,`method(:${t})`);await r.call(t,e.wrap(n))}},transform:(e,t)=>t,writeFile:()=>{throw new Error(`writeFile is not supported in ${Lt}`)}};var Jt={type:"wasmoon",module:(e="1.16.0")=>`https://cdn.jsdelivr.net/npm/wasmoon@${e}/+esm`,async engine({LuaFactory:e,LuaLibraries:t},n){const{stderr:r,stdout:s,get:o}=Ie(),a=await o((new e).createEngine());return a.global.getTable(t.Base,(e=>{a.global.setField(e,"print",s),a.global.setField(e,"printErr",r)})),n.files&&await _t(this,a,n.files),n.fetch&&await yt(this,a,n.fetch),n.js_modules&&await bt(n.js_modules),a},registerJSModule:(e,t,n)=>{e.global.set(t,n)},run:(e,t,...n)=>{try{return e.doStringSync(He(t),...n)}catch(t){Ne.get(e).stderr(t)}},runAsync:async(e,t,...n)=>{try{return await e.doString(He(t),...n)}catch(t){Ne.get(e).stderr(t)}},runEvent:async(e,t,n)=>{const[r,...s]=t.split(".");let o,a=e.global.get(r);for(const e of s)[o,a]=[a,a[e]];try{await a.call(o,n)}catch(t){Ne.get(e).stderr(t)}},transform:(e,t)=>t,writeFile:({cmodule:{module:{FS:e}}},t,n)=>((e,t,n)=>(ut(e,pt(t)),t=ft(e,t),e.writeFile(t,new Uint8Array(n),{canOwn:!0})))(e,t,n)};const qt=new WeakMap,zt=async(e,t)=>{const{shelter:n,destroy:r,io:s}=qt.get(e),{output:o,result:a}=await n.captureR(He(t));for(const{type:e,data:t}of o)s[e](t);return pe(a,r,{token:!1})};var Gt={type:"webr",experimental:!0,module:(e="0.3.3")=>`https://cdn.jsdelivr.net/npm/webr@${e}/dist/webr.mjs`,async engine(e,t){const{get:n}=Ie(),r=new e.WebR;await n(r.init().then((()=>r)));const s=await new r.Shelter;return qt.set(r,{module:e,shelter:s,destroy:s.destroy.bind(s),io:Ne.get(r)}),t.files&&await _t(this,r,t.files),t.fetch&&await yt(this,r,t.fetch),t.js_modules&&await bt(t.js_modules),r},registerJSModule(e,t){console.warn(`Experimental interpreter: module ${t} is not supported (yet)`)},run:zt,runAsync:zt,async runEvent(e,t,n){await e.evalRVoid(`${t}(event)`,{env:{event:{type:[n.type]}}})},transform:(e,t)=>(console.log("transforming",t),t),writeFile:()=>{}};const Kt=new Map,Yt=new Map,Xt=new Proxy(new Map,{get(e,t){if(!e.has(t)){const[n,...r]=t.split("@"),s=Kt.get(n),o=/^(?:\\.?\\.?\\/|https?:\\/\\/)/i.test(r)?r.join("@"):s.module(...r);e.set(t,{url:o,module:import(o),engine:s.engine.bind(s)})}const{url:n,module:r,engine:s}=e.get(t);return(e,o)=>r.then((r=>{Yt.set(t,e);for(const t of["files","fetch"]){const n=e?.[t];n&&gt.set(n,o)}for(const t of["main","worker"]){const n=e?.js_modules?.[t];n&&gt.set(n,o)}return s(r,e,n)}))}}),Vt=e=>{for(const t of[].concat(e.type))Kt.set(t,e)};for(const e of[$t,Dt,Bt,Jt,Gt])Vt(e);const Zt=async e=>(await import("./toml-DiUM0_qs.js")).parse(e),Qt=e=>{try{return JSON.parse(e)}catch(t){return Zt(e)}},en=(e,t,n,r={})=>{if(t){const[e,s]=((e,t="./config.txt")=>{let n=typeof e;return"string"===n&&/\\.(json|toml|txt)$/.test(e)?n=RegExp.$1:e=t,[Ge(e),n]})(t,n);"json"===s?r=it(e).json():"toml"===s?r=it(e).text().then(Zt):"string"===s?r=Qt(t):"object"===s&&t?r=t:"txt"===s&&"string"==typeof r&&(r=Qt(r)),t=e}return ze(r).then((n=>Xt[e](n,t)))},tn="BeforeRun",nn="AfterRun",rn=[`code${tn}`,`code${tn}Async`,`code${nn}`,`code${nn}Async`],sn=["onWorker","onReady",`on${tn}`,`on${tn}Async`,`on${nn}`,`on${nn}Async`];function on(e,t){const{run:n,runAsync:r}=Kt.get(this.type);return{...e,run:n.bind(this,t),runAsync:r.bind(this,t)}}const an=(e,t,n,r,s,o)=>{if(s||o){const a=on.bind(e,t),i=r?"runAsync":"run",c=e[i];e[i]=r?async function(e,t,...r){s&&await s.call(this,a(e),n);const i=await c.call(this,e,t,...r);return o&&await o.call(this,a(e),n),i}:function(e,t,...r){s&&s.call(this,a(e),n);const i=c.call(this,e,t,...r);return o&&o.call(this,a(e),n),i}}};let cn,ln,pn;const un=(e,t)=>{addEventListener(e,t||(async t=>{try{await cn,ln(`xworker.on${e}`,t)}catch(e){postMessage(e)}}),!!t&&{once:!0})},{parse:fn,stringify:dn}=u,{proxy:hn,window:gn,isWindowProxy:yn}=$e(self,{parse:fn,stringify:dn,transform:e=>pn?pn(e):e}),wn={sync:hn,window:gn,isWindowProxy:yn,onmessage:console.info,onerror:console.error,onmessageerror:console.warn,postMessage:postMessage.bind(self)};un("message",(({data:{options:e,config:t,configURL:n,code:r,hooks:s}})=>{cn=(async()=>{try{const{id:o,tag:a,type:i,custom:c,version:l,config:p,async:u}=e,f=((e,t="")=>`${e}@${t}`.replace(/@$/,""))(i,l),d=await en(f,t,n,p),{js_modules:h,sync_main_only:g}=Yt.get(f),y=h?.main;let w=!g;try{new SharedArrayBuffer(4),w=!0}catch(e){if(w)throw new Error(["Unable to use SharedArrayBuffer due insecure environment.","Please read requirements in MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements"].join("\\n"))}const m=Le(Kt.get(i)),_=((e,t,n,r)=>({type:t,config:n,interpreter:r,io:Ne.get(r),run:(t,...n)=>e.run(r,t,...n),runAsync:(t,...n)=>e.runAsync(r,t,...n),runEvent:(...t)=>e.runEvent(r,...t)}))(m,c||i,p,d);let b="run";if(u&&(b+="Async"),s){let e,t,n="",r="";for(const e of rn){const t=s[e];if(t){const s=e.endsWith("Async");(s&&u||!s&&!u)&&(e.startsWith("codeBefore")?n=t:r=t)}}(n||r)&&((e,t,n,r)=>{const s=e[t].bind(e);e[t]="run"===t?(e,t,...o)=>{n&&s(e,n,...o);const a=s(e,Xe(t),...o);return r&&s(e,r,...o),a}:async(e,t,...o)=>{n&&await s(e,n,...o);const a=await s(e,Xe(t),...o);return r&&await s(e,r,...o),a}})(m,b,n,r);for(const n of sn.slice(2)){const r=s[n];if(r){const s=n.endsWith("Async");if(s&&u||!s&&!u){const s=Ye(r);n.startsWith("onBefore")?e=s:t=s}}}an(m,_,wn,u,e,t)}let E,v,k,x=null,T="";w&&(({CustomEvent:E,document:v}=gn),x=o&&v.getElementById(o)||null,k=e=>Ke(x,c||i,e,!0,E));const S=kt(gn,hn,y);return((e,t,n,r)=>{if("pyodide"===e)return;const s="polyscript.js_modules";for(const e of Reflect.ownKeys(r))t.registerJSModule(n,`${s}.${e}`,et(r,e));t.registerJSModule(n,s,r)})(i,m,d,S),m.registerJSModule(d,"polyscript",{xworker:wn,currentScript:x,config:_.config,js_modules:S,get target(){return!T&&x&&("SCRIPT"===a?x.after(Ce(v.createElement(`script-${c||i}`),{id:T=`${o}-target`})):(T=o,x.replaceChildren(),x.style.display="block")),T}}),ln=m.runEvent.bind(m,d),pn=m.transform.bind(m,d),x&&k("ready"),s?.onReady&&Ye(s?.onReady).call(m,on.call(m,_,d),wn),await m[b](d,r),x&&k("done"),postMessage("polyscript:done"),d}catch(e){postMessage(e)}})(),un("error"),un("message"),un("messageerror")}));\n'.replace(
                He,
                Be
              ),
            ],
            { type: "application/javascript" }
          )
        ),
        { type: "module" }
      ),
      { postMessage: s } = r,
      o = this instanceof Rn;
    if (e.length) {
      const [t, r] = e;
      (n = tt({}, n || { type: t, version: r })).type || (n.type = t);
    }
    const [i] = mn(n.config, n.configURL),
      l = a(t)
        .text()
        .then((e) => {
          const t = o ? this.toJSON() : void 0;
          s.call(r, { options: n, config: i, code: e, hooks: t });
        }),
      c = tt(De(r, _).proxy, { importJS: vt, importCSS: Et }),
      p = Promise.withResolvers();
    return (
      rt(r, {
        sync: { value: c },
        ready: { value: p.promise },
        postMessage: { value: (e, ...t) => l.then(() => s.call(r, e, ...t)) },
        onerror: { writable: !0, configurable: !0, value: console.error },
      }),
      r.addEventListener("message", (e) => {
        const { data: t } = e,
          n = t instanceof Error;
        (n || "polyscript:done" === t) &&
          (e.stopImmediatePropagation(),
          n
            ? (p.reject(t),
              r.onerror(
                nt(e, { type: { value: "error" }, error: { value: t } })
              ))
            : p.resolve(r));
      }),
      o && this.onWorker?.(this.interpreter, r),
      r
    );
  };
const Tn = "Invalid content";
var Sn = (e) => {
  const { src: t, worker: n } = e.attributes;
  if (n) {
    let { value: r } = n;
    if (r) throw new SyntaxError("Invalid worker attribute");
    if (((r = t?.value), !r)) {
      if (t) throw new SyntaxError("Invalid worker attribute");
      if (e.childElementCount) {
        const { innerHTML: t, localName: n, type: s } = e,
          o = s || n.replace(/-script$/, "");
        (r = Qe(t)),
          console.warn(
            `Deprecated: use <script type="${o}"> for an always safe content parsing:\n`,
            r
          );
      } else r = e.textContent;
      return URL.createObjectURL(new Blob([Ze(r)], { type: "text/plain" }));
    }
    return r;
  }
  if (
    t &&
    e.textContent
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*(?:\/\/|#).*/gm, "")
      .trim()
  )
    throw new SyntaxError(Tn);
};
const Nn = (e, t) => {
    const n = ((e) => {
      let t = e;
      for (; t.parentNode; ) t = t.parentNode;
      return t;
    })(e);
    return (
      n.getElementById(t) || ((e, t = document) => t.querySelector(e))(t, n)
    );
  },
  On = new WeakMap(),
  Pn = {
    get() {
      let e = On.get(this);
      return (
        e ||
          ((e = document.createElement(`${this.type}-script`)),
          On.set(this, e),
          Cn(this)),
        e
      );
    },
    set(e) {
      "string" == typeof e
        ? On.set(this, Nn(this, e))
        : (On.set(this, e), Cn(this));
    },
  },
  In = new WeakMap(),
  $n = new Map(),
  Mn = (e, t) => {
    const n = e?.value;
    return n ? t + n : "";
  },
  Fn = (e, t, n, r, s, o, a = e) => {
    if (!$n.has(t)) {
      const i = { interpreter: gn(n, s, o), queue: it(), XWorker: An(e, r) };
      $n.set(t, i), $n.has(e) || $n.set(e, i), $n.has(a) || $n.set(a, i);
    }
    return $n.get(t);
  },
  Cn = async (e) => {
    if (In.has(e)) {
      const { target: t } = e;
      t && (e.closest("head") ? document.body.append(t) : e.after(t));
    } else {
      const {
          attributes: { async: t, config: n, env: r, target: s, version: o },
          src: i,
          type: l,
        } = e,
        c = o?.value,
        p = _n(l, c);
      let f = Mn(n, "|");
      const u = Mn(r, "") || `${p}${f}`;
      f = f.slice(1);
      const d = Sn(e);
      if (d) {
        const n = new (An(l, c))(d, { ...pt(e, l), async: !!t, config: f });
        return void In.set(st(e, "xworker", { value: n }), { xworker: n });
      }
      const h = Mn(s, ""),
        m = Fn(l, u, p, c, f);
      In.set(st(e, "target", Pn), m), h && On.set(e, Nn(e, h));
      const y = i ? a(i).text() : e.textContent;
      m.queue = m.queue.then(() =>
        (async (e, t, n, r) => {
          const { type: s } = e,
            o = ln.get(s);
          o.experimental &&
            console.warn(`The ${s} interpreter is experimental`);
          const [a, i] = await at([In.get(e).interpreter, t]);
          try {
            st(document, "currentScript", { configurable: !0, get: () => e }),
              bt(s, o, a, gt),
              o.registerJSModule(a, "polyscript", {
                XWorker: n,
                currentScript: e,
                js_modules: gt,
              }),
              ft(e, s, "ready");
            const t = o[r ? "runAsync" : "run"](a, i),
              l = ft.bind(null, e, s, "done");
            return r ? t.then(l) : l(), t;
          } finally {
            delete document.currentScript;
          }
        })(e, y, m.XWorker, !!t)
      );
    }
  },
  Wn = new Proxy(nt(null), {
    get: (e, t) => new Promise(queueMicrotask).then(() => Dn(t)),
  }),
  Dn = async (e) => {
    if ($n.has(e)) {
      const { interpreter: t, queue: n } = $n.get(e);
      return (await at([t, n]))[0];
    }
    const t = $n.size
      ? `Available interpreters are: ${[...$n.keys()]
          .map((e) => `"${e}"`)
          .join(", ")}.`
      : "There are no interpreters in this page.";
    throw new Error(`The interpreter "${e}" was not found. ${t}`);
  },
  Ln = async (e) => {
    const { type: t, currentTarget: r } = e;
    if (fn.length)
      for (let { name: s, value: o, ownerElement: a } of n(
        `./@*[${fn.map((e) => `name()="${e}${t}"`).join(" or ")}]`,
        r
      )) {
        s = s.slice(0, -(t.length + 1));
        const n = await Dn(a.getAttribute(`${s}-env`) || s);
        ln.get(s).runEvent(n, o, e);
      }
  },
  Hn = (e) => {
    if (fn.length)
      for (let { name: t, ownerElement: r } of n(
        `.//@*[${fn.map((e) => `starts-with(name(),"${e}")`).join(" or ")}]`,
        e
      )) {
        const e = t.lastIndexOf("-"),
          n = t.slice(e + 1);
        "env" !== n &&
          (r.addEventListener(n, Ln),
          "disabled" in r &&
            !r.disabled &&
            ((r.disabled = !0),
            Wn[t.slice(0, e)].then(() => {
              r.disabled = !1;
            })));
      }
  },
  Bn = An(),
  Un = [],
  Jn = new Map(),
  qn = new Map(),
  Gn = new Map(),
  zn = async (e) => {
    for (const t of Un)
      if (e.matches(t)) {
        const n = qn.get(t),
          r = Yn.get(n),
          { resolve: s } = Gn.get(n),
          { options: o, known: a } = r;
        if (a.has(e)) return;
        a.add(e);
        for (const [t, n] of Jn) e.matches(t) && (await n(e));
        const {
          interpreter: i,
          configURL: l,
          config: c,
          version: p,
          env: f,
          onerror: u,
          hooks: d,
        } = o;
        let h;
        try {
          const t = Sn(e);
          if (t) {
            const r = Bn.call(new Rn(null, d), t, {
              ...pt(e, n),
              version: p,
              configURL: l,
              type: i,
              custom: n,
              config: e.getAttribute("config") || c || {},
              async: e.hasAttribute("async"),
            });
            return (
              st(e, "xworker", { value: r }), void s({ type: n, xworker: r })
            );
          }
        } catch (e) {
          h = e;
        }
        const m = _n(i, p),
          y = f || `${m}${c ? `|${c}` : ""}`,
          { interpreter: g, XWorker: _ } = Fn(n, y, m, p, c, l, i),
          w = await g,
          b = nt(ln.get(i)),
          v = new Rn(w, d),
          E = function (...e) {
            return _.apply(v, e);
          },
          k = { ...ut(b, n, structuredClone(cn.get(m)), w), XWorker: E };
        bt(i, b, w, gt),
          b.registerJSModule(w, "polyscript", {
            XWorker: E,
            config: k.config,
            currentScript: n.startsWith("_") ? null : e,
            js_modules: gt,
          });
        for (const t of ["Run", "RunAsync"]) {
          let n,
            r,
            s = "",
            o = "";
          for (const e of En) {
            const n = d?.main?.[e];
            n &&
              e.endsWith(t) &&
              (e.startsWith("codeBefore") ? (s = Ze(n())) : (o = Ze(n())));
          }
          (s || o) && ht(b, `r${t.slice(1)}`, s, o);
          for (let e = 2; e < kn.length; e++) {
            const s = kn[e],
              o = d?.main?.[s];
            o &&
              s.endsWith(t) &&
              (s.startsWith("onBefore") ? (n = o) : (r = o));
          }
          xn(b, k, e, t.endsWith("Async"), n, r);
        }
        r.queue = r.queue.then(
          () => (s(k), h && u?.(h, e), d?.main?.onReady?.(k, e))
        );
      }
  },
  Yn = new Map();
let Vn = 0;
const Kn = (e) => (
    Gn.has(e) || Gn.set(e, Promise.withResolvers()), Gn.get(e).promise
  ),
  [
    {
      customObserver: Xn,
      define: Zn,
      whenDefined: Qn,
      env: er,
      Hook: tr,
      XWorker: nr,
    },
    rr,
  ] = e("polyscript", {
    customObserver: Jn,
    define: (e, n) => {
      let r = null == e;
      if (r) e = "_ps" + Vn++;
      else if (ln.has(e) || Yn.has(e))
        throw new Error(`<script type="${e}"> already registered`);
      if (!ln.has(n?.interpreter)) throw new Error("Unspecified interpreter");
      ln.set(e, ln.get(n.interpreter));
      const s = [`script[type="${e}"]`];
      if ((Kn(e), r)) {
        const { hooks: t } = n,
          r = t?.main?.onReady;
        (n = {
          ...n,
          hooks: {
            ...t,
            main: {
              ...t?.main,
              onReady(t, n) {
                Un.splice(Un.indexOf(e), 1),
                  ln.delete(e),
                  Yn.delete(e),
                  Gn.delete(e),
                  n.remove(),
                  r?.(t);
              },
            },
          },
        }),
          document.head.append(
            tt(document.createElement("script"), { type: e })
          );
      } else s.push(`${e}-script`), fn.push(`${e}-`);
      for (const t of s) qn.set(t, e);
      Un.push(...s),
        Yn.set(e, {
          options: tt({ env: e }, n),
          known: new WeakSet(),
          queue: Promise.resolve(),
        }),
        r || Hn(document),
        t(s.join(",")).forEach(zn);
    },
    whenDefined: Kn,
    env: Wn,
    Hook: Rn,
    XWorker: Bn,
  });
if (!rr) {
  const e = new MutationObserver((e) => {
      const t = pn.join(",");
      for (const { type: r, target: s, attributeName: o, addedNodes: a } of e)
        if ("attributes" !== r)
          for (const e of a)
            1 === e.nodeType &&
              (Hn(e), t && e.matches(t) ? Cn(e) : n(t, e, !0));
        else {
          const e = o.lastIndexOf("-") + 1;
          if (e) {
            const t = o.slice(0, e);
            for (const n of fn)
              if (t === n) {
                const t = o.slice(e);
                if ("env" !== t) {
                  const e = s.hasAttribute(o) ? "add" : "remove";
                  s[`${e}EventListener`](t, Ln);
                }
                break;
              }
          }
        }
    }),
    n = (e, n, r) => {
      e && t(e, n).forEach(Cn),
        (e = Un.join(",")) && (r && zn(n), t(e, n).forEach(zn));
    },
    r = (t) => (
      e.observe(t, { childList: !0, subtree: !0, attributes: !0 }), t
    ),
    { attachShadow: s } = Element.prototype;
  tt(Element.prototype, {
    attachShadow(e) {
      return r(s.call(this, e));
    },
  }),
    queueMicrotask(() => {
      Hn(r(document)), n(pn.join(","), document, !1);
    });
}
var sr = new Map([
  ["py", "pyodide"],
  ["mpy", "micropython"],
]);
const or = [];
for (const [e] of sr) {
  const t = [`script[type="${e}"]`, `${e}-script`];
  for (const n of document.querySelectorAll(t.join(","))) {
    const { promise: t, resolve: r } = Promise.withResolvers();
    or.push(t), n.addEventListener(`${e}:done`, r, { once: !0 });
  }
}
Promise.all(or).then(() => {
  dispatchEvent(new Event("py:all-done"));
});
var ar = {
  "deprecations-manager": () => import("./deprecations-manager-C7G0u0N7.js"),
  error: () => import("./error-DK0nt-gH.js"),
  "py-editor": () => import("./py-editor-CrcBapRX.js"),
  "py-terminal": () => import("./py-terminal-DiYGB3dU.js"),
};
const ir = {
  GENERIC: "PY0000",
  CONFLICTING_CODE: "PY0409",
  BAD_CONFIG: "PY1000",
  MICROPIP_INSTALL_ERROR: "PY1001",
  BAD_PLUGIN_FILE_EXTENSION: "PY2000",
  NO_DEFAULT_EXPORT: "PY2001",
  TOP_LEVEL_AWAIT: "PY9000",
  FETCH_ERROR: "PY0001",
  FETCH_NAME_ERROR: "PY0002",
  FETCH_UNAUTHORIZED_ERROR: "PY0401",
  FETCH_FORBIDDEN_ERROR: "PY0403",
  FETCH_NOT_FOUND_ERROR: "PY0404",
  FETCH_SERVER_ERROR: "PY0500",
  FETCH_UNAVAILABLE_ERROR: "PY0503",
};
class lr extends Error {
  constructor(e, t = "", n = "text") {
    super(`(${e}): ${t}`),
      (this.errorCode = e),
      (this.messageType = n),
      (this.name = "UserError");
  }
}
class cr extends lr {
  constructor(e, t) {
    super(e, t), (this.name = "FetchError");
  }
}
const pr = (e) => e.text();
async function fr(e, t) {
  let n;
  try {
    n = await fetch(e, t);
  } catch (t) {
    const n = t;
    let r;
    throw (
      ((r = e.startsWith("http")
        ? `Fetching from URL ${e} failed with error '${n.message}'. Are your filename and path correct?`
        : 'Polyscript: Access to local files\n        (using [[fetch]] configurations in &lt;py-config&gt;)\n        is not available when directly opening a HTML file;\n        you must use a webserver to serve the additional files.\n        See <a style="text-decoration: underline;" href="https://github.com/pyscript/pyscript/issues/257#issuecomment-1119595062">this reference</a>\n        on starting a simple webserver with Python.\n            '),
      new cr(ir.FETCH_ERROR, r))
    );
  }
  if (!n.ok) {
    const t = `Fetching from URL ${e} failed with error ${n.status} (${n.statusText}). Are your filename and path correct?`;
    switch (n.status) {
      case 404:
        throw new cr(ir.FETCH_NOT_FOUND_ERROR, t);
      case 401:
        throw new cr(ir.FETCH_UNAUTHORIZED_ERROR, t);
      case 403:
        throw new cr(ir.FETCH_FORBIDDEN_ERROR, t);
      case 500:
        throw new cr(ir.FETCH_SERVER_ERROR, t);
      case 503:
        throw new cr(ir.FETCH_UNAVAILABLE_ERROR, t);
      default:
        throw new cr(ir.FETCH_ERROR, t);
    }
  }
  return n;
}
const { BAD_CONFIG: ur, CONFLICTING_CODE: dr } = ir,
  hr = async (e, t) => {
    let n = e?.trim(),
      r = "",
      s = !1,
      o = /^{/.test(n) && /}$/.test(n);
    if (!o && /\.(\w+)(?:\?\S*)?$/.test(n)) {
      const e = RegExp.$1;
      "json" === e && "toml" !== t
        ? (o = !0)
        : "toml" === e && "json" !== t
        ? (s = !0)
        : ((e, t = "") => {
            let n = `(${ur}): Invalid URL: ${e}`;
            throw (t && (n += `\nexpected ${t} content`), new Error(n));
          })(n, t),
        (r = n),
        (n = (await fr(r).then(pr)).trim());
    }
    return { json: o, toml: s || (!o && !!n), text: n, url: r };
  },
  mr = (e) => new Error(`(${dr}): ${e}`),
  yr = (e, t, { message: n }) => {
    let r = `(${ur}): Invalid ${e}`;
    return t && (r += ` @ ${t}`), new SyntaxError(`${r}\n${n}`);
  },
  gr = new Map();
for (const [e] of sr) {
  let n,
    r,
    s,
    o,
    a,
    i,
    l,
    c = t(`${e}-config`),
    p = t(
      [
        `script[type="${e}"][config]:not([worker])`,
        `${e}-script[config]:not([worker])`,
      ].join(",")
    );
  if (
    (c.length > 1
      ? (s = mr(`Too many ${e}-config`))
      : c.length && p.length
      ? (s = mr(`Ambiguous ${e}-config VS config attribute`))
      : c.length
      ? (([l] = c),
        (a = l.getAttribute("src") || l.textContent),
        (i = l.getAttribute("type")))
      : p.length &&
        (([l, ...p] = p),
        (a = l.getAttribute("config")),
        p.some((e) => e.getAttribute("config") !== a) &&
          (s = mr("Unable to use different configs on main"))),
    !s && a)
  )
    try {
      const { json: e, toml: t, text: n, url: l } = await hr(a, i);
      if (
        (l && (o = new URL(l, location.href).href), (a = n), e || "json" === i)
      )
        try {
          r = JSON.parse(n);
        } catch (e) {
          s = yr("JSON", l, e);
        }
      else if (t || "toml" === i)
        try {
          const { parse: e } = await import("./toml-CvAfdf9_.js");
          r = e(n);
        } catch (e) {
          s = yr("TOML", l, e);
        }
    } catch (e) {
      s = e;
    }
  const f = [];
  for (const [e, t] of Object.entries(ar))
    s
      ? "error" === e && t().then(({ notify: e }) => e(s.message))
      : r?.plugins?.includes(`!${e}`) ||
        f.push(t().then(({ default: e }) => e));
  (n = Promise.all(f)),
    gr.set(e, { config: r, configURL: o, plugins: n, error: s });
}
var _r = {
  is_pyterminal: () => !1,
  sleep: (e) => new Promise((t) => setTimeout(t, 1e3 * e)),
};
const wr = (e) => {
    st(document, "currentScript", { configurable: !0, get: () => e });
  },
  br = () => {
    delete document.currentScript;
  };
var vr = async (e, t, n, r) => {
  const s = r.endsWith("Async");
  (r.startsWith("onBefore") ? wr : br)(n);
  for (const o of e(r)) s ? await o(t, n) : o(t, n);
};
const Er = () => !0,
  kr = (e) => {
    throw new TypeError(e);
  },
  jr = (e, t) => {
    const n = [];
    if (e)
      for (const t of e.split(/\s*\|\s*/))
        "object" === t
          ? n.push((e) => null !== e && typeof e === t)
          : "null" === t
          ? n.push((e) => null === e)
          : n.push((e) => typeof e === t);
    if (t) for (const e of [].concat(t)) n.push((t) => t instanceof e);
    switch (n.length) {
      case 0:
        return Er;
      case 1:
        return n[0];
      default:
        return (e) => n.some((t) => t(e));
    }
  },
  xr =
    (e, t, n, r = kr) =>
    (s) => {
      const o = [`Invalid ${typeof s} ${n}: expected `];
      e && (o.push(e), t && o.push(" or ")),
        t &&
          (o.push("an instanceof "),
          o.push(
            []
              .concat(t)
              .map(({ name: e }) => e)
              .join(" | ")
          )),
        r(o.join(""), s);
    },
  Rr = ((e) => (t) => {
    const [n, r] = ((e, t = "value") => {
      const n = e?.typeof,
        r = e?.instanceof;
      return [jr(n, r), xr(n, r, t, e?.onerror)];
    })(t);
    return class extends e {
      add(e) {
        return n(e) ? super.add(e) : r(e);
      }
    };
  })(Set);
const { entries: Ar } = Object,
  Tr = [
    "import os as _os",
    "from pathlib import Path as _Path",
    "_path = None",
  ],
  Sr = new (class extends Array {
    #e = !1;
    #t;
    #n;
    constructor(e, ...t) {
      super(), (this.#n = e), (this.#t = t);
    }
    push(...e) {
      return this.#e && super.push(...e), this.#n.push(...e);
    }
    path(e) {
      for (const t of this.#t) if ((this.#e = e.startsWith(t))) break;
    }
  })(Tr, "./pyweb"),
  Nr = (e, t) => {
    for (const [n, r] of Ar(t))
      if (
        (Sr.path(`${e}/${n}`),
        Sr.push(`_path = _Path("${e}/${n}")`),
        "string" == typeof r)
      ) {
        const e = JSON.stringify(r);
        Sr.push(`_path.write_text(${e},encoding="utf-8")`);
      } else
        Sr.push(`if not _os.path.exists("${e}/${n}"):`),
          Sr.push("    _path.mkdir(parents=True, exist_ok=True)"),
          Nr(`${e}/${n}`, r);
  };
Nr(".", {
  pyscript: {
    "__init__.py":
      '# Some notes about the naming conventions and the relationship between various\n# similar-but-different names.\n#\n# import pyscript\n#     this package contains the main user-facing API offered by pyscript. All\n#     the names which are supposed be used by end users should be made\n#     available in pyscript/__init__.py (i.e., this file)\n#\n# import _pyscript\n#     this is an internal module implemented in JS. It is used internally by\n#     the pyscript package, end users should not use it directly. For its\n#     implementation, grep for `interpreter.registerJsModule("_pyscript",\n#     ...)` in core.js\n#\n# import js\n#     this is the JS globalThis, as exported by pyodide and/or micropython\'s\n#     FFIs. As such, it contains different things in the main thread or in a\n#     worker.\n#\n# import pyscript.magic_js\n#     this submodule abstracts away some of the differences between the main\n#     thread and the worker. In particular, it defines `window` and `document`\n#     in such a way that these names work in both cases: in the main thread,\n#     they are the "real" objects, in the worker they are proxies which work\n#     thanks to coincident.\n#\n# from pyscript import window, document\n#     these are just the window and document objects as defined by\n#     pyscript.magic_js. This is the blessed way to access them from pyscript,\n#     as it works transparently in both the main thread and worker cases.\n\nfrom pyscript.display import HTML, display\nfrom pyscript.fetch import fetch\nfrom pyscript.magic_js import (\n    RUNNING_IN_WORKER,\n    PyWorker,\n    config,\n    current_target,\n    document,\n    js_modules,\n    sync,\n    window,\n)\nfrom pyscript.websocket import WebSocket\n\ntry:\n    from pyscript.event_handling import when\nexcept:\n    # TODO: should we remove this? Or at the very least, we should capture\n    # the traceback otherwise it\'s very hard to debug\n    from pyscript.util import NotSupported\n\n    when = NotSupported(\n        "pyscript.when", "pyscript.when currently not available with this interpreter"\n    )\n',
    "display.py":
      'import base64\nimport html\nimport io\nimport re\n\nfrom pyscript.magic_js import current_target, document, window\n\n_MIME_METHODS = {\n    "savefig": "image/png",\n    "_repr_javascript_": "application/javascript",\n    "_repr_json_": "application/json",\n    "_repr_latex": "text/latex",\n    "_repr_png_": "image/png",\n    "_repr_jpeg_": "image/jpeg",\n    "_repr_pdf_": "application/pdf",\n    "_repr_svg_": "image/svg+xml",\n    "_repr_markdown_": "text/markdown",\n    "_repr_html_": "text/html",\n    "__repr__": "text/plain",\n}\n\n\ndef _render_image(mime, value, meta):\n    # If the image value is using bytes we should convert it to base64\n    # otherwise it will return raw bytes and the browser will not be able to\n    # render it.\n    if isinstance(value, bytes):\n        value = base64.b64encode(value).decode("utf-8")\n\n    # This is the pattern of base64 strings\n    base64_pattern = re.compile(\n        r"^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$"\n    )\n    # If value doesn\'t match the base64 pattern we should encode it to base64\n    if len(value) > 0 and not base64_pattern.match(value):\n        value = base64.b64encode(value.encode("utf-8")).decode("utf-8")\n\n    data = f"data:{mime};charset=utf-8;base64,{value}"\n    attrs = " ".join([\'{k}="{v}"\' for k, v in meta.items()])\n    return f\'<img src="{data}" {attrs}></img>\'\n\n\ndef _identity(value, meta):\n    return value\n\n\n_MIME_RENDERERS = {\n    "text/plain": html.escape,\n    "text/html": _identity,\n    "image/png": lambda value, meta: _render_image("image/png", value, meta),\n    "image/jpeg": lambda value, meta: _render_image("image/jpeg", value, meta),\n    "image/svg+xml": _identity,\n    "application/json": _identity,\n    "application/javascript": lambda value, meta: f"<script>{value}<\\\\/script>",\n}\n\n\nclass HTML:\n    """\n    Wrap a string so that display() can render it as plain HTML\n    """\n\n    def __init__(self, html):\n        self._html = html\n\n    def _repr_html_(self):\n        return self._html\n\n\ndef _eval_formatter(obj, print_method):\n    """\n    Evaluates a formatter method.\n    """\n    if print_method == "__repr__":\n        return repr(obj)\n    elif hasattr(obj, print_method):\n        if print_method == "savefig":\n            buf = io.BytesIO()\n            obj.savefig(buf, format="png")\n            buf.seek(0)\n            return base64.b64encode(buf.read()).decode("utf-8")\n        return getattr(obj, print_method)()\n    elif print_method == "_repr_mimebundle_":\n        return {}, {}\n    return None\n\n\ndef _format_mime(obj):\n    """\n    Formats object using _repr_x_ methods.\n    """\n    if isinstance(obj, str):\n        return html.escape(obj), "text/plain"\n\n    mimebundle = _eval_formatter(obj, "_repr_mimebundle_")\n    if isinstance(mimebundle, tuple):\n        format_dict, _ = mimebundle\n    else:\n        format_dict = mimebundle\n\n    output, not_available = None, []\n    for method, mime_type in _MIME_METHODS.items():\n        if mime_type in format_dict:\n            output = format_dict[mime_type]\n        else:\n            output = _eval_formatter(obj, method)\n\n        if output is None:\n            continue\n        elif mime_type not in _MIME_RENDERERS:\n            not_available.append(mime_type)\n            continue\n        break\n    if output is None:\n        if not_available:\n            window.console.warn(\n                f"Rendered object requested unavailable MIME renderers: {not_available}"\n            )\n        output = repr(output)\n        mime_type = "text/plain"\n    elif isinstance(output, tuple):\n        output, meta = output\n    else:\n        meta = {}\n    return _MIME_RENDERERS[mime_type](output, meta), mime_type\n\n\ndef _write(element, value, append=False):\n    html, mime_type = _format_mime(value)\n    if html == "\\\\n":\n        return\n\n    if append:\n        out_element = document.createElement("div")\n        element.append(out_element)\n    else:\n        out_element = element.lastElementChild\n        if out_element is None:\n            out_element = element\n\n    if mime_type in ("application/javascript", "text/html"):\n        script_element = document.createRange().createContextualFragment(html)\n        out_element.append(script_element)\n    else:\n        out_element.innerHTML = html\n\n\ndef display(*values, target=None, append=True):\n    if target is None:\n        target = current_target()\n    elif not isinstance(target, str):\n        raise TypeError(f"target must be str or None, not {target.__class__.__name__}")\n    elif target == "":\n        raise ValueError("Cannot have an empty target")\n    elif target.startswith("#"):\n        # note: here target is str and not None!\n        # align with @when behavior\n        target = target[1:]\n\n    element = document.getElementById(target)\n\n    # If target cannot be found on the page, a ValueError is raised\n    if element is None:\n        raise ValueError(\n            f"Invalid selector with id={target}. Cannot be found in the page."\n        )\n\n    # if element is a <script type="py">, it has a \'target\' attribute which\n    # points to the visual element holding the displayed values. In that case,\n    # use that.\n    if element.tagName == "SCRIPT" and hasattr(element, "target"):\n        element = element.target\n\n    for v in values:\n        if not append:\n            element.replaceChildren()\n        _write(element, v, append=append)\n',
    "event_handling.py":
      'import inspect\n\ntry:\n    from pyodide.ffi.wrappers import add_event_listener\n\nexcept ImportError:\n\n    def add_event_listener(el, event_type, func):\n        el.addEventListener(event_type, func)\n\n\nfrom pyscript.magic_js import document\n\n\ndef when(event_type=None, selector=None):\n    """\n    Decorates a function and passes py-* events to the decorated function\n    The events might or not be an argument of the decorated function\n    """\n\n    def decorator(func):\n        if isinstance(selector, str):\n            elements = document.querySelectorAll(selector)\n        else:\n            # TODO: This is a hack that will be removed when pyscript becomes a package\n            #       and we can better manage the imports without circular dependencies\n            from pyweb import pydom\n\n            if isinstance(selector, pydom.Element):\n                elements = [selector._js]\n            elif isinstance(selector, pydom.ElementCollection):\n                elements = [el._js for el in selector]\n            else:\n                raise ValueError(\n                    f"Invalid selector: {selector}. Selector must"\n                    " be a string, a pydom.Element or a pydom.ElementCollection."\n                )\n        try:\n            sig = inspect.signature(func)\n            # Function doesn\'t receive events\n            if not sig.parameters:\n\n                def wrapper(*args, **kwargs):\n                    func()\n\n            else:\n                wrapper = func\n\n        except AttributeError:\n            # TODO: this is currently an quick hack to get micropython working but we need\n            #       to actually properly replace inspect.signature with something else\n            def wrapper(*args, **kwargs):\n                try:\n                    return func(*args, **kwargs)\n                except TypeError as e:\n                    if "takes 0 positional arguments" in str(e):\n                        return func()\n\n                    raise\n\n        for el in elements:\n            add_event_listener(el, event_type, wrapper)\n\n        return func\n\n    return decorator\n',
    "fetch.py":
      'import json\n\nimport js\nfrom pyscript.util import as_bytearray\n\n\n### wrap the response to grant Pythonic results\nclass _Response:\n    def __init__(self, response):\n        self._response = response\n\n    # grant access to response.ok and other fields\n    def __getattr__(self, attr):\n        return getattr(self._response, attr)\n\n    # exposed methods with Pythonic results\n    async def arrayBuffer(self):\n        buffer = await self._response.arrayBuffer()\n        # works in Pyodide\n        if hasattr(buffer, "to_py"):\n            return buffer.to_py()\n        # shims in MicroPython\n        return memoryview(as_bytearray(buffer))\n\n    async def blob(self):\n        return await self._response.blob()\n\n    async def bytearray(self):\n        buffer = await self._response.arrayBuffer()\n        return as_bytearray(buffer)\n\n    async def json(self):\n        return json.loads(await self.text())\n\n    async def text(self):\n        return await self._response.text()\n\n\n### allow direct await to _Response methods\nclass _DirectResponse:\n    @staticmethod\n    def setup(promise, response):\n        promise._response = _Response(response)\n        return promise._response\n\n    def __init__(self, promise):\n        self._promise = promise\n        promise._response = None\n        promise.arrayBuffer = self.arrayBuffer\n        promise.blob = self.blob\n        promise.bytearray = self.bytearray\n        promise.json = self.json\n        promise.text = self.text\n\n    async def _response(self):\n        if not self._promise._response:\n            await self._promise\n        return self._promise._response\n\n    async def arrayBuffer(self):\n        response = await self._response()\n        return await response.arrayBuffer()\n\n    async def blob(self):\n        response = await self._response()\n        return await response.blob()\n\n    async def bytearray(self):\n        response = await self._response()\n        return await response.bytearray()\n\n    async def json(self):\n        response = await self._response()\n        return await response.json()\n\n    async def text(self):\n        response = await self._response()\n        return await response.text()\n\n\ndef fetch(url, **kw):\n    # workaround Pyodide / MicroPython dict <-> js conversion\n    options = js.JSON.parse(json.dumps(kw))\n    awaited = lambda response, *args: _DirectResponse.setup(promise, response)\n    promise = js.fetch(url, options).then(awaited)\n    _DirectResponse(promise)\n    return promise\n',
    "ffi.py":
      'try:\n    import js\n    from pyodide.ffi import create_proxy as _cp\n    from pyodide.ffi import to_js as _py_tjs\n\n    from_entries = js.Object.fromEntries\n\n    def _tjs(value, **kw):\n        if not hasattr(kw, "dict_converter"):\n            kw["dict_converter"] = from_entries\n        return _py_tjs(value, **kw)\n\nexcept:\n    from jsffi import create_proxy as _cp\n    from jsffi import to_js as _tjs\n\ncreate_proxy = _cp\nto_js = _tjs\n',
    "magic_js.py":
      'import json\nimport sys\n\nimport js as globalThis\nfrom polyscript import config as _config\nfrom polyscript import js_modules\nfrom pyscript.util import NotSupported\n\nRUNNING_IN_WORKER = not hasattr(globalThis, "document")\n\nconfig = json.loads(globalThis.JSON.stringify(_config))\n\n\n# allow `from pyscript.js_modules.xxx import yyy`\nclass JSModule:\n    def __init__(self, name):\n        self.name = name\n\n    def __getattr__(self, field):\n        # avoid pyodide looking for non existent fields\n        if not field.startswith("_"):\n            return getattr(getattr(js_modules, self.name), field)\n\n\n# generate N modules in the system that will proxy the real value\nfor name in globalThis.Reflect.ownKeys(js_modules):\n    sys.modules[f"pyscript.js_modules.{name}"] = JSModule(name)\nsys.modules["pyscript.js_modules"] = js_modules\n\nif RUNNING_IN_WORKER:\n    import polyscript\n\n    PyWorker = NotSupported(\n        "pyscript.PyWorker",\n        "pyscript.PyWorker works only when running in the main thread",\n    )\n\n    try:\n        globalThis.SharedArrayBuffer.new(4)\n        import js\n\n        window = polyscript.xworker.window\n        document = window.document\n        js.document = document\n    except:\n        globalThis.console.debug("SharedArrayBuffer is not available")\n        # in this scenario none of the utilities would work\n        # as expected so we better export these as NotSupported\n        window = NotSupported(\n            "pyscript.window",\n            "pyscript.window in workers works only via SharedArrayBuffer",\n        )\n        document = NotSupported(\n            "pyscript.document",\n            "pyscript.document in workers works only via SharedArrayBuffer",\n        )\n\n    sync = polyscript.xworker.sync\n\n    # in workers the display does not have a default ID\n    # but there is a sync utility from xworker\n    def current_target():\n        return polyscript.target\n\nelse:\n    import _pyscript\n    from _pyscript import PyWorker\n\n    window = globalThis\n    document = globalThis.document\n    sync = NotSupported(\n        "pyscript.sync", "pyscript.sync works only when running in a worker"\n    )\n\n    # in MAIN the current element target exist, just use it\n    def current_target():\n        return _pyscript.target\n',
    "util.py":
      'import js\n\n\ndef as_bytearray(buffer):\n    ui8a = js.Uint8Array.new(buffer)\n    size = ui8a.length\n    ba = bytearray(size)\n    for i in range(0, size):\n        ba[i] = ui8a[i]\n    return ba\n\n\nclass NotSupported:\n    """\n    Small helper that raises exceptions if you try to get/set any attribute on\n    it.\n    """\n\n    def __init__(self, name, error):\n        object.__setattr__(self, "name", name)\n        object.__setattr__(self, "error", error)\n\n    def __repr__(self):\n        return f"<NotSupported {self.name} [{self.error}]>"\n\n    def __getattr__(self, attr):\n        raise AttributeError(self.error)\n\n    def __setattr__(self, attr, value):\n        raise AttributeError(self.error)\n\n    def __call__(self, *args):\n        raise TypeError(self.error)\n',
    "websocket.py":
      'import js\nfrom pyscript.util import as_bytearray\n\ncode = "code"\nprotocols = "protocols"\nreason = "reason"\n\n\nclass EventMessage:\n    def __init__(self, event):\n        self._event = event\n\n    def __getattr__(self, attr):\n        value = getattr(self._event, attr)\n\n        if attr == "data" and not isinstance(value, str):\n            if hasattr(value, "to_py"):\n                return value.to_py()\n            # shims in MicroPython\n            return memoryview(as_bytearray(value))\n\n        return value\n\n\nclass WebSocket(object):\n    CONNECTING = 0\n    OPEN = 1\n    CLOSING = 2\n    CLOSED = 3\n\n    def __init__(self, **kw):\n        url = kw["url"]\n        if protocols in kw:\n            socket = js.WebSocket.new(url, kw[protocols])\n        else:\n            socket = js.WebSocket.new(url)\n        object.__setattr__(self, "_ws", socket)\n\n        for t in ["onclose", "onerror", "onmessage", "onopen"]:\n            if t in kw:\n                socket[t] = kw[t]\n\n    def __getattr__(self, attr):\n        return getattr(self._ws, attr)\n\n    def __setattr__(self, attr, value):\n        if attr == "onmessage":\n            self._ws[attr] = lambda e: value(EventMessage(e))\n        else:\n            self._ws[attr] = value\n\n    def close(self, **kw):\n        if code in kw and reason in kw:\n            self._ws.close(kw[code], kw[reason])\n        elif code in kw:\n            self._ws.close(kw[code])\n        else:\n            self._ws.close()\n\n    def send(self, data):\n        if isinstance(data, str):\n            self._ws.send(data)\n        else:\n            buffer = js.Uint8Array.new(len(data))\n            for pos, b in enumerate(data):\n                buffer[pos] = b\n            self._ws.send(buffer)\n',
  },
  pyweb: {
    "__init__.py": "from .pydom import dom as pydom\n",
    "media.py":
      'from pyodide.ffi import to_js\nfrom pyscript import window\n\n\nclass Device:\n    """Device represents a media input or output device, such as a microphone,\n    camera, or headset.\n    """\n\n    def __init__(self, device):\n        self._js = device\n\n    @property\n    def id(self):\n        return self._js.deviceId\n\n    @property\n    def group(self):\n        return self._js.groupId\n\n    @property\n    def kind(self):\n        return self._js.kind\n\n    @property\n    def label(self):\n        return self._js.label\n\n    def __getitem__(self, key):\n        return getattr(self, key)\n\n    @classmethod\n    async def load(cls, audio=False, video=True):\n        """Load the device stream."""\n        options = window.Object.new()\n        options.audio = audio\n        if isinstance(video, bool):\n            options.video = video\n        else:\n            # TODO: Think this can be simplified but need to check it on the pyodide side\n\n            # TODO: this is pyodide specific. shouldn\'t be!\n            options.video = window.Object.new()\n            for k in video:\n                setattr(\n                    options.video,\n                    k,\n                    to_js(video[k], dict_converter=window.Object.fromEntries),\n                )\n\n        stream = await window.navigator.mediaDevices.getUserMedia(options)\n        return stream\n\n    async def get_stream(self):\n        key = self.kind.replace("input", "").replace("output", "")\n        options = {key: {"deviceId": {"exact": self.id}}}\n\n        return await self.load(**options)\n\n\nasync def list_devices() -> list[dict]:\n    """\n    Return the list of the currently available media input and output devices,\n    such as microphones, cameras, headsets, and so forth.\n\n    Output:\n\n        list(dict) - list of dictionaries representing the available media devices.\n            Each dictionary has the following keys:\n            * deviceId: a string that is an identifier for the represented device\n                that is persisted across sessions. It is un-guessable by other\n                applications and unique to the origin of the calling application.\n                It is reset when the user clears cookies (for Private Browsing, a\n                different identifier is used that is not persisted across sessions).\n\n            * groupId: a string that is a group identifier. Two devices have the same\n                group identifier if they belong to the same physical device — for\n                example a monitor with both a built-in camera and a microphone.\n\n            * kind: an enumerated value that is either "videoinput", "audioinput"\n                or "audiooutput".\n\n            * label: a string describing this device (for example "External USB\n                Webcam").\n\n    Note: the returned list will omit any devices that are blocked by the document\n    Permission Policy: microphone, camera, speaker-selection (for output devices),\n    and so on. Access to particular non-default devices is also gated by the\n    Permissions API, and the list will omit devices for which the user has not\n    granted explicit permission.\n    """\n    # https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices\n    return [\n        Device(obj) for obj in await window.navigator.mediaDevices.enumerateDevices()\n    ]\n',
    "pydom.py":
      'try:\n    from typing import Any\nexcept ImportError:\n    Any = "Any"\n\ntry:\n    import warnings\nexcept ImportError:\n    # TODO: For now it probably means we are in MicroPython. We should figure\n    # out the "right" way to handle this. For now we just ignore the warning\n    # and logging to console\n    class warnings:\n        @staticmethod\n        def warn(*args, **kwargs):\n            print("WARNING: ", *args, **kwargs)\n\n\ntry:\n    from functools import cached_property\nexcept ImportError:\n    # TODO: same comment about micropython as above\n    cached_property = property\n\ntry:\n    from pyodide.ffi import JsProxy\nexcept ImportError:\n    # TODO: same comment about micropython as above\n    def JsProxy(obj):\n        return obj\n\n\nfrom pyscript import display, document, window\n\nalert = window.alert\n\n\nclass BaseElement:\n    def __init__(self, js_element):\n        self._js = js_element\n        self._parent = None\n        self.style = StyleProxy(self)\n        self._proxies = {}\n\n    def __eq__(self, obj):\n        """Check if the element is the same as the other element by comparing\n        the underlying JS element"""\n        return isinstance(obj, BaseElement) and obj._js == self._js\n\n    @property\n    def parent(self):\n        if self._parent:\n            return self._parent\n\n        if self._js.parentElement:\n            self._parent = self.__class__(self._js.parentElement)\n\n        return self._parent\n\n    @property\n    def __class(self):\n        return self.__class__ if self.__class__ != PyDom else Element\n\n    def create(self, type_, is_child=True, classes=None, html=None, label=None):\n        js_el = document.createElement(type_)\n        element = self.__class(js_el)\n\n        if classes:\n            for class_ in classes:\n                element.add_class(class_)\n\n        if html is not None:\n            element.html = html\n\n        if label is not None:\n            element.label = label\n\n        if is_child:\n            self.append(element)\n\n        return element\n\n    def find(self, selector):\n        """Return an ElementCollection representing all the child elements that\n        match the specified selector.\n\n        Args:\n            selector (str): A string containing a selector expression\n\n        Returns:\n            ElementCollection: A collection of elements matching the selector\n        """\n        elements = self._js.querySelectorAll(selector)\n        if not elements:\n            return None\n        return ElementCollection([Element(el) for el in elements])\n\n\nclass Element(BaseElement):\n    @property\n    def children(self):\n        return [self.__class__(el) for el in self._js.children]\n\n    def append(self, child):\n        # TODO: this is Pyodide specific for now!!!!!!\n        # if we get passed a JSProxy Element directly we just map it to the\n        # higher level Python element\n        if isinstance(child, JsProxy):\n            return self.append(Element(child))\n\n        elif isinstance(child, Element):\n            self._js.appendChild(child._js)\n\n            return child\n\n        elif isinstance(child, ElementCollection):\n            for el in child:\n                self.append(el)\n\n    # -------- Pythonic Interface to Element -------- #\n    @property\n    def html(self):\n        return self._js.innerHTML\n\n    @html.setter\n    def html(self, value):\n        self._js.innerHTML = value\n\n    @property\n    def text(self):\n        return self._js.textContent\n\n    @text.setter\n    def text(self, value):\n        self._js.textContent = value\n\n    @property\n    def content(self):\n        # TODO: This breaks with with standard template elements. Define how to best\n        #       handle this specifica use case. Just not support for now?\n        if self._js.tagName == "TEMPLATE":\n            warnings.warn(\n                "Content attribute not supported for template elements.", stacklevel=2\n            )\n            return None\n        return self._js.innerHTML\n\n    @content.setter\n    def content(self, value):\n        # TODO: (same comment as above)\n        if self._js.tagName == "TEMPLATE":\n            warnings.warn(\n                "Content attribute not supported for template elements.", stacklevel=2\n            )\n            return\n\n        display(value, target=self.id)\n\n    @property\n    def id(self):\n        return self._js.id\n\n    @id.setter\n    def id(self, value):\n        self._js.id = value\n\n    @property\n    def options(self):\n        if "options" in self._proxies:\n            return self._proxies["options"]\n\n        if not self._js.tagName.lower() in {"select", "datalist", "optgroup"}:\n            raise AttributeError(\n                f"Element {self._js.tagName} has no options attribute."\n            )\n        self._proxies["options"] = OptionsProxy(self)\n        return self._proxies["options"]\n\n    @property\n    def value(self):\n        return self._js.value\n\n    @value.setter\n    def value(self, value):\n        # in order to avoid confusion to the user, we don\'t allow setting the\n        # value of elements that don\'t have a value attribute\n        if not hasattr(self._js, "value"):\n            raise AttributeError(\n                f"Element {self._js.tagName} has no value attribute. If you want to "\n                "force a value attribute, set it directly using the `_js.value = <value>` "\n                "javascript API attribute instead."\n            )\n        self._js.value = value\n\n    @property\n    def selected(self):\n        return self._js.selected\n\n    @selected.setter\n    def selected(self, value):\n        # in order to avoid confusion to the user, we don\'t allow setting the\n        # value of elements that don\'t have a value attribute\n        if not hasattr(self._js, "selected"):\n            raise AttributeError(\n                f"Element {self._js.tagName} has no value attribute. If you want to "\n                "force a value attribute, set it directly using the `_js.value = <value>` "\n                "javascript API attribute instead."\n            )\n        self._js.selected = value\n\n    def clone(self, new_id=None):\n        clone = Element(self._js.cloneNode(True))\n        clone.id = new_id\n\n        return clone\n\n    def remove_class(self, classname):\n        classList = self._js.classList\n        if isinstance(classname, list):\n            classList.remove(*classname)\n        else:\n            classList.remove(classname)\n        return self\n\n    def add_class(self, classname):\n        classList = self._js.classList\n        if isinstance(classname, list):\n            classList.add(*classname)\n        else:\n            self._js.classList.add(classname)\n        return self\n\n    @property\n    def classes(self):\n        classes = self._js.classList.values()\n        return [x for x in classes]\n\n    def show_me(self):\n        self._js.scrollIntoView()\n\n    def snap(\n        self,\n        to: BaseElement | str = None,\n        width: int | None = None,\n        height: int | None = None,\n    ):\n        """\n        Captures a snapshot of a video element. (Only available for video elements)\n\n        Inputs:\n\n            * to: element where to save the snapshot of the video frame to\n            * width: width of the image\n            * height: height of the image\n\n        Output:\n            (Element) canvas element where the video frame snapshot was drawn into\n        """\n        if self._js.tagName != "VIDEO":\n            raise AttributeError("Snap method is only available for video Elements")\n\n        if to is None:\n            canvas = self.create("canvas")\n            if width is None:\n                width = self._js.width\n            if height is None:\n                height = self._js.height\n            canvas._js.width = width\n            canvas._js.height = height\n\n        elif isistance(to, Element):\n            if to._js.tagName != "CANVAS":\n                raise TypeError("Element to snap to must a canvas.")\n            canvas = to\n        elif getattr(to, "tagName", "") == "CANVAS":\n            canvas = Element(to)\n        elif isinstance(to, str):\n            canvas = pydom[to][0]\n            if canvas._js.tagName != "CANVAS":\n                raise TypeError("Element to snap to must a be canvas.")\n\n        canvas.draw(self, width, height)\n\n        return canvas\n\n    def download(self, filename: str = "snapped.png") -> None:\n        """Download the current element (only available for canvas elements) with the filename\n        provided in input.\n\n        Inputs:\n            * filename (str): name of the file being downloaded\n\n        Output:\n            None\n        """\n        if self._js.tagName != "CANVAS":\n            raise AttributeError(\n                "The download method is only available for canvas Elements"\n            )\n\n        link = self.create("a")\n        link._js.download = filename\n        link._js.href = self._js.toDataURL()\n        link._js.click()\n\n    def draw(self, what, width, height):\n        """Draw `what` on the current element  (only available for canvas elements).\n\n        Inputs:\n\n            * what (canvas image source): An element to draw into the context. The specification permits any canvas\n                image source, specifically, an HTMLImageElement, an SVGImageElement, an HTMLVideoElement,\n                an HTMLCanvasElement, an ImageBitmap, an OffscreenCanvas, or a VideoFrame.\n        """\n        if self._js.tagName != "CANVAS":\n            raise AttributeError(\n                "The draw method is only available for canvas Elements"\n            )\n\n        if isinstance(what, Element):\n            what = what._js\n\n        # https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage\n        self._js.getContext("2d").drawImage(what, 0, 0, width, height)\n\n\nclass OptionsProxy:\n    """This class represents the options of a select element. It\n    allows to access to add and remove options by using the `add` and `remove` methods.\n    """\n\n    def __init__(self, element: Element) -> None:\n        self._element = element\n        if self._element._js.tagName.lower() != "select":\n            raise AttributeError(\n                f"Element {self._element._js.tagName} has no options attribute."\n            )\n\n    def add(\n        self,\n        value: Any = None,\n        html: str = None,\n        text: str = None,\n        before: Element | int = None,\n        **kws,\n    ) -> None:\n        """Add a new option to the select element"""\n        # create the option element and set the attributes\n        option = document.createElement("option")\n        if value is not None:\n            kws["value"] = value\n        if html is not None:\n            option.innerHTML = html\n        if text is not None:\n            kws["text"] = text\n\n        for key, value in kws.items():\n            option.setAttribute(key, value)\n\n        if before:\n            if isinstance(before, Element):\n                before = before._js\n\n        self._element._js.add(option, before)\n\n    def remove(self, item: int) -> None:\n        """Remove the option at the specified index"""\n        self._element._js.remove(item)\n\n    def clear(self) -> None:\n        """Remove all the options"""\n        for i in range(len(self)):\n            self.remove(0)\n\n    @property\n    def options(self):\n        """Return the list of options"""\n        return [Element(opt) for opt in self._element._js.options]\n\n    @property\n    def selected(self):\n        """Return the selected option"""\n        return self.options[self._element._js.selectedIndex]\n\n    def __iter__(self):\n        yield from self.options\n\n    def __len__(self):\n        return len(self.options)\n\n    def __repr__(self):\n        return f"{self.__class__.__name__} (length: {len(self)}) {self.options}"\n\n    def __getitem__(self, key):\n        return self.options[key]\n\n\nclass StyleProxy:  # (dict):\n    def __init__(self, element: Element) -> None:\n        self._element = element\n\n    @cached_property\n    def _style(self):\n        return self._element._js.style\n\n    def __getitem__(self, key):\n        return self._style.getPropertyValue(key)\n\n    def __setitem__(self, key, value):\n        self._style.setProperty(key, value)\n\n    def remove(self, key):\n        self._style.removeProperty(key)\n\n    def set(self, **kws):\n        for k, v in kws.items():\n            self._element._js.style.setProperty(k, v)\n\n    # CSS Properties\n    # Reference: https://github.com/microsoft/TypeScript/blob/main/src/lib/dom.generated.d.ts#L3799C1-L5005C2\n    # Following prperties automatically generated from the above reference using\n    # tools/codegen_css_proxy.py\n    @property\n    def visible(self):\n        return self._element._js.style.visibility\n\n    @visible.setter\n    def visible(self, value):\n        self._element._js.style.visibility = value\n\n\nclass StyleCollection:\n    def __init__(self, collection: "ElementCollection") -> None:\n        self._collection = collection\n\n    def __get__(self, obj, objtype=None):\n        return obj._get_attribute("style")\n\n    def __getitem__(self, key):\n        return self._collection._get_attribute("style")[key]\n\n    def __setitem__(self, key, value):\n        for element in self._collection._elements:\n            element.style[key] = value\n\n    def remove(self, key):\n        for element in self._collection._elements:\n            element.style.remove(key)\n\n\nclass ElementCollection:\n    def __init__(self, elements: [Element]) -> None:\n        self._elements = elements\n        self.style = StyleCollection(self)\n\n    def __getitem__(self, key):\n        # If it\'s an integer we use it to access the elements in the collection\n        if isinstance(key, int):\n            return self._elements[key]\n        # If it\'s a slice we use it to support slice operations over the elements\n        # in the collection\n        elif isinstance(key, slice):\n            return ElementCollection(self._elements[key])\n\n        # If it\'s anything else (basically a string) we use it as a selector\n        # TODO: Write tests!\n        elements = self._element.querySelectorAll(key)\n        return ElementCollection([Element(el) for el in elements])\n\n    def __len__(self):\n        return len(self._elements)\n\n    def __eq__(self, obj):\n        """Check if the element is the same as the other element by comparing\n        the underlying JS element"""\n        return isinstance(obj, ElementCollection) and obj._elements == self._elements\n\n    def _get_attribute(self, attr, index=None):\n        if index is None:\n            return [getattr(el, attr) for el in self._elements]\n\n        # As JQuery, when getting an attr, only return it for the first element\n        return getattr(self._elements[index], attr)\n\n    def _set_attribute(self, attr, value):\n        for el in self._elements:\n            setattr(el, attr, value)\n\n    @property\n    def html(self):\n        return self._get_attribute("html")\n\n    @html.setter\n    def html(self, value):\n        self._set_attribute("html", value)\n\n    @property\n    def value(self):\n        return self._get_attribute("value")\n\n    @value.setter\n    def value(self, value):\n        self._set_attribute("value", value)\n\n    @property\n    def children(self):\n        return self._elements\n\n    def __iter__(self):\n        yield from self._elements\n\n    def __repr__(self):\n        return f"{self.__class__.__name__} (length: {len(self._elements)}) {self._elements}"\n\n\nclass DomScope:\n    def __getattr__(self, __name: str):\n        element = document[f"#{__name}"]\n        if element:\n            return element[0]\n\n\nclass PyDom(BaseElement):\n    # Add objects we want to expose to the DOM namespace since this class instance is being\n    # remapped as "the module" itself\n    BaseElement = BaseElement\n    Element = Element\n    ElementCollection = ElementCollection\n\n    def __init__(self):\n        # PyDom is a special case of BaseElement where we don\'t want to create a new JS element\n        # and it really doesn\'t have a need for styleproxy or parent to to call to __init__\n        # (which actually fails in MP for some reason)\n        self._js = document\n        self._parent = None\n        self._proxies = {}\n        self.ids = DomScope()\n        self.body = Element(document.body)\n        self.head = Element(document.head)\n\n    def create(self, type_, classes=None, html=None):\n        return super().create(type_, is_child=False, classes=classes, html=html)\n\n    def __getitem__(self, key):\n        elements = self._js.querySelectorAll(key)\n        if not elements:\n            return None\n        return ElementCollection([Element(el) for el in elements])\n\n\ndom = PyDom()\n',
  },
}),
  Tr.push("import pyscript as _pyscript"),
  Tr.push(...["_Path", "_path", "_os", "_pyscript"].map((e) => `del ${e}`)),
  Tr.push("\n");
const Or = Tr.join("\n"),
  Pr = Sr.join("\n"),
  Ir = (e) => Lr.main[e],
  $r = (e) => Lr.worker[e],
  Mr = (e, t, n, r) => {
    e[n] = () => {
      const e = r ? [r] : [];
      return e.push(...t(n)), e.map(Ze).join("\n");
    };
  },
  Fr = (e, t) => {
    const n = "mpy" === t ? Or.replace(Pr, "") : Or,
      r = {};
    return (
      Mr(r, e, "codeBeforeRun", n),
      Mr(r, e, "codeBeforeRunAsync", n),
      Mr(r, e, "codeAfterRun"),
      Mr(r, e, "codeAfterRunAsync"),
      r
    );
  },
  Cr = (e, t) => {
    const n = [...$r(t)];
    if (n.length) {
      const r = wn(
          e[`_${t}`] ||
            (t.endsWith("Async")
              ? async (e, t, ...n) => {
                  for (const r of n) await r(e, t);
                }
              : (e, t, ...n) => {
                  for (const r of n) r(e, t);
                })
        ),
        s = n.map(wn).join(", ");
      return Function(`return(w,x)=>(${r})(w,x,...[${s}])`)();
    }
  },
  Wr = Rr({ typeof: "function" }),
  Dr = Rr({ typeof: "string" }),
  Lr = {
    main: {
      onWorker: new Wr(),
      onReady: new Wr(),
      onBeforeRun: new Wr(),
      onBeforeRunAsync: new Wr(),
      onAfterRun: new Wr(),
      onAfterRunAsync: new Wr(),
      codeBeforeRun: new Dr([
        '\n    import builtins\n    def input(prompt=""):\n        raise Exception("\\n           ".join([\n            "input() doesn\'t work when PyScript runs in the main thread.",\n            "Consider using the worker attribute: https://pyscript.github.io/docs/2023.11.2/user-guide/workers/"\n        ]))\n\n    builtins.input = input\n    del builtins\n    del input\n',
      ]),
      codeBeforeRunAsync: new Dr(),
      codeAfterRun: new Dr(),
      codeAfterRunAsync: new Dr(),
    },
    worker: {
      onReady: new Wr(),
      onBeforeRun: new Wr(),
      onBeforeRunAsync: new Wr(),
      onAfterRun: new Wr(),
      onAfterRunAsync: new Wr(),
      codeBeforeRun: new Dr(),
      codeBeforeRunAsync: new Dr(),
      codeAfterRun: new Dr(),
      codeAfterRunAsync: new Dr(),
    },
  },
  Hr = ({ tagName: e }) => "SCRIPT" === e,
  [Br, Ur] = [...sr.entries()].map(
    ([e, t]) =>
      async function (n, r) {
        await gr.get(e).plugins;
        const s = nr.call(new tr(null, Kr.get(e)), n, { ...r, type: t });
        return tt(s.sync, _r), s.ready;
      }
  ),
  [{ PyWorker: Jr, MPWorker: qr, hooks: Gr, config: zr, whenDefined: Yr }, Vr] =
    e("@pyscript/core", {
      PyWorker: Br,
      MPWorker: Ur,
      hooks: Lr,
      config: {},
      whenDefined: Qn,
    }),
  Kr = new Map();
for (const [e, t] of sr) {
  if (Vr) break;
  const n = (t, n, r) => {
      n ? r.then(() => ft(t, e, "done")) : ft(t, e, "done");
    },
    { config: r, configURL: s, plugins: o, error: a } = gr.get(e);
  let i = 0;
  const l = (t = e) => `${t}-${i++}`,
    c = async (t, n, r) => {
      if (t.hasAttribute("src"))
        try {
          return await fr(t.getAttribute("src")).then(pr);
        } catch (e) {
          n.stderr(e);
        }
      if (r) return Ze(t.textContent);
      const s = Ze(Qe(t.innerHTML));
      return (
        console.warn(
          `Deprecated: use <script type="${e}"> for an always safe content parsing:\n`,
          s
        ),
        s
      );
    };
  let p,
    f = !1;
  const u = ({ XWorker: e, interpreter: t, io: n }) => {
    f ||
      ((f = !0),
      t.registerJsModule("_pyscript", {
        PyWorker: function (...t) {
          const r = e(...t);
          return (r.onerror = ({ error: e }) => n.stderr(e)), r;
        },
        get target() {
          return Hr(p) ? p.target.id : p.id;
        },
      }));
  };
  a ||
    o.then(() => {
      const o = new Map(),
        a = {
          main: {
            ...Fr(Ir, e),
            async onReady(t, r) {
              u(t);
              for (const e of Ir("onReady")) await e(t, r);
              if (o.has(r)) {
                let { message: e } = o.get(r);
                o.delete(r);
                const n = e === Tn;
                return (
                  (e = `(${ir.CONFLICTING_CODE}) ${e} for `),
                  (e += r.cloneNode(n).outerHTML),
                  void t.io.stderr(e)
                );
              }
              if (Hr(r)) {
                const {
                    attributes: { async: s, target: o },
                  } = r,
                  a = !!o?.value,
                  i = a ? Nn(r, o.value) : document.createElement("script-py");
                if (!a) {
                  const { head: e, body: t } = document;
                  e.contains(r) ? t.append(i) : r.after(i);
                }
                i.id || (i.id = l()),
                  st(r, "target", { value: i }),
                  ft(r, e, "ready"),
                  n(r, s, t["run" + (s ? "Async" : "")](await c(r, t.io, !0)));
              } else r._wrap.resolve(t);
              console.debug("[pyscript/main] PyScript Ready");
            },
            onWorker(e, t) {
              tt(t.sync, _r);
              for (const n of Ir("onWorker")) n(e, t);
            },
            onBeforeRun(e, t) {
              (p = t), vr(Ir, e, t, "onBeforeRun");
            },
            onBeforeRunAsync: (e, t) => (
              (p = t), vr(Ir, e, t, "onBeforeRunAsync")
            ),
            onAfterRun(e, t) {
              vr(Ir, e, t, "onAfterRun");
            },
            onAfterRunAsync: (e, t) => vr(Ir, e, t, "onAfterRunAsync"),
          },
          worker: {
            ...Fr($r, e),
            get onReady() {
              return Cr(this, "onReady");
            },
            get onBeforeRun() {
              return Cr(this, "onBeforeRun");
            },
            get onBeforeRunAsync() {
              return Cr(this, "onBeforeRunAsync");
            },
            get onAfterRun() {
              return Cr(this, "onAfterRun");
            },
            get onAfterRunAsync() {
              return Cr(this, "onAfterRunAsync");
            },
          },
        };
      Kr.set(e, a),
        Zn(e, {
          config: r,
          configURL: s,
          interpreter: t,
          hooks: a,
          env: `${e}-script`,
          version: r?.interpreter,
          onerror(e, t) {
            o.set(t, e);
          },
        }),
        customElements.define(
          `${e}-script`,
          class extends HTMLElement {
            constructor() {
              tt(super(), {
                _wrap: Promise.withResolvers(),
                srcCode: "",
                executed: !1,
              });
            }
            get id() {
              return super.id || (super.id = l());
            }
            set id(e) {
              super.id = e;
            }
            async connectedCallback() {
              if (!this.executed) {
                this.executed = !0;
                const t = this.hasAttribute("async"),
                  { io: r, run: s, runAsync: o } = await this._wrap.promise;
                (this.srcCode = await c(this, r, !this.childElementCount)),
                  this.replaceChildren(),
                  (this.style.display = "block"),
                  ft(this, e, "ready"),
                  n(this, t, (t ? o : s)(this.srcCode));
              }
            }
          }
        );
    }),
    (zr[e] = structuredClone(r));
}
export {
  tr as H,
  sr as T,
  nr as X,
  rt as a,
  Jr as b,
  Xn as c,
  Ze as d,
  Gr as e,
  qr as f,
  zr as g,
  Yr as h,
  Pr as o,
  Or as s,
};
//# sourceMappingURL=core-DEFZLvIc.js.map
