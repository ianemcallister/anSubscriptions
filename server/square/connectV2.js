/*
*	SQUARE: VERSION 2
*
*	This module works with the square API on all version 2 functions
*/

//define dependcies
var SquareConnect 	= require('square-connect');
var defaultClient 	= SquareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
var _oauth2 		= defaultClient.authentications['oauth2'];
_oauth2.accessToken = process.env.SQUARE_APP_TOKEN;

//define module
var v2 = {
	applePay: {},
	catalog: {},
	checkout: {},
	customers: {
		createCustomer: createCustomer,
		createCustomerCard: createCustomerCard,
		deleteCustomer: "",
		deleteCustomerCard: "",
		listCustomers: "",
		retreiveCustomer: "",
		searchCustomers: searchCustomers,
		updateCustomer: ""
	},
	locations: {},
	orders: {},
	reporting: {},
	transactions: {
		charge: chargeTransaction
	}
};

//createcustomers
function createCustomer(customerProfile) {
	//notify progress
	console.log('creating customer');

	//define local variables
	var newCustomerRequest = {
		givenName: customerProfile.name.first,
		familyName: customerProfile.name.last,
		companyName: "",
		nickname: "",
		emailAddress: customerProfile.contact.email,
		address: {
			addressLine1: customerProfile.shippingDestination.street,
			locality: customerProfile.shippingDestination.city,
			postalCode: customerProfile.shippingDestination.zip,
			administrativeDistrictLevel1: customerProfile.shippingDestination.state
		},
		phoneNumber: customerProfile.contact.phone,
		referenceId: "",
		note: ""
	};

	console.log('newCustomerRequest', newCustomerRequest);

	var apiInstance = new SquareConnect.CustomersApi();

	var body = new SquareConnect.CreateCustomerRequest(newCustomerRequest); // CreateCustomerRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.

	//return async work
	return new Promise(function(resolve, reject) {

		//resolve('done');
		//hit the api
		apiInstance.createCustomer(body).then(function success(createCustomerResponse) {
		  //console.log('API called successfully. Returned data: ' + createCustomerResponse.customer);
		  resolve(createCustomerResponse.customer);
		}, function error(e) {
		  reject(e);
		});

	});

};

//
function createCustomerCard() {
	//notify progress
	console.log('creating customer card');

	return new Promise(function(resolve, reject) {
		resolve(1);
	});
};

//searchCustomers
function searchCustomers() {
	//define local variables
	var apiInstance = new SquareConnect.CustomersApi();

	var body = new SquareConnect.SearchCustomersRequest(); // SearchCustomersRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.

	apiInstance.searchCustomers(body).then(function(data) {
	  
	  console.log('API called successfully. Returned data: ');
	  
	  Object.keys(data).forEach(function(key) {
	  	console.log(key, data[key]);
	  });

	}, function(error) {
	  console.error(error);
	});
};

//
function chargeTransaction() {
	//notify progress
	console.log('charging transaction');

	return new Promise(function(resolve, reject) {
		resolve(1);
	});
};

//export module
module.exports = v2;

