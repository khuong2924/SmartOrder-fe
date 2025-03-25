import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('@/views/Home.vue');
const Login = () => import('@/views/Login.vue');
const Tables = () => import('@/views/Tables.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/table',
    name: 'Tables',
    component: Tables,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Add navigation guard
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token');
  
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     // Redirect to login if trying to access protected route without auth
//     next('/login');
//   } else if (to.path === '/login' && isAuthenticated) {
//     // Redirect to home if already logged in
//     next('/table');
//   } else {
//     next();
//   }
// });

export default router;


