angular.module('ansub').directive('frequencySelection', frequencySelection);

	/* @ngInject */
	function frequencySelection() {
		//define the directive
		var directive = {
			restrict: "AECM",
			templateUrl: 'views/frequencySelection.htm',
			replace: true,
			scope: {},
			link: linkFunc,
			controller: frequencySelectionController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {}
		
		frequencySelectionController.$inject = ['$scope', '$log'];

		/* @ngInject */
		function frequencySelectionController($scope, $log) {
			//define local variables
			var self = this;

			//define view model variables
			self.frequencies = [
				"month",
				"quarter",
				"year"
			];

			self.starts = {
				month: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
				quarter: ["Winter", "Spring", "Summer", "Fall"],
				year: ["2018", "2019", "2020"]
			}

			self.selectedFrequency = '';
			self.startsIn = '';

			//console.log('in frequencySelectionController');

		};

		return directive;		
	};