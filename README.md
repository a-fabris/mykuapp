# Synopsis
Repository of my Master's thesis project at the University of Copenhagen:

"Designing a direct manipulation interface to help novices learn data analysis in R".

Keywords: *HCI, direct manipulation interfaces, information visualization, R*.

#Motivation

Learning a language is hard. The idea is to leverage a direct manipulation interface to translate graphical
interactions into native R commands. The user can affect the results either by directly editing the code or using the menu objects.

Goals:

* Learning by example
* Familiarizing with R constructs
* Foster the interplay between visual results and textual commands.

Features:

* Select a default dataset 
* Profile the data
* Explore distributions and correlations
* Edit, expand and run the native R code

#Live Demo
https://public.opencpu.org/ocpu/github/afabris86/mykuapp/www

#Installation
Dependencies (tested):

`R 3.2.1`

```
opencpu 1.4.6
MASS 7.3-41
ggplot2 1.0.1
jsonlite 0.9.16
dplyr 0.4.2
```
This software is an OpenCPU web app on top of an R server. Installation:

Open a terminal and type:

```
R
install_github("afabris86/mykuapp")
library(opencpu)
opencpu$browse("library/mykuapp/www")
```





