import {boot} from 'quasar/wrappers'
import axios from 'axios'
import {useAuthStore} from "stores/auth-store";
import {Dialog} from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({baseURL: 'http://localhost:3001'})

export default boot(({app}) => {
  app.config.globalProperties.$axios = axios

  api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth.userId) {
      config.headers['userid'] = auth.userId
    }
    return config
  })

  api.interceptors.response.use(function (response) {
    // console.log('response', response)
    if(response.data?.success === false){
      Dialog.create({
        message: response.data?.message ?? 'خطا در سرور',
        title: 'خطا',
        type: 'info'
      })
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export {api}
