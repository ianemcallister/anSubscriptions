/*
*	GOOGLE: SHEETS
*
*	This module handles all the google sheets functions
*/

//define dependenices

//define module
var sheets = {
	read: {
		monthlyDb: readMonthlyDb
	},
	write: {}
};

function readMonthlyDb() {
	//define local variables


	var oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
}


//export module
module.exports = sheets;
