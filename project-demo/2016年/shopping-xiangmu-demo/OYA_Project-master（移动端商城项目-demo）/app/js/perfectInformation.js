$(document).ready(function(){
//取省的datalist
				var $sheng = $("#sheng");
//取省的input
				var $inputSheng = $(".sheng");
				var $shi = $("#shi");
				var $inputShi = $(".shi");
				var $qu = $("#qu");
				var $inputQu = $(".qu");
				$.getJSON("../json/country.json",function(res){
					$.each(res, function(idx,item) {
						$.each(item, function(idx,sheng) {
//添加省option
							var $option = $("<option/>");
							$option.attr({value:sheng.name}).html(sheng.name).appendTo($sheng);							
//省失去焦点则创建关联市							
							$(".sheng").on("blur",function(){
								var checkSheng=$(".sheng").val();
								if(sheng.name==checkSheng){
									$.each(sheng.regions, function(idx,shi) {
										var $option = $("<option/>");
										$option.attr({value:shi.name}).html(shi.name).appendTo($shi); 
//市失去焦点则创建关联区										
										$(".shi").on("blur",function(){
											var checkShi=$(".shi").val();	
											if(shi.name==checkShi){
												$.each(shi.regions, function(idx,qu) {
													var $option = $("<option/>");
													$option.attr({value:qu.name}).html(qu.name).appendTo($qu); 
												});
											}
										})
									});	
								}		 
							});
						});
					});	
				});
//重新选择省将值清空，市和区datalist子元素清空				
				$inputSheng.on("tap",function(){
					$(this).val("");
					$inputShi.val("");
					$inputQu.val("");
					$shi.empty();
					$qu.empty();
				})
				$inputShi.on("tap",function(){
					$(this).val("");
					$inputQu.val("");
					$qu.empty();
				})
				$inputQu.on("tap",function(){
					$(this).val("");
				})
				
				var $Nickname = $("#nickname");
				var $Phone = $("#phone");
				var $Tijiao = $(".tijiao");
				var $FullAddres = $(".fullAddres");
				
		 		$Phone.on("blur",function(){
		 			var pattern = /^[1][358][0-9]{9}$/;
		 			if($Phone.val()==""){
		 				$Phone.attr("placeholder","这是必填字段");
		 			}else if(!pattern.test($Phone.val())){
		 				$Phone.attr("placeholder","请正确填写您的手机号码");
		 				$Phone.val("");
		 			}
		 		})
				
				
				
				$Tijiao.on("tap",function(){
					 var nickval = $Nickname.val();
					 var phoneval = $Phone.val();
					 var shengval = $inputSheng.val();
					 var shival = $inputShi.val();
					 var quval = $inputQu.val();
					 var fullval = $FullAddres.val();
				})
				
				
				
				
			})