'use strict';

angular.module('ruokakauppacomTsohaApp')
  .factory('Mealstats', function () {
    var price = 0;
    var rating = 1;
    var i = 0;

    /* Highly optimized */
    function calculate(meal) {
      for (var key in meal) {
        if (key == 'starter' || key == 'maincourse' || key == 'desserts') {
          var course = meal[key];
          price += course.drink.price + course.dish.price + course.side.price;
          rating += course.drink.score + course.dish.score + course.side.score;
          i = i + 3;
        }
      }
      rating = rating/i;
    }

    // Public API here
    return {
      price: function (meal) {
        calculate(meal);
        return price;
      },
      rating: function (meal) {
        calculate(meal);
        return rating;
      }
    };
  });
