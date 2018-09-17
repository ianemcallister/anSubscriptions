angular.module('ansub').service('submissionService', submissionService);

	/* @ngInject */
	submissionService.$inject = ['$http'];

	/* @ngInject */
	function submissionService($http) {
		//console.log('this is the submission service');
		var self = this;

		self.submit = function(userData) {
			console.log('submitting', userData);
			return new Promise(function(resolve, reject) {
				//try POST
				$http({
					method: 'POST',
					url: '/subscription-application-submission',
					headers: {
						'Content-Type': 'application/json'
					},
					data: userData
				}).then(function successCallback(response) {
					
					resolve(response);
					
				}, function errorCallback(error) {
					reject(error);
				});
			});

		};

	};