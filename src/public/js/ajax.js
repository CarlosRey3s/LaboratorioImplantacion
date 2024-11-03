$(document).ready(function () { 
    $("#enviarDatos").on("click", function () { 
        var form = $(".form-ajax"); 
        var formData = new FormData(form[0]); 
    $.ajax({ 
        url: form.attr("action"), 
        headers: { 
        'Accept': "application/json; charset=utf-8" 
    }, 
        beforeSend: func_antesEnviar, 
        success: function (data, textStatus, xhr) { 
        func_exito(data, textStatus, xhr, form); 
    }, 
        error: function (jqXHR, textStatus, errorThrown) { 
        func_error(jqXHR, textStatus, errorThrown, form); 
    }, 
            data: formData, 
            type: form.attr("method"), 
            contentType: false, 
            processData: false, 
            async: true, 
            cache: false 
            }); 
        }); 
    }); 
     
    function func_antesEnviar() { 
        $(".form-errors").remove(); 
    } 
     
    function func_exito(data, textStatus, xhr, form) { 
     
        //alert(data.msg); 
     
       // location.reload(); 
    } 
     
    function func_error(jqXHR, textStatus, errorThrown, form) { 
     
        var result = jqXHR.responseJSON; 
     
        switch (jqXHR.status) { 
     
            case 400: 
     
                $.each(result.errors, function (k, v) { 
     
                    var error_msg = $('<p class="form-errors"><strong>' + v + 
    '</strong></p>'); 
     
                    form.find("[name=" + k + "]").after(error_msg); 
                }); 
                 
                break; 
     
            case 500: 
     
                alert(result.msg); 
     
                break; 
        } 
     
    }