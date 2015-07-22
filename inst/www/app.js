var thesisPrototype = angular.module('thesisPrototype', ['mainController','ngRoute']);

thesisPrototype.config(function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl : 'templates/landing.html'
		})
		.when('/workspace',{
			templateUrl : 'templates/workspace.html'
		});

});