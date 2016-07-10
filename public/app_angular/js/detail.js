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

                       

                        var pageNumber = null;
                        var tid = setInterval(function() {
                        	var content = document.getElementById("myIframe").contentWindow;
                            if (pageNumber) {
                            	
                            	//  content.document.getElementById("pageNumber").onpropertychange = function() {
                            	// 	console.log("changed");
                            	// };
                            	// document.querySelector("#myIframe #pageNumber").addEventListener('change', function() {
                            	// 	console.log("changed");
                            	// });
                                // $("#myIframe").contents().find("#pageNumber").on('clcik', )
                                var temp = content.document.getElementById("pageNumber").value;
                                if (temp != $scope.myPageNumber) {
                                	// $scope.myPageNumber = temp;
                                	// console.log('success');
                                	// console.log($scope.myPageNumber);
                                	document.getElementById("fuck").value = temp;
                                	console.log(document.getElementById("fuck").value);
                                }
  
                                
                                
                            } else {
                            	
                            	pageNumber = content.document.getElementById("pageNumber").value;
                            	// pageNumber = document.querySelector("#myIframe > #pageNumber").value;
                                // pageNumber = $("#myIframe").contents().find("#pageNumber").val();
                                console.log('fdsf')
                            }

                        }, 1000);

                        
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
