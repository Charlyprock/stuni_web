import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import IndexView from '@/views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: LoginView, },
    { path: '/profil', component: IndexView,
      children: [
        { path: '', name: 'student',
          children: [
            {path: '', name: 'student-list', component: () => import('@/views/StudentListView.vue')},
            {path: 'student-add', name: 'student-add', component: () => import('@/views/StudentAddView.vue')},
            {path: 'level', name: 'level', component: () => import('@/views/LevelView.vue')},
            {path: 'test', name: 'test', component: () => import('@/views/testView.vue')},
          ]
        },
        
      ],
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
