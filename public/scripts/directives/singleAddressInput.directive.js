angular.module('ansub').directive('singleAddressInput', singleAddressInput);

	/* @ngInject */
	function singleAddressInput() {
		//define the directive
		var directive = {
			restrict: "AECM",
			templateUrl: 'views/singleAddressInput.htm',
			replace: true,
			scope: {
				address: "="
			},
			link: linkFunc,
			controller: singleAddressInputController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {}
		
		singleAddressInputController.$inject = ['$scope', '$log', 'userDataService', 'stateService'];

		/* @ngInject */
		function singleAddressInputController($scope, $log, userDataService, stateService) {
			//define local variables
			var self = this;

			//define viewmodel values
			self.userData = userDataService;
			self.state = stateService
			//console.log('in singleAddressInputController');

			self.updateBillingAddress = function() {
				if(self.state.shipingSameAsBilling) {
					self.userData.billingAddress.street = self.userData.shippingDestination.street
					self.userData.billingAddress.zip = self.userData.shippingDestination.zip
					self.userData.billingAddress.city = self.userData.shippingDestination.city
					self.userData.billingAddress.state = self.userData.shippingDestination.state
				}
					
			}

		};

		return directive;		
	};