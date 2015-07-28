var thesisPrototype = angular.module('thesisPrototype', ['appControllers','ngRoute','angular.filter', 'ui.ace']);

thesisPrototype.config(function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl : 'partials/landing.html',
			controller : 'landingCtrl'
		})
		.when('/preview/:datasetId',{
			templateUrl : 'partials/data-preview.html',
			controller : 'dataPrevCtrl'
		})
		.when('/explore/:datasetId',{
			templateUrl : 'partials/explore.html',
			controller : 'exploreCtrl'
		})
		.when('/plot/:dataToPlot/:plotId',{
			templateUrl : 'partials/plot-details.html',
			controller : 'plotCtrl'
		})
		.otherwise({
			templateUrl: 'partials/404.html'
		});
		
});