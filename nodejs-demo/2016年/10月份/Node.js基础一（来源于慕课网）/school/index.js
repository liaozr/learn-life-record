
// index 为scholl 这个项目的入口文件
// cmd 下，cd到这个school目录，然后执行 node index 这个命令即可

var klass=require("./klass")

klass.add("Scott",['白富美','高富帅'])

// 这一段的代码是将
exports.add=function(klasses){
	klasses.forEach(function(item,index){
		var _klass=item
		var teacherName=item.teacherName
		var students =item.students
	})
	klass.add(teacherName,students)
}