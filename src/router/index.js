import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '../views/SignUpView.vue';
import LogInView from '../views/LogInView.vue';

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

  if (to.name === 'home') {
    if (to.matched[0].instances.default) {
      to.matched[0].instances.default.showNavbar = true;
    }
  } else {
    if (to.matched[0].instances.default) {
      to.matched[0].instances.default.showNavbar = !to.meta.hideNavbar;
    }
  }

  next();
});

router.afterEach(() => {
  isFirstNavigation = false;
});


export default router;
