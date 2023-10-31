<template>
  <q-page padding class="column justify-center">
    <div class="row justify-center">
      <div class="col-12 col-md-auto" style="width: 400px;">
        <q-card class="shadow-7">
          <q-card-section>
            <q-form class="q-gutter-y-md" @submit="onSubmit">
              <div class="text-body1 q-mb-sm">ورود به سیستم</div>
              <div class="full-width">
                <input-wrapper label="نام کاربری">
                  <q-input v-model="payload.username" dense/>
                </input-wrapper>
              </div>
              <div class="full-width">
                <input-wrapper label="رمز عبور">
                  <q-input v-model="payload.password" dense type="password"/>
                </input-wrapper>
              </div>
              <div class="full-width">
                <q-btn class="full-width" color="green" type="submit"> ورود</q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import InputWrapper from "components/basics/InputWrapper.vue";
import {ref} from "vue";
import {useAuthStore} from "stores/auth-store";
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()
const payload = ref({
  username: "user1",
  password: "P@ssword"
})

const onSubmit = async () => {
  const authStore = useAuthStore()
  const success = await authStore.login(payload.value)
  console.log('success', success)
  if (success && authStore.isLoggedIn) {
    const redirectTo = route.query.redirect ?? '/forms'
    await router.replace(redirectTo)
  }
}
</script>
