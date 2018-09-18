angular.module('ansub').service('serverService', serverService);
		
/* @ngInject */
serverService.$inject = ['$http'];

/* @ngInject */
function serverService($http) {
	//define local varaibles
	var serverService = {
		get: {
			sqrAppId: getSqrAppId
		}
	};

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

	return serverService;
};	