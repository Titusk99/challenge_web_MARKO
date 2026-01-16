import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
    routes: [
        {
            path: '/',
            component: () => import('./views/HomeView.vue'),
        },
        {
            path: '/category/:id',
            name: 'category-root',
            component: () => import('./views/ProductListView.vue'),
        },
        {
            path: '/category/:gender/:slug',
            name: 'category-detail',
            component: () => import('./views/ProductListView.vue'), // Reuse ProductListView
        },
        {
            path: '/sales',
            name: 'sales',
            component: () => import('./views/ProductListView.vue'),
        },
        {
            path: '/new-arrivals',
            name: 'new-arrivals',
            component: () => import('./views/ProductListView.vue'),
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
            path: '/cart',
            name: 'cart',
            component: () => import('./views/CartView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: () => import('./views/CheckoutView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/RegisterView.vue')
        },
        {
            path: '/account',
            name: 'account',
            component: () => import('./views/ClientDashboardView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/admin',
            // name: 'admin', // Removed to avoid warning with default child
            component: () => import('./views/AdminDashboardView.vue'),
            meta: { requiresAuth: true, requiresAdmin: true },
            children: [
                {
                    path: '',
                    redirect: '/admin/products'
                },
                {
                    path: 'products',
                    name: 'admin-products',
                    component: () => import('./views/admin/AdminProducts.vue')
                },
                {
                    path: 'orders',
                    name: 'admin-orders',
                    component: () => import('./views/admin/AdminOrders.vue')
                },
                {
                    path: 'customers',
                    name: 'admin-customers',
                    component: () => import('./views/admin/AdminCustomers.vue')
                },
                {
                    path: 'settings',
                    name: 'admin-settings',
                    component: () => import('./views/admin/AdminSettings.vue')
                }
            ]
        },
        {
            path: '/shipping-returns',
            name: 'shipping-returns',
            component: () => import('./views/static/ShippingReturns.vue')
        },
        {
            path: '/size-guide',
            name: 'size-guide',
            component: () => import('./views/static/SizeGuideView.vue')
        },
        {
            path: '/faq',
            name: 'faq',
            component: () => import('./views/static/FAQ.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('./views/static/ContactUs.vue')
        },
        {
            path: '/terms',
            name: 'terms',
            component: () => import('./views/static/TermsConditions.vue')
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: () => import('./views/static/PrivacyPolicy.vue')
        },
        {
            path: '/cookies',
            name: 'cookies',
            component: () => import('./views/static/CookiePolicy.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/static/AboutView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('./views/NotFoundView.vue')
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const publicPages = ['/', '/login', '/register', '/products', '/checkout'];
    // Allow navigation to product details and categories (dynamic routes)
    const isPublic = publicPages.includes(to.path) || to.path.startsWith('/product/') || to.path.startsWith('/category/');
    const token = localStorage.getItem('token');

    // Simple check for now. Ideally we check expiration or validate with backend if critical.
    if (to.meta.requiresAuth && !token) {
        return next('/login');
    }

    if (to.meta.requiresAdmin) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                return next('/'); // Or 403 page
            }
        } else {
            return next('/login');
        }
    }

    next();
})

app.use(createPinia())
app.use(router)

app.mount('#app')
