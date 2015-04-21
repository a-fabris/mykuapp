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
	$(#editor).text("rnorm triggered!");
}