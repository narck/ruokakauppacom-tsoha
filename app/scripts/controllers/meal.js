'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('MealCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
