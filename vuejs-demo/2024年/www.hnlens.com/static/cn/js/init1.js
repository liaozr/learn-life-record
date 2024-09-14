function evil(fn) {
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}

$(function(){
    /* ********** 变量配置 ********** */
    // 语言切换 CN/EN
    var lang = "CN";
  const manScode = $('.manScode').text().trim();
  console.log(manScode)
    var stock = manScode.slice(0, 2);

    // 股票代码
    var papercode = manScode.slice(2); 
    
    // 初始化
    init_0(lang,stock,papercode)    
})  

function init_0(lang,stock,code,chart){



    var stk_name,opt_title,opt_legend,opt_serious,p_close;




    $.ajax({
        type: "GET",
        url: "https://qt.gtimg.cn/q=" + stock + code,
        dataType:"script",
        cache:"false",
        success:function(){


            
            var res = evil("v_" + stock + code);

            //console.log(res.split("~"))
            	/* 以 ~分割字符串中内容，下标从0开始，参数依次为
					0: 未知
					1: 名字
					2: 代码
					3: 当前价格
					4: 昨收
					5: 今开
					6: 成交量（手）
					7: 外盘
					8: 内盘
					9: 买一
					10: 买一量（手）
					11 - 18: 买二 买五
					19: 卖一
					20: 卖一量
					21 - 28: 卖二 卖五
					29: 最近逐笔成交
					30: 时间
					31: 涨跌
					32: 涨跌 %
					33: 最高
					34: 最低
					35: 价格 / 成交量（手）/成交额
					36: 成交量（手）
					37: 成交额（万）
					38: 换手率
					39: 市盈率
					40:
					41: 最高
					42: 最低
					43: 振幅
					44: 流通市值
					45: 总市值
					46: 市净率
					47: 涨停价
					48: 跌停价
					*/

            stk_name = res.split("~")[1];



            $(".stc_name").html(stk_name);
            $(".stk-data").find(".stc-name").html(stk_name);
            $(".stk-data").find(".stc-codd").html("股票代码：" + "" +stock+ code + "");
            res = res.split('~');

            var zdNum,cjNum,zdHtm;
            p_close = res[4]
            //日期时间
            var dtStr = res[30];
            var dt_format = dtStr.substring(0,4) + "-" + dtStr.substring(4,6) + "-" + dtStr.substring(6,8) + "  " + dtStr.substring(8,10) + ":" + dtStr.substring(10,12) + ":" + dtStr.substring(12)
            $('.stk-data').find('.st_date').html(dt_format);    
            //价格
            $('.stk-data').find('.st_price').html(toDecimal(res[3]));
            // 最新股价
            $('.stk-data').find('.stc_current').html(toDecimal(res[3]));
            // 最高价
            $('.stk-data').find('.stc_max').html(toDecimal(res[33])); 
            // 最低价
            $('.stk-data').find('.stc_min').html(toDecimal(res[34])); 
            // （+/-）涨跌 
            $('.stk-data').find('.stc_updown').html(toDecimal(res[31]));
            // 涨跌幅%  
            $('.stk-data').find('.stc_rate_ud').html(toDecimal(res[32]));
            zdNum = toDecimal(res[32])
            // 买入价
            $('.stk-data').find('.stc_buy').html(toDecimal(res[9]));
            // 卖出价  
            $('.stk-data').find('.stc_sell').html(toDecimal(res[19])); 
            // 总市值
            $('.stk-data').find('.stc_amount').html(showM(lang,res[45]) + "亿");
            cjNum = showM(lang,res[36])

            // 今开 
            $('.stk-data').find('.stc_jk').html(toDecimal(res[5])); 
            // 昨收 
            $('.stk-data').find('.stc_zs').html(toDecimal(res[4])); 
            //成交额
            $('.stk-data').find('.stc_cje').html(toDecimal(res[37]) + "万");
            //市盈率
            $('.stk-data').find('.stc_syl').html(toDecimal(res[39]));
            //市盈率
            $('.stk-data').find('.stc_sjl').html(toDecimal(res[46]));


           
            
            
            if(zdNum > 0){
                $('.stk-data').find('.stc_updown').addClass('zd_up');
                $('.stk-data').find('.st_zd').addClass('zd_up');
                $('.stk-data').find('.st_price').addClass('zd_up');
                $('.stk-data').find('.st_price1').addClass('zd_up');
                $('.stk-data').find('.stc_jk').addClass('zd_up');
                $('.stk-data').find('.stc_max').addClass('zd_up');
                zdHtm = zdNum+'%'
            }else{
                $('.stk-data').find('.stc_updown').addClass('zd_down')
                $('.stk-data').find('.st_zd').addClass('zd_down')
                $('.stk-data').find('.st_price').addClass('zd_down')
                $('.stk-data').find('.st_price1').addClass('zd_down')
                $('.stk-data').find('.stc_jk').addClass('zd_down');
                $('.stk-data').find('.stc_max').addClass('zd_down');
                zdHtm = zdNum+'%'
            }
            //涨幅
            $('.stk-data').find('.st_zd').html(zdHtm);
    
            //成交数
            $('.stk-data').find('.st_cj').html(cjNum);

            optForLang(lang,stock,code,stk_name,chart,p_close);
             
        }
    });

    
    
}



function optForLang(lang,stock,code,name,chart,close){

    if(lang === "CN"){
        switch(stock){
            case "sh":
                opt_title = "上证指数";
                break;
            case "sz":
                opt_title = "上证指数";
                break;
            case "hk":
                opt_title = "恒生指数";
                break;
        };

    }

    if(chart){
        // 清空当前实例
        chart.clear();
    };

    t1(stock,code,name,lang,opt_title,close);

};



