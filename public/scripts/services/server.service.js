angular.module('ansub').service('serverService', serverService);
		
/* @ngInject */
serverService.$inject = ['$http'];

/* @ngInject */
function serverService($http) {
	//define local varaibles
	var serverService = {
		chargeCard: chargeCard,
		get: {
			sqrAppId: getSqrAppId,
			sqrPrdctList: getSqrPrdctList
		}
	};

	//charge a credit card
	function chargeCard(url, data) {
		//define local variables
		
		//return the promise
		return new Promise(function(resolve, reject) {
			
			$http({
				method: 'POST',
				url: url,
				headers: {
						'Content-Type': 'application/json'
				},
				data: data
			}).then(function successCallback(response) {
					
				console.log('got this response', response);
				resolve(response.data);
				
			}, function errorCallback(error) {
				reject(error);
			});
		});			
	};

	//getst the required code
	function getSqrAppId() {
		//define local variables
		
		//log progress
		//$log.info('sending from sqr');
		
		//return the promise
		return new Promise(function(resolve, reject) {
			
			$http({
				method: 'GET',
				url: '/api/squareId'
			}).then(function successCallback(response) {
					
				console.log('got this response', response);
				resolve(response.data);
				
			}, function errorCallback(error) {
				reject(error);
			});
		});	
	};

	function getSqrPrdctList() {

		//return async work
		return new Promise(function(resolve, reject) {

			$http({
				method: 'GET',
				url: '/api/productList'
			}).then(function successCallback(response) {
					
				console.log('got this response', response);
				resolve(response.data);
				
			}, function errorCallback(error) {
				reject(error);
			});
		});
	};

	return serverService;
};	