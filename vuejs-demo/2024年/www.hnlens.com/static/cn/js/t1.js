function t1(stock,code,name,lang,_title,close){


    var opt_url;

    if(stock === "hk"){
        opt_url = "http://data.gtimg.cn/flashdata/hk/minute/hk"+ code + ".js";
        $.ajax({
            type: "GET",
            url: opt_url,
            dataType:"script",
            success:function(){
                var data_t1 = format_t1(min_data);

                var data0_t1 = splitData_t1(data_t1,close);

                if(stock == "hk"){
                    var timeArr = getTimeArr_hk();
                    var option_t1 = opt_t1_hk(name,data0_t1,lang,_title,timeArr);
                }else{
                    var timeArr = getTimeArr();
                    var option_t1 = opt_t1(name,data0_t1,lang,_title,timeArr);
                }

                var myChart = echarts.init(document.getElementById("main_gp"));

                myChart.setOption(option_t1)

            }
        });
    }else{
        $.ajax({
        type:"GET",
        url:"https://web.ifzq.gtimg.cn/appstock/app/minute/query?_var=min_data_"+ stock +code+"&code=" + stock +code,
        dataType:"script",
        cache:"false",
        success:function(){        

            var res = evil('min_data_' + stock +code)
            var stkCode = stock + code;

            if(res.code == 0){

                var obj_arr=res['data'][stkCode]['data']['data'],
                obj_date=res['data'][stkCode]['data']['date'];
                
                obj_date=obj_date.slice(2, obj_date.length);
                min_data_f='date:'+obj_date+"\n"            
                for(i in obj_arr){
                    min_data_f+=obj_arr[i]+"\n"
                }
                var data_t1 = format_t1(min_data_f);

                var data0_t1 = splitData_t1(data_t1,close);

                if(stock == "hk"){
                    var timeArr = getTimeArr_hk();
                    var option_t1 = opt_t1_hk(name,data0_t1,lang,_title,timeArr);
                }else{
                    var timeArr = getTimeArr();
                    var option_t1 = opt_t1(name,data0_t1,lang,_title,timeArr);
                }


            }
        },
        error:function(){
            //icom.alert('请求失败')
            console.log('请求失败')
            //请求出错处理
        }
    });
    };
	
};

function timestampToDate(stamp,lang){

	var iDate = new Date(Number(stamp));

	var iYear = iDate.getFullYear();
	
	var iMonth = iDate.getMonth() + 1;

	iMonth = iMonth < 10 ? "0" + iMonth : iMonth; 
	
	var iToday = iDate.getDate();

	iToday = iToday < 10 ? "0" + iToday : iToday;

	if(lang == "CN"){
		var iDay = numToCn(iDate.getDay());
	}else{
		var iDay = numToEn(iDate.getDay());
	}

	var iHour = iDate.getHours();

	var iMin = iDate.getMinutes();

	iMin = iMin < 10 ? "0" + iMin : iMin;

	return iYear + "/" + iMonth + "/" + iToday + " " + iDay + " " + iHour + ":" + iMin
}

// 提示框中文格式回调封装
function tooltip_t1(stock,lang,param,data,name){

    
    var html = ""
    if(param[0].componentSubType == "line"){

    	if(lang == "CN"){

            var til_a = "价格";
            var til_b = "涨跌幅";
            var til_c = "成交量";

    		
    	}else{

            var til_a = "Price"
            var til_b = "Change"
    		var til_c = "Volume"

    	};

        var _volume = data.volume[param[0].dataIndex];

        
        if(_volume >= 10000){
            _volume = showM(lang,_volume,stock)
        } 
       
        html += '<div style="text-align:center">' + name + '</div>'
             + '<div style="text-align:center">' + timestampToDate(param[0].axisValue,lang) + '</div>'
             + '<div style="white-space: pre-wrap;"></div>'
             + '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + param[0].color +'"></span>'
             +  til_a + '：' + toDecimal(param[0].value)
             + '<div style="white-space: pre-wrap;"></div>'
             + '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + param[0].color +'"></span>'
             +  til_b + '：' + toDecimal(param[1].value) + "%"
             + '<div style="white-space: pre-wrap;"></div>'
             + '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + param[0].color +'"></span>'
             +  til_c + '：' + _volume 
             + '<div style="white-space: pre-wrap;"></div>'
    }
    
    return html;
}

function opt_t1(name,data,lang,_title,xArr){

    // y轴左坐标 价格最大值、最小值及刻度
    var valueMax = Math.max.apply(null,data.values);
    var valueMin = Math.min.apply(null,data.values);
    var valueInt = (valueMax - valueMin) / 5;
    
    // y轴右坐标 涨跌幅最大值、最小值及刻度
    var changeMax = Math.max.apply(null,data.changeP);
    var changeMin = Math.min.apply(null,data.changeP);
    var changeInt = (changeMax - changeMin) / 5;

    var dis_lens = xArr.length - data.values.length
    for(var i = 0; i < dis_lens;i++){
        data.categoryData.push("-");
        data.values.push("-");
        data.volume.push("-");
        data.changeP.push("-");
    };


	var upColor = '#ec0000';
	var upBorderColor = '#8A0000';
	var downColor = '#00da3c';
	var downBorderColor = '#008F28';


	// 提示框参数配置
	var setTooltip = {
	    trigger: 'axis',
	    axisPointer: {
	        type: 'cross'
	    },
	    formatter:function(param){
	        return tooltip_t1("hushen",lang,param,data,name)
	    }
	};

    return {
    	title: {
            text: _title,
            left: '50%',
            show:false
        },
        tooltip: setTooltip,
        grid: {
            left: '15%',
            right: '15%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            splitNumber: 8,
            splitLine:{
                show:false
            },
            data:xArr,
            min:"dataMin",
            max:"dataMax",
            scale: true,
            boundaryGap : false,
            axisPointer: {
                label:{
                	formatter:function(params){
                		return timestampToDate(Number(params.value),lang)
                	}
                }
            },
            axisLine: {onZero: false},
            axisLabel:{
                showMinLabel: true,
                showMaxLabel: true,
                interval: 29,
                formatter:function(value,index){

                    var data = new Date(Number(value));

                    var hours = data.getHours();

                    if(hours == 9 || hours == 11){
                        hours = hours < 10 ? '0' + hours : hours;
                        var minutes = data.getMinutes();
                        if(minutes == 30){
                            var time = hours + ':' + minutes;  
                        }
                    }

                    if(hours > 12){
                        var minutes = data.getMinutes();
                        if(minutes == 0){
                            var time = hours + ':0' + minutes;  
                        }
                    }
                    
                    
                    return time
                }
            }
        },
        yAxis: [{
            type: 'value',
            min: 'dataMin',
            max: 'dataMax',
            splitNumber:5,
            interval:valueInt,
            scale: true,
            splitArea: {
                show: true
            },
            axisPointer: {
                label:{
                	formatter:function(params){
                		return toDecimal(params.value)
                	}
                }
            },
            axisLabel:{
                formatter:function(value,index){
                    return toDecimal(value)
                }
            }
        },
        {
            type: 'value',
            min: 'dataMin',
            max: 'dataMax',
            splitNumber: 5,
            interval:changeInt,
            scale: true,
            splitArea: {
                show: true
            },
            axisPointer: {
                label:{
                    formatter:function(params){
                        return toDecimal(params.value) + "%"
                    }
                }
            },
            axisLabel:{
                formatter:function(value,index){
                    value = toDecimal(value) > 0 ? "+" + toDecimal(value) : toDecimal(value);
                    return value + "%"
                }
            }
        }],
        series: [{
            name:"价格",
            type: 'line',
            yAxisIndex: 0,
            data: data.values,
        },{
            name:"涨跌幅",
            type: 'line',
            yAxisIndex: 1,
            data: data.changeP,
            lineStyle: {
                opacity: 0
            },
            itemStyle:{
                opacity: 0
            }
        }]
    };
}

function opt_t1_hk(name,data,lang,_title,xArr){

    // y轴左坐标 价格最大值、最小值及刻度
    var valueMax = Math.max.apply(null,data.values);
    var valueMin = Math.min.apply(null,data.values);
    var valueInt = (valueMax - valueMin) / 5;
    
    // y轴右坐标 涨跌幅最大值、最小值及刻度
    var changeMax = Math.max.apply(null,data.changeP);
    var changeMin = Math.min.apply(null,data.changeP);
    var changeInt = (changeMax - changeMin) / 5;

    var dis_lens = xArr.length - data.values.length
    for(var i = 0; i < dis_lens;i++){
        data.categoryData.push("-");
        data.values.push("-");
        data.volume.push("-");
        data.changeP.push("-");
    };



    var upColor = '#ec0000';
    var upBorderColor = '#8A0000';
    var downColor = '#00da3c';
    var downBorderColor = '#008F28';


    // 提示框参数配置
    var setTooltip = {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter:function(param){
            return tooltip_t1("hk",lang,param,data,name)
        }
    };

    return {
        title: {
            text: _title,
            left: 20,
            top:5
        },
        tooltip: setTooltip,
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            splitNumber: 11,
            splitLine:{
                show:false
            },
            data:xArr,
            min:"dataMin",
            max:"dataMax",
            scale: true,
            boundaryGap : false,
            axisPointer: {
                label:{
                    formatter:function(params){
                        return timestampToDate(Number(params.value),lang)
                    }
                }
            },
            axisLine: {onZero: false},
            axisLabel:{
                showMinLabel: true,
                showMaxLabel: true,
                interval: 29,
                formatter:function(value,index){

                    var data = new Date(Number(value));

                    var hours = data.getHours();

                    if(hours == 9){
                        hours = hours < 10 ? '0' + hours : hours;
                        var minutes = data.getMinutes();
                        if(minutes == 30){
                            var time = hours + ':' + minutes;  
                        }
                    }

                    if(hours >= 12){
                        var minutes = data.getMinutes();
                        if(minutes == 0){
                            var time = hours + ':0' + minutes;  
                        }
                    }
                    
                    
                    return time
                }
            }
        },
        yAxis: [{
            type: 'value',
            min: 'dataMin',
            max: 'dataMax',
            splitNumber:5,
            interval:valueInt,
            scale: true,
            splitArea: {
                show: true
            },
            axisPointer: {
                label:{
                    formatter:function(params){
                        return toDecimal(params.value)
                    }
                }
            },
            axisLabel:{
                formatter:function(value,index){
                    return toDecimal(value)
                }
            }
        },
        {
            type: 'value',
            min: 'dataMin',
            max: 'dataMax',
            splitNumber: 5,
            interval:changeInt,
            scale: true,
            splitArea: {
                show: true
            },
            axisPointer: {
                label:{
                    formatter:function(params){
                        return toDecimal(params.value) + "%"
                    }
                }
            },
            axisLabel:{
                formatter:function(value,index){
                    value = toDecimal(value) > 0 ? "+" + toDecimal(value) : toDecimal(value);
                    return value + "%"
                }
            }
        }],
        series: [{
            name:"价格",
            type: 'line',
            yAxisIndex: 0,
            data: data.values,
        },{
            name:"涨跌幅",
            type: 'line',
            yAxisIndex: 1,
            data: data.changeP,
            lineStyle: {
                opacity: 0
            },
            itemStyle:{
                opacity: 0
            }
        }]
    };
}


function format_t1(data){
    var res = JSON.stringify(data).split("\\n");

    //提取有效数据
    if(res[0] == '"'){
        res = res.splice(2)
    }else{
        res = res.splice(1)
    };

    if(res[res.length - 1] =='"'){
        res = res.splice(0,res.length - 1)
    }


    var _data = [];
    $.each(res,function(i,n){
        var arr = n.split(" ");

        var time = arr[0].slice(0,2) + ":" + arr[0].slice(2,4);

        arr.splice(0,1,time);

        
        $.each(arr,function(index,item){
            if(index > 0){
                var _item = Number(item);
                arr.splice(index,1,_item)
            }
        });

        _data.push(arr);

    });

    return _data
}
function splitData_t1(rawData,close) {

    var categoryData = [];
    var values = [];
    var volume = [];
    var changeP = [];

    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i][0]);
        values.push(rawData[i][1]);
        if(i > 0){
            volume.push(rawData[i][2] - rawData[i-1][2])
        }else{
            volume.push(rawData[i][2])
        };
        
        changeP.push(toDecimal((rawData[i][1] - close) / close * 100))
    };

    return {
        categoryData: categoryData,
        values: values,
        volume:volume,
        changeP:changeP
    };
};

// 建立数组[9:30,...,15:00]作x轴刻度显示
function getTimeArr(){

    var timeArr = [];
    var now_data = new Date();
    var now_year = now_data.getFullYear(),
        now_month = now_data.getMonth() + 1,
        now_day = now_data.getDate();
    var str_time = now_year + '/' + now_month + '/' + now_day +' 09:30';
    var tt = new Date(str_time).getTime();
    for(i = 0;i <= 330; i++){
        var value = new Date(Number(tt));
        var hours = value.getHours();
        switch(hours){
            case 11:
                var minutes = value.getMinutes();
                if(minutes <= 30){
                    timeArr.push(tt);
                };
                break;
            case 12:
                break;
            default:
                timeArr.push(tt);
        };

        tt = tt + 60000
        
    };
    return timeArr
}

function getTimeArr_hk(){

    var timeArr = [];
    var now_data = new Date();
    var now_year = now_data.getFullYear(),
        now_month = now_data.getMonth() + 1,
        now_day = now_data.getDate();
    var str_time = now_year + '/' + now_month + '/' + now_day +' 09:30';
    var tt = new Date(str_time).getTime();
    for(i = 0;i <= 390; i++){
        var value = new Date(Number(tt));
        var hours = value.getHours();
        switch(hours){
            case 12:
                var minutes = value.getMinutes();
                if(minutes == 0){
                    timeArr.push(tt);
                };
                break;
            default:
                timeArr.push(tt);
        };

        tt = tt + 60000
        
    };
    return timeArr
}

