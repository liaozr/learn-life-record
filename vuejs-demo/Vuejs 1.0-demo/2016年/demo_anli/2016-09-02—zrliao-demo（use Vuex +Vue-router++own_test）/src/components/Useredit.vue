<template>
    <headmenu v-if="$route.path === '/useradd'" headvalue='添加用户'></headmenu>
    <headmenu v-else headvalue='用户编辑'></headmenu>

	<div v-if="$route.path === '/useradd'" class="user_edit user_add">
		<table>
			<thead></thead>
			<tbody>
				<tr><th>姓名</th><td><input   v-model="curEdit.name" type="text"></td></tr>
			    <tr><th>年龄</th><td><input   v-model="curEdit.age" type="text"></td></tr>
			    <tr><th>电话</th><td><input   v-model="curEdit.tel" type="text"></td></tr>
			</tbody>
		</table>
		<button @click='addSaveUser' v-link="{name:'userlist'}" class='baocun'>保存</button>
		<button @click='gotoback'>关闭</button>
	</div>

    <div v-else class="user_edit">
        <table>
            <thead></thead>
            <tbody>
                <!-- <tr><th>姓名</th><td><input @input='updaUser' v-model="curEdit.name" type="text"></td></tr>
                <tr><th>年龄</th><td><input @input='updaUser' v-model="curEdit.age" type="text"></td></tr>
                <tr><th>电话</th><td><input @input='updaUser' v-model="curEdit.tel" type="text"></td></tr> -->

                <tr><th>姓名</th>
                    <td>
                        <input  @input='updaUser(editname,editage,edittel)' :value="curEdituser.name" v-model='editname' type="text">
                    </td>
                </tr>
                <tr><th>年龄</th><td><input  @input='updaUser(editname,editage,edittel)' :value="curEdituser.age" v-model='editage' type="text"></td></tr>
                <tr><th>电话</th><td><input  @input='updaUser(editname,editage,edittel)' :value="curEdituser.tel" v-model='edittel' type="text"></td></tr>
               <!--  <tr><th>电话</th><td><input  @input='upda' :value="curEdituser.tel" v-model='edittel' type="text"></td></tr> -->
            </tbody>
        </table>
        <button @click='editSaveUser' v-link="{name:'userlist'}" class='baocun'>保存</button>
        <button @click='closeUser' v-link="{name:'userlist'}">关闭</button>
    </div>

</template>
<script>
    import Headmenu from './Headmenu'
    import { curEdituser } from '../vuex/getters'
    import {updateUser} from '../vuex/actions'
    import {addSaveUser} from '../vuex/actions'
    import {editSaveUser} from '../vuex/actions'
    import {closeUser} from '../vuex/actions'
	export default{
        data() {
        	return {
                 editname:'',
                 editage:'',
                 edittel:''
        	}
        },
        components:{
             Headmenu
        },
        vuex:{
        	getters:{
               curEdituser
        	},
        	actions:{
        	   updateUser,
               addSaveUser,
               editSaveUser,
               closeUser
        	}
        },
        methods:{
            gotoback() {
                this.$route.router.go({name:'userlist'})
            },
            updaUser(editname,editage,edittel) {
                this.updateUser(editname,editage,edittel)
            }
            // ,
            // upda(e){
            //    console.log(e.target.value)
            // }
        },
        computed: {
		    curEdit: {
			    get () {
			      return this.curEdituser
			    }
     	    }
		}
	}
</script>	

<!-- --------------------------------------------------------------------------------------- -->
<!-- <tr>
    <th>电话</th>
    <td><input  @input='upda' :value="curEdituser.tel" v-model='edittel' type="text"></td>
</tr> -->

<!--  用 e.target.value获取到当前表单的值的时候，要注意的一些点   -->

<!--  @input  @change 事件 是不用加()的，例如就是  @input='upda'  @change='upda'  -->

<!--  在methods 里面 在用  e参数 把这个e参数  传到upda这个方法里面 -->

<!--  获取到值 是用  e.target.value   -->

<!--    
    methods:{
       gotoback() {
           this.$route.router.go({name:'userlist'})
       },
       updaUser(editname,editage,edittel) {
          this.updateUser(editname,editage,edittel)
       },
       upda(e){
          console.log(e.target.value)
       }
    } 

-->
<!-- ----------------------------------------------------------------------------------------------- -->

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