define("js/common/music/lib/aspect.js", function (t, r) {
    function i(t, r, i, a) {
        for (var c, o, f = r.split(s); c = f.shift();)o = e(this, c), o.__isAspected || n.call(this, c), this.on(t + ":" + c, i, a);
        return this
    }

    function e(t, r) {
        var i = t[r];
        if (!i)throw new Error("Invalid method name: " + r);
        return i
    }

    function n(t) {
        var r = this[t];
        this[t] = function () {
            var i = Array.prototype.slice.call(arguments), e = ["before:" + t].concat(i);
            if (this.trigger.apply(this, e) !== !1) {
                var n = r.apply(this, arguments), s = ["after:" + t, n].concat(i);
                return this.trigger.apply(this, s), n
            }
        }, this[t].__isAspected = !0
    }

    r.before = function (t, r, e) {
        return i.call(this, "before", t, r, e)
    }, r.after = function (t, r, e) {
        return i.call(this, "after", t, r, e)
    };
    var s = /\s+/
});
;define("js/common/music/lib/attribute.js", function (t, r) {
    function e(t) {
        return "[object String]" === j.call(t)
    }

    function n(t) {
        return "[object Function]" === j.call(t)
    }

    function i(t) {
        return null != t && t == t.window
    }

    function o(t) {
        if (!t || "[object Object]" !== j.call(t) || t.nodeType || i(t))return !1;
        try {
            if (t.constructor && !w.call(t, "constructor") && !w.call(t.constructor.prototype, "isPrototypeOf"))return !1
        } catch (r) {
            return !1
        }
        var e;
        if (O)for (e in t)return w.call(t, e);
        for (e in t);
        return void 0 === e || w.call(t, e)
    }

    function a(t) {
        if (!t || "[object Object]" !== j.call(t) || t.nodeType || i(t) || !t.hasOwnProperty)return !1;
        for (var r in t)if (t.hasOwnProperty && t.hasOwnProperty(r))return !1;
        return !0
    }

    function c(t, r) {
        var e, n;
        for (e in r)if (r.hasOwnProperty(e)) {
            if (n = r[e], d(n)) n = n.slice(); else if (o(n)) {
                var i = t[e];
                o(i) || (i = {}), n = c(i, n)
            }
            t[e] = n
        }
        return t
    }

    function s(t, r, e) {
        for (var n = [], i = r.constructor.prototype; i;)i.hasOwnProperty("attrs") || (i.attrs = {}), f(e, i.attrs, i), a(i.attrs) || n.unshift(i.attrs), i = i.constructor.superclass;
        for (var o = 0, s = n.length; s > o; o++)c(t, g(n[o]))
    }

    function u(t, r) {
        c(t, g(r, !0))
    }

    function f(t, r, e, n) {
        for (var i = 0, o = t.length; o > i; i++) {
            var a = t[i];
            e.hasOwnProperty(a) && (r[a] = n ? r.get(a) : e[a])
        }
    }

    function l(t, r) {
        for (var e in r)if (r.hasOwnProperty(e)) {
            var i, o = r[e].value;
            n(o) && (i = e.match(P)) && (t[i[1]](h(i[2]), o), delete r[e])
        }
    }

    function h(t) {
        var r = t.match(_), e = r[1] ? "change:" : "";
        return e += r[2].toLowerCase() + r[3]
    }

    function v(t, r, e) {
        var n = {silent: !0};
        t.__initializingAttrs = !0;
        for (var i in e)e.hasOwnProperty(i) && r[i].setter && t.set(i, e[i], n);
        delete t.__initializingAttrs
    }

    function g(t, r) {
        var e = {};
        for (var n in t) {
            var i = t[n];
            e[n] = !r && o(i) && p(i, m) ? i : {value: i}
        }
        return e
    }

    function p(t, r) {
        for (var e = 0, n = r.length; n > e; e++)if (t.hasOwnProperty(r[e]))return !0;
        return !1
    }

    function y(t) {
        return null == t || (e(t) || d(t)) && 0 === t.length || a(t)
    }

    function b(t, r) {
        if (t === r)return !0;
        if (y(t) && y(r))return !0;
        var e = j.call(t);
        if (e != j.call(r))return !1;
        switch (e) {
            case"[object String]":
                return t == String(r);
            case"[object Number]":
                return t != +t ? r != +r : 0 == t ? 1 / t == 1 / r : t == +r;
            case"[object Date]":
            case"[object Boolean]":
                return +t == +r;
            case"[object RegExp]":
                return t.source == r.source && t.global == r.global && t.multiline == r.multiline && t.ignoreCase == r.ignoreCase;
            case"[object Array]":
                var n = t.toString(), i = r.toString();
                return -1 === n.indexOf("[object") && -1 === i.indexOf("[object") && n === i
        }
        if ("object" != typeof t || "object" != typeof r)return !1;
        if (o(t) && o(r)) {
            if (!b(A(t), A(r)))return !1;
            for (var a in t)if (t[a] !== r[a])return !1;
            return !0
        }
        return !1
    }

    r.initAttrs = function (t) {
        var r = this.attrs = {}, e = this.propsInAttrs || [];
        s(r, this, e), t && u(r, t), v(this, r, t), l(this, r), f(e, this, r, !0)
    }, r.get = function (t) {
        var r = this.attrs[t] || {}, e = r.value;
        return r.getter ? r.getter.call(this, e, t) : e
    }, r.set = function (t, r, n) {
        var i = {};
        e(t) ? i[t] = r : (i = t, n = r), n || (n = {});
        var a = n.silent, s = n.override, u = this.attrs, f = this.__changedAttrs || (this.__changedAttrs = {});
        for (t in i)if (i.hasOwnProperty(t)) {
            var l = u[t] || (u[t] = {});
            if (r = i[t], l.readOnly)throw new Error("This attribute is readOnly: " + t);
            l.setter && (r = l.setter.call(this, r, t));
            var h = this.get(t);
            !s && o(h) && o(r) && (r = c(c({}, h), r)), u[t].value = r, this.__initializingAttrs || !u[t].forceChange && b(h, r) || (a ? f[t] = [r, h] : this.trigger("change:" + t, r, h, t))
        }
        return this
    }, r.change = function () {
        var t = this.__changedAttrs;
        if (t) {
            for (var r in t)if (t.hasOwnProperty(r)) {
                var e = t[r];
                this.trigger("change:" + r, e[0], e[1], r)
            }
            delete this.__changedAttrs
        }
        return this
    }, r._isPlainObject = o;
    var O, j = Object.prototype.toString, w = Object.prototype.hasOwnProperty;
    !function () {
        function t() {
            this.x = 1
        }

        var r = [];
        t.prototype = {valueOf: 1, y: 1};
        for (var e in new t)r.push(e);
        O = "x" !== r[0]
    }();
    var d = Array.isArray || function (t) {
            return "[object Array]" === j.call(t)
        }, A = Object.keys;
    A || (A = function (t) {
        var r = [];
        for (var e in t)t.hasOwnProperty(e) && r.push(e);
        return r
    });
    var P = /^(on|before|after)([A-Z].*)$/, _ = /^(Change)?([A-Z])(.*)/, m = ["value", "getter", "setter", "readOnly"]
});
;define("js/common/music/lib/base.js", function (s, t, i) {
    function n(s, t) {
        for (var i in t)if (t.hasOwnProperty(i)) {
            var n = "_onChange" + o(i);
            s[n] && s.on("change:" + i, s[n])
        }
    }

    function o(s) {
        return s.charAt(0).toUpperCase() + s.substring(1)
    }

    var e = s("js/common/music/lib/class.js"), r = s("js/common/music/lib/events.js"), c = s("js/common/music/lib/aspect.js"), a = s("js/common/music/lib/attribute.js");
    i.exports = e.create({
        Implements: [r, c, a], initialize: function (s) {
            this.initAttrs(s), n(this, this.attrs)
        }, destroy: function () {
            this.off();
            for (var s in this)this.hasOwnProperty(s) && delete this[s];
            this.destroy = function () {
            }
        }
    })
});
;define("js/common/music/lib/class.js", function (t, n, r) {
    function o(t) {
        return this instanceof o || !f(t) ? void 0 : e(t)
    }

    function i(t) {
        var n, r;
        for (n in t)r = t[n], o.Mutators.hasOwnProperty(n) ? o.Mutators[n].call(this, r) : this.prototype[n] = r
    }

    function e(t) {
        return t.extend = o.extend, t.implement = i, t
    }

    function s() {
    }

    function c(t, n, r) {
        for (var o in n)if (n.hasOwnProperty(o)) {
            if (r && -1 === h(r, o))continue;
            "prototype" !== o && (t[o] = n[o])
        }
    }

    r.exports = o, o.create = function (t, n) {
        function r() {
            t.apply(this, arguments), this.constructor === r && this.initialize && this.initialize.apply(this, arguments)
        }

        return f(t) || (n = t, t = null), n || (n = {}), t || (t = n.Extends || o), n.Extends = t, t !== o && c(r, t, t.StaticsWhiteList), i.call(r, n), e(r)
    }, o.extend = function (t) {
        return t || (t = {}), t.Extends = this, o.create(t)
    }, o.Mutators = {
        Extends: function (t) {
            var n = this.prototype, r = u(t.prototype);
            c(r, n), r.constructor = this, this.prototype = r, this.superclass = t.prototype
        }, Implements: function (t) {
            a(t) || (t = [t]);
            for (var n, r = this.prototype; n = t.shift();)c(r, n.prototype || n)
        }, Statics: function (t) {
            c(this, t)
        }
    };
    var u = Object.__proto__ ? function (t) {
            return {__proto__: t}
        } : function (t) {
            return s.prototype = t, new s
        }, p = Object.prototype.toString, a = Array.isArray || function (t) {
            return "[object Array]" === p.call(t)
        }, f = function (t) {
        return "[object Function]" === p.call(t)
    }, h = Array.prototype.indexOf ? function (t, n) {
            return t.indexOf(n)
        } : function (t, n) {
            for (var r = 0, o = t.length; o > r; r++)if (t[r] === n)return r;
            return -1
        }
});
;define("js/common/music/lib/events.js", function () {
    function t() {
    }

    function r(t, r, e, s) {
        var i;
        if (t)for (var n = 0, o = t.length; o > n; n += 2)i = t[n].apply(t[n + 1] || e, r), i === !1 && s.status && (s.status = !1)
    }

    var e = /\s+/;
    t.prototype.on = function (t, r, s) {
        var i, n, o;
        if (!r)return this;
        for (i = this.__events || (this.__events = {}), t = t.split(e); n = t.shift();)o = i[n] || (i[n] = []), o.push(r, s);
        return this
    }, t.prototype.off = function (t, r, i) {
        var n, o, f, u;
        if (!(n = this.__events))return this;
        if (!(t || r || i))return delete this.__events, this;
        for (t = t ? t.split(e) : s(n); o = t.shift();)if (f = n[o])if (r || i)for (u = f.length - 2; u >= 0; u -= 2)r && f[u] !== r || i && f[u + 1] !== i || f.splice(u, 2); else delete n[o];
        return this
    }, t.prototype.trigger = function (t) {
        var s, i, n, o, f, u, h = [], a = {status: !0};
        if (!(s = this.__events))return this;
        for (t = t.split(e), f = 1, u = arguments.length; u > f; f++)h[f - 1] = arguments[f];
        for (; i = t.shift();)(n = s.all) && (n = n.slice()), (o = s[i]) && (o = o.slice()), r(o, h, this, a), r(n, [i].concat(h), this, a);
        return a.status
    }, t.mixTo = function (r) {
        r = r.prototype || r;
        var e = t.prototype;
        for (var s in e)e.hasOwnProperty(s) && (r[s] = e[s])
    };
    var s = Object.keys;
    return s || (s = function (t) {
        var r = [];
        for (var e in t)t.hasOwnProperty(e) && r.push(e);
        return r
    }), t
});
;define("js/common/music/lib/position.js", function (e) {
    function t(e) {
        e = c(e) || {}, e.nodeType && (e = {element: e});
        var t = c(e.element) || d;
        if (1 !== t.nodeType)throw new Error("posObject.element is invalid.");
        var n = {element: t, x: e.x || 0, y: e.y || 0}, o = t === d || "VIEWPORT" === t._id;
        return n.offset = function () {
            return l ? {left: 0, top: 0} : o ? {
                        left: s(document).scrollLeft(),
                        top: s(document).scrollTop()
                    } : f(s(t)[0])
        }, n.size = function () {
            var e = o ? s(window) : s(t);
            return {width: e.outerWidth(), height: e.outerHeight()}
        }, n
    }

    function n(e) {
        e.x = o(e.x, e, "width"), e.y = o(e.y, e, "height")
    }

    function o(e, t, n) {
        if (e += "", e = e.replace(/px/gi, ""), /\D/.test(e) && (e = e.replace(/(?:top|left)/gi, "0%").replace(/center/gi, "50%").replace(/(?:bottom|right)/gi, "100%")), -1 !== e.indexOf("%") && (e = e.replace(/(\d+(?:\.\d+)?)%/gi, function (e, o) {
                return t.size()[n] * (o / 100)
            })), /[+\-*\/]/.test(e))try {
            e = new Function("return " + e)()
        } catch (o) {
            throw new Error("Invalid position value: " + e)
        }
        return r(e)
    }

    function i(e) {
        var t = e.offsetParent();
        t[0] === document.documentElement && (t = s(document.body)), a && t.css("zoom", 1);
        var n;
        return n = t[0] === document.body && "static" === t.css("position") ? {
                top: 0,
                left: 0
            } : f(t[0]), n.top += r(t.css("border-top-width")), n.left += r(t.css("border-left-width")), n
    }

    function r(e) {
        return parseFloat(e, 10) || 0
    }

    function c(e) {
        return s(e)[0]
    }

    function f(e) {
        var t = e.getBoundingClientRect(), n = document.documentElement;
        return {
            left: t.left + (window.pageXOffset || n.scrollLeft) - (n.clientLeft || document.body.clientLeft || 0),
            top: t.top + (window.pageYOffset || n.scrollTop) - (n.clientTop || document.body.clientTop || 0)
        }
    }

    var u = {}, d = {
        _id: "VIEWPORT",
        nodeType: 1
    }, s = e("js/common/music/jquery.js"), l = !1, p = (window.navigator.userAgent || "").toLowerCase(), a = -1 !== p.indexOf("msie 6");
    return u.pin = function (e, o) {
        e = t(e), o = t(o);
        var r = s(e.element);
        "fixed" !== r.css("position") || a ? (r.css("position", "absolute"), l = !1) : l = !0, n(e), n(o);
        var c = i(r), f = o.offset(), u = f.top + o.y - e.y - c.top, d = f.left + o.x - e.x - c.left;
        r.css({left: d, top: u})
    }, u.center = function (e, t, n) {
        u.pin({
            element: e,
            x: ("undefined" != typeof n ? n : 50) + "%",
            y: ("undefined" != typeof n ? n : 50) + "%"
        }, {element: t, x: ("undefined" != typeof n ? n : 50) + "%", y: ("undefined" != typeof n ? n : 50) + "%"})
    }, u.VIEWPORT = d, u
});
;define("js/common/music/ajax.js", function (e) {
    var t = e("js/common/music.js"), n = t.$, s = e("js/common/music/lib/base.js"), r = s.extend({
        attrs: {
            _tag: "XHR",
            _charset: "GB2312"
        },
        initialize: function (e, t, s, i, o, a, d) {
            t || (t = "_xhrInstence_" + (r.counter + 1));
            var c;
            return r.instance[t] instanceof r ? c = r.instance[t] : (c = r.instance[t] = this, r.counter++), c._name = t, c._nc = !!a, c._method = "string" != n.type(s) || "GET" != s.toUpperCase() ? "POST" : s = "GET", c._isAsync = o !== !1 ? !0 : o, c._uri = e, c._data = "object" == n.type(i) || "string" == n.type(i) ? i : {}, c._sender = null, c._isHeaderSetted = !1, c.data = {platform: "mac"}, this.onSuccess = function () {
            }, this.onError = function () {
            }, this.charset = d || "gb2312", this.proxyPath = "", this.startTime = +new Date, c
        },
        send: function () {
            if ("POST" == this._method && null == this._data)return !1;
            var e = new t.util.URI(this._uri);
            if (null == e)return !1;
            if (this._uri = e.href, "object" == n.type(this._data) && (this._data = r.genHttpParamString(this._data, this.charset)), "GET" == this._method && this._data && (this._uri += (this._uri.indexOf("?") < 0 ? "?" : "&") + this._data), e.host != location.host)return r.xsend(this, e);
            if (!this._sender) {
                var s;
                if (window.XMLHttpRequest) s = new XMLHttpRequest; else if (window.ActiveXObject)try {
                    !(s = new ActiveXObject("Msxml2.XMLHTTP")) && (s = new ActiveXObject("Microsoft.XMLHTTP"))
                } catch (i) {
                }
                if (!s)return !1;
                this._sender = s
            }
            try {
                this._sender.open(this._method, this._uri, this._isAsync)
            } catch (o) {
                return !1
            }
            return "POST" != this._method || this._isHeaderSetted || (this._sender.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), this._isHeaderSetted = !0), this._nc && (this._sender.setRequestHeader("If-Modified-Since", "Thu, 1 Jan 1970 00:00:00 GMT"), this._sender.setRequestHeader("Cache-Control", "no-cache")), this._sender.onreadystatechange = n.proxy(function () {
                try {
                    4 == this._sender.readyState && (this._sender.status >= 200 && this._sender.status < 300 ? this.onSuccess({
                            text: this._sender.responseText,
                            xmlDom: this._sender.responseXML
                        }) : "undefined" == n.type(this._sender.status) ? this.onError(r._errCodeMap[1002]) : this.onError(r._errCodeMap[this._sender.status]), delete this._sender, this._sender = null)
                } catch (e) {
                }
            }, this), this._sender.send("POST" == this._method ? this._data : void 0), !0
        },
        destroy: function () {
            var e = this._name;
            return delete r.instance[e]._sender, r.instance[e]._sender = null, delete r.instance[e], r.counter--, null
        },
        Statics: {
            instance: {},
            counter: 0,
            _errCodeMap: {
                400: {msg: "Bad Request"},
                401: {msg: "Unauthorized"},
                403: {msg: "Forbidden"},
                404: {msg: "Not Found"},
                999: {msg: "Proxy page error"},
                1e3: {msg: "Bad Response"},
                1001: {msg: "No Network"},
                1002: {msg: "No Data"},
                1003: {msg: "Eval Error"}
            },
            xsend: function (e, t) {
                if (!(e instanceof r))return !1;
                if (null === e._sender || void 0 === e._sender) {
                    var s = document.createElement("iframe");
                    s.id = "_xsend_frm_" + e._name, s.style.width = s.style.height = s.style.borderWidth = "0", document.body.appendChild(s), s.callback = n.proxy(function (t) {
                        e.resultArgs = arguments, e.onSuccess(t), r._clear(e)
                    }, e), s.errorCallback = n.proxy(function (t) {
                        e.resultArgs = [{code: t, subcode: t}], e.onError(r._errCodeMap[t]), r._clear(e)
                    }, e), e._sender = s
                }
                return e.GBEncoderPath = "//y.gtimg.cn/qzone/v5/toolpages/", e._sender.src = t.protocol + "://" + t.host + (e.proxyPath ? e.proxyPath : "gb2312" == e.charset.toLowerCase() ? "/xhr_proxy_gbk.html" : "/xhr_proxy_utf8.html"), !0
            },
            _clear: function (e) {
                try {
                    e._sender = e._sender.callback = e._sender.errorCallback = e._sender.onreadystatechange = null
                } catch (t) {
                }
                setTimeout(function () {
                    n("#_xsend_frm_" + e._name).remove()
                }, 50), e.endTime = +new Date, r._pluginsRunner("onRequestComplete", e), e.instanceForm = null
            },
            pluginsPool: {onErrorHandler: [], onRequestComplete: []},
            _pluginsRunner: function (e, t) {
                var n, s = r, i = s.pluginsPool[e], o = t;
                if (i && (n = i.length))for (var a = 0; n > a; ++a)"function" == typeof i[a] && (o = i[a](o));
                return o
            },
            genHttpParamString: function (e, t) {
                t = (t || "gb2312").toLowerCase();
                var n = [];
                for (var s in e)n.push(s + "=" + ("utf-8" == t ? encodeURIComponent(e[s]) : URIencode(e[s])));
                return n.join("&")
            }
        }
    });
    return t.XHR = r, r
});
;define("js/common/music/tips.js", function (i) {
    var n = i("js/common/music.js"), o = n.$, s = i("js/common/music/lib/base.js"), o = n.$;
    Position = i("js/common/music/lib/position.js"), guid = 0, isLoaded = !1;
    var t = s.extend({
        attrs: {
            tpl_outtips: "",
            class_icon_list: ["icon_popup_success", "icon_popup_warn", "icon_popup_note"]
        }, Statics: {
            fix_elem: function (i, n, o) {
                Position.center(i, n, o)
            }, guid: function (i) {
                return (i || "") + guid++
            }, getElementInBody: function (i, n) {
                var s = o("#" + i);
                s.length < 1 && o("<div id=" + i + "></div>").appendTo("body"), s = o("#" + i);
                for (var t in n)s.attr(t, n[t]);
                return s
            }
        }
    });
    return t
});
;define("js/common/music/json2.js", function (require, exports, module) {
    var JSON;
    JSON || (JSON = {}), function () {
        "use strict";
        function f(t) {
            return 10 > t ? "0" + t : t
        }

        function quote(t) {
            return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function (t) {
                    var e = meta[t];
                    return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + t + '"'
        }

        function str(t, e) {
            var n, r, o, f, u, i = gap, p = e[t];
            switch (p && "object" == typeof p && "function" == typeof p.toJSON && (p = p.toJSON(t)), "function" == typeof rep && (p = rep.call(e, t, p)), typeof p) {
                case"string":
                    return quote(p);
                case"number":
                    return isFinite(p) ? String(p) : "null";
                case"boolean":
                case"null":
                    return String(p);
                case"object":
                    if (!p)return "null";
                    if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(p)) {
                        for (f = p.length, n = 0; f > n; n += 1)u[n] = str(n, p) || "null";
                        return o = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + i + "]" : "[" + u.join(",") + "]", gap = i, o
                    }
                    if (rep && "object" == typeof rep)for (f = rep.length, n = 0; f > n; n += 1)"string" == typeof rep[n] && (r = rep[n], o = str(r, p), o && u.push(quote(r) + (gap ? ": " : ":") + o)); else for (r in p)Object.prototype.hasOwnProperty.call(p, r) && (o = str(r, p), o && u.push(quote(r) + (gap ? ": " : ":") + o));
                    return o = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + i + "}" : "{" + u.join(",") + "}", gap = i, o
            }
        }

        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function (t, e, n) {
            var r;
            if (gap = "", indent = "", "number" == typeof n)for (r = 0; n > r; r += 1)indent += " "; else"string" == typeof n && (indent = n);
            if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length))throw new Error("JSON.stringify");
            return str("", {"": t})
        }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
            function walk(t, e) {
                var n, r, o = t[e];
                if (o && "object" == typeof o)for (n in o)Object.prototype.hasOwnProperty.call(o, n) && (r = walk(o, n), void 0 !== r ? o[n] = r : delete o[n]);
                return reviver.call(t, e, o)
            }

            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (t) {
                    return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }()
});
;define("js/common/music/jstorage.js", function (e) {
    var t = e("js/common/music/jquery.js");
    !function (e) {
        "use strict";
        function t() {
            var e = !1;
            if ("localStorage" in window)try {
                window.localStorage.setItem("_tmptest", "tmpval"), e = !0, window.localStorage.removeItem("_tmptest")
            } catch (t) {
            }
            if (e)try {
                window.localStorage && (b = window.localStorage, T = "localStorage", O = b.jStorage_update)
            } catch (r) {
            } else if ("globalStorage" in window)try {
                window.globalStorage && (b = "localhost" == window.location.hostname ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname], T = "globalStorage", O = b.jStorage_update)
            } catch (n) {
            } else {
                if (y = document.createElement("link"), !y.addBehavior)return y = null, void 0;
                y.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(y);
                try {
                    y.load("jStorage")
                } catch (i) {
                    y.setAttribute("jStorage", "{}"), y.save("jStorage"), y.load("jStorage")
                }
                var s = "{}";
                try {
                    s = y.getAttribute("jStorage")
                } catch (g) {
                }
                try {
                    O = y.getAttribute("jStorage_update")
                } catch (c) {
                }
                b.jStorage = s, T = "userDataBehavior"
            }
            u(), _(), o(), l(), "addEventListener" in window && window.addEventListener("pageshow", function (e) {
                e.persisted && a()
            }, !1)
        }

        function r() {
            var e = "{}";
            if ("userDataBehavior" == T) {
                y.load("jStorage");
                try {
                    e = y.getAttribute("jStorage")
                } catch (t) {
                }
                try {
                    O = y.getAttribute("jStorage_update")
                } catch (r) {
                }
                b.jStorage = e
            }
            u(), _(), l()
        }

        function o() {
            "localStorage" == T || "globalStorage" == T ? "addEventListener" in window ? window.addEventListener("storage", function () {
                        a()
                    }, !1) : document.attachEvent("onstorage", function () {
                        a()
                    }) : "userDataBehavior" == T && setInterval(a, 1e3)
        }

        function a() {
            var e;
            clearTimeout(L), L = setTimeout(function () {
                if ("localStorage" == T || "globalStorage" == T) e = b.jStorage_update; else if ("userDataBehavior" == T) {
                    y.load("jStorage");
                    try {
                        e = y.getAttribute("jStorage_update")
                    } catch (t) {
                    }
                }
                e && e != O && (O = e, n())
            }, 25)
        }

        function n() {
            var e, t = m.parse(m.stringify(p.__jstorage_meta.CRC32));
            r(), e = m.parse(m.stringify(p.__jstorage_meta.CRC32));
            var o, a = [], n = [];
            for (o in t)if (t.hasOwnProperty(o)) {
                if (!e[o]) {
                    n.push(o);
                    continue
                }
                t[o] != e[o] && "2." == String(t[o]).substr(0, 2) && a.push(o)
            }
            for (o in e)e.hasOwnProperty(o) && (t[o] || a.push(o));
            i(a, "updated"), i(n, "deleted")
        }

        function i(e, t) {
            e = [].concat(e || []);
            var r, o, a, n;
            if ("flushed" == t) {
                e = [];
                for (var i in C)C.hasOwnProperty(i) && e.push(i);
                t = "deleted"
            }
            for (r = 0, a = e.length; a > r; r++) {
                if (C[e[r]])for (o = 0, n = C[e[r]].length; n > o; o++)C[e[r]][o](e[r], t);
                if (C["*"])for (o = 0, n = C["*"].length; n > o; o++)C["*"][o](e[r], t)
            }
        }

        function s() {
            var e = (+new Date).toString();
            if ("localStorage" == T || "globalStorage" == T)try {
                b.jStorage_update = e
            } catch (t) {
                T = !1
            } else"userDataBehavior" == T && (y.setAttribute("jStorage_update", e), y.save("jStorage"));
            a()
        }

        function u() {
            if (b.jStorage)try {
                p = m.parse(String(b.jStorage))
            } catch (e) {
                b.jStorage = "{}"
            } else b.jStorage = "{}";
            v = b.jStorage ? String(b.jStorage).length : 0, p.__jstorage_meta || (p.__jstorage_meta = {}), p.__jstorage_meta.CRC32 || (p.__jstorage_meta.CRC32 = {})
        }

        function g() {
            d();
            try {
                b.jStorage = m.stringify(p), y && (y.setAttribute("jStorage", b.jStorage), y.save("jStorage")), v = b.jStorage ? String(b.jStorage).length : 0
            } catch (e) {
            }
        }

        function c(e) {
            if ("string" != typeof e && "number" != typeof e)throw new TypeError("Key name must be string or numeric");
            if ("__jstorage_meta" == e)throw new TypeError("Reserved key name");
            return !0
        }

        function _() {
            var e, t, r, o, a = 1 / 0, n = !1, u = [];
            if (clearTimeout(w), p.__jstorage_meta && "object" == typeof p.__jstorage_meta.TTL) {
                e = +new Date, r = p.__jstorage_meta.TTL, o = p.__jstorage_meta.CRC32;
                for (t in r)r.hasOwnProperty(t) && (r[t] <= e ? (delete r[t], delete o[t], delete p[t], n = !0, u.push(t)) : r[t] < a && (a = r[t]));
                1 / 0 != a && (w = setTimeout(_, Math.min(a - e, 2147483647))), n && (g(), s(), i(u, "deleted"))
            }
        }

        function l() {
            var e, t;
            if (p.__jstorage_meta.PubSub) {
                var r, o = D, a = [];
                for (e = t = p.__jstorage_meta.PubSub.length - 1; e >= 0; e--)r = p.__jstorage_meta.PubSub[e], r[0] > D && (o = r[0], a.unshift(r));
                for (e = a.length - 1; e >= 0; e--)f(a[e][1], a[e][2]);
                D = o
            }
        }

        function f(e, t) {
            if (P[e])for (var r = 0, o = P[e].length; o > r; r++)try {
                P[e][r](e, m.parse(m.stringify(t)))
            } catch (a) {
            }
        }

        function d() {
            if (p.__jstorage_meta.PubSub) {
                for (var e = +new Date - 2e3, t = 0, r = p.__jstorage_meta.PubSub.length; r > t; t++)if (p.__jstorage_meta.PubSub[t][0] <= e) {
                    p.__jstorage_meta.PubSub.splice(t, p.__jstorage_meta.PubSub.length - t);
                    break
                }
                p.__jstorage_meta.PubSub.length || delete p.__jstorage_meta.PubSub
            }
        }

        function j(e, t) {
            p.__jstorage_meta || (p.__jstorage_meta = {}), p.__jstorage_meta.PubSub || (p.__jstorage_meta.PubSub = []), p.__jstorage_meta.PubSub.unshift([+new Date, e, t]), g(), s()
        }

        function S(e, t) {
            for (var r, o = e.length, a = t ^ o, n = 0; o >= 4;)r = 255 & e.charCodeAt(n) | (255 & e.charCodeAt(++n)) << 8 | (255 & e.charCodeAt(++n)) << 16 | (255 & e.charCodeAt(++n)) << 24, r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16), r ^= r >>> 24, r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16), a = 1540483477 * (65535 & a) + ((1540483477 * (a >>> 16) & 65535) << 16) ^ r, o -= 4, ++n;
            switch (o) {
                case 3:
                    a ^= (255 & e.charCodeAt(n + 2)) << 16;
                case 2:
                    a ^= (255 & e.charCodeAt(n + 1)) << 8;
                case 1:
                    a ^= 255 & e.charCodeAt(n), a = 1540483477 * (65535 & a) + ((1540483477 * (a >>> 16) & 65535) << 16)
            }
            return a ^= a >>> 13, a = 1540483477 * (65535 & a) + ((1540483477 * (a >>> 16) & 65535) << 16), a ^= a >>> 15, a >>> 0
        }

        var h = "0.4.12", m = {
            parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function (e) {
                return String(e).evalJSON()
            } || e.parseJSON || e.evalJSON,
            stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || e.toJSON
        };
        if ("function" != typeof m.parse || "function" != typeof m.stringify)throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
        var w, p = {__jstorage_meta: {CRC32: {}}}, b = {jStorage: "{}"}, y = null, v = 0, T = !1, C = {}, L = !1, O = 0, P = {}, D = +new Date, A = {
            isXML: function (e) {
                var t = (e ? e.ownerDocument || e : 0).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, encode: function (e) {
                if (!this.isXML(e))return !1;
                try {
                    return (new XMLSerializer).serializeToString(e)
                } catch (t) {
                    try {
                        return e.xml
                    } catch (r) {
                    }
                }
                return !1
            }, decode: function (e) {
                var t, r = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject && function (e) {
                        var t = new ActiveXObject("Microsoft.XMLDOM");
                        return t.async = "false", t.loadXML(e), t
                    };
                return r ? (t = r.call("DOMParser" in window && new DOMParser || window, e, "text/xml"), this.isXML(t) ? t : !1) : !1
            }
        };
        e.jStorage = {
            version: h, set: function (e, t, r) {
                if (c(e), r = r || {}, "undefined" == typeof t)return this.deleteKey(e), t;
                if (A.isXML(t)) t = {_is_xml: !0, xml: A.encode(t)}; else {
                    if ("function" == typeof t)return void 0;
                    t && "object" == typeof t && (t = m.parse(m.stringify(t)))
                }
                return p[e] = t, p.__jstorage_meta.CRC32[e] = "2." + S(m.stringify(t), 2538058380), this.setTTL(e, r.TTL || 0), i(e, "updated"), t
            }, get: function (e, t) {
                return c(e), e in p ? p[e] && "object" == typeof p[e] && p[e]._is_xml ? A.decode(p[e].xml) : p[e] : "undefined" == typeof t ? null : t
            }, deleteKey: function (e) {
                return c(e), e in p ? (delete p[e], "object" == typeof p.__jstorage_meta.TTL && e in p.__jstorage_meta.TTL && delete p.__jstorage_meta.TTL[e], delete p.__jstorage_meta.CRC32[e], g(), s(), i(e, "deleted"), !0) : !1
            }, setTTL: function (e, t) {
                var r = +new Date;
                return c(e), t = Number(t) || 0, e in p ? (p.__jstorage_meta.TTL || (p.__jstorage_meta.TTL = {}), t > 0 ? p.__jstorage_meta.TTL[e] = r + t : delete p.__jstorage_meta.TTL[e], g(), _(), s(), !0) : !1
            }, getTTL: function (e) {
                var t, r = +new Date;
                return c(e), e in p && p.__jstorage_meta.TTL && p.__jstorage_meta.TTL[e] ? (t = p.__jstorage_meta.TTL[e] - r, t || 0) : 0
            }, flush: function () {
                return p = {__jstorage_meta: {CRC32: {}}}, g(), s(), i(null, "flushed"), !0
            }, storageObj: function () {
                function e() {
                }

                return e.prototype = p, new e
            }, index: function () {
                var e, t = [];
                for (e in p)p.hasOwnProperty(e) && "__jstorage_meta" != e && t.push(e);
                return t
            }, storageSize: function () {
                return v
            }, currentBackend: function () {
                return T
            }, storageAvailable: function () {
                return !!T
            }, listenKeyChange: function (e, t) {
                c(e), C[e] || (C[e] = []), C[e].push(t)
            }, stopListening: function (e, t) {
                if (c(e), C[e]) {
                    if (!t)return delete C[e], void 0;
                    for (var r = C[e].length - 1; r >= 0; r--)C[e][r] == t && C[e].splice(r, 1)
                }
            }, subscribe: function (e, t) {
                if (e = (e || "").toString(), !e)throw new TypeError("Channel not defined");
                P[e] || (P[e] = []), P[e].push(t)
            }, publish: function (e, t) {
                if (e = (e || "").toString(), !e)throw new TypeError("Channel not defined");
                j(e, t)
            }, reInit: function () {
                r()
            }, noConflict: function (e) {
                return delete window.$.jStorage, e && (window.jStorage = this), this
            }
        }, t()
    }(t)
});
;define("js/common/music/jquery.js", function (e, t, n) {
    !function (e, t) {
        "object" == typeof n && "object" == typeof n.exports ? n.exports = e.document ? t(e, !0) : function (e) {
                    if (!e.document)throw new Error("jQuery requires a window with a document");
                    return t(e)
                } : t(e)
    }("undefined" != typeof window ? window : this, function (e, t) {
        function n(e) {
            var t = !!e && "length" in e && e.length, n = pt.type(e);
            return "function" === n || pt.isWindow(e) ? !1 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
        }

        function r(e, t, n) {
            if (pt.isFunction(t))return pt.grep(e, function (e, r) {
                return !!t.call(e, r, e) !== n
            });
            if (t.nodeType)return pt.grep(e, function (e) {
                return e === t !== n
            });
            if ("string" == typeof t) {
                if (Ct.test(t))return pt.filter(t, e, n);
                t = pt.filter(t, e)
            }
            return pt.grep(e, function (e) {
                return pt.inArray(e, t) > -1 !== n
            })
        }

        function i(e, t) {
            do e = e[t]; while (e && 1 !== e.nodeType);
            return e
        }

        function o(e) {
            var t = {};
            return pt.each(e.match(Dt) || [], function (e, n) {
                t[n] = !0
            }), t
        }

        function a() {
            rt.addEventListener ? (rt.removeEventListener("DOMContentLoaded", s), e.removeEventListener("load", s)) : (rt.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
        }

        function s() {
            (rt.addEventListener || "load" === e.event.type || "complete" === rt.readyState) && (a(), pt.ready())
        }

        function u(e, t, n) {
            if (void 0 === n && 1 === e.nodeType) {
                var r = "data-" + t.replace(_t, "-$1").toLowerCase();
                if (n = e.getAttribute(r), "string" == typeof n) {
                    try {
                        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : qt.test(n) ? pt.parseJSON(n) : n
                    } catch (i) {
                    }
                    pt.data(e, t, n)
                } else n = void 0
            }
            return n
        }

        function l(e) {
            var t;
            for (t in e)if (("data" !== t || !pt.isEmptyObject(e[t])) && "toJSON" !== t)return !1;
            return !0
        }

        function c(e, t, n, r) {
            if (Ht(e)) {
                var i, o, a = pt.expando, s = e.nodeType, u = s ? pt.cache : e, l = s ? e[a] : e[a] && a;
                if (l && u[l] && (r || u[l].data) || void 0 !== n || "string" != typeof t)return l || (l = s ? e[a] = nt.pop() || pt.guid++ : a), u[l] || (u[l] = s ? {} : {toJSON: pt.noop}), ("object" == typeof t || "function" == typeof t) && (r ? u[l] = pt.extend(u[l], t) : u[l].data = pt.extend(u[l].data, t)), o = u[l], r || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[pt.camelCase(t)] = n), "string" == typeof t ? (i = o[t], null == i && (i = o[pt.camelCase(t)])) : i = o, i
            }
        }

        function d(e, t, n) {
            if (Ht(e)) {
                var r, i, o = e.nodeType, a = o ? pt.cache : e, s = o ? e[pt.expando] : pt.expando;
                if (a[s]) {
                    if (t && (r = n ? a[s] : a[s].data)) {
                        pt.isArray(t) ? t = t.concat(pt.map(t, pt.camelCase)) : t in r ? t = [t] : (t = pt.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                        for (; i--;)delete r[t[i]];
                        if (n ? !l(r) : !pt.isEmptyObject(r))return
                    }
                    (n || (delete a[s].data, l(a[s]))) && (o ? pt.cleanData([e], !0) : dt.deleteExpando || a != a.window ? delete a[s] : a[s] = void 0)
                }
            }
        }

        function f(e, t, n, r) {
            var i, o = 1, a = 20, s = r ? function () {
                    return r.cur()
                } : function () {
                    return pt.css(e, t, "")
                }, u = s(), l = n && n[3] || (pt.cssNumber[t] ? "" : "px"), c = (pt.cssNumber[t] || "px" !== l && +u) && Mt.exec(pt.css(e, t));
            if (c && c[3] !== l) {
                l = l || c[3], n = n || [], c = +u || 1;
                do o = o || ".5", c /= o, pt.style(e, t, c + l); while (o !== (o = s() / u) && 1 !== o && --a)
            }
            return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
        }

        function p(e) {
            var t = zt.split("|"), n = e.createDocumentFragment();
            if (n.createElement)for (; t.length;)n.createElement(t.pop());
            return n
        }

        function h(e, t) {
            var n, r, i = 0, o = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
            if (!o)for (o = [], n = e.childNodes || e; null != (r = n[i]); i++)!t || pt.nodeName(r, t) ? o.push(r) : pt.merge(o, h(r, t));
            return void 0 === t || t && pt.nodeName(e, t) ? pt.merge([e], o) : o
        }

        function g(e, t) {
            for (var n, r = 0; null != (n = e[r]); r++)pt._data(n, "globalEval", !t || pt._data(t[r], "globalEval"))
        }

        function m(e) {
            Bt.test(e.type) && (e.defaultChecked = e.checked)
        }

        function v(e, t, n, r, i) {
            for (var o, a, s, u, l, c, d, f = e.length, v = p(t), y = [], x = 0; f > x; x++)if (a = e[x], a || 0 === a)if ("object" === pt.type(a)) pt.merge(y, a.nodeType ? [a] : a); else if (Ut.test(a)) {
                for (u = u || v.appendChild(t.createElement("div")), l = (Wt.exec(a) || ["", ""])[1].toLowerCase(), d = Xt[l] || Xt._default, u.innerHTML = d[1] + pt.htmlPrefilter(a) + d[2], o = d[0]; o--;)u = u.lastChild;
                if (!dt.leadingWhitespace && $t.test(a) && y.push(t.createTextNode($t.exec(a)[0])), !dt.tbody)for (a = "table" !== l || Vt.test(a) ? "<table>" !== d[1] || Vt.test(a) ? 0 : u : u.firstChild, o = a && a.childNodes.length; o--;)pt.nodeName(c = a.childNodes[o], "tbody") && !c.childNodes.length && a.removeChild(c);
                for (pt.merge(y, u.childNodes), u.textContent = ""; u.firstChild;)u.removeChild(u.firstChild);
                u = v.lastChild
            } else y.push(t.createTextNode(a));
            for (u && v.removeChild(u), dt.appendChecked || pt.grep(h(y, "input"), m), x = 0; a = y[x++];)if (r && pt.inArray(a, r) > -1) i && i.push(a); else if (s = pt.contains(a.ownerDocument, a), u = h(v.appendChild(a), "script"), s && g(u), n)for (o = 0; a = u[o++];)It.test(a.type || "") && n.push(a);
            return u = null, v
        }

        function y() {
            return !0
        }

        function x() {
            return !1
        }

        function b() {
            try {
                return rt.activeElement
            } catch (e) {
            }
        }

        function w(e, t, n, r, i, o) {
            var a, s;
            if ("object" == typeof t) {
                "string" != typeof n && (r = r || n, n = void 0);
                for (s in t)w(e, s, n, r, t[s], o);
                return e
            }
            if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1) i = x; else if (!i)return e;
            return 1 === o && (a = i, i = function (e) {
                return pt().off(e), a.apply(this, arguments)
            }, i.guid = a.guid || (a.guid = pt.guid++)), e.each(function () {
                pt.event.add(this, t, i, r, n)
            })
        }

        function T(e, t) {
            return pt.nodeName(e, "table") && pt.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function C(e) {
            return e.type = (null !== pt.find.attr(e, "type")) + "/" + e.type, e
        }

        function E(e) {
            var t = on.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function N(e, t) {
            if (1 === t.nodeType && pt.hasData(e)) {
                var n, r, i, o = pt._data(e), a = pt._data(t, o), s = o.events;
                if (s) {
                    delete a.handle, a.events = {};
                    for (n in s)for (r = 0, i = s[n].length; i > r; r++)pt.event.add(t, n, s[n][r])
                }
                a.data && (a.data = pt.extend({}, a.data))
            }
        }

        function k(e, t) {
            var n, r, i;
            if (1 === t.nodeType) {
                if (n = t.nodeName.toLowerCase(), !dt.noCloneEvent && t[pt.expando]) {
                    i = pt._data(t);
                    for (r in i.events)pt.removeEvent(t, r, i.handle);
                    t.removeAttribute(pt.expando)
                }
                "script" === n && t.text !== e.text ? (C(t).text = e.text, E(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), dt.html5Clone && e.innerHTML && !pt.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Bt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
            }
        }

        function S(e, t, n, r) {
            t = ot.apply([], t);
            var i, o, a, s, u, l, c = 0, d = e.length, f = d - 1, p = t[0], g = pt.isFunction(p);
            if (g || d > 1 && "string" == typeof p && !dt.checkClone && rn.test(p))return e.each(function (i) {
                var o = e.eq(i);
                g && (t[0] = p.call(this, i, o.html())), S(o, t, n, r)
            });
            if (d && (l = v(t, e[0].ownerDocument, !1, e, r), i = l.firstChild, 1 === l.childNodes.length && (l = i), i || r)) {
                for (s = pt.map(h(l, "script"), C), a = s.length; d > c; c++)o = l, c !== f && (o = pt.clone(o, !0, !0), a && pt.merge(s, h(o, "script"))), n.call(e[c], o, c);
                if (a)for (u = s[s.length - 1].ownerDocument, pt.map(s, E), c = 0; a > c; c++)o = s[c], It.test(o.type || "") && !pt._data(o, "globalEval") && pt.contains(u, o) && (o.src ? pt._evalUrl && pt._evalUrl(o.src) : pt.globalEval((o.text || o.textContent || o.innerHTML || "").replace(an, "")));
                l = i = null
            }
            return e
        }

        function A(e, t, n) {
            for (var r, i = t ? pt.filter(t, e) : e, o = 0; null != (r = i[o]); o++)n || 1 !== r.nodeType || pt.cleanData(h(r)), r.parentNode && (n && pt.contains(r.ownerDocument, r) && g(h(r, "script")), r.parentNode.removeChild(r));
            return e
        }

        function D(e, t) {
            var n = pt(t.createElement(e)).appendTo(t.body), r = pt.css(n[0], "display");
            return n.detach(), r
        }

        function j(e) {
            var t = rt, n = cn[e];
            return n || (n = D(e, t), "none" !== n && n || (ln = (ln || pt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (ln[0].contentWindow || ln[0].contentDocument).document, t.write(), t.close(), n = D(e, t), ln.detach()), cn[e] = n), n
        }

        function L(e, t) {
            return {
                get: function () {
                    return e() ? (delete this.get, void 0) : (this.get = t).apply(this, arguments)
                }
            }
        }

        function H(e) {
            if (e in Nn)return e;
            for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = En.length; n--;)if (e = En[n] + t, e in Nn)return e
        }

        function q(e, t) {
            for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++)r = e[a], r.style && (o[a] = pt._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Rt(r) && (o[a] = pt._data(r, "olddisplay", j(r.nodeName)))) : (i = Rt(r), (n && "none" !== n || !i) && pt._data(r, "olddisplay", i ? n : pt.css(r, "display"))));
            for (a = 0; s > a; a++)r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
            return e
        }

        function _(e, t, n) {
            var r = wn.exec(t);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
        }

        function F(e, t, n, r, i) {
            for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += pt.css(e, n + Ot[o], !0, i)), r ? ("content" === n && (a -= pt.css(e, "padding" + Ot[o], !0, i)), "margin" !== n && (a -= pt.css(e, "border" + Ot[o] + "Width", !0, i))) : (a += pt.css(e, "padding" + Ot[o], !0, i), "padding" !== n && (a += pt.css(e, "border" + Ot[o] + "Width", !0, i)));
            return a
        }

        function M(t, n, r) {
            var i = !0, o = "width" === n ? t.offsetWidth : t.offsetHeight, a = gn(t), s = dt.boxSizing && "border-box" === pt.css(t, "boxSizing", !1, a);
            if (rt.msFullscreenElement && e.top !== e && t.getClientRects().length && (o = Math.round(100 * t.getBoundingClientRect()[n])), 0 >= o || null == o) {
                if (o = mn(t, n, a), (0 > o || null == o) && (o = t.style[n]), fn.test(o))return o;
                i = s && (dt.boxSizingReliable() || o === t.style[n]), o = parseFloat(o) || 0
            }
            return o + F(t, n, r || (s ? "border" : "content"), i, a) + "px"
        }

        function O(e, t, n, r, i) {
            return new O.prototype.init(e, t, n, r, i)
        }

        function R() {
            return e.setTimeout(function () {
                kn = void 0
            }), kn = pt.now()
        }

        function P(e, t) {
            var n, r = {height: e}, i = 0;
            for (t = t ? 1 : 0; 4 > i; i += 2 - t)n = Ot[i], r["margin" + n] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e), r
        }

        function B(e, t, n) {
            for (var r, i = ($.tweeners[t] || []).concat($.tweeners["*"]), o = 0, a = i.length; a > o; o++)if (r = i[o].call(n, t, e))return r
        }

        function W(e, t, n) {
            var r, i, o, a, s, u, l, c, d = this, f = {}, p = e.style, h = e.nodeType && Rt(e), g = pt._data(e, "fxshow");
            n.queue || (s = pt._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function () {
                s.unqueued || u()
            }), s.unqueued++, d.always(function () {
                d.always(function () {
                    s.unqueued--, pt.queue(e, "fx").length || s.empty.fire()
                })
            })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], l = pt.css(e, "display"), c = "none" === l ? pt._data(e, "olddisplay") || j(e.nodeName) : l, "inline" === c && "none" === pt.css(e, "float") && (dt.inlineBlockNeedsLayout && "inline" !== j(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", dt.shrinkWrapBlocks() || d.always(function () {
                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
            }));
            for (r in t)if (i = t[r], An.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                    if ("show" !== i || !g || void 0 === g[r])continue;
                    h = !0
                }
                f[r] = g && g[r] || pt.style(e, r)
            } else l = void 0;
            if (pt.isEmptyObject(f)) "inline" === ("none" === l ? j(e.nodeName) : l) && (p.display = l); else {
                g ? "hidden" in g && (h = g.hidden) : g = pt._data(e, "fxshow", {}), o && (g.hidden = !h), h ? pt(e).show() : d.done(function () {
                        pt(e).hide()
                    }), d.done(function () {
                    var t;
                    pt._removeData(e, "fxshow");
                    for (t in f)pt.style(e, t, f[t])
                });
                for (r in f)a = B(h ? g[r] : 0, r, d), r in g || (g[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
            }
        }

        function I(e, t) {
            var n, r, i, o, a;
            for (n in e)if (r = pt.camelCase(n), i = t[r], o = e[n], pt.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = pt.cssHooks[r], a && "expand" in a) {
                o = a.expand(o), delete e[r];
                for (n in o)n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
        }

        function $(e, t, n) {
            var r, i, o = 0, a = $.prefilters.length, s = pt.Deferred().always(function () {
                delete u.elem
            }), u = function () {
                if (i)return !1;
                for (var t = kn || R(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++)l.tweens[a].run(o);
                return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
            }, l = s.promise({
                elem: e,
                props: pt.extend({}, t),
                opts: pt.extend(!0, {specialEasing: {}, easing: pt.easing._default}, n),
                originalProperties: t,
                originalOptions: n,
                startTime: kn || R(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                    var r = pt.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function (t) {
                    var n = 0, r = t ? l.tweens.length : 0;
                    if (i)return this;
                    for (i = !0; r > n; n++)l.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                }
            }), c = l.props;
            for (I(c, l.opts.specialEasing); a > o; o++)if (r = $.prefilters[o].call(l, e, c, l.opts))return pt.isFunction(r.stop) && (pt._queueHooks(l.elem, l.opts.queue).stop = pt.proxy(r.stop, r)), r;
            return pt.map(c, B, l), pt.isFunction(l.opts.start) && l.opts.start.call(e, l), pt.fx.timer(pt.extend(u, {
                elem: e,
                anim: l,
                queue: l.opts.queue
            })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function z(e) {
            return pt.attr(e, "class") || ""
        }

        function X(e) {
            return function (t, n) {
                "string" != typeof t && (n = t, t = "*");
                var r, i = 0, o = t.toLowerCase().match(Dt) || [];
                if (pt.isFunction(n))for (; r = o[i++];)"+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }

        function U(e, t, n, r) {
            function i(s) {
                var u;
                return o[s] = !0, pt.each(e[s] || [], function (e, s) {
                    var l = s(t, n, r);
                    return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
                }), u
            }

            var o = {}, a = e === Zn;
            return i(t.dataTypes[0]) || !o["*"] && i("*")
        }

        function V(e, t) {
            var n, r, i = pt.ajaxSettings.flatOptions || {};
            for (r in t)void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
            return n && pt.extend(!0, e, n), e
        }

        function Y(e, t, n) {
            for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0];)u.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
            if (i)for (a in s)if (s[a] && s[a].test(i)) {
                u.unshift(a);
                break
            }
            if (u[0] in n) o = u[0]; else {
                for (a in n) {
                    if (!u[0] || e.converters[a + " " + u[0]]) {
                        o = a;
                        break
                    }
                    r || (r = a)
                }
                o = o || r
            }
            return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
        }

        function J(e, t, n, r) {
            var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
            if (c[1])for (a in e.converters)l[a.toLowerCase()] = e.converters[a];
            for (o = c.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())if ("*" === o) o = u; else if ("*" !== u && u !== o) {
                if (a = l[u + " " + o] || l["* " + o], !a)for (i in l)if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                    a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
                    break
                }
                if (a !== !0)if (a && e["throws"]) t = a(t); else try {
                    t = a(t)
                } catch (d) {
                    return {state: "parsererror", error: a ? d : "No conversion from " + u + " to " + o}
                }
            }
            return {state: "success", data: t}
        }

        function G(e) {
            return e.style && e.style.display || pt.css(e, "display")
        }

        function Q(e) {
            for (; e && 1 === e.nodeType;) {
                if ("none" === G(e) || "hidden" === e.type)return !0;
                e = e.parentNode
            }
            return !1
        }

        function K(e, t, n, r) {
            var i;
            if (pt.isArray(t)) pt.each(t, function (t, i) {
                n || ir.test(e) ? r(e, i) : K(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
            }); else if (n || "object" !== pt.type(t)) r(e, t); else for (i in t)K(e + "[" + i + "]", t[i], n, r)
        }

        function Z() {
            try {
                return new e.XMLHttpRequest
            } catch (t) {
            }
        }

        function et() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {
            }
        }

        function tt(e) {
            return pt.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
        }

        var nt = [], rt = e.document, it = nt.slice, ot = nt.concat, at = nt.push, st = nt.indexOf, ut = {}, lt = ut.toString, ct = ut.hasOwnProperty, dt = {}, ft = "1.12.3", pt = function (e, t) {
            return new pt.fn.init(e, t)
        }, ht = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, gt = /^-ms-/, mt = /-([\da-z])/gi, vt = function (e, t) {
            return t.toUpperCase()
        };
        pt.fn = pt.prototype = {
            jquery: ft, constructor: pt, selector: "", length: 0, toArray: function () {
                return it.call(this)
            }, get: function (e) {
                return null != e ? 0 > e ? this[e + this.length] : this[e] : it.call(this)
            }, pushStack: function (e) {
                var t = pt.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            }, each: function (e) {
                return pt.each(this, e)
            }, map: function (e) {
                return this.pushStack(pt.map(this, function (t, n) {
                    return e.call(t, n, t)
                }))
            }, slice: function () {
                return this.pushStack(it.apply(this, arguments))
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (e) {
                var t = this.length, n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            }, end: function () {
                return this.prevObject || this.constructor()
            }, push: at, sort: nt.sort, splice: nt.splice
        }, pt.extend = pt.fn.extend = function () {
            var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
            for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || pt.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++)if (null != (i = arguments[s]))for (r in i)e = a[r], n = i[r], a !== n && (l && n && (pt.isPlainObject(n) || (t = pt.isArray(n))) ? (t ? (t = !1, o = e && pt.isArray(e) ? e : []) : o = e && pt.isPlainObject(e) ? e : {}, a[r] = pt.extend(l, o, n)) : void 0 !== n && (a[r] = n));
            return a
        }, pt.extend({
            expando: "jQuery" + (ft + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
                throw new Error(e)
            }, noop: function () {
            }, isFunction: function (e) {
                return "function" === pt.type(e)
            }, isArray: Array.isArray || function (e) {
                return "array" === pt.type(e)
            }, isWindow: function (e) {
                return null != e && e == e.window
            }, isNumeric: function (e) {
                var t = e && e.toString();
                return !pt.isArray(e) && t - parseFloat(t) + 1 >= 0
            }, isEmptyObject: function (e) {
                var t;
                for (t in e)return !1;
                return !0
            }, isPlainObject: function (e) {
                var t;
                if (!e || "object" !== pt.type(e) || e.nodeType || pt.isWindow(e))return !1;
                try {
                    if (e.constructor && !ct.call(e, "constructor") && !ct.call(e.constructor.prototype, "isPrototypeOf"))return !1
                } catch (n) {
                    return !1
                }
                if (!dt.ownFirst)for (t in e)return ct.call(e, t);
                for (t in e);
                return void 0 === t || ct.call(e, t)
            }, type: function (e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ut[lt.call(e)] || "object" : typeof e
            }, globalEval: function (t) {
                t && pt.trim(t) && (e.execScript || function (t) {
                    e.eval.call(e, t)
                })(t)
            }, camelCase: function (e) {
                return e.replace(gt, "ms-").replace(mt, vt)
            }, nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            }, each: function (e, t) {
                var r, i = 0;
                if (n(e))for (r = e.length; r > i && t.call(e[i], i, e[i]) !== !1; i++); else for (i in e)if (t.call(e[i], i, e[i]) === !1)break;
                return e
            }, trim: function (e) {
                return null == e ? "" : (e + "").replace(ht, "")
            }, makeArray: function (e, t) {
                var r = t || [];
                return null != e && (n(Object(e)) ? pt.merge(r, "string" == typeof e ? [e] : e) : at.call(r, e)), r
            }, inArray: function (e, t, n) {
                var r;
                if (t) {
                    if (st)return st.call(t, e, n);
                    for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)if (n in t && t[n] === e)return n
                }
                return -1
            }, merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; n > r;)e[i++] = t[r++];
                if (n !== n)for (; void 0 !== t[r];)e[i++] = t[r++];
                return e.length = i, e
            }, grep: function (e, t, n) {
                for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++)r = !t(e[o], o), r !== s && i.push(e[o]);
                return i
            }, map: function (e, t, r) {
                var i, o, a = 0, s = [];
                if (n(e))for (i = e.length; i > a; a++)o = t(e[a], a, r), null != o && s.push(o); else for (a in e)o = t(e[a], a, r), null != o && s.push(o);
                return ot.apply([], s)
            }, guid: 1, proxy: function (e, t) {
                var n, r, i;
                return "string" == typeof t && (i = e[t], t = e, e = i), pt.isFunction(e) ? (n = it.call(arguments, 2), r = function () {
                        return e.apply(t || this, n.concat(it.call(arguments)))
                    }, r.guid = e.guid = e.guid || pt.guid++, r) : void 0
            }, now: function () {
                return +new Date
            }, support: dt
        }), "function" == typeof Symbol && (pt.fn[Symbol.iterator] = nt[Symbol.iterator]), pt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
            ut["[object " + t + "]"] = t.toLowerCase()
        });
        var yt = function (e) {
            function t(e, t, n, r) {
                var i, o, a, s, u, l, d, p, h = t && t.ownerDocument, g = t ? t.nodeType : 9;
                if (n = n || [], "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g)return n;
                if (!r && ((t ? t.ownerDocument || t : B) !== H && L(t), t = t || H, _)) {
                    if (11 !== g && (l = vt.exec(e)))if (i = l[1]) {
                        if (9 === g) {
                            if (!(a = t.getElementById(i)))return n;
                            if (a.id === i)return n.push(a), n
                        } else if (h && (a = h.getElementById(i)) && R(t, a) && a.id === i)return n.push(a), n
                    } else {
                        if (l[2])return K.apply(n, t.getElementsByTagName(e)), n;
                        if ((i = l[3]) && w.getElementsByClassName && t.getElementsByClassName)return K.apply(n, t.getElementsByClassName(i)), n
                    }
                    if (!(!w.qsa || X[e + " "] || F && F.test(e))) {
                        if (1 !== g) h = t, p = e; else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((s = t.getAttribute("id")) ? s = s.replace(xt, "\\$&") : t.setAttribute("id", s = P), d = N(e), o = d.length, u = ft.test(s) ? "#" + s : "[id='" + s + "']"; o--;)d[o] = u + " " + f(d[o]);
                            p = d.join(","), h = yt.test(e) && c(t.parentNode) || t
                        }
                        if (p)try {
                            return K.apply(n, h.querySelectorAll(p)), n
                        } catch (m) {
                        } finally {
                            s === P && t.removeAttribute("id")
                        }
                    }
                }
                return S(e.replace(st, "$1"), t, n, r)
            }

            function n() {
                function e(n, r) {
                    return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = r
                }

                var t = [];
                return e
            }

            function r(e) {
                return e[P] = !0, e
            }

            function i(e) {
                var t = H.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function o(e, t) {
                for (var n = e.split("|"), r = n.length; r--;)T.attrHandle[n[r]] = t
            }

            function a(e, t) {
                var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
                if (r)return r;
                if (n)for (; n = n.nextSibling;)if (n === t)return -1;
                return e ? 1 : -1
            }

            function s(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function u(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function l(e) {
                return r(function (t) {
                    return t = +t, r(function (n, r) {
                        for (var i, o = e([], n.length, t), a = o.length; a--;)n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function c(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }

            function d() {
            }

            function f(e) {
                for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
                return r
            }

            function p(e, t, n) {
                var r = t.dir, i = n && "parentNode" === r, o = I++;
                return t.first ? function (t, n, o) {
                        for (; t = t[r];)if (1 === t.nodeType || i)return e(t, n, o)
                    } : function (t, n, a) {
                        var s, u, l, c = [W, o];
                        if (a) {
                            for (; t = t[r];)if ((1 === t.nodeType || i) && e(t, n, a))return !0
                        } else for (; t = t[r];)if (1 === t.nodeType || i) {
                            if (l = t[P] || (t[P] = {}), u = l[t.uniqueID] || (l[t.uniqueID] = {}), (s = u[r]) && s[0] === W && s[1] === o)return c[2] = s[2];
                            if (u[r] = c, c[2] = e(t, n, a))return !0
                        }
                    }
            }

            function h(e) {
                return e.length > 1 ? function (t, n, r) {
                        for (var i = e.length; i--;)if (!e[i](t, n, r))return !1;
                        return !0
                    } : e[0]
            }

            function g(e, n, r) {
                for (var i = 0, o = n.length; o > i; i++)t(e, n[i], r);
                return r
            }

            function m(e, t, n, r, i) {
                for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
                return a
            }

            function v(e, t, n, i, o, a) {
                return i && !i[P] && (i = v(i)), o && !o[P] && (o = v(o, a)), r(function (r, a, s, u) {
                    var l, c, d, f = [], p = [], h = a.length, v = r || g(t || "*", s.nodeType ? [s] : s, []), y = !e || !r && t ? v : m(v, f, e, s, u), x = n ? o || (r ? e : h || i) ? [] : a : y;
                    if (n && n(y, x, s, u), i)for (l = m(x, p), i(l, [], s, u), c = l.length; c--;)(d = l[c]) && (x[p[c]] = !(y[p[c]] = d));
                    if (r) {
                        if (o || e) {
                            if (o) {
                                for (l = [], c = x.length; c--;)(d = x[c]) && l.push(y[c] = d);
                                o(null, x = [], l, u)
                            }
                            for (c = x.length; c--;)(d = x[c]) && (l = o ? et(r, d) : f[c]) > -1 && (r[l] = !(a[l] = d))
                        }
                    } else x = m(x === a ? x.splice(h, x.length) : x), o ? o(null, a, x, u) : K.apply(a, x)
                })
            }

            function y(e) {
                for (var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, u = p(function (e) {
                    return e === t
                }, a, !0), l = p(function (e) {
                    return et(t, e) > -1
                }, a, !0), c = [function (e, n, r) {
                    var i = !o && (r || n !== A) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                    return t = null, i
                }]; i > s; s++)if (n = T.relative[e[s].type]) c = [p(h(c), n)]; else {
                    if (n = T.filter[e[s].type].apply(null, e[s].matches), n[P]) {
                        for (r = ++s; i > r && !T.relative[e[r].type]; r++);
                        return v(s > 1 && h(c), s > 1 && f(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(st, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && f(e))
                    }
                    c.push(n)
                }
                return h(c)
            }

            function x(e, n) {
                var i = n.length > 0, o = e.length > 0, a = function (r, a, s, u, l) {
                    var c, d, f, p = 0, h = "0", g = r && [], v = [], y = A, x = r || o && T.find.TAG("*", l), b = W += null == y ? 1 : Math.random() || .1, w = x.length;
                    for (l && (A = a === H || a || l); h !== w && null != (c = x[h]); h++) {
                        if (o && c) {
                            for (d = 0, a || c.ownerDocument === H || (L(c), s = !_); f = e[d++];)if (f(c, a || H, s)) {
                                u.push(c);
                                break
                            }
                            l && (W = b)
                        }
                        i && ((c = !f && c) && p--, r && g.push(c))
                    }
                    if (p += h, i && h !== p) {
                        for (d = 0; f = n[d++];)f(g, v, a, s);
                        if (r) {
                            if (p > 0)for (; h--;)g[h] || v[h] || (v[h] = G.call(u));
                            v = m(v)
                        }
                        K.apply(u, v), l && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(u)
                    }
                    return l && (W = b, A = y), g
                };
                return i ? r(a) : a
            }

            var b, w, T, C, E, N, k, S, A, D, j, L, H, q, _, F, M, O, R, P = "sizzle" + 1 * new Date, B = e.document, W = 0, I = 0, $ = n(), z = n(), X = n(), U = function (e, t) {
                return e === t && (j = !0), 0
            }, V = 1 << 31, Y = {}.hasOwnProperty, J = [], G = J.pop, Q = J.push, K = J.push, Z = J.slice, et = function (e, t) {
                for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
                return -1
            }, tt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", nt = "[\\x20\\t\\r\\n\\f]", rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", it = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + rt + "))|)" + nt + "*\\]", ot = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + it + ")*)|.*)\\)|)", at = new RegExp(nt + "+", "g"), st = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"), ut = new RegExp("^" + nt + "*," + nt + "*"), lt = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"), ct = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"), dt = new RegExp(ot), ft = new RegExp("^" + rt + "$"), pt = {
                ID: new RegExp("^#(" + rt + ")"),
                CLASS: new RegExp("^\\.(" + rt + ")"),
                TAG: new RegExp("^(" + rt + "|[*])"),
                ATTR: new RegExp("^" + it),
                PSEUDO: new RegExp("^" + ot),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + tt + ")$", "i"),
                needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
            }, ht = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, mt = /^[^{]+\{\s*\[native \w/, vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, yt = /[+~]/, xt = /'|\\/g, bt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"), wt = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            }, Tt = function () {
                L()
            };
            try {
                K.apply(J = Z.call(B.childNodes), B.childNodes), J[B.childNodes.length].nodeType
            } catch (Ct) {
                K = {
                    apply: J.length ? function (e, t) {
                            Q.apply(e, Z.call(t))
                        } : function (e, t) {
                            for (var n = e.length, r = 0; e[n++] = t[r++];);
                            e.length = n - 1
                        }
                }
            }
            w = t.support = {}, E = t.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, L = t.setDocument = function (e) {
                var t, n, r = e ? e.ownerDocument || e : B;
                return r !== H && 9 === r.nodeType && r.documentElement ? (H = r, q = H.documentElement, _ = !E(H), (n = H.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Tt, !1) : n.attachEvent && n.attachEvent("onunload", Tt)), w.attributes = i(function (e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), w.getElementsByTagName = i(function (e) {
                        return e.appendChild(H.createComment("")), !e.getElementsByTagName("*").length
                    }), w.getElementsByClassName = mt.test(H.getElementsByClassName), w.getById = i(function (e) {
                        return q.appendChild(e).id = P, !H.getElementsByName || !H.getElementsByName(P).length
                    }), w.getById ? (T.find.ID = function (e, t) {
                            if ("undefined" != typeof t.getElementById && _) {
                                var n = t.getElementById(e);
                                return n ? [n] : []
                            }
                        }, T.filter.ID = function (e) {
                            var t = e.replace(bt, wt);
                            return function (e) {
                                return e.getAttribute("id") === t
                            }
                        }) : (delete T.find.ID, T.filter.ID = function (e) {
                            var t = e.replace(bt, wt);
                            return function (e) {
                                var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                                return n && n.value === t
                            }
                        }), T.find.TAG = w.getElementsByTagName ? function (e, t) {
                            return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
                        } : function (e, t) {
                            var n, r = [], i = 0, o = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (; n = o[i++];)1 === n.nodeType && r.push(n);
                                return r
                            }
                            return o
                        }, T.find.CLASS = w.getElementsByClassName && function (e, t) {
                            return "undefined" != typeof t.getElementsByClassName && _ ? t.getElementsByClassName(e) : void 0
                        }, M = [], F = [], (w.qsa = mt.test(H.querySelectorAll)) && (i(function (e) {
                        q.appendChild(e).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && F.push("[*^$]=" + nt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || F.push("\\[" + nt + "*(?:value|" + tt + ")"), e.querySelectorAll("[id~=" + P + "-]").length || F.push("~="), e.querySelectorAll(":checked").length || F.push(":checked"), e.querySelectorAll("a#" + P + "+*").length || F.push(".#.+[+~]")
                    }), i(function (e) {
                        var t = H.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && F.push("name" + nt + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), F.push(",.*:")
                    })), (w.matchesSelector = mt.test(O = q.matches || q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector)) && i(function (e) {
                        w.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), M.push("!=", ot)
                    }), F = F.length && new RegExp(F.join("|")), M = M.length && new RegExp(M.join("|")), t = mt.test(q.compareDocumentPosition), R = t || mt.test(q.contains) ? function (e, t) {
                            var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                            return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                        } : function (e, t) {
                            if (t)for (; t = t.parentNode;)if (t === e)return !0;
                            return !1
                        }, U = t ? function (e, t) {
                            if (e === t)return j = !0, 0;
                            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === H || e.ownerDocument === B && R(B, e) ? -1 : t === H || t.ownerDocument === B && R(B, t) ? 1 : D ? et(D, e) - et(D, t) : 0 : 4 & n ? -1 : 1)
                        } : function (e, t) {
                            if (e === t)return j = !0, 0;
                            var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], u = [t];
                            if (!i || !o)return e === H ? -1 : t === H ? 1 : i ? -1 : o ? 1 : D ? et(D, e) - et(D, t) : 0;
                            if (i === o)return a(e, t);
                            for (n = e; n = n.parentNode;)s.unshift(n);
                            for (n = t; n = n.parentNode;)u.unshift(n);
                            for (; s[r] === u[r];)r++;
                            return r ? a(s[r], u[r]) : s[r] === B ? -1 : u[r] === B ? 1 : 0
                        }, H) : H
            }, t.matches = function (e, n) {
                return t(e, null, null, n)
            }, t.matchesSelector = function (e, n) {
                if ((e.ownerDocument || e) !== H && L(e), n = n.replace(ct, "='$1']"), !(!w.matchesSelector || !_ || X[n + " "] || M && M.test(n) || F && F.test(n)))try {
                    var r = O.call(e, n);
                    if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
                } catch (i) {
                }
                return t(n, H, null, [e]).length > 0
            }, t.contains = function (e, t) {
                return (e.ownerDocument || e) !== H && L(e), R(e, t)
            }, t.attr = function (e, t) {
                (e.ownerDocument || e) !== H && L(e);
                var n = T.attrHandle[t.toLowerCase()], r = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !_) : void 0;
                return void 0 !== r ? r : w.attributes || !_ ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }, t.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, t.uniqueSort = function (e) {
                var t, n = [], r = 0, i = 0;
                if (j = !w.detectDuplicates, D = !w.sortStable && e.slice(0), e.sort(U), j) {
                    for (; t = e[i++];)t === e[i] && (r = n.push(i));
                    for (; r--;)e.splice(n[r], 1)
                }
                return D = null, e
            }, C = t.getText = function (e) {
                var t, n = "", r = 0, i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent)return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)n += C(e)
                    } else if (3 === i || 4 === i)return e.nodeValue
                } else for (; t = e[r++];)n += C(t);
                return n
            }, T = t.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: pt,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {dir: "parentNode", first: !0},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: !0},
                    "~": {dir: "previousSibling"}
                },
                preFilter: {
                    ATTR: function (e) {
                        return e[1] = e[1].replace(bt, wt), e[3] = (e[3] || e[4] || e[5] || "").replace(bt, wt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    }, CHILD: function (e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                    }, PSEUDO: function (e) {
                        var t, n = !e[6] && e[2];
                        return pt.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && dt.test(n) && (t = N(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace(bt, wt).toLowerCase();
                        return "*" === e ? function () {
                                return !0
                            } : function (e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                    }, CLASS: function (e) {
                        var t = $[e + " "];
                        return t || (t = new RegExp("(^|" + nt + ")" + e + "(" + nt + "|$)")) && $(e, function (e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                    }, ATTR: function (e, n, r) {
                        return function (i) {
                            var o = t.attr(i, e);
                            return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(at, " ") + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                        }
                    }, CHILD: function (e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                        return 1 === r && 0 === i ? function (e) {
                                return !!e.parentNode
                            } : function (t, n, u) {
                                var l, c, d, f, p, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !u && !s, x = !1;
                                if (m) {
                                    if (o) {
                                        for (; g;) {
                                            for (f = t; f = f[g];)if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType)return !1;
                                            h = g = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? m.firstChild : m.lastChild], a && y) {
                                        for (f = m, d = f[P] || (f[P] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), l = c[e] || [], p = l[0] === W && l[1], x = p && l[2], f = p && m.childNodes[p]; f = ++p && f && f[g] || (x = p = 0) || h.pop();)if (1 === f.nodeType && ++x && f === t) {
                                            c[e] = [W, p, x];
                                            break
                                        }
                                    } else if (y && (f = t, d = f[P] || (f[P] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), l = c[e] || [], p = l[0] === W && l[1], x = p), x === !1)for (; (f = ++p && f && f[g] || (x = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++x || (y && (d = f[P] || (f[P] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), c[e] = [W, x]), f !== t)););
                                    return x -= i, x === r || x % r === 0 && x / r >= 0
                                }
                            }
                    }, PSEUDO: function (e, n) {
                        var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return o[P] ? o(n) : o.length > 1 ? (i = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                                        for (var r, i = o(e, n), a = i.length; a--;)r = et(e, i[a]), e[r] = !(t[r] = i[a])
                                    }) : function (e) {
                                        return o(e, 0, i)
                                    }) : o
                    }
                },
                pseudos: {
                    not: r(function (e) {
                        var t = [], n = [], i = k(e.replace(st, "$1"));
                        return i[P] ? r(function (e, t, n, r) {
                                for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                            }) : function (e, r, o) {
                                return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                            }
                    }), has: r(function (e) {
                        return function (n) {
                            return t(e, n).length > 0
                        }
                    }), contains: r(function (e) {
                        return e = e.replace(bt, wt), function (t) {
                            return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                        }
                    }), lang: r(function (e) {
                        return ft.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(bt, wt).toLowerCase(), function (t) {
                            var n;
                            do if (n = _ ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                    }), target: function (t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    }, root: function (e) {
                        return e === q
                    }, focus: function (e) {
                        return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    }, enabled: function (e) {
                        return e.disabled === !1
                    }, disabled: function (e) {
                        return e.disabled === !0
                    }, checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    }, selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    }, empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                        return !0
                    }, parent: function (e) {
                        return !T.pseudos.empty(e)
                    }, header: function (e) {
                        return gt.test(e.nodeName)
                    }, input: function (e) {
                        return ht.test(e.nodeName)
                    }, button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    }, text: function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    }, first: l(function () {
                        return [0]
                    }), last: l(function (e, t) {
                        return [t - 1]
                    }), eq: l(function (e, t, n) {
                        return [0 > n ? n + t : n]
                    }), even: l(function (e, t) {
                        for (var n = 0; t > n; n += 2)e.push(n);
                        return e
                    }), odd: l(function (e, t) {
                        for (var n = 1; t > n; n += 2)e.push(n);
                        return e
                    }), lt: l(function (e, t, n) {
                        for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
                        return e
                    }), gt: l(function (e, t, n) {
                        for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
                        return e
                    })
                }
            }, T.pseudos.nth = T.pseudos.eq;
            for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})T.pseudos[b] = s(b);
            for (b in{submit: !0, reset: !0})T.pseudos[b] = u(b);
            return d.prototype = T.filters = T.pseudos, T.setFilters = new d, N = t.tokenize = function (e, n) {
                var r, i, o, a, s, u, l, c = z[e + " "];
                if (c)return n ? 0 : c.slice(0);
                for (s = e, u = [], l = T.preFilter; s;) {
                    (!r || (i = ut.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = lt.exec(s)) && (r = i.shift(), o.push({
                        value: r,
                        type: i[0].replace(st, " ")
                    }), s = s.slice(r.length));
                    for (a in T.filter)!(i = pt[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
                        value: r,
                        type: a,
                        matches: i
                    }), s = s.slice(r.length));
                    if (!r)break
                }
                return n ? s.length : s ? t.error(e) : z(e, u).slice(0)
            }, k = t.compile = function (e, t) {
                var n, r = [], i = [], o = X[e + " "];
                if (!o) {
                    for (t || (t = N(e)), n = t.length; n--;)o = y(t[n]), o[P] ? r.push(o) : i.push(o);
                    o = X(e, x(i, r)), o.selector = e
                }
                return o
            }, S = t.select = function (e, t, n, r) {
                var i, o, a, s, u, l = "function" == typeof e && e, d = !r && N(e = l.selector || e);
                if (n = n || [], 1 === d.length) {
                    if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && _ && T.relative[o[1].type]) {
                        if (t = (T.find.ID(a.matches[0].replace(bt, wt), t) || [])[0], !t)return n;
                        l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (i = pt.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !T.relative[s = a.type]);)if ((u = T.find[s]) && (r = u(a.matches[0].replace(bt, wt), yt.test(o[0].type) && c(t.parentNode) || t))) {
                        if (o.splice(i, 1), e = r.length && f(o), !e)return K.apply(n, r), n;
                        break
                    }
                }
                return (l || k(e, d))(r, t, !_, n, !t || yt.test(e) && c(t.parentNode) || t), n
            }, w.sortStable = P.split("").sort(U).join("") === P, w.detectDuplicates = !!j, L(), w.sortDetached = i(function (e) {
                return 1 & e.compareDocumentPosition(H.createElement("div"))
            }), i(function (e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function (e, t, n) {
                return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), w.attributes && i(function (e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || o("value", function (e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
            }), i(function (e) {
                return null == e.getAttribute("disabled")
            }) || o(tt, function (e, t, n) {
                var r;
                return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }), t
        }(e);
        pt.find = yt, pt.expr = yt.selectors, pt.expr[":"] = pt.expr.pseudos, pt.uniqueSort = pt.unique = yt.uniqueSort, pt.text = yt.getText, pt.isXMLDoc = yt.isXML, pt.contains = yt.contains;
        var xt = function (e, t, n) {
            for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
                if (i && pt(e).is(n))break;
                r.push(e)
            }
            return r
        }, bt = function (e, t) {
            for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }, wt = pt.expr.match.needsContext, Tt = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, Ct = /^.[^:#\[\.,]*$/;
        pt.filter = function (e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? pt.find.matchesSelector(r, e) ? [r] : [] : pt.find.matches(e, pt.grep(t, function (e) {
                    return 1 === e.nodeType
                }))
        }, pt.fn.extend({
            find: function (e) {
                var t, n = [], r = this, i = r.length;
                if ("string" != typeof e)return this.pushStack(pt(e).filter(function () {
                    for (t = 0; i > t; t++)if (pt.contains(r[t], this))return !0
                }));
                for (t = 0; i > t; t++)pt.find(e, r[t], n);
                return n = this.pushStack(i > 1 ? pt.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
            }, filter: function (e) {
                return this.pushStack(r(this, e || [], !1))
            }, not: function (e) {
                return this.pushStack(r(this, e || [], !0))
            }, is: function (e) {
                return !!r(this, "string" == typeof e && wt.test(e) ? pt(e) : e || [], !1).length
            }
        });
        var Et, Nt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, kt = pt.fn.init = function (e, t, n) {
            var r, i;
            if (!e)return this;
            if (n = n || Et, "string" == typeof e) {
                if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : Nt.exec(e), !r || !r[1] && t)return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof pt ? t[0] : t, pt.merge(this, pt.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : rt, !0)), Tt.test(r[1]) && pt.isPlainObject(t))for (r in t)pt.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                if (i = rt.getElementById(r[2]), i && i.parentNode) {
                    if (i.id !== r[2])return Et.find(e);
                    this.length = 1, this[0] = i
                }
                return this.context = rt, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : pt.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(pt) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), pt.makeArray(e, this))
        };
        kt.prototype = pt.fn, Et = pt(rt);
        var St = /^(?:parents|prev(?:Until|All))/, At = {children: !0, contents: !0, next: !0, prev: !0};
        pt.fn.extend({
            has: function (e) {
                var t, n = pt(e, this), r = n.length;
                return this.filter(function () {
                    for (t = 0; r > t; t++)if (pt.contains(this, n[t]))return !0
                })
            }, closest: function (e, t) {
                for (var n, r = 0, i = this.length, o = [], a = wt.test(e) || "string" != typeof e ? pt(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && pt.find.matchesSelector(n, e))) {
                    o.push(n);
                    break
                }
                return this.pushStack(o.length > 1 ? pt.uniqueSort(o) : o)
            }, index: function (e) {
                return e ? "string" == typeof e ? pt.inArray(this[0], pt(e)) : pt.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, add: function (e, t) {
                return this.pushStack(pt.uniqueSort(pt.merge(this.get(), pt(e, t))))
            }, addBack: function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), pt.each({
            parent: function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            }, parents: function (e) {
                return xt(e, "parentNode")
            }, parentsUntil: function (e, t, n) {
                return xt(e, "parentNode", n)
            }, next: function (e) {
                return i(e, "nextSibling")
            }, prev: function (e) {
                return i(e, "previousSibling")
            }, nextAll: function (e) {
                return xt(e, "nextSibling")
            }, prevAll: function (e) {
                return xt(e, "previousSibling")
            }, nextUntil: function (e, t, n) {
                return xt(e, "nextSibling", n)
            }, prevUntil: function (e, t, n) {
                return xt(e, "previousSibling", n)
            }, siblings: function (e) {
                return bt((e.parentNode || {}).firstChild, e)
            }, children: function (e) {
                return bt(e.firstChild)
            }, contents: function (e) {
                return pt.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : pt.merge([], e.childNodes)
            }
        }, function (e, t) {
            pt.fn[e] = function (n, r) {
                var i = pt.map(this, t, n);
                return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = pt.filter(r, i)), this.length > 1 && (At[e] || (i = pt.uniqueSort(i)), St.test(e) && (i = i.reverse())), this.pushStack(i)
            }
        });
        var Dt = /\S+/g;
        pt.Callbacks = function (e) {
            e = "string" == typeof e ? o(e) : pt.extend({}, e);
            var t, n, r, i, a = [], s = [], u = -1, l = function () {
                for (i = e.once, r = t = !0; s.length; u = -1)for (n = s.shift(); ++u < a.length;)a[u].apply(n[0], n[1]) === !1 && e.stopOnFalse && (u = a.length, n = !1);
                e.memory || (n = !1), t = !1, i && (a = n ? [] : "")
            }, c = {
                add: function () {
                    return a && (n && !t && (u = a.length - 1, s.push(n)), function r(t) {
                        pt.each(t, function (t, n) {
                            pt.isFunction(n) ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== pt.type(n) && r(n)
                        })
                    }(arguments), n && !t && l()), this
                }, remove: function () {
                    return pt.each(arguments, function (e, t) {
                        for (var n; (n = pt.inArray(t, a, n)) > -1;)a.splice(n, 1), u >= n && u--
                    }), this
                }, has: function (e) {
                    return e ? pt.inArray(e, a) > -1 : a.length > 0
                }, empty: function () {
                    return a && (a = []), this
                }, disable: function () {
                    return i = s = [], a = n = "", this
                }, disabled: function () {
                    return !a
                }, lock: function () {
                    return i = !0, n || c.disable(), this
                }, locked: function () {
                    return !!i
                }, fireWith: function (e, n) {
                    return i || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || l()), this
                }, fire: function () {
                    return c.fireWith(this, arguments), this
                }, fired: function () {
                    return !!r
                }
            };
            return c
        }, pt.extend({
            Deferred: function (e) {
                var t = [["resolve", "done", pt.Callbacks("once memory"), "resolved"], ["reject", "fail", pt.Callbacks("once memory"), "rejected"], ["notify", "progress", pt.Callbacks("memory")]], n = "pending", r = {
                    state: function () {
                        return n
                    }, always: function () {
                        return i.done(arguments).fail(arguments), this
                    }, then: function () {
                        var e = arguments;
                        return pt.Deferred(function (n) {
                            pt.each(t, function (t, o) {
                                var a = pt.isFunction(e[t]) && e[t];
                                i[o[1]](function () {
                                    var e = a && a.apply(this, arguments);
                                    e && pt.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? pt.extend(e, r) : r
                    }
                }, i = {};
                return r.pipe = r.then, pt.each(t, function (e, o) {
                    var a = o[2], s = o[3];
                    r[o[1]] = a.add, s && a.add(function () {
                        n = s
                    }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                        return i[o[0] + "With"](this === i ? r : this, arguments), this
                    }, i[o[0] + "With"] = a.fireWith
                }), r.promise(i), e && e.call(i, i), i
            }, when: function (e) {
                var t, n, r, i = 0, o = it.call(arguments), a = o.length, s = 1 !== a || e && pt.isFunction(e.promise) ? a : 0, u = 1 === s ? e : pt.Deferred(), l = function (e, n, r) {
                    return function (i) {
                        n[e] = this, r[e] = arguments.length > 1 ? it.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                    }
                };
                if (a > 1)for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++)o[i] && pt.isFunction(o[i].promise) ? o[i].promise().progress(l(i, n, t)).done(l(i, r, o)).fail(u.reject) : --s;
                return s || u.resolveWith(r, o), u.promise()
            }
        });
        var jt;
        pt.fn.ready = function (e) {
            return pt.ready.promise().done(e), this
        }, pt.extend({
            isReady: !1, readyWait: 1, holdReady: function (e) {
                e ? pt.readyWait++ : pt.ready(!0)
            }, ready: function (e) {
                (e === !0 ? --pt.readyWait : pt.isReady) || (pt.isReady = !0, e !== !0 && --pt.readyWait > 0 || (jt.resolveWith(rt, [pt]), pt.fn.triggerHandler && (pt(rt).triggerHandler("ready"), pt(rt).off("ready"))))
            }
        }), pt.ready.promise = function (t) {
            if (!jt)if (jt = pt.Deferred(), "complete" === rt.readyState || "loading" !== rt.readyState && !rt.documentElement.doScroll) e.setTimeout(pt.ready); else if (rt.addEventListener) rt.addEventListener("DOMContentLoaded", s), e.addEventListener("load", s); else {
                rt.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
                var n = !1;
                try {
                    n = null == e.frameElement && rt.documentElement
                } catch (r) {
                }
                n && n.doScroll && !function i() {
                    if (!pt.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (t) {
                            return e.setTimeout(i, 50)
                        }
                        a(), pt.ready()
                    }
                }()
            }
            return jt.promise(t)
        }, pt.ready.promise();
        var Lt;
        for (Lt in pt(dt))break;
        dt.ownFirst = "0" === Lt, dt.inlineBlockNeedsLayout = !1, pt(function () {
            var e, t, n, r;
            n = rt.getElementsByTagName("body")[0], n && n.style && (t = rt.createElement("div"), r = rt.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", dt.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(r))
        }), function () {
            var e = rt.createElement("div");
            dt.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                dt.deleteExpando = !1
            }
            e = null
        }();
        var Ht = function (e) {
            var t = pt.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
            return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
        }, qt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, _t = /([A-Z])/g;
        pt.extend({
            cache: {},
            noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
            hasData: function (e) {
                return e = e.nodeType ? pt.cache[e[pt.expando]] : e[pt.expando], !!e && !l(e)
            },
            data: function (e, t, n) {
                return c(e, t, n)
            },
            removeData: function (e, t) {
                return d(e, t)
            },
            _data: function (e, t, n) {
                return c(e, t, n, !0)
            },
            _removeData: function (e, t) {
                return d(e, t, !0)
            }
        }), pt.fn.extend({
            data: function (e, t) {
                var n, r, i, o = this[0], a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (i = pt.data(o), 1 === o.nodeType && !pt._data(o, "parsedAttrs"))) {
                        for (n = a.length; n--;)a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = pt.camelCase(r.slice(5)), u(o, r, i[r])));
                        pt._data(o, "parsedAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof e ? this.each(function () {
                        pt.data(this, e)
                    }) : arguments.length > 1 ? this.each(function () {
                            pt.data(this, e, t)
                        }) : o ? u(o, e, pt.data(o, e)) : void 0
            }, removeData: function (e) {
                return this.each(function () {
                    pt.removeData(this, e)
                })
            }
        }), pt.extend({
            queue: function (e, t, n) {
                var r;
                return e ? (t = (t || "fx") + "queue", r = pt._data(e, t), n && (!r || pt.isArray(n) ? r = pt._data(e, t, pt.makeArray(n)) : r.push(n)), r || []) : void 0
            }, dequeue: function (e, t) {
                t = t || "fx";
                var n = pt.queue(e, t), r = n.length, i = n.shift(), o = pt._queueHooks(e, t), a = function () {
                    pt.dequeue(e, t)
                };
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
            }, _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return pt._data(e, n) || pt._data(e, n, {
                        empty: pt.Callbacks("once memory").add(function () {
                            pt._removeData(e, t + "queue"), pt._removeData(e, n)
                        })
                    })
            }
        }), pt.fn.extend({
            queue: function (e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? pt.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                            var n = pt.queue(this, e, t);
                            pt._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && pt.dequeue(this, e)
                        })
            }, dequeue: function (e) {
                return this.each(function () {
                    pt.dequeue(this, e)
                })
            }, clearQueue: function (e) {
                return this.queue(e || "fx", [])
            }, promise: function (e, t) {
                var n, r = 1, i = pt.Deferred(), o = this, a = this.length, s = function () {
                    --r || i.resolveWith(o, [o])
                };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)n = pt._data(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
                return s(), i.promise(t)
            }
        }), function () {
            var e;
            dt.shrinkWrapBlocks = function () {
                if (null != e)return e;
                e = !1;
                var t, n, r;
                return n = rt.getElementsByTagName("body")[0], n && n.style ? (t = rt.createElement("div"), r = rt.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(rt.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(r), e) : void 0
            }
        }();
        var Ft = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Mt = new RegExp("^(?:([+-])=|)(" + Ft + ")([a-z%]*)$", "i"), Ot = ["Top", "Right", "Bottom", "Left"], Rt = function (e, t) {
            return e = t || e, "none" === pt.css(e, "display") || !pt.contains(e.ownerDocument, e)
        }, Pt = function (e, t, n, r, i, o, a) {
            var s = 0, u = e.length, l = null == n;
            if ("object" === pt.type(n)) {
                i = !0;
                for (s in n)Pt(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, pt.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
                        return l.call(pt(e), n)
                    })), t))for (; u > s; s++)t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        }, Bt = /^(?:checkbox|radio)$/i, Wt = /<([\w:-]+)/, It = /^$|\/(?:java|ecma)script/i, $t = /^\s+/, zt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
        !function () {
            var e = rt.createElement("div"), t = rt.createDocumentFragment(), n = rt.createElement("input");
            e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", dt.leadingWhitespace = 3 === e.firstChild.nodeType, dt.tbody = !e.getElementsByTagName("tbody").length, dt.htmlSerialize = !!e.getElementsByTagName("link").length, dt.html5Clone = "<:nav></:nav>" !== rt.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, t.appendChild(n), dt.appendChecked = n.checked, e.innerHTML = "<textarea>x</textarea>", dt.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, t.appendChild(e), n = rt.createElement("input"), n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), dt.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, dt.noCloneEvent = !!e.addEventListener, e[pt.expando] = 1, dt.attributes = !e.getAttribute(pt.expando)
        }();
        var Xt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: dt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        };
        Xt.optgroup = Xt.option, Xt.tbody = Xt.tfoot = Xt.colgroup = Xt.caption = Xt.thead, Xt.th = Xt.td;
        var Ut = /<|&#?\w+;/, Vt = /<tbody/i;
        !function () {
            var t, n, r = rt.createElement("div");
            for (t in{
                submit: !0,
                change: !0,
                focusin: !0
            })n = "on" + t, (dt[t] = n in e) || (r.setAttribute(n, "t"), dt[t] = r.attributes[n].expando === !1);
            r = null
        }();
        var Yt = /^(?:input|select|textarea)$/i, Jt = /^key/, Gt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Qt = /^(?:focusinfocus|focusoutblur)$/, Kt = /^([^.]*)(?:\.(.+)|)/;
        pt.event = {
            global: {},
            add: function (e, t, n, r, i) {
                var o, a, s, u, l, c, d, f, p, h, g, m = pt._data(e);
                if (m) {
                    for (n.handler && (u = n, n = u.handler, i = u.selector), n.guid || (n.guid = pt.guid++), (a = m.events) || (a = m.events = {}), (c = m.handle) || (c = m.handle = function (e) {
                        return "undefined" == typeof pt || e && pt.event.triggered === e.type ? void 0 : pt.event.dispatch.apply(c.elem, arguments)
                    }, c.elem = e), t = (t || "").match(Dt) || [""], s = t.length; s--;)o = Kt.exec(t[s]) || [], p = g = o[1], h = (o[2] || "").split(".").sort(), p && (l = pt.event.special[p] || {}, p = (i ? l.delegateType : l.bindType) || p, l = pt.event.special[p] || {}, d = pt.extend({
                        type: p,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && pt.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, u), (f = a[p]) || (f = a[p] = [], f.delegateCount = 0, l.setup && l.setup.call(e, r, h, c) !== !1 || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))), l.add && (l.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, d) : f.push(d), pt.event.global[p] = !0);
                    e = null
                }
            },
            remove: function (e, t, n, r, i) {
                var o, a, s, u, l, c, d, f, p, h, g, m = pt.hasData(e) && pt._data(e);
                if (m && (c = m.events)) {
                    for (t = (t || "").match(Dt) || [""], l = t.length; l--;)if (s = Kt.exec(t[l]) || [], p = g = s[1], h = (s[2] || "").split(".").sort(), p) {
                        for (d = pt.event.special[p] || {}, p = (r ? d.delegateType : d.bindType) || p, f = c[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = f.length; o--;)a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, d.remove && d.remove.call(e, a));
                        u && !f.length && (d.teardown && d.teardown.call(e, h, m.handle) !== !1 || pt.removeEvent(e, p, m.handle), delete c[p])
                    } else for (p in c)pt.event.remove(e, p + t[l], n, r, !0);
                    pt.isEmptyObject(c) && (delete m.handle, pt._removeData(e, "events"))
                }
            },
            trigger: function (t, n, r, i) {
                var o, a, s, u, l, c, d, f = [r || rt], p = ct.call(t, "type") ? t.type : t, h = ct.call(t, "namespace") ? t.namespace.split(".") : [];
                if (s = c = r = r || rt, 3 !== r.nodeType && 8 !== r.nodeType && !Qt.test(p + pt.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."), p = h.shift(), h.sort()), a = p.indexOf(":") < 0 && "on" + p, t = t[pt.expando] ? t : new pt.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : pt.makeArray(n, [t]), l = pt.event.special[p] || {}, i || !l.trigger || l.trigger.apply(r, n) !== !1)) {
                    if (!i && !l.noBubble && !pt.isWindow(r)) {
                        for (u = l.delegateType || p, Qt.test(u + p) || (s = s.parentNode); s; s = s.parentNode)f.push(s), c = s;
                        c === (r.ownerDocument || rt) && f.push(c.defaultView || c.parentWindow || e)
                    }
                    for (d = 0; (s = f[d++]) && !t.isPropagationStopped();)t.type = d > 1 ? u : l.bindType || p, o = (pt._data(s, "events") || {})[t.type] && pt._data(s, "handle"), o && o.apply(s, n), o = a && s[a], o && o.apply && Ht(s) && (t.result = o.apply(s, n), t.result === !1 && t.preventDefault());
                    if (t.type = p, !i && !t.isDefaultPrevented() && (!l._default || l._default.apply(f.pop(), n) === !1) && Ht(r) && a && r[p] && !pt.isWindow(r)) {
                        c = r[a], c && (r[a] = null), pt.event.triggered = p;
                        try {
                            r[p]()
                        } catch (g) {
                        }
                        pt.event.triggered = void 0, c && (r[a] = c)
                    }
                    return t.result
                }
            },
            dispatch: function (e) {
                e = pt.event.fix(e);
                var t, n, r, i, o, a = [], s = it.call(arguments), u = (pt._data(this, "events") || {})[e.type] || [], l = pt.event.special[e.type] || {};
                if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                    for (a = pt.event.handlers.call(this, e, u), t = 0; (i = a[t++]) && !e.isPropagationStopped();)for (e.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.rnamespace || e.rnamespace.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((pt.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                    return l.postDispatch && l.postDispatch.call(this, e), e.result
                }
            },
            handlers: function (e, t) {
                var n, r, i, o, a = [], s = t.delegateCount, u = e.target;
                if (s && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))for (; u != this; u = u.parentNode || this)if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                    for (r = [], n = 0; s > n; n++)o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? pt(i, this).index(u) > -1 : pt.find(i, this, null, [u]).length), r[i] && r.push(o);
                    r.length && a.push({elem: u, handlers: r})
                }
                return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
            },
            fix: function (e) {
                if (e[pt.expando])return e;
                var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
                for (a || (this.fixHooks[i] = a = Gt.test(i) ? this.mouseHooks : Jt.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new pt.Event(o), t = r.length; t--;)n = r[t], e[n] = o[n];
                return e.target || (e.target = o.srcElement || rt), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (e, t) {
                    var n, r, i, o = t.button, a = t.fromElement;
                    return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || rt, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
                }
            },
            special: {
                load: {noBubble: !0}, focus: {
                    trigger: function () {
                        if (this !== b() && this.focus)try {
                            return this.focus(), !1
                        } catch (e) {
                        }
                    }, delegateType: "focusin"
                }, blur: {
                    trigger: function () {
                        return this === b() && this.blur ? (this.blur(), !1) : void 0
                    }, delegateType: "focusout"
                }, click: {
                    trigger: function () {
                        return pt.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    }, _default: function (e) {
                        return pt.nodeName(e.target, "a")
                    }
                }, beforeunload: {
                    postDispatch: function (e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function (e, t, n) {
                var r = pt.extend(new pt.Event, n, {type: e, isSimulated: !0});
                pt.event.trigger(r, null, t), r.isDefaultPrevented() && n.preventDefault()
            }
        }, pt.removeEvent = rt.removeEventListener ? function (e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n)
            } : function (e, t, n) {
                var r = "on" + t;
                e.detachEvent && ("undefined" == typeof e[r] && (e[r] = null), e.detachEvent(r, n))
            }, pt.Event = function (e, t) {
            return this instanceof pt.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? y : x) : this.type = e, t && pt.extend(this, t), this.timeStamp = e && e.timeStamp || pt.now(), this[pt.expando] = !0, void 0) : new pt.Event(e, t)
        }, pt.Event.prototype = {
            constructor: pt.Event,
            isDefaultPrevented: x,
            isPropagationStopped: x,
            isImmediatePropagationStopped: x,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = y, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = y, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = y, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, pt.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (e, t) {
            pt.event.special[e] = {
                delegateType: t, bindType: t, handle: function (e) {
                    var n, r = this, i = e.relatedTarget, o = e.handleObj;
                    return (!i || i !== r && !pt.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), dt.submit || (pt.event.special.submit = {
            setup: function () {
                return pt.nodeName(this, "form") ? !1 : (pt.event.add(this, "click._submit keypress._submit", function (e) {
                        var t = e.target, n = pt.nodeName(t, "input") || pt.nodeName(t, "button") ? pt.prop(t, "form") : void 0;
                        n && !pt._data(n, "submit") && (pt.event.add(n, "submit._submit", function (e) {
                            e._submitBubble = !0
                        }), pt._data(n, "submit", !0))
                    }), void 0)
            }, postDispatch: function (e) {
                e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && pt.event.simulate("submit", this.parentNode, e))
            }, teardown: function () {
                return pt.nodeName(this, "form") ? !1 : (pt.event.remove(this, "._submit"), void 0)
            }
        }), dt.change || (pt.event.special.change = {
            setup: function () {
                return Yt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (pt.event.add(this, "propertychange._change", function (e) {
                        "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
                    }), pt.event.add(this, "click._change", function (e) {
                        this._justChanged && !e.isTrigger && (this._justChanged = !1), pt.event.simulate("change", this, e)
                    })), !1) : (pt.event.add(this, "beforeactivate._change", function (e) {
                        var t = e.target;
                        Yt.test(t.nodeName) && !pt._data(t, "change") && (pt.event.add(t, "change._change", function (e) {
                            !this.parentNode || e.isSimulated || e.isTrigger || pt.event.simulate("change", this.parentNode, e)
                        }), pt._data(t, "change", !0))
                    }), void 0)
            }, handle: function (e) {
                var t = e.target;
                return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
            }, teardown: function () {
                return pt.event.remove(this, "._change"), !Yt.test(this.nodeName)
            }
        }), dt.focusin || pt.each({focus: "focusin", blur: "focusout"}, function (e, t) {
            var n = function (e) {
                pt.event.simulate(t, e.target, pt.event.fix(e))
            };
            pt.event.special[t] = {
                setup: function () {
                    var r = this.ownerDocument || this, i = pt._data(r, t);
                    i || r.addEventListener(e, n, !0), pt._data(r, t, (i || 0) + 1)
                }, teardown: function () {
                    var r = this.ownerDocument || this, i = pt._data(r, t) - 1;
                    i ? pt._data(r, t, i) : (r.removeEventListener(e, n, !0), pt._removeData(r, t))
                }
            }
        }), pt.fn.extend({
            on: function (e, t, n, r) {
                return w(this, e, t, n, r)
            }, one: function (e, t, n, r) {
                return w(this, e, t, n, r, 1)
            }, off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj)return r = e.handleObj, pt(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof e) {
                    for (i in e)this.off(i, t, e[i]);
                    return this
                }
                return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = x), this.each(function () {
                    pt.event.remove(this, e, n, t)
                })
            }, trigger: function (e, t) {
                return this.each(function () {
                    pt.event.trigger(e, t, this)
                })
            }, triggerHandler: function (e, t) {
                var n = this[0];
                return n ? pt.event.trigger(e, t, n, !0) : void 0
            }
        });
        var Zt = / jQuery\d+="(?:null|\d+)"/g, en = new RegExp("<(?:" + zt + ")[\\s/>]", "i"), tn = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, nn = /<script|<style|<link/i, rn = /checked\s*(?:[^=]|=\s*.checked.)/i, on = /^true\/(.*)/, an = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, sn = p(rt), un = sn.appendChild(rt.createElement("div"));
        pt.extend({
            htmlPrefilter: function (e) {
                return e.replace(tn, "<$1></$2>")
            }, clone: function (e, t, n) {
                var r, i, o, a, s, u = pt.contains(e.ownerDocument, e);
                if (dt.html5Clone || pt.isXMLDoc(e) || !en.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (un.innerHTML = e.outerHTML, un.removeChild(o = un.firstChild)), !(dt.noCloneEvent && dt.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || pt.isXMLDoc(e)))for (r = h(o), s = h(e), a = 0; null != (i = s[a]); ++a)r[a] && k(i, r[a]);
                if (t)if (n)for (s = s || h(e), r = r || h(o), a = 0; null != (i = s[a]); a++)N(i, r[a]); else N(e, o);
                return r = h(o, "script"), r.length > 0 && g(r, !u && h(e, "script")), r = s = i = null, o
            }, cleanData: function (e, t) {
                for (var n, r, i, o, a = 0, s = pt.expando, u = pt.cache, l = dt.attributes, c = pt.event.special; null != (n = e[a]); a++)if ((t || Ht(n)) && (i = n[s], o = i && u[i])) {
                    if (o.events)for (r in o.events)c[r] ? pt.event.remove(n, r) : pt.removeEvent(n, r, o.handle);
                    u[i] && (delete u[i], l || "undefined" == typeof n.removeAttribute ? n[s] = void 0 : n.removeAttribute(s), nt.push(i))
                }
            }
        }), pt.fn.extend({
            domManip: S, detach: function (e) {
                return A(this, e, !0)
            }, remove: function (e) {
                return A(this, e)
            }, text: function (e) {
                return Pt(this, function (e) {
                    return void 0 === e ? pt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || rt).createTextNode(e))
                }, null, e, arguments.length)
            }, append: function () {
                return S(this, arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = T(this, e);
                        t.appendChild(e)
                    }
                })
            }, prepend: function () {
                return S(this, arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = T(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            }, before: function () {
                return S(this, arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            }, after: function () {
                return S(this, arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            }, empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && pt.cleanData(h(e, !1)); e.firstChild;)e.removeChild(e.firstChild);
                    e.options && pt.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            }, clone: function (e, t) {
                return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                    return pt.clone(this, e, t)
                })
            }, html: function (e) {
                return Pt(this, function (e) {
                    var t = this[0] || {}, n = 0, r = this.length;
                    if (void 0 === e)return 1 === t.nodeType ? t.innerHTML.replace(Zt, "") : void 0;
                    if (!("string" != typeof e || nn.test(e) || !dt.htmlSerialize && en.test(e) || !dt.leadingWhitespace && $t.test(e) || Xt[(Wt.exec(e) || ["", ""])[1].toLowerCase()])) {
                        e = pt.htmlPrefilter(e);
                        try {
                            for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (pt.cleanData(h(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (i) {
                        }
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            }, replaceWith: function () {
                var e = [];
                return S(this, arguments, function (t) {
                    var n = this.parentNode;
                    pt.inArray(this, e) < 0 && (pt.cleanData(h(this)), n && n.replaceChild(t, this))
                }, e)
            }
        }), pt.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (e, t) {
            pt.fn[e] = function (e) {
                for (var n, r = 0, i = [], o = pt(e), a = o.length - 1; a >= r; r++)n = r === a ? this : this.clone(!0), pt(o[r])[t](n), at.apply(i, n.get());
                return this.pushStack(i)
            }
        });
        var ln, cn = {
            HTML: "block",
            BODY: "block"
        }, dn = /^margin/, fn = new RegExp("^(" + Ft + ")(?!px)[a-z%]+$", "i"), pn = function (e, t, n, r) {
            var i, o, a = {};
            for (o in t)a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t)e.style[o] = a[o];
            return i
        }, hn = rt.documentElement;
        !function () {
            function t() {
                var t, c, d = rt.documentElement;
                d.appendChild(u), l.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", n = i = s = !1, r = a = !0, e.getComputedStyle && (c = e.getComputedStyle(l), n = "1%" !== (c || {}).top, s = "2px" === (c || {}).marginLeft, i = "4px" === (c || {width: "4px"}).width, l.style.marginRight = "50%", r = "4px" === (c || {marginRight: "4px"}).marginRight, t = l.appendChild(rt.createElement("div")), t.style.cssText = l.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", l.style.width = "1px", a = !parseFloat((e.getComputedStyle(t) || {}).marginRight), l.removeChild(t)), l.style.display = "none", o = 0 === l.getClientRects().length, o && (l.style.display = "", l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = l.getElementsByTagName("td"), t[0].style.cssText = "margin:0;border:0;padding:0;display:none", o = 0 === t[0].offsetHeight, o && (t[0].style.display = "", t[1].style.display = "none", o = 0 === t[0].offsetHeight)), d.removeChild(u)
            }

            var n, r, i, o, a, s, u = rt.createElement("div"), l = rt.createElement("div");
            l.style && (l.style.cssText = "float:left;opacity:.5", dt.opacity = "0.5" === l.style.opacity, dt.cssFloat = !!l.style.cssFloat, l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", dt.clearCloneStyle = "content-box" === l.style.backgroundClip, u = rt.createElement("div"), u.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", l.innerHTML = "", u.appendChild(l), dt.boxSizing = "" === l.style.boxSizing || "" === l.style.MozBoxSizing || "" === l.style.WebkitBoxSizing, pt.extend(dt, {
                reliableHiddenOffsets: function () {
                    return null == n && t(), o
                }, boxSizingReliable: function () {
                    return null == n && t(), i
                }, pixelMarginRight: function () {
                    return null == n && t(), r
                }, pixelPosition: function () {
                    return null == n && t(), n
                }, reliableMarginRight: function () {
                    return null == n && t(), a
                }, reliableMarginLeft: function () {
                    return null == n && t(), s
                }
            }))
        }();
        var gn, mn, vn = /^(top|right|bottom|left)$/;
        e.getComputedStyle ? (gn = function (t) {
                var n = t.ownerDocument.defaultView;
                return n && n.opener || (n = e), n.getComputedStyle(t)
            }, mn = function (e, t, n) {
                var r, i, o, a, s = e.style;
                return n = n || gn(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== a && void 0 !== a || pt.contains(e.ownerDocument, e) || (a = pt.style(e, t)), n && !dt.pixelMarginRight() && fn.test(a) && dn.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o), void 0 === a ? a : a + ""
            }) : hn.currentStyle && (gn = function (e) {
                return e.currentStyle
            }, mn = function (e, t, n) {
                var r, i, o, a, s = e.style;
                return n = n || gn(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), fn.test(a) && !vn.test(t) && (r = s.left, i = e.runtimeStyle, o = i && i.left, o && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)), void 0 === a ? a : a + "" || "auto"
            });
        var yn = /alpha\([^)]*\)/i, xn = /opacity\s*=\s*([^)]*)/i, bn = /^(none|table(?!-c[ea]).+)/, wn = new RegExp("^(" + Ft + ")(.*)$", "i"), Tn = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, Cn = {
            letterSpacing: "0",
            fontWeight: "400"
        }, En = ["Webkit", "O", "Moz", "ms"], Nn = rt.createElement("div").style;
        pt.extend({
            cssHooks: {
                opacity: {
                    get: function (e, t) {
                        if (t) {
                            var n = mn(e, "opacity");
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
            cssProps: {"float": dt.cssFloat ? "cssFloat" : "styleFloat"},
            style: function (e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var i, o, a, s = pt.camelCase(t), u = e.style;
                    if (t = pt.cssProps[s] || (pt.cssProps[s] = H(s) || s), a = pt.cssHooks[t] || pt.cssHooks[s], void 0 === n)return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t];
                    if (o = typeof n, "string" === o && (i = Mt.exec(n)) && i[1] && (n = f(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (pt.cssNumber[s] ? "" : "px")), dt.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, r)))))try {
                        u[t] = n
                    } catch (l) {
                    }
                }
            },
            css: function (e, t, n, r) {
                var i, o, a, s = pt.camelCase(t);
                return t = pt.cssProps[s] || (pt.cssProps[s] = H(s) || s), a = pt.cssHooks[t] || pt.cssHooks[s], a && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = mn(e, t, r)), "normal" === o && t in Cn && (o = Cn[t]), "" === n || n ? (i = parseFloat(o), n === !0 || isFinite(i) ? i || 0 : o) : o
            }
        }), pt.each(["height", "width"], function (e, t) {
            pt.cssHooks[t] = {
                get: function (e, n, r) {
                    return n ? bn.test(pt.css(e, "display")) && 0 === e.offsetWidth ? pn(e, Tn, function () {
                                return M(e, t, r)
                            }) : M(e, t, r) : void 0
                }, set: function (e, n, r) {
                    var i = r && gn(e);
                    return _(e, n, r ? F(e, t, r, dt.boxSizing && "border-box" === pt.css(e, "boxSizing", !1, i), i) : 0)
                }
            }
        }), dt.opacity || (pt.cssHooks.opacity = {
            get: function (e, t) {
                return xn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            }, set: function (e, t) {
                var n = e.style, r = e.currentStyle, i = pt.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || "";
                n.zoom = 1, (t >= 1 || "" === t) && "" === pt.trim(o.replace(yn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = yn.test(o) ? o.replace(yn, i) : o + " " + i)
            }
        }), pt.cssHooks.marginRight = L(dt.reliableMarginRight, function (e, t) {
            return t ? pn(e, {display: "inline-block"}, mn, [e, "marginRight"]) : void 0
        }), pt.cssHooks.marginLeft = L(dt.reliableMarginLeft, function (e, t) {
            return t ? (parseFloat(mn(e, "marginLeft")) || (pt.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - pn(e, {marginLeft: 0}, function () {
                        return e.getBoundingClientRect().left
                    }) : 0)) + "px" : void 0
        }), pt.each({margin: "", padding: "", border: "Width"}, function (e, t) {
            pt.cssHooks[e + t] = {
                expand: function (n) {
                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + Ot[r] + t] = o[r] || o[r - 2] || o[0];
                    return i
                }
            }, dn.test(e) || (pt.cssHooks[e + t].set = _)
        }), pt.fn.extend({
            css: function (e, t) {
                return Pt(this, function (e, t, n) {
                    var r, i, o = {}, a = 0;
                    if (pt.isArray(t)) {
                        for (r = gn(e), i = t.length; i > a; a++)o[t[a]] = pt.css(e, t[a], !1, r);
                        return o
                    }
                    return void 0 !== n ? pt.style(e, t, n) : pt.css(e, t)
                }, e, t, arguments.length > 1)
            }, show: function () {
                return q(this, !0)
            }, hide: function () {
                return q(this)
            }, toggle: function (e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                        Rt(this) ? pt(this).show() : pt(this).hide()
                    })
            }
        }), pt.Tween = O, O.prototype = {
            constructor: O, init: function (e, t, n, r, i, o) {
                this.elem = e, this.prop = n, this.easing = i || pt.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (pt.cssNumber[n] ? "" : "px")
            }, cur: function () {
                var e = O.propHooks[this.prop];
                return e && e.get ? e.get(this) : O.propHooks._default.get(this)
            }, run: function (e) {
                var t, n = O.propHooks[this.prop];
                return this.pos = t = this.options.duration ? pt.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : O.propHooks._default.set(this), this
            }
        }, O.prototype.init.prototype = O.prototype, O.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = pt.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
                }, set: function (e) {
                    pt.fx.step[e.prop] ? pt.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[pt.cssProps[e.prop]] && !pt.cssHooks[e.prop] ? e.elem[e.prop] = e.now : pt.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }, O.propHooks.scrollTop = O.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, pt.easing = {
            linear: function (e) {
                return e
            }, swing: function (e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }, _default: "swing"
        }, pt.fx = O.prototype.init, pt.fx.step = {};
        var kn, Sn, An = /^(?:toggle|show|hide)$/, Dn = /queueHooks$/;
        pt.Animation = pt.extend($, {
            tweeners: {
                "*": [function (e, t) {
                    var n = this.createTween(e, t);
                    return f(n.elem, e, Mt.exec(t), n), n
                }]
            }, tweener: function (e, t) {
                pt.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Dt);
                for (var n, r = 0, i = e.length; i > r; r++)n = e[r], $.tweeners[n] = $.tweeners[n] || [], $.tweeners[n].unshift(t)
            }, prefilters: [W], prefilter: function (e, t) {
                t ? $.prefilters.unshift(e) : $.prefilters.push(e)
            }
        }), pt.speed = function (e, t, n) {
            var r = e && "object" == typeof e ? pt.extend({}, e) : {
                    complete: n || !n && t || pt.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !pt.isFunction(t) && t
                };
            return r.duration = pt.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in pt.fx.speeds ? pt.fx.speeds[r.duration] : pt.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
                pt.isFunction(r.old) && r.old.call(this), r.queue && pt.dequeue(this, r.queue)
            }, r
        }, pt.fn.extend({
            fadeTo: function (e, t, n, r) {
                return this.filter(Rt).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
            }, animate: function (e, t, n, r) {
                var i = pt.isEmptyObject(e), o = pt.speed(t, n, r), a = function () {
                    var t = $(this, pt.extend({}, e), o);
                    (i || pt._data(this, "finish")) && t.stop(!0)
                };
                return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            }, stop: function (e, t, n) {
                var r = function (e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                    var t = !0, i = null != e && e + "queueHooks", o = pt.timers, a = pt._data(this);
                    if (i) a[i] && a[i].stop && r(a[i]); else for (i in a)a[i] && a[i].stop && Dn.test(i) && r(a[i]);
                    for (i = o.length; i--;)o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                    (t || !n) && pt.dequeue(this, e)
                })
            }, finish: function (e) {
                return e !== !1 && (e = e || "fx"), this.each(function () {
                    var t, n = pt._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = pt.timers, a = r ? r.length : 0;
                    for (n.finish = !0, pt.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; a > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), pt.each(["toggle", "show", "hide"], function (e, t) {
            var n = pt.fn[t];
            pt.fn[t] = function (e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(P(t, !0), e, r, i)
            }
        }), pt.each({
            slideDown: P("show"),
            slideUp: P("hide"),
            slideToggle: P("toggle"),
            fadeIn: {opacity: "show"},
            fadeOut: {opacity: "hide"},
            fadeToggle: {opacity: "toggle"}
        }, function (e, t) {
            pt.fn[e] = function (e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), pt.timers = [], pt.fx.tick = function () {
            var e, t = pt.timers, n = 0;
            for (kn = pt.now(); n < t.length; n++)e = t[n], e() || t[n] !== e || t.splice(n--, 1);
            t.length || pt.fx.stop(), kn = void 0
        }, pt.fx.timer = function (e) {
            pt.timers.push(e), e() ? pt.fx.start() : pt.timers.pop()
        }, pt.fx.interval = 13, pt.fx.start = function () {
            Sn || (Sn = e.setInterval(pt.fx.tick, pt.fx.interval))
        }, pt.fx.stop = function () {
            e.clearInterval(Sn), Sn = null
        }, pt.fx.speeds = {slow: 600, fast: 200, _default: 400}, pt.fn.delay = function (t, n) {
            return t = pt.fx ? pt.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, r) {
                var i = e.setTimeout(n, t);
                r.stop = function () {
                    e.clearTimeout(i)
                }
            })
        }, function () {
            var e, t = rt.createElement("input"), n = rt.createElement("div"), r = rt.createElement("select"), i = r.appendChild(rt.createElement("option"));
            n = rt.createElement("div"), n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], t.setAttribute("type", "checkbox"), n.appendChild(t), e = n.getElementsByTagName("a")[0], e.style.cssText = "top:1px", dt.getSetAttribute = "t" !== n.className, dt.style = /top/.test(e.getAttribute("style")), dt.hrefNormalized = "/a" === e.getAttribute("href"), dt.checkOn = !!t.value, dt.optSelected = i.selected, dt.enctype = !!rt.createElement("form").enctype, r.disabled = !0, dt.optDisabled = !i.disabled, t = rt.createElement("input"), t.setAttribute("value", ""), dt.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), dt.radioValue = "t" === t.value
        }();
        var jn = /\r/g, Ln = /[\x20\t\r\n\f]+/g;
        pt.fn.extend({
            val: function (e) {
                var t, n, r, i = this[0];
                {
                    if (arguments.length)return r = pt.isFunction(e), this.each(function (n) {
                        var i;
                        1 === this.nodeType && (i = r ? e.call(this, n, pt(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : pt.isArray(i) && (i = pt.map(i, function (e) {
                                    return null == e ? "" : e + ""
                                })), t = pt.valHooks[this.type] || pt.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                    });
                    if (i)return t = pt.valHooks[i.type] || pt.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(jn, "") : null == n ? "" : n)
                }
            }
        }), pt.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = pt.find.attr(e, "value");
                        return null != t ? t : pt.trim(pt.text(e)).replace(Ln, " ")
                    }
                }, select: {
                    get: function (e) {
                        for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++)if (n = r[u], !(!n.selected && u !== i || (dt.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && pt.nodeName(n.parentNode, "optgroup"))) {
                            if (t = pt(n).val(), o)return t;
                            a.push(t)
                        }
                        return a
                    }, set: function (e, t) {
                        for (var n, r, i = e.options, o = pt.makeArray(t), a = i.length; a--;)if (r = i[a], pt.inArray(pt.valHooks.option.get(r), o) > -1)try {
                            r.selected = n = !0
                        } catch (s) {
                            r.scrollHeight
                        } else r.selected = !1;
                        return n || (e.selectedIndex = -1), i
                    }
                }
            }
        }), pt.each(["radio", "checkbox"], function () {
            pt.valHooks[this] = {
                set: function (e, t) {
                    return pt.isArray(t) ? e.checked = pt.inArray(pt(e).val(), t) > -1 : void 0
                }
            }, dt.checkOn || (pt.valHooks[this].get = function (e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        });
        var Hn, qn, _n = pt.expr.attrHandle, Fn = /^(?:checked|selected)$/i, Mn = dt.getSetAttribute, On = dt.input;
        pt.fn.extend({
            attr: function (e, t) {
                return Pt(this, pt.attr, e, t, arguments.length > 1)
            }, removeAttr: function (e) {
                return this.each(function () {
                    pt.removeAttr(this, e)
                })
            }
        }), pt.extend({
            attr: function (e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)return "undefined" == typeof e.getAttribute ? pt.prop(e, t, n) : (1 === o && pt.isXMLDoc(e) || (t = t.toLowerCase(), i = pt.attrHooks[t] || (pt.expr.match.bool.test(t) ? qn : Hn)), void 0 !== n ? null === n ? (pt.removeAttr(e, t), void 0) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = pt.find.attr(e, t), null == r ? void 0 : r))
            }, attrHooks: {
                type: {
                    set: function (e, t) {
                        if (!dt.radioValue && "radio" === t && pt.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            }, removeAttr: function (e, t) {
                var n, r, i = 0, o = t && t.match(Dt);
                if (o && 1 === e.nodeType)for (; n = o[i++];)r = pt.propFix[n] || n, pt.expr.match.bool.test(n) ? On && Mn || !Fn.test(n) ? e[r] = !1 : e[pt.camelCase("default-" + n)] = e[r] = !1 : pt.attr(e, n, ""), e.removeAttribute(Mn ? n : r)
            }
        }), qn = {
            set: function (e, t, n) {
                return t === !1 ? pt.removeAttr(e, n) : On && Mn || !Fn.test(n) ? e.setAttribute(!Mn && pt.propFix[n] || n, n) : e[pt.camelCase("default-" + n)] = e[n] = !0, n
            }
        }, pt.each(pt.expr.match.bool.source.match(/\w+/g), function (e, t) {
            var n = _n[t] || pt.find.attr;
            _n[t] = On && Mn || !Fn.test(t) ? function (e, t, r) {
                    var i, o;
                    return r || (o = _n[t], _n[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, _n[t] = o), i
                } : function (e, t, n) {
                    return n ? void 0 : e[pt.camelCase("default-" + t)] ? t.toLowerCase() : null
                }
        }), On && Mn || (pt.attrHooks.value = {
            set: function (e, t, n) {
                return pt.nodeName(e, "input") ? (e.defaultValue = t, void 0) : Hn && Hn.set(e, t, n)
            }
        }), Mn || (Hn = {
            set: function (e, t, n) {
                var r = e.getAttributeNode(n);
                return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
            }
        }, _n.id = _n.name = _n.coords = function (e, t, n) {
            var r;
            return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
        }, pt.valHooks.button = {
            get: function (e, t) {
                var n = e.getAttributeNode(t);
                return n && n.specified ? n.value : void 0
            }, set: Hn.set
        }, pt.attrHooks.contenteditable = {
            set: function (e, t, n) {
                Hn.set(e, "" === t ? !1 : t, n)
            }
        }, pt.each(["width", "height"], function (e, t) {
            pt.attrHooks[t] = {
                set: function (e, n) {
                    return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                }
            }
        })), dt.style || (pt.attrHooks.style = {
            get: function (e) {
                return e.style.cssText || void 0
            }, set: function (e, t) {
                return e.style.cssText = t + ""
            }
        });
        var Rn = /^(?:input|select|textarea|button|object)$/i, Pn = /^(?:a|area)$/i;
        pt.fn.extend({
            prop: function (e, t) {
                return Pt(this, pt.prop, e, t, arguments.length > 1)
            }, removeProp: function (e) {
                return e = pt.propFix[e] || e, this.each(function () {
                    try {
                        this[e] = void 0, delete this[e]
                    } catch (t) {
                    }
                })
            }
        }), pt.extend({
            prop: function (e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)return 1 === o && pt.isXMLDoc(e) || (t = pt.propFix[t] || t, i = pt.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
            }, propHooks: {
                tabIndex: {
                    get: function (e) {
                        var t = pt.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : Rn.test(e.nodeName) || Pn.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            }, propFix: {"for": "htmlFor", "class": "className"}
        }), dt.hrefNormalized || pt.each(["href", "src"], function (e, t) {
            pt.propHooks[t] = {
                get: function (e) {
                    return e.getAttribute(t, 4)
                }
            }
        }), dt.optSelected || (pt.propHooks.selected = {
            get: function (e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            }, set: function (e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), pt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            pt.propFix[this.toLowerCase()] = this
        }), dt.enctype || (pt.propFix.enctype = "encoding");
        var Bn = /[\t\r\n\f]/g;
        pt.fn.extend({
            addClass: function (e) {
                var t, n, r, i, o, a, s, u = 0;
                if (pt.isFunction(e))return this.each(function (t) {
                    pt(this).addClass(e.call(this, t, z(this)))
                });
                if ("string" == typeof e && e)for (t = e.match(Dt) || []; n = this[u++];)if (i = z(n), r = 1 === n.nodeType && (" " + i + " ").replace(Bn, " ")) {
                    for (a = 0; o = t[a++];)r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                    s = pt.trim(r), i !== s && pt.attr(n, "class", s)
                }
                return this
            }, removeClass: function (e) {
                var t, n, r, i, o, a, s, u = 0;
                if (pt.isFunction(e))return this.each(function (t) {
                    pt(this).removeClass(e.call(this, t, z(this)))
                });
                if (!arguments.length)return this.attr("class", "");
                if ("string" == typeof e && e)for (t = e.match(Dt) || []; n = this[u++];)if (i = z(n), r = 1 === n.nodeType && (" " + i + " ").replace(Bn, " ")) {
                    for (a = 0; o = t[a++];)for (; r.indexOf(" " + o + " ") > -1;)r = r.replace(" " + o + " ", " ");
                    s = pt.trim(r), i !== s && pt.attr(n, "class", s)
                }
                return this
            }, toggleClass: function (e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : pt.isFunction(e) ? this.each(function (n) {
                            pt(this).toggleClass(e.call(this, n, z(this), t), t)
                        }) : this.each(function () {
                            var t, r, i, o;
                            if ("string" === n)for (r = 0, i = pt(this), o = e.match(Dt) || []; t = o[r++];)i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else(void 0 === e || "boolean" === n) && (t = z(this), t && pt._data(this, "__className__", t), pt.attr(this, "class", t || e === !1 ? "" : pt._data(this, "__className__") || ""))
                        })
            }, hasClass: function (e) {
                var t, n, r = 0;
                for (t = " " + e + " "; n = this[r++];)if (1 === n.nodeType && (" " + z(n) + " ").replace(Bn, " ").indexOf(t) > -1)return !0;
                return !1
            }
        }), pt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
            pt.fn[t] = function (e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), pt.fn.extend({
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        });
        var Wn = e.location, In = pt.now(), $n = /\?/, zn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        pt.parseJSON = function (t) {
            if (e.JSON && e.JSON.parse)return e.JSON.parse(t + "");
            var n, r = null, i = pt.trim(t + "");
            return i && !pt.trim(i.replace(zn, function (e, t, i, o) {
                return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !o - !i, "")
            })) ? Function("return " + i)() : pt.error("Invalid JSON: " + t)
        }, pt.parseXML = function (t) {
            var n, r;
            if (!t || "string" != typeof t)return null;
            try {
                e.DOMParser ? (r = new e.DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
            } catch (i) {
                n = void 0
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || pt.error("Invalid XML: " + t), n
        };
        var Xn = /#.*$/, Un = /([?&])_=[^&]*/, Vn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Yn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Jn = /^(?:GET|HEAD)$/, Gn = /^\/\//, Qn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Kn = {}, Zn = {}, er = "*/".concat("*"), tr = Wn.href, nr = Qn.exec(tr.toLowerCase()) || [];
        pt.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: tr,
                type: "GET",
                isLocal: Yn.test(nr[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": er,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                converters: {"* text": String, "text html": !0, "text json": pt.parseJSON, "text xml": pt.parseXML},
                flatOptions: {url: !0, context: !0}
            },
            ajaxSetup: function (e, t) {
                return t ? V(V(e, pt.ajaxSettings), t) : V(pt.ajaxSettings, e)
            },
            ajaxPrefilter: X(Kn),
            ajaxTransport: X(Zn),
            ajax: function (t, n) {
                function r(t, n, r, i) {
                    var o, d, y, x, w, C = n;
                    2 !== b && (b = 2, u && e.clearTimeout(u), c = void 0, s = i || "", T.readyState = t > 0 ? 4 : 0, o = t >= 200 && 300 > t || 304 === t, r && (x = Y(f, T, r)), x = J(f, x, T, o), o ? (f.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (pt.lastModified[a] = w), w = T.getResponseHeader("etag"), w && (pt.etag[a] = w)), 204 === t || "HEAD" === f.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = x.state, d = x.data, y = x.error, o = !y)) : (y = C, (t || !C) && (C = "error", 0 > t && (t = 0))), T.status = t, T.statusText = (n || C) + "", o ? g.resolveWith(p, [d, C, T]) : g.rejectWith(p, [T, C, y]), T.statusCode(v), v = void 0, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [T, f, o ? d : y]), m.fireWith(p, [T, C]), l && (h.trigger("ajaxComplete", [T, f]), --pt.active || pt.event.trigger("ajaxStop")))
                }

                "object" == typeof t && (n = t, t = void 0), n = n || {};
                var i, o, a, s, u, l, c, d, f = pt.ajaxSetup({}, n), p = f.context || f, h = f.context && (p.nodeType || p.jquery) ? pt(p) : pt.event, g = pt.Deferred(), m = pt.Callbacks("once memory"), v = f.statusCode || {}, y = {}, x = {}, b = 0, w = "canceled", T = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (2 === b) {
                            if (!d)for (d = {}; t = Vn.exec(s);)d[t[1].toLowerCase()] = t[2];
                            t = d[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function () {
                        return 2 === b ? s : null
                    },
                    setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return b || (e = x[n] = x[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function (e) {
                        return b || (f.mimeType = e), this
                    },
                    statusCode: function (e) {
                        var t;
                        if (e)if (2 > b)for (t in e)v[t] = [v[t], e[t]]; else T.always(e[T.status]);
                        return this
                    },
                    abort: function (e) {
                        var t = e || w;
                        return c && c.abort(t), r(0, t), this
                    }
                };
                if (g.promise(T).complete = m.add, T.success = T.done, T.error = T.fail, f.url = ((t || f.url || tr) + "").replace(Xn, "").replace(Gn, nr[1] + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = pt.trim(f.dataType || "*").toLowerCase().match(Dt) || [""], null == f.crossDomain && (i = Qn.exec(f.url.toLowerCase()), f.crossDomain = !(!i || i[1] === nr[1] && i[2] === nr[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (nr[3] || ("http:" === nr[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = pt.param(f.data, f.traditional)), U(Kn, f, n, T), 2 === b)return T;
                l = pt.event && f.global, l && 0 === pt.active++ && pt.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !Jn.test(f.type), a = f.url, f.hasContent || (f.data && (a = f.url += ($n.test(a) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = Un.test(a) ? a.replace(Un, "$1_=" + In++) : a + ($n.test(a) ? "&" : "?") + "_=" + In++)), f.ifModified && (pt.lastModified[a] && T.setRequestHeader("If-Modified-Since", pt.lastModified[a]), pt.etag[a] && T.setRequestHeader("If-None-Match", pt.etag[a])), (f.data && f.hasContent && f.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", f.contentType), T.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + er + "; q=0.01" : "") : f.accepts["*"]);
                for (o in f.headers)T.setRequestHeader(o, f.headers[o]);
                if (f.beforeSend && (f.beforeSend.call(p, T, f) === !1 || 2 === b))return T.abort();
                w = "abort";
                for (o in{success: 1, error: 1, complete: 1})T[o](f[o]);
                if (c = U(Zn, f, n, T)) {
                    if (T.readyState = 1, l && h.trigger("ajaxSend", [T, f]), 2 === b)return T;
                    f.async && f.timeout > 0 && (u = e.setTimeout(function () {
                        T.abort("timeout")
                    }, f.timeout));
                    try {
                        b = 1, c.send(y, r)
                    } catch (C) {
                        if (!(2 > b))throw C;
                        r(-1, C)
                    }
                } else r(-1, "No Transport");
                return T
            },
            getJSON: function (e, t, n) {
                return pt.get(e, t, n, "json")
            },
            getScript: function (e, t) {
                return pt.get(e, void 0, t, "script")
            }
        }), pt.each(["get", "post"], function (e, t) {
            pt[t] = function (e, n, r, i) {
                return pt.isFunction(n) && (i = i || r, r = n, n = void 0), pt.ajax(pt.extend({
                    url: e,
                    type: t,
                    dataType: i,
                    data: n,
                    success: r
                }, pt.isPlainObject(e) && e))
            }
        }), pt._evalUrl = function (e) {
            return pt.ajax({url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0})
        }, pt.fn.extend({
            wrapAll: function (e) {
                if (pt.isFunction(e))return this.each(function (t) {
                    pt(this).wrapAll(e.call(this, t))
                });
                if (this[0]) {
                    var t = pt(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            }, wrapInner: function (e) {
                return pt.isFunction(e) ? this.each(function (t) {
                        pt(this).wrapInner(e.call(this, t))
                    }) : this.each(function () {
                        var t = pt(this), n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
            }, wrap: function (e) {
                var t = pt.isFunction(e);
                return this.each(function (n) {
                    pt(this).wrapAll(t ? e.call(this, n) : e)
                })
            }, unwrap: function () {
                return this.parent().each(function () {
                    pt.nodeName(this, "body") || pt(this).replaceWith(this.childNodes)
                }).end()
            }
        }), pt.expr.filters.hidden = function (e) {
            return dt.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : Q(e)
        }, pt.expr.filters.visible = function (e) {
            return !pt.expr.filters.hidden(e)
        };
        var rr = /%20/g, ir = /\[\]$/, or = /\r?\n/g, ar = /^(?:submit|button|image|reset|file)$/i, sr = /^(?:input|select|textarea|keygen)/i;
        pt.param = function (e, t) {
            var n, r = [], i = function (e, t) {
                t = pt.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
            if (void 0 === t && (t = pt.ajaxSettings && pt.ajaxSettings.traditional), pt.isArray(e) || e.jquery && !pt.isPlainObject(e)) pt.each(e, function () {
                i(this.name, this.value)
            }); else for (n in e)K(n, e[n], t, i);
            return r.join("&").replace(rr, "+")
        }, pt.fn.extend({
            serialize: function () {
                return pt.param(this.serializeArray())
            }, serializeArray: function () {
                return this.map(function () {
                    var e = pt.prop(this, "elements");
                    return e ? pt.makeArray(e) : this
                }).filter(function () {
                    var e = this.type;
                    return this.name && !pt(this).is(":disabled") && sr.test(this.nodeName) && !ar.test(e) && (this.checked || !Bt.test(e))
                }).map(function (e, t) {
                    var n = pt(this).val();
                    return null == n ? null : pt.isArray(n) ? pt.map(n, function (e) {
                                return {name: t.name, value: e.replace(or, "\r\n")}
                            }) : {name: t.name, value: n.replace(or, "\r\n")}
                }).get()
            }
        }), pt.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
                return this.isLocal ? et() : rt.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || et()
            } : Z;
        var ur = 0, lr = {}, cr = pt.ajaxSettings.xhr();
        e.attachEvent && e.attachEvent("onunload", function () {
            for (var e in lr)lr[e](void 0, !0)
        }), dt.cors = !!cr && "withCredentials" in cr, cr = dt.ajax = !!cr, cr && pt.ajaxTransport(function (t) {
            if (!t.crossDomain || dt.cors) {
                var n;
                return {
                    send: function (r, i) {
                        var o, a = t.xhr(), s = ++ur;
                        if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)for (o in t.xhrFields)a[o] = t.xhrFields[o];
                        t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                        for (o in r)void 0 !== r[o] && a.setRequestHeader(o, r[o] + "");
                        a.send(t.hasContent && t.data || null), n = function (e, r) {
                            var o, u, l;
                            if (n && (r || 4 === a.readyState))if (delete lr[s], n = void 0, a.onreadystatechange = pt.noop, r) 4 !== a.readyState && a.abort(); else {
                                l = {}, o = a.status, "string" == typeof a.responseText && (l.text = a.responseText);
                                try {
                                    u = a.statusText
                                } catch (c) {
                                    u = ""
                                }
                                o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = l.text ? 200 : 404
                            }
                            l && i(o, u, l, a.getAllResponseHeaders())
                        }, t.async ? 4 === a.readyState ? e.setTimeout(n) : a.onreadystatechange = lr[s] = n : n()
                    }, abort: function () {
                        n && n(void 0, !0)
                    }
                }
            }
        }), pt.ajaxSetup({
            accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
            contents: {script: /\b(?:java|ecma)script\b/},
            converters: {
                "text script": function (e) {
                    return pt.globalEval(e), e
                }
            }
        }), pt.ajaxPrefilter("script", function (e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
        }), pt.ajaxTransport("script", function (e) {
            if (e.crossDomain) {
                var t, n = rt.head || pt("head")[0] || rt.documentElement;
                return {
                    send: function (r, i) {
                        t = rt.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                            (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                        }, n.insertBefore(t, n.firstChild)
                    }, abort: function () {
                        t && t.onload(void 0, !0)
                    }
                }
            }
        });
        var dr = [], fr = /(=)\?(?=&|$)|\?\?/;
        pt.ajaxSetup({
            jsonp: "callback", jsonpCallback: function () {
                var e = dr.pop() || pt.expando + "_" + In++;
                return this[e] = !0, e
            }
        }), pt.ajaxPrefilter("json jsonp", function (t, n, r) {
            var i, o, a, s = t.jsonp !== !1 && (fr.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && fr.test(t.data) && "data");
            return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = pt.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(fr, "$1" + i) : t.jsonp !== !1 && (t.url += ($n.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
                    return a || pt.error(i + " was not called"), a[0]
                }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
                    a = arguments
                }, r.always(function () {
                    void 0 === o ? pt(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, dr.push(i)), a && pt.isFunction(o) && o(a[0]), a = o = void 0
                }), "script") : void 0
        }), pt.parseHTML = function (e, t, n) {
            if (!e || "string" != typeof e)return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || rt;
            var r = Tt.exec(e), i = !n && [];
            return r ? [t.createElement(r[1])] : (r = v([e], t, i), i && i.length && pt(i).remove(), pt.merge([], r.childNodes))
        };
        var pr = pt.fn.load;
        pt.fn.load = function (e, t, n) {
            if ("string" != typeof e && pr)return pr.apply(this, arguments);
            var r, i, o, a = this, s = e.indexOf(" ");
            return s > -1 && (r = pt.trim(e.slice(s, e.length)), e = e.slice(0, s)), pt.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && pt.ajax({
                url: e,
                type: i || "GET",
                dataType: "html",
                data: t
            }).done(function (e) {
                o = arguments, a.html(r ? pt("<div>").append(pt.parseHTML(e)).find(r) : e)
            }).always(n && function (e, t) {
                    a.each(function () {
                        n.apply(this, o || [e.responseText, t, e])
                    })
                }), this
        }, pt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
            pt.fn[t] = function (e) {
                return this.on(t, e)
            }
        }), pt.expr.filters.animated = function (e) {
            return pt.grep(pt.timers, function (t) {
                return e === t.elem
            }).length
        }, pt.offset = {
            setOffset: function (e, t, n) {
                var r, i, o, a, s, u, l, c = pt.css(e, "position"), d = pt(e), f = {};
                "static" === c && (e.style.position = "relative"), s = d.offset(), o = pt.css(e, "top"), u = pt.css(e, "left"), l = ("absolute" === c || "fixed" === c) && pt.inArray("auto", [o, u]) > -1, l ? (r = d.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), pt.isFunction(t) && (t = t.call(e, n, pt.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : d.css(f)
            }
        }, pt.fn.extend({
            offset: function (e) {
                if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                        pt.offset.setOffset(this, e, t)
                    });
                var t, n, r = {top: 0, left: 0}, i = this[0], o = i && i.ownerDocument;
                if (o)return t = o.documentElement, pt.contains(t, i) ? ("undefined" != typeof i.getBoundingClientRect && (r = i.getBoundingClientRect()), n = tt(o), {
                        top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                        left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                    }) : r
            }, position: function () {
                if (this[0]) {
                    var e, t, n = {top: 0, left: 0}, r = this[0];
                    return "fixed" === pt.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), pt.nodeName(e[0], "html") || (n = e.offset()), n.top += pt.css(e[0], "borderTopWidth", !0), n.left += pt.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - n.top - pt.css(r, "marginTop", !0),
                        left: t.left - n.left - pt.css(r, "marginLeft", !0)
                    }
                }
            }, offsetParent: function () {
                return this.map(function () {
                    for (var e = this.offsetParent; e && !pt.nodeName(e, "html") && "static" === pt.css(e, "position");)e = e.offsetParent;
                    return e || hn
                })
            }
        }), pt.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
            var n = /Y/.test(t);
            pt.fn[e] = function (r) {
                return Pt(this, function (e, r, i) {
                    var o = tt(e);
                    return void 0 === i ? o ? t in o ? o[t] : o.document.documentElement[r] : e[r] : (o ? o.scrollTo(n ? pt(o).scrollLeft() : i, n ? i : pt(o).scrollTop()) : e[r] = i, void 0)
                }, e, r, arguments.length, null)
            }
        }), pt.each(["top", "left"], function (e, t) {
            pt.cssHooks[t] = L(dt.pixelPosition, function (e, n) {
                return n ? (n = mn(e, t), fn.test(n) ? pt(e).position()[t] + "px" : n) : void 0
            })
        }), pt.each({Height: "height", Width: "width"}, function (e, t) {
            pt.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
                pt.fn[r] = function (r, i) {
                    var o = arguments.length && (n || "boolean" != typeof r), a = n || (r === !0 || i === !0 ? "margin" : "border");
                    return Pt(this, function (t, n, r) {
                        var i;
                        return pt.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? pt.css(t, n, a) : pt.style(t, n, r, a)
                    }, t, o ? r : void 0, o, null)
                }
            })
        }), pt.fn.extend({
            bind: function (e, t, n) {
                return this.on(e, null, t, n)
            }, unbind: function (e, t) {
                return this.off(e, null, t)
            }, delegate: function (e, t, n, r) {
                return this.on(t, e, n, r)
            }, undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }), pt.fn.size = function () {
            return this.length
        }, pt.fn.andSelf = pt.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return pt
        });
        var hr = e.jQuery, gr = e.$;
        return pt.noConflict = function (t) {
            return e.$ === pt && (e.$ = gr), t && e.jQuery === pt && (e.jQuery = hr), pt
        }, t || (e.jQuery = e.$ = pt), pt
    })
});
;define("js/common/music/jquery.lazyload.js", function (e) {
    var t = e("js/common/music/jquery.js");
    !function (e, t, n, i) {
        var o = e(t);
        e.fn.lazyload = function (n) {
            function r() {
                var t = 0;
                f.each(function () {
                    var n = e(this);
                    if (!l.skip_invisible || n.is(":visible"))if (e.abovethetop(this, l) || e.leftofbegin(this, l)); else if (e.belowthefold(this, l) || e.rightoffold(this, l)) {
                        if (++t > l.failure_limit)return !1
                    } else n.trigger("appear")
                })
            }

            var f = this, l = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: t,
                data_attribute: "original",
                error_img: "//y.gtimg.cn/mediastyle/global/img/playlist_300.png",
                skip_invisible: !0,
                appear: null,
                load: null
            };
            return n && (i !== n.failurelimit && (n.failure_limit = n.failurelimit, delete n.failurelimit), i !== n.effectspeed && (n.effect_speed = n.effectspeed, delete n.effectspeed), e.extend(l, n)), $container = l.container === i || l.container === t ? o : e(l.container), 0 === l.event.indexOf("scroll") && $container.bind(l.event, function () {
                return r()
            }), this.each(function () {
                var t = this, n = e(t);
                t.loaded = !1, n.one("appear", function () {
                    if (!this.loaded) {
                        if (l.appear) {
                            var i = f.length;
                            l.appear.call(t, i, l)
                        }
                        e("<img />").bind("load", function () {
                            n.hide().parent().parent().css("visibility", "visible"), n.css("visibility", "visible").attr("src", n.data(l.data_attribute))[l.effect](l.effect_speed), t.loaded = !0;
                            var i = e.grep(f, function (e) {
                                return !e.loaded
                            });
                            if (f = e(i), l.load) {
                                var o = f.length;
                                l.load.call(t, o, l)
                            }
                        }).one("error", function () {
                            e(this).attr("src", l.error_img)
                        }).attr("src", n.data(l.data_attribute))
                    }
                }), 0 !== l.event.indexOf("scroll") && n.bind(l.event, function () {
                    t.loaded || n.trigger("appear")
                })
            }), o.bind("resize", function () {
                r()
            }), this.one("error", function () {
                e(this).attr("src", l.error_img)
            }), r(), this
        }, e.belowthefold = function (n, r) {
            var f;
            return f = r.container === i || r.container === t ? o.height() + o.scrollTop() : $container.offset().top + $container.height(), f <= e(n).offset().top - r.threshold
        }, e.rightoffold = function (n, r) {
            var f;
            return f = r.container === i || r.container === t ? o.width() + o.scrollLeft() : $container.offset().left + $container.width(), f <= e(n).offset().left - r.threshold
        }, e.abovethetop = function (n, r) {
            var f;
            return f = r.container === i || r.container === t ? o.scrollTop() : $container.offset().top, f >= e(n).offset().top + r.threshold + e(n).height()
        }, e.leftofbegin = function (n, r) {
            var f;
            return f = r.container === i || r.container === t ? o.scrollLeft() : $container.offset().left, f >= e(n).offset().left + r.threshold + e(n).width()
        }, e.inviewport = function (t, n) {
            return !(e.rightofscreen(t, n) || e.leftofscreen(t, n) || e.belowthefold(t, n) || e.abovethetop(t, n))
        }, e.extend(e.expr[":"], {
            "below-the-fold": function (n) {
                return e.belowthefold(n, {threshold: 0, container: t})
            }, "above-the-top": function (n) {
                return !e.belowthefold(n, {threshold: 0, container: t})
            }, "right-of-screen": function (n) {
                return e.rightoffold(n, {threshold: 0, container: t})
            }, "left-of-screen": function (n) {
                return !e.rightoffold(n, {threshold: 0, container: t})
            }, "in-viewport": function (n) {
                return !e.inviewport(n, {threshold: 0, container: t})
            }, "above-the-fold": function (n) {
                return !e.belowthefold(n, {threshold: 0, container: t})
            }, "right-of-fold": function (n) {
                return e.rightoffold(n, {threshold: 0, container: t})
            }, "left-of-fold": function (n) {
                return !e.rightoffold(n, {threshold: 0, container: t})
            }
        })
    }(t, window, document)
});
;define("js/common/music/cookie.js", function (e) {
    var n = e("js/common/config.js"), o = {
        set: function (e, o, t, c, i) {
            if (i) {
                var r = new Date;
                r.setTime(r.getTime() + 36e5 * i)
            }
            return document.cookie = e + "=" + escape(o) + "; " + (i ? "expires=" + r.toGMTString() + "; " : "") + (c ? "path=" + c + "; " : "path=/; ") + (t ? "domain=" + t + ";" : "domain=" + n.DCCookieDomain + ";"), !0
        }, get: function (e) {
            var n, o = function (e) {
                if (!e)return e;
                for (; e != unescape(e);)e = unescape(e);
                for (var n = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], o = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], t = 0; t < n.length; t++)e = e.replace(new RegExp(n[t], "gi"), o[t]);
                return e
            };
            return o((n = document.cookie.match(RegExp("(^|;\\s*)" + e + "=([^;]*)(;|$)"))) ? unescape(n[2]) : "")
        }, del: function (e, o, t) {
            document.cookie = e + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (t ? "path=" + t + "; " : "path=/; ") + (o ? "domain=" + o + ";" : "domain=" + n.DCCookieDomain + ";")
        }, getACSRFToken: function () {
            function e(e) {
                for (var n = 5381, o = 0, t = e.length; t > o; ++o)n += (n << 5) + e.charCodeAt(o);
                return 2147483647 & n
            }

            return e(o.get("p_skey") || o.get("skey") || o.get("p_lskey") || o.get("lskey"))
        }
    };
    return o
});
;define("js/common/music/formsender.js", function (e) {
    function t() {
        var e = a.get("uin"), t = 0;
        return "" == e ? t : t = 0 == e.indexOf("o") ? parseInt(e.substring(1, e.length), 10) : parseInt(e, 10)
    }

    var n = e("js/common/music/jquery.js"), r = e("js/common/userAgent.js"), i = e("js/common/music/lib/base.js"), o = function () {
    }, a = e("js/common/music/cookie.js"), s = document, c = location.protocol + "//imgcache.qq.com/music/miniportal_v4/tool/html/fp_gbk.html", d = function (e) {
        return e && (r.ie > 8 && "SCRIPT" == e.tagName && (e.src = ""), e.removeNode ? e.removeNode(!0) : e.parentNode && e.parentNode.removeChild(e)), e = null
    }, m = i.extend({
        attrs: {_tag: "FormSender"},
        initialize: function (e, r, i, s) {
            this.name = "_fpInstence_" + m.counter, m.instance[this.name] = this, m.counter++;
            var d = String(s).toLowerCase();
            s = "utf-8" == d || "gbk" == d || "gb2312" == d || "gb18030" == d ? d : "gb2312";
            var u = {
                loginUin: t(),
                hostUin: 0,
                format: "fs",
                inCharset: "GB2312",
                outCharset: "GB2312",
                notice: 0,
                platform: "yqq",
                needNewCode: 0,
                g_tk: a.getACSRFToken()
            };
            if (n.extend(u, m._data), n.isPlainObject(i)) n.extend(u, i); else if ("string" == n.type(i)) {
                for (var l = {}, p = i.split("&"), f = 0, h = p.length; h > f; f++) {
                    var g = p[f].split("=");
                    l[g[0]] = g[1]
                }
                n.extend(u, l)
            }
            u.outCharset = s, "utf-8" == s && (u.utf8 = 1, u.outCharset = "utf8"), u.inCharset.toLowerCase().indexOf("utf") > -1 && (u.inCharset = "utf8"), this.charset = s, this.uri = e, this.method = r || "POST", this.data = u, this.proxyURL = "utf-8" == d ? c.replace(/_gbk/, "_utf8") : c, this._sender = null, this.onSuccess = o, this.onError = o, this.startTime = +new Date, this.reportRate = 1
        },
        send: function () {
            if (s.domain = "qq.com", null === this._sender || void 0 === this._sender) {
                var e = s.createElement("iframe");
                e.id = e.name = "_fp_frm_" + this.name, e.style.cssText = "width:0;height:0;border-width:0;display:none;", e.callback = function (e) {
                    return function () {
                        e.resultArgs = arguments, e.msg = "ok", e.onSuccess.apply(e, arguments), m._clear(e)
                    }
                }(this);
                var t = function (e) {
                    var t = function () {
                        e.resultArgs = arguments, e.msg = m._errCodeMap[999].msg, m._pluginsRunner("onErrorHandler", e), m._clear(e), e.onError()
                    };
                    return function () {
                        "object" != typeof e.resultArgs && ("complete" == this.readyState || "undefined" == typeof this.readyState) && "sended".indexOf(this.state) > -1 && (this.onload = this.onreadystatechange = null, t())
                    }
                }(this);
                document.body.appendChild(e), e.errorCallback = t, e.onload = e.onreadystatechange = t, e.state = "initing", this._sender = e
            }
            var n, i, o = this, c = r.ie, d = o.data;
            return i = '<!DOCTYPE html><html lang="zh-cn"><head><meta http-equiv="content-type" content="text/html; charset=' + o.charset + '" /><meta charset="' + o.charset + '" />', c && (n = 'javascript:document.open();document.domain="' + s.domain + '";var me=parent.MUSIC.FormSender.instance["' + o.name + '"];document.write(me.ifrHTML);document.close();'), i = i + '<script type="text/javascript">' + (c && 'document.charset="' + o.charset + '"' || "") + ';document.domain="' + s.domain + '";frameElement.submited=void(0);frameElement.state="sending";</script></head><body>', i = i + '<form action="' + o.uri + (o.uri.indexOf("?") > -1 ? "&" : "?") + "g_tk=" + a.getACSRFToken() + '" accept-charset="' + o.charset + '" id="p" enctype="application/x-www-form-urlencoded;charset=' + o.charset + '" method="post">', i += '<input type="hidden" name="qzreferrer" id="qzreferrer" />', i = i + '</form><script type="text/javascript">var me=parent.MUSIC.FormSender.instance["' + o.name + '"],doc=document,f=doc.getElementById("p"),d=me.jsonData,fg=doc.createDocumentFragment();if(typeof d=="string"){var l=d.split("&");for(var i=0;i<l.length;i++){var kv=l[i].split("=");var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=kv[0];ipt.value=decodeURIComponent(kv[1]);fg.appendChild(ipt);}}else{for(var i in d){var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=i;ipt.value=d[i];fg.appendChild(ipt);}}f.appendChild(fg);doc.getElementById("qzreferrer").value=parent.location.href;f.submit();frameElement.submited=true;frameElement.state="sended";</script></body></html>', o.ifrHTML = i, o.ifrurl = n, o.jsonData = d, c ? setTimeout(function (e) {
                    return function () {
                        e._sender.state = "inited", e._sender.src = c > 8 && s.documentMode > 8 ? e.ifrurl : e.proxyURL
                    }
                }(o), 10) : e.src = o.proxyURL, !0
        },
        Statics: {
            _data: {loginUin: t(), platform: "yqq"},
            instance: {},
            counter: 0,
            _errCodeMap: {999: {msg: "Connection or Server error"}},
            pluginsPool: {formHandler: [], onErrorHandler: [], onRequestComplete: []},
            _pluginsRunner: function (e, t) {
                var n, r = m, i = r.pluginsPool[e], o = t;
                if (i && (n = i.length))for (var a = 0; n > a; ++a)"function" == typeof i[a] && (o = i[a](o));
                return o
            },
            _clear: function (e) {
                e._sender = e._sender.callback = e._sender.errorCallback = null, r.safari || r.opera ? setTimeout(function () {
                        d(s.getElementById("_fp_frm_" + e.name))
                    }, 50) : d(s.getElementById("_fp_frm_" + e.name)), e.endTime = +new Date, m._pluginsRunner("onRequestComplete", e), e.instanceForm = null
            }
        }
    });
    return function () {
        var e = m;
        e && e.pluginsPool && e.pluginsPool.formHandler.push(function (e) {
            if (e && e.action.indexOf("g_tk") < 0) {
                var t = n.trim(e.action);
                t += (t.indexOf("?") > -1 ? "&" : "?") + "g_tk=" + a.getACSRFToken(), e.action = t
            }
            return e
        })
    }(), m
});
;define("js/common/music/storage.js", function (t) {
    var e = t("js/common/config.js"), n = {
        helperUrl: e.StorageHelperPage,
        ifrCallback: null,
        instance: null,
        getInstance: function () {
            var t = this.instance;
            return t ? t : null
        }
    };
    return n.create = function (t, e) {
        if ("function" == typeof t) {
            e = e || {};
            var r = null, o = e.dbname || "music_database", a = e.domain || document.domain, i = e.helper || n.helperUrl, u = e.share || !1, c = ["globalStorage", "localStorage", "userData"], l = n, s = function (e, a) {
                var u = document.createElement("iframe");
                u.id = "userData_iframe_" + o, u.style.display = "none", u.src = i, n.ifrCallback = function () {
                    r = u.contentWindow.create(o, a), r ? t(e) : t(!1)
                }, document.body.appendChild(u)
            }, f = function (t) {
                var e = new Date;
                return t = t || 1095, e.setDate(e.getDate() + t), e.toUTCString()
            }, g = {};
            g.userData = {
                isSupport: !!window.ActiveXObject, type: 1, get: function (t, e) {
                    r.load(o);
                    var n = r.getAttribute(t);
                    return "function" == typeof e && e(n), n
                }, set: function (t, e) {
                    try {
                        return r.load(o), r.setAttribute(t, e), r.save(o), !0
                    } catch (n) {
                        return !1
                    }
                }, remove: function (t) {
                    r.load(o), r.removeAttribute(t), r.save(o)
                }, init: function () {
                    if (u)return s(this, "userData"), void 0;
                    var e = document.documentElement || document.body;
                    e.addBehavior("#default#userdata"), e.load(o), r = e, t(this)
                }, clear: function () {
                    try {
                        return r.load(o), r.expires = new Date(123456789e4).toUTCString(), r.save(o), r.load(o), r.expires = f(), r.save(o), !0
                    } catch (t) {
                        return !1
                    }
                }
            }, g.globalStorage = {
                isSupport: !!window.globalStorage, type: 2, get: function (t, e) {
                    var n = (n = r.getItem(t)) && n.value ? n.value : n;
                    return "function" == typeof e && e(n), n
                }, set: function (t, e) {
                    try {
                        return r.setItem(t, e), !0
                    } catch (n) {
                        return !1
                    }
                }, remove: function (t) {
                    r.removeItem(t)
                }, init: function () {
                    (r = window.globalStorage[u ? a : document.domain]) ? t(this) : t(!1)
                }, clear_flag: !1, clear_arr: [], clear: function (t) {
                    var e = this.clear_arr;
                    if (!this.clear_flag) {
                        this.clear_flag = !0;
                        for (var n in r)e.push(n);
                        var o = function (n) {
                            n = n > e.length ? e.length : n;
                            for (var a = 0; n > a; a++) {
                                var i = e.shift();
                                r.removeItem(i)
                            }
                            e.length > 0 ? setTimeout(function () {
                                    o(n)
                                }, 50) : "function" == typeof t && t()
                        };
                        o(5)
                    }
                }
            }, g.localStorage = {
                isSupport: !!window.localStorage,
                type: 3,
                get: g.globalStorage.get,
                set: g.globalStorage.set,
                remove: g.globalStorage.remove,
                init: function () {
                    return u ? (s(this, "localStorage"), void 0) : ((r = window.localStorage) ? t(this) : t(!1), void 0)
                },
                clear: function () {
                    r.clear()
                }
            }, function () {
                for (var e = 0, n = c.length; n > e; e++)if (g[c[e]].isSupport)return (l.instance = g[c[e]]).init(), void 0;
                t(!1)
            }()
        }
    }, function (t) {
        var e, n = !1, r = [];
        t.setOptions = function (t) {
            e = t
        }, t.init = function () {
            var o = arguments;
            return n ? (r.push([o[0], o[1]]), void 0) : (r.push([o[0], o[1]]), n = !0, t.create(function (e) {
                    var n;
                    if (e)for (t.get = e.get, t.set = e.set, t.remove = e.remove, t.clear = e.clear; n = r.pop();)e[n[0]].apply(null, n[1])
                }, e), void 0)
        }, t.get = function () {
            t.init("get", arguments)
        }, t.set = function () {
            t.init("set", arguments)
        }, t.remove = function () {
            t.init("remove", arguments)
        }, t.clear = function () {
            t.init("clear", arguments)
        }
    }(n), n
});
;define("js/common/music/ping.js", function (require, exports, module) {
    function tcss(e) {
        this.url = [], this.init(e)
    }

    function setUrlMap(e) {
        $.isArray(e) && ($.isArray(e[0]) ? $.merge(_urlMap, e) : _urlMap.push(e))
    }

    function setPathMap(e) {
        $.isArray(e) && ($.isArray(e[0]) ? $.merge(_pathMap, e) : _pathMap.push(e))
    }

    function pgvMain(e, t) {
        var s = "";
        t ? (s = t, _ver = "tcsso.3.1.5") : (s = e, _ver = "tcss.3.1.5");
        try {
            if (1 != _rep)return;
            _rep = 2, new tcss(s).run()
        } catch (a) {
        }
    }

    function pgvSendClick() {
        var e = [].slice.apply(arguments), t = new tcss(e[0]);
        t.sendClick && t.sendClick()
    }

    function pgvWatchClick(e, t) {
        var s = [].slice.apply(arguments), a = "";
        t ? (a = t, _ver = "tcsso.3.1.5") : (a = e, _ver = "tcss.3.1.5");
        try {
            if (1 != _rep)return;
            _rep = 2;
            var r = new tcss(a);
            r.watchClick && r.watchClick.apply(r, s)
        } catch (n) {
        }
    }

    function pingQQ(e, t, s) {
        if ("function" == $.type(pgvMain)) {
            for (var a = s || location.href, r = t || location.host, n = e || location.pathname, i = 0, o = _urlMap.length; o > i; i++)if (_urlMap[i][0].test(a)) {
                r = _urlMap[i][1].substr(7);
                break
            }
            for (var i = 0, o = _pathMap.length; o > i; i++)if (_pathMap[i][0].test(n)) {
                r = _pathMap[i][1].substr(7);
                break
            }
            pgvMain("", {virtualDomain: r, virtualURL: n})
        }
    }

    var _d, _l, _b, _n = "-", _params, _curDomain, _curUrl, _domainToSet, _refDomain, _refUrl, _image, _ext, _hurlcn, _tt, _ch = 0, _crossDomain = 0, _ver = "tcss.3.1.5", Tcss = {};
    if ("undefined" == typeof _rep)var _rep = 1;
    tcss.prototype = {
        init: function (e) {
            if (_params = e || {}, _d = document, !_params.statIframe && window != top)try {
                _d = top.document
            } catch (t) {
            }
            "undefined" == typeof _d && (_d = document), _l = _d.location, _b = _d.body, _ext = [], _hurlcn = [], _tt = []
        }, run: function () {
            var e, t, s;
            e = (new Date).getTime(), _cookie.init(), this.url.push(this.getDomainInfo()), this.coverCookie(), _cookie.setCookie("ssid"), _cookie.save(), this.url.unshift(("https:" == location.protocol ? "https://pingfore." : "http://pingfore.") + this.getCookieSetDomain(_curDomain) + "/pingd?"), this.url.push(this.getRefInfo(_params));
            try {
                navigator.cookieEnabled ? this.url.push("&pvid=" + _cookie.setCookie("pgv_pvid", !0)) : this.url.push("&pvid=NoCookie")
            } catch (a) {
                this.url.push("&pvid=NoCookie")
            }
            if (this.url.push(this.getMainEnvInfo()), this.url.push(this.getExtendEnvInfo()), Tcss.pgUserType = "", _params.pgUserType || _params.reserved2) {
                var r = _params.pgUserType || _params.reserved2;
                r = escape(r.substring(0, 256)), Tcss.pgUserType = r, _tt.push("pu=" + Tcss.pgUserType)
            }
            this.url.push("&vs=" + _ver), _cookie.setCookie("ts_uid", !0), t = (new Date).getTime(), _ext.push("tm=" + (t - e)), _ch && _ext.push("ch=" + _ch), s = _params.extParam ? _params.extParam + "|" : "", this.url.push("&ext=" + escape(s + _ext.join(";"))), this.url.push("&hurlcn=" + escape(_hurlcn.join(";"))), this.url.push("&rand=" + Math.round(1e5 * Math.random())), "undefined" == typeof _speedMark ? this.url.push("&reserved1=-1") : this.url.push("&reserved1=" + (new Date - _speedMark));
            var n = this.getSud();
            if (n && _tt.push("su=" + escape(n.substring(0, 256))), this.url.push("&tt=" + escape(_tt.join(";"))), this.sendInfo(this.url.join("")), 1 == _crossDomain) {
                var i = this.getParameter("tcss_rp_dm", _d.URL);
                if (i != Tcss.dm) {
                    var o = this.url.join("").replace(/\?dm=(.*?)\&/, "?dm=" + i + "&");
                    this.sendInfo(o)
                }
            }
            _params.hot && (document.attachEvent ? document.attachEvent("onclick", function (e) {
                    pgvWatchClick(e)
                }) : document.addEventListener("click", function (e) {
                    pgvWatchClick(e)
                }, !1)), _params.repeatApplay && "true" == _params.repeatApplay && "undefined" != typeof _rep && (_rep = 1)
        }, getSud: function () {
            if (_params.sessionUserType)return _params.sessionUserType;
            var e = _params.sudParamName || "sessionUserType";
            return t = this.getParameter(e, _d.URL)
        }, coverCookie: function () {
            if (_params.crossDomain && "on" == _params.crossDomain) {
                var e = this.getParameter("tcss_uid", _d.URL), t = this.getParameter("tcss_sid", _d.URL), s = this.getParameter("tcss_refer", _d.URL), a = this.getParameter("tcss_last", _d.URL);
                t && e && (_crossDomain = 1, _cookie.setCookie("ssid", !1, t), _cookie.save(), _cookie.setCookie("ts_refer", !0, s), _cookie.setCookie("ts_last", !0, a), _cookie.setCookie("pgv_pvid", !0, e))
            }
        }, getDomainInfo: function (e) {
            var t, s;
            return t = _l.hostname.toLowerCase(), _params.virtualDomain && (_hurlcn.push("ad=" + t), t = _params.virtualDomain), s = this.getCurrentUrl(), Tcss.dm = t, _curDomain = Tcss.dm, e && (Tcss.dm += ".hot"), "dm=" + Tcss.dm + "&url=" + Tcss.url
        }, getCurrentUrl: function () {
            var e = "", t = _n;
            if (e = _curUrl = escape(_l.pathname), "" != _l.search && (t = escape(_l.search.substr(1))), _params.senseParam) {
                var s = this.getParameter(_params.senseParam, _d.URL);
                s && (e += "_" + s)
            }
            _params.virtualURL && (_hurlcn.push("au=" + e), e = _params.virtualURL), Tcss.url = e, Tcss.arg = t
        }, getRefInfo: function (e) {
            var t, s, a, r = _n, n = _n, i = _n, o = _d.referrer;
            if (t = e.tagParamName || "ADTAG", s = this.getParameter(t, _d.URL), a = o.indexOf("://"), a > -1) {
                var c = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i, p = o.match(c);
                p && (r = p[2], n = p[4] + (p[5] ? p[5] : ""))
            }
            if (-1 != o.indexOf("?")) {
                var a = o.indexOf("?") + 1;
                i = o.substr(a)
            }
            var u = r;
            _params.virtualRefDomain && (r != _n && _hurlcn.push("ard=" + r), r = _params.virtualRefDomain), _params.virtualRefURL && (n != _n && _hurlcn.push("aru=" + escape(n)), n = _params.virtualRefURL);
            var h;
            if (s && (h = r + n, r = "ADTAG", n = s), _refDomain = r, _refUrl = escape(n), _refDomain == _n || "ADTAG" == _refDomain && u == _n) {
                var l = _cookie.get("ts_last=", !0);
                l != _n && _ext.push("ls=" + l)
            }
            _cookie.setCookie("ts_last", !0, escape((_l.hostname + _l.pathname).substring(0, 128)));
            var _ = _cookie.get("ts_refer=", !0);
            _ != _n && _ext.push("rf=" + _);
            var f = _l.hostname;
            if (_params.inner && (f = "," + f + "," + _params.inner + ","), !(_refDomain == _n || ("," + f + ",").indexOf(_refDomain) > -1 || 1 == _crossDomain)) {
                var m = escape((_refDomain + n).substring(0, 128));
                m != _ && (_ch = 2), _cookie.setCookie("ts_refer", !0, m)
            }
            return Tcss.rdm = _refDomain, Tcss.rurl = _refUrl, Tcss.rarg = escape(i), h ? "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg + "&or=" + h : "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg
        }, getMainEnvInfo: function () {
            var e = "";
            try {
                var t = _n, s = _n, a = _n, r = _n, n = _n, i = 0, o = navigator;
                self.screen && (t = screen.width + "x" + screen.height, s = screen.colorDepth + "-bit"), a = o.language ? o.language.toLowerCase() : o.browserLanguage ? o.browserLanguage.toLowerCase() : a, i = o.javaEnabled() ? 1 : 0, r = o.platform, n = (new Date).getTimezoneOffset() / 60, e = "&scr=" + t + "&scl=" + s + "&lang=" + a + "&java=" + i + "&pf=" + r + "&tz=" + n
            } catch (c) {
            } finally {
                return e
            }
        }, getExtendEnvInfo: function () {
            var e = "";
            try {
                var t = _l.href, s = _n;
                e += "&flash=" + this.getFlashInfo(), _b.addBehavior && (_b.addBehavior("#default#homePage"), _b.isHomePage(t) && (e += "&hp=Y")), _b.addBehavior && (_b.addBehavior("#default#clientCaps"), s = _b.connectionType), e += "&ct=" + s
            } catch (a) {
            } finally {
                return e
            }
        }, getFlashInfo: function () {
            var f = _n, n = navigator;
            try {
                if (n.plugins && n.plugins.length) {
                    for (var i = 0; i < n.plugins.length; i++)if (n.plugins[i].name.indexOf("Shockwave Flash") > -1) {
                        f = n.plugins[i].description.split("Shockwave Flash ")[1];
                        break
                    }
                } else if (window.ActiveXObject)for (var i = 12; i >= 5; i--)try {
                    var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + i + "');");
                    if (fl) {
                        f = i + ".0";
                        break
                    }
                } catch (ex) {
                }
            } catch (exx) {
            }
            return f
        }, getParameter: function (e, t) {
            if (e && t) {
                var s = new RegExp("(\\?|#|&)" + e + "=([^&^#]*)(#|&|$)"), a = t.match(s);
                return a ? a[2] : ""
            }
            return ""
        }, getCookieSetDomain: function (e) {
            for (var t, s, a, r = [], n = 0, i = 0; i < e.length; i++)"." == e.charAt(i) && (r[n] = i, n++);
            return t = r.length, s = e.indexOf(".cn"), s > -1 && t--, a = "qq.com", a = 1 == t ? e : t > 1 ? e.substring(r[t - 2] + 1) : a
        }, watchClick: function (e) {
            try {
                var t, s = !0, a = "";
                switch (t = (window.event ? window.event.srcElement : e.target) || {tagName: ""}, t.tagName.toUpperCase()) {
                    case"A":
                        a = "<a href=" + t.href + ">" + t.innerHTML + "</a>";
                        break;
                    case"IMG":
                        a = "<img src=" + t.src + " />";
                        break;
                    case"INPUT":
                        a = "<input type=" + t.type + " value=" + t.value + " />";
                        break;
                    case"BUTTON":
                        a = "<button>" + t.innerText + "</button>";
                        break;
                    case"SELECT":
                        a = "select";
                        break;
                    default:
                        s = !1
                }
                if (s) {
                    var r = new tcss(_params), n = r.getElementPos(t);
                    if (_params.coordinateId) {
                        var i = r.getElementPos(document.getElementById(_params.coordinateId));
                        n.x -= i.x
                    }
                    r.url.push(r.getDomainInfo(!0)), r.url.push("&hottag=" + escape(a)), r.url.push("&hotx=" + n.x), r.url.push("&hoty=" + n.y), r.url.push("&rand=" + Math.round(1e5 * Math.random())), r.url.unshift(("https:" == location.protocol ? "https://pingfore." : "http://pinghot.") + this.getCookieSetDomain(_curDomain) + "/pingd?"), r.sendInfo(r.url.join(""))
                }
            } catch (o) {
            }
        }, getElementPos: function (e) {
            if (null === e.parentNode || "none" == e.style.display)return !1;
            var t, s = navigator.userAgent.toLowerCase(), a = null, r = [];
            if (e.getBoundingClientRect) {
                var n, i, o, c;
                return t = e.getBoundingClientRect(), n = Math.max(document.documentElement.scrollTop, document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset), i = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), o = document.body.clientTop, c = document.body.clientLeft, {
                    x: t.left + i - c,
                    y: t.top + n - o
                }
            }
            if (document.getBoxObjectFor) {
                t = document.getBoxObjectFor(e);
                var p = e.style.borderLeftWidth ? Math.floor(e.style.borderLeftWidth) : 0;
                l = e.style.borderTopWidth ? Math.floor(e.style.borderTopWidth) : 0, r = [t.x - p, t.y - l]
            } else {
                if (r = [e.offsetLeft, e.offsetTop], a = e.offsetParent, a != e)for (; a;)r[0] += a.offsetLeft, r[1] += a.offsetTop, a = a.offsetParent;
                (s.indexOf("opera") > -1 || s.indexOf("safari") > -1 && "absolute" == e.style.position) && (r[0] -= document.body.offsetLeft, r[1] -= document.body.offsetTop)
            }
            for (a = e.parentNode ? e.parentNode : null; a && "BODY" != a.tagName && "HTML" != a.tagName;)r[0] -= a.scrollLeft, r[1] -= a.scrollTop, a = a.parentNode ? a.parentNode : null;
            return {x: r[0], y: r[1]}
        }, sendClick: function () {
            _params.hottag && (this.url.push(this.getDomainInfo(!0)), this.url.push("&hottag=" + escape(_params.hottag)), this.url.push("&hotx=9999&hoty=9999"), this.url.push("&rand=" + Math.round(1e5 * Math.random())), this.url.unshift(("https:" == location.protocol ? "https://pingfore." : "http://pinghot.") + this.getCookieSetDomain(_curDomain) + "/pingd?"), this.sendInfo(this.url.join("")))
        }, pgvGetArgs: function () {
            this.getDomainInfo();
            var e = [];
            return e.push("tcss_rp_dm=" + Tcss.dm), e.push("tcss_uid=" + _cookie.get("pgv_pvid=", !0)), e.push("tcss_sid=" + _cookie.get("ssid=", !0)), e.push("tcss_refer=" + _cookie.get("ts_refer=", !0)), e.push("tcss_last=" + _cookie.get("ts_last=", !0)), e.join("&")
        }, sendInfo: function (e) {
            _image = new Image(1, 1), Tcss.img = _image, _image.onload = _image.onerror = _image.onabort = function () {
                _image.onload = _image.onerror = _image.onabort = null, Tcss.img = null
            }, _image.src = e
        }
    };
    var _cookie = {
        sck: [], sco: {}, init: function () {
            var e = this.get("pgv_info=", !0);
            if (e != _n)for (var t = e.split("&"), s = 0; s < t.length; s++) {
                var a = t[s].split("=");
                this.set(a[0], unescape(a[1]))
            }
        }, get: function (e, t) {
            var s, a, r = t ? _d.cookie : this.get("pgv_info=", !0), n = _n;
            if (s = r.indexOf(e), s > -1) {
                if (s += e.length, a = r.indexOf(";", s), -1 == a && (a = r.length), !t) {
                    var i = r.indexOf("&", s);
                    i > -1 && (a = Math.min(a, i))
                }
                n = r.substring(s, a)
            }
            return n
        }, set: function (e, t) {
            this.sco[e] = t;
            var s = !1;
            r = this.sck.length;
            for (var a = 0; r > a; a++)if (e == this.sck[a]) {
                s = !0;
                break
            }
            s || this.sck.push(e)
        }, setCookie: function (e, t, s) {
            var a = _l.hostname, r = _cookie.get(e + "=", t);
            if (r != _n || s) r = s ? s : r; else {
                switch (e) {
                    case"ts_uid":
                        _ext.push("nw=1");
                        break;
                    case"ssid":
                        _ch = 1
                }
                r = t ? "" : "s";
                var n = (new Date).getUTCMilliseconds();
                r += Math.round(2147483647 * Math.abs(Math.random() - 1)) * n % 1e10
            }
            if (t)switch (e) {
                case"ts_uid":
                    this.saveCookie(e + "=" + r, a, this.getExpires(1051200));
                    break;
                case"ts_refer":
                    this.saveCookie(e + "=" + r, a, this.getExpires(259200));
                    break;
                case"ts_last":
                    this.saveCookie(e + "=" + r, a, this.getExpires(30));
                    break;
                default:
                    this.saveCookie(e + "=" + r, _domainToSet, "expires=Sun, 18 Jan 2038 00:00:00 GMT;")
            } else this.set(e, r);
            return r
        }, getExpires: function (e) {
            var t = new Date;
            return t.setTime(t.getTime() + 60 * e * 1e3), "expires=" + t.toGMTString()
        }, save: function () {
            if (_params.sessionSpan) {
                var e = new Date;
                e.setTime(e.getTime() + 60 * _params.sessionSpan * 1e3)
            }
            for (var t = "", s = this.sck.length, a = 0; s > a; a++)t += this.sck[a] + "=" + this.sco[this.sck[a]] + "&";
            t = "pgv_info=" + t.substr(0, t.length - 1);
            var r = "";
            e && (r = "expires=" + e.toGMTString()), this.saveCookie(t, _domainToSet, r)
        }, saveCookie: function (e, t, s) {
            _d.cookie = e + ";path=/;domain=" + t + ";" + s
        }
    };
    !function () {
        var e = Math.floor(1e4 * Math.random());
        5e3 > e && setTimeout(function () {
            var e = document.createElement("script");
            document.getElementsByTagName("head")[0].appendChild(e), e.src = "//jqmt.qq.com/cdn_dianjiliu.js?a=" + Math.random()
        }, 5e3)
    }();
    var $ = require("js/common/music/jquery.js"), urlPingjs = "//pingjs.qq.com/tcss.ping.js", _urlMap = [], _pathMap = [];
    return window.pgvWatchClick = pgvWatchClick, {
        pgvMain: pgvMain,
        pgvSendClick: pgvSendClick,
        pgvWatchClick: pgvWatchClick,
        pingQQ: pingQQ,
        setUrlMap: setUrlMap,
        setPathMap: setPathMap
    }
});
;define("js/common/music.js", function (require, exports, module) {
    function getToTop() {
        var t = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset, e = '<a href="javascript:;" class="btn_bottom_top sprite js_btn_top"><span class="icon_txt">返回顶部</span></a>';
        t > 150 ? ($(".js_btn_top").length <= 0 && ($(document).off("click", ".js_btn_top").on("click", ".js_btn_top", function () {
                document.addEventListener ? document.body.scrollTop = -10 : (document.documentElement.scrollTop = -10, $(".mod_search").removeClass("mod_search--top")), statistics.pgvClickStat("y_new.footer.goto_top")
            }), $(".js_btn_feedback").before(e)), $(".js_btn_top").show()) : $(".js_btn_top").hide()
    }

    function showUserInfo() {
        return g_user.isLogin() ? (g_user.getVipInfo(function (t) {
                function e() {
                    var t = $(".js_emopr");
                    $.each(t, function (t, e) {
                        var o = $(e).html();
                        $(e).html(emopr(o.unescapeHTML())), $(e).removeClass("js_emopr")
                    })
                }

                var o = !1, n = "开通绿钻豪华版", i = "开通付费包", a = "开通付费音乐包", s = "", r = "";
                (1 == t.eight || 1 == t.twelve) && (i = "续费付费包"), 1 == t.eight && (a = "续费付费音乐包") && (r = t.eightEnd.substr(0, 10)), 1 == t.twelve && (a = "续费豪华付费包") && (r = t.twelveEnd.substr(0, 10)), 1 == t.vip ? (o = !0, 1 == t.svip ? (n = "续费绿钻豪华版", s = t.send.substr(0, 10)) : (n = "升级绿钻豪华版", s = t.end.substr(0, 10))) : 2 == t.vip && (o = !0);
                var c = "";
                if (1 == t.vip ? c = '<a href="' + MUSIC.util.getProtocol() + '//y.qq.com/vipportal/" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/' + (1 == t.yearFlag ? "n" : "") + (1 == t.svip ? "s" : "") + "vip" + (t.CurrentLevel || 1) + '.png" alt="绿钻' + (t.CurrentLevel || 1) + '级" class="popup_user_data__lv_icon"></a>' : c += t.score > 0 ? '<a href="' + MUSIC.util.getProtocol() + '//y.qq.com/vipportal/" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/' + (1 == t.yearFlag ? "n" : "") + "svip" + (t.CurrentLevel || 1) + '_g.png" alt="绿钻' + (t.CurrentLevel || 1) + '级" class="popup_user_data__lv_icon"></a>' : '<a href="' + MUSIC.util.getProtocol() + '//y.qq.com/vipportal/" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/svip_g.png" alt="绿钻" class="popup_user_data__lv_icon"></a>', t.ffbScore = parseInt(t.ffbScore), 1 == t.eight || 1 == t.twelve) {
                    var l = t.ffbLevel;
                    c += 0 == t.twelve ? '<a href="' + MUSIC.util.getProtocol() + '//y.qq.com/vip/fufeibao/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/' + (1 == t.yearFfb ? "n" : "") + "sui" + l + '.png?max_age=2592000" alt="付费音乐包" class="popup_user_data__lv_icon"/></a>' : '<a href="' + MUSIC.util.getProtocol() + '//y.qq.com/vip/fufeibao/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/' + (1 == t.yearFfb ? "n" : "") + "ssui" + l + '.png?max_age=2592000" alt="豪华付费音乐包" class="popup_user_data__lv_icon"/></a>'
                } else c += t.ffbScore > 0 ? '<a href="' + MUSIC.util.getProtocol() + '//y.qq.com/vip/fufeibao/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/' + (1 == t.yearFfb ? "n" : "") + "sui" + t.ffbLevel + '_g.png?max_age=2592000" alt="付费音乐包" class="popup_user_data__lv_icon"/></a>' : '<a href="' + MUSIC.util.getProtocol() + '//y.qq.com/vip/fufeibao/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/sui_g.png?max_age=2592000" alt="付费音乐包" class="popup_user_data__lv_icon"/></a>';
                if (1 == t.xingzuanVip) {
                    var p = t.xingzuanScore > 0 ? "xzlv" + t.xingzuanLevel : "xz";
                    p += 1 == t.xingzuanVip ? 1 == t.yearXingzuanVip ? "_n" : "" : "_g", t.xingzuanScore > 0 && (c += '<a href="http://xing.qq.com/" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" target="_blank"><img class="popup_user_data__lv_icon" src="//y.gtimg.cn/qz-proj/qz-super/img/icon/' + p + '.png"></a>')
                }
                t.nickname = t.nickname;
                var u = '<img src="//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000\';this.onerror=null;" class="top_login__cover js_user_img"  />', g = ['          <div class="popup_user_data' + ("" == c ? " popup_user_data--nolv" : "") + '">', '              <a href="' + MUSIC.util.getProtocol() + '//y.qq.com/portal/profile.html#stat=y_new.top.pop.user_pic"><img src="//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000\';this.onerror=null;" class="popup_user_data__cover js_user_img"  /></a>', '              <div class="popup_user_data__name"><a href="' + MUSIC.util.getProtocol() + '//y.qq.com/portal/profile.html#stat=y_new.top.pop.user_nickname" class="js_emopr">' + ("" != t.nickname ? t.nickname : g_user.getUin()) + "</a></div>", '              <div class="popup_user_data__lv">', c, "              </div>", '              <a href="javascript:;" class="popup_user_data__out js_logout" data-stat="y_new.top.pop.logout">[退出]</a>', "          </div>", '          <ul class="mod_user_statistic">', '              <li class="user_statistic__item">', '                  <a href="javascript:;" class="js_profile_tab" data-stat="y_new.top.pop.gedan" data-tab="create"><strong class="user_statistic__number js_create"></strong><span class="user_statistic__tit">歌单</span></a>', "              </li>", '              <li class="user_statistic__item">', '                  <a href="javascript:;" class="js_profile_tab" data-stat="y_new.top.pop.focus" data-tab="focus"><strong class="user_statistic__number js_focus"></strong><span class="user_statistic__tit">关注</span></a>', "              </li>", '              <li class="user_statistic__item user_statistic__item--last">', '                  <a href="javascript:;" class="js_profile_tab" data-stat="y_new.top.pop.fans" data-tab="fans"><strong class="user_statistic__number js_fans"></strong><span class="user_statistic__tit">粉丝</span></a>', "              </li>", "          </ul>", '          <div class="popup_user__toolbar">', '              <a class="mod_btn_green popup_user__btn1 js_openvip" ' + (0 == t.svip && 1 == t.vip ? 'data-aid="music.pc.20319.newyqqhover" data-stat="music.20319.btnclick.pc"' : 'data-aid="music.pc.20318.newyqqhover" data-stat="music.20318.btnclick.pc"') + ' href="javascript:;">' + n + "</a>", '              <div class="popup_user_data__time" style="display:' + ("" == s ? "none" : "") + ';">' + s + " 到期</div>", '              <a class="mod_btn popup_user__btn2 js_openmusic" href="javascript:;" data-aid="music.pc.20320.newyqqhover" data-stat="music.20320.btnclick.pc" style="display:' + (1 == t.svip && 1 == t.vip ? "none" : "") + ';">' + a + "</a>", '              <div class="popup_user_data__time" style="display:' + (1 == t.svip && 1 == t.vip || "" == r ? "none" : "") + ';">' + r + " 到期</div>", '              <div class="popup_top_login__tips">' + n + " 赠送付费音乐包</div>", "         </div>"].join("");
                if (o)if (-1 != window.location.href.indexOf("player.html")) $("#player_login").show(), $(".player_login__link--unlogin,.js_opts_unlogin").hide(), $("#player_login .player_login__link:eq(0)").html('<img src="//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000\';this.onerror=null;" class="player_login__cover js_user_img" ><span class="player_login__txt js_emopr">' + ("" != t.nickname ? t.nickname : g_user.getUin()) + "</span>").attr("href", MUSIC.util.getProtocol() + "//y.qq.com/portal/profile.html#stat=y_new.player.header.user_pic").attr("target", "_blank"); else {
                    var _ = !1, m = !1;
                    $(".js_logined").show().html(u), $(".mod_top_login .js_openvip").html(n), $(".mod_top_login .js_openmusic").html(i), $(".js_login").hide(), $(".popup_user").html(g), $(".top_login__link").on("mouseenter", function () {
                        m = !0, $(".popup_user").addClass("drop"), $('.popup_user .js_openvip[data-stat="music.20318.btnclick.pc"]').length > 0 && statistics.pgvClickStat("music.20318.btnshow.pc"), $('.popup_user .js_openvip[data-stat="music.20319.btnclick.pc"]').length > 0 && statistics.pgvClickStat("music.20319.btnshow.pc"), $('.popup_user .js_openmusic[data-stat="music.20320.btnclick.pc"]').length > 0 && 1 == t.eight && (1 != t.svip || 1 != t.vip) && statistics.pgvClickStat("music.20320.btnshow.pc"), $('.popup_user .js_openmusic[data-stat="music.20320.btnclick.pc"]').length > 0 && 1 == t.twelve && (1 != t.svip || 1 != t.vip) && statistics.pgvClickStat("music.20321.btnshow.pc"), $(".popup_user").on("mouseenter", function () {
                            _ = !0
                        }).on("mouseleave", function () {
                            setTimeout(function () {
                                m || $(".popup_user").removeClass("drop")
                            }, 300), _ = !1
                        })
                    }).on("mouseleave", function () {
                        m = !1, setTimeout(function () {
                            _ || $(".popup_user").removeClass("drop")
                        }, 300)
                    }), $(document).on("click", ".js_vip_jump", function () {
                        var t = $(this).data("stat") || "";
                        t && statistics.pgvClickStat(t)
                    });
                    var d = "GetProfile", f = "//c.y.qq.com/rsc/fcgi-bin/3g_profile_homepage?coverurl=1&callback=" + d + "&cid=316&sin=0&ein=1&nolist=1&rettype=19&type=0&id=" + g_user.getUin() + "&qq=" + g_user.getUin() + "&" + (new Date).getTime();
                    MUSIC.jQueryAjax.jsonp({
                        url: f, charset: "utf-8", jsonpCallback: d, success: function (t) {
                            return 0 != t.code ? !1 : ($(".popup_user .js_create").html(t.selfdirnum), $(".popup_user .js_focus").html(t.creator.follownum), $(".popup_user .js_fans").html(t.creator.fansnum), $(".popup_user .js_profile_tab").on("click", function () {
                                    var t = $(this).data("tab"), e = $(this).data("stat");
                                    MUSIC.util.gotoprofile(t, e)
                                }), void 0)
                        }, error: function () {
                        }
                    })
                }
                g_user.getQQUserImage(g_user.getUin(), function (t) {
                    $(".js_user_img").attr("src", t)
                }), require.load("//y.gtimg.cn/music/portal/emoticons/emoji.js?max_age=2592000", function () {
                    e()
                })
            }, function () {
            }), void 0) : ($(".js_login").show(), $(".js_logined").html("").hide(), $(".popup_user").html("").removeClass("drop"), void 0)
    }

    function initFooter() {
        $(document).off("click", ".js_footer_more").on("click", ".js_footer_more", function () {
            var t = $(this).parents(".footer_link_list");
            t.addClass("footer_link_list--show"), $(".js_last").show(), $(this).parents(".footer_link_list__item").remove()
        }).off("click", ".js_other_link").on("click", ".js_other_link", function () {
            var t = $(this).data("stat") || "";
            t && statistics.pgvClickStat(t)
        });
        var t = "MusicJsonCallback", e = "//y.qq.com/download/download.js";
        MUSIC.jQueryAjax.jsonp({
            url: e, charset: "utf-8", jsonpCallback: t, success: function (t) {
                var e = t.data, o = {pc: 0, mac: 1, andriod: 3, iphone: 2};
                window.download_pc = e[0].Flink1, $(document).off("click", ".js_footer_down").on("click", ".js_footer_down", function () {
                    var t = $(this).data("type");
                    switch (t) {
                        case"pc":
                        case"mac":
                            window.open(e[o[t]].Flink1);
                            break;
                        case"andriod":
                        case"iphone":
                            require.async("js/common/dialog.js", function (n) {
                                n.show({
                                    mode: "common",
                                    title: e[o[t]].Ftitle + " " + e[o[t]].Fversion,
                                    popup__bd_class: "popup_download__bd",
                                    dialogclass: "popup_download",
                                    width: 590,
                                    height: 280,
                                    content: ['<div class="popup_download__btns">', '		<a href="' + e[o[t]].Flink1 + '" class="popup_download__btn_down' + ("iphone" == t ? "" : " popup_download__btn_single") + '"> ', '			<i class="popup_download__icon_down"></i> ', "			下载安装包", "		</a>", "iphone" == t ? ['		<a href="' + e[o[t]].Flink2 + '" target="_blank" class="popup_download__btn_ios_store">', '			<i class="popup_download__icon_phone"></i> ', "			去iTunes Store 下载", "		</a>"].join("") : "", "	</div>", '	<div class="qr_code">', '		<h4 class="qr_code__tit">扫描二维码下载</h4>', '		<img src="' + e[o[t]].Fcode + '" class="qr_code__pic">', "	</div>"].join("")
                                })
                            })
                    }
                    var n = $(this).data("stat") || "";
                    return n && statistics.pgvClickStat(n), !1
                })
            }, error: function () {
            }
        })
    }

    function showTopInfo() {
        var t = {
            "profile.html": [1, -1],
            "mymusic.html": [1, -1],
            "songlist_import.html": [1, -1],
            "list_recover.html": [1, -1],
            "mymusic_edit.html": [1, -1],
            "y.qq.com/index.html": [0, 0],
            "y.qq.com/portal/index.html": [0, 0],
            "search.html": [-1, -1],
            "/song/": [0, -1],
            "/playlist/": [0, -1],
            "/album/": [0, -1],
            "/album_lib.html": [0, 2],
            "/singer/": [0, -1],
            "/singerlist.html": [0, 1],
            "/toplist/": [0, 3],
            "/mv/v/": [0, -1],
            "/mv/c/": [0, -1],
            "/playlist.html": [0, 4],
            "/mv_lib.html": [0, 5],
            "/mv_toplist.html": [0, 3],
            "/mv/mv_upload.html": [0, -1],
            "/mv/mv_upload_system.html": [1, -1],
            "/company_detail.html": [0, -1]
        }, e = [-1, -1];
        for (var o in t)-1 != window.location.href.indexOf(o) && (e = t[o]);
        ("/" == window.location.pathname || "/index.html" == window.location.pathname) && (e = [0, 0]), ("/portal/" == window.location.pathname || "/portal" == window.location.pathname || "/portal/index.html" == window.location.pathname) && (e = [0, 0]), -1 != e[0] ? ($(".mod_top_subnav:eq(" + e[0] + ")").show(), $(".top_nav__link:eq(" + e[0] + ")").addClass("top_nav__link--current")) : $(".top_nav__link").removeClass("top_nav__link--current"), -1 != e[1] ? $(".top_subnav__link:eq(" + e[1] + ")").addClass("top_subnav__link--current") : $(".top_subnav__link").removeClass("top_subnav__link--current"), showUserInfo(), initFooter(), $(document).off("click", ".js_openvip").on("click", ".js_openvip", function () {
            var t = $(this).data("aid") || "", e = -1 == $(this).html().indexOf("升级"), o = $(this).data("stat") || "";
            MUSIC.widget.user.openVip(t, e, o)
        }).off("click", ".js_openmusic").on("click", ".js_openmusic", function () {
            var t = $(this).data("aid") || "", e = $(this).data("stat") || "";
            MUSIC.widget.user.openPayMusic(t, e)
        }).off("click", ".js_logout").on("click", ".js_logout", function () {
            var t = $(this);
            MUSIC.widget.user.loginOut(function () {
                var e = t.data("stat") || "";
                e ? (window.location.href = window.location.href + (-1 == window.location.href.indexOf("#") ? "#" : "&") + "stat=" + e, window.location.reload()) : window.location.reload()
            })
        }).off("click", ".js_login").on("click", ".js_login", function () {
            MUSIC.widget.user.openLogin();
            var t = $(this).data("stat") || "";
            !!t && statistics.pgvClickStat(t)
        })
    }

    function prepareDoanload() {
        require.async("js/common/download.js", function (t) {
            t.prepareDownload()
        })
    }

    var w = window, MUSIC = {}, $ = require("js/common/music/jquery.js"), lazyload = require("js/common/music/jquery.lazyload.js"), jstorage = require("js/common/music/jstorage.js"), statistics = require("js/common/statastic.js"), cookie = require("js/common/music/cookie.js"), user = require("js/common/user.js"), json2 = require("js/common/music/json2.js"), player = require("js/common/player.js"), SPD = require("js/common/spd.js");
    MUSIC.$ = $, MUSIC.jQueryAjax = require("js/common/jQueryAjax.js"), MUSIC.config = require("js/common/config.js"), MUSIC.popup = require("js/common/popup.js"), MUSIC.userAgent = require("js/common/userAgent.js"), MUSIC.widget = MUSIC.widget || {}, MUSIC.widget.Storage = require("js/common/music/storage.js"), MUSIC.cookie = cookie, MUSIC.widget.user = user;
    var g_storage = MUSIC.widget.Storage, g_user = MUSIC.widget.user;
    MUSIC.getACSRFToken = cookie.getACSRFToken, MUSIC.user = {}, MUSIC.user.getUin = user.getUin, MUSIC.player_storage = player.storage, MUSIC.player = player, w.MUSIC = w.MUSIC || {}, MUSIC.FormSender = require("js/common/music/formsender.js"), MUSIC.dom = MUSIC.dom || {}, MUSIC.dom.createNamedElement = function (t, e, o) {
        var n, i = o || document;
        try {
            n = i.createElement("<" + t + ' name="' + e + '">')
        } catch (a) {
        }
        return n || (n = i.createElement(t)), n.name || (n.name = e), n
    };
    var getType = function (t) {
        return null === t ? "null" : void 0 === t ? "undefined" : Object.prototype.toString.call(t).slice(8, -1).toLowerCase()
    };
    MUSIC.util = {
        gLocation: "", buildUri: function (t) {
            return new MUSIC.util.URI(t)
        }, URI: function (t) {
            if ("string" != getType(t))return null;
            t.indexOf("://") < 1 && (t = location.protocol + "//" + location.host + (0 == t.indexOf("/") ? "" : location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1)) + t);
            var e = t.split("://");
            if ("array" == getType(e) && e.length > 1 && /^[a-zA-Z]+$/.test(e[0])) {
                this.protocol = e[0].toLowerCase();
                var o = e[1].split("/");
                if ("array" == getType(o)) {
                    this.host = o[0], this.pathname = "/" + o.slice(1).join("/").replace(/(\?|\#).+/i, ""), this.href = t;
                    var n = e[1].lastIndexOf("?"), i = e[1].lastIndexOf("#");
                    return this.search = n >= 0 ? e[1].substring(n + 1) : "", this.hash = i >= 0 ? e[1].substring(i + 1) : "", this.search.length > 0 && this.hash.length > 0 && (this.search = n > i ? "" : e[1].substring(n, i)), this
                }
                return null
            }
            return null
        }, splitHttpParamString: function (t) {
            return MUSIC.util.commonDictionarySplit(t, "&")
        }, commonDictionarySplit: function (t, e, o, n) {
            var i = {};
            if (!t || "string" != typeof t)return i;
            "string" != typeof e && (e = "&"), "string" != typeof o && (o = ""), "string" != typeof n && (n = "=");
            var a, s = t.split(o + e), r = s.length, c = n + o;
            o && (a = s[r - 1].split(o), s[r - 1] = a.slice(0, a.length - 1).join(o));
            for (var r, l = 0; r > l; l++)n && (a = s[l].split(c), a.length > 1) ? i[a[0]] = a.slice(1).join(c) : i[s[l]] = !0;
            return i
        }, getUrlParams: function (t) {
            var e = {}, o = this.buildUri(t || window.location.href);
            return $.extend(e, this.splitHttpParamString(o.hash)), $.extend(e, this.splitHttpParamString(o.search)), e
        }, getParameterNew: function (t) {
            var e = window.location.href, o = new RegExp("(\\?|#|&)" + t + "=([^&#\\?]*)(&|#|$|\\?)"), n = e.match(o);
            return n && "" != n || (n = window.location.href.match(o)), n ? n[2] : ""
        }, buildArgs: function (t) {
            var e = [];
            for (var o in t) {
                var n = t[o];
                "string" == typeof n && e.push(o + "=" + n)
            }
            return e.join("&")
        }, hashChangeInit: function (t, e) {
            setTimeout(function () {
                function o() {
                    return MUSIC.util.getUrlParams(window.location.href)
                }

                "function" == typeof t && (e = t, t = void 0), t = t || void 0;
                var n = window.location.hash;
                if ("onhashchange" in window) window.onhashchange = function () {
                    var t = o();
                    e(t)
                }; else {
                    setInterval(function () {
                        if (window.location.hash != n) {
                            var t = o();
                            e(t), n = window.location.hash
                        }
                    }, 100)
                }
            }, 0)
        }, updateHash: function (t) {
            var e = window.location.href.replace(new RegExp("(#)+.*"), ""), o = window.location.hash.replace("#", ""), n = void 0;
            $.isPlainObject(t) && "{}" != JSON.stringify(t) && ($.each(t, function (t, e) {
                n = new RegExp(t + "=[^&]+", "i"), o.indexOf(t) < 0 && "" != e && (o = [t, "=", e, "&"].join("") + o), o = "" == e ? o.replace(n, "") : o.replace(n, [t, "=", e].join(""))
            }), window.location.hash = o, window.location.replace(e + "#" + o))
        }, toYMDString: function (t) {
            if (!t)return "";
            if (t = new Date(t), "Invalid Date" == t)return "0000-00-00";
            var e = t.getFullYear(), o = t.getMonth() + 1, n = t.getDate();
            return e + "-" + (10 > o ? "0" + o : o) + "-" + (10 > n ? "0" + n : n)
        }, formatTime: function (t) {
            if (!t)return "";
            if (t = new Date(t), "Invalid Date" == t)return "";
            var e = t.getFullYear(), o = t.getMonth() + 1, n = t.getDate();
            return e + "年" + o + "月" + n + "日"
        }, getMidPic: function (t) {
            t = t || {};
            var e = "//y.gtimg.cn/mediastyle/macmusic_v4/extra/default_cover.png?max_age=31536000", o = t.page, n = t.type, i = t.mid;
            return window.devicePixelRatio && parseInt(window.devicePixelRatio) > 1 && (150 == n && (n = 300), (68 == n || 90 == n) && (n = 150)), "string" == typeof i && i.length >= 14 ? (o = "album" == o ? "T002" : "singer" == o ? "T001" : o, e = "//y.gtimg.cn/music/photo_new/" + o + "R" + (n || 68) + "x" + (n || 68) + "M000" + i + ".jpg?max_age=2592000") : i > 0 && (e = "//y.gtimg.cn/music/photo/" + o + "_" + (n || 68) + "/" + i % 100 + "/" + (n || 68) + "_" + o + "pic_" + i + "_0.jpg?max_age=2592000"), e
        }, getAlbumPic: function (t) {
            return t.page = "album", MUSIC.util.getMidPic(t)
        }, getSingerPic: function (t) {
            return t.page = "singer", MUSIC.util.getMidPic(t)
        }, getPageTarget: function () {
            window.location.href;
            return -1 != window.location.href.indexOf("player.html") ? "_blank" : "_self"
        }, getProtocol: function () {
            return window.location.protocol
        }, gotoSinger: function (t) {
            var e = "//y.qq.com/portal/singer/" + t.singermid + ".html" + (t.stat ? "#stat=" + t.stat : "");
            return t.singerid > 0 && (e = "//y.qq.com/portal/singer/" + t.singerid + "_num.html" + (t.stat ? "#stat=" + t.stat : "")), t.tab in {
                song: 1,
                album: 1,
                mv: 1
            } && (e = e + (-1 == e.indexOf("#") ? "#" : "&") + "tab=" + t.tab), e = MUSIC.util.getProtocol() + e, window.open(e, t.target || MUSIC.util.getPageTarget()), 8 == MUSIC.userAgent.ie && $("a").attr("href", "javascript:;"), !1
        }, getSingerUrl: function (t) {
            var e = "//y.qq.com/portal/singer/" + (t.singermid || t.mid) + ".html";
            return t.singermid || t.mid || !(t.singerid > 0 || t.id > 0) || (e = "//y.qq.com/portal/singer/" + (t.singerid || t.id) + "_num.html"), e = MUSIC.util.getProtocol() + e
        }, getMvUrl: function (t) {
            return MUSIC.util.getProtocol() + "//y.qq.com/portal/mv/v/" + t + ".html"
        }, getPlaylistUrl: function (t) {
            return MUSIC.util.getProtocol() + "//y.qq.com/portal/playlist/" + t + ".html"
        }, gotoToplist: function (t) {
            var e = "//y.qq.com/portal/toplist/" + t.id + ".html" + (t.stat ? "#stat=" + t.stat : "");
            return e = MUSIC.util.getProtocol() + e, window.open(e, MUSIC.util.getPageTarget()), 8 == MUSIC.userAgent.ie && $("a").attr("href", "javascript:;"), !1
        }, gotoAlbum: function (t) {
            var e = "//y.qq.com/portal/album/" + t.albummid + ".html" + (t.stat ? "#stat=" + t.stat : "");
            return e = MUSIC.util.getProtocol() + e, window.open(e, MUSIC.util.getPageTarget()), 8 == MUSIC.userAgent.ie && $("a").attr("href", "javascript:;"), !1
        }, getAlbumUrl: function (t) {
            var e = MUSIC.util.getProtocol() + "//y.qq.com/portal/album/" + t.albummid + ".html";
            return e
        }, gotoSongdetail: function (t) {
            if (t.id || t.mid) {
                var e = "//y.qq.com/portal/song/" + t.mid + ".html" + (t.stat ? "#stat=" + t.stat : "");
                return t.songtype && 1 != t.songtype && 11 != t.songtype && 13 != t.songtype && 3 != t.songtype && (e = "//y.qq.com/portal/song2/" + t.songtype + "/" + t.id + ".html" + (t.stat ? "#stat=" + t.stat : "")), t.songtype && (111 == t.songtype || 112 == t.songtype || 113 == t.songtype) && (e = "//y.qq.com/portal/song2/" + t.songtype + "/" + t.id + ".html" + (t.stat ? "#stat=" + t.stat : "")), t.disstid && t.songtype && (e = "//y.qq.com/portal/song3/" + t.songtype + "/" + t.disstid + "/" + t.id + ".html" + (t.stat ? "#stat=" + t.stat : "")), e = MUSIC.util.getProtocol() + e, window.open(e, MUSIC.util.getPageTarget()), 8 == MUSIC.userAgent.ie && $("a").attr("href", "javascript:;"), !1
            }
            return !1
        }, getSongUrl: function (t) {
            if (t.songmid || t.songid) {
                var e = "//y.qq.com/portal/song/" + t.songmid + ".html";
                return t.songtype && 1 != t.songtype && 11 != t.songtype && 13 != t.songtype && 3 != t.songtype && (e = "//y.qq.com/portal/song2/" + t.songtype + "/" + t.songid + ".html"), t.songtype && (111 == t.songtype || 112 == t.songtype || 113 == t.songtype) && (e = "//y.qq.com/portal/song2/" + t.songtype + "/" + t.songid + ".html"), t.disstid && t.songtype && (e = "//y.qq.com/portal/song3/" + t.songtype + "/" + t.disstid + "/" + t.songid + ".html"), e = MUSIC.util.getProtocol() + e
            }
            return "javascript:;"
        }, gotoMvdetail: function (t) {
            var e = "//y.qq.com/portal/mv/v/" + t.vid + ".html" + (t.stat ? "#stat=" + t.stat : "");
            return t.cid && (e = "//y.qq.com/portal/mv/c/" + t.cid + ".html" + (t.stat ? "#stat=" + t.stat : "")), e = MUSIC.util.getProtocol() + e, window.open(e, t.target || "_blank"), 8 == MUSIC.userAgent.ie && $("a").attr("href", "javascript:;"), !1
        }, gotoTaogedetail: function (t) {
            var e = "//y.qq.com/portal/playlist/" + t.disstid + ".html";
            return t.dirid && (e += "?dirid=" + t.dirid), e = MUSIC.util.getProtocol() + e, e += t.stat ? "#stat=" + t.stat : "", window.open(e, MUSIC.util.getPageTarget()), 8 == MUSIC.userAgent.ie && $("a").attr("href", "javascript:;"), !1
        }, gotoUser: function (t) {
            return t.target && "_blank" == t.target ? window.open(MUSIC.util.getProtocol() + "//y.qq.com/portal/profile.html?uin=" + t.uin + (t.stat ? "#stat=" + t.stat : ""), MUSIC.util.getPageTarget()) : location.href = MUSIC.util.getProtocol() + "//y.qq.com/portal/profile.html?uin=" + t.uin + (t.stat ? "#stat=" + t.stat : ""), 8 == MUSIC.userAgent.ie && $("a").attr("href", "javascript:;"), !1
        }, gotoprofile: function (t, e) {
            return -1 == location.href.indexOf("profile.html") || MUSIC.util.getUrlParams().uin ? (location.replace(MUSIC.util.getProtocol() + "//y.qq.com/portal/profile.html?tab=" + t + (e ? "#stat=" + e : "")), 8 == MUSIC.userAgent.ie && $("a").attr("href", "javascript:;")) : ($("#" + t + "_tab").click(), e && statistics.pgvClickStat(e)), !1
        }, getTarget: function (t) {
            var e = null;
            return t.target ? e = t.target : t.srcElement && (e = t.srcElement), e
        }
    }, MUSIC.string = {
        RegExps: {
            trim: /^\s+|\s+$/g,
            ltrim: /^\s+/,
            rtrim: /\s+$/,
            nl2br: /\n/g,
            s2nb: /[\x20]{2}/g,
            URIencode: /[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g,
            escHTML: {re_amp: /&/g, re_lt: /</g, re_gt: />/g, re_apos: /\x27/g, re_quot: /\x22/g},
            escString: {bsls: /\\/g, nl: /\n/g, rt: /\r/g, tab: /\t/g},
            restXHTML: {
                re_amp: /&amp;/g,
                re_lt: /&lt;/g,
                re_gt: /&gt;/g,
                re_apos: /&(?:apos|#0?39);/g,
                re_quot: /&quot;/g
            },
            write: /\{(\d{1,2})(?:\:([xodQqb]))?\}/g,
            isURL: /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i,
            cut: /[\x00-\xFF]/,
            getRealLen: {r0: /[^\x00-\xFF]/g, r1: /[\x00-\xFF]/g},
            format: /\{([\d\w\.]+)\}/g
        }, commonReplace: function (t, e, o) {
            return t.replace(e, o)
        }, listReplace: function (t, e) {
            if (MUSIC.lang.isHashMap(e)) {
                for (var o in e)t = MUSIC.string.commonReplace(t, e[o], o);
                return t
            }
            return t + ""
        }, escString: function (t) {
            var e = MUSIC.string.RegExps.escString, o = MUSIC.string.RegExps.escHTML;
            return MUSIC.string.listReplace(t + "", {
                "\\\\": e.bsls,
                "\\n": e.nl,
                "": e.rt,
                "\\t": e.tab,
                "\\'": o.re_apos,
                '\\"': o.re_quot
            })
        }, isURL: function (t) {
            return MUSIC.string.RegExps.isURL.test(t)
        }, getRealLen: function (t, e) {
            if ("string" != typeof t)return 0;
            if (e) {
                var o = t.replace(MUSIC.string.RegExps.getRealLen.r1, "");
                return t.length - o.length + encodeURI(o).length / 3
            }
            return t.replace(MUSIC.string.RegExps.getRealLen.r0, "**").length
        }
    }, $.extend(String.prototype, {
        trim: function () {
            return this.replace(/(^\s*)|(\s*$)/g, "")
        }, escapeHTML: function () {
            var t = document.createElement("div"), e = document.createTextNode(this);
            return t.appendChild(e), t.innerHTML
        }, unescapeHTML: function () {
            var t = document.createElement("div");
            return t.innerHTML = this, t.innerText || t.textNode || ""
        }, cut: function (t, e) {
            if (str = this, t -= 0, e = e || "...", isNaN(t))return str;
            for (var o = str.length, n = Math.min(Math.floor(t / 2), o), i = MUSIC.string.getRealLen(str.slice(0, n)); o > n && t > i; n++)i += 1 + (str.charCodeAt(n) > 255);
            return str.slice(0, i > t ? n - 1 : n) + (o > n ? e : "")
        }, jstpl_format: function (t) {
            function e(e, o) {
                return o in t ? t[o] : ""
            }

            return this.replace(/%\(([A-Za-z0-9_|.]+)\)/g, e)
        }, entityReplace: function () {
            return this.replace(/&#38;?/g, "&amp;").replace(/&amp;/g, "&").replace(/&#(\d+);?/g, function (t, e) {
                return String.fromCharCode(e)
            }).replace(/´/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&acute;/gi, "'").replace(/&nbsp;/g, " ").replace(/&#13;/g, "\n").replace(/(&#10;)|(&#x\w*;)/g, "").replace(/&amp;/g, "&")
        }, myEncode: function () {
            return this.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\/, "＼").replace(/\'/g, "’").replace(/\"/g, "“").replace(/&#39;/g, "’").replace(/&quot;/g, "“").replace(/&acute;/g, "’").replace(/\%/g, "％").replace(/\(/g, "（").replace(/\)/g, "）").replace(/\n/g, "")
        }, HtmlEncode: function () {
            function t(t) {
                for (var e = "", o = 0; o < t.length; o++)e += /\W/.test(t[o]) && t.charCodeAt(o) < 256 ? "&#" + t.charCodeAt(o) + ";" : t[o];
                return e
            }

            function e(t) {
                return t.replace(/&amp;/g, "&#38;").replace(/&lt;/g, "&#60;").replace(/&gt;/g, "&#62;").replace(/&quot;/g, "&#34;").replace(/&apos;/g, "&#39;").replace(/&nbsp;/g, "&#160;").replace(/&#(\d+);?/g, function (t, e) {
                    return String.fromCharCode(e)
                })
            }

            return t(e(this))
        }, parseEmoji: function () {
            return this.replace(/\[em(?:2)?\]e(\d{1,8})(?:,\d{1,3},\d{1,3})?\[\/em(?:2)?\]/gi, function (t, e) {
                return "<img src='//y.gtimg.cn/qzone/em/e" + e + ".gif' />"
            })
        }
    }), "undefined" != typeof _ && _.escape || (window._ = {
        escape: function (t) {
            return "string" != typeof t && (t += ""), t.HtmlEncode()
        }
    }), function () {
        MUSIC.userAgent.ie || (HTMLElement.prototype.__defineGetter__("innerText", function () {
            for (var t = "", e = this.childNodes, o = 0; o < e.length; o++)1 == e[o].nodeType ? t += "BR" == e[o].tagName ? "\n" : e[o].innerText : 3 == e[o].nodeType && (t += e[o].nodeValue);
            return t
        }), HTMLElement.prototype.__defineSetter__("innerText", function (t) {
            this.textContent = t
        }))
    }(), $(document).on("click", "body", function (t) {
        var e = MUSIC.util.getTarget(t);
        0 != $(e).parents(".mod_operate_menu").length || $(e).hasClass("mod_operate_menu") || ($(".mod_operate_menu").hide(), $(".songlist__item--current").removeClass("songlist__item--current"), $(".playlist__item--current").removeClass("playlist__item--current"))
    }), -1 == window.location.href.indexOf("pop_login.html") && $("body").append('<a href="javascript:;" class="btn_bottom_feedback sprite js_btn_feedback"><span class="icon_txt">意见反馈</span></a><a href="javascript:;" class="btn_bottom_player js_openplayer"><span class="icon_txt">播放器</span></a>'), $(document).off("click", ".js_btn_feedback").on("click", ".js_btn_feedback", function () {
        statistics.pgvClickStat("y_new.footer.feedback");
        var t = $(this).data("href");
        t ? window.open(t, "_blank") : window.open("//support.qq.com/discuss/602_1.shtml", "_blank")
    }).off("click", ".js_goto_old").on("click", ".js_goto_old", function () {
        statistics.pgvClickStat("y_new.footer.goto_oldportal")
    }).off("click", ".js_openplayer").on("click", ".js_openplayer", function () {
        MUSIC.player.checkAndOpenPlayer(), statistics.pgvClickStat("y_new.player.openplayer")
    }), document.addEventListener ? document.addEventListener("scroll", function () {
            getToTop()
        }) : document.attachEvent("onmousewheel", function () {
            getToTop()
        }), $.fn.popupmore = function () {
        var t = $(this), e = t.data("target"), o = parseInt(t.data("left")), n = parseInt(t.data("top")) - 50 || 0;
        $(document).on("click", "body", function (t) {
            var o = MUSIC.util.getTarget(t);
            0 != $(o).parents(".mod_operate_menu").length || 0 != $(o).parents(".popup_upload_cover").length || "js_sosopopup" == $(o).attr("id") || 0 != $(o).parents(".popup_data_detail").length || $(o).hasClass("mycard__qrcode") || ($(".js_menu_box").hide(), $("#" + e).hide(), $("#popup_phone_qrcode").hide())
        }), t.off("click", "").on("click", "", function (i) {
            i.preventDefault(), i.stopPropagation(), o ? t.data("top") ? $("#" + e).css({
                        top: i.pageY + n + "px",
                        left: i.pageX + o + "px"
                    }).show() : $("#" + e).css({left: i.pageX + o + "px"}).show() : t.data("top") ? $("#" + e).css({top: i.pageY + n + "px"}).show() : $("#" + e).show();
            var a = $(this).data("stat") || "";
            a && statistics.pgvClickStat(a)
        })
    }, setTimeout(function () {
        -1 == window.location.href.indexOf("search.html") && require.async("js/common/smartbox.js", function () {
            $(".js_smartbox").smartbox({
                container: "div.mod_top_search",
                ns: "mod_top_search",
                num: 10,
                callback: function (t) {
                    window.open(MUSIC.util.getProtocol() + "//y.qq.com/portal/search.html#searchid=1&remoteplace=txt.yqq.top&t=song&w=" + t, "_self")
                }
            })
        })
    }, 500), MUSIC.reportMap = {search: 1, songlist: 2, song: 3, album: 4, playlist: 5}, window.emopr = function (t) {
        return t
    }, window.showTopInfo = showTopInfo, showTopInfo(), setTimeout(function () {
        prepareDoanload()
    }, 500), MUSIC.userAgent.ie && MUSIC.userAgent._setTimeout && MUSIC.userAgent._setInterval && eval((MUSIC.userAgent.ie < 9 ? "var document = MUSIC.userAgent._doc;" : "") + "var setTimeout = MUSIC.userAgent._setTimeout, setInterval = MUSIC.userAgent._setInterval"), navigator.userAgent.search(/Windows (NT 5\.|NT 6\.0|XP|2000|2003)/) > -1 && $("body").addClass("os_xp"), MUSIC.userAgent.macs > -1 && $("body").addClass("os_mac"), $(function () {
        function t() {
            var t = 0, e = window.screen, o = navigator.userAgent.toLowerCase();
            return void 0 !== window.devicePixelRatio && o.indexOf("macintosh") < 1 ? t = window.devicePixelRatio : ~o.indexOf("msie") ? e.deviceXDPI && e.logicalXDPI && (t = e.deviceXDPI / e.logicalXDPI) : void 0 !== window.outerWidth && void 0 !== window.innerWidth && (t = window.outerWidth / window.innerWidth), o.indexOf("macintosh") > 0 && (t = 1), t && (t = Math.round(100 * t)), t
        }

        function e(t) {
            return
        }

        $("#stop-remind").on("click", function () {
            MUSIC.cookie.set("stop_remind", "stop_remind"), $("#zoom_warn").remove()
        }), MUSIC.cookie.get("stop_remind") || e(t()), $(window).resize(function () {
            $("#zoom_warn").remove(), MUSIC.cookie.get("stop_remind") || e(t())
        })
    }), setTimeout(function () {
        -1 == window.location.href.indexOf("mv_toplist.html") && -1 == window.location.href.indexOf("/portal/song") && -1 == window.location.href.indexOf("/portal/singer/") && -1 == window.location.href.indexOf("/portal/album/") && -1 == window.location.href.indexOf("/portal/playlist/") && -1 == window.location.href.indexOf("/portal/mv/") && statistics.doPvg(window.location.href.replace(new RegExp("(#)+.*"), "")), $.getScript("https://tajs.qq.com/stats?sId=58495963", function () {
        })
    }, 1e3);
    var stat = MUSIC.util.getUrlParams().stat || "";
    return stat && (statistics.pgvClickStat(stat), MUSIC.userAgent.ie || MUSIC.util.updateHash({stat: ""})), MUSIC.statistics = statistics, SPD.init && SPD.init({flag: [21273, 1, SPD.getStatSource()]}), MUSIC
});
;define("js/common/config.js", function () {
    var o = {
        debugLevel: 0,
        DCCookieDomain: "y.qq.com",
        dowbload: {},
        StorageHelperPage: "//y.gtimg.cn/music/miniportal_v4/tool/html/storage_helper.html"
    };
    return o
});
;define("js/common/jQueryAjax.js", function (e) {
    function t() {
        var e = a.get("uin"), t = 0;
        return "" == e ? t : t = 0 == e.indexOf("o") ? parseInt(e.substring(1, e.length), 10) : parseInt(e, 10)
    }

    var o = e("js/common/music/jquery.js"), a = e("js/common/music/cookie.js"), s = {
        _opts: {
            url: "",
            data: {
                loginUin: t() || 0,
                hostUin: 0,
                format: "jsonp",
                inCharset: "utf8",
                outCharset: "GB2312",
                notice: 0,
                platform: "yqq",
                needNewCode: 0
            },
            jsonpCallback: "MusicJsonCallback",
            charset: "GB2312",
            reportRate: 10,
            timeout: 5e4
        }, jsonp: function (e) {
            e.data = e.data || {}, this._opts.jsonpCallback = "MusicJsonCallback" + (Math.random() + "").replace("0.", "");
            var t = o.extend(!0, {}, this._opts, e), s = t.url;
            if ("string" == typeof s && s.indexOf("g_tk=") < 0) {
                var n, r, c = /\.(js|json)$/i;
                r = (n = s.indexOf("?") > -1) ? s.split("?")[0] : s, c.lastIndex = 0, c.test(r) || (s += (n ? "&" : "?") + "g_tk=" + a.getACSRFToken())
            }
            t.url = "bk.i.y.qq.com" == location.host ? s.replace("i.y.qq.com", "bk.i.y.qq.com") : s, t.data.outCharset = t.charset, t.data.format = /json/.test(t.data.format) ? t.data.format : "jsonp", t.startTime = +new Date, t.endTime = 0, o.ajax({
                url: t.url,
                data: t.data,
                type: "get",
                dataType: "jsonp",
                cache: !0,
                scriptCharset: t.charset,
                jsonp: "jsonpCallback",
                jsonpCallback: t.jsonpCallback,
                timeout: t.timeout,
                success: function (e) {
                    t.endTime = +new Date, "function" == typeof t.success && t.success(e), t.resultArgs = [e]
                },
                error: function (e, o, a) {
                    t.endTime = +new Date, "function" == typeof t.error && t.error(e, o, a)
                },
                complete: function (e, o) {
                    var a = {abort: 601, error: 602, parsererror: 603, timeout: 604};
                    t.statusCode = a[o] || 200, 0 == t.endTime && (t.endTime = +new Date)
                }
            })
        }, json: function (e) {
            e.data = e.data || {}, !e.data.platform && (e.data.platform = "jqmac.json");
            var t = o.extend(!0, {}, this._opts, e);
            t.data.outCharset = t.charset, t.data.format = "json", t.startTime = +new Date, t.endTime = 0, t.url = "bk.i.y.qq.com" == location.host ? t.url.replace("i.y.qq.com", "bk.i.y.qq.com") : t.url, o.ajax({
                url: t.url,
                data: t.data,
                type: "get",
                dataType: "json",
                cache: !0,
                timeout: t.timeout,
                success: function (e) {
                    t.endTime = +new Date, "function" == typeof t.success && t.success(e), t.resultArgs = [o.extend(e, {
                        code: e.code || 0,
                        subcode: e.subcode || 0
                    })]
                },
                error: function (e, o, a) {
                    t.endTime = +new Date, "function" == typeof t.error && t.error(e, o, a)
                },
                complete: function (e, o) {
                    0 == t.endTime && (t.endTime = +new Date), t.statusCode = e.status, "notmodified" == o && (t.resultArgs = [{
                        code: 0,
                        subcode: 0
                    }])
                }
            })
        }, post: function (e) {
            e.data = e.data || {}, !e.data.platform && (e.data.platform = "jqmac.json");
            var t = o.extend(!0, {}, this._opts, e);
            t.data.outCharset = t.charset, t.data.format = "json", t.data.g_tk = a.getACSRFToken(), t.startTime = +new Date, t.endTime = 0, t.url = "bk.i.y.qq.com" == location.host ? t.url.replace("i.y.qq.com", "bk.i.y.qq.com") : t.url, t.url = t.url + (t.url.indexOf("?") > -1 ? "&" : "?") + "g_tk=" + a.getACSRFToken(), o.ajax({
                url: t.url,
                data: t.data,
                type: "post",
                timeout: t.timeout,
                xhrFields: {withCredentials: !0},
                crossDomain: !0,
                success: function (e) {
                    t.endTime = +new Date, "function" == typeof t.success && t.success(e), t.resultArgs = [o.extend(e, {
                        code: e.code || 0,
                        subcode: e.subcode || 0
                    })]
                },
                error: function (e, o, a) {
                    t.endTime = +new Date, "function" == typeof t.error && t.error(e, o, a)
                },
                complete: function (e, o) {
                    0 == t.endTime && (t.endTime = +new Date), t.statusCode = e.status, "notmodified" == o && (t.resultArgs = [{
                        code: 0,
                        subcode: 0
                    }])
                }
            })
        }
    };
    return s
});
;define("js/common/player.js", function (require, exports, module) {
    var $ = require("js/common/music/jquery.js"), user = require("js/common/user.js"), popup = require("js/common/popup.js"), userAgent = require("js/common/userAgent.js"), cookie = require("js/common/music/cookie.js"), g_storage = require("js/common/music/storage.js"), player = function () {
        function makePlayTime(e) {
            var t = parseInt(e / 60, 10), i = e % 60;
            return 0 == t && 0 == i ? "--:--" : (10 > t ? "0" + t : t) + ":" + (10 > i ? "0" + i : i)
        }

        return {
            storage: {
                _list: null, _stoleLinkId: 0, get: function (callback) {
                    var _this = this;
                    try {
                        g_storage.get("y_playlist", function (data) {
                            top.y_playlist = [], data && (window.JSON && window.JSON.parse ? top.y_playlist = JSON.parse(data) : eval('top["y_playlist"] = ' + data)), _this._list = player.formatMusics(top.y_playlist), callback(_this._list)
                        })
                    } catch (e) {
                        callback([])
                    }
                }, save: function () {
                    for (var e = [], t = 0, i = [], n = 0, a = this._list.length; a > n; n++) {
                        var s = JSON.stringify(this._list[n]);
                        if (t += s.length + 3, n >= 999) {
                            MUSIC.popup.show("超过容量上限，将删除播放列表尾部部分单曲！");
                            break
                        }
                        i.push(this._list[n]), e.push(s)
                    }
                    return this._list = i, g_storage.set("y_playlist", JSON.stringify(this._list)), e.length
                }, add: function (e, t, i) {
                    var n = null, a = [], s = {}, o = this;
                    this.get(function () {
                        t = t || !1;
                        var r = MUSIC.player.getPlayerOptions().mod, l = parseInt(MUSIC.cookie.get("yq_index")) || 0, p = [];
                        if (2 == r || 1 == r || t) {
                            var y = {};
                            $.each(e, function (e, t) {
                                !t || t.songid in y || (y[t.songid] = 1)
                            }), $.each(o._list, function (e, t) {
                                !t || t.songid in y || p.push(t), t.songid in y && l > e && (l--, 0 > l && (l = 0))
                            })
                        } else p = o._list;
                        if (!i || 2 != r && 1 != r) 0 != r || t ? MUSIC.cookie.set("yq_index", l, null, null, 2400) : MUSIC.cookie.set("yq_index", 0, null, null, 2400); else {
                            l = 0;
                            var c = !1;
                            p.length > 0 ? ($.each(e, function (e, t) {
                                    p[0].songid == t.songid && (c = !0)
                                }), c ? MUSIC.cookie.set("yq_index", 0, null, null, 2400) : MUSIC.cookie.set("yq_index", 2 == r ? 1 : p.length, null, null, 2400)) : MUSIC.cookie.set("yq_index", 0, null, null, 2400)
                        }
                        return t || 1 == r && (t = !0), n = t ? p.concat(e) : 2 == r ? p.slice(0, l + 1).concat(e).concat(p.slice(l, p.length)) : e.concat(p), $.each(n, function (e, t) {
                            !t || t.songid in s || (a.push(t), s[t.songid] = 1)
                        }), o._list = a, o.save()
                    })
                }, del: function (e) {
                    var t = this;
                    this.get(function () {
                        e >= 0 && e < t._list.length && (t._list.splice(e, 1), t.save())
                    })
                }, delBatch: function (e) {
                    var t = this;
                    this.get(function () {
                        var i = player.storage._list;
                        $.each(e, function (e, t) {
                            t >= 0 && t < i.length && player.storage._list.splice(t, 1)
                        }), t.save()
                    })
                }, clear: function () {
                    this._list = [], this.save()
                }, insert: function (e, t) {
                    var i = this;
                    this.get(function () {
                        return e >= 0 && e < i._list.length && i._list.splice(e, 0, t), i.save()
                    })
                }
            },
            formatMusic: function (e) {
                function t(e) {
                    if (!e)return {};
                    if ("string" == typeof e)try {
                        e = JSON.parse(e)
                    } catch (t) {
                        return {}
                    }
                    if ("object" == typeof e) {
                        var i = {};
                        i.songid = e.id, i.songmid = e.mid, i.songtype = e.songtype, i.songname = e.name, i.songtitle = e.title, i.songsubtitle = e.subtitle, i.type = e.type, i.songtype = e.type, i.cdIdx = e.index_cd, i.interval = e.interval, i.isonly = e.isonly, i.singer = e.singer, e.album && (i.albumid = e.album.id, i.albummid = e.album.mid, i.albumname = e.album.name), e.file && (i.strMediaMid = e.file.media_mid, i.sizeape = e.file.size_ape, i.sizeflac = e.file.size_plac, i.sizeogg = e.file.size_ogg, i.preview = {}, i.preview.trybegin = e.file.try_begin, i.preview.tryend = e.file.try_end, i.preview.trysize = e.file.size_try), e.pay && (i.pay = {}, i.pay.payalbumprice = e.pay.price_album, i.pay.paydownload = e.pay.pay_download, i.pay.payplay = e.pay.pay_play, i.pay.timefree = e.pay.time_free), e.action && (i.msgid = e.action.msgid, i["switch"] = e.action["switch"], i.alertid = e.action.alert);
                        for (var n in i.singer)i.singer[n].name = i.singer[n].title;
                        return i
                    }
                }

                if ("string" == typeof e)try {
                    e = JSON.parse(e)
                } catch (i) {
                }
                if (e && e.id > 0 && !(e.songid > 0 || e.songmid) && (e = t(e)), "object" == typeof e) {
                    if ((1 == e.nodeType || e.constructor == $) && (e = JSON.parse(this.getSongData(e))), e.formatted)return e;
                    "undefined" != typeof e.type && 0 == e.type || "undefined" != typeof e["switch"] && 0 != e["switch"] || (e["switch"] = 403);
                    var n = e["switch"].toString(2).split("");
                    n.pop(), n.reverse();
                    var a = ["play_lq", "play_hq", "play_sq", "down_lq", "down_hq", "down_sq", "soso", "fav", "share", "bgm", "ring", "sing", "radio", "try", "give"];
                    e.action = {};
                    for (var s = 0; s < a.length; s++)e.action[a[s]] = parseInt(n[s], 10) || 0;
                    e.pay = e.pay || {}, e.preview = e.preview || {}, e.playTime = makePlayTime(e.interval), e.action.play = 0, (e.action.play_lq || e.action.play_hq || e.action.play_sq) && (e.action.play = 1), e.tryPlay = 0, e.action["try"] && e.preview.trysize > 0 && (e.tryPlay = 1), e.anyPlay = 0, (e.action.play || e.tryPlay) && (e.anyPlay = 1), e.tryIcon = 0, e.disabled = 0, e.action.play || e.pay.payplay || (e.tryPlay ? e.tryIcon = 1 : e.disabled = 1), e.sosoFlag = 0, (e.action.soso || 0 != e.type) && (e.sosoFlag = 1), e.formatted = 1, e.mtype = 0 != e.type ? "net" : "qqmusic", 0 == e.type && 1 == e.action.soso && (e.type = 3, e.mtype = "net", e.songurl = "http://dl.stream.qqmusic.qq.com/C100" + e.songmid + ".m4a?fromtag=0"), "qqmusic" == e.mtype && (e.songurl = ""), 35 == e.songtype && (e.songurl += "&fx=.m4a"), e.docid && !e.songid && (e.songid = e.docid), e.mid = e.songid.toString(), e.songname = e.songname.entityReplace(), e.albumname = e.albumname ? e.albumname.entityReplace() : "";
                    for (var s = 0; s < e.singer.length; s++)e.singer[s].name = e.singer[s].name.entityReplace(), 0 == s && (e.singername = e.singer[0].name, e.singerid = e.singer[0].id, e.singermid = e.singer[0].mid);
                    e.formatted = 1, e.fav = ""
                }
                if (e.type > 0) {
                    var o = e;
                    (111 == o.type || 112 == o.type || 113 == o.type) && (e.songurl = "http://dl.stream.qqmusic.qq.com/C1L0" + (o.strMediaMid || o.songmid) + ".m4a?fromtag=38")
                }
                return e
            },
            formatMusics: function (e, t) {
                t = t || 0;
                var i = [];
                return $(e).each(function (e) {
                    var n = {}, a = this;
                    a.data ? (n = player.formatMusic(a.data), n.grp && (n.grp = player.formatMusics(n.grp)), a.cur_count && (n.cur_count = a.cur_count), a.old_count && (n.old_count = a.old_count), a.in_count && (n.in_count = a.in_count)) : (n = player.formatMusic(a), n.grp && (n.grp = player.formatMusics(n.grp))), n.ix = e + t, i.push(n)
                }), i
            },
            formatSongSize: function (e) {
                return (parseInt(e) / 1024 / 1024).toString().substring(0, 4) + "M"
            },
            formatSongRate: function (e, t, i) {
                if (/^\d+$/.test(i) && i > 64e3 && 1e6 > i)return parseInt(i / 1e3, 10);
                if (!/^\d+$/.test(e) || !/^\d+$/.test(t))return "";
                var n = parseInt(e) / 1024 / parseInt(t) * 8;
                return 160 > n ? "128" : 224 > n ? "192" : 288 > n ? "256" : "320"
            },
            getProtocol: function () {
                return window.location.protocol
            },
            _windowName: "_yplaer",
            _windowHandler: null,
            _playerOptions: {deleteList: !0, mod: 0},
            getPlayerOptions: function () {
                var e = cookie.get("y_pl_op");
                if (e) {
                    var t = e.split("|");
                    t.length > 0 && (this._playerOptions.deleteList = 1 == parseInt(t[0])), t.length > 1 && (this._playerOptions.mod = parseInt(t[1]), (this._playerOptions.mod < 0 || this._playerOptions.mod > 2) && (this._playerOptions.mod = 0))
                }
                return this._playerOptions
            },
            setPlayerOptions: function (e) {
                var t = [];
                $.extend(this._playerOptions, e), this._playerOptions.deleteList ? t.push(1) : t.push(0), t.push(this._playerOptions.mod), cookie.set("y_pl_op", t.join("|"), null, null, 2400)
            },
            openPlayer: function (e, t, i) {
                this.getPlayerOptions(), t && this._playerOptions.deleteList && (g_storage.set("y_playlist", ""), player.storage.clear(), player.storage.add(e, i, !0));
                ["toolbar=0,status=0, menubar=0,location=0,width=", screen.width - 10, ",height=", screen.height - 30, ",left=0", ",top=0"].join("");
                this._windowHandler = window.open(this.getProtocol() + "//y.qq.com/portal/player.html", player._windowName), userAgent.safari && this._windowHandler.focus()
            },
            checkPlayerWindow: function () {
                this.isExists() || (this._windowHandler = window.open(this.getProtocol() + "//y.qq.com/portal/player.html", player._windowName))
            },
            isExists: function () {
                return $.jStorage.reInit(), $.jStorage.get("PLAYER_EXISTS")
            },
            play: function (e, t, n) {
                this._windowName = n ? "_yplaer" : "_yplaer", $(".songlist__item--current").removeClass("songlist__item--current");
                var a = e;
                ("number" == typeof a || "string" == typeof a) && (a = [a]);
                var s = !1, o = [], r = [];
                for (i = 0; i < a.length; i++) {
                    var l = a[i];
                    (l && l.action && l.action.play || (s = !0, !(a.length > 1) && l.tryPlay)) && (0 == l.type && (l.size128 <= 0 || l.interval <= 0) || 0 != l.type && !l.songurl || (l.songid > 0 && o.push(l.songid), l.docid = l.docid || "", r.push(l)))
                }
                if (1 == a.length) {
                    if (!(a[0] && a[0].action && a[0].action.play)) {
                        if (user.getUin() < 1e3 && a[0].pay && a[0].pay.payplay)return user.openLogin(), !1;
                        if (require.async("js/common/showMsg.js", function (e) {
                                e(a[0])
                            }), !r.length)return !1
                    }
                } else if (!r.length)return require.async("js/common/showMsg.js", function (e) {
                    e(a[0])
                }), !1;
                a = r, t = 1 == t ? 1 : 0, player.storage.get(function () {
                    return player.isExists() ? ($.jStorage.set("addplaylist", {
                            list: a,
                            play: t
                        }), player.storage.add(a, 0 == t ? !0 : !1, !1), $.jStorage.publish("addplaylist", {
                            list: a,
                            play: t
                        }), cookie.set("player_exist", 0), s ? popup.show("已添加至播放器，已过滤付费歌曲。") : popup.show("已经加入播放器！"), setTimeout(function () {
                            var e = parseInt(cookie.get("player_exist"));
                            return e ? void 0 : (player.storage.add(a, 0 == t ? !0 : !1, !0), player.openPlayer(a, !1, 0 == t ? !0 : !1))
                        }, 2e3), void 0) : ($.jStorage.set("addplaylist", {
                            list: a,
                            play: t
                        }), player.storage.add(a, 0 == t ? !0 : !1, !0), s ? popup.show("已添加至播放器，已过滤付费歌曲。") : popup.show("已经加入播放器！"), player.openPlayer(a, !0, 0 == t ? !0 : !1))
                })
            },
            add: function (e, t) {
                return this.play(e, 0, t)
            },
            checkAndOpenPlayer: function () {
                player.storage.get(function () {
                    return player.isExists() ? ($.jStorage.publish("focusplayer", {status: !0}), cookie.set("player_exist", 0), setTimeout(function () {
                            var e = parseInt(cookie.get("player_exist"));
                            return e ? void 0 : player.openPlayer([])
                        }, 800), void 0) : player.openPlayer([])
                })
            }
        }
    }();
    return player
});
;define("js/common/popup.js", function (p) {
    var o = p("js/common/music/jquery.js"), s = (p("js/common/music/cookie.js"), {
        show: function (s, i, n) {
            i = i || 3e3, o("#popup").length < 1 ? (o("body").append('<div class="mod_popup_tips" id="popup" style="z-index:10000000;display:none;"><i class="popup_tips__icon' + (n && 1 == n ? " popup_tips__icon_warn" : "") + '"></i><h2 class="popup_tips__tit">' + s + "</h2></div>"), p.async("js/common/music/tips.js", function (p) {
                    o("#popup").show(), p.fix_elem(o("#popup"))
                })) : (n && 1 == n ? o("#popup i").hasClass("popup_tips__icon_warn") || o("#popup i").addClass("popup_tips__icon_warn") : o("#popup i").hasClass("popup_tips__icon_warn") && o("#popup i").removeClass("popup_tips__icon_warn"), o("#popup h2").html(s), p.async("js/common/music/tips.js", function (p) {
                    o("#popup").show(), p.fix_elem(o("#popup"))
                })), setTimeout(function () {
                o("#popup").fadeOut()
            }, i)
        }, hide: function () {
            o("#popup").fadeOut()
        }
    });
    return s
});
;define("js/common/spd.js", function (t) {
    {
        var n = t("js/common/music/jquery.js");
        t("js/common/music/cookie.js")
    }
    return window.SPD = window.SPD || {}, n.extend(SPD, {
        sendFlag: !1, getStatSource: function () {
            var t = {
                "i.y.qq.com/v8/fcg-bin/fcg_first_mac.fcg": 1,
                "y.qq.com/portal/song": 2,
                "y.qq.com/portal/album_lib.html": 3,
                "y.qq.com/portal/mv_lib.html": 4
            };
            for (var n in t) {
                var o = new RegExp(n);
                if (o.test(window.location.href))return t[n];
                if ("/" == window.location.pathname)return 1
            }
            return 99
        }, flag: [], pointTime: {}, markStart: function (t, n) {
            this.pointTime[t] = n || new Date
        }, markEnd: function (t, n) {
            this.pointTime[t] && (this._timing[t] = (n || new Date) - this.pointTime[t], this.send(), this.pointTime[t] = 0)
        }, send: function (t) {
            this.sendFlag = !0;
            var o = t || this._timing;
            if (!this.flag.length)return !1;
            var i = new Image, e = {
                appid: 10013,
                speedparams: this.flag.join("&") + "&" + (o instanceof Array ? o.join("&") : n.param(o)),
                platform: "ios",
                app: "other"
            };
            i.src = location.protocol + "//report.huatuo.qq.com/report.cgi?" + n.param(e), i.onload = i.onerror = function () {
                i = null
            }, this._timing = {}
        }, init: function (t) {
            function o() {
                var t = {};
                if (window.performance && performance.timing)try {
                    for (var o = performance.timing, e = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"], a = o.navigationStart, r = 1, s = e.length; s > r; r++) {
                        if ("undefined" != typeof o[e[r]] && o[e[r]] > 0) {
                            var c = o[e[r]] - a;
                            if (c > 0 && 1e5 > c) {
                                t[r] = c;
                                continue
                            }
                        }
                        t[r] = 0
                    }
                    i._timing[28] = o.connectEnd - o.connectStart, i._timing[29] = o.responseStart - o.requestStart, i._timing[30] = o.responseEnd - o.responseStart
                } catch (m) {
                }
                n.extend(i._timing, t), SPD.send()
            }

            var i = this;
            t && t.flag instanceof Array && (this.flag.push("flag1=" + (t.flag[0] || 0)), this.flag.push("flag2=" + (t.flag[1] || 0)), this.flag.push("flag3=" + (t.flag[2] || 0)), t.flag[3] && this.flag.push("flag4=" + t.flag[3]), n(window).on("load", function () {
                setTimeout(function () {
                    o()
                }, 100)
            }), setTimeout(function () {
                SPD.sendFlag || o()
            }, 2e3))
        }
    }), SPD
});
;define("js/common/user.js", function (n) {
    var e = n("js/common/music/cookie.js"), i = n("js/common/music/jquery.js"), o = n("js/common/statastic.js"), t = n("js/common/jQueryAjax.js"), a = {
        key: "userinfo_detail_yqq",
        clientStorage: function (n, e, i) {
            var o = "";
            try {
                o = window.external.ClientStorage(n, e || "", i || "") || ""
            } catch (t) {
                return o
            }
            return o
        },
        set: function (n) {
            var o = c.getUin(), t = ["uin=" + o];
            i.each(n, function (n, e) {
                e.constructor != Function && t.push(n + "=" + escape(e))
            });
            try {
                sessionStorage.setItem(this.key, t.join(","))
            } catch (a) {
                this.clientStorage("set", this.key, t.join(",")), e.set(this.key, "1", "music.qq.com", "/portal/")
            }
        },
        get: function () {
            try {
                var n = {}, o = sessionStorage.getItem(this.key), t = o ? o.split(",") : [];
                return 0 == t.length ? null : (i.each(t, function (e, i) {
                        var o = i.split("=");
                        n[o[0]] = unescape(o[1])
                    }), n)
            } catch (a) {
                if (1 != e.get(this.key))return null;
                var n = {}, o = this.clientStorage("get", this.key), t = o ? o.split(",") : [];
                return 0 == t.length ? null : (i.each(t, function (e, i) {
                        var o = i.split("=");
                        n[o[0]] = unescape(o[1])
                    }), n)
            }
        },
        clear: function () {
            try {
                sessionStorage.removeItem(this.key), this.clientStorage("remove", this.key), e.del(this.key)
            } catch (n) {
            }
        }
    }, c = {
        getUin: function () {
            var n = e.get("uin") || e.get("luin") || e.get("p_uin") || e.get("p_luin"), i = 0;
            return "" == n ? i : i = 0 == n.indexOf("o") ? parseInt(n.substring(1, n.length), 10) : parseInt(n, 10)
        }, isLogin: function () {
            return c.getUin() > 1e4 ? !0 : !1
        }, _loginCallback: null, _closeCallback: null, openLogin: function (e, i) {
            this._loginCallback = i, n.async("js/common/dialog.js", function (n) {
                n.show({
                    mode: "iframe",
                    dialogclass: "popup_login",
                    title: "登录",
                    url: e ? "//y.qq.com/portal/pop_login.html" : "//ui.ptlogin2.qq.com/cgi-bin/login?daid=384&pt_no_auth=1&style=11&appid=1006102&s_url=" + encodeURIComponent(window.location.href) + "&low_login=1&hln_css=&hln_title=&hln_acc=&hln_pwd=&hln_u_tips=&hln_p_tips=&hln_autologin=&hln_login=&hln_otheracc=&hide_close_icon=1&hln_qloginacc=&hln_reg=&hln_vctitle=&hln_verifycode=&hln_vclogin=&hln_feedback=",
                    objArg: {}
                }), setTimeout(function () {
                    n.onReady(0, 0)
                }, 500), window.ptlogin2_onResize = function () {
                    n.onReady(0, 0)
                }, window.ptlogin2_onClose = function () {
                    n.hide()
                }
            })
        }, onLogin: function () {
            this._loginCallback && (this._loginCallback(), this._loginCallback = null), window.ptlogin2_onClose()
        }, loginOut: function (n) {
            c.clearAllCookies(), n ? n() : window.location.reload()
        }, clearAllCookies: function () {
            e.del("uin", "qq.com"), e.del("skey", "qq.com"), e.del("p_uin", "y.qq.com"), e.del("p_skey", "y.qq.com"), e.del("luin", "qq.com"), e.del("lskey", "qq.com"), e.del("p_luin", "y.qq.com"), e.del("p_lskey", "y.qq.com"), a.clear()
        }, clearCache: function () {
            a.clear()
        }, getVipInfo: function (n, e) {
            function i(n) {
                function e(n) {
                    return 10 > n ? "0" + n : "" + n
                }

                if (!n || "" == n)return n;
                var i, o, t;
                if (i = n.substr(5, 5).replace(/-/g, "/") + "/" + n.substr(0, 4) + n.substr(10), o = parseInt(Date.parse(i), 10) / 1e3, o >= 0)return n;
                o >>>= 0, t = new Date(1e3 * o);
                var a = t.getFullYear(), c = e(t.getMonth() + 1), l = e(t.getDate()), s = e(t.getHours()), r = e(t.getMinutes()), u = e(t.getSeconds()), g = a + "-" + c + "-" + l + " " + s + ":" + r + ":" + u;
                return g
            }

            var o = c.getUin();
            if (10001 > o)return e && e(), void 0;
            var l = a.get();
            return null != l && l.uin == this.getUin() ? (!!n && n(l), void 0) : (a.clear(), t.jsonp({
                    url: "//c.y.qq.com/portalcgi/fcgi-bin/music_mini_portal/fcg_getuser_infoEx.fcg?rnd=" + parseInt((new Date).valueOf() / 600),
                    data: {},
                    jsonpCallback: "MusicJsonCallback" + parseInt(1e4 * Math.random()),
                    charset: "utf-8",
                    success: function (o) {
                        if ("code" in o && 0 != o.code) e && e(); else {
                            var t = o.data;
                            !!t.start && (t.start = i(t.start)), !!t.end && (t.end = i(t.end)), !!t.yearstart && (t.yearstart = i(t.yearstart)), !!t.yearend && (t.yearend = i(t.yearend)), !!t.expire && (t.expire = i(t.expire)), !!t.nowtime && (t.nowtime = i(t.nowtime)), (1 == t.vip || 2 == t.vip) && a.set(t), !!n && n(t)
                        }
                    },
                    error: function () {
                        e && e()
                    }
                }), void 0)
        }, openVip: function (e, i, t) {
            i = i || !0, t && "" != t && o.pgvClickStat(t), c.getVipInfo(function () {
                e = e || "music.yyw.svip.public.1", n.load("//y.gtimg.cn/bossweb/ipay/js/api/cashier.js", function () {
                    var n = ["xxzxhh"];
                    i || (n = ["xxzxsj"]);
                    cashier.dialog.buy({
                        codes: n.join(","),
                        debug: !1,
                        aid: e,
                        amount: 3,
                        skin: "minipay9",
                        height: 400,
                        onSuccess: function () {
                            a.clear(), window.location.reload()
                        }
                    })
                })
            }, function () {
                c.openLogin()
            })
        }, openPayMusic: function (e, i) {
            c.getVipInfo(function (t) {
                var c = 0;
                1 == parseInt(t.twelve, 10) && (c = 1, e = e.replace(/20320/gi, "20321"), i = i.replace(/20320/gi, "20321")), i && "" != i && o.pgvClickStat(i), n.load("//y.gtimg.cn/bossweb/ipay/js/api/cashier.js", function () {
                    {
                        var n = [["qqmsey", "qqmstw"], ["qqmstw", "qqmsey"]];
                        cashier.dialog.buy({
                            codes: n[c].join(","),
                            debug: !1,
                            aid: e,
                            amount: 3,
                            skin: "minipay9",
                            height: 400,
                            onSuccess: function () {
                                a.clear(), window.location.reload()
                            }
                        })
                    }
                })
            }, function () {
                c.openLogin()
            })
        }, buyAlbum: function (e) {
            var o = o || c.getUin();
            if (10001 > o)return c.openLogin(), void 0;
            var t = e;
            t.albumid > 0 && n.async("js/common/dialog.js", function (e) {
                e.show({
                    mode: "iframe",
                    dialogclass: "popup_login",
                    title: "QQ音乐",
                    width: 490
                }), n.load(location.protocol + "//fusion.qzone.qq.com/fusion_loader?max_age=604800&appid=1450001616&platform=qzone", function () {
                    n.load("//y.gtimg.cn/music/live/module/albumbuy.js", function () {
                        window.$ = MUSIC.$, albumBuy(i.extend({
                            container: i("#dialogbox")[0],
                            title: "购买数字专辑",
                            success: function () {
                                e.hide(), window.location.reload()
                            },
                            error: function (n) {
                                n.code && 1e3 == n.code ? (e.hide(), c.openLogin()) : window.location.reload()
                            }
                        }, t)), setTimeout(function () {
                            e.onReady(490, 320)
                        }, 500)
                    })
                })
            })
        }, getQzoneUserImage: function (n, e) {
            return this.getQQUserImage(n)
        }, getQQUserImage: function (n, o) {
            if (n = parseInt(n, 10) || c.getUin(), !o)return 10001 > n ? "//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000" : "//c.y.qq.com/tplcloud/fcgi-bin/fcg_get_qqhead_image.fcg?jump=1&uin=" + n + "&g_tk=" + e.getACSRFToken();
            if (10001 > n)return o("//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000");
            var a = "//c.y.qq.com/tplcloud/fcgi-bin/fcg_get_qqhead_image.fcg?jump=0&uinlist=" + n + "&rnd=" + Math.random();
            t.jsonp({
                url: a, charset: "utf-8", jsonpCallback: "qqimgcallback", success: function (n) {
                    var e = [];
                    i.each(n.data.urllist, function (n, i) {
                        e.push({uin: i.uin, url: i.url.replace("http://", window.location.protocol + "//")})
                    }), e.length > 0 ? o(e[0].url) : o("//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000")
                }, error: function () {
                    o("//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000")
                }
            })
        }
    };
    return c
});
;define("js/common/userAgent.js", function () {
    {
        var e, i, n, o = {}, a = navigator.userAgent;
        navigator.appVersion
    }
    if (o.adjustBehaviors = function () {
        }, window.ActiveXObject || window.msIsStaticHTML) {
        if (o.ie = 6, (window.XMLHttpRequest || a.indexOf("MSIE 7.0") > -1) && (o.ie = 7), (window.XDomainRequest || a.indexOf("Trident/4.0") > -1) && (o.ie = 8), a.indexOf("Trident/5.0") > -1 && (o.ie = 9), a.indexOf("Trident/6.0") > -1 && (o.ie = 10), (a.indexOf("Trident/7.0") > -1 || "undefined" == typeof attachEvent) && (o.ie = 11), o.isBeta = navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf("beta") > -1, o.ie < 7)try {
            document.execCommand("BackgroundImageCache", !1, !0)
        } catch (t) {
        }
        o._doc = document, n = function (e) {
            return function (i, n) {
                var o;
                return "string" == typeof i ? e(i, n) : (o = Array.prototype.slice.call(arguments, 2), e(function () {
                        i.apply(null, o)
                    }, n))
            }
        }, o._setTimeout = n(window.setTimeout), o._setInterval = n(window.setInterval)
    } else document.getBoxObjectFor || "undefined" != typeof window.mozInnerScreenX ? (e = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i, o.firefox = parseFloat((e.exec(a) || e.exec("Firefox/3.3"))[1], 10)) : navigator.taintEnabled ? window.opera ? o.opera = parseFloat(window.opera.version(), 10) : o.ie = 6 : (i = /AppleWebKit.(\d+\.\d+)/i.exec(a), o.webkit = i ? parseFloat(i[1], 10) : document.evaluate ? document.querySelector ? 525 : 420 : 419, (i = /Chrome.(\d+\.\d+)/i.exec(a)) || window.chrome ? o.chrome = i ? parseFloat(i[1], 10) : "2.0" : ((i = /Version.(\d+\.\d+)/i.exec(a)) || window.safariHandler) && (o.safari = i ? parseFloat(i[1], 10) : "3.3"), o.air = a.indexOf("AdobeAIR") > -1 ? 1 : 0, o.isiPad = a.indexOf("iPad") > -1, o.isiPhone = a.indexOf("iPhone") > -1);
    return o.sougou = a.indexOf("SE 2.X") > -1 ? 1 : 0, (o.macs = a.indexOf("Mac OS X") > -1) || (o.windows = (i = /Windows.+?(\d+\.\d+)/i.exec(a), i && parseFloat(i[1], 10)), o.linux = a.indexOf("Linux") > -1, o.android = a.indexOf("Android") > -1), o.iOS = a.indexOf("iPhone OS") > -1, !o.iOS && (i = /OS (\d+(?:_\d+)*) like Mac OS X/i.exec(a), o.iOS = i && i[1] ? !0 : !1), o
});
;define("js/common/fav.js", function (e) {
    function i(e) {
        return e.replace(/\[em(?:2)?\]e(\d{1,8})(?:,\d{1,3},\d{1,3})?\[\/em(?:2)?\]/gi, function (e, i) {
            var n = "", t = "", s = "", o = "";
            return i >= 100 && 204 >= i ? (window.devicePixelRatio >= 1.5 && (s = "@2x", t += ' style="zoom:0.4285"'), o = "/2.0", n = i + s + ".gif") : (i > 1e6 && window.devicePixelRatio >= 1.5 && (s = "@2x"), n = i + s + ".gif", 1e6 > i || (t = window.devicePixelRatio >= 1.5 ? 'style="zoom:0.5"' : "")), "<img width='18px' src='" + location.protocol + "//y.gtimg.cn/qzone/em" + o + "/e" + n + "' " + t + " />"
        })
    }

    var n = e("js/common/music.js"), t = n, s = n.$, s = (e("js/common/music/lib/base.js"), n.$), o = n.widget.user, a = n.popup, c = n.statistics;
    Tips = e("js/common/music/tips.js");
    var r = n.userAgent, l = function () {
        function n(e, i) {
            function n() {
                a.show("保存歌单失败！当前网络繁忙，请您稍后重试。", 3e3, 1)
            }

            var c = "//c.y.qq.com/splcloud/fcgi-bin/fcg_fav_modsongdirdetail.fcg", r = {};
            e.moddirids <= 0 ? (T = !1, s("#fav_pop").remove(), c = "//c.y.qq.com/splcloud/fcgi-bin/create_playlist.fcg", r = {
                    uin: e.uin || o.getUin(),
                    name: e.moddirnames.replace(/,/g, "，"),
                    description: e.moddesc || "",
                    show: e.moddirshows || 1,
                    pic_url: e.modFPicUrl || "",
                    tags: e.modtagList || "",
                    tagids: e.tagids || ""
                }) : (s.extend(r, e), r.source = 103, r.modnum = 1), r.formsender = 1;
            var l = new t.FormSender(c, "post", r, "gb2312");
            l.onSuccess = function (t) {
                switch (t.code) {
                    case 0:
                        e.moddirids <= 0 ? i(t.dirid) : i(e.moddirids);
                        break;
                    case 1:
                    case 2:
                        o.openLogin(null, "parent");
                        break;
                    case 4:
                        a.show("操作失败！您输入的歌单名称过长！", 3e3, 1);
                        break;
                    case 10:
                        a.show("操作失败！您输入的标签文字过多！", 3e3, 1);
                        break;
                    case 11:
                        a.show("操作失败！您输入的标签内容非法！", 3e3, 1);
                        break;
                    case 12:
                        a.show("操作失败！您输入的歌单名非法！", 3e3, 1);
                        break;
                    case 13:
                        a.show("操作失败！您输入的歌单简介内容非法！", 3e3, 1);
                        break;
                    case 21:
                        a.show("操作失败！您输入的歌单名称和其他歌单有重复！", 3e3, 1);
                        break;
                    case 24:
                        a.show("操作失败！您输入的歌单名称和系统歌单有重复！", 3e3, 1);
                        break;
                    case 30:
                        a.show("操作失败！" + t.msg, 3e3, 1);
                        break;
                    default:
                        n()
                }
            }, l.onError = n, l.send()
        }

        function d(e, i) {
            function n() {
                t.popup.show("收藏失败！当前网络繁忙，请您稍后重试。", 3e3)
            }

            e.formsender = 1, e.source = 153, e.r2 = 0, e.r3 = 1, e.utf8 = 1;
            var s = "//c.y.qq.com/splcloud/fcgi-bin/fcg_music_add2songdir.fcg";
            if (r.chrome) e.formsender = 4, t.jQueryAjax.post({
                url: s,
                charset: "utf-8",
                data: e,
                success: function (n) {
                    switch (n.code) {
                        case 0:
                            e.addtype && "create" == e.addtype ? a.show("创建歌单成功！您的歌单会同步到云端，登录帐号即可随时随地查看。", 3e3) : a.show("添加歌曲到歌单成功！", 1e3), i();
                            break;
                        case 1:
                            o.openLogin();
                            break;
                        case 31:
                        case 32:
                        case 41:
                            var t = n.title ? n.title : "对不起，操作失败！", s = '<a href="//pay.qq.com/music/index.shtml?aid=music.bfq.gdsx.1&clientuin="' + e.uin + ' target="_blank" title="开通绿钻，畅享最高25000首的超大空间>>">开通绿钻，畅享最高25000首的超大空间>></a>', c = n.msg ? n.msg : "";
                            !!n.title && "" != c && (c += s), a.show(t + c, 3e3, 1), e.addtype && "create" == e.addtype && setTimeout(function () {
                                alert("goto taogedetail")
                            }, 1e3)
                    }
                },
                error: n
            }); else {
                var c = new t.FormSender(s, "post", e, "utf-8");
                c.onSuccess = function (n) {
                    switch (n.code) {
                        case 0:
                            e.addtype && "create" == e.addtype ? a.show("创建歌单成功！您的歌单会同步到云端，登录帐号即可随时随地查看。", 3e3) : a.show("添加歌曲到歌单成功！", 1e3), i();
                            break;
                        case 1:
                            o.openLogin();
                            break;
                        case 31:
                        case 32:
                        case 41:
                            var t = n.title ? n.title : "对不起，操作失败！", s = '<a href="//pay.qq.com/music/index.shtml?aid=music.bfq.gdsx.1&clientuin="' + e.uin + ' target="_blank" title="开通绿钻，畅享最高25000首的超大空间>>">开通绿钻，畅享最高25000首的超大空间>></a>', c = n.msg ? n.msg : "";
                            !!n.title && "" != c && (c += s), a.show(t + c, 3e3, 1), e.addtype && "create" == e.addtype && setTimeout(function () {
                                alert("goto taogedetail")
                            }, 1e3)
                    }
                }, c.onError = n, c.send()
            }
        }

        function u(e, i, n) {
            function s() {
                a.show("收藏失败！当前网络繁忙，请您稍后重试。", 3e3, 1)
            }

            e.formsender = 1, e.utf8 = 1;
            var c = "//c.y.qq.com/qzone/fcg-bin/fcg_music_add2fav_url_qqmusic.fcg";
            if (r.chrome) e.formsender = 4, t.jQueryAjax.post({
                url: c,
                charset: "utf-8",
                data: e,
                success: function (t) {
                    switch (t.code) {
                        case 0:
                            n || a.show("收藏成功！歌曲已收藏到您指定的歌单。", 3e3), i(t);
                            break;
                        case 2:
                            o.openLogin();
                            break;
                        case 31:
                        case 32:
                        case 41:
                            var c = t.title ? t.title : "收藏失败！", r = '<a href="//pay.qq.com/music/index.shtml?aid=music.bfq.gdsx.1&clientuin=' + e.uin + '" target="_blank" title="开通绿钻，畅享最高25000首的超大空间>>">开通绿钻，畅享最高25000首的超大空间>></a>', l = t.msg ? t.msg : "";
                            !!t.title && "" != l && (l += r), a.show(c + l, 3e3, 1);
                            break;
                        default:
                            s()
                    }
                },
                error: s
            }); else {
                var l = new t.FormSender(c, "post", e, "utf-8");
                l.onSuccess = function (t) {
                    switch (t.code) {
                        case 0:
                            n || a.show("收藏成功！歌曲已收藏到您指定的歌单。", 3e3), i(t);
                            break;
                        case 2:
                            o.openLogin();
                            break;
                        case 31:
                        case 32:
                        case 41:
                            var c = t.title ? t.title : "收藏失败！", r = '<a href="//pay.qq.com/music/index.shtml?aid=music.bfq.gdsx.1&clientuin=' + e.uin + '" target="_blank" title="开通绿钻，畅享最高25000首的超大空间>>">开通绿钻，畅享最高25000首的超大空间>></a>', l = t.msg ? t.msg : "";
                            !!t.title && "" != l && (l += r), a.show(c + l, 3e3, 1);
                            break;
                        default:
                            s()
                    }
                }, l.onError = s, l.send()
            }
        }

        function p() {
            t.player.add(L.songs)
        }

        function f(e, i, n, a) {
            function c() {
                r.songtitle.length > 0 ? u({
                        uin: o.getUin(),
                        songtitle: r.songtitle.join(","),
                        singer: r.singer.join(","),
                        url: r.url.join(","),
                        dirid: i,
                        addtype: a || ""
                    }, function () {
                        201 == i && s(document).trigger("like", {data: e, flag: 1}), n && n()
                    }) : (201 == i && s(document).trigger("like", {data: e, flag: 1}), n && n())
            }

            if (1 == e.length && 5 == e[0].songtype)return t.popup.show("对不起，本地上传单曲不支持添加到我喜欢！", 3e3, 1), void 0;
            var r = {songtitle: [], singer: [], url: []}, l = {midlist: [], typelist: []};
            return s.each(e, function (e, i) {
                5 != i.songtype && (111 == i.songtype || 112 == i.songtype || 113 == i.songtype ? (l.midlist.push(i.songmid), l.typelist.push(i.songtype)) : i.songmid ? (l.midlist.push(i.songmid), l.typelist.push(13)) : (r.songtitle.push(i.songname), r.singer.push(i.singer[0].name), r.url.push(i.songurl)))
            }), 0 == l.typelist.length && 0 == r.url.length ? (t.popup.show("没有可添加到我喜欢的歌曲！", 3e3, 1), void 0) : (l.midlist.length > 0 ? d({
                        uin: o.getUin(),
                        midlist: l.midlist.join(","),
                        typelist: l.typelist.join(","),
                        dirid: i,
                        addtype: a || ""
                    }, function () {
                        c()
                    }) : c(), void 0)
        }

        function m(i) {
            function o() {
                var e = 20, i = s("#new_playlist_fav"), n = s("#name_leftnum_fav"), o = t.string.getRealLen(i.val());
                o = Math.ceil(o / 2), e >= o ? (n.html(e - o), n.css({color: "#999"})) : (n.html("-" + (o - e)), n.css({color: "#F70505"}))
            }

            s(document).on("keyup input propertychange", "#new_playlist_fav", function () {
                o()
            }), e.async("js/common/dialog.js", function (e) {
                e.show({
                    mode: "common",
                    width: 520,
                    dialogclass: "popup_new_list",
                    content: ['<label class="form__label">歌单名</label>', ' <div class="mod_form_txt">', ' <input type="text" value="" class="form_txt__input" id="new_playlist_fav"><span class="form_txt__tips" id="name_leftnum_fav">20</span>', "</div>"].join(""),
                    title: "创建新歌单",
                    button_info1: {
                        highlight: 0, fn: function () {
                            e.hide()
                        }, title: "取消"
                    },
                    button_info2: {
                        highlight: 1, fn: function () {
                            if ("" == s("#new_playlist_fav").val())return t.popup.show("请输入歌单名！", 3e3, 1), void 0;
                            if (parseInt(s("#name_leftnum_fav").html()) < 0)return t.popup.show("歌单名最多20个字！", 3e3, 1), void 0;
                            var o = {moddirnames: s("#new_playlist_fav").val(), moddirids: 0};
                            n(o, function (n) {
                                f(i, n, function () {
                                    t.popup.show("已成功添加到新建歌单"), e.hide()
                                }, !0)
                            })
                        }, title: "确定"
                    }
                })
            })
        }

        function g(e) {
            s(document).off("click", ".js_addto_playlist").on("click", ".js_addto_playlist", function () {
                e && c.pgvClickStat(e + ".playlist"), p(), l.hide()
            }).off("click", ".js_addto_taogelist").on("click", ".js_addto_taogelist", function () {
                e && c.pgvClickStat(e + ".gedan"), f(L.songs, s(this).data("dirid"), function () {
                    t.popup.show("已成功添加到歌单"), l.hide()
                })
            }).off("click", ".js_addto_new").on("click", ".js_addto_new", function () {
                e && c.pgvClickStat(e + ".newgedan"), m(L.songs), l.hide()
            })
        }

        function h(e) {
            return o.getUin() < 1e4 ? (e({list: []}), void 0) : (t.jQueryAjax.jsonp({
                    url: "//c.y.qq.com/splcloud/fcgi-bin/songlist_list.fcg?utf8=1&callback=MusicJsonCallBack&uin=" + o.getUin() + "&rnd=" + Math.random(),
                    charset: "utf-8",
                    jsonpCallback: "MusicJsonCallBack",
                    success: function (i) {
                        if (0 != i.retcode)return e({list: []}), void 0;
                        for (var n in i.list)(205 == parseInt(i.list[n].dirid) || 206 == parseInt(i.list[n].dirid)) && i.list.splice(n, 1);
                        e(i)
                    },
                    error: function () {
                        return {list: []}
                    }
                }), void 0)
        }

        function v(i, n, o, a) {
            function c() {
                s(document).off("click", ".js_back").on("click", ".js_back", function () {
                    o.show(), s("#fav_pop").hide()
                })
            }

            function r() {
                s(d).data("flag", "1"), s(d).parents(".songlist__item").addClass("songlist__item--current"), s("#fav_pop").css({display: "block"}), o ? (c(), s("#fav_pop a.js_back").length <= 0 && s("#fav_pop div.operate_menu__cont").prepend(p), Tips.fix_elem(s("#fav_pop"), o, 0), o.hide()) : (s(".js_back").hide(), s("#fav_pop").css({
                        left: n.pageX + 12 + "px",
                        top: n.pageY + "px"
                    }))
            }

            if (1 == i.songs.length && 0 == i.songs[0].action.fav)return e.async("js/common/showMsg.js", function (e) {
                e(i.songs[0])
            }), void 0;
            if (1 == i.songs.length && 5 == i.songs[0].songtype)return t.popup.show("对不起，本地上传单曲不支持收藏到歌单！", 3e3, 1), void 0;
            var l = [];
            if (i.songs.length > 0 && (s.each(i.songs, function (e, i) {
                    1 == i.action.fav && 5 != i.songtype && l.push(i)
                }), l.length <= 0))return t.popup.show("没有可添加的歌曲！", 3e3, 1), void 0;
            i.songs = l, n.preventDefault(), n.stopPropagation(), "none" == s("#fav_pop").css("display") && s(".list_menu__icon_add").data("flag", "0");
            var d = t.util.getTarget(n), u = s(d).data("flag");
            if (u && "1" == u)return s(d).data("flag", "0"), s("#fav_pop").hide(), void 0;
            s(".list_menu__icon_add").data("flag", "0"), s("#share_pop").hide(), s.extend(L, i);
            var p = (s("#fav_pop"), '<a href="javascript:;" class="operate_menu__link js_back"><i class="operate_menu__icon_prev_arrow sprite"></i>添加到</a>'), f = !0;
            s.each(i.songs, function (e, i) {
                "" == i.fav && (f = !1)
            }), T ? (f ? s('.js_addto_taogelist[data-dirid="201"]').addClass("operate_menu__link--disabled ") : s('.js_addto_taogelist[data-dirid="201"]').removeClass("operate_menu__link--disabled "), r()) : h(function (e) {
                    e.player = -1 == window.location.href.indexOf("/portal/player.html") ? 0 : 1, s("body").append(function (e) {
                        {
                            var i, n = "";
                            Array.prototype.join
                        }
                        if (n += "", e.list && e.list.length > 0) {
                            n += '\r\n    <!-- 添加到 -->\r\n    <div class="mod_operate_menu" style="position:absolute;" id="fav_pop">\r\n        <div class="operate_menu__cont">\r\n            <a href="javascript:;" class="operate_menu__link js_addto_playlist" style="display:' + (null == (i = 0 == e.player ? "" : "none") ? "" : i) + ';">播放队列</a>\r\n            <ul role="menu" class="operate_menu__list ' + (null == (i = 0 == e.player ? "operate_menu__top_line" : "") ? "" : i) + ' operate_menu__bottom_line">\r\n	    ';
                            for (var t = 0, s = e.list.length; s > t; t++) {
                                var o = e.list[t];
                                n += '\r\n                <li class="operate_menu__item">\r\n                    <a href="javascript:;" class="operate_menu__link js_addto_taogelist" data-dirid="' + (null == (i = o.dirid) ? "" : i) + '" title="' + (null == (i = o.dirname) ? "" : _.escape(i)) + '">', 201 == o.dirid && (n += '<i class="operate_menu__icon_like"></i>'), n += "" + (null == (i = o.dirname) ? "" : _.escape(i)) + "</a>\r\n                </li>\r\n            "
                            }
                            n += '\r\n	    </ul>\r\n            <a href="javascript:;" class="operate_menu__link js_addto_new" style="display:' + (null == (i = 0 == e.player ? "" : "none") ? "" : i) + ';"><i class="operate_menu__icon_add"></i>添加到新歌单</a>\r\n        </div>\r\n    </div> \r\n'
                        } else n += '\r\n    <div class="mod_operate_menu" style="position:absolute;" id="fav_pop">\r\n        <div class="operate_menu__cont">\r\n            <a href="javascript:;" class="operate_menu__link js_addto_playlist" style="display:' + (null == (i = 0 == e.player ? "" : "none") ? "" : i) + ';">播放队列</a>\r\n            <ul role="menu" class="operate_menu__list ' + (null == (i = 0 == e.player ? "operate_menu__top_line" : "") ? "" : i) + ' operate_menu__bottom_line">\r\n                <li class="operate_menu__item">\r\n                    <a href="javascript:;" class="operate_menu__link js_login" title="登录后添加到歌单">登录后添加到歌单</a>\r\n                </li>\r\n	    </ul>\r\n        </div>\r\n    </div> \r\n';
                        return n += ""
                    }(e)), f ? s('.js_addto_taogelist[data-dirid="201"]').addClass("operate_menu__link--disabled ") : s('.js_addto_taogelist[data-dirid="201"]').removeClass("operate_menu__link--disabled "), r(), T = !0
                }), g(a)
        }

        function y() {
            s(".songlist__item--current").removeClass("songlist__item--current"), s(".playlist__item--current").removeClass("playlist__item--current"), s("#fav_pop").hide()
        }

        function w(e, i) {
            f(e, 201, i, "")
        }

        function k(e, i) {
            function n() {
                a.show("取消喜欢失败！当前网络繁忙，请您稍后重试。", 3e3, 1)
            }

            var c = [], l = [];
            s.each(e, function (e, i) {
                111 == i.songtype || 112 == i.songtype || 113 == i.songtype ? (c.push(i.songid), l.push(i.songtype)) : i.songmid ? (c.push(i.songid), l.push(3)) : (c.push(i.songid), l.push(11))
            });
            var d = o.getUin(), u = i, p = "//c.y.qq.com/qzone/fcg-bin/fcg_music_delbatchsong.fcg", f = {
                uin: d,
                dirid: 201,
                ids: c.join(","),
                source: 103,
                types: l.join(","),
                formsender: 1,
                flag: 2,
                from: 3,
                utf8: 1
            };
            if (r.chrome) f.formsender = 4, t.jQueryAjax.post({
                url: p,
                charset: "utf-8",
                data: f,
                success: function (i) {
                    switch (i.code) {
                        case 0:
                            u(), s(document).trigger("like", {data: e, flag: 0});
                            break;
                        case 1:
                            n();
                            break;
                        default:
                            n()
                    }
                },
                error: n
            }); else {
                var m = new t.FormSender(p, "post", f, "utf-8");
                m.onSuccess = function (i) {
                    switch (i.code) {
                        case 0:
                            u(), s(document).trigger("like", {data: e, flag: 0});
                            break;
                        case 1:
                            n();
                            break;
                        default:
                            n()
                    }
                }, m.onError = n, m.send()
            }
        }

        function b(e, i) {
            function n() {
                a.show("操作失败！当前网络繁忙，请您稍后重试。", 3e3, 1)
            }

            e.formsender = 1, e.source = 103, e.moddirnames && (e.moddirnames = e.moddirnames.replace(/,/g, "，"));
            var s = "//c.y.qq.com/splcloud/fcgi-bin/fcg_fav_modsongdir.fcg", o = new t.FormSender(s, "post", e, "gb2312");
            o.onSuccess = function (t) {
                switch (t.code) {
                    case 0:
                        !e.checkIsOrdered && e.delnum > 0 && a.show("删除歌单成功！", 1e3), e.modnum > 0 && a.show("修改歌单成功！", 1e3), i(t);
                        break;
                    case 1:
                    case 2:
                        g_user.openLogin();
                        break;
                    case 4:
                        a.show("歌单标题为空！请填写歌单标题。", 3e3, 1);
                        break;
                    case 6:
                        a.show("歌单标题过长！请重新填写歌单标题。", 3e3, 1);
                        break;
                    case 13:
                        a.show("歌单标题存在非法字符！请重新填写歌单标题。", 3e3, 1);
                        break;
                    default:
                        n()
                }
            }, o.onError = n, o.send()
        }

        function j(e, i) {
            b({uin: o.getUin(), delnum: 1, deldirids: e, forcedel: 1}, function () {
                i && i()
            })
        }

        function q(e, i) {
            o.getUin() < 1e4 ? i && i(e) : t.jQueryAjax.jsonp({
                    url: "//c.y.qq.com/splcloud/fcgi-bin/fcg_musiclist_getmyfav.fcg?dirid=201&dirinfo=1",
                    charset: "utf-8",
                    jsonpCallback: "getFav",
                    success: function (n) {
                        if (0 == n.code)for (var t = 0, s = e.length; s > t; t++)111 == e[t].songtype || 112 == e[t].songtype || 113 == e[t].songtype ? e[t].mid in n["map_" + e[t].songtype] && (e[t].fav = "love") : e[t].songtype > 0 ? e[t].mid in n.map_daolian && (e[t].fav = "love") : e[t].mid in n.map && (e[t].fav = "love");
                        i && i(e)
                    },
                    error: function () {
                        i && i(e)
                    }
                })
        }

        function x(e, i, n, a, c, r, d, u, p) {
            function f() {
                u && s.isFunction(u) ? u() : t.popup.show("获取用户歌单详情失败！当前网络繁忙，请您稍后重试。", 3e3, 1)
            }

            if (a = a || 0, r = r || 0, d = d || 0, p = p || 0, i in I && !c)return n(I[i]), void 0;
            var m = l;
            if (205 == i)return m.getBgmusic(e, function (e) {
                I[e.DirID] = e, n(e)
            }), void 0;
            if (206 == i)return m.getLocalMusic(e, function (e) {
                I[e.DirID] = e, n(e)
            }), void 0;
            var g = "//c.y.qq.com/splcloud/fcgi-bin/fcg_musiclist_getinfo_cp.fcg?uin=" + e + "&dirid=" + i + "&new=" + a + "&dirinfo=1&user=qqmusic&miniportal=1&fromDir2Diss=1&comPic=" + p;
            d > r && (g += "&from=" + r + "&to=" + d), t.jQueryAjax.jsonp({
                url: g,
                charset: "utf-8",
                jsonpCallback: "jsonCallback",
                success: function (e) {
                    if (0 != e.code)return f(), void 0;
                    if ("-1000" == e.code || "1000" == e.code || 1e3 == e.code)return o.openLogin(), void 0;
                    var a = {};
                    a.uin = e.uin, a.NickName = e.NickName, a.show = e.show, a.tagList = e.tagList, a.tags = e.tags, a.createTime = e.CreateTime, a.PicUrl = e.PicUrl, a.Desc = e.Desc, a.Title = e.Title, 201 == i && (a.Title = "我喜欢"), a.DirID = e.DirID, a.dissID = e.dissID, a.list = [], s.each(e.SongList, function (i, n) {
                        n.type % 10 == 1 && (n.data = n), n.data.song_type = n.type, n.data.dissID = e.dissID, a.list.push(t.player.formatMusic(n.data))
                    }), 201 == a.DirID ? a.Title = "我喜欢" : I[i] = a, n(a)
                },
                error: f
            })
        }

        function D(e, n) {
            function o() {
                t.popup.show("获取用户背景音乐失败！当前网络繁忙，请您稍后重试。", 3e3, 1)
            }

            var a = "//c.y.qq.com/qzone/fcg-bin/cgi_playlist_xml_cp.fcg?utf8=1&json=1&uin=" + e;
            t.jQueryAjax.jsonp({
                url: a, charset: "utf-8", jsonpCallback: "jsonCallback", success: function (a) {
                    if (!a.qqmusic)return o(), void 0;
                    var c = {};
                    c.uin = e, c.NickName = "", c.show = 1, c.tagList = "", c.PicUrl = location.protocol + "//y.gtimg.cn/mediastyle/y/img/cover_qzone.jpg", c.Desc = "空间背景音乐同步列表", c.Title = "Qzone背景音乐", c.DirID = 205, c.list = [], s.each(a.qqmusic.playlist.song, function (e, n) {
                        var s = {};
                        n && (s = t.player.formatMusic(n), s.songtype = "qqmusic" == s.mtype ? 13 : s.songtype || 11, 35 == s.songtype && (s.action.fav = !1, s.action.share = !1, s.singer[0].name = i(s.singer[0].name)), c.list.push(s))
                    }), n(c)
                }, error: o
            })
        }

        function C(e, i) {
            function n() {
                t.popup.show("获取本地音乐失败！当前网络繁忙，请您稍后重试。", 3e3, 1)
            }

            var o = "//c.y.qq.com/qzone/fcg-bin/fcg_usermusic_info_cp.fcg?uin=" + e + "&utf8=1&json=1&p=" + Math.random();
            t.jQueryAjax.jsonp({
                url: o, charset: "utf-8", jsonpCallback: "jsonCallback", success: function (o) {
                    if (!o)return n(), void 0;
                    var a = {};
                    a.uin = e, a.NickName = "", a.show = 1, a.tagList = "", a.PicUrl = location.protocal + "//y.gtimg.cn/mediastyle/y/img/vip_upload.jpg", a.Desc = "绿钻贵族本地上传的音乐歌单", a.Title = "本地上传", a.DirID = 206, a.list = [], s.each(o.songlist, function (e, i) {
                        i && a.list.push(t.player.formatMusic(i))
                    }), i(a)
                }, error: n
            })
        }

        var L = {}, T = !1, I = {};
        return {
            favToTaoge: f,
            favToNew: n,
            like: w,
            unlike: k,
            show: v,
            hide: y,
            combineData: q,
            del: j,
            getBgmusic: D,
            getDetail: x,
            getLocalMusic: C
        }
    }();
    return l
});
;define("js/common/menu.js", function (t) {
    var e = t("js/common/music.js"), a = e.$, i = t("js/common/music/lib/base.js"), n = e.statistics, a = e.$, s = i.extend({
        attrs: {
            $container: null,
            item_map: {
                fav: ['<li class="operate_menu__item">', '<a href="javascript:;" class="operate_menu__link js_menu_fav" data-target="menu_sub_add"><i class="operate_menu__icon_add sprite"></i>添加到<i class="operate_menu__icon_arrow sprite"></i></a>', "</li>"].join(""),
                share: ['<li class="operate_menu__item">', '<a href="javascript:;" class="operate_menu__link js_menu_share" data-target="menu_sub_share"><i class="operate_menu__icon_share sprite"></i>分享<i class="operate_menu__icon_arrow sprite"></i></a>', "</li>"].join(""),
                down: [' <li class="operate_menu__item">', '<a href="javascript:;" class="operate_menu__link js_menu_down"><i class="operate_menu__icon_down sprite"></i>下载</a>', "</li>"].join(""),
                del: ['<li class="operate_menu__item">', '<a href="javascript:;" class="operate_menu__link js_menu_del"><i class="operate_menu__icon_delete sprite"></i>删除</a>', "</li>"].join(""),
                batch: ['<li class="operate_menu__item">', '<a href="javascript:;" class="operate_menu__link js_menu_batch"><i class="operate_menu__icon_batch sprite"></i>批量操作</a>', "</li>"].join(""),
                edit: ['<li class="operate_menu__item">', '<a href="javascript:;" class="operate_menu__link js_menu_edit"><i class="operate_menu__icon_edit sprite"></i>编辑歌单</a>', "</li>"].join("")
            },
            first_template: function (t) {
                {
                    var e, a = "";
                    Array.prototype.join
                }
                return a += '<div class="mod_operate_menu js_menu_box" id="' + (null == (e = t.id) ? "" : e) + '" data-aria="popup" style="display:none;" data-stat="' + (null == (e = t.stat) ? "" : e) + '">\r\n	<div class="operate_menu__cont">\r\n		<ul role="menu" class="operate_menu__list">\r\n			' + (null == (e = t.list) ? "" : e) + "\r\n		</ul>\r\n	</div>\r\n</div>"
            }
        }, showFirstMenu: function (t, e) {
            t.preventDefault(), t.stopPropagation(), a("#share_pop").hide(), a("#fav_pop").hide();
            var i = this, n = i.get("item_map"), s = i.get("first_template"), o = i.get("$container"), _ = i.get("content"), r = (i.get("type"), []);
            for (var c in _)r.push(n[_[c]]);
            if (a("#first_menu_" + (o.attr("data-type") || "1")).length > 0) a("#first_menu_" + (o.attr("data-type") || "1") + " ul.operate_menu__list").html(r.join("")); else {
                var l = {list: r.join(""), id: "first_menu_" + (o.attr("data-type") || "1")};
                e && (l.stat = e), a("body").append(s(l))
            }
            a(".js_menu_box").hide(), a("#first_menu_" + (o.attr("data-type") || "1")).css({
                left: t.pageX + "px",
                top: t.pageY + "px"
            }).show().attr("id", "first_menu_" + (o.attr("data-type") || "1"))
        }, getSongs: function (e, a, i, n, s) {
            function o(t, e) {
                var a = "//c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=" + t + "&tpl=yqq_song_detail&format=jsonp&callback=getOneSongInfoCallback_menu_share";
                MUSIC.jQueryAjax.jsonp({
                    url: a,
                    charset: "utf-8",
                    jsonpCallback: "getOneSongInfoCallback_menu_share",
                    success: function (t) {
                        0 == t.code && t.data.length ? (t.data[0] = MUSIC.player.formatMusic(t.data[0]), e(t.data)) : e([])
                    },
                    error: function () {
                        e([])
                    }
                })
            }

            switch (e) {
                case 1:
                    var _ = a;
                    o(_, function (t) {
                        i && i(t)
                    });
                    break;
                case 2:
                    var r = a;
                    t.async("js/common/html/albumdata.js", function (t) {
                        t.init({mid: r, reportID: MUSIC.reportMap.menu, play: 0}, function (t) {
                            i && i(t)
                        })
                    });
                    break;
                case 3:
                    var c = a;
                    t.async("js/common/html/playlistdata.js", function (t) {
                        t.init(c, function (t) {
                            0 != t.length ? i && i(t) : MUSIC.popup.show("无可操作单曲！")
                        }, s)
                    });
                    break;
                case 4:
                    var l = a;
                    t.async("js/common/fav.js", function (t) {
                        t.getDetail(n, l, function (t) {
                            0 != t.list.length ? i && i(t.list) : MUSIC.popup.show("无可操作单曲！")
                        })
                    })
            }
        }, bindEvents: function () {
            var i = this, s = i.get("$container"), o = i.get("type"), _ = null, r = i.get("content"), c = i.get("hostFlag"), l = MUSIC.widget.user.getUin();
            s.on("click", "", function (t) {
                var e = a(this).parents(".playlist__item"), s = a(this).data("stat") || "";
                4 == o && (l = a(this).data("uin") || MUSIC.widget.user.getUin()), s && n.pgvClickStat(s), e.length > 0 && (a(".playlist__item").removeClass("playlist__item--current"), e.addClass("playlist__item--current")), _ = a(this).data("mid") || a(this).data("id");
                for (var c in r)"edit" == r[c] && delete r[c];
                a(this).data("dirid") && (parseInt(a(this).data("dirid")) < 201 || parseInt(a(this).data("dirid")) > 206) ? (i.set("dirid", parseInt(a(this).data("dirid"))), r.push("edit"), i.set("content", r)) : i.set("content", r);
                var d = a(this).data("delete") || 0, u = {delcreate_gedan: 1, delfav_gedan: 1, delfav_album: 1};
                if (d in u) {
                    var m = !1;
                    for (var c in r)if ("del" == r[c]) {
                        m = !0;
                        break
                    }
                    if (!m)switch (r.push("del"), i.set("content", r), i.set("delete_type", d), d) {
                        case"delcreate_gedan":
                            i.set("delete_data", {dirid: a(this).data("dirid")});
                            break;
                        case"delfav_gedan":
                            i.set("delete_data", {id: a(this).data("id")});
                            break;
                        case"delfav_album":
                            i.set("delete_data", {id: a(this).data("id"), mid: a(this).data("mid")})
                    }
                } else {
                    for (var c in r)"del" == r[c] && delete r[c];
                    i.set("content", r)
                }
                i.showFirstMenu(t, s)
            });
            var d = "first_menu_" + (s.attr("data-type") || "1");
            a(document).off("click", "#" + d + " .js_menu_fav").on("click", "#" + d + " .js_menu_fav", function (s) {
                var r = a(this).parents(".js_menu_box").data("stat") || "";
                r && n.pgvClickStat(r + ".add"), i.getSongs(o, _, function (i) {
                    return i.length <= 0 ? (MUSIC.popup.show("没有选择单曲！", 3e3, 1), void 0) : (i[0].action.fav ? t.async("js/common/fav.js", function (t) {
                                t.show({sharetype: 0, songs: i}, s, a("#" + d), r)
                            }) : e.popup.show("暂不提供此歌曲服务", 3e3, 1), void 0)
                }, l, c)
            }).off("click", "#" + d + " .js_menu_share").on("click", "#" + d + " .js_menu_share", function (s) {
                var r = a(this).parents(".js_menu_box").data("stat") || "";
                r && n.pgvClickStat(r + ".share"), i.getSongs(o, _, function (i) {
                    return i.length <= 0 ? (MUSIC.popup.show("没有选择单曲！", 3e3, 1), void 0) : (i[0].action.share ? t.async("js/common/share.js", function (t) {
                                var e = {};
                                switch (o) {
                                    case 1:
                                        e.sharetype = 0, e.mid = _;
                                        break;
                                    case 2:
                                        e.sharetype = 1, e.albummid = _;
                                        break;
                                    case 3:
                                        e.sharetype = 2, e.dirid = _
                                }
                                t.show(e, s, a("#" + d), r)
                            }) : e.popup.show("暂不提供此歌曲服务", 3e3, 1), void 0)
                }, l, c)
            }).off("click", "#" + d + " .js_menu_down").on("click", "#" + d + " .js_menu_down", function () {
                var e = a(this).parents(".js_menu_box").data("stat") || "";
                e && n.pgvClickStat(e + ".download"), i.getSongs(o, _, function (e) {
                    return e.length <= 0 ? (MUSIC.popup.show("没有需要下载的单曲！", 3e3, 1), void 0) : (t.async("js/common/download.js", function (t) {
                            t.show(e), a(".js_menu_box").hide()
                        }), void 0)
                }, l, c)
            }).off("click", "#" + d + " .js_menu_del").on("click", "#" + d + " .js_menu_del", function () {
                var t = a(this).parents(".js_menu_box").data("stat") || "";
                t && n.pgvClickStat(t + ".delete"), a("body").trigger(i.get("delete_type"), i.get("delete_data")), a(".js_menu_box").hide()
            }).off("click", "#" + d + " .js_menu_batch").on("click", "#" + d + " .js_menu_batch", function () {
                var t = a(this).parents(".js_menu_box").data("stat") || "";
                t && n.pgvClickStat(t + ".batch");
                var e = a(".mod_songlist");
                return e.length <= 0 ? !1 : (e.toggleClass("mod_songlist--edit"), e.hasClass("mod_songlist--edit") ? (a(".songlist__edit").show(), a(".js_foot_batch").show(), a('.js_batch:contains("批量操作")').html('<i class="mod_btn__icon_batch"></i>取消批量操作')) : (a(".songlist__edit").hide(), a(".js_foot_batch").hide(), a('.js_batch:contains("取消批量操作")').html('<i class="mod_btn__icon_batch"></i>批量操作'), a("div.songlist__edit").addClass("songlist__edit--check"), a("li.js_songlist__child ul.songlist__list div.songlist__edit", ".mod_songlist").removeClass("songlist__edit--check")), a(".js_menu_box").hide(), void 0)
            }).off("click", "#" + d + " .js_menu_edit").on("click", "#" + d + " .js_menu_edit", function () {
                var t = i.get("dirid"), e = a(this).parents(".js_menu_box").data("stat") || "";
                window.location.href = e ? "//y.qq.com/portal/mymusic_edit.html?dirid=" + t + "&stat=" + e + ".edit" : "//y.qq.com/portal/mymusic_edit.html?dirid=" + t
            })
        }, initialize: function (t) {
            var e = this, i = {}, n = t.$container;
            a.extend(i, t, {
                $container: t.$container,
                content: t.content,
                hostFlag: t.hostFlag,
                type: t.type
            }), n.data("menu", e), s.superclass.initialize.call(e, i), e.bindEvents()
        }, Statics: {
            init: function (t) {
                try {
                    var e = a(t.container).data("menu");
                    e && e.remove && e.remove(), e = null
                } catch (i) {
                }
                return new s(t)
            }
        }
    });
    return a.fn.menu = function (t) {
        if ("object" === a.type(t)) t.$container = a(this), s.init(t); else {
            var e = a(this).data("content").split("_"), i = a(this).data("type");
            s.init({content: e, type: i, $container: a(this)})
        }
    }, s
});
;define("js/common/smartbox.js", function (a) {
    var t = a("js/common/music.js"), s = t.$, r = a("js/common/music/lib/base.js"), s = t.$, e = t, n = a("js/common/music/storage.js"), i = r.extend({
        attrs: {
            $container: null,
            $smartbox: null,
            ns: null,
            num: 5,
            sbindex: -1,
            lrindex: 0,
            callback: function () {
            }
        }, initialize: function (a) {
            var t = this, r = {}, e = s(a.container), n = s(a.page);
            0 == n.length && (e.append('<div class="js_smartbox"></div>'), n = s(".js_smartbox", e)), s.extend(r, a, {
                $container: e,
                $smartbox: n
            }), e.data("smartbox", t), i.superclass.initialize.call(t, r), t.bindPagerEvents(), t.showRecom(!1)
        }, showSmartBox: function (a) {
            s(".search_result__item--current").removeClass("search_result__item--current");
            var t = this, r = t.get("$container"), n = s(".js_smartbox>.mod_search_other", r), l = s(".js_smartbox .mod_search_result", r);
            0 == l.length && (s(".js_smartbox", r).append('<div class="mod_search_result" style=""></div>'), l = s(".js_smartbox>.mod_search_result", r)), e.jQueryAjax.jsonp({
                url: "//c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=jsonp&key=" + a,
                charset: "utf-8",
                jsonpCallback: "SmartboxKeysCallback" + t.get("ns") + parseInt(1e4 * Math.random()),
                success: function (s) {
                    0 == s.code && s.data && (s.data.song && s.data.song.count > 0 || s.data.album && s.data.album.count > 0 || s.data.mv && s.data.mv.count > 0 || s.data.singer && s.data.singer.count > 0) ? (l.html(i.smartbox_tpl({
                            list: s.data,
                            keyword: a,
                            num: t.get("num")
                        })), l.addClass("drop")) : l.removeClass("drop")
                },
                error: function () {
                }
            }), n.removeClass("drop")
        }, hotkey: [], showRecom: function (a) {
            s(".search_result__item--current").removeClass("search_result__item--current");
            var t = this, r = t.get("$container"), l = s(".js_smartbox>.mod_search_other", r), o = s(".js_smartbox .mod_search_result", r);
            0 == l.length ? (s(".js_smartbox", r).append('<div class="mod_search_other" style=""></div>'), l = s(".js_smartbox>.mod_search_other", r), e.jQueryAjax.jsonp({
                    url: "//c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg",
                    charset: "utf-8",
                    jsonpCallback: "hotSearchKeys" + t.get("ns"),
                    success: function (c) {
                        0 == c.code ? (r.data("special_key", c.data.special_key), e.util.getUrlParams().w ? s("input", r).val(decodeURIComponent(e.util.getUrlParams().w)) : c.data.special_key ? document.addEventListener ? s("input", r).attr("placeholder", c.data.special_key) : s("input", r).val(c.data.special_key) : s("input", r).attr("placeholder", "搜索关键字"), n.get("portal_keyword", function (a) {
                                var e = [];
                                if (a && (e = a.split("||").reverse()), t.hotkey = c.data.hotkey, r.hasClass("mod_search")) {
                                    if (c.data.hotkey.length > 0) {
                                        for (var n = [], o = 0, _ = c.data.hotkey.length; _ > o && 5 > o; o++) {
                                            var u = c.data.hotkey[o];
                                            n.push('<a href="javascript:;" href="javascript:;" class="search_tips__item js_smartbox_search" data-name="' + s.trim(u.k) + '">' + s.trim(u.k).HtmlEncode() + "</a>")
                                        }
                                        s(".mod_search_input", r).after('<div class="mod_search_tips">热门搜索：' + n.join("") + "</div>")
                                    }
                                    l.html(i.recom_tpl({historySearch: e, hotkey: [], num: t.get("num")}))
                                } else l.html(i.recom_tpl({historySearch: e, hotkey: c.data.hotkey, num: t.get("num")}))
                            })) : s("input", r).attr("placeholder", "搜索关键字"), a && (o.removeClass("drop"), l.addClass("drop"))
                    },
                    error: function () {
                    }
                })) : a && (n.get("portal_keyword", function (a) {
                    var s = [];
                    a && (s = a.split("||").reverse()), r.hasClass("mod_search") ? l.html(i.recom_tpl({
                            historySearch: s,
                            hotkey: [],
                            num: t.get("num")
                        })) : l.html(i.recom_tpl({historySearch: s, hotkey: t.hotkey, num: t.get("num")}))
                }), o.removeClass("drop"), l.addClass("drop"))
        }, closeSmartbox: function () {
            var a = this, t = a.get("$container"), r = s(".js_smartbox>.mod_search_other", t), e = s(".js_smartbox .mod_search_result", t);
            e.removeClass("drop"), r.removeClass("drop"), a.set("sbindex", -1), a.set("lrindex", 0)
        }, doCallback: function (a) {
            var t = this, r = t.get("$container");
            if ("" == s.trim(a) && (a = r.data("special_key")), "" != s.trim(a)) {
                var e = t.get("callback");
                e && e(a), s("input.search_input__input").val(a), s("input.search_input__input", r).blur()
            }
        }, hotOrSmart: function () {
            var a = this, t = a.get("$container"), r = s(".mod_search_other", t);
            return r.hasClass("drop") ? 0 : 1
        }, bindPagerEvents: function () {
            function a(a) {
                var e = 0 == t.hotOrSmart(), n = 0, c = null;
                0 > l && (l = 1), l > 1 && (l = 0), e ? (n = s(".mod_search_other ." + o[l], r).length, c = s(".mod_search_other ." + o[l], r)) : (n = s(".mod_search_result a", r).length, c = s(".mod_search_result a", r)), -1 > i && (i = n - 1), i > n && (i = 0), s("a", r).removeClass("search_result__item--current"), -1 == i ? s("input", r).val(a) : (s(c[i]).addClass("search_result__item--current"), s("input", r).val(s(c[i]).attr("data-name"))), t.set("lrindex", l), t.set("sbindex", i)
            }

            var t = this, r = t.get("$container"), i = t.get("sbindex"), l = t.get("lrindex"), o = ["js_left", "js_right"];
            r.off("focus keyup propertychange", "input.search_input__input").on("focus keyup propertychange", "input.search_input__input", function (e) {
                var n = s(this).val(), c = null;
                switch (c = 0 != t.hotOrSmart() ? s(".mod_search_result a", r) : s(".mod_search_other ." + o[l], r), i = t.get("sbindex"), l = t.get("lrindex"), n = s(this).val(), e.keyCode) {
                    case 13:
                        i > -1 ? s(c[i]).click() : t.doCallback(n);
                        break;
                    case 38:
                        t.set("sbindex", i--), a(n);
                        break;
                    case 40:
                        t.set("sbindex", i++), a(n);
                        break;
                    default:
                        if (0 == s(this).parents(".mod_search--top").length) {
                            "" != s.trim(n) ? t.showSmartBox(n) : t.showRecom(!0);
                            break
                        }
                }
            }).off("click", "a.js_smartbox_song").on("click", "a.js_smartbox_song", function () {
                var a = s(this).attr("data-mid"), t = {mid: a};
                e.util.gotoSongdetail(t)
            }).off("click", "a.js_smartbox_singer").on("click", "a.js_smartbox_singer", function () {
                var a = s(this).attr("data-mid");
                e.util.gotoSinger({singermid: a})
            }).off("click", "a.js_smartbox_album").on("click", "a.js_smartbox_album", function () {
                var a = s(this).attr("data-mid");
                e.util.gotoAlbum({albummid: a})
            }).off("click", "a.js_smartbox_mv").on("click", "a.js_smartbox_mv", function () {
                var a = s(this).attr("data-vid");
                e.util.gotoMvdetail({vid: a})
            }).off("click", "a.js_smartbox_search").on("click", "a.js_smartbox_search", function () {
                var a = s(this).attr("data-name");
                t.doCallback(a)
            }).off("click", "button.search_input__btn").on("click", "button.search_input__btn", function () {
                var a = s("input", r).val();
                t.doCallback(a)
            }).off("click", ".js_smartbox_delete").on("click", ".js_smartbox_delete", function () {
                var a = s(this).data("name");
                n.get("portal_keyword", function (t) {
                    var r = [], e = [];
                    t && (r = t.split("||")), s.each(r, function (t, s) {
                        "" != s && s != a && e.push(s)
                    }), n.set("portal_keyword", e.join("||"))
                }), t.showRecom(!0), setTimeout(function () {
                    s("input.search_input__input", r).focus()
                }, 300)
            }).off("click", ".js_smartbox_delete_all").on("click", ".js_smartbox_delete_all", function () {
                n.set("portal_keyword", ""), t.showRecom(!0), setTimeout(function () {
                    s("input.search_input__input", r).focus()
                }, 300)
            }).off("blur", "input.search_input__input").on("blur", "input.search_input__input", function () {
                var a = s(this).val();
                "" == s.trim(a) && "" != r.data("special_key") ? document.addEventListener ? s(this).attr("placeholder", r.data("special_key")) : s(this).val(r.data("special_key")) : s("input", r).attr("placeholder", "搜索关键字"), setTimeout(function () {
                    t.closeSmartbox()
                }, 200)
            })
        }, remove: function () {
            var a = this, t = a.get("$container"), s = a.get("$smartbox");
            try {
                t.data("smartbox", null), t.off("click", ".js_pageindex"), s.remove(), a.destroy()
            } catch (r) {
            }
        }, Statics: {
            init: function (a) {
                try {
                    s(window).trigger("removeSmartbox");
                    var t = s(a.container).data("smartbox");
                    t && t.remove && t.remove(), t = null
                } catch (r) {
                }
                return new i(a)
            }, sessionIdGenerator: {
                bigMul: function (a, t) {
                    for (var s = ("" + a).split("").reverse(), r = ("" + t).split("").reverse(), e = [], n = s.length, i = r.length, l = 0, o = n + i - 1; o >= l; l++)e[l] = 0;
                    for (l = 0; i > l; l++)for (var c = 0; n > c; c++)e[c + l] += s[c] * r[l], e[c + 1 + l] += Math.floor(e[c + l] / 10), e[c + l] = e[c + l] % 10;
                    return e.reverse(), 0 == e[0] && e.shift(), e.join("")
                }, bigAdd: function (a, t) {
                    for (var s = ("" + a).split("").reverse(), r = ("" + t).split("").reverse(), e = s.length, n = r.length, i = 0, l = 0, o = 0, c = 0, _ = 0, u = Math.max(e, n); u > _; _++)l = e > _ ? s[_] : 0, o = n > _ ? r[_] : 0, c = Math.round(l) + Math.round(o) + i, s[_] = "" + c % 10, i = c >= 10 ? 1 : 0;
                    return 1 == i && s.push(1), s.reverse().join("")
                }, get: function (a) {
                    var t, s = "4194304", r = "4294967296", e = "18014398509481984", n = "";
                    return a = this.bigMul(a, e), randNum = this.bigMul(Math.round(Math.random() * s), r), t = new Date, timeStamp = 1e3 * (3600 * t.getHours() + 60 * t.getMinutes() + t.getSeconds()) + t.getMilliseconds(), n = this.bigAdd(this.bigAdd(a, randNum), timeStamp)
                }
            }, recom_tpl: function (a) {
                {
                    var t, r = "";
                    Array.prototype.join
                }
                r += '\r\n            <div class="search_hot">\r\n                <dl class="search_hot__list" aria-labelledy="search_hot__tit">\r\n                    <dt class="search_hot__tit">热门搜索</dt>\r\n                    <dd>\r\n						';
                for (var e = a.hotkey, n = 0, i = e.length; 5 > n && i > n; n++) {
                    var l = e[n];
                    r += '\r\n                        <a href="javascript:;" class="search_hot__link js_smartbox_search js_left" data-name="' + (null == (t = s.trim(l.k)) ? "" : t) + '">\r\n                            <span class="search_hot__number">' + (null == (t = n + 1) ? "" : t) + '</span>\r\n                            <span class="search_hot__name">' + (null == (t = s.trim(l.k)) ? "" : t) + '</span>\r\n                            <span class="search_hot__listen">' + (null == (t = parseInt(l.n, 10) >= 1e4 ? ((l.n / 1e4).toFixed(1) + "万").replace(".0万", "万") : l.n) ? "" : t) + "</span>\r\n                        </a>\r\n						"
                }
                r += '\r\n                    </dd>\r\n                </ul>\r\n            </div>\r\n\r\n            <div class="search_history">\r\n                <dl class="search_history__list">\r\n                    <dt class="search_history__tit">搜索历史<a href="javascript:;" class="search_history__clear js_smartbox_delete_all"><i class="icon_history_clear"></i><span class="icon_txt">清空</span></a></dt>\r\n		';
                for (var o = a.historySearch, n = 0, i = o.length; 5 > n && i > n; n++) {
                    var l = o[n];
                    r += '\r\n                    <dd class="search_history__item">\r\n                        <a href="javascript:;" class="search_history__link js_smartbox_search js_left" data-name="' + (null == (t = l) ? "" : _.escape(t)) + '">' + (null == (t = l) ? "" : _.escape(t)) + '</a>\r\n                        <a href="javascript:;" class="search_history__delete js_smartbox_delete" data-name="' + (null == (t = l) ? "" : _.escape(t)) + '" title="删除"><i class="search_history__icon_delete"></i><span class="icon_txt">删除</span></a>\r\n                    </dd>\r\n	        '
                }
                return r += "\r\n                </dl>\r\n            </div>"
            }, smartbox_tpl: function (a) {
                function t(a) {
                    a = a.unescapeHTML();
                    var t = e, s = a.toLowerCase(), r = t.toLowerCase(), n = s.indexOf(r);
                    if (-1 != n) {
                        var i = [];
                        return i.push(a.substring(0, n)), i.push('<span class="search_result__keyword">'), i.push(a.substring(n, n + t.length)), i.push("</span>"), i.push(a.substring(n + t.length, a.length)), i.join("")
                    }
                    return a
                }

                {
                    var s, r = "";
                    Array.prototype.join
                }
                r += "";
                var e = a.keyword, a = a.list;
                if (r += "\r\n	", a.song && a.song.count > 0) {
                    r += '\r\n            <!--单曲区域_S-->\r\n            <div class="search_result__sort">\r\n                <h4 class="search_result__tit"><i class="search_result__icon_song"></i>单曲</h4>\r\n                <ul class="search_result__list">\r\n		';
                    for (var n = 0; n < a.song.count; n++) {
                        var i = a.song.itemlist[n];
                        r += '\r\n                    <li>\r\n                        <a href="javascript:;" class="search_result__link js_smartbox_song" data-docid="' + (null == (s = i.docid) ? "" : s) + '" data-id="' + (null == (s = i.id) ? "" : s) + '" data-mid="' + (null == (s = i.mid) ? "" : s) + '" data-name="' + (null == (s = i.name) ? "" : _.escape(s)) + '">\r\n                            <span class="search_result__name">' + (null == (s = t(i.name)) ? "" : s) + '</span>-\r\n                            <span class="search_result__singer">' + (null == (s = t(i.singer)) ? "" : s) + "</span>\r\n                        </a>\r\n                    </li>\r\n		"
                    }
                    r += "\r\n                </ul>\r\n            </div>\r\n            <!--单曲区域_E-->\r\n	 "
                }
                if (r += "\r\n	", a.singer && a.singer.count > 0) {
                    r += '\r\n            <!--歌手区域_S-->\r\n            <div class="search_result__sort">\r\n                <h4 class="search_result__tit"><i class="search_result__icon_singer"></i>歌手</h4>\r\n                <ul class="search_result__list">\r\n		';
                    for (var l = 0; l < a.singer.count; l++) {
                        var o = a.singer.itemlist[l];
                        r += '\r\n                    <li>\r\n                        <a href="javascript:;" class="search_result__link js_smartbox_singer" data-docid="' + (null == (s = o.docid) ? "" : s) + '" data-id="' + (null == (s = o.id) ? "" : s) + '" data-mid="' + (null == (s = o.mid) ? "" : s) + '" data-name="' + (null == (s = o.name) ? "" : _.escape(s)) + '">\r\n                            <span class="search_result__name">' + (null == (s = t(o.name)) ? "" : s) + "</span>\r\n                        </a>\r\n                    </li>\r\n		"
                    }
                    r += "\r\n                </ul>\r\n            </div>\r\n            <!--歌手区域_E-->\r\n	 "
                }
                if (r += "\r\n	", a.album && a.album.count > 0) {
                    r += '\r\n            <!--专辑区域_S-->\r\n            <div class="search_result__sort">\r\n                <h4 class="search_result__tit"><i class="search_result__icon_album"></i>专辑</h4>\r\n                <ul class="search_result__list">\r\n		';
                    for (var c = 0; c < a.album.count; c++) {
                        var u = a.album.itemlist[c];
                        r += '\r\n                    <li>\r\n                        <a href="javascript:;" class="search_result__link js_smartbox_album" data-docid="' + (null == (s = u.docid) ? "" : s) + '" data-id="' + (null == (s = u.id) ? "" : s) + '" data-mid="' + (null == (s = u.mid) ? "" : s) + '" data-name="' + (null == (s = u.name) ? "" : _.escape(s)) + '">\r\n                            <span class="search_result__name">' + (null == (s = t(u.name)) ? "" : s) + '</span>\r\n                            <span class="search_result__singer">' + (null == (s = t(u.singer)) ? "" : s) + "</span>\r\n                        </a>\r\n                    </li>\r\n		"
                    }
                    r += "\r\n                </ul>\r\n            </div>\r\n            <!--专辑区域_E-->\r\n	 "
                }
                if (r += "\r\n	", a.mv && a.mv.count > 0) {
                    r += '\r\n            <!--MV区域_S-->\r\n            <div class="search_result__sort">\r\n                <h4 class="search_result__tit"><i class="search_result__icon_mv"></i>MV</h4>\r\n                <ul class="search_result__list">\r\n		';
                    for (var d = 0; d < a.mv.count; d++) {
                        var h = a.mv.itemlist[d];
                        r += '\r\n                    <li>\r\n                        <a href="javascript:;" class="search_result__link js_smartbox_mv" data-docid="' + (null == (s = h.docid) ? "" : s) + '" data-id="' + (null == (s = h.id) ? "" : s) + '" data-mid="' + (null == (s = h.mid) ? "" : s) + '" data-name="' + (null == (s = h.name) ? "" : _.escape(s)) + '" data-vid="' + (null == (s = h.vid) ? "" : s) + '">\r\n                            <span class="search_result__name">' + (null == (s = t(h.name)) ? "" : s) + '</span>-\r\n                            <span class="search_result__singer">' + (null == (s = t(h.singer)) ? "" : s) + "</span>\r\n                        </a>\r\n                    </li>\r\n		"
                    }
                    r += "\r\n                </ul>\r\n            </div>\r\n            <!--MV区域_E-->\r\n	 "
                }
                return r += ""
            }
        }
    });
    return s.fn.smartbox = function (a) {
        if ("string" === s.type(a)); else {
            if ("object" !== s.type(a))throw"Initialize smartbox Failed!";
            i.init(a)
        }
    }, i
});
;define("js/common/statastic.js", function (t) {
    var i = t("js/common/music.js"), c = t("js/common/music/ping.js"), r = i.$, a = {
        gLocation: location.href,
        useropt_stat_fcg_url: "//c.y.qq.com/portalcgi/fcgi-bin/statistic/cgi_useropt_stat.fcg",
        useropt_stat2_fcg_url: "//c.y.qq.com/portalcgi/fcgi-bin/statistic/cgi_useropt_stat2.fcg",
        musicportal_stat2_fcg_url: "//c.y.qq.com/portalcgi/fcgi-bin/statistic/cgi_musicportal_stat2.fcg",
        search_src_map: {"t=100": "zong", "t=0": "music", "t=7": "lyric", "t=8": "album", "t=12": "mv"},
        stat_src_map: [{k: /\/toplist\//, v: "TOPLIST"}, {k: /\/album\//, v: "ALBUM"}, {
            k: /\/singerlist\.html/,
            v: "SINGERLIST"
        }, {k: /\/mv\//, v: "MV"}, {k: /\/playlist\//, v: "PLAYLIST"}, {
            k: /\/profile\.html/,
            v: "PROFILE"
        }, {k: /\/search\.html/, v: "SEARCH"}, {k: /\/player\.html/, v: "PLAYER"}, {k: /\/singer\//, v: "SINGER"}],
        getVirtualUrl: function (t) {
            return "" != t ? t : window.location.href
        },
        doPvg: function (t) {
            var i = "y.qq.com";
            t = (t || "").toString(), t && (t = t.replace(/(http:|https:)\/\/y.qq.com/i, ""), /(http:|https:)\/\//i.test(t) && (t = t.replace(/http:\/\//i, ""), i = t.substring(0, t.indexOf("/")), t = t.substring(t.indexOf("/"), t.length)), t = t.replace(/(\?|#).+/g, ""), "/" == t && (t = "/portal/index.html"), setTimeout(function () {
                c.pgvMain("", {repeatApplay: "true", virtualURL: t, virtualDomain: i, reserved2: ""})
            }, 200))
        },
        getStatSource: function (t) {
            var i = a.stat_src_map;
            t = t || window.location.href.replace(/(\?|#).+/g, "").replace(/http:\/\//i, "").replace(/https:\/\//i, "");
            var c = "OTHER";
            return r.each(i, function (i, r) {
                return t.search(r.k) > 0 ? (c = r.v, !1) : void 0
            }), "y.qq.com/" == t && (c = "INDEX"), c
        },
        pgvClickStat: function (t, i, r) {
            if (t && "" != t) {
                i = i || "", r = r || "";
                try {
                    arguments.length >= 2 && (!i || "" == i) && (i = a.getStatSource());
                    var e = [t.toUpperCase()];
                    i && "" != i && e.push(i.toUpperCase()), r && "" != r && e.push(r.toUpperCase()), setTimeout(function () {
                        c.pgvSendClick({hottag: e.join("."), virtualDomain: "y.qq.com"})
                    }, 200)
                } catch (s) {
                }
            }
        }
    };
    return a
});
/*  |xGv00|8fb60abf83138143ffbc6bbd01aabaad */