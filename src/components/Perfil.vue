<template>    
    <div class="container">
        <Nav/>
        <div class="row">
            <div class="main">
                <h3>Citas posteada por: {{$route.params.userName}}</h3>

                <p><h5>Total: {{total}}</h5>
                <div class="card light-yellow darken-1" v-for="(cita, i) in usuarioCitas" :key="i">
                    <div class="card-content">
                        <h5 class="card-title red-text">{{cita.autor}}</h5> dijo: "{{cita.cita}}"
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>

import { db } from '@/firebase';
import Nav from '@/components/Nav.vue';

export default {
    name: 'Perfil',
    data() {
        return {
            autor:'',
            cita:''
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },  
        usuarioCitas(){
            const id= this.$route.params.userId
            return this.citas.filter(cita => cita.userId == id)
        },
        total(){
            const id= this.$route.params.userId
            return this.citas.filter(cita => cita.userId == id).length
        }         
    },    
    components:{
        Nav
    },
    firestore() {           
        return {
            citas: db.collection('citas')
        }
    }
}