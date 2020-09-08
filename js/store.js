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

Vue.component('catalogStore', {
    props: {
        products: Array
    },
    methods: {
        addProductInBasket(product) {
            this.$emit('addProduct', product);
        }
    },
    template: `
    <div>
        <h3>Les produits en vente :</h3>
        <div v-for="(product, index) in products" :key="index">
            <span>{{product.name}} - {{product.priceHt}} € <button @click="addProductInBasket(product)">Ajouter à mon panier</button></span>
        </div>
    </div>
  `
});

Vue.component('basketStore', {
    props: {
        products: Array
    },
    computed: {
        totalPriceTTC() {
            return this.products.length > 0
                ? this.products
                .map(product => product.priceHt * 1.2)
                .reduce((total, priceTtc) => total + priceTtc)
                .toFixed(2)
                : 0;
        }
    },
    data: function () {
        return {
            lastUpdateBasket: "no update"
        }
    },
    watch: {
        products() {
            const date = new Date();
            this.lastUpdateBasket = `${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`;
        }
    },
    methods: {
        removeProductInBasket(index) {
            this.products.splice(index, 1);
        }
    },
    template: `
    <div>
        <h3>Mon panier :</h3>
        <p>Prix total de mon panier TTC : {{totalPriceTTC}} €</p>
        <p>Dernière modification : {{lastUpdateBasket}}</p>
        <div v-for="(product, index) in products" :key="index">
            <span>{{product.name}} - {{product.priceHt}} € <button @click="removeProductInBasket(index)">Retirer de mon panier</button></span>
        </div>
    </div>
  `
});

new Vue({
    el: '#app',
    data: {
        store: {
            name: 'Magasin de Fred !',
            isOpen: false
        },
        products: [
            {name: 'Banane', priceHt: 1.50},
            {name: 'Oeuf', priceHt: 2.20},
            {name: 'Kiwi', priceHt: 3.30},
            {name: 'Lait', priceHt: 0.90}
        ],
        basket: []
    },
    methods: {
      addProductInBasket(product) {
          this.basket.push(product);
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
          <catalog-store :products="products" @addProduct="addProductInBasket($event)"></catalog-store>
          <basket-store :products="basket"></basket-store>
        </div>
      </div>  
    </div>
  `
});
