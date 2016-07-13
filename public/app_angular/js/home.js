var home = angular.module('home', []);

home.controller('HomeSearchController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.search = {}
    $scope.HomeSearch = function() {
    	console.log($scope.search.input);
        if ($scope.search.input != '') {
            $http({
                url: '/api/coursewares',
                method: 'GET',
                params: {key: $scope.search.input, pageId:'1'}
            }).success(function(data, header, config, status) {
                if (data.err == false) {
                    console.log(data)
                    console.log('success');
                    $rootScope.searchList = data;
                    // $location.path('/index');
                } else {
                    console.log("failed");
                   	console.log(data)
                }
            }).error(function(data, header, config, status) {
                console.log(data.err);
            });
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
