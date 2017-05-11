/* globals angular */
var movieApp = angular.module('MovieApp', []);

// order of scope and http matters in function
movieApp.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.movieList = [];

    $scope.search = function() {
        var req = {
            url: 'http://www.omdbapi.com',
            method: 'GET',
            params: {
                s: $scope.searchTerm
            }
        };
        $http(req).then(function(res) {
            console.log(res.data.Search);
            $scope.movieList = res.data.Search;
        });
    };

    var debounce = null;
    $scope.$watch('searchTerm', function(newVal, oldVal) {
        // whenever the model changes, $scope.search will watch it
        if (debounce) {
            clearTimeout(debounce);
        }
        debounce = setTimeout(function() {
            $scope.search();
        }, 1000);
    });
}]);
