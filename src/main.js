import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFirestore from 'vue-firestore'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'})

const store = new Vuex.Store({
  state: {
      user: null,
      error:null
  },
  mutations: {
      setUser(state, payload) {
          state.user = payload;
      },
      setError(state, payload) {
          state.error = payload;
      }
  },
  actions: {
    async register(context, datos) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password);
            let newUser = firebase.auth().currentUser;  // after user is created, it is retrieved
            await newUser.updateProfile({
              displayName: datos.name
            });      
            context.commit('setUser', {email: datos.email, name: datos.name});   // .uid has the user's unique identifier
            context.commit('setError', null);
            router.push("/")
        }
        catch(error) {
            console.log(error);
            context.commit('setError', error);
            context.commit('setUser',null);
        }
    },
    login(context,datos){
        firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
        .then(function(response){
          console.log(response)
          console.log(datos.email)
          var name= firebase.auth().currentUser.displayName;
          var id= firebase.auth().currentUser.uid;
          context.commit('setError', null);
          context.commit('setUser',{email:datos.email,name:name,id:id});
          router.push('/');
        })
        .catch(function(error){
          context.commit('setError', error);
          context.commit('setUser', null);
        })
      },
      Salir(context){
        firebase.auth().signOut()
        .then(function(response){
          console.log(response)
          context.commit('setError', null);
          context.commit('setUser', null);
          router.push('/login');
        })
      }
  }
})

new Vue({
  render: h => h(App),
  router,
  store                     
}).$mount('#app')
