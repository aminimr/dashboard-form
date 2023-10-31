<template>
  <form-wrapper label="فرم اطلاعات فردی">
    <template #header>
      <q-circular-progress
        show-value
        :value="progressValue.personalFormat"
        size="54px"
        :color="progressValue.personalColor"
      >%{{ progressValue.personalFormat }}
      </q-circular-progress>
    </template>
    <div class="flex column q-gutter-y-lg">
      <div class="flex q-gutter-md">
        <input-wrapper label="نام و نام خانوادگی (*)">
          <q-input :rules="[ (val, rules) => val !== '' || 'نام و نام خانوادگی وارد نشده است' ]"
                   v-model="modelValue.fullName" filled dense/>
        </input-wrapper>
        <input-wrapper label="ایمیل (*)">
          <div dir="ltr">
            <q-input :rules="[ (val, rules) => rules.email(val) || 'ایمیل وارد نشده است' ]" v-model="modelValue.email"
                     filled dense type="email">
              <template v-slot:prepend>
                <q-icon name="mail"/>
              </template>
            </q-input>
          </div>
        </input-wrapper>
        <input-wrapper label="موبایل">
          <q-input dir="ltr" v-model="modelValue.mobile" filled type="text" maxlength="11" dense/>
        </input-wrapper>
      </div>
      <div class="row q-gutter-md">
        <input-wrapper label="تاریخ تولد">
          <q-input v-model="modelValue.birthDate" filled dense mask="date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="modelValue.birthDate" calendar="persian" v-close-popup>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </input-wrapper>
        <input-wrapper label="زبان">
          <q-select style="width: 200px" hide-hint v-model="modelValue.languages"
                    :options="['فارسی','انگلیسی', 'آلمانی']" filled dense/>
        </input-wrapper>
        <input-wrapper label="جنسیت">
          <div class="q-gutter-x-sm">
            <q-radio v-model="modelValue.gender" val="male" label="مرد"/>
            <q-radio v-model="modelValue.gender" val="female" label="زن"/>
          </div>
        </input-wrapper>
      </div>
      <div class="row">
        <input-wrapper class="full-width" label="درباره من">
          <q-input
            filled
            dense
            v-model="modelValue.about"
            clearable
            type="textarea"
            label=""
          />
        </input-wrapper>
      </div>
    </div>
  </form-wrapper>

</template>

<script setup>
import {computed} from "vue";
import * as formProgressHelper from "src/utils/formProgressHelper";

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: Object
})

const progressValue = computed(() => formProgressHelper.calculate(props.modelValue))
</script>
