<template>
  <q-layout view="hHh lpR lfr">
    <header-component />
    <sidebar-component />
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer-component />
  </q-layout>
</template>
<script setup>
import HeaderComponent from "components/HeaderComponent.vue";
import FooterComponent from "components/FooterComponent.vue";
import SidebarComponent from "components/SidebarComponent.vue";
</script>
