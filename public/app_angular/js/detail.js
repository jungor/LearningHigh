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
                'pdf@detail': {
                    templateUrl: '/app_angular/templates/pdf.html'
                },
                'submit-question@detail': {
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

detail.controller('detail-all', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
    $scope.search = function() {
        //console.log('ffff');
        console.log('searchKey : ' + $scope.searchKey);
        $http({
            url: '/api/coursewares',
            method: 'GET',
            params: { key: $scope.searchKey, pageId: '1' }
        }).success(function(data, header, config, status) {
            if (data.err == false) {
                $rootScope.searchList = data;
                $location.path('/search-result');
            } else {
                console.log("failed");
            }
        }).error(function(data, header, config, status) {
            // console.log(data.err);
            // console.log('shenmegui');
        });
    }

    $scope.$on('to-detail-all', function(e, d) {
        // body...
        $scope.detailHide = true;
    });
    $scope.buttonHide = true;

    $scope.showTop =function() {
        $scope.$broadcast('hide-and-get', 'shwotop');
        $scope.buttonHide = true;
        console.log('buttonHide'+ $scope.buttonHide);
    }



}])


detail.controller('detail-content', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.pageNumber = null;
    $rootScope.questionId = null;


    $scope.getQA = function(id) {
        // get question answers comments
        $rootScope.questionId = id;
        $scope.$broadcast('hide-and-get', '666');
        $scope.$broadcast('to-get-AC', 'AC');
        $scope.buttonHide = !$scope.buttonHide;
    }
}]);


detail.controller('pdf', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.myHide = false;
    if ($rootScope.selectedFile == undefined) {
        $scope.$emit('to-detail-all', 'hide');
        $location.path('/index');
    } else {
        $scope.fileUrl = '/components/viewerjs/ViewerJS/#../../..' + $rootScope.selectedFile.url;
        $scope.name = 'pdf';
        $scope.myHide = false;
        $scope.$on('hide-and-get', function(event, data) {
            $scope.myHide = !$scope.myHide;
        });
    }


}]);


detail.controller('questions', ['$scope', '$rootScope', '$interval', '$http', function($scope, $rootScope, $interval, $http) {
    $scope.questionsList = null;
    $scope.myHide = false;
    $scope.myHideList = true;

    $scope.show = function() {
        $scope.myHideList = !$scope.myHideList;
    }
    $scope.$on('hide-and-get', function(event, data) {
        $scope.myHide = !$scope.myHide;
    })

    $scope.stopFight = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };


    var pageNumber = null;
    var stop = $interval(function() {
        if (document.getElementById("myIframe") == null) {
            $scope.stopFight();
            console.log('stop');
        } else {
            var content = document.getElementById("myIframe").contentWindow;
            if (pageNumber) {
                var temp = content.document.getElementById("pageNumber").value;
                if ($rootScope.pageNumber === null) {
                    //get current page questions
                    $rootScope.pageNumber = temp;
                    $http({
                        url: '/api/pages',
                        method: 'GET',
                        params: { coursewareId: $rootScope.selectedFile.id, number: parseInt($rootScope.pageNumber) }
                    }).success(function(data, header, config, status) {
                        if (data.err == false) {
                            console.log('get ID' + data.data.id);
                            $rootScope.pageId = data.data.id;
                        } else {
                            console.log("failed");
                        }
                    }).error(function(data, header, config, status) {
                        console.log('shenmegui');
                    });

                    $http({
                        url: '/api/posts?pageId=' + $rootScope.pageId,
                        method: 'GET',
                    }).success(function(data, header, config, status) {
                        if (data.err == false) {
                            console.log('success');
                            console.log(data.data);
                            $scope.questionsList = data.data;
                        } else {
                            console.log("failed");
                        }
                    }).error(function(data, header, config, status) {
                        console.log('shenmegui');
                    });

                }
                if (pageNumber != temp) {
                    //get current page questions
                    $rootScope.pageNumber = temp;
                    pageNumber = temp;

                    $http({
                        url: '/api/pages',
                        method: 'GET',
                        params: { coursewareId: $rootScope.selectedFile.id, number: parseInt($rootScope.pageNumber) }
                    }).success(function(data, header, config, status) {
                        if (data.err == false) {
                            console.log('get ID' + data.data.id);
                            $rootScope.pageId = data.data.id;
                        } else {
                            console.log("failed");
                        }
                    }).error(function(data, header, config, status) {
                        console.log('shenmegui');
                    });

                    $http({
                        url: '/api/posts?pageId=' + $rootScope.pageId,
                        method: 'GET',
                    }).success(function(data, header, config, status) {
                        if (data.err == false) {
                            console.log('success');
                            console.log(data.data);
                            $scope.questionsList = data.data;
                        } else {
                            console.log("failed");
                        }
                    }).error(function(data, header, config, status) {
                        console.log('shenmegui');
                    });

                }
            } else {
                pageNumber = content.document.getElementById("pageNumber").value;

            }
        }


    }, 1000);

}]);



detail.controller('submit-question', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.myHide = true;
    $scope.myHideOut = false;
    $scope.username = 'test_user';


    $scope.submit = function() {
        console.log(parseInt($rootScope.pageId));
        $http({
            url: '/api/posts',
            method: 'POST',
            data: { title: $scope.title, body: $scope.content, type: 0, parentId: null, absParentId: null, pageId: $rootScope.pageId }
        }).success(function(data, header, config, status) {
            if (data.err == false) {
                console.log('success');
                BootstrapDialog.show({
                    message: 'success'
                });
                // $rootScope.id = data.data.id;
                // $rootScope.username = data.data.username;
                // $location.path('/index');
            } else {
                console.log('failed');
                // console.log("Log in failed");
                // $location.path('/login_signup');
            }
        }).error(function(data, header, config, status) {
            console.log(data.err);
        });



    }
    $scope.myHideOut = false;
    $scope.$on('hide-and-get', function(event, data) {
        $scope.myHideOut = !$scope.myHideOut;
    });
    $scope.show = function() {
        $scope.myHide = !$scope.myHide;
    }

}])


detail.controller('one-question', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.name = "one-question";
    $scope.myHide = true;



    // $scope.answers = {};
    // $scope.qComments = {}
    //     // answer id : 
    // $scope.aComments = {}

    $scope.qComments = { 'question': null, 'comments': [] };
    $scope.aComments = [];

    $scope.classify = function(data) {
        console.log('data');
        console.log(data);
        var question = [];
        var answers = [];
        var comments = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == 0) question.push(data[i]);
            if (data[i].type == 1) answers.push(data[i]);
            if (data[i].type == 2) comments.push(data[i]);
        }

        $scope.qComments.question = question[0];
        for (var i = 0; i < comments.length; i++) {
            if (comments[i].parentId == question[0].id) $scope.qComments.comments.push(comments[i]);
        }
        console.log('qComments');
        console.log($scope.qComments);

        for (var i = 0; i < answers.length; i++) {
            $scope.aComments.push({ 'answer': answers[i], 'comments': [] });
            for (var j = 0; j < comments.length; j++) {
                if (answers[i].id == comments[j].parentId) $scope.aComments[i].comments.push(comments[j]);
            }
        }
        console.log('aComments');
        console.log($scope.aComments);






        console.log('classify');
        // console.log()

    };


    $scope.$on('to-get-AC', function(event, data) {
        // $http({
        //     url: '/api/posts/:'+$rootScope.questionId,
        //     method: 'GET'
        // }).success(function(data, header, config, status) {
        //     if (data.err == false) {
        //         console.log('success');
        //         console.log(data);
        //         // $rootScope.id = data.data.id;
        //         // $rootScope.username = data.data.username;
        //         // $location.path('/index');
        //     } else {
        //         console.log('failed');
        //         // console.log("Log in failed");
        //         // $location.path('/login_signup');
        //     }
        // }).error(function(data, header, config, status) {
        //     console.log(data.err);
        // });


        // console.log($scope.QAC);
        $scope.QAC = [{
            "id": 1,
            "title": "t1",
            "authorId": 1,
            "body": "q1",
            "type": 0,
            "parentId": null,
            "absParentId": null,
            "createdAt": "2016-07-13T01:14:05.000Z",
            "updatedAt": "2016-07-13T01:14:05.000Z"
        }, {
            "id": 2,
            "title": null,
            "authorId": 31,
            "body": "a1",
            "type": 1,
            "parentId": 1,
            "absParentId": 1,
            "createdAt": "2016-07-13T01:15:30.000Z",
            "updatedAt": "2016-07-13T01:15:30.000Z"
        }, {
            "id": 3,
            "title": null,
            "authorId": 32,
            "body": "a2",
            "type": 1,
            "parentId": 1,
            "absParentId": 1,
            "createdAt": "2016-07-13T01:15:39.000Z",
            "updatedAt": "2016-07-13T01:15:39.000Z"
        }, {
            "id": 4,
            "title": null,
            "authorId": 27,
            "body": "c1",
            "type": 2,
            "parentId": 2,
            "absParentId": 1,
            "createdAt": "2016-07-13T01:17:17.000Z",
            "updatedAt": "2016-07-13T01:17:17.000Z"
        }, {
            "id": 5,
            "title": null,
            "authorId": 28,
            "body": "c2",
            "type": 2,
            "parentId": 2,
            "absParentId": 1,
            "createdAt": "2016-07-13T01:17:18.000Z",
            "updatedAt": "2016-07-13T01:17:18.000Z"
        }, {
            "id": 6,
            "title": null,
            "authorId": 29,
            "body": "c3",
            "type": 2,
            "parentId": 2,
            "absParentId": 1,
            "createdAt": "2016-07-13T01:17:19.000Z",
            "updatedAt": "2016-07-13T01:17:19.000Z"
        }];
        $scope.classify($scope.QAC);

    });

    $scope.myHide = true;

    $scope.$on('hide-and-get', function(event, data) {
        $scope.myHide = !$scope.myHide;
        console.log('root get comments:');
    });

    $scope.show = function() {
        console.log($scope.tinymceModel);
    };

}]);
