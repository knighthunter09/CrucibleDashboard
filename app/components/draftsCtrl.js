'use strict';

angular.module('myApp.drafts', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/drafts', {
        templateUrl: 'views/drafts.html',
        controller: 'draftsCtrl'
    });
}])
    .controller('draftsCtrl', ["dashboardComponent", "$scope",
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

            $scope.abandonReviews = function() {
                dashboardComponent.abandonReviews(
                    function(data){
                        console.log("Draft Ctrl Success:abandon " + data);
                        $scope.listReviews();
                    },function(err){
                        alert("Error" + err);
                    },$scope.selectedId);
            };
            dashboardComponent.getReviewTableHeaders(function (data) {
                $scope.data.headers = data;
            }, function (error) {
                $scope.error = error;
            });

            $scope.listReviews = function () {
                dashboardComponent.getDraftReviews(function (data) {
                    $scope.data.allData = JSON.parse(data)["reviewData"];
                }, function (error) {
                    $scope.error = error;
                });
            };

            $scope.listReviews();
        }]);