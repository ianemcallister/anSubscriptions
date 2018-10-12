angular.module('ansub').controller('mainController', mainController);

	mainController.$inject = ['$scope','$log', '$location', 'submissionService', 'userDataService', 'stateService', 'squareService'];

	/* @ngInject */
	function mainController($scope, $log, $location, submissionService, userDataService, stateService, squareService) {
		//notify progress

		//define local variables
		//define userdata model variable
		$scope.userData = userDataService;
		$scope.state = stateService;

		$scope.$on('$viewContentLoaded', function() {
		    //call it here
		    console.log('$viewContentLoaded');
		    squareService.init();
		});

		
		
		/*var recipiantProfile = {
			name: {
				first: "",
				last: ""
			},
			address: {
				street1: "",
				street2: "",
				street3: "",
				city: "",
				state: "",
				zip: ""
			},
			contact: {},
			relationship: ""
		};

		var shippingSchedules = {
			"yearly": [
				{ id: 1, name: "Treat", shipDay: "", billDay: "" }
			],
			"quarterly": [
				{ id: 1, name: "Winter", shipDay: "", billDay: "" },
				{ id: 2, name: "Spring", shipDay: "", billDay: "" },
				{ id: 3, name: "Summer", shipDay: "", billDay: "" },
				{ id: 4, name: "Fall", shipDay: "", billDay: "" }
			],
			"monthly": [
				{ id: 1, name: "January", shipDay: "3rd", billDay: "1st" },
				{ id: 2, name: "February", shipDay: "3rd", billDay: "1st" },
				{ id: 3, name: "March", shipDay: "3rd", billDay: "1st" },
				{ id: 4, name: "April", shipDay: "3rd", billDay: "1st" },
				{ id: 5, name: "May", shipDay: "3rd", billDay: "1st" },
				{ id: 6, name: "June", shipDay: "3rd", billDay: "1st" },
				{ id: 7, name: "July", shipDay: "3rd", billDay: "1st" },
				{ id: 8, name: "August", shipDay: "3rd", billDay: "1st" },
				{ id: 9, name: "September", shipDay: "3rd", billDay: "1st" },
				{ id: 10, name: "October", shipDay: "3rd", billDay: "1st" },
				{ id: 11, name: "November", shipDay: "3rd", billDay: "1st" },
				{ id: 12, name: "December", shipDay: "3rd", billDay: "1st" }
			],
			"weekly": weeklyGenerator()

		}
		
		var shippingOccurance = {
			id: 0,
			name: "",
			date: ""
		};

		function weeklyGenerator() {
			//define local variables
			var allWeeks = [];

			for(var i = 1; i <= 52; i++) {
				var weekName = "Week " + i;
				allWeeks.push({ id: i, name: weekName, shipDay: "Tuesday", billDay: "Friday" });
			};

			return allWeeks;
		};*/

		//define flavor variables
		/*$scope.flavors= [
			{ name: 'Secret Recipe Pecans', description: " " },
			{ name: 'Secret Recipe Almonds', description: " " },
			{ name: 'Secret Recipe Cashews', description: " " },
			{ name: 'Secret Recipe Peanuts', description: " " },
			{ name: 'Cinnamon Pecans', description: " " },
			{ name: 'Cinnamon Almonds', description: " " },
			{ name: 'Drunken Pecans', description: " " },
			{ name: 'Mix-It-Up', description: " " }
		];

		$scope.orderSchedule = [
			{ id: 1 }
		];*/

		

		//define state variables
		/*$scope.state = {
			tempRecipiant: {
				name: {
					first: "",
					last: ""
				},
				address: {
					street1: "",
					street2: "",
					street3: "",
					city: "",
					state: "",
					zip: ""
				},
				contact: {
					email: "",
					phone: ""
				},
				relationship: ""
			},
			order: {
				qty: "1",
				visibility: {
					one: true,
					two: false,
					three: false,
					four: false,
				}
			},
			frequency: {
				value: 'monthly'
			},
			shippingDestinations: "1",
			recipientsBox: "1",
			recipiantSelected: {
				state: false,
				id: ""
			},
			subType: {},
			selectedRecipiant: 0,
			errors: {
				missingRequired: false
			}
		}

		$scope.stateTest = stateService

		//local functions
		function addToRecipiantList(relationship) {
			
			//define local variables
			var newRecipiant = Object.create(recipiantProfile);
			var existsAlready = false;
			var entryIndex = 0;
			var i = 0;

			//1. check for the relationship
			$scope.userData.recipiantList.forEach(function(recipiant) {
				if(recipiant.relationship == relationship) {
					existsAlready = true;
					entryIndex = i;
				};
				i++;
			});

			//console.log('adding', relationship, 'to recipiant list', $scope.userData.recipiantList, "already Exists?", existsAlready);

			//if relationship doesn't exist yet, add it
			if(!existsAlready) {
				newRecipiant.relationship = relationship;
				$scope.userData.recipiantList.push(newRecipiant);
			}
			
			//return result
			return entryIndex;
		};

		function removeFromRecipiantList(relationship) {
			
			//console.log('removing', relationship, 'to recipiant list');

			//define local variabls
			var i = 0;

			//iterate through array
			$scope.userData.recipiantList.forEach(function(recipiant) {
				if(recipiant.relationship == relationship) {
					$scope.userData.recipiantList.splice(i, 1);
				}
				i++;
			});

			//return result
			return 0;
		};

		function selectRecipiant(index) {

			$scope.state.selectedRecipiant = index;
		};

		//view model functions
		//UPDATE ORDER VISIBILITY
		$scope.updateOrderVisiblity = function(value) {
			//define local variales
			var hash = {"one": 1, "two": 2, "three": 3, "four": 4};
				
			//iterate through values
			Object.keys($scope.state.order.visibility).forEach(function(key) {
				if(hash[key] <= value) $scope.state.order.visibility[key] = true
					else $scope.state.order.visibility[key] = false
			});

			//console.log('checking values', value, $scope.state.order.visibility);
			
		};

		//UPDATE FREQUENCY
		$scope.updateFrequency = function(value) {
			$scope.userData.shippingSchedule = shippingSchedules[value];
		};

		//UPDATE ORDER SCHEDULE
		$scope.updateOrderSchedule = function(value) {
			//define local variables
		}

		//UPDATE THE SUBSCRIPTION TYPE
		$scope.updateSubType = function(value) {
			//define local variables
			var updateIndex = 0;
			$scope.userData.subType = value;

			if(value=="myself") {
				//$scope.state.recipientsBox = "10";
				addToRecipiantList("Myself");
				removeFromRecipiantList("Someone");
				selectRecipiant(0);
			} else if(value=="others") {
				//$scope.state.recipientsBox = "10";
				updateIndex = addToRecipiantList("Someone");
				removeFromRecipiantList("Myself");
				selectRecipiant(0);
			} else if(value=="both") {
				//$scope.state.recipientsBox = "10";
				updateIndex = addToRecipiantList("Myself");
				addToRecipiantList("Someone");
				selectRecipiant(0);
			}
		};

		$scope.selectRecipiant = function(index) {
			selectRecipiant(index);
			$scope.state.tempRecipiant = $scope.userData.recipiantList[index];
		};

		$scope.updateRecipiantValues = function() {
			var index = $scope.state.selectedRecipiant;
			$scope.userData.recipiantList[index] = $scope.state.tempRecipiant;
		};*/
		
	};