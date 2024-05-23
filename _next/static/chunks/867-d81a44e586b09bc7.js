(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [867], {
        24459: function(t, e, r) {
            "use strict";
            e._O = e.Jq = e.KB = e.u8 = e.cv = e.Ar = void 0, e.Ik = e.A9 = e.n_ = e.gM = void 0;
            let i = r(9109);

            function n(t) {
                if (!(t instanceof Uint8Array)) throw TypeError("b must be a Uint8Array")
            }

            function o(t) {
                return n(t), i.Buffer.from(t.buffer, t.byteOffset, t.length)
            }
            class s {
                constructor(t, e) {
                    if (!Number.isInteger(t)) throw TypeError("span must be an integer");
                    this.span = t, this.property = e
                }
                makeDestinationObject() {
                    return {}
                }
                getSpan(t, e) {
                    if (0 > this.span) throw RangeError("indeterminate span");
                    return this.span
                }
                replicate(t) {
                    let e = Object.create(this.constructor.prototype);
                    return Object.assign(e, this), e.property = t, e
                }
                fromArray(t) {}
            }

            function u(t, e) {
                return e.property ? t + "[" + e.property + "]" : t
            }
            e.Ar = s;
            class h extends s {
                isCount() {
                    throw Error("ExternalLayout is abstract")
                }
            }
            class a extends h {
                constructor(t, e = 0, r) {
                    if (!(t instanceof s)) throw TypeError("layout must be a Layout");
                    if (!Number.isInteger(e)) throw TypeError("offset must be integer or undefined");
                    super(t.span, r || t.property), this.layout = t, this.offset = e
                }
                isCount() {
                    return this.layout instanceof l || this.layout instanceof f
                }
                decode(t, e = 0) {
                    return this.layout.decode(t, e + this.offset)
                }
                encode(t, e, r = 0) {
                    return this.layout.encode(t, e, r + this.offset)
                }
            }
            class l extends s {
                constructor(t, e) {
                    if (super(t, e), 6 < this.span) throw RangeError("span must not exceed 6 bytes")
                }
                decode(t, e = 0) {
                    return o(t).readUIntLE(e, this.span)
                }
                encode(t, e, r = 0) {
                    return o(e).writeUIntLE(t, r, this.span), this.span
                }
            }
            class f extends s {
                constructor(t, e) {
                    if (super(t, e), 6 < this.span) throw RangeError("span must not exceed 6 bytes")
                }
                decode(t, e = 0) {
                    return o(t).readUIntBE(e, this.span)
                }
                encode(t, e, r = 0) {
                    return o(e).writeUIntBE(t, r, this.span), this.span
                }
            }

            function c(t) {
                let e = Math.floor(t / 4294967296);
                return {
                    hi32: e,
                    lo32: t - 4294967296 * e
                }
            }

            function d(t, e) {
                return 4294967296 * t + e
            }
            class p extends s {
                constructor(t) {
                    super(8, t)
                }
                decode(t, e = 0) {
                    let r = o(t),
                        i = r.readUInt32LE(e);
                    return d(r.readUInt32LE(e + 4), i)
                }
                encode(t, e, r = 0) {
                    let i = c(t),
                        n = o(e);
                    return n.writeUInt32LE(i.lo32, r), n.writeUInt32LE(i.hi32, r + 4), 8
                }
            }
            class m extends s {
                constructor(t) {
                    super(8, t)
                }
                decode(t, e = 0) {
                    let r = o(t),
                        i = r.readUInt32LE(e);
                    return d(r.readInt32LE(e + 4), i)
                }
                encode(t, e, r = 0) {
                    let i = c(t),
                        n = o(e);
                    return n.writeUInt32LE(i.lo32, r), n.writeInt32LE(i.hi32, r + 4), 8
                }
            }
            class g extends s {
                constructor(t, e, r) {
                    if (!(t instanceof s)) throw TypeError("elementLayout must be a Layout");
                    if (!(e instanceof h && e.isCount() || Number.isInteger(e) && 0 <= e)) throw TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
                    let i = -1;
                    e instanceof h || !(0 < t.span) || (i = e * t.span), super(i, r), this.elementLayout = t, this.count = e
                }
                getSpan(t, e = 0) {
                    if (0 <= this.span) return this.span;
                    let r = 0,
                        i = this.count;
                    if (i instanceof h && (i = i.decode(t, e)), 0 < this.elementLayout.span) r = i * this.elementLayout.span;
                    else {
                        let n = 0;
                        for (; n < i;) r += this.elementLayout.getSpan(t, e + r), ++n
                    }
                    return r
                }
                decode(t, e = 0) {
                    let r = [],
                        i = 0,
                        n = this.count;
                    for (n instanceof h && (n = n.decode(t, e)); i < n;) r.push(this.elementLayout.decode(t, e)), e += this.elementLayout.getSpan(t, e), i += 1;
                    return r
                }
                encode(t, e, r = 0) {
                    let i = this.elementLayout,
                        n = t.reduce((t, n) => t + i.encode(n, e, r + t), 0);
                    return this.count instanceof h && this.count.encode(t.length, e, r), n
                }
            }
            class y extends s {
                constructor(t, e, r) {
                    if (!(Array.isArray(t) && t.reduce((t, e) => t && e instanceof s, !0))) throw TypeError("fields must be array of Layout instances");
                    for (let i of ("boolean" == typeof e && void 0 === r && (r = e, e = void 0), t))
                        if (0 > i.span && void 0 === i.property) throw Error("fields cannot contain unnamed variable-length layout");
                    let i = -1;
                    try {
                        i = t.reduce((t, e) => t + e.getSpan(), 0)
                    } catch (t) {}
                    super(i, e), this.fields = t, this.decodePrefixes = !!r
                }
                getSpan(t, e = 0) {
                    if (0 <= this.span) return this.span;
                    let r = 0;
                    try {
                        r = this.fields.reduce((r, i) => {
                            let n = i.getSpan(t, e);
                            return e += n, r + n
                        }, 0)
                    } catch (t) {
                        throw RangeError("indeterminate span")
                    }
                    return r
                }
                decode(t, e = 0) {
                    n(t);
                    let r = this.makeDestinationObject();
                    for (let i of this.fields)
                        if (void 0 !== i.property && (r[i.property] = i.decode(t, e)), e += i.getSpan(t, e), this.decodePrefixes && t.length === e) break;
                    return r
                }
                encode(t, e, r = 0) {
                    let i = r,
                        n = 0,
                        o = 0;
                    for (let i of this.fields) {
                        let s = i.span;
                        if (o = 0 < s ? s : 0, void 0 !== i.property) {
                            let n = t[i.property];
                            void 0 !== n && (o = i.encode(n, e, r), 0 > s && (s = i.getSpan(e, r)))
                        }
                        n = r, r += s
                    }
                    return n + o - i
                }
                fromArray(t) {
                    let e = this.makeDestinationObject();
                    for (let r of this.fields) void 0 !== r.property && 0 < t.length && (e[r.property] = t.shift());
                    return e
                }
                layoutFor(t) {
                    if ("string" != typeof t) throw TypeError("property must be string");
                    for (let e of this.fields)
                        if (e.property === t) return e
                }
                offsetOf(t) {
                    if ("string" != typeof t) throw TypeError("property must be string");
                    let e = 0;
                    for (let r of this.fields) {
                        if (r.property === t) return e;
                        0 > r.span ? e = -1 : 0 <= e && (e += r.span)
                    }
                }
            }
            class v {
                constructor(t) {
                    this.property = t
                }
                decode(t, e) {
                    throw Error("UnionDiscriminator is abstract")
                }
                encode(t, e, r) {
                    throw Error("UnionDiscriminator is abstract")
                }
            }
            class w extends v {
                constructor(t, e) {
                    if (!(t instanceof h && t.isCount())) throw TypeError("layout must be an unsigned integer ExternalLayout");
                    super(e || t.property || "variant"), this.layout = t
                }
                decode(t, e) {
                    return this.layout.decode(t, e)
                }
                encode(t, e, r) {
                    return this.layout.encode(t, e, r)
                }
            }
            class b extends s {
                constructor(t, e, r) {
                    let i;
                    if (t instanceof l || t instanceof f) i = new w(new a(t));
                    else if (t instanceof h && t.isCount()) i = new w(t);
                    else if (t instanceof v) i = t;
                    else throw TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
                    if (void 0 === e && (e = null), !(null === e || e instanceof s)) throw TypeError("defaultLayout must be null or a Layout");
                    if (null !== e) {
                        if (0 > e.span) throw Error("defaultLayout must have constant span");
                        void 0 === e.property && (e = e.replicate("content"))
                    }
                    let n = -1;
                    e && 0 <= (n = e.span) && (t instanceof l || t instanceof f) && (n += i.layout.span), super(n, r), this.discriminator = i, this.usesPrefixDiscriminator = t instanceof l || t instanceof f, this.defaultLayout = e, this.registry = {};
                    let o = this.defaultGetSourceVariant.bind(this);
                    this.getSourceVariant = function(t) {
                        return o(t)
                    }, this.configGetSourceVariant = function(t) {
                        o = t.bind(this)
                    }
                }
                getSpan(t, e = 0) {
                    if (0 <= this.span) return this.span;
                    let r = this.getVariant(t, e);
                    if (!r) throw Error("unable to determine span for unrecognized variant");
                    return r.getSpan(t, e)
                }
                defaultGetSourceVariant(t) {
                    if (Object.prototype.hasOwnProperty.call(t, this.discriminator.property)) {
                        if (this.defaultLayout && this.defaultLayout.property && Object.prototype.hasOwnProperty.call(t, this.defaultLayout.property)) return;
                        let e = this.registry[t[this.discriminator.property]];
                        if (e && (!e.layout || e.property && Object.prototype.hasOwnProperty.call(t, e.property))) return e
                    } else
                        for (let e in this.registry) {
                            let r = this.registry[e];
                            if (r.property && Object.prototype.hasOwnProperty.call(t, r.property)) return r
                        }
                    throw Error("unable to infer src variant")
                }
                decode(t, e = 0) {
                    let r;
                    let i = this.discriminator,
                        n = i.decode(t, e),
                        o = this.registry[n];
                    if (void 0 === o) {
                        let o = this.defaultLayout,
                            s = 0;
                        this.usesPrefixDiscriminator && (s = i.layout.span), (r = this.makeDestinationObject())[i.property] = n, r[o.property] = o.decode(t, e + s)
                    } else r = o.decode(t, e);
                    return r
                }
                encode(t, e, r = 0) {
                    let i = this.getSourceVariant(t);
                    if (void 0 === i) {
                        let i = this.discriminator,
                            n = this.defaultLayout,
                            o = 0;
                        return this.usesPrefixDiscriminator && (o = i.layout.span), i.encode(t[i.property], e, r), o + n.encode(t[n.property], e, r + o)
                    }
                    return i.encode(t, e, r)
                }
                addVariant(t, e, r) {
                    let i = new M(this, t, e, r);
                    return this.registry[t] = i, i
                }
                getVariant(t, e = 0) {
                    let r;
                    return t instanceof Uint8Array ? r = this.discriminator.decode(t, e) : r = t, this.registry[r]
                }
            }
            class M extends s {
                constructor(t, e, r, i) {
                    if (!(t instanceof b)) throw TypeError("union must be a Union");
                    if (!Number.isInteger(e) || 0 > e) throw TypeError("variant must be a (non-negative) integer");
                    if ("string" == typeof r && void 0 === i && (i = r, r = null), r) {
                        if (!(r instanceof s)) throw TypeError("layout must be a Layout");
                        if (null !== t.defaultLayout && 0 <= r.span && r.span > t.defaultLayout.span) throw Error("variant span exceeds span of containing union");
                        if ("string" != typeof i) throw TypeError("variant must have a String property")
                    }
                    let n = t.span;
                    0 > t.span && 0 <= (n = r ? r.span : 0) && t.usesPrefixDiscriminator && (n += t.discriminator.layout.span), super(n, i), this.union = t, this.variant = e, this.layout = r || null
                }
                getSpan(t, e = 0) {
                    if (0 <= this.span) return this.span;
                    let r = 0;
                    this.union.usesPrefixDiscriminator && (r = this.union.discriminator.layout.span);
                    let i = 0;
                    return this.layout && (i = this.layout.getSpan(t, e + r)), r + i
                }
                decode(t, e = 0) {
                    let r = this.makeDestinationObject();
                    if (this !== this.union.getVariant(t, e)) throw Error("variant mismatch");
                    let i = 0;
                    return this.union.usesPrefixDiscriminator && (i = this.union.discriminator.layout.span), this.layout ? r[this.property] = this.layout.decode(t, e + i) : this.property ? r[this.property] = !0 : this.union.usesPrefixDiscriminator && (r[this.union.discriminator.property] = this.variant), r
                }
                encode(t, e, r = 0) {
                    let i = 0;
                    if (this.union.usesPrefixDiscriminator && (i = this.union.discriminator.layout.span), this.layout && !Object.prototype.hasOwnProperty.call(t, this.property)) throw TypeError("variant lacks property " + this.property);
                    this.union.discriminator.encode(this.variant, e, r);
                    let n = i;
                    if (this.layout && (this.layout.encode(t[this.property], e, r + i), n += this.layout.getSpan(e, r + i), 0 <= this.union.span && n > this.union.span)) throw Error("encoded variant overruns containing union");
                    return n
                }
                fromArray(t) {
                    if (this.layout) return this.layout.fromArray(t)
                }
            }

            function E(t) {
                return 0 > t && (t += 4294967296), t
            }
            class x extends s {
                constructor(t, e, r) {
                    if (!(t instanceof l || t instanceof f)) throw TypeError("word must be a UInt or UIntBE layout");
                    if ("string" == typeof e && void 0 === r && (r = e, e = !1), 4 < t.span) throw RangeError("word cannot exceed 32 bits");
                    super(t.span, r), this.word = t, this.msb = !!e, this.fields = [];
                    let i = 0;
                    this._packedSetValue = function(t) {
                        return i = E(t), this
                    }, this._packedGetValue = function() {
                        return i
                    }
                }
                decode(t, e = 0) {
                    let r = this.makeDestinationObject(),
                        i = this.word.decode(t, e);
                    for (let e of (this._packedSetValue(i), this.fields)) void 0 !== e.property && (r[e.property] = e.decode(t));
                    return r
                }
                encode(t, e, r = 0) {
                    let i = this.word.decode(e, r);
                    for (let e of (this._packedSetValue(i), this.fields))
                        if (void 0 !== e.property) {
                            let r = t[e.property];
                            void 0 !== r && e.encode(r)
                        }
                    return this.word.encode(this._packedGetValue(), e, r)
                }
                addField(t, e) {
                    let r = new _(this, t, e);
                    return this.fields.push(r), r
                }
                addBoolean(t) {
                    let e = new B(this, t);
                    return this.fields.push(e), e
                }
                fieldFor(t) {
                    if ("string" != typeof t) throw TypeError("property must be string");
                    for (let e of this.fields)
                        if (e.property === t) return e
                }
            }
            class _ {
                constructor(t, e, r) {
                    if (!(t instanceof x)) throw TypeError("container must be a BitStructure");
                    if (!Number.isInteger(e) || 0 >= e) throw TypeError("bits must be positive integer");
                    let i = 8 * t.span,
                        n = t.fields.reduce((t, e) => t + e.bits, 0);
                    if (e + n > i) throw Error("bits too long for span remainder (" + (i - n) + " of " + i + " remain)");
                    this.container = t, this.bits = e, this.valueMask = (1 << e) - 1, 32 === e && (this.valueMask = 4294967295), this.start = n, this.container.msb && (this.start = i - n - e), this.wordMask = E(this.valueMask << this.start), this.property = r
                }
                decode(t, e) {
                    return E(this.container._packedGetValue() & this.wordMask) >>> this.start
                }
                encode(t) {
                    if ("number" != typeof t || !Number.isInteger(t) || t !== E(t & this.valueMask)) throw TypeError(u("BitField.encode", this) + " value must be integer not exceeding " + this.valueMask);
                    let e = this.container._packedGetValue(),
                        r = E(t << this.start);
                    this.container._packedSetValue(E(e & ~this.wordMask) | r)
                }
            }
            class B extends _ {
                constructor(t, e) {
                    super(t, 1, e)
                }
                decode(t, e) {
                    return !!super.decode(t, e)
                }
                encode(t) {
                    "boolean" == typeof t && (t = +t), super.encode(t)
                }
            }
            class A extends s {
                constructor(t, e) {
                    if (!(t instanceof h && t.isCount() || Number.isInteger(t) && 0 <= t)) throw TypeError("length must be positive integer or an unsigned integer ExternalLayout");
                    let r = -1;
                    t instanceof h || (r = t), super(r, e), this.length = t
                }
                getSpan(t, e) {
                    let r = this.span;
                    return 0 > r && (r = this.length.decode(t, e)), r
                }
                decode(t, e = 0) {
                    let r = this.span;
                    return 0 > r && (r = this.length.decode(t, e)), o(t).slice(e, e + r)
                }
                encode(t, e, r) {
                    let i = this.length;
                    if (this.length instanceof h && (i = t.length), !(t instanceof Uint8Array && i === t.length)) throw TypeError(u("Blob.encode", this) + " requires (length " + i + ") Uint8Array as src");
                    if (r + i > e.length) throw RangeError("encoding overruns Uint8Array");
                    let n = o(t);
                    return o(e).write(n.toString("hex"), r, i, "hex"), this.length instanceof h && this.length.encode(i, e, r), i
                }
            }
            e.cv = (t, e, r) => new a(t, e, r), e.u8 = t => new l(1, t), e.KB = t => new l(2, t), e.Jq = t => new l(4, t), e._O = t => new p(t), e.gM = t => new m(t), e.n_ = (t, e, r) => new y(t, e, r), e.A9 = (t, e, r) => new g(t, e, r), e.Ik = (t, e) => new A(t, e)
        },
        66400: function(t, e, r) {
            ! function(t, e) {
                "use strict";

                function i(t, e) {
                    if (!t) throw Error(e || "Assertion failed")
                }

                function n(t, e) {
                    t.super_ = e;
                    var r = function() {};
                    r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
                }

                function o(t, e, r) {
                    if (o.isBN(t)) return t;
                    this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && (("le" === e || "be" === e) && (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
                }
                "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
                try {
                    f = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : r(11922).Buffer
                } catch (t) {}

                function s(t, e) {
                    var r = t.charCodeAt(e);
                    return r >= 48 && r <= 57 ? r - 48 : r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : void i(!1, "Invalid character in " + t)
                }

                function u(t, e, r) {
                    var i = s(t, r);
                    return r - 1 >= e && (i |= s(t, r - 1) << 4), i
                }

                function h(t, e, r, n) {
                    for (var o = 0, s = 0, u = Math.min(t.length, r), h = e; h < u; h++) {
                        var a = t.charCodeAt(h) - 48;
                        o *= n, s = a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a, i(a >= 0 && s < n, "Invalid character"), o += s
                    }
                    return o
                }

                function a(t, e) {
                    t.words = e.words, t.length = e.length, t.negative = e.negative, t.red = e.red
                }
                if (o.isBN = function(t) {
                        return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
                    }, o.max = function(t, e) {
                        return t.cmp(e) > 0 ? t : e
                    }, o.min = function(t, e) {
                        return 0 > t.cmp(e) ? t : e
                    }, o.prototype._init = function(t, e, r) {
                        if ("number" == typeof t) return this._initNumber(t, e, r);
                        if ("object" == typeof t) return this._initArray(t, e, r);
                        "hex" === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36);
                        var n = 0;
                        "-" === (t = t.toString().replace(/\s+/g, ""))[0] && (n++, this.negative = 1), n < t.length && (16 === e ? this._parseHex(t, n, r) : (this._parseBase(t, e, n), "le" === r && this._initArray(this.toArray(), e, r)))
                    }, o.prototype._initNumber = function(t, e, r) {
                        t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (i(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), e, r)
                    }, o.prototype._initArray = function(t, e, r) {
                        if (i("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                        this.length = Math.ceil(t.length / 3), this.words = Array(this.length);
                        for (var n, o, s = 0; s < this.length; s++) this.words[s] = 0;
                        var u = 0;
                        if ("be" === r)
                            for (s = t.length - 1, n = 0; s >= 0; s -= 3) o = t[s] | t[s - 1] << 8 | t[s - 2] << 16, this.words[n] |= o << u & 67108863, this.words[n + 1] = o >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, n++);
                        else if ("le" === r)
                            for (s = 0, n = 0; s < t.length; s += 3) o = t[s] | t[s + 1] << 8 | t[s + 2] << 16, this.words[n] |= o << u & 67108863, this.words[n + 1] = o >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, n++);
                        return this._strip()
                    }, o.prototype._parseHex = function(t, e, r) {
                        this.length = Math.ceil((t.length - e) / 6), this.words = Array(this.length);
                        for (var i, n = 0; n < this.length; n++) this.words[n] = 0;
                        var o = 0,
                            s = 0;
                        if ("be" === r)
                            for (n = t.length - 1; n >= e; n -= 2) i = u(t, e, n) << o, this.words[s] |= 67108863 & i, o >= 18 ? (o -= 18, s += 1, this.words[s] |= i >>> 26) : o += 8;
                        else
                            for (n = (t.length - e) % 2 == 0 ? e + 1 : e; n < t.length; n += 2) i = u(t, e, n) << o, this.words[s] |= 67108863 & i, o >= 18 ? (o -= 18, s += 1, this.words[s] |= i >>> 26) : o += 8;
                        this._strip()
                    }, o.prototype._parseBase = function(t, e, r) {
                        this.words = [0], this.length = 1;
                        for (var i = 0, n = 1; n <= 67108863; n *= e) i++;
                        i--, n = n / e | 0;
                        for (var o = t.length - r, s = o % i, u = Math.min(o, o - s) + r, a = 0, l = r; l < u; l += i) a = h(t, l, l + i, e), this.imuln(n), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
                        if (0 !== s) {
                            var f = 1;
                            for (a = h(t, l, t.length, e), l = 0; l < s; l++) f *= e;
                            this.imuln(f), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a)
                        }
                        this._strip()
                    }, o.prototype.copy = function(t) {
                        t.words = Array(this.length);
                        for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                        t.length = this.length, t.negative = this.negative, t.red = this.red
                    }, o.prototype._move = function(t) {
                        a(t, this)
                    }, o.prototype.clone = function() {
                        var t = new o(null);
                        return this.copy(t), t
                    }, o.prototype._expand = function(t) {
                        for (; this.length < t;) this.words[this.length++] = 0;
                        return this
                    }, o.prototype._strip = function() {
                        for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                        return this._normSign()
                    }, o.prototype._normSign = function() {
                        return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
                    }, "undefined" != typeof Symbol && "function" == typeof Symbol.for) try {
                    o.prototype[Symbol.for("nodejs.util.inspect.custom")] = l
                } catch (t) {
                    o.prototype.inspect = l
                } else o.prototype.inspect = l;

                function l() {
                    return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                }
                var f, c = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                    d = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                    p = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

                function m(t, e, r) {
                    r.negative = e.negative ^ t.negative;
                    var i = t.length + e.length | 0;
                    r.length = i, i = i - 1 | 0;
                    var n = 0 | t.words[0],
                        o = 0 | e.words[0],
                        s = n * o,
                        u = 67108863 & s,
                        h = s / 67108864 | 0;
                    r.words[0] = u;
                    for (var a = 1; a < i; a++) {
                        for (var l = h >>> 26, f = 67108863 & h, c = Math.min(a, e.length - 1), d = Math.max(0, a - t.length + 1); d <= c; d++) {
                            var p = a - d | 0;
                            l += (s = (n = 0 | t.words[p]) * (o = 0 | e.words[d]) + f) / 67108864 | 0, f = 67108863 & s
                        }
                        r.words[a] = 0 | f, h = 0 | l
                    }
                    return 0 !== h ? r.words[a] = 0 | h : r.length--, r._strip()
                }
                o.prototype.toString = function(t, e) {
                    if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
                        r = "";
                        for (var r, n = 0, o = 0, s = 0; s < this.length; s++) {
                            var u = this.words[s],
                                h = ((u << n | o) & 16777215).toString(16);
                            o = u >>> 24 - n & 16777215, (n += 2) >= 26 && (n -= 26, s--), r = 0 !== o || s !== this.length - 1 ? c[6 - h.length] + h + r : h + r
                        }
                        for (0 !== o && (r = o.toString(16) + r); r.length % e != 0;) r = "0" + r;
                        return 0 !== this.negative && (r = "-" + r), r
                    }
                    if (t === (0 | t) && t >= 2 && t <= 36) {
                        var a = d[t],
                            l = p[t];
                        r = "";
                        var f = this.clone();
                        for (f.negative = 0; !f.isZero();) {
                            var m = f.modrn(l).toString(t);
                            r = (f = f.idivn(l)).isZero() ? m + r : c[a - m.length] + m + r
                        }
                        for (this.isZero() && (r = "0" + r); r.length % e != 0;) r = "0" + r;
                        return 0 !== this.negative && (r = "-" + r), r
                    }
                    i(!1, "Base should be between 2 and 36")
                }, o.prototype.toNumber = function() {
                    var t = this.words[0];
                    return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
                }, o.prototype.toJSON = function() {
                    return this.toString(16, 2)
                }, f && (o.prototype.toBuffer = function(t, e) {
                    return this.toArrayLike(f, t, e)
                }), o.prototype.toArray = function(t, e) {
                    return this.toArrayLike(Array, t, e)
                }, o.prototype.toArrayLike = function(t, e, r) {
                    this._strip();
                    var n = this.byteLength(),
                        o = r || Math.max(1, n);
                    i(n <= o, "byte array longer than desired length"), i(o > 0, "Requested array length <= 0");
                    var s = t.allocUnsafe ? t.allocUnsafe(o) : new t(o);
                    return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, n), s
                }, o.prototype._toArrayLikeLE = function(t, e) {
                    for (var r = 0, i = 0, n = 0, o = 0; n < this.length; n++) {
                        var s = this.words[n] << o | i;
                        t[r++] = 255 & s, r < t.length && (t[r++] = s >> 8 & 255), r < t.length && (t[r++] = s >> 16 & 255), 6 === o ? (r < t.length && (t[r++] = s >> 24 & 255), i = 0, o = 0) : (i = s >>> 24, o += 2)
                    }
                    if (r < t.length)
                        for (t[r++] = i; r < t.length;) t[r++] = 0
                }, o.prototype._toArrayLikeBE = function(t, e) {
                    for (var r = t.length - 1, i = 0, n = 0, o = 0; n < this.length; n++) {
                        var s = this.words[n] << o | i;
                        t[r--] = 255 & s, r >= 0 && (t[r--] = s >> 8 & 255), r >= 0 && (t[r--] = s >> 16 & 255), 6 === o ? (r >= 0 && (t[r--] = s >> 24 & 255), i = 0, o = 0) : (i = s >>> 24, o += 2)
                    }
                    if (r >= 0)
                        for (t[r--] = i; r >= 0;) t[r--] = 0
                }, Math.clz32 ? o.prototype._countBits = function(t) {
                    return 32 - Math.clz32(t)
                } : o.prototype._countBits = function(t) {
                    var e = t,
                        r = 0;
                    return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r += 4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
                }, o.prototype._zeroBits = function(t) {
                    if (0 === t) return 26;
                    var e = t,
                        r = 0;
                    return (8191 & e) == 0 && (r += 13, e >>>= 13), (127 & e) == 0 && (r += 7, e >>>= 7), (15 & e) == 0 && (r += 4, e >>>= 4), (3 & e) == 0 && (r += 2, e >>>= 2), (1 & e) == 0 && r++, r
                }, o.prototype.bitLength = function() {
                    var t = this.words[this.length - 1],
                        e = this._countBits(t);
                    return (this.length - 1) * 26 + e
                }, o.prototype.zeroBits = function() {
                    if (this.isZero()) return 0;
                    for (var t = 0, e = 0; e < this.length; e++) {
                        var r = this._zeroBits(this.words[e]);
                        if (t += r, 26 !== r) break
                    }
                    return t
                }, o.prototype.byteLength = function() {
                    return Math.ceil(this.bitLength() / 8)
                }, o.prototype.toTwos = function(t) {
                    return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                }, o.prototype.fromTwos = function(t) {
                    return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                }, o.prototype.isNeg = function() {
                    return 0 !== this.negative
                }, o.prototype.neg = function() {
                    return this.clone().ineg()
                }, o.prototype.ineg = function() {
                    return this.isZero() || (this.negative ^= 1), this
                }, o.prototype.iuor = function(t) {
                    for (; this.length < t.length;) this.words[this.length++] = 0;
                    for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                    return this._strip()
                }, o.prototype.ior = function(t) {
                    return i((this.negative | t.negative) == 0), this.iuor(t)
                }, o.prototype.or = function(t) {
                    return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                }, o.prototype.uor = function(t) {
                    return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                }, o.prototype.iuand = function(t) {
                    var e;
                    e = this.length > t.length ? t : this;
                    for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
                    return this.length = e.length, this._strip()
                }, o.prototype.iand = function(t) {
                    return i((this.negative | t.negative) == 0), this.iuand(t)
                }, o.prototype.and = function(t) {
                    return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                }, o.prototype.uand = function(t) {
                    return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                }, o.prototype.iuxor = function(t) {
                    this.length > t.length ? (e = this, r = t) : (e = t, r = this);
                    for (var e, r, i = 0; i < r.length; i++) this.words[i] = e.words[i] ^ r.words[i];
                    if (this !== e)
                        for (; i < e.length; i++) this.words[i] = e.words[i];
                    return this.length = e.length, this._strip()
                }, o.prototype.ixor = function(t) {
                    return i((this.negative | t.negative) == 0), this.iuxor(t)
                }, o.prototype.xor = function(t) {
                    return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                }, o.prototype.uxor = function(t) {
                    return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                }, o.prototype.inotn = function(t) {
                    i("number" == typeof t && t >= 0);
                    var e = 0 | Math.ceil(t / 26),
                        r = t % 26;
                    this._expand(e), r > 0 && e--;
                    for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n];
                    return r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r), this._strip()
                }, o.prototype.notn = function(t) {
                    return this.clone().inotn(t)
                }, o.prototype.setn = function(t, e) {
                    i("number" == typeof t && t >= 0);
                    var r = t / 26 | 0,
                        n = t % 26;
                    return this._expand(r + 1), e ? this.words[r] = this.words[r] | 1 << n : this.words[r] = this.words[r] & ~(1 << n), this._strip()
                }, o.prototype.iadd = function(t) {
                    if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                    if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                    this.length > t.length ? (r = this, i = t) : (r = t, i = this);
                    for (var e, r, i, n = 0, o = 0; o < i.length; o++) e = (0 | r.words[o]) + (0 | i.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                    for (; 0 !== n && o < r.length; o++) e = (0 | r.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                    if (this.length = r.length, 0 !== n) this.words[this.length] = n, this.length++;
                    else if (r !== this)
                        for (; o < r.length; o++) this.words[o] = r.words[o];
                    return this
                }, o.prototype.add = function(t) {
                    var e;
                    return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                }, o.prototype.isub = function(t) {
                    if (0 !== t.negative) {
                        t.negative = 0;
                        var e, r, i = this.iadd(t);
                        return t.negative = 1, i._normSign()
                    }
                    if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                    var n = this.cmp(t);
                    if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                    n > 0 ? (e = this, r = t) : (e = t, r = this);
                    for (var o = 0, s = 0; s < r.length; s++) o = (i = (0 | e.words[s]) - (0 | r.words[s]) + o) >> 26, this.words[s] = 67108863 & i;
                    for (; 0 !== o && s < e.length; s++) o = (i = (0 | e.words[s]) + o) >> 26, this.words[s] = 67108863 & i;
                    if (0 === o && s < e.length && e !== this)
                        for (; s < e.length; s++) this.words[s] = e.words[s];
                    return this.length = Math.max(this.length, s), e !== this && (this.negative = 1), this._strip()
                }, o.prototype.sub = function(t) {
                    return this.clone().isub(t)
                };
                var g = function(t, e, r) {
                    var i, n, o, s = t.words,
                        u = e.words,
                        h = r.words,
                        a = 0,
                        l = 0 | s[0],
                        f = 8191 & l,
                        c = l >>> 13,
                        d = 0 | s[1],
                        p = 8191 & d,
                        m = d >>> 13,
                        g = 0 | s[2],
                        y = 8191 & g,
                        v = g >>> 13,
                        w = 0 | s[3],
                        b = 8191 & w,
                        M = w >>> 13,
                        E = 0 | s[4],
                        x = 8191 & E,
                        _ = E >>> 13,
                        B = 0 | s[5],
                        A = 8191 & B,
                        I = B >>> 13,
                        S = 0 | s[6],
                        k = 8191 & S,
                        O = S >>> 13,
                        L = 0 | s[7],
                        R = 8191 & L,
                        U = L >>> 13,
                        P = 0 | s[8],
                        T = 8191 & P,
                        N = P >>> 13,
                        j = 0 | s[9],
                        q = 8191 & j,
                        C = j >>> 13,
                        Z = 0 | u[0],
                        F = 8191 & Z,
                        z = Z >>> 13,
                        $ = 0 | u[1],
                        H = 8191 & $,
                        D = $ >>> 13,
                        V = 0 | u[2],
                        G = 8191 & V,
                        K = V >>> 13,
                        Y = 0 | u[3],
                        W = 8191 & Y,
                        J = Y >>> 13,
                        Q = 0 | u[4],
                        X = 8191 & Q,
                        tt = Q >>> 13,
                        te = 0 | u[5],
                        tr = 8191 & te,
                        ti = te >>> 13,
                        tn = 0 | u[6],
                        to = 8191 & tn,
                        ts = tn >>> 13,
                        tu = 0 | u[7],
                        th = 8191 & tu,
                        ta = tu >>> 13,
                        tl = 0 | u[8],
                        tf = 8191 & tl,
                        tc = tl >>> 13,
                        td = 0 | u[9],
                        tp = 8191 & td,
                        tm = td >>> 13;
                    r.negative = t.negative ^ e.negative, r.length = 19;
                    var tg = (a + (i = Math.imul(f, F)) | 0) + ((8191 & (n = (n = Math.imul(f, z)) + Math.imul(c, F) | 0)) << 13) | 0;
                    a = ((o = Math.imul(c, z)) + (n >>> 13) | 0) + (tg >>> 26) | 0, tg &= 67108863, i = Math.imul(p, F), n = (n = Math.imul(p, z)) + Math.imul(m, F) | 0, o = Math.imul(m, z);
                    var ty = (a + (i = i + Math.imul(f, H) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, D) | 0) + Math.imul(c, H) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, D) | 0) + (n >>> 13) | 0) + (ty >>> 26) | 0, ty &= 67108863, i = Math.imul(y, F), n = (n = Math.imul(y, z)) + Math.imul(v, F) | 0, o = Math.imul(v, z), i = i + Math.imul(p, H) | 0, n = (n = n + Math.imul(p, D) | 0) + Math.imul(m, H) | 0, o = o + Math.imul(m, D) | 0;
                    var tv = (a + (i = i + Math.imul(f, G) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, K) | 0) + Math.imul(c, G) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, K) | 0) + (n >>> 13) | 0) + (tv >>> 26) | 0, tv &= 67108863, i = Math.imul(b, F), n = (n = Math.imul(b, z)) + Math.imul(M, F) | 0, o = Math.imul(M, z), i = i + Math.imul(y, H) | 0, n = (n = n + Math.imul(y, D) | 0) + Math.imul(v, H) | 0, o = o + Math.imul(v, D) | 0, i = i + Math.imul(p, G) | 0, n = (n = n + Math.imul(p, K) | 0) + Math.imul(m, G) | 0, o = o + Math.imul(m, K) | 0;
                    var tw = (a + (i = i + Math.imul(f, W) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, J) | 0) + Math.imul(c, W) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, J) | 0) + (n >>> 13) | 0) + (tw >>> 26) | 0, tw &= 67108863, i = Math.imul(x, F), n = (n = Math.imul(x, z)) + Math.imul(_, F) | 0, o = Math.imul(_, z), i = i + Math.imul(b, H) | 0, n = (n = n + Math.imul(b, D) | 0) + Math.imul(M, H) | 0, o = o + Math.imul(M, D) | 0, i = i + Math.imul(y, G) | 0, n = (n = n + Math.imul(y, K) | 0) + Math.imul(v, G) | 0, o = o + Math.imul(v, K) | 0, i = i + Math.imul(p, W) | 0, n = (n = n + Math.imul(p, J) | 0) + Math.imul(m, W) | 0, o = o + Math.imul(m, J) | 0;
                    var tb = (a + (i = i + Math.imul(f, X) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, tt) | 0) + Math.imul(c, X) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, tt) | 0) + (n >>> 13) | 0) + (tb >>> 26) | 0, tb &= 67108863, i = Math.imul(A, F), n = (n = Math.imul(A, z)) + Math.imul(I, F) | 0, o = Math.imul(I, z), i = i + Math.imul(x, H) | 0, n = (n = n + Math.imul(x, D) | 0) + Math.imul(_, H) | 0, o = o + Math.imul(_, D) | 0, i = i + Math.imul(b, G) | 0, n = (n = n + Math.imul(b, K) | 0) + Math.imul(M, G) | 0, o = o + Math.imul(M, K) | 0, i = i + Math.imul(y, W) | 0, n = (n = n + Math.imul(y, J) | 0) + Math.imul(v, W) | 0, o = o + Math.imul(v, J) | 0, i = i + Math.imul(p, X) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(m, X) | 0, o = o + Math.imul(m, tt) | 0;
                    var tM = (a + (i = i + Math.imul(f, tr) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, ti) | 0) + Math.imul(c, tr) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, ti) | 0) + (n >>> 13) | 0) + (tM >>> 26) | 0, tM &= 67108863, i = Math.imul(k, F), n = (n = Math.imul(k, z)) + Math.imul(O, F) | 0, o = Math.imul(O, z), i = i + Math.imul(A, H) | 0, n = (n = n + Math.imul(A, D) | 0) + Math.imul(I, H) | 0, o = o + Math.imul(I, D) | 0, i = i + Math.imul(x, G) | 0, n = (n = n + Math.imul(x, K) | 0) + Math.imul(_, G) | 0, o = o + Math.imul(_, K) | 0, i = i + Math.imul(b, W) | 0, n = (n = n + Math.imul(b, J) | 0) + Math.imul(M, W) | 0, o = o + Math.imul(M, J) | 0, i = i + Math.imul(y, X) | 0, n = (n = n + Math.imul(y, tt) | 0) + Math.imul(v, X) | 0, o = o + Math.imul(v, tt) | 0, i = i + Math.imul(p, tr) | 0, n = (n = n + Math.imul(p, ti) | 0) + Math.imul(m, tr) | 0, o = o + Math.imul(m, ti) | 0;
                    var tE = (a + (i = i + Math.imul(f, to) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, ts) | 0) + Math.imul(c, to) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, ts) | 0) + (n >>> 13) | 0) + (tE >>> 26) | 0, tE &= 67108863, i = Math.imul(R, F), n = (n = Math.imul(R, z)) + Math.imul(U, F) | 0, o = Math.imul(U, z), i = i + Math.imul(k, H) | 0, n = (n = n + Math.imul(k, D) | 0) + Math.imul(O, H) | 0, o = o + Math.imul(O, D) | 0, i = i + Math.imul(A, G) | 0, n = (n = n + Math.imul(A, K) | 0) + Math.imul(I, G) | 0, o = o + Math.imul(I, K) | 0, i = i + Math.imul(x, W) | 0, n = (n = n + Math.imul(x, J) | 0) + Math.imul(_, W) | 0, o = o + Math.imul(_, J) | 0, i = i + Math.imul(b, X) | 0, n = (n = n + Math.imul(b, tt) | 0) + Math.imul(M, X) | 0, o = o + Math.imul(M, tt) | 0, i = i + Math.imul(y, tr) | 0, n = (n = n + Math.imul(y, ti) | 0) + Math.imul(v, tr) | 0, o = o + Math.imul(v, ti) | 0, i = i + Math.imul(p, to) | 0, n = (n = n + Math.imul(p, ts) | 0) + Math.imul(m, to) | 0, o = o + Math.imul(m, ts) | 0;
                    var tx = (a + (i = i + Math.imul(f, th) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, ta) | 0) + Math.imul(c, th) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, ta) | 0) + (n >>> 13) | 0) + (tx >>> 26) | 0, tx &= 67108863, i = Math.imul(T, F), n = (n = Math.imul(T, z)) + Math.imul(N, F) | 0, o = Math.imul(N, z), i = i + Math.imul(R, H) | 0, n = (n = n + Math.imul(R, D) | 0) + Math.imul(U, H) | 0, o = o + Math.imul(U, D) | 0, i = i + Math.imul(k, G) | 0, n = (n = n + Math.imul(k, K) | 0) + Math.imul(O, G) | 0, o = o + Math.imul(O, K) | 0, i = i + Math.imul(A, W) | 0, n = (n = n + Math.imul(A, J) | 0) + Math.imul(I, W) | 0, o = o + Math.imul(I, J) | 0, i = i + Math.imul(x, X) | 0, n = (n = n + Math.imul(x, tt) | 0) + Math.imul(_, X) | 0, o = o + Math.imul(_, tt) | 0, i = i + Math.imul(b, tr) | 0, n = (n = n + Math.imul(b, ti) | 0) + Math.imul(M, tr) | 0, o = o + Math.imul(M, ti) | 0, i = i + Math.imul(y, to) | 0, n = (n = n + Math.imul(y, ts) | 0) + Math.imul(v, to) | 0, o = o + Math.imul(v, ts) | 0, i = i + Math.imul(p, th) | 0, n = (n = n + Math.imul(p, ta) | 0) + Math.imul(m, th) | 0, o = o + Math.imul(m, ta) | 0;
                    var t_ = (a + (i = i + Math.imul(f, tf) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, tc) | 0) + Math.imul(c, tf) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, tc) | 0) + (n >>> 13) | 0) + (t_ >>> 26) | 0, t_ &= 67108863, i = Math.imul(q, F), n = (n = Math.imul(q, z)) + Math.imul(C, F) | 0, o = Math.imul(C, z), i = i + Math.imul(T, H) | 0, n = (n = n + Math.imul(T, D) | 0) + Math.imul(N, H) | 0, o = o + Math.imul(N, D) | 0, i = i + Math.imul(R, G) | 0, n = (n = n + Math.imul(R, K) | 0) + Math.imul(U, G) | 0, o = o + Math.imul(U, K) | 0, i = i + Math.imul(k, W) | 0, n = (n = n + Math.imul(k, J) | 0) + Math.imul(O, W) | 0, o = o + Math.imul(O, J) | 0, i = i + Math.imul(A, X) | 0, n = (n = n + Math.imul(A, tt) | 0) + Math.imul(I, X) | 0, o = o + Math.imul(I, tt) | 0, i = i + Math.imul(x, tr) | 0, n = (n = n + Math.imul(x, ti) | 0) + Math.imul(_, tr) | 0, o = o + Math.imul(_, ti) | 0, i = i + Math.imul(b, to) | 0, n = (n = n + Math.imul(b, ts) | 0) + Math.imul(M, to) | 0, o = o + Math.imul(M, ts) | 0, i = i + Math.imul(y, th) | 0, n = (n = n + Math.imul(y, ta) | 0) + Math.imul(v, th) | 0, o = o + Math.imul(v, ta) | 0, i = i + Math.imul(p, tf) | 0, n = (n = n + Math.imul(p, tc) | 0) + Math.imul(m, tf) | 0, o = o + Math.imul(m, tc) | 0;
                    var tB = (a + (i = i + Math.imul(f, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, tm) | 0) + Math.imul(c, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, tm) | 0) + (n >>> 13) | 0) + (tB >>> 26) | 0, tB &= 67108863, i = Math.imul(q, H), n = (n = Math.imul(q, D)) + Math.imul(C, H) | 0, o = Math.imul(C, D), i = i + Math.imul(T, G) | 0, n = (n = n + Math.imul(T, K) | 0) + Math.imul(N, G) | 0, o = o + Math.imul(N, K) | 0, i = i + Math.imul(R, W) | 0, n = (n = n + Math.imul(R, J) | 0) + Math.imul(U, W) | 0, o = o + Math.imul(U, J) | 0, i = i + Math.imul(k, X) | 0, n = (n = n + Math.imul(k, tt) | 0) + Math.imul(O, X) | 0, o = o + Math.imul(O, tt) | 0, i = i + Math.imul(A, tr) | 0, n = (n = n + Math.imul(A, ti) | 0) + Math.imul(I, tr) | 0, o = o + Math.imul(I, ti) | 0, i = i + Math.imul(x, to) | 0, n = (n = n + Math.imul(x, ts) | 0) + Math.imul(_, to) | 0, o = o + Math.imul(_, ts) | 0, i = i + Math.imul(b, th) | 0, n = (n = n + Math.imul(b, ta) | 0) + Math.imul(M, th) | 0, o = o + Math.imul(M, ta) | 0, i = i + Math.imul(y, tf) | 0, n = (n = n + Math.imul(y, tc) | 0) + Math.imul(v, tf) | 0, o = o + Math.imul(v, tc) | 0;
                    var tA = (a + (i = i + Math.imul(p, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, tm) | 0) + Math.imul(m, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(m, tm) | 0) + (n >>> 13) | 0) + (tA >>> 26) | 0, tA &= 67108863, i = Math.imul(q, G), n = (n = Math.imul(q, K)) + Math.imul(C, G) | 0, o = Math.imul(C, K), i = i + Math.imul(T, W) | 0, n = (n = n + Math.imul(T, J) | 0) + Math.imul(N, W) | 0, o = o + Math.imul(N, J) | 0, i = i + Math.imul(R, X) | 0, n = (n = n + Math.imul(R, tt) | 0) + Math.imul(U, X) | 0, o = o + Math.imul(U, tt) | 0, i = i + Math.imul(k, tr) | 0, n = (n = n + Math.imul(k, ti) | 0) + Math.imul(O, tr) | 0, o = o + Math.imul(O, ti) | 0, i = i + Math.imul(A, to) | 0, n = (n = n + Math.imul(A, ts) | 0) + Math.imul(I, to) | 0, o = o + Math.imul(I, ts) | 0, i = i + Math.imul(x, th) | 0, n = (n = n + Math.imul(x, ta) | 0) + Math.imul(_, th) | 0, o = o + Math.imul(_, ta) | 0, i = i + Math.imul(b, tf) | 0, n = (n = n + Math.imul(b, tc) | 0) + Math.imul(M, tf) | 0, o = o + Math.imul(M, tc) | 0;
                    var tI = (a + (i = i + Math.imul(y, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(y, tm) | 0) + Math.imul(v, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(v, tm) | 0) + (n >>> 13) | 0) + (tI >>> 26) | 0, tI &= 67108863, i = Math.imul(q, W), n = (n = Math.imul(q, J)) + Math.imul(C, W) | 0, o = Math.imul(C, J), i = i + Math.imul(T, X) | 0, n = (n = n + Math.imul(T, tt) | 0) + Math.imul(N, X) | 0, o = o + Math.imul(N, tt) | 0, i = i + Math.imul(R, tr) | 0, n = (n = n + Math.imul(R, ti) | 0) + Math.imul(U, tr) | 0, o = o + Math.imul(U, ti) | 0, i = i + Math.imul(k, to) | 0, n = (n = n + Math.imul(k, ts) | 0) + Math.imul(O, to) | 0, o = o + Math.imul(O, ts) | 0, i = i + Math.imul(A, th) | 0, n = (n = n + Math.imul(A, ta) | 0) + Math.imul(I, th) | 0, o = o + Math.imul(I, ta) | 0, i = i + Math.imul(x, tf) | 0, n = (n = n + Math.imul(x, tc) | 0) + Math.imul(_, tf) | 0, o = o + Math.imul(_, tc) | 0;
                    var tS = (a + (i = i + Math.imul(b, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(b, tm) | 0) + Math.imul(M, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(M, tm) | 0) + (n >>> 13) | 0) + (tS >>> 26) | 0, tS &= 67108863, i = Math.imul(q, X), n = (n = Math.imul(q, tt)) + Math.imul(C, X) | 0, o = Math.imul(C, tt), i = i + Math.imul(T, tr) | 0, n = (n = n + Math.imul(T, ti) | 0) + Math.imul(N, tr) | 0, o = o + Math.imul(N, ti) | 0, i = i + Math.imul(R, to) | 0, n = (n = n + Math.imul(R, ts) | 0) + Math.imul(U, to) | 0, o = o + Math.imul(U, ts) | 0, i = i + Math.imul(k, th) | 0, n = (n = n + Math.imul(k, ta) | 0) + Math.imul(O, th) | 0, o = o + Math.imul(O, ta) | 0, i = i + Math.imul(A, tf) | 0, n = (n = n + Math.imul(A, tc) | 0) + Math.imul(I, tf) | 0, o = o + Math.imul(I, tc) | 0;
                    var tk = (a + (i = i + Math.imul(x, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(x, tm) | 0) + Math.imul(_, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(_, tm) | 0) + (n >>> 13) | 0) + (tk >>> 26) | 0, tk &= 67108863, i = Math.imul(q, tr), n = (n = Math.imul(q, ti)) + Math.imul(C, tr) | 0, o = Math.imul(C, ti), i = i + Math.imul(T, to) | 0, n = (n = n + Math.imul(T, ts) | 0) + Math.imul(N, to) | 0, o = o + Math.imul(N, ts) | 0, i = i + Math.imul(R, th) | 0, n = (n = n + Math.imul(R, ta) | 0) + Math.imul(U, th) | 0, o = o + Math.imul(U, ta) | 0, i = i + Math.imul(k, tf) | 0, n = (n = n + Math.imul(k, tc) | 0) + Math.imul(O, tf) | 0, o = o + Math.imul(O, tc) | 0;
                    var tO = (a + (i = i + Math.imul(A, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(A, tm) | 0) + Math.imul(I, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(I, tm) | 0) + (n >>> 13) | 0) + (tO >>> 26) | 0, tO &= 67108863, i = Math.imul(q, to), n = (n = Math.imul(q, ts)) + Math.imul(C, to) | 0, o = Math.imul(C, ts), i = i + Math.imul(T, th) | 0, n = (n = n + Math.imul(T, ta) | 0) + Math.imul(N, th) | 0, o = o + Math.imul(N, ta) | 0, i = i + Math.imul(R, tf) | 0, n = (n = n + Math.imul(R, tc) | 0) + Math.imul(U, tf) | 0, o = o + Math.imul(U, tc) | 0;
                    var tL = (a + (i = i + Math.imul(k, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(k, tm) | 0) + Math.imul(O, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(O, tm) | 0) + (n >>> 13) | 0) + (tL >>> 26) | 0, tL &= 67108863, i = Math.imul(q, th), n = (n = Math.imul(q, ta)) + Math.imul(C, th) | 0, o = Math.imul(C, ta), i = i + Math.imul(T, tf) | 0, n = (n = n + Math.imul(T, tc) | 0) + Math.imul(N, tf) | 0, o = o + Math.imul(N, tc) | 0;
                    var tR = (a + (i = i + Math.imul(R, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(R, tm) | 0) + Math.imul(U, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(U, tm) | 0) + (n >>> 13) | 0) + (tR >>> 26) | 0, tR &= 67108863, i = Math.imul(q, tf), n = (n = Math.imul(q, tc)) + Math.imul(C, tf) | 0, o = Math.imul(C, tc);
                    var tU = (a + (i = i + Math.imul(T, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, tm) | 0) + Math.imul(N, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(N, tm) | 0) + (n >>> 13) | 0) + (tU >>> 26) | 0, tU &= 67108863;
                    var tP = (a + (i = Math.imul(q, tp)) | 0) + ((8191 & (n = (n = Math.imul(q, tm)) + Math.imul(C, tp) | 0)) << 13) | 0;
                    return a = ((o = Math.imul(C, tm)) + (n >>> 13) | 0) + (tP >>> 26) | 0, tP &= 67108863, h[0] = tg, h[1] = ty, h[2] = tv, h[3] = tw, h[4] = tb, h[5] = tM, h[6] = tE, h[7] = tx, h[8] = t_, h[9] = tB, h[10] = tA, h[11] = tI, h[12] = tS, h[13] = tk, h[14] = tO, h[15] = tL, h[16] = tR, h[17] = tU, h[18] = tP, 0 !== a && (h[19] = a, r.length++), r
                };

                function y(t, e, r) {
                    r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
                    for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                        var s = n;
                        n = 0;
                        for (var u = 67108863 & i, h = Math.min(o, e.length - 1), a = Math.max(0, o - t.length + 1); a <= h; a++) {
                            var l = o - a,
                                f = (0 | t.words[l]) * (0 | e.words[a]),
                                c = 67108863 & f;
                            s = s + (f / 67108864 | 0) | 0, u = 67108863 & (c = c + u | 0), n += (s = s + (c >>> 26) | 0) >>> 26, s &= 67108863
                        }
                        r.words[o] = u, i = s, s = n
                    }
                    return 0 !== i ? r.words[o] = i : r.length--, r._strip()
                }

                function v(t, e) {
                    this.x = t, this.y = e
                }
                Math.imul || (g = m), o.prototype.mulTo = function(t, e) {
                    var r, i = this.length + t.length;
                    return 10 === this.length && 10 === t.length ? g(this, t, e) : i < 63 ? m(this, t, e) : y(this, t, e)
                }, v.prototype.makeRBT = function(t) {
                    for (var e = Array(t), r = o.prototype._countBits(t) - 1, i = 0; i < t; i++) e[i] = this.revBin(i, r, t);
                    return e
                }, v.prototype.revBin = function(t, e, r) {
                    if (0 === t || t === r - 1) return t;
                    for (var i = 0, n = 0; n < e; n++) i |= (1 & t) << e - n - 1, t >>= 1;
                    return i
                }, v.prototype.permute = function(t, e, r, i, n, o) {
                    for (var s = 0; s < o; s++) i[s] = e[t[s]], n[s] = r[t[s]]
                }, v.prototype.transform = function(t, e, r, i, n, o) {
                    this.permute(o, t, e, r, i, n);
                    for (var s = 1; s < n; s <<= 1)
                        for (var u = s << 1, h = Math.cos(2 * Math.PI / u), a = Math.sin(2 * Math.PI / u), l = 0; l < n; l += u)
                            for (var f = h, c = a, d = 0; d < s; d++) {
                                var p = r[l + d],
                                    m = i[l + d],
                                    g = r[l + d + s],
                                    y = i[l + d + s],
                                    v = f * g - c * y;
                                y = f * y + c * g, g = v, r[l + d] = p + g, i[l + d] = m + y, r[l + d + s] = p - g, i[l + d + s] = m - y, d !== u && (v = h * f - a * c, c = h * c + a * f, f = v)
                            }
                }, v.prototype.guessLen13b = function(t, e) {
                    var r = 1 | Math.max(e, t),
                        i = 1 & r,
                        n = 0;
                    for (r = r / 2 | 0; r; r >>>= 1) n++;
                    return 1 << n + 1 + i
                }, v.prototype.conjugate = function(t, e, r) {
                    if (!(r <= 1))
                        for (var i = 0; i < r / 2; i++) {
                            var n = t[i];
                            t[i] = t[r - i - 1], t[r - i - 1] = n, n = e[i], e[i] = -e[r - i - 1], e[r - i - 1] = -n
                        }
                }, v.prototype.normalize13b = function(t, e) {
                    for (var r = 0, i = 0; i < e / 2; i++) {
                        var n = 8192 * Math.round(t[2 * i + 1] / e) + Math.round(t[2 * i] / e) + r;
                        t[i] = 67108863 & n, r = n < 67108864 ? 0 : n / 67108864 | 0
                    }
                    return t
                }, v.prototype.convert13b = function(t, e, r, n) {
                    for (var o = 0, s = 0; s < e; s++) o += 0 | t[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
                    for (s = 2 * e; s < n; ++s) r[s] = 0;
                    i(0 === o), i((-8192 & o) == 0)
                }, v.prototype.stub = function(t) {
                    for (var e = Array(t), r = 0; r < t; r++) e[r] = 0;
                    return e
                }, v.prototype.mulp = function(t, e, r) {
                    var i = 2 * this.guessLen13b(t.length, e.length),
                        n = this.makeRBT(i),
                        o = this.stub(i),
                        s = Array(i),
                        u = Array(i),
                        h = Array(i),
                        a = Array(i),
                        l = Array(i),
                        f = Array(i),
                        c = r.words;
                    c.length = i, this.convert13b(t.words, t.length, s, i), this.convert13b(e.words, e.length, a, i), this.transform(s, o, u, h, i, n), this.transform(a, o, l, f, i, n);
                    for (var d = 0; d < i; d++) {
                        var p = u[d] * l[d] - h[d] * f[d];
                        h[d] = u[d] * f[d] + h[d] * l[d], u[d] = p
                    }
                    return this.conjugate(u, h, i), this.transform(u, h, c, o, i, n), this.conjugate(c, o, i), this.normalize13b(c, i), r.negative = t.negative ^ e.negative, r.length = t.length + e.length, r._strip()
                }, o.prototype.mul = function(t) {
                    var e = new o(null);
                    return e.words = Array(this.length + t.length), this.mulTo(t, e)
                }, o.prototype.mulf = function(t) {
                    var e = new o(null);
                    return e.words = Array(this.length + t.length), y(this, t, e)
                }, o.prototype.imul = function(t) {
                    return this.clone().mulTo(t, this)
                }, o.prototype.imuln = function(t) {
                    var e = t < 0;
                    e && (t = -t), i("number" == typeof t), i(t < 67108864);
                    for (var r = 0, n = 0; n < this.length; n++) {
                        var o = (0 | this.words[n]) * t,
                            s = (67108863 & o) + (67108863 & r);
                        r >>= 26, r += (o / 67108864 | 0) + (s >>> 26), this.words[n] = 67108863 & s
                    }
                    return 0 !== r && (this.words[n] = r, this.length++), e ? this.ineg() : this
                }, o.prototype.muln = function(t) {
                    return this.clone().imuln(t)
                }, o.prototype.sqr = function() {
                    return this.mul(this)
                }, o.prototype.isqr = function() {
                    return this.imul(this.clone())
                }, o.prototype.pow = function(t) {
                    var e = function(t) {
                        for (var e = Array(t.bitLength()), r = 0; r < e.length; r++) {
                            var i = r / 26 | 0,
                                n = r % 26;
                            e[r] = t.words[i] >>> n & 1
                        }
                        return e
                    }(t);
                    if (0 === e.length) return new o(1);
                    for (var r = this, i = 0; i < e.length && 0 === e[i]; i++, r = r.sqr());
                    if (++i < e.length)
                        for (var n = r.sqr(); i < e.length; i++, n = n.sqr()) 0 !== e[i] && (r = r.mul(n));
                    return r
                }, o.prototype.iushln = function(t) {
                    i("number" == typeof t && t >= 0);
                    var e, r = t % 26,
                        n = (t - r) / 26,
                        o = 67108863 >>> 26 - r << 26 - r;
                    if (0 !== r) {
                        var s = 0;
                        for (e = 0; e < this.length; e++) {
                            var u = this.words[e] & o,
                                h = (0 | this.words[e]) - u << r;
                            this.words[e] = h | s, s = u >>> 26 - r
                        }
                        s && (this.words[e] = s, this.length++)
                    }
                    if (0 !== n) {
                        for (e = this.length - 1; e >= 0; e--) this.words[e + n] = this.words[e];
                        for (e = 0; e < n; e++) this.words[e] = 0;
                        this.length += n
                    }
                    return this._strip()
                }, o.prototype.ishln = function(t) {
                    return i(0 === this.negative), this.iushln(t)
                }, o.prototype.iushrn = function(t, e, r) {
                    i("number" == typeof t && t >= 0), n = e ? (e - e % 26) / 26 : 0;
                    var n, o = t % 26,
                        s = Math.min((t - o) / 26, this.length),
                        u = 67108863 ^ 67108863 >>> o << o;
                    if (n -= s, n = Math.max(0, n), r) {
                        for (var h = 0; h < s; h++) r.words[h] = this.words[h];
                        r.length = s
                    }
                    if (0 === s);
                    else if (this.length > s)
                        for (this.length -= s, h = 0; h < this.length; h++) this.words[h] = this.words[h + s];
                    else this.words[0] = 0, this.length = 1;
                    var a = 0;
                    for (h = this.length - 1; h >= 0 && (0 !== a || h >= n); h--) {
                        var l = 0 | this.words[h];
                        this.words[h] = a << 26 - o | l >>> o, a = l & u
                    }
                    return r && 0 !== a && (r.words[r.length++] = a), 0 === this.length && (this.words[0] = 0, this.length = 1), this._strip()
                }, o.prototype.ishrn = function(t, e, r) {
                    return i(0 === this.negative), this.iushrn(t, e, r)
                }, o.prototype.shln = function(t) {
                    return this.clone().ishln(t)
                }, o.prototype.ushln = function(t) {
                    return this.clone().iushln(t)
                }, o.prototype.shrn = function(t) {
                    return this.clone().ishrn(t)
                }, o.prototype.ushrn = function(t) {
                    return this.clone().iushrn(t)
                }, o.prototype.testn = function(t) {
                    i("number" == typeof t && t >= 0);
                    var e = t % 26,
                        r = (t - e) / 26;
                    return !(this.length <= r) && !!(this.words[r] & 1 << e)
                }, o.prototype.imaskn = function(t) {
                    i("number" == typeof t && t >= 0);
                    var e = t % 26,
                        r = (t - e) / 26;
                    return (i(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r) ? this : (0 !== e && r++, this.length = Math.min(r, this.length), 0 !== e && (this.words[this.length - 1] &= 67108863 ^ 67108863 >>> e << e), this._strip())
                }, o.prototype.maskn = function(t) {
                    return this.clone().imaskn(t)
                }, o.prototype.iaddn = function(t) {
                    return (i("number" == typeof t), i(t < 67108864), t < 0) ? this.isubn(-t) : 0 !== this.negative ? (1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0) : (this.negative = 0, this.isubn(t), this.negative = 1), this) : this._iaddn(t)
                }, o.prototype._iaddn = function(t) {
                    this.words[0] += t;
                    for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                    return this.length = Math.max(this.length, e + 1), this
                }, o.prototype.isubn = function(t) {
                    if (i("number" == typeof t), i(t < 67108864), t < 0) return this.iaddn(-t);
                    if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                    if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                    else
                        for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                    return this._strip()
                }, o.prototype.addn = function(t) {
                    return this.clone().iaddn(t)
                }, o.prototype.subn = function(t) {
                    return this.clone().isubn(t)
                }, o.prototype.iabs = function() {
                    return this.negative = 0, this
                }, o.prototype.abs = function() {
                    return this.clone().iabs()
                }, o.prototype._ishlnsubmul = function(t, e, r) {
                    var n, o, s = t.length + r;
                    this._expand(s);
                    var u = 0;
                    for (n = 0; n < t.length; n++) {
                        o = (0 | this.words[n + r]) + u;
                        var h = (0 | t.words[n]) * e;
                        o -= 67108863 & h, u = (o >> 26) - (h / 67108864 | 0), this.words[n + r] = 67108863 & o
                    }
                    for (; n < this.length - r; n++) u = (o = (0 | this.words[n + r]) + u) >> 26, this.words[n + r] = 67108863 & o;
                    if (0 === u) return this._strip();
                    for (i(-1 === u), u = 0, n = 0; n < this.length; n++) u = (o = -(0 | this.words[n]) + u) >> 26, this.words[n] = 67108863 & o;
                    return this.negative = 1, this._strip()
                }, o.prototype._wordDiv = function(t, e) {
                    var r, i = this.length - t.length,
                        n = this.clone(),
                        s = t,
                        u = 0 | s.words[s.length - 1];
                    0 != (i = 26 - this._countBits(u)) && (s = s.ushln(i), n.iushln(i), u = 0 | s.words[s.length - 1]);
                    var h = n.length - s.length;
                    if ("mod" !== e) {
                        (r = new o(null)).length = h + 1, r.words = Array(r.length);
                        for (var a = 0; a < r.length; a++) r.words[a] = 0
                    }
                    var l = n.clone()._ishlnsubmul(s, 1, h);
                    0 === l.negative && (n = l, r && (r.words[h] = 1));
                    for (var f = h - 1; f >= 0; f--) {
                        var c = (0 | n.words[s.length + f]) * 67108864 + (0 | n.words[s.length + f - 1]);
                        for (c = Math.min(c / u | 0, 67108863), n._ishlnsubmul(s, c, f); 0 !== n.negative;) c--, n.negative = 0, n._ishlnsubmul(s, 1, f), n.isZero() || (n.negative ^= 1);
                        r && (r.words[f] = c)
                    }
                    return r && r._strip(), n._strip(), "div" !== e && 0 !== i && n.iushrn(i), {
                        div: r || null,
                        mod: n
                    }
                }, o.prototype.divmod = function(t, e, r) {
                    var n, s, u;
                    return (i(!t.isZero()), this.isZero()) ? {
                        div: new o(0),
                        mod: new o(0)
                    } : 0 !== this.negative && 0 === t.negative ? (u = this.neg().divmod(t, e), "mod" !== e && (n = u.div.neg()), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.iadd(t)), {
                        div: n,
                        mod: s
                    }) : 0 === this.negative && 0 !== t.negative ? (u = this.divmod(t.neg(), e), "mod" !== e && (n = u.div.neg()), {
                        div: n,
                        mod: u.mod
                    }) : (this.negative & t.negative) != 0 ? (u = this.neg().divmod(t.neg(), e), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.isub(t)), {
                        div: u.div,
                        mod: s
                    }) : t.length > this.length || 0 > this.cmp(t) ? {
                        div: new o(0),
                        mod: this
                    } : 1 === t.length ? "div" === e ? {
                        div: this.divn(t.words[0]),
                        mod: null
                    } : "mod" === e ? {
                        div: null,
                        mod: new o(this.modrn(t.words[0]))
                    } : {
                        div: this.divn(t.words[0]),
                        mod: new o(this.modrn(t.words[0]))
                    } : this._wordDiv(t, e)
                }, o.prototype.div = function(t) {
                    return this.divmod(t, "div", !1).div
                }, o.prototype.mod = function(t) {
                    return this.divmod(t, "mod", !1).mod
                }, o.prototype.umod = function(t) {
                    return this.divmod(t, "mod", !0).mod
                }, o.prototype.divRound = function(t) {
                    var e = this.divmod(t);
                    if (e.mod.isZero()) return e.div;
                    var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                        i = t.ushrn(1),
                        n = t.andln(1),
                        o = r.cmp(i);
                    return o < 0 || 1 === n && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
                }, o.prototype.modrn = function(t) {
                    var e = t < 0;
                    e && (t = -t), i(t <= 67108863);
                    for (var r = 67108864 % t, n = 0, o = this.length - 1; o >= 0; o--) n = (r * n + (0 | this.words[o])) % t;
                    return e ? -n : n
                }, o.prototype.modn = function(t) {
                    return this.modrn(t)
                }, o.prototype.idivn = function(t) {
                    var e = t < 0;
                    e && (t = -t), i(t <= 67108863);
                    for (var r = 0, n = this.length - 1; n >= 0; n--) {
                        var o = (0 | this.words[n]) + 67108864 * r;
                        this.words[n] = o / t | 0, r = o % t
                    }
                    return this._strip(), e ? this.ineg() : this
                }, o.prototype.divn = function(t) {
                    return this.clone().idivn(t)
                }, o.prototype.egcd = function(t) {
                    i(0 === t.negative), i(!t.isZero());
                    var e = this,
                        r = t.clone();
                    e = 0 !== e.negative ? e.umod(t) : e.clone();
                    for (var n = new o(1), s = new o(0), u = new o(0), h = new o(1), a = 0; e.isEven() && r.isEven();) e.iushrn(1), r.iushrn(1), ++a;
                    for (var l = r.clone(), f = e.clone(); !e.isZero();) {
                        for (var c = 0, d = 1;
                            (e.words[0] & d) == 0 && c < 26; ++c, d <<= 1);
                        if (c > 0)
                            for (e.iushrn(c); c-- > 0;)(n.isOdd() || s.isOdd()) && (n.iadd(l), s.isub(f)), n.iushrn(1), s.iushrn(1);
                        for (var p = 0, m = 1;
                            (r.words[0] & m) == 0 && p < 26; ++p, m <<= 1);
                        if (p > 0)
                            for (r.iushrn(p); p-- > 0;)(u.isOdd() || h.isOdd()) && (u.iadd(l), h.isub(f)), u.iushrn(1), h.iushrn(1);
                        e.cmp(r) >= 0 ? (e.isub(r), n.isub(u), s.isub(h)) : (r.isub(e), u.isub(n), h.isub(s))
                    }
                    return {
                        a: u,
                        b: h,
                        gcd: r.iushln(a)
                    }
                }, o.prototype._invmp = function(t) {
                    i(0 === t.negative), i(!t.isZero());
                    var e, r = this,
                        n = t.clone();
                    r = 0 !== r.negative ? r.umod(t) : r.clone();
                    for (var s = new o(1), u = new o(0), h = n.clone(); r.cmpn(1) > 0 && n.cmpn(1) > 0;) {
                        for (var a = 0, l = 1;
                            (r.words[0] & l) == 0 && a < 26; ++a, l <<= 1);
                        if (a > 0)
                            for (r.iushrn(a); a-- > 0;) s.isOdd() && s.iadd(h), s.iushrn(1);
                        for (var f = 0, c = 1;
                            (n.words[0] & c) == 0 && f < 26; ++f, c <<= 1);
                        if (f > 0)
                            for (n.iushrn(f); f-- > 0;) u.isOdd() && u.iadd(h), u.iushrn(1);
                        r.cmp(n) >= 0 ? (r.isub(n), s.isub(u)) : (n.isub(r), u.isub(s))
                    }
                    return 0 > (e = 0 === r.cmpn(1) ? s : u).cmpn(0) && e.iadd(t), e
                }, o.prototype.gcd = function(t) {
                    if (this.isZero()) return t.abs();
                    if (t.isZero()) return this.abs();
                    var e = this.clone(),
                        r = t.clone();
                    e.negative = 0, r.negative = 0;
                    for (var i = 0; e.isEven() && r.isEven(); i++) e.iushrn(1), r.iushrn(1);
                    for (;;) {
                        for (; e.isEven();) e.iushrn(1);
                        for (; r.isEven();) r.iushrn(1);
                        var n = e.cmp(r);
                        if (n < 0) {
                            var o = e;
                            e = r, r = o
                        } else if (0 === n || 0 === r.cmpn(1)) break;
                        e.isub(r)
                    }
                    return r.iushln(i)
                }, o.prototype.invm = function(t) {
                    return this.egcd(t).a.umod(t)
                }, o.prototype.isEven = function() {
                    return (1 & this.words[0]) == 0
                }, o.prototype.isOdd = function() {
                    return (1 & this.words[0]) == 1
                }, o.prototype.andln = function(t) {
                    return this.words[0] & t
                }, o.prototype.bincn = function(t) {
                    i("number" == typeof t);
                    var e = t % 26,
                        r = (t - e) / 26,
                        n = 1 << e;
                    if (this.length <= r) return this._expand(r + 1), this.words[r] |= n, this;
                    for (var o = n, s = r; 0 !== o && s < this.length; s++) {
                        var u = 0 | this.words[s];
                        u += o, o = u >>> 26, u &= 67108863, this.words[s] = u
                    }
                    return 0 !== o && (this.words[s] = o, this.length++), this
                }, o.prototype.isZero = function() {
                    return 1 === this.length && 0 === this.words[0]
                }, o.prototype.cmpn = function(t) {
                    var e, r = t < 0;
                    if (0 !== this.negative && !r) return -1;
                    if (0 === this.negative && r) return 1;
                    if (this._strip(), this.length > 1) e = 1;
                    else {
                        r && (t = -t), i(t <= 67108863, "Number is too big");
                        var n = 0 | this.words[0];
                        e = n === t ? 0 : n < t ? -1 : 1
                    }
                    return 0 !== this.negative ? 0 | -e : e
                }, o.prototype.cmp = function(t) {
                    if (0 !== this.negative && 0 === t.negative) return -1;
                    if (0 === this.negative && 0 !== t.negative) return 1;
                    var e = this.ucmp(t);
                    return 0 !== this.negative ? 0 | -e : e
                }, o.prototype.ucmp = function(t) {
                    if (this.length > t.length) return 1;
                    if (this.length < t.length) return -1;
                    for (var e = 0, r = this.length - 1; r >= 0; r--) {
                        var i = 0 | this.words[r],
                            n = 0 | t.words[r];
                        if (i !== n) {
                            i < n ? e = -1 : i > n && (e = 1);
                            break
                        }
                    }
                    return e
                }, o.prototype.gtn = function(t) {
                    return 1 === this.cmpn(t)
                }, o.prototype.gt = function(t) {
                    return 1 === this.cmp(t)
                }, o.prototype.gten = function(t) {
                    return this.cmpn(t) >= 0
                }, o.prototype.gte = function(t) {
                    return this.cmp(t) >= 0
                }, o.prototype.ltn = function(t) {
                    return -1 === this.cmpn(t)
                }, o.prototype.lt = function(t) {
                    return -1 === this.cmp(t)
                }, o.prototype.lten = function(t) {
                    return 0 >= this.cmpn(t)
                }, o.prototype.lte = function(t) {
                    return 0 >= this.cmp(t)
                }, o.prototype.eqn = function(t) {
                    return 0 === this.cmpn(t)
                }, o.prototype.eq = function(t) {
                    return 0 === this.cmp(t)
                }, o.red = function(t) {
                    return new B(t)
                }, o.prototype.toRed = function(t) {
                    return i(!this.red, "Already a number in reduction context"), i(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
                }, o.prototype.fromRed = function() {
                    return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
                }, o.prototype._forceRed = function(t) {
                    return this.red = t, this
                }, o.prototype.forceRed = function(t) {
                    return i(!this.red, "Already a number in reduction context"), this._forceRed(t)
                }, o.prototype.redAdd = function(t) {
                    return i(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
                }, o.prototype.redIAdd = function(t) {
                    return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
                }, o.prototype.redSub = function(t) {
                    return i(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
                }, o.prototype.redISub = function(t) {
                    return i(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
                }, o.prototype.redShl = function(t) {
                    return i(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
                }, o.prototype.redMul = function(t) {
                    return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
                }, o.prototype.redIMul = function(t) {
                    return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
                }, o.prototype.redSqr = function() {
                    return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
                }, o.prototype.redISqr = function() {
                    return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
                }, o.prototype.redSqrt = function() {
                    return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
                }, o.prototype.redInvm = function() {
                    return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
                }, o.prototype.redNeg = function() {
                    return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
                }, o.prototype.redPow = function(t) {
                    return i(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
                };
                var w = {
                    k256: null,
                    p224: null,
                    p192: null,
                    p25519: null
                };

                function b(t, e) {
                    this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
                }

                function M() {
                    b.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                }

                function E() {
                    b.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                }

                function x() {
                    b.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                }

                function _() {
                    b.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                }

                function B(t) {
                    if ("string" == typeof t) {
                        var e = o._prime(t);
                        this.m = e.p, this.prime = e
                    } else i(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
                }

                function A(t) {
                    B.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
                }
                b.prototype._tmp = function() {
                    var t = new o(null);
                    return t.words = Array(Math.ceil(this.n / 13)), t
                }, b.prototype.ireduce = function(t) {
                    var e, r = t;
                    do this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength(); while (e > this.n);
                    var i = e < this.n ? -1 : r.ucmp(this.p);
                    return 0 === i ? (r.words[0] = 0, r.length = 1) : i > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip(), r
                }, b.prototype.split = function(t, e) {
                    t.iushrn(this.n, 0, e)
                }, b.prototype.imulK = function(t) {
                    return t.imul(this.k)
                }, n(M, b), M.prototype.split = function(t, e) {
                    for (var r = Math.min(t.length, 9), i = 0; i < r; i++) e.words[i] = t.words[i];
                    if (e.length = r, t.length <= 9) {
                        t.words[0] = 0, t.length = 1;
                        return
                    }
                    var n = t.words[9];
                    for (i = 10, e.words[e.length++] = 4194303 & n; i < t.length; i++) {
                        var o = 0 | t.words[i];
                        t.words[i - 10] = (4194303 & o) << 4 | n >>> 22, n = o
                    }
                    n >>>= 22, t.words[i - 10] = n, 0 === n && t.length > 10 ? t.length -= 10 : t.length -= 9
                }, M.prototype.imulK = function(t) {
                    t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                    for (var e = 0, r = 0; r < t.length; r++) {
                        var i = 0 | t.words[r];
                        e += 977 * i, t.words[r] = 67108863 & e, e = 64 * i + (e / 67108864 | 0)
                    }
                    return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
                }, n(E, b), n(x, b), n(_, b), _.prototype.imulK = function(t) {
                    for (var e = 0, r = 0; r < t.length; r++) {
                        var i = (0 | t.words[r]) * 19 + e,
                            n = 67108863 & i;
                        i >>>= 26, t.words[r] = n, e = i
                    }
                    return 0 !== e && (t.words[t.length++] = e), t
                }, o._prime = function(t) {
                    var e;
                    if (w[t]) return w[t];
                    if ("k256" === t) e = new M;
                    else if ("p224" === t) e = new E;
                    else if ("p192" === t) e = new x;
                    else if ("p25519" === t) e = new _;
                    else throw Error("Unknown prime " + t);
                    return w[t] = e, e
                }, B.prototype._verify1 = function(t) {
                    i(0 === t.negative, "red works only with positives"), i(t.red, "red works only with red numbers")
                }, B.prototype._verify2 = function(t, e) {
                    i((t.negative | e.negative) == 0, "red works only with positives"), i(t.red && t.red === e.red, "red works only with red numbers")
                }, B.prototype.imod = function(t) {
                    return this.prime ? this.prime.ireduce(t)._forceRed(this) : (a(t, t.umod(this.m)._forceRed(this)), t)
                }, B.prototype.neg = function(t) {
                    return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                }, B.prototype.add = function(t, e) {
                    this._verify2(t, e);
                    var r = t.add(e);
                    return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
                }, B.prototype.iadd = function(t, e) {
                    this._verify2(t, e);
                    var r = t.iadd(e);
                    return r.cmp(this.m) >= 0 && r.isub(this.m), r
                }, B.prototype.sub = function(t, e) {
                    this._verify2(t, e);
                    var r = t.sub(e);
                    return 0 > r.cmpn(0) && r.iadd(this.m), r._forceRed(this)
                }, B.prototype.isub = function(t, e) {
                    this._verify2(t, e);
                    var r = t.isub(e);
                    return 0 > r.cmpn(0) && r.iadd(this.m), r
                }, B.prototype.shl = function(t, e) {
                    return this._verify1(t), this.imod(t.ushln(e))
                }, B.prototype.imul = function(t, e) {
                    return this._verify2(t, e), this.imod(t.imul(e))
                }, B.prototype.mul = function(t, e) {
                    return this._verify2(t, e), this.imod(t.mul(e))
                }, B.prototype.isqr = function(t) {
                    return this.imul(t, t.clone())
                }, B.prototype.sqr = function(t) {
                    return this.mul(t, t)
                }, B.prototype.sqrt = function(t) {
                    if (t.isZero()) return t.clone();
                    var e = this.m.andln(3);
                    if (i(e % 2 == 1), 3 === e) {
                        var r = this.m.add(new o(1)).iushrn(2);
                        return this.pow(t, r)
                    }
                    for (var n = this.m.subn(1), s = 0; !n.isZero() && 0 === n.andln(1);) s++, n.iushrn(1);
                    i(!n.isZero());
                    var u = new o(1).toRed(this),
                        h = u.redNeg(),
                        a = this.m.subn(1).iushrn(1),
                        l = this.m.bitLength();
                    for (l = new o(2 * l * l).toRed(this); 0 !== this.pow(l, a).cmp(h);) l.redIAdd(h);
                    for (var f = this.pow(l, n), c = this.pow(t, n.addn(1).iushrn(1)), d = this.pow(t, n), p = s; 0 !== d.cmp(u);) {
                        for (var m = d, g = 0; 0 !== m.cmp(u); g++) m = m.redSqr();
                        i(g < p);
                        var y = this.pow(f, new o(1).iushln(p - g - 1));
                        c = c.redMul(y), f = y.redSqr(), d = d.redMul(f), p = g
                    }
                    return c
                }, B.prototype.invm = function(t) {
                    var e = t._invmp(this.m);
                    return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
                }, B.prototype.pow = function(t, e) {
                    if (e.isZero()) return new o(1).toRed(this);
                    if (0 === e.cmpn(1)) return t.clone();
                    var r = Array(16);
                    r[0] = new o(1).toRed(this), r[1] = t;
                    for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t);
                    var n = r[0],
                        s = 0,
                        u = 0,
                        h = e.bitLength() % 26;
                    for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
                        for (var a = e.words[i], l = h - 1; l >= 0; l--) {
                            var f = a >> l & 1;
                            if (n !== r[0] && (n = this.sqr(n)), 0 === f && 0 === s) {
                                u = 0;
                                continue
                            }
                            s <<= 1, s |= f, (4 == ++u || 0 === i && 0 === l) && (n = this.mul(n, r[s]), u = 0, s = 0)
                        }
                        h = 26
                    }
                    return n
                }, B.prototype.convertTo = function(t) {
                    var e = t.umod(this.m);
                    return e === t ? e.clone() : e
                }, B.prototype.convertFrom = function(t) {
                    var e = t.clone();
                    return e.red = null, e
                }, o.mont = function(t) {
                    return new A(t)
                }, n(A, B), A.prototype.convertTo = function(t) {
                    return this.imod(t.ushln(this.shift))
                }, A.prototype.convertFrom = function(t) {
                    var e = this.imod(t.mul(this.rinv));
                    return e.red = null, e
                }, A.prototype.imul = function(t, e) {
                    if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                    var r = t.imul(e),
                        i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        n = r.isub(i).iushrn(this.shift),
                        o = n;
                    return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : 0 > n.cmpn(0) && (o = n.iadd(this.m)), o._forceRed(this)
                }, A.prototype.mul = function(t, e) {
                    if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                    var r = t.mul(e),
                        i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        n = r.isub(i).iushrn(this.shift),
                        s = n;
                    return n.cmp(this.m) >= 0 ? s = n.isub(this.m) : 0 > n.cmpn(0) && (s = n.iadd(this.m)), s._forceRed(this)
                }, A.prototype.invm = function(t) {
                    return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                }
            }(t = r.nmd(t), this)
        },
        88443: function(t, e, r) {
            var i = r(35197);
            t.exports = i("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
        },
        35197: function(t, e, r) {
            "use strict";
            var i = r(10632).Buffer;
            t.exports = function(t) {
                if (t.length >= 255) throw TypeError("Alphabet too long");
                for (var e = new Uint8Array(256), r = 0; r < e.length; r++) e[r] = 255;
                for (var n = 0; n < t.length; n++) {
                    var o = t.charAt(n),
                        s = o.charCodeAt(0);
                    if (255 !== e[s]) throw TypeError(o + " is ambiguous");
                    e[s] = n
                }
                var u = t.length,
                    h = t.charAt(0),
                    a = Math.log(u) / Math.log(256),
                    l = Math.log(256) / Math.log(u);

                function f(t) {
                    if ("string" != typeof t) throw TypeError("Expected String");
                    if (0 === t.length) return i.alloc(0);
                    for (var r = 0, n = 0, o = 0; t[r] === h;) n++, r++;
                    for (var s = (t.length - r) * a + 1 >>> 0, l = new Uint8Array(s); t[r];) {
                        var f = e[t.charCodeAt(r)];
                        if (255 === f) return;
                        for (var c = 0, d = s - 1;
                            (0 !== f || c < o) && -1 !== d; d--, c++) f += u * l[d] >>> 0, l[d] = f % 256 >>> 0, f = f / 256 >>> 0;
                        if (0 !== f) throw Error("Non-zero carry");
                        o = c, r++
                    }
                    for (var p = s - o; p !== s && 0 === l[p];) p++;
                    var m = i.allocUnsafe(n + (s - p));
                    m.fill(0, 0, n);
                    for (var g = n; p !== s;) m[g++] = l[p++];
                    return m
                }
                return {
                    encode: function(e) {
                        if ((Array.isArray(e) || e instanceof Uint8Array) && (e = i.from(e)), !i.isBuffer(e)) throw TypeError("Expected Buffer");
                        if (0 === e.length) return "";
                        for (var r = 0, n = 0, o = 0, s = e.length; o !== s && 0 === e[o];) o++, r++;
                        for (var a = (s - o) * l + 1 >>> 0, f = new Uint8Array(a); o !== s;) {
                            for (var c = e[o], d = 0, p = a - 1;
                                (0 !== c || d < n) && -1 !== p; p--, d++) c += 256 * f[p] >>> 0, f[p] = c % u >>> 0, c = c / u >>> 0;
                            if (0 !== c) throw Error("Non-zero carry");
                            n = d, o++
                        }
                        for (var m = a - n; m !== a && 0 === f[m];) m++;
                        for (var g = h.repeat(r); m < a; ++m) g += t.charAt(f[m]);
                        return g
                    },
                    decodeUnsafe: f,
                    decode: function(t) {
                        var e = f(t);
                        if (e) return e;
                        throw Error("Non-base" + u + " character")
                    }
                }
            }
        },
        48738: function(t, e) {
            "use strict";
            e.byteLength = function(t) {
                var e = h(t),
                    r = e[0],
                    i = e[1];
                return (r + i) * 3 / 4 - i
            }, e.toByteArray = function(t) {
                var e, r, o = h(t),
                    s = o[0],
                    u = o[1],
                    a = new n((s + u) * 3 / 4 - u),
                    l = 0,
                    f = u > 0 ? s - 4 : s;
                for (r = 0; r < f; r += 4) e = i[t.charCodeAt(r)] << 18 | i[t.charCodeAt(r + 1)] << 12 | i[t.charCodeAt(r + 2)] << 6 | i[t.charCodeAt(r + 3)], a[l++] = e >> 16 & 255, a[l++] = e >> 8 & 255, a[l++] = 255 & e;
                return 2 === u && (e = i[t.charCodeAt(r)] << 2 | i[t.charCodeAt(r + 1)] >> 4, a[l++] = 255 & e), 1 === u && (e = i[t.charCodeAt(r)] << 10 | i[t.charCodeAt(r + 1)] << 4 | i[t.charCodeAt(r + 2)] >> 2, a[l++] = e >> 8 & 255, a[l++] = 255 & e), a
            }, e.fromByteArray = function(t) {
                for (var e, i = t.length, n = i % 3, o = [], s = 0, u = i - n; s < u; s += 16383) o.push(function(t, e, i) {
                    for (var n, o = [], s = e; s < i; s += 3) o.push(r[(n = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2])) >> 18 & 63] + r[n >> 12 & 63] + r[n >> 6 & 63] + r[63 & n]);
                    return o.join("")
                }(t, s, s + 16383 > u ? u : s + 16383));
                return 1 === n ? o.push(r[(e = t[i - 1]) >> 2] + r[e << 4 & 63] + "==") : 2 === n && o.push(r[(e = (t[i - 2] << 8) + t[i - 1]) >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="), o.join("")
            };
            for (var r = [], i = [], n = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, u = o.length; s < u; ++s) r[s] = o[s], i[o.charCodeAt(s)] = s;

            function h(t) {
                var e = t.length;
                if (e % 4 > 0) throw Error("Invalid string. Length must be a multiple of 4");
                var r = t.indexOf("="); - 1 === r && (r = e);
                var i = r === e ? 0 : 4 - r % 4;
                return [r, i]
            }
            i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
        },
        12653: function(t, e, r) {
            "use strict";
            var i = r(9109).Buffer;
            e.oU = function(t) {
                {
                    let e = i.from(t);
                    e.reverse();
                    let r = e.toString("hex");
                    return 0 === r.length ? BigInt(0) : BigInt(`0x${r}`)
                }
            }, e.Q5 = function(t) {
                {
                    let e = t.toString("hex");
                    return 0 === e.length ? BigInt(0) : BigInt(`0x${e}`)
                }
            }, e.k$ = function(t, e) {
                {
                    let r = t.toString(16),
                        n = i.from(r.padStart(2 * e, "0").slice(0, 2 * e), "hex");
                    return n.reverse(), n
                }
            }, e.zP = function(t, e) {
                {
                    let r = t.toString(16);
                    return i.from(r.padStart(2 * e, "0").slice(0, 2 * e), "hex")
                }
            }
        },
        5810: function(t, e, r) {
            "use strict";
            var i = r(9109).Buffer,
                n = this && this.__createBinding || (Object.create ? function(t, e, r, i) {
                    void 0 === i && (i = r), Object.defineProperty(t, i, {
                        enumerable: !0,
                        get: function() {
                            return e[r]
                        }
                    })
                } : function(t, e, r, i) {
                    void 0 === i && (i = r), t[i] = e[r]
                }),
                o = this && this.__setModuleDefault || (Object.create ? function(t, e) {
                    Object.defineProperty(t, "default", {
                        enumerable: !0,
                        value: e
                    })
                } : function(t, e) {
                    t.default = e
                }),
                s = this && this.__decorate || function(t, e, r, i) {
                    var n, o = arguments.length,
                        s = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i);
                    else
                        for (var u = t.length - 1; u >= 0; u--)(n = t[u]) && (s = (o < 3 ? n(s) : o > 3 ? n(e, r, s) : n(e, r)) || s);
                    return o > 3 && s && Object.defineProperty(e, r, s), s
                },
                u = this && this.__importStar || function(t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t)
                        for (var r in t) "default" !== r && Object.hasOwnProperty.call(t, r) && n(e, t, r);
                    return o(e, t), e
                },
                h = this && this.__importDefault || function(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.deserializeUnchecked = e.deserialize = e.serialize = e.BinaryReader = e.BinaryWriter = e.BorshError = e.baseDecode = e.baseEncode = void 0;
            let a = h(r(36109)),
                l = h(r(75824)),
                f = u(r(57139)),
                c = new("function" != typeof TextDecoder ? f.TextDecoder : TextDecoder)("utf-8", {
                    fatal: !0
                });
            e.baseEncode = function(t) {
                return "string" == typeof t && (t = i.from(t, "utf8")), l.default.encode(i.from(t))
            }, e.baseDecode = function(t) {
                return i.from(l.default.decode(t))
            };
            class d extends Error {
                constructor(t) {
                    super(t), this.fieldPath = [], this.originalMessage = t
                }
                addToFieldPath(t) {
                    this.fieldPath.splice(0, 0, t), this.message = this.originalMessage + ": " + this.fieldPath.join(".")
                }
            }
            e.BorshError = d;
            class p {
                constructor() {
                    this.buf = i.alloc(1024), this.length = 0
                }
                maybeResize() {
                    this.buf.length < 16 + this.length && (this.buf = i.concat([this.buf, i.alloc(1024)]))
                }
                writeU8(t) {
                    this.maybeResize(), this.buf.writeUInt8(t, this.length), this.length += 1
                }
                writeU16(t) {
                    this.maybeResize(), this.buf.writeUInt16LE(t, this.length), this.length += 2
                }
                writeU32(t) {
                    this.maybeResize(), this.buf.writeUInt32LE(t, this.length), this.length += 4
                }
                writeU64(t) {
                    this.maybeResize(), this.writeBuffer(i.from(new a.default(t).toArray("le", 8)))
                }
                writeU128(t) {
                    this.maybeResize(), this.writeBuffer(i.from(new a.default(t).toArray("le", 16)))
                }
                writeU256(t) {
                    this.maybeResize(), this.writeBuffer(i.from(new a.default(t).toArray("le", 32)))
                }
                writeU512(t) {
                    this.maybeResize(), this.writeBuffer(i.from(new a.default(t).toArray("le", 64)))
                }
                writeBuffer(t) {
                    this.buf = i.concat([i.from(this.buf.subarray(0, this.length)), t, i.alloc(1024)]), this.length += t.length
                }
                writeString(t) {
                    this.maybeResize();
                    let e = i.from(t, "utf8");
                    this.writeU32(e.length), this.writeBuffer(e)
                }
                writeFixedArray(t) {
                    this.writeBuffer(i.from(t))
                }
                writeArray(t, e) {
                    for (let r of (this.maybeResize(), this.writeU32(t.length), t)) this.maybeResize(), e(r)
                }
                toArray() {
                    return this.buf.subarray(0, this.length)
                }
            }

            function m(t, e, r) {
                let i = r.value;
                r.value = function(...t) {
                    try {
                        return i.apply(this, t)
                    } catch (t) {
                        if (t instanceof RangeError && ["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(t.code) >= 0) throw new d("Reached the end of buffer when deserializing");
                        throw t
                    }
                }
            }
            e.BinaryWriter = p;
            class g {
                constructor(t) {
                    this.buf = t, this.offset = 0
                }
                readU8() {
                    let t = this.buf.readUInt8(this.offset);
                    return this.offset += 1, t
                }
                readU16() {
                    let t = this.buf.readUInt16LE(this.offset);
                    return this.offset += 2, t
                }
                readU32() {
                    let t = this.buf.readUInt32LE(this.offset);
                    return this.offset += 4, t
                }
                readU64() {
                    let t = this.readBuffer(8);
                    return new a.default(t, "le")
                }
                readU128() {
                    let t = this.readBuffer(16);
                    return new a.default(t, "le")
                }
                readU256() {
                    let t = this.readBuffer(32);
                    return new a.default(t, "le")
                }
                readU512() {
                    let t = this.readBuffer(64);
                    return new a.default(t, "le")
                }
                readBuffer(t) {
                    if (this.offset + t > this.buf.length) throw new d(`Expected buffer length ${t} isn't within bounds`);
                    let e = this.buf.slice(this.offset, this.offset + t);
                    return this.offset += t, e
                }
                readString() {
                    let t = this.readU32(),
                        e = this.readBuffer(t);
                    try {
                        return c.decode(e)
                    } catch (t) {
                        throw new d(`Error decoding UTF-8 string: ${t}`)
                    }
                }
                readFixedArray(t) {
                    return new Uint8Array(this.readBuffer(t))
                }
                readArray(t) {
                    let e = this.readU32(),
                        r = [];
                    for (let i = 0; i < e; ++i) r.push(t());
                    return r
                }
            }

            function y(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }

            function v(t, e, r, i, n) {
                try {
                    if ("string" == typeof i) n[`write${y(i)}`](r);
                    else if (i instanceof Array) {
                        if ("number" == typeof i[0]) {
                            if (r.length !== i[0]) throw new d(`Expecting byte array of length ${i[0]}, but got ${r.length} bytes`);
                            n.writeFixedArray(r)
                        } else if (2 === i.length && "number" == typeof i[1]) {
                            if (r.length !== i[1]) throw new d(`Expecting byte array of length ${i[1]}, but got ${r.length} bytes`);
                            for (let e = 0; e < i[1]; e++) v(t, null, r[e], i[0], n)
                        } else n.writeArray(r, r => {
                            v(t, e, r, i[0], n)
                        })
                    } else if (void 0 !== i.kind) switch (i.kind) {
                        case "option":
                            null == r ? n.writeU8(0) : (n.writeU8(1), v(t, e, r, i.type, n));
                            break;
                        case "map":
                            n.writeU32(r.size), r.forEach((r, o) => {
                                v(t, e, o, i.key, n), v(t, e, r, i.value, n)
                            });
                            break;
                        default:
                            throw new d(`FieldType ${i} unrecognized`)
                    } else w(t, r, n)
                } catch (t) {
                    throw t instanceof d && t.addToFieldPath(e), t
                }
            }

            function w(t, e, r) {
                if ("function" == typeof e.borshSerialize) {
                    e.borshSerialize(r);
                    return
                }
                let i = t.get(e.constructor);
                if (!i) throw new d(`Class ${e.constructor.name} is missing in schema`);
                if ("struct" === i.kind) i.fields.map(([i, n]) => {
                    v(t, i, e[i], n, r)
                });
                else if ("enum" === i.kind) {
                    let n = e[i.field];
                    for (let o = 0; o < i.values.length; ++o) {
                        let [s, u] = i.values[o];
                        if (s === n) {
                            r.writeU8(o), v(t, s, e[s], u, r);
                            break
                        }
                    }
                } else throw new d(`Unexpected schema kind: ${i.kind} for ${e.constructor.name}`)
            }

            function b(t, e, r, i) {
                try {
                    if ("string" == typeof r) return i[`read${y(r)}`]();
                    if (r instanceof Array) {
                        if ("number" == typeof r[0]) return i.readFixedArray(r[0]);
                        if ("number" != typeof r[1]) return i.readArray(() => b(t, e, r[0], i)); {
                            let e = [];
                            for (let n = 0; n < r[1]; n++) e.push(b(t, null, r[0], i));
                            return e
                        }
                    }
                    if ("option" === r.kind) {
                        if (i.readU8()) return b(t, e, r.type, i);
                        return
                    }
                    if ("map" === r.kind) {
                        let n = new Map,
                            o = i.readU32();
                        for (let s = 0; s < o; s++) {
                            let o = b(t, e, r.key, i),
                                s = b(t, e, r.value, i);
                            n.set(o, s)
                        }
                        return n
                    }
                    return M(t, r, i)
                } catch (t) {
                    throw t instanceof d && t.addToFieldPath(e), t
                }
            }

            function M(t, e, r) {
                if ("function" == typeof e.borshDeserialize) return e.borshDeserialize(r);
                let i = t.get(e);
                if (!i) throw new d(`Class ${e.name} is missing in schema`);
                if ("struct" === i.kind) {
                    let i = {};
                    for (let [n, o] of t.get(e).fields) i[n] = b(t, n, o, r);
                    return new e(i)
                }
                if ("enum" === i.kind) {
                    let n = r.readU8();
                    if (n >= i.values.length) throw new d(`Enum index: ${n} is out of range`);
                    let [o, s] = i.values[n], u = b(t, o, s, r);
                    return new e({
                        [o]: u
                    })
                }
                throw new d(`Unexpected schema kind: ${i.kind} for ${e.constructor.name}`)
            }
            s([m], g.prototype, "readU8", null), s([m], g.prototype, "readU16", null), s([m], g.prototype, "readU32", null), s([m], g.prototype, "readU64", null), s([m], g.prototype, "readU128", null), s([m], g.prototype, "readU256", null), s([m], g.prototype, "readU512", null), s([m], g.prototype, "readString", null), s([m], g.prototype, "readFixedArray", null), s([m], g.prototype, "readArray", null), e.BinaryReader = g, e.serialize = function(t, e, r = p) {
                let i = new r;
                return w(t, e, i), i.toArray()
            }, e.deserialize = function(t, e, r, i = g) {
                let n = new i(r),
                    o = M(t, e, n);
                if (n.offset < r.length) throw new d(`Unexpected ${r.length-n.offset} bytes after deserialized data`);
                return o
            }, e.deserializeUnchecked = function(t, e, r, i = g) {
                return M(t, e, new i(r))
            }
        },
        36109: function(t, e, r) {
            ! function(t, e) {
                "use strict";

                function i(t, e) {
                    if (!t) throw Error(e || "Assertion failed")
                }

                function n(t, e) {
                    t.super_ = e;
                    var r = function() {};
                    r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
                }

                function o(t, e, r) {
                    if (o.isBN(t)) return t;
                    this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && (("le" === e || "be" === e) && (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
                }
                "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
                try {
                    f = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : r(71456).Buffer
                } catch (t) {}

                function s(t, e) {
                    var r = t.charCodeAt(e);
                    return r >= 48 && r <= 57 ? r - 48 : r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : void i(!1, "Invalid character in " + t)
                }

                function u(t, e, r) {
                    var i = s(t, r);
                    return r - 1 >= e && (i |= s(t, r - 1) << 4), i
                }

                function h(t, e, r, n) {
                    for (var o = 0, s = 0, u = Math.min(t.length, r), h = e; h < u; h++) {
                        var a = t.charCodeAt(h) - 48;
                        o *= n, s = a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a, i(a >= 0 && s < n, "Invalid character"), o += s
                    }
                    return o
                }

                function a(t, e) {
                    t.words = e.words, t.length = e.length, t.negative = e.negative, t.red = e.red
                }
                if (o.isBN = function(t) {
                        return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
                    }, o.max = function(t, e) {
                        return t.cmp(e) > 0 ? t : e
                    }, o.min = function(t, e) {
                        return 0 > t.cmp(e) ? t : e
                    }, o.prototype._init = function(t, e, r) {
                        if ("number" == typeof t) return this._initNumber(t, e, r);
                        if ("object" == typeof t) return this._initArray(t, e, r);
                        "hex" === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36);
                        var n = 0;
                        "-" === (t = t.toString().replace(/\s+/g, ""))[0] && (n++, this.negative = 1), n < t.length && (16 === e ? this._parseHex(t, n, r) : (this._parseBase(t, e, n), "le" === r && this._initArray(this.toArray(), e, r)))
                    }, o.prototype._initNumber = function(t, e, r) {
                        t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (i(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), e, r)
                    }, o.prototype._initArray = function(t, e, r) {
                        if (i("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                        this.length = Math.ceil(t.length / 3), this.words = Array(this.length);
                        for (var n, o, s = 0; s < this.length; s++) this.words[s] = 0;
                        var u = 0;
                        if ("be" === r)
                            for (s = t.length - 1, n = 0; s >= 0; s -= 3) o = t[s] | t[s - 1] << 8 | t[s - 2] << 16, this.words[n] |= o << u & 67108863, this.words[n + 1] = o >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, n++);
                        else if ("le" === r)
                            for (s = 0, n = 0; s < t.length; s += 3) o = t[s] | t[s + 1] << 8 | t[s + 2] << 16, this.words[n] |= o << u & 67108863, this.words[n + 1] = o >>> 26 - u & 67108863, (u += 24) >= 26 && (u -= 26, n++);
                        return this._strip()
                    }, o.prototype._parseHex = function(t, e, r) {
                        this.length = Math.ceil((t.length - e) / 6), this.words = Array(this.length);
                        for (var i, n = 0; n < this.length; n++) this.words[n] = 0;
                        var o = 0,
                            s = 0;
                        if ("be" === r)
                            for (n = t.length - 1; n >= e; n -= 2) i = u(t, e, n) << o, this.words[s] |= 67108863 & i, o >= 18 ? (o -= 18, s += 1, this.words[s] |= i >>> 26) : o += 8;
                        else
                            for (n = (t.length - e) % 2 == 0 ? e + 1 : e; n < t.length; n += 2) i = u(t, e, n) << o, this.words[s] |= 67108863 & i, o >= 18 ? (o -= 18, s += 1, this.words[s] |= i >>> 26) : o += 8;
                        this._strip()
                    }, o.prototype._parseBase = function(t, e, r) {
                        this.words = [0], this.length = 1;
                        for (var i = 0, n = 1; n <= 67108863; n *= e) i++;
                        i--, n = n / e | 0;
                        for (var o = t.length - r, s = o % i, u = Math.min(o, o - s) + r, a = 0, l = r; l < u; l += i) a = h(t, l, l + i, e), this.imuln(n), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
                        if (0 !== s) {
                            var f = 1;
                            for (a = h(t, l, t.length, e), l = 0; l < s; l++) f *= e;
                            this.imuln(f), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a)
                        }
                        this._strip()
                    }, o.prototype.copy = function(t) {
                        t.words = Array(this.length);
                        for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                        t.length = this.length, t.negative = this.negative, t.red = this.red
                    }, o.prototype._move = function(t) {
                        a(t, this)
                    }, o.prototype.clone = function() {
                        var t = new o(null);
                        return this.copy(t), t
                    }, o.prototype._expand = function(t) {
                        for (; this.length < t;) this.words[this.length++] = 0;
                        return this
                    }, o.prototype._strip = function() {
                        for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                        return this._normSign()
                    }, o.prototype._normSign = function() {
                        return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
                    }, "undefined" != typeof Symbol && "function" == typeof Symbol.for) try {
                    o.prototype[Symbol.for("nodejs.util.inspect.custom")] = l
                } catch (t) {
                    o.prototype.inspect = l
                } else o.prototype.inspect = l;

                function l() {
                    return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                }
                var f, c = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                    d = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                    p = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

                function m(t, e, r) {
                    r.negative = e.negative ^ t.negative;
                    var i = t.length + e.length | 0;
                    r.length = i, i = i - 1 | 0;
                    var n = 0 | t.words[0],
                        o = 0 | e.words[0],
                        s = n * o,
                        u = 67108863 & s,
                        h = s / 67108864 | 0;
                    r.words[0] = u;
                    for (var a = 1; a < i; a++) {
                        for (var l = h >>> 26, f = 67108863 & h, c = Math.min(a, e.length - 1), d = Math.max(0, a - t.length + 1); d <= c; d++) {
                            var p = a - d | 0;
                            l += (s = (n = 0 | t.words[p]) * (o = 0 | e.words[d]) + f) / 67108864 | 0, f = 67108863 & s
                        }
                        r.words[a] = 0 | f, h = 0 | l
                    }
                    return 0 !== h ? r.words[a] = 0 | h : r.length--, r._strip()
                }
                o.prototype.toString = function(t, e) {
                    if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
                        r = "";
                        for (var r, n = 0, o = 0, s = 0; s < this.length; s++) {
                            var u = this.words[s],
                                h = ((u << n | o) & 16777215).toString(16);
                            o = u >>> 24 - n & 16777215, (n += 2) >= 26 && (n -= 26, s--), r = 0 !== o || s !== this.length - 1 ? c[6 - h.length] + h + r : h + r
                        }
                        for (0 !== o && (r = o.toString(16) + r); r.length % e != 0;) r = "0" + r;
                        return 0 !== this.negative && (r = "-" + r), r
                    }
                    if (t === (0 | t) && t >= 2 && t <= 36) {
                        var a = d[t],
                            l = p[t];
                        r = "";
                        var f = this.clone();
                        for (f.negative = 0; !f.isZero();) {
                            var m = f.modrn(l).toString(t);
                            r = (f = f.idivn(l)).isZero() ? m + r : c[a - m.length] + m + r
                        }
                        for (this.isZero() && (r = "0" + r); r.length % e != 0;) r = "0" + r;
                        return 0 !== this.negative && (r = "-" + r), r
                    }
                    i(!1, "Base should be between 2 and 36")
                }, o.prototype.toNumber = function() {
                    var t = this.words[0];
                    return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
                }, o.prototype.toJSON = function() {
                    return this.toString(16, 2)
                }, f && (o.prototype.toBuffer = function(t, e) {
                    return this.toArrayLike(f, t, e)
                }), o.prototype.toArray = function(t, e) {
                    return this.toArrayLike(Array, t, e)
                }, o.prototype.toArrayLike = function(t, e, r) {
                    this._strip();
                    var n = this.byteLength(),
                        o = r || Math.max(1, n);
                    i(n <= o, "byte array longer than desired length"), i(o > 0, "Requested array length <= 0");
                    var s = t.allocUnsafe ? t.allocUnsafe(o) : new t(o);
                    return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, n), s
                }, o.prototype._toArrayLikeLE = function(t, e) {
                    for (var r = 0, i = 0, n = 0, o = 0; n < this.length; n++) {
                        var s = this.words[n] << o | i;
                        t[r++] = 255 & s, r < t.length && (t[r++] = s >> 8 & 255), r < t.length && (t[r++] = s >> 16 & 255), 6 === o ? (r < t.length && (t[r++] = s >> 24 & 255), i = 0, o = 0) : (i = s >>> 24, o += 2)
                    }
                    if (r < t.length)
                        for (t[r++] = i; r < t.length;) t[r++] = 0
                }, o.prototype._toArrayLikeBE = function(t, e) {
                    for (var r = t.length - 1, i = 0, n = 0, o = 0; n < this.length; n++) {
                        var s = this.words[n] << o | i;
                        t[r--] = 255 & s, r >= 0 && (t[r--] = s >> 8 & 255), r >= 0 && (t[r--] = s >> 16 & 255), 6 === o ? (r >= 0 && (t[r--] = s >> 24 & 255), i = 0, o = 0) : (i = s >>> 24, o += 2)
                    }
                    if (r >= 0)
                        for (t[r--] = i; r >= 0;) t[r--] = 0
                }, Math.clz32 ? o.prototype._countBits = function(t) {
                    return 32 - Math.clz32(t)
                } : o.prototype._countBits = function(t) {
                    var e = t,
                        r = 0;
                    return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r += 4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
                }, o.prototype._zeroBits = function(t) {
                    if (0 === t) return 26;
                    var e = t,
                        r = 0;
                    return (8191 & e) == 0 && (r += 13, e >>>= 13), (127 & e) == 0 && (r += 7, e >>>= 7), (15 & e) == 0 && (r += 4, e >>>= 4), (3 & e) == 0 && (r += 2, e >>>= 2), (1 & e) == 0 && r++, r
                }, o.prototype.bitLength = function() {
                    var t = this.words[this.length - 1],
                        e = this._countBits(t);
                    return (this.length - 1) * 26 + e
                }, o.prototype.zeroBits = function() {
                    if (this.isZero()) return 0;
                    for (var t = 0, e = 0; e < this.length; e++) {
                        var r = this._zeroBits(this.words[e]);
                        if (t += r, 26 !== r) break
                    }
                    return t
                }, o.prototype.byteLength = function() {
                    return Math.ceil(this.bitLength() / 8)
                }, o.prototype.toTwos = function(t) {
                    return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                }, o.prototype.fromTwos = function(t) {
                    return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                }, o.prototype.isNeg = function() {
                    return 0 !== this.negative
                }, o.prototype.neg = function() {
                    return this.clone().ineg()
                }, o.prototype.ineg = function() {
                    return this.isZero() || (this.negative ^= 1), this
                }, o.prototype.iuor = function(t) {
                    for (; this.length < t.length;) this.words[this.length++] = 0;
                    for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                    return this._strip()
                }, o.prototype.ior = function(t) {
                    return i((this.negative | t.negative) == 0), this.iuor(t)
                }, o.prototype.or = function(t) {
                    return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                }, o.prototype.uor = function(t) {
                    return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                }, o.prototype.iuand = function(t) {
                    var e;
                    e = this.length > t.length ? t : this;
                    for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
                    return this.length = e.length, this._strip()
                }, o.prototype.iand = function(t) {
                    return i((this.negative | t.negative) == 0), this.iuand(t)
                }, o.prototype.and = function(t) {
                    return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                }, o.prototype.uand = function(t) {
                    return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                }, o.prototype.iuxor = function(t) {
                    this.length > t.length ? (e = this, r = t) : (e = t, r = this);
                    for (var e, r, i = 0; i < r.length; i++) this.words[i] = e.words[i] ^ r.words[i];
                    if (this !== e)
                        for (; i < e.length; i++) this.words[i] = e.words[i];
                    return this.length = e.length, this._strip()
                }, o.prototype.ixor = function(t) {
                    return i((this.negative | t.negative) == 0), this.iuxor(t)
                }, o.prototype.xor = function(t) {
                    return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                }, o.prototype.uxor = function(t) {
                    return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                }, o.prototype.inotn = function(t) {
                    i("number" == typeof t && t >= 0);
                    var e = 0 | Math.ceil(t / 26),
                        r = t % 26;
                    this._expand(e), r > 0 && e--;
                    for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n];
                    return r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r), this._strip()
                }, o.prototype.notn = function(t) {
                    return this.clone().inotn(t)
                }, o.prototype.setn = function(t, e) {
                    i("number" == typeof t && t >= 0);
                    var r = t / 26 | 0,
                        n = t % 26;
                    return this._expand(r + 1), e ? this.words[r] = this.words[r] | 1 << n : this.words[r] = this.words[r] & ~(1 << n), this._strip()
                }, o.prototype.iadd = function(t) {
                    if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                    if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                    this.length > t.length ? (r = this, i = t) : (r = t, i = this);
                    for (var e, r, i, n = 0, o = 0; o < i.length; o++) e = (0 | r.words[o]) + (0 | i.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                    for (; 0 !== n && o < r.length; o++) e = (0 | r.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                    if (this.length = r.length, 0 !== n) this.words[this.length] = n, this.length++;
                    else if (r !== this)
                        for (; o < r.length; o++) this.words[o] = r.words[o];
                    return this
                }, o.prototype.add = function(t) {
                    var e;
                    return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                }, o.prototype.isub = function(t) {
                    if (0 !== t.negative) {
                        t.negative = 0;
                        var e, r, i = this.iadd(t);
                        return t.negative = 1, i._normSign()
                    }
                    if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                    var n = this.cmp(t);
                    if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                    n > 0 ? (e = this, r = t) : (e = t, r = this);
                    for (var o = 0, s = 0; s < r.length; s++) o = (i = (0 | e.words[s]) - (0 | r.words[s]) + o) >> 26, this.words[s] = 67108863 & i;
                    for (; 0 !== o && s < e.length; s++) o = (i = (0 | e.words[s]) + o) >> 26, this.words[s] = 67108863 & i;
                    if (0 === o && s < e.length && e !== this)
                        for (; s < e.length; s++) this.words[s] = e.words[s];
                    return this.length = Math.max(this.length, s), e !== this && (this.negative = 1), this._strip()
                }, o.prototype.sub = function(t) {
                    return this.clone().isub(t)
                };
                var g = function(t, e, r) {
                    var i, n, o, s = t.words,
                        u = e.words,
                        h = r.words,
                        a = 0,
                        l = 0 | s[0],
                        f = 8191 & l,
                        c = l >>> 13,
                        d = 0 | s[1],
                        p = 8191 & d,
                        m = d >>> 13,
                        g = 0 | s[2],
                        y = 8191 & g,
                        v = g >>> 13,
                        w = 0 | s[3],
                        b = 8191 & w,
                        M = w >>> 13,
                        E = 0 | s[4],
                        x = 8191 & E,
                        _ = E >>> 13,
                        B = 0 | s[5],
                        A = 8191 & B,
                        I = B >>> 13,
                        S = 0 | s[6],
                        k = 8191 & S,
                        O = S >>> 13,
                        L = 0 | s[7],
                        R = 8191 & L,
                        U = L >>> 13,
                        P = 0 | s[8],
                        T = 8191 & P,
                        N = P >>> 13,
                        j = 0 | s[9],
                        q = 8191 & j,
                        C = j >>> 13,
                        Z = 0 | u[0],
                        F = 8191 & Z,
                        z = Z >>> 13,
                        $ = 0 | u[1],
                        H = 8191 & $,
                        D = $ >>> 13,
                        V = 0 | u[2],
                        G = 8191 & V,
                        K = V >>> 13,
                        Y = 0 | u[3],
                        W = 8191 & Y,
                        J = Y >>> 13,
                        Q = 0 | u[4],
                        X = 8191 & Q,
                        tt = Q >>> 13,
                        te = 0 | u[5],
                        tr = 8191 & te,
                        ti = te >>> 13,
                        tn = 0 | u[6],
                        to = 8191 & tn,
                        ts = tn >>> 13,
                        tu = 0 | u[7],
                        th = 8191 & tu,
                        ta = tu >>> 13,
                        tl = 0 | u[8],
                        tf = 8191 & tl,
                        tc = tl >>> 13,
                        td = 0 | u[9],
                        tp = 8191 & td,
                        tm = td >>> 13;
                    r.negative = t.negative ^ e.negative, r.length = 19;
                    var tg = (a + (i = Math.imul(f, F)) | 0) + ((8191 & (n = (n = Math.imul(f, z)) + Math.imul(c, F) | 0)) << 13) | 0;
                    a = ((o = Math.imul(c, z)) + (n >>> 13) | 0) + (tg >>> 26) | 0, tg &= 67108863, i = Math.imul(p, F), n = (n = Math.imul(p, z)) + Math.imul(m, F) | 0, o = Math.imul(m, z);
                    var ty = (a + (i = i + Math.imul(f, H) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, D) | 0) + Math.imul(c, H) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, D) | 0) + (n >>> 13) | 0) + (ty >>> 26) | 0, ty &= 67108863, i = Math.imul(y, F), n = (n = Math.imul(y, z)) + Math.imul(v, F) | 0, o = Math.imul(v, z), i = i + Math.imul(p, H) | 0, n = (n = n + Math.imul(p, D) | 0) + Math.imul(m, H) | 0, o = o + Math.imul(m, D) | 0;
                    var tv = (a + (i = i + Math.imul(f, G) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, K) | 0) + Math.imul(c, G) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, K) | 0) + (n >>> 13) | 0) + (tv >>> 26) | 0, tv &= 67108863, i = Math.imul(b, F), n = (n = Math.imul(b, z)) + Math.imul(M, F) | 0, o = Math.imul(M, z), i = i + Math.imul(y, H) | 0, n = (n = n + Math.imul(y, D) | 0) + Math.imul(v, H) | 0, o = o + Math.imul(v, D) | 0, i = i + Math.imul(p, G) | 0, n = (n = n + Math.imul(p, K) | 0) + Math.imul(m, G) | 0, o = o + Math.imul(m, K) | 0;
                    var tw = (a + (i = i + Math.imul(f, W) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, J) | 0) + Math.imul(c, W) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, J) | 0) + (n >>> 13) | 0) + (tw >>> 26) | 0, tw &= 67108863, i = Math.imul(x, F), n = (n = Math.imul(x, z)) + Math.imul(_, F) | 0, o = Math.imul(_, z), i = i + Math.imul(b, H) | 0, n = (n = n + Math.imul(b, D) | 0) + Math.imul(M, H) | 0, o = o + Math.imul(M, D) | 0, i = i + Math.imul(y, G) | 0, n = (n = n + Math.imul(y, K) | 0) + Math.imul(v, G) | 0, o = o + Math.imul(v, K) | 0, i = i + Math.imul(p, W) | 0, n = (n = n + Math.imul(p, J) | 0) + Math.imul(m, W) | 0, o = o + Math.imul(m, J) | 0;
                    var tb = (a + (i = i + Math.imul(f, X) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, tt) | 0) + Math.imul(c, X) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, tt) | 0) + (n >>> 13) | 0) + (tb >>> 26) | 0, tb &= 67108863, i = Math.imul(A, F), n = (n = Math.imul(A, z)) + Math.imul(I, F) | 0, o = Math.imul(I, z), i = i + Math.imul(x, H) | 0, n = (n = n + Math.imul(x, D) | 0) + Math.imul(_, H) | 0, o = o + Math.imul(_, D) | 0, i = i + Math.imul(b, G) | 0, n = (n = n + Math.imul(b, K) | 0) + Math.imul(M, G) | 0, o = o + Math.imul(M, K) | 0, i = i + Math.imul(y, W) | 0, n = (n = n + Math.imul(y, J) | 0) + Math.imul(v, W) | 0, o = o + Math.imul(v, J) | 0, i = i + Math.imul(p, X) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(m, X) | 0, o = o + Math.imul(m, tt) | 0;
                    var tM = (a + (i = i + Math.imul(f, tr) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, ti) | 0) + Math.imul(c, tr) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, ti) | 0) + (n >>> 13) | 0) + (tM >>> 26) | 0, tM &= 67108863, i = Math.imul(k, F), n = (n = Math.imul(k, z)) + Math.imul(O, F) | 0, o = Math.imul(O, z), i = i + Math.imul(A, H) | 0, n = (n = n + Math.imul(A, D) | 0) + Math.imul(I, H) | 0, o = o + Math.imul(I, D) | 0, i = i + Math.imul(x, G) | 0, n = (n = n + Math.imul(x, K) | 0) + Math.imul(_, G) | 0, o = o + Math.imul(_, K) | 0, i = i + Math.imul(b, W) | 0, n = (n = n + Math.imul(b, J) | 0) + Math.imul(M, W) | 0, o = o + Math.imul(M, J) | 0, i = i + Math.imul(y, X) | 0, n = (n = n + Math.imul(y, tt) | 0) + Math.imul(v, X) | 0, o = o + Math.imul(v, tt) | 0, i = i + Math.imul(p, tr) | 0, n = (n = n + Math.imul(p, ti) | 0) + Math.imul(m, tr) | 0, o = o + Math.imul(m, ti) | 0;
                    var tE = (a + (i = i + Math.imul(f, to) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, ts) | 0) + Math.imul(c, to) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, ts) | 0) + (n >>> 13) | 0) + (tE >>> 26) | 0, tE &= 67108863, i = Math.imul(R, F), n = (n = Math.imul(R, z)) + Math.imul(U, F) | 0, o = Math.imul(U, z), i = i + Math.imul(k, H) | 0, n = (n = n + Math.imul(k, D) | 0) + Math.imul(O, H) | 0, o = o + Math.imul(O, D) | 0, i = i + Math.imul(A, G) | 0, n = (n = n + Math.imul(A, K) | 0) + Math.imul(I, G) | 0, o = o + Math.imul(I, K) | 0, i = i + Math.imul(x, W) | 0, n = (n = n + Math.imul(x, J) | 0) + Math.imul(_, W) | 0, o = o + Math.imul(_, J) | 0, i = i + Math.imul(b, X) | 0, n = (n = n + Math.imul(b, tt) | 0) + Math.imul(M, X) | 0, o = o + Math.imul(M, tt) | 0, i = i + Math.imul(y, tr) | 0, n = (n = n + Math.imul(y, ti) | 0) + Math.imul(v, tr) | 0, o = o + Math.imul(v, ti) | 0, i = i + Math.imul(p, to) | 0, n = (n = n + Math.imul(p, ts) | 0) + Math.imul(m, to) | 0, o = o + Math.imul(m, ts) | 0;
                    var tx = (a + (i = i + Math.imul(f, th) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, ta) | 0) + Math.imul(c, th) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, ta) | 0) + (n >>> 13) | 0) + (tx >>> 26) | 0, tx &= 67108863, i = Math.imul(T, F), n = (n = Math.imul(T, z)) + Math.imul(N, F) | 0, o = Math.imul(N, z), i = i + Math.imul(R, H) | 0, n = (n = n + Math.imul(R, D) | 0) + Math.imul(U, H) | 0, o = o + Math.imul(U, D) | 0, i = i + Math.imul(k, G) | 0, n = (n = n + Math.imul(k, K) | 0) + Math.imul(O, G) | 0, o = o + Math.imul(O, K) | 0, i = i + Math.imul(A, W) | 0, n = (n = n + Math.imul(A, J) | 0) + Math.imul(I, W) | 0, o = o + Math.imul(I, J) | 0, i = i + Math.imul(x, X) | 0, n = (n = n + Math.imul(x, tt) | 0) + Math.imul(_, X) | 0, o = o + Math.imul(_, tt) | 0, i = i + Math.imul(b, tr) | 0, n = (n = n + Math.imul(b, ti) | 0) + Math.imul(M, tr) | 0, o = o + Math.imul(M, ti) | 0, i = i + Math.imul(y, to) | 0, n = (n = n + Math.imul(y, ts) | 0) + Math.imul(v, to) | 0, o = o + Math.imul(v, ts) | 0, i = i + Math.imul(p, th) | 0, n = (n = n + Math.imul(p, ta) | 0) + Math.imul(m, th) | 0, o = o + Math.imul(m, ta) | 0;
                    var t_ = (a + (i = i + Math.imul(f, tf) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, tc) | 0) + Math.imul(c, tf) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, tc) | 0) + (n >>> 13) | 0) + (t_ >>> 26) | 0, t_ &= 67108863, i = Math.imul(q, F), n = (n = Math.imul(q, z)) + Math.imul(C, F) | 0, o = Math.imul(C, z), i = i + Math.imul(T, H) | 0, n = (n = n + Math.imul(T, D) | 0) + Math.imul(N, H) | 0, o = o + Math.imul(N, D) | 0, i = i + Math.imul(R, G) | 0, n = (n = n + Math.imul(R, K) | 0) + Math.imul(U, G) | 0, o = o + Math.imul(U, K) | 0, i = i + Math.imul(k, W) | 0, n = (n = n + Math.imul(k, J) | 0) + Math.imul(O, W) | 0, o = o + Math.imul(O, J) | 0, i = i + Math.imul(A, X) | 0, n = (n = n + Math.imul(A, tt) | 0) + Math.imul(I, X) | 0, o = o + Math.imul(I, tt) | 0, i = i + Math.imul(x, tr) | 0, n = (n = n + Math.imul(x, ti) | 0) + Math.imul(_, tr) | 0, o = o + Math.imul(_, ti) | 0, i = i + Math.imul(b, to) | 0, n = (n = n + Math.imul(b, ts) | 0) + Math.imul(M, to) | 0, o = o + Math.imul(M, ts) | 0, i = i + Math.imul(y, th) | 0, n = (n = n + Math.imul(y, ta) | 0) + Math.imul(v, th) | 0, o = o + Math.imul(v, ta) | 0, i = i + Math.imul(p, tf) | 0, n = (n = n + Math.imul(p, tc) | 0) + Math.imul(m, tf) | 0, o = o + Math.imul(m, tc) | 0;
                    var tB = (a + (i = i + Math.imul(f, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, tm) | 0) + Math.imul(c, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(c, tm) | 0) + (n >>> 13) | 0) + (tB >>> 26) | 0, tB &= 67108863, i = Math.imul(q, H), n = (n = Math.imul(q, D)) + Math.imul(C, H) | 0, o = Math.imul(C, D), i = i + Math.imul(T, G) | 0, n = (n = n + Math.imul(T, K) | 0) + Math.imul(N, G) | 0, o = o + Math.imul(N, K) | 0, i = i + Math.imul(R, W) | 0, n = (n = n + Math.imul(R, J) | 0) + Math.imul(U, W) | 0, o = o + Math.imul(U, J) | 0, i = i + Math.imul(k, X) | 0, n = (n = n + Math.imul(k, tt) | 0) + Math.imul(O, X) | 0, o = o + Math.imul(O, tt) | 0, i = i + Math.imul(A, tr) | 0, n = (n = n + Math.imul(A, ti) | 0) + Math.imul(I, tr) | 0, o = o + Math.imul(I, ti) | 0, i = i + Math.imul(x, to) | 0, n = (n = n + Math.imul(x, ts) | 0) + Math.imul(_, to) | 0, o = o + Math.imul(_, ts) | 0, i = i + Math.imul(b, th) | 0, n = (n = n + Math.imul(b, ta) | 0) + Math.imul(M, th) | 0, o = o + Math.imul(M, ta) | 0, i = i + Math.imul(y, tf) | 0, n = (n = n + Math.imul(y, tc) | 0) + Math.imul(v, tf) | 0, o = o + Math.imul(v, tc) | 0;
                    var tA = (a + (i = i + Math.imul(p, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, tm) | 0) + Math.imul(m, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(m, tm) | 0) + (n >>> 13) | 0) + (tA >>> 26) | 0, tA &= 67108863, i = Math.imul(q, G), n = (n = Math.imul(q, K)) + Math.imul(C, G) | 0, o = Math.imul(C, K), i = i + Math.imul(T, W) | 0, n = (n = n + Math.imul(T, J) | 0) + Math.imul(N, W) | 0, o = o + Math.imul(N, J) | 0, i = i + Math.imul(R, X) | 0, n = (n = n + Math.imul(R, tt) | 0) + Math.imul(U, X) | 0, o = o + Math.imul(U, tt) | 0, i = i + Math.imul(k, tr) | 0, n = (n = n + Math.imul(k, ti) | 0) + Math.imul(O, tr) | 0, o = o + Math.imul(O, ti) | 0, i = i + Math.imul(A, to) | 0, n = (n = n + Math.imul(A, ts) | 0) + Math.imul(I, to) | 0, o = o + Math.imul(I, ts) | 0, i = i + Math.imul(x, th) | 0, n = (n = n + Math.imul(x, ta) | 0) + Math.imul(_, th) | 0, o = o + Math.imul(_, ta) | 0, i = i + Math.imul(b, tf) | 0, n = (n = n + Math.imul(b, tc) | 0) + Math.imul(M, tf) | 0, o = o + Math.imul(M, tc) | 0;
                    var tI = (a + (i = i + Math.imul(y, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(y, tm) | 0) + Math.imul(v, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(v, tm) | 0) + (n >>> 13) | 0) + (tI >>> 26) | 0, tI &= 67108863, i = Math.imul(q, W), n = (n = Math.imul(q, J)) + Math.imul(C, W) | 0, o = Math.imul(C, J), i = i + Math.imul(T, X) | 0, n = (n = n + Math.imul(T, tt) | 0) + Math.imul(N, X) | 0, o = o + Math.imul(N, tt) | 0, i = i + Math.imul(R, tr) | 0, n = (n = n + Math.imul(R, ti) | 0) + Math.imul(U, tr) | 0, o = o + Math.imul(U, ti) | 0, i = i + Math.imul(k, to) | 0, n = (n = n + Math.imul(k, ts) | 0) + Math.imul(O, to) | 0, o = o + Math.imul(O, ts) | 0, i = i + Math.imul(A, th) | 0, n = (n = n + Math.imul(A, ta) | 0) + Math.imul(I, th) | 0, o = o + Math.imul(I, ta) | 0, i = i + Math.imul(x, tf) | 0, n = (n = n + Math.imul(x, tc) | 0) + Math.imul(_, tf) | 0, o = o + Math.imul(_, tc) | 0;
                    var tS = (a + (i = i + Math.imul(b, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(b, tm) | 0) + Math.imul(M, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(M, tm) | 0) + (n >>> 13) | 0) + (tS >>> 26) | 0, tS &= 67108863, i = Math.imul(q, X), n = (n = Math.imul(q, tt)) + Math.imul(C, X) | 0, o = Math.imul(C, tt), i = i + Math.imul(T, tr) | 0, n = (n = n + Math.imul(T, ti) | 0) + Math.imul(N, tr) | 0, o = o + Math.imul(N, ti) | 0, i = i + Math.imul(R, to) | 0, n = (n = n + Math.imul(R, ts) | 0) + Math.imul(U, to) | 0, o = o + Math.imul(U, ts) | 0, i = i + Math.imul(k, th) | 0, n = (n = n + Math.imul(k, ta) | 0) + Math.imul(O, th) | 0, o = o + Math.imul(O, ta) | 0, i = i + Math.imul(A, tf) | 0, n = (n = n + Math.imul(A, tc) | 0) + Math.imul(I, tf) | 0, o = o + Math.imul(I, tc) | 0;
                    var tk = (a + (i = i + Math.imul(x, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(x, tm) | 0) + Math.imul(_, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(_, tm) | 0) + (n >>> 13) | 0) + (tk >>> 26) | 0, tk &= 67108863, i = Math.imul(q, tr), n = (n = Math.imul(q, ti)) + Math.imul(C, tr) | 0, o = Math.imul(C, ti), i = i + Math.imul(T, to) | 0, n = (n = n + Math.imul(T, ts) | 0) + Math.imul(N, to) | 0, o = o + Math.imul(N, ts) | 0, i = i + Math.imul(R, th) | 0, n = (n = n + Math.imul(R, ta) | 0) + Math.imul(U, th) | 0, o = o + Math.imul(U, ta) | 0, i = i + Math.imul(k, tf) | 0, n = (n = n + Math.imul(k, tc) | 0) + Math.imul(O, tf) | 0, o = o + Math.imul(O, tc) | 0;
                    var tO = (a + (i = i + Math.imul(A, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(A, tm) | 0) + Math.imul(I, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(I, tm) | 0) + (n >>> 13) | 0) + (tO >>> 26) | 0, tO &= 67108863, i = Math.imul(q, to), n = (n = Math.imul(q, ts)) + Math.imul(C, to) | 0, o = Math.imul(C, ts), i = i + Math.imul(T, th) | 0, n = (n = n + Math.imul(T, ta) | 0) + Math.imul(N, th) | 0, o = o + Math.imul(N, ta) | 0, i = i + Math.imul(R, tf) | 0, n = (n = n + Math.imul(R, tc) | 0) + Math.imul(U, tf) | 0, o = o + Math.imul(U, tc) | 0;
                    var tL = (a + (i = i + Math.imul(k, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(k, tm) | 0) + Math.imul(O, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(O, tm) | 0) + (n >>> 13) | 0) + (tL >>> 26) | 0, tL &= 67108863, i = Math.imul(q, th), n = (n = Math.imul(q, ta)) + Math.imul(C, th) | 0, o = Math.imul(C, ta), i = i + Math.imul(T, tf) | 0, n = (n = n + Math.imul(T, tc) | 0) + Math.imul(N, tf) | 0, o = o + Math.imul(N, tc) | 0;
                    var tR = (a + (i = i + Math.imul(R, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(R, tm) | 0) + Math.imul(U, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(U, tm) | 0) + (n >>> 13) | 0) + (tR >>> 26) | 0, tR &= 67108863, i = Math.imul(q, tf), n = (n = Math.imul(q, tc)) + Math.imul(C, tf) | 0, o = Math.imul(C, tc);
                    var tU = (a + (i = i + Math.imul(T, tp) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, tm) | 0) + Math.imul(N, tp) | 0)) << 13) | 0;
                    a = ((o = o + Math.imul(N, tm) | 0) + (n >>> 13) | 0) + (tU >>> 26) | 0, tU &= 67108863;
                    var tP = (a + (i = Math.imul(q, tp)) | 0) + ((8191 & (n = (n = Math.imul(q, tm)) + Math.imul(C, tp) | 0)) << 13) | 0;
                    return a = ((o = Math.imul(C, tm)) + (n >>> 13) | 0) + (tP >>> 26) | 0, tP &= 67108863, h[0] = tg, h[1] = ty, h[2] = tv, h[3] = tw, h[4] = tb, h[5] = tM, h[6] = tE, h[7] = tx, h[8] = t_, h[9] = tB, h[10] = tA, h[11] = tI, h[12] = tS, h[13] = tk, h[14] = tO, h[15] = tL, h[16] = tR, h[17] = tU, h[18] = tP, 0 !== a && (h[19] = a, r.length++), r
                };

                function y(t, e, r) {
                    r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
                    for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                        var s = n;
                        n = 0;
                        for (var u = 67108863 & i, h = Math.min(o, e.length - 1), a = Math.max(0, o - t.length + 1); a <= h; a++) {
                            var l = o - a,
                                f = (0 | t.words[l]) * (0 | e.words[a]),
                                c = 67108863 & f;
                            s = s + (f / 67108864 | 0) | 0, u = 67108863 & (c = c + u | 0), n += (s = s + (c >>> 26) | 0) >>> 26, s &= 67108863
                        }
                        r.words[o] = u, i = s, s = n
                    }
                    return 0 !== i ? r.words[o] = i : r.length--, r._strip()
                }

                function v(t, e) {
                    this.x = t, this.y = e
                }
                Math.imul || (g = m), o.prototype.mulTo = function(t, e) {
                    var r, i = this.length + t.length;
                    return 10 === this.length && 10 === t.length ? g(this, t, e) : i < 63 ? m(this, t, e) : y(this, t, e)
                }, v.prototype.makeRBT = function(t) {
                    for (var e = Array(t), r = o.prototype._countBits(t) - 1, i = 0; i < t; i++) e[i] = this.revBin(i, r, t);
                    return e
                }, v.prototype.revBin = function(t, e, r) {
                    if (0 === t || t === r - 1) return t;
                    for (var i = 0, n = 0; n < e; n++) i |= (1 & t) << e - n - 1, t >>= 1;
                    return i
                }, v.prototype.permute = function(t, e, r, i, n, o) {
                    for (var s = 0; s < o; s++) i[s] = e[t[s]], n[s] = r[t[s]]
                }, v.prototype.transform = function(t, e, r, i, n, o) {
                    this.permute(o, t, e, r, i, n);
                    for (var s = 1; s < n; s <<= 1)
                        for (var u = s << 1, h = Math.cos(2 * Math.PI / u), a = Math.sin(2 * Math.PI / u), l = 0; l < n; l += u)
                            for (var f = h, c = a, d = 0; d < s; d++) {
                                var p = r[l + d],
                                    m = i[l + d],
                                    g = r[l + d + s],
                                    y = i[l + d + s],
                                    v = f * g - c * y;
                                y = f * y + c * g, g = v, r[l + d] = p + g, i[l + d] = m + y, r[l + d + s] = p - g, i[l + d + s] = m - y, d !== u && (v = h * f - a * c, c = h * c + a * f, f = v)
                            }
                }, v.prototype.guessLen13b = function(t, e) {
                    var r = 1 | Math.max(e, t),
                        i = 1 & r,
                        n = 0;
                    for (r = r / 2 | 0; r; r >>>= 1) n++;
                    return 1 << n + 1 + i
                }, v.prototype.conjugate = function(t, e, r) {
                    if (!(r <= 1))
                        for (var i = 0; i < r / 2; i++) {
                            var n = t[i];
                            t[i] = t[r - i - 1], t[r - i - 1] = n, n = e[i], e[i] = -e[r - i - 1], e[r - i - 1] = -n
                        }
                }, v.prototype.normalize13b = function(t, e) {
                    for (var r = 0, i = 0; i < e / 2; i++) {
                        var n = 8192 * Math.round(t[2 * i + 1] / e) + Math.round(t[2 * i] / e) + r;
                        t[i] = 67108863 & n, r = n < 67108864 ? 0 : n / 67108864 | 0
                    }
                    return t
                }, v.prototype.convert13b = function(t, e, r, n) {
                    for (var o = 0, s = 0; s < e; s++) o += 0 | t[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
                    for (s = 2 * e; s < n; ++s) r[s] = 0;
                    i(0 === o), i((-8192 & o) == 0)
                }, v.prototype.stub = function(t) {
                    for (var e = Array(t), r = 0; r < t; r++) e[r] = 0;
                    return e
                }, v.prototype.mulp = function(t, e, r) {
                    var i = 2 * this.guessLen13b(t.length, e.length),
                        n = this.makeRBT(i),
                        o = this.stub(i),
                        s = Array(i),
                        u = Array(i),
                        h = Array(i),
                        a = Array(i),
                        l = Array(i),
                        f = Array(i),
                        c = r.words;
                    c.length = i, this.convert13b(t.words, t.length, s, i), this.convert13b(e.words, e.length, a, i), this.transform(s, o, u, h, i, n), this.transform(a, o, l, f, i, n);
                    for (var d = 0; d < i; d++) {
                        var p = u[d] * l[d] - h[d] * f[d];
                        h[d] = u[d] * f[d] + h[d] * l[d], u[d] = p
                    }
                    return this.conjugate(u, h, i), this.transform(u, h, c, o, i, n), this.conjugate(c, o, i), this.normalize13b(c, i), r.negative = t.negative ^ e.negative, r.length = t.length + e.length, r._strip()
                }, o.prototype.mul = function(t) {
                    var e = new o(null);
                    return e.words = Array(this.length + t.length), this.mulTo(t, e)
                }, o.prototype.mulf = function(t) {
                    var e = new o(null);
                    return e.words = Array(this.length + t.length), y(this, t, e)
                }, o.prototype.imul = function(t) {
                    return this.clone().mulTo(t, this)
                }, o.prototype.imuln = function(t) {
                    var e = t < 0;
                    e && (t = -t), i("number" == typeof t), i(t < 67108864);
                    for (var r = 0, n = 0; n < this.length; n++) {
                        var o = (0 | this.words[n]) * t,
                            s = (67108863 & o) + (67108863 & r);
                        r >>= 26, r += (o / 67108864 | 0) + (s >>> 26), this.words[n] = 67108863 & s
                    }
                    return 0 !== r && (this.words[n] = r, this.length++), e ? this.ineg() : this
                }, o.prototype.muln = function(t) {
                    return this.clone().imuln(t)
                }, o.prototype.sqr = function() {
                    return this.mul(this)
                }, o.prototype.isqr = function() {
                    return this.imul(this.clone())
                }, o.prototype.pow = function(t) {
                    var e = function(t) {
                        for (var e = Array(t.bitLength()), r = 0; r < e.length; r++) {
                            var i = r / 26 | 0,
                                n = r % 26;
                            e[r] = t.words[i] >>> n & 1
                        }
                        return e
                    }(t);
                    if (0 === e.length) return new o(1);
                    for (var r = this, i = 0; i < e.length && 0 === e[i]; i++, r = r.sqr());
                    if (++i < e.length)
                        for (var n = r.sqr(); i < e.length; i++, n = n.sqr()) 0 !== e[i] && (r = r.mul(n));
                    return r
                }, o.prototype.iushln = function(t) {
                    i("number" == typeof t && t >= 0);
                    var e, r = t % 26,
                        n = (t - r) / 26,
                        o = 67108863 >>> 26 - r << 26 - r;
                    if (0 !== r) {
                        var s = 0;
                        for (e = 0; e < this.length; e++) {
                            var u = this.words[e] & o,
                                h = (0 | this.words[e]) - u << r;
                            this.words[e] = h | s, s = u >>> 26 - r
                        }
                        s && (this.words[e] = s, this.length++)
                    }
                    if (0 !== n) {
                        for (e = this.length - 1; e >= 0; e--) this.words[e + n] = this.words[e];
                        for (e = 0; e < n; e++) this.words[e] = 0;
                        this.length += n
                    }
                    return this._strip()
                }, o.prototype.ishln = function(t) {
                    return i(0 === this.negative), this.iushln(t)
                }, o.prototype.iushrn = function(t, e, r) {
                    i("number" == typeof t && t >= 0), n = e ? (e - e % 26) / 26 : 0;
                    var n, o = t % 26,
                        s = Math.min((t - o) / 26, this.length),
                        u = 67108863 ^ 67108863 >>> o << o;
                    if (n -= s, n = Math.max(0, n), r) {
                        for (var h = 0; h < s; h++) r.words[h] = this.words[h];
                        r.length = s
                    }
                    if (0 === s);
                    else if (this.length > s)
                        for (this.length -= s, h = 0; h < this.length; h++) this.words[h] = this.words[h + s];
                    else this.words[0] = 0, this.length = 1;
                    var a = 0;
                    for (h = this.length - 1; h >= 0 && (0 !== a || h >= n); h--) {
                        var l = 0 | this.words[h];
                        this.words[h] = a << 26 - o | l >>> o, a = l & u
                    }
                    return r && 0 !== a && (r.words[r.length++] = a), 0 === this.length && (this.words[0] = 0, this.length = 1), this._strip()
                }, o.prototype.ishrn = function(t, e, r) {
                    return i(0 === this.negative), this.iushrn(t, e, r)
                }, o.prototype.shln = function(t) {
                    return this.clone().ishln(t)
                }, o.prototype.ushln = function(t) {
                    return this.clone().iushln(t)
                }, o.prototype.shrn = function(t) {
                    return this.clone().ishrn(t)
                }, o.prototype.ushrn = function(t) {
                    return this.clone().iushrn(t)
                }, o.prototype.testn = function(t) {
                    i("number" == typeof t && t >= 0);
                    var e = t % 26,
                        r = (t - e) / 26;
                    return !(this.length <= r) && !!(this.words[r] & 1 << e)
                }, o.prototype.imaskn = function(t) {
                    i("number" == typeof t && t >= 0);
                    var e = t % 26,
                        r = (t - e) / 26;
                    return (i(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r) ? this : (0 !== e && r++, this.length = Math.min(r, this.length), 0 !== e && (this.words[this.length - 1] &= 67108863 ^ 67108863 >>> e << e), this._strip())
                }, o.prototype.maskn = function(t) {
                    return this.clone().imaskn(t)
                }, o.prototype.iaddn = function(t) {
                    return (i("number" == typeof t), i(t < 67108864), t < 0) ? this.isubn(-t) : 0 !== this.negative ? (1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0) : (this.negative = 0, this.isubn(t), this.negative = 1), this) : this._iaddn(t)
                }, o.prototype._iaddn = function(t) {
                    this.words[0] += t;
                    for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                    return this.length = Math.max(this.length, e + 1), this
                }, o.prototype.isubn = function(t) {
                    if (i("number" == typeof t), i(t < 67108864), t < 0) return this.iaddn(-t);
                    if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                    if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                    else
                        for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                    return this._strip()
                }, o.prototype.addn = function(t) {
                    return this.clone().iaddn(t)
                }, o.prototype.subn = function(t) {
                    return this.clone().isubn(t)
                }, o.prototype.iabs = function() {
                    return this.negative = 0, this
                }, o.prototype.abs = function() {
                    return this.clone().iabs()
                }, o.prototype._ishlnsubmul = function(t, e, r) {
                    var n, o, s = t.length + r;
                    this._expand(s);
                    var u = 0;
                    for (n = 0; n < t.length; n++) {
                        o = (0 | this.words[n + r]) + u;
                        var h = (0 | t.words[n]) * e;
                        o -= 67108863 & h, u = (o >> 26) - (h / 67108864 | 0), this.words[n + r] = 67108863 & o
                    }
                    for (; n < this.length - r; n++) u = (o = (0 | this.words[n + r]) + u) >> 26, this.words[n + r] = 67108863 & o;
                    if (0 === u) return this._strip();
                    for (i(-1 === u), u = 0, n = 0; n < this.length; n++) u = (o = -(0 | this.words[n]) + u) >> 26, this.words[n] = 67108863 & o;
                    return this.negative = 1, this._strip()
                }, o.prototype._wordDiv = function(t, e) {
                    var r, i = this.length - t.length,
                        n = this.clone(),
                        s = t,
                        u = 0 | s.words[s.length - 1];
                    0 != (i = 26 - this._countBits(u)) && (s = s.ushln(i), n.iushln(i), u = 0 | s.words[s.length - 1]);
                    var h = n.length - s.length;
                    if ("mod" !== e) {
                        (r = new o(null)).length = h + 1, r.words = Array(r.length);
                        for (var a = 0; a < r.length; a++) r.words[a] = 0
                    }
                    var l = n.clone()._ishlnsubmul(s, 1, h);
                    0 === l.negative && (n = l, r && (r.words[h] = 1));
                    for (var f = h - 1; f >= 0; f--) {
                        var c = (0 | n.words[s.length + f]) * 67108864 + (0 | n.words[s.length + f - 1]);
                        for (c = Math.min(c / u | 0, 67108863), n._ishlnsubmul(s, c, f); 0 !== n.negative;) c--, n.negative = 0, n._ishlnsubmul(s, 1, f), n.isZero() || (n.negative ^= 1);
                        r && (r.words[f] = c)
                    }
                    return r && r._strip(), n._strip(), "div" !== e && 0 !== i && n.iushrn(i), {
                        div: r || null,
                        mod: n
                    }
                }, o.prototype.divmod = function(t, e, r) {
                    var n, s, u;
                    return (i(!t.isZero()), this.isZero()) ? {
                        div: new o(0),
                        mod: new o(0)
                    } : 0 !== this.negative && 0 === t.negative ? (u = this.neg().divmod(t, e), "mod" !== e && (n = u.div.neg()), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.iadd(t)), {
                        div: n,
                        mod: s
                    }) : 0 === this.negative && 0 !== t.negative ? (u = this.divmod(t.neg(), e), "mod" !== e && (n = u.div.neg()), {
                        div: n,
                        mod: u.mod
                    }) : (this.negative & t.negative) != 0 ? (u = this.neg().divmod(t.neg(), e), "div" !== e && (s = u.mod.neg(), r && 0 !== s.negative && s.isub(t)), {
                        div: u.div,
                        mod: s
                    }) : t.length > this.length || 0 > this.cmp(t) ? {
                        div: new o(0),
                        mod: this
                    } : 1 === t.length ? "div" === e ? {
                        div: this.divn(t.words[0]),
                        mod: null
                    } : "mod" === e ? {
                        div: null,
                        mod: new o(this.modrn(t.words[0]))
                    } : {
                        div: this.divn(t.words[0]),
                        mod: new o(this.modrn(t.words[0]))
                    } : this._wordDiv(t, e)
                }, o.prototype.div = function(t) {
                    return this.divmod(t, "div", !1).div
                }, o.prototype.mod = function(t) {
                    return this.divmod(t, "mod", !1).mod
                }, o.prototype.umod = function(t) {
                    return this.divmod(t, "mod", !0).mod
                }, o.prototype.divRound = function(t) {
                    var e = this.divmod(t);
                    if (e.mod.isZero()) return e.div;
                    var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                        i = t.ushrn(1),
                        n = t.andln(1),
                        o = r.cmp(i);
                    return o < 0 || 1 === n && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
                }, o.prototype.modrn = function(t) {
                    var e = t < 0;
                    e && (t = -t), i(t <= 67108863);
                    for (var r = 67108864 % t, n = 0, o = this.length - 1; o >= 0; o--) n = (r * n + (0 | this.words[o])) % t;
                    return e ? -n : n
                }, o.prototype.modn = function(t) {
                    return this.modrn(t)
                }, o.prototype.idivn = function(t) {
                    var e = t < 0;
                    e && (t = -t), i(t <= 67108863);
                    for (var r = 0, n = this.length - 1; n >= 0; n--) {
                        var o = (0 | this.words[n]) + 67108864 * r;
                        this.words[n] = o / t | 0, r = o % t
                    }
                    return this._strip(), e ? this.ineg() : this
                }, o.prototype.divn = function(t) {
                    return this.clone().idivn(t)
                }, o.prototype.egcd = function(t) {
                    i(0 === t.negative), i(!t.isZero());
                    var e = this,
                        r = t.clone();
                    e = 0 !== e.negative ? e.umod(t) : e.clone();
                    for (var n = new o(1), s = new o(0), u = new o(0), h = new o(1), a = 0; e.isEven() && r.isEven();) e.iushrn(1), r.iushrn(1), ++a;
                    for (var l = r.clone(), f = e.clone(); !e.isZero();) {
                        for (var c = 0, d = 1;
                            (e.words[0] & d) == 0 && c < 26; ++c, d <<= 1);
                        if (c > 0)
                            for (e.iushrn(c); c-- > 0;)(n.isOdd() || s.isOdd()) && (n.iadd(l), s.isub(f)), n.iushrn(1), s.iushrn(1);
                        for (var p = 0, m = 1;
                            (r.words[0] & m) == 0 && p < 26; ++p, m <<= 1);
                        if (p > 0)
                            for (r.iushrn(p); p-- > 0;)(u.isOdd() || h.isOdd()) && (u.iadd(l), h.isub(f)), u.iushrn(1), h.iushrn(1);
                        e.cmp(r) >= 0 ? (e.isub(r), n.isub(u), s.isub(h)) : (r.isub(e), u.isub(n), h.isub(s))
                    }
                    return {
                        a: u,
                        b: h,
                        gcd: r.iushln(a)
                    }
                }, o.prototype._invmp = function(t) {
                    i(0 === t.negative), i(!t.isZero());
                    var e, r = this,
                        n = t.clone();
                    r = 0 !== r.negative ? r.umod(t) : r.clone();
                    for (var s = new o(1), u = new o(0), h = n.clone(); r.cmpn(1) > 0 && n.cmpn(1) > 0;) {
                        for (var a = 0, l = 1;
                            (r.words[0] & l) == 0 && a < 26; ++a, l <<= 1);
                        if (a > 0)
                            for (r.iushrn(a); a-- > 0;) s.isOdd() && s.iadd(h), s.iushrn(1);
                        for (var f = 0, c = 1;
                            (n.words[0] & c) == 0 && f < 26; ++f, c <<= 1);
                        if (f > 0)
                            for (n.iushrn(f); f-- > 0;) u.isOdd() && u.iadd(h), u.iushrn(1);
                        r.cmp(n) >= 0 ? (r.isub(n), s.isub(u)) : (n.isub(r), u.isub(s))
                    }
                    return 0 > (e = 0 === r.cmpn(1) ? s : u).cmpn(0) && e.iadd(t), e
                }, o.prototype.gcd = function(t) {
                    if (this.isZero()) return t.abs();
                    if (t.isZero()) return this.abs();
                    var e = this.clone(),
                        r = t.clone();
                    e.negative = 0, r.negative = 0;
                    for (var i = 0; e.isEven() && r.isEven(); i++) e.iushrn(1), r.iushrn(1);
                    for (;;) {
                        for (; e.isEven();) e.iushrn(1);
                        for (; r.isEven();) r.iushrn(1);
                        var n = e.cmp(r);
                        if (n < 0) {
                            var o = e;
                            e = r, r = o
                        } else if (0 === n || 0 === r.cmpn(1)) break;
                        e.isub(r)
                    }
                    return r.iushln(i)
                }, o.prototype.invm = function(t) {
                    return this.egcd(t).a.umod(t)
                }, o.prototype.isEven = function() {
                    return (1 & this.words[0]) == 0
                }, o.prototype.isOdd = function() {
                    return (1 & this.words[0]) == 1
                }, o.prototype.andln = function(t) {
                    return this.words[0] & t
                }, o.prototype.bincn = function(t) {
                    i("number" == typeof t);
                    var e = t % 26,
                        r = (t - e) / 26,
                        n = 1 << e;
                    if (this.length <= r) return this._expand(r + 1), this.words[r] |= n, this;
                    for (var o = n, s = r; 0 !== o && s < this.length; s++) {
                        var u = 0 | this.words[s];
                        u += o, o = u >>> 26, u &= 67108863, this.words[s] = u
                    }
                    return 0 !== o && (this.words[s] = o, this.length++), this
                }, o.prototype.isZero = function() {
                    return 1 === this.length && 0 === this.words[0]
                }, o.prototype.cmpn = function(t) {
                    var e, r = t < 0;
                    if (0 !== this.negative && !r) return -1;
                    if (0 === this.negative && r) return 1;
                    if (this._strip(), this.length > 1) e = 1;
                    else {
                        r && (t = -t), i(t <= 67108863, "Number is too big");
                        var n = 0 | this.words[0];
                        e = n === t ? 0 : n < t ? -1 : 1
                    }
                    return 0 !== this.negative ? 0 | -e : e
                }, o.prototype.cmp = function(t) {
                    if (0 !== this.negative && 0 === t.negative) return -1;
                    if (0 === this.negative && 0 !== t.negative) return 1;
                    var e = this.ucmp(t);
                    return 0 !== this.negative ? 0 | -e : e
                }, o.prototype.ucmp = function(t) {
                    if (this.length > t.length) return 1;
                    if (this.length < t.length) return -1;
                    for (var e = 0, r = this.length - 1; r >= 0; r--) {
                        var i = 0 | this.words[r],
                            n = 0 | t.words[r];
                        if (i !== n) {
                            i < n ? e = -1 : i > n && (e = 1);
                            break
                        }
                    }
                    return e
                }, o.prototype.gtn = function(t) {
                    return 1 === this.cmpn(t)
                }, o.prototype.gt = function(t) {
                    return 1 === this.cmp(t)
                }, o.prototype.gten = function(t) {
                    return this.cmpn(t) >= 0
                }, o.prototype.gte = function(t) {
                    return this.cmp(t) >= 0
                }, o.prototype.ltn = function(t) {
                    return -1 === this.cmpn(t)
                }, o.prototype.lt = function(t) {
                    return -1 === this.cmp(t)
                }, o.prototype.lten = function(t) {
                    return 0 >= this.cmpn(t)
                }, o.prototype.lte = function(t) {
                    return 0 >= this.cmp(t)
                }, o.prototype.eqn = function(t) {
                    return 0 === this.cmpn(t)
                }, o.prototype.eq = function(t) {
                    return 0 === this.cmp(t)
                }, o.red = function(t) {
                    return new B(t)
                }, o.prototype.toRed = function(t) {
                    return i(!this.red, "Already a number in reduction context"), i(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
                }, o.prototype.fromRed = function() {
                    return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
                }, o.prototype._forceRed = function(t) {
                    return this.red = t, this
                }, o.prototype.forceRed = function(t) {
                    return i(!this.red, "Already a number in reduction context"), this._forceRed(t)
                }, o.prototype.redAdd = function(t) {
                    return i(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
                }, o.prototype.redIAdd = function(t) {
                    return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
                }, o.prototype.redSub = function(t) {
                    return i(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
                }, o.prototype.redISub = function(t) {
                    return i(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
                }, o.prototype.redShl = function(t) {
                    return i(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
                }, o.prototype.redMul = function(t) {
                    return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
                }, o.prototype.redIMul = function(t) {
                    return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
                }, o.prototype.redSqr = function() {
                    return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
                }, o.prototype.redISqr = function() {
                    return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
                }, o.prototype.redSqrt = function() {
                    return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
                }, o.prototype.redInvm = function() {
                    return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
                }, o.prototype.redNeg = function() {
                    return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
                }, o.prototype.redPow = function(t) {
                    return i(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
                };
                var w = {
                    k256: null,
                    p224: null,
                    p192: null,
                    p25519: null
                };

                function b(t, e) {
                    this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
                }

                function M() {
                    b.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                }

                function E() {
                    b.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                }

                function x() {
                    b.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                }

                function _() {
                    b.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                }

                function B(t) {
                    if ("string" == typeof t) {
                        var e = o._prime(t);
                        this.m = e.p, this.prime = e
                    } else i(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
                }

                function A(t) {
                    B.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
                }
                b.prototype._tmp = function() {
                    var t = new o(null);
                    return t.words = Array(Math.ceil(this.n / 13)), t
                }, b.prototype.ireduce = function(t) {
                    var e, r = t;
                    do this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength(); while (e > this.n);
                    var i = e < this.n ? -1 : r.ucmp(this.p);
                    return 0 === i ? (r.words[0] = 0, r.length = 1) : i > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip(), r
                }, b.prototype.split = function(t, e) {
                    t.iushrn(this.n, 0, e)
                }, b.prototype.imulK = function(t) {
                    return t.imul(this.k)
                }, n(M, b), M.prototype.split = function(t, e) {
                    for (var r = Math.min(t.length, 9), i = 0; i < r; i++) e.words[i] = t.words[i];
                    if (e.length = r, t.length <= 9) {
                        t.words[0] = 0, t.length = 1;
                        return
                    }
                    var n = t.words[9];
                    for (i = 10, e.words[e.length++] = 4194303 & n; i < t.length; i++) {
                        var o = 0 | t.words[i];
                        t.words[i - 10] = (4194303 & o) << 4 | n >>> 22, n = o
                    }
                    n >>>= 22, t.words[i - 10] = n, 0 === n && t.length > 10 ? t.length -= 10 : t.length -= 9
                }, M.prototype.imulK = function(t) {
                    t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                    for (var e = 0, r = 0; r < t.length; r++) {
                        var i = 0 | t.words[r];
                        e += 977 * i, t.words[r] = 67108863 & e, e = 64 * i + (e / 67108864 | 0)
                    }
                    return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
                }, n(E, b), n(x, b), n(_, b), _.prototype.imulK = function(t) {
                    for (var e = 0, r = 0; r < t.length; r++) {
                        var i = (0 | t.words[r]) * 19 + e,
                            n = 67108863 & i;
                        i >>>= 26, t.words[r] = n, e = i
                    }
                    return 0 !== e && (t.words[t.length++] = e), t
                }, o._prime = function(t) {
                    var e;
                    if (w[t]) return w[t];
                    if ("k256" === t) e = new M;
                    else if ("p224" === t) e = new E;
                    else if ("p192" === t) e = new x;
                    else if ("p25519" === t) e = new _;
                    else throw Error("Unknown prime " + t);
                    return w[t] = e, e
                }, B.prototype._verify1 = function(t) {
                    i(0 === t.negative, "red works only with positives"), i(t.red, "red works only with red numbers")
                }, B.prototype._verify2 = function(t, e) {
                    i((t.negative | e.negative) == 0, "red works only with positives"), i(t.red && t.red === e.red, "red works only with red numbers")
                }, B.prototype.imod = function(t) {
                    return this.prime ? this.prime.ireduce(t)._forceRed(this) : (a(t, t.umod(this.m)._forceRed(this)), t)
                }, B.prototype.neg = function(t) {
                    return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                }, B.prototype.add = function(t, e) {
                    this._verify2(t, e);
                    var r = t.add(e);
                    return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
                }, B.prototype.iadd = function(t, e) {
                    this._verify2(t, e);
                    var r = t.iadd(e);
                    return r.cmp(this.m) >= 0 && r.isub(this.m), r
                }, B.prototype.sub = function(t, e) {
                    this._verify2(t, e);
                    var r = t.sub(e);
                    return 0 > r.cmpn(0) && r.iadd(this.m), r._forceRed(this)
                }, B.prototype.isub = function(t, e) {
                    this._verify2(t, e);
                    var r = t.isub(e);
                    return 0 > r.cmpn(0) && r.iadd(this.m), r
                }, B.prototype.shl = function(t, e) {
                    return this._verify1(t), this.imod(t.ushln(e))
                }, B.prototype.imul = function(t, e) {
                    return this._verify2(t, e), this.imod(t.imul(e))
                }, B.prototype.mul = function(t, e) {
                    return this._verify2(t, e), this.imod(t.mul(e))
                }, B.prototype.isqr = function(t) {
                    return this.imul(t, t.clone())
                }, B.prototype.sqr = function(t) {
                    return this.mul(t, t)
                }, B.prototype.sqrt = function(t) {
                    if (t.isZero()) return t.clone();
                    var e = this.m.andln(3);
                    if (i(e % 2 == 1), 3 === e) {
                        var r = this.m.add(new o(1)).iushrn(2);
                        return this.pow(t, r)
                    }
                    for (var n = this.m.subn(1), s = 0; !n.isZero() && 0 === n.andln(1);) s++, n.iushrn(1);
                    i(!n.isZero());
                    var u = new o(1).toRed(this),
                        h = u.redNeg(),
                        a = this.m.subn(1).iushrn(1),
                        l = this.m.bitLength();
                    for (l = new o(2 * l * l).toRed(this); 0 !== this.pow(l, a).cmp(h);) l.redIAdd(h);
                    for (var f = this.pow(l, n), c = this.pow(t, n.addn(1).iushrn(1)), d = this.pow(t, n), p = s; 0 !== d.cmp(u);) {
                        for (var m = d, g = 0; 0 !== m.cmp(u); g++) m = m.redSqr();
                        i(g < p);
                        var y = this.pow(f, new o(1).iushln(p - g - 1));
                        c = c.redMul(y), f = y.redSqr(), d = d.redMul(f), p = g
                    }
                    return c
                }, B.prototype.invm = function(t) {
                    var e = t._invmp(this.m);
                    return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
                }, B.prototype.pow = function(t, e) {
                    if (e.isZero()) return new o(1).toRed(this);
                    if (0 === e.cmpn(1)) return t.clone();
                    var r = Array(16);
                    r[0] = new o(1).toRed(this), r[1] = t;
                    for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t);
                    var n = r[0],
                        s = 0,
                        u = 0,
                        h = e.bitLength() % 26;
                    for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
                        for (var a = e.words[i], l = h - 1; l >= 0; l--) {
                            var f = a >> l & 1;
                            if (n !== r[0] && (n = this.sqr(n)), 0 === f && 0 === s) {
                                u = 0;
                                continue
                            }
                            s <<= 1, s |= f, (4 == ++u || 0 === i && 0 === l) && (n = this.mul(n, r[s]), u = 0, s = 0)
                        }
                        h = 26
                    }
                    return n
                }, B.prototype.convertTo = function(t) {
                    var e = t.umod(this.m);
                    return e === t ? e.clone() : e
                }, B.prototype.convertFrom = function(t) {
                    var e = t.clone();
                    return e.red = null, e
                }, o.mont = function(t) {
                    return new A(t)
                }, n(A, B), A.prototype.convertTo = function(t) {
                    return this.imod(t.ushln(this.shift))
                }, A.prototype.convertFrom = function(t) {
                    var e = this.imod(t.mul(this.rinv));
                    return e.red = null, e
                }, A.prototype.imul = function(t, e) {
                    if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                    var r = t.imul(e),
                        i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        n = r.isub(i).iushrn(this.shift),
                        o = n;
                    return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : 0 > n.cmpn(0) && (o = n.iadd(this.m)), o._forceRed(this)
                }, A.prototype.mul = function(t, e) {
                    if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                    var r = t.mul(e),
                        i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        n = r.isub(i).iushrn(this.shift),
                        s = n;
                    return n.cmp(this.m) >= 0 ? s = n.isub(this.m) : 0 > n.cmpn(0) && (s = n.iadd(this.m)), s._forceRed(this)
                }, A.prototype.invm = function(t) {
                    return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                }
            }(t = r.nmd(t), this)
        },
        75824: function(t, e, r) {
            var i = r(35197);
            t.exports = i("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
        },
        9109: function(t, e, r) {
            "use strict";
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <https://feross.org>
             * @license  MIT
             */
            let i = r(48738),
                n = r(6868),
                o = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;

            function s(t) {
                if (t > 2147483647) throw RangeError('The value "' + t + '" is invalid for option "size"');
                let e = new Uint8Array(t);
                return Object.setPrototypeOf(e, u.prototype), e
            }

            function u(t, e, r) {
                if ("number" == typeof t) {
                    if ("string" == typeof e) throw TypeError('The "string" argument must be of type string. Received type number');
                    return l(t)
                }
                return h(t, e, r)
            }

            function h(t, e, r) {
                if ("string" == typeof t) return function(t, e) {
                    if (("string" != typeof e || "" === e) && (e = "utf8"), !u.isEncoding(e)) throw TypeError("Unknown encoding: " + e);
                    let r = 0 | p(t, e),
                        i = s(r),
                        n = i.write(t, e);
                    return n !== r && (i = i.slice(0, n)), i
                }(t, e);
                if (ArrayBuffer.isView(t)) return function(t) {
                    if (j(t, Uint8Array)) {
                        let e = new Uint8Array(t);
                        return c(e.buffer, e.byteOffset, e.byteLength)
                    }
                    return f(t)
                }(t);
                if (null == t) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                if (j(t, ArrayBuffer) || t && j(t.buffer, ArrayBuffer) || "undefined" != typeof SharedArrayBuffer && (j(t, SharedArrayBuffer) || t && j(t.buffer, SharedArrayBuffer))) return c(t, e, r);
                if ("number" == typeof t) throw TypeError('The "value" argument must not be of type number. Received type number');
                let i = t.valueOf && t.valueOf();
                if (null != i && i !== t) return u.from(i, e, r);
                let n = function(t) {
                    var e;
                    if (u.isBuffer(t)) {
                        let e = 0 | d(t.length),
                            r = s(e);
                        return 0 === r.length || t.copy(r, 0, 0, e), r
                    }
                    return void 0 !== t.length ? "number" != typeof t.length || (e = t.length) != e ? s(0) : f(t) : "Buffer" === t.type && Array.isArray(t.data) ? f(t.data) : void 0
                }(t);
                if (n) return n;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return u.from(t[Symbol.toPrimitive]("string"), e, r);
                throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
            }

            function a(t) {
                if ("number" != typeof t) throw TypeError('"size" argument must be of type number');
                if (t < 0) throw RangeError('The value "' + t + '" is invalid for option "size"')
            }

            function l(t) {
                return a(t), s(t < 0 ? 0 : 0 | d(t))
            }

            function f(t) {
                let e = t.length < 0 ? 0 : 0 | d(t.length),
                    r = s(e);
                for (let i = 0; i < e; i += 1) r[i] = 255 & t[i];
                return r
            }

            function c(t, e, r) {
                let i;
                if (e < 0 || t.byteLength < e) throw RangeError('"offset" is outside of buffer bounds');
                if (t.byteLength < e + (r || 0)) throw RangeError('"length" is outside of buffer bounds');
                return Object.setPrototypeOf(i = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, e) : new Uint8Array(t, e, r), u.prototype), i
            }

            function d(t) {
                if (t >= 2147483647) throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");
                return 0 | t
            }

            function p(t, e) {
                if (u.isBuffer(t)) return t.length;
                if (ArrayBuffer.isView(t) || j(t, ArrayBuffer)) return t.byteLength;
                if ("string" != typeof t) throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                let r = t.length,
                    i = arguments.length > 2 && !0 === arguments[2];
                if (!i && 0 === r) return 0;
                let n = !1;
                for (;;) switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                        return P(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return T(t).length;
                    default:
                        if (n) return i ? -1 : P(t).length;
                        e = ("" + e).toLowerCase(), n = !0
                }
            }

            function m(t, e, r) {
                let n = !1;
                if ((void 0 === e || e < 0) && (e = 0), e > this.length || ((void 0 === r || r > this.length) && (r = this.length), r <= 0 || (r >>>= 0) <= (e >>>= 0))) return "";
                for (t || (t = "utf8");;) switch (t) {
                    case "hex":
                        return function(t, e, r) {
                            let i = t.length;
                            (!e || e < 0) && (e = 0), (!r || r < 0 || r > i) && (r = i);
                            let n = "";
                            for (let i = e; i < r; ++i) n += q[t[i]];
                            return n
                        }(this, e, r);
                    case "utf8":
                    case "utf-8":
                        return w(this, e, r);
                    case "ascii":
                        return function(t, e, r) {
                            let i = "";
                            r = Math.min(t.length, r);
                            for (let n = e; n < r; ++n) i += String.fromCharCode(127 & t[n]);
                            return i
                        }(this, e, r);
                    case "latin1":
                    case "binary":
                        return function(t, e, r) {
                            let i = "";
                            r = Math.min(t.length, r);
                            for (let n = e; n < r; ++n) i += String.fromCharCode(t[n]);
                            return i
                        }(this, e, r);
                    case "base64":
                        var o, s;
                        return o = e, s = r, 0 === o && s === this.length ? i.fromByteArray(this) : i.fromByteArray(this.slice(o, s));
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return function(t, e, r) {
                            let i = t.slice(e, r),
                                n = "";
                            for (let t = 0; t < i.length - 1; t += 2) n += String.fromCharCode(i[t] + 256 * i[t + 1]);
                            return n
                        }(this, e, r);
                    default:
                        if (n) throw TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(), n = !0
                }
            }

            function g(t, e, r) {
                let i = t[e];
                t[e] = t[r], t[r] = i
            }

            function y(t, e, r, i, n) {
                var o;
                if (0 === t.length) return -1;
                if ("string" == typeof r ? (i = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), (o = r = +r) != o && (r = n ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                    if (n) return -1;
                    r = t.length - 1
                } else if (r < 0) {
                    if (!n) return -1;
                    r = 0
                }
                if ("string" == typeof e && (e = u.from(e, i)), u.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, r, i, n);
                if ("number" == typeof e) return (e &= 255, "function" == typeof Uint8Array.prototype.indexOf) ? n ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : v(t, [e], r, i, n);
                throw TypeError("val must be string, number or Buffer")
            }

            function v(t, e, r, i, n) {
                let o, s = 1,
                    u = t.length,
                    h = e.length;
                if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
                    if (t.length < 2 || e.length < 2) return -1;
                    s = 2, u /= 2, h /= 2, r /= 2
                }

                function a(t, e) {
                    return 1 === s ? t[e] : t.readUInt16BE(e * s)
                }
                if (n) {
                    let i = -1;
                    for (o = r; o < u; o++)
                        if (a(t, o) === a(e, -1 === i ? 0 : o - i)) {
                            if (-1 === i && (i = o), o - i + 1 === h) return i * s
                        } else -1 !== i && (o -= o - i), i = -1
                } else
                    for (r + h > u && (r = u - h), o = r; o >= 0; o--) {
                        let r = !0;
                        for (let i = 0; i < h; i++)
                            if (a(t, o + i) !== a(e, i)) {
                                r = !1;
                                break
                            }
                        if (r) return o
                    }
                return -1
            }

            function w(t, e, r) {
                r = Math.min(t.length, r);
                let i = [],
                    n = e;
                for (; n < r;) {
                    let e = t[n],
                        o = null,
                        s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
                    if (n + s <= r) {
                        let r, i, u, h;
                        switch (s) {
                            case 1:
                                e < 128 && (o = e);
                                break;
                            case 2:
                                (192 & (r = t[n + 1])) == 128 && (h = (31 & e) << 6 | 63 & r) > 127 && (o = h);
                                break;
                            case 3:
                                r = t[n + 1], i = t[n + 2], (192 & r) == 128 && (192 & i) == 128 && (h = (15 & e) << 12 | (63 & r) << 6 | 63 & i) > 2047 && (h < 55296 || h > 57343) && (o = h);
                                break;
                            case 4:
                                r = t[n + 1], i = t[n + 2], u = t[n + 3], (192 & r) == 128 && (192 & i) == 128 && (192 & u) == 128 && (h = (15 & e) << 18 | (63 & r) << 12 | (63 & i) << 6 | 63 & u) > 65535 && h < 1114112 && (o = h)
                        }
                    }
                    null === o ? (o = 65533, s = 1) : o > 65535 && (o -= 65536, i.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), i.push(o), n += s
                }
                return function(t) {
                    let e = t.length;
                    if (e <= 4096) return String.fromCharCode.apply(String, t);
                    let r = "",
                        i = 0;
                    for (; i < e;) r += String.fromCharCode.apply(String, t.slice(i, i += 4096));
                    return r
                }(i)
            }

            function b(t, e, r) {
                if (t % 1 != 0 || t < 0) throw RangeError("offset is not uint");
                if (t + e > r) throw RangeError("Trying to access beyond buffer length")
            }

            function M(t, e, r, i, n, o) {
                if (!u.isBuffer(t)) throw TypeError('"buffer" argument must be a Buffer instance');
                if (e > n || e < o) throw RangeError('"value" argument is out of bounds');
                if (r + i > t.length) throw RangeError("Index out of range")
            }

            function E(t, e, r, i, n) {
                O(e, i, n, t, r, 7);
                let o = Number(e & BigInt(4294967295));
                t[r++] = o, o >>= 8, t[r++] = o, o >>= 8, t[r++] = o, o >>= 8, t[r++] = o;
                let s = Number(e >> BigInt(32) & BigInt(4294967295));
                return t[r++] = s, s >>= 8, t[r++] = s, s >>= 8, t[r++] = s, s >>= 8, t[r++] = s, r
            }

            function x(t, e, r, i, n) {
                O(e, i, n, t, r, 7);
                let o = Number(e & BigInt(4294967295));
                t[r + 7] = o, o >>= 8, t[r + 6] = o, o >>= 8, t[r + 5] = o, o >>= 8, t[r + 4] = o;
                let s = Number(e >> BigInt(32) & BigInt(4294967295));
                return t[r + 3] = s, s >>= 8, t[r + 2] = s, s >>= 8, t[r + 1] = s, s >>= 8, t[r] = s, r + 8
            }

            function _(t, e, r, i, n, o) {
                if (r + i > t.length || r < 0) throw RangeError("Index out of range")
            }

            function B(t, e, r, i, o) {
                return e = +e, r >>>= 0, o || _(t, e, r, 4, 34028234663852886e22, -34028234663852886e22), n.write(t, e, r, i, 23, 4), r + 4
            }

            function A(t, e, r, i, o) {
                return e = +e, r >>>= 0, o || _(t, e, r, 8, 17976931348623157e292, -17976931348623157e292), n.write(t, e, r, i, 52, 8), r + 8
            }
            e.Buffer = u, e.SlowBuffer = function(t) {
                return +t != t && (t = 0), u.alloc(+t)
            }, e.INSPECT_MAX_BYTES = 50, e.kMaxLength = 2147483647, u.TYPED_ARRAY_SUPPORT = function() {
                try {
                    let t = new Uint8Array(1),
                        e = {
                            foo: function() {
                                return 42
                            }
                        };
                    return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
                } catch (t) {
                    return !1
                }
            }(), u.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(u.prototype, "parent", {
                enumerable: !0,
                get: function() {
                    if (u.isBuffer(this)) return this.buffer
                }
            }), Object.defineProperty(u.prototype, "offset", {
                enumerable: !0,
                get: function() {
                    if (u.isBuffer(this)) return this.byteOffset
                }
            }), u.poolSize = 8192, u.from = function(t, e, r) {
                return h(t, e, r)
            }, Object.setPrototypeOf(u.prototype, Uint8Array.prototype), Object.setPrototypeOf(u, Uint8Array), u.alloc = function(t, e, r) {
                return (a(t), t <= 0) ? s(t) : void 0 !== e ? "string" == typeof r ? s(t).fill(e, r) : s(t).fill(e) : s(t)
            }, u.allocUnsafe = function(t) {
                return l(t)
            }, u.allocUnsafeSlow = function(t) {
                return l(t)
            }, u.isBuffer = function(t) {
                return null != t && !0 === t._isBuffer && t !== u.prototype
            }, u.compare = function(t, e) {
                if (j(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), j(e, Uint8Array) && (e = u.from(e, e.offset, e.byteLength)), !u.isBuffer(t) || !u.isBuffer(e)) throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (t === e) return 0;
                let r = t.length,
                    i = e.length;
                for (let n = 0, o = Math.min(r, i); n < o; ++n)
                    if (t[n] !== e[n]) {
                        r = t[n], i = e[n];
                        break
                    }
                return r < i ? -1 : i < r ? 1 : 0
            }, u.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, u.concat = function(t, e) {
                let r;
                if (!Array.isArray(t)) throw TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return u.alloc(0);
                if (void 0 === e)
                    for (r = 0, e = 0; r < t.length; ++r) e += t[r].length;
                let i = u.allocUnsafe(e),
                    n = 0;
                for (r = 0; r < t.length; ++r) {
                    let e = t[r];
                    if (j(e, Uint8Array)) n + e.length > i.length ? (u.isBuffer(e) || (e = u.from(e)), e.copy(i, n)) : Uint8Array.prototype.set.call(i, e, n);
                    else if (u.isBuffer(e)) e.copy(i, n);
                    else throw TypeError('"list" argument must be an Array of Buffers');
                    n += e.length
                }
                return i
            }, u.byteLength = p, u.prototype._isBuffer = !0, u.prototype.swap16 = function() {
                let t = this.length;
                if (t % 2 != 0) throw RangeError("Buffer size must be a multiple of 16-bits");
                for (let e = 0; e < t; e += 2) g(this, e, e + 1);
                return this
            }, u.prototype.swap32 = function() {
                let t = this.length;
                if (t % 4 != 0) throw RangeError("Buffer size must be a multiple of 32-bits");
                for (let e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
                return this
            }, u.prototype.swap64 = function() {
                let t = this.length;
                if (t % 8 != 0) throw RangeError("Buffer size must be a multiple of 64-bits");
                for (let e = 0; e < t; e += 8) g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
                return this
            }, u.prototype.toString = function() {
                let t = this.length;
                return 0 === t ? "" : 0 == arguments.length ? w(this, 0, t) : m.apply(this, arguments)
            }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(t) {
                if (!u.isBuffer(t)) throw TypeError("Argument must be a Buffer");
                return this === t || 0 === u.compare(this, t)
            }, u.prototype.inspect = function() {
                let t = "",
                    r = e.INSPECT_MAX_BYTES;
                return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (t += " ... "), "<Buffer " + t + ">"
            }, o && (u.prototype[o] = u.prototype.inspect), u.prototype.compare = function(t, e, r, i, n) {
                if (j(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), !u.isBuffer(t)) throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === i && (i = 0), void 0 === n && (n = this.length), e < 0 || r > t.length || i < 0 || n > this.length) throw RangeError("out of range index");
                if (i >= n && e >= r) return 0;
                if (i >= n) return -1;
                if (e >= r) return 1;
                if (e >>>= 0, r >>>= 0, i >>>= 0, n >>>= 0, this === t) return 0;
                let o = n - i,
                    s = r - e,
                    h = Math.min(o, s),
                    a = this.slice(i, n),
                    l = t.slice(e, r);
                for (let t = 0; t < h; ++t)
                    if (a[t] !== l[t]) {
                        o = a[t], s = l[t];
                        break
                    }
                return o < s ? -1 : s < o ? 1 : 0
            }, u.prototype.includes = function(t, e, r) {
                return -1 !== this.indexOf(t, e, r)
            }, u.prototype.indexOf = function(t, e, r) {
                return y(this, t, e, r, !0)
            }, u.prototype.lastIndexOf = function(t, e, r) {
                return y(this, t, e, r, !1)
            }, u.prototype.write = function(t, e, r, i) {
                var n, o, s, u, h, a, l, f;
                if (void 0 === e) i = "utf8", r = this.length, e = 0;
                else if (void 0 === r && "string" == typeof e) i = e, r = this.length, e = 0;
                else if (isFinite(e)) e >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === i && (i = "utf8")) : (i = r, r = void 0);
                else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                let c = this.length - e;
                if ((void 0 === r || r > c) && (r = c), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw RangeError("Attempt to write outside buffer bounds");
                i || (i = "utf8");
                let d = !1;
                for (;;) switch (i) {
                    case "hex":
                        return function(t, e, r, i) {
                            let n;
                            r = Number(r) || 0;
                            let o = t.length - r;
                            i ? (i = Number(i)) > o && (i = o) : i = o;
                            let s = e.length;
                            for (i > s / 2 && (i = s / 2), n = 0; n < i; ++n) {
                                let i = parseInt(e.substr(2 * n, 2), 16);
                                if (i != i) break;
                                t[r + n] = i
                            }
                            return n
                        }(this, t, e, r);
                    case "utf8":
                    case "utf-8":
                        return n = e, o = r, N(P(t, this.length - n), this, n, o);
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return s = e, u = r, N(function(t) {
                            let e = [];
                            for (let r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                            return e
                        }(t), this, s, u);
                    case "base64":
                        return h = e, a = r, N(T(t), this, h, a);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return l = e, f = r, N(function(t, e) {
                            let r, i;
                            let n = [];
                            for (let o = 0; o < t.length && !((e -= 2) < 0); ++o) i = (r = t.charCodeAt(o)) >> 8, n.push(r % 256), n.push(i);
                            return n
                        }(t, this.length - l), this, l, f);
                    default:
                        if (d) throw TypeError("Unknown encoding: " + i);
                        i = ("" + i).toLowerCase(), d = !0
                }
            }, u.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }, u.prototype.slice = function(t, e) {
                let r = this.length;
                t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
                let i = this.subarray(t, e);
                return Object.setPrototypeOf(i, u.prototype), i
            }, u.prototype.readUintLE = u.prototype.readUIntLE = function(t, e, r) {
                t >>>= 0, e >>>= 0, r || b(t, e, this.length);
                let i = this[t],
                    n = 1,
                    o = 0;
                for (; ++o < e && (n *= 256);) i += this[t + o] * n;
                return i
            }, u.prototype.readUintBE = u.prototype.readUIntBE = function(t, e, r) {
                t >>>= 0, e >>>= 0, r || b(t, e, this.length);
                let i = this[t + --e],
                    n = 1;
                for (; e > 0 && (n *= 256);) i += this[t + --e] * n;
                return i
            }, u.prototype.readUint8 = u.prototype.readUInt8 = function(t, e) {
                return t >>>= 0, e || b(t, 1, this.length), this[t]
            }, u.prototype.readUint16LE = u.prototype.readUInt16LE = function(t, e) {
                return t >>>= 0, e || b(t, 2, this.length), this[t] | this[t + 1] << 8
            }, u.prototype.readUint16BE = u.prototype.readUInt16BE = function(t, e) {
                return t >>>= 0, e || b(t, 2, this.length), this[t] << 8 | this[t + 1]
            }, u.prototype.readUint32LE = u.prototype.readUInt32LE = function(t, e) {
                return t >>>= 0, e || b(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
            }, u.prototype.readUint32BE = u.prototype.readUInt32BE = function(t, e) {
                return t >>>= 0, e || b(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            }, u.prototype.readBigUInt64LE = C(function(t) {
                L(t >>>= 0, "offset");
                let e = this[t],
                    r = this[t + 7];
                (void 0 === e || void 0 === r) && R(t, this.length - 8);
                let i = e + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t],
                    n = this[++t] + 256 * this[++t] + 65536 * this[++t] + 16777216 * r;
                return BigInt(i) + (BigInt(n) << BigInt(32))
            }), u.prototype.readBigUInt64BE = C(function(t) {
                L(t >>>= 0, "offset");
                let e = this[t],
                    r = this[t + 7];
                (void 0 === e || void 0 === r) && R(t, this.length - 8);
                let i = 16777216 * e + 65536 * this[++t] + 256 * this[++t] + this[++t],
                    n = 16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r;
                return (BigInt(i) << BigInt(32)) + BigInt(n)
            }), u.prototype.readIntLE = function(t, e, r) {
                t >>>= 0, e >>>= 0, r || b(t, e, this.length);
                let i = this[t],
                    n = 1,
                    o = 0;
                for (; ++o < e && (n *= 256);) i += this[t + o] * n;
                return i >= (n *= 128) && (i -= Math.pow(2, 8 * e)), i
            }, u.prototype.readIntBE = function(t, e, r) {
                t >>>= 0, e >>>= 0, r || b(t, e, this.length);
                let i = e,
                    n = 1,
                    o = this[t + --i];
                for (; i > 0 && (n *= 256);) o += this[t + --i] * n;
                return o >= (n *= 128) && (o -= Math.pow(2, 8 * e)), o
            }, u.prototype.readInt8 = function(t, e) {
                return (t >>>= 0, e || b(t, 1, this.length), 128 & this[t]) ? -((255 - this[t] + 1) * 1) : this[t]
            }, u.prototype.readInt16LE = function(t, e) {
                t >>>= 0, e || b(t, 2, this.length);
                let r = this[t] | this[t + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, u.prototype.readInt16BE = function(t, e) {
                t >>>= 0, e || b(t, 2, this.length);
                let r = this[t + 1] | this[t] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, u.prototype.readInt32LE = function(t, e) {
                return t >>>= 0, e || b(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            }, u.prototype.readInt32BE = function(t, e) {
                return t >>>= 0, e || b(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            }, u.prototype.readBigInt64LE = C(function(t) {
                L(t >>>= 0, "offset");
                let e = this[t],
                    r = this[t + 7];
                return (void 0 === e || void 0 === r) && R(t, this.length - 8), (BigInt(this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24)) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t])
            }), u.prototype.readBigInt64BE = C(function(t) {
                L(t >>>= 0, "offset");
                let e = this[t],
                    r = this[t + 7];
                return (void 0 === e || void 0 === r) && R(t, this.length - 8), (BigInt((e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t]) << BigInt(32)) + BigInt(16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r)
            }), u.prototype.readFloatLE = function(t, e) {
                return t >>>= 0, e || b(t, 4, this.length), n.read(this, t, !0, 23, 4)
            }, u.prototype.readFloatBE = function(t, e) {
                return t >>>= 0, e || b(t, 4, this.length), n.read(this, t, !1, 23, 4)
            }, u.prototype.readDoubleLE = function(t, e) {
                return t >>>= 0, e || b(t, 8, this.length), n.read(this, t, !0, 52, 8)
            }, u.prototype.readDoubleBE = function(t, e) {
                return t >>>= 0, e || b(t, 8, this.length), n.read(this, t, !1, 52, 8)
            }, u.prototype.writeUintLE = u.prototype.writeUIntLE = function(t, e, r, i) {
                if (t = +t, e >>>= 0, r >>>= 0, !i) {
                    let i = Math.pow(2, 8 * r) - 1;
                    M(this, t, e, r, i, 0)
                }
                let n = 1,
                    o = 0;
                for (this[e] = 255 & t; ++o < r && (n *= 256);) this[e + o] = t / n & 255;
                return e + r
            }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function(t, e, r, i) {
                if (t = +t, e >>>= 0, r >>>= 0, !i) {
                    let i = Math.pow(2, 8 * r) - 1;
                    M(this, t, e, r, i, 0)
                }
                let n = r - 1,
                    o = 1;
                for (this[e + n] = 255 & t; --n >= 0 && (o *= 256);) this[e + n] = t / o & 255;
                return e + r
            }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
            }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
            }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
            }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
            }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
            }, u.prototype.writeBigUInt64LE = C(function(t, e = 0) {
                return E(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
            }), u.prototype.writeBigUInt64BE = C(function(t, e = 0) {
                return x(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
            }), u.prototype.writeIntLE = function(t, e, r, i) {
                if (t = +t, e >>>= 0, !i) {
                    let i = Math.pow(2, 8 * r - 1);
                    M(this, t, e, r, i - 1, -i)
                }
                let n = 0,
                    o = 1,
                    s = 0;
                for (this[e] = 255 & t; ++n < r && (o *= 256);) t < 0 && 0 === s && 0 !== this[e + n - 1] && (s = 1), this[e + n] = (t / o >> 0) - s & 255;
                return e + r
            }, u.prototype.writeIntBE = function(t, e, r, i) {
                if (t = +t, e >>>= 0, !i) {
                    let i = Math.pow(2, 8 * r - 1);
                    M(this, t, e, r, i - 1, -i)
                }
                let n = r - 1,
                    o = 1,
                    s = 0;
                for (this[e + n] = 255 & t; --n >= 0 && (o *= 256);) t < 0 && 0 === s && 0 !== this[e + n + 1] && (s = 1), this[e + n] = (t / o >> 0) - s & 255;
                return e + r
            }, u.prototype.writeInt8 = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
            }, u.prototype.writeInt16LE = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
            }, u.prototype.writeInt16BE = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
            }, u.prototype.writeInt32LE = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
            }, u.prototype.writeInt32BE = function(t, e, r) {
                return t = +t, e >>>= 0, r || M(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
            }, u.prototype.writeBigInt64LE = C(function(t, e = 0) {
                return E(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
            }), u.prototype.writeBigInt64BE = C(function(t, e = 0) {
                return x(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
            }), u.prototype.writeFloatLE = function(t, e, r) {
                return B(this, t, e, !0, r)
            }, u.prototype.writeFloatBE = function(t, e, r) {
                return B(this, t, e, !1, r)
            }, u.prototype.writeDoubleLE = function(t, e, r) {
                return A(this, t, e, !0, r)
            }, u.prototype.writeDoubleBE = function(t, e, r) {
                return A(this, t, e, !1, r)
            }, u.prototype.copy = function(t, e, r, i) {
                if (!u.isBuffer(t)) throw TypeError("argument should be a Buffer");
                if (r || (r = 0), i || 0 === i || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), i > 0 && i < r && (i = r), i === r || 0 === t.length || 0 === this.length) return 0;
                if (e < 0) throw RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw RangeError("Index out of range");
                if (i < 0) throw RangeError("sourceEnd out of bounds");
                i > this.length && (i = this.length), t.length - e < i - r && (i = t.length - e + r);
                let n = i - r;
                return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, r, i) : Uint8Array.prototype.set.call(t, this.subarray(r, i), e), n
            }, u.prototype.fill = function(t, e, r, i) {
                let n;
                if ("string" == typeof t) {
                    if ("string" == typeof e ? (i = e, e = 0, r = this.length) : "string" == typeof r && (i = r, r = this.length), void 0 !== i && "string" != typeof i) throw TypeError("encoding must be a string");
                    if ("string" == typeof i && !u.isEncoding(i)) throw TypeError("Unknown encoding: " + i);
                    if (1 === t.length) {
                        let e = t.charCodeAt(0);
                        ("utf8" === i && e < 128 || "latin1" === i) && (t = e)
                    }
                } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
                if (e < 0 || this.length < e || this.length < r) throw RangeError("Out of range index");
                if (r <= e) return this;
                if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t)
                    for (n = e; n < r; ++n) this[n] = t;
                else {
                    let o = u.isBuffer(t) ? t : u.from(t, i),
                        s = o.length;
                    if (0 === s) throw TypeError('The value "' + t + '" is invalid for argument "value"');
                    for (n = 0; n < r - e; ++n) this[n + e] = o[n % s]
                }
                return this
            };
            let I = {};

            function S(t, e, r) {
                I[t] = class extends r {
                    constructor() {
                        super(), Object.defineProperty(this, "message", {
                            value: e.apply(this, arguments),
                            writable: !0,
                            configurable: !0
                        }), this.name = `${this.name} [${t}]`, this.stack, delete this.name
                    }
                    get code() {
                        return t
                    }
                    set code(t) {
                        Object.defineProperty(this, "code", {
                            configurable: !0,
                            enumerable: !0,
                            value: t,
                            writable: !0
                        })
                    }
                    toString() {
                        return `${this.name} [${t}]: ${this.message}`
                    }
                }
            }

            function k(t) {
                let e = "",
                    r = t.length,
                    i = "-" === t[0] ? 1 : 0;
                for (; r >= i + 4; r -= 3) e = `_${t.slice(r-3,r)}${e}`;
                return `${t.slice(0,r)}${e}`
            }

            function O(t, e, r, i, n, o) {
                if (t > r || t < e) {
                    let i;
                    let n = "bigint" == typeof e ? "n" : "";
                    throw i = o > 3 ? 0 === e || e === BigInt(0) ? `>= 0${n} and < 2${n} ** ${(o+1)*8}${n}` : `>= -(2${n} ** ${(o+1)*8-1}${n}) and < 2 ** ${(o+1)*8-1}${n}` : `>= ${e}${n} and <= ${r}${n}`, new I.ERR_OUT_OF_RANGE("value", i, t)
                }
                L(n, "offset"), (void 0 === i[n] || void 0 === i[n + o]) && R(n, i.length - (o + 1))
            }

            function L(t, e) {
                if ("number" != typeof t) throw new I.ERR_INVALID_ARG_TYPE(e, "number", t)
            }

            function R(t, e, r) {
                if (Math.floor(t) !== t) throw L(t, r), new I.ERR_OUT_OF_RANGE(r || "offset", "an integer", t);
                if (e < 0) throw new I.ERR_BUFFER_OUT_OF_BOUNDS;
                throw new I.ERR_OUT_OF_RANGE(r || "offset", `>= ${r?1:0} and <= ${e}`, t)
            }
            S("ERR_BUFFER_OUT_OF_BOUNDS", function(t) {
                return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
            }, RangeError), S("ERR_INVALID_ARG_TYPE", function(t, e) {
                return `The "${t}" argument must be of type number. Received type ${typeof e}`
            }, TypeError), S("ERR_OUT_OF_RANGE", function(t, e, r) {
                let i = `The value of "${t}" is out of range.`,
                    n = r;
                return Number.isInteger(r) && Math.abs(r) > 4294967296 ? n = k(String(r)) : "bigint" == typeof r && (n = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (n = k(n)), n += "n"), i += ` It must be ${e}. Received ${n}`
            }, RangeError);
            let U = /[^+/0-9A-Za-z-_]/g;

            function P(t, e) {
                let r;
                e = e || 1 / 0;
                let i = t.length,
                    n = null,
                    o = [];
                for (let s = 0; s < i; ++s) {
                    if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
                        if (!n) {
                            if (r > 56319 || s + 1 === i) {
                                (e -= 3) > -1 && o.push(239, 191, 189);
                                continue
                            }
                            n = r;
                            continue
                        }
                        if (r < 56320) {
                            (e -= 3) > -1 && o.push(239, 191, 189), n = r;
                            continue
                        }
                        r = (n - 55296 << 10 | r - 56320) + 65536
                    } else n && (e -= 3) > -1 && o.push(239, 191, 189);
                    if (n = null, r < 128) {
                        if ((e -= 1) < 0) break;
                        o.push(r)
                    } else if (r < 2048) {
                        if ((e -= 2) < 0) break;
                        o.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((e -= 3) < 0) break;
                        o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else if (r < 1114112) {
                        if ((e -= 4) < 0) break;
                        o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    } else throw Error("Invalid code point")
                }
                return o
            }

            function T(t) {
                return i.toByteArray(function(t) {
                    if ((t = (t = t.split("=")[0]).trim().replace(U, "")).length < 2) return "";
                    for (; t.length % 4 != 0;) t += "=";
                    return t
                }(t))
            }

            function N(t, e, r, i) {
                let n;
                for (n = 0; n < i && !(n + r >= e.length) && !(n >= t.length); ++n) e[n + r] = t[n];
                return n
            }

            function j(t, e) {
                return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
            }
            let q = function() {
                let t = "0123456789abcdef",
                    e = Array(256);
                for (let r = 0; r < 16; ++r) {
                    let i = 16 * r;
                    for (let n = 0; n < 16; ++n) e[i + n] = t[r] + t[n]
                }
                return e
            }();

            function C(t) {
                return "undefined" == typeof BigInt ? Z : t
            }

            function Z() {
                throw Error("BigInt not supported")
            }
        },
        37836: function(t) {
            "use strict";
            var e = Object.prototype.hasOwnProperty,
                r = "~";

            function i() {}

            function n(t, e, r) {
                this.fn = t, this.context = e, this.once = r || !1
            }

            function o(t, e, i, o, s) {
                if ("function" != typeof i) throw TypeError("The listener must be a function");
                var u = new n(i, o || t, s),
                    h = r ? r + e : e;
                return t._events[h] ? t._events[h].fn ? t._events[h] = [t._events[h], u] : t._events[h].push(u) : (t._events[h] = u, t._eventsCount++), t
            }

            function s(t, e) {
                0 == --t._eventsCount ? t._events = new i : delete t._events[e]
            }

            function u() {
                this._events = new i, this._eventsCount = 0
            }
            Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1)), u.prototype.eventNames = function() {
                var t, i, n = [];
                if (0 === this._eventsCount) return n;
                for (i in t = this._events) e.call(t, i) && n.push(r ? i.slice(1) : i);
                return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n
            }, u.prototype.listeners = function(t) {
                var e = r ? r + t : t,
                    i = this._events[e];
                if (!i) return [];
                if (i.fn) return [i.fn];
                for (var n = 0, o = i.length, s = Array(o); n < o; n++) s[n] = i[n].fn;
                return s
            }, u.prototype.listenerCount = function(t) {
                var e = r ? r + t : t,
                    i = this._events[e];
                return i ? i.fn ? 1 : i.length : 0
            }, u.prototype.emit = function(t, e, i, n, o, s) {
                var u = r ? r + t : t;
                if (!this._events[u]) return !1;
                var h, a, l = this._events[u],
                    f = arguments.length;
                if (l.fn) {
                    switch (l.once && this.removeListener(t, l.fn, void 0, !0), f) {
                        case 1:
                            return l.fn.call(l.context), !0;
                        case 2:
                            return l.fn.call(l.context, e), !0;
                        case 3:
                            return l.fn.call(l.context, e, i), !0;
                        case 4:
                            return l.fn.call(l.context, e, i, n), !0;
                        case 5:
                            return l.fn.call(l.context, e, i, n, o), !0;
                        case 6:
                            return l.fn.call(l.context, e, i, n, o, s), !0
                    }
                    for (a = 1, h = Array(f - 1); a < f; a++) h[a - 1] = arguments[a];
                    l.fn.apply(l.context, h)
                } else {
                    var c, d = l.length;
                    for (a = 0; a < d; a++) switch (l[a].once && this.removeListener(t, l[a].fn, void 0, !0), f) {
                        case 1:
                            l[a].fn.call(l[a].context);
                            break;
                        case 2:
                            l[a].fn.call(l[a].context, e);
                            break;
                        case 3:
                            l[a].fn.call(l[a].context, e, i);
                            break;
                        case 4:
                            l[a].fn.call(l[a].context, e, i, n);
                            break;
                        default:
                            if (!h)
                                for (c = 1, h = Array(f - 1); c < f; c++) h[c - 1] = arguments[c];
                            l[a].fn.apply(l[a].context, h)
                    }
                }
                return !0
            }, u.prototype.on = function(t, e, r) {
                return o(this, t, e, r, !1)
            }, u.prototype.once = function(t, e, r) {
                return o(this, t, e, r, !0)
            }, u.prototype.removeListener = function(t, e, i, n) {
                var o = r ? r + t : t;
                if (!this._events[o]) return this;
                if (!e) return s(this, o), this;
                var u = this._events[o];
                if (u.fn) u.fn !== e || n && !u.once || i && u.context !== i || s(this, o);
                else {
                    for (var h = 0, a = [], l = u.length; h < l; h++)(u[h].fn !== e || n && !u[h].once || i && u[h].context !== i) && a.push(u[h]);
                    a.length ? this._events[o] = 1 === a.length ? a[0] : a : s(this, o)
                }
                return this
            }, u.prototype.removeAllListeners = function(t) {
                var e;
                return t ? (e = r ? r + t : t, this._events[e] && s(this, e)) : (this._events = new i, this._eventsCount = 0), this
            }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, t.exports = u
        },
        6868: function(t, e) { /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
            e.read = function(t, e, r, i, n) {
                var o, s, u = 8 * n - i - 1,
                    h = (1 << u) - 1,
                    a = h >> 1,
                    l = -7,
                    f = r ? n - 1 : 0,
                    c = r ? -1 : 1,
                    d = t[e + f];
                for (f += c, o = d & (1 << -l) - 1, d >>= -l, l += u; l > 0; o = 256 * o + t[e + f], f += c, l -= 8);
                for (s = o & (1 << -l) - 1, o >>= -l, l += i; l > 0; s = 256 * s + t[e + f], f += c, l -= 8);
                if (0 === o) o = 1 - a;
                else {
                    if (o === h) return s ? NaN : 1 / 0 * (d ? -1 : 1);
                    s += Math.pow(2, i), o -= a
                }
                return (d ? -1 : 1) * s * Math.pow(2, o - i)
            }, e.write = function(t, e, r, i, n, o) {
                var s, u, h, a = 8 * o - n - 1,
                    l = (1 << a) - 1,
                    f = l >> 1,
                    c = 23 === n ? 5960464477539062e-23 : 0,
                    d = i ? 0 : o - 1,
                    p = i ? 1 : -1,
                    m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                for (isNaN(e = Math.abs(e)) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, s = l) : (s = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -s)) < 1 && (s--, h *= 2), s + f >= 1 ? e += c / h : e += c * Math.pow(2, 1 - f), e * h >= 2 && (s++, h /= 2), s + f >= l ? (u = 0, s = l) : s + f >= 1 ? (u = (e * h - 1) * Math.pow(2, n), s += f) : (u = e * Math.pow(2, f - 1) * Math.pow(2, n), s = 0)); n >= 8; t[r + d] = 255 & u, d += p, u /= 256, n -= 8);
                for (s = s << n | u, a += n; a > 0; t[r + d] = 255 & s, d += p, s /= 256, a -= 8);
                t[r + d - p] |= 128 * m
            }
        },
        4531: function(t, e, r) {
            "use strict";
            let i = r(3538).v4,
                n = r(62309),
                o = function(t, e) {
                    if (!(this instanceof o)) return new o(t, e);
                    e || (e = {}), this.options = {
                        reviver: void 0 !== e.reviver ? e.reviver : null,
                        replacer: void 0 !== e.replacer ? e.replacer : null,
                        generator: void 0 !== e.generator ? e.generator : function() {
                            return i()
                        },
                        version: void 0 !== e.version ? e.version : 2,
                        notificationIdNull: "boolean" == typeof e.notificationIdNull && e.notificationIdNull
                    }, this.callServer = t
                };
            t.exports = o, o.prototype.request = function(t, e, r, i) {
                let o;
                let s = this,
                    u = null,
                    h = Array.isArray(t) && "function" == typeof e;
                if (1 === this.options.version && h) throw TypeError("JSON-RPC 1.0 does not support batching");
                let a = !h && t && "object" == typeof t && "function" == typeof e;
                if (h || a) i = e, u = t;
                else {
                    "function" == typeof r && (i = r, r = void 0);
                    let o = "function" == typeof i;
                    try {
                        u = n(t, e, r, {
                            generator: this.options.generator,
                            version: this.options.version,
                            notificationIdNull: this.options.notificationIdNull
                        })
                    } catch (t) {
                        if (o) return i(t);
                        throw t
                    }
                    if (!o) return u
                }
                try {
                    o = JSON.stringify(u, this.options.replacer)
                } catch (t) {
                    return i(t)
                }
                return this.callServer(o, function(t, e) {
                    s._parseResponse(t, e, i)
                }), u
            }, o.prototype._parseResponse = function(t, e, r) {
                let i;
                if (t) {
                    r(t);
                    return
                }
                if (!e) return r();
                try {
                    i = JSON.parse(e, this.options.reviver)
                } catch (t) {
                    return r(t)
                }
                if (3 === r.length) {
                    if (!Array.isArray(i)) return r(null, i.error, i.result); {
                        let t = function(t) {
                            return void 0 !== t.error
                        };
                        return r(null, i.filter(t), i.filter(function(e) {
                            return !t(e)
                        }))
                    }
                }
                r(null, i)
            }
        },
        62309: function(t, e, r) {
            "use strict";
            let i = r(3538).v4;
            t.exports = function(t, e, r, n) {
                if ("string" != typeof t) throw TypeError(t + " must be a string");
                let o = "number" == typeof(n = n || {}).version ? n.version : 2;
                if (1 !== o && 2 !== o) throw TypeError(o + " must be 1 or 2");
                let s = {
                    method: t
                };
                if (2 === o && (s.jsonrpc = "2.0"), e) {
                    if ("object" != typeof e && !Array.isArray(e)) throw TypeError(e + " must be an object, array or omitted");
                    s.params = e
                }
                if (void 0 === r) {
                    let t = "function" == typeof n.generator ? n.generator : function() {
                        return i()
                    };
                    s.id = t(s, n)
                } else 2 === o && null === r ? n.notificationIdNull && (s.id = null) : s.id = r;
                return s
            }
        },
        97393: function(t, e, r) {
            "use strict";
            var i = r(9109).Buffer,
                n = r(23963);
            e.Z = void 0;
            var o = n(r(54566)),
                s = n(r(28400)),
                u = n(r(80154)),
                h = n(r(52749)),
                a = n(r(20209)),
                l = n(r(17693)),
                f = n(r(67689)),
                c = n(r(15622)),
                d = r(37836),
                p = r(81884);

            function m() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
                } catch (t) {}
                return (m = function() {
                    return !!t
                })()
            }
            var g = function(t, e) {
                var r = {};
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && 0 > e.indexOf(i) && (r[i] = t[i]);
                if (null != t && "function" == typeof Object.getOwnPropertySymbols)
                    for (var n = 0, i = Object.getOwnPropertySymbols(t); n < i.length; n++) 0 > e.indexOf(i[n]) && Object.prototype.propertyIsEnumerable.call(t, i[n]) && (r[i[n]] = t[i[n]]);
                return r
            };
            e.Z = function(t) {
                var e, r, n, d;

                function y(t) {
                    var e, r, i, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "ws://localhost:8080",
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        s = arguments.length > 3 ? arguments[3] : void 0,
                        u = arguments.length > 4 ? arguments[4] : void 0;
                    (0, h.default)(this, y);
                    var a = o.autoconnect,
                        c = o.reconnect,
                        d = o.reconnect_interval,
                        v = o.max_reconnects,
                        w = g(o, ["autoconnect", "reconnect", "reconnect_interval", "max_reconnects"]);
                    return e = y, e = (0, f.default)(e), (i = (0, l.default)(this, m() ? Reflect.construct(e, [], (0, f.default)(this).constructor) : e.apply(this, r))).webSocketFactory = t, i.queue = {}, i.rpc_id = 0, i.address = n, i.autoconnect = void 0 === a || a, i.ready = !1, i.reconnect = void 0 === c || c, i.reconnect_timer_id = void 0, i.reconnect_interval = void 0 === d ? 1e3 : d, i.max_reconnects = void 0 === v ? 5 : v, i.rest_options = w, i.current_reconnects = 0, i.generate_request_id = s || function() {
                        return ++i.rpc_id
                    }, u ? i.dataPack = u : i.dataPack = new p.DefaultDataPack, i.autoconnect && i._connect(i.address, Object.assign({
                        autoconnect: i.autoconnect,
                        reconnect: i.reconnect,
                        reconnect_interval: i.reconnect_interval,
                        max_reconnects: i.max_reconnects
                    }, i.rest_options)), i
                }
                return (0, c.default)(y, t), (0, a.default)(y, [{
                    key: "connect",
                    value: function() {
                        this.socket || this._connect(this.address, Object.assign({
                            autoconnect: this.autoconnect,
                            reconnect: this.reconnect,
                            reconnect_interval: this.reconnect_interval,
                            max_reconnects: this.max_reconnects
                        }, this.rest_options))
                    }
                }, {
                    key: "call",
                    value: function(t, e, r, i) {
                        var n = this;
                        return i || "object" !== (0, u.default)(r) || (i = r, r = null), new Promise(function(o, s) {
                            if (!n.ready) return s(Error("socket not ready"));
                            var u = n.generate_request_id(t, e);
                            n.socket.send(n.dataPack.encode({
                                jsonrpc: "2.0",
                                method: t,
                                params: e || void 0,
                                id: u
                            }), i, function(t) {
                                if (t) return s(t);
                                n.queue[u] = {
                                    promise: [o, s]
                                }, r && (n.queue[u].timeout = setTimeout(function() {
                                    delete n.queue[u], s(Error("reply timeout"))
                                }, r))
                            })
                        })
                    }
                }, {
                    key: "login",
                    value: (e = (0, s.default)(o.default.mark(function t(e) {
                        var r;
                        return o.default.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, this.call("rpc.login", e);
                                case 2:
                                    if (r = t.sent) {
                                        t.next = 5;
                                        break
                                    }
                                    throw Error("authentication failed");
                                case 5:
                                    return t.abrupt("return", r);
                                case 6:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this)
                    })), function(t) {
                        return e.apply(this, arguments)
                    })
                }, {
                    key: "listMethods",
                    value: (r = (0, s.default)(o.default.mark(function t() {
                        return o.default.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, this.call("__listMethods");
                                case 2:
                                    return t.abrupt("return", t.sent);
                                case 3:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this)
                    })), function() {
                        return r.apply(this, arguments)
                    })
                }, {
                    key: "notify",
                    value: function(t, e) {
                        var r = this;
                        return new Promise(function(i, n) {
                            if (!r.ready) return n(Error("socket not ready"));
                            r.socket.send(r.dataPack.encode({
                                jsonrpc: "2.0",
                                method: t,
                                params: e
                            }), function(t) {
                                if (t) return n(t);
                                i()
                            })
                        })
                    }
                }, {
                    key: "subscribe",
                    value: (n = (0, s.default)(o.default.mark(function t(e) {
                        var r;
                        return o.default.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return "string" == typeof e && (e = [e]), t.next = 3, this.call("rpc.on", e);
                                case 3:
                                    if (r = t.sent, !("string" == typeof e && "ok" !== r[e])) {
                                        t.next = 6;
                                        break
                                    }
                                    throw Error("Failed subscribing to an event '" + e + "' with: " + r[e]);
                                case 6:
                                    return t.abrupt("return", r);
                                case 7:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this)
                    })), function(t) {
                        return n.apply(this, arguments)
                    })
                }, {
                    key: "unsubscribe",
                    value: (d = (0, s.default)(o.default.mark(function t(e) {
                        var r;
                        return o.default.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return "string" == typeof e && (e = [e]), t.next = 3, this.call("rpc.off", e);
                                case 3:
                                    if (r = t.sent, !("string" == typeof e && "ok" !== r[e])) {
                                        t.next = 6;
                                        break
                                    }
                                    throw Error("Failed unsubscribing from an event with: " + r);
                                case 6:
                                    return t.abrupt("return", r);
                                case 7:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this)
                    })), function(t) {
                        return d.apply(this, arguments)
                    })
                }, {
                    key: "close",
                    value: function(t, e) {
                        this.socket.close(t || 1e3, e)
                    }
                }, {
                    key: "setAutoReconnect",
                    value: function(t) {
                        this.reconnect = t
                    }
                }, {
                    key: "setReconnectInterval",
                    value: function(t) {
                        this.reconnect_interval = t
                    }
                }, {
                    key: "setMaxReconnects",
                    value: function(t) {
                        this.max_reconnects = t
                    }
                }, {
                    key: "_connect",
                    value: function(t, e) {
                        var r = this;
                        clearTimeout(this.reconnect_timer_id), this.socket = this.webSocketFactory(t, e), this.socket.addEventListener("open", function() {
                            r.ready = !0, r.emit("open"), r.current_reconnects = 0
                        }), this.socket.addEventListener("message", function(t) {
                            var e = t.data;
                            e instanceof ArrayBuffer && (e = i.from(e).toString());
                            try {
                                e = r.dataPack.decode(e)
                            } catch (t) {
                                return
                            }
                            if (e.notification && r.listeners(e.notification).length) {
                                if (!Object.keys(e.params).length) return r.emit(e.notification);
                                var n = [e.notification];
                                if (e.params.constructor === Object) n.push(e.params);
                                else
                                    for (var o = 0; o < e.params.length; o++) n.push(e.params[o]);
                                return Promise.resolve().then(function() {
                                    r.emit.apply(r, n)
                                })
                            }
                            if (!r.queue[e.id]) return e.method ? Promise.resolve().then(function() {
                                r.emit(e.method, null == e ? void 0 : e.params)
                            }) : void 0;
                            "error" in e == "result" in e && r.queue[e.id].promise[1](Error('Server response malformed. Response must include either "result" or "error", but not both.')), r.queue[e.id].timeout && clearTimeout(r.queue[e.id].timeout), e.error ? r.queue[e.id].promise[1](e.error) : r.queue[e.id].promise[0](e.result), delete r.queue[e.id]
                        }), this.socket.addEventListener("error", function(t) {
                            return r.emit("error", t)
                        }), this.socket.addEventListener("close", function(i) {
                            var n = i.code,
                                o = i.reason;
                            r.ready && setTimeout(function() {
                                return r.emit("close", n, o)
                            }, 0), r.ready = !1, r.socket = void 0, 1e3 !== n && (r.current_reconnects++, r.reconnect && (r.max_reconnects > r.current_reconnects || 0 === r.max_reconnects) && (r.reconnect_timer_id = setTimeout(function() {
                                return r._connect(t, e)
                            }, r.reconnect_interval)))
                        })
                    }
                }])
            }(d.EventEmitter)
        },
        27418: function(t, e, r) {
            "use strict";
            var i = r(23963);
            e.Z = function(t, e) {
                return new l(t, e)
            };
            var n = i(r(52749)),
                o = i(r(20209)),
                s = i(r(17693)),
                u = i(r(67689)),
                h = i(r(15622));

            function a() {
                try {
                    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
                } catch (t) {}
                return (a = function() {
                    return !!t
                })()
            }
            var l = function(t) {
                function e(t, r, i) {
                    var o, h, l;
                    return (0, n.default)(this, e), h = e, h = (0, u.default)(h), (o = (0, s.default)(this, a() ? Reflect.construct(h, [], (0, u.default)(this).constructor) : h.apply(this, l))).socket = new window.WebSocket(t, i), o.socket.onopen = function() {
                        return o.emit("open")
                    }, o.socket.onmessage = function(t) {
                        return o.emit("message", t.data)
                    }, o.socket.onerror = function(t) {
                        return o.emit("error", t)
                    }, o.socket.onclose = function(t) {
                        o.emit("close", t.code, t.reason)
                    }, o
                }
                return (0, h.default)(e, t), (0, o.default)(e, [{
                    key: "send",
                    value: function(t, e, r) {
                        var i = r || e;
                        try {
                            this.socket.send(t), i()
                        } catch (t) {
                            i(t)
                        }
                    }
                }, {
                    key: "close",
                    value: function(t, e) {
                        this.socket.close(t, e)
                    }
                }, {
                    key: "addEventListener",
                    value: function(t, e, r) {
                        this.socket.addEventListener(t, e, r)
                    }
                }])
            }(r(37836).EventEmitter)
        },
        81884: function(t, e, r) {
            "use strict";
            var i = r(23963);
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.DefaultDataPack = void 0, e.createError = function(t, e) {
                var r = {
                    code: t,
                    message: s.get(t) || "Internal Server Error"
                };
                return e && (r.data = e), r
            };
            var n = i(r(52749)),
                o = i(r(20209)),
                s = new Map([
                    [-32e3, "Event not provided"],
                    [-32600, "Invalid Request"],
                    [-32601, "Method not found"],
                    [-32602, "Invalid params"],
                    [-32603, "Internal error"],
                    [-32604, "Params not found"],
                    [-32605, "Method forbidden"],
                    [-32606, "Event forbidden"],
                    [-32700, "Parse error"]
                ]);
            e.DefaultDataPack = (0, o.default)(function t() {
                (0, n.default)(this, t)
            }, [{
                key: "encode",
                value: function(t) {
                    return JSON.stringify(t)
                }
            }, {
                key: "decode",
                value: function(t) {
                    return JSON.parse(t)
                }
            }])
        },
        10632: function(t, e, r) { /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
            var i = r(9109),
                n = i.Buffer;

            function o(t, e) {
                for (var r in t) e[r] = t[r]
            }

            function s(t, e, r) {
                return n(t, e, r)
            }
            n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = i : (o(i, e), e.Buffer = s), s.prototype = Object.create(n.prototype), o(n, s), s.from = function(t, e, r) {
                if ("number" == typeof t) throw TypeError("Argument must not be a number");
                return n(t, e, r)
            }, s.alloc = function(t, e, r) {
                if ("number" != typeof t) throw TypeError("Argument must be a number");
                var i = n(t);
                return void 0 !== e ? "string" == typeof r ? i.fill(e, r) : i.fill(e) : i.fill(0), i
            }, s.allocUnsafe = function(t) {
                if ("number" != typeof t) throw TypeError("Argument must be a number");
                return n(t)
            }, s.allocUnsafeSlow = function(t) {
                if ("number" != typeof t) throw TypeError("Argument must be a number");
                return i.SlowBuffer(t)
            }
        },
        57139: function(t, e) {
            "use strict";

            function r(t, e, r) {
                return e <= t && t <= r
            }

            function i(t) {
                if (void 0 === t) return {};
                if (t === Object(t)) return t;
                throw TypeError("Could not convert argument to dictionary")
            }

            function n(t) {
                this.tokens = [].slice.call(t)
            }

            function o(t, e) {
                if (t) throw TypeError("Decoder error");
                return e || 65533
            }
            n.prototype = {
                endOfStream: function() {
                    return !this.tokens.length
                },
                read: function() {
                    return this.tokens.length ? this.tokens.shift() : -1
                },
                prepend: function(t) {
                    if (Array.isArray(t))
                        for (; t.length;) this.tokens.unshift(t.pop());
                    else this.tokens.unshift(t)
                },
                push: function(t) {
                    if (Array.isArray(t))
                        for (; t.length;) this.tokens.push(t.shift());
                    else this.tokens.push(t)
                }
            };
            var s = "utf-8";

            function u(t, e) {
                if (!(this instanceof u)) return new u(t, e);
                if ((t = void 0 !== t ? String(t).toLowerCase() : s) !== s) throw Error("Encoding not supported. Only utf-8 is supported");
                e = i(e), this._streaming = !1, this._BOMseen = !1, this._decoder = null, this._fatal = !!e.fatal, this._ignoreBOM = !!e.ignoreBOM, Object.defineProperty(this, "encoding", {
                    value: "utf-8"
                }), Object.defineProperty(this, "fatal", {
                    value: this._fatal
                }), Object.defineProperty(this, "ignoreBOM", {
                    value: this._ignoreBOM
                })
            }

            function h(t, e) {
                if (!(this instanceof h)) return new h(t, e);
                if ((t = void 0 !== t ? String(t).toLowerCase() : s) !== s) throw Error("Encoding not supported. Only utf-8 is supported");
                e = i(e), this._streaming = !1, this._encoder = null, this._options = {
                    fatal: !!e.fatal
                }, Object.defineProperty(this, "encoding", {
                    value: "utf-8"
                })
            }

            function a(t) {
                var e = t.fatal,
                    i = 0,
                    n = 0,
                    s = 0,
                    u = 128,
                    h = 191;
                this.handler = function(t, a) {
                    if (-1 === a && 0 !== s) return s = 0, o(e);
                    if (-1 === a) return -1;
                    if (0 === s) {
                        if (r(a, 0, 127)) return a;
                        if (r(a, 194, 223)) s = 1, i = a - 192;
                        else if (r(a, 224, 239)) 224 === a && (u = 160), 237 === a && (h = 159), s = 2, i = a - 224;
                        else {
                            if (!r(a, 240, 244)) return o(e);
                            240 === a && (u = 144), 244 === a && (h = 143), s = 3, i = a - 240
                        }
                        return i <<= 6 * s, null
                    }
                    if (!r(a, u, h)) return i = s = n = 0, u = 128, h = 191, t.prepend(a), o(e);
                    if (u = 128, h = 191, n += 1, i += a - 128 << 6 * (s - n), n !== s) return null;
                    var l = i;
                    return i = s = n = 0, l
                }
            }

            function l(t) {
                t.fatal, this.handler = function(t, e) {
                    if (-1 === e) return -1;
                    if (r(e, 0, 127)) return e;
                    r(e, 128, 2047) ? (i = 1, n = 192) : r(e, 2048, 65535) ? (i = 2, n = 224) : r(e, 65536, 1114111) && (i = 3, n = 240);
                    for (var i, n, o = [(e >> 6 * i) + n]; i > 0;) {
                        var s = e >> 6 * (i - 1);
                        o.push(128 | 63 & s), i -= 1
                    }
                    return o
                }
            }
            u.prototype = {
                decode: function(t, e) {
                    r = "object" == typeof t && t instanceof ArrayBuffer ? new Uint8Array(t) : "object" == typeof t && "buffer" in t && t.buffer instanceof ArrayBuffer ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : new Uint8Array(0), e = i(e), this._streaming || (this._decoder = new a({
                        fatal: this._fatal
                    }), this._BOMseen = !1), this._streaming = !!e.stream;
                    for (var r, o, s = new n(r), u = []; !s.endOfStream() && -1 !== (o = this._decoder.handler(s, s.read()));) null !== o && (Array.isArray(o) ? u.push.apply(u, o) : u.push(o));
                    if (!this._streaming) {
                        do {
                            if (-1 === (o = this._decoder.handler(s, s.read()))) break;
                            if (null === o) continue;
                            Array.isArray(o) ? u.push.apply(u, o) : u.push(o)
                        } while (!s.endOfStream());
                        this._decoder = null
                    }
                    return !u.length || -1 === ["utf-8"].indexOf(this.encoding) || this._ignoreBOM || this._BOMseen || (65279 === u[0] ? (this._BOMseen = !0, u.shift()) : this._BOMseen = !0),
                        function(t) {
                            for (var e = "", r = 0; r < t.length; ++r) {
                                var i = t[r];
                                i <= 65535 ? e += String.fromCharCode(i) : (i -= 65536, e += String.fromCharCode((i >> 10) + 55296, (1023 & i) + 56320))
                            }
                            return e
                        }(u)
                }
            }, h.prototype = {
                encode: function(t, e) {
                    t = t ? String(t) : "", e = i(e), this._streaming || (this._encoder = new l(this._options)), this._streaming = !!e.stream;
                    for (var r, o = [], s = new n(function(t) {
                            for (var e = String(t), r = e.length, i = 0, n = []; i < r;) {
                                var o = e.charCodeAt(i);
                                if (o < 55296 || o > 57343) n.push(o);
                                else if (56320 <= o && o <= 57343) n.push(65533);
                                else if (55296 <= o && o <= 56319) {
                                    if (i === r - 1) n.push(65533);
                                    else {
                                        var s = t.charCodeAt(i + 1);
                                        if (56320 <= s && s <= 57343) {
                                            var u = 1023 & o,
                                                h = 1023 & s;
                                            n.push(65536 + (u << 10) + h), i += 1
                                        } else n.push(65533)
                                    }
                                }
                                i += 1
                            }
                            return n
                        }(t)); !s.endOfStream() && -1 !== (r = this._encoder.handler(s, s.read()));) Array.isArray(r) ? o.push.apply(o, r) : o.push(r);
                    if (!this._streaming) {
                        for (; - 1 !== (r = this._encoder.handler(s, s.read()));) Array.isArray(r) ? o.push.apply(o, r) : o.push(r);
                        this._encoder = null
                    }
                    return new Uint8Array(o)
                }
            }, e.TextEncoder = h, e.TextDecoder = u
        },
        3538: function(t, e, r) {
            "use strict";
            r.d(e, {
                v4: function() {
                    return a
                }
            });
            for (var i, n = new Uint8Array(16), o = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i, s = [], u = 0; u < 256; ++u) s.push((u + 256).toString(16).substr(1));
            var h = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        r = (s[t[e + 0]] + s[t[e + 1]] + s[t[e + 2]] + s[t[e + 3]] + "-" + s[t[e + 4]] + s[t[e + 5]] + "-" + s[t[e + 6]] + s[t[e + 7]] + "-" + s[t[e + 8]] + s[t[e + 9]] + "-" + s[t[e + 10]] + s[t[e + 11]] + s[t[e + 12]] + s[t[e + 13]] + s[t[e + 14]] + s[t[e + 15]]).toLowerCase();
                    if (!("string" == typeof r && o.test(r))) throw TypeError("Stringified UUID is invalid");
                    return r
                },
                a = function(t, e, r) {
                    var o = (t = t || {}).random || (t.rng || function() {
                        if (!i && !(i = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                        return i(n)
                    })();
                    if (o[6] = 15 & o[6] | 64, o[8] = 63 & o[8] | 128, e) {
                        r = r || 0;
                        for (var s = 0; s < 16; ++s) e[r + s] = o[s];
                        return e
                    }
                    return h(o)
                }
        },
        71906: function(t) {
            t.exports = {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                embed: !0,
                hr: !0,
                img: !0,
                input: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            }
        },
        14261: function(t) {
            t.exports = function(t) {
                if (void 0 === t) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        28400: function(t) {
            function e(t, e, r, i, n, o, s) {
                try {
                    var u = t[o](s),
                        h = u.value
                } catch (t) {
                    r(t);
                    return
                }
                u.done ? e(h) : Promise.resolve(h).then(i, n)
            }
            t.exports = function(t) {
                return function() {
                    var r = this,
                        i = arguments;
                    return new Promise(function(n, o) {
                        var s = t.apply(r, i);

                        function u(t) {
                            e(s, n, o, u, h, "next", t)
                        }

                        function h(t) {
                            e(s, n, o, u, h, "throw", t)
                        }
                        u(void 0)
                    })
                }
            }, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        52749: function(t) {
            t.exports = function(t, e) {
                if (!(t instanceof e)) throw TypeError("Cannot call a class as a function")
            }, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        20209: function(t, e, r) {
            var i = r(54048);

            function n(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, i(n.key), n)
                }
            }
            t.exports = function(t, e, r) {
                return e && n(t.prototype, e), r && n(t, r), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), t
            }, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        67689: function(t) {
            function e(r) {
                return t.exports = e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, t.exports.__esModule = !0, t.exports.default = t.exports, e(r)
            }
            t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        15622: function(t, e, r) {
            var i = r(11520);
            t.exports = function(t, e) {
                if ("function" != typeof e && null !== e) throw TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), e && i(t, e)
            }, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        23963: function(t) {
            t.exports = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        17693: function(t, e, r) {
            var i = r(80154).default,
                n = r(14261);
            t.exports = function(t, e) {
                if (e && ("object" === i(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw TypeError("Derived constructors may only return object or undefined");
                return n(t)
            }, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        60518: function(t, e, r) {
            var i = r(80154).default;

            function n() {
                "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
                t.exports = n = function() {
                    return r
                }, t.exports.__esModule = !0, t.exports.default = t.exports;
                var e, r = {},
                    o = Object.prototype,
                    s = o.hasOwnProperty,
                    u = Object.defineProperty || function(t, e, r) {
                        t[e] = r.value
                    },
                    h = "function" == typeof Symbol ? Symbol : {},
                    a = h.iterator || "@@iterator",
                    l = h.asyncIterator || "@@asyncIterator",
                    f = h.toStringTag || "@@toStringTag";

                function c(t, e, r) {
                    return Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), t[e]
                }
                try {
                    c({}, "")
                } catch (t) {
                    c = function(t, e, r) {
                        return t[e] = r
                    }
                }

                function d(t, r, i, n) {
                    var o, s, h = Object.create((r && r.prototype instanceof w ? r : w).prototype);
                    return u(h, "_invoke", {
                        value: (o = new O(n || []), s = m, function(r, n) {
                            if (s === g) throw Error("Generator is already running");
                            if (s === y) {
                                if ("throw" === r) throw n;
                                return {
                                    value: e,
                                    done: !0
                                }
                            }
                            for (o.method = r, o.arg = n;;) {
                                var u = o.delegate;
                                if (u) {
                                    var h = function t(r, i) {
                                        var n = i.method,
                                            o = r.iterator[n];
                                        if (o === e) return i.delegate = null, "throw" === n && r.iterator.return && (i.method = "return", i.arg = e, t(r, i), "throw" === i.method) || "return" !== n && (i.method = "throw", i.arg = TypeError("The iterator does not provide a '" + n + "' method")), v;
                                        var s = p(o, r.iterator, i.arg);
                                        if ("throw" === s.type) return i.method = "throw", i.arg = s.arg, i.delegate = null, v;
                                        var u = s.arg;
                                        return u ? u.done ? (i[r.resultName] = u.value, i.next = r.nextLoc, "return" !== i.method && (i.method = "next", i.arg = e), i.delegate = null, v) : u : (i.method = "throw", i.arg = TypeError("iterator result is not an object"), i.delegate = null, v)
                                    }(u, o);
                                    if (h) {
                                        if (h === v) continue;
                                        return h
                                    }
                                }
                                if ("next" === o.method) o.sent = o._sent = o.arg;
                                else if ("throw" === o.method) {
                                    if (s === m) throw s = y, o.arg;
                                    o.dispatchException(o.arg)
                                } else "return" === o.method && o.abrupt("return", o.arg);
                                s = g;
                                var a = p(t, i, o);
                                if ("normal" === a.type) {
                                    if (s = o.done ? y : "suspendedYield", a.arg === v) continue;
                                    return {
                                        value: a.arg,
                                        done: o.done
                                    }
                                }
                                "throw" === a.type && (s = y, o.method = "throw", o.arg = a.arg)
                            }
                        })
                    }), h
                }

                function p(t, e, r) {
                    try {
                        return {
                            type: "normal",
                            arg: t.call(e, r)
                        }
                    } catch (t) {
                        return {
                            type: "throw",
                            arg: t
                        }
                    }
                }
                r.wrap = d;
                var m = "suspendedStart",
                    g = "executing",
                    y = "completed",
                    v = {};

                function w() {}

                function b() {}

                function M() {}
                var E = {};
                c(E, a, function() {
                    return this
                });
                var x = Object.getPrototypeOf,
                    _ = x && x(x(L([])));
                _ && _ !== o && s.call(_, a) && (E = _);
                var B = M.prototype = w.prototype = Object.create(E);

                function A(t) {
                    ["next", "throw", "return"].forEach(function(e) {
                        c(t, e, function(t) {
                            return this._invoke(e, t)
                        })
                    })
                }

                function I(t, e) {
                    var r;
                    u(this, "_invoke", {
                        value: function(n, o) {
                            function u() {
                                return new e(function(r, u) {
                                    ! function r(n, o, u, h) {
                                        var a = p(t[n], t, o);
                                        if ("throw" !== a.type) {
                                            var l = a.arg,
                                                f = l.value;
                                            return f && "object" == i(f) && s.call(f, "__await") ? e.resolve(f.__await).then(function(t) {
                                                r("next", t, u, h)
                                            }, function(t) {
                                                r("throw", t, u, h)
                                            }) : e.resolve(f).then(function(t) {
                                                l.value = t, u(l)
                                            }, function(t) {
                                                return r("throw", t, u, h)
                                            })
                                        }
                                        h(a.arg)
                                    }(n, o, r, u)
                                })
                            }
                            return r = r ? r.then(u, u) : u()
                        }
                    })
                }

                function S(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
                }

                function k(t) {
                    var e = t.completion || {};
                    e.type = "normal", delete e.arg, t.completion = e
                }

                function O(t) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], t.forEach(S, this), this.reset(!0)
                }

                function L(t) {
                    if (t || "" === t) {
                        var r = t[a];
                        if (r) return r.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var n = -1,
                                o = function r() {
                                    for (; ++n < t.length;)
                                        if (s.call(t, n)) return r.value = t[n], r.done = !1, r;
                                    return r.value = e, r.done = !0, r
                                };
                            return o.next = o
                        }
                    }
                    throw TypeError(i(t) + " is not iterable")
                }
                return b.prototype = M, u(B, "constructor", {
                    value: M,
                    configurable: !0
                }), u(M, "constructor", {
                    value: b,
                    configurable: !0
                }), b.displayName = c(M, f, "GeneratorFunction"), r.isGeneratorFunction = function(t) {
                    var e = "function" == typeof t && t.constructor;
                    return !!e && (e === b || "GeneratorFunction" === (e.displayName || e.name))
                }, r.mark = function(t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, M) : (t.__proto__ = M, c(t, f, "GeneratorFunction")), t.prototype = Object.create(B), t
                }, r.awrap = function(t) {
                    return {
                        __await: t
                    }
                }, A(I.prototype), c(I.prototype, l, function() {
                    return this
                }), r.AsyncIterator = I, r.async = function(t, e, i, n, o) {
                    void 0 === o && (o = Promise);
                    var s = new I(d(t, e, i, n), o);
                    return r.isGeneratorFunction(e) ? s : s.next().then(function(t) {
                        return t.done ? t.value : s.next()
                    })
                }, A(B), c(B, f, "Generator"), c(B, a, function() {
                    return this
                }), c(B, "toString", function() {
                    return "[object Generator]"
                }), r.keys = function(t) {
                    var e = Object(t),
                        r = [];
                    for (var i in e) r.push(i);
                    return r.reverse(),
                        function t() {
                            for (; r.length;) {
                                var i = r.pop();
                                if (i in e) return t.value = i, t.done = !1, t
                            }
                            return t.done = !0, t
                        }
                }, r.values = L, O.prototype = {
                    constructor: O,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(k), !t)
                            for (var r in this) "t" === r.charAt(0) && s.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
                    },
                    stop: function() {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval
                    },
                    dispatchException: function(t) {
                        if (this.done) throw t;
                        var r = this;

                        function i(i, n) {
                            return u.type = "throw", u.arg = t, r.next = i, n && (r.method = "next", r.arg = e), !!n
                        }
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var o = this.tryEntries[n],
                                u = o.completion;
                            if ("root" === o.tryLoc) return i("end");
                            if (o.tryLoc <= this.prev) {
                                var h = s.call(o, "catchLoc"),
                                    a = s.call(o, "finallyLoc");
                                if (h && a) {
                                    if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc) return i(o.finallyLoc)
                                } else if (h) {
                                    if (this.prev < o.catchLoc) return i(o.catchLoc, !0)
                                } else {
                                    if (!a) throw Error("try statement without catch or finally");
                                    if (this.prev < o.finallyLoc) return i(o.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(t, e) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var i = this.tryEntries[r];
                            if (i.tryLoc <= this.prev && s.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                                var n = i;
                                break
                            }
                        }
                        n && ("break" === t || "continue" === t) && n.tryLoc <= e && e <= n.finallyLoc && (n = null);
                        var o = n ? n.completion : {};
                        return o.type = t, o.arg = e, n ? (this.method = "next", this.next = n.finallyLoc, v) : this.complete(o)
                    },
                    complete: function(t, e) {
                        if ("throw" === t.type) throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), v
                    },
                    finish: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var r = this.tryEntries[e];
                            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), k(r), v
                        }
                    },
                    catch: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var r = this.tryEntries[e];
                            if (r.tryLoc === t) {
                                var i = r.completion;
                                if ("throw" === i.type) {
                                    var n = i.arg;
                                    k(r)
                                }
                                return n
                            }
                        }
                        throw Error("illegal catch attempt")
                    },
                    delegateYield: function(t, r, i) {
                        return this.delegate = {
                            iterator: L(t),
                            resultName: r,
                            nextLoc: i
                        }, "next" === this.method && (this.arg = e), v
                    }
                }, r
            }
            t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        11520: function(t) {
            function e(r, i) {
                return t.exports = e = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                    return t.__proto__ = e, t
                }, t.exports.__esModule = !0, t.exports.default = t.exports, e(r, i)
            }
            t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        50513: function(t, e, r) {
            var i = r(80154).default;
            t.exports = function(t, e) {
                if ("object" != i(t) || !t) return t;
                var r = t[Symbol.toPrimitive];
                if (void 0 !== r) {
                    var n = r.call(t, e || "default");
                    if ("object" != i(n)) return n;
                    throw TypeError("@@toPrimitive must return a primitive value.")
                }
                return ("string" === e ? String : Number)(t)
            }, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        54048: function(t, e, r) {
            var i = r(80154).default,
                n = r(50513);
            t.exports = function(t) {
                var e = n(t, "string");
                return "symbol" == i(e) ? e : e + ""
            }, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        80154: function(t) {
            function e(r) {
                return t.exports = e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }, t.exports.__esModule = !0, t.exports.default = t.exports, e(r)
            }
            t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports
        },
        54566: function(t, e, r) {
            var i = r(60518)();
            t.exports = i;
            try {
                regeneratorRuntime = i
            } catch (t) {
                "object" == typeof globalThis ? globalThis.regeneratorRuntime = i : Function("r", "regeneratorRuntime = r")(i)
            }
        },
        65332: function(t, e, r) {
            "use strict";
            r.d(e, {
                K: function() {
                    return h
                },
                M: function() {
                    return u
                }
            });
            var i = r(53554),
                n = r(91678); /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            let o = BigInt(0),
                s = BigInt(1);

            function u(t, e) {
                let r = (t, e) => {
                        let r = e.negate();
                        return t ? r : e
                    },
                    i = t => ({
                        windows: Math.ceil(e / t) + 1,
                        windowSize: 2 ** (t - 1)
                    });
                return {
                    constTimeNegate: r,
                    unsafeLadder(e, r) {
                        let i = t.ZERO,
                            n = e;
                        for (; r > o;) r & s && (i = i.add(n)), n = n.double(), r >>= s;
                        return i
                    },
                    precomputeWindow(t, e) {
                        let {
                            windows: r,
                            windowSize: n
                        } = i(e), o = [], s = t, u = s;
                        for (let t = 0; t < r; t++) {
                            u = s, o.push(u);
                            for (let t = 1; t < n; t++) u = u.add(s), o.push(u);
                            s = u.double()
                        }
                        return o
                    },
                    wNAF(e, n, o) {
                        let {
                            windows: u,
                            windowSize: h
                        } = i(e), a = t.ZERO, l = t.BASE, f = BigInt(2 ** e - 1), c = 2 ** e, d = BigInt(e);
                        for (let t = 0; t < u; t++) {
                            let e = t * h,
                                i = Number(o & f);
                            o >>= d, i > h && (i -= c, o += s);
                            let u = e + Math.abs(i) - 1,
                                p = t % 2 != 0,
                                m = i < 0;
                            0 === i ? l = l.add(r(p, n[e])) : a = a.add(r(m, n[u]))
                        }
                        return {
                            p: a,
                            f: l
                        }
                    },
                    wNAFCached(t, e, r, i) {
                        let n = t._WINDOW_SIZE || 1,
                            o = e.get(t);
                        return o || (o = this.precomputeWindow(t, n), 1 !== n && e.set(t, i(o))), this.wNAF(n, o, r)
                    }
                }
            }

            function h(t) {
                return (0, i.OP)(t.Fp), (0, n.FF)(t, {
                    n: "bigint",
                    h: "bigint",
                    Gx: "field",
                    Gy: "field"
                }, {
                    nBitLength: "isSafeInteger",
                    nByteLength: "isSafeInteger"
                }), Object.freeze({ ...(0, i.kK)(t.n, t.nBitLength),
                    ...t,
                    p: t.Fp.ORDER
                })
            }
        },
        53554: function(t, e, r) {
            "use strict";
            r.d(e, {
                DV: function() {
                    return w
                },
                OP: function() {
                    return g
                },
                PS: function() {
                    return M
                },
                Tu: function() {
                    return p
                },
                U_: function() {
                    return d
                },
                Us: function() {
                    return E
                },
                gN: function() {
                    return v
                },
                kK: function() {
                    return y
                },
                oA: function() {
                    return c
                },
                wQ: function() {
                    return f
                }
            });
            var i = r(91678); /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            let n = BigInt(0),
                o = BigInt(1),
                s = BigInt(2),
                u = BigInt(3),
                h = BigInt(4),
                a = BigInt(5),
                l = BigInt(8);

            function f(t, e) {
                let r = t % e;
                return r >= n ? r : e + r
            }

            function c(t, e, r) {
                let i = t;
                for (; e-- > n;) i *= i, i %= r;
                return i
            }

            function d(t, e) {
                if (t === n || e <= n) throw Error(`invert: expected positive integers, got n=${t} mod=${e}`);
                let r = f(t, e),
                    i = e,
                    s = n,
                    u = o,
                    h = o,
                    a = n;
                for (; r !== n;) {
                    let t = i / r,
                        e = i % r,
                        n = s - h * t,
                        o = u - a * t;
                    i = r, r = e, s = h, u = a, h = n, a = o
                }
                if (i !== o) throw Error("invert: does not exist");
                return f(s, e)
            }
            BigInt(9), BigInt(16);
            let p = (t, e) => (f(t, e) & o) === o,
                m = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];

            function g(t) {
                let e = m.reduce((t, e) => (t[e] = "function", t), {
                    ORDER: "bigint",
                    MASK: "bigint",
                    BYTES: "isSafeInteger",
                    BITS: "isSafeInteger"
                });
                return (0, i.FF)(t, e)
            }

            function y(t, e) {
                let r = void 0 !== e ? e : t.toString(2).length;
                return {
                    nBitLength: r,
                    nByteLength: Math.ceil(r / 8)
                }
            }

            function v(t, e, r = !1, c = {}) {
                if (t <= n) throw Error(`Expected Field ORDER > 0, got ${t}`);
                let {
                    nBitLength: p,
                    nByteLength: m
                } = y(t, e);
                if (m > 2048) throw Error("Field lengths over 2048 bytes are not supported");
                let g = function(t) {
                        if (t % h === u) {
                            let e = (t + o) / h;
                            return function(t, r) {
                                let i = t.pow(r, e);
                                if (!t.eql(t.sqr(i), r)) throw Error("Cannot find square root");
                                return i
                            }
                        }
                        if (t % l === a) {
                            let e = (t - a) / l;
                            return function(t, r) {
                                let i = t.mul(r, s),
                                    n = t.pow(i, e),
                                    o = t.mul(r, n),
                                    u = t.mul(t.mul(o, s), n),
                                    h = t.mul(o, t.sub(u, t.ONE));
                                if (!t.eql(t.sqr(h), r)) throw Error("Cannot find square root");
                                return h
                            }
                        }
                        return function(t) {
                            let e, r, i;
                            let u = (t - o) / s;
                            for (e = t - o, r = 0; e % s === n; e /= s, r++);
                            for (i = s; i < t && function(t, e, r) {
                                    if (r <= n || e < n) throw Error("Expected power/modulo > 0");
                                    if (r === o) return n;
                                    let i = o;
                                    for (; e > n;) e & o && (i = i * t % r), t = t * t % r, e >>= o;
                                    return i
                                }(i, u, t) !== t - o; i++);
                            if (1 === r) {
                                let e = (t + o) / h;
                                return function(t, r) {
                                    let i = t.pow(r, e);
                                    if (!t.eql(t.sqr(i), r)) throw Error("Cannot find square root");
                                    return i
                                }
                            }
                            let a = (e + o) / s;
                            return function(t, n) {
                                if (t.pow(n, u) === t.neg(t.ONE)) throw Error("Cannot find square root");
                                let s = r,
                                    h = t.pow(t.mul(t.ONE, i), e),
                                    l = t.pow(n, a),
                                    f = t.pow(n, e);
                                for (; !t.eql(f, t.ONE);) {
                                    if (t.eql(f, t.ZERO)) return t.ZERO;
                                    let e = 1;
                                    for (let r = t.sqr(f); e < s && !t.eql(r, t.ONE); e++) r = t.sqr(r);
                                    let r = t.pow(h, o << BigInt(s - e - 1));
                                    h = t.sqr(r), l = t.mul(l, r), f = t.mul(f, h), s = e
                                }
                                return l
                            }
                        }(t)
                    }(t),
                    v = Object.freeze({
                        ORDER: t,
                        BITS: p,
                        BYTES: m,
                        MASK: (0, i.dQ)(p),
                        ZERO: n,
                        ONE: o,
                        create: e => f(e, t),
                        isValid: e => {
                            if ("bigint" != typeof e) throw Error(`Invalid field element: expected bigint, got ${typeof e}`);
                            return n <= e && e < t
                        },
                        is0: t => t === n,
                        isOdd: t => (t & o) === o,
                        neg: e => f(-e, t),
                        eql: (t, e) => t === e,
                        sqr: e => f(e * e, t),
                        add: (e, r) => f(e + r, t),
                        sub: (e, r) => f(e - r, t),
                        mul: (e, r) => f(e * r, t),
                        pow: (t, e) => (function(t, e, r) {
                            if (r < n) throw Error("Expected power > 0");
                            if (r === n) return t.ONE;
                            if (r === o) return e;
                            let i = t.ONE,
                                s = e;
                            for (; r > n;) r & o && (i = t.mul(i, s)), s = t.sqr(s), r >>= o;
                            return i
                        })(v, t, e),
                        div: (e, r) => f(e * d(r, t), t),
                        sqrN: t => t * t,
                        addN: (t, e) => t + e,
                        subN: (t, e) => t - e,
                        mulN: (t, e) => t * e,
                        inv: e => d(e, t),
                        sqrt: c.sqrt || (t => g(v, t)),
                        invertBatch: t => (function(t, e) {
                            let r = Array(e.length),
                                i = e.reduce((e, i, n) => t.is0(i) ? e : (r[n] = e, t.mul(e, i)), t.ONE),
                                n = t.inv(i);
                            return e.reduceRight((e, i, n) => t.is0(i) ? e : (r[n] = t.mul(e, r[n]), t.mul(e, i)), n), r
                        })(v, t),
                        cmov: (t, e, r) => r ? e : t,
                        toBytes: t => r ? (0, i.S5)(t, m) : (0, i.tL)(t, m),
                        fromBytes: t => {
                            if (t.length !== m) throw Error(`Fp.fromBytes: expected ${m}, got ${t.length}`);
                            return r ? (0, i.ty)(t) : (0, i.bytesToNumberBE)(t)
                        }
                    });
                return Object.freeze(v)
            }

            function w(t, e) {
                if (!t.isOdd) throw Error("Field doesn't have isOdd");
                let r = t.sqrt(e);
                return t.isOdd(r) ? t.neg(r) : r
            }

            function b(t) {
                if ("bigint" != typeof t) throw Error("field order must be bigint");
                return Math.ceil(t.toString(2).length / 8)
            }

            function M(t) {
                let e = b(t);
                return e + Math.ceil(e / 2)
            }

            function E(t, e, r = !1) {
                let n = t.length,
                    s = b(e),
                    u = M(e);
                if (n < 16 || n < u || n > 1024) throw Error(`expected ${u}-1024 bytes of input, got ${n}`);
                let h = f(r ? (0, i.bytesToNumberBE)(t) : (0, i.ty)(t), e - o) + o;
                return r ? (0, i.S5)(h, s) : (0, i.tL)(h, s)
            }
        },
        91678: function(t, e, r) {
            "use strict";
            r.d(e, {
                FF: function() {
                    return _
                },
                S5: function() {
                    return g
                },
                _t: function() {
                    return o
                },
                bytesToNumberBE: function() {
                    return d
                },
                ci: function() {
                    return h
                },
                dQ: function() {
                    return w
                },
                eV: function() {
                    return v
                },
                gk: function() {
                    return s
                },
                hexToBytes: function() {
                    return c
                },
                n$: function() {
                    return E
                },
                ql: function() {
                    return y
                },
                tL: function() {
                    return m
                },
                ty: function() {
                    return p
                }
            }), BigInt(0);
            let i = BigInt(1),
                n = BigInt(2);

            function o(t) {
                return t instanceof Uint8Array || null != t && "object" == typeof t && "Uint8Array" === t.constructor.name
            }

            function s(t) {
                if (!o(t)) throw Error("Uint8Array expected")
            }
            let u = Array.from({
                length: 256
            }, (t, e) => e.toString(16).padStart(2, "0"));

            function h(t) {
                s(t);
                let e = "";
                for (let r = 0; r < t.length; r++) e += u[t[r]];
                return e
            }

            function a(t) {
                if ("string" != typeof t) throw Error("hex string expected, got " + typeof t);
                return BigInt("" === t ? "0" : `0x${t}`)
            }
            let l = {
                _0: 48,
                _9: 57,
                _A: 65,
                _F: 70,
                _a: 97,
                _f: 102
            };

            function f(t) {
                return t >= l._0 && t <= l._9 ? t - l._0 : t >= l._A && t <= l._F ? t - (l._A - 10) : t >= l._a && t <= l._f ? t - (l._a - 10) : void 0
            }

            function c(t) {
                if ("string" != typeof t) throw Error("hex string expected, got " + typeof t);
                let e = t.length,
                    r = e / 2;
                if (e % 2) throw Error("padded hex string expected, got unpadded hex of length " + e);
                let i = new Uint8Array(r);
                for (let e = 0, n = 0; e < r; e++, n += 2) {
                    let r = f(t.charCodeAt(n)),
                        o = f(t.charCodeAt(n + 1));
                    if (void 0 === r || void 0 === o) throw Error('hex string expected, got non-hex character "' + (t[n] + t[n + 1]) + '" at index ' + n);
                    i[e] = 16 * r + o
                }
                return i
            }

            function d(t) {
                return a(h(t))
            }

            function p(t) {
                return s(t), a(h(Uint8Array.from(t).reverse()))
            }

            function m(t, e) {
                return c(t.toString(16).padStart(2 * e, "0"))
            }

            function g(t, e) {
                return m(t, e).reverse()
            }

            function y(t, e, r) {
                let i;
                if ("string" == typeof e) try {
                        i = c(e)
                    } catch (r) {
                        throw Error(`${t} must be valid hex string, got "${e}". Cause: ${r}`)
                    } else if (o(e)) i = Uint8Array.from(e);
                    else throw Error(`${t} must be hex string or Uint8Array`);
                let n = i.length;
                if ("number" == typeof r && n !== r) throw Error(`${t} expected ${r} bytes, got ${n}`);
                return i
            }

            function v(...t) {
                let e = 0;
                for (let r = 0; r < t.length; r++) {
                    let i = t[r];
                    s(i), e += i.length
                }
                let r = new Uint8Array(e);
                for (let e = 0, i = 0; e < t.length; e++) {
                    let n = t[e];
                    r.set(n, i), i += n.length
                }
                return r
            }
            let w = t => (n << BigInt(t - 1)) - i,
                b = t => new Uint8Array(t),
                M = t => Uint8Array.from(t);

            function E(t, e, r) {
                if ("number" != typeof t || t < 2) throw Error("hashLen must be a number");
                if ("number" != typeof e || e < 2) throw Error("qByteLen must be a number");
                if ("function" != typeof r) throw Error("hmacFn must be a function");
                let i = b(t),
                    n = b(t),
                    o = 0,
                    s = () => {
                        i.fill(1), n.fill(0), o = 0
                    },
                    u = (...t) => r(n, i, ...t),
                    h = (t = b()) => {
                        n = u(M([0]), t), i = u(), 0 !== t.length && (n = u(M([1]), t), i = u())
                    },
                    a = () => {
                        if (o++ >= 1e3) throw Error("drbg: tried 1000 values");
                        let t = 0,
                            r = [];
                        for (; t < e;) {
                            let e = (i = u()).slice();
                            r.push(e), t += i.length
                        }
                        return v(...r)
                    };
                return (t, e) => {
                    let r;
                    for (s(), h(t); !(r = e(a()));) h();
                    return s(), r
                }
            }
            let x = {
                bigint: t => "bigint" == typeof t,
                function: t => "function" == typeof t,
                boolean: t => "boolean" == typeof t,
                string: t => "string" == typeof t,
                stringOrUint8Array: t => "string" == typeof t || o(t),
                isSafeInteger: t => Number.isSafeInteger(t),
                array: t => Array.isArray(t),
                field: (t, e) => e.Fp.isValid(t),
                hash: t => "function" == typeof t && Number.isSafeInteger(t.outputLen)
            };

            function _(t, e, r = {}) {
                let i = (e, r, i) => {
                    let n = x[r];
                    if ("function" != typeof n) throw Error(`Invalid validator "${r}", expected function`);
                    let o = t[e];
                    if ((!i || void 0 !== o) && !n(o, t)) throw Error(`Invalid param ${String(e)}=${o} (${typeof o}), expected ${r}`)
                };
                for (let [t, r] of Object.entries(e)) i(t, r, !1);
                for (let [t, e] of Object.entries(r)) i(t, e, !0);
                return t
            }
        },
        2552: function(t, e, r) {
            "use strict";
            r.d(e, {
                UN: function() {
                    return U
                }
            });
            var i = r(44815),
                n = r(75390),
                o = r(68104);
            let [s, u] = n.ZP.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(t => BigInt(t))), h = new Uint32Array(80), a = new Uint32Array(80);
            class l extends i.VR {
                constructor() {
                    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209
                }
                get() {
                    let {
                        Ah: t,
                        Al: e,
                        Bh: r,
                        Bl: i,
                        Ch: n,
                        Cl: o,
                        Dh: s,
                        Dl: u,
                        Eh: h,
                        El: a,
                        Fh: l,
                        Fl: f,
                        Gh: c,
                        Gl: d,
                        Hh: p,
                        Hl: m
                    } = this;
                    return [t, e, r, i, n, o, s, u, h, a, l, f, c, d, p, m]
                }
                set(t, e, r, i, n, o, s, u, h, a, l, f, c, d, p, m) {
                    this.Ah = 0 | t, this.Al = 0 | e, this.Bh = 0 | r, this.Bl = 0 | i, this.Ch = 0 | n, this.Cl = 0 | o, this.Dh = 0 | s, this.Dl = 0 | u, this.Eh = 0 | h, this.El = 0 | a, this.Fh = 0 | l, this.Fl = 0 | f, this.Gh = 0 | c, this.Gl = 0 | d, this.Hh = 0 | p, this.Hl = 0 | m
                }
                process(t, e) {
                    for (let r = 0; r < 16; r++, e += 4) h[r] = t.getUint32(e), a[r] = t.getUint32(e += 4);
                    for (let t = 16; t < 80; t++) {
                        let e = 0 | h[t - 15],
                            r = 0 | a[t - 15],
                            i = n.ZP.rotrSH(e, r, 1) ^ n.ZP.rotrSH(e, r, 8) ^ n.ZP.shrSH(e, r, 7),
                            o = n.ZP.rotrSL(e, r, 1) ^ n.ZP.rotrSL(e, r, 8) ^ n.ZP.shrSL(e, r, 7),
                            s = 0 | h[t - 2],
                            u = 0 | a[t - 2],
                            l = n.ZP.rotrSH(s, u, 19) ^ n.ZP.rotrBH(s, u, 61) ^ n.ZP.shrSH(s, u, 6),
                            f = n.ZP.rotrSL(s, u, 19) ^ n.ZP.rotrBL(s, u, 61) ^ n.ZP.shrSL(s, u, 6),
                            c = n.ZP.add4L(o, f, a[t - 7], a[t - 16]),
                            d = n.ZP.add4H(c, i, l, h[t - 7], h[t - 16]);
                        h[t] = 0 | d, a[t] = 0 | c
                    }
                    let {
                        Ah: r,
                        Al: i,
                        Bh: o,
                        Bl: l,
                        Ch: f,
                        Cl: c,
                        Dh: d,
                        Dl: p,
                        Eh: m,
                        El: g,
                        Fh: y,
                        Fl: v,
                        Gh: w,
                        Gl: b,
                        Hh: M,
                        Hl: E
                    } = this;
                    for (let t = 0; t < 80; t++) {
                        let e = n.ZP.rotrSH(m, g, 14) ^ n.ZP.rotrSH(m, g, 18) ^ n.ZP.rotrBH(m, g, 41),
                            x = n.ZP.rotrSL(m, g, 14) ^ n.ZP.rotrSL(m, g, 18) ^ n.ZP.rotrBL(m, g, 41),
                            _ = m & y ^ ~m & w,
                            B = g & v ^ ~g & b,
                            A = n.ZP.add5L(E, x, B, u[t], a[t]),
                            I = n.ZP.add5H(A, M, e, _, s[t], h[t]),
                            S = 0 | A,
                            k = n.ZP.rotrSH(r, i, 28) ^ n.ZP.rotrBH(r, i, 34) ^ n.ZP.rotrBH(r, i, 39),
                            O = n.ZP.rotrSL(r, i, 28) ^ n.ZP.rotrBL(r, i, 34) ^ n.ZP.rotrBL(r, i, 39),
                            L = r & o ^ r & f ^ o & f,
                            R = i & l ^ i & c ^ l & c;
                        M = 0 | w, E = 0 | b, w = 0 | y, b = 0 | v, y = 0 | m, v = 0 | g, ({
                            h: m,
                            l: g
                        } = n.ZP.add(0 | d, 0 | p, 0 | I, 0 | S)), d = 0 | f, p = 0 | c, f = 0 | o, c = 0 | l, o = 0 | r, l = 0 | i;
                        let U = n.ZP.add3L(S, O, R);
                        r = n.ZP.add3H(U, I, k, L), i = 0 | U
                    }({
                        h: r,
                        l: i
                    } = n.ZP.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | i)), ({
                        h: o,
                        l: l
                    } = n.ZP.add(0 | this.Bh, 0 | this.Bl, 0 | o, 0 | l)), ({
                        h: f,
                        l: c
                    } = n.ZP.add(0 | this.Ch, 0 | this.Cl, 0 | f, 0 | c)), ({
                        h: d,
                        l: p
                    } = n.ZP.add(0 | this.Dh, 0 | this.Dl, 0 | d, 0 | p)), ({
                        h: m,
                        l: g
                    } = n.ZP.add(0 | this.Eh, 0 | this.El, 0 | m, 0 | g)), ({
                        h: y,
                        l: v
                    } = n.ZP.add(0 | this.Fh, 0 | this.Fl, 0 | y, 0 | v)), ({
                        h: w,
                        l: b
                    } = n.ZP.add(0 | this.Gh, 0 | this.Gl, 0 | w, 0 | b)), ({
                        h: M,
                        l: E
                    } = n.ZP.add(0 | this.Hh, 0 | this.Hl, 0 | M, 0 | E)), this.set(r, i, o, l, f, c, d, p, m, g, y, v, w, b, M, E)
                }
                roundClean() {
                    h.fill(0), a.fill(0)
                }
                destroy() {
                    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
                }
            }
            let f = (0, o.hE)(() => new l);
            var c = r(53554),
                d = r(91678),
                p = r(65332); /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            let m = BigInt(0),
                g = BigInt(1),
                y = BigInt(2),
                v = BigInt(8),
                w = {
                    zip215: !0
                },
                b = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"),
                M = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752"),
                E = BigInt(0),
                x = BigInt(1),
                _ = BigInt(2),
                B = BigInt(5),
                A = BigInt(10),
                I = BigInt(20),
                S = BigInt(40),
                k = BigInt(80);

            function O(t, e) {
                let r = (0, c.wQ)(e * e * e, b),
                    i = function(t) {
                        let e = t * t % b * t % b,
                            r = (0, c.oA)(e, _, b) * e % b,
                            i = (0, c.oA)(r, x, b) * t % b,
                            n = (0, c.oA)(i, B, b) * i % b,
                            o = (0, c.oA)(n, A, b) * n % b,
                            s = (0, c.oA)(o, I, b) * o % b,
                            u = (0, c.oA)(s, S, b) * s % b,
                            h = (0, c.oA)(u, k, b) * u % b,
                            a = (0, c.oA)(h, k, b) * u % b,
                            l = (0, c.oA)(a, A, b) * n % b;
                        return {
                            pow_p_5_8: (0, c.oA)(l, _, b) * t % b,
                            b2: e
                        }
                    }(t * (0, c.wQ)(r * r * e, b)).pow_p_5_8,
                    n = (0, c.wQ)(t * r * i, b),
                    o = (0, c.wQ)(e * n * n, b),
                    s = n,
                    u = (0, c.wQ)(n * M, b),
                    h = o === t,
                    a = o === (0, c.wQ)(-t, b),
                    l = o === (0, c.wQ)(-t * M, b);
                return h && (n = s), (a || l) && (n = u), (0, c.Tu)(n, b) && (n = (0, c.wQ)(-n, b)), {
                    isValid: h || a,
                    value: n
                }
            }
            let L = (0, c.gN)(b, void 0, !0),
                R = {
                    a: BigInt(-1),
                    d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
                    Fp: L,
                    n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
                    h: BigInt(8),
                    Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
                    Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
                    hash: f,
                    randomBytes: o.O6,
                    adjustScalarBytes: function(t) {
                        return t[0] &= 248, t[31] &= 127, t[31] |= 64, t
                    },
                    uvRatio: O
                },
                U = function(t) {
                    let e = function(t) {
                            let e = (0, p.K)(t);
                            return d.FF(t, {
                                hash: "function",
                                a: "bigint",
                                d: "bigint",
                                randomBytes: "function"
                            }, {
                                adjustScalarBytes: "function",
                                domain: "function",
                                uvRatio: "function",
                                mapToCurve: "function"
                            }), Object.freeze({ ...e
                            })
                        }(t),
                        {
                            Fp: r,
                            n: i,
                            prehash: n,
                            hash: o,
                            randomBytes: s,
                            nByteLength: u,
                            h: h
                        } = e,
                        a = y << BigInt(8 * u) - g,
                        l = r.create,
                        f = e.uvRatio || ((t, e) => {
                            try {
                                return {
                                    isValid: !0,
                                    value: r.sqrt(t * r.inv(e))
                                }
                            } catch (t) {
                                return {
                                    isValid: !1,
                                    value: m
                                }
                            }
                        }),
                        b = e.adjustScalarBytes || (t => t),
                        M = e.domain || ((t, e, r) => {
                            if (e.length || r) throw Error("Contexts/pre-hash are not supported");
                            return t
                        }),
                        E = t => "bigint" == typeof t && m < t,
                        x = (t, e) => E(t) && E(e) && t < e,
                        _ = t => t === m || x(t, a);

                    function B(t, e) {
                        if (x(t, e)) return t;
                        throw Error(`Expected valid scalar < ${e}, got ${typeof t} ${t}`)
                    }

                    function A(t) {
                        return t === m ? t : B(t, i)
                    }
                    let I = new Map;

                    function S(t) {
                        if (!(t instanceof k)) throw Error("ExtendedPoint expected")
                    }
                    class k {
                        constructor(t, e, r, i) {
                            if (this.ex = t, this.ey = e, this.ez = r, this.et = i, !_(t)) throw Error("x required");
                            if (!_(e)) throw Error("y required");
                            if (!_(r)) throw Error("z required");
                            if (!_(i)) throw Error("t required")
                        }
                        get x() {
                            return this.toAffine().x
                        }
                        get y() {
                            return this.toAffine().y
                        }
                        static fromAffine(t) {
                            if (t instanceof k) throw Error("extended point not allowed");
                            let {
                                x: e,
                                y: r
                            } = t || {};
                            if (!_(e) || !_(r)) throw Error("invalid affine point");
                            return new k(e, r, g, l(e * r))
                        }
                        static normalizeZ(t) {
                            let e = r.invertBatch(t.map(t => t.ez));
                            return t.map((t, r) => t.toAffine(e[r])).map(k.fromAffine)
                        }
                        _setWindowSize(t) {
                            this._WINDOW_SIZE = t, I.delete(this)
                        }
                        assertValidity() {
                            let {
                                a: t,
                                d: r
                            } = e;
                            if (this.is0()) throw Error("bad point: ZERO");
                            let {
                                ex: i,
                                ey: n,
                                ez: o,
                                et: s
                            } = this, u = l(i * i), h = l(n * n), a = l(o * o), f = l(a * a), c = l(u * t);
                            if (l(a * l(c + h)) !== l(f + l(r * l(u * h)))) throw Error("bad point: equation left != right (1)");
                            if (l(i * n) !== l(o * s)) throw Error("bad point: equation left != right (2)")
                        }
                        equals(t) {
                            S(t);
                            let {
                                ex: e,
                                ey: r,
                                ez: i
                            } = this, {
                                ex: n,
                                ey: o,
                                ez: s
                            } = t, u = l(e * s), h = l(n * i), a = l(r * s), f = l(o * i);
                            return u === h && a === f
                        }
                        is0() {
                            return this.equals(k.ZERO)
                        }
                        negate() {
                            return new k(l(-this.ex), this.ey, this.ez, l(-this.et))
                        }
                        double() {
                            let {
                                a: t
                            } = e, {
                                ex: r,
                                ey: i,
                                ez: n
                            } = this, o = l(r * r), s = l(i * i), u = l(y * l(n * n)), h = l(t * o), a = r + i, f = l(l(a * a) - o - s), c = h + s, d = c - u, p = h - s, m = l(f * d), g = l(c * p), v = l(f * p);
                            return new k(m, g, l(d * c), v)
                        }
                        add(t) {
                            S(t);
                            let {
                                a: r,
                                d: i
                            } = e, {
                                ex: n,
                                ey: o,
                                ez: s,
                                et: u
                            } = this, {
                                ex: h,
                                ey: a,
                                ez: f,
                                et: c
                            } = t;
                            if (r === BigInt(-1)) {
                                let t = l((o - n) * (a + h)),
                                    e = l((o + n) * (a - h)),
                                    r = l(e - t);
                                if (r === m) return this.double();
                                let i = l(s * y * c),
                                    d = l(u * y * f),
                                    p = d + i,
                                    g = e + t,
                                    v = d - i,
                                    w = l(p * r),
                                    b = l(g * v),
                                    M = l(p * v);
                                return new k(w, b, l(r * g), M)
                            }
                            let d = l(n * h),
                                p = l(o * a),
                                g = l(u * i * c),
                                v = l(s * f),
                                w = l((n + o) * (h + a) - d - p),
                                b = v - g,
                                M = v + g,
                                E = l(p - r * d),
                                x = l(w * b),
                                _ = l(M * E),
                                B = l(w * E);
                            return new k(x, _, l(b * M), B)
                        }
                        subtract(t) {
                            return this.add(t.negate())
                        }
                        wNAF(t) {
                            return R.wNAFCached(this, I, t, k.normalizeZ)
                        }
                        multiply(t) {
                            let {
                                p: e,
                                f: r
                            } = this.wNAF(B(t, i));
                            return k.normalizeZ([e, r])[0]
                        }
                        multiplyUnsafe(t) {
                            let e = A(t);
                            return e === m ? L : this.equals(L) || e === g ? this : this.equals(O) ? this.wNAF(e).p : R.unsafeLadder(this, e)
                        }
                        isSmallOrder() {
                            return this.multiplyUnsafe(h).is0()
                        }
                        isTorsionFree() {
                            return R.unsafeLadder(this, i).is0()
                        }
                        toAffine(t) {
                            let {
                                ex: e,
                                ey: i,
                                ez: n
                            } = this, o = this.is0();
                            null == t && (t = o ? v : r.inv(n));
                            let s = l(e * t),
                                u = l(i * t),
                                h = l(n * t);
                            if (o) return {
                                x: m,
                                y: g
                            };
                            if (h !== g) throw Error("invZ was invalid");
                            return {
                                x: s,
                                y: u
                            }
                        }
                        clearCofactor() {
                            let {
                                h: t
                            } = e;
                            return t === g ? this : this.multiplyUnsafe(t)
                        }
                        static fromHex(t, i = !1) {
                            let {
                                d: n,
                                a: o
                            } = e, s = r.BYTES, u = (t = (0, d.ql)("pointHex", t, s)).slice(), h = t[s - 1];
                            u[s - 1] = -129 & h;
                            let c = d.ty(u);
                            c === m || (i ? B(c, a) : B(c, r.ORDER));
                            let p = l(c * c),
                                {
                                    isValid: y,
                                    value: v
                                } = f(l(p - g), l(n * p - o));
                            if (!y) throw Error("Point.fromHex: invalid y coordinate");
                            let w = (v & g) === g,
                                b = (128 & h) != 0;
                            if (!i && v === m && b) throw Error("Point.fromHex: x=0 and x_0=1");
                            return b !== w && (v = l(-v)), k.fromAffine({
                                x: v,
                                y: c
                            })
                        }
                        static fromPrivateKey(t) {
                            return P(t).point
                        }
                        toRawBytes() {
                            let {
                                x: t,
                                y: e
                            } = this.toAffine(), i = d.S5(e, r.BYTES);
                            return i[i.length - 1] |= t & g ? 128 : 0, i
                        }
                        toHex() {
                            return d.ci(this.toRawBytes())
                        }
                    }
                    k.BASE = new k(e.Gx, e.Gy, g, l(e.Gx * e.Gy)), k.ZERO = new k(m, g, g, m);
                    let {
                        BASE: O,
                        ZERO: L
                    } = k, R = (0, p.M)(k, 8 * u);

                    function U(t) {
                        var e;
                        return e = d.ty(t), (0, c.wQ)(e, i)
                    }

                    function P(t) {
                        t = (0, d.ql)("private key", t, u);
                        let e = (0, d.ql)("hashed private key", o(t), 2 * u),
                            r = b(e.slice(0, u)),
                            i = e.slice(u, 2 * u),
                            n = U(r),
                            s = O.multiply(n),
                            h = s.toRawBytes();
                        return {
                            head: r,
                            prefix: i,
                            scalar: n,
                            point: s,
                            pointBytes: h
                        }
                    }

                    function T(t = new Uint8Array, ...e) {
                        return U(o(M(d.eV(...e), (0, d.ql)("context", t), !!n)))
                    }
                    return O._setWindowSize(8), {
                        CURVE: e,
                        getPublicKey: function(t) {
                            return P(t).pointBytes
                        },
                        sign: function(t, e, o = {}) {
                            var s;
                            t = (0, d.ql)("message", t), n && (t = n(t));
                            let {
                                prefix: h,
                                scalar: a,
                                pointBytes: l
                            } = P(e), f = T(o.context, h, t), p = O.multiply(f).toRawBytes(), m = (s = f + T(o.context, p, l, t) * a, (0, c.wQ)(s, i));
                            A(m);
                            let g = d.eV(p, d.S5(m, r.BYTES));
                            return (0, d.ql)("result", g, 2 * u)
                        },
                        verify: function(t, e, i, o = w) {
                            let s, u, h;
                            let {
                                context: a,
                                zip215: l
                            } = o, f = r.BYTES;
                            t = (0, d.ql)("signature", t, 2 * f), e = (0, d.ql)("message", e), n && (e = n(e));
                            let c = d.ty(t.slice(f, 2 * f));
                            try {
                                s = k.fromHex(i, l), u = k.fromHex(t.slice(0, f), l), h = O.multiplyUnsafe(c)
                            } catch (t) {
                                return !1
                            }
                            if (!l && s.isSmallOrder()) return !1;
                            let p = T(a, u.toRawBytes(), s.toRawBytes(), e);
                            return u.add(s.multiplyUnsafe(p)).subtract(h).clearCofactor().equals(k.ZERO)
                        },
                        ExtendedPoint: k,
                        utils: {
                            getExtendedPublicKey: P,
                            randomPrivateKey: () => s(r.BYTES),
                            precompute: (t = 8, e = k.BASE) => (e._setWindowSize(t), e.multiply(BigInt(3)), e)
                        }
                    }
                }(R);
            ({ ...R
            });
            let P = (L.ORDER + BigInt(3)) / BigInt(8);

            function T(t) {
                if (!(t instanceof H)) throw Error("RistrettoPoint expected")
            }
            L.pow(_, P), L.sqrt(L.neg(L.ONE)), L.ORDER, BigInt(5), BigInt(8), BigInt(486662), (0, c.DV)(L, L.neg(BigInt(486664)));
            let N = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235"),
                j = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578"),
                q = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838"),
                C = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952"),
                Z = t => O(x, t),
                F = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
                z = t => U.CURVE.Fp.create(bytesToNumberLE(t) & F);

            function $(t) {
                let {
                    d: e
                } = U.CURVE, r = U.CURVE.Fp.ORDER, i = U.CURVE.Fp.create, n = i(null * t * t), o = i((n + x) * q), s = BigInt(-1), u = i((s - e * n) * i(n + e)), {
                    isValid: h,
                    value: a
                } = O(o, u), l = i(a * t);
                isNegativeLE(l, r) || (l = i(-l)), h || (a = l), h || (s = n);
                let f = i(s * (n - x) * C - u),
                    c = a * a,
                    d = i((a + a) * u),
                    p = i(f * N),
                    m = i(x - c),
                    g = i(x + c);
                return new U.ExtendedPoint(i(d * g), i(m * p), i(p * g), i(d * m))
            }
            class H {
                constructor(t) {
                    this.ep = t
                }
                static fromAffine(t) {
                    return new H(U.ExtendedPoint.fromAffine(t))
                }
                static hashToCurve(t) {
                    let e = $(z((t = ensureBytes("ristrettoHash", t, 64)).slice(0, 32))),
                        r = $(z(t.slice(32, 64)));
                    return new H(e.add(r))
                }
                static fromHex(t) {
                    t = ensureBytes("ristrettoHex", t, 32);
                    let {
                        a: e,
                        d: r
                    } = U.CURVE, i = U.CURVE.Fp.ORDER, n = U.CURVE.Fp.create, o = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint", s = z(t);
                    if (!equalBytes(numberToBytesLE(s, 32), t) || isNegativeLE(s, i)) throw Error(o);
                    let u = n(s * s),
                        h = n(x + e * u),
                        a = n(x - e * u),
                        l = n(h * h),
                        f = n(a * a),
                        c = n(e * r * l - f),
                        {
                            isValid: d,
                            value: p
                        } = Z(n(c * f)),
                        m = n(p * a),
                        g = n(p * m * c),
                        y = n((s + s) * m);
                    isNegativeLE(y, i) && (y = n(-y));
                    let v = n(h * g),
                        w = n(y * v);
                    if (!d || isNegativeLE(w, i) || v === E) throw Error(o);
                    return new H(new U.ExtendedPoint(y, v, x, w))
                }
                toRawBytes() {
                    let t, {
                            ex: e,
                            ey: r,
                            ez: i,
                            et: n
                        } = this.ep,
                        o = U.CURVE.Fp.ORDER,
                        s = U.CURVE.Fp.create,
                        u = s(s(i + r) * s(i - r)),
                        h = s(e * r),
                        a = s(h * h),
                        {
                            value: l
                        } = Z(s(u * a)),
                        f = s(l * u),
                        c = s(l * h),
                        d = s(f * c * n);
                    if (isNegativeLE(n * d, o)) {
                        let i = s(null * r),
                            n = s(null * e);
                        e = i, r = n, t = s(f * j)
                    } else t = c;
                    isNegativeLE(e * d, o) && (r = s(-r));
                    let p = s((i - r) * t);
                    return isNegativeLE(p, o) && (p = s(-p)), numberToBytesLE(p, 32)
                }
                toHex() {
                    return bytesToHex(this.toRawBytes())
                }
                toString() {
                    return this.toHex()
                }
                equals(t) {
                    T(t);
                    let {
                        ex: e,
                        ey: r
                    } = this.ep, {
                        ex: i,
                        ey: n
                    } = t.ep, o = U.CURVE.Fp.create, s = o(e * n) === o(r * i), u = o(r * n) === o(e * i);
                    return s || u
                }
                add(t) {
                    return T(t), new H(this.ep.add(t.ep))
                }
                subtract(t) {
                    return T(t), new H(this.ep.subtract(t.ep))
                }
                multiply(t) {
                    return new H(this.ep.multiply(t))
                }
                multiplyUnsafe(t) {
                    return new H(this.ep.multiplyUnsafe(t))
                }
                double() {
                    return new H(this.ep.double())
                }
                negate() {
                    return new H(this.ep.negate())
                }
            }
        },
        90666: function(t, e, r) {
            "use strict";
            r.d(e, {
                kA: function() {
                    return x
                }
            });
            var i = r(82404),
                n = r(53554),
                o = r(65376),
                s = r(68104);
            class u extends s.kb {
                constructor(t, e) {
                    super(), this.finished = !1, this.destroyed = !1, (0, o.vp)(t);
                    let r = (0, s.O0)(e);
                    if (this.iHash = t.create(), "function" != typeof this.iHash.update) throw Error("Expected instance of class which extends utils.Hash");
                    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
                    let i = this.blockLen,
                        n = new Uint8Array(i);
                    n.set(r.length > i ? t.create().update(r).digest() : r);
                    for (let t = 0; t < n.length; t++) n[t] ^= 54;
                    this.iHash.update(n), this.oHash = t.create();
                    for (let t = 0; t < n.length; t++) n[t] ^= 106;
                    this.oHash.update(n), n.fill(0)
                }
                update(t) {
                    return (0, o.Gg)(this), this.iHash.update(t), this
                }
                digestInto(t) {
                    (0, o.Gg)(this), (0, o.aI)(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy()
                }
                digest() {
                    let t = new Uint8Array(this.oHash.outputLen);
                    return this.digestInto(t), t
                }
                _cloneInto(t) {
                    t || (t = Object.create(Object.getPrototypeOf(this), {}));
                    let {
                        oHash: e,
                        iHash: r,
                        finished: i,
                        destroyed: n,
                        blockLen: o,
                        outputLen: s
                    } = this;
                    return t.finished = i, t.destroyed = n, t.blockLen = o, t.outputLen = s, t.oHash = e._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t
                }
                destroy() {
                    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
                }
            }
            let h = (t, e, r) => new u(t, e).update(r).digest();
            h.create = (t, e) => new u(t, e);
            var a = r(91678),
                l = r(65332);
            let {
                bytesToNumberBE: f,
                hexToBytes: c
            } = a, d = {
                Err: class extends Error {
                    constructor(t = "") {
                        super(t)
                    }
                },
                _parseInt(t) {
                    let {
                        Err: e
                    } = d;
                    if (t.length < 2 || 2 !== t[0]) throw new e("Invalid signature integer tag");
                    let r = t[1],
                        i = t.subarray(2, r + 2);
                    if (!r || i.length !== r) throw new e("Invalid signature integer: wrong length");
                    if (128 & i[0]) throw new e("Invalid signature integer: negative");
                    if (0 === i[0] && !(128 & i[1])) throw new e("Invalid signature integer: unnecessary leading zero");
                    return {
                        d: f(i),
                        l: t.subarray(r + 2)
                    }
                },
                toSig(t) {
                    let {
                        Err: e
                    } = d, r = "string" == typeof t ? c(t) : t;
                    a.gk(r);
                    let i = r.length;
                    if (i < 2 || 48 != r[0]) throw new e("Invalid signature tag");
                    if (r[1] !== i - 2) throw new e("Invalid signature: incorrect length");
                    let {
                        d: n,
                        l: o
                    } = d._parseInt(r.subarray(2)), {
                        d: s,
                        l: u
                    } = d._parseInt(o);
                    if (u.length) throw new e("Invalid signature: left bytes after parsing");
                    return {
                        r: n,
                        s
                    }
                },
                hexFromSig(t) {
                    let e = t => 8 & Number.parseInt(t[0], 16) ? "00" + t : t,
                        r = t => {
                            let e = t.toString(16);
                            return 1 & e.length ? `0${e}` : e
                        },
                        i = e(r(t.s)),
                        n = e(r(t.r)),
                        o = i.length / 2,
                        s = n.length / 2,
                        u = r(o),
                        h = r(s);
                    return `30${r(s+o+4)}02${h}${n}02${u}${i}`
                }
            }, p = BigInt(0), m = BigInt(1), g = (BigInt(2), BigInt(3));
            BigInt(4); /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
            let y = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
                v = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
                w = BigInt(1),
                b = BigInt(2),
                M = (t, e) => (t + e / b) / e,
                E = (0, n.gN)(y, void 0, void 0, {
                    sqrt: function(t) {
                        let e = BigInt(3),
                            r = BigInt(6),
                            i = BigInt(11),
                            o = BigInt(22),
                            s = BigInt(23),
                            u = BigInt(44),
                            h = BigInt(88),
                            a = t * t * t % y,
                            l = a * a * t % y,
                            f = (0, n.oA)(l, e, y) * l % y,
                            c = (0, n.oA)(f, e, y) * l % y,
                            d = (0, n.oA)(c, b, y) * a % y,
                            p = (0, n.oA)(d, i, y) * d % y,
                            m = (0, n.oA)(p, o, y) * p % y,
                            g = (0, n.oA)(m, u, y) * m % y,
                            v = (0, n.oA)(g, h, y) * g % y,
                            w = (0, n.oA)(v, u, y) * m % y,
                            M = (0, n.oA)(w, e, y) * l % y,
                            x = (0, n.oA)(M, s, y) * p % y,
                            _ = (0, n.oA)(x, r, y) * a % y,
                            B = (0, n.oA)(_, b, y);
                        if (!E.eql(E.sqr(B), t)) throw Error("Cannot find square root");
                        return B
                    }
                }),
                x = function(t, e) {
                    let r = e => (function(t) {
                        let e = function(t) {
                                let e = (0, l.K)(t);
                                return a.FF(e, {
                                    hash: "hash",
                                    hmac: "function",
                                    randomBytes: "function"
                                }, {
                                    bits2int: "function",
                                    bits2int_modN: "function",
                                    lowS: "boolean"
                                }), Object.freeze({
                                    lowS: !0,
                                    ...e
                                })
                            }(t),
                            {
                                Fp: r,
                                n: i
                            } = e,
                            o = r.BYTES + 1,
                            s = 2 * r.BYTES + 1;

                        function u(t) {
                            return n.wQ(t, i)
                        }

                        function h(t) {
                            return n.U_(t, i)
                        }
                        let {
                            ProjectivePoint: f,
                            normPrivateKeyToScalar: c,
                            weierstrassEquation: y,
                            isWithinCurveOrder: v
                        } = function(t) {
                            let e = /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function(t) {
                                    let e = (0, l.K)(t);
                                    a.FF(e, {
                                        a: "field",
                                        b: "field"
                                    }, {
                                        allowedPrivateKeyLengths: "array",
                                        wrapPrivateKey: "boolean",
                                        isTorsionFree: "function",
                                        clearCofactor: "function",
                                        allowInfinityPoint: "boolean",
                                        fromBytes: "function",
                                        toBytes: "function"
                                    });
                                    let {
                                        endo: r,
                                        Fp: i,
                                        a: n
                                    } = e;
                                    if (r) {
                                        if (!i.eql(n, i.ZERO)) throw Error("Endomorphism can only be defined for Koblitz curves that have a=0");
                                        if ("object" != typeof r || "bigint" != typeof r.beta || "function" != typeof r.splitScalar) throw Error("Expected endomorphism with beta: bigint and splitScalar: function")
                                    }
                                    return Object.freeze({ ...e
                                    })
                                }(t),
                                {
                                    Fp: r
                                } = e,
                                i = e.toBytes || ((t, e, i) => {
                                    let n = e.toAffine();
                                    return a.eV(Uint8Array.from([4]), r.toBytes(n.x), r.toBytes(n.y))
                                }),
                                o = e.fromBytes || (t => {
                                    let e = t.subarray(1);
                                    return {
                                        x: r.fromBytes(e.subarray(0, r.BYTES)),
                                        y: r.fromBytes(e.subarray(r.BYTES, 2 * r.BYTES))
                                    }
                                });

                            function s(t) {
                                let {
                                    a: i,
                                    b: n
                                } = e, o = r.sqr(t), s = r.mul(o, t);
                                return r.add(r.add(s, r.mul(t, i)), n)
                            }
                            if (!r.eql(r.sqr(e.Gy), s(e.Gx))) throw Error("bad generator point: equation left != right");

                            function u(t) {
                                return "bigint" == typeof t && p < t && t < e.n
                            }

                            function h(t) {
                                if (!u(t)) throw Error("Expected valid bigint: 0 < bigint < curve.n")
                            }

                            function f(t) {
                                let r;
                                let {
                                    allowedPrivateKeyLengths: i,
                                    nByteLength: o,
                                    wrapPrivateKey: s,
                                    n: u
                                } = e;
                                if (i && "bigint" != typeof t) {
                                    if (a._t(t) && (t = a.ci(t)), "string" != typeof t || !i.includes(t.length)) throw Error("Invalid key");
                                    t = t.padStart(2 * o, "0")
                                }
                                try {
                                    r = "bigint" == typeof t ? t : a.bytesToNumberBE((0, a.ql)("private key", t, o))
                                } catch (e) {
                                    throw Error(`private key must be ${o} bytes, hex or bigint, not ${typeof t}`)
                                }
                                return s && (r = n.wQ(r, u)), h(r), r
                            }
                            let c = new Map;

                            function d(t) {
                                if (!(t instanceof y)) throw Error("ProjectivePoint expected")
                            }
                            class y {
                                constructor(t, e, i) {
                                    if (this.px = t, this.py = e, this.pz = i, null == t || !r.isValid(t)) throw Error("x required");
                                    if (null == e || !r.isValid(e)) throw Error("y required");
                                    if (null == i || !r.isValid(i)) throw Error("z required")
                                }
                                static fromAffine(t) {
                                    let {
                                        x: e,
                                        y: i
                                    } = t || {};
                                    if (!t || !r.isValid(e) || !r.isValid(i)) throw Error("invalid affine point");
                                    if (t instanceof y) throw Error("projective point not allowed");
                                    let n = t => r.eql(t, r.ZERO);
                                    return n(e) && n(i) ? y.ZERO : new y(e, i, r.ONE)
                                }
                                get x() {
                                    return this.toAffine().x
                                }
                                get y() {
                                    return this.toAffine().y
                                }
                                static normalizeZ(t) {
                                    let e = r.invertBatch(t.map(t => t.pz));
                                    return t.map((t, r) => t.toAffine(e[r])).map(y.fromAffine)
                                }
                                static fromHex(t) {
                                    let e = y.fromAffine(o((0, a.ql)("pointHex", t)));
                                    return e.assertValidity(), e
                                }
                                static fromPrivateKey(t) {
                                    return y.BASE.multiply(f(t))
                                }
                                _setWindowSize(t) {
                                    this._WINDOW_SIZE = t, c.delete(this)
                                }
                                assertValidity() {
                                    if (this.is0()) {
                                        if (e.allowInfinityPoint && !r.is0(this.py)) return;
                                        throw Error("bad point: ZERO")
                                    }
                                    let {
                                        x: t,
                                        y: i
                                    } = this.toAffine();
                                    if (!r.isValid(t) || !r.isValid(i)) throw Error("bad point: x or y not FE");
                                    let n = r.sqr(i),
                                        o = s(t);
                                    if (!r.eql(n, o)) throw Error("bad point: equation left != right");
                                    if (!this.isTorsionFree()) throw Error("bad point: not in prime-order subgroup")
                                }
                                hasEvenY() {
                                    let {
                                        y: t
                                    } = this.toAffine();
                                    if (r.isOdd) return !r.isOdd(t);
                                    throw Error("Field doesn't support isOdd")
                                }
                                equals(t) {
                                    d(t);
                                    let {
                                        px: e,
                                        py: i,
                                        pz: n
                                    } = this, {
                                        px: o,
                                        py: s,
                                        pz: u
                                    } = t, h = r.eql(r.mul(e, u), r.mul(o, n)), a = r.eql(r.mul(i, u), r.mul(s, n));
                                    return h && a
                                }
                                negate() {
                                    return new y(this.px, r.neg(this.py), this.pz)
                                }
                                double() {
                                    let {
                                        a: t,
                                        b: i
                                    } = e, n = r.mul(i, g), {
                                        px: o,
                                        py: s,
                                        pz: u
                                    } = this, h = r.ZERO, a = r.ZERO, l = r.ZERO, f = r.mul(o, o), c = r.mul(s, s), d = r.mul(u, u), p = r.mul(o, s);
                                    return p = r.add(p, p), l = r.mul(o, u), l = r.add(l, l), h = r.mul(t, l), a = r.mul(n, d), a = r.add(h, a), h = r.sub(c, a), a = r.add(c, a), a = r.mul(h, a), h = r.mul(p, h), l = r.mul(n, l), d = r.mul(t, d), p = r.sub(f, d), p = r.mul(t, p), p = r.add(p, l), l = r.add(f, f), f = r.add(l, f), f = r.add(f, d), f = r.mul(f, p), a = r.add(a, f), d = r.mul(s, u), d = r.add(d, d), f = r.mul(d, p), h = r.sub(h, f), l = r.mul(d, c), l = r.add(l, l), new y(h, a, l = r.add(l, l))
                                }
                                add(t) {
                                    d(t);
                                    let {
                                        px: i,
                                        py: n,
                                        pz: o
                                    } = this, {
                                        px: s,
                                        py: u,
                                        pz: h
                                    } = t, a = r.ZERO, l = r.ZERO, f = r.ZERO, c = e.a, p = r.mul(e.b, g), m = r.mul(i, s), v = r.mul(n, u), w = r.mul(o, h), b = r.add(i, n), M = r.add(s, u);
                                    b = r.mul(b, M), M = r.add(m, v), b = r.sub(b, M), M = r.add(i, o);
                                    let E = r.add(s, h);
                                    return M = r.mul(M, E), E = r.add(m, w), M = r.sub(M, E), E = r.add(n, o), a = r.add(u, h), E = r.mul(E, a), a = r.add(v, w), E = r.sub(E, a), f = r.mul(c, M), a = r.mul(p, w), f = r.add(a, f), a = r.sub(v, f), f = r.add(v, f), l = r.mul(a, f), v = r.add(m, m), v = r.add(v, m), w = r.mul(c, w), M = r.mul(p, M), v = r.add(v, w), w = r.sub(m, w), w = r.mul(c, w), M = r.add(M, w), m = r.mul(v, M), l = r.add(l, m), m = r.mul(E, M), a = r.mul(b, a), a = r.sub(a, m), m = r.mul(b, v), f = r.mul(E, f), new y(a, l, f = r.add(f, m))
                                }
                                subtract(t) {
                                    return this.add(t.negate())
                                }
                                is0() {
                                    return this.equals(y.ZERO)
                                }
                                wNAF(t) {
                                    return w.wNAFCached(this, c, t, t => {
                                        let e = r.invertBatch(t.map(t => t.pz));
                                        return t.map((t, r) => t.toAffine(e[r])).map(y.fromAffine)
                                    })
                                }
                                multiplyUnsafe(t) {
                                    let i = y.ZERO;
                                    if (t === p) return i;
                                    if (h(t), t === m) return this;
                                    let {
                                        endo: n
                                    } = e;
                                    if (!n) return w.unsafeLadder(this, t);
                                    let {
                                        k1neg: o,
                                        k1: s,
                                        k2neg: u,
                                        k2: a
                                    } = n.splitScalar(t), l = i, f = i, c = this;
                                    for (; s > p || a > p;) s & m && (l = l.add(c)), a & m && (f = f.add(c)), c = c.double(), s >>= m, a >>= m;
                                    return o && (l = l.negate()), u && (f = f.negate()), f = new y(r.mul(f.px, n.beta), f.py, f.pz), l.add(f)
                                }
                                multiply(t) {
                                    let i, n;
                                    h(t);
                                    let {
                                        endo: o
                                    } = e;
                                    if (o) {
                                        let {
                                            k1neg: e,
                                            k1: s,
                                            k2neg: u,
                                            k2: h
                                        } = o.splitScalar(t), {
                                            p: a,
                                            f: l
                                        } = this.wNAF(s), {
                                            p: f,
                                            f: c
                                        } = this.wNAF(h);
                                        a = w.constTimeNegate(e, a), f = w.constTimeNegate(u, f), f = new y(r.mul(f.px, o.beta), f.py, f.pz), i = a.add(f), n = l.add(c)
                                    } else {
                                        let {
                                            p: e,
                                            f: r
                                        } = this.wNAF(t);
                                        i = e, n = r
                                    }
                                    return y.normalizeZ([i, n])[0]
                                }
                                multiplyAndAddUnsafe(t, e, r) {
                                    let i = y.BASE,
                                        n = (t, e) => e !== p && e !== m && t.equals(i) ? t.multiply(e) : t.multiplyUnsafe(e),
                                        o = n(this, e).add(n(t, r));
                                    return o.is0() ? void 0 : o
                                }
                                toAffine(t) {
                                    let {
                                        px: e,
                                        py: i,
                                        pz: n
                                    } = this, o = this.is0();
                                    null == t && (t = o ? r.ONE : r.inv(n));
                                    let s = r.mul(e, t),
                                        u = r.mul(i, t),
                                        h = r.mul(n, t);
                                    if (o) return {
                                        x: r.ZERO,
                                        y: r.ZERO
                                    };
                                    if (!r.eql(h, r.ONE)) throw Error("invZ was invalid");
                                    return {
                                        x: s,
                                        y: u
                                    }
                                }
                                isTorsionFree() {
                                    let {
                                        h: t,
                                        isTorsionFree: r
                                    } = e;
                                    if (t === m) return !0;
                                    if (r) return r(y, this);
                                    throw Error("isTorsionFree() has not been declared for the elliptic curve")
                                }
                                clearCofactor() {
                                    let {
                                        h: t,
                                        clearCofactor: r
                                    } = e;
                                    return t === m ? this : r ? r(y, this) : this.multiplyUnsafe(e.h)
                                }
                                toRawBytes(t = !0) {
                                    return this.assertValidity(), i(y, this, t)
                                }
                                toHex(t = !0) {
                                    return a.ci(this.toRawBytes(t))
                                }
                            }
                            y.BASE = new y(e.Gx, e.Gy, r.ONE), y.ZERO = new y(r.ZERO, r.ONE, r.ZERO);
                            let v = e.nBitLength,
                                w = (0, l.M)(y, e.endo ? Math.ceil(v / 2) : v);
                            return {
                                CURVE: e,
                                ProjectivePoint: y,
                                normPrivateKeyToScalar: f,
                                weierstrassEquation: s,
                                isWithinCurveOrder: u
                            }
                        }({ ...e,
                            toBytes(t, e, i) {
                                let n = e.toAffine(),
                                    o = r.toBytes(n.x),
                                    s = a.eV;
                                return i ? s(Uint8Array.from([e.hasEvenY() ? 2 : 3]), o) : s(Uint8Array.from([4]), o, r.toBytes(n.y))
                            },
                            fromBytes(t) {
                                let e = t.length,
                                    i = t[0],
                                    n = t.subarray(1);
                                if (e === o && (2 === i || 3 === i)) {
                                    let t;
                                    let e = a.bytesToNumberBE(n);
                                    if (!(p < e && e < r.ORDER)) throw Error("Point is not on curve");
                                    let o = y(e);
                                    try {
                                        t = r.sqrt(o)
                                    } catch (t) {
                                        throw Error("Point is not on curve" + (t instanceof Error ? ": " + t.message : ""))
                                    }
                                    return (1 & i) == 1 != ((t & m) === m) && (t = r.neg(t)), {
                                        x: e,
                                        y: t
                                    }
                                }
                                if (e === s && 4 === i) return {
                                    x: r.fromBytes(n.subarray(0, r.BYTES)),
                                    y: r.fromBytes(n.subarray(r.BYTES, 2 * r.BYTES))
                                };
                                throw Error(`Point of length ${e} was invalid. Expected ${o} compressed bytes or ${s} uncompressed bytes`)
                            }
                        }), w = t => a.ci(a.tL(t, e.nByteLength)), b = (t, e, r) => a.bytesToNumberBE(t.slice(e, r));
                        class M {
                            constructor(t, e, r) {
                                this.r = t, this.s = e, this.recovery = r, this.assertValidity()
                            }
                            static fromCompact(t) {
                                let r = e.nByteLength;
                                return new M(b(t = (0, a.ql)("compactSignature", t, 2 * r), 0, r), b(t, r, 2 * r))
                            }
                            static fromDER(t) {
                                let {
                                    r: e,
                                    s: r
                                } = d.toSig((0, a.ql)("DER", t));
                                return new M(e, r)
                            }
                            assertValidity() {
                                if (!v(this.r)) throw Error("r must be 0 < r < CURVE.n");
                                if (!v(this.s)) throw Error("s must be 0 < s < CURVE.n")
                            }
                            addRecoveryBit(t) {
                                return new M(this.r, this.s, t)
                            }
                            recoverPublicKey(t) {
                                let {
                                    r: i,
                                    s: n,
                                    recovery: o
                                } = this, s = _((0, a.ql)("msgHash", t));
                                if (null == o || ![0, 1, 2, 3].includes(o)) throw Error("recovery id invalid");
                                let l = 2 === o || 3 === o ? i + e.n : i;
                                if (l >= r.ORDER) throw Error("recovery id 2 or 3 invalid");
                                let c = (1 & o) == 0 ? "02" : "03",
                                    d = f.fromHex(c + w(l)),
                                    p = h(l),
                                    m = u(-s * p),
                                    g = u(n * p),
                                    y = f.BASE.multiplyAndAddUnsafe(d, m, g);
                                if (!y) throw Error("point at infinify");
                                return y.assertValidity(), y
                            }
                            hasHighS() {
                                return this.s > i >> m
                            }
                            normalizeS() {
                                return this.hasHighS() ? new M(this.r, u(-this.s), this.recovery) : this
                            }
                            toDERRawBytes() {
                                return a.hexToBytes(this.toDERHex())
                            }
                            toDERHex() {
                                return d.hexFromSig({
                                    r: this.r,
                                    s: this.s
                                })
                            }
                            toCompactRawBytes() {
                                return a.hexToBytes(this.toCompactHex())
                            }
                            toCompactHex() {
                                return w(this.r) + w(this.s)
                            }
                        }

                        function E(t) {
                            let e = a._t(t),
                                r = "string" == typeof t,
                                i = (e || r) && t.length;
                            return e ? i === o || i === s : r ? i === 2 * o || i === 2 * s : t instanceof f
                        }
                        let x = e.bits2int || function(t) {
                                let r = a.bytesToNumberBE(t),
                                    i = 8 * t.length - e.nBitLength;
                                return i > 0 ? r >> BigInt(i) : r
                            },
                            _ = e.bits2int_modN || function(t) {
                                return u(x(t))
                            },
                            B = a.dQ(e.nBitLength);

                        function A(t) {
                            if ("bigint" != typeof t) throw Error("bigint expected");
                            if (!(p <= t && t < B)) throw Error(`bigint expected < 2^${e.nBitLength}`);
                            return a.tL(t, e.nByteLength)
                        }
                        let I = {
                                lowS: e.lowS,
                                prehash: !1
                            },
                            S = {
                                lowS: e.lowS,
                                prehash: !1
                            };
                        return f.BASE._setWindowSize(8), {
                            CURVE: e,
                            getPublicKey: function(t, e = !0) {
                                return f.fromPrivateKey(t).toRawBytes(e)
                            },
                            getSharedSecret: function(t, e, r = !0) {
                                if (E(t)) throw Error("first arg must be private key");
                                if (!E(e)) throw Error("second arg must be public key");
                                return f.fromHex(e).multiply(c(t)).toRawBytes(r)
                            },
                            sign: function(t, n, o = I) {
                                let {
                                    seed: s,
                                    k2sig: l
                                } = function(t, n, o = I) {
                                    if (["recovered", "canonical"].some(t => t in o)) throw Error("sign() legacy options not supported");
                                    let {
                                        hash: s,
                                        randomBytes: l
                                    } = e, {
                                        lowS: d,
                                        prehash: g,
                                        extraEntropy: y
                                    } = o;
                                    null == d && (d = !0), t = (0, a.ql)("msgHash", t), g && (t = (0, a.ql)("prehashed msgHash", s(t)));
                                    let w = _(t),
                                        b = c(n),
                                        E = [A(b), A(w)];
                                    if (null != y && !1 !== y) {
                                        let t = !0 === y ? l(r.BYTES) : y;
                                        E.push((0, a.ql)("extraEntropy", t))
                                    }
                                    return {
                                        seed: a.eV(...E),
                                        k2sig: function(t) {
                                            let e = x(t);
                                            if (!v(e)) return;
                                            let r = h(e),
                                                n = f.BASE.multiply(e).toAffine(),
                                                o = u(n.x);
                                            if (o === p) return;
                                            let s = u(r * u(w + o * b));
                                            if (s === p) return;
                                            let a = (n.x === o ? 0 : 2) | Number(n.y & m),
                                                l = s;
                                            if (d && s > i >> m) l = s > i >> m ? u(-s) : s, a ^= 1;
                                            return new M(o, l, a)
                                        }
                                    }
                                }(t, n, o);
                                return a.n$(e.hash.outputLen, e.nByteLength, e.hmac)(s, l)
                            },
                            verify: function(t, r, i, n = S) {
                                let o, s;
                                if (r = (0, a.ql)("msgHash", r), i = (0, a.ql)("publicKey", i), "strict" in n) throw Error("options.strict was renamed to lowS");
                                let {
                                    lowS: l,
                                    prehash: c
                                } = n;
                                try {
                                    if ("string" == typeof t || a._t(t)) try {
                                        s = M.fromDER(t)
                                    } catch (e) {
                                        if (!(e instanceof d.Err)) throw e;
                                        s = M.fromCompact(t)
                                    } else if ("object" == typeof t && "bigint" == typeof t.r && "bigint" == typeof t.s) {
                                        let {
                                            r: e,
                                            s: r
                                        } = t;
                                        s = new M(e, r)
                                    } else throw Error("PARSE");
                                    o = f.fromHex(i)
                                } catch (t) {
                                    if ("PARSE" === t.message) throw Error("signature must be Signature instance, Uint8Array or hex string");
                                    return !1
                                }
                                if (l && s.hasHighS()) return !1;
                                c && (r = e.hash(r));
                                let {
                                    r: p,
                                    s: m
                                } = s, g = _(r), y = h(m), v = u(g * y), w = u(p * y), b = f.BASE.multiplyAndAddUnsafe(o, v, w) ? .toAffine();
                                return !!b && u(b.x) === p
                            },
                            ProjectivePoint: f,
                            Signature: M,
                            utils: {
                                isValidPrivateKey(t) {
                                    try {
                                        return c(t), !0
                                    } catch (t) {
                                        return !1
                                    }
                                },
                                normPrivateKeyToScalar: c,
                                randomPrivateKey: () => {
                                    let t = n.PS(e.n);
                                    return n.Us(e.randomBytes(t), e.n)
                                },
                                precompute: (t = 8, e = f.BASE) => (e._setWindowSize(t), e.multiply(BigInt(3)), e)
                            }
                        }
                    })({ ...t,
                        hash: e,
                        hmac: (t, ...r) => h(e, t, (0, s.eV)(...r)),
                        randomBytes: s.O6
                    });
                    return Object.freeze({ ...r(e),
                        create: r
                    })
                }({
                    a: BigInt(0),
                    b: BigInt(7),
                    Fp: E,
                    n: v,
                    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
                    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
                    h: BigInt(1),
                    lowS: !0,
                    endo: {
                        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
                        splitScalar: t => {
                            let e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
                                r = -w * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
                                i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
                                o = BigInt("0x100000000000000000000000000000000"),
                                s = M(e * t, v),
                                u = M(-r * t, v),
                                h = (0, n.wQ)(t - s * e - u * i, v),
                                a = (0, n.wQ)(-s * r - u * e, v),
                                l = h > o,
                                f = a > o;
                            if (l && (h = v - h), f && (a = v - a), h > o || a > o) throw Error("splitScalar: Endomorphism failed, k=" + t);
                            return {
                                k1neg: l,
                                k1: h,
                                k2neg: f,
                                k2: a
                            }
                        }
                    }
                }, i.J);
            BigInt(0), x.ProjectivePoint
        },
        65376: function(t, e, r) {
            "use strict";

            function i(t) {
                if (!Number.isSafeInteger(t) || t < 0) throw Error(`positive integer expected, not ${t}`)
            }

            function n(t, ...e) {
                if (!(t instanceof Uint8Array || null != t && "object" == typeof t && "Uint8Array" === t.constructor.name)) throw Error("Uint8Array expected");
                if (e.length > 0 && !e.includes(t.length)) throw Error(`Uint8Array expected of length ${e}, not of length=${t.length}`)
            }

            function o(t) {
                if ("function" != typeof t || "function" != typeof t.create) throw Error("Hash should be wrapped by utils.wrapConstructor");
                i(t.outputLen), i(t.blockLen)
            }

            function s(t, e = !0) {
                if (t.destroyed) throw Error("Hash instance has been destroyed");
                if (e && t.finished) throw Error("Hash#digest() has already been called")
            }

            function u(t, e) {
                n(t);
                let r = e.outputLen;
                if (t.length < r) throw Error(`digestInto() expects output buffer of length at least ${r}`)
            }
            r.d(e, {
                Gg: function() {
                    return s
                },
                J8: function() {
                    return u
                },
                Rx: function() {
                    return i
                },
                aI: function() {
                    return n
                },
                vp: function() {
                    return o
                }
            })
        },
        44815: function(t, e, r) {
            "use strict";
            r.d(e, {
                VR: function() {
                    return u
                },
                bc: function() {
                    return o
                },
                l3: function() {
                    return s
                }
            });
            var i = r(65376),
                n = r(68104);
            let o = (t, e, r) => t & e ^ ~t & r,
                s = (t, e, r) => t & e ^ t & r ^ e & r;
            class u extends n.kb {
                constructor(t, e, r, i) {
                    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = i, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = (0, n.GL)(this.buffer)
                }
                update(t) {
                    (0, i.Gg)(this);
                    let {
                        view: e,
                        buffer: r,
                        blockLen: o
                    } = this, s = (t = (0, n.O0)(t)).length;
                    for (let i = 0; i < s;) {
                        let u = Math.min(o - this.pos, s - i);
                        if (u === o) {
                            let e = (0, n.GL)(t);
                            for (; o <= s - i; i += o) this.process(e, i);
                            continue
                        }
                        r.set(t.subarray(i, i + u), this.pos), this.pos += u, i += u, this.pos === o && (this.process(e, 0), this.pos = 0)
                    }
                    return this.length += t.length, this.roundClean(), this
                }
                digestInto(t) {
                    (0, i.Gg)(this), (0, i.J8)(t, this), this.finished = !0;
                    let {
                        buffer: e,
                        view: r,
                        blockLen: o,
                        isLE: s
                    } = this, {
                        pos: u
                    } = this;
                    e[u++] = 128, this.buffer.subarray(u).fill(0), this.padOffset > o - u && (this.process(r, 0), u = 0);
                    for (let t = u; t < o; t++) e[t] = 0;
                    ! function(t, e, r, i) {
                        if ("function" == typeof t.setBigUint64) return t.setBigUint64(e, r, i);
                        let n = BigInt(32),
                            o = BigInt(4294967295),
                            s = Number(r >> n & o),
                            u = Number(r & o),
                            h = i ? 4 : 0,
                            a = i ? 0 : 4;
                        t.setUint32(e + h, s, i), t.setUint32(e + a, u, i)
                    }(r, o - 8, BigInt(8 * this.length), s), this.process(r, 0);
                    let h = (0, n.GL)(t),
                        a = this.outputLen;
                    if (a % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
                    let l = a / 4,
                        f = this.get();
                    if (l > f.length) throw Error("_sha2: outputLen bigger than state");
                    for (let t = 0; t < l; t++) h.setUint32(4 * t, f[t], s)
                }
                digest() {
                    let {
                        buffer: t,
                        outputLen: e
                    } = this;
                    this.digestInto(t);
                    let r = t.slice(0, e);
                    return this.destroy(), r
                }
                _cloneInto(t) {
                    t || (t = new this.constructor), t.set(...this.get());
                    let {
                        blockLen: e,
                        buffer: r,
                        length: i,
                        finished: n,
                        destroyed: o,
                        pos: s
                    } = this;
                    return t.length = i, t.pos = s, t.finished = n, t.destroyed = o, i % e && t.buffer.set(r), t
                }
            }
        },
        75390: function(t, e, r) {
            "use strict";
            r.d(e, {
                EP: function() {
                    return u
                },
                SD: function() {
                    return a
                },
                Vl: function() {
                    return s
                },
                gm: function() {
                    return h
                },
                mk: function() {
                    return l
                }
            });
            let i = BigInt(4294967296 - 1),
                n = BigInt(32);

            function o(t, e = !1) {
                return e ? {
                    h: Number(t & i),
                    l: Number(t >> n & i)
                } : {
                    h: 0 | Number(t >> n & i),
                    l: 0 | Number(t & i)
                }
            }

            function s(t, e = !1) {
                let r = new Uint32Array(t.length),
                    i = new Uint32Array(t.length);
                for (let n = 0; n < t.length; n++) {
                    let {
                        h: s,
                        l: u
                    } = o(t[n], e);
                    [r[n], i[n]] = [s, u]
                }
                return [r, i]
            }
            let u = (t, e, r) => t << r | e >>> 32 - r,
                h = (t, e, r) => e << r | t >>> 32 - r,
                a = (t, e, r) => e << r - 32 | t >>> 64 - r,
                l = (t, e, r) => t << r - 32 | e >>> 64 - r;
            e.ZP = {
                fromBig: o,
                split: s,
                toBig: (t, e) => BigInt(t >>> 0) << n | BigInt(e >>> 0),
                shrSH: (t, e, r) => t >>> r,
                shrSL: (t, e, r) => t << 32 - r | e >>> r,
                rotrSH: (t, e, r) => t >>> r | e << 32 - r,
                rotrSL: (t, e, r) => t << 32 - r | e >>> r,
                rotrBH: (t, e, r) => t << 64 - r | e >>> r - 32,
                rotrBL: (t, e, r) => t >>> r - 32 | e << 64 - r,
                rotr32H: (t, e) => e,
                rotr32L: (t, e) => t,
                rotlSH: u,
                rotlSL: h,
                rotlBH: a,
                rotlBL: l,
                add: function(t, e, r, i) {
                    let n = (e >>> 0) + (i >>> 0);
                    return {
                        h: t + r + (n / 4294967296 | 0) | 0,
                        l: 0 | n
                    }
                },
                add3L: (t, e, r) => (t >>> 0) + (e >>> 0) + (r >>> 0),
                add3H: (t, e, r, i) => e + r + i + (t / 4294967296 | 0) | 0,
                add4L: (t, e, r, i) => (t >>> 0) + (e >>> 0) + (r >>> 0) + (i >>> 0),
                add4H: (t, e, r, i, n) => e + r + i + n + (t / 4294967296 | 0) | 0,
                add5H: (t, e, r, i, n, o) => e + r + i + n + o + (t / 4294967296 | 0) | 0,
                add5L: (t, e, r, i, n) => (t >>> 0) + (e >>> 0) + (r >>> 0) + (i >>> 0) + (n >>> 0)
            }
        },
        82404: function(t, e, r) {
            "use strict";
            r.d(e, {
                J: function() {
                    return a
                }
            });
            var i = r(44815),
                n = r(68104);
            let o = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
                s = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
                u = new Uint32Array(64);
            class h extends i.VR {
                constructor() {
                    super(64, 32, 8, !1), this.A = 0 | s[0], this.B = 0 | s[1], this.C = 0 | s[2], this.D = 0 | s[3], this.E = 0 | s[4], this.F = 0 | s[5], this.G = 0 | s[6], this.H = 0 | s[7]
                }
                get() {
                    let {
                        A: t,
                        B: e,
                        C: r,
                        D: i,
                        E: n,
                        F: o,
                        G: s,
                        H: u
                    } = this;
                    return [t, e, r, i, n, o, s, u]
                }
                set(t, e, r, i, n, o, s, u) {
                    this.A = 0 | t, this.B = 0 | e, this.C = 0 | r, this.D = 0 | i, this.E = 0 | n, this.F = 0 | o, this.G = 0 | s, this.H = 0 | u
                }
                process(t, e) {
                    for (let r = 0; r < 16; r++, e += 4) u[r] = t.getUint32(e, !1);
                    for (let t = 16; t < 64; t++) {
                        let e = u[t - 15],
                            r = u[t - 2],
                            i = (0, n.np)(e, 7) ^ (0, n.np)(e, 18) ^ e >>> 3,
                            o = (0, n.np)(r, 17) ^ (0, n.np)(r, 19) ^ r >>> 10;
                        u[t] = o + u[t - 7] + i + u[t - 16] | 0
                    }
                    let {
                        A: r,
                        B: s,
                        C: h,
                        D: a,
                        E: l,
                        F: f,
                        G: c,
                        H: d
                    } = this;
                    for (let t = 0; t < 64; t++) {
                        let e = d + ((0, n.np)(l, 6) ^ (0, n.np)(l, 11) ^ (0, n.np)(l, 25)) + (0, i.bc)(l, f, c) + o[t] + u[t] | 0,
                            p = ((0, n.np)(r, 2) ^ (0, n.np)(r, 13) ^ (0, n.np)(r, 22)) + (0, i.l3)(r, s, h) | 0;
                        d = c, c = f, f = l, l = a + e | 0, a = h, h = s, s = r, r = e + p | 0
                    }
                    r = r + this.A | 0, s = s + this.B | 0, h = h + this.C | 0, a = a + this.D | 0, l = l + this.E | 0, f = f + this.F | 0, c = c + this.G | 0, d = d + this.H | 0, this.set(r, s, h, a, l, f, c, d)
                }
                roundClean() {
                    u.fill(0)
                }
                destroy() {
                    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
                }
            }
            let a = (0, n.hE)(() => new h)
        },
        35743: function(t, e, r) {
            "use strict";
            r.d(e, {
                fr: function() {
                    return b
                }
            });
            var i = r(65376),
                n = r(75390),
                o = r(68104);
            let s = [],
                u = [],
                h = [],
                a = BigInt(0),
                l = BigInt(1),
                f = BigInt(2),
                c = BigInt(7),
                d = BigInt(256),
                p = BigInt(113);
            for (let t = 0, e = l, r = 1, i = 0; t < 24; t++) {
                [r, i] = [i, (2 * r + 3 * i) % 5], s.push(2 * (5 * i + r)), u.push((t + 1) * (t + 2) / 2 % 64);
                let n = a;
                for (let t = 0; t < 7; t++)(e = (e << l ^ (e >> c) * p) % d) & f && (n ^= l << (l << BigInt(t)) - l);
                h.push(n)
            }
            let [m, g] = (0, n.Vl)(h, !0), y = (t, e, r) => r > 32 ? (0, n.SD)(t, e, r) : (0, n.EP)(t, e, r), v = (t, e, r) => r > 32 ? (0, n.mk)(t, e, r) : (0, n.gm)(t, e, r);
            class w extends o.kb {
                constructor(t, e, r, n = !1, s = 24) {
                    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = r, this.enableXOF = n, this.rounds = s, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, i.Rx)(r), 0 >= this.blockLen || this.blockLen >= 200) throw Error("Sha3 supports only keccak-f1600 function");
                    this.state = new Uint8Array(200), this.state32 = (0, o.Jq)(this.state)
                }
                keccak() {
                    o.iA || (0, o.l1)(this.state32),
                        function(t, e = 24) {
                            let r = new Uint32Array(10);
                            for (let i = 24 - e; i < 24; i++) {
                                for (let e = 0; e < 10; e++) r[e] = t[e] ^ t[e + 10] ^ t[e + 20] ^ t[e + 30] ^ t[e + 40];
                                for (let e = 0; e < 10; e += 2) {
                                    let i = (e + 8) % 10,
                                        n = (e + 2) % 10,
                                        o = r[n],
                                        s = r[n + 1],
                                        u = y(o, s, 1) ^ r[i],
                                        h = v(o, s, 1) ^ r[i + 1];
                                    for (let r = 0; r < 50; r += 10) t[e + r] ^= u, t[e + r + 1] ^= h
                                }
                                let e = t[2],
                                    n = t[3];
                                for (let r = 0; r < 24; r++) {
                                    let i = u[r],
                                        o = y(e, n, i),
                                        h = v(e, n, i),
                                        a = s[r];
                                    e = t[a], n = t[a + 1], t[a] = o, t[a + 1] = h
                                }
                                for (let e = 0; e < 50; e += 10) {
                                    for (let i = 0; i < 10; i++) r[i] = t[e + i];
                                    for (let i = 0; i < 10; i++) t[e + i] ^= ~r[(i + 2) % 10] & r[(i + 4) % 10]
                                }
                                t[0] ^= m[i], t[1] ^= g[i]
                            }
                            r.fill(0)
                        }(this.state32, this.rounds), o.iA || (0, o.l1)(this.state32), this.posOut = 0, this.pos = 0
                }
                update(t) {
                    (0, i.Gg)(this);
                    let {
                        blockLen: e,
                        state: r
                    } = this, n = (t = (0, o.O0)(t)).length;
                    for (let i = 0; i < n;) {
                        let o = Math.min(e - this.pos, n - i);
                        for (let e = 0; e < o; e++) r[this.pos++] ^= t[i++];
                        this.pos === e && this.keccak()
                    }
                    return this
                }
                finish() {
                    if (this.finished) return;
                    this.finished = !0;
                    let {
                        state: t,
                        suffix: e,
                        pos: r,
                        blockLen: i
                    } = this;
                    t[r] ^= e, (128 & e) != 0 && r === i - 1 && this.keccak(), t[i - 1] ^= 128, this.keccak()
                }
                writeInto(t) {
                    (0, i.Gg)(this, !1), (0, i.aI)(t), this.finish();
                    let e = this.state,
                        {
                            blockLen: r
                        } = this;
                    for (let i = 0, n = t.length; i < n;) {
                        this.posOut >= r && this.keccak();
                        let o = Math.min(r - this.posOut, n - i);
                        t.set(e.subarray(this.posOut, this.posOut + o), i), this.posOut += o, i += o
                    }
                    return t
                }
                xofInto(t) {
                    if (!this.enableXOF) throw Error("XOF is not possible for this instance");
                    return this.writeInto(t)
                }
                xof(t) {
                    return (0, i.Rx)(t), this.xofInto(new Uint8Array(t))
                }
                digestInto(t) {
                    if ((0, i.J8)(t, this), this.finished) throw Error("digest() was already called");
                    return this.writeInto(t), this.destroy(), t
                }
                digest() {
                    return this.digestInto(new Uint8Array(this.outputLen))
                }
                destroy() {
                    this.destroyed = !0, this.state.fill(0)
                }
                _cloneInto(t) {
                    let {
                        blockLen: e,
                        suffix: r,
                        outputLen: i,
                        rounds: n,
                        enableXOF: o
                    } = this;
                    return t || (t = new w(e, r, i, o, n)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = n, t.suffix = r, t.outputLen = i, t.enableXOF = o, t.destroyed = this.destroyed, t
                }
            }
            let b = (0, o.hE)(() => new w(136, 1, 32))
        },
        68104: function(t, e, r) {
            "use strict";
            r.d(e, {
                kb: function() {
                    return p
                },
                l1: function() {
                    return l
                },
                eV: function() {
                    return d
                },
                GL: function() {
                    return s
                },
                iA: function() {
                    return h
                },
                O6: function() {
                    return g
                },
                np: function() {
                    return u
                },
                O0: function() {
                    return c
                },
                Jq: function() {
                    return o
                },
                iY: function() {
                    return f
                },
                hE: function() {
                    return m
                }
            });
            let i = "object" == typeof globalThis && "crypto" in globalThis ? globalThis.crypto : void 0;
            var n = r(65376);
            let o = t => new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)),
                s = t => new DataView(t.buffer, t.byteOffset, t.byteLength),
                u = (t, e) => t << 32 - e | t >>> e,
                h = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0],
                a = t => t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;

            function l(t) {
                for (let e = 0; e < t.length; e++) t[e] = a(t[e])
            }

            function f(t) {
                if ("string" != typeof t) throw Error(`utf8ToBytes expected string, got ${typeof t}`);
                return new Uint8Array(new TextEncoder().encode(t))
            }

            function c(t) {
                return "string" == typeof t && (t = f(t)), (0, n.aI)(t), t
            }

            function d(...t) {
                let e = 0;
                for (let r = 0; r < t.length; r++) {
                    let i = t[r];
                    (0, n.aI)(i), e += i.length
                }
                let r = new Uint8Array(e);
                for (let e = 0, i = 0; e < t.length; e++) {
                    let n = t[e];
                    r.set(n, i), i += n.length
                }
                return r
            }
            class p {
                clone() {
                    return this._cloneInto()
                }
            }

            function m(t) {
                let e = e => t().update(c(e)).digest(),
                    r = t();
                return e.outputLen = r.outputLen, e.blockLen = r.blockLen, e.create = () => t(), e
            }

            function g(t = 32) {
                if (i && "function" == typeof i.getRandomValues) return i.getRandomValues(new Uint8Array(t));
                throw Error("crypto.getRandomValues must be defined")
            }
        },
        61811: function(t, e, r) {
            "use strict";
            r.d(e, {
                R: function() {
                    return o
                },
                h: function() {
                    return n
                }
            });
            var i = r(2265);
            let n = (0, i.createContext)({});

            function o() {
                return (0, i.useContext)(n)
            }
        },
        28782: function(t, e, r) {
            "use strict";
            r.d(e, {
                O: function() {
                    return h
                },
                z: function() {
                    return u
                }
            });
            var i = r(2265);
            let n = [],
                o = {
                    autoConnect: !1,
                    connecting: !1,
                    connected: !1,
                    disconnecting: !1,
                    select() {
                        s("call", "select")
                    },
                    connect: () => Promise.reject(s("call", "connect")),
                    disconnect: () => Promise.reject(s("call", "disconnect")),
                    sendTransaction: () => Promise.reject(s("call", "sendTransaction")),
                    signTransaction: () => Promise.reject(s("call", "signTransaction")),
                    signAllTransactions: () => Promise.reject(s("call", "signAllTransactions")),
                    signMessage: () => Promise.reject(s("call", "signMessage")),
                    signIn: () => Promise.reject(s("call", "signIn"))
                };

            function s(t, e) {
                let r = Error(`You have tried to ${t} "${e}" on a WalletContext without providing one. Make sure to render a WalletProvider as an ancestor of the component that uses WalletContext.`);
                return console.error(r), r
            }
            Object.defineProperty(o, "wallets", {
                get: () => (s("read", "wallets"), n)
            }), Object.defineProperty(o, "wallet", {
                get: () => (s("read", "wallet"), null)
            }), Object.defineProperty(o, "publicKey", {
                get: () => (s("read", "publicKey"), null)
            });
            let u = (0, i.createContext)(o);

            function h() {
                return (0, i.useContext)(u)
            }
        },
        37640: function(t, e, r) {
            "use strict";
            r.d(e, {
                J: function() {
                    return h
                },
                j: function() {
                    return u
                }
            });
            let i = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
                n = {
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
                    "&nbsp;": " ",
                    "&#160;": " ",
                    "&copy;": "\xa9",
                    "&#169;": "\xa9",
                    "&reg;": "\xae",
                    "&#174;": "\xae",
                    "&hellip;": "…",
                    "&#8230;": "…",
                    "&#x2F;": "/",
                    "&#47;": "/"
                },
                o = t => n[t],
                s = {
                    bindI18n: "languageChanged",
                    bindI18nStore: "",
                    transEmptyNodeValue: "",
                    transSupportBasicHtmlNodes: !0,
                    transWrapTextNodes: "",
                    transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
                    useSuspense: !0,
                    unescape: t => t.replace(i, o)
                };

            function u() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                s = { ...s,
                    ...t
                }
            }

            function h() {
                return s
            }
        },
        92096: function(t, e, r) {
            "use strict";
            let i;

            function n(t) {
                i = t
            }

            function o() {
                return i
            }
            r.d(e, {
                I: function() {
                    return n
                },
                n: function() {
                    return o
                }
            })
        },
        38093: function(t, e, r) {
            "use strict";
            r.d(e, {
                a3: function() {
                    return g
                },
                nI: function() {
                    return l.n
                },
                $G: function() {
                    return m
                }
            });
            var i = r(2265);
            r(71906), Object.create(null);
            let n = {};

            function o() {
                for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                "string" == typeof e[0] && n[e[0]] || ("string" == typeof e[0] && (n[e[0]] = new Date), function() {
                    if (console && console.warn) {
                        for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                        "string" == typeof e[0] && (e[0] = `react-i18next:: ${e[0]}`), console.warn(...e)
                    }
                }(...e))
            }
            let s = (t, e) => () => {
                if (t.isInitialized) e();
                else {
                    let r = () => {
                        setTimeout(() => {
                            t.off("initialized", r)
                        }, 0), e()
                    };
                    t.on("initialized", r)
                }
            };

            function u(t, e, r) {
                t.loadNamespaces(e, s(t, r))
            }

            function h(t, e, r, i) {
                "string" == typeof r && (r = [r]), r.forEach(e => {
                    0 > t.options.ns.indexOf(e) && t.options.ns.push(e)
                }), t.loadLanguages(e, s(t, i))
            }
            var a = r(37640),
                l = r(92096);
            r(42386);
            let f = (0, i.createContext)();
            class c {
                constructor() {
                    this.usedNamespaces = {}
                }
                addUsedNamespaces(t) {
                    t.forEach(t => {
                        this.usedNamespaces[t] || (this.usedNamespaces[t] = !0)
                    })
                }
                getUsedNamespaces() {
                    return Object.keys(this.usedNamespaces)
                }
            }
            let d = (t, e) => {
                let r = (0, i.useRef)();
                return (0, i.useEffect)(() => {
                    r.current = e ? r.current : t
                }, [t, e]), r.current
            };

            function p(t, e, r, i) {
                return t.getFixedT(e, r, i)
            }

            function m(t) {
                var e, r;
                let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    {
                        i18n: s
                    } = n,
                    {
                        i18n: m,
                        defaultNS: g
                    } = (0, i.useContext)(f) || {},
                    y = s || m || (0, l.n)();
                if (y && !y.reportNamespaces && (y.reportNamespaces = new c), !y) {
                    o("You will need to pass in an i18next instance by using initReactI18next");
                    let t = (t, e) => "string" == typeof e ? e : e && "object" == typeof e && "string" == typeof e.defaultValue ? e.defaultValue : Array.isArray(t) ? t[t.length - 1] : t,
                        e = [t, {}, !1];
                    return e.t = t, e.i18n = {}, e.ready = !1, e
                }
                y.options.react && void 0 !== y.options.react.wait && o("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
                let v = { ...(0, a.J)(),
                        ...y.options.react,
                        ...n
                    },
                    {
                        useSuspense: w,
                        keyPrefix: b
                    } = v,
                    M = t || g || y.options && y.options.defaultNS;
                M = "string" == typeof M ? [M] : M || ["translation"], y.reportNamespaces.addUsedNamespaces && y.reportNamespaces.addUsedNamespaces(M);
                let E = (y.isInitialized || y.initializedStoreOnce) && M.every(t => (function(t, e) {
                        let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        return e.languages && e.languages.length ? void 0 !== e.options.ignoreJSONStructure ? e.hasLoadedNamespace(t, {
                            lng: r.lng,
                            precheck: (e, i) => {
                                if (r.bindI18n && r.bindI18n.indexOf("languageChanging") > -1 && e.services.backendConnector.backend && e.isLanguageChangingTo && !i(e.isLanguageChangingTo, t)) return !1
                            }
                        }) : function(t, e) {
                            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                i = e.languages[0],
                                n = !!e.options && e.options.fallbackLng,
                                o = e.languages[e.languages.length - 1];
                            if ("cimode" === i.toLowerCase()) return !0;
                            let s = (t, r) => {
                                let i = e.services.backendConnector.state[`${t}|${r}`];
                                return -1 === i || 2 === i
                            };
                            return (!(r.bindI18n && r.bindI18n.indexOf("languageChanging") > -1) || !e.services.backendConnector.backend || !e.isLanguageChangingTo || !!s(e.isLanguageChangingTo, t)) && !!(e.hasResourceBundle(i, t) || !e.services.backendConnector.backend || e.options.resources && !e.options.partialBundledLanguages || s(i, t) && (!n || s(o, t)))
                        }(t, e, r) : (o("i18n.languages were undefined or empty", e.languages), !0)
                    })(t, y, v)),
                    x = (e = n.lng || null, r = "fallback" === v.nsMode ? M : M[0], (0, i.useCallback)(p(y, e, r, b), [y, e, r, b])),
                    _ = () => x,
                    B = () => p(y, n.lng || null, "fallback" === v.nsMode ? M : M[0], b),
                    [A, I] = (0, i.useState)(_),
                    S = M.join();
                n.lng && (S = `${n.lng}${S}`);
                let k = d(S),
                    O = (0, i.useRef)(!0);
                (0, i.useEffect)(() => {
                    let {
                        bindI18n: t,
                        bindI18nStore: e
                    } = v;

                    function r() {
                        O.current && I(B)
                    }
                    return O.current = !0, E || w || (n.lng ? h(y, n.lng, M, () => {
                        O.current && I(B)
                    }) : u(y, M, () => {
                        O.current && I(B)
                    })), E && k && k !== S && O.current && I(B), t && y && y.on(t, r), e && y && y.store.on(e, r), () => {
                        O.current = !1, t && y && t.split(" ").forEach(t => y.off(t, r)), e && y && e.split(" ").forEach(t => y.store.off(t, r))
                    }
                }, [y, S]), (0, i.useEffect)(() => {
                    O.current && E && I(_)
                }, [y, b, E]);
                let L = [A, y, E];
                if (L.t = A, L.i18n = y, L.ready = E, E || !E && !w) return L;
                throw new Promise(t => {
                    n.lng ? h(y, n.lng, M, () => t()) : u(y, M, () => t())
                })
            }

            function g(t) {
                let {
                    i18n: e,
                    defaultNS: r,
                    children: n
                } = t, o = (0, i.useMemo)(() => ({
                    i18n: e,
                    defaultNS: r
                }), [e, r]);
                return (0, i.createElement)(f.Provider, {
                    value: o
                }, n)
            }
        },
        42386: function(t, e, r) {
            "use strict";
            r.d(e, {
                D: function() {
                    return o
                }
            });
            var i = r(37640),
                n = r(92096);
            let o = {
                type: "3rdParty",
                init(t) {
                    (0, i.j)(t.options.react), (0, n.I)(t)
                }
            }
        },
        40524: function(t, e, r) {
            "use strict";
            r.d(e, {
                AG: function() {
                    return y
                },
                G0: function() {
                    return _
                },
                IM: function() {
                    return b
                },
                IX: function() {
                    return d
                },
                O7: function() {
                    return p
                },
                Rx: function() {
                    return v
                },
                Ue: function() {
                    return a
                },
                Yj: function() {
                    return c
                },
                Z_: function() {
                    return M
                },
                _4: function() {
                    return B
                },
                bc: function() {
                    return E
                },
                dt: function() {
                    return x
                },
                eE: function() {
                    return m
                },
                i0: function() {
                    return g
                },
                jt: function() {
                    return w
                },
                oQ: function() {
                    return A
                }
            });
            class i extends TypeError {
                constructor(t, e) {
                    let r;
                    let {
                        message: i,
                        ...n
                    } = t, {
                        path: o
                    } = t;
                    super(0 === o.length ? i : "At path: " + o.join(".") + " -- " + i), Object.assign(this, n), this.name = this.constructor.name, this.failures = () => {
                        var i;
                        return null != (i = r) ? i : r = [t, ...e()]
                    }
                }
            }

            function n(t) {
                return "object" == typeof t && null != t
            }

            function o(t) {
                return "string" == typeof t ? JSON.stringify(t) : "" + t
            }

            function* s(t, e, r, i) {
                var s;
                for (let u of (n(s = t) && "function" == typeof s[Symbol.iterator] || (t = [t]), t)) {
                    let t = function(t, e, r, i) {
                        if (!0 === t) return;
                        !1 === t ? t = {} : "string" == typeof t && (t = {
                            message: t
                        });
                        let {
                            path: n,
                            branch: s
                        } = e, {
                            type: u
                        } = r, {
                            refinement: h,
                            message: a = "Expected a value of type `" + u + "`" + (h ? " with refinement `" + h + "`" : "") + ", but received: `" + o(i) + "`"
                        } = t;
                        return {
                            value: i,
                            type: u,
                            refinement: h,
                            key: n[n.length - 1],
                            path: n,
                            branch: s,
                            ...t,
                            message: a
                        }
                    }(u, e, r, i);
                    t && (yield t)
                }
            }

            function* u(t, e, r = {}) {
                let {
                    path: i = [],
                    branch: o = [t],
                    coerce: s = !1,
                    mask: h = !1
                } = r, a = {
                    path: i,
                    branch: o
                };
                if (s && (t = e.coercer(t, a), h && "type" !== e.type && n(e.schema) && n(t) && !Array.isArray(t)))
                    for (let r in t) void 0 === e.schema[r] && delete t[r];
                let l = !0;
                for (let r of e.validator(t, a)) l = !1, yield [r, void 0];
                for (let [r, f, c] of e.entries(t, a))
                    for (let e of u(f, c, {
                            path: void 0 === r ? i : [...i, r],
                            branch: void 0 === r ? o : [...o, f],
                            coerce: s,
                            mask: h
                        })) e[0] ? (l = !1, yield [e[0], void 0]) : s && (f = e[1], void 0 === r ? t = f : t instanceof Map ? t.set(r, f) : t instanceof Set ? t.add(f) : n(t) && (t[r] = f));
                if (l)
                    for (let r of e.refiner(t, a)) l = !1, yield [r, void 0];
                l && (yield [void 0, t])
            }
            class h {
                constructor(t) {
                    let {
                        type: e,
                        schema: r,
                        validator: i,
                        refiner: n,
                        coercer: o = t => t,
                        entries: u = function*() {}
                    } = t;
                    this.type = e, this.schema = r, this.entries = u, this.coercer = o, i ? this.validator = (t, e) => s(i(t, e), e, this, t) : this.validator = () => [], n ? this.refiner = (t, e) => s(n(t, e), e, this, t) : this.refiner = () => []
                }
                assert(t) {
                    return function(t, e) {
                        let r = l(t, e);
                        if (r[0]) throw r[0]
                    }(t, this)
                }
                create(t) {
                    return a(t, this)
                }
                is(t) {
                    return !l(t, this)[0]
                }
                mask(t) {
                    return function(t, e) {
                        let r = l(t, e, {
                            coerce: !0,
                            mask: !0
                        });
                        if (!r[0]) return r[1];
                        throw r[0]
                    }(t, this)
                }
                validate(t, e = {}) {
                    return l(t, this, e)
                }
            }

            function a(t, e) {
                let r = l(t, e, {
                    coerce: !0
                });
                if (!r[0]) return r[1];
                throw r[0]
            }

            function l(t, e, r = {}) {
                let n = u(t, e, r),
                    o = function(t) {
                        let {
                            done: e,
                            value: r
                        } = t.next();
                        return e ? void 0 : r
                    }(n);
                return o[0] ? [new i(o[0], function*() {
                    for (let t of n) t[0] && (yield t[0])
                }), void 0] : [void 0, o[1]]
            }

            function f(t, e) {
                return new h({
                    type: t,
                    schema: null,
                    validator: e
                })
            }

            function c() {
                return f("any", () => !0)
            }

            function d(t) {
                return new h({
                    type: "array",
                    schema: t,
                    * entries(e) {
                        if (t && Array.isArray(e))
                            for (let [r, i] of e.entries()) yield [r, i, t]
                    },
                    coercer: t => Array.isArray(t) ? t.slice() : t,
                    validator: t => Array.isArray(t) || "Expected an array value, but received: " + o(t)
                })
            }

            function p() {
                return f("boolean", t => "boolean" == typeof t)
            }

            function m(t) {
                return f("instance", e => e instanceof t || "Expected a `" + t.name + "` instance, but received: " + o(e))
            }

            function g(t) {
                let e = o(t),
                    r = typeof t;
                return new h({
                    type: "literal",
                    schema: "string" === r || "number" === r || "boolean" === r ? t : null,
                    validator: r => r === t || "Expected the literal `" + e + "`, but received: " + o(r)
                })
            }

            function y(t) {
                return new h({ ...t,
                    validator: (e, r) => null === e || t.validator(e, r),
                    refiner: (e, r) => null === e || t.refiner(e, r)
                })
            }

            function v() {
                return f("number", t => "number" == typeof t && !isNaN(t) || "Expected a number, but received: " + o(t))
            }

            function w(t) {
                return new h({ ...t,
                    validator: (e, r) => void 0 === e || t.validator(e, r),
                    refiner: (e, r) => void 0 === e || t.refiner(e, r)
                })
            }

            function b(t, e) {
                return new h({
                    type: "record",
                    schema: null,
                    * entries(r) {
                        if (n(r))
                            for (let i in r) {
                                let n = r[i];
                                yield [i, i, t], yield [i, n, e]
                            }
                    },
                    validator: t => n(t) || "Expected an object, but received: " + o(t)
                })
            }

            function M() {
                return f("string", t => "string" == typeof t || "Expected a string, but received: " + o(t))
            }

            function E(t) {
                let e = f("never", () => !1);
                return new h({
                    type: "tuple",
                    schema: null,
                    * entries(r) {
                        if (Array.isArray(r)) {
                            let i = Math.max(t.length, r.length);
                            for (let n = 0; n < i; n++) yield [n, r[n], t[n] || e]
                        }
                    },
                    validator: t => Array.isArray(t) || "Expected an array, but received: " + o(t)
                })
            }

            function x(t) {
                let e = Object.keys(t);
                return new h({
                    type: "type",
                    schema: t,
                    * entries(r) {
                        if (n(r))
                            for (let i of e) yield [i, r[i], t[i]]
                    },
                    validator: t => n(t) || "Expected an object, but received: " + o(t)
                })
            }

            function _(t) {
                let e = t.map(t => t.type).join(" | ");
                return new h({
                    type: "union",
                    schema: null,
                    validator(r, i) {
                        let n = [];
                        for (let e of t) {
                            let [...t] = u(r, e, i), [o] = t;
                            if (!o[0]) return [];
                            for (let [e] of t) e && n.push(e)
                        }
                        return ["Expected the value to satisfy a union of `" + e + "`, but received: " + o(r), ...n]
                    }
                })
            }

            function B() {
                return f("unknown", () => !0)
            }

            function A(t, e, r) {
                return new h({ ...t,
                    coercer: (i, n) => l(i, e)[0] ? t.coercer(i, n) : t.coercer(r(i, n), n)
                })
            }
        }
    }
]);