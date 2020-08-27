/* eslint-disable indent */
/* globals Vue */
Vue.component('products', {
  data: function() {
    return {
      msg: msgs[0],
    };
  },

  template: [
    `
    <div class="container table">
      <div class="card">
        <img src="https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8868_205f958d-2e51-48a3-b4d5-a2998765571a.jpg">
        <p>Skol 269ml - Unidade</p>
        <h4 class="price">R$ 2,09</h4><button type="button" class="add">&plus; adicionar</button>
        <p><span class="badge">Cerveja</span></p>
      </div>
    </div>
    `
  ].join(''),
});
