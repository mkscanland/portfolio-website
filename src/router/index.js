import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

async function waitForImagesBeforeHashScroll() {
  await nextTick()
  const images = [...document.images]
  for (const image of images) image.loading = 'eager'

  let timeout
  try {
    await Promise.race([
      Promise.all(images.map((image) => image.decode?.().catch(() => {}))),
      new Promise((resolve) => {
        timeout = setTimeout(resolve, 5000)
      }),
    ])
  } finally {
    clearTimeout(timeout)
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      await waitForImagesBeforeHashScroll()
      return { el: to.hash }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/appraisals',
      name: 'appraisals',
      component: () => import('../views/DigitalAppraisals/DigitalAppraisals.vue'),
    },
    {
      path: '/rulesengine',
      name: 'rulesengine',
      component: () => import('../views/RulesEngine/RulesEngine.vue'),
    },
    {
      path: '/webapps',
      name: 'webapps',
      component: () => import('../views/WebApplications/WebApplications.vue'),
    },
    {
      path: '/randomforest',
      name: 'randomforest',
      component: () => import('../views/RandomForest/RandomForest.vue'),
    },
    {
      path: '/validations',
      name: 'validations',
      component: () => import('../views/LabValidations/LabValidations.vue'),
    },
    {
      path: '/itsystems',
      name: 'itsystems',
      component: () => import('../views/ITSystems/ITSystems.vue'),
    },
    {
      path: '/rebuild',
      name: 'rebuild',
      component: () => import('../views/InternalRebuild/InternalRebuild.vue'),
    },
    {
      path: '/annualreports',
      name: 'annualreports',
      component: () => import('../views/AnnualReports/AnnualReports.vue'),
    },
  ],
})

export default router
