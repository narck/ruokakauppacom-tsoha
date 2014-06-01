'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('MainCtrl', function ($scope, $http,$rootScope) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      console.log($rootScope.currentUser)
    });
  });
