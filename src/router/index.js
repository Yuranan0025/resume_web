import { createRouter, createWebHistory } from "vue-router";
import CreateView from '../views/CreateView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/create',
            name: 'create',
            component: CreateView
        }
        ,
        {
            path: '/edit/:id',
            name: 'edit',
            component: CreateView
        }
    ]
})

export default router