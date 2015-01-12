/**
 * Created by VIJETA on 28/12/2014.
 */
angular.module("paginatorModule", []).constant("globalPageSize",3).directive("paginatorHolder",[function(){
        return {
            restrict: "E",
            transclude : true,
            scope: {
                page : "=selectedPage",
                pageSize: "=pageSize"
            },
            replace: true,
            controller : function($scope,globalPageSize) {
                $scope.pageNo = 1;
                $scope.maxPaginationLen = 10;

                this.moveLeft = function () {
                    $scope.$apply(function(){
                        if ($scope.pageNo - 1 >= 1) {
                            $scope.pageNo = $scope.pageNo - 1;
                            $scope.page = $scope.pageNo;
                        }
                    });
                };

                this.moveRight = function () {
                    $scope.$apply(function(){
                        if ((($scope.pageNo+1) * $scope.pageSize) <= $scope.maxPaginationLen
                            || ($scope.maxPaginationLen - ($scope.pageSize* $scope.pageNo)) >= 0) {
                            $scope.pageNo = $scope.pageNo + 1;
                            $scope.page = $scope.pageNo;
                        }
                    });
                };

                this.updateMaxLength = function(val) {
                    if (val && angular.isNumber(Number(val))) {
                        $scope.maxPaginationLen = val;
                    }
                };

                $scope.$watch("pageNo", function(newVal) {
                    $scope.page = newVal;
                    $scope.pageSize = globalPageSize;
                });
            },
            templateUrl : "views/paginatorHolder.html"
        };
    }]).directive("pagination", [function () {
        return {
            restrict: "E",
            templateUrl: "views/paginatorView.html",
            require: "^paginatorHolder",
            scope: {
              data: "@data"
            },
            link: function (scope,element,attr,ctrl) {
                //calling children would have fetched direct descendent while find would get all the tags specified.,
                var items = element.find("a");
                for (var i = 0; i < items.length; i++) {
                    if (items.eq(i).attr("id") == "leftNav") {
                        items.eq(i).on("click",function(e){
                            ctrl.moveLeft();
                        });
                    } else if (items.eq(i).attr("id") == "rightNav") {
                        items.eq(i).on("click",function(e){
                            ctrl.moveRight();
                        });
                    }
                }
                scope.$watch("data",function(newVal){
                    ctrl.updateMaxLength(newVal);
                });
            }
        };
    }]
).filter("range", function($filter){
        return function(data,page,size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size;
                if (data.length < start_index) {
                    return [];
                } else {
                    return $filter("limitTo")(data.slice(start_index),size);
                }
            } else {
                return data;
            }
        }
    });