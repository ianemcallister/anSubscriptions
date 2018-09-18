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
		
		singleAddressInputController.$inject = ['$scope', '$log', 'userDataService'];

		/* @ngInject */
		function singleAddressInputController($scope, $log, userDataService) {
			//define local variables
			var self = this;

			//define viewmodel values
			self.userData = userDataService;
			
			//console.log('in singleAddressInputController');

		};

		return directive;		
	};