"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [814], {
        45429: function(e, t, r) {
            let i;
            r.d(t, {
                BV: function() {
                    return eo
                },
                EC: function() {
                    return D
                },
                GS: function() {
                    return et
                },
                RG: function() {
                    return rt
                },
                RL: function() {
                    return F
                },
                Sl: function() {
                    return Y
                },
                Wf: function() {
                    return rk
                },
                YW: function() {
                    return ee
                },
                eT: function() {
                    return C
                },
                ew: function() {
                    return re
                },
                gw: function() {
                    return eB
                },
                nh: function() {
                    return W
                },
                v0: function() {
                    return H
                },
                yc: function() {
                    return em
                }
            });
            var s, n, o = r(9109),
                a = r(2552),
                c = r(66400),
                u = r.n(c),
                l = r(88443),
                d = r.n(l),
                h = r(82404),
                g = r(5810),
                p = r(24459),
                f = r(12653),
                m = r(40524),
                b = r(4531),
                y = r.n(b),
                k = r(97393),
                w = r(27418),
                S = r(35743),
                _ = r(90666);
            a.UN.utils.randomPrivateKey;
            let I = () => {
                    let e = a.UN.utils.randomPrivateKey(),
                        t = A(e),
                        r = new Uint8Array(64);
                    return r.set(e), r.set(t, 32), {
                        publicKey: t,
                        secretKey: r
                    }
                },
                A = a.UN.getPublicKey;

            function x(e) {
                try {
                    return a.UN.ExtendedPoint.fromHex(e), !0
                } catch {
                    return !1
                }
            }
            let v = (e, t) => a.UN.sign(e, t.slice(0, 32)),
                B = a.UN.verify,
                R = e => o.Buffer.isBuffer(e) ? e : e instanceof Uint8Array ? o.Buffer.from(e.buffer, e.byteOffset, e.byteLength) : o.Buffer.from(e);
            class P {
                constructor(e) {
                    Object.assign(this, e)
                }
                encode() {
                    return o.Buffer.from((0, g.serialize)(E, this))
                }
                static decode(e) {
                    return (0, g.deserialize)(E, this, e)
                }
                static decodeUnchecked(e) {
                    return (0, g.deserializeUnchecked)(E, this, e)
                }
            }
            let E = new Map,
                T = 1;
            i = Symbol.toStringTag;
            class W extends P {
                constructor(e) {
                    if (super({}), this._bn = void 0, void 0 !== e._bn) this._bn = e._bn;
                    else {
                        if ("string" == typeof e) {
                            let t = d().decode(e);
                            if (32 != t.length) throw Error("Invalid public key input");
                            this._bn = new(u())(t)
                        } else this._bn = new(u())(e);
                        if (this._bn.byteLength() > 32) throw Error("Invalid public key input")
                    }
                }
                static unique() {
                    let e = new W(T);
                    return T += 1, new W(e.toBuffer())
                }
                equals(e) {
                    return this._bn.eq(e._bn)
                }
                toBase58() {
                    return d().encode(this.toBytes())
                }
                toJSON() {
                    return this.toBase58()
                }
                toBytes() {
                    let e = this.toBuffer();
                    return new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
                }
                toBuffer() {
                    let e = this._bn.toArrayLike(o.Buffer);
                    if (32 === e.length) return e;
                    let t = o.Buffer.alloc(32);
                    return e.copy(t, 32 - e.length), t
                }
                get[i]() {
                    return `PublicKey(${this.toString()})`
                }
                toString() {
                    return this.toBase58()
                }
                static async createWithSeed(e, t, r) {
                    let i = o.Buffer.concat([e.toBuffer(), o.Buffer.from(t), r.toBuffer()]);
                    return new W((0, h.J)(i))
                }
                static createProgramAddressSync(e, t) {
                    let r = o.Buffer.alloc(0);
                    e.forEach(function(e) {
                        if (e.length > 32) throw TypeError("Max seed length exceeded");
                        r = o.Buffer.concat([r, R(e)])
                    }), r = o.Buffer.concat([r, t.toBuffer(), o.Buffer.from("ProgramDerivedAddress")]);
                    let i = (0, h.J)(r);
                    if (x(i)) throw Error("Invalid seeds, address must fall off the curve");
                    return new W(i)
                }
                static async createProgramAddress(e, t) {
                    return this.createProgramAddressSync(e, t)
                }
                static findProgramAddressSync(e, t) {
                    let r, i = 255;
                    for (; 0 != i;) {
                        try {
                            let s = e.concat(o.Buffer.from([i]));
                            r = this.createProgramAddressSync(s, t)
                        } catch (e) {
                            if (e instanceof TypeError) throw e;
                            i--;
                            continue
                        }
                        return [r, i]
                    }
                    throw Error("Unable to find a viable program address nonce")
                }
                static async findProgramAddress(e, t) {
                    return this.findProgramAddressSync(e, t)
                }
                static isOnCurve(e) {
                    return x(new W(e).toBytes())
                }
            }
            W.default = new W("11111111111111111111111111111111"), E.set(W, {
                kind: "struct",
                fields: [
                    ["_bn", "u256"]
                ]
            }), new W("BPFLoader1111111111111111111111111111111111");
            let C = 64;
            class q extends Error {
                constructor(e) {
                    super(`Signature ${e} has expired: block height exceeded.`), this.signature = void 0, this.signature = e
                }
            }
            Object.defineProperty(q.prototype, "name", {
                value: "TransactionExpiredBlockheightExceededError"
            });
            class U extends Error {
                constructor(e, t) {
                    super(`Transaction was not confirmed in ${t.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${e} using the Solana Explorer or CLI tools.`), this.signature = void 0, this.signature = e
                }
            }
            Object.defineProperty(U.prototype, "name", {
                value: "TransactionExpiredTimeoutError"
            });
            class L extends Error {
                constructor(e) {
                    super(`Signature ${e} has expired: the nonce is no longer valid.`), this.signature = void 0, this.signature = e
                }
            }
            Object.defineProperty(L.prototype, "name", {
                value: "TransactionExpiredNonceInvalidError"
            });
            class z {
                constructor(e, t) {
                    this.staticAccountKeys = void 0, this.accountKeysFromLookups = void 0, this.staticAccountKeys = e, this.accountKeysFromLookups = t
                }
                keySegments() {
                    let e = [this.staticAccountKeys];
                    return this.accountKeysFromLookups && (e.push(this.accountKeysFromLookups.writable), e.push(this.accountKeysFromLookups.readonly)), e
                }
                get(e) {
                    for (let t of this.keySegments()) {
                        if (e < t.length) return t[e];
                        e -= t.length
                    }
                }
                get length() {
                    return this.keySegments().flat().length
                }
                compileInstructions(e) {
                    if (this.length > 256) throw Error("Account index overflow encountered during compilation");
                    let t = new Map;
                    this.keySegments().flat().forEach((e, r) => {
                        t.set(e.toBase58(), r)
                    });
                    let r = e => {
                        let r = t.get(e.toBase58());
                        if (void 0 === r) throw Error("Encountered an unknown instruction account key during compilation");
                        return r
                    };
                    return e.map(e => ({
                        programIdIndex: r(e.programId),
                        accountKeyIndexes: e.keys.map(e => r(e.pubkey)),
                        data: e.data
                    }))
                }
            }
            let K = (e = "publicKey") => p.Ik(32, e),
                O = (e = "signature") => p.Ik(64, e),
                N = (e = "string") => {
                    let t = p.n_([p.Jq("length"), p.Jq("lengthPadding"), p.Ik(p.cv(p.Jq(), -8), "chars")], e),
                        r = t.decode.bind(t),
                        i = t.encode.bind(t);
                    return t.decode = (e, t) => r(e, t).chars.toString(), t.encode = (e, t, r) => i({
                        chars: o.Buffer.from(e, "utf8")
                    }, t, r), t.alloc = e => p.Jq().span + p.Jq().span + o.Buffer.from(e, "utf8").length, t
                };

            function G(e) {
                let t = 0,
                    r = 0;
                for (;;) {
                    let i = e.shift();
                    if (t |= (127 & i) << 7 * r, r += 1, (128 & i) == 0) break
                }
                return t
            }

            function j(e, t) {
                let r = t;
                for (;;) {
                    let t = 127 & r;
                    if (0 == (r >>= 7)) {
                        e.push(t);
                        break
                    }
                    t |= 128, e.push(t)
                }
            }

            function M(e, t) {
                if (!e) throw Error(t || "Assertion failed")
            }
            class J {
                constructor(e, t) {
                    this.payer = void 0, this.keyMetaMap = void 0, this.payer = e, this.keyMetaMap = t
                }
                static compile(e, t) {
                    let r = new Map,
                        i = e => {
                            let t = e.toBase58(),
                                i = r.get(t);
                            return void 0 === i && (i = {
                                isSigner: !1,
                                isWritable: !1,
                                isInvoked: !1
                            }, r.set(t, i)), i
                        },
                        s = i(t);
                    for (let t of (s.isSigner = !0, s.isWritable = !0, e))
                        for (let e of (i(t.programId).isInvoked = !0, t.keys)) {
                            let t = i(e.pubkey);
                            t.isSigner || = e.isSigner, t.isWritable || = e.isWritable
                        }
                    return new J(t, r)
                }
                getMessageComponents() {
                    let e = [...this.keyMetaMap.entries()];
                    M(e.length <= 256, "Max static account keys length exceeded");
                    let t = e.filter(([, e]) => e.isSigner && e.isWritable),
                        r = e.filter(([, e]) => e.isSigner && !e.isWritable),
                        i = e.filter(([, e]) => !e.isSigner && e.isWritable),
                        s = e.filter(([, e]) => !e.isSigner && !e.isWritable),
                        n = {
                            numRequiredSignatures: t.length + r.length,
                            numReadonlySignedAccounts: r.length,
                            numReadonlyUnsignedAccounts: s.length
                        }; {
                        M(t.length > 0, "Expected at least one writable signer key");
                        let [e] = t[0];
                        M(e === this.payer.toBase58(), "Expected first writable signer key to be the fee payer")
                    }
                    return [n, [...t.map(([e]) => new W(e)), ...r.map(([e]) => new W(e)), ...i.map(([e]) => new W(e)), ...s.map(([e]) => new W(e))]]
                }
                extractTableLookup(e) {
                    let [t, r] = this.drainKeysFoundInLookupTable(e.state.addresses, e => !e.isSigner && !e.isInvoked && e.isWritable), [i, s] = this.drainKeysFoundInLookupTable(e.state.addresses, e => !e.isSigner && !e.isInvoked && !e.isWritable);
                    if (0 !== t.length || 0 !== i.length) return [{
                        accountKey: e.key,
                        writableIndexes: t,
                        readonlyIndexes: i
                    }, {
                        writable: r,
                        readonly: s
                    }]
                }
                drainKeysFoundInLookupTable(e, t) {
                    let r = [],
                        i = [];
                    for (let [s, n] of this.keyMetaMap.entries())
                        if (t(n)) {
                            let t = new W(s),
                                n = e.findIndex(e => e.equals(t));
                            n >= 0 && (M(n < 256, "Max lookup table index exceeded"), r.push(n), i.push(t), this.keyMetaMap.delete(s))
                        }
                    return [r, i]
                }
            }
            let Z = "Reached end of buffer unexpectedly";

            function X(e) {
                if (0 === e.length) throw Error(Z);
                return e.shift()
            }

            function $(e, ...t) {
                let [r] = t;
                if (2 === t.length ? r + (t[1] ? ? 0) > e.length : r >= e.length) throw Error(Z);
                return e.splice(...t)
            }
            class H {
                constructor(e) {
                    this.header = void 0, this.accountKeys = void 0, this.recentBlockhash = void 0, this.instructions = void 0, this.indexToProgramIds = new Map, this.header = e.header, this.accountKeys = e.accountKeys.map(e => new W(e)), this.recentBlockhash = e.recentBlockhash, this.instructions = e.instructions, this.instructions.forEach(e => this.indexToProgramIds.set(e.programIdIndex, this.accountKeys[e.programIdIndex]))
                }
                get version() {
                    return "legacy"
                }
                get staticAccountKeys() {
                    return this.accountKeys
                }
                get compiledInstructions() {
                    return this.instructions.map(e => ({
                        programIdIndex: e.programIdIndex,
                        accountKeyIndexes: e.accounts,
                        data: d().decode(e.data)
                    }))
                }
                get addressTableLookups() {
                    return []
                }
                getAccountKeys() {
                    return new z(this.staticAccountKeys)
                }
                static compile(e) {
                    let [t, r] = J.compile(e.instructions, e.payerKey).getMessageComponents(), i = new z(r).compileInstructions(e.instructions).map(e => ({
                        programIdIndex: e.programIdIndex,
                        accounts: e.accountKeyIndexes,
                        data: d().encode(e.data)
                    }));
                    return new H({
                        header: t,
                        accountKeys: r,
                        recentBlockhash: e.recentBlockhash,
                        instructions: i
                    })
                }
                isAccountSigner(e) {
                    return e < this.header.numRequiredSignatures
                }
                isAccountWritable(e) {
                    let t = this.header.numRequiredSignatures;
                    if (!(e >= this.header.numRequiredSignatures)) return e < t - this.header.numReadonlySignedAccounts; {
                        let r = this.accountKeys.length - t - this.header.numReadonlyUnsignedAccounts;
                        return e - t < r
                    }
                }
                isProgramId(e) {
                    return this.indexToProgramIds.has(e)
                }
                programIds() {
                    return [...this.indexToProgramIds.values()]
                }
                nonProgramIds() {
                    return this.accountKeys.filter((e, t) => !this.isProgramId(t))
                }
                serialize() {
                    let e = this.accountKeys.length,
                        t = [];
                    j(t, e);
                    let r = this.instructions.map(e => {
                            let {
                                accounts: t,
                                programIdIndex: r
                            } = e, i = Array.from(d().decode(e.data)), s = [];
                            j(s, t.length);
                            let n = [];
                            return j(n, i.length), {
                                programIdIndex: r,
                                keyIndicesCount: o.Buffer.from(s),
                                keyIndices: t,
                                dataLength: o.Buffer.from(n),
                                data: i
                            }
                        }),
                        i = [];
                    j(i, r.length);
                    let s = o.Buffer.alloc(1232);
                    o.Buffer.from(i).copy(s);
                    let n = i.length;
                    r.forEach(e => {
                        let t = p.n_([p.u8("programIdIndex"), p.Ik(e.keyIndicesCount.length, "keyIndicesCount"), p.A9(p.u8("keyIndex"), e.keyIndices.length, "keyIndices"), p.Ik(e.dataLength.length, "dataLength"), p.A9(p.u8("userdatum"), e.data.length, "data")]).encode(e, s, n);
                        n += t
                    }), s = s.slice(0, n);
                    let a = p.n_([p.Ik(1, "numRequiredSignatures"), p.Ik(1, "numReadonlySignedAccounts"), p.Ik(1, "numReadonlyUnsignedAccounts"), p.Ik(t.length, "keyCount"), p.A9(K("key"), e, "keys"), K("recentBlockhash")]),
                        c = {
                            numRequiredSignatures: o.Buffer.from([this.header.numRequiredSignatures]),
                            numReadonlySignedAccounts: o.Buffer.from([this.header.numReadonlySignedAccounts]),
                            numReadonlyUnsignedAccounts: o.Buffer.from([this.header.numReadonlyUnsignedAccounts]),
                            keyCount: o.Buffer.from(t),
                            keys: this.accountKeys.map(e => R(e.toBytes())),
                            recentBlockhash: d().decode(this.recentBlockhash)
                        },
                        u = o.Buffer.alloc(2048),
                        l = a.encode(c, u);
                    return s.copy(u, l), u.slice(0, l + s.length)
                }
                static from(e) {
                    let t = [...e],
                        r = X(t);
                    if (r !== (127 & r)) throw Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");
                    let i = X(t),
                        s = X(t),
                        n = G(t),
                        a = [];
                    for (let e = 0; e < n; e++) {
                        let e = $(t, 0, 32);
                        a.push(new W(o.Buffer.from(e)))
                    }
                    let c = $(t, 0, 32),
                        u = G(t),
                        l = [];
                    for (let e = 0; e < u; e++) {
                        let e = X(t),
                            r = G(t),
                            i = $(t, 0, r),
                            s = G(t),
                            n = $(t, 0, s),
                            a = d().encode(o.Buffer.from(n));
                        l.push({
                            programIdIndex: e,
                            accounts: i,
                            data: a
                        })
                    }
                    return new H({
                        header: {
                            numRequiredSignatures: r,
                            numReadonlySignedAccounts: i,
                            numReadonlyUnsignedAccounts: s
                        },
                        recentBlockhash: d().encode(o.Buffer.from(c)),
                        accountKeys: a,
                        instructions: l
                    })
                }
            }
            class F {
                constructor(e) {
                    this.header = void 0, this.staticAccountKeys = void 0, this.recentBlockhash = void 0, this.compiledInstructions = void 0, this.addressTableLookups = void 0, this.header = e.header, this.staticAccountKeys = e.staticAccountKeys, this.recentBlockhash = e.recentBlockhash, this.compiledInstructions = e.compiledInstructions, this.addressTableLookups = e.addressTableLookups
                }
                get version() {
                    return 0
                }
                get numAccountKeysFromLookups() {
                    let e = 0;
                    for (let t of this.addressTableLookups) e += t.readonlyIndexes.length + t.writableIndexes.length;
                    return e
                }
                getAccountKeys(e) {
                    let t;
                    if (e && "accountKeysFromLookups" in e && e.accountKeysFromLookups) {
                        if (this.numAccountKeysFromLookups != e.accountKeysFromLookups.writable.length + e.accountKeysFromLookups.readonly.length) throw Error("Failed to get account keys because of a mismatch in the number of account keys from lookups");
                        t = e.accountKeysFromLookups
                    } else if (e && "addressLookupTableAccounts" in e && e.addressLookupTableAccounts) t = this.resolveAddressTableLookups(e.addressLookupTableAccounts);
                    else if (this.addressTableLookups.length > 0) throw Error("Failed to get account keys because address table lookups were not resolved");
                    return new z(this.staticAccountKeys, t)
                }
                isAccountSigner(e) {
                    return e < this.header.numRequiredSignatures
                }
                isAccountWritable(e) {
                    let t = this.header.numRequiredSignatures,
                        r = this.staticAccountKeys.length;
                    if (e >= r) return e - r < this.addressTableLookups.reduce((e, t) => e + t.writableIndexes.length, 0);
                    if (!(e >= this.header.numRequiredSignatures)) return e < t - this.header.numReadonlySignedAccounts; {
                        let i = r - t - this.header.numReadonlyUnsignedAccounts;
                        return e - t < i
                    }
                }
                resolveAddressTableLookups(e) {
                    let t = {
                        writable: [],
                        readonly: []
                    };
                    for (let r of this.addressTableLookups) {
                        let i = e.find(e => e.key.equals(r.accountKey));
                        if (!i) throw Error(`Failed to find address lookup table account for table key ${r.accountKey.toBase58()}`);
                        for (let e of r.writableIndexes)
                            if (e < i.state.addresses.length) t.writable.push(i.state.addresses[e]);
                            else throw Error(`Failed to find address for index ${e} in address lookup table ${r.accountKey.toBase58()}`);
                        for (let e of r.readonlyIndexes)
                            if (e < i.state.addresses.length) t.readonly.push(i.state.addresses[e]);
                            else throw Error(`Failed to find address for index ${e} in address lookup table ${r.accountKey.toBase58()}`)
                    }
                    return t
                }
                static compile(e) {
                    let t = J.compile(e.instructions, e.payerKey),
                        r = [],
                        i = {
                            writable: [],
                            readonly: []
                        };
                    for (let s of e.addressLookupTableAccounts || []) {
                        let e = t.extractTableLookup(s);
                        if (void 0 !== e) {
                            let [t, {
                                writable: s,
                                readonly: n
                            }] = e;
                            r.push(t), i.writable.push(...s), i.readonly.push(...n)
                        }
                    }
                    let [s, n] = t.getMessageComponents(), o = new z(n, i).compileInstructions(e.instructions);
                    return new F({
                        header: s,
                        staticAccountKeys: n,
                        recentBlockhash: e.recentBlockhash,
                        compiledInstructions: o,
                        addressTableLookups: r
                    })
                }
                serialize() {
                    let e = [];
                    j(e, this.staticAccountKeys.length);
                    let t = this.serializeInstructions(),
                        r = [];
                    j(r, this.compiledInstructions.length);
                    let i = this.serializeAddressTableLookups(),
                        s = [];
                    j(s, this.addressTableLookups.length);
                    let n = p.n_([p.u8("prefix"), p.n_([p.u8("numRequiredSignatures"), p.u8("numReadonlySignedAccounts"), p.u8("numReadonlyUnsignedAccounts")], "header"), p.Ik(e.length, "staticAccountKeysLength"), p.A9(K(), this.staticAccountKeys.length, "staticAccountKeys"), K("recentBlockhash"), p.Ik(r.length, "instructionsLength"), p.Ik(t.length, "serializedInstructions"), p.Ik(s.length, "addressTableLookupsLength"), p.Ik(i.length, "serializedAddressTableLookups")]),
                        o = new Uint8Array(1232),
                        a = n.encode({
                            prefix: 128,
                            header: this.header,
                            staticAccountKeysLength: new Uint8Array(e),
                            staticAccountKeys: this.staticAccountKeys.map(e => e.toBytes()),
                            recentBlockhash: d().decode(this.recentBlockhash),
                            instructionsLength: new Uint8Array(r),
                            serializedInstructions: t,
                            addressTableLookupsLength: new Uint8Array(s),
                            serializedAddressTableLookups: i
                        }, o);
                    return o.slice(0, a)
                }
                serializeInstructions() {
                    let e = 0,
                        t = new Uint8Array(1232);
                    for (let r of this.compiledInstructions) {
                        let i = [];
                        j(i, r.accountKeyIndexes.length);
                        let s = [];
                        j(s, r.data.length);
                        let n = p.n_([p.u8("programIdIndex"), p.Ik(i.length, "encodedAccountKeyIndexesLength"), p.A9(p.u8(), r.accountKeyIndexes.length, "accountKeyIndexes"), p.Ik(s.length, "encodedDataLength"), p.Ik(r.data.length, "data")]);
                        e += n.encode({
                            programIdIndex: r.programIdIndex,
                            encodedAccountKeyIndexesLength: new Uint8Array(i),
                            accountKeyIndexes: r.accountKeyIndexes,
                            encodedDataLength: new Uint8Array(s),
                            data: r.data
                        }, t, e)
                    }
                    return t.slice(0, e)
                }
                serializeAddressTableLookups() {
                    let e = 0,
                        t = new Uint8Array(1232);
                    for (let r of this.addressTableLookups) {
                        let i = [];
                        j(i, r.writableIndexes.length);
                        let s = [];
                        j(s, r.readonlyIndexes.length);
                        let n = p.n_([K("accountKey"), p.Ik(i.length, "encodedWritableIndexesLength"), p.A9(p.u8(), r.writableIndexes.length, "writableIndexes"), p.Ik(s.length, "encodedReadonlyIndexesLength"), p.A9(p.u8(), r.readonlyIndexes.length, "readonlyIndexes")]);
                        e += n.encode({
                            accountKey: r.accountKey.toBytes(),
                            encodedWritableIndexesLength: new Uint8Array(i),
                            writableIndexes: r.writableIndexes,
                            encodedReadonlyIndexesLength: new Uint8Array(s),
                            readonlyIndexes: r.readonlyIndexes
                        }, t, e)
                    }
                    return t.slice(0, e)
                }
                static deserialize(e) {
                    let t = [...e],
                        r = X(t),
                        i = 127 & r;
                    M(r !== i, "Expected versioned message but received legacy message"), M(0 === i, `Expected versioned message with version 0 but found version ${i}`);
                    let s = {
                            numRequiredSignatures: X(t),
                            numReadonlySignedAccounts: X(t),
                            numReadonlyUnsignedAccounts: X(t)
                        },
                        n = [],
                        o = G(t);
                    for (let e = 0; e < o; e++) n.push(new W($(t, 0, 32)));
                    let a = d().encode($(t, 0, 32)),
                        c = G(t),
                        u = [];
                    for (let e = 0; e < c; e++) {
                        let e = X(t),
                            r = G(t),
                            i = $(t, 0, r),
                            s = G(t),
                            n = new Uint8Array($(t, 0, s));
                        u.push({
                            programIdIndex: e,
                            accountKeyIndexes: i,
                            data: n
                        })
                    }
                    let l = G(t),
                        h = [];
                    for (let e = 0; e < l; e++) {
                        let e = new W($(t, 0, 32)),
                            r = G(t),
                            i = $(t, 0, r),
                            s = G(t),
                            n = $(t, 0, s);
                        h.push({
                            accountKey: e,
                            writableIndexes: i,
                            readonlyIndexes: n
                        })
                    }
                    return new F({
                        header: s,
                        staticAccountKeys: n,
                        recentBlockhash: a,
                        compiledInstructions: u,
                        addressTableLookups: h
                    })
                }
            }
            let D = {
                    deserializeMessageVersion(e) {
                        let t = e[0],
                            r = 127 & t;
                        return r === t ? "legacy" : r
                    },
                    deserialize: e => {
                        let t = D.deserializeMessageVersion(e);
                        if ("legacy" === t) return H.from(e);
                        if (0 === t) return F.deserialize(e);
                        throw Error(`Transaction message version ${t} deserialization is not supported`)
                    }
                },
                V = ((s = {})[s.BLOCKHEIGHT_EXCEEDED = 0] = "BLOCKHEIGHT_EXCEEDED", s[s.PROCESSED = 1] = "PROCESSED", s[s.TIMED_OUT = 2] = "TIMED_OUT", s[s.NONCE_INVALID = 3] = "NONCE_INVALID", s),
                Q = o.Buffer.alloc(C).fill(0);
            class Y {
                constructor(e) {
                    this.keys = void 0, this.programId = void 0, this.data = o.Buffer.alloc(0), this.programId = e.programId, this.keys = e.keys, e.data && (this.data = e.data)
                }
                toJSON() {
                    return {
                        keys: this.keys.map(({
                            pubkey: e,
                            isSigner: t,
                            isWritable: r
                        }) => ({
                            pubkey: e.toJSON(),
                            isSigner: t,
                            isWritable: r
                        })),
                        programId: this.programId.toJSON(),
                        data: [...this.data]
                    }
                }
            }
            class ee {
                get signature() {
                    return this.signatures.length > 0 ? this.signatures[0].signature : null
                }
                constructor(e) {
                    if (this.signatures = [], this.feePayer = void 0, this.instructions = [], this.recentBlockhash = void 0, this.lastValidBlockHeight = void 0, this.nonceInfo = void 0, this.minNonceContextSlot = void 0, this._message = void 0, this._json = void 0, !e) return;
                    if (e.feePayer && (this.feePayer = e.feePayer), e.signatures && (this.signatures = e.signatures), Object.prototype.hasOwnProperty.call(e, "nonceInfo")) {
                        let {
                            minContextSlot: t,
                            nonceInfo: r
                        } = e;
                        this.minNonceContextSlot = t, this.nonceInfo = r
                    } else if (Object.prototype.hasOwnProperty.call(e, "lastValidBlockHeight")) {
                        let {
                            blockhash: t,
                            lastValidBlockHeight: r
                        } = e;
                        this.recentBlockhash = t, this.lastValidBlockHeight = r
                    } else {
                        let {
                            recentBlockhash: t,
                            nonceInfo: r
                        } = e;
                        r && (this.nonceInfo = r), this.recentBlockhash = t
                    }
                }
                toJSON() {
                    return {
                        recentBlockhash: this.recentBlockhash || null,
                        feePayer: this.feePayer ? this.feePayer.toJSON() : null,
                        nonceInfo: this.nonceInfo ? {
                            nonce: this.nonceInfo.nonce,
                            nonceInstruction: this.nonceInfo.nonceInstruction.toJSON()
                        } : null,
                        instructions: this.instructions.map(e => e.toJSON()),
                        signers: this.signatures.map(({
                            publicKey: e
                        }) => e.toJSON())
                    }
                }
                add(...e) {
                    if (0 === e.length) throw Error("No instructions");
                    return e.forEach(e => {
                        "instructions" in e ? this.instructions = this.instructions.concat(e.instructions) : "data" in e && "programId" in e && "keys" in e ? this.instructions.push(e) : this.instructions.push(new Y(e))
                    }), this
                }
                compileMessage() {
                    let e, t, r;
                    if (this._message && JSON.stringify(this.toJSON()) === JSON.stringify(this._json)) return this._message;
                    if (this.nonceInfo ? (e = this.nonceInfo.nonce, t = this.instructions[0] != this.nonceInfo.nonceInstruction ? [this.nonceInfo.nonceInstruction, ...this.instructions] : this.instructions) : (e = this.recentBlockhash, t = this.instructions), !e) throw Error("Transaction recentBlockhash required");
                    if (t.length < 1 && console.warn("No instructions provided"), this.feePayer) r = this.feePayer;
                    else if (this.signatures.length > 0 && this.signatures[0].publicKey) r = this.signatures[0].publicKey;
                    else throw Error("Transaction fee payer required");
                    for (let e = 0; e < t.length; e++)
                        if (void 0 === t[e].programId) throw Error(`Transaction instruction index ${e} has undefined program id`);
                    let i = [],
                        s = [];
                    t.forEach(e => {
                        e.keys.forEach(e => {
                            s.push({ ...e
                            })
                        });
                        let t = e.programId.toString();
                        i.includes(t) || i.push(t)
                    }), i.forEach(e => {
                        s.push({
                            pubkey: new W(e),
                            isSigner: !1,
                            isWritable: !1
                        })
                    });
                    let n = [];
                    s.forEach(e => {
                        let t = e.pubkey.toString(),
                            r = n.findIndex(e => e.pubkey.toString() === t);
                        r > -1 ? (n[r].isWritable = n[r].isWritable || e.isWritable, n[r].isSigner = n[r].isSigner || e.isSigner) : n.push(e)
                    }), n.sort(function(e, t) {
                        return e.isSigner !== t.isSigner ? e.isSigner ? -1 : 1 : e.isWritable !== t.isWritable ? e.isWritable ? -1 : 1 : e.pubkey.toBase58().localeCompare(t.pubkey.toBase58(), "en", {
                            localeMatcher: "best fit",
                            usage: "sort",
                            sensitivity: "variant",
                            ignorePunctuation: !1,
                            numeric: !1,
                            caseFirst: "lower"
                        })
                    });
                    let o = n.findIndex(e => e.pubkey.equals(r));
                    if (o > -1) {
                        let [e] = n.splice(o, 1);
                        e.isSigner = !0, e.isWritable = !0, n.unshift(e)
                    } else n.unshift({
                        pubkey: r,
                        isSigner: !0,
                        isWritable: !0
                    });
                    for (let e of this.signatures) {
                        let t = n.findIndex(t => t.pubkey.equals(e.publicKey));
                        if (t > -1) n[t].isSigner || (n[t].isSigner = !0, console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."));
                        else throw Error(`unknown signer: ${e.publicKey.toString()}`)
                    }
                    let a = 0,
                        c = 0,
                        u = 0,
                        l = [],
                        h = [];
                    n.forEach(({
                        pubkey: e,
                        isSigner: t,
                        isWritable: r
                    }) => {
                        t ? (l.push(e.toString()), a += 1, r || (c += 1)) : (h.push(e.toString()), r || (u += 1))
                    });
                    let g = l.concat(h),
                        p = t.map(e => {
                            let {
                                data: t,
                                programId: r
                            } = e;
                            return {
                                programIdIndex: g.indexOf(r.toString()),
                                accounts: e.keys.map(e => g.indexOf(e.pubkey.toString())),
                                data: d().encode(t)
                            }
                        });
                    return p.forEach(e => {
                        M(e.programIdIndex >= 0), e.accounts.forEach(e => M(e >= 0))
                    }), new H({
                        header: {
                            numRequiredSignatures: a,
                            numReadonlySignedAccounts: c,
                            numReadonlyUnsignedAccounts: u
                        },
                        accountKeys: g,
                        recentBlockhash: e,
                        instructions: p
                    })
                }
                _compile() {
                    let e = this.compileMessage(),
                        t = e.accountKeys.slice(0, e.header.numRequiredSignatures);
                    return this.signatures.length === t.length && this.signatures.every((e, r) => t[r].equals(e.publicKey)) || (this.signatures = t.map(e => ({
                        signature: null,
                        publicKey: e
                    }))), e
                }
                serializeMessage() {
                    return this._compile().serialize()
                }
                async getEstimatedFee(e) {
                    return (await e.getFeeForMessage(this.compileMessage())).value
                }
                setSigners(...e) {
                    if (0 === e.length) throw Error("No signers");
                    let t = new Set;
                    this.signatures = e.filter(e => {
                        let r = e.toString();
                        return !t.has(r) && (t.add(r), !0)
                    }).map(e => ({
                        signature: null,
                        publicKey: e
                    }))
                }
                sign(...e) {
                    if (0 === e.length) throw Error("No signers");
                    let t = new Set,
                        r = [];
                    for (let i of e) {
                        let e = i.publicKey.toString();
                        t.has(e) || (t.add(e), r.push(i))
                    }
                    this.signatures = r.map(e => ({
                        signature: null,
                        publicKey: e.publicKey
                    }));
                    let i = this._compile();
                    this._partialSign(i, ...r)
                }
                partialSign(...e) {
                    if (0 === e.length) throw Error("No signers");
                    let t = new Set,
                        r = [];
                    for (let i of e) {
                        let e = i.publicKey.toString();
                        t.has(e) || (t.add(e), r.push(i))
                    }
                    let i = this._compile();
                    this._partialSign(i, ...r)
                }
                _partialSign(e, ...t) {
                    let r = e.serialize();
                    t.forEach(e => {
                        let t = v(r, e.secretKey);
                        this._addSignature(e.publicKey, R(t))
                    })
                }
                addSignature(e, t) {
                    this._compile(), this._addSignature(e, t)
                }
                _addSignature(e, t) {
                    M(64 === t.length);
                    let r = this.signatures.findIndex(t => e.equals(t.publicKey));
                    if (r < 0) throw Error(`unknown signer: ${e.toString()}`);
                    this.signatures[r].signature = o.Buffer.from(t)
                }
                verifySignatures(e = !0) {
                    return !this._getMessageSignednessErrors(this.serializeMessage(), e)
                }
                _getMessageSignednessErrors(e, t) {
                    let r = {};
                    for (let {
                            signature: i,
                            publicKey: s
                        } of this.signatures) null === i ? t && (r.missing || = []).push(s) : B(i, e, s.toBytes()) || (r.invalid || = []).push(s);
                    return r.invalid || r.missing ? r : void 0
                }
                serialize(e) {
                    let {
                        requireAllSignatures: t,
                        verifySignatures: r
                    } = Object.assign({
                        requireAllSignatures: !0,
                        verifySignatures: !0
                    }, e), i = this.serializeMessage();
                    if (r) {
                        let e = this._getMessageSignednessErrors(i, t);
                        if (e) {
                            let t = "Signature verification failed.";
                            throw e.invalid && (t += `
Invalid signature for public key${1===e.invalid.length?"":"(s)"} [\`${e.invalid.map(e=>e.toBase58()).join("`, `")}\`].`), e.missing && (t += `
Missing signature for public key${1===e.missing.length?"":"(s)"} [\`${e.missing.map(e=>e.toBase58()).join("`, `")}\`].`), Error(t)
                        }
                    }
                    return this._serialize(i)
                }
                _serialize(e) {
                    let {
                        signatures: t
                    } = this, r = [];
                    j(r, t.length);
                    let i = r.length + 64 * t.length + e.length,
                        s = o.Buffer.alloc(i);
                    return M(t.length < 256), o.Buffer.from(r).copy(s, 0), t.forEach(({
                        signature: e
                    }, t) => {
                        null !== e && (M(64 === e.length, "signature has invalid length"), o.Buffer.from(e).copy(s, r.length + 64 * t))
                    }), e.copy(s, r.length + 64 * t.length), M(s.length <= 1232, `Transaction too large: ${s.length} > 1232`), s
                }
                get keys() {
                    return M(1 === this.instructions.length), this.instructions[0].keys.map(e => e.pubkey)
                }
                get programId() {
                    return M(1 === this.instructions.length), this.instructions[0].programId
                }
                get data() {
                    return M(1 === this.instructions.length), this.instructions[0].data
                }
                static from(e) {
                    let t = [...e],
                        r = G(t),
                        i = [];
                    for (let e = 0; e < r; e++) {
                        let e = $(t, 0, C);
                        i.push(d().encode(o.Buffer.from(e)))
                    }
                    return ee.populate(H.from(t), i)
                }
                static populate(e, t = []) {
                    let r = new ee;
                    return r.recentBlockhash = e.recentBlockhash, e.header.numRequiredSignatures > 0 && (r.feePayer = e.accountKeys[0]), t.forEach((t, i) => {
                        let s = {
                            signature: t == d().encode(Q) ? null : d().decode(t),
                            publicKey: e.accountKeys[i]
                        };
                        r.signatures.push(s)
                    }), e.instructions.forEach(t => {
                        let i = t.accounts.map(t => {
                            let i = e.accountKeys[t];
                            return {
                                pubkey: i,
                                isSigner: r.signatures.some(e => e.publicKey.toString() === i.toString()) || e.isAccountSigner(t),
                                isWritable: e.isAccountWritable(t)
                            }
                        });
                        r.instructions.push(new Y({
                            keys: i,
                            programId: e.accountKeys[t.programIdIndex],
                            data: d().decode(t.data)
                        }))
                    }), r._message = e, r._json = r.toJSON(), r
                }
            }
            class et {
                get version() {
                    return this.message.version
                }
                constructor(e, t) {
                    if (this.signatures = void 0, this.message = void 0, void 0 !== t) M(t.length === e.header.numRequiredSignatures, "Expected signatures length to be equal to the number of required signatures"), this.signatures = t;
                    else {
                        let t = [];
                        for (let r = 0; r < e.header.numRequiredSignatures; r++) t.push(new Uint8Array(C));
                        this.signatures = t
                    }
                    this.message = e
                }
                serialize() {
                    let e = this.message.serialize(),
                        t = [];
                    j(t, this.signatures.length);
                    let r = p.n_([p.Ik(t.length, "encodedSignaturesLength"), p.A9(O(), this.signatures.length, "signatures"), p.Ik(e.length, "serializedMessage")]),
                        i = new Uint8Array(2048),
                        s = r.encode({
                            encodedSignaturesLength: new Uint8Array(t),
                            signatures: this.signatures,
                            serializedMessage: e
                        }, i);
                    return i.slice(0, s)
                }
                static deserialize(e) {
                    let t = [...e],
                        r = [],
                        i = G(t);
                    for (let e = 0; e < i; e++) r.push(new Uint8Array($(t, 0, C)));
                    return new et(D.deserialize(new Uint8Array(t)), r)
                }
                sign(e) {
                    let t = this.message.serialize(),
                        r = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures);
                    for (let i of e) {
                        let e = r.findIndex(e => e.equals(i.publicKey));
                        M(e >= 0, `Cannot sign with non signer key ${i.publicKey.toBase58()}`), this.signatures[e] = v(t, i.secretKey)
                    }
                }
                addSignature(e, t) {
                    M(64 === t.byteLength, "Signature must be 64 bytes long");
                    let r = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures).findIndex(t => t.equals(e));
                    M(r >= 0, `Can not add signature; \`${e.toBase58()}\` is not required to sign this transaction`), this.signatures[r] = t
                }
            }
            let er = new W("SysvarC1ock11111111111111111111111111111111");
            new W("SysvarEpochSchedu1e111111111111111111111111"), new W("Sysvar1nstructions1111111111111111111111111");
            let ei = new W("SysvarRecentB1ockHashes11111111111111111111"),
                es = new W("SysvarRent111111111111111111111111111111111");
            new W("SysvarRewards111111111111111111111111111111"), new W("SysvarS1otHashes111111111111111111111111111"), new W("SysvarS1otHistory11111111111111111111111111");
            let en = new W("SysvarStakeHistory1111111111111111111111111");
            async function eo(e, t, r, i) {
                let s;
                let n = i && {
                        skipPreflight: i.skipPreflight,
                        preflightCommitment: i.preflightCommitment || i.commitment,
                        maxRetries: i.maxRetries,
                        minContextSlot: i.minContextSlot
                    },
                    o = await e.sendTransaction(t, r, n);
                if (null != t.recentBlockhash && null != t.lastValidBlockHeight) s = (await e.confirmTransaction({
                    abortSignal: i ? .abortSignal,
                    signature: o,
                    blockhash: t.recentBlockhash,
                    lastValidBlockHeight: t.lastValidBlockHeight
                }, i && i.commitment)).value;
                else if (null != t.minNonceContextSlot && null != t.nonceInfo) {
                    let {
                        nonceInstruction: r
                    } = t.nonceInfo, n = r.keys[0].pubkey;
                    s = (await e.confirmTransaction({
                        abortSignal: i ? .abortSignal,
                        minContextSlot: t.minNonceContextSlot,
                        nonceAccountPubkey: n,
                        nonceValue: t.nonceInfo.nonce,
                        signature: o
                    }, i && i.commitment)).value
                } else i ? .abortSignal != null && console.warn("sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable."), s = (await e.confirmTransaction(o, i && i.commitment)).value;
                if (s.err) throw Error(`Transaction ${o} failed (${JSON.stringify(s)})`);
                return o
            }

            function ea(e) {
                return new Promise(t => setTimeout(t, e))
            }

            function ec(e, t) {
                let r = e.layout.span >= 0 ? e.layout.span : function e(t, r) {
                        let i = t => {
                                if (t.span >= 0) return t.span;
                                if ("function" == typeof t.alloc) return t.alloc(r[t.property]);
                                if ("count" in t && "elementLayout" in t) {
                                    let e = r[t.property];
                                    if (Array.isArray(e)) return e.length * i(t.elementLayout)
                                } else if ("fields" in t) return e({
                                    layout: t
                                }, r[t.property]);
                                return 0
                            },
                            s = 0;
                        return t.layout.fields.forEach(e => {
                            s += i(e)
                        }), s
                    }(e, t),
                    i = o.Buffer.alloc(r),
                    s = Object.assign({
                        instruction: e.index
                    }, t);
                return e.layout.encode(s, i), i
            }
            let eu = p._O("lamportsPerSignature"),
                el = p.n_([p.Jq("version"), p.Jq("state"), K("authorizedPubkey"), K("nonce"), p.n_([eu], "feeCalculator")]),
                ed = el.span;
            class eh {
                constructor(e) {
                    this.authorizedPubkey = void 0, this.nonce = void 0, this.feeCalculator = void 0, this.authorizedPubkey = e.authorizedPubkey, this.nonce = e.nonce, this.feeCalculator = e.feeCalculator
                }
                static fromAccountData(e) {
                    let t = el.decode(R(e), 0);
                    return new eh({
                        authorizedPubkey: new W(t.authorizedPubkey),
                        nonce: new W(t.nonce).toString(),
                        feeCalculator: t.feeCalculator
                    })
                }
            }
            let eg = e => ({
                    decode: e.decode.bind(e),
                    encode: e.encode.bind(e)
                }),
                ep = e => {
                    let t = (0, p.Ik)(8, e),
                        {
                            encode: r,
                            decode: i
                        } = eg(t);
                    return t.decode = (e, t) => {
                        let r = i(e, t);
                        return (0, f.oU)(o.Buffer.from(r))
                    }, t.encode = (e, t, i) => r((0, f.k$)(e, 8), t, i), t
                },
                ef = Object.freeze({
                    Create: {
                        index: 0,
                        layout: p.n_([p.Jq("instruction"), p.gM("lamports"), p.gM("space"), K("programId")])
                    },
                    Assign: {
                        index: 1,
                        layout: p.n_([p.Jq("instruction"), K("programId")])
                    },
                    Transfer: {
                        index: 2,
                        layout: p.n_([p.Jq("instruction"), ep("lamports")])
                    },
                    CreateWithSeed: {
                        index: 3,
                        layout: p.n_([p.Jq("instruction"), K("base"), N("seed"), p.gM("lamports"), p.gM("space"), K("programId")])
                    },
                    AdvanceNonceAccount: {
                        index: 4,
                        layout: p.n_([p.Jq("instruction")])
                    },
                    WithdrawNonceAccount: {
                        index: 5,
                        layout: p.n_([p.Jq("instruction"), p.gM("lamports")])
                    },
                    InitializeNonceAccount: {
                        index: 6,
                        layout: p.n_([p.Jq("instruction"), K("authorized")])
                    },
                    AuthorizeNonceAccount: {
                        index: 7,
                        layout: p.n_([p.Jq("instruction"), K("authorized")])
                    },
                    Allocate: {
                        index: 8,
                        layout: p.n_([p.Jq("instruction"), p.gM("space")])
                    },
                    AllocateWithSeed: {
                        index: 9,
                        layout: p.n_([p.Jq("instruction"), K("base"), N("seed"), p.gM("space"), K("programId")])
                    },
                    AssignWithSeed: {
                        index: 10,
                        layout: p.n_([p.Jq("instruction"), K("base"), N("seed"), K("programId")])
                    },
                    TransferWithSeed: {
                        index: 11,
                        layout: p.n_([p.Jq("instruction"), ep("lamports"), N("seed"), K("programId")])
                    },
                    UpgradeNonceAccount: {
                        index: 12,
                        layout: p.n_([p.Jq("instruction")])
                    }
                });
            class em {
                constructor() {}
                static createAccount(e) {
                    let t = ec(ef.Create, {
                        lamports: e.lamports,
                        space: e.space,
                        programId: R(e.programId.toBuffer())
                    });
                    return new Y({
                        keys: [{
                            pubkey: e.fromPubkey,
                            isSigner: !0,
                            isWritable: !0
                        }, {
                            pubkey: e.newAccountPubkey,
                            isSigner: !0,
                            isWritable: !0
                        }],
                        programId: this.programId,
                        data: t
                    })
                }
                static transfer(e) {
                    let t, r;
                    return "basePubkey" in e ? (t = ec(ef.TransferWithSeed, {
                        lamports: BigInt(e.lamports),
                        seed: e.seed,
                        programId: R(e.programId.toBuffer())
                    }), r = [{
                        pubkey: e.fromPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: e.basePubkey,
                        isSigner: !0,
                        isWritable: !1
                    }, {
                        pubkey: e.toPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }]) : (t = ec(ef.Transfer, {
                        lamports: BigInt(e.lamports)
                    }), r = [{
                        pubkey: e.fromPubkey,
                        isSigner: !0,
                        isWritable: !0
                    }, {
                        pubkey: e.toPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }]), new Y({
                        keys: r,
                        programId: this.programId,
                        data: t
                    })
                }
                static assign(e) {
                    let t, r;
                    return "basePubkey" in e ? (t = ec(ef.AssignWithSeed, {
                        base: R(e.basePubkey.toBuffer()),
                        seed: e.seed,
                        programId: R(e.programId.toBuffer())
                    }), r = [{
                        pubkey: e.accountPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: e.basePubkey,
                        isSigner: !0,
                        isWritable: !1
                    }]) : (t = ec(ef.Assign, {
                        programId: R(e.programId.toBuffer())
                    }), r = [{
                        pubkey: e.accountPubkey,
                        isSigner: !0,
                        isWritable: !0
                    }]), new Y({
                        keys: r,
                        programId: this.programId,
                        data: t
                    })
                }
                static createAccountWithSeed(e) {
                    let t = ec(ef.CreateWithSeed, {
                            base: R(e.basePubkey.toBuffer()),
                            seed: e.seed,
                            lamports: e.lamports,
                            space: e.space,
                            programId: R(e.programId.toBuffer())
                        }),
                        r = [{
                            pubkey: e.fromPubkey,
                            isSigner: !0,
                            isWritable: !0
                        }, {
                            pubkey: e.newAccountPubkey,
                            isSigner: !1,
                            isWritable: !0
                        }];
                    return e.basePubkey != e.fromPubkey && r.push({
                        pubkey: e.basePubkey,
                        isSigner: !0,
                        isWritable: !1
                    }), new Y({
                        keys: r,
                        programId: this.programId,
                        data: t
                    })
                }
                static createNonceAccount(e) {
                    let t = new ee;
                    "basePubkey" in e && "seed" in e ? t.add(em.createAccountWithSeed({
                        fromPubkey: e.fromPubkey,
                        newAccountPubkey: e.noncePubkey,
                        basePubkey: e.basePubkey,
                        seed: e.seed,
                        lamports: e.lamports,
                        space: ed,
                        programId: this.programId
                    })) : t.add(em.createAccount({
                        fromPubkey: e.fromPubkey,
                        newAccountPubkey: e.noncePubkey,
                        lamports: e.lamports,
                        space: ed,
                        programId: this.programId
                    }));
                    let r = {
                        noncePubkey: e.noncePubkey,
                        authorizedPubkey: e.authorizedPubkey
                    };
                    return t.add(this.nonceInitialize(r)), t
                }
                static nonceInitialize(e) {
                    let t = ec(ef.InitializeNonceAccount, {
                        authorized: R(e.authorizedPubkey.toBuffer())
                    });
                    return new Y({
                        keys: [{
                            pubkey: e.noncePubkey,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: ei,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: es,
                            isSigner: !1,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: t
                    })
                }
                static nonceAdvance(e) {
                    let t = ec(ef.AdvanceNonceAccount);
                    return new Y({
                        keys: [{
                            pubkey: e.noncePubkey,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: ei,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: e.authorizedPubkey,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: t
                    })
                }
                static nonceWithdraw(e) {
                    let t = ec(ef.WithdrawNonceAccount, {
                        lamports: e.lamports
                    });
                    return new Y({
                        keys: [{
                            pubkey: e.noncePubkey,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: e.toPubkey,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: ei,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: es,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: e.authorizedPubkey,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: t
                    })
                }
                static nonceAuthorize(e) {
                    let t = ec(ef.AuthorizeNonceAccount, {
                        authorized: R(e.newAuthorizedPubkey.toBuffer())
                    });
                    return new Y({
                        keys: [{
                            pubkey: e.noncePubkey,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: e.authorizedPubkey,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: t
                    })
                }
                static allocate(e) {
                    let t, r;
                    return "basePubkey" in e ? (t = ec(ef.AllocateWithSeed, {
                        base: R(e.basePubkey.toBuffer()),
                        seed: e.seed,
                        space: e.space,
                        programId: R(e.programId.toBuffer())
                    }), r = [{
                        pubkey: e.accountPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: e.basePubkey,
                        isSigner: !0,
                        isWritable: !1
                    }]) : (t = ec(ef.Allocate, {
                        space: e.space
                    }), r = [{
                        pubkey: e.accountPubkey,
                        isSigner: !0,
                        isWritable: !0
                    }]), new Y({
                        keys: r,
                        programId: this.programId,
                        data: t
                    })
                }
            }
            em.programId = new W("11111111111111111111111111111111");
            class eb {
                constructor() {}
                static getMinNumSignatures(e) {
                    return 2 * (Math.ceil(e / eb.chunkSize) + 1 + 1)
                }
                static async load(e, t, r, i, s) {
                    {
                        let n = await e.getMinimumBalanceForRentExemption(s.length),
                            o = await e.getAccountInfo(r.publicKey, "confirmed"),
                            a = null;
                        if (null !== o) {
                            if (o.executable) return console.error("Program load failed, account is already executable"), !1;
                            o.data.length !== s.length && (a = a || new ee).add(em.allocate({
                                accountPubkey: r.publicKey,
                                space: s.length
                            })), o.owner.equals(i) || (a = a || new ee).add(em.assign({
                                accountPubkey: r.publicKey,
                                programId: i
                            })), o.lamports < n && (a = a || new ee).add(em.transfer({
                                fromPubkey: t.publicKey,
                                toPubkey: r.publicKey,
                                lamports: n - o.lamports
                            }))
                        } else a = new ee().add(em.createAccount({
                            fromPubkey: t.publicKey,
                            newAccountPubkey: r.publicKey,
                            lamports: n > 0 ? n : 1,
                            space: s.length,
                            programId: i
                        }));
                        null !== a && await eo(e, a, [t, r], {
                            commitment: "confirmed"
                        })
                    }
                    let n = p.n_([p.Jq("instruction"), p.Jq("offset"), p.Jq("bytesLength"), p.Jq("bytesLengthPadding"), p.A9(p.u8("byte"), p.cv(p.Jq(), -8), "bytes")]),
                        a = eb.chunkSize,
                        c = 0,
                        u = s,
                        l = [];
                    for (; u.length > 0;) {
                        let s = u.slice(0, a),
                            d = o.Buffer.alloc(a + 16);
                        n.encode({
                            instruction: 0,
                            offset: c,
                            bytes: s,
                            bytesLength: 0,
                            bytesLengthPadding: 0
                        }, d);
                        let h = new ee().add({
                            keys: [{
                                pubkey: r.publicKey,
                                isSigner: !0,
                                isWritable: !0
                            }],
                            programId: i,
                            data: d
                        });
                        l.push(eo(e, h, [t, r], {
                            commitment: "confirmed"
                        })), e._rpcEndpoint.includes("solana.com") && await ea(250), c += a, u = u.slice(a)
                    }
                    await Promise.all(l); {
                        let s = p.n_([p.Jq("instruction")]),
                            n = o.Buffer.alloc(s.span);
                        s.encode({
                            instruction: 1
                        }, n);
                        let a = new ee().add({
                                keys: [{
                                    pubkey: r.publicKey,
                                    isSigner: !0,
                                    isWritable: !0
                                }, {
                                    pubkey: es,
                                    isSigner: !1,
                                    isWritable: !1
                                }],
                                programId: i,
                                data: n
                            }),
                            c = "processed",
                            u = await e.sendTransaction(a, [t, r], {
                                preflightCommitment: c
                            }),
                            {
                                context: l,
                                value: d
                            } = await e.confirmTransaction({
                                signature: u,
                                lastValidBlockHeight: a.lastValidBlockHeight,
                                blockhash: a.recentBlockhash
                            }, c);
                        if (d.err) throw Error(`Transaction ${u} failed (${JSON.stringify(d)})`);
                        for (;;) {
                            try {
                                if (await e.getSlot({
                                        commitment: c
                                    }) > l.slot) break
                            } catch {}
                            await new Promise(e => setTimeout(e, Math.round(200)))
                        }
                    }
                    return !0
                }
            }
            eb.chunkSize = 932, new W("BPFLoader2111111111111111111111111111111111");
            var ey = Object.prototype.toString,
                ek = Object.keys || function(e) {
                    var t = [];
                    for (var r in e) t.push(r);
                    return t
                },
                ew = (n = function(e) {
                    var t = function e(t, r) {
                        var i, s, n, o, a, c, u;
                        if (!0 === t) return "true";
                        if (!1 === t) return "false";
                        switch (typeof t) {
                            case "object":
                                if (null === t) return null;
                                if (t.toJSON && "function" == typeof t.toJSON) return e(t.toJSON(), r);
                                if ("[object Array]" === (u = ey.call(t))) {
                                    for (i = 0, n = "[", s = t.length - 1; i < s; i++) n += e(t[i], !0) + ",";
                                    return s > -1 && (n += e(t[i], !0)), n + "]"
                                }
                                if ("[object Object]" !== u) return JSON.stringify(t);
                                for (s = (o = ek(t).sort()).length, n = "", i = 0; i < s;) void 0 !== (c = e(t[a = o[i]], !1)) && (n && (n += ","), n += JSON.stringify(a) + ":" + c), i++;
                                return "{" + n + "}";
                            case "function":
                            case "undefined":
                                return r ? null : void 0;
                            case "string":
                                return JSON.stringify(t);
                            default:
                                return isFinite(t) ? t : null
                        }
                    }(e, !1);
                    if (void 0 !== t) return "" + t
                }).__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;

            function eS(e) {
                let t = 0;
                for (; e > 1;) e /= 2, t++;
                return t
            }
            class e_ {
                constructor(e, t, r, i, s) {
                    this.slotsPerEpoch = void 0, this.leaderScheduleSlotOffset = void 0, this.warmup = void 0, this.firstNormalEpoch = void 0, this.firstNormalSlot = void 0, this.slotsPerEpoch = e, this.leaderScheduleSlotOffset = t, this.warmup = r, this.firstNormalEpoch = i, this.firstNormalSlot = s
                }
                getEpoch(e) {
                    return this.getEpochAndSlotIndex(e)[0]
                }
                getEpochAndSlotIndex(e) {
                    if (e < this.firstNormalSlot) {
                        var t;
                        let r = eS(0 === (t = e + 32 + 1) ? 1 : (t--, t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, t |= t >> 16, (t |= t >> 32) + 1)) - eS(32) - 1,
                            i = this.getSlotsInEpoch(r);
                        return [r, e - (i - 32)]
                    } {
                        let t = e - this.firstNormalSlot,
                            r = Math.floor(t / this.slotsPerEpoch);
                        return [this.firstNormalEpoch + r, t % this.slotsPerEpoch]
                    }
                }
                getFirstSlotInEpoch(e) {
                    return e <= this.firstNormalEpoch ? (Math.pow(2, e) - 1) * 32 : (e - this.firstNormalEpoch) * this.slotsPerEpoch + this.firstNormalSlot
                }
                getLastSlotInEpoch(e) {
                    return this.getFirstSlotInEpoch(e) + this.getSlotsInEpoch(e) - 1
                }
                getSlotsInEpoch(e) {
                    return e < this.firstNormalEpoch ? Math.pow(2, e + eS(32)) : this.slotsPerEpoch
                }
            }
            class eI extends Error {
                constructor(e, t) {
                    super(e), this.logs = void 0, this.logs = t
                }
            }
            class eA extends Error {
                constructor({
                    code: e,
                    message: t,
                    data: r
                }, i) {
                    super(null != i ? `${i}: ${t}` : t), this.code = void 0, this.data = void 0, this.code = e, this.data = r, this.name = "SolanaJSONRPCError"
                }
            }
            var ex = globalThis.fetch;
            class ev extends k.Z {
                constructor(e, t, r) {
                    super(e => {
                        let r = (0, w.Z)(e, {
                            autoconnect: !0,
                            max_reconnects: 5,
                            reconnect: !0,
                            reconnect_interval: 1e3,
                            ...t
                        });
                        return "socket" in r ? this.underlyingSocket = r.socket : this.underlyingSocket = r, r
                    }, e, t, r), this.underlyingSocket = void 0
                }
                call(...e) {
                    let t = this.underlyingSocket ? .readyState;
                    return 1 === t ? super.call(...e) : Promise.reject(Error("Tried to call a JSON-RPC method `" + e[0] + "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " + t + ")"))
                }
                notify(...e) {
                    let t = this.underlyingSocket ? .readyState;
                    return 1 === t ? super.notify(...e) : Promise.reject(Error("Tried to send a JSON-RPC notification `" + e[0] + "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " + t + ")"))
                }
            }
            class eB {
                constructor(e) {
                    this.key = void 0, this.state = void 0, this.key = e.key, this.state = e.state
                }
                isActive() {
                    let e = BigInt("0xffffffffffffffff");
                    return this.state.deactivationSlot === e
                }
                static deserialize(e) {
                    let t = function(e, t) {
                            let r;
                            try {
                                r = e.layout.decode(t)
                            } catch (e) {
                                throw Error("invalid instruction; " + e)
                            }
                            if (r.typeIndex !== e.index) throw Error(`invalid account data; account type mismatch ${r.typeIndex} != ${e.index}`);
                            return r
                        }(eR, e),
                        r = e.length - 56;
                    M(r >= 0, "lookup table is invalid"), M(r % 32 == 0, "lookup table is invalid");
                    let {
                        addresses: i
                    } = p.n_([p.A9(K(), r / 32, "addresses")]).decode(e.slice(56));
                    return {
                        deactivationSlot: t.deactivationSlot,
                        lastExtendedSlot: t.lastExtendedSlot,
                        lastExtendedSlotStartIndex: t.lastExtendedStartIndex,
                        authority: 0 !== t.authority.length ? new W(t.authority[0]) : void 0,
                        addresses: i.map(e => new W(e))
                    }
                }
            }
            let eR = {
                    index: 1,
                    layout: p.n_([p.Jq("typeIndex"), ep("deactivationSlot"), p._O("lastExtendedSlot"), p.u8("lastExtendedStartIndex"), p.u8(), p.A9(K(), p.cv(p.u8(), -1), "authority")])
                },
                eP = /^[^:]+:\/\/([^:[]+|\[[^\]]+\])(:\d+)?(.*)/i,
                eE = (0, m.oQ)((0, m.eE)(W), (0, m.Z_)(), e => new W(e)),
                eT = (0, m.bc)([(0, m.Z_)(), (0, m.i0)("base64")]),
                eW = (0, m.oQ)((0, m.eE)(o.Buffer), eT, e => o.Buffer.from(e[0], "base64"));

            function eC(e) {
                let t, r;
                if ("string" == typeof e) t = e;
                else if (e) {
                    let {
                        commitment: i,
                        ...s
                    } = e;
                    t = i, r = s
                }
                return {
                    commitment: t,
                    config: r
                }
            }

            function eq(e) {
                return (0, m.G0)([(0, m.dt)({
                    jsonrpc: (0, m.i0)("2.0"),
                    id: (0, m.Z_)(),
                    result: e
                }), (0, m.dt)({
                    jsonrpc: (0, m.i0)("2.0"),
                    id: (0, m.Z_)(),
                    error: (0, m.dt)({
                        code: (0, m._4)(),
                        message: (0, m.Z_)(),
                        data: (0, m.jt)((0, m.Yj)())
                    })
                })])
            }
            let eU = eq((0, m._4)());

            function eL(e) {
                return (0, m.oQ)(eq(e), eU, t => "error" in t ? t : { ...t,
                    result: (0, m.Ue)(t.result, e)
                })
            }

            function ez(e) {
                return eL((0, m.dt)({
                    context: (0, m.dt)({
                        slot: (0, m.Rx)()
                    }),
                    value: e
                }))
            }

            function eK(e) {
                return (0, m.dt)({
                    context: (0, m.dt)({
                        slot: (0, m.Rx)()
                    }),
                    value: e
                })
            }

            function eO(e, t) {
                return 0 === e ? new F({
                    header: t.header,
                    staticAccountKeys: t.accountKeys.map(e => new W(e)),
                    recentBlockhash: t.recentBlockhash,
                    compiledInstructions: t.instructions.map(e => ({
                        programIdIndex: e.programIdIndex,
                        accountKeyIndexes: e.accounts,
                        data: d().decode(e.data)
                    })),
                    addressTableLookups: t.addressTableLookups
                }) : new H(t)
            }
            let eN = (0, m.dt)({
                    foundation: (0, m.Rx)(),
                    foundationTerm: (0, m.Rx)(),
                    initial: (0, m.Rx)(),
                    taper: (0, m.Rx)(),
                    terminal: (0, m.Rx)()
                }),
                eG = eL((0, m.IX)((0, m.AG)((0, m.dt)({
                    epoch: (0, m.Rx)(),
                    effectiveSlot: (0, m.Rx)(),
                    amount: (0, m.Rx)(),
                    postBalance: (0, m.Rx)(),
                    commission: (0, m.jt)((0, m.AG)((0, m.Rx)()))
                })))),
                ej = (0, m.IX)((0, m.dt)({
                    slot: (0, m.Rx)(),
                    prioritizationFee: (0, m.Rx)()
                })),
                eM = (0, m.dt)({
                    total: (0, m.Rx)(),
                    validator: (0, m.Rx)(),
                    foundation: (0, m.Rx)(),
                    epoch: (0, m.Rx)()
                }),
                eJ = (0, m.dt)({
                    epoch: (0, m.Rx)(),
                    slotIndex: (0, m.Rx)(),
                    slotsInEpoch: (0, m.Rx)(),
                    absoluteSlot: (0, m.Rx)(),
                    blockHeight: (0, m.jt)((0, m.Rx)()),
                    transactionCount: (0, m.jt)((0, m.Rx)())
                }),
                eZ = (0, m.dt)({
                    slotsPerEpoch: (0, m.Rx)(),
                    leaderScheduleSlotOffset: (0, m.Rx)(),
                    warmup: (0, m.O7)(),
                    firstNormalEpoch: (0, m.Rx)(),
                    firstNormalSlot: (0, m.Rx)()
                }),
                eX = (0, m.IM)((0, m.Z_)(), (0, m.IX)((0, m.Rx)())),
                e$ = (0, m.AG)((0, m.G0)([(0, m.dt)({}), (0, m.Z_)()])),
                eH = (0, m.dt)({
                    err: e$
                }),
                eF = (0, m.i0)("receivedSignature"),
                eD = (0, m.dt)({
                    "solana-core": (0, m.Z_)(),
                    "feature-set": (0, m.jt)((0, m.Rx)())
                }),
                eV = ez((0, m.dt)({
                    err: (0, m.AG)((0, m.G0)([(0, m.dt)({}), (0, m.Z_)()])),
                    logs: (0, m.AG)((0, m.IX)((0, m.Z_)())),
                    accounts: (0, m.jt)((0, m.AG)((0, m.IX)((0, m.AG)((0, m.dt)({
                        executable: (0, m.O7)(),
                        owner: (0, m.Z_)(),
                        lamports: (0, m.Rx)(),
                        data: (0, m.IX)((0, m.Z_)()),
                        rentEpoch: (0, m.jt)((0, m.Rx)())
                    }))))),
                    unitsConsumed: (0, m.jt)((0, m.Rx)()),
                    returnData: (0, m.jt)((0, m.AG)((0, m.dt)({
                        programId: (0, m.Z_)(),
                        data: (0, m.bc)([(0, m.Z_)(), (0, m.i0)("base64")])
                    })))
                })),
                eQ = ez((0, m.dt)({
                    byIdentity: (0, m.IM)((0, m.Z_)(), (0, m.IX)((0, m.Rx)())),
                    range: (0, m.dt)({
                        firstSlot: (0, m.Rx)(),
                        lastSlot: (0, m.Rx)()
                    })
                })),
                eY = eL(eN),
                e0 = eL(eM),
                e1 = eL(ej),
                e8 = eL(eJ),
                e2 = eL(eZ),
                e5 = eL(eX),
                e4 = eL((0, m.Rx)()),
                e6 = ez((0, m.dt)({
                    total: (0, m.Rx)(),
                    circulating: (0, m.Rx)(),
                    nonCirculating: (0, m.Rx)(),
                    nonCirculatingAccounts: (0, m.IX)(eE)
                })),
                e3 = (0, m.dt)({
                    amount: (0, m.Z_)(),
                    uiAmount: (0, m.AG)((0, m.Rx)()),
                    decimals: (0, m.Rx)(),
                    uiAmountString: (0, m.jt)((0, m.Z_)())
                }),
                e9 = ez((0, m.IX)((0, m.dt)({
                    address: eE,
                    amount: (0, m.Z_)(),
                    uiAmount: (0, m.AG)((0, m.Rx)()),
                    decimals: (0, m.Rx)(),
                    uiAmountString: (0, m.jt)((0, m.Z_)())
                }))),
                e7 = ez((0, m.IX)((0, m.dt)({
                    pubkey: eE,
                    account: (0, m.dt)({
                        executable: (0, m.O7)(),
                        owner: eE,
                        lamports: (0, m.Rx)(),
                        data: eW,
                        rentEpoch: (0, m.Rx)()
                    })
                }))),
                te = (0, m.dt)({
                    program: (0, m.Z_)(),
                    parsed: (0, m._4)(),
                    space: (0, m.Rx)()
                }),
                tt = ez((0, m.IX)((0, m.dt)({
                    pubkey: eE,
                    account: (0, m.dt)({
                        executable: (0, m.O7)(),
                        owner: eE,
                        lamports: (0, m.Rx)(),
                        data: te,
                        rentEpoch: (0, m.Rx)()
                    })
                }))),
                tr = ez((0, m.IX)((0, m.dt)({
                    lamports: (0, m.Rx)(),
                    address: eE
                }))),
                ti = (0, m.dt)({
                    executable: (0, m.O7)(),
                    owner: eE,
                    lamports: (0, m.Rx)(),
                    data: eW,
                    rentEpoch: (0, m.Rx)()
                }),
                ts = (0, m.dt)({
                    pubkey: eE,
                    account: ti
                }),
                tn = (0, m.oQ)((0, m.G0)([(0, m.eE)(o.Buffer), te]), (0, m.G0)([eT, te]), e => Array.isArray(e) ? (0, m.Ue)(e, eW) : e),
                to = (0, m.dt)({
                    executable: (0, m.O7)(),
                    owner: eE,
                    lamports: (0, m.Rx)(),
                    data: tn,
                    rentEpoch: (0, m.Rx)()
                }),
                ta = (0, m.dt)({
                    pubkey: eE,
                    account: to
                }),
                tc = (0, m.dt)({
                    state: (0, m.G0)([(0, m.i0)("active"), (0, m.i0)("inactive"), (0, m.i0)("activating"), (0, m.i0)("deactivating")]),
                    active: (0, m.Rx)(),
                    inactive: (0, m.Rx)()
                }),
                tu = eL((0, m.IX)((0, m.dt)({
                    signature: (0, m.Z_)(),
                    slot: (0, m.Rx)(),
                    err: e$,
                    memo: (0, m.AG)((0, m.Z_)()),
                    blockTime: (0, m.jt)((0, m.AG)((0, m.Rx)()))
                }))),
                tl = eL((0, m.IX)((0, m.dt)({
                    signature: (0, m.Z_)(),
                    slot: (0, m.Rx)(),
                    err: e$,
                    memo: (0, m.AG)((0, m.Z_)()),
                    blockTime: (0, m.jt)((0, m.AG)((0, m.Rx)()))
                }))),
                td = (0, m.dt)({
                    subscription: (0, m.Rx)(),
                    result: eK(ti)
                }),
                th = (0, m.dt)({
                    pubkey: eE,
                    account: ti
                }),
                tg = (0, m.dt)({
                    subscription: (0, m.Rx)(),
                    result: eK(th)
                }),
                tp = (0, m.dt)({
                    parent: (0, m.Rx)(),
                    slot: (0, m.Rx)(),
                    root: (0, m.Rx)()
                }),
                tf = (0, m.dt)({
                    subscription: (0, m.Rx)(),
                    result: tp
                }),
                tm = (0, m.G0)([(0, m.dt)({
                    type: (0, m.G0)([(0, m.i0)("firstShredReceived"), (0, m.i0)("completed"), (0, m.i0)("optimisticConfirmation"), (0, m.i0)("root")]),
                    slot: (0, m.Rx)(),
                    timestamp: (0, m.Rx)()
                }), (0, m.dt)({
                    type: (0, m.i0)("createdBank"),
                    parent: (0, m.Rx)(),
                    slot: (0, m.Rx)(),
                    timestamp: (0, m.Rx)()
                }), (0, m.dt)({
                    type: (0, m.i0)("frozen"),
                    slot: (0, m.Rx)(),
                    timestamp: (0, m.Rx)(),
                    stats: (0, m.dt)({
                        numTransactionEntries: (0, m.Rx)(),
                        numSuccessfulTransactions: (0, m.Rx)(),
                        numFailedTransactions: (0, m.Rx)(),
                        maxTransactionsPerEntry: (0, m.Rx)()
                    })
                }), (0, m.dt)({
                    type: (0, m.i0)("dead"),
                    slot: (0, m.Rx)(),
                    timestamp: (0, m.Rx)(),
                    err: (0, m.Z_)()
                })]),
                tb = (0, m.dt)({
                    subscription: (0, m.Rx)(),
                    result: tm
                }),
                ty = (0, m.dt)({
                    subscription: (0, m.Rx)(),
                    result: eK((0, m.G0)([eH, eF]))
                }),
                tk = (0, m.dt)({
                    subscription: (0, m.Rx)(),
                    result: (0, m.Rx)()
                }),
                tw = (0, m.dt)({
                    pubkey: (0, m.Z_)(),
                    gossip: (0, m.AG)((0, m.Z_)()),
                    tpu: (0, m.AG)((0, m.Z_)()),
                    rpc: (0, m.AG)((0, m.Z_)()),
                    version: (0, m.AG)((0, m.Z_)())
                }),
                tS = (0, m.dt)({
                    votePubkey: (0, m.Z_)(),
                    nodePubkey: (0, m.Z_)(),
                    activatedStake: (0, m.Rx)(),
                    epochVoteAccount: (0, m.O7)(),
                    epochCredits: (0, m.IX)((0, m.bc)([(0, m.Rx)(), (0, m.Rx)(), (0, m.Rx)()])),
                    commission: (0, m.Rx)(),
                    lastVote: (0, m.Rx)(),
                    rootSlot: (0, m.AG)((0, m.Rx)())
                }),
                t_ = eL((0, m.dt)({
                    current: (0, m.IX)(tS),
                    delinquent: (0, m.IX)(tS)
                })),
                tI = (0, m.G0)([(0, m.i0)("processed"), (0, m.i0)("confirmed"), (0, m.i0)("finalized")]),
                tA = (0, m.dt)({
                    slot: (0, m.Rx)(),
                    confirmations: (0, m.AG)((0, m.Rx)()),
                    err: e$,
                    confirmationStatus: (0, m.jt)(tI)
                }),
                tx = ez((0, m.IX)((0, m.AG)(tA))),
                tv = eL((0, m.Rx)()),
                tB = (0, m.dt)({
                    accountKey: eE,
                    writableIndexes: (0, m.IX)((0, m.Rx)()),
                    readonlyIndexes: (0, m.IX)((0, m.Rx)())
                }),
                tR = (0, m.dt)({
                    signatures: (0, m.IX)((0, m.Z_)()),
                    message: (0, m.dt)({
                        accountKeys: (0, m.IX)((0, m.Z_)()),
                        header: (0, m.dt)({
                            numRequiredSignatures: (0, m.Rx)(),
                            numReadonlySignedAccounts: (0, m.Rx)(),
                            numReadonlyUnsignedAccounts: (0, m.Rx)()
                        }),
                        instructions: (0, m.IX)((0, m.dt)({
                            accounts: (0, m.IX)((0, m.Rx)()),
                            data: (0, m.Z_)(),
                            programIdIndex: (0, m.Rx)()
                        })),
                        recentBlockhash: (0, m.Z_)(),
                        addressTableLookups: (0, m.jt)((0, m.IX)(tB))
                    })
                }),
                tP = (0, m.dt)({
                    pubkey: eE,
                    signer: (0, m.O7)(),
                    writable: (0, m.O7)(),
                    source: (0, m.jt)((0, m.G0)([(0, m.i0)("transaction"), (0, m.i0)("lookupTable")]))
                }),
                tE = (0, m.dt)({
                    accountKeys: (0, m.IX)(tP),
                    signatures: (0, m.IX)((0, m.Z_)())
                }),
                tT = (0, m.dt)({
                    parsed: (0, m._4)(),
                    program: (0, m.Z_)(),
                    programId: eE
                }),
                tW = (0, m.dt)({
                    accounts: (0, m.IX)(eE),
                    data: (0, m.Z_)(),
                    programId: eE
                }),
                tC = (0, m.G0)([tW, tT]),
                tq = (0, m.G0)([(0, m.dt)({
                    parsed: (0, m._4)(),
                    program: (0, m.Z_)(),
                    programId: (0, m.Z_)()
                }), (0, m.dt)({
                    accounts: (0, m.IX)((0, m.Z_)()),
                    data: (0, m.Z_)(),
                    programId: (0, m.Z_)()
                })]),
                tU = (0, m.oQ)(tC, tq, e => "accounts" in e ? (0, m.Ue)(e, tW) : (0, m.Ue)(e, tT)),
                tL = (0, m.dt)({
                    signatures: (0, m.IX)((0, m.Z_)()),
                    message: (0, m.dt)({
                        accountKeys: (0, m.IX)(tP),
                        instructions: (0, m.IX)(tU),
                        recentBlockhash: (0, m.Z_)(),
                        addressTableLookups: (0, m.jt)((0, m.AG)((0, m.IX)(tB)))
                    })
                }),
                tz = (0, m.dt)({
                    accountIndex: (0, m.Rx)(),
                    mint: (0, m.Z_)(),
                    owner: (0, m.jt)((0, m.Z_)()),
                    uiTokenAmount: e3
                }),
                tK = (0, m.dt)({
                    writable: (0, m.IX)(eE),
                    readonly: (0, m.IX)(eE)
                }),
                tO = (0, m.dt)({
                    err: e$,
                    fee: (0, m.Rx)(),
                    innerInstructions: (0, m.jt)((0, m.AG)((0, m.IX)((0, m.dt)({
                        index: (0, m.Rx)(),
                        instructions: (0, m.IX)((0, m.dt)({
                            accounts: (0, m.IX)((0, m.Rx)()),
                            data: (0, m.Z_)(),
                            programIdIndex: (0, m.Rx)()
                        }))
                    })))),
                    preBalances: (0, m.IX)((0, m.Rx)()),
                    postBalances: (0, m.IX)((0, m.Rx)()),
                    logMessages: (0, m.jt)((0, m.AG)((0, m.IX)((0, m.Z_)()))),
                    preTokenBalances: (0, m.jt)((0, m.AG)((0, m.IX)(tz))),
                    postTokenBalances: (0, m.jt)((0, m.AG)((0, m.IX)(tz))),
                    loadedAddresses: (0, m.jt)(tK),
                    computeUnitsConsumed: (0, m.jt)((0, m.Rx)())
                }),
                tN = (0, m.dt)({
                    err: e$,
                    fee: (0, m.Rx)(),
                    innerInstructions: (0, m.jt)((0, m.AG)((0, m.IX)((0, m.dt)({
                        index: (0, m.Rx)(),
                        instructions: (0, m.IX)(tU)
                    })))),
                    preBalances: (0, m.IX)((0, m.Rx)()),
                    postBalances: (0, m.IX)((0, m.Rx)()),
                    logMessages: (0, m.jt)((0, m.AG)((0, m.IX)((0, m.Z_)()))),
                    preTokenBalances: (0, m.jt)((0, m.AG)((0, m.IX)(tz))),
                    postTokenBalances: (0, m.jt)((0, m.AG)((0, m.IX)(tz))),
                    loadedAddresses: (0, m.jt)(tK),
                    computeUnitsConsumed: (0, m.jt)((0, m.Rx)())
                }),
                tG = (0, m.G0)([(0, m.i0)(0), (0, m.i0)("legacy")]),
                tj = (0, m.dt)({
                    pubkey: (0, m.Z_)(),
                    lamports: (0, m.Rx)(),
                    postBalance: (0, m.AG)((0, m.Rx)()),
                    rewardType: (0, m.AG)((0, m.Z_)()),
                    commission: (0, m.jt)((0, m.AG)((0, m.Rx)()))
                }),
                tM = eL((0, m.AG)((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    previousBlockhash: (0, m.Z_)(),
                    parentSlot: (0, m.Rx)(),
                    transactions: (0, m.IX)((0, m.dt)({
                        transaction: tR,
                        meta: (0, m.AG)(tO),
                        version: (0, m.jt)(tG)
                    })),
                    rewards: (0, m.jt)((0, m.IX)(tj)),
                    blockTime: (0, m.AG)((0, m.Rx)()),
                    blockHeight: (0, m.AG)((0, m.Rx)())
                }))),
                tJ = eL((0, m.AG)((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    previousBlockhash: (0, m.Z_)(),
                    parentSlot: (0, m.Rx)(),
                    rewards: (0, m.jt)((0, m.IX)(tj)),
                    blockTime: (0, m.AG)((0, m.Rx)()),
                    blockHeight: (0, m.AG)((0, m.Rx)())
                }))),
                tZ = eL((0, m.AG)((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    previousBlockhash: (0, m.Z_)(),
                    parentSlot: (0, m.Rx)(),
                    transactions: (0, m.IX)((0, m.dt)({
                        transaction: tE,
                        meta: (0, m.AG)(tO),
                        version: (0, m.jt)(tG)
                    })),
                    rewards: (0, m.jt)((0, m.IX)(tj)),
                    blockTime: (0, m.AG)((0, m.Rx)()),
                    blockHeight: (0, m.AG)((0, m.Rx)())
                }))),
                tX = eL((0, m.AG)((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    previousBlockhash: (0, m.Z_)(),
                    parentSlot: (0, m.Rx)(),
                    transactions: (0, m.IX)((0, m.dt)({
                        transaction: tL,
                        meta: (0, m.AG)(tN),
                        version: (0, m.jt)(tG)
                    })),
                    rewards: (0, m.jt)((0, m.IX)(tj)),
                    blockTime: (0, m.AG)((0, m.Rx)()),
                    blockHeight: (0, m.AG)((0, m.Rx)())
                }))),
                t$ = eL((0, m.AG)((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    previousBlockhash: (0, m.Z_)(),
                    parentSlot: (0, m.Rx)(),
                    transactions: (0, m.IX)((0, m.dt)({
                        transaction: tE,
                        meta: (0, m.AG)(tN),
                        version: (0, m.jt)(tG)
                    })),
                    rewards: (0, m.jt)((0, m.IX)(tj)),
                    blockTime: (0, m.AG)((0, m.Rx)()),
                    blockHeight: (0, m.AG)((0, m.Rx)())
                }))),
                tH = eL((0, m.AG)((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    previousBlockhash: (0, m.Z_)(),
                    parentSlot: (0, m.Rx)(),
                    rewards: (0, m.jt)((0, m.IX)(tj)),
                    blockTime: (0, m.AG)((0, m.Rx)()),
                    blockHeight: (0, m.AG)((0, m.Rx)())
                }))),
                tF = eL((0, m.AG)((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    previousBlockhash: (0, m.Z_)(),
                    parentSlot: (0, m.Rx)(),
                    transactions: (0, m.IX)((0, m.dt)({
                        transaction: tR,
                        meta: (0, m.AG)(tO)
                    })),
                    rewards: (0, m.jt)((0, m.IX)(tj)),
                    blockTime: (0, m.AG)((0, m.Rx)())
                }))),
                tD = eL((0, m.AG)((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    previousBlockhash: (0, m.Z_)(),
                    parentSlot: (0, m.Rx)(),
                    signatures: (0, m.IX)((0, m.Z_)()),
                    blockTime: (0, m.AG)((0, m.Rx)())
                }))),
                tV = eL((0, m.AG)((0, m.dt)({
                    slot: (0, m.Rx)(),
                    meta: (0, m.AG)(tO),
                    blockTime: (0, m.jt)((0, m.AG)((0, m.Rx)())),
                    transaction: tR,
                    version: (0, m.jt)(tG)
                }))),
                tQ = eL((0, m.AG)((0, m.dt)({
                    slot: (0, m.Rx)(),
                    transaction: tL,
                    meta: (0, m.AG)(tN),
                    blockTime: (0, m.jt)((0, m.AG)((0, m.Rx)())),
                    version: (0, m.jt)(tG)
                }))),
                tY = ez((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    feeCalculator: (0, m.dt)({
                        lamportsPerSignature: (0, m.Rx)()
                    })
                })),
                t0 = ez((0, m.dt)({
                    blockhash: (0, m.Z_)(),
                    lastValidBlockHeight: (0, m.Rx)()
                })),
                t1 = ez((0, m.O7)()),
                t8 = (0, m.dt)({
                    slot: (0, m.Rx)(),
                    numTransactions: (0, m.Rx)(),
                    numSlots: (0, m.Rx)(),
                    samplePeriodSecs: (0, m.Rx)()
                }),
                t2 = eL((0, m.IX)(t8)),
                t5 = ez((0, m.AG)((0, m.dt)({
                    feeCalculator: (0, m.dt)({
                        lamportsPerSignature: (0, m.Rx)()
                    })
                }))),
                t4 = eL((0, m.Z_)()),
                t6 = eL((0, m.Z_)()),
                t3 = (0, m.dt)({
                    err: e$,
                    logs: (0, m.IX)((0, m.Z_)()),
                    signature: (0, m.Z_)()
                }),
                t9 = (0, m.dt)({
                    result: eK(t3),
                    subscription: (0, m.Rx)()
                }),
                t7 = {
                    "solana-client": "js/0.0.0-development"
                };
            class re {
                constructor(e, t) {
                    var r, i;
                    let s, n, o, a, c, u;
                    this._commitment = void 0, this._confirmTransactionInitialTimeout = void 0, this._rpcEndpoint = void 0, this._rpcWsEndpoint = void 0, this._rpcClient = void 0, this._rpcRequest = void 0, this._rpcBatchRequest = void 0, this._rpcWebSocket = void 0, this._rpcWebSocketConnected = !1, this._rpcWebSocketHeartbeat = null, this._rpcWebSocketIdleTimeout = null, this._rpcWebSocketGeneration = 0, this._disableBlockhashCaching = !1, this._pollingBlockhash = !1, this._blockhashInfo = {
                        latestBlockhash: null,
                        lastFetch: 0,
                        transactionSignatures: [],
                        simulatedSignatures: []
                    }, this._nextClientSubscriptionId = 0, this._subscriptionDisposeFunctionsByClientSubscriptionId = {}, this._subscriptionHashByClientSubscriptionId = {}, this._subscriptionStateChangeCallbacksByHash = {}, this._subscriptionCallbacksByServerSubscriptionId = {}, this._subscriptionsByHash = {}, this._subscriptionsAutoDisposedByRpc = new Set, this.getBlockHeight = (() => {
                        let e = {};
                        return async t => {
                            let {
                                commitment: r,
                                config: i
                            } = eC(t), s = this._buildArgs([], r, void 0, i), n = ew(s);
                            return e[n] = e[n] ? ? (async () => {
                                try {
                                    let e = await this._rpcRequest("getBlockHeight", s),
                                        t = (0, m.Ue)(e, eL((0, m.Rx)()));
                                    if ("error" in t) throw new eA(t.error, "failed to get block height information");
                                    return t.result
                                } finally {
                                    delete e[n]
                                }
                            })(), await e[n]
                        }
                    })(), t && "string" == typeof t ? this._commitment = t : t && (this._commitment = t.commitment, this._confirmTransactionInitialTimeout = t.confirmTransactionInitialTimeout, s = t.wsEndpoint, n = t.httpHeaders, o = t.fetch, a = t.fetchMiddleware, c = t.disableRetryOnRateLimit, u = t.httpAgent), this._rpcEndpoint = function(e) {
                        if (!1 === /^https?:/.test(e)) throw TypeError("Endpoint URL must start with `http:` or `https:`.");
                        return e
                    }(e), this._rpcWsEndpoint = s || function(e) {
                        let t = e.match(eP);
                        if (null == t) throw TypeError(`Failed to validate endpoint URL \`${e}\``);
                        let [r, i, s, n] = t, o = e.startsWith("https:") ? "wss:" : "ws:", a = null == s ? null : parseInt(s.slice(1), 10), c = null == a ? "" : `:${a+1}`;
                        return `${o}//${i}${c}${n}`
                    }(e), this._rpcClient = function(e, t, r, i, s, n) {
                        let o, a;
                        let c = r || ex;
                        return null != n && console.warn("You have supplied an `httpAgent` when creating a `Connection` in a browser environment.It has been ignored; `httpAgent` is only used in Node environments."), i && (a = async (e, t) => {
                            let r = await new Promise((r, s) => {
                                try {
                                    i(e, t, (e, t) => r([e, t]))
                                } catch (e) {
                                    s(e)
                                }
                            });
                            return await c(...r)
                        }), new(y())(async (r, i) => {
                            let n = {
                                method: "POST",
                                body: r,
                                agent: o,
                                headers: Object.assign({
                                    "Content-Type": "application/json"
                                }, t || {}, t7)
                            };
                            try {
                                let t, r = 5,
                                    o = 500;
                                for (; t = a ? await a(e, n) : await c(e, n), 429 === t.status && !0 !== s && (r -= 1, 0 !== r);) console.error(`Server responded with ${t.status} ${t.statusText}.  Retrying after ${o}ms delay...`), await ea(o), o *= 2;
                                let u = await t.text();
                                t.ok ? i(null, u) : i(Error(`${t.status} ${t.statusText}: ${u}`))
                            } catch (e) {
                                e instanceof Error && i(e)
                            }
                        }, {})
                    }(e, n, o, a, c, u), this._rpcRequest = (r = this._rpcClient, (e, t) => new Promise((i, s) => {
                        r.request(e, t, (e, t) => {
                            if (e) {
                                s(e);
                                return
                            }
                            i(t)
                        })
                    })), this._rpcBatchRequest = (i = this._rpcClient, e => new Promise((t, r) => {
                        0 === e.length && t([]);
                        let s = e.map(e => i.request(e.methodName, e.args));
                        i.request(s, (e, i) => {
                            if (e) {
                                r(e);
                                return
                            }
                            t(i)
                        })
                    })), this._rpcWebSocket = new ev(this._rpcWsEndpoint, {
                        autoconnect: !1,
                        max_reconnects: 1 / 0
                    }), this._rpcWebSocket.on("open", this._wsOnOpen.bind(this)), this._rpcWebSocket.on("error", this._wsOnError.bind(this)), this._rpcWebSocket.on("close", this._wsOnClose.bind(this)), this._rpcWebSocket.on("accountNotification", this._wsOnAccountNotification.bind(this)), this._rpcWebSocket.on("programNotification", this._wsOnProgramAccountNotification.bind(this)), this._rpcWebSocket.on("slotNotification", this._wsOnSlotNotification.bind(this)), this._rpcWebSocket.on("slotsUpdatesNotification", this._wsOnSlotUpdatesNotification.bind(this)), this._rpcWebSocket.on("signatureNotification", this._wsOnSignatureNotification.bind(this)), this._rpcWebSocket.on("rootNotification", this._wsOnRootNotification.bind(this)), this._rpcWebSocket.on("logsNotification", this._wsOnLogsNotification.bind(this))
                }
                get commitment() {
                    return this._commitment
                }
                get rpcEndpoint() {
                    return this._rpcEndpoint
                }
                async getBalanceAndContext(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = this._buildArgs([e.toBase58()], r, void 0, i), n = await this._rpcRequest("getBalance", s), o = (0, m.Ue)(n, ez((0, m.Rx)()));
                    if ("error" in o) throw new eA(o.error, `failed to get balance for ${e.toBase58()}`);
                    return o.result
                }
                async getBalance(e, t) {
                    return await this.getBalanceAndContext(e, t).then(e => e.value).catch(t => {
                        throw Error("failed to get balance of account " + e.toBase58() + ": " + t)
                    })
                }
                async getBlockTime(e) {
                    let t = await this._rpcRequest("getBlockTime", [e]),
                        r = (0, m.Ue)(t, eL((0, m.AG)((0, m.Rx)())));
                    if ("error" in r) throw new eA(r.error, `failed to get block time for slot ${e}`);
                    return r.result
                }
                async getMinimumLedgerSlot() {
                    let e = await this._rpcRequest("minimumLedgerSlot", []),
                        t = (0, m.Ue)(e, eL((0, m.Rx)()));
                    if ("error" in t) throw new eA(t.error, "failed to get minimum ledger slot");
                    return t.result
                }
                async getFirstAvailableBlock() {
                    let e = await this._rpcRequest("getFirstAvailableBlock", []),
                        t = (0, m.Ue)(e, e4);
                    if ("error" in t) throw new eA(t.error, "failed to get first available block");
                    return t.result
                }
                async getSupply(e) {
                    let t = {};
                    t = "string" == typeof e ? {
                        commitment: e
                    } : e ? { ...e,
                        commitment: e && e.commitment || this.commitment
                    } : {
                        commitment: this.commitment
                    };
                    let r = await this._rpcRequest("getSupply", [t]),
                        i = (0, m.Ue)(r, e6);
                    if ("error" in i) throw new eA(i.error, "failed to get supply");
                    return i.result
                }
                async getTokenSupply(e, t) {
                    let r = this._buildArgs([e.toBase58()], t),
                        i = await this._rpcRequest("getTokenSupply", r),
                        s = (0, m.Ue)(i, ez(e3));
                    if ("error" in s) throw new eA(s.error, "failed to get token supply");
                    return s.result
                }
                async getTokenAccountBalance(e, t) {
                    let r = this._buildArgs([e.toBase58()], t),
                        i = await this._rpcRequest("getTokenAccountBalance", r),
                        s = (0, m.Ue)(i, ez(e3));
                    if ("error" in s) throw new eA(s.error, "failed to get token account balance");
                    return s.result
                }
                async getTokenAccountsByOwner(e, t, r) {
                    let {
                        commitment: i,
                        config: s
                    } = eC(r), n = [e.toBase58()];
                    "mint" in t ? n.push({
                        mint: t.mint.toBase58()
                    }) : n.push({
                        programId: t.programId.toBase58()
                    });
                    let o = this._buildArgs(n, i, "base64", s),
                        a = await this._rpcRequest("getTokenAccountsByOwner", o),
                        c = (0, m.Ue)(a, e7);
                    if ("error" in c) throw new eA(c.error, `failed to get token accounts owned by account ${e.toBase58()}`);
                    return c.result
                }
                async getParsedTokenAccountsByOwner(e, t, r) {
                    let i = [e.toBase58()];
                    "mint" in t ? i.push({
                        mint: t.mint.toBase58()
                    }) : i.push({
                        programId: t.programId.toBase58()
                    });
                    let s = this._buildArgs(i, r, "jsonParsed"),
                        n = await this._rpcRequest("getTokenAccountsByOwner", s),
                        o = (0, m.Ue)(n, tt);
                    if ("error" in o) throw new eA(o.error, `failed to get token accounts owned by account ${e.toBase58()}`);
                    return o.result
                }
                async getLargestAccounts(e) {
                    let t = { ...e,
                            commitment: e && e.commitment || this.commitment
                        },
                        r = t.filter || t.commitment ? [t] : [],
                        i = await this._rpcRequest("getLargestAccounts", r),
                        s = (0, m.Ue)(i, tr);
                    if ("error" in s) throw new eA(s.error, "failed to get largest accounts");
                    return s.result
                }
                async getTokenLargestAccounts(e, t) {
                    let r = this._buildArgs([e.toBase58()], t),
                        i = await this._rpcRequest("getTokenLargestAccounts", r),
                        s = (0, m.Ue)(i, e9);
                    if ("error" in s) throw new eA(s.error, "failed to get token largest accounts");
                    return s.result
                }
                async getAccountInfoAndContext(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = this._buildArgs([e.toBase58()], r, "base64", i), n = await this._rpcRequest("getAccountInfo", s), o = (0, m.Ue)(n, ez((0, m.AG)(ti)));
                    if ("error" in o) throw new eA(o.error, `failed to get info about account ${e.toBase58()}`);
                    return o.result
                }
                async getParsedAccountInfo(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = this._buildArgs([e.toBase58()], r, "jsonParsed", i), n = await this._rpcRequest("getAccountInfo", s), o = (0, m.Ue)(n, ez((0, m.AG)(to)));
                    if ("error" in o) throw new eA(o.error, `failed to get info about account ${e.toBase58()}`);
                    return o.result
                }
                async getAccountInfo(e, t) {
                    try {
                        return (await this.getAccountInfoAndContext(e, t)).value
                    } catch (t) {
                        throw Error("failed to get info about account " + e.toBase58() + ": " + t)
                    }
                }
                async getMultipleParsedAccounts(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = e.map(e => e.toBase58()), n = this._buildArgs([s], r, "jsonParsed", i), o = await this._rpcRequest("getMultipleAccounts", n), a = (0, m.Ue)(o, ez((0, m.IX)((0, m.AG)(to))));
                    if ("error" in a) throw new eA(a.error, `failed to get info for accounts ${s}`);
                    return a.result
                }
                async getMultipleAccountsInfoAndContext(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = e.map(e => e.toBase58()), n = this._buildArgs([s], r, "base64", i), o = await this._rpcRequest("getMultipleAccounts", n), a = (0, m.Ue)(o, ez((0, m.IX)((0, m.AG)(ti))));
                    if ("error" in a) throw new eA(a.error, `failed to get info for accounts ${s}`);
                    return a.result
                }
                async getMultipleAccountsInfo(e, t) {
                    return (await this.getMultipleAccountsInfoAndContext(e, t)).value
                }
                async getStakeActivation(e, t, r) {
                    let {
                        commitment: i,
                        config: s
                    } = eC(t), n = this._buildArgs([e.toBase58()], i, void 0, { ...s,
                        epoch: null != r ? r : s ? .epoch
                    }), o = await this._rpcRequest("getStakeActivation", n), a = (0, m.Ue)(o, eL(tc));
                    if ("error" in a) throw new eA(a.error, `failed to get Stake Activation ${e.toBase58()}`);
                    return a.result
                }
                async getProgramAccounts(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), {
                        encoding: s,
                        ...n
                    } = i || {}, o = this._buildArgs([e.toBase58()], r, s || "base64", n), a = await this._rpcRequest("getProgramAccounts", o), c = (0, m.IX)(ts), u = !0 === n.withContext ? (0, m.Ue)(a, ez(c)) : (0, m.Ue)(a, eL(c));
                    if ("error" in u) throw new eA(u.error, `failed to get accounts owned by program ${e.toBase58()}`);
                    return u.result
                }
                async getParsedProgramAccounts(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = this._buildArgs([e.toBase58()], r, "jsonParsed", i), n = await this._rpcRequest("getProgramAccounts", s), o = (0, m.Ue)(n, eL((0, m.IX)(ta)));
                    if ("error" in o) throw new eA(o.error, `failed to get accounts owned by program ${e.toBase58()}`);
                    return o.result
                }
                async confirmTransaction(e, t) {
                    let r, i;
                    if ("string" == typeof e) r = e;
                    else {
                        if (e.abortSignal ? .aborted) return Promise.reject(e.abortSignal.reason);
                        r = e.signature
                    }
                    try {
                        i = d().decode(r)
                    } catch (e) {
                        throw Error("signature must be base58 encoded: " + r)
                    }
                    return (M(64 === i.length, "signature has invalid length"), "string" == typeof e) ? await this.confirmTransactionUsingLegacyTimeoutStrategy({
                        commitment: t || this.commitment,
                        signature: r
                    }) : "lastValidBlockHeight" in e ? await this.confirmTransactionUsingBlockHeightExceedanceStrategy({
                        commitment: t || this.commitment,
                        strategy: e
                    }) : await this.confirmTransactionUsingDurableNonceStrategy({
                        commitment: t || this.commitment,
                        strategy: e
                    })
                }
                getCancellationPromise(e) {
                    return new Promise((t, r) => {
                        null != e && (e.aborted ? r(e.reason) : e.addEventListener("abort", () => {
                            r(e.reason)
                        }))
                    })
                }
                getTransactionConfirmationPromise({
                    commitment: e,
                    signature: t
                }) {
                    let r, i;
                    let s = !1;
                    return {
                        abortConfirmation: () => {
                            i && (i(), i = void 0), null != r && (this.removeSignatureListener(r), r = void 0)
                        },
                        confirmationPromise: new Promise((n, o) => {
                            try {
                                r = this.onSignature(t, (e, t) => {
                                    r = void 0, n({
                                        __type: V.PROCESSED,
                                        response: {
                                            context: t,
                                            value: e
                                        }
                                    })
                                }, e);
                                let a = new Promise(e => {
                                    null == r ? e() : i = this._onSubscriptionStateChange(r, t => {
                                        "subscribed" === t && e()
                                    })
                                });
                                (async () => {
                                    if (await a, s) return;
                                    let r = await this.getSignatureStatus(t);
                                    if (s || null == r) return;
                                    let {
                                        context: i,
                                        value: c
                                    } = r;
                                    if (null != c) {
                                        if (c ? .err) o(c.err);
                                        else {
                                            switch (e) {
                                                case "confirmed":
                                                case "single":
                                                case "singleGossip":
                                                    if ("processed" === c.confirmationStatus) return;
                                                    break;
                                                case "finalized":
                                                case "max":
                                                case "root":
                                                    if ("processed" === c.confirmationStatus || "confirmed" === c.confirmationStatus) return
                                            }
                                            s = !0, n({
                                                __type: V.PROCESSED,
                                                response: {
                                                    context: i,
                                                    value: c
                                                }
                                            })
                                        }
                                    }
                                })()
                            } catch (e) {
                                o(e)
                            }
                        })
                    }
                }
                async confirmTransactionUsingBlockHeightExceedanceStrategy({
                    commitment: e,
                    strategy: {
                        abortSignal: t,
                        lastValidBlockHeight: r,
                        signature: i
                    }
                }) {
                    let s, n = !1,
                        o = new Promise(t => {
                            let i = async () => {
                                try {
                                    return await this.getBlockHeight(e)
                                } catch (e) {
                                    return -1
                                }
                            };
                            (async () => {
                                let e = await i();
                                if (!n) {
                                    for (; e <= r;)
                                        if (await ea(1e3), n || (e = await i(), n)) return;
                                    t({
                                        __type: V.BLOCKHEIGHT_EXCEEDED
                                    })
                                }
                            })()
                        }),
                        {
                            abortConfirmation: a,
                            confirmationPromise: c
                        } = this.getTransactionConfirmationPromise({
                            commitment: e,
                            signature: i
                        }),
                        u = this.getCancellationPromise(t);
                    try {
                        let e = await Promise.race([u, c, o]);
                        if (e.__type === V.PROCESSED) s = e.response;
                        else throw new q(i)
                    } finally {
                        n = !0, a()
                    }
                    return s
                }
                async confirmTransactionUsingDurableNonceStrategy({
                    commitment: e,
                    strategy: {
                        abortSignal: t,
                        minContextSlot: r,
                        nonceAccountPubkey: i,
                        nonceValue: s,
                        signature: n
                    }
                }) {
                    let o, a = !1,
                        c = new Promise(t => {
                            let n = s,
                                o = null,
                                c = async () => {
                                    try {
                                        let {
                                            context: t,
                                            value: s
                                        } = await this.getNonceAndContext(i, {
                                            commitment: e,
                                            minContextSlot: r
                                        });
                                        return o = t.slot, s ? .nonce
                                    } catch (e) {
                                        return n
                                    }
                                };
                            (async () => {
                                if (n = await c(), !a)
                                    for (;;) {
                                        if (s !== n) {
                                            t({
                                                __type: V.NONCE_INVALID,
                                                slotInWhichNonceDidAdvance: o
                                            });
                                            return
                                        }
                                        if (await ea(2e3), a || (n = await c(), a)) return
                                    }
                            })()
                        }),
                        {
                            abortConfirmation: u,
                            confirmationPromise: l
                        } = this.getTransactionConfirmationPromise({
                            commitment: e,
                            signature: n
                        }),
                        d = this.getCancellationPromise(t);
                    try {
                        let t = await Promise.race([d, l, c]);
                        if (t.__type === V.PROCESSED) o = t.response;
                        else {
                            let i;
                            for (;;) {
                                let e = await this.getSignatureStatus(n);
                                if (null == e) break;
                                if (e.context.slot < (t.slotInWhichNonceDidAdvance ? ? r)) {
                                    await ea(400);
                                    continue
                                }
                                i = e;
                                break
                            }
                            if (i ? .value) {
                                let t = e || "finalized",
                                    {
                                        confirmationStatus: r
                                    } = i.value;
                                switch (t) {
                                    case "processed":
                                    case "recent":
                                        if ("processed" !== r && "confirmed" !== r && "finalized" !== r) throw new L(n);
                                        break;
                                    case "confirmed":
                                    case "single":
                                    case "singleGossip":
                                        if ("confirmed" !== r && "finalized" !== r) throw new L(n);
                                        break;
                                    case "finalized":
                                    case "max":
                                    case "root":
                                        if ("finalized" !== r) throw new L(n)
                                }
                                o = {
                                    context: i.context,
                                    value: {
                                        err: i.value.err
                                    }
                                }
                            } else throw new L(n)
                        }
                    } finally {
                        a = !0, u()
                    }
                    return o
                }
                async confirmTransactionUsingLegacyTimeoutStrategy({
                    commitment: e,
                    signature: t
                }) {
                    let r, i;
                    let s = new Promise(t => {
                            let i = this._confirmTransactionInitialTimeout || 6e4;
                            switch (e) {
                                case "processed":
                                case "recent":
                                case "single":
                                case "confirmed":
                                case "singleGossip":
                                    i = this._confirmTransactionInitialTimeout || 3e4
                            }
                            r = setTimeout(() => t({
                                __type: V.TIMED_OUT,
                                timeoutMs: i
                            }), i)
                        }),
                        {
                            abortConfirmation: n,
                            confirmationPromise: o
                        } = this.getTransactionConfirmationPromise({
                            commitment: e,
                            signature: t
                        });
                    try {
                        let e = await Promise.race([o, s]);
                        if (e.__type === V.PROCESSED) i = e.response;
                        else throw new U(t, e.timeoutMs / 1e3)
                    } finally {
                        clearTimeout(r), n()
                    }
                    return i
                }
                async getClusterNodes() {
                    let e = await this._rpcRequest("getClusterNodes", []),
                        t = (0, m.Ue)(e, eL((0, m.IX)(tw)));
                    if ("error" in t) throw new eA(t.error, "failed to get cluster nodes");
                    return t.result
                }
                async getVoteAccounts(e) {
                    let t = this._buildArgs([], e),
                        r = await this._rpcRequest("getVoteAccounts", t),
                        i = (0, m.Ue)(r, t_);
                    if ("error" in i) throw new eA(i.error, "failed to get vote accounts");
                    return i.result
                }
                async getSlot(e) {
                    let {
                        commitment: t,
                        config: r
                    } = eC(e), i = this._buildArgs([], t, void 0, r), s = await this._rpcRequest("getSlot", i), n = (0, m.Ue)(s, eL((0, m.Rx)()));
                    if ("error" in n) throw new eA(n.error, "failed to get slot");
                    return n.result
                }
                async getSlotLeader(e) {
                    let {
                        commitment: t,
                        config: r
                    } = eC(e), i = this._buildArgs([], t, void 0, r), s = await this._rpcRequest("getSlotLeader", i), n = (0, m.Ue)(s, eL((0, m.Z_)()));
                    if ("error" in n) throw new eA(n.error, "failed to get slot leader");
                    return n.result
                }
                async getSlotLeaders(e, t) {
                    let r = await this._rpcRequest("getSlotLeaders", [e, t]),
                        i = (0, m.Ue)(r, eL((0, m.IX)(eE)));
                    if ("error" in i) throw new eA(i.error, "failed to get slot leaders");
                    return i.result
                }
                async getSignatureStatus(e, t) {
                    let {
                        context: r,
                        value: i
                    } = await this.getSignatureStatuses([e], t);
                    return M(1 === i.length), {
                        context: r,
                        value: i[0]
                    }
                }
                async getSignatureStatuses(e, t) {
                    let r = [e];
                    t && r.push(t);
                    let i = await this._rpcRequest("getSignatureStatuses", r),
                        s = (0, m.Ue)(i, tx);
                    if ("error" in s) throw new eA(s.error, "failed to get signature status");
                    return s.result
                }
                async getTransactionCount(e) {
                    let {
                        commitment: t,
                        config: r
                    } = eC(e), i = this._buildArgs([], t, void 0, r), s = await this._rpcRequest("getTransactionCount", i), n = (0, m.Ue)(s, eL((0, m.Rx)()));
                    if ("error" in n) throw new eA(n.error, "failed to get transaction count");
                    return n.result
                }
                async getTotalSupply(e) {
                    return (await this.getSupply({
                        commitment: e,
                        excludeNonCirculatingAccountsList: !0
                    })).value.total
                }
                async getInflationGovernor(e) {
                    let t = this._buildArgs([], e),
                        r = await this._rpcRequest("getInflationGovernor", t),
                        i = (0, m.Ue)(r, eY);
                    if ("error" in i) throw new eA(i.error, "failed to get inflation");
                    return i.result
                }
                async getInflationReward(e, t, r) {
                    let {
                        commitment: i,
                        config: s
                    } = eC(r), n = this._buildArgs([e.map(e => e.toBase58())], i, void 0, { ...s,
                        epoch: null != t ? t : s ? .epoch
                    }), o = await this._rpcRequest("getInflationReward", n), a = (0, m.Ue)(o, eG);
                    if ("error" in a) throw new eA(a.error, "failed to get inflation reward");
                    return a.result
                }
                async getInflationRate() {
                    let e = await this._rpcRequest("getInflationRate", []),
                        t = (0, m.Ue)(e, e0);
                    if ("error" in t) throw new eA(t.error, "failed to get inflation rate");
                    return t.result
                }
                async getEpochInfo(e) {
                    let {
                        commitment: t,
                        config: r
                    } = eC(e), i = this._buildArgs([], t, void 0, r), s = await this._rpcRequest("getEpochInfo", i), n = (0, m.Ue)(s, e8);
                    if ("error" in n) throw new eA(n.error, "failed to get epoch info");
                    return n.result
                }
                async getEpochSchedule() {
                    let e = await this._rpcRequest("getEpochSchedule", []),
                        t = (0, m.Ue)(e, e2);
                    if ("error" in t) throw new eA(t.error, "failed to get epoch schedule");
                    let r = t.result;
                    return new e_(r.slotsPerEpoch, r.leaderScheduleSlotOffset, r.warmup, r.firstNormalEpoch, r.firstNormalSlot)
                }
                async getLeaderSchedule() {
                    let e = await this._rpcRequest("getLeaderSchedule", []),
                        t = (0, m.Ue)(e, e5);
                    if ("error" in t) throw new eA(t.error, "failed to get leader schedule");
                    return t.result
                }
                async getMinimumBalanceForRentExemption(e, t) {
                    let r = this._buildArgs([e], t),
                        i = await this._rpcRequest("getMinimumBalanceForRentExemption", r),
                        s = (0, m.Ue)(i, tv);
                    return "error" in s ? (console.warn("Unable to fetch minimum balance for rent exemption"), 0) : s.result
                }
                async getRecentBlockhashAndContext(e) {
                    let t = this._buildArgs([], e),
                        r = await this._rpcRequest("getRecentBlockhash", t),
                        i = (0, m.Ue)(r, tY);
                    if ("error" in i) throw new eA(i.error, "failed to get recent blockhash");
                    return i.result
                }
                async getRecentPerformanceSamples(e) {
                    let t = await this._rpcRequest("getRecentPerformanceSamples", e ? [e] : []),
                        r = (0, m.Ue)(t, t2);
                    if ("error" in r) throw new eA(r.error, "failed to get recent performance samples");
                    return r.result
                }
                async getFeeCalculatorForBlockhash(e, t) {
                    let r = this._buildArgs([e], t),
                        i = await this._rpcRequest("getFeeCalculatorForBlockhash", r),
                        s = (0, m.Ue)(i, t5);
                    if ("error" in s) throw new eA(s.error, "failed to get fee calculator");
                    let {
                        context: n,
                        value: o
                    } = s.result;
                    return {
                        context: n,
                        value: null !== o ? o.feeCalculator : null
                    }
                }
                async getFeeForMessage(e, t) {
                    let r = R(e.serialize()).toString("base64"),
                        i = this._buildArgs([r], t),
                        s = await this._rpcRequest("getFeeForMessage", i),
                        n = (0, m.Ue)(s, ez((0, m.AG)((0, m.Rx)())));
                    if ("error" in n) throw new eA(n.error, "failed to get fee for message");
                    if (null === n.result) throw Error("invalid blockhash");
                    return n.result
                }
                async getRecentPrioritizationFees(e) {
                    let t = e ? .lockedWritableAccounts ? .map(e => e.toBase58()),
                        r = t ? .length ? [t] : [],
                        i = await this._rpcRequest("getRecentPrioritizationFees", r),
                        s = (0, m.Ue)(i, e1);
                    if ("error" in s) throw new eA(s.error, "failed to get recent prioritization fees");
                    return s.result
                }
                async getRecentBlockhash(e) {
                    try {
                        return (await this.getRecentBlockhashAndContext(e)).value
                    } catch (e) {
                        throw Error("failed to get recent blockhash: " + e)
                    }
                }
                async getLatestBlockhash(e) {
                    try {
                        return (await this.getLatestBlockhashAndContext(e)).value
                    } catch (e) {
                        throw Error("failed to get recent blockhash: " + e)
                    }
                }
                async getLatestBlockhashAndContext(e) {
                    let {
                        commitment: t,
                        config: r
                    } = eC(e), i = this._buildArgs([], t, void 0, r), s = await this._rpcRequest("getLatestBlockhash", i), n = (0, m.Ue)(s, t0);
                    if ("error" in n) throw new eA(n.error, "failed to get latest blockhash");
                    return n.result
                }
                async isBlockhashValid(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = this._buildArgs([e], r, void 0, i), n = await this._rpcRequest("isBlockhashValid", s), o = (0, m.Ue)(n, t1);
                    if ("error" in o) throw new eA(o.error, "failed to determine if the blockhash `" + e + "`is valid");
                    return o.result
                }
                async getVersion() {
                    let e = await this._rpcRequest("getVersion", []),
                        t = (0, m.Ue)(e, eL(eD));
                    if ("error" in t) throw new eA(t.error, "failed to get version");
                    return t.result
                }
                async getGenesisHash() {
                    let e = await this._rpcRequest("getGenesisHash", []),
                        t = (0, m.Ue)(e, eL((0, m.Z_)()));
                    if ("error" in t) throw new eA(t.error, "failed to get genesis hash");
                    return t.result
                }
                async getBlock(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = this._buildArgsAtLeastConfirmed([e], r, void 0, i), n = await this._rpcRequest("getBlock", s);
                    try {
                        switch (i ? .transactionDetails) {
                            case "accounts":
                                {
                                    let e = (0, m.Ue)(n, tZ);
                                    if ("error" in e) throw e.error;
                                    return e.result
                                }
                            case "none":
                                {
                                    let e = (0, m.Ue)(n, tJ);
                                    if ("error" in e) throw e.error;
                                    return e.result
                                }
                            default:
                                {
                                    let e = (0, m.Ue)(n, tM);
                                    if ("error" in e) throw e.error;
                                    let {
                                        result: t
                                    } = e;
                                    return t ? { ...t,
                                        transactions: t.transactions.map(({
                                            transaction: e,
                                            meta: t,
                                            version: r
                                        }) => ({
                                            meta: t,
                                            transaction: { ...e,
                                                message: eO(r, e.message)
                                            },
                                            version: r
                                        }))
                                    } : null
                                }
                        }
                    } catch (e) {
                        throw new eA(e, "failed to get confirmed block")
                    }
                }
                async getParsedBlock(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = this._buildArgsAtLeastConfirmed([e], r, "jsonParsed", i), n = await this._rpcRequest("getBlock", s);
                    try {
                        switch (i ? .transactionDetails) {
                            case "accounts":
                                {
                                    let e = (0, m.Ue)(n, t$);
                                    if ("error" in e) throw e.error;
                                    return e.result
                                }
                            case "none":
                                {
                                    let e = (0, m.Ue)(n, tH);
                                    if ("error" in e) throw e.error;
                                    return e.result
                                }
                            default:
                                {
                                    let e = (0, m.Ue)(n, tX);
                                    if ("error" in e) throw e.error;
                                    return e.result
                                }
                        }
                    } catch (e) {
                        throw new eA(e, "failed to get block")
                    }
                }
                async getBlockProduction(e) {
                    let t, r;
                    if ("string" == typeof e) r = e;
                    else if (e) {
                        let {
                            commitment: i,
                            ...s
                        } = e;
                        r = i, t = s
                    }
                    let i = this._buildArgs([], r, "base64", t),
                        s = await this._rpcRequest("getBlockProduction", i),
                        n = (0, m.Ue)(s, eQ);
                    if ("error" in n) throw new eA(n.error, "failed to get block production information");
                    return n.result
                }
                async getTransaction(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = this._buildArgsAtLeastConfirmed([e], r, void 0, i), n = await this._rpcRequest("getTransaction", s), o = (0, m.Ue)(n, tV);
                    if ("error" in o) throw new eA(o.error, "failed to get transaction");
                    let a = o.result;
                    return a ? { ...a,
                        transaction: { ...a.transaction,
                            message: eO(a.version, a.transaction.message)
                        }
                    } : a
                }
                async getParsedTransaction(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = this._buildArgsAtLeastConfirmed([e], r, "jsonParsed", i), n = await this._rpcRequest("getTransaction", s), o = (0, m.Ue)(n, tQ);
                    if ("error" in o) throw new eA(o.error, "failed to get transaction");
                    return o.result
                }
                async getParsedTransactions(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = e.map(e => ({
                        methodName: "getTransaction",
                        args: this._buildArgsAtLeastConfirmed([e], r, "jsonParsed", i)
                    }));
                    return (await this._rpcBatchRequest(s)).map(e => {
                        let t = (0, m.Ue)(e, tQ);
                        if ("error" in t) throw new eA(t.error, "failed to get transactions");
                        return t.result
                    })
                }
                async getTransactions(e, t) {
                    let {
                        commitment: r,
                        config: i
                    } = eC(t), s = e.map(e => ({
                        methodName: "getTransaction",
                        args: this._buildArgsAtLeastConfirmed([e], r, void 0, i)
                    }));
                    return (await this._rpcBatchRequest(s)).map(e => {
                        let t = (0, m.Ue)(e, tV);
                        if ("error" in t) throw new eA(t.error, "failed to get transactions");
                        let r = t.result;
                        return r ? { ...r,
                            transaction: { ...r.transaction,
                                message: eO(r.version, r.transaction.message)
                            }
                        } : r
                    })
                }
                async getConfirmedBlock(e, t) {
                    let r = this._buildArgsAtLeastConfirmed([e], t),
                        i = await this._rpcRequest("getConfirmedBlock", r),
                        s = (0, m.Ue)(i, tF);
                    if ("error" in s) throw new eA(s.error, "failed to get confirmed block");
                    let n = s.result;
                    if (!n) throw Error("Confirmed block " + e + " not found");
                    let o = { ...n,
                        transactions: n.transactions.map(({
                            transaction: e,
                            meta: t
                        }) => {
                            let r = new H(e.message);
                            return {
                                meta: t,
                                transaction: { ...e,
                                    message: r
                                }
                            }
                        })
                    };
                    return { ...o,
                        transactions: o.transactions.map(({
                            transaction: e,
                            meta: t
                        }) => ({
                            meta: t,
                            transaction: ee.populate(e.message, e.signatures)
                        }))
                    }
                }
                async getBlocks(e, t, r) {
                    let i = this._buildArgsAtLeastConfirmed(void 0 !== t ? [e, t] : [e], r),
                        s = await this._rpcRequest("getBlocks", i),
                        n = (0, m.Ue)(s, eL((0, m.IX)((0, m.Rx)())));
                    if ("error" in n) throw new eA(n.error, "failed to get blocks");
                    return n.result
                }
                async getBlockSignatures(e, t) {
                    let r = this._buildArgsAtLeastConfirmed([e], t, void 0, {
                            transactionDetails: "signatures",
                            rewards: !1
                        }),
                        i = await this._rpcRequest("getBlock", r),
                        s = (0, m.Ue)(i, tD);
                    if ("error" in s) throw new eA(s.error, "failed to get block");
                    let n = s.result;
                    if (!n) throw Error("Block " + e + " not found");
                    return n
                }
                async getConfirmedBlockSignatures(e, t) {
                    let r = this._buildArgsAtLeastConfirmed([e], t, void 0, {
                            transactionDetails: "signatures",
                            rewards: !1
                        }),
                        i = await this._rpcRequest("getConfirmedBlock", r),
                        s = (0, m.Ue)(i, tD);
                    if ("error" in s) throw new eA(s.error, "failed to get confirmed block");
                    let n = s.result;
                    if (!n) throw Error("Confirmed block " + e + " not found");
                    return n
                }
                async getConfirmedTransaction(e, t) {
                    let r = this._buildArgsAtLeastConfirmed([e], t),
                        i = await this._rpcRequest("getConfirmedTransaction", r),
                        s = (0, m.Ue)(i, tV);
                    if ("error" in s) throw new eA(s.error, "failed to get transaction");
                    let n = s.result;
                    if (!n) return n;
                    let o = new H(n.transaction.message),
                        a = n.transaction.signatures;
                    return { ...n,
                        transaction: ee.populate(o, a)
                    }
                }
                async getParsedConfirmedTransaction(e, t) {
                    let r = this._buildArgsAtLeastConfirmed([e], t, "jsonParsed"),
                        i = await this._rpcRequest("getConfirmedTransaction", r),
                        s = (0, m.Ue)(i, tQ);
                    if ("error" in s) throw new eA(s.error, "failed to get confirmed transaction");
                    return s.result
                }
                async getParsedConfirmedTransactions(e, t) {
                    let r = e.map(e => ({
                        methodName: "getConfirmedTransaction",
                        args: this._buildArgsAtLeastConfirmed([e], t, "jsonParsed")
                    }));
                    return (await this._rpcBatchRequest(r)).map(e => {
                        let t = (0, m.Ue)(e, tQ);
                        if ("error" in t) throw new eA(t.error, "failed to get confirmed transactions");
                        return t.result
                    })
                }
                async getConfirmedSignaturesForAddress(e, t, r) {
                    let i = {},
                        s = await this.getFirstAvailableBlock();
                    for (; !("until" in i) && !(--t <= 0) && !(t < s);) try {
                        let e = await this.getConfirmedBlockSignatures(t, "finalized");
                        e.signatures.length > 0 && (i.until = e.signatures[e.signatures.length - 1].toString())
                    } catch (e) {
                        if (e instanceof Error && e.message.includes("skipped")) continue;
                        throw e
                    }
                    let n = await this.getSlot("finalized");
                    for (; !("before" in i) && !(++r > n);) try {
                        let e = await this.getConfirmedBlockSignatures(r);
                        e.signatures.length > 0 && (i.before = e.signatures[e.signatures.length - 1].toString())
                    } catch (e) {
                        if (e instanceof Error && e.message.includes("skipped")) continue;
                        throw e
                    }
                    return (await this.getConfirmedSignaturesForAddress2(e, i)).map(e => e.signature)
                }
                async getConfirmedSignaturesForAddress2(e, t, r) {
                    let i = this._buildArgsAtLeastConfirmed([e.toBase58()], r, void 0, t),
                        s = await this._rpcRequest("getConfirmedSignaturesForAddress2", i),
                        n = (0, m.Ue)(s, tu);
                    if ("error" in n) throw new eA(n.error, "failed to get confirmed signatures for address");
                    return n.result
                }
                async getSignaturesForAddress(e, t, r) {
                    let i = this._buildArgsAtLeastConfirmed([e.toBase58()], r, void 0, t),
                        s = await this._rpcRequest("getSignaturesForAddress", i),
                        n = (0, m.Ue)(s, tl);
                    if ("error" in n) throw new eA(n.error, "failed to get signatures for address");
                    return n.result
                }
                async getAddressLookupTable(e, t) {
                    let {
                        context: r,
                        value: i
                    } = await this.getAccountInfoAndContext(e, t), s = null;
                    return null !== i && (s = new eB({
                        key: e,
                        state: eB.deserialize(i.data)
                    })), {
                        context: r,
                        value: s
                    }
                }
                async getNonceAndContext(e, t) {
                    let {
                        context: r,
                        value: i
                    } = await this.getAccountInfoAndContext(e, t), s = null;
                    return null !== i && (s = eh.fromAccountData(i.data)), {
                        context: r,
                        value: s
                    }
                }
                async getNonce(e, t) {
                    return await this.getNonceAndContext(e, t).then(e => e.value).catch(t => {
                        throw Error("failed to get nonce for account " + e.toBase58() + ": " + t)
                    })
                }
                async requestAirdrop(e, t) {
                    let r = await this._rpcRequest("requestAirdrop", [e.toBase58(), t]),
                        i = (0, m.Ue)(r, t4);
                    if ("error" in i) throw new eA(i.error, `airdrop to ${e.toBase58()} failed`);
                    return i.result
                }
                async _blockhashWithExpiryBlockHeight(e) {
                    if (!e) {
                        for (; this._pollingBlockhash;) await ea(100);
                        let e = Date.now() - this._blockhashInfo.lastFetch;
                        if (null !== this._blockhashInfo.latestBlockhash && !(e >= 3e4)) return this._blockhashInfo.latestBlockhash
                    }
                    return await this._pollNewBlockhash()
                }
                async _pollNewBlockhash() {
                    this._pollingBlockhash = !0;
                    try {
                        let e = Date.now(),
                            t = this._blockhashInfo.latestBlockhash,
                            r = t ? t.blockhash : null;
                        for (let e = 0; e < 50; e++) {
                            let e = await this.getLatestBlockhash("finalized");
                            if (r !== e.blockhash) return this._blockhashInfo = {
                                latestBlockhash: e,
                                lastFetch: Date.now(),
                                transactionSignatures: [],
                                simulatedSignatures: []
                            }, e;
                            await ea(200)
                        }
                        throw Error(`Unable to obtain a new blockhash after ${Date.now()-e}ms`)
                    } finally {
                        this._pollingBlockhash = !1
                    }
                }
                async getStakeMinimumDelegation(e) {
                    let {
                        commitment: t,
                        config: r
                    } = eC(e), i = this._buildArgs([], t, "base64", r), s = await this._rpcRequest("getStakeMinimumDelegation", i), n = (0, m.Ue)(s, ez((0, m.Rx)()));
                    if ("error" in n) throw new eA(n.error, "failed to get stake minimum delegation");
                    return n.result
                }
                async simulateTransaction(e, t, r) {
                    let i;
                    if ("message" in e) {
                        let i = e.serialize(),
                            s = o.Buffer.from(i).toString("base64");
                        if (Array.isArray(t) || void 0 !== r) throw Error("Invalid arguments");
                        let n = t || {};
                        n.encoding = "base64", "commitment" in n || (n.commitment = this.commitment);
                        let a = await this._rpcRequest("simulateTransaction", [s, n]),
                            c = (0, m.Ue)(a, eV);
                        if ("error" in c) throw Error("failed to simulate transaction: " + c.error.message);
                        return c.result
                    }
                    if (e instanceof ee ? ((i = new ee).feePayer = e.feePayer, i.instructions = e.instructions, i.nonceInfo = e.nonceInfo, i.signatures = e.signatures) : (i = ee.populate(e))._message = i._json = void 0, void 0 !== t && !Array.isArray(t)) throw Error("Invalid arguments");
                    if (i.nonceInfo && t) i.sign(...t);
                    else {
                        let e = this._disableBlockhashCaching;
                        for (;;) {
                            let r = await this._blockhashWithExpiryBlockHeight(e);
                            if (i.lastValidBlockHeight = r.lastValidBlockHeight, i.recentBlockhash = r.blockhash, !t) break;
                            if (i.sign(...t), !i.signature) throw Error("!signature");
                            let s = i.signature.toString("base64");
                            if (this._blockhashInfo.simulatedSignatures.includes(s) || this._blockhashInfo.transactionSignatures.includes(s)) e = !0;
                            else {
                                this._blockhashInfo.simulatedSignatures.push(s);
                                break
                            }
                        }
                    }
                    let s = i._compile(),
                        n = s.serialize(),
                        a = i._serialize(n).toString("base64"),
                        c = {
                            encoding: "base64",
                            commitment: this.commitment
                        };
                    if (r) {
                        let e = (Array.isArray(r) ? r : s.nonProgramIds()).map(e => e.toBase58());
                        c.accounts = {
                            encoding: "base64",
                            addresses: e
                        }
                    }
                    t && (c.sigVerify = !0);
                    let u = await this._rpcRequest("simulateTransaction", [a, c]),
                        l = (0, m.Ue)(u, eV);
                    if ("error" in l) {
                        let e;
                        if ("data" in l.error && (e = l.error.data.logs) && Array.isArray(e)) {
                            let t = "\n    ",
                                r = t + e.join(t);
                            console.error(l.error.message, r)
                        }
                        throw new eI("failed to simulate transaction: " + l.error.message, e)
                    }
                    return l.result
                }
                async sendTransaction(e, t, r) {
                    if ("version" in e) {
                        if (t && Array.isArray(t)) throw Error("Invalid arguments");
                        let r = e.serialize();
                        return await this.sendRawTransaction(r, t)
                    }
                    if (void 0 === t || !Array.isArray(t)) throw Error("Invalid arguments");
                    if (e.nonceInfo) e.sign(...t);
                    else {
                        let r = this._disableBlockhashCaching;
                        for (;;) {
                            let i = await this._blockhashWithExpiryBlockHeight(r);
                            if (e.lastValidBlockHeight = i.lastValidBlockHeight, e.recentBlockhash = i.blockhash, e.sign(...t), !e.signature) throw Error("!signature");
                            let s = e.signature.toString("base64");
                            if (this._blockhashInfo.transactionSignatures.includes(s)) r = !0;
                            else {
                                this._blockhashInfo.transactionSignatures.push(s);
                                break
                            }
                        }
                    }
                    let i = e.serialize();
                    return await this.sendRawTransaction(i, r)
                }
                async sendRawTransaction(e, t) {
                    let r = R(e).toString("base64");
                    return await this.sendEncodedTransaction(r, t)
                }
                async sendEncodedTransaction(e, t) {
                    let r = {
                            encoding: "base64"
                        },
                        i = t && t.skipPreflight,
                        s = !0 === i ? "processed" : t && t.preflightCommitment || this.commitment;
                    t && null != t.maxRetries && (r.maxRetries = t.maxRetries), t && null != t.minContextSlot && (r.minContextSlot = t.minContextSlot), i && (r.skipPreflight = i), s && (r.preflightCommitment = s);
                    let n = await this._rpcRequest("sendTransaction", [e, r]),
                        o = (0, m.Ue)(n, t6);
                    if ("error" in o) {
                        let e;
                        throw "data" in o.error && (e = o.error.data.logs), new eI("failed to send transaction: " + o.error.message, e)
                    }
                    return o.result
                }
                _wsOnOpen() {
                    this._rpcWebSocketConnected = !0, this._rpcWebSocketHeartbeat = setInterval(() => {
                        (async () => {
                            try {
                                await this._rpcWebSocket.notify("ping")
                            } catch {}
                        })()
                    }, 5e3), this._updateSubscriptions()
                }
                _wsOnError(e) {
                    this._rpcWebSocketConnected = !1, console.error("ws error:", e.message)
                }
                _wsOnClose(e) {
                    if (this._rpcWebSocketConnected = !1, this._rpcWebSocketGeneration = (this._rpcWebSocketGeneration + 1) % Number.MAX_SAFE_INTEGER, this._rpcWebSocketIdleTimeout && (clearTimeout(this._rpcWebSocketIdleTimeout), this._rpcWebSocketIdleTimeout = null), this._rpcWebSocketHeartbeat && (clearInterval(this._rpcWebSocketHeartbeat), this._rpcWebSocketHeartbeat = null), 1e3 === e) {
                        this._updateSubscriptions();
                        return
                    }
                    this._subscriptionCallbacksByServerSubscriptionId = {}, Object.entries(this._subscriptionsByHash).forEach(([e, t]) => {
                        this._setSubscription(e, { ...t,
                            state: "pending"
                        })
                    })
                }
                _setSubscription(e, t) {
                    let r = this._subscriptionsByHash[e] ? .state;
                    if (this._subscriptionsByHash[e] = t, r !== t.state) {
                        let r = this._subscriptionStateChangeCallbacksByHash[e];
                        r && r.forEach(e => {
                            try {
                                e(t.state)
                            } catch {}
                        })
                    }
                }
                _onSubscriptionStateChange(e, t) {
                    let r = this._subscriptionHashByClientSubscriptionId[e];
                    if (null == r) return () => {};
                    let i = this._subscriptionStateChangeCallbacksByHash[r] || = new Set;
                    return i.add(t), () => {
                        i.delete(t), 0 === i.size && delete this._subscriptionStateChangeCallbacksByHash[r]
                    }
                }
                async _updateSubscriptions() {
                    if (0 === Object.keys(this._subscriptionsByHash).length) {
                        this._rpcWebSocketConnected && (this._rpcWebSocketConnected = !1, this._rpcWebSocketIdleTimeout = setTimeout(() => {
                            this._rpcWebSocketIdleTimeout = null;
                            try {
                                this._rpcWebSocket.close()
                            } catch (e) {
                                e instanceof Error && console.log(`Error when closing socket connection: ${e.message}`)
                            }
                        }, 500));
                        return
                    }
                    if (null !== this._rpcWebSocketIdleTimeout && (clearTimeout(this._rpcWebSocketIdleTimeout), this._rpcWebSocketIdleTimeout = null, this._rpcWebSocketConnected = !0), !this._rpcWebSocketConnected) {
                        this._rpcWebSocket.connect();
                        return
                    }
                    let e = this._rpcWebSocketGeneration,
                        t = () => e === this._rpcWebSocketGeneration;
                    await Promise.all(Object.keys(this._subscriptionsByHash).map(async e => {
                        let r = this._subscriptionsByHash[e];
                        if (void 0 !== r) switch (r.state) {
                            case "pending":
                            case "unsubscribed":
                                if (0 === r.callbacks.size) {
                                    delete this._subscriptionsByHash[e], "unsubscribed" === r.state && delete this._subscriptionCallbacksByServerSubscriptionId[r.serverSubscriptionId], await this._updateSubscriptions();
                                    return
                                }
                                await (async () => {
                                    let {
                                        args: i,
                                        method: s
                                    } = r;
                                    try {
                                        this._setSubscription(e, { ...r,
                                            state: "subscribing"
                                        });
                                        let t = await this._rpcWebSocket.call(s, i);
                                        this._setSubscription(e, { ...r,
                                            serverSubscriptionId: t,
                                            state: "subscribed"
                                        }), this._subscriptionCallbacksByServerSubscriptionId[t] = r.callbacks, await this._updateSubscriptions()
                                    } catch (n) {
                                        if (n instanceof Error && console.error(`${s} error for argument`, i, n.message), !t()) return;
                                        this._setSubscription(e, { ...r,
                                            state: "pending"
                                        }), await this._updateSubscriptions()
                                    }
                                })();
                                break;
                            case "subscribed":
                                0 === r.callbacks.size && await (async () => {
                                    let {
                                        serverSubscriptionId: i,
                                        unsubscribeMethod: s
                                    } = r;
                                    if (this._subscriptionsAutoDisposedByRpc.has(i)) this._subscriptionsAutoDisposedByRpc.delete(i);
                                    else {
                                        this._setSubscription(e, { ...r,
                                            state: "unsubscribing"
                                        }), this._setSubscription(e, { ...r,
                                            state: "unsubscribing"
                                        });
                                        try {
                                            await this._rpcWebSocket.call(s, [i])
                                        } catch (i) {
                                            if (i instanceof Error && console.error(`${s} error:`, i.message), !t()) return;
                                            this._setSubscription(e, { ...r,
                                                state: "subscribed"
                                            }), await this._updateSubscriptions();
                                            return
                                        }
                                    }
                                    this._setSubscription(e, { ...r,
                                        state: "unsubscribed"
                                    }), await this._updateSubscriptions()
                                })()
                        }
                    }))
                }
                _handleServerNotification(e, t) {
                    let r = this._subscriptionCallbacksByServerSubscriptionId[e];
                    void 0 !== r && r.forEach(e => {
                        try {
                            e(...t)
                        } catch (e) {
                            console.error(e)
                        }
                    })
                }
                _wsOnAccountNotification(e) {
                    let {
                        result: t,
                        subscription: r
                    } = (0, m.Ue)(e, td);
                    this._handleServerNotification(r, [t.value, t.context])
                }
                _makeSubscription(e, t) {
                    let r = this._nextClientSubscriptionId++,
                        i = ew([e.method, t]),
                        s = this._subscriptionsByHash[i];
                    return void 0 === s ? this._subscriptionsByHash[i] = { ...e,
                        args: t,
                        callbacks: new Set([e.callback]),
                        state: "pending"
                    } : s.callbacks.add(e.callback), this._subscriptionHashByClientSubscriptionId[r] = i, this._subscriptionDisposeFunctionsByClientSubscriptionId[r] = async () => {
                        delete this._subscriptionDisposeFunctionsByClientSubscriptionId[r], delete this._subscriptionHashByClientSubscriptionId[r];
                        let t = this._subscriptionsByHash[i];
                        M(void 0 !== t, `Could not find a \`Subscription\` when tearing down client subscription #${r}`), t.callbacks.delete(e.callback), await this._updateSubscriptions()
                    }, this._updateSubscriptions(), r
                }
                onAccountChange(e, t, r) {
                    let i = this._buildArgs([e.toBase58()], r || this._commitment || "finalized", "base64");
                    return this._makeSubscription({
                        callback: t,
                        method: "accountSubscribe",
                        unsubscribeMethod: "accountUnsubscribe"
                    }, i)
                }
                async removeAccountChangeListener(e) {
                    await this._unsubscribeClientSubscription(e, "account change")
                }
                _wsOnProgramAccountNotification(e) {
                    let {
                        result: t,
                        subscription: r
                    } = (0, m.Ue)(e, tg);
                    this._handleServerNotification(r, [{
                        accountId: t.value.pubkey,
                        accountInfo: t.value.account
                    }, t.context])
                }
                onProgramAccountChange(e, t, r, i) {
                    let s = this._buildArgs([e.toBase58()], r || this._commitment || "finalized", "base64", i ? {
                        filters: i
                    } : void 0);
                    return this._makeSubscription({
                        callback: t,
                        method: "programSubscribe",
                        unsubscribeMethod: "programUnsubscribe"
                    }, s)
                }
                async removeProgramAccountChangeListener(e) {
                    await this._unsubscribeClientSubscription(e, "program account change")
                }
                onLogs(e, t, r) {
                    let i = this._buildArgs(["object" == typeof e ? {
                        mentions: [e.toString()]
                    } : e], r || this._commitment || "finalized");
                    return this._makeSubscription({
                        callback: t,
                        method: "logsSubscribe",
                        unsubscribeMethod: "logsUnsubscribe"
                    }, i)
                }
                async removeOnLogsListener(e) {
                    await this._unsubscribeClientSubscription(e, "logs")
                }
                _wsOnLogsNotification(e) {
                    let {
                        result: t,
                        subscription: r
                    } = (0, m.Ue)(e, t9);
                    this._handleServerNotification(r, [t.value, t.context])
                }
                _wsOnSlotNotification(e) {
                    let {
                        result: t,
                        subscription: r
                    } = (0, m.Ue)(e, tf);
                    this._handleServerNotification(r, [t])
                }
                onSlotChange(e) {
                    return this._makeSubscription({
                        callback: e,
                        method: "slotSubscribe",
                        unsubscribeMethod: "slotUnsubscribe"
                    }, [])
                }
                async removeSlotChangeListener(e) {
                    await this._unsubscribeClientSubscription(e, "slot change")
                }
                _wsOnSlotUpdatesNotification(e) {
                    let {
                        result: t,
                        subscription: r
                    } = (0, m.Ue)(e, tb);
                    this._handleServerNotification(r, [t])
                }
                onSlotUpdate(e) {
                    return this._makeSubscription({
                        callback: e,
                        method: "slotsUpdatesSubscribe",
                        unsubscribeMethod: "slotsUpdatesUnsubscribe"
                    }, [])
                }
                async removeSlotUpdateListener(e) {
                    await this._unsubscribeClientSubscription(e, "slot update")
                }
                async _unsubscribeClientSubscription(e, t) {
                    let r = this._subscriptionDisposeFunctionsByClientSubscriptionId[e];
                    r ? await r() : console.warn(`Ignored unsubscribe request because an active subscription with id \`${e}\` for '${t}' events could not be found.`)
                }
                _buildArgs(e, t, r, i) {
                    let s = t || this._commitment;
                    if (s || r || i) {
                        let t = {};
                        r && (t.encoding = r), s && (t.commitment = s), i && (t = Object.assign(t, i)), e.push(t)
                    }
                    return e
                }
                _buildArgsAtLeastConfirmed(e, t, r, i) {
                    let s = t || this._commitment;
                    if (s && !["confirmed", "finalized"].includes(s)) throw Error("Using Connection with default commitment: `" + this._commitment + "`, but method requires at least `confirmed`");
                    return this._buildArgs(e, t, r, i)
                }
                _wsOnSignatureNotification(e) {
                    let {
                        result: t,
                        subscription: r
                    } = (0, m.Ue)(e, ty);
                    "receivedSignature" !== t.value && this._subscriptionsAutoDisposedByRpc.add(r), this._handleServerNotification(r, "receivedSignature" === t.value ? [{
                        type: "received"
                    }, t.context] : [{
                        type: "status",
                        result: t.value
                    }, t.context])
                }
                onSignature(e, t, r) {
                    let i = this._buildArgs([e], r || this._commitment || "finalized"),
                        s = this._makeSubscription({
                            callback: (e, r) => {
                                if ("status" === e.type) {
                                    t(e.result, r);
                                    try {
                                        this.removeSignatureListener(s)
                                    } catch (e) {}
                                }
                            },
                            method: "signatureSubscribe",
                            unsubscribeMethod: "signatureUnsubscribe"
                        }, i);
                    return s
                }
                onSignatureWithOptions(e, t, r) {
                    let {
                        commitment: i,
                        ...s
                    } = { ...r,
                        commitment: r && r.commitment || this._commitment || "finalized"
                    }, n = this._buildArgs([e], i, void 0, s), o = this._makeSubscription({
                        callback: (e, r) => {
                            t(e, r);
                            try {
                                this.removeSignatureListener(o)
                            } catch (e) {}
                        },
                        method: "signatureSubscribe",
                        unsubscribeMethod: "signatureUnsubscribe"
                    }, n);
                    return o
                }
                async removeSignatureListener(e) {
                    await this._unsubscribeClientSubscription(e, "signature result")
                }
                _wsOnRootNotification(e) {
                    let {
                        result: t,
                        subscription: r
                    } = (0, m.Ue)(e, tk);
                    this._handleServerNotification(r, [t])
                }
                onRootChange(e) {
                    return this._makeSubscription({
                        callback: e,
                        method: "rootSubscribe",
                        unsubscribeMethod: "rootUnsubscribe"
                    }, [])
                }
                async removeRootChangeListener(e) {
                    await this._unsubscribeClientSubscription(e, "root change")
                }
            }
            class rt {
                constructor(e) {
                    this._keypair = void 0, this._keypair = e ? ? I()
                }
                static generate() {
                    return new rt(I())
                }
                static fromSecretKey(e, t) {
                    if (64 !== e.byteLength) throw Error("bad secret key size");
                    let r = e.slice(32, 64);
                    if (!t || !t.skipValidation) {
                        let t = A(e.slice(0, 32));
                        for (let e = 0; e < 32; e++)
                            if (r[e] !== t[e]) throw Error("provided secretKey is invalid")
                    }
                    return new rt({
                        publicKey: r,
                        secretKey: e
                    })
                }
                static fromSeed(e) {
                    let t = A(e),
                        r = new Uint8Array(64);
                    return r.set(e), r.set(t, 32), new rt({
                        publicKey: t,
                        secretKey: r
                    })
                }
                get publicKey() {
                    return new W(this._keypair.publicKey)
                }
                get secretKey() {
                    return new Uint8Array(this._keypair.secretKey)
                }
            }
            let rr = Object.freeze({
                CreateLookupTable: {
                    index: 0,
                    layout: p.n_([p.Jq("instruction"), ep("recentSlot"), p.u8("bumpSeed")])
                },
                FreezeLookupTable: {
                    index: 1,
                    layout: p.n_([p.Jq("instruction")])
                },
                ExtendLookupTable: {
                    index: 2,
                    layout: p.n_([p.Jq("instruction"), ep(), p.A9(K(), p.cv(p.Jq(), -8), "addresses")])
                },
                DeactivateLookupTable: {
                    index: 3,
                    layout: p.n_([p.Jq("instruction")])
                },
                CloseLookupTable: {
                    index: 4,
                    layout: p.n_([p.Jq("instruction")])
                }
            });
            class ri {
                constructor() {}
                static createLookupTable(e) {
                    let [t, r] = W.findProgramAddressSync([e.authority.toBuffer(), (0, f.k$)(BigInt(e.recentSlot), 8)], this.programId), i = ec(rr.CreateLookupTable, {
                        recentSlot: BigInt(e.recentSlot),
                        bumpSeed: r
                    }), s = [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: e.authority,
                        isSigner: !0,
                        isWritable: !1
                    }, {
                        pubkey: e.payer,
                        isSigner: !0,
                        isWritable: !0
                    }, {
                        pubkey: em.programId,
                        isSigner: !1,
                        isWritable: !1
                    }];
                    return [new Y({
                        programId: this.programId,
                        keys: s,
                        data: i
                    }), t]
                }
                static freezeLookupTable(e) {
                    let t = ec(rr.FreezeLookupTable),
                        r = [{
                            pubkey: e.lookupTable,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: e.authority,
                            isSigner: !0,
                            isWritable: !1
                        }];
                    return new Y({
                        programId: this.programId,
                        keys: r,
                        data: t
                    })
                }
                static extendLookupTable(e) {
                    let t = ec(rr.ExtendLookupTable, {
                            addresses: e.addresses.map(e => e.toBytes())
                        }),
                        r = [{
                            pubkey: e.lookupTable,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: e.authority,
                            isSigner: !0,
                            isWritable: !1
                        }];
                    return e.payer && r.push({
                        pubkey: e.payer,
                        isSigner: !0,
                        isWritable: !0
                    }, {
                        pubkey: em.programId,
                        isSigner: !1,
                        isWritable: !1
                    }), new Y({
                        programId: this.programId,
                        keys: r,
                        data: t
                    })
                }
                static deactivateLookupTable(e) {
                    let t = ec(rr.DeactivateLookupTable),
                        r = [{
                            pubkey: e.lookupTable,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: e.authority,
                            isSigner: !0,
                            isWritable: !1
                        }];
                    return new Y({
                        programId: this.programId,
                        keys: r,
                        data: t
                    })
                }
                static closeLookupTable(e) {
                    let t = ec(rr.CloseLookupTable),
                        r = [{
                            pubkey: e.lookupTable,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: e.authority,
                            isSigner: !0,
                            isWritable: !1
                        }, {
                            pubkey: e.recipient,
                            isSigner: !1,
                            isWritable: !0
                        }];
                    return new Y({
                        programId: this.programId,
                        keys: r,
                        data: t
                    })
                }
            }
            ri.programId = new W("AddressLookupTab1e1111111111111111111111111");
            let rs = Object.freeze({
                RequestUnits: {
                    index: 0,
                    layout: p.n_([p.u8("instruction"), p.Jq("units"), p.Jq("additionalFee")])
                },
                RequestHeapFrame: {
                    index: 1,
                    layout: p.n_([p.u8("instruction"), p.Jq("bytes")])
                },
                SetComputeUnitLimit: {
                    index: 2,
                    layout: p.n_([p.u8("instruction"), p.Jq("units")])
                },
                SetComputeUnitPrice: {
                    index: 3,
                    layout: p.n_([p.u8("instruction"), ep("microLamports")])
                }
            });
            class rn {
                constructor() {}
                static requestUnits(e) {
                    let t = ec(rs.RequestUnits, e);
                    return new Y({
                        keys: [],
                        programId: this.programId,
                        data: t
                    })
                }
                static requestHeapFrame(e) {
                    let t = ec(rs.RequestHeapFrame, e);
                    return new Y({
                        keys: [],
                        programId: this.programId,
                        data: t
                    })
                }
                static setComputeUnitLimit(e) {
                    let t = ec(rs.SetComputeUnitLimit, e);
                    return new Y({
                        keys: [],
                        programId: this.programId,
                        data: t
                    })
                }
                static setComputeUnitPrice(e) {
                    let t = ec(rs.SetComputeUnitPrice, {
                        microLamports: BigInt(e.microLamports)
                    });
                    return new Y({
                        keys: [],
                        programId: this.programId,
                        data: t
                    })
                }
            }
            rn.programId = new W("ComputeBudget111111111111111111111111111111");
            let ro = p.n_([p.u8("numSignatures"), p.u8("padding"), p.KB("signatureOffset"), p.KB("signatureInstructionIndex"), p.KB("publicKeyOffset"), p.KB("publicKeyInstructionIndex"), p.KB("messageDataOffset"), p.KB("messageDataSize"), p.KB("messageInstructionIndex")]);
            class ra {
                constructor() {}
                static createInstructionWithPublicKey(e) {
                    let {
                        publicKey: t,
                        message: r,
                        signature: i,
                        instructionIndex: s
                    } = e;
                    M(32 === t.length, `Public Key must be 32 bytes but received ${t.length} bytes`), M(64 === i.length, `Signature must be 64 bytes but received ${i.length} bytes`);
                    let n = ro.span,
                        a = n + t.length,
                        c = a + i.length,
                        u = o.Buffer.alloc(c + r.length),
                        l = null == s ? 65535 : s;
                    return ro.encode({
                        numSignatures: 1,
                        padding: 0,
                        signatureOffset: a,
                        signatureInstructionIndex: l,
                        publicKeyOffset: n,
                        publicKeyInstructionIndex: l,
                        messageDataOffset: c,
                        messageDataSize: r.length,
                        messageInstructionIndex: l
                    }, u), u.fill(t, n), u.fill(i, a), u.fill(r, c), new Y({
                        keys: [],
                        programId: ra.programId,
                        data: u
                    })
                }
                static createInstructionWithPrivateKey(e) {
                    let {
                        privateKey: t,
                        message: r,
                        instructionIndex: i
                    } = e;
                    M(64 === t.length, `Private key must be 64 bytes but received ${t.length} bytes`);
                    try {
                        let e = rt.fromSecretKey(t),
                            s = e.publicKey.toBytes(),
                            n = v(r, e.secretKey);
                        return this.createInstructionWithPublicKey({
                            publicKey: s,
                            message: r,
                            signature: n,
                            instructionIndex: i
                        })
                    } catch (e) {
                        throw Error(`Error creating instruction; ${e}`)
                    }
                }
            }
            ra.programId = new W("Ed25519SigVerify111111111111111111111111111");
            let rc = (e, t) => {
                let r = _.kA.sign(e, t);
                return [r.toCompactRawBytes(), r.recovery]
            };
            _.kA.utils.isValidPrivateKey;
            let ru = _.kA.getPublicKey,
                rl = p.n_([p.u8("numSignatures"), p.KB("signatureOffset"), p.u8("signatureInstructionIndex"), p.KB("ethAddressOffset"), p.u8("ethAddressInstructionIndex"), p.KB("messageDataOffset"), p.KB("messageDataSize"), p.u8("messageInstructionIndex"), p.Ik(20, "ethAddress"), p.Ik(64, "signature"), p.u8("recoveryId")]);
            class rd {
                constructor() {}
                static publicKeyToEthAddress(e) {
                    M(64 === e.length, `Public key must be 64 bytes but received ${e.length} bytes`);
                    try {
                        return o.Buffer.from((0, S.fr)(R(e))).slice(-20)
                    } catch (e) {
                        throw Error(`Error constructing Ethereum address: ${e}`)
                    }
                }
                static createInstructionWithPublicKey(e) {
                    let {
                        publicKey: t,
                        message: r,
                        signature: i,
                        recoveryId: s,
                        instructionIndex: n
                    } = e;
                    return rd.createInstructionWithEthAddress({
                        ethAddress: rd.publicKeyToEthAddress(t),
                        message: r,
                        signature: i,
                        recoveryId: s,
                        instructionIndex: n
                    })
                }
                static createInstructionWithEthAddress(e) {
                    let t;
                    let {
                        ethAddress: r,
                        message: i,
                        signature: s,
                        recoveryId: n,
                        instructionIndex: a = 0
                    } = e;
                    M(20 === (t = "string" == typeof r ? r.startsWith("0x") ? o.Buffer.from(r.substr(2), "hex") : o.Buffer.from(r, "hex") : r).length, `Address must be 20 bytes but received ${t.length} bytes`);
                    let c = 12 + t.length,
                        u = c + s.length + 1,
                        l = o.Buffer.alloc(rl.span + i.length);
                    return rl.encode({
                        numSignatures: 1,
                        signatureOffset: c,
                        signatureInstructionIndex: a,
                        ethAddressOffset: 12,
                        ethAddressInstructionIndex: a,
                        messageDataOffset: u,
                        messageDataSize: i.length,
                        messageInstructionIndex: a,
                        signature: R(s),
                        ethAddress: R(t),
                        recoveryId: n
                    }, l), l.fill(R(i), rl.span), new Y({
                        keys: [],
                        programId: rd.programId,
                        data: l
                    })
                }
                static createInstructionWithPrivateKey(e) {
                    let {
                        privateKey: t,
                        message: r,
                        instructionIndex: i
                    } = e;
                    M(32 === t.length, `Private key must be 32 bytes but received ${t.length} bytes`);
                    try {
                        let e = R(t),
                            s = ru(e, !1).slice(1),
                            n = o.Buffer.from((0, S.fr)(R(r))),
                            [a, c] = rc(n, e);
                        return this.createInstructionWithPublicKey({
                            publicKey: s,
                            message: r,
                            signature: a,
                            recoveryId: c,
                            instructionIndex: i
                        })
                    } catch (e) {
                        throw Error(`Error creating instruction; ${e}`)
                    }
                }
            }
            rd.programId = new W("KeccakSecp256k11111111111111111111111111111");
            let rh = new W("StakeConfig11111111111111111111111111111111");
            class rg {
                constructor(e, t, r) {
                    this.unixTimestamp = void 0, this.epoch = void 0, this.custodian = void 0, this.unixTimestamp = e, this.epoch = t, this.custodian = r
                }
            }
            rg.default = new rg(0, 0, W.default);
            let rp = Object.freeze({
                Initialize: {
                    index: 0,
                    layout: p.n_([p.Jq("instruction"), ((e = "authorized") => p.n_([K("staker"), K("withdrawer")], e))(), ((e = "lockup") => p.n_([p.gM("unixTimestamp"), p.gM("epoch"), K("custodian")], e))()])
                },
                Authorize: {
                    index: 1,
                    layout: p.n_([p.Jq("instruction"), K("newAuthorized"), p.Jq("stakeAuthorizationType")])
                },
                Delegate: {
                    index: 2,
                    layout: p.n_([p.Jq("instruction")])
                },
                Split: {
                    index: 3,
                    layout: p.n_([p.Jq("instruction"), p.gM("lamports")])
                },
                Withdraw: {
                    index: 4,
                    layout: p.n_([p.Jq("instruction"), p.gM("lamports")])
                },
                Deactivate: {
                    index: 5,
                    layout: p.n_([p.Jq("instruction")])
                },
                Merge: {
                    index: 7,
                    layout: p.n_([p.Jq("instruction")])
                },
                AuthorizeWithSeed: {
                    index: 8,
                    layout: p.n_([p.Jq("instruction"), K("newAuthorized"), p.Jq("stakeAuthorizationType"), N("authoritySeed"), K("authorityOwner")])
                }
            });
            Object.freeze({
                Staker: {
                    index: 0
                },
                Withdrawer: {
                    index: 1
                }
            });
            class rf {
                constructor() {}
                static initialize(e) {
                    let {
                        stakePubkey: t,
                        authorized: r,
                        lockup: i
                    } = e, s = i || rg.default, n = ec(rp.Initialize, {
                        authorized: {
                            staker: R(r.staker.toBuffer()),
                            withdrawer: R(r.withdrawer.toBuffer())
                        },
                        lockup: {
                            unixTimestamp: s.unixTimestamp,
                            epoch: s.epoch,
                            custodian: R(s.custodian.toBuffer())
                        }
                    });
                    return new Y({
                        keys: [{
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: es,
                            isSigner: !1,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: n
                    })
                }
                static createAccountWithSeed(e) {
                    let t = new ee;
                    t.add(em.createAccountWithSeed({
                        fromPubkey: e.fromPubkey,
                        newAccountPubkey: e.stakePubkey,
                        basePubkey: e.basePubkey,
                        seed: e.seed,
                        lamports: e.lamports,
                        space: this.space,
                        programId: this.programId
                    }));
                    let {
                        stakePubkey: r,
                        authorized: i,
                        lockup: s
                    } = e;
                    return t.add(this.initialize({
                        stakePubkey: r,
                        authorized: i,
                        lockup: s
                    }))
                }
                static createAccount(e) {
                    let t = new ee;
                    t.add(em.createAccount({
                        fromPubkey: e.fromPubkey,
                        newAccountPubkey: e.stakePubkey,
                        lamports: e.lamports,
                        space: this.space,
                        programId: this.programId
                    }));
                    let {
                        stakePubkey: r,
                        authorized: i,
                        lockup: s
                    } = e;
                    return t.add(this.initialize({
                        stakePubkey: r,
                        authorized: i,
                        lockup: s
                    }))
                }
                static delegate(e) {
                    let {
                        stakePubkey: t,
                        authorizedPubkey: r,
                        votePubkey: i
                    } = e, s = ec(rp.Delegate);
                    return new ee().add({
                        keys: [{
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: i,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: er,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: en,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: rh,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: r,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: s
                    })
                }
                static authorize(e) {
                    let {
                        stakePubkey: t,
                        authorizedPubkey: r,
                        newAuthorizedPubkey: i,
                        stakeAuthorizationType: s,
                        custodianPubkey: n
                    } = e, o = ec(rp.Authorize, {
                        newAuthorized: R(i.toBuffer()),
                        stakeAuthorizationType: s.index
                    }), a = [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: er,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: r,
                        isSigner: !0,
                        isWritable: !1
                    }];
                    return n && a.push({
                        pubkey: n,
                        isSigner: !0,
                        isWritable: !1
                    }), new ee().add({
                        keys: a,
                        programId: this.programId,
                        data: o
                    })
                }
                static authorizeWithSeed(e) {
                    let {
                        stakePubkey: t,
                        authorityBase: r,
                        authoritySeed: i,
                        authorityOwner: s,
                        newAuthorizedPubkey: n,
                        stakeAuthorizationType: o,
                        custodianPubkey: a
                    } = e, c = ec(rp.AuthorizeWithSeed, {
                        newAuthorized: R(n.toBuffer()),
                        stakeAuthorizationType: o.index,
                        authoritySeed: i,
                        authorityOwner: R(s.toBuffer())
                    }), u = [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: r,
                        isSigner: !0,
                        isWritable: !1
                    }, {
                        pubkey: er,
                        isSigner: !1,
                        isWritable: !1
                    }];
                    return a && u.push({
                        pubkey: a,
                        isSigner: !0,
                        isWritable: !1
                    }), new ee().add({
                        keys: u,
                        programId: this.programId,
                        data: c
                    })
                }
                static splitInstruction(e) {
                    let {
                        stakePubkey: t,
                        authorizedPubkey: r,
                        splitStakePubkey: i,
                        lamports: s
                    } = e, n = ec(rp.Split, {
                        lamports: s
                    });
                    return new Y({
                        keys: [{
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: i,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: r,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: n
                    })
                }
                static split(e, t) {
                    let r = new ee;
                    return r.add(em.createAccount({
                        fromPubkey: e.authorizedPubkey,
                        newAccountPubkey: e.splitStakePubkey,
                        lamports: t,
                        space: this.space,
                        programId: this.programId
                    })), r.add(this.splitInstruction(e))
                }
                static splitWithSeed(e, t) {
                    let {
                        stakePubkey: r,
                        authorizedPubkey: i,
                        splitStakePubkey: s,
                        basePubkey: n,
                        seed: o,
                        lamports: a
                    } = e, c = new ee;
                    return c.add(em.allocate({
                        accountPubkey: s,
                        basePubkey: n,
                        seed: o,
                        space: this.space,
                        programId: this.programId
                    })), t && t > 0 && c.add(em.transfer({
                        fromPubkey: e.authorizedPubkey,
                        toPubkey: s,
                        lamports: t
                    })), c.add(this.splitInstruction({
                        stakePubkey: r,
                        authorizedPubkey: i,
                        splitStakePubkey: s,
                        lamports: a
                    }))
                }
                static merge(e) {
                    let {
                        stakePubkey: t,
                        sourceStakePubKey: r,
                        authorizedPubkey: i
                    } = e, s = ec(rp.Merge);
                    return new ee().add({
                        keys: [{
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: r,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: er,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: en,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: i,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: s
                    })
                }
                static withdraw(e) {
                    let {
                        stakePubkey: t,
                        authorizedPubkey: r,
                        toPubkey: i,
                        lamports: s,
                        custodianPubkey: n
                    } = e, o = ec(rp.Withdraw, {
                        lamports: s
                    }), a = [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: i,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: er,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: en,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: r,
                        isSigner: !0,
                        isWritable: !1
                    }];
                    return n && a.push({
                        pubkey: n,
                        isSigner: !0,
                        isWritable: !1
                    }), new ee().add({
                        keys: a,
                        programId: this.programId,
                        data: o
                    })
                }
                static deactivate(e) {
                    let {
                        stakePubkey: t,
                        authorizedPubkey: r
                    } = e, i = ec(rp.Deactivate);
                    return new ee().add({
                        keys: [{
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: er,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: r,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: i
                    })
                }
            }
            rf.programId = new W("Stake11111111111111111111111111111111111111"), rf.space = 200;
            let rm = Object.freeze({
                InitializeAccount: {
                    index: 0,
                    layout: p.n_([p.Jq("instruction"), ((e = "voteInit") => p.n_([K("nodePubkey"), K("authorizedVoter"), K("authorizedWithdrawer"), p.u8("commission")], e))()])
                },
                Authorize: {
                    index: 1,
                    layout: p.n_([p.Jq("instruction"), K("newAuthorized"), p.Jq("voteAuthorizationType")])
                },
                Withdraw: {
                    index: 3,
                    layout: p.n_([p.Jq("instruction"), p.gM("lamports")])
                },
                UpdateValidatorIdentity: {
                    index: 4,
                    layout: p.n_([p.Jq("instruction")])
                },
                AuthorizeWithSeed: {
                    index: 10,
                    layout: p.n_([p.Jq("instruction"), ((e = "voteAuthorizeWithSeedArgs") => p.n_([p.Jq("voteAuthorizationType"), K("currentAuthorityDerivedKeyOwnerPubkey"), N("currentAuthorityDerivedKeySeed"), K("newAuthorized")], e))()])
                }
            });
            Object.freeze({
                Voter: {
                    index: 0
                },
                Withdrawer: {
                    index: 1
                }
            });
            class rb {
                constructor() {}
                static initializeAccount(e) {
                    let {
                        votePubkey: t,
                        nodePubkey: r,
                        voteInit: i
                    } = e, s = ec(rm.InitializeAccount, {
                        voteInit: {
                            nodePubkey: R(i.nodePubkey.toBuffer()),
                            authorizedVoter: R(i.authorizedVoter.toBuffer()),
                            authorizedWithdrawer: R(i.authorizedWithdrawer.toBuffer()),
                            commission: i.commission
                        }
                    });
                    return new Y({
                        keys: [{
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: es,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: er,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: r,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: s
                    })
                }
                static createAccount(e) {
                    let t = new ee;
                    return t.add(em.createAccount({
                        fromPubkey: e.fromPubkey,
                        newAccountPubkey: e.votePubkey,
                        lamports: e.lamports,
                        space: this.space,
                        programId: this.programId
                    })), t.add(this.initializeAccount({
                        votePubkey: e.votePubkey,
                        nodePubkey: e.voteInit.nodePubkey,
                        voteInit: e.voteInit
                    }))
                }
                static authorize(e) {
                    let {
                        votePubkey: t,
                        authorizedPubkey: r,
                        newAuthorizedPubkey: i,
                        voteAuthorizationType: s
                    } = e, n = ec(rm.Authorize, {
                        newAuthorized: R(i.toBuffer()),
                        voteAuthorizationType: s.index
                    });
                    return new ee().add({
                        keys: [{
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: er,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: r,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: n
                    })
                }
                static authorizeWithSeed(e) {
                    let {
                        currentAuthorityDerivedKeyBasePubkey: t,
                        currentAuthorityDerivedKeyOwnerPubkey: r,
                        currentAuthorityDerivedKeySeed: i,
                        newAuthorizedPubkey: s,
                        voteAuthorizationType: n,
                        votePubkey: o
                    } = e, a = ec(rm.AuthorizeWithSeed, {
                        voteAuthorizeWithSeedArgs: {
                            currentAuthorityDerivedKeyOwnerPubkey: R(r.toBuffer()),
                            currentAuthorityDerivedKeySeed: i,
                            newAuthorized: R(s.toBuffer()),
                            voteAuthorizationType: n.index
                        }
                    });
                    return new ee().add({
                        keys: [{
                            pubkey: o,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: er,
                            isSigner: !1,
                            isWritable: !1
                        }, {
                            pubkey: t,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: a
                    })
                }
                static withdraw(e) {
                    let {
                        votePubkey: t,
                        authorizedWithdrawerPubkey: r,
                        lamports: i,
                        toPubkey: s
                    } = e, n = ec(rm.Withdraw, {
                        lamports: i
                    });
                    return new ee().add({
                        keys: [{
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: s,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: r,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: n
                    })
                }
                static safeWithdraw(e, t, r) {
                    if (e.lamports > t - r) throw Error("Withdraw will leave vote account with insufficient funds.");
                    return rb.withdraw(e)
                }
                static updateValidatorIdentity(e) {
                    let {
                        votePubkey: t,
                        authorizedWithdrawerPubkey: r,
                        nodePubkey: i
                    } = e, s = ec(rm.UpdateValidatorIdentity);
                    return new ee().add({
                        keys: [{
                            pubkey: t,
                            isSigner: !1,
                            isWritable: !0
                        }, {
                            pubkey: i,
                            isSigner: !0,
                            isWritable: !1
                        }, {
                            pubkey: r,
                            isSigner: !0,
                            isWritable: !1
                        }],
                        programId: this.programId,
                        data: s
                    })
                }
            }
            rb.programId = new W("Vote111111111111111111111111111111111111111"), rb.space = 3762, new W("Va1idator1nfo111111111111111111111111111111"), (0, m.dt)({
                name: (0, m.Z_)(),
                website: (0, m.jt)((0, m.Z_)()),
                details: (0, m.jt)((0, m.Z_)()),
                keybaseUsername: (0, m.jt)((0, m.Z_)())
            }), new W("Vote111111111111111111111111111111111111111"), p.n_([K("nodePubkey"), K("authorizedWithdrawer"), p.u8("commission"), p._O(), p.A9(p.n_([p._O("slot"), p.Jq("confirmationCount")]), p.cv(p.Jq(), -8), "votes"), p.u8("rootSlotValid"), p._O("rootSlot"), p._O(), p.A9(p.n_([p._O("epoch"), K("authorizedVoter")]), p.cv(p.Jq(), -8), "authorizedVoters"), p.n_([p.A9(p.n_([K("authorizedPubkey"), p._O("epochOfLastAuthorizedSwitch"), p._O("targetEpoch")]), 32, "buf"), p._O("idx"), p.u8("isEmpty")], "priorVoters"), p._O(), p.A9(p.n_([p._O("epoch"), p._O("credits"), p._O("prevCredits")]), p.cv(p.Jq(), -8), "epochCredits"), p.n_([p._O("slot"), p._O("timestamp")], "lastTimestamp")]);
            let ry = {
                http: {
                    devnet: "http://api.devnet.solana.com",
                    testnet: "http://api.testnet.solana.com",
                    "mainnet-beta": "http://api.mainnet-beta.solana.com/"
                },
                https: {
                    devnet: "https://api.devnet.solana.com",
                    testnet: "https://api.testnet.solana.com",
                    "mainnet-beta": "https://api.mainnet-beta.solana.com/"
                }
            };

            function rk(e, t) {
                let r = !1 === t ? "http" : "https";
                if (!e) return ry[r].devnet;
                let i = ry[r][e];
                if (!i) throw Error(`Unknown ${r} cluster: ${e}`);
                return i
            }
        }
    }
]);