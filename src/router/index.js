import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'List',
    component: HomeView
  },
  {
    path: '/create',
    name: 'Register',
    component: () => import('../views/CreateView.vue')
  },
  {
    path: '/patient/:id',
    name: 'Patient',
    component: () => import('../views/PatientView.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/EditView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
