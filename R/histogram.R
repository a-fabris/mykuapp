library(ggplot2)
library(MASS)

histogram <- function(){

	cereal <- UScereal;

	qplot(calories, data = cereal, geom="histogram"); 
}