const solver = require("javascript-lp-solver");

function solucionar() {
  return function(req, res, next) {
    req.body.BMR = req.body.sex === 'M' ? ((10*req.body.weight)+(6.25*req.body.height)-(5*req.body.age)-161)*parseFloat(req.body.activity) : ((10*req.body.weight)+(6.25*req.body.height)-(5*req.body.age)+5)*parseFloat(req.body.activity);
    req.body.gP = (req.body.BMR*0.25)/4;
    req.body.gG = (req.body.BMR*0.20)/9;
    req.body.gC = (req.body.BMR*0.55)/4;
    console.log(req.body);

    let  model = {
      "optimize": "cal",
      "opType": "max",
      "constraints": {
        "protein": {"equal": req.body.gP},
        "carbs": {"equal": req.body.gC },
        "fat": {"equal": req.body.gG}
      },
      "variables": req.foods,
      //"ints": req.enteros
    };
    console.log(model);

    req.solucion = solver.Solve(model);
    next();
  }
}

module.exports = solucionar;