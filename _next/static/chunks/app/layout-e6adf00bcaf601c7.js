(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [185], {
        29929: function(n, e, t) {
            var r = {
                "./en/common.json": [69945, 945]
            };

            function o(n) {
                if (!t.o(r, n)) return Promise.resolve().then(function() {
                    var e = Error("Cannot find module '" + n + "'");
                    throw e.code = "MODULE_NOT_FOUND", e
                });
                var e = r[n],
                    o = e[0];
                return t.e(e[1]).then(function() {
                    return t.t(o, 19)
                })
            }
            o.keys = function() {
                return Object.keys(r)
            }, o.id = 29929, n.exports = o
        },
        11922: function() {},
        71456: function() {},
        14819: function(n, e, t) {
            Promise.resolve().then(t.t.bind(t, 84080, 23)), Promise.resolve().then(t.bind(t, 21977)), Promise.resolve().then(t.bind(t, 2763)), Promise.resolve().then(t.bind(t, 52065)), Promise.resolve().then(t.bind(t, 26140))
        },
        21977: function(n, e, t) {
            "use strict";
            t.d(e, {
                default: function() {
                    return c
                }
            });
            var r = t(57437),
                o = t(2265);
            t(10825), t(60800), t(5777), t(49714);
            var u = t(57818);
            let i = n => {
                    let {
                        children: e
                    } = n;
                    return (0, r.jsx)(o.Fragment, {
                        children: e
                    })
                },
                s = (0, u.default)(() => Promise.resolve(i), {
                    ssr: !0
                });

            function c(n) {
                let {
                    children: e
                } = n;
                return (0, r.jsx)(s, {
                    children: e
                })
            }
        },
        2763: function(n, e, t) {
            "use strict";
            t.d(e, {
                default: function() {
                    return a
                }
            });
            var r = t(57437),
                o = t(38093),
                u = t(46027),
                i = t(42386),
                s = t(64312);
            let c = {
                locales: ["en"],
                defaultLocale: "en"
            };
            async function l(n, e) {
                let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                    o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                return (r = r || (0, u.Fs)()).use(i.D), o || r.use((0, s.Z)((n, e) => t(29929)("./".concat(n, "/").concat(e, ".json")))), await r.init({
                    lng: n,
                    resources: o,
                    fallbackLng: c.defaultLocale,
                    supportedLngs: c.locales,
                    defaultNS: e[0],
                    fallbackNS: e[0],
                    ns: e,
                    preload: o ? [] : c.locales
                }), {
                    i18n: r,
                    resources: r.services.resourceStore.data,
                    t: r.t
                }
            }

            function a(n) {
                let {
                    children: e,
                    locale: t,
                    namespaces: i,
                    resources: s
                } = n, c = (0, u.Fs)();
                return l(t, i, c, s), (0, r.jsx)(o.a3, {
                    i18n: c,
                    children: e
                })
            }
        },
        52065: function(n, e, t) {
            "use strict";
            var r = t(57437),
                o = t(2265),
                u = t(71074),
                i = t(93191);
            e.default = function(n) {
                let {
                    children: e
                } = n, [t] = o.useState(() => new u.S);
                return (0, r.jsx)(i.aH, {
                    client: t,
                    children: e
                })
            }
        },
        26140: function(n, e, t) {
            "use strict";
            t.d(e, {
                WalletProvider: function() {
                    return h
                }
            });
            var r = t(57437),
                o = t(2265),
                u = t(91910),
                i = t(21843),
                s = t(45538),
                c = t(33494),
                l = t(99062),
                a = t(50836),
                f = t(45429),
                d = t(31156);

            function h(n) {
                let {
                    children: e
                } = n, t = "mainnet-beta", h = (0, o.useMemo)(() => (0, f.Wf)(t), [t]), v = (0, o.useMemo)(() => [new s.O, new c.e({
                    network: t
                }), new l.H, new a.P], [t]);
                return (0, r.jsx)(u.U, {
                    endpoint: h,
                    children: (0, r.jsx)(i.n, {
                        wallets: v,
                        autoConnect: !0,
                        children: (0, r.jsx)(d.s, {
                            children: e
                        })
                    })
                })
            }
        },
        10825: function() {},
        60800: function() {},
        5777: function() {},
        49714: function() {}
    },
    function(n) {
        n.O(0, [288, 814, 867, 163, 971, 23, 744], function() {
            return n(n.s = 14819)
        }), _N_E = n.O()
    }
]);