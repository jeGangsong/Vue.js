import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { authenticate } from '@/utils/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/order/MainView.vue'),
      meta:{requiresAuth:true}
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/order/ListView.vue'),
      meta:{requiresAuth:true}
    },
    {
      path: '/orders/register',
      name: 'order-register',
      component: () => import('../views/order/RegisterView.vue'),
      meta:{requiresAuth:true}
    },
    {
      path: '/orders/register/:id',
      name: 'order-update',
      component: () => import('../views/order/RegisterView.vue'),
      meta:{requiresAuth:true}
    },
    {
      path: '/orders/:id',
      name: 'order-detail',
      component: () => import('../views/order/DetailView.vue'),
      meta:{requiresAuth:true}
    },

    // admin
    {
      path: '/admin/home',
      name: 'menus-home',
      component: () => import('../views/admin-menu/MainView.vue'),
      meta:{requiresAuth:false},
    },
    {
      path: '/admin/menus',
      name: 'menus',
      component: () => import('../views/admin-menu/ListView.vue'),
      meta:{requiresAuth:false},
    },
    {
      path: '/admin/menus/register',
      name: 'menus-register',
      component: () => import('../views/admin-menu/RegisterView.vue'),
      meta:{requiresAuth:false},
    },
    {
      path: '/admin/menus/:id',
      name: 'menus-detail',
      component: () => import('../views/admin-menu/DetailView.vue'),
      meta:{requiresAuth:false},
    },
    {
      path: '/admin/menus/register/:id',
      name: 'menus-update',
      component: () => import('../views/admin-menu/RegisterView.vue'),
      meta:{requiresAuth:false},
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/admin-menu/AuthView.vue'),
      meta:{requiresAuth:true},
    },
  ]
})

router.beforeEach((to,from,next)=>{
  console.log(to.name);
  if(to.path.includes("admin")){
    console.log(to);
    const flag = useAuthStore();
    //console.log(flag.flag);
    if(!flag.flag) return next('/auth');
    else if (to.name.includes("auth")) return next();
    else return next();
  }
  else{
    return next();
  }
  

})


export default router