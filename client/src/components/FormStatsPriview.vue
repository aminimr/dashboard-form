<template>
<div class="forms-stats-preview  flex column items-center justify-between">
  <div>
    <q-circular-progress
      show-value
      font-size="32px"
      :value="80"
      size="130px"
      :thickness="0.15"
      color="green"
      track-color="grey-3"
      class="q-ma-md"
    >
      {{ 80 }}%
    </q-circular-progress>
  </div>
  <div class="text-subtitle1">
    {{form.title}}
  </div>
   <div style="min-width: 140px" class="flex-center">
     <div>
       <router-link :to="`/form-steps/${form.id}`">
         <q-btn class="full-width" color="primary" text-color="grey-1" label="نمایش فرم" />
       </router-link>
     </div>
     <div class="q-mt-sm flex q-gutter-x-xs">
       <q-btn :disable="step <= 1" @click="$emit('setSteps' , 'previousStep')"  color="green" text-color="grey-1" size="14px" label="مرحله قبل"/>
       <q-btn :disable="step >= maxSteps"  @click="$emit('setSteps' , 'nextStep')"  color="green" text-color="grey-1" size="14px" label="مرحله بعد"/>
<!--       <q-btn v-else @click="$emit('setSteps' , 'nextStep')"  color="green" text-color="grey-1" size="14px" label="ثبت اطلاعات"/>-->
     </div>
   </div>
</div>
</template>

<script>

export default {
  name: "FormStatsPriview",
  props:{
    step:Number,
    form:Object,
    maxSteps:Number
  }
}
</script>

<style scoped>
.forms-stats-preview{
  min-height: 400px;
  min-width: 200px;
}
</style>
