var url = 'https://api.code-challenge.ze.delivery/public';
window.Products = {
  load: function load(id, categoryId, search, cb) {
    try {
      var query = 'query poc($id: ID!, $categoryId: Int, $search: String){ poc(id: $id) { id products(categoryId: $categoryId, search: $search) { id title rgb images { url } productVariants { availableDate productVariantId price inventoryItemId shortDescription title published volume volumeUnit description subtitle components { id productVariantId productVariant { id title description shortDescription}}}}}}';
      var body = {
        query: query,
        variables: {
          id: id,
          search: search,
          categoryId: categoryId,
        },
        operationName: 'poc',
      };
      
      fetch(url + '/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        .then(function (res) {
          return res.json();
        })
        .then(function (res) {
          cb.call(this, res.data);
        });
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
};
