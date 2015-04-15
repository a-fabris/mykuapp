'use strict';

/* Controllers */

var myKuApp = angular.module('myKuApp',[]);

myKuApp.controller('MainCtrl', function ($scope) {
	
	$scope.aceOptions = {
		theme: 'solarized_dark',
		mode: 'r',
		useWrapMode : true
	}

	$scope.functions = [
		{ 	'name' : 'rnorm' , 
		  	'description' : 'random generator for the normal distribution'},
		{
			'name' : 'dnorm',
			'description' : 'this is dnorm'
		},
		{
			'name' : 'qnorm',
			'description' : 'this is qnorm'
		}

	];

	$scope.example = 'code goes here'
});