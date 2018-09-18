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
	var url = 'https://sheets.googleapis.com/v4/spreadsheets/1jsC_2dLQWdVmVOF-BSh_h0xNGNdPHLZjiD1Tym5Ic8M/values/Sheet1!A1:D5'
	var client_secret = "qxc3kQa3LaEJ3-Sh-5T-op8B",
	var client_id = "285900806502-bh7026bbgr3kf5p2h4snjvh9hien040n.apps.googleusercontent.com",
	var redirect_uris = ["urn:ietf:wg:oauth:2.0:oob","http://localhost"]

	var oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
}


//export module
module.exports = sheets;
