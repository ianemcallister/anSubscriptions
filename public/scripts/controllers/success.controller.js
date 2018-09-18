angular.module('ansub').controller('successController', successController);

successController.$inject = ['$scope','$log', '$routeParams'];

/* @ngInject */
function successController($scope, $log, $routeParams) {
	

	//define local varaibles
	$scope.confirmationCode = $routeParams.confirmationCode;

	//notify progress
	console.log('success controler', $routeParams.confirmationCode, $scope.confirmationCode);
};