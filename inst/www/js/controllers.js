'use strict';

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
            {"name" : "rnorm", "id" : "rnorm"},
            {"name" : "mean", "id" : "mean"},
            {"name" : "standard deviation" , "id" : "sd"}

        ];

		$scope.aceOptions = {
			theme : 'solarized_dark',
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

        $scope.rnorm = function(){

            ocpu.seturl("https://public.opencpu.org/ocpu/library/stats/R");

            ocpu.call("rnorm", {n:100}, function(session){
                session.getObject(function(data){
                    //alert("First few values:" + data.slice(0,3));
                    $("#output").text(data.slice(0,3));
                });
            });
        }

        $scope.runcode = function(){

            //because identity is in base
            ocpu.seturl("https://public.opencpu.org/ocpu/library/base/R");

            // access editor
            var editor = ace.edit("aceEditor");
            var code = editor.getSession().getValue();

            //arguments
            var mysnippet = new ocpu.Snippet(code);

            //disable button
            $("runbutton").attr("disabled", "disabled");
        
            //perform the request
            var req = ocpu.call("identity", {
                "x" : mysnippet
            }, function(session){
                session.getConsole(function(outtxt){
                    //alert(typeof outtxt);
                    var obj = $.parseJSON(outtxt)
                    
                    alert(obj);
                    //$("#workspace").text(outtxt); 
                });
            });
                
            //if R returns an error, alert the error message
            req.fail(function(){
                alert("Server error: " + req.responseText);
            });
            
        }

        $scope.readcsv = function(){

            //because read.csv is in utils
            ocpu.seturl("https://public.opencpu.org/ocpu/library/utils/R");
            var myfile = $("#csvfile")[0].files[0];

            if(!myfile){
                alert("No file selected.");
            return;
            }

            //disable the button during upload
            $("#readfile").attr("disabled", "disabled");

            //perform the request
            var req = ocpu.call("read.csv", {
                "file" : myfile,
                "header" : false,
                "sep" : " "
            }, function(session){
                session.getConsole(function(outtxt){
                $("#workspace").text(outtxt); 
                });
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