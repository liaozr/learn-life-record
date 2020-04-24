<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .no-result{
    text-align: center;
    .no-result-icon{
      width: 86px;
      height: 90px;
      margin: 0 auto;       
      @include background('no-result@2x.png',center center,86px 90px);
    }
    .no-result-text{
      margin-top: 30px;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }
</style>