angular.module('ansub').service('zipcomplete', zipcomplete);
		
/* @ngInject */
zipcomplete.$inject = [];

/* @ngInject */
function zipcomplete() {
	//define local varaibles
	var self = this;
	var clientKey = "mSajVYD8urFSOjW3tuJfhdnSjMrevkmglX40W2bz12Km4cVK5vYZpogQgTcfp6jw";
	var cache = {};
	//var container = $("#example1");
	//var errorDiv = container.find("div.text-error");

	//local function 
	self.handleResp = function(data) {
		// Check for error
		if (data.error_msg)
			console.log(data.error_msg);
			//errorDiv.text(data.error_msg);
		else if ("city" in data)
		{
			// Set city and state
			container.find("input[name='city']").val(data.city);
			container.find("input[name='state']").val(data.state);
		} 
	};

	//zip checker
	self.checkZip = function(enteredZip) {
		var zipcode = enteredZip.substring(0, 5); 

		if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode)) {

			console.log('checking zip', zipcode);
		}	
		
	};
};	