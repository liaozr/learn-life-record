var pet = {
	words:'...',
	speak:function(say){
		console.log(say+'--'+this.words);
	}
}

// pet.speak('speak');

var dog = {
	words:'wangwang~'
}

pet.speak.call(dog,'speak');