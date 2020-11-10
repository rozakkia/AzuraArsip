$("#formBillingAdd").on("submit", function(e){
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
        url         : "billings",
        data        : JSON.stringify(formData),
        dataType    : 'json',
        success : function(clientAdd) {
            setTimeout(function () {  
                swal.fire({
                    title: 'Billing Dibuat',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
            },10);
            window.setTimeout(function(){ 
               location.replace('billings/create');
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