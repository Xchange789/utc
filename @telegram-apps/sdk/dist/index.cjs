"use strict";
Object.defineProperty(exports, Symbol.toStringTag, {
  value: "Module"
});
let $e = class Tn extends Error {
  constructor(t, n, o) {
    super(typeof n == "object" ? n.message : n || t, {
      cause: typeof n == "object" ? n.cause : o
    }), this.type = t, Object.setPrototypeOf(this, Tn.prototype)
  }
};

function $n(e) {
  return e.replace(/[A-Z]/g, t => `_${t.toLowerCase()}`)
}

function _i(e) {
  return e.replace(/_[a-z]/g, t => t[1].toUpperCase())
}
const Bn = "ERR_INVALID_VALUE",
    On = "ERR_UNEXPECTED_VALUE",
    In = "ERR_UNEXPECTED_TYPE",
    ht = "ERR_PARSE";

function Dn(e, t) {
  const n = {};
  for (const o in e) {
    const r = e[o];
    if (!r) continue;
    let s, i;
    typeof r == "function" ? (s = o, i = r) : [s, i] = r;
    try {
      const a = i(t(s));
      a !== void 0 && (n[o] = a)
    } catch (a) {
      throw new $e(ht, `Parser for "${o}" property failed${s===o?"":`. Source field: "${s}"`}`, a)
    }
  }
  return n
}

function bt(e) {
  let t = e;
  if (typeof t == "string") try {
    t = JSON.parse(t)
  } catch (n) {
    throw new $e(Bn, {
      cause: n
    })
  }
  if (typeof t != "object" || !t || Array.isArray(t)) throw new $e(On);
  return t
}

function j(e, t) {
  return n => {
    const o = r => {
      if (!(n && r === void 0)) try {
        return t(r)
      } catch (s) {
        throw new $e(ht, {
          message: `"${e}" transformer failed to parse the value`,
          cause: s
        })
      }
    };
    return Object.assign(o, {
      isValid(r) {
        try {
          return o(r), !0
        } catch {
          return !1
        }
      }
    })
  }
}

function Ve(e, t) {
  return j(t || "object", n => {
    const o = bt(n);
    return Dn(e, r => o[r])
  })
}

function De(e) {
  throw new $e(In, `Unexpected value received: ${JSON.stringify(e)}`)
}
const di = j("boolean", e => {
      if (typeof e == "boolean") return e;
      const t = String(e);
      if (t === "1" || t === "true") return !0;
      if (t === "0" || t === "false") return !1;
      De(e)
    }),
    x = j("string", e => {
      if (typeof e == "string" || typeof e == "number") return e.toString();
      De(e)
    }),
    Le = j("number", e => {
      if (typeof e == "number") return e;
      if (typeof e == "string") {
        const t = Number(e);
        if (!Number.isNaN(t)) return t
      }
      De(e)
    }),
    Mn = j("date", e => e instanceof Date ? e : new Date(Le()(e) * 1e3));

function xn(e, t) {
  return j(t || "searchParams", n => {
    typeof n != "string" && !(n instanceof URLSearchParams) && De(n);
    const o = typeof n == "string" ? new URLSearchParams(n) : n;
    return Dn(e, r => {
      const s = o.get(r);
      return s === null ? void 0 : s
    })
  })
}

function ct(e) {
  for (const t in e) e[t] = [$n(t), e[t]];
  return e
}
const fi = e => {
  const t = Le(),
      n = Le(!0),
      o = x(),
      r = x(!0),
      s = di(!0),
      i = Ve(ct({
        addedToAttachmentMenu: s,
        allowsWriteToPm: s,
        firstName: o,
        id: t,
        isBot: s,
        isPremium: s,
        languageCode: r,
        lastName: r,
        photoUrl: r,
        username: r
      }), "User")(!0);
  return xn(ct({
    authDate: Mn(),
    canSendAfter: n,
    chat: Ve(ct({
      id: t,
      type: o,
      title: o,
      photoUrl: r,
      username: r
    }), "Chat")(!0),
    chatInstance: r,
    chatType: r,
    hash: o,
    queryId: r,
    receiver: i,
    startParam: r,
    user: i
  }), "initData")(e)
};

function he(e) {
  return /^#[\da-f]{6}$/i.test(e)
}

function kn(e) {
  return /^#[\da-f]{3}$/i.test(e)
}

function mt(e) {
  const t = e.replace(/\s/g, "").toLowerCase();
  if (he(t)) return t;
  if (kn(t)) {
    let o = "#";
    for (let r = 0; r < 3; r += 1) o += t[1 + r].repeat(2);
    return o
  }
  const n = t.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || t.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
  if (!n) throw new Error(`Value "${e}" does not satisfy any of known RGB formats.`);
  return n.slice(1).reduce((o, r) => {
    const s = parseInt(r, 10).toString(16);
    return o + (s.length === 1 ? "0" : "") + s
  }, "#")
}
const hi = j("rgb", e => mt(x()(e))),
    bi = j("themeParams", e => {
      const t = hi(!0);
      return Object.entries(bt(e)).reduce((n, [o, r]) => (n[_i(o)] = t(r), n), {})
    });

function Nn(e) {
  return JSON.stringify(Object.fromEntries(Object.entries(e).map(([t, n]) => [$n(t), n])))
}

function mi(e) {
  const {
    initDataRaw: t,
    startParam: n,
    showSettings: o,
    botInline: r
  } = e, s = new URLSearchParams;
  return s.set("tgWebAppPlatform", e.platform), s.set("tgWebAppThemeParams", Nn(e.themeParams)), s.set("tgWebAppVersion", e.version), t && s.set("tgWebAppData", t), n && s.set("tgWebAppStartParam", n), typeof o == "boolean" && s.set("tgWebAppShowSettings", o ? "1" : "0"), typeof r == "boolean" && s.set("tgWebAppBotInline", r ? "1" : "0"), s.toString()
}

function gi(e, t) {
  return j("array", n => {
    let o;
    if (Array.isArray(n)) o = n;
    else if (typeof n == "string") try {
      const r = JSON.parse(n);
      Array.isArray(r) && (o = r)
    } catch {}
    return o || De(n), o.map(e)
  })
}

function gt(e) {
  return !!e && typeof e == "object" && !Array.isArray(e)
}

function Ue(...e) {
  return e.map(t => {
    if (typeof t == "string") return t;
    if (gt(t)) return Ue(Object.entries(t).map(n => n[1] && n[0]));
    if (Array.isArray(t)) return Ue(...t)
  }).filter(Boolean).join(" ")
}

function Ei(...e) {
  return e.reduce((t, n) => (gt(n) && Object.entries(n).forEach(([o, r]) => {
    const s = Ue(t[o], r);
    s && (t[o] = s)
  }), t), {})
}
let Be = class Vn extends Error {
  constructor(t, n, o) {
    super(typeof n == "object" ? n.message : n || t, {
      cause: typeof n == "object" ? n.cause : o
    }), this.type = t, Object.setPrototypeOf(this, Vn.prototype)
  }
};

function Ln(e) {
  return e.replace(/[A-Z]/g, t => `_${t.toLowerCase()}`)
}

function wi(e) {
  return e.replace(/_[a-z]/g, t => t[1].toUpperCase())
}
const Si = "ERR_INVALID_VALUE",
    yi = "ERR_UNEXPECTED_VALUE",
    Ci = "ERR_UNEXPECTED_TYPE",
    Un = "ERR_PARSE";

function jn(e, t) {
  const n = {};
  for (const o in e) {
    const r = e[o];
    if (!r) continue;
    let s, i;
    typeof r == "function" ? (s = o, i = r) : [s, i] = r;
    try {
      const a = i(t(s));
      a !== void 0 && (n[o] = a)
    } catch (a) {
      throw new Be(Un, `Parser for "${o}" property failed${s===o?"":`. Source field: "${s}"`}`, a)
    }
  }
  return n
}

function Wn(e) {
  let t = e;
  if (typeof t == "string") try {
    t = JSON.parse(t)
  } catch (n) {
    throw new Be(Si, {
      cause: n
    })
  }
  if (typeof t != "object" || !t || Array.isArray(t)) throw new Be(yi);
  return t
}

function B(e, t) {
  return n => {
    const o = r => {
      if (!(n && r === void 0)) try {
        return t(r)
      } catch (s) {
        throw new Be(Un, {
          message: `"${e}" transformer failed to parse the value`,
          cause: s
        })
      }
    };
    return Object.assign(o, {
      isValid(r) {
        try {
          return o(r), !0
        } catch {
          return !1
        }
      }
    })
  }
}

function T(e, t) {
  return B(t || "object", n => {
    const o = Wn(n);
    return jn(e, r => o[r])
  })
}

function Me(e) {
  throw new Be(Ci, `Unexpected value received: ${JSON.stringify(e)}`)
}
const je = B("boolean", e => {
      if (typeof e == "boolean") return e;
      const t = String(e);
      if (t === "1" || t === "true") return !0;
      if (t === "0" || t === "false") return !1;
      Me(e)
    }),
    P = B("string", e => {
      if (typeof e == "string" || typeof e == "number") return e.toString();
      Me(e)
    }),
    Oe = B("number", e => {
      if (typeof e == "number") return e;
      if (typeof e == "string") {
        const t = Number(e);
        if (!Number.isNaN(t)) return t
      }
      Me(e)
    }),
    Pi = B("date", e => e instanceof Date ? e : new Date(Oe()(e) * 1e3));

function qn(e, t) {
  return B(t || "searchParams", n => {
    typeof n != "string" && !(n instanceof URLSearchParams) && Me(n);
    const o = typeof n == "string" ? new URLSearchParams(n) : n;
    return jn(e, r => {
      const s = o.get(r);
      return s === null ? void 0 : s
    })
  })
}

function ut(e) {
  for (const t in e) e[t] = [Ln(t), e[t]];
  return e
}
const vi = e => {
  const t = Oe(),
      n = Oe(!0),
      o = P(),
      r = P(!0),
      s = je(!0),
      i = T(ut({
        addedToAttachmentMenu: s,
        allowsWriteToPm: s,
        firstName: o,
        id: t,
        isBot: s,
        isPremium: s,
        languageCode: r,
        lastName: r,
        photoUrl: r,
        username: r
      }), "User")(!0);
  return qn(ut({
    authDate: Pi(),
    canSendAfter: n,
    chat: T(ut({
      id: t,
      type: o,
      title: o,
      photoUrl: r,
      username: r
    }), "Chat")(!0),
    chatInstance: r,
    chatType: r,
    hash: o,
    queryId: r,
    receiver: i,
    startParam: r,
    user: i
  }), "initData")(e)
};

function Ri(e) {
  return /^#[\da-f]{6}$/i.test(e)
}

function Ai(e) {
  return /^#[\da-f]{3}$/i.test(e)
}

function Ti(e) {
  const t = e.replace(/\s/g, "").toLowerCase();
  if (Ri(t)) return t;
  if (Ai(t)) {
    let o = "#";
    for (let r = 0; r < 3; r += 1) o += t[1 + r].repeat(2);
    return o
  }
  const n = t.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || t.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
  if (!n) throw new Error(`Value "${e}" does not satisfy any of known RGB formats.`);
  return n.slice(1).reduce((o, r) => {
    const s = parseInt(r, 10).toString(16);
    return o + (s.length === 1 ? "0" : "") + s
  }, "#")
}
const $i = B("rgb", e => Ti(P()(e))),
    Bi = B("themeParams", e => {
      const t = $i(!0);
      return Object.entries(Wn(e)).reduce((n, [o, r]) => (n[wi(o)] = t(r), n), {})
    });

function Hn(e) {
  return JSON.stringify(Object.fromEntries(Object.entries(e).map(([t, n]) => [Ln(t), n])))
}
const Oi = e => {
  const t = P(),
      n = P(!0),
      o = je(!0);
  return qn({
    botInline: ["tgWebAppBotInline", o],
    initData: ["tgWebAppData", vi(!0)],
    initDataRaw: ["tgWebAppData", n],
    platform: ["tgWebAppPlatform", t],
    showSettings: ["tgWebAppShowSettings", o],
    startParam: ["tgWebAppStartParam", n],
    themeParams: ["tgWebAppThemeParams", Bi()],
    version: ["tgWebAppVersion", t]
  }, "launchParams")(e)
};

function Ii(e) {
  const {
    initDataRaw: t,
    startParam: n,
    showSettings: o,
    botInline: r
  } = e, s = new URLSearchParams;
  return s.set("tgWebAppPlatform", e.platform), s.set("tgWebAppThemeParams", Hn(e.themeParams)), s.set("tgWebAppVersion", e.version), t && s.set("tgWebAppData", t), n && s.set("tgWebAppStartParam", n), typeof o == "boolean" && s.set("tgWebAppShowSettings", o ? "1" : "0"), typeof r == "boolean" && s.set("tgWebAppBotInline", r ? "1" : "0"), s.toString()
}
const Gn = T({
      eventType: P(),
      eventData: e => e
    }, "miniAppsMessage"),
    zn = B("fn", e => {
      if (typeof e == "function") return e;
      Me(e)
    });

function Di(e) {
  return !!e && typeof e == "object" && !Array.isArray(e)
}
const Mi = T({
  TelegramWebviewProxy: T({
    postEvent: zn()
  })()
});

function Yn(e) {
  return Mi().isValid(e)
}

function Fn() {
  try {
    return window.self !== window.top
  } catch {
    return !0
  }
}
var xi = Object.defineProperty,
    ki = (e, t, n) => t in e ? xi(e, t, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: n
    }) : e[t] = n,
    Qn = (e, t, n) => ki(e, typeof t != "symbol" ? t + "" : t, n);
let l = class Jn extends Error {
  constructor(t, n, o) {
    super(typeof n == "object" ? n.message : n || t, {
      cause: typeof n == "object" ? n.cause : o
    }), this.type = t, Object.setPrototypeOf(this, Jn.prototype)
  }
};

function We(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n)
}

function be(...e) {
  const t = e.flat(1);
  return [t.push.bind(t), () => {
    t.forEach(n => {
      n()
    })
  }]
}

function Ni(e, t) {
  return e instanceof l && e.type === t
}

function Et(e) {
  return t => Ni(t, e)
}
const wt = "ERR_ABORTED",
    St = "ERR_CANCELED",
    yt = "ERR_TIMED_OUT";

function hn(e) {
  return new l(wt, {
    cause: e
  })
}
const Vi = Et(yt),
    Li = Et(wt),
    Ui = Et(St);

function bn(e, t) {
  return e.reject = t.reject, e
}
class f extends Promise {
  constructor(t, n) {
    let o, r;
    typeof t == "function" ? (o = t, r = n) : r = t;
    let s, i;
    super((a, p) => {
      r || (r = {});
      const {
        abortSignal: u
      } = r;
      if (u && u.aborted) return p(hn(u.reason));
      const [d, w] = be(), y = ne => (...pi) => (w(), ne(...pi)), te = new AbortController, {
        signal: K
      } = te;
      i = y(ne => {
        te.abort(ne), p(ne)
      }), s = y(a), u && d(We(u, "abort", () => {
        i(hn(u.reason))
      }));
      const {
        timeout: at
      } = r;
      if (at) {
        const ne = setTimeout(() => {
          i(new l(yt, `Timeout reached: ${at}ms`))
        }, at);
        d(() => {
          clearTimeout(ne)
        })
      }
      o && o(s, i, K)
    }), Qn(this, "reject"), this.reject = i
  }
  static withFn(t, n) {
    return new f((o, r, s) => {
      try {
        const i = t(s);
        return i instanceof Promise ? i.then(o, r) : o(i)
      } catch (i) {
        r(i)
      }
    }, n)
  }
  static resolve(t) {
    return new f(n => {
      n(t)
    })
  }
  static reject(t) {
    return new f((n, o) => {
      o(t)
    })
  }
  cancel() {
    this.reject(new l(St))
  } catch (t) {
    return this.then(void 0, t)
  } finally(t) {
    return bn(super.finally(t), this)
  }
  then(t, n) {
    return bn(super.then(t, n), this)
  }
}

function mn(e, t) {
  return e.resolve = t.resolve, e
}
class we extends f {
  constructor(t, n) {
    let o, r;
    typeof t == "function" ? (o = t, r = n) : r = t;
    let s;
    super((i, a, p) => {
      s = i, o && o(i, a, p)
    }, r), Qn(this, "resolve"), this.resolve = s
  }
  static withFn(t, n) {
    return new we((o, r, s) => f.withFn(t, {
      abortSignal: s
    }).then(o, r), n)
  }
  static resolve(t) {
    return new we(n => {
      n(t)
    })
  }
  static reject(t) {
    return new we((n, o) => {
      o(t)
    })
  } catch (t) {
    return this.then(void 0, t)
  } finally(t) {
    return mn(super.finally(t), this)
  }
  then(t, n) {
    return mn(super.then(t, n), this)
  }
}

function ji(e, t) {
  return new f(n => {
    setTimeout(n, e)
  }, {
    abortSignal: t
  })
}

function Kn(e) {
  return `tapps/${e}`
}

function R(e, t) {
  sessionStorage.setItem(Kn(e), JSON.stringify(t))
}

function A(e) {
  const t = sessionStorage.getItem(Kn(e));
  try {
    return t ? JSON.parse(t) : void 0
  } catch {}
}

function Ct(e) {
  return e.replace(/[A-Z]/g, t => `-${t.toLowerCase()}`)
}

function Wi(e, t) {
  t || (t = {});
  const {
    textColor: n,
    bgColor: o,
    shouldLog: r = !0
  } = t;

  function s(i, ...a) {
    if (!r || typeof r == "function" && !r()) return;
    const p = "font-weight:bold;padding:0 5px;border-radius:5px";
    console[i](`%c${Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3,timeZone:"UTC"}).format(new Date)}%c / %c${e}`, `${p};background-color: lightblue;color:black`, "", `${p};${n?`color:${n};`:""}${o?`background-color:${o}`:""}`, ...a)
  }
  return [function(...i) {
    s("log", ...i)
  }, function(...i) {
    s("error", ...i)
  }]
}

function ze(e, t) {
  document.documentElement.style.setProperty(e, t)
}

function Ye(e) {
  document.documentElement.style.removeProperty(e)
}

function qi(e, t) {
  t()
}

function me(e, t) {
  t || (t = {});
  const n = t.equals || Object.is;
  let o = [],
      r = e;
  const s = u => {
    if (!n(r, u)) {
      const d = r;
      r = u, qi(p, () => {
        [...o].forEach(([w, y]) => {
          w(u, d), y && a(w, !0)
        })
      })
    }
  };

  function i(u) {
    const d = typeof u != "object" ? {
      once: u
    } : u;
    return {
      once: d.once || !1,
      signal: d.signal || !1
    }
  }
  const a = (u, d) => {
        const w = i(d),
            y = o.findIndex(([te, K]) => te === u && K.once === w.once && K.signal === w.signal);
        y >= 0 && o.splice(y, 1)
      },
      p = Object.assign(function() {
        return Hi(p), r
      }, {
        destroy() {
          o = []
        },
        set: s,
        reset() {
          s(e)
        },
        sub(u, d) {
          return o.push([u, i(d)]), () => a(u, d)
        },
        unsub: a,
        unsubAll() {
          o = o.filter(u => u[1].signal)
        }
      });
  return p
}
const lt = [];

function Hi(e) {
  lt.length && lt[lt.length - 1].add(e)
}
const Xn = me(!1),
    [Pt, Gi] = Wi("Bridge", {
      bgColor: "#9147ff",
      textColor: "white",
      shouldLog: Xn
    }),
    zi = {
      clipboard_text_received: T({
        req_id: P(),
        data: e => e === null ? e : P(!0)(e)
      }, "clipboard_text_received"),
      custom_method_invoked: T({
        req_id: P(),
        result: e => e,
        error: P(!0)
      }, "custom_method_invoked"),
      popup_closed: B("popup_closed", e => e ? T({
        button_id: t => t == null ? void 0 : P()(t)
      })()(e) : {}),
      viewport_changed: T({
        height: Oe(),
        width: e => e == null ? window.innerWidth : Oe()(e),
        is_state_stable: je(),
        is_expanded: je()
      }, "viewport_changed")
    };

function Yi(e) {
  const t = window,
      [, n] = be(We(t, "resize", () => {
        e(["viewport_changed", {
          width: window.innerWidth,
          height: window.innerHeight,
          is_state_stable: !0,
          is_expanded: !0
        }])
      }), We(t, "message", o => {
        if (o.source !== t.parent) return;
        let r;
        try {
          r = Gn()(o.data)
        } catch {
          return
        }
        const {
          eventType: s,
          eventData: i
        } = r, a = zi[s];
        try {
          const p = a ? a()(i) : i;
          Pt("Event received:", p ? {
            eventType: s,
            eventData: p
          } : {
            eventType: s
          }), e([s, p])
        } catch (p) {
          Gi([`An error occurred processing the "${s}" event from the Telegram application.`, "Please, file an issue here:", "https://github.com/Telegram-Mini-Apps/telegram-apps/issues/new/choose"].join(`
`), r, p)
        }
      }));
  return n
}
const dt = me(),
    gn = me();

function Zn() {
  return gn() || gn.set(Yi(dt.set)), dt
}
const pt = me({});

function eo(e) {
  let t = pt()[e];
  return t || (t = me(void 0, {
    equals() {
      return !1
    }
  }), Zn().sub(n => {
    n && n[0] === e && t.set(n[1])
  }), pt.set({
    ...pt(),
    [e]: t
  })), t
}

function S(e, t, n) {
  return eo(e).sub(t, n)
}
const to = "ERR_METHOD_UNSUPPORTED",
    no = "ERR_RETRIEVE_LP_FAILED",
    oo = "ERR_METHOD_PARAMETER_UNSUPPORTED",
    ro = "ERR_UNKNOWN_ENV",
    so = "ERR_INVOKE_CUSTOM_METHOD_RESPONSE",
    io = me("https://web.telegram.org");

function Fe(e, t) {
  Pt("Posting event:", t ? {
    eventType: e,
    eventData: t
  } : {
    eventType: e
  });
  const n = window;
  if (Yn(n)) {
    n.TelegramWebviewProxy.postEvent(e, JSON.stringify(t));
    return
  }
  const o = JSON.stringify({
    eventType: e,
    eventData: t
  });
  if (Fn()) return n.parent.postMessage(o, io());
  const {
    external: r
  } = n;
  if (T({
    notify: zn()
  })().isValid(r)) {
    r.notify(o);
    return
  }
  throw new l(ro)
}

function Qe(e, t, n) {
  n || (n = {});
  const {
    capture: o
  } = n, [r, s] = be();
  return new f(i => {
    (Array.isArray(t) ? t : [t]).forEach(a => {
      r(S(a, p => {
        (!o || (Array.isArray(t) ? o({
          event: a,
          payload: p
        }) : o(p))) && i(p)
      }))
    }), (n.postEvent || Fe)(e, n.params)
  }, n).finally(s)
}

function vt(e) {
  return Oi()(e)
}

function ao(e) {
  return vt(e.replace(/^[^?#]*[?#]/, "").replace(/[?#]/g, "&"))
}

function Fi() {
  return ao(window.location.href)
}

function Qi() {
  const e = performance.getEntriesByType("navigation")[0];
  if (!e) throw new Error("Unable to get first navigation entry.");
  return ao(e.name)
}
const Ji = "launchParams";

function Ki() {
  return vt(A(Ji) || "")
}

function co(e) {
  R("launchParams", Ii(e))
}

function uo(e) {
  return e instanceof Error ? e.message + (e.cause ? `
  ${uo(e.cause)}` : "") : JSON.stringify(e)
}

function Z() {
  const e = [];
  for (const t of [Fi, Qi, Ki]) try {
    const n = t();
    return co(n), n
  } catch (n) {
    e.push(n)
  }
  throw new l(no, ["Unable to retrieve launch parameters from any known source. Perhaps, you have opened your app outside Telegram?", "📖 Refer to docs for more information:", "https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/environment", "Collected errors:", ...e.map(t => `— ${uo(t)}`)].join(`
`))
}

function Xi(e) {
  if (e === "simple") try {
    return Z(), !0
  } catch {
    return !1
  }
  return f.withFn(async () => {
    if (Yn(window)) return !0;
    try {
      return await Qe("web_app_request_theme", "theme_changed", {
        timeout: 100
      }), !0
    } catch {
      return !1
    }
  }, e)
}

function qe(e, t) {
  window.dispatchEvent(new MessageEvent("message", {
    data: JSON.stringify({
      eventType: e,
      eventData: t
    }),
    source: window.parent
  }))
}

function Zi(e, t) {
  if (typeof t == "string") try {
    const {
      eventType: n
    } = Gn()(t);
    n === "web_app_request_theme" && qe("theme_changed", {
      theme_params: JSON.parse(Hn(e))
    }), n === "web_app_request_viewport" && qe("viewport_changed", {
      width: window.innerWidth,
      height: window.innerHeight,
      is_state_stable: !0,
      is_expanded: !0
    })
  } catch {}
}

function ea(e) {
  var t;
  const n = typeof e == "string" ? vt(e) : e;
  co(n);
  const o = (t = window.TelegramWebviewProxy) == null ? void 0 : t.postEvent;
  window.TelegramWebviewProxy = {
    postEvent(r, s) {
      Zi(n.themeParams, JSON.stringify({
        eventType: r,
        eventData: s
      })), o == null || o(r, s)
    }
  }, Pt("Environment was mocked by the mockTelegramEnv function")
}

function lo() {
  [
    ["TelegramGameProxy_receiveEvent"],
    ["TelegramGameProxy", "receiveEvent"],
    ["Telegram", "WebView", "receiveEvent"]
  ].forEach(e => {
    let t = window;
    e.forEach((n, o, r) => {
      if (o === r.length - 1) {
        t[n] = qe;
        return
      }
      n in t || (t[n] = {}), t = t[n]
    })
  })
}

function po() {
  ["TelegramGameProxy_receiveEvent", "TelegramGameProxy", "Telegram"].forEach(e => {
    delete window[e]
  })
}

function Y(e, t, n) {
  eo(e).unsub(t, n)
}

function ta(e, t) {
  return Zn().sub(e, t)
}

function na(e, t) {
  dt.unsub(e, t)
}

function _o(e) {
  return ({
            req_id: t
          }) => t === e
}

function En(e) {
  return e.split(".").map(Number)
}

function fo(e, t) {
  const n = En(e),
      o = En(t),
      r = Math.max(n.length, o.length);
  for (let s = 0; s < r; s += 1) {
    const i = n[s] || 0,
        a = o[s] || 0;
    if (i !== a) return i > a ? 1 : -1
  }
  return 0
}

function b(e, t) {
  return fo(e, t) <= 0
}

function N(e, t, n) {
  if (typeof n == "string") {
    if (e === "web_app_open_link") {
      if (t === "try_instant_view") return b("6.4", n);
      if (t === "try_browser") return b("7.6", n)
    }
    if (e === "web_app_set_header_color" && t === "color") return b("6.9", n);
    if (e === "web_app_close" && t === "return_back") return b("7.6", n);
    if (e === "web_app_setup_main_button" && t === "has_shine_effect") return b("7.10", n)
  }
  switch (e) {
    case "web_app_open_tg_link":
    case "web_app_open_invoice":
    case "web_app_setup_back_button":
    case "web_app_set_background_color":
    case "web_app_set_header_color":
    case "web_app_trigger_haptic_feedback":
      return b("6.1", t);
    case "web_app_open_popup":
      return b("6.2", t);
    case "web_app_close_scan_qr_popup":
    case "web_app_open_scan_qr_popup":
    case "web_app_read_text_from_clipboard":
      return b("6.4", t);
    case "web_app_switch_inline_query":
      return b("6.7", t);
    case "web_app_invoke_custom_method":
    case "web_app_request_write_access":
    case "web_app_request_phone":
      return b("6.9", t);
    case "web_app_setup_settings_button":
      return b("6.10", t);
    case "web_app_biometry_get_info":
    case "web_app_biometry_open_settings":
    case "web_app_biometry_request_access":
    case "web_app_biometry_request_auth":
    case "web_app_biometry_update_token":
      return b("7.2", t);
    case "web_app_setup_swipe_behavior":
      return b("7.7", t);
    case "web_app_share_to_story":
      return b("7.8", t);
    case "web_app_setup_secondary_button":
    case "web_app_set_bottom_bar_color":
      return b("7.10", t);
    default:
      return ["iframe_ready", "iframe_will_reload", "web_app_close", "web_app_data_send", "web_app_expand", "web_app_open_link", "web_app_ready", "web_app_request_theme", "web_app_request_viewport", "web_app_setup_main_button", "web_app_setup_closing_behavior"].includes(e)
  }
}

function ho(e, t) {
  t || (t = "strict");
  const n = typeof t == "function" ? t : o => {
    const {
      method: r,
      version: s
    } = o;
    let i, a;
    if ("param" in o ? (i = `Parameter "${o.param}" of "${r}" method is unsupported in Mini Apps version ${s}`, a = oo) : (i = `Method "${r}" is unsupported in Mini Apps version ${s}`, a = to), t === "strict") throw new l(a, i);
    return console.warn(i)
  };
  return (o, r) => N(o, e) ? Di(r) && o === "web_app_set_header_color" && "color" in r && !N(o, "color", e) ? n({
    version: e,
    method: o,
    param: "color"
  }) : Fe(o, r) : n({
    version: e,
    method: o
  })
}

function bo(e, t, n, o) {
  return Qe("web_app_invoke_custom_method", "custom_method_invoked", {
    ...o || {},
    params: {
      method: e,
      params: t,
      req_id: n
    },
    capture: _o(n)
  }).then(({
             result: r,
             error: s
           }) => {
    if (s) throw new l(so, s);
    return r
  })
}

function oa() {
  return performance.getEntriesByType("navigation")[0]
}

function O() {
  const e = oa();
  return !!e && e.type === "reload"
}

function wn(e, t) {
  return e.startsWith(t) ? e : `${t}${e}`
}

function ra(e) {
  return new URL(typeof e == "string" ? e : [e.pathname || "", wn(e.search || "", "?"), wn(e.hash || "", "#")].join(""), "http://a")
}
let re;

function sa(e, t) {
  re && re.set(e, t) || t()
}

function ia(e) {
  if (re) return e();
  re = new Map;
  try {
    e()
  } finally {
    re.forEach(t => t()), re = void 0
  }
}

function c(e, t) {
  t || (t = {});
  const n = t.equals || Object.is;
  let o = [],
      r = e;
  const s = u => {
    if (!n(r, u)) {
      const d = r;
      r = u, sa(p, () => {
        [...o].forEach(([w, y]) => {
          w(u, d), y && a(w, !0)
        })
      })
    }
  };

  function i(u) {
    const d = typeof u != "object" ? {
      once: u
    } : u;
    return {
      once: d.once || !1,
      signal: d.signal || !1
    }
  }
  const a = (u, d) => {
        const w = i(d),
            y = o.findIndex(([te, K]) => te === u && K.once === w.once && K.signal === w.signal);
        y >= 0 && o.splice(y, 1)
      },
      p = Object.assign(function() {
        return aa(p), r
      }, {
        destroy() {
          o = []
        },
        set: s,
        reset() {
          s(e)
        },
        sub(u, d) {
          return o.push([u, i(d)]), () => a(u, d)
        },
        unsub: a,
        unsubAll() {
          o = o.filter(u => u[1].signal)
        }
      });
  return p
}
const Se = [];

function aa(e) {
  Se.length && Se[Se.length - 1].add(e)
}

function h(e, t) {
  let n = new Set;
  const o = c(s(), t);

  function r() {
    o.set(s())
  }

  function s() {
    n.forEach(p => p.unsub(r, {
      signal: !0
    }));
    const i = new Set;
    let a;
    Se.push(i);
    try {
      a = e()
    } finally {
      Se.pop()
    }
    return i.forEach(p => {
      p.sub(r, {
        signal: !0
      })
    }), n = i, a
  }
  return Object.assign(function() {
    return o()
  }, {
    destroy: o.destroy,
    sub: o.sub,
    unsub: o.unsub,
    unsubAll: o.unsubAll
  })
}
const mo = c((() => {
      let e = 0;
      return () => (e += 1).toString()
    })()),
    Rt = c(Fe),
    F = c("0.0");

function ca(e) {
  e || (e = {});
  const {
    postEvent: t
  } = e, n = e.version || Z().version;
  F.set(n), Rt.set(typeof t == "function" ? t : ho(n))
}

function go() {
  return mo()()
}

function xe(e, t, n) {
  return bo(e, t, go(), {
    ...n || {},
    postEvent: _
  })
}
const I = (e, t, n) => (n || (n = {}), n.postEvent || (n.postEvent = _), Qe(e, t, n)),
    _ = (e, t) => Rt()(e, t),
    oe = "ERR_POPUP_INVALID_PARAMS",
    At = "ERR_INVALID_HOSTNAME",
    Eo = "ERR_INVALID_SLUG",
    wo = "ERR_DATA_INVALID_SIZE",
    So = "ERR_ACCESS_DENIED",
    C = "ERR_ALREADY_CALLED",
    Tt = "ERR_NOT_AVAILABLE",
    $t = "ERR_NOT_SUPPORTED",
    yo = "ERR_NOT_MOUNTED";

function E(e, t) {
  function n() {
    return typeof t == "string" ? N(t, F()) : t()
  }
  return Object.assign((...o) => {
    if (!n()) throw new l($t);
    return e(...o)
  }, {
    isSupported: n
  })
}

function W(e) {
  return t => E(t, e)
}

function v(e, t) {
  t(), e.sub(t)
}

function D(e) {
  return h(() => N(e, F()))
}

function Bt(e, t) {
  return (...n) => {
    if (!t()) throw new l(yo);
    return e(...n)
  }
}

function Q(e) {
  return t => Bt(t, e)
}
const Co = "web_app_setup_back_button",
    Po = "back_button_pressed",
    vo = "backButton",
    se = c(!1),
    Ot = D(Co),
    It = W(Ot),
    Ro = Q(se),
    Ao = Ro(() => {
      q.set(!1)
    }),
    q = c(!1),
    To = It(() => {
      se() || (q.set(O() && A(vo) || !1), v(q, $o), se.set(!0))
    });

function $o() {
  const e = q();
  _(Co, {
    is_visible: e
  }), R(vo, e)
}
const Bo = It(e => S(Po, e)),
    Oo = It(e => {
      Y(Po, e)
    }),
    Io = Ro(() => {
      q.set(!0)
    });

function Do() {
  q.unsub($o), se.set(!1)
}
const ua = Object.freeze(Object.defineProperty({
  __proto__: null,
  hide: Ao,
  isMounted: se,
  isSupported: Ot,
  isVisible: q,
  mount: To,
  offClick: Oo,
  onClick: Bo,
  show: Io,
  unmount: Do
}, Symbol.toStringTag, {
  value: "Module"
}));

function Mo(e, t, {
  isMounting: n,
  isMounted: o,
  mountError: r,
  isSupported: s
}) {
  return E(i => {
    if (o()) return f.resolve();
    if (n()) throw new l(C);
    return n.set(!0), f.withFn(a => e({
      abortSignal: a
    }), i).then(a => [!0, a], a => [!1, a]).then(a => {
      ia(() => {
        if (n.set(!1), o.set(!0), a[0]) t(a[1]);
        else {
          const p = a[1];
          throw r.set(p), p
        }
      })
    })
  }, s || (() => !0))
}
const $ = c(),
    ye = c(!1),
    Ce = c(!1),
    Je = c(!1),
    Dt = c(!1),
    Mt = c(void 0);

function xt(e) {
  return e.available ? {
    available: !0,
    tokenSaved: e.token_saved,
    deviceId: e.device_id,
    accessRequested: e.access_requested,
    type: e.type,
    accessGranted: e.access_granted
  } : {
    available: !1
  }
}
const Sn = "web_app_biometry_get_info",
    xo = E(e => I(Sn, "biometry_info_received", e).then(xt), Sn),
    ko = "web_app_biometry_request_auth",
    la = "web_app_biometry_request_access",
    pa = "web_app_biometry_open_settings",
    _a = "web_app_biometry_update_token",
    kt = "biometry_info_received",
    No = "biometry",
    Ke = D(ko),
    da = W(Ke),
    Nt = Q(Je),
    Vo = Nt(e => {
      if (ye()) return f.reject(new l(C));
      const t = $();
      return !t || !t.available ? f.reject(new l(Tt)) : (ye.set(!0), e || (e = {}), I(ko, "biometry_auth_requested", {
        ...e,
        params: {
          reason: (e.reason || "").trim()
        }
      }).then(n => {
        const {
          token: o
        } = n;
        return typeof o == "string" && $.set({
          ...t,
          token: o
        }), n
      }).finally(() => {
        ye.set(!1)
      }))
    }),
    Lo = da(() => {
      _(pa)
    }),
    Uo = Nt(e => Ce() ? f.reject(new l(C)) : (Ce.set(!0), e || (e = {}), I(la, kt, {
      ...e,
      params: {
        reason: e.reason || ""
      }
    }).then(xt).then(t => {
      if (!t.available) throw new l(Tt);
      return $.set(t), t.accessGranted
    }).finally(() => {
      Ce.set(!1)
    }))),
    jo = Mo(e => {
      const t = O() && A(No);
      return t || xo(e)
    }, e => {
      S(kt, Wo), v($, qo), $.set(e)
    }, {
      isMounted: Je,
      mountError: Mt,
      isMounting: Dt,
      isSupported: Ke
    }),
    Wo = e => {
      $.set(xt(e))
    };

function qo() {
  const e = $();
  e && R(No, e)
}

function Ho() {
  Y(kt, Wo), $.unsub(qo)
}
const Go = Nt(e => (e || (e = {}), I(_a, "biometry_token_updated", {
      ...e,
      params: {
        token: e.token || "",
        reason: e.reason
      }
    }).then(t => t.status))),
    fa = Object.freeze(Object.defineProperty({
      __proto__: null,
      authenticate: Vo,
      isAuthenticating: ye,
      isMounted: Je,
      isMounting: Dt,
      isRequestingAccess: Ce,
      isSupported: Ke,
      mount: jo,
      mountError: Mt,
      openSettings: Lo,
      requestAccess: Uo,
      state: $,
      unmount: Ho,
      updateToken: Go
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    zo = "closingConfirmation",
    ie = c(!1),
    Yo = Q(ie),
    Fo = Yo(() => {
      H.set(!1)
    }),
    H = c(!1),
    Qo = Yo(() => {
      H.set(!0)
    });

function Jo() {
  ie() || (H.set(O() && A(zo) || !1), v(H, Ko), ie.set(!0))
}

function Ko() {
  const e = H();
  _("web_app_setup_closing_behavior", {
    need_confirmation: e
  }), R(zo, e)
}

function Xo() {
  H.unsub(Ko), ie.set(!1)
}
const ha = Object.freeze(Object.defineProperty({
      __proto__: null,
      disableConfirmation: Fo,
      enableConfirmation: Qo,
      isConfirmationEnabled: H,
      isMounted: ie,
      mount: Jo,
      unmount: Xo
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    ba = "web_app_invoke_custom_method",
    Vt = D(ba),
    Xe = W(Vt),
    Zo = Xe((e, t) => {
      const n = Array.isArray(e) ? e : [e];
      return n.length ? xe("deleteStorageValues", {
        keys: n
      }, t).then() : f.resolve()
    });

function ma(e, t) {
  const n = Array.isArray(e) ? e : [e];
  return n.length ? xe("getStorageValues", {
    keys: n
  }, t).then(o => {
    const r = Ve(Object.fromEntries(n.map(s => [s, x()])))()(o);
    return Array.isArray(e) ? r : r[e]
  }) : f.resolve(typeof e == "string" ? "" : {})
}
const er = Xe(ma),
    tr = Xe(e => xe("getStorageKeys", {}, e).then(gi(x())())),
    nr = Xe((e, t, n) => xe("saveStorageValue", {
      key: e,
      value: t
    }, n).then()),
    ga = Object.freeze(Object.defineProperty({
      __proto__: null,
      deleteItem: Zo,
      getItem: er,
      getKeys: tr,
      isSupported: Vt,
      setItem: nr
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    Ze = "web_app_trigger_haptic_feedback",
    Lt = D(Ze),
    Ut = W(Lt),
    or = Ut(e => {
      _(Ze, {
        type: "impact",
        impact_style: e
      })
    }),
    rr = Ut(e => {
      _(Ze, {
        type: "notification",
        notification_type: e
      })
    }),
    sr = Ut(() => {
      _(Ze, {
        type: "selection_change"
      })
    }),
    Ea = Object.freeze(Object.defineProperty({
      __proto__: null,
      impactOccurred: or,
      isSupported: Lt,
      notificationOccurred: rr,
      selectionChanged: sr
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    et = c(void 0);

function M(e) {
  return h(() => {
    const t = et();
    return t ? t[e] : void 0
  })
}
const jt = M("authDate"),
    Wt = M("canSendAfter"),
    ir = h(() => {
      const e = jt(),
          t = Wt();
      return t && e ? new Date(e.getTime() + t * 1e3) : void 0
    }),
    ar = M("chat"),
    cr = M("chatType"),
    ur = M("chatInstance"),
    lr = M("hash"),
    pr = M("queryId"),
    qt = c(),
    _r = M("receiver");

function dr() {
  const e = Z();
  et.set(e.initData), qt.set(e.initDataRaw)
}
const fr = M("startParam"),
    hr = M("user"),
    wa = Object.freeze(Object.defineProperty({
      __proto__: null,
      authDate: jt,
      canSendAfter: Wt,
      canSendAfterDate: ir,
      chat: ar,
      chatInstance: ur,
      chatType: cr,
      hash: lr,
      queryId: pr,
      raw: qt,
      receiver: _r,
      restore: dr,
      startParam: fr,
      state: et,
      user: hr
    }, Symbol.toStringTag, {
      value: "Module"
    }));

function Sa(e) {
  return fi()(e)
}
const br = "web_app_open_invoice",
    Pe = c(!1),
    Ht = D(br);
async function mr(e, t, n) {
  if (Pe()) throw new l(C);
  let o;
  if (t === "url") {
    const {
      hostname: r,
      pathname: s
    } = new URL(e, window.location.href);
    if (r !== "t.me") throw new l(At);
    const i = s.match(/^\/(\$|invoice\/)([A-Za-z0-9\-_=]+)$/);
    if (!i) throw new l(Eo);
    [, , o] = i
  } else o = e, n = t;
  return Pe.set(!0), I(br, "invoice_closed", {
    ...n,
    params: {
      slug: o
    },
    capture: r => o === r.slug
  }).then(r => r.status).finally(() => {
    Pe.set(!1)
  })
}
const gr = E(mr, Ht),
    ya = Object.freeze(Object.defineProperty({
      __proto__: null,
      _open: mr,
      isOpened: Pe,
      isSupported: Ht,
      open: gr
    }, Symbol.toStringTag, {
      value: "Module"
    }));

function Gt(e) {
  const t = mt(e);
  return Math.sqrt([.299, .587, .114].reduce((n, o, r) => {
    const s = parseInt(t.slice(1 + r * 2, 1 + (r + 1) * 2), 16);
    return n + s * s * o
  }, 0)) < 120
}
const ae = c(!1),
    ve = c(!1),
    k = c({});

function m(e) {
  return h(() => k()[e])
}
const Er = m("accentTextColor"),
    tt = m("bgColor"),
    nt = m("buttonColor"),
    zt = m("buttonTextColor"),
    Yt = m("bottomBarBgColor"),
    wr = m("destructiveTextColor"),
    Sr = m("headerBgColor"),
    yr = m("hintColor"),
    Cr = h(() => {
      const {
        bgColor: e
      } = k();
      return !e || Gt(e)
    }),
    Pr = m("linkColor"),
    Ie = m("secondaryBgColor"),
    vr = m("sectionBgColor"),
    Rr = m("sectionHeaderTextColor"),
    Ar = m("sectionSeparatorColor"),
    Tr = m("subtitleTextColor"),
    $r = m("textColor");

function ee(e) {
  return h(() => ge()[e])
}
const ce = c({
      hasShineEffect: !1,
      isEnabled: !0,
      isLoaderVisible: !1,
      isVisible: !1,
      text: "Continue"
    }),
    ge = h(() => {
      const e = ce();
      return {
        ...e,
        backgroundColor: e.backgroundColor || nt() || "#2481cc",
        textColor: e.textColor || zt() || "#ffffff"
      }
    }),
    ue = c(!1),
    Br = ee("backgroundColor"),
    Or = ee("hasShineEffect"),
    Ir = ee("isEnabled"),
    Dr = ee("isLoaderVisible"),
    Mr = ee("isVisible"),
    xr = ee("text"),
    kr = ee("textColor"),
    Ca = "web_app_setup_main_button",
    Nr = "main_button_pressed",
    Vr = "mainButton",
    Pa = Q(ue);

function Lr() {
  if (!ue()) {
    const e = O() && A(Vr);
    e && ce.set(e), ce.sub(Wr), v(ge, qr), ue.set(!0)
  }
}

function Ur(e) {
  return S(Nr, e)
}

function jr(e) {
  Y(Nr, e)
}

function Wr(e) {
  R(Vr, e)
}

function qr() {
  const e = ge();
  e.text && _(Ca, {
    color: e.backgroundColor,
    has_shine_effect: e.hasShineEffect,
    is_active: e.isEnabled,
    is_progress_visible: e.isLoaderVisible,
    is_visible: e.isVisible,
    text: e.text,
    text_color: e.textColor
  })
}
const Hr = Pa(e => {
  ce.set({
    ...ce(),
    ...Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0))
  })
});

function Gr() {
  ce.unsub(Wr), ge.unsub(qr), ue.set(!1)
}
const va = Object.freeze(Object.defineProperty({
  __proto__: null,
  backgroundColor: Br,
  hasShineEffect: Or,
  isEnabled: Ir,
  isLoaderVisible: Dr,
  isMounted: ue,
  isVisible: Mr,
  mount: Lr,
  offClick: jr,
  onClick: Ur,
  setParams: Hr,
  state: ge,
  text: xr,
  textColor: kr,
  unmount: Gr
}, Symbol.toStringTag, {
  value: "Module"
}));

function zr(e) {
  return bi()(e)
}
const Yr = "themeParams",
    Fr = "theme_changed",
    Qr = Bt(e => {
      if (ve()) throw new l(C);
      e || (e = o => `--tg-theme-${Ct(o)}`);

      function t(o) {
        Object.entries(k()).forEach(([r, s]) => {
          s && o(r, s)
        })
      }

      function n() {
        t((o, r) => {
          ze(e(o), r)
        })
      }
      return n(), k.sub(n), ve.set(!0), () => {
        t(Ye), k.unsub(n), ve.set(!1)
      }
    }, ae);

function Ft() {
  ae() || (S(Fr, Jr), k.set(O() && A(Yr) || Z().themeParams), ae.set(!0))
}
const Jr = e => {
  const t = zr(e.theme_params);
  k.set(t), R(Yr, t)
};

function Kr() {
  Y(Fr, Jr), ae.set(!1)
}

function Ra(e, t) {
  function n(o) {
    const r = t[o];
    return N(r[0], r[1], F())
  }
  return Object.assign((...o) => {
    for (const r in t)
      if (t[r][2](...o) && !n(r)) throw new l($t, `Parameter "${r}" is not supported`);
    return e(...o)
  }, e, {
    supports: n
  })
}

function Xr(e) {
  return h(() => {
    const t = e();
    return he(t) ? t : t === "bg_color" ? tt() : Ie()
  })
}
const V = c("bg_color"),
    Qt = Xr(V),
    L = c("bottom_bar_bg_color"),
    ot = h(() => {
      const e = L();
      return he(e) ? e : e === "bottom_bar_bg_color" ? Yt() || Ie() : e === "secondary_bg_color" ? Ie() : tt()
    }),
    U = c("bg_color"),
    Jt = Xr(U),
    le = c(!1),
    Re = c(!1),
    Zr = h(() => {
      const e = Qt();
      return e ? Gt(e) : !1
    }),
    Kt = h(() => ({
      backgroundColor: V(),
      bottomBarColor: L(),
      headerColor: U()
    })),
    Xt = "web_app_set_background_color",
    Zt = "web_app_set_bottom_bar_color",
    He = "web_app_set_header_color",
    es = "miniApp",
    en = h(() => [Xt, Zt, He].some(e => N(e, F()))),
    Aa = W(en),
    rt = Q(le),
    ts = rt(e => {
      if (Re()) throw new l(C);
      const [t, n] = be();

      function o(r, s) {
        function i() {
          ze(r, s() || null)
        }
        i(), t(s.sub(i), Ye.bind(null, r))
      }
      return e || (e = r => `--tg-${Ct(r)}`), o(e("bgColor"), Qt), o(e("bottomBarColor"), ot), o(e("headerColor"), Jt), t(() => {
        Re.set(!1)
      }), Re.set(!0), n
    });

function ns(e) {
  _("web_app_close", {
    return_back: e
  })
}
const os = Aa(() => {
  if (!le()) {
    const e = O() && A(es);
    Ft(), V.set(e ? e.backgroundColor : "bg_color"), L.set(e ? e.bottomBarColor : "bottom_bar_bg_color"), U.set(e ? e.headerColor : "bg_color"), nn.isSupported() && v(V, rs), on.isSupported() && v(L, ss), rn.isSupported() && v(U, is), le.set(!0)
  }
});

function rs() {
  tn(), _(Xt, {
    color: V()
  })
}

function ss() {
  tn(), _(Zt, {
    color: L()
  })
}

function is() {
  const e = U();
  tn(), _(He, he(e) ? {
    color: e
  } : {
    color_key: e
  })
}

function as() {
  _("web_app_ready")
}

function tn() {
  R(es, Kt())
}
const nn = E(rt(e => {
      V.set(e)
    }), Xt),
    on = E(rt(e => {
      L.set(e)
    }), Zt),
    rn = Ra(E(rt(e => {
      U.set(e)
    }), He), {
      color: [He, "color", he]
    });

function cs() {
  V.unsub(rs), L.unsub(ss), U.unsub(is), le.set(!1)
}
const Ta = Object.freeze(Object.defineProperty({
  __proto__: null,
  backgroundColor: V,
  backgroundColorRGB: Qt,
  bindCssVars: ts,
  bottomBarColor: L,
  bottomBarColorRGB: ot,
  close: ns,
  headerColor: U,
  headerColorRGB: Jt,
  isCssVarsBound: Re,
  isDark: Zr,
  isMounted: le,
  isSupported: en,
  mount: os,
  ready: as,
  setBackgroundColor: nn,
  setBottomBarColor: on,
  setHeaderColor: rn,
  state: Kt,
  unmount: cs
}, Symbol.toStringTag, {
  value: "Module"
}));

function $a(e) {
  const t = e.message.trim(),
      n = (e.title || "").trim(),
      o = e.buttons || [];
  if (n.length > 64) throw new l(oe, `Invalid title: ${n}`);
  if (!t || t.length > 256) throw new l(oe, `Invalid message: ${t}`);
  if (o.length > 3) throw new l(oe, `Invalid buttons count: ${o.length}`);
  return {
    title: n,
    message: t,
    buttons: o.length ? o.map((r, s) => {
      const i = r.id || "";
      if (i.length > 64) throw new l(oe, `Button with index ${s} has invalid id: ${i}`);
      if (!r.type || r.type === "default" || r.type === "destructive") {
        const a = r.text.trim();
        if (!a || a.length > 64) throw new l(oe, `Button with index ${s} has invalid text: ${a}`);
        return {
          type: r.type,
          text: a,
          id: i
        }
      }
      return {
        type: r.type,
        id: i
      }
    }) : [{
      type: "close",
      id: ""
    }]
  }
}
const us = "web_app_open_popup",
    sn = D(us),
    Ae = c(!1),
    ls = E(async e => {
      if (Ae()) throw new l(C);
      Ae.set(!0);
      try {
        const {
          button_id: t = null
        } = await I(us, "popup_closed", {
          ...e,
          params: $a(e)
        });
        return t
      } finally {
        Ae.set(!1)
      }
    }, sn),
    Ba = Object.freeze(Object.defineProperty({
      __proto__: null,
      isOpened: Ae,
      isSupported: sn,
      open: ls
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    Oa = "web_app_close_scan_qr_popup",
    ps = "web_app_open_scan_qr_popup",
    Ia = "scan_qr_popup_closed",
    Da = "qr_text_received",
    an = D(ps),
    _s = W(an),
    Ge = _s(() => {
      X.set(!1), _(Oa)
    }),
    X = c(!1);

function Ma(e) {
  return f.withFn(t => {
    if (X()) throw new l(C);
    X.set(!0), e || (e = {});
    const {
      onCaptured: n,
      text: o,
      capture: r
    } = e, [, s] = be(X.sub(() => {
      i.resolve()
    }), S(Ia, () => {
      X.set(!1)
    }), S(Da, a => {
      n ? n(a.data) : (!r || r(a.data)) && (i.resolve(a.data), Ge())
    })), i = new we({
      abortSignal: t
    }).catch(Ge).finally(s);
    return (e.postEvent || _)(ps, {
      text: o
    }), i
  }, e)
}
const ds = _s(Ma),
    xa = Object.freeze(Object.defineProperty({
      __proto__: null,
      close: Ge,
      isOpened: X,
      isSupported: an,
      open: ds
    }, Symbol.toStringTag, {
      value: "Module"
    }));

function J(e) {
  return h(() => Ee()[e])
}
const pe = c({
      hasShineEffect: !1,
      isEnabled: !0,
      isLoaderVisible: !1,
      isVisible: !1,
      position: "left",
      text: "Cancel"
    }),
    Ee = h(() => {
      const e = pe();
      return {
        ...e,
        backgroundColor: e.backgroundColor || ot() || "#000000",
        textColor: e.textColor || nt() || "#2481cc"
      }
    }),
    _e = c(!1),
    fs = J("backgroundColor"),
    hs = J("hasShineEffect"),
    bs = J("isEnabled"),
    ms = J("isLoaderVisible"),
    gs = J("isVisible"),
    Es = J("position"),
    ws = J("text"),
    Ss = J("textColor"),
    ys = "web_app_setup_secondary_button",
    Cs = "secondary_button_pressed",
    Ps = "secondaryButton",
    cn = D(ys),
    un = W(cn),
    ka = Q(_e),
    vs = un(() => {
      if (!_e()) {
        const e = O() && A(Ps);
        e && pe.set(e), pe.sub(Ts), v(Ee, $s), _e.set(!0)
      }
    }),
    Rs = un(e => S(Cs, e)),
    As = un(e => {
      Y(Cs, e)
    });

function Ts(e) {
  R(Ps, e)
}

function $s() {
  const e = Ee();
  e.text && _(ys, {
    color: e.backgroundColor,
    has_shine_effect: e.hasShineEffect,
    is_active: e.isEnabled,
    is_progress_visible: e.isLoaderVisible,
    is_visible: e.isVisible,
    position: e.position,
    text: e.text,
    text_color: e.textColor
  })
}
const Bs = ka(e => {
  pe.set({
    ...pe(),
    ...Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0))
  })
});

function Os() {
  pe.unsub(Ts), Ee.unsub($s), _e.set(!1)
}
const Na = Object.freeze(Object.defineProperty({
      __proto__: null,
      backgroundColor: fs,
      hasShineEffect: hs,
      isEnabled: bs,
      isLoaderVisible: ms,
      isMounted: _e,
      isSupported: cn,
      isVisible: gs,
      mount: vs,
      offClick: As,
      onClick: Rs,
      position: Es,
      setParams: Bs,
      state: Ee,
      text: ws,
      textColor: Ss,
      unmount: Os
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    Is = "web_app_setup_settings_button",
    Ds = "settings_button_pressed",
    Ms = "settingsButton",
    de = c(!1),
    ln = D(Is),
    pn = W(ln),
    xs = Q(de),
    ks = xs(() => {
      G.set(!1)
    }),
    G = c(!1),
    Ns = pn(() => {
      de() || (G.set(O() && A(Ms) || !1), v(G, Vs), de.set(!0))
    });

function Vs() {
  const e = G();
  _(Is, {
    is_visible: e
  }), R(Ms, e)
}
const Ls = pn(e => S(Ds, e)),
    Us = pn(e => {
      Y(Ds, e)
    }),
    js = xs(() => {
      G.set(!0)
    });

function Ws() {
  G.unsub(Vs), de.set(!1)
}
const Va = Object.freeze(Object.defineProperty({
      __proto__: null,
      hide: ks,
      isMounted: de,
      isSupported: ln,
      isVisible: G,
      mount: Ns,
      offClick: Us,
      onClick: Ls,
      show: js,
      unmount: Ws
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    qs = "web_app_setup_swipe_behavior",
    Hs = "swipeBehavior",
    fe = c(!1),
    _n = D(qs),
    La = W(_n),
    Gs = Q(fe),
    zs = Gs(() => {
      z.set(!1)
    }),
    Ys = Gs(() => {
      z.set(!0)
    }),
    z = c(!0),
    Fs = La(() => {
      fe() || (z.set(O() && A(Hs) || !1), v(z, Qs), fe.set(!0))
    });

function Qs() {
  const e = z();
  _(qs, {
    allow_vertical_swipe: e
  }), R(Hs, e)
}

function Js() {
  z.unsub(Qs), fe.set(!1)
}
const Ua = Object.freeze(Object.defineProperty({
      __proto__: null,
      disableVertical: zs,
      enableVertical: Ys,
      isMounted: fe,
      isSupported: _n,
      isVerticalEnabled: z,
      mount: Fs,
      unmount: Js
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    ja = Object.freeze(Object.defineProperty({
      __proto__: null,
      accentTextColor: Er,
      backgroundColor: tt,
      bindCssVars: Qr,
      bottomBarBgColor: Yt,
      buttonColor: nt,
      buttonTextColor: zt,
      destructiveTextColor: wr,
      headerBackgroundColor: Sr,
      hintColor: yr,
      isCssVarsBound: ve,
      isDark: Cr,
      isMounted: ae,
      linkColor: Pr,
      mount: Ft,
      secondaryBackgroundColor: Ie,
      sectionBackgroundColor: vr,
      sectionHeaderTextColor: Rr,
      sectionSeparatorColor: Ar,
      state: k,
      subtitleTextColor: Tr,
      textColor: $r,
      unmount: Kr
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    g = c({
      height: 0,
      width: 0,
      isExpanded: !1,
      stableHeight: 0
    }),
    st = c(!1),
    Te = c(!1),
    dn = c(!1),
    fn = c(void 0);

function it(e) {
  return h(() => g()[e])
}
const Ks = it("height"),
    Xs = it("isExpanded"),
    Zs = h(() => {
      const e = g();
      return e.height === e.stableHeight
    }),
    ei = it("stableHeight"),
    ti = it("width");

function Wa(e) {
  return I("web_app_request_viewport", "viewport_changed", e).then(t => ({
    height: t.height,
    width: t.width,
    isExpanded: t.is_expanded,
    isStable: t.is_state_stable
  }))
}
const ni = Bt(e => {
  if (Te()) throw new l(C);
  e || (e = o => `--tg-viewport-${Ct(o)}`);
  const t = ["height", "width", "stableHeight"];

  function n() {
    t.forEach(o => {
      ze(e(o), `${g()[o]}px`)
    })
  }
  return n(), g.sub(n), Te.set(!0), () => {
    t.forEach(Ye), g.unsub(n), Te.set(!1)
  }
}, st);

function oi() {
  _("web_app_expand")
}

function ri(e) {
  return {
    isExpanded: e.isExpanded,
    height: _t(e.height),
    width: _t(e.width),
    stableHeight: _t(e.stableHeight)
  }
}
const si = Mo(e => {
      const t = O() && A("viewport");
      if (t) return t;
      if (["macos", "tdesktop", "unigram", "webk", "weba", "web"].includes(Z().platform)) {
        const n = window;
        return {
          isExpanded: !0,
          height: n.innerHeight,
          width: n.innerWidth,
          stableHeight: n.innerHeight
        }
      }
      return e.timeout || (e.timeout = 1e3), Wa(e).then(n => ({
        height: n.height,
        isExpanded: n.isExpanded,
        stableHeight: n.isStable ? n.height : g().stableHeight,
        width: n.width
      }))
    }, e => {
      S("viewport_changed", ii), v(g, ai), g.set(ri(e))
    }, {
      isMounted: st,
      isMounting: dn,
      mountError: fn
    }),
    ii = e => {
      g.set(ri({
        height: e.height,
        width: e.width,
        isExpanded: e.is_expanded,
        stableHeight: e.is_state_stable ? e.height : g().stableHeight
      }))
    };

function ai() {
  R("viewport", g())
}

function _t(e) {
  return Math.max(e, 0)
}

function ci() {
  Y("viewport_changed", ii), g.unsub(ai)
}
const qa = Object.freeze(Object.defineProperty({
      __proto__: null,
      bindCssVars: ni,
      expand: oi,
      height: Ks,
      isCssVarsBound: Te,
      isExpanded: Xs,
      isMounted: st,
      isMounting: dn,
      isStable: Zs,
      mount: si,
      mountError: fn,
      stableHeight: ei,
      state: g,
      unmount: ci,
      width: ti
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    yn = "web_app_open_tg_link";

function Ha(e, t) {
  t || (t = {}), _("web_app_open_link", {
    url: ra(e).toString(),
    try_browser: t.tryBrowser,
    try_instant_view: t.tryInstantView
  })
}

function ui(e) {
  const {
    hostname: t,
    pathname: n,
    search: o
  } = new URL(e, "https://t.me");
  if (t !== "t.me") throw new l(At);
  if (!N(yn, F())) {
    window.location.href = e;
    return
  }
  _(yn, {
    path_full: n + o
  })
}

function Ga(e, t) {
  ui("https://t.me/share/url?" + new URLSearchParams({
    url: e,
    text: t || ""
  }).toString().replace(/\+/g, "%20"))
}
const ft = "web_app_request_phone",
    Cn = "web_app_request_write_access",
    ke = c(!1),
    Ne = c(!1);

function Pn(e) {
  return e || (e = {}), xe("getRequestedContact", {}, {
    ...e,
    timeout: e.timeout || 5e3
  }).then(xn({
    contact: Ve({
      userId: ["user_id", Le()],
      phoneNumber: ["phone_number", x()],
      firstName: ["first_name", x()],
      lastName: ["last_name", x(!0)]
    })(),
    authDate: ["auth_date", Mn()],
    hash: x()
  })())
}
const za = E(e => new f(async (t, n, o) => {
      const r = {
        postEvent: (e || {}).postEvent,
        abortSignal: o
      };
      try {
        return t(await Pn(r))
      } catch {}
      if (await li(r) !== "sent") throw new l(So);
      let i = 50;
      for (; !o.aborted;) {
        try {
          return t(await Pn(r))
        } catch {}
        await ji(i), i += 50
      }
    }, e), ft),
    li = E(e => {
      if (ke()) throw new l(C);
      return ke.set(!0), I(ft, "phone_requested", e).then(t => t.status).finally(() => {
        ke.set(!1)
      })
    }, ft),
    Ya = E(e => {
      if (Ne()) throw new l(C);
      return Ne.set(!0), I(Cn, "write_access_requested", e).then(t => t.status).finally(() => {
        Ne.set(!1)
      })
    }, Cn),
    vn = "web_app_read_text_from_clipboard",
    Rn = "web_app_switch_inline_query",
    An = "web_app_share_to_story",
    Fa = E(e => {
      const t = go();
      return I(vn, "clipboard_text_received", {
        ...e,
        params: {
          req_id: t
        },
        capture: _o(t)
      }).then(({
                 data: n = null
               }) => n)
    }, vn);

function Qa(e) {
  const {
    size: t
  } = new Blob([e]);
  if (!t || t > 4096) throw new l(wo);
  _("web_app_data_send", {
    data: e
  })
}
const Ja = E((e, t) => {
      t || (t = {}), (t.postEvent || _)(An, {
        text: t.text,
        media_url: e,
        widget_link: t.widgetLink
      })
    }, An),
    Ka = E((e, t) => {
      _(Rn, {
        query: e,
        chat_types: t || []
      })
    }, () => N(Rn, F()) && !!Z().botInline);

function Xa() {
  return typeof window > "u"
}

function Za(e) {
  ca(e), lo();
  const [t, n] = be(S("reload_iframe", () => {
    _("iframe_will_reload"), window.location.reload()
  }), po), {
    acceptCustomStyles: o = !0
  } = e || {};
  if (o) {
    const r = document.createElement("style");
    r.id = "telegram-custom-styles", document.head.appendChild(r), t(S("set_custom_style", s => {
      r.innerHTML = s
    }), () => {
      document.head.removeChild(r)
    })
  }
  return _("iframe_ready", {
    reload_supported: !0
  }), n
}
exports.$createRequestId = mo;
exports.$debug = Xn;
exports.$postEvent = Rt;
exports.$targetOrigin = io;
exports.$version = F;
exports.CancelablePromise = f;
exports.ERR_ABORTED = wt;
exports.ERR_ACCESS_DENIED = So;
exports.ERR_ALREADY_CALLED = C;
exports.ERR_CANCELED = St;
exports.ERR_CUSTOM_METHOD_ERR_RESPONSE = so;
exports.ERR_DATA_INVALID_SIZE = wo;
exports.ERR_INVALID_HOSTNAME = At;
exports.ERR_INVALID_SLUG = Eo;
exports.ERR_INVALID_VALUE = Bn;
exports.ERR_METHOD_PARAMETER_UNSUPPORTED = oo;
exports.ERR_METHOD_UNSUPPORTED = to;
exports.ERR_NOT_AVAILABLE = Tt;
exports.ERR_NOT_MOUNTED = yo;
exports.ERR_NOT_SUPPORTED = $t;
exports.ERR_PARSE = ht;
exports.ERR_POPUP_INVALID_PARAMS = oe;
exports.ERR_RETRIEVE_LP_FAILED = no;
exports.ERR_TIMED_OUT = yt;
exports.ERR_UNEXPECTED_TYPE = In;
exports.ERR_UNEXPECTED_VALUE = On;
exports.ERR_UNKNOWN_ENV = ro;
exports.TypedError = l;
exports.addEventListener = We;
exports.authenticateBiometry = Vo;
exports.backButton = ua;
exports.bindMiniAppCssVars = ts;
exports.bindThemeParamsCssVars = Qr;
exports.bindViewportCssVars = ni;
exports.biometry = fa;
exports.biometryMountError = Mt;
exports.biometryState = $;
exports.classNames = Ue;
exports.closeMiniApp = ns;
exports.closeQrScanner = Ge;
exports.closingBehavior = ha;
exports.cloudStorage = ga;
exports.compareVersions = fo;
exports.createPostEvent = ho;
exports.defineEventHandlers = lo;
exports.deleteCloudStorageItem = Zo;
exports.deleteCssVar = Ye;
exports.disableClosingConfirmation = Fo;
exports.disableVerticalSwipes = zs;
exports.emitMiniAppsEvent = qe;
exports.enableClosingConfirmation = Qo;
exports.enableVerticalSwipes = Ys;
exports.expandViewport = oi;
exports.getCloudStorageItem = er;
exports.getCloudStorageKeys = tr;
exports.hapticFeedback = Ea;
exports.hapticFeedbackImpactOccurred = or;
exports.hapticFeedbackNotificationOccurred = rr;
exports.hapticFeedbackSelectionChanged = sr;
exports.hideBackButton = Ao;
exports.hideSettingsButton = ks;
exports.init = Za;
exports.initData = wa;
exports.initDataAuthDate = jt;
exports.initDataCanSendAfter = Wt;
exports.initDataCanSendAfterDate = ir;
exports.initDataChat = ar;
exports.initDataChatInstance = ur;
exports.initDataChatType = cr;
exports.initDataHash = lr;
exports.initDataQueryId = pr;
exports.initDataRaw = qt;
exports.initDataReceiver = _r;
exports.initDataStartParam = fr;
exports.initDataState = et;
exports.initDataUser = hr;
exports.invoice = ya;
exports.invokeCustomMethod = bo;
exports.isAbortError = Li;
exports.isAuthenticatingBiometry = ye;
exports.isBackButtonMounted = se;
exports.isBackButtonSupported = Ot;
exports.isBackButtonVisible = q;
exports.isBiometryMounted = Je;
exports.isBiometryMounting = Dt;
exports.isBiometrySupported = Ke;
exports.isCanceledError = Ui;
exports.isClosingBehaviorMounted = ie;
exports.isClosingConfirmationEnabled = H;
exports.isCloudStorageSupported = Vt;
exports.isColorDark = Gt;
exports.isHapticFeedbackSupported = Lt;
exports.isIframe = Fn;
exports.isInvoiceOpened = Pe;
exports.isInvoiceSupported = Ht;
exports.isMainButtonEnabled = Ir;
exports.isMainButtonLoaderVisible = Dr;
exports.isMainButtonMounted = ue;
exports.isMainButtonVisible = Mr;
exports.isMiniAppCssVarsBound = Re;
exports.isMiniAppDark = Zr;
exports.isMiniAppMounted = le;
exports.isMiniAppSupported = en;
exports.isPopupOpened = Ae;
exports.isPopupSupported = sn;
exports.isQrScannerOpened = X;
exports.isQrScannerSupported = an;
exports.isRGB = he;
exports.isRGBShort = kn;
exports.isRecord = gt;
exports.isRequestingBiometryAccess = Ce;
exports.isRequestingPhoneAccess = ke;
exports.isRequestingWriteAccess = Ne;
exports.isSSR = Xa;
exports.isSecondaryButtonEnabled = bs;
exports.isSecondaryButtonLoaderVisible = ms;
exports.isSecondaryButtonMounted = _e;
exports.isSecondaryButtonSupported = cn;
exports.isSecondaryButtonVisible = gs;
exports.isSettingsButtonMounted = de;
exports.isSettingsButtonSupported = ln;
exports.isSettingsButtonVisible = G;
exports.isSwipeBehaviorMounted = fe;
exports.isSwipeBehaviorSupported = _n;
exports.isTMA = Xi;
exports.isThemeParamsCssVarsBound = ve;
exports.isThemeParamsDark = Cr;
exports.isThemeParamsMounted = ae;
exports.isTimeoutError = Vi;
exports.isVerticalSwipesEnabled = z;
exports.isViewportCssVarsBound = Te;
exports.isViewportExpanded = Xs;
exports.isViewportMounted = st;
exports.isViewportMounting = dn;
exports.isViewportStable = Zs;
exports.mainButton = va;
exports.mainButtonBackgroundColor = Br;
exports.mainButtonHasShineEffect = Or;
exports.mainButtonState = ge;
exports.mainButtonText = xr;
exports.mainButtonTextColor = kr;
exports.mergeClassNames = Ei;
exports.miniApp = Ta;
exports.miniAppBackgroundColor = V;
exports.miniAppBottomBarColor = L;
exports.miniAppBottomBarColorRGB = ot;
exports.miniAppHeaderColor = U;
exports.miniAppHeaderColorRGB = Jt;
exports.miniAppReady = as;
exports.miniAppState = Kt;
exports.mockTelegramEnv = ea;
exports.mountBackButton = To;
exports.mountBiometry = jo;
exports.mountClosingBehavior = Jo;
exports.mountMainButton = Lr;
exports.mountMiniApp = os;
exports.mountSecondaryButton = vs;
exports.mountSettingsButton = Ns;
exports.mountSwipeBehavior = Fs;
exports.mountThemeParams = Ft;
exports.mountViewport = si;
exports.off = Y;
exports.offBackButtonClick = Oo;
exports.offMainButtonClick = jr;
exports.offSecondaryButtonClick = As;
exports.offSettingsButtonClick = Us;
exports.on = S;
exports.onBackButtonClick = Bo;
exports.onMainButtonClick = Ur;
exports.onSecondaryButtonClick = Rs;
exports.onSettingsButtonClick = Ls;
exports.openBiometrySettings = Lo;
exports.openInvoice = gr;
exports.openLink = Ha;
exports.openPopup = ls;
exports.openQrScanner = ds;
exports.openTelegramLink = ui;
exports.parseInitData = Sa;
exports.parseThemeParams = zr;
exports.popup = Ba;
exports.postEvent = Fe;
exports.qrScanner = xa;
exports.readTextFromClipboard = Fa;
exports.removeEventHandlers = po;
exports.request = Qe;
exports.requestBiometry = xo;
exports.requestBiometryAccess = Uo;
exports.requestContact = za;
exports.requestPhoneAccess = li;
exports.requestWriteAccess = Ya;
exports.restoreInitData = dr;
exports.retrieveLaunchParams = Z;
exports.secondaryButton = Na;
exports.secondaryButtonBackgroundColor = fs;
exports.secondaryButtonHasShineEffect = hs;
exports.secondaryButtonPosition = Es;
exports.secondaryButtonState = Ee;
exports.secondaryButtonText = ws;
exports.secondaryButtonTextColor = Ss;
exports.sendData = Qa;
exports.serializeLaunchParams = mi;
exports.serializeThemeParams = Nn;
exports.setCloudStorageItem = nr;
exports.setCssVar = ze;
exports.setMainButtonParams = Hr;
exports.setMiniAppBackgroundColor = nn;
exports.setMiniAppBottomBarColor = on;
exports.setMiniAppHeaderColor = rn;
exports.setSecondaryButtonParams = Bs;
exports.settingsButton = Va;
exports.shareStory = Ja;
exports.shareURL = Ga;
exports.showBackButton = Io;
exports.showSettingsButton = js;
exports.subscribe = ta;
exports.supports = N;
exports.swipeBehavior = Ua;
exports.switchInlineQuery = Ka;
exports.themeParams = ja;
exports.themeParamsAccentTextColor = Er;
exports.themeParamsBackgroundColor = tt;
exports.themeParamsBottomBarBgColor = Yt;
exports.themeParamsButtonColor = nt;
exports.themeParamsButtonTextColor = zt;
exports.themeParamsDestructiveTextColor = wr;
exports.themeParamsHeaderBackgroundColor = Sr;
exports.themeParamsHintColor = yr;
exports.themeParamsLinkColor = Pr;
exports.themeParamsSecondaryBackgroundColor = Ie;
exports.themeParamsSectionBackgroundColor = vr;
exports.themeParamsSectionHeaderTextColor = Rr;
exports.themeParamsSectionSeparatorColor = Ar;
exports.themeParamsState = k;
exports.themeParamsSubtitleTextColor = Tr;
exports.themeParamsTextColor = $r;
exports.toRGB = mt;
exports.toRecord = bt;
exports.unmountBackButton = Do;
exports.unmountBiometry = Ho;
exports.unmountClosingBehavior = Xo;
exports.unmountMainButton = Gr;
exports.unmountMiniApp = cs;
exports.unmountSecondaryButton = Os;
exports.unmountSettingsButton = Ws;
exports.unmountSwipeBehavior = Js;
exports.unmountThemeParams = Kr;
exports.unmountViewport = ci;
exports.unsubscribe = na;
exports.updateBiometryToken = Go;
exports.viewport = qa;
exports.viewportHeight = Ks;
exports.viewportMountError = fn;
exports.viewportStableHeight = ei;
exports.viewportState = g;
exports.viewportWidth = ti;
//# sourceMappingURL=index.cjs.map