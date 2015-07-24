'use strict';

var appControllers = angular.module("appControllers",[]);

appControllers.controller("landingCtrl",["$scope", "$http", function($scope, $http){

	$scope.title = "Thesis prototype";
	$scope.author = "Andrea Fabris";
	$scope.welcome = "Hello. To start, please select a data set";

	$scope.dataSelected = '';
	$scope.datasetId;

	$http.get('datasets/datasets.json').success(function(data) {
      $scope.datasets = data;
    });

    $scope.setLink = function(selection){
    	$scope.dataSelected = selection;
    	$scope.datasetId = selection;
    };

}]);

appControllers.controller("exploreCtrl",["$scope","$routeParams","$http",

	function($scope, $routeParams, $http){
	
	$scope.dataset;

	$http.get('datasets/' + $routeParams.datasetId + '.csv').success(function(data) {
		
		// Parse local CSV file
		Papa.parse(data, {
			header: true,
			complete: function(results) {
				//console.log("Finished:", results.data);
				$scope.firstRow = results.data[0];
				//console.log($scope.firstRow);
				$scope.dataset = results.data;
			}
		});
    });

	$http.get('datasets/plots.json').success(function(data) {
      $scope.plots = data;
    });


	var featureSet = new Set();
    $scope.selectedItems = 0;

    //used to store the selected features and filter the available plots
    $scope.updateChecked = function(feature){
    	
    	if(featureSet.has(feature)){
    		featureSet.delete(feature);
    	} else {
    		featureSet.add(feature);
    	}

		$scope.selectedItems = featureSet.size;
		console.log("clicked");
    };


}]);