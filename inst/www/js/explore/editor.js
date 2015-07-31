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

    if(token === null){
      tokenCurrent = "null";
    } else {
      tokenCurrent = token.value;
      console.log("current token" + tokenCurrent);
    }
  	
  	switch(tokenCurrent){

  		case csvTokens.header:
  			$('#editor').popover({
  				animation : true,
  				content: "<h3><code>"+ token.value +"</code>:</h3> A logical value indicating whether the file contains the names of the variables as its first line",
  				html: true,
  				placement: "top"
  			});
 			break;
  		
      case csvTokens.read:
  			$('#editor').popover({
  				animation : true,
  				content: "<h3><code>"+ token.value +"</code>:</h3> Reads a file in CSV format and creates a data frame from it, with cases corresponding to lines and variables to fields in the file.",
  				html: true,
  				placement: "top"
  			});
 			break;

      case csvTokens.separator:
        
        $( "#separator-param" ).css("border","2px solid red");

        $('#editor').popover({
          animation : true,
          content: "<h3><code>"+ token.value +"</code>:</h3> the field separator character. Values on each line of the file are separated by this character.",
          html: true,
          placement: "top"
        });
      break;

      case csvTokens.dataVar:
        $( "#dataVarInput" ).css("border","2px solid red");

        $('#editor').popover({
          animation : true,
          content: "<h3><code>"+ token.value +"</code>:</h3> Is the name of the object used to store the data frame.",
          html: true,
          placement: "top"
        });
      break;

      case "null":
        $( "#separator-param" ).css("border",""); 
        $( "#dataVarInput" ).css("border","");
  	}
});