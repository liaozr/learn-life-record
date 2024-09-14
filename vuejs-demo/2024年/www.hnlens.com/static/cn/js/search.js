$(function () {

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        } else {
            return null;
        }
    }
    function getCondition(n) {
        //构造搜索条件的JSON
        var json = { 'conditions': [] };
        keywords = $(".formd_search_id" + n).val();
        //关键字
        json.conditions.push({
            'field': 'title|content1',
            'operator': 'LIKE',
            'value': keywords ? '%' + keywords + '%' : ''
        });
        return encodeURIComponent(JSON.stringify(json));
    }
    function getTxt(n) {
        if ($.trim($(".formd_search_id" + n).val()) == '' || $.trim($('.formd_search_id' + n).val()) == '请输入关键字') {
            $('.formd_search_id' + n).focus();
            alert("请输入关键字!");
            return;
        } else {

            if (getUrlParam('keywords') == null) {
                // window.location.href = "?keywords=" + $.trim($(".formd_search_id" + n).val()) + "&condition=" + getCondition(n);
                // window.open("/search.html?keywords=" + $.trim($(".formd_search_id" + n).val()) + "&condition=" + getCondition(n));
                //location.reload();
                window.location.href = window.location.origin+"/search.html?keywords=" + $.trim($(".formd_search_id" + n).val()) + "&condition=" + getCondition(n);
                
                $('.formd_search_id1').val('');
                $('.formd_search_id2').val('');
                $('.formd_search_id1').blur();
                $('.formd_search_id2').blur();
                $('#close').removeClass('active');
                $('.search-drop-down').slideUp();
            } else {
                window.location.href = "?keywords=" + $.trim($(".formd_search_id" + n).val()) + "&condition=" + getCondition(n);
            }

        }
    }

    //如果移动端和pc端是两个搜索框，则写两个。
    $(document).on("focus", ".formd_search_id1", function () {
        $(document).on("keydown", function (event) {
            if (event.keyCode == '13') {
                getTxt(1);
            }
        });
    });
    $(".btnSearch1").on("click", function (e) {
        e.stopPropagation();
        getTxt(1);
    });
    //如果移动端和pc端是两个搜索框，则写两个。
    $(document).on("focus", ".formd_search_id2", function () {
        $(document).on("keydown", function (event) {
            if (event.keyCode == '13') {
                getTxt(2);
            }
        });
    });
    $(".btnSearch2").on("click", function (e) {
        e.stopPropagation();
        getTxt(2);
    });
    //搜索页面中的
    $(document).on("focus", ".formd_search_id3", function () {
        $(document).on("keydown", function (event) {
            if (event.keyCode == '13') {
                getTxt(3);
            }
        });
    });

    $(".btnSearch3").on("click", function (e) {
        e.stopPropagation();
        getTxt(3);
    })


    //过滤危险字符
    $(document).on('keyup', 'input[type=text],textarea,input[type=password]', function () {

        var val = $(this).val().toLocaleLowerCase();
        var otherKey = " and | exec | count | chr | mid | master | or | truncate | char | declare | join |<|>|*|/*|*/|;|\\u|insert|select|delete|update|create|drop|script|javascript|alert";
        var goon = true;
        for (var i = 0; i < otherKey.split('|').length; i++) {
            if (goon) {
                if (val.indexOf(otherKey.split('|')[i]) != -1) {
                    alert('不能包含危险字符!');
                    $(this).val('');
                    goon = false;
                    return;
                }
            }
        }
    });

})

