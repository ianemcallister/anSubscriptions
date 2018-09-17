angular.module('ansub').directive('shipDest', shipDest);

	/* @ngInject */
	function shipDest() {
		//define the directive
		var directive = {
			restrict: "AECM",
			template: '<div>testing</div>',
			replace: true,
			scope: {},
			link: linkFunc,
			controller: shipDestController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {}
		
		shipDestController.$inject = ['$scope', '$log', 'zipcomplete'];

		/* @ngInject */
		function shipDestController($scope, $log, zipcomplete) {
			//define local variables
			var self = this;

			self.zipCheck = zipcomplete;

			console.log('in shipDestController');


		}

		return directive;
	}