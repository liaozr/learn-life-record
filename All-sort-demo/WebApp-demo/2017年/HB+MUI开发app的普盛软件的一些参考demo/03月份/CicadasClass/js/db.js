define(function(require, exports, module) {
	/*
	 * 数据库操作
	 */
	var tenant_empId = localStorage.getItem($.locStorage.emp.tenantId) + "_" + localStorage.getItem($.locStorage.emp.empId);
	//数据库对象
	var dataBase = null;
	//创建数据库    参数：数据库名  版本 描述   大小  回调方法
	exports.createDataBase = function(dbname, version, dbdesc, dbsize) {
		if(dataBase==null){
			dataBase = window.openDatabase(dbname, version, dbdesc, dbsize);
			if(dataBase) {
				console.log("数据库创建/打开成功!</br>");
			} else {
				console.log("数据库创建/打开失败！</br>");
			}
		}
		return dataBase;
	}
	
	
	
	//菜单
	exports.insertMenus = function(menuInfos,callback){
		dataBase.transaction(function(ctx, result) {
			ctx.executeSql("DROP TABLE IF EXISTS menu_tab", [], function(ctx, result) {
				console.log("删除表成功</br>");
				dataBase.transaction(function(ctx, result) {
					ctx.executeSql("CREATE TABLE IF NOT EXISTS menu_tab (id TEXT,menuIcon TEXT,menuLevel INTEGER,menuName TEXT,menuFunc TEXT,parentName TEXT,parentId TEXT)", [], function(ctx, result) {
						console.log("表创建成功 </br>");
						//插入数据
					    for (var i = 0; i < menuInfos.length; i++) {
					        //sql = "insert into menu_tab (id,menuIcon,menuLevel,menuName,menuFunc,parentName,parentId) values(?,?,?,?,?,?,?);";
						    sql = "insert into menu_tab (id,menuIcon,menuLevel,menuName,menuFunc,parentName,parentId) values('" + menuInfos[i].id + "','" + menuInfos[i].menuIcon + "','" + menuInfos[i].menuLevel + "','" + menuInfos[i].menuName + "','" + menuInfos[i].menuFunc + "','" + menuInfos[i].parentName + "','" + menuInfos[i].parentId + "');";
						    insertMenu(sql)
					    }
					    
					    setTimeout(function(){
							  callback();
						},500);
					  
					});
					
				}, 
				function(tx, error) {
					console.log('创建表失败:' + error.message + "</br>");
				});
				
			}, function(tx, error) {
				console.log('删除表失败:' + error.message + "</br>");
			});
			
			
			
		});
	}
	
	function insertMenu(sql){
		 dataBase.transaction(function(ctx) {
								ctx.executeSql(sql, [], function(ctx, result) {
									    console.log(sql);
										console.log("插入成功</br>");
									},
									function(tx, error) {
										console.log('插入失败: ' + error.message + "</br>");
									});
							});
	}
	
	//根据菜单level查询菜单 
	exports.findMenuByLevel = function(level,callback){
		dataBase.transaction(function (tx) {
            tx.executeSql("SELECT * FROM menu_tab where menuLevel = "+level, [],
                 function (tx, result) {
                 	 var menuArray = new Array();
                     for (var i = 0; i < result.rows.length; i++) {
                          console.log(result.rows.item(i)['menuName']);
                          console.log(result.rows.item(i)['menuIcon']);
                          menuArray.push(result.rows.item(i));
                     }
                    
							 callback(menuArray);
					
                     
                 },
                function (tx, error) {
					console.log('查询失败: ' + error.message + "</br>");
               });
        });
	}
	
	
	
	//根据parentId查询子级菜单
	exports.findMenuByParentName = function(parentId,callback){
		dataBase.transaction(function (tx) {
            tx.executeSql("SELECT * FROM menu_tab where parentId = "+parentId, [],
                 function (tx, result) {
                 	 var menuArray = new Array();
                     for (var i = 0; i < result.rows.length; i++) {
                          console.log(result.rows.item(i)['menuName']);
                          console.log(result.rows.item(i)['menuIcon']);
                          menuArray.push(result.rows.item(i));
                     }
                     callback(menuArray);
                 },
                function (tx, error) {
					console.log('查询失败: ' + error.message + "</br>");
               });
        });
	}
    


});