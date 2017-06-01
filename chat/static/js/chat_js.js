$(document).ready(function () {
    $('#chat-form').on(function(event){
        event.preventDefault();
        var msgbox = {
            'msgbox': $("input[name='chat-msg']").val()}
        $.ajax({
            url : 'post',
            type : 'POST',
            data : msgbox,
            dataType: "json",
            cache: false,
            success : function(JsonResponse){
                $('#chat-msg').val('');
                $('#msg-list').append('<li class="text-right list-group-item">' + JsonResponse.msg + '</li>');
                var chatlist = document.getElementById('msg-list-div');
                    chatlist.scrollTop = chatlist.scrollHeight;
            }
        });
    });
})


$(document).ready(function() {
    $('#send').attr('disabled','disabled');
    $('#chat-msg').keyup(function() {
        if($(this).val() != '') {
           $('#send').removeAttr('disabled');
        }
        else {
        $('#send').attr('disabled','disabled');
        }
     });
 });

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});