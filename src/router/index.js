import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home"
import Welcome from "../components/Home/Welcome";
import Users from "../components/users/Users";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    redirect: '/home/welcome',
    component: Home,
    children: [
      {
        path: '/home/welcome',
        component: Welcome
      },
      {
        path: '/home/users',
        component: Users
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  to.meta.keepAlive = true
  if (to.path === '/login')  return next()
  const token = window.sessionStorage.getItem('token')
  if (!token)return next('/login')
  next()
})

export default router
