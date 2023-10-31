<template>
  <div class="text-body1 text-bold row q-col-gutter-md items-center q-mb-md">
    <div class="col">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="col-auto">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>
