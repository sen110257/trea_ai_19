import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Works from '../views/Works.vue'
import Columns from '../views/Columns.vue'
import Messages from '../views/Messages.vue'
import Cooperation from '../views/Cooperation.vue'
import WorkDetail from '../views/WorkDetail.vue'
import ColumnDetail from '../views/ColumnDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/works',
    name: 'Works',
    component: Works
  },
  {
    path: '/works/:id',
    name: 'WorkDetail',
    component: WorkDetail
  },
  {
    path: '/columns',
    name: 'Columns',
    component: Columns
  },
  {
    path: '/columns/:id',
    name: 'ColumnDetail',
    component: ColumnDetail
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/cooperation',
    name: 'Cooperation',
    component: Cooperation
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
