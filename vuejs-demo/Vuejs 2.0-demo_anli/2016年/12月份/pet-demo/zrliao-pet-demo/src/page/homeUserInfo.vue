<template>
    <div class="com-homeuserinfo">
        <ul class="user-link">
            <li class="user-icon">
                    <span class="txt">头像</span>
                    <img src="http://dummyimage.com/150x150">
                    <span class="iconfont icon-xiangyoujiantou icon-right"></span>
            </li>
            <li>
                    <span class="txt">昵称</span>
                    <p>jamie</p>
                    <span class="iconfont icon-xiangyoujiantou icon-right"></span>
            </li>
            <li>
                    <span class="txt">性别</span>
                    <span class="iconfont icon-xiangyoujiantou icon-right"></span>
            </li>
            <li>
                    <span class="txt">个人说明</span>
                    <span class="iconfont icon-xiangyoujiantou icon-right"></span>
            </li>
            <li>
                    <span class="txt">城市</span>
                    <span class="iconfont icon-xiangyoujiantou icon-right"></span>
            </li>
        </ul>
    </div>
</template>

<script>

    import '../css/homeuserinfo.scss'

    export default{
        data:function(){
            return{

            }
        },
        activated(){
            //head的修改
            this.$store.dispatch('comm_conf',{
                isFooter:false,
                isSearch:false,
                isBack:true,
                isShare:false,
                title:'个人首页'
            })
        },
        created:function () {
            
        }
    }
</script>
