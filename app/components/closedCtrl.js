'use strict';

angular.module('myApp.closed', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/closed', {
        templateUrl: 'views/closed.html',
        controller: 'closedCtrl'
    });
}])
    .controller('closedCtrl', ["dashboardComponent", "$scope",
        function (dashboardComponent, $scope) {
            $scope.data = {};

            $scope.selectedId = [];

            $scope.toggleSelection = function(arg) {
                if (arg) {
                    if ($scope.selectedId.indexOf(arg) === -1) {
                        $scope.selectedId.push(arg);
                    } else {
                        $scope.selectedId.splice($scope.selectedId.indexOf(arg),1);
                    }
                }
            };

            $scope.checkSelected = function(arg) {
                return $scope.selectedId.indexOf(arg) != -1;
            };

            dashboardComponent.getReviewTableHeaders(function (data) {
                $scope.data.headers = data;
            }, function (error) {
                $scope.error = error;
            });

            $scope.listReviews = function() {
                dashboardComponent.getClosedReviews(function (data) {
                    $scope.data.allData = JSON.parse(data)["reviewData"];
                }, function (error) {
                    $scope.error = error;
                });
            };

            $scope.reopenReviews = function(){
                dashboardComponent.reopenReviews(
                    function(data){
                        console.log("ClosedCtr Success" + data);
                        $scope.listReviews();
                    },function(err){
                        alert("Error" + err);
                    },$scope.selectedId);
            };
            $scope.listReviews();
        }]);