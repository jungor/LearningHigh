var home = angular.module('home', []);

home.controller('HomeSearchController', ['$scope', function($scope){
	$scope.HomeSearch = function() {
		if($scope.search.input != '') {
			$http({
				url: '',
				method: 'POST',
				data: {}
			})
		}
	}
}])
