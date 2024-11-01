//if(this.telegramApps == undefined) 
this.telegramApps = {}
this.telegramApps.sdk = function(o) {
  "use strict";
  let St = class ui extends Error {
    constructor(e, n, r) {
      super(typeof n == "object" ? n.message : n || e, {
        cause: typeof n == "object" ? n.cause : r
      }), this.type = e, Object.setPrototypeOf(this, ui.prototype)
    }
  };

  function bn(t) {
    return t.replace(/[A-Z]/g, e => `_${e.toLowerCase()}`)
  }

  function di(t) {
    return t.replace(/_[a-z]/g, e => e[1].toUpperCase())
  }
  const mn = "ERR_INVALID_VALUE",
      gn = "ERR_UNEXPECTED_VALUE",
      En = "ERR_UNEXPECTED_TYPE",
      ce = "ERR_PARSE";

  function wn(t, e) {
    const n = {};
    for (const r in t) {
      const s = t[r];
      if (!s) continue;
      let i, a;
      typeof s == "function" ? (i = r, a = s) : [i, a] = s;
      try {
        const c = a(e(i));
        c !== void 0 && (n[r] = c)
      } catch (c) {
        throw new St(ce, `Parser for "${r}" property failed${i===r?"":`. Source field: "${i}"`}`, c)
      }
    }
    return n
  }

  function ue(t) {
    let e = t;
    if (typeof e == "string") try {
      e = JSON.parse(e)
    } catch (n) {
      throw new St(mn, {
        cause: n
      })
    }
    if (typeof e != "object" || !e || Array.isArray(e)) throw new St(gn);
    return e
  }

  function N(t, e) {
    return n => {
      const r = s => {
        if (!(n && s === void 0)) try {
          return e(s)
        } catch (i) {
          throw new St(ce, {
            message: `"${t}" transformer failed to parse the value`,
            cause: i
          })
        }
      };
      return Object.assign(r, {
        isValid(s) {
          try {
            return r(s), !0
          } catch {
            return !1
          }
        }
      })
    }
  }

  function Vt(t, e) {
    return N(e || "object", n => {
      const r = ue(n);
      return wn(t, s => r[s])
    })
  }

  function yt(t) {
    throw new St(En, `Unexpected value received: ${JSON.stringify(t)}`)
  }
  const fi = N("boolean", t => {
        if (typeof t == "boolean") return t;
        const e = String(t);
        if (e === "1" || e === "true") return !0;
        if (e === "0" || e === "false") return !1;
        yt(t)
      }),
      V = N("string", t => {
        if (typeof t == "string" || typeof t == "number") return t.toString();
        yt(t)
      }),
      Lt = N("number", t => {
        if (typeof t == "number") return t;
        if (typeof t == "string") {
          const e = Number(t);
          if (!Number.isNaN(e)) return e
        }
        yt(t)
      }),
      Sn = N("date", t => t instanceof Date ? t : new Date(Lt()(t) * 1e3));

  function yn(t, e) {
    return N(e || "searchParams", n => {
      typeof n != "string" && !(n instanceof URLSearchParams) && yt(n);
      const r = typeof n == "string" ? new URLSearchParams(n) : n;
      return wn(t, s => {
        const i = r.get(s);
        return i === null ? void 0 : i
      })
    })
  }

  function le(t) {
    for (const e in t) t[e] = [bn(e), t[e]];
    return t
  }
  const pi = t => {
    const e = Lt(),
        n = Lt(!0),
        r = V(),
        s = V(!0),
        i = fi(!0),
        a = Vt(le({
          addedToAttachmentMenu: i,
          allowsWriteToPm: i,
          firstName: r,
          id: e,
          isBot: i,
          isPremium: i,
          languageCode: s,
          lastName: s,
          photoUrl: s,
          username: s
        }), "User")(!0);
    return yn(le({
      authDate: Sn(),
      canSendAfter: n,
      chat: Vt(le({
        id: e,
        type: r,
        title: r,
        photoUrl: s,
        username: s
      }), "Chat")(!0),
      chatInstance: s,
      chatType: s,
      hash: r,
      queryId: s,
      receiver: a,
      startParam: s,
      user: a
    }), "initData")(t)
  };

  function nt(t) {
    return /^#[\da-f]{6}$/i.test(t)
  }

  function Cn(t) {
    return /^#[\da-f]{3}$/i.test(t)
  }

  function _e(t) {
    const e = t.replace(/\s/g, "").toLowerCase();
    if (nt(e)) return e;
    if (Cn(e)) {
      let r = "#";
      for (let s = 0; s < 3; s += 1) r += e[1 + s].repeat(2);
      return r
    }
    const n = e.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || e.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
    if (!n) throw new Error(`Value "${t}" does not satisfy any of known RGB formats.`);
    return n.slice(1).reduce((r, s) => {
      const i = parseInt(s, 10).toString(16);
      return r + (i.length === 1 ? "0" : "") + i
    }, "#")
  }
  const hi = N("rgb", t => _e(V()(t))),
      bi = N("themeParams", t => {
        const e = hi(!0);
        return Object.entries(ue(t)).reduce((n, [r, s]) => (n[di(r)] = e(s), n), {})
      });

  function Pn(t) {
    return JSON.stringify(Object.fromEntries(Object.entries(t).map(([e, n]) => [bn(e), n])))
  }

  function mi(t) {
    const {
      initDataRaw: e,
      startParam: n,
      showSettings: r,
      botInline: s
    } = t, i = new URLSearchParams;
    return i.set("tgWebAppPlatform", t.platform), i.set("tgWebAppThemeParams", Pn(t.themeParams)), i.set("tgWebAppVersion", t.version), e && i.set("tgWebAppData", e), n && i.set("tgWebAppStartParam", n), typeof r == "boolean" && i.set("tgWebAppShowSettings", r ? "1" : "0"), typeof s == "boolean" && i.set("tgWebAppBotInline", s ? "1" : "0"), i.toString()
  }

  function gi(t, e) {
    return N("array", n => {
      let r;
      if (Array.isArray(n)) r = n;
      else if (typeof n == "string") try {
        const s = JSON.parse(n);
        Array.isArray(s) && (r = s)
      } catch {}
      return r || yt(n), r.map(t)
    })
  }

  function de(t) {
    return !!t && typeof t == "object" && !Array.isArray(t)
  }

  function Ut(...t) {
    return t.map(e => {
      if (typeof e == "string") return e;
      if (de(e)) return Ut(Object.entries(e).map(n => n[1] && n[0]));
      if (Array.isArray(e)) return Ut(...e)
    }).filter(Boolean).join(" ")
  }

  function Ei(...t) {
    return t.reduce((e, n) => (de(n) && Object.entries(n).forEach(([r, s]) => {
      const i = Ut(e[r], s);
      i && (e[r] = i)
    }), e), {})
  }
  let Ct = class li extends Error {
    constructor(e, n, r) {
      super(typeof n == "object" ? n.message : n || e, {
        cause: typeof n == "object" ? n.cause : r
      }), this.type = e, Object.setPrototypeOf(this, li.prototype)
    }
  };

  function vn(t) {
    return t.replace(/[A-Z]/g, e => `_${e.toLowerCase()}`)
  }

  function wi(t) {
    return t.replace(/_[a-z]/g, e => e[1].toUpperCase())
  }
  const Si = "ERR_INVALID_VALUE",
      yi = "ERR_UNEXPECTED_VALUE",
      Ci = "ERR_UNEXPECTED_TYPE",
      An = "ERR_PARSE";

  function Rn(t, e) {
    const n = {};
    for (const r in t) {
      const s = t[r];
      if (!s) continue;
      let i, a;
      typeof s == "function" ? (i = r, a = s) : [i, a] = s;
      try {
        const c = a(e(i));
        c !== void 0 && (n[r] = c)
      } catch (c) {
        throw new Ct(An, `Parser for "${r}" property failed${i===r?"":`. Source field: "${i}"`}`, c)
      }
    }
    return n
  }

  function Tn(t) {
    let e = t;
    if (typeof e == "string") try {
      e = JSON.parse(e)
    } catch (n) {
      throw new Ct(Si, {
        cause: n
      })
    }
    if (typeof e != "object" || !e || Array.isArray(e)) throw new Ct(yi);
    return e
  }

  function $(t, e) {
    return n => {
      const r = s => {
        if (!(n && s === void 0)) try {
          return e(s)
        } catch (i) {
          throw new Ct(An, {
            message: `"${t}" transformer failed to parse the value`,
            cause: i
          })
        }
      };
      return Object.assign(r, {
        isValid(s) {
          try {
            return r(s), !0
          } catch {
            return !1
          }
        }
      })
    }
  }

  function B(t, e) {
    return $(e || "object", n => {
      const r = Tn(n);
      return Rn(t, s => r[s])
    })
  }

  function Pt(t) {
    throw new Ct(Ci, `Unexpected value received: ${JSON.stringify(t)}`)
  }
  const jt = $("boolean", t => {
        if (typeof t == "boolean") return t;
        const e = String(t);
        if (e === "1" || e === "true") return !0;
        if (e === "0" || e === "false") return !1;
        Pt(t)
      }),
      v = $("string", t => {
        if (typeof t == "string" || typeof t == "number") return t.toString();
        Pt(t)
      }),
      vt = $("number", t => {
        if (typeof t == "number") return t;
        if (typeof t == "string") {
          const e = Number(t);
          if (!Number.isNaN(e)) return e
        }
        Pt(t)
      }),
      Pi = $("date", t => t instanceof Date ? t : new Date(vt()(t) * 1e3));

  function $n(t, e) {
    return $(e || "searchParams", n => {
      typeof n != "string" && !(n instanceof URLSearchParams) && Pt(n);
      const r = typeof n == "string" ? new URLSearchParams(n) : n;
      return Rn(t, s => {
        const i = r.get(s);
        return i === null ? void 0 : i
      })
    })
  }

  function fe(t) {
    for (const e in t) t[e] = [vn(e), t[e]];
    return t
  }
  const vi = t => {
    const e = vt(),
        n = vt(!0),
        r = v(),
        s = v(!0),
        i = jt(!0),
        a = B(fe({
          addedToAttachmentMenu: i,
          allowsWriteToPm: i,
          firstName: r,
          id: e,
          isBot: i,
          isPremium: i,
          languageCode: s,
          lastName: s,
          photoUrl: s,
          username: s
        }), "User")(!0);
    return $n(fe({
      authDate: Pi(),
      canSendAfter: n,
      chat: B(fe({
        id: e,
        type: r,
        title: r,
        photoUrl: s,
        username: s
      }), "Chat")(!0),
      chatInstance: s,
      chatType: s,
      hash: r,
      queryId: s,
      receiver: a,
      startParam: s,
      user: a
    }), "initData")(t)
  };

  function Ai(t) {
    return /^#[\da-f]{6}$/i.test(t)
  }

  function Ri(t) {
    return /^#[\da-f]{3}$/i.test(t)
  }

  function Ti(t) {
    const e = t.replace(/\s/g, "").toLowerCase();
    if (Ai(e)) return e;
    if (Ri(e)) {
      let r = "#";
      for (let s = 0; s < 3; s += 1) r += e[1 + s].repeat(2);
      return r
    }
    const n = e.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || e.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
    if (!n) throw new Error(`Value "${t}" does not satisfy any of known RGB formats.`);
    return n.slice(1).reduce((r, s) => {
      const i = parseInt(s, 10).toString(16);
      return r + (i.length === 1 ? "0" : "") + i
    }, "#")
  }
  const $i = $("rgb", t => Ti(v()(t))),
      Bi = $("themeParams", t => {
        const e = $i(!0);
        return Object.entries(Tn(t)).reduce((n, [r, s]) => (n[wi(r)] = e(s), n), {})
      });

  function Bn(t) {
    return JSON.stringify(Object.fromEntries(Object.entries(t).map(([e, n]) => [vn(e), n])))
  }
  const Oi = t => {
    const e = v(),
        n = v(!0),
        r = jt(!0);
    return $n({
      botInline: ["tgWebAppBotInline", r],
      initData: ["tgWebAppData", vi(!0)],
      initDataRaw: ["tgWebAppData", n],
      platform: ["tgWebAppPlatform", e],
      showSettings: ["tgWebAppShowSettings", r],
      startParam: ["tgWebAppStartParam", n],
      themeParams: ["tgWebAppThemeParams", Bi()],
      version: ["tgWebAppVersion", e]
    }, "launchParams")(t)
  };

  function Ii(t) {
    const {
      initDataRaw: e,
      startParam: n,
      showSettings: r,
      botInline: s
    } = t, i = new URLSearchParams;
    return i.set("tgWebAppPlatform", t.platform), i.set("tgWebAppThemeParams", Bn(t.themeParams)), i.set("tgWebAppVersion", t.version), e && i.set("tgWebAppData", e), n && i.set("tgWebAppStartParam", n), typeof r == "boolean" && i.set("tgWebAppShowSettings", r ? "1" : "0"), typeof s == "boolean" && i.set("tgWebAppBotInline", s ? "1" : "0"), i.toString()
  }
  const On = B({
        eventType: v(),
        eventData: t => t
      }, "miniAppsMessage"),
      In = $("fn", t => {
        if (typeof t == "function") return t;
        Pt(t)
      });

  function Di(t) {
    return !!t && typeof t == "object" && !Array.isArray(t)
  }
  const Mi = B({
    TelegramWebviewProxy: B({
      postEvent: In()
    })()
  });

  function Dn(t) {
    return Mi().isValid(t)
  }

  function Mn() {
    try {
      return window.self !== window.top
    } catch {
      return !0
    }
  }
  var ki = Object.defineProperty,
      Ni = (t, e, n) => e in t ? ki(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
      }) : t[e] = n,
      kn = (t, e, n) => Ni(t, typeof e != "symbol" ? e + "" : e, n);
  let _ = class _i extends Error {
    constructor(e, n, r) {
      super(typeof n == "object" ? n.message : n || e, {
        cause: typeof n == "object" ? n.cause : r
      }), this.type = e, Object.setPrototypeOf(this, _i.prototype)
    }
  };

  function Wt(t, e, n) {
    return t.addEventListener(e, n), () => t.removeEventListener(e, n)
  }

  function ot(...t) {
    const e = t.flat(1);
    return [e.push.bind(e), () => {
      e.forEach(n => {
        n()
      })
    }]
  }

  function Vi(t, e) {
    return t instanceof _ && t.type === e
  }

  function pe(t) {
    return e => Vi(e, t)
  }
  const he = "ERR_ABORTED",
      be = "ERR_CANCELED",
      me = "ERR_TIMED_OUT";

  function Nn(t) {
    return new _(he, {
      cause: t
    })
  }
  const Li = pe(me),
      Ui = pe(he),
      ji = pe(be);

  function Vn(t, e) {
    return t.reject = e.reject, t
  }
  class h extends Promise {
    constructor(e, n) {
      let r, s;
      typeof e == "function" ? (r = e, s = n) : s = e;
      let i, a;
      super((c, d) => {
        s || (s = {});
        const {
          abortSignal: l
        } = s;
        if (l && l.aborted) return d(Nn(l.reason));
        const [p, y] = ot(), P = wt => (...xa) => (y(), wt(...xa)), Et = new AbortController, {
          signal: et
        } = Et;
        a = P(wt => {
          Et.abort(wt), d(wt)
        }), i = P(c), l && p(Wt(l, "abort", () => {
          a(Nn(l.reason))
        }));
        const {
          timeout: hn
        } = s;
        if (hn) {
          const wt = setTimeout(() => {
            a(new _(me, `Timeout reached: ${hn}ms`))
          }, hn);
          p(() => {
            clearTimeout(wt)
          })
        }
        r && r(i, a, et)
      }), kn(this, "reject"), this.reject = a
    }
    static withFn(e, n) {
      return new h((r, s, i) => {
        try {
          const a = e(i);
          return a instanceof Promise ? a.then(r, s) : r(a)
        } catch (a) {
          s(a)
        }
      }, n)
    }
    static resolve(e) {
      return new h(n => {
        n(e)
      })
    }
    static reject(e) {
      return new h((n, r) => {
        r(e)
      })
    }
    cancel() {
      this.reject(new _(be))
    } catch (e) {
      return this.then(void 0, e)
    } finally(e) {
      return Vn(super.finally(e), this)
    }
    then(e, n) {
      return Vn(super.then(e, n), this)
    }
  }

  function Ln(t, e) {
    return t.resolve = e.resolve, t
  }
  class At extends h {
    constructor(e, n) {
      let r, s;
      typeof e == "function" ? (r = e, s = n) : s = e;
      let i;
      super((a, c, d) => {
        i = a, r && r(a, c, d)
      }, s), kn(this, "resolve"), this.resolve = i
    }
    static withFn(e, n) {
      return new At((r, s, i) => h.withFn(e, {
        abortSignal: i
      }).then(r, s), n)
    }
    static resolve(e) {
      return new At(n => {
        n(e)
      })
    }
    static reject(e) {
      return new At((n, r) => {
        r(e)
      })
    } catch (e) {
      return this.then(void 0, e)
    } finally(e) {
      return Ln(super.finally(e), this)
    }
    then(e, n) {
      return Ln(super.then(e, n), this)
    }
  }

  function Wi(t, e) {
    return new h(n => {
      setTimeout(n, t)
    }, {
      abortSignal: e
    })
  }

  function Un(t) {
    return `tapps/${t}`
  }

  function A(t, e) {
    sessionStorage.setItem(Un(t), JSON.stringify(e))
  }

  function R(t) {
    const e = sessionStorage.getItem(Un(t));
    try {
      return e ? JSON.parse(e) : void 0
    } catch {}
  }

  function ge(t) {
    return t.replace(/[A-Z]/g, e => `-${e.toLowerCase()}`)
  }

  function qi(t, e) {
    e || (e = {});
    const {
      textColor: n,
      bgColor: r,
      shouldLog: s = !0
    } = e;

    function i(a, ...c) {
      if (!s || typeof s == "function" && !s()) return;
      const d = "font-weight:bold;padding:0 5px;border-radius:5px";
      console[a](`%c${Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3,timeZone:"UTC"}).format(new Date)}%c / %c${t}`, `${d};background-color: lightblue;color:black`, "", `${d};${n?`color:${n};`:""}${r?`background-color:${r}`:""}`, ...c)
    }
    return [function(...a) {
      i("log", ...a)
    }, function(...a) {
      i("error", ...a)
    }]
  }

  function qt(t, e) {
    document.documentElement.style.setProperty(t, e)
  }

  function Ht(t) {
    document.documentElement.style.removeProperty(t)
  }

  function Hi(t, e) {
    e()
  }

  function rt(t, e) {
    e || (e = {});
    const n = e.equals || Object.is;
    let r = [],
        s = t;
    const i = l => {
      if (!n(s, l)) {
        const p = s;
        s = l, Hi(d, () => {
          [...r].forEach(([y, P]) => {
            y(l, p), P && c(y, !0)
          })
        })
      }
    };

    function a(l) {
      const p = typeof l != "object" ? {
        once: l
      } : l;
      return {
        once: p.once || !1,
        signal: p.signal || !1
      }
    }
    const c = (l, p) => {
          const y = a(p),
              P = r.findIndex(([Et, et]) => Et === l && et.once === y.once && et.signal === y.signal);
          P >= 0 && r.splice(P, 1)
        },
        d = Object.assign(function() {
          return Gi(d), s
        }, {
          destroy() {
            r = []
          },
          set: i,
          reset() {
            i(t)
          },
          sub(l, p) {
            return r.push([l, a(p)]), () => c(l, p)
          },
          unsub: c,
          unsubAll() {
            r = r.filter(l => l[1].signal)
          }
        });
    return d
  }
  const Ee = [];

  function Gi(t) {
    Ee.length && Ee[Ee.length - 1].add(t)
  }
  const jn = rt(!1),
      [we, zi] = qi("Bridge", {
        bgColor: "#9147ff",
        textColor: "white",
        shouldLog: jn
      }),
      Yi = {
        clipboard_text_received: B({
          req_id: v(),
          data: t => t === null ? t : v(!0)(t)
        }, "clipboard_text_received"),
        custom_method_invoked: B({
          req_id: v(),
          result: t => t,
          error: v(!0)
        }, "custom_method_invoked"),
        popup_closed: $("popup_closed", t => t ? B({
          button_id: e => e == null ? void 0 : v()(e)
        })()(t) : {}),
        viewport_changed: B({
          height: vt(),
          width: t => t == null ? window.innerWidth : vt()(t),
          is_state_stable: jt(),
          is_expanded: jt()
        }, "viewport_changed")
      };

  function Fi(t) {
    const e = window,
        [, n] = ot(Wt(e, "resize", () => {
          t(["viewport_changed", {
            width: window.innerWidth,
            height: window.innerHeight,
            is_state_stable: !0,
            is_expanded: !0
          }])
        }), Wt(e, "message", r => {
          if (r.source !== e.parent) return;
          let s;
          try {
            s = On()(r.data)
          } catch {
            return
          }
          const {
            eventType: i,
            eventData: a
          } = s, c = Yi[i];
          try {
            const d = c ? c()(a) : a;
            we("Event received:", d ? {
              eventType: i,
              eventData: d
            } : {
              eventType: i
            }), t([i, d])
          } catch (d) {
            zi([`An error occurred processing the "${i}" event from the Telegram application.`, "Please, file an issue here:", "https://github.com/Telegram-Mini-Apps/telegram-apps/issues/new/choose"].join(`
`), s, d)
          }
        }));
    return n
  }
  const Se = rt(),
      Wn = rt();

  function qn() {
    return Wn() || Wn.set(Fi(Se.set)), Se
  }
  const ye = rt({});

  function Hn(t) {
    let e = ye()[t];
    return e || (e = rt(void 0, {
      equals() {
        return !1
      }
    }), qn().sub(n => {
      n && n[0] === t && e.set(n[1])
    }), ye.set({
      ...ye(),
      [t]: e
    })), e
  }

  function S(t, e, n) {
    return Hn(t).sub(e, n)
  }
  const Gn = "ERR_METHOD_UNSUPPORTED",
      zn = "ERR_RETRIEVE_LP_FAILED",
      Yn = "ERR_METHOD_PARAMETER_UNSUPPORTED",
      Fn = "ERR_UNKNOWN_ENV",
      Kn = "ERR_INVOKE_CUSTOM_METHOD_RESPONSE",
      Qn = rt("https://web.telegram.org");

  function Gt(t, e) {
    we("Posting event:", e ? {
      eventType: t,
      eventData: e
    } : {
      eventType: t
    });
    const n = window;
    if (Dn(n)) {
      n.TelegramWebviewProxy.postEvent(t, JSON.stringify(e));
      return
    }
    const r = JSON.stringify({
      eventType: t,
      eventData: e
    });
    if (Mn()) return n.parent.postMessage(r, Qn());
    const {
      external: s
    } = n;
    if (B({
      notify: In()
    })().isValid(s)) {
      s.notify(r);
      return
    }
    throw new _(Fn)
  }

  function zt(t, e, n) {
    n || (n = {});
    const {
      capture: r
    } = n, [s, i] = ot();
    return new h(a => {
      (Array.isArray(e) ? e : [e]).forEach(c => {
        s(S(c, d => {
          (!r || (Array.isArray(e) ? r({
            event: c,
            payload: d
          }) : r(d))) && a(d)
        }))
      }), (n.postEvent || Gt)(t, n.params)
    }, n).finally(i)
  }

  function Ce(t) {
    return Oi()(t)
  }

  function Jn(t) {
    return Ce(t.replace(/^[^?#]*[?#]/, "").replace(/[?#]/g, "&"))
  }

  function Ki() {
    return Jn(window.location.href)
  }

  function Qi() {
    const t = performance.getEntriesByType("navigation")[0];
    if (!t) throw new Error("Unable to get first navigation entry.");
    return Jn(t.name)
  }
  const Ji = "launchParams";

  function Xi() {
    return Ce(R(Ji) || "")
  }

  function Xn(t) {
    A("launchParams", Ii(t))
  }

  function Zn(t) {
    return t instanceof Error ? t.message + (t.cause ? `
  ${Zn(t.cause)}` : "") : JSON.stringify(t)
  }

  function Z() {
    const t = [];
    for (const e of [Ki, Qi, Xi]) try {
      const n = e();
      return Xn(n), n
    } catch (n) {
      t.push(n)
    }
    throw new _(zn, ["Unable to retrieve launch parameters from any known source. Perhaps, you have opened your app outside Telegram?", "📖 Refer to docs for more information:", "https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/environment", "Collected errors:", ...t.map(e => `— ${Zn(e)}`)].join(`
`))
  }

  function Zi(t) {
    if (t === "simple") try {
      return Z(), !0
    } catch {
      return !1
    }
    return h.withFn(async () => {
      if (Dn(window)) return !0;
      try {
        return await zt("web_app_request_theme", "theme_changed", {
          timeout: 100
        }), !0
      } catch {
        return !1
      }
    }, t)
  }

  function Yt(t, e) {
    window.dispatchEvent(new MessageEvent("message", {
      data: JSON.stringify({
        eventType: t,
        eventData: e
      }),
      source: window.parent
    }))
  }

  function xi(t, e) {
    if (typeof e == "string") try {
      const {
        eventType: n
      } = On()(e);
      n === "web_app_request_theme" && Yt("theme_changed", {
        theme_params: JSON.parse(Bn(t))
      }), n === "web_app_request_viewport" && Yt("viewport_changed", {
        width: window.innerWidth,
        height: window.innerHeight,
        is_state_stable: !0,
        is_expanded: !0
      })
    } catch {}
  }

  function ta(t) {
    var e;
    const n = typeof t == "string" ? Ce(t) : t;
    Xn(n);
    const r = (e = window.TelegramWebviewProxy) == null ? void 0 : e.postEvent;
    window.TelegramWebviewProxy = {
      postEvent(s, i) {
        xi(n.themeParams, JSON.stringify({
          eventType: s,
          eventData: i
        })), r == null || r(s, i)
      }
    }, we("Environment was mocked by the mockTelegramEnv function")
  }

  function xn() {
    [
      ["TelegramGameProxy_receiveEvent"],
      ["TelegramGameProxy", "receiveEvent"],
      ["Telegram", "WebView", "receiveEvent"]
    ].forEach(t => {
      let e = window;
      t.forEach((n, r, s) => {
        if (r === s.length - 1) {
          e[n] = Yt;
          return
        }
        n in e || (e[n] = {}), e = e[n]
      })
    })
  }

  function to() {
    ["TelegramGameProxy_receiveEvent", "TelegramGameProxy", "Telegram"].forEach(t => {
      delete window[t]
    })
  }

  function G(t, e, n) {
    Hn(t).unsub(e, n)
  }

  function ea(t, e) {
    return qn().sub(t, e)
  }

  function na(t, e) {
    Se.unsub(t, e)
  }

  function eo(t) {
    return ({
              req_id: e
            }) => e === t
  }

  function no(t) {
    return t.split(".").map(Number)
  }

  function oo(t, e) {
    const n = no(t),
        r = no(e),
        s = Math.max(n.length, r.length);
    for (let i = 0; i < s; i += 1) {
      const a = n[i] || 0,
          c = r[i] || 0;
      if (a !== c) return a > c ? 1 : -1
    }
    return 0
  }

  function m(t, e) {
    return oo(t, e) <= 0
  }

  function L(t, e, n) {
    if (typeof n == "string") {
      if (t === "web_app_open_link") {
        if (e === "try_instant_view") return m("6.4", n);
        if (e === "try_browser") return m("7.6", n)
      }
      if (t === "web_app_set_header_color" && e === "color") return m("6.9", n);
      if (t === "web_app_close" && e === "return_back") return m("7.6", n);
      if (t === "web_app_setup_main_button" && e === "has_shine_effect") return m("7.10", n)
    }
    switch (t) {
      case "web_app_open_tg_link":
      case "web_app_open_invoice":
      case "web_app_setup_back_button":
      case "web_app_set_background_color":
      case "web_app_set_header_color":
      case "web_app_trigger_haptic_feedback":
        return m("6.1", e);
      case "web_app_open_popup":
        return m("6.2", e);
      case "web_app_close_scan_qr_popup":
      case "web_app_open_scan_qr_popup":
      case "web_app_read_text_from_clipboard":
        return m("6.4", e);
      case "web_app_switch_inline_query":
        return m("6.7", e);
      case "web_app_invoke_custom_method":
      case "web_app_request_write_access":
      case "web_app_request_phone":
        return m("6.9", e);
      case "web_app_setup_settings_button":
        return m("6.10", e);
      case "web_app_biometry_get_info":
      case "web_app_biometry_open_settings":
      case "web_app_biometry_request_access":
      case "web_app_biometry_request_auth":
      case "web_app_biometry_update_token":
        return m("7.2", e);
      case "web_app_setup_swipe_behavior":
        return m("7.7", e);
      case "web_app_share_to_story":
        return m("7.8", e);
      case "web_app_setup_secondary_button":
      case "web_app_set_bottom_bar_color":
        return m("7.10", e);
      default:
        return ["iframe_ready", "iframe_will_reload", "web_app_close", "web_app_data_send", "web_app_expand", "web_app_open_link", "web_app_ready", "web_app_request_theme", "web_app_request_viewport", "web_app_setup_main_button", "web_app_setup_closing_behavior"].includes(t)
    }
  }

  function ro(t, e) {
    e || (e = "strict");
    const n = typeof e == "function" ? e : r => {
      const {
        method: s,
        version: i
      } = r;
      let a, c;
      if ("param" in r ? (a = `Parameter "${r.param}" of "${s}" method is unsupported in Mini Apps version ${i}`, c = Yn) : (a = `Method "${s}" is unsupported in Mini Apps version ${i}`, c = Gn), e === "strict") throw new _(c, a);
      return console.warn(a)
    };
    return (r, s) => L(r, t) ? Di(s) && r === "web_app_set_header_color" && "color" in s && !L(r, "color", t) ? n({
      version: t,
      method: r,
      param: "color"
    }) : Gt(r, s) : n({
      version: t,
      method: r
    })
  }

  function so(t, e, n, r) {
    return zt("web_app_invoke_custom_method", "custom_method_invoked", {
      ...r || {},
      params: {
        method: t,
        params: e,
        req_id: n
      },
      capture: eo(n)
    }).then(({
               result: s,
               error: i
             }) => {
      if (i) throw new _(Kn, i);
      return s
    })
  }

  function oa() {
    return performance.getEntriesByType("navigation")[0]
  }

  function O() {
    const t = oa();
    return !!t && t.type === "reload"
  }

  function io(t, e) {
    return t.startsWith(e) ? t : `${e}${t}`
  }

  function ra(t) {
    return new URL(typeof t == "string" ? t : [t.pathname || "", io(t.search || "", "?"), io(t.hash || "", "#")].join(""), "http://a")
  }
  let st;

  function sa(t, e) {
    st && st.set(t, e) || e()
  }

  function ia(t) {
    if (st) return t();
    st = new Map;
    try {
      t()
    } finally {
      st.forEach(e => e()), st = void 0
    }
  }

  function u(t, e) {
    e || (e = {});
    const n = e.equals || Object.is;
    let r = [],
        s = t;
    const i = l => {
      if (!n(s, l)) {
        const p = s;
        s = l, sa(d, () => {
          [...r].forEach(([y, P]) => {
            y(l, p), P && c(y, !0)
          })
        })
      }
    };

    function a(l) {
      const p = typeof l != "object" ? {
        once: l
      } : l;
      return {
        once: p.once || !1,
        signal: p.signal || !1
      }
    }
    const c = (l, p) => {
          const y = a(p),
              P = r.findIndex(([Et, et]) => Et === l && et.once === y.once && et.signal === y.signal);
          P >= 0 && r.splice(P, 1)
        },
        d = Object.assign(function() {
          return aa(d), s
        }, {
          destroy() {
            r = []
          },
          set: i,
          reset() {
            i(t)
          },
          sub(l, p) {
            return r.push([l, a(p)]), () => c(l, p)
          },
          unsub: c,
          unsubAll() {
            r = r.filter(l => l[1].signal)
          }
        });
    return d
  }
  const Rt = [];

  function aa(t) {
    Rt.length && Rt[Rt.length - 1].add(t)
  }

  function b(t, e) {
    let n = new Set;
    const r = u(i(), e);

    function s() {
      r.set(i())
    }

    function i() {
      n.forEach(d => d.unsub(s, {
        signal: !0
      }));
      const a = new Set;
      let c;
      Rt.push(a);
      try {
        c = t()
      } finally {
        Rt.pop()
      }
      return a.forEach(d => {
        d.sub(s, {
          signal: !0
        })
      }), n = a, c
    }
    return Object.assign(function() {
      return r()
    }, {
      destroy: r.destroy,
      sub: r.sub,
      unsub: r.unsub,
      unsubAll: r.unsubAll
    })
  }
  const ao = u((() => {
        let t = 0;
        return () => (t += 1).toString()
      })()),
      Pe = u(Gt),
      z = u("0.0");

  function ca(t) {
    t || (t = {});
    const {
      postEvent: e
    } = t, n = t.version || Z().version;
    z.set(n), Pe.set(typeof e == "function" ? e : ro(n))
  }

  function co() {
    return ao()()
  }

  function Tt(t, e, n) {
    return so(t, e, co(), {
      ...n || {},
      postEvent: f
    })
  }
  const I = (t, e, n) => (n || (n = {}), n.postEvent || (n.postEvent = f), zt(t, e, n)),
      f = (t, e) => Pe()(t, e),
      it = "ERR_POPUP_INVALID_PARAMS",
      ve = "ERR_INVALID_HOSTNAME",
      uo = "ERR_INVALID_SLUG",
      lo = "ERR_DATA_INVALID_SIZE",
      _o = "ERR_ACCESS_DENIED",
      C = "ERR_ALREADY_CALLED",
      Ae = "ERR_NOT_AVAILABLE",
      Re = "ERR_NOT_SUPPORTED",
      fo = "ERR_NOT_MOUNTED";

  function E(t, e) {
    function n() {
      return typeof e == "string" ? L(e, z()) : e()
    }
    return Object.assign((...r) => {
      if (!n()) throw new _(Re);
      return t(...r)
    }, {
      isSupported: n
    })
  }

  function U(t) {
    return e => E(e, t)
  }

  function T(t, e) {
    e(), t.sub(e)
  }

  function D(t) {
    return b(() => L(t, z()))
  }

  function Te(t, e) {
    return (...n) => {
      if (!e()) throw new _(fo);
      return t(...n)
    }
  }

  function Y(t) {
    return e => Te(e, t)
  }
  const po = "web_app_setup_back_button",
      ho = "back_button_pressed",
      bo = "backButton",
      at = u(!1),
      $e = D(po),
      Be = U($e),
      mo = Y(at),
      go = mo(() => {
        F.set(!1)
      }),
      F = u(!1),
      Eo = Be(() => {
        at() || (F.set(O() && R(bo) || !1), T(F, wo), at.set(!0))
      });

  function wo() {
    const t = F();
    f(po, {
      is_visible: t
    }), A(bo, t)
  }
  const So = Be(t => S(ho, t)),
      yo = Be(t => {
        G(ho, t)
      }),
      Co = mo(() => {
        F.set(!0)
      });

  function Po() {
    F.unsub(wo), at.set(!1)
  }
  const ua = Object.freeze(Object.defineProperty({
    __proto__: null,
    hide: go,
    isMounted: at,
    isSupported: $e,
    isVisible: F,
    mount: Eo,
    offClick: yo,
    onClick: So,
    show: Co,
    unmount: Po
  }, Symbol.toStringTag, {
    value: "Module"
  }));

  function vo(t, e, {
    isMounting: n,
    isMounted: r,
    mountError: s,
    isSupported: i
  }) {
    return E(a => {
      if (r()) return h.resolve();
      if (n()) throw new _(C);
      return n.set(!0), h.withFn(c => t({
        abortSignal: c
      }), a).then(c => [!0, c], c => [!1, c]).then(c => {
        ia(() => {
          if (n.set(!1), r.set(!0), c[0]) e(c[1]);
          else {
            const d = c[1];
            throw s.set(d), d
          }
        })
      })
    }, i || (() => !0))
  }
  const M = u(),
      $t = u(!1),
      Bt = u(!1),
      Ft = u(!1),
      Oe = u(!1),
      Ie = u(void 0);

  function De(t) {
    return t.available ? {
      available: !0,
      tokenSaved: t.token_saved,
      deviceId: t.device_id,
      accessRequested: t.access_requested,
      type: t.type,
      accessGranted: t.access_granted
    } : {
      available: !1
    }
  }
  const Ao = "web_app_biometry_get_info",
      Ro = E(t => I(Ao, "biometry_info_received", t).then(De), Ao),
      To = "web_app_biometry_request_auth",
      la = "web_app_biometry_request_access",
      _a = "web_app_biometry_open_settings",
      da = "web_app_biometry_update_token",
      Me = "biometry_info_received",
      $o = "biometry",
      Kt = D(To),
      fa = U(Kt),
      ke = Y(Ft),
      Bo = ke(t => {
        if ($t()) return h.reject(new _(C));
        const e = M();
        return !e || !e.available ? h.reject(new _(Ae)) : ($t.set(!0), t || (t = {}), I(To, "biometry_auth_requested", {
          ...t,
          params: {
            reason: (t.reason || "").trim()
          }
        }).then(n => {
          const {
            token: r
          } = n;
          return typeof r == "string" && M.set({
            ...e,
            token: r
          }), n
        }).finally(() => {
          $t.set(!1)
        }))
      }),
      Oo = fa(() => {
        f(_a)
      }),
      Io = ke(t => Bt() ? h.reject(new _(C)) : (Bt.set(!0), t || (t = {}), I(la, Me, {
        ...t,
        params: {
          reason: t.reason || ""
        }
      }).then(De).then(e => {
        if (!e.available) throw new _(Ae);
        return M.set(e), e.accessGranted
      }).finally(() => {
        Bt.set(!1)
      }))),
      Do = vo(t => {
        const e = O() && R($o);
        return e || Ro(t)
      }, t => {
        S(Me, Mo), T(M, ko), M.set(t)
      }, {
        isMounted: Ft,
        mountError: Ie,
        isMounting: Oe,
        isSupported: Kt
      }),
      Mo = t => {
        M.set(De(t))
      };

  function ko() {
    const t = M();
    t && A($o, t)
  }

  function No() {
    G(Me, Mo), M.unsub(ko)
  }
  const Vo = ke(t => (t || (t = {}), I(da, "biometry_token_updated", {
        ...t,
        params: {
          token: t.token || "",
          reason: t.reason
        }
      }).then(e => e.status))),
      pa = Object.freeze(Object.defineProperty({
        __proto__: null,
        authenticate: Bo,
        isAuthenticating: $t,
        isMounted: Ft,
        isMounting: Oe,
        isRequestingAccess: Bt,
        isSupported: Kt,
        mount: Do,
        mountError: Ie,
        openSettings: Oo,
        requestAccess: Io,
        state: M,
        unmount: No,
        updateToken: Vo
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      Lo = "closingConfirmation",
      ct = u(!1),
      Uo = Y(ct),
      jo = Uo(() => {
        K.set(!1)
      }),
      K = u(!1),
      Wo = Uo(() => {
        K.set(!0)
      });

  function qo() {
    ct() || (K.set(O() && R(Lo) || !1), T(K, Ho), ct.set(!0))
  }

  function Ho() {
    const t = K();
    f("web_app_setup_closing_behavior", {
      need_confirmation: t
    }), A(Lo, t)
  }

  function Go() {
    K.unsub(Ho), ct.set(!1)
  }
  const ha = Object.freeze(Object.defineProperty({
        __proto__: null,
        disableConfirmation: jo,
        enableConfirmation: Wo,
        isConfirmationEnabled: K,
        isMounted: ct,
        mount: qo,
        unmount: Go
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      Ne = D("web_app_invoke_custom_method"),
      Qt = U(Ne),
      zo = Qt((t, e) => {
        const n = Array.isArray(t) ? t : [t];
        return n.length ? Tt("deleteStorageValues", {
          keys: n
        }, e).then() : h.resolve()
      });

  function ba(t, e) {
    const n = Array.isArray(t) ? t : [t];
    return n.length ? Tt("getStorageValues", {
      keys: n
    }, e).then(r => {
      const s = Vt(Object.fromEntries(n.map(i => [i, V()])))()(r);
      return Array.isArray(t) ? s : s[t]
    }) : h.resolve(typeof t == "string" ? "" : {})
  }
  const Yo = Qt(ba),
      Fo = Qt(t => Tt("getStorageKeys", {}, t).then(gi(V())())),
      Ko = Qt((t, e, n) => Tt("saveStorageValue", {
        key: t,
        value: e
      }, n).then()),
      ma = Object.freeze(Object.defineProperty({
        __proto__: null,
        deleteItem: zo,
        getItem: Yo,
        getKeys: Fo,
        isSupported: Ne,
        setItem: Ko
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      Jt = "web_app_trigger_haptic_feedback",
      Ve = D(Jt),
      Le = U(Ve),
      Qo = Le(t => {
        f(Jt, {
          type: "impact",
          impact_style: t
        })
      }),
      Jo = Le(t => {
        f(Jt, {
          type: "notification",
          notification_type: t
        })
      }),
      Xo = Le(() => {
        f(Jt, {
          type: "selection_change"
        })
      }),
      ga = Object.freeze(Object.defineProperty({
        __proto__: null,
        impactOccurred: Qo,
        isSupported: Ve,
        notificationOccurred: Jo,
        selectionChanged: Xo
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      Xt = u(void 0);

  function k(t) {
    return b(() => {
      const e = Xt();
      return e ? e[t] : void 0
    })
  }
  const Ue = k("authDate"),
      je = k("canSendAfter"),
      Zo = b(() => {
        const t = Ue(),
            e = je();
        return e && t ? new Date(t.getTime() + e * 1e3) : void 0
      }),
      xo = k("chat"),
      tr = k("chatType"),
      er = k("chatInstance"),
      nr = k("hash"),
      or = k("queryId"),
      We = u(),
      rr = k("receiver");

  function sr() {
    const t = Z();
    Xt.set(t.initData), We.set(t.initDataRaw)
  }
  const ir = k("startParam"),
      ar = k("user"),
      Ea = Object.freeze(Object.defineProperty({
        __proto__: null,
        authDate: Ue,
        canSendAfter: je,
        canSendAfterDate: Zo,
        chat: xo,
        chatInstance: er,
        chatType: tr,
        hash: nr,
        queryId: or,
        raw: We,
        receiver: rr,
        restore: sr,
        startParam: ir,
        state: Xt,
        user: ar
      }, Symbol.toStringTag, {
        value: "Module"
      }));

  function wa(t) {
    return pi()(t)
  }
  const cr = "web_app_open_invoice",
      Ot = u(!1),
      qe = D(cr);
  async function ur(t, e, n) {
    if (Ot()) throw new _(C);
    let r;
    if (e === "url") {
      const {
        hostname: s,
        pathname: i
      } = new URL(t, window.location.href);
      if (s !== "t.me") throw new _(ve);
      const a = i.match(/^\/(\$|invoice\/)([A-Za-z0-9\-_=]+)$/);
      if (!a) throw new _(uo);
      [, , r] = a
    } else r = t, n = e;
    return Ot.set(!0), I(cr, "invoice_closed", {
      ...n,
      params: {
        slug: r
      },
      capture: s => r === s.slug
    }).then(s => s.status).finally(() => {
      Ot.set(!1)
    })
  }
  const lr = E(ur, qe),
      Sa = Object.freeze(Object.defineProperty({
        __proto__: null,
        _open: ur,
        isOpened: Ot,
        isSupported: qe,
        open: lr
      }, Symbol.toStringTag, {
        value: "Module"
      }));

  function He(t) {
    const e = _e(t);
    return Math.sqrt([.299, .587, .114].reduce((n, r, s) => {
      const i = parseInt(e.slice(1 + s * 2, 1 + (s + 1) * 2), 16);
      return n + i * i * r
    }, 0)) < 120
  }
  const ut = u(!1),
      It = u(!1),
      j = u({});

  function g(t) {
    return b(() => j()[t])
  }
  const _r = g("accentTextColor"),
      Zt = g("bgColor"),
      xt = g("buttonColor"),
      Ge = g("buttonTextColor"),
      ze = g("bottomBarBgColor"),
      dr = g("destructiveTextColor"),
      fr = g("headerBgColor"),
      pr = g("hintColor"),
      hr = b(() => {
        const {
          bgColor: t
        } = j();
        return !t || He(t)
      }),
      br = g("linkColor"),
      Dt = g("secondaryBgColor"),
      mr = g("sectionBgColor"),
      gr = g("sectionHeaderTextColor"),
      Er = g("sectionSeparatorColor"),
      wr = g("subtitleTextColor"),
      Sr = g("textColor");

  function x(t) {
    return b(() => _t()[t])
  }
  const lt = u({
        hasShineEffect: !1,
        isEnabled: !0,
        isLoaderVisible: !1,
        isVisible: !1,
        text: "Continue"
      }),
      _t = b(() => {
        const t = lt();
        return {
          ...t,
          backgroundColor: t.backgroundColor || xt() || "#2481cc",
          textColor: t.textColor || Ge() || "#ffffff"
        }
      }),
      dt = u(!1),
      yr = x("backgroundColor"),
      Cr = x("hasShineEffect"),
      Pr = x("isEnabled"),
      vr = x("isLoaderVisible"),
      Ar = x("isVisible"),
      Rr = x("text"),
      Tr = x("textColor"),
      ya = "web_app_setup_main_button",
      $r = "main_button_pressed",
      Br = "mainButton",
      Ca = Y(dt);

  function Or() {
    if (!dt()) {
      const t = O() && R(Br);
      t && lt.set(t), lt.sub(Mr), T(_t, kr), dt.set(!0)
    }
  }

  function Ir(t) {
    return S($r, t)
  }

  function Dr(t) {
    G($r, t)
  }

  function Mr(t) {
    A(Br, t)
  }

  function kr() {
    const t = _t();
    t.text && f(ya, {
      color: t.backgroundColor,
      has_shine_effect: t.hasShineEffect,
      is_active: t.isEnabled,
      is_progress_visible: t.isLoaderVisible,
      is_visible: t.isVisible,
      text: t.text,
      text_color: t.textColor
    })
  }
  const Nr = Ca(t => {
    lt.set({
      ...lt(),
      ...Object.fromEntries(Object.entries(t).filter(([, e]) => e !== void 0))
    })
  });

  function Vr() {
    lt.unsub(Mr), _t.unsub(kr), dt.set(!1)
  }
  const Pa = Object.freeze(Object.defineProperty({
    __proto__: null,
    backgroundColor: yr,
    hasShineEffect: Cr,
    isEnabled: Pr,
    isLoaderVisible: vr,
    isMounted: dt,
    isVisible: Ar,
    mount: Or,
    offClick: Dr,
    onClick: Ir,
    setParams: Nr,
    state: _t,
    text: Rr,
    textColor: Tr,
    unmount: Vr
  }, Symbol.toStringTag, {
    value: "Module"
  }));

  function Lr(t) {
    return bi()(t)
  }
  const Ur = "themeParams",
      jr = "theme_changed",
      Wr = Te(t => {
        if (It()) throw new _(C);
        t || (t = r => `--tg-theme-${ge(r)}`);

        function e(r) {
          Object.entries(j()).forEach(([s, i]) => {
            i && r(s, i)
          })
        }

        function n() {
          e((r, s) => {
            qt(t(r), s)
          })
        }
        return n(), j.sub(n), It.set(!0), () => {
          e(Ht), j.unsub(n), It.set(!1)
        }
      }, ut);

  function Ye() {
    ut() || (S(jr, qr), j.set(O() && R(Ur) || Z().themeParams), ut.set(!0))
  }
  const qr = t => {
    const e = Lr(t.theme_params);
    j.set(e), A(Ur, e)
  };

  function Hr() {
    G(jr, qr), ut.set(!1)
  }

  function va(t, e) {
    function n(r) {
      const s = e[r];
      return L(s[0], s[1], z())
    }
    return Object.assign((...r) => {
      for (const s in e)
        if (e[s][2](...r) && !n(s)) throw new _(Re, `Parameter "${s}" is not supported`);
      return t(...r)
    }, t, {
      supports: n
    })
  }

  function Gr(t) {
    return b(() => {
      const e = t();
      return nt(e) ? e : e === "bg_color" ? Zt() : Dt()
    })
  }
  const W = u("bg_color"),
      Fe = Gr(W),
      q = u("bottom_bar_bg_color"),
      te = b(() => {
        const t = q();
        return nt(t) ? t : t === "bottom_bar_bg_color" ? ze() || Dt() : t === "secondary_bg_color" ? Dt() : Zt()
      }),
      H = u("bg_color"),
      Ke = Gr(H),
      ft = u(!1),
      Mt = u(!1),
      zr = b(() => {
        const t = Fe();
        return t ? He(t) : !1
      }),
      Qe = b(() => ({
        backgroundColor: W(),
        bottomBarColor: q(),
        headerColor: H()
      })),
      Je = "web_app_set_background_color",
      Xe = "web_app_set_bottom_bar_color",
      ee = "web_app_set_header_color",
      Yr = "miniApp",
      Ze = b(() => [Je, Xe, ee].some(t => L(t, z()))),
      Aa = U(Ze),
      ne = Y(ft),
      Fr = ne(t => {
        if (Mt()) throw new _(C);
        const [e, n] = ot();

        function r(s, i) {
          function a() {
            qt(s, i() || null)
          }
          a(), e(i.sub(a), Ht.bind(null, s))
        }
        return t || (t = s => `--tg-${ge(s)}`), r(t("bgColor"), Fe), r(t("bottomBarColor"), te), r(t("headerColor"), Ke), e(() => {
          Mt.set(!1)
        }), Mt.set(!0), n
      });

  function Kr(t) {
    f("web_app_close", {
      return_back: t
    })
  }
  const Qr = Aa(() => {
    if (!ft()) {
      const t = O() && R(Yr);
      Ye(), W.set(t ? t.backgroundColor : "bg_color"), q.set(t ? t.bottomBarColor : "bottom_bar_bg_color"), H.set(t ? t.headerColor : "bg_color"), tn.isSupported() && T(W, Jr), en.isSupported() && T(q, Xr), nn.isSupported() && T(H, Zr), ft.set(!0)
    }
  });

  function Jr() {
    xe(), f(Je, {
      color: W()
    })
  }

  function Xr() {
    xe(), f(Xe, {
      color: q()
    })
  }

  function Zr() {
    const t = H();
    xe(), f(ee, nt(t) ? {
      color: t
    } : {
      color_key: t
    })
  }

  function xr() {
    f("web_app_ready")
  }

  function xe() {
    A(Yr, Qe())
  }
  const tn = E(ne(t => {
        W.set(t)
      }), Je),
      en = E(ne(t => {
        q.set(t)
      }), Xe),
      nn = va(E(ne(t => {
        H.set(t)
      }), ee), {
        color: [ee, "color", nt]
      });

  function ts() {
    W.unsub(Jr), q.unsub(Xr), H.unsub(Zr), ft.set(!1)
  }
  const Ra = Object.freeze(Object.defineProperty({
    __proto__: null,
    backgroundColor: W,
    backgroundColorRGB: Fe,
    bindCssVars: Fr,
    bottomBarColor: q,
    bottomBarColorRGB: te,
    close: Kr,
    headerColor: H,
    headerColorRGB: Ke,
    isCssVarsBound: Mt,
    isDark: zr,
    isMounted: ft,
    isSupported: Ze,
    mount: Qr,
    ready: xr,
    setBackgroundColor: tn,
    setBottomBarColor: en,
    setHeaderColor: nn,
    state: Qe,
    unmount: ts
  }, Symbol.toStringTag, {
    value: "Module"
  }));

  function Ta(t) {
    const e = t.message.trim(),
        n = (t.title || "").trim(),
        r = t.buttons || [];
    if (n.length > 64) throw new _(it, `Invalid title: ${n}`);
    if (!e || e.length > 256) throw new _(it, `Invalid message: ${e}`);
    if (r.length > 3) throw new _(it, `Invalid buttons count: ${r.length}`);
    return {
      title: n,
      message: e,
      buttons: r.length ? r.map((s, i) => {
        const a = s.id || "";
        if (a.length > 64) throw new _(it, `Button with index ${i} has invalid id: ${a}`);
        if (!s.type || s.type === "default" || s.type === "destructive") {
          const c = s.text.trim();
          if (!c || c.length > 64) throw new _(it, `Button with index ${i} has invalid text: ${c}`);
          return {
            type: s.type,
            text: c,
            id: a
          }
        }
        return {
          type: s.type,
          id: a
        }
      }) : [{
        type: "close",
        id: ""
      }]
    }
  }
  const es = "web_app_open_popup",
      on = D(es),
      kt = u(!1),
      ns = E(async t => {
        if (kt()) throw new _(C);
        kt.set(!0);
        try {
          const {
            button_id: e = null
          } = await I(es, "popup_closed", {
            ...t,
            params: Ta(t)
          });
          return e
        } finally {
          kt.set(!1)
        }
      }, on),
      $a = Object.freeze(Object.defineProperty({
        __proto__: null,
        isOpened: kt,
        isSupported: on,
        open: ns
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      Ba = "web_app_close_scan_qr_popup",
      os = "web_app_open_scan_qr_popup",
      Oa = "scan_qr_popup_closed",
      Ia = "qr_text_received",
      rn = D(os),
      rs = U(rn),
      oe = rs(() => {
        tt.set(!1), f(Ba)
      }),
      tt = u(!1);

  function Da(t) {
    return h.withFn(e => {
      if (tt()) throw new _(C);
      tt.set(!0), t || (t = {});
      const {
        onCaptured: n,
        text: r,
        capture: s
      } = t, [, i] = ot(tt.sub(() => {
        a.resolve()
      }), S(Oa, () => {
        tt.set(!1)
      }), S(Ia, c => {
        n ? n(c.data) : (!s || s(c.data)) && (a.resolve(c.data), oe())
      })), a = new At({
        abortSignal: e
      }).catch(oe).finally(i);
      return (t.postEvent || f)(os, {
        text: r
      }), a
    }, t)
  }
  const ss = rs(Da),
      Ma = Object.freeze(Object.defineProperty({
        __proto__: null,
        close: oe,
        isOpened: tt,
        isSupported: rn,
        open: ss
      }, Symbol.toStringTag, {
        value: "Module"
      }));

  function Q(t) {
    return b(() => ht()[t])
  }
  const pt = u({
        hasShineEffect: !1,
        isEnabled: !0,
        isLoaderVisible: !1,
        isVisible: !1,
        position: "left",
        text: "Cancel"
      }),
      ht = b(() => {
        const t = pt();
        return {
          ...t,
          backgroundColor: t.backgroundColor || te() || "#000000",
          textColor: t.textColor || xt() || "#2481cc"
        }
      }),
      bt = u(!1),
      is = Q("backgroundColor"),
      as = Q("hasShineEffect"),
      cs = Q("isEnabled"),
      us = Q("isLoaderVisible"),
      ls = Q("isVisible"),
      _s = Q("position"),
      ds = Q("text"),
      fs = Q("textColor"),
      ps = "web_app_setup_secondary_button",
      hs = "secondary_button_pressed",
      bs = "secondaryButton",
      sn = D(ps),
      an = U(sn),
      ka = Y(bt),
      ms = an(() => {
        if (!bt()) {
          const t = O() && R(bs);
          t && pt.set(t), pt.sub(ws), T(ht, Ss), bt.set(!0)
        }
      }),
      gs = an(t => S(hs, t)),
      Es = an(t => {
        G(hs, t)
      });

  function ws(t) {
    A(bs, t)
  }

  function Ss() {
    const t = ht();
    t.text && f(ps, {
      color: t.backgroundColor,
      has_shine_effect: t.hasShineEffect,
      is_active: t.isEnabled,
      is_progress_visible: t.isLoaderVisible,
      is_visible: t.isVisible,
      position: t.position,
      text: t.text,
      text_color: t.textColor
    })
  }
  const ys = ka(t => {
    pt.set({
      ...pt(),
      ...Object.fromEntries(Object.entries(t).filter(([, e]) => e !== void 0))
    })
  });

  function Cs() {
    pt.unsub(ws), ht.unsub(Ss), bt.set(!1)
  }
  const Na = Object.freeze(Object.defineProperty({
        __proto__: null,
        backgroundColor: is,
        hasShineEffect: as,
        isEnabled: cs,
        isLoaderVisible: us,
        isMounted: bt,
        isSupported: sn,
        isVisible: ls,
        mount: ms,
        offClick: Es,
        onClick: gs,
        position: _s,
        setParams: ys,
        state: ht,
        text: ds,
        textColor: fs,
        unmount: Cs
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      Ps = "web_app_setup_settings_button",
      vs = "settings_button_pressed",
      As = "settingsButton",
      mt = u(!1),
      cn = D(Ps),
      un = U(cn),
      Rs = Y(mt),
      Ts = Rs(() => {
        J.set(!1)
      }),
      J = u(!1),
      $s = un(() => {
        mt() || (J.set(O() && R(As) || !1), T(J, Bs), mt.set(!0))
      });

  function Bs() {
    const t = J();
    f(Ps, {
      is_visible: t
    }), A(As, t)
  }
  const Os = un(t => S(vs, t)),
      Is = un(t => {
        G(vs, t)
      }),
      Ds = Rs(() => {
        J.set(!0)
      });

  function Ms() {
    J.unsub(Bs), mt.set(!1)
  }
  const Va = Object.freeze(Object.defineProperty({
        __proto__: null,
        hide: Ts,
        isMounted: mt,
        isSupported: cn,
        isVisible: J,
        mount: $s,
        offClick: Is,
        onClick: Os,
        show: Ds,
        unmount: Ms
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      ks = "web_app_setup_swipe_behavior",
      Ns = "swipeBehavior",
      gt = u(!1),
      ln = D(ks),
      La = U(ln),
      Vs = Y(gt),
      Ls = Vs(() => {
        X.set(!1)
      }),
      Us = Vs(() => {
        X.set(!0)
      }),
      X = u(!0),
      js = La(() => {
        gt() || (X.set(O() && R(Ns) || !1), T(X, Ws), gt.set(!0))
      });

  function Ws() {
    const t = X();
    f(ks, {
      allow_vertical_swipe: t
    }), A(Ns, t)
  }

  function qs() {
    X.unsub(Ws), gt.set(!1)
  }
  const Ua = Object.freeze(Object.defineProperty({
        __proto__: null,
        disableVertical: Ls,
        enableVertical: Us,
        isMounted: gt,
        isSupported: ln,
        isVerticalEnabled: X,
        mount: js,
        unmount: qs
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      ja = Object.freeze(Object.defineProperty({
        __proto__: null,
        accentTextColor: _r,
        backgroundColor: Zt,
        bindCssVars: Wr,
        bottomBarBgColor: ze,
        buttonColor: xt,
        buttonTextColor: Ge,
        destructiveTextColor: dr,
        headerBackgroundColor: fr,
        hintColor: pr,
        isCssVarsBound: It,
        isDark: hr,
        isMounted: ut,
        linkColor: br,
        mount: Ye,
        secondaryBackgroundColor: Dt,
        sectionBackgroundColor: mr,
        sectionHeaderTextColor: gr,
        sectionSeparatorColor: Er,
        state: j,
        subtitleTextColor: wr,
        textColor: Sr,
        unmount: Hr
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      w = u({
        height: 0,
        width: 0,
        isExpanded: !1,
        stableHeight: 0
      }),
      re = u(!1),
      Nt = u(!1),
      _n = u(!1),
      dn = u(void 0);

  function se(t) {
    return b(() => w()[t])
  }
  const Hs = se("height"),
      Gs = se("isExpanded"),
      zs = b(() => {
        const t = w();
        return t.height === t.stableHeight
      }),
      Ys = se("stableHeight"),
      Fs = se("width");

  function Wa(t) {
    return I("web_app_request_viewport", "viewport_changed", t).then(e => ({
      height: e.height,
      width: e.width,
      isExpanded: e.is_expanded,
      isStable: e.is_state_stable
    }))
  }
  const Ks = Te(t => {
    if (Nt()) throw new _(C);
    t || (t = r => `--tg-viewport-${ge(r)}`);
    const e = ["height", "width", "stableHeight"];

    function n() {
      e.forEach(r => {
        qt(t(r), `${w()[r]}px`)
      })
    }
    return n(), w.sub(n), Nt.set(!0), () => {
      e.forEach(Ht), w.unsub(n), Nt.set(!1)
    }
  }, re);

  function Qs() {
    f("web_app_expand")
  }

  function Js(t) {
    return {
      isExpanded: t.isExpanded,
      height: fn(t.height),
      width: fn(t.width),
      stableHeight: fn(t.stableHeight)
    }
  }
  const Xs = vo(t => {
        const e = O() && R("viewport");
        if (e) return e;
        if (["macos", "tdesktop", "unigram", "webk", "weba", "web"].includes(Z().platform)) {
          const n = window;
          return {
            isExpanded: !0,
            height: n.innerHeight,
            width: n.innerWidth,
            stableHeight: n.innerHeight
          }
        }
        return t.timeout || (t.timeout = 1e3), Wa(t).then(n => ({
          height: n.height,
          isExpanded: n.isExpanded,
          stableHeight: n.isStable ? n.height : w().stableHeight,
          width: n.width
        }))
      }, t => {
        S("viewport_changed", Zs), T(w, xs), w.set(Js(t))
      }, {
        isMounted: re,
        isMounting: _n,
        mountError: dn
      }),
      Zs = t => {
        w.set(Js({
          height: t.height,
          width: t.width,
          isExpanded: t.is_expanded,
          stableHeight: t.is_state_stable ? t.height : w().stableHeight
        }))
      };

  function xs() {
    A("viewport", w())
  }

  function fn(t) {
    return Math.max(t, 0)
  }

  function ti() {
    G("viewport_changed", Zs), w.unsub(xs)
  }
  const qa = Object.freeze(Object.defineProperty({
        __proto__: null,
        bindCssVars: Ks,
        expand: Qs,
        height: Hs,
        isCssVarsBound: Nt,
        isExpanded: Gs,
        isMounted: re,
        isMounting: _n,
        isStable: zs,
        mount: Xs,
        mountError: dn,
        stableHeight: Ys,
        state: w,
        unmount: ti,
        width: Fs
      }, Symbol.toStringTag, {
        value: "Module"
      })),
      ei = "web_app_open_tg_link";

  function Ha(t, e) {
    e || (e = {}), f("web_app_open_link", {
      url: ra(t).toString(),
      try_browser: e.tryBrowser,
      try_instant_view: e.tryInstantView
    })
  }

  function ni(t) {
    const {
      hostname: e,
      pathname: n,
      search: r
    } = new URL(t, "https://t.me");
    if (e !== "t.me") throw new _(ve);
    if (!L(ei, z())) {
      window.location.href = t;
      return
    }
    f(ei, {
      path_full: n + r
    })
  }

  function Ga(t, e) {
    ni("https://t.me/share/url?" + new URLSearchParams({
      url: t,
      text: e || ""
    }).toString().replace(/\+/g, "%20"))
  }
  const pn = "web_app_request_phone",
      oi = "web_app_request_write_access",
      ie = u(!1),
      ae = u(!1);

  function ri(t) {
    return t || (t = {}), Tt("getRequestedContact", {}, {
      ...t,
      timeout: t.timeout || 5e3
    }).then(yn({
      contact: Vt({
        userId: ["user_id", Lt()],
        phoneNumber: ["phone_number", V()],
        firstName: ["first_name", V()],
        lastName: ["last_name", V(!0)]
      })(),
      authDate: ["auth_date", Sn()],
      hash: V()
    })())
  }
  const za = E(t => new h(async (e, n, r) => {
        const s = {
          postEvent: (t || {}).postEvent,
          abortSignal: r
        };
        try {
          return e(await ri(s))
        } catch {}
        if (await si(s) !== "sent") throw new _(_o);
        let a = 50;
        for (; !r.aborted;) {
          try {
            return e(await ri(s))
          } catch {}
          await Wi(a), a += 50
        }
      }, t), pn),
      si = E(t => {
        if (ie()) throw new _(C);
        return ie.set(!0), I(pn, "phone_requested", t).then(e => e.status).finally(() => {
          ie.set(!1)
        })
      }, pn),
      Ya = E(t => {
        if (ae()) throw new _(C);
        return ae.set(!0), I(oi, "write_access_requested", t).then(e => e.status).finally(() => {
          ae.set(!1)
        })
      }, oi),
      ii = "web_app_read_text_from_clipboard",
      ai = "web_app_switch_inline_query",
      ci = "web_app_share_to_story",
      Fa = E(t => {
        const e = co();
        return I(ii, "clipboard_text_received", {
          ...t,
          params: {
            req_id: e
          },
          capture: eo(e)
        }).then(({
                   data: n = null
                 }) => n)
      }, ii);

  function Ka(t) {
    const {
      size: e
    } = new Blob([t]);
    if (!e || e > 4096) throw new _(lo);
    f("web_app_data_send", {
      data: t
    })
  }
  const Qa = E((t, e) => {
        e || (e = {}), (e.postEvent || f)(ci, {
          text: e.text,
          media_url: t,
          widget_link: e.widgetLink
        })
      }, ci),
      Ja = E((t, e) => {
        f(ai, {
          query: t,
          chat_types: e || []
        })
      }, () => L(ai, z()) && !!Z().botInline);

  function Xa() {
    return typeof window > "u"
  }

  function Za(t) {
    ca(t), xn();
    const [e, n] = ot(S("reload_iframe", () => {
      f("iframe_will_reload"), window.location.reload()
    }), to), {
      acceptCustomStyles: r = !0
    } = t || {};
    if (r) {
      const s = document.createElement("style");
      s.id = "telegram-custom-styles", document.head.appendChild(s), e(S("set_custom_style", i => {
        s.innerHTML = i
      }), () => {
        document.head.removeChild(s)
      })
    }
    return f("iframe_ready", {
      reload_supported: !0
    }), n
  }
  return o.$createRequestId = ao, o.$debug = jn, o.$postEvent = Pe, o.$targetOrigin = Qn, o.$version = z, o.CancelablePromise = h, o.ERR_ABORTED = he, o.ERR_ACCESS_DENIED = _o, o.ERR_ALREADY_CALLED = C, o.ERR_CANCELED = be, o.ERR_CUSTOM_METHOD_ERR_RESPONSE = Kn, o.ERR_DATA_INVALID_SIZE = lo, o.ERR_INVALID_HOSTNAME = ve, o.ERR_INVALID_SLUG = uo, o.ERR_INVALID_VALUE = mn, o.ERR_METHOD_PARAMETER_UNSUPPORTED = Yn, o.ERR_METHOD_UNSUPPORTED = Gn, o.ERR_NOT_AVAILABLE = Ae, o.ERR_NOT_MOUNTED = fo, o.ERR_NOT_SUPPORTED = Re, o.ERR_PARSE = ce, o.ERR_POPUP_INVALID_PARAMS = it, o.ERR_RETRIEVE_LP_FAILED = zn, o.ERR_TIMED_OUT = me, o.ERR_UNEXPECTED_TYPE = En, o.ERR_UNEXPECTED_VALUE = gn, o.ERR_UNKNOWN_ENV = Fn, o.TypedError = _, o.addEventListener = Wt, o.authenticateBiometry = Bo, o.backButton = ua, o.bindMiniAppCssVars = Fr, o.bindThemeParamsCssVars = Wr, o.bindViewportCssVars = Ks, o.biometry = pa, o.biometryMountError = Ie, o.biometryState = M, o.classNames = Ut, o.closeMiniApp = Kr, o.closeQrScanner = oe, o.closingBehavior = ha, o.cloudStorage = ma, o.compareVersions = oo, o.createPostEvent = ro, o.defineEventHandlers = xn, o.deleteCloudStorageItem = zo, o.deleteCssVar = Ht, o.disableClosingConfirmation = jo, o.disableVerticalSwipes = Ls, o.emitMiniAppsEvent = Yt, o.enableClosingConfirmation = Wo, o.enableVerticalSwipes = Us, o.expandViewport = Qs, o.getCloudStorageItem = Yo, o.getCloudStorageKeys = Fo, o.hapticFeedback = ga, o.hapticFeedbackImpactOccurred = Qo, o.hapticFeedbackNotificationOccurred = Jo, o.hapticFeedbackSelectionChanged = Xo, o.hideBackButton = go, o.hideSettingsButton = Ts, o.init = Za, o.initData = Ea, o.initDataAuthDate = Ue, o.initDataCanSendAfter = je, o.initDataCanSendAfterDate = Zo, o.initDataChat = xo, o.initDataChatInstance = er, o.initDataChatType = tr, o.initDataHash = nr, o.initDataQueryId = or, o.initDataRaw = We, o.initDataReceiver = rr, o.initDataStartParam = ir, o.initDataState = Xt, o.initDataUser = ar, o.invoice = Sa, o.invokeCustomMethod = so, o.isAbortError = Ui, o.isAuthenticatingBiometry = $t, o.isBackButtonMounted = at, o.isBackButtonSupported = $e, o.isBackButtonVisible = F, o.isBiometryMounted = Ft, o.isBiometryMounting = Oe, o.isBiometrySupported = Kt, o.isCanceledError = ji, o.isClosingBehaviorMounted = ct, o.isClosingConfirmationEnabled = K, o.isCloudStorageSupported = Ne, o.isColorDark = He, o.isHapticFeedbackSupported = Ve, o.isIframe = Mn, o.isInvoiceOpened = Ot, o.isInvoiceSupported = qe, o.isMainButtonEnabled = Pr, o.isMainButtonLoaderVisible = vr, o.isMainButtonMounted = dt, o.isMainButtonVisible = Ar, o.isMiniAppCssVarsBound = Mt, o.isMiniAppDark = zr, o.isMiniAppMounted = ft, o.isMiniAppSupported = Ze, o.isPopupOpened = kt, o.isPopupSupported = on, o.isQrScannerOpened = tt, o.isQrScannerSupported = rn, o.isRGB = nt, o.isRGBShort = Cn, o.isRecord = de, o.isRequestingBiometryAccess = Bt, o.isRequestingPhoneAccess = ie, o.isRequestingWriteAccess = ae, o.isSSR = Xa, o.isSecondaryButtonEnabled = cs, o.isSecondaryButtonLoaderVisible = us, o.isSecondaryButtonMounted = bt, o.isSecondaryButtonSupported = sn, o.isSecondaryButtonVisible = ls, o.isSettingsButtonMounted = mt, o.isSettingsButtonSupported = cn, o.isSettingsButtonVisible = J, o.isSwipeBehaviorMounted = gt, o.isSwipeBehaviorSupported = ln, o.isTMA = Zi, o.isThemeParamsCssVarsBound = It, o.isThemeParamsDark = hr, o.isThemeParamsMounted = ut, o.isTimeoutError = Li, o.isVerticalSwipesEnabled = X, o.isViewportCssVarsBound = Nt, o.isViewportExpanded = Gs, o.isViewportMounted = re, o.isViewportMounting = _n, o.isViewportStable = zs, o.mainButton = Pa, o.mainButtonBackgroundColor = yr, o.mainButtonHasShineEffect = Cr, o.mainButtonState = _t, o.mainButtonText = Rr, o.mainButtonTextColor = Tr, o.mergeClassNames = Ei, o.miniApp = Ra, o.miniAppBackgroundColor = W, o.miniAppBottomBarColor = q, o.miniAppBottomBarColorRGB = te, o.miniAppHeaderColor = H, o.miniAppHeaderColorRGB = Ke, o.miniAppReady = xr, o.miniAppState = Qe, o.mockTelegramEnv = ta, o.mountBackButton = Eo, o.mountBiometry = Do, o.mountClosingBehavior = qo, o.mountMainButton = Or, o.mountMiniApp = Qr, o.mountSecondaryButton = ms, o.mountSettingsButton = $s, o.mountSwipeBehavior = js, o.mountThemeParams = Ye, o.mountViewport = Xs, o.off = G, o.offBackButtonClick = yo, o.offMainButtonClick = Dr, o.offSecondaryButtonClick = Es, o.offSettingsButtonClick = Is, o.on = S, o.onBackButtonClick = So, o.onMainButtonClick = Ir, o.onSecondaryButtonClick = gs, o.onSettingsButtonClick = Os, o.openBiometrySettings = Oo, o.openInvoice = lr, o.openLink = Ha, o.openPopup = ns, o.openQrScanner = ss, o.openTelegramLink = ni, o.parseInitData = wa, o.parseThemeParams = Lr, o.popup = $a, o.postEvent = Gt, o.qrScanner = Ma, o.readTextFromClipboard = Fa, o.removeEventHandlers = to, o.request = zt, o.requestBiometry = Ro, o.requestBiometryAccess = Io, o.requestContact = za, o.requestPhoneAccess = si, o.requestWriteAccess = Ya, o.restoreInitData = sr, o.retrieveLaunchParams = Z, o.secondaryButton = Na, o.secondaryButtonBackgroundColor = is, o.secondaryButtonHasShineEffect = as, o.secondaryButtonPosition = _s, o.secondaryButtonState = ht, o.secondaryButtonText = ds, o.secondaryButtonTextColor = fs, o.sendData = Ka, o.serializeLaunchParams = mi, o.serializeThemeParams = Pn, o.setCloudStorageItem = Ko, o.setCssVar = qt, o.setMainButtonParams = Nr, o.setMiniAppBackgroundColor = tn, o.setMiniAppBottomBarColor = en, o.setMiniAppHeaderColor = nn, o.setSecondaryButtonParams = ys, o.settingsButton = Va, o.shareStory = Qa, o.shareURL = Ga, o.showBackButton = Co, o.showSettingsButton = Ds, o.subscribe = ea, o.supports = L, o.swipeBehavior = Ua, o.switchInlineQuery = Ja, o.themeParams = ja, o.themeParamsAccentTextColor = _r, o.themeParamsBackgroundColor = Zt, o.themeParamsBottomBarBgColor = ze, o.themeParamsButtonColor = xt, o.themeParamsButtonTextColor = Ge, o.themeParamsDestructiveTextColor = dr, o.themeParamsHeaderBackgroundColor = fr, o.themeParamsHintColor = pr, o.themeParamsLinkColor = br, o.themeParamsSecondaryBackgroundColor = Dt, o.themeParamsSectionBackgroundColor = mr, o.themeParamsSectionHeaderTextColor = gr, o.themeParamsSectionSeparatorColor = Er, o.themeParamsState = j, o.themeParamsSubtitleTextColor = wr, o.themeParamsTextColor = Sr, o.toRGB = _e, o.toRecord = ue, o.unmountBackButton = Po, o.unmountBiometry = No, o.unmountClosingBehavior = Go, o.unmountMainButton = Vr, o.unmountMiniApp = ts, o.unmountSecondaryButton = Cs, o.unmountSettingsButton = Ms, o.unmountSwipeBehavior = qs, o.unmountThemeParams = Hr, o.unmountViewport = ti, o.unsubscribe = na, o.updateBiometryToken = Vo, o.viewport = qa, o.viewportHeight = Hs, o.viewportMountError = dn, o.viewportStableHeight = Ys, o.viewportState = w, o.viewportWidth = Fs, Object.defineProperty(o, Symbol.toStringTag, {
    value: "Module"
  }), o
}({});
//# sourceMappingURL=index.iife.js.map
