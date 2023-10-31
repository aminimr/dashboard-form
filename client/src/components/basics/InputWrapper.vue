<template>
<div class="flex column">
  <label class="q-mt-xs">
    {{label}}
  </label>
  <div>
    <slot/>
  </div>
</div>
</template>

<script>
export default {
  name: "DefaultInput",
  props:{
    label:String
  }
}
</script>

<style scoped>

</style>
