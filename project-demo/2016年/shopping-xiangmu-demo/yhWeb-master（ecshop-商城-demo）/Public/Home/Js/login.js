$(function () {
    $('.log_btn').click(function () {
        if ($('#form1').valid()) {
            /*  $('#form1').submit();*/
            var userName = $('#uName').val();
            var passWord = $('#uPwd').val();

            $.post('__URL__/login_action', {userName: userName, passWord: passWord}, function (data) {
                if (data.status == 1) {
                    window.location.href = '../Index/Index';
                } else if (data.status == 2) {
                    alert('用户名或密码错误');
                }
            }, 'json')
        }

    })
    $('#form1').validate({
        rules: {
            userName: {
                required: true,
            },
            passWord: {
                required: true,
            },
        },
        messages: {
            userName: {
                required: '*用户名不能为空',
            },
            passWord: {
                required: '*密码不能为空',
            }
        }
    })
})