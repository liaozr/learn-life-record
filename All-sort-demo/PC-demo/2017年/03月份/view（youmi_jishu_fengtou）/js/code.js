var verificationCode={
		nodes:["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z",
		"x","c","v","b","n","m","1","2","3","4","5","6","7","8","9","0","Q","W","E","R","T","Y",
		"U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"],
		init:function($ele){
			for(var i=0;i<$ele.length;i++){
			$ele[i].innerHTML=this.nodes[Math.floor(Math.random()*62)];
			$ele[i].style.color="#"+(Math.random()*0xffffff<<0).toString(16) ;
			}
		
		}
	}