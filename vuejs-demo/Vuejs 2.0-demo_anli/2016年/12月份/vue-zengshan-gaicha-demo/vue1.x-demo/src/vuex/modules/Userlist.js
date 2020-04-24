
import { SHOW_USER_INFO } from '../mutation-types' 
import { DELETE_USER_LIST } from '../mutation-types' 
import { EDIT_USER_LIST } from '../mutation-types'
import { UPDATE_USER_LIST } from '../mutation-types'
import { ADD_USER } from '../mutation-types'
import { ADD_SAVE_USER} from '../mutation-types' 
import { EDIT_SAVE_USER} from '../mutation-types' 
import { CLOSE_USER} from '../mutation-types' 

// 该模块的初始状态 
const state = { 
	user:[
	  // {
	  //  id:1,
   //     name:'路飞',
   //     age:24,
   //     tel:15627215943
	  // },
	  // {
	  //  id:2,
   //     name:'剑豪鹰眼',
   //     age:25,
   //     tel:13467215943
	  // },
	  // {
	  //  id:3,
   //     name:'剑豪索罗',
   //     age:23,
   //     tel:13427215943
	  // },
	  // {
	  //  id:4,
   //     name:'香吉士',
   //     age:22,
   //     tel:15527215943
	  // },
	  // {
	  //  id:5,
   //     name:'zrliao',
   //     age:26,
   //     tel:15627215945
	  // }
    ],
    curEdituser:{
       
    }
} 


// 相关的 mutations
const mutations = {
	[SHOW_USER_INFO] (state, id) { 
		
		state.activeOrder = state.orders.find(function(ele) { //ele是 state.orders这个数组的每个数组成员
	    // ele.id则代表的是state.orders这个数组里面的各个成员（元素）的id值
		 return ele.id == id;   //在Order.vue组件里把actions showDetail(order.id) 传过来
		 // 返回值若为true的话，则代表的是 把Order这个组件里当前点击的这个数组成员 赋值给 state.activeOrder,
		 // 这样，state.activeOrder的值就是 组件Order当前点击的这个这个数组元素
		}); 
	},
	[DELETE_USER_LIST] (state,user_item){
      state.user.$remove(user_item)
	},
	[EDIT_USER_LIST] (state,editUser){
		state.curEdituser =''
        state.curEdituser = editUser
 	},

	[UPDATE_USER_LIST] (state,editname,editage,edittel){
        var newAdduser={
		   id:'',
	       name:editname,
	       age:editage,
	       tel:edittel,
		}
		newAdduser.id=state.curEdituser.id
		console.log(newAdduser.id)
		state.curEdituser=newAdduser
	},
	[ADD_USER] (state){
		var userLength=state.user.length +1
		var newAdduser={
		   id:userLength,
	       name:'',
	       age:'',
	       tel:''
		}
       state.curEdituser=newAdduser
	},
	[ADD_SAVE_USER] (state){
		if(state.curEdituser.name =='')
		{
            state.curEdituser=''
		}
		else{
           state.user.push(state.curEdituser)
           state.curEdituser=''
		}
	},
	[EDIT_SAVE_USER] (state){
        for( var i=0;i<state.user.length;i++)
		{
			if( state.user[i].id == state.curEdituser.id )
			{

				console.log(state.user[i])
				state.user[i]=state.curEdituser
			}
			 
		}
	},
	[CLOSE_USER] (state) {

	}
} 

// state.orders.find()是 ES6的数组语法
// 数组实例的find()：用于找出第一个符合条件的数组成员。
// 它的参数是一个回调函数，所有数组成员依次执行该回调函数，

// 直到找出第一个返回值为true的成员，然后返回该成员。（！！！这句话是个重点）
// 直到找出第一个返回值为true的成员，然后返回该成员。（！！！这句话是个重点）

// 如果没有符合条件的成员，则返回undefined。

export default { 
	state, 
	mutations 
}


