library(ggplot2)
library(MASS)

histogram <- function(){
	ggplot2::qplot(calories, data = UScereal, geom="histogram"); 
}