import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/Login.vue';  // asumiendo que hicimos este componente}
import Home from '../components/Home.vue';
import Notfound from '../components/Notfound.vue';
import Perfil from '../components/Perfil.vue';

Vue.use(VueRouter);    // instalamos explícitamente el router
    
export default new VueRouter({
    routes: [
        {
            path: '/', 
            component: Home
        },
        {
            path: '/login', 
            component: Login
        },    
        {
            path: '/Perfil/:userId/:userName', 
            component: Perfil,
        },    
        {
            path:'*',
            component:Notfound
        }
    ]
})