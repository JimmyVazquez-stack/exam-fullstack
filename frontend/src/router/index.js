import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../components/ProductView.vue'
import CategoriesView from '../components/CategoriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView,
    },
    // Mas rutas
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
    }
  ],
})

export default router
