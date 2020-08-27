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
      msg: msgs[0],
    };
  },

  methods: {
    send: function() {
      this.$emit('route', 'products');
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
      setTimeout(function() {
        var ac = window.googleinit();
        google.maps.event.addListener(ac, 'place_changed', function() {
          var place = ac.getPlace().geometry.location;
          window.localStorage.setItem('lat', place.lat());
          window.localStorage.setItem('lng', place.lng())
          self.$emit('route', 'products')
        });
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
                'style="width: 100%; font-size: 1.2rem" autofocus>',
        '</form>',
      '</div>',
    '</div>',
  ].join(''),
});
