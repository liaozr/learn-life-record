import 'babel-polyfill'
import '../styles/main.scss'
// import '../styles/test.scss'  // 此种方式引入进去的css样式，经测试，并不会实时更新修改的样式

import { bb } from './text'

import { trim } from './text'

function log(x, y = 'World') {
  console.log(`${x}, ${y}`);
  return { x, y };
}

log('Hello');
log('Hello', 'China');
log('Hello', '');
log('VINCENT', '');

function es6(){
	let a=123;
	console.log(a)
}

es6()

console.log(bb)

var aa='zrliao   '

var cc=trim(aa)

if( cc == 'zrliao'){
	console.log('yes')
} 

console.log(trim(aa) ) 



