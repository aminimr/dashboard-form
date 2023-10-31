<template>
  <q-page padding>
    <section-title title="لیست فرم ها">
      <q-spinner v-if="loading"/>
      <q-btn :loading="loading" icon="refresh" round flat size="md" @click="loadForms"></q-btn>
    </section-title>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4 col-lg-3" v-for="form in forms" :key="form._id">
        <form-preview :loading="loading" :form="form" @edit="editForm" @delete="deleteForm"/>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {useFormStore} from "stores/forms-store";
import {computed} from "vue";
import FormPreview from "components/FormPreview.vue";
import { Dialog } from 'quasar'
import {useRouter} from 'vue-router'

const router = useRouter()
const formStore = useFormStore()
const forms = computed(() => formStore.forms)
const loading = computed(() => formStore.loading)
const loadForms = () => formStore.fetchForms()
const deleteForm = (form) => {
  const cb = () => formStore.deleteForm(form._id)
  Dialog.create({
    title: 'حذف فرم',
    message: 'آیا از حذف این فرم اطمینان دارید؟',
    cancel: true,
    persistent: true
  }).onOk(cb)
}
const editForm = (form) => router.push({name: 'form_build', params: {id: form._id}})

loadForms()
</script>
