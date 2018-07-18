const express = require('express');
const router  = express.Router();
const solver = require('../helpers/solver');

const foods = require('../helpers/getFood');
const User    = require('../models/User');
const Dieta   = require('../models/Dieta');
const Food = require('../models/Food');

//multer config
const multer = require('multer');
//cloudinary
const uploadCloud = require('../helpers/cloudinary');

//middlewares de autenticacion
function isAuth(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/login')
  }
}

function isValidated(req,res,next){
  if(req.user.active){
    return next();
  } else {
    res.render('verifica');
  }
}

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/result', foods(), solver(), (req,res,next)=>{
  let objeto = {
    solution: req.solucion,
    dietFoods: req.rawFoods,
    datosInit: req.body,
    comidasDietaCompletas: []
  }
  for (let comida in objeto.solution){
    objeto.dietFoods.forEach((comidaCompleta)=>{
      if (comidaCompleta.name === comida){
        comidaCompleta.resultado = objeto.solution[comida];
        objeto.comidasDietaCompletas.push(comidaCompleta);
      }
    });
  }
  res.render('result', objeto);
});

router.post('/save-result', isAuth, isValidated, (req,res,next)=>{
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
      res.redirect('/profile/results/' + dieta._id);
    });
  })
  .catch(err=>res.send(err));
});

router.get('/profile/:id', isAuth, isValidated, (req,res)=>{
  User.findById(req.params.id)
  .populate('dietas')
  .then(user=>{
    res.render('profile', user)
  })
  .catch(err=>res.send(err));
});

router.get('/profile/results/:id', isAuth, isValidated, (req,res)=>{
  Dieta.findById(req.params.id)
    .populate('usuario')
    .populate({
      path: 'comidas.food'
    })
    .then(user=>{
      res.render('diet-result', user)
    })
    .catch(err=>res.send(err));
});

router.post('/update-profile/:id', uploadCloud.single('profilePic'), (req,res)=>{
  req.body.photoURL = req.file.url;
  User.findByIdAndUpdate(req.user._id, req.body, {new: true})
  .then(newUser=>{
    res.redirect('/profile/' + req.user._id);
  })
  .catch(e=>{res.send(e)});
});

module.exports = router;
