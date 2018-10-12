angular.module('ansub').service('squareService', squareService);
		
/* @ngInject */
squareService.$inject = ['$rootScope', '$location', 'serverService', 'userDataService', 'errorHandlingService', 'stateService'];

/* @ngInject */
function squareService($rootScope, $location, serverService, userDataService, errorHandlingService, stateService) {
	//define local varaibles
	var self = this;

	var squareService = {
		_chargeCardWithNonce: _chargeCardWithNonce,
		submitForm: submitForm,
		download: {
			productList: downloadProductList
		},
		init: init
	};

	//charge card with nonce
	function _chargeCardWithNonce(nonce) {
		//define local variables
		var url = '/api/charge_card';
		userDataService.card.nonce = nonce;

		//pass the data to the server
		serverService.chargeCard(url, userDataService)
		.then(function success(s) {
			//define local variables
			var newPath = '/success/' + s.data;

			//log progress
			console.log('got this path back', newPath);

			//re-route the page
			$location.path(newPath);
			$rootScope.$apply();

		}).catch(function error(e) {
			console.log('Error:',e);
		});
	};

	//submits the form for us
	function submitForm() {
		//notify progress
		console.log('submitting form');

		//clear error handling
		errorHandlingService.clearErrors();

		//submit the form
		self.paymentForm.requestCardNonce();
	};

	function downloadProductList() {
		//define local variables
		return new Promise(function(resolve, reject) {
			//it the server 
			serverService.get.sqrPrdctList()
			.then(function success(s) {
				resolve(s);
			}).catch(function error(e) {
				reject(e);
			});

		});

	};

	function init() {

		//collect the squareAppId
		serverService.get.sqrAppId()
		.then(function(sqApp) {

			self.paymentForm = new SqPaymentForm({
		    applicationId: sqApp.id,
		    inputClass: 'sq-input',
		    inputStyles: [
		      {
		        fontSize: '14px',
            	padding: '7px 12px',
            	backgroundColor: "transparent"
		      }
		    ],
		    cardNumber: {
		      elementId: 'sq-card-number',
		      placeholder: '•••• •••• •••• ••••'
		    },
		    cvv: {
		      elementId: 'sq-cvv',
		      placeholder: 'CVV'
		    },
		    expirationDate: {
		      elementId: 'sq-expiration-date',
		      placeholder: 'MM/YY'
		    },
		    postalCode: {
		      elementId: 'sq-postal-code'
		    },
		    callbacks: {

			      // Called when the SqPaymentForm completes a request to generate a card
			      // nonce, even if the request failed because of an error.
			      cardNonceResponseReceived: function(errors, nonce, cardData) {
			        if (errors) {
			          
			          errorHandlingService.card.processingErrors(errors)
			          //console.log("Encountered errors:", errors);
			          //userDataService.card.errors = errors;
	            	  //self.isProcessing = false;
	            	  //$scope.$apply(); // required since this is not an angular function

			        // No errors occurred. Extract the card nonce.
			        } else {
			          self.card_errors = [];
			          // Delete this line and uncomment the lines below when you're ready
			          // to start submitting nonces to your server.
			          //alert('Nonce received: ' + nonce);

			          //notify CC Success, and waiting time
			          stateService.ccProcessing.success.cardDataGood = true;
			          stateService.ccProcessing.errors.thereWereErrors = false;

			          _chargeCardWithNonce(nonce);

			          /*
			            These lines assign the generated card nonce to a hidden input
			            field, then submit that field to your server.
			            Uncomment them when you're ready to test out submitting nonces.

			            You'll also need to set the action attribute of the form element
			            at the bottom of this sample, to correspond to the URL you want to
			            submit the nonce to.
			          */
			          // document.getElementById('card-nonce').value = nonce;
			          // document.getElementById('nonce-form').submit();

			        }
			      },

			      unsupportedBrowserDetected: function() {
			        // Fill in this callback to alert buyers when their browser is not supported.
			      },

			      // Fill in these cases to respond to various events that can occur while a
			      // buyer is using the payment form.
			      inputEventReceived: function(inputEvent) {
			        switch (inputEvent.eventType) {
			          case 'focusClassAdded':
			            // Handle as desired
			            break;
			          case 'focusClassRemoved':
			            // Handle as desired
			            break;
			          case 'errorClassAdded':
			            // Handle as desired
			            break;
			          case 'errorClassRemoved':
			            // Handle as desired
			            break;
			          case 'cardBrandChanged':
			            // Handle as desired
			            break;
			          case 'postalCodeChanged':
			            // Handle as desired
			            break;
			        }
			      },

			      paymentFormLoaded: function() {
			        // Fill in this callback to perform actions after the payment form is
			        // done loading (such as setting the postal code field programmatically).
			        // paymentForm.setPostalCode(self.userData.billingAddress.zip);

			      }
			    }
			});
	    	self.paymentForm.build();
    	}).catch(function(error) {
    		console.log(error);
    	});

	}

	return squareService;
};	