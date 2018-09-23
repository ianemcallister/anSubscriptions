/*
*	SQUARE: VERSION 2
*
*	This module works with the square API on all version 2 functions
*/

//define dependcies
var SquareConnect 	= require('square-connect');
var defaultClient 	= SquareConnect.ApiClient.instance;
var stdio			= require('../stdio/stdio.js');
var uuidv1 			= require('uuid/v1');

// Configure OAuth2 access token for authorization: oauth2
var _oauth2 		= defaultClient.authentications['oauth2'];
//_oauth2.accessToken = process.env.SQUARE_SANDBOX_APP_TOKEN
_oauth2.accessToken = process.env.SQUARE_APP_TOKEN;

//define module
var v2 = {
	applePay: {},
	catalog: {},
	checkout: {},
	customers: {
		createCustomer: createCustomer,
		createCustomerCard: createCustomerCard,
		deleteCustomer: deleteCustomer,
		deleteCustomerCard: "",
		listCustomers: listCustomers,
		retreiveCustomer: retreiveCustomer,
		searchCustomers: searchCustomers,
		updateCustomer: updateCustomer
	},
	locations: {},
	orders: {

	},
	reporting: {},
	transactions: {
		charge: chargeTransaction
	}
};

function deleteCustomer(id) {

	return new Promise(function(resolve, reject) {

		var apiInstance = new SquareConnect.CustomersApi();

		var customerId = id; // String | The ID of the customer to delete.

		apiInstance.deleteCustomer(customerId).then(function(data) {
			resolve(data)
		}, function(error) {
			reject(error);
		});
	});

}

function retreiveCustomer(id) {
	//define local variables
	var apiInstance = new SquareConnect.CustomersApi();

	var customerId = id; // String | The ID of the customer to retrieve.

	return new Promise(function(resolve, reject) {

		apiInstance.retrieveCustomer(customerId).then(function(data) {
		  //console.log('API called successfully. Returned data: ' + data);
		  resolve(data);
		}, function(error) {
		  //console.error(error);
		  reject(error);
		});

	});


};

function listCustomers(cursor) {
	//define local variables
	var returnObject = []

	var apiInstance = new SquareConnect.CustomersApi();

	var opts = { 
	  'cursor': cursor, // String | A pagination cursor returned by a previous call to this endpoint. Provide this to retrieve the next set of results for your original query.  See [Paginating results](#paginatingresults) for more information.
	  //'sortField': "sortField_example", // String | Indicates how Customers should be sorted. Default: `DEFAULT`. See [CustomerSortField](#type-customersortfield) for possible values.
	  //'sortOrder': "sortOrder_example" // String | Indicates whether Customers should be sorted in ascending (`ASC`) or descending (`DESC`) order. Default: `ASC`. See [SortOrder](#type-sortorder) for possible values.
	};

	return new Promise(function(resolve, reject) {

		//hit the API
		apiInstance.listCustomers(opts).then(function(data) {
			//notify progress
			console.log('API called successfully. Cursor', cursor, ' Returned data: ', data.cursor);
		 	
		 	//check for a cursor
		 	if(data.cursor != undefined) {
		 		//if there is a cursor, we must go deeper
		 		listCustomers(data.cursor).then(function success(s) {

		 			data.customers.forEach(function(customer) {
		 				s.push(customer);
		 			});

		 			resolve(s);

		 		}).catch(function error(e) {
		 			reject(e);
		 		});

		 	} else {
		 		//if no cursor we've reached the end
		 		console.log('reached the bottom');
		 		//console.log(data);
		 		//console.log(data.customers)

		 		resolve(data.customers);
		 	};

		}, function(error) {
		  console.error(error);
		  reject(error);
		});

	});

}

//createcustomers
function createCustomer(customerProfile) {
	//notify progress
	console.log('creating customer');

	//console.log('newCustomerRequest', SquareConnect.CreateCustomerRequest());

	var apiInstance = new SquareConnect.CustomersApi();

	var body = new SquareConnect.CreateCustomerRequest();

	body['phone_number'] = customerProfile.contact.phone;
	body['given_name'] = customerProfile.name.first;
	body['family_name'] = customerProfile.name.last;
	body['email_address'] = customerProfile.contact.email;
	body['address'] = {};
	body['address']['address_line_1'] = customerProfile.shippingDestination.street;
	body['address']['locality'] = customerProfile.shippingDestination.city;
	body['address']['postal_code'] = customerProfile.shippingDestination.zip;
	body['address']['administrative_district_level_1'] = customerProfile.shippingDestination.state;

	console.log('body', body);
	//return async work
	return new Promise(function(resolve, reject) {

		apiInstance.createCustomer(body).then(function(data) {
		  //console.log('API called successfully. Returned data: ');
		  //stdio.write.json(data, './json/createCustomer.json');

		  //updateCustomer(data.customer.id, customerProfile);

		  //console.log(data)
		  resolve(data);
		}, function(error) {
		  //console.error(error)
		  reject(error);
		});

	});

};

//UPDATE CUSTOMER PROFILE
function updateCustomer(customerId, customerProfile) {

	var apiInstance = new SquareConnect.CustomersApi();

	var customerId = customerId; // String | The ID of the customer to update.

	var body = new SquareConnect.UpdateCustomerRequest(); // UpdateCustomerRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.

	body['phone_number'] = customerProfile.contact.phone;
	body['given_name'] = customerProfile.name.first;
	body['family_name'] = customerProfile.name.last;
	body['email_address'] = customerProfile.contact.email;
	body['address'] = {};
	body['address']['address_line_1'] = customerProfile.shippingDestination.street;
	body['address']['locality'] = customerProfile.shippingDestination.city;
	body['address']['postal_code'] = customerProfile.shippingDestination.zip;
	body['address']['administrative_district_level_1'] = customerProfile.shippingDestination.state;

	return new Promise(function(resolve, reject) {

		//hit the api
		apiInstance.updateCustomer(customerId, body).then(function(data) {
		  //console.log('API called successfully. Returned data: ');
		  //console.log(data);
		  resolve(data);
		}, function(error) {
		  //console.error(error);
		  reject(error);
		});

	});

};

//
function createCustomerCard(customerId, customerProfile) {
	//notify progress
	console.log('creating customer card');

	var apiInstance = new SquareConnect.CustomersApi();

	//var customerId = "customerId_example"; // String | The ID of the customer to link the card on file to.

	var body = new SquareConnect.CreateCustomerCardRequest(); // CreateCustomerCardRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.
	
	//define the request
	body['card_nonce'] = customerProfile.card.nonce;
	body['billing_address'] = {};
	body['billing_address']['address_line_1'] = customerProfile.shippingDestination.street;
	body['billing_address']['locality'] = customerProfile.shippingDestination.city;
	body['billing_address']['postal_code'] = customerProfile.shippingDestination.zip;
	body['billing_address']['administrative_district_level_1'] = customerProfile.shippingDestination.state;
	body['cardholder_name'] = customerProfile.name.first + " " + customerProfile.name.last;

	//return async work
	return new Promise(function(resolve, reject) {

		console.log('adding card', body);

		//hit the api
		apiInstance.createCustomerCard(customerId, body).then(function(data) {
			console.log('got this', data);

			resolve(data)
		}, function(error) {
			console.log('error', error);

			reject(error)
		});	

		//resolve(customerId);		

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
function chargeTransaction(customerProfile) {
	//notify progress
	console.log('charging transaction');

	var apiInstance = new SquareConnect.TransactionsApi();

	var locationId = "S4P16GQRK21CF"; // String | The ID of the location to associate the created transaction with.

	var body = new SquareConnect.ChargeRequest(); // ChargeRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.

	body['idempotency_key'] = uuidv1();
	body['amount_money'] = {};
	body['amount_money']['amount'] = customerProfile.tender.total;
	body['amount_money']['currency'] = 'USD';
	body['customer_card_id'] = customerProfile.card.sqrId;
	//body['reference_id'] = '';
	//body['note'] = '';
	body['customer_id'] = customerProfile.customerId;
	body['billing_address'] = {};
	body['billing_address']['address_line_1'] = customerProfile.shippingDestination.street;
	body['billing_address']['locality'] = customerProfile.shippingDestination.city;
	body['billing_address']['postal_code'] = customerProfile.shippingDestination.zip;
	body['billing_address']['administrative_district_level_1'] = customerProfile.shippingDestination.state;
	body['shipping_address'] = {};
	body['shipping_address']['address_line_1'] = customerProfile.shippingDestination.street;
	body['shipping_address']['locality'] = customerProfile.shippingDestination.city;
	body['shipping_address']['postal_code'] = customerProfile.shippingDestination.zip;
	body['shipping_address']['administrative_district_level_1'] = customerProfile.shippingDestination.state;
	body['buyer_email_address'] = customerProfile.contact.email;
	//body['order_id'] = '';

	//return async work
	return new Promise(function(resolve, reject) {
		
		console.log('body', body);

		//hit the api
		apiInstance.charge(locationId, body).then(function(data) {
			console.log('API called successfully. Returned data: ', data);
			resolve(data);
		}, function(error) {
			console.error(error);
			reject(error);
		});

	});
};

//export module
module.exports = v2;

