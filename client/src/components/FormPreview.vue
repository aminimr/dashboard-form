<template>
  <q-card v-if="form">
    <q-card-section>
      <h4 class="text-h6 q-ma-none">{{ form.fullName }}</h4>
      <div class="absolute-right q-ma-md">
        <q-circular-progress
          show-value
          :value="progress.total"
          size="34px"
          :color="progressColor"
        >
          %{{progress.total}}
        </q-circular-progress>
      </div>
    </q-card-section>
    <q-card-section>
      <p>
        <q-icon name="mail" size="xs"/>&nbsp;{{ form.email }}
      </p>
      <p v-if="form.education" class="text-amber-9">
        <q-icon size="xs" color="amber-9" name="workspace_premium"/>&nbsp;{{ form.education.caption }}
      </p>
    </q-card-section>
    <q-separator/>
    <q-card-actions class="row">
      <div class="col">
        <q-badge color="blue-7" text-color="white" v-if="form.draft">
          ذخیره موقت
        </q-badge>
      </div>
      <div class="col-auto flex q-gutter-x-sm">
        <q-btn :loading="loading" size="sm" round icon="edit" @click="$emit('edit', form)"/>
        <q-btn :loading="loading" size="sm" round icon="delete" @click="$emit('delete', form)"/>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import {computed} from "vue";
import * as formProgressHelper from 'src/utils/formProgressHelper'

const props = defineProps({
  form: Object,
  loading: Boolean
})

defineEmits(['edit', 'delete'])

const progress = computed(() => formProgressHelper.calculate(props.form))
const progressColor = computed(() => {
  const total = progress.value.total
  if (total > 70) return 'positive'
  else if (total > 40) return 'orange-8'
  return 'red-7'
})
</script>
