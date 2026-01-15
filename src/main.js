import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./views/HomeView.vue'),
        },
        {
            path: '/products',
            name: 'products',
            component: () => import('./views/ProductListView.vue'), // Products Page
        },
        {
            path: '/product/:id',
            name: 'product-detail',
            component: () => import('./views/ProductDetail.vue')
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: () => import('./views/CheckoutView.vue')
        }
    ]
})

app.use(createPinia())
app.use(router)
app.mount('#app')
