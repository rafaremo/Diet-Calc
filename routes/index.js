const express = require('express');
const router  = express.Router();
const solver = require('../helpers/solver');

const foods = require('../helpers/getFood');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/result', foods(), solver(), (req,res,next)=>{
  let objeto = {
    solution: req.solucion,
    dietFoods: req.rawFoods
  }
  console.log(objeto);
  res.render('result', objeto);
});
router.get('/profile', (req,res)=>{
  res.render('profile')
})

module.exports = router;
