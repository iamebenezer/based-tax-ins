(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [163], {
        46124: function(e, t, n) {
            let i = n(92768);
            e.exports = i("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
        },
        92768: function(e) {
            "use strict";
            e.exports = function(e) {
                if (e.length >= 255) throw TypeError("Alphabet too long");
                for (var t = new Uint8Array(256), n = 0; n < t.length; n++) t[n] = 255;
                for (var i = 0; i < e.length; i++) {
                    var r = e.charAt(i),
                        s = r.charCodeAt(0);
                    if (255 !== t[s]) throw TypeError(r + " is ambiguous");
                    t[s] = i
                }
                var a = e.length,
                    o = e.charAt(0),
                    l = Math.log(a) / Math.log(256),
                    c = Math.log(256) / Math.log(a);

                function u(e) {
                    if ("string" != typeof e) throw TypeError("Expected String");
                    if (0 === e.length) return new Uint8Array;
                    for (var n = 0, i = 0, r = 0; e[n] === o;) i++, n++;
                    for (var s = (e.length - n) * l + 1 >>> 0, c = new Uint8Array(s); e[n];) {
                        var u = t[e.charCodeAt(n)];
                        if (255 === u) return;
                        for (var h = 0, d = s - 1;
                            (0 !== u || h < r) && -1 !== d; d--, h++) u += a * c[d] >>> 0, c[d] = u % 256 >>> 0, u = u / 256 >>> 0;
                        if (0 !== u) throw Error("Non-zero carry");
                        r = h, n++
                    }
                    for (var p = s - r; p !== s && 0 === c[p];) p++;
                    for (var g = new Uint8Array(i + (s - p)), f = i; p !== s;) g[f++] = c[p++];
                    return g
                }
                return {
                    encode: function(t) {
                        if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))), !(t instanceof Uint8Array)) throw TypeError("Expected Uint8Array");
                        if (0 === t.length) return "";
                        for (var n = 0, i = 0, r = 0, s = t.length; r !== s && 0 === t[r];) r++, n++;
                        for (var l = (s - r) * c + 1 >>> 0, u = new Uint8Array(l); r !== s;) {
                            for (var h = t[r], d = 0, p = l - 1;
                                (0 !== h || d < i) && -1 !== p; p--, d++) h += 256 * u[p] >>> 0, u[p] = h % a >>> 0, h = h / a >>> 0;
                            if (0 !== h) throw Error("Non-zero carry");
                            i = d, r++
                        }
                        for (var g = l - i; g !== l && 0 === u[g];) g++;
                        for (var f = o.repeat(n); g < l; ++g) f += e.charAt(u[g]);
                        return f
                    },
                    decodeUnsafe: u,
                    decode: function(e) {
                        var t = u(e);
                        if (t) return t;
                        throw Error("Non-base" + a + " character")
                    }
                }
            }
        },
        57818: function(e, t, n) {
            "use strict";
            n.d(t, {
                default: function() {
                    return r.a
                }
            });
            var i = n(50551),
                r = n.n(i)
        },
        40905: function(e, t) {
            "use strict";
            let n;
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                function(e, t) {
                    for (var n in t) Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    })
                }(t, {
                    DOMAttributeNames: function() {
                        return i
                    },
                    default: function() {
                        return a
                    },
                    isEqualNode: function() {
                        return s
                    }
                });
            let i = {
                acceptCharset: "accept-charset",
                className: "class",
                htmlFor: "for",
                httpEquiv: "http-equiv",
                noModule: "noModule"
            };

            function r(e) {
                let {
                    type: t,
                    props: n
                } = e, r = document.createElement(t);
                for (let e in n) {
                    if (!n.hasOwnProperty(e) || "children" === e || "dangerouslySetInnerHTML" === e || void 0 === n[e]) continue;
                    let s = i[e] || e.toLowerCase();
                    "script" === t && ("async" === s || "defer" === s || "noModule" === s) ? r[s] = !!n[e] : r.setAttribute(s, n[e])
                }
                let {
                    children: s,
                    dangerouslySetInnerHTML: a
                } = n;
                return a ? r.innerHTML = a.__html || "" : s && (r.textContent = "string" == typeof s ? s : Array.isArray(s) ? s.join("") : ""), r
            }

            function s(e, t) {
                if (e instanceof HTMLElement && t instanceof HTMLElement) {
                    let n = t.getAttribute("nonce");
                    if (n && !e.getAttribute("nonce")) {
                        let i = t.cloneNode(!0);
                        return i.setAttribute("nonce", ""), i.nonce = n, n === e.nonce && e.isEqualNode(i)
                    }
                }
                return e.isEqualNode(t)
            }

            function a() {
                return {
                    mountedInstances: new Set,
                    updateHead: e => {
                        let t = {};
                        e.forEach(e => {
                            if ("link" === e.type && e.props["data-optimized-fonts"]) {
                                if (document.querySelector('style[data-href="' + e.props["data-href"] + '"]')) return;
                                e.props.href = e.props["data-href"], e.props["data-href"] = void 0
                            }
                            let n = t[e.type] || [];
                            n.push(e), t[e.type] = n
                        });
                        let i = t.title ? t.title[0] : null,
                            r = "";
                        if (i) {
                            let {
                                children: e
                            } = i.props;
                            r = "string" == typeof e ? e : Array.isArray(e) ? e.join("") : ""
                        }
                        r !== document.title && (document.title = r), ["meta", "base", "link", "style", "script"].forEach(e => {
                            n(e, t[e] || [])
                        })
                    }
                }
            }
            n = (e, t) => {
                let n = document.getElementsByTagName("head")[0],
                    i = n.querySelector("meta[name=next-head-count]"),
                    a = Number(i.content),
                    o = [];
                for (let t = 0, n = i.previousElementSibling; t < a; t++, n = (null == n ? void 0 : n.previousElementSibling) || null) {
                    var l;
                    (null == n ? void 0 : null == (l = n.tagName) ? void 0 : l.toLowerCase()) === e && o.push(n)
                }
                let c = t.map(r).filter(e => {
                    for (let t = 0, n = o.length; t < n; t++)
                        if (s(o[t], e)) return o.splice(t, 1), !1;
                    return !0
                });
                o.forEach(e => {
                    var t;
                    return null == (t = e.parentNode) ? void 0 : t.removeChild(e)
                }), c.forEach(e => n.insertBefore(e, i)), i.content = (a - o.length + c.length).toString()
            }, ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
                value: !0
            }), Object.assign(t.default, t), e.exports = t.default)
        },
        49189: function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                function(e, t) {
                    for (var n in t) Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    })
                }(t, {
                    cancelIdleCallback: function() {
                        return i
                    },
                    requestIdleCallback: function() {
                        return n
                    }
                });
            let n = "undefined" != typeof self && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(e) {
                    let t = Date.now();
                    return self.setTimeout(function() {
                        e({
                            didTimeout: !1,
                            timeRemaining: function() {
                                return Math.max(0, 50 - (Date.now() - t))
                            }
                        })
                    }, 1)
                },
                i = "undefined" != typeof self && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(e) {
                    return clearTimeout(e)
                };
            ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
                value: !0
            }), Object.assign(t.default, t), e.exports = t.default)
        },
        84080: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                function(e, t) {
                    for (var n in t) Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: t[n]
                    })
                }(t, {
                    default: function() {
                        return N
                    },
                    handleClientScriptLoad: function() {
                        return y
                    },
                    initScriptLoader: function() {
                        return M
                    }
                });
            let i = n(99920),
                r = n(41452),
                s = n(57437),
                a = i._(n(54887)),
                o = r._(n(2265)),
                l = n(36590),
                c = n(40905),
                u = n(49189),
                h = new Map,
                d = new Set,
                p = ["onLoad", "onReady", "dangerouslySetInnerHTML", "children", "onError", "strategy", "stylesheets"],
                g = e => {
                    if (a.default.preinit) {
                        e.forEach(e => {
                            a.default.preinit(e, {
                                as: "style"
                            })
                        });
                        return
                    }
                    if ("undefined" != typeof window) {
                        let t = document.head;
                        e.forEach(e => {
                            let n = document.createElement("link");
                            n.type = "text/css", n.rel = "stylesheet", n.href = e, t.appendChild(n)
                        })
                    }
                },
                f = e => {
                    let {
                        src: t,
                        id: n,
                        onLoad: i = () => {},
                        onReady: r = null,
                        dangerouslySetInnerHTML: s,
                        children: a = "",
                        strategy: o = "afterInteractive",
                        onError: l,
                        stylesheets: u
                    } = e, f = n || t;
                    if (f && d.has(f)) return;
                    if (h.has(t)) {
                        d.add(f), h.get(t).then(i, l);
                        return
                    }
                    let y = () => {
                            r && r(), d.add(f)
                        },
                        M = document.createElement("script"),
                        m = new Promise((e, t) => {
                            M.addEventListener("load", function(t) {
                                e(), i && i.call(this, t), y()
                            }), M.addEventListener("error", function(e) {
                                t(e)
                            })
                        }).catch(function(e) {
                            l && l(e)
                        });
                    for (let [n, i] of (s ? (M.innerHTML = s.__html || "", y()) : a ? (M.textContent = "string" == typeof a ? a : Array.isArray(a) ? a.join("") : "", y()) : t && (M.src = t, h.set(t, m)), Object.entries(e))) {
                        if (void 0 === i || p.includes(n)) continue;
                        let e = c.DOMAttributeNames[n] || n.toLowerCase();
                        M.setAttribute(e, i)
                    }
                    "worker" === o && M.setAttribute("type", "text/partytown"), M.setAttribute("data-nscript", o), u && g(u), document.body.appendChild(M)
                };

            function y(e) {
                let {
                    strategy: t = "afterInteractive"
                } = e;
                "lazyOnload" === t ? window.addEventListener("load", () => {
                    (0, u.requestIdleCallback)(() => f(e))
                }) : f(e)
            }

            function M(e) {
                e.forEach(y), [...document.querySelectorAll('[data-nscript="beforeInteractive"]'), ...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e => {
                    let t = e.id || e.getAttribute("src");
                    d.add(t)
                })
            }

            function m(e) {
                let {
                    id: t,
                    src: n = "",
                    onLoad: i = () => {},
                    onReady: r = null,
                    strategy: c = "afterInteractive",
                    onError: h,
                    stylesheets: p,
                    ...g
                } = e, {
                    updateScripts: y,
                    scripts: M,
                    getIsSsr: m,
                    appDir: N,
                    nonce: w
                } = (0, o.useContext)(l.HeadManagerContext), T = (0, o.useRef)(!1);
                (0, o.useEffect)(() => {
                    let e = t || n;
                    T.current || (r && e && d.has(e) && r(), T.current = !0)
                }, [r, t, n]);
                let j = (0, o.useRef)(!1);
                if ((0, o.useEffect)(() => {
                        !j.current && ("afterInteractive" === c ? f(e) : "lazyOnload" === c && ("complete" === document.readyState ? (0, u.requestIdleCallback)(() => f(e)) : window.addEventListener("load", () => {
                            (0, u.requestIdleCallback)(() => f(e))
                        })), j.current = !0)
                    }, [e, c]), ("beforeInteractive" === c || "worker" === c) && (y ? (M[c] = (M[c] || []).concat([{
                        id: t,
                        src: n,
                        onLoad: i,
                        onReady: r,
                        onError: h,
                        ...g
                    }]), y(M)) : m && m() ? d.add(t || n) : m && !m() && f(e)), N) {
                    if (p && p.forEach(e => {
                            a.default.preinit(e, {
                                as: "style"
                            })
                        }), "beforeInteractive" === c) return n ? (a.default.preload(n, g.integrity ? {
                        as: "script",
                        integrity: g.integrity,
                        nonce: w
                    } : {
                        as: "script",
                        nonce: w
                    }), (0, s.jsx)("script", {
                        nonce: w,
                        dangerouslySetInnerHTML: {
                            __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([n, { ...g,
                                id: t
                            }]) + ")"
                        }
                    })) : (g.dangerouslySetInnerHTML && (g.children = g.dangerouslySetInnerHTML.__html, delete g.dangerouslySetInnerHTML), (0, s.jsx)("script", {
                        nonce: w,
                        dangerouslySetInnerHTML: {
                            __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([0, { ...g,
                                id: t
                            }]) + ")"
                        }
                    }));
                    "afterInteractive" === c && n && a.default.preload(n, g.integrity ? {
                        as: "script",
                        integrity: g.integrity,
                        nonce: w
                    } : {
                        as: "script",
                        nonce: w
                    })
                }
                return null
            }
            Object.defineProperty(m, "__nextScript", {
                value: !0
            });
            let N = m;
            ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
                value: !0
            }), Object.assign(t.default, t), e.exports = t.default)
        },
        50551: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return s
                }
            });
            let i = n(99920);
            n(57437), n(2265);
            let r = i._(n(40148));

            function s(e, t) {
                var n;
                let i = {
                    loading: e => {
                        let {
                            error: t,
                            isLoading: n,
                            pastDelay: i
                        } = e;
                        return null
                    }
                };
                "function" == typeof e && (i.loader = e);
                let s = { ...i,
                    ...t
                };
                return (0, r.default)({ ...s,
                    modules: null == (n = s.loadableGenerated) ? void 0 : n.modules
                })
            }("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
                value: !0
            }), Object.assign(t.default, t), e.exports = t.default)
        },
        10912: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "BailoutToCSR", {
                enumerable: !0,
                get: function() {
                    return r
                }
            });
            let i = n(55592);

            function r(e) {
                let {
                    reason: t,
                    children: n
                } = e;
                if ("undefined" == typeof window) throw new i.BailoutToCSRError(t);
                return n
            }
        },
        40148: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return c
                }
            });
            let i = n(57437),
                r = n(2265),
                s = n(10912),
                a = n(61481);

            function o(e) {
                return {
                    default: e && "default" in e ? e.default : e
                }
            }
            let l = {
                    loader: () => Promise.resolve(o(() => null)),
                    loading: null,
                    ssr: !0
                },
                c = function(e) {
                    let t = { ...l,
                            ...e
                        },
                        n = (0, r.lazy)(() => t.loader().then(o)),
                        c = t.loading;

                    function u(e) {
                        let o = c ? (0, i.jsx)(c, {
                                isLoading: !0,
                                pastDelay: !0,
                                error: null
                            }) : null,
                            l = t.ssr ? (0, i.jsxs)(i.Fragment, {
                                children: ["undefined" == typeof window ? (0, i.jsx)(a.PreloadCss, {
                                    moduleIds: t.modules
                                }) : null, (0, i.jsx)(n, { ...e
                                })]
                            }) : (0, i.jsx)(s.BailoutToCSR, {
                                reason: "next/dynamic",
                                children: (0, i.jsx)(n, { ...e
                                })
                            });
                        return (0, i.jsx)(r.Suspense, {
                            fallback: o,
                            children: l
                        })
                    }
                    return u.displayName = "LoadableComponent", u
                }
        },
        61481: function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "PreloadCss", {
                enumerable: !0,
                get: function() {
                    return s
                }
            });
            let i = n(57437),
                r = n(58512);

            function s(e) {
                let {
                    moduleIds: t
                } = e;
                if ("undefined" != typeof window) return null;
                let n = (0, r.getExpectedRequestStore)("next/dynamic css"),
                    s = [];
                if (n.reactLoadableManifest && t) {
                    let e = n.reactLoadableManifest;
                    for (let n of t) {
                        if (!e[n]) continue;
                        let t = e[n].files.filter(e => e.endsWith(".css"));
                        s.push(...t)
                    }
                }
                return 0 === s.length ? null : (0, i.jsx)(i.Fragment, {
                    children: s.map(e => (0, i.jsx)("link", {
                        precedence: "dynamic",
                        rel: "stylesheet",
                        href: n.assetPrefix + "/_next/" + encodeURI(e),
                        as: "style"
                    }, e))
                })
            }
        },
        50277: function(e, t, n) {
            "use strict";
            n.d(t, {
                H: function() {
                    return c
                },
                i1: function() {
                    return r
                },
                mI: function() {
                    return o
                },
                su: function() {
                    return l
                }
            });
            var i, r, s = n(37836),
                a = n(59860);
            (i = r || (r = {})).Installed = "Installed", i.NotDetected = "NotDetected", i.Loadable = "Loadable", i.Unsupported = "Unsupported";
            class o extends s {
                get connected() {
                    return !!this.publicKey
                }
                async autoConnect() {
                    await this.connect()
                }
                async prepareTransaction(e, t, n = {}) {
                    let i = this.publicKey;
                    if (!i) throw new a.oS;
                    return e.feePayer = e.feePayer || i, e.recentBlockhash = e.recentBlockhash || (await t.getLatestBlockhash({
                        commitment: n.preflightCommitment,
                        minContextSlot: n.minContextSlot
                    })).blockhash, e
                }
            }

            function l(e) {
                if ("undefined" == typeof window || "undefined" == typeof document) return;
                let t = [];

                function n() {
                    if (e())
                        for (let e of t) e()
                }
                let i = setInterval(n, 1e3);
                t.push(() => clearInterval(i)), "loading" === document.readyState && (document.addEventListener("DOMContentLoaded", n, {
                    once: !0
                }), t.push(() => document.removeEventListener("DOMContentLoaded", n))), "complete" !== document.readyState && (window.addEventListener("load", n, {
                    once: !0
                }), t.push(() => window.removeEventListener("load", n))), n()
            }

            function c() {
                if (!navigator) return !1;
                let e = navigator.userAgent.toLowerCase(),
                    t = e.includes("iphone") || e.includes("ipad"),
                    n = e.includes("safari");
                return t && n
            }
        },
        59860: function(e, t, n) {
            "use strict";
            n.d(t, {
                $w: function() {
                    return o
                },
                IW: function() {
                    return p
                },
                Nx: function() {
                    return h
                },
                OZ: function() {
                    return r
                },
                PY: function() {
                    return g
                },
                UG: function() {
                    return c
                },
                W8: function() {
                    return s
                },
                at: function() {
                    return l
                },
                bD: function() {
                    return y
                },
                cO: function() {
                    return u
                },
                fk: function() {
                    return f
                },
                lj: function() {
                    return i
                },
                oS: function() {
                    return d
                },
                p6: function() {
                    return a
                }
            });
            class i extends Error {
                constructor(e, t) {
                    super(e), this.error = t
                }
            }
            class r extends i {
                constructor() {
                    super(...arguments), this.name = "WalletNotReadyError"
                }
            }
            class s extends i {
                constructor() {
                    super(...arguments), this.name = "WalletLoadError"
                }
            }
            class a extends i {
                constructor() {
                    super(...arguments), this.name = "WalletConfigError"
                }
            }
            class o extends i {
                constructor() {
                    super(...arguments), this.name = "WalletConnectionError"
                }
            }
            class l extends i {
                constructor() {
                    super(...arguments), this.name = "WalletDisconnectedError"
                }
            }
            class c extends i {
                constructor() {
                    super(...arguments), this.name = "WalletDisconnectionError"
                }
            }
            class u extends i {
                constructor() {
                    super(...arguments), this.name = "WalletAccountError"
                }
            }
            class h extends i {
                constructor() {
                    super(...arguments), this.name = "WalletPublicKeyError"
                }
            }
            class d extends i {
                constructor() {
                    super(...arguments), this.name = "WalletNotConnectedError"
                }
            }
            class p extends i {
                constructor() {
                    super(...arguments), this.name = "WalletSendTransactionError"
                }
            }
            class g extends i {
                constructor() {
                    super(...arguments), this.name = "WalletSignTransactionError"
                }
            }
            class f extends i {
                constructor() {
                    super(...arguments), this.name = "WalletSignMessageError"
                }
            }
            class y extends i {
                constructor() {
                    super(...arguments), this.name = "WalletSignInError"
                }
            }
        },
        74750: function(e, t, n) {
            "use strict";
            n.d(t, {
                eC: function() {
                    return o
                },
                qz: function() {
                    return l
                },
                sz: function() {
                    return a
                }
            });
            var i = n(50277),
                r = n(59860),
                s = n(19931);
            class a extends i.mI {
                async sendTransaction(e, t, n = {}) {
                    let i = !0;
                    try {
                        if ((0, s.W)(e)) {
                            if (!this.supportedTransactionVersions) throw new r.IW("Sending versioned transactions isn't supported by this wallet");
                            if (!this.supportedTransactionVersions.has(e.version)) throw new r.IW(`Sending transaction version ${e.version} isn't supported by this wallet`);
                            try {
                                let i = (e = await this.signTransaction(e)).serialize();
                                return await t.sendRawTransaction(i, n)
                            } catch (e) {
                                if (e instanceof r.PY) throw i = !1, e;
                                throw new r.IW(e ? .message, e)
                            }
                        } else try {
                            let {
                                signers: i,
                                ...r
                            } = n;
                            e = await this.prepareTransaction(e, t, r), i ? .length && e.partialSign(...i);
                            let s = (e = await this.signTransaction(e)).serialize();
                            return await t.sendRawTransaction(s, r)
                        } catch (e) {
                            if (e instanceof r.PY) throw i = !1, e;
                            throw new r.IW(e ? .message, e)
                        }
                    } catch (e) {
                        throw i && this.emit("error", e), e
                    }
                }
                async signAllTransactions(e) {
                    for (let t of e)
                        if ((0, s.W)(t)) {
                            if (!this.supportedTransactionVersions) throw new r.PY("Signing versioned transactions isn't supported by this wallet");
                            if (!this.supportedTransactionVersions.has(t.version)) throw new r.PY(`Signing transaction version ${t.version} isn't supported by this wallet`)
                        }
                    let t = [];
                    for (let n of e) t.push(await this.signTransaction(n));
                    return t
                }
            }
            class o extends a {}
            class l extends o {}
        },
        19931: function(e, t, n) {
            "use strict";

            function i(e) {
                return "version" in e
            }
            n.d(t, {
                W: function() {
                    return i
                }
            })
        },
        50836: function(e, t, n) {
            "use strict";
            n.d(t, {
                P: function() {
                    return o
                }
            });
            var i = n(74750),
                r = n(50277),
                s = n(59860),
                a = n(45429);
            class o extends i.sz {
                constructor(e = {}) {
                    super(), this.name = "MathWallet", this.url = "https://mathwallet.org", this.icon = "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHdpZHRoPSIxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJtMCAwaDEyOHYxMjhoLTEyOHoiIG9wYWNpdHk9IjAiLz48cGF0aCBkPSJtOTAuODQ3MDA4NiA1Ny43NjEwMDIzYy0yLjI3NzAzNjMtMi4yNzcwMzYzLTIuMjc3MDM2My01Ljk2ODg0MTYgMC04LjI0NTg3NzggMi4yNzcwMzYyLTIuMjc3MDM2MyA1Ljk2ODg0MTUtMi4yNzcwMzYzIDguMjQ1ODc3OCAwIDIuMjc3MDM2NiAyLjI3NzAzNjIgMi4yNzcwMzY2IDUuOTY4ODQxNSAwIDguMjQ1ODc3OC0yLjI3NzAzNjMgMi4yNzcwMzYyLTUuOTY4ODQxNiAyLjI3NzAzNjItOC4yNDU4Nzc4IDB6bS0xOS41ODM5NTk4IDE5LjU4Mzk1OTdjLTEuNzA3Nzc3Mi0xLjcwNzc3NzItMS43MDc3NzcyLTQuNDc2NjMxMSAwLTYuMTg0NDA4M3M0LjQ3NjYzMTEtMS43MDc3NzcyIDYuMTg0NDA4MyAwIDEuNzA3Nzc3MiA0LjQ3NjYzMTEgMCA2LjE4NDQwODMtNC40NzY2MzExIDEuNzA3Nzc3Mi02LjE4NDQwODMgMHptMzAuOTIyMDQyMi0xMC4zMDczNDcyYy0xLjcwNzc3OC0xLjcwNzc3NzItMS43MDc3NzgtNC40NzY2MzEyIDAtNi4xODQ0MDg0IDEuNzA3Nzc3LTEuNzA3Nzc3MiA0LjQ3NjYzMS0xLjcwNzc3NzIgNi4xODQ0MDggMHMxLjcwNzc3NyA0LjQ3NjYzMTIgMCA2LjE4NDQwODQtNC40NzY2MzEgMS43MDc3NzcyLTYuMTg0NDA4IDB6bS0xMC4zMDczNDc3IDEwLjMwNzM0NzJjLTEuNzA3Nzc3Mi0xLjcwNzc3NzItMS43MDc3NzcyLTQuNDc2NjMxMSAwLTYuMTg0NDA4M3M0LjQ3NjYzMTEtMS43MDc3NzcyIDYuMTg0NDA4MyAwIDEuNzA3Nzc3MiA0LjQ3NjYzMTEgMCA2LjE4NDQwODMtNC40NzY2MzExIDEuNzA3Nzc3Mi02LjE4NDQwODMgMHptMjEuNjQ1NDI4Ny0xLjAzMDczNDdjLTEuMTM4NTE4LTEuMTM4NTE4MS0xLjEzODUxOC0yLjk4NDQyMDggMC00LjEyMjkzODkgMS4xMzg1MTktMS4xMzg1MTgxIDIuOTg0NDIxLTEuMTM4NTE4MSA0LjEyMjkzOSAwIDEuMTM4NTE5IDEuMTM4NTE4MSAxLjEzODUxOSAyLjk4NDQyMDggMCA0LjEyMjkzODktMS4xMzg1MTggMS4xMzg1MTgxLTIuOTg0NDIgMS4xMzg1MTgxLTQuMTIyOTM5IDB6bS0xMC4zMDczNDcgMTAuMzA3MzQ3MmMtMS4xMzg1MTgtMS4xMzg1MTgxLTEuMTM4NTE4LTIuOTg0NDIwNyAwLTQuMTIyOTM4OSAxLjEzODUxOC0xLjEzODUxODEgMi45ODQ0MjEtMS4xMzg1MTgxIDQuMTIyOTM5IDAgMS4xMzg1MTggMS4xMzg1MTgyIDEuMTM4NTE4IDIuOTg0NDIwOCAwIDQuMTIyOTM4OS0xLjEzODUxOCAxLjEzODUxODItMi45ODQ0MjEgMS4xMzg1MTgyLTQuMTIyOTM5IDB6bS0yMi42NzYxNjM3LTE4LjU1MzIyNWMtMi4yNzcwMzYzLTIuMjc3MDM2My0yLjI3NzAzNjMtNS45Njg4NDE1IDAtOC4yNDU4Nzc4czUuOTY4ODQxNS0yLjI3NzAzNjMgOC4yNDU4Nzc4IDAgMi4yNzcwMzYzIDUuOTY4ODQxNSAwIDguMjQ1ODc3OC01Ljk2ODg0MTUgMi4yNzcwMzYzLTguMjQ1ODc3OCAwem0wLTIwLjYxNDY5NDVjLTIuMjc3MDM2My0yLjI3NzAzNjMtMi4yNzcwMzYzLTUuOTY4ODQxNSAwLTguMjQ1ODc3OHM1Ljk2ODg0MTUtMi4yNzcwMzYzIDguMjQ1ODc3OCAwIDIuMjc3MDM2MyA1Ljk2ODg0MTUgMCA4LjI0NTg3NzgtNS45Njg4NDE1IDIuMjc3MDM2My04LjI0NTg3NzggMHptLTEwLjMwNzM0NzIgMTAuMzA3MzQ3M2MtMi4yNzcwMzYzLTIuMjc3MDM2My0yLjI3NzAzNjMtNS45Njg4NDE2IDAtOC4yNDU4Nzc4IDIuMjc3MDM2Mi0yLjI3NzAzNjMgNS45Njg4NDE1LTIuMjc3MDM2MyA4LjI0NTg3NzggMCAyLjI3NzAzNjIgMi4yNzcwMzYyIDIuMjc3MDM2MiA1Ljk2ODg0MTUgMCA4LjI0NTg3NzgtMi4yNzcwMzYzIDIuMjc3MDM2Mi01Ljk2ODg0MTYgMi4yNzcwMzYyLTguMjQ1ODc3OCAwem0tMjAuNzEwNTA2IDBjLTIuMjc3MDM2Mi0yLjI3NzAzNjMtMi4yNzcwMzYyLTUuOTY4ODQxNiAwLTguMjQ1ODc3OCAyLjI3NzAzNjMtMi4yNzcwMzYzIDUuOTY4ODQxNi0yLjI3NzAzNjMgOC4yNDU4Nzc4IDAgMi4yNzcwMzYzIDIuMjc3MDM2MiAyLjI3NzAzNjMgNS45Njg4NDE1IDAgOC4yNDU4Nzc4LTIuMjc3MDM2MiAyLjI3NzAzNjItNS45Njg4NDE1IDIuMjc3MDM2Mi04LjI0NTg3NzggMHptLTE5LjU4Mzk1OTcgMTkuNTgzOTU5N2MtMS43MDc3NzcyLTEuNzA3Nzc3Mi0xLjcwNzc3NzItNC40NzY2MzExIDAtNi4xODQ0MDgzczQuNDc2NjMxMS0xLjcwNzc3NzIgNi4xODQ0MDgzIDAgMS43MDc3NzcyIDQuNDc2NjMxMSAwIDYuMTg0NDA4My00LjQ3NjYzMTEgMS43MDc3NzcyLTYuMTg0NDA4MyAwem0zMC45MjIwNDE3LTEwLjMwNzM0NzJjLTEuNzA3Nzc3Mi0xLjcwNzc3NzItMS43MDc3NzcyLTQuNDc2NjMxMiAwLTYuMTg0NDA4NHM0LjQ3NjYzMTItMS43MDc3NzcyIDYuMTg0NDA4NCAwIDEuNzA3Nzc3MiA0LjQ3NjYzMTIgMCA2LjE4NDQwODQtNC40NzY2MzEyIDEuNzA3Nzc3Mi02LjE4NDQwODQgMHptLTEwLjMwNzM0NzIgMTAuMzA3MzQ3MmMtMS43MDc3NzcyLTEuNzA3Nzc3Mi0xLjcwNzc3NzItNC40NzY2MzExIDAtNi4xODQ0MDgzczQuNDc2NjMxMS0xLjcwNzc3NzIgNi4xODQ0MDgzIDAgMS43MDc3NzcyIDQuNDc2NjMxMSAwIDYuMTg0NDA4My00LjQ3NjYzMTEgMS43MDc3NzcyLTYuMTg0NDA4MyAwem0tNDAuMTk4NjU0My0xLjAzMDczNDdjLTEuMTM4NTE4MTMtMS4xMzg1MTgxLTEuMTM4NTE4MTMtMi45ODQ0MjA4IDAtNC4xMjI5Mzg5IDEuMTM4NTE4MS0xLjEzODUxODEgMi45ODQ0MjA4LTEuMTM4NTE4MSA0LjEyMjkzODkgMHMxLjEzODUxODEgMi45ODQ0MjA4IDAgNC4xMjI5Mzg5LTIuOTg0NDIwOCAxLjEzODUxODEtNC4xMjI5Mzg5IDB6bTEwLjMwNzM0NzMgMTAuMzA3MzQ3MmMtMS4xMzg1MTgyLTEuMTM4NTE4MS0xLjEzODUxODItMi45ODQ0MjA3IDAtNC4xMjI5Mzg5IDEuMTM4NTE4MS0xLjEzODUxODEgMi45ODQ0MjA3LTEuMTM4NTE4MSA0LjEyMjkzODggMCAxLjEzODUxODIgMS4xMzg1MTgyIDEuMTM4NTE4MiAyLjk4NDQyMDggMCA0LjEyMjkzODktMS4xMzg1MTgxIDEuMTM4NTE4Mi0yLjk4NDQyMDcgMS4xMzg1MTgyLTQuMTIyOTM4OCAwem00MS4yMjkzODg5IDBjLTEuMTM4NTE4MS0xLjEzODUxODEtMS4xMzg1MTgxLTIuOTg0NDIwNyAwLTQuMTIyOTM4OSAxLjEzODUxODItMS4xMzg1MTgxIDIuOTg0NDIwOC0xLjEzODUxODEgNC4xMjI5Mzg5IDAgMS4xMzg1MTgyIDEuMTM4NTE4MiAxLjEzODUxODIgMi45ODQ0MjA4IDAgNC4xMjI5Mzg5LTEuMTM4NTE4MSAxLjEzODUxODItMi45ODQ0MjA3IDEuMTM4NTE4Mi00LjEyMjkzODkgMHptLTQyLjI2MDEyMzctMTkuNTgzOTU5N2MtMS43MDc3NzcyLTEuNzA3Nzc3Mi0xLjcwNzc3NzItNC40NzY2MzEyIDAtNi4xODQ0MDg0czQuNDc2NjMxMi0xLjcwNzc3NzIgNi4xODQ0MDg0IDAgMS43MDc3NzcyIDQuNDc2NjMxMiAwIDYuMTg0NDA4NC00LjQ3NjYzMTIgMS43MDc3NzcyLTYuMTg0NDA4NCAwem0xOS41ODM5NTk4IDEuMDMwNzM0N2MtMi4yNzcwMzYzLTIuMjc3MDM2My0yLjI3NzAzNjMtNS45Njg4NDE1IDAtOC4yNDU4Nzc4czUuOTY4ODQxNS0yLjI3NzAzNjMgOC4yNDU4Nzc4IDAgMi4yNzcwMzYzIDUuOTY4ODQxNSAwIDguMjQ1ODc3OC01Ljk2ODg0MTUgMi4yNzcwMzYzLTguMjQ1ODc3OCAwem0wLTIwLjYxNDY5NDVjLTIuMjc3MDM2My0yLjI3NzAzNjMtMi4yNzcwMzYzLTUuOTY4ODQxNSAwLTguMjQ1ODc3OHM1Ljk2ODg0MTUtMi4yNzcwMzYzIDguMjQ1ODc3OCAwIDIuMjc3MDM2MyA1Ljk2ODg0MTUgMCA4LjI0NTg3NzgtNS45Njg4NDE1IDIuMjc3MDM2My04LjI0NTg3NzggMHptLTEwLjMwNzM0NzMgMTAuMzA3MzQ3M2MtMi4yNzcwMzYyLTIuMjc3MDM2My0yLjI3NzAzNjItNS45Njg4NDE2IDAtOC4yNDU4Nzc4IDIuMjc3MDM2My0yLjI3NzAzNjMgNS45Njg4NDE2LTIuMjc3MDM2MyA4LjI0NTg3NzggMCAyLjI3NzAzNjMgMi4yNzcwMzYyIDIuMjc3MDM2MyA1Ljk2ODg0MTUgMCA4LjI0NTg3NzgtMi4yNzcwMzYyIDIuMjc3MDM2Mi01Ljk2ODg0MTUgMi4yNzcwMzYyLTguMjQ1ODc3OCAweiIvPjwvZz48L3N2Zz4=", this.supportedTransactionVersions = null, this._readyState = "undefined" == typeof window || "undefined" == typeof document ? r.i1.Unsupported : r.i1.NotDetected, this._messaged = e => {
                        let t = e.data;
                        t && "mathwallet_internal" === t.origin && "lockStatusChanged" === t.type && !t.payload && this._disconnected()
                    }, this._disconnected = () => {
                        this._wallet && (window.removeEventListener("message", this._messaged), this._wallet = null, this._publicKey = null, this.emit("error", new s.at), this.emit("disconnect"))
                    }, this._connecting = !1, this._wallet = null, this._publicKey = null, this._readyState !== r.i1.Unsupported && (0, r.su)(() => !!window.solana ? .isMathWallet && (this._readyState = r.i1.Installed, this.emit("readyStateChange", this._readyState), !0))
                }
                get publicKey() {
                    return this._publicKey
                }
                get connecting() {
                    return this._connecting
                }
                get readyState() {
                    return this._readyState
                }
                async connect() {
                    try {
                        let e, t;
                        if (this.connected || this.connecting) return;
                        if (this._readyState !== r.i1.Installed) throw new s.OZ;
                        this._connecting = !0;
                        let n = window.solana;
                        try {
                            e = await n.getAccount()
                        } catch (e) {
                            throw new s.cO(e ? .message, e)
                        }
                        try {
                            t = new a.nh(e)
                        } catch (e) {
                            throw new s.Nx(e ? .message, e)
                        }
                        window.addEventListener("message", this._messaged), this._wallet = n, this._publicKey = t, this.emit("connect", t)
                    } catch (e) {
                        throw this.emit("error", e), e
                    } finally {
                        this._connecting = !1
                    }
                }
                async disconnect() {
                    this._wallet && (window.removeEventListener("message", this._messaged), this._wallet = null, this._publicKey = null), this.emit("disconnect")
                }
                async signTransaction(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new s.oS;
                        try {
                            return await t.signTransaction(e) || e
                        } catch (e) {
                            throw new s.PY(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signAllTransactions(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new s.oS;
                        try {
                            return await t.signAllTransactions(e) || e
                        } catch (e) {
                            throw new s.PY(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
            }
        },
        45538: function(e, t, n) {
            "use strict";
            n.d(t, {
                O: function() {
                    return l
                }
            });
            var i = n(74750),
                r = n(50277),
                s = n(59860),
                a = n(19931),
                o = n(45429);
            class l extends i.eC {
                constructor(e = {}) {
                    super(), this.name = "Phantom", this.url = "https://phantom.app", this.icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiB2aWV3Qm94PSIwIDAgMTA4IDEwOCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPg==", this.supportedTransactionVersions = new Set(["legacy", 0]), this._readyState = "undefined" == typeof window || "undefined" == typeof document ? r.i1.Unsupported : r.i1.NotDetected, this._disconnected = () => {
                        let e = this._wallet;
                        e && (e.off("disconnect", this._disconnected), e.off("accountChanged", this._accountChanged), this._wallet = null, this._publicKey = null, this.emit("error", new s.at), this.emit("disconnect"))
                    }, this._accountChanged = e => {
                        let t = this._publicKey;
                        if (t) {
                            try {
                                e = new o.nh(e.toBytes())
                            } catch (e) {
                                this.emit("error", new s.Nx(e ? .message, e));
                                return
                            }
                            t.equals(e) || (this._publicKey = e, this.emit("connect", e))
                        }
                    }, this._connecting = !1, this._wallet = null, this._publicKey = null, this._readyState !== r.i1.Unsupported && ((0, r.H)() ? (this._readyState = r.i1.Loadable, this.emit("readyStateChange", this._readyState)) : (0, r.su)(() => !!(window.phantom ? .solana ? .isPhantom || window.solana ? .isPhantom) && (this._readyState = r.i1.Installed, this.emit("readyStateChange", this._readyState), !0)))
                }
                get publicKey() {
                    return this._publicKey
                }
                get connecting() {
                    return this._connecting
                }
                get readyState() {
                    return this._readyState
                }
                async autoConnect() {
                    this.readyState === r.i1.Installed && await this.connect()
                }
                async connect() {
                    try {
                        let e;
                        if (this.connected || this.connecting) return;
                        if (this.readyState === r.i1.Loadable) {
                            let e = encodeURIComponent(window.location.href),
                                t = encodeURIComponent(window.location.origin);
                            window.location.href = `https://phantom.app/ul/browse/${e}?ref=${t}`;
                            return
                        }
                        if (this.readyState !== r.i1.Installed) throw new s.OZ;
                        this._connecting = !0;
                        let t = window.phantom ? .solana || window.solana;
                        if (!t.isConnected) try {
                            await t.connect()
                        } catch (e) {
                            throw new s.$w(e ? .message, e)
                        }
                        if (!t.publicKey) throw new s.cO;
                        try {
                            e = new o.nh(t.publicKey.toBytes())
                        } catch (e) {
                            throw new s.Nx(e ? .message, e)
                        }
                        t.on("disconnect", this._disconnected), t.on("accountChanged", this._accountChanged), this._wallet = t, this._publicKey = e, this.emit("connect", e)
                    } catch (e) {
                        throw this.emit("error", e), e
                    } finally {
                        this._connecting = !1
                    }
                }
                async disconnect() {
                    let e = this._wallet;
                    if (e) {
                        e.off("disconnect", this._disconnected), e.off("accountChanged", this._accountChanged), this._wallet = null, this._publicKey = null;
                        try {
                            await e.disconnect()
                        } catch (e) {
                            this.emit("error", new s.UG(e ? .message, e))
                        }
                    }
                    this.emit("disconnect")
                }
                async sendTransaction(e, t, n = {}) {
                    try {
                        let i = this._wallet;
                        if (!i) throw new s.oS;
                        try {
                            let {
                                signers: r,
                                ...s
                            } = n;
                            (0, a.W)(e) ? r ? .length && e.sign(r) : (e = await this.prepareTransaction(e, t, s), r ? .length && e.partialSign(...r)), s.preflightCommitment = s.preflightCommitment || t.commitment;
                            let {
                                signature: o
                            } = await i.signAndSendTransaction(e, s);
                            return o
                        } catch (e) {
                            if (e instanceof s.lj) throw e;
                            throw new s.IW(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signTransaction(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new s.oS;
                        try {
                            return await t.signTransaction(e) || e
                        } catch (e) {
                            throw new s.PY(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signAllTransactions(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new s.oS;
                        try {
                            return await t.signAllTransactions(e) || e
                        } catch (e) {
                            throw new s.PY(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signMessage(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new s.oS;
                        try {
                            let {
                                signature: n
                            } = await t.signMessage(e);
                            return n
                        } catch (e) {
                            throw new s.fk(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
            }
        },
        31156: function(e, t, n) {
            "use strict";
            n.d(t, {
                s: function() {
                    return y
                }
            });
            var i = n(2265);
            let r = {
                setVisible(e) {
                    console.error(s("call", "setVisible"))
                },
                visible: !1
            };

            function s(e, t) {
                return `You have tried to  ${e} "${t}" on a WalletModalContext without providing one. Make sure to render a WalletModalProvider as an ancestor of the component that uses WalletModalContext`
            }
            Object.defineProperty(r, "visible", {
                get: () => (console.error(s("read", "visible")), !1)
            });
            let a = (0, i.createContext)(r);
            var o = n(50277),
                l = n(28782),
                c = n(54887);
            let u = ({
                    id: e,
                    children: t,
                    expanded: n = !1
                }) => {
                    let r = (0, i.useRef)(null),
                        s = (0, i.useRef)(!0),
                        a = () => {
                            let e = r.current;
                            e && requestAnimationFrame(() => {
                                e.style.height = e.scrollHeight + "px"
                            })
                        },
                        o = () => {
                            let e = r.current;
                            e && requestAnimationFrame(() => {
                                e.style.height = e.offsetHeight + "px", e.style.overflow = "hidden", requestAnimationFrame(() => {
                                    e.style.height = "0"
                                })
                            })
                        };
                    return (0, i.useLayoutEffect)(() => {
                        n ? a() : o()
                    }, [n]), (0, i.useLayoutEffect)(() => {
                        let e = r.current;
                        if (e) return s.current && (t(), s.current = !1), e.addEventListener("transitionend", i), () => e.removeEventListener("transitionend", i);

                        function t() {
                            e && (e.style.overflow = n ? "initial" : "hidden", n && (e.style.height = "auto"))
                        }

                        function i(n) {
                            e && n.target === e && "height" === n.propertyName && t()
                        }
                    }, [n]), i.createElement("div", {
                        className: "wallet-adapter-collapse",
                        id: e,
                        ref: r,
                        role: "region",
                        style: {
                            height: 0,
                            transition: s.current ? void 0 : "height 250ms ease-out"
                        }
                    }, t)
                },
                h = e => i.createElement("button", {
                    className: `wallet-adapter-button ${e.className||""}`,
                    disabled: e.disabled,
                    style: e.style,
                    onClick: e.onClick,
                    tabIndex: e.tabIndex || 0,
                    type: "button"
                }, e.startIcon && i.createElement("i", {
                    className: "wallet-adapter-button-start-icon"
                }, e.startIcon), e.children, e.endIcon && i.createElement("i", {
                    className: "wallet-adapter-button-end-icon"
                }, e.endIcon)),
                d = ({
                    wallet: e,
                    ...t
                }) => e && i.createElement("img", {
                    src: e.adapter.icon,
                    alt: `${e.adapter.name} icon`,
                    ...t
                }),
                p = ({
                    handleClick: e,
                    tabIndex: t,
                    wallet: n
                }) => i.createElement("li", null, i.createElement(h, {
                    onClick: e,
                    startIcon: i.createElement(d, {
                        wallet: n
                    }),
                    tabIndex: t
                }, n.adapter.name, n.readyState === o.i1.Installed && i.createElement("span", null, "Detected"))),
                g = () => i.createElement("svg", {
                    width: "97",
                    height: "96",
                    viewBox: "0 0 97 96",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                }, i.createElement("circle", {
                    cx: "48.5",
                    cy: "48",
                    r: "48",
                    fill: "url(#paint0_linear_880_5115)",
                    fillOpacity: "0.1"
                }), i.createElement("circle", {
                    cx: "48.5",
                    cy: "48",
                    r: "47",
                    stroke: "url(#paint1_linear_880_5115)",
                    strokeOpacity: "0.4",
                    strokeWidth: "2"
                }), i.createElement("g", {
                    clipPath: "url(#clip0_880_5115)"
                }, i.createElement("path", {
                    d: "M65.5769 28.1523H31.4231C27.6057 28.1523 24.5 31.258 24.5 35.0754V60.9215C24.5 64.7389 27.6057 67.8446 31.4231 67.8446H65.5769C69.3943 67.8446 72.5 64.7389 72.5 60.9215V35.0754C72.5 31.258 69.3943 28.1523 65.5769 28.1523ZM69.7308 52.1523H59.5769C57.2865 52.1523 55.4231 50.289 55.4231 47.9985C55.4231 45.708 57.2864 43.8446 59.5769 43.8446H69.7308V52.1523ZM69.7308 41.0754H59.5769C55.7595 41.0754 52.6539 44.1811 52.6539 47.9985C52.6539 51.8159 55.7595 54.9215 59.5769 54.9215H69.7308V60.9215C69.7308 63.2119 67.8674 65.0754 65.5769 65.0754H31.4231C29.1327 65.0754 27.2692 63.212 27.2692 60.9215V35.0754C27.2692 32.785 29.1326 30.9215 31.4231 30.9215H65.5769C67.8673 30.9215 69.7308 32.7849 69.7308 35.0754V41.0754Z",
                    fill: "url(#paint2_linear_880_5115)"
                }), i.createElement("path", {
                    d: "M61.4231 46.6172H59.577C58.8123 46.6172 58.1924 47.2371 58.1924 48.0018C58.1924 48.7665 58.8123 49.3863 59.577 49.3863H61.4231C62.1878 49.3863 62.8077 48.7664 62.8077 48.0018C62.8077 47.2371 62.1878 46.6172 61.4231 46.6172Z",
                    fill: "url(#paint3_linear_880_5115)"
                })), i.createElement("defs", null, i.createElement("linearGradient", {
                    id: "paint0_linear_880_5115",
                    x1: "3.41664",
                    y1: "98.0933",
                    x2: "103.05",
                    y2: "8.42498",
                    gradientUnits: "userSpaceOnUse"
                }, i.createElement("stop", {
                    stopColor: "#9945FF"
                }), i.createElement("stop", {
                    offset: "0.14",
                    stopColor: "#8A53F4"
                }), i.createElement("stop", {
                    offset: "0.42",
                    stopColor: "#6377D6"
                }), i.createElement("stop", {
                    offset: "0.79",
                    stopColor: "#24B0A7"
                }), i.createElement("stop", {
                    offset: "0.99",
                    stopColor: "#00D18C"
                }), i.createElement("stop", {
                    offset: "1",
                    stopColor: "#00D18C"
                })), i.createElement("linearGradient", {
                    id: "paint1_linear_880_5115",
                    x1: "3.41664",
                    y1: "98.0933",
                    x2: "103.05",
                    y2: "8.42498",
                    gradientUnits: "userSpaceOnUse"
                }, i.createElement("stop", {
                    stopColor: "#9945FF"
                }), i.createElement("stop", {
                    offset: "0.14",
                    stopColor: "#8A53F4"
                }), i.createElement("stop", {
                    offset: "0.42",
                    stopColor: "#6377D6"
                }), i.createElement("stop", {
                    offset: "0.79",
                    stopColor: "#24B0A7"
                }), i.createElement("stop", {
                    offset: "0.99",
                    stopColor: "#00D18C"
                }), i.createElement("stop", {
                    offset: "1",
                    stopColor: "#00D18C"
                })), i.createElement("linearGradient", {
                    id: "paint2_linear_880_5115",
                    x1: "25.9583",
                    y1: "68.7101",
                    x2: "67.2337",
                    y2: "23.7879",
                    gradientUnits: "userSpaceOnUse"
                }, i.createElement("stop", {
                    stopColor: "#9945FF"
                }), i.createElement("stop", {
                    offset: "0.14",
                    stopColor: "#8A53F4"
                }), i.createElement("stop", {
                    offset: "0.42",
                    stopColor: "#6377D6"
                }), i.createElement("stop", {
                    offset: "0.79",
                    stopColor: "#24B0A7"
                }), i.createElement("stop", {
                    offset: "0.99",
                    stopColor: "#00D18C"
                }), i.createElement("stop", {
                    offset: "1",
                    stopColor: "#00D18C"
                })), i.createElement("linearGradient", {
                    id: "paint3_linear_880_5115",
                    x1: "58.3326",
                    y1: "49.4467",
                    x2: "61.0002",
                    y2: "45.4453",
                    gradientUnits: "userSpaceOnUse"
                }, i.createElement("stop", {
                    stopColor: "#9945FF"
                }), i.createElement("stop", {
                    offset: "0.14",
                    stopColor: "#8A53F4"
                }), i.createElement("stop", {
                    offset: "0.42",
                    stopColor: "#6377D6"
                }), i.createElement("stop", {
                    offset: "0.79",
                    stopColor: "#24B0A7"
                }), i.createElement("stop", {
                    offset: "0.99",
                    stopColor: "#00D18C"
                }), i.createElement("stop", {
                    offset: "1",
                    stopColor: "#00D18C"
                })), i.createElement("clipPath", {
                    id: "clip0_880_5115"
                }, i.createElement("rect", {
                    width: "48",
                    height: "48",
                    fill: "white",
                    transform: "translate(24.5 24)"
                })))),
                f = ({
                    className: e = "",
                    container: t = "body"
                }) => {
                    let n = (0, i.useRef)(null),
                        {
                            wallets: r,
                            select: s
                        } = (0, l.O)(),
                        {
                            setVisible: h
                        } = (0, i.useContext)(a),
                        [d, f] = (0, i.useState)(!1),
                        [y, M] = (0, i.useState)(!1),
                        [m, N] = (0, i.useState)(null),
                        [w, T] = (0, i.useMemo)(() => {
                            let e = [],
                                t = [];
                            for (let n of r) n.readyState === o.i1.Installed ? e.push(n) : t.push(n);
                            return e.length ? [e, t] : [t, []]
                        }, [r]),
                        j = (0, i.useCallback)(() => {
                            M(!1), setTimeout(() => h(!1), 150)
                        }, [h]),
                        S = (0, i.useCallback)(e => {
                            e.preventDefault(), j()
                        }, [j]),
                        D = (0, i.useCallback)((e, t) => {
                            s(t), S(e)
                        }, [s, S]),
                        U = (0, i.useCallback)(() => f(!d), [d]),
                        E = (0, i.useCallback)(e => {
                            let t = n.current;
                            if (!t) return;
                            let i = t.querySelectorAll("button"),
                                r = i[0],
                                s = i[i.length - 1];
                            e.shiftKey ? document.activeElement === r && (s.focus(), e.preventDefault()) : document.activeElement === s && (r.focus(), e.preventDefault())
                        }, [n]);
                    return (0, i.useLayoutEffect)(() => {
                        let e = e => {
                                "Escape" === e.key ? j() : "Tab" === e.key && E(e)
                            },
                            {
                                overflow: t
                            } = window.getComputedStyle(document.body);
                        return setTimeout(() => M(!0), 0), document.body.style.overflow = "hidden", window.addEventListener("keydown", e, !1), () => {
                            document.body.style.overflow = t, window.removeEventListener("keydown", e, !1)
                        }
                    }, [j, E]), (0, i.useLayoutEffect)(() => N(document.querySelector(t)), [t]), m && (0, c.createPortal)(i.createElement("div", {
                        "aria-labelledby": "wallet-adapter-modal-title",
                        "aria-modal": "true",
                        className: `wallet-adapter-modal ${y&&"wallet-adapter-modal-fade-in"} ${e}`,
                        ref: n,
                        role: "dialog"
                    }, i.createElement("div", {
                        className: "wallet-adapter-modal-container"
                    }, i.createElement("div", {
                        className: "wallet-adapter-modal-wrapper"
                    }, i.createElement("button", {
                        onClick: S,
                        className: "wallet-adapter-modal-button-close"
                    }, i.createElement("svg", {
                        width: "14",
                        height: "14"
                    }, i.createElement("path", {
                        d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"
                    }))), w.length ? i.createElement(i.Fragment, null, i.createElement("h1", {
                        className: "wallet-adapter-modal-title"
                    }, "Connect a wallet on Solana to continue"), i.createElement("ul", {
                        className: "wallet-adapter-modal-list"
                    }, w.map(e => i.createElement(p, {
                        key: e.adapter.name,
                        handleClick: t => D(t, e.adapter.name),
                        wallet: e
                    })), T.length ? i.createElement(u, {
                        expanded: d,
                        id: "wallet-adapter-modal-collapse"
                    }, T.map(e => i.createElement(p, {
                        key: e.adapter.name,
                        handleClick: t => D(t, e.adapter.name),
                        tabIndex: d ? 0 : -1,
                        wallet: e
                    }))) : null), T.length ? i.createElement("button", {
                        className: "wallet-adapter-modal-list-more",
                        onClick: U,
                        tabIndex: 0
                    }, i.createElement("span", null, d ? "Less " : "More ", "options"), i.createElement("svg", {
                        width: "13",
                        height: "7",
                        viewBox: "0 0 13 7",
                        xmlns: "http://www.w3.org/2000/svg",
                        className: `${d?"wallet-adapter-modal-list-more-icon-rotate":""}`
                    }, i.createElement("path", {
                        d: "M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z"
                    }))) : null) : i.createElement(i.Fragment, null, i.createElement("h1", {
                        className: "wallet-adapter-modal-title"
                    }, "You'll need a wallet on Solana to continue"), i.createElement("div", {
                        className: "wallet-adapter-modal-middle"
                    }, i.createElement(g, null)), T.length ? i.createElement(i.Fragment, null, i.createElement("button", {
                        className: "wallet-adapter-modal-list-more",
                        onClick: U,
                        tabIndex: 0
                    }, i.createElement("span", null, d ? "Hide " : "Already have a wallet? View ", "options"), i.createElement("svg", {
                        width: "13",
                        height: "7",
                        viewBox: "0 0 13 7",
                        xmlns: "http://www.w3.org/2000/svg",
                        className: `${d?"wallet-adapter-modal-list-more-icon-rotate":""}`
                    }, i.createElement("path", {
                        d: "M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z"
                    }))), i.createElement(u, {
                        expanded: d,
                        id: "wallet-adapter-modal-collapse"
                    }, i.createElement("ul", {
                        className: "wallet-adapter-modal-list"
                    }, T.map(e => i.createElement(p, {
                        key: e.adapter.name,
                        handleClick: t => D(t, e.adapter.name),
                        tabIndex: d ? 0 : -1,
                        wallet: e
                    }))))) : null))), i.createElement("div", {
                        className: "wallet-adapter-modal-overlay",
                        onMouseDown: S
                    })), m)
                },
                y = ({
                    children: e,
                    ...t
                }) => {
                    let [n, r] = (0, i.useState)(!1);
                    return i.createElement(a.Provider, {
                        value: {
                            visible: n,
                            setVisible: r
                        }
                    }, e, n && i.createElement(f, { ...t
                    }))
                }
        },
        91910: function(e, t, n) {
            "use strict";
            n.d(t, {
                U: function() {
                    return a
                }
            });
            var i = n(45429),
                r = n(2265),
                s = n(61811);
            let a = ({
                children: e,
                endpoint: t,
                config: n = {
                    commitment: "confirmed"
                }
            }) => {
                let a = (0, r.useMemo)(() => new i.ew(t, n), [t, n]);
                return r.createElement(s.h.Provider, {
                    value: {
                        connection: a
                    }
                }, e)
            }
        },
        21843: function(e, t, n) {
            "use strict";
            let i, r, s;
            n.d(t, {
                n: function() {
                    return ek
                }
            });
            var a, o, l, c, u, h, d, p, g, f, y, M, m, N, w, T, j, S, D, U, E, b = n(74750),
                L = n(50277),
                O = n(59860),
                v = n(45429);
            let z = `(?:\\nURI: (?<uri>[^\\n]+))?(?:\\nVersion: (?<version>[^\\n]+))?(?:\\nChain ID: (?<chainId>[^\\n]+))?(?:\\nNonce: (?<nonce>[^\\n]+))?(?:\\nIssued At: (?<issuedAt>[^\\n]+))?(?:\\nExpiration Time: (?<expirationTime>[^\\n]+))?(?:\\nNot Before: (?<notBefore>[^\\n]+))?(?:\\nRequest ID: (?<requestId>[^\\n]+))?(?:\\nResources:(?<resources>(?:\\n- [^\\n]+)*))?`;
            RegExp(`^(?<domain>[^\\n]+?) wants you to sign in with your Solana account:\\n(?<address>[^\\n]+)(?:\\n|$)(?:\\n(?<statement>[\\S\\s]*?)(?:\\n|$))??${z}\\n*$`);
            let I = {
                ERROR_ASSOCIATION_PORT_OUT_OF_RANGE: "ERROR_ASSOCIATION_PORT_OUT_OF_RANGE",
                ERROR_FORBIDDEN_WALLET_BASE_URL: "ERROR_FORBIDDEN_WALLET_BASE_URL",
                ERROR_SECURE_CONTEXT_REQUIRED: "ERROR_SECURE_CONTEXT_REQUIRED",
                ERROR_SESSION_CLOSED: "ERROR_SESSION_CLOSED",
                ERROR_SESSION_TIMEOUT: "ERROR_SESSION_TIMEOUT",
                ERROR_WALLET_NOT_FOUND: "ERROR_WALLET_NOT_FOUND",
                ERROR_INVALID_PROTOCOL_VERSION: "ERROR_INVALID_PROTOCOL_VERSION"
            };
            class x extends Error {
                constructor(...e) {
                    let [t, n, i] = e;
                    super(n), this.code = t, this.data = i, this.name = "SolanaMobileWalletAdapterError"
                }
            }
            class R extends Error {
                constructor(...e) {
                    let [t, n, i, r] = e;
                    super(i), this.code = n, this.data = r, this.jsonRpcMessageId = t, this.name = "SolanaMobileWalletAdapterProtocolError"
                }
            }

            function F(e, t, n, i) {
                return new(n || (n = Promise))(function(r, s) {
                    function a(e) {
                        try {
                            l(i.next(e))
                        } catch (e) {
                            s(e)
                        }
                    }

                    function o(e) {
                        try {
                            l(i.throw(e))
                        } catch (e) {
                            s(e)
                        }
                    }

                    function l(e) {
                        var t;
                        e.done ? r(e.value) : ((t = e.value) instanceof n ? t : new n(function(e) {
                            e(t)
                        })).then(a, o)
                    }
                    l((i = i.apply(e, t || [])).next())
                })
            }
            let k = "solana:cloneAuthorization";

            function Q(e, t) {
                return F(this, void 0, void 0, function*() {
                    let n = e.slice(0, 4),
                        r = e.slice(4, 16),
                        s = e.slice(16),
                        a = yield crypto.subtle.decrypt(V(n, r), t, s);
                    return (void 0 === i && (i = new TextDecoder("utf-8")), i).decode(a)
                })
            }

            function V(e, t) {
                return {
                    additionalData: e,
                    iv: t,
                    name: "AES-GCM",
                    tagLength: 128
                }
            }

            function A(e) {
                if (e < 49152 || e > 65535) throw new x(I.ERROR_ASSOCIATION_PORT_OUT_OF_RANGE, `Association port number must be between 49152 and 65535. ${e} given.`, {
                    port: e
                });
                return e
            }

            function C(e) {
                return e.replace(/(^\/+|\/+$)/g, "").split("/")
            }
            let W = {
                    Firefox: 0,
                    Other: 1
                },
                Z = null,
                B = [150, 150, 200, 500, 500, 750, 750, 1e3];

            function Y(e) {
                return new DataView(e).getUint32(0, !1)
            }
            var _ = n(46124);

            function P(e, t) {
                var n = {};
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && 0 > t.indexOf(i) && (n[i] = e[i]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                    for (var r = 0, i = Object.getOwnPropertySymbols(e); r < i.length; r++) 0 > t.indexOf(i[r]) && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (n[i[r]] = e[i[r]]);
                return n
            }

            function G(e, t, n, i) {
                return new(n || (n = Promise))(function(r, s) {
                    function a(e) {
                        try {
                            l(i.next(e))
                        } catch (e) {
                            s(e)
                        }
                    }

                    function o(e) {
                        try {
                            l(i.throw(e))
                        } catch (e) {
                            s(e)
                        }
                    }

                    function l(e) {
                        var t;
                        e.done ? r(e.value) : ((t = e.value) instanceof n ? t : new n(function(e) {
                            e(t)
                        })).then(a, o)
                    }
                    l((i = i.apply(e, t || [])).next())
                })
            }

            function H(e) {
                return window.btoa(String.fromCharCode.call(null, ...e))
            }

            function J(e) {
                return new Uint8Array(window.atob(e).split("").map(e => e.charCodeAt(0)))
            }

            function X(e) {
                return H("version" in e ? e.serialize() : e.serialize({
                    requireAllSignatures: !1,
                    verifySignatures: !1
                }))
            }

            function K(e) {
                let t = e[0] * v.eT + 1;
                return "legacy" === v.EC.deserializeMessageVersion(e.slice(t, e.length)) ? v.YW.from(e) : v.GS.deserialize(e)
            }

            function q(e, t, n, i) {
                return new(n || (n = Promise))(function(r, s) {
                    function a(e) {
                        try {
                            l(i.next(e))
                        } catch (e) {
                            s(e)
                        }
                    }

                    function o(e) {
                        try {
                            l(i.throw(e))
                        } catch (e) {
                            s(e)
                        }
                    }

                    function l(e) {
                        var t;
                        e.done ? r(e.value) : ((t = e.value) instanceof n ? t : new n(function(e) {
                            e(t)
                        })).then(a, o)
                    }
                    l((i = i.apply(e, t || [])).next())
                })
            }

            function $(e) {
                return new Uint8Array(window.atob(e).split("").map(e => e.charCodeAt(0)))
            }
            let ee = "Mobile Wallet Adapter";

            function et(e) {
                return "version" in e
            }
            class en extends b.qz {
                constructor(e) {
                    var t;
                    super(), this.supportedTransactionVersions = new Set(["legacy", 0]), this.name = ee, this.url = "https://solanamobile.com/wallets", this.icon = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI4IiB3aWR0aD0iMjgiIHZpZXdCb3g9Ii0zIDAgMjggMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI0RDQjhGRiI+PHBhdGggZD0iTTE3LjQgMTcuNEgxNXYyLjRoMi40di0yLjRabTEuMi05LjZoLTIuNHYyLjRoMi40VjcuOFoiLz48cGF0aCBkPSJNMjEuNiAzVjBoLTIuNHYzaC0zLjZWMGgtMi40djNoLTIuNHY2LjZINC41YTIuMSAyLjEgMCAxIDEgMC00LjJoMi43VjNINC41QTQuNSA0LjUgMCAwIDAgMCA3LjVWMjRoMjEuNnYtNi42aC0yLjR2NC4ySDIuNFYxMS41Yy41LjMgMS4yLjQgMS44LjVoNy41QTYuNiA2LjYgMCAwIDAgMjQgOVYzaC0yLjRabTAgNS43YTQuMiA0LjIgMCAxIDEtOC40IDBWNS40aDguNHYzLjNaIi8+PC9nPjwvc3ZnPg==", this._connecting = !1, this._connectionGeneration = 0, this._readyState = "undefined" != typeof window && window.isSecureContext && "undefined" != typeof document && /android/i.test(navigator.userAgent) ? L.i1.Loadable : L.i1.Unsupported, this._authorizationResultCache = e.authorizationResultCache, this._addressSelector = e.addressSelector, this._appIdentity = e.appIdentity, this._chain = null !== (t = e.chain) && void 0 !== t ? t : e.cluster, this._onWalletNotFound = e.onWalletNotFound, this._readyState !== L.i1.Unsupported && this._authorizationResultCache.get().then(e => {
                        e && this.declareWalletAsInstalled()
                    })
                }
                get publicKey() {
                    if (null == this._publicKey && null != this._selectedAddress) try {
                        this._publicKey = function(e) {
                            let t = $(e);
                            return new v.nh(t)
                        }(this._selectedAddress)
                    } catch (e) {
                        throw new O.Nx(e instanceof Error && (null == e ? void 0 : e.message) || "Unknown error", e)
                    }
                    return this._publicKey ? this._publicKey : null
                }
                get connected() {
                    return !!this._authorizationResult
                }
                get connecting() {
                    return this._connecting
                }
                get readyState() {
                    return this._readyState
                }
                declareWalletAsInstalled() {
                    this._readyState !== L.i1.Installed && this.emit("readyStateChange", this._readyState = L.i1.Installed)
                }
                runWithGuard(e) {
                    return q(this, void 0, void 0, function*() {
                        try {
                            return yield e()
                        } catch (e) {
                            throw this.emit("error", e), e
                        }
                    })
                }
                autoConnect_DO_NOT_USE_OR_YOU_WILL_BE_FIRED() {
                    return q(this, void 0, void 0, function*() {
                        return yield this.autoConnect()
                    })
                }
                autoConnect() {
                    return q(this, void 0, void 0, function*() {
                        if (!this.connecting && !this.connected) return yield this.runWithGuard(() => q(this, void 0, void 0, function*() {
                            if (this._readyState !== L.i1.Installed && this._readyState !== L.i1.Loadable) throw new O.OZ;
                            this._connecting = !0;
                            try {
                                let e = yield this._authorizationResultCache.get();
                                e && this.handleAuthorizationResult(e)
                            } catch (e) {
                                throw new O.$w(e instanceof Error && e.message || "Unknown error", e)
                            } finally {
                                this._connecting = !1
                            }
                        }))
                    })
                }
                connect() {
                    return q(this, void 0, void 0, function*() {
                        if (!this.connecting && !this.connected) return yield this.runWithGuard(() => q(this, void 0, void 0, function*() {
                            if (this._readyState !== L.i1.Installed && this._readyState !== L.i1.Loadable) throw new O.OZ;
                            this._connecting = !0;
                            try {
                                yield this.performAuthorization()
                            } catch (e) {
                                throw new O.$w(e instanceof Error && e.message || "Unknown error", e)
                            } finally {
                                this._connecting = !1
                            }
                        }))
                    })
                }
                performAuthorization(e) {
                    return q(this, void 0, void 0, function*() {
                        try {
                            let t = yield this._authorizationResultCache.get();
                            if (t) return this.handleAuthorizationResult(t), t;
                            return yield this.transact(t => q(this, void 0, void 0, function*() {
                                let n = yield t.authorize({
                                    chain: this._chain,
                                    identity: this._appIdentity,
                                    sign_in_payload: e
                                });
                                return Promise.all([this._authorizationResultCache.set(n), this.handleAuthorizationResult(n)]), n
                            }))
                        } catch (e) {
                            throw new O.$w(e instanceof Error && e.message || "Unknown error", e)
                        }
                    })
                }
                handleAuthorizationResult(e) {
                    var t;
                    return q(this, void 0, void 0, function*() {
                        let n = null == this._authorizationResult || (null === (t = this._authorizationResult) || void 0 === t ? void 0 : t.accounts.length) !== e.accounts.length || this._authorizationResult.accounts.some((t, n) => t.address !== e.accounts[n].address);
                        if (this._authorizationResult = e, this.declareWalletAsInstalled(), n) {
                            let t = yield this._addressSelector.select(e.accounts.map(({
                                address: e
                            }) => e));
                            t !== this._selectedAddress && (this._selectedAddress = t, delete this._publicKey, this.emit("connect", this.publicKey))
                        }
                    })
                }
                performReauthorization(e, t) {
                    return q(this, void 0, void 0, function*() {
                        try {
                            let n = yield e.authorize({
                                auth_token: t,
                                identity: this._appIdentity
                            });
                            Promise.all([this._authorizationResultCache.set(n), this.handleAuthorizationResult(n)])
                        } catch (e) {
                            throw this.disconnect(), new O.at(e instanceof Error && (null == e ? void 0 : e.message) || "Unknown error", e)
                        }
                    })
                }
                disconnect() {
                    return q(this, void 0, void 0, function*() {
                        this._authorizationResultCache.clear(), this._connecting = !1, this._connectionGeneration++, delete this._authorizationResult, delete this._publicKey, delete this._selectedAddress, this.emit("disconnect")
                    })
                }
                transact(e) {
                    var t;
                    return q(this, void 0, void 0, function*() {
                        let n = null === (t = this._authorizationResult) || void 0 === t ? void 0 : t.wallet_uri_base,
                            i = this._connectionGeneration;
                        try {
                            return yield function(e, t) {
                                return G(this, void 0, void 0, function*() {
                                    return yield function(e, t) {
                                        return F(this, void 0, void 0, function*() {
                                            let n;
                                            ! function() {
                                                if ("undefined" == typeof window || !0 !== window.isSecureContext) throw new x(I.ERROR_SECURE_CONTEXT_REQUIRED, "The mobile wallet adapter protocol must be used in a secure context (`https`).")
                                            }();
                                            let i = yield function() {
                                                return F(this, void 0, void 0, function*() {
                                                    return yield crypto.subtle.generateKey({
                                                        name: "ECDSA",
                                                        namedCurve: "P-256"
                                                    }, !1, ["sign"])
                                                })
                                            }(), r = yield function(e, t) {
                                                return F(this, void 0, void 0, function*() {
                                                    let n = A(49152 + Math.floor(16384 * Math.random())),
                                                        i = yield function(e, t, n, i = ["v1"]) {
                                                            return F(this, void 0, void 0, function*() {
                                                                let r = A(t),
                                                                    s = function(e) {
                                                                        let t = "",
                                                                            n = new Uint8Array(e),
                                                                            i = n.byteLength;
                                                                        for (let e = 0; e < i; e++) t += String.fromCharCode(n[e]);
                                                                        return window.btoa(t)
                                                                    }((yield crypto.subtle.exportKey("raw", e))),
                                                                    a = function(e, t) {
                                                                        let n = null;
                                                                        if (t) {
                                                                            try {
                                                                                n = new URL(t)
                                                                            } catch (e) {}
                                                                            if ((null == n ? void 0 : n.protocol) !== "https:") throw new x(I.ERROR_FORBIDDEN_WALLET_BASE_URL, "Base URLs supplied by wallets must be valid `https` URLs")
                                                                        }
                                                                        return n || (n = new URL("solana-wallet:/")), new URL(e.startsWith("/") ? e : [...C(n.pathname), ...C(e)].join("/"), n)
                                                                    }("v1/associate/local", n);
                                                                return a.searchParams.set("association", s.replace(/[/+=]/g, e => ({
                                                                    "/": "_",
                                                                    "+": "-",
                                                                    "=": "."
                                                                })[e])), a.searchParams.set("port", `${r}`), i.forEach(e => {
                                                                    a.searchParams.set("v", e)
                                                                }), a
                                                            })
                                                        }(e, n, t);
                                                    if ("https:" === i.protocol) window.location.assign(i);
                                                    else try {
                                                        switch (-1 !== navigator.userAgent.indexOf("Firefox/") ? W.Firefox : W.Other) {
                                                            case W.Firefox:
                                                                null == Z && ((Z = document.createElement("iframe")).style.display = "none", document.body.appendChild(Z)), Z.contentWindow.location.href = i.toString();
                                                                break;
                                                            case W.Other:
                                                                {
                                                                    let e = new Promise((e, t) => {
                                                                        function n() {
                                                                            clearTimeout(r), window.removeEventListener("blur", i)
                                                                        }

                                                                        function i() {
                                                                            n(), e()
                                                                        }
                                                                        window.addEventListener("blur", i);
                                                                        let r = setTimeout(() => {
                                                                            n(), t()
                                                                        }, 2e3)
                                                                    });window.location.assign(i),
                                                                    yield e
                                                                }
                                                        }
                                                    } catch (e) {
                                                        throw new x(I.ERROR_WALLET_NOT_FOUND, "Found no installed wallet that supports the mobile wallet protocol.")
                                                    }
                                                    return n
                                                })
                                            }(i.publicKey, null == t ? void 0 : t.baseUri), s = `ws://localhost:${r}/solana-wallet`, a = (() => {
                                                let e = [...B];
                                                return () => e.length > 1 ? e.shift() : e[0]
                                            })(), o = 1, l = 0, c = {
                                                __type: "disconnected"
                                            };
                                            return new Promise((t, u) => {
                                                let h, d, p;
                                                let g = {},
                                                    f = () => F(this, void 0, void 0, function*() {
                                                        if ("connecting" !== c.__type) {
                                                            console.warn(`Expected adapter state to be \`connecting\` at the moment the websocket opens. Got \`${c.__type}\`.`);
                                                            return
                                                        }
                                                        let {
                                                            associationKeypair: e
                                                        } = c;
                                                        h.removeEventListener("open", f);
                                                        let t = yield function() {
                                                            return F(this, void 0, void 0, function*() {
                                                                return yield crypto.subtle.generateKey({
                                                                    name: "ECDH",
                                                                    namedCurve: "P-256"
                                                                }, !1, ["deriveKey", "deriveBits"])
                                                            })
                                                        }();
                                                        h.send((yield function(e, t) {
                                                            return F(this, void 0, void 0, function*() {
                                                                let n = yield crypto.subtle.exportKey("raw", e), i = yield crypto.subtle.sign({
                                                                    hash: "SHA-256",
                                                                    name: "ECDSA"
                                                                }, t, n), r = new Uint8Array(n.byteLength + i.byteLength);
                                                                return r.set(new Uint8Array(n), 0), r.set(new Uint8Array(i), n.byteLength), r
                                                            })
                                                        }(t.publicKey, e.privateKey))), c = {
                                                            __type: "hello_req_sent",
                                                            associationPublicKey: e.publicKey,
                                                            ecdhPrivateKey: t.privateKey
                                                        }
                                                    }),
                                                    y = e => {
                                                        e.wasClean ? c = {
                                                            __type: "disconnected"
                                                        } : u(new x(I.ERROR_SESSION_CLOSED, `The wallet session dropped unexpectedly (${e.code}: ${e.reason}).`, {
                                                            closeEvent: e
                                                        })), d()
                                                    },
                                                    M = e => F(this, void 0, void 0, function*() {
                                                        d(), Date.now() - n >= 3e4 ? u(new x(I.ERROR_SESSION_TIMEOUT, `Failed to connect to the wallet websocket on port ${r}.`)) : (yield new Promise(e => {
                                                            let t = a();
                                                            p = window.setTimeout(e, t)
                                                        }), N())
                                                    }),
                                                    m = n => F(this, void 0, void 0, function*() {
                                                        let i = yield n.data.arrayBuffer();
                                                        switch (c.__type) {
                                                            case "connected":
                                                                try {
                                                                    let e = i.slice(0, 4),
                                                                        t = Y(e);
                                                                    if (t !== l + 1) throw Error("Encrypted message has invalid sequence number");
                                                                    l = t;
                                                                    let n = yield function(e, t) {
                                                                        return F(this, void 0, void 0, function*() {
                                                                            let n = JSON.parse((yield Q(e, t)));
                                                                            if (Object.hasOwnProperty.call(n, "error")) throw new R(n.id, n.error.code, n.error.message);
                                                                            return n
                                                                        })
                                                                    }(i, c.sharedSecret), r = g[n.id];
                                                                    delete g[n.id], r.resolve(n.result)
                                                                } catch (e) {
                                                                    if (e instanceof R) {
                                                                        let t = g[e.jsonRpcMessageId];
                                                                        delete g[e.jsonRpcMessageId], t.reject(e)
                                                                    } else throw e
                                                                }
                                                                break;
                                                            case "hello_req_sent":
                                                                {
                                                                    var r, s;
                                                                    let n = yield function(e, t, n) {
                                                                        return F(this, void 0, void 0, function*() {
                                                                            let [i, r] = yield Promise.all([crypto.subtle.exportKey("raw", t), crypto.subtle.importKey("raw", e.slice(0, 65), {
                                                                                name: "ECDH",
                                                                                namedCurve: "P-256"
                                                                            }, !1, [])]), s = yield crypto.subtle.deriveBits({
                                                                                name: "ECDH",
                                                                                public: r
                                                                            }, n, 256), a = yield crypto.subtle.importKey("raw", s, "HKDF", !1, ["deriveKey"]);
                                                                            return yield crypto.subtle.deriveKey({
                                                                                name: "HKDF",
                                                                                hash: "SHA-256",
                                                                                salt: new Uint8Array(i),
                                                                                info: new Uint8Array
                                                                            }, a, {
                                                                                name: "AES-GCM",
                                                                                length: 128
                                                                            }, !1, ["encrypt", "decrypt"])
                                                                        })
                                                                    }(i, c.associationPublicKey, c.ecdhPrivateKey), a = i.slice(65), p = 0 !== a.byteLength ? yield F(this, void 0, void 0, function*() {
                                                                        let e = Y(a.slice(0, 4));
                                                                        if (e !== l + 1) throw Error("Encrypted message has invalid sequence number");
                                                                        return l = e,
                                                                            function(e, t) {
                                                                                return F(this, void 0, void 0, function*() {
                                                                                    let n = JSON.parse((yield Q(e, t))),
                                                                                        i = "legacy";
                                                                                    if (Object.hasOwnProperty.call(n, "v")) switch (n.v) {
                                                                                        case 1:
                                                                                        case "1":
                                                                                        case "v1":
                                                                                            i = "v1";
                                                                                            break;
                                                                                        case "legacy":
                                                                                            i = "legacy";
                                                                                            break;
                                                                                        default:
                                                                                            throw new x(I.ERROR_INVALID_PROTOCOL_VERSION, `Unknown/unsupported protocol version: ${n.v}`)
                                                                                    }
                                                                                    return {
                                                                                        protocol_version: i
                                                                                    }
                                                                                })
                                                                            }(a, n)
                                                                    }): {
                                                                        protocol_version: "legacy"
                                                                    };c = {
                                                                        __type: "connected",
                                                                        sharedSecret: n,
                                                                        sessionProperties: p
                                                                    };
                                                                    let f = (r = p.protocol_version, s = (e, t) => F(this, void 0, void 0, function*() {
                                                                        let i = o++;
                                                                        return h.send((yield function(e, t) {
                                                                            return F(this, void 0, void 0, function*() {
                                                                                let n = JSON.stringify(e);
                                                                                return function(e, t, n) {
                                                                                    return F(this, void 0, void 0, function*() {
                                                                                        let i = function(e) {
                                                                                                if (e >= 4294967296) throw Error("Outbound sequence number overflow. The maximum sequence number is 32-bytes.");
                                                                                                let t = new ArrayBuffer(4);
                                                                                                return new DataView(t).setUint32(0, e, !1), new Uint8Array(t)
                                                                                            }(t),
                                                                                            r = new Uint8Array(12);
                                                                                        crypto.getRandomValues(r);
                                                                                        let s = yield crypto.subtle.encrypt(V(i, r), n, new TextEncoder().encode(e)), a = new Uint8Array(i.byteLength + r.byteLength + s.byteLength);
                                                                                        return a.set(new Uint8Array(i), 0), a.set(new Uint8Array(r), i.byteLength), a.set(new Uint8Array(s), i.byteLength + r.byteLength), a
                                                                                    })
                                                                                }(n, e.id, t)
                                                                            })
                                                                        }({
                                                                            id: i,
                                                                            jsonrpc: "2.0",
                                                                            method: e,
                                                                            params: null != t ? t : {}
                                                                        }, n))), new Promise((t, n) => {
                                                                            g[i] = {
                                                                                resolve(i) {
                                                                                    switch (e) {
                                                                                        case "authorize":
                                                                                        case "reauthorize":
                                                                                            {
                                                                                                let {
                                                                                                    wallet_uri_base: e
                                                                                                } = i;
                                                                                                if (null != e) try {
                                                                                                    ! function(e) {
                                                                                                        let t;
                                                                                                        try {
                                                                                                            t = new URL(e)
                                                                                                        } catch (e) {
                                                                                                            throw new x(I.ERROR_FORBIDDEN_WALLET_BASE_URL, "Invalid base URL supplied by wallet")
                                                                                                        }
                                                                                                        if ("https:" !== t.protocol) throw new x(I.ERROR_FORBIDDEN_WALLET_BASE_URL, "Base URLs supplied by wallets must be valid `https` URLs")
                                                                                                    }(e)
                                                                                                } catch (e) {
                                                                                                    n(e);
                                                                                                    return
                                                                                                }
                                                                                            }
                                                                                    }
                                                                                    t(i)
                                                                                },
                                                                                reject: n
                                                                            }
                                                                        })
                                                                    }), new Proxy({}, {
                                                                        get: (e, t) => (null == e[t] && (e[t] = function(e) {
                                                                            return F(this, void 0, void 0, function*() {
                                                                                let {
                                                                                    method: n,
                                                                                    params: i
                                                                                } = function(e, t, n) {
                                                                                    let i = t,
                                                                                        r = e.toString().replace(/[A-Z]/g, e => `_${e.toLowerCase()}`).toLowerCase();
                                                                                    switch (e) {
                                                                                        case "authorize":
                                                                                            {
                                                                                                let {
                                                                                                    chain: e
                                                                                                } = i;
                                                                                                if ("legacy" === n) {
                                                                                                    switch (e) {
                                                                                                        case "solana:testnet":
                                                                                                            e = "testnet";
                                                                                                            break;
                                                                                                        case "solana:devnet":
                                                                                                            e = "devnet";
                                                                                                            break;
                                                                                                        case "solana:mainnet":
                                                                                                            e = "mainnet-beta";
                                                                                                            break;
                                                                                                        default:
                                                                                                            e = i.cluster
                                                                                                    }
                                                                                                    i.cluster = e
                                                                                                } else {
                                                                                                    switch (e) {
                                                                                                        case "testnet":
                                                                                                        case "devnet":
                                                                                                            e = `solana:${e}`;
                                                                                                            break;
                                                                                                        case "mainnet-beta":
                                                                                                            e = "solana:mainnet"
                                                                                                    }
                                                                                                    i.chain = e
                                                                                                }
                                                                                            }
                                                                                        case "reauthorize":
                                                                                            {
                                                                                                let {
                                                                                                    auth_token: e,
                                                                                                    identity: t
                                                                                                } = i;e && ("legacy" === n ? (r = "reauthorize", i = {
                                                                                                    auth_token: e,
                                                                                                    identity: t
                                                                                                }) : r = "authorize")
                                                                                            }
                                                                                    }
                                                                                    return {
                                                                                        method: r,
                                                                                        params: i
                                                                                    }
                                                                                }(t, e, r), a = yield s(n, i);
                                                                                return "authorize" === n && i.sign_in_payload && !a.sign_in_result && (a.sign_in_result = yield function(e, t, n) {
                                                                                        var i;
                                                                                        return F(this, void 0, void 0, function*() {
                                                                                            var r, s;
                                                                                            let a = null !== (i = e.domain) && void 0 !== i ? i : window.location.host,
                                                                                                o = t.accounts[0].address,
                                                                                                l = (r = Object.assign(Object.assign({}, e), {
                                                                                                    domain: a,
                                                                                                    address: o
                                                                                                }), s = function(e) {
                                                                                                    let t = `${e.domain} wants you to sign in with your Solana account:
`;
                                                                                                    t += `${e.address}`, e.statement && (t += `

${e.statement}`);
                                                                                                    let n = [];
                                                                                                    if (e.uri && n.push(`URI: ${e.uri}`), e.version && n.push(`Version: ${e.version}`), e.chainId && n.push(`Chain ID: ${e.chainId}`), e.nonce && n.push(`Nonce: ${e.nonce}`), e.issuedAt && n.push(`Issued At: ${e.issuedAt}`), e.expirationTime && n.push(`Expiration Time: ${e.expirationTime}`), e.notBefore && n.push(`Not Before: ${e.notBefore}`), e.requestId && n.push(`Request ID: ${e.requestId}`), e.resources)
                                                                                                        for (let t of (n.push("Resources:"), e.resources)) n.push(`- ${t}`);
                                                                                                    return n.length && (t += `

${n.join("\n")}`), t
                                                                                                }(r), window.btoa(s)),
                                                                                                c = yield n("sign_messages", {
                                                                                                    addresses: [o],
                                                                                                    payloads: [l]
                                                                                                });
                                                                                            return {
                                                                                                address: o,
                                                                                                signed_message: l,
                                                                                                signature: c.signed_payloads[0].slice(l.length)
                                                                                            }
                                                                                        })
                                                                                    }(i.sign_in_payload, a, s)),
                                                                                    function(e, t, n) {
                                                                                        if ("getCapabilities" === e) switch (n) {
                                                                                            case "legacy":
                                                                                                {
                                                                                                    let e = ["solana:signTransactions"];
                                                                                                    return !0 === t.supports_clone_authorization && e.push(k),
                                                                                                    Object.assign(Object.assign({}, t), {
                                                                                                        features: e
                                                                                                    })
                                                                                                }
                                                                                            case "v1":
                                                                                                return Object.assign(Object.assign({}, t), {
                                                                                                    supports_sign_and_send_transactions: !0,
                                                                                                    supports_clone_authorization: t.features.includes(k)
                                                                                                })
                                                                                        }
                                                                                        return t
                                                                                    }(t, a, r)
                                                                            })
                                                                        }), e[t]),
                                                                        defineProperty: () => !1,
                                                                        deleteProperty: () => !1
                                                                    }));
                                                                    try {
                                                                        t((yield e(f)))
                                                                    } catch (e) {
                                                                        u(e)
                                                                    } finally {
                                                                        d(), h.close()
                                                                    }
                                                                }
                                                        }
                                                    }),
                                                    N = () => {
                                                        d && d(), c = {
                                                            __type: "connecting",
                                                            associationKeypair: i
                                                        }, void 0 === n && (n = Date.now()), (h = new WebSocket(s, ["com.solana.mobilewalletadapter.v1"])).addEventListener("open", f), h.addEventListener("close", y), h.addEventListener("error", M), h.addEventListener("message", m), d = () => {
                                                            window.clearTimeout(p), h.removeEventListener("open", f), h.removeEventListener("close", y), h.removeEventListener("error", M), h.removeEventListener("message", m)
                                                        }
                                                    };
                                                N()
                                            })
                                        })
                                    }(t => e(new Proxy({}, {
                                        get(e, n) {
                                            if (null == e[n]) switch (n) {
                                                case "signAndSendTransactions":
                                                    e[n] = function(e) {
                                                        var {
                                                            minContextSlot: n,
                                                            commitment: i,
                                                            skipPreflight: r,
                                                            maxRetries: s,
                                                            waitForCommitmentToSendNextTransaction: a,
                                                            transactions: o
                                                        } = e, l = P(e, ["minContextSlot", "commitment", "skipPreflight", "maxRetries", "waitForCommitmentToSendNextTransaction", "transactions"]);
                                                        return G(this, void 0, void 0, function*() {
                                                            let e = o.map(X),
                                                                c = {
                                                                    min_context_slot: n,
                                                                    commitment: i,
                                                                    skip_preflight: r,
                                                                    max_retries: s,
                                                                    wait_for_commitment_to_send_next_transaction: a
                                                                },
                                                                {
                                                                    signatures: u
                                                                } = yield t.signAndSendTransactions(Object.assign(Object.assign(Object.assign({}, l), Object.values(c).some(e => null != e) ? {
                                                                    options: c
                                                                } : null), {
                                                                    payloads: e
                                                                }));
                                                            return u.map(J).map(_.encode)
                                                        })
                                                    };
                                                    break;
                                                case "signMessages":
                                                    e[n] = function(e) {
                                                        var {
                                                            payloads: n
                                                        } = e, i = P(e, ["payloads"]);
                                                        return G(this, void 0, void 0, function*() {
                                                            let e = n.map(H),
                                                                {
                                                                    signed_payloads: r
                                                                } = yield t.signMessages(Object.assign(Object.assign({}, i), {
                                                                    payloads: e
                                                                }));
                                                            return r.map(J)
                                                        })
                                                    };
                                                    break;
                                                case "signTransactions":
                                                    e[n] = function(e) {
                                                        var {
                                                            transactions: n
                                                        } = e, i = P(e, ["transactions"]);
                                                        return G(this, void 0, void 0, function*() {
                                                            let e = n.map(X),
                                                                {
                                                                    signed_payloads: r
                                                                } = yield t.signTransactions(Object.assign(Object.assign({}, i), {
                                                                    payloads: e
                                                                }));
                                                            return r.map(J).map(K)
                                                        })
                                                    };
                                                    break;
                                                default:
                                                    e[n] = t[n]
                                            }
                                            return e[n]
                                        },
                                        defineProperty: () => !1,
                                        deleteProperty: () => !1
                                    })), t)
                                })
                            }(e, n ? {
                                baseUri: n
                            } : void 0)
                        } catch (e) {
                            throw this._connectionGeneration !== i && (yield new Promise(() => {})), e instanceof Error && "SolanaMobileWalletAdapterError" === e.name && "ERROR_WALLET_NOT_FOUND" === e.code && (yield this._onWalletNotFound(this)), e
                        }
                    })
                }
                assertIsAuthorized() {
                    if (!this._authorizationResult || !this._selectedAddress) throw new O.oS;
                    return {
                        authToken: this._authorizationResult.auth_token,
                        selectedAddress: this._selectedAddress
                    }
                }
                performSignTransactions(e) {
                    return q(this, void 0, void 0, function*() {
                        let {
                            authToken: t
                        } = this.assertIsAuthorized();
                        try {
                            return yield this.transact(n => q(this, void 0, void 0, function*() {
                                return yield this.performReauthorization(n, t), yield n.signTransactions({
                                    transactions: e
                                })
                            }))
                        } catch (e) {
                            throw new O.PY(null == e ? void 0 : e.message, e)
                        }
                    })
                }
                sendTransaction(e, t, n) {
                    return q(this, void 0, void 0, function*() {
                        return yield this.runWithGuard(() => q(this, void 0, void 0, function*() {
                            let {
                                authToken: i
                            } = this.assertIsAuthorized(), r = null == n ? void 0 : n.minContextSlot;
                            try {
                                return yield this.transact(s => q(this, void 0, void 0, function*() {
                                    function a() {
                                        let e, i;
                                        switch (t.commitment) {
                                            case "confirmed":
                                            case "finalized":
                                            case "processed":
                                                e = t.commitment;
                                                break;
                                            default:
                                                e = "finalized"
                                        }
                                        switch (null == n ? void 0 : n.preflightCommitment) {
                                            case "confirmed":
                                            case "finalized":
                                            case "processed":
                                                i = n.preflightCommitment;
                                                break;
                                            case void 0:
                                                i = e;
                                                break;
                                            default:
                                                i = "finalized"
                                        }
                                        let r = "finalized" === i ? 2 : "confirmed" === i ? 1 : 0,
                                            s = "finalized" === e ? 2 : "confirmed" === e ? 1 : 0;
                                        return r < s ? i : e
                                    }
                                    let [o, l, c] = yield Promise.all([s.getCapabilities(), this.performReauthorization(s, i), et(e) ? null : q(this, void 0, void 0, function*() {
                                        var n;
                                        if (e.feePayer || (e.feePayer = null !== (n = this.publicKey) && void 0 !== n ? n : void 0), null == e.recentBlockhash) {
                                            let {
                                                blockhash: n
                                            } = yield t.getLatestBlockhash({
                                                commitment: a()
                                            });
                                            e.recentBlockhash = n
                                        }
                                    })]);
                                    if (o.supports_sign_and_send_transactions) return (yield s.signAndSendTransactions({
                                        minContextSlot: r,
                                        transactions: [e]
                                    }))[0]; {
                                        let [i] = yield s.signTransactions({
                                            transactions: [e]
                                        });
                                        if (et(i)) return yield t.sendTransaction(i); {
                                            let e = i.serialize();
                                            return yield t.sendRawTransaction(e, Object.assign(Object.assign({}, n), {
                                                preflightCommitment: a()
                                            }))
                                        }
                                    }
                                }))
                            } catch (e) {
                                throw new O.IW(null == e ? void 0 : e.message, e)
                            }
                        }))
                    })
                }
                signTransaction(e) {
                    return q(this, void 0, void 0, function*() {
                        return yield this.runWithGuard(() => q(this, void 0, void 0, function*() {
                            let [t] = yield this.performSignTransactions([e]);
                            return t
                        }))
                    })
                }
                signAllTransactions(e) {
                    return q(this, void 0, void 0, function*() {
                        return yield this.runWithGuard(() => q(this, void 0, void 0, function*() {
                            return yield this.performSignTransactions(e)
                        }))
                    })
                }
                signMessage(e) {
                    return q(this, void 0, void 0, function*() {
                        return yield this.runWithGuard(() => q(this, void 0, void 0, function*() {
                            let {
                                authToken: t,
                                selectedAddress: n
                            } = this.assertIsAuthorized();
                            try {
                                return yield this.transact(i => q(this, void 0, void 0, function*() {
                                    yield this.performReauthorization(i, t);
                                    let [r] = yield i.signMessages({
                                        addresses: [n],
                                        payloads: [e]
                                    });
                                    return r.slice(-64)
                                }))
                            } catch (e) {
                                throw new O.fk(null == e ? void 0 : e.message, e)
                            }
                        }))
                    })
                }
                signIn(e) {
                    return q(this, void 0, void 0, function*() {
                        return yield this.runWithGuard(() => q(this, void 0, void 0, function*() {
                            var t, n;
                            if (this._readyState !== L.i1.Installed && this._readyState !== L.i1.Loadable) throw new O.OZ;
                            this._connecting = !0;
                            try {
                                let i = yield this.performAuthorization(Object.assign(Object.assign({}, e), {
                                    domain: null !== (t = null == e ? void 0 : e.domain) && void 0 !== t ? t : window.location.host
                                }));
                                if (!i.sign_in_result) throw Error("Sign in failed, no sign in result returned by wallet");
                                let r = i.sign_in_result.address;
                                return {
                                    account: Object.assign(Object.assign({}, null !== (n = i.accounts.find(e => e.address == r)) && void 0 !== n ? n : {
                                        address: r
                                    }), {
                                        publicKey: $(r)
                                    }),
                                    signedMessage: $(i.sign_in_result.signed_message),
                                    signature: $(i.sign_in_result.signature)
                                }
                            } catch (e) {
                                throw new O.$w(e instanceof Error && e.message || "Unknown error", e)
                            } finally {
                                this._connecting = !1
                            }
                        }))
                    })
                }
            }
            let ei = "SolanaMobileWalletAdapterDefaultAuthorizationCache";

            function er(e) {
                return q(this, void 0, void 0, function*() {
                    "undefined" != typeof window && window.location.assign(e.url)
                })
            }
            var es = n(45587),
                ea = n(36822),
                eo = n(49321),
                el = n(51169);
            let ec = function(e) {
                return eo.V in e.features && el.k in e.features && (es.G in e.features || ea.R in e.features)
            };
            var eu = n(19931),
                eh = n(30685);
            let ed = "solana:signIn";
            var ep = n(35119);

            function eg(e) {
                switch (e) {
                    case "processed":
                    case "confirmed":
                    case "finalized":
                    case void 0:
                        return e;
                    case "recent":
                        return "processed";
                    case "single":
                    case "singleGossip":
                        return "confirmed";
                    case "max":
                    case "root":
                        return "finalized";
                    default:
                        return
                }
            }
            var ef = n(48459);
            new WeakMap, new WeakMap, new WeakMap, new WeakMap, new WeakMap, new WeakMap;
            var ey = function(e, t, n, i, r) {
                    if ("m" === i) throw TypeError("Private method is not writable");
                    if ("a" === i && !r) throw TypeError("Private accessor was defined without a setter");
                    if ("function" == typeof t ? e !== t || !r : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
                    return "a" === i ? r.call(e, n) : r ? r.value = n : t.set(e, n), n
                },
                eM = function(e, t, n, i) {
                    if ("a" === n && !i) throw TypeError("Private accessor was defined without a getter");
                    if ("function" == typeof t ? e !== t || !i : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
                    return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e)
                };
            class em extends L.mI {
                constructor({
                    wallet: e
                }) {
                    super(), o.add(this), l.set(this, void 0), c.set(this, void 0), u.set(this, void 0), h.set(this, void 0), d.set(this, void 0), p.set(this, void 0), g.set(this, void 0), f.set(this, "undefined" == typeof window || "undefined" == typeof document ? L.i1.Unsupported : L.i1.Installed), w.set(this, e => {
                        if ("accounts" in e) {
                            let e = eM(this, g, "f").accounts[0];
                            eM(this, l, "f") && !eM(this, h, "f") && e !== eM(this, l, "f") && (e ? eM(this, o, "m", M).call(this, e) : (this.emit("error", new O.at), eM(this, o, "m", m).call(this)))
                        }
                        "features" in e && eM(this, o, "m", N).call(this)
                    }), ey(this, g, e, "f"), ey(this, l, null, "f"), ey(this, c, null, "f"), ey(this, u, !1, "f"), ey(this, h, !1, "f"), ey(this, d, eM(this, g, "f").features[el.k].on("change", eM(this, w, "f")), "f"), eM(this, o, "m", N).call(this)
                }
                get name() {
                    return eM(this, g, "f").name
                }
                get url() {
                    return "https://github.com/solana-labs/wallet-standard"
                }
                get icon() {
                    return eM(this, g, "f").icon
                }
                get readyState() {
                    return eM(this, f, "f")
                }
                get publicKey() {
                    return eM(this, c, "f")
                }
                get connecting() {
                    return eM(this, u, "f")
                }
                get supportedTransactionVersions() {
                    return eM(this, p, "f")
                }
                get wallet() {
                    return eM(this, g, "f")
                }
                get standard() {
                    return !0
                }
                destroy() {
                    ey(this, l, null, "f"), ey(this, c, null, "f"), ey(this, u, !1, "f"), ey(this, h, !1, "f");
                    let e = eM(this, d, "f");
                    e && (ey(this, d, null, "f"), e())
                }
                async autoConnect() {
                    return eM(this, o, "m", y).call(this, {
                        silent: !0
                    })
                }
                async connect() {
                    return eM(this, o, "m", y).call(this)
                }
                async disconnect() {
                    if (ef.R in eM(this, g, "f").features) try {
                        ey(this, h, !0, "f"), await eM(this, g, "f").features[ef.R].disconnect()
                    } catch (e) {
                        this.emit("error", new O.UG(e ? .message, e))
                    } finally {
                        ey(this, h, !1, "f")
                    }
                    eM(this, o, "m", m).call(this)
                }
                async sendTransaction(e, t, n = {}) {
                    try {
                        var i;
                        let r;
                        let s = eM(this, l, "f");
                        if (!s) throw new O.oS;
                        if (es.G in eM(this, g, "f").features) {
                            if (s.features.includes(es.G)) r = es.G;
                            else if (ea.R in eM(this, g, "f").features && s.features.includes(ea.R)) r = ea.R;
                            else throw new O.cO
                        } else if (ea.R in eM(this, g, "f").features) {
                            if (!s.features.includes(ea.R)) throw new O.cO;
                            r = ea.R
                        } else throw new O.p6;
                        let a = (i = t.rpcEndpoint).includes("https://api.mainnet-beta.solana.com") ? ep.aI : /\bdevnet\b/i.test(i) ? ep.BR : /\btestnet\b/i.test(i) ? ep.gv : /\blocalhost\b/i.test(i) || /\b127\.0\.0\.1\b/.test(i) ? ep.l1 : ep.aI;
                        if (!s.chains.includes(a)) throw new O.IW;
                        try {
                            let i;
                            let {
                                signers: o,
                                ...l
                            } = n;
                            if ((0, eu.W)(e) ? (o ? .length && e.sign(o), i = e.serialize()) : (e = await this.prepareTransaction(e, t, l), o ? .length && e.partialSign(...o), i = new Uint8Array(e.serialize({
                                    requireAllSignatures: !1,
                                    verifySignatures: !1
                                }))), r === es.G) {
                                let [e] = await eM(this, g, "f").features[es.G].signAndSendTransaction({
                                    account: s,
                                    chain: a,
                                    transaction: i,
                                    options: {
                                        preflightCommitment: eg(l.preflightCommitment || t.commitment),
                                        skipPreflight: l.skipPreflight,
                                        maxRetries: l.maxRetries,
                                        minContextSlot: l.minContextSlot
                                    }
                                });
                                return _.encode(e.signature)
                            } {
                                let [e] = await eM(this, g, "f").features[ea.R].signTransaction({
                                    account: s,
                                    chain: a,
                                    transaction: i,
                                    options: {
                                        preflightCommitment: eg(l.preflightCommitment || t.commitment),
                                        minContextSlot: l.minContextSlot
                                    }
                                });
                                return await t.sendRawTransaction(e.signedTransaction, { ...l,
                                    preflightCommitment: eg(l.preflightCommitment || t.commitment)
                                })
                            }
                        } catch (e) {
                            if (e instanceof O.lj) throw e;
                            throw new O.IW(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
            }
            l = new WeakMap, c = new WeakMap, u = new WeakMap, h = new WeakMap, d = new WeakMap, p = new WeakMap, g = new WeakMap, f = new WeakMap, w = new WeakMap, o = new WeakSet, y = async function(e) {
                try {
                    if (this.connected || this.connecting) return;
                    if (eM(this, f, "f") !== L.i1.Installed) throw new O.OZ;
                    if (ey(this, u, !0, "f"), !eM(this, g, "f").accounts.length) try {
                        await eM(this, g, "f").features[eo.V].connect(e)
                    } catch (e) {
                        throw new O.$w(e ? .message, e)
                    }
                    let t = eM(this, g, "f").accounts[0];
                    if (!t) throw new O.cO;
                    eM(this, o, "m", M).call(this, t)
                } catch (e) {
                    throw this.emit("error", e), e
                } finally {
                    ey(this, u, !1, "f")
                }
            }, M = function(e) {
                let t;
                try {
                    t = new v.nh(e.address)
                } catch (e) {
                    throw new O.Nx(e ? .message, e)
                }
                ey(this, l, e, "f"), ey(this, c, t, "f"), eM(this, o, "m", N).call(this), this.emit("connect", t)
            }, m = function() {
                ey(this, l, null, "f"), ey(this, c, null, "f"), eM(this, o, "m", N).call(this), this.emit("disconnect")
            }, N = function() {
                let e = es.G in eM(this, g, "f").features ? eM(this, g, "f").features[es.G].supportedTransactionVersions : eM(this, g, "f").features[ea.R].supportedTransactionVersions;
                ey(this, p, ! function(e, t) {
                    if (e === t) return !0;
                    let n = e.length;
                    if (n !== t.length) return !1;
                    for (let i = 0; i < n; i++)
                        if (e[i] !== t[i]) return !1;
                    return !0
                }(e, ["legacy"]) ? new Set(e) : null, "f"), ea.R in eM(this, g, "f").features && eM(this, l, "f") ? .features.includes(ea.R) ? (this.signTransaction = eM(this, o, "m", T), this.signAllTransactions = eM(this, o, "m", j)) : (delete this.signTransaction, delete this.signAllTransactions), eh.g in eM(this, g, "f").features && eM(this, l, "f") ? .features.includes(eh.g) ? this.signMessage = eM(this, o, "m", S) : delete this.signMessage, ed in eM(this, g, "f").features ? this.signIn = eM(this, o, "m", D) : delete this.signIn
            }, T = async function(e) {
                try {
                    let t = eM(this, l, "f");
                    if (!t) throw new O.oS;
                    if (!(ea.R in eM(this, g, "f").features)) throw new O.p6;
                    if (!t.features.includes(ea.R)) throw new O.cO;
                    try {
                        let n = (await eM(this, g, "f").features[ea.R].signTransaction({
                            account: t,
                            transaction: (0, eu.W)(e) ? e.serialize() : new Uint8Array(e.serialize({
                                requireAllSignatures: !1,
                                verifySignatures: !1
                            }))
                        }))[0].signedTransaction;
                        return (0, eu.W)(e) ? v.GS.deserialize(n) : v.YW.from(n)
                    } catch (e) {
                        if (e instanceof O.lj) throw e;
                        throw new O.PY(e ? .message, e)
                    }
                } catch (e) {
                    throw this.emit("error", e), e
                }
            }, j = async function(e) {
                try {
                    let t = eM(this, l, "f");
                    if (!t) throw new O.oS;
                    if (!(ea.R in eM(this, g, "f").features)) throw new O.p6;
                    if (!t.features.includes(ea.R)) throw new O.cO;
                    try {
                        let n = await eM(this, g, "f").features[ea.R].signTransaction(...e.map(e => ({
                            account: t,
                            transaction: (0, eu.W)(e) ? e.serialize() : new Uint8Array(e.serialize({
                                requireAllSignatures: !1,
                                verifySignatures: !1
                            }))
                        })));
                        return e.map((e, t) => {
                            let i = n[t].signedTransaction;
                            return (0, eu.W)(e) ? v.GS.deserialize(i) : v.YW.from(i)
                        })
                    } catch (e) {
                        throw new O.PY(e ? .message, e)
                    }
                } catch (e) {
                    throw this.emit("error", e), e
                }
            }, S = async function(e) {
                try {
                    let t = eM(this, l, "f");
                    if (!t) throw new O.oS;
                    if (!(eh.g in eM(this, g, "f").features)) throw new O.p6;
                    if (!t.features.includes(eh.g)) throw new O.cO;
                    try {
                        return (await eM(this, g, "f").features[eh.g].signMessage({
                            account: t,
                            message: e
                        }))[0].signature
                    } catch (e) {
                        throw new O.fk(e ? .message, e)
                    }
                } catch (e) {
                    throw this.emit("error", e), e
                }
            }, D = async function(e = {}) {
                try {
                    let t;
                    if (!(ed in eM(this, g, "f").features)) throw new O.p6;
                    try {
                        [t] = await eM(this, g, "f").features[ed].signIn(e)
                    } catch (e) {
                        throw new O.bD(e ? .message, e)
                    }
                    if (!t) throw new O.bD;
                    return eM(this, o, "m", M).call(this, t.account), t
                } catch (e) {
                    throw this.emit("error", e), e
                }
            };
            var eN = function(e, t, n, i, r) {
                    if ("m" === i) throw TypeError("Private method is not writable");
                    if ("a" === i && !r) throw TypeError("Private accessor was defined without a setter");
                    if ("function" == typeof t ? e !== t || !r : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
                    return "a" === i ? r.call(e, n) : r ? r.value = n : t.set(e, n), n
                },
                ew = function(e, t, n, i) {
                    if ("a" === n && !i) throw TypeError("Private accessor was defined without a getter");
                    if ("function" == typeof t ? e !== t || !i : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
                    return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e)
                };
            let eT = new Set,
                ej = {};

            function eS(...e) {
                return (e = e.filter(e => !eT.has(e))).length ? (e.forEach(e => eT.add(e)), ej.register ? .forEach(t => eE(() => t(...e))), function() {
                    e.forEach(e => eT.delete(e)), ej.unregister ? .forEach(t => eE(() => t(...e)))
                }) : () => {}
            }

            function eD() {
                return [...eT]
            }

            function eU(e, t) {
                return ej[e] ? .push(t) || (ej[e] = [t]),
                    function() {
                        ej[e] = ej[e] ? .filter(e => t !== e)
                    }
            }

            function eE(e) {
                try {
                    e()
                } catch (e) {
                    console.error(e)
                }
            }
            class eb extends Event {
                constructor(e) {
                    super("wallet-standard:app-ready", {
                        bubbles: !1,
                        cancelable: !1,
                        composed: !1
                    }), U.set(this, void 0), eN(this, U, e, "f")
                }
                get detail() {
                    return ew(this, U, "f")
                }
                get type() {
                    return "wallet-standard:app-ready"
                }
                preventDefault() {
                    throw Error("preventDefault cannot be called")
                }
                stopImmediatePropagation() {
                    throw Error("stopImmediatePropagation cannot be called")
                }
                stopPropagation() {
                    throw Error("stopPropagation cannot be called")
                }
            }
            U = new WeakMap;
            var eL = n(2265);

            function eO(e) {
                let t = (0, eL.useRef)();
                return t.current || (t.current = {
                    value: e()
                }), t.current.value
            }

            function ev(e) {
                return e.filter(ec).map(e => new em({
                    wallet: e
                }))
            }(a = E || (E = {}))[a.DESKTOP_WEB = 0] = "DESKTOP_WEB", a[a.MOBILE_WEB = 1] = "MOBILE_WEB";
            var ez = n(61811);
            class eI extends O.lj {
                constructor() {
                    super(...arguments), this.name = "WalletNotSelectedError"
                }
            }
            var ex = n(28782);

            function eR({
                children: e,
                wallets: t,
                adapter: n,
                isUnloadingRef: i,
                onAutoConnectRequest: r,
                onConnectError: s,
                onError: a,
                onSelectWallet: o
            }) {
                let l = (0, eL.useRef)(!1),
                    [c, u] = (0, eL.useState)(!1),
                    h = (0, eL.useRef)(!1),
                    [d, p] = (0, eL.useState)(!1),
                    [g, f] = (0, eL.useState)(() => n ? .publicKey ? ? null),
                    [y, M] = (0, eL.useState)(() => n ? .connected ? ? !1),
                    m = (0, eL.useRef)(a);
                (0, eL.useEffect)(() => (m.current = a, () => {
                    m.current = void 0
                }), [a]);
                let N = (0, eL.useRef)((e, t) => (!i.current && (m.current ? m.current(e, t) : (console.error(e, t), e instanceof O.OZ && "undefined" != typeof window && t && window.open(t.url, "_blank"))), e)),
                    [w, T] = (0, eL.useState)(() => t.map(e => ({
                        adapter: e,
                        readyState: e.readyState
                    })).filter(({
                        readyState: e
                    }) => e !== L.i1.Unsupported));
                (0, eL.useEffect)(() => {
                    function e(e) {
                        T(t => {
                            let n = t.findIndex(({
                                adapter: e
                            }) => e === this);
                            if (-1 === n) return t;
                            let {
                                adapter: i
                            } = t[n];
                            return [...t.slice(0, n), {
                                adapter: i,
                                readyState: e
                            }, ...t.slice(n + 1)].filter(({
                                readyState: e
                            }) => e !== L.i1.Unsupported)
                        })
                    }
                    return T(e => t.map((t, n) => {
                        let i = e[n];
                        return i && i.adapter === t && i.readyState === t.readyState ? i : {
                            adapter: t,
                            readyState: t.readyState
                        }
                    }).filter(({
                        readyState: e
                    }) => e !== L.i1.Unsupported)), t.forEach(t => t.on("readyStateChange", e, t)), () => {
                        t.forEach(t => t.off("readyStateChange", e, t))
                    }
                }, [n, t]);
                let j = (0, eL.useMemo)(() => w.find(e => e.adapter === n) ? ? null, [n, w]);
                (0, eL.useEffect)(() => {
                    if (!n) return;
                    let e = e => {
                            f(e), l.current = !1, u(!1), M(!0), h.current = !1, p(!1)
                        },
                        t = () => {
                            i.current || (f(null), l.current = !1, u(!1), M(!1), h.current = !1, p(!1))
                        },
                        r = e => {
                            N.current(e, n)
                        };
                    return n.on("connect", e), n.on("disconnect", t), n.on("error", r), () => {
                        n.off("connect", e), n.off("disconnect", t), n.off("error", r), t()
                    }
                }, [n, i]);
                let S = (0, eL.useRef)(!1);
                (0, eL.useEffect)(() => () => {
                    S.current = !1
                }, [n]), (0, eL.useEffect)(() => {
                    S.current || l.current || y || !r || j ? .readyState !== L.i1.Installed && j ? .readyState !== L.i1.Loadable || (l.current = !0, u(!0), S.current = !0, async function() {
                        try {
                            await r()
                        } catch {
                            s()
                        } finally {
                            u(!1), l.current = !1
                        }
                    }())
                }, [y, r, s, j]);
                let D = (0, eL.useCallback)(async (e, t, i) => {
                        if (!n) throw N.current(new eI);
                        if (!y) throw N.current(new O.oS, n);
                        return await n.sendTransaction(e, t, i)
                    }, [n, y]),
                    U = (0, eL.useMemo)(() => n && "signTransaction" in n ? async e => {
                        if (!y) throw N.current(new O.oS, n);
                        return await n.signTransaction(e)
                    } : void 0, [n, y]),
                    E = (0, eL.useMemo)(() => n && "signAllTransactions" in n ? async e => {
                        if (!y) throw N.current(new O.oS, n);
                        return await n.signAllTransactions(e)
                    } : void 0, [n, y]),
                    b = (0, eL.useMemo)(() => n && "signMessage" in n ? async e => {
                        if (!y) throw N.current(new O.oS, n);
                        return await n.signMessage(e)
                    } : void 0, [n, y]),
                    v = (0, eL.useMemo)(() => n && "signIn" in n ? async e => await n.signIn(e) : void 0, [n]),
                    z = (0, eL.useCallback)(async () => {
                        if (l.current || h.current || j ? .adapter.connected) return;
                        if (!j) throw N.current(new eI);
                        let {
                            adapter: e,
                            readyState: t
                        } = j;
                        if (!(t === L.i1.Installed || t === L.i1.Loadable)) throw N.current(new O.OZ, e);
                        l.current = !0, u(!0);
                        try {
                            await e.connect()
                        } catch (e) {
                            throw s(), e
                        } finally {
                            u(!1), l.current = !1
                        }
                    }, [s, j]),
                    I = (0, eL.useCallback)(async () => {
                        if (!h.current && n) {
                            h.current = !0, p(!0);
                            try {
                                await n.disconnect()
                            } finally {
                                p(!1), h.current = !1
                            }
                        }
                    }, [n]);
                return eL.createElement(ex.z.Provider, {
                    value: {
                        autoConnect: !!r,
                        wallets: w,
                        wallet: j,
                        publicKey: g,
                        connected: y,
                        connecting: c,
                        disconnecting: d,
                        select: o,
                        connect: z,
                        disconnect: I,
                        sendTransaction: D,
                        signTransaction: U,
                        signAllTransactions: E,
                        signMessage: b,
                        signIn: v
                    }
                }, e)
            }

            function eF(e) {
                return function({
                    adapters: e,
                    userAgentString: t
                }) {
                    return e.some(e => e.name !== ee && e.readyState === L.i1.Installed) ? E.DESKTOP_WEB : t && /android/i.test(t) && !/(WebView|Version\/.+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|; wv\).+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+))/i.test(t) ? E.MOBILE_WEB : E.DESKTOP_WEB
                }({
                    adapters: e,
                    userAgentString: (void 0 === r && (r = globalThis.navigator ? .userAgent ? ? null), r)
                }) === E.MOBILE_WEB
            }

            function ek({
                children: e,
                wallets: t,
                autoConnect: n,
                localStorageKey: i = "walletName",
                onError: r
            }) {
                let {
                    connection: a
                } = (0, ez.R)(), o = function(e) {
                    let t = eO(() => new Set),
                        {
                            get: n,
                            on: i
                        } = eO(() => (function() {
                            if (s || (s = function() {
                                    if (s || (s = Object.freeze({
                                            register: eS,
                                            get: eD,
                                            on: eU
                                        }), "undefined" == typeof window)) return s;
                                    let e = Object.freeze({
                                        register: eS
                                    });
                                    try {
                                        window.addEventListener("wallet-standard:register-wallet", ({
                                            detail: t
                                        }) => t(e))
                                    } catch (e) {
                                        console.error("wallet-standard:register-wallet event listener could not be added\n", e)
                                    }
                                    try {
                                        window.dispatchEvent(new eb(e))
                                    } catch (e) {
                                        console.error("wallet-standard:app-ready event could not be dispatched\n", e)
                                    }
                                    return s
                                }(), "undefined" == typeof window)) return s;
                            let e = window.navigator.wallets || [];
                            if (!Array.isArray(e)) return console.error("window.navigator.wallets is not an array"), s;
                            let {
                                register: t
                            } = s, n = (...e) => e.forEach(e => eE(() => e({
                                register: t
                            })));
                            try {
                                Object.defineProperty(window.navigator, "wallets", {
                                    value: Object.freeze({
                                        push: n
                                    })
                                })
                            } catch (e) {
                                return console.error("window.navigator.wallets could not be set"), s
                            }
                            return n(...e), s
                        })()),
                        [r, a] = (0, eL.useState)(() => ev(n()));
                    (0, eL.useEffect)(() => {
                        let e = [i("register", (...e) => a(t => [...t, ...ev(e)])), i("unregister", (...e) => a(t => t.filter(t => e.some(e => e === t.wallet))))];
                        return () => e.forEach(e => e())
                    }, [i]);
                    let o = function(e) {
                        let t = (0, eL.useRef)();
                        return (0, eL.useEffect)(() => {
                            t.current = e
                        }), t.current
                    }(r);
                    return (0, eL.useEffect)(() => {
                        if (!o) return;
                        let e = new Set(r);
                        new Set(o.filter(t => !e.has(t))).forEach(e => e.destroy())
                    }, [o, r]), (0, eL.useEffect)(() => () => r.forEach(e => e.destroy()), []), (0, eL.useMemo)(() => [...r, ...e.filter(({
                        name: e
                    }) => !r.some(t => t.name === e) || (t.has(e) || (t.add(e), console.warn(`${e} was registered as a Standard Wallet. The Wallet Adapter for ${e} can be removed from your app.`)), !1))], [r, e, t])
                }(t), l = (0, eL.useMemo)(() => {
                    var e;
                    if (!eF(o)) return null;
                    let t = o.find(e => e.name === ee);
                    return t || new en({
                        addressSelector: {
                            select(e) {
                                return q(this, void 0, void 0, function*() {
                                    return e[0]
                                })
                            }
                        },
                        appIdentity: {
                            uri: function() {
                                let e = globalThis.location;
                                if (e) return `${e.protocol}//${e.host}`
                            }()
                        },
                        authorizationResultCache: function() {
                            let e;
                            try {
                                e = window.localStorage
                            } catch (e) {}
                            return {
                                clear() {
                                    return q(this, void 0, void 0, function*() {
                                        if (e) try {
                                            e.removeItem(ei)
                                        } catch (e) {}
                                    })
                                },
                                get() {
                                    return q(this, void 0, void 0, function*() {
                                        if (e) try {
                                            return JSON.parse(e.getItem(ei)) || void 0
                                        } catch (e) {}
                                    })
                                },
                                set(t) {
                                    return q(this, void 0, void 0, function*() {
                                        if (e) try {
                                            e.setItem(ei, JSON.stringify(t))
                                        } catch (e) {}
                                    })
                                }
                            }
                        }(),
                        cluster: (e = a ? .rpcEndpoint) ? /devnet/i.test(e) ? "devnet" : /testnet/i.test(e) ? "testnet" : "mainnet-beta" : "mainnet-beta",
                        onWalletNotFound: er
                    })
                }, [o, a ? .rpcEndpoint]), c = (0, eL.useMemo)(() => null == l || -1 !== o.indexOf(l) ? o : [l, ...o], [o, l]), [u, h] = function(e, t) {
                    let n = (0, eL.useState)(() => {
                            try {
                                let t = localStorage.getItem(e);
                                if (t) return JSON.parse(t)
                            } catch (e) {
                                "undefined" != typeof window && console.error(e)
                            }
                            return t
                        }),
                        i = n[0],
                        r = (0, eL.useRef)(!0);
                    return (0, eL.useEffect)(() => {
                        if (r.current) {
                            r.current = !1;
                            return
                        }
                        try {
                            null === i ? localStorage.removeItem(e) : localStorage.setItem(e, JSON.stringify(i))
                        } catch (e) {
                            "undefined" != typeof window && console.error(e)
                        }
                    }, [i, e]), n
                }(i, eF(o) ? ee : null), d = (0, eL.useMemo)(() => c.find(e => e.name === u) ? ? null, [c, u]), p = (0, eL.useCallback)(e => {
                    u !== e && (d && d.name !== ee && d.disconnect(), h(e))
                }, [d, h, u]);
                (0, eL.useEffect)(() => {
                    if (d) return d.on("disconnect", e), () => {
                        d.off("disconnect", e)
                    };

                    function e() {
                        !y.current && (u === ee && eF(o) || h(null))
                    }
                }, [d, o, h, u]);
                let g = (0, eL.useRef)(!1),
                    f = (0, eL.useMemo)(() => {
                        if (n && d) return async () => {
                            (!0 === n || await n(d)) && (g.current ? await d.connect() : await d.autoConnect())
                        }
                    }, [n, d]),
                    y = (0, eL.useRef)(!1);
                (0, eL.useEffect)(() => {
                    if (u === ee && eF(o)) {
                        y.current = !1;
                        return
                    }

                    function e() {
                        y.current = !0
                    }
                    return window.addEventListener("beforeunload", e), () => {
                        window.removeEventListener("beforeunload", e)
                    }
                }, [o, u]);
                let M = (0, eL.useCallback)(() => {
                        d && d.name !== ee && p(null)
                    }, [d, p]),
                    m = (0, eL.useCallback)(e => {
                        g.current = !0, p(e)
                    }, [p]);
                return eL.createElement(eR, {
                    wallets: c,
                    adapter: d,
                    isUnloadingRef: y,
                    onAutoConnectRequest: f,
                    onConnectError: M,
                    onError: r,
                    onSelectWallet: m
                }, e)
            }
        },
        33494: function(e, t, n) {
            "use strict";
            n.d(t, {
                e: function() {
                    return V
                }
            });
            var i, r, s, a, o, l, c, u, h, d, p, g, f, y, M, m = n(74750),
                N = n(50277),
                w = n(59860),
                T = n(19931),
                j = n(45429),
                S = function(e, t, n, i, r) {
                    if ("m" === i) throw TypeError("Private method is not writable");
                    if ("a" === i && !r) throw TypeError("Private accessor was defined without a setter");
                    if ("function" == typeof t ? e !== t || !r : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
                    return "a" === i ? r.call(e, n) : r ? r.value = n : t.set(e, n), n
                },
                D = function(e, t, n, i) {
                    if ("a" === n && !i) throw TypeError("Private accessor was defined without a getter");
                    if ("function" == typeof t ? e !== t || !i : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
                    return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e)
                };
            class U extends Event {
                constructor(e) {
                    super("wallet-standard:register-wallet", {
                        bubbles: !1,
                        cancelable: !1,
                        composed: !1
                    }), i.set(this, void 0), S(this, i, e, "f")
                }
                get detail() {
                    return D(this, i, "f")
                }
                get type() {
                    return "wallet-standard:register-wallet"
                }
                preventDefault() {
                    throw Error("preventDefault cannot be called")
                }
                stopImmediatePropagation() {
                    throw Error("stopImmediatePropagation cannot be called")
                }
                stopPropagation() {
                    throw Error("stopPropagation cannot be called")
                }
            }
            i = new WeakMap;
            var E = n(35119),
                b = n(45587),
                L = n(36822),
                O = n(30685),
                v = n(49321),
                z = n(48459),
                I = n(51169),
                x = function(e, t, n, i) {
                    if ("a" === n && !i) throw TypeError("Private accessor was defined without a getter");
                    if ("function" == typeof t ? e !== t || !i : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it");
                    return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e)
                },
                R = function(e, t, n, i, r) {
                    if ("m" === i) throw TypeError("Private method is not writable");
                    if ("a" === i && !r) throw TypeError("Private accessor was defined without a setter");
                    if ("function" == typeof t ? e !== t || !r : !t.has(e)) throw TypeError("Cannot write private member to an object whose class did not declare it");
                    return "a" === i ? r.call(e, n) : r ? r.value = n : t.set(e, n), n
                };
            class F {
                constructor() {
                    r.add(this), s.set(this, {}), a.set(this, "1.0.0"), o.set(this, "MetaMask"), l.set(this, "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMzEgMzEiIHdpZHRoPSIzMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIwLjI1IiB4Mj0iMjYuNTcxIiB5MT0iMjcuMTczIiB5Mj0iMTkuODU4Ij48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzk5NDVmZiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiM4NzUyZjMiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTQ5N2Q1Ii8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iIzQzYjRjYSIvPjxzdG9wIG9mZnNldD0iLjcyIiBzdG9wLWNvbG9yPSIjMjhlMGI5Ii8+PHN0b3Agb2Zmc2V0PSIuOTciIHN0b3AtY29sb3I9IiMxOWZiOWIiLz48L2xpbmVhckdyYWRpZW50PjxnIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjA5NCI+PHBhdGggZD0ibTI2LjEwOSAzLjY0My05LjM2OSA2Ljk1OSAxLjczMy00LjEwNSA3LjYzNy0yLjg1M3oiIGZpbGw9IiNlMjc2MWIiIHN0cm9rZT0iI2UyNzYxYiIvPjxnIGZpbGw9IiNlNDc2MWIiIHN0cm9rZT0iI2U0NzYxYiI+PHBhdGggZD0ibTQuNDgxIDMuNjQzIDkuMjk0IDcuMDI0LTEuNjQ4LTQuMTcxem0xOC4yNTggMTYuMTMtMi40OTUgMy44MjMgNS4zMzkgMS40NjkgMS41MzUtNS4yMDctNC4zNzgtLjA4NXptLTE5LjI0Ny4wODUgMS41MjUgNS4yMDcgNS4zMzktMS40NjktMi40OTUtMy44MjN6Ii8+PHBhdGggZD0ibTEwLjA1NSAxMy4zMTMtMS40ODggMi4yNTEgNS4zMDEuMjM1LS4xODgtNS42OTd6bTEwLjQ4IDAtMy42NzItMy4yNzctLjEyMiA1Ljc2MyA1LjI5Mi0uMjM1LTEuNDk3LTIuMjUxem0tMTAuMTc4IDEwLjI4MyAzLjE4My0xLjU1NC0yLjc0OS0yLjE0Ny0uNDMzIDMuNzAxem02LjY5NS0xLjU1NCAzLjE5MiAxLjU1NC0uNDQzLTMuNzAxeiIvPjwvZz48cGF0aCBkPSJtMjAuMjQ0IDIzLjU5Ni0zLjE5Mi0xLjU1NC4yNTQgMi4wODEtLjAyOC44NzZ6bS05Ljg4NyAwIDIuOTY2IDEuNDAzLS4wMTktLjg3Ni4yMzUtMi4wODEtMy4xODMgMS41NTR6IiBmaWxsPSIjZDdjMWIzIiBzdHJva2U9IiNkN2MxYjMiLz48cGF0aCBkPSJtMTMuMzY5IDE4LjUyMS0yLjY1NS0uNzgxIDEuODc0LS44NTd6bTMuODUxIDAgLjc4MS0xLjYzOCAxLjg4My44NTctMi42NjUuNzgxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEwLjM1NyAyMy41OTYuNDUyLTMuODIzLTIuOTQ3LjA4NXptOS40MzUtMy44MjMuNDUyIDMuODIzIDIuNDk1LTMuNzM4em0yLjI0MS00LjIwOS01LjI5Mi4yMzUuNDkgMi43MjEuNzgyLTEuNjM4IDEuODgzLjg1N3ptLTExLjMxOCAyLjE3NSAxLjg4My0uODU3Ljc3MiAxLjYzOC40OTktMi43MjEtNS4zMDEtLjIzNXoiIGZpbGw9IiNjZDYxMTYiIHN0cm9rZT0iI2NkNjExNiIvPjxwYXRoIGQ9Im04LjU2NyAxNS41NjQgMi4yMjIgNC4zMzEtLjA3NS0yLjE1NnptMTEuMzI4IDIuMTc1LS4wOTQgMi4xNTYgMi4yMzItNC4zMzEtMi4xMzcgMi4xNzV6bS02LjAyNi0xLjk0LS40OTkgMi43MjEuNjIxIDMuMjExLjE0MS00LjIyOC0uMjY0LTEuNzA0em0yLjg3MiAwLS4yNTQgMS42OTUuMTEzIDQuMjM3LjYzMS0zLjIxMXoiIGZpbGw9IiNlNDc1MWYiIHN0cm9rZT0iI2U0NzUxZiIvPjxwYXRoIGQ9Im0xNy4yMyAxOC41Mi0uNjMxIDMuMjExLjQ1Mi4zMTEgMi43NS0yLjE0Ny4wOTQtMi4xNTZ6bS02LjUxNi0uNzgxLjA3NSAyLjE1NiAyLjc1IDIuMTQ3LjQ1Mi0uMzExLS42MjItMy4yMTF6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48cGF0aCBkPSJtMTcuMjc3IDI0Ljk5OS4wMjgtLjg3Ni0uMjM1LS4yMDdoLTMuNTVsLS4yMTcuMjA3LjAxOS44NzYtMi45NjYtMS40MDMgMS4wMzYuODQ4IDIuMSAxLjQ1OWgzLjYwNmwyLjEwOS0xLjQ1OSAxLjAzNi0uODQ4eiIgZmlsbD0iI2MwYWQ5ZSIgc3Ryb2tlPSIjYzBhZDllIi8+PHBhdGggZD0ibTE3LjA1MSAyMi4wNDItLjQ1Mi0uMzExaC0yLjYwOGwtLjQ1Mi4zMTEtLjIzNSAyLjA4MS4yMTctLjIwN2gzLjU1bC4yMzUuMjA3LS4yNTQtMi4wODF6IiBmaWxsPSIjMTYxNjE2IiBzdHJva2U9IiMxNjE2MTYiLz48cGF0aCBkPSJtMjYuNTA1IDExLjA1My44LTMuODQyLTEuMTk2LTMuNTY5LTkuMDU4IDYuNzIzIDMuNDg0IDIuOTQ3IDQuOTI1IDEuNDQxIDEuMDkyLTEuMjcxLS40NzEtLjMzOS43NTMtLjY4Ny0uNTg0LS40NTIuNzUzLS41NzQtLjQ5OS0uMzc3em0tMjMuMjExLTMuODQxLjggMy44NDItLjUwOC4zNzcuNzUzLjU3NC0uNTc0LjQ1Mi43NTMuNjg3LS40NzEuMzM5IDEuMDgzIDEuMjcxIDQuOTI1LTEuNDQxIDMuNDg0LTIuOTQ3LTkuMDU5LTYuNzIzeiIgZmlsbD0iIzc2M2QxNiIgc3Ryb2tlPSIjNzYzZDE2Ii8+PHBhdGggZD0ibTI1LjQ2IDE0Ljc1NC00LjkyNS0xLjQ0MSAxLjQ5NyAyLjI1MS0yLjIzMiA0LjMzMSAyLjkzOC0uMDM4aDQuMzc4bC0xLjY1Ny01LjEwNHptLTE1LjQwNS0xLjQ0MS00LjkyNSAxLjQ0MS0xLjYzOCA1LjEwNGg0LjM2OWwyLjkyOC4wMzgtMi4yMjItNC4zMzEgMS40ODgtMi4yNTF6bTYuNjg1IDIuNDg2LjMxMS01LjQzMyAxLjQzMS0zLjg3aC02LjM1NmwxLjQxMyAzLjg3LjMyOSA1LjQzMy4xMTMgMS43MTQuMDA5IDQuMjE5aDIuNjFsLjAxOS00LjIxOS4xMjItMS43MTR6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48L2c+PGNpcmNsZSBjeD0iMjMuNSIgY3k9IjIzLjUiIGZpbGw9IiMwMDAiIHI9IjYuNSIvPjxwYXRoIGQ9Im0yNy40NzMgMjUuNTQ1LTEuMzEgMS4zNjhjLS4wMjkuMDMtLjA2My4wNTMtLjEwMS4wN2EuMzEuMzEgMCAwIDEgLS4xMjEuMDI0aC02LjIwOWMtLjAzIDAtLjA1OS0uMDA4LS4wODMtLjAyNGEuMTUuMTUgMCAwIDEgLS4wNTYtLjA2NWMtLjAxMi0uMDI2LS4wMTUtLjA1Ni0uMDEtLjA4NHMuMDE4LS4wNTUuMDM5LS4wNzZsMS4zMTEtMS4zNjhjLjAyOC0uMDMuMDYzLS4wNTMuMTAxLS4wNjlhLjMxLjMxIDAgMCAxIC4xMjEtLjAyNWg2LjIwOGMuMDMgMCAuMDU5LjAwOC4wODMuMDI0YS4xNS4xNSAwIDAgMSAuMDU2LjA2NWMuMDEyLjAyNi4wMTUuMDU2LjAxLjA4NHMtLjAxOC4wNTUtLjAzOS4wNzZ6bS0xLjMxLTIuNzU2Yy0uMDI5LS4wMy0uMDYzLS4wNTMtLjEwMS0uMDdhLjMxLjMxIDAgMCAwIC0uMTIxLS4wMjRoLTYuMjA5Yy0uMDMgMC0uMDU5LjAwOC0uMDgzLjAyNHMtLjA0NC4wMzgtLjA1Ni4wNjUtLjAxNS4wNTYtLjAxLjA4NC4wMTguMDU1LjAzOS4wNzZsMS4zMTEgMS4zNjhjLjAyOC4wMy4wNjMuMDUzLjEwMS4wNjlhLjMxLjMxIDAgMCAwIC4xMjEuMDI1aDYuMjA4Yy4wMyAwIC4wNTktLjAwOC4wODMtLjAyNGEuMTUuMTUgMCAwIDAgLjA1Ni0uMDY1Yy4wMTItLjAyNi4wMTUtLjA1Ni4wMS0uMDg0cy0uMDE4LS4wNTUtLjAzOS0uMDc2em0tNi40MzEtLjk4M2g2LjIwOWEuMzEuMzEgMCAwIDAgLjEyMS0uMDI0Yy4wMzgtLjAxNi4wNzMtLjA0LjEwMS0uMDdsMS4zMS0xLjM2OGMuMDItLjAyMS4wMzQtLjA0Ny4wMzktLjA3NnMuMDAxLS4wNTgtLjAxLS4wODRhLjE1LjE1IDAgMCAwIC0uMDU2LS4wNjVjLS4wMjUtLjAxNi0uMDU0LS4wMjQtLjA4My0uMDI0aC02LjIwOGEuMzEuMzEgMCAwIDAgLS4xMjEuMDI1Yy0uMDM4LjAxNi0uMDcyLjA0LS4xMDEuMDY5bC0xLjMxIDEuMzY4Yy0uMDIuMDIxLS4wMzQuMDQ3LS4wMzkuMDc2cy0uMDAxLjA1OC4wMS4wODQuMDMxLjA0OS4wNTYuMDY1LjA1NC4wMjQuMDgzLjAyNHoiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4="), c.set(this, null), u.set(this, (e, t) => (x(this, s, "f")[e] ? .push(t) || (x(this, s, "f")[e] = [t]), () => x(this, r, "m", d).call(this, e, t))), p.set(this, async () => {
                        if (!x(this, c, "f")) {
                            let e;
                            try {
                                e = (await n.e(985).then(n.bind(n, 3985))).default
                            } catch (e) {
                                throw Error("Unable to load Solflare MetaMask SDK")
                            }
                            R(this, c, new e, "f"), x(this, c, "f").on("standard_change", e => x(this, r, "m", h).call(this, "change", e))
                        }
                        return this.accounts.length || await x(this, c, "f").connect(), {
                            accounts: this.accounts
                        }
                    }), g.set(this, async () => {
                        x(this, c, "f") && await x(this, c, "f").disconnect()
                    }), f.set(this, async (...e) => {
                        if (!x(this, c, "f")) throw new w.oS;
                        return await x(this, c, "f").standardSignAndSendTransaction(...e)
                    }), y.set(this, async (...e) => {
                        if (!x(this, c, "f")) throw new w.oS;
                        return await x(this, c, "f").standardSignTransaction(...e)
                    }), M.set(this, async (...e) => {
                        if (!x(this, c, "f")) throw new w.oS;
                        return await x(this, c, "f").standardSignMessage(...e)
                    })
                }
                get version() {
                    return x(this, a, "f")
                }
                get name() {
                    return x(this, o, "f")
                }
                get icon() {
                    return x(this, l, "f")
                }
                get chains() {
                    return [E.aI, E.BR, E.gv]
                }
                get features() {
                    return {
                        [v.V]: {
                            version: "1.0.0",
                            connect: x(this, p, "f")
                        },
                        [z.R]: {
                            version: "1.0.0",
                            disconnect: x(this, g, "f")
                        },
                        [I.k]: {
                            version: "1.0.0",
                            on: x(this, u, "f")
                        },
                        [b.G]: {
                            version: "1.0.0",
                            supportedTransactionVersions: ["legacy", 0],
                            signAndSendTransaction: x(this, f, "f")
                        },
                        [L.R]: {
                            version: "1.0.0",
                            supportedTransactionVersions: ["legacy", 0],
                            signTransaction: x(this, y, "f")
                        },
                        [O.g]: {
                            version: "1.0.0",
                            signMessage: x(this, M, "f")
                        }
                    }
                }
                get accounts() {
                    return x(this, c, "f") ? x(this, c, "f").standardAccounts : []
                }
            }
            s = new WeakMap, a = new WeakMap, o = new WeakMap, l = new WeakMap, c = new WeakMap, u = new WeakMap, p = new WeakMap, g = new WeakMap, f = new WeakMap, y = new WeakMap, M = new WeakMap, r = new WeakSet, h = function(e, ...t) {
                x(this, s, "f")[e] ? .forEach(e => e.apply(null, t))
            }, d = function(e, t) {
                x(this, s, "f")[e] = x(this, s, "f")[e] ? .filter(e => t !== e)
            };
            let k = !1;
            async function Q() {
                let e = "solflare-detect-metamask";

                function t() {
                    window.postMessage({
                        target: "metamask-contentscript",
                        data: {
                            name: "metamask-provider",
                            data: {
                                id: e,
                                jsonrpc: "2.0",
                                method: "wallet_getSnaps"
                            }
                        }
                    }, window.location.origin)
                }

                function n(i) {
                    let r = i.data;
                    r ? .target === "metamask-inpage" && r.data ? .name === "metamask-provider" && (r.data.data ? .id === e ? (window.removeEventListener("message", n), !r.data.data.error && (k || (function(e) {
                        let t = ({
                            register: t
                        }) => t(e);
                        try {
                            window.dispatchEvent(new U(t))
                        } catch (e) {
                            console.error("wallet-standard:register-wallet event could not be dispatched\n", e)
                        }
                        try {
                            window.addEventListener("wallet-standard:app-ready", ({
                                detail: e
                            }) => t(e))
                        } catch (e) {
                            console.error("wallet-standard:app-ready event listener could not be added\n", e)
                        }
                    }(new F), k = !0))) : t())
                }
                window.addEventListener("message", n), window.setTimeout(() => window.removeEventListener("message", n), 5e3), t()
            }
            class V extends m.eC {
                constructor(e = {}) {
                    super(), this.name = "Solflare", this.url = "https://solflare.com", this.icon = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmMxMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYjNmMmUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2LjQ3ODM1IiB4Mj0iMzQuOTEwNyIgeGxpbms6aHJlZj0iI2EiIHkxPSI3LjkyIiB5Mj0iMzMuNjU5MyIvPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDQuOTkyMTg4MzIgMTIuMDYzODc5NjMgLTEyLjE4MTEzNjU1IDUuMDQwNzEwNzQgMjIuNTIwMiAyMC42MTgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHI9IjEiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZD0ibTI1LjE3MDggNDcuOTEwNGMuNTI1IDAgLjk1MDcuNDIxLjk1MDcuOTQwM3MtLjQyNTcuOTQwMi0uOTUwNy45NDAyLS45NTA3LS40MjA5LS45NTA3LS45NDAyLjQyNTctLjk0MDMuOTUwNy0uOTQwM3ptLTEuMDMyOC00NC45MTU2NWMuNDY0Ni4wMzgzNi44Mzk4LjM5MDQuOTAyNy44NDY4MWwxLjEzMDcgOC4yMTU3NGMuMzc5OCAyLjcxNDMgMy42NTM1IDMuODkwNCA1LjY3NDMgMi4wNDU5bDExLjMyOTEtMTAuMzExNThjLjI3MzMtLjI0ODczLjY5ODktLjIzMTQ5Ljk1MDcuMDM4NTEuMjMwOS4yNDc3Mi4yMzc5LjYyNjk3LjAxNjEuODgyNzdsLTkuODc5MSAxMS4zOTU4Yy0xLjgxODcgMi4wOTQyLS40NzY4IDUuMzY0MyAyLjI5NTYgNS41OTc4bDguNzE2OC44NDAzYy40MzQxLjA0MTguNzUxNy40MjM0LjcwOTMuODUyNC0uMDM0OS4zNTM3LS4zMDc0LjYzOTUtLjY2MjguNjk0OWwtOS4xNTk0IDEuNDMwMmMtMi42NTkzLjM2MjUtMy44NjM2IDMuNTExNy0yLjEzMzkgNS41NTc2bDMuMjIgMy43OTYxYy4yNTk0LjMwNTguMjE4OC43NjE1LS4wOTA4IDEuMDE3OC0uMjYyMi4yMTcyLS42NDE5LjIyNTYtLjkxMzguMDIwM2wtMy45Njk0LTIuOTk3OGMtMi4xNDIxLTEuNjEwOS01LjIyOTctLjI0MTctNS40NTYxIDIuNDI0M2wtLjg3NDcgMTAuMzk3NmMtLjAzNjIuNDI5NS0uNDE3OC43NDg3LS44NTI1LjcxMy0uMzY5LS4wMzAzLS42NjcxLS4zMDk3LS43MTcxLS42NzIxbC0xLjM4NzEtMTAuMDQzN2MtLjM3MTctMi43MTQ0LTMuNjQ1NC0zLjg5MDQtNS42NzQzLTIuMDQ1OWwtMTIuMDUxOTUgMTAuOTc0Yy0uMjQ5NDcuMjI3MS0uNjM4MDkuMjExNC0uODY4LS4wMzUtLjIxMDk0LS4yMjYyLS4yMTczNS0uNTcyNC0uMDE0OTMtLjgwNmwxMC41MTgxOC0xMi4xMzg1YzEuODE4Ny0yLjA5NDIuNDg0OS01LjM2NDQtMi4yODc2LTUuNTk3OGwtOC43MTg3Mi0uODQwNWMtLjQzNDEzLS4wNDE4LS43NTE3Mi0uNDIzNS0uNzA5MzYtLjg1MjQuMDM0OTMtLjM1MzcuMzA3MzktLjYzOTQuNjYyNy0uNjk1bDkuMTUzMzgtMS40Mjk5YzIuNjU5NC0uMzYyNSAzLjg3MTgtMy41MTE3IDIuMTQyMS01LjU1NzZsLTIuMTkyLTIuNTg0MWMtLjMyMTctLjM3OTItLjI3MTMtLjk0NDMuMTEyNi0xLjI2MjEuMzI1My0uMjY5NC43OTYzLS4yNzk3IDEuMTMzNC0uMDI0OWwyLjY5MTggMi4wMzQ3YzIuMTQyMSAxLjYxMDkgNS4yMjk3LjI0MTcgNS40NTYxLTIuNDI0M2wuNzI0MS04LjU1OTk4Yy4wNDU3LS41NDA4LjUyNjUtLjk0MjU3IDEuMDczOS0uODk3Mzd6bS0yMy4xODczMyAyMC40Mzk2NWMuNTI1MDQgMCAuOTUwNjcuNDIxLjk1MDY3Ljk0MDNzLS40MjU2My45NDAzLS45NTA2Ny45NDAzYy0uNTI1MDQxIDAtLjk1MDY3LS40MjEtLjk1MDY3LS45NDAzcy40MjU2MjktLjk0MDMuOTUwNjctLjk0MDN6bTQ3LjY3OTczLS45NTQ3Yy41MjUgMCAuOTUwNy40MjEuOTUwNy45NDAzcy0uNDI1Ny45NDAyLS45NTA3Ljk0MDItLjk1MDctLjQyMDktLjk1MDctLjk0MDIuNDI1Ny0uOTQwMy45NTA3LS45NDAzem0tMjQuNjI5Ni0yMi40Nzk3Yy41MjUgMCAuOTUwNi40MjA5NzMuOTUwNi45NDAyNyAwIC41MTkzLS40MjU2Ljk0MDI3LS45NTA2Ljk0MDI3LS41MjUxIDAtLjk1MDctLjQyMDk3LS45NTA3LS45NDAyNyAwLS41MTkyOTcuNDI1Ni0uOTQwMjcuOTUwNy0uOTQwMjd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0ibTI0LjU3MSAzMi43NzkyYzQuOTU5NiAwIDguOTgwMi0zLjk3NjUgOC45ODAyLTguODgxOSAwLTQuOTA1My00LjAyMDYtOC44ODE5LTguOTgwMi04Ljg4MTlzLTguOTgwMiAzLjk3NjYtOC45ODAyIDguODgxOWMwIDQuOTA1NCA0LjAyMDYgOC44ODE5IDguOTgwMiA4Ljg4MTl6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+", this.supportedTransactionVersions = new Set(["legacy", 0]), this._readyState = "undefined" == typeof window || "undefined" == typeof document ? N.i1.Unsupported : N.i1.Loadable, this._disconnected = () => {
                        let e = this._wallet;
                        e && (e.off("disconnect", this._disconnected), this._wallet = null, this._publicKey = null, this.emit("error", new w.at), this.emit("disconnect"))
                    }, this._accountChanged = e => {
                        if (!e) return;
                        let t = this._publicKey;
                        if (t) {
                            try {
                                e = new j.nh(e.toBytes())
                            } catch (e) {
                                this.emit("error", new w.Nx(e ? .message, e));
                                return
                            }
                            t.equals(e) || (this._publicKey = e, this.emit("connect", e))
                        }
                    }, this._connecting = !1, this._publicKey = null, this._wallet = null, this._config = e, this._readyState !== N.i1.Unsupported && ((0, N.su)(() => (!!window.solflare ? .isSolflare || !!window.SolflareApp) && (this._readyState = N.i1.Installed, this.emit("readyStateChange", this._readyState), !0)), Q())
                }
                get publicKey() {
                    return this._publicKey
                }
                get connecting() {
                    return this._connecting
                }
                get connected() {
                    return !!this._wallet ? .connected
                }
                get readyState() {
                    return this._readyState
                }
                async autoConnect() {
                    this.readyState === N.i1.Loadable && (0, N.H)() || await this.connect()
                }
                async connect() {
                    try {
                        let e, t, i;
                        if (this.connected || this.connecting) return;
                        if (this._readyState !== N.i1.Loadable && this._readyState !== N.i1.Installed) throw new w.OZ;
                        if (this.readyState === N.i1.Loadable && (0, N.H)()) {
                            let e = encodeURIComponent(window.location.href),
                                t = encodeURIComponent(window.location.origin);
                            window.location.href = `https://solflare.com/ul/v1/browse/${e}?ref=${t}`;
                            return
                        }
                        try {
                            e = (await n.e(955).then(n.bind(n, 75955))).default
                        } catch (e) {
                            throw new w.W8(e ? .message, e)
                        }
                        try {
                            t = new e({
                                network: this._config.network
                            })
                        } catch (e) {
                            throw new w.p6(e ? .message, e)
                        }
                        if (this._connecting = !0, !t.connected) try {
                            await t.connect()
                        } catch (e) {
                            throw new w.$w(e ? .message, e)
                        }
                        if (!t.publicKey) throw new w.$w;
                        try {
                            i = new j.nh(t.publicKey.toBytes())
                        } catch (e) {
                            throw new w.Nx(e ? .message, e)
                        }
                        t.on("disconnect", this._disconnected), t.on("accountChanged", this._accountChanged), this._wallet = t, this._publicKey = i, this.emit("connect", i)
                    } catch (e) {
                        throw this.emit("error", e), e
                    } finally {
                        this._connecting = !1
                    }
                }
                async disconnect() {
                    let e = this._wallet;
                    if (e) {
                        e.off("disconnect", this._disconnected), e.off("accountChanged", this._accountChanged), this._wallet = null, this._publicKey = null;
                        try {
                            await e.disconnect()
                        } catch (e) {
                            this.emit("error", new w.UG(e ? .message, e))
                        }
                    }
                    this.emit("disconnect")
                }
                async sendTransaction(e, t, n = {}) {
                    try {
                        let i = this._wallet;
                        if (!i) throw new w.oS;
                        try {
                            let {
                                signers: r,
                                ...s
                            } = n;
                            return (0, T.W)(e) ? r ? .length && e.sign(r) : (e = await this.prepareTransaction(e, t, s), r ? .length && e.partialSign(...r)), s.preflightCommitment = s.preflightCommitment || t.commitment, await i.signAndSendTransaction(e, s)
                        } catch (e) {
                            if (e instanceof w.lj) throw e;
                            throw new w.IW(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signTransaction(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new w.oS;
                        try {
                            return await t.signTransaction(e) || e
                        } catch (e) {
                            throw new w.PY(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signAllTransactions(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new w.oS;
                        try {
                            return await t.signAllTransactions(e) || e
                        } catch (e) {
                            throw new w.PY(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signMessage(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new w.oS;
                        try {
                            return await t.signMessage(e, "utf8")
                        } catch (e) {
                            throw new w.fk(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
            }
        },
        99062: function(e, t, n) {
            "use strict";
            n.d(t, {
                H: function() {
                    return o
                }
            });
            var i = n(74750),
                r = n(50277),
                s = n(59860),
                a = n(45429);
            class o extends i.eC {
                constructor(e = {}) {
                    super(), this.name = "Trust", this.url = "https://trustwallet.com", this.icon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAyIiBoZWlnaHQ9IjQwMiIgdmlld0JveD0iMCAwIDQwMiA0MDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8cmVjdCB3aWR0aD0iNDAyIiBoZWlnaHQ9IjQwMiIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMTY5NF8xODk2NyIgdHJhbnNmb3JtPSJzY2FsZSgwLjAwMjQ4NzU2KSIvPgo8L3BhdHRlcm4+CjxpbWFnZSBpZD0iaW1hZ2UwXzE2OTRfMTg5NjciIHdpZHRoPSI0MDIiIGhlaWdodD0iNDAyIiB4bGluazpocmVmPSJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LC85ai80QUFRU2taSlJnQUJBUUFBQVFBQkFBRC8yd0JEQUFjRkJRWUZCQWNHQmdZSUJ3Y0lDeElMQ3dvS0N4WVBFQTBTR2hZYkdoa1dHUmdjSUNnaUhCNG1IaGdaSXpBa0ppb3JMUzR0R3lJeU5URXNOU2dzTFN6LzJ3QkRBUWNJQ0FzSkN4VUxDeFVzSFJrZExDd3NMQ3dzTEN3c0xDd3NMQ3dzTEN3c0xDd3NMQ3dzTEN3c0xDd3NMQ3dzTEN3c0xDd3NMQ3dzTEN3c0xDd3NMQ3ovd2dBUkNBR1NBWklEQVNJQUFoRUJBeEVCLzhRQUd3QUJBQUlEQVFFQUFBQUFBQUFBQUFBQUFBRUdCQVVIQXdML3hBQVpBUUVBQXdFQkFBQUFBQUFBQUFBQUFBQUFBUU1FQlFMLzJnQU1Bd0VBQWhBREVBQUFBZWtBQUFFRXhJaEloSWhJaEloSWhJaEloSWhJaEloSWhJaEloSWhJaElJRWdBQUFBQVFrQUFBQUFBQUFBQUFBQUFBQUFBQWlVRWdBQUFRa0FBQUFBQUFBQUFBQUFBQUFBQUFBQWlVRWdBRUVnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWlZa0FJa0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBUk1FZ2lZa0FBQUFBQUFBQUFQT29XVjduWFZWdXg5TXllWTNYTG8zSXo2QUFBQUFBQUFBRVNENUV6RWdBQUFBQUFCR0xNWmJSNmUydTVWK3BlT25QazR4cXpCTUFicTE4NlVYOVZjNzNlVFRhV3J6NmJmVWVmUUFBQUFBQUdPSmozbUppUUFBQUFOTlVQckE2Zk95Zm53WFZ6Qk1BZ0EyOXFvdXJtNjNyRnI1cGk5U3JlbWlvc2pIMVpnbUFQdjF4MFRrN0RUUFBycUhyWGJGeStpSGoyQUFBQmppWTk1aVlrQUFBQURtMkhuWVBZNVFzTVRYbCt5cUx1YzdMb0UxV1ZiZTVpaTRLN0FBSTArNWV2TksxWFNtaWpsVHArSGJYenhlNlpkVmppMnE0V1d1V1BsZElLclFBQUFNY1RIdk1URWdBQUFBYzYxK3kxdlg1YTMxQzIxMldnY3pvQUFBQUFBQUFPYTlLNW5yeTR3MzRycFlkRHZ1VjB3cXNBQUFBeHhNZTh4TVNBQUFBQnovVmJuVGRibUxWVmJONTlXOGN2b2dBQUFBQUFBT1lkUDVac3lmSTNZNzF1OVB1T1Qwd3JzQUFBQXh4TWU4eE1TQUFBQUJSOUZZcTcxZWFzVmQzaGVSeXVrQUFBQUFBQUI4OHM2ZHpIZGpEWms2RnM4SE80L1ZEejZBQUFBeHhNZTh4TVNBQUFBQlVxdmNLZjArYzIycHo3UEhSaHlPb0FBQUFBQUFCaGMzNkJ6L29ZUTFaK201RVR4dXFFU0FBQUJqaVk5NWlZa0FBQUFEUlVmb1hQZWpnZTNpMDBkVmVYcnhlcUNRQUFBQUFBTkRTTFpVK2x6M3Y0Ykc2cm9nNC9WQUFBQUF4eE1lOHhNU0FBQUFCNDh3NnJ6TGJreHh0eDlDMmRic25KNllWMkFBQUFBQUFValE1bUgxK1czMmh0dmoxYUJ5K2tBQUFBQmppWTk1aVlrQUFBQUJSYjFYYjZhWU9uenQzZXVXZE53YmZZWk5RQUFBQUFERnlxdlpYVWgxdVk2QlErbjQ5WDBNTzBBQUFBREhFeDd6RXhJQUFBQUR3OXlPV2ZOaHIzWDVpeTFvZFZWeXg4cm9oNTlnQUFBRHhRNXZtNnZwWUEwVWIrN1lHZnl1a0ZWb0FBQUFHT0pqM21KaVFBQUFBQU1mbkhUOVhvbzU4Ky9qcFlHOTBUelBUTW5sdG13N0xZOC9UTG9CSUJyYWpkVFphZGpOK01MYWxrd2I3azFmUXdiUUFBQUFBTWNUSHZNVEVnQUFBQUFBYTZqZEs4NzZlWExQV3VoaCtSNzhlOXRwYXF6cXJudTZ4Yk4vVWRMNTZzNGFNNHpZbkNzTzgzR0xYOC9SajFnQUFBQUFBWTRtUGVZbUpBQUFBQUFBQVl1VW1LUm9lcTYzWGw1NDJXdDI1UW55UHBQemtiKzFaZEdoc01zT3NQUHNBQUFBQUFBUWZEMElpWWxJQUFBQUFBQUFBRVZ1eXZmamxuejB2QjJaYWxkczM2elhoVGNBQUFBQUFBQUFpWUpBaVlKQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFSSUFCRW9KQUFBQUFBQUFBQUFBQUFBQUFBQUFBaVlKQUFBQkVvSkFBQUFBQUFBQUFBQUFBQUFBQUFRRWdBQUFBQkNRUUpSSUFBQUFBQUFBQUFBQUFJSlFKaVFBQUFBQUFBQUErUkhpSkFBQUFBQUFBQUFBQWVub1FCSUFBQUFILzhRQUx4QUFBQVVFQWdFQ0JBVUZBQUFBQUFBQUFBRUNBd1FGRVRBeEVFQVNJRFFURkNGQklpUXpOV0FqTWxCd2dQL2FBQWdCQVFBQkJRTEhZV0lXSVdJV0lXSVdJV0lXSVdJV0lXSVdJV0lXSVdJV0lXSVdJV0lXSVdJV0lXSVdJV0lXSVc1di9OTi81TGYrbC92L0FDVDcvd0FLazFOcGhTYTE5V0pEY2h2ckhvRjFsdUpiUk1xaW5PV1hsc09SS2kzSTY5d1d1bXBTVUprVmR0QWVrT3lGZW1OVTNXQXhPWWtkVTlsclBld1ZLWVFIS3RIU0hhdzZvT1BPUEhoWm55R1EzV2lDS2xGV0V1dHI2SjdMV09mUCtWSmN5UXMvbVh3YnpwZ3pNOEVXbHVQQitsTXVOdnhuWTZ2V1Mxa1BtSGg4eStJOVRmYVUyNGwxdkdleTFqbktOYzdDeFRYM2hHZ014dVZJU3RNaWpwTU94M1dEdzBaUm5HeG5zdFk1ZnZmU2xLbEczVHBMZ2FveEJtSXd4NnpJbEU5UzQ3Z2NvN3lRdUsrMTY2TCtqalBaYXh6ZmZjVTZFMUpiS2x4U0NZY2RBSWlJc3FtVzNBcW54VkE2VEZNU0VFMUk0bzN0OFo3TFdPZjcvaWkvcGRPWDd6aWplMHhuc3RZNmorNGNVWCszcHlQZGNVZjJXTTlsckhVLzNIaWlkUjM2dmNVbjJPTTlsckhWZmY4QUZGL1Y2YXZxcmlsL3QrTTlsckhWeS9POFVZL3pQU1VkazgwNHJVL0dleTFqckpmbWVLUWRwdlNmTzBmbUVWb09NOWxySFdpL0Z4VER0VU9sTk8wTG1PVm8yTTlsckhXaS9wY1FUOFozU3FSMnAvSkZaT005bHJIVnl2QzRhVjR2ZEtzS3RENFlUNVNNaDdMV09vcDhvSExTdk5ubzFwWDA0cDZmS2ZrUFpheHZKODJPYWN2emdkR3JyOHBuRklUZVprUFpheVNFZkRrOFVaeTdIUmxyK0pNNG9xUHdaRDJXc2xXYjhKdkZLZCtITTZFbDM0TWJtbXQvRGdaRDJXc2xZYThtT0VxTkMyWENlWnoxaC84QUR3MmczSEVwSktjaDdMV1I1c25tRkpOS3VLVEs4RlpublVzTlBPcWZlNHBEUG5KeW5zdFphdEg4SHVZRlNKd3NqcnFHVVRacXBhK1lVZjVhTmxQWmF5dnNwZlplYVV3N3pGcWJqSVprTnlFNFpWVGFZRDhoeVF2bWxSUE5lWTlsck5OaEpsTnJRcHRmS0ZxYlZHcTRRNGgxUHBrem1Zd2sxQjZSNllNRlVwYVVraE9ZOWxyUExoTnlreUl6a1pmb2FmY1lWRnF5SE9YcERjZEVtcU9PK3FIVEZPaEtTUW5PZXkxMEZvUzRpVlNESUtTYUZlaUxPZGpCK3NGNExjVTZ2MFI0ajBrNHRPYWo5STlscnBQeG1wQlNhVTYxaFpZY2ZWR3BLRUFpSWk2VnV0SmdzeVJKZ3V4dlNTVFVjV2tHWVEybHRQVCt3Ky9WTXJsTHBSS0NrcVFvUllUc280ME5xS25ybjJIb3pNZ0pwY1ZKa1JKTHJmZi9BSnd2M2I5Y3hjeGN4Y3hjeGN4Y3hjeGN4Y3hjeGN4Y3hjeGN4Y3hjeGN4Y3hjeGN4Y3hjeGN4Y3hjeGN3bkwvQVAvRUFDY1JBQUlCQWdVRkFBSURBQUFBQUFBQUFBRUNBd0FSQkJBd01USVNJQ0ZBUVJSd0lsRlMvOW9BQ0FFREFRRS9BZjBhN2hONk03VkhNRzhIMWIyb3lxS2FjbmF0ODFtWmFXZFRRWUhiMEpKQ1RWejJKQ3pVSWxBdFR3RWNhMnp2UVlpa1BVTDZyYjBxbGpZVitPMUREajdTeHF1M1lWQjNvNGRmbEhEbis2ZU1wdmxGd0dxL0kxRHowc1JzTW8rQTFYNUdvZVkwc1I4eWo0alZsNW1vK1kwc1I4eVhpTldiblNjaHBZamxrTlhFY3RPZm5TK1RyWWdiSEtNM1VhTG03RTFFTHVOYVlYWExEdDR0b08zU3Q4c09QTjlkbDZUYWxicE42Vmd3dU8rV1RxOERLSmVsZGVXUHE4akpXSzdVazRQTHNlVlZwNUMrVU1kLzVIMFpJZzlNaFhmSkpDbTFDZFNQTlBNVzJ5QXZ0U1FmVzlNaTlQQi9taUNOODBnSjNwVkM3ZXN5aHQ2T0hQeWtpQ2ZvL3dEL3hBQWtFUUFDQVFNRUFnTUJBUUFBQUFBQUFBQUJBZ01BQkJFUU1ERXlFaUVnUUVFaWNQL2FBQWdCQWdFQlB3SC9BQTFJeS9GQzNURlNRRmZZK3FBVFN3dWFTMkE3VUJqVjRGYW10M0hGRlNPZm9SUmhWckErRHpxdE5NNU9hUzRCN1VEblhBb29wNUZPdmkyTjFlQlRNRUdUUnVWbzNSL0JUU00zSitDc1Y0b1hMRG1oZEQ5RkpLSDQwbTduZFRxS242YlZyeWRKZTUzWStncWZvZHExL2RKTzUzWXVncVhvZHExL2RIN0hkZzZDbjZuYXR1dWgzYlkveHQyNC9pbU9CbmV0VHlOSlJoenN4akNnVk1jSWQ2QnNQcGNyNzh0aU5mSnNhWFRlZ043aWtieUdhZGZNWU5NaFE0UHpoaThCazZTdjV0bmZobDhEZzhhTW9iMGFlM0k2L0JJV2VraVZOSjVjZnlQb3h6RlBWSTRmalI0bGZtbXQyQndLamdDODZFZ2MxSmNmaWZUQnh4U1hQNDFBZyt4ckpjQWVscG5MYy9XVnluc1VMbGNlNmttTC93Q0gvd0QveEFBM0VBQUJBUVFHQndZR0FnTUFBQUFBQUFBQkFnQURFUklRSUNFaVFGRXhRVkpoY1hLQkV5TXdVR0toQkRJemtaS3hRb0tBa1BELzJnQUlBUUVBQmo4Qy93QkMwcVIyaXR6WG5ObTR0TTdNZkw1bHFDUXhRNXVvejFtbWQyWUZwVlhIbVdmbGtWRUFiMmc1RTV6MU5GNHFOYVZmZUkzNld1cmdySStUM255UHUxMlpmQU4zYVFqM2FMeFpWeDhLeGNSa3ExdTlkZFV0OVNYaTExYVZjRGpwVTJ2RDdORXZsOURCdnJQUHlhMTR2N3RhZkFtZTkyajNMQU8rN1VHZzhURGZxUGdXS0k2dDlWZjVOOVo1K1RYMWRvbmV3V2d4QnhMMG5haDRVU096VG1wb3dtWHRHbVZRQkJ6YUxoVXZwTFFlSUtmQ1duSldKZmN4clFTQ2VEZlRsNXJHNzE1MFMxeDJBYzY4Q0lockIyWjlMWEZKWDdOZmRLSFN1ODVzUzk1cVZLZVJzT3B2a2oxYXh5ajdOWUllTmZkcFZ4RGZSSFJ0Q2gxWjRoT2hKaFN2bXhMM2pTOTQ0Ujl6bWxmUGlYdEwzcGhIdk1hVHo0bDUwL1ZMN3BoRjh4cC9zY1NyZ0tYdkRDRTBvNjRrY3RLeDZjR1RVZGY5cnhLRDZhZUtjRzhQcE5SMXk0bHllTktOOGYxZzMzTFVkREpJeExzNzZYWE5nM25UOTFBTXNUSEpWS0ZaS0J3WUdhcVhhYzFERlBmdlVRck1Sd1RwUEUwdWh2amlscHpTUlVkN3JNRkxzcHBKMlU0dDRqSlZLMFpHT0NlcTMwdlY5TVhOdGlOTXVwWWhnVnZNaFVSNnJjV2w1c0drS0drV3NsNG5Rb1lCTGtjVFNsQTBxTUdDUm9GbUxXN1A4Z3hTZElwN0Jac1Y4dmpsNHMyQmxQRmFUU1hoMEkvZU43WWZLdlR4cUIwK01GNmpuNHBXdFVBMlRzYUJVU2orV2s0MVR0V2dzWGE5SXFCTHkrajNEVE8xUjhLVkhlTDltbWVLalU3ZFl1ajVjZms4R2dzVUxFQ0treUZGSjNNRS9FRCt3YVpDZ29icTBDWmxiSWFFWkVaQ3JFMk9ocExCS1JBRHlDMnhlcFRRZUo2MVpuYWlscFgxeFdlcW1aNHFEU3V1N1Q3MWd0OWRSbHJMQktSQUR5S1ZhUW9NVmZEMmpaTFFVQ0R2cXdqTWpaTGR5bThkclUweTFGUnEzRTJablEweHZyelBrMEhpWTcybWRkNG4zOEdWMmtxYVo4WnpscWFBRUI1VEVpQzlvTkVpS05vVllKRVMwM3hGbnBEU29TRWpkNVpBdFA4QUQzVHN0S29RSW91aUNkb3RkRVZiUjh3N3hFZDdSbEo0bG9KRUIvbkovOFFBS2hBQUFRSUVCQVlEQVFFQkFBQUFBQUFBQVFBUklURmhjUkF3UVZFZ1FJR1JvYkZRNGZEQjhkSC8yZ0FJQVFFQUFUOGh5Q1FFNTI3cGp1bUtnRlFDb0JVQXFBVkFLZ0ZRQ29CVUFxQVZBS2dGUUNvQlVBcUFWQUtnRlFDb0JVQXFBVkFLZ0ZRQ1ltcVZHNlpia0NXVVRPQ0FiNEpta24zaG11OHBib0J2aG9pb1U4cncrSmJVSUY4ancrTEkxRTBJOFJpVzcvR21CZnZ3a3NnR0h4d2hEZ203YjQ4K3NTV0NBWWZJQ0RqQXlmSW1Zd0V6ekI4WUdZSmdPcSsvbFFGV28xRitaSk9XTmhEcVZHWElQNk5pSE1ieW1kamNTczVjQUFGSjVRb0hjeVRCT0Zab2ZaUEg3Um9PbkVPRmlLQ3hUUUJFcG5sWmlrMjVBZ0RrZ0NxbDRwR1U3eE5nZVU1Z2Z1WWs4UjFaVE9Eam9FWkFncVA0SzBtV3drTHduQjVHYmRTYlpnQkRBcnhrRzY4UFFlRi9wRk5GYzBSY2h2a05EMngrR1FnV0xBemU2Y2MyQjREa2VGNUFHUStwZjZSQVFKcWlNOUNtbmpjWmsyNmsyek5FUXV5R1RNcHY3a095WmcvWmh0aVp6YkFFOHZuUjdxOFdhSHJsRkJLRjFHWk51cE5zeUg4VWVKMUYyQjFxME4wQk1YNkg5SzZqQkU5K001Q0pNRUozSnV5N0o2SW51VW9MZUlkK01JOUhyTW0zVW0yWURYV01ieTJITXAwZDVyMzJkN1RLRUd3R2Q0b2txYkJ1STlLUVdpdTFQUWZIOTlNeWJkU2JaZ05peWhVK3VVSi8weHhDSlY2R1pOdXBOc3dHdUQwTVRoMS9ybERjbS91eEJxcGVobVRicVRiTUJxdjhNU2lQN1BsRGQ3K3pFV0d1WVRicVRiTUZxM294S0J1SEtGVkRpTFZEN1prMjZrMnpHaWJpZkp4dlova2NuUVFQd05LaFBsbVRicVRiTXZKdms0d0hjSHJrNkhFOGNEUm9PWk51cE5zeThRSHJHMHdlWEp1YXNjRkRWNHpKdDFKdG1PN2N4NCtzWFRRTzhPVHZ4bmhpQTVZS2xCc3liZFNiWmpmc2o3R1A2NkR5ZEJNZURqUWdlYzJiZFNiWmpHMkE3RHdVWi9Ea3V2eWVNYUVlQVBtemJxVGJNL053T0J5Nmg0bHVTYWRnUDdqWDBQOEFNMmJkU2Jac0FHZUFzK01ZNCtkL25KYThnbUJZUXhZM0pBL3V1Yk51cE5zMXgwQi9qK1l0SkdLNjVqa2Q3b1Y5T0NNSnVQcjlObXpicVRiTmFlYkJzY1Rqc2NBYXJWMEZ1UWFMeFAxNHlDUUNsT0lETm0zVW0yYkxRWXNnSXNSaU1RbGFFY2pvZHM5bVFQdlJUd0Y3WXN5Z3d1L0hPbTNVbTJjY1lmU3hTSzBNUVdYM3pRRWg2bFFDL3dEdHppQVNXRVNuRW03dWROdXBOczZRaXoyTzZEWXhlOWVBYTZHaHFzZFJxTGpLY0dOZ0dDNVZqQU5CYmdza1IxTytmTnVwTnM5NUJoZnFLT2hoaUR3QW9CMUprVVJFZnR3aGtvNmx4T25kcjEyVHZHUDJUcndnSXlSY29FT2dFd0EwejV0MUp0eUdnOUkwVUdRYUJJOEwxWlNSVEdJZDUvNGdRUTRMZzROUmpvTlRaUDdubGY4QUZNOEo0TXpoK2pJZEFaZ0JweUUyNmsyNUUrTU13VTRyVWVqMEtMQlhNQXg0UzREOFNHeVp3ZGlKL0RvME9PcDRlcXJDQk05bklDdzVLYmZsQm5zdEpDT3FlYkNKZW1xSUlMR0J5SE96WFlKbm92Si8xQVFBSkFjbkhIZENaNVVTZTZqN1J1aXBIMXdpNWhwQUJ5VXdtWjF1cFF1QWRBNVF6S1FYdHl3Q0FCQjBLZjJOWFNiYkk3TG5nY0pCT2NqN1U0Uk9ZZVdPZ3drNWdaQ01Ta0k2cDBxV0NoOFFVZ0F3SExpSkhFUWg4ZVN3UURERTc3Zkh6TnVHUnA4YWRoTlNIRE5EWS9Ga3NnTy9HUTZCME0vaVNXUUdwbmtrT25hZmY0ZDlCTkFkOHhtbDJUN3crRGRsRTBVczl0aW5PbzdKbS9PczNUN0JNVE05a0EzS0FBSktvVlVLcUZWQ3FoVlFxb1ZVS3FGVkNxaFZRcW9WVUtxRlZDcWhWUXFvVlVLcUZWQ3FoVlFxb1ZVS2luSE4vOW9BREFNQkFBSUFBd0FBQUJEenp6UlR6enp6enp6enp6enp6enp6VHp6enp6eVJ6enp6enp6enp6enp6enp6enp3elR6enlUenp6enp6enp6enp6enp6enp6enp5anp5aHp6enp6enp6enp6enp6enp6enp6enp4end6enp6enp6enp6enp6enp6enp6enp6enl6enp6enp6enp6enp6OVBmenp6enp6enp6enpEenp6enp6enp6UW9NTU9EN0h6enp6enp6ekx6enp6enl1QUFNTTkrNHNNUE9MM3p6enp3THp6enp6eUVJV1kzenp3MjAwd1A4QTg4ODg4Qzg4ODg4OEtRODg4ODg4ODg4NkQwODg4ODhDODg4ODg4cUU4ODg4ODg4ODhyRGQ4ODg4OEM4ODg4ODhxRzg4ODg4ODg4OGdEVzg4ODg4Qzg4ODg4OGpTODg4ODg4ODg4SkdWODg4ODhDODg4ODg4cEEvODg4ODg4ODhDSDg4ODg4OEM4ODg4ODhNRDE4ODg4ODg4OEpIODg4ODg4Qzg4ODg4OG9EYjg4ODg4ODg1REQ4ODg4ODhDODg4ODg4L0NDLzhBUFBQUFB3UjkvUFBQUFBBdlBQUFBQUE9DQWZ0L1BPOEF5dlBQUFBQUEF2UFBQUFBQUERqUTQwcUF4VDNQUFBQUFBQQXZQUFBQUFBQUExmUUF3RGovQUR6enp6enp6elB6enp6enp6enp6eTJLL3dBODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODhFODhVODg4ODg4ODg4ODg4ODg4ODg4ODg4MGM4OHN3ODg4ODg4ODg4ODg4ODg4ODg4OHM4ODg4ODhjODg4ODg4ODg4ODg4ODg4ODhFODg4ODg4ODg4akJCQkJCQkJCQkJCQkIvOEFQUFBQUFAvRUFDWVJBUUFDQVFNRUFnSURBUUFBQUFBQUFBRUFFU0VRTURGQVFXRnhJS0ZSY0lHUnNmRC8yZ0FJQVFNQkFUOFEvUm8xd2xzYW5ZQjZWSEpuZjc5VEdHb3FyZGNRNUp5V0p5UytnYmw0SjV2aGtPQ1k0dVpUSWlLcDFFY01Xc1pTL251OHZ2U1FkeElMbE9BZkF1aGNaeXFkbkExNzZmWVp4ZFRKajdtZjhQVzF4L2xwOUxkRlFkYlE4ajNvYUR3YnBwUlVuazJuZ2VOQlFHNktMNGcwM0JzdlpWcnhCU2VlZ2l4YlB1amZoZjhBak9saS9IWXVORjYzcUNVeGxVY3g4OUNnV3k3MkRTbUhuZnI5d2lWaGlGcVlUQitvSTVOY0x5emx1UHhvNjdIUTVRd3h1aG9sbGlYREJtT3dORVZDVmY0empvZ0ZNRnovQUVqdEN0Y2ppZmNIbzdWYmg5Q1djc1ROY3Y2UC84UUFKaEVCQUFJQUJRUURBQU1CQUFBQUFBQUFBUUFSRUNFd01WRkJZWEdoSUVDeFlIQ0I4UC9hQUFnQkFnRUJQeEQralg2MmN3bEV1ZFpUNnV3RnpvdGVabVN1QUtESE16Sm5LcHM1UG9ER3JXZHI0WkdOc3BScVpabGZVQVdPS201Q2FoZGNkWDFpZE1VSHNNYjB2aTR0YnFiVUdkU1I5TmZ2V0p2L0FPZnVsNldIdmFydndrRi85ZGRJNXJ4Zzc4anF1L0ZEZmkwaGt2R0N0TzdxdS84QWI5aHN1enBITTk4RmF1cmNqaGlXVkVwclJvTHpMbmdmUUNtZDlIdzVyeXF1K1dGWUhYUXI4RkhKMWhWWkJNOVlLeXFEOGdWb25NRGhjamJwcjh3SU41a0hwdVovbVBjUkduSFBOam1iVHZ6Z1o2N3Y5SFAyWkJyZUJPVFBtYmtEbVp2bmNBYlZFdjhBMG0vMGtWcW1NZnJEYkxNZXJqNmpkdTlLOVJxMk95RzVrZXh4L09qV2ZuLy94QUFxRUFFQUFRSUNDUVVCQVFFQUFBQUFBQUFCRVFBaE1hRVFNRUZSWVhHQmtmRWdRTEhCOEZEUjRmL2FBQWdCQVFBQlB4RFVXUmI3akdwY0ljMVNZdm9SVzhsNXJYaXE4VlhpcThWWGlxOFZYaXE4VlhpcThWWGlxOFZYaXE4VlhpcThWWGlxOFZYaXE4VlhpcThWWGlxOFZYaXE4Vlc0STVNVk13NjE2azRoeVdva2hsYm4yQXFNWGNWR0lodVA5b0JZaitDZ2tKSlU4V09EY292Z1N5ZGJMZGZpMUJnUDRxQ1FralVZTTdqYVVJSkdUVXFCS3dGUTNOdHpmei9rcUhBZHB2b0JicWJ0UVhTNE1PUEgrV2srUlNCSjZ1U0g0ZnpjRndmeDlNUzJMWXF3ZnpyeTlsemw2QzVzV0gzL0FEemFURzRvUkJMam9tVXgyYzZnRGQvUXZibTV5MFhCdXY4QTBiRzMyZEZ6OVAzZjNDUERpWWU1dXZ5R2tTUU51ekE1SmZ1VUV2MkVJWGNObnQ4UjJsKzJqYTcxYy9iWTJvM2c1Y1hoUXEzWE5nNGJtZkxEU2tXeWRvTnliU2pIcXRKZTR2cHZ6OXVSTGNJcktudE1KS2lCMWFMZkd3YUw4NU9kVHFSd2VXTEhxa2dDeFlQNHN6MG9NQlByelk5RjlyTEQydFpWN0JxTllxZ281a1RFRHNGNkhFWmg4aEJ5bzVXNFd2dkJrMWNsTWtxSEl3T21xSi94d2k5em9sRkN2YkRaSHpRUkRPNXZXSXpvc3VtSDBqN0hPcXlyV1JXNkRxVGZ3T0hkS1V1eFE2UUsvYi9kRHdMeFgzVW9EdlUrc0ZZTHRQRmJjUkJjQndjWHRRVVlReU9YdDU0MHpPTEY5eFBveDFHelgzeDhWa3JIOTErMys2ZHgwblFtL0VubkpWMll6OVBFYmF6T3F5cldNVEtUd0xHUnFRUUFWYkFWZkNkZ2lPR042d2NhTWhyWVNqd1lmTGpwTGUwU2cxdkhHUlh5eEhXZVpVMkU0SW5rQ3ozMVN0ek80UUpPNVBYV1oxV1Zhd29IZjV2VURXOXBYWXBzUlBhRU9qZktuRmQrRWZqaFJBbE5sUDFYN2VzSW13TWljUnBGZWJWaTVyZG9wM1laRmw2TnM2ZVlWak4yRW5yNWtEV002ckt0WVFUZjU2UmZaQ2hSQTdxL08zNEpTUXlEQk5uV1ZGaVhBUVphNmF1TzFqTXFSbUg4S0tZZXJuM05PUXBKU3dPM1NTZmF3eTZ6T3F5cldRQ0l2ZTRhWnQwWDg2ZTBCWnVzK21MZkEvZlBXWjFXVmF5RzhidTJtYmQzN24rUGFZM1hkK2ZUTU41eWZyV1oxV1ZheTJON3B1YlJlMDdkWkdNN1dtVWJ4OEgxck02ckt0WktONitIMXBqM3Q5bC8zMmwwcGxjOU1vakhaejYxbWRWbFdzL1djSDFwZzN4N1A5dlo3S3ArdzlIR0R1ays5Wm5WWlZySWZISCsybWQ4bVgxN1B4ano5SEZydkwvZXN6cXNxMWtjVDZaWDNwanV4RHVmWHM3cVJQZEVmZm90NUdUSFdaMVdWYXkwKzJlY3RLNjhUK0p6OW54M0Y2L1JPbERDVllDakp3QWREV1oxV1ZhenlnNTltbTlrWERrSDJkeTd3WEFUNk5OaUp0dk1HdHpxc3Exa0tsek9nL0I2TGd6ZnQ4aCsvWlFCY1F1VUQ1ZE5ucGw3ajZhM09xeXJXUitTa2RVZWlWMlVyaElNZzlsRVRaZzRxL0JOTStscGJpcDhGMXVkVmxXdGUzQVRtUmxHa0c3RVRnSStWMzlrWmpJamZZWkJwbkV4NXlGZmhyYzZyS3RiQVJFejJTWGZCNjZUaHJnQ0grQ2RmWWhKUW5yMnpKU3F5M2RMUVVkOUxaTmF6cXNxMXJuWit6dmNPK25oWXJJTWxZSlFKdmJUb3lkUFlIYzFpTmdXSGVYb2FjMVlCWW9HNENOd0VHdHpxc3ExcmhRc3U5c2VqRDBwTGJ6c1JHRTAzOENCYmE5V3pqejE5eTFFYlZzSEZwRDlqVFlZQWNBZzAzVU1lMnlCMkpkdGRuVlpWcnRpMW9iRSt3bm1Pa1VFVVM0bEFaSFlYQVhaOHVldHhlejRpN2cydkNqb0VMbUw5bnhtNkFRS01BWFZvekppNXY0blFnNmE3T3F5clhCMWdBRjlrT0kxWkVwT3diQndmUWFka0ZiWEJjVGc5eW9LTkd3ZmRpR3FscU8yS2Z4WXlwUzVtSFk5dzJmUG9jcnZzTVA0SHp5MStkVmxXdkpZb0hCUGkrTzhwWU9HdWZ0L293UWdzUjJwelloQmM0N1RtZHF3c3VURGs3bmg2aDRaTFhPcGgxWDRVWTJCVFluYytIRDA3cUZybVptOTJVR2RRMEFOZm5WWlY3QzBrV0RTOENiVGgycVRSSGJ1Vy9XUHBCYlNSZEJNSHJTRFJzSE1tL1ZialFNQUpFWkUwVFlEaXZ1R0xVZmxrS052aS9BNzBxaXFyZFgwOEZCUVAweithZ3ppZUFld3pxc3E5amdxamNsU1EzbFlPRzA1TitMVFRsaFFPWStsMnhOMnNjMjFsd3JFZXdWbnVBeFpjNnhwaHZMeTRIRDB4RjRNWm9iWGdTMDRBSzVlT1J6dSt5MzNhcXdHNjNzNENjUUhaaS9UQ3BTSlhnc2NmbzdVaUJCaEVoSFVRd25FRWN4YkZObURmQWJqdHlIQ2piREFZQTRIc3drNTFXanVaOXJaUjFyZlZzSFB1VS9GTkYzMUdLNTkzMHNkdUZrY0FvcGw3aVhmQnlMOFNzRE9FUS82OGZhT0VNWXRRUUJnV3BzWGNqOW43WU1MUWhJbERHdVZHT2UydUdIS2xHWkE0UjBTT1pRYXpnYjNBNnhVTWpVRW5oRzQ0R2Z0cjNlTTl2eG9HSXhMME1rbUQ3Y1dERUJQSkMvU2pjSFpGUFlSUFdqTzNBd09BZTM0QUxIMys0YWJ6dTRjdjU5NEx1QnpxQU5KYkRITVVJZ2x4L25HUHNzT2ZwTUxhdzRPNythM0V1eU45QUFHQjZVQkRoU1IybXgzL3dBdUJoSzRHK29MdDFpK3NCR0c1M1VrNEh5L2toeExnYjZTY1JaYWtCRFV0K2ZsL3dDTzN3VGtLZ3VzcmJySjduaXcvd0NVR1lFdHp0L2hvc2NkMjJveGJOeGpRQWdJTmNna0pKVXpFT0RjcURhOFZXOWh6dDcxRmhFN3FtNHJ6dFc0QnUvMVFZQ1BhS1VBN3dwdmZOWG1xODFYbXE4MVhtcTgxWG1xODFYbXE4MVhtcTgxWG1xODFYbXE4MVhtcTgxWG1xODFYbXE4MVhtcTgxVjQrYWdHUjFYb0FJQURXZi9aIi8+CjwvZGVmcz4KPC9zdmc+Cg==", this.supportedTransactionVersions = null, this._readyState = "undefined" == typeof window || "undefined" == typeof document ? r.i1.Unsupported : r.i1.NotDetected, this._disconnected = () => {
                        let e = this._wallet;
                        e && (e.off("disconnect", this._disconnected), this._wallet = null, this._publicKey = null, this.emit("error", new s.at), this.emit("disconnect"))
                    }, this._connecting = !1, this._wallet = null, this._publicKey = null, this._readyState !== r.i1.Unsupported && (0, r.su)(() => !!window.trustwallet ? .solana ? .isTrust && (this._readyState = r.i1.Installed, this.emit("readyStateChange", this._readyState), !0))
                }
                get publicKey() {
                    return this._publicKey
                }
                get connecting() {
                    return this._connecting
                }
                get connected() {
                    return !!this._wallet ? .isConnected
                }
                get readyState() {
                    return this._readyState
                }
                async connect() {
                    try {
                        let e;
                        if (this.connected || this.connecting) return;
                        if (this._readyState !== r.i1.Installed) throw new s.OZ;
                        this._connecting = !0;
                        let t = window.trustwallet.solana;
                        if (!t.isConnected) try {
                            await t.connect()
                        } catch (e) {
                            throw new s.$w(e ? .message, e)
                        }
                        if (!t.publicKey) throw new s.cO;
                        try {
                            e = new a.nh(t.publicKey.toBytes())
                        } catch (e) {
                            throw new s.Nx(e ? .message, e)
                        }
                        t.on("disconnect", this._disconnected), this._wallet = t, this._publicKey = e, this.emit("connect", e)
                    } catch (e) {
                        throw this.emit("error", e), e
                    } finally {
                        this._connecting = !1
                    }
                }
                async disconnect() {
                    let e = this._wallet;
                    if (e) {
                        e.off("disconnect", this._disconnected), this._wallet = null, this._publicKey = null;
                        try {
                            await e.disconnect()
                        } catch (e) {
                            this.emit("error", new s.UG(e ? .message, e))
                        }
                    }
                    this.emit("disconnect")
                }
                async sendTransaction(e, t, n = {}) {
                    try {
                        let i = this._wallet;
                        if (!i) throw new s.oS;
                        try {
                            let {
                                signers: r,
                                ...s
                            } = n;
                            e = await this.prepareTransaction(e, t, s), r ? .length && e.partialSign(...r), s.preflightCommitment = s.preflightCommitment || t.commitment;
                            let {
                                signature: a
                            } = await i.signAndSendTransaction(e, s);
                            return a
                        } catch (e) {
                            if (e instanceof s.lj) throw e;
                            throw new s.IW(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signTransaction(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new s.oS;
                        try {
                            return await t.signTransaction(e) || e
                        } catch (e) {
                            throw new s.PY(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signAllTransactions(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new s.oS;
                        try {
                            return await t.signAllTransactions(e) || e
                        } catch (e) {
                            throw new s.PY(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
                async signMessage(e) {
                    try {
                        let t = this._wallet;
                        if (!t) throw new s.oS;
                        try {
                            let {
                                signature: n
                            } = await t.signMessage(e);
                            return n
                        } catch (e) {
                            throw new s.fk(e ? .message, e)
                        }
                    } catch (e) {
                        throw this.emit("error", e), e
                    }
                }
            }
        },
        35119: function(e, t, n) {
            "use strict";
            n.d(t, {
                BR: function() {
                    return r
                },
                aI: function() {
                    return i
                },
                gv: function() {
                    return s
                },
                l1: function() {
                    return a
                }
            });
            let i = "solana:mainnet",
                r = "solana:devnet",
                s = "solana:testnet",
                a = "solana:localnet"
        },
        45587: function(e, t, n) {
            "use strict";
            n.d(t, {
                G: function() {
                    return i
                }
            });
            let i = "solana:signAndSendTransaction"
        },
        30685: function(e, t, n) {
            "use strict";
            n.d(t, {
                g: function() {
                    return i
                }
            });
            let i = "solana:signMessage"
        },
        36822: function(e, t, n) {
            "use strict";
            n.d(t, {
                R: function() {
                    return i
                }
            });
            let i = "solana:signTransaction"
        },
        71074: function(e, t, n) {
            "use strict";
            n.d(t, {
                S: function() {
                    return I
                }
            });
            var i = "undefined" == typeof window || "Deno" in globalThis;

            function r() {}

            function s(e, t) {
                let {
                    type: n = "all",
                    exact: i,
                    fetchStatus: r,
                    predicate: s,
                    queryKey: a,
                    stale: l
                } = e;
                if (a) {
                    if (i) {
                        if (t.queryHash !== o(a, t.options)) return !1
                    } else if (!c(t.queryKey, a)) return !1
                }
                if ("all" !== n) {
                    let e = t.isActive();
                    if ("active" === n && !e || "inactive" === n && e) return !1
                }
                return ("boolean" != typeof l || t.isStale() === l) && (!r || r === t.state.fetchStatus) && (!s || !!s(t))
            }

            function a(e, t) {
                let {
                    exact: n,
                    status: i,
                    predicate: r,
                    mutationKey: s
                } = e;
                if (s) {
                    if (!t.options.mutationKey) return !1;
                    if (n) {
                        if (l(t.options.mutationKey) !== l(s)) return !1
                    } else if (!c(t.options.mutationKey, s)) return !1
                }
                return (!i || t.state.status === i) && (!r || !!r(t))
            }

            function o(e, t) {
                return (t ? .queryKeyHashFn || l)(e)
            }

            function l(e) {
                return JSON.stringify(e, (e, t) => h(t) ? Object.keys(t).sort().reduce((e, n) => (e[n] = t[n], e), {}) : t)
            }

            function c(e, t) {
                return e === t || typeof e == typeof t && !!e && !!t && "object" == typeof e && "object" == typeof t && !Object.keys(t).some(n => !c(e[n], t[n]))
            }

            function u(e) {
                return Array.isArray(e) && e.length === Object.keys(e).length
            }

            function h(e) {
                if (!d(e)) return !1;
                let t = e.constructor;
                if (void 0 === t) return !0;
                let n = t.prototype;
                return !!(d(n) && n.hasOwnProperty("isPrototypeOf"))
            }

            function d(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            }

            function p(e, t, n = 0) {
                let i = [...e, t];
                return n && i.length > n ? i.slice(1) : i
            }

            function g(e, t, n = 0) {
                let i = [t, ...e];
                return n && i.length > n ? i.slice(0, -1) : i
            }
            var f = Symbol(),
                y = function() {
                    let e = [],
                        t = 0,
                        n = e => {
                            e()
                        },
                        i = e => {
                            e()
                        },
                        r = e => setTimeout(e, 0),
                        s = i => {
                            t ? e.push(i) : r(() => {
                                n(i)
                            })
                        },
                        a = () => {
                            let t = e;
                            e = [], t.length && r(() => {
                                i(() => {
                                    t.forEach(e => {
                                        n(e)
                                    })
                                })
                            })
                        };
                    return {
                        batch: e => {
                            let n;
                            t++;
                            try {
                                n = e()
                            } finally {
                                --t || a()
                            }
                            return n
                        },
                        batchCalls: e => (...t) => {
                            s(() => {
                                e(...t)
                            })
                        },
                        schedule: s,
                        setNotifyFunction: e => {
                            n = e
                        },
                        setBatchNotifyFunction: e => {
                            i = e
                        },
                        setScheduler: e => {
                            r = e
                        }
                    }
                }(),
                M = class {
                    constructor() {
                        this.listeners = new Set, this.subscribe = this.subscribe.bind(this)
                    }
                    subscribe(e) {
                        return this.listeners.add(e), this.onSubscribe(), () => {
                            this.listeners.delete(e), this.onUnsubscribe()
                        }
                    }
                    hasListeners() {
                        return this.listeners.size > 0
                    }
                    onSubscribe() {}
                    onUnsubscribe() {}
                },
                m = new class extends M {#
                    e;#
                    t;#
                    n;
                    constructor() {
                        super(), this.#n = e => {
                            if (!i && window.addEventListener) {
                                let t = () => e();
                                return window.addEventListener("visibilitychange", t, !1), () => {
                                    window.removeEventListener("visibilitychange", t)
                                }
                            }
                        }
                    }
                    onSubscribe() {
                        this.#t || this.setEventListener(this.#n)
                    }
                    onUnsubscribe() {
                        this.hasListeners() || (this.#t ? .(), this.#t = void 0)
                    }
                    setEventListener(e) {
                        this.#n = e, this.#t ? .(), this.#t = e(e => {
                            "boolean" == typeof e ? this.setFocused(e) : this.onFocus()
                        })
                    }
                    setFocused(e) {
                        this.#e !== e && (this.#e = e, this.onFocus())
                    }
                    onFocus() {
                        let e = this.isFocused();
                        this.listeners.forEach(t => {
                            t(e)
                        })
                    }
                    isFocused() {
                        return "boolean" == typeof this.#e ? this.#e : globalThis.document ? .visibilityState !== "hidden"
                    }
                },
                N = new class extends M {#
                    i = !0;#
                    t;#
                    n;
                    constructor() {
                        super(), this.#n = e => {
                            if (!i && window.addEventListener) {
                                let t = () => e(!0),
                                    n = () => e(!1);
                                return window.addEventListener("online", t, !1), window.addEventListener("offline", n, !1), () => {
                                    window.removeEventListener("online", t), window.removeEventListener("offline", n)
                                }
                            }
                        }
                    }
                    onSubscribe() {
                        this.#t || this.setEventListener(this.#n)
                    }
                    onUnsubscribe() {
                        this.hasListeners() || (this.#t ? .(), this.#t = void 0)
                    }
                    setEventListener(e) {
                        this.#n = e, this.#t ? .(), this.#t = e(this.setOnline.bind(this))
                    }
                    setOnline(e) {
                        this.#i !== e && (this.#i = e, this.listeners.forEach(t => {
                            t(e)
                        }))
                    }
                    isOnline() {
                        return this.#i
                    }
                };

            function w(e) {
                return Math.min(1e3 * 2 ** e, 3e4)
            }

            function T(e) {
                return (e ? ? "online") !== "online" || N.isOnline()
            }
            var j = class {
                constructor(e) {
                    this.revert = e ? .revert, this.silent = e ? .silent
                }
            };

            function S(e) {
                return e instanceof j
            }

            function D(e) {
                let t, n, r, s = !1,
                    a = 0,
                    o = !1,
                    l = new Promise((e, t) => {
                        n = e, r = t
                    }),
                    c = () => m.isFocused() && ("always" === e.networkMode || N.isOnline()) && e.canRun(),
                    u = () => T(e.networkMode) && e.canRun(),
                    h = i => {
                        o || (o = !0, e.onSuccess ? .(i), t ? .(), n(i))
                    },
                    d = n => {
                        o || (o = !0, e.onError ? .(n), t ? .(), r(n))
                    },
                    p = () => new Promise(n => {
                        t = e => {
                            (o || c()) && n(e)
                        }, e.onPause ? .()
                    }).then(() => {
                        t = void 0, o || e.onContinue ? .()
                    }),
                    g = () => {
                        let t;
                        if (!o) {
                            try {
                                t = e.fn()
                            } catch (e) {
                                t = Promise.reject(e)
                            }
                            Promise.resolve(t).then(h).catch(t => {
                                if (o) return;
                                let n = e.retry ? ? (i ? 0 : 3),
                                    r = e.retryDelay ? ? w,
                                    l = "function" == typeof r ? r(a, t) : r,
                                    u = !0 === n || "number" == typeof n && a < n || "function" == typeof n && n(a, t);
                                if (s || !u) {
                                    d(t);
                                    return
                                }
                                a++, e.onFail ? .(a, t), new Promise(e => {
                                    setTimeout(e, l)
                                }).then(() => c() ? void 0 : p()).then(() => {
                                    s ? d(t) : g()
                                })
                            })
                        }
                    };
                return {
                    promise: l,
                    cancel: t => {
                        o || (d(new j(t)), e.abort ? .())
                    },
                    continue: () => (t ? .(), l),
                    cancelRetry: () => {
                        s = !0
                    },
                    continueRetry: () => {
                        s = !1
                    },
                    canStart: u,
                    start: () => (u() ? g() : p().then(g), l)
                }
            }
            var U = class {#
                    r;
                    destroy() {
                        this.clearGcTimeout()
                    }
                    scheduleGc() {
                        var e;
                        this.clearGcTimeout(), "number" == typeof(e = this.gcTime) && e >= 0 && e !== 1 / 0 && (this.#r = setTimeout(() => {
                            this.optionalRemove()
                        }, this.gcTime))
                    }
                    updateGcTime(e) {
                        this.gcTime = Math.max(this.gcTime || 0, e ? ? (i ? 1 / 0 : 3e5))
                    }
                    clearGcTimeout() {
                        this.#r && (clearTimeout(this.#r), this.#r = void 0)
                    }
                },
                E = class extends U {#
                    s;#
                    a;#
                    o;#
                    l;#
                    c;#
                    u;
                    constructor(e) {
                        super(), this.#u = !1, this.#c = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.#o = e.cache, this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#s = e.state || function(e) {
                            let t = "function" == typeof e.initialData ? e.initialData() : e.initialData,
                                n = void 0 !== t,
                                i = n ? "function" == typeof e.initialDataUpdatedAt ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
                            return {
                                data: t,
                                dataUpdateCount: 0,
                                dataUpdatedAt: n ? i ? ? Date.now() : 0,
                                error: null,
                                errorUpdateCount: 0,
                                errorUpdatedAt: 0,
                                fetchFailureCount: 0,
                                fetchFailureReason: null,
                                fetchMeta: null,
                                isInvalidated: !1,
                                status: n ? "success" : "pending",
                                fetchStatus: "idle"
                            }
                        }(this.options), this.state = this.#s, this.scheduleGc()
                    }
                    get meta() {
                        return this.options.meta
                    }
                    setOptions(e) {
                        this.options = { ...this.#c,
                            ...e
                        }, this.updateGcTime(this.options.gcTime)
                    }
                    optionalRemove() {
                        this.observers.length || "idle" !== this.state.fetchStatus || this.#o.remove(this)
                    }
                    setData(e, t) {
                        var n, i;
                        let r = (n = this.state.data, "function" == typeof(i = this.options).structuralSharing ? i.structuralSharing(n, e) : !1 !== i.structuralSharing ? function e(t, n) {
                            if (t === n) return t;
                            let i = u(t) && u(n);
                            if (i || h(t) && h(n)) {
                                let r = i ? t : Object.keys(t),
                                    s = r.length,
                                    a = i ? n : Object.keys(n),
                                    o = a.length,
                                    l = i ? [] : {},
                                    c = 0;
                                for (let s = 0; s < o; s++) {
                                    let o = i ? s : a[s];
                                    !i && void 0 === t[o] && void 0 === n[o] && r.includes(o) ? (l[o] = void 0, c++) : (l[o] = e(t[o], n[o]), l[o] === t[o] && void 0 !== t[o] && c++)
                                }
                                return s === o && c === s ? t : l
                            }
                            return n
                        }(n, e) : e);
                        return this.#h({
                            data: r,
                            type: "success",
                            dataUpdatedAt: t ? .updatedAt,
                            manual: t ? .manual
                        }), r
                    }
                    setState(e, t) {
                        this.#h({
                            type: "setState",
                            state: e,
                            setStateOptions: t
                        })
                    }
                    cancel(e) {
                        let t = this.#l ? .promise;
                        return this.#l ? .cancel(e), t ? t.then(r).catch(r) : Promise.resolve()
                    }
                    destroy() {
                        super.destroy(), this.cancel({
                            silent: !0
                        })
                    }
                    reset() {
                        this.destroy(), this.setState(this.#s)
                    }
                    isActive() {
                        return this.observers.some(e => !1 !== e.options.enabled)
                    }
                    isDisabled() {
                        return this.getObserversCount() > 0 && !this.isActive()
                    }
                    isStale() {
                        return !!this.state.isInvalidated || (this.getObserversCount() > 0 ? this.observers.some(e => e.getCurrentResult().isStale) : void 0 === this.state.data)
                    }
                    isStaleByTime(e = 0) {
                        return this.state.isInvalidated || void 0 === this.state.data || !Math.max(this.state.dataUpdatedAt + (e || 0) - Date.now(), 0)
                    }
                    onFocus() {
                        let e = this.observers.find(e => e.shouldFetchOnWindowFocus());
                        e ? .refetch({
                            cancelRefetch: !1
                        }), this.#l ? .continue()
                    }
                    onOnline() {
                        let e = this.observers.find(e => e.shouldFetchOnReconnect());
                        e ? .refetch({
                            cancelRefetch: !1
                        }), this.#l ? .continue()
                    }
                    addObserver(e) {
                        this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), this.#o.notify({
                            type: "observerAdded",
                            query: this,
                            observer: e
                        }))
                    }
                    removeObserver(e) {
                        this.observers.includes(e) && (this.observers = this.observers.filter(t => t !== e), this.observers.length || (this.#l && (this.#u ? this.#l.cancel({
                            revert: !0
                        }) : this.#l.cancelRetry()), this.scheduleGc()), this.#o.notify({
                            type: "observerRemoved",
                            query: this,
                            observer: e
                        }))
                    }
                    getObserversCount() {
                        return this.observers.length
                    }
                    invalidate() {
                        this.state.isInvalidated || this.#h({
                            type: "invalidate"
                        })
                    }
                    fetch(e, t) {
                        if ("idle" !== this.state.fetchStatus) {
                            if (void 0 !== this.state.data && t ? .cancelRefetch) this.cancel({
                                silent: !0
                            });
                            else if (this.#l) return this.#l.continueRetry(), this.#l.promise
                        }
                        if (e && this.setOptions(e), !this.options.queryFn) {
                            let e = this.observers.find(e => e.options.queryFn);
                            e && this.setOptions(e.options)
                        }
                        let n = new AbortController,
                            i = {
                                queryKey: this.queryKey,
                                meta: this.meta
                            },
                            r = e => {
                                Object.defineProperty(e, "signal", {
                                    enumerable: !0,
                                    get: () => (this.#u = !0, n.signal)
                                })
                            };
                        r(i);
                        let s = {
                            fetchOptions: t,
                            options: this.options,
                            queryKey: this.queryKey,
                            state: this.state,
                            fetchFn: () => this.options.queryFn && this.options.queryFn !== f ? (this.#u = !1, this.options.persister) ? this.options.persister(this.options.queryFn, i, this) : this.options.queryFn(i) : Promise.reject(Error(`Missing queryFn: '${this.options.queryHash}'`))
                        };
                        r(s), this.options.behavior ? .onFetch(s, this), this.#a = this.state, ("idle" === this.state.fetchStatus || this.state.fetchMeta !== s.fetchOptions ? .meta) && this.#h({
                            type: "fetch",
                            meta: s.fetchOptions ? .meta
                        });
                        let a = e => {
                            S(e) && e.silent || this.#h({
                                type: "error",
                                error: e
                            }), S(e) || (this.#o.config.onError ? .(e, this), this.#o.config.onSettled ? .(this.state.data, e, this)), this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1
                        };
                        return this.#l = D({
                            fn: s.fetchFn,
                            abort: n.abort.bind(n),
                            onSuccess: e => {
                                if (void 0 === e) {
                                    a(Error(`${this.queryHash} data is undefined`));
                                    return
                                }
                                this.setData(e), this.#o.config.onSuccess ? .(e, this), this.#o.config.onSettled ? .(e, this.state.error, this), this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1
                            },
                            onError: a,
                            onFail: (e, t) => {
                                this.#h({
                                    type: "failed",
                                    failureCount: e,
                                    error: t
                                })
                            },
                            onPause: () => {
                                this.#h({
                                    type: "pause"
                                })
                            },
                            onContinue: () => {
                                this.#h({
                                    type: "continue"
                                })
                            },
                            retry: s.options.retry,
                            retryDelay: s.options.retryDelay,
                            networkMode: s.options.networkMode,
                            canRun: () => !0
                        }), this.#l.start()
                    }#
                    h(e) {
                        this.state = (t => {
                            switch (e.type) {
                                case "failed":
                                    return { ...t,
                                        fetchFailureCount: e.failureCount,
                                        fetchFailureReason: e.error
                                    };
                                case "pause":
                                    return { ...t,
                                        fetchStatus: "paused"
                                    };
                                case "continue":
                                    return { ...t,
                                        fetchStatus: "fetching"
                                    };
                                case "fetch":
                                    var n;
                                    return { ...t,
                                        ...(n = t.data, {
                                            fetchFailureCount: 0,
                                            fetchFailureReason: null,
                                            fetchStatus: T(this.options.networkMode) ? "fetching" : "paused",
                                            ...void 0 === n && {
                                                error: null,
                                                status: "pending"
                                            }
                                        }),
                                        fetchMeta: e.meta ? ? null
                                    };
                                case "success":
                                    return { ...t,
                                        data: e.data,
                                        dataUpdateCount: t.dataUpdateCount + 1,
                                        dataUpdatedAt: e.dataUpdatedAt ? ? Date.now(),
                                        error: null,
                                        isInvalidated: !1,
                                        status: "success",
                                        ...!e.manual && {
                                            fetchStatus: "idle",
                                            fetchFailureCount: 0,
                                            fetchFailureReason: null
                                        }
                                    };
                                case "error":
                                    let i = e.error;
                                    if (S(i) && i.revert && this.#a) return { ...this.#a,
                                        fetchStatus: "idle"
                                    };
                                    return { ...t,
                                        error: i,
                                        errorUpdateCount: t.errorUpdateCount + 1,
                                        errorUpdatedAt: Date.now(),
                                        fetchFailureCount: t.fetchFailureCount + 1,
                                        fetchFailureReason: i,
                                        fetchStatus: "idle",
                                        status: "error"
                                    };
                                case "invalidate":
                                    return { ...t,
                                        isInvalidated: !0
                                    };
                                case "setState":
                                    return { ...t,
                                        ...e.state
                                    }
                            }
                        })(this.state), y.batch(() => {
                            this.observers.forEach(e => {
                                e.onQueryUpdate()
                            }), this.#o.notify({
                                query: this,
                                type: "updated",
                                action: e
                            })
                        })
                    }
                },
                b = class extends M {
                    constructor(e = {}) {
                        super(), this.config = e, this.#d = new Map
                    }#
                    d;
                    build(e, t, n) {
                        let i = t.queryKey,
                            r = t.queryHash ? ? o(i, t),
                            s = this.get(r);
                        return s || (s = new E({
                            cache: this,
                            queryKey: i,
                            queryHash: r,
                            options: e.defaultQueryOptions(t),
                            state: n,
                            defaultOptions: e.getQueryDefaults(i)
                        }), this.add(s)), s
                    }
                    add(e) {
                        this.#d.has(e.queryHash) || (this.#d.set(e.queryHash, e), this.notify({
                            type: "added",
                            query: e
                        }))
                    }
                    remove(e) {
                        let t = this.#d.get(e.queryHash);
                        t && (e.destroy(), t === e && this.#d.delete(e.queryHash), this.notify({
                            type: "removed",
                            query: e
                        }))
                    }
                    clear() {
                        y.batch(() => {
                            this.getAll().forEach(e => {
                                this.remove(e)
                            })
                        })
                    }
                    get(e) {
                        return this.#d.get(e)
                    }
                    getAll() {
                        return [...this.#d.values()]
                    }
                    find(e) {
                        let t = {
                            exact: !0,
                            ...e
                        };
                        return this.getAll().find(e => s(t, e))
                    }
                    findAll(e = {}) {
                        let t = this.getAll();
                        return Object.keys(e).length > 0 ? t.filter(t => s(e, t)) : t
                    }
                    notify(e) {
                        y.batch(() => {
                            this.listeners.forEach(t => {
                                t(e)
                            })
                        })
                    }
                    onFocus() {
                        y.batch(() => {
                            this.getAll().forEach(e => {
                                e.onFocus()
                            })
                        })
                    }
                    onOnline() {
                        y.batch(() => {
                            this.getAll().forEach(e => {
                                e.onOnline()
                            })
                        })
                    }
                },
                L = class extends U {#
                    p;#
                    g;#
                    l;
                    constructor(e) {
                        super(), this.mutationId = e.mutationId, this.#g = e.mutationCache, this.#p = [], this.state = e.state || {
                            context: void 0,
                            data: void 0,
                            error: null,
                            failureCount: 0,
                            failureReason: null,
                            isPaused: !1,
                            status: "idle",
                            variables: void 0,
                            submittedAt: 0
                        }, this.setOptions(e.options), this.scheduleGc()
                    }
                    setOptions(e) {
                        this.options = e, this.updateGcTime(this.options.gcTime)
                    }
                    get meta() {
                        return this.options.meta
                    }
                    addObserver(e) {
                        this.#p.includes(e) || (this.#p.push(e), this.clearGcTimeout(), this.#g.notify({
                            type: "observerAdded",
                            mutation: this,
                            observer: e
                        }))
                    }
                    removeObserver(e) {
                        this.#p = this.#p.filter(t => t !== e), this.scheduleGc(), this.#g.notify({
                            type: "observerRemoved",
                            mutation: this,
                            observer: e
                        })
                    }
                    optionalRemove() {
                        this.#p.length || ("pending" === this.state.status ? this.scheduleGc() : this.#g.remove(this))
                    }
                    continue () {
                        return this.#l ? .continue() ? ? this.execute(this.state.variables)
                    }
                    async execute(e) {
                        this.#l = D({
                            fn: () => this.options.mutationFn ? this.options.mutationFn(e) : Promise.reject(Error("No mutationFn found")),
                            onFail: (e, t) => {
                                this.#h({
                                    type: "failed",
                                    failureCount: e,
                                    error: t
                                })
                            },
                            onPause: () => {
                                this.#h({
                                    type: "pause"
                                })
                            },
                            onContinue: () => {
                                this.#h({
                                    type: "continue"
                                })
                            },
                            retry: this.options.retry ? ? 0,
                            retryDelay: this.options.retryDelay,
                            networkMode: this.options.networkMode,
                            canRun: () => this.#g.canRun(this)
                        });
                        let t = "pending" === this.state.status,
                            n = !this.#l.canStart();
                        try {
                            if (!t) {
                                this.#h({
                                    type: "pending",
                                    variables: e,
                                    isPaused: n
                                }), await this.#g.config.onMutate ? .(e, this);
                                let t = await this.options.onMutate ? .(e);
                                t !== this.state.context && this.#h({
                                    type: "pending",
                                    context: t,
                                    variables: e,
                                    isPaused: n
                                })
                            }
                            let i = await this.#l.start();
                            return await this.#g.config.onSuccess ? .(i, e, this.state.context, this), await this.options.onSuccess ? .(i, e, this.state.context), await this.#g.config.onSettled ? .(i, null, this.state.variables, this.state.context, this), await this.options.onSettled ? .(i, null, e, this.state.context), this.#h({
                                type: "success",
                                data: i
                            }), i
                        } catch (t) {
                            try {
                                throw await this.#g.config.onError ? .(t, e, this.state.context, this), await this.options.onError ? .(t, e, this.state.context), await this.#g.config.onSettled ? .(void 0, t, this.state.variables, this.state.context, this), await this.options.onSettled ? .(void 0, t, e, this.state.context), t
                            } finally {
                                this.#h({
                                    type: "error",
                                    error: t
                                })
                            }
                        } finally {
                            this.#g.runNext(this)
                        }
                    }#
                    h(e) {
                        this.state = (t => {
                            switch (e.type) {
                                case "failed":
                                    return { ...t,
                                        failureCount: e.failureCount,
                                        failureReason: e.error
                                    };
                                case "pause":
                                    return { ...t,
                                        isPaused: !0
                                    };
                                case "continue":
                                    return { ...t,
                                        isPaused: !1
                                    };
                                case "pending":
                                    return { ...t,
                                        context: e.context,
                                        data: void 0,
                                        failureCount: 0,
                                        failureReason: null,
                                        error: null,
                                        isPaused: e.isPaused,
                                        status: "pending",
                                        variables: e.variables,
                                        submittedAt: Date.now()
                                    };
                                case "success":
                                    return { ...t,
                                        data: e.data,
                                        failureCount: 0,
                                        failureReason: null,
                                        error: null,
                                        status: "success",
                                        isPaused: !1
                                    };
                                case "error":
                                    return { ...t,
                                        data: void 0,
                                        error: e.error,
                                        failureCount: t.failureCount + 1,
                                        failureReason: e.error,
                                        isPaused: !1,
                                        status: "error"
                                    }
                            }
                        })(this.state), y.batch(() => {
                            this.#p.forEach(t => {
                                t.onMutationUpdate(e)
                            }), this.#g.notify({
                                mutation: this,
                                type: "updated",
                                action: e
                            })
                        })
                    }
                },
                O = class extends M {
                    constructor(e = {}) {
                        super(), this.config = e, this.#f = new Map, this.#y = Date.now()
                    }#
                    f;#
                    y;
                    build(e, t, n) {
                        let i = new L({
                            mutationCache: this,
                            mutationId: ++this.#y,
                            options: e.defaultMutationOptions(t),
                            state: n
                        });
                        return this.add(i), i
                    }
                    add(e) {
                        let t = v(e),
                            n = this.#f.get(t) ? ? [];
                        n.push(e), this.#f.set(t, n), this.notify({
                            type: "added",
                            mutation: e
                        })
                    }
                    remove(e) {
                        let t = v(e);
                        if (this.#f.has(t)) {
                            let n = this.#f.get(t) ? .filter(t => t !== e);
                            n && (0 === n.length ? this.#f.delete(t) : this.#f.set(t, n))
                        }
                        this.notify({
                            type: "removed",
                            mutation: e
                        })
                    }
                    canRun(e) {
                        let t = this.#f.get(v(e)) ? .find(e => "pending" === e.state.status);
                        return !t || t === e
                    }
                    runNext(e) {
                        let t = this.#f.get(v(e)) ? .find(t => t !== e && t.state.isPaused);
                        return t ? .continue() ? ? Promise.resolve()
                    }
                    clear() {
                        y.batch(() => {
                            this.getAll().forEach(e => {
                                this.remove(e)
                            })
                        })
                    }
                    getAll() {
                        return [...this.#f.values()].flat()
                    }
                    find(e) {
                        let t = {
                            exact: !0,
                            ...e
                        };
                        return this.getAll().find(e => a(t, e))
                    }
                    findAll(e = {}) {
                        return this.getAll().filter(t => a(e, t))
                    }
                    notify(e) {
                        y.batch(() => {
                            this.listeners.forEach(t => {
                                t(e)
                            })
                        })
                    }
                    resumePausedMutations() {
                        let e = this.getAll().filter(e => e.state.isPaused);
                        return y.batch(() => Promise.all(e.map(e => e.continue().catch(r))))
                    }
                };

            function v(e) {
                return e.options.scope ? .id ? ? String(e.mutationId)
            }

            function z(e, {
                pages: t,
                pageParams: n
            }) {
                let i = t.length - 1;
                return e.getNextPageParam(t[i], t, n[i], n)
            }
            var I = class {#
                M;#
                g;#
                c;#
                m;#
                N;#
                w;#
                T;#
                j;
                constructor(e = {}) {
                    this.#M = e.queryCache || new b, this.#g = e.mutationCache || new O, this.#c = e.defaultOptions || {}, this.#m = new Map, this.#N = new Map, this.#w = 0
                }
                mount() {
                    this.#w++, 1 === this.#w && (this.#T = m.subscribe(async e => {
                        e && (await this.resumePausedMutations(), this.#M.onFocus())
                    }), this.#j = N.subscribe(async e => {
                        e && (await this.resumePausedMutations(), this.#M.onOnline())
                    }))
                }
                unmount() {
                    this.#w--, 0 === this.#w && (this.#T ? .(), this.#T = void 0, this.#j ? .(), this.#j = void 0)
                }
                isFetching(e) {
                    return this.#M.findAll({ ...e,
                        fetchStatus: "fetching"
                    }).length
                }
                isMutating(e) {
                    return this.#g.findAll({ ...e,
                        status: "pending"
                    }).length
                }
                getQueryData(e) {
                    let t = this.defaultQueryOptions({
                        queryKey: e
                    });
                    return this.#M.get(t.queryHash) ? .state.data
                }
                ensureQueryData(e) {
                    let t = this.getQueryData(e.queryKey);
                    if (void 0 === t) return this.fetchQuery(e); {
                        let n = this.defaultQueryOptions(e),
                            i = this.#M.build(this, n);
                        return e.revalidateIfStale && i.isStaleByTime(n.staleTime) && this.prefetchQuery(n), Promise.resolve(t)
                    }
                }
                getQueriesData(e) {
                    return this.#M.findAll(e).map(({
                        queryKey: e,
                        state: t
                    }) => [e, t.data])
                }
                setQueryData(e, t, n) {
                    let i = this.defaultQueryOptions({
                            queryKey: e
                        }),
                        r = this.#M.get(i.queryHash),
                        s = r ? .state.data,
                        a = "function" == typeof t ? t(s) : t;
                    if (void 0 !== a) return this.#M.build(this, i).setData(a, { ...n,
                        manual: !0
                    })
                }
                setQueriesData(e, t, n) {
                    return y.batch(() => this.#M.findAll(e).map(({
                        queryKey: e
                    }) => [e, this.setQueryData(e, t, n)]))
                }
                getQueryState(e) {
                    let t = this.defaultQueryOptions({
                        queryKey: e
                    });
                    return this.#M.get(t.queryHash) ? .state
                }
                removeQueries(e) {
                    let t = this.#M;
                    y.batch(() => {
                        t.findAll(e).forEach(e => {
                            t.remove(e)
                        })
                    })
                }
                resetQueries(e, t) {
                    let n = this.#M,
                        i = {
                            type: "active",
                            ...e
                        };
                    return y.batch(() => (n.findAll(e).forEach(e => {
                        e.reset()
                    }), this.refetchQueries(i, t)))
                }
                cancelQueries(e = {}, t = {}) {
                    let n = {
                        revert: !0,
                        ...t
                    };
                    return Promise.all(y.batch(() => this.#M.findAll(e).map(e => e.cancel(n)))).then(r).catch(r)
                }
                invalidateQueries(e = {}, t = {}) {
                    return y.batch(() => {
                        if (this.#M.findAll(e).forEach(e => {
                                e.invalidate()
                            }), "none" === e.refetchType) return Promise.resolve();
                        let n = { ...e,
                            type: e.refetchType ? ? e.type ? ? "active"
                        };
                        return this.refetchQueries(n, t)
                    })
                }
                refetchQueries(e = {}, t) {
                    let n = { ...t,
                        cancelRefetch: t ? .cancelRefetch ? ? !0
                    };
                    return Promise.all(y.batch(() => this.#M.findAll(e).filter(e => !e.isDisabled()).map(e => {
                        let t = e.fetch(void 0, n);
                        return n.throwOnError || (t = t.catch(r)), "paused" === e.state.fetchStatus ? Promise.resolve() : t
                    }))).then(r)
                }
                fetchQuery(e) {
                    let t = this.defaultQueryOptions(e);
                    void 0 === t.retry && (t.retry = !1);
                    let n = this.#M.build(this, t);
                    return n.isStaleByTime(t.staleTime) ? n.fetch(t) : Promise.resolve(n.state.data)
                }
                prefetchQuery(e) {
                    return this.fetchQuery(e).then(r).catch(r)
                }
                fetchInfiniteQuery(e) {
                    var t;
                    return e.behavior = (t = e.pages, {
                        onFetch: (e, n) => {
                            let i = async () => {
                                let n;
                                let i = e.options,
                                    r = e.fetchOptions ? .meta ? .fetchMore ? .direction,
                                    s = e.state.data ? .pages || [],
                                    a = e.state.data ? .pageParams || [],
                                    o = !1,
                                    l = t => {
                                        Object.defineProperty(t, "signal", {
                                            enumerable: !0,
                                            get: () => (e.signal.aborted ? o = !0 : e.signal.addEventListener("abort", () => {
                                                o = !0
                                            }), e.signal)
                                        })
                                    },
                                    c = e.options.queryFn && e.options.queryFn !== f ? e.options.queryFn : () => Promise.reject(Error(`Missing queryFn: '${e.options.queryHash}'`)),
                                    u = async (t, n, i) => {
                                        if (o) return Promise.reject();
                                        if (null == n && t.pages.length) return Promise.resolve(t);
                                        let r = {
                                            queryKey: e.queryKey,
                                            pageParam: n,
                                            direction: i ? "backward" : "forward",
                                            meta: e.options.meta
                                        };
                                        l(r);
                                        let s = await c(r),
                                            {
                                                maxPages: a
                                            } = e.options,
                                            u = i ? g : p;
                                        return {
                                            pages: u(t.pages, s, a),
                                            pageParams: u(t.pageParams, n, a)
                                        }
                                    };
                                if (r && s.length) {
                                    let e = "backward" === r,
                                        t = {
                                            pages: s,
                                            pageParams: a
                                        },
                                        o = (e ? function(e, {
                                            pages: t,
                                            pageParams: n
                                        }) {
                                            return e.getPreviousPageParam ? .(t[0], t, n[0], n)
                                        } : z)(i, t);
                                    n = await u(t, o, e)
                                } else {
                                    n = await u({
                                        pages: [],
                                        pageParams: []
                                    }, a[0] ? ? i.initialPageParam);
                                    let e = t ? ? s.length;
                                    for (let t = 1; t < e; t++) {
                                        let e = z(i, n);
                                        n = await u(n, e)
                                    }
                                }
                                return n
                            };
                            e.options.persister ? e.fetchFn = () => e.options.persister ? .(i, {
                                queryKey: e.queryKey,
                                meta: e.options.meta,
                                signal: e.signal
                            }, n) : e.fetchFn = i
                        }
                    }), this.fetchQuery(e)
                }
                prefetchInfiniteQuery(e) {
                    return this.fetchInfiniteQuery(e).then(r).catch(r)
                }
                resumePausedMutations() {
                    return N.isOnline() ? this.#g.resumePausedMutations() : Promise.resolve()
                }
                getQueryCache() {
                    return this.#M
                }
                getMutationCache() {
                    return this.#g
                }
                getDefaultOptions() {
                    return this.#c
                }
                setDefaultOptions(e) {
                    this.#c = e
                }
                setQueryDefaults(e, t) {
                    this.#m.set(l(e), {
                        queryKey: e,
                        defaultOptions: t
                    })
                }
                getQueryDefaults(e) {
                    let t = [...this.#m.values()],
                        n = {};
                    return t.forEach(t => {
                        c(e, t.queryKey) && (n = { ...n,
                            ...t.defaultOptions
                        })
                    }), n
                }
                setMutationDefaults(e, t) {
                    this.#N.set(l(e), {
                        mutationKey: e,
                        defaultOptions: t
                    })
                }
                getMutationDefaults(e) {
                    let t = [...this.#N.values()],
                        n = {};
                    return t.forEach(t => {
                        c(e, t.mutationKey) && (n = { ...n,
                            ...t.defaultOptions
                        })
                    }), n
                }
                defaultQueryOptions(e) {
                    if (e._defaulted) return e;
                    let t = { ...this.#c.queries,
                        ...this.getQueryDefaults(e.queryKey),
                        ...e,
                        _defaulted: !0
                    };
                    return t.queryHash || (t.queryHash = o(t.queryKey, t)), void 0 === t.refetchOnReconnect && (t.refetchOnReconnect = "always" !== t.networkMode), void 0 === t.throwOnError && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), !0 !== t.enabled && t.queryFn === f && (t.enabled = !1), t
                }
                defaultMutationOptions(e) {
                    return e ? ._defaulted ? e : { ...this.#c.mutations,
                        ...e ? .mutationKey && this.getMutationDefaults(e.mutationKey),
                        ...e,
                        _defaulted : !0
                    }
                }
                clear() {
                    this.#M.clear(), this.#g.clear()
                }
            }
        },
        93191: function(e, t, n) {
            "use strict";
            n.d(t, {
                aH: function() {
                    return a
                }
            });
            var i = n(2265),
                r = n(57437),
                s = i.createContext(void 0),
                a = e => {
                    let {
                        client: t,
                        children: n
                    } = e;
                    return i.useEffect(() => (t.mount(), () => {
                        t.unmount()
                    }), [t]), (0, r.jsx)(s.Provider, {
                        value: t,
                        children: n
                    })
                }
        },
        49321: function(e, t, n) {
            "use strict";
            n.d(t, {
                V: function() {
                    return i
                }
            });
            let i = "standard:connect"
        },
        48459: function(e, t, n) {
            "use strict";
            n.d(t, {
                R: function() {
                    return i
                }
            });
            let i = "standard:disconnect"
        },
        51169: function(e, t, n) {
            "use strict";
            n.d(t, {
                k: function() {
                    return i
                }
            });
            let i = "standard:events"
        },
        64312: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return i
                }
            });
            var i = function(e) {
                return {
                    type: "backend",
                    init: function(e, t, n) {},
                    read: function(t, n, i) {
                        if ("function" == typeof e) {
                            if (e.length < 3) {
                                try {
                                    var r = e(t, n);
                                    r && "function" == typeof r.then ? r.then(function(e) {
                                        return i(null, e && e.default || e)
                                    }).catch(i) : i(null, r)
                                } catch (e) {
                                    i(e)
                                }
                                return
                            }
                            e(t, n, i);
                            return
                        }
                        i(null, e && e[t] && e[t][n])
                    }
                }
            }
        },
        46027: function(e, t, n) {
            "use strict";
            n.d(t, {
                Fs: function() {
                    return B
                }
            });
            let i = {
                type: "logger",
                log(e) {
                    this.output("log", e)
                },
                warn(e) {
                    this.output("warn", e)
                },
                error(e) {
                    this.output("error", e)
                },
                output(e, t) {
                    console && console[e] && console[e].apply(console, t)
                }
            };
            class r {
                constructor(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this.init(e, t)
                }
                init(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this.prefix = t.prefix || "i18next:", this.logger = e || i, this.options = t, this.debug = t.debug
                }
                log() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return this.forward(t, "log", "", !0)
                }
                warn() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return this.forward(t, "warn", "", !0)
                }
                error() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return this.forward(t, "error", "")
                }
                deprecate() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return this.forward(t, "warn", "WARNING DEPRECATED: ", !0)
                }
                forward(e, t, n, i) {
                    return i && !this.debug ? null : ("string" == typeof e[0] && (e[0] = `${n}${this.prefix} ${e[0]}`), this.logger[t](e))
                }
                create(e) {
                    return new r(this.logger, {
                        prefix: `${this.prefix}:${e}:`,
                        ...this.options
                    })
                }
                clone(e) {
                    return (e = e || this.options).prefix = e.prefix || this.prefix, new r(this.logger, e)
                }
            }
            var s = new r;
            class a {
                constructor() {
                    this.observers = {}
                }
                on(e, t) {
                    return e.split(" ").forEach(e => {
                        this.observers[e] || (this.observers[e] = new Map);
                        let n = this.observers[e].get(t) || 0;
                        this.observers[e].set(t, n + 1)
                    }), this
                }
                off(e, t) {
                    if (this.observers[e]) {
                        if (!t) {
                            delete this.observers[e];
                            return
                        }
                        this.observers[e].delete(t)
                    }
                }
                emit(e) {
                    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
                    this.observers[e] && Array.from(this.observers[e].entries()).forEach(e => {
                        let [t, i] = e;
                        for (let e = 0; e < i; e++) t(...n)
                    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(t => {
                        let [i, r] = t;
                        for (let t = 0; t < r; t++) i.apply(i, [e, ...n])
                    })
                }
            }

            function o() {
                let e, t;
                let n = new Promise((n, i) => {
                    e = n, t = i
                });
                return n.resolve = e, n.reject = t, n
            }

            function l(e) {
                return null == e ? "" : "" + e
            }
            let c = /###/g;

            function u(e, t, n) {
                function i(e) {
                    return e && e.indexOf("###") > -1 ? e.replace(c, ".") : e
                }

                function r() {
                    return !e || "string" == typeof e
                }
                let s = "string" != typeof t ? t : t.split("."),
                    a = 0;
                for (; a < s.length - 1;) {
                    if (r()) return {};
                    let t = i(s[a]);
                    !e[t] && n && (e[t] = new n), e = Object.prototype.hasOwnProperty.call(e, t) ? e[t] : {}, ++a
                }
                return r() ? {} : {
                    obj: e,
                    k: i(s[a])
                }
            }

            function h(e, t, n) {
                let {
                    obj: i,
                    k: r
                } = u(e, t, Object);
                if (void 0 !== i || 1 === t.length) {
                    i[r] = n;
                    return
                }
                let s = t[t.length - 1],
                    a = t.slice(0, t.length - 1),
                    o = u(e, a, Object);
                for (; void 0 === o.obj && a.length;) s = `${a[a.length-1]}.${s}`, (o = u(e, a = a.slice(0, a.length - 1), Object)) && o.obj && void 0 !== o.obj[`${o.k}.${s}`] && (o.obj = void 0);
                o.obj[`${o.k}.${s}`] = n
            }

            function d(e, t) {
                let {
                    obj: n,
                    k: i
                } = u(e, t);
                if (n) return n[i]
            }

            function p(e) {
                return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            }
            var g = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;"
            };

            function f(e) {
                return "string" == typeof e ? e.replace(/[&<>"'\/]/g, e => g[e]) : e
            }
            class y {
                constructor(e) {
                    this.capacity = e, this.regExpMap = new Map, this.regExpQueue = []
                }
                getRegExp(e) {
                    let t = this.regExpMap.get(e);
                    if (void 0 !== t) return t;
                    let n = new RegExp(e);
                    return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(e, n), this.regExpQueue.push(e), n
                }
            }
            let M = [" ", ",", "?", "!", ";"],
                m = new y(20);

            function N(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
                if (!e) return;
                if (e[t]) return e[t];
                let i = t.split(n),
                    r = e;
                for (let e = 0; e < i.length;) {
                    let t;
                    if (!r || "object" != typeof r) return;
                    let s = "";
                    for (let a = e; a < i.length; ++a)
                        if (a !== e && (s += n), s += i[a], void 0 !== (t = r[s])) {
                            if (["string", "number", "boolean"].indexOf(typeof t) > -1 && a < i.length - 1) continue;
                            e += a - e + 1;
                            break
                        }
                    r = t
                }
                return r
            }

            function w(e) {
                return e && e.indexOf("_") > 0 ? e.replace("_", "-") : e
            }
            class T extends a {
                constructor(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        ns: ["translation"],
                        defaultNS: "translation"
                    };
                    super(), this.data = e || {}, this.options = t, void 0 === this.options.keySeparator && (this.options.keySeparator = "."), void 0 === this.options.ignoreJSONStructure && (this.options.ignoreJSONStructure = !0)
                }
                addNamespaces(e) {
                    0 > this.options.ns.indexOf(e) && this.options.ns.push(e)
                }
                removeNamespaces(e) {
                    let t = this.options.ns.indexOf(e);
                    t > -1 && this.options.ns.splice(t, 1)
                }
                getResource(e, t, n) {
                    let i, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        s = void 0 !== r.keySeparator ? r.keySeparator : this.options.keySeparator,
                        a = void 0 !== r.ignoreJSONStructure ? r.ignoreJSONStructure : this.options.ignoreJSONStructure;
                    e.indexOf(".") > -1 ? i = e.split(".") : (i = [e, t], n && (Array.isArray(n) ? i.push(...n) : "string" == typeof n && s ? i.push(...n.split(s)) : i.push(n)));
                    let o = d(this.data, i);
                    return (!o && !t && !n && e.indexOf(".") > -1 && (e = i[0], t = i[1], n = i.slice(2).join(".")), o || !a || "string" != typeof n) ? o : N(this.data && this.data[e] && this.data[e][t], n, s)
                }
                addResource(e, t, n, i) {
                    let r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {
                            silent: !1
                        },
                        s = void 0 !== r.keySeparator ? r.keySeparator : this.options.keySeparator,
                        a = [e, t];
                    n && (a = a.concat(s ? n.split(s) : n)), e.indexOf(".") > -1 && (a = e.split("."), i = t, t = a[1]), this.addNamespaces(t), h(this.data, a, i), r.silent || this.emit("added", e, t, n, i)
                }
                addResources(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
                        silent: !1
                    };
                    for (let i in n)("string" == typeof n[i] || "[object Array]" === Object.prototype.toString.apply(n[i])) && this.addResource(e, t, i, n[i], {
                        silent: !0
                    });
                    i.silent || this.emit("added", e, t, n)
                }
                addResourceBundle(e, t, n, i, r) {
                    let s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {
                            silent: !1,
                            skipCopy: !1
                        },
                        a = [e, t];
                    e.indexOf(".") > -1 && (a = e.split("."), i = n, n = t, t = a[1]), this.addNamespaces(t);
                    let o = d(this.data, a) || {};
                    s.skipCopy || (n = JSON.parse(JSON.stringify(n))), i ? function e(t, n, i) {
                        for (let r in n) "__proto__" !== r && "constructor" !== r && (r in t ? "string" == typeof t[r] || t[r] instanceof String || "string" == typeof n[r] || n[r] instanceof String ? i && (t[r] = n[r]) : e(t[r], n[r], i) : t[r] = n[r]);
                        return t
                    }(o, n, r) : o = { ...o,
                        ...n
                    }, h(this.data, a, o), s.silent || this.emit("added", e, t, n)
                }
                removeResourceBundle(e, t) {
                    this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t)
                }
                hasResourceBundle(e, t) {
                    return void 0 !== this.getResource(e, t)
                }
                getResourceBundle(e, t) {
                    return (t || (t = this.options.defaultNS), "v1" === this.options.compatibilityAPI) ? { ...this.getResource(e, t)
                    } : this.getResource(e, t)
                }
                getDataByLanguage(e) {
                    return this.data[e]
                }
                hasLanguageSomeTranslations(e) {
                    let t = this.getDataByLanguage(e);
                    return !!(t && Object.keys(t) || []).find(e => t[e] && Object.keys(t[e]).length > 0)
                }
                toJSON() {
                    return this.data
                }
            }
            var j = {
                processors: {},
                addPostProcessor(e) {
                    this.processors[e.name] = e
                },
                handle(e, t, n, i, r) {
                    return e.forEach(e => {
                        this.processors[e] && (t = this.processors[e].process(t, n, i, r))
                    }), t
                }
            };
            let S = {};
            class D extends a {
                constructor(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    super(),
                        function(e, t, n) {
                            e.forEach(e => {
                                t[e] && (n[e] = t[e])
                            })
                        }(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, void 0 === this.options.keySeparator && (this.options.keySeparator = "."), this.logger = s.create("translator")
                }
                changeLanguage(e) {
                    e && (this.language = e)
                }
                exists(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        interpolation: {}
                    };
                    if (null == e) return !1;
                    let n = this.resolve(e, t);
                    return n && void 0 !== n.res
                }
                extractFromKey(e, t) {
                    let n = void 0 !== t.nsSeparator ? t.nsSeparator : this.options.nsSeparator;
                    void 0 === n && (n = ":");
                    let i = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator,
                        r = t.ns || this.options.defaultNS || [],
                        s = n && e.indexOf(n) > -1,
                        a = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && ! function(e, t, n) {
                            t = t || "", n = n || "";
                            let i = M.filter(e => 0 > t.indexOf(e) && 0 > n.indexOf(e));
                            if (0 === i.length) return !0;
                            let r = m.getRegExp(`(${i.map(e=>"?"===e?"\\?":e).join("|")})`),
                                s = !r.test(e);
                            if (!s) {
                                let t = e.indexOf(n);
                                t > 0 && !r.test(e.substring(0, t)) && (s = !0)
                            }
                            return s
                        }(e, n, i);
                    if (s && !a) {
                        let t = e.match(this.interpolator.nestingRegexp);
                        if (t && t.length > 0) return {
                            key: e,
                            namespaces: r
                        };
                        let s = e.split(n);
                        (n !== i || n === i && this.options.ns.indexOf(s[0]) > -1) && (r = s.shift()), e = s.join(i)
                    }
                    return "string" == typeof r && (r = [r]), {
                        key: e,
                        namespaces: r
                    }
                }
                translate(e, t, n) {
                    if ("object" != typeof t && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), "object" == typeof t && (t = { ...t
                        }), t || (t = {}), null == e) return "";
                    Array.isArray(e) || (e = [String(e)]);
                    let i = void 0 !== t.returnDetails ? t.returnDetails : this.options.returnDetails,
                        r = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator,
                        {
                            key: s,
                            namespaces: a
                        } = this.extractFromKey(e[e.length - 1], t),
                        o = a[a.length - 1],
                        l = t.lng || this.language,
                        c = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
                    if (l && "cimode" === l.toLowerCase()) {
                        if (c) {
                            let e = t.nsSeparator || this.options.nsSeparator;
                            return i ? {
                                res: `${o}${e}${s}`,
                                usedKey: s,
                                exactUsedKey: s,
                                usedLng: l,
                                usedNS: o,
                                usedParams: this.getUsedParamsDetails(t)
                            } : `${o}${e}${s}`
                        }
                        return i ? {
                            res: s,
                            usedKey: s,
                            exactUsedKey: s,
                            usedLng: l,
                            usedNS: o,
                            usedParams: this.getUsedParamsDetails(t)
                        } : s
                    }
                    let u = this.resolve(e, t),
                        h = u && u.res,
                        d = u && u.usedKey || s,
                        p = u && u.exactUsedKey || s,
                        g = Object.prototype.toString.apply(h),
                        f = void 0 !== t.joinArrays ? t.joinArrays : this.options.joinArrays,
                        y = !this.i18nFormat || this.i18nFormat.handleAsObject,
                        M = "string" != typeof h && "boolean" != typeof h && "number" != typeof h;
                    if (y && h && M && 0 > ["[object Number]", "[object Function]", "[object RegExp]"].indexOf(g) && !("string" == typeof f && "[object Array]" === g)) {
                        if (!t.returnObjects && !this.options.returnObjects) {
                            this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                            let e = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(d, h, { ...t,
                                ns: a
                            }) : `key '${s} (${this.language})' returned an object instead of string.`;
                            return i ? (u.res = e, u.usedParams = this.getUsedParamsDetails(t), u) : e
                        }
                        if (r) {
                            let e = "[object Array]" === g,
                                n = e ? [] : {},
                                i = e ? p : d;
                            for (let e in h)
                                if (Object.prototype.hasOwnProperty.call(h, e)) {
                                    let s = `${i}${r}${e}`;
                                    n[e] = this.translate(s, { ...t,
                                        joinArrays: !1,
                                        ns: a
                                    }), n[e] === s && (n[e] = h[e])
                                }
                            h = n
                        }
                    } else if (y && "string" == typeof f && "[object Array]" === g)(h = h.join(f)) && (h = this.extendTranslation(h, e, t, n));
                    else {
                        let i = !1,
                            a = !1,
                            c = void 0 !== t.count && "string" != typeof t.count,
                            d = D.hasDefaultValue(t),
                            p = c ? this.pluralResolver.getSuffix(l, t.count, t) : "",
                            g = t.ordinal && c ? this.pluralResolver.getSuffix(l, t.count, {
                                ordinal: !1
                            }) : "",
                            f = c && !t.ordinal && 0 === t.count && this.pluralResolver.shouldUseIntlApi(),
                            y = f && t[`defaultValue${this.options.pluralSeparator}zero`] || t[`defaultValue${p}`] || t[`defaultValue${g}`] || t.defaultValue;
                        !this.isValidLookup(h) && d && (i = !0, h = y), this.isValidLookup(h) || (a = !0, h = s);
                        let M = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && a ? void 0 : h,
                            m = d && y !== h && this.options.updateMissing;
                        if (a || i || m) {
                            if (this.logger.log(m ? "updateKey" : "missingKey", l, o, s, m ? y : h), r) {
                                let e = this.resolve(s, { ...t,
                                    keySeparator: !1
                                });
                                e && e.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                            }
                            let e = [],
                                n = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
                            if ("fallback" === this.options.saveMissingTo && n && n[0])
                                for (let t = 0; t < n.length; t++) e.push(n[t]);
                            else "all" === this.options.saveMissingTo ? e = this.languageUtils.toResolveHierarchy(t.lng || this.language) : e.push(t.lng || this.language);
                            let i = (e, n, i) => {
                                let r = d && i !== h ? i : M;
                                this.options.missingKeyHandler ? this.options.missingKeyHandler(e, o, n, r, m, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(e, o, n, r, m, t), this.emit("missingKey", e, o, n, h)
                            };
                            this.options.saveMissing && (this.options.saveMissingPlurals && c ? e.forEach(e => {
                                let n = this.pluralResolver.getSuffixes(e, t);
                                f && t[`defaultValue${this.options.pluralSeparator}zero`] && 0 > n.indexOf(`${this.options.pluralSeparator}zero`) && n.push(`${this.options.pluralSeparator}zero`), n.forEach(n => {
                                    i([e], s + n, t[`defaultValue${n}`] || y)
                                })
                            }) : i(e, s, y))
                        }
                        h = this.extendTranslation(h, e, t, u, n), a && h === s && this.options.appendNamespaceToMissingKey && (h = `${o}:${s}`), (a || i) && this.options.parseMissingKeyHandler && (h = "v1" !== this.options.compatibilityAPI ? this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${o}:${s}` : s, i ? h : void 0) : this.options.parseMissingKeyHandler(h))
                    }
                    return i ? (u.res = h, u.usedParams = this.getUsedParamsDetails(t), u) : h
                }
                extendTranslation(e, t, n, i, r) {
                    var s = this;
                    if (this.i18nFormat && this.i18nFormat.parse) e = this.i18nFormat.parse(e, { ...this.options.interpolation.defaultVariables,
                        ...n
                    }, n.lng || this.language || i.usedLng, i.usedNS, i.usedKey, {
                        resolved: i
                    });
                    else if (!n.skipInterpolation) {
                        let a;
                        n.interpolation && this.interpolator.init({ ...n,
                            interpolation: { ...this.options.interpolation,
                                ...n.interpolation
                            }
                        });
                        let o = "string" == typeof e && (n && n.interpolation && void 0 !== n.interpolation.skipOnVariables ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
                        if (o) {
                            let t = e.match(this.interpolator.nestingRegexp);
                            a = t && t.length
                        }
                        let l = n.replace && "string" != typeof n.replace ? n.replace : n;
                        if (this.options.interpolation.defaultVariables && (l = { ...this.options.interpolation.defaultVariables,
                                ...l
                            }), e = this.interpolator.interpolate(e, l, n.lng || this.language, n), o) {
                            let t = e.match(this.interpolator.nestingRegexp);
                            a < (t && t.length) && (n.nest = !1)
                        }!n.lng && "v1" !== this.options.compatibilityAPI && i && i.res && (n.lng = i.usedLng), !1 !== n.nest && (e = this.interpolator.nest(e, function() {
                            for (var e = arguments.length, i = Array(e), a = 0; a < e; a++) i[a] = arguments[a];
                            return r && r[0] === i[0] && !n.context ? (s.logger.warn(`It seems you are nesting recursively key: ${i[0]} in key: ${t[0]}`), null) : s.translate(...i, t)
                        }, n)), n.interpolation && this.interpolator.reset()
                    }
                    let a = n.postProcess || this.options.postProcess,
                        o = "string" == typeof a ? [a] : a;
                    return null != e && o && o.length && !1 !== n.applyPostProcessor && (e = j.handle(o, e, t, this.options && this.options.postProcessPassResolved ? {
                        i18nResolved: { ...i,
                            usedParams: this.getUsedParamsDetails(n)
                        },
                        ...n
                    } : n, this)), e
                }
                resolve(e) {
                    let t, n, i, r, s, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return "string" == typeof e && (e = [e]), e.forEach(e => {
                        if (this.isValidLookup(t)) return;
                        let o = this.extractFromKey(e, a),
                            l = o.key;
                        n = l;
                        let c = o.namespaces;
                        this.options.fallbackNS && (c = c.concat(this.options.fallbackNS));
                        let u = void 0 !== a.count && "string" != typeof a.count,
                            h = u && !a.ordinal && 0 === a.count && this.pluralResolver.shouldUseIntlApi(),
                            d = void 0 !== a.context && ("string" == typeof a.context || "number" == typeof a.context) && "" !== a.context,
                            p = a.lngs ? a.lngs : this.languageUtils.toResolveHierarchy(a.lng || this.language, a.fallbackLng);
                        c.forEach(e => {
                            this.isValidLookup(t) || (s = e, !S[`${p[0]}-${e}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(s) && (S[`${p[0]}-${e}`] = !0, this.logger.warn(`key "${n}" for languages "${p.join(", ")}" won't get resolved as namespace "${s}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), p.forEach(n => {
                                let s;
                                if (this.isValidLookup(t)) return;
                                r = n;
                                let o = [l];
                                if (this.i18nFormat && this.i18nFormat.addLookupKeys) this.i18nFormat.addLookupKeys(o, l, n, e, a);
                                else {
                                    let e;
                                    u && (e = this.pluralResolver.getSuffix(n, a.count, a));
                                    let t = `${this.options.pluralSeparator}zero`,
                                        i = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                                    if (u && (o.push(l + e), a.ordinal && 0 === e.indexOf(i) && o.push(l + e.replace(i, this.options.pluralSeparator)), h && o.push(l + t)), d) {
                                        let n = `${l}${this.options.contextSeparator}${a.context}`;
                                        o.push(n), u && (o.push(n + e), a.ordinal && 0 === e.indexOf(i) && o.push(n + e.replace(i, this.options.pluralSeparator)), h && o.push(n + t))
                                    }
                                }
                                for (; s = o.pop();) this.isValidLookup(t) || (i = s, t = this.getResource(n, e, s, a))
                            }))
                        })
                    }), {
                        res: t,
                        usedKey: n,
                        exactUsedKey: i,
                        usedLng: r,
                        usedNS: s
                    }
                }
                isValidLookup(e) {
                    return void 0 !== e && !(!this.options.returnNull && null === e) && !(!this.options.returnEmptyString && "" === e)
                }
                getResource(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, n, i) : this.resourceStore.getResource(e, t, n, i)
                }
                getUsedParamsDetails() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.replace && "string" != typeof e.replace,
                        n = t ? e.replace : e;
                    if (t && void 0 !== e.count && (n.count = e.count), this.options.interpolation.defaultVariables && (n = { ...this.options.interpolation.defaultVariables,
                            ...n
                        }), !t)
                        for (let e of (n = { ...n
                            }, ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"])) delete n[e];
                    return n
                }
                static hasDefaultValue(e) {
                    let t = "defaultValue";
                    for (let n in e)
                        if (Object.prototype.hasOwnProperty.call(e, n) && t === n.substring(0, t.length) && void 0 !== e[n]) return !0;
                    return !1
                }
            }

            function U(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }
            class E {
                constructor(e) {
                    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = s.create("languageUtils")
                }
                getScriptPartFromCode(e) {
                    if (!(e = w(e)) || 0 > e.indexOf("-")) return null;
                    let t = e.split("-");
                    return 2 === t.length ? null : (t.pop(), "x" === t[t.length - 1].toLowerCase()) ? null : this.formatLanguageCode(t.join("-"))
                }
                getLanguagePartFromCode(e) {
                    if (!(e = w(e)) || 0 > e.indexOf("-")) return e;
                    let t = e.split("-");
                    return this.formatLanguageCode(t[0])
                }
                formatLanguageCode(e) {
                    if ("string" == typeof e && e.indexOf("-") > -1) {
                        let t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"],
                            n = e.split("-");
                        return this.options.lowerCaseLng ? n = n.map(e => e.toLowerCase()) : 2 === n.length ? (n[0] = n[0].toLowerCase(), n[1] = n[1].toUpperCase(), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = U(n[1].toLowerCase()))) : 3 === n.length && (n[0] = n[0].toLowerCase(), 2 === n[1].length && (n[1] = n[1].toUpperCase()), "sgn" !== n[0] && 2 === n[2].length && (n[2] = n[2].toUpperCase()), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = U(n[1].toLowerCase())), t.indexOf(n[2].toLowerCase()) > -1 && (n[2] = U(n[2].toLowerCase()))), n.join("-")
                    }
                    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e
                }
                isSupportedCode(e) {
                    return ("languageOnly" === this.options.load || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1
                }
                getBestMatchFromCodes(e) {
                    let t;
                    return e ? (e.forEach(e => {
                        if (t) return;
                        let n = this.formatLanguageCode(e);
                        (!this.options.supportedLngs || this.isSupportedCode(n)) && (t = n)
                    }), !t && this.options.supportedLngs && e.forEach(e => {
                        if (t) return;
                        let n = this.getLanguagePartFromCode(e);
                        if (this.isSupportedCode(n)) return t = n;
                        t = this.options.supportedLngs.find(e => {
                            if (e === n || !(0 > e.indexOf("-") && 0 > n.indexOf("-")) && (e.indexOf("-") > 0 && 0 > n.indexOf("-") && e.substring(0, e.indexOf("-")) === n || 0 === e.indexOf(n) && n.length > 1)) return e
                        })
                    }), t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]), t) : null
                }
                getFallbackCodes(e, t) {
                    if (!e) return [];
                    if ("function" == typeof e && (e = e(t)), "string" == typeof e && (e = [e]), "[object Array]" === Object.prototype.toString.apply(e)) return e;
                    if (!t) return e.default || [];
                    let n = e[t];
                    return n || (n = e[this.getScriptPartFromCode(t)]), n || (n = e[this.formatLanguageCode(t)]), n || (n = e[this.getLanguagePartFromCode(t)]), n || (n = e.default), n || []
                }
                toResolveHierarchy(e, t) {
                    let n = this.getFallbackCodes(t || this.options.fallbackLng || [], e),
                        i = [],
                        r = e => {
                            e && (this.isSupportedCode(e) ? i.push(e) : this.logger.warn(`rejecting language code not found in supportedLngs: ${e}`))
                        };
                    return "string" == typeof e && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? ("languageOnly" !== this.options.load && r(this.formatLanguageCode(e)), "languageOnly" !== this.options.load && "currentOnly" !== this.options.load && r(this.getScriptPartFromCode(e)), "currentOnly" !== this.options.load && r(this.getLanguagePartFromCode(e))) : "string" == typeof e && r(this.formatLanguageCode(e)), n.forEach(e => {
                        0 > i.indexOf(e) && r(this.formatLanguageCode(e))
                    }), i
                }
            }
            let b = [{
                    lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
                    nr: [1, 2],
                    fc: 1
                }, {
                    lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
                    nr: [1, 2],
                    fc: 2
                }, {
                    lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
                    nr: [1],
                    fc: 3
                }, {
                    lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
                    nr: [1, 2, 5],
                    fc: 4
                }, {
                    lngs: ["ar"],
                    nr: [0, 1, 2, 3, 11, 100],
                    fc: 5
                }, {
                    lngs: ["cs", "sk"],
                    nr: [1, 2, 5],
                    fc: 6
                }, {
                    lngs: ["csb", "pl"],
                    nr: [1, 2, 5],
                    fc: 7
                }, {
                    lngs: ["cy"],
                    nr: [1, 2, 3, 8],
                    fc: 8
                }, {
                    lngs: ["fr"],
                    nr: [1, 2],
                    fc: 9
                }, {
                    lngs: ["ga"],
                    nr: [1, 2, 3, 7, 11],
                    fc: 10
                }, {
                    lngs: ["gd"],
                    nr: [1, 2, 3, 20],
                    fc: 11
                }, {
                    lngs: ["is"],
                    nr: [1, 2],
                    fc: 12
                }, {
                    lngs: ["jv"],
                    nr: [0, 1],
                    fc: 13
                }, {
                    lngs: ["kw"],
                    nr: [1, 2, 3, 4],
                    fc: 14
                }, {
                    lngs: ["lt"],
                    nr: [1, 2, 10],
                    fc: 15
                }, {
                    lngs: ["lv"],
                    nr: [1, 2, 0],
                    fc: 16
                }, {
                    lngs: ["mk"],
                    nr: [1, 2],
                    fc: 17
                }, {
                    lngs: ["mnk"],
                    nr: [0, 1, 2],
                    fc: 18
                }, {
                    lngs: ["mt"],
                    nr: [1, 2, 11, 20],
                    fc: 19
                }, {
                    lngs: ["or"],
                    nr: [2, 1],
                    fc: 2
                }, {
                    lngs: ["ro"],
                    nr: [1, 2, 20],
                    fc: 20
                }, {
                    lngs: ["sl"],
                    nr: [5, 1, 2, 3],
                    fc: 21
                }, {
                    lngs: ["he", "iw"],
                    nr: [1, 2, 20, 21],
                    fc: 22
                }],
                L = {
                    1: function(e) {
                        return Number(e > 1)
                    },
                    2: function(e) {
                        return Number(1 != e)
                    },
                    3: function(e) {
                        return 0
                    },
                    4: function(e) {
                        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
                    },
                    5: function(e) {
                        return Number(0 == e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5)
                    },
                    6: function(e) {
                        return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2)
                    },
                    7: function(e) {
                        return Number(1 == e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
                    },
                    8: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3)
                    },
                    9: function(e) {
                        return Number(e >= 2)
                    },
                    10: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4)
                    },
                    11: function(e) {
                        return Number(1 == e || 11 == e ? 0 : 2 == e || 12 == e ? 1 : e > 2 && e < 20 ? 2 : 3)
                    },
                    12: function(e) {
                        return Number(e % 10 != 1 || e % 100 == 11)
                    },
                    13: function(e) {
                        return Number(0 !== e)
                    },
                    14: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3)
                    },
                    15: function(e) {
                        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
                    },
                    16: function(e) {
                        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2)
                    },
                    17: function(e) {
                        return Number(1 == e || e % 10 == 1 && e % 100 != 11 ? 0 : 1)
                    },
                    18: function(e) {
                        return Number(0 == e ? 0 : 1 == e ? 1 : 2)
                    },
                    19: function(e) {
                        return Number(1 == e ? 0 : 0 == e || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3)
                    },
                    20: function(e) {
                        return Number(1 == e ? 0 : 0 == e || e % 100 > 0 && e % 100 < 20 ? 1 : 2)
                    },
                    21: function(e) {
                        return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0)
                    },
                    22: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3)
                    }
                },
                O = ["v1", "v2", "v3"],
                v = ["v4"],
                z = {
                    zero: 0,
                    one: 1,
                    two: 2,
                    few: 3,
                    many: 4,
                    other: 5
                };
            class I {
                constructor(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this.languageUtils = e, this.options = t, this.logger = s.create("pluralResolver"), (!this.options.compatibilityJSON || v.includes(this.options.compatibilityJSON)) && ("undefined" == typeof Intl || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = function() {
                        let e = {};
                        return b.forEach(t => {
                            t.lngs.forEach(n => {
                                e[n] = {
                                    numbers: t.nr,
                                    plurals: L[t.fc]
                                }
                            })
                        }), e
                    }()
                }
                addRule(e, t) {
                    this.rules[e] = t
                }
                getRule(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (this.shouldUseIntlApi()) try {
                        return new Intl.PluralRules(w("dev" === e ? "en" : e), {
                            type: t.ordinal ? "ordinal" : "cardinal"
                        })
                    } catch (e) {
                        return
                    }
                    return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)]
                }
                needsPlural(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = this.getRule(e, t);
                    return this.shouldUseIntlApi() ? n && n.resolvedOptions().pluralCategories.length > 1 : n && n.numbers.length > 1
                }
                getPluralFormsOfKey(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.getSuffixes(e, n).map(e => `${t}${e}`)
                }
                getSuffixes(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = this.getRule(e, t);
                    return n ? this.shouldUseIntlApi() ? n.resolvedOptions().pluralCategories.sort((e, t) => z[e] - z[t]).map(e => `${this.options.prepend}${t.ordinal?`ordinal${this.options.prepend}`:""}${e}`) : n.numbers.map(n => this.getSuffix(e, n, t)) : []
                }
                getSuffix(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = this.getRule(e, n);
                    return i ? this.shouldUseIntlApi() ? `${this.options.prepend}${n.ordinal?`ordinal${this.options.prepend}`:""}${i.select(t)}` : this.getSuffixRetroCompatible(i, t) : (this.logger.warn(`no plural rule found for: ${e}`), "")
                }
                getSuffixRetroCompatible(e, t) {
                    let n = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t)),
                        i = e.numbers[n];
                    this.options.simplifyPluralSuffix && 2 === e.numbers.length && 1 === e.numbers[0] && (2 === i ? i = "plural" : 1 === i && (i = ""));
                    let r = () => this.options.prepend && i.toString() ? this.options.prepend + i.toString() : i.toString();
                    return "v1" === this.options.compatibilityJSON ? 1 === i ? "" : "number" == typeof i ? `_plural_${i.toString()}` : r() : "v2" === this.options.compatibilityJSON || this.options.simplifyPluralSuffix && 2 === e.numbers.length && 1 === e.numbers[0] ? r() : this.options.prepend && n.toString() ? this.options.prepend + n.toString() : n.toString()
                }
                shouldUseIntlApi() {
                    return !O.includes(this.options.compatibilityJSON)
                }
            }

            function x(e, t, n) {
                let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ".",
                    r = !(arguments.length > 4) || void 0 === arguments[4] || arguments[4],
                    s = function(e, t, n) {
                        let i = d(e, n);
                        return void 0 !== i ? i : d(t, n)
                    }(e, t, n);
                return !s && r && "string" == typeof n && void 0 === (s = N(e, n, i)) && (s = N(t, n, i)), s
            }
            class R {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.logger = s.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || (e => e), this.init(e)
                }
                init() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e.interpolation || (e.interpolation = {
                        escapeValue: !0
                    });
                    let t = e.interpolation;
                    this.escape = void 0 !== t.escape ? t.escape : f, this.escapeValue = void 0 === t.escapeValue || t.escapeValue, this.useRawValueToEscape = void 0 !== t.useRawValueToEscape && t.useRawValueToEscape, this.prefix = t.prefix ? p(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? p(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? p(t.nestingPrefix) : t.nestingPrefixEscaped || p("$t("), this.nestingSuffix = t.nestingSuffix ? p(t.nestingSuffix) : t.nestingSuffixEscaped || p(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = void 0 !== t.alwaysFormat && t.alwaysFormat, this.resetRegExp()
                }
                reset() {
                    this.options && this.init(this.options)
                }
                resetRegExp() {
                    let e = (e, t) => e && e.source === t ? (e.lastIndex = 0, e) : RegExp(t, "g");
                    this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = e(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = e(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`)
                }
                interpolate(e, t, n, i) {
                    let r, s, a;
                    let o = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};

                    function c(e) {
                        return e.replace(/\$/g, "$$$$")
                    }
                    let u = e => {
                        if (0 > e.indexOf(this.formatSeparator)) {
                            let r = x(t, o, e, this.options.keySeparator, this.options.ignoreJSONStructure);
                            return this.alwaysFormat ? this.format(r, void 0, n, { ...i,
                                ...t,
                                interpolationkey: e
                            }) : r
                        }
                        let r = e.split(this.formatSeparator),
                            s = r.shift().trim(),
                            a = r.join(this.formatSeparator).trim();
                        return this.format(x(t, o, s, this.options.keySeparator, this.options.ignoreJSONStructure), a, n, { ...i,
                            ...t,
                            interpolationkey: s
                        })
                    };
                    this.resetRegExp();
                    let h = i && i.missingInterpolationHandler || this.options.missingInterpolationHandler,
                        d = i && i.interpolation && void 0 !== i.interpolation.skipOnVariables ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
                    return [{
                        regex: this.regexpUnescape,
                        safeValue: e => c(e)
                    }, {
                        regex: this.regexp,
                        safeValue: e => this.escapeValue ? c(this.escape(e)) : c(e)
                    }].forEach(t => {
                        for (a = 0; r = t.regex.exec(e);) {
                            let n = r[1].trim();
                            if (void 0 === (s = u(n))) {
                                if ("function" == typeof h) {
                                    let t = h(e, r, i);
                                    s = "string" == typeof t ? t : ""
                                } else if (i && Object.prototype.hasOwnProperty.call(i, n)) s = "";
                                else if (d) {
                                    s = r[0];
                                    continue
                                } else this.logger.warn(`missed to pass in variable ${n} for interpolating ${e}`), s = ""
                            } else "string" == typeof s || this.useRawValueToEscape || (s = l(s));
                            let o = t.safeValue(s);
                            if (e = e.replace(r[0], o), d ? (t.regex.lastIndex += s.length, t.regex.lastIndex -= r[0].length) : t.regex.lastIndex = 0, ++a >= this.maxReplaces) break
                        }
                    }), e
                }
                nest(e, t) {
                    let n, i, r, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};

                    function a(e, t) {
                        let n = this.nestingOptionsSeparator;
                        if (0 > e.indexOf(n)) return e;
                        let i = e.split(RegExp(`${n}[ ]*{`)),
                            s = `{${i[1]}`;
                        e = i[0];
                        let a = (s = this.interpolate(s, r)).match(/'/g),
                            o = s.match(/"/g);
                        (a && a.length % 2 == 0 && !o || o.length % 2 != 0) && (s = s.replace(/'/g, '"'));
                        try {
                            r = JSON.parse(s), t && (r = { ...t,
                                ...r
                            })
                        } catch (t) {
                            return this.logger.warn(`failed parsing options string in nesting for key ${e}`, t), `${e}${n}${s}`
                        }
                        return r.defaultValue && r.defaultValue.indexOf(this.prefix) > -1 && delete r.defaultValue, e
                    }
                    for (; n = this.nestingRegexp.exec(e);) {
                        let o = [];
                        (r = (r = { ...s
                        }).replace && "string" != typeof r.replace ? r.replace : r).applyPostProcessor = !1, delete r.defaultValue;
                        let c = !1;
                        if (-1 !== n[0].indexOf(this.formatSeparator) && !/{.*}/.test(n[1])) {
                            let e = n[1].split(this.formatSeparator).map(e => e.trim());
                            n[1] = e.shift(), o = e, c = !0
                        }
                        if ((i = t(a.call(this, n[1].trim(), r), r)) && n[0] === e && "string" != typeof i) return i;
                        "string" != typeof i && (i = l(i)), i || (this.logger.warn(`missed to resolve ${n[1]} for nesting ${e}`), i = ""), c && (i = o.reduce((e, t) => this.format(e, t, s.lng, { ...s,
                            interpolationkey: n[1].trim()
                        }), i.trim())), e = e.replace(n[0], i), this.regexp.lastIndex = 0
                    }
                    return e
                }
            }

            function F(e) {
                let t = {};
                return function(n, i, r) {
                    let s = i + JSON.stringify(r),
                        a = t[s];
                    return a || (a = e(w(i), r), t[s] = a), a(n)
                }
            }
            class k {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.logger = s.create("formatter"), this.options = e, this.formats = {
                        number: F((e, t) => {
                            let n = new Intl.NumberFormat(e, { ...t
                            });
                            return e => n.format(e)
                        }),
                        currency: F((e, t) => {
                            let n = new Intl.NumberFormat(e, { ...t,
                                style: "currency"
                            });
                            return e => n.format(e)
                        }),
                        datetime: F((e, t) => {
                            let n = new Intl.DateTimeFormat(e, { ...t
                            });
                            return e => n.format(e)
                        }),
                        relativetime: F((e, t) => {
                            let n = new Intl.RelativeTimeFormat(e, { ...t
                            });
                            return e => n.format(e, t.range || "day")
                        }),
                        list: F((e, t) => {
                            let n = new Intl.ListFormat(e, { ...t
                            });
                            return e => n.format(e)
                        })
                    }, this.init(e)
                }
                init(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                            interpolation: {}
                        },
                        n = t.interpolation;
                    this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ","
                }
                add(e, t) {
                    this.formats[e.toLowerCase().trim()] = t
                }
                addCached(e, t) {
                    this.formats[e.toLowerCase().trim()] = F(t)
                }
                format(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return t.split(this.formatSeparator).reduce((e, t) => {
                        let {
                            formatName: r,
                            formatOptions: s
                        } = function(e) {
                            let t = e.toLowerCase().trim(),
                                n = {};
                            if (e.indexOf("(") > -1) {
                                let i = e.split("(");
                                t = i[0].toLowerCase().trim();
                                let r = i[1].substring(0, i[1].length - 1);
                                "currency" === t && 0 > r.indexOf(":") ? n.currency || (n.currency = r.trim()) : "relativetime" === t && 0 > r.indexOf(":") ? n.range || (n.range = r.trim()) : r.split(";").forEach(e => {
                                    if (!e) return;
                                    let [t, ...i] = e.split(":"), r = i.join(":").trim().replace(/^'+|'+$/g, "");
                                    n[t.trim()] || (n[t.trim()] = r), "false" === r && (n[t.trim()] = !1), "true" === r && (n[t.trim()] = !0), isNaN(r) || (n[t.trim()] = parseInt(r, 10))
                                })
                            }
                            return {
                                formatName: t,
                                formatOptions: n
                            }
                        }(t);
                        if (this.formats[r]) {
                            let t = e;
                            try {
                                let a = i && i.formatParams && i.formatParams[i.interpolationkey] || {},
                                    o = a.locale || a.lng || i.locale || i.lng || n;
                                t = this.formats[r](e, o, { ...s,
                                    ...i,
                                    ...a
                                })
                            } catch (e) {
                                this.logger.warn(e)
                            }
                            return t
                        }
                        return this.logger.warn(`there was no format function for ${r}`), e
                    }, e)
                }
            }
            class Q extends a {
                constructor(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    super(), this.backend = e, this.store = t, this.services = n, this.languageUtils = n.languageUtils, this.options = i, this.logger = s.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(n, i.backend, i)
                }
                queueLoad(e, t, n, i) {
                    let r = {},
                        s = {},
                        a = {},
                        o = {};
                    return e.forEach(e => {
                        let i = !0;
                        t.forEach(t => {
                            let a = `${e}|${t}`;
                            !n.reload && this.store.hasResourceBundle(e, t) ? this.state[a] = 2 : this.state[a] < 0 || (1 === this.state[a] ? void 0 === s[a] && (s[a] = !0) : (this.state[a] = 1, i = !1, void 0 === s[a] && (s[a] = !0), void 0 === r[a] && (r[a] = !0), void 0 === o[t] && (o[t] = !0)))
                        }), i || (a[e] = !0)
                    }), (Object.keys(r).length || Object.keys(s).length) && this.queue.push({
                        pending: s,
                        pendingCount: Object.keys(s).length,
                        loaded: {},
                        errors: [],
                        callback: i
                    }), {
                        toLoad: Object.keys(r),
                        pending: Object.keys(s),
                        toLoadLanguages: Object.keys(a),
                        toLoadNamespaces: Object.keys(o)
                    }
                }
                loaded(e, t, n) {
                    let i = e.split("|"),
                        r = i[0],
                        s = i[1];
                    t && this.emit("failedLoading", r, s, t), n && this.store.addResourceBundle(r, s, n, void 0, void 0, {
                        skipCopy: !0
                    }), this.state[e] = t ? -1 : 2;
                    let a = {};
                    this.queue.forEach(n => {
                        (function(e, t, n, i) {
                            let {
                                obj: r,
                                k: s
                            } = u(e, t, Object);
                            r[s] = r[s] || [], r[s].push(n)
                        })(n.loaded, [r], s), void 0 !== n.pending[e] && (delete n.pending[e], n.pendingCount--), t && n.errors.push(t), 0 !== n.pendingCount || n.done || (Object.keys(n.loaded).forEach(e => {
                            a[e] || (a[e] = {});
                            let t = n.loaded[e];
                            t.length && t.forEach(t => {
                                void 0 === a[e][t] && (a[e][t] = !0)
                            })
                        }), n.done = !0, n.errors.length ? n.callback(n.errors) : n.callback())
                    }), this.emit("loaded", a), this.queue = this.queue.filter(e => !e.done)
                }
                read(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                        r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : this.retryTimeout,
                        s = arguments.length > 5 ? arguments[5] : void 0;
                    if (!e.length) return s(null, {});
                    if (this.readingCalls >= this.maxParallelReads) {
                        this.waitingReads.push({
                            lng: e,
                            ns: t,
                            fcName: n,
                            tried: i,
                            wait: r,
                            callback: s
                        });
                        return
                    }
                    this.readingCalls++;
                    let a = (a, o) => {
                            if (this.readingCalls--, this.waitingReads.length > 0) {
                                let e = this.waitingReads.shift();
                                this.read(e.lng, e.ns, e.fcName, e.tried, e.wait, e.callback)
                            }
                            if (a && o && i < this.maxRetries) {
                                setTimeout(() => {
                                    this.read.call(this, e, t, n, i + 1, 2 * r, s)
                                }, r);
                                return
                            }
                            s(a, o)
                        },
                        o = this.backend[n].bind(this.backend);
                    if (2 === o.length) {
                        try {
                            let n = o(e, t);
                            n && "function" == typeof n.then ? n.then(e => a(null, e)).catch(a) : a(null, n)
                        } catch (e) {
                            a(e)
                        }
                        return
                    }
                    return o(e, t, a)
                }
                prepareLoading(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = arguments.length > 3 ? arguments[3] : void 0;
                    if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
                    "string" == typeof e && (e = this.languageUtils.toResolveHierarchy(e)), "string" == typeof t && (t = [t]);
                    let r = this.queueLoad(e, t, n, i);
                    if (!r.toLoad.length) return r.pending.length || i(), null;
                    r.toLoad.forEach(e => {
                        this.loadOne(e)
                    })
                }
                load(e, t, n) {
                    this.prepareLoading(e, t, {}, n)
                }
                reload(e, t, n) {
                    this.prepareLoading(e, t, {
                        reload: !0
                    }, n)
                }
                loadOne(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        n = e.split("|"),
                        i = n[0],
                        r = n[1];
                    this.read(i, r, "read", void 0, void 0, (n, s) => {
                        n && this.logger.warn(`${t}loading namespace ${r} for language ${i} failed`, n), !n && s && this.logger.log(`${t}loaded namespace ${r} for language ${i}`, s), this.loaded(e, n, s)
                    })
                }
                saveMissing(e, t, n, i, r) {
                    let s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
                        a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : () => {};
                    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t)) {
                        this.logger.warn(`did not save key "${n}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
                        return
                    }
                    if (null != n && "" !== n) {
                        if (this.backend && this.backend.create) {
                            let o = { ...s,
                                    isUpdate: r
                                },
                                l = this.backend.create.bind(this.backend);
                            if (l.length < 6) try {
                                let r;
                                (r = 5 === l.length ? l(e, t, n, i, o) : l(e, t, n, i)) && "function" == typeof r.then ? r.then(e => a(null, e)).catch(a) : a(null, r)
                            } catch (e) {
                                a(e)
                            } else l(e, t, n, i, a, o)
                        }
                        e && e[0] && this.store.addResource(e[0], t, n, i)
                    }
                }
            }

            function V() {
                return {
                    debug: !1,
                    initImmediate: !0,
                    ns: ["translation"],
                    defaultNS: ["translation"],
                    fallbackLng: ["dev"],
                    fallbackNS: !1,
                    supportedLngs: !1,
                    nonExplicitSupportedLngs: !1,
                    load: "all",
                    preload: !1,
                    simplifyPluralSuffix: !0,
                    keySeparator: ".",
                    nsSeparator: ":",
                    pluralSeparator: "_",
                    contextSeparator: "_",
                    partialBundledLanguages: !1,
                    saveMissing: !1,
                    updateMissing: !1,
                    saveMissingTo: "fallback",
                    saveMissingPlurals: !0,
                    missingKeyHandler: !1,
                    missingInterpolationHandler: !1,
                    postProcess: !1,
                    postProcessPassResolved: !1,
                    returnNull: !1,
                    returnEmptyString: !0,
                    returnObjects: !1,
                    joinArrays: !1,
                    returnedObjectHandler: !1,
                    parseMissingKeyHandler: !1,
                    appendNamespaceToMissingKey: !1,
                    appendNamespaceToCIMode: !1,
                    overloadTranslationOptionHandler: function(e) {
                        let t = {};
                        if ("object" == typeof e[1] && (t = e[1]), "string" == typeof e[1] && (t.defaultValue = e[1]), "string" == typeof e[2] && (t.tDescription = e[2]), "object" == typeof e[2] || "object" == typeof e[3]) {
                            let n = e[3] || e[2];
                            Object.keys(n).forEach(e => {
                                t[e] = n[e]
                            })
                        }
                        return t
                    },
                    interpolation: {
                        escapeValue: !0,
                        format: e => e,
                        prefix: "{{",
                        suffix: "}}",
                        formatSeparator: ",",
                        unescapePrefix: "-",
                        nestingPrefix: "$t(",
                        nestingSuffix: ")",
                        nestingOptionsSeparator: ",",
                        maxReplaces: 1e3,
                        skipOnVariables: !0
                    }
                }
            }

            function A(e) {
                return "string" == typeof e.ns && (e.ns = [e.ns]), "string" == typeof e.fallbackLng && (e.fallbackLng = [e.fallbackLng]), "string" == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && 0 > e.supportedLngs.indexOf("cimode") && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e
            }

            function C() {}
            class W extends a {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = arguments.length > 1 ? arguments[1] : void 0;
                    if (super(), this.options = A(e), this.services = {}, this.logger = s, this.modules = {
                            external: []
                        }, ! function(e) {
                            Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(t => {
                                "function" == typeof e[t] && (e[t] = e[t].bind(e))
                            })
                        }(this), t && !this.isInitialized && !e.isClone) {
                        if (!this.options.initImmediate) return this.init(e, t), this;
                        setTimeout(() => {
                            this.init(e, t)
                        }, 0)
                    }
                }
                init() {
                    var e = this;
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        n = arguments.length > 1 ? arguments[1] : void 0;
                    this.isInitializing = !0, "function" == typeof t && (n = t, t = {}), !t.defaultNS && !1 !== t.defaultNS && t.ns && ("string" == typeof t.ns ? t.defaultNS = t.ns : 0 > t.ns.indexOf("translation") && (t.defaultNS = t.ns[0]));
                    let i = V();

                    function r(e) {
                        return e ? "function" == typeof e ? new e : e : null
                    }
                    if (this.options = { ...i,
                            ...this.options,
                            ...A(t)
                        }, "v1" !== this.options.compatibilityAPI && (this.options.interpolation = { ...i.interpolation,
                            ...this.options.interpolation
                        }), void 0 !== t.keySeparator && (this.options.userDefinedKeySeparator = t.keySeparator), void 0 !== t.nsSeparator && (this.options.userDefinedNsSeparator = t.nsSeparator), !this.options.isClone) {
                        let t;
                        this.modules.logger ? s.init(r(this.modules.logger), this.options) : s.init(null, this.options), this.modules.formatter ? t = this.modules.formatter : "undefined" != typeof Intl && (t = k);
                        let n = new E(this.options);
                        this.store = new T(this.options.resources, this.options);
                        let a = this.services;
                        a.logger = s, a.resourceStore = this.store, a.languageUtils = n, a.pluralResolver = new I(n, {
                            prepend: this.options.pluralSeparator,
                            compatibilityJSON: this.options.compatibilityJSON,
                            simplifyPluralSuffix: this.options.simplifyPluralSuffix
                        }), t && (!this.options.interpolation.format || this.options.interpolation.format === i.interpolation.format) && (a.formatter = r(t), a.formatter.init(a, this.options), this.options.interpolation.format = a.formatter.format.bind(a.formatter)), a.interpolator = new R(this.options), a.utils = {
                            hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
                        }, a.backendConnector = new Q(r(this.modules.backend), a.resourceStore, a, this.options), a.backendConnector.on("*", function(t) {
                            for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) i[r - 1] = arguments[r];
                            e.emit(t, ...i)
                        }), this.modules.languageDetector && (a.languageDetector = r(this.modules.languageDetector), a.languageDetector.init && a.languageDetector.init(a, this.options.detection, this.options)), this.modules.i18nFormat && (a.i18nFormat = r(this.modules.i18nFormat), a.i18nFormat.init && a.i18nFormat.init(this)), this.translator = new D(this.services, this.options), this.translator.on("*", function(t) {
                            for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) i[r - 1] = arguments[r];
                            e.emit(t, ...i)
                        }), this.modules.external.forEach(e => {
                            e.init && e.init(this)
                        })
                    }
                    if (this.format = this.options.interpolation.format, n || (n = C), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
                        let e = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                        e.length > 0 && "dev" !== e[0] && (this.options.lng = e[0])
                    }
                    this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(t => {
                        this[t] = function() {
                            return e.store[t](...arguments)
                        }
                    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(t => {
                        this[t] = function() {
                            return e.store[t](...arguments), e
                        }
                    });
                    let a = o(),
                        l = () => {
                            let e = (e, t) => {
                                this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), a.resolve(t), n(e, t)
                            };
                            if (this.languages && "v1" !== this.options.compatibilityAPI && !this.isInitialized) return e(null, this.t.bind(this));
                            this.changeLanguage(this.options.lng, e)
                        };
                    return this.options.resources || !this.options.initImmediate ? l() : setTimeout(l, 0), a
                }
                loadResources(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : C,
                        n = t,
                        i = "string" == typeof e ? e : this.language;
                    if ("function" == typeof e && (n = e), !this.options.resources || this.options.partialBundledLanguages) {
                        if (i && "cimode" === i.toLowerCase() && (!this.options.preload || 0 === this.options.preload.length)) return n();
                        let e = [],
                            t = t => {
                                t && "cimode" !== t && this.services.languageUtils.toResolveHierarchy(t).forEach(t => {
                                    "cimode" !== t && 0 > e.indexOf(t) && e.push(t)
                                })
                            };
                        i ? t(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(e => t(e)), this.options.preload && this.options.preload.forEach(e => t(e)), this.services.backendConnector.load(e, this.options.ns, e => {
                            e || this.resolvedLanguage || !this.language || this.setResolvedLanguage(this.language), n(e)
                        })
                    } else n(null)
                }
                reloadResources(e, t, n) {
                    let i = o();
                    return e || (e = this.languages), t || (t = this.options.ns), n || (n = C), this.services.backendConnector.reload(e, t, e => {
                        i.resolve(), n(e)
                    }), i
                }
                use(e) {
                    if (!e) throw Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
                    if (!e.type) throw Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
                    return "backend" === e.type && (this.modules.backend = e), ("logger" === e.type || e.log && e.warn && e.error) && (this.modules.logger = e), "languageDetector" === e.type && (this.modules.languageDetector = e), "i18nFormat" === e.type && (this.modules.i18nFormat = e), "postProcessor" === e.type && j.addPostProcessor(e), "formatter" === e.type && (this.modules.formatter = e), "3rdParty" === e.type && this.modules.external.push(e), this
                }
                setResolvedLanguage(e) {
                    if (e && this.languages && !(["cimode", "dev"].indexOf(e) > -1))
                        for (let e = 0; e < this.languages.length; e++) {
                            let t = this.languages[e];
                            if (!(["cimode", "dev"].indexOf(t) > -1) && this.store.hasLanguageSomeTranslations(t)) {
                                this.resolvedLanguage = t;
                                break
                            }
                        }
                }
                changeLanguage(e, t) {
                    var n = this;
                    this.isLanguageChangingTo = e;
                    let i = o();
                    this.emit("languageChanging", e);
                    let r = e => {
                            this.language = e, this.languages = this.services.languageUtils.toResolveHierarchy(e), this.resolvedLanguage = void 0, this.setResolvedLanguage(e)
                        },
                        s = (e, s) => {
                            s ? (r(s), this.translator.changeLanguage(s), this.isLanguageChangingTo = void 0, this.emit("languageChanged", s), this.logger.log("languageChanged", s)) : this.isLanguageChangingTo = void 0, i.resolve(function() {
                                return n.t(...arguments)
                            }), t && t(e, function() {
                                return n.t(...arguments)
                            })
                        },
                        a = t => {
                            e || t || !this.services.languageDetector || (t = []);
                            let n = "string" == typeof t ? t : this.services.languageUtils.getBestMatchFromCodes(t);
                            n && (this.language || r(n), this.translator.language || this.translator.changeLanguage(n), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(n)), this.loadResources(n, e => {
                                s(e, n)
                            })
                        };
                    return e || !this.services.languageDetector || this.services.languageDetector.async ? !e && this.services.languageDetector && this.services.languageDetector.async ? 0 === this.services.languageDetector.detect.length ? this.services.languageDetector.detect().then(a) : this.services.languageDetector.detect(a) : a(e) : a(this.services.languageDetector.detect()), i
                }
                getFixedT(e, t, n) {
                    var i = this;
                    let r = function(e, t) {
                        let s, a;
                        if ("object" != typeof t) {
                            for (var o = arguments.length, l = Array(o > 2 ? o - 2 : 0), c = 2; c < o; c++) l[c - 2] = arguments[c];
                            s = i.options.overloadTranslationOptionHandler([e, t].concat(l))
                        } else s = { ...t
                        };
                        s.lng = s.lng || r.lng, s.lngs = s.lngs || r.lngs, s.ns = s.ns || r.ns, s.keyPrefix = s.keyPrefix || n || r.keyPrefix;
                        let u = i.options.keySeparator || ".";
                        return a = s.keyPrefix && Array.isArray(e) ? e.map(e => `${s.keyPrefix}${u}${e}`) : s.keyPrefix ? `${s.keyPrefix}${u}${e}` : e, i.t(a, s)
                    };
                    return "string" == typeof e ? r.lng = e : r.lngs = e, r.ns = t, r.keyPrefix = n, r
                }
                t() {
                    return this.translator && this.translator.translate(...arguments)
                }
                exists() {
                    return this.translator && this.translator.exists(...arguments)
                }
                setDefaultNamespace(e) {
                    this.options.defaultNS = e
                }
                hasLoadedNamespace(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
                    if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
                    let n = t.lng || this.resolvedLanguage || this.languages[0],
                        i = !!this.options && this.options.fallbackLng,
                        r = this.languages[this.languages.length - 1];
                    if ("cimode" === n.toLowerCase()) return !0;
                    let s = (e, t) => {
                        let n = this.services.backendConnector.state[`${e}|${t}`];
                        return -1 === n || 2 === n
                    };
                    if (t.precheck) {
                        let e = t.precheck(this, s);
                        if (void 0 !== e) return e
                    }
                    return !!(this.hasResourceBundle(n, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || s(n, e) && (!i || s(r, e)))
                }
                loadNamespaces(e, t) {
                    let n = o();
                    return this.options.ns ? ("string" == typeof e && (e = [e]), e.forEach(e => {
                        0 > this.options.ns.indexOf(e) && this.options.ns.push(e)
                    }), this.loadResources(e => {
                        n.resolve(), t && t(e)
                    }), n) : (t && t(), Promise.resolve())
                }
                loadLanguages(e, t) {
                    let n = o();
                    "string" == typeof e && (e = [e]);
                    let i = this.options.preload || [],
                        r = e.filter(e => 0 > i.indexOf(e) && this.services.languageUtils.isSupportedCode(e));
                    return r.length ? (this.options.preload = i.concat(r), this.loadResources(e => {
                        n.resolve(), t && t(e)
                    }), n) : (t && t(), Promise.resolve())
                }
                dir(e) {
                    return (e || (e = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), e) ? ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"].indexOf((this.services && this.services.languageUtils || new E(V())).getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr" : "rtl"
                }
                static createInstance() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = arguments.length > 1 ? arguments[1] : void 0;
                    return new W(e, t)
                }
                cloneInstance() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : C,
                        n = e.forkResourceStore;
                    n && delete e.forkResourceStore;
                    let i = { ...this.options,
                            ...e,
                            isClone: !0
                        },
                        r = new W(i);
                    return (void 0 !== e.debug || void 0 !== e.prefix) && (r.logger = r.logger.clone(e)), ["store", "services", "language"].forEach(e => {
                        r[e] = this[e]
                    }), r.services = { ...this.services
                    }, r.services.utils = {
                        hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
                    }, n && (r.store = new T(this.store.data, i), r.services.resourceStore = r.store), r.translator = new D(r.services, i), r.translator.on("*", function(e) {
                        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
                        r.emit(e, ...n)
                    }), r.init(i, t), r.translator.options = i, r.translator.backendConnector.services.utils = {
                        hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
                    }, r
                }
                toJSON() {
                    return {
                        options: this.options,
                        store: this.store,
                        language: this.language,
                        languages: this.languages,
                        resolvedLanguage: this.resolvedLanguage
                    }
                }
            }
            let Z = W.createInstance();
            Z.createInstance = W.createInstance;
            let B = Z.createInstance;
            Z.dir, Z.init, Z.loadResources, Z.reloadResources, Z.use, Z.changeLanguage, Z.getFixedT, Z.t, Z.exists, Z.setDefaultNamespace, Z.hasLoadedNamespace, Z.loadNamespaces, Z.loadLanguages
        }
    }
]);