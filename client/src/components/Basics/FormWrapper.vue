<template>
  <section dir="rtl" class="q-pa-md flex  items-center column">
      <div>
        <div>
          <h5>
            {{ label }}
          </h5>
        </div>
        <div>
          <slot/>
        </div>
      </div>
  </section>
</template>

<script>
import InputWrapper from "components/Basics/InputWrapper.vue";

export default {
  name: "FormWrapper",
  components: {InputWrapper},
  props:{
    label:String
  }
}
</script>

<style scoped>

</style>
