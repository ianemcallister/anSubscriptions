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
		
		contactInputtController.$inject = ['$scope', '$log', 'userDataService', 'stateService', 'validationService'];

		/* @ngInject */
		function contactInputtController($scope, $log, userDataService, stateService, validationService) {
			//define local variables
			var self = this;

			//define viewmodel values
			self.userData = userDataService;
			self.state = stateService;

			//console.log('in contactInputtController');
			self.validate = function(field, value) {
				console.log('got these', field, value);

				var isValid = validationService.contact[field](value);

				//set input value
				if(isValid) {
					self.state.contactInput[field].input['is-valid'] = true;
					self.state.contactInput[field].input["is-invalid"] = false;
				} else {
					self.state.contactInput[field].input['is-valid'] = false;
					self.state.contactInput[field].input["is-invalid"] = true;
				};

			};

		};

		return directive;		
	};