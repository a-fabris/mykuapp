$( init );
 
function init() {
  $('#rnorm').draggable({
  	cursor: 		"move",
  	zIndex: 		100,
  	//containment: 	"#workspace",
  	snap: 			"#rnorm"
  });
}