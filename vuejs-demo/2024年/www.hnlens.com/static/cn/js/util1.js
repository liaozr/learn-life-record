// 数组格式化
function format(data,lang){
    //去除分隔符
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

    //调整数组格式  中文=>[日期, 开盘(open),收盘(close),最高(highest),最低(lowest)]
    var _data = [];
    $.each(res,function(i,n){
        var arr = n.split(" ");
        if(arr.length > 5){
            arr = arr.splice(0,5)
        }
        // 日期格式化
        var date = "20" + arr[0];
        date = date.slice(0,4) + "/" + date.slice(4,6) + "/" + date.slice(6,8);
        arr.splice(0,1,date)
        $.each(arr,function(index,item){
            if(index > 0){
                var _item = Number(item);
                arr.splice(index,1,_item)
            }
        });

        // 英文数组格式  [open,close,lowest,highest]
        if(lang === "EN"){
            if(arr[3] > arr[4]){
                var min = arr[4]
                var max = arr[3]
                arr.splice(3,1,min)
                arr.splice(4,1,max)
            } 
        }
        
        
        _data.push(arr)
    });


    return _data
}

//数组格式 {
//     categoryData:[],  => X轴
//     values:[]         => Y轴
// }
function splitData(rawData) {

    var categoryData = [];
    var values = [];
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0,1)[0]);
        values.push(rawData[i])
    }
    return {
        categoryData: categoryData,
        values: values
    };
}

// 生成X日均值数组封装
function calculateMA(data,dayCount) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
        }

        result.push(toDecimal(sum / dayCount));
    }
    return result;
}

// 保留两位小数
function toDecimal(x) { 
   var f = parseFloat(x); 
   if (isNaN(f)) { 
    return false; 
   } 
   var f = Math.round(x*100)/100; 
   var s = f.toString(); 
   var rs = s.indexOf('.'); 
   if (rs < 0) { 
    rs = s.length; 
    s += '.'; 
   }
   while (s.length <= rs + 2) { 
    s += '0'; 
   } 
   return s; 
}

// 阿拉伯数字转换为汉字
function numToCn(num){
    
    switch(num){
        case 0:
            return "日";
            break;
        case 1:
            return "一";
            break;
        case 2:
            return "二";
            break;    
        case 3:
            return "三";
            break;
        case 4:
            return "四";
            break;
        case 5:
            return "五";
            break;
        case 6:
            return "六";
            break;
    };
    
};

// 星期X阿拉伯数字转换为英文
function numToEn(num){
    
    switch(num){
        case 0:
            return "Sun";
            break;
        case 1:
            return "Mon";
            break;
        case 2:
            return "Tue";
            break;    
        case 3:
            return "Wed";
            break;
        case 4:
            return "Thu";
            break;
        case 5:
            return "Fri";
            break;
        case 6:
            return "Sat";
            break;
    };
    
};

//处理数据为亿单位
function showM(lang,data){
    var cj = null;
    if(lang == "CN"){
        if(data >= 10000){
            cj = toDecimal(data/100000000)+'万';

            // if(types == 'hushen'){
            //     cj = toDecimal(data/100/10000)+'万';
            // }else{
            //     cj = toDecimal(data/10000)+'万';
            // }
        }else{
            cj = data;
        }
    }else{

        if(data >= 1000000){
            cj = toDecimal(data/100000000)+'mil';

            // if(types == 'hushen'){
            //     cj = toDecimal(data/100/1000000)+'mil';
            // }else{
            //     cj = toDecimal(data/1000000)+'mil';
            // }
        }else if(data < 100000000 && data >= 1000){
            cj = toDecimal(data/100000000)+'k';

            // if(types == 'hushen'){
            //     cj = toDecimal(data/100/1000)+'k';
            // }else{
            //     cj = toDecimal(data/1000)+'k';
            // }

        }else{
            cj = data;
        }
    }

    return cj;
};