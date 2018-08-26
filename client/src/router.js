import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/',
          name: 'articleContent',
          props: true,
          component: () => import('./components/ArticlesContent.vue')
        },
        {
          path: '/detail/:id',
          name: 'detailArticle',
          props: true,
          component: () => import('./components/DetailArticle.vue')
        }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('./views/Article.vue'),
      children: [
        {
          path: '/article/edit/:id',
          name: 'editArticle',
          props: true,
          component: () => import('./components/EditArticle.vue')
        }
      ]
    },
  ]
})
