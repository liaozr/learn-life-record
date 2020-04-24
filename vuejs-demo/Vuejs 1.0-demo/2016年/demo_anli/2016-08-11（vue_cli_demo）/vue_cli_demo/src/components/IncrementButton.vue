
<!-- 然后我们从 components/IncrementButton.vue 组件里调用 action 函数 -->

<template>
  <div>
    <button @click='increment'>Increment +1</button>

    <button @click='release'>reset</button>
  </div>
</template>

<script>
import { incrementCounter } from '../vuex/actions'

import { releaseCounter } from '../vuex/actions'
export default {
  vuex: {
    actions: {
      increment: incrementCounter,
      release:  releaseCounter
    }
  }
}
</script>

<!-- 
1、我们有了一个新对象 vuex.actions，包含着新的 action。
2、我们没有指定特定的 store, object, state 等等。Vuex 会自动把它们串联好。
3、我们可以用 this.increment() 在任何方法中调用此 action。
4、我们也可以通过 @click 参数调用它，与使用其他普通的 Vue 组件方法并无二致。
5、我们给 action 起名叫 incrementCounter，但是在具体使用时，我们可以根据需要进行重新命名。
 -->