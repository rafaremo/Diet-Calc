const express = require('express');
const router  = express.Router();
const User    = require('../models/User')
const passport = require('passport');

//middlewares de autenticacion
function isAuth(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/login')
  }
}

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    res.redirect('/')
  }else{
    return next();
  }
}
//

router.get('/signup', isLoggedIn, (req,res)=>{
  res.render('auth/signup');
})

router.post('/signup', (req,res,next)=>{
  if(req.body.password != req.body.password2){
    let error = {
      message: 'Las contraseñas no coinciden',
      body: req.body
    }
    res.render('auth/signup', error);
  }
  User.register(req.body, req.body.password) 
  .then(user=>res.redirect('/login'))
  .catch(err=>res.send(err))
});

router.get('/login', isLoggedIn, (req,res)=>{
  res.render('auth/login')
});

router.post('/login', passport.authenticate('local'), (req,res,next)=>{
  req.app.locals.user = req.user;
  res.redirect('/')
});

router.get('/logout', (req,res)=>{
  req.logout();
  req.app.locals.user = null;
  res.redirect('/');
});


module.exports = router;