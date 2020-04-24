var student=require('./student')
var teacher=require('./teacher')

function add (teacherName,students)
{
	teacher.add(teacherName)
	students.forEach(function(item,index){
		student.add(item)
	})
}

exports.add=add


// 刚开始怀疑为什么Scott老师把class误写成klass，
// 然后自己测试用class因为是保留字会报错。。

// 命名不能用保留字class！有套路！

// class是关键字 命名的时候  要学会避免

// ---------------------------------------------------------------------------------------

// module.exports是支持存在的东西 是特写的对象类型

// exports是module.exports的幅度方法 

// module.exports是给调用着  exports上挂着属性和方法  

// 最后再把属性方法给module.exports 如果module.exports已经有熟悉方法的话  exports就会被忽略

// 如果你想让你的模块成为特别的对象类型 使用module.exports

// 如果你想让你的模块成为传统的的实例使用  exports

// 推荐用 exports 这种方式的

// module.exports=add