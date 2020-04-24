<template>
    <div :class="dCss.dialogBox"  v-show="modalshow">
        <div :class="dCss.dialogIn">
          <div :class="[dCss.dialog, 'bounce']">
                <div :class="dCss.dialogTitle">
                    {{title}}
                    <span :class="dCss.close" @click="hide"><icon iconname="icon-close" ></icon></span>
                </div>

                <div :class="dCss.dialogContent">
                    <slot name='containerDialog'>这是内容</slot>
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
