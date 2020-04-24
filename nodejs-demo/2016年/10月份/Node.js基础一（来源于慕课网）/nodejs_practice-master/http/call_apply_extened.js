function Pet(words){
	this.words = words;
	this.speak = function(){
		console.log(this.words);
	}
}

function Dog(words){
	Pet.call(this,words); //类似于多态
}

var dog = new Dog('wangwang!!!');
dog.speak();

var pet = new Pet('pet!!');
pet.speak();