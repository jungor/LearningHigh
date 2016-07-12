/**
* qingYun Module
*
* Description
*/

var qingYun = angular.module('qingYun', ['ui.router', 'detail', 'home', 'login_signup']);


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
		});

});