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
			nonce: "",
			last4: "",
			type: "",
			errors: []
		},
		promoCode: "",
		orderNo: "",
		orderDate: "",
		order: [],
		tender: {
			promoActive: false,
			multiplier: 1,
			discountRate: 0,
			subTotal: 0,
			discounts: 0,
			shipping: 0,
			total: 0
		},
		agreedToTerms: false
	};

	return userData;
};	