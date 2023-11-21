import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Login from '../views/Login.vue';
import Songs from '../views/Songs.vue';
import Albums from '../views/Albums.vue';
import About from '../views/About.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Songs },
  { path: '/albums', component: Albums },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// LV
// Tiek izveidots middleware / starpprogrammatūra kura katru reizi veiks pārbaudi pirms tiks nomainīta rūtera adrese
// arguments to glabā adresi uz kurieni gribam iet
// arguments from glabā adresi no kurienes mēs nākam

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (!store.authenticated && to.path !== '/login') {
    next('/login');
  } else if (store.authenticated && to.path === '/login') {
    next('/');
  } else {
    next();
  }
});

export default router;

