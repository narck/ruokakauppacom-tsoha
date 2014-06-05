'use strict';

angular.module('ruokakauppacomTsohaApp')
  .factory('Cartlink', function () {
    var baseurl = 'http://verkkokauppa.com/fi/cart/populate?'
    function generate(cart) {
      var string = ''

      for (var i = 0; i < cart.length; i++) {
        if ( i == cart.length-1) {
          string = string + 'products[' + cart[i] + ']=1';
        } else {
          string = string + 'products[' + cart[i] + ']=1&';
        }
        //text += "The number is " + i + "<br>";
      }

      return baseurl + string;
    }

    // Public API here
    return {
      generateLink: function (cart) {
        return generate(cart);
      }
    };
  });
