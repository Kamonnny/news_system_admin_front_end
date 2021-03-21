import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from "@/components/Layout.vue"

const routes: Array<RouteRecordRaw> = [

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    name: 'index',
    component: Layout,
    redirect: "/news",
    children: [
      {
        path: 'news',
        name: 'News',
        component: () => import('@/views/News.vue'),
        meta:{
          showPageHeader:true,
          title: "新闻",
          subTitle: "管理新闻的添加、修改、与删除",
        }
      },
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
