library(ggplot2)
library(MASS)

histogram <- function(){
	qplot(calories, data = UScereal, geom="histogram"); 
}