function featureListener(){

	var feature;

	$('#data-features :checkbox').click(function() {
		
		var $this = $(this);
	  
		feature = $this.val();

	    if ($this.is(':checked')) {
	    	featureSet.add(feature);
	    	makePlotPreview(featureSet);
	    } else {
	        featureSet.delete(feature);
	    }

	});
}

function makePlotPreview(featureSet){

	/* decides which plot to show based on the number of features */
	switch(featureSet.size){
		case 1:
			console.log("One feature");

			var featureArr = Array.from(featureSet); // [1, "some text"]

			console.log("Feature to plot: " + featureArr[0]);

			// 1st: build template blocks
			var quadRow1 = "";
			quadRow1 += "<div class='row' id='quadRow1'>";
			quadRow1 += "<div class='col-md-5 plotQuadrant' id='plotQ1'></div><div class='col-md-5 plotQuadrant' id='plotQ2'></div>";
			quadRow1 += "</div>";
			
			var quadRow2 = "";

			quadRow2 = "<div class='row' id='quadRow2'>";
			quadRow2 += "<div class='col-md-5 plotQuadrant' id='plotQ3'></div><div class='col-md-5 plotQuadrant' id='plotQ4'></div>";
			quadRow2 += "</div>";		

			$( "#vis-area" ).append( quadRow1 );
			$( "#vis-area" ).append( quadRow2 );

			// 2nd: inject plots from R

			featureArr[0];
    		
    		var req = $("#plotQ1").rplot("plotHistogram",{
    			feature : featureArr[0]
    		});
    	
    		req = $("#plotQ2").rplot("plotDensity",{
    			feature : featureArr[0]
    		});

    		req = $("#plotQ3").rplot("plotDotplot",{
    			feature : featureArr[0]
    		});

    		//optional
    		req.fail(function(){
				alert("R returned an error: " + req.responseText); 
			});

			break;

		case 2:

			break;

		default:

			break;
	}

}
