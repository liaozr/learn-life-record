<template>
    <div :class="[css.tipBox, css[type]]" v-show="show">
          <div :class="css.tipsIn">
                {{msg}}
          </div>
    </div>
</template>

<script>
import css from "./smalltip.css";

export default {
  props:{
    type:{
      type:String,
      default:"warn" // success   error
    },
    msg:{
      type:String,
      default:""
    },
    flag:{
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      css,
      show: false
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    showDialog: function(){
        this.$set("show", true);
        setTimeout(()=>{
            this.$set("show", false);
        }, 1500)
    }
  },
  components: {},
  watch:{
    "flag": function(){
        this.showDialog();
    }
  }
}
</script>
