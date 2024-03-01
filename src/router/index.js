import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/ridecar',
      component: () => import('@/views/driverlist/rideCarPage.vue')
    }, // 点击打车go按钮，跳转到这个输入终点的页面
    {
      path: '/driverlist',
      component: () => import('@/views/driverlist/driverListPage.vue')
    }, // 附近司机列表详情页，输入终点站地址后点击GO按钮跳转到这个页面
    {
      path: '/driverdetails',
      component: () => import('@/views/driverlist/driverDetailsPage.vue')
    }, // 司机详情页
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/layout/home',
      children: [
        {
          path: '/layout/home',
          component: () => import('@/views/layout/homePage.vue')
        },
        {
          path: '/layout/category',
          component: () => import('@/views/layout/categoryPage.vue')
        },
        {
          path: '/layout/pay',
          component: () => import('@/views/layout/payPage.vue')
        },
        {
          path: '/layout/user',
          component: () => import('@/views/layout/userPage.vue')
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const useStore = useUserStore()
//   // 如果没有token且访问的是非登录页，则跳转到登录页
//   if (!useStore.token && to.path !== '/login') {
//     next('/login')
//   } else {
//     // 其他情况正常放行
//     next()
//   }
// })

export default router
