import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import FormView from '../views/FormView.vue'
import ViewItem from '../views/ViewItem.vue'

const routes = [
  { path: '/', name: 'list', component: ListView },
  { path: '/new', name: 'new', component: FormView },
  { path: '/edit/:id', name: 'edit', component: FormView, props: true },
  { path: '/view/:id', name: 'view', component: ViewItem, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router