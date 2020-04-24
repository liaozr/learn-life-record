 <template>
  <div>
    <h3>Count is {{ counterValue }}</h3>
  </div>
</template>

<!-- State（状态），Mutations（变更） 和 Actions（动作）。 -->

<script>
import { getCount } from '../vuex/getters'
export default {
  vuex: {
    getters: {
      // 注意在这里你需要 'getCount' 函数本身而不是它的执行结果 'getCount()'
      counterValue: getCount
    }
  }
}
</script>

<!-- 

这里我们又加入了一个新的对象 vuex.getters。
它将 counterValue 绑定到了 getCount 这个 getter 函数上。我们给它起了一个新名字来使得这个变量在你的组件里表意更明确。

你可能有点困惑——为什么我们需要用 getter 函数而不是直接从 state 里读取数据。这个概念更多的是一种最佳实践，
在大型应用里更加适用。它有这么几种独特优势：

我们可能需要使用 getter 函数返回需经过计算的值（比如总数，平均值等）。
在大型应用里，很多组件之间可以复用同一个 getter 函数。
如果这个值的位置改变了
（比如从 store.count 变成了 store.counter.value），你只需要改一个 getter 方法，而不是一堆组件。
以上便是使用 getter 带来的好处。
 -->