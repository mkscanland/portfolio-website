import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/webapps',
      name: 'webapps',
      component: () => import('../views/WebApplications.vue'),
    },
    {
      path: '/randomforest',
      name: 'randomforest',
      component: () => import('../views/RandomForest.vue'),
    },
    {
      path: '/validations',
      name: 'validations',
      component: () => import('../views/LabValidations.vue'),
    },
    {
      path: '/itsystems',
      name: 'itsystems',
      component: () => import('../views/ITSystems.vue'),
    },
    {
      path: '/rebuild',
      name: 'rebuild',
      component: () => import('../views/InternalRebuild.vue'),
    },
    {
      path: '/annualreports',
      name: 'annualreports',
      component: () => import('../views/AnnualReports.vue'),
    },
  ],
})

export default router
