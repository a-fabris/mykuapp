'use strict';

var app = angular.module("app",['ui.ace']);

app.controller("controller", ["$scope", function($scope) {
		$scope.code = "alert('hello world');";
		$scope.aceOptions = {
			theme : 'solarized_dark',
			mode : 'r',
			useWrapMode : 'true'
		}
		$scope.example = "Example Works!";
}]);

app.controller("controller2",["$scope", function($scope){

	$scope.functions = [
		{ 'name' : 'rnorm' , 'description' : 'description of rnorm'},
		{ 'name' : 'qnorm' , 'description' : 'description of qnorm'},
		{ 'name' : 'pnorm' , 'description' : 'description of pnorm'}
	];

	$scope.test = "Controller 2 works!";
}]);


