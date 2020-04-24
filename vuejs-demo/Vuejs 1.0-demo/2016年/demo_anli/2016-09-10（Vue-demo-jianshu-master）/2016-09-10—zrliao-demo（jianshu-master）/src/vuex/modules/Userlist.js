
import { SHOW_USER_INFO } from '../mutation-types' 
import { DELETE_USER_LIST } from '../mutation-types' 
import { EDIT_USER_LIST } from '../mutation-types'
import { UPDATE_USER_LIST } from '../mutation-types'
import { ADD_USER } from '../mutation-types'
import { ADD_SAVE_USER} from '../mutation-types' 
import { EDIT_SAVE_USER} from '../mutation-types' 
import { CLOSE_USER} from '../mutation-types' 
import { GETSTARTLIST} from '../mutation-types' 
import { GETTERSLISTS} from '../mutation-types' 

// 该模块的初始状态 
const state = {
	navlist:[
	  {
         type:'hot',
         title:'热门'          
	  },
    {
         type:'new',
         title:'新上榜'
	  },
	  {
         type:'day',
         title:'日报'
	  },
	  {
         type:'hotseven',
         title:'七日热门'
	  },
	  {
         type:'hotmonth',
         title:'三十日热门'
	  },
	  {
         type:'jiang',
         title:'有奖活动'
	  },
	  {
         type:'chuban',
         title:'简书出版'
	  },
	  {
         type:'boke',
         title:'简书播客'
	  },
	    {
         type:'rewen',
         title:'时事热闻'
	  },
	  {
         type:'jingxuan',
         title:'专题精选'
	  }
	],
	hot:[
	  {
       type:'hot',
	     id:1,
       name:'阿俊',
       time:'大约6小时之前',
       title:'我不是学霸，只是比你努力一点而已2333333',
       readnum:3398,
       pinglun:258,
       like:232,
       dashang:68,
       imgbg:require('../../assets/images/bonus_3.jpg')
	  },
	  {
	   id:2,
       name:'阿俊2',
       time:'大约5小时之前',
       title:'Learn by doing222222',
       readnum:3398,
       pinglun:258,
       like:232,
       dashang:168,
       imgbg:require('../../assets/images/bonus_3.jpg')
	  },
	  {
	   id:3,
       name:'阿俊3',
       time:'大约4小时之前',
       title:'Learn by doing33333',
       readnum:398,
       pinglun:58,
       like:32,
       dashang:8,
       imgbg:require('../../assets/images/bonus_3.jpg')
	  }    
    ],
    new:[
	  {
	     type:'new',
       id:1,
       name:'阿俊0000',
       time:'大约6小时之前',
       title:'爱美的女生们，六款超高性价比的变美神器你都有了吗new？',
       readnum:3398,
       pinglun:258,
       like:232,
       dashang:68,
      imgbg:require('../../assets/images/vue-demo-new.jpg')
	  },
	  {
	   id:2,
       name:'阿俊2111',
       time:'大约5小时之前',
       title:'Learn by',
       readnum:3398,
       pinglun:258,
       like:232,
       dashang:168,
        imgbg:require('../../assets/images/vue-demo-new.jpg')
	  },
	  {
	   id:3,
       name:'阿俊33333',
       time:'大约4小时之前',
       title:'Learn 233333333333',
       readnum:398,
       pinglun:58,
       like:32,
       dashang:8,
      imgbg:require('../../assets/images/vue-demo-new.jpg')
	  }    
    ],
	  day:[
	  {
       type:'day',
	     id:1,
       name:'asasd阿俊',
       time:'大约6小时之前',
       title:'毕业9年，我才学懂的道理',
       readnum:3398,
       pinglun:258,
       like:232,
       dashang:68,
      imgbg:require('../../assets/images/vue-demo-daily.jpg')
	  },
	  {
	   id:2,
       name:'wwwwww阿俊2',
       time:'大约5小时之前',
       title:'ppppppppppppppppp',
       readnum:3398,
       pinglun:258,
       like:232,
       dashang:168,
      imgbg:require('../../assets/images/vue-demo-daily.jpg')
	  },
	  {
	   id:3,
       name:'eeeeee阿俊3',
       time:'大约4小时之前',
       title:'zzzzzzzzzzz',
       readnum:398,
       pinglun:58,
       like:32,
       dashang:8,
      imgbg:require('../../assets/images/vue-demo-daily.jpg')
	  }    
    ],
    curlisttype:[
    ]
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

	},

	[GETTERSLISTS](state,gettercan)
	{
       if(gettercan == 'hot')
       {       
       	    state.curlisttype=''
            state.curlisttype=state.hot
       }
       else if(gettercan == 'new'){
           state.curlisttype=''
           state.curlisttype=state.new  
       }
       else if(gettercan == 'day'){
           state.curlisttype=''
           state.curlisttype=state.day
       }

         
	},
  [GETSTARTLIST] (state)
  {
    state.curlisttype=''
    state.curlisttype=state.hot
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


