<template>
  <form-wrapper label="فرم سوابق تحصیلی" v-if="modelValue.education">
    <template #header>
      <q-circular-progress
        show-value
        :value="progressValue.educationFormat"
        size="54px"
        :color="progressValue.educationColor"
      >%{{ progressValue.educationFormat }}
      </q-circular-progress>
    </template>
    <div class="flex column q-gutter-y-lg">
      <div class="row q-col-gutter-md">
        <input-wrapper label="رشته" class="col-12 col-md-6 col-lg-3">
          <q-input v-model="modelValue.education.caption" filled dense/>
        </input-wrapper>
        <input-wrapper label="مقطع" class="col-12 col-md-6 col-lg-3">
          <q-input v-model="modelValue.education.level" filled dense/>
        </input-wrapper>
        <input-wrapper label="از" class="col-12 col-md-6 col-lg-3">
          <q-input v-model="modelValue.education.from" filled dense type="number"/>
        </input-wrapper>
        <input-wrapper label="تا" class="col-12 col-md-6 col-lg-3">
          <q-input v-model="modelValue.education.to" filled dense type="number"/>
        </input-wrapper>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <input-wrapper class="full-width" label="مدارک">
            <q-file dense filled multiple bottom-slots v-model="formStore.media" counter accept=".jpg, image/*">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent/>
              </template>
              <template v-slot:append>
                <q-icon name="close" @click.stop.prevent="formStore.media = []" class="cursor-pointer"/>
              </template>
            </q-file>
          </input-wrapper>
        </div>
      </div>
      <div class="flex q-gutter-md">
        <q-img width="64px" height="64px" :src="imageUrl" v-for="(imageUrl,index) in modelValue.education.media"
               :key="index"/>
      </div>
    </div>
  </form-wrapper>

</template>
<script setup>
import {computed} from "vue";
import {useFormStore} from "stores/forms-store";
import * as formProgressHelper from "src/utils/formProgressHelper";

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: Object
})

const formStore = useFormStore()

const progressValue = computed(() => formProgressHelper.calculate(props.modelValue))
</script>
