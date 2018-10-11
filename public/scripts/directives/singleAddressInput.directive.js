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
		
		singleAddressInputController.$inject = ['$scope', '$log', 'userDataService', 'stateService', 'validationService'];

		/* @ngInject */
		function singleAddressInputController($scope, $log, userDataService, stateService, validationService) {
			//define local variables
			var self = this;

			//define viewmodel values
			self.userData = userDataService;
			self.state = stateService
			console.log('in singleAddressInputController', validationService);

			self.validate = function(field, value) {
				var isValid = validationService.physicalAddresses[field](value);

				//set input value
				if(isValid) {
					self.state.singleAddressInput[field].input['is-valid'] = true;
					self.state.singleAddressInput[field].input["is-invalid"] = false;
				} else {
					self.state.singleAddressInput[field].input['is-valid'] = false;
					self.state.singleAddressInput[field].input["is-invalid"] = true;
				};

				//mark as validated // only applies if we're not doing further validation
				//self.state.singleAddressInput[field].field['was-validated'] = true;
				//self.state.singleAddressInput[field].field["needs-validation"] = false;

				//console.log(field, "is valid?:", isValid);
				//console.log(self.state.singleAddressInput[field]);
			};
			
			self.updateBillingAddress = function() {
				if(self.state.shipingSameAsBilling) {
					self.userData.billingAddress.street = self.userData.shippingDestination.street
					self.userData.billingAddress.zip = self.userData.shippingDestination.zip
					self.userData.billingAddress.city = self.userData.shippingDestination.city
					self.userData.billingAddress.state = self.userData.shippingDestination.state
				}
					
			};

		};

		return directive;		
	};