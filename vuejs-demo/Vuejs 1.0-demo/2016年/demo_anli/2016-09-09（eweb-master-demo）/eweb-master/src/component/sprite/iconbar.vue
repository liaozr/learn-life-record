<template >
  <div :class="css.iconBar">
      <icon v-for="one in buttons"  @click="btnClickHandler(one)" :classname="css.iconItem" :iconname="one.icon?one.icon:''" ></icon>
  </div>
</template>

<script>
import icon from "./icon";
import css from "./iconbar.css";
export default {
  props:{
      buttons:{
        type: Array,
        default: () => []
      },

      events:{
        type: Object,
        default: function(){
          return {
            btnClick: function(){}
          }
        }
      }
  },
  data: function () {
    return {
      css
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    btnClickHandler: function(one){
        this.events.btnClick.call(this._context, one);
        this.$dispatch("btnclick", one);
    }
  },
  components: {icon}
}
</script>
