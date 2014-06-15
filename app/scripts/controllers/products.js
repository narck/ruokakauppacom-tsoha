'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('ProductsCtrl', function ($scope, $http, $routeParams, $rootScope) {
    var sku = $routeParams.id;
    if (sku === undefined) {
    // return to products view
      $http.get('/api/products').success(function(products) {
        $scope.products = products;
      });
    } else {
      $http.get('/api/products/' + sku).success(function(p) {
        $scope.product = p;

        $scope.favorite = function(product) {
          $http({
            url: '/api/users/me/favorites',
            method: "POST",
            data: { 'sku' : sku }
          });
        }

        $scope.defavorite = function (product) {
          $http({
            url: '/api/users/me/favorites',
            method: "DELETE",
            data: { 'sku' : sku }
          });
        }

      });
    }
  });