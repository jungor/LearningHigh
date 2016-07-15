/**
 * search-result Module
 *
 * Description
 */
var searchResult = angular.module('search-result', []);

searchResult.controller('search-all', ['$scope', function($scope) {
    $scope.search = function() {
        //console.log('ffff');
        console.log('searchKey : ' + $scope.searchKey);
        $scope.$broadcast('to-search-list', $scope.searchKey);
        $scope.searchKey = ""
    };

    $scope.$on('to-search-all', function(e, d) {
        // body...
        $scope.searchHide = true;
    });

}])


searchResult.controller('search-list', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
    $scope.labelColor = {
        'pdf': 'label-success',
        'ppt': 'label-primary',
        'odp': 'info'
    };
    $scope.addFileType = function() {
        console.log('addFileType');
        for (var i = 0; i < $scope.slist.length; i++) {

            $scope.slist[i].fileType = $scope.slist[i].name.split('.')[1];
            console.log("fileType: " +$scope.slist[i].fileType);
        }
    };

    if ($rootScope.searchList == undefined) {
    	$scope.$emit('to-search-all', 'hide');
        $location.path('/index');
    } else {
        $scope.slist = $rootScope.searchList.data;
        //console.log($rootScope.searchList['data']);
        $scope.addFileType();
        $scope.getIt = function(selectedFile) {
            $rootScope.selectedFile = selectedFile;
            $location.path('/detail');
        }

        $scope.$on('to-search-list', function(event, searchKey) {
            console.log('to get list ' + searchKey);
            $http({
                url: '/api/coursewares',
                method: 'GET',
                params: { key: searchKey, pageId: '1' }
            }).success(function(data, header, config, status) {
                if (data.err == false) {
                    $scope.slist = data.data;
                    $scope.addFileType();
                    console.log($scope.slist);
                    console.log('success')
                } else {
                    console.log("failed");
                }
            }).error(function(data, header, config, status) {
                // console.log(data.err);
                // console.log('shenmegui');
            });
        });
    }


}])
