var POS_X;
var POS_Y;

// Data
var JSON_DATA_GLOBAL;

// Ace Editor
var DATA_FILE = "datasets/UScereal.csv";
var DATA_VAR = "cereal.dt";
var TOKEN_CURRENT;

var CSV_TOKENS = {
	'header'	: 'header',
	'read'		: 'read.csv',
	'separator' : 'sep',
	'dataVar'	: 'cereal.dt',
	'file'		: 'file'
}

var PLOT_TOKENS = {
	'cmdPlot'		: 'ggplot',
	'plus'			: '+',
	'aesParam'		: 'aes',
	'dataParam' 	: 'data',
	'fillParam'		: 'fill',
	'colorParam'	: 'color',
	'dataVar'		: 'cereal.dt',
	'histogram'		: 'geom_histogram',
	'density'		: 'geom_density',
	'themeBw'		: 'theme_bw',
	'binwidth'		: 'binwidth'
}

// Plots
var CURRENT_PLOT = "";
var SELECTED_ITEMS = 0;
var FEATURE_SET = new Set();

var CHART_HEIGHT = 350;
var CHART_WIDTH = 700;

var HISTOGRAM_BINS = 10;
var HISTOGRAM_FILL = "steelblue";
var CHART_FILL = "#1975D1";
var CHART_BORDER = "black";

