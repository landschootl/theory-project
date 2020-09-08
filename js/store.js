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
    <div>
        <h3>Administration du magasin :</h3>
        <button v-if="store.isOpen" @click="closeStore()">Fermer le magasin</button>
        <button v-else @click="openStore()">Ouvrir le magasin</button>
        <p>Nom du magasin : <input v-model.trim="store.name" type="text"/></p>
        <p>Nom ouvert : <input v-model="store.isOpen" type="checkbox"/></p>
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
    <div>
        <h1>{{store.name}}</h1>
        <h2 v-bind:class="{ 'store-open': store.isOpen, 'store-close': !store.isOpen }">Magasin : {{store.isOpen ? 'open' : 'close'}}</h2>
        <manage-store :store="store"></manage-store>
    </div>
  `
});
