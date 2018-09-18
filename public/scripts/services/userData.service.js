angular.module('ansub').service('userDataService', userDataService);
		
/* @ngInject */
userDataService.$inject = [];

/* @ngInject */
function userDataService() {
	//define local varaibles
	var userData = {
		name: {
			first: "",
			last: ""
		},
		contact: {
			email: "",
			phone: ""
		},
		shippingDestination: {
			street: "",
			city: "",
			state: "",
			zip: ""
		},
		billingAddress: {
			street: "",
			cit: "",
			state: "",
			zip: ""
		},
		card: {
			card_number: "",
			cvv: "",
			expiration_date: "",
			postal_code: ""
		},
		order: [],
		agreedToTerms: false
	};

	return userData;
};	