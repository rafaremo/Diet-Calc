const express = require('express');
const router  = express.Router();
const solver = require('../helpers/solver');

const foods = require('../helpers/getFood');
const User    = require('../models/User');
const Dieta   = require('../models/Dieta');
const Food = require('../models/Food');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/result', foods(), solver(), (req,res,next)=>{
  let objeto = {
    solution: req.solucion,
    dietFoods: req.rawFoods,
    datosInit: req.body
  }
  res.render('result', objeto);
});

router.post('/save-result', (req,res,next)=>{
  let dietaModel = {
    name: 'Dieta - ' + new Date(),
    usuario: req.user._id,
    comidas: [],
    dietInfo: {
      bmr: req.body.bmr,
      gP: req.body.gP,
      gC: req.body.gC,
      gG: req.body.gG
    },
    inputInfo: {
      edad: req.body.edad,
      peso: req.body.peso,
      altura: req.body.altura,
      sexo: req.body.sexo,
      activity: req.body.actividad
    }
  }
  Dieta.create(dietaModel)
  .then(dieta=>{
    for(let key in req.body.food){
      Food.find({name: key})
      .then(comida=>{
        let objeto = {
          quantity: req.body.food[key],
          food: comida[0]._id
        }
        return Dieta.findByIdAndUpdate(dieta._id, {$push: {comidas:objeto}}, {new: true});
      })
      .then((newDieta)=>{
      })
      .catch(e=>{
        res.send(e);
        reject('error');
      });
    }
    User.findOneAndUpdate({_id:req.user._id}, {$push: {dietas:dieta._id}})
    .then(user=>{
      res.redirect('/results/' + dieta._id);
    });
  })
  .catch(err=>res.send(err));
});

router.get('/profile/:id', (req,res)=>{
  User.findById(req.params.id)
  .then(user=>{
    res.render('profile', user)
  })
  .catch(err=>res.send(err));
});

router.get('/results/:id',(req,res)=>{
  Dieta.findById(req.params.id)
    .populate('usuario')
    .populate({
      path: 'comidas.food'
    })
    .then(user=>{
      res.send(user);
      //res.render('diet-result', user)
    })
    .catch(err=>res.send(err));
})

module.exports = router;
