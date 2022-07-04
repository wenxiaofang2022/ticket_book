<template>
<svg :class="className" aria-hidden="true">
  <use :xlink:href="iconName" xmlns="http://www.w3.org/2000/svg"/>
</svg>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  class: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
const iconName = computed(()=>`#icon-${props.icon}`);
const className = computed(()=> {
  console.log(props.class, 'props.class');
  if (props.class) {
        return `svg-icon icon-${props.class}`
      }
      return 'svg-icon'
});
</script>

<style lang='scss'>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>