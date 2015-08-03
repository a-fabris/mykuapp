/* Handsontable setup */
var container = document.getElementById('data-preview-container');
var isChecked = true; //used to select header

/* Handsontable renderers */
function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
 	Handsontable.renderers.TextRenderer.apply(this, arguments);
 	td.style.textTransform = "uppercase";
 	td.style.backgroundColor =  "#EEE";
	td.style.color = "#222";
	td.style.textAlign = "center";
	td.style.fontWeight =  "normal";
	td.style.whiteSpace = "nowrap";
 	
}

function noHeaderRenderer(instance, td, row, col, prop, value, cellProperties) {
 	Handsontable.renderers.TextRenderer.apply(this, arguments);
}

function highlightRowRenderer(instance, td, row, col, prop, value, cellProperties){
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.textTransform = "uppercase";
    td.style.backgroundColor =  "red";
    td.style.color = "#FFFFFF";
    td.style.textAlign = "center";
    td.style.fontWeight =  "normal";
    td.style.whiteSpace = "nowrap";
}

function highlightBordersRenderer(instance, td, row, col, prop, value, cellProperties){
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.borderRight = "2px solid red";
    td.style.borderLeft = "2px solid red";
}



var hot = new Handsontable(container, {
  rowHeaders: function(row){
  	var txt;
  	if (row === 0) {
  		txt = "<input type='checkbox' id='checker' ";
  		txt += "data-toggle='tooltip' data-placement='left' title='Set as header'";
  		txt += isChecked ? 'checked="checked"' : '';
       		txt += ">";
  		return txt;
  	} else {
  		return row
  	}
  },
  contextMenu: true,
  customBorders: true,
	manualColumnMove: true,
 	manualRowMove: true,
 	manualColumnResize: true,
 	manualRowResize: true,
 	
  cells: function(row, col, prop){
 			var cellProperties = {};
 			if ((row === 0) && (isChecked)) {
       		cellProperties.renderer = firstRowRenderer; // uses function directly
     		} 
 			return cellProperties;
 	},
 	
  	beforeRemoveCol : function(index, amount){
 			var feature = hot.getDataAtCell (0, index);
 			console.log("column " + feature + " was removed");
 			_editor.insert( colDeleteString(dataVar, feature) + "\n");
 		},
 		afterCreateCol : function(index,amount){
 			hot.setDataAtCell (0, index, "a");
 			_editor.insert( colAddString("a") + "\n");
 		},
 		afterChange : function(changes){
 			var rowIndex;
 			if (changes != null){
 				rowIndex = changes[0][0];
 				/*saving the changes to local storage*/
 				localStorage.setItem( 'tableData', JSON.stringify({data: hot.getData()}) );
 				console.log("Stored data: \n");
			console.log(JSON.parse(localStorage.getItem('tableData')));
			//TODO: function to papa-unparse json to csv, call papa-parse to refresh after sep is changed
 			}
 			if (rowIndex === 0) {
 				var newVal = changes[0][3];
 				_editor.insert( colAddString(newVal) + "\n");
 			}
 		}
});

/* header event listener */
Handsontable.Dom.addEvent(container, 'mousedown', function (event) {
   if (event.target.nodeName == 'INPUT' && event.target.id == 'checker') {
    	event.stopPropagation();
   }
 });

Handsontable.Dom.addEvent(container, 'mouseup', function (event) {
  if (event.target.nodeName == 'INPUT' && event.target.id == 'checker') {
    isChecked = !event.target.checked;
    
    if(isChecked){
      hot.updateSettings({colHeaders : false});
    } else {
		  hot.updateSettings({colHeaders : function(col){
			 return "V" + col;
   		}});
    }   
    hot.render();
     
     var delimVal = $("#separator-param").val();
     _editor.insert(buildReadString(dataFile, isChecked, delimVal) + "\n");
   }
});

/* header event listener */

//TODO:  change mousemove to sth else, after load perhaps
Handsontable.Dom.addEvent(tableRenderer, 'click', function (event) {
  console.log("rendered");
  hot.render();
  event.stopPropagation();
 });

Handsontable.Dom.addEvent(editor, 'click', function (event) {
  
  switch(TOKEN_CURRENT){
    case "null":
      hot.updateSettings({cells: function(row, col, prop){
        var cellProperties = {};
        if ((row === 0) && (isChecked)) {
            cellProperties.renderer = firstRowRenderer; // uses function directly
        } 
        return cellProperties;
      }});    
    break;
    
    case CSV_TOKENS.header:
        hot.updateSettings({cells: function(row, col, prop){
          var cellProperties = {};
          if ((row === 0) && (isChecked)) {
            cellProperties.renderer = highlightRowRenderer; // uses function directly
          } 
          return cellProperties;
        }});
    break;

    case CSV_TOKENS.separator:
        hot.updateSettings({cells: function(row, col, prop){
          var cellProperties = {};
          if ((row === 0) && (isChecked)) {
            cellProperties.renderer = firstRowRenderer; // uses function directly
          } else {
            cellProperties.renderer = highlightBordersRenderer;
          }
          return cellProperties;
        }});    
    break;

  }

  hot.render();

});

