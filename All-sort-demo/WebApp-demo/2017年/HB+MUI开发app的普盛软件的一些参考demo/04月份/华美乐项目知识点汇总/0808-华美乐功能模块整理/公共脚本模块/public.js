//  移动端元素 触摸 高亮交互 用
document.body.addEventListener('touchstart', function() {});

function openNew(url) {
    if (!mui.os.plus) {
        location.href = url;
        return;
    }
    if (plus.webview.getWebviewById(url)) {
        return;
    } else {
        var webview = plus.webview.create(url, url);
        webview.addEventListener("titleUpdate", function() {
            setTimeout(function() {
                webview.show("pop-in", 200);
            }, 10);
        });
    }
}

function alertMsg(msg, callback) {
    if (!mui.os.plus) {
        alert(msg);
        return;
    } else {
        plus.nativeUI.alert(msg, callback, "华美乐");
    }
}

function toast(msg) {
    if (!mui.os.plus) {
        alert("" + msg);
        return;
    } else {
        //plus.nativeUI.toast(msg);
        if (plus.os.name == "iOS") {
            // 弹出消息框
            plus.nativeUI.toast(msg, {
                style: "inline",
                icon: "/images/kehu/head_small.png", // eg. "/img/add.png"
                duration: "short", // 持续3.5s，short---2s
                align: "center", // 水平居中
                verticalAlign: "center" // 垂直底部
            });
        } else {
            // 弹出消息框
            plus.nativeUI.toast(msg, {
                style: "inline",
                icon: "/images/kehu/head.png", // eg. "/img/add.png"
                duration: "short", // 持续3.5s，short---2s
                align: "center", // 水平居中
                verticalAlign: "center" // 垂直底部
            });
        }

    }
}

function logJson(obj) {
    console.log(JSON.stringify(obj))
}

function log(str) {
    console.log(str)
}

function showloading(msg) {
    if (!mui.os.plus) {
        console.log("loading!!!!" + msg);
        return;
    } else {
        plus.nativeUI.showWaiting(msg);
    }
}

function closeloading() {
    if (!mui.os.plus) {
        console.log("closeloading!!!!");
        return;
    } else {
        plus.nativeUI.closeWaiting();
    }
}

function onError(xhr, textStatus, errorThrown) {
    closeProgress();
    log(textStatus + " " + logJson(errorThrown));
    alertMsg('网络请求错误！', null);
}

function isEmpty(str) {
    if (str == null || str == undefined || str == '') {
        return true;
    }
    return false;
}

function get(url, data, successcallback, errcallback) {
    ajax(url, 'get', data, '', successcallback, errcallback);
}

function post(url, data, successcallback, errcallback) {
    ajax(url, 'post', data, "application/json", successcallback, errcallback);
}

function ajax(url, mothd, data, contentType, successcallback, errcallback) {
    url = getBaseServerUrl() + url;
    log('request:' + url + " " + JSON.stringify(data));
    mui.ajax(url, {
        data: data,
        dataType: 'json', //服务器返回json格式数据
        type: mothd, //HTTP请求类型
        timeout: 20000, //超时时间设置为8秒；
        contentType: contentType,
        success: function(data, textStatus, xhr) {
            //服务器返回响应，根据响应结果，分析是否登录成功；
            log('success:' + url + " " + JSON.stringify(data));
            successcallback(data, url);
        },
        error: function(xhr, type, errorThrown) {
            console.log(type + ':' + url + ' ' + xhr.status)
            //异常处理；
            errcallback(xhr, url);
        }
    });
}

function getAuth() {
    var headParam = localStorage.headParam;
    console.log("鉴权信息：" + headParam);
    return headParam;
}

function modifileRootRem() {
    var root = window.document.documentElement;
    var fontSize = parseFloat(root.style.fontSize);
    var finalFontSize = parseFloat(window.getComputedStyle(root).getPropertyValue("font-size"));
    if (finalFontSize === fontSize) return;
    root.style.fontSize = fontSize + (fontSize - finalFontSize) + "px";
}
if (typeof window.onload === 'function') {
    var oldFun = window.onload;
    window.onload = function() {
        oldFun();
        modifileRootRem();
    }
} else {
    window.onload = modifileRootRem;
}
