var home = angular.module('home', []);

home.controller('HomeSearchController', ['$scope', '$rootScope', '$http', '$location' ,function($scope, $rootScope, $http, $location) {
    $scope.search = {}
    $scope.isfailed = false;
    $scope.message = "";
    $scope.HomeSearch = function() {
        if ($scope.search.input != null) {
            $http({
                url: '/api/coursewares',
                method: 'GET',
                params: {key: $scope.search.input, pageId:'1'}
            }).success(function(data, header, config, status) {
                if (data.err == false) {
                    // console.log(data)
                    // console.log('success');
                    $scope.isfailed = false;
                    $rootScope.searchList = data;
                    $location.path('/search-result');
                    jQuery('html,body').animate({scrollTop:0}, 200);
                } else {
                    $scope.isfailed = true;
                    $scope.message = "Please log in first...";
                }
            }).error(function(data, header, config, status) {
                
            });
        } else {
            $scope.isfailed = true;
            $scope.message = "Please input something...";
        }
    }
    $scope.closealert = function() {
        $scope.isfailed = false;
        $scope.message = "";
    }
}]);
home.controller('loginBoxController', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
    $scope.islogin = $rootScope.id == undefined ? false : true;
    $scope.notlogin = $rootScope.id == undefined ? true : false;
    $scope.logout = function() {
        $rootScope.id = undefined;
        $rootScope.username = undefined;
        $scope.islogin = $rootScope.id == undefined ? false : true;
        $scope.notlogin = $rootScope.id == undefined ? true : false;
        $http({
            url: '/api/users/logout/',
            method: 'GET'
        }).success(function(data, header, config, status) {
            if (data.err == false) {
                console.log("log out succeed");
            } else {
                console.log("log out failed");
            }
        });
    }
    $scope.login = function() {
        $location.path('/login_signup');
    }
}]);
