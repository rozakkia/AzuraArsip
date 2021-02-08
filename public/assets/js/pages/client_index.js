$("#formClientAdd").on("submit", function(e){
    var formData = {
        company : $("#company").val(),
        name :  $("#name").val(),
        jabatan :  $("#jabatan").val(),
        alamat :  $("#alamat").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "clients",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(clientAdd) {
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

$("#formContactAdd").on("submit", function(e){
    var formData = {
        company : $("#idClient").val(),
        name :  $("#alias").val(),
        jabatan :  $("#jenis").val(),
        alamat :  $("#kontak").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "clients",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(clientAdd) {
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


$("#formContactHapus").on("submit", function(e){
    var formData = {
        company : $("#idClient").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "clients",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(clientAdd) {
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

$("#formBankAdd").on("submit", function(e){
    var formData = {
        clientId: $("#idClient").val(),
        alias : $("#bank_alias").val(),
        name :  $("#bank_name").val(),
        an :  $("#bank_an").val(),
        num :  $("#bank_num").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "bank_create",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(alert) {
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

