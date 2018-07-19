const express = require('express');
const router  = express.Router();
const User    = require('../models/User')
const passport = require('passport');
// Bcrypt to encrypt confirmation code
const sendWelcomeMail = require('../helpers/mailer').sendWelcomeMail;
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passportFacebook = require('../helpers/facebook');

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
  } else {
    User.register(req.body, req.body.password) 
      .then(user=>{
        let salt = bcrypt.genSaltSync(bcryptSalt);
        let confirmationCode = bcrypt.hashSync(user.username, salt);
        let confirmationCodeArr = confirmationCode.split("/");
        confirmationCode = confirmationCodeArr.join('');
        return User.findByIdAndUpdate(user._id, {confirmationCode}, {new:true})
      })
      .then(newUser=>{
        sendWelcomeMail(newUser);
        res.render('verifica');
      })
      .catch(err=>{
        res.redirect('/');
        console.log(err);
      });
  }
});

router.get("/confirm/:confirmCode", (req, res, next)=>{
  const confirmCode = req.params.confirmCode;
  User.findOneAndUpdate({confirmationCode: confirmCode}, {$set:{active:true}}, {new: true})
    .then(update=>{
      res.render('confirmation', update);
    })
    .catch(e=>next(e));
});

router.get('/login', isLoggedIn, (req,res)=>{
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'
}), (req,res,next)=>{
  req.app.locals.user = req.user;
  res.redirect('/')
});

router.get('/logout', (req,res)=>{
  req.logout();
  res.redirect('/');
});


router.get ('/facebook', passportFacebook.authenticate('facebook'));

router.get ('/facebook/callback', passportFacebook.authenticate('facebook', {failureRedirect: '/signup'}),
function (req, res){
  req.app.locals.user = req.user;
  res.redirect('/');
});



module.exports = router;