

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
  	plans:[

    ],
    curEditPlans:{

    },
    totaltimeAll:0
} 
// 相关的 mutations
const mutations = {

  	[types.SAVE](state)
  	{ 
      state.curEditPlans.name='zrliao';

      var dateed=state.curEditPlans.date;

      var tottime=Number(state.curEditPlans.totaltime);
      var totaltimeAll=state.totaltimeAll;
     
      totaltimeAll=totaltimeAll+tottime;
      if(dateed == '' || dateed == undefined || dateed == null)
      {
      }
      else if( tottime <= 0 ){

      }
      else{
        state.plans.push(state.curEditPlans);
        state.curEditPlans=''; 
        state.totaltimeAll=totaltimeAll;
      }
   	},

    [types.SETNEWPLAN](state)
    {
        var newPlans={
          name:'',
          date:'',
          totaltime:'',
          commitss:'',
          avatar:'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
        } 
        state.curEditPlans=newPlans
    },

    [types.DATECHANGE](state,date)
    { 
          state.curEditPlans.date=date   
    },

    [types.TOTALTIMECHANGE](state,totaltime)
    {     
          if( totaltime <= 0)
          {
            totaltime=0
            state.curEditPlans.totaltime=totaltime   
          }
          else{
            state.curEditPlans.totaltime=totaltime   
          }
              
    },

    [types.COMMITCHANGE](state,commitss)
    {
          state.curEditPlans.commitss=commitss       
    },

    [types.DELETEPLAN](state,index)
    {   
        var deltime=state.plans[index].totaltime;
        state.totaltimeAll= state.totaltimeAll-deltime;

        state.plans.splice(index,1);
    },
    [types.CANCEL](state)
    {   
         state.curEditPlans='';
    }  
} 

export default { 
	state, 
	mutations 
}


