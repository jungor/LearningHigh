/**
 * search-result Module
 *
 * Description
 */
var searchResult = angular.module('search-result', []);


searchResult.controller('search-list', ['$scope', '$rootScope','$location', function($scope, $rootScope, $location){
	$scope.slist = $rootScope.searchList.data;
	console.log($rootScope.searchList['data']);
	$scope.getIt = function(selectedFile) {
		$rootScope.selectedFile = selectedFile;
		$location.path('/detail');
	}
}])
