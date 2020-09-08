<template>
  <div>
    <Navbar/>
    <br>
    <div class="row" v-if="user">
      <div class="col-md-6">
        <h3>Bienvenido {{user.name}}</h3>
      </div>
    </div>
    <br><br>
    <div class="row">
      
      <div class="col-md-6">
        <h3>Citas</h3>        
        <div class="card" style="width: 18rem;" v-for="(cita, i) in citasNoFav" :key="i">
          <div class="card-body">
            <h5 class="card-title">{{cita.autor}}</h5>
            <p class="card-text">{{cita.cita}}</p>
            <small id="emailHelp" class="form-text text-muted">Posteado por <router-link :to="'/Perfil/' + cita.userId + '/' + cita.userName" class="grey-text text-darken-2">{{cita.userName}}</router-link></small>
            
            <a href="#" class="btn btn-primary" @click.prevent="agregarFavoritos(cita.id)">Agregar a favoritos</a>
          </div>
        </div>        
      </div>
      <div class="col-md-6">
        <h3>Citas Favoritas</h3>
          <div class="card" style="width: 18rem;" v-for="(cita, i) in citasFavoritas" :key="i">
          <div class="card-body">
            <h5 class="card-title">{{cita.autor}}</h5>
            <p class="card-text">{{cita.cita}}</p>            
            <small id="emailHelp" class="form-text text-muted">Posteado por <router-link :to="'/Perfil/' + cita.userId + '/' + cita.userName" class="grey-text text-darken-2">{{cita.userName}}</router-link></small>
            <a href="#" class="btn btn-primary" @click.prevent="eliminarFavoritos(cita.id)">Eliminar de favoritos</a>
          </div>
        </div>     
        <h3>Agregar cita</h3>
        <form @submit.prevent="Agregar_cita">
          <div class="form-group">
            <label for="inputAddress">Autor</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="Autor de la cita" minlength="3" v-model="autor">
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Mensaje</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Agregar cita" minlength="10" v-model="cita"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { db } from '@/firebase';
import Navbar from '@/components/Nav.vue';
import firebase from 'firebase'

export default {
  name:'Home',
  methods:{
    Agregar_cita(){      
      let nuevaCitas = {
        autor:this.autor,
        cita:this.cita,
        isFav:false,
        userName:firebase.auth().currentUser.displayName,
        userId:firebase.auth().currentUser.uid
      }
      db.collection("citas").add(nuevaCitas)
        .then(data => {
          console.log(data)
        });
        this.autor = '',
        this.cita = ''
    },
    agregarFavoritos(id){
      this.$firestore.citas.doc(id).update({
        isFav: true
      })
      
      console.log(id)
    },
    eliminarFavoritos(id){
      this.$firestore.citas.doc(id).update({
        isFav:false
      })
    },
  },
  data(){
    return{
      autor:'',
      cita:''
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    },
    citasFavoritas() {
      function filtro(elem){
        return elem.isFav == true
      }
      return this.citas.filter(filtro)
    },
    citasNoFav(){
      function filtro(elem){
        return elem.isFav == false
      }
      return this.citas.filter(filtro)
    },
  },
  components:{
    Navbar
  },
  firestore(){
    return {
      citas: db.collection('citas')
    }
  }
}
</script>