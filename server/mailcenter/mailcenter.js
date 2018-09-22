/*
*	MAILCENTER: MAIL CENTER
*
*	This module handles mailing
*/

//define dependencies
var nodemailer 		= require('nodemailer');
var handlebars 		= require('handlebars');
//var handlebarsIntl	= require('handlebars-intl');
var stdio			= require('../stdio/stdio.js');

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
	send: send, 
	confirmationEmail: confirmationEmail
};

//send
function send(options) {
	//notify progress
	console.log('sending mail');
	//console.log(mailCenter.transporter);

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

//
function confirmationEmail(orderData) {
	//define local variables

	//load the template
	var rawTemplate = stdio.read.string('./templates/confirmationEmail.htm');

	var emailTemplate = handlebars.compile(rawTemplate);

	//register helpers
	handlebars.registerHelper('formatPrice', function(items, options) {
		var returnString = "$";

		var dollarValue = parseFloat(items / 100).toFixed(2);
		console.log('items', dollarValue);

		returnString = returnString + dollarValue ;

		return returnString;
	});

	handlebars.registerHelper('productList', function(items, options) {
		var returnString = "<ul>";

		for(var i=0, l=items.length; i<l; i++) {
			returnString = returnString + "<li>" + options.fn(items[i]) + "</li>";
		}


		return returnString + "</ul>";
	})

	var htmlEmail = emailTemplate(orderData);

	var logoPath = __dirname + "/Ah-nuts_logo.png";

	console.log('path', logoPath);
	send({
		from: 'info@ah-nuts.com',
		to: orderData.contact.email,
		cc: "online@ah-nuts.com",
		subject: "Your Ah-Nuts Subscription Order Has Been Placed",
		//text: "this is a test",
		html: htmlEmail,
		attachments: [{
		     filename: 'Ah-nuts_logo.png',
		     path: logoPath,
		     cid: 'logo'
		}]
	});
}


//export module
module.exports = mailCenter;


