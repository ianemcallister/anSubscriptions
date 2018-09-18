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
		function linkFunc(scope, el, attr, ctrl) {}
		
		subTermsCondController.$inject = ['$scope', '$log', 'stateService', 'userDataService', 'validationService'];

		/* @ngInject */
		function subTermsCondController($scope, $log, stateService, userDataService, validationService) {
			//define local variables
			var self = this;

			//define view model variables
			self.state = stateService;
			self.userData = userDataService;
			self.validate = validationService;

			//console.log('in subTermsCondController');

		};

		return directive;		
	};