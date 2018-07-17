const express = require('express');
const router  = express.Router();
const solver = require('../helpers/solver');

const foods = require('../helpers/getFood');
const User    = require('../models/User')
//const Dieta   = require('../models/Dieta')

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
  res.render('profile');
});

router.get('/profile/:id', (req,res)=>{
  User.findById(req.params.id)
  .then(user=>{
  res.render('profile', user)})
  .catch(err=>res.send(err));
});

router.get('/results/:id',(req,res)=>{
  Dieta.findById(req.params.id)
  .then(user=>{
  res.render('diet-result', user)})
  .catch(err=>res.send(err));
})

module.exports = router;
