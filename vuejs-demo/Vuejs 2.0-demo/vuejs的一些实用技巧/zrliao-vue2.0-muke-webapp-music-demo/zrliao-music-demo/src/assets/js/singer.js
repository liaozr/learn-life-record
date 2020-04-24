export default class Singer{
    constructor ( {id,name} ){
        this.id=id
        this.name=name
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    }
}

//   上面代码首先用class定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，

//   而this关键字则代表实例对象。简单地说，constructor内定义的方法和属性是实例对象自己的，

//   而constructor外定义的方法和属性则是所有实例对象可以共享的。


// class Animal{
//     constructor(name){
//         this.name = name;
//     }

//     sayName(){
//         return this.name;
//     }
// }


// const animal = new Animal('dog');

// console.log(animal.sayName());  // 'dog'
        
// 其内部的constructor：指向的就是整个类的constructor

// 其内部的函数：这些函数的定义在类的原型上面

