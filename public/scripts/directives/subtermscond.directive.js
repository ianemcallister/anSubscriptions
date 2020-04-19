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

			console.log('got this state', self.state);

			/*	SUBMIT FORM
			*	
			*	This function submits the form so that the erros can be handeled properly
			*/
			self.submitForm = function() {

				//	SUBMIT THE FORM USING THE SQUARE SERVICE
				self.square.submitForm()
				.then(function success(s) {
					console.log('everything submitted properly');
				}).cach(function error(e) {
					console.log('there was an error with the submission', e);
				});
			};

		};

		return directive;		
	};