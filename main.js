! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ClipboardJS = t() : e.ClipboardJS = t()
}(this, function() {
    return function(e) {
        function t(i) {
            if (n[i]) return n[i].exports;
            var o = n[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.i = function(e) {
            return e
        }, t.d = function(e, n, i) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: i
            })
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e["default"]
            } : function() {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 3)
    }([function(e, t, n) {
        var i, o, r;
        ! function(s, a) {
            o = [e, n(7)], i = a, void 0 !== (r = "function" == typeof i ? i.apply(t, o) : i) && (e.exports = r)
        }(0, function(e, t) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            var i = function(e) {
                    return e && e.__esModule ? e : {
                        "default": e
                    }
                }(t),
                o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, n, i) {
                        return n && e(t.prototype, n), i && e(t, i), t
                    }
                }(),
                s = function() {
                    function e(t) {
                        n(this, e), this.resolveOptions(t), this.initSelection()
                    }
                    return r(e, [{
                        key: "resolveOptions",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
                        }
                    }, {
                        key: "initSelection",
                        value: function() {
                            this.text ? this.selectFake() : this.target && this.selectTarget()
                        }
                    }, {
                        key: "selectFake",
                        value: function() {
                            var e = this,
                                t = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandlerCallback = function() {
                                return e.removeFake()
                            }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";
                            var n = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, i["default"])(this.fakeElem), this.copyText()
                        }
                    }, {
                        key: "removeFake",
                        value: function() {
                            this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                        }
                    }, {
                        key: "selectTarget",
                        value: function() {
                            this.selectedText = (0, i["default"])(this.target), this.copyText()
                        }
                    }, {
                        key: "copyText",
                        value: function() {
                            var e = void 0;
                            try {
                                e = document.execCommand(this.action)
                            } catch (t) {
                                e = !1
                            }
                            this.handleResult(e)
                        }
                    }, {
                        key: "handleResult",
                        value: function(e) {
                            this.emitter.emit(e ? "success" : "error", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }
                    }, {
                        key: "clearSelection",
                        value: function() {
                            this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.removeFake()
                        }
                    }, {
                        key: "action",
                        set: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                            if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                        },
                        get: function() {
                            return this._action
                        }
                    }, {
                        key: "target",
                        set: function(e) {
                            if (void 0 !== e) {
                                if (!e || "object" !== (void 0 === e ? "undefined" : o(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                this._target = e
                            }
                        },
                        get: function() {
                            return this._target
                        }
                    }]), e
                }();
            e.exports = s
        })
    }, function(e, t, n) {
        function i(e, t, n) {
            if (!e && !t && !n) throw new Error("Missing required arguments");
            if (!a.string(t)) throw new TypeError("Second argument must be a String");
            if (!a.fn(n)) throw new TypeError("Third argument must be a Function");
            if (a.node(e)) return o(e, t, n);
            if (a.nodeList(e)) return r(e, t, n);
            if (a.string(e)) return s(e, t, n);
            throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
        }

        function o(e, t, n) {
            return e.addEventListener(t, n), {
                destroy: function() {
                    e.removeEventListener(t, n)
                }
            }
        }

        function r(e, t, n) {
            return Array.prototype.forEach.call(e, function(e) {
                e.addEventListener(t, n)
            }), {
                destroy: function() {
                    Array.prototype.forEach.call(e, function(e) {
                        e.removeEventListener(t, n)
                    })
                }
            }
        }

        function s(e, t, n) {
            return l(document.body, e, t, n)
        }
        var a = n(6),
            l = n(5);
        e.exports = i
    }, function(e, t) {
        function n() {}
        n.prototype = {
            on: function(e, t, n) {
                var i = this.e || (this.e = {});
                return (i[e] || (i[e] = [])).push({
                    fn: t,
                    ctx: n
                }), this
            },
            once: function(e, t, n) {
                function i() {
                    o.off(e, i), t.apply(n, arguments)
                }
                var o = this;
                return i._ = t, this.on(e, i, n)
            },
            emit: function(e) {
                var t = [].slice.call(arguments, 1),
                    n = ((this.e || (this.e = {}))[e] || []).slice(),
                    i = 0,
                    o = n.length;
                for (i; i < o; i++) n[i].fn.apply(n[i].ctx, t);
                return this
            },
            off: function(e, t) {
                var n = this.e || (this.e = {}),
                    i = n[e],
                    o = [];
                if (i && t)
                    for (var r = 0, s = i.length; r < s; r++) i[r].fn !== t && i[r].fn._ !== t && o.push(i[r]);
                return o.length ? n[e] = o : delete n[e], this
            }
        }, e.exports = n
    }, function(e, t, n) {
        var i, o, r;
        ! function(s, a) {
            o = [e, n(0), n(2), n(1)], i = a, void 0 !== (r = "function" == typeof i ? i.apply(t, o) : i) && (e.exports = r)
        }(0, function(e, t, n, i) {
            "use strict";

            function o(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }

            function r(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function s(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function a(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            function l(e, t) {
                var n = "data-clipboard-" + e;
                if (t.hasAttribute(n)) return t.getAttribute(n)
            }
            var c = o(t),
                u = o(n),
                d = o(i),
                p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                f = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, n, i) {
                        return n && e(t.prototype, n), i && e(t, i), t
                    }
                }(),
                h = function(e) {
                    function t(e, n) {
                        r(this, t);
                        var i = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        return i.resolveOptions(n), i.listenClick(e), i
                    }
                    return a(t, e), f(t, [{
                        key: "resolveOptions",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === p(e.container) ? e.container : document.body
                        }
                    }, {
                        key: "listenClick",
                        value: function(e) {
                            var t = this;
                            this.listener = (0, d["default"])(e, "click", function(e) {
                                return t.onClick(e)
                            })
                        }
                    }, {
                        key: "onClick",
                        value: function(e) {
                            var t = e.delegateTarget || e.currentTarget;
                            this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new c["default"]({
                                action: this.action(t),
                                target: this.target(t),
                                text: this.text(t),
                                container: this.container,
                                trigger: t,
                                emitter: this
                            })
                        }
                    }, {
                        key: "defaultAction",
                        value: function(e) {
                            return l("action", e)
                        }
                    }, {
                        key: "defaultTarget",
                        value: function(e) {
                            var t = l("target", e);
                            if (t) return document.querySelector(t)
                        }
                    }, {
                        key: "defaultText",
                        value: function(e) {
                            return l("text", e)
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                        }
                    }], [{
                        key: "isSupported",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                t = "string" == typeof e ? [e] : e,
                                n = !!document.queryCommandSupported;
                            return t.forEach(function(e) {
                                n = n && !!document.queryCommandSupported(e)
                            }), n
                        }
                    }]), t
                }(u["default"]);
            e.exports = h
        })
    }, function(e, t) {
        function n(e, t) {
            for (; e && e.nodeType !== i;) {
                if ("function" == typeof e.matches && e.matches(t)) return e;
                e = e.parentNode
            }
        }
        var i = 9;
        if ("undefined" != typeof Element && !Element.prototype.matches) {
            var o = Element.prototype;
            o.matches = o.matchesSelector || o.mozMatchesSelector || o.msMatchesSelector || o.oMatchesSelector || o.webkitMatchesSelector
        }
        e.exports = n
    }, function(e, t, n) {
        function i(e, t, n, i, o) {
            var s = r.apply(this, arguments);
            return e.addEventListener(n, s, o), {
                destroy: function() {
                    e.removeEventListener(n, s, o)
                }
            }
        }

        function o(e, t, n, o, r) {
            return "function" == typeof e.addEventListener ? i.apply(null, arguments) : "function" == typeof n ? i.bind(null, document).apply(null, arguments) : ("string" == typeof e && (e = document.querySelectorAll(e)), Array.prototype.map.call(e, function(e) {
                return i(e, t, n, o, r)
            }))
        }

        function r(e, t, n, i) {
            return function(n) {
                n.delegateTarget = s(n.target, t), n.delegateTarget && i.call(e, n)
            }
        }
        var s = n(4);
        e.exports = o
    }, function(e, t) {
        t.node = function(e) {
            return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
        }, t.nodeList = function(e) {
            var n = Object.prototype.toString.call(e);
            return void 0 !== e && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in e && (0 === e.length || t.node(e[0]))
        }, t.string = function(e) {
            return "string" == typeof e || e instanceof String
        }, t.fn = function(e) {
            return "[object Function]" === Object.prototype.toString.call(e)
        }
    }, function(e, t) {
        function n(e) {
            var t;
            if ("SELECT" === e.nodeName) e.focus(), t = e.value;
            else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
                var n = e.hasAttribute("readonly");
                n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), n || e.removeAttribute("readonly"), t = e.value
            } else {
                e.hasAttribute("contenteditable") && e.focus();
                var i = window.getSelection(),
                    o = document.createRange();
                o.selectNodeContents(e), i.removeAllRanges(), i.addRange(o), t = i.toString()
            }
            return t
        }
        e.exports = n
    }])
}), ! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

    function n(e, t, n) {
        var i, o = (t = t || se).createElement("script");
        if (o.text = e, n)
            for (i in we) n[i] && (o[i] = n[i]);
        t.head.appendChild(o).parentNode.removeChild(o)
    }

    function i(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? pe[fe.call(e)] || "object" : typeof e
    }

    function o(e) {
        var t = !!e && "length" in e && e.length,
            n = i(e);
        return !ye(e) && !be(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function r(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }

    function s(e, t, n) {
        return ye(t) ? xe.grep(e, function(e, i) {
            return !!t.call(e, i, e) !== n
        }) : t.nodeType ? xe.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? xe.grep(e, function(e) {
            return de.call(t, e) > -1 !== n
        }) : xe.filter(t, e, n)
    }

    function a(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function l(e) {
        var t = {};
        return xe.each(e.match(Ie) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function c(e) {
        return e
    }

    function u(e) {
        throw e
    }

    function d(e, t, n, i) {
        var o;
        try {
            e && ye(o = e.promise) ? o.call(e).done(t).fail(n) : e && ye(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(i))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }

    function p() {
        se.removeEventListener("DOMContentLoaded", p), e.removeEventListener("load", p), xe.ready()
    }

    function f(e, t) {
        return t.toUpperCase()
    }

    function h(e) {
        return e.replace(_e, "ms-").replace(Ne, f)
    }

    function m() {
        this.expando = xe.expando + m.uid++
    }

    function v(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Re.test(e) ? JSON.parse(e) : e)
    }

    function g(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType)
            if (i = "data-" + t.replace(ze, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(i))) {
                try {
                    n = v(n)
                } catch (e) {}
                qe.set(e, t, n)
            } else n = void 0;
        return n
    }

    function y(e, t, n, i) {
        var o, r, s = 20,
            a = i ? function() {
                return i.cur()
            } : function() {
                return xe.css(e, t, "")
            },
            l = a(),
            c = n && n[3] || (xe.cssNumber[t] ? "" : "px"),
            u = (xe.cssNumber[t] || "px" !== c && +l) && Ue.exec(xe.css(e, t));
        if (u && u[3] !== c) {
            for (l /= 2, c = c || u[3], u = +l || 1; s--;) xe.style(e, t, u + c), (1 - r) * (1 - (r = a() / l || .5)) <= 0 && (s = 0), u /= r;
            u *= 2, xe.style(e, t, u + c), n = n || []
        }
        return n && (u = +u || +l || 0, o = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = o)), o
    }

    function b(e) {
        var t, n = e.ownerDocument,
            i = e.nodeName,
            o = Xe[i];
        return o || (t = n.body.appendChild(n.createElement(i)), o = xe.css(t, "display"), t.parentNode.removeChild(t), "none" === o && (o = "block"), Xe[i] = o, o)
    }

    function w(e, t) {
        for (var n, i, o = [], r = 0, s = e.length; r < s; r++)(i = e[r]).style && (n = i.style.display, t ? ("none" === n && (o[r] = Fe.get(i, "display") || null, o[r] || (i.style.display = "")), "" === i.style.display && Ye(i) && (o[r] = b(i))) : "none" !== n && (o[r] = "none", Fe.set(i, "display", n)));
        for (r = 0; r < s; r++) null != o[r] && (e[r].style.display = o[r]);
        return e
    }

    function x(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && r(e, t) ? xe.merge([e], n) : n
    }

    function T(e, t) {
        for (var n = 0, i = e.length; n < i; n++) Fe.set(e[n], "globalEval", !t || Fe.get(t[n], "globalEval"))
    }

    function k(e, t, n, o, r) {
        for (var s, a, l, c, u, d, p = t.createDocumentFragment(), f = [], h = 0, m = e.length; h < m; h++)
            if ((s = e[h]) || 0 === s)
                if ("object" === i(s)) xe.merge(f, s.nodeType ? [s] : s);
                else if (Je.test(s)) {
            for (a = a || p.appendChild(t.createElement("div")), l = (Ve.exec(s) || ["", ""])[1].toLowerCase(), c = Qe[l] || Qe._default, a.innerHTML = c[1] + xe.htmlPrefilter(s) + c[2], d = c[0]; d--;) a = a.lastChild;
            xe.merge(f, a.childNodes), (a = p.firstChild).textContent = ""
        } else f.push(t.createTextNode(s));
        for (p.textContent = "", h = 0; s = f[h++];)
            if (o && xe.inArray(s, o) > -1) r && r.push(s);
            else if (u = xe.contains(s.ownerDocument, s), a = x(p.appendChild(s), "script"), u && T(a), n)
            for (d = 0; s = a[d++];) Ge.test(s.type || "") && n.push(s);
        return p
    }

    function C() {
        return !0
    }

    function S() {
        return !1
    }

    function $() {
        try {
            return se.activeElement
        } catch (e) {}
    }

    function E(e, t, n, i, o, r) {
        var s, a;
        if ("object" == typeof t) {
            "string" != typeof n && (i = i || n, n = void 0);
            for (a in t) E(e, a, n, i, t[a], r);
            return e
        }
        if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = S;
        else if (!o) return e;
        return 1 === r && (s = o, (o = function(e) {
            return xe().off(e), s.apply(this, arguments)
        }).guid = s.guid || (s.guid = xe.guid++)), e.each(function() {
            xe.event.add(this, t, o, i, n)
        })
    }

    function A(e, t) {
        return r(e, "table") && r(11 !== t.nodeType ? t : t.firstChild, "tr") ? xe(e).children("tbody")[0] || e : e
    }

    function D(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function j(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function O(e, t) {
        var n, i, o, r, s, a, l, c;
        if (1 === t.nodeType) {
            if (Fe.hasData(e) && (r = Fe.access(e), s = Fe.set(t, r), c = r.events)) {
                delete s.handle, s.events = {};
                for (o in c)
                    for (n = 0, i = c[o].length; n < i; n++) xe.event.add(t, o, c[o][n])
            }
            qe.hasData(e) && (a = qe.access(e), l = xe.extend({}, a), qe.set(t, l))
        }
    }

    function I(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Ke.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function L(e, t, i, o) {
        t = ce.apply([], t);
        var r, s, a, l, c, u, d = 0,
            p = e.length,
            f = p - 1,
            h = t[0],
            m = ye(h);
        if (m || p > 1 && "string" == typeof h && !ge.checkClone && st.test(h)) return e.each(function(n) {
            var r = e.eq(n);
            m && (t[0] = h.call(this, n, r.html())), L(r, t, i, o)
        });
        if (p && (r = k(t, e[0].ownerDocument, !1, e, o), s = r.firstChild, 1 === r.childNodes.length && (r = s), s || o)) {
            for (l = (a = xe.map(x(r, "script"), D)).length; d < p; d++) c = r, d !== f && (c = xe.clone(c, !0, !0), l && xe.merge(a, x(c, "script"))), i.call(e[d], c, d);
            if (l)
                for (u = a[a.length - 1].ownerDocument, xe.map(a, j), d = 0; d < l; d++) c = a[d], Ge.test(c.type || "") && !Fe.access(c, "globalEval") && xe.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? xe._evalUrl && xe._evalUrl(c.src) : n(c.textContent.replace(at, ""), u, c))
        }
        return e
    }

    function M(e, t, n) {
        for (var i, o = t ? xe.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || xe.cleanData(x(i)), i.parentNode && (n && xe.contains(i.ownerDocument, i) && T(x(i, "script")), i.parentNode.removeChild(i));
        return e
    }

    function P(e, t, n) {
        var i, o, r, s, a = e.style;
        return (n = n || ct(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || xe.contains(e.ownerDocument, e) || (s = xe.style(e, t)), !ge.pixelBoxStyles() && lt.test(s) && ut.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s
    }

    function _(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function N(e) {
        if (e in vt) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = mt.length; n--;)
            if ((e = mt[n] + t) in vt) return e
    }

    function H(e) {
        var t = xe.cssProps[e];
        return t || (t = xe.cssProps[e] = N(e) || e), t
    }

    function F(e, t, n) {
        var i = Ue.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
    }

    function q(e, t, n, i, o, r) {
        var s = "width" === t ? 1 : 0,
            a = 0,
            l = 0;
        if (n === (i ? "border" : "content")) return 0;
        for (; s < 4; s += 2) "margin" === n && (l += xe.css(e, n + Be[s], !0, o)), i ? ("content" === n && (l -= xe.css(e, "padding" + Be[s], !0, o)), "margin" !== n && (l -= xe.css(e, "border" + Be[s] + "Width", !0, o))) : (l += xe.css(e, "padding" + Be[s], !0, o), "padding" !== n ? l += xe.css(e, "border" + Be[s] + "Width", !0, o) : a += xe.css(e, "border" + Be[s] + "Width", !0, o));
        return !i && r >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - a - .5))), l
    }

    function R(e, t, n) {
        var i = ct(e),
            o = P(e, t, i),
            r = "border-box" === xe.css(e, "boxSizing", !1, i),
            s = r;
        if (lt.test(o)) {
            if (!n) return o;
            o = "auto"
        }
        return s = s && (ge.boxSizingReliable() || o === e.style[t]), ("auto" === o || !parseFloat(o) && "inline" === xe.css(e, "display", !1, i)) && (o = e["offset" + t[0].toUpperCase() + t.slice(1)], s = !0), (o = parseFloat(o) || 0) + q(e, t, n || (r ? "border" : "content"), s, i, o) + "px"
    }

    function z(e, t, n, i, o) {
        return new z.prototype.init(e, t, n, i, o)
    }

    function W() {
        yt && (!1 === se.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(W) : e.setTimeout(W, xe.fx.interval), xe.fx.tick())
    }

    function U() {
        return e.setTimeout(function() {
            gt = void 0
        }), gt = Date.now()
    }

    function B(e, t) {
        var n, i = 0,
            o = {
                height: e
            };
        for (t = t ? 1 : 0; i < 4; i += 2 - t) o["margin" + (n = Be[i])] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o
    }

    function Y(e, t, n) {
        for (var i, o = (K.tweeners[t] || []).concat(K.tweeners["*"]), r = 0, s = o.length; r < s; r++)
            if (i = o[r].call(n, t, e)) return i
    }

    function Z(e, t, n) {
        var i, o, r, s, a, l, c, u, d = "width" in t || "height" in t,
            p = this,
            f = {},
            h = e.style,
            m = e.nodeType && Ye(e),
            v = Fe.get(e, "fxshow");
        n.queue || (null == (s = xe._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function() {
            s.unqueued || a()
        }), s.unqueued++, p.always(function() {
            p.always(function() {
                s.unqueued--, xe.queue(e, "fx").length || s.empty.fire()
            })
        }));
        for (i in t)
            if (o = t[i], bt.test(o)) {
                if (delete t[i], r = r || "toggle" === o, o === (m ? "hide" : "show")) {
                    if ("show" !== o || !v || void 0 === v[i]) continue;
                    m = !0
                }
                f[i] = v && v[i] || xe.style(e, i)
            }
        if ((l = !xe.isEmptyObject(t)) || !xe.isEmptyObject(f)) {
            d && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = v && v.display) && (c = Fe.get(e, "display")), "none" === (u = xe.css(e, "display")) && (c ? u = c : (w([e], !0), c = e.style.display || c, u = xe.css(e, "display"), w([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === xe.css(e, "float") && (l || (p.done(function() {
                h.display = c
            }), null == c && (u = h.display, c = "none" === u ? "" : u)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
            })), l = !1;
            for (i in f) l || (v ? "hidden" in v && (m = v.hidden) : v = Fe.access(e, "fxshow", {
                display: c
            }), r && (v.hidden = !m), m && w([e], !0), p.done(function() {
                m || w([e]), Fe.remove(e, "fxshow");
                for (i in f) xe.style(e, i, f[i])
            })), l = Y(m ? v[i] : 0, i, p), i in v || (v[i] = l.start, m && (l.end = l.start, l.start = 0))
        }
    }

    function X(e, t) {
        var n, i, o, r, s;
        for (n in e)
            if (i = h(n), o = t[i], r = e[n], Array.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (s = xe.cssHooks[i]) && "expand" in s) {
                r = s.expand(r), delete e[i];
                for (n in r) n in e || (e[n] = r[n], t[n] = o)
            } else t[i] = o
    }

    function K(e, t, n) {
        var i, o, r = 0,
            s = K.prefilters.length,
            a = xe.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (o) return !1;
                for (var t = gt || U(), n = Math.max(0, c.startTime + c.duration - t), i = 1 - (n / c.duration || 0), r = 0, s = c.tweens.length; r < s; r++) c.tweens[r].run(i);
                return a.notifyWith(e, [c, i, n]), i < 1 && s ? n : (s || a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c]), !1)
            },
            c = a.promise({
                elem: e,
                props: xe.extend({}, t),
                opts: xe.extend(!0, {
                    specialEasing: {},
                    easing: xe.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: gt || U(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = xe.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        i = t ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n < i; n++) c.tweens[n].run(1);
                    return t ? (a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c, t])) : a.rejectWith(e, [c, t]), this
                }
            }),
            u = c.props;
        for (X(u, c.opts.specialEasing); r < s; r++)
            if (i = K.prefilters[r].call(c, e, u, c.opts)) return ye(i.stop) && (xe._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
        return xe.map(u, Y, c), ye(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), xe.fx.timer(xe.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c
    }

    function V(e) {
        return (e.match(Ie) || []).join(" ")
    }

    function G(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function Q(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.match(Ie) || [] : []
    }

    function J(e, t, n, o) {
        var r;
        if (Array.isArray(t)) xe.each(t, function(t, i) {
            n || Ot.test(e) ? o(e, i) : J(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, o)
        });
        else if (n || "object" !== i(t)) o(e, t);
        else
            for (r in t) J(e + "[" + r + "]", t[r], n, o)
    }

    function ee(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, o = 0,
                r = t.toLowerCase().match(Ie) || [];
            if (ye(n))
                for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function te(e, t, n, i) {
        function o(a) {
            var l;
            return r[a] = !0, xe.each(e[a] || [], function(e, a) {
                var c = a(t, n, i);
                return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c), o(c), !1)
            }), l
        }
        var r = {},
            s = e === Wt;
        return o(t.dataTypes[0]) || !r["*"] && o("*")
    }

    function ne(e, t) {
        var n, i, o = xe.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
        return i && xe.extend(!0, e, i), e
    }

    function ie(e, t, n) {
        for (var i, o, r, s, a = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (o in a)
                if (a[o] && a[o].test(i)) {
                    l.unshift(o);
                    break
                }
        if (l[0] in n) r = l[0];
        else {
            for (o in n) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    r = o;
                    break
                }
                s || (s = o)
            }
            r = r || s
        }
        if (r) return r !== l[0] && l.unshift(r), n[r]
    }

    function oe(e, t, n, i) {
        var o, r, s, a, l, c = {},
            u = e.dataTypes.slice();
        if (u[1])
            for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
        for (r = u.shift(); r;)
            if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift())
                if ("*" === r) r = l;
                else if ("*" !== l && l !== r) {
            if (!(s = c[l + " " + r] || c["* " + r]))
                for (o in c)
                    if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                        !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], u.unshift(a[1]));
                        break
                    }
            if (!0 !== s)
                if (s && e["throws"]) t = s(t);
                else try {
                    t = s(t)
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: s ? e : "No conversion from " + l + " to " + r
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }
    var re = [],
        se = e.document,
        ae = Object.getPrototypeOf,
        le = re.slice,
        ce = re.concat,
        ue = re.push,
        de = re.indexOf,
        pe = {},
        fe = pe.toString,
        he = pe.hasOwnProperty,
        me = he.toString,
        ve = me.call(Object),
        ge = {},
        ye = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        be = function(e) {
            return null != e && e === e.window
        },
        we = {
            type: !0,
            src: !0,
            noModule: !0
        },
        xe = function(e, t) {
            return new xe.fn.init(e, t)
        },
        Te = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    xe.fn = xe.prototype = {
        jquery: "3.3.1",
        constructor: xe,
        length: 0,
        toArray: function() {
            return le.call(this)
        },
        get: function(e) {
            return null == e ? le.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = xe.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return xe.each(this, e)
        },
        map: function(e) {
            return this.pushStack(xe.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(le.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ue,
        sort: re.sort,
        splice: re.splice
    }, xe.extend = xe.fn.extend = function() {
        var e, t, n, i, o, r, s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || ye(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
            if (null != (e = arguments[a]))
                for (t in e) n = s[t], s !== (i = e[t]) && (c && i && (xe.isPlainObject(i) || (o = Array.isArray(i))) ? (o ? (o = !1, r = n && Array.isArray(n) ? n : []) : r = n && xe.isPlainObject(n) ? n : {}, s[t] = xe.extend(c, r, i)) : void 0 !== i && (s[t] = i));
        return s
    }, xe.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== fe.call(e) || (t = ae(e)) && ("function" != typeof(n = he.call(t, "constructor") && t.constructor) || me.call(n) !== ve))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function(e) {
            n(e)
        },
        each: function(e, t) {
            var n, i = 0;
            if (o(e))
                for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
            else
                for (i in e)
                    if (!1 === t.call(e[i], i, e[i])) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(Te, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (o(Object(e)) ? xe.merge(n, "string" == typeof e ? [e] : e) : ue.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : de.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, o = e.length; i < n; i++) e[o++] = t[i];
            return e.length = o, e
        },
        grep: function(e, t, n) {
            for (var i, o = [], r = 0, s = e.length, a = !n; r < s; r++)(i = !t(e[r], r)) !== a && o.push(e[r]);
            return o
        },
        map: function(e, t, n) {
            var i, r, s = 0,
                a = [];
            if (o(e))
                for (i = e.length; s < i; s++) null != (r = t(e[s], s, n)) && a.push(r);
            else
                for (s in e) null != (r = t(e[s], s, n)) && a.push(r);
            return ce.apply([], a)
        },
        guid: 1,
        support: ge
    }), "function" == typeof Symbol && (xe.fn[Symbol.iterator] = re[Symbol.iterator]), xe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        pe["[object " + t + "]"] = t.toLowerCase()
    });
    var ke = function(e) {
        function t(e, t, n, i) {
            var o, r, s, a, l, c, u, p = t && t.ownerDocument,
                h = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
            if (!i && ((t ? t.ownerDocument || t : R) !== L && I(t), t = t || L, P)) {
                if (11 !== h && (l = ge.exec(e)))
                    if (o = l[1]) {
                        if (9 === h) {
                            if (!(s = t.getElementById(o))) return n;
                            if (s.id === o) return n.push(s), n
                        } else if (p && (s = p.getElementById(o)) && F(t, s) && s.id === o) return n.push(s), n
                    } else {
                        if (l[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
                        if ((o = l[3]) && T.getElementsByClassName && t.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(o)), n
                    }
                if (T.qsa && !Y[e + " "] && (!_ || !_.test(e))) {
                    if (1 !== h) p = t, u = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(xe, Te) : t.setAttribute("id", a = q), r = (c = $(e)).length; r--;) c[r] = "#" + a + " " + f(c[r]);
                        u = c.join(","), p = ye.test(e) && d(t.parentNode) || t
                    }
                    if (u) try {
                        return Q.apply(n, p.querySelectorAll(u)), n
                    } catch (e) {} finally {
                        a === q && t.removeAttribute("id")
                    }
                }
            }
            return A(e.replace(ae, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = i
            }
            var t = [];
            return e
        }

        function i(e) {
            return e[q] = !0, e
        }

        function o(e) {
            var t = L.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function r(e, t) {
            for (var n = e.split("|"), i = n.length; i--;) k.attrHandle[n[i]] = t
        }

        function s(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function a(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function c(e) {
            return function(t) {
                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Ce(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function u(e) {
            return i(function(t) {
                return t = +t, i(function(n, i) {
                    for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                })
            })
        }

        function d(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function p() {}

        function f(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i
        }

        function h(e, t, n) {
            var i = t.dir,
                o = t.next,
                r = o || i,
                s = n && "parentNode" === r,
                a = W++;
            return t.first ? function(t, n, o) {
                for (; t = t[i];)
                    if (1 === t.nodeType || s) return e(t, n, o);
                return !1
            } : function(t, n, l) {
                var c, u, d, p = [z, a];
                if (l) {
                    for (; t = t[i];)
                        if ((1 === t.nodeType || s) && e(t, n, l)) return !0
                } else
                    for (; t = t[i];)
                        if (1 === t.nodeType || s)
                            if (d = t[q] || (t[q] = {}), u = d[t.uniqueID] || (d[t.uniqueID] = {}), o && o === t.nodeName.toLowerCase()) t = t[i] || t;
                            else {
                                if ((c = u[r]) && c[0] === z && c[1] === a) return p[2] = c[2];
                                if (u[r] = p, p[2] = e(t, n, l)) return !0
                            } return !1
            }
        }

        function m(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, i)) return !1;
                return !0
            } : e[0]
        }

        function v(e, n, i) {
            for (var o = 0, r = n.length; o < r; o++) t(e, n[o], i);
            return i
        }

        function g(e, t, n, i, o) {
            for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++)(r = e[a]) && (n && !n(r, i, o) || (s.push(r), c && t.push(a)));
            return s
        }

        function y(e, t, n, o, r, s) {
            return o && !o[q] && (o = y(o)), r && !r[q] && (r = y(r, s)), i(function(i, s, a, l) {
                var c, u, d, p = [],
                    f = [],
                    h = s.length,
                    m = i || v(t || "*", a.nodeType ? [a] : a, []),
                    y = !e || !i && t ? m : g(m, p, e, a, l),
                    b = n ? r || (i ? e : h || o) ? [] : s : y;
                if (n && n(y, b, a, l), o)
                    for (c = g(b, f), o(c, [], a, l), u = c.length; u--;)(d = c[u]) && (b[f[u]] = !(y[f[u]] = d));
                if (i) {
                    if (r || e) {
                        if (r) {
                            for (c = [], u = b.length; u--;)(d = b[u]) && c.push(y[u] = d);
                            r(null, b = [], c, l)
                        }
                        for (u = b.length; u--;)(d = b[u]) && (c = r ? ee(i, d) : p[u]) > -1 && (i[c] = !(s[c] = d))
                    }
                } else b = g(b === s ? b.splice(h, b.length) : b), r ? r(null, s, b, l) : Q.apply(s, b)
            })
        }

        function b(e) {
            for (var t, n, i, o = e.length, r = k.relative[e[0].type], s = r || k.relative[" "], a = r ? 1 : 0, l = h(function(e) {
                    return e === t
                }, s, !0), c = h(function(e) {
                    return ee(t, e) > -1
                }, s, !0), u = [function(e, n, i) {
                    var o = !r && (i || n !== D) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                    return t = null, o
                }]; a < o; a++)
                if (n = k.relative[e[a].type]) u = [h(m(u), n)];
                else {
                    if ((n = k.filter[e[a].type].apply(null, e[a].matches))[q]) {
                        for (i = ++a; i < o && !k.relative[e[i].type]; i++);
                        return y(a > 1 && m(u), a > 1 && f(e.slice(0, a - 1).concat({
                            value: " " === e[a - 2].type ? "*" : ""
                        })).replace(ae, "$1"), n, a < i && b(e.slice(a, i)), i < o && b(e = e.slice(i)), i < o && f(e))
                    }
                    u.push(n)
                }
            return m(u)
        }

        function w(e, n) {
            var o = n.length > 0,
                r = e.length > 0,
                s = function(i, s, a, l, c) {
                    var u, d, p, f = 0,
                        h = "0",
                        m = i && [],
                        v = [],
                        y = D,
                        b = i || r && k.find.TAG("*", c),
                        w = z += null == y ? 1 : Math.random() || .1,
                        x = b.length;
                    for (c && (D = s === L || s || c); h !== x && null != (u = b[h]); h++) {
                        if (r && u) {
                            for (d = 0, s || u.ownerDocument === L || (I(u), a = !P); p = e[d++];)
                                if (p(u, s || L, a)) {
                                    l.push(u);
                                    break
                                }
                            c && (z = w)
                        }
                        o && ((u = !p && u) && f--, i && m.push(u))
                    }
                    if (f += h, o && h !== f) {
                        for (d = 0; p = n[d++];) p(m, v, s, a);
                        if (i) {
                            if (f > 0)
                                for (; h--;) m[h] || v[h] || (v[h] = V.call(l));
                            v = g(v)
                        }
                        Q.apply(l, v), c && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                    }
                    return c && (z = w, D = y), m
                };
            return o ? i(s) : s
        }
        var x, T, k, C, S, $, E, A, D, j, O, I, L, M, P, _, N, H, F, q = "sizzle" + 1 * new Date,
            R = e.document,
            z = 0,
            W = 0,
            U = n(),
            B = n(),
            Y = n(),
            Z = function(e, t) {
                return e === t && (O = !0), 0
            },
            X = {}.hasOwnProperty,
            K = [],
            V = K.pop,
            G = K.push,
            Q = K.push,
            J = K.slice,
            ee = function(e, t) {
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            ie = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
            re = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
            se = new RegExp(ne + "+", "g"),
            ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            le = new RegExp("^" + ne + "*," + ne + "*"),
            ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            de = new RegExp(re),
            pe = new RegExp("^" + ie + "$"),
            fe = {
                ID: new RegExp("^#(" + ie + ")"),
                CLASS: new RegExp("^\\.(" + ie + ")"),
                TAG: new RegExp("^(" + ie + "|[*])"),
                ATTR: new RegExp("^" + oe),
                PSEUDO: new RegExp("^" + re),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            he = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ve = /^[^{]+\{\s*\[native \w/,
            ge = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ye = /[+~]/,
            be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            we = function(e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            },
            xe = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            Te = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            ke = function() {
                I()
            },
            Ce = h(function(e) {
                return !0 === e.disabled && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            Q.apply(K = J.call(R.childNodes), R.childNodes), K[R.childNodes.length].nodeType
        } catch (e) {
            Q = {
                apply: K.length ? function(e, t) {
                    G.apply(e, J.call(t))
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        T = t.support = {}, S = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, I = t.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : R;
            return i !== L && 9 === i.nodeType && i.documentElement ? (L = i, M = L.documentElement, P = !S(L), R !== L && (n = L.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", ke, !1) : n.attachEvent && n.attachEvent("onunload", ke)), T.attributes = o(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), T.getElementsByTagName = o(function(e) {
                return e.appendChild(L.createComment("")), !e.getElementsByTagName("*").length
            }), T.getElementsByClassName = ve.test(L.getElementsByClassName), T.getById = o(function(e) {
                return M.appendChild(e).id = q, !L.getElementsByName || !L.getElementsByName(q).length
            }), T.getById ? (k.filter.ID = function(e) {
                var t = e.replace(be, we);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, k.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && P) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (k.filter.ID = function(e) {
                var t = e.replace(be, we);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }, k.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && P) {
                    var n, i, o, r = t.getElementById(e);
                    if (r) {
                        if ((n = r.getAttributeNode("id")) && n.value === e) return [r];
                        for (o = t.getElementsByName(e), i = 0; r = o[i++];)
                            if ((n = r.getAttributeNode("id")) && n.value === e) return [r]
                    }
                    return []
                }
            }), k.find.TAG = T.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : T.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, i = [],
                    o = 0,
                    r = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return r
            }, k.find.CLASS = T.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && P) return t.getElementsByClassName(e)
            }, N = [], _ = [], (T.qsa = ve.test(L.querySelectorAll)) && (o(function(e) {
                M.appendChild(e).innerHTML = "<a id='" + q + "'></a><select id='" + q + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && _.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || _.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + q + "-]").length || _.push("~="), e.querySelectorAll(":checked").length || _.push(":checked"), e.querySelectorAll("a#" + q + "+*").length || _.push(".#.+[+~]")
            }), o(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = L.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && _.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && _.push(":enabled", ":disabled"), M.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && _.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), _.push(",.*:")
            })), (T.matchesSelector = ve.test(H = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && o(function(e) {
                T.disconnectedMatch = H.call(e, "*"), H.call(e, "[s!='']:x"), N.push("!=", re)
            }), _ = _.length && new RegExp(_.join("|")), N = N.length && new RegExp(N.join("|")), t = ve.test(M.compareDocumentPosition), F = t || ve.test(M.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, Z = t ? function(e, t) {
                if (e === t) return O = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !T.sortDetached && t.compareDocumentPosition(e) === n ? e === L || e.ownerDocument === R && F(R, e) ? -1 : t === L || t.ownerDocument === R && F(R, t) ? 1 : j ? ee(j, e) - ee(j, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return O = !0, 0;
                var n, i = 0,
                    o = e.parentNode,
                    r = t.parentNode,
                    a = [e],
                    l = [t];
                if (!o || !r) return e === L ? -1 : t === L ? 1 : o ? -1 : r ? 1 : j ? ee(j, e) - ee(j, t) : 0;
                if (o === r) return s(e, t);
                for (n = e; n = n.parentNode;) a.unshift(n);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (; a[i] === l[i];) i++;
                return i ? s(a[i], l[i]) : a[i] === R ? -1 : l[i] === R ? 1 : 0
            }, L) : L
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== L && I(e), n = n.replace(ue, "='$1']"), T.matchesSelector && P && !Y[n + " "] && (!N || !N.test(n)) && (!_ || !_.test(n))) try {
                var i = H.call(e, n);
                if (i || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
            } catch (e) {}
            return t(n, L, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== L && I(e), F(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== L && I(e);
            var n = k.attrHandle[t.toLowerCase()],
                i = n && X.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;
            return void 0 !== i ? i : T.attributes || !P ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.escape = function(e) {
            return (e + "").replace(xe, Te)
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                i = 0,
                o = 0;
            if (O = !T.detectDuplicates, j = !T.sortStable && e.slice(0), e.sort(Z), O) {
                for (; t = e[o++];) t === e[o] && (i = n.push(o));
                for (; i--;) e.splice(n[i], 1)
            }
            return j = null, e
        }, C = t.getText = function(e) {
            var t, n = "",
                i = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                for (; t = e[i++];) n += C(t);
            return n
        }, (k = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: fe,
            attrHandle: {},
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
                    return e[1] = e[1].replace(be, we), e[3] = (e[3] || e[4] || e[5] || "").replace(be, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = $(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(be, we).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = U[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && U(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, i) {
                    return function(o) {
                        var r = t.attr(o, e);
                        return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(se, " ") + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(e, t, n, i, o) {
                    var r = "nth" !== e.slice(0, 3),
                        s = "last" !== e.slice(-4),
                        a = "of-type" === t;
                    return 1 === i && 0 === o ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, l) {
                        var c, u, d, p, f, h, m = r !== s ? "nextSibling" : "previousSibling",
                            v = t.parentNode,
                            g = a && t.nodeName.toLowerCase(),
                            y = !l && !a,
                            b = !1;
                        if (v) {
                            if (r) {
                                for (; m;) {
                                    for (p = t; p = p[m];)
                                        if (a ? p.nodeName.toLowerCase() === g : 1 === p.nodeType) return !1;
                                    h = m = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [s ? v.firstChild : v.lastChild], s && y) {
                                for (b = (f = (c = (u = (d = (p = v)[q] || (p[q] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === z && c[1]) && c[2], p = f && v.childNodes[f]; p = ++f && p && p[m] || (b = f = 0) || h.pop();)
                                    if (1 === p.nodeType && ++b && p === t) {
                                        u[e] = [z, f, b];
                                        break
                                    }
                            } else if (y && (b = f = (c = (u = (d = (p = t)[q] || (p[q] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === z && c[1]), !1 === b)
                                for (;
                                    (p = ++f && p && p[m] || (b = f = 0) || h.pop()) && ((a ? p.nodeName.toLowerCase() !== g : 1 !== p.nodeType) || !++b || (y && ((u = (d = p[q] || (p[q] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] = [z, b]), p !== t)););
                            return (b -= o) === i || b % i == 0 && b / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var o, r = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return r[q] ? r(n) : r.length > 1 ? (o = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                        for (var i, o = r(e, n), s = o.length; s--;) e[i = ee(e, o[s])] = !(t[i] = o[s])
                    }) : function(e) {
                        return r(e, 0, o)
                    }) : r
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                        n = [],
                        o = E(e.replace(ae, "$1"));
                    return o[q] ? i(function(e, t, n, i) {
                        for (var r, s = o(e, null, i, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
                    }) : function(e, i, r) {
                        return t[0] = e, o(t, null, r, n), t[0] = null, !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return e = e.replace(be, we),
                        function(t) {
                            return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                        }
                }),
                lang: i(function(e) {
                    return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, we).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === M
                },
                focus: function(e) {
                    return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: c(!1),
                disabled: c(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !k.pseudos.empty(e)
                },
                header: function(e) {
                    return me.test(e.nodeName)
                },
                input: function(e) {
                    return he.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: u(function() {
                    return [0]
                }),
                last: u(function(e, t) {
                    return [t - 1]
                }),
                eq: u(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: u(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: u(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: u(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
                    return e
                }),
                gt: u(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                    return e
                })
            }
        }).pseudos.nth = k.pseudos.eq;
        for (x in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) k.pseudos[x] = a(x);
        for (x in {
                submit: !0,
                reset: !0
            }) k.pseudos[x] = l(x);
        return p.prototype = k.filters = k.pseudos, k.setFilters = new p, $ = t.tokenize = function(e, n) {
            var i, o, r, s, a, l, c, u = B[e + " "];
            if (u) return n ? 0 : u.slice(0);
            for (a = e, l = [], c = k.preFilter; a;) {
                i && !(o = le.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), i = !1, (o = ce.exec(a)) && (i = o.shift(), r.push({
                    value: i,
                    type: o[0].replace(ae, " ")
                }), a = a.slice(i.length));
                for (s in k.filter) !(o = fe[s].exec(a)) || c[s] && !(o = c[s](o)) || (i = o.shift(), r.push({
                    value: i,
                    type: s,
                    matches: o
                }), a = a.slice(i.length));
                if (!i) break
            }
            return n ? a.length : a ? t.error(e) : B(e, l).slice(0)
        }, E = t.compile = function(e, t) {
            var n, i = [],
                o = [],
                r = Y[e + " "];
            if (!r) {
                for (t || (t = $(e)), n = t.length; n--;)(r = b(t[n]))[q] ? i.push(r) : o.push(r);
                (r = Y(e, w(o, i))).selector = e
            }
            return r
        }, A = t.select = function(e, t, n, i) {
            var o, r, s, a, l, c = "function" == typeof e && e,
                u = !i && $(e = c.selector || e);
            if (n = n || [], 1 === u.length) {
                if ((r = u[0] = u[0].slice(0)).length > 2 && "ID" === (s = r[0]).type && 9 === t.nodeType && P && k.relative[r[1].type]) {
                    if (!(t = (k.find.ID(s.matches[0].replace(be, we), t) || [])[0])) return n;
                    c && (t = t.parentNode), e = e.slice(r.shift().value.length)
                }
                for (o = fe.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !k.relative[a = s.type]);)
                    if ((l = k.find[a]) && (i = l(s.matches[0].replace(be, we), ye.test(r[0].type) && d(t.parentNode) || t))) {
                        if (r.splice(o, 1), !(e = i.length && f(r))) return Q.apply(n, i), n;
                        break
                    }
            }
            return (c || E(e, u))(i, t, !P, n, !t || ye.test(e) && d(t.parentNode) || t), n
        }, T.sortStable = q.split("").sort(Z).join("") === q, T.detectDuplicates = !!O, I(), T.sortDetached = o(function(e) {
            return 1 & e.compareDocumentPosition(L.createElement("fieldset"))
        }), o(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || r("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), T.attributes && o(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || r("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), o(function(e) {
            return null == e.getAttribute("disabled")
        }) || r(te, function(e, t, n) {
            var i;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    xe.find = ke, xe.expr = ke.selectors, xe.expr[":"] = xe.expr.pseudos, xe.uniqueSort = xe.unique = ke.uniqueSort, xe.text = ke.getText, xe.isXMLDoc = ke.isXML, xe.contains = ke.contains, xe.escapeSelector = ke.escape;
    var Ce = function(e, t, n) {
            for (var i = [], o = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (o && xe(e).is(n)) break;
                    i.push(e)
                }
            return i
        },
        Se = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        $e = xe.expr.match.needsContext,
        Ee = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    xe.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? xe.find.matchesSelector(i, e) ? [i] : [] : xe.find.matches(e, xe.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, xe.fn.extend({
        find: function(e) {
            var t, n, i = this.length,
                o = this;
            if ("string" != typeof e) return this.pushStack(xe(e).filter(function() {
                for (t = 0; t < i; t++)
                    if (xe.contains(o[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < i; t++) xe.find(e, o[t], n);
            return i > 1 ? xe.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(s(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(s(this, e || [], !0))
        },
        is: function(e) {
            return !!s(this, "string" == typeof e && $e.test(e) ? xe(e) : e || [], !1).length
        }
    });
    var Ae, De = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (xe.fn.init = function(e, t, n) {
        var i, o;
        if (!e) return this;
        if (n = n || Ae, "string" == typeof e) {
            if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : De.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof xe ? t[0] : t, xe.merge(this, xe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : se, !0)), Ee.test(i[1]) && xe.isPlainObject(t))
                    for (i in t) ye(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            return (o = se.getElementById(i[2])) && (this[0] = o, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : ye(e) ? void 0 !== n.ready ? n.ready(e) : e(xe) : xe.makeArray(e, this)
    }).prototype = xe.fn, Ae = xe(se);
    var je = /^(?:parents|prev(?:Until|All))/,
        Oe = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    xe.fn.extend({
        has: function(e) {
            var t = xe(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (xe.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, i = 0,
                o = this.length,
                r = [],
                s = "string" != typeof e && xe(e);
            if (!$e.test(e))
                for (; i < o; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && xe.find.matchesSelector(n, e))) {
                            r.push(n);
                            break
                        }
            return this.pushStack(r.length > 1 ? xe.uniqueSort(r) : r)
        },
        index: function(e) {
            return e ? "string" == typeof e ? de.call(xe(e), this[0]) : de.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(xe.uniqueSort(xe.merge(this.get(), xe(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), xe.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return Ce(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return Ce(e, "parentNode", n)
        },
        next: function(e) {
            return a(e, "nextSibling")
        },
        prev: function(e) {
            return a(e, "previousSibling")
        },
        nextAll: function(e) {
            return Ce(e, "nextSibling")
        },
        prevAll: function(e) {
            return Ce(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return Ce(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return Ce(e, "previousSibling", n)
        },
        siblings: function(e) {
            return Se((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return Se(e.firstChild)
        },
        contents: function(e) {
            return r(e, "iframe") ? e.contentDocument : (r(e, "template") && (e = e.content || e), xe.merge([], e.childNodes))
        }
    }, function(e, t) {
        xe.fn[e] = function(n, i) {
            var o = xe.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = xe.filter(i, o)), this.length > 1 && (Oe[e] || xe.uniqueSort(o), je.test(e) && o.reverse()), this.pushStack(o)
        }
    });
    var Ie = /[^\x20\t\r\n\f]+/g;
    xe.Callbacks = function(e) {
        e = "string" == typeof e ? l(e) : xe.extend({}, e);
        var t, n, o, r, s = [],
            a = [],
            c = -1,
            u = function() {
                for (r = r || e.once, o = t = !0; a.length; c = -1)
                    for (n = a.shift(); ++c < s.length;) !1 === s[c].apply(n[0], n[1]) && e.stopOnFalse && (c = s.length, n = !1);
                e.memory || (n = !1), t = !1, r && (s = n ? [] : "")
            },
            d = {
                add: function() {
                    return s && (n && !t && (c = s.length - 1, a.push(n)), function o(t) {
                        xe.each(t, function(t, n) {
                            ye(n) ? e.unique && d.has(n) || s.push(n) : n && n.length && "string" !== i(n) && o(n)
                        })
                    }(arguments), n && !t && u()), this
                },
                remove: function() {
                    return xe.each(arguments, function(e, t) {
                        for (var n;
                            (n = xe.inArray(t, s, n)) > -1;) s.splice(n, 1), n <= c && c--
                    }), this
                },
                has: function(e) {
                    return e ? xe.inArray(e, s) > -1 : s.length > 0
                },
                empty: function() {
                    return s && (s = []), this
                },
                disable: function() {
                    return r = a = [], s = n = "", this
                },
                disabled: function() {
                    return !s
                },
                lock: function() {
                    return r = a = [], n || t || (s = n = ""), this
                },
                locked: function() {
                    return !!r
                },
                fireWith: function(e, n) {
                    return r || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return d
    }, xe.extend({
        Deferred: function(t) {
            var n = [
                    ["notify", "progress", xe.Callbacks("memory"), xe.Callbacks("memory"), 2],
                    ["resolve", "done", xe.Callbacks("once memory"), xe.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", xe.Callbacks("once memory"), xe.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                o = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments), this
                    },
                    "catch": function(e) {
                        return o.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return xe.Deferred(function(t) {
                            xe.each(n, function(n, i) {
                                var o = ye(e[i[4]]) && e[i[4]];
                                r[i[1]](function() {
                                    var e = o && o.apply(this, arguments);
                                    e && ye(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[i[0] + "With"](this, o ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    then: function(t, i, o) {
                        function r(t, n, i, o) {
                            return function() {
                                var a = this,
                                    l = arguments,
                                    d = function() {
                                        var e, d;
                                        if (!(t < s)) {
                                            if ((e = i.apply(a, l)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                            d = e && ("object" == typeof e || "function" == typeof e) && e.then, ye(d) ? o ? d.call(e, r(s, n, c, o), r(s, n, u, o)) : (s++, d.call(e, r(s, n, c, o), r(s, n, u, o), r(s, n, c, n.notifyWith))) : (i !== c && (a = void 0, l = [e]), (o || n.resolveWith)(a, l))
                                        }
                                    },
                                    p = o ? d : function() {
                                        try {
                                            d()
                                        } catch (e) {
                                            xe.Deferred.exceptionHook && xe.Deferred.exceptionHook(e, p.stackTrace), t + 1 >= s && (i !== u && (a = void 0, l = [e]), n.rejectWith(a, l))
                                        }
                                    };
                                t ? p() : (xe.Deferred.getStackHook && (p.stackTrace = xe.Deferred.getStackHook()), e.setTimeout(p))
                            }
                        }
                        var s = 0;
                        return xe.Deferred(function(e) {
                            n[0][3].add(r(0, e, ye(o) ? o : c, e.notifyWith)), n[1][3].add(r(0, e, ye(t) ? t : c)), n[2][3].add(r(0, e, ye(i) ? i : u))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? xe.extend(e, o) : o
                    }
                },
                r = {};
            return xe.each(n, function(e, t) {
                var s = t[2],
                    a = t[5];
                o[t[1]] = s.add, a && s.add(function() {
                    i = a
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), s.add(t[3].fire), r[t[0]] = function() {
                    return r[t[0] + "With"](this === r ? void 0 : this, arguments), this
                }, r[t[0] + "With"] = s.fireWith
            }), o.promise(r), t && t.call(r, r), r
        },
        when: function(e) {
            var t = arguments.length,
                n = t,
                i = Array(n),
                o = le.call(arguments),
                r = xe.Deferred(),
                s = function(e) {
                    return function(n) {
                        i[e] = this, o[e] = arguments.length > 1 ? le.call(arguments) : n, --t || r.resolveWith(i, o)
                    }
                };
            if (t <= 1 && (d(e, r.done(s(n)).resolve, r.reject, !t), "pending" === r.state() || ye(o[n] && o[n].then))) return r.then();
            for (; n--;) d(o[n], s(n), r.reject);
            return r.promise()
        }
    });
    var Le = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    xe.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && Le.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, xe.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    };
    var Me = xe.Deferred();
    xe.fn.ready = function(e) {
        return Me.then(e)["catch"](function(e) {
            xe.readyException(e)
        }), this
    }, xe.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --xe.readyWait : xe.isReady) || (xe.isReady = !0, !0 !== e && --xe.readyWait > 0 || Me.resolveWith(se, [xe]))
        }
    }), xe.ready.then = Me.then, "complete" === se.readyState || "loading" !== se.readyState && !se.documentElement.doScroll ? e.setTimeout(xe.ready) : (se.addEventListener("DOMContentLoaded", p), e.addEventListener("load", p));
    var Pe = function(e, t, n, o, r, s, a) {
            var l = 0,
                c = e.length,
                u = null == n;
            if ("object" === i(n)) {
                r = !0;
                for (l in n) Pe(e, t, l, n[l], !0, s, a)
            } else if (void 0 !== o && (r = !0, ye(o) || (a = !0), u && (a ? (t.call(e, o), t = null) : (u = t, t = function(e, t, n) {
                    return u.call(xe(e), n)
                })), t))
                for (; l < c; l++) t(e[l], n, a ? o : o.call(e[l], l, t(e[l], n)));
            return r ? e : u ? t.call(e) : c ? t(e[0], n) : s
        },
        _e = /^-ms-/,
        Ne = /-([a-z])/g,
        He = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    m.uid = 1, m.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, He(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var i, o = this.cache(e);
            if ("string" == typeof t) o[h(t)] = n;
            else
                for (i in t) o[h(i)] = t[i];
            return o
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][h(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, i = e[this.expando];
            if (void 0 !== i) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(h) : (t = h(t)) in i ? [t] : t.match(Ie) || []).length;
                    for (; n--;) delete i[t[n]]
                }(void 0 === t || xe.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !xe.isEmptyObject(t)
        }
    };
    var Fe = new m,
        qe = new m,
        Re = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ze = /[A-Z]/g;
    xe.extend({
        hasData: function(e) {
            return qe.hasData(e) || Fe.hasData(e)
        },
        data: function(e, t, n) {
            return qe.access(e, t, n)
        },
        removeData: function(e, t) {
            qe.remove(e, t)
        },
        _data: function(e, t, n) {
            return Fe.access(e, t, n)
        },
        _removeData: function(e, t) {
            Fe.remove(e, t)
        }
    }), xe.fn.extend({
        data: function(e, t) {
            var n, i, o, r = this[0],
                s = r && r.attributes;
            if (void 0 === e) {
                if (this.length && (o = qe.get(r), 1 === r.nodeType && !Fe.get(r, "hasDataAttrs"))) {
                    for (n = s.length; n--;) s[n] && 0 === (i = s[n].name).indexOf("data-") && (i = h(i.slice(5)), g(r, i, o[i]));
                    Fe.set(r, "hasDataAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each(function() {
                qe.set(this, e)
            }) : Pe(this, function(t) {
                var n;
                if (r && void 0 === t) {
                    if (void 0 !== (n = qe.get(r, e))) return n;
                    if (void 0 !== (n = g(r, e))) return n
                } else this.each(function() {
                    qe.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                qe.remove(this, e)
            })
        }
    }), xe.extend({
        queue: function(e, t, n) {
            var i;
            if (e) return t = (t || "fx") + "queue", i = Fe.get(e, t), n && (!i || Array.isArray(n) ? i = Fe.access(e, t, xe.makeArray(n)) : i.push(n)), i || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = xe.queue(e, t),
                i = n.length,
                o = n.shift(),
                r = xe._queueHooks(e, t),
                s = function() {
                    xe.dequeue(e, t)
                };
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, s, r)), !i && r && r.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Fe.get(e, n) || Fe.access(e, n, {
                empty: xe.Callbacks("once memory").add(function() {
                    Fe.remove(e, [t + "queue", n])
                })
            })
        }
    }), xe.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? xe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = xe.queue(this, e, t);
                xe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && xe.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                xe.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, i = 1,
                o = xe.Deferred(),
                r = this,
                s = this.length,
                a = function() {
                    --i || o.resolveWith(r, [r])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = Fe.get(r[s], e + "queueHooks")) && n.empty && (i++, n.empty.add(a));
            return a(), o.promise(t)
        }
    });
    var We = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Ue = new RegExp("^(?:([+-])=|)(" + We + ")([a-z%]*)$", "i"),
        Be = ["Top", "Right", "Bottom", "Left"],
        Ye = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && xe.contains(e.ownerDocument, e) && "none" === xe.css(e, "display")
        },
        Ze = function(e, t, n, i) {
            var o, r, s = {};
            for (r in t) s[r] = e.style[r], e.style[r] = t[r];
            o = n.apply(e, i || []);
            for (r in t) e.style[r] = s[r];
            return o
        },
        Xe = {};
    xe.fn.extend({
        show: function() {
            return w(this, !0)
        },
        hide: function() {
            return w(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Ye(this) ? xe(this).show() : xe(this).hide()
            })
        }
    });
    var Ke = /^(?:checkbox|radio)$/i,
        Ve = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Ge = /^$|^module$|\/(?:java|ecma)script/i,
        Qe = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Qe.optgroup = Qe.option, Qe.tbody = Qe.tfoot = Qe.colgroup = Qe.caption = Qe.thead, Qe.th = Qe.td;
    var Je = /<|&#?\w+;/;
    ! function() {
        var e = se.createDocumentFragment().appendChild(se.createElement("div")),
            t = se.createElement("input");
        t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), ge.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", ge.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var et = se.documentElement,
        tt = /^key/,
        nt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        it = /^([^.]*)(?:\.(.+)|)/;
    xe.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var r, s, a, l, c, u, d, p, f, h, m, v = Fe.get(e);
            if (v)
                for (n.handler && (n = (r = n).handler, o = r.selector), o && xe.find.matchesSelector(et, o), n.guid || (n.guid = xe.guid++), (l = v.events) || (l = v.events = {}), (s = v.handle) || (s = v.handle = function(t) {
                        return "undefined" != typeof xe && xe.event.triggered !== t.type ? xe.event.dispatch.apply(e, arguments) : void 0
                    }), c = (t = (t || "").match(Ie) || [""]).length; c--;) f = m = (a = it.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f && (d = xe.event.special[f] || {}, f = (o ? d.delegateType : d.bindType) || f, d = xe.event.special[f] || {}, u = xe.extend({
                    type: f,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && xe.expr.match.needsContext.test(o),
                    namespace: h.join(".")
                }, r), (p = l[f]) || ((p = l[f] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, i, h, s) || e.addEventListener && e.addEventListener(f, s)), d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, u) : p.push(u), xe.event.global[f] = !0)
        },
        remove: function(e, t, n, i, o) {
            var r, s, a, l, c, u, d, p, f, h, m, v = Fe.hasData(e) && Fe.get(e);
            if (v && (l = v.events)) {
                for (c = (t = (t || "").match(Ie) || [""]).length; c--;)
                    if (a = it.exec(t[c]) || [], f = m = a[1], h = (a[2] || "").split(".").sort(), f) {
                        for (d = xe.event.special[f] || {}, p = l[f = (i ? d.delegateType : d.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--;) u = p[r], !o && m !== u.origType || n && n.guid !== u.guid || a && !a.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (p.splice(r, 1), u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
                        s && !p.length && (d.teardown && !1 !== d.teardown.call(e, h, v.handle) || xe.removeEvent(e, f, v.handle), delete l[f])
                    } else
                        for (f in l) xe.event.remove(e, f + t[c], n, i, !0);
                xe.isEmptyObject(l) && Fe.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, i, o, r, s, a = xe.event.fix(e),
                l = new Array(arguments.length),
                c = (Fe.get(this, "events") || {})[a.type] || [],
                u = xe.event.special[a.type] || {};
            for (l[0] = a, t = 1; t < arguments.length; t++) l[t] = arguments[t];
            if (a.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, a)) {
                for (s = xe.event.handlers.call(this, a, c), t = 0;
                    (o = s[t++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = o.elem, n = 0;
                        (r = o.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r, a.data = r.data, void 0 !== (i = ((xe.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (a.result = i) && (a.preventDefault(), a.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(e, t) {
            var n, i, o, r, s, a = [],
                l = t.delegateCount,
                c = e.target;
            if (l && c.nodeType && !("click" === e.type && e.button >= 1))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (r = [], s = {}, n = 0; n < l; n++) void 0 === s[o = (i = t[n]).selector + " "] && (s[o] = i.needsContext ? xe(o, this).index(c) > -1 : xe.find(o, this, null, [c]).length), s[o] && r.push(i);
                        r.length && a.push({
                            elem: c,
                            handlers: r
                        })
                    }
            return c = this, l < t.length && a.push({
                elem: c,
                handlers: t.slice(l)
            }), a
        },
        addProp: function(e, t) {
            Object.defineProperty(xe.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: ye(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[xe.expando] ? e : new xe.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== $() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === $() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && r(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return r(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, xe.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, xe.Event = function(e, t) {
        return this instanceof xe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? C : S, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && xe.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[xe.expando] = !0, void 0) : new xe.Event(e, t)
    }, xe.Event.prototype = {
        constructor: xe.Event,
        isDefaultPrevented: S,
        isPropagationStopped: S,
        isImmediatePropagationStopped: S,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = C, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = C, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = C, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, xe.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && tt.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && nt.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
        }
    }, xe.event.addProp), xe.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        xe.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this,
                    o = e.relatedTarget,
                    r = e.handleObj;
                return o && (o === i || xe.contains(i, o)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), xe.fn.extend({
        on: function(e, t, n, i) {
            return E(this, e, t, n, i)
        },
        one: function(e, t, n, i) {
            return E(this, e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, xe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, t, e[o]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = S), this.each(function() {
                xe.event.remove(this, e, n, t)
            })
        }
    });
    var ot = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        rt = /<script|<style|<link/i,
        st = /checked\s*(?:[^=]|=\s*.checked.)/i,
        at = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    xe.extend({
        htmlPrefilter: function(e) {
            return e.replace(ot, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var i, o, r, s, a = e.cloneNode(!0),
                l = xe.contains(e.ownerDocument, e);
            if (!(ge.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || xe.isXMLDoc(e)))
                for (s = x(a), i = 0, o = (r = x(e)).length; i < o; i++) I(r[i], s[i]);
            if (t)
                if (n)
                    for (r = r || x(e), s = s || x(a), i = 0, o = r.length; i < o; i++) O(r[i], s[i]);
                else O(e, a);
            return (s = x(a, "script")).length > 0 && T(s, !l && x(e, "script")), a
        },
        cleanData: function(e) {
            for (var t, n, i, o = xe.event.special, r = 0; void 0 !== (n = e[r]); r++)
                if (He(n)) {
                    if (t = n[Fe.expando]) {
                        if (t.events)
                            for (i in t.events) o[i] ? xe.event.remove(n, i) : xe.removeEvent(n, i, t.handle);
                        n[Fe.expando] = void 0
                    }
                    n[qe.expando] && (n[qe.expando] = void 0)
                }
        }
    }), xe.fn.extend({
        detach: function(e) {
            return M(this, e, !0)
        },
        remove: function(e) {
            return M(this, e)
        },
        text: function(e) {
            return Pe(this, function(e) {
                return void 0 === e ? xe.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return L(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || A(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return L(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = A(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return L(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return L(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (xe.cleanData(x(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return xe.clone(this, e, t)
            })
        },
        html: function(e) {
            return Pe(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !rt.test(e) && !Qe[(Ve.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = xe.htmlPrefilter(e);
                    try {
                        for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (xe.cleanData(x(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return L(this, arguments, function(t) {
                var n = this.parentNode;
                xe.inArray(this, e) < 0 && (xe.cleanData(x(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), xe.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        xe.fn[e] = function(e) {
            for (var n, i = [], o = xe(e), r = o.length - 1, s = 0; s <= r; s++) n = s === r ? this : this.clone(!0), xe(o[s])[t](n), ue.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var lt = new RegExp("^(" + We + ")(?!px)[a-z%]+$", "i"),
        ct = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        ut = new RegExp(Be.join("|"), "i");
    ! function() {
        function t() {
            if (c) {
                l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", et.appendChild(l).appendChild(c);
                var t = e.getComputedStyle(c);
                i = "1%" !== t.top, a = 12 === n(t.marginLeft), c.style.right = "60%", s = 36 === n(t.right), o = 36 === n(t.width), c.style.position = "absolute", r = 36 === c.offsetWidth || "absolute", et.removeChild(l), c = null
            }
        }

        function n(e) {
            return Math.round(parseFloat(e))
        }
        var i, o, r, s, a, l = se.createElement("div"),
            c = se.createElement("div");
        c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", ge.clearCloneStyle = "content-box" === c.style.backgroundClip, xe.extend(ge, {
            boxSizingReliable: function() {
                return t(), o
            },
            pixelBoxStyles: function() {
                return t(), s
            },
            pixelPosition: function() {
                return t(), i
            },
            reliableMarginLeft: function() {
                return t(), a
            },
            scrollboxSize: function() {
                return t(), r
            }
        }))
    }();
    var dt = /^(none|table(?!-c[ea]).+)/,
        pt = /^--/,
        ft = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ht = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        mt = ["Webkit", "Moz", "ms"],
        vt = se.createElement("div").style;
    xe.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = P(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, r, s, a = h(t),
                    l = pt.test(t),
                    c = e.style;
                if (l || (t = H(a)), s = xe.cssHooks[t] || xe.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, i)) ? o : c[t];
                "string" == (r = typeof n) && (o = Ue.exec(n)) && o[1] && (n = y(e, t, o), r = "number"), null != n && n === n && ("number" === r && (n += o && o[3] || (xe.cssNumber[a] ? "" : "px")), ge.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, i)) || (l ? c.setProperty(t, n) : c[t] = n))
            }
        },
        css: function(e, t, n, i) {
            var o, r, s, a = h(t);
            return pt.test(t) || (t = H(a)), (s = xe.cssHooks[t] || xe.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), void 0 === o && (o = P(e, t, i)), "normal" === o && t in ht && (o = ht[t]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
        }
    }), xe.each(["height", "width"], function(e, t) {
        xe.cssHooks[t] = {
            get: function(e, n, i) {
                if (n) return !dt.test(xe.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? R(e, t, i) : Ze(e, ft, function() {
                    return R(e, t, i)
                })
            },
            set: function(e, n, i) {
                var o, r = ct(e),
                    s = "border-box" === xe.css(e, "boxSizing", !1, r),
                    a = i && q(e, t, i, s, r);
                return s && ge.scrollboxSize() === r.position && (a -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(r[t]) - q(e, t, "border", !1, r) - .5)), a && (o = Ue.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = xe.css(e, t)), F(e, n, a)
            }
        }
    }), xe.cssHooks.marginLeft = _(ge.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(P(e, "marginLeft")) || e.getBoundingClientRect().left - Ze(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), xe.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        xe.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) o[e + Be[i] + t] = r[i] || r[i - 2] || r[0];
                return o
            }
        }, "margin" !== e && (xe.cssHooks[e + t].set = F)
    }), xe.fn.extend({
        css: function(e, t) {
            return Pe(this, function(e, t, n) {
                var i, o, r = {},
                    s = 0;
                if (Array.isArray(t)) {
                    for (i = ct(e), o = t.length; s < o; s++) r[t[s]] = xe.css(e, t[s], !1, i);
                    return r
                }
                return void 0 !== n ? xe.style(e, t, n) : xe.css(e, t)
            }, e, t, arguments.length > 1)
        }
    }), xe.Tween = z, z.prototype = {
        constructor: z,
        init: function(e, t, n, i, o, r) {
            this.elem = e, this.prop = n, this.easing = o || xe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (xe.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = z.propHooks[this.prop];
            return e && e.get ? e.get(this) : z.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = z.propHooks[this.prop];
            return this.options.duration ? this.pos = t = xe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : z.propHooks._default.set(this), this
        }
    }, z.prototype.init.prototype = z.prototype, z.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = xe.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                xe.fx.step[e.prop] ? xe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[xe.cssProps[e.prop]] && !xe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : xe.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, z.propHooks.scrollTop = z.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, xe.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, xe.fx = z.prototype.init, xe.fx.step = {};
    var gt, yt, bt = /^(?:toggle|show|hide)$/,
        wt = /queueHooks$/;
    xe.Animation = xe.extend(K, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return y(n.elem, e, Ue.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                ye(e) ? (t = e, e = ["*"]) : e = e.match(Ie);
                for (var n, i = 0, o = e.length; i < o; i++) n = e[i], K.tweeners[n] = K.tweeners[n] || [], K.tweeners[n].unshift(t)
            },
            prefilters: [Z],
            prefilter: function(e, t) {
                t ? K.prefilters.unshift(e) : K.prefilters.push(e)
            }
        }), xe.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? xe.extend({}, e) : {
                complete: n || !n && t || ye(e) && e,
                duration: e,
                easing: n && t || t && !ye(t) && t
            };
            return xe.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in xe.fx.speeds ? i.duration = xe.fx.speeds[i.duration] : i.duration = xe.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                ye(i.old) && i.old.call(this), i.queue && xe.dequeue(this, i.queue)
            }, i
        }, xe.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(Ye).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var o = xe.isEmptyObject(e),
                    r = xe.speed(t, n, i),
                    s = function() {
                        var t = K(this, xe.extend({}, e), r);
                        (o || Fe.get(this, "finish")) && t.stop(!0)
                    };
                return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
            },
            stop: function(e, t, n) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        o = null != e && e + "queueHooks",
                        r = xe.timers,
                        s = Fe.get(this);
                    if (o) s[o] && s[o].stop && i(s[o]);
                    else
                        for (o in s) s[o] && s[o].stop && wt.test(o) && i(s[o]);
                    for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
                    !t && n || xe.dequeue(this, e)
                })
            },
            finish: function(e) {
                return !1 !== e && (e = e || "fx"), this.each(function() {
                    var t, n = Fe.get(this),
                        i = n[e + "queue"],
                        o = n[e + "queueHooks"],
                        r = xe.timers,
                        s = i ? i.length : 0;
                    for (n.finish = !0, xe.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                    for (t = 0; t < s; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }
        }), xe.each(["toggle", "show", "hide"], function(e, t) {
            var n = xe.fn[t];
            xe.fn[t] = function(e, i, o) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(B(t, !0), e, i, o)
            }
        }), xe.each({
            slideDown: B("show"),
            slideUp: B("hide"),
            slideToggle: B("toggle"),
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
            xe.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), xe.timers = [], xe.fx.tick = function() {
            var e, t = 0,
                n = xe.timers;
            for (gt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || xe.fx.stop(), gt = void 0
        }, xe.fx.timer = function(e) {
            xe.timers.push(e), xe.fx.start()
        }, xe.fx.interval = 13, xe.fx.start = function() {
            yt || (yt = !0, W())
        }, xe.fx.stop = function() {
            yt = null
        }, xe.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, xe.fn.delay = function(t, n) {
            return t = xe.fx ? xe.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, i) {
                var o = e.setTimeout(n, t);
                i.stop = function() {
                    e.clearTimeout(o)
                }
            })
        },
        function() {
            var e = se.createElement("input"),
                t = se.createElement("select").appendChild(se.createElement("option"));
            e.type = "checkbox", ge.checkOn = "" !== e.value, ge.optSelected = t.selected, (e = se.createElement("input")).value = "t", e.type = "radio", ge.radioValue = "t" === e.value
        }();
    var xt, Tt = xe.expr.attrHandle;
    xe.fn.extend({
        attr: function(e, t) {
            return Pe(this, xe.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                xe.removeAttr(this, e)
            })
        }
    }), xe.extend({
        attr: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return "undefined" == typeof e.getAttribute ? xe.prop(e, t, n) : (1 === r && xe.isXMLDoc(e) || (o = xe.attrHooks[t.toLowerCase()] || (xe.expr.match.bool.test(t) ? xt : void 0)), void 0 !== n ? null === n ? void xe.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = xe.find.attr(e, t)) ? void 0 : i)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ge.radioValue && "radio" === t && r(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i = 0,
                o = t && t.match(Ie);
            if (o && 1 === e.nodeType)
                for (; n = o[i++];) e.removeAttribute(n)
        }
    }), xt = {
        set: function(e, t, n) {
            return !1 === t ? xe.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, xe.each(xe.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Tt[t] || xe.find.attr;
        Tt[t] = function(e, t, i) {
            var o, r, s = t.toLowerCase();
            return i || (r = Tt[s], Tt[s] = o, o = null != n(e, t, i) ? s : null, Tt[s] = r), o
        }
    });
    var kt = /^(?:input|select|textarea|button)$/i,
        Ct = /^(?:a|area)$/i;
    xe.fn.extend({
        prop: function(e, t) {
            return Pe(this, xe.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[xe.propFix[e] || e]
            })
        }
    }), xe.extend({
        prop: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return 1 === r && xe.isXMLDoc(e) || (t = xe.propFix[t] || t, o = xe.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = xe.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : kt.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), ge.optSelected || (xe.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), xe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        xe.propFix[this.toLowerCase()] = this
    }), xe.fn.extend({
        addClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (ye(e)) return this.each(function(t) {
                xe(this).addClass(e.call(this, t, G(this)))
            });
            if ((t = Q(e)).length)
                for (; n = this[l++];)
                    if (o = G(n), i = 1 === n.nodeType && " " + V(o) + " ") {
                        for (s = 0; r = t[s++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        o !== (a = V(i)) && n.setAttribute("class", a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (ye(e)) return this.each(function(t) {
                xe(this).removeClass(e.call(this, t, G(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ((t = Q(e)).length)
                for (; n = this[l++];)
                    if (o = G(n), i = 1 === n.nodeType && " " + V(o) + " ") {
                        for (s = 0; r = t[s++];)
                            for (; i.indexOf(" " + r + " ") > -1;) i = i.replace(" " + r + " ", " ");
                        o !== (a = V(i)) && n.setAttribute("class", a)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                i = "string" === n || Array.isArray(e);
            return "boolean" == typeof t && i ? t ? this.addClass(e) : this.removeClass(e) : ye(e) ? this.each(function(n) {
                xe(this).toggleClass(e.call(this, n, G(this), t), t)
            }) : this.each(function() {
                var t, o, r, s;
                if (i)
                    for (o = 0, r = xe(this), s = Q(e); t = s[o++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                else void 0 !== e && "boolean" !== n || ((t = G(this)) && Fe.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Fe.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)
                if (1 === n.nodeType && (" " + V(G(n)) + " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var St = /\r/g;
    xe.fn.extend({
        val: function(e) {
            var t, n, i, o = this[0];
            return arguments.length ? (i = ye(e), this.each(function(n) {
                var o;
                1 === this.nodeType && (null == (o = i ? e.call(this, n, xe(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = xe.map(o, function(e) {
                    return null == e ? "" : e + ""
                })), (t = xe.valHooks[this.type] || xe.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
            })) : o ? (t = xe.valHooks[o.type] || xe.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(St, "") : null == n ? "" : n : void 0
        }
    }), xe.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = xe.find.attr(e, "value");
                    return null != t ? t : V(xe.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, i, o = e.options,
                        s = e.selectedIndex,
                        a = "select-one" === e.type,
                        l = a ? null : [],
                        c = a ? s + 1 : o.length;
                    for (i = s < 0 ? c : a ? s : 0; i < c; i++)
                        if (((n = o[i]).selected || i === s) && !n.disabled && (!n.parentNode.disabled || !r(n.parentNode, "optgroup"))) {
                            if (t = xe(n).val(), a) return t;
                            l.push(t)
                        }
                    return l
                },
                set: function(e, t) {
                    for (var n, i, o = e.options, r = xe.makeArray(t), s = o.length; s--;)((i = o[s]).selected = xe.inArray(xe.valHooks.option.get(i), r) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), r
                }
            }
        }
    }), xe.each(["radio", "checkbox"], function() {
        xe.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = xe.inArray(xe(e).val(), t) > -1
            }
        }, ge.checkOn || (xe.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), ge.focusin = "onfocusin" in e;
    var $t = /^(?:focusinfocus|focusoutblur)$/,
        Et = function(e) {
            e.stopPropagation()
        };
    xe.extend(xe.event, {
        trigger: function(t, n, i, o) {
            var r, s, a, l, c, u, d, p, f = [i || se],
                h = he.call(t, "type") ? t.type : t,
                m = he.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = p = a = i = i || se, 3 !== i.nodeType && 8 !== i.nodeType && !$t.test(h + xe.event.triggered) && (h.indexOf(".") > -1 && (h = (m = h.split(".")).shift(), m.sort()), c = h.indexOf(":") < 0 && "on" + h, t = t[xe.expando] ? t : new xe.Event(h, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = m.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : xe.makeArray(n, [t]), d = xe.event.special[h] || {}, o || !d.trigger || !1 !== d.trigger.apply(i, n))) {
                if (!o && !d.noBubble && !be(i)) {
                    for (l = d.delegateType || h, $t.test(l + h) || (s = s.parentNode); s; s = s.parentNode) f.push(s), a = s;
                    a === (i.ownerDocument || se) && f.push(a.defaultView || a.parentWindow || e)
                }
                for (r = 0;
                    (s = f[r++]) && !t.isPropagationStopped();) p = s, t.type = r > 1 ? l : d.bindType || h, (u = (Fe.get(s, "events") || {})[t.type] && Fe.get(s, "handle")) && u.apply(s, n), (u = c && s[c]) && u.apply && He(s) && (t.result = u.apply(s, n), !1 === t.result && t.preventDefault());
                return t.type = h, o || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(f.pop(), n) || !He(i) || c && ye(i[h]) && !be(i) && ((a = i[c]) && (i[c] = null), xe.event.triggered = h, t.isPropagationStopped() && p.addEventListener(h, Et), i[h](), t.isPropagationStopped() && p.removeEventListener(h, Et), xe.event.triggered = void 0, a && (i[c] = a)), t.result
            }
        },
        simulate: function(e, t, n) {
            var i = xe.extend(new xe.Event, n, {
                type: e,
                isSimulated: !0
            });
            xe.event.trigger(i, null, t)
        }
    }), xe.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                xe.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return xe.event.trigger(e, t, n, !0)
        }
    }), ge.focusin || xe.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            xe.event.simulate(t, e.target, xe.event.fix(e))
        };
        xe.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    o = Fe.access(i, t);
                o || i.addEventListener(e, n, !0), Fe.access(i, t, (o || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    o = Fe.access(i, t) - 1;
                o ? Fe.access(i, t, o) : (i.removeEventListener(e, n, !0), Fe.remove(i, t))
            }
        }
    });
    var At = e.location,
        Dt = Date.now(),
        jt = /\?/;
    xe.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = (new n.DOMParser).parseFromString(e, "text/xml")
        } catch (n) {
            t = void 0
        }
        return t && !t.getElementsByTagName("parsererror").length || xe.error("Invalid XML: " + e), t
    };
    var Ot = /\[\]$/,
        It = /\r?\n/g,
        Lt = /^(?:submit|button|image|reset|file)$/i,
        Mt = /^(?:input|select|textarea|keygen)/i;
    xe.param = function(e, t) {
        var n, i = [],
            o = function(e, t) {
                var n = ye(t) ? t() : t;
                i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (Array.isArray(e) || e.jquery && !xe.isPlainObject(e)) xe.each(e, function() {
            o(this.name, this.value)
        });
        else
            for (n in e) J(n, e[n], t, o);
        return i.join("&")
    }, xe.fn.extend({
        serialize: function() {
            return xe.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = xe.prop(this, "elements");
                return e ? xe.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !xe(this).is(":disabled") && Mt.test(this.nodeName) && !Lt.test(e) && (this.checked || !Ke.test(e))
            }).map(function(e, t) {
                var n = xe(this).val();
                return null == n ? null : Array.isArray(n) ? xe.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(It, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(It, "\r\n")
                }
            }).get()
        }
    });
    var Pt = /%20/g,
        _t = /#.*$/,
        Nt = /([?&])_=[^&]*/,
        Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        qt = /^(?:GET|HEAD)$/,
        Rt = /^\/\//,
        zt = {},
        Wt = {},
        Ut = "*/".concat("*"),
        Bt = se.createElement("a");
    Bt.href = At.href, xe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: At.href,
            type: "GET",
            isLocal: Ft.test(At.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ut,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": xe.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? ne(ne(e, xe.ajaxSettings), t) : ne(xe.ajaxSettings, e)
        },
        ajaxPrefilter: ee(zt),
        ajaxTransport: ee(Wt),
        ajax: function(e, t) {
            function n(e, t, n, s) {
                var l, d, p, b, w, x = t;
                c || (c = !0, a && k.clearTimeout(a), i = void 0, r = s || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && e < 300 || 304 === e, n && (b = ie(f, T, n)), b = oe(f, b, T, l), l ? (f.ifModified && ((w = T.getResponseHeader("Last-Modified")) && (xe.lastModified[o] = w), (w = T.getResponseHeader("etag")) && (xe.etag[o] = w)), 204 === e || "HEAD" === f.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = b.state, d = b.data, l = !(p = b.error))) : (p = x, !e && x || (x = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || x) + "", l ? v.resolveWith(h, [d, x, T]) : v.rejectWith(h, [T, x, p]), T.statusCode(y), y = void 0, u && m.trigger(l ? "ajaxSuccess" : "ajaxError", [T, f, l ? d : p]), g.fireWith(h, [T, x]), u && (m.trigger("ajaxComplete", [T, f]), --xe.active || xe.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var i, o, r, s, a, l, c, u, d, p, f = xe.ajaxSetup({}, t),
                h = f.context || f,
                m = f.context && (h.nodeType || h.jquery) ? xe(h) : xe.event,
                v = xe.Deferred(),
                g = xe.Callbacks("once memory"),
                y = f.statusCode || {},
                b = {},
                w = {},
                x = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (c) {
                            if (!s)
                                for (s = {}; t = Ht.exec(r);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return c ? r : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == c && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, b[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == c && (f.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (c) T.always(e[T.status]);
                            else
                                for (t in e) y[t] = [y[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || x;
                        return i && i.abort(t), n(0, t), this
                    }
                };
            if (v.promise(T), f.url = ((e || f.url || At.href) + "").replace(Rt, At.protocol + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(Ie) || [""], null == f.crossDomain) {
                l = se.createElement("a");
                try {
                    l.href = f.url, l.href = l.href, f.crossDomain = Bt.protocol + "//" + Bt.host != l.protocol + "//" + l.host
                } catch (k) {
                    f.crossDomain = !0
                }
            }
            if (f.data && f.processData && "string" != typeof f.data && (f.data = xe.param(f.data, f.traditional)), te(zt, f, t, T), c) return T;
            (u = xe.event && f.global) && 0 == xe.active++ && xe.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !qt.test(f.type), o = f.url.replace(_t, ""), f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(Pt, "+")) : (p = f.url.slice(o.length), f.data && (f.processData || "string" == typeof f.data) && (o += (jt.test(o) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (o = o.replace(Nt, "$1"), p = (jt.test(o) ? "&" : "?") + "_=" + Dt++ + p), f.url = o + p), f.ifModified && (xe.lastModified[o] && T.setRequestHeader("If-Modified-Since", xe.lastModified[o]), xe.etag[o] && T.setRequestHeader("If-None-Match", xe.etag[o])), (f.data && f.hasContent && !1 !== f.contentType || t.contentType) && T.setRequestHeader("Content-Type", f.contentType), T.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Ut + "; q=0.01" : "") : f.accepts["*"]);
            for (d in f.headers) T.setRequestHeader(d, f.headers[d]);
            if (f.beforeSend && (!1 === f.beforeSend.call(h, T, f) || c)) return T.abort();
            if (x = "abort", g.add(f.complete), T.done(f.success), T.fail(f.error), i = te(Wt, f, t, T)) {
                if (T.readyState = 1, u && m.trigger("ajaxSend", [T, f]), c) return T;
                f.async && f.timeout > 0 && (a = k.setTimeout(function() {
                    T.abort("timeout")
                }, f.timeout));
                try {
                    c = !1, i.send(b, n)
                } catch (k) {
                    if (c) throw k;
                    n(-1, k)
                }
            } else n(-1, "No Transport");
            return T
        },
        getJSON: function(e, t, n) {
            return xe.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return xe.get(e, void 0, t, "script")
        }
    }), xe.each(["get", "post"], function(e, t) {
        xe[t] = function(e, n, i, o) {
            return ye(n) && (o = o || i, i = n, n = void 0), xe.ajax(xe.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: i
            }, xe.isPlainObject(e) && e))
        }
    }), xe._evalUrl = function(e) {
        return xe.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, xe.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (ye(e) && (e = e.call(this[0])), t = xe(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            return ye(e) ? this.each(function(t) {
                xe(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = xe(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = ye(e);
            return this.each(function(n) {
                xe(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                xe(this).replaceWith(this.childNodes)
            }), this
        }
    }), xe.expr.pseudos.hidden = function(e) {
        return !xe.expr.pseudos.visible(e)
    }, xe.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, xe.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    };
    var Yt = {
            0: 200,
            1223: 204
        },
        Zt = xe.ajaxSettings.xhr();
    ge.cors = !!Zt && "withCredentials" in Zt, ge.ajax = Zt = !!Zt, xe.ajaxTransport(function(e) {
        var t, n;
        if (ge.cors || Zt && !e.crossDomain) return {
            send: function(i, o) {
                var r, s = e.xhr();
                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (r in e.xhrFields) s[r] = e.xhrFields[r];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (r in i) s.setRequestHeader(r, i[r]);
                t = function(e) {
                    return function() {
                        t && (t = n = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Yt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = t(), n = s.onerror = s.ontimeout = t("error"), void 0 !== s.onabort ? s.onabort = n : s.onreadystatechange = function() {
                    4 === s.readyState && a.setTimeout(function() {
                        t && n()
                    })
                }, t = t("abort");
                try {
                    s.send(e.hasContent && e.data || null)
                } catch (a) {
                    if (t) throw a
                }
            },
            abort: function() {
                t && t()
            }
        }
    }), xe.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), xe.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return xe.globalEval(e), e
            }
        }
    }), xe.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), xe.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(i, o) {
                    t = xe("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                    }), se.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Xt = [],
        Kt = /(=)\?(?=&|$)|\?\?/;
    xe.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Xt.pop() || xe.expando + "_" + Dt++;
            return this[e] = !0, e
        }
    }), xe.ajaxPrefilter("json jsonp", function(t, n, i) {
        var o, r, s, a = !1 !== t.jsonp && (Kt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Kt.test(t.data) && "data");
        if (a || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = ye(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Kt, "$1" + o) : !1 !== t.jsonp && (t.url += (jt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
            return s || xe.error(o + " was not called"), s[0]
        }, t.dataTypes[0] = "json", r = e[o], e[o] = function() {
            s = arguments
        }, i.always(function() {
            void 0 === r ? xe(e).removeProp(o) : e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, Xt.push(o)), s && ye(r) && r(s[0]), s = r = void 0
        }), "script"
    }), ge.createHTMLDocument = function() {
        var e = se.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
    }(), xe.parseHTML = function(e, t, n) {
        if ("string" != typeof e) return [];
        "boolean" == typeof t && (n = t, t = !1);
        var i, o, r;
        return t || (ge.createHTMLDocument ? ((i = (t = se.implementation.createHTMLDocument("")).createElement("base")).href = se.location.href, t.head.appendChild(i)) : t = se), o = Ee.exec(e), r = !n && [], o ? [t.createElement(o[1])] : (o = k([e], t, r), r && r.length && xe(r).remove(), xe.merge([], o.childNodes))
    }, xe.fn.load = function(e, t, n) {
        var i, o, r, s = this,
            a = e.indexOf(" ");
        return a > -1 && (i = V(e.slice(a)), e = e.slice(0, a)), ye(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), s.length > 0 && xe.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            r = arguments, s.html(i ? xe("<div>").append(xe.parseHTML(e)).find(i) : e)
        }).always(n && function(e, t) {
            s.each(function() {
                n.apply(this, r || [e.responseText, t, e])
            })
        }), this
    }, xe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        xe.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), xe.expr.pseudos.animated = function(e) {
        return xe.grep(xe.timers, function(t) {
            return e === t.elem
        }).length
    }, xe.offset = {
        setOffset: function(e, t, n) {
            var i, o, r, s, a, l, c, u = xe.css(e, "position"),
                d = xe(e),
                p = {};
            "static" === u && (e.style.position = "relative"), a = d.offset(), r = xe.css(e, "top"), l = xe.css(e, "left"), (c = ("absolute" === u || "fixed" === u) && (r + l).indexOf("auto") > -1) ? (s = (i = d.position()).top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), ye(t) && (t = t.call(e, n, xe.extend({}, a))), null != t.top && (p.top = t.top - a.top + s), null != t.left && (p.left = t.left - a.left + o), "using" in t ? t.using.call(e, p) : d.css(p)
        }
    }, xe.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                xe.offset.setOffset(this, e, t)
            });
            var t, n, i = this[0];
            return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, i = this[0],
                    o = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === xe.css(i, "position")) t = i.getBoundingClientRect();
                else {
                    for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === xe.css(e, "position");) e = e.parentNode;
                    e && e !== i && 1 === e.nodeType && ((o = xe(e).offset()).top += xe.css(e, "borderTopWidth", !0), o.left += xe.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - o.top - xe.css(i, "marginTop", !0),
                    left: t.left - o.left - xe.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === xe.css(e, "position");) e = e.offsetParent;
                return e || et
            })
        }
    }), xe.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        xe.fn[e] = function(i) {
            return Pe(this, function(e, i, o) {
                var r;
                return be(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === o ? r ? r[t] : e[i] : void(r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : e[i] = o)
            }, e, i, arguments.length)
        }
    }), xe.each(["top", "left"], function(e, t) {
        xe.cssHooks[t] = _(ge.pixelPosition, function(e, n) {
            if (n) return n = P(e, t), lt.test(n) ? xe(e).position()[t] + "px" : n
        })
    }), xe.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        xe.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, i) {
            xe.fn[i] = function(o, r) {
                var s = arguments.length && (n || "boolean" != typeof o),
                    a = n || (!0 === o || !0 === r ? "margin" : "border");
                return Pe(this, function(t, n, o) {
                    var r;
                    return be(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === o ? xe.css(t, n, a) : xe.style(t, n, o, a)
                }, t, s ? o : void 0, s)
            }
        })
    }), xe.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        xe.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), xe.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), xe.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), xe.proxy = function(e, t) {
        var n, i, o;
        if ("string" == typeof t && (n = e[t], t = e, e = n), ye(e)) return i = le.call(arguments, 2), o = function() {
            return e.apply(t || this, i.concat(le.call(arguments)))
        }, o.guid = e.guid = e.guid || xe.guid++, o
    }, xe.holdReady = function(e) {
        e ? xe.readyWait++ : xe.ready(!0)
    }, xe.isArray = Array.isArray, xe.parseJSON = JSON.parse, xe.nodeName = r, xe.isFunction = ye, xe.isWindow = be, xe.camelCase = h, xe.type = i, xe.now = Date.now, xe.isNumeric = function(e) {
        var t = xe.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return xe
    });
    var Vt = e.jQuery,
        Gt = e.$;
    return xe.noConflict = function(t) {
        return e.$ === xe && (e.$ = Gt), t && e.jQuery === xe && (e.jQuery = Vt), xe
    }, t || (e.jQuery = e.$ = xe), xe
}), ! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    (t = function() {
        var t = 0;
        return function(n, i) {
            var o, r = this;
            r.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(n),
                appendDots: e(n),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, n) {
                    return e('<button type="button" />').text(n + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, r.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, e.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = e(n), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, o = e(n).data("slick") || {}, r.options = e.extend({}, r.defaults, i, o), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, void 0 !== document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = e.proxy(r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear, r), r.autoPlayIterator = e.proxy(r.autoPlayIterator, r), r.changeSlide = e.proxy(r.changeSlide, r), r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler = e.proxy(r.selectHandler, r), r.setPosition = e.proxy(r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler, r), r.dragHandler = e.proxy(r.dragHandler, r), r.keyHandler = e.proxy(r.keyHandler, r), r.instanceUid = t++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
        var o = this;
        if ("boolean" == typeof n) i = n, n = null;
        else if (n < 0 || n >= o.slideCount) return !1;
        o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides.eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : !0 === i ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(t, n) {
            e(n).attr("data-slick-index", t)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, t.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }, t.prototype.animateSlide = function(t, n) {
        var i = {},
            o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (t = -t), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: t
        }, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
            top: t
        }, o.options.speed, o.options.easing, n) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), e({
            animStart: o.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(e) {
                e = Math.ceil(e), !1 === o.options.vertical ? (i[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i))
            },
            complete: function() {
                n && n.call()
            }
        })) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout(function() {
            o.disableTransition(), n.call()
        }, o.options.speed))
    }, t.prototype.getNavTarget = function() {
        var t = this,
            n = t.options.asNavFor;
        return n && null !== n && (n = e(n).not(t.$slider)), n
    }, t.prototype.asNavFor = function(t) {
        var n = this.getNavTarget();
        null !== n && "object" == typeof n && n.each(function() {
            var n = e(this).slick("getSlick");
            n.unslicked || n.slideHandler(t, !0)
        })
    }, t.prototype.applyTransition = function(e) {
        var t = this,
            n = {};
        !1 === t.options.fade ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function() {
        var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, t.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, t.prototype.buildDots = function() {
        var t, n, i = this;
        if (!0 === i.options.dots) {
            for (i.$slider.addClass("slick-dotted"), n = e("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) n.append(e("<li />").append(i.options.customPaging.call(this, i, t)));
            i.$dots = n.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
        }
    }, t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, n) {
            e(n).attr("data-slick-index", t).data("originalStyling", e(n).attr("style") || "")
        }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
    }, t.prototype.buildRows = function() {
        var e, t, n, i, o, r, s, a = this;
        if (i = document.createDocumentFragment(), r = a.$slider.children(), a.options.rows > 1) {
            for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), e = 0; e < o; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var c = document.createElement("div");
                    for (n = 0; n < a.options.slidesPerRow; n++) {
                        var u = e * s + (t * a.options.slidesPerRow + n);
                        r.get(u) && c.appendChild(r.get(u))
                    }
                    l.appendChild(c)
                }
                i.appendChild(l)
            }
            a.$slider.empty().append(i), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, t.prototype.checkResponsive = function(t, n) {
        var i, o, r, s = this,
            a = !1,
            l = s.$slider.width(),
            c = window.innerWidth || e(window).width();
        if ("window" === s.respondTo ? r = c : "slider" === s.respondTo ? r = l : "min" === s.respondTo && (r = Math.min(c, l)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
            o = null;
            for (i in s.breakpoints) s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? r < s.breakpoints[i] && (o = s.breakpoints[i]) : r > s.breakpoints[i] && (o = s.breakpoints[i]));
            null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || n) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t), a = o), t || !1 === a || s.$slider.trigger("breakpoint", [s, a])
        }
    }, t.prototype.changeSlide = function(t, n) {
        var i, o, r, s = this,
            a = e(t.currentTarget);
        switch (a.is("a") && t.preventDefault(), a.is("li") || (a = a.closest("li")), r = s.slideCount % s.options.slidesToScroll != 0, i = r ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, t.data.message) {
            case "previous":
                o = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow - i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, n);
                break;
            case "next":
                o = 0 === i ? s.options.slidesToScroll : i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, n);
                break;
            case "index":
                var l = 0 === t.data.index ? 0 : t.data.index || a.index() * s.options.slidesToScroll;
                s.slideHandler(s.checkNavigable(l), !1, n), a.children().trigger("focus");
                break;
            default:
                return
        }
    }, t.prototype.checkNavigable = function(e) {
        var t, n;
        if (t = this.getNavigableIndexes(), n = 0, e > t[t.length - 1]) e = t[t.length - 1];
        else
            for (var i in t) {
                if (e < t[i]) {
                    e = n;
                    break
                }
                n = t[i]
            }
        return e
    }, t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
    }, t.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, t.prototype.destroy = function(t) {
        var n = this;
        n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            e(this).attr("style", e(this).data("originalStyling"))
        }), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.$slider.removeClass("slick-dotted"), n.unslicked = !0, t || n.$slider.trigger("destroy", [n])
    }, t.prototype.disableTransition = function(e) {
        var t = this,
            n = {};
        n[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.fadeSlide = function(e, t) {
        var n = this;
        !1 === n.cssTransitions ? (n.$slides.eq(e).css({
            zIndex: n.options.zIndex
        }), n.$slides.eq(e).animate({
            opacity: 1
        }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
            opacity: 1,
            zIndex: n.options.zIndex
        }), t && setTimeout(function() {
            n.disableTransition(e), t.call()
        }, n.options.speed))
    }, t.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(n) {
            n.stopImmediatePropagation();
            var i = e(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = i.is(":focus"), t.autoPlay())
            }, 0)
        })
    }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, t.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            n = 0,
            i = 0;
        if (!0 === e.options.infinite)
            if (e.slideCount <= e.options.slidesToShow) ++i;
            else
                for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode) i = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else i = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return i - 1
    }, t.prototype.getLeft = function(e) {
        var t, n, i, o, r = this,
            s = 0;
        return r.slideOffset = 0, n = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), s = n * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll != 0 && e + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (e > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (e - r.slideCount)) * r.slideWidth * -1, s = (r.options.slidesToShow - (e - r.slideCount)) * n * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, s = r.slideCount % r.options.slidesToScroll * n * -1))) : e + r.options.slidesToShow > r.slideCount && (r.slideOffset = (e + r.options.slidesToShow - r.slideCount) * r.slideWidth, s = (e + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, s = 0), !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), t = !1 === r.options.vertical ? e * r.slideWidth * -1 + r.slideOffset : e * n * -1 + s, !0 === r.options.variableWidth && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === r.options.centerMode && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow + 1), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, t += (r.$list.width() - i.outerWidth()) / 2)), t
    }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        return this.options[e]
    }, t.prototype.getNavigableIndexes = function() {
        var e, t = this,
            n = 0,
            i = 0,
            o = [];
        for (!1 === t.options.infinite ? e = t.slideCount : (n = -1 * t.options.slidesToScroll, i = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); n < e;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return o
    }, t.prototype.getSlick = function() {
        return this
    }, t.prototype.getSlideCount = function() {
        var t, n, i = this;
        return n = !0 === i.options.centerMode ? i.slideWidth * Math.floor(i.options.slidesToShow / 2) : 0, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each(function(o, r) {
            if (r.offsetLeft - n + e(r).outerWidth() / 2 > -1 * i.swipeLeft) return t = r, !1
        }), Math.abs(e(t).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll
    }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }, t.prototype.init = function(t) {
        var n = this;
        e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots(), n.checkResponsive(!0), n.focusHandler()), t && n.$slider.trigger("init", [n]), !0 === n.options.accessibility && n.initADA(), n.options.autoplay && (n.paused = !1, n.autoPlay())
    }, t.prototype.initADA = function() {
        var t = this,
            n = Math.ceil(t.slideCount / t.options.slidesToShow),
            i = t.getNavigableIndexes().filter(function(e) {
                return e >= 0 && e < t.slideCount
            });
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(n) {
            var o = i.indexOf(n);
            e(this).attr({
                role: "tabpanel",
                id: "slick-slide" + t.instanceUid + n,
                tabindex: -1
            }), -1 !== o && e(this).attr({
                "aria-describedby": "slick-slide-control" + t.instanceUid + o
            })
        }), t.$dots.attr("role", "tablist").find("li").each(function(o) {
            var r = i[o];
            e(this).attr({
                role: "presentation"
            }), e(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + t.instanceUid + o,
                "aria-controls": "slick-slide" + t.instanceUid + r,
                "aria-label": o + 1 + " of " + n,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(t.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var o = t.currentSlide, r = o + t.options.slidesToShow; o < r; o++) t.$slides.eq(o).attr("tabindex", 0);
        t.activateADA()
    }, t.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
    }, t.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && (e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }, t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(t.setPosition)
    }, t.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, t.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }, t.prototype.lazyLoad = function() {
        function t(t) {
            e("img[data-lazy]", t).each(function() {
                var t = e(this),
                    n = e(this).attr("data-lazy"),
                    i = e(this).attr("data-srcset"),
                    o = e(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                    s = document.createElement("img");
                s.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        i && (t.attr("srcset", i), o && t.attr("sizes", o)), t.attr("src", n).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), r.$slider.trigger("lazyLoaded", [r, t, n])
                    })
                }, s.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, n])
                }, s.src = n
            })
        }
        var n, i, o, r = this;
        if (!0 === r.options.centerMode ? !0 === r.options.infinite ? o = (i = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (i = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), o = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (i = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, o = Math.ceil(i + r.options.slidesToShow), !0 === r.options.fade && (i > 0 && i--, o <= r.slideCount && o++)), n = r.$slider.find(".slick-slide").slice(i, o), "anticipated" === r.options.lazyLoad)
            for (var s = i - 1, a = o, l = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) s < 0 && (s = r.slideCount - 1), n = (n = n.add(l.eq(s))).add(l.eq(a)), s--, a++;
        t(n), r.slideCount <= r.options.slidesToShow ? t(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? t(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && t(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow))
    }, t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, t.prototype.next = t.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, t.prototype.orientationChange = function() {
        var e = this;
        e.checkResponsive(), e.setPosition()
    }, t.prototype.pause = t.prototype.slickPause = function() {
        var e = this;
        e.autoPlayClear(), e.paused = !0
    }, t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, t.prototype.postSlide = function(t) {
        var n = this;
        n.unslicked || (n.$slider.trigger("afterChange", [n, t]), n.animating = !1, n.slideCount > n.options.slidesToShow && n.setPosition(), n.swipeLeft = null, n.options.autoplay && n.autoPlay(), !0 === n.options.accessibility && (n.initADA(), n.options.focusOnChange && e(n.$slides.get(n.currentSlide)).attr("tabindex", 0).focus()))
    }, t.prototype.prev = t.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, t.prototype.preventDefault = function(e) {
        e.preventDefault()
    }, t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var n, i, o, r, s, a = this,
            l = e("img[data-lazy]", a.$slider);
        l.length ? (n = l.first(), i = n.attr("data-lazy"), o = n.attr("data-srcset"), r = n.attr("data-sizes") || a.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function() {
            o && (n.attr("srcset", o), r && n.attr("sizes", r)), n.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, n, i]), a.progressiveLazyLoad()
        }, s.onerror = function() {
            t < 3 ? setTimeout(function() {
                a.progressiveLazyLoad(t + 1)
            }, 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, n, i]), a.progressiveLazyLoad())
        }, s.src = i) : a.$slider.trigger("allImagesLoaded", [a])
    }, t.prototype.refresh = function(t) {
        var n, i, o = this;
        i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), n = o.currentSlide, o.destroy(!0), e.extend(o, o.initials, {
            currentSlide: n
        }), o.init(), t || o.changeSlide({
            data: {
                message: "index",
                index: n
            }
        }, !1)
    }, t.prototype.registerBreakpoints = function() {
        var t, n, i, o = this,
            r = o.options.responsive || null;
        if ("array" === e.type(r) && r.length) {
            o.respondTo = o.options.respondTo || "window";
            for (t in r)
                if (i = o.breakpoints.length - 1, r.hasOwnProperty(t)) {
                    for (n = r[t].breakpoint; i >= 0;) o.breakpoints[i] && o.breakpoints[i] === n && o.breakpoints.splice(i, 1), i--;
                    o.breakpoints.push(n), o.breakpointSettings[n] = r[t].settings
                }
            o.breakpoints.sort(function(e, t) {
                return o.options.mobileFirst ? e - t : t - e
            })
        }
    }, t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
    }, t.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
        }, 50))
    }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
        var i = this;
        return e = "boolean" == typeof e ? !0 === (t = e) ? 0 : i.slideCount - 1 : !0 === t ? --e : e, !(i.slideCount < 1 || e < 0 || e > i.slideCount - 1) && (i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit(), void 0)
    }, t.prototype.setCSS = function(e) {
        var t, n, i = this,
            o = {};
        !0 === i.options.rtl && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, !1 === i.transformsEnabled ? i.$slideTrack.css(o) : (o = {}, !1 === i.cssTransitions ? (o[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(o)))
    }, t.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, t.prototype.setFade = function() {
        var t, n = this;
        n.$slides.each(function(i, o) {
            t = n.slideWidth * i * -1, !0 === n.options.rtl ? e(o).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            }) : e(o).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            })
        }), n.$slides.eq(n.currentSlide).css({
            zIndex: n.options.zIndex - 1,
            opacity: 1
        })
    }, t.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, t.prototype.setOption = t.prototype.slickSetOption = function() {
        var t, n, i, o, r, s = this,
            a = !1;
        if ("object" === e.type(arguments[0]) ? (i = arguments[0], a = arguments[1], r = "multiple") : "string" === e.type(arguments[0]) && (i = arguments[0], o = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? r = "responsive" : void 0 !== arguments[1] && (r = "single")), "single" === r) s.options[i] = o;
        else if ("multiple" === r) e.each(i, function(e, t) {
            s.options[e] = t
        });
        else if ("responsive" === r)
            for (n in o)
                if ("array" !== e.type(s.options.responsive)) s.options.responsive = [o[n]];
                else {
                    for (t = s.options.responsive.length - 1; t >= 0;) s.options.responsive[t].breakpoint === o[n].breakpoint && s.options.responsive.splice(t, 1), t--;
                    s.options.responsive.push(o[n])
                }
        a && (s.unload(), s.reinit())
    }, t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, t.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, t.prototype.setSlideClasses = function(e) {
        var t, n, i, o, r = this;
        if (n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), !0 === r.options.centerMode) {
            var s = r.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t + s, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1 + s, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")
        } else e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = !0 === r.options.infinite ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad()
    }, t.prototype.setupInfinite = function() {
        var t, n, i, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (n = null, o.slideCount > o.options.slidesToShow)) {
            for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < i + o.slideCount; t += 1) n = t, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                e(this).attr("id", "")
            })
        }
    }, t.prototype.interrupt = function(e) {
        var t = this;
        e || t.autoPlay(), t.interrupted = e
    }, t.prototype.selectHandler = function(t) {
        var n = this,
            i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
            o = parseInt(i.attr("data-slick-index"));
        o || (o = 0), n.slideCount <= n.options.slidesToShow ? n.slideHandler(o, !1, !0) : n.slideHandler(o)
    }, t.prototype.slideHandler = function(e, t, n) {
        var i, o, r, s, a, l = null,
            c = this;
        if (t = t || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === e))
            if (!1 === t && c.asNavFor(e), i = e, l = c.getLeft(i), s = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, !0 !== n ? c.animateSlide(s, function() {
                c.postSlide(i)
            }) : c.postSlide(i));
            else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, !0 !== n ? c.animateSlide(s, function() {
            c.postSlide(i)
        }) : c.postSlide(i));
        else {
            if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = i < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : i - c.slideCount : i, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), r = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== n ? (c.fadeSlideOut(r), c.fadeSlide(o, function() {
                c.postSlide(o)
            })) : c.postSlide(o), void c.animateHeight();
            !0 !== n ? c.animateSlide(l, function() {
                c.postSlide(o)
            }) : c.postSlide(o)
        }
    }, t.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function() {
        var e, t, n, i, o = this;
        return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), (i = Math.round(180 * n / Math.PI)) < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 ? !1 === o.options.rtl ? "left" : "right" : i <= 360 && i >= 315 ? !1 === o.options.rtl ? "left" : "right" : i >= 135 && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? i >= 35 && i <= 135 ? "down" : "up" : "vertical"
    }, t.prototype.swipeEnd = function(e) {
        var t, n, i = this;
        if (i.dragging = !1, i.swiping = !1, i.scrolling) return i.scrolling = !1, !1;
        if (i.interrupted = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
        if (!0 === i.touchObject.edgeHit && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
            switch (n = i.swipeDirection()) {
                case "left":
                case "down":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
            }
            "vertical" != n && (i.slideHandler(t), i.touchObject = {}, i.$slider.trigger("swipe", [i, n]))
        } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
    }, t.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, t.prototype.swipeMove = function(e) {
        var t, n, i, o, r, s, a = this;
        return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && s > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), n = a.swipeDirection(), void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, e.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + i * o : a.swipeLeft = t + i * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = t + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
    }, t.prototype.swipeStart = function(e) {
        var t, n = this;
        return n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow ? (n.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, n.dragging = !0, void 0)
    }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, t.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]), t.destroy()
    }, t.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, t.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
    }, t.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }, e.fn.slick = function() {
        var e, n, i = this,
            o = arguments[0],
            r = Array.prototype.slice.call(arguments, 1),
            s = i.length;
        for (e = 0; e < s; e++)
            if ("object" == typeof o || void 0 === o ? i[e].slick = new t(i[e], o) : n = i[e].slick[o].apply(i[e].slick, r), void 0 !== n) return n;
        return i
    }
}), ! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.PhotoSwipe = t()
}(this, function() {
    "use strict";
    var e = function(e, t, n, i) {
        var o = {
            features: null,
            bind: function(e, t, n, i) {
                var o = (i ? "remove" : "add") + "EventListener";
                t = t.split(" ");
                for (var r = 0; r < t.length; r++) t[r] && e[o](t[r], n, !1)
            },
            isArray: function(e) {
                return e instanceof Array
            },
            createEl: function(e, t) {
                var n = document.createElement(t || "div");
                return e && (n.className = e), n
            },
            getScrollY: function() {
                var e = window.pageYOffset;
                return void 0 !== e ? e : document.documentElement.scrollTop
            },
            unbind: function(e, t, n) {
                o.bind(e, t, n, !0)
            },
            removeClass: function(e, t) {
                var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                e.className = e.className.replace(n, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(e, t) {
                o.hasClass(e, t) || (e.className += (e.className ? " " : "") + t)
            },
            hasClass: function(e, t) {
                return e.className && new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
            },
            getChildByClass: function(e, t) {
                for (var n = e.firstChild; n;) {
                    if (o.hasClass(n, t)) return n;
                    n = n.nextSibling
                }
            },
            arraySearch: function(e, t, n) {
                for (var i = e.length; i--;)
                    if (e[i][n] === t) return i;
                return -1
            },
            extend: function(e, t, n) {
                for (var i in t)
                    if (t.hasOwnProperty(i)) {
                        if (n && e.hasOwnProperty(i)) continue;
                        e[i] = t[i]
                    }
            },
            easing: {
                sine: {
                    out: function(e) {
                        return Math.sin(e * (Math.PI / 2))
                    },
                    inOut: function(e) {
                        return -(Math.cos(Math.PI * e) - 1) / 2
                    }
                },
                cubic: {
                    out: function(e) {
                        return --e * e * e + 1
                    }
                }
            },
            detectFeatures: function() {
                if (o.features) return o.features;
                var e = o.createEl(),
                    t = e.style,
                    n = "",
                    i = {};
                if (i.oldIE = document.all && !document.addEventListener, i.touch = "ontouchstart" in window, window.requestAnimationFrame && (i.raf = window.requestAnimationFrame, i.caf = window.cancelAnimationFrame), i.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !i.pointerEvent) {
                    var r = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var s = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        s && s.length > 0 && (s = parseInt(s[1], 10), s >= 1 && s < 8 && (i.isOldIOSPhone = !0))
                    }
                    var a = r.match(/Android\s([0-9\.]*)/),
                        l = a ? a[1] : 0;
                    l = parseFloat(l), l >= 1 && (l < 4.4 && (i.isOldAndroid = !0), i.androidVersion = l), i.isMobileOpera = /opera mini|opera mobi/i.test(r)
                }
                for (var c, u, d = ["transform", "perspective", "animationName"], p = ["", "webkit", "Moz", "ms", "O"], f = 0; f < 4; f++) {
                    n = p[f];
                    for (var h = 0; h < 3; h++) c = d[h], u = n + (n ? c.charAt(0).toUpperCase() + c.slice(1) : c), !i[c] && u in t && (i[c] = u);
                    n && !i.raf && (n = n.toLowerCase(), i.raf = window[n + "RequestAnimationFrame"], i.raf && (i.caf = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"]))
                }
                if (!i.raf) {
                    var m = 0;
                    i.raf = function(e) {
                        var t = (new Date).getTime(),
                            n = Math.max(0, 16 - (t - m)),
                            i = window.setTimeout(function() {
                                e(t + n)
                            }, n);
                        return m = t + n, i
                    }, i.caf = function(e) {
                        clearTimeout(e)
                    }
                }
                return i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, o.features = i, i
            }
        };
        o.detectFeatures(), o.features.oldIE && (o.bind = function(e, t, n, i) {
            t = t.split(" ");
            for (var o, r = (i ? "detach" : "attach") + "Event", s = function() {
                    n.handleEvent.call(n)
                }, a = 0; a < t.length; a++)
                if (o = t[a])
                    if ("object" == typeof n && n.handleEvent) {
                        if (i) {
                            if (!n["oldIE" + o]) return !1
                        } else n["oldIE" + o] = s;
                        e[r]("on" + o, n["oldIE" + o])
                    } else e[r]("on" + o, n)
        });
        var r = this,
            s = 25,
            a = 3,
            l = {
                allowPanToNext: !0,
                spacing: .12,
                bgOpacity: 1,
                mouseUsed: !1,
                loop: !0,
                pinchToClose: !0,
                closeOnScroll: !0,
                closeOnVerticalDrag: !0,
                verticalDragRange: .75,
                hideAnimationDuration: 333,
                showAnimationDuration: 333,
                showHideOpacity: !1,
                focus: !0,
                escKey: !0,
                arrowKeys: !0,
                mainScrollEndFriction: .35,
                panEndFriction: .35,
                isClickableElement: function(e) {
                    return "A" === e.tagName
                },
                getDoubleTapZoom: function(e, t) {
                    return e ? 1 : t.initialZoomLevel < .7 ? 1 : 1.33
                },
                maxSpreadZoom: 1.33,
                modal: !0,
                scaleMode: "fit"
            };
        o.extend(l, i);
        var c, u, d, p, f, h, m, v, g, y, b, w, x, T, k, C, S, $, E, A, D, j, O, I, L, M, P, _, N, H, F, q, R, z, W, U, B, Y, Z, X, K, V, G, Q, J, ee, te, ne, ie, oe, re, se, ae, le, ce, ue, de, pe = function() {
                return {
                    x: 0,
                    y: 0
                }
            },
            fe = pe(),
            he = pe(),
            me = pe(),
            ve = {},
            ge = 0,
            ye = {},
            be = pe(),
            we = 0,
            xe = !0,
            Te = [],
            ke = {},
            Ce = !1,
            Se = function(e, t) {
                o.extend(r, t.publicMethods), Te.push(e)
            },
            $e = function(e) {
                var t = en();
                return e > t - 1 ? e - t : e < 0 ? t + e : e
            },
            Ee = {},
            Ae = function(e, t) {
                return Ee[e] || (Ee[e] = []), Ee[e].push(t)
            },
            De = function(e) {
                var t = Ee[e];
                if (t) {
                    var n = Array.prototype.slice.call(arguments);
                    n.shift();
                    for (var i = 0; i < t.length; i++) t[i].apply(r, n)
                }
            },
            je = function() {
                return (new Date).getTime()
            },
            Oe = function(e) {
                ce = e, r.bg.style.opacity = e * l.bgOpacity
            },
            Ie = function(e, t, n, i, o) {
                (!Ce || o && o !== r.currItem) && (i /= o ? o.fitRatio : r.currItem.fitRatio), e[j] = w + t + "px, " + n + "px" + x + " scale(" + i + ")"
            },
            Le = function(e) {
                oe && (e && (y > r.currItem.fitRatio ? Ce || (fn(r.currItem, !1, !0), Ce = !0) : Ce && (fn(r.currItem), Ce = !1)), Ie(oe, me.x, me.y, y))
            },
            Me = function(e) {
                e.container && Ie(e.container.style, e.initialPosition.x, e.initialPosition.y, e.initialZoomLevel, e)
            },
            Pe = function(e, t) {
                t[j] = w + e + "px, 0px" + x
            },
            _e = function(e, t) {
                if (!l.loop && t) {
                    var n = p + (be.x * ge - e) / be.x,
                        i = Math.round(e - bt.x);
                    (n < 0 && i > 0 || n >= en() - 1 && i < 0) && (e = bt.x + i * l.mainScrollEndFriction)
                }
                bt.x = e, Pe(e, f)
            },
            Ne = function(e, t) {
                var n = wt[e] - ye[e];
                return he[e] + fe[e] + n - n * (t / b)
            },
            He = function(e, t) {
                e.x = t.x, e.y = t.y, t.id && (e.id = t.id)
            },
            Fe = function(e) {
                e.x = Math.round(e.x), e.y = Math.round(e.y)
            },
            qe = null,
            Re = function() {
                qe && (o.unbind(document, "mousemove", Re), o.addClass(e, "pswp--has_mouse"), l.mouseUsed = !0, De("mouseUsed")), qe = setTimeout(function() {
                    qe = null
                }, 100)
            },
            ze = function() {
                o.bind(document, "keydown", r), F.transform && o.bind(r.scrollWrap, "click", r), l.mouseUsed || o.bind(document, "mousemove", Re), o.bind(window, "resize scroll orientationchange", r), De("bindEvents")
            },
            We = function() {
                o.unbind(window, "resize scroll orientationchange", r), o.unbind(window, "scroll", g.scroll), o.unbind(document, "keydown", r), o.unbind(document, "mousemove", Re), F.transform && o.unbind(r.scrollWrap, "click", r), Z && o.unbind(window, m, r), clearTimeout(q), De("unbindEvents")
            },
            Ue = function(e, t) {
                var n = cn(r.currItem, ve, e);
                return t && (ie = n), n
            },
            Be = function(e) {
                return e || (e = r.currItem), e.initialZoomLevel
            },
            Ye = function(e) {
                return e || (e = r.currItem), e.w > 0 ? l.maxSpreadZoom : 1
            },
            Ze = function(e, t, n, i) {
                return i === r.currItem.initialZoomLevel ? (n[e] = r.currItem.initialPosition[e], !0) : (n[e] = Ne(e, i), n[e] > t.min[e] ? (n[e] = t.min[e], !0) : n[e] < t.max[e] && (n[e] = t.max[e], !0))
            },
            Xe = function() {
                if (j) {
                    var t = F.perspective && !I;
                    return w = "translate" + (t ? "3d(" : "("), void(x = F.perspective ? ", 0px)" : ")")
                }
                j = "left", o.addClass(e, "pswp--ie"), Pe = function(e, t) {
                    t.left = e + "px"
                }, Me = function(e) {
                    var t = e.fitRatio > 1 ? 1 : e.fitRatio,
                        n = e.container.style,
                        i = t * e.w,
                        o = t * e.h;
                    n.width = i + "px", n.height = o + "px", n.left = e.initialPosition.x + "px", n.top = e.initialPosition.y + "px"
                }, Le = function() {
                    if (oe) {
                        var e = oe,
                            t = r.currItem,
                            n = t.fitRatio > 1 ? 1 : t.fitRatio,
                            i = n * t.w,
                            o = n * t.h;
                        e.width = i + "px", e.height = o + "px", e.left = me.x + "px", e.top = me.y + "px"
                    }
                }
            },
            Ke = function(e) {
                var t = "";
                l.escKey && 27 === e.keyCode ? t = "close" : l.arrowKeys && (37 === e.keyCode ? t = "prev" : 39 === e.keyCode && (t = "next")), t && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || (e.preventDefault ? e.preventDefault() : e.returnValue = !1, r[t]()))
            },
            Ve = function(e) {
                e && (V || K || re || B) && (e.preventDefault(), e.stopPropagation())
            },
            Ge = function() {
                r.setScrollOffset(0, o.getScrollY())
            },
            Qe = {},
            Je = 0,
            et = function(e) {
                Qe[e] && (Qe[e].raf && M(Qe[e].raf), Je--, delete Qe[e])
            },
            tt = function(e) {
                Qe[e] && et(e), Qe[e] || (Je++, Qe[e] = {})
            },
            nt = function() {
                for (var e in Qe) Qe.hasOwnProperty(e) && et(e)
            },
            it = function(e, t, n, i, o, r, s) {
                var a, l = je();
                tt(e);
                var c = function() {
                    if (Qe[e]) {
                        if (a = je() - l, a >= i) return et(e), r(n), void(s && s());
                        r((n - t) * o(a / i) + t), Qe[e].raf = L(c)
                    }
                };
                c()
            },
            ot = {
                shout: De,
                listen: Ae,
                viewportSize: ve,
                options: l,
                isMainScrollAnimating: function() {
                    return re
                },
                getZoomLevel: function() {
                    return y
                },
                getCurrentIndex: function() {
                    return p
                },
                isDragging: function() {
                    return Z
                },
                isZooming: function() {
                    return ee
                },
                setScrollOffset: function(e, t) {
                    ye.x = e, H = ye.y = t, De("updateScrollOffset", ye)
                },
                applyZoomPan: function(e, t, n, i) {
                    me.x = t, me.y = n, y = e, Le(i)
                },
                init: function() {
                    if (!c && !u) {
                        var n;
                        r.framework = o, r.template = e, r.bg = o.getChildByClass(e, "pswp__bg"), P = e.className, c = !0, F = o.detectFeatures(), L = F.raf, M = F.caf, j = F.transform, N = F.oldIE, r.scrollWrap = o.getChildByClass(e, "pswp__scroll-wrap"), r.container = o.getChildByClass(r.scrollWrap, "pswp__container"), f = r.container.style, r.itemHolders = C = [{
                            el: r.container.children[0],
                            wrap: 0,
                            index: -1
                        }, {
                            el: r.container.children[1],
                            wrap: 0,
                            index: -1
                        }, {
                            el: r.container.children[2],
                            wrap: 0,
                            index: -1
                        }], C[0].el.style.display = C[2].el.style.display = "none", Xe(), g = {
                            resize: r.updateSize,
                            orientationchange: function() {
                                clearTimeout(q), q = setTimeout(function() {
                                    ve.x !== r.scrollWrap.clientWidth && r.updateSize()
                                }, 500)
                            },
                            scroll: Ge,
                            keydown: Ke,
                            click: Ve
                        };
                        var i = F.isOldIOSPhone || F.isOldAndroid || F.isMobileOpera;
                        for (F.animationName && F.transform && !i || (l.showAnimationDuration = l.hideAnimationDuration = 0), n = 0; n < Te.length; n++) r["init" + Te[n]]();
                        if (t) {
                            var s = r.ui = new t(r, o);
                            s.init()
                        }
                        De("firstUpdate"), p = p || l.index || 0, (isNaN(p) || p < 0 || p >= en()) && (p = 0), r.currItem = Jt(p), (F.isOldIOSPhone || F.isOldAndroid) && (xe = !1), e.setAttribute("aria-hidden", "false"), l.modal && (xe ? e.style.position = "fixed" : (e.style.position = "absolute", e.style.top = o.getScrollY() + "px")), void 0 === H && (De("initialLayout"), H = _ = o.getScrollY());
                        var d = "pswp--open ";
                        for (l.mainClass && (d += l.mainClass + " "), l.showHideOpacity && (d += "pswp--animate_opacity "), d += I ? "pswp--touch" : "pswp--notouch", d += F.animationName ? " pswp--css_animation" : "", d += F.svg ? " pswp--svg" : "", o.addClass(e, d), r.updateSize(), h = -1, we = null, n = 0; n < a; n++) Pe((n + h) * be.x, C[n].el.style);
                        N || o.bind(r.scrollWrap, v, r), Ae("initialZoomInEnd", function() {
                            r.setContent(C[0], p - 1), r.setContent(C[2], p + 1), C[0].el.style.display = C[2].el.style.display = "block", l.focus && e.focus(), ze()
                        }), r.setContent(C[1], p), r.updateCurrItem(), De("afterInit"), xe || (T = setInterval(function() {
                            Je || Z || ee || y !== r.currItem.initialZoomLevel || r.updateSize()
                        }, 1e3)), o.addClass(e, "pswp--visible")
                    }
                },
                close: function() {
                    c && (c = !1, u = !0, De("close"), We(), nn(r.currItem, null, !0, r.destroy))
                },
                destroy: function() {
                    De("destroy"), Kt && clearTimeout(Kt), e.setAttribute("aria-hidden", "true"), e.className = P, T && clearInterval(T), o.unbind(r.scrollWrap, v, r), o.unbind(window, "scroll", r), St(), nt(), Ee = null
                },
                panTo: function(e, t, n) {
                    n || (e > ie.min.x ? e = ie.min.x : e < ie.max.x && (e = ie.max.x), t > ie.min.y ? t = ie.min.y : t < ie.max.y && (t = ie.max.y)), me.x = e, me.y = t, Le()
                },
                handleEvent: function(e) {
                    e = e || window.event, g[e.type] && g[e.type](e)
                },
                goTo: function(e) {
                    e = $e(e);
                    var t = e - p;
                    we = t, p = e, r.currItem = Jt(p), ge -= t, _e(be.x * ge), nt(), re = !1, r.updateCurrItem()
                },
                next: function() {
                    r.goTo(p + 1)
                },
                prev: function() {
                    r.goTo(p - 1)
                },
                updateCurrZoomItem: function(e) {
                    if (e && De("beforeChange", 0), C[1].el.children.length) {
                        var t = C[1].el.children[0];
                        oe = o.hasClass(t, "pswp__zoom-wrap") ? t.style : null
                    } else oe = null;
                    ie = r.currItem.bounds, b = y = r.currItem.initialZoomLevel, me.x = ie.center.x, me.y = ie.center.y, e && De("afterChange")
                },
                invalidateCurrItems: function() {
                    k = !0;
                    for (var e = 0; e < a; e++) C[e].item && (C[e].item.needsUpdate = !0)
                },
                updateCurrItem: function(e) {
                    if (0 !== we) {
                        var t, n = Math.abs(we);
                        if (!(e && n < 2)) {
                            r.currItem = Jt(p), Ce = !1, De("beforeChange", we), n >= a && (h += we + (we > 0 ? -a : a), n = a);
                            for (var i = 0; i < n; i++) we > 0 ? (t = C.shift(), C[a - 1] = t, h++, Pe((h + 2) * be.x, t.el.style), r.setContent(t, p - n + i + 1 + 1)) : (t = C.pop(), C.unshift(t), h--, Pe(h * be.x, t.el.style), r.setContent(t, p + n - i - 1 - 1));
                            if (oe && 1 === Math.abs(we)) {
                                var o = Jt(S);
                                o.initialZoomLevel !== y && (cn(o, ve), fn(o), Me(o))
                            }
                            we = 0, r.updateCurrZoomItem(), S = p, De("afterChange")
                        }
                    }
                },
                updateSize: function(t) {
                    if (!xe && l.modal) {
                        var n = o.getScrollY();
                        if (H !== n && (e.style.top = n + "px", H = n), !t && ke.x === window.innerWidth && ke.y === window.innerHeight) return;
                        ke.x = window.innerWidth, ke.y = window.innerHeight, e.style.height = ke.y + "px"
                    }
                    if (ve.x = r.scrollWrap.clientWidth, ve.y = r.scrollWrap.clientHeight, Ge(), be.x = ve.x + Math.round(ve.x * l.spacing), be.y = ve.y, _e(be.x * ge), De("beforeResize"), void 0 !== h) {
                        for (var i, s, c, u = 0; u < a; u++) i = C[u], Pe((u + h) * be.x, i.el.style), c = p + u - 1, l.loop && en() > 2 && (c = $e(c)), s = Jt(c), s && (k || s.needsUpdate || !s.bounds) ? (r.cleanSlide(s), r.setContent(i, c), 1 === u && (r.currItem = s, r.updateCurrZoomItem(!0)), s.needsUpdate = !1) : i.index === -1 && c >= 0 && r.setContent(i, c), s && s.container && (cn(s, ve), fn(s), Me(s));
                        k = !1
                    }
                    b = y = r.currItem.initialZoomLevel, ie = r.currItem.bounds, ie && (me.x = ie.center.x, me.y = ie.center.y, Le(!0)), De("resize")
                },
                zoomTo: function(e, t, n, i, r) {
                    t && (b = y, wt.x = Math.abs(t.x) - me.x, wt.y = Math.abs(t.y) - me.y, He(he, me));
                    var s = Ue(e, !1),
                        a = {};
                    Ze("x", s, a, e), Ze("y", s, a, e);
                    var l = y,
                        c = {
                            x: me.x,
                            y: me.y
                        };
                    Fe(a);
                    var u = function(t) {
                        1 === t ? (y = e, me.x = a.x, me.y = a.y) : (y = (e - l) * t + l, me.x = (a.x - c.x) * t + c.x, me.y = (a.y - c.y) * t + c.y), r && r(t), Le(1 === t)
                    };
                    n ? it("customZoomTo", 0, 1, n, i || o.easing.sine.inOut, u) : u(1)
                }
            },
            rt = 30,
            st = 10,
            at = {},
            lt = {},
            ct = {},
            ut = {},
            dt = {},
            pt = [],
            ft = {},
            ht = [],
            mt = {},
            vt = 0,
            gt = pe(),
            yt = 0,
            bt = pe(),
            wt = pe(),
            xt = pe(),
            Tt = function(e, t) {
                return e.x === t.x && e.y === t.y
            },
            kt = function(e, t) {
                return Math.abs(e.x - t.x) < s && Math.abs(e.y - t.y) < s
            },
            Ct = function(e, t) {
                return mt.x = Math.abs(e.x - t.x), mt.y = Math.abs(e.y - t.y), Math.sqrt(mt.x * mt.x + mt.y * mt.y)
            },
            St = function() {
                G && (M(G), G = null)
            },
            $t = function() {
                Z && (G = L($t), zt())
            },
            Et = function() {
                return !("fit" === l.scaleMode && y === r.currItem.initialZoomLevel)
            },
            At = function(e, t) {
                return !(!e || e === document) && !(e.getAttribute("class") && e.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (t(e) ? e : At(e.parentNode, t))
            },
            Dt = {},
            jt = function(e, t) {
                return Dt.prevent = !At(e.target, l.isClickableElement), De("preventDragEvent", e, t, Dt), Dt.prevent
            },
            Ot = function(e, t) {
                return t.x = e.pageX, t.y = e.pageY, t.id = e.identifier, t
            },
            It = function(e, t, n) {
                n.x = .5 * (e.x + t.x), n.y = .5 * (e.y + t.y)
            },
            Lt = function(e, t, n) {
                if (e - z > 50) {
                    var i = ht.length > 2 ? ht.shift() : {};
                    i.x = t, i.y = n, ht.push(i), z = e
                }
            },
            Mt = function() {
                var e = me.y - r.currItem.initialPosition.y;
                return 1 - Math.abs(e / (ve.y / 2))
            },
            Pt = {},
            _t = {},
            Nt = [],
            Ht = function(e) {
                for (; Nt.length > 0;) Nt.pop();
                return O ? (de = 0, pt.forEach(function(e) {
                    0 === de ? Nt[0] = e : 1 === de && (Nt[1] = e), de++
                })) : e.type.indexOf("touch") > -1 ? e.touches && e.touches.length > 0 && (Nt[0] = Ot(e.touches[0], Pt), e.touches.length > 1 && (Nt[1] = Ot(e.touches[1], _t))) : (Pt.x = e.pageX, Pt.y = e.pageY, Pt.id = "", Nt[0] = Pt), Nt
            },
            Ft = function(e, t) {
                var n, i, o, s, a = 0,
                    c = me[e] + t[e],
                    u = t[e] > 0,
                    d = bt.x + t.x,
                    p = bt.x - ft.x;
                return n = c > ie.min[e] || c < ie.max[e] ? l.panEndFriction : 1, c = me[e] + t[e] * n, !l.allowPanToNext && y !== r.currItem.initialZoomLevel || (oe ? "h" !== se || "x" !== e || K || (u ? (c > ie.min[e] && (n = l.panEndFriction, a = ie.min[e] - c, i = ie.min[e] - he[e]), (i <= 0 || p < 0) && en() > 1 ? (s = d, p < 0 && d > ft.x && (s = ft.x)) : ie.min.x !== ie.max.x && (o = c)) : (c < ie.max[e] && (n = l.panEndFriction, a = c - ie.max[e], i = he[e] - ie.max[e]), (i <= 0 || p > 0) && en() > 1 ? (s = d, p > 0 && d < ft.x && (s = ft.x)) : ie.min.x !== ie.max.x && (o = c))) : s = d, "x" !== e) ? void(re || Q || y > r.currItem.fitRatio && (me[e] += t[e] * n)) : (void 0 !== s && (_e(s, !0), Q = s !== ft.x), ie.min.x !== ie.max.x && (void 0 !== o ? me.x = o : Q || (me.x += t.x * n)), void 0 !== s)
            },
            qt = function(e) {
                if (!("mousedown" === e.type && e.button > 0)) {
                    if (Qt) return void e.preventDefault();
                    if (!Y || "mousedown" !== e.type) {
                        if (jt(e, !0) && e.preventDefault(), De("pointerDown"), O) {
                            var t = o.arraySearch(pt, e.pointerId, "id");
                            t < 0 && (t = pt.length), pt[t] = {
                                x: e.pageX,
                                y: e.pageY,
                                id: e.pointerId
                            }
                        }
                        var n = Ht(e),
                            i = n.length;
                        J = null, nt(), Z && 1 !== i || (Z = ae = !0, o.bind(window, m, r), U = ue = le = B = Q = V = X = K = !1, se = null, De("firstTouchStart", n), He(he, me), fe.x = fe.y = 0, He(ut, n[0]), He(dt, ut), ft.x = be.x * ge, ht = [{
                            x: ut.x,
                            y: ut.y
                        }], z = R = je(), Ue(y, !0), St(), $t()), !ee && i > 1 && !re && !Q && (b = y, K = !1, ee = X = !0, fe.y = fe.x = 0, He(he, me), He(at, n[0]), He(lt, n[1]), It(at, lt, xt), wt.x = Math.abs(xt.x) - me.x, wt.y = Math.abs(xt.y) - me.y, te = ne = Ct(at, lt))
                    }
                }
            },
            Rt = function(e) {
                if (e.preventDefault(), O) {
                    var t = o.arraySearch(pt, e.pointerId, "id");
                    if (t > -1) {
                        var n = pt[t];
                        n.x = e.pageX, n.y = e.pageY
                    }
                }
                if (Z) {
                    var i = Ht(e);
                    if (se || V || ee) J = i;
                    else if (bt.x !== be.x * ge) se = "h";
                    else {
                        var r = Math.abs(i[0].x - ut.x) - Math.abs(i[0].y - ut.y);
                        Math.abs(r) >= st && (se = r > 0 ? "h" : "v", J = i)
                    }
                }
            },
            zt = function() {
                if (J) {
                    var e = J.length;
                    if (0 !== e)
                        if (He(at, J[0]), ct.x = at.x - ut.x, ct.y = at.y - ut.y, ee && e > 1) {
                            if (ut.x = at.x, ut.y = at.y, !ct.x && !ct.y && Tt(J[1], lt)) return;
                            He(lt, J[1]), K || (K = !0, De("zoomGestureStarted"));
                            var t = Ct(at, lt),
                                n = Zt(t);
                            n > r.currItem.initialZoomLevel + r.currItem.initialZoomLevel / 15 && (ue = !0);
                            var i = 1,
                                o = Be(),
                                s = Ye();
                            if (n < o)
                                if (l.pinchToClose && !ue && b <= r.currItem.initialZoomLevel) {
                                    var a = o - n,
                                        c = 1 - a / (o / 1.2);
                                    Oe(c), De("onPinchClose", c), le = !0
                                } else i = (o - n) / o, i > 1 && (i = 1), n = o - i * (o / 3);
                            else n > s && (i = (n - s) / (6 * o), i > 1 && (i = 1), n = s + i * o);
                            i < 0 && (i = 0), te = t, It(at, lt, gt), fe.x += gt.x - xt.x, fe.y += gt.y - xt.y, He(xt, gt), me.x = Ne("x", n), me.y = Ne("y", n), U = n > y, y = n, Le()
                        } else {
                            if (!se) return;
                            if (ae && (ae = !1, Math.abs(ct.x) >= st && (ct.x -= J[0].x - dt.x), Math.abs(ct.y) >= st && (ct.y -= J[0].y - dt.y)), ut.x = at.x, ut.y = at.y, 0 === ct.x && 0 === ct.y) return;
                            if ("v" === se && l.closeOnVerticalDrag && !Et()) {
                                fe.y += ct.y, me.y += ct.y;
                                var u = Mt();
                                return B = !0, De("onVerticalDrag", u), Oe(u), void Le()
                            }
                            Lt(je(), at.x, at.y), V = !0, ie = r.currItem.bounds;
                            var d = Ft("x", ct);
                            d || (Ft("y", ct), Fe(me), Le())
                        }
                }
            },
            Wt = function(e) {
                if (F.isOldAndroid) {
                    if (Y && "mouseup" === e.type) return;
                    e.type.indexOf("touch") > -1 && (clearTimeout(Y), Y = setTimeout(function() {
                        Y = 0
                    }, 600))
                }
                De("pointerUp"), jt(e, !1) && e.preventDefault();
                var t;
                if (O) {
                    var n = o.arraySearch(pt, e.pointerId, "id");
                    if (n > -1)
                        if (t = pt.splice(n, 1)[0], navigator.pointerEnabled) t.type = e.pointerType || "mouse";
                        else {
                            var i = {
                                4: "mouse",
                                2: "touch",
                                3: "pen"
                            };
                            t.type = i[e.pointerType], t.type || (t.type = e.pointerType || "mouse")
                        }
                }
                var s, a = Ht(e),
                    c = a.length;
                if ("mouseup" === e.type && (c = 0), 2 === c) return J = null, !0;
                1 === c && He(dt, a[0]), 0 !== c || se || re || (t || ("mouseup" === e.type ? t = {
                    x: e.pageX,
                    y: e.pageY,
                    type: "mouse"
                } : e.changedTouches && e.changedTouches[0] && (t = {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY,
                    type: "touch"
                })), De("touchRelease", e, t));
                var u = -1;
                if (0 === c && (Z = !1, o.unbind(window, m, r), St(), ee ? u = 0 : yt !== -1 && (u = je() - yt)), yt = 1 === c ? je() : -1, s = u !== -1 && u < 150 ? "zoom" : "swipe", ee && c < 2 && (ee = !1, 1 === c && (s = "zoomPointerUp"), De("zoomGestureEnded")), J = null, V || K || re || B)
                    if (nt(), W || (W = Ut()), W.calculateSwipeSpeed("x"), B) {
                        var d = Mt();
                        if (d < l.verticalDragRange) r.close();
                        else {
                            var p = me.y,
                                f = ce;
                            it("verticalDrag", 0, 1, 300, o.easing.cubic.out, function(e) {
                                me.y = (r.currItem.initialPosition.y - p) * e + p, Oe((1 - f) * e + f), Le()
                            }), De("onVerticalDrag", 1)
                        }
                    } else {
                        if ((Q || re) && 0 === c) {
                            var h = Yt(s, W);
                            if (h) return;
                            s = "zoomPointerUp"
                        }
                        if (!re) return "swipe" !== s ? void Xt() : void(!Q && y > r.currItem.fitRatio && Bt(W))
                    }
            },
            Ut = function() {
                var e, t, n = {
                    lastFlickOffset: {},
                    lastFlickDist: {},
                    lastFlickSpeed: {},
                    slowDownRatio: {},
                    slowDownRatioReverse: {},
                    speedDecelerationRatio: {},
                    speedDecelerationRatioAbs: {},
                    distanceOffset: {},
                    backAnimDestination: {},
                    backAnimStarted: {},
                    calculateSwipeSpeed: function(i) {
                        ht.length > 1 ? (e = je() - z + 50, t = ht[ht.length - 2][i]) : (e = je() - R, t = dt[i]), n.lastFlickOffset[i] = ut[i] - t, n.lastFlickDist[i] = Math.abs(n.lastFlickOffset[i]), n.lastFlickDist[i] > 20 ? n.lastFlickSpeed[i] = n.lastFlickOffset[i] / e : n.lastFlickSpeed[i] = 0, Math.abs(n.lastFlickSpeed[i]) < .1 && (n.lastFlickSpeed[i] = 0), n.slowDownRatio[i] = .95, n.slowDownRatioReverse[i] = 1 - n.slowDownRatio[i], n.speedDecelerationRatio[i] = 1
                    },
                    calculateOverBoundsAnimOffset: function(e, t) {
                        n.backAnimStarted[e] || (me[e] > ie.min[e] ? n.backAnimDestination[e] = ie.min[e] : me[e] < ie.max[e] && (n.backAnimDestination[e] = ie.max[e]), void 0 !== n.backAnimDestination[e] && (n.slowDownRatio[e] = .7, n.slowDownRatioReverse[e] = 1 - n.slowDownRatio[e], n.speedDecelerationRatioAbs[e] < .05 && (n.lastFlickSpeed[e] = 0, n.backAnimStarted[e] = !0, it("bounceZoomPan" + e, me[e], n.backAnimDestination[e], t || 300, o.easing.sine.out, function(t) {
                            me[e] = t, Le()
                        }))))
                    },
                    calculateAnimOffset: function(e) {
                        n.backAnimStarted[e] || (n.speedDecelerationRatio[e] = n.speedDecelerationRatio[e] * (n.slowDownRatio[e] + n.slowDownRatioReverse[e] - n.slowDownRatioReverse[e] * n.timeDiff / 10), n.speedDecelerationRatioAbs[e] = Math.abs(n.lastFlickSpeed[e] * n.speedDecelerationRatio[e]), n.distanceOffset[e] = n.lastFlickSpeed[e] * n.speedDecelerationRatio[e] * n.timeDiff, me[e] += n.distanceOffset[e])
                    },
                    panAnimLoop: function() {
                        if (Qe.zoomPan && (Qe.zoomPan.raf = L(n.panAnimLoop), n.now = je(), n.timeDiff = n.now - n.lastNow, n.lastNow = n.now, n.calculateAnimOffset("x"), n.calculateAnimOffset("y"), Le(), n.calculateOverBoundsAnimOffset("x"), n.calculateOverBoundsAnimOffset("y"), n.speedDecelerationRatioAbs.x < .05 && n.speedDecelerationRatioAbs.y < .05)) return me.x = Math.round(me.x), me.y = Math.round(me.y), Le(),
                            void et("zoomPan")
                    }
                };
                return n
            },
            Bt = function(e) {
                return e.calculateSwipeSpeed("y"), ie = r.currItem.bounds, e.backAnimDestination = {}, e.backAnimStarted = {}, Math.abs(e.lastFlickSpeed.x) <= .05 && Math.abs(e.lastFlickSpeed.y) <= .05 ? (e.speedDecelerationRatioAbs.x = e.speedDecelerationRatioAbs.y = 0, e.calculateOverBoundsAnimOffset("x"), e.calculateOverBoundsAnimOffset("y"), !0) : (tt("zoomPan"), e.lastNow = je(), void e.panAnimLoop())
            },
            Yt = function(e, t) {
                var n;
                re || (vt = p);
                var i;
                if ("swipe" === e) {
                    var s = ut.x - dt.x,
                        a = t.lastFlickDist.x < 10;
                    s > rt && (a || t.lastFlickOffset.x > 20) ? i = -1 : s < -rt && (a || t.lastFlickOffset.x < -20) && (i = 1)
                }
                var c;
                i && (p += i, p < 0 ? (p = l.loop ? en() - 1 : 0, c = !0) : p >= en() && (p = l.loop ? 0 : en() - 1, c = !0), c && !l.loop || (we += i, ge -= i, n = !0));
                var u, d = be.x * ge,
                    f = Math.abs(d - bt.x);
                return n || d > bt.x == t.lastFlickSpeed.x > 0 ? (u = Math.abs(t.lastFlickSpeed.x) > 0 ? f / Math.abs(t.lastFlickSpeed.x) : 333, u = Math.min(u, 400), u = Math.max(u, 250)) : u = 333, vt === p && (n = !1), re = !0, De("mainScrollAnimStart"), it("mainScroll", bt.x, d, u, o.easing.cubic.out, _e, function() {
                    nt(), re = !1, vt = -1, (n || vt !== p) && r.updateCurrItem(), De("mainScrollAnimComplete")
                }), n && r.updateCurrItem(!0), n
            },
            Zt = function(e) {
                return 1 / ne * e * b
            },
            Xt = function() {
                var e = y,
                    t = Be(),
                    n = Ye();
                y < t ? e = t : y > n && (e = n);
                var i, s = 1,
                    a = ce;
                return le && !U && !ue && y < t ? (r.close(), !0) : (le && (i = function(e) {
                    Oe((s - a) * e + a)
                }), r.zoomTo(e, 0, 200, o.easing.cubic.out, i), !0)
            };
        Se("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var e = function(e, t, n, i, o) {
                        $ = e + t, E = e + n, A = e + i, D = o ? e + o : ""
                    };
                    O = F.pointerEvent, O && F.touch && (F.touch = !1), O ? navigator.pointerEnabled ? e("pointer", "down", "move", "up", "cancel") : e("MSPointer", "Down", "Move", "Up", "Cancel") : F.touch ? (e("touch", "start", "move", "end", "cancel"), I = !0) : e("mouse", "down", "move", "up"), m = E + " " + A + " " + D, v = $, O && !I && (I = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), r.likelyTouchDevice = I, g[$] = qt, g[E] = Rt, g[A] = Wt, D && (g[D] = g[A]), F.touch && (v += " mousedown", m += " mousemove mouseup", g.mousedown = g[$], g.mousemove = g[E], g.mouseup = g[A]), I || (l.allowPanToNext = !1)
                }
            }
        });
        var Kt, Vt, Gt, Qt, Jt, en, tn, nn = function(t, n, i, s) {
                Kt && clearTimeout(Kt), Qt = !0, Gt = !0;
                var a;
                t.initialLayout ? (a = t.initialLayout, t.initialLayout = null) : a = l.getThumbBoundsFn && l.getThumbBoundsFn(p);
                var c = i ? l.hideAnimationDuration : l.showAnimationDuration,
                    u = function() {
                        et("initialZoom"), i ? (r.template.removeAttribute("style"), r.bg.removeAttribute("style")) : (Oe(1), n && (n.style.display = "block"), o.addClass(e, "pswp--animated-in"), De("initialZoom" + (i ? "OutEnd" : "InEnd"))), s && s(), Qt = !1
                    };
                if (!c || !a || void 0 === a.x) return De("initialZoom" + (i ? "Out" : "In")), y = t.initialZoomLevel, He(me, t.initialPosition), Le(), e.style.opacity = i ? 0 : 1, Oe(1), void(c ? setTimeout(function() {
                    u()
                }, c) : u());
                var f = function() {
                    var n = d,
                        s = !r.currItem.src || r.currItem.loadError || l.showHideOpacity;
                    t.miniImg && (t.miniImg.style.webkitBackfaceVisibility = "hidden"), i || (y = a.w / t.w, me.x = a.x, me.y = a.y - _, r[s ? "template" : "bg"].style.opacity = .001, Le()), tt("initialZoom"), i && !n && o.removeClass(e, "pswp--animated-in"), s && (i ? o[(n ? "remove" : "add") + "Class"](e, "pswp--animate_opacity") : setTimeout(function() {
                        o.addClass(e, "pswp--animate_opacity")
                    }, 30)), Kt = setTimeout(function() {
                        if (De("initialZoom" + (i ? "Out" : "In")), i) {
                            var r = a.w / t.w,
                                l = {
                                    x: me.x,
                                    y: me.y
                                },
                                d = y,
                                p = ce,
                                f = function(t) {
                                    1 === t ? (y = r, me.x = a.x, me.y = a.y - H) : (y = (r - d) * t + d, me.x = (a.x - l.x) * t + l.x, me.y = (a.y - H - l.y) * t + l.y), Le(), s ? e.style.opacity = 1 - t : Oe(p - t * p)
                                };
                            n ? it("initialZoom", 0, 1, c, o.easing.cubic.out, f, u) : (f(1), Kt = setTimeout(u, c + 20))
                        } else y = t.initialZoomLevel, He(me, t.initialPosition), Le(), Oe(1), s ? e.style.opacity = 1 : Oe(1), Kt = setTimeout(u, c + 20)
                    }, i ? 25 : 90)
                };
                f()
            },
            on = {},
            rn = [],
            sn = {
                index: 0,
                errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                forceProgressiveLoading: !1,
                preload: [1, 1],
                getNumItemsFn: function() {
                    return Vt.length
                }
            },
            an = function() {
                return {
                    center: {
                        x: 0,
                        y: 0
                    },
                    max: {
                        x: 0,
                        y: 0
                    },
                    min: {
                        x: 0,
                        y: 0
                    }
                }
            },
            ln = function(e, t, n) {
                var i = e.bounds;
                i.center.x = Math.round((on.x - t) / 2), i.center.y = Math.round((on.y - n) / 2) + e.vGap.top, i.max.x = t > on.x ? Math.round(on.x - t) : i.center.x, i.max.y = n > on.y ? Math.round(on.y - n) + e.vGap.top : i.center.y, i.min.x = t > on.x ? 0 : i.center.x, i.min.y = n > on.y ? e.vGap.top : i.center.y
            },
            cn = function(e, t, n) {
                if (e.src && !e.loadError) {
                    var i = !n;
                    if (i && (e.vGap || (e.vGap = {
                            top: 0,
                            bottom: 0
                        }), De("parseVerticalMargin", e)), on.x = t.x, on.y = t.y - e.vGap.top - e.vGap.bottom, i) {
                        var o = on.x / e.w,
                            r = on.y / e.h;
                        e.fitRatio = o < r ? o : r;
                        var s = l.scaleMode;
                        "orig" === s ? n = 1 : "fit" === s && (n = e.fitRatio), n > 1 && (n = 1), e.initialZoomLevel = n, e.bounds || (e.bounds = an())
                    }
                    if (!n) return;
                    return ln(e, e.w * n, e.h * n), i && n === e.initialZoomLevel && (e.initialPosition = e.bounds.center), e.bounds
                }
                return e.w = e.h = 0, e.initialZoomLevel = e.fitRatio = 1, e.bounds = an(), e.initialPosition = e.bounds.center, e.bounds
            },
            un = function(e, t, n, i, o, s) {
                t.loadError || i && (t.imageAppended = !0, fn(t, i, t === r.currItem && Ce), n.appendChild(i), s && setTimeout(function() {
                    t && t.loaded && t.placeholder && (t.placeholder.style.display = "none", t.placeholder = null)
                }, 500))
            },
            dn = function(e) {
                e.loading = !0, e.loaded = !1;
                var t = e.img = o.createEl("pswp__img", "img"),
                    n = function() {
                        e.loading = !1, e.loaded = !0, e.loadComplete ? e.loadComplete(e) : e.img = null, t.onload = t.onerror = null, t = null
                    };
                return t.onload = n, t.onerror = function() {
                    e.loadError = !0, n()
                }, t.src = e.src, t
            },
            pn = function(e, t) {
                if (e.src && e.loadError && e.container) return t && (e.container.innerHTML = ""), e.container.innerHTML = l.errorMsg.replace("%url%", e.src), !0
            },
            fn = function(e, t, n) {
                if (e.src) {
                    t || (t = e.container.lastChild);
                    var i = n ? e.w : Math.round(e.w * e.fitRatio),
                        o = n ? e.h : Math.round(e.h * e.fitRatio);
                    e.placeholder && !e.loaded && (e.placeholder.style.width = i + "px", e.placeholder.style.height = o + "px"), t.style.width = i + "px", t.style.height = o + "px"
                }
            },
            hn = function() {
                if (rn.length) {
                    for (var e, t = 0; t < rn.length; t++) e = rn[t], e.holder.index === e.index && un(e.index, e.item, e.baseDiv, e.img, !1, e.clearPlaceholder);
                    rn = []
                }
            };
        Se("Controller", {
            publicMethods: {
                lazyLoadItem: function(e) {
                    e = $e(e);
                    var t = Jt(e);
                    t && (!t.loaded && !t.loading || k) && (De("gettingData", e, t), t.src && dn(t))
                },
                initController: function() {
                    o.extend(l, sn, !0), r.items = Vt = n, Jt = r.getItemAt, en = l.getNumItemsFn, tn = l.loop, en() < 3 && (l.loop = !1), Ae("beforeChange", function(e) {
                        var t, n = l.preload,
                            i = null === e || e >= 0,
                            o = Math.min(n[0], en()),
                            s = Math.min(n[1], en());
                        for (t = 1; t <= (i ? s : o); t++) r.lazyLoadItem(p + t);
                        for (t = 1; t <= (i ? o : s); t++) r.lazyLoadItem(p - t)
                    }), Ae("initialLayout", function() {
                        r.currItem.initialLayout = l.getThumbBoundsFn && l.getThumbBoundsFn(p)
                    }), Ae("mainScrollAnimComplete", hn), Ae("initialZoomInEnd", hn), Ae("destroy", function() {
                        for (var e, t = 0; t < Vt.length; t++) e = Vt[t], e.container && (e.container = null), e.placeholder && (e.placeholder = null), e.img && (e.img = null), e.preloader && (e.preloader = null), e.loadError && (e.loaded = e.loadError = !1);
                        rn = null
                    })
                },
                getItemAt: function(e) {
                    return e >= 0 && void 0 !== Vt[e] && Vt[e]
                },
                allowProgressiveImg: function() {
                    return l.forceProgressiveLoading || !I || l.mouseUsed || screen.width > 1200
                },
                setContent: function(e, t) {
                    l.loop && (t = $e(t));
                    var n = r.getItemAt(e.index);
                    n && (n.container = null);
                    var i, s = r.getItemAt(t);
                    if (!s) return void(e.el.innerHTML = "");
                    De("gettingData", t, s), e.index = t, e.item = s;
                    var a = s.container = o.createEl("pswp__zoom-wrap");
                    if (!s.src && s.html && (s.html.tagName ? a.appendChild(s.html) : a.innerHTML = s.html), pn(s), cn(s, ve), !s.src || s.loadError || s.loaded) s.src && !s.loadError && (i = o.createEl("pswp__img", "img"), i.style.opacity = 1, i.src = s.src, fn(s, i), un(t, s, a, i, !0));
                    else {
                        if (s.loadComplete = function(n) {
                                if (c) {
                                    if (e && e.index === t) {
                                        if (pn(n, !0)) return n.loadComplete = n.img = null, cn(n, ve), Me(n), void(e.index === p && r.updateCurrZoomItem());
                                        n.imageAppended ? !Qt && n.placeholder && (n.placeholder.style.display = "none", n.placeholder = null) : F.transform && (re || Qt) ? rn.push({
                                            item: n,
                                            baseDiv: a,
                                            img: n.img,
                                            index: t,
                                            holder: e,
                                            clearPlaceholder: !0
                                        }) : un(t, n, a, n.img, re || Qt, !0)
                                    }
                                    n.loadComplete = null, n.img = null, De("imageLoadComplete", t, n)
                                }
                            }, o.features.transform) {
                            var u = "pswp__img pswp__img--placeholder";
                            u += s.msrc ? "" : " pswp__img--placeholder--blank";
                            var d = o.createEl(u, s.msrc ? "img" : "");
                            s.msrc && (d.src = s.msrc), fn(s, d), a.appendChild(d), s.placeholder = d
                        }
                        s.loading || dn(s), r.allowProgressiveImg() && (!Gt && F.transform ? rn.push({
                            item: s,
                            baseDiv: a,
                            img: s.img,
                            index: t,
                            holder: e
                        }) : un(t, s, a, s.img, !0, !0))
                    }
                    Gt || t !== p ? Me(s) : (oe = a.style, nn(s, i || s.img)), e.el.innerHTML = "", e.el.appendChild(a)
                },
                cleanSlide: function(e) {
                    e.img && (e.img.onload = e.img.onerror = null), e.loaded = e.loading = e.img = e.imageAppended = !1
                }
            }
        });
        var mn, vn = {},
            gn = function(e, t, n) {
                var i = document.createEvent("CustomEvent"),
                    o = {
                        origEvent: e,
                        target: e.target,
                        releasePoint: t,
                        pointerType: n || "touch"
                    };
                i.initCustomEvent("pswpTap", !0, !0, o), e.target.dispatchEvent(i)
            };
        Se("Tap", {
            publicMethods: {
                initTap: function() {
                    Ae("firstTouchStart", r.onTapStart), Ae("touchRelease", r.onTapRelease), Ae("destroy", function() {
                        vn = {}, mn = null
                    })
                },
                onTapStart: function(e) {
                    e.length > 1 && (clearTimeout(mn), mn = null)
                },
                onTapRelease: function(e, t) {
                    if (t && !V && !X && !Je) {
                        var n = t;
                        if (mn && (clearTimeout(mn), mn = null, kt(n, vn))) return void De("doubleTap", n);
                        if ("mouse" === t.type) return void gn(e, t, "mouse");
                        var i = e.target.tagName.toUpperCase();
                        if ("BUTTON" === i || o.hasClass(e.target, "pswp__single-tap")) return void gn(e, t);
                        He(vn, n), mn = setTimeout(function() {
                            gn(e, t), mn = null
                        }, 300)
                    }
                }
            }
        });
        var yn;
        Se("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    N || (I ? Ae("mouseUsed", function() {
                        r.setupDesktopZoom()
                    }) : r.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(t) {
                    yn = {};
                    var n = "wheel mousewheel DOMMouseScroll";
                    Ae("bindEvents", function() {
                        o.bind(e, n, r.handleMouseWheel)
                    }), Ae("unbindEvents", function() {
                        yn && o.unbind(e, n, r.handleMouseWheel)
                    }), r.mouseZoomedIn = !1;
                    var i, s = function() {
                            r.mouseZoomedIn && (o.removeClass(e, "pswp--zoomed-in"), r.mouseZoomedIn = !1), y < 1 ? o.addClass(e, "pswp--zoom-allowed") : o.removeClass(e, "pswp--zoom-allowed"), a()
                        },
                        a = function() {
                            i && (o.removeClass(e, "pswp--dragging"), i = !1)
                        };
                    Ae("resize", s), Ae("afterChange", s), Ae("pointerDown", function() {
                        r.mouseZoomedIn && (i = !0, o.addClass(e, "pswp--dragging"))
                    }), Ae("pointerUp", a), t || s()
                },
                handleMouseWheel: function(e) {
                    if (y <= r.currItem.fitRatio) return l.modal && (!l.closeOnScroll || Je || Z ? e.preventDefault() : j && Math.abs(e.deltaY) > 2 && (d = !0, r.close())), !0;
                    if (e.stopPropagation(), yn.x = 0, "deltaX" in e) 1 === e.deltaMode ? (yn.x = 18 * e.deltaX, yn.y = 18 * e.deltaY) : (yn.x = e.deltaX, yn.y = e.deltaY);
                    else if ("wheelDelta" in e) e.wheelDeltaX && (yn.x = -.16 * e.wheelDeltaX), e.wheelDeltaY ? yn.y = -.16 * e.wheelDeltaY : yn.y = -.16 * e.wheelDelta;
                    else {
                        if (!("detail" in e)) return;
                        yn.y = e.detail
                    }
                    Ue(y, !0);
                    var t = me.x - yn.x,
                        n = me.y - yn.y;
                    (l.modal || t <= ie.min.x && t >= ie.max.x && n <= ie.min.y && n >= ie.max.y) && e.preventDefault(), r.panTo(t, n)
                },
                toggleDesktopZoom: function(t) {
                    t = t || {
                        x: ve.x / 2 + ye.x,
                        y: ve.y / 2 + ye.y
                    };
                    var n = l.getDoubleTapZoom(!0, r.currItem),
                        i = y === n;
                    r.mouseZoomedIn = !i, r.zoomTo(i ? r.currItem.initialZoomLevel : n, t, 333), o[(i ? "remove" : "add") + "Class"](e, "pswp--zoomed-in")
                }
            }
        });
        var bn, wn, xn, Tn, kn, Cn, Sn, $n, En, An, Dn, jn, On = {
                history: !0,
                galleryUID: 1
            },
            In = function() {
                return Dn.hash.substring(1)
            },
            Ln = function() {
                bn && clearTimeout(bn), xn && clearTimeout(xn)
            },
            Mn = function() {
                var e = In(),
                    t = {};
                if (e.length < 5) return t;
                var n, i = e.split("&");
                for (n = 0; n < i.length; n++)
                    if (i[n]) {
                        var o = i[n].split("=");
                        o.length < 2 || (t[o[0]] = o[1])
                    }
                if (l.galleryPIDs) {
                    var r = t.pid;
                    for (t.pid = 0, n = 0; n < Vt.length; n++)
                        if (Vt[n].pid === r) {
                            t.pid = n;
                            break
                        }
                } else t.pid = parseInt(t.pid, 10) - 1;
                return t.pid < 0 && (t.pid = 0), t
            },
            Pn = function() {
                if (xn && clearTimeout(xn), Je || Z) return void(xn = setTimeout(Pn, 500));
                Tn ? clearTimeout(wn) : Tn = !0;
                var e = p + 1,
                    t = Jt(p);
                t.hasOwnProperty("pid") && (e = t.pid);
                var n = Sn + "&gid=" + l.galleryUID + "&pid=" + e;
                $n || Dn.hash.indexOf(n) === -1 && (An = !0);
                var i = Dn.href.split("#")[0] + "#" + n;
                jn ? "#" + n !== window.location.hash && history[$n ? "replaceState" : "pushState"]("", document.title, i) : $n ? Dn.replace(i) : Dn.hash = n, $n = !0, wn = setTimeout(function() {
                    Tn = !1
                }, 60)
            };
        Se("History", {
            publicMethods: {
                initHistory: function() {
                    if (o.extend(l, On, !0), l.history) {
                        Dn = window.location, An = !1, En = !1, $n = !1, Sn = In(), jn = "pushState" in history, Sn.indexOf("gid=") > -1 && (Sn = Sn.split("&gid=")[0], Sn = Sn.split("?gid=")[0]), Ae("afterChange", r.updateURL), Ae("unbindEvents", function() {
                            o.unbind(window, "hashchange", r.onHashChange)
                        });
                        var e = function() {
                            Cn = !0, En || (An ? history.back() : Sn ? Dn.hash = Sn : jn ? history.pushState("", document.title, Dn.pathname + Dn.search) : Dn.hash = ""), Ln()
                        };
                        Ae("unbindEvents", function() {
                            d && e()
                        }), Ae("destroy", function() {
                            Cn || e()
                        }), Ae("firstUpdate", function() {
                            p = Mn().pid
                        });
                        var t = Sn.indexOf("pid=");
                        t > -1 && (Sn = Sn.substring(0, t), "&" === Sn.slice(-1) && (Sn = Sn.slice(0, -1))), setTimeout(function() {
                            c && o.bind(window, "hashchange", r.onHashChange)
                        }, 40)
                    }
                },
                onHashChange: function() {
                    return In() === Sn ? (En = !0, void r.close()) : void(Tn || (kn = !0, r.goTo(Mn().pid), kn = !1))
                },
                updateURL: function() {
                    Ln(), kn || ($n ? bn = setTimeout(Pn, 800) : Pn())
                }
            }
        }), o.extend(r, ot)
    };
    return e
}), ! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.PhotoSwipeUI_Default = t()
}(this, function() {
    "use strict";
    var e = function(e, t) {
        var n, i, o, r, s, a, l, c, u, d, p, f, h, m, v, g, y, b, w, x = this,
            T = !1,
            k = !0,
            C = !0,
            S = {
                barsSize: {
                    top: 44,
                    bottom: "auto"
                },
                closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                timeToIdle: 4e3,
                timeToIdleOutside: 1e3,
                loadingIndicatorDelay: 1e3,
                addCaptionHTMLFn: function(e, t) {
                    return e.title ? (t.children[0].innerHTML = e.title, !0) : (t.children[0].innerHTML = "", !1)
                },
                closeEl: !0,
                captionEl: !0,
                fullscreenEl: !0,
                zoomEl: !0,
                shareEl: !0,
                counterEl: !0,
                arrowEl: !0,
                preloaderEl: !0,
                tapToClose: !1,
                tapToToggleControls: !0,
                clickToCloseNonZoomable: !0,
                shareButtons: [{
                    id: "facebook",
                    label: "Share on Facebook",
                    url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                }, {
                    id: "twitter",
                    label: "Tweet",
                    url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                }, {
                    id: "pinterest",
                    label: "Pin it",
                    url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                }, {
                    id: "download",
                    label: "Download image",
                    url: "{{raw_image_url}}",
                    download: !0
                }],
                getImageURLForShare: function() {
                    return e.currItem.src || ""
                },
                getPageURLForShare: function() {
                    return window.location.href
                },
                getTextForShare: function() {
                    return e.currItem.title || ""
                },
                indexIndicatorSep: " / ",
                fitControlsWidth: 1200
            },
            $ = function(e) {
                if (g) return !0;
                e = e || window.event, v.timeToIdle && v.mouseUsed && !u && _();
                for (var n, i, o = e.target || e.srcElement, r = o.getAttribute("class") || "", s = 0; s < U.length; s++) n = U[s], n.onTap && r.indexOf("pswp__" + n.name) > -1 && (n.onTap(), i = !0);
                if (i) {
                    e.stopPropagation && e.stopPropagation(), g = !0;
                    var a = t.features.isOldAndroid ? 600 : 30;
                    y = setTimeout(function() {
                        g = !1
                    }, a)
                }
            },
            E = function() {
                return !e.likelyTouchDevice || v.mouseUsed || screen.width > v.fitControlsWidth
            },
            A = function(e, n, i) {
                t[(i ? "add" : "remove") + "Class"](e, "pswp__" + n)
            },
            D = function() {
                var e = 1 === v.getNumItemsFn();
                e !== m && (A(i, "ui--one-slide", e), m = e)
            },
            j = function() {
                A(l, "share-modal--hidden", C)
            },
            O = function() {
                return C = !C, C ? (t.removeClass(l, "pswp__share-modal--fade-in"), setTimeout(function() {
                    C && j()
                }, 300)) : (j(), setTimeout(function() {
                    C || t.addClass(l, "pswp__share-modal--fade-in")
                }, 30)), C || L(), !1
            },
            I = function(t) {
                t = t || window.event;
                var n = t.target || t.srcElement;
                return e.shout("shareLinkClick", t, n), !(!n.href || !n.hasAttribute("download") && (window.open(n.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), C || O(), 1))
            },
            L = function() {
                for (var e, t, n, i, o, r = "", s = 0; s < v.shareButtons.length; s++) e = v.shareButtons[s], n = v.getImageURLForShare(e), i = v.getPageURLForShare(e), o = v.getTextForShare(e), t = e.url.replace("{{url}}", encodeURIComponent(i)).replace("{{image_url}}", encodeURIComponent(n)).replace("{{raw_image_url}}", n).replace("{{text}}", encodeURIComponent(o)), r += '<a href="' + t + '" target="_blank" class="pswp__share--' + e.id + '"' + (e.download ? "download" : "") + ">" + e.label + "</a>", v.parseShareButtonOut && (r = v.parseShareButtonOut(e, r));
                l.children[0].innerHTML = r, l.children[0].onclick = I
            },
            M = function(e) {
                for (var n = 0; n < v.closeElClasses.length; n++)
                    if (t.hasClass(e, "pswp__" + v.closeElClasses[n])) return !0
            },
            P = 0,
            _ = function() {
                clearTimeout(w), P = 0, u && x.setIdle(!1)
            },
            N = function(e) {
                e = e ? e : window.event;
                var t = e.relatedTarget || e.toElement;
                t && "HTML" !== t.nodeName || (clearTimeout(w), w = setTimeout(function() {
                    x.setIdle(!0)
                }, v.timeToIdleOutside))
            },
            H = function() {
                v.fullscreenEl && !t.features.isOldAndroid && (n || (n = x.getFullscreenAPI()), n ? (t.bind(document, n.eventK, x.updateFullscreen), x.updateFullscreen(), t.addClass(e.template, "pswp--supports-fs")) : t.removeClass(e.template, "pswp--supports-fs"))
            },
            F = function() {
                v.preloaderEl && (q(!0), d("beforeChange", function() {
                    clearTimeout(h), h = setTimeout(function() {
                        e.currItem && e.currItem.loading ? (!e.allowProgressiveImg() || e.currItem.img && !e.currItem.img.naturalWidth) && q(!1) : q(!0)
                    }, v.loadingIndicatorDelay)
                }), d("imageLoadComplete", function(t, n) {
                    e.currItem === n && q(!0)
                }))
            },
            q = function(e) {
                f !== e && (A(p, "preloader--active", !e), f = e)
            },
            R = function(e) {
                var n = e.vGap;
                if (E()) {
                    var s = v.barsSize;
                    if (v.captionEl && "auto" === s.bottom)
                        if (r || (r = t.createEl("pswp__caption pswp__caption--fake"), r.appendChild(t.createEl("pswp__caption__center")), i.insertBefore(r, o), t.addClass(i, "pswp__ui--fit")), v.addCaptionHTMLFn(e, r, !0)) {
                            var a = r.clientHeight;
                            n.bottom = parseInt(a, 10) || 44
                        } else n.bottom = s.top;
                    else n.bottom = "auto" === s.bottom ? 0 : s.bottom;
                    n.top = s.top
                } else n.top = n.bottom = 0
            },
            z = function() {
                v.timeToIdle && d("mouseUsed", function() {
                    t.bind(document, "mousemove", _), t.bind(document, "mouseout", N), b = setInterval(function() {
                        P++, 2 === P && x.setIdle(!0)
                    }, v.timeToIdle / 2)
                })
            },
            W = function() {
                d("onVerticalDrag", function(e) {
                    k && e < .95 ? x.hideControls() : !k && e >= .95 && x.showControls()
                });
                var e;
                d("onPinchClose", function(t) {
                    k && t < .9 ? (x.hideControls(), e = !0) : e && !k && t > .9 && x.showControls()
                }), d("zoomGestureEnded", function() {
                    e = !1, e && !k && x.showControls()
                })
            },
            U = [{
                name: "caption",
                option: "captionEl",
                onInit: function(e) {
                    o = e
                }
            }, {
                name: "share-modal",
                option: "shareEl",
                onInit: function(e) {
                    l = e
                },
                onTap: function() {
                    O()
                }
            }, {
                name: "button--share",
                option: "shareEl",
                onInit: function(e) {
                    a = e
                },
                onTap: function() {
                    O()
                }
            }, {
                name: "button--zoom",
                option: "zoomEl",
                onTap: e.toggleDesktopZoom
            }, {
                name: "counter",
                option: "counterEl",
                onInit: function(e) {
                    s = e
                }
            }, {
                name: "button--close",
                option: "closeEl",
                onTap: e.close
            }, {
                name: "button--arrow--left",
                option: "arrowEl",
                onTap: e.prev
            }, {
                name: "button--arrow--right",
                option: "arrowEl",
                onTap: e.next
            }, {
                name: "button--fs",
                option: "fullscreenEl",
                onTap: function() {
                    n.isFullscreen() ? n.exit() : n.enter()
                }
            }, {
                name: "preloader",
                option: "preloaderEl",
                onInit: function(e) {
                    p = e
                }
            }],
            B = function() {
                var e, n, o, r = function(i) {
                    if (i)
                        for (var r = i.length, s = 0; s < r; s++) {
                            e = i[s], n = e.className;
                            for (var a = 0; a < U.length; a++) o = U[a], n.indexOf("pswp__" + o.name) > -1 && (v[o.option] ? (t.removeClass(e, "pswp__element--disabled"), o.onInit && o.onInit(e)) : t.addClass(e, "pswp__element--disabled"))
                        }
                };
                r(i.children);
                var s = t.getChildByClass(i, "pswp__top-bar");
                s && r(s.children)
            };
        x.init = function() {
            t.extend(e.options, S, !0), v = e.options, i = t.getChildByClass(e.scrollWrap, "pswp__ui"), d = e.listen, W(), d("beforeChange", x.update), d("doubleTap", function(t) {
                var n = e.currItem.initialZoomLevel;
                e.getZoomLevel() !== n ? e.zoomTo(n, t, 333) : e.zoomTo(v.getDoubleTapZoom(!1, e.currItem), t, 333)
            }), d("preventDragEvent", function(e, t, n) {
                var i = e.target || e.srcElement;
                i && i.getAttribute("class") && e.type.indexOf("mouse") > -1 && (i.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(i.tagName)) && (n.prevent = !1)
            }), d("bindEvents", function() {
                t.bind(i, "pswpTap click", $), t.bind(e.scrollWrap, "pswpTap", x.onGlobalTap), e.likelyTouchDevice || t.bind(e.scrollWrap, "mouseover", x.onMouseOver)
            }), d("unbindEvents", function() {
                C || O(), b && clearInterval(b), t.unbind(document, "mouseout", N), t.unbind(document, "mousemove", _), t.unbind(i, "pswpTap click", $), t.unbind(e.scrollWrap, "pswpTap", x.onGlobalTap), t.unbind(e.scrollWrap, "mouseover", x.onMouseOver), n && (t.unbind(document, n.eventK, x.updateFullscreen), n.isFullscreen() && (v.hideAnimationDuration = 0, n.exit()), n = null)
            }), d("destroy", function() {
                v.captionEl && (r && i.removeChild(r), t.removeClass(o, "pswp__caption--empty")), l && (l.children[0].onclick = null), t.removeClass(i, "pswp__ui--over-close"), t.addClass(i, "pswp__ui--hidden"), x.setIdle(!1)
            }), v.showAnimationDuration || t.removeClass(i, "pswp__ui--hidden"), d("initialZoomIn", function() {
                v.showAnimationDuration && t.removeClass(i, "pswp__ui--hidden")
            }), d("initialZoomOut", function() {
                t.addClass(i, "pswp__ui--hidden")
            }), d("parseVerticalMargin", R), B(), v.shareEl && a && l && (C = !0), D(), z(), H(), F()
        }, x.setIdle = function(e) {
            u = e, A(i, "ui--idle", e)
        }, x.update = function() {
            k && e.currItem ? (x.updateIndexIndicator(), v.captionEl && (v.addCaptionHTMLFn(e.currItem, o), A(o, "caption--empty", !e.currItem.title)), T = !0) : T = !1, C || O(), D()
        }, x.updateFullscreen = function(i) {
            i && setTimeout(function() {
                e.setScrollOffset(0, t.getScrollY())
            }, 50), t[(n.isFullscreen() ? "add" : "remove") + "Class"](e.template, "pswp--fs")
        }, x.updateIndexIndicator = function() {
            v.counterEl && (s.innerHTML = e.getCurrentIndex() + 1 + v.indexIndicatorSep + v.getNumItemsFn())
        }, x.onGlobalTap = function(n) {
            n = n || window.event;
            var i = n.target || n.srcElement;
            if (!g)
                if (n.detail && "mouse" === n.detail.pointerType) {
                    if (M(i)) return void e.close();
                    t.hasClass(i, "pswp__img") && (1 === e.getZoomLevel() && e.getZoomLevel() <= e.currItem.fitRatio ? v.clickToCloseNonZoomable && e.close() : e.toggleDesktopZoom(n.detail.releasePoint))
                } else if (v.tapToToggleControls && (k ? x.hideControls() : x.showControls()), v.tapToClose && (t.hasClass(i, "pswp__img") || M(i))) return void e.close()
        }, x.onMouseOver = function(e) {
            e = e || window.event;
            var t = e.target || e.srcElement;
            A(i, "ui--over-close", M(t))
        }, x.hideControls = function() {
            t.addClass(i, "pswp__ui--hidden"), k = !1
        }, x.showControls = function() {
            k = !0, T || x.update(), t.removeClass(i, "pswp__ui--hidden")
        }, x.supportsFullscreen = function() {
            var e = document;
            return !!(e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen || e.msExitFullscreen)
        }, x.getFullscreenAPI = function() {
            var t, n = document.documentElement,
                i = "fullscreenchange";
            return n.requestFullscreen ? t = {
                enterK: "requestFullscreen",
                exitK: "exitFullscreen",
                elementK: "fullscreenElement",
                eventK: i
            } : n.mozRequestFullScreen ? t = {
                enterK: "mozRequestFullScreen",
                exitK: "mozCancelFullScreen",
                elementK: "mozFullScreenElement",
                eventK: "moz" + i
            } : n.webkitRequestFullscreen ? t = {
                enterK: "webkitRequestFullscreen",
                exitK: "webkitExitFullscreen",
                elementK: "webkitFullscreenElement",
                eventK: "webkit" + i
            } : n.msRequestFullscreen && (t = {
                enterK: "msRequestFullscreen",
                exitK: "msExitFullscreen",
                elementK: "msFullscreenElement",
                eventK: "MSFullscreenChange"
            }), t && (t.enter = function() {
                return c = v.closeOnScroll, v.closeOnScroll = !1, "webkitRequestFullscreen" !== this.enterK ? e.template[this.enterK]() : void e.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
            }, t.exit = function() {
                return v.closeOnScroll = c, document[this.exitK]()
            }, t.isFullscreen = function() {
                return document[this.elementK]
            }), t
        }
    };
    return e
}), ! function(e) {
    "use strict";
    var t = "kinetic-active";
    window.requestAnimationFrame || (window.requestAnimationFrame = function() {
        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
            window.setTimeout(e, 1e3 / 60)
        }
    }()), e.support = e.support || {}, e.extend(e.support, {
        touch: "ontouchend" in document
    });
    var n = function() {
            return !1
        },
        i = function(t, n) {
            return this.settings = n, this.el = t, this.$el = e(t), this._initElements(), this
        };
    i.DATA_KEY = "kinetic", i.DEFAULTS = {
        cursor: "move",
        decelerate: !0,
        triggerHardware: !1,
        threshold: 0,
        y: !0,
        x: !0,
        slowdown: .9,
        maxvelocity: 40,
        throttleFPS: 60,
        movingClass: {
            up: "kinetic-moving-up",
            down: "kinetic-moving-down",
            left: "kinetic-moving-left",
            right: "kinetic-moving-right"
        },
        deceleratingClass: {
            up: "kinetic-decelerating-up",
            down: "kinetic-decelerating-down",
            left: "kinetic-decelerating-left",
            right: "kinetic-decelerating-right"
        }
    }, i.prototype.start = function(t) {
        this.settings = e.extend(this.settings, t), this.velocity = t.velocity || this.velocity, this.velocityY = t.velocityY || this.velocityY, this.settings.decelerate = !1, this._move()
    }, i.prototype.end = function() {
        this.settings.decelerate = !0
    }, i.prototype.stop = function() {
        this.velocity = 0, this.velocityY = 0, this.settings.decelerate = !0, e.isFunction(this.settings.stopped) && this.settings.stopped.call(this)
    }, i.prototype.detach = function() {
        this._detachListeners(), this.$el.removeClass(t).css("cursor", "")
    }, i.prototype.attach = function() {
        this.$el.hasClass(t) || (this._attachListeners(this.$el), this.$el.addClass(t).css("cursor", this.settings.cursor))
    }, i.prototype._initElements = function() {
        this.$el.addClass(t), e.extend(this, {
            xpos: null,
            prevXPos: !1,
            ypos: null,
            prevYPos: !1,
            mouseDown: !1,
            throttleTimeout: 1e3 / this.settings.throttleFPS,
            lastMove: null,
            elementFocused: null
        }), this.velocity = 0, this.velocityY = 0, e(document).mouseup(e.proxy(this._resetMouse, this)).click(e.proxy(this._resetMouse, this)), this._initEvents(), this.$el.css("cursor", this.settings.cursor), this.settings.triggerHardware && this.$el.css({
            "-webkit-transform": "translate3d(0,0,0)",
            "-webkit-perspective": "1000",
            "-webkit-backface-visibility": "hidden"
        })
    }, i.prototype._initEvents = function() {
        var t = this;
        this.settings.events = {
            touchStart: function(e) {
                var n;
                t._useTarget(e.target, e) && (n = e.originalEvent.touches[0], t.threshold = t._threshold(e.target, e), t._start(n.clientX, n.clientY), e.stopPropagation())
            },
            touchMove: function(e) {
                var n;
                t.mouseDown && (n = e.originalEvent.touches[0], t._inputmove(n.clientX, n.clientY), e.preventDefault && e.preventDefault())
            },
            inputDown: function(e) {
                t._useTarget(e.target, e) && (t.threshold = t._threshold(e.target, e), t._start(e.clientX, e.clientY), t.elementFocused = e.target, "IMG" === e.target.nodeName && e.preventDefault(), e.stopPropagation())
            },
            inputEnd: function(e) {
                t._useTarget(e.target, e) && (t._end(), t.elementFocused = null, e.preventDefault && e.preventDefault())
            },
            inputMove: function(e) {
                t.mouseDown && (t._inputmove(e.clientX, e.clientY), e.preventDefault && e.preventDefault())
            },
            scroll: function(n) {
                e.isFunction(t.settings.moved) && t.settings.moved.call(t, t.settings), n.preventDefault && n.preventDefault()
            },
            inputClick: function(e) {
                return Math.abs(t.velocity) > 0 ? (e.preventDefault(), !1) : void 0
            },
            dragStart: function(e) {
                return (!t._useTarget(e.target, e) || !t.elementFocused) && void 0
            }
        }, this._attachListeners(this.$el, this.settings)
    }, i.prototype._inputmove = function(t, n) {
        var i = this.$el;
        if (this.el, (!this.lastMove || new Date > new Date(this.lastMove.getTime() + this.throttleTimeout)) && (this.lastMove = new Date, this.mouseDown && (this.xpos || this.ypos))) {
            var o = t - this.xpos,
                r = n - this.ypos;
            if (this.threshold > 0) {
                var s = Math.sqrt(o * o + r * r);
                if (this.threshold > s) return;
                this.threshold = 0
            }
            this.elementFocused && (e(this.elementFocused).blur(), this.elementFocused = null, i.focus()), this.settings.decelerate = !1, this.velocity = this.velocityY = 0;
            var a = this.scrollLeft(),
                l = this.scrollTop();
            this.scrollLeft(this.settings.x ? a - o : a), this.scrollTop(this.settings.y ? l - r : l), this.prevXPos = this.xpos, this.prevYPos = this.ypos, this.xpos = t, this.ypos = n, this._calculateVelocities(), this._setMoveClasses(this.settings.movingClass), e.isFunction(this.settings.moved) && this.settings.moved.call(this, this.settings)
        }
    }, i.prototype._calculateVelocities = function() {
        this.velocity = this._capVelocity(this.prevXPos - this.xpos, this.settings.maxvelocity), this.velocityY = this._capVelocity(this.prevYPos - this.ypos, this.settings.maxvelocity)
    }, i.prototype._end = function() {
        this.xpos && this.prevXPos && this.settings.decelerate === !1 && (this.settings.decelerate = !0, this._calculateVelocities(), this.xpos = this.prevXPos = this.mouseDown = !1, this._move())
    }, i.prototype._useTarget = function(t, n) {
        return !e.isFunction(this.settings.filterTarget) || this.settings.filterTarget.call(this, t, n) !== !1
    }, i.prototype._threshold = function(t, n) {
        return e.isFunction(this.settings.threshold) ? this.settings.threshold.call(this, t, n) : this.settings.threshold
    }, i.prototype._start = function(e, t) {
        this.mouseDown = !0, this.velocity = this.prevXPos = 0, this.velocityY = this.prevYPos = 0, this.xpos = e, this.ypos = t
    }, i.prototype._resetMouse = function() {
        this.xpos = !1, this.ypos = !1, this.mouseDown = !1
    }, i.prototype._decelerateVelocity = function(e, t) {
        return 0 === Math.floor(Math.abs(e)) ? 0 : e * t
    }, i.prototype._capVelocity = function(e, t) {
        var n = e;
        return e > 0 ? e > t && (n = t) : 0 - t > e && (n = 0 - t), n
    }, i.prototype._setMoveClasses = function(e) {
        var t = this.settings,
            n = this.$el;
        n.removeClass(t.movingClass.up).removeClass(t.movingClass.down).removeClass(t.movingClass.left).removeClass(t.movingClass.right).removeClass(t.deceleratingClass.up).removeClass(t.deceleratingClass.down).removeClass(t.deceleratingClass.left).removeClass(t.deceleratingClass.right), this.velocity > 0 && n.addClass(e.right), this.velocity < 0 && n.addClass(e.left), this.velocityY > 0 && n.addClass(e.down), this.velocityY < 0 && n.addClass(e.up)
    }, i.prototype._move = function() {
        var t = (this.$el, this.el),
            n = this,
            i = n.settings;
        i.x && t.scrollWidth > 0 ? (this.scrollLeft(this.scrollLeft() + this.velocity), Math.abs(this.velocity) > 0 && (this.velocity = i.decelerate ? n._decelerateVelocity(this.velocity, i.slowdown) : this.velocity)) : this.velocity = 0, i.y && t.scrollHeight > 0 ? (this.scrollTop(this.scrollTop() + this.velocityY), Math.abs(this.velocityY) > 0 && (this.velocityY = i.decelerate ? n._decelerateVelocity(this.velocityY, i.slowdown) : this.velocityY)) : this.velocityY = 0, n._setMoveClasses(i.deceleratingClass), e.isFunction(i.moved) && i.moved.call(this, i), Math.abs(this.velocity) > 0 || Math.abs(this.velocityY) > 0 ? this.moving || (this.moving = !0, window.requestAnimationFrame(function() {
            n.moving = !1, n._move()
        })) : n.stop()
    }, i.prototype._getScroller = function() {
        var t = this.$el;
        return (this.$el.is("body") || this.$el.is("html")) && (t = e(window)), t
    }, i.prototype.scrollLeft = function(e) {
        var t = this._getScroller();
        return "number" != typeof e ? t.scrollLeft() : (t.scrollLeft(e), void(this.settings.scrollLeft = e))
    }, i.prototype.scrollTop = function(e) {
        var t = this._getScroller();
        return "number" != typeof e ? t.scrollTop() : (t.scrollTop(e), void(this.settings.scrollTop = e))
    }, i.prototype._attachListeners = function() {
        var t = this.$el,
            i = this.settings;
        e.support.touch && t.bind("touchstart", i.events.touchStart).bind("touchend", i.events.inputEnd).bind("touchmove", i.events.touchMove), t.mousedown(i.events.inputDown).mouseup(i.events.inputEnd).mousemove(i.events.inputMove), t.click(i.events.inputClick).scroll(i.events.scroll).bind("selectstart", n).bind("dragstart", i.events.dragStart)
    }, i.prototype._detachListeners = function() {
        var t = this.$el,
            i = this.settings;
        e.support.touch && t.unbind("touchstart", i.events.touchStart).unbind("touchend", i.events.inputEnd).unbind("touchmove", i.events.touchMove), t.unbind("mousedown", i.events.inputDown).unbind("mouseup", i.events.inputEnd).unbind("mousemove", i.events.inputMove), t.unbind("click", i.events.inputClick).unbind("scroll", i.events.scroll).unbind("selectstart", n).unbind("dragstart", i.events.dragStart)
    }, e.Kinetic = i, e.fn.kinetic = function(t, n) {
        return this.each(function() {
            var o = e(this),
                r = o.data(i.DATA_KEY),
                s = e.extend({}, i.DEFAULTS, o.data(), "object" == typeof t && t);
            r || o.data(i.DATA_KEY, r = new i(this, s)), "string" == typeof t && r[t](n)
        })
    }
}(window.jQuery || window.Zepto), ! function(e) {
    "use strict";

    function t(e, n) {
        if (!(this instanceof t)) {
            var i = new t(e, n);
            return i.open(), i
        }
        this.id = t.id++, this.setup(e, n), this.chainCallbacks(t._callbackChain)
    }

    function n(e, t) {
        var n = {};
        for (var i in e) i in t && (n[i] = e[i], delete e[i]);
        return n
    }

    function i(e, t) {
        var n = {},
            i = new RegExp("^" + t + "([A-Z])(.*)");
        for (var o in e) {
            var r = o.match(i);
            if (r) {
                var s = (r[1] + r[2].replace(/([A-Z])/g, "-$1")).toLowerCase();
                n[s] = e[o]
            }
        }
        return n
    }
    if ("undefined" == typeof e) return void("console" in window && window.console.info("Too much lightness, Featherlight needs jQuery."));
    if (e.fn.jquery.match(/-ajax/)) return void("console" in window && window.console.info("Featherlight needs regular jQuery, not the slim version."));
    var o = [],
        r = function(t) {
            return o = e.grep(o, function(e) {
                return e !== t && e.$instance.closest("body").length > 0
            })
        },
        s = {
            allow: 1,
            allowfullscreen: 1,
            frameborder: 1,
            height: 1,
            longdesc: 1,
            marginheight: 1,
            marginwidth: 1,
            mozallowfullscreen: 1,
            name: 1,
            referrerpolicy: 1,
            sandbox: 1,
            scrolling: 1,
            src: 1,
            srcdoc: 1,
            style: 1,
            webkitallowfullscreen: 1,
            width: 1
        },
        a = {
            keyup: "onKeyUp",
            resize: "onResize"
        },
        l = function(n) {
            e.each(t.opened().reverse(), function() {
                return n.isDefaultPrevented() || !1 !== this[a[n.type]](n) ? void 0 : (n.preventDefault(), n.stopPropagation(), !1)
            })
        },
        c = function(n) {
            if (n !== t._globalHandlerInstalled) {
                t._globalHandlerInstalled = n;
                var i = e.map(a, function(e, n) {
                    return n + "." + t.prototype.namespace
                }).join(" ");
                e(window)[n ? "on" : "off"](i, l)
            }
        };
    t.prototype = {
        constructor: t,
        namespace: "featherlight",
        targetAttr: "data-featherlight",
        variant: null,
        resetCss: !1,
        background: null,
        openTrigger: "click",
        closeTrigger: "click",
        filter: null,
        root: "body",
        openSpeed: 250,
        closeSpeed: 250,
        closeOnClick: "background",
        closeOnEsc: !0,
        closeIcon: "&#10005;",
        loading: "",
        persist: !1,
        otherClose: null,
        beforeOpen: e.noop,
        beforeContent: e.noop,
        beforeClose: e.noop,
        afterOpen: e.noop,
        afterContent: e.noop,
        afterClose: e.noop,
        onKeyUp: e.noop,
        onResize: e.noop,
        type: null,
        contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
        setup: function(t, n) {
            "object" != typeof t || t instanceof e != 0 || n || (n = t, t = void 0);
            var i = e.extend(this, n, {
                    target: t
                }),
                o = i.resetCss ? i.namespace + "-reset" : i.namespace,
                r = e(i.background || ['<div class="' + o + "-loading " + o + '">', '<div class="' + o + '-content">', '<button class="' + o + "-close-icon " + i.namespace + '-close" aria-label="Close">', i.closeIcon, "</button>", '<div class="' + i.namespace + '-inner">' + i.loading + "</div>", "</div>", "</div>"].join("")),
                s = "." + i.namespace + "-close" + (i.otherClose ? "," + i.otherClose : "");
            return i.$instance = r.clone().addClass(i.variant), i.$instance.on(i.closeTrigger + "." + i.namespace, function(t) {
                if (!t.isDefaultPrevented()) {
                    var n = e(t.target);
                    ("background" === i.closeOnClick && n.is("." + i.namespace) || "anywhere" === i.closeOnClick || n.closest(s).length) && (i.close(t), t.preventDefault())
                }
            }), this
        },
        getContent: function() {
            if (this.persist !== !1 && this.$content) return this.$content;
            var t = this,
                n = this.constructor.contentFilters,
                i = function(e) {
                    return t.$currentTarget && t.$currentTarget.attr(e)
                },
                o = i(t.targetAttr),
                r = t.target || o || "",
                s = n[t.type];
            if (!s && r in n && (s = n[r], r = t.target && o), r = r || i("href") || "", !s)
                for (var a in n) t[a] && (s = n[a], r = t[a]);
            if (!s) {
                var l = r;
                if (r = null, e.each(t.contentFilters, function() {
                        return s = n[this], s.test && (r = s.test(l)), !r && s.regex && l.match && l.match(s.regex) && (r = l), !r
                    }), !r) return "console" in window && window.console.error("Featherlight: no content filter found " + (l ? ' for "' + l + '"' : " (no target specified)")), !1
            }
            return s.process.call(t, r)
        },
        setContent: function(t) {
            return this.$instance.removeClass(this.namespace + "-loading"), this.$instance.toggleClass(this.namespace + "-iframe", t.is("iframe")), this.$instance.find("." + this.namespace + "-inner").not(t).slice(1).remove().end().replaceWith(e.contains(this.$instance[0], t[0]) ? "" : t), this.$content = t.addClass(this.namespace + "-inner"), this
        },
        open: function(t) {
            var n = this;
            if (n.$instance.hide().appendTo(n.root), !(t && t.isDefaultPrevented() || n.beforeOpen(t) === !1)) {
                t && t.preventDefault();
                var i = n.getContent();
                if (i) return o.push(n), c(!0), n.$instance.fadeIn(n.openSpeed), n.beforeContent(t), e.when(i).always(function(e) {
                    n.setContent(e), n.afterContent(t)
                }).then(n.$instance.promise()).done(function() {
                    n.afterOpen(t)
                })
            }
            return n.$instance.detach(), e.Deferred().reject().promise()
        },
        close: function(t) {
            var n = this,
                i = e.Deferred();
            return n.beforeClose(t) === !1 ? i.reject() : (0 === r(n).length && c(!1), n.$instance.fadeOut(n.closeSpeed, function() {
                n.$instance.detach(), n.afterClose(t), i.resolve()
            })), i.promise()
        },
        resize: function(e, t) {
            if (e && t) {
                this.$content.css("width", "").css("height", "");
                var n = Math.max(e / (this.$content.parent().width() - 1), t / (this.$content.parent().height() - 1));
                n > 1 && (n = t / Math.floor(t / n), this.$content.css("width", "" + e / n + "px").css("height", "" + t / n + "px"))
            }
        },
        chainCallbacks: function(t) {
            for (var n in t) this[n] = e.proxy(t[n], this, e.proxy(this[n], this))
        }
    }, e.extend(t, {
        id: 0,
        autoBind: "[data-featherlight]",
        defaults: t.prototype,
        contentFilters: {
            jquery: {
                regex: /^[#.]\w/,
                test: function(t) {
                    return t instanceof e && t
                },
                process: function(t) {
                    return this.persist !== !1 ? e(t) : e(t).clone(!0)
                }
            },
            image: {
                regex: /\.(png|jpg|jpeg|gif|tiff?|bmp|svg)(\?\S*)?$/i,
                process: function(t) {
                    var n = this,
                        i = e.Deferred(),
                        o = new Image,
                        r = e('<img src="' + t + '" alt="" class="' + n.namespace + '-image" />');
                    return o.onload = function() {
                        r.naturalWidth = o.width, r.naturalHeight = o.height, i.resolve(r)
                    }, o.onerror = function() {
                        i.reject(r)
                    }, o.src = t, i.promise()
                }
            },
            html: {
                regex: /^\s*<[\w!][^<]*>/,
                process: function(t) {
                    return e(t)
                }
            },
            ajax: {
                regex: /./,
                process: function(t) {
                    var n = e.Deferred(),
                        i = e("<div></div>").load(t, function(e, t) {
                            "error" !== t && n.resolve(i.contents()), n.fail()
                        });
                    return n.promise()
                }
            },
            iframe: {
                process: function(t) {
                    var o = new e.Deferred,
                        r = e("<iframe/>"),
                        a = i(this, "iframe"),
                        l = n(a, s);
                    return r.hide().attr("src", t).attr(l).css(a).on("load", function() {
                        o.resolve(r.show())
                    }).appendTo(this.$instance.find("." + this.namespace + "-content")), o.promise()
                }
            },
            text: {
                process: function(t) {
                    return e("<div>", {
                        text: t
                    })
                }
            }
        },
        functionAttributes: ["beforeOpen", "afterOpen", "beforeContent", "afterContent", "beforeClose", "afterClose"],
        readElementConfig: function(t, n) {
            var i = this,
                o = new RegExp("^data-" + n + "-(.*)"),
                r = {};
            return t && t.attributes && e.each(t.attributes, function() {
                var t = this.name.match(o);
                if (t) {
                    var n = this.value,
                        s = e.camelCase(t[1]);
                    if (e.inArray(s, i.functionAttributes) >= 0) n = new Function(n);
                    else try {
                        n = JSON.parse(n)
                    } catch (a) {}
                    r[s] = n
                }
            }), r
        },
        extend: function(t, n) {
            var i = function() {
                this.constructor = t
            };
            return i.prototype = this.prototype, t.prototype = new i, t.__super__ = this.prototype, e.extend(t, this, n), t.defaults = t.prototype, t
        },
        attach: function(t, n, i) {
            var o = this;
            "object" != typeof n || n instanceof e != 0 || i || (i = n, n = void 0), i = e.extend({}, i);
            var r, s = i.namespace || o.defaults.namespace,
                a = e.extend({}, o.defaults, o.readElementConfig(t[0], s), i),
                l = function(s) {
                    var l = e(s.currentTarget),
                        c = e.extend({
                            $source: t,
                            $currentTarget: l
                        }, o.readElementConfig(t[0], a.namespace), o.readElementConfig(s.currentTarget, a.namespace), i),
                        u = r || l.data("featherlight-persisted") || new o(n, c);
                    "shared" === u.persist ? r = u : u.persist !== !1 && l.data("featherlight-persisted", u), c.$currentTarget.blur && c.$currentTarget.blur(), u.open(s)
                };
            return t.on(a.openTrigger + "." + a.namespace, a.filter, l), {
                filter: a.filter,
                handler: l
            }
        },
        current: function() {
            var e = this.opened();
            return e[e.length - 1] || null
        },
        opened: function() {
            var t = this;
            return r(), e.grep(o, function(e) {
                return e instanceof t
            })
        },
        close: function(e) {
            var t = this.current();
            return t ? t.close(e) : void 0
        },
        _onReady: function() {
            var t = this;
            if (t.autoBind) {
                var n = e(t.autoBind);
                n.each(function() {
                    t.attach(e(this))
                }), e(document).on("click", t.autoBind, function(i) {
                    if (!i.isDefaultPrevented()) {
                        var o = e(i.currentTarget),
                            r = n.length;
                        if (n = n.add(o), r !== n.length) {
                            var s = t.attach(o);
                            (!s.filter || e(i.target).parentsUntil(o, s.filter).length > 0) && s.handler(i)
                        }
                    }
                })
            }
        },
        _callbackChain: {
            onKeyUp: function(t, n) {
                return 27 === n.keyCode ? (this.closeOnEsc && e.featherlight.close(n), !1) : t(n)
            },
            beforeOpen: function(t, n) {
                return e(document.documentElement).addClass("with-featherlight"), this._previouslyActive = document.activeElement, this._$previouslyTabbable = e("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")), this._$previouslyWithTabIndex = e("[tabindex]").not('[tabindex="-1"]'), this._previousWithTabIndices = this._$previouslyWithTabIndex.map(function(t, n) {
                    return e(n).attr("tabindex")
                }), this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex", -1), document.activeElement.blur && document.activeElement.blur(), t(n)
            },
            afterClose: function(n, i) {
                var o = n(i),
                    r = this;
                return this._$previouslyTabbable.removeAttr("tabindex"), this._$previouslyWithTabIndex.each(function(t, n) {
                    e(n).attr("tabindex", r._previousWithTabIndices[t])
                }), this._previouslyActive.focus(), 0 === t.opened().length && e(document.documentElement).removeClass("with-featherlight"), o
            },
            onResize: function(e, t) {
                return this.resize(this.$content.naturalWidth, this.$content.naturalHeight), e(t)
            },
            afterContent: function(e, t) {
                var n = e(t);
                return this.$instance.find("[autofocus]:not([disabled])").focus(), this.onResize(t), n
            }
        }
    }), e.featherlight = t, e.fn.featherlight = function(e, n) {
        return t.attach(this, e, n), this
    }, e(document).ready(function() {
        t._onReady()
    })
}(jQuery), window.addEventListener("DOMContentLoaded", function() {
    "use strict";

    function getUrlParameter(e) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var t = new RegExp("[\\?&]" + e + "=([^&#]*)"),
            n = t.exec(location.search);
        return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
    }

    function removeParam(e) {
        var t, n = window.location.href,
            i = n.split("?")[0],
            o = [],
            r = n.indexOf("?") !== -1 ? n.split("?")[1] : "";
        if ("" !== r) {
            o = r.split("&");
            for (var s = o.length - 1; s >= 0; s -= 1) t = o[s].split("=")[0], t === e && o.splice(s, 1);
            i = i + "?" + o.join("&")
        }
        return i
    }

    function isMobile() {
        return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || window.opera)
    }

    function evaluateCodeAfterFormSubmission(codeString) {
        if (codeString && 0 !== codeString.length) try {
            eval(codeString)
        } catch (e) {
            console.error('⚠️ Your "after form submission" JS code has failed to execute.'), console.error("The code: "), console.info(codeString), console.error("The error message: "), console.info(e)
        }
    }

    function redirectAfterFormSubmission(e, t, n, i) {
        if (void 0 !== e && e.length > 0) {
            var o = e;
            o.indexOf(".") !== -1 && o.indexOf("http://") === -1 && o.indexOf("https://") === -1 && (o = "http://" + o), "True" === n && (o = o.indexOf("?") !== -1 ? o + "&" + i : o + "?" + i), window.open(o, "True" === t ? "_blank" : "_self")
        }
    }
    window.unicornplatform = {},
        function() {
            isMobile() ? $("body").addClass("body--mobile") : $("body").addClass("body--desktop")
        }();
    var message = function() {
        function e(e, t) {
            t && e.find(".js-error-message-text").text(t), e.addClass("state-visible")
        }

        function t(e) {
            for (var t = e.length, n = 0; n < t; n++) e[n].removeClass("state-visible"), i(e[n])
        }

        function n(e) {
            e.addClass("state-reacted"), e.find(".js-react-on-message").attr("disabled", "disabled")
        }

        function i(e) {
            e.removeClass("state-reacted"), e.find(".js-react-on-message").removeAttr("disabled")
        }

        function o(e) {
            var t = e.parents(".js-message");
            n(t);
            var i = e.text(),
                o = t.find(".js-reaction-text");
            o.text(i)
        }

        function r() {
            $(document).on("click", ".js-react-on-message", function(e) {
                e.preventDefault(), o($(this))
            })
        }

        function s() {
            $(document).on("click", ".js-open-engaging-message", function(t) {
                t.preventDefault();
                var n = $(this).attr("data-index"),
                    i = $('.js-engaging-message[data-index="' + n + '"]');
                e(i)
            })
        }

        function a() {
            $(document).on("click", ".js-close-message", function(e) {
                e.preventDefault();
                var n = $(this).parents(".js-message");
                t([n])
            })
        }

        function l() {
            s(), r(), a()
        }
        return {
            show: e,
            hide: t,
            init: l
        }
    }();
    message.init();
    var button = function() {
            function e(e) {
                e.addClass("state-show-success-tick")
            }

            function t(e) {
                e.removeClass("state-show-success-tick")
            }

            function n(e) {
                e.attr("disabled", "disabled")
            }

            function i(e) {
                e.removeAttr("disabled")
            }

            function o(e) {
                e.addClass("state-show-spinner")
            }

            function r(e) {
                e.removeClass("state-show-spinner")
            }
            return {
                showSuccessTick: e,
                removeSuccessTick: t,
                disableSubmit: n,
                enableSubmit: i,
                showSpinner: o,
                stopSpinner: r
            }
        }(),
        submitNoIntegrationForm = function() {
            var e = function() {
                function e(e) {
                    function t() {
                        message.show(o, "The form is not connected to any integration.")
                    }
                    var n = e.find(".js-engaging-message"),
                        i = e.find(".js-success-message"),
                        o = e.find(".js-error-message"),
                        r = e.find(".js-submit-button"),
                        s = e.find(".js-form-input");
                    e.attr("success-redirect");
                    e.on("submit", function(e) {
                        e.preventDefault(), t($(this))
                    }), s.on("keypress", "", function(e) {
                        if (13 === e.which) return r.trigger("click"), !1
                    }), s.on("focus", "", function(e) {
                        e.preventDefault(), message.hide([i, n, o])
                    }).on("blur", "", function(e) {
                        e.preventDefault()
                    })
                }
                for (var t = $(".js-no-integration-form"), n = t.length, i = 0; i < n; i++) {
                    var o = t.eq(i);
                    e(o)
                }
            };
            return {
                init: e
            }
        }();
    submitNoIntegrationForm.init(), window.unicornplatform.subscribeMailchimpForm = function() {
        var e = function() {
            function e(e) {
                function t() {
                    function t(e) {
                        var t = "";
                        return t = e.replace(/post\?u=/i, "post-json?u="), t += "&c=?"
                    }
                    button.showSpinner(r), button.disableSubmit(r), $.ajax({
                        type: e.attr("method"),
                        url: t(e.attr("action")),
                        data: e.serialize(),
                        cache: !1,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    }).done(function(t) {
                        "success" != t.result ? (message.hide([i, n, o]), message.show(o, t.msg), button.stopSpinner(r), button.enableSubmit(r)) : (message.hide([i, n, o]), button.showSuccessTick(r), setTimeout(function() {
                            button.stopSpinner(r)
                        }, 200), setTimeout(function() {
                            button.removeSuccessTick(r), button.enableSubmit(r)
                        }, 3e3), evaluateCodeAfterFormSubmission(u), redirectAfterFormSubmission(a, l, c, e.serialize()))
                    }).fail(function(e) {
                        button.stopSpinner(r), button.enableSubmit(r), message.hide([i, n, o]), message.show(o, "Uh. We could not connect to the server. Please try again later."), console.log(e)
                    }).always(function(e) {})
                }
                var n = e.find(".js-engaging-message"),
                    i = e.find(".js-success-message"),
                    o = e.find(".js-error-message"),
                    r = e.find(".js-submit-button"),
                    s = e.find(".js-form-input"),
                    a = e.attr("data-redirect-url"),
                    l = e.attr("data-redirect-target-blank"),
                    c = e.attr("data-pass-values-redirect"),
                    u = e.attr("data-success-code");
                e.on("submit", function(e) {
                    e.preventDefault(), t($(this))
                }), s.on("keypress", "", function(e) {
                    if (13 === e.which) return r.trigger("click"), !1
                }), s.on("focus", "", function(e) {
                    e.preventDefault(), message.hide([i, n, o])
                }).on("blur", "", function(e) {
                    e.preventDefault()
                })
            }
            for (var t = $(".js-subscribe-mailchimp-form"), n = t.length, i = 0; i < n; i++) {
                var o = t.eq(i);
                e(o)
            }
        };
        return {
            init: e
        }
    }(), window.unicornplatform.subscribeMailchimpForm.init(), window.unicornplatform.subscribeZapierForm = function() {
        var e = function() {
            function e(e) {
                function t() {
                    button.showSpinner(r), button.disableSubmit(r), $.ajax({
                        type: "GET",
                        url: e.attr("action"),
                        data: e.serialize(),
                        cache: !1,
                        dataType: "json"
                    }).done(function(t) {
                        "success" !== t.status ? (message.hide([i, n, o]), message.show(o, "There is an unknown error. We are so sorry!"), button.stopSpinner(r), button.enableSubmit(r)) : (message.hide([i, n, o]), button.showSuccessTick(r), setTimeout(function() {
                            button.stopSpinner(r)
                        }, 200), setTimeout(function() {
                            button.removeSuccessTick(r), button.enableSubmit(r)
                        }, 3e3), evaluateCodeAfterFormSubmission(u), redirectAfterFormSubmission(a, l, c, e.serialize()))
                    }).fail(function(e) {
                        button.stopSpinner(r), button.enableSubmit(r), message.hide([i, n, o]), message.show(o, "Uh. We could not connect to the server. Please try again later."), console.log(e)
                    }).always(function(e) {})
                }
                var n = e.find(".js-engaging-message"),
                    i = e.find(".js-success-message"),
                    o = e.find(".js-error-message"),
                    r = e.find(".js-submit-button"),
                    s = e.find(".js-form-input"),
                    a = e.attr("data-redirect-url"),
                    l = e.attr("data-redirect-target-blank"),
                    c = e.attr("data-pass-values-redirect"),
                    u = e.attr("data-success-code");
                e.on("submit", function(e) {
                    e.preventDefault(), t($(this))
                }), s.on("keypress", "", function(e) {
                    if (13 === e.which) return r.trigger("click"), !1
                }), s.on("focus", "", function(e) {
                    e.preventDefault(), message.hide([i, n, o])
                }).on("blur", "", function(e) {
                    e.preventDefault()
                })
            }
            for (var t = $(".js-subscribe-zapier-form"), n = t.length, i = 0; i < n; i++) {
                var o = t.eq(i);
                e(o)
            }
        };
        return {
            init: e
        }
    }(), window.unicornplatform.subscribeZapierForm.init(), window.unicornplatform.subscribeGoogleSheetForm = function() {
        var e = function() {
            function e(e) {
                function t() {
                    button.showSpinner(r), button.disableSubmit(r), $.ajax({
                        type: "POST",
                        url: e.attr("action"),
                        data: e.serialize() + "&SHEET_ID=" + c,
                        cache: !1,
                        dataType: "json"
                    }).done(function(t) {
                        "success" !== t.status ? (message.hide([i, n, o]), message.show(o, "There is an unknown error. We are so sorry!"), button.stopSpinner(r), button.enableSubmit(r)) : (message.hide([i, n, o]), button.showSuccessTick(r), setTimeout(function() {
                            button.stopSpinner(r)
                        }, 200), setTimeout(function() {
                            button.removeSuccessTick(r), button.enableSubmit(r)
                        }, 3e3), evaluateCodeAfterFormSubmission(d), redirectAfterFormSubmission(a, l, u, e.serialize()))
                    }).fail(function(e) {
                        button.stopSpinner(r), button.enableSubmit(r), message.hide([i, n, o]), message.show(o, "Uh. We could not connect to the server. Please try again later."), console.log(e)
                    }).always(function(e) {})
                }
                var n = e.find(".js-engaging-message"),
                    i = e.find(".js-success-message"),
                    o = e.find(".js-error-message"),
                    r = e.find(".js-submit-button"),
                    s = e.find(".js-form-input"),
                    a = e.attr("data-redirect-url"),
                    l = e.attr("data-redirect-target-blank"),
                    c = e.attr("data-sheet-id"),
                    u = e.attr("data-pass-values-redirect"),
                    d = e.attr("data-success-code");
                e.on("submit", function(e) {
                    e.preventDefault(), t($(this))
                }), s.on("keypress", "", function(e) {
                    if (13 === e.which) return r.trigger("click"), !1
                }), s.on("focus", "", function(e) {
                    e.preventDefault(), message.hide([i, n, o])
                }).on("blur", "", function(e) {
                    e.preventDefault()
                })
            }
            for (var t = $(".js-subscribe-google-sheet-form"), n = t.length, i = 0; i < n; i++) {
                var o = t.eq(i);
                e(o)
            }
        };
        return {
            init: e
        }
    }(), window.unicornplatform.subscribeGoogleSheetForm.init(), window.unicornplatform.roadmapScroll = function() {
        function e() {
            function e() {
                var e = 700;
                isMobile() && (e = 150);
                var t = $(".js-roadmap-item"),
                    n = t.length * (t.eq(0).width() + 60) + e;
                $(".js-roadmap-box").css("width", n)
            }
            var t = $("#js-roadmap-wrapper");
            t.length > 0 && (e(), isMobile() || t.kinetic({
                maxvelocity: 30
            }))
        }
        return {
            init: e
        }
    }(), window.unicornplatform.roadmapScroll.init(), window.unicornplatform.slider = function() {
        function e() {
            for (var e = $(".js-slider"), t = e.length, n = "", i = 0; i < t; i++) {
                n = e.eq(i);
                var o = JSON.parse(n.attr("data-slider-config")),
                    r = n.parent().find(".js-prev-arrow"),
                    s = n.parent().find(".js-next-arrow");
                r.length > 0 && s.length > 0 ? (o.prevArrow = r, o.nextArrow = s) : o.arrows = !1, n.hasClass("slick-initialized") || n.slick(o)
            }
        }
        return {
            init: e
        }
    }(), window.unicornplatform.slider.init(), window.unicornplatform.tabs = function() {
        function e(e) {
            for (var t = e.find(".js-tab-content-item"), n = 0, i = 0, o = t.length, r = 0; r < o; r++) i = t.eq(r).outerHeight(), i > n && (n = i);
            n > 20 && e.css({
                height: n
            })
        }

        function t() {
            for (var t = 0; t < s; t++) e(r.eq(t))
        }

        function n() {
            function n() {
                var e = !1,
                    n = 350;
                window.addEventListener("resize", function() {
                    clearTimeout(e), e = setTimeout(t, n)
                })
            }

            function i() {
                function t() {
                    var t = $(".js-tabs-item-list.state-loaded"),
                        i = t.length;
                    if (i === s) clearInterval(n);
                    else
                        for (var o = $(".js-tabs-item-list:not(.state-loaded)"), r = o.length, a = 0; a < r; a++) {
                            for (var l = o.eq(a), c = l.find(".js-tab-content-item"), u = c.length, d = 0; d < u; d++) {
                                var p = c.eq(d),
                                    f = p.find("img");
                                if (0 === f.length) p.addClass("state-loaded");
                                else if (p.hasClass("state-loaded") === !1) {
                                    var h = f[0].complete;
                                    h && p.addClass("state-loaded")
                                }
                            }
                            var m = l.find(".js-tab-content-item.state-loaded").length;
                            u === m && (l.addClass("state-loaded"), e(l))
                        }
                }
                var n = setInterval(t, 500)
            }
            t(), n(), i()
        }

        function i() {
            $(document).on("click", ".js-open-tab", function(e) {
                if (e.preventDefault(), $(this).hasClass("state-active-tab")) return !1;
                var t = $(this).attr("data-index"),
                    n = $(this).attr("data-group"),
                    i = $('.js-open-tab[data-group="' + n + '"]');
                i.removeClass("state-active-tab"), $(this).addClass("state-active-tab");
                var o = $('.js-tab-content[data-group="' + n + '"]');
                o.removeClass("state-active-tab");
                var r = $('.js-tab-content[data-group="' + n + '"][data-index="' + t + '"]');
                r.addClass("state-active-tab")
            })
        }

        function o() {
            r = $(".js-tabs-item-list"), s = r.length, s > 0 && n(), i()
        }
        var r, s;
        return {
            init: o,
            setAll: t
        }
    }(), window.unicornplatform.tabs.init();
    var showContentOnClick = function() {
        function e() {
            $(document).on("mouseenter", ".js-hover-to-show-sibling", function(e) {
                e.preventDefault();
                var t = $(this).siblings(".js-content-to-show");
                t.addClass("state-visible")
            }), $(document).on("mouseleave", ".js-hover-to-show-sibling", function(e) {
                e.preventDefault();
                var t = $(this).siblings(".js-content-to-show");
                t.removeClass("state-visible")
            })
        }
        return {
            bind: e
        }
    }();
    showContentOnClick.bind();
    var clipboard = new ClipboardJS(".js-copy-text");
    clipboard.on("success", function(e) {
        var t = $(e.trigger);
        button.showSuccessTick(t), button.disableSubmit(t), setTimeout(function() {
            button.removeSuccessTick(t), button.enableSubmit(t)
        }, 3e3)
    }), clipboard.on("error", function(e) {
        console.error("Copy action error: ", e.action), console.error("Trigger:", e.trigger)
    });
    var faqToggle = function() {
        function e() {
            $(document).on("click", ".js-open-faq", function(e) {
                e.preventDefault(), $(this).find(".js-faq-item").slideToggle(200), $(this).toggleClass("state-active")
            }), $(document).on("click", ".js-open-faq a", function(e) {
                e.stopPropagation()
            })
        }

        function t() {
            e()
        }
        return {
            init: t
        }
    }();
    faqToggle.init();
    var openMenu = function() {
        function e(e, t) {
            e.addClass("state-opened-menu"), t.addClass("state-active-burger"), i.addClass("state-fixed-body")
        }

        function t(e, t) {
            e.removeClass("state-opened-menu"), t.removeClass("state-active-burger"), i.removeClass("state-fixed-body")
        }

        function n() {
            $(document).on("click", ".js-open-menu", function(n) {
                n.preventDefault();
                var i = $(this).parents(".js-menu");
                $(this).hasClass("state-active-burger") ? t(i, $(this)) : e(i, $(this))
            })
        }
        var i = $("body");
        return {
            bind: n,
            close: t
        }
    }();
    openMenu.bind();
    var scrollDown = function() {
        function e() {
            $(document).on("click", ".js-scroll-down", function(e) {
                e.preventDefault();
                var t = $(this).parents(".js-scroll-this-box"),
                    n = t.outerHeight(),
                    i = t.position().top,
                    o = n + i;
                $("html, body").animate({
                    scrollTop: o
                }, 450)
            })
        }
        return {
            bind: e
        }
    }();
    scrollDown.bind();
    var highlightHeadingWord = function() {
        function e() {
            $(".js-scroll-down").addClass("state-active")
        }
        return {
            init: e
        }
    }();
    highlightHeadingWord.init();
    var interactions = function() {
        function e() {
            $(document).on("click", ".js-toggle-animation", function(e) {
                e.preventDefault(), $(this).toggleClass("state-active-animation")
            })
        }
        return {
            bind: e
        }
    }();
    interactions.bind();
    var lightbox = function() {
        function e() {
            $(document).on("click", ".js-lightbox-single-image", function(e) {
                e.preventDefault();
                var n = document.querySelectorAll(".pswp")[0],
                    i = $(this).attr("src"),
                    o = $(this).attr("data-height"),
                    r = $(this).attr("data-width"),
                    s = [{
                        src: i,
                        w: r,
                        h: o
                    }],
                    a = {
                        index: 0,
                        closeEl: !0,
                        captionEl: !0,
                        fullscreenEl: !1,
                        zoomEl: !1,
                        shareEl: !1,
                        counterEl: !1,
                        arrowEl: !0,
                        preloaderEl: !0
                    };
                t = new PhotoSwipe(n, PhotoSwipeUI_Default, s, a), t.init()
            })
        }
        var t;
        return {
            bind: e
        }
    }();
    lightbox.bind();
    var scrollTo = function() {
        function e() {
            $(document).on("click", 'a[href^="#"]:not([href="#"]), a[href^="/#"]:not([href="/#"]), .js-scroll-to-id', function(e) {
                var t = $(this).attr("href");
                if ("/" !== window.location.pathname && t.indexOf("/#") !== -1);
                else {
                    e.preventDefault();
                    var n = "";
                    n = "#" + t.split("#")[1];
                    var i = $(n),
                        o = i.offset().top;
                    $("html, body").animate({
                        scrollTop: o
                    }, 400);
                    var r = $(".js-menu.state-opened-menu"),
                        s = $(".js-open-menu.state-active-burger");
                    r.length > 0 && s.length > 0 && openMenu.close(r, s)
                }
            })
        }
        return {
            init: e
        }
    }();
    scrollTo.init();
    var showError = function() {
        function e(e) {
            void 0 !== e && $(".js-form-error-message").text(e), $(".js-form-error-box").addClass("state-visible")
        }

        function t() {
            var e = getUrlParameter("error_message");
            e.length > 0 && ($(".js-form-error-box").addClass("state-visible"), $(".js-form-error-message").text(e))
        }
        return {
            showManually: e,
            showAutomatically: t
        }
    }();
    showError.showAutomatically(), window.unicornplatform.stripeCheckout = function() {
        function e() {
            $(document).on("click", "[data-stripe-product-id]", function(e) {
                if (void 0 !== window.Stripe && void 0 !== window.stripe_public_api_key && "" !== window.stripe_public_api_key) {
                    var t = $(this),
                        n = t.attr("data-stripe-product-id"),
                        i = t.attr("data-successful-payment-url"),
                        o = t.attr("data-cancel-payment-url");
                    if ("" !== i && void 0 !== i || (i = window.location.href + "?popup_id=successful_payment"), "" !== o && void 0 !== o || (o = window.location.href + "?popup_id=cancelled_payment"), n && "" !== n) {
                        e.preventDefault();
                        var r = Stripe(window.stripe_public_api_key),
                            s = n.split("_")[0],
                            a = [{
                                quantity: 1
                            }];
                        if ("plan" === s ? a[0].plan = n : "sku" === s ? a[0].sku = n : "price" === s ? a[0].price = n : console.error("A message for the website owner: there has been a mistake in setting up your Stripe integration. Please contact the Unicorn Platform support crew."), "price" === s) {
                            var l = t.attr("data-stripe-mode");
                            r.redirectToCheckout({
                                lineItems: a,
                                mode: l,
                                successUrl: i,
                                cancelUrl: o
                            }).then(function(e) {
                                e.error && alert('The purchase ended up with an error: "' + e.error.message + '" We are sorry.')
                            })
                        } else r.redirectToCheckout({
                            items: a,
                            successUrl: i,
                            cancelUrl: o
                        }).then(function(e) {
                            e.error && alert('The purchase ended up with an error: "' + e.error.message + '" We are sorry.')
                        })
                    }
                }
            })
        }
        return {
            bind: e
        }
    }(), window.unicornplatform.stripeCheckout.bind();
    var popup = function() {
        function e() {
            var e = {
                Title: document.title,
                Url: removeParam("popup_id")
            };
            history.pushState(e, e.Title, e.Url)
        }

        function t(e) {
            var t = $("#" + e),
                n = t;
            return 0 === t.length && (n = $("#no_such_popup")), n
        }

        function n() {
            var e = getUrlParameter("popup_id");
            e && "" !== e && $.featherlight(t(e), o)
        }

        function i() {
            $(document).on("click", ".js-open-popup", function(e) {
                e.preventDefault();
                var n = $(this).attr("data-popup-id");
                $(this).featherlight(t(n), o)
            })
        }
        var o = {
            openSpeed: 150,
            closeSpeed: 50,
            loading: "",
            afterClose: e
        };
        return {
            openOnPageLoad: n,
            bind: i
        }
    }();
    popup.openOnPageLoad(), popup.bind()
});
var widgets = function() {
    function e() {
        var e = $(".js-widget");
        if (e.length > 0) {
            var t = e.attr("id"),
                n = "unicorn-widget-" + t;
            "hidden" !== localStorage[n] && setTimeout(function() {
                e.toggleClass("state-visible")
            }, 2e3)
        }
    }

    function t() {
        $(document).on("click", ".js-close-widget", function(e) {
            e.preventDefault();
            var t = $(this).attr("data-widget-id");
            $("#" + t).toggleClass("state-visible");
            var n = "unicorn-widget-" + t;
            localStorage[n] = "hidden"
        })
    }
    return {
        bindClose: t,
        bindInit: e
    }
}();
widgets.bindClose(), widgets.bindInit();