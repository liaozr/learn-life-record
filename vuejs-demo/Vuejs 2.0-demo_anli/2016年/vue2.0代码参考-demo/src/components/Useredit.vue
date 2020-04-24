<template>
    <div id="edituser">

	    <headmenu v-if="$route.path === '/useradd'" headvalue='添加用户'></headmenu>
	    <headmenu v-else headvalue='用户编辑'></headmenu>

		<div v-if="$route.path === '/useradd'" class="user_edit user_add">
			<table>
				<thead></thead>
				<tbody>
				    <tr><th>姓名</th><td><input :value='editname' @input='commitname($event.target.value)' type="text"></td></tr>
				    <tr><th>年龄</th><td><input :value='editage'  @input='commitage($event.target.value)'  type="text"></td></tr>
				    <tr><th>电话</th><td><input :value='edittel'  @input='committel($event.target.value)'  type="text"></td></tr>
				</tbody>
			</table>

 			<button @click='addSaveUser'  class='baocun'>保存</button>
			<button @click='gotoback'>关闭</button>
		</div>

	    <div v-else class="user_edit">
	        <table>
	            <thead></thead>
	            <tbody>
	                <tr>
	                    <th>姓名</th>
	                    <td>
	                        <input :value="curEdituser.name" @input="changename($event.target.value)"  type="text">
	                    </td>
	                </tr>
	                <tr>
	                   <th>年龄</th>
	                   <td>
	                      <input :value="curEdituser.age"  @input="changeage($event.target.value)"  type="text">
	                    </td>
	                </tr>
	                <tr>
	                    <th>电话</th>
	                    <td>
	                        <input :value="curEdituser.tel" @input="changetel($event.target.value)"  type="text">
	                     </td>
	                </tr>

	            </tbody>
	        </table>

	        <button @click='editSaveUser' class='baocun'>保存</button>
	        <button @click='closeUser'>关闭</button>

	    </div>

    </div>

</template>
<script>

    import Headmenu from './Headmenu'

    import { mapGetters,mapActions} from'vuex'
  
	export default{
        data() {
        	return {
        	}
        },
        components:{
             Headmenu
        },
        methods:{
        	...mapActions(['commitname','commitage','committel','changename','changeage','changetel']),
        	addSaveUser(){
        		this.$store.dispatch('addSaveUser')
        		this.$router.push({path:'/userlist'})
        	},
            gotoback() {
                this.$router.push({path:'/userlist'})
            },
            editSaveUser(){
            	this.$store.dispatch("editSaveUser");
            	this.$router.push({path:'/userlist'})
            },
             closeUser(){
            	this.$store.dispatch("closeUser");
            	this.$router.push({path:'/userlist'})
            }
        },
        computed: {
		    ...mapGetters(['curEdituser','editname','editage','edittel'])
		}
	}
</script>	


<style>
    .user_edit{
    	margin-top: 15px;
    }
    .user_edit input{
    	margin-top: 10px;line-height: 30px;width:220px;
    }

    .baocun{
		margin-top: 20px;margin-left: 30px;
	}
</style>