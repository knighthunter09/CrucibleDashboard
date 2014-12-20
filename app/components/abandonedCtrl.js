'use strict';

angular.module('myApp.abandoned',['ngRoute']).config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/abandoned', {
            templateUrl: 'views/abandoned.html',
            controller: 'abandonedCtrl'
        });
    }])
    .controller('abandonedCtrl', ["dashboardComponent","$scope",
        function(dashboardComponent,$scope) {
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

            $scope.recoverReviews = function() {
                dashboardComponent.recoverAbandonReviews(
                    function(data){
                        console.log("Ctrl Success:abandoned " + data);
                        $scope.listReviews();
                    },function(err){
                        alert("Error" + err);
                    },$scope.selectedId);
            };

            $scope.deleteReviews = function() {
                dashboardComponent.deleteReviews(
                    function(data){
                        console.log("Ctrl delete Success:abandoned " + data);
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

            $scope.listReviews = function() {
                dashboardComponent.getTrashReviews(function (data) {
                    $scope.data.allData = JSON.parse(data)["reviewData"];
                }, function (error) {
                    $scope.error = error;
                });
            };

            $scope.listReviews();

    }]);