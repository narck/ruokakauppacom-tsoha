'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('ProductsCtrl', function ($scope, $http, $routeParams) {
    var sku = $routeParams.id;
    if (sku === undefined) {
    // return to products view
      $http.get('/api/products').success(function(products) {
        $scope.products = products;
      });
    } else {
      $http.get('/api/products/' + sku).success(function(p) {
        $scope.product = p;
      });
    }
  });