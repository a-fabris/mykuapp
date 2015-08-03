/* Ace editor controls */

// Initialization
var _editorPlot = ace.edit("editor-plot");
var _sessionPlot = _editorPlot.getSession();

// Settings
_editorPlot.setTheme("ace/theme/twilight");
_sessionPlot.setMode("ace/mode/r");
_editorPlot.$blockScrolling = Infinity; //suppress scroll warning

//coordinates for popover
//var offset, left, top;


$(document).click(function(e){

    console.log("X: " + e.pageX + " Y: " + e.pageY );
    POS_X = e.pageX;
    POS_Y = e.pageY;
});


// Events
_editorPlot.on('click', function(e) {

    $('#editor-plot').popover('destroy'); //destroys any previously created popover
    
    $('.popover').hide();

    var position = e.getDocumentPosition();
    
  	var token = _editorPlot.session.getTokenAt(position.row, position.column);

    if(token === null){
      TOKEN_CURRENT = "null";
    } else {
      TOKEN_CURRENT = token.value;
      console.log("current token" + TOKEN_CURRENT);
    }

    $( ".popover" ).text( "This is a custom popover" );
    var theHeight = $('.popover').height();
    var theWidth = $('.popover').width();

    //491 height
    //394 width
    //console.log(491-theHeight);
        
      $('.popover').show();
      $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
      $('.popover').css('left', (POS_X-70) +'px');
  	
  	switch(TOKEN_CURRENT){

  		case PLOT_TOKENS.cmdPlot:
        
        console.log("HIT GGPLOT");
        /*
  			$('#editor-plot').popover({
  				animation : true,
  				content: "<h3><code>"+ token.value +"</code>:</h3> Create a new ggplot plot. It is typically used to construct a plot incrementally, using the + operator to add layers to the existing ggplot object.",
  				html: true,
  				placement: "top"
  			});
        */
 			break;

      case PLOT_TOKENS.plus:
        $('#editor-plot').popover({
          animation : true,
          content: "<h3><code>"+ token.value +"</code>:</h3> The plus operator is used to add layers to the existing ggplot object",
          html: true,
          placement: "top"
        });

      case PLOT_TOKENS.aesParam:
        $('#editor-plot').popover({
          animation : true,
          content: "<h3><code>"+ token.value +"</code>:</h3> Generate aesthetic mappings that describe how variables in the data are mapped to visual properties (aesthetics) of geoms <br> Example: <br> <code>aes(x = calories, y = sugars)</code>",
          html: true,
          placement: "top"
        });

      case PLOT_TOKENS.dataParam:
        $('#editor-plot').popover({
          animation : true,
          content: "<h3><code>"+ token.value +"</code>:</h3> The dataset used to build the chart ",
          html: true,
          placement: "top"
        });
      case PLOT_TOKENS.histogram:
        $('#editor-plot').popover({
          animation : true,
          content: "<h3><code>"+ token.value +"</code>:</h3> Used to plot the distribution of a continuous variable. The heights of the bars are a count of cases in each group< ",
          html: true,
          placement: "top"
        });
      case PLOT_TOKENS.fillParam:
        $('#editor-plot').popover({
          animation : true,
          content: "<h3><code>"+ token.value +"</code>:</h3> Parameter used to set the interior colouring ",
          html: true,
          placement: "top"
        });

      case "null":
        
  	}
});

// Other events

$("#editor-plot").focusin(function(){
  $("#chart").css("border","3px dashed red");

});

$("#editor-plot").focusout(function(){
  $("#chart").css("border","");

});