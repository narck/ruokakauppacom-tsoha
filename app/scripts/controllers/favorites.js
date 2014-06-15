'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('FavoritesCtrl', function ($scope, $http) {
    $http.get('/api/users/me/favorites').success(function(f) {
      $scope.favorites = f;
    });
  });
