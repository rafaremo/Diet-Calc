const Food = require('../models/Food');

function getFoods(filter){
  return function(req, res, next) {
    let foods = {};
    if(!filter){
      filter = {}
    }
    Food.find(filter)
    .then(foodDB=>{
      foodDB.forEach(food=>{
        foods[food.name] = {
          "cal":food.cal,
          "protein":food.protein,
          "carbs":food.carbs,
          "fat":food.fat
        }
      });
      req.rawFoods = foodDB;
      req.foods = foods;
      next();
    })
    .catch(e=>next(e));
  }
}





module.exports = getFoods;