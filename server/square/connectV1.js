/*
*	SQUARE: VERSION 1
*
*	This module works with the square API on all version 1 functions
*/

//define dependcies
var SquareConnect 	= require('square-connect');
var defaultClient 	= SquareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
var _oauth2 		= defaultClient.authentications['oauth2'];
//_oauth2.accessToken = process.env.SQUARE_SANDBOX_APP_TOKEN
_oauth2.accessToken = process.env.SQUARE_APP_TOKEN;

//define module
var v1 = {
	transactions: {},
	items: {
		list: itemsList
	}
};


function itemsList(cursor) {
	//define local variables
	var apiInstance = new SquareConnect.V1ItemsApi();

	var locationId = "SJFCY96E7N0RW"; // String | The ID of the location to list items for.

	var opts = { 
	  'batchToken': cursor // String | A pagination cursor to retrieve the next set of results for your original query to the endpoint.
	};

	//return async work
	return new Promise(function(resolve, reject) {

		//hit the apiInstance
		apiInstance.listItems(locationId, opts).then(function(data) {
			//notify progress
			console.log('API called successfully. Cursor', cursor, ' Returned data: ', data.cursor);

		 	//check for a cursor
		 	if(data.cursor != undefined) {
		 		//if there is a cursor, we must go deeper
		 		listCustomers(data.cursor).then(function success(s) {

		 			data.forEach(function(customer) {
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

		 		resolve(data);
		 	};

		}, function(error) {
		  console.error(error);
		  reject(error);
		});

	});


}

//export module
module.exports = v1;

