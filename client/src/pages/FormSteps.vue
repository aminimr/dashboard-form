<template>
<section>
  <div class="text-center q-mt-lg text-h5">فرم {{ activeStep }}</div>
  <div class="absolute-center">
    <form-stats-priview @setSteps="changeStep"/>
  </div>
</section>
</template>

<script>
import FormStatsPriview from "components/FormStatsPriview.vue";
import {ref} from "vue";
export default {
  name: "FormSteps",
  components:{
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
    const activeStep = ref(1)
    return{
      activeStep
    }
  }
}
</script>

<style scoped>

</style>
