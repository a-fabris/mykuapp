'use strict';

/* Controllers */

var myKuApp = angular.module('myKuApp',['ui.ace']);

myKuApp.controller('MainCtrl', function ($scope) {
	
	$scope.aceOptions = {
		theme: 'solarized_dark',
		mode: 'r',
		useWrapMode : true
	}

	$scope.functions = [
		{'name' : 'rnorm', 'description' : 'random generator for the normal distribution'},
		{'name' : 'dnorm', 'description' : 'this is dnorm'},
		{'name' : 'qnorm', 'description' : 'this is qnorm'}
	];

	$scope.example = 'require(rCharts)\nrPlot(mpg ~ wt, data = mtcars,type = "point")'

	$scope.code = "alert('hello world');";
});