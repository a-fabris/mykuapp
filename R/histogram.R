cereal <- MASS::UScereal;

histogram <- function(){
	qplot(calories, data = cereal, geom="histogram"); 
}

histoFromFeature <- function(feature){
  qplot(eval(parse(text=paste(feature, sep=""))), data = cereal, geom="histogram", xlab=feature);
}

plotHistogram <- function(feature){

	ggplot(cereal) + aes_string(feature) + geom_histogram(binwidth = 5);
}

plotDensity <- function(feature){
	ggplot(cereal) + aes_string(feature) + geom_density(kernel="gaussian");
}

plotDotplot <- function(feature){
	ggplot(cereal) + aes_string(feature) + geom_dotplot();	
}
