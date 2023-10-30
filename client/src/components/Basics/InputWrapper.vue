<template>
  <label>
   {{label}}
  </label>
  <div>
    <slot/>
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
