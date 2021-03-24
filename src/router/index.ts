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
        component: () => import('@/views/News/index.vue'),
        meta: {
          title: "新闻",
          subTitle: "管理新闻的添加、修改、与删除",
          selectedKey: "/news"
        }
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/Tag.vue'),
        meta: {
          title: "标签",
          subTitle: "管理新闻标签的添加、修改、与删除",
          selectedKey: "/tag"
        }
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/Comment.vue'),
        meta: {
          title: "评论",
          subTitle: "管理评论的添加、与删除",
          selectedKey: "/comment"
        }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
