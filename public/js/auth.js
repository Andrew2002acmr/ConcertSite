$("#auth-btn").on("click", function(e){
   
    const email = $("#floatingInput").val()
    const password = $("#floatingPassword").val()

    $.post({
        url: "/api/auth",
        method: "post",
        data: {"email": email, "password": password},
        error: function(e){
          
            console.log("Такого пользователя нет")
        }
    }).done(function(data){
        if(data["accessToken"]){
            $("#token").val(token)
            $("#token-auth").submit()

        }
    });
    
})


$("#recover-password").on("click", function(){
    window.location.href = "/recover"
})

$("#registration-btn").on('click', function(){
    window.location.href = "/api/registration"
})
