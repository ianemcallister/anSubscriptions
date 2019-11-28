ahNuts.controller('mainController', mainController);

	mainController.$inject = ['$scope','$log', '$location', 'submissionService', 'userDataService', 'stateService', 'squareService'];

	/* @ngInject */
	function mainController($scope, $log, $location, submissionService, userDataService, stateService, squareService) {
		//notify progress

		//define local variables
		//define userdata model variable
		$scope.userData = userDataService;
		$scope.state = stateService;

		$scope.$on('$viewContentLoaded', function() {
		    //call it here
			console.log('$viewContentLoaded');
		    squareService.init();
		});
		
	};