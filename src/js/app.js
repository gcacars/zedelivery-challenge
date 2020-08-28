/* globals Vue */
window.app = new Vue({
  el: '#app',
  data: {
    page: 'home',
  },

  methods: {
    route: function (val) {
      this.page = val;
    },
  },
});
