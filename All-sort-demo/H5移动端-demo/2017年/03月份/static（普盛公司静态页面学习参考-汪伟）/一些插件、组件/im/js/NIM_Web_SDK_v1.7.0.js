!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.NIM = t() : e.NIM = t()
}(this, function () {
    return function (e) {
        function t(r) {
            if (n[r])return n[r].exports;
            var i = n[r] = {exports: {}, id: r, loaded: !1};
            return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function (e, t, n) {
        "use strict";
        n(1), n(2), n(3).polyfill();
        var r = n(8);
        r.platform = n(20), r.io = n(32), r.xhr = n(22), r.naturalSort = n(13), r.deepAccess = n(14), r.db = n(36).lib, r.util = n(11), r.support = n(37), r.blob = n(90), e.exports = r
    }, function (e, t, n) {
        var r, i;
        !function (o, s) {
            "use strict";
            r = s, i = "function" == typeof r ? r.call(t, n, t, e) : r, !(void 0 !== i && (e.exports = i))
        }(this, function () {
            var e, t = Array, n = t.prototype, r = Object, i = r.prototype, o = Function.prototype, s = String, a = s.prototype, c = Number, u = c.prototype, l = n.slice, f = n.splice, d = n.push, p = n.unshift, m = n.concat, y = o.call, h = Math.max, g = Math.min, v = i.toString, b = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, T = Function.prototype.toString, k = function (e) {
                try {
                    return T.call(e), !0
                } catch (t) {
                    return !1
                }
            }, M = "[object Function]", w = "[object GeneratorFunction]";
            e = function (e) {
                if ("function" != typeof e)return !1;
                if (b)return k(e);
                var t = v.call(e);
                return t === M || t === w
            };
            var S, O = RegExp.prototype.exec, I = function (e) {
                try {
                    return O.call(e), !0
                } catch (t) {
                    return !1
                }
            }, P = "[object RegExp]";
            S = function (e) {
                return "object" != typeof e ? !1 : b ? I(e) : v.call(e) === P
            };
            var x, C = String.prototype.valueOf, _ = function (e) {
                try {
                    return C.call(e), !0
                } catch (t) {
                    return !1
                }
            }, j = "[object String]";
            x = function (e) {
                return "string" == typeof e ? !0 : "object" != typeof e ? !1 : b ? _(e) : v.call(e) === j
            };
            var E = function (e) {
                var t, n = r.defineProperty && function () {
                        try {
                            var e = {};
                            r.defineProperty(e, "x", {enumerable: !1, value: e});
                            for (var t in e)return !1;
                            return e.x === e
                        } catch (n) {
                            return !1
                        }
                    }();
                return t = n ? function (e, t, n, i) {
                    !i && t in e || r.defineProperty(e, t, {configurable: !0, enumerable: !1, writable: !0, value: n})
                } : function (e, t, n, r) {
                    !r && t in e || (e[t] = n)
                }, function (n, r, i) {
                    for (var o in r)e.call(r, o) && t(n, o, r[o], i)
                }
            }(i.hasOwnProperty), A = function (e) {
                var t = typeof e;
                return null === e || "object" !== t && "function" !== t
            }, F = c.isNaN || function (e) {
                    return e !== e
                }, R = {
                ToInteger: function (e) {
                    var t = +e;
                    return F(t) ? t = 0 : 0 !== t && t !== 1 / 0 && t !== -(1 / 0) && (t = (t > 0 || -1) * Math.floor(Math.abs(t))), t
                }, ToPrimitive: function (t) {
                    var n, r, i;
                    if (A(t))return t;
                    if (r = t.valueOf, e(r) && (n = r.call(t), A(n)))return n;
                    if (i = t.toString, e(i) && (n = i.call(t), A(n)))return n;
                    throw new TypeError
                }, ToObject: function (e) {
                    if (null == e)throw new TypeError("can't convert " + e + " to object");
                    return r(e)
                }, ToUint32: function (e) {
                    return e >>> 0
                }
            }, U = function () {
            };
            E(o, {
                bind: function (t) {
                    var n = this;
                    if (!e(n))throw new TypeError("Function.prototype.bind called on incompatible " + n);
                    for (var i, o = l.call(arguments, 1), s = function () {
                        if (this instanceof i) {
                            var e = n.apply(this, m.call(o, l.call(arguments)));
                            return r(e) === e ? e : this
                        }
                        return n.apply(t, m.call(o, l.call(arguments)))
                    }, a = h(0, n.length - o.length), c = [], u = 0; a > u; u++)d.call(c, "$" + u);
                    return i = Function("binder", "return function (" + c.join(",") + "){ return binder.apply(this, arguments); }")(s), n.prototype && (U.prototype = n.prototype, i.prototype = new U, U.prototype = null), i
                }
            });
            var N = y.bind(i.hasOwnProperty), D = y.bind(i.toString), B = y.bind(a.slice), L = y.bind(a.split), W = y.bind(a.indexOf), q = y.bind(d), $ = t.isArray || function (e) {
                    return "[object Array]" === D(e)
                }, H = 1 !== [].unshift(0);
            E(n, {
                unshift: function () {
                    return p.apply(this, arguments), this.length
                }
            }, H), E(t, {isArray: $});
            var X = r("a"), V = "a" !== X[0] || !(0 in X), z = function (e) {
                var t = !0, n = !0;
                return e && (e.call("foo", function (e, n, r) {
                    "object" != typeof r && (t = !1)
                }), e.call([1], function () {
                    "use strict";
                    n = "string" == typeof this
                }, "x")), !!e && t && n
            };
            E(n, {
                forEach: function (t) {
                    var n, r = R.ToObject(this), i = V && x(this) ? L(this, "") : r, o = -1, s = R.ToUint32(i.length);
                    if (arguments.length > 1 && (n = arguments[1]), !e(t))throw new TypeError("Array.prototype.forEach callback must be a function");
                    for (; ++o < s;)o in i && ("undefined" == typeof n ? t(i[o], o, r) : t.call(n, i[o], o, r))
                }
            }, !z(n.forEach)), E(n, {
                map: function (n) {
                    var r, i = R.ToObject(this), o = V && x(this) ? L(this, "") : i, s = R.ToUint32(o.length), a = t(s);
                    if (arguments.length > 1 && (r = arguments[1]), !e(n))throw new TypeError("Array.prototype.map callback must be a function");
                    for (var c = 0; s > c; c++)c in o && ("undefined" == typeof r ? a[c] = n(o[c], c, i) : a[c] = n.call(r, o[c], c, i));
                    return a
                }
            }, !z(n.map)), E(n, {
                filter: function (t) {
                    var n, r, i = R.ToObject(this), o = V && x(this) ? L(this, "") : i, s = R.ToUint32(o.length), a = [];
                    if (arguments.length > 1 && (r = arguments[1]), !e(t))throw new TypeError("Array.prototype.filter callback must be a function");
                    for (var c = 0; s > c; c++)c in o && (n = o[c], ("undefined" == typeof r ? t(n, c, i) : t.call(r, n, c, i)) && q(a, n));
                    return a
                }
            }, !z(n.filter)), E(n, {
                every: function (t) {
                    var n, r = R.ToObject(this), i = V && x(this) ? L(this, "") : r, o = R.ToUint32(i.length);
                    if (arguments.length > 1 && (n = arguments[1]), !e(t))throw new TypeError("Array.prototype.every callback must be a function");
                    for (var s = 0; o > s; s++)if (s in i && !("undefined" == typeof n ? t(i[s], s, r) : t.call(n, i[s], s, r)))return !1;
                    return !0
                }
            }, !z(n.every)), E(n, {
                some: function (t) {
                    var n, r = R.ToObject(this), i = V && x(this) ? L(this, "") : r, o = R.ToUint32(i.length);
                    if (arguments.length > 1 && (n = arguments[1]), !e(t))throw new TypeError("Array.prototype.some callback must be a function");
                    for (var s = 0; o > s; s++)if (s in i && ("undefined" == typeof n ? t(i[s], s, r) : t.call(n, i[s], s, r)))return !0;
                    return !1
                }
            }, !z(n.some));
            var K = !1;
            n.reduce && (K = "object" == typeof n.reduce.call("es5", function (e, t, n, r) {
                    return r
                })), E(n, {
                reduce: function (t) {
                    var n = R.ToObject(this), r = V && x(this) ? L(this, "") : n, i = R.ToUint32(r.length);
                    if (!e(t))throw new TypeError("Array.prototype.reduce callback must be a function");
                    if (0 === i && 1 === arguments.length)throw new TypeError("reduce of empty array with no initial value");
                    var o, s = 0;
                    if (arguments.length >= 2)o = arguments[1]; else for (; ;) {
                        if (s in r) {
                            o = r[s++];
                            break
                        }
                        if (++s >= i)throw new TypeError("reduce of empty array with no initial value")
                    }
                    for (; i > s; s++)s in r && (o = t(o, r[s], s, n));
                    return o
                }
            }, !K);
            var G = !1;
            n.reduceRight && (G = "object" == typeof n.reduceRight.call("es5", function (e, t, n, r) {
                    return r
                })), E(n, {
                reduceRight: function (t) {
                    var n = R.ToObject(this), r = V && x(this) ? L(this, "") : n, i = R.ToUint32(r.length);
                    if (!e(t))throw new TypeError("Array.prototype.reduceRight callback must be a function");
                    if (0 === i && 1 === arguments.length)throw new TypeError("reduceRight of empty array with no initial value");
                    var o, s = i - 1;
                    if (arguments.length >= 2)o = arguments[1]; else for (; ;) {
                        if (s in r) {
                            o = r[s--];
                            break
                        }
                        if (--s < 0)throw new TypeError("reduceRight of empty array with no initial value")
                    }
                    if (0 > s)return o;
                    do s in r && (o = t(o, r[s], s, n)); while (s--);
                    return o
                }
            }, !G);
            var J = n.indexOf && -1 !== [0, 1].indexOf(1, 2);
            E(n, {
                indexOf: function (e) {
                    var t = V && x(this) ? L(this, "") : R.ToObject(this), n = R.ToUint32(t.length);
                    if (0 === n)return -1;
                    var r = 0;
                    for (arguments.length > 1 && (r = R.ToInteger(arguments[1])), r = r >= 0 ? r : h(0, n + r); n > r; r++)if (r in t && t[r] === e)return r;
                    return -1
                }
            }, J);
            var Y = n.lastIndexOf && -1 !== [0, 1].lastIndexOf(0, -3);
            E(n, {
                lastIndexOf: function (e) {
                    var t = V && x(this) ? L(this, "") : R.ToObject(this), n = R.ToUint32(t.length);
                    if (0 === n)return -1;
                    var r = n - 1;
                    for (arguments.length > 1 && (r = g(r, R.ToInteger(arguments[1]))), r = r >= 0 ? r : n - Math.abs(r); r >= 0; r--)if (r in t && e === t[r])return r;
                    return -1
                }
            }, Y);
            var Z = function () {
                var e = [1, 2], t = e.splice();
                return 2 === e.length && $(t) && 0 === t.length
            }();
            E(n, {
                splice: function (e, t) {
                    return 0 === arguments.length ? [] : f.apply(this, arguments)
                }
            }, !Z);
            var Q = function () {
                var e = {};
                return n.splice.call(e, 0, 0, 1), 1 === e.length
            }();
            E(n, {
                splice: function (e, t) {
                    if (0 === arguments.length)return [];
                    var n = arguments;
                    return this.length = h(R.ToInteger(this.length), 0), arguments.length > 0 && "number" != typeof t && (n = l.call(arguments), n.length < 2 ? q(n, this.length - e) : n[1] = R.ToInteger(t)), f.apply(this, n)
                }
            }, !Q);
            var ee = function () {
                var e = new t(1e5);
                return e[8] = "x", e.splice(1, 1), 7 === e.indexOf("x")
            }(), te = function () {
                var e = 256, t = [];
                return t[e] = "a", t.splice(e + 1, 0, "b"), "a" === t[e]
            }();
            E(n, {
                splice: function (e, t) {
                    for (var n, r = R.ToObject(this), i = [], o = R.ToUint32(r.length), a = R.ToInteger(e), c = 0 > a ? h(o + a, 0) : g(a, o), u = g(h(R.ToInteger(t), 0), o - c), f = 0; u > f;)n = s(c + f), N(r, n) && (i[f] = r[n]), f += 1;
                    var d, p = l.call(arguments, 2), m = p.length;
                    if (u > m) {
                        for (f = c; o - u > f;)n = s(f + u), d = s(f + m), N(r, n) ? r[d] = r[n] : delete r[d], f += 1;
                        for (f = o; f > o - u + m;)delete r[f - 1], f -= 1
                    } else if (m > u)for (f = o - u; f > c;)n = s(f + u - 1), d = s(f + m - 1), N(r, n) ? r[d] = r[n] : delete r[d], f -= 1;
                    f = c;
                    for (var y = 0; y < p.length; ++y)r[f] = p[y], f += 1;
                    return r.length = o - u + m, i
                }
            }, !ee || !te);
            var ne = "1,2" !== [1, 2].join(void 0), re = n.join;
            E(n, {
                join: function (e) {
                    return re.call(this, "undefined" == typeof e ? "," : e)
                }
            }, ne);
            var ie = function (e) {
                for (var t = R.ToObject(this), n = R.ToUint32(t.length), r = 0; r < arguments.length;)t[n + r] = arguments[r], r += 1;
                return t.length = n + r, n + r
            }, oe = function () {
                var e = {}, t = Array.prototype.push.call(e, void 0);
                return 1 !== t || 1 !== e.length || "undefined" != typeof e[0] || !N(e, 0)
            }();
            E(n, {
                push: function (e) {
                    return $(this) ? d.apply(this, arguments) : ie.apply(this, arguments)
                }
            }, oe);
            var se = function () {
                var e = [], t = e.push(void 0);
                return 1 !== t || 1 !== e.length || "undefined" != typeof e[0] || !N(e, 0)
            }();
            E(n, {push: ie}, se);
            var ae = !{toString: null}.propertyIsEnumerable("toString"), ce = function () {
            }.propertyIsEnumerable("prototype"), ue = !N("x", "0"), le = function (e) {
                var t = e.constructor;
                return t && t.prototype === e
            }, fe = {
                $window: !0,
                $console: !0,
                $parent: !0,
                $self: !0,
                $frame: !0,
                $frames: !0,
                $frameElement: !0,
                $webkitIndexedDB: !0,
                $webkitStorageInfo: !0
            }, de = function () {
                if ("undefined" == typeof window)return !1;
                for (var e in window)try {
                    !fe["$" + e] && N(window, e) && null !== window[e] && "object" == typeof window[e] && le(window[e])
                } catch (t) {
                    return !0
                }
                return !1
            }(), pe = function (e) {
                if ("undefined" == typeof window || !de)return le(e);
                try {
                    return le(e)
                } catch (t) {
                    return !1
                }
            }, me = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], ye = me.length, he = function (e) {
                return "[object Arguments]" === D(e)
            }, ge = function (t) {
                return null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && !$(t) && e(t.callee)
            }, ve = he(arguments) ? he : ge;
            E(r, {
                keys: function (t) {
                    var n = e(t), r = ve(t), i = null !== t && "object" == typeof t, o = i && x(t);
                    if (!i && !n && !r)throw new TypeError("Object.keys called on a non-object");
                    var a = [], c = ce && n;
                    if (o && ue || r)for (var u = 0; u < t.length; ++u)q(a, s(u));
                    if (!r)for (var l in t)c && "prototype" === l || !N(t, l) || q(a, s(l));
                    if (ae)for (var f = pe(t), d = 0; ye > d; d++) {
                        var p = me[d];
                        f && "constructor" === p || !N(t, p) || q(a, p)
                    }
                    return a
                }
            });
            var be = r.keys && function () {
                    return 2 === r.keys(arguments).length
                }(1, 2), Te = r.keys && function () {
                    var e = r.keys(arguments);
                    return 1 !== arguments.length || 1 !== e.length || 1 !== e[0]
                }(1), ke = r.keys;
            E(r, {
                keys: function (e) {
                    return ke(ve(e) ? l.call(e) : e)
                }
            }, !be || Te);
            var Me = -621987552e5, we = "-000001", Se = Date.prototype.toISOString && -1 === new Date(Me).toISOString().indexOf(we), Oe = Date.prototype.toISOString && "1969-12-31T23:59:59.999Z" !== new Date(-1).toISOString();
            E(Date.prototype, {
                toISOString: function () {
                    var e, t, n, r, i;
                    if (!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");
                    for (r = this.getUTCFullYear(), i = this.getUTCMonth(), r += Math.floor(i / 12), i = (i % 12 + 12) % 12, e = [i + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()], r = (0 > r ? "-" : r > 9999 ? "+" : "") + B("00000" + Math.abs(r), r >= 0 && 9999 >= r ? -4 : -6), t = e.length; t--;)n = e[t], 10 > n && (e[t] = "0" + n);
                    return r + "-" + l.call(e, 0, 2).join("-") + "T" + l.call(e, 2).join(":") + "." + B("000" + this.getUTCMilliseconds(), -3) + "Z"
                }
            }, Se || Oe);
            var Ie = function () {
                try {
                    return Date.prototype.toJSON && null === new Date(NaN).toJSON() && -1 !== new Date(Me).toJSON().indexOf(we) && Date.prototype.toJSON.call({
                            toISOString: function () {
                                return !0
                            }
                        })
                } catch (e) {
                    return !1
                }
            }();
            Ie || (Date.prototype.toJSON = function (t) {
                var n = r(this), i = R.ToPrimitive(n);
                if ("number" == typeof i && !isFinite(i))return null;
                var o = n.toISOString;
                if (!e(o))throw new TypeError("toISOString property is not callable");
                return o.call(n)
            });
            var Pe = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"), xe = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")), Ce = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
            if (Ce || xe || !Pe) {
                var _e = Math.pow(2, 31) - 1, je = (Math.floor(_e / 1e3), F(new Date(1970, 0, 1, 0, 0, 0, _e + 1).getTime()));
                Date = function (e) {
                    var t = function (n, r, i, o, a, c, u) {
                        var l, f = arguments.length;
                        if (this instanceof e) {
                            var d = c, p = u;
                            if (je && f >= 7 && u > _e) {
                                var m = Math.floor(u / _e) * _e, y = Math.floor(m / 1e3);
                                d += y, p -= 1e3 * y
                            }
                            l = 1 === f && s(n) === n ? new e(t.parse(n)) : f >= 7 ? new e(n, r, i, o, a, d, p) : f >= 6 ? new e(n, r, i, o, a, d) : f >= 5 ? new e(n, r, i, o, a) : f >= 4 ? new e(n, r, i, o) : f >= 3 ? new e(n, r, i) : f >= 2 ? new e(n, r) : f >= 1 ? new e(n) : new e
                        } else l = e.apply(this, arguments);
                        return A(l) || E(l, {constructor: t}, !0), l
                    }, n = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"), r = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], i = function (e, t) {
                        var n = t > 1 ? 1 : 0;
                        return r[t] + Math.floor((e - 1969 + n) / 4) - Math.floor((e - 1901 + n) / 100) + Math.floor((e - 1601 + n) / 400) + 365 * (e - 1970)
                    }, o = function (t) {
                        var n = 0, r = t;
                        if (je && r > _e) {
                            var i = Math.floor(r / _e) * _e, o = Math.floor(i / 1e3);
                            n += o, r -= 1e3 * o
                        }
                        return c(new e(1970, 0, 1, 0, 0, n, r))
                    };
                    for (var a in e)N(e, a) && (t[a] = e[a]);
                    E(t, {now: e.now, UTC: e.UTC}, !0), t.prototype = e.prototype, E(t.prototype, {constructor: t}, !0);
                    var u = function (t) {
                        var r = n.exec(t);
                        if (r) {
                            var s, a = c(r[1]), u = c(r[2] || 1) - 1, l = c(r[3] || 1) - 1, f = c(r[4] || 0), d = c(r[5] || 0), p = c(r[6] || 0), m = Math.floor(1e3 * c(r[7] || 0)), y = Boolean(r[4] && !r[8]), h = "-" === r[9] ? 1 : -1, g = c(r[10] || 0), v = c(r[11] || 0), b = d > 0 || p > 0 || m > 0;
                            return (b ? 24 : 25) > f && 60 > d && 60 > p && 1e3 > m && u > -1 && 12 > u && 24 > g && 60 > v && l > -1 && l < i(a, u + 1) - i(a, u) && (s = 60 * (24 * (i(a, u) + l) + f + g * h), s = 1e3 * (60 * (s + d + v * h) + p) + m, y && (s = o(s)), s >= -864e13 && 864e13 >= s) ? s : NaN
                        }
                        return e.parse.apply(this, arguments)
                    };
                    return E(t, {parse: u}), t
                }(Date)
            }
            Date.now || (Date.now = function () {
                return (new Date).getTime()
            });
            var Ee = u.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)), Ae = {
                base: 1e7,
                size: 6,
                data: [0, 0, 0, 0, 0, 0],
                multiply: function (e, t) {
                    for (var n = -1, r = t; ++n < Ae.size;)r += e * Ae.data[n], Ae.data[n] = r % Ae.base, r = Math.floor(r / Ae.base)
                },
                divide: function (e) {
                    for (var t = Ae.size, n = 0; --t >= 0;)n += Ae.data[t], Ae.data[t] = Math.floor(n / e), n = n % e * Ae.base
                },
                numToString: function () {
                    for (var e = Ae.size, t = ""; --e >= 0;)if ("" !== t || 0 === e || 0 !== Ae.data[e]) {
                        var n = s(Ae.data[e]);
                        "" === t ? t = n : t += B("0000000", 0, 7 - n.length) + n
                    }
                    return t
                },
                pow: function Je(e, t, n) {
                    return 0 === t ? n : t % 2 === 1 ? Je(e, t - 1, n * e) : Je(e * e, t / 2, n)
                },
                log: function (e) {
                    for (var t = 0, n = e; n >= 4096;)t += 12, n /= 4096;
                    for (; n >= 2;)t += 1, n /= 2;
                    return t
                }
            }, Fe = function (e) {
                var t, n, r, i, o, a, u, l;
                if (t = c(e), t = F(t) ? 0 : Math.floor(t), 0 > t || t > 20)throw new RangeError("Number.toFixed called with invalid number of decimals");
                if (n = c(this), F(n))return "NaN";
                if (-1e21 >= n || n >= 1e21)return s(n);
                if (r = "", 0 > n && (r = "-", n = -n), i = "0", n > 1e-21)if (o = Ae.log(n * Ae.pow(2, 69, 1)) - 69, a = 0 > o ? n * Ae.pow(2, -o, 1) : n / Ae.pow(2, o, 1), a *= 4503599627370496, o = 52 - o, o > 0) {
                    for (Ae.multiply(0, a), u = t; u >= 7;)Ae.multiply(1e7, 0), u -= 7;
                    for (Ae.multiply(Ae.pow(10, u, 1), 0), u = o - 1; u >= 23;)Ae.divide(1 << 23), u -= 23;
                    Ae.divide(1 << u), Ae.multiply(1, 1), Ae.divide(2), i = Ae.numToString()
                } else Ae.multiply(0, a), Ae.multiply(1 << -o, 0), i = Ae.numToString() + B("0.00000000000000000000", 2, 2 + t);
                return t > 0 ? (l = i.length, i = t >= l ? r + B("0.0000000000000000000", 0, t - l + 2) + i : r + B(i, 0, l - t) + "." + B(i, l - t)) : i = r + i, i
            };
            E(u, {toFixed: Fe}, Ee);
            var Re = function () {
                try {
                    return "1" === 1..toPrecision(void 0)
                } catch (e) {
                    return !0
                }
            }(), Ue = u.toPrecision;
            E(u, {
                toPrecision: function (e) {
                    return "undefined" == typeof e ? Ue.call(this) : Ue.call(this, e)
                }
            }, Re), 2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function () {
                var e = "undefined" == typeof/()??/.exec("")[1], t = Math.pow(2, 32) - 1;
                a.split = function (n, r) {
                    var i = this;
                    if ("undefined" == typeof n && 0 === r)return [];
                    if (!S(n))return L(this, n, r);
                    var o, s, a, c, u = [], f = (n.ignoreCase ? "i" : "") + (n.multiline ? "m" : "") + (n.unicode ? "u" : "") + (n.sticky ? "y" : ""), p = 0, m = new RegExp(n.source, f + "g");
                    i += "", e || (o = new RegExp("^" + m.source + "$(?!\\s)", f));
                    var y = "undefined" == typeof r ? t : R.ToUint32(r);
                    for (s = m.exec(i); s && (a = s.index + s[0].length, !(a > p && (q(u, B(i, p, s.index)), !e && s.length > 1 && s[0].replace(o, function () {
                        for (var e = 1; e < arguments.length - 2; e++)"undefined" == typeof arguments[e] && (s[e] = void 0)
                    }), s.length > 1 && s.index < i.length && d.apply(u, l.call(s, 1)), c = s[0].length, p = a, u.length >= y)));)m.lastIndex === s.index && m.lastIndex++, s = m.exec(i);
                    return p === i.length ? (c || !m.test("")) && q(u, "") : q(u, B(i, p)), u.length > y ? B(u, 0, y) : u
                }
            }() : "0".split(void 0, 0).length && (a.split = function (e, t) {
                return "undefined" == typeof e && 0 === t ? [] : L(this, e, t)
            });
            var Ne = a.replace, De = function () {
                var e = [];
                return "x".replace(/x(.)?/g, function (t, n) {
                    q(e, n)
                }), 1 === e.length && "undefined" == typeof e[0]
            }();
            De || (a.replace = function (t, n) {
                var r = e(n), i = S(t) && /\)[*?]/.test(t.source);
                if (r && i) {
                    var o = function (e) {
                        var r = arguments.length, i = t.lastIndex;
                        t.lastIndex = 0;
                        var o = t.exec(e) || [];
                        return t.lastIndex = i, q(o, arguments[r - 2], arguments[r - 1]), n.apply(this, o)
                    };
                    return Ne.call(this, t, o)
                }
                return Ne.call(this, t, n)
            });
            var Be = a.substr, Le = "".substr && "b" !== "0b".substr(-1);
            E(a, {
                substr: function (e, t) {
                    var n = e;
                    return 0 > e && (n = h(this.length + e, 0)), Be.call(this, n, t)
                }
            }, Le);
            var We = "	\n\x0B\f\r   ᠎             　\u2028\u2029\ufeff", qe = "​", $e = "[" + We + "]", He = new RegExp("^" + $e + $e + "*"), Xe = new RegExp($e + $e + "*$"), Ve = a.trim && (We.trim() || !qe.trim());
            E(a, {
                trim: function () {
                    if ("undefined" == typeof this || null === this)throw new TypeError("can't convert " + this + " to object");
                    return s(this).replace(He, "").replace(Xe, "")
                }
            }, Ve);
            var ze = a.lastIndexOf && -1 !== "abcあい".lastIndexOf("あい", 2);
            E(a, {
                lastIndexOf: function (e) {
                    if ("undefined" == typeof this || null === this)throw new TypeError("can't convert " + this + " to object");
                    for (var t = s(this), n = s(e), r = arguments.length > 1 ? c(arguments[1]) : NaN, i = F(r) ? 1 / 0 : R.ToInteger(r), o = g(h(i, 0), t.length), a = n.length, u = o + a; u > 0;) {
                        u = h(0, u - a);
                        var l = W(B(t, u, o + a), n);
                        if (-1 !== l)return u + l
                    }
                    return -1
                }
            }, ze);
            var Ke = a.lastIndexOf;
            if (E(a, {
                    lastIndexOf: function (e) {
                        return Ke.apply(this, arguments)
                    }
                }, 1 !== a.lastIndexOf.length), (8 !== parseInt(We + "08") || 22 !== parseInt(We + "0x16")) && (parseInt = function (e) {
                    var t = /^[\-+]?0[xX]/;
                    return function (n, r) {
                        var i = s(n).trim(), o = c(r) || (t.test(i) ? 16 : 10);
                        return e(i, o)
                    }
                }(parseInt)), "RangeError: test" !== String(new RangeError("test"))) {
                var Ge = (Error.prototype.toString, function () {
                    if ("undefined" == typeof this || null === this)throw new TypeError("can't convert " + this + " to object");
                    var e = this.name;
                    "undefined" == typeof e ? e = "Error" : "string" != typeof e && (e = s(e));
                    var t = this.message;
                    return "undefined" == typeof t ? t = "" : "string" != typeof t && (t = s(t)), e ? t ? e + ": " + t : e : t
                });
                Error.prototype.toString = Ge
            }
        })
    }, function (e, t, n) {
        var r, i;
        !function (o, s) {
            "use strict";
            r = s, i = "function" == typeof r ? r.call(t, n, t, e) : r, !(void 0 !== i && (e.exports = i))
        }(this, function () {
            var e, t, n, r, i = Function.prototype.call, o = Object.prototype, s = i.bind(o.hasOwnProperty), a = i.bind(o.propertyIsEnumerable), c = i.bind(o.toString), u = s(o, "__defineGetter__");
            u && (e = i.bind(o.__defineGetter__), t = i.bind(o.__defineSetter__), n = i.bind(o.__lookupGetter__), r = i.bind(o.__lookupSetter__)), Object.getPrototypeOf || (Object.getPrototypeOf = function (e) {
                var t = e.__proto__;
                return t || null === t ? t : "[object Function]" === c(e.constructor) ? e.constructor.prototype : e instanceof Object ? o : null
            });
            var l = function (e) {
                try {
                    return e.sentinel = 0, 0 === Object.getOwnPropertyDescriptor(e, "sentinel").value
                } catch (t) {
                    return !1
                }
            };
            if (Object.defineProperty) {
                var f = l({}), d = "undefined" == typeof document || l(document.createElement("div"));
                if (!d || !f)var p = Object.getOwnPropertyDescriptor
            }
            if (!Object.getOwnPropertyDescriptor || p) {
                var m = "Object.getOwnPropertyDescriptor called on a non-object: ";
                Object.getOwnPropertyDescriptor = function (e, t) {
                    if ("object" != typeof e && "function" != typeof e || null === e)throw new TypeError(m + e);
                    if (p)try {
                        return p.call(Object, e, t)
                    } catch (i) {
                    }
                    var c;
                    if (!s(e, t))return c;
                    if (c = {enumerable: a(e, t), configurable: !0}, u) {
                        var l = e.__proto__, f = e !== o;
                        f && (e.__proto__ = o);
                        var d = n(e, t), y = r(e, t);
                        if (f && (e.__proto__ = l), d || y)return d && (c.get = d), y && (c.set = y), c
                    }
                    return c.value = e[t], c.writable = !0, c
                }
            }
            if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (e) {
                    return Object.keys(e)
                }), !Object.create) {
                var y, h = !({__proto__: null} instanceof Object), g = function () {
                    if (!document.domain)return !1;
                    try {
                        return !!new ActiveXObject("htmlfile")
                    } catch (e) {
                        return !1
                    }
                }, v = function () {
                    var e, t;
                    return t = new ActiveXObject("htmlfile"), t.write("<script></script>"), t.close(), e = t.parentWindow.Object.prototype, t = null, e
                }, b = function () {
                    var e, t = document.createElement("iframe"), n = document.body || document.documentElement;
                    return t.style.display = "none", n.appendChild(t), t.src = "javascript:", e = t.contentWindow.Object.prototype, n.removeChild(t), t = null, e
                };
                y = h || "undefined" == typeof document ? function () {
                    return {__proto__: null}
                } : function () {
                    var e = g() ? v() : b();
                    delete e.constructor, delete e.hasOwnProperty, delete e.propertyIsEnumerable, delete e.isPrototypeOf, delete e.toLocaleString, delete e.toString, delete e.valueOf;
                    var t = function () {
                    };
                    return t.prototype = e, y = function () {
                        return new t
                    }, new t
                }, Object.create = function (e, t) {
                    var n, r = function () {
                    };
                    if (null === e)n = y(); else {
                        if ("object" != typeof e && "function" != typeof e)throw new TypeError("Object prototype may only be an Object or null");
                        r.prototype = e, n = new r, n.__proto__ = e
                    }
                    return void 0 !== t && Object.defineProperties(n, t), n
                }
            }
            var T = function (e) {
                try {
                    return Object.defineProperty(e, "sentinel", {}), "sentinel" in e
                } catch (t) {
                    return !1
                }
            };
            if (Object.defineProperty) {
                var k = T({}), M = "undefined" == typeof document || T(document.createElement("div"));
                if (!k || !M)var w = Object.defineProperty, S = Object.defineProperties
            }
            if (!Object.defineProperty || w) {
                var O = "Property description must be an object: ", I = "Object.defineProperty called on non-object: ", P = "getters & setters can not be defined on this javascript engine";
                Object.defineProperty = function (i, s, a) {
                    if ("object" != typeof i && "function" != typeof i || null === i)throw new TypeError(I + i);
                    if ("object" != typeof a && "function" != typeof a || null === a)throw new TypeError(O + a);
                    if (w)try {
                        return w.call(Object, i, s, a)
                    } catch (c) {
                    }
                    if ("value" in a)if (u && (n(i, s) || r(i, s))) {
                        var l = i.__proto__;
                        i.__proto__ = o, delete i[s], i[s] = a.value, i.__proto__ = l
                    } else i[s] = a.value; else {
                        if (!u && ("get" in a || "set" in a))throw new TypeError(P);
                        "get" in a && e(i, s, a.get), "set" in a && t(i, s, a.set)
                    }
                    return i
                }
            }
            (!Object.defineProperties || S) && (Object.defineProperties = function (e, t) {
                if (S)try {
                    return S.call(Object, e, t)
                } catch (n) {
                }
                return Object.keys(t).forEach(function (n) {
                    "__proto__" !== n && Object.defineProperty(e, n, t[n])
                }), e
            }), Object.seal || (Object.seal = function (e) {
                if (Object(e) !== e)throw new TypeError("Object.seal can only be called on Objects.");
                return e
            }), Object.freeze || (Object.freeze = function (e) {
                if (Object(e) !== e)throw new TypeError("Object.freeze can only be called on Objects.");
                return e
            });
            try {
                Object.freeze(function () {
                })
            } catch (x) {
                Object.freeze = function (e) {
                    return function (t) {
                        return "function" == typeof t ? t : e(t)
                    }
                }(Object.freeze)
            }
            Object.preventExtensions || (Object.preventExtensions = function (e) {
                if (Object(e) !== e)throw new TypeError("Object.preventExtensions can only be called on Objects.");
                return e
            }), Object.isSealed || (Object.isSealed = function (e) {
                if (Object(e) !== e)throw new TypeError("Object.isSealed can only be called on Objects.");
                return !1
            }), Object.isFrozen || (Object.isFrozen = function (e) {
                if (Object(e) !== e)throw new TypeError("Object.isFrozen can only be called on Objects.");
                return !1
            }), Object.isExtensible || (Object.isExtensible = function (e) {
                if (Object(e) !== e)throw new TypeError("Object.isExtensible can only be called on Objects.");
                for (var t = ""; s(e, t);)t += "?";
                e[t] = !0;
                var n = s(e, t);
                return delete e[t], n
            })
        })
    }, function (e, t, n) {
        var r;
        (function (e, i, o) {
            (function () {
                "use strict";
                function s(e) {
                    return "function" == typeof e || "object" == typeof e && null !== e
                }

                function a(e) {
                    return "function" == typeof e
                }

                function c(e) {
                    return "object" == typeof e && null !== e
                }

                function u(e) {
                    z = e
                }

                function l(e) {
                    Y = e
                }

                function f() {
                    return function () {
                        e.nextTick(h)
                    }
                }

                function d() {
                    return function () {
                        V(h)
                    }
                }

                function p() {
                    var e = 0, t = new ee(h), n = document.createTextNode("");
                    return t.observe(n, {characterData: !0}), function () {
                        n.data = e = ++e % 2
                    }
                }

                function m() {
                    var e = new MessageChannel;
                    return e.port1.onmessage = h, function () {
                        e.port2.postMessage(0)
                    }
                }

                function y() {
                    return function () {
                        setTimeout(h, 1)
                    }
                }

                function h() {
                    for (var e = 0; J > e; e += 2) {
                        var t = re[e], n = re[e + 1];
                        t(n), re[e] = void 0, re[e + 1] = void 0
                    }
                    J = 0
                }

                function g() {
                    try {
                        var e = n(6);
                        return V = e.runOnLoop || e.runOnContext, d()
                    } catch (t) {
                        return y()
                    }
                }

                function v() {
                }

                function b() {
                    return new TypeError("You cannot resolve a promise with itself")
                }

                function T() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }

                function k(e) {
                    try {
                        return e.then
                    } catch (t) {
                        return ae.error = t, ae
                    }
                }

                function M(e, t, n, r) {
                    try {
                        e.call(t, n, r)
                    } catch (i) {
                        return i
                    }
                }

                function w(e, t, n) {
                    Y(function (e) {
                        var r = !1, i = M(n, t, function (n) {
                            r || (r = !0, t !== n ? I(e, n) : x(e, n))
                        }, function (t) {
                            r || (r = !0, C(e, t))
                        }, "Settle: " + (e._label || " unknown promise"));
                        !r && i && (r = !0, C(e, i))
                    }, e)
                }

                function S(e, t) {
                    t._state === oe ? x(e, t._result) : t._state === se ? C(e, t._result) : _(t, void 0, function (t) {
                        I(e, t)
                    }, function (t) {
                        C(e, t)
                    })
                }

                function O(e, t) {
                    if (t.constructor === e.constructor)S(e, t); else {
                        var n = k(t);
                        n === ae ? C(e, ae.error) : void 0 === n ? x(e, t) : a(n) ? w(e, t, n) : x(e, t)
                    }
                }

                function I(e, t) {
                    e === t ? C(e, b()) : s(t) ? O(e, t) : x(e, t)
                }

                function P(e) {
                    e._onerror && e._onerror(e._result), j(e)
                }

                function x(e, t) {
                    e._state === ie && (e._result = t, e._state = oe, 0 !== e._subscribers.length && Y(j, e))
                }

                function C(e, t) {
                    e._state === ie && (e._state = se, e._result = t, Y(P, e))
                }

                function _(e, t, n, r) {
                    var i = e._subscribers, o = i.length;
                    e._onerror = null, i[o] = t, i[o + oe] = n, i[o + se] = r, 0 === o && e._state && Y(j, e)
                }

                function j(e) {
                    var t = e._subscribers, n = e._state;
                    if (0 !== t.length) {
                        for (var r, i, o = e._result, s = 0; s < t.length; s += 3)r = t[s], i = t[s + n], r ? F(n, r, i, o) : i(o);
                        e._subscribers.length = 0
                    }
                }

                function E() {
                    this.error = null
                }

                function A(e, t) {
                    try {
                        return e(t)
                    } catch (n) {
                        return ce.error = n, ce
                    }
                }

                function F(e, t, n, r) {
                    var i, o, s, c, u = a(n);
                    if (u) {
                        if (i = A(n, r), i === ce ? (c = !0, o = i.error, i = null) : s = !0, t === i)return void C(t, T())
                    } else i = r, s = !0;
                    t._state !== ie || (u && s ? I(t, i) : c ? C(t, o) : e === oe ? x(t, i) : e === se && C(t, i))
                }

                function R(e, t) {
                    try {
                        t(function (t) {
                            I(e, t)
                        }, function (t) {
                            C(e, t)
                        })
                    } catch (n) {
                        C(e, n)
                    }
                }

                function U(e, t) {
                    var n = this;
                    n._instanceConstructor = e, n.promise = new e(v), n._validateInput(t) ? (n._input = t, n.length = t.length, n._remaining = t.length, n._init(), 0 === n.length ? x(n.promise, n._result) : (n.length = n.length || 0, n._enumerate(), 0 === n._remaining && x(n.promise, n._result))) : C(n.promise, n._validationError())
                }

                function N(e) {
                    return new ue(this, e).promise
                }

                function D(e) {
                    function t(e) {
                        I(i, e)
                    }

                    function n(e) {
                        C(i, e)
                    }

                    var r = this, i = new r(v);
                    if (!G(e))return C(i, new TypeError("You must pass an array to race.")), i;
                    for (var o = e.length, s = 0; i._state === ie && o > s; s++)_(r.resolve(e[s]), void 0, t, n);
                    return i
                }

                function B(e) {
                    var t = this;
                    if (e && "object" == typeof e && e.constructor === t)return e;
                    var n = new t(v);
                    return I(n, e), n
                }

                function L(e) {
                    var t = this, n = new t(v);
                    return C(n, e), n
                }

                function W() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }

                function q() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }

                function $(e) {
                    this._id = me++, this._state = void 0, this._result = void 0, this._subscribers = [], v !== e && (a(e) || W(), this instanceof $ || q(), R(this, e))
                }

                function H() {
                    var e;
                    if ("undefined" != typeof i)e = i; else if ("undefined" != typeof self)e = self; else try {
                        e = Function("return this")()
                    } catch (t) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var n = e.Promise;
                    (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (e.Promise = ye)
                }

                var X;
                X = Array.isArray ? Array.isArray : function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                };
                var V, z, K, G = X, J = 0, Y = ({}.toString, function (e, t) {
                    re[J] = e, re[J + 1] = t, J += 2, 2 === J && (z ? z(h) : K())
                }), Z = "undefined" != typeof window ? window : void 0, Q = Z || {}, ee = Q.MutationObserver || Q.WebKitMutationObserver, te = "undefined" != typeof e && "[object process]" === {}.toString.call(e), ne = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, re = new Array(1e3);
                K = te ? f() : ee ? p() : ne ? m() : void 0 === Z ? g() : y();
                var ie = void 0, oe = 1, se = 2, ae = new E, ce = new E;
                U.prototype._validateInput = function (e) {
                    return G(e)
                }, U.prototype._validationError = function () {
                    return new Error("Array Methods must be provided an Array")
                }, U.prototype._init = function () {
                    this._result = new Array(this.length)
                };
                var ue = U;
                U.prototype._enumerate = function () {
                    for (var e = this, t = e.length, n = e.promise, r = e._input, i = 0; n._state === ie && t > i; i++)e._eachEntry(r[i], i)
                }, U.prototype._eachEntry = function (e, t) {
                    var n = this, r = n._instanceConstructor;
                    c(e) ? e.constructor === r && e._state !== ie ? (e._onerror = null, n._settledAt(e._state, t, e._result)) : n._willSettleAt(r.resolve(e), t) : (n._remaining--, n._result[t] = e)
                }, U.prototype._settledAt = function (e, t, n) {
                    var r = this, i = r.promise;
                    i._state === ie && (r._remaining--, e === se ? C(i, n) : r._result[t] = n), 0 === r._remaining && x(i, r._result)
                }, U.prototype._willSettleAt = function (e, t) {
                    var n = this;
                    _(e, void 0, function (e) {
                        n._settledAt(oe, t, e)
                    }, function (e) {
                        n._settledAt(se, t, e)
                    })
                };
                var le = N, fe = D, de = B, pe = L, me = 0, ye = $;
                $.all = le, $.race = fe, $.resolve = de, $.reject = pe, $._setScheduler = u, $._setAsap = l, $._asap = Y, $.prototype = {
                    constructor: $,
                    then: function (e, t) {
                        var n = this, r = n._state;
                        if (r === oe && !e || r === se && !t)return this;
                        var i = new this.constructor(v), o = n._result;
                        if (r) {
                            var s = arguments[r - 1];
                            Y(function () {
                                F(r, i, s, o)
                            })
                        } else _(n, i, e, t);
                        return i
                    },
                    "catch": function (e) {
                        return this.then(null, e)
                    }
                };
                var he = H, ge = {Promise: ye, polyfill: he};
                n(7).amd ? (r = function () {
                    return ge
                }.call(t, n, t, o), !(void 0 !== r && (o.exports = r))) : "undefined" != typeof o && o.exports ? o.exports = ge : "undefined" != typeof this && (this.ES6Promise = ge), he()
            }).call(this)
        }).call(t, n(4), function () {
            return this
        }(), n(5)(e))
    }, function (e, t) {
        function n() {
            u = !1, s.length ? c = s.concat(c) : l = -1, c.length && r()
        }

        function r() {
            if (!u) {
                var e = setTimeout(n);
                u = !0;
                for (var t = c.length; t;) {
                    for (s = c, c = []; ++l < t;)s && s[l].run();
                    l = -1, t = c.length
                }
                s = null, u = !1, clearTimeout(e)
            }
        }

        function i(e, t) {
            this.fun = e, this.array = t
        }

        function o() {
        }

        var s, a = e.exports = {}, c = [], u = !1, l = -1;
        a.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)for (var n = 1; n < arguments.length; n++)t[n - 1] = arguments[n];
            c.push(new i(e, t)), 1 !== c.length || u || setTimeout(r, 0)
        }, i.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = o, a.addListener = o, a.once = o, a.off = o, a.removeListener = o, a.removeAllListeners = o, a.emit = o, a.binding = function (e) {
            throw new Error("process.binding is not supported")
        }, a.cwd = function () {
            return "/"
        }, a.chdir = function (e) {
            throw new Error("process.chdir is not supported")
        }, a.umask = function () {
            return 0
        }
    }, function (e, t) {
        e.exports = function (e) {
            return e.webpackPolyfill || (e.deprecate = function () {
            }, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
        }
    }, function (e, t) {
    }, function (e, t) {
        e.exports = function () {
            throw new Error("define cannot be used indirect")
        }
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            var t = this;
            o.verifyOptions(e, "appKey account token"), o.verifyCallback(e, "onconnect onerror onwillreconnect ondisconnect onloginportschange onmyinfo onblacklist onmutelist onfriends onusers onteams onsessions onroamingmsgs onofflinemsgs onofflinefiltermsgs onofflinesysmsgs onsysmsgunread onofflinecustomsysmsgs onsyncdone onteammembers onsyncteammembersdone onmsg onsysmsg oncustomsysmsg onupdatemyinfo onupdateuser onupdateteammember onupdatesession onupdatesysmsgunread onupdatesysmsg onsynccreateteam onsyncmarkinblacklist onsyncmarkinmutelist  onsyncfriendaction"), u.setDebug(e.debug), o.merge(a, e), l.reset(e.db), f.init(), s(e.lbsUrl) && (c.lbsUrl = e.lbsUrl), t.options = o.copy(e), t.socket = new i(e), t.socket.nim = t
        }

        var i = n(9), o = n(11), s = o.notundef, a = n(31), c = n(21), u = n(19), l = n(36), f = n(77), d = r.fn = r.prototype;
        r.version = d.version = c.version, d.getNosToken = function (e) {
            this.sendCmd("getNosToken", {responseBody: e.responseBody}, e.callback)
        }, d.processCallback = function () {
            function e(e, t, n, r) {
                var i = e.callback.options;
                if (r = r || i, t && (r = i), o.isFunction(e.cbaop)) {
                    var a = e.cbaop(n, r);
                    s(a) && (r = a)
                }
                setTimeout(function () {
                    e.done(n, r)
                }, 0)
            }

            return function (t, n) {
                o.verifyOptions(t, "done"), o.verifyCallback(t, "done"), t.callback = e.bind(this, t, n), t.callback.options = o.copy(t)
            }
        }(), d.processPs = function (e) {
            o.notexist(e.ps) && (e.ps = "")
        }, d.sendCmd = function () {
            this.socket.sendCmd.apply(this.socket, arguments)
        }, e.exports = r, n(78), n(79), n(80), n(81), n(82), n(83), n(84), n(91), n(92),
            n(93), n(94)
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            var t = this;
            t.options = o.copy(e), t.retryCount = 0, t.connecting = !1, t.shouldReconnect = !0, t.disconnected = !1, t.timerMap = {}, t.cmdCallbackMap = {}, t.cmdContentMap = {}, t.hasSynced = !1, t.hasSyncedTeamMembers = !1, t.syncPromiseArray = [], t.syncResult = {}, t.syncTeamMembersPromiseArray = [], t.syncTeamMembersResult = {}, t.timetags = {}, t.initReconnect(), t.initAutoMarkRead(), t.connect()
        }

        var i = n(10), o = n(11), s = n(15), a = n(12), c = n(21), u = n(19), l = r.fn = r.prototype;
        l.initReconnect = function () {
            var e = this, t = e.options;
            o.notundef(t.needReconnect) ? (o.verifyParamType("needReconnect", t.needReconnect, "boolean"), e.needReconnect = t.needReconnect) : e.needReconnect = !0, o.notundef(t.reconnectionAttempts) && o.verifyParamType("reconnectionAttempts", t.reconnectionAttempts, "number"), e.reconnectionAttempts = t.reconnectionAttempts || 1 / 0, e.backoff = new i({
                min: c.reconnectionDelay,
                max: c.reconnectionDelayMax,
                jitter: c.reconnectionJitter
            })
        }, l.initAutoMarkRead = function () {
            var e = this.options;
            o.verifyBooleanWithDefault(e, "autoMarkRead", !0)
        }, l.sendCmd = function (e, t, n) {
            var r = this;
            u.log("SOCKET COMMAND	" + e + "	", t ? t : ""), e = s.createCmd(e, t);
            var i, o = e.SER;
            return t = t || {}, r.cmdContentMap[o] = t, t.single && (delete t.single, i = Object.keys(t), 1 === i.length && (r.cmdContentMap[o] = t[i[0]])), t.NOTSTORE && (i = t.NOTSTORE.split(" "), i.forEach(function (e) {
                delete t[e]
            }), delete t.NOTSTORE), n && (r.cmdCallbackMap[o] = n), r.isConnected() ? r.doSendCmd(e) : r.markCallbackInvalid(o, a.newConnectionError()), o
        }, l.doSendCmd = function (e) {
            var t = this, n = e.SER;
            t.timerMap[n] = setTimeout(function () {
                t.markCallbackInvalid(n, a.newTimeoutError())
            }, c.cmdTimeout), t.socket.send(JSON.stringify(e))
        }, l.getObjWithSer = function (e) {
            var t = this, n = t.cmdContentMap[e];
            return delete t.cmdContentMap[e], n
        }, l.getCallbackWithSer = function (e) {
            var t = this, n = t.cmdCallbackMap[e];
            return delete t.cmdCallbackMap[e], n
        }, l.getTimerWithSer = function (e) {
            var t = this, n = t.timerMap[e];
            return delete t.timerMap[e], n
        }, l.clearTimerWithSer = function (e) {
            var t = this, n = t.getTimerWithSer(e);
            n && clearTimeout(n)
        }, l.markCallbackInvalid = function (e, t) {
            var n = this;
            n.getObjWithSer(e), n.clearTimerWithSer(e);
            var r = n.getCallbackWithSer(e);
            if (r) {
                var i = r.options;
                window.setTimeout(function () {
                    r(t || a.newUnknownError(), i)
                }, 0)
            }
        }, r.fn.markAllCallbackInvalid = function (e) {
            var t = this;
            Object.keys(this.cmdCallbackMap).forEach(function (n) {
                t.markCallbackInvalid(n, e)
            })
        }, l.getPacketObj = function (e) {
            if (e && e.raw) {
                var t = e.raw.ser;
                if (t)return this.getObjWithSer(t)
            }
            return null
        }, l.callPacketAckCallback = function (e) {
            var t = this;
            if (e && e.raw) {
                var n = e.raw.ser;
                if (n) {
                    t.clearTimerWithSer(n);
                    var r = t.getCallbackWithSer(n);
                    r && (e.promise ? e.promise.then(function () {
                        r(e.error, e.obj)
                    }, function (t) {
                        var n = a.newDBError();
                        n.event = t, u.error("promise error", n, t), r(n, e.obj)
                    }) : r(e.error, e.obj))
                }
            }
        }, l.onMessage = function (e) {
            var t = this, n = s.parsePacket(e);
            switch (n.obj = t.getPacketObj(n), u.log("SOCKET CONTENT	" + n.cmd + "	", n.error || (n.content ? n.content : "")), n.service) {
                case"link":
                    t.processLink(n);
                    break;
                case"auth":
                    t.processAuth(n);
                    break;
                case"user":
                    t.processUser(n);
                    break;
                case"notify":
                    t.processNotify(n);
                    break;
                case"sync":
                    t.processSync(n);
                    break;
                case"misc":
                    t.processMisc(n);
                    break;
                case"talk":
                    t.processMessage(n);
                    break;
                case"team":
                    t.processTeam(n);
                    break;
                case"friend":
                    t.processFriend(n);
                    break;
                case"filter":
                    t.processFilter(n);
                    break;
                default:
                    return
            }
            t.callPacketAckCallback(n)
        }, l.packetFromSync = function (e) {
            return !e.obj || !!e.obj.sync
        }, e.exports = r, n(30), n(33), n(34), n(49), n(50), n(53), n(55), n(57), n(58), n(60), n(73), n(75), n(76)
    }, function (e, t) {
        function n(e) {
            e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
        }

        e.exports = n, n.prototype.duration = function () {
            var e = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var t = Math.random(), n = Math.floor(t * this.jitter * e);
                e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
            }
            return 0 | Math.min(e, this.max)
        }, n.prototype.reset = function () {
            this.attempts = 0
        }, n.prototype.setMin = function (e) {
            this.ms = e
        }, n.prototype.setMax = function (e) {
            this.max = e
        }, n.prototype.setJitter = function (e) {
            this.jitter = e
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(12), i = n(13), o = n(14), s = {}, a = /\s/;
        s.guid = function () {
            var e = function () {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return function () {
                return e() + e() + e() + e() + e() + e() + e() + e()
            }
        }(), s.genUrlSep = function (e) {
            e = "" + e;
            var t = -1 === e.indexOf("?") ? "?imageView&" : "&";
            return t
        }, s.extend = function (e, t, n) {
            for (var r in t)("undefined" == typeof e[r] || n === !0) && (e[r] = t[r])
        }, s.filterObj = function (e, t) {
            var n = {};
            return t = t.split(a), t.forEach(function (t) {
                e.hasOwnProperty(t) && (n[t] = e[t])
            }), n
        }, s.copy = function (e, t) {
            return t = t || {}, Object.keys(e).forEach(function (n) {
                t[n] = e[n]
            }), t
        }, s.merge = function (e) {
            e = e || {};
            for (var t = 1, n = arguments.length; n > t; t++)s.copy(arguments[t], e);
            return e
        }, s.findObjIndexInArray = function (e, t) {
            e = e || [];
            var n = t.keyPath || "id", r = -1;
            return e.some(function (e, i) {
                return o(e, n) === t.value ? (r = i, !0) : void 0
            }), r
        }, s.findObjInArray = function (e, t) {
            var n = s.findObjIndexInArray(e, t);
            return -1 === n ? null : e[n]
        }, s.mergeObjArray = function () {
            var e = [], t = [].slice.call(arguments, 0, -1), n = arguments[arguments.length - 1];
            s.isArray(n) && (t.push(n), n = {});
            var r = n.keyPath = n.keyPath || "id";
            for (n.sortPath = n.sortPath || r; !e.length && t.length;)e = t.shift() || [], e = e.slice(0);
            var i;
            return t.forEach(function (t) {
                t && t.forEach(function (t) {
                    i = s.findObjIndexInArray(e, {keyPath: r, value: o(t, r)}), -1 !== i ? s.merge(e[i], t) : e.push(t)
                })
            }), n.notSort || (e = s.sortObjArray(e, n)), e
        }, s.cutObjArray = function (e) {
            var t = e.slice(0), n = arguments.length, r = [].slice.call(arguments, 1, n - 1), i = arguments[n - 1];
            s.isObject(i) || (r.push(i), i = {});
            var a, c = i.keyPath = i.keyPath || "id";
            return r.forEach(function (e) {
                s.isArray(e) || (e = [e]), e.forEach(function (e) {
                    e && (i.value = o(e, c), a = s.findObjIndexInArray(t, i), -1 !== a && t.splice(a, 1))
                })
            }), t
        }, s.sortObjArray = function (e, t) {
            t = t || {};
            var n = t.sortPath || "id";
            i.insensitive = !!t.insensitive;
            var r, a, c, u = !!t.desc;
            return c = s.isFunction(t.compare) ? t.compare : function (e, t) {
                return r = o(e, n), a = o(t, n), u ? i(a, r) : i(r, a)
            }, e.sort(c)
        }, s.emptyFunc = function () {
        }, s.isEmptyFunc = function (e) {
            return e === s.emptyFunc
        }, s.notEmptyFunc = function (e) {
            return e !== s.emptyFunc
        }, s.splice = function (e, t, n) {
            return [].splice.call(e, t, n)
        }, s.onError = function (e) {
            throw new r(e)
        }, s.typeOf = function (e) {
            return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
        }, s.isString = function (e) {
            return "string" === s.typeOf(e)
        }, s.isBoolean = function (e) {
            return "boolean" === s.typeOf(e)
        }, s.isNumber = function (e) {
            return "number" === s.typeOf(e)
        }, s.isArray = function (e) {
            return "array" === s.typeOf(e)
        }, s.isFunction = function (e) {
            return "function" === s.typeOf(e)
        }, s.isObject = function (e) {
            return "object" === s.typeOf(e)
        }, s.undef = function (e) {
            return "undefined" == typeof e
        }, s.notundef = function (e) {
            return "undefined" != typeof e
        }, s.isnull = function (e) {
            return null === e
        }, s.notnull = function (e) {
            return null !== e
        }, s.exist = function (e) {
            return s.notundef(e) && s.notnull(e)
        }, s.notexist = function (e) {
            return s.undef(e) || s.isnull(e)
        }, s.verifyParamPresent = function (e, t, n) {
            n = n || "";
            var r = !1;
            switch (s.typeOf(t)) {
                case"undefined":
                case"null":
                    r = !0;
                    break;
                case"string":
                    "" === t && (r = !0);
                    break;
                case"array":
                    t.length || (r = !0)
            }
            r && s.onParamAbsent(n + e)
        }, s.onParamAbsent = function (e) {
            s.onParamError('缺少参数"' + e + '", 请确保参数不是空字符串、null或undefined')
        }, s.verifyParamAbsent = function (e, t, n) {
            n = n || "", void 0 !== t && s.onParamPresent(n + e)
        }, s.onParamPresent = function (e) {
            s.onParamError('多余的参数"' + e + '"')
        }, s.verifyParamType = function (e, t, n) {
            var r = s.typeOf(t).toLowerCase();
            s.isArray(n) || (n = [n]), n = n.map(function (e) {
                return e.toLowerCase()
            });
            var i = !0;
            switch (-1 === n.indexOf(r) && (i = !1), r) {
                case"number":
                    isNaN(t) && (i = !1)
            }
            i || s.onParamInvalidType(e, n)
        }, s.onParamInvalidType = function (e, t, n) {
            n = n || "", s.isArray(t) ? (t = t.map(function (e) {
                return '"' + e + '"'
            }), t = t.join(", ")) : t = '"' + t + '"', s.onParamError('参数"' + n + e + '"类型错误, 合法的类型包括: [' + t + "]")
        }, s.verifyParamValid = function (e, t, n) {
            s.isArray(n) || (n = [n]), -1 === n.indexOf(t) && s.onParamInvalidValue(e, n)
        }, s.onParamInvalidValue = function (e, t) {
            s.isArray(t) || (t = [t]), t = t.map(function (e) {
                return '"' + e + '"'
            }), s.isArray(t) && (t = t.join(", ")), s.onParamError('参数"' + e + '"值错误, 合法的值包括: [' + t + "]")
        }, s.verifyParamMin = function (e, t, n) {
            n > t && s.onParamError("参数" + e + "的值不能小于" + n)
        }, s.verifyParamMax = function (e, t, n) {
            t > n && s.onParamError("参数" + e + "的值不能大于" + n)
        }, s.verifyEmail = function () {
            var e = /^\S+@\S+$/;
            return function (t, n) {
                e.test(n) || s.onParamError("参数" + t + "邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符")
            }
        }(), s.verifyTel = function () {
            var e = /^[+\-\(\)\d]+$/;
            return function (t, n) {
                e.test(n) || s.onParamError("参数" + t + "电话号码格式错误, 合法字符包括+、-、英文括号和数字")
            }
        }(), s.verifyBirth = function () {
            var e = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
            return function (t, n) {
                e.test(n) || s.onParamError("参数" + t + '生日格式错误, 合法为"yyyy-MM-dd"')
            }
        }(), s.onParamError = function (e) {
            s.onError(e)
        }, s.verifyOptions = function (e, t, n, r) {
            if (s.verifyParamPresent("options", e), t && (s.isString(t) && (t = t.split(a)), s.isArray(t))) {
                n = void 0 === n ? !0 : !!n;
                var i = n ? s.verifyParamPresent : s.verifyParamAbsent;
                t.forEach(function (t) {
                    i.call(s, t, e[t], r)
                })
            }
        }, s.verifyParamAtLeastPresentOne = function (e, t) {
            if (t && (s.isString(t) && (t = t.split(a)), s.isArray(t))) {
                var n = t.some(function (t) {
                    return s.exist(e[t])
                });
                n || s.onParamError("以下参数[" + t.join(", ") + "]至少需要传入一个")
            }
        }, s.verifyParamPresentJustOne = function (e, t) {
            if (t && (s.isString(t) && (t = t.split(a)), s.isArray(t))) {
                var n = t.reduce(function (t, n) {
                    return s.exist(e[n]) && t++, t
                }, 0);
                1 !== n && s.onParamError("以下参数[" + t.join(", ") + "]必须且只能传入一个")
            }
        }, s.verifyBooleanWithDefault = function (e, t, n, r) {
            s.undef(n) && (n = !0), a.test(t) && (t = t.split(a)), s.isArray(t) ? t.forEach(function (t) {
                s.verifyBooleanWithDefault(e, t, n, r)
            }) : "undefined" == typeof e[t] ? e[t] = n : s.isBoolean(e[t]) || s.onParamInvalidType(t, "boolean", r)
        }, s.verifyFileInput = function (e) {
            return s.verifyParamPresent("fileInput", e), s.isString(e) && (e = window.document.getElementById(e), e || s.onParamError("找不到要上传的文件对应的input, 请检查fileInput id")), ("input" !== e.tagName.toLowerCase() || "file" !== e.type.toLowerCase()) && s.onParamError("请提供正确的fileInput"), e
        }, s.verifyFileType = function (e) {
            s.verifyParamValid("type", e, s.validFileTypes)
        }, s.verifyCallback = function (e, t) {
            a.test(t) && (t = t.split(a)), s.isArray(t) ? t.forEach(function (t) {
                s.verifyCallback(e, t)
            }) : e[t] ? s.isFunction(e[t]) || s.onParamInvalidType(t, "function") : e[t] = s.emptyFunc
        }, s.verifyFileUploadCallback = function (e) {
            s.verifyCallback(e, "uploadprogress uploaddone uploaderror uploadcancel")
        }, s.validFileTypes = ["image", "audio", "video", "file"], s.filterFiles = function (e, t) {
            t = t.toLowerCase();
            var n, r, i, o = "file" === t, s = [];
            return [].forEach.call(e, function (e) {
                o ? s.push(e) : (n = e.type.split("/"), n[0] && n[1] && (r = n[0].toLowerCase(), i = n[1].toLowerCase(), r === t && s.push(e)))
            }), s
        }, s.getFileName = function () {
            var e = s.notundef(window.FormData);
            return function (t) {
                return t = s.verifyFileInput(t), e ? t.files[0].name : t.value.slice(t.value.lastIndexOf("\\") + 1)
            }
        }(), s.sizeText = function () {
            var e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "BB"];
            return function (t) {
                var n, r = 0;
                do {
                    t = Math.floor(100 * t) / 100;
                    var i = e[r];
                    n = t + i, t /= 1024, r++
                } while (t > 1);
                return n
            }
        }(), s.promises2cmds = function (e) {
            return e.map(function (e) {
                return e.cmd
            })
        }, s.objs2accounts = function (e) {
            return e.map(function (e) {
                return e.account
            })
        }, s.teams2ids = function (e) {
            return e.map(function (e) {
                return e.teamId
            })
        }, s.objs2ids = function (e) {
            return e.map(function (e) {
                return e.id
            })
        }, s.getMaxUpdateTime = function (e) {
            var t = e.map(function (e) {
                return +e.updateTime
            });
            return Math.max.apply(Math, t)
        }, e.exports = s
    }, function (e, t) {
        "use strict";
        function n(e, t) {
            var n = this;
            n.message = e, n.code = t, n.time = new Date, n.timetag = +n.time
        }

        n.prototype = Object.create(Error.prototype), n.prototype.name = "NIMError", n.prototype.appendMessage = function (e) {
            var t = this;
            t.message ? e && (t.message += "(" + e + ")") : t.message = e
        };
        var r = {
            201: "客户端版本不对, 需升级sdk",
            302: "用户名或密码错误, 请检查appKey和token是否有效, account和token是否匹配",
            403: "非法操作或没有权限",
            404: "对象(用户或群)不存在",
            405: "参数长度过长",
            408: "客户端请求超时",
            414: "参数错误",
            415: "客户端网络问题",
            416: "频率控制",
            422: "帐号被禁用",
            500: "服务器内部错误",
            501: "数据库操作失败",
            503: "服务器繁忙",
            509: "已失效",
            801: "群人数达到上限",
            802: "没有权限",
            803: "群不存在或未发生变化",
            804: "用户不在群里面",
            805: "群类型不匹配",
            806: "创建群数量达到限制",
            807: "群成员状态不对",
            809: "已经在群里",
            997: "协议已失效",
            998: "解包错误",
            999: "打包错误"
        };
        [200, 406, 808, 810].forEach(function (e) {
            r[e] = null
        }), n.genError = function (e) {
            var t = r[e];
            return void 0 === t && (t = "操作失败"), null === t ? null : new n(t, e)
        }, n.newServerError = function (e) {
            return new n(e || "无法连接到socket服务器", "Server_Not_Available")
        }, n.newNetworkError = function () {
            return new n("网断了", "Error_Internet_Disconnected")
        }, n.newConnectionError = function () {
            return new n("连接未建立", "Error_Connection_is_not_Established")
        }, n.newTimeoutError = function () {
            return new n("超时", "Error_Timeout")
        }, n.newParamError = function (e) {
            return new n(e || "参数错误", "Param_Error")
        }, n.newNoFileError = function (e) {
            return new n(e || "请选择文件", "No_File_Selected")
        }, n.newWrongFileTypeError = function (e) {
            return new n(e || "文件类型错误", "Wrong_File_Type")
        }, n.newFileTooLargeError = function (e) {
            return new n(e || "文件过大", "File_Too_Large")
        }, n.newCORSIframeError = function () {
            return new n("不能获取跨域Iframe的内容", "Cross_Origin_Iframe")
        }, n.newSupportError = function (e, t) {
            return new n("不支持" + e, "Not_Support_" + t)
        }, n.newSupportDBError = function () {
            return n.newSupportError("数据库", "DB")
        }, n.noDBError = function () {
            return new n("无数据库", "NO_DB")
        }, n.newDBError = function () {
            return new n("数据库错误", "DB")
        }, n.newUnknownError = function () {
            return new n("未知错误", "Error_Unknown")
        }, n.stillInTeamError = function () {
            return new n("还在群里", "Still_In_Team")
        }, e.exports = n
    }, function (e, t) {
        e.exports = function n(e, t) {
            "use strict";
            var r, i, o = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, s = /(^[ ]*|[ ]*$)/g, a = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, c = /^0x[0-9a-f]+$/i, u = /^0/, l = function (e) {
                return n.insensitive && ("" + e).toLowerCase() || "" + e
            }, f = l(e).replace(s, "") || "", d = l(t).replace(s, "") || "", p = f.replace(o, "\x00$1\x00").replace(/\0$/, "").replace(/^\0/, "").split("\x00"), m = d.replace(o, "\x00$1\x00").replace(/\0$/, "").replace(/^\0/, "").split("\x00"), y = parseInt(f.match(c), 16) || 1 !== p.length && f.match(a) && Date.parse(f), h = parseInt(d.match(c), 16) || y && d.match(a) && Date.parse(d) || null;
            if (h) {
                if (h > y)return -1;
                if (y > h)return 1
            }
            for (var g = 0, v = Math.max(p.length, m.length); v > g; g++) {
                if (r = !(p[g] || "").match(u) && parseFloat(p[g]) || p[g] || 0, i = !(m[g] || "").match(u) && parseFloat(m[g]) || m[g] || 0, isNaN(r) !== isNaN(i))return isNaN(r) ? 1 : -1;
                if (typeof r != typeof i && (r += "", i += ""), i > r)return -1;
                if (r > i)return 1
            }
            return 0
        }
    }, function (e, t) {
        function n(e, t) {
            for (var n = t.split("."); n.length;) {
                var r = n.shift(), i = !1;
                if ("?" == r[r.length - 1] && (r = r.slice(0, -1), i = !0), e = e[r], !e && i)return e
            }
            return e
        }

        e.exports = n
    }, function (e, t, n) {
        "use strict";
        function r(e, t) {
            var n = s[t], r = {};
            for (var i in n)e.hasOwnProperty(i) && (r[n[i]] = e[i]);
            return r
        }

        var i = n(16), o = n(11), s = n(17), a = n(18), c = n(12), u = n(19), l = 1, f = {};
        f.createCmd = function (e, t) {
            var n = i.cmdConfig[e];
            return e = {SID: n.sid, CID: n.cid, SER: l++}, n.params && (e.Q = [], n.params.forEach(function (n) {
                var i = n.type, o = n.name, s = n.entity, a = t[o];
                switch (i) {
                    case"ArrayMable<Property>":
                        i = "ArrayMable", a = a.map(function (e) {
                            return {t: "Property", v: r(e, s)}
                        });
                        break;
                    case"Property":
                        a = r(a, o);
                        break;
                    case"bool":
                        a = a ? "true" : "false"
                }
                e.Q.push({t: i, v: a})
            })), e
        }, f.parsePacket = function (e) {
            var t = JSON.parse(e), n = {raw: t, error: c.genError(t.code)}, r = i.packetConfig[t.sid + "_" + t.cid];
            if (!r)return u.log("no config for sid: " + t.sid + " cid: " + t.cid), n;
            var s = t.r, a = "notify" === r.service && !r.cmd;
            if (n.isNotify = a, a) {
                var l = t.r[1].headerPacket;
                if (r = i.packetConfig[l.sid + "_" + l.cid], s = t.r[1].body, !r)return u.log("no config for sid: " + l.sid + " cid: " + l.cid), n
            }
            return n.service = r.service, n.cmd = r.cmd, !n.error && r.response && (n.content = {}, r.response.forEach(function (e, r) {
                var i = s[r];
                if (!o.undef(i)) {
                    var c = e.type, u = e.name, l = e.entity || u;
                    switch (c) {
                        case"Property":
                            n.content[u] = f.unserialize(i, l);
                            break;
                        case"PropertyArray":
                            n.content[u] = [], i.forEach(function (e) {
                                n.content[u].push(f.unserialize(e, l))
                            });
                            break;
                        case"String":
                            n.content[u] = i;
                            break;
                        case"StrArray":
                            n.content[u] = i;
                            break;
                        case"Number":
                            n.content[u] = +i;
                            break;
                        case"Boolean":
                            n.content[u] = i
                    }
                    if (a && "msg" === u || "sysMsg" === u) {
                        var d = n.content[u];
                        o.isObject(d) && (d.idServer = t.r[0])
                    }
                }
            })), n
        }, f.unserialize = function (e, t) {
            var n = a[t], r = {};
            for (var i in n)e.hasOwnProperty(i) && (r[n[i]] = e[i]);
            return r
        }, e.exports = f
    }, function (e, t) {
        "use strict";
        var n = {
            link: {id: 1, heartbeat: 2},
            auth: {id: 2, login: 3, kicked: 5, logout: 6, multiPortLogin: 7, kick: 8},
            user: {
                id: 3,
                markInBlacklist: 3,
                getBlacklist: 4,
                markInMutelist: 5,
                getMutelist: 6,
                getRelations: 8,
                getUsers: 7,
                updateMyInfo: 10,
                syncMyInfo: 109,
                syncUpdateMyInfo: 110
            },
            notify: {
                id: 4,
                markRead: 3,
                syncOfflineMsgs: 4,
                batchMarkRead: 5,
                syncOfflineSysMsgs: 6,
                syncRoamingMsgs: 9
            },
            sync: {id: 5, sync: 1, syncTeamMembers: 2},
            misc: {id: 6, getNosToken: 2, processImage: 6},
            talk: {
                id: 7,
                sendMsg: 1,
                msg: 2,
                sysMsg: 3,
                getHistoryMsgs: 6,
                sendCustomSysMsg: 7,
                searchHistoryMsgs: 8,
                deleteSessions: 9,
                getSessions: 10,
                syncSendMsg: 101
            },
            team: {
                id: 8,
                createTeam: 1,
                sendTeamMsg: 2,
                teamMsg: 3,
                teamMsgs: 4,
                addTeamMembers: 5,
                removeTeamMembers: 6,
                updateTeam: 7,
                leaveTeam: 8,
                getTeam: 9,
                getTeams: 10,
                getTeamMembers: 11,
                dismissTeam: 12,
                applyTeam: 13,
                passTeamApply: 14,
                rejectTeamApply: 15,
                addTeamManagers: 16,
                removeTeamManagers: 17,
                transferTeam: 18,
                updateInfoInTeam: 19,
                updateNickInTeam: 20,
                acceptTeamInvite: 21,
                rejectTeamInvite: 22,
                getTeamHistoryMsgs: 23,
                searchTeamHistoryMsgs: 24,
                syncTeams: 109,
                syncTeamMembers: 111,
                syncCreateTeam: 101,
                syncSendTeamMsg: 102,
                syncUpdateTeamMember: 119
            },
            friend: {
                id: 12,
                friendRequest: 1,
                syncFriendRequest: 101,
                deleteFriend: 2,
                syncDeleteFriend: 102,
                updateFriend: 3,
                syncUpdateFriend: 103,
                getFriends: 4
            },
            filter: {id: 101, sendFilterMsg: 1, filterMsg: 2, filterSysMsg: 3, sendFilterCustomSysMsg: 7}
        }, r = {
            heartbeat: {sid: n.link.id, cid: n.link.heartbeat},
            login: {sid: n.auth.id, cid: n.auth.login, params: [{type: "Property", name: "login"}]},
            logout: {sid: n.auth.id, cid: n.auth.logout},
            kick: {sid: n.auth.id, cid: n.auth.kick, params: [{type: "StrArray", name: "deviceIds"}]},
            markInBlacklist: {
                sid: n.user.id,
                cid: n.user.markInBlacklist,
                params: [{type: "String", name: "account"}, {type: "bool", name: "isAdd"}]
            },
            getBlacklist: {sid: n.user.id, cid: n.user.getBlacklist, params: [{type: "long", name: "time"}]},
            markInMutelist: {
                sid: n.user.id,
                cid: n.user.markInMutelist,
                params: [{type: "String", name: "account"}, {type: "bool", name: "isAdd"}]
            },
            getMutelist: {sid: n.user.id, cid: n.user.getMutelist, params: [{type: "long", name: "time"}]},
            getRelations: {sid: n.user.id, cid: n.user.getRelations, params: [{type: "long", name: "timetag"}]},
            getUsers: {sid: n.user.id, cid: n.user.getUsers, params: [{type: "StrArray", name: "accounts"}]},
            updateMyInfo: {sid: n.user.id, cid: n.user.updateMyInfo, params: [{type: "Property", name: "user"}]},
            markRead: {
                sid: n.notify.id,
                cid: n.notify.markRead,
                params: [{type: "long", name: "id"}, {type: "ph", name: "ph"}]
            },
            batchMarkRead: {
                sid: n.notify.id,
                cid: n.notify.batchMarkRead,
                params: [{type: "byte", name: "sid"}, {type: "byte", name: "cid"}, {type: "LongArray", name: "ids"}]
            },
            sync: {sid: n.sync.id, cid: n.sync.sync, params: [{type: "Property", name: "sync"}]},
            syncTeamMembers: {
                sid: n.sync.id,
                cid: n.sync.syncTeamMembers,
                params: [{type: "LongLongMap", name: "sync"}]
            },
            getNosToken: {sid: n.misc.id, cid: n.misc.getNosToken, params: [{type: "String", name: "responseBody"}]},
            processImage: {
                sid: n.misc.id,
                cid: n.misc.processImage,
                params: [{type: "String", name: "url"}, {
                    type: "ArrayMable<Property>",
                    name: "imageOps",
                    entity: "imageOp"
                }]
            },
            sendMsg: {sid: n.talk.id, cid: n.talk.sendMsg, params: [{type: "Property", name: "msg"}]},
            getHistoryMsgs: {
                sid: n.talk.id,
                cid: n.talk.getHistoryMsgs,
                params: [{type: "String", name: "to"}, {type: "long", name: "beginTime"}, {
                    type: "long",
                    name: "endTime"
                }, {type: "long", name: "lastMsgId"}, {type: "int", name: "limit"}, {type: "bool", name: "reverse"}]
            },
            sendCustomSysMsg: {
                sid: n.talk.id,
                cid: n.talk.sendCustomSysMsg,
                params: [{type: "Property", name: "sysMsg"}]
            },
            searchHistoryMsgs: {
                sid: n.talk.id,
                cid: n.talk.searchHistoryMsgs,
                params: [{type: "String", name: "to"}, {type: "long", name: "beginTime"}, {
                    type: "long",
                    name: "endTime"
                }, {type: "String", name: "keyword"}, {type: "int", name: "limit"}, {type: "bool", name: "reverse"}]
            },
            getSessions: {sid: n.talk.id, cid: n.talk.getSessions, params: [{type: "long", name: "time"}]},
            deleteSessions: {
                sid: n.talk.id,
                cid: n.talk.deleteSessions,
                params: [{type: "StrArray", name: "sessions"}]
            },
            createTeam: {
                sid: n.team.id,
                cid: n.team.createTeam,
                params: [{type: "Property", name: "team"}, {type: "StrArray", name: "accounts"}, {
                    type: "String",
                    name: "ps"
                }]
            },
            sendTeamMsg: {sid: n.team.id, cid: n.team.sendTeamMsg, params: [{type: "Property", name: "msg"}]},
            addTeamMembers: {
                sid: n.team.id,
                cid: n.team.addTeamMembers,
                params: [{type: "long", name: "teamId"}, {type: "StrArray", name: "accounts"}, {
                    type: "String",
                    name: "ps"
                }]
            },
            removeTeamMembers: {
                sid: n.team.id,
                cid: n.team.removeTeamMembers,
                params: [{type: "long", name: "teamId"}, {type: "StrArray", name: "accounts"}]
            },
            updateTeam: {sid: n.team.id, cid: n.team.updateTeam, params: [{type: "Property", name: "team"}]},
            leaveTeam: {sid: n.team.id, cid: n.team.leaveTeam, params: [{type: "long", name: "teamId"}]},
            getTeam: {sid: n.team.id, cid: n.team.getTeam, params: [{type: "long", name: "teamId"}]},
            getTeams: {sid: n.team.id, cid: n.team.getTeams, params: [{type: "long", name: "timetag"}]},
            getTeamMembers: {
                sid: n.team.id,
                cid: n.team.getTeamMembers,
                params: [{type: "long", name: "teamId"}, {type: "long", name: "timetag"}]
            },
            dismissTeam: {sid: n.team.id, cid: n.team.dismissTeam, params: [{type: "long", name: "teamId"}]},
            applyTeam: {
                sid: n.team.id,
                cid: n.team.applyTeam,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "ps"}]
            },
            passTeamApply: {
                sid: n.team.id,
                cid: n.team.passTeamApply,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "from"}]
            },
            rejectTeamApply: {
                sid: n.team.id,
                cid: n.team.rejectTeamApply,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "from"}, {type: "String", name: "ps"}]
            },
            addTeamManagers: {
                sid: n.team.id,
                cid: n.team.addTeamManagers,
                params: [{type: "long", name: "teamId"}, {type: "StrArray", name: "accounts"}]
            },
            removeTeamManagers: {
                sid: n.team.id,
                cid: n.team.removeTeamManagers,
                params: [{type: "long", name: "teamId"}, {type: "StrArray", name: "accounts"}]
            },
            transferTeam: {
                sid: n.team.id,
                cid: n.team.transferTeam,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "account"}, {
                    type: "bool",
                    name: "leave"
                }]
            },
            updateInfoInTeam: {
                sid: n.team.id,
                cid: n.team.updateInfoInTeam,
                params: [{type: "Property", name: "teamMember"}]
            },
            updateNickInTeam: {
                sid: n.team.id,
                cid: n.team.updateNickInTeam,
                params: [{type: "Property", name: "teamMember"}]
            },
            acceptTeamInvite: {
                sid: n.team.id,
                cid: n.team.acceptTeamInvite,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "from"}]
            },
            rejectTeamInvite: {
                sid: n.team.id,
                cid: n.team.rejectTeamInvite,
                params: [{type: "long", name: "teamId"}, {type: "String", name: "from"}, {type: "String", name: "ps"}]
            },
            getTeamHistoryMsgs: {
                sid: n.team.id,
                cid: n.team.getTeamHistoryMsgs,
                params: [{type: "long", name: "to"}, {type: "long", name: "beginTime"}, {
                    type: "long",
                    name: "endTime"
                }, {type: "long", name: "lastMsgId"}, {type: "int", name: "limit"}, {type: "bool", name: "reverse"}]
            },
            searchTeamHistoryMsgs: {
                sid: n.team.id,
                cid: n.team.searchTeamHistoryMsgs,
                params: [{type: "long", name: "to"}, {type: "long", name: "beginTime"}, {
                    type: "long",
                    name: "endTime"
                }, {type: "String", name: "keyword"}, {type: "int", name: "limit"}, {type: "bool", name: "reverse"}]
            },
            friendRequest: {
                sid: n.friend.id,
                cid: n.friend.friendRequest,
                params: [{type: "String", name: "account"}, {type: "byte", name: "type"}, {type: "String", name: "ps"}]
            },
            deleteFriend: {sid: n.friend.id, cid: n.friend.deleteFriend, params: [{type: "String", name: "account"}]},
            updateFriend: {sid: n.friend.id, cid: n.friend.updateFriend, params: [{type: "Property", name: "friend"}]},
            getFriends: {sid: n.friend.id, cid: n.friend.getFriends, params: [{type: "long", name: "timetag"}]},
            sendFilterMsg: {sid: n.filter.id, cid: n.filter.sendFilterMsg, params: [{type: "Property", name: "msg"}]},
            sendFilterCustomSysMsg: {
                sid: n.filter.id,
                cid: n.filter.sendFilterCustomSysMsg,
                params: [{type: "Property", name: "sysMsg"}]
            }
        }, i = {
            "1_2": {service: "link", cmd: "heartbeat"},
            "2_3": {
                service: "auth",
                cmd: "login",
                response: [{type: "Property", name: "loginRes"}, {
                    type: "PropertyArray",
                    name: "loginPorts",
                    entity: "loginPort"
                }]
            },
            "2_5": {
                service: "auth",
                cmd: "kicked",
                response: [{type: "Number", name: "from"}, {type: "Number", name: "reason"}]
            },
            "2_6": {service: "auth", cmd: "logout"},
            "2_7": {
                service: "auth",
                cmd: "multiPortLogin",
                response: [{type: "Number", name: "state"}, {
                    type: "PropertyArray",
                    name: "loginPorts",
                    entity: "loginPort"
                }]
            },
            "2_8": {service: "auth", cmd: "kick", response: [{type: "StrArray", name: "deviceIds"}]},
            "3_3": {service: "user", cmd: "markInBlacklist"},
            "3_103": {
                service: "user",
                cmd: "syncMarkInBlacklist",
                response: [{type: "String", name: "account"}, {type: "Boolean", name: "isAdd"}]
            },
            "3_4": {service: "user", cmd: "getBlacklist", response: [{type: "StrArray", name: "blacklist"}]},
            "3_5": {service: "user", cmd: "markInMutelist"},
            "3_105": {
                service: "user",
                cmd: "syncMarkInMutelist",
                response: [{type: "String", name: "account"}, {type: "Boolean", name: "isAdd"}]
            },
            "3_6": {service: "user", cmd: "getMutelist", response: [{type: "StrArray", name: "mutelist"}]},
            "3_8": {
                service: "user",
                cmd: "getRelations",
                response: [{
                    type: "PropertyArray",
                    name: "specialRelations",
                    entity: "specialRelation"
                }, {type: "Number", name: "timetag"}]
            },
            "3_7": {
                service: "user",
                cmd: "getUsers",
                response: [{type: "PropertyArray", name: "users", entity: "user"}]
            },
            "3_10": {service: "user", cmd: "updateMyInfo", response: [{type: "Number", name: "timetag"}]},
            "3_109": {
                service: "user",
                cmd: "syncMyInfo",
                response: [{type: "Property", name: "user"}, {type: "Number", name: "timetag"}]
            },
            "3_110": {service: "user", cmd: "syncUpdateMyInfo", response: [{type: "Property", name: "user"}]},
            "4_1": {service: "notify"},
            "4_2": {service: "notify"},
            "4_3": {service: "notify", cmd: "markRead"},
            "4_4": {
                service: "notify",
                cmd: "syncOfflineMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "4_5": {service: "notify", cmd: "batchMarkRead"},
            "4_6": {
                service: "notify",
                cmd: "syncOfflineSysMsgs",
                response: [{type: "PropertyArray", name: "sysMsgs", entity: "sysMsg"}]
            },
            "4_9": {
                service: "notify",
                cmd: "syncRoamingMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "4_100": {
                service: "notify",
                cmd: "syncOfflineFilterMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "4_101": {
                service: "notify",
                cmd: "syncOfflineFilterSysMsgs",
                response: [{type: "PropertyArray", name: "sysMsgs", entity: "sysMsg"}]
            },
            "5_1": {service: "sync", cmd: "syncDone", response: [{type: "Number", name: "timetag"}]},
            "5_2": {service: "sync", cmd: "syncTeamMembersDone", response: [{type: "Number", name: "timetag"}]},
            "6_2": {service: "misc", cmd: "getNosToken", response: [{type: "Property", name: "nosToken"}]},
            "6_6": {service: "misc", cmd: "processImage", response: [{type: "String", name: "url"}]},
            "7_1": {service: "talk", cmd: "sendMsg", response: [{type: "Property", name: "msg"}]},
            "7_2": {service: "talk", cmd: "msg", response: [{type: "Property", name: "msg"}]},
            "7_3": {service: "talk", cmd: "sysMsg", response: [{type: "Property", name: "sysMsg"}]},
            "7_6": {
                service: "talk",
                cmd: "getHistoryMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "7_7": {service: "talk", cmd: "sendCustomSysMsg"},
            "7_8": {
                service: "talk",
                cmd: "searchHistoryMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "7_9": {service: "talk", cmd: "deleteSessions"},
            "7_10": {service: "talk", cmd: "getSessions", response: [{type: "StrArray", name: "sessions"}]},
            "7_101": {service: "talk", cmd: "syncSendMsg", response: [{type: "Property", name: "msg"}]},
            "8_1": {service: "team", cmd: "createTeam", response: [{type: "Property", name: "team"}]},
            "8_2": {service: "team", cmd: "sendTeamMsg", response: [{type: "Property", name: "msg"}]},
            "8_3": {service: "team", cmd: "teamMsg", response: [{type: "Property", name: "msg"}]},
            "8_4": {service: "team", cmd: "teamMsgs", response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]},
            "8_5": {service: "team", cmd: "addTeamMembers"},
            "8_6": {service: "team", cmd: "removeTeamMembers"},
            "8_7": {
                service: "team",
                cmd: "updateTeam",
                response: [{type: "Number", name: "id"}, {type: "Number", name: "time"}]
            },
            "8_8": {service: "team", cmd: "leaveTeam"},
            "8_9": {service: "team", cmd: "getTeam", response: [{type: "Property", name: "team"}]},
            "8_10": {
                service: "team",
                cmd: "getTeams",
                response: [{type: "PropertyArray", name: "teams", entity: "team"}, {type: "Number", name: "timetag"}]
            },
            "8_11": {
                service: "team",
                cmd: "getTeamMembers",
                response: [{type: "Number", name: "teamId"}, {
                    type: "PropertyArray",
                    name: "members",
                    entity: "teamMember"
                }, {type: "Number", name: "timetag"}]
            },
            "8_12": {service: "team", cmd: "dismissTeam"},
            "8_13": {service: "team", cmd: "applyTeam", response: [{type: "Property", name: "team"}]},
            "8_14": {service: "team", cmd: "passTeamApply"},
            "8_15": {service: "team", cmd: "rejectTeamApply"},
            "8_16": {service: "team", cmd: "addTeamManagers"},
            "8_17": {service: "team", cmd: "removeTeamManagers"},
            "8_18": {service: "team", cmd: "transferTeam"},
            "8_19": {service: "team", cmd: "updateInfoInTeam"},
            "8_20": {service: "team", cmd: "updateNickInTeam"},
            "8_21": {service: "team", cmd: "acceptTeamInvite", response: [{type: "Property", name: "team"}]},
            "8_22": {service: "team", cmd: "rejectTeamInvite"},
            "8_23": {
                service: "team",
                cmd: "getTeamHistoryMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "8_24": {
                service: "team",
                cmd: "searchTeamHistoryMsgs",
                response: [{type: "PropertyArray", name: "msgs", entity: "msg"}]
            },
            "8_109": {
                service: "team",
                cmd: "syncTeams",
                response: [{type: "Number", name: "timetag"}, {type: "PropertyArray", name: "teams", entity: "team"}]
            },
            "8_111": {
                service: "team",
                cmd: "syncTeamMembers",
                response: [{type: "Number", name: "teamId"}, {
                    type: "PropertyArray",
                    name: "members",
                    entity: "teamMember"
                }, {type: "Number", name: "timetag"}]
            },
            "8_101": {service: "team", cmd: "syncCreateTeam", response: [{type: "Property", name: "team"}]},
            "8_102": {service: "team", cmd: "syncSendTeamMsg", response: [{type: "Property", name: "msg"}]},
            "8_119": {service: "team", cmd: "syncUpdateTeamMember", response: [{type: "Property", name: "teamMember"}]},
            "12_1": {service: "friend", cmd: "friendRequest"},
            "12_101": {
                service: "friend",
                cmd: "syncFriendRequest",
                response: [{type: "String", name: "account"}, {type: "Number", name: "type"}, {
                    type: "String",
                    name: "ps"
                }]
            },
            "12_2": {service: "friend", cmd: "deleteFriend"},
            "12_102": {service: "friend", cmd: "syncDeleteFriend", response: [{type: "String", name: "account"}]},
            "12_3": {service: "friend", cmd: "updateFriend"},
            "12_103": {service: "friend", cmd: "syncUpdateFriend", response: [{type: "Property", name: "friend"}]},
            "12_4": {
                service: "friend",
                cmd: "getFriends",
                response: [{type: "PropertyArray", name: "friends", entity: "friend"}, {
                    type: "Number",
                    name: "timetag"
                }]
            },
            "12_5": {
                service: "friend",
                cmd: "syncFriends",
                response: [{type: "PropertyArray", name: "friends", entity: "friend"}, {
                    type: "Number",
                    name: "timetag"
                }]
            },
            "12_6": {
                service: "friend",
                cmd: "syncFriendUsers",
                response: [{type: "PropertyArray", name: "users", entity: "user"}, {type: "Number", name: "timetag"}]
            },
            "101_1": {service: "filter", cmd: "sendFilterMsg", response: [{type: "Property", name: "msg"}]},
            "101_2": {service: "filter", cmd: "filterMsg", response: [{type: "Property", name: "msg"}]},
            "101_3": {service: "filter", cmd: "filterSysMsg", response: [{type: "Property", name: "sysMsg"}]},
            "101_7": {service: "filter", cmd: "sendFilterCustomSysMsg"}
        };
        e.exports = {idMap: n, cmdConfig: r, packetConfig: i}
    }, function (e, t) {
        e.exports = {
            login: {
                os: 4,
                sdkVersion: 6,
                protocolVersion: 9,
                deviceId: 13,
                appKey: 18,
                account: 19,
                browser: 24,
                token: 1e3
            },
            loginRes: {lastLoginDeviceId: 17, connectionId: 102, ip: 103, port: 104, country: 106},
            loginPort: {type: 3, os: 4, mac: 5, deviceId: 13, account: 19, connectionId: 102, ip: 103, time: 109},
            sync: {
                myInfo: 1,
                offlineMsgs: 2,
                teams: 3,
                roamingMsgs: 7,
                relations: 9,
                friends: 11,
                sessions: 12,
                friendUsers: 13,
                filterMsgs: 100
            },
            team: {
                teamId: 1,
                name: 3,
                type: 4,
                owner: 5,
                level: 6,
                selfCustom: 7,
                valid: 8,
                memberNum: 9,
                memberUpdateTime: 10,
                createTime: 11,
                updateTime: 12,
                validToCurrentUser: 13,
                intro: 14,
                announcement: 15,
                joinMode: 16,
                bits: 17,
                custom: 18,
                serverCustom: 19
            },
            teamMember: {
                teamId: 1,
                account: 3,
                type: 4,
                nickInTeam: 5,
                bits: 7,
                active: 8,
                valid: 9,
                joinTime: 10,
                updateTime: 11
            },
            msg: {
                scene: 0,
                to: 1,
                from: 2,
                fromClientType: 4,
                fromDeviceId: 5,
                fromNick: 6,
                time: 7,
                type: 8,
                body: 9,
                attach: 10,
                idClient: 11,
                idServer: 12,
                resend: 13,
                userUpdateTime: 14,
                custom: 15,
                pushPayload: 16,
                pushContent: 17,
                isHistoryable: 100,
                isRoamingable: 101,
                isSyncable: 102,
                isMuted: 104,
                cc: 105,
                isPushable: 107,
                isOfflinable: 108,
                isUnreadable: 109,
                needPushNick: 110
            },
            sysMsg: {
                time: 0,
                type: 1,
                to: 2,
                from: 3,
                ps: 4,
                attach: 5,
                idServer: 6,
                sendToOnlineUsersOnly: 7,
                apnsText: 8,
                pushPayload: 9,
                cc: 105,
                isPushable: 107,
                isUnreadable: 109,
                needPushNick: 110
            },
            nosToken: {objectName: 1, token: 2, bucket: 3, expireTime: 4},
            friend: {
                account: 4,
                flag: 5,
                beflag: 6,
                source: 7,
                alias: 8,
                bits: 9,
                custom: 10,
                createTime: 11,
                updateTime: 12
            },
            user: {
                account: 1,
                nick: 3,
                avatar: 4,
                sign: 5,
                gender: 6,
                email: 7,
                birth: 8,
                tel: 9,
                custom: 10,
                createTime: 12,
                updateTime: 13
            },
            specialRelation: {account: 0, isMuted: 1, isBlacked: 2, createTime: 3, updateTime: 4},
            imageOp: {
                type: 0,
                stripMeta: 1,
                typeType: 2,
                blurRadius: 3,
                blurSigma: 4,
                qualityQuality: 5,
                cropX: 6,
                cropY: 7,
                cropWidth: 8,
                cropHeight: 9,
                rotateAngle: 10,
                pixelPixel: 11,
                thumbnailMode: 12,
                thumbnailWidth: 13,
                thumbnailHeight: 14,
                thumbnailAxisX: 15,
                thumbnailAxisY: 16,
                thumbnailCenterX: 17,
                thumbnailCenterY: 18,
                thumbnailEnlarge: 19,
                thumbnailToStatic: 20,
                watermarkType: 21,
                watermarkGravity: 22,
                watermarkDissolve: 23,
                watermarkDx: 24,
                watermarkDy: 25,
                watermarkImage: 26,
                watermarkText: 27,
                watermarkFont: 28,
                watermarkFontSize: 29,
                watermarkFontColor: 30,
                interlace: 31
            }
        }
    }, function (e, t) {
        e.exports = {
            login: {
                4: "os",
                6: "sdkVersion",
                9: "protocolVersion",
                13: "deviceId",
                18: "appKey",
                19: "account",
                24: "browser",
                1000: "token"
            },
            loginRes: {17: "lastLoginDeviceId", 102: "connectionId", 103: "ip", 104: "port", 106: "country"},
            loginPort: {
                3: "type",
                4: "os",
                5: "mac",
                13: "deviceId",
                19: "account",
                102: "connectionId",
                103: "ip",
                109: "time"
            },
            sync: {
                1: "myInfo",
                2: "offlineMsgs",
                3: "teams",
                7: "roamingMsgs",
                9: "relations",
                11: "friends",
                12: "sessions",
                13: "friendUsers",
                100: "filterMsgs"
            },
            team: {
                1: "teamId",
                3: "name",
                4: "type",
                5: "owner",
                6: "level",
                7: "selfCustom",
                8: "valid",
                9: "memberNum",
                10: "memberUpdateTime",
                11: "createTime",
                12: "updateTime",
                13: "validToCurrentUser",
                14: "intro",
                15: "announcement",
                16: "joinMode",
                17: "bits",
                18: "custom",
                19: "serverCustom"
            },
            teamMember: {
                1: "teamId",
                3: "account",
                4: "type",
                5: "nickInTeam",
                7: "bits",
                8: "active",
                9: "valid",
                10: "joinTime",
                11: "updateTime"
            },
            msg: {
                0: "scene",
                1: "to",
                2: "from",
                4: "fromClientType",
                5: "fromDeviceId",
                6: "fromNick",
                7: "time",
                8: "type",
                9: "body",
                10: "attach",
                11: "idClient",
                12: "idServer",
                13: "resend",
                14: "userUpdateTime",
                15: "custom",
                16: "pushPayload",
                17: "pushContent",
                100: "isHistoryable",
                101: "isRoamingable",
                102: "isSyncable",
                104: "isMuted",
                105: "cc",
                107: "isPushable",
                108: "isOfflinable",
                109: "isUnreadable",
                110: "needPushNick"
            },
            sysMsg: {
                0: "time",
                1: "type",
                2: "to",
                3: "from",
                4: "ps",
                5: "attach",
                6: "idServer",
                7: "sendToOnlineUsersOnly",
                8: "apnsText",
                9: "pushPayload",
                105: "cc",
                107: "isPushable",
                109: "isUnreadable",
                110: "needPushNick"
            },
            nosToken: {1: "objectName", 2: "token", 3: "bucket", 4: "expireTime"},
            friend: {
                4: "account",
                5: "flag",
                6: "beflag",
                7: "source",
                8: "alias",
                9: "bits",
                10: "custom",
                11: "createTime",
                12: "updateTime"
            },
            user: {
                1: "account",
                3: "nick",
                4: "avatar",
                5: "sign",
                6: "gender",
                7: "email",
                8: "birth",
                9: "tel",
                10: "custom",
                12: "createTime",
                13: "updateTime"
            },
            specialRelation: {0: "account", 1: "isMuted", 2: "isBlacked", 3: "createTime", 4: "updateTime"},
            imageOp: {
                0: "type",
                1: "stripMeta",
                2: "typeType",
                3: "blurRadius",
                4: "blurSigma",
                5: "qualityQuality",
                6: "cropX",
                7: "cropY",
                8: "cropWidth",
                9: "cropHeight",
                10: "rotateAngle",
                11: "pixelPixel",
                12: "thumbnailMode",
                13: "thumbnailWidth",
                14: "thumbnailHeight",
                15: "thumbnailAxisX",
                16: "thumbnailAxisY",
                17: "thumbnailCenterX",
                18: "thumbnailCenterY",
                19: "thumbnailEnlarge",
                20: "thumbnailToStatic",
                21: "watermarkType",
                22: "watermarkGravity",
                23: "watermarkDissolve",
                24: "watermarkDx",
                25: "watermarkDy",
                26: "watermarkImage",
                27: "watermarkText",
                28: "watermarkFont",
                29: "watermarkFontSize",
                30: "watermarkFontColor",
                31: "interlace"
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(20), i = n(11), o = {
            debug: !1,
            api: "log",
            style: "color:blue;",
            log: i.emptyFunc,
            info: i.emptyFunc,
            warn: i.emptyFunc
        }, s = ["Chrome", "Safari", "Firefox"];
        o.setDebug = function (e) {
            e = e ? e : !1, o.debug = e, e.style && (o.style = e.style), o.debug && console && (o.log = function () {
                var e = o.formatArgs(arguments);
                console.log && (console.log.apply ? (-1 !== s.indexOf(r.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, o.style)), console.log.apply(console, e)) : o.ie(console.log, e))
            }, o.info = function () {
                var e = o.formatArgs(arguments);
                console.info && (console.info.apply ? console.info.apply(console, e) : o.ie(console.info, e))
            }, o.warn = function () {
                var e = o.formatArgs(arguments);
                console.warn && (console.warn.apply ? console.warn.apply(console, e) : o.ie(console.warn, e))
            }, o.error = function () {
                var e = o.formatArgs(arguments);
                console.error && (console.error.apply ? console.error.apply(console, e) : o.ie(console.error, e))
            }, o.ie = function (e, t) {
                t.forEach(function (t) {
                    e(t)
                })
            })
        }, o.formatArgs = function (e) {
            e = [].slice.call(e, 0);
            var t = new Date, n = t.getFullYear() + "-" + a(t.getMonth() + 1) + "-" + a(t.getDate()) + " " + a(t.getHours()) + ":" + a(t.getMinutes()) + ":" + a(t.getSeconds()) + ":" + a(t.getMilliseconds(), 3), r = "[NIM SDK LOG " + n + "]	";
            return i.isString(e[0]) ? e[0] = r + e[0] : e.splice(0, 0, r), e
        };
        var a = function (e, t) {
            t = t || 2;
            for (var n = "" + e; n.length < t;)n = "0" + n;
            return n
        };
        e.exports = o
    }, function (e, t, n) {
        var r;
        (function (e, i) {
            (function () {
                "use strict";
                function o(e) {
                    return e = String(e), e.charAt(0).toUpperCase() + e.slice(1)
                }

                function s(e, t, n) {
                    var r = {
                        6.4: "10",
                        6.3: "8.1",
                        6.2: "8",
                        6.1: "Server 2008 R2 / 7",
                        "6.0": "Server 2008 / Vista",
                        5.2: "Server 2003 / XP 64-bit",
                        5.1: "XP",
                        5.01: "2000 SP1",
                        "5.0": "2000",
                        "4.0": "NT",
                        "4.90": "ME"
                    };
                    return t && n && /^Win/i.test(e) && (r = r[/[\d.]+$/.exec(e)]) && (e = "Windows " + r), e = String(e), t && n && (e = e.replace(RegExp(t, "i"), n)), e = c(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").split(" on ")[0])
                }

                function a(e, t) {
                    var n = -1, r = e ? e.length : 0;
                    if ("number" == typeof r && r > -1 && M >= r)for (; ++n < r;)t(e[n], n, e); else u(e, t)
                }

                function c(e) {
                    return e = m(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : o(e)
                }

                function u(e, t) {
                    for (var n in e)I.call(e, n) && t(e[n], n, e)
                }

                function l(e) {
                    return null == e ? o(e) : P.call(e).slice(8, -1)
                }

                function f(e, t) {
                    var n = null != e ? typeof e[t] : "number";
                    return !/^(?:boolean|number|string|undefined)$/.test(n) && ("object" == n ? !!e[t] : !0)
                }

                function d(e) {
                    return String(e).replace(/([ -])(?!$)/g, "$1?")
                }

                function p(e, t) {
                    var n = null;
                    return a(e, function (r, i) {
                        n = t(n, r, i, e)
                    }), n
                }

                function m(e) {
                    return String(e).replace(/^ +| +$/g, "")
                }

                function y(e) {
                    function t(t) {
                        return p(t, function (t, n) {
                            return t || RegExp("\\b" + (n.pattern || d(n)) + "\\b", "i").exec(e) && (n.label || n)
                        })
                    }

                    function n(t) {
                        return p(t, function (t, n, r) {
                            return t || (n[G] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(G)] || RegExp("\\b" + d(r) + "(?:\\b|\\w*\\d)", "i").exec(e)) && r
                        })
                    }

                    function r(t) {
                        return p(t, function (t, n) {
                            return t || RegExp("\\b" + (n.pattern || d(n)) + "\\b", "i").exec(e) && (n.label || n)
                        })
                    }

                    function i(t) {
                        return p(t, function (t, n) {
                            var r = n.pattern || d(n);
                            return !t && (t = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (t = s(t, r, n.label || n)), t
                        })
                    }

                    function o(t) {
                        return p(t, function (t, n) {
                            var r = n.pattern || d(n);
                            return !t && (t = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(n.label && !RegExp(r, "i").test(n.label) ? n.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), n = n.label || n, t = c(t[0].replace(RegExp(r, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2"))), t
                        })
                    }

                    function a(t) {
                        return p(t, function (t, n) {
                            return t || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null
                        })
                    }

                    function h() {
                        return this.description || ""
                    }

                    var b = g, T = e && "object" == typeof e && "String" != l(e);
                    T && (b = e, e = null);
                    var k = b.navigator || {}, M = k.userAgent || "";
                    e || (e = M);
                    var O, I, x = T || S == v, C = T ? !!k.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(P.toString()), _ = "Object", j = T ? _ : "ScriptBridgingProxyObject", E = T ? _ : "Environment", A = T && b.java ? "JavaPackage" : l(b.java), F = T ? _ : "RuntimeObject", R = /\bJava/.test(A) && b.java, U = R && l(b.environment) == E, N = R ? "a" : "α", D = R ? "b" : "β", B = b.document || {}, L = b.operamini || b.opera, W = w.test(W = T && L ? L["[[Class]]"] : l(L)) ? W : L = null, q = e, $ = [], H = null, X = e == M, V = X && L && "function" == typeof L.version && L.version(), z = t(["Trident", {
                        label: "WebKit",
                        pattern: "AppleWebKit"
                    }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]), K = r(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", {
                        label: "SRWare Iron",
                        pattern: "Iron"
                    }, "K-Meleon", "Konqueror", "Lunascape", "Maxthon", "Midori", "Nook Browser", "PhantomJS", "Raven", "Rekonq", "RockMelt", "SeaMonkey", {
                        label: "Silk",
                        pattern: "(?:Cloud9|Silk-Accelerated)"
                    }, "Sleipnir", "SlimBrowser", "Sunrise", "Swiftfox", "WebPositive", "Opera Mini", {
                        label: "Opera Mini",
                        pattern: "OPiOS"
                    }, "Opera", {label: "Opera", pattern: "OPR"}, "Chrome", {
                        label: "Chrome Mobile",
                        pattern: "(?:CriOS|CrMo)"
                    }, {label: "Firefox", pattern: "(?:Firefox|Minefield)"}, {
                        label: "IE",
                        pattern: "IEMobile"
                    }, {label: "IE", pattern: "MSIE"}, "Safari"]), G = o([{
                        label: "BlackBerry",
                        pattern: "BB10"
                    }, "BlackBerry", {label: "Galaxy S", pattern: "GT-I9000"}, {
                        label: "Galaxy S2",
                        pattern: "GT-I9100"
                    }, {label: "Galaxy S3", pattern: "GT-I9300"}, {
                        label: "Galaxy S4",
                        pattern: "GT-I9500"
                    }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                        label: "Kindle Fire",
                        pattern: "(?:Cloud9|Silk-Accelerated)"
                    }, "Nook", "PlayBook", "PlayStation 4", "PlayStation 3", "PlayStation Vita", "TouchPad", "Transformer", {
                        label: "Wii U",
                        pattern: "WiiU"
                    }, "Wii", "Xbox One", {label: "Xbox 360", pattern: "Xbox"}, "Xoom"]), J = n({
                        Apple: {
                            iPad: 1,
                            iPhone: 1,
                            iPod: 1
                        },
                        Amazon: {Kindle: 1, "Kindle Fire": 1},
                        Asus: {Transformer: 1},
                        "Barnes & Noble": {Nook: 1},
                        BlackBerry: {PlayBook: 1},
                        Google: {"Google TV": 1},
                        HP: {TouchPad: 1},
                        HTC: {},
                        LG: {},
                        Microsoft: {Xbox: 1, "Xbox One": 1},
                        Motorola: {Xoom: 1},
                        Nintendo: {"Wii U": 1, Wii: 1},
                        Nokia: {Lumia: 1},
                        Samsung: {"Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1},
                        Sony: {"PlayStation 4": 1, "PlayStation 3": 1, "PlayStation Vita": 1}
                    }), Y = i(["Windows Phone ", "Android", "CentOS", "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
                    if (z && (z = [z]), J && !G && (G = o([J])), (O = /\bGoogle TV\b/.exec(G)) && (G = O[0]), /\bSimulator\b/i.test(e) && (G = (G ? G + " " : "") + "Simulator"), "Opera Mini" == K && /\bOPiOS\b/.test(e) && $.push("running in Turbo/Uncompressed mode"), /^iP/.test(G) ? (K || (K = "Safari"), Y = "iOS" + ((O = / OS ([\d_]+)/i.exec(e)) ? " " + O[1].replace(/_/g, ".") : "")) : "Konqueror" != K || /buntu/i.test(Y) ? J && "Google" != J && (/Chrome/.test(K) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(G)) ? (K = "Android Browser", Y = /\bAndroid\b/.test(Y) ? Y : "Android") : (!K || (O = !/\bMinefield\b|\(Android;/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(K))) && (K && !G && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(O + "/") + 8)) && (K = null), (O = G || J || Y) && (G || J || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(Y)) && (K = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(Y) ? Y : O) + " Browser")) : Y = "Kubuntu", (O = /\((Mobile|Tablet).*?Firefox\b/i.exec(e)) && O[1] && (Y = "Firefox OS", G || (G = O[1])), V || (V = a(["(?:Cloud9|CriOS|CrMo|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))", "Version", d(K), "(?:Firefox|Minefield|NetFront)"])), "iCab" == z && parseFloat(V) > 3 ? z = ["WebKit"] : "Trident" != z && (O = /\bOpera\b/.test(K) && (/\bOPR\b/.test(e) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(e) && "WebKit" || !z && /\bMSIE\b/i.test(e) && ("Mac OS" == Y ? "Tasman" : "Trident")) ? z = [O] : /\bPlayStation\b(?! Vita\b)/i.test(K) && "WebKit" == z && (z = ["NetFront"]), "IE" == K && (O = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (K += " Mobile", Y = "Windows Phone " + (/\+$/.test(O) ? O : O + ".x"), $.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (K = "IE Mobile", Y = "Windows Phone 8+", $.unshift("desktop mode"), V || (V = (/\brv:([\d.]+)/.exec(e) || 0)[1])) : "IE" != K && "Trident" == z && (O = /\brv:([\d.]+)/.exec(e)) ? (/\bWPDesktop\b/i.test(e) || (K && $.push("identifying as " + K + (V ? " " + V : "")), K = "IE"), V = O[1]) : "Chrome" != K && "IE" == K || !(O = /\bEdge\/([\d.]+)/.exec(e)) || (K = "IE", V = O[1], z = ["Trident"], $.unshift("platform preview")), X) {
                        if (f(b, "global"))if (R && (O = R.lang.System, q = O.getProperty("os.arch"), Y = Y || O.getProperty("os.name") + " " + O.getProperty("os.version")), x && f(b, "system") && (O = [b.system])[0]) {
                            Y || (Y = O[0].os || null);
                            try {
                                O[1] = b.require("ringo/engine").version, V = O[1].join("."), K = "RingoJS"
                            } catch (Z) {
                                O[0].global.system == b.system && (K = "Narwhal")
                            }
                        } else"object" == typeof b.process && (O = b.process) ? (K = "Node.js", q = O.arch, Y = O.platform, V = /[\d.]+/.exec(O.version)[0]) : U && (K = "Rhino"); else l(O = b.runtime) == j ? (K = "Adobe AIR", Y = O.flash.system.Capabilities.os) : l(O = b.phantom) == F ? (K = "PhantomJS", V = (O = O.version || null) && O.major + "." + O.minor + "." + O.patch) : "number" == typeof B.documentMode && (O = /\bTrident\/(\d+)/i.exec(e)) && (V = [V, B.documentMode], (O = +O[1] + 4) != V[1] && ($.push("IE " + V[1] + " mode"), z && (z[1] = ""), V[1] = O), V = "IE" == K ? String(V[1].toFixed(1)) : V[0]);
                        Y = Y && c(Y)
                    }
                    V && (O = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(V) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (X && k.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (H = /b/i.test(O) ? "beta" : "alpha", V = V.replace(RegExp(O + "\\+?$"), "") + ("beta" == H ? D : N) + (/\d+\+?/.exec(O) || "")), "Fennec" == K || "Firefox" == K && /\b(?:Android|Firefox OS)\b/.test(Y) ? K = "Firefox Mobile" : "Maxthon" == K && V ? V = V.replace(/\.[\d.]+/, ".x") : "Silk" == K ? (/\bMobi/i.test(e) || (Y = "Android", $.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && $.unshift("accelerated")) : /\bXbox\b/i.test(G) ? (Y = null, "Xbox 360" == G && /\bIEMobile\b/.test(e) && $.unshift("mobile mode")) : !/^(?:Chrome|IE|Opera)$/.test(K) && (!K || G || /Browser|Mobi/.test(K)) || "Windows CE" != Y && !/Mobi/i.test(e) ? "IE" == K && X && null === b.external ? $.unshift("platform preview") : (/\bBlackBerry\b/.test(G) || /\bBB10\b/.test(e)) && (O = (RegExp(G.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || V) ? (O = [O, /BB10/.test(e)], Y = (O[1] ? (G = null, J = "BlackBerry") : "Device Software") + " " + O[0], V = null) : this != u && "Wii" != G && (X && L || /Opera/.test(K) && /\b(?:MSIE|Firefox)\b/i.test(e) || "Firefox" == K && /\bOS X (?:\d+\.){2,}/.test(Y) || "IE" == K && (Y && !/^Win/.test(Y) && V > 5.5 || /\bWindows XP\b/.test(Y) && V > 8 || 8 == V && !/\bTrident\b/.test(e))) && !w.test(O = y.call(u, e.replace(w, "") + ";")) && O.name && (O = "ing as " + O.name + ((O = O.version) ? " " + O : ""), w.test(K) ? (/\bIE\b/.test(O) && "Mac OS" == Y && (Y = null), O = "identify" + O) : (O = "mask" + O, K = W ? c(W.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(O) && (Y = null), X || (V = null)), z = ["Presto"], $.push(O)) : K += " Mobile", (O = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (O = [parseFloat(O.replace(/\.(\d)$/, ".0$1")), O], "Safari" == K && "+" == O[1].slice(-1) ? (K = "WebKit Nightly", H = "alpha", V = O[1].slice(0, -1)) : (V == O[1] || V == (O[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1])) && (V = null), O[1] = (/\bChrome\/([\d.]+)/i.exec(e) || 0)[1], 537.36 == O[0] && 537.36 == O[2] && parseFloat(O[1]) >= 28 && "IE" != K && (z = ["Blink"]), X && (C || O[1]) ? (z && (z[1] = "like Chrome"), O = O[1] || (O = O[0], 530 > O ? 1 : 532 > O ? 2 : 532.05 > O ? 3 : 533 > O ? 4 : 534.03 > O ? 5 : 534.07 > O ? 6 : 534.1 > O ? 7 : 534.13 > O ? 8 : 534.16 > O ? 9 : 534.24 > O ? 10 : 534.3 > O ? 11 : 535.01 > O ? 12 : 535.02 > O ? "13+" : 535.07 > O ? 15 : 535.11 > O ? 16 : 535.19 > O ? 17 : 536.05 > O ? 18 : 536.1 > O ? 19 : 537.01 > O ? 20 : 537.11 > O ? "21+" : 537.13 > O ? 23 : 537.18 > O ? 24 : 537.24 > O ? 25 : 537.36 > O ? 26 : "Blink" != z ? "27" : "28")) : (z && (z[1] = "like Safari"), O = O[0], O = 400 > O ? 1 : 500 > O ? 2 : 526 > O ? 3 : 533 > O ? 4 : 534 > O ? "4+" : 535 > O ? 5 : 537 > O ? 6 : 538 > O ? 7 : 601 > O ? 8 : "8"), z && (z[1] += " " + (O += "number" == typeof O ? ".x" : /[.+]/.test(O) ? "" : "+")), "Safari" == K && (!V || parseInt(V) > 45) && (V = O)), "Opera" == K && (O = /\bzbov|zvav$/.exec(Y)) ? (K += " ", $.unshift("desktop mode"), "zvav" == O ? (K += "Mini", V = null) : K += "Mobile", Y = Y.replace(RegExp(" *" + O + "$"), "")) : "Safari" == K && /\bChrome\b/.exec(z && z[1]) && ($.unshift("desktop mode"), K = "Chrome Mobile", V = null, /\bOS X\b/.test(Y) ? (J = "Apple", Y = "iOS 4.3+") : Y = null), V && 0 == V.indexOf(O = /[\d.]+$/.exec(Y)) && e.indexOf("/" + O + "-") > -1 && (Y = m(Y.replace(O, ""))), z && !/\b(?:Avant|Nook)\b/.test(K) && (/Browser|Lunascape|Maxthon/.test(K) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(K) && z[1]) && (O = z[z.length - 1]) && $.push(O), $.length && ($ = ["(" + $.join("; ") + ")"]), J && G && G.indexOf(J) < 0 && $.push("on " + J), G && $.push((/^on /.test($[$.length - 1]) ? "" : "on ") + G), Y && (O = / ([\d.+]+)$/.exec(Y), I = O && "/" == Y.charAt(Y.length - O[0].length - 1), Y = {
                        architecture: 32,
                        family: O && !I ? Y.replace(O[0], "") : Y,
                        version: O ? O[1] : null,
                        toString: function () {
                            var e = this.version;
                            return this.family + (e && !I ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
                        }
                    }), (O = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(q)) && !/\bi686\b/i.test(q) && (Y && (Y.architecture = 64, Y.family = Y.family.replace(RegExp(" *" + O), "")), K && (/\bWOW64\b/i.test(e) || X && /\w(?:86|32)$/.test(k.cpuClass || k.platform) && !/\bWin64; x64\b/i.test(e)) && $.unshift("32-bit")), e || (e = null);
                    var Q = {};
                    return Q.description = e, Q.layout = z && z[0], Q.manufacturer = J, Q.name = K, Q.prerelease = H, Q.product = G, Q.ua = e, Q.version = K && V, Q.os = Y || {
                            architecture: null,
                            family: null,
                            version: null,
                            toString: function () {
                                return "null"
                            }
                        }, Q.parse = y, Q.toString = h, Q.version && $.unshift(V), Q.name && $.unshift(K), Y && K && (Y != String(Y).split(" ")[0] || Y != K.split(" ")[0] && !G) && $.push(G ? "(" + Y + ")" : "on " + Y), $.length && (Q.description = $.join(" ")), Q
                }

                var h = {
                    "function": !0,
                    object: !0
                }, g = h[typeof window] && window || this, v = g, b = h[typeof t] && t, T = h[typeof e] && e && !e.nodeType && e, k = b && T && "object" == typeof i && i;
                !k || k.global !== k && k.window !== k && k.self !== k || (g = k);
                var M = Math.pow(2, 53) - 1, w = /\bOpera/, S = this, O = Object.prototype, I = O.hasOwnProperty, P = O.toString;
                r = function () {
                    return y()
                }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
            }).call(this)
        }).call(t, n(5)(e), function () {
            return this
        }())
    }, function (e, t, n) {
        var r = "1.7.0", i = "https://lbs.netease.im/lbs/webconf.jsp", o = n(22), s = n(11), a = s.undef, c = n(19);
        if (a(r))throw new Error("please inject version");
        if (a(i))throw new Error("please inject lbsUrl");
        var u = 42e3, l = {
            version: r,
            sdkVersion: 18,
            protocolVersion: 1,
            lbsUrl: i,
            xhrTimeout: 6e3,
            socketTimeout: 6e3,
            reconnectionDelay: 1e3,
            reconnectionDelayMax: u,
            reconnectionJitter: .1,
            cmdTimeout: u
        };
        l.socketUrls = [], l.currSocketUrl = null, l.getNextSocketUrl = function () {
            return l.currSocketUrl = l.socketUrls.shift(), l.currSocketUrl
        }, l.refreshSocketUrl = function (e) {
            var t = l.lbsUrl + "?k=" + e.appKey + "&id=" + e.account + "&sv=" + l.sdkVersion + "&pv=" + l.protocolVersion;
            c.log("lbsUrl", t), o({method: "GET", cors: !0, url: t, timeout: l.xhrTimeout}, function (t, n, r) {
                t ? e.done(t) : (r = JSON.parse(r), r.common.link.forEach(function (e) {
                    l.socketUrls.push(l.formatSocketUrl(e))
                }), r.common["link.default"].forEach(function (e) {
                    e = l.formatSocketUrl(e), -1 === l.socketUrls.indexOf(e) && l.socketUrls.push(e)
                }), e.done(null, l.getNextSocketUrl()))
            })
        }, l.formatSocketUrl = function (e) {
            return -1 === e.indexOf("https") ? "https://" + e : e
        };
        var f = "https://nos.netease.com/";
        l.fileServerUrl = f, l.genUploadUrl = function (e) {
            return l.fileServerUrl + e
        }, l.genDownloadUrl = function (e, t) {
            return l.fileServerUrl === f ? "http://" + e + ".nos.netease.com/" + t : void 0
        }, e.exports = l
    }, function (e, t, n) {
        "use strict";
        function r(e, t) {
            for (var n = 0; n < e.length; n++)t(e[n])
        }

        function i(e) {
            for (var t in e)if (e.hasOwnProperty(t))return !1;
            return !0
        }

        function o(e, t, n) {
            var r = e;
            return f(t) ? (n = t, "string" == typeof e && (r = {uri: e})) : r = p(t, {uri: e}), r.callback = n, r
        }

        function s(e, t, n) {
            return t = o(e, t, n), a(t)
        }

        function a(e) {
            function t() {
                4 === u.readyState && o()
            }

            function n() {
                var e = void 0;
                if (u.response ? e = u.response : "text" !== u.responseType && u.responseType || (e = u.responseText || u.responseXML), T)try {
                    e = JSON.parse(e)
                } catch (t) {
                }
                return e
            }

            function r(e) {
                clearTimeout(m), e instanceof Error || (e = new Error("" + (e || "Unknown XMLHttpRequest Error"))), e.statusCode = 0, a(e, c)
            }

            function o() {
                if (!p) {
                    var t;
                    clearTimeout(m), t = e.useXDR && void 0 === u.status ? 200 : 1223 === u.status ? 204 : u.status;
                    var r = c, i = null;
                    0 !== t ? (r = {
                        body: n(),
                        statusCode: t,
                        method: h,
                        headers: {},
                        url: y,
                        rawRequest: u
                    }, u.getAllResponseHeaders && (r.headers = d(u.getAllResponseHeaders()))) : i = new Error("Internal XMLHttpRequest Error"), a(i, r, r.body)
                }
            }

            var a = e.callback;
            if ("undefined" == typeof a)throw new Error("callback argument missing");
            a = l(a);
            var c = {body: void 0, headers: {}, statusCode: 0, method: h, url: y, rawRequest: u}, u = e.xhr || null;
            u || (u = e.cors || e.useXDR ? new s.XDomainRequest : new s.XMLHttpRequest);
            var f, p, m, y = u.url = e.uri || e.url, h = u.method = e.method || "GET", g = e.body || e.data || null, v = u.headers = e.headers || {}, b = !!e.sync, T = !1;
            if ("json" in e && (T = !0, v.accept || v.Accept || (v.Accept = "application/json"), "GET" !== h && "HEAD" !== h && (v["content-type"] || v["Content-Type"] || (v["Content-Type"] = "application/json"), g = JSON.stringify(e.json))), u.onreadystatechange = t, u.onload = o, u.onerror = r, u.onprogress = function () {
                }, u.ontimeout = r, u.open(h, y, !b, e.username, e.password), b || (u.withCredentials = !!e.withCredentials), !b && e.timeout > 0 && (m = setTimeout(function () {
                    p = !0, u.abort("timeout");
                    var e = new Error("XMLHttpRequest timeout");
                    e.code = "ETIMEDOUT", r(e)
                }, e.timeout)), u.setRequestHeader)for (f in v)v.hasOwnProperty(f) && u.setRequestHeader(f, v[f]); else if (e.headers && !i(e.headers))throw new Error("Headers cannot be set on an XDomainRequest object");
            return "responseType" in e && (u.responseType = e.responseType), "beforeSend" in e && "function" == typeof e.beforeSend && e.beforeSend(u), u.send(g), u
        }

        function c() {
        }

        var u = n(23), l = n(24), f = n(25), d = n(26), p = n(29);
        e.exports = s, s.XMLHttpRequest = u.XMLHttpRequest || c, s.XDomainRequest = "withCredentials" in new s.XMLHttpRequest ? s.XMLHttpRequest : u.XDomainRequest, r(["get", "put", "post", "patch", "head", "delete"], function (e) {
            s["delete" === e ? "del" : e] = function (t, n, r) {
                return n = o(t, n, r), n.method = e.toUpperCase(), a(n)
            }
        })
    }, function (e, t) {
        (function (t) {
            "undefined" != typeof window ? e.exports = window : "undefined" != typeof t ? e.exports = t : "undefined" != typeof self ? e.exports = self : e.exports = {}
        }).call(t, function () {
            return this
        }())
    }, function (e, t) {
        function n(e) {
            var t = !1;
            return function () {
                return t ? void 0 : (t = !0, e.apply(this, arguments))
            }
        }

        e.exports = n, n.proto = n(function () {
            Object.defineProperty(Function.prototype, "once", {
                value: function () {
                    return n(this)
                }, configurable: !0
            })
        })
    }, function (e, t) {
        function n(e) {
            var t = r.call(e);
            return "[object Function]" === t || "function" == typeof e && "[object RegExp]" !== t || "undefined" != typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt)
        }

        e.exports = n;
        var r = Object.prototype.toString
    }, function (e, t, n) {
        var r = n(27), i = n(28), o = function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        };
        e.exports = function (e) {
            if (!e)return {};
            var t = {};
            return i(r(e).split("\n"), function (e) {
                var n = e.indexOf(":"), i = r(e.slice(0, n)).toLowerCase(), s = r(e.slice(n + 1));
                "undefined" == typeof t[i] ? t[i] = s : o(t[i]) ? t[i].push(s) : t[i] = [t[i], s]
            }), t
        }
    }, function (e, t) {
        function n(e) {
            return e.replace(/^\s*|\s*$/g, "")
        }

        t = e.exports = n, t.left = function (e) {
            return e.replace(/^\s*/, "")
        }, t.right = function (e) {
            return e.replace(/\s*$/, "")
        }
    }, function (e, t, n) {
        function r(e, t, n) {
            if (!a(t))throw new TypeError("iterator must be a function");
            arguments.length < 3 && (n = this), "[object Array]" === c.call(e) ? i(e, t, n) : "string" == typeof e ? o(e, t, n) : s(e, t, n)
        }

        function i(e, t, n) {
            for (var r = 0, i = e.length; i > r; r++)u.call(e, r) && t.call(n, e[r], r, e)
        }

        function o(e, t, n) {
            for (var r = 0, i = e.length; i > r; r++)t.call(n, e.charAt(r), r, e)
        }

        function s(e, t, n) {
            for (var r in e)u.call(e, r) && t.call(n, e[r], r, e)
        }

        var a = n(25);
        e.exports = r;
        var c = Object.prototype.toString, u = Object.prototype.hasOwnProperty
    }, function (e, t) {
        function n() {
            for (var e = {}, t = 0; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)n.hasOwnProperty(r) && (e[r] = n[r])
            }
            return e
        }

        e.exports = n
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn, i = n(21), o = n(19), s = n(31), a = n(12), c = n(32);
        r.isConnected = function () {
            var e = this;
            return !!e.socket && !!e.socket.socket && e.socket.socket.connected
        }, r.disconnect = function () {
            o.info("disconnecting"), this.logout()
        }, r.connect = function () {
            var e = this;
            if (!e.isConnected() && !e.connecting)if (e.connecting = !0, e.disconnected = !1, e.socket)o.log("connecting"), e.socket.socket.connect(); else {
                var t = i.getNextSocketUrl();
                t ? e.connectToUrl(t) : e.refreshSocketUrl()
            }
        }, r.refreshSocketUrl = function () {
            o.log("will refresh lbs");
            var e = this;
            i.refreshSocketUrl({
                appKey: s.appKey, account: s.account, done: function (t, n) {
                    t ? e.onDisconnect() : e.connectToUrl(n)
                }
            })
        }, r.connectToUrl = function (e) {
            o.log("try connect to ", e);
            var t = this;
            t.socket = c.connect(e, {
                reconnect: !1,
                "max reconnection attempts": 1 / 0,
                "connect timeout": i.socketTimeout,
                transports: ["websocket", "xhr-polling"],
                "force new connection": !0,
                secure: !0
            }), t.socket.on("connect", t.onConnect.bind(t)), t.socket.on("error", t.onError.bind(t)), t.socket.on("message", t.onMessage.bind(t)), t.socket.on("disconnect", t.onDisconnect.bind(t))
        }, r.onConnect = function () {
            var e = this;
            e.backoff && e.backoff.reset(), e.retryCount = 0, e.connecting = !1, e.shouldReconnect = !0, e.disconnected = !1, e.login()
        }, r.onError = function () {
            var e = arguments[0];
            e && this.notifyError(e)
        }, r.onDisconnect = function () {
            var e = this;
            e.connecting = !1, e.markAllCallbackInvalid(a.newNetworkError()), e.stopHeartbeat(), e.reconnect()
        }, r.willReconnect = function () {
            var e = this;
            return e.shouldReconnect && e.needReconnect && e.retryCount < e.reconnectionAttempts
        }, r.reconnect = function () {
            var e = this;
            if (e.willReconnect()) {
                e.socket = null, e.retryCount++;
                var t = e.backoff.duration();
                o.log("will retry after", t + "ms", ", retryCount", e.retryCount), e.options.onwillreconnect({
                    retryCount: e.retryCount,
                    duration: t
                }), setTimeout(function () {
                    e.connect()
                }, t)
            } else e.noReconnect()
        }, r.noReconnect = function () {
            this.notifyDisconnect()
        }, r.onAuthError = function (e) {
            var t = this;
            t.shouldReconnect = !1, t.markAllCallbackInvalid(e || a.newConnectionError()), t.notifyDisconnect(e)
        }, r.notifyDisconnect = function (e) {
            var t = this;
            t.disconnected || (t.disconnected = !0, t.backoff && t.backoff.reset(), t.retryCount = 0, t.connecting = !1, e = e || new a, e.retryCount = t.retryCount, e.willReconnect = t.willReconnect(), o.info("onDisconnect", e), t.options.ondisconnect(e))
        }, r.onMiscError = function (e, t, n) {
            e && (e.appendMessage(n), this.notifyError(e, t))
        }, r.onDBError = function (e) {
            var t = a.newDBError();
            t.event = e, this.notifyError(t)
        }, r.notifyError = function (e, t) {
            var n = this;
            if (n.isConnected()) {
                var r = ["onError", e];
                e.event && r.push(e.event), t && r.push(t), o.error.apply(o.error, r), n.options.onerror(e, t)
            }
        }
    }, function (e, t) {
        "use strict";
        var n = {};
        e.exports = n
    }, function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        (function (module) {
            var io = module.exports;
            !function () {
                if (function (e, t) {
                        var n = e;
                        n.version = "0.9.11", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function (e, r) {
                            var i, o, s = n.util.parseUri(e);
                            t && t.location && (s.protocol = s.protocol || t.location.protocol.slice(0, -1), s.host = s.host || (t.document ? t.document.domain : t.location.hostname), s.port = s.port || t.location.port), i = n.util.uniqueUri(s);
                            var a = {
                                host: s.host,
                                secure: "https" == s.protocol,
                                port: s.port || ("https" == s.protocol ? 443 : 80),
                                query: s.query || ""
                            };
                            return n.util.merge(a, r), (a["force new connection"] || !n.sockets[i]) && (o = new n.Socket(a)), !a["force new connection"] && o && (n.sockets[i] = o), o = o || n.sockets[i], o.of(s.path.length > 1 ? s.path : "")
                        }
                    }(module.exports, this), function (e, t) {
                        var n = e.util = {}, r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, i = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                        n.parseUri = function (e) {
                            for (var t = r.exec(e || ""), n = {}, o = 14; o--;)n[i[o]] = t[o] || "";
                            return n
                        }, n.uniqueUri = function (e) {
                            var n = e.protocol, r = e.host, i = e.port;
                            return "document" in t ? (r = r || document.domain, i = i || ("https" == n && "https:" !== document.location.protocol ? 443 : document.location.port)) : (r = r || "localhost", i || "https" != n || (i = 443)), (n || "http") + "://" + r + ":" + (i || 80)
                        }, n.query = function (e, t) {
                            var r = n.chunkQuery(e || ""), i = [];
                            n.merge(r, n.chunkQuery(t || ""));
                            for (var o in r)r.hasOwnProperty(o) && i.push(o + "=" + r[o]);
                            return i.length ? "?" + i.join("&") : ""
                        }, n.chunkQuery = function (e) {
                            for (var t, n = {}, r = e.split("&"), i = 0, o = r.length; o > i; ++i)t = r[i].split("="), t[0] && (n[t[0]] = t[1]);
                            return n
                        };
                        var o = !1;
                        n.load = function (e) {
                            return "document" in t && "complete" === document.readyState || o ? e() : void n.on(t, "load", e, !1)
                        }, n.on = function (e, t, n, r) {
                            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, r)
                        }, n.request = function (e) {
                            if (e && "undefined" != typeof XDomainRequest && !n.ua.hasCORS)return new XDomainRequest;
                            if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS))return new XMLHttpRequest;
                            if (!e)try {
                                return new (window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                            } catch (t) {
                            }
                            return null
                        }, "undefined" != typeof window && n.load(function () {
                            o = !0
                        }), n.defer = function (e) {
                            return n.ua.webkit && "undefined" == typeof importScripts ? void n.load(function () {
                                setTimeout(e, 100)
                            }) : e()
                        }, n.merge = function (e, t, r, i) {
                            var o, s = i || [], a = "undefined" == typeof r ? 2 : r;
                            for (o in t)t.hasOwnProperty(o) && n.indexOf(s, o) < 0 && ("object" == typeof e[o] && a ? n.merge(e[o], t[o], a - 1, s) : (e[o] = t[o], s.push(t[o])));
                            return e
                        }, n.mixin = function (e, t) {
                            n.merge(e.prototype, t.prototype)
                        }, n.inherit = function (e, t) {
                            function n() {
                            }

                            n.prototype = t.prototype, e.prototype = new n
                        }, n.isArray = Array.isArray || function (e) {
                                return "[object Array]" === Object.prototype.toString.call(e)
                            }, n.intersect = function (e, t) {
                            for (var r = [], i = e.length > t.length ? e : t, o = e.length > t.length ? t : e, s = 0, a = o.length; a > s; s++)~n.indexOf(i, o[s]) && r.push(o[s]);
                            return r
                        }, n.indexOf = function (e, t, n) {
                            for (var r = e.length, n = 0 > n ? 0 > n + r ? 0 : n + r : n || 0; r > n && e[n] !== t; n++);
                            return n >= r ? -1 : n
                        }, n.toArray = function (e) {
                            for (var t = [], n = 0, r = e.length; r > n; n++)t.push(e[n]);
                            return t
                        }, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function () {
                                try {
                                    var e = new XMLHttpRequest
                                } catch (t) {
                                    return !1
                                }
                                return void 0 != e.withCredentials
                            }(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
                    }("undefined" != typeof io ? io : module.exports, this), function (e, t) {
                        function n() {
                        }

                        e.EventEmitter = n, n.prototype.on = function (e, n) {
                            return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [this.$events[e], n] : this.$events[e] = n, this
                        }, n.prototype.addListener = n.prototype.on, n.prototype.once = function (e, t) {
                            function n() {
                                r.removeListener(e, n), t.apply(this, arguments)
                            }

                            var r = this;
                            return n.listener = t, this.on(e, n), this
                        }, n.prototype.removeListener = function (e, n) {
                            if (this.$events && this.$events[e]) {
                                var r = this.$events[e];
                                if (t.util.isArray(r)) {
                                    for (var i = -1, o = 0, s = r.length; s > o; o++)if (r[o] === n || r[o].listener && r[o].listener === n) {
                                        i = o;
                                        break
                                    }
                                    if (0 > i)return this;
                                    r.splice(i, 1), r.length || delete this.$events[e]
                                } else(r === n || r.listener && r.listener === n) && delete this.$events[e]
                            }
                            return this
                        }, n.prototype.removeAllListeners = function (e) {
                            return void 0 === e ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[e] = null), this)
                        }, n.prototype.listeners = function (e) {
                            return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]), this.$events[e]
                        }, n.prototype.emit = function (e) {
                            if (!this.$events)return !1;
                            var n = this.$events[e];
                            if (!n)return !1;
                            var r = Array.prototype.slice.call(arguments, 1);
                            if ("function" == typeof n)n.apply(this, r); else {
                                if (!t.util.isArray(n))return !1;
                                for (var i = n.slice(), o = 0, s = i.length; s > o; o++)i[o].apply(this, r)
                            }
                            return !0
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (exports, nativeJSON) {
                        "use strict";
                        function f(e) {
                            return 10 > e ? "0" + e : e
                        }

                        function date(e, t) {
                            return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) + "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" : null
                        }

                        function quote(e) {
                            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                                var t = meta[e];
                                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                            }) + '"' : '"' + e + '"'
                        }

                        function str(e, t) {
                            var n, r, i, o, s, a = gap, c = t[e];
                            switch (c instanceof Date && (c = date(e)), "function" == typeof rep && (c = rep.call(t, e, c)), typeof c) {
                                case"string":
                                    return quote(c);
                                case"number":
                                    return isFinite(c) ? String(c) : "null";
                                case"boolean":
                                case"null":
                                    return String(c);
                                case"object":
                                    if (!c)return "null";
                                    if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(c)) {
                                        for (o = c.length, n = 0; o > n; n += 1)s[n] = str(n, c) || "null";
                                        return i = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]", gap = a, i
                                    }
                                    if (rep && "object" == typeof rep)for (o = rep.length, n = 0; o > n; n += 1)"string" == typeof rep[n] && (r = rep[n], i = str(r, c), i && s.push(quote(r) + (gap ? ": " : ":") + i)); else for (r in c)Object.prototype.hasOwnProperty.call(c, r) && (i = str(r, c), i && s.push(quote(r) + (gap ? ": " : ":") + i));
                                    return i = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}", gap = a, i
                            }
                        }

                        if (nativeJSON && nativeJSON.parse)return exports.JSON = {
                            parse: nativeJSON.parse,
                            stringify: nativeJSON.stringify
                        };
                        var JSON = exports.JSON = {}, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
                            "\b": "\\b",
                            "	": "\\t",
                            "\n": "\\n",
                            "\f": "\\f",
                            "\r": "\\r",
                            '"': '\\"',
                            "\\": "\\\\"
                        }, rep;
                        JSON.stringify = function (e, t, n) {
                            var r;
                            if (gap = "", indent = "", "number" == typeof n)for (r = 0; n > r; r += 1)indent += " "; else"string" == typeof n && (indent = n);
                            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))throw new Error("JSON.stringify");
                            return str("", {"": e})
                        }, JSON.parse = function (text, reviver) {
                            function walk(e, t) {
                                var n, r, i = e[t];
                                if (i && "object" == typeof i)for (n in i)Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), void 0 !== r ? i[n] = r : delete i[n]);
                                return reviver.call(e, t, i)
                            }

                            var j;
                            if (text = String(text),
                                    cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
                            throw new SyntaxError("JSON.parse")
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), function (e, t) {
                        var n = e.parser = {}, r = n.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"], i = n.reasons = ["transport not supported", "client not handshaken", "unauthorized"], o = n.advice = ["reconnect"], s = t.JSON, a = t.util.indexOf;
                        n.encodePacket = function (e) {
                            var t = a(r, e.type), n = e.id || "", c = e.endpoint || "", u = e.ack, l = null;
                            switch (e.type) {
                                case"error":
                                    var f = e.reason ? a(i, e.reason) : "", d = e.advice ? a(o, e.advice) : "";
                                    ("" !== f || "" !== d) && (l = f + ("" !== d ? "+" + d : ""));
                                    break;
                                case"message":
                                    "" !== e.data && (l = e.data);
                                    break;
                                case"event":
                                    var p = {name: e.name};
                                    e.args && e.args.length && (p.args = e.args), l = s.stringify(p);
                                    break;
                                case"json":
                                    l = s.stringify(e.data);
                                    break;
                                case"connect":
                                    e.qs && (l = e.qs);
                                    break;
                                case"ack":
                                    l = e.ackId + (e.args && e.args.length ? "+" + s.stringify(e.args) : "")
                            }
                            var m = [t, n + ("data" == u ? "+" : ""), c];
                            return null !== l && void 0 !== l && m.push(l), m.join(":")
                        }, n.encodePayload = function (e) {
                            var t = "";
                            if (1 == e.length)return e[0];
                            for (var n = 0, r = e.length; r > n; n++) {
                                var i = e[n];
                                t += "�" + i.length + "�" + e[n]
                            }
                            return t
                        };
                        var c = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
                        n.decodePacket = function (e) {
                            var t = e.match(c);
                            if (!t)return {};
                            var n = t[2] || "", e = t[5] || "", a = {type: r[t[1]], endpoint: t[4] || ""};
                            switch (n && (a.id = n, t[3] ? a.ack = "data" : a.ack = !0), a.type) {
                                case"error":
                                    var t = e.split("+");
                                    a.reason = i[t[0]] || "", a.advice = o[t[1]] || "";
                                    break;
                                case"message":
                                    a.data = e || "";
                                    break;
                                case"event":
                                    try {
                                        var u = s.parse(e);
                                        a.name = u.name, a.args = u.args
                                    } catch (l) {
                                    }
                                    a.args = a.args || [];
                                    break;
                                case"json":
                                    try {
                                        a.data = s.parse(e)
                                    } catch (l) {
                                    }
                                    break;
                                case"connect":
                                    a.qs = e || "";
                                    break;
                                case"ack":
                                    var t = e.match(/^([0-9]+)(\+)?(.*)/);
                                    if (t && (a.ackId = t[1], a.args = [], t[3]))try {
                                        a.args = t[3] ? s.parse(t[3]) : []
                                    } catch (l) {
                                    }
                                    break;
                                case"disconnect":
                                case"heartbeat":
                            }
                            return a
                        }, n.decodePayload = function (e) {
                            var t = function (e, t) {
                                for (var n = 0, r = e; r < t.length; r++) {
                                    if ("�" == t.charAt(r))return n;
                                    n++
                                }
                                return n
                            };
                            if ("�" == e.charAt(0)) {
                                for (var r = [], i = 1, o = ""; i < e.length; i++)if ("�" == e.charAt(i)) {
                                    var s = e.substr(i + 1).substr(0, o);
                                    if ("�" != e.charAt(i + 1 + Number(o)) && i + 1 + Number(o) != e.length) {
                                        var a = Number(o);
                                        l = t(i + a + 1, e), s = e.substr(i + 1).substr(0, a + l), i += l
                                    }
                                    r.push(n.decodePacket(s)), i += Number(o) + 1, o = ""
                                } else o += e.charAt(i);
                                return r
                            }
                            return [n.decodePacket(e)]
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t) {
                        function n(e, t) {
                            this.socket = e, this.sessid = t
                        }

                        e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.heartbeats = function () {
                            return !0
                        }, n.prototype.onData = function (e) {
                            if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== e) {
                                var n = t.parser.decodePayload(e);
                                if (n && n.length)for (var r = 0, i = n.length; i > r; r++)this.onPacket(n[r])
                            }
                            return this
                        }, n.prototype.onPacket = function (e) {
                            return this.socket.setHeartbeatTimeout(), "heartbeat" == e.type ? this.onHeartbeat() : ("connect" == e.type && "" == e.endpoint && this.onConnect(), "error" == e.type && "reconnect" == e.advice && (this.isOpen = !1), this.socket.onPacket(e), this)
                        }, n.prototype.setCloseTimeout = function () {
                            if (!this.closeTimeout) {
                                var e = this;
                                this.closeTimeout = setTimeout(function () {
                                    e.onDisconnect()
                                }, this.socket.closeTimeout)
                            }
                        }, n.prototype.onDisconnect = function () {
                            return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
                        }, n.prototype.onConnect = function () {
                            return this.socket.onConnect(), this
                        }, n.prototype.clearCloseTimeout = function () {
                            this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
                        }, n.prototype.clearTimeouts = function () {
                            this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
                        }, n.prototype.packet = function (e) {
                            this.send(t.parser.encodePacket(e))
                        }, n.prototype.onHeartbeat = function (e) {
                            this.packet({type: "heartbeat"})
                        }, n.prototype.onOpen = function () {
                            this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen()
                        }, n.prototype.onClose = function () {
                            this.isOpen = !1, this.socket.onClose(), this.onDisconnect()
                        }, n.prototype.prepareUrl = function () {
                            var e = this.socket.options;
                            return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid
                        }, n.prototype.ready = function (e, t) {
                            t.call(this)
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t, n) {
                        function r(e) {
                            if (this.options = {
                                    port: 80,
                                    secure: !1,
                                    document: "document" in n ? document : !1,
                                    resource: "socket.io",
                                    transports: t.transports,
                                    "connect timeout": 1e4,
                                    "try multiple transports": !0,
                                    reconnect: !0,
                                    "reconnection delay": 500,
                                    "reconnection limit": 1 / 0,
                                    "reopen delay": 3e3,
                                    "max reconnection attempts": 10,
                                    "sync disconnect on unload": !1,
                                    "auto connect": !0,
                                    "flash policy port": 10843,
                                    manualFlush: !1
                                }, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
                                var r = this;
                                t.util.on(n, "beforeunload", function () {
                                    r.disconnectSync()
                                }, !1)
                            }
                            this.options["auto connect"] && this.connect()
                        }

                        function i() {
                        }

                        e.Socket = r, t.util.mixin(r, t.EventEmitter), r.prototype.of = function (e) {
                            return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), "" !== e && this.namespaces[e].packet({type: "connect"})), this.namespaces[e]
                        }, r.prototype.publish = function () {
                            this.emit.apply(this, arguments);
                            var e;
                            for (var t in this.namespaces)this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments))
                        }, r.prototype.handshake = function (e) {
                            function n(t) {
                                t instanceof Error ? (r.connecting = !1, r.onError(t.message)) : e.apply(null, t.split(":"))
                            }

                            var r = this, o = this.options, s = ["http" + (o.secure ? "s" : "") + ":/", o.host + ":" + o.port, o.resource, t.protocol, t.util.query(this.options.query, "t=" + +new Date)].join("/");
                            if (this.isXDomain() && !t.util.ua.hasCORS) {
                                var a = document.getElementsByTagName("script")[0], c = document.createElement("script");
                                c.src = s + "&jsonp=" + t.j.length, c.onreadystatechange = function () {
                                    "loaded" == this.readyState && c.parentNode && (c.parentNode.removeChild(c), r.connecting = !1, !r.reconnecting && r.onError("Server down or port not open"))
                                }, a.parentNode.insertBefore(c, a), t.j.push(function (e) {
                                    n(e), c.parentNode.removeChild(c)
                                })
                            } else {
                                var u = t.util.request();
                                u.open("GET", s, !0), this.isXDomain() && (u.withCredentials = !0), u.onreadystatechange = function () {
                                    4 == u.readyState && (u.onreadystatechange = i, 200 == u.status ? n(u.responseText) : 403 == u.status ? (r.onError(u.responseText), r.publish("disconnect")) : (r.connecting = !1, !r.reconnecting && r.onError(u.responseText), r.publish("disconnect")))
                                }, u.send(null)
                            }
                        }, r.prototype.getTransport = function (e) {
                            for (var n, r = e || this.transports, i = 0; n = r[i]; i++)if (t.Transport[n] && t.Transport[n].check(this) && (!this.isXDomain() || t.Transport[n].xdomainCheck(this))) {
                                var o = new t.Transport[n](this, this.sessionid);
                                return o
                            }
                            return null
                        }, r.prototype.connect = function (e) {
                            if (this.connecting)return this;
                            var n = this;
                            return n.connecting = !0, this.handshake(function (r, i, o, s) {
                                function a(e) {
                                    return n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(e), n.transport ? void n.transport.ready(n, function () {
                                        n.connecting = !0, n.publish("connecting", n.transport.name), n.transport.open(), n.options["connect timeout"] && (n.connectTimeoutTimer = setTimeout(function () {
                                            if (!n.connected && (n.connecting = !1, n.options["try multiple transports"])) {
                                                for (var e = n.transports; e.length > 0 && e.splice(0, 1)[0] != n.transport.name;);
                                                e.length ? a(e) : n.publish("connect_failed")
                                            }
                                        }, n.options["connect timeout"]))
                                    }) : n.publish("connect_failed")
                                }

                                n.sessionid = r, n.closeTimeout = 1e3 * o, n.heartbeatTimeout = 1e3 * i, n.transports || (n.transports = n.origTransports = s ? t.util.intersect(s.split(","), n.options.transports) : n.options.transports), n.setHeartbeatTimeout(), a(n.transports), n.once("connect", function () {
                                    clearTimeout(n.connectTimeoutTimer), e && "function" == typeof e && e()
                                })
                            }), this
                        }, r.prototype.setHeartbeatTimeout = function () {
                            if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
                                var e = this;
                                this.heartbeatTimeoutTimer = setTimeout(function () {
                                    e.transport.onClose()
                                }, this.heartbeatTimeout)
                            }
                        }, r.prototype.packet = function (e) {
                            return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this
                        }, r.prototype.setBuffer = function (e) {
                            this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
                        }, r.prototype.flushBuffer = function () {
                            this.transport.payload(this.buffer), this.buffer = []
                        }, r.prototype.disconnect = function () {
                            return (this.connected || this.connecting) && (this.open && this.of("").packet({type: "disconnect"}), this.onDisconnect("booted")), this
                        }, r.prototype.disconnectSync = function () {
                            var e = t.util.request(), n = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, t.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
                            e.open("GET", n, !1), e.send(null), this.onDisconnect("booted")
                        }, r.prototype.isXDomain = function () {
                            var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
                            return this.options.host !== n.location.hostname || this.options.port != e
                        }, r.prototype.onConnect = function () {
                            this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
                        }, r.prototype.onOpen = function () {
                            this.open = !0
                        }, r.prototype.onClose = function () {
                            this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
                        }, r.prototype.onPacket = function (e) {
                            this.of(e.endpoint).onPacket(e)
                        }, r.prototype.onError = function (e) {
                            e && e.advice && "reconnect" === e.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason : e)
                        }, r.prototype.onDisconnect = function (e) {
                            var t = this.connected, n = this.connecting;
                            this.connected = !1, this.connecting = !1, this.open = !1, (t || n) && (this.transport.close(), this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect()))
                        }, r.prototype.reconnect = function () {
                            function e() {
                                if (n.connected) {
                                    for (var e in n.namespaces)n.namespaces.hasOwnProperty(e) && "" !== e && n.namespaces[e].packet({type: "connect"});
                                    n.publish("reconnect", n.transport.name, n.reconnectionAttempts)
                                }
                                clearTimeout(n.reconnectionTimer), n.removeListener("connect_failed", t), n.removeListener("connect", t), n.reconnecting = !1, delete n.reconnectionAttempts, delete n.reconnectionDelay, delete n.reconnectionTimer, delete n.redoTransports, n.options["try multiple transports"] = i
                            }

                            function t() {
                                return n.reconnecting ? n.connected ? e() : n.connecting && n.reconnecting ? n.reconnectionTimer = setTimeout(t, 1e3) : void(n.reconnectionAttempts++ >= r ? n.redoTransports ? (n.publish("reconnect_failed"), e()) : (n.on("connect_failed", t), n.options["try multiple transports"] = !0, n.transports = n.origTransports, n.transport = n.getTransport(), n.redoTransports = !0, n.connect()) : (n.reconnectionDelay < o && (n.reconnectionDelay *= 2), n.connect(), n.publish("reconnecting", n.reconnectionDelay, n.reconnectionAttempts), n.reconnectionTimer = setTimeout(t, n.reconnectionDelay))) : void 0
                            }

                            this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
                            var n = this, r = this.options["max reconnection attempts"], i = this.options["try multiple transports"], o = this.options["reconnection limit"];
                            this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(t, this.reconnectionDelay), this.on("connect", t)
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (e, t) {
                        function n(e, t) {
                            this.socket = e, this.name = t || "", this.flags = {}, this.json = new r(this, "json"), this.ackPackets = 0, this.acks = {}
                        }

                        function r(e, t) {
                            this.namespace = e, this.name = t
                        }

                        e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function () {
                            return this.socket.of.apply(this.socket, arguments)
                        }, n.prototype.packet = function (e) {
                            return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this
                        }, n.prototype.send = function (e, t) {
                            var n = {type: this.flags.json ? "json" : "message", data: e};
                            return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n)
                        }, n.prototype.emit = function (e) {
                            var t = Array.prototype.slice.call(arguments, 1), n = t[t.length - 1], r = {
                                type: "event",
                                name: e
                            };
                            return "function" == typeof n && (r.id = ++this.ackPackets, r.ack = "data", this.acks[r.id] = n, t = t.slice(0, t.length - 1)), r.args = t, this.packet(r)
                        }, n.prototype.disconnect = function () {
                            return "" === this.name ? this.socket.disconnect() : (this.packet({type: "disconnect"}), this.$emit("disconnect")), this
                        }, n.prototype.onPacket = function (e) {
                            function n() {
                                r.packet({type: "ack", args: t.util.toArray(arguments), ackId: e.id})
                            }

                            var r = this;
                            switch (e.type) {
                                case"connect":
                                    this.$emit("connect");
                                    break;
                                case"disconnect":
                                    "" === this.name ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
                                    break;
                                case"message":
                                case"json":
                                    var i = ["message", e.data];
                                    "data" == e.ack ? i.push(n) : e.ack && this.packet({
                                        type: "ack",
                                        ackId: e.id
                                    }), this.$emit.apply(this, i);
                                    break;
                                case"event":
                                    var i = [e.name].concat(e.args);
                                    "data" == e.ack && i.push(n), this.$emit.apply(this, i);
                                    break;
                                case"ack":
                                    this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
                                    break;
                                case"error":
                                    e.advice ? this.socket.onError(e) : "unauthorized" == e.reason ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason)
                            }
                        }, r.prototype.send = function () {
                            this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
                        }, r.prototype.emit = function () {
                            this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t, n) {
                        function r(e) {
                            t.Transport.apply(this, arguments)
                        }

                        e.websocket = r, t.util.inherit(r, t.Transport), r.prototype.name = "websocket", r.prototype.open = function () {
                            var e, r = t.util.query(this.socket.options.query), i = this;
                            return e || (e = n.MozWebSocket || n.WebSocket), this.websocket = new e(this.prepareUrl() + r), this.websocket.onopen = function () {
                                i.onOpen(), i.socket.setBuffer(!1)
                            }, this.websocket.onmessage = function (e) {
                                i.onData(e.data)
                            }, this.websocket.onclose = function () {
                                i.onClose(), i.socket.setBuffer(!0)
                            }, this.websocket.onerror = function (e) {
                                i.onError(e)
                            }, this
                        }, t.util.ua.iDevice ? r.prototype.send = function (e) {
                            var t = this;
                            return setTimeout(function () {
                                t.websocket.send(e)
                            }, 0), this
                        } : r.prototype.send = function (e) {
                            return this.websocket.send(e), this
                        }, r.prototype.payload = function (e) {
                            for (var t = 0, n = e.length; n > t; t++)this.packet(e[t]);
                            return this
                        }, r.prototype.close = function () {
                            return this.websocket.close(), this
                        }, r.prototype.onError = function (e) {
                            this.socket.onError(e)
                        }, r.prototype.scheme = function () {
                            return this.socket.options.secure ? "wss" : "ws"
                        }, r.check = function () {
                            return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n
                        }, r.xdomainCheck = function () {
                            return !0
                        }, t.transports.push("websocket")
                    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (e, t) {
                        function n() {
                            t.Transport.websocket.apply(this, arguments)
                        }

                        e.flashsocket = n, t.util.inherit(n, t.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function () {
                            var e = this, n = arguments;
                            return WebSocket.__addTask(function () {
                                t.Transport.websocket.prototype.open.apply(e, n)
                            }), this
                        }, n.prototype.send = function () {
                            var e = this, n = arguments;
                            return WebSocket.__addTask(function () {
                                t.Transport.websocket.prototype.send.apply(e, n)
                            }), this
                        }, n.prototype.close = function () {
                            return WebSocket.__tasks.length = 0, t.Transport.websocket.prototype.close.call(this), this
                        }, n.prototype.ready = function (e, r) {
                            function i() {
                                var t = e.options, i = t["flash policy port"], s = ["http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf"];
                                n.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = s.join("/")), 843 !== i && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + i), WebSocket.__initialize(), n.loaded = !0), r.call(o)
                            }

                            var o = this;
                            return document.body ? i() : void t.util.load(i)
                        }, n.check = function () {
                            return "undefined" != typeof WebSocket && "__initialize" in WebSocket && swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1
                        }, n.xdomainCheck = function () {
                            return !0
                        }, "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), t.transports.push("flashsocket")
                    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window)var swfobject = function () {
                    function e() {
                        if (!$) {
                            try {
                                var e = U.getElementsByTagName("body")[0].appendChild(h("span"));
                                e.parentNode.removeChild(e)
                            } catch (t) {
                                return
                            }
                            $ = !0;
                            for (var n = B.length, r = 0; n > r; r++)B[r]()
                        }
                    }

                    function t(e) {
                        $ ? e() : B[B.length] = e
                    }

                    function n(e) {
                        if (typeof R.addEventListener != x)R.addEventListener("load", e, !1); else if (typeof U.addEventListener != x)U.addEventListener("load", e, !1); else if (typeof R.attachEvent != x)g(R, "onload", e); else if ("function" == typeof R.onload) {
                            var t = R.onload;
                            R.onload = function () {
                                t(), e()
                            }
                        } else R.onload = e
                    }

                    function r() {
                        D ? i() : o()
                    }

                    function i() {
                        var e = U.getElementsByTagName("body")[0], t = h(C);
                        t.setAttribute("type", E);
                        var n = e.appendChild(t);
                        if (n) {
                            var r = 0;
                            !function () {
                                if (typeof n.GetVariable != x) {
                                    var i = n.GetVariable("$version");
                                    i && (i = i.split(" ")[1].split(","), V.pv = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)])
                                } else if (10 > r)return r++, void setTimeout(arguments.callee, 10);
                                e.removeChild(t), n = null, o()
                            }()
                        } else o()
                    }

                    function o() {
                        var e = L.length;
                        if (e > 0)for (var t = 0; e > t; t++) {
                            var n = L[t].id, r = L[t].callbackFn, i = {success: !1, id: n};
                            if (V.pv[0] > 0) {
                                var o = y(n);
                                if (o)if (!v(L[t].swfVersion) || V.wk && V.wk < 312)if (L[t].expressInstall && a()) {
                                    var l = {};
                                    l.data = L[t].expressInstall, l.width = o.getAttribute("width") || "0", l.height = o.getAttribute("height") || "0", o.getAttribute("class") && (l.styleclass = o.getAttribute("class")), o.getAttribute("align") && (l.align = o.getAttribute("align"));
                                    for (var f = {}, d = o.getElementsByTagName("param"), p = d.length, m = 0; p > m; m++)"movie" != d[m].getAttribute("name").toLowerCase() && (f[d[m].getAttribute("name")] = d[m].getAttribute("value"));
                                    c(l, f, n, r)
                                } else u(o), r && r(i); else T(n, !0), r && (i.success = !0, i.ref = s(n), r(i))
                            } else if (T(n, !0), r) {
                                var h = s(n);
                                h && typeof h.SetVariable != x && (i.success = !0, i.ref = h), r(i)
                            }
                        }
                    }

                    function s(e) {
                        var t = null, n = y(e);
                        if (n && "OBJECT" == n.nodeName)if (typeof n.SetVariable != x)t = n; else {
                            var r = n.getElementsByTagName(C)[0];
                            r && (t = r)
                        }
                        return t
                    }

                    function a() {
                        return !H && v("6.0.65") && (V.win || V.mac) && !(V.wk && V.wk < 312)
                    }

                    function c(e, t, n, r) {
                        H = !0, S = r || null, O = {success: !1, id: n};
                        var i = y(n);
                        if (i) {
                            "OBJECT" == i.nodeName ? (M = l(i), w = null) : (M = i, w = n), e.id = A, (typeof e.width == x || !/%$/.test(e.width) && parseInt(e.width, 10) < 310) && (e.width = "310"), (typeof e.height == x || !/%$/.test(e.height) && parseInt(e.height, 10) < 137) && (e.height = "137"), U.title = U.title.slice(0, 47) + " - Flash Player Installation";
                            var o = V.ie && V.win ? ["Active"].concat("").join("X") : "PlugIn", s = "MMredirectURL=" + R.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + o + "&MMdoctitle=" + U.title;
                            if (typeof t.flashvars != x ? t.flashvars += "&" + s : t.flashvars = s, V.ie && V.win && 4 != i.readyState) {
                                var a = h("div");
                                n += "SWFObjectNew", a.setAttribute("id", n), i.parentNode.insertBefore(a, i), i.style.display = "none", function () {
                                    4 == i.readyState ? i.parentNode.removeChild(i) : setTimeout(arguments.callee, 10)
                                }()
                            }
                            f(e, t, n)
                        }
                    }

                    function u(e) {
                        if (V.ie && V.win && 4 != e.readyState) {
                            var t = h("div");
                            e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(l(e), t), e.style.display = "none", function () {
                                4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                            }()
                        } else e.parentNode.replaceChild(l(e), e)
                    }

                    function l(e) {
                        var t = h("div");
                        if (V.win && V.ie)t.innerHTML = e.innerHTML; else {
                            var n = e.getElementsByTagName(C)[0];
                            if (n) {
                                var r = n.childNodes;
                                if (r)for (var i = r.length, o = 0; i > o; o++)1 == r[o].nodeType && "PARAM" == r[o].nodeName || 8 == r[o].nodeType || t.appendChild(r[o].cloneNode(!0))
                            }
                        }
                        return t
                    }

                    function f(e, t, n) {
                        var r, i = y(n);
                        if (V.wk && V.wk < 312)return r;
                        if (i)if (typeof e.id == x && (e.id = n), V.ie && V.win) {
                            var o = "";
                            for (var s in e)e[s] != Object.prototype[s] && ("data" == s.toLowerCase() ? t.movie = e[s] : "styleclass" == s.toLowerCase() ? o += ' class="' + e[s] + '"' : "classid" != s.toLowerCase() && (o += " " + s + '="' + e[s] + '"'));
                            var a = "";
                            for (var c in t)t[c] != Object.prototype[c] && (a += '<param name="' + c + '" value="' + t[c] + '" />');
                            i.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + o + ">" + a + "</object>", W[W.length] = e.id, r = y(e.id)
                        } else {
                            var u = h(C);
                            u.setAttribute("type", E);
                            for (var l in e)e[l] != Object.prototype[l] && ("styleclass" == l.toLowerCase() ? u.setAttribute("class", e[l]) : "classid" != l.toLowerCase() && u.setAttribute(l, e[l]));
                            for (var f in t)t[f] != Object.prototype[f] && "movie" != f.toLowerCase() && d(u, f, t[f]);
                            i.parentNode.replaceChild(u, i), r = u
                        }
                        return r
                    }

                    function d(e, t, n) {
                        var r = h("param");
                        r.setAttribute("name", t), r.setAttribute("value", n), e.appendChild(r)
                    }

                    function p(e) {
                        var t = y(e);
                        t && "OBJECT" == t.nodeName && (V.ie && V.win ? (t.style.display = "none", function () {
                            4 == t.readyState ? m(e) : setTimeout(arguments.callee, 10)
                        }()) : t.parentNode.removeChild(t))
                    }

                    function m(e) {
                        var t = y(e);
                        if (t) {
                            for (var n in t)"function" == typeof t[n] && (t[n] = null);
                            t.parentNode.removeChild(t)
                        }
                    }

                    function y(e) {
                        var t = null;
                        try {
                            t = U.getElementById(e)
                        } catch (n) {
                        }
                        return t
                    }

                    function h(e) {
                        return U.createElement(e)
                    }

                    function g(e, t, n) {
                        e.attachEvent(t, n), q[q.length] = [e, t, n]
                    }

                    function v(e) {
                        var t = V.pv, n = e.split(".");
                        return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1
                    }

                    function b(e, t, n, r) {
                        if (!V.ie || !V.mac) {
                            var i = U.getElementsByTagName("head")[0];
                            if (i) {
                                var o = n && "string" == typeof n ? n : "screen";
                                if (r && (I = null, P = null), !I || P != o) {
                                    var s = h("style");
                                    s.setAttribute("type", "text/css"), s.setAttribute("media", o), I = i.appendChild(s), V.ie && V.win && typeof U.styleSheets != x && U.styleSheets.length > 0 && (I = U.styleSheets[U.styleSheets.length - 1]), P = o
                                }
                                V.ie && V.win ? I && typeof I.addRule == C && I.addRule(e, t) : I && typeof U.createTextNode != x && I.appendChild(U.createTextNode(e + " {" + t + "}"))
                            }
                        }
                    }

                    function T(e, t) {
                        if (X) {
                            var n = t ? "visible" : "hidden";
                            $ && y(e) ? y(e).style.visibility = n : b("#" + e, "visibility:" + n)
                        }
                    }

                    function k(e) {
                        var t = /[\\\"<>\.;]/, n = null != t.exec(e);
                        return n && typeof encodeURIComponent != x ? encodeURIComponent(e) : e
                    }

                    var M, w, S, O, I, P, x = "undefined", C = "object", _ = "Shockwave Flash", j = "ShockwaveFlash.ShockwaveFlash", E = "application/x-shockwave-flash", A = "SWFObjectExprInst", F = "onreadystatechange", R = window, U = document, N = navigator, D = !1, B = [r], L = [], W = [], q = [], $ = !1, H = !1, X = !0, V = function () {
                        var e = typeof U.getElementById != x && typeof U.getElementsByTagName != x && typeof U.createElement != x, t = N.userAgent.toLowerCase(), n = N.platform.toLowerCase(), r = n ? /win/.test(n) : /win/.test(t), i = n ? /mac/.test(n) : /mac/.test(t), o = /webkit/.test(t) ? parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, s = !1, a = [0, 0, 0], c = null;
                        if (typeof N.plugins != x && typeof N.plugins[_] == C)c = N.plugins[_].description, !c || typeof N.mimeTypes != x && N.mimeTypes[E] && !N.mimeTypes[E].enabledPlugin || (D = !0, s = !1, c = c.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), a[0] = parseInt(c.replace(/^(.*)\..*$/, "$1"), 10), a[1] = parseInt(c.replace(/^.*\.(.*)\s.*$/, "$1"), 10), a[2] = /[a-zA-Z]/.test(c) ? parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof R[["Active"].concat("Object").join("X")] != x)try {
                            var u = new (window[["Active"].concat("Object").join("X")])(j);
                            u && (c = u.GetVariable("$version"), c && (s = !0, c = c.split(" ")[1].split(","), a = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]))
                        } catch (l) {
                        }
                        return {w3: e, pv: a, wk: o, ie: s, win: r, mac: i}
                    }();
                    (function () {
                        V.w3 && ((typeof U.readyState != x && "complete" == U.readyState || typeof U.readyState == x && (U.getElementsByTagName("body")[0] || U.body)) && e(), $ || (typeof U.addEventListener != x && U.addEventListener("DOMContentLoaded", e, !1), V.ie && V.win && (U.attachEvent(F, function () {
                            "complete" == U.readyState && (U.detachEvent(F, arguments.callee), e())
                        }), R == top && !function () {
                            if (!$) {
                                try {
                                    U.documentElement.doScroll("left")
                                } catch (t) {
                                    return void setTimeout(arguments.callee, 0)
                                }
                                e()
                            }
                        }()), V.wk && !function () {
                            return $ ? void 0 : /loaded|complete/.test(U.readyState) ? void e() : void setTimeout(arguments.callee, 0)
                        }(), n(e)))
                    })(), function () {
                        V.ie && V.win && window.attachEvent("onunload", function () {
                            for (var e = q.length, t = 0; e > t; t++)q[t][0].detachEvent(q[t][1], q[t][2]);
                            for (var n = W.length, r = 0; n > r; r++)p(W[r]);
                            for (var i in V)V[i] = null;
                            V = null;
                            for (var o in swfobject)swfobject[o] = null;
                            swfobject = null
                        })
                    }();
                    return {
                        registerObject: function (e, t, n, r) {
                            if (V.w3 && e && t) {
                                var i = {};
                                i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = r, L[L.length] = i, T(e, !1)
                            } else r && r({success: !1, id: e})
                        }, getObjectById: function (e) {
                            return V.w3 ? s(e) : void 0
                        }, embedSWF: function (e, n, r, i, o, s, u, l, d, p) {
                            var m = {success: !1, id: n};
                            V.w3 && !(V.wk && V.wk < 312) && e && n && r && i && o ? (T(n, !1), t(function () {
                                r += "", i += "";
                                var t = {};
                                if (d && typeof d === C)for (var y in d)t[y] = d[y];
                                t.data = e, t.width = r, t.height = i;
                                var h = {};
                                if (l && typeof l === C)for (var g in l)h[g] = l[g];
                                if (u && typeof u === C)for (var b in u)typeof h.flashvars != x ? h.flashvars += "&" + b + "=" + u[b] : h.flashvars = b + "=" + u[b];
                                if (v(o)) {
                                    var k = f(t, h, n);
                                    t.id == n && T(n, !0), m.success = !0, m.ref = k
                                } else {
                                    if (s && a())return t.data = s, void c(t, h, n, p);
                                    T(n, !0)
                                }
                                p && p(m)
                            })) : p && p(m)
                        }, switchOffAutoHideShow: function () {
                            X = !1
                        }, ua: V, getFlashPlayerVersion: function () {
                            return {major: V.pv[0], minor: V.pv[1], release: V.pv[2]}
                        }, hasFlashPlayerVersion: v, createSWF: function (e, t, n) {
                            return V.w3 ? f(e, t, n) : void 0
                        }, showExpressInstall: function (e, t, n, r) {
                            V.w3 && a() && c(e, t, n, r)
                        }, removeSWF: function (e) {
                            V.w3 && p(e)
                        }, createCSS: function (e, t, n, r) {
                            V.w3 && b(e, t, n, r)
                        }, addDomLoadEvent: t, addLoadEvent: n, getQueryParamValue: function (e) {
                            var t = U.location.search || U.location.hash;
                            if (t) {
                                if (/\?/.test(t) && (t = t.split("?")[1]), null == e)return k(t);
                                for (var n = t.split("&"), r = 0; r < n.length; r++)if (n[r].substring(0, n[r].indexOf("=")) == e)return k(n[r].substring(n[r].indexOf("=") + 1))
                            }
                            return ""
                        }, expressInstallCallback: function () {
                            if (H) {
                                var e = y(A);
                                e && M && (e.parentNode.replaceChild(M, e), w && (T(w, !0), V.ie && V.win && (M.style.display = "block")), S && S(O)), H = !1
                            }
                        }
                    }
                }();
                !function () {
                    if ("undefined" != typeof window && !window.WebSocket) {
                        var e = window.console;
                        if (e && e.log && e.error || (e = {
                                log: function () {
                                }, error: function () {
                                }
                            }), !swfobject.hasFlashPlayerVersion("10.0.0"))return void e.error("Flash Player >= 10.0.0 is required.");
                        "file:" == location.protocol && e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function (e, t, n, r, i) {
                            var o = this;
                            o.__id = WebSocket.__nextId++, WebSocket.__instances[o.__id] = o, o.readyState = WebSocket.CONNECTING, o.bufferedAmount = 0, o.__events = {}, t ? "string" == typeof t && (t = [t]) : t = [], setTimeout(function () {
                                WebSocket.__addTask(function () {
                                    WebSocket.__flash.create(o.__id, e, t, n || null, r || 0, i || null)
                                })
                            }, 0)
                        }, WebSocket.prototype.send = function (e) {
                            if (this.readyState == WebSocket.CONNECTING)throw"INVALID_STATE_ERR: Web Socket connection has not been established";
                            var t = WebSocket.__flash.send(this.__id, encodeURIComponent(e));
                            return 0 > t ? !0 : (this.bufferedAmount += t, !1)
                        }, WebSocket.prototype.close = function () {
                            this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
                        }, WebSocket.prototype.addEventListener = function (e, t, n) {
                            e in this.__events || (this.__events[e] = []), this.__events[e].push(t)
                        }, WebSocket.prototype.removeEventListener = function (e, t, n) {
                            if (e in this.__events)for (var r = this.__events[e], i = r.length - 1; i >= 0; --i)if (r[i] === t) {
                                r.splice(i, 1);
                                break
                            }
                        }, WebSocket.prototype.dispatchEvent = function (e) {
                            for (var t = this.__events[e.type] || [], n = 0; n < t.length; ++n)t[n](e);
                            var r = this["on" + e.type];
                            r && r(e)
                        }, WebSocket.prototype.__handleEvent = function (e) {
                            "readyState" in e && (this.readyState = e.readyState), "protocol" in e && (this.protocol = e.protocol);
                            var t;
                            if ("open" == e.type || "error" == e.type)t = this.__createSimpleEvent(e.type); else if ("close" == e.type)t = this.__createSimpleEvent("close"); else {
                                if ("message" != e.type)throw"unknown event type: " + e.type;
                                var n = decodeURIComponent(e.message);
                                t = this.__createMessageEvent("message", n)
                            }
                            this.dispatchEvent(t)
                        }, WebSocket.prototype.__createSimpleEvent = function (e) {
                            if (document.createEvent && window.Event) {
                                var t = document.createEvent("Event");
                                return t.initEvent(e, !1, !1), t
                            }
                            return {type: e, bubbles: !1, cancelable: !1}
                        }, WebSocket.prototype.__createMessageEvent = function (e, t) {
                            if (document.createEvent && window.MessageEvent && !window.opera) {
                                var n = document.createEvent("MessageEvent");
                                return n.initMessageEvent("message", !1, !1, t, null, null, window, null), n
                            }
                            return {type: e, data: t, bubbles: !1, cancelable: !1}
                        }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function (e) {
                            WebSocket.__addTask(function () {
                                WebSocket.__flash.loadManualPolicyFile(e)
                            })
                        }, WebSocket.__initialize = function () {
                            if (!WebSocket.__flash) {
                                if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), !window.WEB_SOCKET_SWF_LOCATION)return void e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
                                var t = document.createElement("div");
                                t.id = "webSocketContainer", t.style.position = "absolute", WebSocket.__isFlashLite() ? (t.style.left = "0px", t.style.top = "0px") : (t.style.left = "-100px", t.style.top = "-100px");
                                var n = document.createElement("div");
                                n.id = "webSocketFlash", t.appendChild(n), document.body.appendChild(t), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
                                    hasPriority: !0,
                                    swliveconnect: !0,
                                    allowScriptAccess: "always"
                                }, null, function (t) {
                                    t.success || e.error("[WebSocket] swfobject.embedSWF failed")
                                })
                            }
                        }, WebSocket.__onFlashInitialized = function () {
                            setTimeout(function () {
                                WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                                for (var e = 0; e < WebSocket.__tasks.length; ++e)WebSocket.__tasks[e]();
                                WebSocket.__tasks = []
                            }, 0)
                        }, WebSocket.__onFlashEvent = function () {
                            return setTimeout(function () {
                                try {
                                    for (var t = WebSocket.__flash.receiveEvents(), n = 0; n < t.length; ++n)WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n])
                                } catch (r) {
                                    e.error(r)
                                }
                            }, 0), !0
                        }, WebSocket.__log = function (t) {
                            e.log(decodeURIComponent(t))
                        }, WebSocket.__error = function (t) {
                            e.error(decodeURIComponent(t))
                        }, WebSocket.__addTask = function (e) {
                            WebSocket.__flash ? e() : WebSocket.__tasks.push(e)
                        }, WebSocket.__isFlashLite = function () {
                            if (!window.navigator || !window.navigator.mimeTypes)return !1;
                            var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
                            return e && e.enabledPlugin && e.enabledPlugin.filename && e.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
                        }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function () {
                            WebSocket.__initialize()
                        }, !1) : window.attachEvent("onload", function () {
                            WebSocket.__initialize()
                        }))
                    }
                }(), function (e, t, n) {
                    function r(e) {
                        e && (t.Transport.apply(this, arguments), this.sendBuffer = [])
                    }

                    function i() {
                    }

                    e.XHR = r, t.util.inherit(r, t.Transport), r.prototype.open = function () {
                        return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
                    }, r.prototype.payload = function (e) {
                        for (var n = [], r = 0, i = e.length; i > r; r++)n.push(t.parser.encodePacket(e[r]));
                        this.send(t.parser.encodePayload(n))
                    }, r.prototype.send = function (e) {
                        return this.post(e), this
                    }, r.prototype.post = function (e) {
                        function t() {
                            4 == this.readyState && (this.onreadystatechange = i, o.posting = !1, 200 == this.status ? o.socket.setBuffer(!1) : o.onClose())
                        }

                        function r() {
                            this.onload = i, o.socket.setBuffer(!1)
                        }

                        var o = this;
                        this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = r : this.sendXHR.onreadystatechange = t, this.sendXHR.send(e)
                    }, r.prototype.close = function () {
                        return this.onClose(), this
                    }, r.prototype.request = function (e) {
                        var n = t.util.request(this.socket.isXDomain()), r = t.util.query(this.socket.options.query, "t=" + +new Date);
                        if (n.open(e || "GET", this.prepareUrl() + r, !0), "POST" == e)try {
                            n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain"
                        } catch (i) {
                        }
                        return n
                    }, r.prototype.scheme = function () {
                        return this.socket.options.secure ? "https" : "http";
                    }, r.check = function (e, r) {
                        try {
                            var i = t.util.request(r), o = n.XDomainRequest && i instanceof XDomainRequest, s = e && e.options && e.options.secure ? "https:" : "http:", a = n.location && s != n.location.protocol;
                            if (i && (!o || !a))return !0
                        } catch (c) {
                        }
                        return !1
                    }, r.xdomainCheck = function (e) {
                        return r.check(e, !0)
                    }
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (e, t) {
                    function n(e) {
                        t.Transport.XHR.apply(this, arguments)
                    }

                    e.htmlfile = n, t.util.inherit(n, t.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function () {
                        this.doc = new (window[["Active"].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
                        var e = this.doc.createElement("div");
                        e.className = "socketio", this.doc.body.appendChild(e), this.iframe = this.doc.createElement("iframe"), e.appendChild(this.iframe);
                        var n = this, r = t.util.query(this.socket.options.query, "t=" + +new Date);
                        this.iframe.src = this.prepareUrl() + r, t.util.on(window, "unload", function () {
                            n.destroy()
                        })
                    }, n.prototype._ = function (e, t) {
                        this.onData(e);
                        try {
                            var n = t.getElementsByTagName("script")[0];
                            n.parentNode.removeChild(n)
                        } catch (r) {
                        }
                    }, n.prototype.destroy = function () {
                        if (this.iframe) {
                            try {
                                this.iframe.src = "about:blank"
                            } catch (e) {
                            }
                            this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
                        }
                    }, n.prototype.close = function () {
                        return this.destroy(), t.Transport.XHR.prototype.close.call(this)
                    }, n.check = function (e) {
                        if ("undefined" != typeof window && ["Active"].concat("Object").join("X") in window)try {
                            var n = new (window[["Active"].concat("Object").join("X")])("htmlfile");
                            return n && t.Transport.XHR.check(e)
                        } catch (r) {
                        }
                        return !1
                    }, n.xdomainCheck = function () {
                        return !1
                    }, t.transports.push("htmlfile")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t, n) {
                    function r() {
                        t.Transport.XHR.apply(this, arguments)
                    }

                    function i() {
                    }

                    e["xhr-polling"] = r, t.util.inherit(r, t.Transport.XHR), t.util.merge(r, t.Transport.XHR), r.prototype.name = "xhr-polling", r.prototype.heartbeats = function () {
                        return !1
                    }, r.prototype.open = function () {
                        var e = this;
                        return t.Transport.XHR.prototype.open.call(e), !1
                    }, r.prototype.get = function () {
                        function e() {
                            4 == this.readyState && (this.onreadystatechange = i, 200 == this.status ? (o.onData(this.responseText), o.get()) : o.onClose())
                        }

                        function t() {
                            this.onload = i, this.onerror = i, o.retryCounter = 1, o.onData(this.responseText), o.get()
                        }

                        function r() {
                            o.retryCounter++, !o.retryCounter || o.retryCounter > 3 ? o.onClose() : o.get()
                        }

                        if (this.isOpen) {
                            var o = this;
                            this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = t, this.xhr.onerror = r) : this.xhr.onreadystatechange = e, this.xhr.send(null)
                        }
                    }, r.prototype.onClose = function () {
                        if (t.Transport.XHR.prototype.onClose.call(this), this.xhr) {
                            this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = i;
                            try {
                                this.xhr.abort()
                            } catch (e) {
                            }
                            this.xhr = null
                        }
                    }, r.prototype.ready = function (e, n) {
                        var r = this;
                        t.util.defer(function () {
                            n.call(r)
                        })
                    }, t.transports.push("xhr-polling")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (e, t, n) {
                    function r(e) {
                        t.Transport["xhr-polling"].apply(this, arguments), this.index = t.j.length;
                        var n = this;
                        t.j.push(function (e) {
                            n._(e)
                        })
                    }

                    var i = n.document && "MozAppearance" in n.document.documentElement.style;
                    e["jsonp-polling"] = r, t.util.inherit(r, t.Transport["xhr-polling"]), r.prototype.name = "jsonp-polling", r.prototype.post = function (e) {
                        function n() {
                            r(), i.socket.setBuffer(!1)
                        }

                        function r() {
                            i.iframe && i.form.removeChild(i.iframe);
                            try {
                                s = document.createElement('<iframe name="' + i.iframeId + '">')
                            } catch (e) {
                                s = document.createElement("iframe"), s.name = i.iframeId
                            }
                            s.id = i.iframeId, i.form.appendChild(s), i.iframe = s
                        }

                        var i = this, o = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
                        if (!this.form) {
                            var s, a = document.createElement("form"), c = document.createElement("textarea"), u = this.iframeId = "socketio_iframe_" + this.index;
                            a.className = "socketio", a.style.position = "absolute", a.style.top = "0px", a.style.left = "0px", a.style.display = "none", a.target = u, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), c.name = "d", a.appendChild(c), document.body.appendChild(a), this.form = a, this.area = c
                        }
                        this.form.action = this.prepareUrl() + o, r(), this.area.value = t.JSON.stringify(e);
                        try {
                            this.form.submit()
                        } catch (l) {
                        }
                        this.iframe.attachEvent ? s.onreadystatechange = function () {
                            "complete" == i.iframe.readyState && n()
                        } : this.iframe.onload = n, this.socket.setBuffer(!0)
                    }, r.prototype.get = function () {
                        var e = this, n = document.createElement("script"), r = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + r, n.onerror = function () {
                            e.onClose()
                        };
                        var o = document.getElementsByTagName("script")[0];
                        o.parentNode.insertBefore(n, o), this.script = n, i && setTimeout(function () {
                            var e = document.createElement("iframe");
                            document.body.appendChild(e), document.body.removeChild(e)
                        }, 100)
                    }, r.prototype._ = function (e) {
                        return this.onData(e), this.isOpen && this.get(), this
                    }, r.prototype.ready = function (e, n) {
                        var r = this;
                        return i ? void t.util.load(function () {
                            n.call(r)
                        }) : n.call(this)
                    }, r.check = function () {
                        return "document" in n
                    }, r.xdomainCheck = function () {
                        return !0
                    }, t.transports.push("jsonp-polling")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), __WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return window.io = io, io
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
            }()
        }).call(exports, __webpack_require__(5)(module))
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn;
        r.processLink = function (e) {
            switch (e.cmd) {
                case"heartbeat":
            }
        }, r.stopHeartbeat = function () {
            var e = this;
            e.heartbeatTimer && (window.clearInterval(e.heartbeatTimer), e.heartbeatTimer = null)
        }, r.startHeartbeat = function () {
            var e = this;
            e.stopHeartbeat(), e.heartbeatTimer = window.setInterval(function () {
                e.sendCmd("heartbeat", null, e.onHeartbeat.bind(e))
            }, 18e4)
        }, r.onHeartbeat = function (e, t) {
            this.onMiscError(e, t, "heartbeat error")
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn, i = n(12), o = n(35), s = n(19), a = n(11), c = a.notundef, u = n(31), l = n(21), f = n(36), d = n(20);
        r.login = function () {
            var e = this;
            e.sendCmd("login", {
                login: {
                    os: d.os.toString(),
                    sdkVersion: l.sdkVersion,
                    protocolVersion: l.protocolVersion,
                    deviceId: u.deviceId,
                    appKey: u.appKey,
                    account: u.account,
                    browser: d.name + " " + d.version,
                    token: e.options.token
                }
            }, e.onLogin.bind(e))
        }, r.onLogin = function (e, t) {
            var n = this;
            e ? n.onAuthError(e) : (s.info("onConnect"), s.log("version " + l.version + "; sdkVersion " + l.sdkVersion + "; protocolVersion " + l.protocolVersion), n.options.onconnect(t), f.support ? f.init().then(function () {
                n.syncData()
            }, function (e) {
                s.warn("no db", e), n.syncData()
            }) : (s.warn("no db"), n.syncData()), n.startHeartbeat())
        }, r.logout = function () {
            var e = this;
            e.isConnected() && (setTimeout(function () {
                e.socket.disconnect()
            }, 0), e.onAuthError())
        }, r.onKicked = function (e) {
            switch (c(e.from) && (e.from = o.reverseType(e.from)), e.reason) {
                case 1:
                    e.reason = "samePlatformKick", e.message = "Web SDK不允许一个帐号在多个地方同时登录";
                    break;
                case 2:
                    e.reason = "serverKick", e.message = "被服务器踢了";
                    break;
                case 3:
                    e.reason = "otherPlatformKick", e.message = "被其它端踢了";
                    break;
                default:
                    e.reason = "unknown", e.message = "未知原因"
            }
            var t = new i("被踢了", "kicked");
            a.merge(t, e), this.onAuthError(t)
        }, r.processAuth = function (e) {
            var t = this;
            switch (e.cmd) {
                case"login":
                    e.error || (e.obj = e.content.loginRes, t.onLoginPortsChange(e.content.loginPorts, 2));
                    break;
                case"kicked":
                    return void t.onKicked(e.content);
                case"multiPortLogin":
                    t.onLoginPortsChange(e.content.loginPorts, e.content.state);
                    break;
                case"kick":
                    e.error || (e.obj.deviceIds = e.content.deviceIds)
            }
        }, r.onLoginPortsChange = function (e, t) {
            if (e && e.length) {
                var n = !0;
                switch (t) {
                    case 2:
                        n = !0;
                        break;
                    case 3:
                        n = !1
                }
                e.forEach(function (e) {
                    e.type = o.reverseType(e.type), e.time = +e.time, e.online = n
                }), s.info("on login ports", e), this.options.onloginportschange(e)
            }
        }
    }, function (e, t) {
        "use strict";
        function n() {
        }

        var r = {1: "Android", 2: "iOS", 4: "PC", 8: "WindowsPhone", 16: "Web", 32: "Server"};
        n.reverse = function (e) {
            var t = e;
            return t.type = r[t.type], t
        }, n.reverseType = function (e) {
            return r[e] || e
        }, e.exports = n
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            b = e, g.support = e, f.set("db", e, d)
        }

        var i, o, s = n(14), a = n(19), c = n(11), u = n(31), l = n(20), f = n(37), d = n(38), p = n(12), m = p.newSupportDBError, y = p.noDBError, h = n(39), g = {}, v = "nim-", b = !1;
        if (r(!!window.indexedDB), "Safari" === l.name) {
            var T = parseInt(l.version.split(".")[0], 10);
            9 > T && r(!1)
        }
        g.reset = c.emptyFunc, b && (g.reset = function (e) {
            r(e !== !1)
        }), g.init = function () {
            return b ? i ? Promise.resolve() : (o = v + u.account, d.open({
                server: o,
                version: h.version,
                schema: h.schema
            }).then(function (e) {
                a.warn("init db", o), i = e
            }, function (e) {
                throw r(!1), i = null, o = null, e
            })) : Promise.reject(m())
        }, g.destroy = function () {
            return b ? i ? d.remove(o).then(function () {
                a.warn("delete db", o), i = null, o = null
            }) : Promise.resolve() : Promise.reject(m())
        }, g.clear = function () {
            return b ? i ? i.clear("timetag").then(function () {
                var e = [].slice.call(i.getIndexedDB().objectStoreNames), t = [];
                return e.forEach(function (e) {
                    t.push(i.clear(e))
                }), t.length ? Promise.all(t).then(function () {
                    a.warn("clear db", o)
                }) : void 0
            }) : Promise.resolve() : Promise.reject(m())
        }, g.close = function () {
            i && (i.close(), i = null, o = null)
        }, g.remove = function (e, t) {
            return b ? i ? (c.isArray(t) || (t = [t]), i.remove(e, t).then(function () {
                a.warn("delete", e, 1 === t.length ? t[0] : t)
            })) : Promise.reject(y()) : Promise.reject(m())
        }, g.put = function (e, t) {
            return b ? i ? (c.isArray(t) || (t = [t]), i.update(e, t).then(function (t) {
                var n = ["put", e], r = h.schema[e].key.keyPath, i = [];
                return r && (t.forEach(function (e) {
                    i.push(s(e, r))
                }), n.push(1 === i.length ? i[0] : i)), n.push(1 === t.length ? t[0] : t), a.warn.apply(a.warn, n), t
            })) : Promise.reject(y()) : Promise.reject(m())
        }, g.updateAndDelete = function (e, t, n) {
            return b ? i ? i.updateAndDelete(e, t, n) : Promise.reject(y()) : Promise.reject(m())
        }, g.get = function (e, t) {
            return b ? i ? i.get(e, t) : Promise.reject(y()) : Promise.reject(m())
        }, g.getAll = function (e, t) {
            return b ? i ? (t = t || {}, t.keys = t.keys === !0, t.desc = t.desc === !0, t.distinct = t.distinct === !0, i.query(e, t.index).filter(t.filter).keys(t.keys).desc(t.desc).limit(t.limit).distinct(t.distinct).map(t.mapper).modify(t.modifyObj).execute()) : Promise.reject(y()) : Promise.reject(m())
        }, g.getOnly = function (e, t, n, r) {
            if (!b)throw m();
            if (!i)throw y();
            return r = r || {}, r.keys = r.keys === !0, r.desc = r.desc === !0, r.distinct = r.distinct === !0, r.remove = r.remove === !0, i.query(e, t).only(n).filter(r.filter).keys(r.keys).desc(r.desc).limit(r.limit).distinct(r.distinct).map(r.mapper).modify(r.modifyObj).remove(r.remove).execute()
        }, g.getOne = function () {
            return g.getOnly.apply(g, arguments).then(function (e) {
                return e[0]
            })
        }, g.clearTable = function (e) {
            if (!b)throw m();
            if (!i)throw y();
            return i.clear(e)
        }, g.getAccount = function () {
            return o.replace(v, "")
        }, g.lib = d, e.exports = g, n(40), n(41), n(42), n(43), n(45), n(46), n(47), n(48)
    }, function (e, t) {
        "use strict";
        var n = {};
        n.set = function (e, t, r) {
            n[e] = t, r.support = t
        }, e.exports = n
    }, function (e, t, n) {
        var r;
        !function (i, o) {
            "use strict";
            var s, a = i.IDBKeyRange || i.webkitIDBKeyRange, c = {
                readonly: "readonly",
                readwrite: "readwrite"
            }, u = Object.prototype.hasOwnProperty, l = function () {
                if (!s && (s = i.indexedDB || i.webkitIndexedDB || i.mozIndexedDB || i.oIndexedDB || i.msIndexedDB || (null === i.indexedDB && i.shimIndexedDB ? i.shimIndexedDB : o), !s))throw"IndexedDB required";
                return s
            }, f = function (e) {
                return e
            }, d = function (e) {
                return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
            }, p = function (e) {
                return "function" == typeof e
            }, m = function (e) {
                return "number" === d(e)
            }, y = function (e) {
                return "array" === d(e)
            }, h = function (e) {
                return e === o
            }, g = function (e, t) {
                var n = this, r = !1;
                this.name = t, this.getIndexedDB = function () {
                    return e
                }, this.add = function (t) {
                    if (r)throw"Database has been closed";
                    for (var i = [], o = 0, s = 0; s < arguments.length - 1; s++)if (Array.isArray(arguments[s + 1]))for (var a = 0; a < arguments[s + 1].length; a++)i[o] = arguments[s + 1][a], o++; else i[o] = arguments[s + 1], o++;
                    var u = e.transaction(t, c.readwrite), l = u.objectStore(t);
                    return new Promise(function (e, t) {
                        i.forEach(function (e) {
                            var t;
                            if (e.item && e.key) {
                                var n = e.key;
                                e = e.item, t = l.add(e, n)
                            } else t = l.add(e);
                            t.onsuccess = function (t) {
                                var n = t.target, r = n.source.keyPath;
                                null === r && (r = "__id__"), Object.defineProperty(e, r, {
                                    value: n.result,
                                    enumerable: !0
                                })
                            }
                        }), u.oncomplete = function () {
                            e(i, n)
                        }, u.onerror = function (e) {
                            e.preventDefault(), t(e)
                        }, u.onabort = function (e) {
                            t(e)
                        }
                    })
                }, this.updateAndDelete = function (t, n, i) {
                    if (r)throw"Database has been closed";
                    var o = e.transaction(t, c.readwrite), s = o.objectStore(t), a = s.keyPath;
                    return new Promise(function (e, t) {
                        n.forEach(function (e) {
                            if (e.item && e.key) {
                                var t = e.key;
                                e = e.item, s.put(e, t)
                            } else s.put(e)
                        }), i.forEach(function (e) {
                            s["delete"](e[a])
                        }), o.oncomplete = function () {
                            e([n, i])
                        }, o.onerror = function (e) {
                            t(e)
                        }
                    })
                }, this.update = function (t) {
                    if (r)throw"Database has been closed";
                    for (var i, o = [], s = 1; s < arguments.length; s++)i = arguments[s], Array.isArray(i) ? o = o.concat(i) : o.push(i);
                    var a = e.transaction(t, c.readwrite), u = a.objectStore(t);
                    u.keyPath;
                    return new Promise(function (e, t) {
                        o.forEach(function (e) {
                            var t;
                            if (e.item && e.key) {
                                var n = e.key;
                                e = e.item, t = u.put(e, n)
                            } else t = u.put(e);
                            t.onsuccess = function (e) {
                            }, t.onerror = function (e) {
                            }
                        }), a.oncomplete = function () {
                            e(o, n)
                        }, a.onerror = function (e) {
                            t(e)
                        }, a.onabort = function (e) {
                            t(e)
                        }
                    })
                }, this.remove = function (t, n) {
                    if (r)throw"Database has been closed";
                    var i = e.transaction(t, c.readwrite), o = i.objectStore(t);
                    return new Promise(function (e, t) {
                        Array.isArray(n) || (n = [n]), n.forEach(function (e) {
                            o["delete"](e)
                        }), i.oncomplete = function () {
                            e(n)
                        }, i.onerror = function (e) {
                            t(e)
                        }, i.onabort = function (e) {
                            t(e)
                        }
                    })
                }, this.clear = function (t) {
                    if (r)throw"Database has been closed";
                    var n = e.transaction(t, c.readwrite), i = n.objectStore(t);
                    i.clear();
                    return new Promise(function (e, t) {
                        n.oncomplete = function () {
                            e()
                        }, n.onerror = function (e) {
                            t(e)
                        }
                    })
                }, this.close = function () {
                    r || (e.close(), r = !0, delete k[t])
                }, this.get = function (t, n) {
                    if (r)throw"Database has been closed";
                    var i = e.transaction(t), o = i.objectStore(t), s = o.get(n);
                    return new Promise(function (e, t) {
                        s.onsuccess = function (t) {
                            e(t.target.result)
                        }, i.onerror = function (e) {
                            t(e)
                        }
                    })
                }, this.query = function (t, n) {
                    if (r)throw"Database has been closed";
                    return new v(t, e, n)
                }, this.count = function (t, n) {
                    if (r)throw"Database has been closed";
                    var i = e.transaction(t);
                    i.objectStore(t)
                };
                for (var i = 0, o = e.objectStoreNames.length; o > i; i++)!function (e) {
                    n[e] = {};
                    for (var t in n)u.call(n, t) && "close" !== t && (n[e][t] = function (t) {
                        return function () {
                            var r = [e].concat([].slice.call(arguments, 0));
                            return n[t].apply(n, r)
                        }
                    }(t))
                }(e.objectStoreNames[i])
            }, v = function (e, t, n) {
                var r = this, i = !1, s = !1, u = function (r, u, l, f, d, m, y) {
                    return new Promise(function (h, g) {
                        var v = i || s ? c.readwrite : c.readonly, b = t.transaction(e, v), T = b.objectStore(e), k = n ? T.index(n) : T, M = r ? a[r].apply(null, u) : null, w = [], S = [M], O = 0;
                        d = d ? d : null, m = m ? m : [], "count" !== l && S.push(f || "next");
                        var I = i ? Object.keys(i) : !1, P = function (e) {
                            for (var t = 0; t < I.length; t++) {
                                var n = I[t], r = i[n];
                                r instanceof Function && (r = r(e)), e[n] = r
                            }
                            return e
                        };
                        k[l].apply(k, S).onsuccess = function (e) {
                            var t = e.target.result;
                            if ("number" == typeof t)w = t; else if (t)if (null !== d && d[0] > O)O = d[0], t.advance(d[0]); else if (null !== d && O >= d[0] + d[1]); else {
                                var n = !0, r = "value" in t ? t.value : t.key;
                                m.forEach(function (e) {
                                    e && e.length && (2 === e.length ? n = n && r[e[0]] === e[1] : p(e[0]) && (n = n && e[0].apply(o, [r])))
                                }), n && (O++, w.push(y(r)), s ? t["delete"]() : i && (r = P(r), t.update(r))), t["continue"]()
                            }
                        }, b.oncomplete = function () {
                            h(w)
                        }, b.onerror = function (e) {
                            g(e)
                        }, b.onabort = function (e) {
                            g(e)
                        }
                    })
                }, l = function (e, t) {
                    var n = "next", r = "openCursor", o = [], a = null, c = f, l = !1, d = function () {
                        return u(e, t, r, l ? n + "unique" : n, a, o, c)
                    }, g = function () {
                        return n = null, r = "count", {execute: d}
                    }, v = function () {
                        return a = y(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments, 0, 2), 1 == a.length && a.unshift(0), m(a[1]) || (a = null), {
                            execute: d,
                            count: g,
                            keys: b,
                            filter: T,
                            asc: k,
                            desc: M,
                            distinct: w,
                            modify: S,
                            limit: v,
                            map: O,
                            remove: I
                        }
                    }, b = function (e) {
                        return e = h(e) ? !0 : !!e, e && (r = "openKeyCursor"), {
                            execute: d,
                            keys: b,
                            filter: T,
                            asc: k,
                            desc: M,
                            distinct: w,
                            modify: S,
                            limit: v,
                            map: O,
                            remove: I
                        }
                    }, T = function () {
                        return o.push(Array.prototype.slice.call(arguments, 0, 2)), {
                            execute: d,
                            count: g,
                            keys: b,
                            filter: T,
                            asc: k,
                            desc: M,
                            distinct: w,
                            modify: S,
                            limit: v,
                            map: O,
                            remove: I
                        }
                    }, k = function (e) {
                        return e = h(e) ? !0 : !!e, n = e ? "next" : "prev", {
                            execute: d,
                            count: g,
                            keys: b,
                            filter: T,
                            asc: k,
                            desc: M,
                            distinct: w,
                            modify: S,
                            limit: v,
                            map: O,
                            remove: I
                        }
                    }, M = function (e) {
                        return e = h(e) ? !0 : !!e, n = e ? "prev" : "next", {
                            execute: d,
                            count: g,
                            keys: b,
                            filter: T,
                            asc: k,
                            desc: M,
                            distinct: w,
                            modify: S,
                            limit: v,
                            map: O,
                            remove: I
                        }
                    }, w = function (e) {
                        return e = h(e) ? !0 : !!e, l = e, {
                            execute: d,
                            count: g,
                            keys: b,
                            filter: T,
                            asc: k,
                            desc: M,
                            distinct: w,
                            modify: S,
                            limit: v,
                            map: O,
                            remove: I
                        }
                    }, S = function (e) {
                        return i = e, {
                            execute: d,
                            count: g,
                            keys: b,
                            filter: T,
                            asc: k,
                            desc: M,
                            distinct: w,
                            modify: S,
                            limit: v,
                            map: O,
                            remove: I
                        }
                    }, O = function (e) {
                        return p(e) && (c = e), {
                            execute: d,
                            count: g,
                            keys: b,
                            filter: T,
                            asc: k,
                            desc: M,
                            distinct: w,
                            modify: S,
                            limit: v,
                            map: O,
                            remove: I
                        }
                    }, I = function (e) {
                        return e = h(e) ? !0 : !!e, s = e, {
                            execute: d,
                            count: g,
                            keys: b,
                            filter: T,
                            asc: k,
                            desc: M,
                            distinct: w,
                            modify: S,
                            limit: v,
                            map: O,
                            remove: I
                        }
                    };
                    return {
                        execute: d,
                        count: g,
                        keys: b,
                        filter: T,
                        asc: k,
                        desc: M,
                        distinct: w,
                        modify: S,
                        limit: v,
                        map: O,
                        remove: I
                    }
                };
                "only bound upperBound lowerBound".split(" ").forEach(function (e) {
                    r[e] = function () {
                        return new l(e, arguments)
                    }
                }), this.filter = function () {
                    var e = new l(null, null);
                    return e.filter.apply(e, arguments)
                }, this.all = function () {
                    return this.filter()
                }
            }, b = function (e, t, n) {
                "function" == typeof t && (t = t());
                for (var r in t) {
                    var i, o = t[r];
                    i = !u.call(t, r) || n.objectStoreNames.contains(r) ? e.currentTarget.transaction.objectStore(r) : n.createObjectStore(r, o.key);
                    for (var s in o.indexes) {
                        var a = o.indexes[s];
                        try {
                            i.index(s)
                        } catch (e) {
                            i.createIndex(s, a.key || s, Object.keys(a).length ? a : {unique: !1})
                        }
                    }
                }
            }, T = function (e, t, n, r) {
                var i = e.target.result, o = new g(i, t);
                return k[t] = i, Promise.resolve(o)
            }, k = {}, M = {
                version: "0.10.2", open: function (e) {
                    var t;
                    return new Promise(function (n, r) {
                        if (k[e.server])T({target: {result: k[e.server]}}, e.server, e.version, e.schema).then(n, r); else {
                            try {
                                t = l().open(e.server, e.version)
                            } catch (i) {
                                r(i)
                            }
                            t.onsuccess = function (t) {
                                T(t, e.server, e.version, e.schema).then(n, r)
                            }, t.onupgradeneeded = function (t) {
                                b(t, e.schema, t.target.result)
                            }, t.onerror = function (e) {
                                r(e)
                            }
                        }
                    })
                }, remove: function (e) {
                    return new Promise(function (t, n) {
                        if (!e)return t();
                        typeof e === g && (e = e.name);
                        var r;
                        "string" == typeof e && (r = k[e]), r && "function" == typeof r.close && r.close();
                        var i;
                        try {
                            i = l().deleteDatabase(e)
                        } catch (o) {
                            n(o)
                        }
                        i.onsuccess = function (n) {
                            delete k[e], t(e)
                        }, i.onerror = function (e) {
                            n(e)
                        }, i.onblocked = function (e) {
                            n(e)
                        }
                    })
                }
            };
            "undefined" != typeof e && "undefined" != typeof e.exports ? e.exports = M : (r = function () {
                return M
            }.call(t, n, t, e), !(r !== o && (e.exports = r)))
        }(window)
    }, function (e, t) {
        "use strict";
        var n = {version: 1}, r = {
            timetag: {key: {keyPath: "name"}},
            blacklist: {key: {keyPath: "account"}},
            mutelist: {key: {keyPath: "account"}},
            friend: {key: {keyPath: "account"}},
            user: {key: {keyPath: "account"}},
            team: {key: {keyPath: "teamId"}},
            teamMember: {key: {keyPath: "id"}, indexes: {teamId: {unique: !1}}},
            msg: {
                key: {autoIncrement: !0},
                indexes: {idClient: {unique: !0}, sessionId: {unique: !1}, sessionType: {unique: !1}}
            },
            sysMsg: {
                key: {autoIncrement: !0},
                indexes: {idServer: {unique: !0}, category: {unique: !1}, type: {unique: !1}}
            },
            sysMsgUnread: {key: {keyPath: "type"}},
            session: {key: {keyPath: "id"}, indexes: {updateTime: {unique: !1}}}
        };
        n.schema = r, n.keyPath = function (e) {
            return n.schema[e].key.keyPath
        }, e.exports = n
    }, function (e, t, n) {
        "use strict";
        var r = n(36);
        r.getTimetags = function (e) {
            var t = {}, n = function (e) {
                return t[e.name] = e.value, e
            };
            return r.getAll("timetag", {filter: e, mapper: n}).then(function () {
                return t
            })
        }, r.getTeamMemberTimetags = function () {
            return r.getTimetags(function (e) {
                return -1 !== e.name.indexOf("team-")
            })
        }, r.getTimetag = function (e) {
            return r.getOne("timetag", null, e).then(function (e) {
                return e = e || {value: 0}, e.value
            })
        }, r.getTeamMemberTimetag = function (e) {
            return r.getTimetag("team-" + e)
        };
        var i = function (e, t) {
            var n = {name: e, value: t};
            return r.put("timetag", n)
        };
        r.updateMyInfoTimetag = function (e) {
            return i("myInfo", e)
        }, r.updateRelationTimetag = function (e) {
            return i("relations", e)
        }, r.getRelationsTimetag = function () {
            return r.getTimetag("relations")
        }, r.updateFriendTimetag = function (e) {
            return i("friends", e)
        }, r.getFriendsTimetag = function () {
            return r.getTimetag("friends")
        }, r.updateFriendUserTimetag = function (e) {
            return i("friendUsers", e)
        }, r.updateTeamTimetag = function (e) {
            return i("teams", e)
        }, r.getTeamsTimetag = function () {
            return r.getTimetag("teams")
        }, r.updateTeamMemberTimetag = function (e, t) {
            return i("team-" + e, t)
        }, r.getTeamMembersTimetag = function (e) {
            return r.getTimetag("team-" + e)
        }, r.updateRoamingMsgTimetag = function (e) {
            return i("roamingMsgs", e)
        }, r.deleteTimetag = function (e) {
            return r.remove("timetag", e)
        }, r.deleteTeamMemberTimetag = function (e) {
            return r.deleteTimetag("team-" + e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(36), i = n(19), o = "blacklist", s = "mutelist", a = n(11);
        r.mergeRelations = function (e, t, n, a, c) {
            var u = r.updateAndDelete(o, e, t), l = r.updateAndDelete(s, n, a);
            return Promise.all([u, l]).then(function () {
                return i.warn("merge relations"), r.updateRelationTimetag(c), [e, t, n, a, c]
            })
        }, r.getRelations = function () {
            var e = r.getAll(o), t = r.getAll(s);
            return Promise.all([e, t])
        }, r.markInBlacklist = function (e) {
            if (e = a.copy(e), e.isAdd) {
                var t = e.record;
                return r.put(o, t)
            }
            var n = e.account;
            return r.remove(o, n)
        }, r.markInMutelist = function (e) {
            if (e = a.copy(e), e.isAdd) {
                var t = e.record;
                return r.put(s, t)
            }
            var n = e.account;
            return r.remove(s, n)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(36), i = n(19), o = "friend", s = n(11);
        r.mergeFriends = function (e, t, n) {
            return r.updateAndDelete(o, e, t).then(function () {
                return i.warn("merge friends"), n && r.updateFriendTimetag(n), [e, t, n]
            })
        }, r.putFriend = function (e) {
            return r.put(o, e)
        }, r.updateFriend = function (e) {
            e = s.copy(e);
            var t = e.account;
            return r.getOne(o, null, t, {modifyObj: e}).then(function (n) {
                return n ? i.warn("update friend", t, e) : i.warn("update friend no", t), n
            })
        }, r.deleteFriend = function (e) {
            var t = r.remove(o, e), n = r.deleteUser(e);
            return Promise.all([t, n])
        }, r.getFriends = function () {
            var e = function (e) {
                return e.valid
            };
            return r.getAll(o, {filter: e})
        }, r.getFriend = function (e) {
            return r.getOne(o, null, e)
        }
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            return e.valid && e.validToCurrentUser
        }

        var i = n(12), o = n(36), s = n(19), a = "team", c = "teamId", u = "teamMember", l = n(44), f = n(11);
        o.mergeTeams = function (e, t, n) {
            var r = o.put(a, e), i = o.leaveTeams(t, n);
            return Promise.all([r, i]).then(function () {
                return s.warn("merge teams"), o.updateTeamTimetag(n), [e, t, n]
            })
        }, o.putTeam = function (e) {
            return e.validToCurrentUser = !0, o.put(a, e)
        }, o.updateTeam = function (e) {
            e = f.copy(e);
            var t = e.teamId;
            return o.getOne(a, null, t, {modifyObj: e}).then(function (n) {
                return n ? (s.warn("update team", t, e), n) : (s.warn("update team no", t), o.putTeam(e))
            })
        }, o.transferTeam = function (e, t, n) {
            var r = e.teamId, i = e.memberUpdateTime, a = {
                teamId: r,
                account: t,
                type: "normal",
                updateTime: i
            }, c = {teamId: r, account: n, type: "owner", updateTime: i};
            return o.updateTeamMembers([a, c]).then(function () {
                return o.putTeam(e).then(function () {
                    return s.warn("transfer team", e.teamId, t, n), [e, t, n]
                })
            })
        }, o.leaveTeam = function (e) {
            return o.updateTeam({teamId: e, validToCurrentUser: !1}).then(function () {
                return o.removeAllTeamMembers(e)
            })
        }, o.dismissTeam = function (e, t) {
            var n = {teamId: e, valid: !1, validToCurrentUser: !1, updateTime: t};
            return o.updateTeam(n).then(function () {
                return o.removeAllTeamMembers(e)
            })
        }, o.leaveTeams = function (e, t) {
            var n, r = [];
            return e.forEach(function (e) {
                n = o.leaveTeam(e.teamId, t), r.push(n)
            }), Promise.all(r)
        }, o.getTeams = function () {
            return o.getAll(a, {filter: r})
        }, o.getTeam = function (e) {
            return e = "" + e, o.getOne(a, null, e)
        }, o.getTeamsByTeamIds = function (e) {
            var t, n = [];
            return e.forEach(function (e) {
                t = o.getTeam(e), n.push(t)
            }), Promise.all(n)
        }, o.mergeTeamMembers = function (e, t, n, r) {
            var i = o.putTeamMembers(t), a = o.updateTeamMembers(n);
            return Promise.all([i, a]).then(function () {
                return s.warn("merge members", e), o.updateTeamMemberTimetag(e, r)
            })
        }, o.putTeamMembers = function (e) {
            return o.put(u, e)
        }, o.getTeamMembers = function (e) {
            e = "" + e;
            var t = function (e) {
                return e.valid
            };
            return o.getOnly(u, c, e, {filter: t})
        }, o.getInvalidTeamMembers = function (e, t) {
            e = "" + e;
            var n, r = [];
            return t.forEach(function (t) {
                n = o.getOne(u, null, l.genId(e, t)), r.push(n)
            }), Promise.all(r)
        }, o.updateTeamMember = function (e) {
            var t = e.teamId, n = e.account, r = l.genId(t, n), i = f.filterObj(e, "nickInTeam muteTeam updateTime type valid");
            return o.getOne(u, null, r, {modifyObj: i}).then(function (e) {
                return e ? s.warn("update member", t, n, i) : s.warn("update member no", t, n), e
            })
        }, o.updateTeamMembers = function (e) {
            if (!e.length)return Promise.resolve();
            var t, n = [];
            return e.forEach(function (e) {
                t = o.updateTeamMember(e).then(function () {
                }), n.push(t)
            }), Promise.all(n)
        }, o.updateTeamManagers = function (e, t, n, r) {
            var i = t.map(function (t) {
                return {teamId: e, account: t, type: n ? "manager" : "normal", updateTime: r}
            });
            return o.updateTeamMembers(i)
        }, o.removeTeamMembersByAccounts = function (e, t) {
            var n = t.map(function (t) {
                return {teamId: e, account: t, valid: !1}
            });
            return o.updateTeamMembers(n)
        }, o.removeAllTeamMembers = function (e) {
            var t = {valid: !1};
            return o.getOnly(u, c, e, {modifyObj: t}).then(function () {
                return s.warn("invalid all teamMembers", e), o.deleteTeamMemberTimetag(e)
            })
        }, o.deleteTeamMembers = function (e) {
            return o.getOnly(u, c, e, {remove: !0}).then(function () {
                s.warn("delete all teamMembers", e), o.deleteTeamMemberTimetag(e)
            })
        }, o.deleteTeam = function (e) {
            var t, n = [];
            return f.isArray(e) || (e = [e]), e.forEach(function (e) {
                e = "" + e, t = o.get(a, e).then(function (t) {
                    if (t && r(t))throw i.stillInTeamError();
                    var n = o.remove(a, e), s = o.deleteTeamMembers(e);
                    return Promise.all([n, s])
                }), n.push(t)
            }), 1 === n.length ? n[0] : Promise.all(n)
        }
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            i.verifyOptions(e, "teamId"), i.verifyParamAtLeastPresentOne(e, "nickInTeam muteTeam"), this.teamId = e.teamId, o(e.account) && (this.account = e.account), o(e.nickInTeam) && (this.nickInTeam = e.nickInTeam), o(e.muteTeam) && (this.bits = 0, e.muteTeam && (this.bits += 1))
        }

        var i = n(11), o = i.notundef, s = {0: "normal", 1: "owner", 2: "manager"};
        r.reverse = function (e) {
            var t = i.copy(e);
            if (o(t.teamId) && (t.teamId = "" + t.teamId), o(t.type) && (t.type = s[t.type]), o(t.active) && (t.active = "1" === t.active), o(t.valid) && (t.valid = "1" === t.valid), o(t.joinTime) && (t.joinTime = +t.joinTime), o(t.updateTime) && (t.updateTime = +t.updateTime), o(t.bits)) {
                var n = t.bits;
                delete t.bits, t.muteTeam = !!(1 & n)
            }
            return o(t.teamId) && o(t.account) && (t.id = r.genId(t.teamId, t.account)), t
        }, r.genId = function (e, t) {
            return e + "-" + t
        }, r.accounts2ids = function (e, t) {
            return t.map(function (t) {
                return r.genId(e, t)
            })
        }, r.assembleMembers = function (e, t) {
            return i.isArray(t) || (t = [t]), t.map(function (t) {
                return r.assembleMember(e, t)
            })
        }, r.assembleMember = function (e, t) {
            return {
                account: t,
                active: !0,
                id: r.genId(e.teamId, t),
                joinTime: e.memberUpdateTime,
                muteTeam: !1,
                nickInTeam: "",
                teamId: e.teamId,
                type: "normal",
                updateTime: e.memberUpdateTime,
                valid: !0
            }
        }, r.assembleOwner = function (e) {
            var t = r.assembleMember(e, e.owner);
            return t.type = "owner", t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(36), i = n(19), o = "user", s = n(11);
        r.mergeMyInfo = function (e, t) {
            return r.put(o, e).then(function () {
                return t ? r.updateMyInfoTimetag(e.updateTime) : e
            })
        }, r.mergeFriendUsers = function (e, t) {
            return r.putUsers(e).then(function () {
                r.updateFriendUserTimetag(t)
            })
        }, r.putUsers = function (e) {
            return r.put(o, e)
        }, r.putUser = function (e) {
            return r.put(o, e)
        }, r.updateUser = function (e) {
            e = s.copy(e);
            var t = e.account;
            return r.getOne(o, null, t, {modifyObj: e}).then(function (n) {
                return n ? i.warn("update user", t, e) : i.warn("update user no", t), n
            })
        }, r.updateUsersIfIsFriend = function (e) {
            var t, n = [], i = [];
            return e.forEach(function (e) {
                t = r.getFriend(e.account).then(function (n) {
                    return n && (t = r.putUser(e), i.push(t)), n
                }), n.push(t)
            }), Promise.all(n).then(function () {
                return Promise.all(i).then(function (e) {
                    return e
                })
            })
        }, r.deleteUser = function (e) {
            return r.remove(o, e)
        }, r.getUser = function (e) {
            return r.getOne(o, null, e)
        }, r.getUsers = function (e) {
            function t(t) {
                return -1 !== e.indexOf(t.account)
            }

            return r.getAll(o, {filter: t})
        }, r.getAllUsers = function () {
            return r.getAll(o)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(36), i = n(19), o = "session", s = "msg", a = "idClient", c = "sessionId", u = "sessionType", l = n(11), f = l.notundef;
        r.putMsg = function (e) {
            return new Promise(function (t) {
                function n() {
                    o--, 0 === o && t(i)
                }

                if (l.isArray(e) || (e = [e]), !e[0].filter) {
                    var i = [], o = e.length;
                    e.forEach(function (e) {
                        e = l.copy(e), e.sessionType = e.sessionId + "-" + e.type, r.put(s, e).then(function (e) {
                            i.push(e[0]), n()
                        }, n)
                    })
                }
            })
        }, r.updateMsg = function (e) {
            if (!e.filter) {
                var t = e.idClient, n = l.filterObj(e, "resend status idServer time localCustom");
                return r.getOne(s, a, t, {modifyObj: n}).then(function (e) {
                    return e ? i.warn("update msg", t, n) : i.warn("udpate msg no", t), e
                })
            }
        }, r.getMsgsBySessionId = function (e) {
            e = e || {};
            var t = !e.reverse, n = e.limit || 100, i = c, o = e.sessionId, a = e.type, l = e.keyword;
            f(l) && (a = "text"), f(a) && (i = u, o = o + "-" + a);
            var d, p = e.lastMsgIdClient, m = !1;
            return (f(p) || f(l)) && (d = function (e) {
                function t() {
                    return f(l) ? -1 !== e.text.indexOf(l) : !0
                }

                return f(p) ? m ? t() : (e.idClient === p && (m = !0), !1) : t()
            }), r.getOnly(s, i, o, {filter: d, desc: t, limit: n, mapper: r.pruneMsg})
        }, r.pruneMsg = function (e) {
            return e ? (delete e.sessionTime, delete e.sessionType, e) : null
        }, r.getMsgByIdClient = function (e) {
            return r.getOne(s, a, e).then(function (e) {
                return r.pruneMsg(e)
            })
        }, r.getMsgsByIdClients = function (e) {
            var t, n = [];
            return e.forEach(function (e) {
                t = r.getMsgByIdClient(e), n.push(t)
            }), Promise.all(n)
        }, r.deleteMsg = function (e) {
            var t, n = [];
            return l.isArray(e) || (e = [e]), e.forEach(function (e) {
                t = r.getOne(s, a, e, {remove: !0}), n.push(t)
            }), 1 === n.length ? n[0] : Promise.all(n)
        }, r.deleteMsgsBySessionId = function (e) {
            return r.getOnly(s, c, e, {remove: !0})
        }, r.deleteAllMsgs = function () {
            var e = r.clearTable(s), t = r.clearTable(o);
            return Promise.all([e, t])
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(11), i = r.notundef, o = n(36), s = n(19), a = "sysMsg", c = "idServer", u = "type", l = "category", f = "sysMsgUnread";
        o.putSysMsg = function (e) {
            return new Promise(function (t) {
                function n() {
                    s--, 0 === s && t(i)
                }

                if (r.isArray(e) || (e = [e]), !e[0].filter) {
                    var i = [], s = e.length;
                    e.forEach(function (e) {
                        e = r.copy(e), o.put(a, e).then(function (e) {
                            i.push(e[0]), n()
                        }, n)
                    })
                }
            })
        }, o.getSysMsgs = function (e) {
            e = e || {};
            var t = !e.reverse, n = e.limit || 100, r = null, s = null;
            e.category && (r = l, s = e.category), e.type && (r = u, s = e.type);
            var c, f = e.lastIdServer, d = !1;
            return i(f) && (f = "" + f, c = function (e) {
                return d ? !0 : (e.idServer === f && (d = !0), !1)
            }), e = {filter: c, desc: t, limit: n}, r ? o.getOnly(a, r, s, e) : o.getAll(a, e)
        }, o.updateSysMsg = function (e) {
            if (!e.filter) {
                var t = "" + e.idServer, n = r.filterObj(e, "read state error localCustom");
                return o.getOne(a, c, t, {modifyObj: n}).then(function (e) {
                    return e ? s.warn("update sysMsg", t, n) : s.warn("update sysMsg no", t), e
                })
            }
        }, o.markSysMsgRead = function (e) {
            var t, n = [];
            return r.isArray(e) || (e = [e]), e.forEach(function (e) {
                t = o.updateSysMsg({idServer: e.idServer, read: !0}), n.push(t)
            }), 1 === n.length ? n[0] : Promise.all(n)
        }, o.deleteSysMsg = function (e) {
            var t, n = [];
            return r.isArray(e) || (e = [e]), e.forEach(function (e) {
                e = "" + e, t = o.getOne(a, c, e, {remove: !0}), n.push(t)
            }), 1 === n.length ? n[0] : Promise.all(n)
        }, o.deleteAllSysMsgs = function () {
            var e = o.clearTable(a), t = o.clearTable(f);
            return Promise.all([e, t])
        }, o.getSysMsgUnread = function () {
            return o.getAll(f).then(function (e) {
                var t = {};
                return e.forEach(function (e) {
                    t[e.type] = e.num
                }), t
            })
        }, o.updateSysMsgUnread = function (e) {
            e = r.copy(e);
            var t = [];
            return Object.keys(e).forEach(function (n) {
                t.push({type: n, num: e[n]})
            }), o.put(f, t).then(function () {
                return s.warn("update sysMsg unread", e), e
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(36), i = n(19), o = "session", s = "updateTime", a = n(11), c = a.notundef;
        r.putSession = function (e) {
            var t = a.copy(e);
            return delete t.id, r.getOne(o, null, e.id, {modifyObj: t}).then(function (t) {
                return t ? (i.warn("put session", e), t) : (e.unread = 0, r.put(o, e).then(function (e) {
                    return e[0]
                }))
            })
        }, r.getSessions = function (e) {
            e = e || {};
            var t, n = !e.reverse, i = e.limit || 100, a = e.lastSessionId, u = !1;
            return c(a) && (t = function (e) {
                return u ? !0 : (e.id === a && (u = !0), !1)
            }), r.getAll(o, {index: s, desc: n, limit: i, filter: t})
        }, r.updateSession = function (e) {
            var t = e.id, n = a.filterObj(e, "unread lastMsg localCustom");
            return r.getOne(o, null, t, {modifyObj: n}).then(function (e) {
                return e ? i.warn("update session", t, n) : i.warn("update session no", t), e
            })
        }, r.resetSessionUnread = function (e) {
            return r.updateSession({id: e, unread: 0})
        }, r.deleteSession = function (e) {
            return r.remove(o, e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn, i = n(37), o = n(31), s = n(19), a = n(11), c = a.undef, u = a.objs2ids, l = a.objs2accounts, f = a.teams2ids, d = n(36);
        r.syncData = function () {
            function e(e) {
                t.syncPromiseArray = [], t.syncResult = {}, t.syncTeamMembersPromiseArray = [], t.syncTeamMembersResult = {}, a.verifyBooleanWithDefault(n, "syncRelations syncFriends syncFriendUsers syncTeams syncRoamingMsgs syncTeamMembers", !0), a.verifyBooleanWithDefault(n, "syncFilter", !1);
                var r = {};
                e = e || {}, r.myInfo = e.myInfo || 0, r.offlineMsgs = 0, n.syncRelations && (r.relations = e.relations || 0), n.syncFriends && (r.friends = e.friends || 0), n.syncFriendUsers && (r.friendUsers = e.friendUsers || 0), n.syncTeams && (r.teams = e.teams || 0), n.syncRoamingMsgs && (r.roamingMsgs = e.roamingMsgs || 0), n.syncFilter && (r.filterMsgs = 0), t.sendCmd("sync", {sync: r}, t.onSyncData.bind(t))
            }

            var t = this, n = t.options, r = d.support;
            r ? d.getTimetags().then(function (t) {
                e(t)
            }, function () {
                e()
            }) : e(t.timetags)
        }, r.onSyncData = function (e, t) {
            this.onMiscError(e, t, "sync error")
        }, r.processSync = function (e) {
            var t = this;
            switch (e.cmd) {
                case"syncDone":
                    t.timetags.sync = e.content.timetag, t.onSyncDone();
                    break;
                case"syncTeamMembersDone":
                    t.onSyncTeamMembersDone()
            }
        }, r.onSyncDone = function () {
            function e() {
                if (s.warn("after sync", a.promises2cmds(U)), U = [], m = N.myInfo, y = N.blacklist, h = N.invalidBlacklist || [], g = N.mutelist, v = N.invalidMutelist || [], b = N.friends, T = N.invalidFriends || [], k = N.users, M = N.teams, w = N.invalidTeams || [], S = N.sessions, O = N.roamingMsgs, I = N.offlineMsgs, P = N.offlineFilterMsgs, x = N.offlineSysMsgs, C = N.offlineCustomSysMsgs, _ = N.offlineFilterSysMsgs, j = N.offlineFilterCustomSysMsgs, E = N.sysMsgUnread, S) {
                    var e = [];
                    Object.keys(S).forEach(function (t) {
                        e.push(S[t])
                    }), S = e.sort(function (e, t) {
                        return t.updateTime - e.updateTime
                    })
                }
                F && !A.hasSynced && t(), U.length ? Promise.all(U).then(n, function (e) {
                    A.onDBError(e)
                }) : n()
            }

            function t() {
                c(m) && (p = d.getUser(o.account).then(function (e) {
                    m = e
                }, function (e) {
                    return e._msg = "on myInfo error", e
                }), U.push(p)), R.syncRelations && (p = d.getRelations().then(function (e) {
                    y = e[0], g = e[1], y.invalid = h, g.invalid = v
                }, function (e) {
                    return e._msg = "on relations error", e
                }), U.push(p)), R.syncFriends && (p = d.getFriends().then(function (e) {
                    b = e, b.invalid = T
                }, function (e) {
                    return e._msg = "on friends error", e
                }), U.push(p)), R.syncFriendUsers && (p = d.getAllUsers().then(function (e) {
                    k = e
                }, function (e) {
                    return e._msg = "on users error", e
                }), U.push(p)), R.syncTeams && (p = d.getTeams().then(function (e) {
                    M = e, M.invalid = w
                }, function (e) {
                    return e._msg = "on teams error", e
                }), U.push(p)), p = d.getSessions().then(function (e) {
                    S = e
                }, function (e) {
                    return e._msg = "on sessions error", e
                }), U.push(p), p = d.getSysMsgUnread().then(function (e) {
                    E = e
                }, function (e) {
                    return e._msg = "on sysMsgUnread error", e
                }), U.push(p)
            }

            function n() {
                setTimeout(r, 0)
            }

            function r() {
                var e, t, n = [];
                m && (s.info("on myInfo", m), o.myInfo = m, R.onmyinfo(a.copy(m))), y && (s.info("on blacklist", l(y), y), s.info("on mutelist", l(g), g), R.onblacklist(y), R.onmutelist(g)), b && (s.info("on friends", l(b), b), R.onfriends(b)), k && (s.info("on users", l(k), k), R.onusers(k)), M && (s.info("on teams", f(M), M), R.onteams(M)), S && (s.info("on sessions", u(S), S), R.onsessions(S)), O && O.forEach(function (e) {
                    n.push(e.timetag), t = e.msgs, t.length && (s.info("on roaming msgs", e.sessionId, t.length, t), R.onroamingmsgs(e))
                }), I && I.forEach(function (e) {
                    n.push(e.timetag), t = e.msgs, t.length && (s.info("on offline msgs", e.sessionId, t.length, t), R.onofflinemsgs(e))
                }), P && P.forEach(function (e) {
                    n.push(e.timetag), t = e.msgs, t.length && (s.info("on offline filter msgs", e.sessionId, t.length, t), R.onofflinefiltermsgs(t))
                }), x && (s.info("on offline sys msgs", x.length, x), R.onofflinesysmsgs(x)), _ && (s.info("on offline filter sys msgs", _.length, _), R.onofflinefiltersysmsgs(_)), C && (s.info("on offline custom sys msgs", C.length, C), R.onofflinecustomsysmsgs(C)), j && (s.info("on offline filter custom sys msgs", j.length, j), R.onofflinefiltercustomsysmsgs(j)), E && (s.info("on sysMsgUnread", E), R.onsysmsgunread(E)), n.length ? (e = Math.max.apply(Math, n), A.updateRoamingMsgTimetag(e).then(i, i)) : i(), A.syncPromiseArray = null, A.syncResult = null
            }

            function i() {
                s.info("sync done"), A.hasSynced = !0, R.onsyncdone(), R.syncTeamMembers && M && M.length ? A.syncTeamMembers(M) : setTimeout(function () {
                    A.onSyncTeamMembersDone()
                }, 0)
            }

            var p, m, y, h, g, v, b, T, k, M, w, S, O, I, P, x, C, _, j, E, A = this, F = d.support, R = A.options, U = A.syncPromiseArray, N = A.syncResult;
            U.length ? Promise.all(U).then(e, function (e) {
                A.onDBError(e)
            }) : e()
        }, r.syncTeamMembers = function (e) {
            function t(t) {
                var r = {};
                t = t || {}, e.forEach(function (e) {
                    r[e.teamId] = t["team-" + e.teamId] || 0
                }, n), n.sendCmd("syncTeamMembers", {sync: r}, n.onSyncTeamMembers.bind(n))
            }

            var n = this;
            i.db ? d.getTeamMemberTimetags().then(function (e) {
                t(e)
            }, function () {
                t()
            }) : t(n.timetags)
        }, r.onSyncTeamMembers = function (e, t) {
            this.onMiscError(e, t, "sync teamMembers error")
        }, r.onSyncTeamMembersDone = function () {
            function e() {
                s.warn("after sync members", a.promises2cmds(y)), y = [], i.db && !f.hasSyncedTeamMembers ? t() : n()
            }

            function t() {
                return p.syncTeams && p.syncTeamMembers ? void d.getTeams().then(function (e) {
                    e.forEach(function (e) {
                        var t = e.teamId;
                        u = d.getTeamMembers(t).then(function (e) {
                            m[t] = e
                        }, function (e) {
                            return e._msg = "on members error", e
                        }), y.push(u)
                    }), y.length ? Promise.all(y).then(n, function (e) {
                        f.onDBError(e)
                    }) : n()
                }, function (e) {
                    e._msg = "on members error", f.onDBError(e)
                }) : c()
            }

            function n() {
                setTimeout(r, 0)
            }

            function r() {
                var e, t;
                Object.keys(m).forEach(function (n) {
                    -1 === n.indexOf("invalid") && (e = m[n], t = m[n + "-invalid"] || [], e.invalid = t, o(n, e))
                }), c()
            }

            function o(e, t) {
                s.info("on members", e, l(t), t), p.onteammembers({teamId: e, members: t})
            }

            function c() {
                s.info("sync members done"), f.hasSyncedTeamMembers = !0, p.onsyncteammembersdone(), f.syncTeamMembersResult = null, f.syncTeamMembersPromiseArray = null
            }

            var u, f = this, p = f.options, m = f.syncTeamMembersResult, y = f.syncTeamMembersPromiseArray;
            y.length ? Promise.all(y).then(e, function (e) {
                f.onDBError(e)
            }) : e()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn, i = n(51), o = n(52), s = n(37), a = n(36), c = n(11), u = n(31), l = n(19), f = c.objs2accounts;
        r.processUser = function (e) {
            var t, n = this, r = e.obj, i = e.error, c = e.content;
            switch (e.cmd) {
                case"markInBlacklist":
                    i || n.markInBlacklist(r);
                    break;
                case"syncMarkInBlacklist":
                    n.markInBlacklist(c, !0);
                    break;
                case"markInMutelist":
                    i || n.markInMutelist(r);
                    break;
                case"syncMarkInMutelist":
                    n.markInMutelist(c, !0);
                    break;
                case"getRelations":
                    i || n.onRelations(e);
                    break;
                case"syncMyInfo":
                    n.onMyInfo(e, !0);
                    break;
                case"updateMyInfo":
                    i || (r.updateTime = c.timetag, n.onUpdateMyInfo(e, r));
                    break;
                case"syncUpdateMyInfo":
                    n.onUpdateMyInfo(e, c.user, !0);
                    break;
                case"getUsers":
                    i || (t = c.users.map(function (e) {
                        return o.reverse(e)
                    }), e.obj = t, s.db && a.updateUsersIfIsFriend(t))
            }
        }, r.onMyInfo = function (e) {
            function t() {
                i = o.reverse(f.user), l.warn("parse myInfo", i)
            }

            function n(e, t) {
                a.mergeMyInfo(i, d).then(function () {
                    r(), e()
                }).then(void 0, function (e) {
                    e._msg = "merge myInfo error", t(e)
                })
            }

            function r() {
                c.timetags.myInfo = i.updateTime, d && (c.syncResult.myInfo = i)
            }

            var i, c = this, u = e.error, f = e.content, d = !0, p = new Promise(function (e, i) {
                u ? i(u) : (t(), s.db ? n(e, i) : (r(), e()))
            });
            d && (p.cmd = "myInfo", c.syncPromiseArray.push(p))
        }, r.onUpdateMyInfo = function (e, t, n) {
            var r = this, i = o.reverse(t), s = c.merge(u.myInfo, i);
            u.myInfo = s, n ? (l.info("on update myInfo", s), r.options.onupdatemyinfo(s)) : e.obj = s, a.support && (i.account = u.account, a.updateUser(i))
        }, r.onRelations = function (e) {
            function t() {
                p.forEach(function (e) {
                    e = i.parse(e);
                    var t = {account: e.account, createTime: e.createTime, updateTime: e.updateTime};
                    e.isBlacked ? y.push(t) : h.push(t), e.isMuted ? g.push(t) : v.push(t)
                }), l.warn("parse blacklist", f(y), y, "delete", f(h), h), l.warn("parse mutelist", f(g), g, "delete", f(v), v), p.length ? (m = !0, o = e.content.timetag) : m = !1
            }

            function n(t, n) {
                e.promise = new Promise(function (e, i) {
                    function s() {
                        d ? (r(), e(), t()) : a.getRelations().then(function (n) {
                            y = n[0], g = n[1], r(), e(), t()
                        }).then(void 0, function (e) {
                            e._msg = "get relations error", i(e), n(e)
                        })
                    }

                    m ? a.mergeRelations(y, h, g, v, o).then(function () {
                        s()
                    }).then(void 0, function (e) {
                        e._msg = "merge relations error", i(e), n(e)
                    }) : (l.warn("no merge relations"), s())
                }).then(void 0, function (e) {
                    throw e._msg = "merge relations data error", n(e), e
                })
            }

            function r() {
                c.timetags.relations = o, y.invalid = h, g.invalid = v, d ? (c.syncResult.blacklist = y, c.syncResult.mutelist = g, c.syncResult.invalidBlacklist = h, c.syncResult.invalidMutelist = v) : (l.warn("get relations", y, g), e.obj.blacklist = y, e.obj.mutelist = g)
            }

            var o, c = this, u = e.error, d = c.packetFromSync(e), p = e.content.specialRelations, m = !0, y = [], h = [], g = [], v = [], b = new Promise(function (e, i) {
                u ? i(u) : (t(), s.db ? n(e, i) : (r(), e()))
            });
            d && (b.cmd = "relations", c.syncPromiseArray.push(b))
        }, r.markInBlacklist = function (e, t) {
            var n = this;
            e.record = {
                account: e.account,
                updateTime: +new Date
            }, s.db && a.markInBlacklist(e), t && (l.info("on sync markInBlacklist", e), n.options.onsyncmarkinblacklist(e))
        }, r.markInMutelist = function (e, t) {
            var n = this;
            e.record = {
                account: e.account,
                updateTime: +new Date
            }, s.db && a.markInMutelist(e), t && (l.info("on sync markInMutelist", e), n.options.onsyncmarkinmutelist(e))
        }
    }, function (e, t, n) {
        "use strict";
        function r() {
        }

        var i = n(11);
        r.parse = function (e) {
            var t = i.copy(e);
            return t.isBlacked = "1" === t.isBlacked, t.isMuted = "1" === t.isMuted, t.createTime = +t.createTime, t.updateTime = +t.updateTime, t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            i.merge(this, e), i.notundef(this.gender) && (i.verifyParamValid("gender", this.gender, r.validGenders), this.gender = o[this.gender]), i.notundef(this.email) && "" !== this.email && i.verifyEmail("email", this.email), i.notundef(this.birth) && "" !== this.birth && i.verifyBirth("birth", this.birth), i.notundef(this.tel) && "" !== this.tel && i.verifyTel("tel", this.tel)
        }

        var i = n(11), o = {unknown: 0, male: 1, female: 2}, s = {0: "unknown", 1: "male", 2: "female"};
        r.reverse = function (e) {
            var t = i.filterObj(e, "account nick avatar sign gender email birth tel custom createTime updateTime");
            return i.notundef(t.gender) && (t.gender = s[t.gender]), i.notundef(t.createTime) && (t.createTime = +t.createTime), i.notundef(t.updateTime) && (t.updateTime = +t.updateTime), t
        }, r.validGenders = Object.keys(o), e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn, i = n(54), o = n(52), s = n(11), a = n(19), c = n(36), u = n(37), l = s.objs2accounts;
        r.processFriend = function (e) {
            var t = this, n = e.obj, r = e.content, i = e.error;
            switch (e.cmd) {
                case"friendRequest":
                    t.updateFriendSysMsg(e), i || t.onFriendRequest(n);
                    break;
                case"syncFriendRequest":
                    t.onFriendRequest(r, !0);
                    break;
                case"deleteFriend":
                    i || t.onDeleteFriend(n);
                    break;
                case"syncDeleteFriend":
                    t.onDeleteFriend(r, !0);
                    break;
                case"updateFriend":
                    i || t.onUpdateFriend(n);
                    break;
                case"syncUpdateFriend":
                    t.onUpdateFriend(r, !0);
                    break;
                case"getFriends":
                    t.onFriends(e);
                    break;
                case"syncFriends":
                    t.onFriends(e);
                    break;
                case"syncFriendUsers":
                    t.onFriendUsers(e)
            }
        }, r.onFriends = function (e) {
            function t() {
                m && p.forEach(function (e) {
                    e = i.reverse(e), e.valid ? y.push(e) : h.push(e)
                }), a.warn("parse friends", l(y), y, "delete", l(h), h), p.length ? (m = !0, o = e.content.timetag) : m = !1
            }

            function n(t, n) {
                e.promise = new Promise(function (e, i) {
                    function s() {
                        d ? (r(), e(), t()) : c.getFriends().then(function (n) {
                            y = n, r(), e(), t()
                        }).then(void 0, function (e) {
                            e._msg = "get friends error", i(e), n(e)
                        })
                    }

                    m ? c.mergeFriends(y, h, o).then(function () {
                        s()
                    }).then(void 0, function (e) {
                        e._msg = "merge friends error", i(e), n(e)
                    }) : (a.warn("no merge friends"), s())
                }).then(void 0, function (e) {
                    throw e._msg = "merge friends data error", n(e), e
                })
            }

            function r() {
                s.timetags.friends = o, y.invalid = h, d ? (s.syncResult.friends = y, s.syncResult.invalidFriends = h) : (a.warn("get friends", l(y), y), e.obj = y)
            }

            var o, s = this, f = e.error, d = s.packetFromSync(e), p = e.content.friends, m = !0, y = [], h = [], g = new Promise(function (e, i) {
                f ? i(f) : (t(), u.db ? n(e, i) : (r(), e()))
            });
            d && (g.cmd = "friends", s.syncPromiseArray.push(g))
        }, r.onFriendRequest = function (e, t) {
            var n = Promise.resolve(), r = this, o = e.type;
            o = e.type = i.getTypeFromByte(o) || o;
            var s = "addFriend" === o || "passFriendApply" === o;
            if (s) {
                var a = e.friend = i.assembleFriend(e.account);
                u.db && (n = c.putFriend(a))
            }
            return t && r.onSyncFriendAction(e), n
        }, r.onSyncFriendAction = function (e) {
            a.info("on sync friendAction", e), this.options.onsyncfriendaction(e)
        }, r.onDeleteFriend = function (e, t) {
            var n = Promise.resolve(), r = this;
            return u.db && (n = c.deleteFriend(e.account)), t && (e.type = "deleteFriend", r.onSyncFriendAction(e)), n
        }, r.onUpdateFriend = function (e, t) {
            var n = this, r = i.reverse(e);
            u.db && c.updateFriend(r), t && n.onSyncFriendAction({type: "updateFriend", friend: r})
        }, r.onFriendUsers = function (e) {
            var t = this, n = e.content, r = n.users.map(function (e) {
                return o.reverse(e)
            });
            a.warn("parse users", l(r), r);
            var i = n.timetag, s = Promise.resolve();
            u.db && (s = c.mergeFriendUsers(r, i)), t.timetags.friendUsers = i, s.cmd = "friendUsers", t.syncPromiseArray.push(s), t.syncResult.users = r
        }, r.updateFriendSysMsg = function (e) {
            var t, n, r = e.obj, o = e.error;
            if (e.obj.idServer) {
                if (o)t = "error", o = s.filterObj(o, "code message"); else {
                    var a = r.type;
                    switch (a = i.getTypeFromByte(a) || a) {
                        case"passFriendApply":
                            t = "passed";
                            break;
                        case"rejectFriendApply":
                            t = "rejected"
                    }
                }
                n = {idServer: r.idServer, state: t}, o && (n.error = o), this.updateSysMsg(n)
            }
        }
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            i.verifyOptions(e, "account"), i.verifyParamAtLeastPresentOne(e, "alias custom"), this.account = e.account, o(e.alias) && (this.alias = e.alias), o(e.custom) && (this.custom = e.custom)
        }

        var i = n(11), o = i.notundef, s = {
            addFriend: 1,
            applyFriend: 2,
            passFriendApply: 3,
            rejectFriendApply: 4
        }, a = {1: "addFriend", 2: "applyFriend", 3: "passFriendApply", 4: "rejectFriendApply"};
        r.reverse = function (e) {
            var t = i.filterObj(e, "account alias custom createTime updateTime");
            return o(e.flag) && (t.valid = "1" === e.flag), o(t.createTime) && (t.createTime = +t.createTime), o(t.updateTime) && (t.updateTime = +t.updateTime), t
        }, r.validTypes = function () {
            return Object.keys(s)
        }, r.getByteFromType = function (e) {
            return s[e]
        }, r.getTypeFromByte = function (e) {
            return a[e]
        }, r.assembleFriend = function (e) {
            var t = +new Date;
            return {account: e, alias: "", createTime: t, custom: "", updateTime: t, valid: !0}
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(31), i = n(9).fn, o = n(56), s = n(44), a = n(36), c = n(37), u = n(11), l = u.objs2accounts, f = u.teams2ids, d = n(19);
        i.processTeam = function (e) {
            var t, n, i, a = this, c = e.error;
            switch (e.cmd) {
                case"createTeam":
                    t = e.obj.team, c || (t = e.content.team), t = o.reverse(t), e.obj.team = t, i = s.assembleOwner(t), e.obj.owner = i, c || a.onCreateTeam(t, i);
                    break;
                case"syncCreateTeam":
                    t = o.reverse(e.content.team), d.info("on sync createTeam", t), i = s.assembleOwner(t), a.options.onsynccreateteam(t, i), a.onCreateTeam(t, i);
                    break;
                case"sendTeamMsg":
                    a.onSendMsg(e);
                    break;
                case"teamMsg":
                    a.onMsg(e);
                    break;
                case"teamMsgs":
                    a.onMsgs(e);
                    break;
                case"addTeamMembers":
                case"removeTeamMembers":
                case"leaveTeam":
                case"dismissTeam":
                case"addTeamManagers":
                case"removeTeamManagers":
                case"transferTeam":
                    break;
                case"updateInfoInTeam":
                    n = e.obj, n.account = r.account, n.id = s.genId(n.teamId, n.account), n = s.reverse(n), e.obj = n, a.onTeamMember(n);
                    break;
                case"updateNickInTeam":
                    e.obj = s.reverse(e.obj);
                    break;
                case"updateTeam":
                    e.obj = o.reverse(e.obj);
                    break;
                case"applyTeam":
                    e.error || (e.obj = o.reverse(e.content.team));
                    break;
                case"passTeamApply":
                    a.updateTeamSysMsgState(e, "passed");
                    break;
                case"rejectTeamApply":
                    a.updateTeamSysMsgState(e, "rejected");
                    break;
                case"acceptTeamInvite":
                    a.updateTeamSysMsgState(e, "passed"), e.error || (e.obj = o.reverse(e.content.team));
                    break;
                case"rejectTeamInvite":
                    a.updateTeamSysMsgState(e, "rejected");
                    break;
                case"getTeam":
                    e.error || (e.obj = o.reverse(e.content.team));
                    break;
                case"getTeams":
                    a.onTeams(e);
                    break;
                case"getTeamMembers":
                    a.onTeamMembers(e);
                    break;
                case"syncTeams":
                    a.onTeams(e);
                    break;
                case"syncTeamMembers":
                    a.onTeamMembers(e);
                    break;
                case"getTeamHistoryMsgs":
                case"searchTeamHistoryMsgs":
                    a.onHistoryMsgs(e);
                    break;
                case"syncSendTeamMsg":
                    a.onMsg(e);
                    break;
                case"syncUpdateTeamMember":
                    n = s.reverse(e.content.teamMember), d.info("on update teamMember", n), a.options.onupdateteammember(n), a.onTeamMember(n)
            }
        }, i.onCreateTeam = function (e, t) {
            a.putTeam(e), a.putTeamMembers(t)
        }, i.onTeams = function (e) {
            function t() {
                p && l.forEach(function (e) {
                    e = o.reverse(e), e.validToCurrentUser ? m.push(e) : y.push(e)
                }), d.warn("parse teams", f(m), m, "invalid", f(y), y), l.length ? (p = !0, i = e.content.timetag) : p = !1
            }

            function n(t, n) {
                e.promise = new Promise(function (e, o) {
                    function s() {
                        u ? (r(), e(), t()) : a.getTeams().then(function (n) {
                            m = n, r(), e(), t()
                        }).then(void 0, function (e) {
                            e._msg = "get teams error", o(e), n(e)
                        })
                    }

                    p ? a.mergeTeams(m, y, i).then(function () {
                        s()
                    }).then(void 0, function (e) {
                        e._msg = "merge teams error", o(e), n(e)
                    }) : (d.warn("no merge teams"), s())
                }).then(void 0, function (e) {
                    throw e._msg = "merge teams data error", n(e), e
                })
            }

            function r() {
                s.timetags.teams = i, m.invalid = y, u ? (s.syncResult.teams = m, s.syncResult.invalidTeams = y) : (d.warn("get teams", f(m), m), e.obj = m)
            }

            e.content = e.content || {};
            var i, s = this, u = s.packetFromSync(e), l = e.content.teams || [], p = !0, m = [], y = [];
            if (e.error)switch (e.error.code) {
                case 803:
                    e.error = null, p = !1
            }
            var h = new Promise(function (i, o) {
                e.error ? o(e.error) : (t(), c.db ? n(i, o) : (r(), i()))
            });
            u && (h.cmd = "teams", s.syncPromiseArray.push(h))
        }, i.onTeamMembers = function (e) {
            function t() {
                m && p.forEach(function (e) {
                    e = s.reverse(e), e.valid ? y.push(e) : h.push(e)
                }), d.warn("parse members", o, l(y), y, "invalid", l(h), h), p.length ? (m = !0, i = e.content.timetag) : m = !1
            }

            function n(t, n) {
                e.promise = new Promise(function (e, s) {
                    function c() {
                        f ? (r(), e(), t()) : a.getTeamMembers(o).then(function (n) {
                            y = n, r(), e(), t()
                        }).then(void 0, function (e) {
                            e._msg = "get members error", s(e), n(e)
                        })
                    }

                    m ? a.mergeTeamMembers(o, y, h, i).then(function () {
                        c()
                    }).then(void 0, function (e) {
                        e._msg = "merge members error " + o, s(e), n(e)
                    }) : (d.warn("no merge members", o), c())
                }).then(void 0, function (e) {
                    throw e._msg = "merge members data error", n(e), e
                })
            }

            function r() {
                y.invalid = h, f ? (u.syncTeamMembersResult[o] = y, u.syncTeamMembersResult[o + "-invalid"] = h, u.timetags["team-" + o] = i) : (d.warn("get members", o, l(y), y), e.obj = {
                    teamId: o,
                    members: y
                })
            }

            e.content = e.content || {};
            var i, o, u = this, f = u.packetFromSync(e), p = e.content.members || [], m = !0, y = [], h = [];
            if (e.obj && (o = e.obj.teamId), o || (o = e.content.teamId), o = "" + o, e.error)switch (e.error.code) {
                case 406:
                    e.error = null, m = !1
            }
            var g = new Promise(function (i, o) {
                e.error ? o(e.error) : (t(), c.db ? n(i, o) : (r(), i()))
            });
            f && (g.cmd = o, u.syncTeamMembersPromiseArray.push(g))
        }, i.onTeamMember = function (e) {
            d.warn("parse update member", e), c.db && a.updateTeamMember(e)
        }, i.updateTeamSysMsgState = function (e, t) {
            var n, r = e.error;
            r && (t = "error", r = u.filterObj(r, "code message")), n = {
                idServer: e.obj.idServer,
                state: t
            }, r && (n.error = r), this.updateSysMsg(n)
        }
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            switch (i.verifyOptions(e, "action"), e.action) {
                case"create":
                    i.verifyOptions(e, "teamId", !1), i.verifyOptions(e, "type name"), i.verifyParamValid("type", e.type, l), "normal" === e.type && i.verifyOptions(e, "intro announcement joinMode custom", !1);
                    break;
                case"update":
                    i.verifyOptions(e, "teamId"), o(e.name) && i.verifyOptions(e, "name"), i.verifyOptions(e, "type", !1)
            }
            o(e.teamId) && (this.teamId = e.teamId), o(e.type) && (this.type = s[e.type]), o(e.name) && (this.name = "" + e.name), o(e.intro) && (this.intro = "" + e.intro), o(e.announcement) && (this.announcement = "" + e.announcement), o(e.joinMode) && (i.verifyParamValid("joinMode", e.joinMode, f), this.joinMode = c[e.joinMode]), o(e.custom) && (this.custom = "" + e.custom)
        }

        var i = n(11), o = i.notundef, s = {normal: 0, advanced: 1}, a = {0: "normal", 1: "advanced"}, c = {
            noVerify: 0,
            needVerify: 1,
            rejectAll: 2
        }, u = {0: "noVerify", 1: "needVerify", 2: "rejectAll"};
        r.reverse = function (e) {
            var t = i.filterObj(e, "teamId name type owner level selfCustom valid memberNum memberUpdateTime createTime updateTime validToCurrentUser");
            return o(t.teamId) && (t.teamId = "" + t.teamId), o(t.type) && (t.type = a[t.type]), o(t.level) && (t.level = +t.level), o(t.valid) && (t.valid = "1" === t.valid), o(t.memberNum) && (t.memberNum = +t.memberNum), o(t.memberUpdateTime) && (t.memberUpdateTime = +t.memberUpdateTime), o(t.createTime) && (t.createTime = +t.createTime), o(t.updateTime) && (t.updateTime = +t.updateTime), o(t.validToCurrentUser) && (t.validToCurrentUser = "1" === t.validToCurrentUser), "advanced" !== t.type && e.type || (t = i.merge(t, i.filterObj(e, "intro announcement joinMode bits custom serverCustom")), o(t.joinMode) && (t.joinMode = u[t.joinMode])), t
        };
        var l = Object.keys(s), f = Object.keys(c);
        e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn;
        r.processNotify = function (e) {
            var t = this;
            switch (e.cmd) {
                case"syncOfflineMsgs":
                    t.onOfflineMsgs(e);
                    break;
                case"batchMarkRead":
                    break;
                case"syncOfflineSysMsgs":
                    t.onOfflineSysMsgs(e);
                    break;
                case"syncRoamingMsgs":
                    t.onRoamingMsgs(e);
                    break;
                case"syncOfflineFilterMsgs":
                    t.onOfflineMsgs(e, !0);
                    break;
                case"syncOfflineFilterSysMsgs":
                    t.onOfflineSysMsgs(e, !0)
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn, i = n(59);
        r.processMisc = function (e) {
            switch (e.cmd) {
                case"getNosToken":
                    e.error || (e.obj = e.content.nosToken);
                    break;
                case"processImage":
                    e.obj.imageOps = i.reverseImageOps(e.obj.imageOps), e.error || (e.obj = {url: e.content.url})
            }
        }
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            i.verifyOptions(e, "type"), i.verifyParamValid("type", e.type, r.validTypes), i.merge(this, e), this.type = o[e.type]
        }

        var i = n(11), o = {blur: 2, quality: 3, crop: 4, rotate: 5, thumbnail: 7, interlace: 9}, s = {
            0: "stripMeta",
            1: "type",
            2: "blur",
            3: "quality",
            4: "crop",
            5: "rotate",
            6: "pixel",
            7: "thumbnail",
            8: "watermark",
            9: "interlace",
            10: "tmp"
        };
        r.validTypes = Object.keys(o), r.reverse = function (e) {
            var t = i.copy(e);
            return t.type = s[t.type], t
        }, r.reverseImageOps = function (e) {
            return e.map(function (e) {
                return r.reverse(e)
            })
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn, i = n(61), o = i.Message, s = n(44), a = n(72), c = n(16), u = n(11), l = u.undef, f = n(31), d = n(36), p = n(37), m = n(19), y = o.getMaxTimetag, h = Promise.resolve();
        r.processMessage = function (e) {
            var t = this;
            switch (e.cmd) {
                case"sendMsg":
                    t.onSendMsg(e);
                    break;
                case"msg":
                    t.onMsg(e);
                    break;
                case"sysMsg":
                    t.onSysMsg(e);
                    break;
                case"sendCustomSysMsg":
                    t.onSendSysMsg(e);
                    break;
                case"getHistoryMsgs":
                case"searchHistoryMsgs":
                    t.onHistoryMsgs(e);
                    break;
                case"syncSendMsg":
                    t.onMsg(e);
                    break;
                case"deleteSessions":
                    t.onDeleteSessions(e)
            }
        }, r.onRoamingMsgs = function (e) {
            var t = this, n = i.reverseMsgs(e.content.msgs), r = y(n);
            n = n.reverse(), n = o.deduplication(n);
            var s = n[0], a = s.sessionId, c = t.putMsg(n, "roamingMsgs").then(function (e) {
                n = e, m.warn("sync roamingMsgs", a, n.length, n), t.syncResult.roamingMsgs = t.syncResult.roamingMsgs || [], t.syncResult.roamingMsgs.push({
                    sessionId: a,
                    scene: s.scene,
                    to: s.target,
                    msgs: n,
                    timetag: r
                })
            });
            c.cmd = "roamingMsgs-" + a, t.syncPromiseArray.push(c)
        }, r.onOfflineMsgs = function (e, t) {
            function n() {
                if (l.length) {
                    var e = y(l), t = l[0].scene, n = l[0].target;
                    r.markMsgRead(l), l = l.reverse(), l = o.deduplication(l), c = r.putMsg(l, "offlineMsgs").then(function (i) {
                        l = i, m.warn("sync", d, f, l.length, l), r.syncResult[d] = r.syncResult[d] || [], r.syncResult[d].push({
                            sessionId: f,
                            scene: t,
                            to: n,
                            msgs: l,
                            timetag: e
                        })
                    }), c.cmd = "offlineMsgs-" + f, r.syncPromiseArray.push(c)
                }
            }

            var r = this, s = null;
            t && (s = {filter: !0});
            var a, c, u = i.reverseMsgs(e.content.msgs, {modifyObj: s}), l = [], f = "", d = t ? "offlineFilterMsgs" : "offlineMsgs";
            u.forEach(function (e) {
                a = e.sessionId, a !== f ? (n(), l = [], l.push(e), f = a) : l.push(e)
            }), n()
        }, r.completeMsg = function (e) {
            return e.from = f.account, e.fromNick = f.myInfo && f.myInfo.nick, e.fromClientType = "Web", e.fromDeviceId = f.deviceId, e
        }, r.onSendMsg = function (e, t) {
            var n = this, r = e.obj.msg;
            n.completeMsg(r), e.error ? r.status = "fail" : (r.idServer = e.content.msg.idServer, r.time = e.content.msg.time, r.status = "success"), r = i.reverse(r), t && (r.filter = !0), e.obj = r, h = Promise.all([h, e.obj.promise]).then(function (e) {
                return e.length || (r.resend = !0), n.updateMsg(r)
            })
        }, r.onMsgs = function (e) {
            var t = this;
            i.reverseMsgs(e.content.msgs, {
                mapper: function (e) {
                    t.handleMsg(e)
                }
            })
        }, r.onMsg = function (e, t) {
            var n = this, r = i.reverse(e.content.msg);
            t && (r.filter = !0), n.handleMsg(r)
        }, r.handleMsg = function (e) {
            var t = this, n = e.time;
            t.markMsgRead(e), h = h.then(function () {
                return t.putMsg(e, "onMsg")
            }).then(function (r) {
                return e = r[0], t.updateRoamingMsgTimetag(n)
            }).then(function () {
                return e ? t.checkUserUpdate(e) : void 0
            }).then(function () {
                if (e) {
                    var n = e.type;
                    switch (m.log("handle" + e.scene + " " + n + " msg" + ("notification" === n ? " " + e.attach.type : ""), e), n) {
                        case"notification":
                            return t.onTeamNotificationMsg(e)
                    }
                }
            }).then(function () {
                e && (m.info("on msg", e), setTimeout(function () {
                    t.options.onmsg(u.copy(e))
                }, 0))
            }).then(void 0, function (e) {
                e._msg = "handle msg error", t.onDBError(e)
            })
        }, r.putMsg = function (e, t) {
            function n(e) {
                ("roamingMsgs" === t || "offlineMsgs" === t) && (r.syncResult.sessions = r.syncResult.sessions || {}, r.syncResult.sessions[e.id] = e)
            }

            if (u.isArray(e) || (e = [e]), e[0].filter)return Promise.resolve(e);
            var r = this, i = Promise.resolve(), s = o.getLastMsg(e), c = s.flow, m = a.genSessionByMsg(s), y = m.id !== f.currSessionId;
            if (n(m), p.db)i = i.then(function () {
                return d.putMsg(e)
            }).then(function (t) {
                e = t
            }); else {
                var h = [];
                e.forEach(function (e) {
                    r.getMsgFromDataSource(e) || h.push(e)
                }), e = h
            }
            return i = i.then(function () {
                return e.length && (s = o.getLastMsg(e), m = a.genSessionByMsg(s), p.db) ? d.putSession(m) : void 0
            }), ("in" === c && "offlineMsgs" === t || "onMsg" === t && y) && (i = i.then(function (t) {
                if (!e.length)return Promise.resolve();
                p.db ? m = t : (t = r.getSessionFromDataSource(m.id), t && (m.unread = t.unread || 0)), m.unread = m.unread || 0;
                var i = 0;
                return e.forEach(function (e) {
                    (l(e.isUnreadable) || e.isUnreadable) && i++
                }), m.unread += i, n(m), p.db ? d.updateSession({id: m.id, unread: m.unread}) : void 0
            })), "onMsg" === t && (i = i.then(function () {
                r.onUpdateSession(m)
            })), i.then(function () {
                return e
            })
        }, r.getMsgFromDataSource = function (e) {
            var t = this.options.dataSource;
            return t && u.isFunction(t.getMsg) ? t.getMsg(e) : void 0
        }, r.updateMsg = function (e) {
            if (e.filter)return Promise.resolve(e);
            m.warn("after send msg");
            var t = this, n = "success" === e.status, r = {id: e.sessionId, lastMsg: e, updateTime: e.time};
            return t.onUpdateSession(r), p.db ? d.updateMsg(e).then(function (e) {
                var t = d.updateSession(r), i = Promise.resolve();
                return n && (i = d.updateRoamingMsgTimetag(e.time)), Promise.all([t, i])
            }) : (n && (t.timetags.roamingMsgs = e.time), Promise.resolve(e))
        }, r.updateRoamingMsgTimetag = function (e) {
            var t = this;
            return p.db ? d.updateRoamingMsgTimetag(e) : (t.timetags.roamingMsgs = e, Promise.resolve(e))
        }, r.checkUserUpdate = function (e) {
            var t = this, n = e.from;
            return n === f.account ? Promise.resolve() : new Promise(function (r) {
                function i() {
                    var e = t.nim.options.dataSource;
                    e && u.isFunction(e.getUser) ? o(e.getUser(n)) : r()
                }

                function o(t) {
                    if (t) {
                        var n = +t.updateTime;
                        u.isNumber(n) && n < e.userUpdateTime ? s() : r()
                    } else s()
                }

                function s() {
                    t.nim.getUser({
                        account: n, sync: !0, done: function (e, n) {
                            e || setTimeout(function () {
                                m.info("on update user", n.account, n), t.options.onupdateuser(n)
                            }, 0), r()
                        }
                    })
                }

                p.db ? d.getUser(n).then(function (e) {
                    e ? o(e) : i()
                }, function () {
                    i()
                }) : i()
            })
        }, r.onTeamNotificationMsg = function (e) {
            var t = this, n = e.attach.type, r = e.from, i = e.to, o = e.time, s = e.attach.team, a = e.attach.account, c = e.attach.accounts;
            switch (n) {
                case"updateTeam":
                    if (!p.db)return;
                    return s.updateTime = o, d.updateTeam(s);
                case"addTeamMembers":
                    return t.onAddTeamMembers(e, s, c);
                case"removeTeamMembers":
                    return t.onRemoveTeamMembers(s, i, c);
                case"acceptTeamInvite":
                    return t.onAddTeamMembers(e, s, [r]);
                case"passTeamApply":
                    return t.onAddTeamMembers(e, s, [a]);
                case"addTeamManagers":
                    return t.updateTeamManagers(e, i, c, !0, o);
                case"removeTeamManagers":
                    return t.updateTeamManagers(e, i, c, !1, o);
                case"leaveTeam":
                    return t.onRemoveTeamMembers(s, i, [r]);
                case"dismissTeam":
                    if (!p.db)return;
                    return d.dismissTeam(i, o);
                case"transferTeam":
                    return t.transferTeam(e, s, r, a)
            }
        }, r.onAddTeamMembers = function (e, t, n) {
            var r = this, i = t.teamId, o = s.assembleMembers(t, n), a = -1 === n.indexOf(f.account);
            if (a && (e.attach.members = o), p.db) {
                var c, u = d.putTeam(t);
                return a ? c = d.putTeamMembers(o) : (m.warn("join team", i), u = new Promise(function (e) {
                    r.nim.getTeamMembers({
                        teamId: i, sync: !0, done: function () {
                            e()
                        }
                    })
                })), Promise.all([c, u])
            }
        }, r.onRemoveTeamMembers = function (e, t, n) {
            if (p.db) {
                if (-1 === n.indexOf(f.account)) {
                    var r = d.removeTeamMembersByAccounts(t, n), i = Promise.resolve();
                    return e && (i = d.putTeam(e)), Promise.all([r, i])
                }
                return d.leaveTeam(t)
            }
        }, r.updateTeamManagers = function (e, t, n, r, i) {
            return e.attach.members = n.map(function (e) {
                return {id: s.genId(t, e), type: r ? "manager" : "normal", updateTime: i}
            }), p.db ? d.updateTeamManagers(t, n, r, i) : void 0
        }, r.transferTeam = function (e, t, n, r) {
            var i = t.teamId, o = t.memberUpdateTime, a = {
                id: s.genId(i, n),
                type: "normal",
                updateTime: o
            }, c = {id: s.genId(i, r), type: "owner", updateTime: o};
            return e.attach.members = [a, c], p.db ? d.transferTeam(t, n, r) : void 0
        }, r.onHistoryMsgs = function (e) {
            e.error || (e.obj.msgs = i.reverseMsgs(e.content.msgs))
        }, r.isFilterMsgs = function (e) {
            return !!e[0].filter
        }, r.splitMsgs = function (e, t, n, r) {
            e.forEach(function (e) {
                if (e.filter)r.push(e); else switch (e.scene) {
                    case"p2p":
                        t.push(e);
                        break;
                    case"team":
                        n.push(e)
                }
            })
        }, r.markMsgRead = function (e, t) {
            u.isArray(e) || (e = [e]);
            var n = this;
            if (p.db || n.options.autoMarkRead || t) {
                var r = [], i = [], o = [];
                n.splitMsgs(e, r, i, o), n.markP2pMsgsRead(r), n.markTeamMsgsRead(i), n.markFilterMsgsRead(o)
            }
        }, r.markP2pMsgsRead = function (e) {
            if (e.length) {
                var t = c.idMap.talk.id, n = c.idMap.talk.msg;
                this.doMarkMsgsRead(t, n, e)
            }
        }, r.markTeamMsgsRead = function (e) {
            if (e.length) {
                var t = c.idMap.team.id, n = c.idMap.team.teamMsg;
                this.doMarkMsgsRead(t, n, e)
            }
        }, r.markFilterMsgsRead = function (e) {
            if (e.length) {
                var t = c.idMap.filter.id, n = c.idMap.filter.filterMsg;
                this.doMarkMsgsRead(t, n, e)
            }
        }, r.markSysMsgRead = function (e, t) {
            u.isArray(e) || (e = [e]);
            var n = this;
            if (p.db || n.options.autoMarkRead || t) {
                var r, i;
                n.isFilterMsgs(e) ? (r = c.idMap.filter.id, i = c.idMap.filter.filterSysMsg) : (r = c.idMap.talk.id, i = c.idMap.talk.sysMsg), n.doMarkMsgsRead(r, i, e)
            }
        }, r.doMarkMsgsRead = function (e, t, n) {
            n.length && this.sendCmd("batchMarkRead", {
                sid: e, cid: t, ids: n.map(function (e) {
                    return e.idServer
                })
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(11), i = {}, o = i.Message = n(62), s = i.TextMessage = n(63), a = i.FileMessage = n(64), c = i.GeoMessage = n(68), u = i.CustomMessage = n(69), l = i.TipMessage = n(70), f = i.NotificationMessage = n(71);
        i.validScenes = o.validScenes, i.validTypes = o.validTypes, i.reverse = function (e) {
            var t, n = o.typeReverseMap[e.type] || e.type;
            switch (n) {
                case"text":
                    t = s.reverse(e);
                    break;
                case"image":
                case"audio":
                case"video":
                case"file":
                    t = a.reverse(e);
                    break;
                case"geo":
                    t = c.reverse(e);
                    break;
                case"notification":
                    t = f.reverse(e);
                    break;
                case"tip":
                    t = l.reverse(e);
                    break;
                case"custom":
                    t = u.reverse(e);
                    break;
                default:
                    t = o.reverse(e)
            }
            return t
        }, i.reverseMsgs = function (e, t) {
            var n, o;
            return e.map(function (e) {
                return e = i.reverse(e), t && (n = t.modifyObj, n && (e = r.merge(e, n)), o = t.mapper, r.isFunction(o) && (e = o(e))), e
            })
        }, e.exports = i
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            o.verifyOptions(e, "scene to"), o.verifyParamValid("scene", e.scene, f);
            var t = this;
            t.scene = u[e.scene], t.to = "" + e.to, t.time = +new Date, t.type = d[e.type], t.resend = e.resend ? 1 : 0, e.resend ? (o.verifyOptions(e, "idClient"), t.idClient = e.idClient) : t.idClient = o.guid(), a(e.custom) && (t.custom = "" + e.custom), a(e.pushContent) && (t.pushContent = "" + e.pushContent), a(e.pushPayload) && (t.pushPayload = "" + e.pushPayload), a(e.isHistoryable) && (t.isHistoryable = e.isHistoryable ? 1 : 0), a(e.isRoamingable) && (t.isRoamingable = e.isRoamingable ? 1 : 0), a(e.isSyncable) && (t.isSyncable = e.isSyncable ? 1 : 0), a(e.cc) && (t.cc = e.cc ? 1 : 0), a(e.isPushable) && (t.isPushable = e.isPushable ? 1 : 0), a(e.isOfflinable) && (t.isOfflinable = e.isOfflinable ? 1 : 0), a(e.isUnreadable) && (t.isUnreadable = e.isUnreadable ? 1 : 0), a(e.needPushNick) && (t.needPushNick = e.needPushNick ? 1 : 0)
        }

        var i = n(31), o = n(11), s = o.undef, a = o.notundef, c = n(35), u = {p2p: 0, team: 1}, l = {
            0: "p2p",
            1: "team"
        }, f = Object.keys(u), d = {
            text: 0,
            image: 1,
            audio: 2,
            video: 3,
            geo: 4,
            notification: 5,
            file: 6,
            tip: 10,
            custom: 100
        }, p = {
            0: "text",
            1: "image",
            2: "audio",
            3: "video",
            4: "geo",
            5: "notification",
            6: "file",
            10: "tip",
            100: "custom"
        }, m = Object.keys(d);
        r.prototype.getScene = function () {
            return l[this.scene]
        }, r.reverse = function (e) {
            var t = l[e.scene], n = p[e.type], i = {
                scene: t || e.scene,
                from: e.from,
                fromNick: e.fromNick,
                fromClientType: c.reverseType(e.fromClientType),
                fromDeviceId: e.fromDeviceId,
                to: "" + e.to,
                time: +e.time,
                type: n || e.type,
                isHistoryable: s(e.isHistoryable) || 1 === +e.isHistoryable,
                isRoamingable: s(e.isRoamingable) || 1 === +e.isRoamingable,
                isSyncable: s(e.isSyncable) || 1 === +e.isSyncable,
                cc: s(e.cc) || 1 === +e.cc,
                isPushable: s(e.isPushable) || 1 === +e.isPushable,
                isOfflinable: s(e.isOfflinable) || 1 === +e.isOfflinable,
                isUnreadable: s(e.isUnreadable) || 1 === +e.isUnreadable,
                needPushNick: s(e.needPushNick) || 1 === +e.needPushNick
            };
            return i.target = r.getMsgTarget(i), i.sessionId = i.scene + "-" + i.target, r.setFlow(i), a(e.isMuted) && (i.isMuted = 1 === +e.isMuted), a(e.resend) && (i.resend = 1 === +e.resend), a(e.idClient) && (i.idClient = e.idClient), a(e.idServer) && (i.idServer = "" + e.idServer), a(e.userUpdateTime) && (i.userUpdateTime = +e.userUpdateTime), a(e.custom) && (i.custom = e.custom), a(e.pushContent) && (i.pushContent = e.pushContent), a(e.pushPayload) && (i.pushPayload = e.pushPayload), i.status = e.status || "success", a(e.filter) && (i.filter = e.filter), i
        }, r.setFlow = function (e) {
            var t = i.account, n = t === e.from;
            n && t === e.to && (n = i.deviceId === e.fromDeviceId), e.flow = n ? "out" : "in"
        }, r.deduplication = function (e) {
            var t, n = {}, r = [];
            return e.forEach(function (e) {
                t = e.idClient, n[t] || (n[t] = !0, r.push(e))
            }), r
        }, r.getMsgTarget = function (e) {
            return "p2p" === e.scene ? e.to === i.account ? e.from : e.to : "team" === e.scene ? e.to : void 0
        }, r.getLastMsg = function (e) {
            var t = e[0] || {}, n = e[1] || {}, r = t.time || 0, i = n.time || 0, o = t;
            return i > r && (o = e[e.length - 1]), o
        }, r.getMaxTimetag = function (e) {
            return r.getLastMsg(e).time
        }, r.validScenes = f, r.validTypes = m, r.typeReverseMap = p, e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            o.verifyOptions(e, "text"), e.type = "text", i.call(this, e), this.body = e.text
        }

        var i = n(62), o = n(11);
        r.prototype = Object.create(i.prototype), r.reverse = function (e) {
            var t = i.reverse(e);
            return t.text = e.body, t
        }, e.exports = r;
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            switch (o.notundef(e.type) ? o.verifyFileType(e.type) : e.type = "file", o.verifyOptions(e, "file"), o.verifyOptions(e.file, "url ext size md5", !0, "file."), e.type) {
                case"image":
                    s.verifyFile(e.file);
                    break;
                case"audio":
                    a.verifyFile(e.file);
                    break;
                case"video":
                    c.verifyFile(e.file)
            }
            i.call(this, e), this.attach = JSON.stringify(e.file)
        }

        var i = n(62), o = n(11);
        r.prototype = Object.create(i.prototype), r.reverse = function (e) {
            var t = i.reverse(e);
            return e.attach = e.attach ? "" + e.attach : "", t.file = e.attach ? JSON.parse(e.attach) : {}, "audio" === t.type && (t.file.url += "?audioTrans&type=mp3"), t
        }, e.exports = r;
        var s = n(65), a = n(66), c = n(67)
    }, function (e, t, n) {
        "use strict";
        function r() {
        }

        var i = n(11), o = n(64);
        r.prototype = Object.create(o.prototype), r.verifyFile = function (e) {
            i.verifyOptions(e, "w h", !0, "file.")
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r() {
        }

        var i = n(64), o = n(11);
        r.prototype = Object.create(i.prototype), r.verifyFile = function (e) {
            o.verifyOptions(e, "dur", !0, "file.")
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r() {
        }

        var i = n(64), o = n(11);
        r.prototype = Object.create(i.prototype), r.verifyFile = function (e) {
            o.verifyOptions(e, "dur w h", !0, "file.")
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            o.verifyOptions(e, "geo"), o.verifyOptions(e.geo, "lng lat title", !0, "geo."), o.verifyParamType("geo.lng", e.geo.lng, "number"), o.verifyParamType("geo.lat", e.geo.lat, "number"), o.verifyParamType("geo.title", e.geo.title, "string"), i.call(this, e), this.attach = JSON.stringify(e.geo)
        }

        var i = n(62), o = n(11);
        r.prototype = Object.create(i.prototype), r.reverse = function (e) {
            var t = i.reverse(e);
            return e.attach = e.attach ? "" + e.attach : "", t.geo = e.attach ? JSON.parse(e.attach) : {}, t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            o.verifyOptions(e, "content"), i.call(this, e), this.attach = e.content
        }

        var i = n(62), o = n(11);
        r.prototype = Object.create(i.prototype), r.reverse = function (e) {
            var t = i.reverse(e);
            return o.notundef(e.attach) && (t.content = e.attach), t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            i.call(this, e)
        }

        var i = n(69);
        r.prototype = Object.create(i.prototype), r.reverse = function (e) {
            var t = i.reverse(e);
            return t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r() {
        }

        var i = n(11), o = n(62), s = n(15), a = n(56), c = {
            0: "addTeamMembers",
            1: "removeTeamMembers",
            2: "leaveTeam",
            3: "updateTeam",
            4: "dismissTeam",
            5: "passTeamApply",
            6: "transferTeam",
            7: "addTeamManagers",
            8: "removeTeamManagers",
            9: "acceptTeamInvite"
        };
        r.reverse = function (e) {
            var t = o.reverse(e);
            if (e.attach = e.attach ? "" + e.attach : "", e.attach) {
                var n = JSON.parse(e.attach);
                if (t.attach = {type: c[n.id]}, i.notundef(n.data)) {
                    var r = n.data;
                    i.notundef(r.tinfo) && (t.attach.team = a.reverse(s.unserialize(r.tinfo, "team"))), i.notundef(r.ids) && (t.attach.accounts = r.ids), i.notundef(r.id) && (t.attach.account = r.id)
                }
            } else t.attach = {};
            return t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r() {
        }

        var i = n(37);
        r.parse = function (e) {
            var t = e.split("|");
            return {scene: t[0], to: t[1]}
        }, r.genSessionByMsg = function (e) {
            var t = {
                id: e.sessionId,
                scene: e.scene,
                to: e.target,
                updateTime: e.time,
                lastMsg: e,
                hasMoreLocalMsgs: i.db
            };
            return t
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn, i = n(74), o = n(11), s = n(31), a = n(19), c = n(36), u = n(37), l = Promise.resolve();
        r.splitSysMsgs = function (e, t) {
            for (var n, r = e.length - 1; r >= 0; r--)n = e[r], i.isCustom(n) && (e.splice(r, 1), t.push(n))
        }, r.onOfflineSysMsgs = function (e, t) {
            var n = this, r = e.content.sysMsgs.map(function (e) {
                return e = i.reverse(e), t && (e.filter = !0), e
            });
            r = r.reverse(), n.markSysMsgRead(r);
            var o = [];
            n.splitSysMsgs(r, o);
            var s = t ? "offlineFilterSysMsgs" : "offlineSysMsgs", c = t ? "offlineFilterCustomSysMsgs" : "offlineCustomSysMsgs", u = n.putSysMsg(r, "offlineSysMsgs").then(function (e) {
                r = e, r.length && (a.warn("sync", s, r.length, r), n.syncResult[s] = r)
            });
            u.cmd = "sysMsgs", n.syncPromiseArray.push(u), o.length && (a.warn("sync " + c, o), n.syncResult[c] = o)
        }, r.onSendSysMsg = function (e, t) {
            e.obj.from = s.account, e.obj = i.reverse(e.obj), t && (e.obj.filter = !0)
        }, r.onSysMsg = function (e, t) {
            var n = this, r = i.reverse(e.content.sysMsg);
            n.markSysMsgRead(r), t && (r.filter = !0), i.isCustom(r) ? (a.info("on customSysMsg", r), n.options.oncustomsysmsg(r)) : n.handleSysMsg(r)
        }, r.handleSysMsg = function (e) {
            var t = this, n = e.type, r = e.from;
            l = l.then(function () {
                return t.putSysMsg(e, "onSysMsg")
            }).then(function (t) {
                e = t[0]
            }).then(function () {
                if (e) {
                    var i, o = Promise.resolve();
                    switch (n) {
                        case"addFriend":
                            i = {type: "addFriend", account: r}, o = t.onFriendRequest(i);
                            break;
                        case"passFriendApply":
                            i = {type: "passFriendApply", account: r}, o = t.onFriendRequest(i);
                            break;
                        case"deleteFriend":
                            o = t.onDeleteFriend({account: r})
                    }
                    return i && i.friend && (e.friend = i.friend), o
                }
            }).then(function () {
                e && (a.info("on sysMsg", n, e), setTimeout(function () {
                    t.options.onsysmsg(e)
                }, 0))
            })
        }, r.putSysMsg = function (e, t) {
            if (o.isArray(e) || (e = [e]), e[0].filter)return Promise.resolve(e);
            var n = this, r = Promise.resolve();
            if (u.db)r = r.then(function () {
                return c.putSysMsg(e)
            }).then(function (t) {
                e = t
            }); else {
                var i = [];
                e.forEach(function (e) {
                    n.getSysMsgFromDataSource(e) || i.push(e)
                }), e = i
            }
            return r = r.then(function () {
                return e.length ? n.getSysMsgUnread().then(function (r) {
                    return n.updateSysMsgUnread(e, r, 1).then(function (e) {
                        "offlineSysMsgs" === t && (n.syncResult.sysMsgUnread = e), "onSysMsg" === t && n.onUpdateSysMsgUnread(e)
                    })
                }) : Promise.resolve()
            }), r.then(function () {
                return e
            })
        }, r.getSysMsgFromDataSource = function (e) {
            var t = this.options.dataSource;
            return t && o.isFunction(t.getSysMsg) ? t.getSysMsg(e) : void 0
        }, r.getSysMsgUnread = function () {
            var e = this;
            return new Promise(function (t) {
                u.db ? c.getSysMsgUnread().then(function (e) {
                    t(e)
                }, function () {
                    t(e.getSysMsgUnreadFromDataSource())
                }) : t(e.getSysMsgUnreadFromDataSource())
            })
        }, r.getSysMsgUnreadFromDataSource = function () {
            return this.sysMsgUnread || {}
        }, r.updateSysMsgUnread = function (e, t, n) {
            o.isArray(e) || (e = [e]), t = t || {};
            var r;
            return e.forEach(function (e) {
                r = e.type, t[r] = (t[r] || 0) + n
            }), t = i.completeUnread(t), this.sysMsgUnread = t, c.support ? c.updateSysMsgUnread(t) : Promise.resolve(t)
        }, r.onUpdateSysMsgUnread = function (e) {
            var t = this;
            setTimeout(function () {
                a.info("on update sysMsg unread", e), t.options.onupdatesysmsgunread(e)
            }, 0)
        }, r.updateSysMsg = function (e) {
            var t, n = this;
            t = u.db ? c.updateSysMsg(e) : Promise.resolve(e), t.then(function (e) {
                n.onUpdateSysMsg(e)
            })
        }, r.onUpdateSysMsg = function (e) {
            var t = this;
            setTimeout(function () {
                o.isArray(e) || (e = [e]), e.forEach(function (e) {
                    a.info("on update sysMsg", e), t.options.onupdatesysmsg(e)
                })
            }, 0)
        }
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            var t = this;
            i.verifyOptions(e, "type to"), i.verifyParamValid("type", e.type, r.validTypes), -1 !== e.type.indexOf("custom") && (i.verifyOptions(e, "content"), t.attach = e.content, s(e.apnsText) && (t.apnsText = "" + e.apnsText), s(e.pushPayload) && (t.pushPayload = "" + e.pushPayload), s(e.sendToOnlineUsersOnly) && (t.sendToOnlineUsersOnly = e.sendToOnlineUsersOnly ? 0 : 1), s(e.cc) && (t.cc = e.cc ? 1 : 0), s(e.isPushable) && (t.isPushable = e.isPushable ? 1 : 0), s(e.isUnreadable) && (t.isUnreadable = e.isUnreadable ? 1 : 0), s(e.needPushNick) && (t.needPushNick = e.needPushNick ? 1 : 0)), t.time = +new Date, t.to = e.to, t.type = l[e.type], t.idClient = i.guid()
        }

        var i = n(11), o = i.undef, s = i.notundef, a = n(15), c = n(56), u = n(44), l = {
            customP2p: 100,
            customTeam: 101
        }, f = {
            0: "applyTeam",
            1: "rejectTeamApply",
            2: "teamInvite",
            3: "rejectTeamInvite",
            5: "friendRequest",
            6: "deleteFriend",
            100: "customP2p",
            101: "customTeam",
            102: "customP2p"
        }, d = {
            1: "addFriend",
            2: "applyFriend",
            3: "passFriendApply",
            4: "rejectFriendApply"
        }, p = "team", m = "friend", y = {
            applyTeam: p,
            rejectTeamApply: p,
            teamInvite: p,
            rejectTeamInvite: p,
            addFriend: m,
            applyFriend: m,
            passFriendApply: m,
            rejectFriendApply: m,
            deleteFriend: m
        };
        r.validTypes = Object.keys(l).concat(Object.keys(y)), r.validCategories = ["team", "friend"], r.isCustom = function (e) {
            return "custom" === e.type
        }, r.reverse = function (e) {
            var t = {time: +e.time, to: e.to, type: f[e.type]};
            if (s(e.from) && (t.from = e.from), s(e.idServer) && (t.idServer = "" + e.idServer), s(e.idClient) && (t.idClient = e.idClient), s(e.ps) && (t.ps = e.ps), e.attach = e.attach ? "" + e.attach : "", -1 === t.type.indexOf("custom")) {
                if (e.attach) {
                    t.attach = {};
                    var n = JSON.parse(e.attach);
                    s(n.vt) ? (t.type = d[n.vt], delete t.attach) : (s(n.tinfo) && (t.attach.team = c.reverse(a.unserialize(n.tinfo, "team"))), s(n.tlist) && (t.attach.member = u.reverse(a.unserialize(n.tlist, "teamMember"))))
                }
                t.category = y[t.type], t.read = !1, t.state = "init"
            } else"customTeam" === t.type && (t.to = +t.to), t.content = e.attach, s(e.apnsText) && (t.apnsText = e.apnsText), s(e.pushPayload) && (t.pushPayload = e.pushPayload), i.merge(t, {
                sendToOnlineUsersOnly: o(e.sendToOnlineUsersOnly) || 0 === +e.sendToOnlineUsersOnly,
                cc: o(e.cc) || 1 === +e.cc,
                isPushable: o(e.isPushable) || 1 === +e.isPushable,
                isUnreadable: o(e.isUnreadable) || 1 === +e.isUnreadable,
                needPushNick: s(e.needPushNick) && 1 === +e.needPushNick
            }), t.scene = t.type.slice(6).toLowerCase(), t.type = "custom";
            return s(e.cc) && (t.cc = 1 === +e.cc), t
        }, r.completeUnread = function (e) {
            delete e[p], delete e[m];
            var t;
            return Object.keys(y).forEach(function (n) {
                e[n] = e[n] || 0, e[n] < 0 && (e[n] = 0), t = y[n], e[t] = e[t] || 0, e[t] = e[t] + e[n]
            }), e.total = e[p] + e[m], e
        }, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn, i = n(72), o = n(31), s = n(11), a = n(36), c = n(37), u = n(19);
        r.onDeleteSessions = function (e) {
            e.obj = e.obj.sessions.map(function (e) {
                return i.parse(e)
            })
        }, r.onUpdateSession = function (e) {
            u.info("on update session", e.id, e), delete e.hasMoreLocalMsgs;
            var t = this;
            setTimeout(function () {
                t.options.onupdatesession(e)
            }, 0)
        }, r.setCurrSession = function (e) {
            e = "" + e, o.currSessionId = e, this.resetSessionUnread(e), u.warn("set curr session", e)
        }, r.resetSessionUnread = function (e) {
            function t() {
                r = {id: e, unread: 0}, n.onUpdateSession(r)
            }

            e = "" + e;
            var n = this, r = n.getSessionFromDataSource(e);
            return r ? void(c.db ? a.resetSessionUnread(e).then(function () {
                t()
            }) : t()) : void u.warn("reset session unread, no", e)
        }, r.getSessionFromDataSource = function (e) {
            var t = this.options.dataSource;
            return t && s.isFunction(t.getSession) ? t.getSession(e) : void 0
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(9).fn;
        r.processFilter = function (e) {
            var t = this;
            switch (e.cmd) {
                case"sendFilterMsg":
                    t.onSendMsg(e, !0);
                    break;
                case"filterMsg":
                    t.onMsg(e, !0);
                    break;
                case"filterSysMsg":
                    t.onSysMsg(e, !0);
                    break;
                case"sendFilterCustomSysMsg":
                    t.onSendSysMsg(e, !0)
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(11), i = n(31), o = {};
        o.init = function () {
            var e = "nim_web_sdk_deviceId", t = localStorage[e];
            t || (t = r.guid(), localStorage[e] = t), i.deviceId = t
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(11), o = n(36), s = n(19);
        r.isConnected = function () {
            return this.socket.isConnected()
        }, r.connect = function () {
            this.socket.connect()
        }, r.disconnect = function () {
            o.close(), s.warn("close db"), this.socket.disconnect()
        }, r.kick = function (e) {
            i.verifyOptions(e, "deviceIds"), this.processCallback(e), this.sendCmd("kick", {deviceIds: e.deviceIds.slice(0)}, e.callback)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(11), o = n(37), s = n(36);
        r.markInBlacklist = function (e) {
            i.verifyOptions(e, "account isAdd"), i.verifyParamType("isAdd", e.isAdd, "boolean"), this.processCallback(e), this.sendCmd("markInBlacklist", {
                account: e.account,
                isAdd: e.isAdd
            }, e.callback)
        }, r.addToBlacklist = function (e) {
            e.isAdd = !0, this.markInBlacklist(e)
        }, r.removeFromBlacklist = function (e) {
            e.isAdd = !1, this.markInBlacklist(e)
        }, r.markInMutelist = function (e) {
            i.verifyOptions(e, "account"), i.verifyParamType("isAdd", e.isAdd, "boolean"), this.processCallback(e), this.sendCmd("markInMutelist", {
                account: e.account,
                isAdd: e.isAdd
            }, e.callback)
        }, r.addToMutelist = function (e) {
            e.isAdd = !0, this.markInMutelist(e)
        }, r.removeFromMutelist = function (e) {
            e.isAdd = !1, this.markInMutelist(e)
        }, r.getRelations = function (e) {
            function t() {
                n.sendCmd("getRelations", {timetag: r, NOTSTORE: "timetag"}, e.callback)
            }

            var n = this, r = 0;
            i.verifyOptions(e), n.processCallback(e), o.db ? s.getRelationsTimetag().then(function (e) {
                r = e, t()
            }, t) : t()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(52), o = n(31), s = n(11), a = n(37), c = n(36), u = n(19), l = s.objs2accounts;
        r.updateMyInfo = function (e) {
            s.verifyOptions(e), this.processCallback(e), e.user = new i(e), delete e.user.account, this.sendCmd("updateMyInfo", {
                user: e.user,
                single: !0
            }, e.callback)
        }, r.getMyInfo = function (e) {
            return e.account = o.account, this.getUser(e)
        }, r.getUser = function (e) {
            function t() {
                i.sendCmd("getUsers", {accounts: [r], single: !0}, e.callback)
            }

            function n(e) {
                u.warn("get user", r, e)
            }

            var r, i = this;
            s.verifyOptions(e, "account"), i.processCallback(e), e.cbaop = function (e, t) {
                return e ? void 0 : (t = t[0] || null, n(t), t)
            }, r = e.account, e.sync ? t() : a.db ? c.getUser(r).then(function (r) {
                r ? (n(r), e.done(null, r)) : t()
            }, t) : t()
        }, r.getUsers = function (e) {
            function t() {
                i.sendCmd("getUsers", {accounts: r, single: !0}, e.callback)
            }

            function n(e) {
                u.warn("get users", l(e), e)
            }

            var r, i = this, o = [];
            s.verifyOptions(e, "accounts"), s.verifyParamType("accounts", e.accounts, "array"), i.processCallback(e), e.cbaop = function (e, t) {
                return e ? void 0 : (t = t.concat(o), n(t), t)
            }, r = e.accounts.slice(0), e.sync ? t() : a.db ? c.getUsers(r).then(function (i) {
                if (i && i.length === r.length)n(i), e.done(null, i); else {
                    o = i;
                    var s = l(i), a = [];
                    r.forEach(function (e) {
                        -1 === s.indexOf(e) && a.push(e)
                    }), r = a, t()
                }
            }, t) : t()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(11), o = i.notundef, s = n(54), a = n(36), c = n(37);
        r.friendRequest = function (e) {
            i.verifyOptions(e, "type account"), i.verifyParamValid("type", e.type, s.validTypes()), this.processPs(e), this.processCallback(e);
            var t = {account: e.account, type: s.getByteFromType(e.type), ps: e.ps};
            o(e.idServer) && (t.idServer = e.idServer), this.sendCmd("friendRequest", t, e.callback)
        }, r.addFriend = function (e) {
            e.type = "addFriend", this.friendRequest(e)
        }, r.applyFriend = function (e) {
            e.type = "applyFriend", this.friendRequest(e)
        }, r.passFriendApply = function (e) {
            i.verifyOptions(e, "idServer"), e.type = "passFriendApply", this.friendRequest(e)
        }, r.rejectFriendApply = function (e) {
            i.verifyOptions(e, "idServer"), e.type = "rejectFriendApply", this.friendRequest(e)
        }, r.deleteFriend = function (e) {
            i.verifyOptions(e, "account"), this.processCallback(e), this.sendCmd("deleteFriend", {account: e.account}, e.callback)
        }, r.updateFriend = function (e) {
            this.processCallback(e);
            var t = new s(e);
            this.sendCmd("updateFriend", {friend: t, single: !0}, e.callback)
        }, r.getFriends = function (e) {
            function t() {
                n.sendCmd("getFriends", {timetag: r, NOTSTORE: "timetag"}, e.callback)
            }

            var n = this, r = 0;
            i.verifyOptions(e), n.processCallback(e), c.db ? a.getFriendsTimetag().then(function (e) {
                r = e, t()
            }, t) : t()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(11), o = n(56), s = n(44), a = n(36), c = n(37), u = n(19);
        r.createTeam = function (e) {
            i.verifyOptions(e, "type name"), i.verifyParamType("accounts", e.accounts, "array"), e.action = "create", this.processPs(e), this.processCallback(e), e.team = new o(e);
            var t = {team: e.team, accounts: e.accounts.slice(0), ps: e.ps};
            this.sendCmd("createTeam", t, e.callback)
        }, r.updateTeam = function (e) {
            i.verifyOptions(e, "teamId"), e.action = "update", this.processCallback(e), e.team = new o(e), this.sendCmd("updateTeam", {
                team: e.team,
                single: !0
            }, e.callback)
        }, r.addTeamMembers = function (e) {
            i.verifyOptions(e, "teamId accounts"), i.verifyParamType("accounts", e.accounts, "array"), this.processPs(e), this.processCallback(e);
            var t = {teamId: e.teamId, accounts: e.accounts.slice(0), ps: e.ps};
            this.sendCmd("addTeamMembers", t, e.callback)
        }, r.removeTeamMembers = function (e) {
            i.verifyOptions(e, "teamId accounts"), i.verifyParamType("accounts", e.accounts, "array"), this.processCallback(e);
            var t = {teamId: e.teamId, accounts: e.accounts.slice(0)};
            this.sendCmd("removeTeamMembers", t, e.callback)
        }, r.acceptTeamInvite = function (e) {
            i.verifyOptions(e, "idServer teamId from"), this.processCallback(e);
            var t = {idServer: e.idServer, teamId: e.teamId, from: e.from};
            this.sendCmd("acceptTeamInvite", t, e.callback)
        }, r.rejectTeamInvite = function (e) {
            i.verifyOptions(e, "idServer teamId from"), this.processPs(e), this.processCallback(e);
            var t = {idServer: e.idServer, teamId: e.teamId, from: e.from, ps: e.ps};
            this.sendCmd("rejectTeamInvite", t, e.callback)
        }, r.applyTeam = function (e) {
            i.verifyOptions(e, "teamId"), this.processPs(e), this.processCallback(e);
            var t = {teamId: e.teamId, ps: e.ps};
            this.sendCmd("applyTeam", t, e.callback)
        }, r.passTeamApply = function (e) {
            i.verifyOptions(e, "idServer teamId from"), this.processCallback(e);
            var t = {idServer: e.idServer, teamId: e.teamId, from: e.from};
            this.sendCmd("passTeamApply", t, e.callback)
        }, r.rejectTeamApply = function (e) {
            i.verifyOptions(e, "idServer teamId from"), this.processPs(e), this.processCallback(e);
            var t = {idServer: e.idServer, teamId: e.teamId, from: e.from, ps: e.ps};
            this.sendCmd("rejectTeamApply", t, e.callback)
        }, r.addTeamManagers = function (e) {
            i.verifyOptions(e, "teamId accounts"), i.verifyParamType("accounts", e.accounts, "array"), this.processCallback(e);
            var t = {teamId: e.teamId, accounts: e.accounts.slice(0)};
            this.sendCmd("addTeamManagers", t, e.callback)
        }, r.removeTeamManagers = function (e) {
            i.verifyOptions(e, "teamId accounts"), i.verifyParamType("accounts", e.accounts, "array"), this.processCallback(e);
            var t = {teamId: e.teamId, accounts: e.accounts.slice(0)};
            this.sendCmd("removeTeamManagers", t, e.callback)
        }, r.leaveTeam = function (e) {
            i.verifyOptions(e, "teamId"), this.processCallback(e);
            var t = {teamId: e.teamId};
            this.sendCmd("leaveTeam", t, e.callback)
        }, r.transferTeam = function (e) {
            i.verifyOptions(e, "teamId account leave"), i.verifyParamType("leave", e.leave, "boolean"), this.processCallback(e);
            var t = {teamId: e.teamId, account: e.account, leave: e.leave};
            this.sendCmd("transferTeam", t, e.callback)
        }, r.dismissTeam = function (e) {
            i.verifyOptions(e, "teamId"), this.processCallback(e);
            var t = {teamId: e.teamId};
            this.sendCmd("dismissTeam", t, e.callback)
        }, r.updateInfoInTeam = function (e) {
            i.verifyOptions(e, "teamId"), this.processCallback(e), this.sendCmd("updateInfoInTeam", {
                teamMember: new s(e),
                single: !0
            }, e.callback)
        }, r.updateNickInTeam = function (e) {
            i.verifyOptions(e, "teamId account"), this.processCallback(e), this.sendCmd("updateNickInTeam", {
                teamMember: new s(e),
                single: !0
            }, e.callback)
        }, r.getTeam = function (e) {
            function t() {
                o.sendCmd("getTeam", {teamId: e.teamId}, e.callback)
            }

            function n(e) {
                u.warn("get team", r, e)
            }

            var r, o = this;
            i.verifyOptions(e, "teamId"), o.processCallback(e), e.cbaop = function (e, t) {
                e || n(t)
            }, r = e.teamId, e.sync ? t() : c.db ? a.getTeam(r).then(function (r) {
                r ? (n(r), e.done(null, r)) : t()
            }, t) : t()
        }, r.getTeams = function (e) {
            function t() {
                n.sendCmd("getTeams", {timetag: r, NOTSTORE: "timetag"}, e.callback)
            }

            var n = this, r = 0;
            i.verifyOptions(e), n.processCallback(e), c.db ? a.getTeamsTimetag().then(function (e) {
                r = e, t()
            }, t) : t()
        }, r.getTeamMembers = function (e) {
            function t() {
                n.sendCmd("getTeamMembers", {teamId: e.teamId, timetag: r, NOTSTORE: "timetag"}, e.callback)
            }

            var n = this, r = 0;
            i.verifyOptions(e, "teamId"), n.processCallback(e), c.db ? a.getTeamMembersTimetag(e.teamId).then(function (e) {
                r = e, t()
            }, t) : t()
        }, r.getLocalTeams = function (e) {
            function t() {
                e.teams = r, e.done(n, e)
            }

            var n, r = [];
            i.verifyOptions(e, "teamIds"), i.verifyParamType("teamIds", e.teamIds, "array"), this.processCallback(e), c.db ? a.getTeamsByTeamIds(e.teamIds).then(function (e) {
                r = e.filter(function (e) {
                    return !!e
                }), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.getLocalTeamMembers = function (e) {
            function t() {
                e.members = r, e.done(n, e)
            }

            var n, r = [];
            i.verifyOptions(e, "teamId accounts"), i.verifyParamType("accounts", e.accounts, "array"), this.processCallback(e), c.db ? a.getInvalidTeamMembers(e.teamId, e.accounts).then(function (e) {
                r = e.filter(function (e) {
                    return !!e
                }), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.deleteLocalTeam = function (e) {
            function t() {
                e.done(n, e)
            }

            var n;
            i.verifyOptions(e, "teamId"), this.processCallback(e), c.db ? a.deleteTeam(e.teamId).then(function () {
                t()
            }, function (e) {
                n = e, t()
            }) : t()
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(11), o = i.undef, s = i.notundef, a = n(37), c = n(36);
        r.setCurrSession = function (e) {
            this.socket.setCurrSession(e)
        }, r.resetSessionUnread = function (e) {
            this.socket.resetSessionUnread(e)
        }, r.getLocalSessions = function (e) {
            function t() {
                e.sessions = r, e.done(n, e)
            }

            var n, r = [];
            i.verifyOptions(e), o(e.limit) && (e.limit = 100), i.verifyParamType("limit", e.limit, "number"), i.verifyParamMax("limit", e.limit, 100), s(e.reverse) ? i.verifyParamType("reverse", e.reverse, "boolean") : e.reverse = !1, this.processCallback(e), a.db ? c.getSessions(e).then(function (e) {
                r = e, t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.updateLocalSession = function (e) {
            function t() {
                e.session = r, e.done(n, e)
            }

            var n, r = null;
            if (i.verifyOptions(e, "id"), this.processCallback(e), a.db) {
                var o = i.filterObj(e, "id localCustom");
                c.updateSession(o).then(function (e) {
                    r = e, t()
                }, function (e) {
                    n = e, t()
                })
            } else t()
        }, r.deleteLocalSession = function (e) {
            function t() {
                e.done(n, e)
            }

            var n;
            i.verifyOptions(e, "id"), this.processCallback(e), a.db ? c.deleteSession(e.id).then(function () {
                t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.deleteSession = function (e) {
            i.verifyOptions(e, "scene to"), this.processCallback(e), e.sessions = [{
                scene: e.scene,
                to: e.to
            }], this.deleteSessions(e)
        }, r.deleteSessions = function (e) {
            i.verifyOptions(e, "sessions"), i.verifyParamType("sessions", e.sessions, "array"), e.sessions.forEach(function (e, t) {
                i.verifyOptions(e, "scene to", !0, "sessions[" + t + "].")
            }), this.processCallback(e), this.sendCmd("deleteSessions", {
                sessions: e.sessions.map(function (e) {
                    return e.scene + "|" + e.to
                })
            }, e.callback)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(11), o = i.undef, s = i.notundef, a = n(31), c = n(21), u = n(85), l = n(86), f = n(90), d = n(12), p = n(61), m = n(36), y = n(37);
        r.assignIdClient = function (e) {
            e.idClient = e.idClient || i.guid()
        }, r.sendText = function (e) {
            return i.verifyOptions(e, "scene to text"), i.verifyParamValid("scene", e.scene, p.validScenes), e.type = "text", this.processCallback(e), e.msg = new p.TextMessage(e), this.doSendMsg(e)
        }, r.previewFile = function (e) {
            if (i.verifyOptions(e, "done"), e.type || (e.type = "file"), i.verifyParamPresentJustOne(e, "dataURL blob fileInput"), e.dataURL)e.blob = f.fromDataURL(e.dataURL); else if (e.blob); else if (e.fileInput && (e.fileInput = i.verifyFileInput(e.fileInput), e.fileInput.files && !e.fileInput.files.length))return void e.done(d.newNoFileError("请选择" + e.type + "文件后再预览"), e);
            this.processCallback(e);
            var t = u.genResponseBody(e.type) || {};
            this.getNosToken({
                responseBody: JSON.stringify(t).replace(/\"/gi, '\\"'), callback: function (t, n) {
                    return t ? (this.assignIdClient(e.callback.options), void e.done(t, e.callback.options)) : (e.nosToken = n, void this._doPreviewFile(e))
                }.bind(this)
            })
        }, r._doPreviewFile = function (e) {
            var t = e.uploaddone;
            e.uploaddone = function (n, r) {
                if (n)return n.appendMessage("上传文件失败"), this.assignIdClient(e.callback.options), void e.done(n, e.callback.options);
                if (r = u.parseResponse(r), r.url = c.genDownloadUrl(e.nosToken.bucket, e.params.Object), e.fileInput)r.name = i.getFileName(e.fileInput); else if (e.blob) {
                    r.name = "";
                    var o = e.blob.type;
                    r.ext = o.slice(o.lastIndexOf("/") + 1)
                }
                if (!r.ext) {
                    var s = r.name.lastIndexOf(".");
                    -1 === s ? r.ext = "" : r.ext = r.name.slice(s + 1)
                }
                return e.uploaddone = t, void e.done(null, i.copy(r))
            }.bind(this), e.url = c.genUploadUrl(e.nosToken.bucket), e.params = this.assembleUploadParams(e.nosToken), e.fileName = "file", new l(e)
        }, r.sendFile = function (e) {
            var t = this;
            if (i.verifyOptions(e, "scene to done"), i.verifyParamValid("scene", e.scene, p.validScenes), e.type || (e.type = "file"), i.verifyParamPresentJustOne(e, "dataURL blob fileInput file"), t.processCallback(e), e.dataURL)t._previewAndSendFile(e); else if (e.blob)t._previewAndSendFile(e); else if (e.fileInput) {
                if (e.fileInput = i.verifyFileInput(e.fileInput), e.fileInput.files && !e.fileInput.files.length)return void e.done(d.newNoFileError("请选择" + e.type + "文件后再发送"), e.callback.options);
                t._previewAndSendFile(e)
            } else if (e.file)return e.msg = new p.FileMessage(e), t.doSendMsg(e)
        }, r._previewAndSendFile = function (e) {
            var t = this;
            i.verifyCallback(e, "uploaddone beforesend");
            var n = e.done;
            e.done = function (r, o) {
                r ? (t.assignIdClient(e.callback.options), n(r, e.callback.options)) : (e.done = n, e.uploaddone(null, i.copy(o)), e.file = o, e.msg = new p.FileMessage(e), e.beforesend(t.doSendMsg(e)))
            }.bind(t), t.previewFile(e)
        }, r.assembleUploadParams = function (e) {
            return e ? {
                Object: decodeURIComponent(e.objectName),
                "x-nos-token": e.token,
                "x-nos-entity-type": "json"
            } : null
        }, r.sendGeo = function (e) {
            return i.verifyOptions(e, "scene to geo done"), i.verifyParamValid("scene", e.scene, p.validScenes), e.type = "geo", this.processCallback(e), e.msg = new p.GeoMessage(e), this.doSendMsg(e)
        }, r.sendTipMsg = function (e) {
            return i.verifyOptions(e, "scene to content"), i.verifyParamValid("scene", e.scene, p.validScenes), i.verifyParamType("content", e.content, "string"), e.type = "tip", this.processCallback(e), e.msg = new p.TipMessage(e), this.doSendMsg(e)
        }, r.sendCustomMsg = function (e) {
            return i.verifyOptions(e, "scene to content"), i.verifyParamValid("scene", e.scene, p.validScenes), i.verifyParamType("content", e.content, "string"), e.type = "custom", this.processCallback(e), e.msg = new p.CustomMessage(e), this.doSendMsg(e)
        }, r.doSendMsg = function (e) {
            var t, n, r, o = this, s = e.msg;
            if (e.resend && ("out" !== e.flow || "fail" !== e.status))return i.onError("只能重发发送失败的消息");
            switch (e.callback.options.idClient = e.msg.idClient, s.to === a.account && (s.fromDeviceId = a.deviceId), s.userUpdateTime = a.myInfo && a.myInfo.updateTime, s.getScene()) {
                case"p2p":
                    t = "sendMsg";
                    break;
                case"team":
                    t = "sendTeamMsg"
            }
            return e.filter && (t = "sendFilterMsg", s.filter = !0), r = {msg: s}, n = o.formatReturnMsg(s), r.promise = o.socket.putMsg(n, "sendMsg"), e.cbaop = function (e) {
                return e ? (n.status = "fail", o.socket.updateMsg(n), n) : void 0
            }, o.sendCmd(t, r, e.callback), i.copy(n)
        }, r.formatReturnMsg = function (e) {
            var t = this;
            return e = i.copy(e), t.socket.completeMsg(e), e.status = "sending", e = p.reverse(e)
        }, r.markMsgRead = function (e) {
            var t = this, n = t.socket;
            !e || y.db || n.options.autoMarkRead || n.markMsgRead(e, !0)
        }, r.getHistoryMsgs = function (e) {
            i.verifyOptions(e, "scene to"), i.verifyParamValid("scene", e.scene, p.validScenes), "undefined" == typeof e.beginTime && (e.beginTime = 0), i.verifyParamType("beginTime", e.beginTime, "number"), "undefined" == typeof e.endTime && (e.endTime = 0), i.verifyParamType("endTime", e.endTime, "number"), "undefined" == typeof e.lastMsgId && (e.lastMsgId = "0"), "undefined" == typeof e.limit && (e.limit = 100), i.verifyParamType("limit", e.limit, "number"), i.verifyParamMax("limit", e.limit, 100), s(e.reverse) ? i.verifyParamType("reverse", e.reverse, "boolean") : e.reverse = !1, this.processCallback(e);
            var t;
            switch (e.scene) {
                case"p2p":
                    t = "getHistoryMsgs";
                    break;
                case"team":
                    t = "getTeamHistoryMsgs"
            }
            var n = {
                scene: e.scene,
                to: e.to,
                beginTime: e.beginTime,
                endTime: e.endTime,
                lastMsgId: e.lastMsgId,
                limit: e.limit,
                reverse: e.reverse
            };
            this.sendCmd(t, n, e.callback)
        }, r.searchHistoryMsgs = function (e) {
            i.verifyOptions(e, "scene to keyword"), i.verifyParamValid("scene", e.scene, p.validScenes), "undefined" == typeof e.beginTime && (e.beginTime = 0), i.verifyParamType("beginTime", e.beginTime, "number"), "undefined" == typeof e.endTime && (e.endTime = 0), i.verifyParamType("endTime", e.endTime, "number"), "undefined" == typeof e.limit && (e.limit = 100), i.verifyParamType("limit", e.limit, "number"), i.verifyParamMax("limit", e.limit, 100), s(e.reverse) ? i.verifyParamType("reverse", e.reverse, "boolean") : e.reverse = !1, this.processCallback(e);
            var t;
            switch (e.scene) {
                case"p2p":
                    t = "searchHistoryMsgs";
                    break;
                case"team":
                    t = "searchTeamHistoryMsgs"
            }
            var n = i.filterObj(e, "scene to beginTime endTime keyword limit reverse");
            this.sendCmd(t, n, e.callback)
        }, r.getLocalMsgs = function (e) {
            function t() {
                e.msgs = r, e.done(n, e)
            }

            var n, r = [];
            i.verifyOptions(e, "scene to"), i.verifyParamValid("scene", e.scene, p.validScenes), e.sessionId = e.scene + "-" + e.to, s(e.type) && i.verifyParamValid("type", e.type, p.validTypes), o(e.limit) && (e.limit = 100), i.verifyParamType("limit", e.limit, "number"), i.verifyParamMax("limit", e.limit, 100), s(e.reverse) ? i.verifyParamType("reverse", e.reverse, "boolean") : e.reverse = !1, this.processCallback(e), y.db ? m.getMsgsBySessionId(e).then(function (e) {
                r = e, t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.searchLocalMsgs = function (e) {
            return i.verifyOptions(e, "keyword"), e.type = "text", this.getLocalMsgs(e)
        }, r.getLocalMsgByIdClient = function (e) {
            function t() {
                e.msg = r, e.done(n, e)
            }

            var n, r = null;
            i.verifyOptions(e, "idClient"), this.processCallback(e), y.db ? m.getMsgByIdClient(e.idClient).then(function (e) {
                e && (r = e), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.getLocalMsgsByIdClients = function (e) {
            function t() {
                e.msgs = r, e.done(n, e)
            }

            var n, r = [];
            i.verifyOptions(e, "idClients"), i.verifyParamType("idClients", e.idClients, "array"), this.processCallback(e), y.db ? m.getMsgsByIdClients(e.idClients).then(function (e) {
                r = e.filter(function (e) {
                    return !!e
                }), t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.updateLocalMsg = function (e) {
            function t() {
                e.msg = r, e.done(n, e)
            }

            var n, r = null;
            if (i.verifyOptions(e, "idClient"), this.processCallback(e), y.db) {
                var o = i.filterObj(e, "idClient localCustom");
                m.updateMsg(o).then(function (e) {
                    r = e, t()
                }, function (e) {
                    n = e, t()
                })
            } else t()
        }, r.deleteLocalMsg = function (e) {
            function t() {
                e.done(n, e)
            }

            var n;
            i.verifyOptions(e, "idClient"), this.processCallback(e), y.db ? m.deleteMsg(e.idClient).then(function () {
                t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.deleteLocalMsgsBySession = function (e) {
            function t() {
                e.done(n, e)
            }

            var n;
            i.verifyOptions(e, "scene to"), i.verifyParamValid("scene", e.scene, p.validScenes), e.sessionId = e.scene + "-" + e.to, this.processCallback(e), y.db ? m.deleteMsgsBySessionId(e.sessionId).then(function () {
                t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.deleteAllLocalMsgs = function (e) {
            function t() {
                e.done(n, e)
            }

            var n;
            this.processCallback(e), y.db && m.deleteAllMsgs().then(function () {
                t()
            }, function (e) {
                n = e, t()
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(11), i = {
            file: {md5: "$(Etag)", size: "$(ObjectSize)"},
            image: {md5: "$(Etag)", size: "$(ObjectSize)", w: "$(ImageInfo.Width)", h: "$(ImageInfo.Height)"},
            audio: {md5: "$(Etag)", size: "$(ObjectSize)", dur: "$(AVinfo.Audio.Duration)"},
            video: {
                md5: "$(Etag)",
                size: "$(ObjectSize)",
                dur: "$(AVinfo.Video.Duration)",
                w: "$(AVinfo.Video.Width)",
                h: "$(AVinfo.Video.Height)"
            }
        }, o = {};
        o.genResponseBody = function (e) {
            return e = e || "file", i[e]
        }, o.parseResponse = function (e) {
            return r.notundef(e.size) && (e.size = +e.size), r.notundef(e.w) && (e.w = +e.w), r.notundef(e.h) && (e.h = +e.h), r.notundef(e.dur) && (e.dur = +e.dur), e
        }, e.exports = o
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            this.options = i.copy(e), i.verifyOptions(e, "url fileName"), i.verifyParamPresentJustOne(e, "blob fileInput"), e.fileInput && (e.fileInput = i.verifyFileInput(e.fileInput)), e.type && i.verifyFileType(e.type), e.timeout ? i.verifyParamType("timeout", e.timeout, "number") : e.timeout = 6e5, i.verifyFileUploadCallback(e), a ? u.call(this, e) : f.call(this, e)
        }

        var i = n(11), o = n(87), s = n(12), a = i.notundef(window.FormData), c = 104857600;
        r.prototype.cancel = function () {
            a ? l.call(this) : d.call(this)
        };
        var u = function (e) {
            var t = new window.FormData, n = e.fileName;
            if (e.fileInput) {
                var r = e.type ? i.filterFiles(e.fileInput.files, e.type) : [].slice.call(e.fileInput.files, 0);
                if (!r || !r.length)return void e.uploaddone(s.newWrongFileTypeError("未读取到" + e.type + "类型的文件, 请确保文件选择节点的文件不为空, 并且请确保选择了" + e.type + "类型的文件"));
                var o = e.fileInput.files[0].size;
                if (o > c)return void e.uploaddone(s.newFileTooLargeError("文件大小超过100M"));
                t.append(n, r[0])
            } else e.blob && t.append(n, e.blob);
            e.params && Object.keys(e.params).forEach(function (n) {
                t.append(n, e.params[n])
            });
            var a = new window.XMLHttpRequest;
            this.xhr = a, a.upload.addEventListener("progress", function (t) {
                t.lengthComputable && t.loaded <= t.total && (t.percentage = Math.floor(1e4 * t.loaded / t.total) / 100, e.uploadprogress({
                    total: t.total,
                    loaded: t.loaded,
                    percentage: t.percentage,
                    percentageText: t.percentage + "%"
                }))
            }.bind(this)), a.upload.addEventListener("load", function (t) {
                t.percentage = 100, e.uploadprogress({total: t.total, loaded: t.loaded, percentage: t.percentage})
            }.bind(this)), a.upload.addEventListener("error", function () {
                e.uploaddone(s.newNetworkError())
            }.bind(this)), a.upload.addEventListener("abort", function () {
                e.uploadcancel()
            }.bind(this)), a.upload.addEventListener("timeout", function () {
                e.uploadtimeout(s.newTimeoutError())
            }.bind(this)), a.addEventListener("load", function (t) {
                var n, r, i, o, a = t.target.responseText;
                switch (a && (n = JSON.parse(a)), t.target.status) {
                    case 200:
                        e.uploaddone(null, n);
                        break;
                    default:
                        n = n || {}, r = n.Error || {}, i = r.Code || "unknown", o = r.Message || "未知错误", e.uploaddone(new s(i + "(" + o + ")", i))
                }
            }.bind(this)), a.open("POST", e.url), a.timeout = e.timeout, e.headers && (i.verifyParamType("headers", e.headers, "object"), Object.keys(e.headers).forEach(function (t) {
                a.setRequestHeader(t, e.headers[t])
            })), a.send(t)
        }, l = function () {
            this.xhr.abort()
        }, f = function (e) {
            this.iframe = new o(e)
        }, d = function () {
            this.iframe.cancel(), this.options.uploadcancel()
        };
        e.exports = r
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            this.options = i.copy(e), i.verifyOptions(e, "url fileInput fileName");
            var t = o.html2node('<form style="display:none;"></form>');
            this.form = t, u++;
            var n = "iframe-" + u;
            c[n] = this;
            var r = o.html2node('<iframe src="' + l + '" name="' + n + '"></iframe>');
            this.iframe = r, this.onIframeAddedCallback = m.bind(this, e), s.addEventListener(r, "load", this.onIframeAddedCallback), d(), t.appendChild(r), window.document.body.appendChild(t)
        }

        var i = n(11), o = n(88), s = n(89), a = n(12), c = {}, u = 0, l = "javascript:false;", f = "NEJ-UPLOAD-RESULT:", d = function () {
            var e = !1;
            return function () {
                e || (e = !0, s.addEventListener(window, "message", p))
            }
        }(), p = function (e) {
            var t = e.data;
            if (0 === t.indexOf(f)) {
                t = JSON.parse(t.replace(f, ""));
                var n = c[t.key];
                n && (delete c[t.key], n.onData(decodeURIComponent(t.result)));
            }
        }, m = function (e) {
            var t = this.form, n = this.iframe;
            s.removeEventListener(n, "load", this.onIframeAddedCallback), this.onIframeLoadedCallback = y.bind(this), s.addEventListener(n, "load", this.onIframeLoadedCallback), t.target = n.name;
            var r = -1 === e.url.indexOf("?") ? "?" : "&";
            t.action = e.url + r + "_proxy_=form", t.method = "POST";
            var i = e.fileInput, a = i.cloneNode(!0);
            if (i.parentNode.insertBefore(a, i), i.name = e.fileName, t.appendChild(i), t.enctype = "multipart/form-data", t.encoding = "multipart/form-data", i.setAttribute("form", ""), i.removeAttribute("form"), e.params) {
                var c = Object.keys(e.params);
                c.forEach(function (n) {
                    var r = o.html2node('<input type="hidden"/>');
                    r.name = n, r.value = e.params[n], t.appendChild(r)
                })
            }
            t.submit(), i.name = a.name, i.setAttribute("form", a.getAttribute("form")), a.parentNode.replaceChild(i, a)
        }, y = function () {
            var e, t = this.iframe, n = this.form;
            try {
                if (e = t.contentDocument || t.contentWindow.document, !e || !e.firstChild)throw a.newCORSIframeError()
            } catch (r) {
                e = void 0
            }
            if (e) {
                var i = e.body.textContent || e.body.innerText;
                this.onData(i)
            }
            n.appendChild(o.html2node('<iframe src="' + l + '"></iframe>')), window.setTimeout(function () {
                n.parentNode.removeChild(n)
            }, 0)
        };
        r.prototype.onData = function (e) {
            var t, n, r, i;
            t = JSON.parse(e), t.Error ? (t = t || {}, n = t.Error || {}, r = n.Code || "unknown", i = n.Message || "未知错误", this.options.uploaddone(new a(r + "(" + i + ")", r))) : this.options.uploaddone(null, t)
        }, r.prototype.cancel = function () {
            var e = this.form, t = this.iframe;
            t && (s.removeEventListener(t, "load", this.onIframeLoadedCallback), t.src = l), e && e.parentNode.removeChild(e)
        }, e.exports = r
    }, function (e, t) {
        "use strict";
        var n = {};
        n.html2node = function (e) {
            var t = window.document.createElement("div");
            t.innerHTML = e;
            var n, r, i = [];
            if (t.children)for (n = 0, r = t.children.length; r > n; n++)i.push(t.children[n]); else for (n = 0, r = t.childNodes.length; r > n; n++) {
                var o = t.childNodes[n];
                1 === o.nodeType && i.push(o)
            }
            return i.length > 1 ? t : i[0]
        }, e.exports = n
    }, function (e, t) {
        "use strict";
        var n = {
            addEventListener: function (e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
            }, removeEventListener: function (e, t, n) {
                e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
            }
        };
        e.exports = n
    }, function (e, t) {
        "use strict";
        var n = {};
        n.fromDataURL = function (e) {
            var t;
            t = e.split(",")[0].indexOf("base64") >= 0 ? window.atob(e.split(",")[1]) : window.decodeURIComponent(e.split(",")[1]);
            for (var n = e.split(",")[0].split(":")[1].split(";")[0], r = new window.Uint8Array(t.length), i = 0; i < t.length; i++)r[i] = t.charCodeAt(i);
            return new window.Blob([r], {type: n})
        }, e.exports = n
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(74), o = n(61), s = n(11), a = s.undef, c = s.notundef, u = n(36), l = n(37);
        r.markSysMsgRead = function (e) {
            function t() {
                e.done(n, e)
            }

            var n, r = this, i = Promise.resolve(), o = this.socket;
            s.verifyOptions(e, "sysMsgs");
            var a = e.sysMsgs;
            l.db ? i = u.markSysMsgRead(a).then(function (e) {
                r.socket.onUpdateSysMsg(e)
            }) : o.options.autoMarkRead || o.markSysMsgRead(a, !0), i.then(function () {
                return o.getSysMsgUnread().then(function (e) {
                    return o.updateSysMsgUnread(a, e, -1).then(function (e) {
                        o.onUpdateSysMsgUnread(e), t()
                    })
                })
            }, function (e) {
                n = e, t()
            })
        }, r.sendCustomSysMsg = function (e) {
            s.verifyOptions(e, "scene to content"), s.verifyParamValid("scene", e.scene, o.validScenes), this.processCallback(e), "p2p" === e.scene ? e.type = "customP2p" : e.type = "customTeam", e.sysMsg = new i(e);
            var t = "sendCustomSysMsg";
            return e.filter && (t = "sendFilterCustomSysMsg"), this.sendCmd(t, {
                sysMsg: e.sysMsg,
                single: !0
            }, e.callback), e.sysMsg.idClient
        }, r.getLocalSysMsgs = function (e) {
            function t() {
                e.sysMsgs = r, e.done(n, e)
            }

            var n, r = [];
            s.verifyOptions(e), e.category && s.verifyParamValid("category", e.category, i.validCategories), e.type && s.verifyParamValid("type", e.type, i.validTypes), a(e.limit) && (e.limit = 100), s.verifyParamType("limit", e.limit, "number"), s.verifyParamMax("limit", e.limit, 100), c(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean") : e.reverse = !1, this.processCallback(e), l.db ? u.getSysMsgs(e).then(function (e) {
                r = e, t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.updateLocalSysMsg = function (e) {
            function t() {
                e.sysMsg = r, e.done(n, e)
            }

            var n, r = null;
            if (s.verifyOptions(e, "idServer"), this.processCallback(e), l.db) {
                var i = s.filterObj(e, "idServer state localCustom");
                u.updateSysMsg(i).then(function (e) {
                    r = e, t()
                }, function (e) {
                    n = e, t()
                })
            } else t()
        }, r.deleteLocalSysMsg = function (e) {
            function t() {
                e.done(n, e)
            }

            var n;
            s.verifyOptions(e, "idServer"), this.processCallback(e), l.db ? u.deleteSysMsg(e.idServer).then(function () {
                t()
            }, function (e) {
                n = e, t()
            }) : t()
        }, r.deleteAllLocalSysMsgs = function (e) {
            function t() {
                r.socket.onUpdateSysMsgUnread({}), e.done(n, e)
            }

            var n, r = this;
            r.processCallback(e), l.db && u.deleteAllSysMsgs().then(function () {
                t()
            }, function (e) {
                n = e, t()
            })
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(44), o = n(11), s = o.isArray;
        r.mergeObjArray = function (e, t, n) {
            return e || (e = []), t ? (s(t) || (t = [t]), t.length ? (n = n || {}, o.mergeObjArray(e, t, n)) : e) : e
        }, r.cutObjArray = function (e, t, n) {
            return e && t ? (s(t) || (t = [t]), t.length ? (n = n || {}, o.cutObjArray(e, t, n)) : e) : e
        }, r.mergeRelations = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "account"})
        }, r.cutRelations = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "account"})
        }, r.findRelation = function (e, t) {
            return o.findObjInArray(e, {keyPath: "account", value: t})
        }, r.mergeFriends = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "account"})
        }, r.cutFriends = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "account"})
        }, r.cutFriendsByAccounts = function (e, t) {
            s(t) || (t = [t]);
            var n = t.map(function (e) {
                return {account: e}
            });
            return this.cutFriends(e, n)
        }, r.findFriend = function (e, t) {
            return o.findObjInArray(e, {keyPath: "account", value: t})
        }, r.mergeUsers = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "account"})
        }, r.findUser = function (e, t) {
            return o.findObjInArray(e, {keyPath: "account", value: t})
        }, r.mergeTeams = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "teamId"})
        }, r.cutTeams = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "teamId"})
        }, r.findTeam = function (e, t) {
            return o.findObjInArray(e, {keyPath: "teamId", value: t})
        }, r.assembleTeamOwner = i.assembleOwner, r.assembleTeamMembers = i.assembleMembers, r.genTeamMemberId = i.genId, r.mergeTeamMembers = function (e, t) {
            return this.mergeObjArray(e, t)
        }, r.cutTeamMembers = function (e, t) {
            return this.cutObjArray(e, t)
        }, r.cutTeamMembersByAccounts = function (e, t, n) {
            s(n) || (n = [n]);
            var r = i.assembleMembers({teamId: t}, n);
            return this.cutTeamMembers(e, r)
        }, r.findTeamMember = function (e, t) {
            return o.findObjInArray(e, {keyPath: "id", value: t})
        }, r.mergeSessions = function (e, t) {
            return this.mergeObjArray(e, t, {sortPath: "updateTime", desc: !0})
        }, r.cutSessions = function (e, t) {
            return this.cutObjArray(e, t)
        }, r.cutSessionsByIds = function (e, t) {
            s(t) || (t = [t]);
            var n = t.map(function (e) {
                return {id: e}
            });
            return this.cutSessions(e, n)
        }, r.findSession = function (e, t) {
            return o.findObjInArray(e, {keyPath: "id", value: t})
        }, r.mergeMsgs = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "idClient", notSort: !0})
        }, r.cutMsgs = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "idClient"})
        }, r.cutMsgsByIdClients = function (e, t) {
            s(t) || (t = [t]);
            var n = t.map(function (e) {
                return {idClient: e}
            });
            return this.cutMsgs(e, n)
        }, r.findMsg = function (e, t) {
            return o.findObjInArray(e, {keyPath: "idClient", value: t})
        }, r.mergeSysMsgs = function (e, t) {
            return this.mergeObjArray(e, t, {keyPath: "idServer", desc: !0})
        }, r.cutSysMsgs = function (e, t) {
            return this.cutObjArray(e, t, {keyPath: "idServer"})
        }, r.cutSysMsgsByIdServers = function (e, t) {
            s(t) || (t = [t]);
            var n = t.map(function (e) {
                return {idServer: e}
            });
            return this.cutSysMsgs(e, n)
        }, r.findSysMsg = function (e, t) {
            return o.findObjInArray(e, {keyPath: "idServer", value: t})
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(11), o = n(59);
        r.qualityImage = function (e) {
            return this.beforeProcessImage(e, "quality")
        }, r.interlaceImage = function (e) {
            return this.beforeProcessImage(e, "interlace")
        }, r.rotateImage = function (e) {
            return this.beforeProcessImage(e, "rotate")
        }, r.blurImage = function (e) {
            return this.beforeProcessImage(e, "blur")
        }, r.cropImage = function (e) {
            return this.beforeProcessImage(e, "crop")
        }, r.thumbnailImage = function (e) {
            return this.beforeProcessImage(e, "thumbnail")
        }, r.beforeProcessImage = function (e, t) {
            var n = i.copy(e);
            return n.type = t, e.ops = [n], this.processImage(e)
        }, r.processImage = function (e) {
            var t = this;
            i.verifyOptions(e, "url ops"), i.verifyParamType("ops", e.ops, "array");
            var n = e.ops.map(function (e) {
                return i.verifyOptions(e, "type"), i.verifyParamValid("type", e.type, o.validTypes), t["gen" + e.type.slice(0, 1).toUpperCase() + e.type.slice(1) + "Op"](e)
            });
            t.processCallback(e), t.sendCmd("processImage", {url: e.url, imageOps: n}, e.callback)
        }, r.genQualityOp = function (e) {
            i.verifyOptions(e, "quality"), i.verifyParamType("quality", e.quality, "number"), i.verifyParamMin("quality", e.quality, 0), i.verifyParamMax("quality", e.quality, 100);
            var t = Math.round(e.quality);
            return new o({type: e.type, qualityQuality: t})
        }, r.genInterlaceOp = function (e) {
            return new o({type: e.type})
        }, r.genRotateOp = function (e) {
            for (i.verifyOptions(e, "angle"), i.verifyParamType("angle", e.angle, "number"); e.angle < 0;)e.angle = e.angle + 360;
            e.angle = e.angle % 360;
            var t = Math.round(e.angle);
            return new o({type: e.type, rotateAngle: t})
        }, r.genBlurOp = function (e) {
            i.verifyOptions(e, "radius sigma"), i.verifyParamType("radius", e.radius, "number"), i.verifyParamMin("radius", e.radius, 1), i.verifyParamMax("radius", e.radius, 50), i.verifyParamType("sigma", e.sigma, "number"), i.verifyParamMin("sigma", e.sigma, 0);
            var t = Math.round(e.radius), n = Math.round(e.sigma);
            return new o({type: e.type, blurRadius: t, blurSigma: n})
        }, r.genCropOp = function (e) {
            i.verifyOptions(e, "x y width height"), i.verifyParamType("x", e.x, "number"), i.verifyParamMin("x", e.x, 0), i.verifyParamType("y", e.y, "number"), i.verifyParamMin("y", e.y, 0), i.verifyParamType("width", e.width, "number"), i.verifyParamMin("width", e.width, 0), i.verifyParamType("height", e.height, "number"), i.verifyParamMin("height", e.height, 0);
            var t = Math.round(e.x), n = Math.round(e.y), r = Math.round(e.width), s = Math.round(e.height);
            return new o({type: e.type, cropX: t, cropY: n, cropWidth: r, cropHeight: s})
        }, r.genThumbnailOp = function () {
            var e = {cover: "z", contain: "x", crop: "y"};
            return function (t) {
                i.verifyOptions(t, "mode"), i.verifyParamValid("mode", t.mode, Object.keys(e)), "contain" === t.mode ? i.verifyParamAtLeastPresentOne(t, "width height") : i.verifyOptions(t, "width height"), i.undef(t.width) && (t.width = 0), i.undef(t.height) && (t.height = 0), i.verifyParamType("width", t.width, "number"), i.verifyParamMin("width", t.width, 0), i.verifyParamType("height", t.height, "number"), i.verifyParamMin("height", t.height, 0);
                var n = Math.round(t.width), r = Math.round(t.height), s = new o({
                    type: t.type,
                    thumbnailMode: e[t.mode],
                    thumbnailWidth: n,
                    thumbnailHeight: r
                });
                if ("crop" === t.mode && i.notundef(t.axis)) {
                    i.undef(t.axis.x) && (t.axis.x = 5), i.undef(t.axis.y) && (t.axis.y = 5), i.verifyParamMin("axis.x", t.axis.x, 0), i.verifyParamMax("axis.x", t.axis.x, 10), i.verifyParamMin("axis.y", t.axis.y, 0), i.verifyParamMax("axis.y", t.axis.y, 10);
                    var a = Math.round(t.axis.x), c = Math.round(t.axis.y);
                    s.thumbnailAxisX = a, s.thumbnailAxisY = c
                }
                return i.notundef(t.enlarge) && (i.verifyParamType("enlarge", t.enlarge, "boolean"), t.enlarge && (s.thumbnailEnlarge = 1)), s
            }
        }()
    }, function (e, t, n) {
        "use strict";
        var r = n(8).fn, i = n(36), o = n(37);
        r.clearDB = function (e) {
            this.processCallback(e);
            var t = e.done;
            o.db ? i.clear().then(t, t) : t()
        }
    }])
});