angular.module('ansub').directive('contactInput', contactInput);

	/* @ngInject */
	function contactInput() {
		//define the directive
		var directive = {
			restrict: "AECM",
			templateUrl: 'views/contactInput.htm',
			replace: true,
			scope: {
				firstname: "=",
				lastname: "=",
				phone: "=",
				email: "="
			},
			link: linkFunc,
			controller: contactInputtController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {}
		
		contactInputtController.$inject = ['$scope', '$log'];

		/* @ngInject */
		function contactInputtController($scope, $log) {
			//define local variables
			var self = this;

			console.log('in contactInputtController');

		};

		return directive;		
	};