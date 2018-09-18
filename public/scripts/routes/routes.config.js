/*
*	ROUTES-CONFIG
*
*	This module sets up all the required angular routes for this web app.
*/
angular
    .module('ansub')
    .config(config);

/* @ngInject */
function config($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
    $routeProvider
	//PUBLIC ROUTES
    .when('/', {
        templateUrl: 'views/monthlySub.htm',      //'views/monthlySub.htm'
        controller: 'mainController',           //'mainController'
        controllerAs: 'vm'
    })
    .when('/success/:confirmationCode', {
        templateUrl: 'views/success.htm',      //'views/success.html'
        controller: 'successController',           //'success'
        controllerAs: 'vm'
    })
	.otherwise({
        redirectTo: '/'
    });
}

/*
*   REQUIRED FUNCTIONS
*
*/


