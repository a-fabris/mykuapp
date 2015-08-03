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

	$scope.tableRendered = false;
	$scope.toggleData = false;
	$scope.toggleIcon = "fa fa-table fa-lg";

	$scope.updateToggleData = function(){
		
		if($scope.toggleData){
			$scope.toggleClass = "col-md-1";
			$scope.toggleIcon = "fa fa-table fa-lg";
		} else {
			$scope.toggleClass = "col-md-1";
			$scope.toggleIcon = "fa fa-caret-square-o-up fa-lg";
		}

		$scope.toggleData = !$scope.toggleData;

		$("html, body").animate({ scrollTop: $(document).height() }, 1000);

	}

	/*code for data-table and ace editor*/
		var dataVar = "";
		var fileVar = "";

		switch($scope.dataToPlot){
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
	
	$http.get('datasets/' + $routeParams.datasetId + '.csv').success(function(data) {
		
		// Parse local CSV file
		Papa.parse(data, {
			header: true,
			complete: function(results) {
				//console.log("Finished:", results.data);
				$scope.firstRow = results.data[0];
				//console.log($scope.firstRow);
				$scope.dataset = results.data;
				//Update globals
				JSON_DATA_GLOBAL = JSON.stringify(results.data); 
			}
		});
    });
	

	$http.get('datasets/plots.json').success(function(data) {
      $scope.plots = data;
    });

    $scope.selectedItems = 0;
    $scope.featureSet = new Set();

    //used to store the selected features and filter the available plots
    $scope.updateChecked = function(feature){
    	
    	if($scope.featureSet.has(feature)){
    		$scope.featureSet.delete(feature);
    	} else {
    		$scope.featureSet.add(feature);
    	}

		$scope.selectedItems = $scope.featureSet.size;

		// Update globals
		SELECTED_ITEMS = $scope.selectedItems;
		FEATURE_SET = $scope.featureSet;
		
    };

}]);


appControllers.controller("plotZoomCtrl", ["$scope", function($scope){

	$scope.currentPlot = "No chart selected";
	$scope.snippet = "Placeholder for R code"

	var _session;
	var _editor;
	var plot_geometry = "";

	$scope.aceLoaded = function(_editor){

		_session = _editor.getSession();

		_editor.setTheme("ace/theme/twilight");
		_session.setMode("ace/mode/r");
		_session.setValue($scope.snippet);
	};

	$scope.loadPlot = function(plotId){
	
		$scope.currentPlot = "Selected chart: " + plotId;

		$scope.snippet = "a <- ggplot("+ DATA_VAR +", aes(calories))\n";
		$scope.snippet += "a +\n";

		switch(plotId){
			case "histogram":
				//plot_histogram();
				plot_geometry = "geom_histogram";
				$scope.snippet += plot_geometry +"(binwidth = " + HISTOGRAM_BINS +", fill='"+HISTOGRAM_FILL+"', color='"+CHART_BORDER+"')";
			break;

			case "density":
				plot_geometry = "geom_density";
				$scope.snippet += plot_geometry + "(fill='"+ CHART_FILL +"', color='" + CHART_BORDER + "')";
			break;

			case "dotplot":
				plot_geometry = "geom_dotplot";
				$scope.snippet += plot_geometry + "(fill='"+ CHART_FILL +"', color='" + CHART_BORDER + "')";				
			break;
		}

		//set plot theme black/white
		$scope.snippet += " +\ntheme_bw()"

		_session.setValue($scope.snippet);
		$scope.runPlot();
	};

	$scope.runPlot = function(){

		var initData = DATA_VAR + " <- MASS::UScereal;\n";

		$scope.snippet = new ocpu.Snippet(initData + _session.getValue());
		console.log($scope.snippet.code);
		//plot directly from rplot
		var req = $("#chart").rplot("identity",{
    		"x" : $scope.snippet
    	});
   		     
   		 //if R returns an error, alert the error message
   		 req.fail(function(){
   		     alert("Server error: " + req.responseText);
   		 });
	};


}]);

