function plot_histogram(){

	var dataset = [];
	var myData = JSON.parse(jsonDataGlobal);

	for (var key in myData) {
		if (myData.hasOwnProperty(key)) {	
    		if(myData[key].calories != null){
    			dataset.push(parseInt(myData[key].calories));	
    		}
  		}
	}
	
	//var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
	console.log("Histogram here, dataset calories:" + dataset);

	//Width and height
	var w = 500;
	var h = 400;
	var barPadding = 1;
	var barWidth = w / dataset.length;

	// Max and Min values
	var max = d3.max(dataset, function(d) {    //Returns 480
    	return d;  //References first value in each sub-array
	});

	var min = d3.min(dataset, function(d) {    //Returns 480
    	return d;  //References first value in each sub-array
	});

	// Create scales
	var xScale = d3.scale.linear()
					.domain([0, max])
					.range([0, w]);

	var yScale = d3.scale.linear()
					.domain([0, max])
					.range([h, 0]);



	console.log("Greatest value: " + max);

	//Create SVG element
	var svg = d3.select("#plot-zoom")
            	.append("svg")
            	.attr("width", w)
            	.attr("height", h);
	
	// Print rectangles
	svg.selectAll("rect")
	   	.data(dataset)
	   	.enter()
	   	.append("rect")
		.attr("x", function(d, i) {
		    //return i * (w / dataset.length - barPadding);
			return "translate(0," + i * h + ")";
		})
	   .attr("y", function(d) {
    		return h - yScale(d) * 4;  //Height minus data value
		})
	   .attr("width", barWidth -1)
	   .attr("height", function(d) {
    		return h - yScale(d);  //Just the data value
		})
	   .attr("fill", "teal");

	 // Print text
	 svg.selectAll("text")
   		.data(dataset)
   		.enter()
   		.append("text")
		.text(function(d) {
        	return d;
   		})
    	.attr("x", function(d, i) {
    	    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
    	})
    	.attr("y", function(d) {
    	    return h - (d * 4) + 14;
    	})
   		.attr("font-family", "sans-serif")
   		.attr("font-size", "11px")
   		.attr("fill", "black")
   		.attr("text-anchor", "middle");

}