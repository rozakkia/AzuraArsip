
! function(t) {
    var e = {};

    function o(r) {
        if (e[r]) return e[r].exports;
        var l = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(l.exports, l, l.exports, o), l.l = !0, l.exports
    }
    o.m = t, o.c = e, o.d = function(t, e, r) {
        o.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }, o.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, o.t = function(t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (o.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var l in t) o.d(r, l, function(e) {
                return t[e]
            }.bind(null, l));
        return r
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "", o(o.s = 2)
}([, , function(t, e, o) {
    t.exports = o(3)
}, function(t, e) {
    function o(t, e) {
        for (var o = 0; o < e.length; o++) {
            var r = e[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }
    var r = function() {
        function t() {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t)
        }
        var e, r, l;
        return e = t, l = [{
            key: "initChartsChartJS",
            value: function() {
                Chart.defaults.global.defaultFontColor = "#555555", Chart.defaults.scale.gridLines.color = "rgba(0,0,0,.04)", Chart.defaults.scale.gridLines.zeroLineColor = "rgba(0,0,0,.1)", Chart.defaults.scale.ticks.beginAtZero = !0, Chart.defaults.global.elements.line.borderWidth = 2, Chart.defaults.global.elements.point.radius = 5, Chart.defaults.global.elements.point.hoverRadius = 7, Chart.defaults.global.tooltips.cornerRadius = 3, Chart.defaults.global.legend.labels.boxWidth = 12;
                var t = jQuery(".js-chartjs-lines"),
                    e = jQuery(".js-chartjs-bars"),
                    o = jQuery(".js-chartjs-radar"),
                    r = jQuery(".js-chartjs-polar"),
                    l = jQuery(".js-chartjs-pie"),
                    a = jQuery(".js-chartjs-donut"),
                    i = {
                        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
                        datasets: [{
                            label: "This Month",
                            fill: !0,
                            backgroundColor: "rgba(66,165,245,.75)",
                            borderColor: "rgba(66,165,245,1)",
                            pointBackgroundColor: "rgba(66,165,245,1)",
                            pointBorderColor: "#fff",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(66,165,245,1)",
                            data: [25, 38, 62, 45, 90, 115, 130]
                        }, {
                            label: "Last Month",
                            fill: !0,
                            backgroundColor: "rgba(66,165,245,.25)",
                            borderColor: "rgba(66,165,245,1)",
                            pointBackgroundColor: "rgba(66,165,245,1)",
                            pointBorderColor: "#fff",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(66,165,245,1)",
                            data: [112, 90, 142, 130, 170, 188, 196]
                        }]
                    },
                    n = {
                        labels: ["Billings", "Client", "Mails"],
                        datasets: [{
                            data: data_byType,
                            backgroundColor: ["rgba(156,204,101,1)", "rgba(255,202,40,1)", "rgba(239,83,80,1)"],
                            hoverBackgroundColor: ["rgba(156,204,101,.5)", "rgba(255,202,40,.5)", "rgba(239,83,80,.5)"]
                        }]
                    },
                    byService_data = {
                        labels: ["Mails", "Azura Store", "Azura Labs"],
                        datasets: [{
                            data: data_byService,
                            backgroundColor: ["rgba(156,204,101,1)", "rgba(255,202,40,1)", "rgba(239,83,80,1)"],
                            hoverBackgroundColor: ["rgba(156,204,101,.5)", "rgba(255,202,40,.5)", "rgba(239,83,80,.5)"]
                        }]
                    };
                t.length && new Chart(t, {
                    type: "line",
                    data: i
                }), e.length && new Chart(e, {
                    type: "bar",
                    data: i
                }), o.length && new Chart(o, {
                    type: "radar",
                    data: i
                }), r.length && new Chart(r, {
                    type: "polarArea",
                    data: n
                }), l.length && new Chart(l, {
                    type: "pie",
                    data: n
                }), a.length && new Chart(a, {
                    type: "doughnut",
                    data: byService_data
                })
            }
        },{
            key: "init",
            value: function() {
                this.initChartsChartJS()
            }
        }], (r = null) && o(e.prototype, r), l && o(e, l), t
    }();
    jQuery((function() {
        r.init()
    }))
}]);