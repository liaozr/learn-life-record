/*var pet = {
	words:'...',
	speak:function(){
		console.log(this.words);
		console.log(this===pet);
	}
}

pet.speak();*/

/*function pet(words){
	this.words = words;
	console.log(this.words);
	// console.log(this);
	console.log(this===global);
}

pet('...'); */ //相当于global.pet('...'),所以this等于global

function pet(words){
	this.words = words;
	this.speak = function(){
		console.log(this.words);
		console.log(this);
		// console.log(this===cat);//true
	}
}

var cat = new pet('miao~');
cat.speak();  //this指向cat