'use strict';

var app = angular.module("app",['ui.ace']);

app.controller("controller", ["$scope", function($scope) {
		$scope.code = "alert('hello world');";
		$scope.greeting = "Hola!";
}]);

