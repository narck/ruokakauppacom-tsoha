'use strict';

angular.module('ruokakauppacomTsohaApp')
  .controller('MealCtrl', function ($scope, $http, Cartlink, Mealstats) {
    $http.get('/api/meal').success(function(meal) {
        
      $scope.meal = meal;
      $scope.starter = meal.starter;
      $scope.maincourse = meal.maincourse;
      $scope.desserts = meal.desserts;
      $scope.link = Cartlink.generateLink(meal.cart);
      $scope.price = Mealstats.price(meal);
      $scope.rating = Mealstats.rating(meal);
      

    });
  });
