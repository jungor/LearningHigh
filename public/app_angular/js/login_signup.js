var login_signup = angular.module('login_signup', []);

login_signup.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('loginRegister', {
            url: '/login_signup',
            views: {
                '':{
                    templateUrl: "/app_angular/templates/login_signup.html"
                }
            },
        });
});

login_signup.controller("loginsignupController", ["$scope", '$rootScope', '$http', '$stateParams', '$location', function($scope, $rootScope, $http, $stateParams, $location) {
	$scope.user = {};
	$scope.loginHide = false;
	$scope.isFailed = false;
	$scope.message = "";
	$scope.logintabclick = function() {
		$scope.loginHide = false;
	}
	$scope.signuptabclick = function() {
		$scope.loginHide = true;	
	}
	$scope.closealert = function() {
		$scope.isFailed = false;
		$scope.message = "";
	}
	$scope.login = function() {
		if ($scope.user.username == null) {
			$scope.message = "User name cannot be empty!"
			$scope.isFailed = true;
		} else if ($scope.user.password == null) {
			$scope.message = "Password cannot be empty!"
			$scope.isFailed = true;
		} else {
			$http({
				url: '/api/users/login',
				method: 'POST',
				data: {username: $scope.user.username, password: $scope.user.password}
			}).success(function(data, header, config, status) {
				if (data.err == false) {
					$rootScope.id = data.data.id;
					$rootScope.username = data.data.username;
					$scope.isFailed = false;
					$scope.message = "";
					$location.path('/index');
				} else {
					$scope.message = "Login failed!"
					$scope.isFailed = true;
					$location.path('/login_signup');
				}
			}).error(function(data, header, config, status) {
				console.log(data.err);
			});
		}
	}
	$scope.signup = function() {
		if ($scope.user.username == null) {
			$scope.message = "User name cannot be empty!"
			$scope.isFailed = true;
		} else if ($scope.user.password == null) {
			$scope.message = "Password cannot be empty!"
			$scope.isFailed = true;
		} else {
			$http({
				url: '/api/users',
				method: 'POST',
				data: {username: $scope.user.username, password: $scope.user.password}
			}).success(function(data, header, config, status) {
				if (data.err == false) {
					$rootScope.id = data.data.id;
					$rootScope.username = data.data.username;
					$location.path('/index');
				} else {
					console.log("Sign up failed");
					$location.path('/login_signup');
				}
			}).error(function(data, header, config, status) {
				console.log(data.err);
			});
		}
	}
 }]);