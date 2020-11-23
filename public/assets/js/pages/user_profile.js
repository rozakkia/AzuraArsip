$("#formUpdate").on("submit", function(e){
    var formData = {
        idNum : $("#idNum").val(),
        name : $("#name").val(),
        username : $("#username").val()
    }
    e.preventDefault();
    $.ajax({
        type        : "POST",
        contentType : "application/json",
        url         : "profile/update",
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


$('#formPass input').blur(function(){
    if( !$(this).val() ) {
          
    }else{
        $("#formPass").on("submit", function(e){
            if ($('.invalid-feedback').length > 0) {
                    
            }else{
                var formData = {
                    idNum : $("#idNum").val(),
                    passCurrent : $("#current-password").val(),
                    passNew : $("#new-password").val()
                }
                e.preventDefault();
                $.ajax({
                    type        : "POST",
                    contentType : "application/json",
                    url         : "profile/pass-change",
                    data        : JSON.stringify(formData),
                    dataType    : 'json',
                    success : function(Alerts) {
                        if(Alerts == '1'){
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
                        }else{
                            setTimeout(function () {  
                                swal.fire({
                                    title: 'Password lama salah!',
                                    icon: 'error',
                                    timer: 2500,
                                    showConfirmButton: false
                                });
                            },10);
                        }
                           
                    },
                    error : function(e) {
                        console.log(e)
                        setTimeout(function () {  
                            swal.fire({
                                title: 'Gagal Ganti',
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
            }
        })
    }
});


