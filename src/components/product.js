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
