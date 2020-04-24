   function getBaseServerUrl() {
   	return "http://" + localStorage.ipstr + "/eidpws";
   }

   function getBaseImgUrl() {
   	return "http://" + localStorage.ipstr;
   }


   // function getBaseServerUrl() {
   //    return "http://192.168.1.145:900/eidpws";
   // }

   // function getBaseImgUrl() {
   //    return "http://192.168.1.145:900";
   // }

   function getBaseServerUrl1() {
   	return "http://103.236.252.138:900/eidpws";
   }

   function getBaseImgUrl1() {
   	return "http://103.236.252.138:900/";
   }

   function isEmpty(str) {
   	if(str == "" || str == null || str == undefined || str == "undefined") {
   		return true;
   	}
   	return false;
   }

   //计算天数差的函数，通用  
   function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
   	// var aDate, oDate1, oDate2, iDays
   	var aDate = '';
   	var oDate1 = '';
   	var oDate2 = '';
   	var iDays = '';
   	if(isDefine(sDate1) && isDefine(sDate2)) {
   		var aDate = sDate1.split("-");
   		oDate1 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]); //转换为12-18-2006格式  
   		aDate = sDate2.split("-");
   		oDate2 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
   		iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
   		return iDays;
   	} else {
   		return 0;
   	}

   }

   function formatStr(str) {
   	if(str.length == 1) {
   		return "0" + str;
   	}
   	return str;
   }

   function isDefine(para) {
   	if(typeof para == 'undefined' || para == "" || para == null || para == undefined || para == 'undefined')
   		return false;
   	else
   		return true;
   }
   // /upload/humello/img/1501058461100Z.jpg -> /upload/humello/img/1501058461100Z_thumb.jpg
   function getThumbImg(path){
	   	var thumbImg="";
	   	if(isDefine(path) && path.indexOf('.')!=-1){
	   		var tmpArr = path.split('.');
	   		thumbImg += tmpArr[0]+"_thumb.";
	   		thumbImg +=tmpArr[1];
	   	}
   		return thumbImg;
   }
  
   function getCurentDate() {
   	var now = new Date();
   	var year = now.getFullYear();
   	//年
   	var month = now.getMonth() + 1;
   	//月
   	var day = now.getDate();
   	//日

   	var clock = year + "-";
   	if(month < 10)
   		clock += "0";
   	clock += month + "-";
   	if(day < 10)
   		clock += "0";
   	clock += day;
   	return(clock);
   }

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
   	if(month < 10)
   		clock += "0";
   	clock += month + "-";
   	if(day < 10)
   		clock += "0";
   	clock += day + " ";
   	if(hh < 10)
   		clock += "0";
   	clock += hh + ":";
   	if(mm < 10)
   		clock += '0';
   	clock += mm;
   	return(clock);
   }

   function Encrypt(word) {
   	var key = CryptoJS.enc.Utf8.parse("cn.posun.www.aes");
   	var srcs = CryptoJS.enc.Utf8.parse(word);
   	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
   		mode: CryptoJS.mode.ECB,
   		padding: CryptoJS.pad.Pkcs7
   	});
   	return encrypted.toString();
   }

   function Decrypt(word) {
   	var key = CryptoJS.enc.Utf8.parse("cn.posun.www.aes"); //abcdefgabcdefg12
   	var decrypt = CryptoJS.AES.decrypt(word, key, {
   		mode: CryptoJS.mode.ECB,
   		padding: CryptoJS.pad.Pkcs7
   	});
   	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
   }

   function bytes2Hex(arr) {
   	var str = "";
   	for(var i = 0; i < arr.length; i++) {
   		var tmp = arr[i].toString(16);
   		if(tmp.length == 1) {
   			tmp = "0" + tmp;
   		}
   		str += tmp;
   	}
   	return str;
   }