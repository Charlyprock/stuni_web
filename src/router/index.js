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
            {path: '', name: 'student-list', component: () => import('@/views/student/StudentListView.vue')},
            {path: 'student-add', name: 'student-add', component: () => import('@/views/student/StudentAddView.vue')},
            {path: 'student-detail/:id', name: 'student-detail', component: () => import('@/views/student/StudentDetailView.vue')},
            {path: 'level', name: 'level', component: () => import('@/views/LevelView.vue')},
            {path: 'department', name: 'department', component: () => import('@/views/DepartmentView.vue')},
            {path: 'speciality', name: 'speciality', component: () => import('@/views/SpecialityView.vue')},
            {path: 'classe', name: 'classe', component: () => import('@/views/ClasseView.vue')},
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
