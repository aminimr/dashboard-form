<template>
  <q-layout dir="rtl" view="lHh Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'bg-secondary' : 'bg-primary'">
      <q-toolbar>
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      side="right"
      v-model="drawerRight"
      show-if-above
      :width="200"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'"
    >
      <q-scroll-area class="fit">
        <q-list>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <router-link :to="menuItem.path">
            <q-item :class="$q.dark.isActive ? 'text-grey-9' : 'text-grey-4'" clickable :active="menuItem.label === 'Outbox'" v-ripple>

              <q-item-section avatar>
                <q-icon  :name="menuItem.icon" />
              </q-item-section>

               <q-item-section class="text-subtitle1">

                 {{ menuItem.label }}

               </q-item-section>
            </q-item>
            </router-link>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',


  setup () {
    const menuList = [
      {
        icon: 'dashboard',
        label: 'داشبورد',
        separator: true,
        path:'/'
      },
      {
        icon: 'folder',
        label: 'فرم اطلاعات',
        separator: true,
        path:'/form-steps'
      },
      {
        icon: 'checklist_rtl',
        label: 'لیست انجام',
        separator: true,
        path:'/'
      },
      {
        icon: 'settings',
        label: 'تنظیمات',
        separator: true,
        path:'/'
      },
    ]
    return {
      drawerRight: ref(false),
      menuList
    }
  }
})
</script>
