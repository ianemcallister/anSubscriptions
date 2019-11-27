ahNuts.service('errorHandlingService', errorHandlingService);
		
/* @ngInject */
errorHandlingService.$inject = ['$rootScope', 'stateService'];

/* @ngInject */
function errorHandlingService($rootScope, stateService) {
	//define local varaibles
	var errorHandling = {
		card: {
			processingErrors: cardProcessingErrors
		},
		clearErrors: clearErrors
	};

	function clearErrors() {
		stateService.ccProcessing = {
			errors: {
				thereWereErrors: false,
				cardNoNotValid: false,
				cardCVVNotValid: false,
				cardDateNotValid: false,
				cardZipNotValid: false,
				list: []
			},
			success: {
				cardDataGood: false
			}
		};
	}

	//
	function cardProcessingErrors(errors) {
		//handdles are the errors with the card
		console.log("Encountered errors:", errors);

		//add the errors to the list
		stateService.ccProcessing.errors.list = errors;

		stateService.ccProcessing.errors.thereWereErrors = true;
		stateService.ccProcessing.success.cardDataGood = false;

		console.log('stateService.ccProcessing', stateService.ccProcessing);
		$rootScope.$apply();
	}

	return errorHandling;
};	