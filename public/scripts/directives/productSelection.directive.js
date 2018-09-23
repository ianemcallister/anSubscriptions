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
		
		productSelectionController.$inject = ['$scope', '$log', 'userDataService', 'stateService', 'squareService'];

		/* @ngInject */
		function productSelectionController($scope, $log, userDataService, stateService, squareService) {
			//define local variables
			var self = this;

			//define view model variables
			self.userData = userDataService;
			self.state = stateService.productSelection;
			self.state['infoBox'] = stateService.infoBoxes.flavorDefs;

			// donload resources
			squareService.download.productList()
			.then(function success(s){
				//console.log('got this product list', s);
				self.flavors = s;
				$scope.$apply();
			}).catch(function error(e) {
				console.log('product list error, ', e);
			});



			self.orderList = userDataService.order;

			self.productPrice = 1699;

			self.order = userDataService.tender;


			var productObject = { 
				id: 1, 
				sqrId: "",
				sqVarId: "",
				flavor: "", 
				mixflvrCount: 0,
				mixflvrs: {
					srpec: { id: "srpec", name: "SR Pecans", selected:false, classes:{"list-group-item": true, "active": false} },
					sralm: { id: "sralm", name: "SR Almonds", selected:false, classes:{"list-group-item": true, "active": false}  },
					srcsh: { id: "srcsh", name: "SR Cashews", selected:false, classes:{"list-group-item": true, "active": false}  },
					srpea: { id: "srpea", name: "SR Peanuts", selected:false, classes:{"list-group-item": true, "active": false}  },
					cnpec: { id: "cnpec", name: "Cin Pecans", selected:false, classes:{"list-group-item": true, "active": false}  },
					cnalm: { id: "cnalm", name: "Cin Almonds", selected:false, classes:{"list-group-item": true, "active": false}  },
					drpec: { id: "drpec", name: "Drunk Pecans", selected:false, classes:{"list-group-item": true, "active": false}  }
				},
				mixFlvrsSelected: [],
				mix: ""
			};

			//define view model variables

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
				//console.log('updating shopping cart');
				//self.userData.order = self.orderList;
				//iterate over products
				self.orderList.forEach(function(product) {

					//iterate over all flavors
					self.flavors.forEach(function(flavor) {
						//only if the product is a match
						if(flavor.name == product.flavor) {
							product.sqrId = flavor.id;

							if(product.id < 4) product.sqVarId = flavor.variations[0].id
							else product.sqVarId = flavor.variations[1].id
						}

					})
				})


				console.log(self.orderList);

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