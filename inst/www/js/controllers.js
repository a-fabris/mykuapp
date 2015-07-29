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

appControllers.controller("exploreCtrl",["$scope","$routeParams","$http","localStorageService",

	function($scope, $routeParams, $http, localStorageService){
	
	$scope.panelHeadingStr = "Previews";
	$scope.dataset;
	$scope.dataToPlot = $routeParams.datasetId;

	/*
	var tableData = JSON.parse(localStorageService.get('tableData'));
	console.log(tableData);
	$scope.firstRow = tableData[0];
	console.log($scope.firstRow);

	$scope.dataset = tableData;
	*/
	
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

    $scope.selectedItems = 0;
    $scope.featureSet = new Set();

    //console.log("selectedItems: " + $scope.selectedItems);

    //used to store the selected features and filter the available plots
    $scope.updateChecked = function(feature){
    	
    	if($scope.featureSet.has(feature)){
    		$scope.featureSet.delete(feature);
    	} else {
    		$scope.featureSet.add(feature);
    	}

		$scope.selectedItems = $scope.featureSet.size;
		
    };

}]);

appControllers.controller("dataPrevCtrl", ["$scope", "$routeParams","$http","localStorageService",
	function($scope, $routeParams, $http, localStorageService){


		$scope.datasetId = $routeParams.datasetId;

		var dataVar = "";
		var fileVar = "";

		switch($scope.datasetId){
			case "UScereal":
				dataVar = $scope.dataVar = "cereal.dt";
				fileVar = "UScereal.csv";
				break;
			default:
				dataVar = "a";	
		}

		var cmdString = dataVar + "<- ";
		cmdString += "read.table(" + $scope.dataVar + ", ";
		cmdString += "header = TRUE" + ", ";
		cmdString += "sep = ',')";

		//load code table to build R commands
		$http.get('code-mappings.json').success(function(data) {
      		$scope.codeMappings = data;
    	});

		$scope.aceLoaded = function(_editor){

			var _session = _editor.getSession();

			_editor.setTheme("ace/theme/twilight");
			_session.setMode("ace/mode/r");
			_session.setValue(cmdString);
		};

}]);

appControllers.controller("plotCtrl",["$scope","$routeParams","$http",
	function($scope, $routeParams, $http){

		$scope.plotId = $routeParams.plotId;
		$scope.dataId = $routeParams.dataToPlot;

		var _session;


		var req = $("#vis-area").rplot("plotDensity",{
    		feature : "calories"
    	});

		req.fail(function(){
			alert("R returned an error: " + req.responseText); 
		});

		$scope.snippet = "cereal <- MASS::UScereal;\n";
		$scope.snippet += "ggplot(cereal) + aes(calories) + geom_density(kernel='gaussian');";

		$scope.aceLoaded = function(_editor){

			_session = _editor.getSession();

			_editor.setTheme("ace/theme/twilight");
			_session.setMode("ace/mode/r");
			_session.setValue($scope.snippet);

		};

		$scope.runPlot = function(){
		
			$scope.snippet = new ocpu.Snippet(_session.getValue());
			//console.log(mySnippet);

   			//perform the request pt1
   			/*
   			 var req = ocpu.call("identity", {
   			     "x" : mySnippet
   			 }, function(session){

   			     session.getConsole(function(outtxt){
   			         $scope.outTxt = outtxt; 
   			     });
   			 });
			*/

			//plot directly from rplot
			var req = $("#vis-area").rplot("identity",{
    			"x" : $scope.snippet
    		});
   			     
   			 //if R returns an error, alert the error message
   			 req.fail(function(){
   			     alert("Server error: " + req.responseText);
   			 });
		};

		//console.log($routeParams);
}]);
