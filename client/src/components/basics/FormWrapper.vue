<template>
  <section class="q-pa-md flex items-center column">
    <div>
      <div class="row items-center">
        <div class="col">
          <h5>
            {{ label }}
          </h5>
        </div>
        <div class="col-auto">
          <slot name="header"/>
        </div>
      </div>
      <div>
        <slot/>
      </div>
    </div>
  </section>
</template>

<script>
import InputWrapper from "components/basics/InputWrapper.vue";

export default {
  name: "FormWrapper",
  components: {InputWrapper},
  props: {
    label: String
  }
}
</script>

<style scoped>

</style>
