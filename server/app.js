/*
*	SERVER: APP
*
*	This module runns the express server
*/

console.log('runnign the server');

//declare all dependencies
var express		= require('express');
var bodyParser 	= require('body-parser');
var ahnuts 		= require('./ahnuts/ahnuts.js');

//return the express object
var serverApp = express();

//environment variables
var port = process.env.PORT || 3000;

//get the URL encoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();


/*
*	USE Declarations
*
*/
//define our body parsers
serverApp.use(jsonParser); // for parsing application/json
serverApp.use(urlencodedParser); // for parsing application/x-www-form-urlencoded

//serve up a static asset
serverApp.use(express.static('dist'));

//define our body parsers
serverApp.use(jsonParser); // for parsing application/json
serverApp.use(urlencodedParser); // for parsing application/x-www-form-urlencoded

//track URL requests
serverApp.use('/', function(req, res, next) {
	//log the url to the console
	console.log('Request Url: ' + req.url);

	next();
});

/*
*	GET Declarations
*/
serverApp.get('/api/:path', function(req, res) {

	//define local varaibles
	var path = req.path;

	var returnObject = ahnuts.api.getServerData(path);

	if(returnObject != undefined) {
		res.status(200);
		res.send(returnObject);
	} else {
		res.status(500);
		res.send('There was an error');
	}

});

/*
*	POST Declarations
*/
serverApp.post('/api/charge_card', function(req, res) {
	//advise of the post body
	console.log(req.body);

	//hit the function
	ahnuts.register.subscription.monthly(req.body)
	.then(function succcess(s) {

		//if everything executes properly...
		res.status(200);
		res.send({ data: s.confirmationCode});

	}).catch(function error(e) {

		//if there are errors...
		res.status(500);
		res.send(e);

	});
});

serverApp.post('/subscription-application-submission', function(req, res) {
	
	//advise of the post body
	console.log(req.body);

	//hit the function
	ahnuts.register.subscription.monthly(req.body)
	.then(function succcess(s) {

		//if everything executes properly...
		res.status(200);
		res.send(s.confirmationCode);

	}).catch(function error(e) {

		//if there are errors...
		res.status(500);
		res.send(e);

	});

});

/*
*	Opening Up the server
*/
//open the port for local development
serverApp.listen(port,function() {
	//display the port
	console.log('Express server is up and running on port ' + port);
	//identify the environment
	if(process.env.IS_PROUDCTION == 'true') console.log('is production')
		else console.log('is development')
});

