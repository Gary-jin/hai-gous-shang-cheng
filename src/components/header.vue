<template>
  <div class="header flex_rowC BT_2 PB_2">
    <slot name="left">
      <div @click="$emit('click-left')" :class="left.icon?'iconfont ' + left.icon:''"
        class="flex_grow_1 W_5 textL PL_3">{{left.text}}</div>
    </slot>
    <slot name="center">
      <div @click="$emit('click-center')" :class="center.icon?'iconfont ' + center.icon:''"
        class="fontS_16 W_5 flex_grow_2 textC">{{center.text}}</div>
    </slot>
    <slot name="right">
      <div @click="$emit('click-right')" :class="right.icon?'iconfont ' + right.icon:''"
        class="flex_grow_1 W_5 textR PR_3">{{right.text}}</div>
    </slot>
  </div>
</template>
<script>
  export default {
    name: "via-header",
    data() {
      return {

      };
    },
    props: {
      left: {
        type: Object,
        default: function () {
          return {
            text: "",
            icon: "iconxiazai6"
          };
        }
      },
      center: {
        type: Object,
        default: function () {
          return {
            text: "标题",
            icon: ""
          };
        }
      },
      right: {
        type: Object,
        default: function () {
          return {
            text: "",
            icon: ""
          };
        }
      }
    },
    computed: {},
    mounted() {},
    methods: {}
  };
</script>

<style scoped>
</style>