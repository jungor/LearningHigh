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
                'submit-question@detail':{
                    templateUrl: '/app_angular/templates/submit-question.html'
                },
                'questions@detail': {
                    templateUrl: '/app_angular/templates/questions.html'
                },
                'one-question@detail': {
                    templateUrl: '/app_angular/templates/one-question.html'
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

        $scope.$broadcast('hide-and-get', '666');
        console.log('get question answers comments');
    }
}]);


detail.controller('pdf', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.name = 'pdf';
    $scope.myHide = false;
    $scope.$on('hide-and-get', function(event, data) {
        $scope.myHide = true;
    })

}]);


detail.controller('questions', ['$scope', '$rootScope', '$interval', function($scope, $rootScope, $interval) {
    $scope.questionsList = {};
    $scope.myHide = false;
    $scope.myHideList = true;

    $scope.show = function() {
        $scope.myHideList = !$scope.myHideList;
    }
    $scope.$on('hide-and-get', function(event, data) {
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
    $scope.myHide = true;

    $scope.$on('hide-and-get', function(event, data) {
        $scope.myHide = false;
        console.log('root get comments:');
    });

    $scope.show = function() {
        console.log($scope.tinymceModel);
    };

}]);


detail.controller('submit-question', ['$scope', function($scope){
    $scope.myHide = true;
    $scope.myHideOut = false;


    $scope.submit = function() {
        console.log($scope.title + $scope.content);
    }
    $scope.$on('hide-and-get', function(event, data) {
        $scope.myHideOut = true;
    })
    $scope.show = function() {
        $scope.myHide = !$scope.myHide;
    }
    
}])
