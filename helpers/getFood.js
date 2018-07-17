const Food = require('../models/Food');

// const foodDB = [
//   {
//     "name": "egg",
//     "serving": "egg",
//     "cal": 55.5,
//     "protein": 4,
//     "carbs": 0.3425,
//     "fat": 4
//   },
//   {
//     "name": "eggWhite",
//     "serving": "egg",
//     "cal": 11.5,
//     "fat": 0.037333333,
//     "protein": 2.333333333,
//     "carbs": 0.166666667
//   },
//   {
//     "name": "pimiento",
//     "serving": "1g",
//     "cal": 0.27,
//     "fat": 0.0019,
//     "protein": 0.0089,
//     "carbs": 0.0643
//   },
//   {
//     "name": "avena",
//     "serving": "1/2 cup",
//     "cal": 310,
//     "fat": 6,
//     "protein": 10,
//     "carbs": 54
//   },
//   {
//     "name": "meat",
//     "serving": {
//       "unidad": "g",
//       "cantidad": 100
//     },
//     "cal": 364,
//     "protein": 75,
//     "carbs": 0,
//     "fat": 7
//   },
//   {
//     "name": "Salmon",
//     "serving": "178g",
//     "cal": 367,
//     "protein": 39,
//     "carbs": 0,
//     "fat": 22
//   }
// ]

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