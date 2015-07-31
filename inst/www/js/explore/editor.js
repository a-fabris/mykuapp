/* Ace editor controls */

// Initialization
var _editor = ace.edit("editor");
var _session = _editor.getSession();

// Settings
_editor.setTheme("ace/theme/twilight");
_session.setMode("ace/mode/r");
_editor.$blockScrolling = Infinity; //suppress scroll warning
_editor.setValue("ciao");
// Events
_editor.on('click', function(e) {

    $('#editor').popover('destroy'); //destroys any previously created popover
    
    var position = e.getDocumentPosition();
  	var token = _editor.session.getTokenAt(position.row, position.column);
  	
  	switch(token.value){
  		case csvTokens.header:
  			$('#editor').popover({
  				animation : true,
  				content: "<code>"+ token.value +"</code>: A logical value indicating whether the file contains the names of the variables as its first line",
  				html: true,
  				placement: "left"
  			});
 			break;

  		case csvTokens.read:
  			$('#editor').popover({
  				animation : true,
  				content: "<code>"+ token.value +"</code>: Reads a file in CSV format and creates a data frame from it, with cases corresponding to lines and variables to fields in the file.",
  				html: true,
  				placement: "left"
  			});
 			break;
  	}
});