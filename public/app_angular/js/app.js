/**
 * qingYun Module
 *
 * Description
 */

var qingYun = angular.module('qingYun', ['ui.router', '$http' ,'ngAnimate', 'home', 'login_signup', 'search-result', 'detail']);


qingYun.run(function($rootScope, $state, $stateParams, $http) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
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
});

qingYun.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: "/app_angular/templates/home.html"
                }
            }
        })
        .state('search-result', {
            url: '/search-result',
            views: {
                '': {
                    templateUrl: "/app_angular/templates/search-result.html"
                },
                'search-list@search-result': {
                    templateUrl: 'app_angular/templates/search-list.html'
                }
            }
        });

});

qingYun.controller('refresh', ['$scope', '$location',  function($scope, $location) {
    // window.onbeforeunload = function() {
    //     var n = window.event.screenX - window.screenLeft;
    //     var b = n > document.documentElement.scrollWidth - 20;
    //     if (b && window.event.clientY < 0 || window.event.altKey) {
    //         alert("这是一个关闭操作而非刷新");
    //         $location.path('/index');
    //     } else {
    //         alert("这是一个刷新操作而非关闭");
    //         $location.path('/index');
    //     }
    // }

}])
