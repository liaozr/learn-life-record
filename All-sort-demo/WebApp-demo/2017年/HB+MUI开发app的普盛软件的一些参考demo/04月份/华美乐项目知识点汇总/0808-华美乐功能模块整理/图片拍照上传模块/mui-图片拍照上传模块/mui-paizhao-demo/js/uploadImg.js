function getImage(){
			var cmr = plus.camera.getCamera();
			cmr.captureImage(function(p){
				plus.io.resolveLocalFileSystemURL(p, function(entry){
					reduceImg(entry.toLocalURL(),function(result){
						pushImg(result);
					});
				}, function(e){
					outLine('读取拍照文件错误：'+e.message);
				});
			}, function(e){
				outLine('失败：'+e.message);
			}, {filename:'_doc/camera/',index:1});
		}
		
		function reduceImg(path,callback) {
			console.log(path);
			var img = new Image();
			img.src = path; // 传过来的图片路径在这里用。
			img.onload = function() {
                var that = this;
                var quity=0.4;

                //生成比例
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w = 500;
                h = w / scale;

                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                $(canvas).attr({
                    width: w,
                    height: h
                });
                ctx.drawImage(that, 0, 0, w, h);

                /**
                 * 生成base64
                 * 兼容修复移动设备需要引入mobileBUGFix.js
                 */
                var base64 = canvas.toDataURL('image/jpeg', quity);

                // 修复IOS

                // 生成结果
                var result = {
                    base64: base64,
                    clearBase64: base64.substr(base64.indexOf(',') + 1)
                };
                
                callback(result);
            };
			
		}
		
		function plusReady(){
			if(mui.os.ios){
				$(a1).removeAttr("href");
				$(a1).on("tap",function(){
					uploadphoto.click();
				});
			}
		}
		
		document.addEventListener("plusready", plusReady, false);