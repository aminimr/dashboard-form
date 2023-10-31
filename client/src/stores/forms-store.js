import {defineStore} from 'pinia';
import {api} from 'boot/axios'

export const useFormStore = defineStore('form', {
  state() {
    return {
      forms: [],
      loading: false,
      currentForm: null,
      media: []
    }
  },
  actions: {
    async updateForms(payload) {
      console.log(payload)
    },
    async fetchForms() {
      try {
        this.loading = true
        const {data} = await api.get('/forms')
        this.forms = data.data
      } catch (ex) {
        console.log(ex)
      } finally {
        this.loading = false
      }
    },
    async getById(id) {
      const {data} = await api.get(`/forms/${id}`)
      // console.log('data', data)
      this.currentForm = null
      if (data.success) {
        const defaultFormModel = {
          address: {
            state: '',
            city: '',
            description: '',
            postalCode: ''
          },
          education: {
            caption: '',
            level: '',
            from: null,
            to: null,
            media: []
          },
          birthDate: '',
          languages: '',
          gender: '',
          about: '',
          email: '',
          mobile: '',
          fullName: ''
        }
        this.currentForm = {
          ...defaultFormModel,
          ...data.data
        }
      }
      return this.currentForm
    },
    async saveChanges(asDraft = true) {
      const formModel = {
        ...this.currentForm ?? {}
      }
      const formId = formModel._id
      delete formModel._id
      delete formModel.__v
      return api.patch(`/forms/${formId}`, {
        ...formModel,
        draft: asDraft
      })
    },
    async deleteForm(id) {
      try {
        this.loading = true
        await api.delete(`/forms/${id}`)
        this.forms = this.forms.filter(x => x._id !== id)
      } catch (ex) {
        console.log(ex)
      } finally {
        this.loading = false
      }
    }
  },
  persist: {
    storage: sessionStorage,
    key: 'forms'
  },
});
