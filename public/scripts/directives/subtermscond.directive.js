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
		
		subTermsCondController.$inject = ['$scope', '$log'];

		/* @ngInject */
		function subTermsCondController($scope, $log) {
			//define local variables
			var self = this;

			console.log('in subTermsCondController');

		};

		return directive;		
	};