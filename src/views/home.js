/* globals Vue */
var intv;
var intg;
var pos = 0;
var msgs = ['cerveja gelada', 'salgados', 'vinho', 'petiscos', 'vodka'];

window.googleinit = function() {
  if (window.google) return new google.maps.places.Autocomplete(document.getElementById('adr'));
};

Vue.component('home', {
  data: function() {
    return {
      loading: false,
      msg: msgs[0],
      address: '',
    };
  },

  methods: {
    send: function() {
      if (!this.address.trim()) {
        window.alert('Por favor, digite e escolha um endereço!');
      }
    }
  },

  mounted: function mounted() {
    var self = this;
    intv = setInterval(function interval() {
      pos++;
      if (pos === msgs.length) pos = 0;
      self.msg = msgs[pos];
    }, 1750);

    // make sure that the google has binded to element
    this.$nextTick(function() {
      var waits = window.google ? 0 : 100;
      intg = setInterval(function() {
        if (window.google) {
          clearInterval(intg);
          var ac = window.googleinit();
          google.maps.event.addListener(ac, 'place_changed', function() {
            var place = ac.getPlace().geometry.location;
            window.localStorage.setItem('lat', place.lat());
            window.localStorage.setItem('lng', place.lng());
            window.localStorage.setItem('adr', self.address);
            self.loading = true;
            window.POC.load(place.lat(), place.lng(), function(res) {
              window.localStorage.setItem('poc', JSON.stringify(res.pocSearch[0]));
              self.$emit('route', 'products');
            });
          });
        }
      }, waits);
    });
  },

  destroyed: function destroyed() {
    clearInterval(intv);
  },

  template: [
    '<div class="container text-center" style="max-width: 30rem; margin: 0 auto">',
      '<div class="col">',
        '<h1>',
          'Onde posso entregar <span class="color-brand">{{msg}}</span> para você agora?',
        '</h1>',
        '<form id="" accept-charset="utf-8" style="margin-bottom: 2em;" @submit="send">',
          '<input type="text" class="control text-center text-capitalize" id="adr" placeholder="Digite um endereço para entregar"',
                'style="width: 100%; font-size: 1.2rem" autofocus v-model="address" :disabled="loading">',
        '</form>',
        '<div class="spinner" v-if="loading"></div>',
      '</div>',
    '</div>',
  ].join(''),
});
