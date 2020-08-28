/* globals Vue */
Vue.component('product', {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  
  methods: {
    add: function(product) {
      window.alert('Produto ' + product.id + ' - ' + product.title + ' adicionado ao carrinho!');
    },
    
    pricer: function(val) {
      return val ? val.toFixed(2, ',').replace('.', ',') : '---';
    },
  },

  template: [
    '<div class="card">',
      '<img :src="product.images[0].url" class="pic" v-if="product.images.length < 0">',
      '<img class="pic" src="https://courier-images-prod.imgix.net/produc_variant/00010266_993f6927-e697-4dca-b4e6-e118d99be4c8.jpg?auto=compress,format&fit=max&w=undefined&h=200&dpr=2" v-if="product.images.length > 0">',
      '<p>{{product.title}}</p>',
      '<div class="shop">',
        '<h4 class="price">R$ {{pricer(product.productVariants[0].price)}}</h4>',
        '<button type="button" class="add" @click="add(product)">&plus; adicionar</button>',
      '</div>',
      '<p><span class="badge" v-if="product.productVariants[0].subtitle">',
        '{{product.productVariants[0].subtitle}}',
      '</span></p>',
    '</div>',
  ].join(''),
});
