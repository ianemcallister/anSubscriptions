/*
*	AHNUTS: AHNUTS
*
*	This module handles all the propriatoary ah-nuts functions
*/

//define dependcies
var squareV2 			= require('../square/connectV2.js');
var squareV1  			= require('../square/connectV1.js');
//var voucherifyClient 	= require('voucherify');
var mail				= require('../mailcenter/mailcenter.js');
var fetchUrl 			= require("fetch").fetchUrl;

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
		getPromCodes: getPromCodes,
		checkPromoCode: checkPromoCode,
		getServerData: getServerData,
		getProductList: getProductList,
		promoCodes: {
			check: checkCode,
			write: writeCode
		}
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
			console.log('5. recording order');
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
		_savePaymentMethod(subApp)
		.then(function success(customerProfile) {

			//notify progress
			console.log('4. charging order');

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

function getPromCodes() {
	return new Promise(function(resolve, reject) {
		fetchUrl("https://docs.google.com/spreadsheets/d/e/2PACX-1vTqLnSgUFvXBNEptrabQQC1kqSUnv3gRRjqWKNBPH4zRibRW0ZejMw-sgF2EzwwkGEIR6qbNYM92-Ye/pub?gid=0&single=true&output=csv", function(error, meta, body){
    
		    if(error) reject(error);

		    resolve(body.toString()); 
		});
	});
};	

function checkPromoCode(newCode) {
	//define local variables
	var isValid = false;

	return new Promise(function(resolve, reject) {
		fetchUrl("https://docs.google.com/spreadsheets/d/e/2PACX-1vTqLnSgUFvXBNEptrabQQC1kqSUnv3gRRjqWKNBPH4zRibRW0ZejMw-sgF2EzwwkGEIR6qbNYM92-Ye/pub?gid=0&single=true&output=csv", function(error, meta, body){
    
		    if(error) reject(error)
		    else {

		    	var data = body.toString().split('\r\n');

		    	//iterate over all the codes
		    	data.forEach(function(aCode) {
		    		//console.log(newCode, aCode, newCode == aCode)
		    		if(newCode == aCode) isValid = true;
		    	});

		    	resolve(isValid);
		    }

		     
		});
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

//REGISTER MONTLY SUBSCRIPTION
function registerMonthlySubscription(subApp) {
	//define local variables

	//When a new application comes in it must
	return new Promise(function(resolve, reject) {

		//always notify me when an order has been placed, that way I can help handle it if something goes wrong
		mail.orderNotificationEmail(subApp);

		//USED TO TEST ORDER CONFIRMATION EMAIL
		//resolve({ confirmationCode: "000-000-000-0000" });

		//1. record the order
		_recordOrder(subApp)
		.then(function success(updatedApp) {

			//2. send confirming emails
			//notify progress
			console.log('6. sending confirmation emails');

			mail.confirmationEmail(updatedApp)
			
			// 3. return confirming code
			//notify progress
			console.log('7. returning confirmation code');

			resolve({ confirmationCode: updatedApp.orderNo });

		}).catch(function error(e) {
			reject(e);
		});

	});

};

//export module
module.exports = ahnuts;
