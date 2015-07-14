var myKuApp = angular.module('myKuApp', [
  'ngRoute',
  'ui.ace',
  'kuAppControllers'
]);

myKuApp.config(['$routeProvider',

	function($routeProvider,$locationProvider) {
    	$routeProvider
			.when("/", {
        		templateUrl: "html/landing.html",
        		controller: "headerController"
      		})
      		.when("/home", {
        		templateUrl: "html/landing.html",
        		controller: "headerController"
      		}).
      		when("/taskKnn",{
        		templateUrl: "html/tasks/knn-task.html",
        		controller: "TaskKnnController"
      		})
  
  }]);