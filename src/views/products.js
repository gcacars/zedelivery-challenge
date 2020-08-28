/* eslint-disable indent */
/* globals Vue */
var intvs;
Vue.component('products', {
  data: function() {
    return {
      loading: true,
      failed: false,
      products: [],
      categories: [],
      categoryId: null,
      search: '',
      address: {},
      delivery: [],
      deliveryTypeId: 0,
      pocId: 0,
    };
  },
  
  methods: {
    load: function(id) {
      var self = this;
      self.failed = false;
      self.loading = true;

      try {
        window.Products.load(id, self.categoryId, self.search, function cbProducts(res) {
          self.loading = false;

          if (Array.isArray(res.poc.products)) {
            self.products = res.poc.products;
          } else {
            self.failed = true;
          }
        });
      } catch (error) {
        self.failed = true;
      }
    },
    
    add: function(product) {
      window.alert('Produto ' + product.id + ' - ' + product.title + ' adicionado ao carrinho!');
    },
    
    pricer: function(val) {
      return val ? val.toFixed(2, ',').replace('.', ',') : '---';
    }
  },
  
  mounted: function() {
    var self = this;

    var pocData = window.localStorage.getItem('poc');
    var poc = JSON.parse(pocData);
    self.address = poc.address;
    self.delivery = poc.deliveryTypes.filter(function(dt) { return dt.active; });
    // Select the first option
    if (self.delivery.length > 0) self.deliveryTypeId = self.delivery[0].deliveryTypeId;
    self.pocId = poc.id;

    this.$nextTick(function() {
      self.load(poc.id);
    });

    var lat = window.localStorage.getItem('lat');
    var lng = window.localStorage.getItem('lng');
    window.Categories.load(lat, lng, function(res) {
      if (Array.isArray(res.allCategory)) self.categories = res.allCategory;
    });
  },
  
  watch: {
    categoryId: function() {
      this.search = '';
      this.load(this.pocId);
    },
    search: function() {
      var self = this;
      clearTimeout(intvs);
      intvs = setTimeout(function() {
        self.load(self.pocId);
      }, 750);
    },
  },

  template: [
    '<div class="container">',
      '<div class="bar" v-if="pocId > 0">',
        '<div class="bar-item"',
              '@click="$emit(\'route\', \'home\')">',
          '{{address.address1}}, {{address.number}}<br>',
          '<small>{{address.city}} - {{address.province}}</small>',
        '</div>',
        '<div class="bar-item bar-option" v-for="d in delivery" :key="d.deliveryTypeId" ',
              ':title="d.subtitle"',
              ':class="{ active: d.deliveryTypeId === deliveryTypeId }"',
              '@click="deliveryTypeId = d.deliveryTypeId">',
          '{{d.title}}',
        '</div>',
        '<div class="bar-item" style="margin-right: auto; flex-grow: 1;">',
          '<input type="text" v-model="search" placeholder="Pesquisar...">',
        '</div>',
      '</div>',
      '<div class="categories" v-if="pocId > 0 && categories.length > 0">',
        '<div class="category" v-for="cat in categories" :key="cat.id"',
              '@click="categoryId = cat.id" :class="{ active: categoryId === cat.id }">',
          '{{cat.title}}',
        '</div>',
      '</div>',
      '<div class="table" v-if="!loading">',
        '<product :product="item" v-for="item in products" :key="item.id"></product>',
        '<p v-if="products.length === 0">',
          '<em class="muted">Ops, alguém pegou tudo que tinha por aqui, não encontrei nada. :(</em>',
        '</p>',
      '</div>',
      '<div class="spinner" v-if="loading"></div>',
    '</div>',
  ].join(''),
});
