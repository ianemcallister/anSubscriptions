angular.module('ansub').directive('billingInput', billingInput);

	/* @ngInject */
	function billingInput() {
		//define the directive
		var directive = {
			restrict: "AECM",
			templateUrl: 'views/billingInput.htm',
			replace: true,
			scope: {},
			link: linkFunc,
			controller: billingInputController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {}
		
		billingInputController.$inject = ['$scope', '$log', 'userDataService', 'stateService'];

		/* @ngInject */
		function billingInputController($scope, $log, userDataService, stateService) {
			//define local variables
			var self = this;

			//define viewmodel values
			self.userData = userDataService;
			self.state = stateService;

			//console.log('in contactInputtController');

		};

		return directive;		
	};