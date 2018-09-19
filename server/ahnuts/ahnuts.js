/*
*	AHNUTS: AHNUTS
*
*	This module handles all the propriatoary ah-nuts functions
*/

//define dependcies
squareV2 	= require('../square/connectV2.js');

//define module
var ahnuts = {
	_private: {
		_recordOrder: _recordOrder,
		_chargeOrder: _chargeOrder,
		_savePaymentMethod: _savePaymentMethod,
		_updateCustomerRecord: _updateCustomerRecord,
		//_checkCustomerRecords: _checkCustomerRecords,
		_checkCustomerHashes: _checkCustomerHashes,
		_orderConfEmails: _orderConfEmails,
		_confCode: _confCode
	},
	api: {
		getServerData: getServerData
	},
	register: {
		subscription: {
			//_createCustomer: rms_createCustomer,
			//_saveCustomerCard: rms_saveCustomerCard,
			//_chargeCurrentOrder: rms_chargeCurrentOrder,
			monthly: registerMonthlySubscription
		}
	}
};

//RECORD ORDER
/*function _recordOrder(subApp) {
	//define local variables

	return new Promise(function(resolve, reject) {

		//charge the order
		_recordOrder(subApp)
		.then(function success(s) {

			//notify progress
			

			//then record the order in the ah-nuts database
			resolve(s);

		}).catch(function error(e) {
			reject(e);
		});
		

	});

};*/

//UPDATE SQUARE
function _recordOrder(subApp) {
	//define local variables

	return new Promise(function(resolve, reject) {

		//save payment method
		_chargeOrder(subApp)
		.then(function success(s) {
			//notify progress
			console.log('5. recording order');

			//then charge the order to the customer
			resolve(s);

		}).catch(function error(e) {
			reject(e);
		});
		
		
	});	
	
};

//SAVE CUSTOMER
function _chargeOrder(subApp) {
	//define local variables

	return new Promise(function(resolve, reject) {

		//update customer records customer records 
		_savePaymentMethod(subApp)
		.then(function success(customerProfile) {

			//notify progress
			console.log('4. charging order');

			squareV2.customers.chargeTransaction(customerProfile)
			.then(function success(s) {
				resolve(s);
			}).catch(function error(e) {

			});

		}).catch(function error(e) {
			reject(e);
		});
		

	});

};

//SAVE CUSTOMER
function _savePaymentMethod(subApp) {
	//define local variables

	return new Promise(function(resolve, reject) {
		
		//first check customer records
		_updateCustomerRecord(subApp)
		.then(function success(customerId) {

			//notify progress
			console.log('3. saving payment method. CustomerId:', customerId);

			squareV2.customers.createCustomerCard(customerId, subApp)
			.then(function success(cardResponse) {
				//notify progress
				//console.log('got this response', cardResponse);

				subApp.card['sqrId'] = cardResponse.card.id;
				subApp['customerId'] = customerId;

				//return results
				resolve(subApp);

			}).catch(function error(e) {
				reject(e);
			});

		}).catch(function error(e) {
			reject(e);
		});

	});

};

// UPDATING CUSTOMER RECORDS
function _updateCustomerRecord(subApp) {
	//define local variables

	return new Promise(function(resolve, reject) {

		_checkCustomerHashes(subApp)
		.then(function success(customerId) {

			//notify progress
			console.log('got this customer id:', customerId);
			console.log('2. updating Customer Records');

			//create a new record
			if(customerId == undefined) {

				squareV2.customers.createCustomer(subApp)
				.then(function success(customerRecord) {
					console.log('new customer record', customerRecord);
					resolve(customerRecord.customer.id);
				}).catch(function error(e) {
					reject(e);
				});

			//or update an old one
			} else {

				squareV2.customers.updateCustomer(customerId, subApp)
				.then(function success(customerRecord) {
					console.log('updated customer record', customerRecord);
					resolve(customerRecord.customer.id);
				}).catch(function error(e) {
					reject(e);
				});

			}

		}).catch(function error(e) {
			reject(e);
		});

	});

}

//CHECK CUSTOMER HASHES
function _checkCustomerHashes(subApp) {
	//define local variables
	var phoneHash = {};
	var emailHash = {};
	var found = {
		phone: "",
		email: ""
	};
	var customerPhone = subApp.contact.phone;
	var customerEmail = subApp.contact.email;
	var customerId = undefined;

	//notify progress
	console.log('1. checking Customer Records');

	//return async work
	return new Promise(function(resolve, reject) {

		//download customer list
		squareV2.customers.listCustomers()
		.then(function success(customerList) {

			//iterate through the list
			customerList.forEach(function(customer) {

				//add good phone numbers to phoneHash
				if(customer.phone_number != "" || customer.phone_number != undefined)
					phoneHash[customer.phone_number] = customer.id;

				//add good emails to emailHash
				if(customer.email_address != "" || customer.email_address != undefined)
					phoneHash[customer.email_address] = customer.id;
			});

			//check for customers phone
			found.phone = phoneHash[customerPhone];

			//check for customers email
			found.email = emailHash[customerEmail];

			//if customer id exists with email save it
			if(found.email != undefined)
				customerId = found.email;

			//if customer id exists with phone save it, overwriting email
			if(found.phone != undefined)
				customerId = found.phone;
			
			resolve(customerId);

		}).catch(function error(e) {
			reject(e);
		});
		//hash customer list
		//check phone hash
		//check email hash
		//if no matches create a new customer
	});
};

//ORDER CONFIRMATION EMAILS
function _orderConfEmails() {

};

//CONFIRMATION CODE
function _confCode() {};

//GET SERVER DATA
function getServerData(path) {
	//define local variables
	var returnObject = {};

	returnObject['id'] = process.env.SQUARE_APP_ID;
	//returnObject['id'] = process.env.SQUARE_SANDBOX_APP_ID;

	return returnObject;
}	

//REGISTER MONTLY SUBSCRIPTION
function registerMonthlySubscription(subApp) {
	//define local variables

	//When a new application comes in it must
	return new Promise(function(resolve, reject) {

		//1. record the order
		_recordOrder(subApp)
		.then(function success(s) {

			//2. send confirming emails
			//notify progress
			console.log('6. sending confirmation emails');
			
			// 3. return confirming code
			//notify progress
			console.log('7. returingin confirmation code');

			resolve(s);

		}).catch(function error(e) {
			reject(e);
		});

	});

};

//export module
module.exports = ahnuts;
