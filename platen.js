/*! DEV ! platen 2013-06-03 */
(function(e, t) {
    var n, r, i = typeof t, o = e.document, a = e.location, s = e.jQuery, u = e.$, l = {}, c = [], p = "1.9.1", f = c.concat, d = c.push, h = c.slice, g = c.indexOf, m = l.toString, y = l.hasOwnProperty, v = p.trim, b = function(e, t) {
        return new b.fn.init(e, t, r);
    }, x = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, w = /\S+/g, T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, N = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, k = /^[\],:{}\s]*$/, E = /(?:^|:|,)(?:\s*\[)+/g, S = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, A = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, j = /^-ms-/, D = /-([\da-z])/gi, L = function(e, t) {
        return t.toUpperCase();
    }, H = function(e) {
        (o.addEventListener || "load" === e.type || "complete" === o.readyState) && (q(), 
        b.ready());
    }, q = function() {
        o.addEventListener ? (o.removeEventListener("DOMContentLoaded", H, !1), e.removeEventListener("load", H, !1)) : (o.detachEvent("onreadystatechange", H), 
        e.detachEvent("onload", H));
    };
    b.fn = b.prototype = {
        jquery: p,
        constructor: b,
        init: function(e, n, r) {
            var i, a;
            if (!e) return this;
            if ("string" == typeof e) {
                if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [ null, e, null ] : N.exec(e), 
                !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                if (i[1]) {
                    if (n = n instanceof b ? n[0] : n, b.merge(this, b.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : o, !0)), 
                    C.test(i[1]) && b.isPlainObject(n)) for (i in n) b.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                    return this;
                }
                if (a = o.getElementById(i[2]), a && a.parentNode) {
                    if (a.id !== i[2]) return r.find(e);
                    this.length = 1, this[0] = a;
                }
                return this.context = o, this.selector = e, this;
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : b.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, 
            this.context = e.context), b.makeArray(e, this));
        },
        selector: "",
        length: 0,
        size: function() {
            return this.length;
        },
        toArray: function() {
            return h.call(this);
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e];
        },
        pushStack: function(e) {
            var t = b.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t;
        },
        each: function(e, t) {
            return b.each(this, e, t);
        },
        ready: function(e) {
            return b.ready.promise().done(e), this;
        },
        slice: function() {
            return this.pushStack(h.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [ this[n] ] : []);
        },
        map: function(e) {
            return this.pushStack(b.map(this, function(t, n) {
                return e.call(t, n, t);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: d,
        sort: [].sort,
        splice: [].splice
    }, b.fn.init.prototype = b.fn, b.extend = b.fn.extend = function() {
        var e, n, r, i, o, a, s = arguments[0] || {}, u = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || b.isFunction(s) || (s = {}), 
        l === u && (s = this, --u); l > u; u++) if (null != (o = arguments[u])) for (i in o) e = s[i], 
        r = o[i], s !== r && (c && r && (b.isPlainObject(r) || (n = b.isArray(r))) ? (n ? (n = !1, 
        a = e && b.isArray(e) ? e : []) : a = e && b.isPlainObject(e) ? e : {}, s[i] = b.extend(c, a, r)) : r !== t && (s[i] = r));
        return s;
    }, b.extend({
        noConflict: function(t) {
            return e.$ === b && (e.$ = u), t && e.jQuery === b && (e.jQuery = s), b;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? b.readyWait++ : b.ready(!0);
        },
        ready: function(e) {
            if (e === !0 ? !--b.readyWait : !b.isReady) {
                if (!o.body) return setTimeout(b.ready);
                b.isReady = !0, e !== !0 && --b.readyWait > 0 || (n.resolveWith(o, [ b ]), b.fn.trigger && b(o).trigger("ready").off("ready"));
            }
        },
        isFunction: function(e) {
            return "function" === b.type(e);
        },
        isArray: Array.isArray || function(e) {
            return "array" === b.type(e);
        },
        isWindow: function(e) {
            return null != e && e == e.window;
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e);
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e;
        },
        isPlainObject: function(e) {
            if (!e || "object" !== b.type(e) || e.nodeType || b.isWindow(e)) return !1;
            try {
                if (e.constructor && !y.call(e, "constructor") && !y.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (n) {
                return !1;
            }
            var r;
            for (r in e) ;
            return r === t || y.call(e, r);
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0;
        },
        error: function(e) {
            throw Error(e);
        },
        parseHTML: function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || o;
            var r = C.exec(e), i = !n && [];
            return r ? [ t.createElement(r[1]) ] : (r = b.buildFragment([ e ], t, i), i && b(i).remove(), 
            b.merge([], r.childNodes));
        },
        parseJSON: function(n) {
            return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = b.trim(n), 
            n && k.test(n.replace(S, "@").replace(A, "]").replace(E, ""))) ? Function("return " + n)() : (b.error("Invalid JSON: " + n), 
            t);
        },
        parseXML: function(n) {
            var r, i;
            if (!n || "string" != typeof n) return null;
            try {
                e.DOMParser ? (i = new DOMParser(), r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), 
                r.async = "false", r.loadXML(n));
            } catch (o) {
                r = t;
            }
            return r && r.documentElement && !r.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + n), 
            r;
        },
        noop: function() {},
        globalEval: function(t) {
            t && b.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t);
            })(t);
        },
        camelCase: function(e) {
            return e.replace(j, "ms-").replace(D, L);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t, n) {
            var r, i = 0, o = e.length, a = M(e);
            if (n) {
                if (a) {
                    for (;o > i; i++) if (r = t.apply(e[i], n), r === !1) break;
                } else for (i in e) if (r = t.apply(e[i], n), r === !1) break;
            } else if (a) {
                for (;o > i; i++) if (r = t.call(e[i], i, e[i]), r === !1) break;
            } else for (i in e) if (r = t.call(e[i], i, e[i]), r === !1) break;
            return e;
        },
        trim: v && !v.call("﻿ ") ? function(e) {
            return null == e ? "" : v.call(e);
        } : function(e) {
            return null == e ? "" : (e + "").replace(T, "");
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (M(Object(e)) ? b.merge(n, "string" == typeof e ? [ e ] : e) : d.call(n, e)), 
            n;
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (g) return g.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n;
            }
            return -1;
        },
        merge: function(e, n) {
            var r = n.length, i = e.length, o = 0;
            if ("number" == typeof r) for (;r > o; o++) e[i++] = n[o]; else while (n[o] !== t) e[i++] = n[o++];
            return e.length = i, e;
        },
        grep: function(e, t, n) {
            var r, i = [], o = 0, a = e.length;
            for (n = !!n; a > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]);
            return i;
        },
        map: function(e, t, n) {
            var r, i = 0, o = e.length, a = M(e), s = [];
            if (a) for (;o > i; i++) r = t(e[i], i, n), null != r && (s[s.length] = r); else for (i in e) r = t(e[i], i, n), 
            null != r && (s[s.length] = r);
            return f.apply([], s);
        },
        guid: 1,
        proxy: function(e, n) {
            var r, i, o;
            return "string" == typeof n && (o = e[n], n = e, e = o), b.isFunction(e) ? (r = h.call(arguments, 2), 
            i = function() {
                return e.apply(n || this, r.concat(h.call(arguments)));
            }, i.guid = e.guid = e.guid || b.guid++, i) : t;
        },
        access: function(e, n, r, i, o, a, s) {
            var u = 0, l = e.length, c = null == r;
            if ("object" === b.type(r)) {
                o = !0;
                for (u in r) b.access(e, n, u, r[u], !0, a, s);
            } else if (i !== t && (o = !0, b.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), 
            n = null) : (c = n, n = function(e, t, n) {
                return c.call(b(e), n);
            })), n)) for (;l > u; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
            return o ? e : c ? n.call(e) : l ? n(e[0], r) : a;
        },
        now: function() {
            return new Date().getTime();
        }
    }), b.ready.promise = function(t) {
        if (!n) if (n = b.Deferred(), "complete" === o.readyState) setTimeout(b.ready); else if (o.addEventListener) o.addEventListener("DOMContentLoaded", H, !1), 
        e.addEventListener("load", H, !1); else {
            o.attachEvent("onreadystatechange", H), e.attachEvent("onload", H);
            var r = !1;
            try {
                r = null == e.frameElement && o.documentElement;
            } catch (i) {}
            r && r.doScroll && function a() {
                if (!b.isReady) {
                    try {
                        r.doScroll("left");
                    } catch (e) {
                        return setTimeout(a, 50);
                    }
                    q(), b.ready();
                }
            }();
        }
        return n.promise(t);
    }, b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        l["[object " + t + "]"] = t.toLowerCase();
    });
    function M(e) {
        var t = e.length, n = b.type(e);
        return b.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
    }
    r = b(o);
    var _ = {};
    function F(e) {
        var t = _[e] = {};
        return b.each(e.match(w) || [], function(e, n) {
            t[n] = !0;
        }), t;
    }
    b.Callbacks = function(e) {
        e = "string" == typeof e ? _[e] || F(e) : b.extend({}, e);
        var n, r, i, o, a, s, u = [], l = !e.once && [], c = function(t) {
            for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = u.length, n = !0; u && o > a; a++) if (u[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                r = !1;
                break;
            }
            n = !1, u && (l ? l.length && c(l.shift()) : r ? u = [] : p.disable());
        }, p = {
            add: function() {
                if (u) {
                    var t = u.length;
                    (function i(t) {
                        b.each(t, function(t, n) {
                            var r = b.type(n);
                            "function" === r ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && i(n);
                        });
                    })(arguments), n ? o = u.length : r && (s = t, c(r));
                }
                return this;
            },
            remove: function() {
                return u && b.each(arguments, function(e, t) {
                    var r;
                    while ((r = b.inArray(t, u, r)) > -1) u.splice(r, 1), n && (o >= r && o--, a >= r && a--);
                }), this;
            },
            has: function(e) {
                return e ? b.inArray(e, u) > -1 : !(!u || !u.length);
            },
            empty: function() {
                return u = [], this;
            },
            disable: function() {
                return u = l = r = t, this;
            },
            disabled: function() {
                return !u;
            },
            lock: function() {
                return l = t, r || p.disable(), this;
            },
            locked: function() {
                return !l;
            },
            fireWith: function(e, t) {
                return t = t || [], t = [ e, t.slice ? t.slice() : t ], !u || i && !l || (n ? l.push(t) : c(t)), 
                this;
            },
            fire: function() {
                return p.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!i;
            }
        };
        return p;
    }, b.extend({
        Deferred: function(e) {
            var t = [ [ "resolve", "done", b.Callbacks("once memory"), "resolved" ], [ "reject", "fail", b.Callbacks("once memory"), "rejected" ], [ "notify", "progress", b.Callbacks("memory") ] ], n = "pending", r = {
                state: function() {
                    return n;
                },
                always: function() {
                    return i.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var e = arguments;
                    return b.Deferred(function(n) {
                        b.each(t, function(t, o) {
                            var a = o[0], s = b.isFunction(e[t]) && e[t];
                            i[o[1]](function() {
                                var e = s && s.apply(this, arguments);
                                e && b.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [ e ] : arguments);
                            });
                        }), e = null;
                    }).promise();
                },
                promise: function(e) {
                    return null != e ? b.extend(e, r) : r;
                }
            }, i = {};
            return r.pipe = r.then, b.each(t, function(e, o) {
                var a = o[2], s = o[3];
                r[o[1]] = a.add, s && a.add(function() {
                    n = s;
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this;
                }, i[o[0] + "With"] = a.fireWith;
            }), r.promise(i), e && e.call(i, i), i;
        },
        when: function(e) {
            var t = 0, n = h.call(arguments), r = n.length, i = 1 !== r || e && b.isFunction(e.promise) ? r : 0, o = 1 === i ? e : b.Deferred(), a = function(e, t, n) {
                return function(r) {
                    t[e] = this, n[e] = arguments.length > 1 ? h.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n);
                };
            }, s, u, l;
            if (r > 1) for (s = Array(r), u = Array(r), l = Array(r); r > t; t++) n[t] && b.isFunction(n[t].promise) ? n[t].promise().done(a(t, l, n)).fail(o.reject).progress(a(t, u, s)) : --i;
            return i || o.resolveWith(l, n), o.promise();
        }
    }), b.support = function() {
        var t, n, r, a, s, u, l, c, p, f, d = o.createElement("div");
        if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        n = d.getElementsByTagName("*"), r = d.getElementsByTagName("a")[0], !n || !r || !n.length) return {};
        s = o.createElement("select"), l = s.appendChild(o.createElement("option")), a = d.getElementsByTagName("input")[0], 
        r.style.cssText = "top:1px;float:left;opacity:.5", t = {
            getSetAttribute: "t" !== d.className,
            leadingWhitespace: 3 === d.firstChild.nodeType,
            tbody: !d.getElementsByTagName("tbody").length,
            htmlSerialize: !!d.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: "/a" === r.getAttribute("href"),
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !!r.style.cssFloat,
            checkOn: !!a.value,
            optSelected: l.selected,
            enctype: !!o.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== o.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === o.compatMode,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, s.disabled = !0, 
        t.optDisabled = !l.disabled;
        try {
            delete d.test;
        } catch (h) {
            t.deleteExpando = !1;
        }
        a = o.createElement("input"), a.setAttribute("value", ""), t.input = "" === a.getAttribute("value"), 
        a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, 
        a.setAttribute("checked", "t"), a.setAttribute("name", "t"), u = o.createDocumentFragment(), 
        u.appendChild(a), t.appendChecked = a.checked, t.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        d.attachEvent && (d.attachEvent("onclick", function() {
            t.noCloneEvent = !1;
        }), d.cloneNode(!0).click());
        for (f in {
            submit: !0,
            change: !0,
            focusin: !0
        }) d.setAttribute(c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1;
        return d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", 
        t.clearCloneStyle = "content-box" === d.style.backgroundClip, b(function() {
            var n, r, a, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", u = o.getElementsByTagName("body")[0];
            u && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
            u.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            a = d.getElementsByTagName("td"), a[0].style.cssText = "padding:0;margin:0;border:0;display:none", 
            p = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", 
            t.reliableHiddenOffsets = p && 0 === a[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", 
            t.boxSizing = 4 === d.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== u.offsetTop, 
            e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, 
            t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
                width: "4px"
            }).width, r = d.appendChild(o.createElement("div")), r.style.cssText = d.style.cssText = s, 
            r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), 
            typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", 
            t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", 
            d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (u.style.zoom = 1)), 
            u.removeChild(n), n = d = a = r = null);
        }), n = s = u = l = r = a = null, t;
    }();
    var O = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, B = /([A-Z])/g;
    function P(e, n, r, i) {
        if (b.acceptData(e)) {
            var o, a, s = b.expando, u = "string" == typeof n, l = e.nodeType, p = l ? b.cache : e, f = l ? e[s] : e[s] && s;
            if (f && p[f] && (i || p[f].data) || !u || r !== t) return f || (l ? e[s] = f = c.pop() || b.guid++ : f = s), 
            p[f] || (p[f] = {}, l || (p[f].toJSON = b.noop)), ("object" == typeof n || "function" == typeof n) && (i ? p[f] = b.extend(p[f], n) : p[f].data = b.extend(p[f].data, n)), 
            o = p[f], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[b.camelCase(n)] = r), 
            u ? (a = o[n], null == a && (a = o[b.camelCase(n)])) : a = o, a;
        }
    }
    function R(e, t, n) {
        if (b.acceptData(e)) {
            var r, i, o, a = e.nodeType, s = a ? b.cache : e, u = a ? e[b.expando] : b.expando;
            if (s[u]) {
                if (t && (o = n ? s[u] : s[u].data)) {
                    b.isArray(t) ? t = t.concat(b.map(t, b.camelCase)) : t in o ? t = [ t ] : (t = b.camelCase(t), 
                    t = t in o ? [ t ] : t.split(" "));
                    for (r = 0, i = t.length; i > r; r++) delete o[t[r]];
                    if (!(n ? $ : b.isEmptyObject)(o)) return;
                }
                (n || (delete s[u].data, $(s[u]))) && (a ? b.cleanData([ e ], !0) : b.support.deleteExpando || s != s.window ? delete s[u] : s[u] = null);
            }
        }
    }
    b.extend({
        cache: {},
        expando: "jQuery" + (p + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? b.cache[e[b.expando]] : e[b.expando], !!e && !$(e);
        },
        data: function(e, t, n) {
            return P(e, t, n);
        },
        removeData: function(e, t) {
            return R(e, t);
        },
        _data: function(e, t, n) {
            return P(e, t, n, !0);
        },
        _removeData: function(e, t) {
            return R(e, t, !0);
        },
        acceptData: function(e) {
            if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
            var t = e.nodeName && b.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t;
        }
    }), b.fn.extend({
        data: function(e, n) {
            var r, i, o = this[0], a = 0, s = null;
            if (e === t) {
                if (this.length && (s = b.data(o), 1 === o.nodeType && !b._data(o, "parsedAttrs"))) {
                    for (r = o.attributes; r.length > a; a++) i = r[a].name, i.indexOf("data-") || (i = b.camelCase(i.slice(5)), 
                    W(o, i, s[i]));
                    b._data(o, "parsedAttrs", !0);
                }
                return s;
            }
            return "object" == typeof e ? this.each(function() {
                b.data(this, e);
            }) : b.access(this, function(n) {
                return n === t ? o ? W(o, e, b.data(o, e)) : null : (this.each(function() {
                    b.data(this, e, n);
                }), t);
            }, null, n, arguments.length > 1, null, !0);
        },
        removeData: function(e) {
            return this.each(function() {
                b.removeData(this, e);
            });
        }
    });
    function W(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var i = "data-" + n.replace(B, "-$1").toLowerCase();
            if (r = e.getAttribute(i), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : O.test(r) ? b.parseJSON(r) : r;
                } catch (o) {}
                b.data(e, n, r);
            } else r = t;
        }
        return r;
    }
    function $(e) {
        var t;
        for (t in e) if (("data" !== t || !b.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0;
    }
    b.extend({
        queue: function(e, n, r) {
            var i;
            return e ? (n = (n || "fx") + "queue", i = b._data(e, n), r && (!i || b.isArray(r) ? i = b._data(e, n, b.makeArray(r)) : i.push(r)), 
            i || []) : t;
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = b.queue(e, t), r = n.length, i = n.shift(), o = b._queueHooks(e, t), a = function() {
                b.dequeue(e, t);
            };
            "inprogress" === i && (i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"), 
            delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return b._data(e, n) || b._data(e, n, {
                empty: b.Callbacks("once memory").add(function() {
                    b._removeData(e, t + "queue"), b._removeData(e, n);
                })
            });
        }
    }), b.fn.extend({
        queue: function(e, n) {
            var r = 2;
            return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? b.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = b.queue(this, e, n);
                b._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && b.dequeue(this, e);
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                b.dequeue(this, e);
            });
        },
        delay: function(e, t) {
            return e = b.fx ? b.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r);
                };
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, n) {
            var r, i = 1, o = b.Deferred(), a = this, s = this.length, u = function() {
                --i || o.resolveWith(a, [ a ]);
            };
            "string" != typeof e && (n = e, e = t), e = e || "fx";
            while (s--) r = b._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(u));
            return u(), o.promise(n);
        }
    });
    var I, z, X = /[\t\r\n]/g, U = /\r/g, V = /^(?:input|select|textarea|button|object)$/i, Y = /^(?:a|area)$/i, J = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, G = /^(?:checked|selected)$/i, Q = b.support.getSetAttribute, K = b.support.input;
    b.fn.extend({
        attr: function(e, t) {
            return b.access(this, b.attr, e, t, arguments.length > 1);
        },
        removeAttr: function(e) {
            return this.each(function() {
                b.removeAttr(this, e);
            });
        },
        prop: function(e, t) {
            return b.access(this, b.prop, e, t, arguments.length > 1);
        },
        removeProp: function(e) {
            return e = b.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e];
                } catch (n) {}
            });
        },
        addClass: function(e) {
            var t, n, r, i, o, a = 0, s = this.length, u = "string" == typeof e && e;
            if (b.isFunction(e)) return this.each(function(t) {
                b(this).addClass(e.call(this, t, this.className));
            });
            if (u) for (t = (e || "").match(w) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : " ")) {
                o = 0;
                while (i = t[o++]) 0 > r.indexOf(" " + i + " ") && (r += i + " ");
                n.className = b.trim(r);
            }
            return this;
        },
        removeClass: function(e) {
            var t, n, r, i, o, a = 0, s = this.length, u = 0 === arguments.length || "string" == typeof e && e;
            if (b.isFunction(e)) return this.each(function(t) {
                b(this).removeClass(e.call(this, t, this.className));
            });
            if (u) for (t = (e || "").match(w) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : "")) {
                o = 0;
                while (i = t[o++]) while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                n.className = e ? b.trim(r) : "";
            }
            return this;
        },
        toggleClass: function(e, t) {
            var n = typeof e, r = "boolean" == typeof t;
            return b.isFunction(e) ? this.each(function(n) {
                b(this).toggleClass(e.call(this, n, this.className, t), t);
            }) : this.each(function() {
                if ("string" === n) {
                    var o, a = 0, s = b(this), u = t, l = e.match(w) || [];
                    while (o = l[a++]) u = r ? u : !s.hasClass(o), s[u ? "addClass" : "removeClass"](o);
                } else (n === i || "boolean" === n) && (this.className && b._data(this, "__className__", this.className), 
                this.className = this.className || e === !1 ? "" : b._data(this, "__className__") || "");
            });
        },
        hasClass: function(e) {
            var t = " " + e + " ", n = 0, r = this.length;
            for (;r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(X, " ").indexOf(t) >= 0) return !0;
            return !1;
        },
        val: function(e) {
            var n, r, i, o = this[0];
            {
                if (arguments.length) return i = b.isFunction(e), this.each(function(n) {
                    var o, a = b(this);
                    1 === this.nodeType && (o = i ? e.call(this, n, a.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : b.isArray(o) && (o = b.map(o, function(e) {
                        return null == e ? "" : e + "";
                    })), r = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o));
                });
                if (o) return r = b.valHooks[o.type] || b.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, 
                "string" == typeof n ? n.replace(U, "") : null == n ? "" : n);
            }
        }
    }), b.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text;
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0;
                    for (;s > u; u++) if (n = r[u], !(!n.selected && u !== i || (b.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && b.nodeName(n.parentNode, "optgroup"))) {
                        if (t = b(n).val(), o) return t;
                        a.push(t);
                    }
                    return a;
                },
                set: function(e, t) {
                    var n = b.makeArray(t);
                    return b(e).find("option").each(function() {
                        this.selected = b.inArray(b(this).val(), n) >= 0;
                    }), n.length || (e.selectedIndex = -1), n;
                }
            }
        },
        attr: function(e, n, r) {
            var o, a, s, u = e.nodeType;
            if (e && 3 !== u && 8 !== u && 2 !== u) return typeof e.getAttribute === i ? b.prop(e, n, r) : (a = 1 !== u || !b.isXMLDoc(e), 
            a && (n = n.toLowerCase(), o = b.attrHooks[n] || (J.test(n) ? z : I)), r === t ? o && a && "get" in o && null !== (s = o.get(e, n)) ? s : (typeof e.getAttribute !== i && (s = e.getAttribute(n)), 
            null == s ? t : s) : null !== r ? o && a && "set" in o && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), 
            r) : (b.removeAttr(e, n), t));
        },
        removeAttr: function(e, t) {
            var n, r, i = 0, o = t && t.match(w);
            if (o && 1 === e.nodeType) while (n = o[i++]) r = b.propFix[n] || n, J.test(n) ? !Q && G.test(n) ? e[b.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : b.attr(e, n, ""), 
            e.removeAttribute(Q ? n : r);
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!b.support.radioValue && "radio" === t && b.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var i, o, a, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !b.isXMLDoc(e), a && (n = b.propFix[n] || n, 
            o = b.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n];
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : V.test(e.nodeName) || Y.test(e.nodeName) && e.href ? 0 : t;
                }
            }
        }
    }), z = {
        get: function(e, n) {
            var r = b.prop(e, n), i = "boolean" == typeof r && e.getAttribute(n), o = "boolean" == typeof r ? K && Q ? null != i : G.test(n) ? e[b.camelCase("default-" + n)] : !!i : e.getAttributeNode(n);
            return o && o.value !== !1 ? n.toLowerCase() : t;
        },
        set: function(e, t, n) {
            return t === !1 ? b.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && b.propFix[n] || n, n) : e[b.camelCase("default-" + n)] = e[n] = !0, 
            n;
        }
    }, K && Q || (b.attrHooks.value = {
        get: function(e, n) {
            var r = e.getAttributeNode(n);
            return b.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t;
        },
        set: function(e, n, r) {
            return b.nodeName(e, "input") ? (e.defaultValue = n, t) : I && I.set(e, n, r);
        }
    }), Q || (I = b.valHooks.button = {
        get: function(e, n) {
            var r = e.getAttributeNode(n);
            return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value : r.specified) ? r.value : t;
        },
        set: function(e, n, r) {
            var i = e.getAttributeNode(r);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", 
            "value" === r || n === e.getAttribute(r) ? n : t;
        }
    }, b.attrHooks.contenteditable = {
        get: I.get,
        set: function(e, t, n) {
            I.set(e, "" === t ? !1 : t, n);
        }
    }, b.each([ "width", "height" ], function(e, n) {
        b.attrHooks[n] = b.extend(b.attrHooks[n], {
            set: function(e, r) {
                return "" === r ? (e.setAttribute(n, "auto"), r) : t;
            }
        });
    })), b.support.hrefNormalized || (b.each([ "href", "src", "width", "height" ], function(e, n) {
        b.attrHooks[n] = b.extend(b.attrHooks[n], {
            get: function(e) {
                var r = e.getAttribute(n, 2);
                return null == r ? t : r;
            }
        });
    }), b.each([ "href", "src" ], function(e, t) {
        b.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4);
            }
        };
    })), b.support.style || (b.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || t;
        },
        set: function(e, t) {
            return e.style.cssText = t + "";
        }
    }), b.support.optSelected || (b.propHooks.selected = b.extend(b.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
        }
    })), b.support.enctype || (b.propFix.enctype = "encoding"), b.support.checkOn || b.each([ "radio", "checkbox" ], function() {
        b.valHooks[this] = {
            get: function(e) {
                return null === e.getAttribute("value") ? "on" : e.value;
            }
        };
    }), b.each([ "radio", "checkbox" ], function() {
        b.valHooks[this] = b.extend(b.valHooks[this], {
            set: function(e, n) {
                return b.isArray(n) ? e.checked = b.inArray(b(e).val(), n) >= 0 : t;
            }
        });
    });
    var Z = /^(?:input|select|textarea)$/i, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^([^.]*)(?:\.(.+)|)$/;
    function it() {
        return !0;
    }
    function ot() {
        return !1;
    }
    b.event = {
        global: {},
        add: function(e, n, r, o, a) {
            var s, u, l, c, p, f, d, h, g, m, y, v = b._data(e);
            if (v) {
                r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = b.guid++), 
                (u = v.events) || (u = v.events = {}), (f = v.handle) || (f = v.handle = function(e) {
                    return typeof b === i || e && b.event.triggered === e.type ? t : b.event.dispatch.apply(f.elem, arguments);
                }, f.elem = e), n = (n || "").match(w) || [ "" ], l = n.length;
                while (l--) s = rt.exec(n[l]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), 
                p = b.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, p = b.event.special[g] || {}, 
                d = b.extend({
                    type: g,
                    origType: y,
                    data: o,
                    handler: r,
                    guid: r.guid,
                    selector: a,
                    needsContext: a && b.expr.match.needsContext.test(a),
                    namespace: m.join(".")
                }, c), (h = u[g]) || (h = u[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), 
                p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), 
                b.event.global[g] = !0;
                e = null;
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, p, f, d, h, g, m = b.hasData(e) && b._data(e);
            if (m && (c = m.events)) {
                t = (t || "").match(w) || [ "" ], l = t.length;
                while (l--) if (s = rt.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), 
                d) {
                    p = b.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], 
                    s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = f.length;
                    while (o--) a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), 
                    a.selector && f.delegateCount--, p.remove && p.remove.call(e, a));
                    u && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || b.removeEvent(e, d, m.handle), 
                    delete c[d]);
                } else for (d in c) b.event.remove(e, d + t[l], n, r, !0);
                b.isEmptyObject(c) && (delete m.handle, b._removeData(e, "events"));
            }
        },
        trigger: function(n, r, i, a) {
            var s, u, l, c, p, f, d, h = [ i || o ], g = y.call(n, "type") ? n.type : n, m = y.call(n, "namespace") ? n.namespace.split(".") : [];
            if (l = f = i = i || o, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + b.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), 
            g = m.shift(), m.sort()), u = 0 > g.indexOf(":") && "on" + g, n = n[b.expando] ? n : new b.Event(g, "object" == typeof n && n), 
            n.isTrigger = !0, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            n.result = t, n.target || (n.target = i), r = null == r ? [ n ] : b.makeArray(r, [ n ]), 
            p = b.event.special[g] || {}, a || !p.trigger || p.trigger.apply(i, r) !== !1)) {
                if (!a && !p.noBubble && !b.isWindow(i)) {
                    for (c = p.delegateType || g, nt.test(c + g) || (l = l.parentNode); l; l = l.parentNode) h.push(l), 
                    f = l;
                    f === (i.ownerDocument || o) && h.push(f.defaultView || f.parentWindow || e);
                }
                d = 0;
                while ((l = h[d++]) && !n.isPropagationStopped()) n.type = d > 1 ? c : p.bindType || g, 
                s = (b._data(l, "events") || {})[n.type] && b._data(l, "handle"), s && s.apply(l, r), 
                s = u && l[u], s && b.acceptData(l) && s.apply && s.apply(l, r) === !1 && n.preventDefault();
                if (n.type = g, !(a || n.isDefaultPrevented() || p._default && p._default.apply(i.ownerDocument, r) !== !1 || "click" === g && b.nodeName(i, "a") || !b.acceptData(i) || !u || !i[g] || b.isWindow(i))) {
                    f = i[u], f && (i[u] = null), b.event.triggered = g;
                    try {
                        i[g]();
                    } catch (v) {}
                    b.event.triggered = t, f && (i[u] = f);
                }
                return n.result;
            }
        },
        dispatch: function(e) {
            e = b.event.fix(e);
            var n, r, i, o, a, s = [], u = h.call(arguments), l = (b._data(this, "events") || {})[e.type] || [], c = b.event.special[e.type] || {};
            if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                s = b.event.handlers.call(this, e, l), n = 0;
                while ((o = s[n++]) && !e.isPropagationStopped()) {
                    e.currentTarget = o.elem, a = 0;
                    while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped()) (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, 
                    e.data = i.data, r = ((b.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), 
                    r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                }
                return c.postDispatch && c.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function(e, n) {
            var r, i, o, a, s = [], u = n.delegateCount, l = e.target;
            if (u && l.nodeType && (!e.button || "click" !== e.type)) for (;l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (o = [], a = 0; u > a; a++) i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? b(r, this).index(l) >= 0 : b.find(r, this, null, [ l ]).length), 
                o[r] && o.push(i);
                o.length && s.push({
                    elem: l,
                    handlers: o
                });
            }
            return n.length > u && s.push({
                elem: this,
                handlers: n.slice(u)
            }), s;
        },
        fix: function(e) {
            if (e[b.expando]) return e;
            var t, n, r, i = e.type, a = e, s = this.fixHooks[i];
            s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), 
            r = s.props ? this.props.concat(s.props) : this.props, e = new b.Event(a), t = r.length;
            while (t--) n = r[t], e[n] = a[n];
            return e.target || (e.target = a.srcElement || o), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
            e.metaKey = !!e.metaKey, s.filter ? s.filter(e, a) : e;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), 
                e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r, i, a, s = n.button, u = n.fromElement;
                return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || o, 
                a = i.documentElement, r = i.body, e.pageX = n.clientX + (a && a.scrollLeft || r && r.scrollLeft || 0) - (a && a.clientLeft || r && r.clientLeft || 0), 
                e.pageY = n.clientY + (a && a.scrollTop || r && r.scrollTop || 0) - (a && a.clientTop || r && r.clientTop || 0)), 
                !e.relatedTarget && u && (e.relatedTarget = u === e.target ? n.toElement : u), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), 
                e;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                trigger: function() {
                    return b.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : t;
                }
            },
            focus: {
                trigger: function() {
                    if (this !== o.activeElement && this.focus) try {
                        return this.focus(), !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === o.activeElement && this.blur ? (this.blur(), !1) : t;
                },
                delegateType: "focusout"
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result);
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = b.extend(new b.Event(), n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? b.event.trigger(i, null, t) : b.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
        }
    }, b.removeEvent = o.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1);
    } : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n));
    }, b.Event = function(e, n) {
        return this instanceof b.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, 
        this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, 
        n && b.extend(this, n), this.timeStamp = e && e.timeStamp || b.now(), this[b.expando] = !0, 
        t) : new b.Event(e, n);
    }, b.Event.prototype = {
        isDefaultPrevented: ot,
        isPropagationStopped: ot,
        isImmediatePropagationStopped: ot,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), 
            e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = it, this.stopPropagation();
        }
    }, b.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        b.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return (!i || i !== r && !b.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), 
                e.type = t), n;
            }
        };
    }), b.support.submitBubbles || (b.event.special.submit = {
        setup: function() {
            return b.nodeName(this, "form") ? !1 : (b.event.add(this, "click._submit keypress._submit", function(e) {
                var n = e.target, r = b.nodeName(n, "input") || b.nodeName(n, "button") ? n.form : t;
                r && !b._data(r, "submitBubbles") && (b.event.add(r, "submit._submit", function(e) {
                    e._submit_bubble = !0;
                }), b._data(r, "submitBubbles", !0));
            }), t);
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && b.event.simulate("submit", this.parentNode, e, !0));
        },
        teardown: function() {
            return b.nodeName(this, "form") ? !1 : (b.event.remove(this, "._submit"), t);
        }
    }), b.support.changeBubbles || (b.event.special.change = {
        setup: function() {
            return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (b.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0);
            }), b.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), b.event.simulate("change", this, e, !0);
            })), !1) : (b.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Z.test(t.nodeName) && !b._data(t, "changeBubbles") && (b.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || b.event.simulate("change", this.parentNode, e, !0);
                }), b._data(t, "changeBubbles", !0));
            }), t);
        },
        handle: function(e) {
            var n = e.target;
            return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t;
        },
        teardown: function() {
            return b.event.remove(this, "._change"), !Z.test(this.nodeName);
        }
    }), b.support.focusinBubbles || b.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0, r = function(e) {
            b.event.simulate(t, e.target, b.event.fix(e), !0);
        };
        b.event.special[t] = {
            setup: function() {
                0 === n++ && o.addEventListener(e, r, !0);
            },
            teardown: function() {
                0 === --n && o.removeEventListener(e, r, !0);
            }
        };
    }), b.fn.extend({
        on: function(e, n, r, i, o) {
            var a, s;
            if ("object" == typeof e) {
                "string" != typeof n && (r = r || n, n = t);
                for (a in e) this.on(a, n, r, e[a], o);
                return this;
            }
            if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, 
            r = t) : (i = r, r = n, n = t)), i === !1) i = ot; else if (!i) return this;
            return 1 === o && (s = i, i = function(e) {
                return b().off(e), s.apply(this, arguments);
            }, i.guid = s.guid || (s.guid = b.guid++)), this.each(function() {
                b.event.add(this, e, i, r, n);
            });
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1);
        },
        off: function(e, n, r) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, b(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), 
            this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, n, e[o]);
                return this;
            }
            return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), 
            this.each(function() {
                b.event.remove(this, e, r, n);
            });
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function(e, t) {
            return this.off(e, null, t);
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r);
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        },
        trigger: function(e, t) {
            return this.each(function() {
                b.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, n) {
            var r = this[0];
            return r ? b.event.trigger(e, n, r, !0) : t;
        }
    }), function(e, t) {
        var n, r, i, o, a, s, u, l, c, p, f, d, h, g, m, y, v, x = "sizzle" + -new Date(), w = e.document, T = {}, N = 0, C = 0, k = it(), E = it(), S = it(), A = typeof t, j = 1 << 31, D = [], L = D.pop, H = D.push, q = D.slice, M = D.indexOf || function(e) {
            var t = 0, n = this.length;
            for (;n > t; t++) if (this[t] === e) return t;
            return -1;
        }, _ = "[\\x20\\t\\r\\n\\f]", F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", O = F.replace("w", "w#"), B = "([*^$|!~]?=)", P = "\\[" + _ + "*(" + F + ")" + _ + "*(?:" + B + _ + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + O + ")|)|)" + _ + "*\\]", R = ":(" + F + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + P.replace(3, 8) + ")*)|.*)\\)|)", W = RegExp("^" + _ + "+|((?:^|[^\\\\])(?:\\\\.)*)" + _ + "+$", "g"), $ = RegExp("^" + _ + "*," + _ + "*"), I = RegExp("^" + _ + "*([\\x20\\t\\r\\n\\f>+~])" + _ + "*"), z = RegExp(R), X = RegExp("^" + O + "$"), U = {
            ID: RegExp("^#(" + F + ")"),
            CLASS: RegExp("^\\.(" + F + ")"),
            NAME: RegExp("^\\[name=['\"]?(" + F + ")['\"]?\\]"),
            TAG: RegExp("^(" + F.replace("w", "w*") + ")"),
            ATTR: RegExp("^" + P),
            PSEUDO: RegExp("^" + R),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + _ + "*(even|odd|(([+-]|)(\\d*)n|)" + _ + "*(?:([+-]|)" + _ + "*(\\d+)|))" + _ + "*\\)|)", "i"),
            needsContext: RegExp("^" + _ + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + _ + "*((?:-\\d)?\\d*)" + _ + "*\\)|)(?=[^-]|$)", "i")
        }, V = /[\x20\t\r\n\f]*[+~]/, Y = /^[^{]+\{\s*\[native code/, J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, G = /^(?:input|select|textarea|button)$/i, Q = /^h\d$/i, K = /'|\\/g, Z = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, et = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, tt = function(e, t) {
            var n = "0x" + t - 65536;
            return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n);
        };
        try {
            q.call(w.documentElement.childNodes, 0)[0].nodeType;
        } catch (nt) {
            q = function(e) {
                var t, n = [];
                while (t = this[e++]) n.push(t);
                return n;
            };
        }
        function rt(e) {
            return Y.test(e + "");
        }
        function it() {
            var e, t = [];
            return e = function(n, r) {
                return t.push(n += " ") > i.cacheLength && delete e[t.shift()], e[n] = r;
            };
        }
        function ot(e) {
            return e[x] = !0, e;
        }
        function at(e) {
            var t = p.createElement("div");
            try {
                return e(t);
            } catch (n) {
                return !1;
            } finally {
                t = null;
            }
        }
        function st(e, t, n, r) {
            var i, o, a, s, u, l, f, g, m, v;
            if ((t ? t.ownerDocument || t : w) !== p && c(t), t = t || p, n = n || [], !e || "string" != typeof e) return n;
            if (1 !== (s = t.nodeType) && 9 !== s) return [];
            if (!d && !r) {
                if (i = J.exec(e)) if (a = i[1]) {
                    if (9 === s) {
                        if (o = t.getElementById(a), !o || !o.parentNode) return n;
                        if (o.id === a) return n.push(o), n;
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && y(t, o) && o.id === a) return n.push(o), 
                    n;
                } else {
                    if (i[2]) return H.apply(n, q.call(t.getElementsByTagName(e), 0)), n;
                    if ((a = i[3]) && T.getByClassName && t.getElementsByClassName) return H.apply(n, q.call(t.getElementsByClassName(a), 0)), 
                    n;
                }
                if (T.qsa && !h.test(e)) {
                    if (f = !0, g = x, m = t, v = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        l = ft(e), (f = t.getAttribute("id")) ? g = f.replace(K, "\\$&") : t.setAttribute("id", g), 
                        g = "[id='" + g + "'] ", u = l.length;
                        while (u--) l[u] = g + dt(l[u]);
                        m = V.test(e) && t.parentNode || t, v = l.join(",");
                    }
                    if (v) try {
                        return H.apply(n, q.call(m.querySelectorAll(v), 0)), n;
                    } catch (b) {} finally {
                        f || t.removeAttribute("id");
                    }
                }
            }
            return wt(e.replace(W, "$1"), t, n, r);
        }
        a = st.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1;
        }, c = st.setDocument = function(e) {
            var n = e ? e.ownerDocument || e : w;
            return n !== p && 9 === n.nodeType && n.documentElement ? (p = n, f = n.documentElement, 
            d = a(n), T.tagNameNoComments = at(function(e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length;
            }), T.attributes = at(function(e) {
                e.innerHTML = "<select></select>";
                var t = typeof e.lastChild.getAttribute("multiple");
                return "boolean" !== t && "string" !== t;
            }), T.getByClassName = at(function(e) {
                return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 
                2 === e.getElementsByClassName("e").length) : !1;
            }), T.getByName = at(function(e) {
                e.id = x + 0, e.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>", 
                f.insertBefore(e, f.firstChild);
                var t = n.getElementsByName && n.getElementsByName(x).length === 2 + n.getElementsByName(x + 0).length;
                return T.getIdNotName = !n.getElementById(x), f.removeChild(e), t;
            }), i.attrHandle = at(function(e) {
                return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== A && "#" === e.firstChild.getAttribute("href");
            }) ? {} : {
                href: function(e) {
                    return e.getAttribute("href", 2);
                },
                type: function(e) {
                    return e.getAttribute("type");
                }
            }, T.getIdNotName ? (i.find.ID = function(e, t) {
                if (typeof t.getElementById !== A && !d) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [ n ] : [];
                }
            }, i.filter.ID = function(e) {
                var t = e.replace(et, tt);
                return function(e) {
                    return e.getAttribute("id") === t;
                };
            }) : (i.find.ID = function(e, n) {
                if (typeof n.getElementById !== A && !d) {
                    var r = n.getElementById(e);
                    return r ? r.id === e || typeof r.getAttributeNode !== A && r.getAttributeNode("id").value === e ? [ r ] : t : [];
                }
            }, i.filter.ID = function(e) {
                var t = e.replace(et, tt);
                return function(e) {
                    var n = typeof e.getAttributeNode !== A && e.getAttributeNode("id");
                    return n && n.value === t;
                };
            }), i.find.TAG = T.tagNameNoComments ? function(e, n) {
                return typeof n.getElementsByTagName !== A ? n.getElementsByTagName(e) : t;
            } : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = o[i++]) 1 === n.nodeType && r.push(n);
                    return r;
                }
                return o;
            }, i.find.NAME = T.getByName && function(e, n) {
                return typeof n.getElementsByName !== A ? n.getElementsByName(name) : t;
            }, i.find.CLASS = T.getByClassName && function(e, n) {
                return typeof n.getElementsByClassName === A || d ? t : n.getElementsByClassName(e);
            }, g = [], h = [ ":focus" ], (T.qsa = rt(n.querySelectorAll)) && (at(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || h.push("\\[" + _ + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), 
                e.querySelectorAll(":checked").length || h.push(":checked");
            }), at(function(e) {
                e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && h.push("[*^$]=" + _ + "*(?:\"\"|'')"), 
                e.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
                h.push(",.*:");
            })), (T.matchesSelector = rt(m = f.matchesSelector || f.mozMatchesSelector || f.webkitMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && at(function(e) {
                T.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", R);
            }), h = RegExp(h.join("|")), g = RegExp(g.join("|")), y = rt(f.contains) || f.compareDocumentPosition ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
            } : function(e, t) {
                if (t) while (t = t.parentNode) if (t === e) return !0;
                return !1;
            }, v = f.compareDocumentPosition ? function(e, t) {
                var r;
                return e === t ? (u = !0, 0) : (r = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & r || e.parentNode && 11 === e.parentNode.nodeType ? e === n || y(w, e) ? -1 : t === n || y(w, t) ? 1 : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
            } : function(e, t) {
                var r, i = 0, o = e.parentNode, a = t.parentNode, s = [ e ], l = [ t ];
                if (e === t) return u = !0, 0;
                if (!o || !a) return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : 0;
                if (o === a) return ut(e, t);
                r = e;
                while (r = r.parentNode) s.unshift(r);
                r = t;
                while (r = r.parentNode) l.unshift(r);
                while (s[i] === l[i]) i++;
                return i ? ut(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0;
            }, u = !1, [ 0, 0 ].sort(v), T.detectDuplicates = u, p) : p;
        }, st.matches = function(e, t) {
            return st(e, null, null, t);
        }, st.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Z, "='$1']"), !(!T.matchesSelector || d || g && g.test(t) || h.test(t))) try {
                var n = m.call(e, t);
                if (n || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
            } catch (r) {}
            return st(t, p, null, [ e ]).length > 0;
        }, st.contains = function(e, t) {
            return (e.ownerDocument || e) !== p && c(e), y(e, t);
        }, st.attr = function(e, t) {
            var n;
            return (e.ownerDocument || e) !== p && c(e), d || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : d || T.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null;
        }, st.error = function(e) {
            throw Error("Syntax error, unrecognized expression: " + e);
        }, st.uniqueSort = function(e) {
            var t, n = [], r = 1, i = 0;
            if (u = !T.detectDuplicates, e.sort(v), u) {
                for (;t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
                while (i--) e.splice(n[i], 1);
            }
            return e;
        };
        function ut(e, t) {
            var n = t && e, r = n && (~t.sourceIndex || j) - (~e.sourceIndex || j);
            if (r) return r;
            if (n) while (n = n.nextSibling) if (n === t) return -1;
            return e ? 1 : -1;
        }
        function lt(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e;
            };
        }
        function ct(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e;
            };
        }
        function pt(e) {
            return ot(function(t) {
                return t = +t, ot(function(n, r) {
                    var i, o = e([], n.length, t), a = o.length;
                    while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i]));
                });
            });
        }
        o = st.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
                } else if (3 === i || 4 === i) return e.nodeValue;
            } else for (;t = e[r]; r++) n += o(t);
            return n;
        }, i = st.selectors = {
            cacheLength: 50,
            createPseudo: ot,
            match: U,
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(et, tt), e[3] = (e[4] || e[5] || "").replace(et, tt), 
                    "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || st.error(e[0]), 
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && st.error(e[0]), 
                    e;
                },
                PSEUDO: function(e) {
                    var t, n = !e[5] && e[2];
                    return U.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && z.test(n) && (t = ft(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), 
                    e[2] = n.slice(0, t)), e.slice(0, 3));
                }
            },
            filter: {
                TAG: function(e) {
                    return "*" === e ? function() {
                        return !0;
                    } : (e = e.replace(et, tt).toLowerCase(), function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e;
                    });
                },
                CLASS: function(e) {
                    var t = k[e + " "];
                    return t || (t = RegExp("(^|" + _ + ")" + e + "(" + _ + "|$)")) && k(e, function(e) {
                        return t.test(e.className || typeof e.getAttribute !== A && e.getAttribute("class") || "");
                    });
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = st.attr(r, e);
                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0;
                    };
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode;
                    } : function(t, n, u) {
                        var l, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !u && !s;
                        if (m) {
                            if (o) {
                                while (g) {
                                    p = t;
                                    while (p = p[g]) if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling";
                                }
                                return !0;
                            }
                            if (h = [ a ? m.firstChild : m.lastChild ], a && v) {
                                c = m[x] || (m[x] = {}), l = c[e] || [], d = l[0] === N && l[1], f = l[0] === N && l[2], 
                                p = d && m.childNodes[d];
                                while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if (1 === p.nodeType && ++f && p === t) {
                                    c[e] = [ N, d, f ];
                                    break;
                                }
                            } else if (v && (l = (t[x] || (t[x] = {}))[e]) && l[0] === N) f = l[1]; else while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[x] || (p[x] = {}))[e] = [ N, f ]), 
                            p === t)) break;
                            return f -= i, f === r || 0 === f % r && f / r >= 0;
                        }
                    };
                },
                PSEUDO: function(e, t) {
                    var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
                    return r[x] ? r(t) : r.length > 1 ? (n = [ e, e, "", t ], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ot(function(e, n) {
                        var i, o = r(e, t), a = o.length;
                        while (a--) i = M.call(e, o[a]), e[i] = !(n[i] = o[a]);
                    }) : function(e) {
                        return r(e, 0, n);
                    }) : r;
                }
            },
            pseudos: {
                not: ot(function(e) {
                    var t = [], n = [], r = s(e.replace(W, "$1"));
                    return r[x] ? ot(function(e, t, n, i) {
                        var o, a = r(e, null, i, []), s = e.length;
                        while (s--) (o = a[s]) && (e[s] = !(t[s] = o));
                    }) : function(e, i, o) {
                        return t[0] = e, r(t, null, o, n), !n.pop();
                    };
                }),
                has: ot(function(e) {
                    return function(t) {
                        return st(e, t).length > 0;
                    };
                }),
                contains: ot(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || o(t)).indexOf(e) > -1;
                    };
                }),
                lang: ot(function(e) {
                    return X.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(et, tt).toLowerCase(), 
                    function(t) {
                        var n;
                        do if (n = d ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) return n = n.toLowerCase(), 
                        n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1;
                    };
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id;
                },
                root: function(e) {
                    return e === f;
                },
                focus: function(e) {
                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: function(e) {
                    return e.disabled === !1;
                },
                disabled: function(e) {
                    return e.disabled === !0;
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected;
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                    return !0;
                },
                parent: function(e) {
                    return !i.pseudos.empty(e);
                },
                header: function(e) {
                    return Q.test(e.nodeName);
                },
                input: function(e) {
                    return G.test(e.nodeName);
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t;
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type);
                },
                first: pt(function() {
                    return [ 0 ];
                }),
                last: pt(function(e, t) {
                    return [ t - 1 ];
                }),
                eq: pt(function(e, t, n) {
                    return [ 0 > n ? n + t : n ];
                }),
                even: pt(function(e, t) {
                    var n = 0;
                    for (;t > n; n += 2) e.push(n);
                    return e;
                }),
                odd: pt(function(e, t) {
                    var n = 1;
                    for (;t > n; n += 2) e.push(n);
                    return e;
                }),
                lt: pt(function(e, t, n) {
                    var r = 0 > n ? n + t : n;
                    for (;--r >= 0; ) e.push(r);
                    return e;
                }),
                gt: pt(function(e, t, n) {
                    var r = 0 > n ? n + t : n;
                    for (;t > ++r; ) e.push(r);
                    return e;
                })
            }
        };
        for (n in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) i.pseudos[n] = lt(n);
        for (n in {
            submit: !0,
            reset: !0
        }) i.pseudos[n] = ct(n);
        function ft(e, t) {
            var n, r, o, a, s, u, l, c = E[e + " "];
            if (c) return t ? 0 : c.slice(0);
            s = e, u = [], l = i.preFilter;
            while (s) {
                (!n || (r = $.exec(s))) && (r && (s = s.slice(r[0].length) || s), u.push(o = [])), 
                n = !1, (r = I.exec(s)) && (n = r.shift(), o.push({
                    value: n,
                    type: r[0].replace(W, " ")
                }), s = s.slice(n.length));
                for (a in i.filter) !(r = U[a].exec(s)) || l[a] && !(r = l[a](r)) || (n = r.shift(), 
                o.push({
                    value: n,
                    type: a,
                    matches: r
                }), s = s.slice(n.length));
                if (!n) break;
            }
            return t ? s.length : s ? st.error(e) : E(e, u).slice(0);
        }
        function dt(e) {
            var t = 0, n = e.length, r = "";
            for (;n > t; t++) r += e[t].value;
            return r;
        }
        function ht(e, t, n) {
            var i = t.dir, o = n && "parentNode" === i, a = C++;
            return t.first ? function(t, n, r) {
                while (t = t[i]) if (1 === t.nodeType || o) return e(t, n, r);
            } : function(t, n, s) {
                var u, l, c, p = N + " " + a;
                if (s) {
                    while (t = t[i]) if ((1 === t.nodeType || o) && e(t, n, s)) return !0;
                } else while (t = t[i]) if (1 === t.nodeType || o) if (c = t[x] || (t[x] = {}), 
                (l = c[i]) && l[0] === p) {
                    if ((u = l[1]) === !0 || u === r) return u === !0;
                } else if (l = c[i] = [ p ], l[1] = e(t, n, s) || r, l[1] === !0) return !0;
            };
        }
        function gt(e) {
            return e.length > 1 ? function(t, n, r) {
                var i = e.length;
                while (i--) if (!e[i](t, n, r)) return !1;
                return !0;
            } : e[0];
        }
        function mt(e, t, n, r, i) {
            var o, a = [], s = 0, u = e.length, l = null != t;
            for (;u > s; s++) (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
            return a;
        }
        function yt(e, t, n, r, i, o) {
            return r && !r[x] && (r = yt(r)), i && !i[x] && (i = yt(i, o)), ot(function(o, a, s, u) {
                var l, c, p, f = [], d = [], h = a.length, g = o || xt(t || "*", s.nodeType ? [ s ] : s, []), m = !e || !o && t ? g : mt(g, f, e, s, u), y = n ? i || (o ? e : h || r) ? [] : a : m;
                if (n && n(m, y, s, u), r) {
                    l = mt(y, d), r(l, [], s, u), c = l.length;
                    while (c--) (p = l[c]) && (y[d[c]] = !(m[d[c]] = p));
                }
                if (o) {
                    if (i || e) {
                        if (i) {
                            l = [], c = y.length;
                            while (c--) (p = y[c]) && l.push(m[c] = p);
                            i(null, y = [], l, u);
                        }
                        c = y.length;
                        while (c--) (p = y[c]) && (l = i ? M.call(o, p) : f[c]) > -1 && (o[l] = !(a[l] = p));
                    }
                } else y = mt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, u) : H.apply(a, y);
            });
        }
        function vt(e) {
            var t, n, r, o = e.length, a = i.relative[e[0].type], s = a || i.relative[" "], u = a ? 1 : 0, c = ht(function(e) {
                return e === t;
            }, s, !0), p = ht(function(e) {
                return M.call(t, e) > -1;
            }, s, !0), f = [ function(e, n, r) {
                return !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r));
            } ];
            for (;o > u; u++) if (n = i.relative[e[u].type]) f = [ ht(gt(f), n) ]; else {
                if (n = i.filter[e[u].type].apply(null, e[u].matches), n[x]) {
                    for (r = ++u; o > r; r++) if (i.relative[e[r].type]) break;
                    return yt(u > 1 && gt(f), u > 1 && dt(e.slice(0, u - 1)).replace(W, "$1"), n, r > u && vt(e.slice(u, r)), o > r && vt(e = e.slice(r)), o > r && dt(e));
                }
                f.push(n);
            }
            return gt(f);
        }
        function bt(e, t) {
            var n = 0, o = t.length > 0, a = e.length > 0, s = function(s, u, c, f, d) {
                var h, g, m, y = [], v = 0, b = "0", x = s && [], w = null != d, T = l, C = s || a && i.find.TAG("*", d && u.parentNode || u), k = N += null == T ? 1 : Math.random() || .1;
                for (w && (l = u !== p && u, r = n); null != (h = C[b]); b++) {
                    if (a && h) {
                        g = 0;
                        while (m = e[g++]) if (m(h, u, c)) {
                            f.push(h);
                            break;
                        }
                        w && (N = k, r = ++n);
                    }
                    o && ((h = !m && h) && v--, s && x.push(h));
                }
                if (v += b, o && b !== v) {
                    g = 0;
                    while (m = t[g++]) m(x, y, u, c);
                    if (s) {
                        if (v > 0) while (b--) x[b] || y[b] || (y[b] = L.call(f));
                        y = mt(y);
                    }
                    H.apply(f, y), w && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(f);
                }
                return w && (N = k, l = T), x;
            };
            return o ? ot(s) : s;
        }
        s = st.compile = function(e, t) {
            var n, r = [], i = [], o = S[e + " "];
            if (!o) {
                t || (t = ft(e)), n = t.length;
                while (n--) o = vt(t[n]), o[x] ? r.push(o) : i.push(o);
                o = S(e, bt(i, r));
            }
            return o;
        };
        function xt(e, t, n) {
            var r = 0, i = t.length;
            for (;i > r; r++) st(e, t[r], n);
            return n;
        }
        function wt(e, t, n, r) {
            var o, a, u, l, c, p = ft(e);
            if (!r && 1 === p.length) {
                if (a = p[0] = p[0].slice(0), a.length > 2 && "ID" === (u = a[0]).type && 9 === t.nodeType && !d && i.relative[a[1].type]) {
                    if (t = i.find.ID(u.matches[0].replace(et, tt), t)[0], !t) return n;
                    e = e.slice(a.shift().value.length);
                }
                o = U.needsContext.test(e) ? 0 : a.length;
                while (o--) {
                    if (u = a[o], i.relative[l = u.type]) break;
                    if ((c = i.find[l]) && (r = c(u.matches[0].replace(et, tt), V.test(a[0].type) && t.parentNode || t))) {
                        if (a.splice(o, 1), e = r.length && dt(a), !e) return H.apply(n, q.call(r, 0)), 
                        n;
                        break;
                    }
                }
            }
            return s(e, p)(r, t, d, n, V.test(e)), n;
        }
        i.pseudos.nth = i.pseudos.eq;
        function Tt() {}
        i.filters = Tt.prototype = i.pseudos, i.setFilters = new Tt(), c(), st.attr = b.attr, 
        b.find = st, b.expr = st.selectors, b.expr[":"] = b.expr.pseudos, b.unique = st.uniqueSort, 
        b.text = st.getText, b.isXMLDoc = st.isXML, b.contains = st.contains;
    }(e);
    var at = /Until$/, st = /^(?:parents|prev(?:Until|All))/, ut = /^.[^:#\[\.,]*$/, lt = b.expr.match.needsContext, ct = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    b.fn.extend({
        find: function(e) {
            var t, n, r, i = this.length;
            if ("string" != typeof e) return r = this, this.pushStack(b(e).filter(function() {
                for (t = 0; i > t; t++) if (b.contains(r[t], this)) return !0;
            }));
            for (n = [], t = 0; i > t; t++) b.find(e, this[t], n);
            return n = this.pushStack(i > 1 ? b.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, 
            n;
        },
        has: function(e) {
            var t, n = b(e, this), r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++) if (b.contains(this, n[t])) return !0;
            });
        },
        not: function(e) {
            return this.pushStack(ft(this, e, !1));
        },
        filter: function(e) {
            return this.pushStack(ft(this, e, !0));
        },
        is: function(e) {
            return !!e && ("string" == typeof e ? lt.test(e) ? b(e, this.context).index(this[0]) >= 0 : b.filter(e, this).length > 0 : this.filter(e).length > 0);
        },
        closest: function(e, t) {
            var n, r = 0, i = this.length, o = [], a = lt.test(e) || "string" != typeof e ? b(e, t || this.context) : 0;
            for (;i > r; r++) {
                n = this[r];
                while (n && n.ownerDocument && n !== t && 11 !== n.nodeType) {
                    if (a ? a.index(n) > -1 : b.find.matchesSelector(n, e)) {
                        o.push(n);
                        break;
                    }
                    n = n.parentNode;
                }
            }
            return this.pushStack(o.length > 1 ? b.unique(o) : o);
        },
        index: function(e) {
            return e ? "string" == typeof e ? b.inArray(this[0], b(e)) : b.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e, t) {
            var n = "string" == typeof e ? b(e, t) : b.makeArray(e && e.nodeType ? [ e ] : e), r = b.merge(this.get(), n);
            return this.pushStack(b.unique(r));
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    }), b.fn.andSelf = b.fn.addBack;
    function pt(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e;
    }
    b.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
            return b.dir(e, "parentNode");
        },
        parentsUntil: function(e, t, n) {
            return b.dir(e, "parentNode", n);
        },
        next: function(e) {
            return pt(e, "nextSibling");
        },
        prev: function(e) {
            return pt(e, "previousSibling");
        },
        nextAll: function(e) {
            return b.dir(e, "nextSibling");
        },
        prevAll: function(e) {
            return b.dir(e, "previousSibling");
        },
        nextUntil: function(e, t, n) {
            return b.dir(e, "nextSibling", n);
        },
        prevUntil: function(e, t, n) {
            return b.dir(e, "previousSibling", n);
        },
        siblings: function(e) {
            return b.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return b.sibling(e.firstChild);
        },
        contents: function(e) {
            return b.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : b.merge([], e.childNodes);
        }
    }, function(e, t) {
        b.fn[e] = function(n, r) {
            var i = b.map(this, t, n);
            return at.test(e) || (r = n), r && "string" == typeof r && (i = b.filter(r, i)), 
            i = this.length > 1 && !ct[e] ? b.unique(i) : i, this.length > 1 && st.test(e) && (i = i.reverse()), 
            this.pushStack(i);
        };
    }), b.extend({
        filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"), 1 === t.length ? b.find.matchesSelector(t[0], e) ? [ t[0] ] : [] : b.find.matches(e, t);
        },
        dir: function(e, n, r) {
            var i = [], o = e[n];
            while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !b(o).is(r))) 1 === o.nodeType && i.push(o), 
            o = o[n];
            return i;
        },
        sibling: function(e, t) {
            var n = [];
            for (;e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n;
        }
    });
    function ft(e, t, n) {
        if (t = t || 0, b.isFunction(t)) return b.grep(e, function(e, r) {
            var i = !!t.call(e, r, e);
            return i === n;
        });
        if (t.nodeType) return b.grep(e, function(e) {
            return e === t === n;
        });
        if ("string" == typeof t) {
            var r = b.grep(e, function(e) {
                return 1 === e.nodeType;
            });
            if (ut.test(t)) return b.filter(t, r, !n);
            t = b.filter(t, r);
        }
        return b.grep(e, function(e) {
            return b.inArray(e, t) >= 0 === n;
        });
    }
    function dt(e) {
        var t = ht.split("|"), n = e.createDocumentFragment();
        if (n.createElement) while (t.length) n.createElement(t.pop());
        return n;
    }
    var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gt = / jQuery\d+="(?:null|\d+)"/g, mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"), yt = /^\s+/, vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bt = /<([\w:]+)/, xt = /<tbody/i, wt = /<|&#?\w+;/, Tt = /<(?:script|style|link)/i, Nt = /^(?:checkbox|radio)$/i, Ct = /checked\s*(?:[^=]|=\s*.checked.)/i, kt = /^$|\/(?:java|ecma)script/i, Et = /^true\/(.*)/, St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, At = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: b.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, jt = dt(o), Dt = jt.appendChild(o.createElement("div"));
    At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, 
    At.th = At.td, b.fn.extend({
        text: function(e) {
            return b.access(this, function(e) {
                return e === t ? b.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e));
            }, null, e, arguments.length);
        },
        wrapAll: function(e) {
            if (b.isFunction(e)) return this.each(function(t) {
                b(this).wrapAll(e.call(this, t));
            });
            if (this[0]) {
                var t = b(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    var e = this;
                    while (e.firstChild && 1 === e.firstChild.nodeType) e = e.firstChild;
                    return e;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(e) {
            return b.isFunction(e) ? this.each(function(t) {
                b(this).wrapInner(e.call(this, t));
            }) : this.each(function() {
                var t = b(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
            });
        },
        wrap: function(e) {
            var t = b.isFunction(e);
            return this.each(function(n) {
                b(this).wrapAll(t ? e.call(this, n) : e);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                b.nodeName(this, "body") || b(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function() {
            return this.domManip(arguments, !0, function(e) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e);
            });
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(e) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild);
            });
        },
        before: function() {
            return this.domManip(arguments, !1, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function() {
            return this.domManip(arguments, !1, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        remove: function(e, t) {
            var n, r = 0;
            for (;null != (n = this[r]); r++) (!e || b.filter(e, [ n ]).length > 0) && (t || 1 !== n.nodeType || b.cleanData(Ot(n)), 
            n.parentNode && (t && b.contains(n.ownerDocument, n) && Mt(Ot(n, "script")), n.parentNode.removeChild(n)));
            return this;
        },
        empty: function() {
            var e, t = 0;
            for (;null != (e = this[t]); t++) {
                1 === e.nodeType && b.cleanData(Ot(e, !1));
                while (e.firstChild) e.removeChild(e.firstChild);
                e.options && b.nodeName(e, "select") && (e.options.length = 0);
            }
            return this;
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return b.clone(this, e, t);
            });
        },
        html: function(e) {
            return b.access(this, function(e) {
                var n = this[0] || {}, r = 0, i = this.length;
                if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t;
                if (!("string" != typeof e || Tt.test(e) || !b.support.htmlSerialize && mt.test(e) || !b.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || [ "", "" ])[1].toLowerCase()])) {
                    e = e.replace(vt, "<$1></$2>");
                    try {
                        for (;i > r; r++) n = this[r] || {}, 1 === n.nodeType && (b.cleanData(Ot(n, !1)), 
                        n.innerHTML = e);
                        n = 0;
                    } catch (o) {}
                }
                n && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function(e) {
            var t = b.isFunction(e);
            return t || "string" == typeof e || (e = b(e).not(this).detach()), this.domManip([ e ], !0, function(e) {
                var t = this.nextSibling, n = this.parentNode;
                n && (b(this).remove(), n.insertBefore(e, t));
            });
        },
        detach: function(e) {
            return this.remove(e, !0);
        },
        domManip: function(e, n, r) {
            e = f.apply([], e);
            var i, o, a, s, u, l, c = 0, p = this.length, d = this, h = p - 1, g = e[0], m = b.isFunction(g);
            if (m || !(1 >= p || "string" != typeof g || b.support.checkClone) && Ct.test(g)) return this.each(function(i) {
                var o = d.eq(i);
                m && (e[0] = g.call(this, i, n ? o.html() : t)), o.domManip(e, n, r);
            });
            if (p && (l = b.buildFragment(e, this[0].ownerDocument, !1, this), i = l.firstChild, 
            1 === l.childNodes.length && (l = i), i)) {
                for (n = n && b.nodeName(i, "tr"), s = b.map(Ot(l, "script"), Ht), a = s.length; p > c; c++) o = l, 
                c !== h && (o = b.clone(o, !0, !0), a && b.merge(s, Ot(o, "script"))), r.call(n && b.nodeName(this[c], "table") ? Lt(this[c], "tbody") : this[c], o, c);
                if (a) for (u = s[s.length - 1].ownerDocument, b.map(s, qt), c = 0; a > c; c++) o = s[c], 
                kt.test(o.type || "") && !b._data(o, "globalEval") && b.contains(u, o) && (o.src ? b.ajax({
                    url: o.src,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                }) : b.globalEval((o.text || o.textContent || o.innerHTML || "").replace(St, "")));
                l = i = null;
            }
            return this;
        }
    });
    function Lt(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t));
    }
    function Ht(e) {
        var t = e.getAttributeNode("type");
        return e.type = (t && t.specified) + "/" + e.type, e;
    }
    function qt(e) {
        var t = Et.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e;
    }
    function Mt(e, t) {
        var n, r = 0;
        for (;null != (n = e[r]); r++) b._data(n, "globalEval", !t || b._data(t[r], "globalEval"));
    }
    function _t(e, t) {
        if (1 === t.nodeType && b.hasData(e)) {
            var n, r, i, o = b._data(e), a = b._data(t, o), s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s) for (r = 0, i = s[n].length; i > r; r++) b.event.add(t, n, s[n][r]);
            }
            a.data && (a.data = b.extend({}, a.data));
        }
    }
    function Ft(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !b.support.noCloneEvent && t[b.expando]) {
                i = b._data(t);
                for (r in i.events) b.removeEvent(t, r, i.handle);
                t.removeAttribute(b.expando);
            }
            "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), 
            b.support.html5Clone && e.innerHTML && !b.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Nt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, 
            t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
        }
    }
    b.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        b.fn[e] = function(e) {
            var n, r = 0, i = [], o = b(e), a = o.length - 1;
            for (;a >= r; r++) n = r === a ? this : this.clone(!0), b(o[r])[t](n), d.apply(i, n.get());
            return this.pushStack(i);
        };
    });
    function Ot(e, n) {
        var r, o, a = 0, s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
        if (!s) for (s = [], r = e.childNodes || e; null != (o = r[a]); a++) !n || b.nodeName(o, n) ? s.push(o) : b.merge(s, Ot(o, n));
        return n === t || n && b.nodeName(e, n) ? b.merge([ e ], s) : s;
    }
    function Bt(e) {
        Nt.test(e.type) && (e.defaultChecked = e.checked);
    }
    b.extend({
        clone: function(e, t, n) {
            var r, i, o, a, s, u = b.contains(e.ownerDocument, e);
            if (b.support.html5Clone || b.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, 
            Dt.removeChild(o = Dt.firstChild)), !(b.support.noCloneEvent && b.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || b.isXMLDoc(e))) for (r = Ot(o), 
            s = Ot(e), a = 0; null != (i = s[a]); ++a) r[a] && Ft(i, r[a]);
            if (t) if (n) for (s = s || Ot(e), r = r || Ot(o), a = 0; null != (i = s[a]); a++) _t(i, r[a]); else _t(e, o);
            return r = Ot(o, "script"), r.length > 0 && Mt(r, !u && Ot(e, "script")), r = s = i = null, 
            o;
        },
        buildFragment: function(e, t, n, r) {
            var i, o, a, s, u, l, c, p = e.length, f = dt(t), d = [], h = 0;
            for (;p > h; h++) if (o = e[h], o || 0 === o) if ("object" === b.type(o)) b.merge(d, o.nodeType ? [ o ] : o); else if (wt.test(o)) {
                s = s || f.appendChild(t.createElement("div")), u = (bt.exec(o) || [ "", "" ])[1].toLowerCase(), 
                c = At[u] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], 
                i = c[0];
                while (i--) s = s.lastChild;
                if (!b.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), 
                !b.support.tbody) {
                    o = "table" !== u || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, 
                    i = o && o.childNodes.length;
                    while (i--) b.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
                }
                b.merge(d, s.childNodes), s.textContent = "";
                while (s.firstChild) s.removeChild(s.firstChild);
                s = f.lastChild;
            } else d.push(t.createTextNode(o));
            s && f.removeChild(s), b.support.appendChecked || b.grep(Ot(d, "input"), Bt), h = 0;
            while (o = d[h++]) if ((!r || -1 === b.inArray(o, r)) && (a = b.contains(o.ownerDocument, o), 
            s = Ot(f.appendChild(o), "script"), a && Mt(s), n)) {
                i = 0;
                while (o = s[i++]) kt.test(o.type || "") && n.push(o);
            }
            return s = null, f;
        },
        cleanData: function(e, t) {
            var n, r, o, a, s = 0, u = b.expando, l = b.cache, p = b.support.deleteExpando, f = b.event.special;
            for (;null != (n = e[s]); s++) if ((t || b.acceptData(n)) && (o = n[u], a = o && l[o])) {
                if (a.events) for (r in a.events) f[r] ? b.event.remove(n, r) : b.removeEvent(n, r, a.handle);
                l[o] && (delete l[o], p ? delete n[u] : typeof n.removeAttribute !== i ? n.removeAttribute(u) : n[u] = null, 
                c.push(o));
            }
        }
    });
    var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i, It = /opacity\s*=\s*([^)]*)/, zt = /^(top|right|bottom|left)$/, Xt = /^(none|table(?!-c[ea]).+)/, Ut = /^margin/, Vt = RegExp("^(" + x + ")(.*)$", "i"), Yt = RegExp("^(" + x + ")(?!px)[a-z%]+$", "i"), Jt = RegExp("^([+-])=(" + x + ")", "i"), Gt = {
        BODY: "block"
    }, Qt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Kt = {
        letterSpacing: 0,
        fontWeight: 400
    }, Zt = [ "Top", "Right", "Bottom", "Left" ], en = [ "Webkit", "O", "Moz", "ms" ];
    function tn(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = en.length;
        while (i--) if (t = en[i] + n, t in e) return t;
        return r;
    }
    function nn(e, t) {
        return e = t || e, "none" === b.css(e, "display") || !b.contains(e.ownerDocument, e);
    }
    function rn(e, t) {
        var n, r, i, o = [], a = 0, s = e.length;
        for (;s > a; a++) r = e[a], r.style && (o[a] = b._data(r, "olddisplay"), n = r.style.display, 
        t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = b._data(r, "olddisplay", un(r.nodeName)))) : o[a] || (i = nn(r), 
        (n && "none" !== n || !i) && b._data(r, "olddisplay", i ? n : b.css(r, "display"))));
        for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e;
    }
    b.fn.extend({
        css: function(e, n) {
            return b.access(this, function(e, n, r) {
                var i, o, a = {}, s = 0;
                if (b.isArray(n)) {
                    for (o = Rt(e), i = n.length; i > s; s++) a[n[s]] = b.css(e, n[s], !1, o);
                    return a;
                }
                return r !== t ? b.style(e, n, r) : b.css(e, n);
            }, e, n, arguments.length > 1);
        },
        show: function() {
            return rn(this, !0);
        },
        hide: function() {
            return rn(this);
        },
        toggle: function(e) {
            var t = "boolean" == typeof e;
            return this.each(function() {
                (t ? e : nn(this)) ? b(this).show() : b(this).hide();
            });
        }
    }), b.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Wt(e, "opacity");
                        return "" === n ? "1" : n;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": b.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, a, s, u = b.camelCase(n), l = e.style;
                if (n = b.cssProps[u] || (b.cssProps[u] = tn(l, u)), s = b.cssHooks[n] || b.cssHooks[u], 
                r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n];
                if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(b.css(e, n)), 
                a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || b.cssNumber[u] || (r += "px"), 
                b.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), 
                s && "set" in s && (r = s.set(e, r, i)) === t))) try {
                    l[n] = r;
                } catch (c) {}
            }
        },
        css: function(e, n, r, i) {
            var o, a, s, u = b.camelCase(n);
            return n = b.cssProps[u] || (b.cssProps[u] = tn(e.style, u)), s = b.cssHooks[n] || b.cssHooks[u], 
            s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = Wt(e, n, i)), "normal" === a && n in Kt && (a = Kt[n]), 
            "" === r || r ? (o = parseFloat(a), r === !0 || b.isNumeric(o) ? o || 0 : a) : a;
        },
        swap: function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i;
        }
    }), e.getComputedStyle ? (Rt = function(t) {
        return e.getComputedStyle(t, null);
    }, Wt = function(e, n, r) {
        var i, o, a, s = r || Rt(e), u = s ? s.getPropertyValue(n) || s[n] : t, l = e.style;
        return s && ("" !== u || b.contains(e.ownerDocument, e) || (u = b.style(e, n)), 
        Yt.test(u) && Ut.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, 
        u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u;
    }) : o.documentElement.currentStyle && (Rt = function(e) {
        return e.currentStyle;
    }, Wt = function(e, n, r) {
        var i, o, a, s = r || Rt(e), u = s ? s[n] : t, l = e.style;
        return null == u && l && l[n] && (u = l[n]), Yt.test(u) && !zt.test(n) && (i = l.left, 
        o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, 
        u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u;
    });
    function on(e, t, n) {
        var r = Vt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
    }
    function an(e, t, n, r, i) {
        var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0;
        for (;4 > o; o += 2) "margin" === n && (a += b.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= b.css(e, "padding" + Zt[o], !0, i)), 
        "margin" !== n && (a -= b.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += b.css(e, "padding" + Zt[o], !0, i), 
        "padding" !== n && (a += b.css(e, "border" + Zt[o] + "Width", !0, i)));
        return a;
    }
    function sn(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Rt(e), a = b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i)) return i;
            r = a && (b.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0;
        }
        return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px";
    }
    function un(e) {
        var t = o, n = Gt[e];
        return n || (n = ln(e, t), "none" !== n && n || (Pt = (Pt || b("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), 
        t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), 
        t.close(), n = ln(e, t), Pt.detach()), Gt[e] = n), n;
    }
    function ln(e, t) {
        var n = b(t.createElement(e)).appendTo(t.body), r = b.css(n[0], "display");
        return n.remove(), r;
    }
    b.each([ "height", "width" ], function(e, n) {
        b.cssHooks[n] = {
            get: function(e, r, i) {
                return r ? 0 === e.offsetWidth && Xt.test(b.css(e, "display")) ? b.swap(e, Qt, function() {
                    return sn(e, n, i);
                }) : sn(e, n, i) : t;
            },
            set: function(e, t, r) {
                var i = r && Rt(e);
                return on(e, t, r ? an(e, n, r, b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, i), i) : 0);
            }
        };
    }), b.support.opacity || (b.cssHooks.opacity = {
        get: function(e, t) {
            return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
        },
        set: function(e, t) {
            var n = e.style, r = e.currentStyle, i = b.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === b.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), 
            "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i);
        }
    }), b(function() {
        b.support.reliableMarginRight || (b.cssHooks.marginRight = {
            get: function(e, n) {
                return n ? b.swap(e, {
                    display: "inline-block"
                }, Wt, [ e, "marginRight" ]) : t;
            }
        }), !b.support.pixelPosition && b.fn.position && b.each([ "top", "left" ], function(e, n) {
            b.cssHooks[n] = {
                get: function(e, r) {
                    return r ? (r = Wt(e, n), Yt.test(r) ? b(e).position()[n] + "px" : r) : t;
                }
            };
        });
    }), b.expr && b.expr.filters && (b.expr.filters.hidden = function(e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !b.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || b.css(e, "display"));
    }, b.expr.filters.visible = function(e) {
        return !b.expr.filters.hidden(e);
    }), b.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        b.cssHooks[e + t] = {
            expand: function(n) {
                var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [ n ];
                for (;4 > r; r++) i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0];
                return i;
            }
        }, Ut.test(e) || (b.cssHooks[e + t].set = on);
    });
    var cn = /%20/g, pn = /\[\]$/, fn = /\r?\n/g, dn = /^(?:submit|button|image|reset|file)$/i, hn = /^(?:input|select|textarea|keygen)/i;
    b.fn.extend({
        serialize: function() {
            return b.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = b.prop(this, "elements");
                return e ? b.makeArray(e) : this;
            }).filter(function() {
                var e = this.type;
                return this.name && !b(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Nt.test(e));
            }).map(function(e, t) {
                var n = b(this).val();
                return null == n ? null : b.isArray(n) ? b.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(fn, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(fn, "\r\n")
                };
            }).get();
        }
    }), b.param = function(e, n) {
        var r, i = [], o = function(e, t) {
            t = b.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        };
        if (n === t && (n = b.ajaxSettings && b.ajaxSettings.traditional), b.isArray(e) || e.jquery && !b.isPlainObject(e)) b.each(e, function() {
            o(this.name, this.value);
        }); else for (r in e) gn(r, e[r], n, o);
        return i.join("&").replace(cn, "+");
    };
    function gn(e, t, n, r) {
        var i;
        if (b.isArray(t)) b.each(t, function(t, i) {
            n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
        }); else if (n || "object" !== b.type(t)) r(e, t); else for (i in t) gn(e + "[" + i + "]", t[i], n, r);
    }
    b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        b.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
        };
    }), b.fn.hover = function(e, t) {
        return this.mouseenter(e).mouseleave(t || e);
    };
    var mn, yn, vn = b.now(), bn = /\?/, xn = /#.*$/, wn = /([?&])_=[^&]*/, Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Nn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Cn = /^(?:GET|HEAD)$/, kn = /^\/\//, En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Sn = b.fn.load, An = {}, jn = {}, Dn = "*/".concat("*");
    try {
        yn = a.href;
    } catch (Ln) {
        yn = o.createElement("a"), yn.href = "", yn = yn.href;
    }
    mn = En.exec(yn.toLowerCase()) || [];
    function Hn(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(w) || [];
            if (b.isFunction(n)) while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
        };
    }
    function qn(e, n, r, i) {
        var o = {}, a = e === jn;
        function s(u) {
            var l;
            return o[u] = !0, b.each(e[u] || [], function(e, u) {
                var c = u(n, r, i);
                return "string" != typeof c || a || o[c] ? a ? !(l = c) : t : (n.dataTypes.unshift(c), 
                s(c), !1);
            }), l;
        }
        return s(n.dataTypes[0]) || !o["*"] && s("*");
    }
    function Mn(e, n) {
        var r, i, o = b.ajaxSettings.flatOptions || {};
        for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
        return r && b.extend(!0, e, r), e;
    }
    b.fn.load = function(e, n, r) {
        if ("string" != typeof e && Sn) return Sn.apply(this, arguments);
        var i, o, a, s = this, u = e.indexOf(" ");
        return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)), b.isFunction(n) ? (r = n, 
        n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && b.ajax({
            url: e,
            type: a,
            dataType: "html",
            data: n
        }).done(function(e) {
            o = arguments, s.html(i ? b("<div>").append(b.parseHTML(e)).find(i) : e);
        }).complete(r && function(e, t) {
            s.each(r, o || [ e.responseText, t, e ]);
        }), this;
    }, b.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
        b.fn[t] = function(e) {
            return this.on(t, e);
        };
    }), b.each([ "get", "post" ], function(e, n) {
        b[n] = function(e, r, i, o) {
            return b.isFunction(r) && (o = o || i, i = r, r = t), b.ajax({
                url: e,
                type: n,
                dataType: o,
                data: r,
                success: i
            });
        };
    }), b.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: yn,
            type: "GET",
            isLocal: Nn.test(mn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Dn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": b.parseJSON,
                "text xml": b.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Mn(Mn(e, b.ajaxSettings), t) : Mn(b.ajaxSettings, e);
        },
        ajaxPrefilter: Hn(An),
        ajaxTransport: Hn(jn),
        ajax: function(e, n) {
            "object" == typeof e && (n = e, e = t), n = n || {};
            var r, i, o, a, s, u, l, c, p = b.ajaxSetup({}, n), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? b(f) : b.event, h = b.Deferred(), g = b.Callbacks("once memory"), m = p.statusCode || {}, y = {}, v = {}, x = 0, T = "canceled", N = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === x) {
                        if (!c) {
                            c = {};
                            while (t = Tn.exec(a)) c[t[1].toLowerCase()] = t[2];
                        }
                        t = c[e.toLowerCase()];
                    }
                    return null == t ? null : t;
                },
                getAllResponseHeaders: function() {
                    return 2 === x ? a : null;
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return x || (e = v[n] = v[n] || e, y[e] = t), this;
                },
                overrideMimeType: function(e) {
                    return x || (p.mimeType = e), this;
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (2 > x) for (t in e) m[t] = [ m[t], e[t] ]; else N.always(e[N.status]);
                    return this;
                },
                abort: function(e) {
                    var t = e || T;
                    return l && l.abort(t), k(0, t), this;
                }
            };
            if (h.promise(N).complete = g.add, N.success = N.done, N.error = N.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), 
            p.type = n.method || n.type || p.method || p.type, p.dataTypes = b.trim(p.dataType || "*").toLowerCase().match(w) || [ "" ], 
            null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? 80 : 443)) == (mn[3] || ("http:" === mn[1] ? 80 : 443)))), 
            p.data && p.processData && "string" != typeof p.data && (p.data = b.param(p.data, p.traditional)), 
            qn(An, p, n, N), 2 === x) return N;
            u = p.global, u && 0 === b.active++ && b.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), 
            p.hasContent = !Cn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, 
            delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), 
            p.ifModified && (b.lastModified[o] && N.setRequestHeader("If-Modified-Since", b.lastModified[o]), 
            b.etag[o] && N.setRequestHeader("If-None-Match", b.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && N.setRequestHeader("Content-Type", p.contentType), 
            N.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]);
            for (i in p.headers) N.setRequestHeader(i, p.headers[i]);
            if (p.beforeSend && (p.beforeSend.call(f, N, p) === !1 || 2 === x)) return N.abort();
            T = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) N[i](p[i]);
            if (l = qn(jn, p, n, N)) {
                N.readyState = 1, u && d.trigger("ajaxSend", [ N, p ]), p.async && p.timeout > 0 && (s = setTimeout(function() {
                    N.abort("timeout");
                }, p.timeout));
                try {
                    x = 1, l.send(y, k);
                } catch (C) {
                    if (!(2 > x)) throw C;
                    k(-1, C);
                }
            } else k(-1, "No Transport");
            function k(e, n, r, i) {
                var c, y, v, w, T, C = n;
                2 !== x && (x = 2, s && clearTimeout(s), l = t, a = i || "", N.readyState = e > 0 ? 4 : 0, 
                r && (w = _n(p, N, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (T = N.getResponseHeader("Last-Modified"), 
                T && (b.lastModified[o] = T), T = N.getResponseHeader("etag"), T && (b.etag[o] = T)), 
                204 === e ? (c = !0, C = "nocontent") : 304 === e ? (c = !0, C = "notmodified") : (c = Fn(p, w), 
                C = c.state, y = c.data, v = c.error, c = !v)) : (v = C, (e || !C) && (C = "error", 
                0 > e && (e = 0))), N.status = e, N.statusText = (n || C) + "", c ? h.resolveWith(f, [ y, C, N ]) : h.rejectWith(f, [ N, C, v ]), 
                N.statusCode(m), m = t, u && d.trigger(c ? "ajaxSuccess" : "ajaxError", [ N, p, c ? y : v ]), 
                g.fireWith(f, [ N, C ]), u && (d.trigger("ajaxComplete", [ N, p ]), --b.active || b.event.trigger("ajaxStop")));
            }
            return N;
        },
        getScript: function(e, n) {
            return b.get(e, t, n, "script");
        },
        getJSON: function(e, t, n) {
            return b.get(e, t, n, "json");
        }
    });
    function _n(e, n, r) {
        var i, o, a, s, u = e.contents, l = e.dataTypes, c = e.responseFields;
        for (s in c) s in r && (n[c[s]] = r[s]);
        while ("*" === l[0]) l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
        if (o) for (s in u) if (u[s] && u[s].test(o)) {
            l.unshift(s);
            break;
        }
        if (l[0] in r) a = l[0]; else {
            for (s in r) {
                if (!l[0] || e.converters[s + " " + l[0]]) {
                    a = s;
                    break;
                }
                i || (i = s);
            }
            a = a || i;
        }
        return a ? (a !== l[0] && l.unshift(a), r[a]) : t;
    }
    function Fn(e, t) {
        var n, r, i, o, a = {}, s = 0, u = e.dataTypes.slice(), l = u[0];
        if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), u[1]) for (i in e.converters) a[i.toLowerCase()] = e.converters[i];
        for (;r = u[++s]; ) if ("*" !== r) {
            if ("*" !== l && l !== r) {
                if (i = a[l + " " + r] || a["* " + r], !i) for (n in a) if (o = n.split(" "), o[1] === r && (i = a[l + " " + o[0]] || a["* " + o[0]])) {
                    i === !0 ? i = a[n] : a[n] !== !0 && (r = o[0], u.splice(s--, 0, r));
                    break;
                }
                if (i !== !0) if (i && e["throws"]) t = i(t); else try {
                    t = i(t);
                } catch (c) {
                    return {
                        state: "parsererror",
                        error: i ? c : "No conversion from " + l + " to " + r
                    };
                }
            }
            l = r;
        }
        return {
            state: "success",
            data: t
        };
    }
    b.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return b.globalEval(e), e;
            }
        }
    }), b.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
    }), b.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, r = o.head || b("head")[0] || o.documentElement;
            return {
                send: function(t, i) {
                    n = o.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), 
                    n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
                        (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, 
                        n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"));
                    }, r.insertBefore(n, r.firstChild);
                },
                abort: function() {
                    n && n.onload(t, !0);
                }
            };
        }
    });
    var On = [], Bn = /(=)\?(?=&|$)|\?\?/;
    b.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = On.pop() || b.expando + "_" + vn++;
            return this[e] = !0, e;
        }
    }), b.ajaxPrefilter("json jsonp", function(n, r, i) {
        var o, a, s, u = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data");
        return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = b.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, 
        u ? n[u] = n[u].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), 
        n.converters["script json"] = function() {
            return s || b.error(o + " was not called"), s[0];
        }, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
            s = arguments;
        }, i.always(function() {
            e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, On.push(o)), s && b.isFunction(a) && a(s[0]), 
            s = a = t;
        }), "script") : t;
    });
    var Pn, Rn, Wn = 0, $n = e.ActiveXObject && function() {
        var e;
        for (e in Pn) Pn[e](t, !0);
    };
    function In() {
        try {
            return new e.XMLHttpRequest();
        } catch (t) {}
    }
    function zn() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP");
        } catch (t) {}
    }
    b.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && In() || zn();
    } : In, Rn = b.ajaxSettings.xhr(), b.support.cors = !!Rn && "withCredentials" in Rn, 
    Rn = b.support.ajax = !!Rn, Rn && b.ajaxTransport(function(n) {
        if (!n.crossDomain || b.support.cors) {
            var r;
            return {
                send: function(i, o) {
                    var a, s, u = n.xhr();
                    if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), 
                    n.xhrFields) for (s in n.xhrFields) u[s] = n.xhrFields[s];
                    n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (s in i) u.setRequestHeader(s, i[s]);
                    } catch (l) {}
                    u.send(n.hasContent && n.data || null), r = function(e, i) {
                        var s, l, c, p;
                        try {
                            if (r && (i || 4 === u.readyState)) if (r = t, a && (u.onreadystatechange = b.noop, 
                            $n && delete Pn[a]), i) 4 !== u.readyState && u.abort(); else {
                                p = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (p.text = u.responseText);
                                try {
                                    c = u.statusText;
                                } catch (f) {
                                    c = "";
                                }
                                s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404;
                            }
                        } catch (d) {
                            i || o(-1, d);
                        }
                        p && o(s, c, p, l);
                    }, n.async ? 4 === u.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, 
                    b(e).unload($n)), Pn[a] = r), u.onreadystatechange = r) : r();
                },
                abort: function() {
                    r && r(t, !0);
                }
            };
        }
    });
    var Xn, Un, Vn = /^(?:toggle|show|hide)$/, Yn = RegExp("^(?:([+-])=|)(" + x + ")([a-z%]*)$", "i"), Jn = /queueHooks$/, Gn = [ nr ], Qn = {
        "*": [ function(e, t) {
            var n, r, i = this.createTween(e, t), o = Yn.exec(t), a = i.cur(), s = +a || 0, u = 1, l = 20;
            if (o) {
                if (n = +o[2], r = o[3] || (b.cssNumber[e] ? "" : "px"), "px" !== r && s) {
                    s = b.css(i.elem, e, !0) || n || 1;
                    do u = u || ".5", s /= u, b.style(i.elem, e, s + r); while (u !== (u = i.cur() / a) && 1 !== u && --l);
                }
                i.unit = r, i.start = s, i.end = o[1] ? s + (o[1] + 1) * n : n;
            }
            return i;
        } ]
    };
    function Kn() {
        return setTimeout(function() {
            Xn = t;
        }), Xn = b.now();
    }
    function Zn(e, t) {
        b.each(t, function(t, n) {
            var r = (Qn[t] || []).concat(Qn["*"]), i = 0, o = r.length;
            for (;o > i; i++) if (r[i].call(e, t, n)) return;
        });
    }
    function er(e, t, n) {
        var r, i, o = 0, a = Gn.length, s = b.Deferred().always(function() {
            delete u.elem;
        }), u = function() {
            if (i) return !1;
            var t = Xn || Kn(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length;
            for (;u > a; a++) l.tweens[a].run(o);
            return s.notifyWith(e, [ l, o, n ]), 1 > o && u ? n : (s.resolveWith(e, [ l ]), 
            !1);
        }, l = s.promise({
            elem: e,
            props: b.extend({}, t),
            opts: b.extend(!0, {
                specialEasing: {}
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Xn || Kn(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = b.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r), r;
            },
            stop: function(t) {
                var n = 0, r = t ? l.tweens.length : 0;
                if (i) return this;
                for (i = !0; r > n; n++) l.tweens[n].run(1);
                return t ? s.resolveWith(e, [ l, t ]) : s.rejectWith(e, [ l, t ]), this;
            }
        }), c = l.props;
        for (tr(c, l.opts.specialEasing); a > o; o++) if (r = Gn[o].call(l, e, c, l.opts)) return r;
        return Zn(l, c), b.isFunction(l.opts.start) && l.opts.start.call(e, l), b.fx.timer(b.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
    }
    function tr(e, t) {
        var n, r, i, o, a;
        for (i in e) if (r = b.camelCase(i), o = t[r], n = e[i], b.isArray(n) && (o = n[1], 
        n = e[i] = n[0]), i !== r && (e[r] = n, delete e[i]), a = b.cssHooks[r], a && "expand" in a) {
            n = a.expand(n), delete e[r];
            for (i in n) i in e || (e[i] = n[i], t[i] = o);
        } else t[r] = o;
    }
    b.Animation = b.extend(er, {
        tweener: function(e, t) {
            b.isFunction(e) ? (t = e, e = [ "*" ]) : e = e.split(" ");
            var n, r = 0, i = e.length;
            for (;i > r; r++) n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t);
        },
        prefilter: function(e, t) {
            t ? Gn.unshift(e) : Gn.push(e);
        }
    });
    function nr(e, t, n) {
        var r, i, o, a, s, u, l, c, p, f = this, d = e.style, h = {}, g = [], m = e.nodeType && nn(e);
        n.queue || (c = b._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, p = c.empty.fire, 
        c.empty.fire = function() {
            c.unqueued || p();
        }), c.unqueued++, f.always(function() {
            f.always(function() {
                c.unqueued--, b.queue(e, "fx").length || c.empty.fire();
            });
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [ d.overflow, d.overflowX, d.overflowY ], 
        "inline" === b.css(e, "display") && "none" === b.css(e, "float") && (b.support.inlineBlockNeedsLayout && "inline" !== un(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), 
        n.overflow && (d.overflow = "hidden", b.support.shrinkWrapBlocks || f.always(function() {
            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2];
        }));
        for (i in t) if (a = t[i], Vn.exec(a)) {
            if (delete t[i], u = u || "toggle" === a, a === (m ? "hide" : "show")) continue;
            g.push(i);
        }
        if (o = g.length) {
            s = b._data(e, "fxshow") || b._data(e, "fxshow", {}), "hidden" in s && (m = s.hidden), 
            u && (s.hidden = !m), m ? b(e).show() : f.done(function() {
                b(e).hide();
            }), f.done(function() {
                var t;
                b._removeData(e, "fxshow");
                for (t in h) b.style(e, t, h[t]);
            });
            for (i = 0; o > i; i++) r = g[i], l = f.createTween(r, m ? s[r] : 0), h[r] = s[r] || b.style(e, r), 
            r in s || (s[r] = l.start, m && (l.end = l.start, l.start = "width" === r || "height" === r ? 1 : 0));
        }
    }
    function rr(e, t, n, r, i) {
        return new rr.prototype.init(e, t, n, r, i);
    }
    b.Tween = rr, rr.prototype = {
        constructor: rr,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), 
            this.end = r, this.unit = o || (b.cssNumber[n] ? "" : "px");
        },
        cur: function() {
            var e = rr.propHooks[this.prop];
            return e && e.get ? e.get(this) : rr.propHooks._default.get(this);
        },
        run: function(e) {
            var t, n = rr.propHooks[this.prop];
            return this.pos = t = this.options.duration ? b.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, 
            this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            n && n.set ? n.set(this) : rr.propHooks._default.set(this), this;
        }
    }, rr.prototype.init.prototype = rr.prototype, rr.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = b.css(e.elem, e.prop, ""), 
                t && "auto" !== t ? t : 0) : e.elem[e.prop];
            },
            set: function(e) {
                b.fx.step[e.prop] ? b.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[b.cssProps[e.prop]] || b.cssHooks[e.prop]) ? b.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
            }
        }
    }, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, b.each([ "toggle", "show", "hide" ], function(e, t) {
        var n = b.fn[t];
        b.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i);
        };
    }), b.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(nn).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r);
        },
        animate: function(e, t, n, r) {
            var i = b.isEmptyObject(e), o = b.speed(t, n, r), a = function() {
                var t = er(this, b.extend({}, e), o);
                a.finish = function() {
                    t.stop(!0);
                }, (i || b._data(this, "finish")) && t.stop(!0);
            };
            return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a);
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop, t(r);
            };
            return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), 
            this.each(function() {
                var t = !0, n = null != e && e + "queueHooks", o = b.timers, a = b._data(this);
                if (n) a[n] && a[n].stop && i(a[n]); else for (n in a) a[n] && a[n].stop && Jn.test(n) && i(a[n]);
                for (n = o.length; n--; ) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), 
                t = !1, o.splice(n, 1));
                (t || !r) && b.dequeue(this, e);
            });
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = b._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = b.timers, a = r ? r.length : 0;
                for (n.finish = !0, b.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), 
                t = o.length; t--; ) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), 
                o.splice(t, 1));
                for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish;
            });
        }
    });
    function ir(e, t) {
        var n, r = {
            height: e
        }, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Zt[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r;
    }
    b.each({
        slideDown: ir("show"),
        slideUp: ir("hide"),
        slideToggle: ir("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        b.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r);
        };
    }), b.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? b.extend({}, e) : {
            complete: n || !n && t || b.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !b.isFunction(t) && t
        };
        return r.duration = b.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in b.fx.speeds ? b.fx.speeds[r.duration] : b.fx.speeds._default, 
        (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            b.isFunction(r.old) && r.old.call(this), r.queue && b.dequeue(this, r.queue);
        }, r;
    }, b.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        }
    }, b.timers = [], b.fx = rr.prototype.init, b.fx.tick = function() {
        var e, n = b.timers, r = 0;
        for (Xn = b.now(); n.length > r; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1);
        n.length || b.fx.stop(), Xn = t;
    }, b.fx.timer = function(e) {
        e() && b.timers.push(e) && b.fx.start();
    }, b.fx.interval = 13, b.fx.start = function() {
        Un || (Un = setInterval(b.fx.tick, b.fx.interval));
    }, b.fx.stop = function() {
        clearInterval(Un), Un = null;
    }, b.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, b.fx.step = {}, b.expr && b.expr.filters && (b.expr.filters.animated = function(e) {
        return b.grep(b.timers, function(t) {
            return e === t.elem;
        }).length;
    }), b.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            b.offset.setOffset(this, e, t);
        });
        var n, r, o = {
            top: 0,
            left: 0
        }, a = this[0], s = a && a.ownerDocument;
        if (s) return n = s.documentElement, b.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), 
        r = or(s), {
            top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
            left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
        }) : o;
    }, b.offset = {
        setOffset: function(e, t, n) {
            var r = b.css(e, "position");
            "static" === r && (e.style.position = "relative");
            var i = b(e), o = i.offset(), a = b.css(e, "top"), s = b.css(e, "left"), u = ("absolute" === r || "fixed" === r) && b.inArray("auto", [ a, s ]) > -1, l = {}, c = {}, p, f;
            u ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), 
            b.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (l.top = t.top - o.top + p), 
            null != t.left && (l.left = t.left - o.left + f), "using" in t ? t.using.call(e, l) : i.css(l);
        }
    }, b.fn.extend({
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                }, r = this[0];
                return "fixed" === b.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), 
                t = this.offset(), b.nodeName(e[0], "html") || (n = e.offset()), n.top += b.css(e[0], "borderTopWidth", !0), 
                n.left += b.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - b.css(r, "marginTop", !0),
                    left: t.left - n.left - b.css(r, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || o.documentElement;
                while (e && !b.nodeName(e, "html") && "static" === b.css(e, "position")) e = e.offsetParent;
                return e || o.documentElement;
            });
        }
    }), b.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = /Y/.test(n);
        b.fn[e] = function(i) {
            return b.access(this, function(e, i, o) {
                var a = or(e);
                return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? b(a).scrollLeft() : o, r ? o : b(a).scrollTop()) : e[i] = o, 
                t);
            }, e, i, arguments.length, null);
        };
    });
    function or(e) {
        return b.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1;
    }
    b.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        b.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(r, i) {
            b.fn[i] = function(i, o) {
                var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border");
                return b.access(this, function(n, r, i) {
                    var o;
                    return b.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, 
                    Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? b.css(n, r, s) : b.style(n, r, i, s);
                }, n, a ? i : t, a, null);
            };
        });
    }), e.jQuery = e.$ = b, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return b;
    });
})(window);

(function(g) {
    var c = function() {
        Error.apply(this, arguments);
    };
    c.prototype = new Error();
    c.prototype.type = "XML-RPC fault";
    var a = g.xmlrpc = function(i, k) {
        if (arguments.length === 2) {
            k.url = i;
        } else {
            k = i;
            i = k.url;
        }
        k.dataType = "xml json";
        k.type = "POST";
        k.contentType = "text/xml";
        k.converters = {
            "xml json": a.parseDocument
        };
        var l = a.document(k.methodName, k.params);
        var j = new XMLSerializer();
        k.data = j.serializeToString(l);
        return g.ajax(k);
    };
    a.document = function(l, o) {
        var n = document.implementation.createDocument(null, null, null);
        var m = function(p) {
            return g(n.createElement(p));
        };
        var j = m("methodName").text(l);
        var i = m("params").append(g.map(o, function(q) {
            var p = m("value").append(a.toXmlRpc(q, m));
            return m("param").append(p);
        }));
        var k = m("methodCall").append(j, i);
        n.appendChild(k.get(0));
        return n;
    };
    var b = function(i) {
        return i === parseInt(i, 10) && !isNaN(i);
    };
    a.toXmlRpc = function(l, k) {
        if (l instanceof f) {
            return l.toXmlRpc(k);
        }
        var i = g.xmlrpc.types;
        var j = g.type(l);
        switch (j) {
          case "undefined":
          case "null":
            return i.nil.encode(l, k);

          case "date":
            return i["datetime.iso8601"].encode(l, k);

          case "object":
            if (l instanceof ArrayBuffer) {
                return i.base64.encode(l, k);
            } else {
                return i.struct.encode(l, k);
            }
            break;

          case "number":
            if (b(l)) {
                return i["int"].encode(l, k);
            } else {
                return i["double"].encode(l, k);
            }
            break;

          case "array":
          case "boolean":
          case "string":
            return i[j].encode(l, k);

          default:
            throw new Error("Unknown type", l);
        }
    };
    a.parseDocument = function(o) {
        var p = g(o);
        var i = p.children("methodresponse");
        var l = i.find("> fault");
        if (l.length === 0) {
            var j = i.find("> params > param > value > *");
            var k = j.toArray().map(a.parseNode);
            return k;
        } else {
            var n = a.parseNode(l.find("> value > *").get(0));
            var m = new c(n.faultString);
            m.msg = m.message = n.faultString;
            m.type = m.code = n.faultCode;
            throw m;
        }
    };
    a.parseNode = function(j) {
        if (j === undefined) {
            return null;
        }
        var i = j.nodeName.toLowerCase();
        if (i in a.types) {
            return a.types[i].decode(j);
        } else {
            throw new Error("Unknown type " + i);
        }
    };
    a.parseValue = function(i) {
        var j = g(i).children()[0];
        if (j) {
            return a.parseNode(j);
        } else {
            return g(i).text();
        }
    };
    var f = function() {};
    g.xmlrpc.types = {};
    a.makeType = function(j, o, k, m) {
        var i;
        i = function(p) {
            this.value = p;
        };
        i.prototype = new f();
        i.prototype.tagName = j;
        if (o) {
            var l = k, n = m;
            k = function(q, p) {
                var r = l(q);
                return p(i.tagName).text(r);
            };
            m = function(p) {
                return n(g(p).text(), p);
            };
        }
        i.prototype.toXmlRpc = function(p) {
            return i.encode(this.value, p);
        };
        i.tagName = j;
        i.encode = k;
        i.decode = m;
        a.types[j.toLowerCase()] = i;
    };
    var e = function(i) {
        return "" + Math.floor(i);
    };
    var d = function(j, i) {
        return parseInt(j, 10);
    };
    a.makeType("int", true, e, d), a.makeType("i4", true, e, d), a.makeType("i8", true, e, d), 
    a.makeType("i16", true, e, d), a.makeType("i32", true, e, d), a.makeType("double", true, String, function(i) {
        return parseFloat(i, 10);
    });
    a.makeType("string", true, String, String);
    a.makeType("boolean", true, function(i) {
        return i ? "1" : "0";
    }, function(i) {
        return i === "1";
    });
    var h = function(i) {
        return i < 10 ? "0" + i : i;
    };
    a.makeType("dateTime.iso8601", true, function(i) {
        return [ i.getUTCFullYear(), "-", h(i.getUTCMonth() + 1), "-", h(i.getUTCDate()), "T", h(i.getUTCHours()), ":", h(i.getUTCMinutes()), ":", h(i.getUTCSeconds()), "Z" ].join("");
    }, function(i) {
        return new Date(i);
    });
    a.binary = function() {
        var k = "=";
        var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        var j = i.reduce(function(n, m, l) {
            n[m] = l;
            return n;
        }, {});
        return {
            toBase64: function(p) {
                var o = [];
                var q = new Uint8Array(p);
                var m = 0, n;
                for (;m < q.length; m += 3) {
                    n = (q[m + 0] << 16) + (q[m + 1] << 8) + (q[m + 2] << 0);
                    o.push(i[(n >> 18) % 64]);
                    o.push(i[(n >> 12) % 64]);
                    o.push(i[(n >> 6) % 64]);
                    o.push(i[(n >> 0) % 64]);
                }
                var l = 3 - (p.byteLength % 3 || 3);
                while (l--) {
                    o[o.length - l - 1] = k;
                }
                return o.join("");
            },
            fromBase64: function(m) {
                var l = m.length;
                var s = l / 4 * 3;
                if (m.charAt(l - 1) === k) {
                    s--;
                }
                if (m.charAt(l - 2) === k) {
                    s--;
                }
                var q = new ArrayBuffer(s);
                var r = new Uint8Array(q);
                var o = 0, n = 0, p;
                for (;o < l; o += 4, n += 3) {
                    p = (j[m[o + 0]] << 18) + (j[m[o + 1]] << 12) + (j[m[o + 2]] << 6) + (j[m[o + 3]] << 0);
                    r[n + 0] = (p >> 16) % 256;
                    r[n + 1] = (p >> 8) % 256;
                    r[n + 2] = (p >> 0) % 256;
                }
                return q;
            }
        };
    }();
    a.makeType("base64", true, function(i) {
        return a.binary.toBase64(i);
    }, function(i) {
        return a.binary.fromBase64(i);
    });
    a.makeType("nil", false, function(j, i) {
        return i("nil");
    }, function(i) {
        return null;
    });
    a.makeType("struct", false, function(k, j) {
        var i = j("struct");
        g.each(k, function(l, n) {
            var o = j("name").text(l);
            var m = j("value").append(a.toXmlRpc(n, j));
            i.append(j("member").append(o, m));
        });
        return i;
    }, function(i) {
        return g(i).find("> member").toArray().reduce(function(n, l) {
            var k = g(l);
            var j = k.find("> name").text();
            var m = a.parseValue(k.find("> value"));
            n[j] = m;
            return n;
        }, {});
    });
    a.makeType("array", false, function(l, j) {
        var k = j("array");
        var i = j("data");
        g.each(l, function(m, n) {
            i.append(j("value").append(a.toXmlRpc(n, j)));
        });
        k.append(i);
        return k;
    }, function(i) {
        return g(i).find("> data > value").toArray().map(a.parseValue);
    });
    a.force = function(i, j) {
        return new a.types[i](j);
    };
})(jQuery);

function XmlRpc() {}

XmlRpc.PROLOG = '<?xml version="1.0"?>\n';

XmlRpc.REQUEST = "<methodCall>\n<methodName>${METHOD}</methodName>\n<params>\n${DATA}</params>\n</methodCall>";

XmlRpc.PARAM = "<param>\n<value>\n${DATA}</value>\n</param>\n";

XmlRpc.ARRAY = "<array>\n<data>\n${DATA}</data>\n</array>\n";

XmlRpc.STRUCT = "<struct>\n${DATA}</struct>\n";

XmlRpc.MEMBER = "<member>\n${DATA}</member>\n";

XmlRpc.NAME = "<name>${DATA}</name>\n";

XmlRpc.VALUE = "<value>\n${DATA}</value>\n";

XmlRpc.SCALAR = "<${TYPE}>${DATA}</${TYPE}>\n";

XmlRpc.getDataTag = function(b) {
    try {
        var a = typeof b;
        switch (a.toLowerCase()) {
          case "number":
            a = Math.round(b) == b ? "int" : "double";
            break;

          case "object":
            if (b.constructor == Base64) {
                a = "base64";
            } else {
                if (b.constructor == String) {
                    a = "string";
                } else {
                    if (b.constructor == Boolean) {
                        a = "boolean";
                    } else {
                        if (b.constructor == Array) {
                            a = "array";
                        } else {
                            if (b.constructor == Date) {
                                a = "dateTime.iso8601";
                            } else {
                                if (b.constructor == Number) {
                                    a = Math.round(b) == b ? "int" : "double";
                                } else {
                                    a = "struct";
                                }
                            }
                        }
                    }
                }
            }
            break;
        }
        return a;
    } catch (c) {
        return null;
    }
};

XmlRpc.getTagData = function(a) {
    var b = null;
    switch (a) {
      case "struct":
        b = new Object();
        break;

      case "array":
        b = new Array();
        break;

      case "datetime.iso8601":
        b = new Date();
        break;

      case "boolean":
        b = new Boolean();
        break;

      case "int":
      case "i4":
      case "double":
        b = new Number();
        break;

      case "string":
        b = new String();
        break;

      case "base64":
        b = new Base64();
        break;
    }
    return b;
};

function XmlRpcRequest(a, b) {
    this.serviceUrl = a;
    this.methodName = b;
    this.params = [];
}

XmlRpcRequest.prototype.addParam = function(b) {
    var a = typeof b;
    switch (a.toLowerCase()) {
      case "function":
        return;

      case "object":
        if (!b.constructor.name) {
            return;
        }
    }
    this.params.push(b);
};

XmlRpcRequest.prototype.clearParams = function() {
    this.params.splice(0, this.params.length);
};

XmlRpcRequest.prototype.send = function() {
    var c = "", a = 0, b, d;
    for (a = 0; a < this.params.length; a++) {
        c += XmlRpc.PARAM.replace("${DATA}", this.marshal(this.params[a]));
    }
    b = XmlRpc.REQUEST.replace("${METHOD}", this.methodName);
    b = XmlRpc.PROLOG + b.replace("${DATA}", c);
    d = Builder.buildXHR();
    d.open("POST", this.serviceUrl, false);
    d.send(Builder.buildDOM(b));
    return new XmlRpcResponse(d.responseXML);
};

XmlRpcRequest.prototype.marshal = function(f) {
    var d = XmlRpc.getDataTag(f), c = XmlRpc.SCALAR.replace(/\$\{TYPE\}/g, d), a = "", e, b, g;
    switch (d) {
      case "struct":
        g = "";
        for (b in f) {
            e = "";
            e += XmlRpc.NAME.replace("${DATA}", b);
            e += XmlRpc.VALUE.replace("${DATA}", this.marshal(f[b]));
            g += XmlRpc.MEMBER.replace("${DATA}", e);
        }
        a = XmlRpc.STRUCT.replace("${DATA}", g);
        break;

      case "array":
        e = "";
        for (b = 0; b < f.length; b++) {
            e += XmlRpc.VALUE.replace("${DATA}", this.marshal(f[b]));
        }
        a = XmlRpc.ARRAY.replace("${DATA}", e);
        break;

      case "dateTime.iso8601":
        a = c.replace("${DATA}", f.toIso8601());
        break;

      case "boolean":
        a = c.replace("${DATA}", f == true ? 1 : 0);
        break;

      case "base64":
        a = c.replace("${DATA}", f.encode());
        break;

      default:
        a = c.replace("${DATA}", f);
        break;
    }
    return a;
};

function XmlRpcResponse(a) {
    this.xmlData = a;
}

XmlRpcResponse.prototype.isFault = function() {
    return this.faultValue;
};

XmlRpcResponse.prototype.parseXML = function() {
    var a, b;
    b = this.xmlData.childNodes.length;
    this.faultValue = undefined;
    this.currentIsName = false;
    this.propertyName = "";
    this.params = [];
    for (a = 0; a < b; a++) {
        this.unmarshal(this.xmlData.childNodes[a], 0);
    }
    return this.params[0];
};

XmlRpcResponse.prototype.unmarshal = function(d, c) {
    var e, a, b, f;
    if (d.nodeType == 1) {
        e = null;
        a = d.tagName.toLowerCase();
        switch (a) {
          case "fault":
            this.faultValue = true;
            break;

          case "name":
            this.currentIsName = true;
            break;

          default:
            e = XmlRpc.getTagData(a);
            break;
        }
        if (e != null) {
            this.params.push(e);
            if (a == "struct" || a == "array") {
                if (this.params.length > 1) {
                    switch (XmlRpc.getDataTag(this.params[c])) {
                      case "struct":
                        this.params[c][this.propertyName] = this.params[this.params.length - 1];
                        break;

                      case "array":
                        this.params[c].push(this.params[this.params.length - 1]);
                        break;
                    }
                }
                c = this.params.length - 1;
            }
        }
        f = d.childNodes.length;
        for (b = 0; b < f; b++) {
            this.unmarshal(d.childNodes[b], c);
        }
    }
    if (d.nodeType == 3 && /[^\t\n\r ]/.test(d.nodeValue)) {
        if (this.currentIsName == true) {
            this.propertyName = d.nodeValue;
            this.currentIsName = false;
        } else {
            switch (XmlRpc.getDataTag(this.params[this.params.length - 1])) {
              case "dateTime.iso8601":
                this.params[this.params.length - 1] = Date.fromIso8601(d.nodeValue);
                break;

              case "boolean":
                this.params[this.params.length - 1] = d.nodeValue == "1" ? true : false;
                break;

              case "int":
              case "double":
                this.params[this.params.length - 1] = new Number(d.nodeValue);
                break;

              case "string":
                this.params[this.params.length - 1] = new String(d.nodeValue);
                break;

              case "base64":
                this.params[this.params.length - 1] = new Base64(d.nodeValue);
                break;
            }
            if (this.params.length > 1) {
                switch (XmlRpc.getDataTag(this.params[c])) {
                  case "struct":
                    this.params[c][this.propertyName] = this.params[this.params.length - 1];
                    break;

                  case "array":
                    this.params[c].push(this.params[this.params.length - 1]);
                    break;
                }
            }
        }
    }
};

function Builder() {}

Builder.buildXHR = function() {
    return typeof XMLHttpRequest != "undefined" ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
};

Builder.buildDOM = function(a) {
    var f, d, b;
    if (typeof DOMParser != "undefined") {
        f = new DOMParser();
        return f.parseFromString(a, "text/xml");
    } else {
        d = [ "Microsoft.XMLDOM", "MSXML2.DOMDocument", "MSXML.DOMDocument" ];
        for (b = 0; b < d.length; b++) {
            try {
                f = new ActiveXObject(d[b]);
                f.loadXML(a);
                return f;
            } catch (c) {}
        }
    }
    return null;
};

Date.prototype.toIso8601 = function() {
    var b = this.getYear(), d = this.getMonth() + 1, a = this.getDate(), c = this.toTimeString().substr(0, 8);
    if (b < 1900) {
        b += 1900;
    }
    if (d < 10) {
        d = "0" + d;
    }
    if (a < 10) {
        a = "0" + a;
    }
    return b + d + a + "T" + c;
};

Date.fromIso8601 = function(e) {
    var d = e.substr(0, 4), f = e.substr(4, 2), b = e.substr(6, 2), a = e.substr(9, 2), g = e.substr(12, 2), c = e.substr(15, 2);
    return new Date(d, f - 1, b, a, g, c, 0);
};

function Base64(a) {
    this.bytes = a;
}

Base64.CHAR_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

Base64.prototype.encode = function() {
    if (typeof btoa == "function") {
        return btoa(this.bytes);
    } else {
        var e = [], a = [], d = [], b = 0, c = 0;
        for (c = 0; c < this.bytes.length; c += 3) {
            e[0] = this.bytes.charCodeAt(c);
            e[1] = this.bytes.charCodeAt(c + 1);
            e[2] = this.bytes.charCodeAt(c + 2);
            a[0] = e[0] >> 2;
            a[1] = (e[0] & 3) << 4 | e[1] >> 4;
            a[2] = (e[1] & 15) << 2 | e[2] >> 6;
            a[3] = e[2] & 63;
            if (isNaN(e[1])) {
                a[2] = a[3] = 64;
            } else {
                if (isNaN(e[2])) {
                    a[3] = 64;
                }
            }
            d[b++] = Base64.CHAR_MAP.charAt(a[0]) + Base64.CHAR_MAP.charAt(a[1]) + Base64.CHAR_MAP.charAt(a[2]) + Base64.CHAR_MAP.charAt(a[3]);
        }
        return d.join("");
    }
};

Base64.prototype.decode = function() {
    if (typeof atob == "function") {
        return atob(this.bytes);
    } else {
        var e = [], a = [], d = [], b = 0, c = 0;
        while (this.bytes.length % 4 != 0) {
            this.bytes += "=";
        }
        for (c = 0; c < this.bytes.length; c += 4) {
            a[0] = Base64.CHAR_MAP.indexOf(this.bytes.charAt(c));
            a[1] = Base64.CHAR_MAP.indexOf(this.bytes.charAt(c + 1));
            a[2] = Base64.CHAR_MAP.indexOf(this.bytes.charAt(c + 2));
            a[3] = Base64.CHAR_MAP.indexOf(this.bytes.charAt(c + 3));
            e[0] = a[0] << 2 | a[1] >> 4;
            e[1] = (a[1] & 15) << 4 | a[2] >> 2;
            e[2] = (a[2] & 3) << 6 | a[3];
            d[b++] = String.fromCharCode(e[0]);
            if (a[2] != 64) {
                d[b++] = String.fromCharCode(e[1]);
            }
            if (a[3] != 64) {
                d[b++] = String.fromCharCode(e[2]);
            }
        }
        return d.join("");
    }
};

(function(M, T, p) {
    "use strict";
    function lc() {
        var b = M.angular;
        M.angular = mc;
        return b;
    }
    function Xa(b) {
        return !b || typeof b.length !== "number" ? !1 : typeof b.hasOwnProperty != "function" && typeof b.constructor != "function" ? !0 : b instanceof R || ga && b instanceof ga || Ea.call(b) !== "[object Object]" || typeof b.callee === "function";
    }
    function n(b, a, c) {
        var d;
        if (b) if (H(b)) for (d in b) d != "prototype" && d != "length" && d != "name" && b.hasOwnProperty(d) && a.call(c, b[d], d); else if (b.forEach && b.forEach !== n) b.forEach(a, c); else if (Xa(b)) for (d = 0; d < b.length; d++) a.call(c, b[d], d); else for (d in b) b.hasOwnProperty(d) && a.call(c, b[d], d);
        return b;
    }
    function qb(b) {
        var a = [], c;
        for (c in b) b.hasOwnProperty(c) && a.push(c);
        return a.sort();
    }
    function nc(b, a, c) {
        for (var d = qb(b), e = 0; e < d.length; e++) a.call(c, b[d[e]], d[e]);
        return d;
    }
    function rb(b) {
        return function(a, c) {
            b(c, a);
        };
    }
    function Fa() {
        for (var b = ba.length, a; b; ) {
            b--;
            a = ba[b].charCodeAt(0);
            if (a == 57) return ba[b] = "A", ba.join("");
            if (a == 90) ba[b] = "0"; else return ba[b] = String.fromCharCode(a + 1), ba.join("");
        }
        ba.unshift("0");
        return ba.join("");
    }
    function sb(b, a) {
        a ? b.$$hashKey = a : delete b.$$hashKey;
    }
    function t(b) {
        var a = b.$$hashKey;
        n(arguments, function(a) {
            a !== b && n(a, function(a, c) {
                b[c] = a;
            });
        });
        sb(b, a);
        return b;
    }
    function N(b) {
        return parseInt(b, 10);
    }
    function tb(b, a) {
        return t(new (t(function() {}, {
            prototype: b
        }))(), a);
    }
    function q() {}
    function qa(b) {
        return b;
    }
    function S(b) {
        return function() {
            return b;
        };
    }
    function C(b) {
        return typeof b == "undefined";
    }
    function B(b) {
        return typeof b != "undefined";
    }
    function L(b) {
        return b != null && typeof b == "object";
    }
    function E(b) {
        return typeof b == "string";
    }
    function Ya(b) {
        return typeof b == "number";
    }
    function ra(b) {
        return Ea.apply(b) == "[object Date]";
    }
    function F(b) {
        return Ea.apply(b) == "[object Array]";
    }
    function H(b) {
        return typeof b == "function";
    }
    function sa(b) {
        return b && b.document && b.location && b.alert && b.setInterval;
    }
    function U(b) {
        return E(b) ? b.replace(/^\s*/, "").replace(/\s*$/, "") : b;
    }
    function oc(b) {
        return b && (b.nodeName || b.bind && b.find);
    }
    function Za(b, a, c) {
        var d = [];
        n(b, function(b, g, i) {
            d.push(a.call(c, b, g, i));
        });
        return d;
    }
    function Ga(b, a) {
        if (b.indexOf) return b.indexOf(a);
        for (var c = 0; c < b.length; c++) if (a === b[c]) return c;
        return -1;
    }
    function ta(b, a) {
        var c = Ga(b, a);
        c >= 0 && b.splice(c, 1);
        return a;
    }
    function V(b, a) {
        if (sa(b) || b && b.$evalAsync && b.$watch) throw Error("Can't copy Window or Scope");
        if (a) {
            if (b === a) throw Error("Can't copy equivalent objects or arrays");
            if (F(b)) for (var c = a.length = 0; c < b.length; c++) a.push(V(b[c])); else {
                c = a.$$hashKey;
                n(a, function(b, c) {
                    delete a[c];
                });
                for (var d in b) a[d] = V(b[d]);
                sb(a, c);
            }
        } else (a = b) && (F(b) ? a = V(b, []) : ra(b) ? a = new Date(b.getTime()) : L(b) && (a = V(b, {})));
        return a;
    }
    function pc(b, a) {
        var a = a || {}, c;
        for (c in b) b.hasOwnProperty(c) && c.substr(0, 2) !== "$$" && (a[c] = b[c]);
        return a;
    }
    function ia(b, a) {
        if (b === a) return !0;
        if (b === null || a === null) return !1;
        if (b !== b && a !== a) return !0;
        var c = typeof b, d;
        if (c == typeof a && c == "object") if (F(b)) {
            if ((c = b.length) == a.length) {
                for (d = 0; d < c; d++) if (!ia(b[d], a[d])) return !1;
                return !0;
            }
        } else if (ra(b)) return ra(a) && b.getTime() == a.getTime(); else {
            if (b && b.$evalAsync && b.$watch || a && a.$evalAsync && a.$watch || sa(b) || sa(a)) return !1;
            c = {};
            for (d in b) if (!(d.charAt(0) === "$" || H(b[d]))) {
                if (!ia(b[d], a[d])) return !1;
                c[d] = !0;
            }
            for (d in a) if (!c[d] && d.charAt(0) !== "$" && a[d] !== p && !H(a[d])) return !1;
            return !0;
        }
        return !1;
    }
    function $a(b, a) {
        var c = arguments.length > 2 ? ka.call(arguments, 2) : [];
        return H(a) && !(a instanceof RegExp) ? c.length ? function() {
            return arguments.length ? a.apply(b, c.concat(ka.call(arguments, 0))) : a.apply(b, c);
        } : function() {
            return arguments.length ? a.apply(b, arguments) : a.call(b);
        } : a;
    }
    function qc(b, a) {
        var c = a;
        /^\$+/.test(b) ? c = p : sa(a) ? c = "$WINDOW" : a && T === a ? c = "$DOCUMENT" : a && a.$evalAsync && a.$watch && (c = "$SCOPE");
        return c;
    }
    function ha(b, a) {
        return JSON.stringify(b, qc, a ? "  " : null);
    }
    function ub(b) {
        return E(b) ? JSON.parse(b) : b;
    }
    function ua(b) {
        b && b.length !== 0 ? (b = I("" + b), b = !(b == "f" || b == "0" || b == "false" || b == "no" || b == "n" || b == "[]")) : b = !1;
        return b;
    }
    function va(b) {
        b = w(b).clone();
        try {
            b.html("");
        } catch (a) {}
        var c = w("<div>").append(b).html();
        try {
            return b[0].nodeType === 3 ? I(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + I(b);
            });
        } catch (d) {
            return I(c);
        }
    }
    function vb(b) {
        var a = {}, c, d;
        n((b || "").split("&"), function(b) {
            b && (c = b.split("="), d = decodeURIComponent(c[0]), a[d] = B(c[1]) ? decodeURIComponent(c[1]) : !0);
        });
        return a;
    }
    function wb(b) {
        var a = [];
        n(b, function(b, d) {
            a.push(wa(d, !0) + (b === !0 ? "" : "=" + wa(b, !0)));
        });
        return a.length ? a.join("&") : "";
    }
    function ab(b) {
        return wa(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function wa(b, a) {
        return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, a ? "%20" : "+");
    }
    function rc(b, a) {
        function c(a) {
            a && d.push(a);
        }
        var d = [ b ], e, g, i = [ "ng:app", "ng-app", "x-ng-app", "data-ng-app" ], f = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        n(i, function(a) {
            i[a] = !0;
            c(T.getElementById(a));
            a = a.replace(":", "\\:");
            b.querySelectorAll && (n(b.querySelectorAll("." + a), c), n(b.querySelectorAll("." + a + "\\:"), c), 
            n(b.querySelectorAll("[" + a + "]"), c));
        });
        n(d, function(a) {
            if (!e) {
                var b = f.exec(" " + a.className + " ");
                b ? (e = a, g = (b[2] || "").replace(/\s+/g, ",")) : n(a.attributes, function(b) {
                    if (!e && i[b.name]) e = a, g = b.value;
                });
            }
        });
        e && a(e, g ? [ g ] : []);
    }
    function xb(b, a) {
        var c = function() {
            b = w(b);
            a = a || [];
            a.unshift([ "$provide", function(a) {
                a.value("$rootElement", b);
            } ]);
            a.unshift("ng");
            var c = yb(a);
            c.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", "$animator", function(a, b, c, d, e) {
                a.$apply(function() {
                    b.data("$injector", d);
                    c(b)(a);
                });
                e.enabled(!0);
            } ]);
            return c;
        }, d = /^NG_DEFER_BOOTSTRAP!/;
        if (M && !d.test(M.name)) return c();
        M.name = M.name.replace(d, "");
        Ha.resumeBootstrap = function(b) {
            n(b, function(b) {
                a.push(b);
            });
            c();
        };
    }
    function bb(b, a) {
        a = a || "_";
        return b.replace(sc, function(b, d) {
            return (d ? a : "") + b.toLowerCase();
        });
    }
    function cb(b, a, c) {
        if (!b) throw Error("Argument '" + (a || "?") + "' is " + (c || "required"));
        return b;
    }
    function xa(b, a, c) {
        c && F(b) && (b = b[b.length - 1]);
        cb(H(b), a, "not a function, got " + (b && typeof b == "object" ? b.constructor.name || "Object" : typeof b));
        return b;
    }
    function tc(b) {
        function a(a, b, e) {
            return a[b] || (a[b] = e());
        }
        return a(a(b, "angular", Object), "module", function() {
            var b = {};
            return function(d, e, g) {
                e && b.hasOwnProperty(d) && (b[d] = null);
                return a(b, d, function() {
                    function a(c, d, e) {
                        return function() {
                            b[e || "push"]([ c, d, arguments ]);
                            return m;
                        };
                    }
                    if (!e) throw Error("No module: " + d);
                    var b = [], c = [], j = a("$injector", "invoke"), m = {
                        _invokeQueue: b,
                        _runBlocks: c,
                        requires: e,
                        name: d,
                        provider: a("$provide", "provider"),
                        factory: a("$provide", "factory"),
                        service: a("$provide", "service"),
                        value: a("$provide", "value"),
                        constant: a("$provide", "constant", "unshift"),
                        animation: a("$animationProvider", "register"),
                        filter: a("$filterProvider", "register"),
                        controller: a("$controllerProvider", "register"),
                        directive: a("$compileProvider", "directive"),
                        config: j,
                        run: function(a) {
                            c.push(a);
                            return this;
                        }
                    };
                    g && j(g);
                    return m;
                });
            };
        });
    }
    function Ia(b) {
        return b.replace(uc, function(a, b, d, e) {
            return e ? d.toUpperCase() : d;
        }).replace(vc, "Moz$1");
    }
    function db(b, a) {
        function c() {
            var e;
            for (var b = [ this ], c = a, i, f, h, j, m, k; b.length; ) {
                i = b.shift();
                f = 0;
                for (h = i.length; f < h; f++) {
                    j = w(i[f]);
                    c ? j.triggerHandler("$destroy") : c = !c;
                    m = 0;
                    for (e = (k = j.children()).length, j = e; m < j; m++) b.push(ga(k[m]));
                }
            }
            return d.apply(this, arguments);
        }
        var d = ga.fn[b], d = d.$original || d;
        c.$original = d;
        ga.fn[b] = c;
    }
    function R(b) {
        if (b instanceof R) return b;
        if (!(this instanceof R)) {
            if (E(b) && b.charAt(0) != "<") throw Error("selectors not implemented");
            return new R(b);
        }
        if (E(b)) {
            var a = T.createElement("div");
            a.innerHTML = "<div>&#160;</div>" + b;
            a.removeChild(a.firstChild);
            eb(this, a.childNodes);
            this.remove();
        } else eb(this, b);
    }
    function fb(b) {
        return b.cloneNode(!0);
    }
    function ya(b) {
        zb(b);
        for (var a = 0, b = b.childNodes || []; a < b.length; a++) ya(b[a]);
    }
    function Ab(b, a, c) {
        var d = ca(b, "events");
        ca(b, "handle") && (C(a) ? n(d, function(a, c) {
            gb(b, c, a);
            delete d[c];
        }) : C(c) ? (gb(b, a, d[a]), delete d[a]) : ta(d[a], c));
    }
    function zb(b) {
        var a = b[Ja], c = Ka[a];
        c && (c.handle && (c.events.$destroy && c.handle({}, "$destroy"), Ab(b)), delete Ka[a], 
        b[Ja] = p);
    }
    function ca(b, a, c) {
        var d = b[Ja], d = Ka[d || -1];
        if (B(c)) d || (b[Ja] = d = ++wc, d = Ka[d] = {}), d[a] = c; else return d && d[a];
    }
    function Bb(b, a, c) {
        var d = ca(b, "data"), e = B(c), g = !e && B(a), i = g && !L(a);
        !d && !i && ca(b, "data", d = {});
        if (e) d[a] = c; else if (g) if (i) return d && d[a]; else t(d, a); else return d;
    }
    function La(b, a) {
        return (" " + b.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") > -1;
    }
    function Cb(b, a) {
        a && n(a.split(" "), function(a) {
            b.className = U((" " + b.className + " ").replace(/[\n\t]/g, " ").replace(" " + U(a) + " ", " "));
        });
    }
    function Db(b, a) {
        a && n(a.split(" "), function(a) {
            if (!La(b, a)) b.className = U(b.className + " " + U(a));
        });
    }
    function eb(b, a) {
        if (a) for (var a = !a.nodeName && B(a.length) && !sa(a) ? a : [ a ], c = 0; c < a.length; c++) b.push(a[c]);
    }
    function Eb(b, a) {
        return Ma(b, "$" + (a || "ngController") + "Controller");
    }
    function Ma(b, a, c) {
        b = w(b);
        for (b[0].nodeType == 9 && (b = b.find("html")); b.length; ) {
            if (c = b.data(a)) return c;
            b = b.parent();
        }
    }
    function Fb(b, a) {
        var c = Na[a.toLowerCase()];
        return c && Gb[b.nodeName] && c;
    }
    function xc(b, a) {
        var c = function(c, e) {
            if (!c.preventDefault) c.preventDefault = function() {
                c.returnValue = !1;
            };
            if (!c.stopPropagation) c.stopPropagation = function() {
                c.cancelBubble = !0;
            };
            if (!c.target) c.target = c.srcElement || T;
            if (C(c.defaultPrevented)) {
                var g = c.preventDefault;
                c.preventDefault = function() {
                    c.defaultPrevented = !0;
                    g.call(c);
                };
                c.defaultPrevented = !1;
            }
            c.isDefaultPrevented = function() {
                return c.defaultPrevented || c.returnValue == !1;
            };
            n(a[e || c.type], function(a) {
                a.call(b, c);
            });
            Z <= 8 ? (c.preventDefault = null, c.stopPropagation = null, c.isDefaultPrevented = null) : (delete c.preventDefault, 
            delete c.stopPropagation, delete c.isDefaultPrevented);
        };
        c.elem = b;
        return c;
    }
    function la(b) {
        var a = typeof b, c;
        if (a == "object" && b !== null) if (typeof (c = b.$$hashKey) == "function") c = b.$$hashKey(); else {
            if (c === p) c = b.$$hashKey = Fa();
        } else c = b;
        return a + ":" + c;
    }
    function za(b) {
        n(b, this.put, this);
    }
    function Hb(b) {
        var a, c;
        if (typeof b == "function") {
            if (!(a = b.$inject)) a = [], c = b.toString().replace(yc, ""), c = c.match(zc), 
            n(c[1].split(Ac), function(b) {
                b.replace(Bc, function(b, c, d) {
                    a.push(d);
                });
            }), b.$inject = a;
        } else F(b) ? (c = b.length - 1, xa(b[c], "fn"), a = b.slice(0, c)) : xa(b, "fn", !0);
        return a;
    }
    function yb(b) {
        function a(a) {
            return function(b, c) {
                if (L(b)) n(b, rb(a)); else return a(b, c);
            };
        }
        function c(a, b) {
            if (H(b) || F(b)) b = k.instantiate(b);
            if (!b.$get) throw Error("Provider " + a + " must define $get factory method.");
            return m[a + f] = b;
        }
        function d(a, b) {
            return c(a, {
                $get: b
            });
        }
        function e(a) {
            var b = [];
            n(a, function(a) {
                if (!j.get(a)) if (j.put(a, !0), E(a)) {
                    var c = Aa(a);
                    b = b.concat(e(c.requires)).concat(c._runBlocks);
                    try {
                        for (var d = c._invokeQueue, c = 0, f = d.length; c < f; c++) {
                            var g = d[c], o = k.get(g[0]);
                            o[g[1]].apply(o, g[2]);
                        }
                    } catch (h) {
                        throw h.message && (h.message += " from " + a), h;
                    }
                } else if (H(a)) try {
                    b.push(k.invoke(a));
                } catch (l) {
                    throw l.message && (l.message += " from " + a), l;
                } else if (F(a)) try {
                    b.push(k.invoke(a));
                } catch (i) {
                    throw i.message && (i.message += " from " + String(a[a.length - 1])), i;
                } else xa(a, "module");
            });
            return b;
        }
        function g(a, b) {
            function c(d) {
                if (typeof d !== "string") throw Error("Service name expected");
                if (a.hasOwnProperty(d)) {
                    if (a[d] === i) throw Error("Circular dependency: " + h.join(" <- "));
                    return a[d];
                } else try {
                    return h.unshift(d), a[d] = i, a[d] = b(d);
                } finally {
                    h.shift();
                }
            }
            function d(a, b, e) {
                var f = [], j = Hb(a), g, o, h;
                o = 0;
                for (g = j.length; o < g; o++) h = j[o], f.push(e && e.hasOwnProperty(h) ? e[h] : c(h));
                a.$inject || (a = a[g]);
                switch (b ? -1 : f.length) {
                  case 0:
                    return a();

                  case 1:
                    return a(f[0]);

                  case 2:
                    return a(f[0], f[1]);

                  case 3:
                    return a(f[0], f[1], f[2]);

                  case 4:
                    return a(f[0], f[1], f[2], f[3]);

                  case 5:
                    return a(f[0], f[1], f[2], f[3], f[4]);

                  case 6:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5]);

                  case 7:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5], f[6]);

                  case 8:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7]);

                  case 9:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8]);

                  case 10:
                    return a(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9]);

                  default:
                    return a.apply(b, f);
                }
            }
            return {
                invoke: d,
                instantiate: function(a, b) {
                    var c = function() {}, e;
                    c.prototype = (F(a) ? a[a.length - 1] : a).prototype;
                    c = new c();
                    e = d(a, c, b);
                    return L(e) ? e : c;
                },
                get: c,
                annotate: Hb,
                has: function(b) {
                    return m.hasOwnProperty(b + f) || a.hasOwnProperty(b);
                }
            };
        }
        var i = {}, f = "Provider", h = [], j = new za(), m = {
            $provide: {
                provider: a(c),
                factory: a(d),
                service: a(function(a, b) {
                    return d(a, [ "$injector", function(a) {
                        return a.instantiate(b);
                    } ]);
                }),
                value: a(function(a, b) {
                    return d(a, S(b));
                }),
                constant: a(function(a, b) {
                    m[a] = b;
                    l[a] = b;
                }),
                decorator: function(a, b) {
                    var c = k.get(a + f), d = c.$get;
                    c.$get = function() {
                        var a = u.invoke(d, c);
                        return u.invoke(b, null, {
                            $delegate: a
                        });
                    };
                }
            }
        }, k = m.$injector = g(m, function() {
            throw Error("Unknown provider: " + h.join(" <- "));
        }), l = {}, u = l.$injector = g(l, function(a) {
            a = k.get(a + f);
            return u.invoke(a.$get, a);
        });
        n(e(b), function(a) {
            u.invoke(a || q);
        });
        return u;
    }
    function Cc() {
        var b = !0;
        this.disableAutoScrolling = function() {
            b = !1;
        };
        this.$get = [ "$window", "$location", "$rootScope", function(a, c, d) {
            function e(a) {
                var b = null;
                n(a, function(a) {
                    !b && I(a.nodeName) === "a" && (b = a);
                });
                return b;
            }
            function g() {
                var b = c.hash(), d;
                b ? (d = i.getElementById(b)) ? d.scrollIntoView() : (d = e(i.getElementsByName(b))) ? d.scrollIntoView() : b === "top" && a.scrollTo(0, 0) : a.scrollTo(0, 0);
            }
            var i = a.document;
            b && d.$watch(function() {
                return c.hash();
            }, function() {
                d.$evalAsync(g);
            });
            return g;
        } ];
    }
    function Ib(b) {
        this.register = function(a, c) {
            b.factory(Ia(a) + "Animation", c);
        };
        this.$get = [ "$injector", function(a) {
            return function(b) {
                if (b && (b = Ia(b) + "Animation", a.has(b))) return a.get(b);
            };
        } ];
    }
    function Dc(b, a, c, d) {
        function e(a) {
            try {
                a.apply(null, ka.call(arguments, 1));
            } finally {
                if (o--, o === 0) for (;z.length; ) try {
                    z.pop()();
                } catch (b) {
                    c.error(b);
                }
            }
        }
        function g(a, b) {
            (function s() {
                n(r, function(a) {
                    a();
                });
                y = b(s, a);
            })();
        }
        function i() {
            x != f.url() && (x = f.url(), n(v, function(a) {
                a(f.url());
            }));
        }
        var f = this, h = a[0], j = b.location, m = b.history, k = b.setTimeout, l = b.clearTimeout, u = {};
        f.isMock = !1;
        var o = 0, z = [];
        f.$$completeOutstandingRequest = e;
        f.$$incOutstandingRequestCount = function() {
            o++;
        };
        f.notifyWhenNoOutstandingRequests = function(a) {
            n(r, function(a) {
                a();
            });
            o === 0 ? a() : z.push(a);
        };
        var r = [], y;
        f.addPollFn = function(a) {
            C(y) && g(100, k);
            r.push(a);
            return a;
        };
        var x = j.href, W = a.find("base");
        f.url = function(a, b) {
            if (a) {
                if (x != a) return x = a, d.history ? b ? m.replaceState(null, "", a) : (m.pushState(null, "", a), 
                W.attr("href", W.attr("href"))) : b ? j.replace(a) : j.href = a, f;
            } else return j.href.replace(/%27/g, "'");
        };
        var v = [], A = !1;
        f.onUrlChange = function(a) {
            A || (d.history && w(b).bind("popstate", i), d.hashchange ? w(b).bind("hashchange", i) : f.addPollFn(i), 
            A = !0);
            v.push(a);
            return a;
        };
        f.baseHref = function() {
            var a = W.attr("href");
            return a ? a.replace(/^https?\:\/\/[^\/]*/, "") : "";
        };
        var G = {}, D = "", $ = f.baseHref();
        f.cookies = function(a, b) {
            var d, e, f, j;
            if (a) if (b === p) h.cookie = escape(a) + "=;path=" + $ + ";expires=Thu, 01 Jan 1970 00:00:00 GMT"; else {
                if (E(b)) d = (h.cookie = escape(a) + "=" + escape(b) + ";path=" + $).length + 1, 
                d > 4096 && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!");
            } else {
                if (h.cookie !== D) {
                    D = h.cookie;
                    d = D.split("; ");
                    G = {};
                    for (f = 0; f < d.length; f++) e = d[f], j = e.indexOf("="), j > 0 && (a = unescape(e.substring(0, j)), 
                    G[a] === p && (G[a] = unescape(e.substring(j + 1))));
                }
                return G;
            }
        };
        f.defer = function(a, b) {
            var c;
            o++;
            c = k(function() {
                delete u[c];
                e(a);
            }, b || 0);
            u[c] = !0;
            return c;
        };
        f.defer.cancel = function(a) {
            return u[a] ? (delete u[a], l(a), e(q), !0) : !1;
        };
    }
    function Ec() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function(b, a, c, d) {
            return new Dc(b, d, a, c);
        } ];
    }
    function Fc() {
        this.$get = function() {
            function b(b, d) {
                function e(a) {
                    if (a != k) {
                        if (l) {
                            if (l == a) l = a.n;
                        } else l = a;
                        g(a.n, a.p);
                        g(a, k);
                        k = a;
                        k.n = null;
                    }
                }
                function g(a, b) {
                    if (a != b) {
                        if (a) a.p = b;
                        if (b) b.n = a;
                    }
                }
                if (b in a) throw Error("cacheId " + b + " taken");
                var i = 0, f = t({}, d, {
                    id: b
                }), h = {}, j = d && d.capacity || Number.MAX_VALUE, m = {}, k = null, l = null;
                return a[b] = {
                    put: function(a, b) {
                        var c = m[a] || (m[a] = {
                            key: a
                        });
                        e(c);
                        if (!C(b)) return a in h || i++, h[a] = b, i > j && this.remove(l.key), b;
                    },
                    get: function(a) {
                        var b = m[a];
                        if (b) return e(b), h[a];
                    },
                    remove: function(a) {
                        var b = m[a];
                        if (b) {
                            if (b == k) k = b.p;
                            if (b == l) l = b.n;
                            g(b.n, b.p);
                            delete m[a];
                            delete h[a];
                            i--;
                        }
                    },
                    removeAll: function() {
                        h = {};
                        i = 0;
                        m = {};
                        k = l = null;
                    },
                    destroy: function() {
                        m = f = h = null;
                        delete a[b];
                    },
                    info: function() {
                        return t({}, f, {
                            size: i
                        });
                    }
                };
            }
            var a = {};
            b.info = function() {
                var b = {};
                n(a, function(a, e) {
                    b[e] = a.info();
                });
                return b;
            };
            b.get = function(b) {
                return a[b];
            };
            return b;
        };
    }
    function Gc() {
        this.$get = [ "$cacheFactory", function(b) {
            return b("templates");
        } ];
    }
    function Jb(b) {
        var a = {}, c = "Directive", d = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, e = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, g = "Template must have exactly one root element. was: ", i = /^\s*(https?|ftp|mailto|file):/;
        this.directive = function h(d, e) {
            E(d) ? (cb(e, "directive"), a.hasOwnProperty(d) || (a[d] = [], b.factory(d + c, [ "$injector", "$exceptionHandler", function(b, c) {
                var e = [];
                n(a[d], function(a) {
                    try {
                        var g = b.invoke(a);
                        if (H(g)) g = {
                            compile: S(g)
                        }; else if (!g.compile && g.link) g.compile = S(g.link);
                        g.priority = g.priority || 0;
                        g.name = g.name || d;
                        g.require = g.require || g.controller && g.name;
                        g.restrict = g.restrict || "A";
                        e.push(g);
                    } catch (h) {
                        c(h);
                    }
                });
                return e;
            } ])), a[d].push(e)) : n(d, rb(h));
            return this;
        };
        this.urlSanitizationWhitelist = function(a) {
            return B(a) ? (i = a, this) : i;
        };
        this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", function(b, j, m, k, l, u, o, z, r) {
            function y(a, b, c) {
                a instanceof w || (a = w(a));
                n(a, function(b, c) {
                    b.nodeType == 3 && b.nodeValue.match(/\S+/) && (a[c] = w(b).wrap("<span></span>").parent()[0]);
                });
                var d = W(a, b, a, c);
                return function(b, c) {
                    cb(b, "scope");
                    for (var e = c ? Ba.clone.call(a) : a, j = 0, g = e.length; j < g; j++) {
                        var h = e[j];
                        (h.nodeType == 1 || h.nodeType == 9) && e.eq(j).data("$scope", b);
                    }
                    x(e, "ng-scope");
                    c && c(e, b);
                    d && d(b, e, e);
                    return e;
                };
            }
            function x(a, b) {
                try {
                    a.addClass(b);
                } catch (c) {}
            }
            function W(a, b, c, d) {
                function e(a, c, d, g) {
                    var h, i, k, l, o, m, u, z = [];
                    o = 0;
                    for (m = c.length; o < m; o++) z.push(c[o]);
                    u = o = 0;
                    for (m = j.length; o < m; u++) i = z[u], c = j[o++], h = j[o++], c ? (c.scope ? (k = a.$new(L(c.scope)), 
                    w(i).data("$scope", k)) : k = a, (l = c.transclude) || !g && b ? c(h, k, i, d, function(b) {
                        return function(c) {
                            var d = a.$new();
                            d.$$transcluded = !0;
                            return b(d, c).bind("$destroy", $a(d, d.$destroy));
                        };
                    }(l || b)) : c(h, k, i, p, g)) : h && h(a, i.childNodes, p, g);
                }
                for (var j = [], g, h, k, i = 0; i < a.length; i++) h = new ma(), g = v(a[i], [], h, d), 
                h = (g = g.length ? A(g, a[i], h, b, c) : null) && g.terminal || !a[i].childNodes || !a[i].childNodes.length ? null : W(a[i].childNodes, g ? g.transclude : b), 
                j.push(g), j.push(h), k = k || g || h;
                return k ? e : null;
            }
            function v(a, b, c, j) {
                var g = c.$attr, h;
                switch (a.nodeType) {
                  case 1:
                    G(b, da(hb(a).toLowerCase()), "E", j);
                    var i, k, l;
                    h = a.attributes;
                    for (var o = 0, m = h && h.length; o < m; o++) if (i = h[o], i.specified) k = i.name, 
                    l = da(k), Y.test(l) && (k = l.substr(6).toLowerCase()), l = da(k.toLowerCase()), 
                    g[l] = k, c[l] = i = U(Z && k == "href" ? decodeURIComponent(a.getAttribute(k, 2)) : i.value), 
                    Fb(a, l) && (c[l] = !0), s(a, b, i, l), G(b, l, "A", j);
                    a = a.className;
                    if (E(a) && a !== "") for (;h = e.exec(a); ) l = da(h[2]), G(b, l, "C", j) && (c[l] = U(h[3])), 
                    a = a.substr(h.index + h[0].length);
                    break;

                  case 3:
                    P(b, a.nodeValue);
                    break;

                  case 8:
                    try {
                        if (h = d.exec(a.nodeValue)) l = da(h[1]), G(b, l, "M", j) && (c[l] = U(h[2]));
                    } catch (u) {}
                }
                b.sort(K);
                return b;
            }
            function A(a, b, c, d, e) {
                function h(a, b) {
                    if (a) a.require = s.require, z.push(a);
                    if (b) b.require = s.require, ea.push(b);
                }
                function i(a, b) {
                    var c, d = "data", e = !1;
                    if (E(a)) {
                        for (;(c = a.charAt(0)) == "^" || c == "?"; ) a = a.substr(1), c == "^" && (d = "inheritedData"), 
                        e = e || c == "?";
                        c = b[d]("$" + a + "Controller");
                        if (!c && !e) throw Error("No controller: " + a);
                    } else F(a) && (c = [], n(a, function(a) {
                        c.push(i(a, b));
                    }));
                    return c;
                }
                function k(a, d, e, g, h) {
                    var l, v, r, D, x;
                    l = b === e ? c : pc(c, new ma(w(e), c.$attr));
                    v = l.$$element;
                    if (K) {
                        var y = /^\s*([@=&])(\??)\s*(\w*)\s*$/, s = d.$parent || d;
                        n(K.scope, function(a, b) {
                            var c = a.match(y) || [], e = c[3] || b, g = c[2] == "?", c = c[1], h, k, i;
                            d.$$isolateBindings[b] = c + e;
                            switch (c) {
                              case "@":
                                l.$observe(e, function(a) {
                                    d[b] = a;
                                });
                                l.$$observers[e].$$scope = s;
                                l[e] && (d[b] = j(l[e])(s));
                                break;

                              case "=":
                                if (g && !l[e]) break;
                                k = u(l[e]);
                                i = k.assign || function() {
                                    h = d[b] = k(s);
                                    throw Error(Kb + l[e] + " (directive: " + K.name + ")");
                                };
                                h = d[b] = k(s);
                                d.$watch(function() {
                                    var a = k(s);
                                    a !== d[b] && (a !== h ? h = d[b] = a : i(s, a = h = d[b]));
                                    return a;
                                });
                                break;

                              case "&":
                                k = u(l[e]);
                                d[b] = function(a) {
                                    return k(s, a);
                                };
                                break;

                              default:
                                throw Error("Invalid isolate scope definition for directive " + K.name + ": " + a);
                            }
                        });
                    }
                    q && n(q, function(a) {
                        var b = {
                            $scope: d,
                            $element: v,
                            $attrs: l,
                            $transclude: h
                        };
                        x = a.controller;
                        x == "@" && (x = l[a.name]);
                        v.data("$" + a.name + "Controller", o(x, b));
                    });
                    g = 0;
                    for (r = z.length; g < r; g++) try {
                        D = z[g], D(d, v, l, D.require && i(D.require, v));
                    } catch (Hc) {
                        m(Hc, va(v));
                    }
                    a && a(d, e.childNodes, p, h);
                    g = 0;
                    for (r = ea.length; g < r; g++) try {
                        D = ea[g], D(d, v, l, D.require && i(D.require, v));
                    } catch (J) {
                        m(J, va(v));
                    }
                }
                for (var l = -Number.MAX_VALUE, z = [], ea = [], r = null, K = null, W = null, J = c.$$element = w(b), s, A, Y, G, P = d, q, na, t, B = 0, C = a.length; B < C; B++) {
                    s = a[B];
                    Y = p;
                    if (l > s.priority) break;
                    if (t = s.scope) O("isolated scope", K, s, J), L(t) && (x(J, "ng-isolate-scope"), 
                    K = s), x(J, "ng-scope"), r = r || s;
                    A = s.name;
                    if (t = s.controller) q = q || {}, O("'" + A + "' controller", q[A], s, J), q[A] = s;
                    if (t = s.transclude) O("transclusion", G, s, J), G = s, l = s.priority, t == "element" ? (Y = w(b), 
                    J = c.$$element = w(T.createComment(" " + A + ": " + c[A] + " ")), b = J[0], ja(e, w(Y[0]), b), 
                    P = y(Y, d, l)) : (Y = w(fb(b)).contents(), J.html(""), P = y(Y, d));
                    if (s.template) if (O("template", W, s, J), W = s, t = H(s.template) ? s.template(J, c) : s.template, 
                    t = Lb(t), s.replace) {
                        Y = w("<div>" + U(t) + "</div>").contents();
                        b = Y[0];
                        if (Y.length != 1 || b.nodeType !== 1) throw Error(g + t);
                        ja(e, J, b);
                        A = {
                            $attr: {}
                        };
                        a = a.concat(v(b, a.splice(B + 1, a.length - (B + 1)), A));
                        D(c, A);
                        C = a.length;
                    } else J.html(t);
                    if (s.templateUrl) O("template", W, s, J), W = s, k = $(a.splice(B, a.length - B), k, J, c, e, s.replace, P), 
                    C = a.length; else if (s.compile) try {
                        na = s.compile(J, c, P), H(na) ? h(null, na) : na && h(na.pre, na.post);
                    } catch (I) {
                        m(I, va(J));
                    }
                    if (s.terminal) k.terminal = !0, l = Math.max(l, s.priority);
                }
                k.scope = r && r.scope;
                k.transclude = G && P;
                return k;
            }
            function G(d, e, j, g) {
                var l = !1;
                if (a.hasOwnProperty(e)) for (var k, e = b.get(e + c), i = 0, o = e.length; i < o; i++) try {
                    if (k = e[i], (g === p || g > k.priority) && k.restrict.indexOf(j) != -1) d.push(k), 
                    l = !0;
                } catch (u) {
                    m(u);
                }
                return l;
            }
            function D(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element;
                n(a, function(d, e) {
                    e.charAt(0) != "$" && (b[e] && (d += (e === "style" ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]));
                });
                n(b, function(b, j) {
                    j == "class" ? (x(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : j == "style" ? e.attr("style", e.attr("style") + ";" + b) : j.charAt(0) != "$" && !a.hasOwnProperty(j) && (a[j] = b, 
                    d[j] = c[j]);
                });
            }
            function $(a, b, c, d, e, j, h) {
                var i = [], o, m, u = c[0], z = a.shift(), r = t({}, z, {
                    controller: null,
                    templateUrl: null,
                    transclude: null,
                    scope: null
                }), z = H(z.templateUrl) ? z.templateUrl(c, d) : z.templateUrl;
                c.html("");
                k.get(z, {
                    cache: l
                }).success(function(l) {
                    var k, z, l = Lb(l);
                    if (j) {
                        z = w("<div>" + U(l) + "</div>").contents();
                        k = z[0];
                        if (z.length != 1 || k.nodeType !== 1) throw Error(g + l);
                        l = {
                            $attr: {}
                        };
                        ja(e, c, k);
                        v(k, a, l);
                        D(d, l);
                    } else k = u, c.html(l);
                    a.unshift(r);
                    o = A(a, k, d, h);
                    for (m = W(c[0].childNodes, h); i.length; ) {
                        var ea = i.shift(), l = i.shift();
                        z = i.shift();
                        var x = i.shift(), y = k;
                        l !== u && (y = fb(k), ja(z, w(l), y));
                        o(function() {
                            b(m, ea, y, e, x);
                        }, ea, y, e, x);
                    }
                    i = null;
                }).error(function(a, b, c, d) {
                    throw Error("Failed to load template: " + d.url);
                });
                return function(a, c, d, e, j) {
                    i ? (i.push(c), i.push(d), i.push(e), i.push(j)) : o(function() {
                        b(m, c, d, e, j);
                    }, c, d, e, j);
                };
            }
            function K(a, b) {
                return b.priority - a.priority;
            }
            function O(a, b, c, d) {
                if (b) throw Error("Multiple directives [" + b.name + ", " + c.name + "] asking for " + a + " on: " + va(d));
            }
            function P(a, b) {
                var c = j(b, !0);
                c && a.push({
                    priority: 0,
                    compile: S(function(a, b) {
                        var d = b.parent(), e = d.data("$binding") || [];
                        e.push(c);
                        x(d.data("$binding", e), "ng-binding");
                        a.$watch(c, function(a) {
                            b[0].nodeValue = a;
                        });
                    })
                });
            }
            function s(a, b, c, d) {
                var e = j(c, !0);
                e && b.push({
                    priority: 100,
                    compile: S(function(a, b, c) {
                        b = c.$$observers || (c.$$observers = {});
                        if (e = j(c[d], !0)) c[d] = e(a), (b[d] || (b[d] = [])).$$inter = !0, (c.$$observers && c.$$observers[d].$$scope || a).$watch(e, function(a) {
                            c.$set(d, a);
                        });
                    })
                });
            }
            function ja(a, b, c) {
                var d = b[0], e = d.parentNode, j, g;
                if (a) {
                    j = 0;
                    for (g = a.length; j < g; j++) if (a[j] == d) {
                        a[j] = c;
                        break;
                    }
                }
                e && e.replaceChild(c, d);
                c[w.expando] = d[w.expando];
                b[0] = c;
            }
            var ma = function(a, b) {
                this.$$element = a;
                this.$attr = b || {};
            };
            ma.prototype = {
                $normalize: da,
                $set: function(a, b, c, d) {
                    var e = Fb(this.$$element[0], a), j = this.$$observers;
                    e && (this.$$element.prop(a, b), d = e);
                    this[a] = b;
                    d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = bb(a, "-"));
                    if (hb(this.$$element[0]) === "A" && a === "href") q.setAttribute("href", b), e = q.href, 
                    e.match(i) || (this[a] = b = "unsafe:" + e);
                    c !== !1 && (b === null || b === p ? this.$$element.removeAttr(d) : this.$$element.attr(d, b));
                    j && n(j[a], function(a) {
                        try {
                            a(b);
                        } catch (c) {
                            m(c);
                        }
                    });
                },
                $observe: function(a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
                    e.push(b);
                    z.$evalAsync(function() {
                        e.$$inter || b(c[a]);
                    });
                    return b;
                }
            };
            var q = r[0].createElement("a"), ea = j.startSymbol(), J = j.endSymbol(), Lb = ea == "{{" || J == "}}" ? qa : function(a) {
                return a.replace(/\{\{/g, ea).replace(/}}/g, J);
            }, Y = /^ngAttr[A-Z]/;
            return y;
        } ];
    }
    function da(b) {
        return Ia(b.replace(Ic, ""));
    }
    function Jc() {
        var b = {}, a = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(a, d) {
            L(a) ? t(b, a) : b[a] = d;
        };
        this.$get = [ "$injector", "$window", function(c, d) {
            return function(e, g) {
                var i, f;
                E(e) && (f = e.match(a), i = f[1], f = f[3], e = b.hasOwnProperty(i) ? b[i] : ib(g.$scope, i, !0) || ib(d, i, !0), 
                xa(e, i, !0));
                i = c.instantiate(e, g);
                if (f) {
                    if (typeof g.$scope !== "object") throw Error('Can not export controller as "' + f + '". No scope object provided!');
                    g.$scope[f] = i;
                }
                return i;
            };
        } ];
    }
    function Kc() {
        this.$get = [ "$window", function(b) {
            return w(b.document);
        } ];
    }
    function Lc() {
        this.$get = [ "$log", function(b) {
            return function(a, c) {
                b.error.apply(b, arguments);
            };
        } ];
    }
    function Mc() {
        var b = "{{", a = "}}";
        this.startSymbol = function(a) {
            return a ? (b = a, this) : b;
        };
        this.endSymbol = function(b) {
            return b ? (a = b, this) : a;
        };
        this.$get = [ "$parse", "$exceptionHandler", function(c, d) {
            function e(e, h) {
                for (var j, m, k = 0, l = [], u = e.length, o = !1, z = []; k < u; ) (j = e.indexOf(b, k)) != -1 && (m = e.indexOf(a, j + g)) != -1 ? (k != j && l.push(e.substring(k, j)), 
                l.push(k = c(o = e.substring(j + g, m))), k.exp = o, k = m + i, o = !0) : (k != u && l.push(e.substring(k)), 
                k = u);
                if (!(u = l.length)) l.push(""), u = 1;
                if (!h || o) return z.length = u, k = function(a) {
                    try {
                        for (var b = 0, c = u, j; b < c; b++) {
                            if (typeof (j = l[b]) == "function") j = j(a), j == null || j == p ? j = "" : typeof j != "string" && (j = ha(j));
                            z[b] = j;
                        }
                        return z.join("");
                    } catch (g) {
                        d(Error("Error while interpolating: " + e + "\n" + g.toString()));
                    }
                }, k.exp = e, k.parts = l, k;
            }
            var g = b.length, i = a.length;
            e.startSymbol = function() {
                return b;
            };
            e.endSymbol = function() {
                return a;
            };
            return e;
        } ];
    }
    function Mb(b) {
        for (var b = b.split("/"), a = b.length; a--; ) b[a] = ab(b[a]);
        return b.join("/");
    }
    function Nb(b, a) {
        var c = jb.exec(b);
        a.$$protocol = c[1];
        a.$$host = c[3];
        a.$$port = N(c[5]) || Oa[c[1]] || null;
    }
    function Ob(b, a) {
        var c = Pb.exec(b);
        a.$$path = decodeURIComponent(c[1]);
        a.$$search = vb(c[3]);
        a.$$hash = decodeURIComponent(c[5] || "");
        if (a.$$path && a.$$path.charAt(0) != "/") a.$$path = "/" + a.$$path;
    }
    function fa(b, a, c) {
        return a.indexOf(b) == 0 ? a.substr(b.length) : c;
    }
    function Ca(b) {
        var a = b.indexOf("#");
        return a == -1 ? b : b.substr(0, a);
    }
    function kb(b) {
        return b.substr(0, Ca(b).lastIndexOf("/") + 1);
    }
    function Qb(b, a) {
        var a = a || "", c = kb(b);
        this.$$parse = function(a) {
            var b = {};
            Nb(a, b);
            var g = fa(c, a);
            if (!E(g)) throw Error('Invalid url "' + a + '", missing path prefix "' + c + '".');
            Ob(g, b);
            t(this, b);
            if (!this.$$path) this.$$path = "/";
            this.$$compose();
        };
        this.$$compose = function() {
            var a = wb(this.$$search), b = this.$$hash ? "#" + ab(this.$$hash) : "";
            this.$$url = Mb(this.$$path) + (a ? "?" + a : "") + b;
            this.$$absUrl = c + this.$$url.substr(1);
        };
        this.$$rewrite = function(d) {
            var e;
            if ((e = fa(b, d)) !== p) return d = e, (e = fa(a, e)) !== p ? c + (fa("/", e) || e) : b + d; else if ((e = fa(c, d)) !== p) return c + e; else if (c == d + "/") return c;
        };
    }
    function lb(b, a) {
        var c = kb(b);
        this.$$parse = function(d) {
            Nb(d, this);
            var e = fa(b, d) || fa(c, d);
            if (!E(e)) throw Error('Invalid url "' + d + '", does not start with "' + b + '".');
            e = e.charAt(0) == "#" ? fa(a, e) : e;
            if (!E(e)) throw Error('Invalid url "' + d + '", missing hash prefix "' + a + '".');
            Ob(e, this);
            this.$$compose();
        };
        this.$$compose = function() {
            var c = wb(this.$$search), e = this.$$hash ? "#" + ab(this.$$hash) : "";
            this.$$url = Mb(this.$$path) + (c ? "?" + c : "") + e;
            this.$$absUrl = b + (this.$$url ? a + this.$$url : "");
        };
        this.$$rewrite = function(a) {
            if (Ca(b) == Ca(a)) return a;
        };
    }
    function Rb(b, a) {
        lb.apply(this, arguments);
        var c = kb(b);
        this.$$rewrite = function(d) {
            var e;
            if (b == Ca(d)) return d; else if (e = fa(c, d)) return b + a + e; else if (c === d + "/") return c;
        };
    }
    function Pa(b) {
        return function() {
            return this[b];
        };
    }
    function Sb(b, a) {
        return function(c) {
            if (C(c)) return this[b];
            this[b] = a(c);
            this.$$compose();
            return this;
        };
    }
    function Nc() {
        var b = "", a = !1;
        this.hashPrefix = function(a) {
            return B(a) ? (b = a, this) : b;
        };
        this.html5Mode = function(b) {
            return B(b) ? (a = b, this) : a;
        };
        this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", function(c, d, e, g) {
            function i(a) {
                c.$broadcast("$locationChangeSuccess", f.absUrl(), a);
            }
            var f, h = d.baseHref(), j = d.url();
            a ? (h = h ? j.substring(0, j.indexOf("/", j.indexOf("//") + 2)) + h : j, e = e.history ? Qb : Rb) : (h = Ca(j), 
            e = lb);
            f = new e(h, "#" + b);
            f.$$parse(f.$$rewrite(j));
            g.bind("click", function(a) {
                if (!a.ctrlKey && !(a.metaKey || a.which == 2)) {
                    for (var b = w(a.target); I(b[0].nodeName) !== "a"; ) if (b[0] === g[0] || !(b = b.parent())[0]) return;
                    var e = b.prop("href"), j = f.$$rewrite(e);
                    e && !b.attr("target") && j && !a.isDefaultPrevented() && (a.preventDefault(), j != d.url() && (f.$$parse(j), 
                    c.$apply(), M.angular["ff-684208-preventDefault"] = !0));
                }
            });
            f.absUrl() != j && d.url(f.absUrl(), !0);
            d.onUrlChange(function(a) {
                f.absUrl() != a && (c.$broadcast("$locationChangeStart", a, f.absUrl()).defaultPrevented ? d.url(f.absUrl()) : (c.$evalAsync(function() {
                    var b = f.absUrl();
                    f.$$parse(a);
                    i(b);
                }), c.$$phase || c.$digest()));
            });
            var m = 0;
            c.$watch(function() {
                var a = d.url(), b = f.$$replace;
                if (!m || a != f.absUrl()) m++, c.$evalAsync(function() {
                    c.$broadcast("$locationChangeStart", f.absUrl(), a).defaultPrevented ? f.$$parse(a) : (d.url(f.absUrl(), b), 
                    i(a));
                });
                f.$$replace = !1;
                return m;
            });
            return f;
        } ];
    }
    function Oc() {
        var b = !0, a = this;
        this.debugEnabled = function(a) {
            return B(a) ? (b = a, this) : b;
        };
        this.$get = [ "$window", function(c) {
            function d(a) {
                a instanceof Error && (a.stack ? a = a.message && a.stack.indexOf(a.message) === -1 ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));
                return a;
            }
            function e(a) {
                var b = c.console || {}, e = b[a] || b.log || q;
                return e.apply ? function() {
                    var a = [];
                    n(arguments, function(b) {
                        a.push(d(b));
                    });
                    return e.apply(b, a);
                } : function(a, b) {
                    e(a, b);
                };
            }
            return {
                log: e("log"),
                warn: e("warn"),
                info: e("info"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        b && c.apply(a, arguments);
                    };
                }()
            };
        } ];
    }
    function Pc(b, a) {
        function c(a) {
            return a.indexOf(r) != -1;
        }
        function d(a) {
            a = a || 1;
            return o + a < b.length ? b.charAt(o + a) : !1;
        }
        function e(a) {
            return "0" <= a && a <= "9";
        }
        function g(a) {
            return a == " " || a == "\r" || a == "	" || a == "\n" || a == "" || a == " ";
        }
        function i(a) {
            return "a" <= a && a <= "z" || "A" <= a && a <= "Z" || "_" == a || a == "$";
        }
        function f(a) {
            return a == "-" || a == "+" || e(a);
        }
        function h(a, c, d) {
            d = d || o;
            throw Error("Lexer Error: " + a + " at column" + (B(c) ? "s " + c + "-" + o + " [" + b.substring(c, d) + "]" : " " + d) + " in expression [" + b + "].");
        }
        function j() {
            for (var a = "", c = o; o < b.length; ) {
                var j = I(b.charAt(o));
                if (j == "." || e(j)) a += j; else {
                    var g = d();
                    if (j == "e" && f(g)) a += j; else if (f(j) && g && e(g) && a.charAt(a.length - 1) == "e") a += j; else if (f(j) && (!g || !e(g)) && a.charAt(a.length - 1) == "e") h("Invalid exponent"); else break;
                }
                o++;
            }
            a *= 1;
            l.push({
                index: c,
                text: a,
                json: !0,
                fn: function() {
                    return a;
                }
            });
        }
        function m() {
            for (var c = "", d = o, f, j, h, k; o < b.length; ) {
                k = b.charAt(o);
                if (k == "." || i(k) || e(k)) k == "." && (f = o), c += k; else break;
                o++;
            }
            if (f) for (j = o; j < b.length; ) {
                k = b.charAt(j);
                if (k == "(") {
                    h = c.substr(f - d + 1);
                    c = c.substr(0, f - d);
                    o = j;
                    break;
                }
                if (g(k)) j++; else break;
            }
            d = {
                index: d,
                text: c
            };
            if (Da.hasOwnProperty(c)) d.fn = d.json = Da[c]; else {
                var m = Tb(c, a);
                d.fn = t(function(a, b) {
                    return m(a, b);
                }, {
                    assign: function(a, b) {
                        return Ub(a, c, b);
                    }
                });
            }
            l.push(d);
            h && (l.push({
                index: f,
                text: ".",
                json: !1
            }), l.push({
                index: f + 1,
                text: h,
                json: !1
            }));
        }
        function k(a) {
            var c = o;
            o++;
            for (var d = "", e = a, f = !1; o < b.length; ) {
                var j = b.charAt(o);
                e += j;
                if (f) j == "u" ? (j = b.substring(o + 1, o + 5), j.match(/[\da-f]{4}/i) || h("Invalid unicode escape [\\u" + j + "]"), 
                o += 4, d += String.fromCharCode(parseInt(j, 16))) : (f = Qc[j], d += f ? f : j), 
                f = !1; else if (j == "\\") f = !0; else if (j == a) {
                    o++;
                    l.push({
                        index: c,
                        text: e,
                        string: d,
                        json: !0,
                        fn: function() {
                            return d;
                        }
                    });
                    return;
                } else d += j;
                o++;
            }
            h("Unterminated quote", c);
        }
        for (var l = [], u, o = 0, z = [], r, y = ":"; o < b.length; ) {
            r = b.charAt(o);
            if (c("\"'")) k(r); else if (e(r) || c(".") && e(d())) j(); else if (i(r)) {
                if (m(), "{,".indexOf(y) != -1 && z[0] == "{" && (u = l[l.length - 1])) u.json = u.text.indexOf(".") == -1;
            } else if (c("(){}[].,;:?")) l.push({
                index: o,
                text: r,
                json: ":[,".indexOf(y) != -1 && c("{[") || c("}]:,")
            }), c("{[") && z.unshift(r), c("}]") && z.shift(), o++; else if (g(r)) {
                o++;
                continue;
            } else {
                var x = r + d(), n = x + d(2), v = Da[r], A = Da[x], G = Da[n];
                G ? (l.push({
                    index: o,
                    text: n,
                    fn: G
                }), o += 3) : A ? (l.push({
                    index: o,
                    text: x,
                    fn: A
                }), o += 2) : v ? (l.push({
                    index: o,
                    text: r,
                    fn: v,
                    json: "[,:".indexOf(y) != -1 && c("+-")
                }), o += 1) : h("Unexpected next character ", o, o + 1);
            }
            y = r;
        }
        return l;
    }
    function Rc(b, a, c, d) {
        function e(a, c) {
            throw Error("Syntax Error: Token '" + c.text + "' " + a + " at column " + (c.index + 1) + " of the expression [" + b + "] starting at [" + b.substring(c.index) + "].");
        }
        function g() {
            if (O.length === 0) throw Error("Unexpected end of expression: " + b);
            return O[0];
        }
        function i(a, b, c, d) {
            if (O.length > 0) {
                var e = O[0], f = e.text;
                if (f == a || f == b || f == c || f == d || !a && !b && !c && !d) return e;
            }
            return !1;
        }
        function f(b, c, d, f) {
            return (b = i(b, c, d, f)) ? (a && !b.json && e("is not valid json", b), O.shift(), 
            b) : !1;
        }
        function h(a) {
            f(a) || e("is unexpected, expecting [" + a + "]", i());
        }
        function j(a, b) {
            return t(function(c, d) {
                return a(c, d, b);
            }, {
                constant: b.constant
            });
        }
        function m(a, b, c) {
            return t(function(d, e) {
                return a(d, e) ? b(d, e) : c(d, e);
            }, {
                constant: a.constant && b.constant && c.constant
            });
        }
        function k(a, b, c) {
            return t(function(d, e) {
                return b(d, e, a, c);
            }, {
                constant: a.constant && c.constant
            });
        }
        function l() {
            for (var a = []; ;) if (O.length > 0 && !i("}", ")", ";", "]") && a.push(w()), !f(";")) return a.length == 1 ? a[0] : function(b, c) {
                for (var d, e = 0; e < a.length; e++) {
                    var f = a[e];
                    f && (d = f(b, c));
                }
                return d;
            };
        }
        function u() {
            for (var a = f(), b = c(a.text), d = []; ;) if (a = f(":")) d.push(P()); else {
                var e = function(a, c, e) {
                    for (var e = [ e ], f = 0; f < d.length; f++) e.push(d[f](a, c));
                    return b.apply(a, e);
                };
                return function() {
                    return e;
                };
            }
        }
        function o() {
            var a = z(), b, c;
            if (f("?")) if (b = o(), c = f(":")) return m(a, b, o()); else e("expected :", c); else return a;
        }
        function z() {
            for (var a = r(), b; ;) if (b = f("||")) a = k(a, b.fn, r()); else return a;
        }
        function r() {
            var a = y(), b;
            if (b = f("&&")) a = k(a, b.fn, r());
            return a;
        }
        function y() {
            var a = x(), b;
            if (b = f("==", "!=", "===", "!==")) a = k(a, b.fn, y());
            return a;
        }
        function x() {
            var a;
            a = n();
            for (var b; b = f("+", "-"); ) a = k(a, b.fn, n());
            if (b = f("<", ">", "<=", ">=")) a = k(a, b.fn, x());
            return a;
        }
        function n() {
            for (var a = v(), b; b = f("*", "/", "%"); ) a = k(a, b.fn, v());
            return a;
        }
        function v() {
            var a;
            return f("+") ? A() : (a = f("-")) ? k($, a.fn, v()) : (a = f("!")) ? j(a.fn, v()) : A();
        }
        function A() {
            var a;
            if (f("(")) a = w(), h(")"); else if (f("[")) a = G(); else if (f("{")) a = D(); else {
                var b = f();
                (a = b.fn) || e("not a primary expression", b);
                if (b.json) a.constant = a.literal = !0;
            }
            for (var c; b = f("(", "[", "."); ) b.text === "(" ? (a = s(a, c), c = null) : b.text === "[" ? (c = a, 
            a = ma(a)) : b.text === "." ? (c = a, a = ja(a)) : e("IMPOSSIBLE");
            return a;
        }
        function G() {
            var a = [], b = !0;
            if (g().text != "]") {
                do {
                    var c = P();
                    a.push(c);
                    c.constant || (b = !1);
                } while (f(","));
            }
            h("]");
            return t(function(b, c) {
                for (var d = [], e = 0; e < a.length; e++) d.push(a[e](b, c));
                return d;
            }, {
                literal: !0,
                constant: b
            });
        }
        function D() {
            var a = [], b = !0;
            if (g().text != "}") {
                do {
                    var c = f(), c = c.string || c.text;
                    h(":");
                    var d = P();
                    a.push({
                        key: c,
                        value: d
                    });
                    d.constant || (b = !1);
                } while (f(","));
            }
            h("}");
            return t(function(b, c) {
                for (var d = {}, e = 0; e < a.length; e++) {
                    var f = a[e];
                    d[f.key] = f.value(b, c);
                }
                return d;
            }, {
                literal: !0,
                constant: b
            });
        }
        var $ = S(0), K, O = Pc(b, d), P = function() {
            var a = o(), c, d;
            return (d = f("=")) ? (a.assign || e("implies assignment but [" + b.substring(0, d.index) + "] can not be assigned to", d), 
            c = o(), function(b, d) {
                return a.assign(b, c(b, d), d);
            }) : a;
        }, s = function(a, b) {
            var c = [];
            if (g().text != ")") {
                do c.push(P()); while (f(","));
            }
            h(")");
            return function(d, e) {
                for (var f = [], j = b ? b(d, e) : d, g = 0; g < c.length; g++) f.push(c[g](d, e));
                g = a(d, e, j) || q;
                return g.apply ? g.apply(j, f) : g(f[0], f[1], f[2], f[3], f[4]);
            };
        }, ja = function(a) {
            var b = f().text, c = Tb(b, d);
            return t(function(b, d, e) {
                return c(e || a(b, d), d);
            }, {
                assign: function(c, d, e) {
                    return Ub(a(c, e), b, d);
                }
            });
        }, ma = function(a) {
            var b = P();
            h("]");
            return t(function(c, d) {
                var e = a(c, d), f = b(c, d), j;
                if (!e) return p;
                if ((e = e[f]) && e.then) {
                    j = e;
                    if (!("$$v" in e)) j.$$v = p, j.then(function(a) {
                        j.$$v = a;
                    });
                    e = e.$$v;
                }
                return e;
            }, {
                assign: function(c, d, e) {
                    return a(c, e)[b(c, e)] = d;
                }
            });
        }, w = function() {
            for (var a = P(), b; ;) if (b = f("|")) a = k(a, b.fn, u()); else return a;
        };
        a ? (P = z, s = ja = ma = w = function() {
            e("is not valid json", {
                text: b,
                index: 0
            });
        }, K = A()) : K = l();
        O.length !== 0 && e("is an unexpected token", O[0]);
        K.literal = !!K.literal;
        K.constant = !!K.constant;
        return K;
    }
    function Ub(b, a, c) {
        for (var a = a.split("."), d = 0; a.length > 1; d++) {
            var e = a.shift(), g = b[e];
            g || (g = {}, b[e] = g);
            b = g;
        }
        return b[a.shift()] = c;
    }
    function ib(b, a, c) {
        if (!a) return b;
        for (var a = a.split("."), d, e = b, g = a.length, i = 0; i < g; i++) d = a[i], 
        b && (b = (e = b)[d]);
        return !c && H(b) ? $a(e, b) : b;
    }
    function Vb(b, a, c, d, e) {
        return function(g, i) {
            var f = i && i.hasOwnProperty(b) ? i : g, h;
            if (f === null || f === p) return f;
            if ((f = f[b]) && f.then) {
                if (!("$$v" in f)) h = f, h.$$v = p, h.then(function(a) {
                    h.$$v = a;
                });
                f = f.$$v;
            }
            if (!a || f === null || f === p) return f;
            if ((f = f[a]) && f.then) {
                if (!("$$v" in f)) h = f, h.$$v = p, h.then(function(a) {
                    h.$$v = a;
                });
                f = f.$$v;
            }
            if (!c || f === null || f === p) return f;
            if ((f = f[c]) && f.then) {
                if (!("$$v" in f)) h = f, h.$$v = p, h.then(function(a) {
                    h.$$v = a;
                });
                f = f.$$v;
            }
            if (!d || f === null || f === p) return f;
            if ((f = f[d]) && f.then) {
                if (!("$$v" in f)) h = f, h.$$v = p, h.then(function(a) {
                    h.$$v = a;
                });
                f = f.$$v;
            }
            if (!e || f === null || f === p) return f;
            if ((f = f[e]) && f.then) {
                if (!("$$v" in f)) h = f, h.$$v = p, h.then(function(a) {
                    h.$$v = a;
                });
                f = f.$$v;
            }
            return f;
        };
    }
    function Tb(b, a) {
        if (mb.hasOwnProperty(b)) return mb[b];
        var c = b.split("."), d = c.length, e;
        if (a) e = d < 6 ? Vb(c[0], c[1], c[2], c[3], c[4]) : function(a, b) {
            var e = 0, j;
            do j = Vb(c[e++], c[e++], c[e++], c[e++], c[e++])(a, b), b = p, a = j; while (e < d);
            return j;
        }; else {
            var g = "var l, fn, p;\n";
            n(c, function(a, b) {
                g += "if(s === null || s === undefined) return s;\nl=s;\ns=" + (b ? "s" : '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"];\nif (s && s.then) {\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n';
            });
            g += "return s;";
            e = Function("s", "k", g);
            e.toString = function() {
                return g;
            };
        }
        return mb[b] = e;
    }
    function Sc() {
        var b = {};
        this.$get = [ "$filter", "$sniffer", function(a, c) {
            return function(d) {
                switch (typeof d) {
                  case "string":
                    return b.hasOwnProperty(d) ? b[d] : b[d] = Rc(d, !1, a, c.csp);

                  case "function":
                    return d;

                  default:
                    return q;
                }
            };
        } ];
    }
    function Tc() {
        this.$get = [ "$rootScope", "$exceptionHandler", function(b, a) {
            return Uc(function(a) {
                b.$evalAsync(a);
            }, a);
        } ];
    }
    function Uc(b, a) {
        function c(a) {
            return a;
        }
        function d(a) {
            return i(a);
        }
        var e = function() {
            var f = [], h, j;
            return j = {
                resolve: function(a) {
                    if (f) {
                        var c = f;
                        f = p;
                        h = g(a);
                        c.length && b(function() {
                            for (var a, b = 0, d = c.length; b < d; b++) a = c[b], h.then(a[0], a[1]);
                        });
                    }
                },
                reject: function(a) {
                    j.resolve(i(a));
                },
                promise: {
                    then: function(b, j) {
                        var g = e(), i = function(d) {
                            try {
                                g.resolve((b || c)(d));
                            } catch (e) {
                                a(e), g.reject(e);
                            }
                        }, o = function(b) {
                            try {
                                g.resolve((j || d)(b));
                            } catch (c) {
                                a(c), g.reject(c);
                            }
                        };
                        f ? f.push([ i, o ]) : h.then(i, o);
                        return g.promise;
                    },
                    always: function(a) {
                        function b(a, c) {
                            var d = e();
                            c ? d.resolve(a) : d.reject(a);
                            return d.promise;
                        }
                        function d(e, f) {
                            var j = null;
                            try {
                                j = (a || c)();
                            } catch (g) {
                                return b(g, !1);
                            }
                            return j && j.then ? j.then(function() {
                                return b(e, f);
                            }, function(a) {
                                return b(a, !1);
                            }) : b(e, f);
                        }
                        return this.then(function(a) {
                            return d(a, !0);
                        }, function(a) {
                            return d(a, !1);
                        });
                    }
                }
            };
        }, g = function(a) {
            return a && a.then ? a : {
                then: function(c) {
                    var d = e();
                    b(function() {
                        d.resolve(c(a));
                    });
                    return d.promise;
                }
            };
        }, i = function(a) {
            return {
                then: function(c, j) {
                    var g = e();
                    b(function() {
                        g.resolve((j || d)(a));
                    });
                    return g.promise;
                }
            };
        };
        return {
            defer: e,
            reject: i,
            when: function(f, h, j) {
                var m = e(), k, l = function(b) {
                    try {
                        return (h || c)(b);
                    } catch (d) {
                        return a(d), i(d);
                    }
                }, u = function(b) {
                    try {
                        return (j || d)(b);
                    } catch (c) {
                        return a(c), i(c);
                    }
                };
                b(function() {
                    g(f).then(function(a) {
                        k || (k = !0, m.resolve(g(a).then(l, u)));
                    }, function(a) {
                        k || (k = !0, m.resolve(u(a)));
                    });
                });
                return m.promise;
            },
            all: function(a) {
                var b = e(), c = 0, d = F(a) ? [] : {};
                n(a, function(a, e) {
                    c++;
                    g(a).then(function(a) {
                        d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
                    }, function(a) {
                        d.hasOwnProperty(e) || b.reject(a);
                    });
                });
                c === 0 && b.resolve(d);
                return b.promise;
            }
        };
    }
    function Vc() {
        var b = {};
        this.when = function(a, c) {
            b[a] = t({
                reloadOnSearch: !0,
                caseInsensitiveMatch: !1
            }, c);
            if (a) {
                var d = a[a.length - 1] == "/" ? a.substr(0, a.length - 1) : a + "/";
                b[d] = {
                    redirectTo: a
                };
            }
            return this;
        };
        this.otherwise = function(a) {
            this.when(null, a);
            return this;
        };
        this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", function(a, c, d, e, g, i, f) {
            function h(a, b, c) {
                for (var b = "^" + b.replace(/[-\/\\^$:*+?.()|[\]{}]/g, "\\$&") + "$", d = "", e = [], f = {}, j = /\\([:*])(\w+)/g, g, i = 0; (g = j.exec(b)) !== null; ) {
                    d += b.slice(i, g.index);
                    switch (g[1]) {
                      case ":":
                        d += "([^\\/]*)";
                        break;

                      case "*":
                        d += "(.*)";
                    }
                    e.push(g[2]);
                    i = j.lastIndex;
                }
                d += b.substr(i);
                var h = a.match(RegExp(d, c.caseInsensitiveMatch ? "i" : ""));
                h && n(e, function(a, b) {
                    f[a] = h[b + 1];
                });
                return h ? f : null;
            }
            function j() {
                var b = m(), j = u.current;
                if (b && j && b.$$route === j.$$route && ia(b.pathParams, j.pathParams) && !b.reloadOnSearch && !l) j.params = b.params, 
                V(j.params, d), a.$broadcast("$routeUpdate", j); else if (b || j) l = !1, a.$broadcast("$routeChangeStart", b, j), 
                (u.current = b) && b.redirectTo && (E(b.redirectTo) ? c.path(k(b.redirectTo, b.params)).search(b.params).replace() : c.url(b.redirectTo(b.pathParams, c.path(), c.search())).replace()), 
                e.when(b).then(function() {
                    if (b) {
                        var a = t({}, b.resolve), c;
                        n(a, function(b, c) {
                            a[c] = E(b) ? g.get(b) : g.invoke(b);
                        });
                        if (B(c = b.template)) H(c) && (c = c(b.params)); else if (B(c = b.templateUrl)) if (H(c) && (c = c(b.params)), 
                        B(c)) b.loadedTemplateUrl = c, c = i.get(c, {
                            cache: f
                        }).then(function(a) {
                            return a.data;
                        });
                        B(c) && (a.$template = c);
                        return e.all(a);
                    }
                }).then(function(c) {
                    if (b == u.current) {
                        if (b) b.locals = c, V(b.params, d);
                        a.$broadcast("$routeChangeSuccess", b, j);
                    }
                }, function(c) {
                    b == u.current && a.$broadcast("$routeChangeError", b, j, c);
                });
            }
            function m() {
                var a, d;
                n(b, function(b, e) {
                    if (!d && (a = h(c.path(), e, b))) d = tb(b, {
                        params: t({}, c.search(), a),
                        pathParams: a
                    }), d.$$route = b;
                });
                return d || b[null] && tb(b[null], {
                    params: {},
                    pathParams: {}
                });
            }
            function k(a, b) {
                var c = [];
                n((a || "").split(":"), function(a, d) {
                    if (d == 0) c.push(a); else {
                        var e = a.match(/(\w+)(.*)/), f = e[1];
                        c.push(b[f]);
                        c.push(e[2] || "");
                        delete b[f];
                    }
                });
                return c.join("");
            }
            var l = !1, u = {
                routes: b,
                reload: function() {
                    l = !0;
                    a.$evalAsync(j);
                }
            };
            a.$on("$locationChangeSuccess", j);
            return u;
        } ];
    }
    function Wc() {
        this.$get = S({});
    }
    function Xc() {
        var b = 10;
        this.digestTtl = function(a) {
            arguments.length && (b = a);
            return b;
        };
        this.$get = [ "$injector", "$exceptionHandler", "$parse", function(a, c, d) {
            function e() {
                this.$id = Fa();
                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                this["this"] = this.$root = this;
                this.$$destroyed = !1;
                this.$$asyncQueue = [];
                this.$$listeners = {};
                this.$$isolateBindings = {};
            }
            function g(a) {
                if (h.$$phase) throw Error(h.$$phase + " already in progress");
                h.$$phase = a;
            }
            function i(a, b) {
                var c = d(a);
                xa(c, b);
                return c;
            }
            function f() {}
            e.prototype = {
                $new: function(a) {
                    if (H(a)) throw Error("API-CHANGE: Use $controller to instantiate controllers.");
                    a ? (a = new e(), a.$root = this.$root) : (a = function() {}, a.prototype = this, 
                    a = new a(), a.$id = Fa());
                    a["this"] = a;
                    a.$$listeners = {};
                    a.$parent = this;
                    a.$$watchers = a.$$nextSibling = a.$$childHead = a.$$childTail = null;
                    a.$$prevSibling = this.$$childTail;
                    this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a;
                    return a;
                },
                $watch: function(a, b, c) {
                    var d = i(a, "watch"), e = this.$$watchers, g = {
                        fn: b,
                        last: f,
                        get: d,
                        exp: a,
                        eq: !!c
                    };
                    if (!H(b)) {
                        var h = i(b || q, "listener");
                        g.fn = function(a, b, c) {
                            h(c);
                        };
                    }
                    if (typeof a == "string" && d.constant) {
                        var r = g.fn;
                        g.fn = function(a, b, c) {
                            r.call(this, a, b, c);
                            ta(e, g);
                        };
                    }
                    if (!e) e = this.$$watchers = [];
                    e.unshift(g);
                    return function() {
                        ta(e, g);
                    };
                },
                $watchCollection: function(a, b) {
                    var c = this, e, f, g = 0, i = d(a), h = [], n = {}, x = 0;
                    return this.$watch(function() {
                        f = i(c);
                        var a, b;
                        if (L(f)) if (Xa(f)) {
                            if (e !== h) e = h, x = e.length = 0, g++;
                            a = f.length;
                            if (x !== a) g++, e.length = x = a;
                            for (b = 0; b < a; b++) e[b] !== f[b] && (g++, e[b] = f[b]);
                        } else {
                            e !== n && (e = n = {}, x = 0, g++);
                            a = 0;
                            for (b in f) f.hasOwnProperty(b) && (a++, e.hasOwnProperty(b) ? e[b] !== f[b] && (g++, 
                            e[b] = f[b]) : (x++, e[b] = f[b], g++));
                            if (x > a) for (b in g++, e) e.hasOwnProperty(b) && !f.hasOwnProperty(b) && (x--, 
                            delete e[b]);
                        } else e !== f && (e = f, g++);
                        return g;
                    }, function() {
                        b(f, e, c);
                    });
                },
                $digest: function() {
                    var a, d, e, i, u = this.$$asyncQueue, o, z, r = b, n, x = [], p, v;
                    g("$digest");
                    do {
                        z = !1;
                        for (n = this; u.length; ) try {
                            n.$eval(u.shift());
                        } catch (A) {
                            c(A);
                        }
                        do {
                            if (i = n.$$watchers) for (o = i.length; o--; ) try {
                                if (a = i[o], (d = a.get(n)) !== (e = a.last) && !(a.eq ? ia(d, e) : typeof d == "number" && typeof e == "number" && isNaN(d) && isNaN(e))) z = !0, 
                                a.last = a.eq ? V(d) : d, a.fn(d, e === f ? d : e, n), r < 5 && (p = 4 - r, x[p] || (x[p] = []), 
                                v = H(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp, v += "; newVal: " + ha(d) + "; oldVal: " + ha(e), 
                                x[p].push(v));
                            } catch (G) {
                                c(G);
                            }
                            if (!(i = n.$$childHead || n !== this && n.$$nextSibling)) for (;n !== this && !(i = n.$$nextSibling); ) n = n.$parent;
                        } while (n = i);
                        if (z && !r--) throw h.$$phase = null, Error(b + " $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: " + ha(x));
                    } while (z || u.length);
                    h.$$phase = null;
                },
                $destroy: function() {
                    if (!(h == this || this.$$destroyed)) {
                        var a = this.$parent;
                        this.$broadcast("$destroy");
                        this.$$destroyed = !0;
                        if (a.$$childHead == this) a.$$childHead = this.$$nextSibling;
                        if (a.$$childTail == this) a.$$childTail = this.$$prevSibling;
                        if (this.$$prevSibling) this.$$prevSibling.$$nextSibling = this.$$nextSibling;
                        if (this.$$nextSibling) this.$$nextSibling.$$prevSibling = this.$$prevSibling;
                        this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                    }
                },
                $eval: function(a, b) {
                    return d(a)(this, b);
                },
                $evalAsync: function(a) {
                    this.$$asyncQueue.push(a);
                },
                $apply: function(a) {
                    try {
                        return g("$apply"), this.$eval(a);
                    } catch (b) {
                        c(b);
                    } finally {
                        h.$$phase = null;
                        try {
                            h.$digest();
                        } catch (d) {
                            throw c(d), d;
                        }
                    }
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []);
                    c.push(b);
                    return function() {
                        c[Ga(c, b)] = null;
                    };
                },
                $emit: function(a, b) {
                    var d = [], e, f = this, g = !1, i = {
                        name: a,
                        targetScope: f,
                        stopPropagation: function() {
                            g = !0;
                        },
                        preventDefault: function() {
                            i.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, h = [ i ].concat(ka.call(arguments, 1)), n, x;
                    do {
                        e = f.$$listeners[a] || d;
                        i.currentScope = f;
                        n = 0;
                        for (x = e.length; n < x; n++) if (e[n]) try {
                            if (e[n].apply(null, h), g) return i;
                        } catch (p) {
                            c(p);
                        } else e.splice(n, 1), n--, x--;
                        f = f.$parent;
                    } while (f);
                    return i;
                },
                $broadcast: function(a, b) {
                    var d = this, e = this, f = {
                        name: a,
                        targetScope: this,
                        preventDefault: function() {
                            f.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, g = [ f ].concat(ka.call(arguments, 1)), i, h;
                    do {
                        d = e;
                        f.currentScope = d;
                        e = d.$$listeners[a] || [];
                        i = 0;
                        for (h = e.length; i < h; i++) if (e[i]) try {
                            e[i].apply(null, g);
                        } catch (n) {
                            c(n);
                        } else e.splice(i, 1), i--, h--;
                        if (!(e = d.$$childHead || d !== this && d.$$nextSibling)) for (;d !== this && !(e = d.$$nextSibling); ) d = d.$parent;
                    } while (d = e);
                    return f;
                }
            };
            var h = new e();
            return h;
        } ];
    }
    function Yc() {
        this.$get = [ "$window", "$document", function(b, a) {
            var c = {}, d = N((/android (\d+)/.exec(I((b.navigator || {}).userAgent)) || [])[1]), e = a[0] || {}, g, i = /^(Moz|webkit|O|ms)(?=[A-Z])/, f = e.body && e.body.style, h = !1, j = !1;
            if (f) {
                for (var m in f) if (h = i.exec(m)) {
                    g = h[0];
                    g = g.substr(0, 1).toUpperCase() + g.substr(1);
                    break;
                }
                h = !!("transition" in f || g + "Transition" in f);
                j = !!("animation" in f || g + "Animation" in f);
            }
            return {
                history: !(!b.history || !b.history.pushState || d < 4),
                hashchange: "onhashchange" in b && (!e.documentMode || e.documentMode > 7),
                hasEvent: function(a) {
                    if (a == "input" && Z == 9) return !1;
                    if (C(c[a])) {
                        var b = e.createElement("div");
                        c[a] = "on" + a in b;
                    }
                    return c[a];
                },
                csp: e.securityPolicy ? e.securityPolicy.isActive : !1,
                vendorPrefix: g,
                transitions: h,
                animations: j
            };
        } ];
    }
    function Zc() {
        this.$get = S(M);
    }
    function Wb(b) {
        var a = {}, c, d, e;
        if (!b) return a;
        n(b.split("\n"), function(b) {
            e = b.indexOf(":");
            c = I(U(b.substr(0, e)));
            d = U(b.substr(e + 1));
            c && (a[c] ? a[c] += ", " + d : a[c] = d);
        });
        return a;
    }
    function $c(b, a) {
        var c = ad.exec(b);
        if (c == null) return !0;
        var d = {
            protocol: c[2],
            host: c[4],
            port: N(c[6]) || Oa[c[2]] || null,
            relativeProtocol: c[2] === p || c[2] === ""
        }, c = jb.exec(a), c = {
            protocol: c[1],
            host: c[3],
            port: N(c[5]) || Oa[c[1]] || null
        };
        return (d.protocol == c.protocol || d.relativeProtocol) && d.host == c.host && (d.port == c.port || d.relativeProtocol && c.port == Oa[c.protocol]);
    }
    function Xb(b) {
        var a = L(b) ? b : p;
        return function(c) {
            a || (a = Wb(b));
            return c ? a[I(c)] || null : a;
        };
    }
    function Yb(b, a, c) {
        if (H(c)) return c(b, a);
        n(c, function(c) {
            b = c(b, a);
        });
        return b;
    }
    function bd() {
        var b = /^\s*(\[|\{[^\{])/, a = /[\}\]]\s*$/, c = /^\)\]\}',?\n/, d = {
            "Content-Type": "application/json;charset=utf-8"
        }, e = this.defaults = {
            transformResponse: [ function(d) {
                E(d) && (d = d.replace(c, ""), b.test(d) && a.test(d) && (d = ub(d, !0)));
                return d;
            } ],
            transformRequest: [ function(a) {
                return L(a) && Ea.apply(a) !== "[object File]" ? ha(a) : a;
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: d,
                put: d,
                patch: d
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }, g = this.interceptors = [], i = this.responseInterceptors = [];
        this.$get = [ "$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, c, d, k, l) {
            function u(a) {
                function c(a) {
                    var b = t({}, a, {
                        data: Yb(a.data, a.headers, d.transformResponse)
                    });
                    return 200 <= a.status && a.status < 300 ? b : k.reject(b);
                }
                var d = {
                    transformRequest: e.transformRequest,
                    transformResponse: e.transformResponse
                }, f = {};
                t(d, a);
                d.headers = f;
                d.method = oa(d.method);
                t(f, e.headers.common, e.headers[I(d.method)], a.headers);
                (a = $c(d.url, b.url()) ? b.cookies()[d.xsrfCookieName || e.xsrfCookieName] : p) && (f[d.xsrfHeaderName || e.xsrfHeaderName] = a);
                var g = [ function(a) {
                    var b = Yb(a.data, Xb(f), a.transformRequest);
                    C(a.data) && delete f["Content-Type"];
                    if (C(a.withCredentials) && !C(e.withCredentials)) a.withCredentials = e.withCredentials;
                    return o(a, b, f).then(c, c);
                }, p ], j = k.when(d);
                for (n(y, function(a) {
                    (a.request || a.requestError) && g.unshift(a.request, a.requestError);
                    (a.response || a.responseError) && g.push(a.response, a.responseError);
                }); g.length; ) var a = g.shift(), i = g.shift(), j = j.then(a, i);
                j.success = function(a) {
                    j.then(function(b) {
                        a(b.data, b.status, b.headers, d);
                    });
                    return j;
                };
                j.error = function(a) {
                    j.then(null, function(b) {
                        a(b.data, b.status, b.headers, d);
                    });
                    return j;
                };
                return j;
            }
            function o(b, c, g) {
                function j(a, b, c) {
                    n && (200 <= a && a < 300 ? n.put(s, [ a, b, Wb(c) ]) : n.remove(s));
                    i(b, a, c);
                    d.$$phase || d.$apply();
                }
                function i(a, c, d) {
                    c = Math.max(c, 0);
                    (200 <= c && c < 300 ? l.resolve : l.reject)({
                        data: a,
                        status: c,
                        headers: Xb(d),
                        config: b
                    });
                }
                function h() {
                    var a = Ga(u.pendingRequests, b);
                    a !== -1 && u.pendingRequests.splice(a, 1);
                }
                var l = k.defer(), o = l.promise, n, p, s = z(b.url, b.params);
                u.pendingRequests.push(b);
                o.then(h, h);
                if ((b.cache || e.cache) && b.cache !== !1 && b.method == "GET") n = L(b.cache) ? b.cache : L(e.cache) ? e.cache : r;
                if (n) if (p = n.get(s)) if (p.then) return p.then(h, h), p; else F(p) ? i(p[1], p[0], V(p[2])) : i(p, 200, {}); else n.put(s, o);
                p || a(b.method, s, c, j, g, b.timeout, b.withCredentials, b.responseType);
                return o;
            }
            function z(a, b) {
                if (!b) return a;
                var c = [];
                nc(b, function(a, b) {
                    a == null || a == p || (F(a) || (a = [ a ]), n(a, function(a) {
                        L(a) && (a = ha(a));
                        c.push(wa(b) + "=" + wa(a));
                    }));
                });
                return a + (a.indexOf("?") == -1 ? "?" : "&") + c.join("&");
            }
            var r = c("$http"), y = [];
            n(g, function(a) {
                y.unshift(E(a) ? l.get(a) : l.invoke(a));
            });
            n(i, function(a, b) {
                var c = E(a) ? l.get(a) : l.invoke(a);
                y.splice(b, 0, {
                    response: function(a) {
                        return c(k.when(a));
                    },
                    responseError: function(a) {
                        return c(k.reject(a));
                    }
                });
            });
            u.pendingRequests = [];
            (function(a) {
                n(arguments, function(a) {
                    u[a] = function(b, c) {
                        return u(t(c || {}, {
                            method: a,
                            url: b
                        }));
                    };
                });
            })("get", "delete", "head", "jsonp");
            (function(a) {
                n(arguments, function(a) {
                    u[a] = function(b, c, d) {
                        return u(t(d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }));
                    };
                });
            })("post", "put");
            u.defaults = e;
            return u;
        } ];
    }
    function cd() {
        this.$get = [ "$browser", "$window", "$document", function(b, a, c) {
            return dd(b, ed, b.defer, a.angular.callbacks, c[0], a.location.protocol.replace(":", ""));
        } ];
    }
    function dd(b, a, c, d, e, g) {
        function i(a, b) {
            var c = e.createElement("script"), d = function() {
                e.body.removeChild(c);
                b && b();
            };
            c.type = "text/javascript";
            c.src = a;
            Z ? c.onreadystatechange = function() {
                /loaded|complete/.test(c.readyState) && d();
            } : c.onload = c.onerror = d;
            e.body.appendChild(c);
            return d;
        }
        return function(e, h, j, m, k, l, u, o) {
            function z() {
                p = -1;
                t && t();
                v && v.abort();
            }
            function r(a, d, e, f) {
                var j = (h.match(jb) || [ "", g ])[1];
                A && c.cancel(A);
                t = v = null;
                d = j == "file" ? e ? 200 : 404 : d;
                a(d == 1223 ? 204 : d, e, f);
                b.$$completeOutstandingRequest(q);
            }
            var p;
            b.$$incOutstandingRequestCount();
            h = h || b.url();
            if (I(e) == "jsonp") {
                var x = "_" + (d.counter++).toString(36);
                d[x] = function(a) {
                    d[x].data = a;
                };
                var t = i(h.replace("JSON_CALLBACK", "angular.callbacks." + x), function() {
                    d[x].data ? r(m, 200, d[x].data) : r(m, p || -2);
                    delete d[x];
                });
            } else {
                var v = new a();
                v.open(e, h, !0);
                n(k, function(a, b) {
                    a && v.setRequestHeader(b, a);
                });
                v.onreadystatechange = function() {
                    if (v.readyState == 4) {
                        var a = v.getAllResponseHeaders(), b = [ "Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma" ];
                        a || (a = "", n(b, function(b) {
                            var c = v.getResponseHeader(b);
                            c && (a += b + ": " + c + "\n");
                        }));
                        r(m, p || v.status, v.responseType ? v.response : v.responseText, a);
                    }
                };
                if (u) v.withCredentials = !0;
                if (o) v.responseType = o;
                v.send(j || "");
            }
            if (l > 0) var A = c(z, l); else l && l.then && l.then(z);
        };
    }
    function fd() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [ {
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    } ],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: [ "AM", "PM" ],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(b) {
                    return b === 1 ? "one" : "other";
                }
            };
        };
    }
    function gd() {
        this.$get = [ "$rootScope", "$browser", "$q", "$exceptionHandler", function(b, a, c, d) {
            function e(e, f, h) {
                var j = c.defer(), m = j.promise, k = B(h) && !h, f = a.defer(function() {
                    try {
                        j.resolve(e());
                    } catch (a) {
                        j.reject(a), d(a);
                    }
                    k || b.$apply();
                }, f), h = function() {
                    delete g[m.$$timeoutId];
                };
                m.$$timeoutId = f;
                g[f] = j;
                m.then(h, h);
                return m;
            }
            var g = {};
            e.cancel = function(b) {
                return b && b.$$timeoutId in g ? (g[b.$$timeoutId].reject("canceled"), a.defer.cancel(b.$$timeoutId)) : !1;
            };
            return e;
        } ];
    }
    function Zb(b) {
        function a(a, e) {
            return b.factory(a + c, e);
        }
        var c = "Filter";
        this.register = a;
        this.$get = [ "$injector", function(a) {
            return function(b) {
                return a.get(b + c);
            };
        } ];
        a("currency", $b);
        a("date", ac);
        a("filter", hd);
        a("json", id);
        a("limitTo", jd);
        a("lowercase", kd);
        a("number", bc);
        a("orderBy", cc);
        a("uppercase", ld);
    }
    function hd() {
        return function(b, a, c) {
            if (!F(b)) return b;
            var d = [];
            d.check = function(a) {
                for (var b = 0; b < d.length; b++) if (!d[b](a)) return !1;
                return !0;
            };
            switch (typeof c) {
              case "function":
                break;

              case "boolean":
                if (c == !0) {
                    c = function(a, b) {
                        return Ha.equals(a, b);
                    };
                    break;
                }

              default:
                c = function(a, b) {
                    b = ("" + b).toLowerCase();
                    return ("" + a).toLowerCase().indexOf(b) > -1;
                };
            }
            var e = function(a, b) {
                if (typeof b == "string" && b.charAt(0) === "!") return !e(a, b.substr(1));
                switch (typeof a) {
                  case "boolean":
                  case "number":
                  case "string":
                    return c(a, b);

                  case "object":
                    switch (typeof b) {
                      case "object":
                        return c(a, b);

                      default:
                        for (var d in a) if (d.charAt(0) !== "$" && e(a[d], b)) return !0;
                    }
                    return !1;

                  case "array":
                    for (d = 0; d < a.length; d++) if (e(a[d], b)) return !0;
                    return !1;

                  default:
                    return !1;
                }
            };
            switch (typeof a) {
              case "boolean":
              case "number":
              case "string":
                a = {
                    $: a
                };

              case "object":
                for (var g in a) g == "$" ? function() {
                    if (a[g]) {
                        var b = g;
                        d.push(function(c) {
                            return e(c, a[b]);
                        });
                    }
                }() : function() {
                    if (a[g]) {
                        var b = g;
                        d.push(function(c) {
                            return e(ib(c, b), a[b]);
                        });
                    }
                }();
                break;

              case "function":
                d.push(a);
                break;

              default:
                return b;
            }
            for (var i = [], f = 0; f < b.length; f++) {
                var h = b[f];
                d.check(h) && i.push(h);
            }
            return i;
        };
    }
    function $b(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            if (C(d)) d = a.CURRENCY_SYM;
            return dc(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, 2).replace(/\u00A4/g, d);
        };
    }
    function bc(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            return dc(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d);
        };
    }
    function dc(b, a, c, d, e) {
        if (isNaN(b) || !isFinite(b)) return "";
        var g = b < 0, b = Math.abs(b), i = b + "", f = "", h = [], j = !1;
        if (i.indexOf("e") !== -1) {
            var m = i.match(/([\d\.]+)e(-?)(\d+)/);
            m && m[2] == "-" && m[3] > e + 1 ? i = "0" : (f = i, j = !0);
        }
        if (!j) {
            i = (i.split(ec)[1] || "").length;
            C(e) && (e = Math.min(Math.max(a.minFrac, i), a.maxFrac));
            var i = Math.pow(10, e), b = Math.round(b * i) / i, b = ("" + b).split(ec), i = b[0], b = b[1] || "", j = 0, m = a.lgSize, k = a.gSize;
            if (i.length >= m + k) for (var j = i.length - m, l = 0; l < j; l++) (j - l) % k === 0 && l !== 0 && (f += c), 
            f += i.charAt(l);
            for (l = j; l < i.length; l++) (i.length - l) % m === 0 && l !== 0 && (f += c), 
            f += i.charAt(l);
            for (;b.length < e; ) b += "0";
            e && e !== "0" && (f += d + b.substr(0, e));
        }
        h.push(g ? a.negPre : a.posPre);
        h.push(f);
        h.push(g ? a.negSuf : a.posSuf);
        return h.join("");
    }
    function nb(b, a, c) {
        var d = "";
        b < 0 && (d = "-", b = -b);
        for (b = "" + b; b.length < a; ) b = "0" + b;
        c && (b = b.substr(b.length - a));
        return d + b;
    }
    function Q(b, a, c, d) {
        c = c || 0;
        return function(e) {
            e = e["get" + b]();
            if (c > 0 || e > -c) e += c;
            e === 0 && c == -12 && (e = 12);
            return nb(e, a, d);
        };
    }
    function Qa(b, a) {
        return function(c, d) {
            var e = c["get" + b](), g = oa(a ? "SHORT" + b : b);
            return d[g][e];
        };
    }
    function ac(b) {
        function a(a) {
            var b;
            if (b = a.match(c)) {
                var a = new Date(0), g = 0, i = 0, f = b[8] ? a.setUTCFullYear : a.setFullYear, h = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (g = N(b[9] + b[10]), i = N(b[9] + b[11]));
                f.call(a, N(b[1]), N(b[2]) - 1, N(b[3]));
                g = N(b[4] || 0) - g;
                i = N(b[5] || 0) - i;
                f = N(b[6] || 0);
                b = Math.round(parseFloat("0." + (b[7] || 0)) * 1e3);
                h.call(a, g, i, f, b);
            }
            return a;
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, e) {
            var g = "", i = [], f, h, e = e || "mediumDate", e = b.DATETIME_FORMATS[e] || e;
            E(c) && (c = md.test(c) ? N(c) : a(c));
            Ya(c) && (c = new Date(c));
            if (!ra(c)) return c;
            for (;e; ) (h = nd.exec(e)) ? (i = i.concat(ka.call(h, 1)), e = i.pop()) : (i.push(e), 
            e = null);
            n(i, function(a) {
                f = od[a];
                g += f ? f(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            });
            return g;
        };
    }
    function id() {
        return function(b) {
            return ha(b, !0);
        };
    }
    function jd() {
        return function(b, a) {
            if (!F(b) && !E(b)) return b;
            a = N(a);
            if (E(b)) return a ? a >= 0 ? b.slice(0, a) : b.slice(a, b.length) : "";
            var c = [], d, e;
            a > b.length ? a = b.length : a < -b.length && (a = -b.length);
            a > 0 ? (d = 0, e = a) : (d = b.length + a, e = b.length);
            for (;d < e; d++) c.push(b[d]);
            return c;
        };
    }
    function cc(b) {
        return function(a, c, d) {
            function e(a, b) {
                return ua(b) ? function(b, c) {
                    return a(c, b);
                } : a;
            }
            if (!F(a)) return a;
            if (!c) return a;
            for (var c = F(c) ? c : [ c ], c = Za(c, function(a) {
                var c = !1, d = a || qa;
                if (E(a)) {
                    if (a.charAt(0) == "+" || a.charAt(0) == "-") c = a.charAt(0) == "-", a = a.substring(1);
                    d = b(a);
                }
                return e(function(a, b) {
                    var c;
                    c = d(a);
                    var e = d(b), f = typeof c, g = typeof e;
                    f == g ? (f == "string" && (c = c.toLowerCase()), f == "string" && (e = e.toLowerCase()), 
                    c = c === e ? 0 : c < e ? -1 : 1) : c = f < g ? -1 : 1;
                    return c;
                }, c);
            }), g = [], i = 0; i < a.length; i++) g.push(a[i]);
            return g.sort(e(function(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (e !== 0) return e;
                }
                return 0;
            }, d));
        };
    }
    function aa(b) {
        H(b) && (b = {
            link: b
        });
        b.restrict = b.restrict || "AC";
        return S(b);
    }
    function fc(b, a) {
        function c(a, c) {
            c = c ? "-" + bb(c, "-") : "";
            b.removeClass((a ? Ra : Sa) + c).addClass((a ? Sa : Ra) + c);
        }
        var d = this, e = b.parent().controller("form") || Ta, g = 0, i = d.$error = {}, f = [];
        d.$name = a.name;
        d.$dirty = !1;
        d.$pristine = !0;
        d.$valid = !0;
        d.$invalid = !1;
        e.$addControl(d);
        b.addClass(pa);
        c(!0);
        d.$addControl = function(a) {
            f.push(a);
            a.$name && !d.hasOwnProperty(a.$name) && (d[a.$name] = a);
        };
        d.$removeControl = function(a) {
            a.$name && d[a.$name] === a && delete d[a.$name];
            n(i, function(b, c) {
                d.$setValidity(c, !0, a);
            });
            ta(f, a);
        };
        d.$setValidity = function(a, b, f) {
            var k = i[a];
            if (b) {
                if (k && (ta(k, f), !k.length)) {
                    g--;
                    if (!g) c(b), d.$valid = !0, d.$invalid = !1;
                    i[a] = !1;
                    c(!0, a);
                    e.$setValidity(a, !0, d);
                }
            } else {
                g || c(b);
                if (k) {
                    if (Ga(k, f) != -1) return;
                } else i[a] = k = [], g++, c(!1, a), e.$setValidity(a, !1, d);
                k.push(f);
                d.$valid = !1;
                d.$invalid = !0;
            }
        };
        d.$setDirty = function() {
            b.removeClass(pa).addClass(Ua);
            d.$dirty = !0;
            d.$pristine = !1;
            e.$setDirty();
        };
        d.$setPristine = function() {
            b.removeClass(Ua).addClass(pa);
            d.$dirty = !1;
            d.$pristine = !0;
            n(f, function(a) {
                a.$setPristine();
            });
        };
    }
    function X(b) {
        return C(b) || b === "" || b === null || b !== b;
    }
    function Va(b, a, c, d, e, g) {
        var i = function() {
            var e = a.val();
            if (ua(c.ngTrim || "T")) e = U(e);
            d.$viewValue !== e && b.$apply(function() {
                d.$setViewValue(e);
            });
        };
        if (e.hasEvent("input")) a.bind("input", i); else {
            var f, h = function() {
                f || (f = g.defer(function() {
                    i();
                    f = null;
                }));
            };
            a.bind("keydown", function(a) {
                a = a.keyCode;
                a === 91 || 15 < a && a < 19 || 37 <= a && a <= 40 || h();
            });
            a.bind("change", i);
            e.hasEvent("paste") && a.bind("paste cut", h);
        }
        d.$render = function() {
            a.val(X(d.$viewValue) ? "" : d.$viewValue);
        };
        var j = c.ngPattern, m = function(a, b) {
            return X(b) || a.test(b) ? (d.$setValidity("pattern", !0), b) : (d.$setValidity("pattern", !1), 
            p);
        };
        j && ((e = j.match(/^\/(.*)\/([gim]*)$/)) ? (j = RegExp(e[1], e[2]), e = function(a) {
            return m(j, a);
        }) : e = function(a) {
            var c = b.$eval(j);
            if (!c || !c.test) throw Error("Expected " + j + " to be a RegExp but was " + c);
            return m(c, a);
        }, d.$formatters.push(e), d.$parsers.push(e));
        if (c.ngMinlength) {
            var k = N(c.ngMinlength), e = function(a) {
                return !X(a) && a.length < k ? (d.$setValidity("minlength", !1), p) : (d.$setValidity("minlength", !0), 
                a);
            };
            d.$parsers.push(e);
            d.$formatters.push(e);
        }
        if (c.ngMaxlength) {
            var l = N(c.ngMaxlength), e = function(a) {
                return !X(a) && a.length > l ? (d.$setValidity("maxlength", !1), p) : (d.$setValidity("maxlength", !0), 
                a);
            };
            d.$parsers.push(e);
            d.$formatters.push(e);
        }
    }
    function ob(b, a) {
        b = "ngClass" + b;
        return aa(function(c, d, e) {
            function g(b) {
                if (a === !0 || c.$index % 2 === a) h && !ia(b, h) && i(h), f(b);
                h = V(b);
            }
            function i(a) {
                L(a) && !F(a) && (a = Za(a, function(a, b) {
                    if (a) return b;
                }));
                d.removeClass(F(a) ? a.join(" ") : a);
            }
            function f(a) {
                L(a) && !F(a) && (a = Za(a, function(a, b) {
                    if (a) return b;
                }));
                a && d.addClass(F(a) ? a.join(" ") : a);
            }
            var h = p;
            c.$watch(e[b], g, !0);
            e.$observe("class", function() {
                var a = c.$eval(e[b]);
                g(a, a);
            });
            b !== "ngClass" && c.$watch("$index", function(d, g) {
                var h = d & 1;
                h !== g & 1 && (h === a ? f(c.$eval(e[b])) : i(c.$eval(e[b])));
            });
        });
    }
    var I = function(b) {
        return E(b) ? b.toLowerCase() : b;
    }, oa = function(b) {
        return E(b) ? b.toUpperCase() : b;
    }, Z = N((/msie (\d+)/.exec(I(navigator.userAgent)) || [])[1]), w, ga, ka = [].slice, Wa = [].push, Ea = Object.prototype.toString, mc = M.angular, Ha = M.angular || (M.angular = {}), Aa, hb, ba = [ "0", "0", "0" ];
    q.$inject = [];
    qa.$inject = [];
    hb = Z < 9 ? function(b) {
        b = b.nodeName ? b : b[0];
        return b.scopeName && b.scopeName != "HTML" ? oa(b.scopeName + ":" + b.nodeName) : b.nodeName;
    } : function(b) {
        return b.nodeName ? b.nodeName : b[0].nodeName;
    };
    var sc = /[A-Z]/g, pd = {
        full: "1.1.5",
        major: 1,
        minor: 1,
        dot: 5,
        codeName: "triangle-squarification"
    }, Ka = R.cache = {}, Ja = R.expando = "ng-" + new Date().getTime(), wc = 1, gc = M.document.addEventListener ? function(b, a, c) {
        b.addEventListener(a, c, !1);
    } : function(b, a, c) {
        b.attachEvent("on" + a, c);
    }, gb = M.document.removeEventListener ? function(b, a, c) {
        b.removeEventListener(a, c, !1);
    } : function(b, a, c) {
        b.detachEvent("on" + a, c);
    }, uc = /([\:\-\_]+(.))/g, vc = /^moz([A-Z])/, Ba = R.prototype = {
        ready: function(b) {
            function a() {
                c || (c = !0, b());
            }
            var c = !1;
            T.readyState === "complete" ? setTimeout(a) : (this.bind("DOMContentLoaded", a), 
            R(M).bind("load", a));
        },
        toString: function() {
            var b = [];
            n(this, function(a) {
                b.push("" + a);
            });
            return "[" + b.join(", ") + "]";
        },
        eq: function(b) {
            return b >= 0 ? w(this[b]) : w(this[this.length + b]);
        },
        length: 0,
        push: Wa,
        sort: [].sort,
        splice: [].splice
    }, Na = {};
    n("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(b) {
        Na[I(b)] = b;
    });
    var Gb = {};
    n("input,select,option,textarea,button,form,details".split(","), function(b) {
        Gb[oa(b)] = !0;
    });
    n({
        data: Bb,
        inheritedData: Ma,
        scope: function(b) {
            return Ma(b, "$scope");
        },
        controller: Eb,
        injector: function(b) {
            return Ma(b, "$injector");
        },
        removeAttr: function(b, a) {
            b.removeAttribute(a);
        },
        hasClass: La,
        css: function(b, a, c) {
            a = Ia(a);
            if (B(c)) b.style[a] = c; else {
                var d;
                Z <= 8 && (d = b.currentStyle && b.currentStyle[a], d === "" && (d = "auto"));
                d = d || b.style[a];
                Z <= 8 && (d = d === "" ? p : d);
                return d;
            }
        },
        attr: function(b, a, c) {
            var d = I(a);
            if (Na[d]) if (B(c)) c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d)); else return b[a] || (b.attributes.getNamedItem(a) || q).specified ? d : p; else if (B(c)) b.setAttribute(a, c); else if (b.getAttribute) return b = b.getAttribute(a, 2), 
            b === null ? p : b;
        },
        prop: function(b, a, c) {
            if (B(c)) b[a] = c; else return b[a];
        },
        text: t(Z < 9 ? function(b, a) {
            if (b.nodeType == 1) {
                if (C(a)) return b.innerText;
                b.innerText = a;
            } else {
                if (C(a)) return b.nodeValue;
                b.nodeValue = a;
            }
        } : function(b, a) {
            if (C(a)) return b.textContent;
            b.textContent = a;
        }, {
            $dv: ""
        }),
        val: function(b, a) {
            if (C(a)) return b.value;
            b.value = a;
        },
        html: function(b, a) {
            if (C(a)) return b.innerHTML;
            for (var c = 0, d = b.childNodes; c < d.length; c++) ya(d[c]);
            b.innerHTML = a;
        }
    }, function(b, a) {
        R.prototype[a] = function(a, d) {
            var e, g;
            if ((b.length == 2 && b !== La && b !== Eb ? a : d) === p) if (L(a)) {
                for (e = 0; e < this.length; e++) if (b === Bb) b(this[e], a); else for (g in a) b(this[e], g, a[g]);
                return this;
            } else {
                if (this.length) return b(this[0], a, d);
            } else {
                for (e = 0; e < this.length; e++) b(this[e], a, d);
                return this;
            }
            return b.$dv;
        };
    });
    n({
        removeData: zb,
        dealoc: ya,
        bind: function a(c, d, e) {
            var g = ca(c, "events"), i = ca(c, "handle");
            g || ca(c, "events", g = {});
            i || ca(c, "handle", i = xc(c, g));
            n(d.split(" "), function(d) {
                var h = g[d];
                if (!h) {
                    if (d == "mouseenter" || d == "mouseleave") {
                        var j = T.body.contains || T.body.compareDocumentPosition ? function(a, c) {
                            var d = a.nodeType === 9 ? a.documentElement : a, e = c && c.parentNode;
                            return a === e || !(!e || !(e.nodeType === 1 && (d.contains ? d.contains(e) : a.compareDocumentPosition && a.compareDocumentPosition(e) & 16)));
                        } : function(a, c) {
                            if (c) for (;c = c.parentNode; ) if (c === a) return !0;
                            return !1;
                        };
                        g[d] = [];
                        a(c, {
                            mouseleave: "mouseout",
                            mouseenter: "mouseover"
                        }[d], function(a) {
                            var c = a.relatedTarget;
                            (!c || c !== this && !j(this, c)) && i(a, d);
                        });
                    } else gc(c, d, i), g[d] = [];
                    h = g[d];
                }
                h.push(e);
            });
        },
        unbind: Ab,
        replaceWith: function(a, c) {
            var d, e = a.parentNode;
            ya(a);
            n(new R(c), function(c) {
                d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
                d = c;
            });
        },
        children: function(a) {
            var c = [];
            n(a.childNodes, function(a) {
                a.nodeType === 1 && c.push(a);
            });
            return c;
        },
        contents: function(a) {
            return a.childNodes || [];
        },
        append: function(a, c) {
            n(new R(c), function(c) {
                (a.nodeType === 1 || a.nodeType === 11) && a.appendChild(c);
            });
        },
        prepend: function(a, c) {
            if (a.nodeType === 1) {
                var d = a.firstChild;
                n(new R(c), function(c) {
                    d ? a.insertBefore(c, d) : (a.appendChild(c), d = c);
                });
            }
        },
        wrap: function(a, c) {
            var c = w(c)[0], d = a.parentNode;
            d && d.replaceChild(c, a);
            c.appendChild(a);
        },
        remove: function(a) {
            ya(a);
            var c = a.parentNode;
            c && c.removeChild(a);
        },
        after: function(a, c) {
            var d = a, e = a.parentNode;
            n(new R(c), function(a) {
                e.insertBefore(a, d.nextSibling);
                d = a;
            });
        },
        addClass: Db,
        removeClass: Cb,
        toggleClass: function(a, c, d) {
            C(d) && (d = !La(a, c));
            (d ? Db : Cb)(a, c);
        },
        parent: function(a) {
            return (a = a.parentNode) && a.nodeType !== 11 ? a : null;
        },
        next: function(a) {
            if (a.nextElementSibling) return a.nextElementSibling;
            for (a = a.nextSibling; a != null && a.nodeType !== 1; ) a = a.nextSibling;
            return a;
        },
        find: function(a, c) {
            return a.getElementsByTagName(c);
        },
        clone: fb,
        triggerHandler: function(a, c) {
            var d = (ca(a, "events") || {})[c];
            n(d, function(c) {
                c.call(a, {
                    preventDefault: q
                });
            });
        }
    }, function(a, c) {
        R.prototype[c] = function(c, e) {
            for (var g, i = 0; i < this.length; i++) g == p ? (g = a(this[i], c, e), g !== p && (g = w(g))) : eb(g, a(this[i], c, e));
            return g == p ? this : g;
        };
    });
    za.prototype = {
        put: function(a, c) {
            this[la(a)] = c;
        },
        get: function(a) {
            return this[la(a)];
        },
        remove: function(a) {
            var c = this[a = la(a)];
            delete this[a];
            return c;
        }
    };
    var zc = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, Ac = /,/, Bc = /^\s*(_?)(\S+?)\1\s*$/, yc = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    Ib.$inject = [ "$provide" ];
    var qd = function() {
        var a = "$ngAnimateController", c = {
            running: !0
        };
        this.$get = [ "$animation", "$window", "$sniffer", "$rootElement", "$rootScope", function(d, e, g, i) {
            i.data(a, c);
            i = function(c, i) {
                function j(j, k, o) {
                    return function(m, r, p) {
                        function x(a) {
                            var c = 0, a = E(a) ? a.split(/\s*,\s*/) : [];
                            n(a, function(a) {
                                c = Math.max(parseFloat(a) || 0, c);
                            });
                            return c;
                        }
                        function t() {
                            m.addClass(K);
                            if ($) $(m, v, P); else if (H(e.getComputedStyle)) {
                                var a = g.vendorPrefix + "Animation", c = g.vendorPrefix + "Transition", d = 0;
                                n(m, function(f) {
                                    if (f.nodeType == 1) {
                                        var g = "transition", i = c, j = 1, h = e.getComputedStyle(f) || {};
                                        if (parseFloat(h.animationDuration) > 0 || parseFloat(h[a + "Duration"]) > 0) g = "animation", 
                                        i = a, j = Math.max(parseInt(h[g + "IterationCount"]) || 0, parseInt(h[i + "IterationCount"]) || 0, j);
                                        f = Math.max(x(h[g + "Delay"]), x(h[i + "Delay"]));
                                        g = Math.max(x(h[g + "Duration"]), x(h[i + "Duration"]));
                                        d = Math.max(f + j * g, d);
                                    }
                                });
                                e.setTimeout(v, d * 1e3);
                            } else v();
                        }
                        function v() {
                            if (!v.run) v.run = !0, o(m, r, p), m.removeClass(w), m.removeClass(K), m.removeData(a);
                        }
                        var A = c.$eval(i.ngAnimate), w = A ? L(A) ? A[j] : A + "-" + j : "", D = d(w), A = D && D.setup, $ = D && D.start, D = D && D.cancel;
                        if (w) {
                            var K = w + "-active";
                            r || (r = p ? p.parent() : m.parent());
                            if (!g.transitions && !A && !$ || (r.inheritedData(a) || q).running) k(m, r, p), 
                            o(m, r, p); else {
                                var O = m.data(a) || {};
                                O.running && ((D || q)(m), O.done());
                                m.data(a, {
                                    running: !0,
                                    done: v
                                });
                                m.addClass(w);
                                k(m, r, p);
                                if (m.length == 0) return v();
                                var P = (A || q)(m);
                                e.setTimeout(t, 1);
                            }
                        } else k(m, r, p), o(m, r, p);
                    };
                }
                function m(a, c, d) {
                    d ? d.after(a) : c.append(a);
                }
                var k = {};
                k.enter = j("enter", m, q);
                k.leave = j("leave", q, function(a) {
                    a.remove();
                });
                k.move = j("move", function(a, c, d) {
                    m(a, c, d);
                }, q);
                k.show = j("show", function(a) {
                    a.css("display", "");
                }, q);
                k.hide = j("hide", q, function(a) {
                    a.css("display", "none");
                });
                k.animate = function(a, c) {
                    j(a, q, q)(c);
                };
                return k;
            };
            i.enabled = function(a) {
                if (arguments.length) c.running = !a;
                return !c.running;
            };
            return i;
        } ];
    }, Kb = "Non-assignable model expression: ";
    Jb.$inject = [ "$provide" ];
    var Ic = /^(x[\:\-_]|data[\:\-_])/i, jb = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/, Pb = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, Oa = {
        http: 80,
        https: 443,
        ftp: 21
    };
    Rb.prototype = lb.prototype = Qb.prototype = {
        $$replace: !1,
        absUrl: Pa("$$absUrl"),
        url: function(a, c) {
            if (C(a)) return this.$$url;
            var d = Pb.exec(a);
            d[1] && this.path(decodeURIComponent(d[1]));
            if (d[2] || d[1]) this.search(d[3] || "");
            this.hash(d[5] || "", c);
            return this;
        },
        protocol: Pa("$$protocol"),
        host: Pa("$$host"),
        port: Pa("$$port"),
        path: Sb("$$path", function(a) {
            return a.charAt(0) == "/" ? a : "/" + a;
        }),
        search: function(a, c) {
            if (C(a)) return this.$$search;
            B(c) ? c === null ? delete this.$$search[a] : this.$$search[a] = c : this.$$search = E(a) ? vb(a) : a;
            this.$$compose();
            return this;
        },
        hash: Sb("$$hash", qa),
        replace: function() {
            this.$$replace = !0;
            return this;
        }
    };
    var Da = {
        "null": function() {
            return null;
        },
        "true": function() {
            return !0;
        },
        "false": function() {
            return !1;
        },
        undefined: q,
        "+": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return B(d) ? B(e) ? d + e : d : B(e) ? e : p;
        },
        "-": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return (B(d) ? d : 0) - (B(e) ? e : 0);
        },
        "*": function(a, c, d, e) {
            return d(a, c) * e(a, c);
        },
        "/": function(a, c, d, e) {
            return d(a, c) / e(a, c);
        },
        "%": function(a, c, d, e) {
            return d(a, c) % e(a, c);
        },
        "^": function(a, c, d, e) {
            return d(a, c) ^ e(a, c);
        },
        "=": q,
        "===": function(a, c, d, e) {
            return d(a, c) === e(a, c);
        },
        "!==": function(a, c, d, e) {
            return d(a, c) !== e(a, c);
        },
        "==": function(a, c, d, e) {
            return d(a, c) == e(a, c);
        },
        "!=": function(a, c, d, e) {
            return d(a, c) != e(a, c);
        },
        "<": function(a, c, d, e) {
            return d(a, c) < e(a, c);
        },
        ">": function(a, c, d, e) {
            return d(a, c) > e(a, c);
        },
        "<=": function(a, c, d, e) {
            return d(a, c) <= e(a, c);
        },
        ">=": function(a, c, d, e) {
            return d(a, c) >= e(a, c);
        },
        "&&": function(a, c, d, e) {
            return d(a, c) && e(a, c);
        },
        "||": function(a, c, d, e) {
            return d(a, c) || e(a, c);
        },
        "&": function(a, c, d, e) {
            return d(a, c) & e(a, c);
        },
        "|": function(a, c, d, e) {
            return e(a, c)(a, c, d(a, c));
        },
        "!": function(a, c, d) {
            return !d(a, c);
        }
    }, Qc = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    }, mb = {}, ad = /^(([^:]+):)?\/\/(\w+:{0,1}\w*@)?([\w\.-]*)?(:([0-9]+))?(.*)$/, ed = M.XMLHttpRequest || function() {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (a) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        } catch (c) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (d) {}
        throw Error("This browser does not support XMLHttpRequest.");
    };
    Zb.$inject = [ "$provide" ];
    $b.$inject = [ "$locale" ];
    bc.$inject = [ "$locale" ];
    var ec = ".", od = {
        yyyy: Q("FullYear", 4),
        yy: Q("FullYear", 2, 0, !0),
        y: Q("FullYear", 1),
        MMMM: Qa("Month"),
        MMM: Qa("Month", !0),
        MM: Q("Month", 2, 1),
        M: Q("Month", 1, 1),
        dd: Q("Date", 2),
        d: Q("Date", 1),
        HH: Q("Hours", 2),
        H: Q("Hours", 1),
        hh: Q("Hours", 2, -12),
        h: Q("Hours", 1, -12),
        mm: Q("Minutes", 2),
        m: Q("Minutes", 1),
        ss: Q("Seconds", 2),
        s: Q("Seconds", 1),
        sss: Q("Milliseconds", 3),
        EEEE: Qa("Day"),
        EEE: Qa("Day", !0),
        a: function(a, c) {
            return a.getHours() < 12 ? c.AMPMS[0] : c.AMPMS[1];
        },
        Z: function(a) {
            var a = -1 * a.getTimezoneOffset(), c = a >= 0 ? "+" : "";
            c += nb(Math[a > 0 ? "floor" : "ceil"](a / 60), 2) + nb(Math.abs(a % 60), 2);
            return c;
        }
    }, nd = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, md = /^\d+$/;
    ac.$inject = [ "$locale" ];
    var kd = S(I), ld = S(oa);
    cc.$inject = [ "$parse" ];
    var rd = S({
        restrict: "E",
        compile: function(a, c) {
            Z <= 8 && (!c.href && !c.name && c.$set("href", ""), a.append(T.createComment("IE fix")));
            return function(a, c) {
                c.bind("click", function(a) {
                    c.attr("href") || a.preventDefault();
                });
            };
        }
    }), pb = {};
    n(Na, function(a, c) {
        var d = da("ng-" + c);
        pb[d] = function() {
            return {
                priority: 100,
                compile: function() {
                    return function(a, g, i) {
                        a.$watch(i[d], function(a) {
                            i.$set(c, !!a);
                        });
                    };
                }
            };
        };
    });
    n([ "src", "srcset", "href" ], function(a) {
        var c = da("ng-" + a);
        pb[c] = function() {
            return {
                priority: 99,
                link: function(d, e, g) {
                    g.$observe(c, function(c) {
                        c && (g.$set(a, c), Z && e.prop(a, g[a]));
                    });
                }
            };
        };
    });
    var Ta = {
        $addControl: q,
        $removeControl: q,
        $setValidity: q,
        $setDirty: q,
        $setPristine: q
    };
    fc.$inject = [ "$element", "$attrs", "$scope" ];
    var Wa = function(a) {
        return [ "$timeout", function(c) {
            var d = {
                name: "form",
                restrict: "E",
                controller: fc,
                compile: function() {
                    return {
                        pre: function(a, d, i, f) {
                            if (!i.action) {
                                var h = function(a) {
                                    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                                };
                                gc(d[0], "submit", h);
                                d.bind("$destroy", function() {
                                    c(function() {
                                        gb(d[0], "submit", h);
                                    }, 0, !1);
                                });
                            }
                            var j = d.parent().controller("form"), m = i.name || i.ngForm;
                            m && (a[m] = f);
                            j && d.bind("$destroy", function() {
                                j.$removeControl(f);
                                m && (a[m] = p);
                                t(f, Ta);
                            });
                        }
                    };
                }
            };
            return a ? t(V(d), {
                restrict: "EAC"
            }) : d;
        } ];
    }, sd = Wa(), td = Wa(!0), ud = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, vd = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, wd = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, hc = {
        text: Va,
        number: function(a, c, d, e, g, i) {
            Va(a, c, d, e, g, i);
            e.$parsers.push(function(a) {
                var c = X(a);
                return c || wd.test(a) ? (e.$setValidity("number", !0), a === "" ? null : c ? a : parseFloat(a)) : (e.$setValidity("number", !1), 
                p);
            });
            e.$formatters.push(function(a) {
                return X(a) ? "" : "" + a;
            });
            if (d.min) {
                var f = parseFloat(d.min), a = function(a) {
                    return !X(a) && a < f ? (e.$setValidity("min", !1), p) : (e.$setValidity("min", !0), 
                    a);
                };
                e.$parsers.push(a);
                e.$formatters.push(a);
            }
            if (d.max) {
                var h = parseFloat(d.max), d = function(a) {
                    return !X(a) && a > h ? (e.$setValidity("max", !1), p) : (e.$setValidity("max", !0), 
                    a);
                };
                e.$parsers.push(d);
                e.$formatters.push(d);
            }
            e.$formatters.push(function(a) {
                return X(a) || Ya(a) ? (e.$setValidity("number", !0), a) : (e.$setValidity("number", !1), 
                p);
            });
        },
        url: function(a, c, d, e, g, i) {
            Va(a, c, d, e, g, i);
            a = function(a) {
                return X(a) || ud.test(a) ? (e.$setValidity("url", !0), a) : (e.$setValidity("url", !1), 
                p);
            };
            e.$formatters.push(a);
            e.$parsers.push(a);
        },
        email: function(a, c, d, e, g, i) {
            Va(a, c, d, e, g, i);
            a = function(a) {
                return X(a) || vd.test(a) ? (e.$setValidity("email", !0), a) : (e.$setValidity("email", !1), 
                p);
            };
            e.$formatters.push(a);
            e.$parsers.push(a);
        },
        radio: function(a, c, d, e) {
            C(d.name) && c.attr("name", Fa());
            c.bind("click", function() {
                c[0].checked && a.$apply(function() {
                    e.$setViewValue(d.value);
                });
            });
            e.$render = function() {
                c[0].checked = d.value == e.$viewValue;
            };
            d.$observe("value", e.$render);
        },
        checkbox: function(a, c, d, e) {
            var g = d.ngTrueValue, i = d.ngFalseValue;
            E(g) || (g = !0);
            E(i) || (i = !1);
            c.bind("click", function() {
                a.$apply(function() {
                    e.$setViewValue(c[0].checked);
                });
            });
            e.$render = function() {
                c[0].checked = e.$viewValue;
            };
            e.$formatters.push(function(a) {
                return a === g;
            });
            e.$parsers.push(function(a) {
                return a ? g : i;
            });
        },
        hidden: q,
        button: q,
        submit: q,
        reset: q
    }, ic = [ "$browser", "$sniffer", function(a, c) {
        return {
            restrict: "E",
            require: "?ngModel",
            link: function(d, e, g, i) {
                i && (hc[I(g.type)] || hc.text)(d, e, g, i, c, a);
            }
        };
    } ], Sa = "ng-valid", Ra = "ng-invalid", pa = "ng-pristine", Ua = "ng-dirty", xd = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", function(a, c, d, e, g) {
        function i(a, c) {
            c = c ? "-" + bb(c, "-") : "";
            e.removeClass((a ? Ra : Sa) + c).addClass((a ? Sa : Ra) + c);
        }
        this.$modelValue = this.$viewValue = Number.NaN;
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$pristine = !0;
        this.$dirty = !1;
        this.$valid = !0;
        this.$invalid = !1;
        this.$name = d.name;
        var f = g(d.ngModel), h = f.assign;
        if (!h) throw Error(Kb + d.ngModel + " (" + va(e) + ")");
        this.$render = q;
        var j = e.inheritedData("$formController") || Ta, m = 0, k = this.$error = {};
        e.addClass(pa);
        i(!0);
        this.$setValidity = function(a, c) {
            if (k[a] !== !c) {
                if (c) {
                    if (k[a] && m--, !m) i(!0), this.$valid = !0, this.$invalid = !1;
                } else i(!1), this.$invalid = !0, this.$valid = !1, m++;
                k[a] = !c;
                i(c, a);
                j.$setValidity(a, c, this);
            }
        };
        this.$setPristine = function() {
            this.$dirty = !1;
            this.$pristine = !0;
            e.removeClass(Ua).addClass(pa);
        };
        this.$setViewValue = function(d) {
            this.$viewValue = d;
            if (this.$pristine) this.$dirty = !0, this.$pristine = !1, e.removeClass(pa).addClass(Ua), 
            j.$setDirty();
            n(this.$parsers, function(a) {
                d = a(d);
            });
            if (this.$modelValue !== d) this.$modelValue = d, h(a, d), n(this.$viewChangeListeners, function(a) {
                try {
                    a();
                } catch (d) {
                    c(d);
                }
            });
        };
        var l = this;
        a.$watch(function() {
            var c = f(a);
            if (l.$modelValue !== c) {
                var d = l.$formatters, e = d.length;
                for (l.$modelValue = c; e--; ) c = d[e](c);
                if (l.$viewValue !== c) l.$viewValue = c, l.$render();
            }
        });
    } ], yd = function() {
        return {
            require: [ "ngModel", "^?form" ],
            controller: xd,
            link: function(a, c, d, e) {
                var g = e[0], i = e[1] || Ta;
                i.$addControl(g);
                c.bind("$destroy", function() {
                    i.$removeControl(g);
                });
            }
        };
    }, zd = S({
        require: "ngModel",
        link: function(a, c, d, e) {
            e.$viewChangeListeners.push(function() {
                a.$eval(d.ngChange);
            });
        }
    }), jc = function() {
        return {
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    d.required = !0;
                    var g = function(a) {
                        if (d.required && (X(a) || a === !1)) e.$setValidity("required", !1); else return e.$setValidity("required", !0), 
                        a;
                    };
                    e.$formatters.push(g);
                    e.$parsers.unshift(g);
                    d.$observe("required", function() {
                        g(e.$viewValue);
                    });
                }
            }
        };
    }, Ad = function() {
        return {
            require: "ngModel",
            link: function(a, c, d, e) {
                var g = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ",";
                e.$parsers.push(function(a) {
                    var c = [];
                    a && n(a.split(g), function(a) {
                        a && c.push(U(a));
                    });
                    return c;
                });
                e.$formatters.push(function(a) {
                    return F(a) ? a.join(", ") : p;
                });
            }
        };
    }, Bd = /^(true|false|\d+)$/, Cd = function() {
        return {
            priority: 100,
            compile: function(a, c) {
                return Bd.test(c.ngValue) ? function(a, c, g) {
                    g.$set("value", a.$eval(g.ngValue));
                } : function(a, c, g) {
                    a.$watch(g.ngValue, function(a) {
                        g.$set("value", a, !1);
                    });
                };
            }
        };
    }, Dd = aa(function(a, c, d) {
        c.addClass("ng-binding").data("$binding", d.ngBind);
        a.$watch(d.ngBind, function(a) {
            c.text(a == p ? "" : a);
        });
    }), Ed = [ "$interpolate", function(a) {
        return function(c, d, e) {
            c = a(d.attr(e.$attr.ngBindTemplate));
            d.addClass("ng-binding").data("$binding", c);
            e.$observe("ngBindTemplate", function(a) {
                d.text(a);
            });
        };
    } ], Fd = [ function() {
        return function(a, c, d) {
            c.addClass("ng-binding").data("$binding", d.ngBindHtmlUnsafe);
            a.$watch(d.ngBindHtmlUnsafe, function(a) {
                c.html(a || "");
            });
        };
    } ], Gd = ob("", !0), Hd = ob("Odd", 0), Id = ob("Even", 1), Jd = aa({
        compile: function(a, c) {
            c.$set("ngCloak", p);
            a.removeClass("ng-cloak");
        }
    }), Kd = [ function() {
        return {
            scope: !0,
            controller: "@"
        };
    } ], Ld = [ "$sniffer", function(a) {
        return {
            priority: 1e3,
            compile: function() {
                a.csp = !0;
            }
        };
    } ], kc = {};
    n("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress".split(" "), function(a) {
        var c = da("ng-" + a);
        kc[c] = [ "$parse", function(d) {
            return function(e, g, i) {
                var f = d(i[c]);
                g.bind(I(a), function(a) {
                    e.$apply(function() {
                        f(e, {
                            $event: a
                        });
                    });
                });
            };
        } ];
    });
    var Md = aa(function(a, c, d) {
        c.bind("submit", function() {
            a.$apply(d.ngSubmit);
        });
    }), Nd = [ "$animator", function(a) {
        return {
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            restrict: "A",
            compile: function(c, d, e) {
                return function(c, d, f) {
                    var h = a(c, f), j, m;
                    c.$watch(f.ngIf, function(a) {
                        j && (h.leave(j), j = p);
                        m && (m.$destroy(), m = p);
                        ua(a) && (m = c.$new(), e(m, function(a) {
                            j = a;
                            h.enter(a, d.parent(), d);
                        }));
                    });
                };
            }
        };
    } ], Od = [ "$http", "$templateCache", "$anchorScroll", "$compile", "$animator", function(a, c, d, e, g) {
        return {
            restrict: "ECA",
            terminal: !0,
            compile: function(i, f) {
                var h = f.ngInclude || f.src, j = f.onload || "", m = f.autoscroll;
                return function(f, i, n) {
                    var o = g(f, n), p = 0, r, t = function() {
                        r && (r.$destroy(), r = null);
                        o.leave(i.contents(), i);
                    };
                    f.$watch(h, function(g) {
                        var h = ++p;
                        g ? (a.get(g, {
                            cache: c
                        }).success(function(a) {
                            h === p && (r && r.$destroy(), r = f.$new(), o.leave(i.contents(), i), a = w("<div/>").html(a).contents(), 
                            o.enter(a, i), e(a)(r), B(m) && (!m || f.$eval(m)) && d(), r.$emit("$includeContentLoaded"), 
                            f.$eval(j));
                        }).error(function() {
                            h === p && t();
                        }), f.$emit("$includeContentRequested")) : t();
                    });
                };
            }
        };
    } ], Pd = aa({
        compile: function() {
            return {
                pre: function(a, c, d) {
                    a.$eval(d.ngInit);
                }
            };
        }
    }), Qd = aa({
        terminal: !0,
        priority: 1e3
    }), Rd = [ "$locale", "$interpolate", function(a, c) {
        var d = /{}/g;
        return {
            restrict: "EA",
            link: function(e, g, i) {
                var f = i.count, h = g.attr(i.$attr.when), j = i.offset || 0, m = e.$eval(h), k = {}, l = c.startSymbol(), p = c.endSymbol();
                n(m, function(a, e) {
                    k[e] = c(a.replace(d, l + f + "-" + j + p));
                });
                e.$watch(function() {
                    var c = parseFloat(e.$eval(f));
                    return isNaN(c) ? "" : (c in m || (c = a.pluralCat(c - j)), k[c](e, g, !0));
                }, function(a) {
                    g.text(a);
                });
            }
        };
    } ], Sd = [ "$parse", "$animator", function(a, c) {
        return {
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            compile: function(d, e, g) {
                return function(d, e, h) {
                    var j = c(d, h), m = h.ngRepeat, k = m.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/), l, p, o, z, r, t = {
                        $id: la
                    };
                    if (!k) throw Error("Expected ngRepeat in form of '_item_ in _collection_[ track by _id_]' but got '" + m + "'.");
                    h = k[1];
                    o = k[2];
                    (k = k[4]) ? (l = a(k), p = function(a, c, e) {
                        r && (t[r] = a);
                        t[z] = c;
                        t.$index = e;
                        return l(d, t);
                    }) : p = function(a, c) {
                        return la(c);
                    };
                    k = h.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                    if (!k) throw Error("'item' in 'item in collection' should be identifier or (key, value) but got '" + h + "'.");
                    z = k[3] || k[1];
                    r = k[2];
                    var x = {};
                    d.$watchCollection(o, function(a) {
                        var c, h, k = e, l, o = {}, t, q, w, s, B, y, C = [];
                        if (Xa(a)) B = a; else {
                            B = [];
                            for (w in a) a.hasOwnProperty(w) && w.charAt(0) != "$" && B.push(w);
                            B.sort();
                        }
                        t = B.length;
                        h = C.length = B.length;
                        for (c = 0; c < h; c++) if (w = a === B ? c : B[c], s = a[w], l = p(w, s, c), x.hasOwnProperty(l)) y = x[l], 
                        delete x[l], o[l] = y, C[c] = y; else if (o.hasOwnProperty(l)) throw n(C, function(a) {
                            a && a.element && (x[a.id] = a);
                        }), Error("Duplicates in a repeater are not allowed. Repeater: " + m + " key: " + l); else C[c] = {
                            id: l
                        }, o[l] = !1;
                        for (w in x) if (x.hasOwnProperty(w)) y = x[w], j.leave(y.element), y.element[0].$$NG_REMOVED = !0, 
                        y.scope.$destroy();
                        c = 0;
                        for (h = B.length; c < h; c++) {
                            w = a === B ? c : B[c];
                            s = a[w];
                            y = C[c];
                            if (y.element) {
                                q = y.scope;
                                l = k[0];
                                do l = l.nextSibling; while (l && l.$$NG_REMOVED);
                                y.element[0] != l && j.move(y.element, null, k);
                                k = y.element;
                            } else q = d.$new();
                            q[z] = s;
                            r && (q[r] = w);
                            q.$index = c;
                            q.$first = c === 0;
                            q.$last = c === t - 1;
                            q.$middle = !(q.$first || q.$last);
                            y.element || g(q, function(a) {
                                j.enter(a, null, k);
                                k = a;
                                y.scope = q;
                                y.element = a;
                                o[y.id] = y;
                            });
                        }
                        x = o;
                    });
                };
            }
        };
    } ], Td = [ "$animator", function(a) {
        return function(c, d, e) {
            var g = a(c, e);
            c.$watch(e.ngShow, function(a) {
                g[ua(a) ? "show" : "hide"](d);
            });
        };
    } ], Ud = [ "$animator", function(a) {
        return function(c, d, e) {
            var g = a(c, e);
            c.$watch(e.ngHide, function(a) {
                g[ua(a) ? "hide" : "show"](d);
            });
        };
    } ], Vd = aa(function(a, c, d) {
        a.$watch(d.ngStyle, function(a, d) {
            d && a !== d && n(d, function(a, d) {
                c.css(d, "");
            });
            a && c.css(a);
        }, !0);
    }), Wd = [ "$animator", function(a) {
        return {
            restrict: "EA",
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(c, d, e, g) {
                var i = a(c, e), f, h, j = [];
                c.$watch(e.ngSwitch || e.on, function(a) {
                    for (var d = 0, l = j.length; d < l; d++) j[d].$destroy(), i.leave(h[d]);
                    h = [];
                    j = [];
                    if (f = g.cases["!" + a] || g.cases["?"]) c.$eval(e.change), n(f, function(a) {
                        var d = c.$new();
                        j.push(d);
                        a.transclude(d, function(c) {
                            var d = a.element;
                            h.push(c);
                            i.enter(c, d.parent(), d);
                        });
                    });
                });
            }
        };
    } ], Xd = aa({
        transclude: "element",
        priority: 500,
        require: "^ngSwitch",
        compile: function(a, c, d) {
            return function(a, g, i, f) {
                f.cases["!" + c.ngSwitchWhen] = f.cases["!" + c.ngSwitchWhen] || [];
                f.cases["!" + c.ngSwitchWhen].push({
                    transclude: d,
                    element: g
                });
            };
        }
    }), Yd = aa({
        transclude: "element",
        priority: 500,
        require: "^ngSwitch",
        compile: function(a, c, d) {
            return function(a, c, i, f) {
                f.cases["?"] = f.cases["?"] || [];
                f.cases["?"].push({
                    transclude: d,
                    element: c
                });
            };
        }
    }), Zd = aa({
        controller: [ "$transclude", "$element", function(a, c) {
            a(function(a) {
                c.append(a);
            });
        } ]
    }), $d = [ "$http", "$templateCache", "$route", "$anchorScroll", "$compile", "$controller", "$animator", function(a, c, d, e, g, i, f) {
        return {
            restrict: "ECA",
            terminal: !0,
            link: function(a, c, m) {
                function k() {
                    var f = d.current && d.current.locals, k = f && f.$template;
                    if (k) {
                        o.leave(c.contents(), c);
                        l && (l.$destroy(), l = null);
                        k = w("<div></div>").html(k).contents();
                        o.enter(k, c);
                        var k = g(k), m = d.current;
                        l = m.scope = a.$new();
                        if (m.controller) f.$scope = l, f = i(m.controller, f), m.controllerAs && (l[m.controllerAs] = f), 
                        c.children().data("$ngControllerController", f);
                        k(l);
                        l.$emit("$viewContentLoaded");
                        l.$eval(n);
                        e();
                    } else o.leave(c.contents(), c), l && (l.$destroy(), l = null);
                }
                var l, n = m.onload || "", o = f(a, m);
                a.$on("$routeChangeSuccess", k);
                k();
            }
        };
    } ], ae = [ "$templateCache", function(a) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(c, d) {
                d.type == "text/ng-template" && a.put(d.id, c[0].text);
            }
        };
    } ], be = S({
        terminal: !0
    }), ce = [ "$compile", "$parse", function(a, c) {
        var d = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/, e = {
            $setViewValue: q
        };
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: [ "$element", "$scope", "$attrs", function(a, c, d) {
                var h = this, j = {}, m = e, k;
                h.databound = d.ngModel;
                h.init = function(a, c, d) {
                    m = a;
                    k = d;
                };
                h.addOption = function(c) {
                    j[c] = !0;
                    m.$viewValue == c && (a.val(c), k.parent() && k.remove());
                };
                h.removeOption = function(a) {
                    this.hasOption(a) && (delete j[a], m.$viewValue == a && this.renderUnknownOption(a));
                };
                h.renderUnknownOption = function(c) {
                    c = "? " + la(c) + " ?";
                    k.val(c);
                    a.prepend(k);
                    a.val(c);
                    k.prop("selected", !0);
                };
                h.hasOption = function(a) {
                    return j.hasOwnProperty(a);
                };
                c.$on("$destroy", function() {
                    h.renderUnknownOption = q;
                });
            } ],
            link: function(e, i, f, h) {
                function j(a, c, d, e) {
                    d.$render = function() {
                        var a = d.$viewValue;
                        e.hasOption(a) ? (v.parent() && v.remove(), c.val(a), a === "" && t.prop("selected", !0)) : C(a) && t ? c.val("") : e.renderUnknownOption(a);
                    };
                    c.bind("change", function() {
                        a.$apply(function() {
                            v.parent() && v.remove();
                            d.$setViewValue(c.val());
                        });
                    });
                }
                function m(a, c, d) {
                    var e;
                    d.$render = function() {
                        var a = new za(d.$viewValue);
                        n(c.find("option"), function(c) {
                            c.selected = B(a.get(c.value));
                        });
                    };
                    a.$watch(function() {
                        ia(e, d.$viewValue) || (e = V(d.$viewValue), d.$render());
                    });
                    c.bind("change", function() {
                        a.$apply(function() {
                            var a = [];
                            n(c.find("option"), function(c) {
                                c.selected && a.push(c.value);
                            });
                            d.$setViewValue(a);
                        });
                    });
                }
                function k(e, f, g) {
                    function i() {
                        var a = {
                            "": []
                        }, c = [ "" ], d, h, q, v, s;
                        q = g.$modelValue;
                        v = u(e) || [];
                        var z = l ? qb(v) : v, B, y, A;
                        y = {};
                        s = !1;
                        var C, D;
                        if (o) if (t && F(q)) {
                            s = new za([]);
                            for (h = 0; h < q.length; h++) y[k] = q[h], s.put(t(e, y), q[h]);
                        } else s = new za(q);
                        for (A = 0; B = z.length, A < B; A++) {
                            y[k] = v[l ? y[l] = z[A] : A];
                            d = m(e, y) || "";
                            if (!(h = a[d])) h = a[d] = [], c.push(d);
                            o ? d = s.remove(t ? t(e, y) : n(e, y)) != p : (t ? (d = {}, d[k] = q, d = t(e, d) === t(e, y)) : d = q === n(e, y), 
                            s = s || d);
                            C = j(e, y);
                            C = C === p ? "" : C;
                            h.push({
                                id: t ? t(e, y) : l ? z[A] : A,
                                label: C,
                                selected: d
                            });
                        }
                        o || (r || q === null ? a[""].unshift({
                            id: "",
                            label: "",
                            selected: !s
                        }) : s || a[""].unshift({
                            id: "?",
                            label: "",
                            selected: !0
                        }));
                        y = 0;
                        for (z = c.length; y < z; y++) {
                            d = c[y];
                            h = a[d];
                            if (w.length <= y) q = {
                                element: E.clone().attr("label", d),
                                label: h.label
                            }, v = [ q ], w.push(v), f.append(q.element); else if (v = w[y], q = v[0], q.label != d) q.element.attr("label", q.label = d);
                            C = null;
                            A = 0;
                            for (B = h.length; A < B; A++) if (d = h[A], s = v[A + 1]) {
                                C = s.element;
                                if (s.label !== d.label) C.text(s.label = d.label);
                                if (s.id !== d.id) C.val(s.id = d.id);
                                if (C[0].selected !== d.selected) C.prop("selected", s.selected = d.selected);
                            } else d.id === "" && r ? D = r : (D = x.clone()).val(d.id).attr("selected", d.selected).text(d.label), 
                            v.push({
                                element: D,
                                label: d.label,
                                id: d.id,
                                selected: d.selected
                            }), C ? C.after(D) : q.element.append(D), C = D;
                            for (A++; v.length > A; ) v.pop().element.remove();
                        }
                        for (;w.length > y; ) w.pop()[0].element.remove();
                    }
                    var h;
                    if (!(h = q.match(d))) throw Error("Expected ngOptions in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_ (track by _expr_)?' but got '" + q + "'.");
                    var j = c(h[2] || h[1]), k = h[4] || h[6], l = h[5], m = c(h[3] || ""), n = c(h[2] ? h[1] : k), u = c(h[7]), t = h[8] ? c(h[8]) : null, w = [ [ {
                        element: f,
                        label: ""
                    } ] ];
                    r && (a(r)(e), r.removeClass("ng-scope"), r.remove());
                    f.html("");
                    f.bind("change", function() {
                        e.$apply(function() {
                            var a, c = u(e) || [], d = {}, h, i, j, m, q, r;
                            if (o) {
                                i = [];
                                m = 0;
                                for (r = w.length; m < r; m++) {
                                    a = w[m];
                                    j = 1;
                                    for (q = a.length; j < q; j++) if ((h = a[j].element)[0].selected) {
                                        h = h.val();
                                        l && (d[l] = h);
                                        if (t) for (var s = 0; s < c.length; s++) {
                                            if (d[k] = c[s], t(e, d) == h) break;
                                        } else d[k] = c[h];
                                        i.push(n(e, d));
                                    }
                                }
                            } else if (h = f.val(), h == "?") i = p; else if (h == "") i = null; else if (t) for (s = 0; s < c.length; s++) {
                                if (d[k] = c[s], t(e, d) == h) {
                                    i = n(e, d);
                                    break;
                                }
                            } else d[k] = c[h], l && (d[l] = h), i = n(e, d);
                            g.$setViewValue(i);
                        });
                    });
                    g.$render = i;
                    e.$watch(i);
                }
                if (h[1]) {
                    for (var l = h[0], u = h[1], o = f.multiple, q = f.ngOptions, r = !1, t, x = w(T.createElement("option")), E = w(T.createElement("optgroup")), v = x.clone(), h = 0, A = i.children(), G = A.length; h < G; h++) if (A[h].value == "") {
                        t = r = A.eq(h);
                        break;
                    }
                    l.init(u, r, v);
                    if (o && (f.required || f.ngRequired)) {
                        var D = function(a) {
                            u.$setValidity("required", !f.required || a && a.length);
                            return a;
                        };
                        u.$parsers.push(D);
                        u.$formatters.unshift(D);
                        f.$observe("required", function() {
                            D(u.$viewValue);
                        });
                    }
                    q ? k(e, i, u) : o ? m(e, i, u) : j(e, i, u, l);
                }
            }
        };
    } ], de = [ "$interpolate", function(a) {
        var c = {
            addOption: q,
            removeOption: q
        };
        return {
            restrict: "E",
            priority: 100,
            compile: function(d, e) {
                if (C(e.value)) {
                    var g = a(d.text(), !0);
                    g || e.$set("value", d.text());
                }
                return function(a, d, e) {
                    var j = d.parent(), m = j.data("$selectController") || j.parent().data("$selectController");
                    m && m.databound ? d.prop("selected", !1) : m = c;
                    g ? a.$watch(g, function(a, c) {
                        e.$set("value", a);
                        a !== c && m.removeOption(c);
                        m.addOption(a);
                    }) : m.addOption(e.value);
                    d.bind("$destroy", function() {
                        m.removeOption(e.value);
                    });
                };
            }
        };
    } ], ee = S({
        restrict: "E",
        terminal: !0
    });
    (ga = M.jQuery) ? (w = ga, t(ga.fn, {
        scope: Ba.scope,
        controller: Ba.controller,
        injector: Ba.injector,
        inheritedData: Ba.inheritedData
    }), db("remove", !0), db("empty"), db("html")) : w = R;
    Ha.element = w;
    (function(a) {
        t(a, {
            bootstrap: xb,
            copy: V,
            extend: t,
            equals: ia,
            element: w,
            forEach: n,
            injector: yb,
            noop: q,
            bind: $a,
            toJson: ha,
            fromJson: ub,
            identity: qa,
            isUndefined: C,
            isDefined: B,
            isString: E,
            isFunction: H,
            isObject: L,
            isNumber: Ya,
            isElement: oc,
            isArray: F,
            version: pd,
            isDate: ra,
            lowercase: I,
            uppercase: oa,
            callbacks: {
                counter: 0
            },
            noConflict: lc
        });
        Aa = tc(M);
        try {
            Aa("ngLocale");
        } catch (c) {
            Aa("ngLocale", []).provider("$locale", fd);
        }
        Aa("ng", [ "ngLocale" ], [ "$provide", function(a) {
            a.provider("$compile", Jb).directive({
                a: rd,
                input: ic,
                textarea: ic,
                form: sd,
                script: ae,
                select: ce,
                style: ee,
                option: de,
                ngBind: Dd,
                ngBindHtmlUnsafe: Fd,
                ngBindTemplate: Ed,
                ngClass: Gd,
                ngClassEven: Id,
                ngClassOdd: Hd,
                ngCsp: Ld,
                ngCloak: Jd,
                ngController: Kd,
                ngForm: td,
                ngHide: Ud,
                ngIf: Nd,
                ngInclude: Od,
                ngInit: Pd,
                ngNonBindable: Qd,
                ngPluralize: Rd,
                ngRepeat: Sd,
                ngShow: Td,
                ngSubmit: Md,
                ngStyle: Vd,
                ngSwitch: Wd,
                ngSwitchWhen: Xd,
                ngSwitchDefault: Yd,
                ngOptions: be,
                ngView: $d,
                ngTransclude: Zd,
                ngModel: yd,
                ngList: Ad,
                ngChange: zd,
                required: jc,
                ngRequired: jc,
                ngValue: Cd
            }).directive(pb).directive(kc);
            a.provider({
                $anchorScroll: Cc,
                $animation: Ib,
                $animator: qd,
                $browser: Ec,
                $cacheFactory: Fc,
                $controller: Jc,
                $document: Kc,
                $exceptionHandler: Lc,
                $filter: Zb,
                $interpolate: Mc,
                $http: bd,
                $httpBackend: cd,
                $location: Nc,
                $log: Oc,
                $parse: Sc,
                $route: Vc,
                $routeParams: Wc,
                $rootScope: Xc,
                $q: Tc,
                $sniffer: Yc,
                $templateCache: Gc,
                $timeout: gd,
                $window: Zc
            });
        } ]);
    })(Ha);
    w(T).ready(function() {
        rc(T, xb);
    });
})(window, document);

angular.element(document).find("head").append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none;}ng\\:form{display:block;}</style>');

angular.module("ui.bootstrap", [ "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dialog", "ui.bootstrap.dropdownToggle", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.position", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.typeahead" ]);

angular.module("ui.bootstrap.transition", []).factory("$transition", [ "$q", "$timeout", "$rootScope", function($q, $timeout, $rootScope) {
    var $transition = function(element, trigger, options) {
        options = options || {};
        var deferred = $q.defer();
        var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];
        var transitionEndHandler = function(event) {
            $rootScope.$apply(function() {
                element.unbind(endEventName, transitionEndHandler);
                deferred.resolve(element);
            });
        };
        if (endEventName) {
            element.bind(endEventName, transitionEndHandler);
        }
        $timeout(function() {
            if (angular.isString(trigger)) {
                element.addClass(trigger);
            } else if (angular.isFunction(trigger)) {
                trigger(element);
            } else if (angular.isObject(trigger)) {
                element.css(trigger);
            }
            if (!endEventName) {
                deferred.resolve(element);
            }
        });
        deferred.promise.cancel = function() {
            if (endEventName) {
                element.unbind(endEventName, transitionEndHandler);
            }
            deferred.reject("Transition cancelled");
        };
        return deferred.promise;
    };
    var transElement = document.createElement("trans");
    var transitionEndEventNames = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        transition: "transitionend"
    };
    var animationEndEventNames = {
        WebkitTransition: "webkitAnimationEnd",
        MozTransition: "animationend",
        OTransition: "oAnimationEnd",
        transition: "animationend"
    };
    function findEndEventName(endEventNames) {
        for (var name in endEventNames) {
            if (transElement.style[name] !== undefined) {
                return endEventNames[name];
            }
        }
    }
    $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
    $transition.animationEndEventName = findEndEventName(animationEndEventNames);
    return $transition;
} ]);

angular.module("ui.bootstrap.collapse", [ "ui.bootstrap.transition" ]).directive("collapse", [ "$transition", function($transition) {
    var fixUpHeight = function(scope, element, height) {
        element.removeClass("collapse");
        element.css({
            height: height
        });
        var x = element[0].offsetWidth;
        element.addClass("collapse");
    };
    return {
        link: function(scope, element, attrs) {
            var isCollapsed;
            var initialAnimSkip = true;
            scope.$watch(function() {
                return element[0].scrollHeight;
            }, function(value) {
                if (element[0].scrollHeight !== 0) {
                    if (!isCollapsed) {
                        if (initialAnimSkip) {
                            fixUpHeight(scope, element, element[0].scrollHeight + "px");
                        } else {
                            fixUpHeight(scope, element, "auto");
                        }
                    }
                }
            });
            scope.$watch(attrs.collapse, function(value) {
                if (value) {
                    collapse();
                } else {
                    expand();
                }
            });
            var currentTransition;
            var doTransition = function(change) {
                if (currentTransition) {
                    currentTransition.cancel();
                }
                currentTransition = $transition(element, change);
                currentTransition.then(function() {
                    currentTransition = undefined;
                }, function() {
                    currentTransition = undefined;
                });
                return currentTransition;
            };
            var expand = function() {
                if (initialAnimSkip) {
                    initialAnimSkip = false;
                    if (!isCollapsed) {
                        fixUpHeight(scope, element, "auto");
                    }
                } else {
                    doTransition({
                        height: element[0].scrollHeight + "px"
                    }).then(function() {
                        if (!isCollapsed) {
                            fixUpHeight(scope, element, "auto");
                        }
                    });
                }
                isCollapsed = false;
            };
            var collapse = function() {
                isCollapsed = true;
                if (initialAnimSkip) {
                    initialAnimSkip = false;
                    fixUpHeight(scope, element, 0);
                } else {
                    fixUpHeight(scope, element, element[0].scrollHeight + "px");
                    doTransition({
                        height: "0"
                    });
                }
            };
        }
    };
} ]);

angular.module("ui.bootstrap.accordion", [ "ui.bootstrap.collapse" ]).constant("accordionConfig", {
    closeOthers: true
}).controller("AccordionController", [ "$scope", "$attrs", "accordionConfig", function($scope, $attrs, accordionConfig) {
    this.groups = [];
    this.closeOthers = function(openGroup) {
        var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
        if (closeOthers) {
            angular.forEach(this.groups, function(group) {
                if (group !== openGroup) {
                    group.isOpen = false;
                }
            });
        }
    };
    this.addGroup = function(groupScope) {
        var that = this;
        this.groups.push(groupScope);
        groupScope.$on("$destroy", function(event) {
            that.removeGroup(groupScope);
        });
    };
    this.removeGroup = function(group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(this.groups.indexOf(group), 1);
        }
    };
} ]).directive("accordion", function() {
    return {
        restrict: "EA",
        controller: "AccordionController",
        transclude: true,
        replace: false,
        templateUrl: "template/accordion/accordion.html"
    };
}).directive("accordionGroup", [ "$parse", "$transition", "$timeout", function($parse, $transition, $timeout) {
    return {
        require: "^accordion",
        restrict: "EA",
        transclude: true,
        replace: true,
        templateUrl: "template/accordion/accordion-group.html",
        scope: {
            heading: "@"
        },
        controller: [ "$scope", function($scope) {
            this.setHeading = function(element) {
                this.heading = element;
            };
        } ],
        link: function(scope, element, attrs, accordionCtrl) {
            var getIsOpen, setIsOpen;
            accordionCtrl.addGroup(scope);
            scope.isOpen = false;
            if (attrs.isOpen) {
                getIsOpen = $parse(attrs.isOpen);
                setIsOpen = getIsOpen.assign;
                scope.$watch(function watchIsOpen() {
                    return getIsOpen(scope.$parent);
                }, function updateOpen(value) {
                    scope.isOpen = value;
                });
                scope.isOpen = getIsOpen ? getIsOpen(scope.$parent) : false;
            }
            scope.$watch("isOpen", function(value) {
                if (value) {
                    accordionCtrl.closeOthers(scope);
                }
                if (setIsOpen) {
                    setIsOpen(scope.$parent, value);
                }
            });
        }
    };
} ]).directive("accordionHeading", function() {
    return {
        restrict: "E",
        transclude: true,
        template: "",
        replace: true,
        require: "^accordionGroup",
        compile: function(element, attr, transclude) {
            return function link(scope, element, attr, accordionGroupCtrl) {
                accordionGroupCtrl.setHeading(transclude(scope, function() {}));
            };
        }
    };
}).directive("accordionTransclude", function() {
    return {
        require: "^accordionGroup",
        link: function(scope, element, attr, controller) {
            scope.$watch(function() {
                return controller[attr.accordionTransclude];
            }, function(heading) {
                if (heading) {
                    element.html("");
                    element.append(heading);
                }
            });
        }
    };
});

angular.module("ui.bootstrap.alert", []).directive("alert", function() {
    return {
        restrict: "EA",
        templateUrl: "template/alert/alert.html",
        transclude: true,
        replace: true,
        scope: {
            type: "=",
            close: "&"
        },
        link: function(scope, iElement, iAttrs, controller) {
            scope.closeable = "close" in iAttrs;
        }
    };
});

angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
    activeClass: "active",
    toggleEvent: "click"
}).directive("btnRadio", [ "buttonConfig", function(buttonConfig) {
    var activeClass = buttonConfig.activeClass || "active";
    var toggleEvent = buttonConfig.toggleEvent || "click";
    return {
        require: "ngModel",
        link: function(scope, element, attrs, ngModelCtrl) {
            var value = scope.$eval(attrs.btnRadio);
            scope.$watch(function() {
                return ngModelCtrl.$modelValue;
            }, function(modelValue) {
                if (angular.equals(modelValue, value)) {
                    element.addClass(activeClass);
                } else {
                    element.removeClass(activeClass);
                }
            });
            element.bind(toggleEvent, function() {
                if (!element.hasClass(activeClass)) {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(value);
                    });
                }
            });
        }
    };
} ]).directive("btnCheckbox", [ "buttonConfig", function(buttonConfig) {
    var activeClass = buttonConfig.activeClass || "active";
    var toggleEvent = buttonConfig.toggleEvent || "click";
    return {
        require: "ngModel",
        link: function(scope, element, attrs, ngModelCtrl) {
            var trueValue = scope.$eval(attrs.btnCheckboxTrue);
            var falseValue = scope.$eval(attrs.btnCheckboxFalse);
            trueValue = angular.isDefined(trueValue) ? trueValue : true;
            falseValue = angular.isDefined(falseValue) ? falseValue : false;
            scope.$watch(function() {
                return ngModelCtrl.$modelValue;
            }, function(modelValue) {
                if (angular.equals(modelValue, trueValue)) {
                    element.addClass(activeClass);
                } else {
                    element.removeClass(activeClass);
                }
            });
            element.bind(toggleEvent, function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(element.hasClass(activeClass) ? falseValue : trueValue);
                });
            });
        }
    };
} ]);

angular.module("ui.bootstrap.carousel", [ "ui.bootstrap.transition" ]).controller("CarouselController", [ "$scope", "$timeout", "$transition", "$q", function($scope, $timeout, $transition, $q) {
    var self = this, slides = self.slides = [], currentIndex = -1, currentTimeout, isPlaying;
    self.currentSlide = null;
    self.select = function(nextSlide, direction) {
        var nextIndex = slides.indexOf(nextSlide);
        if (direction === undefined) {
            direction = nextIndex > currentIndex ? "next" : "prev";
        }
        if (nextSlide && nextSlide !== self.currentSlide) {
            if ($scope.$currentTransition) {
                $scope.$currentTransition.cancel();
                $timeout(goNext);
            } else {
                goNext();
            }
        }
        function goNext() {
            if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
                nextSlide.$element.addClass(direction);
                nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth;
                angular.forEach(slides, function(slide) {
                    angular.extend(slide, {
                        direction: "",
                        entering: false,
                        leaving: false,
                        active: false
                    });
                });
                angular.extend(nextSlide, {
                    direction: direction,
                    active: true,
                    entering: true
                });
                angular.extend(self.currentSlide || {}, {
                    direction: direction,
                    leaving: true
                });
                $scope.$currentTransition = $transition(nextSlide.$element, {});
                (function(next, current) {
                    $scope.$currentTransition.then(function() {
                        transitionDone(next, current);
                    }, function() {
                        transitionDone(next, current);
                    });
                })(nextSlide, self.currentSlide);
            } else {
                transitionDone(nextSlide, self.currentSlide);
            }
            self.currentSlide = nextSlide;
            currentIndex = nextIndex;
            restartTimer();
        }
        function transitionDone(next, current) {
            angular.extend(next, {
                direction: "",
                active: true,
                leaving: false,
                entering: false
            });
            angular.extend(current || {}, {
                direction: "",
                active: false,
                leaving: false,
                entering: false
            });
            $scope.$currentTransition = null;
        }
    };
    self.indexOfSlide = function(slide) {
        return slides.indexOf(slide);
    };
    $scope.next = function() {
        var newIndex = (currentIndex + 1) % slides.length;
        return self.select(slides[newIndex], "next");
    };
    $scope.prev = function() {
        var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
        return self.select(slides[newIndex], "prev");
    };
    $scope.select = function(slide) {
        self.select(slide);
    };
    $scope.isActive = function(slide) {
        return self.currentSlide === slide;
    };
    $scope.slides = function() {
        return slides;
    };
    $scope.$watch("interval", restartTimer);
    function restartTimer() {
        if (currentTimeout) {
            $timeout.cancel(currentTimeout);
        }
        function go() {
            if (isPlaying) {
                $scope.next();
                restartTimer();
            } else {
                $scope.pause();
            }
        }
        var interval = +$scope.interval;
        if (!isNaN(interval) && interval >= 0) {
            currentTimeout = $timeout(go, interval);
        }
    }
    $scope.play = function() {
        if (!isPlaying) {
            isPlaying = true;
            restartTimer();
        }
    };
    $scope.pause = function() {
        isPlaying = false;
        if (currentTimeout) {
            $timeout.cancel(currentTimeout);
        }
    };
    self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);
        if (slides.length === 1 || slide.active) {
            self.select(slides[slides.length - 1]);
            if (slides.length == 1) {
                $scope.play();
            }
        } else {
            slide.active = false;
        }
    };
    self.removeSlide = function(slide) {
        var index = slides.indexOf(slide);
        slides.splice(index, 1);
        if (slides.length > 0 && slide.active) {
            if (index >= slides.length) {
                self.select(slides[index - 1]);
            } else {
                self.select(slides[index]);
            }
        }
    };
} ]).directive("carousel", [ function() {
    return {
        restrict: "EA",
        transclude: true,
        replace: true,
        controller: "CarouselController",
        require: "carousel",
        templateUrl: "template/carousel/carousel.html",
        scope: {
            interval: "=",
            noTransition: "="
        }
    };
} ]).directive("slide", [ function() {
    return {
        require: "^carousel",
        restrict: "EA",
        transclude: true,
        replace: true,
        templateUrl: "template/carousel/slide.html",
        scope: {
            active: "="
        },
        link: function(scope, element, attrs, carouselCtrl) {
            carouselCtrl.addSlide(scope, element);
            scope.$on("$destroy", function() {
                carouselCtrl.removeSlide(scope);
            });
            scope.$watch("active", function(active) {
                if (active) {
                    carouselCtrl.select(scope);
                }
            });
        }
    };
} ]);

var dialogModule = angular.module("ui.bootstrap.dialog", [ "ui.bootstrap.transition" ]);

dialogModule.controller("MessageBoxController", [ "$scope", "dialog", "model", function($scope, dialog, model) {
    $scope.title = model.title;
    $scope.message = model.message;
    $scope.buttons = model.buttons;
    $scope.close = function(res) {
        dialog.close(res);
    };
} ]);

dialogModule.provider("$dialog", function() {
    var defaults = {
        backdrop: true,
        dialogClass: "modal",
        backdropClass: "modal-backdrop",
        transitionClass: "fade",
        triggerClass: "in",
        dialogOpenClass: "modal-open",
        resolve: {},
        backdropFade: false,
        dialogFade: false,
        keyboard: true,
        backdropClick: true
    };
    var globalOptions = {};
    var activeBackdrops = {
        value: 0
    };
    this.options = function(value) {
        globalOptions = value;
    };
    this.$get = [ "$http", "$document", "$compile", "$rootScope", "$controller", "$templateCache", "$q", "$transition", "$injector", function($http, $document, $compile, $rootScope, $controller, $templateCache, $q, $transition, $injector) {
        var body = $document.find("body");
        function createElement(clazz) {
            var el = angular.element("<div>");
            el.addClass(clazz);
            return el;
        }
        function Dialog(opts) {
            var self = this, options = this.options = angular.extend({}, defaults, globalOptions, opts);
            this._open = false;
            this.backdropEl = createElement(options.backdropClass);
            if (options.backdropFade) {
                this.backdropEl.addClass(options.transitionClass);
                this.backdropEl.removeClass(options.triggerClass);
            }
            this.modalEl = createElement(options.dialogClass);
            if (options.dialogFade) {
                this.modalEl.addClass(options.transitionClass);
                this.modalEl.removeClass(options.triggerClass);
            }
            this.handledEscapeKey = function(e) {
                if (e.which === 27) {
                    self.close();
                    e.preventDefault();
                    self.$scope.$apply();
                }
            };
            this.handleBackDropClick = function(e) {
                self.close();
                e.preventDefault();
                self.$scope.$apply();
            };
            this.handleLocationChange = function() {
                self.close();
            };
        }
        Dialog.prototype.isOpen = function() {
            return this._open;
        };
        Dialog.prototype.open = function(templateUrl, controller) {
            var self = this, options = this.options;
            if (templateUrl) {
                options.templateUrl = templateUrl;
            }
            if (controller) {
                options.controller = controller;
            }
            if (!(options.template || options.templateUrl)) {
                throw new Error("Dialog.open expected template or templateUrl, neither found. Use options or open method to specify them.");
            }
            this._loadResolves().then(function(locals) {
                var $scope = locals.$scope = self.$scope = locals.$scope ? locals.$scope : $rootScope.$new();
                self.modalEl.html(locals.$template);
                if (self.options.controller) {
                    var ctrl = $controller(self.options.controller, locals);
                    self.modalEl.children().data("ngControllerController", ctrl);
                }
                $compile(self.modalEl)($scope);
                self._addElementsToDom();
                body.addClass(self.options.dialogOpenClass);
                setTimeout(function() {
                    if (self.options.dialogFade) {
                        self.modalEl.addClass(self.options.triggerClass);
                    }
                    if (self.options.backdropFade) {
                        self.backdropEl.addClass(self.options.triggerClass);
                    }
                });
                self._bindEvents();
            });
            this.deferred = $q.defer();
            return this.deferred.promise;
        };
        Dialog.prototype.close = function(result) {
            var self = this;
            var fadingElements = this._getFadingElements();
            body.removeClass(self.options.dialogOpenClass);
            if (fadingElements.length > 0) {
                for (var i = fadingElements.length - 1; i >= 0; i--) {
                    $transition(fadingElements[i], removeTriggerClass).then(onCloseComplete);
                }
                return;
            }
            this._onCloseComplete(result);
            function removeTriggerClass(el) {
                el.removeClass(self.options.triggerClass);
            }
            function onCloseComplete() {
                if (self._open) {
                    self._onCloseComplete(result);
                }
            }
        };
        Dialog.prototype._getFadingElements = function() {
            var elements = [];
            if (this.options.dialogFade) {
                elements.push(this.modalEl);
            }
            if (this.options.backdropFade) {
                elements.push(this.backdropEl);
            }
            return elements;
        };
        Dialog.prototype._bindEvents = function() {
            if (this.options.keyboard) {
                body.bind("keydown", this.handledEscapeKey);
            }
            if (this.options.backdrop && this.options.backdropClick) {
                this.backdropEl.bind("click", this.handleBackDropClick);
            }
            this.$scope.$on("$locationChangeSuccess", this.handleLocationChange);
        };
        Dialog.prototype._unbindEvents = function() {
            if (this.options.keyboard) {
                body.unbind("keydown", this.handledEscapeKey);
            }
            if (this.options.backdrop && this.options.backdropClick) {
                this.backdropEl.unbind("click", this.handleBackDropClick);
            }
        };
        Dialog.prototype._onCloseComplete = function(result) {
            this._removeElementsFromDom();
            this._unbindEvents();
            this.deferred.resolve(result);
        };
        Dialog.prototype._addElementsToDom = function() {
            body.append(this.modalEl);
            if (this.options.backdrop) {
                if (activeBackdrops.value === 0) {
                    body.append(this.backdropEl);
                }
                activeBackdrops.value++;
            }
            this._open = true;
        };
        Dialog.prototype._removeElementsFromDom = function() {
            this.modalEl.remove();
            if (this.options.backdrop) {
                activeBackdrops.value--;
                if (activeBackdrops.value === 0) {
                    this.backdropEl.remove();
                }
            }
            this._open = false;
        };
        Dialog.prototype._loadResolves = function() {
            var values = [], keys = [], templatePromise, self = this;
            if (this.options.template) {
                templatePromise = $q.when(this.options.template);
            } else if (this.options.templateUrl) {
                templatePromise = $http.get(this.options.templateUrl, {
                    cache: $templateCache
                }).then(function(response) {
                    return response.data;
                });
            }
            angular.forEach(this.options.resolve || [], function(value, key) {
                keys.push(key);
                values.push(angular.isString(value) ? $injector.get(value) : $injector.invoke(value));
            });
            keys.push("$template");
            values.push(templatePromise);
            return $q.all(values).then(function(values) {
                var locals = {};
                angular.forEach(values, function(value, index) {
                    locals[keys[index]] = value;
                });
                locals.dialog = self;
                return locals;
            });
        };
        return {
            dialog: function(opts) {
                return new Dialog(opts);
            },
            messageBox: function(title, message, buttons) {
                return new Dialog({
                    templateUrl: "template/dialog/message.html",
                    controller: "MessageBoxController",
                    resolve: {
                        model: function() {
                            return {
                                title: title,
                                message: message,
                                buttons: buttons
                            };
                        }
                    }
                });
            }
        };
    } ];
});

angular.module("ui.bootstrap.dropdownToggle", []).directive("dropdownToggle", [ "$document", "$location", "$window", function($document, $location, $window) {
    var openElement = null, closeMenu = angular.noop;
    return {
        restrict: "CA",
        link: function(scope, element, attrs) {
            scope.$watch("$location.path", function() {
                closeMenu();
            });
            element.parent().bind("click", function() {
                closeMenu();
            });
            element.bind("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                var elementWasOpen = element === openElement;
                if (!!openElement) {
                    closeMenu();
                }
                if (!elementWasOpen) {
                    element.parent().addClass("open");
                    openElement = element;
                    closeMenu = function(event) {
                        if (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        $document.unbind("click", closeMenu);
                        element.parent().removeClass("open");
                        closeMenu = angular.noop;
                        openElement = null;
                    };
                    $document.bind("click", closeMenu);
                }
            });
        }
    };
} ]);

angular.module("ui.bootstrap.modal", [ "ui.bootstrap.dialog" ]).directive("modal", [ "$parse", "$dialog", function($parse, $dialog) {
    return {
        restrict: "EA",
        terminal: true,
        link: function(scope, elm, attrs) {
            var opts = angular.extend({}, scope.$eval(attrs.uiOptions || attrs.bsOptions || attrs.options));
            var shownExpr = attrs.modal || attrs.show;
            var setClosed;
            opts = angular.extend(opts, {
                template: elm.html(),
                resolve: {
                    $scope: function() {
                        return scope;
                    }
                }
            });
            var dialog = $dialog.dialog(opts);
            elm.remove();
            if (attrs.close) {
                setClosed = function() {
                    $parse(attrs.close)(scope);
                };
            } else {
                setClosed = function() {
                    if (angular.isFunction($parse(shownExpr).assign)) {
                        $parse(shownExpr).assign(scope, false);
                    }
                };
            }
            scope.$watch(shownExpr, function(isShown, oldShown) {
                if (isShown) {
                    dialog.open().then(function() {
                        setClosed();
                    });
                } else {
                    if (dialog.isOpen()) {
                        dialog.close();
                    }
                }
            });
        }
    };
} ]);

angular.module("ui.bootstrap.pagination", []).constant("paginationConfig", {
    boundaryLinks: false,
    directionLinks: true,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last"
}).directive("pagination", [ "paginationConfig", function(paginationConfig) {
    return {
        restrict: "EA",
        scope: {
            numPages: "=",
            currentPage: "=",
            maxSize: "=",
            onSelectPage: "&"
        },
        templateUrl: "template/pagination/pagination.html",
        replace: true,
        link: function(scope, element, attrs) {
            var boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
            var directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$eval(attrs.directionLinks) : paginationConfig.directionLinks;
            var firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : paginationConfig.firstText;
            var previousText = angular.isDefined(attrs.previousText) ? attrs.previousText : paginationConfig.previousText;
            var nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : paginationConfig.nextText;
            var lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : paginationConfig.lastText;
            function makePage(number, text, isActive, isDisabled) {
                return {
                    number: number,
                    text: text,
                    active: isActive,
                    disabled: isDisabled
                };
            }
            scope.$watch("numPages + currentPage + maxSize", function() {
                scope.pages = [];
                var startPage = 1, endPage = scope.numPages;
                if (scope.maxSize && scope.maxSize < scope.numPages) {
                    startPage = Math.max(scope.currentPage - Math.floor(scope.maxSize / 2), 1);
                    endPage = startPage + scope.maxSize - 1;
                    if (endPage > scope.numPages) {
                        endPage = scope.numPages;
                        startPage = endPage - scope.maxSize + 1;
                    }
                }
                for (var number = startPage; number <= endPage; number++) {
                    var page = makePage(number, number, scope.isActive(number), false);
                    scope.pages.push(page);
                }
                if (directionLinks) {
                    var previousPage = makePage(scope.currentPage - 1, previousText, false, scope.noPrevious());
                    scope.pages.unshift(previousPage);
                    var nextPage = makePage(scope.currentPage + 1, nextText, false, scope.noNext());
                    scope.pages.push(nextPage);
                }
                if (boundaryLinks) {
                    var firstPage = makePage(1, firstText, false, scope.noPrevious());
                    scope.pages.unshift(firstPage);
                    var lastPage = makePage(scope.numPages, lastText, false, scope.noNext());
                    scope.pages.push(lastPage);
                }
                if (scope.currentPage > scope.numPages) {
                    scope.selectPage(scope.numPages);
                }
            });
            scope.noPrevious = function() {
                return scope.currentPage === 1;
            };
            scope.noNext = function() {
                return scope.currentPage === scope.numPages;
            };
            scope.isActive = function(page) {
                return scope.currentPage === page;
            };
            scope.selectPage = function(page) {
                if (!scope.isActive(page) && page > 0 && page <= scope.numPages) {
                    scope.currentPage = page;
                    scope.onSelectPage({
                        page: page
                    });
                }
            };
        }
    };
} ]);

angular.module("ui.bootstrap.position", []).factory("$position", [ "$document", "$window", function($document, $window) {
    function getStyle(el, cssprop) {
        if (el.currentStyle) {
            return el.currentStyle[cssprop];
        } else if ($window.getComputedStyle) {
            return $window.getComputedStyle(el)[cssprop];
        }
        return el.style[cssprop];
    }
    function isStaticPositioned(element) {
        return (getStyle(element, "position") || "static") === "static";
    }
    var parentOffsetEl = function(element) {
        var docDomEl = $document[0];
        var offsetParent = element.offsetParent || docDomEl;
        while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docDomEl;
    };
    return {
        position: function(element) {
            var elBCR = this.offset(element);
            var offsetParentBCR = {
                top: 0,
                left: 0
            };
            var offsetParentEl = parentOffsetEl(element[0]);
            if (offsetParentEl != $document[0]) {
                offsetParentBCR = this.offset(angular.element(offsetParentEl));
                offsetParentBCR.top += offsetParentEl.clientTop;
                offsetParentBCR.left += offsetParentEl.clientLeft;
            }
            return {
                width: element.prop("offsetWidth"),
                height: element.prop("offsetHeight"),
                top: elBCR.top - offsetParentBCR.top,
                left: elBCR.left - offsetParentBCR.left
            };
        },
        offset: function(element) {
            var boundingClientRect = element[0].getBoundingClientRect();
            return {
                width: element.prop("offsetWidth"),
                height: element.prop("offsetHeight"),
                top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop),
                left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft)
            };
        }
    };
} ]);

angular.module("ui.bootstrap.tooltip", [ "ui.bootstrap.position" ]).provider("$tooltip", function() {
    var defaultOptions = {
        placement: "top",
        animation: true,
        popupDelay: 0
    };
    var triggerMap = {
        mouseenter: "mouseleave",
        click: "click",
        focus: "blur"
    };
    var globalOptions = {};
    this.options = function(value) {
        angular.extend(globalOptions, value);
    };
    function snake_case(name) {
        var regexp = /[A-Z]/g;
        var separator = "-";
        return name.replace(regexp, function(letter, pos) {
            return (pos ? separator : "") + letter.toLowerCase();
        });
    }
    this.$get = [ "$window", "$compile", "$timeout", "$parse", "$document", "$position", function($window, $compile, $timeout, $parse, $document, $position) {
        return function $tooltip(type, prefix, defaultTriggerShow) {
            var options = angular.extend({}, defaultOptions, globalOptions);
            function setTriggers(trigger) {
                var show, hide;
                show = trigger || options.trigger || defaultTriggerShow;
                if (angular.isDefined(options.trigger)) {
                    hide = triggerMap[options.trigger] || show;
                } else {
                    hide = triggerMap[show] || show;
                }
                return {
                    show: show,
                    hide: hide
                };
            }
            var directiveName = snake_case(type);
            var triggers = setTriggers(undefined);
            var template = "<" + directiveName + "-popup " + 'title="{{tt_title}}" ' + 'content="{{tt_content}}" ' + 'placement="{{tt_placement}}" ' + 'animation="tt_animation()" ' + 'is-open="tt_isOpen"' + ">" + "</" + directiveName + "-popup>";
            return {
                restrict: "EA",
                scope: true,
                link: function link(scope, element, attrs) {
                    var tooltip = $compile(template)(scope);
                    var transitionTimeout;
                    var popupTimeout;
                    var $body;
                    scope.tt_isOpen = false;
                    function toggleTooltipBind() {
                        if (!scope.tt_isOpen) {
                            showTooltipBind();
                        } else {
                            hideTooltipBind();
                        }
                    }
                    function showTooltipBind() {
                        if (scope.tt_popupDelay) {
                            popupTimeout = $timeout(show, scope.tt_popupDelay);
                        } else {
                            scope.$apply(show);
                        }
                    }
                    function hideTooltipBind() {
                        scope.$apply(function() {
                            hide();
                        });
                    }
                    function show() {
                        var position, ttWidth, ttHeight, ttPosition;
                        if (!scope.tt_content) {
                            return;
                        }
                        if (transitionTimeout) {
                            $timeout.cancel(transitionTimeout);
                        }
                        tooltip.css({
                            top: 0,
                            left: 0,
                            display: "block"
                        });
                        if (options.appendToBody) {
                            $body = $body || $document.find("body");
                            $body.append(tooltip);
                        } else {
                            element.after(tooltip);
                        }
                        position = $position.position(element);
                        ttWidth = tooltip.prop("offsetWidth");
                        ttHeight = tooltip.prop("offsetHeight");
                        switch (scope.tt_placement) {
                          case "right":
                            ttPosition = {
                                top: position.top + position.height / 2 - ttHeight / 2 + "px",
                                left: position.left + position.width + "px"
                            };
                            break;

                          case "bottom":
                            ttPosition = {
                                top: position.top + position.height + "px",
                                left: position.left + position.width / 2 - ttWidth / 2 + "px"
                            };
                            break;

                          case "left":
                            ttPosition = {
                                top: position.top + position.height / 2 - ttHeight / 2 + "px",
                                left: position.left - ttWidth + "px"
                            };
                            break;

                          default:
                            ttPosition = {
                                top: position.top - ttHeight + "px",
                                left: position.left + position.width / 2 - ttWidth / 2 + "px"
                            };
                            break;
                        }
                        tooltip.css(ttPosition);
                        scope.tt_isOpen = true;
                    }
                    function hide() {
                        scope.tt_isOpen = false;
                        $timeout.cancel(popupTimeout);
                        if (angular.isDefined(scope.tt_animation) && scope.tt_animation()) {
                            transitionTimeout = $timeout(function() {
                                tooltip.remove();
                            }, 500);
                        } else {
                            tooltip.remove();
                        }
                    }
                    attrs.$observe(type, function(val) {
                        scope.tt_content = val;
                    });
                    attrs.$observe(prefix + "Title", function(val) {
                        scope.tt_title = val;
                    });
                    attrs.$observe(prefix + "Placement", function(val) {
                        scope.tt_placement = angular.isDefined(val) ? val : options.placement;
                    });
                    attrs.$observe(prefix + "Animation", function(val) {
                        scope.tt_animation = angular.isDefined(val) ? $parse(val) : function() {
                            return options.animation;
                        };
                    });
                    attrs.$observe(prefix + "PopupDelay", function(val) {
                        var delay = parseInt(val, 10);
                        scope.tt_popupDelay = !isNaN(delay) ? delay : options.popupDelay;
                    });
                    attrs.$observe(prefix + "Trigger", function(val) {
                        element.unbind(triggers.show);
                        element.unbind(triggers.hide);
                        triggers = setTriggers(val);
                        if (triggers.show === triggers.hide) {
                            element.bind(triggers.show, toggleTooltipBind);
                        } else {
                            element.bind(triggers.show, showTooltipBind);
                            element.bind(triggers.hide, hideTooltipBind);
                        }
                    });
                }
            };
        };
    } ];
}).directive("tooltipPopup", function() {
    return {
        restrict: "E",
        replace: true,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-popup.html"
    };
}).directive("tooltip", [ "$tooltip", function($tooltip) {
    return $tooltip("tooltip", "tooltip", "mouseenter");
} ]).directive("tooltipHtmlUnsafePopup", function() {
    return {
        restrict: "E",
        replace: true,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
    };
}).directive("tooltipHtmlUnsafe", [ "$tooltip", function($tooltip) {
    return $tooltip("tooltipHtmlUnsafe", "tooltip", "mouseenter");
} ]);

angular.module("ui.bootstrap.popover", [ "ui.bootstrap.tooltip" ]).directive("popoverPopup", function() {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            title: "@",
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover.html"
    };
}).directive("popover", [ "$compile", "$timeout", "$parse", "$window", "$tooltip", function($compile, $timeout, $parse, $window, $tooltip) {
    return $tooltip("popover", "popover", "click");
} ]);

angular.module("ui.bootstrap.progressbar", [ "ui.bootstrap.transition" ]).constant("progressConfig", {
    animate: true,
    autoType: false,
    stackedTypes: [ "success", "info", "warning", "danger" ]
}).controller("ProgressBarController", [ "$scope", "$attrs", "progressConfig", function($scope, $attrs, progressConfig) {
    var animate = angular.isDefined($attrs.animate) ? $scope.$eval($attrs.animate) : progressConfig.animate;
    var autoType = angular.isDefined($attrs.autoType) ? $scope.$eval($attrs.autoType) : progressConfig.autoType;
    var stackedTypes = angular.isDefined($attrs.stackedTypes) ? $scope.$eval("[" + $attrs.stackedTypes + "]") : progressConfig.stackedTypes;
    this.makeBar = function(newBar, oldBar, index) {
        var newValue = angular.isObject(newBar) ? newBar.value : newBar || 0;
        var oldValue = angular.isObject(oldBar) ? oldBar.value : oldBar || 0;
        var type = angular.isObject(newBar) && angular.isDefined(newBar.type) ? newBar.type : autoType ? getStackedType(index || 0) : null;
        return {
            from: oldValue,
            to: newValue,
            type: type,
            animate: animate
        };
    };
    function getStackedType(index) {
        return stackedTypes[index];
    }
    this.addBar = function(bar) {
        $scope.bars.push(bar);
        $scope.totalPercent += bar.to;
    };
    this.clearBars = function() {
        $scope.bars = [];
        $scope.totalPercent = 0;
    };
    this.clearBars();
} ]).directive("progress", function() {
    return {
        restrict: "EA",
        replace: true,
        controller: "ProgressBarController",
        scope: {
            value: "=",
            onFull: "&",
            onEmpty: "&"
        },
        templateUrl: "template/progressbar/progress.html",
        link: function(scope, element, attrs, controller) {
            scope.$watch("value", function(newValue, oldValue) {
                controller.clearBars();
                if (angular.isArray(newValue)) {
                    for (var i = 0, n = newValue.length; i < n; i++) {
                        controller.addBar(controller.makeBar(newValue[i], oldValue[i], i));
                    }
                } else {
                    controller.addBar(controller.makeBar(newValue, oldValue));
                }
            }, true);
            scope.$watch("totalPercent", function(value) {
                if (value >= 100) {
                    scope.onFull();
                } else if (value <= 0) {
                    scope.onEmpty();
                }
            }, true);
        }
    };
}).directive("progressbar", [ "$transition", function($transition) {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            width: "=",
            old: "=",
            type: "=",
            animate: "="
        },
        templateUrl: "template/progressbar/bar.html",
        link: function(scope, element) {
            scope.$watch("width", function(value) {
                if (scope.animate) {
                    element.css("width", scope.old + "%");
                    $transition(element, {
                        width: value + "%"
                    });
                } else {
                    element.css("width", value + "%");
                }
            });
        }
    };
} ]);

angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
    max: 5
}).directive("rating", [ "ratingConfig", "$parse", function(ratingConfig, $parse) {
    return {
        restrict: "EA",
        scope: {
            value: "="
        },
        templateUrl: "template/rating/rating.html",
        replace: true,
        link: function(scope, element, attrs) {
            var maxRange = angular.isDefined(attrs.max) ? scope.$eval(attrs.max) : ratingConfig.max;
            scope.range = [];
            for (var i = 1; i <= maxRange; i++) {
                scope.range.push(i);
            }
            scope.rate = function(value) {
                if (!scope.readonly) {
                    scope.value = value;
                }
            };
            scope.enter = function(value) {
                if (!scope.readonly) {
                    scope.val = value;
                }
            };
            scope.reset = function() {
                scope.val = angular.copy(scope.value);
            };
            scope.reset();
            scope.$watch("value", function(value) {
                scope.val = value;
            });
            scope.readonly = false;
            if (attrs.readonly) {
                scope.$parent.$watch($parse(attrs.readonly), function(value) {
                    scope.readonly = !!value;
                });
            }
        }
    };
} ]);

angular.module("ui.bootstrap.tabs", []).controller("TabsController", [ "$scope", "$element", function($scope, $element) {
    var panes = $scope.panes = [];
    this.select = $scope.select = function selectPane(pane) {
        angular.forEach(panes, function(pane) {
            pane.selected = false;
        });
        pane.selected = true;
    };
    this.addPane = function addPane(pane) {
        if (!panes.length) {
            $scope.select(pane);
        }
        panes.push(pane);
    };
    this.removePane = function removePane(pane) {
        var index = panes.indexOf(pane);
        panes.splice(index, 1);
        if (pane.selected && panes.length > 0) {
            $scope.select(panes[index < panes.length ? index : index - 1]);
        }
    };
} ]).directive("tabs", function() {
    return {
        restrict: "EA",
        transclude: true,
        scope: {},
        controller: "TabsController",
        templateUrl: "template/tabs/tabs.html",
        replace: true
    };
}).directive("pane", [ "$parse", function($parse) {
    return {
        require: "^tabs",
        restrict: "EA",
        transclude: true,
        scope: {
            heading: "@"
        },
        link: function(scope, element, attrs, tabsCtrl) {
            var getSelected, setSelected;
            scope.selected = false;
            if (attrs.active) {
                getSelected = $parse(attrs.active);
                setSelected = getSelected.assign;
                scope.$watch(function watchSelected() {
                    return getSelected(scope.$parent);
                }, function updateSelected(value) {
                    scope.selected = value;
                });
                scope.selected = getSelected ? getSelected(scope.$parent) : false;
            }
            scope.$watch("selected", function(selected) {
                if (selected) {
                    tabsCtrl.select(scope);
                }
                if (setSelected) {
                    setSelected(scope.$parent, selected);
                }
            });
            tabsCtrl.addPane(scope);
            scope.$on("$destroy", function() {
                tabsCtrl.removePane(scope);
            });
        },
        templateUrl: "template/tabs/pane.html",
        replace: true
    };
} ]);

angular.module("ui.bootstrap.typeahead", [ "ui.bootstrap.position" ]).factory("typeaheadParser", [ "$parse", function($parse) {
    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
    return {
        parse: function(input) {
            var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
            if (!match) {
                throw new Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" + " but got '" + input + "'.");
            }
            return {
                itemName: match[3],
                source: $parse(match[4]),
                viewMapper: $parse(match[2] || match[1]),
                modelMapper: $parse(match[1])
            };
        }
    };
} ]).directive("typeahead", [ "$compile", "$parse", "$q", "$document", "$position", "typeaheadParser", function($compile, $parse, $q, $document, $position, typeaheadParser) {
    var HOT_KEYS = [ 9, 13, 27, 38, 40 ];
    return {
        require: "ngModel",
        link: function(originalScope, element, attrs, modelCtrl) {
            var selected;
            var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;
            var parserResult = typeaheadParser.parse(attrs.typeahead);
            var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
            var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;
            var popUpEl = angular.element("<typeahead-popup " + "matches='matches' " + "active='activeIdx' " + "select='select(activeIdx)' " + "query='query' " + "position='position'>" + "</typeahead-popup>");
            var scope = originalScope.$new();
            originalScope.$on("$destroy", function() {
                scope.$destroy();
            });
            var resetMatches = function() {
                scope.matches = [];
                scope.activeIdx = -1;
            };
            var getMatchesAsync = function(inputValue) {
                var locals = {
                    $viewValue: inputValue
                };
                isLoadingSetter(originalScope, true);
                $q.when(parserResult.source(scope, locals)).then(function(matches) {
                    if (inputValue === modelCtrl.$viewValue) {
                        if (matches.length > 0) {
                            scope.activeIdx = 0;
                            scope.matches.length = 0;
                            for (var i = 0; i < matches.length; i++) {
                                locals[parserResult.itemName] = matches[i];
                                scope.matches.push({
                                    label: parserResult.viewMapper(scope, locals),
                                    model: matches[i]
                                });
                            }
                            scope.query = inputValue;
                            scope.position = $position.position(element);
                            scope.position.top = scope.position.top + element.prop("offsetHeight");
                        } else {
                            resetMatches();
                        }
                        isLoadingSetter(originalScope, false);
                    }
                }, function() {
                    resetMatches();
                    isLoadingSetter(originalScope, false);
                });
            };
            resetMatches();
            scope.query = undefined;
            modelCtrl.$parsers.push(function(inputValue) {
                resetMatches();
                if (selected) {
                    return inputValue;
                } else {
                    if (inputValue && inputValue.length >= minSearch) {
                        getMatchesAsync(inputValue);
                    }
                }
                return isEditable ? inputValue : undefined;
            });
            modelCtrl.$render = function() {
                var locals = {};
                locals[parserResult.itemName] = selected || modelCtrl.$viewValue;
                element.val(parserResult.viewMapper(scope, locals) || modelCtrl.$viewValue);
                selected = undefined;
            };
            scope.select = function(activeIdx) {
                var locals = {};
                locals[parserResult.itemName] = selected = scope.matches[activeIdx].model;
                modelCtrl.$setViewValue(parserResult.modelMapper(scope, locals));
                modelCtrl.$render();
            };
            element.bind("keydown", function(evt) {
                if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                    return;
                }
                evt.preventDefault();
                if (evt.which === 40) {
                    scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                    scope.$digest();
                } else if (evt.which === 38) {
                    scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
                    scope.$digest();
                } else if (evt.which === 13 || evt.which === 9) {
                    scope.$apply(function() {
                        scope.select(scope.activeIdx);
                    });
                } else if (evt.which === 27) {
                    evt.stopPropagation();
                    resetMatches();
                    scope.$digest();
                }
            });
            $document.bind("click", function() {
                resetMatches();
                scope.$digest();
            });
            element.after($compile(popUpEl)(scope));
        }
    };
} ]).directive("typeaheadPopup", function() {
    return {
        restrict: "E",
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "=",
            select: "&"
        },
        replace: true,
        templateUrl: "template/typeahead/typeahead.html",
        link: function(scope, element, attrs) {
            scope.isOpen = function() {
                return scope.matches.length > 0;
            };
            scope.isActive = function(matchIdx) {
                return scope.active == matchIdx;
            };
            scope.selectActive = function(matchIdx) {
                scope.active = matchIdx;
            };
            scope.selectMatch = function(activeIdx) {
                scope.select({
                    activeIdx: activeIdx
                });
            };
        }
    };
}).filter("typeaheadHighlight", function() {
    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
    return function(matchItem, query) {
        return query ? matchItem.replace(new RegExp(escapeRegexp(query), "gi"), "<strong>$&</strong>") : query;
    };
});

angular.module("ui.config", []).value("ui.config", {}), angular.module("ui.filters", [ "ui.config" ]), 
angular.module("ui.directives", [ "ui.config" ]), angular.module("ui", [ "ui.filters", "ui.directives", "ui.config" ]), 
angular.module("ui.directives").factory("keypressHelper", [ "$parse", function(t) {
    var n = {
        8: "backspace",
        9: "tab",
        13: "enter",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "delete"
    }, r = function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
    };
    return function(e, i, s, o) {
        var u, a = [];
        u = i.$eval(o["ui" + r(e)]), angular.forEach(u, function(e, n) {
            var r, i;
            i = t(e), angular.forEach(n.split(" "), function(e) {
                r = {
                    expression: i,
                    keys: {}
                }, angular.forEach(e.split("-"), function(e) {
                    r.keys[e] = !0;
                }), a.push(r);
            });
        }), s.bind(e, function(t) {
            var r = !!t.metaKey || !!t.altKey, s = !!t.ctrlKey, o = !!t.shiftKey, u = t.keyCode;
            e === "keypress" && !o && u >= 97 && u <= 122 && (u -= 32), angular.forEach(a, function(e) {
                var u = e.keys[n[t.keyCode]] || e.keys[t.keyCode.toString()], a = !!e.keys.alt, f = !!e.keys.ctrl, l = !!e.keys.shift;
                u && a == r && f == s && l == o && i.$apply(function() {
                    e.expression(i, {
                        $event: t
                    });
                });
            });
        });
    };
} ]), angular.module("ui.directives").directive("uiKeydown", [ "keypressHelper", function(e) {
    return {
        link: function(t, n, r) {
            e("keydown", t, n, r);
        }
    };
} ]), angular.module("ui.directives").directive("uiKeypress", [ "keypressHelper", function(e) {
    return {
        link: function(t, n, r) {
            e("keypress", t, n, r);
        }
    };
} ]), angular.module("ui.directives").directive("uiKeyup", [ "keypressHelper", function(e) {
    return {
        link: function(t, n, r) {
            e("keyup", t, n, r);
        }
    };
} ]);

(function() {
    var block = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: noop,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        nptable: noop,
        lheading: /^([^\n]+)\n *(=|-){3,} *\n*/,
        blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        table: noop,
        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/
    };
    block.bullet = /(?:[*+-]|\d+\.)/;
    block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
    block.item = replace(block.item, "gm")(/bull/g, block.bullet)();
    block.list = replace(block.list)(/bull/g, block.bullet)("hr", /\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)();
    block._tag = "(?!(?:" + "a|em|strong|small|s|cite|q|dfn|abbr|data|time|code" + "|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo" + "|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b";
    block.html = replace(block.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, block._tag)();
    block.paragraph = replace(block.paragraph)("hr", block.hr)("heading", block.heading)("lheading", block.lheading)("blockquote", block.blockquote)("tag", "<" + block._tag)("def", block.def)();
    block.normal = merge({}, block);
    block.gfm = merge({}, block.normal, {
        fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
        paragraph: /^/
    });
    block.gfm.paragraph = replace(block.paragraph)("(?!", "(?!" + block.gfm.fences.source.replace("\\1", "\\2") + "|")();
    block.tables = merge({}, block.gfm, {
        nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
    });
    function Lexer(options) {
        this.tokens = [];
        this.tokens.links = {};
        this.options = options || marked.defaults;
        this.rules = block.normal;
        if (this.options.gfm) {
            if (this.options.tables) {
                this.rules = block.tables;
            } else {
                this.rules = block.gfm;
            }
        }
    }
    Lexer.rules = block;
    Lexer.lex = function(src, options) {
        var lexer = new Lexer(options);
        return lexer.lex(src);
    };
    Lexer.prototype.lex = function(src) {
        src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n");
        return this.token(src, true);
    };
    Lexer.prototype.token = function(src, top) {
        var src = src.replace(/^ +$/gm, ""), next, loose, cap, bull, b, item, space, i, l;
        while (src) {
            if (cap = this.rules.newline.exec(src)) {
                src = src.substring(cap[0].length);
                if (cap[0].length > 1) {
                    this.tokens.push({
                        type: "space"
                    });
                }
            }
            if (cap = this.rules.code.exec(src)) {
                src = src.substring(cap[0].length);
                cap = cap[0].replace(/^ {4}/gm, "");
                this.tokens.push({
                    type: "code",
                    text: !this.options.pedantic ? cap.replace(/\n+$/, "") : cap
                });
                continue;
            }
            if (cap = this.rules.fences.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "code",
                    lang: cap[2],
                    text: cap[3]
                });
                continue;
            }
            if (cap = this.rules.heading.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "heading",
                    depth: cap[1].length,
                    text: cap[2]
                });
                continue;
            }
            if (top && (cap = this.rules.nptable.exec(src))) {
                src = src.substring(cap[0].length);
                item = {
                    type: "table",
                    header: cap[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                    align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: cap[3].replace(/\n$/, "").split("\n")
                };
                for (i = 0; i < item.align.length; i++) {
                    if (/^ *-+: *$/.test(item.align[i])) {
                        item.align[i] = "right";
                    } else if (/^ *:-+: *$/.test(item.align[i])) {
                        item.align[i] = "center";
                    } else if (/^ *:-+ *$/.test(item.align[i])) {
                        item.align[i] = "left";
                    } else {
                        item.align[i] = null;
                    }
                }
                for (i = 0; i < item.cells.length; i++) {
                    item.cells[i] = item.cells[i].split(/ *\| */);
                }
                this.tokens.push(item);
                continue;
            }
            if (cap = this.rules.lheading.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "heading",
                    depth: cap[2] === "=" ? 1 : 2,
                    text: cap[1]
                });
                continue;
            }
            if (cap = this.rules.hr.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "hr"
                });
                continue;
            }
            if (cap = this.rules.blockquote.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "blockquote_start"
                });
                cap = cap[0].replace(/^ *> ?/gm, "");
                this.token(cap, top);
                this.tokens.push({
                    type: "blockquote_end"
                });
                continue;
            }
            if (cap = this.rules.list.exec(src)) {
                src = src.substring(cap[0].length);
                bull = cap[2];
                this.tokens.push({
                    type: "list_start",
                    ordered: bull.length > 1
                });
                cap = cap[0].match(this.rules.item);
                next = false;
                l = cap.length;
                i = 0;
                for (;i < l; i++) {
                    item = cap[i];
                    space = item.length;
                    item = item.replace(/^ *([*+-]|\d+\.) +/, "");
                    if (~item.indexOf("\n ")) {
                        space -= item.length;
                        item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "");
                    }
                    if (this.options.smartLists && i !== l - 1) {
                        b = block.bullet.exec(cap[i + 1])[0];
                        if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                            src = cap.slice(i + 1).join("\n") + src;
                            i = l - 1;
                        }
                    }
                    loose = next || /\n\n(?!\s*$)/.test(item);
                    if (i !== l - 1) {
                        next = item[item.length - 1] === "\n";
                        if (!loose) loose = next;
                    }
                    this.tokens.push({
                        type: loose ? "loose_item_start" : "list_item_start"
                    });
                    this.token(item, false);
                    this.tokens.push({
                        type: "list_item_end"
                    });
                }
                this.tokens.push({
                    type: "list_end"
                });
                continue;
            }
            if (cap = this.rules.html.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: this.options.sanitize ? "paragraph" : "html",
                    pre: cap[1] === "pre" || cap[1] === "script",
                    text: cap[0]
                });
                continue;
            }
            if (top && (cap = this.rules.def.exec(src))) {
                src = src.substring(cap[0].length);
                this.tokens.links[cap[1].toLowerCase()] = {
                    href: cap[2],
                    title: cap[3]
                };
                continue;
            }
            if (top && (cap = this.rules.table.exec(src))) {
                src = src.substring(cap[0].length);
                item = {
                    type: "table",
                    header: cap[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                    align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: cap[3].replace(/(?: *\| *)?\n$/, "").split("\n")
                };
                for (i = 0; i < item.align.length; i++) {
                    if (/^ *-+: *$/.test(item.align[i])) {
                        item.align[i] = "right";
                    } else if (/^ *:-+: *$/.test(item.align[i])) {
                        item.align[i] = "center";
                    } else if (/^ *:-+ *$/.test(item.align[i])) {
                        item.align[i] = "left";
                    } else {
                        item.align[i] = null;
                    }
                }
                for (i = 0; i < item.cells.length; i++) {
                    item.cells[i] = item.cells[i].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
                }
                this.tokens.push(item);
                continue;
            }
            if (top && (cap = this.rules.paragraph.exec(src))) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "paragraph",
                    text: cap[1][cap[1].length - 1] === "\n" ? cap[1].slice(0, -1) : cap[1]
                });
                continue;
            }
            if (cap = this.rules.text.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: "text",
                    text: cap[0]
                });
                continue;
            }
            if (src) {
                throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
            }
        }
        return this.tokens;
    };
    var inline = {
        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
        autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
        url: noop,
        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
        link: /^!?\[(inside)\]\(href\)/,
        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
        em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
        br: /^ {2,}\n(?!\s*$)/,
        del: noop,
        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
    };
    inline._inside = /(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/;
    inline._href = /\s*<?([^\s]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
    inline.link = replace(inline.link)("inside", inline._inside)("href", inline._href)();
    inline.reflink = replace(inline.reflink)("inside", inline._inside)();
    inline.normal = merge({}, inline);
    inline.pedantic = merge({}, inline.normal, {
        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
    });
    inline.gfm = merge({}, inline.normal, {
        escape: replace(inline.escape)("])", "~|])")(),
        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
        del: /^~~(?=\S)([\s\S]*?\S)~~/,
        text: replace(inline.text)("]|", "~]|")("|", "|https?://|")()
    });
    inline.breaks = merge({}, inline.gfm, {
        br: replace(inline.br)("{2,}", "*")(),
        text: replace(inline.gfm.text)("{2,}", "*")()
    });
    function InlineLexer(links, options) {
        this.options = options || marked.defaults;
        this.links = links;
        this.rules = inline.normal;
        if (!this.links) {
            throw new Error("Tokens array requires a `links` property.");
        }
        if (this.options.gfm) {
            if (this.options.breaks) {
                this.rules = inline.breaks;
            } else {
                this.rules = inline.gfm;
            }
        } else if (this.options.pedantic) {
            this.rules = inline.pedantic;
        }
    }
    InlineLexer.rules = inline;
    InlineLexer.output = function(src, links, options) {
        var inline = new InlineLexer(links, options);
        return inline.output(src);
    };
    InlineLexer.prototype.output = function(src) {
        var out = "", link, text, href, cap;
        while (src) {
            if (cap = this.rules.escape.exec(src)) {
                src = src.substring(cap[0].length);
                out += cap[1];
                continue;
            }
            if (cap = this.rules.autolink.exec(src)) {
                src = src.substring(cap[0].length);
                if (cap[2] === "@") {
                    text = cap[1][6] === ":" ? this.mangle(cap[1].substring(7)) : this.mangle(cap[1]);
                    href = this.mangle("mailto:") + text;
                } else {
                    text = escape(cap[1]);
                    href = text;
                }
                out += '<a href="' + href + '">' + text + "</a>";
                continue;
            }
            if (cap = this.rules.url.exec(src)) {
                src = src.substring(cap[0].length);
                text = escape(cap[1]);
                href = text;
                out += '<a href="' + href + '">' + text + "</a>";
                continue;
            }
            if (cap = this.rules.tag.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.options.sanitize ? escape(cap[0]) : cap[0];
                continue;
            }
            if (cap = this.rules.link.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.outputLink(cap, {
                    href: cap[2],
                    title: cap[3]
                });
                continue;
            }
            if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
                src = src.substring(cap[0].length);
                link = (cap[2] || cap[1]).replace(/\s+/g, " ");
                link = this.links[link.toLowerCase()];
                if (!link || !link.href) {
                    out += cap[0][0];
                    src = cap[0].substring(1) + src;
                    continue;
                }
                out += this.outputLink(cap, link);
                continue;
            }
            if (cap = this.rules.strong.exec(src)) {
                src = src.substring(cap[0].length);
                out += "<strong>" + this.output(cap[2] || cap[1]) + "</strong>";
                continue;
            }
            if (cap = this.rules.em.exec(src)) {
                src = src.substring(cap[0].length);
                out += "<em>" + this.output(cap[2] || cap[1]) + "</em>";
                continue;
            }
            if (cap = this.rules.code.exec(src)) {
                src = src.substring(cap[0].length);
                out += "<code>" + escape(cap[2], true) + "</code>";
                continue;
            }
            if (cap = this.rules.br.exec(src)) {
                src = src.substring(cap[0].length);
                out += "<br>";
                continue;
            }
            if (cap = this.rules.del.exec(src)) {
                src = src.substring(cap[0].length);
                out += "<del>" + this.output(cap[1]) + "</del>";
                continue;
            }
            if (cap = this.rules.text.exec(src)) {
                src = src.substring(cap[0].length);
                out += escape(cap[0]);
                continue;
            }
            if (src) {
                throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
            }
        }
        return out;
    };
    InlineLexer.prototype.outputLink = function(cap, link) {
        if (cap[0][0] !== "!") {
            return '<a href="' + escape(link.href) + '"' + (link.title ? ' title="' + escape(link.title) + '"' : "") + ">" + this.output(cap[1]) + "</a>";
        } else {
            return '<img src="' + escape(link.href) + '" alt="' + escape(cap[1]) + '"' + (link.title ? ' title="' + escape(link.title) + '"' : "") + ">";
        }
    };
    InlineLexer.prototype.smartypants = function(text) {
        if (!this.options.smartypants) return text;
        return text.replace(/--/g, "—").replace(/'([^']*)'/g, "‘$1’").replace(/"([^"]*)"/g, "“$1”").replace(/\.{3}/g, "…");
    };
    InlineLexer.prototype.mangle = function(text) {
        var out = "", l = text.length, i = 0, ch;
        for (;i < l; i++) {
            ch = text.charCodeAt(i);
            if (Math.random() > .5) {
                ch = "x" + ch.toString(16);
            }
            out += "&#" + ch + ";";
        }
        return out;
    };
    function Parser(options) {
        this.tokens = [];
        this.token = null;
        this.options = options || marked.defaults;
    }
    Parser.parse = function(src, options) {
        var parser = new Parser(options);
        return parser.parse(src);
    };
    Parser.prototype.parse = function(src) {
        this.inline = new InlineLexer(src.links, this.options);
        this.tokens = src.reverse();
        var out = "";
        while (this.next()) {
            out += this.tok();
        }
        return out;
    };
    Parser.prototype.next = function() {
        return this.token = this.tokens.pop();
    };
    Parser.prototype.peek = function() {
        return this.tokens[this.tokens.length - 1] || 0;
    };
    Parser.prototype.parseText = function() {
        var body = this.token.text;
        while (this.peek().type === "text") {
            body += "\n" + this.next().text;
        }
        return this.inline.output(body);
    };
    Parser.prototype.tok = function() {
        switch (this.token.type) {
          case "space":
            {
                return "";
            }

          case "hr":
            {
                return "<hr>\n";
            }

          case "heading":
            {
                return "<h" + this.token.depth + ">" + this.inline.output(this.token.text) + "</h" + this.token.depth + ">\n";
            }

          case "code":
            {
                if (this.options.highlight) {
                    var code = this.options.highlight(this.token.text, this.token.lang);
                    if (code != null && code !== this.token.text) {
                        this.token.escaped = true;
                        this.token.text = code;
                    }
                }
                if (!this.token.escaped) {
                    this.token.text = escape(this.token.text, true);
                }
                return "<pre><code" + (this.token.lang ? ' class="' + this.options.langPrefix + this.token.lang + '"' : "") + ">" + this.token.text + "</code></pre>\n";
            }

          case "table":
            {
                var body = "", heading, i, row, cell, j;
                body += "<thead>\n<tr>\n";
                for (i = 0; i < this.token.header.length; i++) {
                    heading = this.inline.output(this.token.header[i]);
                    body += this.token.align[i] ? '<th align="' + this.token.align[i] + '">' + heading + "</th>\n" : "<th>" + heading + "</th>\n";
                }
                body += "</tr>\n</thead>\n";
                body += "<tbody>\n";
                for (i = 0; i < this.token.cells.length; i++) {
                    row = this.token.cells[i];
                    body += "<tr>\n";
                    for (j = 0; j < row.length; j++) {
                        cell = this.inline.output(row[j]);
                        body += this.token.align[j] ? '<td align="' + this.token.align[j] + '">' + cell + "</td>\n" : "<td>" + cell + "</td>\n";
                    }
                    body += "</tr>\n";
                }
                body += "</tbody>\n";
                return "<table>\n" + body + "</table>\n";
            }

          case "blockquote_start":
            {
                var body = "";
                while (this.next().type !== "blockquote_end") {
                    body += this.tok();
                }
                return "<blockquote>\n" + body + "</blockquote>\n";
            }

          case "list_start":
            {
                var type = this.token.ordered ? "ol" : "ul", body = "";
                while (this.next().type !== "list_end") {
                    body += this.tok();
                }
                return "<" + type + ">\n" + body + "</" + type + ">\n";
            }

          case "list_item_start":
            {
                var body = "";
                while (this.next().type !== "list_item_end") {
                    body += this.token.type === "text" ? this.parseText() : this.tok();
                }
                return "<li>" + body + "</li>\n";
            }

          case "loose_item_start":
            {
                var body = "";
                while (this.next().type !== "list_item_end") {
                    body += this.tok();
                }
                return "<li>" + body + "</li>\n";
            }

          case "html":
            {
                return !this.token.pre && !this.options.pedantic ? this.inline.output(this.token.text) : this.token.text;
            }

          case "paragraph":
            {
                return "<p>" + this.inline.output(this.token.text) + "</p>\n";
            }

          case "text":
            {
                return "<p>" + this.parseText() + "</p>\n";
            }
        }
    };
    function escape(html, encode) {
        return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    function replace(regex, opt) {
        regex = regex.source;
        opt = opt || "";
        return function self(name, val) {
            if (!name) return new RegExp(regex, opt);
            val = val.source || val;
            val = val.replace(/(^|[^\[])\^/g, "$1");
            regex = regex.replace(name, val);
            return self;
        };
    }
    function noop() {}
    noop.exec = noop;
    function merge(obj) {
        var i = 1, target, key;
        for (;i < arguments.length; i++) {
            target = arguments[i];
            for (key in target) {
                if (Object.prototype.hasOwnProperty.call(target, key)) {
                    obj[key] = target[key];
                }
            }
        }
        return obj;
    }
    function marked(src, opt, callback) {
        if (callback || typeof opt === "function") {
            if (!callback) {
                callback = opt;
                opt = null;
            }
            if (opt) opt = merge({}, marked.defaults, opt);
            var tokens = Lexer.lex(tokens, opt), highlight = opt.highlight, pending = 0, l = tokens.length, i = 0;
            if (!highlight || highlight.length < 3) {
                return callback(null, Parser.parse(tokens, opt));
            }
            var done = function() {
                delete opt.highlight;
                var out = Parser.parse(tokens, opt);
                opt.highlight = highlight;
                return callback(null, out);
            };
            for (;i < l; i++) {
                (function(token) {
                    if (token.type !== "code") return;
                    pending++;
                    return highlight(token.text, token.lang, function(err, code) {
                        if (code == null || code === token.text) {
                            return --pending || done();
                        }
                        token.text = code;
                        token.escaped = true;
                        --pending || done();
                    });
                })(tokens[i]);
            }
            return;
        }
        try {
            if (opt) opt = merge({}, marked.defaults, opt);
            return Parser.parse(Lexer.lex(src, opt), opt);
        } catch (e) {
            e.message += "\nPlease report this to https://github.com/chjj/marked.";
            if ((opt || marked.defaults).silent) {
                return "<p>An error occured:</p><pre>" + escape(e.message + "", true) + "</pre>";
            }
            throw e;
        }
    }
    marked.options = marked.setOptions = function(opt) {
        merge(marked.defaults, opt);
        return marked;
    };
    marked.defaults = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: false,
        silent: false,
        highlight: null,
        langPrefix: "lang-"
    };
    marked.Parser = Parser;
    marked.parser = Parser.parse;
    marked.Lexer = Lexer;
    marked.lexer = Lexer.lex;
    marked.InlineLexer = InlineLexer;
    marked.inlineLexer = InlineLexer.output;
    marked.parse = marked;
    if (typeof exports === "object") {
        module.exports = marked;
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return marked;
        });
    } else {
        this.marked = marked;
    }
}).call(function() {
    return this || (typeof window !== "undefined" ? window : global);
}());

(function(e) {
    function O(e, t) {
        return function(n) {
            return j(e.call(this, n), t);
        };
    }
    function M(e) {
        return function(t) {
            return this.lang().ordinal(e.call(this, t));
        };
    }
    function _() {}
    function D(e) {
        H(this, e);
    }
    function P(e) {
        var t = this._data = {}, n = e.years || e.year || e.y || 0, r = e.months || e.month || e.M || 0, i = e.weeks || e.week || e.w || 0, s = e.days || e.day || e.d || 0, o = e.hours || e.hour || e.h || 0, u = e.minutes || e.minute || e.m || 0, a = e.seconds || e.second || e.s || 0, f = e.milliseconds || e.millisecond || e.ms || 0;
        this._milliseconds = f + a * 1e3 + u * 6e4 + o * 36e5, this._days = s + i * 7, this._months = r + n * 12, 
        t.milliseconds = f % 1e3, a += B(f / 1e3), t.seconds = a % 60, u += B(a / 60), t.minutes = u % 60, 
        o += B(u / 60), t.hours = o % 24, s += B(o / 24), s += i * 7, t.days = s % 30, r += B(s / 30), 
        t.months = r % 12, n += B(r / 12), t.years = n;
    }
    function H(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
    }
    function B(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e);
    }
    function j(e, t) {
        var n = e + "";
        while (n.length < t) n = "0" + n;
        return n;
    }
    function F(e, t, n) {
        var r = t._milliseconds, i = t._days, s = t._months, o;
        r && e._d.setTime(+e + r * n), i && e.date(e.date() + i * n), s && (o = e.date(), 
        e.date(1).month(e.month() + s * n).date(Math.min(o, e.daysInMonth())));
    }
    function I(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
    }
    function q(e, t) {
        var n = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), i = 0, s;
        for (s = 0; s < n; s++) ~~e[s] !== ~~t[s] && i++;
        return i + r;
    }
    function R(e, t) {
        return t.abbr = e, s[e] || (s[e] = new _()), s[e].set(t), s[e];
    }
    function U(e) {
        return e ? (!s[e] && o && require("./lang/" + e), s[e]) : t.fn._lang;
    }
    function z(e) {
        return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
    }
    function W(e) {
        var t = e.match(a), n, r;
        for (n = 0, r = t.length; n < r; n++) A[t[n]] ? t[n] = A[t[n]] : t[n] = z(t[n]);
        return function(i) {
            var s = "";
            for (n = 0; n < r; n++) s += typeof t[n].call == "function" ? t[n].call(i, e) : t[n];
            return s;
        };
    }
    function X(e, t) {
        function r(t) {
            return e.lang().longDateFormat(t) || t;
        }
        var n = 5;
        while (n-- && f.test(t)) t = t.replace(f, r);
        return C[t] || (C[t] = W(t)), C[t](e);
    }
    function V(e) {
        switch (e) {
          case "DDDD":
            return p;

          case "YYYY":
            return d;

          case "YYYYY":
            return v;

          case "S":
          case "SS":
          case "SSS":
          case "DDD":
            return h;

          case "MMM":
          case "MMMM":
          case "dd":
          case "ddd":
          case "dddd":
          case "a":
          case "A":
            return m;

          case "X":
            return b;

          case "Z":
          case "ZZ":
            return g;

          case "T":
            return y;

          case "MM":
          case "DD":
          case "YY":
          case "HH":
          case "hh":
          case "mm":
          case "ss":
          case "M":
          case "D":
          case "d":
          case "H":
          case "h":
          case "m":
          case "s":
            return c;

          default:
            return new RegExp(e.replace("\\", ""));
        }
    }
    function $(e, t, n) {
        var r, i, s = n._a;
        switch (e) {
          case "M":
          case "MM":
            s[1] = t == null ? 0 : ~~t - 1;
            break;

          case "MMM":
          case "MMMM":
            r = U(n._l).monthsParse(t), r != null ? s[1] = r : n._isValid = !1;
            break;

          case "D":
          case "DD":
          case "DDD":
          case "DDDD":
            t != null && (s[2] = ~~t);
            break;

          case "YY":
            s[0] = ~~t + (~~t > 68 ? 1900 : 2e3);
            break;

          case "YYYY":
          case "YYYYY":
            s[0] = ~~t;
            break;

          case "a":
          case "A":
            n._isPm = (t + "").toLowerCase() === "pm";
            break;

          case "H":
          case "HH":
          case "h":
          case "hh":
            s[3] = ~~t;
            break;

          case "m":
          case "mm":
            s[4] = ~~t;
            break;

          case "s":
          case "ss":
            s[5] = ~~t;
            break;

          case "S":
          case "SS":
          case "SSS":
            s[6] = ~~(("0." + t) * 1e3);
            break;

          case "X":
            n._d = new Date(parseFloat(t) * 1e3);
            break;

          case "Z":
          case "ZZ":
            n._useUTC = !0, r = (t + "").match(x), r && r[1] && (n._tzh = ~~r[1]), r && r[2] && (n._tzm = ~~r[2]), 
            r && r[0] === "+" && (n._tzh = -n._tzh, n._tzm = -n._tzm);
        }
        t == null && (n._isValid = !1);
    }
    function J(e) {
        var t, n, r = [];
        if (e._d) return;
        for (t = 0; t < 7; t++) e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
        r[3] += e._tzh || 0, r[4] += e._tzm || 0, n = new Date(0), e._useUTC ? (n.setUTCFullYear(r[0], r[1], r[2]), 
        n.setUTCHours(r[3], r[4], r[5], r[6])) : (n.setFullYear(r[0], r[1], r[2]), n.setHours(r[3], r[4], r[5], r[6])), 
        e._d = n;
    }
    function K(e) {
        var t = e._f.match(a), n = e._i, r, i;
        e._a = [];
        for (r = 0; r < t.length; r++) i = (V(t[r]).exec(n) || [])[0], i && (n = n.slice(n.indexOf(i) + i.length)), 
        A[t[r]] && $(t[r], i, e);
        e._isPm && e._a[3] < 12 && (e._a[3] += 12), e._isPm === !1 && e._a[3] === 12 && (e._a[3] = 0), 
        J(e);
    }
    function Q(e) {
        var t, n, r, i = 99, s, o, u;
        while (e._f.length) {
            t = H({}, e), t._f = e._f.pop(), K(t), n = new D(t);
            if (n.isValid()) {
                r = n;
                break;
            }
            u = q(t._a, n.toArray()), u < i && (i = u, r = n);
        }
        H(e, r);
    }
    function G(e) {
        var t, n = e._i;
        if (w.exec(n)) {
            e._f = "YYYY-MM-DDT";
            for (t = 0; t < 4; t++) if (S[t][1].exec(n)) {
                e._f += S[t][0];
                break;
            }
            g.exec(n) && (e._f += " Z"), K(e);
        } else e._d = new Date(n);
    }
    function Y(t) {
        var n = t._i, r = u.exec(n);
        n === e ? t._d = new Date() : r ? t._d = new Date(+r[1]) : typeof n == "string" ? G(t) : I(n) ? (t._a = n.slice(0), 
        J(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n);
    }
    function Z(e, t, n, r, i) {
        return i.relativeTime(t || 1, !!n, e, r);
    }
    function et(e, t, n) {
        var i = r(Math.abs(e) / 1e3), s = r(i / 60), o = r(s / 60), u = r(o / 24), a = r(u / 365), f = i < 45 && [ "s", i ] || s === 1 && [ "m" ] || s < 45 && [ "mm", s ] || o === 1 && [ "h" ] || o < 22 && [ "hh", o ] || u === 1 && [ "d" ] || u <= 25 && [ "dd", u ] || u <= 45 && [ "M" ] || u < 345 && [ "MM", r(u / 30) ] || a === 1 && [ "y" ] || [ "yy", a ];
        return f[2] = t, f[3] = e > 0, f[4] = n, Z.apply({}, f);
    }
    function tt(e, n, r) {
        var i = r - n, s = r - e.day();
        return s > i && (s -= 7), s < i - 7 && (s += 7), Math.ceil(t(e).add("d", s).dayOfYear() / 7);
    }
    function nt(e) {
        var n = e._i, r = e._f;
        return n === null || n === "" ? null : (typeof n == "string" && (e._i = n = U().preparse(n)), 
        t.isMoment(n) ? (e = H({}, n), e._d = new Date(+n._d)) : r ? I(r) ? Q(e) : K(e) : Y(e), 
        new D(e));
    }
    function rt(e, n) {
        t.fn[e] = t.fn[e + "s"] = function(e) {
            var t = this._isUTC ? "UTC" : "";
            return e != null ? (this._d["set" + t + n](e), this) : this._d["get" + t + n]();
        };
    }
    function it(e) {
        t.duration.fn[e] = function() {
            return this._data[e];
        };
    }
    function st(e, n) {
        t.duration.fn["as" + e] = function() {
            return +this / n;
        };
    }
    var t, n = "2.0.0", r = Math.round, i, s = {}, o = typeof module != "undefined" && module.exports, u = /^\/?Date\((\-?\d+)/i, a = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, f = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, l = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi, c = /\d\d?/, h = /\d{1,3}/, p = /\d{3}/, d = /\d{1,4}/, v = /[+\-]?\d{1,6}/, m = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i, g = /Z|[\+\-]\d\d:?\d\d/i, y = /T/i, b = /[\+\-]?\d+(\.\d{1,3})?/, w = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, E = "YYYY-MM-DDTHH:mm:ssZ", S = [ [ "HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], x = /([\+\-]|\d\d)/gi, T = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"), N = {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }, C = {}, k = "DDD w W M D d".split(" "), L = "M D H h m s w W".split(" "), A = {
        M: function() {
            return this.month() + 1;
        },
        MMM: function(e) {
            return this.lang().monthsShort(this, e);
        },
        MMMM: function(e) {
            return this.lang().months(this, e);
        },
        D: function() {
            return this.date();
        },
        DDD: function() {
            return this.dayOfYear();
        },
        d: function() {
            return this.day();
        },
        dd: function(e) {
            return this.lang().weekdaysMin(this, e);
        },
        ddd: function(e) {
            return this.lang().weekdaysShort(this, e);
        },
        dddd: function(e) {
            return this.lang().weekdays(this, e);
        },
        w: function() {
            return this.week();
        },
        W: function() {
            return this.isoWeek();
        },
        YY: function() {
            return j(this.year() % 100, 2);
        },
        YYYY: function() {
            return j(this.year(), 4);
        },
        YYYYY: function() {
            return j(this.year(), 5);
        },
        a: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !0);
        },
        A: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !1);
        },
        H: function() {
            return this.hours();
        },
        h: function() {
            return this.hours() % 12 || 12;
        },
        m: function() {
            return this.minutes();
        },
        s: function() {
            return this.seconds();
        },
        S: function() {
            return ~~(this.milliseconds() / 100);
        },
        SS: function() {
            return j(~~(this.milliseconds() / 10), 2);
        },
        SSS: function() {
            return j(this.milliseconds(), 3);
        },
        Z: function() {
            var e = -this.zone(), t = "+";
            return e < 0 && (e = -e, t = "-"), t + j(~~(e / 60), 2) + ":" + j(~~e % 60, 2);
        },
        ZZ: function() {
            var e = -this.zone(), t = "+";
            return e < 0 && (e = -e, t = "-"), t + j(~~(10 * e / 6), 4);
        },
        X: function() {
            return this.unix();
        }
    };
    while (k.length) i = k.pop(), A[i + "o"] = M(A[i]);
    while (L.length) i = L.pop(), A[i + i] = O(A[i], 2);
    A.DDDD = O(A.DDD, 3), _.prototype = {
        set: function(e) {
            var t, n;
            for (n in e) t = e[n], typeof t == "function" ? this[n] = t : this["_" + n] = t;
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(e) {
            return this._months[e.month()];
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(e) {
            return this._monthsShort[e.month()];
        },
        monthsParse: function(e) {
            var n, r, i, s;
            this._monthsParse || (this._monthsParse = []);
            for (n = 0; n < 12; n++) {
                this._monthsParse[n] || (r = t([ 2e3, n ]), i = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), 
                this._monthsParse[n] = new RegExp(i.replace(".", ""), "i"));
                if (this._monthsParse[n].test(e)) return n;
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(e) {
            return this._weekdays[e.day()];
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(e) {
            return this._weekdaysShort[e.day()];
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(e) {
            return this._weekdaysMin[e.day()];
        },
        _longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D YYYY",
            LLL: "MMMM D YYYY LT",
            LLLL: "dddd, MMMM D YYYY LT"
        },
        longDateFormat: function(e) {
            var t = this._longDateFormat[e];
            return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
                return e.slice(1);
            }), this._longDateFormat[e] = t), t;
        },
        meridiem: function(e, t, n) {
            return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(e, t) {
            var n = this._calendar[e];
            return typeof n == "function" ? n.apply(t) : n;
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(e, t, n, r) {
            var i = this._relativeTime[n];
            return typeof i == "function" ? i(e, t, n, r) : i.replace(/%d/i, e);
        },
        pastFuture: function(e, t) {
            var n = this._relativeTime[e > 0 ? "future" : "past"];
            return typeof n == "function" ? n(t) : n.replace(/%s/i, t);
        },
        ordinal: function(e) {
            return this._ordinal.replace("%d", e);
        },
        _ordinal: "%d",
        preparse: function(e) {
            return e;
        },
        postformat: function(e) {
            return e;
        },
        week: function(e) {
            return tt(e, this._week.dow, this._week.doy);
        },
        _week: {
            dow: 0,
            doy: 6
        }
    }, t = function(e, t, n) {
        return nt({
            _i: e,
            _f: t,
            _l: n,
            _isUTC: !1
        });
    }, t.utc = function(e, t, n) {
        return nt({
            _useUTC: !0,
            _isUTC: !0,
            _l: n,
            _i: e,
            _f: t
        });
    }, t.unix = function(e) {
        return t(e * 1e3);
    }, t.duration = function(e, n) {
        var r = t.isDuration(e), i = typeof e == "number", s = r ? e._data : i ? {} : e, o;
        return i && (n ? s[n] = e : s.milliseconds = e), o = new P(s), r && e.hasOwnProperty("_lang") && (o._lang = e._lang), 
        o;
    }, t.version = n, t.defaultFormat = E, t.lang = function(e, n) {
        var r;
        if (!e) return t.fn._lang._abbr;
        n ? R(e, n) : s[e] || U(e), t.duration.fn._lang = t.fn._lang = U(e);
    }, t.langData = function(e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), U(e);
    }, t.isMoment = function(e) {
        return e instanceof D;
    }, t.isDuration = function(e) {
        return e instanceof P;
    }, t.fn = D.prototype = {
        clone: function() {
            return t(this);
        },
        valueOf: function() {
            return +this._d;
        },
        unix: function() {
            return Math.floor(+this._d / 1e3);
        },
        toString: function() {
            return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },
        toDate: function() {
            return this._d;
        },
        toJSON: function() {
            return t.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        },
        toArray: function() {
            var e = this;
            return [ e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds() ];
        },
        isValid: function() {
            return this._isValid == null && (this._a ? this._isValid = !q(this._a, (this._isUTC ? t.utc(this._a) : t(this._a)).toArray()) : this._isValid = !isNaN(this._d.getTime())), 
            !!this._isValid;
        },
        utc: function() {
            return this._isUTC = !0, this;
        },
        local: function() {
            return this._isUTC = !1, this;
        },
        format: function(e) {
            var n = X(this, e || t.defaultFormat);
            return this.lang().postformat(n);
        },
        add: function(e, n) {
            var r;
            return typeof e == "string" ? r = t.duration(+n, e) : r = t.duration(e, n), F(this, r, 1), 
            this;
        },
        subtract: function(e, n) {
            var r;
            return typeof e == "string" ? r = t.duration(+n, e) : r = t.duration(e, n), F(this, r, -1), 
            this;
        },
        diff: function(e, n, r) {
            var i = this._isUTC ? t(e).utc() : t(e).local(), s = (this.zone() - i.zone()) * 6e4, o, u;
            return n && (n = n.replace(/s$/, "")), n === "year" || n === "month" ? (o = (this.daysInMonth() + i.daysInMonth()) * 432e5, 
            u = (this.year() - i.year()) * 12 + (this.month() - i.month()), u += (this - t(this).startOf("month") - (i - t(i).startOf("month"))) / o, 
            n === "year" && (u /= 12)) : (o = this - i - s, u = n === "second" ? o / 1e3 : n === "minute" ? o / 6e4 : n === "hour" ? o / 36e5 : n === "day" ? o / 864e5 : n === "week" ? o / 6048e5 : o), 
            r ? u : B(u);
        },
        from: function(e, n) {
            return t.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!n);
        },
        fromNow: function(e) {
            return this.from(t(), e);
        },
        calendar: function() {
            var e = this.diff(t().startOf("day"), "days", !0), n = e < -6 ? "sameElse" : e < -1 ? "lastWeek" : e < 0 ? "lastDay" : e < 1 ? "sameDay" : e < 2 ? "nextDay" : e < 7 ? "nextWeek" : "sameElse";
            return this.format(this.lang().calendar(n, this));
        },
        isLeapYear: function() {
            var e = this.year();
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
        },
        isDST: function() {
            return this.zone() < t([ this.year() ]).zone() || this.zone() < t([ this.year(), 5 ]).zone();
        },
        day: function(e) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return e == null ? t : this.add({
                d: e - t
            });
        },
        startOf: function(e) {
            e = e.replace(/s$/, "");
            switch (e) {
              case "year":
                this.month(0);

              case "month":
                this.date(1);

              case "week":
              case "day":
                this.hours(0);

              case "hour":
                this.minutes(0);

              case "minute":
                this.seconds(0);

              case "second":
                this.milliseconds(0);
            }
            return e === "week" && this.day(0), this;
        },
        endOf: function(e) {
            return this.startOf(e).add(e.replace(/s?$/, "s"), 1).subtract("ms", 1);
        },
        isAfter: function(e, n) {
            return n = typeof n != "undefined" ? n : "millisecond", +this.clone().startOf(n) > +t(e).startOf(n);
        },
        isBefore: function(e, n) {
            return n = typeof n != "undefined" ? n : "millisecond", +this.clone().startOf(n) < +t(e).startOf(n);
        },
        isSame: function(e, n) {
            return n = typeof n != "undefined" ? n : "millisecond", +this.clone().startOf(n) === +t(e).startOf(n);
        },
        zone: function() {
            return this._isUTC ? 0 : this._d.getTimezoneOffset();
        },
        daysInMonth: function() {
            return t.utc([ this.year(), this.month() + 1, 0 ]).date();
        },
        dayOfYear: function(e) {
            var n = r((t(this).startOf("day") - t(this).startOf("year")) / 864e5) + 1;
            return e == null ? n : this.add("d", e - n);
        },
        isoWeek: function(e) {
            var t = tt(this, 1, 4);
            return e == null ? t : this.add("d", (e - t) * 7);
        },
        week: function(e) {
            var t = this.lang().week(this);
            return e == null ? t : this.add("d", (e - t) * 7);
        },
        lang: function(t) {
            return t === e ? this._lang : (this._lang = U(t), this);
        }
    };
    for (i = 0; i < T.length; i++) rt(T[i].toLowerCase().replace(/s$/, ""), T[i]);
    rt("year", "FullYear"), t.fn.days = t.fn.day, t.fn.weeks = t.fn.week, t.fn.isoWeeks = t.fn.isoWeek, 
    t.duration.fn = P.prototype = {
        weeks: function() {
            return B(this.days() / 7);
        },
        valueOf: function() {
            return this._milliseconds + this._days * 864e5 + this._months * 2592e6;
        },
        humanize: function(e) {
            var t = +this, n = et(t, !e, this.lang());
            return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n);
        },
        lang: t.fn.lang
    };
    for (i in N) N.hasOwnProperty(i) && (st(i, N[i]), it(i.toLowerCase()));
    st("Weeks", 6048e5), t.lang("en", {
        ordinal: function(e) {
            var t = e % 10, n = ~~(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return e + n;
        }
    }), o && (module.exports = t), typeof ender == "undefined" && (this.moment = t), 
    typeof define == "function" && define.amd && define("moment", [], function() {
        return t;
    });
}).call(this);

(function() {
    var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, d = e.filter, g = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, _ = Object.keys, j = i.bind, w = function(n) {
        return n instanceof w ? n : this instanceof w ? (this._wrapped = n, void 0) : new w(n);
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = w), 
    exports._ = w) : n._ = w, w.VERSION = "1.4.4";
    var A = w.each = w.forEach = function(n, t, e) {
        if (null != n) if (s && n.forEach === s) n.forEach(t, e); else if (n.length === +n.length) {
            for (var u = 0, i = n.length; i > u; u++) if (t.call(e, n[u], u, n) === r) return;
        } else for (var a in n) if (w.has(n, a) && t.call(e, n[a], a, n) === r) return;
    };
    w.map = w.collect = function(n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
            e[e.length] = t.call(r, n, u, i);
        }), e);
    };
    var O = "Reduce of empty array with no initial value";
    w.reduce = w.foldl = w.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduce === h) return e && (t = w.bind(t, e)), 
        u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function(n, i, a) {
            u ? r = t.call(e, r, n, i, a) : (r = n, u = !0);
        }), !u) throw new TypeError(O);
        return r;
    }, w.reduceRight = w.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduceRight === v) return e && (t = w.bind(t, e)), 
        u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = w.keys(n);
            i = a.length;
        }
        if (A(n, function(o, c, l) {
            c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0);
        }), !u) throw new TypeError(O);
        return r;
    }, w.find = w.detect = function(n, t, r) {
        var e;
        return E(n, function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0;
        }), e;
    }, w.filter = w.select = function(n, t, r) {
        var e = [];
        return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function(n, u, i) {
            t.call(r, n, u, i) && (e[e.length] = n);
        }), e);
    }, w.reject = function(n, t, r) {
        return w.filter(n, function(n, e, u) {
            return !t.call(r, n, e, u);
        }, r);
    }, w.every = w.all = function(n, t, e) {
        t || (t = w.identity);
        var u = !0;
        return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r;
        }), !!u);
    };
    var E = w.some = w.any = function(n, t, e) {
        t || (t = w.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0;
        }), !!u);
    };
    w.contains = w.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : E(n, function(n) {
            return n === t;
        });
    }, w.invoke = function(n, t) {
        var r = o.call(arguments, 2), e = w.isFunction(t);
        return w.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r);
        });
    }, w.pluck = function(n, t) {
        return w.map(n, function(n) {
            return n[t];
        });
    }, w.where = function(n, t, r) {
        return w.isEmpty(t) ? r ? null : [] : w[r ? "find" : "filter"](n, function(n) {
            for (var r in t) if (t[r] !== n[r]) return !1;
            return !0;
        });
    }, w.findWhere = function(n, t) {
        return w.where(n, t, !0);
    }, w.max = function(n, t, r) {
        if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.max.apply(Math, n);
        if (!t && w.isEmpty(n)) return -1 / 0;
        var e = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a >= e.computed && (e = {
                value: n,
                computed: a
            });
        }), e.value;
    }, w.min = function(n, t, r) {
        if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.min.apply(Math, n);
        if (!t && w.isEmpty(n)) return 1 / 0;
        var e = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            e.computed > a && (e = {
                value: n,
                computed: a
            });
        }), e.value;
    }, w.shuffle = function(n) {
        var t, r = 0, e = [];
        return A(n, function(n) {
            t = w.random(r++), e[r - 1] = e[t], e[t] = n;
        }), e;
    };
    var k = function(n) {
        return w.isFunction(n) ? n : function(t) {
            return t[n];
        };
    };
    w.sortBy = function(n, t, r) {
        var e = k(t);
        return w.pluck(w.map(n, function(n, t, u) {
            return {
                value: n,
                index: t,
                criteria: e.call(r, n, t, u)
            };
        }).sort(function(n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1;
            }
            return n.index < t.index ? -1 : 1;
        }), "value");
    };
    var F = function(n, t, r, e) {
        var u = {}, i = k(t || w.identity);
        return A(n, function(t, a) {
            var o = i.call(r, t, a, n);
            e(u, o, t);
        }), u;
    };
    w.groupBy = function(n, t, r) {
        return F(n, t, r, function(n, t, r) {
            (w.has(n, t) ? n[t] : n[t] = []).push(r);
        });
    }, w.countBy = function(n, t, r) {
        return F(n, t, r, function(n, t) {
            w.has(n, t) || (n[t] = 0), n[t]++;
        });
    }, w.sortedIndex = function(n, t, r, e) {
        r = null == r ? w.identity : k(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i; ) {
            var o = i + a >>> 1;
            u > r.call(e, n[o]) ? i = o + 1 : a = o;
        }
        return i;
    }, w.toArray = function(n) {
        return n ? w.isArray(n) ? o.call(n) : n.length === +n.length ? w.map(n, w.identity) : w.values(n) : [];
    }, w.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : w.keys(n).length;
    }, w.first = w.head = w.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t);
    }, w.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t));
    }, w.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0));
    }, w.rest = w.tail = w.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t);
    }, w.compact = function(n) {
        return w.filter(n, w.identity);
    };
    var R = function(n, t, r) {
        return A(n, function(n) {
            w.isArray(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n);
        }), r;
    };
    w.flatten = function(n, t) {
        return R(n, t, []);
    }, w.without = function(n) {
        return w.difference(n, o.call(arguments, 1));
    }, w.uniq = w.unique = function(n, t, r, e) {
        w.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? w.map(n, r, e) : n, i = [], a = [];
        return A(u, function(r, e) {
            (t ? e && a[a.length - 1] === r : w.contains(a, r)) || (a.push(r), i.push(n[e]));
        }), i;
    }, w.union = function() {
        return w.uniq(c.apply(e, arguments));
    }, w.intersection = function(n) {
        var t = o.call(arguments, 1);
        return w.filter(w.uniq(n), function(n) {
            return w.every(t, function(t) {
                return w.indexOf(t, n) >= 0;
            });
        });
    }, w.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return w.filter(n, function(n) {
            return !w.contains(t, n);
        });
    }, w.zip = function() {
        for (var n = o.call(arguments), t = w.max(w.pluck(n, "length")), r = Array(t), e = 0; t > e; e++) r[e] = w.pluck(n, "" + e);
        return r;
    }, w.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r;
    }, w.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0, u = n.length;
        if (r) {
            if ("number" != typeof r) return e = w.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r;
        }
        if (y && n.indexOf === y) return n.indexOf(t, r);
        for (;u > e; e++) if (n[e] === t) return e;
        return -1;
    }, w.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--; ) if (n[u] === t) return u;
        return -1;
    }, w.range = function(n, t, r) {
        1 >= arguments.length && (t = n || 0, n = 0), r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = Array(e); e > u; ) i[u++] = n, 
        n += r;
        return i;
    }, w.bind = function(n, t) {
        if (n.bind === j && j) return j.apply(n, o.call(arguments, 1));
        var r = o.call(arguments, 2);
        return function() {
            return n.apply(t, r.concat(o.call(arguments)));
        };
    }, w.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            return n.apply(this, t.concat(o.call(arguments)));
        };
    }, w.bindAll = function(n) {
        var t = o.call(arguments, 1);
        return 0 === t.length && (t = w.functions(n)), A(t, function(t) {
            n[t] = w.bind(n[t], n);
        }), n;
    }, w.memoize = function(n, t) {
        var r = {};
        return t || (t = w.identity), function() {
            var e = t.apply(this, arguments);
            return w.has(r, e) ? r[e] : r[e] = n.apply(this, arguments);
        };
    }, w.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r);
        }, t);
    }, w.defer = function(n) {
        return w.delay.apply(w, [ n, 1 ].concat(o.call(arguments, 1)));
    }, w.throttle = function(n, t) {
        var r, e, u, i, a = 0, o = function() {
            a = new Date(), u = null, i = n.apply(r, e);
        };
        return function() {
            var c = new Date(), l = t - (c - a);
            return r = this, e = arguments, 0 >= l ? (clearTimeout(u), u = null, a = c, i = n.apply(r, e)) : u || (u = setTimeout(o, l)), 
            i;
        };
    }, w.debounce = function(n, t, r) {
        var e, u;
        return function() {
            var i = this, a = arguments, o = function() {
                e = null, r || (u = n.apply(i, a));
            }, c = r && !e;
            return clearTimeout(e), e = setTimeout(o, t), c && (u = n.apply(i, a)), u;
        };
    }, w.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t);
        };
    }, w.wrap = function(n, t) {
        return function() {
            var r = [ n ];
            return a.apply(r, arguments), t.apply(this, r);
        };
    }, w.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [ n[r].apply(this, t) ];
            return t[0];
        };
    }, w.after = function(n, t) {
        return 0 >= n ? t() : function() {
            return 1 > --n ? t.apply(this, arguments) : void 0;
        };
    }, w.keys = _ || function(n) {
        if (n !== Object(n)) throw new TypeError("Invalid object");
        var t = [];
        for (var r in n) w.has(n, r) && (t[t.length] = r);
        return t;
    }, w.values = function(n) {
        var t = [];
        for (var r in n) w.has(n, r) && t.push(n[r]);
        return t;
    }, w.pairs = function(n) {
        var t = [];
        for (var r in n) w.has(n, r) && t.push([ r, n[r] ]);
        return t;
    }, w.invert = function(n) {
        var t = {};
        for (var r in n) w.has(n, r) && (t[n[r]] = r);
        return t;
    }, w.functions = w.methods = function(n) {
        var t = [];
        for (var r in n) w.isFunction(n[r]) && t.push(r);
        return t.sort();
    }, w.extend = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t) for (var r in t) n[r] = t[r];
        }), n;
    }, w.pick = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        return A(r, function(r) {
            r in n && (t[r] = n[r]);
        }), t;
    }, w.omit = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        for (var u in n) w.contains(r, u) || (t[u] = n[u]);
        return t;
    }, w.defaults = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t) for (var r in t) null == n[r] && (n[r] = t[r]);
        }), n;
    }, w.clone = function(n) {
        return w.isObject(n) ? w.isArray(n) ? n.slice() : w.extend({}, n) : n;
    }, w.tap = function(n, t) {
        return t(n), n;
    };
    var I = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof w && (n = n._wrapped), t instanceof w && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t)) return !1;
        switch (u) {
          case "[object String]":
            return n == t + "";

          case "[object Number]":
            return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;

          case "[object Date]":
          case "[object Boolean]":
            return +n == +t;

          case "[object RegExp]":
            return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase;
        }
        if ("object" != typeof n || "object" != typeof t) return !1;
        for (var i = r.length; i--; ) if (r[i] == n) return e[i] == t;
        r.push(n), e.push(t);
        var a = 0, o = !0;
        if ("[object Array]" == u) {
            if (a = n.length, o = a == t.length) for (;a-- && (o = I(n[a], t[a], r, e)); ) ;
        } else {
            var c = n.constructor, f = t.constructor;
            if (c !== f && !(w.isFunction(c) && c instanceof c && w.isFunction(f) && f instanceof f)) return !1;
            for (var s in n) if (w.has(n, s) && (a++, !(o = w.has(t, s) && I(n[s], t[s], r, e)))) break;
            if (o) {
                for (s in t) if (w.has(t, s) && !a--) break;
                o = !a;
            }
        }
        return r.pop(), e.pop(), o;
    };
    w.isEqual = function(n, t) {
        return I(n, t, [], []);
    }, w.isEmpty = function(n) {
        if (null == n) return !0;
        if (w.isArray(n) || w.isString(n)) return 0 === n.length;
        for (var t in n) if (w.has(n, t)) return !1;
        return !0;
    }, w.isElement = function(n) {
        return !(!n || 1 !== n.nodeType);
    }, w.isArray = x || function(n) {
        return "[object Array]" == l.call(n);
    }, w.isObject = function(n) {
        return n === Object(n);
    }, A([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(n) {
        w["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]";
        };
    }), w.isArguments(arguments) || (w.isArguments = function(n) {
        return !(!n || !w.has(n, "callee"));
    }), "function" != typeof /./ && (w.isFunction = function(n) {
        return "function" == typeof n;
    }), w.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n));
    }, w.isNaN = function(n) {
        return w.isNumber(n) && n != +n;
    }, w.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n);
    }, w.isNull = function(n) {
        return null === n;
    }, w.isUndefined = function(n) {
        return n === void 0;
    }, w.has = function(n, t) {
        return f.call(n, t);
    }, w.noConflict = function() {
        return n._ = t, this;
    }, w.identity = function(n) {
        return n;
    }, w.times = function(n, t, r) {
        for (var e = Array(n), u = 0; n > u; u++) e[u] = t.call(r, u);
        return e;
    }, w.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
    };
    var M = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    M.unescape = w.invert(M.escape);
    var S = {
        escape: RegExp("[" + w.keys(M.escape).join("") + "]", "g"),
        unescape: RegExp("(" + w.keys(M.unescape).join("|") + ")", "g")
    };
    w.each([ "escape", "unescape" ], function(n) {
        w[n] = function(t) {
            return null == t ? "" : ("" + t).replace(S[n], function(t) {
                return M[n][t];
            });
        };
    }), w.result = function(n, t) {
        if (null == n) return null;
        var r = n[t];
        return w.isFunction(r) ? r.call(n) : r;
    }, w.mixin = function(n) {
        A(w.functions(n), function(t) {
            var r = w[t] = n[t];
            w.prototype[t] = function() {
                var n = [ this._wrapped ];
                return a.apply(n, arguments), D.call(this, r.apply(w, n));
            };
        });
    };
    var N = 0;
    w.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t : t;
    }, w.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var T = /(.)^/, q = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    w.template = function(n, t, r) {
        var e;
        r = w.defaults({}, r, w.templateSettings);
        var u = RegExp([ (r.escape || T).source, (r.interpolate || T).source, (r.evaluate || T).source ].join("|") + "|$", "g"), i = 0, a = "__p+='";
        n.replace(u, function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(B, function(n) {
                return "\\" + q[n];
            }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), 
            u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t;
        }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = Function(r.variable || "obj", "_", a);
        } catch (o) {
            throw o.source = a, o;
        }
        if (t) return e(t, w);
        var c = function(n) {
            return e.call(this, n, w);
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c;
    }, w.chain = function(n) {
        return w(n).chain();
    };
    var D = function(n) {
        return this._chain ? w(n).chain() : n;
    };
    w.mixin(w), A([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(n) {
        var t = e[n];
        w.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], 
            D.call(this, r);
        };
    }), A([ "concat", "join", "slice" ], function(n) {
        var t = e[n];
        w.prototype[n] = function() {
            return D.call(this, t.apply(this._wrapped, arguments));
        };
    }), w.extend(w.prototype, {
        chain: function() {
            return this._chain = !0, this;
        },
        value: function() {
            return this._wrapped;
        }
    });
}).call(this);

(function() {
    "use strict";
    angular.module("platen.directives", []);
    angular.module("platen.services", []);
    angular.module("platen.models", []);
    angular.module("platen.filters", []);
    var platen = angular.module("platen", [ "platen.models", "platen.directives", "platen.services", "platen.filters", "ui.bootstrap", "ui" ]).config([ "$routeProvider", function($routeProvider) {
        $routeProvider.when("/posts", {
            templateUrl: "views/posts.html"
        });
        $routeProvider.when("/posts/:postId", {
            templateUrl: "views/edit.html"
        });
        $routeProvider.when("/images", {
            templateUrl: "views/images.html"
        });
        $routeProvider.when("/logs", {
            templateUrl: "views/logs.html"
        });
        $routeProvider.when("/about", {
            templateUrl: "views/about.html"
        });
        $routeProvider.otherwise({
            redirectTo: "/posts"
        });
    } ]);
})();

var EditorController = function(Post, $scope, $routeParams, $filter, fileManager, wordpress, logger, resources, settings) {
    var STATUS_DRAFT = "draft";
    var STATUS_PUBLISH = "publish";
    var DEFAULT_IMAGE_ALIGNMENT = "center";
    var POST_TITLE_ID = "post-title";
    var POST_BODY_ID = "post-content";
    var POST_HTML_ID = "post-content-preview";
    var POST_EXCERPT_ID = "post-excerpt";
    var POST_TAGS_ID = "post-tags";
    var POST_CATEGORIES_ID = "post-categories";
    var EDITABLE_ELEMENTS = [ POST_TITLE_ID, POST_BODY_ID, POST_EXCERPT_ID, POST_TAGS_ID, POST_CATEGORIES_ID ];
    var INSERTED_IMAGE_PLACEHOLDER = "[[!@#IMAGE_PLACEHOLDER#@!]]";
    var DELETED_IMAGE_PLACEHOLDER = "!! IMAGE DELETED !!";
    var MESSAGE_PREVIEW_HTML = "Preview as HTML";
    var MESSAGE_PREVIEW_MARKDOWN = "View Markdown";
    var IMAGE_TYPE = "image/png";
    $scope.insertImageDialogOpen = false;
    $scope.configureImageDialogOpen = false;
    $scope.deleteImageConfirmOpen = false;
    $scope.tags = [];
    $scope.categories = [];
    var notifyOnCompletion = function(message, error, isSuccess) {
        if (error) {
            message += ": " + error;
        }
        logger.log(message, "EditorController");
        $scope.$emit(resources.events.PROCESSING_FINISHED, {
            message: message,
            success: isSuccess
        });
    };
    var setFonts = function() {
        settings.load(function(settings) {
            $("#" + POST_TITLE_ID).css("font-family", settings.postTitleFont);
            $("#" + POST_TITLE_ID).css("font-size", settings.postTitleFontSize + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_BODY_ID).css("font-family", settings.postBodyFont);
            $("#" + POST_BODY_ID).css("font-size", settings.postBodyFontSize + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_BODY_ID).css("line-height", settings.postBodyLineHeight + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_HTML_ID).css("font-family", settings.postHtmlFont);
            $("#" + POST_HTML_ID).css("font-size", settings.postHtmlFontSize + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_HTML_ID + " h1").css("font-size", settings.postHtmlH1FontSize + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_HTML_ID + " h2").css("font-size", settings.postHtmlH2FontSize + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_HTML_ID + " h3").css("font-size", settings.postHtmlH3FontSize + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_HTML_ID + " h4").css("font-size", settings.postHtmlH4FontSize + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_HTML_ID + " h5").css("font-size", settings.postHtmlH5FontSize + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_HTML_ID + " h6").css("font-size", settings.postHtmlH6FontSize + resources.typography.UNIT_OF_MEASURE);
            $("#" + POST_HTML_ID).css("line-height", settings.postHtmlLineHeight + resources.typography.UNIT_OF_MEASURE);
            logger.log("set fonts", "EditorController");
        });
    };
    Post.initialize($routeParams.postId, function(post) {
        $scope.post = post;
        $scope.previewOn = false;
        $scope.showMetadata = false;
        $scope.previewMessage = MESSAGE_PREVIEW_HTML;
        logger.log("loaded post '" + $scope.post.title + "'", "EditorController");
        $scope.safeApply();
        $("#" + POST_TITLE_ID).focus();
        setFonts();
    }, function(error) {
        notifyOnCompletion("error loading post", error, false);
    });
    var savePost = function() {
        Post.save(function() {
            $scope.$apply();
            logger.log("saved post '" + $scope.post.title + "' on " + $scope.post.state.lastSaveDate, "EditorController");
        }, function(error) {
            notifyOnCompletion("erorr saving post", error, false);
        });
    };
    $scope.$on(resources.events.ELEMENT_EDITED, function(event, elementId) {
        if (_.contains(EDITABLE_ELEMENTS, elementId)) {
            savePost();
        }
    });
    $scope.$on(resources.events.FONT_CHANGED, function(event) {
        setFonts();
    });
    var addImage = function(imageName, imageBlob, onSuccessCallback, onErrorCallback) {
        var fileName = imageName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        if (fileName.indexOf(".png") === -1) {
            fileName += ".png";
        }
        fileName += "." + new Date().getTime();
        var image = {
            id: new Date().getTime(),
            type: IMAGE_TYPE,
            name: imageName,
            fileName: fileName,
            filePath: resources.IMAGE_DIRECTORY_PATH + "/" + fileName,
            alignment: DEFAULT_IMAGE_ALIGNMENT
        };
        var contentMarkdownHtml = $scope.post.contentMarkdownHtml;
        fileManager.writeFile(image.filePath, imageBlob, function(fileEntry) {
            image.localUrl = fileEntry.toURL();
            var finishImageAdd = function() {
                image.markdownUrl = "![" + image.name + "](" + image.localUrl + ")";
                $scope.post.contentMarkdownHtml = contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, image.markdownUrl);
                $scope.post.images[image.id] = image;
                savePost();
                image = {};
                notifyOnCompletion("image saved", null, true);
            };
            var img = new Image();
            img.onload = function() {
                image.width = img.width;
                finishImageAdd();
            };
            image.onerror = function() {
                finishImageAdd();
            };
            img.src = image.localUrl;
        }, function(error) {
            notifyOnCompletion("error saving image", error, false);
        });
    };
    $scope.$on(resources.events.IMAGE_INSERTED, function(event, blob) {
        $scope.imageToInsert = {};
        $scope.imageToInsert.blob = blob;
        document.execCommand("insertHtml", false, INSERTED_IMAGE_PLACEHOLDER);
        $scope.insertImageDialogOpen = true;
    });
    $scope.proceedWithImageInsert = function() {
        $scope.insertImageDialogOpen = false;
        addImage($scope.imageToInsert.fileName, $scope.imageToInsert.blob, function() {
            savePost();
        }, function(error) {
            notifyOnCompletion("erorr updating post '" + $scope.post.title, error, false);
        });
    };
    $scope.cancelImageInsert = function() {
        $scope.imageToInsert = {};
        $scope.post.contentMarkdownHtml = $scope.post.contentMarkdownHtml.replace(INSERTED_IMAGE_PLACEHOLDER, "");
        $("#post-content").focus();
        $scope.insertImageDialogOpen = false;
    };
    $scope.togglePreview = function() {
        if (!$scope.previewOn) {
            setFonts();
            $scope.post.contentHtmlPreview = marked($scope.post.contentMarkdown);
        }
        $scope.previewOn = !$scope.previewOn;
        $scope.previewMessage = $scope.previewOn ? MESSAGE_PREVIEW_MARKDOWN : MESSAGE_PREVIEW_HTML;
    };
    $scope.toggleMetadataPanel = function() {
        $scope.showMetadata = !$scope.showMetadata;
        if ($scope.showMetadata && $scope.post.excerpt === "") {
            $scope.updateExcerpt();
        }
        if ($scope.showMetadata) {
            $("#post-excerpt").focus();
        }
    };
    $scope.updateExcerpt = function() {
        $scope.post.excerpt = $scope.post.contentMarkdown.match(/^(.*)$/m)[0];
        savePost();
    };
    $scope.sync = function() {
        $scope.$emit(resources.events.PROCESSING_STARTED, "starting upload to WordPress");
        wordpress.getCredentials(function() {
            Post.sync(function() {
                notifyOnCompletion("finished upload to WordPress", null, true);
            }, function(error) {
                notifyOnCompletion("error uploading post '" + $scope.post.title + "'", error, false);
            });
        });
    };
    $scope.getTags = function() {
        wordpress.getTags(function(tags) {
            _.each(tags[0], function(tag) {
                $scope.tags.push(tag);
            });
            $scope.safeApply();
        }, function(error) {
            notifyOnCompletion("error loading tags from WordPress", error, false);
        });
    };
    $scope.addTag = function(tag) {
        if ($scope.post.tags.indexOf(tag.name) === -1) {
            if ($scope.post.tags.trim() === "") {
                $scope.post.tags += tag.name;
            } else {
                $scope.post.tags += ", " + tag.name;
            }
        }
    };
    $scope.getCategories = function() {
        wordpress.getCategories(function(categories) {
            _.each(categories[0], function(category) {
                $scope.categories.push(category);
            });
            $scope.safeApply();
        }, function(error) {
            notifyOnCompletion("error loading categories from WordPress", error, false);
        });
    };
    $scope.addCategory = function(category) {
        if ($scope.post.categories.indexOf(category.name) === -1) {
            if ($scope.post.categories.trim() === "") {
                $scope.post.categories += category.name;
            } else {
                $scope.post.categories += ", " + category.name;
            }
        }
    };
    $scope.imagesAvailable = function() {
        return !$.isEmptyObject($scope.post.images);
    };
    $scope.copyToClipboard = function(image) {
        var imageSnippet = document.createElement("span");
        imageSnippet.contentEditable = true;
        document.body.appendChild(imageSnippet);
        imageSnippet.innerText = image.markdownUrl;
        imageSnippet.focus();
        document.execCommand("SelectAll");
        document.execCommand("Copy", false, null);
        document.body.removeChild(imageSnippet);
        notifyOnCompletion("copied image to clipboard, use Shift+Ctrl+V to paste", null, true);
    };
    $scope.configureImage = function(image) {
        $scope.imageToConfigure = image;
        $scope.configureImageDialogOpen = true;
    };
    $scope.closeConfigureImage = function() {
        $scope.imageToConfigure = {};
        $scope.configureImageDialogOpen = false;
        savePost();
    };
    $scope.initiateImageDelete = function(image) {
        $scope.imageToDelete = image;
        $scope.deleteImageConfirmOpen = true;
    };
    $scope.cancelImageDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        $scope.imageToDelete = {};
    };
    $scope.proceedWithImageDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        var imageToDelete = $scope.imageToDelete;
        fileManager.removeFile($scope.imageToDelete.filePath, function() {
            $scope.post.contentMarkdownHtml = $scope.post.contentMarkdownHtml.replace(imageToDelete.localUrl, DELETED_IMAGE_PLACEHOLDER);
            delete $scope.post.images[imageToDelete.id];
            savePost();
            logger.log("deleted image '" + imageToDelete.fileName + "'", "EditorController");
            $scope.imageToDelete = {};
        }, function(error) {
            delete $scope.post.images[imageToDelete.id];
            savePost();
            notifyOnCompletion("error deleting image", error, false);
        });
    };
    $scope.togglePublishStatus = function() {
        if ($scope.post.status === STATUS_DRAFT) {
            $scope.post.status = STATUS_PUBLISH;
            $scope.post.state.toBePublished = true;
        } else {
            $scope.post.status = STATUS_DRAFT;
            $scope.post.state.toBePublished = false;
        }
        savePost();
    };
};

EditorController.$inject = [ "Post", "$scope", "$routeParams", "$filter", "fileManager", "wordpress", "logger", "resources", "settings" ];

var ImagesController = function($scope, fileManager, logger, resources) {
    $scope.images = {};
    $scope.confirm = {};
    $scope.loaded = false;
    $scope.imageToDelete = {};
    if (!$scope.loaded) {
        fileManager.accessFilesInDirectory(resources.IMAGE_DIRECTORY_PATH, fileManager.directoryAccessActions.LIST, function(file) {
            var image = {};
            image.name = file.name;
            image.url = file.toURL();
            image.id = file.fullPath;
            image.path = file.fullPath;
            $scope.images[image.id] = image;
            $scope.$apply();
        }, function(error) {
            logger.log(error, "ImagesController");
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "loading images failed",
                success: false
            });
        });
    }
    $scope.deleteImage = function(image) {
        $scope.imageToDelete = image;
        $scope.deleteImageConfirmOpen = true;
    };
    $scope.cancelDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        $scope.imageToDelete = {};
    };
    $scope.proceedWithDelete = function() {
        $scope.deleteImageConfirmOpen = false;
        fileManager.removeFile($scope.imageToDelete.path, function() {
            delete $scope.images[$scope.imageToDelete.id];
            logger.log("deleted image '" + $scope.imageToDelete.title + "'", "ImagesController");
            $scope.imageToDelete = {};
            $scope.$apply();
        }, function(error) {
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "failed to deleted image '" + $scope.postToDelete.title + "'",
                success: false
            });
        });
    };
};

ImagesController.$inject = [ "$scope", "fileManager", "logger", "resources" ];

var LoginController = function($scope, dialog, wordpress) {
    console.log("opening login dialog");
    wordpress.loadCredentials(function(login) {
        $scope.login = {
            url: login.url,
            username: login.username,
            password: login.password,
            rememberPassword: login.rememberPassword
        };
        $scope.$apply();
    });
    $scope.submit = function() {
        wordpress.saveCredentials($scope.login);
        console.log("closing login dialog");
        dialog.close();
    };
    $scope.resetCredentials = function() {
        wordpress.resetCredentials();
        console.log("closing login dialog");
        dialog.close();
    };
    $scope.cancel = function() {
        dialog.close();
    };
};

LoginController.$inject = [ "$scope", "dialog", "wordpress" ];

var LogsController = function($scope, logger) {
    $scope.logs = logger.getLogs();
};

LogsController.$inject = [ "$scope", "logger" ];

var MainController = function($scope, $dialog, $timeout, fileManager, logger, resources, settings) {
    var FADE_DURATION = 3e3;
    $scope.optionsPanelVisible = false;
    $scope.aboutDialogOpen = false;
    $scope.fonts = [];
    $scope.settings = {};
    $scope.themes = settings.themes;
    $scope.systemFontsAvailable = false;
    $scope.appStatus = {
        isProcessing: false,
        isSuccess: true,
        message: "everything is cool",
        showMessage: false
    };
    var notify = function(message, error, isSuccess) {
        if (error) {
            message += ": " + error;
        }
        logger.log(message, "EditorController");
        $scope.$emit(resources.events.PROCESSING_FINISHED, {
            message: message,
            success: isSuccess
        });
    };
    fileManager.initialize(function(e) {
        fileManager.createDirectory(resources.POST_DIRECTORY_PATH, function() {
            logger.log("created posts directory", "MainController");
        }, function(error) {
            notify("error creating posts directory", error, false);
        });
        fileManager.createDirectory(resources.IMAGE_DIRECTORY_PATH, function() {
            logger.log("created images directory", "MainController");
        }, function(error) {
            notify("error creating images directory", error, false);
        });
    }, function(error) {
        notify("error initializing file system", error, false);
    });
    $scope.fonts.push("serif");
    $scope.fonts.push("sans-serif");
    $scope.fonts.push("economica");
    $scope.fonts.push("inconsolata");
    $scope.fonts.push("goudy");
    $scope.fonts.push("merriweather");
    $scope.fonts.push("arvo");
    $scope.fonts.push("cabin");
    $scope.fonts.push("crimson text");
    if (chrome.fontSettings) {
        logger.log("adding system fonts", "MainController");
        $scope.systemFontsAvailable = true;
        chrome.fontSettings.getFontList(function(fonts) {
            _.each(fonts, function(font) {
                $scope.fonts.push(font.fontId);
            });
        });
    }
    settings.load(function(settings) {
        $scope.settings = settings;
        $scope.switchTheme($scope.settings.theme);
        $scope.$broadcast(resources.events.FONT_CHANGED);
        $scope.safeApply();
    });
    $scope.switchTheme = function(themeName) {
        _.each($("link"), function(link) {
            link.disabled = link.title !== themeName;
        });
        $scope.settings.theme = themeName;
        settings.save($scope.settings, function() {
            logger.log("set theme to " + $scope.settings.theme, "MainController");
        });
    };
    $scope.resetFonts = function() {
        $scope.settings.postTitleFont = settings.defaults.postTitleFont;
        $scope.settings.postTitleFontSize = settings.defaults.postTitleFontSize;
        $scope.settings.postBodyFont = settings.defaults.postBodyFont;
        $scope.settings.postBodyFontSize = settings.defaults.postBodyFontSize;
        $scope.settings.postBodyLineHeight = settings.defaults.postBodyLineHeight;
        $scope.settings.postHtmlFont = settings.defaults.postHtmlFont;
        $scope.settings.postHtmlFontSize = settings.defaults.postHtmlFontSize;
        $scope.settings.postHtmlH1FontSize = settings.defaults.postHtmlH1FontSize;
        $scope.settings.postHtmlH2FontSize = settings.defaults.postHtmlH2FontSize;
        $scope.settings.postHtmlH3FontSize = settings.defaults.postHtmlH3FontSize;
        $scope.settings.postHtmlH4FontSize = settings.defaults.postHtmlH4FontSize;
        $scope.settings.postHtmlH5FontSize = settings.defaults.postHtmlH5FontSize;
        $scope.settings.postHtmlH6FontSize = settings.defaults.postHtmlH6FontSize;
        $scope.settings.postHtmlLineHeight = settings.defaults.postHtmlLineHeight;
        settings.save($scope.settings, function() {
            logger.log("reset fonts", "MainController");
            $scope.$broadcast(resources.events.FONT_CHANGED);
        });
    };
    $scope.saveFont = function(font, item) {
        settings.save($scope.settings, function() {
            $scope.$broadcast(resources.events.FONT_CHANGED);
        });
    };
    $scope.changeFontSize = function(fontSize, incrementDirection) {
        var increment = resources.typography.INCREMENT * incrementDirection;
        $scope.settings[fontSize] = parseFloat($scope.settings[fontSize]) + increment;
        if (fontSize === "postHtmlFontSize") {
            $scope.settings.postHtmlH1FontSize = $scope.settings.postHtmlH1FontSize + increment;
            $scope.settings.postHtmlH2FontSize = $scope.settings.postHtmlH2FontSize + increment;
            $scope.settings.postHtmlH3FontSize = $scope.settings.postHtmlH3FontSize + increment;
            $scope.settings.postHtmlH4FontSize = $scope.settings.postHtmlH4FontSize + increment;
            $scope.settings.postHtmlH5FontSize = $scope.settings.postHtmlH5FontSize + increment;
            $scope.settings.postHtmlH6FontSize = $scope.settings.postHtmlH6FontSize + increment;
        }
        settings.save($scope.settings, function() {
            $scope.$broadcast(resources.events.FONT_CHANGED);
        });
    };
    $scope.changeLineHeight = function(lineHeight, incrementDirection) {
        var increment = resources.typography.INCREMENT * incrementDirection;
        $scope.settings[lineHeight] = parseFloat($scope.settings[lineHeight]) + increment;
        settings.save($scope.settings, function() {
            $scope.$broadcast(resources.events.FONT_CHANGED);
        });
    };
    $scope.loginCredentials = function() {
        $dialog.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            controller: "LoginController",
            templateUrl: "views/modals/login.html"
        }).open();
    };
    $scope.toggleOptionsPanel = function() {
        $scope.optionsPanelVisible = !$scope.optionsPanelVisible;
    };
    $scope.showMessage = function() {
        $scope.appStatus.showMessage = true;
        $timeout(function(e) {
            $scope.appStatus.showMessage = false;
        }, FADE_DURATION);
    };
    $scope.$on(resources.events.PROCESSING_STARTED, function(event, message) {
        $scope.appStatus.isProcessing = true;
        $scope.appStatus.showMessage = false;
        $scope.appStatus.message = message;
    });
    $scope.$on(resources.events.PROCESSING_FINISHED, function(event, args) {
        $scope.appStatus.isProcessing = false;
        $scope.appStatus.message = args.message;
        $scope.appStatus.isSuccess = args.success;
        $scope.showMessage();
        $scope.safeApply();
    });
    $scope.startProcessing = function() {
        $scope.$emit(resources.events.PROCESSING_STARTED, "starting something");
    };
    $scope.stopProcessingWithFail = function() {
        $scope.$emit(resources.events.PROCESSING_FINISHED, {
            message: "bad things happened",
            success: false
        });
    };
    $scope.stopProcessingwithSuccess = function() {
        $scope.$emit(resources.events.PROCESSING_FINISHED, {
            message: "good things happened",
            success: true
        });
    };
    $scope.dismissMessage = function() {
        $scope.appStatus.showMessage = false;
    };
    $scope.showAboutDialog = function() {
        $scope.aboutDialogOpen = true;
    };
    $scope.closeAboutDialog = function() {
        $scope.aboutDialogOpen = false;
    };
    $scope.deleteAllPosts = function() {
        fileManager.accessFilesInDirectory(resources.POST_DIRECTORY_PATH, fileManager.directoryAccessActions.REMOVE, function(file) {
            logger.log("deleted all posts", "MainController");
            $scope.postsList = [];
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "all posts removed",
                success: true
            });
        }, function(error) {
            logger.log("error removing all posts: " + error, "MainController");
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "removing posts failed",
                success: false
            });
        });
    };
    $scope.deleteAllIMages = function() {
        fileManager.accessFilesInDirectory(resources.IMAGE_DIRECTORY_PATH, fileManager.directoryAccessActions.REMOVE, function(file) {
            logger.log("deleted all images", "ImagesController");
            $scope.images = {};
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "all images removed",
                success: true
            });
        }, function(error) {
            logger.log("error removing all images: " + error, "ImagesController");
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "removing images failed",
                success: false
            });
        });
    };
    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == "$apply" || phase == "$digest") {
            if (fn && typeof fn === "function") {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
};

MainController.$inject = [ "$scope", "$dialog", "$timeout", "fileManager", "logger", "resources", "settings" ];

var PostsController = function($scope, $location, fileManager, logger, resources) {
    $scope.postsList = [];
    $scope.confirm = {};
    $scope.loaded = false;
    $scope.postToDelete = {};
    var SORT_DESCENDING = "descending";
    var SORT_ASCENDING = "ascending";
    $scope.filters = {};
    $scope.filters.dateSortOrder = SORT_DESCENDING;
    if (!$scope.loaded) {
        fileManager.accessFilesInDirectory(resources.POST_DIRECTORY_PATH, fileManager.directoryAccessActions.READ, function(file) {
            try {
                var post = JSON.parse(file);
                $scope.postsList.push(post);
                $scope.loaded = true;
                $scope.safeApply();
            } catch (error) {
                logger.log("error reading file [" + file + "]: " + error, "PostsController");
                $scope.$emit(resources.events.PROCESSING_FINISHED, {
                    message: "loading posts failed",
                    success: false
                });
                $scope.$apply();
            }
        }, function(error) {
            logger.log(error, "PostsController");
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "loading posts failed",
                success: false
            });
        });
    }
    $scope.deletePost = function(post) {
        $scope.postToDelete = post;
        $scope.deletePostConfirmOpen = true;
    };
    $scope.cancelDelete = function() {
        $scope.deletePostConfirmOpen = false;
        $scope.postToDelete = {};
    };
    $scope.proceedWithDelete = function() {
        $scope.deletePostConfirmOpen = false;
        fileManager.removeFile($scope.postToDelete.path, function() {
            var newList = _.reject($scope.postsList, function(post) {
                return post.id === $scope.postToDelete.id;
            });
            $scope.postsList = newList;
            logger.log("deleted post '" + $scope.postToDelete.title + "'", "PostsController");
            $scope.postToDelete = {};
            $scope.$apply();
        }, function(error) {
            $scope.$emit(resources.events.PROCESSING_FINISHED, {
                message: "failed to remove post '" + $scope.postToDelete.title + "'",
                success: false
            });
        });
    };
    $scope.editPost = function(post) {
        $location.path("posts/" + post.id);
    };
};

PostsController.$inject = [ "$scope", "$location", "fileManager", "logger", "resources" ];

angular.module("platen.directives").directive("blur", function() {
    return function(scope, elem, attrs) {
        elem.bind("blur", function() {
            scope.$apply(attrs.ngBlur);
        });
    };
});

angular.module("platen.directives").directive("editableMarkdown", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function($scope, $element, attrs, $ngModel) {
            if (!$ngModel) return;
            $ngModel.$render = function() {
                $element.html($ngModel.$viewValue || "");
            };
            $element.bind("blur keyup change", function() {
                $scope.$apply(read);
            });
            var read = function() {
                $scope.post.contentMarkdown = $element.context.innerText;
                $ngModel.$setViewValue($element.html());
            };
            $element.bind("blur paste", function() {
                $scope.$emit("elementEdited", $element[0].id);
            });
            read();
        }
    };
});

angular.module("platen.directives").directive("editableText", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || "");
            };
            element.bind("blur keyup change", function() {
                scope.$apply(read);
            });
            var read = function() {
                ngModel.$setViewValue(element.context.innerText);
            };
            element.bind("blur paste", function() {
                scope.$emit("elementEdited", element[0].id);
            });
            read();
        }
    };
});

angular.module("platen.directives").directive("pastableImage", function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function($scope, $element, attrs, $ngModel) {
            $element.on("paste", function(event) {
                var pastedImage;
                _.each(event.originalEvent.clipboardData.items, function(item) {
                    if (item.type === "image/png") {
                        pastedImage = item;
                    }
                });
                if (pastedImage) {
                    event.preventDefault();
                    $scope.$emit("imageInserted", pastedImage.getAsFile());
                }
            });
        }
    };
});

angular.module("platen.filters").filter("fromNow", function() {
    return function(date) {
        if (date) {
            return moment(date).fromNow();
        } else {
            return "never";
        }
    };
});

angular.module("platen.models").factory("Post", [ "$rootScope", "$q", "resources", "fileManager", "wordpress", "logger", function($rootScope, $q, resources, fileManager, wordpress, logger) {
    var data = {};
    var STATUS_DRAFT = "draft";
    var STATUS_PUBLISH = "publish";
    var getFilePath = function(postId) {
        return "/" + resources.POST_DIRECTORY_PATH + "/" + postId;
    };
    var createPost = function() {
        data.id = new Date().getTime();
        data.path = getFilePath(data.id);
        data.status = STATUS_DRAFT;
        data.title = "";
        data.content = "";
        data.contentMarkdown = "";
        data.contentMarkdownHtml = "";
        data.contentHtmlPreview = "";
        data.wordPressId = 0;
        data.excerpt = "";
        data.images = {};
        data.tags = "";
        data.categories = "";
        data.state = {
            createDate: new Date(),
            lastSaveDate: "",
            lastUploadDate: "",
            toBePublished: false
        };
    };
    var savePost = function(onSuccessCallback, onErrorCallback) {
        var postToSave = JSON.parse(JSON.stringify(data));
        postToSave.content = "";
        postToSave.contentHtmlPreview = "";
        fileManager.writeFile(getFilePath(data.id), JSON.stringify(postToSave), function() {
            data.state.lastSaveDate = new Date();
            onSuccessCallback();
        }, onErrorCallback);
    };
    var uploadImage = function(image) {
        var d = $q.defer();
        try {
            fileManager.readFile(image.filePath, false, function(imageData) {
                var cleanFileName = image.fileName.substr(0, image.fileName.lastIndexOf("."));
                wordpress.uploadFile(cleanFileName, image.type, imageData, function(response) {
                    image.blogUrl = response[0].url;
                    image.blogId = response[0].id;
                    logger.log("uploaded image '" + image.name + "' to '" + image.blogUrl + "'", "Post module");
                    d.resolve();
                    $rootScope.$apply();
                }, function(e) {
                    logger.log("error uploading image '" + image.name + "'", "Post Module");
                    d.reject();
                    $rootScope.$apply();
                });
            }, function(e) {
                logger.log("error reading image '" + image.name + "'", "Post Module");
                d.reject();
                $rootScope.$apply();
            });
        } catch (e) {
            d.reject();
            logger.log("error uploading image '" + image.name + "'", "Post Module");
        }
        return d.promise;
    };
    var uploadImages = function(content, onCompletionCallback) {
        var promises = [];
        _.each(data.images, function(image) {
            if (!image.blogId || image.blogId.trim() === "") {
                promises.push(uploadImage(image));
            }
        });
        if (promises.length > 0) {
            $q.all(promises).then(onCompletionCallback);
        } else {
            onCompletionCallback();
        }
    };
    var replaceImageHtml = function(content, image) {
        var imgReplacement = '<a href="' + image.blogUrl + '"><img class="align' + image.alignment;
        if (image.width > 0) {
            imgReplacement += '" width="' + image.width;
        }
        imgReplacement += '" src="' + image.blogUrl;
        return content.replace('<img src="' + image.localUrl, imgReplacement).replace('alt="' + image.title + '">', 'alt="' + image.title + '"></a>');
    };
    return {
        initialize: function(postId, onSuccessCallback, onErrorCallback) {
            if (postId === "0") {
                createPost();
                onSuccessCallback(data);
            } else {
                fileManager.readFile(getFilePath(postId), true, function(postJson) {
                    data = JSON.parse(postJson);
                    onSuccessCallback(data);
                }, function(error) {
                    onErrorCallback(error);
                });
            }
        },
        save: function(onSuccessCallback, onErrorCallback) {
            if (data.title.trim() === "" && data.contentMarkdown.trim() === "") return;
            savePost(onSuccessCallback, onErrorCallback);
        },
        sync: function(onSuccessCallback, onErrorCallback) {
            data.content = marked(data.contentMarkdown);
            var saveOnSuccessCallback = function(result) {
                logger.log("synched post '" + data.title + "'", "Post service");
                data.state.lastUploadDate = new Date();
                if (data.state.toBePublished) {
                    data.state.toBePublished = false;
                }
                if (!data.wordPressId) {
                    data.wordPressId = result[0];
                }
                savePost(onSuccessCallback, onErrorCallback);
            };
            try {
                uploadImages(data.content, function() {
                    var content = data.content;
                    _.each(data.images, function(image) {
                        content = replaceImageHtml(content, image);
                    });
                    data.content = content;
                    wordpress.savePost(data, saveOnSuccessCallback, onErrorCallback);
                });
            } catch (e) {
                onErrorCallback(e);
            }
        }
    };
} ]);

angular.module("platen.services").factory("fileManager", function() {
    var fs;
    var SIZE = 10 * 1024 * 1024;
    var LIST_FILE = 1;
    var READ_FILE = 2;
    var REMOVE_FILE = 3;
    var doCreate = {
        create: true
    };
    var dontCreate = {
        create: false
    };
    var DEFAULT_FILE_TYPE = {
        type: "text/plain"
    };
    var getError = function(e, step) {
        return "Error " + e.code + ": " + e.name + " " + step;
    };
    FileError.prototype.__defineGetter__("name", function() {
        var keys = Object.keys(FileError);
        _.each(keys, function(key) {
            if (FileError[key] === this.code) {
                return key;
            }
        });
        return "Unknown Error";
    });
    var getFileEntryAndDoAction = function(filePath, createParam, actionCallback, onErrorCallback) {
        if (fs) {
            fs.root.getFile(filePath, createParam, actionCallback, onErrorCallback);
        }
    };
    var processFile = function(filePath, createParam, onSuccessCallback, onErrorCallback) {
        if (fs) {
            fs.root.getFile(filePath, createParam, function(fileEntry) {
                fileEntry.file(onSuccessCallback, onErrorCallback);
            }, onErrorCallback);
        }
    };
    var getFileSystem = function(onSuccessCallback, onErrorCallback) {
        window.webkitRequestFileSystem(PERSISTENT, SIZE, function(fileSystem) {
            fs = fileSystem;
            onSuccessCallback();
        }, function(e) {
            onErrorCallback(getError(e, "while initializing file system"));
        });
    };
    return {
        directoryAccessActions: {
            LIST: LIST_FILE,
            READ: READ_FILE,
            REMOVE: REMOVE_FILE
        },
        initialize: function(onSuccessCallback, onErrorCallback) {
            getFileSystem(onSuccessCallback, onErrorCallback);
        },
        accessFilesInDirectory: function(directoryPath, accessAction, onSuccessCallback, onErrorCallback) {
            var accessFiles = function() {
                fs.root.getDirectory(directoryPath, doCreate, function(dirEntry) {
                    dirEntry.createReader().readEntries(function(entries) {
                        _.each(entries, readEntry);
                    }, function(e) {
                        onErrorCallback(getError(e, "while reading entries in " + directoryPath));
                    });
                }, function(e) {
                    onErrorCallback(getError(e, "while reading getting directory " + directoryPath));
                });
            };
            var readEntry = function(entry) {
                if (entry.isFile) {
                    switch (accessAction) {
                      case LIST_FILE:
                        onSuccessCallback(entry);
                        break;

                      case READ_FILE:
                        processFile(entry.fullPath, dontCreate, function(file) {
                            var reader = new FileReader();
                            reader.onloadend = function(e) {
                                onSuccessCallback(this.result);
                            };
                            reader.readAsText(file);
                        }, function(e) {
                            onErrorCallback(getError(e, "while reading file " + entry.fullPath));
                        });
                        break;

                      case REMOVE_FILE:
                        getFileEntryAndDoAction(entry.fullPath, dontCreate, function(fileEntry) {
                            fileEntry.remove(onSuccessCallback, function(e) {
                                onErrorCallback(getError(e, " while removing file " + entry.fullPath));
                            });
                        });
                        break;

                      default:
                        onSuccessCallback(entry);
                        break;
                    }
                }
            };
            if (fs) {
                accessFiles();
            } else {
                getFileSystem(accessFiles, onErrorCallback);
            }
        },
        writeFile: function(filePath, fileBody, onSuccessCallback, onErrorCallback) {
            var blob;
            if (fileBody instanceof Blob) {
                blob = fileBody;
            } else {
                blob = new Blob([ fileBody ], DEFAULT_FILE_TYPE);
            }
            getFileEntryAndDoAction(filePath, doCreate, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onerror = onErrorCallback;
                    fileWriter.onwriteend = function() {
                        fileWriter.onwriteend = null;
                        fileWriter.write(blob);
                        onSuccessCallback(fileEntry);
                    };
                    fileWriter.truncate(blob.size);
                }, function(e) {
                    onErrorCallback(getError(e, " while creating fileWriter for " + filePath));
                }, function(e) {
                    onErrorCallback(getError(e, " while creating fileWriter for " + filePath));
                });
            });
        },
        readFile: function(filePath, asText, onSuccessCallback, onErrorCallback) {
            processFile(filePath, dontCreate, function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    onSuccessCallback(this.result);
                };
                if (asText) {
                    reader.readAsText(file);
                } else {
                    reader.readAsBinaryString(file);
                }
            }, function(e) {
                onErrorCallback(getError(e, "while reading file " + filePath));
            });
        },
        removeFile: function(filePath, onSuccessCallback, onErrorCallback) {
            var doError = function(e) {
                onErrorCallback(getError(e, " while removing file " + filePath));
            };
            var doAction = function(fileEntry) {
                fileEntry.remove(onSuccessCallback, doError);
            };
            getFileEntryAndDoAction(filePath, dontCreate, doAction, doError);
        },
        createDirectory: function(directoryPath, onSuccessCallback, onErrorCallback) {
            fs.root.getDirectory(directoryPath, doCreate, onSuccessCallback, function(e) {
                onErrorCallback(getError(e, " while creating directory " + directoryPath));
            });
        }
    };
});

angular.module("platen.services").factory("logger", function() {
    var MAX_QUEUE_SIZE = 100;
    var offset = 0;
    var log = [];
    return {
        log: function(message, location) {
            if (log.length > MAX_QUEUE_SIZE) {
                console.log("removing log item");
                var item = log[offset];
                if (++offset * 2 >= log.length) {
                    log = log.slice(offset);
                    offset = 0;
                }
            }
            log.push({
                message: message,
                location: location,
                date: new Date()
            });
            console.log(message);
        },
        getLogs: function() {
            return log.reverse();
        }
    };
});

angular.module("platen.services").value("resources", {
    POST_DIRECTORY_PATH: "posts",
    IMAGE_DIRECTORY_PATH: "images",
    events: {
        PROCESSING_STARTED: "processingStarted",
        PROCESSING_FINISHED: "processingFinished",
        ELEMENT_EDITED: "elementEdited",
        FONT_CHANGED: "fontChanged",
        IMAGE_INSERTED: "imageInserted"
    },
    typography: {
        UNIT_OF_MEASURE: "rem",
        INCREMENT: .1
    }
});

angular.module("platen.services").factory("settings", function() {
    var LOCAL_STORAGE_SETTINGS_KEY = "platen.settings";
    var BASE_FONT_SIZE = 1;
    var BASE_LINE_HEIGHT = 1.8;
    var DEFAULTS = {
        theme: "white",
        postTitleFont: "economica",
        postTitleFontSize: BASE_FONT_SIZE * 2,
        postBodyFont: "inconsolata",
        postBodyFontSize: BASE_FONT_SIZE,
        postBodyLineHeight: BASE_LINE_HEIGHT,
        postHtmlFont: "goudy",
        postHtmlFontSize: BASE_FONT_SIZE,
        postHtmlH1FontSize: BASE_FONT_SIZE * 2,
        postHtmlH2FontSize: BASE_FONT_SIZE * 1.5,
        postHtmlH3FontSize: BASE_FONT_SIZE * 1.3125,
        postHtmlH4FontSize: BASE_FONT_SIZE * 1.125,
        postHtmlH5FontSize: BASE_FONT_SIZE * 1,
        postHtmlH6FontSize: BASE_FONT_SIZE * 1,
        postHtmlLineHeight: BASE_LINE_HEIGHT,
        imageAlignment: "center"
    };
    var THEMES = {
        white: "white",
        dark: "dark",
        gray: "gray"
    };
    return {
        themes: THEMES,
        defaults: DEFAULTS,
        load: function(onCompletionCallback) {
            chrome.storage.local.get(LOCAL_STORAGE_SETTINGS_KEY, function(rawValue) {
                var settings = {};
                if (rawValue[LOCAL_STORAGE_SETTINGS_KEY]) {
                    settings = rawValue[LOCAL_STORAGE_SETTINGS_KEY];
                }
                _.each(DEFAULTS, function(value, key, list) {
                    if (!settings[key]) {
                        settings[key] = value;
                    }
                });
                onCompletionCallback(settings);
            });
        },
        save: function(settings, onCompletionCallback) {
            var saveMe = {};
            saveMe[LOCAL_STORAGE_SETTINGS_KEY] = settings;
            chrome.storage.local.set(saveMe, onCompletionCallback);
        }
    };
});

angular.module("platen.services").factory("wordpress", [ "$dialog", "logger", function($dialog, logger) {
    var POST_TYPE = "post";
    var TAG_TYPE = "post_tag";
    var CATEGORY_TYPE = "category";
    var DEFAULT_BLOG_ID = 1;
    var DEFAULT_AUTHOR_ID = 1;
    var _login = {};
    var LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY = "platen.wordPressCredentials";
    var isLoginValid = function() {
        return !_.isEmpty(_login) && _login.url.trim() !== "" && _login.username.trim() !== "" && _login.password.trim() !== "";
    };
    var loadCredentialsFromStorage = function(onCompletionCallback) {
        console.log("in loadCredentialsFromStorage");
        chrome.storage.local.get(LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY, function(storedValues) {
            if (storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY]) {
                _login.url = storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].url || "";
                _login.password = storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].password || _login.currentSessionCachedPassword || "";
                _login.username = storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].username || "";
                _login.rememberPassword = storedValues[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY].rememberPassword || false;
            } else {
                _login.url = "";
                _login.username = "";
                _login.password = "";
                _login.rememberPassword = false;
            }
            logger.log("loaded WordPress configuration", "wordpress service");
            onCompletionCallback(_login);
        });
    };
    var obtainCredentialsFromUserIfNeeded = function(onSuccessCallback) {
        console.log("in obtainCredentialsFromUserIfNeeded");
        var getLoginIfNeeded = function() {
            console.log("in getLoginIfNeeded");
            if (!isLoginValid()) {
                console.log("in getLoginIfNeeded, login not valid, opening dialog");
                var d = $dialog.dialog({
                    controller: "LoginController",
                    templateUrl: "views/modals/login.html"
                });
                d.open().then(function() {
                    if (isLoginValid()) {
                        onSuccessCallback();
                    } else {
                        onErrorCallback("cannot execute call, invalid credentials for WordPress blog");
                        logger.log("cannot execute call, invalid credentials for WordPress blog", "wordpress service");
                    }
                });
            } else {
                console.log("in getLoginIfNeeded, login valid, calling onSuccessCallback");
                onSuccessCallback();
            }
        };
        if (_.isEmpty(_login)) {
            console.log("login empty, loading credentials");
            loadCredentialsFromStorage(getLoginIfNeeded);
        } else {
            console.log("login not empty, moving on");
            getLoginIfNeeded();
        }
    };
    var callWordPress = function(methodName, additionalParams, onSuccessCallback, onErrorCallback) {
        var codeToRun = function() {
            var loginParams = [ DEFAULT_BLOG_ID, _login.username, _login.password ];
            var fullParams = loginParams.concat(additionalParams);
            var fullUrl = _login.url.replace(/\/$/, "") + "/xmlrpc.php";
            $.xmlrpc({
                url: fullUrl,
                methodName: methodName,
                params: fullParams,
                success: function(response, status, jqXHR) {
                    console.log("response from wordpress for call " + methodName, response);
                    onSuccessCallback(response);
                },
                error: function(jqXHR, status, error) {
                    onErrorCallback(error);
                }
            });
        };
        if (isLoginValid) {
            console.log("in callWordPress, login valid");
            codeToRun();
        } else {
            console.log("in callWordPress, login invalid, getting login");
            obtainCredentialsFromUserIfNeeded(codeToRun);
        }
    };
    return {
        loadCredentials: function(onCompletionCallback) {
            loadCredentialsFromStorage(onCompletionCallback);
        },
        getCredentials: function(onSuccessCallback) {
            obtainCredentialsFromUserIfNeeded(onSuccessCallback);
        },
        saveCredentials: function(login) {
            var saveMe = {};
            if (!login.rememberPassword) {
                login.currentSessionCachedPassword = login.password;
                login.password = "";
            }
            _login = login;
            saveMe[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY] = login;
            chrome.storage.local.set(saveMe, function() {
                logger.log("saved login credentials for blog '" + login.url + "'", "wordpress service");
            });
        },
        resetCredentials: function() {
            _login = {
                url: "",
                username: "",
                password: "",
                rememberPassword: false
            };
            var saveMe = {};
            saveMe[LOCAL_STORAGE_WORDPRESS_CREDENTIALS_KEY] = _login;
            chrome.storage.local.set(saveMe, function() {
                logger.log("reset credentials", "wordpress service");
            });
        },
        getPost: function(postId, onSuccessCallback, onErrorCallback) {
            callWordPress("wp.getPost", [ post_id ], onSuccessCallback, onErrorCallback);
        },
        savePost: function(post, onSuccessCallback, onErrorCallback) {
            var result, terms = {};
            var data = {
                post_type: POST_TYPE,
                post_status: post.status,
                post_title: post.title,
                post_author: DEFAULT_AUTHOR_ID,
                post_excerpt: post.excerpt,
                post_content: post.content,
                post_format: "",
                terms_names: ""
            };
            if (post.tags && post.tags.trim() !== "") {
                terms.post_tag = post.tags.replace(" ", "").split(",");
            }
            if (post.categories && post.categories.trim() !== "") {
                terms.category = post.categories.replace(" ", "").split(",");
            }
            data.terms_names = terms;
            if (post.wordPressId) {
                callWordPress("wp.editPost", [ post.wordPressId, data ], onSuccessCallback, onErrorCallback);
            } else {
                callWordPress("wp.newPost", [ data ], onSuccessCallback, onErrorCallback);
            }
        },
        getTags: function(onSuccessCallback, onErrorCallback) {
            callWordPress("wp.getTerms", [ TAG_TYPE ], onSuccessCallback, onErrorCallback);
        },
        getCategories: function(onSuccessCallback, onErrorCallback) {
            callWordPress("wp.getTerms", [ CATEGORY_TYPE ], onSuccessCallback, onErrorCallback);
        },
        uploadFile: function(fileName, fileType, fileData, onSuccessCallback, onErrorCallback) {
            var base64EncodedFile = new Base64(fileData);
            var file = {
                name: fileName,
                type: fileType,
                bits: $.xmlrpc.binary.fromBase64(base64EncodedFile.bytes),
                overwrite: false
            };
            callWordPress("wp.uploadFile", [ file ], onSuccessCallback, onErrorCallback);
        }
    };
} ]);