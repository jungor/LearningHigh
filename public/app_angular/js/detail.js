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
                },
                'submit-answer@one-question': {
                    templateUrl: 'app_angular/templates/submit-answer.html'
                }
            }
        });
})

detail.controller('detail-all', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
    $scope.buttonHide = true;
    $scope.search = function() {
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
            console.log("failed");
        });
    }

    $scope.$on('to-detail-all', function(e, d) {
        $scope.detailHide = true;
    });

    $scope.$on('detail-top-hide-and-show-as-emit', function() {
        $scope.buttonHide = false;
    });

    $scope.$on('add-a-question-to-all', function(v, d) {
        $scope.$broadcast('add-a-question', d);
    })


    $scope.showTop = function() {
        $scope.$broadcast('detail-top-show', 'show');
        $scope.$broadcast('clearQA', 'clear');
        $scope.buttonHide = true;
    }
}])

detail.controller('detail-top', ['$scope', function($scope) {
    $scope.detailTopHide = false;
    $scope.$on('detail-top-hide-and-show-as', function(e, d) {
        $scope.detailTopHide = !$scope.detailTopHide;
    });
    $scope.$on('detail-top-show', function(e, d) {
        $scope.detailTopHide = !$scope.detailTopHide;
    });
}])


detail.controller('detail-content', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.pageNumber = null;
    $rootScope.questionId = null;
    $scope.getQA = function(id) {
        // get question answers comments
        $rootScope.questionId = id;
        $scope.$broadcast('detail-top-hide-and-show-as', 'hide');
        $scope.$emit('detail-top-hide-and-show-as-emit', 'fuck');
        $scope.$broadcast('to-get-AC', 'AC');
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
    }
}]);


detail.controller('questions', ['$scope', '$rootScope', '$interval', '$http', function($scope, $rootScope, $interval, $http) {
    $scope.questionsList = null;
    $scope.myHide = false;
    $scope.myHideList = true;
    $scope.show = function() {
        $scope.myHideList = !$scope.myHideList;
    };
    $scope.stopFight = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };

    $scope.$on('add-a-question', function(v, d) {
        $scope.questionsList.push(d);
    });

    var pageNumber = null;
    var stop = $interval(function() {
        if (document.getElementById("myIframe") == null) {
            $scope.stopFight();
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
                            $rootScope.pageId = data.data.id;
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
                            $rootScope.pageId = data.data.id;
                            $http({
                                url: '/api/posts?pageId=' + $rootScope.pageId,
                                method: 'GET',
                            }).success(function(data, header, config, status) {
                                if (data.err == false) {
                                    console.log('success');
                                    $scope.questionsList = data.data;
                                } else {
                                    console.log("failed");
                                }
                            }).error(function(data, header, config, status) {
                                console.log('shenmegui');
                            });
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
                $scope.$emit('add-a-question-to-all', data.data);
                $scope.title = '';
                $scope.content = '';
                $scope.myHide = !$scope.myHide;
            } else {
                console.log('failed');
            }
        }).error(function(data, header, config, status) {
            console.log(data.err);
        });
    }
    $scope.myHideOut = false;
    $scope.show = function() {
        $scope.myHide = !$scope.myHide;
    }

}])


detail.controller('one-question', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.name = "one-question";
    $scope.myHide = true;
    $scope.qComments = { 'question': null, 'comments': [] };
    $scope.aComments = [];
    $scope.$on('clearQA', function(v, d) {
        $scope.qComments = { 'question': null, 'comments': [] };
        $scope.aComments = [];
    });
    $scope.classify = function(data) {
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

        for (var i = 0; i < answers.length; i++) {
            $scope.aComments.push({ 'answer': answers[i], 'comments': [] });
            for (var j = 0; j < comments.length; j++) {
                if (answers[i].id == comments[j].parentId) $scope.aComments[i].comments.push(comments[j]);
            }
        }
    };


    $scope.$on('to-get-AC', function(event, data) {
        $http({
            url: '/api/posts/' + $rootScope.questionId,
            method: 'GET'
        }).success(function(data, header, config, status) {
            if (data.err == false) {
                console.log('success');
                $rootScope.QAC = data.data;
                $scope.classify($scope.QAC);
            } else {
                console.log('failed');
            }
        }).error(function(data, header, config, status) {
            console.log(data.err);
        });
    });

    $scope.myHide = true;
    $scope.$on('detail-top-hide-and-show-as', function() {
        $scope.myHide = !$scope.myHide;
    });
    $scope.$on('detail-top-show', function() {
        $scope.myHide = !$scope.myHide;
    });

    $scope.$on('add-a-comment', function(v, d) {
        for (var i = 0; i < $scope.aComments.length; i++) {
            if (d.parentId == $scope.aComments[i].answer.id) { $scope.aComments[i].comments.push(d) }
        }
    });

    $scope.$on('add-a-answer', function(v, d) {
        $scope.aComments.push({ 'answer': d, 'comments': [] });
    });

    $scope.$on('add-q-comment', function(v, d) {
        $scope.qComments.comments.push(d);
    })
}]);


detail.controller('submit-answer', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.myHide = true;
    $scope.myHideOut = false;
    $scope.username = 'test_user';

    $scope.submit = function() {
        $http({
            url: '/api/posts',
            method: 'POST',
            data: { title: null, body: $scope.content, type: 1, parentId: $rootScope.questionId, absParentId: $rootScope.questionId, pageId: $rootScope.pageId }
        }).success(function(data, header, config, status) {
            if (data.err == false) {
                console.log('success');
                BootstrapDialog.show({
                    message: 'success'
                });
                $scope.myHide = !$scope.myHide;
                $scope.content = '';
                $scope.$emit('add-a-answer', data.data);
            } else {
                console.log('failed');
            }
        }).error(function(data, header, config, status) {
            console.log(data.err);
        });



    }
    $scope.myHideOut = false;
    $scope.show = function() {
        $scope.myHide = !$scope.myHide;
    }

}])

detail.controller('edit-comment', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.commentEditHide = true;
    $scope.show_comment_edit = function() {
        $scope.commentEditHide = !$scope.commentEditHide;
    };

    $scope.create_comment = function(parentId) {
        $http({
            url: '/api/posts',
            method: 'POST',
            data: { title: null, body: $scope.content, type: 2, parentId: parentId, absParentId: $rootScope.questionId, pageId: $rootScope.pageId }
        }).success(function(data, header, config, status) {
            if (data.err == false) {
                BootstrapDialog.show({
                    message: 'success'
                });
                $scope.commentEditHide = !$scope.commentEditHide;
                $scope.content = '';
                $scope.$emit('add-a-comment', data.data);
            } else {
                console.log('failed');
            }
        }).error(function(data, header, config, status) {
            console.log(data.err);
        });
    }
}]);

detail.controller('edit-q-comment', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.qCommentEditHide = true;
    $scope.show_q_comment_edit = function() {
        $scope.qCommentEditHide = !$scope.qCommentEditHide;
    };
    $scope.create_q_comment = function(parentId) {
        $http({
            url: '/api/posts',
            method: 'POST',
            data: { title: null, body: $scope.content, type: 2, parentId: parentId, absParentId: $rootScope.questionId, pageId: $rootScope.pageId }
        }).success(function(data, header, config, status) {
            if (data.err == false) {
                BootstrapDialog.show({
                    message: 'success'
                });
                $scope.qCommentEditHide = !$scope.qCommentEditHide;
                $scope.content = '';
                $scope.$emit('add-q-comment', data.data);
            } else {
                console.log('failed');
            }
        }).error(function(data, header, config, status) {
            console.log(data.err);
        });

    };

}])
