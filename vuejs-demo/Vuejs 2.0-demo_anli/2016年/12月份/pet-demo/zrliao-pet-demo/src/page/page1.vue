<template>
    <div>
        <div>
            <p>{{msg}}</p>
            <p>{{reversedMessage}}</p>
            <p @click ="change">点击{{count}}</p>
        </div>
    </div>
</template>



<script>
    import Vue from 'vue';

 
    export default{
        data:function(){
            return{
              msg:'page1',
              count:0
            }

        },
        computed:{
            reversedMessage: function () {
                return this.msg.split('').reverse().join('')
            }
        },
        // beforeRouteEnter(to,from ,next){
        //     next(vm =>{
        //         console.log("又进来了")
        //     })
        // },
        activated(){
           var vm = this;
           vm.$store.dispatch('comm_conf',{
                isFooter:true,
                isSearch:true,
                isBack:false,
                isShare:false,
                title:''
           });
        },
        methods:{
            change() {
                 this.count++
            }
        }
    }

    </script>