/*
*	MAILCENTER: MAIL CENTER
*
*	This module handles mailing
*/

//define dependencies
var nodemailer = require('nodemailer');

//define module
var mailCenter = {
	//_host: process.env.AH_NUTS_MAIL_HOST,
	//_port: process.env.AH_NUTS_MAIL_PORT,
	//_user: process.env.AH_NUTS_MAIL_USER,
	//_pass: process.env.AH_NUTS_MAIL_PASSWORD,
	//_config: {
	//	host: this._host,
	//	port: this._port,
	//	secure: true,
	//	auth: {
	//		user: this._user,
	//		pass: this._pass
	//	}
	//},
	transporter: nodemailer.createTransport({
		host: process.env.AH_NUTS_MAIL_HOST,
		port: process.env.AH_NUTS_MAIL_PORT,
		secure: true,
		auth: {
			user: process.env.AH_NUTS_MAIL_USER,
			pass: process.env.AH_NUTS_MAIL_PASSWORD
		}
	}),
	send: send
};

//send
function send(options) {
	//notify progress
	console.log('sending mail', mailCenter.transporter);



	//return async work
	return new Promise(function(resolve, reject) {

		//using transporter
		mailCenter.transporter.sendMail(options, function(error, info) {

			//
			if(error) {
				reject(error);
			} else {
				resolve(info);
			}

		});

	});

};


//export module
module.exports = mailCenter;


