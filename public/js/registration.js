$("#registration-btn").on("click", function () {
    console.log("Всё ок")

    const email = $("#floatingInput").val()
    const password = $("#floatingPassword").val()
    const repeatPassword = $("#floatingRepeatPassword").val()

    console.log(password.length)

    if (password != repeatPassword) {
        alert('Пароли не совпадают')
    }
    else if (password.length < 4 || password.length > 12) {
        alert("Пароль должен быть не менее 4 и не более 12 символов")
    }
    else {
        $.post({
            url: "/api/registration",
            method: "post",
            data: { "email": email, "password": password },
            error: function (e) {

                console.log("Пользователь с таким именем уже существует")
            }
        }).done(function (data) {
            // const token = data;
            console.log("Блок авторизации")

            $.post({
                url: "/api/auth",
                method: "post",
                data: { "email": email, "password": password },
                error: function (e) {

                    console.log("Такого пользователя нет")
                }
            }).done(function (data) {
                if (data["accessToken"]) {
                    $("#token").val(token)
                    $("#token-auth").submit()
                    console.log("Форма отправлена")
                }
            });
        
        });
    }


})