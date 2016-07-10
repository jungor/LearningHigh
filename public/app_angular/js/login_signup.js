var login_signup = angular.module('login_signup', ["ui.bootstrap"]);

login_signup.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('loginRegister', {
            url: '/login_signup',
            views: {
                '':{
                    templateUrl: "/app_angular/templates/login_signup.html"
                }
            }
        });
});

login_signup.controller("loginsignupController", ["$scope", function($scope) {
	$scope.login = function() {
		$http({
			url: '/api/users/login',
			method: 'POST',
			data: {username: $scope.user.username, password: $scope.user.password}
		}).success(function(data, header, config, status) {
			$rootScope.id = data.id;
			$rootScope.username = data.username;
			$location.path('/index');
		}).error(function(data, header, config, status) {
			console.log("Log in failed");
			$location.path('/login_signup');
		})
	}
	$scope.signup = function() {
		$http({
			url: '/api/users',
			method: 'POST',
			data: {username: $scope.user.username, password: $scope.user.password}
		}).success(function(data, header, config, status) {
			$rootScope.id = data.id;
			$rootScope.username = data.username;
			$location.path('/index');
		}).error(function(data, header, config, status) {
			console.log("Sign up failed");
			$location.path('/login_signup');
		})
	}
 }]);