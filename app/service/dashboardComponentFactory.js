/**
 * Created by VIJETA on 22/10/2014.
 */
angular.module('myApp').factory("dashboardComponent", ["$http","$rootScope","$q",function ($http,$rootScope,$q) {
    return {
        getCategories: function (onSuccess, onError) {
            $http.get("config/categories.json").success(function (data) {
                onSuccess(data.categories);
            }).error(function () {
                onError(arguments[0]);
            });
        },
        getReviewTableHeaders: function (onSuccess, onError) {
            $http.get("config/tabularHeader.json").success(function (data) {
                onSuccess(data.tableHeader);
            }).error(function () {
                onError(arguments[0]);
            });
        },
/*
        getAllData: function (onSuccess, onError) {
            $http.get("/config/rest/all").success(function (dataResp) {
                onSuccess(dataResp.data);
            }).error(function () {
                onError(arguments[0]);
            });
        },
*/
        getDraftReviews: function (onSuccess, onError) {
            $http.get("/config/rest/drafts").success(function (dataResp) {
                onSuccess(dataResp.data);
            }).error(function () {
                onError(arguments[0]);
            });
        },
        getAllReviews: function (onSuccess, onError) {
            $http.get("/config/rest/all").success(function (dataResp) {
                onSuccess(dataResp.data);
            }).error(function () {
                onError(arguments[0]);
            });
        },
        getTrashReviews: function (onSuccess, onError) {
            $http.get("/config/rest/trash").success(function (dataResp) {
                onSuccess(dataResp.data);
            }).error(function () {
                onError(arguments[0]);
            });
        },
        getClosedReviews: function (onSuccess, onError) {
            $http.get("/config/rest/closed").success(function (dataResp) {
                onSuccess(dataResp.data);
            }).error(function () {
                onError(arguments[0]);
            });
        },
        closeReviews: function(onSuccess,onError,dataList){
            var promiseArr = [];
            if (angular.isArray(dataList)) {
                for (var x = 0; x < dataList.length; x++) {
                    promiseArr.push($http({
                        method:"POST",
                        url:"/config/rest/closeReview",
                        data:{data:dataList[x]},
                        headers:{"Accept": "application/json"}
                    }));
                }
            }
            $q.all(promiseArr).then(function(results){
                console.log(results);
                onSuccess(results);
            },function(error){
                onError(arguments[0]);
            });
        },
        reopenReviews: function(onSuccess,onError,dataList){
            var promiseArr = [];
            if (angular.isArray(dataList)) {
                for (var x = 0; x < dataList.length; x++) {
                    promiseArr.push($http({
                        method:"POST",
                        url:"/config/rest/reopenReview",
                        data:{data:dataList[x]},
                        headers:{"Accept": "application/json"}
                    }));
                }
            }
            $q.all(promiseArr).then(function(results){
                console.log(results);
                onSuccess(results);
            },function(error){
                onError(arguments[0]);
            });
        },
        abandonReviews: function(onSuccess,onError,dataList){
            var promiseArr = [];
            if (angular.isArray(dataList)) {
                for (var x = 0; x < dataList.length; x++) {
                    promiseArr.push($http({
                        method:"POST",
                        url:"/config/rest/abandonReview",
                        data:{data:dataList[x]},
                        headers:{"Accept": "application/json"}
                    }));
                }
            }
            $q.all(promiseArr).then(function(results){
                console.log(results);
                onSuccess(results);
            },function(error){
                onError(arguments[0]);
            });
        },
        recoverAbandonReviews: function(onSuccess,onError,dataList){
            var promiseArr = [];
            if (angular.isArray(dataList)) {
                for (var x = 0; x < dataList.length; x++) {
                    promiseArr.push($http({
                        method:"POST",
                        url:"/config/rest/recoverReview",
                        data:{data:dataList[x]},
                        headers:{"Accept": "application/json"}
                    }));
                }
            }
            $q.all(promiseArr).then(function(results){
                console.log(results);
                onSuccess(results);
            },function(error){
                onError(arguments[0]);
            });
        },
        deleteReviews: function(onSuccess,onError,dataList){
        var promiseArr = [];
        if (angular.isArray(dataList)) {
            for (var x = 0; x < dataList.length; x++) {
                promiseArr.push($http({
                    method:"POST",
                    url:"/config/rest/deleteReview",
                    data:{data:dataList[x]},
                    headers:{"Accept": "application/json"}
                }));
            }
        }
        $q.all(promiseArr).then(function(results){
            console.log(results);
            onSuccess(results);
        },function(error){
            onError(arguments[0]);
        });
    }
    }
}
]);