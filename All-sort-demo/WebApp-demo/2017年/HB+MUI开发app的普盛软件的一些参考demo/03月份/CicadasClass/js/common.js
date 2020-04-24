/**
 * 默认请求基路径
 */
//var baseUrl = "http://119.147.53.221:600";
//var baseUrl = "http://192.168.1.56:999";
var baseUrl = "http://192.168.1.126:800";

/**
 * 获取host
 */
function getHost(){
	var url = "";//本地存储中获取baseUrl
	if(url == null || url == '' || url == undefined){
		return baseUrl;
	}else{
		return url;		
	}
}

/**
 * 将host信息存储到本地
 */
function setHost(url) {
	//将host信息存储到本地
	if(localStorage.getItem($.locStorage.baseUrl) == undefined || localStorage.getItem($.locStorage.baseUrl) == null || localStorage.getItem($.locStorage.baseUrl)== "") {
				localStorage.setItem($.locStorage.baseUrl, baseUrl);
	}
}

/**
 *获取鉴权信息
 */
function getAuth() {
    //本地存储中获取用户鉴权信息headParam		   
    //var login_headParam = "B9590F0F97BA0D6791A1D15C13C15B06732A6F729204E269FA051B482609FC957B9EB0060391D416D5E4C9A73BB49F270E08765459E6A535F631A3C9AFD8055294D3C509ABE4ABE4D0B8A558A59C7F5B605B00E4112A33EABBBE965BB5E390245209DF1DE84035E871665E2A98410114AEA9F3BFBB859970FCDDB5B17A99302DD29214E55F6DAC7264A15DA27AB87422";
 	//var headParam = "B9590F0F97BA0D6791A1D15C13C15B06F63E3FAC4388F02F59D97E193D195A4CF8AE1E1D9970CA516DA30E8362DE33D330DFA23D51F4C81BC4DB1B96DD1DC1127BB8DFA6A0A826FCAA15EDDC8B3223E192175FFDC5BD226F9CAE393093B6E48764CD363525D6C72C78FE2F09BD320AB3BB3446B3FE22E1C56391B873B87A9505BA0C20FDDAE1EE6324BE380DF682D234BDFBE5ACD42527A6EC5A95E96A4989F46A1BDB37E84F078C35FAD6C4A7CEB43237CE98597AD88BFD19E09611F1A20D7A";
	var headParam = "B9590F0F97BA0D679BBFDAEB98A7BCC76D98B4A22976C8BADB0BEA278CE3D4E4AB6EBB66BA313E3054D6913F5545E959D9AC719FD9C54BB441763F702B6859BC2AFD1DC61E3ED91EE6C82119D3B3E12DDD04CC3BD40ECE3633FE6C54EFB8600701C64C5748EAD49B597E82BCDE22FF89325C6E805E8F2F60A00ADAF0D887F461AC20F2D65717F64F3F5C8DFC65A50F549BF8D222F1877C41069B6D84B7CA824C3D80B5676C94CB14B7B6F09BEBDAD0014168F121DD76416309CC67B74C83507D6E71E4CCFA4340A2";
 	return headParam;
}
function isDefine(para) {
    if ( typeof para == 'undefined' || para == "" || para == null || para == undefined || para == 'undefined')
        return false;
    else
        return true;
}

/**
 * 请求公共方法
 */
/**
 *  ajaxRequest请求公共方法
 */
var type = "GET";

$.marketApi = {
    ajaxRequest : function(options) {
    	console.log("request:"+getHost() + options.url);
    	if (plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
				plus.nativeUI.alert('无网络连接!');
				return;
		}
        if (!isDefine(options.type)) {
            options.type = type;
        }
        $.ajax({
            url : getHost() + options.url,
            type : options.type,
            contentType : 'application/json',
            dataType : 'json',
            data : options.data,
            headers : {
                "auth" : getAuth()
            },
            timeout : 30000,
            success : function(data) {
                if (options.callback) {
                    options.callback(data);
                } else {
                    alert("请求出错！");
                }
            },
            error : function(xhr, errorType, error, msg) {
            	console.log("response:"+xhr.response);
                if (options.errorCallback) {
                    options.errorCallback(xhr, errorType, error, xhr.response);
                } else {
                    console.error("error:"+xhr.response)
                }
            }
        });
    }
}

/**
 * 当前时间
 */
function getCurentTime() {
    var now = new Date();
    var year = now.getFullYear();
    //年
    var month = now.getMonth() + 1;
    //月
    var day = now.getDate();
    //日
    var hh = now.getHours();
    //时
    var mm = now.getMinutes();
    //分
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10)
        clock += '0';
    clock += mm;
    return (clock);
}

function isDefine(para) {
    if ( typeof para == 'undefined' || para == "" || para == null || para == undefined || para == 'undefined')
        return false;
    else
        return true;
}
/**
 * 当前日期
 */
function getCurentDate() {
    var now = new Date();

    var year = now.getFullYear();
    //年
    var month = now.getMonth() + 1;
    //月
    var day = now.getDate();
    //日

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day;

    return (clock);
}

