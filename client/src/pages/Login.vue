<template>
  <section dir="rtl">
    <q-form class="absolute-center q-gutter-y-md login" @submit="onSubmit">
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
            <q-btn class="full-width" color="green"  type="submit"> ورود</q-btn>
          </div>
    </q-form>
  </section>
</template>

<script>
import InputWrapper from "components/Basics/InputWrapper.vue";
import {reactive} from "vue";
import {useAuthStore} from "stores/auth-store";
export default {
  name: "Login",
  components:{
    InputWrapper
  },
  methods:{
    onSubmit(){
      const authStore = useAuthStore()
      authStore.login(this.payload)
    }
  },
  setup(){
    const payload = reactive({
      username:"user1",
      password:"P@ssword"
    })
    return{
      payload
    }
  }
}
</script>

<style scoped>
.login{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 15px 20px;
}
</style>
