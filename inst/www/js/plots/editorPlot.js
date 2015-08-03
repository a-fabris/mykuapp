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
//491 height
//394 width
//console.log(491-theHeight);

//popover dynamic text
popoverText = "";
var popTimeout;

$("#editor-plot").mousemove(function(e){
    //console.log("X: " + e.pageX + " Y: " + e.pageY );
    POS_X = e.pageX;
    POS_Y = e.pageY;    
});


_editorPlot.on('mousedown', function(){
  
  popTimeout = setTimeout(function(){
    $('.popover').show();
  }, 50);

});

_editorPlot.on('mouseup', function(){
  
  $('.popover').hide();
  clearTimeout(popTimeout);
});


// Events
_editorPlot.on('mousemove', function(e) {
   
    var position = e.getDocumentPosition();
    
  	var token = _editorPlot.session.getTokenAt(position.row, position.column);

    if(token === null){
      TOKEN_CURRENT = "null";
    } else {
      TOKEN_CURRENT = token.value;
      //console.log("current token" + TOKEN_CURRENT);
    }
  	
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
        
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> Create a new ggplot plot. It is typically used to construct a plot incrementally, using the <b>+</b> operator to add layers to the existing ggplot object."
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
 			break;
      
      case PLOT_TOKENS.plus:
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> The plus operator is used to add layers to the existing ggplot object"
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;

      case PLOT_TOKENS.aesParam:
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> Generate aesthetic mappings that describe how variables in the data are mapped to visual properties (aesthetics) of geoms <br> Example: <br> <code>aes(x = calories, y = sugars)</code>"
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;

      case PLOT_TOKENS.dataParam:
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> The dataset used to build the chart"
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;

      case PLOT_TOKENS.histogram:
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> Used to plot the distribution of a continuous variable. The heights of the bars are a count of cases in each group"
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;

      case PLOT_TOKENS.density:
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> Shows the probability density function using kernel density estimation"
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;

      case PLOT_TOKENS.fillParam:
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> Parameter used to set the interior colouring "
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;

      case PLOT_TOKENS.colorParam:
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> Parameter used to set the border colouring "
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;

      case PLOT_TOKENS.themeBw:
        popoverText = "<h3><code>"+ token.value +"</code>:</h3> A theme with white background and black gridlines."
        $( ".popover" ).html( popoverText );
        var theHeight = $('.popover').height();
        var theWidth = $('.popover').width();
        $('.popover').css('top', (POS_Y-(theHeight)-35) +'px');
        $('.popover').css('left', (POS_X-130) +'px');
      break;

      case "null":
        $('.popover').hide();
      break;

      default:
        $('.popover').hide();
  	}
});

// Other events

$("#editor-plot").focusin(function(){
  $("#chart").css("border","3px dashed red");
  $("#editor-plot").css("border","3px dashed red");
  //$("#editor-plot").css("padding","2px");

});

$("#editor-plot").focusout(function(){
  $("#chart").css("border","");
  $("#editor-plot").css("border","");
  $("#editor-plot").css("padding","");

});

$("#plotEditUndo").click(function(){
  _editorPlot.undo();
});

$("#plotEditRedo").click(function(){
  _editorPlot.redo();
});