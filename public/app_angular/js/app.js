/**
* qingYun Module
*
* Description
*/

var qingYun = angular.module('qingYun', ['ui.router', 'detail', 'home', 'login_signup','search-result']);


qingYun.run(function($rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

qingYun.config(function($stateProvider, $urlRouterProvider) {
	//$urlRouterProvider.otherwise("/index");
	$stateProvider
		.state('index', {
			url: '/index',
			views: {
				'':{
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
                	templateUrl:'app_angular/templates/search-list.html'
                }
            }
        });

});