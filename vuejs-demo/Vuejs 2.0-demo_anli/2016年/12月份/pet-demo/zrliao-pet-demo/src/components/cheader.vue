<template>
    <div class="header">

        <div v-if=" $route.name !== 'homeUserInfo' && $route.name !== 'home' && $route.name !== 'myPet' && $route.name !== 'addPet'">
            <div class="place">位置</div>
            <search></search>
        </div>

        <div class="title" v-else>
            <a  v-show="$route.name == 'homeUserInfo' || $route.name == 'myPet'  || $route.name == 'addPet' " class="back t-icon" @click="goBack"><span class="iconfont icon icon-xiangzuojiantou"></span></a>
            
            <a  v-show="commData.isShare" class="share t-icon" ><span class="iconfont icon icon-fenxiang-1"></span></a>
            <p>{{commData.title}}</p>
        </div>
    </div>
</template>

<script>
    import search from './search'
    import "../css/header.scss"
    export default{
        data() {
            return{

            }
        },
        props:{
            commData:{
                type:Object
            }
        },
        methods:{
          goBack:function () {
             history.go(-1);
             this.$store.dispatch('comm_conf',{
                isFooter:true,
                isSearch:false,
                isBack:false,
                isShare:false,
                title:'个人首页'
            });
          }
        },
        components:{
            search
        }
    }
</script>