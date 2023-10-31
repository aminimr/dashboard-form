<template>
  <q-drawer
    side="left"
    v-model="showSidebar"
    show-if-above
    :width="200"
    :breakpoint="500"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'"
  >
    <q-scroll-area class="fit">
      <q-list>
        <q-item @click="menuClicked(menuItem)" v-for="(menuItem, index) in menuList" :key="index"
                :to="menuItem.path !== '/logout' ? menuItem.path : undefined"
                :class="$q.dark.isActive ? 'text-grey-9' : 'text-grey-4'" clickable
                :active="menuItem.label === 'Outbox'" v-ripple>
          <q-item-section avatar>
            <q-icon :name="menuItem.icon"/>
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "stores/auth-store";

const router = useRouter()
const auth = useAuthStore()

const showSidebar = ref(true)
const menuList = [
  {
    icon: 'dashboard',
    label: 'داشبورد',
    separator: true,
    path: '/'
  },
  {
    icon: 'folder',
    label: 'لیست فرم ها',
    separator: true,
    path: '/forms'
  },
  {
    icon: 'checklist_rtl',
    label: 'حساب کاربری',
    separator: true,
    path: '/'
  },
  {
    icon: 'settings',
    label: 'تنظیمات',
    separator: true,
    path: '/'
  },
  {
    icon: 'logout',
    label: 'خروج از سیستم',
    separator: true,
    path: '/logout'
  },
]
const menuClicked = async (menu) => {
  if (menu.path === '/logout') {
    auth.userId = null
    await router.replace({
      name: 'login'
    })
  }
}
</script>
