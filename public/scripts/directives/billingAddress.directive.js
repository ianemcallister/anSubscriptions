angular.module('ansub').directive('billingAddress', billingAddress);

	/* @ngInject */
	function billingAddress() {
		//define the directive
		var directive = {
			restrict: "AECM",
			templateUrl: 'views/billingAddress.htm',
			replace: true,
			scope: {},
			link: linkFunc,
			controller: billingAddressController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {}
		
		billingAddressController.$inject = ['$scope', '$log', 'userDataService', 'stateService'];

		/* @ngInject */
		function billingAddressController($scope, $log, userDataService, stateService) {
			//define local variables
			var self = this;

			//define viewmodel values
			self.userData = userDataService;
			self.state = stateService;

			//console.log('in billing ADdress controller', self.state.shipingSameAsBilling);

		};

		return directive;		
	};