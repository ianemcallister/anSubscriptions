/*
*	SQUARE: VERSION 2
*
*	This module works with the square API on all version 2 functions
*/

//define dependcies
var SquareConnect 	= require('square-connect');
var defaultClient 	= SquareConnect.ApiClient.instance;
var stdio			= require('../stdio/stdio.js');

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
		deleteCustomer: deleteCustomer,
		deleteCustomerCard: "",
		listCustomers: listCustomers,
		retreiveCustomer: retreiveCustomer,
		searchCustomers: searchCustomers,
		updateCustomer: updateCustomer
	},
	locations: {},
	orders: {},
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

		//it the API
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
		  console.log('API called successfully. Returned data: ');
		  stdio.write.json(data, './json/createCustomer.json');

		  //updateCustomer(data.customer.id, customerProfile);

		  console.log(data)
		}, function(error) {
		  console.error(error);
		});

	});

};

//UPDATE CUSTOMER PROFILE
function updateCustomer(customerId, customerProfile) {

	var apiInstance = new SquareConnect.CustomersApi();

	var customerId = customerId; // String | The ID of the customer to update.

	var body = new SquareConnect.UpdateCustomerRequest(); // UpdateCustomerRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.

	body['given_name'] = customerProfile.name.first;
	body['familyName'] = customerProfile.name.last;
	body['emailAddress'] = customerProfile.contact.email;
	body['phoneNumber'] = customerProfile.contact.phone;

	apiInstance.updateCustomer(customerId, body).then(function(data) {
	  console.log('API called successfully. Returned data: ');
	  console.log(data);
	}, function(error) {
	  console.error(error);
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

