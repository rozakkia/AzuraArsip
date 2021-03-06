/*!
 * Codebase - v3.4.0
 * @author pixelcave - https://pixelcave.com
 * Copyright (c) 2020
 */
! function(e) {
    var r = {};

    function n(t) {
        if (r[t]) return r[t].exports;
        var i = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = r, n.d = function(e, r, t) {
        n.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: t
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, r) {
        if (1 & r && (e = n(e)), 8 & r) return e;
        if (4 & r && "object" == typeof e && e && e.__esModule) return e;
        var t = Object.create(null);
        if (n.r(t), Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            }), 2 & r && "string" != typeof e)
            for (var i in e) n.d(t, i, function(r) {
                return e[r]
            }.bind(null, i));
        return t
    }, n.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(r, "a", r), r
    }, n.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }, n.p = "", n(n.s = 62)
}({
    62: function(e, r, n) {
        e.exports = n(63)
    },
    63: function(e, r) {
        function n(e, r) {
            for (var n = 0; n < r.length; n++) {
                var t = r[n];
                t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t)
            }
        }
        var t = function() {
            function e() {
                ! function(e, r) {
                    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            var r, t, i;
            return r = e, i = [{
                key: "initValidationSignUp",
                value: function() {
                    jQuery(".js-validation-signup").validate({
                        errorClass: "invalid-feedback animated fadeInDown",
                        errorElement: "div",
                        errorPlacement: function(e, r) {
                            jQuery(r).parents(".form-group > div").append(e)
                        },
                        highlight: function(e) {
                            jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
                        },
                        success: function(e) {
                            jQuery(e).closest(".form-group").removeClass("is-invalid"), jQuery(e).remove()
                        },
                        rules: {
                            "signup-username": {
                                required: !0,
                                minlength: 3
                            },
                            "signup-email": {
                                required: !0,
                                email: !0
                            },
                            "signup-password": {
                                required: !0,
                                minlength: 5
                            },
                            "signup-password-confirm": {
                                required: !0,
                                equalTo: "#signup-password"
                            },
                            "signup-terms": {
                                required: !0
                            }
                        },
                        messages: {
                            "signup-username": {
                                required: "Please enter a username",
                                minlength: "Your username must consist of at least 3 characters"
                            },
                            "signup-email": "Please enter a valid email address",
                            "signup-password": {
                                required: "Please provide a password",
                                minlength: "Your password must be at least 5 characters long"
                            },
                            "signup-password-confirm": {
                                required: "Please provide a password",
                                minlength: "Your password must be at least 5 characters long",
                                equalTo: "Please enter the same password as above"
                            },
                            "signup-terms": "You must agree to the service terms!"
                        }
                    })
                }
            }, {
                key: "init",
                value: function() {
                    this.initValidationSignUp()
                }
            }], (t = null) && n(r.prototype, t), i && n(r, i), e
        }();
        jQuery((function() {
            t.init()
        }))
    }
});