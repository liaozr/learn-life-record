;
document.addEventListener("DOMContentLoaded", function() {

	function CreateXHR() {
		if(window.XMLHttpRequest) { //支持ie7+  ,ff,谷歌浏览器...
			return new XMLHttpRequest();
		}
		return new ActiveXObject("Microsoft.XMLHTTP"); //支持ie6

	};

    //创建一个xhr对象
	var xhr = CreateXHR();
    
    //调用open方法，使用同步操作
	xhr.open("GET", "../json/my_vault.json", true);
    
    //调用send方法，发送同步请求
	xhr.send(null);

    //状态改变事件
	xhr.onreadystatechange = function() {

        //请求成功
		if(xhr.readyState == 4 && xhr.status == 200) {
            
            //讲String转换成JSON对象
			var item = JSON.parse(xhr.responseText);
           
           //获取列表框
			var room = document.querySelector(".storeroom");
           
			var cont = document.createElement("ul");
            
            //请求加载的次数
			for(var j = 1; j < 10; j++) {
				
				//遍历数组,并添加到列表框room
				for(var i = 0; i < item.length; i++) {

					var ele = item[i];

					var list = document.createElement("li");

					//收入/支出
					var income = document.createElement("span");
					income.innerHTML = ele.income;
					list.appendChild(income);

					//结余
					var surplus = document.createElement("span");
					surplus.innerHTML = ele.surplus;
					list.appendChild(surplus);

					//备注
					var remark = document.createElement("span");
					remark.innerHTML = ele.remark;
					list.appendChild(remark);

					//时间
					var timer = document.createElement("span");
					timer.innerHTML = ele.time;
					list.appendChild(timer);

					cont.appendChild(list);

				};
			};

			room.appendChild(cont);

		};

	};

});