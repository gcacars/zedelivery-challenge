var url = 'https://api.code-challenge.ze.delivery/public';
window.Categories = {
  load: function load(lat, lng, cb) {
    try {
      var query = 'query allCategoriesSearch { allCategory{ title id }}';
      var body = {
        query: query,
        variables: {
          algorithm: 'NEAREST',
          lat: lat,
          long: lng,
          now: new Date().toISOString(),
        },
        operationName: 'allCategoriesSearch',
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
