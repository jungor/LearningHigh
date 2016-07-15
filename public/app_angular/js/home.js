var home = angular.module('home', []);

home.controller('HomeSearchController', ['$scope', '$rootScope', '$http', '$location' ,function($scope, $rootScope, $http, $location) {
    $scope.search = {}
    $scope.HomeSearch = function() {
    	// console.log($scope.search.input);
        if ($scope.search.input != '') {
            $http({
                url: '/api/coursewares',
                method: 'GET',
                params: {key: $scope.search.input, pageId:'1'}
            }).success(function(data, header, config, status) {
                if (data.err == false) {
                    // console.log(data)
                    // console.log('success');
                    $rootScope.searchList = data;
                    $location.path('/search-result');
                    jQuery('html,body').animate({scrollTop:0}, 200);
                } else {
                    // console.log("failed");
                   	console.log(data.err);
                }
            }).error(function(data, header, config, status) {
                // console.log(data.err);
                // console.log('shenmegui');
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
        $location.path('/login_signup');
    }
}]);
