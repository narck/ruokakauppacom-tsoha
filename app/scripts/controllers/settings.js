'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('SettingsCtrl', function ($location, $scope, $http, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if ($scope.user === undefined) {
        $scope.errors.other = 'Incorrect password';
      }

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.errors.other = '';
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          $scope.errors.other = 'Incorrect password';
        });
      }
		};
    $scope.deleteUser = function() {
      Auth.deleteUser()
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
    }
  });
