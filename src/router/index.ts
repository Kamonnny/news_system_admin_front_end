import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: "啊！页面呢？！！！"
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
