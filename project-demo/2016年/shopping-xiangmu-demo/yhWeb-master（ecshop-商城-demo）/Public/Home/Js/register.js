/**
 * Created by Administrator on 2016/4/26.
 */
$(function () {
    /*用户名判断*/
    $('#uName').blur(function () {

        var userName = $('#uName').val();

        if (userName == '') {

            $('.uName').html('*请输入用户名');
            $('.uName').css('color', 'red');

            return false;

        }

        if (userName.length < 5 || userName.length >= 16) {

            $('.uName').html('*用户名长度必须在5-16位之间');

            $('.uName').css('color', 'red');

            return flase;

        } else {
            $('.uName').html('*用户名正确');
            $('.uName').css('color', 'green');
        }

        $.post('checkUserName', {userName: userName}, function (data) {

            if (data == 1) {

                $('.uName').html('*该用户名已注册');
                $('.uName').css('color', 'red');
                return false;

            } else {

                $('.uName').html('*恭喜，此用户名可以使用。');

                $('.uName').css('color', 'green');

            }

        })

    });
    /*密码判断*/
    $('input[type=password]').blur(function () {

        if ($(this).is('#uPwd')) {

            if ($(this).val() == '') {
                $('.uPwd').html('*请输入密码');
                $('.uPwd').css({'color': 'red', 'fontSize': '14px'});
                return false;
            }

            if ($(this).val().length < 5 || $(this).val().length >= 16) {

                $('.uPwd').html('*密码长度必须在5-16位之间');
                $('.uPwd').css({'color': 'red', 'fontSize': '14px'});
                return false;

            } else {

                $('.uPwd').html('*密码正确');

                $('.uPwd').css({'color': 'green', 'fontSize': '14px'});

            }

        }
        /*确认密码判断*/
        if ($(this).is('#uPwd1')) {

            if ($(this).val() == '') {
                $('.uPwd1').html('*请输入确认密码');
                $('.uPwd1').css({'color': 'red', 'fontSize': '14px'});
                return false;
            }

            if ($('#uPwd').val() != $('#uPwd1').val()) {

                $('.uPwd1').html('*两次密码不一致');
                $('.uPwd1').css({'color': 'red', 'fontSize': '14px'});

            } else {

                $('.uPwd1').html('*密码正确');

                $('.uPwd1').css({'color': 'green', 'fontSize': '14px'});

            }
        }
    });
    /*email判断*/
    $('#email').blur(function () {

        var email = $('#email').val();

        var reg = /^[a-z0-9](\w|\.|-)*@\w{2,}\.(com|cn|net|com.cn|net.cn)$/i;

        if (!reg.test(email)) {

            $('.email').html('*邮箱格式不正确');

            $('.email').css({'color': 'red', 'fontSize': '14px'});

            return false;

        } else {

            $('.email').html('*邮箱正确');

            $('.email').css({'color': 'green', 'fontSize': '14px'});

        }

        $.post('__URL__/checkEmail', {email: email}, function (data) {
            if (data == 1) {

                $('.email').html('*邮箱已注册');

                $('.email').css({'color': 'red', 'fontSize': '14px'});

                return false;

            }

        })

    })

});
/*手机号码判断*/
$(function () {

    $('#phone').blur(function () {

        var phone = $('#phone').val();

        var reg = /^1[3|4|5|7|8]\d{9}$/;

        if (!reg.test(phone)) {

            $('.phone').html('*手机号码格式不正确');

            $('.phone').css({'color': 'red', 'fontSize': '14px'});

            return false;

        } else {

            $('.phone').html('*手机号码正确');

            $('.phone').css({'color': 'green', 'fontSize': '14px'});

        }

        $.post('__URL__/phone', {phone: phone}, function (data) {
            if (data == 1) {

                $('.phone').html('*手机号码已注册');

                $('.phone').css({'color': 'red', 'fontSize': '14px'});

                return false;

            }

        })

    });
    /*验证码判断*/
    $('#code').blur(function () {
        var inputCode = $('#code').val();
        if (inputCode <= 0) {
            $('.code').html('*验证码不能为空');
            $('.code').css({'color': 'red', 'fontSize': '14px'});
            return false;
        }

        $.post('__URL__/check_verify', {code: inputCode}, function ($data) {
            if ($data == 1) {
                $('.code').html('*验证码正确');
                $('.code').css({'color': 'green', 'fontSize': '14px'});
            } else {
                $('.code').html('*验证码输入错误，请重输');
            }
        })

    });
    /*ajax提交*/
    $('.reg_btn').click(function () {

        var userName = $('#uName').val();

        var uPwd = $('#uPwd').val();

        var uPwd1 = $('#uPwd1').val();

        var email = $('#email').val();

        var phone = $('#phone').val();

        var inputCode = $('#code').val();

        if (userName == '') {
            $('.uName').html('*请输入用户名');
            return false;
        }

        if (uPwd == '') {
            $('.uPwd').html('*请输入用户密码');
            return false;
        }

        if (uPwd1 == '') {
            $('.uPwd1').html('*请输入确认密码');
            return false;
        }

        if (email == '') {
            $('.email').html('*请输入电子邮箱');
            return false;
        }

        if (phone == '') {
            $('.phone').html('*请输入手机号码');
            return false;
        }

        if (inputCode == '') {
            $('.code').html('*请输入验证码');
            return false;
        }

        $.post('__URL__/register_action', {userName: userName, passWord: uPwd, email: email, phone: phone, code: inputCode}, function (data) {
            if (data.status == 1) {
                window.location.href = '../Index/Index';
            } else if (data.status == 2) {
                alert('注册失败');
            }
        }, 'json')

    })

});


