'use strict';

ocpu.seturl("https://public.opencpu.org/ocpu/library/stats/R");

var app = angular.module("app",['ui.ace']);


app.controller("mainController", ["$scope",  function($scope) {

        $scope.headerTitle = "Direct manipulation interfaces as a transition to textual programming";

        $scope.infoEntry = [
            {"name" : "about"},
            {"name" : "help"}
        ];

        $scope.navigationEntry = [
            {"name" : "file"},
            {"name" : "tasks"}
        ];

        $scope.menuEntry = [
            {"name" : "rnorm"},
            {"name" : "mean"},
            {"name" : "standard deviation"}

        ];

		$scope.aceOptions = {
			theme : 'monokai',
			mode : 'r',
			useWrapMode : 'true'
		};

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

        $scope.runcode = function(){
            ocpu.call("rnorm", {n:100}, function(session){
                session.getObject(function(data){
                    //alert("First few values:" + data.slice(0,3));
                    $("#output").text(data.slice(0,3));
                });

                //retrieve session console (stdout) async
                //    session.getConsole(function(outtxt){
                //        $("#output").text(outtxt);
                //});
            });
            
        }

}]);

/*
app.controller("controller2",["$scope", function($scope){

	$scope.functions = [
		{ 'name' : 'rnorm' , 'description' : 'description of rnorm'},
		{ 'name' : 'qnorm' , 'description' : 'description of qnorm'},
		{ 'name' : 'pnorm' , 'description' : 'description of pnorm'}
	];

	$scope.test = "Controller 2 works!"
    
    ;
}]);
*/