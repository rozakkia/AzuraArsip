$("#formTambah").on("submit", function(e){
    check3 = (document.getElementById('example-radio2').checked)? '2' : '3'
    jenisnya = (document.getElementById('example-radio1').checked)? '1' : check3 
    var formData = {
        keterangan : $("#keterangan").val(),
        isi : $("#isi").val(),
        jenis : jenisnya
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "",
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

$("#formUbah").on("submit", function(e){
    check3 = (document.getElementById('example-radio2').checked)? '2' : '3'
    jenisnya = (document.getElementById('example-radio1').checked)? '1' : check3 
    var formData = {
        keterangan : $("#keterangan").val(),
        isi : $("#isi").val(),
        idNum : $("#idNum").val(),
        jenis : jenisnya
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "update",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(Alerts) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Data Diubah',
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