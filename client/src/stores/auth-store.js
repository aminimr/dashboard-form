import {defineStore} from 'pinia';
import {api} from 'boot/axios'
import {useFormStore} from "stores/forms-store";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null
  }),
  getters: {
    isLoggedIn: state => !!state.userId
  },
  actions: {
    async clearSession() {
      const formStore = useFormStore()
      formStore.forms = []
      formStore.currentForm = null
      formStore.media = []
      this.userId = null
    },
    async login(payload) {
      try {
        const {data} = await api.post('auth/login', payload)
        const {success, data: userId} = data
        if (success) {
          await this.clearSession()
          this.userId = userId
        }
        return success
      } catch (ex) {
        // this.error = ex.message
        console.log(ex.message)
        return false
      }
    },
  },
  persist: {
    storage: sessionStorage,
    key: 'auth'
  },
});
