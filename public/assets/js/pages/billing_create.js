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


  
