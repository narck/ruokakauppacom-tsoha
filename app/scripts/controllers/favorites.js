'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('FavoritesCtrl', function ($scope, $http) {
  	$scope.defavorite = function (product) {
  		$scope.favorites.splice($scope.favorites.indexOf(product.favorite), 1);    
  		$http({
  			url: '/api/users/me/favorites',
            method: "PUT",
            data: { 'sku' : product.favorite.sku }
        });
      }
    $http.get('/api/users/me/favorites').success(function(f) {
      $scope.favorites = f;
    });
  });
