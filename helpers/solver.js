const solver = require("javascript-lp-solver");

function solucionar() {
  return function(req, res, next) {
    let multiply = 1;
    switch(req.body.objetivo){
      case 'perder':
        multiply = 0.9;
        break;
      case 'ganar':
        multiply = 1.1;
        break;
      default:
        multiply = 1;
    }
    
    req.body.BMR = req.body.sex === 'M' ? ((10*req.body.weight)+(6.25*req.body.height)-(5*req.body.age)-161)*parseFloat(req.body.activity) : ((10*req.body.weight)+(6.25*req.body.height)-(5*req.body.age)+5)*parseFloat(req.body.activity);
    req.body.gP = Math.floor(((req.body.BMR*0.25)/4)*100)/100;
    req.body.gG = Math.floor(((req.body.BMR*0.20)/9)*100)/100;
    req.body.gC = Math.floor(((req.body.BMR*0.55)/4)*100)/100;
    req.body.BMR = Math.floor((req.body.BMR*multiply)*100)/100

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