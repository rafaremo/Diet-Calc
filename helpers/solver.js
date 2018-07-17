const solver = require("javascript-lp-solver");

function solucionar() {
  return function(req, res, next) {
    let BMR = req.body.sex === 'M' ? ((10*req.body.weight)+(6.25*req.body.height)-(5*req.body.age)-161)*parseFloat(req.body.activity) : ((10*req.body.weight)+(6.25*req.body.height)-(5*req.body.age)+5)*parseFloat(req.body.activity);
    let gP = (BMR*0.25)/4;
    let gG = (BMR*0.20)/9;
    let gC = (BMR*0.55)/4;

    let  model = {
      "optimize": "cal",
      "opType": "max",
      "constraints": {
        "protein": {"equal": gP},
        "carbs": {"equal": gC},
        "fat": {"max": gG}
      },
      "variables": req.foods
    };

    req.solucion = solver.Solve(model);
    next();
  }
}

module.exports = solucionar;