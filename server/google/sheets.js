/*
*	GOOGLE: SHEETS
*
*	This module handles all the google sheets functions
*/

//define dependenices
var google 				= require('googleapis').google;
var GoogleSpreadsheet 	= require('google-spreadsheet');

//define module
var sheets = {
	read: {
		monthlyDb: readMonthlyDb
	},
	write: {}
};

function readMonthlyDb() {
	//define local variables
	var creds = {
		client_email: "",
		private_key: ""
	};
	//var client_id = process.env.AH_NUTS_GOOGLE_CLIENT_ID;
	//var client_secret = process.env.AH_NUTS_GOOGLE_CLIENT_SECRET;
	var doc = new GoogleSpreadsheet('');
	//console.log(client_id);
	//console.log(client_secret);
	//console.log(google);
	
	/*Object.keys(google.auth).forEach(function(key) {
		console.log(key);
	})*/

	return new Promise(function(resolve, reject) {

		var step = function(result) { console.log('result', result)};

		resolve(doc.useServiceAccountAuth(creds, step));
		//var oAuth2Client = new google.auth.OAuth2(client_id, client_secret/*, redirect_uris[0]*/);

	});
	
}


//export module
module.exports = sheets;
