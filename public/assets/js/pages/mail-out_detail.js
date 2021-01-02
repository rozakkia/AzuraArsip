$("#formMail-OutDetail").on("submit", function(e){
    var formData = {
        perihal : $("#perihal").val(),
        idmail : $("#idmail").val(),
        kepada :  $("#kepada").val(),
        di :  $("#di").val(),
        tanggal :  $("#tanggal").val(),
        isi :  $("#isi").val(),
        keytag: $("#keytag").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "update",
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

$("#formMail-OutDetail-hapus").on("submit", function(e){
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
               location.replace('/mails');
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
        idNum : $('#idNum').val()
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

