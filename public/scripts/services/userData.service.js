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
			city: "",
			state: "",
			zip: ""
		},
		card: {
			//card_number: "",
			//cvv: "",
			//expiration_date: "",
			//postal_code: "",
			nonce: ""
		},
		orderNo: "",
		orderDate: "",
		order: [],
		tender: {
			discounts: 0,
			shipping: 0,
			total: 0
		},
		agreedToTerms: false
	};

	return userData;
};	