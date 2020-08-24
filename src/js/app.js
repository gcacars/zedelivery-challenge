/* globals Vue */
var intv;
var pos = 0;
var msgs = ['cerveja gelada', 'salgados', 'vinho', 'petiscos', 'vodka'];

window.app = new Vue({
  el: '#app',
  data: {
    msg: msgs[0],
  },

  mounted: function() {
    var self = this;
    intv = setInterval(function() {
      pos++;
      if (pos === msgs.length) pos = 0;
      self.msg = msgs[pos];
    }, 1750);
  },

  destroyed: function() {
    clearInterval(intv);
  }
});
