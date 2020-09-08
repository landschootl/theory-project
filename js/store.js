Vue.component('manageStore', {
  props: {
    store: Object
  },
  methods: {
    openStore() {
      this.store.isOpen = true;
    },
    closeStore() {
      this.store.isOpen = false;
    }
  },
  template: `
    <div id="manage-store">
        <h3>Administration du magasin :</h3>
        <button v-if="store.isOpen" @click="closeStore()">Fermer le magasin</button>
        <button v-else @click="openStore()">Ouvrir le magasin</button>
        <p>Nom du magasin : <input v-model.trim="store.name" type="text"/></p>
        <p>Magasin ouvert : <input v-model="store.isOpen" type="checkbox"/></p>
    </div>
  `
});

new Vue({
  el:'#app',
  data: {
    store: {
      name: 'Magasin de Fred !',
      isOpen: false
    }
  },
  template: `
    <div id="store">
      <div class="bloc">
        <div class="sub-bloc">
          <img src="https://img.pngio.com/shop-icon-png-175739-free-icons-library-store-icon-png-1024_1024.jpg" id="img-store"/>
          <h1>{{store.name}}</h1>
          <h2 v-bind:class="{ 'store-open': store.isOpen, 'store-close': !store.isOpen }">Magasin : {{store.isOpen ? 'open' : 'close'}}</h2>
          <manage-store :store="store"></manage-store>
        </div>  
        <div class="sub-bloc">
          
        </div>
      </div>  
    </div>
  `
});
