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

        $scope.tasks = [
            {"name" : "K-nearest-neighbor", "id": "task_knn"},
            {"name" : "Create function", "id": "task_funct"},
            {"name" : "Generate random sample", "id" : "task_sample"},
            {"name" : "Scale object", "id" : "task_scale"}
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

        $scope.setWorkspaceFromTask = function(task_id){
            switch(task_id){
                case "task_knn":
                    console.log("k nearest task");
                    break;
                default:
                    console.log("task unknow");
            }
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

                session.getObject(function(data){
                    //alert("type of data returned: " + data);
                    $("#workspace").text(data); 
                });
            });
                
            //if R returns an error, alert the error message
            req.fail(function(){
                alert("Server error: " + req.responseText);
            });
            
        }

        //read an external data table
        $scope.readcsv = function(){

            //because read.csv is in utils
            ocpu.seturl("https://public.opencpu.org/ocpu/library/utils/R");
            var myfile = $("#csvfile")[0].files[0];
            var myfileTxt = $('#csvfile').val();

            if(!myfile){
                alert("No file selected.");
            return;
            }

            //perform the request
            var req = ocpu.call("read.table", {
                "file" : myfile,
                "header" : false,
                "sep" : " "
            }, function(session){

                session.getObject(function(data){

                    //prints the json object into a table
                    var table = "<table class=\"table table-bordered\" id=\"dataframe\"></table>";
                    $("#workspace").html(table);

                    var dataHeaders = data.slice(0,1);
                    var header = "";

                    //table header
                    $.each(dataHeaders, function(index, value){
                        header = "<tr><td>#</td>";
                        $.each(value, function(idx, obj){
                            header = header + "<th>"+idx+"</th>";
                        });
                        header = header + "</tr>";
                    });

                    $("#dataframe").append(header);

                    $.each(data, function(index, value){
                        //console.log(index);
                        var row = "<tr><td>"+index+"</td>";
                        $.each(value, function(idx, obj){
                            //console.log(idx,obj);
                            row = row + "<td>"+obj+"</td>";
                        });
                        row = row + "</tr>";
                        $("#dataframe").append(row);
                    });
                });
                
            });

            //update transcript
            var editor = ace.edit("aceEditor");
            editor.insert("read.table("+ myfileTxt + ", header = FALSE, sep = \" \")\n");


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