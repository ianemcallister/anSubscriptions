/*
*	AHNUTS: AHNUTS
*
*	This module handles all the propriatoary ah-nuts functions
*/

//define dependcies
var squareV2 			= require('../square/connectV2.js');
var squareV1  			= require('../square/connectV1.js');
var voucherifyClient 	= require('voucherify');
var mail				= require('../mailcenter/mailcenter.js');

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
		getServerData: getServerData,
		getProductList: getProductList,
		promoCodes: {
			check: checkCode,
			write: writeCode
		}
	},
	register: {
		subscription: {
			findCustomer: rms_findCustomer,
			updateCustomer: rms_updateCustomer,
			savePayment: rms_savePayment,
			buildOrder: rms_buildOrder,
			chargeOrder: rms_chargeOrder,
			notifyOrder: rms_notifyOrder,
			//_createCustomer: rms_createCustomer,
			//_saveCustomerCard: rms_saveCustomerCard,
			//_chargeCurrentOrder: rms_chargeCurrentOrder,
			monthly: registerMonthlySubscription
		}
	}
};

/*var client = voucherifyClient({
    applicationId: 'YOUR-APPLICATION-ID',
    clientSecretKey: 'YOUR-CLIENT-SECRET-KEY'
})*/

//check a promo code
function checkCode() {

};

//writes to to the promo code file
function writeCode() {};

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
		.then(function success(chargeReceipt) {
			//notify progress
			console.log('6. recording order');
			console.log('subApp', subApp);
			console.log('chargeReceipt', chargeReceipt.transaction);

			//add values to Application
			subApp.card.last4 = chargeReceipt.transaction.tenders[0].card_details.card.last_4;
			subApp.card.type = chargeReceipt.transaction.tenders[0].card_details.card.card_brand;
			subApp.orderNo = chargeReceipt.transaction.id;
			subApp.orderDate = chargeReceipt.transaction.created_at;

			console.log('subApp', subApp);

			//then charge the order to the customer
			resolve(subApp);

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
		_buildOrder(subApp)
		.then(function success(customerProfile) {

			//notify progress
			console.log('5. charging order');

			//temporarily changing amount	TODO: TAKE THIS OUT WHEN LIVE
			//customerProfile.tender.total = 100;

			console.log('customer profile', customerProfile.tender);

			//CHARGE THE CARD
			squareV2.transactions.charge(customerProfile)
			.then(function success(chargeReceipt) {
				resolve(chargeReceipt);
			}).catch(function error(e) {
				reject(e);
			});

		}).catch(function error(e) {
			reject(e);
		});
		

	});

};


//TODO: COME BACK TO THIS HERE, I'VE BROKEN THE CODE AND I NEED TO ADD THE ORDER ELEMENT BEFORE GOING FURTHER!!!!!!
function _buildOrder(subApp) {
	//define local variables

	return new Promise(function(resolve, reject) {

		//update customer records customer records 
		_savePaymentMethod(subApp)
		.then(function success(customerProfile) {

			console.log('4. Saving order');

			//temporarily changing amount	TODO: TAKE THIS OUT WHEN LIVE
			//customerProfile.tender.total = 100;

			console.log('customer profile', customerProfile.tender);

			//build the order


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
function getServerData() {
	return new Promise(function(resolve, reject) {
		resolve({id: process.env.SQUARE_APP_ID});
	});
};

function getProductList() {
	return new Promise(function(resolve, reject) {
		squareV1.items.list()
		.then(function success(s) {
			resolve(s);
		}).catch(function error(e) {
			reject(e);
		});
	});
}

function rms_findCustomer(subApp) {
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
	
	//pass back async work
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

	});
};

// REGISTER MONTHLY SUBSCRIBER: UPDATE CUSTOMER 
function rms_updateCustomer(subApp) {
	//notify progress
	console.log('rms_updateCustomer');

	//pass back the async work
	return new Promise(function(resolve, reject) {
		
		//notify customer id
		console.log('customerId:', subApp.customerId);

		//create a new record
		if(subApp.customerId == undefined) {

			squareV2.customers.createCustomer(subApp)
			.then(function success(customerRecord) {
				console.log('new customer record', customerRecord);
				resolve(subApp);
			}).catch(function error(e) {
				reject(e);
			});

		//or update an old one
		} else {

			squareV2.customers.updateCustomer(subApp.customerId, subApp)
			.then(function success(customerRecord) {
				console.log('updated customer record', customerRecord);
				resolve(subApp);
			}).catch(function error(e) {
				reject(e);
			});

		}

		//resolve the data back
		resolve(subApp);
	});
};

// REGISTER MONTHLY SUBSCRIBER: SAVE PAYMENT
function rms_savePayment(subApp) {
	//notify progress
	console.log('rms_savePayment');

	//return async work
	return new Promise(function(resolve, reject) {
		
		squareV2.customers.createCustomerCard(subApp.customerId, subApp)
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



		//resolve current object status
		resolve(subApp);
	});
};

// REGISTER MONTHLY SUBSCRIBER: BUILD ORDER
function rms_buildOrder(subApp) {
	//notify progress
	console.log('rms_buildOrder');
	
	//return async work
	return new Promise(function(resolve, reject) {
		
		//TODO: ADD THE ORDER BUIDLING FUNCTION HERE

		//resolve promise
		resolve(subApp);
	});
};

// REGISTER MONTHLY SUBSCRIBER: CHARGE ORDER
function rms_chargeOrder(subApp) {
	//notify progress
	console.log('rms_chargeOrder');
	
	//return async work here
	return new Promise(function(resolve, reject) {
		
		//temporarily changing amount	TODO: TAKE THIS OUT WHEN LIVE
		subApp.tender.total = 100;


		squareV2.transactions.charge(subApp)
		.then(function success(chargeReceipt) {
			
			//add values to Application
			subApp.card.last4 = chargeReceipt.transaction.tenders[0].card_details.card.last_4;
			subApp.card.type = chargeReceipt.transaction.tenders[0].card_details.card.card_brand;
			subApp.orderNo = chargeReceipt.transaction.id;
			subApp.orderDate = chargeReceipt.transaction.created_at;

			//return updated application object
			resolve(subApp);
		}).catch(function error(e) {
			reject(e);
		});

		//resolve updated object
		resolve(subApp);
	});
};

// REGISTER MONTHLY SUBSCRIBER: NOTIFY ORDER
function rms_notifyOrder(subApp) {
	//notify progress
	console.log('rms_notifyOrder');
	
	return new Promise(function(resolve, reject) {
		
		//Send the confirmation email
		mail.confirmationEmail(subApp)

		//assign the confirmation code
		subApp['confirmationCode'] = subApp.orderNo;

		//resolve when completed
		resolve(subApp);
	});
};

//REGISTER MONTLY SUBSCRIPTION
function registerMonthlySubscription(subApp) {

	//step through the subscription stages
	//return rms_buildOrder(subApp)
	return rms_updateCustomer(subApp)
	.then(function success(s) { return rms_savePayment(s) }).catch(function error(e) { return e; })
	.then(function success(s) { return rms_buildOrder(s) }).catch(function error(e) { return e; })
	.then(function success(s) { return rms_chargeOrder(s) }).catch(function error(e) { return e; })
	.then(function success(s) { return rms_notifyOrder(s) }).catch(function error(e) { return e; })
		
};

//export module
module.exports = ahnuts;
