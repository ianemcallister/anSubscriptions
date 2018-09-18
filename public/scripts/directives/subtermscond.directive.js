angular.module('ansub').directive('subTermsCond', subTermsCond);

	/* @ngInject */
	function subTermsCond() {
		//define the directive
		var directive = {
			restrict: "AECM",
			templateUrl: 'views/subTermsCond.htm',
			replace: true,
			scope: {
			},
			link: linkFunc,
			controller: subTermsCondController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {
		}
		
		subTermsCondController.$inject = ['$scope', '$log', '$location', 'stateService', 'userDataService', 'validationService', 'submissionService', 'squareService'];

		/* @ngInject */
		function subTermsCondController($scope, $log, $location, stateService, userDataService, validationService, submissionService, squareService) {
			//define local variables
			var self = this;

			//define view model variables
			self.state = stateService;
			self.userData = userDataService;
			self.validate = validationService;
			self.square = squareService;

			//console.log('in subTermsCondController');
			/*self.submit = function() {
				console.log('submittig the form');

				//submit the form
				submissionService.submit(self.userData)
				.then(function success(s) {
					var newPath = '/success/' + s.data;
					console.log('got this path back', newPath)
					$location.path(newPath);
					$scope.$apply();

				}).catch(function error(e) {

					console.log('there was an error', e);
				});
			}*/

		};

		return directive;		
	};