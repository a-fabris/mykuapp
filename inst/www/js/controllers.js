'use strict';

var kuAppControllers = angular.module("kuAppControllers",[]);

var tasks;

kuAppControllers.controller("headerController", ["$scope", "$http",  function($scope, $http) {

        $scope.headerTitle = "Direct manipulation interfaces as a transition to textual programming";

        $scope.infoEntry = [
            {"name" : "about"},
            {"name" : "help"}
        ];

        $scope.navigationEntry = [
            {"name" : "file"},
            {"name" : "tasks"}
        ];

        $http.get('data/tasks.json').success(function(data) {
            $scope.tasks = tasks = data;
        });


}]);

/* Controller for k nearest neighbor*/

kuAppControllers.controller("TaskKnnController",["$scope", function($scope){



    $scope.templateSrc = false;

    /* set ace editor properties */
    $scope.aceOptions = {
        theme : 'solarized_dark',
        mode : 'r',
        useWrapMode : 'true'
    };

    // access editor
    var editor = ace.edit("aceEditor");

    $scope.stepsTitle = "Subgoals"

    // should be temporary! take the data from the json file
    $scope.steps = [
        { "id" : "load",    "description" : "Load Data", "src" : "html/tasks/step1.html"  },
        { "id" : "norm",    "description" : "Normalize", "src" : "html/tasks/step2.html" },
        { "id" : "cfold",   "description" : "Cross-fold validation"},
        { "id" : "train",   "description" : "Train the classifier"},
        { "id" : "test",    "description" : "Test the classifier"} 
    ];

    //initialize the html of the first step
    $scope.stepContext = { context : "load"};

    $scope.loadStepContext = function(stepId){
        $scope.stepContext = { context : stepId};
    }

    $scope.loadCsv = function(){

        

        //var csvFile = $("#trainingFile")[0].files[0];
        var trainFilePath = "data/IrisTest2014.csv";

        //console.log($('#csvfile').val());
    
        /*if(!csvFile){
            alert("No file selected.");
        return;
        }*/

        d3.csv(trainFilePath, function(data) {
            // the columns you'd like to display

            editor.insert("trainDt <- read.table("+ trainFilePath + ", header = TRUE, sep = \",\")\n");
            editor.insert("ggplot(trainDt, aes(x=a, y=b, color=target)) + geom_point(size=3, aes(colour=target, shape=target))");

            var columns = d3.keys(data[0]);

            var dataset = [];

            //i = 1 to exclude headers
            var i;
            for(i = 0 ; i < data.length ; i++){
                var x = data[i].a;
                var y = data[i].b;
                var z = data[i].target;
                dataset.push([x,y,z]);
            }

            console.log(dataset);
            
            //makeScatterPlot(dataset);

            var table = d3.select("#tableHolder").append("table").attr("class", "table table-bordered"),
                thead = table.append("thead"),
                tbody = table.append("tbody");
        
            // append the header row
            thead.append("tr")
                .selectAll("th")
                .data(columns)
                .enter()
                .append("th")
                    .text(function(column) { return column; });
        
            // create a row for each object in the data
            var rows = tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr");
        
            // create a cell in each row for each column
            var cells = rows.selectAll("td")
                .data(function(row) {
                    return columns.map(function(column) {
                        return {column: column, value: row[column]};
                    });
                })
                .enter()
                .append("td")
                    .text(function(d) { return d.value; });

            /* Make scatter plot */

            //Width and height
            var w = 400;
            var h = 300;
            var padding = 30;
            
            //x-axis scale
            var xScale = d3.scale.linear()
              .domain([0, d3.max(dataset, function(d) { return d[0]; })])
              .range([padding, w - padding * 2]);
            
            // y-axis scale
            var yScale = d3.scale.linear()
              .domain([0, d3.max(dataset, function(d) { return d[1]; })])
              .range([h - padding, padding]);
            
            //radius scale
            var rScale = d3.scale.linear()
              .domain([0, d3.max(dataset, function(d) { return d[1]; })])
              .range([2, 5]);
            
            var color = d3.scale.category10();
            
            //Create SVG element
            var svg = d3.select("#plotHolder")
              .append("svg")
              .attr("width", w)
                      .attr("height", h);
            
                  svg.selectAll("circle")
                  .data(dataset)
                  .enter()
                  .append("circle")
                    .attr("cx", function(d) {
                      return xScale(d[0]);
                    })
                    .attr("cy", function(d) {
                      return yScale(d[1]);
                    })
                    .attr("r", function(d){
                      return rScale(d[1]);
                    })
                    .attr("fill", function(d){
                      return color(d[2]);
                    });
            
            //Define X axis
            var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom")
              .ticks(5);  //Set rough # of ticks
            
            //Define Y axis
            var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left")
              .ticks(5);
            
            //Create X axis
            svg.append("g")
                  .attr("class", "axis")  //Assign "axis" class
                  .attr("transform", "translate(0," + (h - padding) + ")")
                  .call(xAxis);
            
            //Create Y axis
            svg.append("g")
                  .attr("class", "axis")
                  .attr("transform", "translate(" + padding + ",0)")
                  .call(yAxis);
            
            /* make legend */
              var legendRectSize = 18;
              var legendSpacing = 4;
            
              console.log(color.domain())
            
              var legend = svg.selectAll(".legend")
                .data(color.domain())
                .enter()
                .append("g")
                .attr("class","legend")
                .attr("transform", function(d,i){
                  var height = legendRectSize + legendSpacing;
                  var offset =  height * color.domain().length / 2;
                  var horz = -2 * legendRectSize;
                  var vert = i * height - offset;
                  return 'translate(' + (padding+300) + ',' + (vert+200) + ')';
                });
            
              legend.append('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .style('fill', color)
                .style('stroke', color);
            
              legend.append('text')
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function(d) { return d; });
            
            
                    });
                }

}]);