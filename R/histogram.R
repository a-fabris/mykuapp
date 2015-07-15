cereal <- MASS::UScereal;

histogram <- function(){

	
	qplot(calories, data = cereal, geom="histogram"); 

}

histoFromFeature <- function(feature){
    
  qplot(eval(parse(text=paste(feature, sep=""))), data = cereal, geom="histogram", xlab=feature);

}