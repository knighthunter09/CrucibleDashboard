'use strict';

angular.module('myApp.dashboard',['ngRoute']).config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])
    .controller('dashboardCtrl', ["dashboardComponent","$scope",function(dashboardComponent,$scope) {
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

        $scope.closeReviews = function(){
            dashboardComponent.closeReviews(
                function(data){
                    console.log("Dashboard Ctrl Success:close " + data);
                    $scope.listReviews();
                },function(err){
                    alert("Error" + err);
                },$scope.selectedId);
        };

        $scope.abandonReviews = function() {
            dashboardComponent.abandonReviews(
                function(data){
                    console.log("Dashboard Ctrl Success:abandon " + data);
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
            dashboardComponent.getAllReviews(function (data) {
//            var result = [];
//            for (var x in data) {
//                result = result.concat(JSON.parse(data[x])["reviewData"].slice(0));
//            }
//            $scope.data.allData = result;

                $scope.data.allData = JSON.parse(data)["reviewData"];


            }, function (error) {
                $scope.error = error;
            });
        };

        $scope.listReviews();

    }]);