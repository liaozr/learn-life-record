/**
 * 格式化日期
 * @param {Date} date 时间 可选 默认为当前时间
 * @param {String} format 格式字符串 可选 默认 yyyy-MM-dd hh:mm:ss
 * */
function formatDate(date, format) {
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

export default {
	formatDate,
}