/*
*	AHNUTS: AHNUTS
*
*	This module handles all the propriatoary ah-nuts functions
*/

//define dependcies
squareV2 	= require('../square/connectV2.js');

//define module
var ahnuts = {
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

//GET SERVER DATA
function getServerData(path) {
	//define local variables
	var returnObject = {};

	returnObject['id'] = process.env.SQUARE_SANDBOX_APP_ID;

	return returnObject;
}	

//REGISTER MONTLY SUBSCRIPTION
function registerMonthlySubscription(subApp) {
	//define local variables

	//When a new application comes in it must
	return new Promise(function(resolve, reject) {

		//1. create a new customer in square
		squareV2.customers.createCustomer(subApp)
		//2. save customer card on file
		.then(squareV2.customers.createCustomerCard)
		.catch(function(e) { reject(e); })
		//3. charge current order to customer
		.then(squareV2.transactions.charge)
		.catch(function(e) { reject(e); })
		//4. record subscription in database
		.then(function(s) { resolve('now done'); })
		.catch(function(e) { reject(e); })
		//5. confirmation email to customer
		//6. notification email to ah-nuts
		//7. confirmation code to client browser

	});

};

//export module
module.exports = ahnuts;
