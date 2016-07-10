/**
 * detail Module
 *
 * Description
 */
var detail = angular.module('detail', []);

detail.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('detail', {
            url: '/detail',
            views: {
                '': {
                    templateUrl: "/app_angular/templates/detail.html"
                },
                'navigation-bar@detail': {
                    templateUrl: '/app_angular/templates/navigation-bar.html'
                },
                'pdf@detail': {
                    templateUrl: '/app_angular/templates/pdf.html',
                    controller: function($scope) {
                        //console.log(angular.element("#fuck").val());
                        // console.log($("#myIframe").contents().find("#pageNumber").val());
                        // $("#myIframe").contents().find("#pageNumber").bind('input propertychange', function($scope) {
                        //     console.log('change');
                        // });
                        // console.log("fuck");
                        // while($("#myIframe").contents().find("#pageNumber").val() == undefined) {

                        // }


                        // var pageNumber = null;
                        // var tid = setInterval(function() {
                        //     if (pageNumber) {
                        //         $("#myIframe").contents().find("#pageNumber").on('clcik', )

                                
                        //         clearInterval(tid);
                        //     } else {
                        //         pageNumber = $("#myIframe").contents().find("#pageNumber").val();

                        //     }

                        // }, 1000);

                        
                        // document.getElementById('myIframe').onload(function() {
                        // 	// body...
                        // 	console.log($("#myIframe").contents().find("#pageNumber").val());
                        // })

                    }
                },
                'discuss@detail': {
                    templateUrl: '/app_angular/templates/discuss.html'
                }
            }
        });
})
