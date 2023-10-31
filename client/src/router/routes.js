const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {name: 'dashboard', path: '', component: () => import('pages/IndexPage.vue')},
      {name: 'forms',path: '/forms', component: () => import('pages/FormList.vue')},
      {name: 'form_build',path: '/form/:id', component: () => import('pages/FormBuild.vue')},

      // {path: '/form-steps', component: () => import('pages/FormSteps.vue')},
      // {path: '/form-steps/1', component: () => import('components/forms/PersonalInfoForm.vue')},
      // {path: '/form-steps/2', component: () => import('components/forms/AddressForm.vue')},
      // {path: '/form-steps/3', component: () => import('components/forms/DocumentsForm.vue')},
    ].map(r=> ({...r, meta: { requiresAuth: true }}))
  },
  {
    path: '/public',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('pages/Login.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
