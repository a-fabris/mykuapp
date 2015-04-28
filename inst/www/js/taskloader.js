$( taskLoader );

function taskLoader(){


	$("#task_load").click(function(){

		$("#dashboard").html(" \
				<div class=\"col-md-3\"> <!-- panel menu content --> \
                    <div class=\"panel panel-primary\"> \
                        <div class=\"panel-heading text-center\">Menu</div> \
                        <div class=\"panel-body\"> \
                            <a href=\"#\"><span class=\"label label-primary\" id=\"rnorm\">rnorm</span></a> \
                            <a href=\"#\"><span class=\"label label-primary\" id=\"mean\">mean</span></a> \
                            <a href=\"#\"><span class=\"label label-primary\" id=\"sd\">standard deviation</span></a> \
                        </div> \
                    </div>\
                </div> \
                <div class=\"col-md-5\"> <!-- workspace --> \
                    <div class=\"panel panel-primary\"> \
                        <div class=\"panel-heading text-center\">Workspace</div> \
                        <div class=\"panel-body\" id=\"workspace\"></div> \
                    </div> \
                </div>  \
			");

		

	});


		 
}