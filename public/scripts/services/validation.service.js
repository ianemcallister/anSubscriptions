angular.module('ansub').service('validationService', validationService);
		
/* @ngInject */
validationService.$inject = ['stateService', 'userDataService'];

/* @ngInject */
function validationService(stateService, userDataService) {
	//define local varaibles
	var validation = {
		termsAndCond: termsAndCond
	};

	function termsAndCond() {
		console.log('validating terms and conditions');
		//make sure terms and conditions is marked as addressed
		stateService.sectionsAddressed.termsConds = true;

		//section comleteness is a reflection of the agreement status
		stateService.sectionsCompleted.termsConds = userDataService.agreedToTerms;

		//toggle completness
		if(stateService.sectionsCompleted.termsConds) {
			stateService.sectionHeaders.termsConds.showError = false;
			stateService.sectionHeaders.termsConds.showCompleted = true;
		} else {
			stateService.sectionHeaders.termsConds.showError = true;
			stateService.sectionHeaders.termsConds.showCompleted = false;
		};

	};

	return validation;
};	