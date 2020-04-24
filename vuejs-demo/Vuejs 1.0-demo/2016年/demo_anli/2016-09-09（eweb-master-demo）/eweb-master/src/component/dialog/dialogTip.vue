<template>
    <div :class="dCss.dialogBox"  v-show="modalshow" >
        <div :class="dCss.dialogIn">
          <div :class="[dCss.dialog, 'bounce']">
                <div :class="dCss.dialogContent">
                    <div :class="dCss.tipsIn">
                          《  {{type}} 》{{msg}}
                    </div>
                </div>

                <div :class="dCss.dialogFooter">
                    <slot name="footerDialog">
                        <btnbar :buttons="buttons" :events="btnEvent"></btnbar>
                    </slot>
                </div>
          </div>
        </div>
    </div>
</template>

<script>
import dCss from "./dialog.css";
import icon from "component/sprite/icon";
import btnbar from "component/sprite/buttonbar";
import dialogBase from "common/mixinDialog.js";
export default {
  mixins:[dialogBase],
  props:{
    type:{
      type: String,
      default: "warn"  // error
    },
    msg:{
      type: String,
      default:""
    }
  },
  data: function () {
    return {
      dCss
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {

  },
  watch:{
  },
  components: {icon,btnbar}
}
</script>
