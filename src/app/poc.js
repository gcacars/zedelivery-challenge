var url = 'https://api.code-challenge.ze.delivery/public';
window.POC = {
  load: function load(lat, lng, cb) {
    try {
      var query = 'query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) { pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) { __typename id status tradingName officialName deliveryTypes {  __typename  pocDeliveryTypeId  deliveryTypeId  price  title  subtitle  active}paymentMethods {  __typename  pocPaymentMethodId  paymentMethodId  active  title  subtitle}pocWorkDay {  __typename  weekDay  active  workingInterval {    __typename    openingTime    closingTime  }}address {  __typename  address1  address2  number  city  province  zip  coordinates}phone {  __typename  phoneNumber}}}';
      var body = {
        query: query,
        variables: {
          algorithm: 'NEAREST',
          lat: lat,
          long: lng,
          now: new Date().toISOString(),
        },
        operationName: 'pocSearchMethod',
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
