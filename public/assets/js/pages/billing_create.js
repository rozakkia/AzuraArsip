$("#formDetail").on("submit", function(e){
    var formData = {
        idNum : $('#idNum').val(),
        keterangan : $("#keterangan").val(),
        BankAccountId :  $("#bank").val(),
        stat : "1"
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "update-created",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(alerts) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Data Tersimpan',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
            },10);
            window.setTimeout(function(){ 
               location.reload();
            } ,2500);   
        },
        error : function(e) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Gagal',
                    icon: 'error',
                    text: e,
                    timer: 2500,
                    showConfirmButton: false
                }, function(){
                    location.reload();
                });
            },10);
        }
    })
})

$("#formCreateDetail").on("submit", function(e){
    var formData = {
        idBill : $('#idBill').val(),
        keterangan : $("#keterangan").val(),
        jumlah :  $("#jumlah").val(),
        harga :  $("#harga").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "create-detail",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(alerts) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Data Tersimpan',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
            },10);
            window.setTimeout(function(){ 
               location.reload();
            } ,2500);   
        },
        error : function(e) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Gagal',
                    icon: 'error',
                    text: e,
                    timer: 2500,
                    showConfirmButton: false
                }, function(){
                    location.reload();
                });
            },10);
        }
    })
})

$("#formUpdate").on("submit", function(e){
    var formData = {
        idNum : $("#idNum").val(),
        keterangan : $("#keteranganUp").val(),
        BankAccountId : $("#rekeningUp").val(),
        stat: "1"
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "update-created",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(Alerts) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Data Tersimpan',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
            },10);
            window.setTimeout(function(){ 
               location.reload();
            } ,2500);   
        },
        error : function(e) {
            console.log(e)
            setTimeout(function () {  
                swal.fire({
                    title: 'Gagal',
                    icon: 'error',
                    text: e,
                    timer: 2500,
                    showConfirmButton: false
                }, function(){
                    location.reload();
                });
            },10);
        }
    })
})

$("#formDelete").on("submit", function(e){
    var formData = {
        idNum : $("#idNum").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "delete",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(Alerts) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Data Terhapus',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
            },10);
            window.setTimeout(function(){ 
               location.replace("/settings/core");
            } ,2500);   
        },
        error : function(e) {
            console.log(e)
            setTimeout(function () {  
                swal.fire({
                    title: 'Gagal',
                    icon: 'error',
                    text: e,
                    timer: 2500,
                    showConfirmButton: false
                }, function(){
                    location.reload();
                });
            },10);
        }
    })
})

$("#formMain").on("submit", function(e){
    var formData = {
        idBill : $('#idBill').val(),
        nama : $("#nama_toko").val(),
        url :  $("#url_toko").val(),
        jenis :  $("#jenis_toko").val(),
        bank :  $("#bankmain").val(),
        total: $("#total_toko").val(),
        produk: $("#produk_toko").val(),
        alamat: $("#alamat_toko").val(),
        dFrom : $("#dfrom_toko").val(),
        dTo : $("#dto_toko").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "create-main",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(alerts) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Data Tersimpan',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
            },10);
            window.setTimeout(function(){ 
               location.reload();
            } ,2500);   
        },
        error : function(e) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Gagal',
                    icon: 'error',
                    text: e,
                    timer: 2500,
                    showConfirmButton: false
                }, function(){
                    location.reload();
                });
            },10);
        }
    })
})

$("#formMainUpdate").on("submit", function(e){
    var formData = {
        idBill : $('#idBill').val(),
        nama : $("#namastoreUp").val(),
        url :  $("#urltokoUp").val(),
        jenis :  $("#plantokoUp").val(),
        bank :  $("#bankstoreUp").val(),
        total: $("#totalUp").val(),
        produk: $("#produkUp").val(),
        alamat: $("#alamatUp").val(),
        dFrom : $("#dfromUp").val(),
        dTo : $("#dtoUp").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "update-main",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(alerts) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Data Tersimpan',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
            },10);
            window.setTimeout(function(){ 
                window.location.reload();
            } ,2500);   
        },
        error : function(e) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Gagal',
                    icon: 'error',
                    text: e,
                    timer: 2500,
                    showConfirmButton: false
                }, function(){
                    location.reload();
                });
            },10);
        }
    })
})

$("#printData").on("submit", function(e){
    var formData = {
        idBill : $('#idBill').val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "print-data-now",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(alerts) {
            window.open($('#idNum').val() + "/print-detailnya?print=true");
            location.reload();
        },
        error : function(e) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Gagal',
                    icon: 'error',
                    text: e,
                    timer: 2500,
                    showConfirmButton: false
                }, function(){
                    location.reload();
                });
            },10);
        }
    })
})


! function() {
    function n(n, e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i)
        }
    }
    var e = function() {
        function e() {
            ! function(n, e) {
                if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        var t, i;
        return t = e, i = [{
            key: "sweetAlert2",
            value: function() {
                var n = Swal.mixin({
                    buttonsStyling: !1,
                    customClass: {
                        confirmButton: "btn btn-alt-success m-5",
                        cancelButton: "btn btn-alt-danger m-5",
                        input: "form-control"
                    }
                }); 
                jQuery("#swalBayar").on("click", (function(e) {
                    var formData = {
                        idBill : $('#idBill').val()
                    }
                    n.fire({
                        title: "Kamu yakin?",
                        text: "Proses ini tidak dapat kamu kembalikan, data pembayaran akan langsung diakumulasikan",
                        icon: "warning",
                        showCancelButton: !0,
                        customClass: {
                            confirmButton: "btn btn-alt-danger m-1",
                            cancelButton: "btn btn-alt-secondary m-1"
                        },
                        confirmButtonText: "Ya, bayar sekarang",
                        html: !1,
                        preConfirm: function(n) {
                            return new Promise((function(n) {
                                setTimeout((function() {
                                    n()
                                }), 50)
                            }))
                        }
                    }).then((function(e) {
                        if(e.value){
                            $.ajax({
                                type        : "POST",
                                contentType : "application/json",
                                url         : "paid-bill",
                                data        : JSON.stringify(formData),
                                dataType    : 'json',
                                success : function(alerts) {
                                    setTimeout(function () {      
                                        n.fire({
                                            title: 'Terbayar',
                                            icon: 'success',
                                            text: 'Data Bill ini sudah dibayarkan',
                                            timer: 2500,
                                            showConfirmButton: false
                                        })
                                    },10);
                                    window.setTimeout(function(){ 
                                        window.location.reload();
                                    } ,2500);   
                                },
                                error : function(e) {
                                    setTimeout(function () {  
                                        n.fire({
                                            title: 'Gagal',
                                            icon: 'error',
                                            text: e,
                                            timer: 2500,
                                            showConfirmButton: false
                                        }, function(){
                                            location.reload();
                                        });
                                    },10);
                                }
                            })
                        }else{
                            n.fire({
                                title: 'Dibatalkan',
                                icon: 'error',
                                text: 'Pembayaran bill ini dibatalkan',
                                timer: 2500,
                                showConfirmButton: false
                            })
                        }
                    }))
                })),
                jQuery("#swalBatal").on("click", (function(e) {
                    var formData = {
                        idBill : $('#idBill').val()
                    }
                    n.fire({
                        title: "Batalkan Bill?",
                        text: "Proses ini tidak dapat kamu kembalikan, bill akan otomatis dibatalkan.",
                        icon: "warning",
                        showCancelButton: !0,
                        customClass: {
                            confirmButton: "btn btn-alt-danger m-1",
                            cancelButton: "btn btn-alt-secondary m-1"
                        },
                        confirmButtonText: "Ya, batalkan",
                        html: !1,
                        preConfirm: function(n) {
                            return new Promise((function(n) {
                                setTimeout((function() {
                                    n()
                                }), 50)
                            }))
                        }
                    }).then((function(e) {
                        if(e.value){
                            $.ajax({
                                type        : "POST",
                                contentType : "application/json",
                                url         : "unpaid-bill",
                                data        : JSON.stringify(formData),
                                dataType    : 'json',
                                success : function(alerts) {
                                    setTimeout(function () {      
                                        n.fire({
                                            title: 'Bill Dibatalkan',
                                            icon: 'success',
                                            text: 'Data Bill ini sudah dibatalkan',
                                            timer: 2500,
                                            showConfirmButton: false
                                        });
                                    },10);
                                    window.setTimeout(function(){ 
                                        window.location.reload();
                                    } ,2500);   
                                },
                                error : function(e) {
                                    setTimeout(function () {  
                                        n.fire({
                                            title: 'Gagal',
                                            icon: 'error',
                                            text: e,
                                            timer: 2500,
                                            showConfirmButton: false
                                        }, function(){
                                            location.reload();
                                        });
                                    },10);
                                }
                            })
                        }else{
                            n.fire({
                                title: 'Proses dibatalkan',
                                icon: 'error',
                                text: 'Data bill masih tersedia',
                                timer: 2500,
                                showConfirmButton: false
                            })
                        }
                    }))
                }))
            }
        }, {
            key: "init",
            value: function() {
                this.sweetAlert2()
            }
        }], null && n(t.prototype, null), i && n(t, i), e
    }();
    jQuery((function() {
        e.init()
    }))
}();


  
