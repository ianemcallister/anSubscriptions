ahNuts.directive('billingInput', billingInput);

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
			var vm = this;

			//define viewmodel values
			vm.userData = userDataService;
			vm.state = stateService;

			//console.log('in contactInputtController');

			//when the view has loaded, then init the square fields
			$scope.$on('$viewContentLoaded', function() {
			    //call it here
			    console.log('$viewContentLoaded');
			});
		};

		return directive;		
	};