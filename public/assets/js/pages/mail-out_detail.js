$("#formMail-OutDetail").on("submit", function(e){
    var formData = {
        keterangan : $("#keterangan").val(),
        idmail : $("#idmail").val(),
        tujuan :  $("#tujuan").val(),
        tanggal :  $("#tanggal").val(),
        isi :  $("#isi").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "update",
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

$("#formMail-OutDetail").on("submit", function(e){
    /*
        - on klik
        - terus call function
    */
    e.preventDefault();
    Swal.fire({
        title: 'Hapus data ini?',
        text: "Kamu tidak akan bisa mengembalikannya",
        icon: 'warning',
        timer: 2500,
        timerProgressBar: true,
        showCancelButton: true,
        cancelButtonText: 'Batalkan',
        confirmButtonText: 'Ya, hapus!'
    },function(isConfirm){
        if (isConfirm) {
            var formData = {
                idNum : $("#idNum").val()
            }
            $.ajax({
                type        : "POST",
                contentType : "application/json",
                url         : "delete",
                data        : JSON.stringify(formData),
                dataType    : 'json',
                success : function(clientAdd) {
                    setTimeout(function () {  
                        swal.fire({
                            title: 'Data Terhapus',
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
        }else{
            swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
        } 
    })
});

