import 'babel-polyfill'
import '../styles/main.scss'
import '../styles/test.scss'

import { trim } from './text'

var bb='liaozhongren  '

if(trim(bb) == 'liaozhongren'){
	console.log('yes')
}else{
	console.log('no')
}