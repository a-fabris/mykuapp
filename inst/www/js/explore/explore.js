/* Functions and Events for explore.html*/

// Events

$(document).ready(loadTable($("#separator-param").val()));

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

$( "#dataVarInput" ).focusin(function() {
  		var range = _editor.findAll($("#dataVarInput").val());
});	

$("#dataVarInput").focusout(function(){
	if (_editor.selection.rangeCount > 1){
		_editor.forEachSelection({exec : function(){
			_editor.clearSelection();
		}});
	} else {
		_editor.clearSelection();
	}
});

$( "#dataVarInput" ).keyup(function() { 
	_editor.replace( $( "#dataVarInput" ).val(), _editor.selection.getRange() );
	_editor.findAll($("#dataVarInput").val());
});


$("#separator-param").keyup(function(){
	var newSeparator = $("#separator-param").val();
	if(newSeparator != ""){
		loadTable(newSeparator);
	} else {
		hot.updateSettings({data : [[]] } );
	}

});


//Functions

function loadTable(delimVal){

	$.get("datasets/UScereal.csv", function(data){		
		Papa.parse(data, {
			delimiter : delimVal,
			complete: function(results) {
				//console.log(results.data);
				//hot.updateSettings({colHeaders : results.data[0]});
				hot.loadData(results.data);
				localStorage.setItem( 'tableData', JSON.stringify(results.data) );
				//_editor.gotoLine(1);
				var readString = buildReadString(dataFile, isChecked, delimVal) + "\n";
				_editor.insert(readString);
			}			
		});
	});			
}

function buildReadString(dataFile, isChecked, separator){
	var readString = "";
	var checkedStr = isChecked ? "TRUE" : "FALSE"; 
	readString += dataVar + "<- read.csv(file='"+dataFile+ "', header="+ checkedStr +", sep='"+separator +"')";
	return readString;
}

function colDeleteString(dataVar, feature){
	return dataVar + "<- " + dataVar +"[, "+ feature+":=NULL]";
}

function colAddString(feature){
	return dataVar + "<- dplyr::("+dataVar+",data.frame("+ feature + "=numeric(0)))";
}