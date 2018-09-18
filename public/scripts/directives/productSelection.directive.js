angular.module('ansub').directive('productSelection', productSelection);

	/* @ngInject */
	function productSelection() {
		//define the directive
		var directive = {
			restrict: "AECM",
			templateUrl: 'views/productSelection.htm',
			replace: true,
			scope: {
			},
			link: linkFunc,
			controller: productSelectionController,
			controllerAs: 'vm',
			bindToController: true
		};

		/* @ngInject */
		function linkFunc(scope, el, attr, ctrl) {
		}
		
		productSelectionController.$inject = ['$scope', '$log', 'userDataService', 'stateService'];

		/* @ngInject */
		function productSelectionController($scope, $log, userDataService, stateService) {
			//define local variables
			var self = this;

			//define view model variables
			self.userData = userDataService;
			self.state = stateService.productSelection;
			self.state['infoBox'] = stateService.infoBoxes.flavorDefs;

			self.orderList = userDataService.order;

			self.productPrice = 1700;

			self.order = userDataService.tender;

			var productObject = { 
				id: 1, 
				flavor: "", 
				mixflvrCount: 0,
				mixflvrs: {
					srpec: { id: "srpec", name: "Secret Recipe Pecans", selected:false, classes:{"list-group-item": true, "active": false} },
					sralm: { id: "sralm", name: "Secret Recipe Almonds", selected:false, classes:{"list-group-item": true, "active": false}  },
					srcsh: { id: "srcsh", name: "Secret Recipe Cashews", selected:false, classes:{"list-group-item": true, "active": false}  },
					srpea: { id: "srpea", name: "Secret Recipe Peanuts", selected:false, classes:{"list-group-item": true, "active": false}  },
					cnpec: { id: "cnpec", name: "Cinnamon Pecans", selected:false, classes:{"list-group-item": true, "active": false}  },
					cnalm: { id: "cnalm", name: "Cinnamon Almonds", selected:false, classes:{"list-group-item": true, "active": false}  },
					drpec: { id: "drpec", name: "Drunken Pecans", selected:false, classes:{"list-group-item": true, "active": false}  }
				},
				mixFlvrsSelected: [],
				mix: ""
			};

			//define view model variables

			self.flavors= [
				{ name: 'Secret Recipe Pecans', description: "Sweet and Salty" },
				{ name: 'Secret Recipe Almonds', description: "Sweet and Salty" },
				{ name: 'Secret Recipe Cashews', description: "Sweet and Salty" },
				{ name: 'Secret Recipe Peanuts', description: "Sweet and Salty" },
				{ name: 'Cinnamon Pecans', description: "Bavarian" },
				{ name: 'Cinnamon Almonds', description: "Bavarian" },
				{ name: 'Drunken Pecans', description: "Savory" },
				{ name: 'Mix-It-Up', description: "Whatever You Like" }
			];

			//console.log('in productSelectionController');

			//define local functions
			function sumOrder() {

				self.order.total = (self.orderList.length * self.productPrice) - self.order.discounts;
				if(self.orderList.length == 4) self.order.total = self.order.total - self.productPrice;
			};

			//define view model functions
			//ADD A PRODUCT BUTTON
			self.addAProduct = function() {
				//define local variabels
				var noOfProducts = self.orderList.length;

				//if there is room add another product
				if(noOfProducts < 4) self.orderList.push(Object.create(productObject));

				//if this is the last available slot hide the add button
				if(noOfProducts == 3) self.state.addAProductBtn.visible = false;

				//if there is more than one product add the remove button
				if(noOfProducts > 0) self.state.removeLastProductBtn.visible = true;

				//make sure the id's are correct
				for(var i = 0; i <= noOfProducts; i++) {
					self.orderList[i].id = i + 1
				}

				//calculate money
				//if(noOfProducts == 3) self.order.discounts = self.productPrice;

				sumOrder();
				//console.log('adding a product');
			};

			//REMOVE LAST PRODUCT BUTTON
			self.removeLastProduct = function() {
				//define local variables
				var noOfProducts = self.orderList.length;
				var removeIndex = noOfProducts - 1;

				//if there are at least two products, remove one
				if(noOfProducts > 1) self.orderList.splice(removeIndex, 1);

				//if down to one item, hide the remove button
				if(noOfProducts == 2) self.state.removeLastProductBtn.visible = false;

				//bring the add button back
				self.state.addAProductBtn.visible = true;

				//calculate money
				if(noOfProducts == 4) self.order.discounts = 0;

				sumOrder();

				//console.log('removing product', noOfProducts);
			};

			//REMOVE A PRODUCT BUTTON
			self.removeAProduct = function(id) {
				//define local variables
				var noOfProducts = self.orderList.length;
				var removeIndex = id - 1;

				//if there are at least two products, remove one
				if(noOfProducts > 1) self.orderList.splice(removeIndex, 1);

				//make sure the id's are correct
				for(var i = 0; i <= (self.orderList.length - 1); i++) {
					self.orderList[i].id = i + 1
				}

				sumOrder();
			}

			//VALIDATE THE PRODUCTS WHEN CHANGED
			self.validateProducts = function() {
				var valid = false;
				//console.log("validateing products");

				if(valid) self.state.headerStyle.color = "rgb(0,165,128)"
			}

			//
			self.countMixFlavors = function(flavorObject) {
				//define local variables
				var counter = 0;

				//iterate throguh object
				Object.keys(flavorObject).forEach(function(key) {
					if(flavorObject[key].selected) counter++
				});

				return counter;
			};

			self.updateShoppingCart = function() {
				console.log('updating shopping cart');
				//self.userData.order = self.orderList;

			};

			self.buildFlavorList = function(id) {
				//clean the list
				self.orderList[id].mixFlvrsSelected = [];

				//notify progress
				//console.log('builidng a flavor list', id, self.orderList);

				//itrate through flavors, add to list when true
				Object.keys(self.orderList[id].mixflvrs).forEach(function(key) {

					if(self.orderList[id].mixflvrs[key].selected)
						self.orderList[id].mixFlvrsSelected.push(self.orderList[id].mixflvrs[key].name);
				});



			};

			//start this by adding a product to the order list
			self.orderList.push(Object.create(productObject));

			sumOrder();
		};

		return directive;		
	};