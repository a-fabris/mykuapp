/* Ace editor controls */

// Initialization
var _editor = ace.edit("editor");
var _session = _editor.getSession();

// Settings
_editor.setTheme("ace/theme/twilight");
_session.setMode("ace/mode/r");
_editor.$blockScrolling = Infinity; //suppress scroll warning

//popover dynamic text
popoverText = "";
var popTimeout;

$("#editor").mousemove(function(e){
    console.log("X: " + e.pageX + " Y: " + e.pageY );
    POS_X = e.pageX;
    POS_Y = e.pageY;    
});


_editor.on('mousedown', function(){
  
  popTimeout = setTimeout(function(){
    $('.popover').show();
  }, 50);

});

_editor.on('mouseup', function(){
  
  $('.popover').hide();
  clearTimeout(popTimeout);
});

// Events
_editor.on('mousemove', function(e) {

    //$('#editor').popover('destroy'); //destroys any previously created popover
    
    var position = e.getDocumentPosition();
  	var token = _editor.session.getTokenAt(position.row, position.column);

    if(token === null){
      TOKEN_CURRENT = "null";
    } else {
      TOKEN_CURRENT = token.value;
      console.log("current token" + TOKEN_CURRENT);
    }
  	
  	switch(TOKEN_CURRENT){

  		case CSV_TOKENS.header:
  			/*
        $('#editor').popover({
  				animation : true,
  				content: "<h3><code>"+ token.value +"</code>:</h3> A logical value indicating whether the file contains the names of the variables as its first line",
  				html: true,
  				placement: "top"
  			});
        */
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> A logical value indicating whether the file contains the names of the variables as its first line"
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
 			break;
  		
      case CSV_TOKENS.read:
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> Reads a file in CSV format and creates a data frame from it, with cases corresponding to lines and variables to fields in the file."
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
 			break;

      case CSV_TOKENS.separator:
        
        $( "#separator-param" ).css("border","2px solid red");

        popoverText = "<h3><code>"+ token.value +"</code>:</h3> the field separator character. Values on each line of the file are separated by this character."
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;

      case CSV_TOKENS.dataVar:
        $( "#dataVarInput" ).css("border","2px solid red");

        popoverText = "<h3><code>"+ token.value +"</code>:</h3> Is the name of the object used to store the data frame."
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;
      
      case "null":
        $('.popover').hide();
        $( "#separator-param" ).css("border",""); 
        $( "#dataVarInput" ).css("border","");
      break;

      default:
        $('.popover').hide();
  	}
});

// Other Events
$("#editor").focusin(function(){
  $("#dataTableRow").css("border","3px dashed red");

});

$("#editor").focusout(function(){
  tokenCurrent = "null";
  $("#dataTableRow").css("border","");
  $( "#separator-param" ).css("border",""); 
  $( "#dataVarInput" ).css("border","");
  $('#editor').popover('destroy');
});

$("#editUndo").click(function(){
  _editor.undo();
});

$("#editRedo").click(function(){
  _editor.redo();
});
