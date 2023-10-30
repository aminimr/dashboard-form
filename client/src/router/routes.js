import {useAuthStore} from "stores/auth-store";
import router from "src/router/index";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/form-steps', component: () => import('pages/FormSteps.vue') },
      { path: '/form-steps/1', component: () => import('pages/forms/PersonalInfoForm.vue') },
      { path: '/form-steps/2', component: () => import('pages/forms/AddressForm.vue') },
      { path: '/form-steps/3', component: () => import('pages/forms/DocumentsForm.vue') },

    ]
  },
  {
    path:'/login',
    component:()=>import('pages/Login.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]
// router.beforeEach(async (to, from, next) => {
//   const auth = useAuthStore()
//
//   if (auth.isLoggedIn) return next()
//
//   return next({path: 'login'})
// })

export default routes
