import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    forms:[
      {
        formName:"personalInfoForm",
        id:1,
        title:"فرم اطلاعات فردی",
        formStatus:null,
        formFields:{
          fullName:null,
          email:null,
          mobile:null,
          birthDate:null,
        }
      },
      {
        formName:"addressForm",
        id:2,
        title:"فرم اطلاعات آدرس",
        formStatus:null,
        formFields:{
          state: null,
          city: null,
          street: null,
          description: null,
          postalCode: null,
        }
      },
      {
        formName:"educationsForm",
        id:3,
        title:"فرم اطلاعات تحصیلی",
        formStatus:null,
        formFields:{
          caption: null,
          media: [],
          level: null,
          from: null,
          to: null,
        }
      }
    ]
  }),
  getters: {
    forms: state => state.forms !== null,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
