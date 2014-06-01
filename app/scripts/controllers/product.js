'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('ProductCtrl', function ($scope, $http) {
  	$scope.wew = "le"
    $http.get('/api/products/' + sku).success(function(p) {
        $scope.product = p;
      });
  });
