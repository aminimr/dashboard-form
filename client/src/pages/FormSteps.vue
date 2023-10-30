<template>
<section>
  <div class="text-center q-mt-lg text-h5">فرم {{ activeStep }}</div>
  <div class="absolute-center">
    <div v-for="form in forms" :key="form.id">
      <form-stats-priview  v-if="activeStep === form.id"   :form="form"  @setSteps="changeStep" :step="activeStep"/>
    </div>
  </div>

</section>
</template>

<script>
import FormStatsPriview from "components/FormStatsPriview.vue";
import {ref} from "vue";
import InputWrapper from "components/Basics/InputWrapper.vue";
import {useFormStore} from "stores/forms-store";
export default {
  name: "FormSteps",
  components:{
    InputWrapper,
    FormStatsPriview
  },
  methods:{
    changeStep(status){
        switch (status){
          case 'previousStep':
            if(this.activeStep >= 2){
              this.activeStep --;
            }
            break;
          default:
            this.activeStep ++;
        }
    }
  },
  setup(){
    const formStore = useFormStore()
    const activeStep = ref(1)
    const forms = formStore.$state.forms
    return{
      activeStep,
      forms
    }
  }
}
</script>

<style scoped>

</style>
