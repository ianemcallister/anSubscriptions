angular.module('ansub').service('validationService', validationService);
		
/* @ngInject */
validationService.$inject = ['stateService', 'userDataService'];

/* @ngInject */
function validationService(stateService, userDataService) {
	//define local varaibles
	var validation = {
		physicalAddresses: {
			street: isValidString,
			zip: isValidZip,
			city: isValidCity,
			state: isValidState
		},
		contact: {
			first: isValidString,
			last: isValidString,
			phone: isValidPhone,
			email: isvalidEmail
		},
		termsAndCond: termsAndCond
	};

	function isValidString(aString) {
		var isValid = false;

		if (aString.length > 0) isValid = true;

		return isValid;
	};

	function isValidZip(aString) {
		//define local variables
		//var errorMessage = "";

		//var isValid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(aString);

		//if(!isValid) errorMessage+= "That doesn't look like a valid zipcode, please try again";

		//return {valid: isValid, message: errorMessage};
		return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(aString);
	};

	function isValidCity(aString) {
		return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(aString);
	};

	function isValidState(aString) {
		return /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/.test(aString)
	};

	function isValidPhone(aString) {
		return /^[2-9]\d{2}-\d{3}-\d{4}$/.test(aString);
	};

	function isvalidEmail(aString) {
		return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(aString)
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