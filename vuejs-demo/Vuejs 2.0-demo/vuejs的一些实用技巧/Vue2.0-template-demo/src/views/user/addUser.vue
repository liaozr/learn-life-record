<template>

    <div id="edituser">
        <div v-if="$route.path == '/useradd'" class="user_edit user_add">
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <th>姓名</th>
                        <td><input :value='editname' @input='commitname($event.target.value)' type="text"></td>
                    </tr>
                    <tr>
                        <th>年龄</th>
                        <td><input :value='editage' @input='commitage($event.target.value)' type="text"></td>
                    </tr>
                    <tr>
                        <th>电话</th>
                        <td><input :value='edittel' @input='committel($event.target.value)' type="text"></td>
                    </tr>
                </tbody>
            </table>

            <button @click='addSaveUser' class='baocun'>保存</button>
            <button @click='gotoback'>关闭</button>
        </div>

        <div v-else class="user_edit">
              <table>
                   <thead></thead>
                   <tbody>
                       <tr>
                           <th>姓名</th>
                           <td>
                               <input :value="curEdituser.name" type="text">
                           </td>
                       </tr>
                       <tr>
                          <th>年龄</th>
                          <td>
                             <input :value="curEdituser.age" type="text">
                           </td>
                       </tr>
                       <tr>
                           <th>电话</th>
                           <td>
                               <input :value="curEdituser.tel" type="text">
                            </td>
                       </tr>
                   </tbody>
             </table>

             <button @click='closeUser'>关闭</button>
         </div>

    </div>
</template>

<script>

    import { mapGetters,mapActions } from 'vuex'

    export default {
        data() {
            return {}
        },
        components: {
        },
        methods: {
            ...mapActions(['closeUser', 'commitname', 'commitage', 'committel']),
            addSaveUser() {
                this.$store.dispatch('addSaveUser')
                this.$router.push({
                    path: '/user'
                })
            },
            gotoback() {
                this.$router.push({
                    path: '/user'
                })
            },
            closeUser(){
              this.$router.push({
                  path: '/user'
              })
            }
        },
        computed: {
            ...mapGetters(['curEdituser','editname', 'editage', 'edittel'])
        },
        mounted(){
          console.log("测试 adduser组件")
        }
    }
</script>


<style>
    .user_edit {
        margin-top: 15px;
    }

    .user_edit input {
        margin-top: 10px;
        line-height: 30px;
        width: 220px;
    }

    .baocun {
        margin-top: 20px;
        margin-left: 30px;
    }
</style>
