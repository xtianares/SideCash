function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// checking if logged in or logged out
$(function(){
    if(readCookie("logged-in")){
        $(".logged-out").hide();
        $(".logged-in").show();
    }
    else {
        $(".logged-out").show();
        $(".logged-in").hide();
    }
    $('.logout-link').on('click', function(e){
        setCookie("logged-in", false, -1);
        setCookie("logged-username", null, -1);
    });
});

$('#signup-form').on('submit', function(e){
    e.preventDefault();
    let query = '/api/user/create';
    let newUser = {
        username: $("#username").val().trim(),
        fullname: $("#fullname").val().trim(),
        password: $("#password").val().trim(),
        email: $("#email").val().trim(),
        phone: $("#phone").val().trim(),
        location: $("#location").val().trim()
    }
    $.ajax({
        method: "POST",
        url: query,
        data: newUser
    })
    .done(function(data) {
        // Redirect to user profile
        console.log(data);
        if (data.error) {
            // add user validation error here, modal box
        }
        else {
            // setting dummy login cookies for demo only
            setCookie("logged-in", true);
            setCookie("logged-username", data.username);
            window.location = "/user-profile/" + data.id;
        }
    });
});

$('#login-form').on('submit', function(e){
    e.preventDefault();
    $('#login-form .login-error').remove()
    let query = '/api/user/login';
    let userInfo = {
        username: $("#username").val().trim(),
        password: $("#password").val().trim()
    }
    console.log(userInfo);
    $.ajax({
        method: "POST",
        url: query,
        data: userInfo
    })
    .done(function(data) {
        // Redirect to user profile
        console.log(data);
        if (data.error) {
            // add user validation error here, modal box
            $('#login-form .login-btn').before("<span class='login-error text-danger'>" + data.error + " </span>");
        }
        else {
            // setting dummy login cookies for demo only
            setCookie("logged-in", true);
            setCookie("logged-username", data.username);
            location.reload();
        }
    });
});
