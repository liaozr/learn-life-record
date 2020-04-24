module.exports = {
    created: function() {
        let option = this.$options.doNotInit
        if (!option) {
            this.init();
        }
    },
    methods: {
        init(){
          // 一些初始化操作
        },
        slideLeft(){
            this.$store.dispatch('slideLeft')
        }
    }
}

// 运用场景示例
// 合并策略中的问题 ( demo示例 )
 
// import  mixin from  '@m/index'
// new Vue({
//     mixins: [mixin],
//     doNotInit: true,
//     created: function() {
//         console.log('组件钩子被调用')
//     },
//     beforeRouteEnter(to, from, next) {
//         next(vm => {
//             vm.init();
//         })
//     }
// })
