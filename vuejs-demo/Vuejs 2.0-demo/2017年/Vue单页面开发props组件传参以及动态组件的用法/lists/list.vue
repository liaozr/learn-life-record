<template>
<div class="qui-list">
    <span class="list-tips">{{tipsText}}</span>
    <component :is="currentView" @btnClickEvent="clickEvent" :msg=msg class="small" keep-alive></component>

    <!--
        其实关于动态组件，不一定要用：is+component来实现，

        在Vue中有一个指令叫做v-if / v-else / v-else-if，统称判断指令，配合展示指令v-show，

        可以根据指定的值来决定对应的组件是否应该展示，另外这种做法我不展示了，
      -->


    <!--
    keep-alive关键字保持这个组件在内存中是常驻的，由于动态组件可能需要动态切换，
    这样保持组件活跃可以减少组件变化时候的内存消耗。
     -->

</div>
</template>

<script>
import button from './button.vue'
import arrow from './arrow.vue'
export default {
    // props: ['message'],
    props: {
        msg: {
            default: '下载'
        },
        tipsText: {
            default: '默认的文案'
        },
        currentView: {
            default: 'btn'
        }
    },
    components: {
        'btn': button,
        'arw': arrow
    },
    methods: {
        clickEvent: function() {
            this.btnClickEvent();
            this.$emit('btnClickEvent', this.msg);
        },
        btnClickEvent: function() {
            alert(this.msg + '我是默认事件');
        }
    },
    mounted() {
        this.$parent.ceshi()
        // 这个是执行父组件里面的 一个 ceshi 方法
    }
}
</script>

<style lang='scss' scoped>
.qui-list {
    padding: 10px 0;
    margin-left: 10px;
    overflow: hidden;
    border-bottom: 1px solid #e0e0e0;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: Center;
    min-height: 30px;
}
.qui-list .qui-btn {
    float: right;
    margin-right: 10px;

}
.qui-list .list-tips {
    padding: 0 5px;
    color: #00A0D8;
    float: left;
    vertical-align: middle;
    flex: 1;
    text-align: left;
    font-size: 14px;
}
</style>
