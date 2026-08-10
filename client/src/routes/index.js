import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Cookie from 'js-cookie'

const authGuard = (to, from, next) => {
    const isAuthenticated = Cookie.get('user') ? true : false
    if (to.name !== 'Login' && to.name !== 'Register' && !isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/create-recipe',
        name: 'CreateRecipe',
        component: () => import('../views/CreateRecipe.vue')
    },
    {
        path: '/recipes/:id',
        name: 'RecipeDetails',
        component: () => import('../views/RecipeDetail.vue')
    },
    {
        path: '/my-recipes',
        name: 'MyRecipes',
        component: () => import('../views/MyRecipes.vue')
    },
    {
        path: '/recipes/:id/edit',
        name: 'EditRecipe',
        component: () => import('../views/EditRecipe.vue')
    },
    
    {
        path: '/server-error',
        name: 'ServerError',
        component: () => import('../views/ServerError.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(authGuard)

export default router