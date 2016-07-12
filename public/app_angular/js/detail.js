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
                    templateUrl: '/app_angular/templates/pdf.html'
                },
                'questions@detail': {
                    templateUrl: '/app_angular/templates/questions.html'
                }
            }
        });
})


detail.controller('detail-content', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.name = 'detail-content';
    $rootScope.pageNumber = null;
    $rootScope.questionId = null;

    $scope.getQA = function() {
        // get question answers comments

        $scope.$broadcast('to-pdf-quesions', '666');
        console.log('get question answers comments');
    }
}]);


detail.controller('pdf', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.name = 'pdf';
    $scope.myHide = false;
    $scope.$on('to-pdf-quesions', function(event, data) {
        console.log(data);
        console.log(event);
        $scope.myHide = true;
    })

}]);


detail.controller('questions', ['$scope', '$rootScope', '$interval', function($scope, $rootScope, $interval) {
    $scope.questionsList = {};
    $scope.myHide = false;
    $scope.$on('to-pdf-quesions', function(event, data) {
        console.log(data);
        console.log(event);
        $scope.myHide = true;
    })
    
    var pageNumber = null;
    $interval(function() {
        var content = document.getElementById("myIframe").contentWindow;
        if (pageNumber) {
            var temp = content.document.getElementById("pageNumber").value;
            if ($rootScope.pageNumber === null) {
                //get current page questions
                $scope.questionsList = {'1':1};


                console.log('test 1');
                $rootScope.pageNumber = temp;
            }
            if (pageNumber != temp) {
                //get current page questions
                $scope.questionsList = {'1':1, '2':2};

                console.log('test 2');
                $rootScope.pageNumber = temp;
                pageNumber = temp;
            }
        } else {
            pageNumber = content.document.getElementById("pageNumber").value;
        }

    }, 1000);

}]);


detail.controller('one-question', ['$scope', function($scope) {
    $scope.name = "one-question";
    $scope.show = function() {
        console.log($scope.tinymceModel);
    };

}]);
