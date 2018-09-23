
//define dependcies
//squareV2 	= require('./square/connectV2.js');
var ahnuts 		= require('./ahnuts/ahnuts.js');
var squareV2 	= require('./square/connectV2.js');
var squareV1  = require('./square/connectV1.js');
var stdio		= require('./stdio/stdio.js');
var mail		= require('./mailcenter/mailcenter.js');


squareV1.items.list()
.then(function success(s) {
  console.log('got this list', s);
  stdio.write.json(s, './json/productList.json');
}).catch(function error(e) {
  console.log('error', e);
});

/*mail.confirmationEmail(
  {
    name: {
      first: "Ian",
      last: "McAllister"
    },
    contact: {
      email: "iemcallister@gmail.com",
      phone: ""
    },
    shippingDestination: {
      street: "20022 SW 71st Ave",
      city: "Tualatin",
      state: "OR",
      zip: "97062"
    },
    billingAddress: {
      street: "20022 SW 71st Ave",
      city: "Tualatin",
      state: "OR",
      zip: "97062"
    },
    card: {
      //card_number: "",
      //cvv: "",
      //expiration_date: "",
      //postal_code: "",
      nonce: "",
      last4: "8668",  //comes from square charge transaction tenders[0].card_details.card.last_4
      type: "visa"    //comes from square charge transaction tenders[0].card_details.card.card_brand
    },
    orderNo: "81-02834-259902", //comes from square charge transaction id 
    orderDate: "2016-03-10T22:57:56Z",       //comes from square charge transaction created_at
    order: [{ 
      flavor: "Mix It Up",
      mixFlvrsSelected: ["Seceret Recipe Pecans", "Drunken Pecans"],
      mixflvrCount: 2
    },
    {
      flavor: "Secret Recipe Pecans"
    }],
    tender: {
      discounts: 0,
      shipping: 0,
      total: 1700
    },
    agreedToTerms: false
});*/

/*mail.send({
	from: 'info@ah-nuts.com',
	to: 'iemcallister@gmail.com',
	subject: "testing",
	text: "this is a test",
	html: "<strong>THIS IS A TEST</strong>"
})
.then(function success(s) {
	console.log('success', s);
}).catch(function error(e) {
	console.log('error', e);
});*/

/*squareV2.transactions.charge( 
	{ name: { first: 'Ian', last: 'McAllister' },
  contact:
   { email: 'ianmcallistersubscriptions@gmail.com',
     phone: '5033831718' },
  shippingDestination:
   { street: '5976 SW Menlo Drive',
     city: 'Beaverton',
     state: 'OR',
     zip: '97005' },
  billingAddress:
   { street: '5976 SW Menlo Drive',
     city: 'Beaverton',
     state: 'OR',
     zip: '97005' },
  card: { nonce: 'CBASEGtg8TrFHUIYOzb5nSTd-Z8', sqrId: 'icard-U05C5Cnr01NyMJ3Q4GB' },
  customerId: "C5BBXCBC2S1M53P5SD2ZBJQQ5G",
  order: [ { flavor: 'Secret Recipe Pecans' } ],
  tender: { discounts: 0, shipping: 0, total: 100 },
  agreedToTerms: true })
.then(function success(s) {
	console.log('success', s);
}).catch(function error(e) {
	console.log('error', e);
});*/

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

/*squareV2.customers.listCustomers()
.then(function success(s) {
	console.log(s.length);
	stdio.write.json(s, "./json/customerList.json");
}).catch(function error(e) {
	console.log(e);
});*/

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