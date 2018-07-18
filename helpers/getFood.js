const Food = require('../models/Food');

function getFoods(filter){
  return function(req, res, next) {
    let foods = {};
    let enteros = {};
    let expects = {
      "feasible": true
    };
    if(!filter){
      filter = {}
    }
    Food.find(filter)
    .then(foodDB=>{
      foodDB.forEach(food=>{
        foods[food.name] = {
          "cal":(food.cal/food.serving.aumount),
          "protein":(food.protein/food.serving.aumount),
          "carbs":(food.carbs/food.serving.aumount),
          "fat":(food.fat/food.serving.aumount)
        }
        expects[food.name] = food.expect;
        if(food.entero){
          enteros[food.name] = 1;
        }
      });
      req.rawFoods = foodDB;
      req.foods = foods;
      req.enteros = enteros;
      req.expects = expects;
      next();
    })
    .catch(e=>next(e));
  }
}


module.exports = getFoods;