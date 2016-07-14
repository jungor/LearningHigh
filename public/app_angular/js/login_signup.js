var login_signup = angular.module('login_signup', ["ui.bootstrap"]);

login_signup.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('loginRegister', {
            url: '/login_signup/{state}',
            views: {
                '':{
                    templateUrl: "/app_angular/templates/login_signup.html"
                }
            },
        });
});

login_signup.controller("loginsignupController", ["$scope", '$rootScope', '$http', '$stateParams', '$location', function($scope, $rootScope, $http, $stateParams, $location) {
	var state = $stateParams.state;
	$scope.activeForm = state == "login" ? 0 : 1;
	$scope.user = {};
	$scope.login = function() {
		$http({
			url: '/api/users/login',
			method: 'POST',
			data: {username: $scope.user.username, password: $scope.user.password}
		}).success(function(data, header, config, status) {
			if (data.err == false) {
				$rootScope.id = data.data.id;
				$rootScope.username = data.data.username;
				$location.path('/index');
			} else {
				console.log("Log in failed");
				$location.path('/login_signup');
			}
		}).error(function(data, header, config, status) {
			console.log(data.err);
		});
	}
	$scope.signup = function() {
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
		})
	}
 }]);