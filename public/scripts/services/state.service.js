angular.module('ansub').service('stateService', stateService);
		
/* @ngInject */
stateService.$inject = ['userDataService'];

/* @ngInject */
function stateService(userDataService) {
	//define local varaibles
	var state = {
		shipingSameAsBilling: true,
		productSelection: {
			addAProductBtn: {
				classes: {
					'btn': true,
					'btn-success': true,
					'btn-warning': false
				},
				visible: true
			},
			removeLastProductBtn: {
				classes: {
					'btn': true,
					'btn-success': false,
					'btn-warning': false,
					'btn-danger': true
				},
				visible: false
			},
			headerStyle: {
				color: "rgb(51,51,51)"
			},
			promoCode: {
				field: {
					"was-validated": false,
					"needs-validation": true
				},
				input: {
					"is-valid": false,
					"is-invalid": false
				}
			}
		},
		contactInfo: {
			firstname: {
				classes: {
					"form-control": true,
					"is-valid": false,
					"is-invalid": false
				},
				addressed: false,
				isValid: false,
				isInvalid: false
			}
		},
		infoBoxes: {
			flavorDefs: false,
			termsConds: false
		},
		sectionsAddressed: {
			productSelection: false,
			singleShippingAddress: false,
			contactInfo: false,
			termsConds: false
		},
		sectionsCompleted: {
			productSelection: true,
			singleShippingAddress: true,
			contactInfo: true,
			termsConds: false
		},
		sectionHeaders: {
			productSelection: {
				showError: false,
				showCompleted: false
			},
			singleShippingAddress: {
				showError: false,
				showCompleted: false
			},
			contactInfo: {
				showError: false,
				showCompleted: false
			},
			termsConds: {
				showError: false,
				showCompleted: false
			}
		},
		checkCompletness: checkCompletness,
		readyForSubmission: false,
		submissionBtn: {
			"btn": true,
			"btn-block": true,
			"btn-success": false,
			"btn-secondary": true
		},
		contactInput: {
			first: {
				field: {
					"was-validated": false,
					"needs-validation": true
				},
				input: {
					"is-valid": false,
					"is-invalid": false
				}
			},
			last: {
				field: {
					"was-validated": false,
					"needs-validation": true
				},
				input: {
					"is-valid": false,
					"is-invalid": false
				}
			},
			phone: {
				field: {
					"was-validated": false,
					"needs-validation": true
				},
				input: {
					"is-valid": false,
					"is-invalid": false
				}
			},
			email: {
				field: {
					"was-validated": false,
					"needs-validation": true
				},
				input: {
					"is-valid": false,
					"is-invalid": false
				}
			},
		},
		singleAddressInput: {
			street: {
				field: {
					"was-validated": false,
					"needs-validation": true
				},
				input: {
					"is-valid": false,
					"is-invalid": false
				}
			},
			zip: {
				field: {
					"was-validated": false,
					"needs-validation": true
				},
				input: {
					"is-valid": false,
					"is-invalid": false
				}
			},
			city: {
				field: {
					"was-validated": false,
					"needs-validation": true
				},
				input: {
					"is-valid": false,
					"is-invalid": false
				}
			},
			state: {
				field: {
					"was-validated": false,
					"needs-validation": true
				},
				input: {
					"is-valid": false,
					"is-invalid": false
				}
			}
		}
	};

	function termsCondsAreGood() {
		//define local variables
		

		return userDataService.agreedToTerms;
	}

	function checkCompletness() {
		//define local variables
		var self = this;
		var noFlags = true;

		//iterate through requirnments
		Object.keys(self.sectionsCompleted).forEach(function(key) {
			if(self.sectionsCompleted[key] == false) noFlags = false;
		});

		if(noFlags) {
			readyForSubmission = true;
			self.submissionBtn["btn-success"] = true;
			self.submissionBtn["btn-secondary"] = false;
		} else {
			readyForSubmission = false;
			self.submissionBtn["btn-success"] = false;
			self.submissionBtn["btn-secondary"] = true;
		};
	}	

	return state;
};	