<template>
  <div id="user">
        <cHeader></cHeader>
        <div class="content">
              <router-link tag='div' :to="{name:'userDetail'}" >去user组件的二级页面</router-link> 
              <h1 class='biaoti'>
                 Hello <span>Vue.js</span>
              </h1>

              <div class="msg">
                 {{msg}}
              </div>
              
              <img :src="tupian" alt="">
              <br>
              <img :src="logo" alt="">

              <span>时间：{{time | parseTime }}</span>
              <br>

              <span>数字千展示：{{num | toThousandslsFilter}}</span>
              <br>
              <span>价格：￥{{money | formatMoney}}</span>

              <span>数字格式化：{{num | nFormatter}}</span>
              <br>

              <br>

        		 <div class="userlist_layout" transition='expand'>

        		 	   <div class="add_search_md">
        		 	   	   <input type="text" v-model='query' placeholder='请输入姓名进行搜索'><br>
        		 	   	   <!-- <button @click='search'>搜索</button> <br> -->
        		 	   	   <button @click='addUser'>添加</button>
        	 	 	   </div>

        		 	   <div class="userinfo" v-if='users.length'>
        		 	   	  <table>
        		 	   	  	<thead><tr><th>姓名</th><th>年龄</th><th>电话</th><th>操作</th></tr></thead>
        		 	   	  	<tbody>
        		 	   	        <!-- <tr v-for="user in users | filterBy guanjianzi in 'name' "> -->
        		 	   	        <tr v-for="(user,index) in users" :key="user.id">
            		 	   	  			<td v-text='user.name'></td>
            		 	   	  			<td v-text='user.age'></td>
            		 	   	  			<td v-text='user.tel'></td>
            		 	   	  			<td>
                                <button @click="edit_user(index)" class='danger'>编辑</button>
            		 	   	  				<button @click="delete_user(index)" class='danger'>删除</button>
             		 	   	  			</td>
        		 	   	  		  </tr>
        		 	   	  	</tbody>
        		 	   	  	<tfoot></tfoot>

        		 	   	  </table>

        		 	   </div>
        		 </div>
        </div>
	 </div>

</template>

<script>
    import cHeader from '@c/header/header'
    import tupian from 'assets/images/aaa.png'
    import { mapGetters,mapActions } from 'vuex'

    export default {
        name:'user',
        data() {
            return {
                query: '',
                msg:'我是廖仲仁',
                logo:require('assets/images/ccc.png'),
                tupian,
                time:'',
                money:12.42332323,
                num:1200
            }
        },
        components: {
          cHeader
        },
        computed: {
            users: function() {
                var vm = this;
                return this.$store.state.Userlist.users.filter(function(user) {
                    return user.name.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
                })
            }
        },
        methods: {
            ...mapActions(['delete_user']),
            addUser() {
                this.$store.dispatch('addUser');
                this.$router.push(
                  {
                    path: '/useradd'
                  }
                )
            },
            edit_user(index) {
                this.$store.dispatch('edit_user',index);
                var user_id = this.$store.state.Userlist.users[index].id;
                this.$router.push({
                    name: 'useredit',
                    params: {
                        id: user_id
                    }
                })
            },
            test(){
              // this.$store.dispatch('fetchTopics', {
              //     page: 0,
              //     tab: 'share',
              //     limit: 20
              // })
            },
            search() {
                // var keywords = this.query
                // this.$router.push({
                //     path: '/userlist',
                //     query: {
                //         keyword: keywords
                //     }
                // })
            }
        },
        mounted(){
           this.time=new Date();
        }
    }
</script>

<style lang='scss' scoped>

  h1.biaoti{
      color:$colorgreen;
      font-size: $fs20;
      @include center;
  }
  .userlist_layout {
      margin-top: 15px;
  }

  button {
      background-color: #009CD5;
      width: 50px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: white;
  }

  .userinfo {
      width: 100%;
      height: auto;
      margin-top: 20px;
  }

  .userinfo table {
      width: 100%;
  }

  .userinfo table tr {
      height: 40px;
  }

  .userinfo table tr th {
      height: 50px;
      background-color: #ccc;
      text-align: center;
  }

  .userinfo table tr td {
      text-align: center;
  }
  .delete_btn {
      background-color: #C93B2A;
      color: white;
  }
</style>
