<template>
  <div> 
    
    <!--   
     'v-if'是vue的一个指令
     '$route.path'是当前路由对象的路径，会被解析为绝对路径当 
     '$route.path !== '/time-entries/log-time''为`true`是显示，`false`，为不显示。 
      v-link 路由跳转地址
    -->
    
    <button
      v-if="$route.path !== '/time-entries/log-time'"
      v-link="'/time-entries/log-time'"
      class="btn btn-primary"> 创建 
    </button>

    <div v-if="$route.path === '/time-entries/log-time'">
      <h3>创建</h3>
    </div>
    <hr> 
    <router-view></router-view>
    <div class="time-entries">
        <p v-if="!timeEntries.length"><strong>还没有任何任务</strong></p>
        <div class="list-group"> 

            <!-- v-for列表循环 -->
            <a class="list-group-item" v-for="timeEntry in timeEntries">
              <div class="row">
                  <div class="col-sm-2 user-details">
                  <!--  <img src="https://avatars1.githubusercontent.com/u/10184444?v=3&s=460" class="avatar img-circle img-responsive" /> -->


                  <!--  ':src'属性，这个是vue的属性绑定简写`v-bind`可以缩写为 ':'  // 比如a标签的`href`可以写为`:href` //并且在vue的指令里就一定不要写插值表达式了(':src={{xx}}' )，vue自己会去解析 -->
                   <img :src="timeEntry.user.image" class="avatar img-circle img-responsive" />
                    <p class="text-center"> <strong> 二哲 </strong> </p>
                  </div>

                  <div class="col-sm-2 text-center time-block">
                    <h3 class="list-group-item-text total-time"> <i class="glyphicon glyphicon-time"></i> {{ timeEntry.totalTime }} </h3>
                    <p class="label label-primary text-center"> <i class="glyphicon glyphicon-calendar"></i> {{ timeEntry.date }} </p>
                  </div>

                  <div class="col-sm-7 comment-section">
                    <p>{{ timeEntry.comment }}</p>
                  </div>

                  <div class="col-sm-1">
                    <button
                        class="btn btn-xs btn-danger delete-button"
                        @click="deleteTimeEntry(timeEntry)"> X
                    </button>
                  </div>
              </div>
            </a> 
        </div>
    </div>
  </div>
</template>
 
<style>
  .avatar {
    height: 75px;
    margin: 10px auto;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>


<script>
    export default {
      //先把涉及到route 路由的先注销掉
      // route : {
      //   data(){
      //     this.$http.get('http://localhost:8888/time-entries')
      //       .then(function(ret) {
      //         this.timeEntries = ret.data;
      //       })
      //       .then(function(err) {
      //         console.log(err);
      //       })
      //   }
      // },

      data () {
        // 模拟下初始化数据
        let existingEntry = {
          user: {
            name:'zrliao',
            email:'54945234@qq.com',
            image:'https://avatars1.githubusercontent.com/u/10184444?v=3&s=460'
          },  
          comment: '我的第一个任务',
          totalTime: 1.5,
          date: '2016-08-16'
        }
        return {
          timeEntries: [existingEntry]
        }
      },
      methods: {
        //这个方法用于删除某一项计划
        deleteTimeEntry (timeEntry) {
          // 删除

          // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
          let index = this.timeEntries.indexOf(timeEntry)
          let _id = this.timeEntries[index]._id
          if (window.confirm('确认删除?')) {
            // this.$http.delete('http://localhost:8888/delete/' + _id)
            //   .then(function(ret) {
            //     console.log(ret);
            //   })
            //   .then(function(err) {
            //     console.log(err)
            //   });
            this.timeEntries.splice(index, 1)
            //这里会派发到父组件上，执行父组件events里的deleteTime方法
            this.$dispatch('deleteTime', timeEntry)
          }
        }
      },
      events: {
        timeUpdate (timeEntry) {
          this.timeEntries.push(timeEntry)
          //继续向上派发
          return true;
        }
      }
    }
</script> 
