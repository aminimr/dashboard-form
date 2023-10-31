<template>
  <q-page padding class="column">
    <q-stepper
      v-if="formStore.currentForm"
      v-model="currentStep"
      ref="stepper"
      color="primary"
      class="full-height col-grow"
      keep-alive
      animated
      flat
    >
      <q-step
        :name="step.index"
        :title="step.title"
        :icon="step.icon"
        :done="currentStep > step.index"
        :key="step.index"
        v-for="step in steps"
      >
        <component :is="step.component" v-model="formStore.currentForm"/>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="flex q-gutter-md">
          <q-btn v-if="currentStep > 1" color="primary" @click="$refs.stepper.previous()" icon="chevron_right" outline
                 label="قبلی"/>
          <q-space/>
          <q-btn v-if="currentStep < (steps.length)" @click="onNextClicked" icon-right="chevron_left"
                 color="primary" label="بعدی"/>
          <q-btn v-if="(currentStep === steps.length)" @click="saveAsDraft" icon="save_as" outline color="primary"
                 label="ذخیره موقت"/>
          <q-btn v-if="(currentStep === steps.length)" @click="save" color="primary" label="ذخیره نهایی"/>
        </q-stepper-navigation>
      </template>
    </q-stepper>
    <div class="absolute-full flex justify-center items-center" v-else>
      <q-spinner/>
    </div>
  </q-page>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {computed, onMounted, ref} from "vue";
import {useFormStore} from "stores/forms-store";
import {Notify} from "quasar";
import {api} from "boot/axios";

const formStore = useFormStore()
const route = useRoute()
const router = useRouter()
// const form = ref(null)
const formId = ref(route.params.id)
const stepper = ref(null)
const currentStep = ref(1)
const steps = [
  {
    index: 1,
    title: 'اطلاعات فردی',
    component: 'PersonalInfoForm',
    icon: 'settings',
    doneValidator: data => {
      let allowDone = true
      if (!data.email) {
        Notify.create({
          type: 'info',
          message: 'ایمیل وارد نشده است.'
        })
        allowDone = false
      } else if (!data.fullName) {
        Notify.create({
          type: 'info',
          message: 'نام و نام خانوادگی وارد نشده است.'
        })
        allowDone = false
      }
      return allowDone
    }
  },
  {
    index: 2,
    title: 'اطلاعات محل سکونت',
    component: 'AddressForm',
    icon: 'settings',
    doneValidator: data => {
      let allowDone = true
      if (!data.address?.city) {
        Notify.create({
          type: 'info',
          message: 'شهر وارد نشده است.'
        })
        allowDone = false
      }
      return allowDone
    }
  },
  {
    index: 3,
    title: 'اطلاعات سوابق تحصیلی',
    component: 'DocumentsForm',
    icon: 'settings',
    doneValidator: data => {
      return true
    }
  }
]

if (route.query.step) currentStep.value = parseInt(route.query.step)

onMounted(async () => {
  if (!formStore.currentForm || formStore.currentForm?._id !== formId.value)
    await formStore.getById(formId.value)
})

const onNextClicked = async () => {
  if (steps[currentStep.value - 1].doneValidator(formStore.currentForm)) stepper.value.next()
}

const uploadMedia = async () => {
  try {
    const images = [...formStore.media]
    if (images.length === 0) return
    formStore.loading = true
    const formData = new FormData()

    const notify = Notify.create({
      message: 'در حال آپلود مدارک...',
      caption: '0%',
      group: false, // required to be updatable
      timeout: 0, // we want to be in control when it gets dismissed
      spinner: true,
    })

    for (const file of images) {
      formData.append('files', file)
    }
    const {data} = await api.post('/forms/upload', formData, {
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })
    console.log(data)
    if (data.success) {
      notify({
        message: 'مدارک با موفقیت آپلود شد.',
        caption: '100%',
        type: 'positive',
        timeout: 2500
      })
      formStore.currentForm.education.media = [...data.data]
    }
  } finally {
    formStore.loading = false
  }
}

const savedSuccessfully = async () => {
  Notify.create({
    type: 'positive',
    message: 'اطلاعات مورد نظر با موفقیت ذخیره شد.',
    caption: 'ذخیره اطلاعات'
  })

  await router.replace({name: 'forms'})
}
const saveAsDraft = async () => {
  await uploadMedia()
  await formStore.saveChanges(true)
  await savedSuccessfully()
}
const save = async () => {
  await uploadMedia()
  await formStore.saveChanges(false)
  await savedSuccessfully()
}
</script>
