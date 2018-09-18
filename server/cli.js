
//define dependcies
//squareV2 	= require('./square/connectV2.js');
var ahnuts 		= require('./ahnuts/ahnuts.js');

ahnuts.register.subscription.monthly({ name: { first: 'Ian', last: 'McAllister' },
  contact: { email: 'iemcallister@gmail.com', phone: '323-788-4533' },
  shippingDestination: { street: '5976 SW Menlo Drive', city: 'Beaverton', state: 'OR', zip: '97005' },
  order: [ { flavor: 'Secret Recipe Pecans' } ],
  agreedToTerms: true })
.then(function succcess(s) { console.log(s); })
.catch(function error(e) { console.log(e); })