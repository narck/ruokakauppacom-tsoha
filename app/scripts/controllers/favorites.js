'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('FavoritesCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
