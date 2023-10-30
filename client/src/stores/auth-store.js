import { defineStore } from 'pinia';
import {api} from 'boot/axios'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    id:null,
    username:"",
    password:"",
    fullname:"",
  }),
  getters: {
    isLoggedIn : state => state.id !== null
  },
  actions: {
   async login(payload) {
     api.post('auth/login',payload).then(({data})=>{
       this.username = data.username
       this.password = data.password
       this.id = data.id
       this.fullName = data.fullName
     })
    },
  },
});
