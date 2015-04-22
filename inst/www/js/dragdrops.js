$( init );
 
function init() {
  $('#rnorm').draggable({
  	cursor: 		"move",
  	zIndex: 		100,
  	//containment: 	"#workspace",
  	helper: 		"clone",
  	stop: 			rnormstop
  });
}

function rnormstop(event, ui){
	// access editor
	var editor = ace.edit("aceEditor");
	// retrieve code
	var code = editor.getSession().getValue();
	// set code
	editor.getSession().setValue("rnorm(100) \nsource of newline");
}