
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
                key: "initValidationForm",
                value: function() {
                    jQuery(".js-validation").validate({
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
                            "username": {
                                required: !0,
                                minlength: 5
                            },
                            "name": {
                                required: !0,
                                minlength: 3
                            },
                            "current-password": {
                                required: !0,
                                minlength: 5
                            },
                            "new-password": {
                                required: !0,
                                minlength: 5
                            },
                            "confirm-password": {
                                required: !0,
                                minlength: 5,
                                equalTo: "#new-password"
                            }
                        },
                        messages: {
                            "username": {
                                required: "Masukkan username kamu yuk",
                                minlength: "Username minimal 5 karakter ya"
                            },
                            "name": {
                                required: "Masukkan nama lengkap kamu yuk",
                                minlength: "Kayaknya nama lengkap kamu kurang deh"
                            },
                            "current-password": {
                                required: "Masukkan password lama yuk",
                                minlength: "Password minimal 5 karakter ya"
                            },
                            "new-password": {
                                required: "Masukkan password lama yuk",
                                minlength: "Password minimal 5 karakter ya"
                            },
                            "confirm-password": {
                                required: "Konfirmasi dulu password baru kamu",
                                minlength: "Password minimal 5 karakter ya",
                                equalTo: "Yah kayaknya ada yang salah deh, konfirmasi lagi yuk"
                            }
                        }
                    })
                }
            }, {
                key: "init",
                value: function() {
                    this.initValidationForm()
                }
            }], (t = null) && n(r.prototype, t), i && n(r, i), e
        }();
        jQuery((function() {
            t.init()
        }))
    }
});