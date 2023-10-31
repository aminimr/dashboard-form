import {boot} from "quasar/wrappers";
import SectionTitle from 'src/components/SectionTitle.vue'
import PersonalInfoForm from "components/forms/PersonalInfoForm.vue";
import DocumentsForm from "components/forms/DocumentsForm.vue";
import AddressForm from "components/forms/AddressForm.vue";
import FormWrapper from "components/basics/FormWrapper.vue";
import InputWrapper from "components/basics/InputWrapper.vue";

export default boot(({app}) => {
  app.component('SectionTitle', SectionTitle)
  app.component('PersonalInfoForm', PersonalInfoForm)
  app.component('DocumentsForm', DocumentsForm)
  app.component('AddressForm', AddressForm)
  app.component('FormWrapper', FormWrapper)
  app.component('InputWrapper', InputWrapper)
})
