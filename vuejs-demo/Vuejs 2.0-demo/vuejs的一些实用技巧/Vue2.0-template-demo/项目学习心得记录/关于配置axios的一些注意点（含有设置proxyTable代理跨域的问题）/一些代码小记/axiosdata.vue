<template>
     <div id="axios">

         <div class="" style='margin-top:50px;'></div>

         <button @click="fetchTopicsData">{{isFetching?'正在加载...':'点击请求'}}</button>
          <!---->
         <ul>
              <li v-for="list in data">
                  {{list.title}}
              </li>
         </ul>

     </div>
</template>

<script>

    // 从api文件中导入所需模块
    import { gongdiMember,tongzhi_gonggao,fetchMoviesByType } from '../api/api';
    
    // 从vuex 里面导入
    import { mapGetters } from 'vuex'

    export default {
        name: 'axios',
        data() {
          return{
          	member:[],
            vuedata:[]

          }
        },
        components:{
        },
        methods:{
           fetchTopicsData(){
               var vuedata={
               }

               // this.$store.dispatch('fetchTopics',vuedata);

               // 也还可以这样子 dispatch 分发 fetchTopics 这个actions, 完了之后 还会有个回调事件。
               this.$store.dispatch('fetchTopics',vuedata).then(function(resp){
                    alert(resp)
               })
           }
        },
        computed:{
            ...mapGetters(['isFetching','data'])
        },
        mounted(){

            var membemcanshu={
                  sitesRecordId:'2c9496815c7761ab015c7763215a0000'
            }

            var tongzhigonggaocanshu={
             	empId:'10001'
            }

            var vuedata={}

            var moviecanshu={
            	start:0,
            	count:20
            }

            // 从api文件中请求数据
          	gongdiMember(membemcanshu)
  	              .then((data) => {
                      console.log(data)
  	                this.member = data;
  	        });
  	        tongzhi_gonggao(tongzhigonggaocanshu)
  	              .then((data) => {
                      console.log(data)
  	        });

  	        fetchMoviesByType(moviecanshu)
  	              .then((data) => {
                      console.log(data)
  	        });
        }
    }
</script>

<style lang="css">
 div{
  margin-top:10px;
 }
</style>
