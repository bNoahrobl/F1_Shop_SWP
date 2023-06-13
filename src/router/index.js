import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '../views/SignUpView.vue';
import LogInView from '../views/LogInView.vue';
import ShoppingCartView from '../views/ShoppingCartView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { hideNavbar: false }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
    meta: { hideNavbar: true }
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCartView,
    meta: { hideNavbar: false }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView,
    meta: { hideNavbar: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

let isFirstNavigation = true;

router.beforeEach((to, _, next) => {
  if (isFirstNavigation) {
    isFirstNavigation = false;
    next();
    return;
  }
  next();
});

router.afterEach(() => {
  isFirstNavigation = false;
});


export default router;
