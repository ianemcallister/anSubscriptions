angular.module('ansub').directive('contactInput', contactInput);

	/* @ngInject */
	function contactInput() {
		//define the directive
		var directive = {
			restrict: "AECM",
			templateUrl: 'views/contactInput.htm',
			replace: true,
			scope: {},
			link: linkFunc,
			controller: contactInputtController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {}
		
		contactInputtController.$inject = ['$scope', '$log', 'userDataService', 'stateService'];

		/* @ngInject */
		function contactInputtController($scope, $log, userDataService, stateService) {
			//define local variables
			var self = this;

			//define viewmodel values
			self.userData = userDataService;
			self.state = stateService;

			//console.log('in contactInputtController');

		};

		return directive;		
	};