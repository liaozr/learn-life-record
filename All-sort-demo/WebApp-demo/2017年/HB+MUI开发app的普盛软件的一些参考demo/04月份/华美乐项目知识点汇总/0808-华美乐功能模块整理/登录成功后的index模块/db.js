define(function(require, exports, module) {
    var loginEmpId = localStorage.tenantId + "_" + localStorage.empId;
    /*
     * 数据库操作
     */

    //数据库对象
    var dataBase = null;
    //创建数据库    参数：数据库名  版本 描述   大小  回调方法
    exports.createDataBase = function(dbname, version, dbdesc, dbsize) {
        if (dataBase == null) {
            dataBase = window.openDatabase(dbname, version, dbdesc, dbsize, function() {});
            if (dataBase) {
                console.log("数据库创建/打开成功!</br>");
            } else {
                console.log("数据库创建/打开失败！</br>");
            }
        }
        return dataBase;
    }


    var menuLength = 0;
    //菜单
    exports.insertMenus = function(menuInfos, callback) {
        menuLength = menuInfos.length;
        console.log("menuLength==============================" + menuLength);
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
                                insertMenu(sql, i, callback)
                            }

                            /*setTimeout(function(){
							  callback();
						},800);*/

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

    function insertMenu(sql, index, callback) {
        dataBase.transaction(function(ctx) {
            ctx.executeSql(sql, [], function(ctx, result) {
                    console.log("index================================" + index);
                    console.log(sql);
                    console.log("插入成功</br>");

                    if (menuLength - 1 == index) {
                        callback();
                    }
                },
                function(tx, error) {
                    console.log('插入失败: ' + error.message + "</br>");

                    if (menuLength - 1 == index) {
                        callback();
                    }
                });
        });
    }

    //根据菜单level查询菜单
    exports.findMenuByLevel = function(level, callback) {
        dataBase.transaction(function(tx) {
            tx.executeSql("SELECT * FROM menu_tab where menuLevel = " + level, [],
                function(tx, result) {
                    var menuArray = new Array();
                    for (var i = 0; i < result.rows.length; i++) {
                        console.log(result.rows.item(i)['menuName']);
                        console.log(result.rows.item(i)['menuIcon']);
                        menuArray.push(result.rows.item(i));
                    }

                    callback(menuArray);

                },
                function(tx, error) {
                    console.log('查询失败: ' + error.message + "</br>");
                });
        });
    }



    //根据parentId查询子级菜单
    exports.findMenuByParentName = function(parentId, callback) {
        dataBase.transaction(function(tx) {
            tx.executeSql("SELECT * FROM menu_tab where parentId = " + parentId, [],
                function(tx, result) {
                    var menuArray = new Array();
                    for (var i = 0; i < result.rows.length; i++) {
                        console.log(result.rows.item(i)['menuName']);
                        console.log(result.rows.item(i)['menuIcon']);
                        menuArray.push(result.rows.item(i));
                    }
                    callback(menuArray);
                },
                function(tx, error) {
                    console.log('查询失败: ' + error.message + "</br>");
                });
        });
    }


    //根据parentId查询子级菜单
    exports.findMenuByParentName_fx = function(options) {
        dataBase.transaction(function(tx) {
            console.log("options.id:" + options.id)
            tx.executeSql("SELECT * FROM menu_tab where parentId = " + options.id, [],
                function(tx, result) {
                    var menuArray = new Array();
                    for (var i = 0; i < result.rows.length; i++) {
                        console.log(result.rows.item(i)['menuName']);
                        console.log(result.rows.item(i)['menuIcon']);
                        menuArray.push(result.rows.item(i));
                    }
                    options.callback(menuArray);
                },
                function(tx, error) {
                    console.log('查询失败: ' + error.message + "</br>");
                });
        });
    }

    /*
     * 本地图片管理  image_table {key,image_path}
     * 将要上传的图片存储到本地数据库，图片上传后根据key判断是否上传成功，true-删除数据库数据和本地上传到服务器的文件
     */
    var IMAGE_UPLOAD = "image_table";
    var IMAGE_UPLOAD_SQL = "create table IF NOT EXISTS " + IMAGE_UPLOAD + " (key varchar(1000),image_path varchar(1000))";
    exports.insertImageTable = function(key, path, callback) {
        dataBase.transaction(function(tx) {
            tx.executeSql(IMAGE_UPLOAD_SQL, [], function(ctx, result) {
                console.log("表创建成功 </br>");
                var sql = "insert into " + IMAGE_UPLOAD + " (key,image_path) values('" + key + "','" + path + "');";
                ctx.executeSql(sql, [], function(ctx, result) {
                        console.log(sql);
                        console.log("插入成功</br>");
                        callback(path);
                    },
                    function(tx, error) {
                        console.log('插入失败: ' + error.message + "</br>");
                    });

            }, function(tx, error) {
                console.log('创建表失败:' + error.message + "</br>");
            });
        });
    }

    exports.deleteImageTable = function(key) {
        dataBase.transaction(function(tx) {
            tx.executeSql("DELETE FROM image_table WHERE key = ?", [key],
                function(tx, result) {
                    console.log('删除数据成功');
                },
                function(tx, error) {
                    console.log('删除数据失败:' + error.message + "</br>");
                }
            );
        });

    }

    exports.findImagePathByKey = function(key, callback) {
        dataBase.transaction(function(tx) {
            console.log("key:" + key)
            tx.executeSql("SELECT * FROM image_table where key = ?", [key],
                function(tx, result) {
                    var image_path = result.rows.item(0)['image_path'];
                    console.log("image_path:" + image_path);
                    callback(image_path);

                },
                function(tx, error) {
                    console.log('查询失败: ' + error.message + "</br>");
                });
        });
    }

    exports.findAllImage = function(callback) {
        dataBase.transaction(function(tx) {
            tx.executeSql("SELECT * FROM image_table", [],
                function(tx, result) {
                    var imageArray = new Array();
                    for (var i = 0; i < result.rows.length; i++) {
                        console.log(result.rows.item(i)['key']);
                        console.log(result.rows.item(i)['image_path']);
                        imageArray.push(result.rows.item(i));
                    }
                    callback(imageArray);

                },
                function(tx, error) {
                    console.log('查询失败: ' + error.message + "</br>");
                });
        });
    }

    /*
     * 暂存数据管理
     * 检查：id  Comtype task sitesTask  check photo historyAccept content loginEmpId
     * 验收： id isException task sitesTask check photo historyAccept content loginEmpId
     * 测量：id  Comtype task sitesTask  goodsList photo jzDate   content  loginEmpId
     * 安装: id Comtype task sitesTask goodsList photo  isGrade content loginEmpId reviewDesc review   jzDate  isFinish
     *
     */

    var TS_TAB = "ts_table";
    var CREATE_TS_TAB_SQL = "create table IF NOT EXISTS " + TS_TAB + "(tmp1 TEXT PRIMARY KEY,tmp2 TEXT,tmp3 TEXT,tmp4 TEXT,tmp5 TEXT,tmp6 TEXT,tmp7 TEXT,tmp8 TEXT,tmp9 TEXT,tmp10 TEXT,tmp11 TEXT,tmp12 TEXT,tmp13 TEXT);";
    exports.insertTsTable = function(obj, type, callback) {
        dataBase.transaction(function(tx) {
            console.log("===========================" + CREATE_TS_TAB_SQL);

            tx.executeSql(CREATE_TS_TAB_SQL, [], function(ctx, result) {
                console.log("表创建成功 </br>");
                var sql;
                var temp = "";
                if (type == 'JC') {
                    sql = "replace into " + TS_TAB + " (tmp1,tmp2,tmp3,tmp4,tmp5,tmp6,tmp7,tmp8,tmp9,tmp10,tmp11,tmp12,tmp13) " +
                        "values('" + obj.id + "','" + obj.Comtype + "','" + obj.task + "','" + obj.sitesTask + "','" + obj.check + "','" + obj.photo + "','" + obj.historyAccept + "','" + obj.content + "','" + loginEmpId + "','','','','');";
                } else if (type == 'YS') {
                    sql = "replace into " + TS_TAB + " (tmp1,tmp2,tmp3,tmp4,tmp5,tmp6,tmp7,tmp8,tmp9,tmp10,tmp11,tmp12,tmp13) " +
                        "values('" + obj.id + "','" + obj.isException + "','" + obj.task + "','" + obj.sitesTask + "','" + obj.check + "','" + obj.photo + "','" + obj.historyAccept + "','" + obj.content + "','" + loginEmpId + "','','','','');";
                } else if (type == 'CL') {
                    sql = "replace into " + TS_TAB + " (tmp1,tmp2,tmp3,tmp4,tmp5,tmp6,tmp7,tmp8,tmp9,tmp10,tmp11,tmp12,tmp13) " +
                        "values('" + obj.id + "','" + obj.Comtype + "','" + obj.task + "','" + obj.sitesTask + "','" + obj.goodsList + "','" + obj.photo + "','" + obj.jzDate + "','" + obj.content + "','" + loginEmpId + "','','','','');";

                } else if (type == 'AZ') {
                    sql = "replace into " + TS_TAB + " (tmp1,tmp2,tmp3,tmp4,tmp5,tmp6,tmp7,tmp8,tmp9,tmp10,tmp11,tmp12,tmp13) " +
                        "values('" + obj.id + "','" + obj.Comtype + "','" + obj.task + "','" + obj.sitesTask + "','" + obj.goodsList + "','" + obj.photo + "','" + obj.isGrade + "','" + obj.content + "','" + loginEmpId + "','" + obj.reviewDesc + "','" + obj.review + "','" + obj.jzDate + "','" + obj.isFinish + "');";

                } else if (type == 'WLPZ') {
                    sql = "replace into " + TS_TAB + " (tmp1,tmp2,tmp3,tmp4,tmp5,tmp6,tmp7,tmp8,tmp9,tmp10,tmp11,tmp12,tmp13) " +
                        "values('" + obj.id + "','" + obj.dataArr + "','','','','','','','" + loginEmpId + "','','','','');";
                } else if (type == 'XCFK') { //现场反馈
                    sql = "replace into " + TS_TAB + " (tmp1,tmp2,tmp3,tmp4,tmp5,tmp6,tmp7,tmp8,tmp9,tmp10,tmp11,tmp12,tmp13) " +
                        "values('" + obj.id + "','" + obj.type + "','" + obj.typeName + "','" + obj.content + "','" + obj.photo + "','" + obj.longitude + "','" + obj.latitude + "','" + obj.locate_type + "','" + loginEmpId + "','" + obj.locate_add + "','','','');";
                }

                ctx.executeSql(sql, [], function(ctx, result) {
                        console.log(sql);
                        console.log("插入成功</br>");
                        callback();
                    },
                    function(tx, error) {
                        console.log('插入失败: ' + error.message + "</br>");
                    });

            }, function(tx, error) {
                console.log(JSON.stringify(tx));
                console.log(JSON.stringify(error));
                console.log('创建表失败:' + error.message + "</br>");
            });
        });
    }




    exports.findAllTs = function(callback) {
        dataBase.transaction(function(tx) {
            tx.executeSql("SELECT * FROM ts_table where tmp9 = ?", [loginEmpId],
                function(tx, result) {
                    var TSArray = new Array();
                    for (var i = 0; i < result.rows.length; i++) {

                        console.log(result.rows.item(i)['tmp1']);
                        console.log(result.rows.item(i)['tmp2']);
                        console.log(result.rows.item(i)['tmp3']);
                        console.log(result.rows.item(i)['tmp4']);
                        console.log(result.rows.item(i)['tmp5']);
                        console.log(result.rows.item(i)['tmp6']);
                        console.log(result.rows.item(i)['tmp7']);
                        console.log(result.rows.item(i)['tmp8']);
                        console.log(result.rows.item(i)['tmp9']);
                        console.log(result.rows.item(i)['tmp10']);
                        console.log(result.rows.item(i)['tmp11']);
                        console.log(result.rows.item(i)['tmp12']);
                        console.log(result.rows.item(i)['tmp13']);
                        TSArray.push(result.rows.item(i));
                    }
                    callback(TSArray);

                },
                function(tx, error) {
                    console.log('查询失败: ' + error.message + "</br>");
                });
        });
    }

    exports.findTSById = function(id, callback) {
        dataBase.transaction(function(tx) {
            tx.executeSql("SELECT * FROM ts_table where tmp9 = ? and tmp1 = ?", [loginEmpId, id],
                function(tx, result) {
                    var TSArray = new Array();
                    for (var i = 0; i < result.rows.length; i++) {

                        console.log(result.rows.item(i)['tmp1']);
                        console.log(result.rows.item(i)['tmp2']);
                        console.log(result.rows.item(i)['tmp3']);
                        console.log(result.rows.item(i)['tmp4']);
                        console.log(result.rows.item(i)['tmp5']);
                        console.log(result.rows.item(i)['tmp6']);
                        console.log(result.rows.item(i)['tmp7']);
                        console.log(result.rows.item(i)['tmp8']);
                        console.log(result.rows.item(i)['tmp9']);
                        console.log(result.rows.item(i)['tmp10']);
                        console.log(result.rows.item(i)['tmp11']);
                        console.log(result.rows.item(i)['tmp12']);
                        console.log(result.rows.item(i)['tmp13']);
                        TSArray.push(result.rows.item(i));
                    }
                    callback(TSArray);

                },
                function(tx, error) {
                    console.log('查询失败: ' + error.message + "</br>");
                    callback();
                });
        });
    }


    exports.deleteTSByTaskId = function(id) {
        dataBase.transaction(function(tx) {
            tx.executeSql("DELETE FROM ts_table WHERE tmp1 = ?", [id],
                function(tx, result) {
                    console.log('删除数据成功');
                },
                function(tx, error) {
                    console.log('删除数据失败:' + error.message + "</br>");
                }
            );
        });

    }

});
