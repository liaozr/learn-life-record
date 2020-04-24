var token = 'AES_PB53g0yfq4QQXGnpJkqpDxtrW11IJGGuaD4inbFdfaSaB6+sgE9iQXypZtg3DvrjXRWdDYaYV6SYIX2N3ju/8gODYqt/q0umQ+jGjV+F98Jkc08s1AsHML0AQq+0rWue2h6AHaci3wRdV0M3Vqcy4qw/Jes/rTHl403Tt3Xv8gs7k0Bxao8oyugnxYjRfcMnGOcoe62T68EGhCTCqm+z9e++oOFc7qgt5HcH4l78SeeomZ1sa1FZp7UAopXSEoTGgTwzXsx0lAfcgjoK2Hi4yoxcT5FxpsDbiMWCV2+Xko01bLV4TKp1NQwNCc3daYIeOh9cEBEwdAyD9Oasby5nI7+R9ERqSUNp6hDw/p+gKbs=';

var baseUrl = "103.236.252.138:900";

function getBaseServerUrl() {
    return "http://" + baseUrl + "/eidpws";
}

function getAjax(method, apiUrl, options, suscallback, errorcallback) {
    if (method == 'post') {
        options = JSON.stringify(options);
    }
    var xhr = $.ajax({
        type: method,
        url: apiUrl,
        data: options,
        timeout: 5000, // 设置超时时间
        headers: {
            "auth": token
        },
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(xhr) {

            // $.showLoading();// 数据加载成功之前，使用loading组件
            // 禁用按钮防止重复提交
            // $("#submit").attr({ disabled: "disabled" });
        },
        success: function(jsonData) {
            // $.hideLoading();    // 成功后，隐藏loading组件
            if (suscallback && suscallback instanceof Function == true) {
                suscallback(jsonData);
            }
        },
        error: function(XMLHttpRequest, textStatus, status) {
            console.log('vvvv')
            console.log(XMLHttpRequest)
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
            console.log(status);

            if (XMLHttpRequest.response == '' || XMLHttpRequest.response == undefined || XMLHttpRequest.response == null) {

                if (status !== 'timeout') {
                    // alert('服务器连接超时！');
                    errorcallback('服务器连接超时！')
                }
            } else {
                // alert(JSON.parse(XMLHttpRequest.response).errorMsg);
                errorcallback(JSON.parse(XMLHttpRequest.response).errorMsg)
            }
        },
        // complete不管你成功不成功都执行。
        complete: function(XMLHttpRequest, status) {
            if (status == 'timeout') {
                xhr.abort(); // 超时后中断请求

                // alert('请求超时，请重试！');
                errorcallback('请求超时，请重试！')

                return;

            }
        }
    })
}
