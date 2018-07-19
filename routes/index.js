const express = require('express');
const router  = express.Router();
const solver = require('../helpers/solver');

const foods = require('../helpers/getFood');
const User    = require('../models/User');
const Dieta   = require('../models/Dieta');
const Food = require('../models/Food');
const sendWelcomeMail = require('../helpers/mailer').sendWelcomeMail;

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
    let us = req.user._id;
    res.render('verifica', {us});
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
  };
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
      bmr: Math.floor(req.body.bmr*100)/100,
      gP: Math.floor(req.body.gP*100)/100,
      gC: Math.floor(req.body.gC*100)/100,
      gG: Math.floor(req.body.gG*100)/100
    },
    inputInfo: {
      edad: req.body.edad,
      peso: req.body.peso,
      altura: req.body.altura,
      sexo: req.body.sexo,
      activity: req.body.actividad,
      objetivo: req.body.objetivo
    }
  }
  Dieta.create(dietaModel)
  .then(dieta=>{
    for(let key in req.body.food){
      Food.find({name: key})
      .then(comida=>{
        let objeto = {
          quantity: Math.floor(req.body.food[key]*100)/100,
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

router.get('/profile', isAuth, isValidated, (req,res)=>{
  User.findById(req.user._id)
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

router.post('/update-profile-pic/:id', isAuth, isValidated, uploadCloud.single('profilePic'), (req,res)=>{
  req.body.photoURL = req.file.url;
  User.findByIdAndUpdate(req.user._id, req.body, {new: true})
  .then(newUser=>{
    res.redirect('/profile/' + req.user._id);
  })
  .catch(e=>{res.send(e)});
});

router.post('/update-profile-username/:id', isAuth, isValidated, (req,res)=>{
  req.body.username = req.body.usernameChange;
  User.findByIdAndUpdate(req.user._id, req.body, {new: true})
  .then(newUser=>{
    res.redirect('/profile/' + req.user._id);
  })
  .catch(e=>{res.send(e)});
});

router.post('/update-profile-email/:id', isAuth, isValidated, (req,res)=>{
  req.body.email = req.body.emailChange;
  User.findByIdAndUpdate(req.user._id, req.body, {new: true})
  .then(newUser=>{
    res.redirect('/profile/' + req.user._id);
  })
  .catch(e=>{res.send(e)});
});

router.post('/update-dieta/:id', isAuth, isValidated, (req,res)=>{
  req.body.name = req.body.dietChange;
  Dieta.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(newDieta=>{
    res.redirect('/profile/results/' + req.params.id);
  })
  .catch(e=>{res.send(e)});
});

router.get('/politicas', (req,res)=>{
  res.render('politicas');
});

router.get('/resend/:id',isAuth, (req,res)=>{
  User.findById(req.params.id)
  .then(user=>{
    sendWelcomeMail(user);
    res.redirect('/');
  })
  .catch(e=>{res.send(e)});
});

module.exports = router;
