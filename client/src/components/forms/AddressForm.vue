<template>
  <form-wrapper label="فرم آدرس محل سکونت">
    <template #header>
      <q-circular-progress
        show-value
        :value="progressValue.addressFormat"
        size="54px"
        :color="progressValue.addressColor"
      >%{{ progressValue.addressFormat }}
      </q-circular-progress>
    </template>
    <div class="flex column q-gutter-y-lg" v-if="modelValue.address">
      <div class="row q-gutter-md">
        <input-wrapper label="استان">
          <q-input v-model="modelValue.address.state" filled dense/>
        </input-wrapper>
        <input-wrapper label="شهر (*)">
          <q-select style="width: 200px" hide-hint v-model="modelValue.address.city"
                    :rules="[(val, rules) => val!=='' || 'شهر وارد نشده است']"
                    :options="['تهران','مشهد','شیراز','اصفهان']" filled dense/>
        </input-wrapper>
        <input-wrapper label="خیابان">
          <q-input v-model="modelValue.address.street" filled dense/>
        </input-wrapper>
        <input-wrapper label="کد پستی">
          <q-input v-model="modelValue.address.postalCode" filled type="number" dense/>
        </input-wrapper>
      </div>
      <div class="row">
        <input-wrapper class="full-width" label="توضیحات بیشتر">
          <q-input
            filled
            dense
            v-model="modelValue.address.description"
            clearable
            type="textarea"
            :rows="10"
            label=""
          />
        </input-wrapper>
      </div>
    </div>
  </form-wrapper>

</template>

<script setup>
import {computed, onMounted} from "vue";
import * as formProgressHelper from "src/utils/formProgressHelper";

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: Object
})

const progressValue = computed(() => formProgressHelper.calculate(props.modelValue))

</script>
