<template>
  <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <nav>
      <div class="nav-wrapper #00897b teal darken-1">
         <ul id="nav-mobile" class="right hide-on-med-and-down">
           <div class="row">
             <div class="col-md-6">
                <form class="form-inline my-2 my-lg-0" @submit.prevent="Salir">
                  <input class="btn btn-outline-success my-2 my-sm-0" type="submit" value="Log out">
                </form>
             </div>
           </div>             
        </ul>        
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name:"Nav",
  methods:{
    Salir(){
      this.$store.dispatch('Salir');
    }
  }
}
</script>