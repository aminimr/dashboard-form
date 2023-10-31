<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

   <footer-component />

  </q-layout>
</template>

<script>
import FooterComponent from "components/FooterComponent.vue";

export default {
  name: "PublicLayout",
  components: {FooterComponent}
}
</script>
