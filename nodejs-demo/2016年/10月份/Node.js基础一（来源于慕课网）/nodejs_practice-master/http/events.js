//添加监听
var EventEmitter = require('events').EventEmitter;
var instance = new EventEmitter();
//默认一个事件的最大监听数为10,
//设置监听最大数
// instance.setMaxListeners(num);

instance.on('event',function(who){
	console.log(who+' eatting');
})
instance.on('event',function(who){
	console.log(who+' sleepping');
})
instance.on('event',function(who){
	console.log(who+' playing');
})
instance.on('event',function(who){
	console.log(who+' dadoudou');
})
instance.on('event',water)
function water(who){
	console.log(who+' watering');
}
//触发监听事件
var hasListener1 = instance.emit('event','i am');
var hasListener2 = instance.emit('e2','haha');
//查看是否被监听
console.log(hasListener1);
console.log(hasListener2);
//查看被监听事件的个数
console.log(instance.listeners('event').length);
console.log(EventEmitter.listenerCount(instance,'event'));
//删除监听
console.log('------------删除water监听事件------------');
instance.removeListener('event',water);
instance.emit('event','my')
console.log('--------删除所有的监听事件------------');
instance.removeAllListeners();
console.log(instance.listeners('event').length);

