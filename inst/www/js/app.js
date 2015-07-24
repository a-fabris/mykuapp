var thesisPrototype = angular.module('thesisPrototype', ['appControllers','ngRoute','angular.filter']);

thesisPrototype.config(function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl : 'partials/landing.html',
			controller : 'landingCtrl'
		})
		.when('/explore/:datasetId',{
			templateUrl : 'partials/explore.html',
			controller : 'exploreCtrl'
		});

});