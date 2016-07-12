var home = angular.module('home', []);

home.controller('HomeSearchController', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.search = {}
	$scope.HomeSearch = function() {
		if($scope.search.input != '') {
			// $http({
			// 	url: '',
			// 	method: 'POST',
			// 	data: {}
			// })
		}
	}
}]);
home.controller('loginBoxController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	$scope.islogin = $rootScope.id == undefined ? false : true;
	$scope.notlogin = $rootScope.id == undefined ? true : false;
	$scope.logout = function() {
		$rootScope.id = undefined;
		$rootScope.username = undefined;
		$scope.islogin = $rootScope.id == undefined ? false : true;
		$scope.notlogin = $rootScope.id == undefined ? true : false;
	}
	$scope.login = function() {
		$location.path('/login_signup/login');
	}
	$scope.signup = function() {
		$location.path('/login_signup/signup');
	}
}]);
