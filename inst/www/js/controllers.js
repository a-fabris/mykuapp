'use strict';

var app = angular.module("app",['ui.ace']);

app.controller("controller", ["$scope", function($scope) {
		$scope.aceOptions = {
			theme : 'solarized_dark',
			mode : 'r',
			useWrapMode : 'true'
		}
		$scope.example = "Example Works!";

        $scope.makecode = function(funct){
            switch(funct){
                case "rnorm":
                    $scope.code = "rnorm was selected";
                    break;
                case "qnorm":
                    $scope.code = "qnorm was selected";
                    break;
                case "pnorm":
                    $scope.code = "pnorm was selected";
                    break;
                default:
                    $scope.code = "function unknown";
            }
        }

        $scope.runcode = function(code){
            alert("Running R");     
        }

}]);

app.controller("controller2",["$scope", function($scope){

	$scope.functions = [
		{ 'name' : 'rnorm' , 'description' : 'description of rnorm'},
		{ 'name' : 'qnorm' , 'description' : 'description of qnorm'},
		{ 'name' : 'pnorm' , 'description' : 'description of pnorm'}
	];

	$scope.test = "Controller 2 works!"
    
    ;
}]);


