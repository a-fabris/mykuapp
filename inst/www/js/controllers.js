'use strict';

/* Controllers */

var myKuApp = angular.module('myKuApp',['ui.ace']);

myKuApp.controller('MainCtrl', function ($scope) {
	$scope.aceOptions = {
		theme: 'solarized_dark',
		mode: 'r',
		useWrapMode : true
	}
	$scope.example = 'code goes here'
});