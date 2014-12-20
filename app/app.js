'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.dashboard','myApp.closed','myApp.drafts','myApp.abandoned',
    'myApp.version'
]).run(function($location){
    if ($location.path()!= '/dashboard') {
        $location.path('/dashboard')
    }
}).constant("selectorActiveClass","btn-primary")
    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/dashboard'});
}]).controller("mainCtrl", ["$http", "$location", "$scope", "dashboardComponent","selectorActiveClass","$routeParams",
        function ($http, $location, $scope, dashboardComponent,selectorActiveClass,$routeParams) {
    $scope.data = {};
    dashboardComponent.getCategories(function (data) {
        $scope.data.categories = data;
    }, function (error) {
        $scope.error = error;
    });

    $scope.selectors = {selectedCategory : ""};

    $scope.setCategoryClass = function(arg) {
        $scope.selectors.selectedCategory = arg ? arg : null;
    };
    //Test
    $scope.getCategoryClass = function(arg) {
        return (!arg && !$scope.selectors.selectedCategory)
            || $scope.selectors.selectedCategory == arg ? selectorActiveClass : "";
    };

}]);
