<template>
    <div class="com-home">
        <div class="user-info clearfix">
            <router-link :to="{name:'homeUserInfo', params: {uid:uid}}"  class="link-box clearfix" >
                <img :src="info.userIcon||'http://dummyimage.com/150x150'">
                <p>{{info.name}}</p>
               <span class="iconfont icon-xiangyoujiantou icon-right"></span>
            </router-link>
        </div>
        <div class="user-link">
            <ul>
                <li>
                    <router-link to="/home/mypet"  class="link-box">

                        <span class="iconfont Hui-iconfont-yiguanzhu icon-yunxuxidaichongwu"></span>
                        <span class="txt">我的宠物</span>
                        <span class="iconfont icon-xiangyoujiantou icon-right"></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/index"  class="link-box">

                        <span class="iconfont Hui-iconfont-feedback1 icon-detail"></span>
                        <span class="txt">我的帖子</span>
                        <span class="iconfont icon-xiangyoujiantou icon-right"></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/index"  class="link-box">
                        <span class="iconfont Hui-iconfont-star icon-shoucang"></span>
                        <span  class="txt">我的收藏</span>
                        <span class="iconfont icon-xiangyoujiantou icon-right"></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/index"  class="link-box">
                        <span class="iconfont Hui-iconfont-comment icon-xiaoxizhongxin"></span>
                        <span  class="txt">我的消息</span>
                        <span class="iconfont icon-xiangyoujiantou icon-right "></span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import '../css/home.scss'
    import {mapGetters} from 'vuex'
    export default{
         data() {
            return{
                 uid:123
            }
         },
         activated(){
            //head的修改
            this.$store.dispatch('comm_conf',{
                isFooter:true,
                isSearch:false,
                loading:false,
                isBack:false,
                isShare:false,
                title:'个人首页'
            });
            if(!this.info.name){
                this.$store.dispatch('getHomeIndex',this.uid);
            }
         },
         created:function () {
            console.log("当设置了keep-alive后，created钩子只会在第一次进入该组件的时候才会执行的")
         },
         computed:{
            ...mapGetters(['info'])
         }
    }

    </script>