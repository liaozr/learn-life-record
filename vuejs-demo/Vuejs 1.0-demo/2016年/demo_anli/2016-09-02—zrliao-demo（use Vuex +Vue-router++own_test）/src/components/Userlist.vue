<template>
	 <headmenu headvalue='用户列表'></headmenu>
	 <div class="userlist_layout" transition='expand'>
	 	   <div class="add_search_md">
	 	   	   <input type="text" v-model='keywords' placeholder='请输入姓名'>
	 	   	   <button @click='search'>搜索</button> <br>
	 	   	   <button @click='addUser' v-link="{name:'useradd'}">添加</button>
	 	   </div>
	 	   <div class="userinfo">
	 	   	  <table>
	 	   	  	<thead><tr><th>姓名</th><th>年龄</th><th>电话</th><th>操作</th></tr></thead>
	 	   	  	<tbody>
	 	   	        <tr v-for="user in users | filterBy guanjianzi in 'name' ">
	 	   	  			<td v-text='user.name'></td>
	 	   	  			<td v-text='user.age'></td>
	 	   	  			<td v-text='user.tel'></td>
	 	   	  			<td>
	 	   	  				<button @click='edit_user(user)' v-link="{name:'useredit',params:{id:user.id}}">编辑</button>
	 	   	  				<button @click='delete_user(user)' class='delete_btn'>删除</button>
	 	   	  			</td>
	 	   	  		</tr> 
	 	   	  	</tbody>
	 	   	  	<tfoot></tfoot>
	 	   	  </table>
	 	   </div>
	 </div>
</template>

<script>
import Headmenu from './Headmenu'
import { users } from '../vuex/getters'

import { delete_user } from '../vuex/actions'
import { edit_user } from '../vuex/actions'
import { addUser } from '../vuex/actions'
	export default{
		data() {
			return{
             keywords:'',
             guanjianzi:''
 			}
		},
		components:{
             Headmenu
		},
		vuex:{
			getters:{
               users
			},
			actions:{
              delete_user,
              edit_user,
              addUser
			}
		},
		methods:{
			search() {
                this.$route.router.go({
                  name:'userlist',
                  query:{
                  	keyword:this.keywords
                  }
                })
                this.guanjianzi=this.keywords
			}
		}
	}
</script>	

<style>
	.userlist_layout{
		margin-top: 15px;
	}
	button{
		background-color: #009CD5;
		width:50px;height:30px;text-align: center;line-height: 30px;
		color:white;
	}
	.userinfo{
		width:100%;
		height:auto;
		margin-top: 20px;
	}
	.userinfo table{
		width:100%;
	}
	.userinfo table tr{
		height:40px;
	}
	.userinfo table tr th{
		height:50px;
		background-color: #ccc;
		text-align: center;
	}
   .userinfo table tr td{
   	text-align: center;
   }
   .delete_btn{
   	background-color: #C93B2A;color:white;
   }


</style>