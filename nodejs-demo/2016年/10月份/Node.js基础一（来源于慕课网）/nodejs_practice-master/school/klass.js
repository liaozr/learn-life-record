var teacher = require('./teacher.js');
var student = require('./student.js');

function add(teacherName,students) {
	 teacher.add(teacherName);
	 students.forEach( function(element, index) {
	 	student.add(element);
	 });
}

exports.add = add;
// module.add = add;