<template>
 <form-wrapper label="فرم اطلاعات فردی">
   <div class="flex column q-gutter-y-lg">
     <div class="row q-gutter-md">
       <input-wrapper label=" نام و نام خانوادگی">
         <q-input filled dense/>
       </input-wrapper>
       <input-wrapper  label="ایمیل">
         <div dir="ltr">
           <q-input filled dense  v-model="email" type="email" suffix="@gmail.com">
             <template v-slot:prepend>
               <q-icon name="mail" />
             </template>
           </q-input>
         </div>
       </input-wrapper>
       <input-wrapper label="موبایل">
         <q-input filled type="number"  dense/>
       </input-wrapper>
     </div>
     <div class="row q-gutter-md">
       <input-wrapper label="تاریخ تولد">
         <q-input filled  v-model="date" dense mask="date" :rules="['date']">
           <template v-slot:append>
             <q-icon name="event" class="cursor-pointer">
               <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                 <q-date calendar="persian"  v-model="date">
                   <div class="row items-center justify-end">
                     <q-btn v-close-popup label="Close" color="primary" flat />
                   </div>
                 </q-date>
               </q-popup-proxy>
             </q-icon>
           </template>
         </q-input>
       </input-wrapper>
       <input-wrapper label="زبان">
         <q-input filled dense/>
       </input-wrapper>
       <input-wrapper label="جنسیت">
         <div class="q-gutter-x-sm">
           <q-radio  v-model="shape" val="male" label="مرد" />
           <q-radio  v-model="shape" val="female" label="زن" />
         </div>
       </input-wrapper>
     </div>
     <div class="row">
       <input-wrapper class="full-width" label="درباره من">
         <q-input
           autogrow
           filled
           dense
           v-model="textareaModel"
           clearable
           type="textarea"
           label=""
         />
       </input-wrapper>
     </div>
     <div class="flex justify-end q-mt-lg">
       <q-btn color="primary" @click="updateInfo()"  label="ثبت موقت"/>
     </div>
   </div>
   <q-dialog v-model="dialog.showDialog">
     <q-card dir="rtl" dense style="width: 300px">
       <q-card-section v-if="dialog.type === 'success' ">
         ذخیره سازی اطلاعات انجام شد
       </q-card-section>
       <q-card-section v-else>
         ذخیره سازی اطلاعات با مشکل مواجه شد
       </q-card-section>
     </q-card>
   </q-dialog>
 </form-wrapper>

</template>

<script>
import InputWrapper from "components/Basics/InputWrapper.vue";
import FormWrapper from "components/Basics/FormWrapper.vue";
export default {
  name: "PersonalInfoForm",
  components:{
    FormWrapper,
    InputWrapper,
  },
  data(){
    return{
      dialog:{
        showDialog:false,
        type:null
      }
    }
  },
  methods:{
    updateInfo(){
      this.dialog = {
        showDialog:true,
        type:"error"
      }
    }
  }
}
</script>

<style scoped>

</style>
