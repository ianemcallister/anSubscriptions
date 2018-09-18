angular.module('ansub').directive('billingInput', billingInput);

	/* @ngInject */
	function billingInput() {
		//define the directive
		var directive = {
			restrict: "AECM",
			templateUrl: 'views/billingInput.htm',
			replace: true,
			scope: {},
			link: linkFunc,
			controller: billingInputController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {}
		
		billingInputController.$inject = ['$scope', '$log', 'userDataService', 'stateService', 'serverService'];

		/* @ngInject */
		function billingInputController($scope, $log, userDataService, stateService, serverService) {
			//define local variables
			var vm = this;

			//define viewmodel values
			vm.userData = userDataService;
			vm.state = stateService;

			//console.log('in contactInputtController');

			function init() {

				//collect the squareAppId
				serverService.get.sqrAppId()
				.then(function(sqApp) {

					vm.paymentForm = new SqPaymentForm({
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
					          $log.info("Encountered errors:", errors);
					          vm.card_errors = errors;
			            	  vm.isProcessing = false;
			            	  $scope.$apply(); // required since this is not an angular function

					        // No errors occurred. Extract the card nonce.
					        } else {
					          vm.card_errors = [];
					          // Delete this line and uncomment the lines below when you're ready
					          // to start submitting nonces to your server.
					          //alert('Nonce received: ' + nonce);

					          vm.chargeCardWithNonce(nonce);

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
					        // paymentForm.setPostalCode('94103');
					      }
					    }
					});
			    	vm.paymentForm.build();
		    	}).catch(function(error) {
		    		$log.info(error);
		    	});

			};


			//run the init function
			init();

		};

		return directive;		
	};