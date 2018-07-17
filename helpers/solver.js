const solver = require("javascript-lp-solver");

function solucionar() {
  return function(req, res, next) {
    req.body.BMR = req.body.sex === 'M' ? ((10*req.body.weight)+(6.25*req.body.height)-(5*req.body.age)-161)*parseFloat(req.body.activity) : ((10*req.body.weight)+(6.25*req.body.height)-(5*req.body.age)+5)*parseFloat(req.body.activity);
    req.body.gP = (req.body.BMR*0.25)/4;
    req.body.gG = (req.body.BMR*0.20)/9;
    req.body.gC = (req.body.BMR*0.55)/4;

    let  model = {
      "optimize": "protein",
      "opType": "max",
      "constraints": {
        "cal": {"equal": req.body.BMR},
        "carbs": {"min": req.body.gC},
        "fat": {"max": req.body.gG}
      },
      "variables": req.foods,
      "ints": {"Licuado de proteina (Optimum nutrition)": 1,"Licuado de proteina hydrolizada (optimum nutrition)": 1, "Caseina": 1}
    };

    req.solucion = solver.Solve(model);
    next();
  }
}

module.exports = solucionar;