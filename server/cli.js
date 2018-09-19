
//define dependcies
//squareV2 	= require('./square/connectV2.js');
var ahnuts 		= require('./ahnuts/ahnuts.js');
var squareV2 	= require('./square/connectV2.js');
var stdio		= require('./stdio/stdio.js');

/*ahnuts.register.subscription.monthly({ name: { first: 'Clarke', last: 'McAllister' },
  contact: { email: '', phone: '5419682988' },
  shippingDestination:
   { street: '4050 Sunridge Drive',
     city: 'Eugene',
     state: 'OR',
     zip: '97405' },
  billingAddress:
   { street: '5976 SW Menlo Drive',
     city: 'Beaverton',
     state: 'OR',
     zip: '97005' },
  card: { nonce: 'CBASENx9zYDOgNmrcOCkAraLyzQgAQ' },
  order: [ { flavor: 'Secret Recipe Pecans' } ],
  tender: { discounts: 0, shipping: 0, total: 1700 },
  agreedToTerms: true })
.then(function succcess(s) { console.log(s); })
.catch(function error(e) { console.log(e.status, e); })*/

squareV2.customers.listCustomers()
.then(function success(s) {
	console.log(s.length);
	stdio.write.json(s, "./json/customerList.json");
}).catch(function error(e) {
	console.log(e);
});

//squareV2.customers.retreiveCustomer('W6N5HGCYVD1HXFFBNY74GD08SG')
/*.then(function success(s) {
	console.log(s);
}).catch(function error(e) {
	console.log(e);
});*/

/*squareV2.customers.deleteCustomer('B8HS3MH2FX7HQAMCG6PPV85DV0')
.then(function success(s) {
	console.log(s);
}).catch(function error(e) {
	console.log(e);
});*/