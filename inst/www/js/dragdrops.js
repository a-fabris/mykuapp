$( init );


function init() {

	// access editor
	var editor = ace.edit("aceEditor");

	$('#workspace').droppable({
		drop : funDropped
	});

  	$('#rnorm').draggable({
  		cursor: 		"move",
  		//zIndex: 		100,
  		containment: 	'document',
  		helper: 		"clone"
  		//stop: 			rnormstop
  	});


	$('#mean').draggable({
  		cursor: 		"move",
  		//zIndex: 		100,
  		containment: 	'document',
  		//helper: 		"clone"
  		//stop: 			rnormstop
  	});

	function funDropped(event, ui){
	
		var dragged = $(ui.draggable).attr("id");
	
		if(dragged == "rnorm"){
			$('#rnorm-modal').on('hidden.bs.modal', function(){
				
				var observations = $("#rnorm-obs").val();
	
				var code = "";
				// retrieve code
				code = editor.getSession().getValue();
	
				// set code
				editor.insert("rnorm(" + observations.toString() + ")");
	
				//editor.getSession().setValue(code + "rnorm(" + observations.toString() + ")");
			}).modal('show');	
		} else if (dragged == "mean") {
				var code = "";
				// retrieve code
				code = editor.getSession().getValue();
	
				// set code
				editor.insert("mean\n");
		}
	
	}

}

/*
function rnormstop(event, ui){

	// access editor
	var editor = ace.edit("aceEditor");
	// retrieve code
	var code = editor.getSession().getValue();	
	// set code
	editor.getSession().setValue("rnorm()");

}
*/

