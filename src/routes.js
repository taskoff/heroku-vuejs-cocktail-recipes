import List from './components/recipes/List.vue';
import Details from './components/recipes/Details';
import AddRecipe from './components/recipes/AddRecipe';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import EditRecipe from './components/recipes/EditRecipe';
import service from './mixins/test.js'
import NotFound from './components/NotFound';

import Home from './components/Home.vue';

const routes = [
    {
        path: '/',
        component: Home,
        },
    {
        path: '/list',
        component: List,
        beforeEnter: (to, from, next) => {
            if (!service.isLogin) {
                next('/login')
            }
            next()
          }
    },
    {
        path: '/details/:id',
        component: Details,
        beforeEnter: (to, from, next) => {
            if (!service.isLogin) {
                next('/login')
            }
            next()
          }
    },
    {
        path: '/edit/:id',
        component: EditRecipe,
        beforeEnter: (to, from, next) => {
            if (!service.isLogin) {
                next('/login')
            }
            next()
          }
    },
    {
        path: '/add',
        component: AddRecipe,
        beforeEnter: (to, from, next) => {
            if (!service.isLogin) {
                next('/login')
            }
            next()
          }
    },
    {
        path: '/register',
        component: Register,
        beforeEnter: (to, from, next) => {
            if (service.isLogin) {
                next('/list')
            }
            next()
          }
    },
    {
        path: '/login',
        component: Login,
        
    },
    {
        path: '/profile',
        component: Profile,
        beforeEnter: (to, from, next) => {
            if (!service.isLogin) {
                next('/list')
            }
            next()
          }
    },
    {
        path: '*',
        component: NotFound
    }

]

export default routes;