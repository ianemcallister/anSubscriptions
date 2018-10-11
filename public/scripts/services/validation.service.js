angular.module('ansub').service('validationService', validationService);
		
/* @ngInject */
validationService.$inject = ['stateService', 'userDataService'];

/* @ngInject */
function validationService(stateService, userDataService) {
	//define local varaibles
	var validation = {
		physicalAddresses: {
			street: isValidStreet,
			zip: isValidZip
		},
		termsAndCond: termsAndCond
	};

	function isValidStreet(aString) {
		var isValid = false;

		console.log('street length', aString.length);

		if (aString.length > 3) isValid = true;

		return isValid;
		//return /^\d+\s[A-z]+\s[A-z]+/.test(aString)
	};

	function isValidZip(aString) {
		//define local variables
		//var errorMessage = "";

		//var isValid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(aString);

		//if(!isValid) errorMessage+= "That doesn't look like a valid zipcode, please try again";

		//return {valid: isValid, message: errorMessage};
		return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(aString);
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