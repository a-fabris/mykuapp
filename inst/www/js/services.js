'use strict';

angular.module("appServices").service("featureListModel", function() {

	var featureSet = new Set();
	var selectedItems = 0;

	this.updateChecked = function(feature){
		if(featureSet.has(feature)){
    		featureSet.delete(feature);
    	} else {
    		featureSet.add(feature);
    	}
		selectedItems = featureSet.size;
		$rootScope.$broadcast('featureModel::checkedFeatureUpdated', feature );
	};

});