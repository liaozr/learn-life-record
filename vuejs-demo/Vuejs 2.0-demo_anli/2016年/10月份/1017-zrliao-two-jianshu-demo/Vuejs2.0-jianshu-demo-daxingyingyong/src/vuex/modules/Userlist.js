

// 可以写成下面这种形式的
// import { GETSTARTLIST} from '../mutation-types' 
// import { GETTERSLISTS} from '../mutation-types' 
// -------------------------------------------------

// 不过相比上面那种形式，是更推荐下面的这种写法的。而且尤大的案例写法也是以这种形式的

// 这种写法的好处是 假如mutation-types里面有很多个变量的时候，要一个个的引入到各自的模块里去，这样就不是很方便了
// import * as types from '../mutation-types' 这个的做法就是 将所有常量导成一个对象, 从而更方便的使用
// 但引入了这样子写法的该模块的mutations的写法就将变成 types.GETSTARTLIST代表着原有的GETSTARTLIST的了
// 如下所示：
// const mutations = {
//   [types.GETSTARTLIST] (state)
//   {
//     state.curlisttype=''
//     state.curlisttype=state.hot
//   }
// } 

import * as types from '../mutation-types'

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
	[types.GETTERSLISTS](state,gettercan)
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
  [types.GETSTARTLIST] (state)
  {
    state.curlisttype=''
    state.curlisttype=state.hot
  }
} 

export default { 
	state, 
	mutations 
}


