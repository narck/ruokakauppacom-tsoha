'use strict';

/* Create a delicious, five-star three-course meal */

var db = require('../config/database').connect(),
    NodeCache = require('node-cache');

var Meal = { 
  starter: { drink: "", dish: "", side: ""},
  maincourse: { drink: "", dish: "", side: ""},
  desserts: { drink: "", dish: "", side: ""},
  link: "",
  cart: [],
  total: ""
}


var mealcache = new NodeCache();
exports.create = function(res) {
  var cacheIsSet = mealcache.get('isPopulated')['isPopulated'] === true

  if (cacheIsSet) {
    return res.json(generateMeal());
  } else {
  	populateCache(res);
  }
}

function populateCache(res) {
	var drinks = []
	var aperitifs = []
	var dishes = []
	var desserts = []

	/* I'm so sorry */
	/* "Switch considered harmful" -Esdger Dijkstra(TM) */

	db.serialize(function() {
      db.all('SELECT DISTINCT p.*, (SELECT name FROM subcategories WHERE p.subcategory=id)AS subcategory FROM products p, subcategories WHERE category=12;', function(err, products) {
        if (!err) {
          products.forEach(function (product) {
          if (product.subcategory === 'Juomat') {
            drinks.push(product)
          }
          if (product.subcategory === 'Makeiset') {
        	  desserts.push(product)
          }
          if (product.subcategory === 'Kahvi ja tee') {
        	 drinks.push(product)
          }
          if (product.subcategory === 'Jäätelöt') {
        	 desserts.push(product)
          }
          if (product.subcategory === 'Snacksit') {
        	 dishes.push(product)
          }
          if (product.subcategory === '') {
        	 aperitifs.push(product)
          }
          if (product.subcategory === 'Lisäravinteet') {
        	 aperitifs.push(product)
          }
      });

      mealcache.set('drinks', drinks);
      mealcache.set('dishes', dishes);
      mealcache.set('aperitifs', aperitifs);
      mealcache.set('desserts', desserts);
      mealcache.set('isPopulated', true);

      /* We're out */
      return res.json(generateMeal());
    } else {
      return res.send(err);
    }
    });
  });
}

/* Requires a set cache */
function generateMeal() {
	var deliciousMeal = Meal;

	var drinks = mealcache.get('drinks')['drinks'];
	var aperitifs = mealcache.get('aperitifs')['aperitifs'];
	var dishes = mealcache.get('dishes')['dishes'];
	var desserts = mealcache.get('desserts')['desserts'];
  deliciousMeal.cart = []; /* Heh heh */

	/* Please forgive me... */

  for (var key in deliciousMeal) {
    if (deliciousMeal[key].drink === undefined) {
    } else {
      deliciousMeal[key].drink = drinks[Math.floor(Math.random()*drinks.length)];
      if ( key === 'maincourse' ) {
        deliciousMeal[key].dish = dishes[Math.floor(Math.random()*dishes.length)];
        deliciousMeal[key].side = dishes[Math.floor(Math.random()*dishes.length)];
      }
      if ( key === 'starter' ) {
        deliciousMeal[key].dish = aperitifs[Math.floor(Math.random()*aperitifs.length)];
        deliciousMeal[key].side = aperitifs[Math.floor(Math.random()*aperitifs.length)];
      }
      if ( key === 'desserts') {
        deliciousMeal.desserts.dish = desserts[Math.floor(Math.random()*desserts.length)];
        deliciousMeal.desserts.side = desserts[Math.floor(Math.random()*desserts.length)];
      }
      deliciousMeal.cart.push(deliciousMeal[key].drink.sku)
      deliciousMeal.cart.push(deliciousMeal[key].dish.sku)
      deliciousMeal.cart.push(deliciousMeal[key].side.sku)
    }
  }

	return deliciousMeal;
};