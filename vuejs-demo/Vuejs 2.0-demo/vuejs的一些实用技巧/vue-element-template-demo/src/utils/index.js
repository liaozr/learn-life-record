// 判断时间过去多久
export function formatTime(time, option) {
   time = +time * 1000;
   const d = new Date(time);
   const now = Date.now();

   const diff = (now - d) / 1000;

   if (diff < 30) {
     return '刚刚'
   } else if (diff < 3600) { // less 1 hour
     return Math.ceil(diff / 60) + '分钟前'
   } else if (diff < 3600 * 24) {
     return Math.ceil(diff / 3600) + '小时前'
   } else if (diff < 3600 * 24 * 2) {
     return '1天前'
   }
   if (option) {
     return parseTime(time, option)
   } else {
     return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
   }
}

export function formatDate(date, format) {
	var paddNum = function(num) {
		num += "";
		return num.replace(/^(\d)$/, "0$1");
	}
	date || (date = new Date())
	//指定格式字符
	var cfg = {
		yyyy: date.getFullYear(), //年 : 4位
		yy: date.getFullYear().toString().substring(2), //年 : 2位
		M: date.getMonth() + 1, //月 : 如果1位的时候不补0
		MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
		d: date.getDate(), //日 : 如果1位的时候不补0
		dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
		hh: paddNum(date.getHours()), //时
		mm: paddNum(date.getMinutes()), //分
		ss: paddNum(date.getSeconds()), //秒
	}

	format || (format = "yyyy-MM-dd hh:mm:ss");
	return format.replace(/([a-z])(\1)*/ig, function(m) {
		return cfg[m];
	});
}

export function repeat(arr) {
	//遍历arr中每个元素，同时声明hash
	for (var i = 0, hash = {}; i < arr.length; i++) {
			//hash中是否包含当前元素值的建
			//如果不包含,就hash添加一个新元素，以当前元素值为key，value默认为1
			if (hash[arr[i]] === undefined) {
					hash[arr[i]] = 1;
			}
	} //(遍历结束)
	//将hash转为索引:
	var i = 0;
	var arr2 = [];
	for (arr2[i++] in hash);
	console.log(arr2);
	return arr2;
}

