function featureListener(){

	$('#data-features :checkbox').click(function() {
		
		var $this = $(this);
	  
		feature = $this.val();

	    if ($this.is(':checked')) {
	    	featureSet.add(feature);
	    } else {
	        featureSet.delete(feature);
	    }

	    
	});	
}
