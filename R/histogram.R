
histogram <- function(){

	cereal <- MASS::UScereal;

	qplot(calories, data = cereal, geom="histogram"); 
}